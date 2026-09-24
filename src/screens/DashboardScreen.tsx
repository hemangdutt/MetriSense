import React, { useState } from 'react';
import { Evaluation } from '../types/oiml';
import { StatusBadge } from '../components/StatusBadge';
import { Plus, ArrowUpRight } from 'lucide-react';

interface DashboardScreenProps {
  evaluations: Evaluation[];
  onNewEvaluation: () => void;
  onViewEvaluation: (evalId: string) => void;
  onViewReport: (evalId: string) => void;
  onViewArchive: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  evaluations,
  onNewEvaluation,
  onViewEvaluation,
  onViewReport,
}) => {
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  const totalCount = evaluations.length;
  const inProgressCount = evaluations.filter((e) => e.status === 'IN PROGRESS').length;
  const completedCount = evaluations.filter(
    (e) => e.status === 'COMPLETED' || e.conclusion === 'COMPLIANT'
  ).length;
  const reportsReadyCount = evaluations.filter(
    (e) => e.status === 'REPORTS READY' || e.status === 'COMPLETED'
  ).length;

  const getFormattedTime = (dateStr: string, idx: number) => {
    try {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      }
    } catch {
      // fallback
    }
    const times = ['12:41', '11:42', '10:18', '09:52', '08:30', '16:45'];
    return times[idx % times.length];
  };

  // Recent evaluation stream
  const recentActivities = [
    {
      id: evaluations[0]?.id || 'NAWI-2026-0048',
      action: 'Repeatability test series finalized',
      detail: 'Standard Class III verification complete',
      time: 'Today, 11:42',
    },
    {
      id: evaluations[1]?.id || 'NAWI-2026-0042',
      action: 'Type evaluation inspection initiated',
      detail: 'Tare balancing & eccentricity verification',
      time: 'Today, 10:18',
    },
    {
      id: evaluations[2]?.id || 'NAWI-2026-0041',
      action: 'Verification scale interval verified',
      detail: 'n = 3,000 intervals computed',
      time: 'Today, 09:52',
    },
  ];

  const formatTwoDigits = (num: number) => {
    return num < 10 && num >= 0 ? `0${num}` : `${num}`;
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans pb-12 select-none">
      {/* 1. Header Section with Glass New Evaluation Action */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#EEEEEE]">
            Evaluation Console
          </h1>
          <p className="text-xs sm:text-sm text-[#B0B2B4] mt-1.5 font-normal max-w-2xl">
            Type-evaluation workspace for non-automatic weighing instruments.
          </p>
        </div>

        <div>
          <button
            onClick={onNewEvaluation}
            className="glass-btn-primary px-4 py-2.5 flex items-center gap-2 text-xs font-semibold rounded-[14px] cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#EEEEEE]" />
            <span>+ New Evaluation</span>
          </button>
        </div>
      </div>

      {/* 2. Summary Glass Widgets (Material Language of Reference) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Widget 1: Total Evaluations */}
        <div className="glass-panel-interactive rounded-[20px] p-5 sm:p-6 flex flex-col justify-between min-h-[130px]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#B0B2B4] font-medium tracking-normal">
              Evaluations
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#EEEEEE] tabular-nums">
              {formatTwoDigits(totalCount)}
            </div>
            <div className="text-[11px] text-[#74777A] mt-1 truncate">
              Active metrological records
            </div>
          </div>
        </div>

        {/* Widget 2: In Progress */}
        <div className="glass-panel-interactive rounded-[20px] p-5 sm:p-6 flex flex-col justify-between min-h-[130px]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#B0B2B4] font-medium tracking-normal">
              In progress
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EEEEEE]/50" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#EEEEEE] tabular-nums">
              {formatTwoDigits(inProgressCount)}
            </div>
            <div className="text-[11px] text-[#74777A] mt-1 truncate">
              Under laboratory observation
            </div>
          </div>
        </div>

        {/* Widget 3: Completed */}
        <div className="glass-panel-interactive rounded-[20px] p-5 sm:p-6 flex flex-col justify-between min-h-[130px]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#B0B2B4] font-medium tracking-normal">
              Completed
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8EB89B]/80" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#EEEEEE] tabular-nums">
              {formatTwoDigits(completedCount)}
            </div>
            <div className="text-[11px] text-[#74777A] mt-1 truncate">
              Conforming to OIML R 76
            </div>
          </div>
        </div>

        {/* Widget 4: Reports Ready */}
        <div className="glass-panel-interactive rounded-[20px] p-5 sm:p-6 flex flex-col justify-between min-h-[130px]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#B0B2B4] font-medium tracking-normal">
              Reports ready
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#BDB293]/80" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#EEEEEE] tabular-nums">
              {formatTwoDigits(reportsReadyCount)}
            </div>
            <div className="text-[11px] text-[#74777A] mt-1 truncate">
              Certificates ready to issue
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Glass Evaluation Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="text-sm font-semibold text-[#EEEEEE]">
            Active Evaluations
          </div>
          <span className="text-xs text-[#74777A]">
            Click row to view details
          </span>
        </div>

        {/* Glass Table Enclosure */}
        <div className="glass-panel-level2 overflow-hidden border border-white/[0.09]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] text-[#B0B2B4] bg-white/[0.03]">
                  <th className="py-3.5 px-5 font-semibold text-xs tracking-normal">Evaluation</th>
                  <th className="py-3.5 px-5 font-semibold text-xs tracking-normal">Instrument</th>
                  <th className="py-3.5 px-5 font-semibold text-xs tracking-normal">Manufacturer</th>
                  <th className="py-3.5 px-5 font-semibold text-xs tracking-normal">Status</th>
                  <th className="py-3.5 px-5 font-semibold text-xs tracking-normal text-right">Updated</th>
                  <th className="py-3.5 px-4 font-semibold text-xs tracking-normal text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {evaluations.map((item, idx) => {
                  const isSelected = selectedRowId === item.id;

                  return (
                    <tr
                      key={item.id}
                      onClick={() => {
                        setSelectedRowId(item.id);
                        onViewEvaluation(item.id);
                      }}
                      className={`cursor-pointer transition-all duration-150 ${
                        isSelected 
                          ? 'bg-white/[0.12] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]' 
                          : 'hover:bg-white/[0.06]'
                      }`}
                    >
                      <td className="py-3.5 px-5 text-[#EEEEEE] font-medium">
                        <div className="flex items-center gap-2">
                          <span>{item.id}</span>
                          <span className="text-[10px] text-[#74777A] font-normal">{item.instrument.accuracyClass}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-5 text-[#EEEEEE]">
                        {item.instrument.model}
                      </td>
                      <td className="py-3.5 px-5 text-[#B0B2B4]">
                        {item.instrument.manufacturer}
                      </td>
                      <td className="py-3.5 px-5">
                        <StatusBadge status={item.status} size="sm" variant="glass" />
                      </td>
                      <td className="py-3.5 px-5 text-right text-[#B0B2B4] tabular-nums">
                        {getFormattedTime(item.updatedAt, idx)}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewReport(item.id);
                          }}
                          className="px-2.5 py-1 rounded-xl text-[11px] font-medium bg-white/[0.05] hover:bg-white/[0.12] text-[#EEEEEE] border border-white/[0.10] transition-colors"
                        >
                          Report
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. Recent Evaluations Stream in Glass Panel */}
      <div className="space-y-3">
        <div className="text-sm font-semibold text-[#EEEEEE] px-1">
          Recent Audit Stream
        </div>

        <div className="glass-panel-level2 p-5 sm:p-6 divide-y divide-white/[0.06]">
          {recentActivities.map((act, idx) => (
            <div
              key={idx}
              onClick={() => onViewEvaluation(act.id)}
              className={`py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2 cursor-pointer group`}
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white/20 mt-1 sm:mt-0 group-hover:bg-white/60 transition-colors" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#EEEEEE] font-medium group-hover:text-white transition-colors">
                      {act.id}
                    </span>
                    <span className="text-[#74777A]">·</span>
                    <span className="text-[#B0B2B4]">{act.action}</span>
                  </div>
                  <div className="text-[11px] text-[#74777A] mt-0.5">
                    {act.detail}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-[#74777A] self-end sm:self-center">
                <span>{act.time}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#EEEEEE] transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


