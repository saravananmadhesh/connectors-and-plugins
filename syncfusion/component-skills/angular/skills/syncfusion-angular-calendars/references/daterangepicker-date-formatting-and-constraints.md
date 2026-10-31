# Date Formatting & Constraints

## Table of Contents
- [Date Format Patterns](#date-format-patterns)
- [Custom Date Formats](#custom-date-formats)
- [Multiple Input Formats](#multiple-input-formats)
- [Format Separators](#format-separators)
- [Min/Max Date Constraints](#minmax-date-constraints)
- [Min/Max Days Validation](#minmax-days-validation)
- [Disabled Date Ranges](#disabled-date-ranges)
- [Strict Mode](#strict-mode)

## Date Format Patterns

### Standard Format Patterns

```typescript
export class AppComponent {
  // Common date format patterns
  formats = {
    // Numeric formats
    'mm/dd/yyyy': '03/15/2026',           // US format
    'dd/mm/yyyy': '15/03/2026',           // European format
    'yyyy-mm-dd': '2026-03-15',           // ISO format
    'dd.mm.yyyy': '15.03.2026',           // German format
    
    // Text-based formats
    'ddd, mmmm dd, yyyy': 'Sun, March 15, 2026',
    'mmmm dd, yyyy': 'March 15, 2026',
    'mmm d, yy': 'Mar 15, 26',
    
    // With time (if needed)
    'mm/dd/yyyy hh:mm tt': '03/15/2026 02:30 PM'
  };
  
  selectedFormat: string = 'mm/dd/yyyy';
}
```

### Format Pattern Syntax

| Pattern | Meaning | Example |
|---------|---------|---------|
| `d` | Day (1-31, no leading zero) | 1, 15, 31 |
| `dd` | Day (01-31, with leading zero) | 01, 15, 31 |
| `ddd` | Day name abbreviation | Sun, Mon, Tue |
| `dddd` | Full day name | Sunday, Monday, Tuesday |
| `m` | Month (1-12, no leading zero) | 1, 3, 12 |
| `mm` | Month (01-12, with leading zero) | 01, 03, 12 |
| `mmm` | Month abbreviation | Jan, Mar, Dec |
| `mmmm` | Full month name | January, March, December |
| `yy` | 2-digit year | 26, 99 |
| `yyyy` | 4-digit year | 2026, 1999 |
| `h` | Hour (1-12) | 1, 11, 12 |
| `hh` | Hour (01-12, with leading zero) | 01, 11, 12 |
| `H` | Hour (0-23) | 0, 14, 23 |
| `HH` | Hour (00-23, with leading zero) | 00, 14, 23 |
| `m` or `mm` | Minutes | 0-59 |
| `ss` | Seconds | 00-59 |
| `t` | Meridiem (A/P) | A, P |
| `tt` | Meridiem (AM/PM) | AM, PM |

## Custom Date Formats

### Set Custom Format

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 31);
  
  // Different custom formats
  format1: string = 'dd/MM/yyyy';          // 01/03/2026
  format2: string = 'MMM d, yyyy';         // Mar 1, 2026
  format3: string = 'yyyy-MM-dd';          // 2026-03-01
  format4: string = 'EEEE, MMMM d, yyyy';  // Sunday, March 1, 2026
}
```

```html
<div>
  <div>
    <label>Standard US Format:</label>
    <ejs-daterangepicker 
      [startDate]="startDate"
      [endDate]="endDate"
      format="mm/dd/yyyy">
    </ejs-daterangepicker>
  </div>
  
  <div>
    <label>European Format:</label>
    <ejs-daterangepicker 
      [startDate]="startDate"
      [endDate]="endDate"
      format="dd/mm/yyyy">
    </ejs-daterangepicker>
  </div>
  
  <div>
    <label>ISO Format:</label>
    <ejs-daterangepicker 
      [startDate]="startDate"
      [endDate]="endDate"
      format="yyyy-mm-dd">
    </ejs-daterangepicker>
  </div>
  
  <div>
    <label>Text Format:</label>
    <ejs-daterangepicker 
      [startDate]="startDate"
      [endDate]="endDate"
      format="mmmm dd, yyyy">
    </ejs-daterangepicker>
  </div>
</div>
```

### Format Separator

Customize the range separator:

```typescript
export class AppComponent {
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 31);
  
  separator: string = ' to ';  // Default is '-'
}
```

```html
<!-- Display: 03/01/2026 to 03/31/2026 -->
<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  format="mm/dd/yyyy"
  [separator]="separator">
</ejs-daterangepicker>
```

### Locale-Specific Format

```typescript
export class AppComponent {
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 31);
  
  // Different locales
  locale: string = 'en-US';
  
  onLocaleChange(newLocale: string): void {
    this.locale = newLocale;
  }
}
```

```html
<div>
  <select (change)="onLocaleChange($event.target.value)">
    <option value="en-US">English (US)</option>
    <option value="en-GB">English (UK)</option>
    <option value="de-DE">German</option>
    <option value="fr-FR">French</option>
    <option value="es-ES">Spanish</option>
    <option value="ja-JP">Japanese</option>
  </select>
  
  <ejs-daterangepicker 
    [startDate]="startDate"
    [endDate]="endDate"
    [locale]="locale">
  </ejs-daterangepicker>
</div>
```

## Multiple Input Formats

Allow users to input dates in multiple formats:

```typescript
export class AppComponent {
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 31);
  
  // Support multiple input formats
  // Users can type: "03/01/2026", "2026-03-01", "Mar 1, 2026"
  inputFormats: Array<string | any> = [
    'mm/dd/yyyy',
    'dd/mm/yyyy',
    'yyyy-mm-dd',
    'mmmm dd, yyyy',
    'mmm d, yy'
  ];
}
```

```html
<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  format="mm/dd/yyyy"
  [inputFormats]="inputFormats"
  placeholder="Type date in any format">
</ejs-daterangepicker>
```

## Format Separators

### Custom Range Separator

```typescript
export class AppComponent {
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 31);
  
  separators = {
    dash: '-',
    to: ' to ',
    arrow: ' → ',
    colon: ' : ',
    pipe: ' | '
  };
  
  selectedSeparator: string = 'to';
}
```

```html
<div style="margin-bottom: 15px;">
  <label>Choose separator:</label>
  <select [(ngModel)]="selectedSeparator">
    <option value="dash">Dash (-)</option>
    <option value="to">To</option>
    <option value="arrow">Arrow (→)</option>
    <option value="colon">Colon (:)</option>
    <option value="pipe">Pipe (|)</option>
  </select>
</div>

<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  format="mm/dd/yyyy"
  [separator]="separators[selectedSeparator]">
</ejs-daterangepicker>
```

## Min/Max Date Constraints

### Set Minimum and Maximum Dates

```typescript
export class AppComponent {
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 31);
  
  // Only allow dates in 2026
  minDate: Date = new Date(2026, 0, 1);
  maxDate: Date = new Date(2026, 11, 31);
}
```

```html
<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  [min]="minDate"
  [max]="maxDate"
  placeholder="Select date range in 2026">
</ejs-daterangepicker>
```

### Dynamic Min/Max Dates

```typescript
export class AppComponent {
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  // Dynamically set constraints based on business logic
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
      
      case 'monthly':
        // Last 12 months
        this.minDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        this.maxDate = today;
        break;
      
      case 'yearly':
        // Last 5 years
        this.minDate = new Date(today.getFullYear() - 5, 0, 1);
        this.maxDate = today;
        break;
      
      case 'custom':
        // User can pick any date (wide range)
        this.minDate = new Date(1900, 0, 1);
        this.maxDate = new Date(2100, 11, 31);
        break;
    }
  }
}
```

## Min/Max Days Validation

### Set Minimum Days Required

```typescript
export class AppComponent {
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 8);
  
  // Require at least 7 days
  minDays: number = 7;
  
  validationMessage: string = '';
  
  onRangeChange(args: any): void {
    if (args.daySpan < this.minDays) {
      this.validationMessage = `Please select at least ${this.minDays} days`;
    } else {
      this.validationMessage = '';
    }
  }
}
```

```html
<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  [minDays]="minDays"
  (change)="onRangeChange($event)"
  placeholder="Select at least 7 days">
