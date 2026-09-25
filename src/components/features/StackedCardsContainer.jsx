import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DataIntegritySection from './DataIntegritySection';
import WhatOurAiDoesSection from './WhatOurAiDoesSection';
import TeamSection from '../team/TeamSection';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function StackedCardsContainer({ onOpenChat }) {
  const containerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const card2 = card2Ref.current;
      const card3 = card3Ref.current;
      const card1 = card1Ref.current;

      if (!card1 || !card2 || !card3) return;

      // Set initial positions for cards 2 and 3 (offscreen bottom)
      gsap.set(card2, { yPercent: 100, scale: 0.95, opacity: 0.8 });
      gsap.set(card3, { yPercent: 100, scale: 0.95, opacity: 0.8 });

      // Create a master pinned timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=2400',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 1. Pull Card 2 (What Our AI Does) up over Card 1 (Data Integrity)
      tl.to(
        card1,
        {
          scale: 0.92,
          opacity: 0.6,
          ease: 'power1.inOut',
        },
        'step1'
      )
      .to(
        card2,
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          ease: 'power1.inOut',
        },
        'step1'
      );

      // 2. Pull Card 3 (Meet Our Team) up over Card 2
      tl.to(
        card2,
        {
          scale: 0.92,
          opacity: 0.6,
          ease: 'power1.inOut',
        },
        'step2'
      )
      .to(
        card3,
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          ease: 'power1.inOut',
        },
        'step2'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Layer 1: Data Integrity */}
      <div
        ref={card1Ref}
        className="absolute inset-0 w-full h-full flex flex-col justify-start will-change-transform z-10"
      >
        <DataIntegritySection
          onSelectIntegration={() => onOpenChat('database')}
        />
      </div>

      {/* Layer 2: What Our AI Does */}
      <div
        ref={card2Ref}
        className="absolute inset-0 w-full h-full flex flex-col justify-start will-change-transform z-20"
      >
        <WhatOurAiDoesSection
          onSelectCapability={(id) => onOpenChat(id)}
        />
      </div>

      {/* Layer 3: Meet Our Team */}
      <div
        ref={card3Ref}
        className="absolute inset-0 w-full h-full flex flex-col justify-start will-change-transform z-30"
      >
        <TeamSection />
      </div>
    </div>
  );
}
