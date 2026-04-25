// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Send, Mic, ArrowLeft, Bot, User, Loader2 } from 'lucide-react';
// import { api } from '../lib/api';

// // Types for our chat
// interface Message {
//   id: string;
//   role: 'user' | 'assistant';
//   content: string;
//   created_at: string;
// }

// export default function Chat() {
//   const { sessionId } = useParams<{ sessionId: string }>();
//   const navigate = useNavigate();
//   const bottomRef = useRef<HTMLDivElement>(null);

//   // State
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [personaName, setPersonaName] = useState('System');

//   // 1. Load History on Mount
//   useEffect(() => {
//     loadChatHistory();
//   }, [sessionId]);

//   // 2. Auto-scroll to bottom when messages change
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const loadChatHistory = async () => {
//     const token = api.auth.getToken();
//     if (!token || !sessionId) return;

//     try {
//       // Fetch messages from Backend
//       const res = await api.chat.getMessages(sessionId, token);
//       if (res.success) {
//         setMessages(res.data);
//         // Hint: You could fetch the session details to get the real Persona Name here
//         // For now, we default to "J.A.R.V.I.S" style based on ID context if needed
//         setPersonaName('J.A.R.V.I.S'); 
//       }
//     } catch (err) {
//       console.error("Failed to load chat:", err);
//     }
//   };

//   const handleSend = async (e?: React.FormEvent) => {
//     e?.preventDefault();
//     if (!input.trim() || isLoading) return;

//     const token = api.auth.getToken();
//     if (!token || !sessionId) return;

//     // Optimistic UI: Show user message immediately
//     const tempMsg: Message = {
//       id: Date.now().toString(),
//       role: 'user',
//       content: input,
//       created_at: new Date().toISOString()
//     };
//     setMessages(prev => [...prev, tempMsg]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       // Send to Backend
//       const res = await api.chat.sendMessage(sessionId, input, token);
      
//       if (res.success) {
//         // The backend returns the AI's response inside `res.message`
//         setMessages(prev => [...prev, res.message]);
//       }
//     } catch (err) {
//       console.error("Failed to send:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans">
      
//       {/* SIDEBAR (Simple version for now) */}
//       <div className="hidden md:flex w-64 flex-col border-r border-white/10 bg-black/40 p-4">
//         <div className="mb-8 flex items-center gap-2 text-xl font-bold tracking-wider text-blue-400">
//           <Bot className="h-6 w-6" />
//           <span>A.I.D.E.N</span>
//         </div>
//         <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
//           Active Session
//         </div>
//         <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300">
//            {sessionId?.slice(0, 8)}...
//         </div>
//         <button 
//           onClick={() => navigate('/dashboard')}
//           className="mt-auto flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to Dashboard
//         </button>
//       </div>

//       {/* MAIN CHAT AREA */}
//       <div className="flex-1 flex flex-col relative">
        
//         {/* HEADER */}
//         <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black/20 backdrop-blur-sm">
//           <div className="flex items-center gap-3">
//             <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
//             <div>
//               <h1 className="font-bold tracking-wide text-lg">{personaName}</h1>
//               <p className="text-xs text-blue-400/80 tracking-widest uppercase">System Online</p>
//             </div>
//           </div>
//         </header>

//         {/* MESSAGES LIST */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
//           {messages.length === 0 && (
//             <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50">
//               <Bot className="h-12 w-12 mb-4" />
//               <p>Initialize protocol...</p>
//             </div>
//           )}

//           {messages.map((msg) => {
//             const isAi = msg.role === 'assistant';
//             return (
//               <div 
//                 key={msg.id} 
//                 className={`flex gap-4 ${isAi ? 'justify-start' : 'justify-end'}`}
//               >
//                 {/* Avatar */}
//                 {isAi && (
//                   <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
//                     <Bot className="w-5 h-5 text-blue-400" />
//                   </div>
//                 )}

//                 {/* Bubble */}
//                 <div 
//                   className={`max-w-[80%] rounded-2xl px-5 py-3 backdrop-blur-sm border ${
//                     isAi 
//                       ? 'bg-white/5 border-white/10 text-gray-200 rounded-tl-none' 
//                       : 'bg-blue-600/90 border-blue-500/50 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] rounded-tr-none'
//                   }`}
//                 >
//                   <p className="leading-relaxed whitespace-pre-wrap text-sm">{msg.content}</p>
//                 </div>

//                 {/* User Avatar */}
//                 {!isAi && (
//                   <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
//                     <User className="w-5 h-5 text-purple-400" />
//                   </div>
//                 )}
//               </div>
//             );
//           })}
          
//           {/* Loading Indicator */}
//           {isLoading && (
//             <div className="flex gap-4 justify-start animate-pulse">
//                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
//                   <Bot className="w-5 h-5 text-blue-400" />
//                </div>
//                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none px-5 py-3 flex items-center gap-2">
//                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
//                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
//                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
//                </div>
//             </div>
//           )}
          
//           <div ref={bottomRef} />
//         </div>

//         {/* INPUT AREA */}
//         <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-md">
//           <form 
//             onSubmit={handleSend}
//             className="max-w-4xl mx-auto relative flex items-center gap-3"
//           >
//             <div className="flex-1 relative group">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Type your command..."
//                 disabled={isLoading}
//                 className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3.5 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-white placeholder-gray-500 shadow-inner"
//               />
//               <button 
//                 type="button" 
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors p-1"
//               >
//                 <Mic className="w-5 h-5" />
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={!input.trim() || isLoading}
//               className="bg-blue-600 hover:bg-blue-500 text-white p-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
//             >
//               {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
//             </button>
//           </form>
//           <div className="text-center mt-2">
//             <p className="text-[10px] text-gray-600 uppercase tracking-widest">A.I.D.E.N Secure Connection • v1.0.4</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Send, Mic, ArrowLeft, Bot, User, Loader2 } from 'lucide-react';
// import { api } from '../lib/api';

// interface Message {
//   id: string;
//   role: 'user' | 'assistant';
//   content: string;
//   created_at: string;
// }

// export default function Chat() {
//   const { sessionId } = useParams<{ sessionId: string }>();
//   const navigate = useNavigate();
//   const bottomRef = useRef<HTMLDivElement>(null);

//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [personaName, setPersonaName] = useState('J.A.R.V.I.S');

//   useEffect(() => {
//     loadChatHistory();
//   }, [sessionId]);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const loadChatHistory = async () => {
//     const token = api.auth.getToken();
//     if (!token || !sessionId) return;

//     try {
//       const res = await api.chat.getMessages(sessionId, token);
//       if (res.success) {
//         setMessages(res.data);
//         setPersonaName('J.A.R.V.I.S');
//       }
//     } catch (err) {
//       console.error('Failed to load chat:', err);
//     }
//   };

//   const handleSend = async (e?: React.FormEvent) => {
//     e?.preventDefault();
//     if (!input.trim() || isLoading) return;

//     const token = api.auth.getToken();
//     if (!token || !sessionId) return;

//     const tempMsg: Message = {
//       id: Date.now().toString(),
//       role: 'user',
//       content: input,
//       created_at: new Date().toISOString(),
//     };

//     setMessages(prev => [...prev, tempMsg]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const res = await api.chat.sendMessage(sessionId, input, token);
//       if (res.success) {
//         setMessages(prev => [...prev, res.message]);
//       }
//     } catch (err) {
//       console.error('Failed to send:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#0e0f12] text-white font-sans">

//       {/* Sidebar */}
//       <aside className="hidden md:flex w-64 flex-col border-r border-white/5 bg-[#0b0c0f] p-5">
//         <div className="flex items-center gap-2 text-lg font-semibold tracking-widest text-blue-400 mb-10">
//           <Bot className="h-5 w-5" />
//           A.I.D.E.N
//         </div>

//         <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">
//           Active Session
//         </div>

//         <div className="rounded-lg bg-white/5 px-3 py-2 text-sm text-gray-300">
//           {sessionId?.slice(0, 8)}…
//         </div>

//         <button
//           onClick={() => navigate('/dashboard')}
//           className="mt-auto flex items-center gap-2 text-sm text-gray-500 hover:text-white transition"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to Dashboard
//         </button>
//       </aside>

//       {/* Main */}
//       <div className="flex-1 flex flex-col">

//         {/* Header */}
//         <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#0e0f12]">
//           <div className="flex items-center gap-3">
//             <span className="h-2 w-2 rounded-full bg-blue-400" />
//             <div>
//               <h1 className="text-sm font-semibold tracking-wider">
//                 {personaName}
//               </h1>
//               <p className="text-[10px] tracking-widest uppercase text-blue-400/70">
//                 System Online
//               </p>
//             </div>
//           </div>
//         </header>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
//           {messages.length === 0 && (
//             <div className="h-full flex flex-col items-center justify-center text-gray-500 text-sm">
//               <Bot className="h-10 w-10 mb-4 opacity-40" />
//               Awaiting input…
//             </div>
//           )}

//           {messages.map(msg => {
//             const isAi = msg.role === 'assistant';
//             return (
//               <div
//                 key={msg.id}
//                 className={`flex ${isAi ? 'justify-start' : 'justify-end'} gap-3`}
//               >
//                 {isAi && (
//                   <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
//                     <Bot className="w-4 h-4 text-blue-400" />
//                   </div>
//                 )}

//                 <div
//                   className={`max-w-[70%] px-5 py-3 rounded-xl text-sm leading-relaxed ${
//                     isAi
//                       ? 'bg-white/5 text-gray-200'
//                       : 'bg-blue-500 text-white'
//                   }`}
//                 >
//                   {msg.content}
//                 </div>

//                 {!isAi && (
//                   <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
//                     <User className="w-4 h-4 text-gray-300" />
//                   </div>
//                 )}
//               </div>
//             );
//           })}

//           {isLoading && (
//             <div className="flex gap-3 items-center text-blue-400 text-sm">
//               <Loader2 className="w-4 h-4 animate-spin" />
//               Processing…
//             </div>
//           )}

//           <div ref={bottomRef} />
//         </div>

//         {/* Input */}
//         <div className="border-t border-white/5 bg-[#0b0c0f] px-6 py-4">
//           <form
//             onSubmit={handleSend}
//             className="max-w-4xl mx-auto flex items-center gap-3"
//           >
//             <div className="flex-1 relative">
//               <input
//                 value={input}
//                 onChange={e => setInput(e.target.value)}
//                 placeholder="Type your command…"
//                 disabled={isLoading}
//                 className="w-full bg-white/5 rounded-lg px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-400/40"
//               />
//               <Mic className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
//             </div>

//             <button
//               type="submit"
//               disabled={!input.trim() || isLoading}
//               className="bg-blue-500 hover:bg-blue-400 transition rounded-lg p-3 disabled:opacity-40"
//             >
//               {isLoading ? (
//                 <Loader2 className="w-4 h-4 animate-spin" />
//               ) : (
//                 <Send className="w-4 h-4" />
//               )}
//             </button>
//           </form>

//           <p className="text-center mt-2 text-[10px] text-gray-600 tracking-widest uppercase">
//             A.I.D.E.N Secure Connection • v1.0.4
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }




// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Send, Mic, ArrowLeft, Bot, User, Loader2 } from 'lucide-react';
// import { api } from '../lib/api';

// interface Message {
//   id: string;
//   role: 'user' | 'assistant';
//   content: string;
//   created_at: string;
// }

// export default function Chat() {
//   const { sessionId } = useParams<{ sessionId: string }>();
//   const navigate = useNavigate();
//   const bottomRef = useRef<HTMLDivElement>(null);

//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [personaName] = useState('J.A.R.V.I.S');

//   useEffect(() => {
//     loadChatHistory();
//   }, [sessionId]);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const loadChatHistory = async () => {
//     const token = api.auth.getToken();
//     if (!token || !sessionId) return;

//     try {
//       const res = await api.chat.getMessages(sessionId, token);
//       if (res.success) setMessages(res.data);
//     } catch (err) {
//       console.error('Failed to load chat:', err);
//     }
//   };

//   const handleSend = async (e?: React.FormEvent) => {
//     e?.preventDefault();
//     if (!input.trim() || isLoading) return;

//     const token = api.auth.getToken();
//     if (!token || !sessionId) return;

//     const tempMsg: Message = {
//       id: Date.now().toString(),
//       role: 'user',
//       content: input,
//       created_at: new Date().toISOString(),
//     };

//     setMessages(prev => [...prev, tempMsg]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const res = await api.chat.sendMessage(sessionId, input, token);
//       if (res.success) setMessages(prev => [...prev, res.message]);
//     } catch (err) {
//       console.error('Failed to send:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#1c1d21] font-sans text-black">

//       {/* Sidebar */}
//       <aside className="hidden md:flex w-64 flex-col bg-[#16171a] border-r border-white/10 p-6">
//         <div className="flex items-center gap-2 text-lg font-semibold tracking-widest text-blue-500 mb-10">
//           <Bot className="h-5 w-5" />
//           A.I.D.E.N
//         </div>

//         <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">
//           Active Session
//         </div>

//         <div className="rounded-lg bg-white/10 px-3 py-2 text-sm text-gray-200">
//           {sessionId?.slice(0, 8)}…
//         </div>

//         <button
//           onClick={() => navigate('/dashboard')}
//           className="mt-auto flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to Dashboard
//         </button>
//       </aside>

//       {/* Main */}
//       <div className="flex-1 flex flex-col bg-[#f5f5f7]">

//         {/* Header */}
//         <header className="h-16 flex items-center justify-between px-8 border-b border-black/5 bg-white">
//           <div className="flex items-center gap-3">
//             <span className="h-2 w-2 rounded-full bg-blue-500" />
//             <div>
//               <h1 className="text-sm font-semibold tracking-wider text-black">
//                 {personaName}
//               </h1>
//               <p className="text-[10px] tracking-widest uppercase text-blue-500">
//                 System Online
//               </p>
//             </div>
//           </div>
//         </header>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto px-10 py-8 space-y-6 bg-[#f5f5f7]">
//           {messages.length === 0 && (
//             <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm">
//               <Bot className="h-10 w-10 mb-4 opacity-40" />
//               Awaiting command…
//             </div>
//           )}

//           {messages.map(msg => {
//             const isAi = msg.role === 'assistant';

//             return (
//               <div
//                 key={msg.id}
//                 className={`flex ${isAi ? 'justify-start' : 'justify-end'} gap-3`}
//               >
//                 {isAi && (
//                   <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
//                     <Bot className="w-4 h-4 text-blue-600" />
//                   </div>
//                 )}

//                 <div
//                   className={`max-w-[70%] px-5 py-3 rounded-xl text-sm leading-relaxed ${
//                     isAi
//                       ? 'bg-white border border-black/5 text-gray-800'
//                       : 'bg-white border-l-4 border-blue-500 text-gray-900'
//                   }`}
//                 >
//                   {msg.content}
//                 </div>

//                 {!isAi && (
//                   <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
//                     <User className="w-4 h-4 text-gray-600" />
//                   </div>
//                 )}
//               </div>
//             );
//           })}

//           {isLoading && (
//             <div className="flex gap-3 items-center text-blue-600 text-sm">
//               <Loader2 className="w-4 h-4 animate-spin" />
//               Processing…
//             </div>
//           )}

//           <div ref={bottomRef} />
//         </div>

//         {/* Input */}
//         <div className="border-t border-black/5 bg-white px-8 py-5">
//           <form
//             onSubmit={handleSend}
//             className="max-w-4xl mx-auto flex items-center gap-3"
//           >
//             <div className="flex-1 relative">
//               <input
//                 value={input}
//                 onChange={e => setInput(e.target.value)}
//                 placeholder="Type your command…"
//                 disabled={isLoading}
//                 className="w-full bg-[#f5f5f7] border border-black/10 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
//               />
//               <Mic className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//             </div>

//             <button
//               type="submit"
//               disabled={!input.trim() || isLoading}
//               className="bg-blue-500 hover:bg-blue-400 transition rounded-full px-5 py-3 text-white disabled:opacity-40"
//             >
//               {isLoading ? (
//                 <Loader2 className="w-4 h-4 animate-spin" />
//               ) : (
//                 <Send className="w-4 h-4" />
//               )}
//             </button>
//           </form>

//           <p className="text-center mt-3 text-[10px] text-gray-400 tracking-widest uppercase">
//             A.I.D.E.N Secure Connection • v1.0.4
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }




// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Send, Mic, ArrowLeft, Bot, User, Loader2 } from 'lucide-react';
// import { api } from '../lib/api';

// interface Message {
//   id: string;
//   role: 'user' | 'assistant';
//   content: string;
//   created_at: string;
// }

// export default function Chat() {
//   const { sessionId } = useParams<{ sessionId: string }>();
//   const navigate = useNavigate();
//   const bottomRef = useRef<HTMLDivElement>(null);

//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [personaName] = useState('J.A.R.V.I.S');

//   useEffect(() => {
//     loadChatHistory();
//   }, [sessionId]);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const loadChatHistory = async () => {
//     const token = api.auth.getToken();
//     if (!token || !sessionId) return;

//     try {
//       const res = await api.chat.getMessages(sessionId, token);
//       if (res.success) setMessages(res.data);
//     } catch (err) {
//       console.error('Failed to load chat:', err);
//     }
//   };

//   const handleSend = async (e?: React.FormEvent) => {
//     e?.preventDefault();
//     if (!input.trim() || isLoading) return;

//     const token = api.auth.getToken();
//     if (!token || !sessionId) return;

//     const userMsg: Message = {
//       id: Date.now().toString(),
//       role: 'user',
//       content: input,
//       created_at: new Date().toISOString(),
//     };

