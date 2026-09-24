import React, { useState } from 'react';
import { Save, Check } from 'lucide-react';

interface SettingsScreenProps {
  officerName: string;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ officerName }) => {
  const [standard, setStandard] = useState('OIML R 76-1:2006 (E)');
  const [labName, setLabName] = useState('National Metrology Institute - Laboratory 03');
  const [tempMin, setTempMin] = useState(10.0);
  const [tempMax, setTempMax] = useState(30.0);
  const [humidityMin, setHumidityMin] = useState(30.0);
  const [humidityMax, setHumidityMax] = useState(70.0);
  const [defaultUnit, setDefaultUnit] = useState<'kg' | 'g'>('kg');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 font-sans select-none text-xs">
      {/* Header */}
      <div className="pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#EEEEEE]">
            Settings & Conformance
          </h1>
          <p className="text-xs text-[#B0B2B4] mt-1">
            Metrological parameters and laboratory baseline configuration.
          </p>
        </div>

        {saved && (
          <div className="glass-panel-interactive flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs text-[#8EB89B] border border-[#8EB89B]/30 animate-pulse">
            <Check className="w-3.5 h-3.5" />
            <span>Parameters saved</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* SECTION 1: METROLOGICAL STANDARD CONFORMANCE */}
        <div className="space-y-3">
          <div className="text-sm font-semibold text-[#EEEEEE] px-1">
            Metrological Standard
          </div>

          <div className="glass-panel-level2 p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                  Primary Standard Specification
                </label>
                <input
                  type="text"
                  value={standard}
                  onChange={(e) => setStandard(e.target.value)}
                  className="glass-input-field w-full px-3.5 py-2.5 text-[#EEEEEE] text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                  Default Mass Unit
                </label>
                <select
                  value={defaultUnit}
                  onChange={(e) => setDefaultUnit(e.target.value as 'kg' | 'g')}
                  className="glass-input-field w-full px-3.5 py-2.5 text-[#EEEEEE] text-xs cursor-pointer"
                >
                  <option value="kg" className="bg-[#121416] text-[#EEEEEE]">Kilogram (kg)</option>
                  <option value="g" className="bg-[#121416] text-[#EEEEEE]">Gram (g)</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.06] text-xs text-[#74777A] space-y-1">
              <div>Calculation formulas:</div>
              <div>• Error calculation: <span className="font-mono text-[#B0B2B4]">E = I + 0.5e - ΔL - L</span> (OIML Clause A.4.4.3)</div>
              <div>• Tolerance determination: OIML R 76-1 Table 6 (Classes I, II, III, IIII)</div>
            </div>
          </div>
        </div>

        {/* SECTION 2: ENVIRONMENTAL BOUNDS */}
        <div className="space-y-3">
          <div className="text-sm font-semibold text-[#EEEEEE] px-1">
            Environmental Guardrails
          </div>

          <div className="glass-panel-level2 p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                Temperature Limits (°C)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  step="0.5"
                  value={tempMin}
                  onChange={(e) => setTempMin(parseFloat(e.target.value) || 0)}
                  placeholder="Min"
                  className="glass-input-field px-3 py-2 text-[#EEEEEE] text-xs tabular-nums"
                />
                <input
                  type="number"
                  step="0.5"
                  value={tempMax}
                  onChange={(e) => setTempMax(parseFloat(e.target.value) || 0)}
                  placeholder="Max"
                  className="glass-input-field px-3 py-2 text-[#EEEEEE] text-xs tabular-nums"
                />
              </div>
              <span className="text-[11px] text-[#74777A] mt-1.5 block">Standard range: 10.0°C to 30.0°C</span>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                Humidity Limits (% RH)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  step="1"
                  value={humidityMin}
                  onChange={(e) => setHumidityMin(parseFloat(e.target.value) || 0)}
                  placeholder="Min"
                  className="glass-input-field px-3 py-2 text-[#EEEEEE] text-xs tabular-nums"
                />
                <input
                  type="number"
                  step="1"
                  value={humidityMax}
                  onChange={(e) => setHumidityMax(parseFloat(e.target.value) || 0)}
                  placeholder="Max"
                  className="glass-input-field px-3 py-2 text-[#EEEEEE] text-xs tabular-nums"
                />
              </div>
              <span className="text-[11px] text-[#74777A] mt-1.5 block">Recommended: 30.0% to 70.0% RH</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: LABORATORY IDENTITY */}
        <div className="space-y-3">
          <div className="text-sm font-semibold text-[#EEEEEE] px-1">
            Laboratory Details
          </div>

          <div className="glass-panel-level2 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                Laboratory Name
              </label>
              <input
                type="text"
                value={labName}
                onChange={(e) => setLabName(e.target.value)}
                className="glass-input-field w-full px-3.5 py-2.5 text-[#EEEEEE] text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                Current Authenticated Officer
              </label>
              <input
                type="text"
                value={officerName}
                disabled
                className="glass-input-field w-full px-3.5 py-2.5 text-[#74777A] text-xs cursor-not-allowed opacity-75"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="glass-btn-primary px-5 py-2.5 text-xs font-semibold flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-[#EEEEEE]" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};

