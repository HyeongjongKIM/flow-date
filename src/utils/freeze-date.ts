import { _getObjectProperties } from './_get-object-properties';

const handler: ProxyHandler<Date> = {
  get(target, prop: keyof Date, receiver) {
    if (
      typeof prop === 'string' &&
      _getObjectProperties(new Date(), 'function')
        .filter((m) => m.startsWith('set'))
        .includes(prop)
    ) {
      return function () {
        throw new Error(`Cannot set property ${prop} of frozen Date object`);
      };
    }
    const value = Reflect.get(target, prop, receiver);
    if (typeof value === 'function') {
      return value.bind(target);
    }
    return value;
  },
};

const freezeDate = (date: Date): FrozenDate =>
  new Proxy<FrozenDate>(new Date(date), handler);

type FrozenDate = Omit<Date, `set${string}`>;

export { freezeDate, type FrozenDate };
