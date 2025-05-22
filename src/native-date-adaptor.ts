import type { JSDateGetMethod, JSDateToMethod } from './types';

type JSDateGetAndToMethods = {
  [K in JSDateGetMethod | JSDateToMethod]: Date[K];
};

class NativeDateAdapter implements JSDateGetAndToMethods {
  // JS Date static methods
  static parse = Date.parse;
  static UTC = Date.UTC;
  static now = Date.now;

  constructor(protected _jsDate: Date) {}

  // JS Date getters
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
  toLocalString(): string;
  toLocalString(
    locales?: string | string[],
    options?: Intl.DateTimeFormatOptions,
  ): string;
  toLocalString(
    locales?: Intl.LocalesArgument,
    options?: Intl.DateTimeFormatOptions,
  ): string {
    return this._jsDate.toLocaleString(locales, options);
  }
  toLocaleDateString(): string;
  toLocaleDateString(
    locales?: string | string[],
    options?: Intl.DateTimeFormatOptions,
  ): string;
  toLocaleDateString(
    locales?: Intl.LocalesArgument,
    options?: Intl.DateTimeFormatOptions,
  ): string {
    return this._jsDate.toLocaleDateString(locales, options);
  }
  toLocaleTimeString(): string;
  toLocaleTimeString(
    locales?: string | string[],
    options?: Intl.DateTimeFormatOptions,
  ): string;
  toLocaleTimeString(
    locales?: Intl.LocalesArgument,
    options?: Intl.DateTimeFormatOptions,
  ): string {
    return this._jsDate.toLocaleTimeString(locales, options);
  }
  toUTCString(): string {
    return this._jsDate.toUTCString();
  }
  toISOString(): string {
    return this._jsDate.toISOString();
  }
  toJSON(key?: unknown): string {
    return this._jsDate.toJSON(key);
  }
}

export { NativeDateAdapter };