//     setMessages(prev => [...prev, userMsg]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       // 🔹 Hardcoded behavior preserved
//       if (input.toLowerCase().includes('system check')) {
//         setTimeout(() => {
//           setMessages(prev => [
//             ...prev,
//             {
//               id: 'sys-check',
//               role: 'assistant',
//               content:
//                 '[J.A.R.V.I.S]: I heard you say "System check". (AI Integration coming soon!)',
//               created_at: new Date().toISOString(),
//             },
//           ]);
//           setIsLoading(false);
//         }, 600);
//         return;
//       }

//       const res = await api.chat.sendMessage(sessionId, input, token);
//       if (res.success) setMessages(prev => [...prev, res.message]);
//     } catch (err) {
//       console.error('Failed to send:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen font-sans bg-[#1c1d21]">

//       {/* Sidebar */}
//       <aside className="hidden md:flex w-64 flex-col bg-[#141518] border-r border-white/10 p-6 text-white">
//         <div className="flex items-center gap-2 text-lg font-semibold tracking-widest text-blue-500 mb-10">
//           <Bot className="h-5 w-5" />
//           A.I.D.E.N
//         </div>

//         <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">
//           Active Session
//         </div>

//         <div className="rounded-lg bg-white/10 px-3 py-2 text-sm text-gray-200">
//           {sessionId?.slice(0, 8)}…
//         </div>

//         <button
//           onClick={() => navigate('/dashboard')}
//           className="mt-auto flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to Dashboard
//         </button>
//       </aside>

//       {/* Main */}
//       <div className="flex-1 flex flex-col bg-[#f7f7f8]">

//         {/* Header */}
//         <header className="h-16 flex items-center justify-between px-8 border-b border-black/5 bg-white">
//           <div className="flex items-center gap-3">
//             <span className="h-2 w-2 rounded-full bg-blue-500" />
//             <div>
//               <h1 className="text-sm font-semibold tracking-wider text-black">
//                 {personaName}
//               </h1>
//               <p className="text-[10px] tracking-widest uppercase text-blue-500">
//                 System Online
//               </p>
//             </div>
//           </div>

//           {/* <button
//             onClick={() => {
//               setInput('System check');
//               handleSend();
//             }}
//             className="rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-600 hover:bg-blue-500/20 transition"
//           >
//             System Check
//           </button> */}
//         </header>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto px-10 py-8 space-y-6">
//           {messages.map(msg => {
//             const isAi = msg.role === 'assistant';

//             return (
//               <div
//                 key={msg.id}
//                 className={`flex ${isAi ? 'justify-start' : 'justify-end'} gap-3`}
//               >
//                 {isAi && (
//                   <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
//                     <Bot className="w-4 h-4 text-blue-600" />
//                   </div>
//                 )}

//                 <div
//                   className={`max-w-[70%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${
//                     isAi
//                       ? 'bg-white border border-black/5 text-gray-800'
//                       : 'bg-white border-l-4 border-blue-500 text-gray-900'
//                   }`}
//                 >
//                   {msg.content}
//                 </div>

//                 {!isAi && (
//                   <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
//                     <User className="w-4 h-4 text-gray-600" />
//                   </div>
//                 )}
//               </div>
//             );
//           })}

//           {isLoading && (
//             <div className="flex gap-3 items-center text-blue-600 text-sm">
//               <Loader2 className="w-4 h-4 animate-spin" />
//               Processing…
//             </div>
//           )}

//           <div ref={bottomRef} />
//         </div>

//         {/* Input */}
//         <div className="border-t border-black/5 bg-white px-8 py-5">
//           <form
//             onSubmit={handleSend}
//             className="max-w-4xl mx-auto flex items-center gap-3"
//           >
//             <div className="flex-1 relative">
//               <input
//                 value={input}
//                 onChange={e => setInput(e.target.value)}
//                 placeholder="Type your command…"
//                 disabled={isLoading}
//                 className="w-full bg-[#f7f7f8] border border-black/10 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
//               />
//               <Mic className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//             </div>

//             <button
//               type="submit"
//               disabled={!input.trim() || isLoading}
//               className="bg-blue-500 hover:bg-blue-400 transition rounded-full px-5 py-3 text-white disabled:opacity-40"
//             >
//               {isLoading ? (
//                 <Loader2 className="w-4 h-4 animate-spin" />
//               ) : (
//                 <Send className="w-4 h-4" />
//               )}
//             </button>
//           </form>

//           {/* ✅ Visibility fixed */}
//           <p className="text-center mt-3 text-[10px] text-black tracking-widest uppercase">

//             A.I.D.E.N Secure Connection • v1.0.4
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Send, Mic, ArrowLeft, Bot, User, Loader2, MessageSquare } from 'lucide-react';
// import { api } from '../lib/api';

// // Types
// interface Message {
//   id: string;
//   role: 'user' | 'assistant';
//   content: string;
//   created_at: string;
// }

// // ✅ Step 3.1 — Session interface
// interface Session {
//   id: string;
//   created_at: string;
//   persona_id: string;
// }

// export default function Chat() {
//   const { sessionId } = useParams<{ sessionId: string }>();
//   const navigate = useNavigate();
//   const bottomRef = useRef<HTMLDivElement>(null);

//   const [messages, setMessages] = useState<Message[]>([]);
//   const [sessions, setSessions] = useState<Session[]>([]); // ✅ New state
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [personaName] = useState('J.A.R.V.I.S');

//   // ✅ Step 3.1 — Updated useEffect
//   useEffect(() => {
//     loadChatHistory();
//     loadSessions();
//   }, [sessionId]);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const loadChatHistory = async () => {
//     const token = api.auth.getToken();
//     if (!token || !sessionId) return;

//     try {
//       const res = await api.chat.getMessages(sessionId, token);
//       if (res.success) setMessages(res.data);
//     } catch (err) {
//       console.error('Failed to load chat:', err);
//     }
//   };

//   // ✅ Step 3.1 — Load sidebar sessions
//   const loadSessions = async () => {
//     const token = api.auth.getToken();
//     if (!token) return;

//     try {
//       const res = await api.chat.getAllSessions(token);
//       if (res.success) {
//         setSessions(res.data || res.sessions);
//       }
//     } catch (err) {
//       console.error('Failed to load sessions', err);
//     }
//   };

//   const handleSend = async (e?: React.FormEvent) => {
//     e?.preventDefault();
//     if (!input.trim() || isLoading) return;

//     const token = api.auth.getToken();
//     if (!token || !sessionId) return;

//     const userMsg: Message = {
//       id: Date.now().toString(),
//       role: 'user',
//       content: input,
//       created_at: new Date().toISOString(),
//     };

//     setMessages(prev => [...prev, userMsg]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       if (input.toLowerCase().includes('system check')) {
//         setTimeout(() => {
//           setMessages(prev => [
//             ...prev,
//             {
//               id: 'sys-check',
//               role: 'assistant',
//               content:
//                 '[J.A.R.V.I.S]: I heard you say "System check". (AI Integration coming soon!)',
//               created_at: new Date().toISOString(),
//             },
//           ]);
//           setIsLoading(false);
//         }, 600);
//         return;
//       }

//       const res = await api.chat.sendMessage(sessionId, input, token);
//       if (res.success) setMessages(prev => [...prev, res.message]);
//     } catch (err) {
//       console.error('Failed to send:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans">
      
//       {/* ✅ UPDATED SIDEBAR */}
//       <div className="hidden md:flex w-64 flex-col border-r border-white/10 bg-black/40 p-4">
//         <div className="mb-8 flex items-center gap-2 text-xl font-bold tracking-wider text-blue-400">
//           <Bot className="h-6 w-6" />
//           <span>A.I.D.E.N</span>
//         </div>

//         <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
//           History
//         </div>

//         {/* ✅ SESSION LIST */}
//         <div className="flex-1 overflow-y-auto space-y-2 pr-2">
//           {sessions.map((session) => (
//             <button
//               key={session.id}
//               onClick={() => navigate(`/chat/${session.id}`)}
//               className={`w-full text-left p-3 rounded-lg text-sm transition-all border ${
//                 session.id === sessionId 
//                   ? 'bg-blue-600/20 border-blue-500/50 text-white' 
//                   : 'bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-gray-200'
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 <MessageSquare className="w-4 h-4 opacity-70" />
//                 <span className="truncate">
//                   {session.persona_id.toUpperCase()} Session
//                 </span>
//               </div>
//               <div className="text-[10px] opacity-40 mt-1 pl-6">
//                 {new Date(session.created_at).toLocaleDateString()}
//               </div>
//             </button>
//           ))}
//         </div>

//         <button 
//           onClick={() => navigate('/dashboard')}
//           className="mt-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm pt-4 border-t border-white/10"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to Dashboard
//         </button>
//       </div>

//       {/* REST OF CHAT UI — unchanged */}
//       <div className="flex-1 flex flex-col bg-[#f7f7f8] text-black">
//         {/* header, messages, input — unchanged from your current version */}
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Send, Mic, ArrowLeft, Bot, User, Loader2, MessageSquare } from 'lucide-react';
// import { api } from '../lib/api';
// import ReactMarkdown from 'react-markdown';
// // --- Types ---
// interface Message {
//   id: string;
//   role: 'user' | 'assistant';
//   content: string;
//   created_at: string;
// }

// interface Session {
//   id: string;
//   created_at: string;
//   persona_id: string;
// }

// export default function Chat() {
//   const { sessionId } = useParams<{ sessionId: string }>();
//   const navigate = useNavigate();
//   const bottomRef = useRef<HTMLDivElement>(null);

