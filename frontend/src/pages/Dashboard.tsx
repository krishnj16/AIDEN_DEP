// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { auth } from '@/lib/api';
// import { LogOut } from 'lucide-react';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState<{ full_name: string; email: string } | null>(null);

//   useEffect(() => {
//     if (!auth.isAuthenticated()) {
//       navigate('/');
//       return;
//     }
//     setUser(auth.getUser());
//   }, [navigate]);

//   const handleLogout = () => {
//     auth.logout();
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen w-full bg-background flex flex-col">
//       {/* Header */}
//       <header className="border-b border-border/30 px-6 py-4">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <h1 
//             className="text-lg font-extralight tracking-[0.2em] uppercase"
//             style={{
//               color: 'hsl(0 0% 80%)',
//               textShadow: '1px 1px 1px hsl(0 0% 100%), -1px -1px 1px hsl(0 0% 70%)',
//             }}
//           >
//             A.I.D.E.N
//           </h1>
          
//           <button
//             onClick={handleLogout}
//             className="btn-ghost-aiden px-4 py-2 rounded-full text-xs flex items-center gap-2"
//           >
//             <LogOut className="h-3.5 w-3.5" />
//             Logout
//           </button>
//         </div>
//       </header>

//       {/* Main content */}
//       <main className="flex-1 flex items-center justify-center p-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center max-w-md"
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="w-24 h-24 mx-auto mb-8 rounded-full bg-secondary flex items-center justify-center shadow-soft"
//           >
//             <span className="text-3xl font-extralight text-muted-foreground">
//               {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
//             </span>
//           </motion.div>

//           <h2 className="text-2xl font-light text-foreground mb-2">
//             Hello, {user?.full_name || 'User'}
//           </h2>
          
//           <p className="text-muted-foreground text-sm font-light mb-8">
//             Your personal AI assistant is ready
//           </p>

//           <div className="p-8 rounded-2xl bg-secondary/50 shadow-soft">
//             <p className="text-xs text-muted-foreground/70 font-light tracking-wide uppercase mb-4">
//               Coming Soon
//             </p>
//             <p className="text-sm text-muted-foreground font-light leading-relaxed">
//               Advanced conversational AI, document analysis, and intelligent task automation.
//             </p>
//           </div>
//         </motion.div>
//       </main>

//       {/* Footer */}
//       <footer className="border-t border-border/30 px-6 py-4">
//         <div className="max-w-7xl mx-auto text-center">
//           <p className="text-xs text-muted-foreground/40 font-light tracking-wide">
//             A.I.D.E.N — Artificial Intelligence for Dynamic Enterprise Navigation
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;


// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import api, { Persona } from '@/lib/api'; // Ensure api.ts exports 'Persona' type and 'api' default
// import { LogOut, Loader2 } from 'lucide-react';
// import { PersonaCard } from '@/components/PersonaCard';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState<{ full_name: string; email: string } | null>(null);
//   const [personas, setPersonas] = useState<Persona[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (!api.auth.isAuthenticated()) {
//       navigate('/');
//       return;
//     }
    
//     // 1. Get User
//     setUser(api.auth.getUser());

//     // 2. Fetch Personas
//     const fetchPersonas = async () => {
//       try {
//         const { data, error: apiError } = await api.personas.getAll();
//         if (apiError) throw new Error(apiError);
//         if (data) setPersonas(data);
//       } catch (err: any) {
//         console.error(err);
//         setError(err.message || 'Failed to load system profiles.');
//         if (err.message?.includes('Unauthorized')) api.auth.logout();
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPersonas();
//   }, [navigate]);

//   const handleLogout = () => {
//     api.auth.logout();
//     navigate('/');
//   };

//   const handlePersonaSelect = (id: string) => {
//     console.log("Selected Persona:", id);
//     // navigate(`/chat/${id}`); // Future Step
//   };

//   return (
//     <div className="min-h-screen w-full bg-background flex flex-col font-sans">
//       {/* Header (Preserved) */}
//       <header className="border-b border-border/30 px-6 py-4 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <h1 
//             className="text-lg font-extralight tracking-[0.2em] uppercase"
//             style={{
//               color: 'hsl(0 0% 80%)',
//               textShadow: '1px 1px 1px hsl(0 0% 100%), -1px -1px 1px hsl(0 0% 70%)',
//             }}
//           >
//             A.I.D.E.N
//           </h1>
          
