import React from 'react';
import { NAV_LINKS } from '../../utils/constants';

export default function Navbar({ onOpenChat, onOpenAuth }) {
  return (
    <header className="w-full max-w-[1360px] mx-auto px-6 sm:px-12 pt-8 pb-4 flex items-center justify-between relative z-20">
      {/* Brand Logo - 4-petal floral clover */}
      <div className="flex items-center">
        <a href="#" className="group flex items-center">
          <div className="w-12 h-12 rounded-[18px] bg-[#EFE9E0] hover:bg-[#E6DFD4] flex items-center justify-center transition-all duration-300 group-hover:scale-105">
            <svg
              className="w-6 h-6 text-[#795745] fill-current transition-transform duration-500 group-hover:rotate-45"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C10.34 2 9 3.34 9 5c0 1.3.84 2.4 2 2.82V9H9.82C9.4 7.84 8.3 7 7 7 5.34 7 4 8.34 4 10s1.34 3 3 3c1.3 0 2.4-.84 2.82-2H11v1.18c-1.16.42-2 1.52-2 2.82 0 1.66 1.34 3 3 3s3-1.34 3-3c0-1.3-.84-2.4-2-2.82V11h1.18c.42 1.16 1.52 2 2.82 2 1.66 0 3-1.34 3-3s-1.34-3-3-3c-1.3 0-2.4.84-2.82 2H13V7.82c1.16-.42 2-1.52 2-2.82 0-1.66-1.34-3-3-3z" />
            </svg>
          </div>
        </a>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-8 lg:gap-11">
        {NAV_LINKS.map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            className={`text-sm lg:text-[15px] transition-colors duration-200 ${
              link.active
                ? 'text-[#271B14] font-bold tracking-tight'
                : 'text-[#736357] font-medium hover:text-[#271B14]'
            }`}
          >
            {link.name}
          </a>
        ))}
      </nav>

      {/* Right Action / Auth Buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onOpenAuth && onOpenAuth('signup')}
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#5E5147] bg-[#EFE9E0] hover:bg-[#E5DFD4] rounded-full transition-all duration-200 cursor-pointer active:scale-95"
        >
          <span>Signing</span>
          <span className="text-xs font-semibold">→</span>
        </button>

        <button
          type="button"
          onClick={() => onOpenAuth && onOpenAuth('login')}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#271B14] bg-[#EFE9E0] hover:bg-[#E5DFD4] rounded-full transition-all duration-200 shadow-xs active:scale-95 cursor-pointer"
        >
          <span>Login</span>
          <div className="w-5 h-5 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[11px] font-bold text-[#795745]">
            A
          </div>
        </button>
      </div>
    </header>
  );
}
