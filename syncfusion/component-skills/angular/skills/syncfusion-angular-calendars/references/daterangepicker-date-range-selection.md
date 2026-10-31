# Date Range Selection

## Table of Contents
- [Basic Range Selection](#basic-range-selection)
- [StartDate and EndDate Properties](#startdate-and-enddate-properties)
- [Sequential Selection](#sequential-selection)
- [Min/Max Date Constraints](#minmax-date-constraints)
- [Range Validation](#range-validation)
- [Disabled Dates and Ranges](#disabled-dates-and-ranges)
- [Clearing Selections](#clearing-selections)
- [Getting Selected Range](#getting-selected-range)

## Basic Range Selection

The DateRangePicker allows users to select a range of dates by clicking on a start date and an end date. The component displays two calendars side-by-side for easy range selection.

### Two-Calendar Display

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  // DateRangePicker automatically displays two calendars
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 15);
}
```

```html
<!-- app.component.html -->
<!-- Two calendars shown side-by-side for range selection -->
<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  placeholder="Select date range">
</ejs-daterangepicker>
```

### Single Click Range Selection

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { RangeEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 31);
  
  // Click on start date, then click on end date - range is selected
  onRangeSelected(args: RangeEventArgs): void {
    console.log('Range selected:');
    console.log('Start:', args.startDate);
    console.log('End:', args.endDate);
    console.log('Days in range:', args.daySpan);
  }
}
```

```html
<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  (select)="onRangeSelected($event)">
</ejs-daterangepicker>
```

## StartDate and EndDate Properties

### Setting Initial Date Range

```typescript
export class AppComponent {
  // Set explicit start and end dates
  startDate: Date = new Date(2026, 2, 1);   // March 1, 2026
  endDate: Date = new Date(2026, 2, 31);    // March 31, 2026
  
  // Current month
  currentMonthStart: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  currentMonthEnd: Date = new Date();
  
  // Last 30 days
  thirtyDaysAgoStart: Date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  thirtyDaysAgoEnd: Date = new Date();
}
```

```html
<!-- Template binding with startDate and endDate -->
<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  placeholder="Select date range">
</ejs-daterangepicker>

<p>Selected Range: {{ startDate | date:'short' }} to {{ endDate | date:'short' }}</p>
```

### Dynamic Date Range Updates

```typescript
export class AppComponent {
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  // Update range to last 7 days
  setLast7Days(): void {
    this.endDate = new Date();
    this.startDate = new Date(this.endDate);
    this.startDate.setDate(this.startDate.getDate() - 7);
  }
  
  // Update range to this month
  setThisMonth(): void {
    const today = new Date();
    this.startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    this.endDate = new Date();
  }
  
  // Update range to previous quarter
  setLastQuarter(): void {
    const today = new Date();
    const currentQuarter = Math.floor(today.getMonth() / 3);
    const lastQuarterMonth = (currentQuarter - 1) * 3;
    
    this.startDate = new Date(today.getFullYear(), lastQuarterMonth, 1);
    this.endDate = new Date(today.getFullYear(), lastQuarterMonth + 3, 0);
  }
}
```

```html
<div>
  <button (click)="setLast7Days()">Last 7 Days</button>
  <button (click)="setThisMonth()">This Month</button>
  <button (click)="setLastQuarter()">Last Quarter</button>
  
  <ejs-daterangepicker 
    [startDate]="startDate"
    [endDate]="endDate">
  </ejs-daterangepicker>
</div>
```

## Sequential Selection

### Click Start Date, Then End Date

Users can select a range by clicking on two dates sequentially:

```typescript
export class AppComponent {
  @ViewChild('daterangepicker') drp!: DateRangePickerComponent;
  
  startDate: Date = new Date();
  endDate: Date = new Date();
  selectionStep: string = 'Select start date...';
  
  onRangeChange(args: RangeEventArgs): void {
    if (!this.startDate || !this.endDate) {
      this.selectionStep = 'Now select end date...';
    } else {
      const dayCount = Math.ceil(
        (this.endDate.getTime() - this.startDate.getTime()) / 
        (1000 * 60 * 60 * 24)
      );
      this.selectionStep = `Range selected: ${dayCount} days`;
    }
  }
}
```

```html
<div>
  <p style="color: #666;">{{ selectionStep }}</p>
  <ejs-daterangepicker 
    #daterangepicker
    [startDate]="startDate"
    [endDate]="endDate"
    placeholder="Click start date, then end date"
    (change)="onRangeChange($event)">
  </ejs-daterangepicker>
</div>
```

### Prevent Invalid Range Selection

```typescript
export class AppComponent {
  @ViewChild('daterangepicker') drp!: DateRangePickerComponent;
  
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 31);
  errorMessage: string = '';
  
  onRangeChange(args: RangeEventArgs): void {
    this.errorMessage = '';
    
    // Validate: end date must be after start date
    if (args.endDate && args.startDate && args.endDate < args.startDate) {
      this.errorMessage = 'End date must be after start date';
      // Swap dates
      this.startDate = args.endDate as Date;
      this.endDate = args.startDate as Date;
    }
  }
}
```

## Min/Max Date Constraints

### Set Minimum Date Constraint

```typescript
export class AppComponent {
  // Allow dates only in the past year
  minDate: Date = new Date(new Date().getFullYear() - 1, 0, 1);
  maxDate: Date = new Date();
  
  startDate: Date = new Date(new Date().getFullYear() - 1, 6, 1);
  endDate: Date = new Date();
}
```

```html
<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  [min]="minDate"
  [max]="maxDate"
  placeholder="Select from last year">
</ejs-daterangepicker>
```

### Dynamic Min/Max Based on Business Logic

```typescript
export class AppComponent {
  startDate: Date = new Date();
  endDate: Date = new Date();
  minDate: Date = new Date();
  maxDate: Date = new Date();
  
  reportType: string = 'daily';
  
  onReportTypeChange(type: string): void {
    this.reportType = type;
    const today = new Date();
    
    switch (type) {
      case 'daily':
        // Last 7 days
        this.minDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        this.maxDate = today;
        break;
      
      case 'weekly':
        // Last 13 weeks
        this.minDate = new Date(today.getTime() - 91 * 24 * 60 * 60 * 1000);
        this.maxDate = today;
        break;
      
      case 'monthly':
        // Last 12 months
        this.minDate = new Date(today.getFullYear() - 1, today.getMonth(), 1);
        this.maxDate = today;
        break;
      
      case 'yearly':
        // Last 5 years
        this.minDate = new Date(today.getFullYear() - 5, 0, 1);
        this.maxDate = today;
        break;
    }
  }
}
```

```html
<div>
  <select (change)="onReportTypeChange($event.target.value)">
    <option value="daily">Daily</option>
    <option value="weekly">Weekly</option>
    <option value="monthly">Monthly</option>
    <option value="yearly">Yearly</option>
  </select>
  
  <ejs-daterangepicker 
    [startDate]="startDate"
    [endDate]="endDate"
    [min]="minDate"
    [max]="maxDate">
  </ejs-daterangepicker>
</div>
```

## Range Validation

### Min/Max Days Validation

```typescript
export class AppComponent {
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 31);
  
  // Validate: range must be 7-90 days
  minDays: number = 7;
  maxDays: number = 90;
  
  validationError: string = '';
  
  onRangeChange(args: RangeEventArgs): void {
    this.validationError = '';
    
    if (args.daySpan < this.minDays) {
      this.validationError = `Range must be at least ${this.minDays} days`;
    } else if (args.daySpan > this.maxDays) {
      this.validationError = `Range cannot exceed ${this.maxDays} days`;
    }
  }
}
```

```html
<div>
  <ejs-daterangepicker 
    [startDate]="startDate"
    [endDate]="endDate"
    [minDays]="minDays"
    [maxDays]="maxDays"
    (change)="onRangeChange($event)">
  </ejs-daterangepicker>
  
  <div *ngIf="validationError" style="color: red; margin-top: 10px;">
    ⚠️ {{ validationError }}
  </div>
</div>
```

### Custom Range Validation

```typescript
export class AppComponent {
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 31);
  
  businessDays: number = 0;
  weekends: number = 0;
  validationMessage: string = '';
  
  onRangeChange(args: RangeEventArgs): void {
    this.calculateBusinessDays(args.startDate as Date, args.endDate as Date);
    
    // Validate: at least 5 business days required
    if (this.businessDays < 5) {
      this.validationMessage = '❌ Range must include at least 5 business days';
    } else {
      this.validationMessage = `✓ Valid range: ${this.businessDays} business days, ${this.weekends} weekend days`;
    }
  }
  
  private calculateBusinessDays(start: Date, end: Date): void {
    this.businessDays = 0;
    this.weekends = 0;
    
    const current = new Date(start);
    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        this.weekends++;
      } else {
        this.businessDays++;
      }
      current.setDate(current.getDate() + 1);
    }
  }
}
```

## Disabled Dates and Ranges

### Disable Specific Date Ranges

```typescript
export class AppComponent {
  // Define blackout/disabled ranges (e.g., holidays, maintenance windows)
  disabledRanges: Array<{start: Date, end: Date, reason: string}> = [
    { 
      start: new Date(2026, 11, 20), 
      end: new Date(2026, 11, 31),
      reason: 'Holiday season - no reports'
    },
    {
      start: new Date(2026, 0, 1),
      end: new Date(2026, 0, 3),
      reason: 'New Year - office closed'
    },
    {
      start: new Date(2026, 6, 4),
      end: new Date(2026, 6, 10),
      reason: 'System maintenance'
    }
  ];
  
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  onRenderDayCell(args: RenderDayCellEventArgs): void {
    // Check if date falls in disabled range
    for (const range of this.disabledRanges) {
      if (args.date >= range.start && args.date <= range.end) {
        args.isDisabled = true;
        args.element.title = range.reason;
        break;
      }
    }
  }
}
```

```html
<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  (renderDayCell)="onRenderDayCell($event)">
</ejs-daterangepicker>
```

### Disable Weekends

```typescript
export class AppComponent {
  startDate: Date = new Date(2026, 2, 2);  // Monday
  endDate: Date = new Date(2026, 2, 13);   // Friday
  
  onRenderDayCell(args: RenderDayCellEventArgs): void {
    // Disable Saturdays (6) and Sundays (0)
    const dayOfWeek = args.date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      args.isDisabled = true;
    }
  }
}
```

## Clearing Selections

### Clear Range Programmatically

```typescript
export class AppComponent {
  @ViewChild('daterangepicker') drp!: DateRangePickerComponent;
  
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  clearRange(): void {
    this.startDate = new Date();  // Reset to today
    this.endDate = new Date();
    
    // Or set to null if component supports it
    // this.drp.value = null;
  }
  
  resetForm(): void {
    this.clearRange();
    console.log('Range cleared');
  }
}
```

```html
<div>
  <ejs-daterangepicker 
    #daterangepicker
    [startDate]="startDate"
    [endDate]="endDate">
  </ejs-daterangepicker>
  
  <button (click)="clearRange()">Clear Range</button>
  <button (click)="resetForm()">Reset Form</button>
</div>
```

### Show/Hide Clear Button

```html
<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  [showClearButton]="true">
</ejs-daterangepicker>
```

## Getting Selected Range

### Retrieve Selected Range from Event

```typescript
export class AppComponent {
  startDate: Date = new Date();
  endDate: Date = new Date();
  selectedRangeText: string = '';
  
  onRangeChange(args: RangeEventArgs): void {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    
    const start = (args.startDate as Date).toLocaleDateString('en-US', options);
    const end = (args.endDate as Date).toLocaleDateString('en-US', options);
    const dayCount = args.daySpan + 1;  // Include both start and end dates
    
    this.selectedRangeText = `${start} to ${end} (${dayCount} days)`;
  }
}
```

### Get Range Programmatically from Component

```typescript
export class AppComponent {
  @ViewChild('daterangepicker') drp!: DateRangePickerComponent;
  
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  getRange(): void {
    // Get selected range using component method
    const range = this.drp.getSelectedRange();
    console.log('Selected Range:', range);
    
    if (range && range.startDate && range.endDate) {
      console.log('Start:', range.startDate);
      console.log('End:', range.endDate);
    }
  }
  
  displayRangeInfo(): void {
    this.getRange();
  }
}
```

```html
<div>
  <ejs-daterangepicker 
    #daterangepicker
    [startDate]="startDate"
    [endDate]="endDate">
  </ejs-daterangepicker>
  
  <button (click)="displayRangeInfo()">Get Range Info</button>
</div>
```

---

**Next Step:** For quick selection options, read [preset-ranges.md](preset-ranges.md). For event handling details, read [events-and-methods.md](events-and-methods.md).
