import React from 'react';
import { Menu } from 'lucide-react';
import { NavTab } from './Sidebar';

interface HeaderProps {
  currentTab: NavTab;
  onOpenMobileMenu: () => void;
  officerName?: string;
  activeEvaluationId?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onOpenMobileMenu,
  officerName = 'Dr. V. Ramanathan',
  activeEvaluationId,
}) => {
  const getBreadcrumb = () => {
    switch (currentTab) {
      case 'overview':
        return 'Overview';
      case 'evaluations':
        return 'Evaluations';
      case 'new-evaluation':
        return activeEvaluationId 
          ? `Evaluations / ${activeEvaluationId} / Edit`
          : 'New evaluation';
      case 'reports':
        return 'Reports';
      case 'report-preview':
        return activeEvaluationId 
          ? `Reports / ${activeEvaluationId}`
          : 'Report preview';
      case 'archive':
        return 'Archive';
      case 'detail':
        return activeEvaluationId 
          ? `Evaluations / ${activeEvaluationId}`
          : 'Evaluation detail';
      case 'settings':
        return 'Settings';
      default:
        return 'Overview';
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full h-14 bg-[#07090A]/70 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.40)] px-4 sm:px-8 flex items-center justify-between font-sans select-none">
      {/* Left: Mobile menu button + Minimal Clean Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileMenu}
          className="p-1.5 rounded-xl text-[#B0B2B4] hover:text-[#EEEEEE] hover:bg-white/[0.06] md:hidden shrink-0 transition-colors"
          aria-label="Toggle navigation"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center text-xs tracking-normal truncate">
          <span className="text-[#74777A]">Metrisense</span>
          <span className="mx-2 text-[#74777A]/50">/</span>
          <span className="text-[#B0B2B4]">Workspace</span>
          <span className="mx-2 text-[#74777A]/50">/</span>
          <span className="text-[#EEEEEE] font-medium truncate">{getBreadcrumb()}</span>
        </div>
      </div>

      {/* Right: Officer details with subtle glass indicator */}
      <div className="flex items-center gap-3 text-xs shrink-0">
        <span className="text-[#EEEEEE] font-medium hidden sm:inline">{officerName}</span>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8EB89B]" />
          <span className="text-[11px] text-[#8EB89B] font-medium">Online</span>
        </div>
      </div>
    </header>
  );
};

