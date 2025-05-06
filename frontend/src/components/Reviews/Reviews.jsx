import React, { useEffect, useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewCard from './ReviewCard';
import { backendUrl } from '../../utils';
import { reviews } from '../../utils';
import AddReview from './AddReview';
import { ProductsContext } from '../../App';
import { fadeUp } from '../../utils'; // 👈 import motion variant

const Reviews = () => {
  const [realReviews, setRealReviews] = useState([]);
  const [addReviewOpen, setAddReviewOpen] = useState(false);
  const [stars, setStars] = useState(5);
  const [text, setText] = useState('');
  const [experienceImage, setExperienceImage] = useState(null);
  const { user, setLogInPageActive, refresh, setRefresh } = useContext(ProductsContext);

  const handleSubmitReview = async () => {
    const backEndUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    const formData = new FormData();
    formData.append('stars', stars);
    formData.append('text', text);
    formData.append('userId', user._id);
    if (experienceImage) formData.append('image', experienceImage);

    try {
      const res = await fetch(`${backEndUrl}/api/reviews/post-review`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      console.log('Review submitted:', data);
      setRealReviews((prev) => [data.review, ...prev]);
      setAddReviewOpen(false);
      setText('');
      setStars(5);
      setExperienceImage(null);
    } catch (error) {
      console.error('Error submitting review:', error.message);
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/reviews`);
        const data = await res.json();
        setRealReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [refresh]);

  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(0);
  const reviewsPerPage = 4;

  const totalPages = Math.ceil(realReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = realReviews.slice(startIndex, startIndex + reviewsPerPage);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <motion.section
      className="w-full W_LIMIT flex flex-col mt-[30px]"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="headerSplit">Customer Reviews</h2>

      <div className="w-full flex justify-end">
        <button className="BTN_STYLES_REVIEW mb-[30px]"
          onClick={user ? () => setAddReviewOpen(true) : () => setLogInPageActive(true)} >
          {!user ? 'Log In To add a review' : 'Add a review'}
        </button>
      </div>

      <div className="relative h-[450px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-0 w-full grid gap-[20px] sm:grid-cols-2"
          >
            {currentReviews.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center items-center gap-[20px] mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="BTN_STYLES_PAINATION disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg">{currentPage} / {totalPages}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="BTN_STYLES_PAINATION disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {addReviewOpen && (
        <AddReview
          onClose={() => setAddReviewOpen(false)}
          stars={stars}
          setStars={setStars}
          text={text}
          setText={setText}
          setExperienceImage={setExperienceImage}
          handleSubmitReview={handleSubmitReview}
        />
      )}
    </motion.section>
  );
};

export default Reviews;
