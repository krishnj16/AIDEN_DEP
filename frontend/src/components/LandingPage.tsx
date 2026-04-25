import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, Database, Layers, Zap, X, Cpu, Globe, Sparkles, Activity } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      {/* No internal animations here - App.tsx handles the page fade */}
      <section className="h-screen flex flex-col items-center justify-center relative px-6">
        <div className="text-center z-10 max-w-4xl">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-400 mb-4 block">
            Orchestrated Intelligence
          </span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-tight">
            Stop Chatting.<br />
            Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600">Engineering.</span>
          </h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Standard LLM models are jack-of-all-trades, masters of none. 
            AIDEN is a <strong>Smart Identity Engine</strong> that automatically routes your intent to specialized, expert agents.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetStarted}
            className="group bg-black text-white px-8 py-4 rounded-full text-lg font-bold tracking-wide flex items-center gap-3 mx-auto hover:bg-zinc-800 transition-all shadow-lg"
          >
            INITIALIZE SYSTEM
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Abstract Background Element */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-100/50 via-purple-100/50 to-emerald-100/50 blur-[100px] rounded-full" />
        </div>
      </section>

      {/* 2. THE PROBLEM VS SOLUTION */}
      <section className="py-24 px-6 bg-zinc-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl font-bold mb-6">The Problem with Single Models</h2>
              <p className="text-zinc-600 text-lg mb-8 leading-relaxed">
                Asking one AI model to write code, compose poetry, and plan a workout is inefficient. They lose context, hallucinate facts, and require constant, tedious "prompt engineering" to switch gears.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <X size={24} className="text-red-500 shrink-0" /> 
                  <span className="text-zinc-700"><strong>Context Amnesia:</strong> They forget key details from earlier in the conversation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X size={24} className="text-red-500 shrink-0" /> 
                  <span className="text-zinc-700"><strong>Jack-of-All-Trades:</strong> Mediocre performance across many tasks instead of expertise in one.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X size={24} className="text-red-500 shrink-0" /> 
                  <span className="text-zinc-700"><strong>Passive Interaction:</strong> They wait for you to do all the cognitive heavy lifting.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-zinc-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <BrainCircuit size={200} />
               </div>
               <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                 <Zap className="text-yellow-500 fill-yellow-500" /> The AIDEN Advantage
               </h3>
               <div className="space-y-8">
                 <div className="flex gap-4">
                   <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0"><Layers size={24} /></div>
                   <div>
                     <h4 className="text-lg font-bold mb-1">Predictive Neural Routing</h4>
                     <p className="text-zinc-500 leading-relaxed">Our router analyzes your prompt's intent in milliseconds and instantly connects you to the best-suited agent.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0"><Database size={24} /></div>
                   <div>
                     <h4 className="text-lg font-bold mb-1">Persistent Memory Matrix</h4>
                     <p className="text-zinc-500 leading-relaxed">AIDEN remembers your preferences, project details, and past conversations across all sessions.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0"><Globe size={24} /></div>
                   <div>
                     <h4 className="text-lg font-bold mb-1">Multi-Modal Fluency</h4>
                     <p className="text-zinc-500 leading-relaxed">Seamlessly interact through text, voice, and image analysis.</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MEET THE TEAM */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Stop hiring freelancers.<br/>Deploy a Specialist Team.</h2>
          <p className="text-xl text-zinc-500 max-w-3xl mx-auto">Three distinct neural personalities working in tandem to cover every aspect of your workflow.</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* JARVIS */}
          <div className="p-10 rounded-3xl bg-zinc-50 border border-zinc-200 hover:border-blue-500 hover:bg-white hover:shadow-2xl transition-all duration-300 group">
            <div className="mb-6 text-blue-600"><Cpu size={40} /></div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Jarvis</h3>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-6">Technical Architect</p>
            <p className="text-zinc-600 leading-relaxed">Precise, formal, and code-centric. Your go-to for Python, React, system architecture, debugging, and complex math.</p>
          </div>

          {/* FRIDAY */}
          <div className="p-10 rounded-3xl bg-zinc-50 border border-zinc-200 hover:border-pink-500 hover:bg-white hover:shadow-2xl transition-all duration-300 group">
            <div className="mb-6 text-pink-600"><Sparkles size={40} /></div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-pink-600 transition-colors">Friday</h3>
            <p className="text-xs font-bold uppercase tracking-widest text-pink-400 mb-6">Creative Companion</p>
            <p className="text-zinc-600 leading-relaxed">Empathetic, witty, and boundless. Ideal for brainstorming, creative writing, marketing copy, and engaging conversation.</p>
          </div>

          {/* TITAN */}
          <div className="p-10 rounded-3xl bg-zinc-50 border border-zinc-200 hover:border-emerald-500 hover:bg-white hover:shadow-2xl transition-all duration-300 group">
            <div className="mb-6 text-emerald-600"><Activity size={40} /></div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">Titan</h3>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-6">Fitness & Discipline Coach</p>
            <p className="text-zinc-600 leading-relaxed">Aggressive, disciplined, and results-oriented. Builds custom workout plans, nutrition strategies, and keeps you accountable.</p>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="py-32 bg-black text-white text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black pointer-events-none"></div>
        <div className="relative z-10">
            <h2 className="text-5xl font-bold mb-8 leading-tight">Ready to upgrade your<br/>cognitive infrastructure?</h2>
            <button 
            onClick={onGetStarted}
            className="bg-white text-black px-12 py-6 rounded-full text-xl font-bold hover:scale-105 transition-transform shadow-2xl"
            >
            Access Terminal
            </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;