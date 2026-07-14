"use client";

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'home' | 'about'>('home');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 80, damping: 20 }
    },
  };

  const floatAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const,
    }
  };

  const viewVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" as const } }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] relative overflow-hidden selection:bg-[#1C1C1C] selection:text-[#F9F8F6] font-sans">
      
      {/* Top Navigation Bar */}
      <header className="absolute top-0 w-full px-6 md:px-10 py-6 flex justify-end z-50">
        <nav className="flex items-center gap-6 sm:gap-8">
          <button 
            onClick={() => setActiveTab('home')}
            className={`text-[11px] sm:text-[13px] tracking-[0.15em] uppercase font-sans transition-all duration-300 ${activeTab === 'home' ? 'opacity-100 font-medium underline underline-offset-[6px] decoration-1' : 'opacity-50 hover:opacity-100'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveTab('about')}
            className={`text-[11px] sm:text-[13px] tracking-[0.15em] uppercase font-sans transition-all duration-300 ${activeTab === 'about' ? 'opacity-100 font-medium underline underline-offset-[6px] decoration-1' : 'opacity-50 hover:opacity-100'}`}
          >
            About
          </button>
        </nav>
      </header>

      {/* Central Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-6 sm:px-8 py-20 sm:py-24 relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div 
              key="home"
              variants={viewVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-5xl w-full text-center flex flex-col items-center justify-center"
            >
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center justify-center"
              >
                <motion.span 
                  variants={itemVariants}
                  className="block text-[10px] sm:text-[12px] uppercase tracking-[0.2em] font-sans font-medium mb-4 sm:mb-6 opacity-70 text-[#1C1C1C]"
                >
                  Class of 2029 • Recruitment Drive
                </motion.span>
                
                <motion.div variants={itemVariants}>
                  <motion.h1 animate={floatAnimation} className="text-[3rem] sm:text-[7.5rem] leading-[1.1] sm:leading-[0.9] font-serif tracking-tight mb-6 sm:mb-8 text-[#1C1C1C]">
                    Training & Placement club.
                  </motion.h1>
                </motion.div>
                
                <motion.p 
                  variants={itemVariants}
                  className="text-sm md:text-[18px] font-sans mb-10 sm:mb-16 max-w-2xl mx-auto leading-relaxed opacity-60 text-[#1C1C1C]"
                >
                  Bridging the gap between raw potential and industry excellence.
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 sm:gap-5 mt-2 sm:mt-4">
                  <span className="text-[12px] sm:text-[14px] font-sans font-medium opacity-50 tracking-wide uppercase text-[#1C1C1C]">Ready to step in?</span>
                  <a
                    href="https://tinyurl.com/TnpRecruitment2029"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#1C1C1C] text-[#F9F8F6] rounded-full text-[14px] sm:text-[16px] font-sans font-medium shadow-[0_0_25px_rgba(28,28,28,0.15)] hover:bg-[#333333] hover:shadow-[0_0_35px_rgba(28,28,28,0.3)] transition-all duration-300"
                  >
                    Access Registration Form
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2} />
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              variants={viewVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-4xl w-full flex flex-col justify-center items-center text-center"
            >
              <h2 className="text-[2rem] sm:text-[3.5rem] font-serif tracking-tight mb-6 sm:mb-8 text-[#1C1C1C]">
                The T&P Club
              </h2>
              <div className="text-[13px] sm:text-[1.05rem] leading-[1.6] sm:leading-[1.8] font-serif text-[#1C1C1C] opacity-80 max-w-3xl mb-8 sm:mb-12 text-center">
                Working under the guidance of the GPREC Training & Placement Department, we are a permanent, elite student body dedicated to bridging the gap between campus potential and industry excellence.
                <br /><br />
                Membership is earned. We strictly select students across all branches who demonstrate exceptional academic records, passing through a rigorous vetting process of written tests, group discussions, and personal interviews.
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 sm:gap-y-8 text-left w-full max-w-3xl text-[#1C1C1C]">
                <div className="flex flex-col">
                  <span className="font-sans font-semibold uppercase tracking-widest text-[11px] sm:text-[12px] mb-2 opacity-90">Orchestrate</span>
                  <p className="font-serif text-[13px] sm:text-[15px] opacity-70 leading-relaxed">
                    Assist the T&P cell in organizing massive recruitment drives, mock interviews, and training events.
                  </p>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-semibold uppercase tracking-widest text-[11px] sm:text-[12px] mb-2 opacity-90">Lead</span>
                  <p className="font-serif text-[13px] sm:text-[15px] opacity-70 leading-relaxed">
                    Cultivate intense managerial, event-organizing, and leadership skills within our ranks.
                  </p>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-semibold uppercase tracking-widest text-[11px] sm:text-[12px] mb-2 opacity-90">Connect</span>
                  <p className="font-serif text-[13px] sm:text-[15px] opacity-70 leading-relaxed">
                    Build bridges between current students and our powerful alumni network.
                  </p>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-semibold uppercase tracking-widest text-[11px] sm:text-[12px] mb-2 opacity-90">Empower</span>
                  <p className="font-serif text-[13px] sm:text-[15px] opacity-70 leading-relaxed">
                    Keep the student body relentlessly informed about placement processes and industry demands.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Minimal Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="w-full px-6 md:px-10 pt-4 pb-8 md:pb-6 flex flex-col md:flex-row items-center md:justify-between gap-4 text-[11px] sm:text-[12px] font-sans text-[#1C1C1C] opacity-50 hover:opacity-75 transition-opacity duration-300 z-20 shrink-0"
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="font-medium uppercase tracking-wider">Contact Us:</span>
          <a href="tel:+919491212400" className="hover:underline underline-offset-4 decoration-1">Mohammad Ismail</a>
          <span className="opacity-40">•</span>
          <a href="tel:+919390375499" className="hover:underline underline-offset-4 decoration-1">Mohith</a>
        </div>
        
        <a 
          href="https://www.instagram.com/tnpclub_gprec" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-1 hover:underline underline-offset-4 decoration-1 font-medium uppercase tracking-wider"
        >
          Instagram <ArrowUpRight className="w-3 h-3" strokeWidth={2} />
        </a>
      </motion.div>
    </div>
  );
}
