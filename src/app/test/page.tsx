"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";

export default function TestPortal() {
  const [isMounted, setIsMounted] = useState(false);
  const [rollNumber, setRollNumber] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [blogContent, setBlogContent] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Load state from local storage on mount to act as a safety net
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("test_portal_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.rollNumber) setRollNumber(parsed.rollNumber);
        if (parsed.answers) setAnswers(parsed.answers);
        if (parsed.blogContent) setBlogContent(parsed.blogContent);
      } catch (e) {
        console.error("Failed to parse local storage data.");
      }
    }
  }, []);

  // Save to local storage whenever a field changes
  useEffect(() => {
    if (isMounted) {
      if (rollNumber || Object.keys(answers).length > 0 || blogContent) {
        localStorage.setItem("test_portal_data", JSON.stringify({ rollNumber, answers, blogContent }));
      }
    }
  }, [rollNumber, answers, blogContent, isMounted]);

  const questions = [
    {
      id: "q1",
      text: "1. How do you typically handle tight, unexpected deadlines?",
      options: [
        "I systematically break down the tasks and prioritize.",
        "I immediately communicate with my team to delegate and share the load.",
        "I prefer to dive in and work extended hours until it's done."
      ]
    },
    {
      id: "q2",
      text: "2. Which of the following best describes your ideal work environment?",
      options: [
        "A highly collaborative space with constant team interaction.",
        "A quiet, independent setting where I can focus deeply.",
        "A structured environment with clear direction and specific milestones."
      ]
    },
    {
      id: "q3",
      text: "3. When faced with a complex, unfamiliar problem, what is your first step?",
      options: [
        "I spend time researching and analyzing similar past problems.",
        "I organize a brainstorming session with peers to gather diverse perspectives.",
        "I experiment with small, iterative solutions to learn by doing."
      ]
    }
  ];

  const handleStartTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (rollNumber.trim().length > 0) {
      setIsAuthenticated(true);
    }
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      setErrorMsg("Please complete all psychometric questions before submitting.");
      return;
    }
    if (blogContent.trim().length < 10) {
      setErrorMsg("Please write some content in the blog section before submitting.");
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);

    // Jittered Submission: Random delay between 2000ms and 15000ms
    const delay = Math.floor(Math.random() * (15000 - 2000 + 1)) + 2000;
    await new Promise(resolve => setTimeout(resolve, delay));

    try {
      // Execute a Supabase update to the profiles table
      const { error } = await supabase
        .from('profiles')
        .update({ 
          psychometric_answers: answers, 
          blog_content: blogContent 
        })
        .eq('roll_number', rollNumber);

      if (error) {
        throw error;
      }

      // Clear local storage upon success
      localStorage.removeItem("test_portal_data");
      setIsSuccess(true);
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to submit test. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Avoid hydration mismatch by waiting for mount
  if (!isMounted) return null;

  // Completion screen
  if (isSuccess) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-6 selection:bg-black selection:text-white"
        style={{ backgroundImage: 'url("/textures/crushed_paper_texture.png")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
      >
        <div className="max-w-md w-full bg-white/60 backdrop-blur-xl rounded-[2rem] p-16 text-center border border-white/50 shadow-2xl">
          <CheckCircle2 className="w-24 h-24 text-black mx-auto mb-10" strokeWidth={1} />
          <h2 className="text-4xl font-light text-gray-900 mb-6 tracking-tight">Test Submitted Successfully</h2>
          <p className="text-gray-600 leading-relaxed font-light text-xl">
            Thank you for completing the assessment. You may now close this window safely.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen selection:bg-black selection:text-white font-sans text-gray-900"
      style={{ backgroundImage: 'url("/textures/crushed_paper_texture.png")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      {!isAuthenticated ? (
        // Entry Screen
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-lg relative z-10">
            <h1 className="text-5xl font-light tracking-tight text-center mb-12">Candidate Entry</h1>
            <form onSubmit={handleStartTest} className="flex flex-col gap-8">
              <div className="space-y-4">
                <input
                  type="text"
                  required
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="block w-full px-8 py-6 bg-transparent border-b-2 border-black/20 text-center text-3xl font-light text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black transition-colors duration-300"
                  placeholder="Enter Roll Number"
                />
              </div>
              <button
                type="submit"
                className="mx-auto flex items-center justify-center gap-3 py-4 px-10 rounded-full text-lg font-light text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-black transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                Begin Assessment <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        // Test Portal
        <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
          <header className="mb-24 flex items-center justify-between">
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight">Assessment Portal</h1>
            <div className="text-sm font-medium tracking-widest uppercase text-gray-500 bg-white/50 px-6 py-3 rounded-full backdrop-blur-md">
              {rollNumber}
            </div>
          </header>

          {errorMsg && (
            <div className="mb-16 p-6 bg-red-50/50 backdrop-blur-md border-l-4 border-red-500 text-red-700 text-lg font-light">
              {errorMsg}
            </div>
          )}

          <div className="space-y-32">
            {/* Psychometric Section */}
            <section>
              <div className="mb-16">
                <h2 className="text-3xl font-light tracking-tight mb-4 text-black">Part I: Psychometric Profile</h2>
                <p className="text-gray-600 font-light text-xl leading-relaxed">Please select the response that most accurately reflects your natural tendencies.</p>
              </div>

              <div className="space-y-16 pl-0 sm:pl-8">
                {questions.map((q) => (
                  <div key={q.id} className="space-y-8">
                    <p className="text-2xl font-normal text-gray-900 leading-relaxed tracking-wide">{q.text}</p>
                    <div className="space-y-4">
                      {q.options.map((option, idx) => (
                        <label 
                          key={idx} 
                          className={`group flex items-start gap-6 p-6 rounded-2xl cursor-pointer transition-all duration-300 ${answers[q.id] === option ? 'bg-white/60 shadow-lg scale-[1.01]' : 'hover:bg-white/40'}`}
                        >
                          <div className="flex items-center h-8 pt-1">
                            <input
                              type="radio"
                              name={q.id}
                              value={option}
                              checked={answers[q.id] === option}
                              onChange={() => handleAnswer(q.id, option)}
                              className="w-6 h-6 text-black border-2 border-gray-400 focus:ring-black focus:ring-offset-2 focus:ring-offset-transparent bg-transparent transition-colors cursor-pointer"
                            />
                          </div>
                          <span className={`text-xl leading-relaxed ${answers[q.id] === option ? 'text-black font-medium' : 'text-gray-600 font-light group-hover:text-gray-800'}`}>
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Blog Section */}
            <section>
              <div className="mb-16">
                <h2 className="text-3xl font-light tracking-tight mb-4 text-black">Part II: Creative Expression</h2>
                <p className="text-gray-600 font-light text-xl leading-relaxed">Explore a topic of your choice. Do not worry about formatting—just let your ideas flow into the canvas.</p>
              </div>

              <div className="pl-4 sm:pl-10 border-l-[3px] border-black/10 py-4 transition-colors duration-500 focus-within:border-black/40">
                <textarea
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  placeholder="Begin writing..."
                  className="w-full min-h-[50vh] bg-transparent border-none outline-none ring-0 resize-none text-[1.35rem] sm:text-2xl leading-[1.8] text-gray-800 placeholder-gray-300 font-serif tracking-wide"
                />
              </div>
            </section>

            {/* Submit Area */}
            <div className="pt-16 pb-24 flex justify-center sm:justify-end">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="py-6 px-16 rounded-full text-xl font-light text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-black transition-all duration-300 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1"
              >
                Submit Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Jittered Submission Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f8f9fa]/80 backdrop-blur-xl transition-all duration-500">
          <div className="text-center flex flex-col items-center">
            <Loader2 className="w-16 h-16 text-black animate-spin mb-10" strokeWidth={1} />
            <p className="text-3xl font-light tracking-widest text-gray-900 animate-pulse uppercase">Securing submission</p>
            <p className="text-gray-500 mt-6 font-light text-lg tracking-wide">Please do not close or refresh this window.</p>
          </div>
        </div>
      )}
    </div>
  );
}
