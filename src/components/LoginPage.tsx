import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAppState } from '../context/AppContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { updateUser } = useAppState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isActive = email.trim().length > 0 && password.trim().length > 0;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = { ...errors };
    if (!email.trim()) {
      newErrors.email = 'This field is mandatory';
    } else {
      delete newErrors.email;
    }
    
    if (!password.trim()) {
      newErrors.password = 'This field is mandatory';
    } else {
      delete newErrors.password;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Simulate login by writing details and navigating
    updateUser({ email });
    navigate('/profile');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="flex flex-col h-full bg-[#F5F5F5] text-left pt-14 overflow-hidden"
      id="login-screen"
    >
      <div className="px-6 flex-1 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Header Typography */}
          <div className="space-y-2">
            <h2 id="login-title" className="text-[26px] font-bold text-[#1D1C24] leading-tight">
              Signin to your <br />PopX account
            </h2>
            <p id="login-subtitle" className="text-sm font-normal text-[#9B99A0]">
              Lorem ipsum dolor sit amet, <br />consectetur adipiscing elit,
            </p>
          </div>

          {/* Login Form Form Fields with noValidate */}
          <form onSubmit={handleLogin} noValidate className="space-y-6 pt-4" id="login-form">
            {/* Custom Input: Email Address */}
            <div className="relative" id="field-email-container">
              <input
                id="input-login-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors((prev) => {
                      const copy = { ...prev };
                      delete copy.email;
                      return copy;
                    });
                  }
                }}
                placeholder="Enter email address"
                className={`w-full px-4 py-3.5 border rounded-md text-sm text-zinc-900 focus:outline-none focus:ring-1 transition-all bg-transparent placeholder-zinc-300 ${
                  errors.email ? 'border-[#ff3333] focus:border-[#ff3333] focus:ring-[#ff3333]' : 'border-[#CCCCCC] focus:border-[#6C3EFA] focus:ring-[#6C3EFA]'
                }`}
              />
              <label 
                htmlFor="input-login-email"
                className={`absolute -top-2.5 left-3.5 px-1 bg-[#F5F5F5] text-xs font-medium whitespace-nowrap transition-colors ${
                  errors.email ? 'text-[#ff3333]' : 'text-[#6C3EFA]'
                }`}
              >
                Email Address<span className="text-rose-500 ml-0.5">*</span>
              </label>
              {errors.email && (
                <p className="text-[#ff3333] text-xs mt-1.5 font-medium ml-1" id="error-login-email">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Custom Input: Password */}
            <div className="relative" id="field-password-container">
              <input
                id="input-login-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors((prev) => {
                      const copy = { ...prev };
                      delete copy.password;
                      return copy;
                    });
                  }
                }}
                placeholder="Enter password"
                className={`w-full px-4 py-3.5 border rounded-md text-sm text-zinc-900 focus:outline-none focus:ring-1 transition-all bg-transparent placeholder-zinc-300 ${
                  errors.password ? 'border-[#ff3333] focus:border-[#ff3333] focus:ring-[#ff3333]' : 'border-[#CCCCCC] focus:border-[#6C3EFA] focus:ring-[#6C3EFA]'
                }`}
              />
              <label 
                htmlFor="input-login-password"
                className={`absolute -top-2.5 left-3.5 px-1 bg-[#F5F5F5] text-xs font-medium whitespace-nowrap transition-colors ${
                  errors.password ? 'text-[#ff3333]' : 'text-[#6C3EFA]'
                }`}
              >
                Password<span className="text-rose-500 ml-0.5">*</span>
              </label>
              {errors.password && (
                <p className="text-[#ff3333] text-xs mt-1.5 font-medium ml-1" id="error-login-password">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Action Button with active/inactive state styles */}
            <button
              id="btn-login"
              type="submit"
              className={`w-full py-3.5 px-4 rounded-md text-sm font-semibold transition-colors duration-150 text-center select-none ${
                isActive 
                  ? 'bg-[#6C3EFA] text-white cursor-pointer hover:bg-[#000000]' 
                  : 'bg-[#CBCBCB] text-white cursor-not-allowed'
              }`}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}