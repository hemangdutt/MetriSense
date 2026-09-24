import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  FileCode, 
  Code2
} from 'lucide-react';

interface FlutterSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FLUTTER_FILES: { path: string; name: string; folder: string; code: string }[] = [
  {
    path: 'pubspec.yaml',
    name: 'pubspec.yaml',
    folder: 'root',
    code: `name: metrisense
description: Precision Evaluation Platform for Non-Automatic Weighing Instruments (OIML R 76).
version: 1.0.0+1

environment:
  sdk: ">=2.17.0 <4.0.0"
  flutter: ">=3.0.0"

dependencies:
  flutter:
    sdk: flutter

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^2.0.0

flutter:
  uses-material-design: true`,
  },
  {
    path: 'lib/models/oiml_models.dart',
    name: 'oiml_models.dart',
    folder: 'lib/models',
    code: `enum AccuracyClass {
  classI,
  classII,
  classIII,
  classIIII,
}

extension AccuracyClassExtension on AccuracyClass {
  String get label {
    switch (this) {
      case AccuracyClass.classI: return 'Class I';
      case AccuracyClass.classII: return 'Class II';
      case AccuracyClass.classIII: return 'Class III';
      case AccuracyClass.classIIII: return 'Class IIII';
    }
  }
}

class Instrument {
  final String manufacturer;
  final String model;
  final String serialNumber;
  final String instrumentType;
  final AccuracyClass accuracyClass;
  final double maxCapacity;
  final double minCapacity;
  final double verificationScaleInterval; // e
  final String unit;
  final double n; // Max / e

  Instrument({
    required this.manufacturer,
    required this.model,
    required this.serialNumber,
    required this.instrumentType,
    required this.accuracyClass,
    required this.maxCapacity,
    required this.minCapacity,
    required this.verificationScaleInterval,
    this.unit = 'kg',
    required this.n,
  });
}

class LaboratoryConditions {
  final String laboratory;
  final String testLocation;
  final double ambientTemperature;
  final double relativeHumidity;
  final double atmosphericPressure;
  final String date;
  final String operator;
  final String equipmentUsed;

  LaboratoryConditions({
    required this.laboratory,
    required this.testLocation,
    required this.ambientTemperature,
    required this.relativeHumidity,
    required this.atmosphericPressure,
    required this.date,
    required this.operator,
    required this.equipmentUsed,
  });
}

enum TestStatus { pass, fail, pending }

class TestObservation {
  final String id;
  final String testType;
  final String testName;
  final String loadStage;
  final double appliedLoad;
  final double indicatedValue;
  final double deltaLoad;
  final double calculatedError;
  final double mpe;
  final TestStatus status;

  TestObservation({
    required this.id,
    required this.testType,
    required this.testName,
    required this.loadStage,
    required this.appliedLoad,
    required this.indicatedValue,
    required this.deltaLoad,
    required this.calculatedError,
    required this.mpe,
    required this.status,
  });
}

class Evaluation {
  final String id;
  final Instrument instrument;
  final LaboratoryConditions laboratoryConditions;
  final List<TestObservation> tests;
  final String status;
  final String createdAt;
  final String updatedAt;
  final String conclusion;
  final String? officerNotes;

  Evaluation({
    required this.id,
    required this.instrument,
    required this.laboratoryConditions,
    required this.tests,
    required this.status,
    required this.createdAt,
    required this.updatedAt,
    required this.conclusion,
    this.officerNotes,
  });
}`,
  },
  {
    path: 'lib/services/oiml_calculation_engine.dart',
    name: 'oiml_calculation_engine.dart',
    folder: 'lib/services',
    code: `import '../models/oiml_models.dart';

class EvaluationResult {
  final double calculatedError;
  final double mpe;
  final TestStatus status;

  EvaluationResult({
    required this.calculatedError,
    required this.mpe,
    required this.status,
  });
}

class OimlCalculationEngine {
  /// n = Max / e
  static double calculateVerificationIntervals(double maxCapacity, double e) {
    if (e <= 0 || maxCapacity <= 0) return 0.0;
    return (maxCapacity / e);
  }

  /// OIML R 76-1 Table 6 Maximum Permissible Error (MPE)
  static double getMpe(double appliedLoad, double e, AccuracyClass accuracyClass) {
    if (e <= 0 || appliedLoad < 0) return 0.0;
    final double m = appliedLoad / e;
    double mpeFactor;

    switch (accuracyClass) {
      case AccuracyClass.classI:
        mpeFactor = m <= 50000 ? 0.5 : (m <= 200000 ? 1.0 : 1.5);
        break;
      case AccuracyClass.classII:
        mpeFactor = m <= 5000 ? 0.5 : (m <= 20000 ? 1.0 : 1.5);
        break;
      case AccuracyClass.classIII:
        mpeFactor = m <= 500 ? 0.5 : (m <= 2000 ? 1.0 : 1.5);
        break;
      case AccuracyClass.classIIII:
        mpeFactor = m <= 50 ? 0.5 : (m <= 200 ? 1.0 : 1.5);
        break;
    }
    return double.parse((mpeFactor * e).toStringAsFixed(6));
  }

  /// E = I + 0.5e - ΔL - L
  static double calculateError(double ind, double load, double deltaLoad, double e) {
    double rawError;
    if (deltaLoad > 0) {
      rawError = ind + 0.5 * e - deltaLoad - load;
    } else {
      rawError = ind - load;
    }
    return double.parse(rawError.toStringAsFixed(6));
  }

  static EvaluationResult evaluateObservation({
    required double appliedLoad,
    required double indicatedValue,
    required double deltaLoad,
    required double e,
    required AccuracyClass accuracyClass,
  }) {
    final double err = calculateError(indicatedValue, appliedLoad, deltaLoad, e);
    final double mpe = getMpe(appliedLoad, e, accuracyClass);
    final bool passed = err.abs() <= (mpe + 1e-9);

    return EvaluationResult(
      calculatedError: err,
      mpe: mpe,
      status: passed ? TestStatus.pass : TestStatus.fail,
    );
  }
}`,
  },
];

