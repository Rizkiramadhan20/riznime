"use client"

import React from 'react'

import { format } from 'date-fns'

import { id } from 'date-fns/locale'

import { User, Pencil } from 'lucide-react'

import Image from 'next/image'

import background from "@/base/assets/profile.jpg"

import { useManagementProfile } from './utils/useManagementProfile'
import ChangeModal from './modal/ChangeModal'

export default function SettingsLayout() {
    const {
        user,
        dateCreated,
        dateUpdated,
        isEditing,
        setIsEditing,
        isUploading,
        fileInputRef,
        formData,
        formError,
        showPasswordModal,
        passwordForm,
        passwordError,
        isPasswordLoading,
        isEditProfileLoading,
        showPassword,
        handleInputChange,
        handleFileChange,
        handleSubmit,
        handlePasswordInputChange,
        handleOpenPasswordModal,
        handleClosePasswordModal,
        handlePasswordSubmit,
        togglePasswordVisibility,
    } = useManagementProfile();

    return (
        <>
            <section className="w-full">
                {/* Background Profile */}
                <div className="relative aspect-[2/1] md:aspect-[4/1] w-full rounded-t-3xl overflow-hidden mb-[-64px]">
                    <Image
                        src={background}
                        alt="Profile Background"
                        fill
                        className="object-cover w-full h-full"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                {/* Avatar */}
                <div className="relative flex flex-col items-center">
                    <div className="z-10 w-24 h-24 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center shadow-xl ring-4 ring-white dark:ring-gray-900 -mt-20 mb-4 transition-transform duration-300 hover:scale-105 overflow-hidden cursor-pointer relative" onClick={() => fileInputRef.current?.click()}>
                        {user?.photoURL ? (
                            <Image
                                src={user.photoURL}
                                alt={user.displayName || 'Profile'}
                                width={96}
                                height={96}
                                className="w-24 h-24 rounded-full object-cover"
                            />
                        ) : (
                            <User className="w-16 h-16 text-gray-400" />
                        )}
                        {/* Edit icon overlay */}
                        <div className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md flex items-center justify-center">
                            <Pencil className="w-5 h-5 text-blue-500" />
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                            disabled={isUploading}
                        />
                    </div>
                    {/* Card Info */}
                    <div className="w-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-6 border border-gray-100 dark:border-gray-800 mt-2">
                        <div className="text-center w-full">
                            {isEditing ? (
                                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full">
                                    <div className="form-control flex gap-2 flex-col w-full max-w-xs">
                                        <label className="label py-1">
                                            <span className="label-text font-semibold text-base">Nama</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="displayName"
                                            value={formData.displayName}
                                            onChange={handleInputChange}
                                            placeholder="Nama"
                                            className={`
                                                px-4 py-2 rounded-lg border w-full bg-gray-50 dark:bg-gray-800
                                                text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400
                                                transition-colors
                                                ${formError.displayName ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}
                                            `}
                                        />
                                        {formError.displayName && (
                                            <span className="text-error text-sm mt-1">{formError.displayName}</span>
                                        )}
                                    </div>

                                    <div className="form-control flex gap-2 flex-col w-full max-w-xs">
                                        <label className="label py-1">
                                            <span className="label-text font-semibold text-base">Nomor HP</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            placeholder="Nomor HP"
                                            className="
                                                px-4 py-2 rounded-lg border w-full bg-gray-50 dark:bg-gray-800
                                                text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400
                                                transition-colors border-gray-200 dark:border-gray-700
                                            "
                                        />
                                    </div>
                                    <button type="submit" className="w-full max-w-xs bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed" disabled={isUploading || isEditProfileLoading}>
                                        {isEditProfileLoading ? 'Menyimpan...' : 'Simpan'}
                                    </button>
                                    <button type="button" className="w-full max-w-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" onClick={() => setIsEditing(false)}>
                                        Batal
                                    </button>
                                </form>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                                        {user?.displayName || <span className="italic text-gray-400">Tidak ada nama</span>}
                                    </h2>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        {user?.email || <span className="italic text-gray-400">Tidak ada email</span>}
                                    </p>
                                    <div className="flex flex-col sm:flex-row justify-center gap-2 mt-2">
                                        <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs font-semibold">
                                            {user?.role || <span className="italic text-gray-400">Tidak ada role</span>}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-semibold">
                                            {user?.phoneNumber || <span className="italic text-gray-400">Tidak ada nomor HP</span>}
                                        </span>
                                    </div>
                                    {/* CreatedAt, UpdatedAt, isActive */}
                                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                                        <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs">
                                            Dibuat: {dateCreated ? format(dateCreated, 'd MMMM yyyy, HH:mm', { locale: id }) : <span className='italic text-gray-400'>Tidak ada data</span>}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs">
                                            Diperbarui: {dateUpdated ? format(dateUpdated, 'd MMMM yyyy, HH:mm', { locale: id }) : <span className='italic text-gray-400'>Tidak ada data</span>}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user?.isActive ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'}`}>
                                            {user?.isActive === undefined ? <span className='italic text-gray-400'>Status tidak diketahui</span> : user.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className='flex flex-col md:flex-row gap-4'>
                            {!isEditing && (
                                <>
                                    <button className="mt-4 px-8 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:scale-105 transition-transform" onClick={() => setIsEditing(true)}>
                                        Edit Profile
                                    </button>
                                    <button className="mt-4 px-8 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:scale-105 transition-transform" onClick={handleOpenPasswordModal}>
                                        Change Password
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Change Password Modal */}
            <ChangeModal
                open={showPasswordModal}
                onClose={handleClosePasswordModal}
                onSubmit={handlePasswordSubmit}
                passwordForm={passwordForm}
                passwordError={passwordError}
                isPasswordLoading={isPasswordLoading}
                showPassword={showPassword}
                handlePasswordInputChange={handlePasswordInputChange}
                togglePasswordVisibility={togglePasswordVisibility}
            />
        </>
    );
}