//   // --- State ---
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [sessions, setSessions] = useState<Session[]>([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [personaName] = useState('J.A.R.V.I.S');

//   // --- Effects ---
//   useEffect(() => {
//     loadChatHistory();
//     loadSessions();
//   }, [sessionId]);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // --- Logic ---
//   const loadSessions = async () => {
//     const token = api.auth.getToken();
//     if (!token) return;
//     try {
//       const res = await api.chat.getAllSessions(token);
//       if (res.success) {
//         setSessions(res.data || res.sessions);
//       }
//     } catch (err) {
//       console.error("Failed to load sessions", err);
//     }
//   };

//   const loadChatHistory = async () => {
//     const token = api.auth.getToken();
//     if (!token || !sessionId) return;
//     try {
//       const res = await api.chat.getMessages(sessionId, token);
//       if (res.success) setMessages(res.data);
//     } catch (err) {
//       console.error("Failed to load chat:", err);
//     }
//   };

//   const handleSend = async (e?: React.FormEvent) => {
//     e?.preventDefault();
//     if (!input.trim() || isLoading) return;

//     const token = api.auth.getToken();
//     if (!token || !sessionId) return;

//     // Optimistic Update
//     const tempMsg: Message = {
//       id: Date.now().toString(),
//       role: 'user',
//       content: input,
//       created_at: new Date().toISOString()
//     };
//     setMessages(prev => [...prev, tempMsg]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const res = await api.chat.sendMessage(sessionId, input, token);
//       if (res.success) {
//         setMessages(prev => [...prev, res.message]);
//       }
//     } catch (err) {
//       console.error("Failed to send:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // --- Render ---
//   return (
//     <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans">
      
//       {/* 1. SIDEBAR (Your exact version) */}
//       <div className="hidden md:flex w-64 flex-col border-r border-white/10 bg-black/40 p-4">
//         <div className="mb-8 flex items-center gap-2 text-xl font-bold tracking-wider text-blue-400">
//           <Bot className="h-6 w-6" />
//           <span>A.I.D.E.N</span>
//         </div>
        
//         <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
//           History
//         </div>

//         <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-white/10">
//           {sessions.map((session) => (
//             <button
//               key={session.id}
//               onClick={() => navigate(`/chat/${session.id}`)}
//               className={`w-full text-left p-3 rounded-lg text-sm transition-all border ${
//                 session.id === sessionId 
//                   ? 'bg-blue-600/20 border-blue-500/50 text-white' 
//                   : 'bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-gray-200'
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 <MessageSquare className="w-4 h-4 opacity-70" />
//                 <span className="truncate">
//                    {session.persona_id.toUpperCase()} Session
//                 </span>
//               </div>
//               <div className="text-[10px] opacity-40 mt-1 pl-6">
//                 {new Date(session.created_at).toLocaleDateString()}
//               </div>
//             </button>
//           ))}
//         </div>

//         <button 
//           onClick={() => navigate('/dashboard')}
//           className="mt-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm pt-4 border-t border-white/10"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to Dashboard
//         </button>
//       </div>

//       {/* 2. MAIN CHAT AREA (Reconstructed to match your White Theme Screenshot) */}
//       <div className="flex-1 flex flex-col relative bg-white text-gray-800">
        
//         {/* Header */}
//         <header className="h-20 border-b border-gray-100 flex items-center justify-between px-8 bg-white">
//           <div className="flex items-center gap-3">
//              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
//              <div>
//                 <h1 className="font-bold text-lg tracking-wide text-gray-900">{personaName}</h1>
//                 <p className="text-xs text-blue-500 font-semibold tracking-widest uppercase">System Online</p>
//              </div>
//           </div>
//           {/* <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
//             System Check
//           </button> */}
//         </header>

//         {/* Message List */}
//         <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gray-50/50">
//           {messages.length === 0 && (
//             <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
//               <Bot className="h-12 w-12 mb-4 text-blue-200" />
//               <p>Initialize protocol...</p>
//             </div>
//           )}

//           {messages.map((msg) => {
//             const isAi = msg.role === 'assistant';
//             return (
//               <div 
//                 key={msg.id} 
//                 className={`flex gap-4 ${isAi ? 'justify-start' : 'justify-end'}`}
//               >
//                 {isAi && (
//                   <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0">
//                     <Bot className="w-5 h-5 text-blue-600" />
//                   </div>
//                 )}
//                 <div 
//                   className={`max-w-[70%] px-6 py-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
//                     isAi 
//                       ? 'bg-white border border-gray-100 text-gray-700 rounded-tl-none' 
//                       : 'bg-blue-600 text-white shadow-blue-500/20 rounded-tr-none'
//                   }`}
//                 >
//                   <p className="whitespace-pre-wrap">{msg.content}</p>
//                 </div>
//               </div>
//             );
//           })}
          
//           {isLoading && (
//             <div className="flex gap-4 justify-start">
//                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
//                   <Bot className="w-5 h-5 text-blue-600" />
//                </div>
//                <div className="bg-white border border-gray-100 px-6 py-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
//                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
//                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
//                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
//                </div>
//             </div>
//           )}
//           <div ref={bottomRef} />
//         </div>

//         {/* Input Area (Fixed Bottom) */}
//         <div className="p-6 bg-white border-t border-gray-100">
//           <form 
//             onSubmit={handleSend}
//             className="max-w-4xl mx-auto relative flex items-center gap-4"
//           >
//             <div className="flex-1 relative group shadow-sm rounded-full">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Type your command..."
//                 disabled={isLoading}
//                 className="w-full bg-white border border-gray-200 rounded-full pl-6 pr-12 py-4 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all text-gray-800 placeholder-gray-400"
//               />
//               <button 
//                 type="button" 
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
//               >
//                 <Mic className="w-5 h-5" />
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={!input.trim() || isLoading}
//               className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40"
//             >
//               {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
//             </button>
//           </form>
          
//           <div className="text-center mt-4">
//             <p className="text-[10px] text-zinc-800 uppercase tracking-widest font-semibold">

//               A.I.D.E.N Secure Connection • v1.0.4
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Send, Mic, ArrowLeft, Bot, Loader2, MessageSquare } from 'lucide-react';
// import { api } from '../lib/api';
// import ReactMarkdown from 'react-markdown';
// import { useTextToSpeech } from '../hooks/useTextToSpeech';
// import { Volume2, VolumeX } from 'lucide-react'; // Import icons

// // --- Types ---
// interface Message {
//   id: string;
//   role: 'user' | 'assistant';
//   content: string;
//   created_at: string;
// }

// interface Session {
//   id: string;
//   created_at: string;
//   persona_id: string;
// }

// export default function Chat() {
//   const { sessionId } = useParams<{ sessionId: string }>();
//   const navigate = useNavigate();
//   const bottomRef = useRef<HTMLDivElement>(null);

//   // --- State ---
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [sessions, setSessions] = useState<Session[]>([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [personaName] = useState('J.A.R.V.I.S');

//   // --- Effects ---
//   useEffect(() => {
//     loadChatHistory();
//     loadSessions();
//   }, [sessionId]);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // --- Logic ---
//   const loadSessions = async () => {
//     const token = api.auth.getToken();
//     if (!token) return;
//     try {
//       const res = await api.chat.getAllSessions(token);
//       if (res.success) {
//         setSessions(res.data || res.sessions);
//       }
//     } catch (err) {
//       console.error('Failed to load sessions', err);
//     }
//   };

//   const loadChatHistory = async () => {
//     const token = api.auth.getToken();
//     if (!token || !sessionId) return;
//     try {
//       const res = await api.chat.getMessages(sessionId, token);
//       if (res.success) setMessages(res.data);
//     } catch (err) {
//       console.error('Failed to load chat:', err);
//     }
//   };

//   const handleSend = async (e?: React.FormEvent) => {
//     e?.preventDefault();
//     if (!input.trim() || isLoading) return;

//     const token = api.auth.getToken();
//     if (!token || !sessionId) return;

//     const tempMsg: Message = {
//       id: Date.now().toString(),
//       role: 'user',
//       content: input,
//       created_at: new Date().toISOString(),
//     };

//     setMessages((prev) => [...prev, tempMsg]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const res = await api.chat.sendMessage(sessionId, input, token);
//       if (res.success) {
//         setMessages((prev) => [...prev, res.message]);
//       }
//     } catch (err) {
//       console.error('Failed to send:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // --- Render ---
//   return (
//     <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans">
      
//       {/* SIDEBAR */}
//       <div className="hidden md:flex w-64 flex-col border-r border-white/10 bg-black/40 p-4">
//         <div className="mb-8 flex items-center gap-2 text-xl font-bold tracking-wider text-blue-400">
//           <Bot className="h-6 w-6" />
//           <span>A.I.D.E.N</span>
//         </div>

//         <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
//           History
//         </div>

//         <div className="flex-1 overflow-y-auto space-y-2 pr-2">
//           {sessions.map((session) => (
//             <button
//               key={session.id}
//               onClick={() => navigate(`/chat/${session.id}`)}
//               className={`w-full text-left p-3 rounded-lg text-sm transition-all border ${
//                 session.id === sessionId
//                   ? 'bg-blue-600/20 border-blue-500/50 text-white'
//                   : 'bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-gray-200'
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 <MessageSquare className="w-4 h-4 opacity-70" />
//                 <span className="truncate">
//                   {session.persona_id.toUpperCase()} Session
//                 </span>
//               </div>
//               <div className="text-[10px] opacity-40 mt-1 pl-6">
//                 {new Date(session.created_at).toLocaleDateString()}
//               </div>
//             </button>
//           ))}
//         </div>

//         <button
//           onClick={() => navigate('/dashboard')}
//           className="mt-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm pt-4 border-t border-white/10"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to Dashboard
//         </button>
//       </div>

//       {/* MAIN CHAT */}
//       <div className="flex-1 flex flex-col bg-white text-gray-800">
        
//         {/* Header */}
//         <header className="h-20 border-b border-gray-100 flex items-center px-8 bg-white">
//           <div className="flex items-center gap-3">
//             <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
//             <div>
//               <h1 className="font-bold text-lg tracking-wide text-gray-900">
//                 {personaName}
//               </h1>
//               <p className="text-xs text-blue-500 font-semibold tracking-widest uppercase">
//                 System Online
//               </p>
//             </div>
//           </div>
//         </header>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gray-50/50">
//           {messages.map((msg) => {
//             const isAi = msg.role === 'assistant';
//             return (
//               <div
//                 key={msg.id}
//                 className={`flex gap-4 ${isAi ? 'justify-start' : 'justify-end'}`}
//               >
//                 {isAi && (
//                   <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center">
//                     <Bot className="w-5 h-5 text-blue-600" />
//                   </div>
//                 )}

//                 <div
//                   className={`max-w-[70%] px-6 py-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
//                     isAi
//                       ? 'bg-white border border-gray-100 text-gray-700 rounded-tl-none'
//                       : 'bg-blue-600 text-white rounded-tr-none'
//                   }`}
//                 >
//                   {/* ✅ MARKDOWN RENDERING */}
//                   <div className="prose prose-sm max-w-none">
//                     <ReactMarkdown
//                       components={{
//                         code({ inline, children, ...props }: any) {
//                           return !inline ? (
//                             <div className="bg-black/80 text-white p-3 rounded-lg overflow-x-auto border border-white/10 my-2 font-mono text-xs">
//                               {children}
//                             </div>
//                           ) : (
//                             <code
//                               className="bg-black/10 px-1 py-0.5 rounded text-blue-600 font-mono"
//                               {...props}
//                             >
//                               {children}
//                             </code>
//                           );
//                         },
//                       }}
//                     >
//                       {msg.content}
//                     </ReactMarkdown>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}

//           <div ref={bottomRef} />
//         </div>

//         {/* Input */}
//         <div className="p-6 bg-white border-t border-gray-100">
//           <form
//             onSubmit={handleSend}
//             className="max-w-4xl mx-auto flex items-center gap-4"
//           >
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type your command..."
//               disabled={isLoading}
//               className="flex-1 bg-white border border-gray-200 rounded-full px-6 py-4 focus:outline-none focus:border-blue-400"
//             />

//             <button
//               type="submit"
//               disabled={!input.trim() || isLoading}
//               className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full"
//             >
//               {isLoading ? (
//                 <Loader2 className="w-5 h-5 animate-spin" />
//               ) : (
//                 <Send className="w-5 h-5" />
//               )}
//             </button>
//           </form>

//           <p className="text-center mt-4 text-[10px] text-zinc-800 uppercase tracking-widest font-semibold">
//             A.I.D.E.N Secure Connection • v1.0.4
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Send,
//   Mic,
//   ArrowLeft,
//   Bot,
//   Loader2,
//   MessageSquare,
//   Volume2,
//   VolumeX,
//   Paperclip
// } from 'lucide-react';

// import  api from '../lib/api';
// import ReactMarkdown from 'react-markdown';

// import { useTextToSpeech } from '../hooks/useTextToSpeech';
// import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

// // ---------- Types ----------
// interface Message {
//   id: string;
//   role: 'user' | 'assistant';
//   content: string;
//   created_at: string;
// }

// interface Session {
//   id: string;
//   created_at: string;
//   persona_id: string;
// }

// export default function Chat() {
//   const { sessionId } = useParams<{ sessionId: string }>();
//   const navigate = useNavigate();
//   const bottomRef = useRef<HTMLDivElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // 🔊 Text-to-Speech
//   const { speak, stop, isSpeaking } = useTextToSpeech();
//   const [autoPlay, setAutoPlay] = useState(true);

//   // 🎙️ Speech-to-Text
//   const {
//     isListening,
//     transcript,
//     startListening,
//     stopListening,
//     setTranscript: setRecogTranscript
//   } = useSpeechRecognition();

//   // ---------- State ----------
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [sessions, setSessions] = useState<Session[]>([]);
//   const [input, setInput] = useState('');
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [personaName] = useState('J.A.R.V.I.S');

//   // ---------- Effects ----------
//   useEffect(() => {
//     loadChatHistory();
//     loadSessions();
//   }, [sessionId]);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // 🎙️ Sync voice transcript → input
//   useEffect(() => {
//     if (transcript) {
//       setInput(prev => (prev ? prev + ' ' : '') + transcript);
//       setRecogTranscript('');
//     }
//   }, [transcript, setRecogTranscript]);

//   // ---------- Helpers ----------
//   const convertToBase64 = (file: File): Promise<string> =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = err => reject(err);
//     });

//   const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       const base64 = await convertToBase64(e.target.files[0]);
//       setSelectedImage(base64);
//     }
//   };

//   // ---------- API ----------
//   const loadSessions = async () => {
//     const token = api.auth.getToken();
//     if (!token) return;
//     const res = await api.chat.getAllSessions(token);
//     if (res?.success) setSessions(res.data || res.sessions);
//   };

//   const loadChatHistory = async () => {
//     const token = api.auth.getToken();
//     if (!token || !sessionId) return;
//     const res = await api.chat.getMessages(sessionId, token);
//     if (res?.success) setMessages(res.data);
//   };

//   const handleSend = async (e?: React.FormEvent) => {
//     e?.preventDefault();
//     if ((!input.trim() && !selectedImage) || isLoading) return;

//     const token = api.auth.getToken();
//     if (!token || !sessionId) return;

//     const tempMsg: Message = {
//       id: Date.now().toString(),
//       role: 'user',
//       content: input + (selectedImage ? ' [Image Uploaded]' : ''),
//       created_at: new Date().toISOString()
//     };

//     setMessages(prev => [...prev, tempMsg]);
//     setInput('');
//     setSelectedImage(null);
//     setIsLoading(true);

//     try {
//       const res = await api.chat.sendMessage(
//         sessionId,
//         input,
//         token,
//         selectedImage || undefined
//       );

//       if (res.success) {
//         setMessages(prev => [...prev, res.message]);
//         if (autoPlay) speak(res.message.content);
//       }
//     } catch (err) {
//       console.error('Send failed', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ---------- UI ----------
//   return (
//     <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans">

//       {/* SIDEBAR */}
//       <div className="hidden md:flex w-64 flex-col border-r border-white/10 bg-black/40 p-4">
//         <div className="mb-8 flex items-center gap-2 text-xl font-bold text-blue-400">
//           <Bot className="h-6 w-6" />
//           A.I.D.E.N
//         </div>

//         <div className="text-xs uppercase tracking-widest text-gray-500 mb-4">
//           History
//         </div>

//         <div className="flex-1 overflow-y-auto space-y-2">
//           {sessions.map(s => (
//             <button
//               key={s.id}
//               onClick={() => navigate(`/chat/${s.id}`)}
//               className={`w-full p-3 rounded-lg text-sm text-left ${
//                 s.id === sessionId
//                   ? 'bg-blue-600/20 border border-blue-500/50'
//                   : 'hover:bg-white/5 text-gray-400'
//               }`}
//             >
//               <MessageSquare className="inline w-4 h-4 mr-2" />
//               {s.persona_id.toUpperCase()}
//             </button>
//           ))}
//         </div>

//         <button
//           onClick={() => navigate('/dashboard')}
//           className="mt-4 text-gray-400 hover:text-white flex gap-2"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           Back
//         </button>
//       </div>

//       {/* MAIN */}
//       <div className="flex-1 flex flex-col bg-white text-gray-800">

//         {/* HEADER */}
//         <header className="h-20 border-b flex items-center justify-between px-8">
//           <div>
//             <h1 className="font-bold text-lg">{personaName}</h1>
//             <p className="text-xs text-blue-500 uppercase">System Online</p>
//           </div>

//           <button
//             onClick={() => {
//               if (isSpeaking) stop();
//               setAutoPlay(!autoPlay);
//             }}
//             className={`p-2 rounded-full ${
//               autoPlay ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
//             }`}
//           >
//             {autoPlay ? <Volume2 /> : <VolumeX />}
//           </button>
//         </header>

//         {/* MESSAGES */}
//         <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gray-50">
//           {messages.map(m => (
//             <div
//               key={m.id}
//               className={`flex ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
//             >
//               <div className={`max-w-[70%] p-4 rounded-2xl ${
//                 m.role === 'assistant'
//                   ? 'bg-white border'
//                   : 'bg-blue-600 text-white'
//               }`}>
//                 <ReactMarkdown>{m.content}</ReactMarkdown>
//               </div>
//             </div>
//           ))}
//           <div ref={bottomRef} />
//         </div>

//         {/* INPUT */}
//         <div className="p-6 border-t">
//           <form onSubmit={handleSend} className="relative flex items-center gap-3">

//             {/* IMAGE PREVIEW */}
//             {selectedImage && (
//               <div className="absolute bottom-full left-0 mb-2 bg-white p-2 rounded shadow">
//                 <img src={selectedImage} className="h-20 rounded" />
//                 <button
//                   onClick={() => setSelectedImage(null)}
//                   className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2"
//                 >
//                   ×
//                 </button>
//               </div>
//             )}

//             <button type="button" onClick={() => fileInputRef.current?.click()}>
//               <Paperclip />
//             </button>

//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               onChange={handleFileSelect}
//               className="hidden"
//             />

//             <input
//               value={input}
//               onChange={e => setInput(e.target.value)}
//               placeholder={selectedImage ? 'Add a caption…' : 'Type or speak…'}
//               className="flex-1 border rounded-full px-5 py-3"
//             />

//             <button
//               type="button"
//               onClick={isListening ? stopListening : startListening}
//               className={`p-2 rounded-full ${
//                 isListening ? 'bg-red-100 text-red-500 animate-pulse' : ''
//               }`}
//             >
//               <Mic />
//             </button>

//             <button type="submit" className="bg-blue-500 text-white p-4 rounded-full">
//               {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
//             </button>
//           </form>

//           <p className="text-center mt-3 text-[10px] text-gray-600 uppercase">
//             A.I.D.E.N Secure Connection • v1.0.4
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { 
//   Send, Mic, ArrowLeft, Bot, Loader2, MessageSquare, 
//   Volume2, VolumeX, Paperclip 
// } from 'lucide-react';

// import { api } from '../lib/api';
// import ReactMarkdown from 'react-markdown';
// import { useTextToSpeech } from '../hooks/useTextToSpeech';
// import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

// interface Message {
//   id: string;
//   role: 'user' | 'assistant';
//   content: string;
//   created_at: string;
// }

// interface Session {
//   id: string;
//   created_at: string;
//   persona_id: string;
// }

// export default function Chat() {
//   const { sessionId } = useParams<{ sessionId: string }>();
//   const navigate = useNavigate();
//   const bottomRef = useRef<HTMLDivElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // 🔊 Text-to-Speech
//   const { speak, stop, isSpeaking } = useTextToSpeech();
//   const [autoPlay, setAutoPlay] = useState(true);

//   // 🎙️ Speech-to-Text
//   const {
//     isListening,
//     transcript,
//     startListening,
//     stopListening,
//     setTranscript: setRecogTranscript
//   } = useSpeechRecognition();

//   const [messages, setMessages] = useState<Message[]>([]);
//   const [sessions, setSessions] = useState<Session[]>([]);
//   const [input, setInput] = useState('');
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [personaName] = useState('J.A.R.V.I.S');

//   // Load Data
//   useEffect(() => {
//     loadChatHistory();
//     loadSessions();
//   }, [sessionId]);

//   // Auto-scroll
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Sync Voice to Input
//   useEffect(() => {
//     if (transcript) {
//       setInput(prev => (prev ? prev + ' ' : '') + transcript);
//       setRecogTranscript('');
//     }
//   }, [transcript, setRecogTranscript]);

//   // --- API Calls ---
//   const loadSessions = async () => {
//     const token = api.auth.getToken();
//     if (!token) return;
//     try {
//       const res = await api.chat.getAllSessions(token);
//       if (res.success || res.data) {
//         setSessions(res.data || res.sessions || []);
//       }
//     } catch (err) {
//       console.error('Failed to load sessions', err);
//     }
//   };

//   const loadChatHistory = async () => {
//     const token = api.auth.getToken();
//     if (!token || !sessionId) return;
//     try {
//       const res = await api.chat.getMessages(sessionId, token);
//       if (res.success || res.data) setMessages(res.data || []);
//     } catch (err) {
//       console.error('Failed to load chat:', err);
//     }
//   };

//   // --- Helpers ---
//   const convertToBase64 = (file: File): Promise<string> =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = err => reject(err);
//     });

//   const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       const base64 = await convertToBase64(e.target.files[0]);
//       setSelectedImage(base64);
//     }
//   };

//   const handleSend = async (e?: React.FormEvent) => {
//     e?.preventDefault();
//     if ((!input.trim() && !selectedImage) || isLoading) return;

//     const token = api.auth.getToken();
//     if (!token || !sessionId) return;

//     // Optimistic Update
//     const tempMsg: Message = {
//       id: Date.now().toString(),
//       role: 'user',
//       content: input + (selectedImage ? ' [Image Uploaded]' : ''),
//       created_at: new Date().toISOString(),
//     };

//     setMessages((prev) => [...prev, tempMsg]);
    
//     // Capture current values before clearing
//     const msgToSend = input;
//     const imgToSend = selectedImage || undefined;
    
//     setInput('');
//     setSelectedImage(null);
//     setIsLoading(true);

//     try {
//       const res = await api.chat.sendMessage(sessionId, msgToSend, token, imgToSend);
//       if (res.success || res.message) {
//         setMessages((prev) => [...prev, res.message]);
//         if (autoPlay) speak(res.message.content);
//       }
//     } catch (err) {
//       console.error('Failed to send:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans">
      
//       {/* SIDEBAR */}
//       <div className="hidden md:flex w-64 flex-col border-r border-white/10 bg-black/40 p-4">
//         <div className="mb-8 flex items-center gap-2 text-xl font-bold tracking-wider text-blue-400">
//           <Bot className="h-6 w-6" />
//           <span>A.I.D.E.N</span>
//         </div>
//         <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
//           History
//         </div>
//         <div className="flex-1 overflow-y-auto space-y-2 pr-2">
//           {sessions.map((session) => (
//             <button
//               key={session.id}
//               onClick={() => navigate(`/chat/${session.id}`)}
//               className={`w-full text-left p-3 rounded-lg text-sm transition-all border ${
//                 session.id === sessionId
//                   ? 'bg-blue-600/20 border-blue-500/50 text-white'
//                   : 'bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-gray-200'
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 <MessageSquare className="w-4 h-4 opacity-70" />
//                 <span className="truncate">
//                   {session.persona_id.toUpperCase()}
//                 </span>
//               </div>
//             </button>
//           ))}
//         </div>
//         <button
//           onClick={() => navigate('/dashboard')}
//           className="mt-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm pt-4 border-t border-white/10"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to Dashboard
//         </button>
//       </div>

//       {/* MAIN CHAT */}
//       <div className="flex-1 flex flex-col bg-white text-gray-800">
        
//         {/* HEADER */}
//         <header className="h-20 border-b border-gray-100 flex items-center justify-between px-8 bg-white">
//           <div className="flex items-center gap-3">
//             <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
//             <div>
//               <h1 className="font-bold text-lg tracking-wide text-gray-900">{personaName}</h1>
//               <p className="text-xs text-blue-500 font-semibold tracking-widest uppercase">System Online</p>
//             </div>
//           </div>
//           <button
//             onClick={() => {
//               if (isSpeaking) stop();
//               setAutoPlay(!autoPlay);
//             }}
//             className={`p-2 rounded-full ${
//               autoPlay ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
//             }`}
//           >
//             {autoPlay ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
//           </button>
//         </header>

//         {/* MESSAGES */}
//         <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gray-50/50">
//           {messages.map((msg) => {
//             const isAi = msg.role === 'assistant';
//             return (
//               <div key={msg.id} className={`flex gap-4 ${isAi ? 'justify-start' : 'justify-end'}`}>
//                 {isAi && (
//                   <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0">
//                     <Bot className="w-5 h-5 text-blue-600" />
//                   </div>
//                 )}
//                 <div className={`max-w-[70%] px-6 py-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
//                   isAi 
//                     ? 'bg-white border border-gray-100 text-gray-700 rounded-tl-none' 
//                     : 'bg-blue-600 text-white rounded-tr-none'
//                 }`}>
//                   <div className="prose prose-sm max-w-none">
//                     <ReactMarkdown>{msg.content}</ReactMarkdown>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//           <div ref={bottomRef} />
//         </div>

//         {/* INPUT AREA */}
//         <div className="p-6 bg-white border-t border-gray-100">
//           <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-center gap-4">
            
//             {/* Image Preview */}
//             {selectedImage && (
//               <div className="absolute bottom-full left-0 mb-2 p-2 bg-white rounded shadow border">
//                 <img src={selectedImage} alt="Preview" className="h-20 rounded" />
//                 <button 
//                   type="button"
//                   onClick={() => setSelectedImage(null)}
//                   className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs"
//                 >
//                   ×
//                 </button>
//               </div>
//             )}

//             <div className="flex-1 relative group shadow-sm rounded-full">
//               {/* Paperclip */}
//               <button
//                 type="button"
//                 onClick={() => fileInputRef.current?.click()}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 p-2"
//               >
//                 <Paperclip className="w-5 h-5" />
//               </button>
              
//               <input 
//                 ref={fileInputRef}
//                 type="file" 
//                 accept="image/*"
//                 onChange={handleFileSelect}
//                 className="hidden" 
//               />

//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder={selectedImage ? "Add a caption..." : "Type or speak..."}
//                 disabled={isLoading}
//                 className="w-full bg-white border border-gray-200 rounded-full pl-12 pr-12 py-4 focus:outline-none focus:border-blue-400 transition-all text-gray-800"
//               />

//               {/* Mic */}
//               <button 
//                 type="button" 
//                 onClick={isListening ? stopListening : startListening}
//                 className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 transition-colors ${
//                   isListening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-blue-500'
//                 }`}
//               >
//                 <Mic className="w-5 h-5" />
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={(!input.trim() && !selectedImage) || isLoading}
//               className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full disabled:opacity-50 transition-all shadow-lg"
//             >
//               {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
//             </button>
//           </form>
          
//           <div className="text-center mt-4">
//             <p className="text-[10px] text-zinc-800 uppercase tracking-widest font-semibold">
//               A.I.D.E.N Secure Connection • v1.0.4
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect, useRef, useMemo } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Send, Mic, ArrowLeft, Bot, Loader2, MessageSquare, Volume2, Paperclip, Menu, X
// } from 'lucide-react';
// import { api } from '../lib/api';
// import ReactMarkdown from 'react-markdown';
// import { useTextToSpeech } from '../hooks/useTextToSpeech';
// import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
// import { Persona } from '../types';

// // 🎨 1. LOCAL DEFINITIONS (To fix "Black Color" issue on refresh)
// // If the App forgets who is active, we look it up here.
// const PERSONA_LOOKUP: Record<string, any> = {
//   jarvis: { 
//     name: 'Jarvis', role: 'Technical Architect', 
//     theme: { primary: 'bg-blue-600', secondary: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-600' }
//   },
//   friday: { 
//     name: 'Friday', role: 'Creative Companion', 
//     theme: { primary: 'bg-pink-500', secondary: 'bg-pink-50', text: 'text-pink-900', border: 'border-pink-500' }
//   },
//   titan: { 
//     name: 'Titan', role: 'Fitness Coach', 
//     theme: { primary: 'bg-emerald-600', secondary: 'bg-emerald-50', text: 'text-emerald-900', border: 'border-emerald-600' }
//   }
// };

// interface ChatProps { activePersona: Persona | null; }
// interface Message { id: string; role: 'user' | 'assistant'; content: string; created_at: string; }
// interface Session { id: string; created_at: string; persona_id: string; }

// export default function Chat({ activePersona }: ChatProps) {
//   const { sessionId } = useParams<{ sessionId: string }>();
//   const navigate = useNavigate();
//   const bottomRef = useRef<HTMLDivElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // State to hold the persona if 'activePersona' prop is lost (e.g. on refresh)
//   const [currentPersona, setCurrentPersona] = useState<any>(activePersona || PERSONA_LOOKUP['jarvis']);

//   // 🛡️ THEME ENGINE
//   const theme = useMemo(() => {
//     // Fallback to Blue (Jarvis) if anything fails
//     const base = (currentPersona as any)?.theme || PERSONA_LOOKUP['jarvis'].theme;
//     return {
//       primary: base.primary,
//       secondary: base.secondary || 'bg-gray-100',
//       text: base.text || 'text-gray-800',
//       border: base.border || base.primary.replace('bg-', 'border-')
//     };
//   }, [currentPersona]);

//   // 🔊 SPEECH SETUP
//   const { speak } = useTextToSpeech();
//   const { isListening, transcript, startListening, stopListening, setTranscript } = useSpeechRecognition();
  
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [sessions, setSessions] = useState<Session[]>([]);
//   const [input, setInput] = useState('');
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // Load Data
//   useEffect(() => { loadSessions(); loadChatHistory(); }, [sessionId]);
  
//   // Auto-scroll
//   useEffect(() => { 
//     if (messages.length > 0) bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); 
//   }, [messages]);

//   // Sync Speech
//   useEffect(() => { if (transcript) { setInput(prev => (prev ? prev + ' ' : '') + transcript); setTranscript(''); } }, [transcript]);

//   // 🔄 RESTORE PERSONA ON REFRESH
//   // If we have a sessionId but no activePersona, find out who this chat belongs to
//   useEffect(() => {
//     if (sessionId && sessions.length > 0) {
//       const session = sessions.find(s => s.id === sessionId);
//       if (session && session.persona_id) {
//         // Look up the correct theme/name from our local list
//         const restored = PERSONA_LOOKUP[session.persona_id.toLowerCase()];
//         if (restored) setCurrentPersona(restored);
//       }
//     } else if (activePersona) {
//       setCurrentPersona(activePersona);
//     }
//   }, [sessionId, sessions, activePersona]);

//   // ✅ FIXED SPEAKER
//   const handleManualSpeak = () => {
//     const lastMsg = messages[messages.length - 1];
//     if (lastMsg && lastMsg.role === 'assistant') {
//       if (speak) speak(lastMsg.content);
//       else {
//         const u = new SpeechSynthesisUtterance(lastMsg.content);
//         window.speechSynthesis.speak(u);
//       }
//     }
//   };

//   const loadSessions = async () => {
//     const token = api.auth.getToken();
//     if (!token) return;
//     const res = await api.chat.getAllSessions(token);
//     if (res.data || res.sessions) setSessions(res.data || res.sessions || []);
//   };

//   const loadChatHistory = async () => {
//     const token = api.auth.getToken();
//     if (!token || !sessionId) return;
//     const res = await api.chat.getMessages(sessionId, token);
//     if (res.data) setMessages(res.data);
//   };

//   const handleSend = async (e?: React.FormEvent) => {
//     e?.preventDefault();
//     if ((!input.trim() && !selectedImage) || isLoading) return;
//     const token = api.auth.getToken();
    
//     setMessages(prev => [...prev, {
//       id: Date.now().toString(), role: 'user', content: input + (selectedImage ? ' [Image]' : ''), created_at: new Date().toISOString()
//     }]);

//     const msgToSend = input;
//     const imgToSend = selectedImage;
//     setInput(''); setSelectedImage(null); setIsLoading(true);

//     try {
//       let sid = sessionId;
//       if (!sid) {
//          // Use the current persona ID (or default to jarvis)
//          const pid = currentPersona?.id || 'jarvis';
//          const res = await api.chat.createSession(pid, token!);
//          if (res.session) { sid = res.session.id; navigate(`/chat/${sid}`); }
//       }
//       const res = await api.chat.sendMessage(sid!, msgToSend, token!, imgToSend || undefined);
//       if (res.message) setMessages(prev => [...prev, res.message]);
//     } catch (err) { console.error(err); } 
//     finally { setIsLoading(false); }
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       const reader = new FileReader();
//       reader.onload = () => setSelectedImage(reader.result as string);
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   return (
//     // 🟢 FULL SCREEN FORCE
//     <div className="fixed inset-0 w-screen h-[100dvh] flex bg-[#0a0a0a] text-white overflow-hidden font-sans z-50">
      
//       {/* 🟢 TAILWIND SAFELIST HACK 
//           This invisible div forces Tailwind to compile these classes so they show up. */}
//       <div className="hidden bg-blue-600 bg-blue-50 text-blue-900 border-blue-600 
//                       bg-pink-500 bg-pink-50 text-pink-900 border-pink-500
//                       bg-emerald-600 bg-emerald-50 text-emerald-900 border-emerald-600">
//       </div>

//       {/* SIDEBAR */}
//       <div className={`h-full z-50 w-64 bg-black/90 backdrop-blur-xl border-r border-white/10 p-4 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:bg-black/40 flex flex-col`}>
//         <div className={`mb-8 flex items-center gap-2 text-xl font-bold tracking-wider ${theme.text}`}>
//           <Bot className="h-6 w-6" /> <span>{currentPersona?.name?.toUpperCase() || 'A.I.D.E.N'}</span>
//           <button onClick={() => setIsSidebarOpen(false)} className="md:hidden ml-auto"><X size={20} /></button>
//         </div>
//         <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
//           {sessions.map(s => (
//             <button key={s.id} onClick={() => navigate(`/chat/${s.id}`)} className={`w-full text-left p-3 rounded-lg text-sm border ${s.id === sessionId ? `${theme.secondary} ${theme.border} text-black font-medium` : 'border-transparent text-gray-400 hover:bg-white/5'}`}>
//               <div className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> <span className="truncate">{s.persona_id}</span></div>
//             </button>
//           ))}
//         </div>
//         <button onClick={() => navigate('/dashboard')} className="mt-4 flex items-center gap-2 text-gray-400 hover:text-white pt-4 border-t border-white/10 w-full"><ArrowLeft className="h-4 w-4" /> Dashboard</button>
//       </div>

//       {/* MAIN CHAT */}
//       <div className="flex-1 flex flex-col h-full bg-white text-gray-800 relative min-w-0">
//         <header className="h-20 shrink-0 border-b border-gray-100 flex items-center justify-between px-6 bg-white z-10">
//           <div className="flex items-center gap-3">
//             <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2"><Menu size={24} /></button>
//             <div className={`w-2 h-2 rounded-full animate-pulse ${theme.primary.replace('bg-', 'bg-')}`} />
//             <div>
//               <h1 className="font-bold text-lg text-gray-900">{currentPersona?.name || 'A.I.D.E.N'}</h1>
//               <p className={`text-xs font-semibold ${theme.text}`}>{currentPersona?.role || 'SYSTEM ONLINE'}</p>
//             </div>
//           </div>
//           <button onClick={handleManualSpeak} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"><Volume2 className="w-5 h-5" /></button>
//         </header>

//         <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-gray-50/50 w-full">
//           {messages.length === 0 && <div className="h-full flex flex-col items-center justify-center opacity-40"><Bot size={48} className={`mb-4 ${theme.text}`} /><p>Initialize: {currentPersona?.name}...</p></div>}
//           {messages.map(msg => (
//             <div key={msg.id} className={`flex gap-4 ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
//               {msg.role === 'assistant' && <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${theme.secondary} ${theme.border}`}><Bot className={`w-5 h-5 ${theme.text}`} /></div>}
//               <div className={`max-w-[85%] px-6 py-4 rounded-2xl text-sm shadow-sm ${msg.role === 'assistant' ? 'bg-white border text-gray-700' : `${theme.primary} text-white`}`}>
//                 <ReactMarkdown>{msg.content}</ReactMarkdown>
//               </div>
//             </div>
//           ))}
//           <div ref={bottomRef} className="h-1" />
//         </div>

//         <div className="p-4 shrink-0 bg-white border-t border-gray-100 w-full">
//           <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-center gap-4">
//             {selectedImage && <div className="absolute bottom-full left-0 mb-2 p-2 bg-white border rounded shadow"><img src={selectedImage} className="h-20" /><button onClick={()=>setSelectedImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6">×</button></div>}
//             <div className="flex-1 relative group shadow-sm rounded-full bg-white border border-gray-200">
//                <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 p-2"><Paperclip className="w-5 h-5" /></button>
//                <input ref={fileInputRef} type="file" onChange={handleFileSelect} className="hidden" />
//                <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder={`Message ${currentPersona?.name}...`} disabled={isLoading} className="w-full bg-transparent border-none rounded-full pl-12 pr-12 py-4 focus:ring-0 outline-none" />
//                <button type="button" onClick={isListening ? stopListening : startListening} className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 ${isListening ? 'text-red-500' : 'text-gray-400'}`}><Mic className="w-5 h-5" /></button>
//             </div>
//             <button type="submit" disabled={isLoading} className={`p-4 rounded-full text-white ${theme.primary}`}>{isLoading ? <Loader2 className="animate-spin" /> : <Send />}</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect, useRef, useMemo } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Send, Mic, ArrowLeft, Bot, Loader2, MessageSquare, Volume2, Paperclip, Menu, X
// } from 'lucide-react';
// import { api } from '../lib/api';
// import ReactMarkdown from 'react-markdown';
// import { useTextToSpeech } from '../hooks/useTextToSpeech';
// import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
// import { Persona } from '../types';

// // 🎨 1. THEME DEFINITIONS (The "Total Color Experience")
// const THEMES: Record<string, any> = {
//   jarvis: { 
//     name: 'Jarvis', role: 'Technical Architect', 
//     colors: {
//       sidebar: 'bg-slate-950',        // Deep Blue-Black
//       sidebarText: 'text-slate-400',
//       sidebarHover: 'hover:bg-slate-800',
//       header: 'bg-slate-50',          // Cool White
//       primary: 'bg-blue-600',         // Bright Blue Buttons
//       userBubble: 'bg-blue-600',
//       text: 'text-blue-700',
//       border: 'border-blue-200'
//     }
//   },
//   friday: { 
//     name: 'Friday', role: 'Creative Companion', 
//     colors: {
//       sidebar: 'bg-rose-950',         // Deep Rose/Black
//       sidebarText: 'text-rose-300',
//       sidebarHover: 'hover:bg-rose-900',
//       header: 'bg-pink-50',           // Soft Pink
//       primary: 'bg-pink-500',         // Hot Pink Buttons
//       userBubble: 'bg-pink-500',
//       text: 'text-pink-700',
//       border: 'border-pink-200'
//     }
//   },
//   titan: { 
//     name: 'Titan', role: 'Fitness Coach', 
//     colors: {
//       sidebar: 'bg-emerald-950',      // Deep Green/Black
//       sidebarText: 'text-emerald-400',
//       sidebarHover: 'hover:bg-emerald-900',
//       header: 'bg-emerald-50',        // Mint White
//       primary: 'bg-emerald-600',      // Bright Green Buttons
//       userBubble: 'bg-emerald-600',
//       text: 'text-emerald-700',
//       border: 'border-emerald-200'
//     }
//   }
// };

// interface ChatProps { activePersona: Persona | null; }
// interface Message { id: string; role: 'user' | 'assistant'; content: string; created_at: string; }
// interface Session { id: string; created_at: string; persona_id: string; }

// export default function Chat({ activePersona }: ChatProps) {
//   const { sessionId } = useParams<{ sessionId: string }>();
//   const navigate = useNavigate();
//   const bottomRef = useRef<HTMLDivElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // State to track persona even on refresh
//   const [currentPersonaId, setCurrentPersonaId] = useState<string>('jarvis');

//   // 🛡️ COMPUTE THEME
//   const theme = useMemo(() => {
//     // If activePersona is passed (from Dashboard), use it. 
//     // Otherwise use local state (from URL/History).
//     const id = activePersona?.id?.toLowerCase() || currentPersonaId;
//     return THEMES[id]?.colors || THEMES['jarvis'].colors;
//   }, [activePersona, currentPersonaId]);

//   // 🔊 HOOKS
//   const { speak } = useTextToSpeech();
//   const { isListening, transcript, startListening, stopListening, setTranscript } = useSpeechRecognition();
  
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [sessions, setSessions] = useState<Session[]>([]);
//   const [input, setInput] = useState('');
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // Loaders
//   useEffect(() => { loadSessions(); loadChatHistory(); }, [sessionId]);
//   useEffect(() => { if(messages.length) bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
//   useEffect(() => { if (transcript) { setInput(prev => (prev ? prev + ' ' : '') + transcript); setTranscript(''); } }, [transcript]);

//   // 🔄 REFRESH HANDLER: Detect Persona from Session ID
//   useEffect(() => {
//     if (sessionId && sessions.length > 0) {
//       const s = sessions.find(session => session.id === sessionId);
//       if (s?.persona_id) setCurrentPersonaId(s.persona_id.toLowerCase());
//     }
//   }, [sessionId, sessions]);

//   // API Calls
//   const loadSessions = async () => {
//     const token = api.auth.getToken();
//     if (!token) return;
//     const res = await api.chat.getAllSessions(token);
//     if (res.data || res.sessions) setSessions(res.data || res.sessions || []);
//   };

//   const loadChatHistory = async () => {
//     const token = api.auth.getToken();
//     if (!token || !sessionId) return;
//     const res = await api.chat.getMessages(sessionId, token);
//     if (res.data) setMessages(res.data);
//   };

//   // Speaker
//   const handleManualSpeak = () => {
//     const lastMsg = messages[messages.length - 1];
//     if (lastMsg?.role === 'assistant') {
//       speak ? speak(lastMsg.content) : window.speechSynthesis.speak(new SpeechSynthesisUtterance(lastMsg.content));
//     }
//   };

//   const handleSend = async (e?: React.FormEvent) => {
//     e?.preventDefault();
//     if ((!input.trim() && !selectedImage) || isLoading) return;
//     const token = api.auth.getToken();
    
//     setMessages(prev => [...prev, {
//       id: Date.now().toString(), role: 'user', content: input + (selectedImage ? ' [Image]' : ''), created_at: new Date().toISOString()
//     }]);

//     const msgToSend = input;
//     const imgToSend = selectedImage;
//     setInput(''); setSelectedImage(null); setIsLoading(true);

//     try {
//       let sid = sessionId;
//       if (!sid) {
//          const res = await api.chat.createSession(currentPersonaId, token!);
//          if (res.session) { sid = res.session.id; navigate(`/chat/${sid}`); }
//       }
//       const res = await api.chat.sendMessage(sid!, msgToSend, token!, imgToSend || undefined);
//       if (res.message) setMessages(prev => [...prev, res.message]);
//     } catch (err) { console.error(err); } 
//     finally { setIsLoading(false); }
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       const reader = new FileReader();
//       reader.onload = () => setSelectedImage(reader.result as string);
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   return (
//     <div className="fixed inset-0 w-screen h-[100dvh] flex overflow-hidden font-sans z-50 bg-white">
      
//       {/* 🟢 SAFELIST: Force Tailwind to compile these colors */}
//       <div className="hidden 
//         bg-slate-950 bg-rose-950 bg-emerald-950
//         bg-slate-50 bg-pink-50 bg-emerald-50
//         text-slate-400 text-rose-300 text-emerald-400
//         hover:bg-slate-800 hover:bg-rose-900 hover:bg-emerald-900
//         text-blue-700 text-pink-700 text-emerald-700
//         border-blue-200 border-pink-200 border-emerald-200
//         bg-blue-600 bg-pink-500 bg-emerald-600
//       "/>

//       {/* 🎨 DYNAMIC SIDEBAR */}
//       <div className={`
//         ${theme.sidebar} 
//         h-full z-50 w-72 backdrop-blur-xl border-r border-white/5 p-4 
//         transition-transform duration-300 flex flex-col shadow-2xl
//         ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0
//       `}>
//         {/* Sidebar Header */}
//         <div className="mb-8 flex items-center gap-3 px-2">
//           <div className={`p-2 rounded-lg bg-white/10 text-white`}>
//             <Bot size={24} />
//           </div>
//           <div>
//              <h1 className="text-white font-bold tracking-wide text-lg">
//                {(THEMES[currentPersonaId]?.name || 'AIDEN').toUpperCase()}
//              </h1>
//              <p className={`text-xs ${theme.sidebarText} opacity-80 uppercase tracking-widest`}>Secure</p>
//           </div>
//           <button onClick={() => setIsSidebarOpen(false)} className="md:hidden ml-auto text-white"><X size={20} /></button>
//         </div>

//         {/* History List */}
//         <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
//           <p className={`px-2 text-xs font-bold uppercase tracking-wider mb-2 opacity-50 ${theme.sidebarText}`}>Recent Links</p>
//           {sessions.map(s => (
//             <button 
//               key={s.id} 
//               onClick={() => navigate(`/chat/${s.id}`)} 
//               className={`
//                 w-full text-left p-3 rounded-xl text-sm transition-all duration-200 flex items-center gap-3
//                 ${s.id === sessionId 
//                   ? 'bg-white/10 text-white shadow-lg border border-white/10' 
//                   : `${theme.sidebarText} ${theme.sidebarHover} hover:text-white`
//                 }
//               `}
//             >
//               <MessageSquare size={16} className="opacity-70" /> 
//               <span className="truncate font-medium">{s.persona_id.charAt(0).toUpperCase() + s.persona_id.slice(1)} Session</span>
//             </button>
//           ))}
//         </div>

//         {/* Back Button */}
//         <button onClick={() => navigate('/dashboard')} className={`mt-4 flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-white/5 ${theme.sidebarText} hover:text-white`}>
//           <ArrowLeft size={18} /> <span className="font-medium">Dashboard</span>
//         </button>
//       </div>

//       {/* 🎨 MAIN CHAT */}
//       <div className="flex-1 flex flex-col h-full relative min-w-0 bg-white">
        
//         {/* 🎨 DYNAMIC HEADER */}
//         <header className={`h-20 shrink-0 border-b flex items-center justify-between px-8 z-10 ${theme.header} ${theme.border}`}>
//           <div className="flex items-center gap-4">
//             <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 text-gray-500"><Menu size={24} /></button>
//             <div className={`w-2.5 h-2.5 rounded-full animate-pulse shadow-sm ${theme.primary}`} />
//             <div>
//               <h1 className={`font-bold text-xl ${theme.text}`}>
//                 {THEMES[currentPersonaId]?.name || 'AIDEN'}
//               </h1>
//               <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                 {THEMES[currentPersonaId]?.role || 'System Online'}
//               </span>
//             </div>
//           </div>
//           <button onClick={handleManualSpeak} className={`p-2.5 rounded-full transition-colors hover:bg-white shadow-sm ${theme.header} hover:shadow-md text-gray-600`}>
//             <Volume2 size={20} />
//           </button>
//         </header>

//         {/* Messages */}
//         <div className="flex-1 w-full overflow-y-auto p-4 md:p-8 space-y-8 bg-white/50">
//           {messages.length === 0 && (
//             <div className="h-full flex flex-col items-center justify-center opacity-30">
//               <Bot size={64} className={`mb-4 ${theme.text}`} />
//               <p className="text-lg font-medium text-gray-400">Initialize protocol: {THEMES[currentPersonaId]?.name}...</p>
//             </div>
//           )}
//           {messages.map(msg => (
//             <div key={msg.id} className={`flex gap-4 ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
//               {msg.role === 'assistant' && (
//                 <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${theme.header} border ${theme.border}`}>
//                   <Bot size={20} className={theme.text} />
//                 </div>
//               )}
//               <div className={`
//                 max-w-[85%] px-6 py-4 rounded-2xl text-sm leading-relaxed shadow-sm
//                 ${msg.role === 'assistant' 
//                   ? 'bg-gray-50 border border-gray-100 text-gray-700 rounded-tl-none' 
//                   : `${theme.userBubble} text-white rounded-tr-none shadow-md`
//                 }
//               `}>
//                 <ReactMarkdown>{msg.content}</ReactMarkdown>
//               </div>
//             </div>
//           ))}
//           <div ref={bottomRef} className="h-1" />
//         </div>

//         {/* Input */}
//         <div className="p-6 shrink-0 bg-white border-t border-gray-100 w-full">
//           <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-center gap-3">
//             {selectedImage && <div className="absolute bottom-full left-0 mb-4 p-2 bg-white border rounded-xl shadow-lg animate-in slide-in-from-bottom-2"><img src={selectedImage} className="h-24 rounded-lg" /><button onClick={()=>setSelectedImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 shadow-md">×</button></div>}
            
//             <div className={`flex-1 relative group shadow-sm rounded-full bg-gray-50 border transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-offset-2 ${theme.border.replace('border-', 'focus-within:ring-')}`}>
//                <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"><Paperclip size={20} /></button>
//                <input ref={fileInputRef} type="file" onChange={handleFileSelect} className="hidden" />
//                <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder={`Message ${THEMES[currentPersonaId]?.name}...`} disabled={isLoading} className="w-full bg-transparent border-none rounded-full pl-12 pr-12 py-4 focus:ring-0 outline-none placeholder:text-gray-400" />
//                <button type="button" onClick={isListening ? stopListening : startListening} className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-gray-600'}`}><Mic size={20} /></button>
//             </div>
            
//             <button type="submit" disabled={isLoading} className={`p-4 rounded-full text-white shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 ${theme.primary}`}>
//               {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect, useRef, useMemo } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import {
//   Send, Mic, ArrowLeft, Bot, Loader2, MessageSquare, Volume2, Paperclip, Menu, X, Share2
// } from 'lucide-react';
// import { api } from '../lib/api';
// import ReactMarkdown from 'react-markdown';
// import { useTextToSpeech } from '../hooks/useTextToSpeech';
// import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
// import { Persona } from '../types';

// // 🎨 Theme Definitions (unchanged)
// const THEMES: Record<string, any> = {
//   jarvis: { 
//     name: 'Jarvis', role: 'Technical Architect', 
//     colors: {
//       sidebar: 'bg-slate-950', sidebarText: 'text-slate-400', sidebarHover: 'hover:bg-slate-800',
//       header: 'bg-slate-50', primary: 'bg-blue-600', userBubble: 'bg-blue-600',
//       text: 'text-blue-700', border: 'border-blue-200', highlight: 'bg-blue-50/10 text-blue-200'
//     }
//   },
//   friday: { 
//     name: 'Friday', role: 'Creative Companion', 
//     colors: {
//       sidebar: 'bg-rose-950', sidebarText: 'text-rose-300', sidebarHover: 'hover:bg-rose-900',
//       header: 'bg-pink-50', primary: 'bg-pink-500', userBubble: 'bg-pink-500',
//       text: 'text-pink-700', border: 'border-pink-200', highlight: 'bg-pink-50/10 text-pink-200'
//     }
//   },
//   titan: { 
//     name: 'Titan', role: 'Fitness Coach', 
//     colors: {
//       sidebar: 'bg-emerald-950', sidebarText: 'text-emerald-400', sidebarHover: 'hover:bg-emerald-900',
//       header: 'bg-emerald-50', primary: 'bg-emerald-600', userBubble: 'bg-emerald-600',
//       text: 'text-emerald-700', border: 'border-emerald-200', highlight: 'bg-emerald-50/10 text-emerald-200'
//     }
//   }
// };

// interface ChatProps { activePersona: Persona | null; }
// interface Message { id: string; role: 'user' | 'assistant'; content: string; created_at: string; }
// interface Session { id: string; created_at: string; persona_id: string; }

// export default function Chat({ activePersona }: ChatProps) {
//   const { sessionId } = useParams<{ sessionId: string }>();
//   const navigate = useNavigate();
//   const location = useLocation(); // Catch data passed from Dashboard
//   const bottomRef = useRef<HTMLDivElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
  
//   // Guard against double sending on refresh
//   const hasAutoSent = useRef(false);

//   const [currentPersonaId, setCurrentPersonaId] = useState<string>(activePersona?.id?.toLowerCase() || 'jarvis');

//   const theme = useMemo(() => {
//     const id = sessionId ? currentPersonaId : (activePersona?.id?.toLowerCase() || currentPersonaId);
//     return THEMES[id]?.colors || THEMES['jarvis'].colors;
//   }, [activePersona, currentPersonaId, sessionId]);

//   const { speak } = useTextToSpeech();
//   const { isListening, transcript, startListening, stopListening, setTranscript } = useSpeechRecognition();
  
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [sessions, setSessions] = useState<Session[]>([]);
//   const [input, setInput] = useState('');
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   useEffect(() => { loadSessions(); loadChatHistory(); }, [sessionId]);
//   useEffect(() => { if(messages.length) bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
//   useEffect(() => { if (transcript) { setInput(prev => (prev ? prev + ' ' : '') + transcript); setTranscript(''); } }, [transcript]);

//   // Sync Persona ID from Session
//   useEffect(() => {
//     if (sessionId && sessions.length > 0) {
//       const s = sessions.find(session => session.id === sessionId);
//       if (s?.persona_id) setCurrentPersonaId(s.persona_id.toLowerCase());
//     }
//   }, [sessionId, sessions]);

//   // 🚀 AUTO-SEND LOGIC (From Dashboard)
//   useEffect(() => {
//     const autoText = (location.state as any)?.autoSend;
//     if (autoText && !hasAutoSent.current && sessionId) {
//       hasAutoSent.current = true;
//       console.log("🚀 Auto-sending message:", autoText);
//       handleSend(undefined, autoText);
//       // Clear state so refresh doesn't trigger it again
//       window.history.replaceState({}, document.title);
//     }
//   }, [location.state, sessionId]);

//   const loadSessions = async () => {
//     const token = api.auth.getToken();
//     if (!token) return;
//     const res = await api.chat.getAllSessions(token);
//     if (res.data || res.sessions) setSessions(res.data || res.sessions || []);
//   };

//   const loadChatHistory = async () => {
//     const token = api.auth.getToken();
//     if (!token || !sessionId) return;
//     const res = await api.chat.getMessages(sessionId, token);
//     if (res.data) setMessages(res.data);
//   };

//   const handleManualSpeak = () => {
//     const lastMsg = messages[messages.length - 1];
//     if (lastMsg?.role === 'assistant') speak ? speak(lastMsg.content) : window.speechSynthesis.speak(new SpeechSynthesisUtterance(lastMsg.content));
//   };

//   // ✅ Updated HandleSend (Accepts override text)
//   const handleSend = async (e?: React.FormEvent, textOverride?: string) => {
//     e?.preventDefault();
//     const textToUse = textOverride || input;
    
//     if ((!textToUse.trim() && !selectedImage) || isLoading) return;
//     const token = api.auth.getToken();
    
//     // Optimistic Update
//     setMessages(prev => [...prev, {
//       id: Date.now().toString(), role: 'user', content: textToUse + (selectedImage ? ' [Image]' : ''), created_at: new Date().toISOString()
//     }]);

//     const msgToSend = textToUse;
//     const imgToSend = selectedImage;
    
//     if (!textOverride) setInput('');
//     setSelectedImage(null); 
//     setIsLoading(true);

//     try {
//       let sid = sessionId;
//       // If no session ID (rare edge case in this flow), create one
//       if (!sid) {
//          const res = await api.chat.createSession(currentPersonaId, token!);
//          if (res.session) { sid = res.session.id; navigate(`/chat/${sid}`); }
//       }
//       const res = await api.chat.sendMessage(sid!, msgToSend, token!, imgToSend || undefined);
//       if (res.message) setMessages(prev => [...prev, res.message]);
//     } catch (err) { console.error(err); } 
//     finally { setIsLoading(false); }
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       const reader = new FileReader();
//       reader.onload = () => setSelectedImage(reader.result as string);
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   // 🧠 SMART SWITCH: Check if AI suggested another persona
//   const getSuggestedPersona = (text: string) => {
//     const lower = text.toLowerCase();
//     if (lower.includes('ask jarvis') || lower.includes('try jarvis')) return 'jarvis';
//     if (lower.includes('ask friday') || lower.includes('try friday')) return 'friday';
//     if (lower.includes('ask titan') || lower.includes('try titan')) return 'titan';
//     return null;
//   };

//   const handleSmartSwitch = async (targetPersona: string) => {
//     // Find the last user message to "carry over"
//     const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
//     if (!lastUserMsg) return;

//     const token = api.auth.getToken();
//     try {
//       // Create new session for target
//       const res = await api.chat.createSession(targetPersona, token!);
//       if (res.session) {
//         // Navigate there and auto-send the LAST user message
//         navigate(`/chat/${res.session.id}`, { state: { autoSend: lastUserMsg.content } });
//       }
//     } catch (err) { console.error("Switch failed", err); }
//   };

//   const uiPersona = THEMES[sessionId ? currentPersonaId : (activePersona?.id?.toLowerCase() || currentPersonaId)];

//   return (
//     <div className="fixed inset-0 w-screen h-[100dvh] flex overflow-hidden font-sans z-50 bg-white">
//       {/* Themes Safelist */}
//       <div className="hidden bg-slate-950 bg-rose-950 bg-emerald-950 bg-slate-50 bg-pink-50 bg-emerald-50 text-slate-400 text-rose-300 text-emerald-400 hover:bg-slate-800 hover:bg-rose-900 hover:bg-emerald-900 text-blue-700 text-pink-700 text-emerald-700 border-blue-200 border-pink-200 border-emerald-200 bg-blue-600 bg-pink-500 bg-emerald-600 bg-blue-50/10 text-blue-200 bg-pink-50/10 text-pink-200 bg-emerald-50/10 text-emerald-200"/>

//       <div className={`${theme.sidebar} h-full z-50 w-72 backdrop-blur-xl border-r border-white/5 p-4 transition-transform duration-300 flex flex-col shadow-2xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
//         <div className="mb-8 flex items-center gap-3 px-2">
//           <div className={`p-2 rounded-lg bg-white/10 text-white`}><Bot size={24} /></div>
//           <div>
//              <h1 className="text-white font-bold tracking-wide text-lg">{(uiPersona?.name || 'AIDEN').toUpperCase()}</h1>
//              <p className={`text-xs ${theme.sidebarText} opacity-80 uppercase tracking-widest`}>Secure</p>
//           </div>
//           <button onClick={() => setIsSidebarOpen(false)} className="md:hidden ml-auto text-white"><X size={20} /></button>
//         </div>
//         <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
//           <p className={`px-2 text-xs font-bold uppercase tracking-wider mb-2 opacity-50 ${theme.sidebarText}`}>Recent Links</p>
//           {sessions.map(s => (
//             <button key={s.id} onClick={() => navigate(`/chat/${s.id}`)} className={`w-full text-left p-3 rounded-xl text-sm transition-all duration-200 flex items-center gap-3 ${s.id === sessionId ? `${theme.highlight} shadow-lg border border-white/10 font-medium` : `${theme.sidebarText} ${theme.sidebarHover} hover:text-white`}`}>
//               <MessageSquare size={16} className="opacity-70" /> <span className="truncate">{s.persona_id.charAt(0).toUpperCase() + s.persona_id.slice(1)} Session</span>
//             </button>
//           ))}
//         </div>
//         <button onClick={() => navigate('/dashboard')} className={`mt-4 flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-white/5 ${theme.sidebarText} hover:text-white`}><ArrowLeft size={18} /> <span className="font-medium">Dashboard</span></button>
//       </div>

//       <div className="flex-1 flex flex-col h-full relative min-w-0 bg-white">
//         <header className={`h-20 shrink-0 border-b flex items-center justify-between px-8 z-10 ${theme.header} ${theme.border}`}>
//           <div className="flex items-center gap-4">
//             <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 text-gray-500"><Menu size={24} /></button>
//             <div className={`w-2.5 h-2.5 rounded-full animate-pulse shadow-sm ${theme.primary}`} />
//             <div>
//               <h1 className={`font-bold text-xl ${theme.text}`}>{uiPersona?.name || 'AIDEN'}</h1>
//               <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{uiPersona?.role || 'System Online'}</span>
//             </div>
//           </div>
//           <button onClick={handleManualSpeak} className={`p-2.5 rounded-full transition-colors hover:bg-white shadow-sm ${theme.header} hover:shadow-md text-gray-600`}><Volume2 size={20} /></button>
//         </header>

//         <div className="flex-1 w-full overflow-y-auto p-4 md:p-8 space-y-8 bg-white/50">
//           {messages.length === 0 && <div className="h-full flex flex-col items-center justify-center opacity-30"><Bot size={64} className={`mb-4 ${theme.text}`} /><p className="text-lg font-medium text-gray-400">Initialize protocol: {uiPersona?.name}...</p></div>}
          
//           {messages.map((msg, idx) => {
//             const suggestion = msg.role === 'assistant' ? getSuggestedPersona(msg.content) : null;
//             return (
//               <div key={msg.id} className="flex flex-col gap-2">
//                 <div className={`flex gap-4 ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
//                   {msg.role === 'assistant' && <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${theme.header} border ${theme.border}`}><Bot size={20} className={theme.text} /></div>}
//                   <div className={`max-w-[85%] px-6 py-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'assistant' ? 'bg-gray-50 border border-gray-100 text-gray-700 rounded-tl-none' : `${theme.userBubble} text-white rounded-tr-none shadow-md`}`}>
//                     <ReactMarkdown>{msg.content}</ReactMarkdown>
//                   </div>
//                 </div>
                
//                 {/* 🧠 SMART SUGGESTION BUTTON */}
//                 {suggestion && suggestion !== currentPersonaId && (
//                   <div className="flex justify-start ml-16 animate-in fade-in slide-in-from-top-2">
//                     <button 
//                       onClick={() => handleSmartSwitch(suggestion)}
//                       className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full text-xs font-bold shadow-lg hover:scale-105 transition-transform"
//                     >
//                       <Share2 size={14} /> 
//                       Switch to {suggestion.charAt(0).toUpperCase() + suggestion.slice(1)}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//           <div ref={bottomRef} className="h-1" />
//         </div>

//         <div className="p-6 shrink-0 bg-white border-t border-gray-100 w-full">
//           <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-center gap-3">
//             {selectedImage && <div className="absolute bottom-full left-0 mb-4 p-2 bg-white border rounded-xl shadow-lg animate-in slide-in-from-bottom-2"><img src={selectedImage} className="h-24 rounded-lg" /><button onClick={()=>setSelectedImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 shadow-md">×</button></div>}
//             <div className={`flex-1 relative group shadow-sm rounded-full bg-gray-50 border transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-offset-2 ${theme.border.replace('border-', 'focus-within:ring-')}`}>
//                <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"><Paperclip size={20} /></button>
//                <input ref={fileInputRef} type="file" onChange={handleFileSelect} className="hidden" />
//                <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder={`Message ${uiPersona?.name}...`} disabled={isLoading} className="w-full bg-transparent border-none rounded-full pl-12 pr-12 py-4 focus:ring-0 outline-none placeholder:text-gray-400" />
//                <button type="button" onClick={isListening ? stopListening : startListening} className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-gray-600'}`}><Mic size={20} /></button>
//             </div>
//             <button type="submit" disabled={isLoading} className={`p-4 rounded-full text-white shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 ${theme.primary}`}>
//               {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useState, useEffect, useRef, useMemo } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import {
//   Send, Mic, ArrowLeft, Bot, Loader2, MessageSquare, Volume2, Paperclip, Menu, X, Share2
// } from 'lucide-react';
// import { api } from '../lib/api';
// import ReactMarkdown from 'react-markdown';
// import { useTextToSpeech } from '../hooks/useTextToSpeech';
// import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
// import { Persona } from '../types';

// // 🎨 Theme Definitions
// const THEMES: Record<string, any> = {
//   jarvis: { 
//     name: 'Jarvis', role: 'Technical Architect', 
//     colors: {
//       sidebar: 'bg-slate-950', sidebarText: 'text-slate-400', sidebarHover: 'hover:bg-slate-800',
//       header: 'bg-slate-50', primary: 'bg-blue-600', userBubble: 'bg-blue-600',
//       text: 'text-blue-700', border: 'border-blue-200', highlight: 'bg-blue-50/10 text-blue-200'
//     }
//   },
//   friday: { 
//     name: 'Friday', role: 'Creative Companion', 
//     colors: {
//       sidebar: 'bg-rose-950', sidebarText: 'text-rose-300', sidebarHover: 'hover:bg-rose-900',
//       header: 'bg-pink-50', primary: 'bg-pink-500', userBubble: 'bg-pink-500',
//       text: 'text-pink-700', border: 'border-pink-200', highlight: 'bg-pink-50/10 text-pink-200'
//     }
//   },
//   titan: { 
//     name: 'Titan', role: 'Fitness Coach', 
//     colors: {
//       sidebar: 'bg-emerald-950', sidebarText: 'text-emerald-400', sidebarHover: 'hover:bg-emerald-900',
//       header: 'bg-emerald-50', primary: 'bg-emerald-600', userBubble: 'bg-emerald-600',
//       text: 'text-emerald-700', border: 'border-emerald-200', highlight: 'bg-emerald-50/10 text-emerald-200'
//     }
//   }
// };

// interface ChatProps { activePersona: Persona | null; }
// interface Message { id: string; role: 'user' | 'assistant'; content: string; created_at: string; }
// interface Session { id: string; created_at: string; persona_id: string; }

// export default function Chat({ activePersona }: ChatProps) {
//   const { sessionId } = useParams<{ sessionId: string }>();
//   const navigate = useNavigate();
//   const location = useLocation(); 
//   const bottomRef = useRef<HTMLDivElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
  
//   // Guard against double sending
//   const hasAutoSent = useRef(false);

//   const [currentPersonaId, setCurrentPersonaId] = useState<string>(activePersona?.id?.toLowerCase() || 'jarvis');

//   const theme = useMemo(() => {
//     const id = sessionId ? currentPersonaId : (activePersona?.id?.toLowerCase() || currentPersonaId);
//     return THEMES[id]?.colors || THEMES['jarvis'].colors;
//   }, [activePersona, currentPersonaId, sessionId]);

//   const { speak } = useTextToSpeech();
//   const { isListening, transcript, startListening, stopListening, setTranscript } = useSpeechRecognition();
  
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [sessions, setSessions] = useState<Session[]>([]);
//   const [input, setInput] = useState('');
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   useEffect(() => { loadSessions(); loadChatHistory(); }, [sessionId]);
//   useEffect(() => { if(messages.length) bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
//   useEffect(() => { if (transcript) { setInput(prev => (prev ? prev + ' ' : '') + transcript); setTranscript(''); } }, [transcript]);

//   // Sync Persona ID
//   useEffect(() => {
//     if (sessionId && sessions.length > 0) {
//       const s = sessions.find(session => session.id === sessionId);
//       if (s?.persona_id) setCurrentPersonaId(s.persona_id.toLowerCase());
//     }
//   }, [sessionId, sessions]);

//   // 🚀 FIXED: Reliable Auto-Send Logic
//   useEffect(() => {
//     const state = location.state as { autoSend?: string } | null;
//     const autoText = state?.autoSend;
    
//     // Logic: If we have text, a session, and haven't sent yet
//     if (autoText && sessionId && !hasAutoSent.current) {
//       hasAutoSent.current = true;
//       console.log("🚀 Auto-sending message:", autoText);
      
//       // We use a slight delay to ensure the component is mounted and 'sessionId' is stable
//       const timer = setTimeout(() => {
//         handleSend(undefined, autoText);
        
//         // Clear the state from history so a refresh doesn't trigger it again
//         window.history.replaceState({}, document.title);
//       }, 600); 

//       return () => clearTimeout(timer);
//     }
//   }, [location.state, sessionId]); 

//   const loadSessions = async () => {
//     const token = api.auth.getToken();
//     if (!token) return;
//     const res = await api.chat.getAllSessions(token);
//     if (res.data || res.sessions) setSessions(res.data || res.sessions || []);
//   };

//   const loadChatHistory = async () => {
//     const token = api.auth.getToken();
//     if (!token || !sessionId) return;
//     const res = await api.chat.getMessages(sessionId, token);
//     if (res.data) setMessages(res.data);
//   };

//   const handleManualSpeak = () => {
//     const lastMsg = messages[messages.length - 1];
//     if (lastMsg?.role === 'assistant') speak ? speak(lastMsg.content) : window.speechSynthesis.speak(new SpeechSynthesisUtterance(lastMsg.content));
//   };

//   const handleSend = async (e?: React.FormEvent, textOverride?: string) => {
//     e?.preventDefault();
//     const textToUse = textOverride || input;
    
//     if ((!textToUse.trim() && !selectedImage) || isLoading) return;
//     const token = api.auth.getToken();
    
//     // UI Optimistic Update
//     setMessages(prev => [...prev, {
//       id: Date.now().toString(), role: 'user', content: textToUse + (selectedImage ? ' [Image]' : ''), created_at: new Date().toISOString()
//     }]);

//     const msgToSend = textToUse;
//     const imgToSend = selectedImage;
    
//     if (!textOverride) setInput('');
//     setSelectedImage(null); 
//     setIsLoading(true);

//     try {
//       let sid = sessionId;
//       if (!sid) {
//          const res = await api.chat.createSession(currentPersonaId, token!);
//          if (res.session) { sid = res.session.id; navigate(`/chat/${sid}`); }
//       }
//       const res = await api.chat.sendMessage(sid!, msgToSend, token!, imgToSend || undefined);
//       if (res.message) setMessages(prev => [...prev, res.message]);
//     } catch (err) { console.error(err); } 
//     finally { setIsLoading(false); }
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       const reader = new FileReader();
//       reader.onload = () => setSelectedImage(reader.result as string);
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   // 🧠 SMART SWITCH v2 (Much Smarter!)
//   const getSuggestedPersona = (aiText: string, userText: string) => {
//     const aiLower = aiText.toLowerCase();
//     const userLower = userText.toLowerCase();
    
//     // 1. Check if AI explicitly mentioned a name
//     // Example: "Perhaps Friday could help?" -> Detects "Friday"
//     if (currentPersonaId !== 'jarvis' && aiLower.includes('jarvis')) return 'jarvis';
//     if (currentPersonaId !== 'friday' && aiLower.includes('friday')) return 'friday';
//     if (currentPersonaId !== 'titan' && aiLower.includes('titan')) return 'titan';

//     // 2. Check Context Clues (If AI failed but didn't name drop)
//     // If user asked about code but is in Titan
//     if (currentPersonaId !== 'jarvis' && (userLower.includes('code') || userLower.includes('python') || userLower.includes('debug') || userLower.includes('script'))) return 'jarvis';
    
//     // If user asked about fitness but is in Jarvis
//     if (currentPersonaId !== 'titan' && (userLower.includes('workout') || userLower.includes('diet') || userLower.includes('muscle') || userLower.includes('protein'))) return 'titan';
    
//     // If user asked about creative stuff but is in Jarvis/Titan
//     if (currentPersonaId !== 'friday' && (userLower.includes('joke') || userLower.includes('story') || userLower.includes('poem'))) return 'friday';

//     return null;
//   };

//   const handleSmartSwitch = async (targetPersona: string) => {
//     // 1. Find the last user message to carry over
//     const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
//     if (!lastUserMsg) return;

//     const token = api.auth.getToken();
//     try {
//       // 2. Create new session
//       const res = await api.chat.createSession(targetPersona, token!);
//       if (res.session) {
//         // 3. Navigate & Trigger Auto-Send
//         navigate(`/chat/${res.session.id}`, { state: { autoSend: lastUserMsg.content } });
//       }
//     } catch (err) { console.error("Switch failed", err); }
//   };

//   const uiPersona = THEMES[sessionId ? currentPersonaId : (activePersona?.id?.toLowerCase() || currentPersonaId)];

//   return (
//     <div className="fixed inset-0 w-screen h-[100dvh] flex overflow-hidden font-sans z-50 bg-white">
//       {/* Themes Safelist */}
//       <div className="hidden bg-slate-950 bg-rose-950 bg-emerald-950 bg-slate-50 bg-pink-50 bg-emerald-50 text-slate-400 text-rose-300 text-emerald-400 hover:bg-slate-800 hover:bg-rose-900 hover:bg-emerald-900 text-blue-700 text-pink-700 text-emerald-700 border-blue-200 border-pink-200 border-emerald-200 bg-blue-600 bg-pink-500 bg-emerald-600 bg-blue-50/10 text-blue-200 bg-pink-50/10 text-pink-200 bg-emerald-50/10 text-emerald-200"/>

//       <div className={`${theme.sidebar} h-full z-50 w-72 backdrop-blur-xl border-r border-white/5 p-4 transition-transform duration-300 flex flex-col shadow-2xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
//         <div className="mb-8 flex items-center gap-3 px-2">
//           <div className={`p-2 rounded-lg bg-white/10 text-white`}><Bot size={24} /></div>
//           <div>
//              <h1 className="text-white font-bold tracking-wide text-lg">{(uiPersona?.name || 'AIDEN').toUpperCase()}</h1>
//              <p className={`text-xs ${theme.sidebarText} opacity-80 uppercase tracking-widest`}>Secure</p>
//           </div>
//           <button onClick={() => setIsSidebarOpen(false)} className="md:hidden ml-auto text-white"><X size={20} /></button>
//         </div>
//         <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
//           <p className={`px-2 text-xs font-bold uppercase tracking-wider mb-2 opacity-50 ${theme.sidebarText}`}>Recent Links</p>
//           {sessions.map(s => (
//             <button key={s.id} onClick={() => navigate(`/chat/${s.id}`)} className={`w-full text-left p-3 rounded-xl text-sm transition-all duration-200 flex items-center gap-3 ${s.id === sessionId ? `${theme.highlight} shadow-lg border border-white/10 font-medium` : `${theme.sidebarText} ${theme.sidebarHover} hover:text-white`}`}>
//               <MessageSquare size={16} className="opacity-70" /> <span className="truncate">{s.persona_id.charAt(0).toUpperCase() + s.persona_id.slice(1)} Session</span>
//             </button>
//           ))}
//         </div>
//         <button onClick={() => navigate('/dashboard')} className={`mt-4 flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-white/5 ${theme.sidebarText} hover:text-white`}><ArrowLeft size={18} /> <span className="font-medium">Dashboard</span></button>
//       </div>

//       <div className="flex-1 flex flex-col h-full relative min-w-0 bg-white">
//         <header className={`h-20 shrink-0 border-b flex items-center justify-between px-8 z-10 ${theme.header} ${theme.border}`}>
//           <div className="flex items-center gap-4">
//             <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 text-gray-500"><Menu size={24} /></button>
//             <div className={`w-2.5 h-2.5 rounded-full animate-pulse shadow-sm ${theme.primary}`} />
//             <div>
//               <h1 className={`font-bold text-xl ${theme.text}`}>{uiPersona?.name || 'AIDEN'}</h1>
//               <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{uiPersona?.role || 'System Online'}</span>
//             </div>
//           </div>
//           <button onClick={handleManualSpeak} className={`p-2.5 rounded-full transition-colors hover:bg-white shadow-sm ${theme.header} hover:shadow-md text-gray-600`}><Volume2 size={20} /></button>
//         </header>

//         <div className="flex-1 w-full overflow-y-auto p-4 md:p-8 space-y-8 bg-white/50">
//           {messages.length === 0 && <div className="h-full flex flex-col items-center justify-center opacity-30"><Bot size={64} className={`mb-4 ${theme.text}`} /><p className="text-lg font-medium text-gray-400">Initialize protocol: {uiPersona?.name}...</p></div>}
          
//           {messages.map((msg, idx) => {
//             // Check previous message (User's) + Current message (AI's)
//             const previousUserMsg = messages[idx - 1]?.role === 'user' ? messages[idx - 1].content : "";
//             const suggestion = msg.role === 'assistant' ? getSuggestedPersona(msg.content, previousUserMsg) : null;
            
//             return (
//               <div key={msg.id} className="flex flex-col gap-2">
//                 <div className={`flex gap-4 ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
//                   {msg.role === 'assistant' && <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${theme.header} border ${theme.border}`}><Bot size={20} className={theme.text} /></div>}
//                   <div className={`max-w-[85%] px-6 py-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'assistant' ? 'bg-gray-50 border border-gray-100 text-gray-700 rounded-tl-none' : `${theme.userBubble} text-white rounded-tr-none shadow-md`}`}>
//                     <ReactMarkdown>{msg.content}</ReactMarkdown>
//                   </div>
//                 </div>
                
//                 {/* 🧠 SMART SUGGESTION BUTTON */}
//                 {suggestion && suggestion !== currentPersonaId && (
//                   <div className="flex justify-start ml-16 animate-in fade-in slide-in-from-top-2">
//                     <button 
//                       onClick={() => handleSmartSwitch(suggestion)}
//                       className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full text-xs font-bold shadow-xl hover:bg-black hover:scale-105 transition-all cursor-pointer border border-gray-700"
//                     >
//                       <Share2 size={14} /> 
//                       Switch to {suggestion.charAt(0).toUpperCase() + suggestion.slice(1)} (Auto-Ask)
//                     </button>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//           <div ref={bottomRef} className="h-1" />
//         </div>

//         <div className="p-6 shrink-0 bg-white border-t border-gray-100 w-full">
//           <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-center gap-3">
//             {selectedImage && <div className="absolute bottom-full left-0 mb-4 p-2 bg-white border rounded-xl shadow-lg animate-in slide-in-from-bottom-2"><img src={selectedImage} className="h-24 rounded-lg" /><button onClick={()=>setSelectedImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 shadow-md">×</button></div>}
//             <div className={`flex-1 relative group shadow-sm rounded-full bg-gray-50 border transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-offset-2 ${theme.border.replace('border-', 'focus-within:ring-')}`}>
//                <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"><Paperclip size={20} /></button>
//                <input ref={fileInputRef} type="file" onChange={handleFileSelect} className="hidden" />
//                <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder={`Message ${uiPersona?.name}...`} disabled={isLoading} className="w-full bg-transparent border-none rounded-full pl-12 pr-12 py-4 focus:ring-0 outline-none placeholder:text-gray-400" />
//                <button type="button" onClick={isListening ? stopListening : startListening} className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-gray-600'}`}><Mic size={20} /></button>
//             </div>
//             <button type="submit" disabled={isLoading} className={`p-4 rounded-full text-white shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 ${theme.primary}`}>
//               {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect, useRef, useMemo } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import {
//   Send, Mic, ArrowLeft, Bot, Loader2, MessageSquare, Volume2, Paperclip, Menu, X, Share2, Trash2, StopCircle, Ban
// } from 'lucide-react';
// import { api } from '../lib/api';
// import ReactMarkdown from 'react-markdown';
// import { useTextToSpeech } from '../hooks/useTextToSpeech';
// import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
// import { Persona } from '../types';

// // 🎨 Theme Definitions
// const THEMES: Record<string, any> = {
//   jarvis: { 
//     name: 'Jarvis', role: 'Technical Architect', 
//     colors: {
//       sidebar: 'bg-slate-950', sidebarText: 'text-slate-400', sidebarHover: 'hover:bg-slate-800',
//       header: 'bg-slate-50', primary: 'bg-blue-600', userBubble: 'bg-blue-600',
//       text: 'text-blue-700', border: 'border-blue-200', highlight: 'bg-blue-50/10 text-blue-200'
//     }
//   },
//   friday: { 
//     name: 'Friday', role: 'Creative Companion', 
//     colors: {
//       sidebar: 'bg-rose-950', sidebarText: 'text-rose-300', sidebarHover: 'hover:bg-rose-900',
//       header: 'bg-pink-50', primary: 'bg-pink-500', userBubble: 'bg-pink-500',
//       text: 'text-pink-700', border: 'border-pink-200', highlight: 'bg-pink-50/10 text-pink-200'
//     }
//   },
//   titan: { 
//     name: 'Titan', role: 'Fitness Coach', 
//     colors: {
//       sidebar: 'bg-emerald-950', sidebarText: 'text-emerald-400', sidebarHover: 'hover:bg-emerald-900',
//       header: 'bg-emerald-50', primary: 'bg-emerald-600', userBubble: 'bg-emerald-600',
//       text: 'text-emerald-700', border: 'border-emerald-200', highlight: 'bg-emerald-50/10 text-emerald-200'
//     }
//   }
// };

// interface ChatProps { activePersona: Persona | null; }
// interface Message { id: string; role: 'user' | 'assistant'; content: string; created_at: string; }
// interface Session { id: string; created_at: string; persona_id: string; }

// export default function Chat({ activePersona }: ChatProps) {
//   const { sessionId } = useParams<{ sessionId: string }>();
//   const navigate = useNavigate();
//   const location = useLocation(); 
//   const bottomRef = useRef<HTMLDivElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
  
//   // 🛑 ABORT CONTROLLER (Stop Button Logic)
//   const abortControllerRef = useRef<AbortController | null>(null);
  
//   const hasAutoSent = useRef(false);
//   const [currentPersonaId, setCurrentPersonaId] = useState<string>(activePersona?.id?.toLowerCase() || 'jarvis');

//   const theme = useMemo(() => {
//     const id = sessionId ? currentPersonaId : (activePersona?.id?.toLowerCase() || currentPersonaId);
//     return THEMES[id]?.colors || THEMES['jarvis'].colors;
//   }, [activePersona, currentPersonaId, sessionId]);

//   const { speak } = useTextToSpeech();
//   const { isListening, transcript, startListening, stopListening, setTranscript } = useSpeechRecognition();
  
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [sessions, setSessions] = useState<Session[]>([]);
//   const [input, setInput] = useState('');
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   useEffect(() => { loadSessions(); loadChatHistory(); }, [sessionId]);
//   useEffect(() => { if(messages.length) bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
//   useEffect(() => { if (transcript) { setInput(prev => (prev ? prev + ' ' : '') + transcript); setTranscript(''); } }, [transcript]);
//   useEffect(() => { if (sessionId && sessions.length > 0) { const s = sessions.find(session => session.id === sessionId); if (s?.persona_id) setCurrentPersonaId(s.persona_id.toLowerCase()); } }, [sessionId, sessions]);

//   // 🚀 Auto-Send Logic (Robust)
//   useEffect(() => {
//     const state = location.state as { autoSend?: string } | null;
//     const autoText = state?.autoSend;
//     if (autoText && sessionId && !hasAutoSent.current) {
//       hasAutoSent.current = true;
//       setTimeout(() => {
//         handleSend(undefined, autoText);
//         window.history.replaceState({}, document.title);
//       }, 800); 
//     }
//   }, [location.state, sessionId]); 

//   // API Loaders
//   const loadSessions = async () => {
//     const token = api.auth.getToken();
//     if (!token) return;
//     const res = await api.chat.getAllSessions(token);
//     if (res.data || res.sessions) setSessions(res.data || res.sessions || []);
//   };

//   const loadChatHistory = async () => {
//     const token = api.auth.getToken();
//     if (!token || !sessionId) return;
//     const res = await api.chat.getMessages(sessionId, token);
//     if (res.data) setMessages(res.data);
//   };

//   // 🗑️ DELETE FUNCTIONS
//   const handleDeleteSession = async (e: React.MouseEvent, idToDelete: string) => {
//     e.stopPropagation(); 
//     if (!window.confirm("Delete this chat permanently?")) return;

//     const token = api.auth.getToken();
//     await api.chat.deleteSession(idToDelete, token!);
    
//     setSessions(prev => prev.filter(s => s.id !== idToDelete));
//     if (sessionId === idToDelete) navigate('/dashboard'); 
//   };

//   const handleClearAll = async () => {
//     if (!window.confirm("WARNING: This will delete ALL chat history. Are you sure?")) return;
//     const token = api.auth.getToken();
//     await api.chat.clearAllSessions(token!);
//     setSessions([]);
//     navigate('/dashboard');
//   };

//   // 🛑 STOP GENERATION
//   const handleStop = () => {
//     if (abortControllerRef.current) {
//       abortControllerRef.current.abort();
//       abortControllerRef.current = null;
//       setIsLoading(false);
//       setMessages(prev => [...prev, {
//          id: Date.now().toString(), role: 'assistant', content: " [Stopped by User]", created_at: new Date().toISOString()
//       }]);
//     }
//   };

//   const handleSend = async (e?: React.FormEvent, textOverride?: string) => {
//     e?.preventDefault();
//     const textToUse = textOverride || input;
//     if ((!textToUse.trim() && !selectedImage) || isLoading) return;

//     const token = api.auth.getToken();
    
//     // Create Abort Controller
//     abortControllerRef.current = new AbortController();

//     setMessages(prev => [...prev, {
//       id: Date.now().toString(), role: 'user', content: textToUse + (selectedImage ? ' [Image]' : ''), created_at: new Date().toISOString()
//     }]);

//     const msgToSend = textToUse;
//     const imgToSend = selectedImage;
//     if (!textOverride) setInput('');
//     setSelectedImage(null); 
//     setIsLoading(true);

//     try {
//       let sid = sessionId;
//       if (!sid) {
//          const res = await api.chat.createSession(currentPersonaId, token!);
//          if (res.session) { sid = res.session.id; navigate(`/chat/${sid}`); }
//       }

//       // Pass the SIGNAL to stop logic
//       const res = await api.chat.sendMessage(sid!, msgToSend, token!, imgToSend || undefined, abortControllerRef.current.signal);
      
//       if (res.message) setMessages(prev => [...prev, res.message]);
//     } catch (err: any) { 
//         if (err.name === 'AbortError') {
//             console.log("Generation stopped by user.");
//         } else {
//             console.error(err); 
//         }
//     } 
//     finally { 
//         setIsLoading(false); 
//         abortControllerRef.current = null;
//     }
//   };

//   const handleManualSpeak = () => {
//     const lastMsg = messages[messages.length - 1];
//     if (lastMsg?.role === 'assistant') speak ? speak(lastMsg.content) : window.speechSynthesis.speak(new SpeechSynthesisUtterance(lastMsg.content));
//   };
  
//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       const reader = new FileReader();
//       reader.onload = () => setSelectedImage(reader.result as string);
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   // 🧠 SMART SWITCH LOGIC
//   const getSuggestedPersona = (aiText: string, userText: string) => {
//     const aiLower = aiText.toLowerCase(); const userLower = userText.toLowerCase();
    
//     // Explicit Mentions
//     if (currentPersonaId !== 'jarvis' && aiLower.includes('jarvis')) return 'jarvis';
//     if (currentPersonaId !== 'friday' && aiLower.includes('friday')) return 'friday';
//     if (currentPersonaId !== 'titan' && aiLower.includes('titan')) return 'titan';

//     // Context Clues
//     if (currentPersonaId !== 'jarvis' && (userLower.includes('code') || userLower.includes('python'))) return 'jarvis';
//     if (currentPersonaId !== 'friday' && (userLower.includes('joke') || userLower.includes('story'))) return 'friday';
//     if (currentPersonaId !== 'titan' && (userLower.includes('workout') || userLower.includes('muscle'))) return 'titan';
    
//     return null;
//   };

//   const handleSmartSwitch = async (targetPersona: string) => {
//     const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
//     if (!lastUserMsg) return;
//     const token = api.auth.getToken();
//     try {
//       const res = await api.chat.createSession(targetPersona, token!);
//       if (res.session) navigate(`/chat/${res.session.id}`, { state: { autoSend: lastUserMsg.content } });
//     } catch (err) { console.error(err); }
//   };

//   const uiPersona = THEMES[sessionId ? currentPersonaId : (activePersona?.id?.toLowerCase() || currentPersonaId)];

//   return (
//     <div className="fixed inset-0 w-screen h-[100dvh] flex overflow-hidden font-sans z-50 bg-white">
//       {/* Safelist for themes */}
//       <div className="hidden bg-slate-950 bg-rose-950 bg-emerald-950 bg-slate-50 bg-pink-50 bg-emerald-50 text-slate-400 text-rose-300 text-emerald-400 hover:bg-slate-800 hover:bg-rose-900 hover:bg-emerald-900 text-blue-700 text-pink-700 text-emerald-700 border-blue-200 border-pink-200 border-emerald-200 bg-blue-600 bg-pink-500 bg-emerald-600 bg-blue-50/10 text-blue-200 bg-pink-50/10 text-pink-200 bg-emerald-50/10 text-emerald-200"/>

//       {/* SIDEBAR */}
//       <div className={`${theme.sidebar} h-full z-50 w-72 backdrop-blur-xl border-r border-white/5 p-4 transition-transform duration-300 flex flex-col shadow-2xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
//         <div className="mb-8 flex items-center gap-3 px-2">
//           <div className={`p-2 rounded-lg bg-white/10 text-white`}><Bot size={24} /></div>
//           <div><h1 className="text-white font-bold tracking-wide text-lg">{(uiPersona?.name || 'AIDEN').toUpperCase()}</h1><p className={`text-xs ${theme.sidebarText} opacity-80 uppercase tracking-widest`}>Secure</p></div>
//           <button onClick={() => setIsSidebarOpen(false)} className="md:hidden ml-auto text-white"><X size={20} /></button>
//         </div>
        
//         {/* Chat List */}
//         <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
//           <p className={`px-2 text-xs font-bold uppercase tracking-wider mb-2 opacity-50 ${theme.sidebarText}`}>Recent Links</p>
//           {sessions.map(s => (
//             <div key={s.id} className="relative group">
//               <button onClick={() => navigate(`/chat/${s.id}`)} className={`w-full text-left p-3 rounded-xl text-sm transition-all duration-200 flex items-center gap-3 pr-8 ${s.id === sessionId ? `${theme.highlight} shadow-lg border border-white/10 font-medium` : `${theme.sidebarText} ${theme.sidebarHover} hover:text-white`}`}>
//                 <MessageSquare size={16} className="opacity-70" /> <span className="truncate">{s.persona_id.charAt(0).toUpperCase() + s.persona_id.slice(1)} Session</span>
//               </button>
//               {/* 🗑️ Trash Icon */}
//               <button onClick={(e) => handleDeleteSession(e, s.id)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
//                 <Trash2 size={14} />
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Clear All & Back */}
//         <div className="mt-4 space-y-2">
//            {sessions.length > 0 && (
//              <button onClick={handleClearAll} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-red-500/10 text-red-400 hover:text-red-300`}>
//                 <Ban size={18} /> <span className="font-medium text-sm">Clear History</span>
//              </button>
//            )}
//            <button onClick={() => navigate('/dashboard')} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-white/5 ${theme.sidebarText} hover:text-white`}>
//              <ArrowLeft size={18} /> <span className="font-medium">Dashboard</span>
//            </button>
//         </div>
//       </div>

//       {/* MAIN CHAT */}
//       <div className="flex-1 flex flex-col h-full relative min-w-0 bg-white">
//         <header className={`h-20 shrink-0 border-b flex items-center justify-between px-8 z-10 ${theme.header} ${theme.border}`}>
//           <div className="flex items-center gap-4">
//             <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 text-gray-500"><Menu size={24} /></button>
//             <div className={`w-2.5 h-2.5 rounded-full animate-pulse shadow-sm ${theme.primary}`} />
//             <div><h1 className={`font-bold text-xl ${theme.text}`}>{uiPersona?.name || 'AIDEN'}</h1><span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{uiPersona?.role || 'System Online'}</span></div>
//           </div>
//           <button onClick={handleManualSpeak} className={`p-2.5 rounded-full transition-colors hover:bg-white shadow-sm ${theme.header} hover:shadow-md text-gray-600`}><Volume2 size={20} /></button>
//         </header>

//         <div className="flex-1 w-full overflow-y-auto p-4 md:p-8 space-y-8 bg-white/50">
//           {messages.length === 0 && <div className="h-full flex flex-col items-center justify-center opacity-30"><Bot size={64} className={`mb-4 ${theme.text}`} /><p className="text-lg font-medium text-gray-400">Initialize protocol: {uiPersona?.name}...</p></div>}
//           {messages.map((msg, idx) => {
//             const prev = messages[idx-1]?.role === 'user' ? messages[idx-1].content : "";
//             const suggestion = msg.role === 'assistant' ? getSuggestedPersona(msg.content, prev) : null;
//             return (
//               <div key={msg.id} className="flex flex-col gap-2">
//                 <div className={`flex gap-4 ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
//                   {msg.role === 'assistant' && <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${theme.header} border ${theme.border}`}><Bot size={20} className={theme.text} /></div>}
//                   <div className={`max-w-[85%] px-6 py-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'assistant' ? 'bg-gray-50 border border-gray-100 text-gray-700 rounded-tl-none' : `${theme.userBubble} text-white rounded-tr-none shadow-md`}`}>
//                     <ReactMarkdown>{msg.content}</ReactMarkdown>
//                   </div>
//                 </div>
//                 {suggestion && suggestion !== currentPersonaId && (
//                   <div className="flex justify-start ml-16 animate-in fade-in slide-in-from-top-2">
//                     <button onClick={() => handleSmartSwitch(suggestion)} className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full text-xs font-bold shadow-xl hover:bg-black hover:scale-105 transition-all cursor-pointer border border-gray-700"><Share2 size={14} /> Switch to {suggestion.charAt(0).toUpperCase() + suggestion.slice(1)} (Auto-Ask)</button>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//           <div ref={bottomRef} className="h-1" />
//         </div>

//         <div className="p-6 shrink-0 bg-white border-t border-gray-100 w-full">
//           <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-center gap-3">
//             {selectedImage && <div className="absolute bottom-full left-0 mb-4 p-2 bg-white border rounded-xl shadow-lg animate-in slide-in-from-bottom-2"><img src={selectedImage} className="h-24 rounded-lg" /><button onClick={()=>setSelectedImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 shadow-md">×</button></div>}
//             <div className={`flex-1 relative group shadow-sm rounded-full bg-gray-50 border transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-offset-2 ${theme.border.replace('border-', 'focus-within:ring-')}`}>
//                <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"><Paperclip size={20} /></button>
//                <input ref={fileInputRef} type="file" onChange={handleFileSelect} className="hidden" />
//                <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder={`Message ${uiPersona?.name}...`} disabled={isLoading} className="w-full bg-transparent border-none rounded-full pl-12 pr-12 py-4 focus:ring-0 outline-none placeholder:text-gray-400" />
//                <button type="button" onClick={isListening ? stopListening : startListening} className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-gray-600'}`}><Mic size={20} /></button>
//             </div>
            
//             {/* 🛑 STOP / SEND BUTTON */}
//             {isLoading ? (
//                <button type="button" onClick={handleStop} className={`p-4 rounded-full text-white shadow-lg transition-all hover:scale-105 bg-red-500 hover:bg-red-600 animate-pulse`}>
//                   <StopCircle size={24} fill="currentColor" />
//                </button>
//             ) : (
//                <button type="submit" disabled={!input.trim() && !selectedImage} className={`p-4 rounded-full text-white shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 ${theme.primary}`}>
//                   <Send size={24} />
//                </button>
//             )}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Send, Mic, ArrowLeft, Bot, Loader2, MessageSquare, Volume2, Paperclip, Menu, X, Share2, Trash2, StopCircle, Ban, PauseCircle, PlayCircle
} from 'lucide-react';
import { api } from '../lib/api';
import ReactMarkdown from 'react-markdown';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { Persona } from '../types';

// Theme Definitions
const THEMES: Record<string, any> = {
  jarvis: { 
    name: 'Jarvis', role: 'Technical Architect', 
    colors: {
      sidebar: 'bg-slate-950', sidebarText: 'text-slate-400', sidebarHover: 'hover:bg-slate-800',
      header: 'bg-slate-50', primary: 'bg-blue-600', userBubble: 'bg-blue-600',
      text: 'text-blue-700', border: 'border-blue-200', highlight: 'bg-blue-50/10 text-blue-200'
    }
  },
  friday: { 
    name: 'Friday', role: 'Creative Companion', 
    colors: {
      sidebar: 'bg-rose-950', sidebarText: 'text-rose-300', sidebarHover: 'hover:bg-rose-900',
      header: 'bg-pink-50', primary: 'bg-pink-500', userBubble: 'bg-pink-500',
      text: 'text-pink-700', border: 'border-pink-200', highlight: 'bg-pink-50/10 text-pink-200'
    }
  },
  titan: { 
    name: 'Titan', role: 'Fitness Coach', 
    colors: {
      sidebar: 'bg-emerald-950', sidebarText: 'text-emerald-400', sidebarHover: 'hover:bg-emerald-900',
      header: 'bg-emerald-50', primary: 'bg-emerald-600', userBubble: 'bg-emerald-600',
      text: 'text-emerald-700', border: 'border-emerald-200', highlight: 'bg-emerald-50/10 text-emerald-200'
    }
  }
};

interface ChatProps { activePersona: Persona | null; }
interface Message { id: string; role: 'user' | 'assistant'; content: string; created_at: string; }
interface Session { id: string; created_at: string; persona_id: string; }

export default function Chat({ activePersona }: ChatProps) {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const location = useLocation(); 
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  // ✅ FIX: Keep utterance in ref to prevent Garbage Collection bugs
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const hasAutoSent = useRef(false);
  const prevSessionId = useRef(sessionId);
  const [currentPersonaId, setCurrentPersonaId] = useState<string>(activePersona?.id?.toLowerCase() || 'jarvis');

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const theme = useMemo(() => {
    const id = sessionId ? currentPersonaId : (activePersona?.id?.toLowerCase() || currentPersonaId);
    return THEMES[id]?.colors || THEMES['jarvis'].colors;
  }, [activePersona, currentPersonaId, sessionId]);

  const { speak } = useTextToSpeech();
  const { isListening, transcript, startListening, stopListening, setTranscript } = useSpeechRecognition();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => { loadSessions(); loadChatHistory(); }, [sessionId]);
  useEffect(() => { if(messages.length) bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  useEffect(() => { if (transcript) { setInput(prev => (prev ? prev + ' ' : '') + transcript); setTranscript(''); } }, [transcript]);
  
  // ✅ WATCHDOG: Ensure UI doesn't get stuck if browser stops speaking silently
  useEffect(() => {
    const interval = setInterval(() => {
        if (isSpeaking && !window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
            // Browser stopped, but UI thinks it's running. Reset it.
            setIsSpeaking(false);
            setIsPaused(false);
        }
    }, 500);
    return () => clearInterval(interval);
  }, [isSpeaking]);

  // Cleanup on unmount/change
  useEffect(() => {
    return () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
    };
  }, [sessionId]);

  useEffect(() => { 
    if (sessionId && sessions.length > 0) { 
      const s = sessions.find(session => session.id === sessionId); 
      if (s?.persona_id) setCurrentPersonaId(s.persona_id.toLowerCase()); 
    } 
  }, [sessionId, sessions]);

  // Auto-Send Logic
  useEffect(() => {
    if (prevSessionId.current !== sessionId) {
      hasAutoSent.current = false;
      prevSessionId.current = sessionId;
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    const state = location.state as { autoSend?: string } | null;
    const autoText = state?.autoSend;
    
    if (autoText && sessionId && !hasAutoSent.current) {
      hasAutoSent.current = true;
      const timer = setTimeout(() => {
        handleSend(undefined, autoText);
        window.history.replaceState({}, document.title);
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [location.state, sessionId]); 

  const loadSessions = async () => {
    const token = api.auth.getToken();
    if (!token) return;
    const res = await api.chat.getAllSessions(token);
    if (res.data || res.sessions) setSessions(res.data || res.sessions || []);
  };

  const loadChatHistory = async () => {
    const token = api.auth.getToken();
    if (!token || !sessionId) return;
    const res = await api.chat.getMessages(sessionId, token);
    if (res.data) setMessages(res.data);
  };

  const handleDeleteSession = async (e: React.MouseEvent, idToDelete: string) => {
    e.stopPropagation(); 
    if (!window.confirm("Delete this chat permanently?")) return;

    const token = api.auth.getToken();
    await api.chat.deleteSession(idToDelete, token!);
    setSessions(prev => prev.filter(s => s.id !== idToDelete));
    if (sessionId && sessionId === idToDelete) navigate('/dashboard'); 
  };

  const handleClearAll = async () => {
    if (!window.confirm("WARNING: This will delete ALL chat history. Are you sure?")) return;
    const token = api.auth.getToken();
    await api.chat.clearAllSessions(token!);
    setSessions([]);
    navigate('/dashboard');
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
      setMessages(prev => [...prev, {
         id: Date.now().toString(), role: 'assistant', content: " [Stopped by User]", created_at: new Date().toISOString()
      }]);
    }
  };

  // 🔊 ROBUST SPEAKER LOGIC
  const handleManualSpeak = () => {
    const synth = window.speechSynthesis;
    const lastMsg = messages[messages.length - 1];

    if (!lastMsg || lastMsg.role !== 'assistant') return;

    // 1. Resume if Paused
    if (isPaused) {
        synth.resume();
        setIsPaused(false);
        setIsSpeaking(true);
        return;
    }

    // 2. Pause if Speaking
    if (isSpeaking) {
        synth.pause();
        setIsPaused(true);
        return;
    }

    // 3. Start Fresh
    synth.cancel(); // Force stop previous
    const utterance = new SpeechSynthesisUtterance(lastMsg.content);
    
    // ✅ Store in Ref to prevent Garbage Collection bug
    utteranceRef.current = utterance;

    utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
    };
    utterance.onerror = () => {
        setIsSpeaking(false);
        setIsPaused(false);
    };
    
    synth.speak(utterance);
    setIsSpeaking(true);
    setIsPaused(false);
  };

  const handleSend = async (e?: React.FormEvent, textOverride?: string) => {
    e?.preventDefault();
    const textToUse = textOverride || input;
    if ((!textToUse.trim() && !selectedImage) || isLoading) return;
    const token = api.auth.getToken();
    
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    abortControllerRef.current = new AbortController();

    setMessages(prev => [...prev, {
      id: Date.now().toString(), role: 'user', content: textToUse + (selectedImage ? ' [Image]' : ''), created_at: new Date().toISOString()
    }]);

    const msgToSend = textToUse;
    const imgToSend = selectedImage;
    if (!textOverride) setInput('');
    setSelectedImage(null); 
    setIsLoading(true);

    try {
      let sid = sessionId;
      if (!sid) {
         const res = await api.chat.createSession(currentPersonaId, token!);
         if (res.session) { sid = res.session.id; navigate(`/chat/${sid}`); }
      }
      const res = await api.chat.sendMessage(sid!, msgToSend, token!, imgToSend || undefined, abortControllerRef.current.signal);
      if (res.message) setMessages(prev => [...prev, res.message]);
    } catch (err: any) { 
        if (err.name === 'AbortError') console.log("Generation stopped.");
        else console.error(err); 
    } 
    finally { 
        setIsLoading(false); 
        abortControllerRef.current = null;
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const getSuggestedPersona = (aiText: string, userText: string) => {
    const aiLower = aiText.toLowerCase(); const userLower = userText.toLowerCase();
    
    if (currentPersonaId !== 'jarvis' && aiLower.includes('jarvis')) return 'jarvis';
    if (currentPersonaId !== 'friday' && aiLower.includes('friday')) return 'friday';
    if (currentPersonaId !== 'titan' && aiLower.includes('titan')) return 'titan';

    if (currentPersonaId !== 'jarvis' && (userLower.includes('code') || userLower.includes('python'))) return 'jarvis';
    if (currentPersonaId !== 'friday' && (userLower.includes('joke') || userLower.includes('story'))) return 'friday';
    if (currentPersonaId !== 'titan' && (userLower.includes('workout') || userLower.includes('muscle'))) return 'titan';
    return null;
  };

  const handleSmartSwitch = async (targetPersona: string) => {
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    if (!lastUserMsg) return;
    const token = api.auth.getToken();
    try {
      const res = await api.chat.createSession(targetPersona, token!);
      if (res.session) {
        navigate(`/chat/${res.session.id}`, { state: { autoSend: lastUserMsg.content } });
      }
    } catch (err) { console.error("Switch failed", err); }
  };

  const uiPersona = THEMES[sessionId ? currentPersonaId : (activePersona?.id?.toLowerCase() || currentPersonaId)];

  return (
    <div className="fixed inset-0 w-screen h-[100dvh] flex overflow-hidden font-sans z-50 bg-white">
      <div className="hidden bg-slate-950 bg-rose-950 bg-emerald-950 bg-slate-50 bg-pink-50 bg-emerald-50 text-slate-400 text-rose-300 text-emerald-400 hover:bg-slate-800 hover:bg-rose-900 hover:bg-emerald-900 text-blue-700 text-pink-700 text-emerald-700 border-blue-200 border-pink-200 border-emerald-200 bg-blue-600 bg-pink-500 bg-emerald-600 bg-blue-50/10 text-blue-200 bg-pink-50/10 text-pink-200 bg-emerald-50/10 text-emerald-200"/>

      <div className={`${theme.sidebar} h-full z-50 w-72 backdrop-blur-xl border-r border-white/5 p-4 transition-transform duration-300 flex flex-col shadow-2xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className={`p-2 rounded-lg bg-white/10 text-white`}><Bot size={24} /></div>
          <div><h1 className="text-white font-bold tracking-wide text-lg">{(uiPersona?.name || 'AIDEN').toUpperCase()}</h1><p className={`text-xs ${theme.sidebarText} opacity-80 uppercase tracking-widest`}>Secure</p></div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden ml-auto text-white"><X size={20} /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          <p className={`px-2 text-xs font-bold uppercase tracking-wider mb-2 opacity-50 ${theme.sidebarText}`}>Recent Links</p>
          {sessions.map(s => (
            <div key={s.id} className="relative group">
              <button onClick={() => navigate(`/chat/${s.id}`)} className={`w-full text-left p-3 rounded-xl text-sm transition-all duration-200 flex items-center gap-3 pr-8 ${s.id === sessionId ? `${theme.highlight} shadow-lg border border-white/10 font-medium` : `${theme.sidebarText} ${theme.sidebarHover} hover:text-white`}`}>
                <MessageSquare size={16} className="opacity-70" /> <span className="truncate">{s.persona_id.charAt(0).toUpperCase() + s.persona_id.slice(1)} Session</span>
              </button>
              <button onClick={(e) => handleDeleteSession(e, s.id)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-2">
           {sessions.length > 0 && (
             <button onClick={handleClearAll} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-red-500/10 text-red-400 hover:text-red-300`}>
                <Ban size={18} /> <span className="font-medium text-sm">Clear History</span>
             </button>
           )}
           <button onClick={() => navigate('/dashboard')} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-white/5 ${theme.sidebarText} hover:text-white`}>
             <ArrowLeft size={18} /> <span className="font-medium">Dashboard</span>
           </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col h-full relative min-w-0 bg-white">
        <header className={`h-20 shrink-0 border-b flex items-center justify-between px-8 z-10 ${theme.header} ${theme.border}`}>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 text-gray-500"><Menu size={24} /></button>
            <div className={`w-2.5 h-2.5 rounded-full animate-pulse shadow-sm ${theme.primary}`} />
            <div><h1 className={`font-bold text-xl ${theme.text}`}>{uiPersona?.name || 'AIDEN'}</h1><span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{uiPersona?.role || 'System Online'}</span></div>
          </div>
          
          {/* 🔊 SPEAKER BUTTON: Play -> Pause -> Resume */}
          <button onClick={handleManualSpeak} className={`p-2.5 rounded-full transition-all hover:bg-white shadow-sm ${theme.header} hover:shadow-md ${isSpeaking && !isPaused ? 'text-blue-500 animate-pulse' : 'text-gray-600'}`}>
             {isPaused ? <PlayCircle size={20} /> : (isSpeaking ? <PauseCircle size={20} /> : <Volume2 size={20} />)}
          </button>
        </header>

        <div className="flex-1 w-full overflow-y-auto p-4 md:p-8 space-y-8 bg-white/50">
          {messages.length === 0 && <div className="h-full flex flex-col items-center justify-center opacity-30"><Bot size={64} className={`mb-4 ${theme.text}`} /><p className="text-lg font-medium text-gray-400">Initialize protocol: {uiPersona?.name}...</p></div>}
          {messages.map((msg, idx) => {
            const prev = messages[idx-1]?.role === 'user' ? messages[idx-1].content : "";
            const suggestion = msg.role === 'assistant' ? getSuggestedPersona(msg.content, prev) : null;
            return (
              <div key={msg.id} className="flex flex-col gap-2">
                <div className={`flex gap-4 ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                  {msg.role === 'assistant' && <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${theme.header} border ${theme.border}`}><Bot size={20} className={theme.text} /></div>}
                  <div className={`max-w-[85%] px-6 py-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'assistant' ? 'bg-gray-50 border border-gray-100 text-gray-700 rounded-tl-none' : `${theme.userBubble} text-white rounded-tr-none shadow-md`}`}>
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
                {suggestion && suggestion !== currentPersonaId && (
                  <div className="flex justify-start ml-16 animate-in fade-in slide-in-from-top-2">
                    <button onClick={() => handleSmartSwitch(suggestion)} className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full text-xs font-bold shadow-xl hover:bg-black hover:scale-105 transition-all cursor-pointer border border-gray-700"><Share2 size={14} /> Switch to {suggestion.charAt(0).toUpperCase() + suggestion.slice(1)} (Auto-Ask)</button>
                  </div>
                )}
              </div>
            );
          })}
          <div ref={bottomRef} className="h-1" />
        </div>

        <div className="p-6 shrink-0 bg-white border-t border-gray-100 w-full">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-center gap-3">
            {selectedImage && <div className="absolute bottom-full left-0 mb-4 p-2 bg-white border rounded-xl shadow-lg animate-in slide-in-from-bottom-2"><img src={selectedImage} className="h-24 rounded-lg" /><button onClick={()=>setSelectedImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 shadow-md">×</button></div>}
            <div className={`flex-1 relative group shadow-sm rounded-full bg-gray-50 border transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-offset-2 ${theme.border.replace('border-', 'focus-within:ring-')}`}>
               <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"><Paperclip size={20} /></button>
               <input ref={fileInputRef} type="file" onChange={handleFileSelect} className="hidden" />
               <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder={`Message ${uiPersona?.name}...`} disabled={isLoading} className="w-full bg-transparent border-none rounded-full pl-12 pr-12 py-4 focus:ring-0 outline-none placeholder:text-gray-400" />
               <button type="button" onClick={isListening ? stopListening : startListening} className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-gray-600'}`}><Mic size={20} /></button>
            </div>
            {isLoading ? (
               <button type="button" onClick={handleStop} className={`p-4 rounded-full text-white shadow-lg transition-all hover:scale-105 bg-red-500 hover:bg-red-600 animate-pulse`}>
                  <StopCircle size={24} fill="currentColor" />
               </button>
            ) : (
               <button type="submit" disabled={!input.trim() && !selectedImage} className={`p-4 rounded-full text-white shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 ${theme.primary}`}>
                  <Send size={24} />
               </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}