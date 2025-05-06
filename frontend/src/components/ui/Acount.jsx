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
