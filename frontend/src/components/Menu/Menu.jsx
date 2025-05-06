import React from 'react';
import { favourites } from '../../utils';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp } from '../../utils';

const Menu = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      className="w-full W_LIMIT flex flex-col items-center"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h1 className="headerSplit">People's Favourites</h1>

      <p className="text-center mb-10 text-lg textCream">
        Discover what everyone’s ordering lately or&nbsp;
        <Link to="menu" className="underline hover:text-[#A88F68] transition">
          view full menu
        </Link>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] w-full">
        {favourites.map((item, index) => (
          <motion.div
            key={index}
            className="bgBrightMain rounded-[12px] shadow-md flex flex-col transition1 hover:-translate-y-1 hover:shadow-xl"
            variants={fadeUp}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[220px] rounded-t-[10px] object-cover"
            />
            <div className="p-[15px] flex flex-col gap-2">
              <h2 className="textDark tracking-[1px]">{item.name}</h2>
              <p className="font-semibold textCoffee">{item.description}</p>
              <span className="text-md font-bold text-[#277c78] mt-2">
                {item.price}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Menu;
