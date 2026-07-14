"use client";

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const batch2027 = [
  { name: "Shaik Neerganti Mohammed Umair", roll: "239X1A0174", branch: "CE" },
  { name: "Shaik Abdulla", roll: "239X1A0170", branch: "CE" },
  { name: "Tamatam Likitha", roll: "239X1A2914", branch: "CSB" },
  { name: "Badveli Chandrika", roll: "239X1A3203", branch: "CSD" },
  { name: "Ballani Meghana", roll: "239X1A3205", branch: "CSD" },
  { name: "Lucky Reddy", roll: "239X1A3252", branch: "CSD" },
  { name: "Kuruba Venkata Sahithi", roll: "239X1A0589", branch: "CSE" },
  { name: "Rokkam Sai Sharshitha Reddy", roll: "239X1A05F8", branch: "CSE" },
  { name: "Kummari Sindhu", roll: "239X1A0588", branch: "CSE" },
  { name: "Nemallapuri Venkata Srikanth", roll: "239X1A05J0", branch: "CSE" },
  { name: "Mallela Guru Jagannatha Reddy", roll: "239X1A05G9", branch: "CSE" },
  { name: "Golla Santhosh Kumar", roll: "239X1A0558", branch: "CSE" },
  { name: "Neeli Harshavardhan", roll: "239X1A33A2", branch: "CSM" },
  { name: "Shaik Naseeha Mashrath", roll: "239X1A3384", branch: "CSM" },
  { name: "K. Manasa", roll: "239X1A0466", branch: "ECE" },
  { name: "Surays Sai Nakshathra Bai", roll: "239X1A0497", branch: "ECE" },
  { name: "Neerukattu Vikas", roll: "239X1A0459", branch: "ECE" },
  { name: "Avireni Yashaswini", roll: "239X1A0405", branch: "ECE" },
  { name: "Gorla Raghavendra", roll: "249X5A04M3", branch: "ECE" },
  { name: "Sajjana Gandla Raghava", roll: "249X5A02E1", branch: "EEE" },
  { name: "Donthireddy Manogna Reddy", roll: "239X1A0206", branch: "EEE" },
  { name: "Burujula Praveena", roll: "239X1A0203", branch: "EEE" },
  { name: "Paggala Yeshwanth", roll: "239X1A0344", branch: "ME" },
  { name: "Shaik Zaid Al Basshar", roll: "239X1A0369", branch: "ME" }
];

const batch2028 = [
  { name: "Anna Rajesh", roll: "249XA01020", branch: "CE" },
  { name: "Kolaparthi Sai Satvasthai Sankarshan", roll: "249XA01048", branch: "CE" },
  { name: "Chakali Lakshmanna", roll: "249XA32127", branch: "CSD" },
  { name: "G. R. Pranitha", roll: "249XA32015", branch: "CSD" },
  { name: "V. Mohith", roll: "249XA05315", branch: "CSE" },
  { name: "Paramapogu Sowmika Helsiba", roll: "249XA05219", branch: "CSE" },
  { name: "Peshmam Faseeha Samreen", roll: "249XA05225", branch: "CSE" },
  { name: "Mohammad Ismail", roll: "249XA05229", branch: "CSE" },
  { name: "V. Mokshith", roll: "249XA05316", branch: "CSE" },
  { name: "Gujarathi Preethi", roll: "249XA05086", branch: "CSE" },
  { name: "Girigari Kashma", roll: "249XA33024", branch: "CSM" },
  { name: "Thamatam Bharath Kumar Reddy", roll: "249XA33186", branch: "CSM" },
  { name: "P. Kavya", roll: "L.E", branch: "CSM" },
  { name: "Shaik Afifa Tabassum", roll: "249XA33153", branch: "CSM" },
  { name: "Bakki Reddy Gari Siri Reddy", roll: "249XA04006", branch: "ECE" },
  { name: "Bestha Vidya Dharani", roll: "249XA04018", branch: "ECE" },
  { name: "Karapakula Lakshmi Nivas", roll: "249XA04108", branch: "ECE" },
  { name: "K. Sai Dedeepya", roll: "249XA04084", branch: "ECE" },
  { name: "Nethi Hitesh", roll: "249XA04130", branch: "ECE" },
  { name: "Seepala Madhu Sri", roll: "249XA02087", branch: "EEE" },
  { name: "Sowjanya", roll: "249XA02023", branch: "EEE" },
  { name: "Saginala Praneeth", roll: "249XA03087", branch: "ME" },
  { name: "Boya Venkatesh", roll: "249XA03060", branch: "ME" }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'coordinators'>('home');
  const [activeBatch, setActiveBatch] = useState<'2027' | '2028'>('2028');

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

  const currentBatchData = activeBatch === '2028' ? batch2028 : batch2027;

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
          <button 
            onClick={() => setActiveTab('coordinators')}
            className={`text-[11px] sm:text-[13px] tracking-[0.15em] uppercase font-sans transition-all duration-300 ${activeTab === 'coordinators' ? 'opacity-100 font-medium underline underline-offset-[6px] decoration-1' : 'opacity-50 hover:opacity-100'}`}
          >
            Coordinators
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

          {activeTab === 'coordinators' && (
            <motion.div
              key="coordinators"
              variants={viewVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-4xl w-full flex flex-col items-center text-center mt-8 sm:mt-12 h-full"
            >
              <h2 className="text-[2rem] sm:text-[3.5rem] font-serif tracking-tight mb-6 sm:mb-8 text-[#1C1C1C]">
                The Coordinators.
              </h2>
              
              {/* Batch Toggle */}
              <div className="flex items-center bg-[#1C1C1C]/5 p-1 rounded-full mb-8 border border-[#1C1C1C]/10">
                <button
                  onClick={() => setActiveBatch('2027')}
                  className={`px-6 py-2 rounded-full text-[13px] font-sans font-medium transition-all duration-300 ${activeBatch === '2027' ? 'bg-[#1C1C1C] text-[#F9F8F6] shadow-md' : 'text-[#1C1C1C] opacity-70 hover:opacity-100'}`}
                >
                  Batch 2027
                </button>
                <button
                  onClick={() => setActiveBatch('2028')}
                  className={`px-6 py-2 rounded-full text-[13px] font-sans font-medium transition-all duration-300 ${activeBatch === '2028' ? 'bg-[#1C1C1C] text-[#F9F8F6] shadow-md' : 'text-[#1C1C1C] opacity-70 hover:opacity-100'}`}
                >
                  Batch 2028
                </button>
              </div>

              {/* Scrollable List Container */}
              <div className="w-full max-h-[50vh] sm:max-h-[55vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2 relative mask-image-bottom">
                <div className="flex flex-col gap-2 w-full max-w-3xl mx-auto pb-10">
                  {currentBatchData.map((student, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03, duration: 0.3 }}
                      key={idx} 
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl hover:bg-[#1C1C1C]/5 transition-colors duration-300 text-left border border-transparent hover:border-[#1C1C1C]/5"
                    >
                      <span className="font-serif text-[15px] sm:text-[17px] font-medium text-[#1C1C1C] mb-1 sm:mb-0">
                        {student.name}
                      </span>
                      <div className="flex items-center gap-3 font-sans text-[12px] sm:text-[13px] text-[#1C1C1C] opacity-70">
                        <span className="tracking-widest uppercase">{student.branch}</span>
                        <span className="w-1 h-1 rounded-full bg-[#1C1C1C]/30"></span>
                        <span className="font-mono tracking-wider">{student.roll}</span>
                      </div>
                    </motion.div>
                  ))}
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
