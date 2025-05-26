import type { DateInstance } from './types';

type NonSetters = {
  [K in Exclude<keyof Date, `set${string}`>]: Date[K];
};

class NativeDateAdapter implements NonSetters {
  static parse = Date.parse;
  static UTC = Date.UTC;
  static now = Date.now;

  constructor(protected _jsDate: Date) {}

  valueOf(): number {
    return this._jsDate.valueOf();
  }
  getTime(): number {
    return this._jsDate.getTime();
  }
  getFullYear(): number {
    return this._jsDate.getFullYear();
  }
  getUTCFullYear(): number {
    return this._jsDate.getUTCFullYear();
  }
  getMonth(): number {
    return this._jsDate.getMonth();
  }
  getUTCMonth(): number {
    return this._jsDate.getUTCMonth();
  }
  getDate(): number {
    return this._jsDate.getDate();
  }
  getUTCDate(): number {
    return this._jsDate.getUTCDate();
  }
  getDay(): number {
    return this._jsDate.getDay();
  }
  getUTCDay(): number {
    return this._jsDate.getUTCDay();
  }
  getHours(): number {
    return this._jsDate.getHours();
  }
  getUTCHours(): number {
    return this._jsDate.getUTCHours();
  }
  getMinutes(): number {
    return this._jsDate.getMinutes();
  }
  getUTCMinutes(): number {
    return this._jsDate.getUTCMinutes();
  }
  getSeconds(): number {
    return this._jsDate.getSeconds();
  }
  getUTCSeconds(): number {
    return this._jsDate.getUTCSeconds();
  }
  getMilliseconds(): number {
    return this._jsDate.getMilliseconds();
  }
  getUTCMilliseconds(): number {
    return this._jsDate.getUTCMilliseconds();
  }
  getTimezoneOffset(): number {
    return this._jsDate.getTimezoneOffset();
  }
  toString(): string {
    return this._jsDate.toString();
  }
  toDateString(): string {
    return this._jsDate.toDateString();
  }
  toTimeString(): string {
    return this._jsDate.toTimeString();
  }
  toLocaleString(...args: Parameters<DateInstance['toLocaleString']>): string {
    return this._jsDate.toLocaleString(...args);
  }
  toLocaleDateString(
    ...args: Parameters<DateInstance['toLocaleDateString']>
  ): string {
    return this._jsDate.toLocaleDateString(...args);
  }
  toLocaleTimeString(
    ...args: Parameters<DateInstance['toLocaleTimeString']>
  ): string {
    return this._jsDate.toLocaleTimeString(...args);
  }
  toUTCString(): string {
    return this._jsDate.toUTCString();
  }
  toISOString(): string {
    return this._jsDate.toISOString();
  }
  toJSON(...args: Parameters<DateInstance['toJSON']>): string {
    return this._jsDate.toJSON(...args);
  }

  [Symbol.toPrimitive](hint: 'default'): string;
  [Symbol.toPrimitive](hint: 'string'): string;
  [Symbol.toPrimitive](hint: 'number'): number;
  [Symbol.toPrimitive](hint: string): string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [Symbol.toPrimitive](hint: any): string | number {
    return this._jsDate[Symbol.toPrimitive](hint);
  }
}

export { NativeDateAdapter };