//           <div className="flex items-center gap-4">
//             <span className="text-xs text-muted-foreground hidden sm:block font-light">
//               {user?.email}
//             </span>
//             <button
//               onClick={handleLogout}
//               className="px-4 py-2 rounded-full text-xs flex items-center gap-2 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
//             >
//               <LogOut className="h-3.5 w-3.5" />
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main content */}
//       <main className="flex-1 max-w-7xl mx-auto w-full p-6">
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="my-12"
//         >
//           <h2 className="text-3xl font-light text-foreground mb-2">
//             Welcome back, {user?.full_name?.split(' ')[0] || 'User'}
//           </h2>
//           <p className="text-muted-foreground text-sm font-light">
//             Select an intelligence profile to initialize your session.
//           </p>
//         </motion.div>

//         {/* Loading State */}
//         {loading && (
//           <div className="flex flex-col items-center justify-center py-20 opacity-50">
//             <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
//             <span className="text-xs tracking-widest uppercase text-muted-foreground">Syncing Database...</span>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg mb-8">
//             System Error: {error}
//           </div>
//         )}

//         {/* Grid - Replaces the "Coming Soon" box */}
//         {!loading && !error && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {personas.map((persona, index) => (
//               <PersonaCard 
//                 key={persona.id} 
//                 persona={persona} 
//                 index={index}
//                 onSelect={handlePersonaSelect} 
//               />
//             ))}
//           </div>
//         )}
//       </main>

//       {/* Footer (Preserved) */}
//       <footer className="border-t border-border/30 px-6 py-6 mt-auto">
//         <div className="max-w-7xl mx-auto text-center">
//           <p className="text-[10px] text-muted-foreground/40 font-light tracking-widest uppercase">
//             A.I.D.E.N — Artificial Intelligence for Dynamic Enterprise Navigation
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import api, { Persona } from '@/lib/api'; 
// import { LogOut, Loader2 } from 'lucide-react';
// import { PersonaCard } from '@/components/PersonaCard';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState<{ full_name: string; email: string } | null>(null);
//   const [personas, setPersonas] = useState<Persona[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (!api.auth.isAuthenticated()) {
//       navigate('/');
//       return;
//     }
    
//     // 1. Get User
//     setUser(api.auth.getUser());

//     // 2. Fetch Personas (Safely)
//     const fetchPersonas = async () => {
//       try {
//         const { data, error: apiError } = await api.personas.getAll();
//         if (apiError) throw new Error(apiError);

//         // --- FIX: Robust Data Handling ---
//         // Checks if 'data' itself is the array, or if it's wrapped inside 'data.data' or 'data.personas'
//         if (Array.isArray(data)) {
//             setPersonas(data);
//         } else if (data && Array.isArray((data as any).data)) {
//             setPersonas((data as any).data);
//         } else if (data && Array.isArray((data as any).personas)) {
//             setPersonas((data as any).personas);
//         } else {
//             console.error("Unexpected data format:", data);
//             setPersonas([]); // Fallback to empty list to prevent crash
//         }
//         // --------------------------------

//       } catch (err: any) {
//         console.error(err);
//         setError(err.message || 'Failed to load system profiles.');
//         if (err.message?.includes('Unauthorized')) api.auth.logout();
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPersonas();
//   }, [navigate]);

//   const handleLogout = () => {
//     api.auth.logout();
//     navigate('/');
//   };

//   const handlePersonaSelect = (id: string) => {
//     console.log("Selected Persona:", id);
//     // navigate(`/chat/${id}`); // Future Step
//   };

//   return (
//     <div className="min-h-screen w-full bg-background flex flex-col font-sans">
//       {/* Header */}
//       <header className="border-b border-border/30 px-6 py-4 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <h1 
//             className="text-lg font-extralight tracking-[0.2em] uppercase"
//             style={{
//               color: 'hsl(0 0% 80%)',
//               textShadow: '1px 1px 1px hsl(0 0% 100%), -1px -1px 1px hsl(0 0% 70%)',
//             }}
//           >
//             A.I.D.E.N
//           </h1>
          
