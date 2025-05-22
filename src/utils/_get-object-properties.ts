type PropertyType =
  | 'function'
  | 'string'
  | 'number'
  | 'boolean'
  | 'object'
  | 'symbol'
  | 'undefined'
  | 'bigint';

function _getObjectProperties<T extends object>(
  obj: T,
  propertyType?: PropertyType | PropertyType[],
): string[] {
  const properties = new Set<string>();

  // Collect all properties by traversing the prototype chain
  let currentProto = Object.getPrototypeOf(obj);
  while (currentProto && currentProto !== Object.prototype) {
    const protoProps = Object.getOwnPropertyNames(currentProto);
    protoProps.forEach((prop) => properties.add(prop));
    currentProto = Object.getPrototypeOf(currentProto);
  }

  return Array.from(properties).filter((propertyName) => {
    const property = obj[propertyName as keyof T];
    if (!propertyType) {
      return true;
    }
    if (Array.isArray(propertyType)) {
      return propertyType.includes(typeof property);
    }
    return typeof property === propertyType;
  });
}

export { _getObjectProperties };
