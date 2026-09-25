import React from 'react';
import { Database, FileText, Sparkles, Layers } from 'lucide-react';

export default function HeroCalloutBadge({ item, onClick }) {
  const getIcon = () => {
    switch (item.iconType) {
      case 'database':
        return <Layers className="w-4 h-4 text-white" strokeWidth={2.2} />;
      case 'document':
        return <FileText className="w-4 h-4 text-white" strokeWidth={2.2} />;
      case 'sparkles':
        return <Sparkles className="w-4 h-4 text-white" strokeWidth={2.2} />;
      default:
        return <Sparkles className="w-4 h-4 text-white" strokeWidth={2.2} />;
    }
  };

  const tailClass =
    item.position === 'left'
      ? 'bubble-tail-right'
      : item.position === 'top-right'
      ? 'bubble-tail-bottom-left'
      : 'bubble-tail-left';

  return (
    <div
      onClick={onClick}
      style={{ '--bubble-color': item.color }}
      className={`group cursor-pointer select-none transition-transform duration-300 hover:scale-[1.03] active:scale-95 ${tailClass}`}
    >
      <div
        style={{
          backgroundColor: item.color,
          boxShadow: `0 14px 28px -6px ${item.color}40`,
        }}
        className="text-white px-5 py-3.5 sm:px-6 sm:py-4 rounded-[22px] flex items-center gap-3.5 max-w-[290px] sm:max-w-[320px] md:max-w-[350px] transition-all duration-300"
      >
        {/* Left Icon (if not iconOnRight) */}
        {!item.iconOnRight && (
          <div className="shrink-0 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-xs">
            {getIcon()}
          </div>
        )}

        {/* Text Content */}
        <p className="flex-1 text-[12.5px] sm:text-[13.5px] font-medium leading-[1.38] tracking-normal text-white/95">
          {item.text}
        </p>

        {/* Right Icon (if iconOnRight) */}
        {item.iconOnRight && (
          <div className="shrink-0 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-xs">
            {getIcon()}
          </div>
        )}
      </div>
    </div>
  );
}
