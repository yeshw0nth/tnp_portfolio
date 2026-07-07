"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, Loader2, User, Mail, Phone, BookOpen, GraduationCap } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    roll_number: "",
    email: "",
    phone: "",
    whatsapp_number: "",
    department: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('profiles').insert([formData]);

      if (error) {
        throw error;
      }

      setIsSuccess(true);
    } catch (error: any) {
      setErrorMsg(error.message || "An error occurred during registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-6 selection:bg-black selection:text-white"
        style={{ backgroundImage: 'url("/textures/crushed_paper_texture.png")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
      >
        <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-12 text-center border border-gray-100/50">
          <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-8" strokeWidth={1.5} />
          <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">Registration Successful</h2>
          <p className="text-gray-500 leading-relaxed font-light text-lg">
            Thank you for registering. Your details have been securely recorded in our system.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 selection:bg-black selection:text-white font-sans text-gray-900"
      style={{ backgroundImage: 'url("/textures/crushed_paper_texture.png")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      <div className="max-w-2xl w-full bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] overflow-hidden border border-white/60">
        <div className="px-8 pt-12 pb-10 sm:px-14">
          <div className="text-center sm:text-left mb-12">
            <h1 className="text-4xl font-light tracking-tight mb-3">Join Us</h1>
            <p className="text-gray-500 text-lg font-light">Fill in your details below to complete your registration.</p>
          </div>

          {errorMsg && (
            <div className="mb-8 p-5 bg-red-50/80 backdrop-blur-sm border border-red-100 rounded-2xl text-red-600 text-sm font-medium flex items-center gap-3">
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
              {/* Full Name */}
              <div className="space-y-2.5">
                <label htmlFor="full_name" className="text-sm font-medium text-gray-700 tracking-wide ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-black">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
                  </div>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    required
                    value={formData.full_name}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-4 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Roll Number */}
              <div className="space-y-2.5">
                <label htmlFor="roll_number" className="text-sm font-medium text-gray-700 tracking-wide ml-1">Roll Number</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <GraduationCap className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
                  </div>
                  <input
                    type="text"
                    id="roll_number"
                    name="roll_number"
                    required
                    value={formData.roll_number}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-4 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    placeholder="e.g. 21X01A0500"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2.5 sm:col-span-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 tracking-wide ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-4 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2.5">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700 tracking-wide ml-1">Phone Number</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-4 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              {/* WhatsApp Number */}
              <div className="space-y-2.5">
                <label htmlFor="whatsapp_number" className="text-sm font-medium text-gray-700 tracking-wide ml-1">WhatsApp Number</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
                  </div>
                  <input
                    type="tel"
                    id="whatsapp_number"
                    name="whatsapp_number"
                    required
                    value={formData.whatsapp_number}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-4 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              {/* Department */}
              <div className="space-y-2.5 sm:col-span-2">
                <label htmlFor="department" className="text-sm font-medium text-gray-700 tracking-wide ml-1">Department</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <BookOpen className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
                  </div>
                  <select
                    id="department"
                    name="department"
                    required
                    value={formData.department}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-10 py-4 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 cursor-pointer"
                  >
                    <option value="" disabled>Select your department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics and Communication">Electronics and Communication</option>
                    <option value="Electrical and Electronics">Electrical and Electronics</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center py-4 px-8 border border-transparent rounded-2xl shadow-[0_4px_14px_0_rgb(0,0,0,0.2)] text-lg font-medium text-white bg-black hover:bg-gray-900 hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-[0_4px_14px_0_rgb(0,0,0,0.2)]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" />
                    Processing...
                  </>
                ) : (
                  'Submit Registration'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
