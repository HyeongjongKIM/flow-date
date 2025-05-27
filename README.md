# FlowDate

![logo](./logo.svg)

A fluent, chainable, and fully extended Date utility that wraps JavaScript’s native Date.

---

## Features

- Full compatibility with all native `Date` methods
- Chainable setters (e.g. `setHours().setMinutes().setSeconds()`)
- Extended utilities: `adjust`, `diffFrom`, `toYearWeek`, `toNumericFormat`, etc.
- Immutable support: Convert to `FrozenDate` object
- Advanced comparison helpers: `isSame`, `isBetween`, `isBefore`, `isAfter`
- Static utilities: Available directly on the `FlowDate` class

```typescript
import { fd } from 'flow-date';

const date = fd('2025-05-24T15:30:00Z')
  .setHours(9)
  .setMinutes(0)
  .adjust(1, 'day'); // move to next day

console.log(date.getFullYear()); // 2025
console.log(date.getDate()); // 25
console.log(date.toISOString()); // "2025-05-25T09:00:00.000Z"
```

---

## Installation

```bash
npm install flow-date
# or
yarn add flow-date
# or
pnpm add flow-date
```

## Examples

### Native methods

```typescript
// Native Date
const native = new Date(new Date().setHours(0, 0, 0, 0));

// FlowDate supports the same methods — but returns itself for chaining
const midnight = fd().setHours(0, 0, 0, 0);

console.log(midnight.toISOString()); //2025-05-27T00:00:00.000Z
```

### Extended methods

```typescript
// Add or subtract time
fd('2025-05-24').adjust(3, 'day'); // → 2025-05-27
fd('2025-05-24').adjust(-1, 'month'); // → 2025-04-24

// Difference between dates
fd('2025-05-24').diffFrom(fd('2025-05-20'), 'day'); // → 4
fd('2024-03-01').diffTo(fd('2024-03-29'), 'week'); // → 4

// Get ISO year-week information
fd('2023-12-31').toYearWeek(); // → { weekYear: 2023, weekNumber: 53, weekday: 1 }
fd('2023-12-31').toYearWeek({ mode: 1 }); // → { weekYear: 2024, weekNumber: 1, weekday: 1 }
fd('2024-12-31').toYearWeek({ weekStart: 3 }); // → { weekYear: 2024, weekNumber: 52, weekday: 7 }
fd('2024-12-31').toYearWeek({ mode: 1, weekStart: 2 }); // → { weekYear: 2025, weekNumber: 1, weekday: 1 }
fd('2024-06-01').toYearWeek({ format: 'YYYY-ww' }); // → '2024-21'
fd('2024-06-01').toYearWeek({ format: 'YYYY-Www' }); // → '2024-W21'
fd('2024-06-01').toYearWeek({ format: 'YYYY-Www-D' }); // → '2024-W21-7'

// Numeric format representation
fd('2025-05-24').toNumericFormat('day'); // → 20250524
fd('2025-05-24').toNumericFormat('month'); // → 202505

// Compare dates using FlowDate instances
fd('2025-05-24').isSame(fd('2025-05-24'), 'day'); // → true
fd('2025-05-24').isBefore(fd('2025-06-01')); // → true
fd('2025-05-24').isAfter(fd('2025-06-01')); // → false
fd('2025-05-24').isBetween(fd('2025-05-01'), fd('2025-06-01')); // → true

// Adjusted day of week (based on week start)
fd('2024-03-17').getAdjustedDay(); // → 0  (Sunday, weekStart = 0 — default)
fd('2024-03-17').getAdjustedDay(1); // → 6  (Sunday is the 6th day when week starts on Monday)
fd('2024-03-17').getAdjustedDay(-1); // → 1  (weekStart -1 is normalized to 6 → same as Saturday start)

// Convert to frozen (read-only) Date
fd('2025-05-24T10:00:00Z').toFrozenDate(); // → read-only Date (set methods are removed)
```

## License

MIT