//           <div className="flex items-center gap-4">
//             <span className="text-xs text-muted-foreground hidden sm:block font-light">
//               {user?.email}
//             </span>
//             <button
//               onClick={handleLogout}
//               className="px-4 py-2 rounded-full text-xs flex items-center gap-2 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
//             >
//               <LogOut className="h-3.5 w-3.5" />
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main content */}
//       <main className="flex-1 max-w-7xl mx-auto w-full p-6">
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="my-12"
//         >
//           <h2 className="text-3xl font-light text-foreground mb-2">
//             Welcome back, {user?.full_name?.split(' ')[0] || 'User'}
//           </h2>
//           <p className="text-muted-foreground text-sm font-light">
//             Select an intelligence profile to initialize your session.
//           </p>
//         </motion.div>

//         {/* Loading State */}
//         {loading && (
//           <div className="flex flex-col items-center justify-center py-20 opacity-50">
//             <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
//             <span className="text-xs tracking-widest uppercase text-muted-foreground">Syncing Database...</span>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg mb-8">
//             System Error: {error}
//           </div>
//         )}

//         {/* Grid */}
//         {!loading && !error && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {personas.map((persona, index) => (
//               <PersonaCard 
//                 key={persona.id} 
//                 persona={persona} 
//                 index={index}
//                 onSelect={handlePersonaSelect} 
//               />
//             ))}
//           </div>
//         )}
//       </main>

//       {/* Footer */}
//       <footer className="border-t border-border/30 px-6 py-6 mt-auto">
//         <div className="max-w-7xl mx-auto text-center">
//           <p className="text-[10px] text-muted-foreground/40 font-light tracking-widest uppercase">
//             A.I.D.E.N — Artificial Intelligence for Dynamic Enterprise Navigation
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import api, { Persona } from '@/lib/api'; 
// import { LogOut, Loader2 } from 'lucide-react';
// import { PersonaCard } from '@/components/PersonaCard';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState<{ full_name: string; email: string } | null>(null);
//   const [personas, setPersonas] = useState<Persona[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (!api.auth.isAuthenticated()) {
//       navigate('/');
//       return;
//     }
    
//     setUser(api.auth.getUser());

//     const fetchPersonas = async () => {
//       try {
//         const { data, error: apiError } = await api.personas.getAll();
//         if (apiError) throw new Error(apiError);

//         if (Array.isArray(data)) {
//             setPersonas(data);
//         } else if (data && Array.isArray((data as any).data)) {
//             setPersonas((data as any).data);
//         } else if (data && Array.isArray((data as any).personas)) {
//             setPersonas((data as any).personas);
//         } else {
//             setPersonas([]); 
//         }

//       } catch (err: any) {
//         console.error(err);
//         setError(err.message || 'Failed to load system profiles.');
//         if (err.message?.includes('Unauthorized')) api.auth.logout();
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPersonas();
//   }, [navigate]);

//   const handleLogout = () => {
//     api.auth.logout();
//     navigate('/');
//   };

//   const handlePersonaSelect = (id: string) => {
//     console.log("Selected Persona:", id);
//   };

//   return (
//     <div className="min-h-screen w-full bg-white flex flex-col font-sans">
//       {/* Header */}
//       <header className="border-b border-zinc-100 px-6 py-4 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <h1 
//             className="text-lg font-bold tracking-[0.2em] uppercase text-black"
//           >
//             A.I.D.E.N
//           </h1>
          
//           <div className="flex items-center gap-4">
//             <span className="text-xs text-zinc-500 hidden sm:block font-medium">
//               {user?.email}
//             </span>
//             <button
//               onClick={handleLogout}
//               className="px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 hover:bg-zinc-100 transition-colors text-zinc-600 hover:text-black"
//             >
//               <LogOut className="h-3.5 w-3.5" />
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main content */}
//       <main className="flex-1 max-w-7xl mx-auto w-full p-6">
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="my-12"
//         >
//           <h2 className="text-3xl font-light text-black mb-2">
//             Welcome back, {user?.full_name?.split(' ')[0] || 'User'}
//           </h2>
//           <p className="text-zinc-500 text-sm font-normal">
//             Select an intelligence profile to initialize your session.
//           </p>
//         </motion.div>

