import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import heroImage from '../../assets/hero-image.png';
import { Settings, Briefcase, PieChart, RefreshCw } from 'lucide-react';

const INTEGRATION_ICONS = [
  {
    id: 'settings',
    label: 'Custom ETL & Pipeline Config',
    icon: Settings,
  },
  {
    id: 'enterprise',
    label: 'Enterprise Workspace Sync',
    icon: Briefcase,
  },
  {
    id: 'analytics',
    label: 'Real-time Telemetry & Analytics',
    icon: PieChart,
  },
  {
    id: 'automation',
    label: 'Bi-directional Schema Sync',
    icon: RefreshCw,
  },
];

export default function DataIntegritySection({ onSelectIntegration }) {
  const sectionRef = useRef(null);
  const blockImgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(blockImgRef.current, {
        y: -10,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="sticky top-12 sm:top-16 z-10 w-full min-h-[85vh] sm:min-h-[90vh] bg-[#38261B] text-[#FFFDF9] py-14 sm:py-20 px-6 sm:px-12 md:px-16 lg:px-24 rounded-t-[36px] sm:rounded-t-[56px] shadow-[0_-25px_60px_rgba(0,0,0,0.35)] flex flex-col justify-center will-change-transform"
    >
      <div className="w-full max-w-[1280px] mx-auto relative flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 my-auto">
        {/* Left Column */}
        <div className="w-full lg:max-w-[620px] xl:max-w-[680px] z-10 text-left">
          <h2 className="font-heading-hero text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FFFDF9] leading-[1.08] mb-4 sm:mb-6">
            Data Integrity
          </h2>
          <p className="text-base sm:text-lg md:text-[21px] leading-relaxed text-[#D8CCC0] font-normal max-w-xl">
            Ensure accurate, reliable, and compliant data collection for your
            projects. We prioritize security and ethical use.
          </p>

          {/* Half Divider Line */}
          <div className="w-full max-w-md sm:max-w-lg border-t border-[#4E3729]/90 my-6 sm:my-8" />

          {/* Enterprise Integration Sub-Section */}
          <div>
            <h3 className="font-heading-hero text-lg sm:text-xl font-semibold text-[#FFFDF9] mb-3 sm:mb-4">
              Enterprise Integration
            </h3>

            {/* 4 Icon Tiles */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 md:gap-5">
              {INTEGRATION_ICONS.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => onSelectIntegration && onSelectIntegration(item.id)}
                    title={item.label}
                    className="group w-13 h-13 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-[18px] sm:rounded-[22px] bg-[#53392A] hover:bg-[#634533] border border-[#684937]/50 hover:border-[#866048] flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm"
                  >
                    <IconComponent
                      className="w-5 h-5 sm:w-6 sm:h-6 text-[#E8DDD3] group-hover:text-white transition-colors"
                      strokeWidth={1.8}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: 3D Floating Sticker Block */}
        <div className="shrink-0 flex items-center justify-center z-10 self-center">
          <img
            ref={blockImgRef}
            src={heroImage}
            alt="Modular Data Integrity Blocks"
            className="w-60 sm:w-72 md:w-84 lg:w-[400px] xl:w-[440px] h-auto object-contain select-none pointer-events-none drop-shadow-[0_25px_45px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}
