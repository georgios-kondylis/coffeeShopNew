import React from 'react';

const Footer = () => {
  return (
    <footer className="relative flex flex-col items-center overflow-hidden">
    
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center py-10 px-4 text-center space-y-4 w-full max-w-[500px]">
        <img className="w-[200px]" src="logo2.png" alt="Brew Haven Logo" />

        <div className='flex items-start gap-2 max-sm:gap-0'>
          <i className="fas fa-map-marker-alt text-[#e0bf7f] mt-[2px]" />
          <p className="flex items-start">
            Restaurang Gatan, Delicious City, Stockholm 18336, SW
          </p>
        </div>
       

        <a href="mailto:georgios.p.kondylis@gmail.com" className="flex items-center gap-2 hover:text-[#e0bf7f] quicksand">
          <i className="fas fa-envelope text-[#e0bf7f]" />
          georgios.p.kondylis@gmail.com
        </a>

        <a href="tel:+460769018014" className="flex items-center gap-2 hover:text-[#e0bf7f] quicksand">
          <i className="fas fa-phone text-[#e0bf7f]" />
          Booking Request: +46 076 901 8014
        </a>

        <p className="flex items-center gap-2 ">
          <i className="fas fa-clock text-[#e0bf7f]" />
          Open: 09:00 am - 01:00 pm
        </p>
      </div>

      {/* Newsletter Section */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[500px] text-center space-y-2 mt-10 px-4">
        <h2 className="text-[24px] font-semibold">Get News & Offers</h2>
        <p className="text-[16px]">Subscribe & get <span className="text-[#e0bf7f] font-medium">25% off</span></p>

        <form className="flex w-full bgDark grayBorder roundCorner overflow-hidden mt-4">
          <div className="flex items-center px-4">
            <i className="fas fa-envelope text-[#e0bf7f]" />
          </div>
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-transparent text-white placeholder-gray-400 px-2 py-3 focus:outline-none"
          />
          <button className="bg-[#e0bf7f] text-black font-semibold max-sm:px-[3px] max-sm:text-[13px] px-6 hover:bg-[#f6e0b6] transition-all" >
            Subscribe
          </button>
        </form>
      </div>

      <div className="py-6 text-[14px] text-gray-400 relative z-10">
        &copy; {new Date().getFullYear()} Georgios Kondylis. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
