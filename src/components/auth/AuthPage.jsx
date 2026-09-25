import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Sparkles, ShieldCheck, Check } from 'lucide-react';
import heroImage from '../../assets/hero-image.png';

export default function AuthPage({ initialMode = 'login', onBackToHome, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rememberMe: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    }, 800);
  };

  return (
    <div className="w-screen min-h-screen bg-[#FAF7F2] text-[#271B14] flex flex-col justify-between p-4 sm:p-6 md:p-8 font-sans select-none fixed inset-0 z-50 overflow-y-auto">
      {/* Top Header */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between mb-4 sm:mb-8">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#EFE9E0] hover:bg-[#E4DDD2] text-[#795745] font-semibold text-xs sm:text-sm shadow-2xs transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </button>

        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#EFE9E0] flex items-center justify-center shadow-xs">
            <svg
              className="w-5 h-5 text-[#795745] fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C10.34 2 9 3.34 9 5c0 1.3.84 2.4 2 2.82V9H9.82C9.4 7.84 8.3 7 7 7 5.34 7 4 8.34 4 10s1.34 3 3 3c1.3 0 2.4-.84 2.82-2H11v1.18c-1.16.42-2 1.52-2 2.82 0 1.66 1.34 3 3 3s3-1.34 3-3c0-1.3-.84-2.4-2-2.82V11h1.18c.42 1.16 1.52 2 2.82 2 1.66 0 3-1.34 3-3s-1.34-3-3-3c-1.3 0-2.4.84-2.82 2H13V7.82c1.16-.42 2-1.52 2-2.82 0-1.66-1.34-3-3-3z" />
            </svg>
          </div>
          <span className="font-heading-hero font-bold text-xl text-[#271B14] tracking-tight">
            Data AI
          </span>
        </div>
      </div>

      {/* Main Center Auth Container */}
      <div className="w-full max-w-5xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Form Container */}
        <div className="lg:col-span-7 bg-white border border-[#E8E2D8] rounded-[32px] sm:rounded-[36px] p-6 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(39,27,20,0.06)] flex flex-col justify-between">
          <div>
            {/* Mode Switcher Tabs */}
            <div className="flex items-center p-1 bg-[#FAF7F2] rounded-full w-fit mb-6 border border-[#E8E2D8]">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  isLogin
                    ? 'bg-[#271B14] text-white shadow-xs'
                    : 'text-[#78685C] hover:text-[#271B14]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  !isLogin
                    ? 'bg-[#271B14] text-white shadow-xs'
                    : 'text-[#78685C] hover:text-[#271B14]'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Title & Subtitle */}
            <h2 className="font-heading-hero text-2xl sm:text-3xl font-bold text-[#271B14] mb-2 tracking-tight">
              {isLogin ? 'Welcome Back to Data AI' : 'Start Building Autonomous Pipelines'}
            </h2>
            <p className="text-xs sm:text-sm text-[#78685C] mb-6">
              {isLogin
                ? 'Enter your credentials to access your autonomous data workspaces.'
                : 'Join top data teams and unlock AI-driven database & web intelligence.'}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {!isLogin && (
                <div>
                  <label className="block text-xs font-semibold text-[#271B14] mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#A3968B] absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Judha Pratama"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#E0D8CC] rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-[#271B14] placeholder-[#A3968B] focus:outline-hidden focus:border-[#E67246] transition-colors"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#271B14] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#A3968B] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#E0D8CC] rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-[#271B14] placeholder-[#A3968B] focus:outline-hidden focus:border-[#E67246] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#271B14] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#A3968B] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#E0D8CC] rounded-2xl pl-11 pr-11 py-3 text-xs sm:text-sm text-[#271B14] placeholder-[#A3968B] focus:outline-hidden focus:border-[#E67246] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A3968B] hover:text-[#271B14]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Extra Row */}
              <div className="flex items-center justify-between text-xs text-[#78685C] pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    className="w-3.5 h-3.5 accent-[#7E9C79] rounded"
                  />
                  <span>Remember me for 30 days</span>
                </label>

                {isLogin && (
                  <a href="#forgot" className="text-[#E67246] hover:underline font-medium">
                    Forgot password?
                  </a>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-3 py-3.5 rounded-full bg-[#E67246] hover:bg-[#D46135] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>{isLogin ? 'Sign In to Workspace' : 'Create Free Account'}</span>
                )}
              </button>
            </form>
          </div>

          {/* Footer note */}
          <p className="text-[11px] text-[#A3968B] text-center mt-6">
            By signing up, you agree to Data AI's{' '}
            <a href="#" className="underline hover:text-[#271B14]">Terms of Service</a> and{' '}
            <a href="#" className="underline hover:text-[#271B14]">Privacy Policy</a>.
          </p>
        </div>

        {/* Right Side: Feature Highlight & 3D Artwork */}
        <div className="lg:col-span-5 bg-[#38261B] text-[#FFFDF9] rounded-[32px] sm:rounded-[36px] p-8 sm:p-10 shadow-[0_20px_50px_rgba(56,38,27,0.25)] flex flex-col justify-between min-h-[460px] relative overflow-hidden">
          {/* Top Tag */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider text-white/90 mb-4">
              <Sparkles className="w-3 h-3 text-[#E67246]" />
              Enterprise AI Intelligence
            </div>

            <h3 className="font-heading-hero text-2xl font-bold text-white mb-2 leading-snug">
              Autonomous Data Pipelines for Hackathon Champions
            </h3>
            <p className="text-xs sm:text-sm text-[#D8CCC0] leading-relaxed">
              Connect relational tables, scrape protected web endpoints, and normalize messy schemas in seconds.
            </p>
          </div>

          {/* 3D Modular Block Image Graphic */}
          <div className="my-6 flex items-center justify-center relative">
            <img
              src={heroImage}
              alt="Data AI Modular Stack"
              className="w-48 sm:w-56 h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.4)]"
            />
          </div>

          {/* Bottom Security Assurance */}
          <div className="pt-4 border-t border-[#4E3729] flex items-center gap-2 text-xs text-[#D8CCC0]">
            <ShieldCheck className="w-4 h-4 text-[#7E9C79]" />
            <span>SOC2 Type II Certified & End-to-End Encrypted</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-[#A3968B] mt-4">
        © 2026 Data AI Platform. All rights reserved.
      </div>
    </div>
  );
}
