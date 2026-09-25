import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import HeroGraphic from './HeroGraphic';

export default function HeroSection({ onStartChat, onSelectCallout }) {
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([titleLine1Ref.current, titleLine2Ref.current], {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full max-w-[1360px] mx-auto px-4 sm:px-8 pt-8 sm:pt-14 pb-16 flex flex-col items-center text-center">
      {/* Hero Headline */}
      <h1 className="flex flex-col items-center justify-center font-heading-hero text-[#271B14] tracking-tight leading-[1.08] sm:leading-[1.04] text-4xl sm:text-6xl md:text-7xl lg:text-[78px] font-bold select-none max-w-5xl mx-auto">
        <span ref={titleLine1Ref} className="block">
          Intelligent All-Purpose
        </span>
        <span ref={titleLine2Ref} className="block mt-1 sm:mt-2">
          Data AI Chatbot
        </span>
      </h1>

      {/* Hero 3D Graphic with Animated Callouts */}
      <HeroGraphic
        onStartChat={onStartChat}
        onSelectCallout={onSelectCallout}
      />
    </section>
  );
}
