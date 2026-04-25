
// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import AuthForm from '@/components/AuthForm';
// import api from '@/lib/api';


// const Auth = () => {
//   const [showLogo, setShowLogo] = useState(false);
//   const [hideLogo, setHideLogo] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (api.auth.isAuthenticated()) {
//   navigate('/dashboard');
//   return;
// }

//     // 1. Start: Show Logo immediately
//     const startTimer = setTimeout(() => setShowLogo(true), 100);

//     // 2. Wait 4.5s (Increased for slower entry): Start fading out the logo
//     // Calculation: 3.0s fade in + 1.5s stay time = 4.5s
//     const fadeOutTimer = setTimeout(() => {
//       setHideLogo(true);
//     }, 4500); 

//     // 3. Wait 5.3s: Show the form (Slight overlap with logo fade out)
//     const showFormTimer = setTimeout(() => {
//       setShowForm(true);
//     }, 5300);

//     // 4. Wait 6.0s: Cleanup
//     const unmountLogoTimer = setTimeout(() => {
//       setShowLogo(false);
//     }, 6000);

//     return () => {
//       clearTimeout(startTimer);
//       clearTimeout(fadeOutTimer);
//       clearTimeout(showFormTimer);
//       clearTimeout(unmountLogoTimer);
//     };
//   }, [navigate]);

//   return (
//     <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-6 overflow-hidden relative">
//       <div className="absolute inset-0 bg-background" />

//       {/* LOGO SECTION */}
//       <AnimatePresence>
//         {showLogo && !showForm && (
//           <motion.div
//             key="intro-logo"
//             initial={{ opacity: 0 }}
//             animate={{ 
//               opacity: hideLogo ? 0 : 1, 
//               scale: hideLogo ? 0.95 : 1,
//               filter: hideLogo ? "blur(10px)" : "blur(0px)"
//             }}
//             exit={{ opacity: 0 }}
//             transition={{ 
//               // ✅ CHANGED: 3.0s duration - Very slow, majestic entry
//               duration: 3.0, 
//               ease: "easeInOut" 
//             }}
//             className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
//           >
//             <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-[0.2em] uppercase text-foreground text-center">
//               A.I.D.E.N
//             </h1>
            
//             <motion.p
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ 
//                 opacity: hideLogo ? 0 : 1,
//                 y: hideLogo ? -10 : 0 
//               }}
//               // ✅ CHANGED: Delay increases to match the 3s title fade
//               transition={{ duration: 1.5, delay: hideLogo ? 0 : 1.5 }}
//               className="text-center text-sm sm:text-base font-light tracking-wide text-muted-foreground mt-6"
//             >
//               Welcome to the future of intelligence
//             </motion.p>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* FORM SECTION */}
//       {showForm && (
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ 
//             duration: 1.5,
//             ease: "easeOut" 
//           }}
//           className="relative z-10 w-full flex flex-col items-center gap-10 max-w-md"
//         >
//           <div className="select-none text-center w-full">
//             <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-[0.2em] uppercase text-foreground text-center">
//               A.I.D.E.N
//             </h1>
//             <p className="text-sm sm:text-base font-light tracking-wide text-muted-foreground mt-3">
//               Welcome to the future of intelligence
//             </p>
//           </div>

//           <AuthForm />
//         </motion.div>
//       )}

//       {/* Version Badge */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: showForm ? 1 : 0 }}
//         transition={{ duration: 1.0, delay: 1.2 }}
//         className="absolute bottom-6 text-xs font-light tracking-widest text-muted-foreground/40 uppercase"
//       >
//         v1.0
//       </motion.div>
//     </div>
//   );
// };

// export default Auth;

import { motion } from 'framer-motion';
import AuthForm from '@/components/AuthForm';

const Auth = () => {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-background" />

      {/* FORM SECTION - Shows immediately because Intro is handled separately now */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1.5,
          ease: "easeOut" 
        }}
        className="relative z-10 w-full flex flex-col items-center gap-10 max-w-md"
      >
        <div className="select-none text-center w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-[0.2em] uppercase text-foreground text-center">
            A.I.D.E.N
          </h1>
          <p className="text-sm sm:text-base font-light tracking-wide text-muted-foreground mt-3">
            Welcome to the future of intelligence
          </p>
        </div>

        <AuthForm />
      </motion.div>

      {/* Version Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 1.2 }}
        className="absolute bottom-6 text-xs font-light tracking-widest text-muted-foreground/40 uppercase"
      >
        v1.0
      </motion.div>
    </div>
  );
};

export default Auth;