//         {/* Loading State */}
//         {loading && (
//           <div className="flex flex-col items-center justify-center py-20 opacity-50">
//             <Loader2 className="h-8 w-8 animate-spin text-zinc-400 mb-4" />
//             <span className="text-xs tracking-widest uppercase text-zinc-400">Syncing Database...</span>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg mb-8">
//             System Error: {error}
//           </div>
//         )}

//         {/* Grid */}
//         {!loading && !error && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {personas.map((persona, index) => (
//               <PersonaCard 
//                 key={persona.id} 
//                 persona={persona} 
//                 index={index}
//                 onSelect={handlePersonaSelect} 
//               />
//             ))}
//           </div>
//         )}
//       </main>

//       {/* Footer */}
//       <footer className="border-t border-zinc-100 px-6 py-6 mt-auto">
//         <div className="max-w-7xl mx-auto text-center">
//           {/* UPDATED: Solid black text, no background */}
//           <p className="text-[10px] text-black font-bold tracking-widest uppercase">
//             A.I.D.E.N — AI Identity Engine
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// import api from '@/lib/api'; 
// import { LogOut, Loader2 } from 'lucide-react';
// import { PersonaCard } from '@/components/PersonaCard';

// // Import Types
// import { Persona } from '@/types'; 

// // 1. ADD THIS INTERFACE
// interface DashboardProps {
//   onSelectPersona: (persona: Persona) => void;
// }

// // 2. RECEIVE THE PROP
// const Dashboard = ({ onSelectPersona }: DashboardProps) => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState<{ full_name: string; email: string } | null>(null);
//   const [personas, setPersonas] = useState<Persona[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (!api.auth.isAuthenticated()) {
//       navigate('/');
//       return;
//     }

//     setUser(api.auth.getUser());

//     const fetchPersonas = async () => {
//       try {
//         const { data, error: apiError } = await api.personas.getAll();
//         if (apiError) throw new Error(apiError);

//         if (Array.isArray(data)) {
//           setPersonas(data);
//         } else if (data && Array.isArray((data as any).data)) {
//           setPersonas((data as any).data);
//         } else if (data && Array.isArray((data as any).personas)) {
//           setPersonas((data as any).personas);
//         } else {
//           setPersonas([]);
//         }
//       } catch (err: any) {
//         console.error(err);
//         setError(err.message || 'Failed to load system profiles.');
//         if (err.message?.includes('Unauthorized')) api.auth.logout();
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPersonas();
//   }, [navigate]);

//   const handleLogout = () => {
//     api.auth.logout();
//     navigate('/');
//   };

//   // 3. UPDATED INITIALIZATION LOGIC
//   const handleInitialize = async (personaId: string) => {
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     // A. FIND AND SET THE PERSONA (This fixes the colors!)
//     const selected = personas.find(p => p.id === personaId);
//     if (selected) {
//         onSelectPersona(selected);
//     }

//     try {
//       console.log('Connecting to Brain...', personaId);
//       const response = await api.chat.createSession(personaId, token);

//       if (response.success && response.session) {
//         navigate(`/chat/${response.session.id}`);
//       } else {
//         console.error('Failed:', response);
//       }
//     } catch (err) {
//       console.error('Backend Error:', err);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-white flex flex-col font-sans">
//       {/* Header */}
//       <header className="border-b border-zinc-100 px-6 py-4 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <h1 className="text-lg font-bold tracking-[0.2em] uppercase text-black">
//             A.I.D.E.N
//           </h1>

//           <div className="flex items-center gap-4">
//             <span className="text-xs text-zinc-500 hidden sm:block font-medium">
//               {user?.email}
//             </span>
//             <button
//               onClick={handleLogout}
//               className="px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 hover:bg-zinc-100 transition-colors text-zinc-600 hover:text-black"
//             >
//               <LogOut className="h-3.5 w-3.5" />
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="flex-1 max-w-7xl mx-auto w-full p-6">
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="my-12"
//         >
//           <h2 className="text-3xl font-light text-black mb-2">
//             Welcome back, {user?.full_name?.split(' ')[0] || 'User'}
//           </h2>
//           <p className="text-zinc-500 text-sm font-normal">
//             Select an intelligence profile to initialize your session.
//           </p>
//         </motion.div>

//         {loading && (
//           <div className="flex flex-col items-center justify-center py-20 opacity-50">
//             <Loader2 className="h-8 w-8 animate-spin text-zinc-400 mb-4" />
//             <span className="text-xs tracking-widest uppercase text-zinc-400">
//               Syncing Database...
//             </span>
//           </div>
//         )}

