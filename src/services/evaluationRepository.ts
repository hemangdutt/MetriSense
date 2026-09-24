import { Evaluation, TestObservation } from '../types/oiml';
import { OimlCalculationEngine } from './oimlCalculationEngine';

const STORAGE_KEY = 'metrisense_evaluations_v1';

export const INITIAL_EVALUATIONS: Evaluation[] = [
  {
    id: 'NAWI-2026-0042',
    instrument: {
      manufacturer: 'Apex Instruments Pvt Ltd',
      model: 'AX-300',
      serialNumber: 'AX-2026-90412',
      instrumentType: 'Electronic Weighing Instrument',
      accuracyClass: 'Class III',
      maxCapacity: 30,
      minCapacity: 0.2,
      verificationScaleInterval: 0.01,
      unit: 'kg',
      n: 3000,
    },
    laboratoryConditions: {
      laboratory: 'National Metrology Institute - Laboratory 03',
      testLocation: 'Mass & Load Calibration Bay B-12',
      ambientTemperature: 21.2,
      relativeHumidity: 48.5,
      atmosphericPressure: 1014.2,
      date: '2026-09-22',
      operator: 'Dr. V. Ramanathan, Metrology Lead',
      equipmentUsed: 'Class E2 Mass Standard Set (S/N NMI-E2-441), BaroMet 900',
    },
    status: 'IN PROGRESS',
    createdAt: '2026-09-22T09:30:00.000Z',
    updatedAt: '2026-09-23T14:15:00.000Z',
    conclusion: 'INCOMPLETE',
    officerNotes: 'Zero tracking verified. Increasing-load tests under execution across 5 load intervals.',
    tests: [
      {
        id: 't-01',
        testType: 'zero_indication',
        testName: 'Zero-setting and Zero-tracking Test',
        loadStage: 'Zero (0 kg)',
        appliedLoad: 0.0,
        indicatedValue: 0.0,
        deltaLoad: 0.005,
        calculatedError: 0.0,
        mpe: 0.005,
        status: 'PASS',
      },
      {
        id: 't-02',
        testType: 'increasing_load',
        testName: 'Increasing-Load Weighing Performance',
        loadStage: 'Min (0.2 kg)',
        appliedLoad: 0.2,
        indicatedValue: 0.2,
        deltaLoad: 0.005,
        calculatedError: 0.0,
        mpe: 0.005,
        status: 'PASS',
      },
      {
        id: 't-03',
        testType: 'increasing_load',
        testName: 'Increasing-Load Weighing Performance',
        loadStage: '500e (5.0 kg)',
        appliedLoad: 5.0,
        indicatedValue: 5.0,
        deltaLoad: 0.004,
        calculatedError: 0.001,
        mpe: 0.005,
        status: 'PASS',
      },
      {
        id: 't-04',
        testType: 'increasing_load',
        testName: 'Increasing-Load Weighing Performance',
        loadStage: '1000e (10.0 kg)',
        appliedLoad: 10.0,
        indicatedValue: 10.01,
        deltaLoad: 0.005,
        calculatedError: 0.01,
        mpe: 0.01,
        status: 'PASS',
      },
    ],
  },
  {
    id: 'NAWI-2026-0041',
    instrument: {
      manufacturer: 'Precision Weightech Solutions',
      model: 'PW-500',
      serialNumber: 'PWS-2026-0087',
      instrumentType: 'Platform Scale',
      accuracyClass: 'Class III',
      maxCapacity: 60,
      minCapacity: 0.4,
      verificationScaleInterval: 0.02,
      unit: 'kg',
      n: 3000,
    },
    laboratoryConditions: {
      laboratory: 'Regional Legal Metrology Laboratory (Western Zone)',
      testLocation: 'Heavy Mass Evaluation Chamber 2',
      ambientTemperature: 20.0,
      relativeHumidity: 50.0,
      atmosphericPressure: 1013.2,
      date: '2026-09-20',
      operator: 'A. K. Sharma, Senior Testing Officer',
      equipmentUsed: 'Class F1 Stainless Mass Array 100kg, Vaisala PTU300',
    },
    status: 'IN REVIEW',
    createdAt: '2026-09-20T11:00:00.000Z',
    updatedAt: '2026-09-23T16:40:00.000Z',
    conclusion: 'COMPLIANT',
    officerNotes: 'Full increasing and decreasing load sequence completed. Maximum observed error within OIML R 76 MPE limits.',
    tests: [
      {
        id: 'pw-01',
        testType: 'zero_indication',
        testName: 'Zero-setting and Zero-tracking Test',
        loadStage: 'Zero',
        appliedLoad: 0.0,
        indicatedValue: 0.0,
        deltaLoad: 0.01,
        calculatedError: 0.0,
        mpe: 0.01,
        status: 'PASS',
      },
      {
        id: 'pw-02',
        testType: 'increasing_load',
        testName: 'Increasing-Load Test',
        loadStage: 'Min (0.4 kg)',
        appliedLoad: 0.4,
        indicatedValue: 0.4,
        deltaLoad: 0.01,
        calculatedError: 0.0,
        mpe: 0.01,
        status: 'PASS',
      },
      {
        id: 'pw-03',
        testType: 'increasing_load',
        testName: 'Increasing-Load Test',
        loadStage: '500e (10.0 kg)',
        appliedLoad: 10.0,
        indicatedValue: 10.0,
        deltaLoad: 0.008,
        calculatedError: 0.002,
        mpe: 0.01,
        status: 'PASS',
      },
      {
        id: 'pw-04',
        testType: 'increasing_load',
        testName: 'Increasing-Load Test',
        loadStage: '2000e (40.0 kg)',
        appliedLoad: 40.0,
        indicatedValue: 40.02,
        deltaLoad: 0.01,
        calculatedError: 0.02,
        mpe: 0.02,
        status: 'PASS',
      },
      {
        id: 'pw-05',
        testType: 'increasing_load',
        testName: 'Increasing-Load Test',
        loadStage: 'Max (60.0 kg)',
        appliedLoad: 60.0,
        indicatedValue: 60.02,
        deltaLoad: 0.01,
        calculatedError: 0.02,
        mpe: 0.03,
        status: 'PASS',
      },
      {
        id: 'pw-06',
        testType: 'decreasing_load',
        testName: 'Decreasing-Load Test',
        loadStage: '40.0 kg',
        appliedLoad: 40.0,
        indicatedValue: 40.01,
        deltaLoad: 0.01,
        calculatedError: 0.01,
        mpe: 0.02,
        status: 'PASS',
      },
      {
        id: 'pw-07',
        testType: 'repeatability',
        testName: 'Repeatability Test (Run 1 @ 0.5 Max)',
        loadStage: '30.0 kg (Run 1)',
        appliedLoad: 30.0,
        indicatedValue: 30.0,
        deltaLoad: 0.01,
        calculatedError: 0.0,
        mpe: 0.02,
        status: 'PASS',
        repeatRunIndex: 1,
      },
      {
        id: 'pw-08',
        testType: 'repeatability',
        testName: 'Repeatability Test (Run 2 @ 0.5 Max)',
        loadStage: '30.0 kg (Run 2)',
        appliedLoad: 30.0,
        indicatedValue: 30.01,
        deltaLoad: 0.01,
        calculatedError: 0.01,
        mpe: 0.02,
        status: 'PASS',
        repeatRunIndex: 2,
      },
      {
        id: 'pw-09',
        testType: 'repeatability',
        testName: 'Repeatability Test (Run 3 @ 0.5 Max)',
        loadStage: '30.0 kg (Run 3)',
        appliedLoad: 30.0,
        indicatedValue: 30.0,
        deltaLoad: 0.01,
        calculatedError: 0.0,
        mpe: 0.02,
        status: 'PASS',
        repeatRunIndex: 3,
      },
    ],
  },
  {
    id: 'NAWI-2026-0039',
    instrument: {
      manufacturer: 'Metric Systems Instruments',
      model: 'MS-120',
      serialNumber: 'MS-9812-D',
      instrumentType: 'Bench Scale',
      accuracyClass: 'Class II',
      maxCapacity: 12,
      minCapacity: 0.05,
      verificationScaleInterval: 0.001,
      unit: 'kg',
      n: 12000,
    },
    laboratoryConditions: {
      laboratory: 'National Metrology Institute - Precision Physics Dept',
      testLocation: 'Climate Controlled Chamber A-04',
      ambientTemperature: 20.1,
      relativeHumidity: 45.0,
      atmosphericPressure: 1012.8,
      date: '2026-09-15',
      operator: 'Dr. Neha Sen, Chief Metrologist',
      equipmentUsed: 'Mettler E1 Reference Weight Set, Druck DPI-142',
    },
    status: 'COMPLETED',
    createdAt: '2026-09-15T08:00:00.000Z',
    updatedAt: '2026-09-18T17:00:00.000Z',
    conclusion: 'COMPLIANT',
    officerNotes: 'Instrument conforms strictly to OIML R 76 Class II requirements. Certificate recommended.',
    tests: [
      {
        id: 'ms-01',
        testType: 'zero_indication',
        testName: 'Zero-setting Test',
        loadStage: 'Zero',
        appliedLoad: 0.0,
        indicatedValue: 0.0,
        deltaLoad: 0.0005,
        calculatedError: 0.0,
        mpe: 0.0005,
        status: 'PASS',
      },
      {
        id: 'ms-02',
        testType: 'increasing_load',
        testName: 'Increasing-Load Test',
        loadStage: '5000e (5.0 kg)',
        appliedLoad: 5.0,
        indicatedValue: 5.0005,
        deltaLoad: 0.0005,
        calculatedError: 0.0005,
        mpe: 0.0005,
        status: 'PASS',
      },
      {
        id: 'ms-03',
        testType: 'increasing_load',
        testName: 'Increasing-Load Test',
        loadStage: 'Max (12.0 kg)',
        appliedLoad: 12.0,
        indicatedValue: 12.0008,
        deltaLoad: 0.0005,
        calculatedError: 0.0008,
        mpe: 0.001,
        status: 'PASS',
      },
    ],
  },
  {
    id: 'NAWI-2026-0038',
    instrument: {
      manufacturer: 'Avery Scale Metrology Corp',
      model: 'ASC-8000',
      serialNumber: 'ASC-88320-K',
      instrumentType: 'Weighbridge',
      accuracyClass: 'Class III',
      maxCapacity: 50000,
      minCapacity: 400,
      verificationScaleInterval: 20,
      unit: 'kg',
      n: 2500,
    },
    laboratoryConditions: {
      laboratory: 'Heavy Industrial Metrology Field Unit',
      testLocation: 'Test Weighbridge Bay 1, Port Facility',
      ambientTemperature: 24.5,
      relativeHumidity: 62.0,
      atmosphericPressure: 1011.0,
      date: '2026-09-12',
      operator: 'T. R. Deshmukh, Lead Field Inspector',
      equipmentUsed: 'Field Test Standard Weights Truck #4, 20x 1000kg Class M1',
    },
    status: 'REPORTS READY',
    createdAt: '2026-09-12T10:00:00.000Z',
    updatedAt: '2026-09-14T12:00:00.000Z',
    conclusion: 'COMPLIANT',
    officerNotes: 'Full type verification complete. Evaluation report ready for sign-off and issuance.',
    tests: [
      {
        id: 'asc-01',
        testType: 'zero_indication',
        testName: 'Zero-setting and Zero-tracking Test',
        loadStage: 'Zero',
        appliedLoad: 0,
        indicatedValue: 0,
        deltaLoad: 10,
        calculatedError: 0,
        mpe: 10,
        status: 'PASS',
      },
      {
        id: 'asc-02',
        testType: 'increasing_load',
        testName: 'Increasing-Load Test',
        loadStage: 'Min (400 kg)',
        appliedLoad: 400,
        indicatedValue: 400,
        deltaLoad: 10,
        calculatedError: 0,
        mpe: 10,
        status: 'PASS',
      },
      {
        id: 'asc-03',
        testType: 'increasing_load',
        testName: 'Increasing-Load Test',
        loadStage: '500e (10,000 kg)',
        appliedLoad: 10000,
        indicatedValue: 10000,
        deltaLoad: 10,
        calculatedError: 0,
        mpe: 10,
        status: 'PASS',
      },
      {
        id: 'asc-04',
        testType: 'increasing_load',
        testName: 'Increasing-Load Test',
        loadStage: '2000e (40,000 kg)',
        appliedLoad: 40000,
        indicatedValue: 40020,
        deltaLoad: 10,
        calculatedError: 20,
        mpe: 20,
        status: 'PASS',
      },
      {
        id: 'asc-05',
        testType: 'increasing_load',
        testName: 'Increasing-Load Test',
        loadStage: 'Max (50,000 kg)',
        appliedLoad: 50000,
        indicatedValue: 50020,
        deltaLoad: 10,
        calculatedError: 20,
        mpe: 30,
        status: 'PASS',
      },
    ],
  },
  {
    id: 'NAWI-2026-0035',
    instrument: {
      manufacturer: 'BioMetrik Instruments',
      model: 'BM-Micro-6',
      serialNumber: 'BM-2025-449',
      instrumentType: 'Precision Analytical Balance',
      accuracyClass: 'Class I',
      maxCapacity: 200,
      minCapacity: 1,
      verificationScaleInterval: 0.001,
      unit: 'g',
      n: 200000,
    },
    laboratoryConditions: {
      laboratory: 'National Metrology Institute - Precision Physics Dept',
      testLocation: 'Vibration-Isolated Room 01',
      ambientTemperature: 20.0,
      relativeHumidity: 45.2,
      atmosphericPressure: 1013.25,
      date: '2026-09-08',
      operator: 'Dr. V. Ramanathan, Metrology Lead',
      equipmentUsed: 'Class E1 Sub-gram Stainless Standards, BaroMet Micro',
    },
    status: 'FAILED',
    createdAt: '2026-09-08T09:00:00.000Z',
    updatedAt: '2026-09-10T11:20:00.000Z',
    conclusion: 'NON-COMPLIANT',
    officerNotes: 'Exceeded MPE at 150g load threshold. Non-compliance report generated for manufacturer rectification.',
    tests: [
      {
        id: 'bm-01',
        testType: 'zero_indication',
        testName: 'Zero Indication Test',
        loadStage: 'Zero',
        appliedLoad: 0,
        indicatedValue: 0,
        deltaLoad: 0.0005,
        calculatedError: 0,
        mpe: 0.0005,
        status: 'PASS',
      },
      {
        id: 'bm-02',
        testType: 'increasing_load',
        testName: 'Increasing Load Test',
        loadStage: '50,000e (50 g)',
        appliedLoad: 50,
        indicatedValue: 50.0004,
        deltaLoad: 0.0005,
        calculatedError: 0.0004,
        mpe: 0.0005,
        status: 'PASS',
      },
      {
        id: 'bm-03',
        testType: 'increasing_load',
        testName: 'Increasing Load Test',
        loadStage: '150,000e (150 g)',
        appliedLoad: 150,
        indicatedValue: 150.0018,
        deltaLoad: 0.0005,
        calculatedError: 0.0018,
        mpe: 0.001,
        status: 'FAIL',
      },
    ],
  },
];

