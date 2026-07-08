"use client";

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

function MagneticButton({ children, href }: { children: React.ReactNode, href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-[#1C1C1C] text-[#F9F8F6] rounded-full text-[16px] font-sans font-medium shadow-[0_0_25px_rgba(28,28,28,0.15)] hover:shadow-[0_0_35px_rgba(28,28,28,0.3)] transition-shadow duration-300"
    >
      {children}
    </motion.a>
  );
}

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
      ease: "easeInOut",
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center p-6 selection:bg-[#1C1C1C] selection:text-[#F9F8F6] font-sans">
      <motion.div 
        className="max-w-4xl w-full text-center relative z-10 flex flex-col items-center justify-center"
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
          Training & Placement.
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-[18px] font-sans mb-16 max-w-2xl mx-auto leading-relaxed opacity-60"
        >
          Bridging the gap between raw potential and industry excellence.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col items-center gap-5 mt-4">
          <span className="text-[14px] font-sans font-medium opacity-50 tracking-wide uppercase">Ready to step in?</span>
          <motion.div animate={floatAnimation}>
            <MagneticButton href="https://tinyurl.com/TnpRecruitment2029">
              Access Registration Form
              <ArrowUpRight className="w-5 h-5 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2} />
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