</ejs-daterangepicker>

<p *ngIf="validationMessage" style="color: red;">
  ⚠️ {{ validationMessage }}
</p>
```

### Set Maximum Days Allowed

```typescript
export class AppComponent {
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 31);
  
  // Allow maximum 90 days
  maxDays: number = 90;
  
  validationMessage: string = '';
  
  onRangeChange(args: any): void {
    if (args.daySpan > this.maxDays) {
      this.validationMessage = `Range cannot exceed ${this.maxDays} days`;
    } else {
      this.validationMessage = '';
    }
  }
}
```

```html
<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  [maxDays]="maxDays"
  (change)="onRangeChange($event)"
  placeholder="Select up to 90 days">
</ejs-daterangepicker>

<p *ngIf="validationMessage" style="color: red;">
  ⚠️ {{ validationMessage }}
</p>
```

## Disabled Date Ranges

### Disable Specific Date Ranges

```typescript
export class AppComponent {
  disabledRanges: Array<{start: Date, end: Date, reason: string}> = [
    {
      start: new Date(2026, 11, 20),
      end: new Date(2026, 11, 31),
      reason: 'Holiday season - no reports'
    },
    {
      start: new Date(2026, 6, 4),
      end: new Date(2026, 6, 10),
      reason: 'System maintenance'
    }
  ];
  
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 31);
  
  onRenderDayCell(args: any): void {
    // Check if date falls in disabled range
    for (const range of this.disabledRanges) {
      if (args.date >= range.start && args.date <= range.end) {
        args.isDisabled = true;
        args.element.title = range.reason;
        args.element.style.opacity = '0.5';
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

## Strict Mode

### Enable Strict Date Validation

```typescript
export class AppComponent {
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 31);
  
  // strictMode: true - Only valid dates in format are accepted
  strictMode: boolean = true;
}
```

```html
<!-- With strictMode, user can only enter dates in exact format -->
<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  format="mm/dd/yyyy"
  [strictMode]="true"
  placeholder="Strict format: mm/dd/yyyy">
</ejs-daterangepicker>
```

### Disable Strict Mode for Flexibility

```html
<!-- Without strictMode, component tries to parse various formats -->
<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  format="mm/dd/yyyy"
  [strictMode]="false"
  placeholder="Flexible date entry">
</ejs-daterangepicker>
```

---

**Next Step:** For keyboard navigation and accessibility, read [keyboard-navigation-and-accessibility.md](keyboard-navigation-and-accessibility.md).