//         {error && (
//           <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg mb-8">
//             System Error: {error}
//           </div>
//         )}

//         {!loading && !error && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {personas.map((persona, index) => (
//               <PersonaCard
//                 key={persona.id}
//                 persona={persona}
//                 index={index}
//                 // Pass the ID string, handleInitialize does the rest
//                 onSelect={() => handleInitialize(persona.id)} 
//               />
//             ))}
//           </div>
//         )}
//       </main>

//       {/* Footer */}
//       <footer className="border-t border-zinc-100 px-6 py-6 mt-auto">
//         <div className="max-w-7xl mx-auto text-center">
//           <p className="text-[10px] text-black font-bold tracking-widest uppercase">
//             A.I.D.E.N — AI Identity Engine
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// import api from '@/lib/api'; 
// import { LogOut, Loader2, Bot } from 'lucide-react';
// import { PersonaCard } from '@/components/PersonaCard';
// import { Persona } from '@/types'; 

// interface DashboardProps {
//   onSelectPersona: (persona: Persona) => void;
// }

// const Dashboard = ({ onSelectPersona }: DashboardProps) => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState<{ full_name: string; email: string } | null>(null);
//   const [personas, setPersonas] = useState<Persona[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (!api.auth.isAuthenticated()) {
//       navigate('/');
//       return;
//     }
//     setUser(api.auth.getUser());

//     const fetchPersonas = async () => {
//       try {
//         const { data, error: apiError } = await api.personas.getAll();
//         if (apiError) throw new Error(apiError);

//         if (Array.isArray(data)) setPersonas(data);
//         else if (data && Array.isArray((data as any).data)) setPersonas((data as any).data);
//         else setPersonas([]);
        
//       } catch (err: any) {
//         console.error(err);
//         setError(err.message || 'Failed to load system profiles.');
//         if (err.message?.includes('Unauthorized')) api.auth.logout();
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPersonas();
//   }, [navigate]);

//   const handleLogout = () => {
//     api.auth.logout();
//     navigate('/');
//   };

//   const handleInitialize = async (personaId: string) => {
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     const selected = personas.find(p => p.id === personaId);
//     if (selected) onSelectPersona(selected);

//     try {
//       const response = await api.chat.createSession(personaId, token);
//       if (response.success && response.session) {
//         navigate(`/chat/${response.session.id}`);
//       }
//     } catch (err) {
//       console.error('Backend Error:', err);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-gray-50/50 flex flex-col font-sans">
      
//       {/* 🟢 SAFELIST: Ensures colors load immediately on Dashboard */}
//       <div className="hidden 
//         bg-blue-50 text-blue-900 border-blue-600 hover:bg-blue-50 hover:border-blue-600
//         bg-pink-50 text-pink-900 border-pink-500 hover:bg-pink-50 hover:border-pink-500
//         bg-emerald-50 text-emerald-900 border-emerald-600 hover:bg-emerald-50 hover:border-emerald-600
//       "/>

//       {/* Header */}
//       <header className="px-8 py-6 sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="bg-black text-white p-2 rounded-lg">
//                 <Bot size={20} />
//             </div>
//             <h1 className="text-xl font-bold tracking-widest uppercase bg-gradient-to-r from-blue-600 via-pink-500 to-emerald-500 bg-clip-text text-transparent">
//               A.I.D.E.N
//             </h1>
//           </div>

//           <div className="flex items-center gap-6">
//             <span className="text-xs text-gray-400 font-medium tracking-wide hidden sm:block">
//               {user?.email}
//             </span>
//             <button
//               onClick={handleLogout}
//               className="px-5 py-2.5 rounded-full text-xs font-bold bg-gray-100 hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2"
//             >
//               <LogOut size={14} />
//               DISCONNECT
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="flex-1 max-w-7xl mx-auto w-full p-6 flex flex-col justify-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16 mt-8"
//         >
//           <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
//             Welcome back, {user?.full_name?.split(' ')[0] || 'User'}
//           </h2>
//           <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
//             Select a specialized neural interface to begin your session.
//           </p>
//         </motion.div>

