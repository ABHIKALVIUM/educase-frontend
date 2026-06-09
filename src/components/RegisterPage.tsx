import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAppState } from '../context/AppContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { updateUser } = useAppState();

  // Local state for the 5 forms
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isAgency, setIsAgency] = useState<boolean>(true); // "Yes" selected by default

  // Validation error states
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/; // Exactly 10 digits

    // Full Name Validation
    if (!fullName.trim()) newErrors.fullName = 'This field is mandatory';
    
    // Strict Phone Validation (10 digits only)
    if (!phone.trim()) {
      newErrors.phone = 'This field is mandatory';
    } else if (!phoneRegex.test(phone.trim())) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }
    
    // Strict Email Validation
    if (!email.trim()) {
      newErrors.email = 'This field is mandatory';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Strict Password Validation
    if (!password.trim()) {
      newErrors.password = 'This field is mandatory';
    } else if (password.trim().length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);

    // Stop execution if there are any validation errors
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // State passing as per specification
    updateUser({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      companyName: companyName.trim(),
      isAgency: isAgency
    });

    // Navigate to profile page
    navigate('/profile');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="flex flex-col h-full bg-[#F5F5F5] text-left justify-between pt-10"
      id="register-screen"
    >
      {/* SCROLLING DISABLED HERE: Changed overflow-y-auto to overflow-hidden */}
      <div className="flex-1 overflow-hidden">
        <div className="px-6 pt-5 pb-8 space-y-6">
          {/* Section Header */}
          <div className="space-y-1">
            <h2 id="register-title" className="text-[26px] font-bold text-[#1D1C24] leading-tight leading-8">
              Create your <br />PopX account
            </h2>
          </div>

          {/* Registration Input Fields form with noValidate */}
          <form onSubmit={handleRegisterSubmit} noValidate className="space-y-6 pt-4" id="register-form">
            
            {/* Field 1: Full Name */}
            <div className="relative" id="reg-field-name-container">
              <input
                id="input-reg-name"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) {
                    setErrors(prev => {
                      const copy = { ...prev };
                      delete copy.fullName;
                      return copy;
                    });
                  }
                }}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3.5 border rounded-md text-sm text-zinc-900 focus:outline-none focus:ring-1 transition-all bg-transparent placeholder-zinc-300 ${
                  errors.fullName ? 'border-[#ff3333] focus:border-[#ff3333] focus:ring-[#ff3333]' : 'border-[#CCCCCC] focus:border-[#6C3EFA] focus:ring-[#6C3EFA]'
                }`}
              />
              <label 
                htmlFor="input-reg-name"
                className={`absolute -top-2.5 left-3.5 px-1 bg-[#F5F5F5] text-xs font-medium whitespace-nowrap transition-colors ${
                  errors.fullName ? 'text-[#ff3333]' : 'text-[#6C3EFA]'
                }`}
              >
                Full Name<span className="text-rose-500 ml-0.5">*</span>
              </label>
              {errors.fullName && (
                <p className="text-[#ff3333] text-xs mt-1.5 font-medium ml-1" id="error-reg-name">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Field 2: Phone Number */}
            <div className="relative" id="reg-field-phone-container">
              <input
                id="input-reg-phone"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) {
                    setErrors(prev => {
                      const copy = { ...prev };
                      delete copy.phone;
                      return copy;
                    });
                  }
                }}
                placeholder="Enter phone number"
                className={`w-full px-4 py-3.5 border rounded-md text-sm text-zinc-900 focus:outline-none focus:ring-1 transition-all bg-transparent placeholder-zinc-300 ${
                  errors.phone ? 'border-[#ff3333] focus:border-[#ff3333] focus:ring-[#ff3333]' : 'border-[#CCCCCC] focus:border-[#6C3EFA] focus:ring-[#6C3EFA]'
                }`}
              />
              <label 
                htmlFor="input-reg-phone"
                className={`absolute -top-2.5 left-3.5 px-1 bg-[#F5F5F5] text-xs font-medium whitespace-nowrap transition-colors ${
                  errors.phone ? 'text-[#ff3333]' : 'text-[#6C3EFA]'
                }`}
              >
                Phone number<span className="text-rose-500 ml-0.5">*</span>
              </label>
              {errors.phone && (
                <p className="text-[#ff3333] text-xs mt-1.5 font-medium ml-1" id="error-reg-phone">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Field 3: Email Address */}
            <div className="relative" id="reg-field-email-container">
              <input
                id="input-reg-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors(prev => {
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
                htmlFor="input-reg-email"
                className={`absolute -top-2.5 left-3.5 px-1 bg-[#F5F5F5] text-xs font-medium whitespace-nowrap transition-colors ${
                  errors.email ? 'text-[#ff3333]' : 'text-[#6C3EFA]'
                }`}
              >
                Email address<span className="text-rose-500 ml-0.5">*</span>
              </label>
              {errors.email && (
                <p className="text-[#ff3333] text-xs mt-1.5 font-medium ml-1" id="error-reg-email">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Field 4: Password */}
            <div className="relative" id="reg-field-password-container">
              <input
                id="input-reg-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors(prev => {
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
                htmlFor="input-reg-password"
                className={`absolute -top-2.5 left-3.5 px-1 bg-[#F5F5F5] text-xs font-medium whitespace-nowrap transition-colors ${
                  errors.password ? 'text-[#ff3333]' : 'text-[#6C3EFA]'
                }`}
              >
                Password<span className="text-rose-500 ml-0.5">*</span>
              </label>
              {errors.password && (
                <p className="text-[#ff3333] text-xs mt-1.5 font-medium ml-1" id="error-reg-password">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Field 5: Company Name (Now completely optional) */}
            <div className="relative" id="reg-field-company-container">
              <input
                id="input-reg-company"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
                className="w-full px-4 py-3.5 border border-[#CCCCCC] focus:border-[#6C3EFA] focus:ring-[#6C3EFA] rounded-md text-sm text-zinc-900 focus:outline-none focus:ring-1 transition-all bg-transparent placeholder-zinc-300"
              />
              <label 
                htmlFor="input-reg-company"
                className="absolute -top-2.5 left-3.5 px-1 bg-[#F5F5F5] text-xs font-medium whitespace-nowrap transition-colors text-[#6C3EFA]"
              >
                Company name
              </label>
            </div>

            {/* Are you an Agency? Radio selection group */}
            <div className="space-y-2.5" id="reg-agency-section">
              <p className="text-sm font-medium text-[#1D1C24]">
                Are you an Agency?<span className="text-rose-500 ml-0.5">*</span>
              </p>
              
              <div className="flex gap-6 items-center">
                {/* Radio Yes */}
                <label 
                  onClick={() => setIsAgency(true)}
                  className="flex items-center gap-2 cursor-pointer select-none group"
                >
                  <div 
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${
                      isAgency ? 'border-[#6C3EFA]' : 'border-zinc-300 group-hover:border-zinc-400'
                    }`}
                  >
                    {isAgency && (
                      <div className="w-2.5 h-2.5 bg-[#6C3EFA] rounded-full" />
                    )}
                  </div>
                  <span className="text-sm font-normal text-zinc-800">Yes</span>
                </label>

                {/* Radio No */}
                <label 
                  onClick={() => setIsAgency(false)}
                  className="flex items-center gap-2 cursor-pointer select-none group"
                >
                  <div 
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${
                      !isAgency ? 'border-[#6C3EFA]' : 'border-zinc-300 group-hover:border-zinc-400'
                    }`}
                  >
                    {!isAgency && (
                      <div className="w-2.5 h-2.5 bg-[#6C3EFA] rounded-full" />
                    )}
                  </div>
                  <span className="text-sm font-normal text-zinc-800">No</span>
                </label>
              </div>
            </div>

            {/* Hidden Submit Button */}
            <input type="submit" className="hidden" />
          </form>
        </div>
      </div>

      {/* FIXED Bottom Navigation / Registration Button Panel */}
      <div className="px-6 py-4 bg-[#F5F5F5] border-t border-gray-100 flex items-center justify-center" id="reg-submit-panel">
        <button
          onClick={handleRegisterSubmit}
          id="btn-register-submit"
          className="w-full py-3.5 px-4 bg-[#6C3EFA] hover:bg-[#5b32ec] text-white text-sm font-semibold rounded-md shadow-sm active:scale-[0.98] transition-transform duration-100 cursor-pointer text-center"
        >
          Create Account
        </button>
      </div>
    </motion.div>
  );
}