import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 24, showText = false }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <rect
          x="28"
          y="28"
          width="456"
          height="456"
          rx="96"
          ry="96"
          fill="#0D0E0F"
          stroke="#292B2D"
          strokeWidth="6"
        />

        {/* Silver dial arc */}
        <path
          d="M 172 312 A 126 126 0 0 1 238 132"
          fill="none"
          stroke="#8B8D90"
          strokeWidth="24"
          strokeLinecap="round"
        />

        {/* Top 12-o'clock graduation */}
        <line
          x1="256"
          y1="130"
          x2="256"
          y2="148"
          stroke="#E5E5E5"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Silver upper arc segment */}
        <path
          d="M 274 132 A 126 126 0 0 1 366 238"
          fill="none"
          stroke="#D8D8D8"
          strokeWidth="24"
          strokeLinecap="round"
        />

        {/* Lower right silver segment */}
        <path
          d="M 364 266 A 126 126 0 0 1 340 312"
          fill="none"
          stroke="#8B8D90"
          strokeWidth="20"
          strokeLinecap="round"
        />

        {/* Precision graduations */}
        <line x1="208" y1="206" x2="208" y2="222" stroke="#737578" strokeWidth="6" strokeLinecap="round" />
        <line x1="230" y1="192" x2="230" y2="222" stroke="#A4A5A7" strokeWidth="6" strokeLinecap="round" />
        <line x1="256" y1="178" x2="256" y2="232" stroke="#E5E5E5" strokeWidth="8" strokeLinecap="round" />
        <line x1="282" y1="192" x2="282" y2="222" stroke="#A4A5A7" strokeWidth="6" strokeLinecap="round" />
        <line x1="304" y1="206" x2="304" y2="222" stroke="#737578" strokeWidth="6" strokeLinecap="round" />

        {/* Weighing pan */}
        <path d="M 190 242 L 322 242 L 306 266 L 206 266 Z" fill="#E5E5E5" />

        {/* Center column */}
        <rect x="245" y="266" width="22" height="12" rx="2" fill="#8B8D90" />

        {/* Chassis base */}
        <path d="M 206 278 L 306 278 L 332 328 L 180 328 Z" fill="#737578" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xs font-semibold tracking-wider text-[#E5E5E5] uppercase">
            METRISENSE
          </span>
          <span className="text-[9px] tracking-widest text-[#737578] uppercase">
            LEGAL METROLOGY
          </span>
        </div>
      )}
    </div>
  );
};
