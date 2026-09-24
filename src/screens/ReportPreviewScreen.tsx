import React from 'react';
import { Evaluation } from '../types/oiml';
import { Printer, ArrowLeft } from 'lucide-react';

interface ReportPreviewScreenProps {
  evaluation: Evaluation;
  onBack: () => void;
}

export const ReportPreviewScreen: React.FC<ReportPreviewScreenProps> = ({
  evaluation,
  onBack,
}) => {
  const { instrument, laboratoryConditions, tests } = evaluation;

  const handlePrint = () => {
    window.print();
  };

  const isCompliant = evaluation.conclusion === 'COMPLIANT';

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16 font-sans">
      {/* Top Action Bar (Hidden during print) */}
      <div className="no-print flex items-center justify-between pb-3">
        <button
          onClick={onBack}
          className="glass-btn-secondary px-3.5 py-2 text-xs text-[#B0B2B4] hover:text-[#EEEEEE] font-medium flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Evaluations</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="glass-btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#EEEEEE]" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Official Laboratory Report Frame (Glass mat behind official white document) */}
      <div className="glass-panel-level2 p-4 sm:p-8 rounded-[24px]">
        <div className="report-page bg-[#FFFFFF] text-[#11161B] border border-[#D1D5DB] rounded-lg p-8 sm:p-12 shadow-2xl space-y-6 font-sans text-xs select-text">
          {/* Document Header */}
          <div className="border-b-2 border-[#11161B] pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="text-xl font-bold tracking-widest uppercase text-[#11161B]">
                METRISENSE
              </div>
              <div className="text-[11px] font-semibold text-[#4A5568] uppercase tracking-wider mt-0.5">
                NON-AUTOMATIC WEIGHING INSTRUMENT
              </div>
              <div className="text-sm font-bold text-[#11161B] uppercase tracking-wider">
                TYPE EVALUATION REPORT
              </div>
            </div>

            <div className="text-left sm:text-right text-[11px] text-[#4A5568] space-y-0.5">
              <div>
                <span className="font-semibold text-[#11161B]">REPORT REF: </span>
                <span>{evaluation.id}</span>
              </div>
              <div>
                <span className="font-semibold text-[#11161B]">STANDARD: </span>
                <span>OIML R 76-1 (2006)</span>
              </div>
              <div>
                <span className="font-semibold text-[#11161B]">DATE: </span>
                <span>{laboratoryConditions.date || new Date().toISOString().split('T')[0]}</span>
              </div>
            </div>
          </div>

          {/* 1. Instrument Identification */}
          <div className="space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#11161B] border-b border-[#CBD5E1] pb-1">
              1. INSTRUMENT IDENTIFICATION
            </div>

            <table className="w-full text-left text-[11px] border border-[#CBD5E1]">
              <tbody className="divide-y divide-[#E2E8F0]">
                <tr>
                  <td className="py-1.5 px-3 bg-[#F8FAFC] font-semibold w-1/4 text-[#4A5568]">Manufacturer</td>
                  <td className="py-1.5 px-3 font-medium text-[#11161B] w-1/4">{instrument.manufacturer}</td>
                  <td className="py-1.5 px-3 bg-[#F8FAFC] font-semibold w-1/4 text-[#4A5568]">Accuracy Class</td>
                  <td className="py-1.5 px-3 font-medium text-[#11161B] w-1/4">{instrument.accuracyClass}</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 bg-[#F8FAFC] font-semibold text-[#4A5568]">Model</td>
                  <td className="py-1.5 px-3 font-medium text-[#11161B]">{instrument.model}</td>
                  <td className="py-1.5 px-3 bg-[#F8FAFC] font-semibold text-[#4A5568]">Maximum Capacity (Max)</td>
                  <td className="py-1.5 px-3 font-medium text-[#11161B]">{instrument.maxCapacity} {instrument.unit}</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 bg-[#F8FAFC] font-semibold text-[#4A5568]">Serial Number</td>
                  <td className="py-1.5 px-3 font-medium text-[#11161B]">{instrument.serialNumber}</td>
                  <td className="py-1.5 px-3 bg-[#F8FAFC] font-semibold text-[#4A5568]">Minimum Capacity (Min)</td>
                  <td className="py-1.5 px-3 font-medium text-[#11161B]">{instrument.minCapacity} {instrument.unit}</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 bg-[#F8FAFC] font-semibold text-[#4A5568]">Instrument Type</td>
                  <td className="py-1.5 px-3 font-medium text-[#11161B]">{instrument.instrumentType}</td>
                  <td className="py-1.5 px-3 bg-[#F8FAFC] font-semibold text-[#4A5568]">Verification Scale Interval (e)</td>
                  <td className="py-1.5 px-3 font-medium text-[#11161B]">{instrument.verificationScaleInterval} {instrument.unit}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 2. Laboratory Conditions */}
          <div className="space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#11161B] border-b border-[#CBD5E1] pb-1">
              2. LABORATORY CONDITIONS & TRACEABILITY
            </div>

            <table className="w-full text-left text-[11px] border border-[#CBD5E1]">
              <tbody className="divide-y divide-[#E2E8F0]">
                <tr>
                  <td className="py-1.5 px-3 bg-[#F8FAFC] font-semibold w-1/4 text-[#4A5568]">Laboratory</td>
                  <td className="py-1.5 px-3 font-medium text-[#11161B] w-1/4">{laboratoryConditions.laboratory}</td>
                  <td className="py-1.5 px-3 bg-[#F8FAFC] font-semibold w-1/4 text-[#4A5568]">Ambient Temperature</td>
                  <td className="py-1.5 px-3 font-medium text-[#11161B] w-1/4">{laboratoryConditions.ambientTemperature} °C</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 bg-[#F8FAFC] font-semibold text-[#4A5568]">Test Location</td>
                  <td className="py-1.5 px-3 font-medium text-[#11161B]">{laboratoryConditions.testLocation}</td>
                  <td className="py-1.5 px-3 bg-[#F8FAFC] font-semibold text-[#4A5568]">Relative Humidity</td>
                  <td className="py-1.5 px-3 font-medium text-[#11161B]">{laboratoryConditions.relativeHumidity} % RH</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 bg-[#F8FAFC] font-semibold text-[#4A5568]">Lead Evaluator</td>
                  <td className="py-1.5 px-3 font-medium text-[#11161B]">{laboratoryConditions.operator}</td>
                  <td className="py-1.5 px-3 bg-[#F8FAFC] font-semibold text-[#4A5568]">Atmospheric Pressure</td>
                  <td className="py-1.5 px-3 font-medium text-[#11161B]">{laboratoryConditions.atmosphericPressure} hPa</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 bg-[#F8FAFC] font-semibold text-[#4A5568]">Standards Employed</td>
                  <td colSpan={3} className="py-1.5 px-3 font-medium text-[#11161B]">{laboratoryConditions.equipmentUsed}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 3. Test Observations */}
          <div className="space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#11161B] border-b border-[#CBD5E1] pb-1">
              3. TEST OBSERVATIONS
            </div>

            <table className="w-full text-left text-[11px] border border-[#CBD5E1]">
              <thead>
                <tr className="bg-[#F1F5F9] border-b border-[#CBD5E1] text-[#4A5568] uppercase text-[10px]">
                  <th className="py-1.5 px-3 font-semibold">Test Stage</th>
                  <th className="py-1.5 px-3 font-semibold">Applied Load (L)</th>
                  <th className="py-1.5 px-3 font-semibold">Indication (I)</th>
                  <th className="py-1.5 px-3 font-semibold">ΔL</th>
                  <th className="py-1.5 px-3 font-semibold">Corrected Error (E)</th>
                  <th className="py-1.5 px-3 font-semibold">Tolerance (MPE)</th>
                  <th className="py-1.5 px-3 font-semibold text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {tests.map((t, idx) => (
                  <tr key={idx} className="hover:bg-[#F8FAFC]">
                    <td className="py-1.5 px-3 font-medium text-[#11161B]">{t.loadStage}</td>
                    <td className="py-1.5 px-3 text-[#334155]">{t.appliedLoad.toFixed(3)} {instrument.unit}</td>
                    <td className="py-1.5 px-3 text-[#334155]">{t.indicatedValue.toFixed(3)} {instrument.unit}</td>
                    <td className="py-1.5 px-3 text-[#64748B]">{t.deltaLoad.toFixed(3)} {instrument.unit}</td>
                    <td className="py-1.5 px-3 font-semibold text-[#11161B]">
                      {t.calculatedError >= 0 ? `+${t.calculatedError.toFixed(4)}` : t.calculatedError.toFixed(4)} {instrument.unit}
                    </td>
                    <td className="py-1.5 px-3 text-[#334155]">±{t.mpe.toFixed(4)} {instrument.unit}</td>
                    <td className="py-1.5 px-3 text-right font-bold">
                      <span className={t.status === 'PASS' ? 'text-[#15803D]' : 'text-[#B91C1C]'}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 4. Calculations */}
          <div className="space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#11161B] border-b border-[#CBD5E1] pb-1">
              4. CALCULATIONS & METROLOGICAL BASIS
            </div>

            <div className="p-3 bg-[#F8FAFC] border border-[#CBD5E1] text-[11px] space-y-1.5 text-[#334155]">
              <div>
                <span className="font-semibold text-[#11161B]">Verification scale intervals: </span>
                <span>n = Max / e = {instrument.maxCapacity} / {instrument.verificationScaleInterval} = </span>
                <span className="font-bold text-[#11161B]">{instrument.n.toLocaleString()} intervals</span>
              </div>
              <div>
                <span className="font-semibold text-[#11161B]">Error calculation formula: </span>
                <span className="font-mono">E = I + 0.5e - ΔL - L</span>
                <span className="text-[#64748B] ml-2">(Clause A.4.4.3 of OIML R 76-1)</span>
              </div>
              <div>
                <span className="font-semibold text-[#11161B]">Maximum Permissible Error: </span>
                <span>Derived from Table 6 for {instrument.accuracyClass} at initial verification tolerances.</span>
              </div>
            </div>
          </div>

          {/* 5. Compliance Results */}
          <div className="space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#11161B] border-b border-[#CBD5E1] pb-1">
              5. COMPLIANCE RESULTS
            </div>

            <table className="w-full text-left text-[11px] border border-[#CBD5E1]">
              <tbody className="divide-y divide-[#E2E8F0]">
                <tr>
                  <td className="py-1.5 px-3 bg-[#F8FAFC] font-semibold w-1/2 text-[#4A5568]">Total Metrological Test Points Evaluated</td>
                  <td className="py-1.5 px-3 font-semibold text-[#11161B] w-1/2">{tests.length}</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 bg-[#F8FAFC] font-semibold text-[#4A5568]">Points Within Permissible Error (MPE) Limits</td>
                  <td className="py-1.5 px-3 font-semibold text-[#15803D]">{tests.filter((t) => t.status === 'PASS').length}</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 bg-[#F8FAFC] font-semibold text-[#4A5568]">Points Exceeding Permissible Error Limits</td>
                  <td className="py-1.5 px-3 font-semibold text-[#B91C1C]">{tests.filter((t) => t.status === 'FAIL').length}</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3 bg-[#F8FAFC] font-semibold text-[#4A5568]">Evaluator Observations</td>
                  <td className="py-1.5 px-3 text-[#334155]">{evaluation.officerNotes || 'None recorded'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 6. Final Conclusion & Signatures */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#11161B] border-b border-[#CBD5E1] pb-1">
              6. FINAL CONCLUSION
            </div>

            <div className="p-4 border-2 border-[#11161B] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase text-[#64748B] font-semibold">Official Determination</div>
                <div className="text-base font-bold text-[#11161B]">
                  THE TESTED NON-AUTOMATIC WEIGHING INSTRUMENT IS HEREBY CERTIFIED AS:
                </div>
              </div>

              <div className={`px-4 py-2 text-sm font-bold tracking-widest border-2 uppercase ${
                isCompliant 
                  ? 'border-[#15803D] text-[#15803D] bg-[#F0FDF4]'
                  : 'border-[#B91C1C] text-[#B91C1C] bg-[#FEF2F2]'
              }`}>
                {isCompliant ? 'COMPLIANT (APPROVED)' : 'NON-COMPLIANT (REJECTED)'}
              </div>
            </div>

            {/* Signature Blocks */}
            <div className="grid grid-cols-2 gap-8 pt-8 text-[11px]">
              <div className="border-t border-[#11161B] pt-2">
                <div className="font-semibold text-[#11161B]">{laboratoryConditions.operator}</div>
                <div className="text-[#64748B]">Testing Officer / Metrologist</div>
                <div className="text-[#64748B] text-[10px] mt-0.5">National Metrology Institute</div>
              </div>

              <div className="border-t border-[#11161B] pt-2 text-right">
                <div className="font-semibold text-[#11161B]">Authorized Signatory</div>
                <div className="text-[#64748B]">Director of Legal Metrology</div>
                <div className="text-[#64748B] text-[10px] mt-0.5">Date: {laboratoryConditions.date || new Date().toISOString().split('T')[0]}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

