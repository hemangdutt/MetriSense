import { AccuracyClass, Instrument, LaboratoryConditions, TestObservation } from '../types/oiml';

/**
 * OIML R 76 Calculation Engine
 * Dedicated metrology calculation logic for Non-Automatic Weighing Instruments.
 * Independent of presentation layer.
 */
export class OimlCalculationEngine {
  /**
   * Calculate number of verification scale intervals: n = Max / e
   */
  static calculateVerificationIntervals(maxCapacity: number, e: number): number {
    if (e <= 0 || maxCapacity <= 0) return 0;
    return Math.round((maxCapacity / e) * 1000) / 1000;
  }

  /**
   * Determine Maximum Permissible Error (MPE) according to OIML R 76-1 Table 6
   * (Initial verification limits)
   *
   * Load m expressed in verification scale intervals (m = L / e)
   */
  static getMpe(appliedLoad: number, e: number, accuracyClass: AccuracyClass): number {
    if (e <= 0 || appliedLoad < 0) return 0;

    // Load expressed in units of e
    const m = appliedLoad / e;

    let mpeFactor: number;

    switch (accuracyClass) {
      case 'Class I':
        if (m <= 50000) {
          mpeFactor = 0.5;
        } else if (m <= 200000) {
          mpeFactor = 1.0;
        } else {
          mpeFactor = 1.5;
        }
        break;

      case 'Class II':
        if (m <= 5000) {
          mpeFactor = 0.5;
        } else if (m <= 20000) {
          mpeFactor = 1.0;
        } else {
          mpeFactor = 1.5;
        }
        break;

      case 'Class III':
        if (m <= 500) {
          mpeFactor = 0.5;
        } else if (m <= 2000) {
          mpeFactor = 1.0;
        } else {
          mpeFactor = 1.5;
        }
        break;

      case 'Class IIII':
        if (m <= 50) {
          mpeFactor = 0.5;
        } else if (m <= 200) {
          mpeFactor = 1.0;
        } else {
          mpeFactor = 1.5;
        }
        break;

      default:
        mpeFactor = 1.0;
    }

    // MPE in the same units as load/e
    const mpeValue = mpeFactor * e;
    return Number(mpeValue.toFixed(6));
  }

  /**
   * OIML R 76 Error Calculation
   * Formula: E = I + 0.5e - ΔL - L
   * Where:
   *   I = Indicated value
   *   e = Verification scale interval
   *   ΔL = Additional load to find change-point (if used)
   *   L = Applied load
   */
  static calculateError(
    indicatedValue: number,
    appliedLoad: number,
    deltaLoad: number,
    e: number
  ): number {
    let rawError: number;
    if (deltaLoad > 0) {
      // Standard change point calculation
      rawError = indicatedValue + 0.5 * e - deltaLoad - appliedLoad;
    } else {
      // Direct reading without additional change point weights
      rawError = indicatedValue - appliedLoad;
    }
    return Number(rawError.toFixed(6));
  }

  /**
   * Full test evaluation helper
   */
  static evaluateObservation(
    appliedLoad: number,
    indicatedValue: number,
    deltaLoad: number,
    e: number,
    accuracyClass: AccuracyClass
  ): {
    calculatedError: number;
    mpe: number;
    status: 'PASS' | 'FAIL';
  } {
    const calculatedError = this.calculateError(indicatedValue, appliedLoad, deltaLoad, e);
    const mpe = this.getMpe(appliedLoad, e, accuracyClass);
    
    // Pass if |E| <= MPE (accounting for floating precision delta)
    const passed = Math.abs(calculatedError) <= mpe + 1e-9;

    return {
      calculatedError,
      mpe,
      status: passed ? 'PASS' : 'FAIL',
    };
  }

  /**
   * Validate instrument specifications per OIML rules
   */
  static validateInstrument(instrument: Partial<Instrument>): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    if (!instrument.manufacturer || instrument.manufacturer.trim().length === 0) {
      errors.manufacturer = 'Manufacturer name is required.';
    }

    if (!instrument.model || instrument.model.trim().length === 0) {
      errors.model = 'Model designation is required.';
    }

    if (!instrument.serialNumber || instrument.serialNumber.trim().length === 0) {
      errors.serialNumber = 'Instrument serial number is required.';
    }

    if (!instrument.maxCapacity || instrument.maxCapacity <= 0) {
      errors.maxCapacity = 'Maximum capacity (Max) must be greater than 0.';
    }

    if (instrument.minCapacity === undefined || instrument.minCapacity < 0) {
      errors.minCapacity = 'Minimum capacity (Min) must be non-negative.';
    }

    if (
      instrument.maxCapacity !== undefined &&
      instrument.minCapacity !== undefined &&
      instrument.maxCapacity <= instrument.minCapacity
    ) {
      errors.minCapacity = 'Min capacity must be strictly less than Max capacity.';
    }

    if (!instrument.verificationScaleInterval || instrument.verificationScaleInterval <= 0) {
      errors.verificationScaleInterval = 'Scale interval (e) must be greater than 0.';
    }

    if (
      instrument.maxCapacity &&
      instrument.verificationScaleInterval &&
      instrument.maxCapacity > 0 &&
      instrument.verificationScaleInterval > 0
    ) {
      const n = instrument.maxCapacity / instrument.verificationScaleInterval;
      if (n < 100) {
        errors.n = 'Verification intervals (n) must be ≥ 100 for standard NAWI.';
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  /**
   * Validate laboratory conditions
   */
  static validateLaboratoryConditions(conditions: Partial<LaboratoryConditions>): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    if (!conditions.laboratory || conditions.laboratory.trim().length === 0) {
      errors.laboratory = 'Laboratory designation is required.';
    }

    if (!conditions.operator || conditions.operator.trim().length === 0) {
      errors.operator = 'Authorized testing officer name is required.';
    }

    if (conditions.ambientTemperature === undefined || conditions.ambientTemperature < -20 || conditions.ambientTemperature > 60) {
      errors.ambientTemperature = 'Temperature must be within physical range (-20°C to +60°C).';
    }

    if (conditions.relativeHumidity === undefined || conditions.relativeHumidity < 0 || conditions.relativeHumidity > 100) {
      errors.relativeHumidity = 'Relative humidity must be between 0% and 100%.';
    }

    if (conditions.atmosphericPressure === undefined || conditions.atmosphericPressure < 700 || conditions.atmosphericPressure > 1200) {
      errors.atmosphericPressure = 'Atmospheric pressure must be reasonable (700 to 1200 hPa).';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
