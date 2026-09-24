import React, { useState } from 'react';
import { Evaluation } from '../types/oiml';
import { StatusBadge } from '../components/StatusBadge';
import { Search, RotateCcw } from 'lucide-react';

interface ArchiveScreenProps {
  evaluations: Evaluation[];
  onViewEvaluation: (evalId: string) => void;
  onViewReport: (evalId: string) => void;
  onResetDemoData: () => void;
}

export const ArchiveScreen: React.FC<ArchiveScreenProps> = ({
  evaluations,
  onViewEvaluation,
  onViewReport,
  onResetDemoData,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filtered = evaluations.filter((item) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      item.id.toLowerCase().includes(search) ||
      item.instrument.manufacturer.toLowerCase().includes(search) ||
      item.instrument.model.toLowerCase().includes(search) ||
      item.instrument.serialNumber.toLowerCase().includes(search);

    if (statusFilter === 'ALL') return matchesSearch;
    if (statusFilter === 'NON-COMPLIANT') {
      return matchesSearch && (item.status === 'FAILED' || item.conclusion === 'NON-COMPLIANT');
    }
    return matchesSearch && item.status === statusFilter;
  });

  const filterTabs = [
    { id: 'ALL', label: 'All Records' },
    { id: 'IN PROGRESS', label: 'In Progress' },
    { id: 'COMPLETED', label: 'Completed' },
    { id: 'REPORTS READY', label: 'Reports Ready' },
    { id: 'NON-COMPLIANT', label: 'Non-Compliant' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 font-sans select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#EEEEEE]">
            Evaluation Archive
          </h1>
          <p className="text-xs text-[#B0B2B4] mt-1">
            Audit history of non-automatic weighing instrument type evaluations.
          </p>
        </div>

        <button
          onClick={onResetDemoData}
          className="glass-btn-secondary px-3.5 py-2 text-xs font-medium flex items-center gap-2 cursor-pointer self-start sm:self-auto text-[#B0B2B4] hover:text-[#EEEEEE]"
          title="Reset archive to default records"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#B0B2B4]" />
          <span>Reset Sample Records</span>
        </button>
      </div>

      {/* Search and Filters Bar in Glass Panel */}
      <div className="glass-panel-interactive p-3 rounded-[20px] flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search evaluation, model, or serial..."
            className="glass-input-field w-full pl-9 pr-3 py-2 text-xs text-[#EEEEEE] placeholder-[#74777A]"
          />
          <div className="absolute left-3 top-2.5 text-[#74777A]">
            <Search className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {filterTabs.map((tab) => {
            const active = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? 'bg-white/[0.14] text-[#EEEEEE] font-semibold border border-white/[0.22] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.20)]'
                    : 'text-[#B0B2B4] hover:text-[#EEEEEE] bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Dense Data Table in Smoked Glass */}
      <div className="hidden md:block glass-panel-level2 overflow-hidden border border-white/[0.09]">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/[0.08] bg-white/[0.03] text-[#B0B2B4]">
              <th className="py-3 px-4 font-semibold">Evaluation</th>
              <th className="py-3 px-4 font-semibold">Instrument / Model</th>
              <th className="py-3 px-4 font-semibold">Manufacturer</th>
              <th className="py-3 px-4 font-semibold">Class</th>
              <th className="py-3 px-4 font-semibold">Max Capacity</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-[#74777A]">
                  No evaluations match the search criteria.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onViewEvaluation(item.id)}
                  className="hover:bg-white/[0.06] cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 text-[#EEEEEE] font-semibold font-mono">
                    {item.id}
                  </td>
                  <td className="py-3 px-4 text-[#EEEEEE] font-medium">
                    {item.instrument.model}
                  </td>
                  <td className="py-3 px-4 text-[#B0B2B4]">
                    {item.instrument.manufacturer}
                  </td>
                  <td className="py-3 px-4 text-[#B0B2B4]">
                    {item.instrument.accuracyClass}
                  </td>
                  <td className="py-3 px-4 text-[#B0B2B4] tabular-nums font-mono">
                    {item.instrument.maxCapacity} {item.instrument.unit}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={item.status} size="sm" variant="glass" />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewReport(item.id);
                      }}
                      className="glass-btn-secondary px-2.5 py-1 text-xs cursor-pointer text-[#EEEEEE]"
                    >
                      Report
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Compact List in Smoked Glass */}
      <div className="block md:hidden glass-panel-level2 divide-y divide-white/[0.06] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#74777A]">
            No evaluations match the search criteria.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => onViewEvaluation(item.id)}
              className="p-4 active:bg-white/[0.08] transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#EEEEEE] font-mono">
                  {item.id}
                </span>
                <StatusBadge status={item.status} size="sm" variant="glass" />
              </div>

              <div className="text-xs text-[#B0B2B4] mt-1">
                {item.instrument.manufacturer} · {item.instrument.model}
              </div>

              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/[0.06] text-xs text-[#74777A]">
                <span>{item.instrument.accuracyClass} · {item.instrument.maxCapacity} {item.instrument.unit}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewReport(item.id);
                  }}
                  className="text-[#EEEEEE] font-medium hover:underline"
                >
                  View Report →
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

