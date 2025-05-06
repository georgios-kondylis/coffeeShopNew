// EditAcount.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { backendUrl } from '../../../utils';


const EditAccount = ({ user, setEditAccountActive, setRefresh }) => {

  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [preview, setPreview] = useState(user.image || 'https://res.cloudinary.com/dw6j3b516/image/upload/v1746401635/Screenshot_2025-05-05_at_01.32.34-removebg-preview_xnlmgl.png'); 
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    prevPassword: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const form = new FormData();
      form.append("userId", user._id);
      form.append("firstName", formData.firstName);
      form.append("lastName", formData.lastName);
      form.append("email", formData.email);
      form.append("prevPassword", formData.prevPassword);
      if (formData.password) {
        form.append("password", formData.password);
      }
      if (imageFile) {
        form.append("image", imageFile);
      }
  
      const res = await fetch(`${backendUrl}/api/users/update`, {
        method: "PUT",
        body: form,
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        setMessage(data.message);
        setTimeout(() => setMessage(null), 2000);
        return;
      }
  
      sessionStorage.setItem("user", JSON.stringify(data.user));
      setRefresh(prev => !prev); // update from parent if needed
      setEditAccountActive(false);
  
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-[#00000090] flex items-center justify-center z-50">
      <motion.div className="text-[#f8f4f0] bgDark w-[90%] max-w-[400px] p-6 rounded-xl shadow-lg relative grayBorder"
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: 20 }}
       transition={{ duration: 0.3 }}>
        
        {/* Close Button */}
        <button className="absolute top-3 right-4 text-[20px] text-[#f3cdac] hover:text-white transition-all"
          onClick={() => setEditAccountActive(false)} >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Title */}
        <h2 className="text-[22px] font-semibold mb-[20px] text-center text-[#f3cdac]">Edit Account</h2>

              {/* Profile Picture Upload */}
        <div className="flex items-center gap-4 mb-4">
          {preview && (
            <img src={preview} alt="Preview" className="w-12 h-12 rounded-full object-cover" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file:bg-[#f3cdac] file:cursor-pointer w-[60%] file:font-medium file:px-[15px] file:py-[7px] file:rounded file:border-none text-[14px] cursor-pointer"
          />
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-1/2 logIn_signUp_inputs"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-1/2 logIn_signUp_inputs"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="logIn_signUp_inputs"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
              className="logIn_signUp_inputs w-full"
            />
            <i onClick={() => setShowPassword((prev) => !prev)}
              className={`absolute top-[10px] right-[10px] text-[#999] cursor-pointer fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
            ></i>
          </div>

          <div className="relative">
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              name="prevPassword"
              placeholder="Current Password (Required)"
              value={formData.prevPassword}
              onChange={handleChange}
              required
              className="logIn_signUp_inputs w-full"
            />
            <i onClick={() => setShowCurrentPassword((prev) => !prev)}
              className={`absolute top-[10px] right-[10px] text-[#999] cursor-pointer fa-solid ${showCurrentPassword ? 'fa-eye-slash' : 'fa-eye'}`} >
            </i>
          </div>

          <button type="submit" disabled={loading}
            className="logIn_signUp_SUBMIT" >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>

        {/* Error Message */}
        <AnimatePresence>
          {message !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute flex gap-[10px] borderGray items-center justify-center w-full h-[40px] left-0 bottom-[-50px] bgDark roundCorner grayBorder textRed"
            >
              <p>{message}</p>
              <i className="textRed fa-solid fa-circle-exclamation"></i>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};

export default EditAccount;
