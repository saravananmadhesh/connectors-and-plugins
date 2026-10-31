# DateRangePicker Advanced Patterns

## Form Submission with Validation

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const drp = new DateRangePicker({
  placeholder: 'Select date range',
  change: (args: any) => {
    validateDateRange();
  }
});

drp.appendTo('#daterangepicker');

function validateDateRange(): boolean {
  const startDate = drp.startDate;
  const endDate = drp.endDate;
  
  if (!startDate || !endDate) {
    document.getElementById('error')!.innerText = 'Both dates are required';
    return false;
  }
  
  if (startDate > endDate) {
    document.getElementById('error')!.innerText = 'Start date must be before end date';
    return false;
  }
  
  document.getElementById('error')!.innerText = '';
  return true;
}

document.getElementById('submitBtn')?.addEventListener('click', () => {
  if (validateDateRange()) {
    console.log('Form submitted with dates:', drp.startDate, drp.endDate);
  }
});
```

## Keyboard Shortcuts and Key Navigation

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const drp = new DateRangePicker({
  placeholder: 'Select date range',
  keyConfigs: {
    'ctrl+shift+t': 'Today',
    'ctrl+l': 'Last7Days',
    'ctrl+m': 'LastMonth'
  }
});

drp.appendTo('#daterangepicker');

// Additional keyboard handlers
document.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.ctrlKey) {
    switch (event.key) {
      case 't':
        event.preventDefault();
        const today = new Date();
        drp.startDate = today;
        drp.endDate = today;
        break;
      case 'l':
        event.preventDefault();
        const last7 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        drp.startDate = last7;
        drp.endDate = new Date();
        break;
    }
  }
});
```

## Server Timezone Offset Handling

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

// Get server timezone offset (e.g., from API response)
const serverTimezoneOffset = -300; // UTC-5 in minutes

const drp = new DateRangePicker({
  placeholder: 'Select date range',
  serverTimezoneOffset: serverTimezoneOffset,
  change: (args: any) => {
    // Dates are automatically adjusted for timezone
    console.log('Start:', args.startDate);
    console.log('End:', args.endDate);
  }
});

drp.appendTo('#daterangepicker');

// Calculate timezone-aware date strings for API
function getTimezoneAdjustedDates(): { start: string; end: string } {
  const offsetMs = serverTimezoneOffset * 60 * 1000;
  const start = new Date(drp.startDate!.getTime() + offsetMs);
  const end = new Date(drp.endDate!.getTime() + offsetMs);
  
  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0]
  };
}
```

## Persistence and LocalStorage

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const STORAGE_KEY = 'selectedDateRange';

const drp = new DateRangePicker({
  placeholder: 'Select date range',
  change: (args: any) => {
    // Save to localStorage
    saveDateRange(args.startDate, args.endDate);
  }
});

drp.appendTo('#daterangepicker');

// Save to localStorage
function saveDateRange(start: Date | null, end: Date | null): void {
  if (start && end) {
    const data = {
      start: start.toISOString(),
      end: end.toISOString(),
      timestamp: new Date().getTime()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

// Load from localStorage
function loadDateRange(): void {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const data = JSON.parse(stored);
      const start = new Date(data.start);
      const end = new Date(data.end);
      
      // Only load if less than 30 days old
      const ageMs = new Date().getTime() - data.timestamp;
      if (ageMs < 30 * 24 * 60 * 60 * 1000) {
        drp.startDate = start;
        drp.endDate = end;
      }
    } catch (e) {
      console.error('Failed to load saved date range');
    }
  }
}

// Load on component creation
loadDateRange();

// Clear button
document.getElementById('clearBtn')?.addEventListener('click', () => {
  drp.startDate = null;
  drp.endDate = null;
  localStorage.removeItem(STORAGE_KEY);
});
```

## Multi-Component Integration

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

// Start date picker
const startDatePicker = new DateRangePicker({
  placeholder: 'Start date',
  endDate: null
});
startDatePicker.appendTo('#startPicker');

// End date picker
const endDatePicker = new DateRangePicker({
  placeholder: 'End date',
  startDate: null
});
endDatePicker.appendTo('#endPicker');

// Link them together
startDatePicker.change = (args: any) => {
  if (args.startDate) {
    endDatePicker.min = args.startDate;
  }
};

endDatePicker.change = (args: any) => {
  if (args.endDate) {
    startDatePicker.max = args.endDate;
  }
};
```

## Performance Optimization with Lazy Loading

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

let drp: DateRangePicker | null = null;

// Lazy initialization
function initializeDateRangePicker(): void {
  if (!drp) {
    drp = new DateRangePicker({
      placeholder: 'Select date range',
      change: (args: any) => {
        handleDateChange(args.startDate, args.endDate);
      }
    });
    drp.appendTo('#daterangepicker');
  }
}

// Initialize on demand
document.getElementById('container')?.addEventListener('click', () => {
  if (!drp) {
    initializeDateRangePicker();
  }
});

function handleDateChange(start: Date, end: Date): void {
  // Perform heavy calculations or API calls
  console.log('Range selected:', start, end);
}

// Unload on page exit to free memory
window.addEventListener('beforeunload', () => {
  if (drp) {
    drp.destroy();
    drp = null;
  }
});
```

## Error Handling and Validation Patterns

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

class DateRangeValidator {
  private drp: DateRangePicker;
  private minDaysDifference = 0;
  private maxDaysDifference = 365;
  private errors: string[] = [];

