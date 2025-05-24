import {
  adjust,
  diff,
  freezeDate,
  getAdjustedDay,
  getNumericDateFormat,
  getYearWeek,
  isAfter,
  isBefore,
  isBetween,
  isSame,
  isValidDate,
  type FrozenDate,
  type YearWeekFormat,
  type GetYearWeekOptions,
  type GetYearWeekReturn,
} from './utils';
import type { JSDateSetMethod, DateUnit } from './types';
import { NativeDateAdapter } from './native-date-adaptor';

type FlowDateSetMethods = {
  [K in JSDateSetMethod]: (...args: Parameters<Date[K]>) => FlowDate;
};

type FlowDateParams =
  | [value?: ConstructorParameters<typeof Date>[0] | FlowDate]
  | Parameters<typeof Date.UTC>;

class FlowDate extends NativeDateAdapter implements FlowDateSetMethods {
  // FlowDate static methods
  static adjust = adjust;
  static isValid = isValidDate;
  static isSame = isSame;
  static isBefore = isBefore;
  static isAfter = isAfter;
  static isBetween = isBetween;
  static freeze = freezeDate;
  static toYearWeek = getYearWeek;
  static toNumericFormat = getNumericDateFormat;
  static diff = diff;

  constructor(...args: FlowDateParams) {
    super(_getJSDate(...args));
  }

  clone(): FlowDate {
    return new FlowDate(this._jsDate);
  }

  // setters
  adjust(amount: number, unit?: DateUnit): FlowDate {
    this._jsDate = adjust(this._jsDate, amount, unit);
    return this;
  }
  setTime(time: number): FlowDate {
    this._jsDate.setTime(time);
    return this;
  }
  setMilliseconds(ms: number): FlowDate {
    this._jsDate.setMilliseconds(ms);
    return this;
  }
  setUTCMilliseconds(ms: number): FlowDate {
    this._jsDate.setUTCMilliseconds(ms);
    return this;
  }
  setSeconds(sec: number, ms = 0): FlowDate {
    this._jsDate.setSeconds(sec, ms);
    return this;
  }
  setUTCSeconds(sec: number, ms = 0): FlowDate {
    this._jsDate.setUTCSeconds(sec, ms);
    return this;
  }
  setMinutes(min: number, sec = 0, ms = 0): FlowDate {
    this._jsDate.setMinutes(min, sec, ms);
    return this;
  }
  setUTCMinutes(min: number, sec = 0, ms = 0): FlowDate {
    this._jsDate.setUTCMinutes(min, sec, ms);
    return this;
  }
  setHours(hour: number, min = 0, sec = 0, ms = 0): FlowDate {
    this._jsDate.setHours(hour, min, sec, ms);
    return this;
  }
  setUTCHours(hour: number, min = 0, sec = 0, ms = 0): FlowDate {
    this._jsDate.setUTCHours(hour, min, sec, ms);
    return this;
  }
  setDate(date: number): FlowDate {
    this._jsDate.setDate(date);
    return this;
  }
  setUTCDate(date: number): FlowDate {
    this._jsDate.setUTCDate(date);
    return this;
  }
  setMonth(month: number, date = 1): FlowDate {
    this._jsDate.setMonth(month, date);
    return this;
  }
  setUTCMonth(month: number, date = 1): FlowDate {
    this._jsDate.setUTCMonth(month, date);
    return this;
  }
  setFullYear(year: number, month = 0, date = 1): FlowDate {
    this._jsDate.setFullYear(year, month, date);
    return this;
  }
  setUTCFullYear(year: number, month = 0, date = 1): FlowDate {
    this._jsDate.setUTCFullYear(year, month, date);
    return this;
  }

  // validators
  isValid(): boolean {
    return isValidDate(this._jsDate);
  }
  isSame(date: Date, unit?: DateUnit): boolean {
    return isSame(this._jsDate, date, unit);
  }
  isBefore(date: Date, unit?: DateUnit): boolean {
    return isBefore(this._jsDate, date, unit);
  }
  isAfter(date: Date, unit?: DateUnit): boolean {
    return isAfter(this._jsDate, date, unit);
  }
  isBetween(min: Date, max: Date, unit?: DateUnit): boolean {
    return isBetween(this._jsDate, min, max, unit);
  }

  // transformers
  toJSDate(): Date {
    return new Date(this._jsDate);
  }
  toFrozenDate(): FrozenDate {
    return freezeDate(this._jsDate);
  }

  toYearWeek<T extends YearWeekFormat | undefined = undefined>(
    options?: GetYearWeekOptions<T>,
  ): GetYearWeekReturn<T> {
    return getYearWeek<T>(this._jsDate, options);
  }

  toNumericFormat(unit?: DateUnit): number {
    return getNumericDateFormat(this._jsDate, unit);
  }

  diffFrom(earlierDate: Date, unit: DateUnit | 'week'): number {
    return diff(this._jsDate, earlierDate, unit);
  }

  diffTo(laterDate: Date, unit: DateUnit | 'week'): number {
    return diff(laterDate, this._jsDate, unit);
  }

  // extended getters
  getAdjustedDay(weekStart = 0): number {
    return getAdjustedDay(this._jsDate, weekStart);
  }
}

const fd = (...args: FlowDateParams): FlowDate =>
  new FlowDate(_getJSDate(...args));

function _getJSDate(...args: FlowDateParams): Date;
function _getJSDate(
  valueOrYear?: number | string | Date | FlowDate,
  monthIndex?: number,
  date = 1,
  hours = 0,
  minutes = 0,
  seconds = 0,
  ms = 0,
): Date {
  let newDate: Date;
  if (typeof valueOrYear === 'number' && typeof monthIndex === 'number') {
    newDate = new Date(
      valueOrYear,
      monthIndex,
      date,
      hours,
      minutes,
      seconds,
      ms,
    );
  } else if (valueOrYear === undefined) {
    newDate = new Date();
  } else if (valueOrYear instanceof FlowDate) {
    newDate = new Date(valueOrYear.toJSDate());
  } else {
    newDate = new Date(valueOrYear);
  }

  if (!isValidDate(newDate)) {
    throw new Error('Invalid Date');
  }

  return newDate;
}

export { FlowDate, fd };
