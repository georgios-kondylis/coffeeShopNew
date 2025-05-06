import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../utils";


const About = () => {
  return (
    <motion.section
      className="aboutSectionContainer"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <header className="headerSplit">
        What makes us so special
      </header>

      <div className="w-full flex flex-col lg:flex-row gap-[25px]">
        <motion.img
          src="/images/pouring.png"
          alt=""
          className="min-w-[300px] w-full object-cover roundCorner"
          variants={fadeUp}
        />

        <motion.p
          className="text-[#f8f4f0] lg:leading-[1.5] lg-[14px] xl:text-[20px]"
          variants={fadeUp}
        >
          At the heart of our café lies a unique blend of cultures where the Greek love for <span>coffee</span> meets the Swedish tradition of <span>fika</span>. <br />
          <span>Coffee</span> is more than just a drink, it's a ritual, a reason to gather, to talk, to pause and appreciate the moment. <br />
          That same spirit flows through every cup we serve. Combined with Sweden’s warm embrace of <span>fika</span>, a moment of peace with <span>coffee</span> and a sweet treat, we’ve created
          a space that celebrates both heritage and hospitality. <br />
          We craft every cup with care and professionalism, using only top-quality beans like B.Royal, known for their rich aroma and smooth depth. <br />
          Whether you’re craving a strong espresso, a creamy cappuccino, or something sweet
          like mud cake or a fresh kanelbulle, we’re here to make sure every
          visit feels special. <br /> 
          This is more than just <span>coffee</span>, it’s culture, comfort, and connection, served with a smile.
        </motion.p>

        <motion.img
          src="/images/fik.png"
          alt=""
          className="min-w-[300px] w-full object-cover roundCorner"
          variants={fadeUp}
        />
      </div>
    </motion.section>
  );
};

export default About;
