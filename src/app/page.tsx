"use client";

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 80, damping: 20 }
    },
  };

  const floatAnimation = {
    y: [0, -12, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const,
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center p-6 selection:bg-[#1C1C1C] selection:text-[#F9F8F6] font-sans relative">
      <motion.div 
        className="max-w-5xl w-full text-center relative z-10 flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span 
          variants={itemVariants}
          className="block text-[12px] uppercase tracking-[0.2em] font-sans font-medium mb-6 opacity-70"
        >
          Class of 2029 • Recruitment Drive
        </motion.span>
        
        <motion.h1 
          variants={itemVariants}
          animate={floatAnimation}
          className="text-[4rem] sm:text-[7.5rem] leading-[0.9] font-serif tracking-tight mb-8"
        >
          Training & Placement club.
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-[18px] font-sans mb-16 max-w-2xl mx-auto leading-relaxed opacity-60"
        >
          Bridging the gap between raw potential and industry excellence.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col items-center gap-5 mt-4">
          <span className="text-[14px] font-sans font-medium opacity-50 tracking-wide uppercase">Ready to step in?</span>
          <a
            href="https://tinyurl.com/TnpRecruitment2029"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-[#1C1C1C] text-[#F9F8F6] rounded-full text-[16px] font-sans font-medium shadow-[0_0_25px_rgba(28,28,28,0.15)] hover:bg-[#333333] hover:shadow-[0_0_35px_rgba(28,28,28,0.3)] transition-all duration-300"
          >
            Access Registration Form
            <ArrowUpRight className="w-5 h-5 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2} />
          </a>
        </motion.div>
      </motion.div>

      {/* Minimal Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-0 left-0 w-full px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[12px] sm:text-[13px] font-sans text-[#1C1C1C] opacity-50 hover:opacity-75 transition-opacity duration-300 z-20"
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
