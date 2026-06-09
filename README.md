# PopX - Frontend UI Application

## Overview
This project is a pixel-perfect, mobile-first React frontend application built based on specific design requirements. It features a seamless 4-screen flow including a Landing Page, User Login, Account Registration, and a Profile Settings dashboard. 

The application utilizes state management to securely pass user data between screens without a backend, implements robust client-side form validation, and features smooth page transitions to mimic a native mobile app experience.

## Key Features
- **Pixel-Perfect UI:** Strictly adheres to the provided design specifications, including exact layout centering and floating input labels.
- **Strict Form Validation:** Custom error states preventing empty submissions with dynamic UI feedback.
- **State Management:** Captures registration data (Name, Email) and dynamically renders it on the Profile page using React Context.
- **Interactive UI:** Features a fully functional local file upload for the user avatar preview.
- **Smooth Navigation:** Utilizes `react-router-dom` and `motion/react` for seamless fade-in/out transitions between views.
- **Mobile-First Lock:** Global CSS resets ensure the app remains completely static and scroll-locked (`100dvh`, `overflow-hidden`), preserving the mobile layout perfectly on any device window.

## Tech Stack
- React.js (Functional Components & Hooks)
- React Router DOM
- Tailwind CSS (Utility-first styling)
- Motion/React (Animations)
- Lucide React (Icons)

## Setup Instructions

### Prerequisites
Make sure you have Node.js and npm installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/ABHIKALVIUM/educase-frontend.git](https://github.com/ABHIKALVIUM/educase-frontend.git)
   ```
2. Navigate into the project directory:
   ```bash
   cd educase-frontend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application
To start the development server, run:
```bash
npm run dev
```
The application will usually be available at `http://localhost:5173/` or `http://localhost:3000/`.