//         {loading && (
//           <div className="flex flex-col items-center justify-center py-20 opacity-50">
//             <Loader2 className="h-10 w-10 animate-spin text-gray-400 mb-4" />
//             <span className="text-xs tracking-widest uppercase text-gray-400">Syncing Personas...</span>
//           </div>
//         )}

//         {error && (
//           <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl mx-auto max-w-lg text-center">
//             {error}
//           </div>
//         )}

//         {!loading && !error && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
//             {personas.map((persona, index) => (
//               <motion.div
//                 key={persona.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//               >
//                 <PersonaCard
//                   persona={persona}
//                   index={index}
//                   onSelect={() => handleInitialize(persona.id)} 
//                 />
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </main>

//       {/* Footer */}
//       <footer className="px-6 py-8 mt-auto border-t border-gray-100">
//         <div className="max-w-7xl mx-auto text-center opacity-40 hover:opacity-100 transition-opacity">
//           <p className="text-[10px] font-bold tracking-[0.2em] uppercase">
//             A.I.D.E.N Identity Engine • v2.1.0 • Secure
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { LogOut, Loader2, Bot, Sparkles, ArrowRight, BrainCircuit } from 'lucide-react';

// import api from '@/lib/api'; 
// import { PersonaCard } from '@/components/PersonaCard';
// import { Persona } from '@/types'; 

// interface DashboardProps {
//   onSelectPersona: (persona: Persona) => void;
// }

// const Dashboard = ({ onSelectPersona }: DashboardProps) => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState<{ full_name: string; email: string } | null>(null);
//   const [personas, setPersonas] = useState<Persona[]>([]);
//   const [loading, setLoading] = useState(true);
  
//   // Magic Input State
//   const [magicInput, setMagicInput] = useState('');
//   const [isRouting, setIsRouting] = useState(false);
//   const [statusMessage, setStatusMessage] = useState(''); 

//   useEffect(() => {
//     if (!api.auth.isAuthenticated()) { navigate('/'); return; }
//     setUser(api.auth.getUser());

//     const fetchPersonas = async () => {
//       try {
//         const { data } = await api.personas.getAll();
//         if (Array.isArray(data)) setPersonas(data);
//         else if (data?.data) setPersonas(data.data);
//       } catch (err) { console.error(err); } 
//       finally { setLoading(false); }
//     };
//     fetchPersonas();
//   }, [navigate]);

//   const handleLogout = () => { api.auth.logout(); navigate('/'); };

//   const handleInitialize = async (personaId: string) => {
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     const selected = personas.find(p => p.id === personaId);
//     if (selected) onSelectPersona(selected); 

//     try {
//       const response = await api.chat.createSession(personaId, token);
//       if (response.session) navigate(`/chat/${response.session.id}`);
//     } catch (err) { console.error(err); }
//   };

//   // 🔮 UPGRADED MAGIC ROUTING
//   const handleMagicRoute = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!magicInput.trim()) return;

//     setIsRouting(true);
//     setStatusMessage("Analyzing intent..."); 

//     const token = localStorage.getItem('token');
    
//     try {
//       // 1. Ask Router
//       let targetPersonaId = 'jarvis'; 
//       try {
//         const routeRes = await api.chat.routeMessage(magicInput, token!);
//         if (routeRes?.personaId) targetPersonaId = routeRes.personaId;
//       } catch (err) { console.warn("Router offline, defaulting."); }
      
//       // 2. Feedback
//       const targetName = personas.find(p => p.id === targetPersonaId)?.name || 'System';
//       setStatusMessage(`Logic detected. Routing to ${targetName}...`);
      
//       // Select Theme
//       const selected = personas.find(p => p.id === targetPersonaId);
//       if (selected) onSelectPersona(selected);

//       // Brief delay for UX
//       await new Promise(r => setTimeout(r, 1000));

//       // 3. Create Session
//       const sessionRes = await api.chat.createSession(targetPersonaId, token!);
      
//       if (sessionRes?.session) {
//          // 4. Navigate AND Pass Message
//          navigate(`/chat/${sessionRes.session.id}`, { 
//            state: { autoSend: magicInput } 
//          });
//       }

//     } catch (err) {
//       console.error("Error:", err);
//       setStatusMessage("System Error. Please try manually.");
//       setTimeout(() => setIsRouting(false), 2000);
//     } 
//   };

