import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Camera } from 'lucide-react';
import { useAppState } from '../context/AppContext';

export default function ProfilePage() {
  const { user, updateUser } = useAppState();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger click on hidden input node
  const handleCameraBadgeClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Convert uploaded file to temporary URL
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const localUrl = URL.createObjectURL(file);
      updateUser({ profileImage: localUrl });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="flex flex-col h-full bg-[#F5F5F5] text-left overflow-hidden"
      id="profile-screen"
    >
      {/* Hidden File Input for reactive image change upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        id="camera-file-input"
        className="hidden"
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col pt-4">
        {/* Account Settings Header bar (left-aligned with slate gray text) */}
        <div id="profile-header-bar" className="w-full h-14 bg-[#F5F5F5] border-b border-zinc-100 flex items-center px-6">
          <h2 className="text-[19px] font-bold text-[#4a4a4a] tracking-tight" id="profile-header-title">
            Account Settings
          </h2>
        </div>

        {/* Profile Card Section (Horizontal view next to avatar) */}
        <div className="bg-[#F5F5F5] p-6 flex items-center gap-5 border-b border-zinc-100" id="profile-card">
          
          {/* Avatar Area with Interactive Camera Badge */}
          <div className="relative flex-shrink-0" id="profile-avatar-container">
            <div className="w-[76px] h-[76px] rounded-full overflow-hidden border border-zinc-200 bg-zinc-50 shadow-inner">
              <img
                src={user.profileImage}
                alt={user.fullName}
                referrerPolicy="no-referrer"
                id="profile-avatar-image"
                className="w-full h-full object-cover transition-all"
              />
            </div>
            
            {/* Interactive camera circular badge */}
            <button
              onClick={handleCameraBadgeClick}
              id="btn-upload-avatar"
              className="absolute bottom-0 -right-1 w-6.5 h-6.5 bg-[#6C3EFA] hover:bg-[#5b32ec] text-white rounded-full flex items-center justify-center border-2 border-white shadow-md active:scale-95 transition-all duration-100 cursor-pointer"
              title="Upload new profile picture"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* User detail info */}
          <div className="flex flex-col space-y-0.5 justify-center" id="profile-user-details">
            <h3 className="text-lg font-bold text-[#1D1C24] leading-tight" id="profile-display-name">
              {user.fullName}
            </h3>
            <p className="text-[13px] font-normal text-[#5A5861] break-all tracking-tight" id="profile-display-email">
              {user.email}
            </p>
          </div>

        </div>

        {/* Large paragraph body description text block below profile */}
        <div className="p-6 space-y-4" id="profile-placeholder-body">
          <p className="text-sm leading-relaxed text-[#5a5861] text-justify font-normal">
            Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
          </p>
        </div>

        {/* First Dashed Divider below Lorem Ipsum block */}
        <div className="border-dashed border-b border-gray-300 mx-6" />

        {/* Second Dashed Divider at the very bottom of the main content area */}
        <div className="mt-auto mb-6 border-dashed border-b border-gray-300 mx-6" />
      </div>
    </motion.div>
  );
}