export type AccuracyClass = 'Class I' | 'Class II' | 'Class III' | 'Class IIII';

export type InstrumentType = 
  | 'Platform Scale'
  | 'Electronic Weighing Instrument'
  | 'Weighbridge'
  | 'Bench Scale'
  | 'Precision Analytical Balance';

export interface Instrument {
  manufacturer: string;
  model: string;
  serialNumber: string;
  instrumentType: InstrumentType;
  accuracyClass: AccuracyClass;
  maxCapacity: number; // e.g. 30
  minCapacity: number; // e.g. 0.2
  verificationScaleInterval: number; // e (e.g. 0.01)
  unit: 'kg' | 'g';
  n: number; // Max / e
}

export interface LaboratoryConditions {
  laboratory: string;
  testLocation: string;
  ambientTemperature: number; // °C
  relativeHumidity: number; // %
  atmosphericPressure: number; // hPa
  date: string;
  operator: string;
  equipmentUsed: string;
}

export type TestType = 
  | 'zero_indication'
  | 'increasing_load'
  | 'decreasing_load'
  | 'repeatability';

export interface TestObservation {
  id: string;
  testType: TestType;
  testName: string;
  loadStage: string; // e.g. "Min", "500e", "1000e", "2000e", "Max"
  appliedLoad: number; // L
  indicatedValue: number; // I
  deltaLoad: number; // ΔL (change-point addition, 0 if not used)
  calculatedError: number; // E
  mpe: number; // Maximum Permissible Error (±)
  status: 'PASS' | 'FAIL' | 'PENDING';
  repeatRunIndex?: number; // 1, 2, 3 for repeatability
}

export type EvaluationStatus = 
  | 'IN PROGRESS'
  | 'IN REVIEW'
  | 'COMPLETED'
  | 'REPORTS READY'
  | 'FAILED';

export interface Evaluation {
  id: string; // e.g. NAWI-2026-0042
  instrument: Instrument;
  laboratoryConditions: LaboratoryConditions;
  tests: TestObservation[];
  status: EvaluationStatus;
  createdAt: string;
  updatedAt: string;
  conclusion: 'COMPLIANT' | 'NON-COMPLIANT' | 'INCOMPLETE';
  officerNotes?: string;
}

export interface MpeRule {
  classType: AccuracyClass;
  m1: number; // in units of e (e.g. 0 to 500)
  m2: number; // in units of e (e.g. 500 to 2000)
  m3: number; // in units of e (e.g. 2000 to Max)
}
