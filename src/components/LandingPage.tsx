import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="flex flex-col justify-end h-full px-6 pb-12 pt-16 bg-[#F5F5F5] overflow-hidden"
      id="landing-screen"
    >
      {/* Visual top blank area to push content to the bottom half */}
      <div className="flex-1" />

      {/* Welcome Heading and Paragraph details */}
      <div className="space-y-3 mb-10 text-left">
        <h1
          id="landing-title"
          className="text-3xl font-extrabold text-[#1D1C24] tracking-tight text-3xl font-bold"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Welcome to PopX
        </h1>
        <p
          id="landing-description"
          className="text-[15px] leading-relaxed text-[#9B99A0] font-normal"
        >
          Lorem ipsum dolor sit amet, <br />consectetur adipiscing elit,
        </p>
      </div>

      {/* Structured Action Buttons with exact branding colors */}
      <div className="space-y-3" id="landing-actions">
        <button
          id="btn-create-account"
          onClick={() => navigate('/register')}
          className="w-full py-3.5 px-4 bg-[#6C3EFA] text-white text-sm font-semibold rounded-md shadow-sm active:scale-[0.98] transition-transform duration-100 cursor-pointer text-center"
        >
          Create Account
        </button>
        <button
          id="btn-already-registered"
          onClick={() => navigate('/login')}
          className="w-full py-3.5 px-4 bg-[#C8B4FA] text-[#1D1C24] text-sm font-semibold rounded-md active:scale-[0.98] transition-all duration-100 cursor-pointer text-center"
        >
          Already Registered? Login
        </button>
      </div>
    </motion.div>
  );
}