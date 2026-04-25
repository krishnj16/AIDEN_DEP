// import { motion } from 'framer-motion';

// interface AidenLogoProps {
//   onAnimationComplete?: () => void;
// }

// const AidenLogo = ({ onAnimationComplete }: AidenLogoProps) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
//       onAnimationComplete={onAnimationComplete}
//       className="relative select-none"
//     >
//       {/* Main AIDEN text - High Contrast Black */}
//       <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-[0.25em] uppercase text-foreground">
//         A.I.D.E.N
//       </h1>
      
//       {/* Subtle underline accent */}
//       <motion.div
//         initial={{ scaleX: 0, opacity: 0 }}
//         animate={{ scaleX: 1, opacity: 1 }}
//         transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
//         className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-px bg-foreground/30"
//       />
//     </motion.div>
//   );
// };

// export default AidenLogo;



import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface AidenLogoProps {
  onAnimationComplete?: () => void;
}

const AidenLogo = ({ onAnimationComplete }: AidenLogoProps) => {
  useEffect(() => {
    // Safety: Ensure we move forward even if animation callback misses
    // 1.5s animation + 1.5s reading time = 3s total
    const timer = setTimeout(() => {
      if (onAnimationComplete) onAnimationComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        // We rely on the useEffect timer above for a consistent "reading time"
        // before switching pages, rather than switching instantly when opacity hits 1.
        className="relative select-none text-center"
      >
        {/* Main AIDEN text - High Contrast Black */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-[0.25em] uppercase text-black">
          A.I.D.E.N
        </h1>
        
        {/* Subtle underline accent */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-px bg-black/30"
        />
      </motion.div>
    </div>
  );
};

export default AidenLogo;