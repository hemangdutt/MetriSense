import React, { useState } from 'react';
import { 
  AccuracyClass, 
  InstrumentType, 
  Evaluation, 
  TestObservation 
} from '../types/oiml';
import { OimlCalculationEngine } from '../services/oimlCalculationEngine';
import { StatusBadge } from '../components/StatusBadge';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Plus, 
  Trash2, 
  RotateCcw,
  Sparkles,
  Save,
  CheckCircle2,
  FileCheck2
} from 'lucide-react';

interface NewEvaluationScreenProps {
  officerName: string;
  onSaveEvaluation: (evaluation: Evaluation) => void;
  onCancel: () => void;
  generatedId: string;
}

export const NewEvaluationScreen: React.FC<NewEvaluationScreenProps> = ({
  officerName,
  onSaveEvaluation,
  onCancel,
  generatedId,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // ──────────────────────────────────────────
  // STEP 01: INSTRUMENT INFORMATION
  // ──────────────────────────────────────────
  const [manufacturer, setManufacturer] = useState('Apex Instruments');
  const [model, setModel] = useState('AX-300');
  const [serialNumber, setSerialNumber] = useState('AX300-24091');
  const [instrumentType, setInstrumentType] = useState<InstrumentType>('Electronic Weighing Instrument');
  const [accuracyClass, setAccuracyClass] = useState<AccuracyClass>('Class III');
  const [maxCapacity, setMaxCapacity] = useState<number>(30);
  const [minCapacity, setMinCapacity] = useState<number>(0.2);
  const [eInterval, setEInterval] = useState<number>(0.01);
  const [unit, setUnit] = useState<'kg' | 'g'>('kg');
  const [step1Errors, setStep1Errors] = useState<Record<string, string>>({});

  // Verification intervals: n = Max / e
  const calculatedN = OimlCalculationEngine.calculateVerificationIntervals(maxCapacity, eInterval);

  // ──────────────────────────────────────────
  // STEP 02: LABORATORY CONDITIONS
  // ──────────────────────────────────────────
  const [laboratory, setLaboratory] = useState('National Metrology Institute - Laboratory 03');
  const [testLocation, setTestLocation] = useState('Mass Calibration Bay B-12');
  const [ambientTemperature, setAmbientTemperature] = useState<number>(23.4);
  const [relativeHumidity, setRelativeHumidity] = useState<number>(48.0);
  const [atmosphericPressure, setAtmosphericPressure] = useState<number>(1012.0);
  const [testDate, setTestDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [operator, setOperator] = useState<string>(officerName);
  const [equipmentUsed, setEquipmentUsed] = useState<string>(
    'Class E2 Standard Stainless Weight Set (S/N NMI-E2-441), BaroMet 900'
  );
  const [step2Errors, setStep2Errors] = useState<Record<string, string>>({});

  // ──────────────────────────────────────────
  // STEP 03: TEST SCREEN / MEASUREMENT WORKSTATION
  // ──────────────────────────────────────────
  const [activeTestType, setActiveTestType] = useState<'INCREASING LOAD' | 'DECREASING LOAD' | 'REPEATABILITY' | 'ECCENTRICITY'>('INCREASING LOAD');
  const [workAppliedLoad, setWorkAppliedLoad] = useState<number>(10.000);
  const [workIndication, setWorkIndication] = useState<number>(10.010);
  const [workDeltaLoad, setWorkDeltaLoad] = useState<number>(0.000);

  // Initial standard test observations
  const [tests, setTests] = useState<TestObservation[]>([
    {
      id: 't-0',
      testType: 'zero_indication',
      testName: 'Zero Setting & Zero Indication',
      loadStage: 'Zero (0.000 kg)',
      appliedLoad: 0.000,
      indicatedValue: 0.000,
      deltaLoad: 0.005,
      calculatedError: 0.000,
      mpe: 0.005,
      status: 'PASS',
    },
    {
      id: 't-1',
      testType: 'increasing_load',
      testName: 'Increasing-Load Test',
      loadStage: 'Min (0.200 kg)',
      appliedLoad: 0.200,
      indicatedValue: 0.200,
      deltaLoad: 0.005,
      calculatedError: 0.000,
      mpe: 0.005,
      status: 'PASS',
    },
    {
      id: 't-2',
      testType: 'increasing_load',
      testName: 'Increasing-Load Test',
      loadStage: '500e (5.000 kg)',
      appliedLoad: 5.000,
      indicatedValue: 5.000,
      deltaLoad: 0.005,
      calculatedError: 0.000,
      mpe: 0.005,
      status: 'PASS',
    },
    {
      id: 't-3',
      testType: 'increasing_load',
      testName: 'Increasing-Load Test',
      loadStage: '10.000 kg',
      appliedLoad: 10.000,
      indicatedValue: 10.010,
      deltaLoad: 0.000,
      calculatedError: 0.005,
      mpe: 0.010,
      status: 'PASS',
    },
    {
      id: 't-4',
      testType: 'increasing_load',
      testName: 'Increasing-Load Test',
      loadStage: 'Max (30.000 kg)',
      appliedLoad: 30.000,
      indicatedValue: 30.010,
      deltaLoad: 0.005,
      calculatedError: 0.005,
      mpe: 0.015,
      status: 'PASS',
    },
    {
      id: 't-5',
      testType: 'decreasing_load',
      testName: 'Decreasing-Load Test',
      loadStage: '0.5 Max (15.000 kg)',
      appliedLoad: 15.000,
      indicatedValue: 15.000,
      deltaLoad: 0.005,
      calculatedError: 0.000,
      mpe: 0.010,
      status: 'PASS',
    },
  ]);

  // Live calculation for the workstation panel
  const liveCalculation = OimlCalculationEngine.evaluateObservation(
    workAppliedLoad,
    workIndication,
    workDeltaLoad,
    eInterval,
    accuracyClass
  );

  const handleRecordWorkstationObservation = () => {
    const newObs: TestObservation = {
      id: `obs-${Date.now()}`,
      testType: activeTestType === 'DECREASING LOAD' ? 'decreasing_load' : 'increasing_load',
      testName: `${activeTestType.charAt(0) + activeTestType.slice(1).toLowerCase()} Test`,
      loadStage: `${workAppliedLoad.toFixed(3)} ${unit}`,
      appliedLoad: workAppliedLoad,
      indicatedValue: workIndication,
      deltaLoad: workDeltaLoad,
      calculatedError: liveCalculation.calculatedError,
      mpe: liveCalculation.mpe,
      status: liveCalculation.status,
    };
    setTests((prev) => [...prev, newObs]);
  };

  const handleRemoveTest = (id: string) => {
    setTests((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAutoGenerateStandardPoints = () => {
    const e = eInterval;
    const max = maxCapacity;
    const min = minCapacity;
    const generated: TestObservation[] = [];

    // 1. Zero
    const zRes = OimlCalculationEngine.evaluateObservation(0, 0, e * 0.5, e, accuracyClass);
    generated.push({
      id: `gen-zero-${Date.now()}`,
      testType: 'zero_indication',
      testName: 'Zero Setting & Zero Indication',
      loadStage: `Zero (0.000 ${unit})`,
      appliedLoad: 0,
      indicatedValue: 0,
      deltaLoad: e * 0.5,
      calculatedError: zRes.calculatedError,
      mpe: zRes.mpe,
      status: zRes.status,
    });

    // 2. Min
    const minRes = OimlCalculationEngine.evaluateObservation(min, min, e * 0.5, e, accuracyClass);
    generated.push({
      id: `gen-min-${Date.now()}`,
      testType: 'increasing_load',
      testName: 'Increasing-Load Test',
      loadStage: `Min (${min.toFixed(3)} ${unit})`,
      appliedLoad: min,
      indicatedValue: min,
      deltaLoad: e * 0.5,
      calculatedError: minRes.calculatedError,
      mpe: minRes.mpe,
      status: minRes.status,
    });

    // 3. 500e
    const p500e = Math.round(500 * e * 1000) / 1000;
    if (p500e < max && p500e > min) {
      const res500 = OimlCalculationEngine.evaluateObservation(p500e, p500e, e * 0.5, e, accuracyClass);
      generated.push({
        id: `gen-500e-${Date.now()}`,
        testType: 'increasing_load',
        testName: 'Increasing-Load Test',
        loadStage: `500e (${p500e.toFixed(3)} ${unit})`,
        appliedLoad: p500e,
        indicatedValue: p500e,
        deltaLoad: e * 0.5,
        calculatedError: res500.calculatedError,
        mpe: res500.mpe,
        status: res500.status,
      });
    }

    // 4. 2000e
    const p2000e = Math.round(2000 * e * 1000) / 1000;
    if (p2000e < max && p2000e > min && p2000e > p500e) {
      const res2000 = OimlCalculationEngine.evaluateObservation(p2000e, p2000e, e * 0.5, e, accuracyClass);
      generated.push({
        id: `gen-2000e-${Date.now()}`,
        testType: 'increasing_load',
        testName: 'Increasing-Load Test',
        loadStage: `2000e (${p2000e.toFixed(3)} ${unit})`,
        appliedLoad: p2000e,
        indicatedValue: p2000e,
        deltaLoad: e * 0.5,
        calculatedError: res2000.calculatedError,
        mpe: res2000.mpe,
        status: res2000.status,
      });
    }

    // 5. Max
    const maxRes = OimlCalculationEngine.evaluateObservation(max, max, e * 0.5, e, accuracyClass);
    generated.push({
      id: `gen-max-${Date.now()}`,
      testType: 'increasing_load',
      testName: 'Increasing-Load Test',
      loadStage: `Max (${max.toFixed(3)} ${unit})`,
      appliedLoad: max,
      indicatedValue: max,
      deltaLoad: e * 0.5,
      calculatedError: maxRes.calculatedError,
      mpe: maxRes.mpe,
      status: maxRes.status,
    });

    // 6. Decreasing load at 0.5 Max
    const decLoad = Math.round(max * 0.5 * 1000) / 1000;
    const decRes = OimlCalculationEngine.evaluateObservation(decLoad, decLoad, e * 0.5, e, accuracyClass);
    generated.push({
      id: `gen-dec-${Date.now()}`,
      testType: 'decreasing_load',
      testName: 'Decreasing-Load Test',
      loadStage: `0.5 Max (${decLoad.toFixed(3)} ${unit})`,
      appliedLoad: decLoad,
      indicatedValue: decLoad,
      deltaLoad: e * 0.5,
      calculatedError: decRes.calculatedError,
      mpe: decRes.mpe,
      status: decRes.status,
    });

    setTests(generated);
  };

  // ──────────────────────────────────────────
  // STEP 04: REVIEW & SUBMIT
  // ──────────────────────────────────────────
  const [officerNotes, setOfficerNotes] = useState(
    'Instrument has undergone complete verification across specified test points. Observations comply with OIML R 76-1 Table 6 tolerances.'
  );

  const handleNext = () => {
    if (currentStep === 1) {
      const val = OimlCalculationEngine.validateInstrument({
        manufacturer,
        model,
        serialNumber,
        maxCapacity,
        minCapacity,
        verificationScaleInterval: eInterval,
      });
      if (!val.isValid) {
        setStep1Errors(val.errors);
        return;
      }
      setStep1Errors({});
      setCurrentStep(2);
    } else if (currentStep === 2) {
      const val = OimlCalculationEngine.validateLaboratoryConditions({
        laboratory,
        operator,
        ambientTemperature,
        relativeHumidity,
        atmosphericPressure,
      });
      if (!val.isValid) {
        setStep2Errors(val.errors);
        return;
      }
      setStep2Errors({});
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleSaveEvaluation = (status: 'IN PROGRESS' | 'COMPLETED' | 'REPORTS READY') => {
    const hasFail = tests.some((t) => t.status === 'FAIL');
    const conclusion = hasFail ? 'NON-COMPLIANT' : 'COMPLIANT';

    const newEval: Evaluation = {
      id: generatedId,
      instrument: {
        manufacturer,
        model,
        serialNumber,
        instrumentType,
        accuracyClass,
        maxCapacity,
        minCapacity,
        verificationScaleInterval: eInterval,
        unit,
        n: calculatedN,
      },
      laboratoryConditions: {
        laboratory,
        testLocation,
        ambientTemperature,
        relativeHumidity,
        atmosphericPressure,
        date: testDate,
        operator,
        equipmentUsed,
      },
      tests,
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      conclusion,
      officerNotes,
    };

    onSaveEvaluation(newEval);
  };

  const failedTestsCount = tests.filter((t) => t.status === 'FAIL').length;
  const isOverallCompliant = failedTestsCount === 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans pb-12 select-none">
      {/* ──────────────────────────────────────────
          TOP HEADER & BREADCRUMB
         ────────────────────────────────────────── */}
      <div className="pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#EEEEEE] tracking-tight">
            New Evaluation
          </h1>
          <p className="text-xs text-[#B0B2B4] mt-1">
            Reference ID: <span className="font-mono text-[#EEEEEE]">{generatedId}</span>
          </p>
        </div>

        <button
          onClick={onCancel}
          className="glass-btn-secondary px-3 py-1.5 text-xs text-[#B0B2B4] hover:text-[#EEEEEE] font-medium flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Cancel</span>
        </button>
      </div>

      {/* ──────────────────────────────────────────
          PROGRESS STEP NAVIGATION (Glass Controls)
         ────────────────────────────────────────── */}
      <div className="glass-panel-interactive px-4 py-3 rounded-[18px] flex items-center justify-between text-xs overflow-x-auto gap-2">
        {[
          { step: 1, title: '01 Instrument' },
          { step: 2, title: '02 Laboratory' },
          { step: 3, title: '03 Tests' },
          { step: 4, title: '04 Review' },
        ].map((item, idx, arr) => {
          const isActive = currentStep === item.step;
          const isPassed = currentStep > item.step;

          return (
            <React.Fragment key={item.step}>
              <button
                onClick={() => {
                  if (item.step < currentStep) setCurrentStep(item.step as any);
                }}
                disabled={item.step > currentStep}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap text-xs ${
                  isActive
                    ? 'bg-white/[0.12] text-[#EEEEEE] font-medium border border-white/[0.20] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.20),0_4px_14px_rgba(0,0,0,0.35)]'
                    : isPassed
                    ? 'text-[#EEEEEE] hover:bg-white/[0.05] cursor-pointer'
                    : 'text-[#74777A] cursor-not-allowed'
                }`}
              >
                {isPassed ? (
                  <Check className="w-3.5 h-3.5 text-[#8EB89B]" />
                ) : (
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#EEEEEE]' : 'bg-white/20'}`} />
                )}
                <span>{item.title}</span>
              </button>

              {idx < arr.length - 1 && (
                <div className="flex-1 max-w-[40px] mx-2 h-[1px] bg-white/[0.08] hidden sm:block" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ──────────────────────────────────────────
          STEP 01: INSTRUMENT INFORMATION
         ────────────────────────────────────────── */}
      {currentStep === 1 && (
        <div className="glass-panel-level2 p-6 sm:p-7 space-y-6">
          {/* SECTION: INSTRUMENT IDENTITY */}
          <div className="space-y-4">
            <div className="text-sm font-semibold text-[#EEEEEE]">
              Instrument Specifications
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                  Manufacturer
                </label>
                <input
                  type="text"
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  className="glass-input-field w-full px-3.5 py-2.5 text-xs text-[#EEEEEE]"
                  placeholder="Apex Instruments Pvt. Ltd."
                />
                {step1Errors.manufacturer && (
                  <span className="text-xs text-[#B87C7C] mt-1 block">
                    {step1Errors.manufacturer}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                  Model
                </label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="glass-input-field w-full px-3.5 py-2.5 text-xs text-[#EEEEEE]"
                  placeholder="Apex Precision Series"
                />
                {step1Errors.model && (
                  <span className="text-xs text-[#B87C7C] mt-1 block">
                    {step1Errors.model}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                  Serial number
                </label>
                <input
                  type="text"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  className="glass-input-field w-full px-3.5 py-2.5 text-xs text-[#EEEEEE]"
                />
                {step1Errors.serialNumber && (
                  <span className="text-xs text-[#B87C7C] mt-1 block">
                    {step1Errors.serialNumber}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                  Instrument type
                </label>
                <select
                  value={instrumentType}
                  onChange={(e) => setInstrumentType(e.target.value as InstrumentType)}
                  className="glass-input-field w-full px-3.5 py-2.5 text-xs text-[#EEEEEE] bg-[#0B0D0F]"
                >
                  <option value="Electronic Weighing Instrument">Electronic Weighing Instrument</option>
                  <option value="Mechanical Weighing Instrument">Mechanical Weighing Instrument</option>
                  <option value="Hybrid Scale">Hybrid Scale</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION: METROLOGICAL PARAMETERS */}
          <div className="space-y-4 pt-2 border-t border-white/[0.06]">
            <div className="text-sm font-semibold text-[#EEEEEE]">
              Metrological Parameters
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                  Accuracy class
                </label>
                <select
                  value={accuracyClass}
                  onChange={(e) => setAccuracyClass(e.target.value as AccuracyClass)}
                  className="glass-input-field w-full px-3.5 py-2.5 text-xs text-[#EEEEEE] bg-[#0B0D0F]"
                >
                  <option value="Class I">Class I (Special)</option>
                  <option value="Class II">Class II (High)</option>
                  <option value="Class III">Class III (Medium)</option>
                  <option value="Class IIII">Class IIII (Ordinary)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                  Max capacity ({unit})
                </label>
                <input
                  type="number"
                  step="any"
                  value={maxCapacity}
                  onChange={(e) => setMaxCapacity(parseFloat(e.target.value) || 0)}
                  className="glass-input-field w-full px-3.5 py-2.5 text-xs text-[#EEEEEE]"
                />
                {step1Errors.maxCapacity && (
                  <span className="text-xs text-[#B87C7C] mt-1 block">
                    {step1Errors.maxCapacity}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                  Min capacity ({unit})
                </label>
                <input
                  type="number"
                  step="any"
                  value={minCapacity}
                  onChange={(e) => setMinCapacity(parseFloat(e.target.value) || 0)}
                  className="glass-input-field w-full px-3.5 py-2.5 text-xs text-[#EEEEEE]"
                />
                {step1Errors.minCapacity && (
                  <span className="text-xs text-[#B87C7C] mt-1 block">
                    {step1Errors.minCapacity}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                  Scale interval e ({unit})
                </label>
                <input
                  type="number"
                  step="any"
                  value={eInterval}
                  onChange={(e) => setEInterval(parseFloat(e.target.value) || 0)}
                  className="glass-input-field w-full px-3.5 py-2.5 text-xs text-[#EEEEEE]"
                />
                {step1Errors.verificationScaleInterval && (
                  <span className="text-xs text-[#B87C7C] mt-1 block">
                    {step1Errors.verificationScaleInterval}
                  </span>
                )}
              </div>
            </div>

            {/* Technical Information Row */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="text-[#B0B2B4]">
                <span>Calculated verification scale intervals: </span>
                <span className="text-[#EEEEEE] font-medium">n = Max / e = {calculatedN.toLocaleString()}</span>
              </div>
              <div className="text-[#74777A] text-xs">
                OIML R 76-1 Table 3 compliant
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────
          STEP 02: LABORATORY CONDITIONS
         ────────────────────────────────────────── */}
      {currentStep === 2 && (
        <div className="glass-panel-level2 p-6 sm:p-7 space-y-6">
          <div className="space-y-4">
            <div className="text-sm font-semibold text-[#EEEEEE]">
              Laboratory Identification
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                  Laboratory name
                </label>
                <input
                  type="text"
                  value={laboratory}
                  onChange={(e) => setLaboratory(e.target.value)}
                  className="glass-input-field w-full px-3.5 py-2.5 text-xs text-[#EEEEEE]"
                  placeholder="Apex Metrology Testing Lab"
                />
                {step2Errors.laboratory && (
                  <span className="text-xs text-[#B87C7C] mt-1 block">
                    {step2Errors.laboratory}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                  Test location
                </label>
                <input
                  type="text"
                  value={testLocation}
                  onChange={(e) => setTestLocation(e.target.value)}
                  className="glass-input-field w-full px-3.5 py-2.5 text-xs text-[#EEEEEE]"
                  placeholder="Environmental Chamber A-2"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                  Operator
                </label>
                <input
                  type="text"
                  value={operator}
                  onChange={(e) => setOperator(e.target.value)}
                  className="glass-input-field w-full px-3.5 py-2.5 text-xs text-[#EEEEEE]"
                />
                {step2Errors.operator && (
                  <span className="text-xs text-[#B87C7C] mt-1 block">
                    {step2Errors.operator}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                  Date
                </label>
                <input
                  type="date"
                  value={testDate}
                  onChange={(e) => setTestDate(e.target.value)}
                  className="glass-input-field w-full px-3.5 py-2.5 text-xs text-[#EEEEEE] bg-[#0B0D0F]"
                />
              </div>
            </div>
          </div>

          {/* SECTION: ENVIRONMENT */}
          <div className="space-y-4 pt-2 border-t border-white/[0.06]">
            <div className="text-sm font-semibold text-[#EEEEEE]">
              Environmental Conditions
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                  Temperature
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={ambientTemperature}
                    onChange={(e) => setAmbientTemperature(parseFloat(e.target.value) || 0)}
                    className="glass-input-field w-full px-3.5 py-2.5 pr-12 text-xs text-[#EEEEEE]"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-[#74777A]">
                    °C
                  </span>
                </div>
                {step2Errors.ambientTemperature && (
                  <span className="text-xs text-[#B87C7C] mt-1 block">
                    {step2Errors.ambientTemperature}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                  Humidity
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    value={relativeHumidity}
                    onChange={(e) => setRelativeHumidity(parseFloat(e.target.value) || 0)}
                    className="glass-input-field w-full px-3.5 py-2.5 pr-12 text-xs text-[#EEEEEE]"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-[#74777A]">
                    % RH
                  </span>
                </div>
                {step2Errors.relativeHumidity && (
                  <span className="text-xs text-[#B87C7C] mt-1 block">
                    {step2Errors.relativeHumidity}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                  Atmospheric Pressure
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    value={atmosphericPressure}
                    onChange={(e) => setAtmosphericPressure(parseFloat(e.target.value) || 0)}
                    className="glass-input-field w-full px-3.5 py-2.5 pr-12 text-xs text-[#EEEEEE]"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-[#74777A]">
                    hPa
                  </span>
                </div>
                {step2Errors.atmosphericPressure && (
                  <span className="text-xs text-[#B87C7C] mt-1 block">
                    {step2Errors.atmosphericPressure}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                Standard equipment
              </label>
              <input
                type="text"
                value={equipmentUsed}
                onChange={(e) => setEquipmentUsed(e.target.value)}
                className="glass-input-field w-full px-3.5 py-2.5 text-xs text-[#EEEEEE]"
                placeholder="F1 Class Stainless Steel Weight Set SN: W-998"
              />
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────
          STEP 03: TEST WORKSTATION & LOG (Layered Glass)
         ────────────────────────────────────────── */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="glass-panel-level2 p-6 sm:p-7 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
              <div>
                <div className="text-sm font-semibold text-[#EEEEEE]">
                  OIML R 76 Test Workspace
                </div>
                <div className="text-xs text-[#B0B2B4] mt-0.5">
                  Calculation engine: E = I + 0.5e - ΔL - L
                </div>
              </div>

              {/* Test Type Selectors */}
              <div className="flex items-center gap-1.5 text-xs">
                {(['INCREASING LOAD', 'DECREASING LOAD', 'REPEATABILITY'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setActiveTestType(t)}
                    className={`px-3 py-1.5 rounded-xl transition-all text-xs font-medium ${
                      activeTestType === t
                        ? 'bg-white/[0.14] text-[#EEEEEE] border border-white/[0.22] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.20)]'
                        : 'text-[#B0B2B4] hover:text-[#EEEEEE] bg-white/[0.04] border border-white/[0.08]'
                    }`}
                  >
                    {t === 'INCREASING LOAD' ? 'Increasing Load' : t === 'DECREASING LOAD' ? 'Decreasing Load' : 'Repeatability'}
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Input Fields: APPLIED LOAD, INDICATION, ΔL */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                  Applied Load ({unit})
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={workAppliedLoad}
                  onChange={(e) => setWorkAppliedLoad(parseFloat(e.target.value) || 0)}
                  className="glass-input-field w-full px-3.5 py-2.5 text-xs text-[#EEEEEE]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                  Indicated Value ({unit})
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={workIndication}
                  onChange={(e) => setWorkIndication(parseFloat(e.target.value) || 0)}
                  className="glass-input-field w-full px-3.5 py-2.5 text-xs text-[#EEEEEE]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
                  ΔL ({unit})
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={workDeltaLoad}
                  onChange={(e) => setWorkDeltaLoad(parseFloat(e.target.value) || 0)}
                  className="glass-input-field w-full px-3.5 py-2.5 text-xs text-[#EEEEEE]"
                />
              </div>
            </div>

            {/* Live Calculation Result Readout Panel */}
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.10] text-xs flex flex-wrap items-center justify-between gap-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <div>
                  <span className="text-[#74777A] text-[11px] block">Calculated Error</span>
                  <span className="text-sm font-semibold text-[#EEEEEE] font-mono">
                    {liveCalculation.calculatedError >= 0 ? `+${liveCalculation.calculatedError.toFixed(4)}` : liveCalculation.calculatedError.toFixed(4)} {unit}
                  </span>
                </div>
                <span className="text-white/20">|</span>
                <div>
                  <span className="text-[#74777A] text-[11px] block">MPE Tolerance</span>
                  <span className="text-sm font-semibold text-[#B0B2B4] font-mono">
                    ±{liveCalculation.mpe.toFixed(4)} {unit}
                  </span>
                </div>
                <span className="text-white/20">|</span>
                <div>
                  <span className="text-[#74777A] text-[11px] block mb-0.5">Verification Result</span>
                  <StatusBadge status={liveCalculation.status} size="sm" variant="glass" />
                </div>
              </div>

              <button
                type="button"
                onClick={handleRecordWorkstationObservation}
                className="glass-btn-primary px-3.5 py-2 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Record Observation</span>
              </button>
            </div>
          </div>

          {/* OBSERVATIONS TABLE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="text-sm font-semibold text-[#EEEEEE]">
                Observations ({tests.length} points logged)
              </div>

              <button
                type="button"
                onClick={handleAutoGenerateStandardPoints}
                className="glass-btn-secondary px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 cursor-pointer text-[#B0B2B4] hover:text-[#EEEEEE]"
              >
                <Sparkles className="w-3 h-3 text-[#EEEEEE]" />
                <span>Fill Standard Points</span>
              </button>
            </div>

            <div className="glass-panel-level2 overflow-hidden border border-white/[0.09]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-white/[0.03] border-b border-white/[0.08] text-[#B0B2B4]">
                      <th className="py-3 px-4 font-semibold">Stage / Test</th>
                      <th className="py-3 px-4 font-semibold">Applied (L)</th>
                      <th className="py-3 px-4 font-semibold">Indicated (I)</th>
                      <th className="py-3 px-4 font-semibold">ΔL</th>
                      <th className="py-3 px-4 font-semibold">Error (E)</th>
                      <th className="py-3 px-4 font-semibold">MPE</th>
                      <th className="py-3 px-4 font-semibold">Result</th>
                      <th className="py-3 px-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05]">
                    {tests.map((item) => (
                      <tr key={item.id} className="hover:bg-white/[0.06] transition-colors">
                        <td className="py-2.5 px-4 text-[#EEEEEE] font-medium">
                          {item.loadStage}
                        </td>
                        <td className="py-2.5 px-4 text-[#B0B2B4] tabular-nums">
                          {item.appliedLoad.toFixed(3)}
                        </td>
                        <td className="py-2.5 px-4 text-[#B0B2B4] tabular-nums">
                          {item.indicatedValue.toFixed(3)}
                        </td>
                        <td className="py-2.5 px-4 text-[#74777A] tabular-nums">
                          {item.deltaLoad.toFixed(3)}
                        </td>
                        <td className="py-2.5 px-4 font-medium tabular-nums text-[#EEEEEE]">
                          {item.calculatedError >= 0 ? `+${item.calculatedError.toFixed(4)}` : item.calculatedError.toFixed(4)}
                        </td>
                        <td className="py-2.5 px-4 text-[#B0B2B4] tabular-nums">
                          ±{item.mpe.toFixed(4)}
                        </td>
                        <td className="py-2.5 px-4">
                          <StatusBadge status={item.status} size="sm" variant="glass" />
                        </td>
                        <td className="py-2.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleRemoveTest(item.id)}
                            className="p-1 text-[#74777A] hover:text-[#B87C7C] transition-colors"
                            title="Remove test point"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────
          STEP 04: REVIEW & SUBMIT
         ────────────────────────────────────────── */}
      {currentStep === 4 && (
        <div className="glass-panel-level2 p-6 sm:p-7 space-y-6">
          <div className="space-y-4">
            <div className="text-sm font-semibold text-[#EEEEEE]">
              Evaluation Summary
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.09] text-xs flex flex-wrap items-center gap-6 sm:gap-10">
              <div>
                <span className="text-[#74777A] block text-[11px]">Total test points</span>
                <span className="text-lg font-semibold text-[#EEEEEE] mt-0.5 block">{tests.length}</span>
              </div>
              <div className="w-[1px] h-8 bg-white/[0.08]" />
              <div>
                <span className="text-[#74777A] block text-[11px]">Failed tolerances</span>
                <span className={`text-lg font-semibold mt-0.5 block ${failedTestsCount > 0 ? 'text-[#B87C7C]' : 'text-[#8EB89B]'}`}>
                  {failedTestsCount}
                </span>
              </div>
              <div className="w-[1px] h-8 bg-white/[0.08]" />
              <div>
                <span className="text-[#74777A] block text-[11px]">Overall conclusion</span>
                <div className="mt-1">
                  <StatusBadge status={isOverallCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'} size="md" variant="glass" />
                </div>
              </div>
            </div>
          </div>

          {/* Instrument Recap */}
          <div className="space-y-2">
            <div className="text-sm font-semibold text-[#EEEEEE]">
              Instrument Specifications
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div>
                <span className="text-[#74777A] block text-[11px]">Manufacturer</span>
                <span className="text-[#EEEEEE] font-medium mt-0.5 block">{manufacturer}</span>
              </div>
              <div>
                <span className="text-[#74777A] block text-[11px]">Model</span>
                <span className="text-[#EEEEEE] font-medium mt-0.5 block">{model}</span>
              </div>
              <div>
                <span className="text-[#74777A] block text-[11px]">Accuracy class</span>
                <span className="text-[#EEEEEE] font-medium mt-0.5 block">{accuracyClass}</span>
              </div>
              <div>
                <span className="text-[#74777A] block text-[11px]">Intervals (n)</span>
                <span className="text-[#EEEEEE] font-medium mt-0.5 block">{calculatedN.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Sign-off Notes */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-[#B0B2B4]">
              Officer Remarks
            </label>
            <textarea
              rows={3}
              value={officerNotes}
              onChange={(e) => setOfficerNotes(e.target.value)}
              className="glass-input-field w-full px-3.5 py-2.5 text-xs text-[#EEEEEE]"
            />
          </div>

          {/* Submission Action Bar */}
          <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
            <button
              type="button"
              onClick={() => handleSaveEvaluation('IN PROGRESS')}
              className="glass-btn-secondary px-4 py-2 font-medium cursor-pointer"
            >
              Save as In Progress
            </button>

            <button
              type="button"
              onClick={() => handleSaveEvaluation('REPORTS READY')}
              className="glass-btn-primary px-4 py-2 font-semibold flex items-center gap-2 cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4 text-[#EEEEEE]" />
              <span>Complete Evaluation</span>
            </button>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────
          BOTTOM STEP NAVIGATION BUTTONS
         ────────────────────────────────────────── */}
      <div className="flex items-center justify-between pt-2">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={handlePrev}
            className="glass-btn-secondary px-3.5 py-2 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>
        ) : (
          <div />
        )}

        {currentStep < 4 && (
          <button
            type="button"
            onClick={handleNext}
            className="glass-btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-2 cursor-pointer"
          >
            <span>Next</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#EEEEEE]" />
          </button>
        )}
      </div>
    </div>
  );
};

