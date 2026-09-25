import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#2C1D14] text-[#A6988D] py-10 border-t border-[#3D291D]">
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-12 md:px-20 lg:px-28 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-[#3D291D] flex items-center justify-center">
            <svg
              className="w-3.5 h-3.5 text-[#E8DDD3] fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C10.34 2 9 3.34 9 5c0 1.3.84 2.4 2 2.82V9H9.82C9.4 7.84 8.3 7 7 7 5.34 7 4 8.34 4 10s1.34 3 3 3c1.3 0 2.4-.84 2.82-2H11v1.18c-1.16.42-2 1.52-2 2.82 0 1.66 1.34 3 3 3s3-1.34 3-3c0-1.3-.84-2.4-2-2.82V11h1.18c.42 1.16 1.52 2 2.82 2 1.66 0 3-1.34 3-3s-1.34-3-3-3c-1.3 0-2.4.84-2.82 2H13V7.82c1.16-.42 2-1.52 2-2.82 0-1.66-1.34-3-3-3z" />
            </svg>
          </div>
          <span className="font-semibold text-white">Data AI</span>
          <span>© 2026. Built for Hackathon Excellence.</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-[#A6988D]">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">API Docs</a>
        </div>
      </div>
    </footer>
  );
}
