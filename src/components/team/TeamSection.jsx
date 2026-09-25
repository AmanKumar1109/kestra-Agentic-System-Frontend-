import React from 'react';
import { Users, Globe, Code2, ExternalLink } from 'lucide-react';

const TEAM = [
  {
    name: 'Alex Vance',
    role: 'Lead AI Engineer',
    specialty: 'LLM Multi-Agent Orchestration',
    avatarLetter: 'A',
    bgBadge: 'bg-[#E67246]',
  },
  {
    name: 'Elena Rostova',
    role: 'Data Architect',
    specialty: 'Distributed Vector Pipelines',
    avatarLetter: 'E',
    bgBadge: 'bg-[#7E9C79]',
  },
  {
    name: 'Marcus Chen',
    role: 'Full-Stack Developer',
    specialty: 'Interactive GSAP & UI Systems',
    avatarLetter: 'M',
    bgBadge: 'bg-[#795745]',
  },
  {
    name: 'Sarah Jenkins',
    role: 'Product & Ethics Lead',
    specialty: 'Responsible AI & Data Privacy',
    avatarLetter: 'S',
    bgBadge: 'bg-[#344049]',
  },
];

export default function TeamSection() {
  return (
    <section
      id="teamers"
      className="sticky top-20 sm:top-24 z-30 w-full min-h-[85vh] sm:min-h-[90vh] bg-[#FAF7F2] text-[#271B14] py-14 sm:py-20 px-6 sm:px-12 md:px-16 lg:px-24 rounded-t-[36px] sm:rounded-t-[56px] shadow-[0_-30px_70px_rgba(0,0,0,0.3)] flex flex-col justify-center will-change-transform mb-16"
    >
      <div className="w-full max-w-[1280px] mx-auto my-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFE9E0] text-[#795745] text-xs font-semibold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            Hackathon Squad
          </div>
          <h2 className="font-heading-hero text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#271B14] leading-[1.1]">
            Meet Our Team
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#78685C] font-normal">
            The minds engineering intelligent data agents and next-generation pipelines.
          </p>
        </div>

        {/* 4 Team Member Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E8E2D8] rounded-[28px] p-6 sm:p-7 flex flex-col items-center text-center shadow-[0_10px_30px_-10px_rgba(39,27,20,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(39,27,20,0.14)] transition-all duration-300 hover:-translate-y-2 group"
            >
              <div
                className={`w-16 h-16 rounded-full ${member.bgBadge} text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-xs group-hover:scale-105 transition-transform duration-300`}
              >
                {member.avatarLetter}
              </div>

              <h3 className="font-heading-hero text-lg sm:text-xl font-bold text-[#271B14] mb-1">
                {member.name}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#E67246] mb-2">
                {member.role}
              </p>
              <p className="text-xs text-[#78685C] leading-relaxed mb-5">
                {member.specialty}
              </p>

              <div className="mt-auto flex items-center gap-3 pt-3 border-t border-[#F2ECE4] w-full justify-center text-[#A3968B]">
                <a href="#" title="Portfolio" className="hover:text-[#271B14] transition-colors p-1">
                  <Globe className="w-4 h-4" />
                </a>
                <a href="#" title="Code Repository" className="hover:text-[#271B14] transition-colors p-1">
                  <Code2 className="w-4 h-4" />
                </a>
                <a href="#" title="Profile" className="hover:text-[#271B14] transition-colors p-1">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
