import React, { useEffect, useRef, useState, useContext } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import ReviewCard from './ReviewCard';
import AddReview from './AddReview';
import { backendUrl } from '../../utils';
import { ProductsContext } from '../../App';

const ReviewsMobile = () => {
  const [realReviews, setRealReviews] = useState([]);
  const [addReviewOpen, setAddReviewOpen] = useState(false);
  const [stars, setStars] = useState(5);
  const [text, setText] = useState('');
  const [experienceImage, setExperienceImage] = useState(null);
  const { user, setLogInPageActive, refresh, setRefresh } = useContext(ProductsContext);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const [showSwipe, setShowSwipe] = useState(true);

  useEffect(() => {
    if (isInView) {
      setShowSwipe(true);
      const timer = setTimeout(() => setShowSwipe(false), 1700);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

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

      setRealReviews(prev => [data.review, ...prev]);
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

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }} ref={ref} className="w-full relative flex flex-col mt-[30px] lg:hidden">
      <h2 className="headerSplit">Customer Reviews</h2>

      <div className='w-full flex justify-end'>
        <button className='BTN_STYLES_REVIEW mb-[30px]'
          onClick={user ? () => setAddReviewOpen(true) : () => setLogInPageActive(true)}>
          {!user ? 'Log In To add a review' : 'Add a review'}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="flex w-full p-[20px] gap-[15px] roundCorner overflow-x-scroll snap-x snap-mandatory scroll-smooth"
      >
        {realReviews.map((review, i) => (
          <div key={i} className="w-[95%] snap-center shrink-0">
            <ReviewCard review={review} />
          </div>
        ))}
      </motion.div>

      <AnimatePresence>
        {showSwipe && isInView && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="absolute w-full bottom-0 left-0 flex justify-center"
          >
            <img src="/icons/swipe.gif" alt="swipe gesture" className="w-[150px]" />
          </motion.div>
        )}
      </AnimatePresence>

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

export default ReviewsMobile;
