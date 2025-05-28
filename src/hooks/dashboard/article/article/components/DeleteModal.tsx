"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null

  return (
    <dialog id="delete_modal" className="modal" open={isOpen}>
      <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-[var(--card-bg)] rounded-3xl shadow-2xl max-w-md w-full p-4 sm:p-8"
        >
          <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Confirm Deletion</h3>
          <p className="text-xs sm:text-sm mb-6 sm:mb-8">
            Are you sure you want to delete this article? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2 sm:gap-4">
            <button
              className="px-3 sm:px-5 py-1.5 sm:py-2.5 hover:bg-[var(--border-color)] rounded-xl transition-all duration-300 font-medium text-sm sm:text-base"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-3 sm:px-5 py-1.5 sm:py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-300 font-medium shadow-sm text-sm sm:text-base"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </motion.div>
      </div>
    </dialog>
  )
}

export default DeleteModal 