"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LoadingOverlay from '@/base/helper/LoadingOverlay'
import { Card } from 'flowbite-react'
import { BookOpen, Eye } from 'lucide-react'
import ImagePlaceholder from '@/base/helper/ImagePlaceholder'
import ReactDOM from 'react-dom/client'
import { useRouter } from 'next/navigation'

interface MangaData {
    manhwa_popular: {
        mangaList: Array<{
            title: string
            poster: string
            mangaId: string
            href: string
            type: string
            views: string
            latestChapter: string
            latestChapterUrl: string
        }>
    }
}

export default function ManhuaContent({ mangaData }: { mangaData: MangaData }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsLoading(true);
        router.push(e.currentTarget.href);
    };

    return (
        <section>
            <LoadingOverlay isLoading={isLoading} message="Loading content..." />
            <div className='container px-4 flex flex-col gap-6 md:gap-8'>
                <div className='flex justify-between items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-4 md:pb-6'>
                    <h3 className='text-xl md:text-2xl font-bold text-gray-900 dark:text-white'>Manhwa Popular</h3>
                </div>

                <article className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {mangaData.manhwa_popular.mangaList.map((manga, idx) => (
                        <Link
                            href={manga.href}
                            key={manga.mangaId}
                            onClick={handleLinkClick}
                        >
                            <Card className="group h-full bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 cursor-pointer p-0 border-0">
                                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-lg">
                                    {manga.poster ? (
                                        <Image
                                            src={manga.poster}
                                            alt={manga.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                            priority={idx < 6}
                                            onError={(e) => {
                                                const imgElement = e.target as HTMLImageElement;
                                                imgElement.style.display = 'none';
                                                const parent = imgElement.parentElement;
                                                if (parent) {
                                                    const placeholder = document.createElement('div');
                                                    placeholder.style.width = '100%';
                                                    placeholder.style.height = '100%';
                                                    parent.appendChild(placeholder);
                                                    const root = ReactDOM.createRoot(placeholder);
                                                    root.render(<ImagePlaceholder />);
                                                }
                                            }}
                                        />
                                    ) : (
                                        <ImagePlaceholder />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="flex justify-between items-center gap-3 text-sm text-gray-200">
                                            <span className="flex items-center gap-1.5">
                                                <BookOpen className="w-4 h-4" />
                                                {manga.latestChapter}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 left-0 right-0 p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="flex justify-between items-center gap-3 text-sm text-gray-200">
                                            <span className="flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded-full">
                                                {manga.type}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <span className="flex items-center gap-1.5">
                                        <Eye className="w-4 h-4" />
                                        {manga.views}
                                    </span>
                                    <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                                        {manga.title}
                                    </h5>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </article>
            </div>
        </section>
    )
}
