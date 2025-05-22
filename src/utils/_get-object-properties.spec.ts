import { _getObjectProperties } from './_get-object-properties';

describe('_getObjectProperties', () => {
  class TestClass {
    public stringProp = 'string';
    public numberProp = 42;
    public booleanProp = true;
    public objectProp = {};
    public undefinedProp = undefined;
    public symbolProp = Symbol('test');
    public bigintProp = BigInt(42);
    public methodFunction(): string {
      return 'method';
    }
  }

  let testInstance: TestClass;

  beforeEach(() => {
    testInstance = new TestClass();
  });

  it('should return all prototype properties when no type is specified', () => {
    const properties = _getObjectProperties(testInstance);

    expect(properties).toContain('constructor');
    expect(properties).toContain('methodFunction');
  });

  it('should return only function type properties when "function" type is specified', () => {
    const properties = _getObjectProperties(testInstance, 'function');

    expect(properties).toContain('methodFunction');
    expect(properties).not.toContain('stringProp');
    expect(properties).not.toContain('numberProp');
  });

  it('should filter properties by multiple types', () => {
    const properties = _getObjectProperties(testInstance, [
      'function',
      'string',
    ]);

    expect(properties).toContain('methodFunction');
    expect(properties).not.toContain('numberProp');
    expect(properties).not.toContain('booleanProp');
  });

  it('should return empty array when no properties match the specified type', () => {
    const properties = _getObjectProperties(testInstance, 'symbol');

    expect(properties).toHaveLength(0);
  });

  it('should handle inherited properties', () => {
    class ChildClass extends TestClass {
      public childMethod(): string {
        return 'child';
      }
    }

    const childInstance = new ChildClass();
    const properties = _getObjectProperties(childInstance, 'function');

    expect(properties).toContain('methodFunction');
    expect(properties).toContain('childMethod');
  });
});
