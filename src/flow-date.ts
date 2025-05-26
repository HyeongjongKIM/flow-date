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
import type { JSDateSetMethod, DateUnit, DateInstance } from './types';
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
  // native setters
  setTime(...args: Parameters<DateInstance['setTime']>): FlowDate {
    this._jsDate.setTime(...args);
    return this;
  }
  setMilliseconds(
    ...args: Parameters<DateInstance['setMilliseconds']>
  ): FlowDate {
    this._jsDate.setMilliseconds(...args);
    return this;
  }
  setUTCMilliseconds(
    ...args: Parameters<DateInstance['setUTCMilliseconds']>
  ): FlowDate {
    this._jsDate.setUTCMilliseconds(...args);
    return this;
  }
  setSeconds(...args: Parameters<DateInstance['setSeconds']>): FlowDate {
    this._jsDate.setSeconds(...args);
    return this;
  }
  setUTCSeconds(...args: Parameters<DateInstance['setUTCSeconds']>): FlowDate {
    this._jsDate.setUTCSeconds(...args);
    return this;
  }
  setMinutes(...args: Parameters<DateInstance['setMinutes']>): FlowDate {
    this._jsDate.setMinutes(...args);
    return this;
  }
  setUTCMinutes(...args: Parameters<DateInstance['setUTCMinutes']>): FlowDate {
    this._jsDate.setUTCMinutes(...args);
    return this;
  }
  setHours(...args: Parameters<DateInstance['setHours']>): FlowDate {
    this._jsDate.setHours(...args);
    return this;
  }
  setUTCHours(...args: Parameters<DateInstance['setUTCHours']>): FlowDate {
    this._jsDate.setUTCHours(...args);
    return this;
  }
  setDate(...args: Parameters<DateInstance['setDate']>): FlowDate {
    this._jsDate.setDate(...args);
    return this;
  }
  setUTCDate(...args: Parameters<DateInstance['setUTCDate']>): FlowDate {
    this._jsDate.setDate(...args);
    return this;
  }
  setMonth(...args: Parameters<DateInstance['setMonth']>): FlowDate {
    this._jsDate.setMonth(...args);
    return this;
  }
  setUTCMonth(...args: Parameters<DateInstance['setUTCMonth']>): FlowDate {
    this._jsDate.setUTCMonth(...args);
    return this;
  }
  setFullYear(...args: Parameters<DateInstance['setFullYear']>): FlowDate {
    this._jsDate.setFullYear(...args);
    return this;
  }
  setUTCFullYear(
    ...args: Parameters<DateInstance['setUTCFullYear']>
  ): FlowDate {
    this._jsDate.setUTCFullYear(...args);
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

function _getJSDate(...args: FlowDateParams): Date {
  let newDate: Date;
  if (args instanceof FlowDate) {
    newDate = args.toJSDate();
  }
  newDate = new Date(...(args as ConstructorParameters<typeof Date>));
  if (!isValidDate(newDate)) {
    throw new Error('Invalid Date');
  }
  return newDate;
}

export { FlowDate, fd };
