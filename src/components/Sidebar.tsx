import React from 'react';
import { 
  LayoutDashboard, 
  Scale, 
  FileText, 
  Archive, 
  Settings, 
  Code2, 
  LogOut, 
  X
} from 'lucide-react';
import { Logo } from './Logo';

export type NavTab = 
  | 'overview' 
  | 'evaluations' 
  | 'reports' 
  | 'archive' 
  | 'settings' 
  | 'new-evaluation' 
  | 'detail' 
  | 'report-preview';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  officerName: string;
  officerId?: string;
  onLogout: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenFlutterSource: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  officerName,
  officerId = 'NMI-OFFICER-76',
  onLogout,
  mobileOpen,
  onCloseMobile,
  onOpenFlutterSource,
}) => {
  const workspaceItems = [
    {
      id: 'overview' as NavTab,
      label: 'Overview',
      icon: LayoutDashboard,
      activeTabs: ['overview'],
    },
    {
      id: 'evaluations' as NavTab,
      label: 'Evaluations',
      icon: Scale,
      activeTabs: ['evaluations', 'new-evaluation', 'detail'],
    },
    {
      id: 'reports' as NavTab,
      label: 'Reports',
      icon: FileText,
      activeTabs: ['reports', 'report-preview'],
    },
    {
      id: 'archive' as NavTab,
      label: 'Archive',
      icon: Archive,
      activeTabs: ['archive'],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Glass Sidebar (240px wide) */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-[240px] bg-[#07090A]/80 backdrop-blur-2xl border-r border-white/[0.08] shadow-[1px_0_0_0_rgba(255,255,255,0.03),12px_0_32px_-4px_rgba(0,0,0,0.50)] z-50 flex flex-col justify-between transition-transform duration-200 ease-out shrink-0 select-none overflow-hidden overscroll-none ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Brand Header */}
          <div className="h-16 px-5 border-b border-white/[0.06] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <Logo size={26} />
              <div>
                <div className="font-semibold text-xs tracking-wider text-[#EEEEEE] uppercase font-sans">
                  METRISENSE
                </div>
                <div className="text-[11px] text-[#74777A] font-sans">
                  Legal Metrology
                </div>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-[#B0B2B4] hover:text-[#EEEEEE] hover:bg-white/[0.06] md:hidden"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Structure */}
          <div className="p-4 space-y-6 flex-1 overflow-hidden font-sans">
            {/* WORKSPACE */}
            <div>
              <div className="px-3 mb-2 text-[11px] font-semibold text-[#74777A] tracking-wider uppercase">
                Workspace
              </div>
              <nav className="space-y-1">
                {workspaceItems.map((item) => {
                  const Icon = item.icon;
                  const isSelected = item.activeTabs.includes(currentTab);

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        onCloseMobile();
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-left text-xs transition-all duration-150 rounded-xl ${
                        isSelected
                          ? 'bg-white/[0.10] text-[#EEEEEE] font-medium border border-white/[0.18] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_4px_16px_rgba(0,0,0,0.30)]'
                          : 'text-[#B0B2B4] hover:text-[#EEEEEE] hover:bg-white/[0.04] border border-transparent'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#EEEEEE]' : 'text-[#74777A]'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* SYSTEM */}
            <div>
              <div className="px-3 mb-2 text-[11px] font-semibold text-[#74777A] tracking-wider uppercase">
                System
              </div>
              <nav className="space-y-1">
                <button
                  onClick={() => {
                    onSelectTab('settings');
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left text-xs transition-all duration-150 rounded-xl ${
                    currentTab === 'settings'
                      ? 'bg-white/[0.10] text-[#EEEEEE] font-medium border border-white/[0.18] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_4px_16px_rgba(0,0,0,0.30)]'
                      : 'text-[#B0B2B4] hover:text-[#EEEEEE] hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <Settings className={`w-3.5 h-3.5 shrink-0 ${currentTab === 'settings' ? 'text-[#EEEEEE]' : 'text-[#74777A]'}`} />
                  <span>Settings</span>
                </button>

                <button
                  onClick={() => {
                    onOpenFlutterSource();
                    onCloseMobile();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-xs text-[#B0B2B4] hover:text-[#EEEEEE] hover:bg-white/[0.04] border border-transparent rounded-xl transition-all duration-150"
                >
                  <Code2 className="w-3.5 h-3.5 shrink-0 text-[#74777A]" />
                  <span>Flutter Specification</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Bottom Officer Status Panel */}
          <div className="p-3 m-3 shrink-0 rounded-[16px] bg-white/[0.03] border border-white/[0.07] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="min-w-0 pr-2">
                <div className="text-xs text-[#EEEEEE] font-medium truncate font-sans">
                  {officerName}
                </div>
                <div className="text-[11px] text-[#74777A] truncate font-sans">
                  {officerId}
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8EB89B]" />
                  <span className="text-[10px] text-[#8EB89B] font-sans">Online</span>
                </div>
              </div>

              <button
                onClick={onLogout}
                title="Sign out"
                className="p-2 text-[#74777A] hover:text-[#EEEEEE] hover:bg-white/[0.08] rounded-xl transition-colors"
                aria-label="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