  constructor(elementId: string) {
    this.drp = new DateRangePicker({
      placeholder: 'Select date range',
      change: (args: any) => this.validate(args)
    });
    this.drp.appendTo(elementId);
  }

  validate(args: any): boolean {
    this.errors = [];
    const start = args.startDate;
    const end = args.endDate;

    if (!start || !end) {
      this.errors.push('Both dates are required');
      return false;
    }

    // Check order
    if (start > end) {
      this.errors.push('Start date must be before end date');
      return false;
    }

    // Check day difference
    const diffDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < this.minDaysDifference) {
      this.errors.push(`Range must be at least ${this.minDaysDifference} days`);
      return false;
    }

    if (diffDays > this.maxDaysDifference) {
      this.errors.push(`Range cannot exceed ${this.maxDaysDifference} days`);
      return false;
    }

    // Check if dates are in past (optional)
    if (start > new Date()) {
      this.errors.push('Start date cannot be in the future');
      return false;
    }

    // Display errors
    this.displayErrors();
    return this.errors.length === 0;
  }

  displayErrors(): void {
    const errorContainer = document.getElementById('errors');
    if (errorContainer) {
      if (this.errors.length === 0) {
        errorContainer.innerHTML = '';
      } else {
        errorContainer.innerHTML = this.errors.map(e => `<div class="error">${e}</div>`).join('');
      }
    }
  }

  getDateRange(): { start: Date; end: Date } | null {
    if (this.drp.startDate && this.drp.endDate) {
      return { start: this.drp.startDate, end: this.drp.endDate };
    }
    return null;
  }
}

// Usage
const validator = new DateRangeValidator('#daterangepicker');
```

## Complex Scenarios: Fiscal Years and Quarters

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

class FiscalYearSelector {
  private drp: DateRangePicker;
  private fiscalYearStart = 4; // April

  constructor(elementId: string) {
    this.drp = new DateRangePicker({
      placeholder: 'Select fiscal period'
    });
    this.drp.appendTo(elementId);
  }

  // Get fiscal year for a date
  private getFiscalYear(date: Date): number {
    const month = date.getMonth();
    const year = date.getFullYear();
    return month >= this.fiscalYearStart ? year : year - 1;
  }

  // Set fiscal year range
  setFiscalYear(year: number): void {
    const start = new Date(year, this.fiscalYearStart - 1, 1);
    const end = new Date(year + 1, this.fiscalYearStart - 1, 0);
    
    this.drp.startDate = start;
    this.drp.endDate = end;
  }

  // Set fiscal quarter
  setFiscalQuarter(year: number, quarter: number): void {
    const quarterMonths = [
      [this.fiscalYearStart, this.fiscalYearStart + 2],
      [this.fiscalYearStart + 3, this.fiscalYearStart + 5],
      [this.fiscalYearStart + 6, this.fiscalYearStart + 8],
      [this.fiscalYearStart + 9, this.fiscalYearStart + 11]
    ];

    const [startMonth, endMonth] = quarterMonths[quarter - 1];
    const start = new Date(year, startMonth - 1, 1);
    const end = new Date(year, endMonth, 0);

    this.drp.startDate = start;
    this.drp.endDate = end;
  }

  // Get fiscal info for current selection
  getFiscalInfo(): { fiscalYear: number; quarter: number } | null {
    if (!this.drp.startDate) return null;

    const fy = this.getFiscalYear(this.drp.startDate);
    const month = this.drp.startDate.getMonth();
    const quarterStart = this.fiscalYearStart - 1;
    let quarter = Math.floor((month - quarterStart) / 3) + 1;
    if (quarter > 4) quarter = 1;

    return { fiscalYear: fy, quarter };
  }
}

// Usage
const fySelector = new FiscalYearSelector('#daterangepicker');

// Set presets
document.getElementById('btnFY2026')?.addEventListener('click', () => {
  fySelector.setFiscalYear(2026);
});

document.getElementById('btnQ1')?.addEventListener('click', () => {
  fySelector.setFiscalQuarter(2026, 1);
});

document.getElementById('btnQ2')?.addEventListener('click', () => {
  fySelector.setFiscalQuarter(2026, 2);
});
```

## Real-Time Analytics Date Range

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

class AnalyticsDateRange {
  private drp: DateRangePicker;
  private onRangeChange: ((start: Date, end: Date) => void) | null = null;

  constructor(elementId: string) {
    this.drp = new DateRangePicker({
      placeholder: 'Select analysis period',
      change: (args: any) => {
        if (args.startDate && args.endDate) {
          this.fetchAnalytics(args.startDate, args.endDate);
        }
      }
    });
    this.drp.appendTo(elementId);
  }

  async fetchAnalytics(start: Date, end: Date): Promise<void> {
    try {
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startDate: start.toISOString().split('T')[0],
          endDate: end.toISOString().split('T')[0]
        })
      });

      const data = await response.json();
      
      if (this.onRangeChange) {
        this.onRangeChange(start, end);
      }
      
      this.displayAnalytics(data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  }

  displayAnalytics(data: any): void {
    // Render analytics charts, tables, etc.
    console.log('Analytics data:', data);
  }

  onDateRangeChange(callback: (start: Date, end: Date) => void): void {
    this.onRangeChange = callback;
  }
}

// Usage
const analytics = new AnalyticsDateRange('#daterangepicker');
analytics.onDateRangeChange((start, end) => {
  console.log(`Analyzing data from ${start} to ${end}`);
});
```
