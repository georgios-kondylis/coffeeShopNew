// Acount.jsx
import React from "react";
import { useContext } from "react";
import { ProductsContext } from "../../App";

const Acount = ({
  setLogInPageActive,
  setEditAccountActive,
  setDeleteAccountActive,
}) => {
  const { user, setRefresh, acountIsActive, setAcountIsActive } = useContext(ProductsContext);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setAcountIsActive(false);
    setRefresh(prev => !prev)
  };

  const handleLoginClick = () => {
    setLogInPageActive(true);
    setAcountIsActive(false);
  };

  const handleEditProfile = () => {
    setEditAccountActive((prev) => !prev);
    setAcountIsActive(false);
  };

  const handleDeleteAccount = () => {
    setAcountIsActive(false);
    setDeleteAccountActive(true);
  };

  return (
    <div className="bgDark text-right border border-[#3e3e3e] w-[130px] rounded-[8px] overflow-hidden shadow-lg text-[14px] font-medium">
      {user && (
        <div className="accountOptionsProfile flex items-center gap-[5px] justify-between border-b border-[#8c8c8c75]">
         <img src={user.image || 'https://res.cloudinary.com/dw6j3b516/image/upload/v1746401635/Screenshot_2025-05-05_at_01.32.34-removebg-preview_xnlmgl.png'} className="w-[30px] h-[30px] object-cover rounded-full" alt="" />
         <h1>{user.firstName}</h1> 
        </div>
      )}

      {user ? (
        <div className="accountOptions" onClick={handleLogout}>
          Log Out
        </div>
      ) : (
        <div className="accountOptions" onClick={handleLoginClick}>
          Log In
        </div>
      )}

      {user && (
        <div className="accountOptions" onClick={handleEditProfile}>
          Edit Profile
        </div>
      )}

      {user && (
        <div className="accountOptions hover:text-[#ff5c5c]" onClick={handleDeleteAccount}>
          Delete Account
        </div>
      )}
    </div>
  );
};

export default Acount;
