"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ChevronRight, Loader2, X, Check, UserCheck, Shield } from "lucide-react";

interface Profile {
  id?: string;
  roll_number: string;
  full_name: string;
  department?: string;
  blog_content?: string;
  psychometric_answers?: any;
}

export default function AdminDashboard() {
  const [organizerName, setOrganizerName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [candidates, setCandidates] = useState<Profile[]>([]);
  const [isLoadingQueue, setIsLoadingQueue] = useState(false);

  const [selectedCandidate, setSelectedCandidate] = useState<Profile | null>(null);
  const [blogScore, setBlogScore] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Hardcoded organizers or could be dynamic
  const organizers = [
    "Alice (Tech Lead)",
    "Bob (Design Lead)",
    "Charlie (HR)",
    "Diana (Director)",
    "Master Passcode Entry"
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (organizerName) {
      setIsAuthenticated(true);
      fetchCandidates();
    }
  };

  const fetchCandidates = async () => {
    setIsLoadingQueue(true);
    try {
      // Fetch only candidates who have submitted their blog content
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .not('blog_content', 'is', null);

      if (error) throw error;

      if (data) {
        // Filter out empty strings just to be safe
        const valid = data.filter(c => c.blog_content && c.blog_content.trim() !== "");
        setCandidates(valid);
      }
    } catch (e: any) {
      console.error("Error fetching queue:", e.message);
    } finally {
      setIsLoadingQueue(false);
    }
  };

  const submitEvaluation = async (status: 'Selected' | 'Not Selected') => {
    if (!selectedCandidate) return;
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Insert decision into evaluations table
      const { error } = await supabase
        .from('evaluations')
        .insert({
          candidate_id: selectedCandidate.id || selectedCandidate.roll_number,
          blog_score: blogScore,
          status: status,
          reviewed_by: organizerName
        });

      if (error) throw error;

      // Immediately remove from local pending queue
      setCandidates(prev => prev.filter(c => c.roll_number !== selectedCandidate.roll_number));
      setSelectedCandidate(null);
      setBlogScore(5); // Reset slider for next candidate
    } catch (error: any) {
      setSubmitError(error.message || "Failed to submit evaluation. Check database connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-6 selection:bg-black selection:text-white"
        style={{ backgroundImage: 'url("/textures/crushed_paper_texture.png")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
      >
        <div className="max-w-md w-full relative z-10">
          <div className="text-center mb-10">
            <Shield className="w-16 h-16 mx-auto mb-6 text-gray-900" strokeWidth={1} />
            <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-3">Organizer Access</h1>
            <p className="text-gray-500 font-light text-lg">Identify yourself to begin the evaluation phase.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8 bg-white/60 backdrop-blur-xl p-10 sm:p-12 rounded-[2rem] border border-white/50 shadow-2xl">
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-700 tracking-wider uppercase ml-1">Select Identity</label>
              <div className="relative">
                <select
                  required
                  value={organizerName}
                  onChange={(e) => setOrganizerName(e.target.value)}
                  className="block w-full pl-6 pr-10 py-5 bg-white/60 border border-gray-200 rounded-2xl text-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 cursor-pointer hover:bg-white"
                >
                  <option value="" disabled>Choose your profile...</option>
                  {organizers.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-5 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center py-5 rounded-2xl text-lg font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-black transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.2)]"
              >
                Enter Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex overflow-hidden selection:bg-black selection:text-white font-sans text-gray-900"
      style={{ backgroundImage: 'url("/textures/crushed_paper_texture.png")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.2); }
      `}} />

      {/* Main Queue Area */}
      <div className={`flex-1 transition-all duration-700 ease-in-out ${selectedCandidate ? 'pr-[100vw] sm:pr-[600px] lg:pr-[700px] xl:pr-[900px] opacity-30 sm:opacity-100 pointer-events-none sm:pointer-events-auto' : ''}`}>
        <div className="max-w-5xl mx-auto px-6 sm:px-12 py-16 h-full overflow-y-auto custom-scrollbar">
          <header className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between border-b border-gray-200/50 pb-8 gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-light tracking-tight mb-3 text-black">Candidate Queue</h1>
              <p className="text-xl text-gray-500 font-light">Pending Evaluation Phase</p>
            </div>
            <div className="flex items-center gap-3 bg-white/50 px-6 py-3 rounded-full backdrop-blur-md shadow-sm border border-white/60">
              <UserCheck className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium tracking-wide text-gray-700">{organizerName}</span>
            </div>
          </header>

          {isLoadingQueue ? (
            <div className="flex flex-col items-center justify-center py-40 text-gray-400">
              <Loader2 className="w-12 h-12 animate-spin mb-6" strokeWidth={1} />
              <p className="font-light text-xl">Loading pending candidates...</p>
            </div>
          ) : candidates.length === 0 ? (
            <div className="text-center py-40 bg-white/40 backdrop-blur-md rounded-[3rem] border border-dashed border-gray-300/80 shadow-sm">
              <Check className="w-16 h-16 text-emerald-400/80 mx-auto mb-6" strokeWidth={1} />
              <h3 className="text-3xl font-light text-gray-800 mb-2 tracking-tight">Queue is empty</h3>
              <p className="text-gray-500 font-light text-lg">All submitted tests have been completely graded.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {candidates.map(candidate => (
                <div 
                  key={candidate.roll_number}
                  onClick={() => { setSelectedCandidate(candidate); setBlogScore(5); setSubmitError(""); }}
                  className={`group flex items-center justify-between p-8 sm:p-10 bg-white/60 backdrop-blur-xl rounded-[2rem] border transition-all duration-300 cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 ${selectedCandidate?.roll_number === candidate.roll_number ? 'border-black/30 shadow-md ring-4 ring-black/5' : 'border-white/60 hover:border-gray-200'}`}
                >
                  <div>
                    <h3 className="text-3xl font-light text-gray-900 mb-3 group-hover:text-black transition-colors tracking-tight">{candidate.full_name}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-gray-500 font-light">
                      <span className="bg-gray-100/80 px-4 py-1.5 rounded-lg text-sm tracking-widest uppercase font-medium">{candidate.roll_number}</span>
                      {candidate.department && <span className="text-base border-l-2 border-gray-200 pl-4">{candidate.department}</span>}
                    </div>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-300 shrink-0 shadow-sm group-hover:shadow-lg">
                    <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" strokeWidth={2} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review Panel Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[600px] lg:w-[700px] xl:w-[900px] bg-[#fafafa]/95 backdrop-blur-3xl shadow-[-30px_0_80px_-15px_rgba(0,0,0,0.15)] border-l border-white/50 transform transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) z-40 flex flex-col ${selectedCandidate ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {selectedCandidate && (
          <>
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-8 sm:px-14 py-8 sm:py-10 border-b border-gray-200/50 bg-white/40 backdrop-blur-xl sticky top-0 z-10">
              <div>
                <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-gray-900 mb-2">{selectedCandidate.full_name}</h2>
                <p className="text-gray-500 font-medium tracking-widest uppercase text-sm">{selectedCandidate.roll_number}</p>
              </div>
              <button 
                onClick={() => setSelectedCandidate(null)}
                className="p-4 bg-white/80 hover:bg-gray-100 rounded-full transition-all duration-200 border border-gray-200 shadow-sm hover:scale-105"
              >
                <X className="w-6 h-6 text-gray-700" strokeWidth={2} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-8 sm:px-14 py-12 custom-scrollbar">
              <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-400 mb-8 border-b border-gray-200/50 pb-4">Blog Submission</h3>
              <div className="prose prose-xl max-w-none">
                <p className="text-[1.35rem] sm:text-2xl leading-[2] font-serif text-gray-800 whitespace-pre-wrap tracking-wide">
                  {selectedCandidate.blog_content}
                </p>
              </div>
            </div>

            {/* Fixed Grading Footer */}
            <div className="bg-white/90 backdrop-blur-2xl border-t border-gray-200/80 px-8 sm:px-14 py-10 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.06)] sticky bottom-0 z-10">
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 font-medium">
                  {submitError}
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-12 mb-10">
                <div className="flex-1">
                  <label className="flex justify-between items-end mb-6">
                    <span className="text-base font-semibold tracking-widest uppercase text-gray-500">Content Score</span>
                    <span className="text-sm text-gray-400 font-light">Drag to adjust</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={blogScore}
                    onChange={(e) => setBlogScore(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-black transition-all hover:bg-gray-300"
                  />
                  <div className="flex justify-between text-sm text-gray-400 font-medium mt-4 px-1">
                    <span>0</span>
                    <span>5</span>
                    <span>10</span>
                  </div>
                </div>
                
                <div className="w-full sm:w-40 flex justify-center sm:justify-end shrink-0">
                  <div className="text-[5rem] sm:text-[6rem] leading-none font-bold tracking-tighter text-gray-900 font-sans tabular-nums drop-shadow-sm">
                    {blogScore}<span className="text-4xl sm:text-5xl text-gray-300 font-light tracking-normal">/10</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <button
                  onClick={() => submitEvaluation('Not Selected')}
                  disabled={isSubmitting}
                  className="py-5 sm:py-6 rounded-2xl text-lg sm:text-xl font-medium text-gray-600 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:text-black focus:outline-none transition-all duration-300 disabled:opacity-50"
                >
                  Not Selected
                </button>
                <button
                  onClick={() => submitEvaluation('Selected')}
                  disabled={isSubmitting}
                  className="py-5 sm:py-6 rounded-2xl text-lg sm:text-xl font-medium text-white bg-black hover:bg-gray-900 shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] hover:-translate-y-1 focus:outline-none transition-all duration-300 disabled:opacity-70 flex justify-center items-center gap-3"
                >
                  {isSubmitting && <Loader2 className="w-6 h-6 animate-spin" />}
                  Select Candidate
                </button>
              </div>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
