// AddReview.jsx
import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { ProductsContext } from '../../App';

const AddReview = ({
   onClose, 
   stars, setStars, 
   text, setText, 
   setExperienceImage,
   handleSubmitReview
}) => {
  const { user, setRefresh} = useContext(ProductsContext);
  const [submittingLoading, setSubmittingLoading] = useState(false);

  const handleImageUpload = (e) => {
    setExperienceImage(e.target.files[0]);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000cc]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bgBrightMain roundCorner p-6 max-w-[600px] w-full relative shadow-lg"
      >
        <button onClick={onClose} className="absolute top-4 right-4">
        <i className="textDark hover:text-black text-[23px] fa-solid fa-circle-xmark"></i>
        </button>

        {/* Profile */}
        <div className="flex gap-4 items-center mb-4">
          <img src={user.image? user.image : 'https://res.cloudinary.com/dw6j3b516/image/upload/v1746401635/Screenshot_2025-05-05_at_01.32.34-removebg-preview_xnlmgl.png'} alt={user.name} className="w-[80px] h-[80px] rounded-full object-cover" />
          <div>
            <h3 className="textDark font-semibold text-lg">{user.firstName} {user.lastName}</h3>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <img 
                  key={i} 
                  src={i < stars ? '/icons/star.png' : '/icons/star-empty.png'} alt="star"
                  className="w-[20px] cursor-pointer"
                  onClick={() => setStars(i + 1)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Review Input */}
        <textarea
          className="w-full h-[100px] p-2 roundCorner border border-gray-300 textDark outline-none"
          placeholder="Write your review..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Upload UI */}
        <div className="mt-4">
          <label className="textDark font-medium mb-2 block">Upload an image (optional):</label>
          <input type="file" onChange={handleImageUpload} 
           className="file:bg-[#161616] file:text-white file:cursor-pointer file:border-none file:px-3 file:py-1 file:rounded
                      text-black cursor-pointer text-[14px] bg-transparent rounded-[4px] py-[5px]"/>
        </div>

        {/* Submit Button */}
        <button className="bgDark hover:bg-[#303030] rounded-[5px] py-[5px] mt-4 w-full transition1"
                onClick={handleSubmitReview}>
          Submit Review
        </button>
      </motion.div>
    </div>
  );
};

export default AddReview;
