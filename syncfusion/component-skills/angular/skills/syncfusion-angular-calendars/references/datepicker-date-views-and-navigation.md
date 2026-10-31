# Date Views and Navigation

## Table of Contents
- [Overview](#overview)
- [Start View Configuration](#start-view-configuration)
- [Depth View Restriction](#depth-view-restriction)
- [Navigating Between Views](#navigating-between-views)
- [Month and Year Selection Patterns](#month-and-year-selection-patterns)
- [View-Based Use Cases](#view-based-use-cases)
- [Troubleshooting](#troubleshooting)

## Overview

DatePicker provides three calendar views for selecting dates at different time scales:

| View | Display | Purpose |
|------|---------|---------|
| **Month** (default) | Individual days in calendar grid | Select specific day |
| **Year** | All 12 months of a year | Select month within year |
| **Decade** | 10 years (e.g., 2020-2029) | Select year within decade |

**Navigation:** Users navigate DOWN to select (Month → Day), or UP to see broader time scale (Day → Month → Year → Decade).

## Start View Configuration

Control which view appears when calendar opens using the `start` property:

### Start with Month View (Default)

```typescript
import { Component } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [DatePickerModule],
  template: `
    <ejs-datepicker
      start="Month"
      placeholder="Select date">
    </ejs-datepicker>
  `
})
export class DatePickerComponent {}
```

**Result:** Calendar opens showing current month with individual days

### Start with Year View

```typescript
@Component({
  template: `
    <ejs-datepicker
      start="Year"
      placeholder="Select month">
    </ejs-datepicker>
  `
})
export class DatePickerComponent {}
```

**Result:** Calendar opens showing all 12 months of current year. Click month to drill down to days.

### Start with Decade View

```typescript
@Component({
  template: `
    <ejs-datepicker
      start="Decade"
      placeholder="Select year">
    </ejs-datepicker>
  `
})
export class DatePickerComponent {}
```

**Result:** Calendar opens showing 10 years (e.g., 2020-2029). Click year to drill down further.

### Dynamic Start View

```typescript
@Component({
  template: `
    <label>Calendar Start View:</label>
    <select [(ngModel)]="selectedView" (change)="onViewChange()">
      <option value="Month">Month</option>
      <option value="Year">Year</option>
      <option value="Decade">Decade</option>
    </select>
    
    <ejs-datepicker
      [start]="selectedView"
      placeholder="Select date">
    </ejs-datepicker>
  `
})
export class DatePickerComponent {
  selectedView = 'Month';

  onViewChange() {
    console.log('View changed to:', this.selectedView);
  }
}
```

## Depth View Restriction

The `depth` property limits how deeply users can navigate. Combined with `start`, it controls the allowed view range.

### Restrict to Year Selection Only

Force selection at month level (can't drill down to days):

```typescript
@Component({
  template: `
    <label>Select a month (not specific day)</label>
    <ejs-datepicker
      start="Year"
      depth="Year"
      placeholder="Select month">
    </ejs-datepicker>
  `
})
export class DatePickerComponent {}
```

**Behavior:**
- Opens showing 12 months
- User clicks month → date is selected (Month/1 of selected month)
- Can't navigate to month view (no day selection)

### Restrict to Decade Selection Only

Force selection at year level:

```typescript
@Component({
  template: `
    <label>Select a year (not specific month or day)</label>
    <ejs-datepicker
      start="Decade"
      depth="Decade"
      placeholder="Select year">
    </ejs-datepicker>
  `
})
export class DatePickerComponent {}
```

**Behavior:**
- Opens showing 10 years (e.g., 2020-2029)
- User clicks year → date is selected (January 1 of selected year)
- Can't navigate to month or day views

### Normal Range (Month to Decade)

Allow full navigation from month view up to decade:

```typescript
@Component({
  template: `
    <ejs-datepicker
      start="Month"
      depth="Decade"
      placeholder="Select date">
    </ejs-datepicker>
  `
})
export class DatePickerComponent {}
```

**Behavior:**
- Opens with month view
- User can click date, or navigate up to year/decade views
- Can navigate back down to month view

### Important: Start Must Be ≥ Depth

The `start` view must be greater than or equal to `depth` view:

```typescript
// ✓ Valid combinations
start="Month"  depth="Month"   // Locked to month view
start="Month"  depth="Year"    // Year or month
start="Month"  depth="Decade"  // Any view

start="Year"   depth="Year"    // Locked to year view
start="Year"   depth="Decade"  // Year or decade

start="Decade" depth="Decade"  // Locked to decade view

// ✗ Invalid (depth > start)
start="Year"   depth="Month"   // ❌ Won't work as expected
start="Month"  depth="Decade"  // ✓ This is valid (Month > Decade)
```

## Navigating Between Views

### User Keyboard Navigation

- **Click header (month/year/decade name):** Navigate UP one level (month → year → decade)
- **Click navigation arrows:** Navigate to previous/next month/year/decade
- **Click specific date/month/year:** Navigate DOWN to select

### Programmatic View Navigation

Manually navigate views using component methods:

```typescript
import { Component, ViewChild } from '@angular/core';
import { DatePickerComponent as EjsDatePickerComponent, DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [DatePickerModule],
  template: `
    <div>
      <button (click)="navigateToYear()">View Year</button>
      <button (click)="navigateToMonth()">View Month</button>
      
      <ejs-datepicker
        #datepicker
        placeholder="Select date">
      </ejs-datepicker>
    </div>
  `
})
export class DatePickerComponent {
  @ViewChild('datepicker') datepicker: EjsDatePickerComponent | undefined;

  navigateToYear() {
    if (this.datepicker) {
      // Navigate to year view
      console.log('Navigating to year view');
    }
  }

  navigateToMonth() {
    if (this.datepicker) {
      // Navigate to month view
      console.log('Navigating to month view');
    }
  }
}
```

## Month and Year Selection Patterns

### Pattern 1: Select Month and Year (Not Specific Day)

Use Year start view with Year depth to let users select a month/year:

```typescript
@Component({
  template: `
    <label>Select Month and Year</label>
    <ejs-datepicker
      start="Year"
      depth="Year"
      format="MMMM yyyy"
      placeholder="Select month and year">
    </ejs-datepicker>
  `
})
export class MonthYearPickerComponent {}
```

**Result:**
- Opens showing months (Jan, Feb, Mar, ... Dec)
- User clicks month
- Selected date is set to 1st day of selected month
- Display format shows "March 2024"

### Pattern 2: Quick Year Selection

Use Decade start view with Decade depth for fast year picking:

```typescript
@Component({
  template: `
    <label>Select a year</label>
    <ejs-datepicker
      start="Decade"
      depth="Decade"
      format="yyyy"
      placeholder="Select year">
    </ejs-datepicker>
  `
})
export class YearPickerComponent {}
```

**Result:**
- Opens showing decade (2020, 2021, 2022, ..., 2029)
- User clicks year
- Selected date is January 1 of selected year
- Display format shows only "2024"

### Pattern 3: Full Date Selection (Default)

Allow user to drill down to specific day:

```typescript
@Component({
  template: `
    <label>Select specific date</label>
    <ejs-datepicker
      start="Month"
      depth="Month"
      format="dd/MM/yyyy"
      placeholder="DD/MM/YYYY">
    </ejs-datepicker>
  `
})
export class DatePickerComponent {}
```

**Result:**
- Opens with month calendar view
- User clicks specific day
- Selected date is that day
- Display format shows "15/03/2024"

## View-Based Use Cases

### Use Case 1: Birth Year Selection (Age Verification)

Only need year for age verification:

```typescript
@Component({
  template: `
    <label>Birth Year (for age 18+ verification)</label>
    <ejs-datepicker
      start="Decade"
      depth="Decade"
      [min]="minYear"
      [max]="maxYear"
      format="yyyy"
      placeholder="Select birth year">
    </ejs-datepicker>
  `
})
export class BirthYearComponent implements OnInit {
  minYear: Date;
  maxYear: Date;

  ngOnInit() {
    // 18 years ago
    this.minYear = new Date();
    this.minYear.setFullYear(this.minYear.getFullYear() - 100);

    this.maxYear = new Date();
    this.maxYear.setFullYear(this.maxYear.getFullYear() - 18);
  }
}
```

**Advantage:** Users don't need to click through to select specific day

### Use Case 2: Project Milestone Selection (Month Granularity)

Select month for project milestone:

```typescript
@Component({
  template: `
    <label>Project Milestone Month</label>
    <ejs-datepicker
      start="Year"
      depth="Year"
      format="MMMM yyyy"
      placeholder="Select milestone month">
    </ejs-datepicker>
  `
})
export class MilestoneComponent {}
```

**Advantage:** Month-level precision sufficient, cleaner UX

### Use Case 3: Holiday Selection (Full Date)

Select specific holiday date:

```typescript
@Component({
  template: `
    <label>Select holiday date</label>
    <ejs-datepicker
      start="Month"
      depth="Month"
      format="EEEE, MMMM dd, yyyy"
      placeholder="Select specific date">
    </ejs-datepicker>
  `
})
export class HolidayComponent {}
```

**Advantage:** Full flexibility, shows day name for clarity

### Use Case 4: Contract Year Filter

Select contract year quickly:

```typescript
@Component({
  template: `
    <label>Contract Year Filter</label>
    <ejs-datepicker
      start="Decade"
      depth="Decade"
      format="yyyy"
      placeholder="Select contract year">
    </ejs-datepicker>
  `
})
export class ContractYearComponent {}
```

**Advantage:** Decade view lets users quickly find decade (2020s, 2030s), then select year

## Troubleshooting

### Issue: Can't navigate to year/decade view

**Problem:** User clicks month name but view doesn't change

**Solution:** Ensure `depth` is less than current view:
```typescript
// ✗ Wrong - can't navigate up
start="Month"
depth="Month"

// ✓ Correct - can navigate to Year and Decade
start="Month"
depth="Decade"  // or even just omit depth, defaults allow all navigation
```

### Issue: Can select day but depth says "Year"

**Problem:** Despite depth="Year", users can still select specific days

**Solution:** Depth only prevents drilling DOWN. Set `start` to limit initial view:
```typescript
// ✓ Correct - forces month selection only
start="Year"
depth="Year"

// ✗ Wrong - still shows month calendar, can select days
start="Month"
depth="Year"
```

### Issue: Selected date is always 1st of month

**Problem:** When selecting a month in Year view, date always becomes 1st

**Solution:** This is expected behavior - full date includes day, so defaults to day 1. Use format to hide day if not needed:
```typescript
format="MMMM yyyy"  // Only shows month and year, hides day
```

### Issue: Start view not taking effect

**Problem:** Calendar always opens in Month view

**Solution:** Check property name case - Angular is case-sensitive:
```typescript
// ✓ Correct
start="Year"
start="Decade"

// ✗ Wrong
start="year"
start="YEAR"
```

---

**Related References:**
- [Getting Started](getting-started.md)
- [Date Range and Validation](date-range-and-validation.md)
- [Date Formats and Parsing](date-formats-and-parsing.md)
