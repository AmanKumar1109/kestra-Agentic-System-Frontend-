import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import heroImage from '../../assets/hero-image.png';
import HeroCalloutBadge from './HeroCalloutBadge';
import { CALLOUT_ITEMS } from '../../utils/constants';
import { Play } from 'lucide-react';

export default function HeroGraphic({ onStartChat, onSelectCallout }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const leftBadgeRef = useRef(null);
  const topRightBadgeRef = useRef(null);
  const bottomRightBadgeRef = useRef(null);
  const ctaPillRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(imageRef.current, {
        scale: 0.88,
        opacity: 0,
        y: 35,
        duration: 1.1,
      })
      .from(
        [leftBadgeRef.current, topRightBadgeRef.current, bottomRightBadgeRef.current],
        {
          scale: 0.7,
          opacity: 0,
          y: 20,
          stagger: 0.15,
          duration: 0.8,
          ease: 'back.out(1.5)',
        },
        '-=0.6'
      )
      .from(
        ctaPillRef.current,
        {
          scale: 0.8,
          opacity: 0,
          y: 15,
          duration: 0.7,
          ease: 'back.out(1.8)',
        },
        '-=0.4'
      );

      // Smooth subtle floating animations
      gsap.to(imageRef.current, {
        y: -10,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(leftBadgeRef.current, {
        y: -6,
        x: -2,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.1,
      });

      gsap.to(topRightBadgeRef.current, {
        y: -8,
        x: 3,
        duration: 3.7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.4,
      });

      gsap.to(bottomRightBadgeRef.current, {
        y: -6,
        x: 2,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.7,
      });

      gsap.to(ctaPillRef.current, {
        y: -4,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const leftItem = CALLOUT_ITEMS.find((c) => c.position === 'left');
  const topRightItem = CALLOUT_ITEMS.find((c) => c.position === 'top-right');
  const bottomRightItem = CALLOUT_ITEMS.find((c) => c.position === 'bottom-right');

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[940px] mx-auto min-h-[440px] sm:min-h-[500px] md:min-h-[560px] flex items-center justify-center -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20 px-2"
    >
      {/* Central 3D Modular Block Render (Shifted upward for layered depth) */}
      <div
        ref={imageRef}
        className="relative z-0 w-[280px] sm:w-[380px] md:w-[460px] lg:w-[490px] aspect-square flex items-center justify-center"
      >
        <img
          src={heroImage}
          alt="3D Modular Intelligent Data Blocks"
          className="w-full h-full object-contain select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(39,27,20,0.12)]"
        />
      </div>

      {/* 1. Left Orange Badge */}
      {leftItem && (
        <div
          ref={leftBadgeRef}
          className="absolute left-0 sm:left-2 md:left-2 lg:left-0 top-[42%] -translate-y-1/2 z-10"
        >
          <HeroCalloutBadge
            item={leftItem}
            onClick={() => onSelectCallout(leftItem.id)}
          />
        </div>
      )}

      {/* 2. Top-Right Sage Green Badge */}
      {topRightItem && (
        <div
          ref={topRightBadgeRef}
          className="absolute right-0 sm:right-2 md:right-4 lg:right-4 top-[16%] sm:top-[18%] z-10"
        >
          <HeroCalloutBadge
            item={topRightItem}
            onClick={() => onSelectCallout(topRightItem.id)}
          />
        </div>
      )}

      {/* 3. Bottom-Right Dark Caramel Badge */}
      {bottomRightItem && (
        <div
          ref={bottomRightBadgeRef}
          className="absolute right-0 sm:right-2 md:right-2 lg:right-2 bottom-[14%] sm:bottom-[16%] z-10"
        >
          <HeroCalloutBadge
            item={bottomRightItem}
            onClick={() => onSelectCallout(bottomRightItem.id)}
          />
        </div>
      )}

      {/* 4. Bottom Floating Pill Button: "▷ Start Chatting" */}
      <div
        ref={ctaPillRef}
        className="absolute -bottom-2 sm:bottom-0 md:bottom-2 left-1/2 -translate-x-1/2 z-20"
      >
        <button
          onClick={onStartChat}
          className="group flex items-center gap-2.5 px-6 py-2.5 sm:px-7 sm:py-3 bg-white hover:bg-[#FAF7F2] text-[#271B14] rounded-full border border-[#E4DCCF] shadow-[0_10px_25px_-5px_rgba(39,27,20,0.12)] hover:shadow-[0_14px_30px_-5px_rgba(39,27,20,0.18)] transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          <Play className="w-3.5 h-3.5 fill-[#271B14] text-[#271B14] ml-0.5 group-hover:fill-[#E67246] group-hover:text-[#E67246] transition-colors" />
          <span className="text-sm sm:text-base font-semibold tracking-tight text-[#271B14]">
            Start Chatting
          </span>
        </button>
      </div>
    </div>
  );
}