//   return (
//     <div className="min-h-screen w-full bg-gray-50/50 flex flex-col font-sans">
//       <div className="hidden bg-blue-50 bg-pink-50 bg-emerald-50 text-blue-900 text-pink-900 text-emerald-900 border-blue-600 border-pink-500 border-emerald-600 hover:bg-blue-50 hover:bg-pink-50 hover:bg-emerald-50"/>

//       <header className="px-8 py-6 sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="bg-black text-white p-2 rounded-lg"><Bot size={20} /></div>
//             <h1 className="text-xl font-bold tracking-widest uppercase bg-gradient-to-r from-blue-600 via-pink-500 to-emerald-500 bg-clip-text text-transparent">
//               A.I.D.E.N
//             </h1>
//           </div>
//           <button onClick={handleLogout} className="px-5 py-2.5 rounded-full text-xs font-bold bg-gray-100 hover:bg-black hover:text-white transition-all flex items-center gap-2">
//             <LogOut size={14} /> DISCONNECT
//           </button>
//         </div>
//       </header>

//       <main className="flex-1 max-w-7xl mx-auto w-full p-6 flex flex-col items-center justify-center">
        
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12 w-full max-w-2xl relative">
//           <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
//             Hello, {user?.full_name?.split(' ')[0] || 'User'}
//           </h2>
          
//           {/* 🔮 MAGIC INPUT */}
//           <div className="relative group w-full z-20">
//             <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-pink-500 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
//             <form onSubmit={handleMagicRoute} className="relative flex items-center bg-white rounded-xl shadow-xl p-2 border border-gray-100">
//               <Sparkles className={`ml-4 ${isRouting ? 'animate-spin text-purple-500' : 'text-gray-400'}`} size={24} />
//               <input 
//                 type="text" 
//                 value={magicInput}
//                 onChange={(e) => setMagicInput(e.target.value)}
//                 placeholder="Ask me anything... (e.g., 'Write python code', 'Workout plan')"
//                 className="w-full p-4 text-lg bg-transparent border-none focus:ring-0 outline-none text-gray-700 placeholder-gray-400"
//                 disabled={isRouting}
//               />
//               <button 
//                 type="submit" 
//                 disabled={isRouting || !magicInput}
//                 className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
//               >
//                 {isRouting ? <Loader2 className="animate-spin" size={24}/> : <ArrowRight size={24} />}
//               </button>
//             </form>
//           </div>

//           {/* 🟢 STATUS OVERLAY */}
//           <AnimatePresence>
//             {isRouting && (
//               <motion.div 
//                 initial={{ opacity: 0, y: 10 }} 
//                 animate={{ opacity: 1, y: 0 }} 
//                 exit={{ opacity: 0 }}
//                 className="absolute top-full left-0 right-0 mt-4 flex items-center justify-center gap-2 text-gray-600 font-medium"
//               >
//                 <BrainCircuit size={18} className="animate-pulse text-blue-500"/>
//                 {statusMessage}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>

//         {!loading && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 w-full">
//             {personas.map((persona, index) => (
//               <motion.div key={persona.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
//                 <PersonaCard persona={persona} onSelect={() => handleInitialize(persona.id)} />
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Loader2, Bot, Sparkles, ArrowRight, BrainCircuit } from 'lucide-react';

import api from '@/lib/api'; 
import { PersonaCard } from '@/components/PersonaCard';
import { Persona } from '@/types'; 

interface DashboardProps {
  onSelectPersona: (persona: Persona) => void;
}

