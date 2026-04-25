// import React from 'react';
// import { motion } from 'framer-motion';
// import { ArrowRight } from 'lucide-react';

// export interface Persona {
//   id: string;
//   name: string;
//   description: string;
//   role: string;
// }

// interface PersonaCardProps {
//   persona: Persona;
//   onSelect: (id: string) => void;
//   index: number;
// }

// export const PersonaCard: React.FC<PersonaCardProps> = ({ persona, onSelect, index }) => {
//   // Simple "Theme Engine" based on the name
//   const getTheme = (name: string) => {
//     if (name.includes('J.A.R.V.I.S')) return {
//       accent: 'text-blue-600',
//       bg: 'bg-blue-50',
//       border: 'group-hover:border-blue-200',
//       badge: 'text-blue-700 bg-blue-100/50'
//     };
//     if (name.includes('F.R.I.D.A.Y')) return {
//       accent: 'text-emerald-600',
//       bg: 'bg-emerald-50',
//       border: 'group-hover:border-emerald-200',
//       badge: 'text-emerald-700 bg-emerald-100/50'
//     };
//     if (name.includes('H.A.L')) return {
//       accent: 'text-red-600',
//       bg: 'bg-red-50',
//       border: 'group-hover:border-red-200',
//       badge: 'text-red-700 bg-red-100/50'
//     };
//     // Default fallback
//     return {
//       accent: 'text-zinc-900',
//       bg: 'bg-zinc-50',
//       border: 'group-hover:border-zinc-200',
//       badge: 'text-zinc-700 bg-zinc-100'
//     };
//   };

//   const theme = getTheme(persona.name);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//       onClick={() => onSelect(persona.id)}
//       className={`group relative p-6 rounded-2xl bg-white border border-zinc-100 ${theme.border} shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between h-full`}
//     >
//       <div>
//         <div className="flex justify-between items-start mb-4">
//           <h3 className={`text-lg font-bold tracking-tight ${theme.accent}`}>
//             {persona.name}
//           </h3>
//           <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-full ${theme.badge}`}>
//             {persona.role}
//           </span>
//         </div>
        
//         <p className="text-sm text-zinc-500 font-medium leading-relaxed mb-6">
//           {persona.description}
//         </p>
//       </div>

//       <div className={`flex items-center text-xs font-bold uppercase tracking-wide ${theme.accent} opacity-80 group-hover:opacity-100 transition-opacity`}>
//         Initialize 
//         <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
//       </div>
//     </motion.div>
//   );
// };

// import React from 'react';
// import { ArrowRight, Code, Sparkles, Activity } from 'lucide-react';
// import { Persona } from '../types';

// const ICONS: Record<string, any> = {
//   Code: Code,
//   Sparkles: Sparkles,
//   Activity: Activity
// };

// interface PersonaCardProps {
//   persona: Persona;
//   index?: number;
//   onSelect: (id: string) => void;
// }

// export const PersonaCard: React.FC<PersonaCardProps> = ({ persona, onSelect }) => {
//   const Icon = ICONS[persona.icon] || Code;
  
//   // Extract theme colors
//   const theme = persona.theme || {
//     primary: 'bg-blue-600',
//     secondary: 'bg-blue-50',
//     text: 'text-blue-900'
//   };

//   // Create dynamic border color (replacing 'bg-' with 'border-')
//   // Example: bg-pink-500 -> border-pink-500
//   const borderColor = theme.primary.replace('bg-', 'border-');
//   const hoverBg = theme.secondary.replace('bg-', 'hover:bg-');

//   return (
//     <button
//       onClick={() => onSelect(persona.id)}
//       className={`
//         group relative w-full text-left
//         flex flex-col p-8 rounded-[2rem] border-2 border-transparent transition-all duration-500
//         bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2
//         ${hoverBg} hover:bg-opacity-40 hover:${borderColor}
//       `}
//     >
//        {/* Icon Circle */}
//        <div className={`
//          w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500
//          ${theme.secondary} ${theme.text}
//          group-hover:scale-110 group-hover:bg-white group-hover:shadow-md
//        `}>
//          <Icon size={28} />
//        </div>

//        {/* Content */}
//        <div className="mb-2">
//          <span className={`text-[10px] font-bold tracking-widest uppercase opacity-60 ${theme.text}`}>
//            {persona.role}
//          </span>
//          <h3 className="text-2xl font-bold text-gray-900 mt-1 group-hover:text-black">
//            {persona.name}
//          </h3>
//        </div>

//        <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 group-hover:text-gray-700">
//          {persona.description}
//        </p>

//        {/* Action Button */}
//        <div className={`
//          mt-auto flex items-center gap-3 text-sm font-bold tracking-wide transition-all
//          ${theme.text} opacity-80 group-hover:opacity-100 group-hover:translate-x-2
//        `}>
//          <span>INITIALIZE SYSTEM</span>
//          <ArrowRight size={16} />
//        </div>
//     </button>
//   );
// };
import React from 'react';
import { ArrowRight, Code, Sparkles, Activity } from 'lucide-react';
import { Persona } from '../types';

const ICONS: Record<string, any> = {
  Code: Code,
  Sparkles: Sparkles,
  Activity: Activity
};

interface PersonaCardProps {
  persona: Persona;
  index?: number;
  onSelect: (id: string) => void;
}

export const PersonaCard: React.FC<PersonaCardProps> = ({ persona, onSelect }) => {
  const Icon = ICONS[persona.icon] || Code;
  
  // Extract theme colors
  const theme = persona.theme || {
    primary: 'bg-blue-600',
    secondary: 'bg-blue-50',
    text: 'text-blue-900'
  };

  const borderColor = theme.primary.replace('bg-', 'border-');
  const hoverBg = theme.secondary.replace('bg-', 'hover:bg-');

  // ✅ UPDATED: Dynamic Button Text Logic
  const getButtonText = (id: string) => {
    switch (id.toLowerCase()) {
        case 'jarvis': return "Engage Logic Engine";
        case 'friday': return "Tell Me What’s On Your Mind";
        case 'titan': return "No Excuses. Start.";
        default: return "Initialize System";
    }
  };

  return (
    <button
      onClick={() => onSelect(persona.id)}
      className={`
        group relative w-full text-left
        flex flex-col p-8 rounded-[2rem] border-2 border-transparent transition-all duration-500
        bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2
        ${hoverBg} hover:bg-opacity-40 hover:${borderColor}
      `}
    >
       {/* Icon Circle */}
       <div className={`
         w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500
         ${theme.secondary} ${theme.text}
         group-hover:scale-110 group-hover:bg-white group-hover:shadow-md
       `}>
         <Icon size={28} />
       </div>

       {/* Content */}
       <div className="mb-2">
         <span className={`text-[10px] font-bold tracking-widest uppercase opacity-60 ${theme.text}`}>
           {persona.role}
         </span>
         <h3 className="text-2xl font-bold text-gray-900 mt-1 group-hover:text-black">
           {persona.name}
         </h3>
       </div>

       <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 group-hover:text-gray-700">
         {persona.description}
       </p>

       {/* Action Button */}
       <div className={`
         mt-auto flex items-center gap-3 text-sm font-bold tracking-wide transition-all
         ${theme.text} opacity-80 group-hover:opacity-100 group-hover:translate-x-2
       `}>
         <span>{getButtonText(persona.id)}</span>
         <ArrowRight size={16} />
       </div>
    </button>
  );
};