export class EvaluationRepository {
  static getEvaluations(): Evaluation[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // LocalStorage access fallback
    }
    this.saveEvaluations(INITIAL_EVALUATIONS);
    return INITIAL_EVALUATIONS;
  }

  static saveEvaluations(evaluations: Evaluation[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(evaluations));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }

  static getById(id: string): Evaluation | undefined {
    const list = this.getEvaluations();
    return list.find((e) => e.id === id);
  }

  static saveEvaluation(evalData: Evaluation): void {
    const list = this.getEvaluations();
    const index = list.findIndex((e) => e.id === evalData.id);
    if (index >= 0) {
      list[index] = { ...evalData, updatedAt: new Date().toISOString() };
    } else {
      list.unshift(evalData);
    }
    this.saveEvaluations(list);
  }

  static generateNewId(): string {
    const list = this.getEvaluations();
    const year = new Date().getFullYear();
    const count = list.length + 43; // realistic serial offset
    const padded = String(count).padStart(4, '0');
    return `NAWI-${year}-${padded}`;
  }

  static getAll(): Evaluation[] {
    return this.getEvaluations();
  }

  static save(evalData: Evaluation): void {
    this.saveEvaluation(evalData);
  }

  static generateNextId(): string {
    return this.generateNewId();
  }

  static resetToDemoData(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    this.saveEvaluations(INITIAL_EVALUATIONS);
  }
}
