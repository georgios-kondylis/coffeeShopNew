import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SideNav = ({ hamburgerMenuIsActive, setHamburgerMenuIsActive }) => {
  const navigate = useNavigate();

  // Auto-close on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640 && hamburgerMenuIsActive) {
        setHamburgerMenuIsActive(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hamburgerMenuIsActive, setHamburgerMenuIsActive]);

  return (
    <>
      {/* Overlay */}
      <div onClick={() => setHamburgerMenuIsActive(false)}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          hamburgerMenuIsActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* SideNav */}
      <div className={`fixed bgDark top-0 left-0 h-[100dvh] w-[75%] max-w-[300px] z-50 transition-transform duration-300 ease-in-out shadow-lg rounded-tr-[20px] rounded-br-[20px]
          ${hamburgerMenuIsActive ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close icon */}
        <i className="fa-solid fa-circle-xmark absolute right-3 top-3 text-[24px] text-[#f3cdac] hover:text-[#f6e0b6] hover:rotate-90 transition-transform duration-300 cursor-pointer"
          onClick={() => setHamburgerMenuIsActive(false)}
        ></i>

        {/* Logo */}
        <div className="flex justify-center py-6">
          <img src="/logo2.png" alt="Logo" className="w-[120px] rounded-full" />
        </div>

        <hr className="border-t border-[#ffffff30] mx-6" />

        {/* Nav links */}
        <nav className="flex flex-col px-6 py-4 gap-[3px]">
          {[
            { label: "Home", href: "#" },
            { label: "Menu", href: "#menu" },
            { label: "About", href: "#about" },
            { label: "Reviews", href: "#reviews" },
            { label: "Contact", href: "#contact" },
          ].map((item, i) => (
            <a key={i} href={item.href} onClick={() => setHamburgerMenuIsActive(false)}
              className="group flex items-center justify-between w-full px-[10px] py-[7px] roundCorner hover:bg-[#f3cdac] cursor-pointer"
            >
              <span className="mobNavLink text-[16px]">{item.label}</span>
              <img src="/bean.png" alt="Bean"
                className="w-[18px] opacity-0 translate-x-[-5px] group-hover:opacity-100 group-hover:translate-x-0"
              />
            </a>
          ))}

          <div className="flex items-center justify-center w-full mt-[20px]">
            <button className="bgCream hover:bg-[#f6e0b6] textDark font-semibold w-full py-[10px] roundCorner transition1 hover:scale-105"
              onClick={() => {navigate('/menu'); setHamburgerMenuIsActive(false)}}>
              Order Your Coffee
            </button>
          </div>
        </nav>

      </div>
    </>
  );
};

export default SideNav;
