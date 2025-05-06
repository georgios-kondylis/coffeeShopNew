import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DeleteAccount = ({ user, setDeleteAccountActive, setRefresh }) => {

  const handleDelete = async () => {
    const backEndUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${backEndUrl}/api/users/${user._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`,},
      });

      if (!response.ok) {
        console.error("Failed to delete account");
        return;
      }

      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      setDeleteAccountActive(false);
      setRefresh(prev => !prev);
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#00000090] flex items-center justify-center z-50">
      <motion.div className="z-50 bgDark text-[#f8f4f0] w-[90%] max-w-[400px] p-6 rounded-xl shadow-lg relative grayBorder"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}>
        
        {/* Close Button */}
        <button className="absolute top-3 right-4 text-[20px] text-[#f3cdac] hover:text-white transition-all"
          onClick={() => setDeleteAccountActive(false)}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Title */}
        <h2 className="text-[22px] font-semibold mb-4 text-center text-[#f3cdac]">Delete Account</h2>

        {/* Message */}
        <p className="text-center mb-6 text-sm text-[#ccc]">
          Are you sure you want to permanently delete your account?
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button onClick={handleDelete}
            className="px-4 py-2 bg-[#ff5f5f] text-white rounded-lg hover:bg-[#e04b4b] transition1">
            Yes, Delete
          </button>
          <button onClick={() => setDeleteAccountActive(false)}
            className="px-4 py-2 border border-[#f3cdac] text-[#f3cdac] rounded-lg hover:bg-[#f3cdac20] transition1">
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteAccount;
