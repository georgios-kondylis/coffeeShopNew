import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../utils";

const AboutSmall = () => {
  return (
    <motion.section
      className="aboutSectionContainer"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <header className="headerSplit">
        What makes us so special
      </header>

      <div className="w-full flex flex-col gap-[25px]">
        <motion.img
          src="/images/wide.png"
          alt=""
          className="w-full object-cover roundCorner"
          variants={fadeUp}
        />

        <motion.p
          className="leading-[1.4] text-[15px] space-y-[15px]"
          variants={fadeUp}
        >
          At the heart of our café lies a unique blend of cultures where the Greek love for 
          <span> coffee</span> meets the Swedish tradition of<span> fika</span>.
          <br />

          <span>Coffee</span> is more than just a drink, it's a ritual, a reason to gather, to talk, to pause, and to appreciate the moment.
          <br />

          That same spirit flows through every cup we serve. Combined with Sweden’s warm embrace of 
          <span> fika</span>, a peaceful moment with coffee and a sweet treat, we've created a space that celebrates both heritage and hospitality.
          <br />

          We craft every cup with care and professionalism, using only top-quality beans like 
          <span className="italic"> B.Royal</span>, known for their rich aroma and smooth depth.
          <br />

          Whether you’re craving a strong espresso, a creamy cappuccino, or something sweet like mud cake or a fresh 
          <span> kanelbulle</span>, we’re here to make every visit feel special.
          <br />

          This is more than just 
          <span> coffee</span>, it’s culture, comfort, and connection, served with a smile.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default AboutSmall;
