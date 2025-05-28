"use client"

import React, { useEffect, useState } from 'react';

import ReactQuill from 'react-quill-new';

import 'react-quill-new/dist/quill.snow.css';

import { collection, addDoc, getDocs, Timestamp, updateDoc, doc } from 'firebase/firestore';

import { db } from '@/utils/firebase/firebase';

import imagekitInstance from '@/utils/imagekit/Imagekit';

import { Article, CategoryWithArticles } from '@/hooks/dashboard/article/article/types/schema';

import Image from 'next/image';

import { useAuth } from '@/utils/context/AuthContext';

import { toast } from 'react-hot-toast';

import { Modal, Button, Label, TextInput, Textarea, Select, Spinner } from 'flowbite-react';

import { FileText, Image as ImageIcon, Tag, User, Pencil, Trash2 } from 'lucide-react';

type PublishStatus = 'draft' | 'published';

interface ArticleModalProps {
    article?: Article | null;
    onClose: () => void;
    onSuccess?: () => void;
    show: boolean;
}

export default function ArticleModal({ article, onClose, onSuccess, show }: ArticleModalProps) {
    const { user, hasRole } = useAuth();
    const [title, setTitle] = useState(article?.title || '');
    const [description, setDescription] = useState(article?.description || '');
    const [slug, setSlug] = useState(article?.slug || '');
    const [content, setContent] = useState(article?.content || '');
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(article?.thumbnail || '');
    const [categories, setCategories] = useState<CategoryWithArticles[]>([]);
    const [selectedCategory, setSelectedCategory] = useState(article?.category || '');
    const [loading, setLoading] = useState(false);
    const [publishStatus, setPublishStatus] = useState<PublishStatus>('draft');

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ align: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['link', 'image', 'video'],
            [{ color: [] }, { background: [] }],
            ['blockquote']
        ],
        clipboard: {
            matchVisual: false
        }
    };

    useEffect(() => {
        fetchCategories();
        if (article) {
            setTitle(article.title);
            setSlug(article.slug);
            setContent(article.content);
            setThumbnail(null);
            setThumbnailPreview(article.thumbnail);
            setSelectedCategory(article.category);
            setPublishStatus(article.status);
            setDescription(article.description || '');
        }
    }, [article]);

    const fetchCategories = async () => {
        try {
            if (!process.env.NEXT_PUBLIC_COLLECTIONS_CATEGORIES_ARTICLE) {
                console.error('Collection path is not configured');
                return;
            }
            const querySnapshot = await getDocs(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_CATEGORIES_ARTICLE));
            const categoryMap = new Map<string, CategoryWithArticles>();

            querySnapshot.docs.forEach(doc => {
                const data = doc.data();
                const categoryName = data.name || 'Uncategorized';  // Use name field or fallback to 'Uncategorized'

                if (!categoryMap.has(categoryName)) {
                    categoryMap.set(categoryName, {
                        id: categoryName,  // Use category name as ID
                        categoryArticles: data.categoryArticles || [],
                        category: categoryName,
                        createdAt: data.createdAt || Timestamp.now()
                    });
                } else {
                    // If category already exists, merge the categoryArticles
                    const existingCategory = categoryMap.get(categoryName)!;
                    const newArticles = data.categoryArticles || [];
                    existingCategory.categoryArticles = [...new Set([...existingCategory.categoryArticles, ...newArticles])];
                }
            });

            const categoriesData = Array.from(categoryMap.values());
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Failed to fetch categories');
        }
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryName = e.target.value;
        setSelectedCategory(categoryName);
    };

    const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setThumbnail(file);
            setThumbnailPreview(URL.createObjectURL(file));
        }
    };

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .trim();
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setSlug(generateSlug(newTitle));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!hasRole(['super-admins', 'admins'])) {
            toast.error('You do not have permission to create articles');
            return;
        }

        if (!user?.displayName || !user?.photoURL || !user?.role) {
            toast.error('User information is incomplete');
            return;
        }

        setLoading(true);

        try {
            let thumbnailUrl = article?.thumbnail || '';
            if (thumbnail) {
                const folderTitle = title
                    .split(' ')
                    .slice(0, 15)
                    .join('-')
                    .toLowerCase()
                    .replace(/[^a-z0-9-]/g, '');
                const folderPath = `/articles/${folderTitle}`;

                const base64 = await new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(thumbnail);
                });

                const uploadResponse = await imagekitInstance.upload({
                    file: base64,
                    fileName: `article-${Date.now()}`,
                    folder: folderPath
                });
                thumbnailUrl = uploadResponse.url;
            }

            // Find the selected category object
            const selectedCategoryObj = categories.find(cat => cat.id === selectedCategory);
            if (!selectedCategoryObj) {
                throw new Error('Selected category not found');
            }

            const articleData: Omit<Article, 'id'> = {
                title,
                description,
                slug,
                content,
                thumbnail: thumbnailUrl,
                category: selectedCategoryObj.category,
                author: {
                    name: user.displayName,
                    photoURL: user.photoURL,
                    role: user.role
                },
                createdAt: article?.createdAt || Timestamp.now(),
                updatedAt: Timestamp.now(),
                status: publishStatus
            };

            if (article?.id) {
                // Update existing article
                await updateDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ARTICLES as string, article.id), articleData);
                onSuccess?.();
            } else {
                // Create new article
                await addDoc(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ARTICLES as string), articleData);
                onSuccess?.();
            }

            toast.success(`Article ${article ? 'updated' : 'created'} successfully`);
            handleClose();
        } catch (error) {
            console.error('Error saving article:', error);
            toast.error('Failed to save article');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setSlug('');
        setContent('');
        setThumbnail(null);
        setThumbnailPreview('');
        setSelectedCategory('');
        setPublishStatus('draft');
    };

    const handleClose = () => {
        const modal = document.getElementById('article_modal') as HTMLDialogElement;
        modal?.close();
        resetForm();
        onClose();
    };

    return (
        <Modal
            show={show}
            size="7xl"
            onClose={handleClose}
            className="fixed inset-0 flex items-center justify-center pt-0 md:pt-5"
        >
            <div className="flex flex-col w-full h-full md:h-[90vh] md:min-h-[500px]">
                {/* Fixed Header */}
                <div className="flex-none border-b border-[var(--border-color)] px-4 md:px-6 py-4">
                    <h3 className="text-xl font-bold text-[var(--text)]">
                        {article ? 'Edit Article' : 'Create New Article'}
                    </h3>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto min-h-0">
                    <div className="p-4 md:p-6">
                        <form id="article-form" onSubmit={handleSubmit} className="space-y-6">
                            {/* Basic Information */}
                            <div className="bg-[var(--card-bg)] rounded-xl p-6 shadow-sm border border-[var(--border-color)]">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-[var(--primary)]/10 rounded-lg">
                                        <FileText className="h-5 w-5 text-[var(--primary)]" />
                                    </div>
                                    <h4 className="font-semibold text-lg text-[var(--text)]">Basic Information</h4>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="title" className="text-[var(--text)]">Title</Label>
                                            <TextInput
                                                id="title"
                                                type="text"
                                                value={title}
                                                onChange={handleTitleChange}
                                                placeholder="Enter article title"
                                                required
                                                className="bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text)]"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="slug" className="text-[var(--text)]">Slug</Label>
                                            <TextInput
                                                id="slug"
                                                type="text"
                                                value={slug}
                                                onChange={(e) => setSlug(e.target.value)}
                                                placeholder="article-slug"
                                                readOnly
                                                required
                                                className="bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text)]"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="description" className="text-[var(--text)]">Description</Label>
                                            <Textarea
                                                id="description"
                                                value={description}
                                                onChange={handleDescriptionChange}
                                                placeholder="Enter article description"
                                                required
                                                rows={4}
                                                className="bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text)]"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="publishStatus" className="text-[var(--text)]">Publish Status</Label>
                                            <Select
                                                id="publishStatus"
                                                value={publishStatus}
                                                onChange={(e) => setPublishStatus(e.target.value as PublishStatus)}
                                                required
                                                className="bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text)]"
                                            >
                                                <option value="draft">Draft</option>
                                                <option value="published">Published</option>
                                            </Select>
                                            <p className="mt-2 text-xs text-[var(--text-secondary)]">
                                                {publishStatus === 'draft'
                                                    ? 'Save as draft to edit later'
                                                    : 'Publish immediately to make it visible to readers'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Media Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Thumbnail Upload */}
                                <div className="bg-[var(--card-bg)] rounded-xl p-6 shadow-sm border border-[var(--border-color)]">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-[var(--secondary)]/10 rounded-lg">
                                            <ImageIcon className="h-5 w-5 text-[var(--secondary)]" />
                                        </div>
                                        <h4 className="font-semibold text-lg text-[var(--text)]">Thumbnail</h4>
                                    </div>

                                    <div>
                                        {thumbnailPreview ? (
                                            <div className="relative rounded-lg overflow-hidden group">
                                                <Image
                                                    src={thumbnailPreview}
                                                    alt="Thumbnail preview"
                                                    width={400}
                                                    height={300}
                                                    className="w-full h-[200px] object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                                                    <Button
                                                        size="sm"
                                                        color="light"
                                                        onClick={() => {
                                                            const input = document.getElementById('thumbnail-input') as HTMLInputElement;
                                                            input?.click();
                                                        }}
                                                        className="bg-[var(--card-bg)] text-[var(--text)] hover:bg-[var(--hover-bg)]"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        color="failure"
                                                        onClick={() => {
                                                            setThumbnail(null);
                                                            setThumbnailPreview('');
                                                        }}
                                                        className="bg-[var(--error)] text-white hover:bg-[var(--error)]/90"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <input
                                                    id="thumbnail-input"
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleThumbnailChange}
                                                />
                                            </div>
                                        ) : (
                                            <div className="relative border-2 border-dashed border-[var(--border-color)] rounded-lg hover:border-[var(--secondary)] transition-all">
                                                <input
                                                    id="thumbnail-input"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleThumbnailChange}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    required
                                                />
                                                <div className="flex flex-col items-center justify-center h-[200px] p-4">
                                                    <ImageIcon className="h-10 w-10 mb-2 text-[var(--text-secondary)]" />
                                                    <p className="text-sm text-[var(--text)]">Add Thumbnail</p>
                                                    <p className="text-xs mt-1 text-[var(--text-secondary)]">Drag or click to upload</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Categories */}
                                <div className="bg-[var(--card-bg)] rounded-xl p-6 shadow-sm border border-[var(--border-color)]">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-[var(--accent)]/10 rounded-lg">
                                            <Tag className="h-5 w-5 text-[var(--accent)]" />
                                        </div>
                                        <h4 className="font-semibold text-lg text-[var(--text)]">Categories</h4>
                                    </div>

                                    <div>
                                        <Label htmlFor="category" className="text-[var(--text)]">Category</Label>
                                        <Select
                                            id="category"
                                            value={selectedCategory}
                                            onChange={handleCategoryChange}
                                            required
                                            className="bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text)]"
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.category}>
                                                    {category.category}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Content Editor */}
                            <div className="bg-[var(--card-bg)] rounded-xl p-6 shadow-sm border border-[var(--border-color)]">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-[var(--primary)]/10 rounded-lg">
                                        <FileText className="h-5 w-5 text-[var(--primary)]" />
                                    </div>
                                    <h4 className="font-semibold text-lg text-[var(--text)]">Content</h4>
                                </div>

                                <div className="overflow-hidden">
                                    <div className="border border-[var(--border-color)] rounded-lg bg-[var(--card-bg)]">
                                        <ReactQuill
                                            theme="snow"
                                            value={content}
                                            onChange={setContent}
                                            modules={modules}
                                            style={{ height: 'auto', minHeight: '400px' }}
                                            className="[&_.ql-toolbar]:sticky [&_.ql-toolbar]:top-0 [&_.ql-toolbar]:z-10 [&_.ql-toolbar]:bg-[var(--card-bg)] [&_.ql-editor]:min-h-[300px] [&_.ql-editor]:bg-[var(--card-bg)] [&_.ql-editor]:border-[var(--border-color)] [&_.ql-editor]:rounded-lg [&_.ql-editor]:text-[var(--text)]"
                                            placeholder="Write your article content here..."
                                            preserveWhitespace
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Author Information */}
                            <div className="bg-[var(--card-bg)] rounded-xl p-6 shadow-sm border border-[var(--border-color)]">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-[var(--primary)]/10 rounded-lg">
                                        <User className="h-5 w-5 text-[var(--primary)]" />
                                    </div>
                                    <h4 className="font-semibold text-lg text-[var(--text)]">Author Information</h4>
                                </div>

                                <div className="grid md:grid-cols-[200px,1fr] gap-8 items-start">
                                    <div className="flex flex-col items-center space-y-3">
                                        <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--card-bg)] to-[var(--hover-bg)] shadow-inner">
                                            <Image
                                                src={user?.photoURL || '/placeholder-avatar.png'}
                                                alt={user?.displayName || 'Author'}
                                                fill
                                                className="object-cover transition-transform hover:scale-105 duration-300"
                                            />
                                        </div>
                                        <span className="px-4 py-1.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium">
                                            {user?.role || 'No role'}
                                        </span>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <Label className="text-[var(--text)]">Full Name</Label>
                                            <TextInput
                                                value={user?.displayName || 'No name available'}
                                                disabled
                                                className="bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text)]"
                                            />
                                            <p className="mt-2 text-xs text-[var(--text-secondary)]">
                                                This information is pulled from your profile and cannot be edited here.
                                            </p>
                                        </div>

                                        <div>
                                            <Label className="text-[var(--text)]">Access Level</Label>
                                            <TextInput
                                                value={user?.role || 'No role available'}
                                                disabled
                                                className="bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--text)]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Fixed Footer */}
                <div className="flex-none border-t border-[var(--border-color)] px-4 md:px-6 py-4 flex justify-end gap-3">
                    <Button color="gray" onClick={handleClose} disabled={loading} className="bg-[var(--card-bg)] text-[var(--text)] hover:bg-[var(--hover-bg)]">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form="article-form"
                        color="blue"
                        disabled={loading}
                        className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white"
                    >
                        {loading ? (
                            <>
                                <Spinner size="sm" className="mr-2" />
                                Loading...
                            </>
                        ) : article ? 'Update Article' : 'Create Article'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
} 