// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface AidenIntroProps {
//   onComplete: () => void;
// }

// const AidenIntro = ({ onComplete }: AidenIntroProps) => {
//   const [showLogo, setShowLogo] = useState(false);
//   const [hideLogo, setHideLogo] = useState(false);

//   useEffect(() => {
//     // 1. Start: Show Logo immediately
//     const startTimer = setTimeout(() => setShowLogo(true), 100);

//     // 2. Wait 4.5s: Start fading out the logo
//     const fadeOutTimer = setTimeout(() => {
//       setHideLogo(true);
//     }, 4500); 

//     // 3. Wait 6.0s: Cleanup and notify App.tsx that intro is done
//     const finishTimer = setTimeout(() => {
//       setShowLogo(false);
//       onComplete(); // <--- Tell App to switch to Landing Page
//     }, 6000);

//     return () => {
//       clearTimeout(startTimer);
//       clearTimeout(fadeOutTimer);
//       clearTimeout(finishTimer);
//     };
//   }, [onComplete]);

//   return (
//     <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden">
//       <div className="absolute inset-0 bg-background" />
//       <AnimatePresence>
//         {showLogo && (
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
//               duration: 3.0, 
//               ease: "easeInOut" 
//             }}
//             className="flex flex-col items-center justify-center relative z-10"
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
//               transition={{ duration: 1.5, delay: hideLogo ? 0 : 1.5 }}
//               className="text-center text-sm sm:text-base font-light tracking-wide text-muted-foreground mt-6"
//             >
//               Welcome to the future of intelligence
//             </motion.p>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default AidenIntro;


// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface AidenIntroProps {
//   onComplete: () => void;
// }

// const AidenIntro = ({ onComplete }: AidenIntroProps) => {
//   const [showLogo, setShowLogo] = useState(false);
//   const [hideLogo, setHideLogo] = useState(false);

//   useEffect(() => {
//     // 1. Start: Show Logo immediately
//     const startTimer = setTimeout(() => setShowLogo(true), 100);

//     // 2. Wait 6.5s (Hold Longer): Start fading out the logo
//     // Logic: 3s Fade In + 3.5s Hold = 6.5s
//     const fadeOutTimer = setTimeout(() => {
//       setHideLogo(true);
//     }, 6500); 

//     // 3. Wait 8.5s: Cleanup (2s Fade Out time)
//     const finishTimer = setTimeout(() => {
//       setShowLogo(false);
//       onComplete(); 
//     }, 8500);

//     return () => {
//       clearTimeout(startTimer);
//       clearTimeout(fadeOutTimer);
//       clearTimeout(finishTimer);
//     };
//   }, [onComplete]);

//   return (
//     <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden">
//       <div className="absolute inset-0 bg-background" />
//       <AnimatePresence>
//         {showLogo && (
//           <motion.div
//             key="intro-logo"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ 
//               opacity: hideLogo ? 0 : 1, 
//               scale: hideLogo ? 1.05 : 1, // Slight zoom out on exit for cinematic feel
//               filter: hideLogo ? "blur(20px)" : "blur(0px)" // Stronger blur on exit
//             }}
//             exit={{ opacity: 0 }}
//             transition={{ 
//               duration: hideLogo ? 2.0 : 3.0, // 3s Entry, 2s Exit
//               ease: "easeInOut" 
//             }}
//             className="flex flex-col items-center justify-center relative z-10"
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
//               transition={{ duration: 1.5, delay: hideLogo ? 0 : 1.5 }}
//               className="text-center text-sm sm:text-base font-light tracking-wide text-muted-foreground mt-6"
//             >
//               Welcome to the future of intelligence
//             </motion.p>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default AidenIntro;

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AidenIntroProps {
  onComplete: () => void;
}

const AidenIntro = ({ onComplete }: AidenIntroProps) => {
  const [showLogo, setShowLogo] = useState(false);
  const [hideLogo, setHideLogo] = useState(false);

  useEffect(() => {
    // 1. Start: Show Logo immediately (100ms delay)
    const startTimer = setTimeout(() => setShowLogo(true), 100);

    // 2. Wait 4.5s: Start fading out the logo
    // (Matches your snippet: 3.0s fade in + 1.5s stay time)
    const fadeOutTimer = setTimeout(() => {
      setHideLogo(true);
    }, 4500); 

    // 3. Wait 6.0s: Cleanup and Move Next
    // (Matches your snippet's unmount time)
    const finishTimer = setTimeout(() => {
      setShowLogo(false);
      onComplete(); 
    }, 6000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <AnimatePresence>
        {showLogo && (
          <motion.div
            key="intro-logo"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: hideLogo ? 0 : 1, 
              scale: hideLogo ? 0.95 : 1, // Matches snippet
              filter: hideLogo ? "blur(10px)" : "blur(0px)" // Matches snippet
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              // ✅ EXACT MATCH: 3.0s duration for majestic entry
              duration: 3.0, 
              ease: "easeInOut" 
            }}
            className="flex flex-col items-center justify-center relative z-10"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-[0.2em] uppercase text-foreground text-center">
              A.I.D.E.N
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: hideLogo ? 0 : 1,
                y: hideLogo ? -10 : 0 
              }}
              // ✅ EXACT MATCH: Delay logic
              transition={{ duration: 1.5, delay: hideLogo ? 0 : 1.5 }}
              className="text-center text-sm sm:text-base font-light tracking-wide text-muted-foreground mt-6"
            >
              Welcome to the future of intelligence
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AidenIntro;