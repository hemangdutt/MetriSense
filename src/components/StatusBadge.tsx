import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
  variant?: 'glass' | 'text';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  size = 'md',
  variant = 'glass' 
}) => {
  const normalized = status.toUpperCase().trim();

  let textClass = 'text-[#B0B2B4]';
  let glassClass = 'bg-white/[0.05] border-white/10 text-[#EEEEEE]';

  if (
    normalized === 'PASS' || 
    normalized === 'COMPLIANT' || 
    normalized === 'APPROVED' || 
    normalized === 'COMPLETED'
  ) {
    textClass = 'text-[#8EB89B]';
    glassClass = 'glass-status-pass';
  } else if (
    normalized === 'FAIL' || 
    normalized === 'NON-COMPLIANT' || 
    normalized === 'FAILED'
  ) {
    textClass = 'text-[#B87C7C]';
    glassClass = 'glass-status-fail';
  } else if (
    normalized === 'IN PROGRESS' || 
    normalized === 'TESTING'
  ) {
    textClass = 'text-[#D8D8D8]';
    glassClass = 'bg-white/[0.07] border-white/15 text-[#EEEEEE]';
  } else if (
    normalized === 'IN REVIEW' || 
    normalized === 'PENDING' || 
    normalized === 'REPORTS READY'
  ) {
    textClass = 'text-[#BDB293]';
    glassClass = 'glass-status-warn';
  }

  const formatLabel = (str: string) => {
    if (str === 'IN PROGRESS') return 'In progress';
    if (str === 'REPORTS READY') return 'Reports ready';
    if (str === 'COMPLIANT') return 'Compliant';
    if (str === 'NON-COMPLIANT') return 'Non-compliant';
    if (str === 'COMPLETED') return 'Completed';
    if (str === 'PASS') return 'Pass';
    if (str === 'FAIL') return 'Fail';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  if (variant === 'text') {
    return (
      <span className={`inline-block font-sans text-xs font-medium ${textClass}`}>
        {formatLabel(normalized)}
      </span>
    );
  }

  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-[11px] rounded-lg' 
    : 'px-2.5 py-1 text-xs rounded-xl';

  return (
    <span className={`inline-flex items-center font-sans font-medium tracking-tight border backdrop-blur-md ${glassClass} ${sizeClasses}`}>
      {formatLabel(normalized)}
    </span>
  );
};


