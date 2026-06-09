import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { AppProvider } from './context/AppContext';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} {...({ key: location.pathname } as any)}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        {/* STRICT WINDOW LOCK: h-[100dvh] and overflow-hidden prevent the browser window from scrolling */}
        <div className="h-[100dvh] w-full bg-[#E5E5E5] flex items-center justify-center p-0 sm:p-4 font-sans antialiased text-zinc-900 selection:bg-purple-200 overflow-hidden">
          
          {/* RESPONSIVE HEIGHT LOCK: max-h-[844px] ensures it shrinks on small screens instead of scrolling */}
          <div className="w-full max-w-[390px] h-full max-h-[844px] bg-[#F5F5F5] sm:rounded-3xl shadow-xl overflow-hidden flex flex-col relative border border-gray-300/30">
            
            <div className="flex-1 overflow-hidden relative flex flex-col justify-between">
              <AnimatedRoutes />
            </div>
            
          </div>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}