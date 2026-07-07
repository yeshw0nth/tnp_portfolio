import Link from 'next/link';
import { ArrowRight, ClipboardEdit } from 'lucide-react';

export default function Home() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6 selection:bg-black selection:text-white font-sans text-gray-900"
      style={{ backgroundImage: 'url("/textures/crushed_paper_texture.png")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      <div className="max-w-4xl w-full text-center relative z-10">
        <h1 className="text-[3.5rem] sm:text-[5.5rem] leading-none font-light tracking-tighter text-gray-900 mb-8">
          GPREC T&P <br className="sm:hidden" /><span className="font-medium tracking-tight">Recruitment</span>
        </h1>
        <p className="text-xl sm:text-2xl font-light text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed tracking-wide">
          Welcome to the Phase 0 selection drive. Please complete your registration and proceed to the psychometric assessment.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
          <Link 
            href="/register"
            className="group flex items-center justify-center gap-4 w-full sm:w-auto px-10 py-6 bg-white/70 backdrop-blur-xl border border-white/50 text-gray-900 rounded-[2rem] text-xl font-medium hover:bg-white hover:border-gray-200 hover:shadow-[0_10px_40px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1"
          >
            <ClipboardEdit className="w-6 h-6 text-gray-400 group-hover:text-black transition-colors" strokeWidth={1.5} />
            Phase 0 Registration
          </Link>

          <Link 
            href="/test"
            className="group flex items-center justify-center gap-4 w-full sm:w-auto px-10 py-6 bg-black text-white rounded-[2rem] text-xl font-medium shadow-[0_10px_30px_rgb(0,0,0,0.2)] hover:bg-gray-900 hover:shadow-[0_20px_40px_rgb(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1"
          >
            Take Psychometric Test
            <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}