export const FlutterSourceModal: React.FC<FlutterSourceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState(FLUTTER_FILES[0]);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 font-sans text-xs animate-in fade-in duration-200">
      <div className="glass-panel-level2 w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl rounded-[28px] overflow-hidden border border-white/[0.12]">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <Code2 className="w-4 h-4 text-[#EEEEEE]" />
            <span className="font-semibold text-sm text-[#EEEEEE] tracking-tight">
              Flutter Architecture Specification
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="glass-btn-secondary px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer text-[#EEEEEE]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#8EB89B]" /> : <Copy className="w-3.5 h-3.5 text-[#B0B2B4]" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/[0.08] text-[#B0B2B4] hover:text-[#EEEEEE] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* File Explorer */}
          <div className="w-64 border-r border-white/[0.06] bg-black/20 p-3 space-y-1 overflow-y-auto">
            <div className="text-[11px] font-semibold text-[#74777A] uppercase tracking-wider px-2 py-1">
              Dart & Flutter Spec
            </div>

            {FLUTTER_FILES.map((file) => {
              const active = selectedFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-all cursor-pointer ${
                    active
                      ? 'bg-white/[0.12] text-[#EEEEEE] font-semibold border border-white/[0.18] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)]'
                      : 'text-[#B0B2B4] hover:bg-white/[0.05] hover:text-[#EEEEEE] border border-transparent'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 shrink-0 text-[#74777A]" />
                  <span className="truncate">{file.name}</span>
                </button>
              );
            })}
          </div>

          {/* Code Viewer */}
          <div className="flex-1 flex flex-col bg-black/35 overflow-hidden">
            <div className="px-5 py-2.5 border-b border-white/[0.06] text-xs text-[#74777A] flex items-center justify-between bg-white/[0.02]">
              <span className="font-mono text-[11px] text-[#B0B2B4]">{selectedFile.path}</span>
              <span className="text-[11px]">Dart SDK 3.x / Material 3 Glass</span>
            </div>
            <pre className="flex-1 p-5 text-xs text-[#E0E2E4] overflow-auto leading-relaxed select-text font-mono">
              <code>{selectedFile.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
