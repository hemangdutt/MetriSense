import React from 'react';
import { Evaluation } from '../types/oiml';
import { StatusBadge } from '../components/StatusBadge';
import { ArrowLeft, FileText } from 'lucide-react';

interface EvaluationDetailScreenProps {
  evaluation: Evaluation;
  onBack: () => void;
  onOpenReport: () => void;
}

export const EvaluationDetailScreen: React.FC<EvaluationDetailScreenProps> = ({
  evaluation,
  onBack,
  onOpenReport,
}) => {
  const { instrument, laboratoryConditions, tests } = evaluation;

  const passedCount = tests.filter((t) => t.status === 'PASS').length;
  const failedCount = tests.filter((t) => t.status === 'FAIL').length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 font-sans select-none">
      {/* Top Header & Actions */}
      <div className="pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="glass-btn-secondary p-2 rounded-xl text-[#B0B2B4] hover:text-[#EEEEEE] transition-colors cursor-pointer"
            title="Back to Overview"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-[#EEEEEE] tracking-tight">
                {evaluation.id}
              </h1>
              <StatusBadge status={evaluation.status} size="sm" variant="glass" />
            </div>
            <p className="text-xs text-[#B0B2B4] mt-1">
              {instrument.manufacturer} · {instrument.model} (Serial: {instrument.serialNumber})
            </p>
          </div>
        </div>

        <div>
          <button
            onClick={onOpenReport}
            className="glass-btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#EEEEEE]" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Summary Glass Banner */}
      <div className="glass-panel-interactive px-5 py-3.5 rounded-[18px] text-xs text-[#B0B2B4] flex flex-wrap items-center gap-4 sm:gap-6">
        <div>
          <span className="text-[#74777A]">Accuracy class: </span>
          <span className="text-[#EEEEEE] font-medium">{instrument.accuracyClass}</span>
        </div>
        <span className="text-white/20">|</span>
        <div>
          <span className="text-[#74777A]">Intervals (n): </span>
          <span className="text-[#EEEEEE] font-medium">{instrument.n.toLocaleString()}</span>
        </div>
        <span className="text-white/20">|</span>
        <div>
          <span className="text-[#74777A]">Capacity: </span>
          <span className="text-[#EEEEEE] font-medium">{instrument.maxCapacity} / {instrument.minCapacity} {instrument.unit}</span>
        </div>
        <span className="text-white/20">|</span>
        <div className="flex items-center gap-2">
          <span className="text-[#74777A]">Conclusion: </span>
          <StatusBadge status={evaluation.conclusion} size="sm" variant="glass" />
        </div>
      </div>

      {/* Section 1: Instrument Identity & Metrological Parameters */}
      <div className="space-y-3">
        <div className="text-sm font-semibold text-[#EEEEEE] px-1">
          Instrument Specifications
        </div>

        <div className="glass-panel-level2 p-5 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[#74777A] block text-[11px]">Manufacturer</span>
            <span className="text-[#EEEEEE] font-medium mt-1 block">{instrument.manufacturer}</span>
          </div>
          <div>
            <span className="text-[#74777A] block text-[11px]">Model designation</span>
            <span className="text-[#EEEEEE] font-medium mt-1 block">{instrument.model}</span>
          </div>
          <div>
            <span className="text-[#74777A] block text-[11px]">Serial number</span>
            <span className="text-[#EEEEEE] font-medium mt-1 block">{instrument.serialNumber}</span>
          </div>
          <div>
            <span className="text-[#74777A] block text-[11px]">Scale interval (e)</span>
            <span className="text-[#EEEEEE] font-medium mt-1 block">{instrument.verificationScaleInterval} {instrument.unit}</span>
          </div>
        </div>
      </div>

      {/* Section 2: Laboratory Conditions */}
      <div className="space-y-3">
        <div className="text-sm font-semibold text-[#EEEEEE] px-1">
          Laboratory Conditions
        </div>

        <div className="glass-panel-level2 p-5 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[#74777A] block text-[11px]">Laboratory</span>
            <span className="text-[#EEEEEE] font-medium mt-1 block">{laboratoryConditions.laboratory}</span>
          </div>
          <div>
            <span className="text-[#74777A] block text-[11px]">Temperature</span>
            <span className="text-[#EEEEEE] tabular-nums mt-1 block">{laboratoryConditions.ambientTemperature} °C</span>
          </div>
          <div>
            <span className="text-[#74777A] block text-[11px]">Humidity</span>
            <span className="text-[#EEEEEE] tabular-nums mt-1 block">{laboratoryConditions.relativeHumidity} % RH</span>
          </div>
          <div>
            <span className="text-[#74777A] block text-[11px]">Pressure</span>
            <span className="text-[#EEEEEE] tabular-nums mt-1 block">{laboratoryConditions.atmosphericPressure} hPa</span>
          </div>
          <div className="sm:col-span-2 pt-2 border-t border-white/[0.06]">
            <span className="text-[#74777A] block text-[11px]">Standards employed</span>
            <span className="text-[#B0B2B4] mt-1 block">{laboratoryConditions.equipmentUsed}</span>
          </div>
          <div className="sm:col-span-2 pt-2 border-t border-white/[0.06]">
            <span className="text-[#74777A] block text-[11px]">Testing officer</span>
            <span className="text-[#B0B2B4] mt-1 block">{laboratoryConditions.operator} ({laboratoryConditions.date})</span>
          </div>
        </div>
      </div>

      {/* Section 3: Test Observations Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="text-sm font-semibold text-[#EEEEEE]">
            OIML R 76 Verification Observations ({tests.length} stages)
          </div>
          <div className="text-xs text-[#B0B2B4] flex items-center gap-3">
            <span>Passed: <strong className="text-[#8EB89B]">{passedCount}</strong></span>
            <span className="text-white/20">·</span>
            <span>Failed: <strong className={failedCount > 0 ? 'text-[#B87C7C]' : 'text-[#B0B2B4]'}>{failedCount}</strong></span>
          </div>
        </div>

        <div className="glass-panel-level2 overflow-hidden border border-white/[0.09]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/[0.08] text-[#B0B2B4]">
                  <th className="py-3 px-4 font-semibold">Test stage</th>
                  <th className="py-3 px-4 font-semibold">Applied load (L)</th>
                  <th className="py-3 px-4 font-semibold">Indication (I)</th>
                  <th className="py-3 px-4 font-semibold">ΔL</th>
                  <th className="py-3 px-4 font-semibold">Corrected error (E)</th>
                  <th className="py-3 px-4 font-semibold">Tolerance (MPE)</th>
                  <th className="py-3 px-4 font-semibold text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {tests.map((t, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.06] transition-colors">
                    <td className="py-2.5 px-4 text-[#EEEEEE] font-medium">{t.loadStage}</td>
                    <td className="py-2.5 px-4 text-[#B0B2B4] tabular-nums">
                      {t.appliedLoad.toFixed(3)} {instrument.unit}
                    </td>
                    <td className="py-2.5 px-4 text-[#B0B2B4] tabular-nums">
                      {t.indicatedValue.toFixed(3)} {instrument.unit}
                    </td>
                    <td className="py-2.5 px-4 text-[#74777A] tabular-nums">
                      {t.deltaLoad.toFixed(3)} {instrument.unit}
                    </td>
                    <td className="py-2.5 px-4 font-medium text-[#EEEEEE] tabular-nums">
                      {t.calculatedError >= 0 ? `+${t.calculatedError.toFixed(4)}` : t.calculatedError.toFixed(4)} {instrument.unit}
                    </td>
                    <td className="py-2.5 px-4 text-[#B0B2B4] tabular-nums">
                      ±{t.mpe.toFixed(4)} {instrument.unit}
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <StatusBadge status={t.status} size="sm" variant="glass" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Section 4: Officer Notes */}
      <div className="space-y-3">
        <div className="text-sm font-semibold text-[#EEEEEE] px-1">
          Officer Remarks
        </div>
        <div className="glass-panel-level2 p-5 text-xs text-[#B0B2B4] leading-relaxed">
          {evaluation.officerNotes || 'No additional remarks registered.'}
        </div>
      </div>
    </div>
  );
};

