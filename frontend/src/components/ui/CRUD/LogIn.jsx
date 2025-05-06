import React, { useState } from 'react'

const LogIn = ({ setLogInPageActive, setSignUpPageActive, setRefresh }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageActive, setErrorMessageActive] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //------ API CALL ------//
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
  
    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill in all fields");
      return;
    }
  
    const payload = {
      email: formData.email.toLowerCase().trim(),
      password: formData.password
    };
  
    const backEndUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
  
    try {
      const response = await fetch(`${backEndUrl}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setErrorMessage(data.message || "Something went wrong");
        setErrorMessageActive(true);
        setTimeout(() => {setErrorMessageActive(false)}, 2000)
        return;
      }
 
      if (data.user) {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user', JSON.stringify(data.user));
        setLogInPageActive(false);
        setRefresh(prev => !prev)
      } else {
        setErrorMessage("User data is missing!");
      }
  
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred. Please try again.");
      setErrorMessageActive(true);
      setTimeout(() => {setErrorMessageActive(false)}, 2000)
    }
  };
  
  return (
    <div className="fixed inset-0 bg-[#00000090] flex items-center justify-center z-50">
      <div className="z-50 bgDark text-[#f8f4f0] w-[90%] max-w-[400px] p-6 rounded-xl shadow-lg relative grayBorder">
        {/* Close Button */}
        <button className="absolute top-3 right-4 text-[20px] text-[#f3cdac] hover:text-white transition-all"
          onClick={() => setLogInPageActive(false)}>

          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Title */}
        <h2 className="text-[22px] font-semibold mb-4 text-center text-[#f3cdac]">Welcome Back</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="email"  name="email" 
            placeholder="Email"
            className="logIn_signUp_inputs"
            onChange={handleChange}
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
          <button type="submit" className="logIn_signUp_SUBMIT">
            Log In
          </button>
        </form>

        {/* Sign Up */}
        <p className="text-xs text-center mt-4 text-[#ccc]">
          Don't have an account? &nbsp;
          <span className="text-[#f3cdac] underline cursor-pointer" 
            onClick={() => {setLogInPageActive(false); setSignUpPageActive(true)}}>
            Sign up
          </span>
        </p>

        {/* CUSTOM POP UP MESSAGE */}
        <div className={`bgDark absolute w-full text-center bottom-[-50px] left-0 px-[15px] py-[7px] rounded-[8px] grayBorder transition1
          ${errorMessageActive ? 'opacity-100 ' : 'opacity-0 pointer-events-none'} z-0`}>
          {errorMessage}
        </div>


      </div>
    </div>
  )
}

export default LogIn
