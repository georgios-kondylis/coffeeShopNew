import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../utils";

const AboutMid = () => {
  return (
    <motion.section
      className="flex flex-col aboutSectionContainer W_LIMIT"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <header className="headerSplit">
        What makes us so special
      </header>

      <div className="w-full flex flex-col gap-[25px]">

        <div className="flex flex-col md:flex-row gap-[25px]">
          <motion.img
            src="/images/pouring.png"
            alt=""
            className="w-full md:w-[49%] object-cover roundCorner"
            variants={fadeUp}
          />

          <motion.p
            className="leading-[1.45] md:leading-[1.3] text-[17px] md:text-[21px] xl:text-[20px]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            At the heart of our café lies a unique blend of cultures where the Greek passion for <span>coffee</span> meets the Swedish tradition of <span>fika</span>. <br />
            In Greece, <span>coffee</span> is more than just a drink, it’s a lifestyle, a daily ritual that brings people together. That same spirit flows through every cup we serve. <br />
            Sweden’s <span>fika</span> adds a moment of calm, a break in the day to enjoy <span>coffee</span>, conversations, and connection. <br />
            We bring both of these worlds together, crafting each cup with care and professionalism using top-quality beans like <strong>B.Royal</strong>, known for their rich aroma and smooth depth.
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row-reverse gap-[25px]">
          <motion.img
            src="/images/fik.png"
            alt=""
            className="w-full md:w-[49%] object-cover roundCorner"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          />

          <motion.p className="leading-[1.45] md:leading-[1.3] text-[17px] md:text-[21px] xl:text-[20px]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            But no great <span>coffee</span> moment is complete without something sweet to go with it. <br />
            That’s where Swedish <span>fika</span> truly shines, pairing <span>coffee</span> with delicious baked goods. <br />
            Whether it’s a rich slice of homemade mud cake or a warm, fresh-baked kanelbulle, we offer treats that perfectly complement every sip. <br />
            Our goal is to create more than just a <span>coffee</span> break, we want to offer you a full sensory experience of culture, comfort, and connection. <br />
            This is <span>coffee</span> made with love and always served with a smile.
          </motion.p>
        </div>

      </div>
    </motion.section>
  );
};

export default AboutMid;
