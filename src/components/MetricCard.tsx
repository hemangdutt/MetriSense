import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  accent?: 'default' | 'steel' | 'success' | 'amber';
  onClick?: () => void;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  accent = 'default',
  onClick,
  className = '',
}) => {
  // Format numeric values with leading zero for single digits if appropriate
  const formattedValue = typeof value === 'number' && value < 10 && value >= 0 
    ? `0${value}` 
    : value;

  let accentIndicator = '';
  if (accent === 'success') {
    accentIndicator = 'text-[#8EB89B]';
  } else if (accent === 'amber') {
    accentIndicator = 'text-[#BDB293]';
  } else if (accent === 'steel') {
    accentIndicator = 'text-[#D8D8D8]';
  }

  return (
    <div
      onClick={onClick}
      className={`glass-panel-interactive rounded-[20px] p-5 sm:p-6 flex flex-col justify-between select-none ${
        onClick ? 'cursor-pointer active:scale-[0.99]' : ''
      } ${className}`}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[#B0B2B4] tracking-normal font-sans">
            {label}
          </span>
          {accent !== 'default' && (
            <span className={`w-1.5 h-1.5 rounded-full ${
              accent === 'success' ? 'bg-[#8EB89B]' : accent === 'amber' ? 'bg-[#BDB293]' : 'bg-[#EEEEEE]'
            } opacity-60`} />
          )}
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#EEEEEE] font-sans tabular-nums">
            {formattedValue}
          </span>
        </div>
      </div>

      {subtext && (
        <div className="mt-3 pt-3 border-t border-white/[0.06] text-xs text-[#74777A] font-sans truncate">
          {subtext}
        </div>
      )}
    </div>
  );
};

