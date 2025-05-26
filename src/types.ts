type DateUnit =
  | 'year'
  | 'month'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond';

type JSDateSetMethod = Extract<keyof Date, `set${string}`>;
type JSDateGetMethod = Extract<keyof Date, `get${string}`>;
type JSDateToMethod = Extract<keyof Date, `to${string}`>;
type DateInstance = InstanceType<typeof Date>;

export type {
  DateUnit,
  JSDateSetMethod,
  JSDateGetMethod,
  JSDateToMethod,
  DateInstance,
};
