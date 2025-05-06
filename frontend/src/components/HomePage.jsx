import React, { useState, useEffect, useContext } from 'react';
import About from './About/About';
import AboutSmall from './About/AboutSmall';
import AboutMid from './About/AboutMid';
import { maxLG, maxMD, maxSM } from '../utils';
import Home from './Home/Home';
import Menu from './Menu/Menu';
import { ProductsContext } from '../App';
import Reviews from './Reviews/Reviews';
import ReviewsMobile from './Reviews/ReviewsMobile';
import Footer from './Footer/Footer';

const HomePage = () => {

  const { user, setRefresh, acountIsActive, setAcountIsActive, cartItems } = useContext(ProductsContext);
  const [smallScreen, setSmallScreen] = useState(false);
  const [mediumScreen, setMediumScreen] = useState(false);
  const [largeScreen, setLargeScreen] = useState(false);

  useEffect(() => { // add Custom breakpoint with window resize
    const handleResize = () => {
      setSmallScreen(maxSM());
      setMediumScreen(maxMD());
      setLargeScreen(maxLG());
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial size based on window width

    return () => window.removeEventListener('resize', handleResize);
  }, []);  

  return (
    <>
      <section id="home" className="mt-[70px] h-[calc(100vh-70px)] flex w-full justify-center text-white mainPX"
               style={{ backgroundImage: "url('/images/homeBg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center',}} 
               onClick={() => setAcountIsActive(false)}>

       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#161616] via-black/5 to-transparent z-0 pointer-events-none" />
       <Home user={user}/>
      </section>

      <section id="about" className="w-full flex justify-center items-center mainPX" 
                          onClick={() => setAcountIsActive(false)}>
        {smallScreen ? <AboutSmall />
          : mediumScreen ? <AboutMid />
          : <About />  }
      </section>

      <section id="menu" className="w-full flex justify-center items-center mainPX"
                         onClick={() => setAcountIsActive(false)}>
         <Menu/>
      </section>
      <section id="reviews" className="w-full flex justify-center items-center mainPX "
                            onClick={() => setAcountIsActive(false)}>
        {mediumScreen ? <ReviewsMobile/> : <Reviews/>}
      </section>

      <section id="contact" className="relative border-t border-[#80808075] w-full flex justify-center items-center mainPX mt-[100px] 
                bg-[url('/images/footerBG.png')] bg-cover bg-center">
      {/* Top Gradient */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#101010] via-black/80 to-transparent z-0 pointer-events-none" />
        <Footer/>
      </section>
    </>
  );
}

export default HomePage;
