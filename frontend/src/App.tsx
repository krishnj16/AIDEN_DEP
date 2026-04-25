// import { useState } from "react"; // 👈 Added useState
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Chat from "./pages/Chat";
// import Auth from "./pages/Auth";
// import Dashboard from "./pages/Dashboard";
// import NotFound from "./pages/NotFound";
// import { Persona } from "./types"; // 👈 Import Type

// const queryClient = new QueryClient();

// const App = () => {
//   // 🟢 STATE: Tracks which persona is active (Jarvis/Friday/Titan)
//   const [activePersona, setActivePersona] = useState<Persona | null>(null);

//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Auth />} />
            
//             {/* 🟢 DASHBOARD: We pass the 'setActivePersona' function so it can save your choice */}
//             <Route 
//               path="/dashboard" 
//               element={<Dashboard onSelectPersona={setActivePersona} />} 
//             />
            
//             {/* 🟢 CHAT (New): We pass the 'activePersona' so it knows which color/brain to use */}
//             <Route 
//               path="/chat" 
//               element={<Chat activePersona={activePersona} />} 
//             />

//             {/* 🟢 CHAT (History): Handles /chat/123-abc-456 */}
//             <Route 
//               path="/chat/:sessionId" 
//               element={<Chat activePersona={activePersona} />} 
//             />
            
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// };

// export default App;

// import { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// // ✅ FIX 1: Import the existing AidenLogo instead of missing IntroAnimation
// import AidenLogo from './components/AidenLogo'; 
// import Auth from './pages/Auth';
// import Dashboard from './pages/Dashboard';
// import Chat from './pages/Chat';
// import { api } from './lib/api';
// // ✅ FIX 2: Default export import (no curly braces)
// import LandingPage from './components/LandingPage'; 
// import './index.css';

// // Protected Route Component
// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   if (!api.auth.isAuthenticated()) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };

// function App() {
//   const [showIntro, setShowIntro] = useState(true);
//   const [showLanding, setShowLanding] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(api.auth.isAuthenticated());

//   useEffect(() => {
//     // If user is already logged in, skip the intro/landing sequence
//     if (api.auth.isAuthenticated()) {
//       setShowIntro(false);
//       setShowLanding(false);
//     }
//   }, []);

//   // 1. INTRO ANIMATION (Using AidenLogo)
//   if (showIntro) {
//     return (
//       <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
//         <AidenLogo onAnimationComplete={() => setShowIntro(false)} />
        
//         {/* Optional: The "Small Writeup" you mentioned */}
//         <p className="mt-4 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 animate-pulse">
//           Artificial Intelligence for Dynamic Enterprise Navigation
//         </p>
//       </div>
//     );
//   }

//   // 2. LANDING PAGE (Only if not logged in and intro finished)
//   if (!isAuthenticated && showLanding) {
//     return <LandingPage onGetStarted={() => setShowLanding(false)} />;
//   }

//   // 3. MAIN APP ROUTING
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Login/Signup */}
//         <Route path="/" element={<Auth />} />
        
//         {/* Dashboard */}
//         <Route 
//           path="/dashboard" 
//           element={
//             <ProtectedRoute>
//               <Dashboard onSelectPersona={(p) => console.log(p)} />
//             </ProtectedRoute>
//           } 
//         />
        
//         {/* Chat */}
//         <Route 
//           path="/chat/:sessionId" 
//           element={
//             <ProtectedRoute>
//               <Chat activePersona={null} />
//             </ProtectedRoute>
//           } 
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


// import { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { AnimatePresence, motion } from 'framer-motion';

// import AidenIntro from './components/AidenIntro'; // The new file
// import Auth from './pages/Auth';                  // The trimmed file
// import Dashboard from './pages/Dashboard';
// import Chat from './pages/Chat';
// import { api } from './lib/api';
// import LandingPage from './components/LandingPage';
// import './index.css';

// // Protected Route
// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   if (!api.auth.isAuthenticated()) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };

// // Wrapper for smooth page transitions
// const AnimatedRoutes = () => {
//   const location = useLocation();
  
