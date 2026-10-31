# Date & Time Configuration

## Table of Contents
- [Date Format Customization](#date-format-customization)
- [Time Format Configuration](#time-format-configuration)
- [Combined DateTime Formats](#combined-datetime-formats)
- [Date Range Constraints](#date-range-constraints)
- [Time Range Constraints](#time-range-constraints)
- [ISO and String Handling](#iso-and-string-handling)
- [Input Format Parsing](#input-format-parsing)

## Date Format Customization

### Using Format Strings

The `format` property controls how dates are displayed and parsed:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  // Different format examples
  format1: string = 'dd/MM/yyyy';        // 24/03/2026
  format2: string = 'MM/dd/yyyy';        // 03/24/2026
  format3: string = 'yyyy-MM-dd';        // 2026-03-24
  format4: string = 'dd MMM yyyy';       // 24 Mar 2026
  format5: string = 'EEEE, MMMM d, yyyy'; // Tuesday, March 24, 2026
}
```

```html
<!-- Different date formats -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [format]="format1">
</ejs-datetimepicker>

<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [format]="format5">
</ejs-datetimepicker>
```

### Format String Tokens

| Token | Description | Example |
|-------|-------------|---------|
| `d` | Day (1-31) | 24 |
| `dd` | Day with leading zero (01-31) | 24 |
| `ddd` | Short day name | Tue |
| `dddd` | Full day name | Tuesday |
| `M` | Month (1-12) | 3 |
| `MM` | Month with leading zero (01-12) | 03 |
| `MMM` | Short month name | Mar |
| `MMMM` | Full month name | March |
| `yy` | 2-digit year | 26 |
| `yyyy` | 4-digit year | 2026 |

### Date-Only Formats

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
}
```

```html
<!-- US format: MM/dd/yyyy -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  format="MM/dd/yyyy"
  placeholder="US format: 03/24/2026">
</ejs-datetimepicker>

<!-- European format: dd/MM/yyyy -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  format="dd/MM/yyyy"
  placeholder="EU format: 24/03/2026">
</ejs-datetimepicker>

<!-- ISO format: yyyy-MM-dd -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  format="yyyy-MM-dd"
  placeholder="ISO: 2026-03-24">
</ejs-datetimepicker>

<!-- Verbose format: EEEE, MMMM d, yyyy -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  format="EEEE, MMMM d, yyyy"
  placeholder="Tuesday, March 24, 2026">
</ejs-datetimepicker>
```

## Time Format Configuration

### Using TimeFormat Property

The `timeFormat` property controls time display in the time picker popup:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  // Time format examples
  timeFormat1: string = 'HH:mm';      // 14:30 (24-hour)
  timeFormat2: string = 'hh:mm a';    // 02:30 PM (12-hour)
  timeFormat3: string = 'HH:mm:ss';   // 14:30:45 (24-hour with seconds)
  timeFormat4: string = 'hh:mm:ss a'; // 02:30:45 PM (12-hour with seconds)
}
```

```html
<!-- 24-hour format -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [timeFormat]="timeFormat1"
  placeholder="24-hour format">
</ejs-datetimepicker>

<!-- 12-hour format with AM/PM -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [timeFormat]="timeFormat2"
  placeholder="12-hour format">
</ejs-datetimepicker>

<!-- With seconds -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [timeFormat]="timeFormat3"
  placeholder="With seconds">
</ejs-datetimepicker>
```

### Time Format Tokens

| Token | Description | Example |
|-------|-------------|---------|
| `H` | Hour (0-23) | 14 |
| `HH` | Hour with leading zero (00-23) | 14 |
| `h` | Hour (1-12) | 2 |
| `hh` | Hour with leading zero (01-12) | 02 |
| `m` | Minute (0-59) | 5 |
| `mm` | Minute with leading zero (00-59) | 05 |
| `s` | Second (0-59) | 30 |
| `ss` | Second with leading zero (00-59) | 30 |
| `a` | AM/PM | PM |
| `A` | AM/PM (uppercase) | PM |

## Combined DateTime Formats

### Date + Time in Single Format Property

The `format` property can include both date and time tokens:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date(2026, 2, 24, 14, 30);
  
  // Combined formats
  dateTimeFormat1: string = 'dd/MM/yyyy hh:mm a';     // 24/03/2026 02:30 PM
  dateTimeFormat2: string = 'yyyy-MM-dd HH:mm:ss';    // 2026-03-24 14:30:00
  dateTimeFormat3: string = 'MMM d, yyyy h:mm a';     // Mar 24, 2026 2:30 PM
  dateTimeFormat4: string = 'EEEE, MMMM d, yyyy HH:mm'; // Tuesday, March 24, 2026 14:30
}
```

```html
<!-- 12-hour format with AM/PM -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [format]="dateTimeFormat1">
</ejs-datetimepicker>

<!-- ISO-style format -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [format]="dateTimeFormat2">
</ejs-datetimepicker>

<!-- US-style format -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [format]="dateTimeFormat3">
</ejs-datetimepicker>

<!-- Verbose format -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [format]="dateTimeFormat4">
</ejs-datetimepicker>
```

### Separate Date and Time Formats

Use both `format` and `timeFormat` properties together:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
}
```

```html
<!-- Date format controls calendar display, timeFormat controls time picker -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  format="dd/MM/yyyy"
  timeFormat="HH:mm"
  placeholder="Date: dd/MM/yyyy, Time: HH:mm">
</ejs-datetimepicker>
```

## Date Range Constraints

### Setting Min and Max Dates

Restrict the date range that can be selected:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  // Allow dates between today and 30 days from now
  minDate: Date = new Date();
  maxDate: Date = new Date();
  
  constructor() {
    // Min: today at 00:00
    this.minDate.setHours(0, 0, 0, 0);
    
    // Max: 30 days from now at 23:59
    this.maxDate.setDate(this.maxDate.getDate() + 30);
    this.maxDate.setHours(23, 59, 59, 999);
  }
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [min]="minDate"
  [max]="maxDate"
  placeholder="Select date within 30 days">
</ejs-datetimepicker>

<p>Valid range: {{ minDate | date:'medium' }} to {{ maxDate | date:'medium' }}</p>
```

### Business Days Only

Restrict to Monday-Friday with min/max + renderDayCell:

```typescript
import { RenderDayCellEventArgs } from '@syncfusion/ej2-calendars';

export class AppComponent {
  selectedDateTime: Date = new Date();
  
  onRenderDayCell(args: RenderDayCellEventArgs): void {
    const date = args.date as Date;
    const day = date.getDay();
    
    // Disable weekends (0 = Sunday, 6 = Saturday)
    if (day === 0 || day === 6) {
      args.isDisabled = true;
    }
  }
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  (renderDayCell)="onRenderDayCell($event)"
  placeholder="Select weekday">
</ejs-datetimepicker>
```

### Specific Date Ranges

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  // Q2 2026 (April 1 - June 30)
  minDate: Date = new Date(2026, 3, 1, 0, 0);
  maxDate: Date = new Date(2026, 5, 30, 23, 59);
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [min]="minDate"
  [max]="maxDate"
  placeholder="Select Q2 2026 date">
</ejs-datetimepicker>
```

## Time Range Constraints

### Setting Min and Max Times

Restrict the time range within each day:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  // Business hours: 9 AM to 5 PM
  minTime: Date = new Date(2026, 2, 24, 9, 0);   // 09:00
  maxTime: Date = new Date(2026, 2, 24, 17, 0);  // 17:00
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [minTime]="minTime"
  [maxTime]="maxTime"
  timeFormat="hh:mm a"
  placeholder="Select time between 9 AM - 5 PM">
</ejs-datetimepicker>
```

### Appointment Slots

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  // Appointment slots: 10 AM - 12 PM and 2 PM - 4 PM
  minTime: Date = new Date(2026, 2, 24, 10, 0); // 10:00 AM
  maxTime: Date = new Date(2026, 2, 24, 16, 0); // 4:00 PM
  
  onRenderDayCell(args: RenderDayCellEventArgs): void {
    const date = args.date as Date;
    
    // Disable lunch hours (12 PM - 2 PM)
    // This is typically done in conjunction with availability logic
  }
}
```

### Multiple Time Constraints

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  // Morning: 8 AM - 12 PM
  // Afternoon: 1 PM - 6 PM
  
  isMorningSlot: boolean = true;
  
  updateTimeRange(): void {
    if (this.isMorningSlot) {
      this.minTime = new Date(2026, 2, 24, 8, 0);
      this.maxTime = new Date(2026, 2, 24, 12, 0);
    } else {
      this.minTime = new Date(2026, 2, 24, 13, 0);
      this.maxTime = new Date(2026, 2, 24, 18, 0);
    }
  }
  
  minTime: Date;
  maxTime: Date;
  
  constructor() {
    this.updateTimeRange();
  }
}
```

```html
<div>
  <label>
    <input
      type="radio"
      [(ngModel)]="isMorningSlot"
      [value]="true"
      (change)="updateTimeRange()">
    Morning (8 AM - 12 PM)
  </label>
  
  <label>
    <input
      type="radio"
      [(ngModel)]="isMorningSlot"
      [value]="false"
      (change)="updateTimeRange()">
    Afternoon (1 PM - 6 PM)
  </label>
  
  <ejs-datetimepicker
    [(ngModel)]="selectedDateTime"
    [minTime]="minTime"
    [maxTime]="maxTime">
  </ejs-datetimepicker>
</div>
```

## ISO and String Handling

### ISO String Format

Work with ISO 8601 format for APIs and storage:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  isoString: string = '';
  
  onDateTimeChange(args: ChangedEventArgs): void {
    const selectedDate = args.value as Date;
    
    // Convert to ISO string for API submission
    this.isoString = selectedDate.toISOString();
    console.log('ISO format:', this.isoString); // 2026-03-24T14:30:00.000Z
  }
  
  setFromIsoString(isoString: string): void {
    // Parse ISO string and set in datetimepicker
    this.selectedDateTime = new Date(isoString);
  }
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  (change)="onDateTimeChange($event)">
</ejs-datetimepicker>

<p>ISO String: {{ isoString }}</p>
```

### String Parsing

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  parseCustomString(dateString: string): void {
    // Parse custom format: "24/03/2026 14:30"
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/');
    const [hours, minutes] = timePart.split(':');
    
    const parsedDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes)
    );
    
    this.selectedDateTime = parsedDate;
  }
}
```

### JSON Serialization

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  saveToJson(): string {
    const data = {
      id: 1,
      datetime: this.selectedDateTime.toISOString(),
      timestamp: this.selectedDateTime.getTime()
    };
    
    return JSON.stringify(data);
  }
  
  loadFromJson(jsonString: string): void {
    const data = JSON.parse(jsonString);
    this.selectedDateTime = new Date(data.datetime);
  }
}
```

## Input Format Parsing

### Multiple Input Formats

Accept different input formats and parse correctly:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  // Accept multiple input formats
  inputFormats: string[] = [
    'dd/MM/yyyy hh:mm a',
    'MM/dd/yyyy hh:mm a',
    'yyyy-MM-dd HH:mm',
    'dd-MM-yyyy HH:mm'
  ];
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [inputFormats]="inputFormats"
  format="dd/MM/yyyy hh:mm a"
  placeholder="Accept: dd/MM/yyyy, MM/dd/yyyy, yyyy-MM-dd, dd-MM-yyyy">
</ejs-datetimepicker>
```

### Flexible Parsing

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  // Accept common datetime formats
  inputFormats: string[] = [
    // 12-hour formats
    'MM/dd/yyyy hh:mm a',
    'dd/MM/yyyy hh:mm a',
    'MMM dd, yyyy hh:mm a',
    
    // 24-hour formats
    'MM/dd/yyyy HH:mm',
    'dd/MM/yyyy HH:mm',
    'yyyy-MM-dd HH:mm',
    
    // ISO format
    'yyyy-MM-dd\'T\'HH:mm:ss'
  ];
}
```

### Timezone-Aware Parsing

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  serverTimezoneOffset: number = -300; // EST (UTC-5)
  
  // Component will adjust dates based on server timezone
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [serverTimezoneOffset]="serverTimezoneOffset"
  placeholder="Adjusted to server timezone">
</ejs-datetimepicker>
```

## Common Format Patterns

### Locale-Aware Formatting

Use Angular's locale pipes with configuration:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  // Format will depend on component locale property
  locale: string = 'de-DE'; // German format
}
```

```html
<!-- Using Angular date pipe with locale -->
<p>{{ selectedDateTime | date:'medium':'':locale }}</p>

<!-- Using datetimepicker format property -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [locale]="locale"
  format="dd.MM.yyyy HH:mm">
</ejs-datetimepicker>
```

### Format Reference Table

| Use Case | Format | Example |
|----------|--------|---------|
| US Standard | `MM/dd/yyyy hh:mm a` | 03/24/2026 02:30 PM |
| EU Standard | `dd/MM/yyyy HH:mm` | 24/03/2026 14:30 |
| ISO Standard | `yyyy-MM-dd'T'HH:mm:ss` | 2026-03-24T14:30:00 |
| Verbose | `EEEE, MMMM d, yyyy hh:mm a` | Tuesday, March 24, 2026 02:30 PM |
| Database | `yyyy-MM-dd HH:mm:ss` | 2026-03-24 14:30:00 |
| Log File | `dd/MMM/yyyy HH:mm:ss` | 24/Mar/2026 14:30:00 |