const Dashboard = ({ onSelectPersona }: DashboardProps) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<{ full_name: string; email: string } | null>(null);
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Magic Input State
  const [magicInput, setMagicInput] = useState('');
  const [isRouting, setIsRouting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(''); 

  useEffect(() => {
    if (!api.auth.isAuthenticated()) { navigate('/'); return; }
    setUser(api.auth.getUser());

    const fetchPersonas = async () => {
      try {
        const { data } = await api.personas.getAll();
        if (Array.isArray(data)) setPersonas(data);
        else if (data?.data) setPersonas(data.data);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchPersonas();
  }, [navigate]);

  const handleLogout = () => { api.auth.logout(); navigate('/'); };

  const handleInitialize = async (personaId: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const selected = personas.find(p => p.id === personaId);
    if (selected) onSelectPersona(selected); 

    try {
      const response = await api.chat.createSession(personaId, token);
      if (response.session) navigate(`/chat/${response.session.id}`);
    } catch (err) { console.error(err); }
  };

  // 🔮 UPGRADED MAGIC ROUTING
  const handleMagicRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!magicInput.trim()) return;

    setIsRouting(true);
    setStatusMessage("Analyzing intent..."); 

    const token = localStorage.getItem('token');
    
    try {
      // 1. Ask Router
      let targetPersonaId = 'jarvis'; 
      try {
        const routeRes = await api.chat.routeMessage(magicInput, token!);
        if (routeRes?.personaId) targetPersonaId = routeRes.personaId;
      } catch (err) { console.warn("Router offline, defaulting."); }
      
      // 2. Feedback
      const targetName = personas.find(p => p.id === targetPersonaId)?.name || 'System';
      setStatusMessage(`Logic detected. Routing to ${targetName}...`);
      
      // Select Theme
      const selected = personas.find(p => p.id === targetPersonaId);
      if (selected) onSelectPersona(selected);

      // Brief delay for UX
      await new Promise(r => setTimeout(r, 1000));

      // 3. Create Session
      const sessionRes = await api.chat.createSession(targetPersonaId, token!);
      
      if (sessionRes?.session) {
         // 4. Navigate AND Pass Message
         navigate(`/chat/${sessionRes.session.id}`, { 
           state: { autoSend: magicInput } 
         });
      }

    } catch (err) {
      console.error("Error:", err);
      setStatusMessage("System Error. Please try manually.");
      setTimeout(() => setIsRouting(false), 2000);
    } 
  };

  return (
    <div className="min-h-screen w-full bg-gray-50/50 flex flex-col font-sans">
      <div className="hidden bg-blue-50 bg-pink-50 bg-emerald-50 text-blue-900 text-pink-900 text-emerald-900 border-blue-600 border-pink-500 border-emerald-600 hover:bg-blue-50 hover:bg-pink-50 hover:bg-emerald-50"/>

      <header className="px-8 py-6 sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-black text-white p-2 rounded-lg"><Bot size={20} /></div>
            {/* UPDATED: Solid Black Title */}
            <h1 className="text-xl font-bold tracking-widest uppercase text-black">
              A.I.D.E.N
            </h1>
          </div>
          <button onClick={handleLogout} className="px-5 py-2.5 rounded-full text-xs font-bold bg-gray-100 hover:bg-black hover:text-white transition-all flex items-center gap-2">
            <LogOut size={14} /> DISCONNECT
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 flex flex-col items-center justify-center">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12 w-full max-w-2xl relative">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Hello, {user?.full_name?.split(' ')[0] || 'User'}
          </h2>
          
          {/* 🔮 MAGIC INPUT */}
          <div className="relative group w-full z-20">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-pink-500 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <form onSubmit={handleMagicRoute} className="relative flex items-center bg-white rounded-xl shadow-xl p-2 border border-gray-100">
              <Sparkles className={`ml-4 ${isRouting ? 'animate-spin text-purple-500' : 'text-gray-400'}`} size={24} />
              <input 
                type="text" 
                value={magicInput}
                onChange={(e) => setMagicInput(e.target.value)}
                placeholder="Ask me anything... (e.g., 'Write python code', 'Workout plan')"
                className="w-full p-4 text-lg bg-transparent border-none focus:ring-0 outline-none text-gray-700 placeholder-gray-400"
                disabled={isRouting}
              />
              <button 
                type="submit" 
                disabled={isRouting || !magicInput}
                className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {isRouting ? <Loader2 className="animate-spin" size={24}/> : <ArrowRight size={24} />}
              </button>
            </form>
          </div>

          {/* 🟢 STATUS OVERLAY */}
          <AnimatePresence>
            {isRouting && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }}
                className="absolute top-full left-0 right-0 mt-4 flex items-center justify-center gap-2 text-gray-600 font-medium"
              >
                <BrainCircuit size={18} className="animate-pulse text-blue-500"/>
                {statusMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 w-full">
            {personas.map((persona, index) => (
              <motion.div key={persona.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <PersonaCard persona={persona} onSelect={() => handleInitialize(persona.id)} />
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;