//   return (
//     <AnimatePresence mode="wait">
//       <Routes location={location} key={location.pathname}>
//         <Route 
//           path="/" 
//           element={
//             <PageTransition>
//               <Auth />
//             </PageTransition>
//           } 
//         />
//         <Route 
//           path="/dashboard" 
//           element={
//             <PageTransition>
//                <ProtectedRoute>
//                   <Dashboard onSelectPersona={(p) => console.log(p)} />
//                </ProtectedRoute>
//             </PageTransition>
//           } 
//         />
//         <Route 
//           path="/chat/:sessionId" 
//           element={
//             <ProtectedRoute>
//               <Chat activePersona={null} />
//             </ProtectedRoute>
//           } 
//         />
//       </Routes>
//     </AnimatePresence>
//   );
// };

// // Standard Fade Transition
// const PageTransition = ({ children }: { children: React.ReactNode }) => (
//   <motion.div
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     exit={{ opacity: 0 }}
//     transition={{ duration: 0.5 }}
//     className="w-full h-full"
//   >
//     {children}
//   </motion.div>
// );

// function App() {
//   const isAuth = api.auth.isAuthenticated();
  
//   // STATE: 
//   const [introFinished, setIntroFinished] = useState(false);
//   const [landingDismissed, setLandingDismissed] = useState(false);

//   useEffect(() => {
//     // If logged in, skip everything
//     if (isAuth) {
//       setIntroFinished(true);
//       setLandingDismissed(true);
//     }
//   }, [isAuth]);

//   // STAGE 1: INTRO (Your specific animation from Auth.tsx)
//   if (!introFinished && !isAuth) {
//     return <AidenIntro onComplete={() => setIntroFinished(true)} />;
//   }

//   // STAGE 2: LANDING PAGE
//   if (introFinished && !landingDismissed && !isAuth) {
//     return (
//       <AnimatePresence>
//         <motion.div
//           key="landing"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }} // Smooth fade out to Auth
//           transition={{ duration: 0.8 }}
//           className="w-full h-full"
//         >
//           <LandingPage onGetStarted={() => setLandingDismissed(true)} />
//         </motion.div>
//       </AnimatePresence>
//     );
//   }

//   // STAGE 3: MAIN APP (Auth -> Dashboard)
//   return (
//     <BrowserRouter>
//       <AnimatedRoutes />
//     </BrowserRouter>
//   );
// }

// export default App;

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import AidenIntro from './components/AidenIntro'; 
import Auth from './pages/Auth';                  
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import { api } from './lib/api';
import LandingPage from './components/LandingPage';
import './index.css';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!api.auth.isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Wrapper for internal route transitions (Landing -> Auth)
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageTransition>
              <Auth />
            </PageTransition>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <PageTransition>
               <ProtectedRoute>
                  <Dashboard onSelectPersona={(p) => console.log(p)} />
               </ProtectedRoute>
            </PageTransition>
          } 
        />
        <Route 
          path="/chat/:sessionId" 
          element={
            <ProtectedRoute>
              <Chat activePersona={null} />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

// Standard Fade Transition for internal pages
const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

function App() {
  const isAuth = api.auth.isAuthenticated();
  
  const [introFinished, setIntroFinished] = useState(false);
  const [landingDismissed, setLandingDismissed] = useState(false);

  useEffect(() => {
    if (isAuth) {
      setIntroFinished(true);
      setLandingDismissed(true);
    }
  }, [isAuth]);

  // STAGE 1: INTRO (Longer, Cinematic)
  if (!introFinished && !isAuth) {
    return <AidenIntro onComplete={() => setIntroFinished(true)} />;
  }

  // STAGE 2: LANDING PAGE (Slow Fade In)
  if (introFinished && !landingDismissed && !isAuth) {
    return (
      <AnimatePresence>
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // ✅ CHANGED: 2.0s duration for a slow, cinematic reveal
          transition={{ duration: 2.0, ease: "easeInOut" }} 
          className="w-full h-full"
        >
          <LandingPage onGetStarted={() => setLandingDismissed(true)} />
        </motion.div>
      </AnimatePresence>
    );
  }

  // STAGE 3: MAIN APP
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;