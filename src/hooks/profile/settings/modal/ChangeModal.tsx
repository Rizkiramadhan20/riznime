import React from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface ChangeModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    passwordForm: {
        oldPassword: string;
        newPassword: string;
        confirmPassword: string;
    };
    passwordError: {
        oldPassword?: string;
        newPassword?: string;
        confirmPassword?: string;
    };
    isPasswordLoading: boolean;
    showPassword: {
        oldPassword: boolean;
        newPassword: boolean;
        confirmPassword: boolean;
    };
    handlePasswordInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    togglePasswordVisibility: (field: 'oldPassword' | 'newPassword' | 'confirmPassword') => void;
}

const ChangeModal: React.FC<ChangeModalProps> = ({
    open,
    onClose,
    onSubmit,
    passwordForm,
    passwordError,
    isPasswordLoading,
    showPassword,
    handlePasswordInputChange,
    togglePasswordVisibility,
}) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md mx-auto border border-gray-200 dark:border-gray-800 animate-fadeIn">
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 rounded-t-2xl bg-gradient-to-r from-blue-50/80 dark:from-blue-900/40 to-purple-50/80 dark:to-purple-900/40">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Ganti Password</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                {/* Modal Body */}
                <form onSubmit={onSubmit} className="flex flex-col gap-5 px-6 py-6">
                    {/* Old Password */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-base text-gray-700 dark:text-gray-200 mb-1">Password Lama</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <Lock className="w-5 h-5" />
                            </span>
                            <input
                                type={showPassword.oldPassword ? 'text' : 'password'}
                                name="oldPassword"
                                value={passwordForm.oldPassword}
                                onChange={handlePasswordInputChange}
                                placeholder="Password lama"
                                className={`pl-10 pr-10 py-2 rounded-lg border w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ${passwordError.oldPassword ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                onClick={() => togglePasswordVisibility('oldPassword')}
                            >
                                {showPassword.oldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {passwordError.oldPassword && (
                            <span className="text-red-500 text-xs mt-1 font-medium">{passwordError.oldPassword}</span>
                        )}
                    </div>
                    {/* New Password */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-base text-gray-700 dark:text-gray-200 mb-1">Password Baru</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <Lock className="w-5 h-5" />
                            </span>
                            <input
                                type={showPassword.newPassword ? 'text' : 'password'}
                                name="newPassword"
                                value={passwordForm.newPassword}
                                onChange={handlePasswordInputChange}
                                placeholder="Password baru"
                                className={`pl-10 pr-10 py-2 rounded-lg border w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ${passwordError.newPassword ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                onClick={() => togglePasswordVisibility('newPassword')}
                            >
                                {showPassword.newPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {passwordError.newPassword && (
                            <span className="text-red-500 text-xs mt-1 font-medium">{passwordError.newPassword}</span>
                        )}
                    </div>
                    {/* Confirm Password */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-base text-gray-700 dark:text-gray-200 mb-1">Konfirmasi Password Baru</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <Lock className="w-5 h-5" />
                            </span>
                            <input
                                type={showPassword.confirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={passwordForm.confirmPassword}
                                onChange={handlePasswordInputChange}
                                placeholder="Konfirmasi password baru"
                                className={`pl-10 pr-10 py-2 rounded-lg border w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ${passwordError.confirmPassword ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                onClick={() => togglePasswordVisibility('confirmPassword')}
                            >
                                {showPassword.confirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {passwordError.confirmPassword && (
                            <span className="text-red-500 text-xs mt-1 font-medium">{passwordError.confirmPassword}</span>
                        )}
                    </div>
                    {/* Modal Actions */}
                    <div className="flex flex-col gap-2 mt-4">
                        <button
                            type="submit"
                            className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
                            disabled={isPasswordLoading}
                        >
                            {isPasswordLoading ? 'Menyimpan...' : 'Simpan Password'}
                        </button>
                        <button
                            type="button"
                            className="w-full py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            onClick={onClose}
                        >
                            Batal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangeModal;
