import React from "react";
import { useState } from "react";
import SideNav from "./SideNav";
import Acount from "../ui/Acount";
import LogIn from "../ui/CRUD/LogIn";
import SignUp from "../ui/CRUD/SignUp";
import EditAccount from "../ui/CRUD/EditAccount";
import DeleteAcount from "../ui/CRUD/DeleteAcount";
import Cart from "../ui/Cart/Cart";
import { useNavigate, NavLink, Link, useLocation } from "react-router-dom";
import SearchBar from "../ui/SearchBar";
import { useContext } from "react";
import { ProductsContext } from "../../App";

const Navbar = ({
  cartIsActive,
  setCartIsActive,
}) => {

  const { user, setRefresh, acountIsActive, setAcountIsActive, cartItems, logInPageActive, setLogInPageActive } = useContext(ProductsContext);
  const location = useLocation();
 

  const [hamburgerMenuIsActive, setHamburgerMenuIsActive] = useState(false);

  const [searchBarIsActive, setSearchBarIsActive] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState(false);

  const [signUpPageActive, setSignUpPageActive] = useState(false);
  const [editAccountActive, setEditAccountActive] = useState(false);
  const [deleteAccountActive, setDeleteAccountActive] = useState(false);

  return (
    <div className="z-50 mainPX bgDark fixed top-0 left-0 shadow-[0px_2px_10px_#000000] flex items-center justify-center w-full"
          onClick={() => setAcountIsActive(false)}>
      <div className={`flex w-full min-h-[70px] justify-between items-center W_LIMIT relative`}
      >
        {/* Logo & Hamburger */}
        <div className="flex items-center gap-[5px]">
         
          {location.pathname === '/menu' ?
           <img src="/logo2.png" alt=""
            className="w-[70px] rounded-full"
          /> 
          : 
          <img src="/logo2.png" alt=""
          className="w-[70px] rounded-full max-md:absolute max-md:left-1/2 max-md:translate-x-[-50%]"
          />}
          
          {location.pathname === "/" && 
          <div onClick={() => setHamburgerMenuIsActive(!hamburgerMenuIsActive)}
               className="hamburger md:hidden cursor-pointer flex flex-col gap-[5px] w-[23px]" >
            <span className="hamburger_bar"></span>
            <span className="hamburger_bar"></span>
            <span className="hamburger_bar"></span>
          </div>}
        </div>

        {/* Nav Links */}
        {location.pathname === "/" && (
          <div className="max-md:hidden flex gap-[15px]">
            <a href="#" className="navLink">
              Home
            </a>
            <a href="#about" className="navLink">
              About
            </a>
            <a href="#menu" className="navLink">
              Menu
            </a>
            <a href="#reviews" className="navLink">
              Reviews
            </a>
            <a href="#contact" className="navLink">
              Contact
            </a>
          </div>
        )}

        {/* Icons */}
        <div className="flex gap-[15px] items-center">
          {location.pathname === "/menu" && (
            <SearchBar // SEARCH BAR <----------------------------------------
              searchBarIsActive={searchBarIsActive}
              setSearchBarIsActive={setSearchBarIsActive}
              searchBarValue={searchBarValue}
              setSearchBarValue={setSearchBarValue}
            />
          )}
          {location.pathname === "/" && (
            <a href="#contact">
             <i className="iNav fa-solid fa-location-dot"></i>
            </a>
            
          )}
          <div id="CART" className="relative">
            <i className="iNav fas fa-shopping-cart"
              onClick={() => setCartIsActive((prev) => !prev)} >
            </i>

            {cartItems.length > 0 && (
              <div className="absolute pointer-events-none -top-[7px] -right-[10px] bgRed text-[12px] min-w-[16px] h-[16px] px-[4px] flex items-center justify-center rounded-full text-white font-semibold shadow-md" >
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </div>
            )}
          </div>

          <div className="relative">
            <i className="iNav fa-solid fa-user"
             onClick={(e) => {
              e.stopPropagation(); 
              setAcountIsActive(prev => !prev);
            }}>
            </i>
            {acountIsActive && (
              <div className="absolute right-[-10px] top-[30px] rounded-[8px]">
                <Acount
                  setAcountIsActive={setAcountIsActive}
                  setLogInPageActive={setLogInPageActive}
                  setEditAccountActive={setEditAccountActive}
                  setDeleteAccountActive={setDeleteAccountActive}
                />
              </div>
            )}
          </div>
        </div>

        <SideNav
          hamburgerMenuIsActive={hamburgerMenuIsActive}
          setHamburgerMenuIsActive={setHamburgerMenuIsActive}
        />

        {/* Absolutes */}
        {logInPageActive && (
          <LogIn
            setLogInPageActive={setLogInPageActive}
            setSignUpPageActive={setSignUpPageActive}
            setRefresh={setRefresh}
          />
        )}
        {signUpPageActive && (
          <SignUp
            setLogInPageActive={setLogInPageActive}
            setSignUpPageActive={setSignUpPageActive}
          />
        )}
        {editAccountActive && (
          <EditAccount
            user={user}
            setEditAccountActive={setEditAccountActive}
            setRefresh={setRefresh}
          />
        )}
        {deleteAccountActive && (
          <DeleteAcount
            user={user}
            setDeleteAccountActive={setDeleteAccountActive}
            setRefresh={setRefresh}
          />
        )}

        <Cart setCartIsActive={setCartIsActive} cartIsActive={cartIsActive} />
      </div>
    </div>
  );
};

export default Navbar;
