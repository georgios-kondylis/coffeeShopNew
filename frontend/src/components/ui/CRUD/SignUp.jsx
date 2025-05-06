import React, { useState } from 'react';

const SignUp = ({ setSignUpPageActive, setLogInPageActive }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backEndUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    const dataToSend = new FormData();
    dataToSend.append('firstName', formData.firstName);
    dataToSend.append('lastName', formData.lastName);
    dataToSend.append('email', formData.email.toLowerCase().trim());
    dataToSend.append('password', formData.password);
    if (imageFile) dataToSend.append('image', imageFile); // 👈 this must match multer's `.single("image")`

    try {
      const res = await fetch(`${backEndUrl}/api/users/sign-up`, {
        method: 'POST',
        body: dataToSend, // 👈 browser sets content-type automatically
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      console.log('User created:', data);
      setSignUpPageActive(false);
      setLogInPageActive(true);
    } catch (error) {
      console.error('Signup error:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#00000090] flex items-center justify-center z-50">
      <div className="text-[#f8f4f0] bgDark w-[90%] max-w-[400px] p-6 rounded-xl shadow-lg relative grayBorder">

        <button className="absolute top-3 right-4 text-[20px] text-[#f3cdac] hover:text-white transition-all"
          onClick={() => setSignUpPageActive(false)} >
          <i className="hover:text-[#f3cdac] fa-solid fa-xmark"></i>
        </button>

        <h2 className="text-[22px] font-semibold mb-4 text-center text-[#f3cdac]">Create an Account</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

          {/* 📸 Profile Picture Upload */}
          <label className="text-sm text-[#f3cdac] mt-1">Profile Picture</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="grayBorder file:bg-[#f3cdac] file:cursor-pointer file:text-black file:font-medium file:px-3 file:py-1 file:rounded file:border-none text-[14px] bg-transparent rounded-[4px] px-[10px] py-[5px] cursor-pointer"
          />

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
            className="grayBorder logIn_signUp_inputs w-full"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="logIn_signUp_inputs w-full"
            />
            <i onClick={() => setShowPassword((prev) => !prev)}
              className={`absolute top-[10px] right-[10px] text-[#999] cursor-pointer fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
            ></i>
          </div>

          <button type="submit" className="logIn_signUp_SUBMIT" >
            Sign Up
          </button>
        </form>

        <p className="text-xs text-center mt-4 text-[#ccc]">
          Already have an account?{' '}
          <span className="text-[#f3cdac] underline cursor-pointer"
            onClick={() => { setSignUpPageActive(false); setLogInPageActive(true); }}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
