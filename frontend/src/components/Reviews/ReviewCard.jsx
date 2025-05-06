import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductsContext } from '../../App';

const ReviewCard = ({ review }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true); // to track load errors
  const [confirmReviewDelete, setConfirmReviewDelete] = useState(false);
  const { user, setRefresh } = useContext(ProductsContext);

  const isReviewOwner = user && review.userId._id === user._id; // IMPORTAND
  const hasExperienceImage = review.experienceImage && imageLoaded; // IMPORTAND

  const handleDeleteReview = async () => {
    const backEndUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    try {
      // Make DELETE request to backend to delete the review
      const res = await fetch(`${backEndUrl}/api/reviews/delete-review/${review._id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete the review');
      setRefresh(prev => !prev) 
      setConfirmReviewDelete(false); // Close the confirmation modal
    } catch (error) {
      console.error("Error deleting review:", error.message);
      alert(error.message);
    }
  };

  return (
    <>
      {/* Review Card */}
      <div className='flex w-full h-[200px] max-sm:h-[250px] roundCorner hover:translate-y-[-3px] transition1' onClick={() => setConfirmReviewDelete(false)}>
        <div className={`relative bgBrightMain h-full p-[15px] flex 
          ${hasExperienceImage ? 'w-[60%] rounded-l-[8px]' : 'w-full roundCorner'}`}>

          {/* Profile Image */}
          <div className='absolute top-[-15px] left-[-15px] bgDark p-[3px] rounded-full shadow-[5px_5px_10px_#12121280]'>
            {review.userId ? 
              <img src={review.userId.image ? review.userId.image : "https://res.cloudinary.com/dw6j3b516/image/upload/v1746401635/Screenshot_2025-05-05_at_01.32.34-removebg-preview_xnlmgl.png"} 
                alt={review.userId.firstName}
                className="w-[80px] h-[80px] rounded-full object-cover" 
              /> 
              : ''
            }
          </div>

          {/* Name and Stars */}
          <div className='absolute left-[90px] top-[8px]'>
            <h3 className="font-semibold textDark text-[20px] max-sm:text-[16px]">{review.userId.firstName} {review.userId.lastName}</h3>
            <p className="flex gap-[2px]">
              {Array(review.rating).fill().map((_, i) => (
                <img key={i} className='w-[20px] max-sm:w-[16px]' src="/icons/star.png" alt="" />
              ))}
            </p>
          </div>

          {/* Review Text */}
          <p className="textDark font-medium text-[15px] mt-[70px] italic overflow-y-auto pr-[5px]">
            “{review.text}”
          </p>

            {/* Delete Review Button */}
            {isReviewOwner && user && 
            <span className="absolute top-2 right-2 bg-[#000000cc] text-white text-[12px] px-[8px] py-[2px] rounded cursor-pointer 
                        hover:text-[#df5050] hover:scale-110 transition1"
              onClick={(e) =>{ e.stopPropagation(); setConfirmReviewDelete(prev => !prev); }}  >
              Delete Review
            </span> }

            {/* Confirmation Modal */}
            {confirmReviewDelete && (
              <div className="absolute top-[40px] right-2 w-[280px] bgDark text-white p-[15px] rounded-lg shadow-lg z-10">
                <h1 className="text-center text-[14px] mb-[10px]">Are you sure you want to delete this review?</h1>
                
                <div className="flex justify-around gap-[10px]">
                  <button className="text-[#f44336] hover:bg-[#f44336] hover:text-white transition-all px-[15px] py-[6px] rounded-md" 
                    onClick={handleDeleteReview}  // Trigger the delete function here
                  >
                    Yes, Delete
                  </button>
                  <button 
                    className="text-[#8c8c8c] hover:bg-[beige] hover:text-[#303030] transition-all px-[15px] py-[6px] rounded-md" 
                    onClick={() => setConfirmReviewDelete(false)}  // Close the confirmation
                  >
                    No, Cancel
                  </button>
                </div>
              </div>
            )}

        </div>

        {/* Optional Experience Image */}
        {hasExperienceImage && (
          <div className="w-[40%] flex justify-center cursor-pointer relative group"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={review.experienceImage}
              alt="User experience"
              onError={() => setImageLoaded(false)}
              className="w-full h-full object-center object-cover rounded-r-[8px] shadow-sm transition1"
            />
            
            {/* Tooltip */}
            <span className="absolute bottom-2 right-2 bg-[#000000cc] text-white text-[12px] px-[8px] py-[2px] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Click to enlarge
            </span>
          </div>
        )}
      </div>

      {/* Modal for full image */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#000000aa] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.img
              src={review.experienceImage}
              alt="Experience full view"
              className="max-w-[90%] max-h-[90%] rounded-lg shadow-xl"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReviewCard;
