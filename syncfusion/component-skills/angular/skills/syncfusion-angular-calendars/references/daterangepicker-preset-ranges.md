# Preset Ranges

## Table of Contents
- [Overview](#overview)
- [Predefined Preset Options](#predefined-preset-options)
- [Configuring Presets](#configuring-presets)
- [Custom Preset Configuration](#custom-preset-configuration)
- [Programmatic Preset Application](#programmatic-preset-application)
- [Dynamic Preset Generation](#dynamic-preset-generation)
- [Combining Presets with Constraints](#combining-presets-with-constraints)

## Overview

Preset ranges allow users to quickly select common date ranges with a single click. These are predefined date ranges like "Last 7 Days", "This Month", or "Last Quarter" that appear as buttons or dropdown options.

**Benefits of Presets:**
- Improves user experience with one-click selection
- Reduces time to select frequently-used ranges
- Ensures consistency in date selection
- Supports business-specific date ranges

## Predefined Preset Options

### Common Preset Ranges

```typescript
export class AppComponent {
  presets: any[] = [
    {
      label: 'Today',
      start: new Date(),
      end: new Date()
    },
    {
      label: 'Yesterday',
      start: this.getDateDaysAgo(1),
      end: this.getDateDaysAgo(1)
    },
    {
      label: 'Last 7 Days',
      start: this.getDateDaysAgo(7),
      end: new Date()
    },
    {
      label: 'Last 30 Days',
      start: this.getDateDaysAgo(30),
      end: new Date()
    },
    {
      label: 'This Month',
      start: this.getFirstDayOfMonth(),
      end: new Date()
    },
    {
      label: 'Last Month',
      start: this.getFirstDayOfLastMonth(),
      end: this.getLastDayOfLastMonth()
    },
    {
      label: 'Last 3 Months',
      start: this.getDateMonthsAgo(3),
      end: new Date()
    },
    {
      label: 'This Year',
      start: new Date(new Date().getFullYear(), 0, 1),
      end: new Date()
    },
    {
      label: 'Last Year',
      start: new Date(new Date().getFullYear() - 1, 0, 1),
      end: new Date(new Date().getFullYear() - 1, 11, 31)
    }
  ];
  
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  selectPreset(preset: any): void {
    this.startDate = preset.start;
    this.endDate = preset.end;
  }
  
  private getDateDaysAgo(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  }
  
  private getDateMonthsAgo(months: number): Date {
    const date = new Date();
    date.setMonth(date.getMonth() - months);
    return date;
  }
  
  private getFirstDayOfMonth(): Date {
    return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  }
  
  private getFirstDayOfLastMonth(): Date {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
  }
  
  private getLastDayOfLastMonth(): Date {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 0);
  }
}
```

```html
<div>
  <div style="margin-bottom: 15px;">
    <h4>Quick Presets:</h4>
    <button *ngFor="let preset of presets"
            (click)="selectPreset(preset)"
            style="margin-right: 8px; padding: 6px 12px; margin-bottom: 5px;">
      {{ preset.label }}
    </button>
  </div>
  
  <ejs-daterangepicker 
    [startDate]="startDate"
    [endDate]="endDate"
    placeholder="Or select custom dates">
  </ejs-daterangepicker>
</div>
```

## Configuring Presets

### Using DateRangePicker Presets Property

```typescript
export class AppComponent {
  // Configure presets directly on component
  presets: any[] = [
    { label: 'Last 7 Days', start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), end: new Date() },
    { label: 'Last 30 Days', start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), end: new Date() },
    { label: 'This Month', start: new Date(new Date().getFullYear(), new Date().getMonth(), 1), end: new Date() }
  ];
  
  startDate: Date = new Date();
  endDate: Date = new Date();
}
```

```html
<!-- Use presets property for built-in preset rendering -->
<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  [presets]="presets">
</ejs-daterangepicker>
```

### Preset Button Styling

```typescript
export class AppComponent {
  presets: any[] = [
    { label: 'Last 7 Days', start: this.getDateDaysAgo(7), end: new Date(), icon: '📅' },
    { label: 'This Month', start: this.getFirstDayOfMonth(), end: new Date(), icon: '📆' },
    { label: 'Last 3 Months', start: this.getDateMonthsAgo(3), end: new Date(), icon: '📊' }
  ];
  
  startDate: Date = new Date();
  endDate: Date = new Date();
  activePreset: string = '';
  
  selectPreset(preset: any): void {
    this.startDate = preset.start;
    this.endDate = preset.end;
    this.activePreset = preset.label;
  }
  
  private getDateDaysAgo(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  }
  
  private getDateMonthsAgo(months: number): Date {
    const date = new Date();
    date.setMonth(date.getMonth() - months);
    return date;
  }
  
  private getFirstDayOfMonth(): Date {
    return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  }
}
```

```html
<div style="margin-bottom: 20px;">
  <button *ngFor="let preset of presets"
          (click)="selectPreset(preset)"
          [style.background-color]="activePreset === preset.label ? '#3f51b5' : '#f0f0f0'"
          [style.color]="activePreset === preset.label ? 'white' : 'black'"
          style="margin-right: 8px; padding: 8px 14px; border: 1px solid #ccc; 
                  border-radius: 4px; cursor: pointer; transition: all 0.3s;">
    {{ preset.icon }} {{ preset.label }}
  </button>
</div>

<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  placeholder="Or select custom dates">
</ejs-daterangepicker>
```

## Custom Preset Configuration

### Business-Specific Presets

```typescript
export class AppComponent {
  // Financial reporting presets
  financialPresets: any[] = [
    { label: 'Q1 (Jan-Mar)', start: new Date(2026, 0, 1), end: new Date(2026, 2, 31) },
    { label: 'Q2 (Apr-Jun)', start: new Date(2026, 3, 1), end: new Date(2026, 5, 30) },
    { label: 'Q3 (Jul-Sep)', start: new Date(2026, 6, 1), end: new Date(2026, 8, 30) },
    { label: 'Q4 (Oct-Dec)', start: new Date(2026, 9, 1), end: new Date(2026, 11, 31) },
    { label: 'Full Year', start: new Date(2026, 0, 1), end: new Date(2026, 11, 31) }
  ];
  
  // HR payroll presets
  payrollPresets: any[] = [
    { label: 'Current Pay Period', start: this.getCurrentPayPeriodStart(), end: this.getCurrentPayPeriodEnd() },
    { label: 'Last Pay Period', start: this.getLastPayPeriodStart(), end: this.getLastPayPeriodEnd() },
    { label: 'Current Month', start: this.getFirstDayOfMonth(), end: new Date() },
    { label: 'Last 3 Months', start: this.getDateMonthsAgo(3), end: new Date() }
  ];
  
  activePresetGroup: string = 'financial';
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  get activePresets(): any[] {
    return this.activePresetGroup === 'financial' ? this.financialPresets : this.payrollPresets;
  }
  
  selectPreset(preset: any): void {
    this.startDate = preset.start;
    this.endDate = preset.end;
  }
  
  private getCurrentPayPeriodStart(): Date {
    // Assuming bi-weekly pay periods starting Monday
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(today.setDate(diff));
  }
  
  private getCurrentPayPeriodEnd(): Date {
    const start = this.getCurrentPayPeriodStart();
    const end = new Date(start);
    end.setDate(end.getDate() + 13);
    return end;
  }
  
  private getLastPayPeriodStart(): Date {
    const start = this.getCurrentPayPeriodStart();
    start.setDate(start.getDate() - 14);
    return start;
  }
  
  private getLastPayPeriodEnd(): Date {
    const start = this.getCurrentPayPeriodStart();
    start.setDate(start.getDate() - 1);
    return start;
  }
  
  private getDateMonthsAgo(months: number): Date {
    const date = new Date();
    date.setMonth(date.getMonth() - months);
    return date;
  }
  
  private getFirstDayOfMonth(): Date {
    return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  }
}
```

```html
<div>
  <div style="margin-bottom: 10px;">
    <label>Report Type:</label>
    <select (change)="activePresetGroup = $event.target.value">
      <option value="financial">Financial Reporting</option>
      <option value="payroll">Payroll</option>
    </select>
  </div>
  
  <div style="margin-bottom: 15px;">
    <button *ngFor="let preset of activePresets"
            (click)="selectPreset(preset)"
            style="margin-right: 8px; padding: 8px 12px; margin-bottom: 5px;">
      {{ preset.label }}
    </button>
  </div>
  
  <ejs-daterangepicker 
    [startDate]="startDate"
    [endDate]="endDate">
  </ejs-daterangepicker>
</div>
```

## Programmatic Preset Application

### Apply Preset Based on User Action

```typescript
export class AppComponent {
  @ViewChild('daterangepicker') drp!: DateRangePickerComponent;
  
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  // Apply preset based on form selection
  onTimeRangeSelect(range: string): void {
    switch (range) {
      case 'today':
        this.startDate = new Date();
        this.endDate = new Date();
        break;
      
      case 'week':
        this.endDate = new Date();
        this.startDate = new Date(this.endDate);
        this.startDate.setDate(this.startDate.getDate() - 7);
        break;
      
      case 'month':
        this.endDate = new Date();
        this.startDate = new Date(this.endDate);
        this.startDate.setMonth(this.startDate.getMonth() - 1);
        break;
      
      case 'year':
        this.endDate = new Date();
        this.startDate = new Date(this.endDate);
        this.startDate.setFullYear(this.startDate.getFullYear() - 1);
        break;
    }
  }
  
  applyPresetAndClose(preset: any): void {
    this.startDate = preset.start;
    this.endDate = preset.end;
    this.drp.hide();  // Close picker after selection
  }
}
```

### Preset with Validation

```typescript
export class AppComponent {
  presets: any[] = [
    { label: 'Last 7 Days', start: this.getDateDaysAgo(7), end: new Date(), maxDays: 7 },
    { label: 'Last 30 Days', start: this.getDateDaysAgo(30), end: new Date(), maxDays: 30 },
    { label: 'Last Quarter', start: this.getDateMonthsAgo(3), end: new Date(), maxDays: 90 }
  ];
  
  startDate: Date = new Date();
  endDate: Date = new Date();
  presetInfo: string = '';
  
  selectPreset(preset: any): void {
    this.startDate = preset.start;
    this.endDate = preset.end;
    
    const dayCount = Math.ceil(
      (this.endDate.getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;
    
    this.presetInfo = `${preset.label}: ${dayCount} days selected`;
  }
  
  private getDateDaysAgo(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  }
  
  private getDateMonthsAgo(months: number): Date {
    const date = new Date();
    date.setMonth(date.getMonth() - months);
    return date;
  }
}
```

## Dynamic Preset Generation

### Generate Presets Based on Available Data

```typescript
export class AppComponent {
  presets: any[] = [];
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  ngOnInit(): void {
    // Generate presets dynamically based on business requirements
    this.generatePresets();
  }
  
  generatePresets(): void {
    const today = new Date();
    
    this.presets = [
      { label: 'Today', start: today, end: today },
      { label: 'Last 7 Days', start: this.getDateDaysAgo(7), end: today },
      { label: 'Last 30 Days', start: this.getDateDaysAgo(30), end: today },
      { label: 'Last 90 Days', start: this.getDateDaysAgo(90), end: today },
      { label: 'This Year To Date', start: new Date(today.getFullYear(), 0, 1), end: today },
      { label: 'Rolling 12 Months', start: this.getDateMonthsAgo(12), end: today }
    ];
    
    // Only include historical presets if we're not at the beginning of the year
    if (today.getMonth() > 0) {
      this.presets.push({
        label: 'Last Year',
        start: new Date(today.getFullYear() - 1, 0, 1),
        end: new Date(today.getFullYear() - 1, 11, 31)
      });
    }
  }
  
  selectPreset(preset: any): void {
    this.startDate = new Date(preset.start);
    this.endDate = new Date(preset.end);
  }
  
  private getDateDaysAgo(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  }
  
  private getDateMonthsAgo(months: number): Date {
    const date = new Date();
    date.setMonth(date.getMonth() - months);
    return date;
  }
}
```

## Combining Presets with Constraints

### Apply Min/Max Constraints to Presets

```typescript
export class AppComponent {
  presets: any[] = [
    { label: 'Last 7 Days', start: this.getDateDaysAgo(7), end: new Date() },
    { label: 'Last 30 Days', start: this.getDateDaysAgo(30), end: new Date() },
    { label: 'Last 90 Days', start: this.getDateDaysAgo(90), end: new Date() }
  ];
  
  startDate: Date = new Date(new Date().getFullYear() - 1, 0, 1);  // Last year start
  endDate: Date = new Date();  // Today
  
  // Allow only last 2 years
  minDate: Date = new Date(new Date().getFullYear() - 2, 0, 1);
  maxDate: Date = new Date();
  
  selectPreset(preset: any): void {
    let start = preset.start;
    let end = preset.end;
    
    // Ensure preset dates fall within min/max constraints
    if (start < this.minDate) {
      start = new Date(this.minDate);
    }
    if (end > this.maxDate) {
      end = new Date(this.maxDate);
    }
    
    this.startDate = start;
    this.endDate = end;
  }
  
  private getDateDaysAgo(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  }
}
```

```html
<div>
  <div style="margin-bottom: 15px;">
    <button *ngFor="let preset of presets"
            (click)="selectPreset(preset)"
            style="margin-right: 8px; padding: 8px 12px;">
      {{ preset.label }}
    </button>
  </div>
  
  <ejs-daterangepicker 
    [startDate]="startDate"
    [endDate]="endDate"
    [min]="minDate"
    [max]="maxDate"
    placeholder="Select date range">
  </ejs-daterangepicker>
</div>
```

---

**Next Step:** For event handling and range change detection, read [events-and-methods.md](events-and-methods.md).
