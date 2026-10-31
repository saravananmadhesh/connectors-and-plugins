# Date Formats and Parsing

## Table of Contents
- [Overview](#overview)
- [Standard Date Format Patterns](#standard-date-format-patterns)
- [Culture-Specific Default Formats](#culture-specific-default-formats)
- [Custom Date Formats](#custom-date-formats)
- [parseDate and formatDate Methods](#parsedate-and-formatdate-methods)
- [Dynamic Format Switching](#dynamic-format-switching)
- [Common Format Scenarios](#common-format-scenarios)
- [Edge Cases and Troubleshooting](#edge-cases-and-troubleshooting)

## Overview

DatePicker supports flexible date formatting for display and parsing. By default, format is culture-specific and uses the CLDR **short** date pattern for the active culture (English shows `M/d/yyyy`, German shows `d.M.yyyy`). Note that the culture default is **not** zero-padded for month and day — to render `03/15/2024` or `18.08.2026` you must set `format="MM/dd/yyyy"` or `format="dd.MM.yyyy"` explicitly. You can customize the format using standard date pattern strings.

**Key concept:** Format property controls how dates are DISPLAYED in the input field, while locale controls parsing and day names.

## Standard Date Format Patterns

DatePicker uses standard date format patterns. Each character combination represents a date component:

| Pattern | Component | Example |
|---------|-----------|---------|
| `yyyy` | 4-digit year | 2024 |
| `yy` | 2-digit year | 24 |
| `MM` | 2-digit month | 03 (March) |
| `M` | 1 or 2-digit month | 3 (March) |
| `dd` | 2-digit day | 05 |
| `d` | 1 or 2-digit day | 5 |
| `MMMM` | Full month name | March |
| `MMM` | Short month name | Mar |
| `EEEE` | Full day name | Wednesday |
| `EEE` | Short day name | Wed |

### Common Format Examples

```typescript
// US format
format: 'MM/dd/yyyy'  // 03/15/2024

// European format
format: 'dd/MM/yyyy'  // 15/03/2024

// ISO format
format: 'yyyy-MM-dd'  // 2024-03-15

// With day name
format: 'EEE, MMM dd, yyyy'  // Wed, Mar 15, 2024

// German format
format: 'dd.MM.yyyy'  // 15.03.2024

// Full format
format: 'EEEE, MMMM dd, yyyy'  // Wednesday, March 15, 2024
```

### Applying Format

```typescript
import { Component } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [DatePickerModule],
  template: `
    <ejs-datepicker
      format="dd/MM/yyyy"
      placeholder="DD/MM/YYYY">
    </ejs-datepicker>
  `
})
export class DatePickerComponent {}
```

## Culture-Specific Default Formats

DatePicker automatically detects the current culture and applies the **CLDR short date pattern** for that culture when no `format` is set. The CLDR short pattern is **not** zero-padded for month and day in most cultures (notably `en-US` and `de`).

> **Zero-padding caveat:** Culture defaults render single-digit months and days without a leading zero — `en-US` shows `3/15/2026` (not `03/15/2026`) and `de` shows `18.8.2026` (not `18.08.2026`). If your application requires zero-padded output, set `format` explicitly (e.g. `format="MM/dd/yyyy"` or `format="dd.MM.yyyy"`).

**Important:** Once you set a custom format, it overrides culture-specific defaults for all locales.

```typescript
// This format applies regardless of locale
@Component({
  template: `
    <ejs-datepicker
      format="yyyy-MM-dd">
    </ejs-datepicker>
  `
})
export class DatePickerComponent {}
```

## Custom Date Formats

Create custom formats by combining pattern characters:

### Example 1: International Format with Month Name
```typescript
format: 'dd MMMM yyyy'  // 15 March 2024
```

```html
<ejs-datepicker format="dd MMMM yyyy"></ejs-datepicker>
```

### Example 2: US Format with Short Day Name
```typescript
format: 'EEE, MM/dd/yyyy'  // Wed, 03/15/2024
```

### Example 3: Verbose Format
```typescript
format: 'EEEE, MMMM dd, yyyy'  // Wednesday, March 15, 2024
```

### Example 4: Compact Format
```typescript
format: 'M/d/yy'  // 3/15/24
```

### Format in Component Property

```typescript
import { Component } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [DatePickerModule],
  template: `
    <div>
      <label>US Format:</label>
      <ejs-datepicker [format]="usFormat"></ejs-datepicker>
      
      <label>European Format:</label>
      <ejs-datepicker [format]="euFormat"></ejs-datepicker>
      
      <label>ISO Format:</label>
      <ejs-datepicker [format]="isoFormat"></ejs-datepicker>
    </div>
  `
})
export class DatePickerComponent {
  usFormat = 'MM/dd/yyyy';
  euFormat = 'dd.MM.yyyy';
  isoFormat = 'yyyy-MM-dd';
}
```

## parseDate and formatDate Methods

Syncfusion provides utility methods for manual date parsing and formatting:

### formatDate Method

Convert date object to formatted string:

```typescript
import { formatDate } from '@syncfusion/ej2-base';

// Format a date object
const date = new Date(2024, 2, 15); // March 15, 2024
const formatted = formatDate(date, 'dd/MM/yyyy'); // "15/03/2024"
```

### parseDate Method

Convert string to date object:

```typescript
import { parseDate } from '@syncfusion/ej2-base';

// Parse a date string
const dateString = '15/03/2024';
const parsed = parseDate(dateString, 'dd/MM/yyyy'); // Date object
```

### Culture-Aware Parsing and Formatting

Parse and format based on culture:

```typescript
import { formatDate, parseDate, loadCldr } from '@syncfusion/ej2-base';

declare var require: any;

// Load German culture CLDR data
loadCldr(
  require('cldr-data/main/de/numbers.json'),
  require('cldr-data/main/de/ca-gregorian.json'),
  require('cldr-data/supplemental/numberingSystems.json')
);

// Format with German culture
const date = new Date(2024, 2, 15);
const germanFormatOptions = { 
  format: 'dd MMMM yyyy',
  culture: 'de-DE'
};
const formatted = formatDate(date, germanFormatOptions); // "15 März 2024"

// Parse with German culture
const germanString = '15 März 2024';
const parseOptions = {
  format: 'dd MMMM yyyy',
  culture: 'de-DE'
};
const parsed = parseDate(germanString, parseOptions); // Date object
```

## Dynamic Format Switching

Change format based on user preference or application state:

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [DatePickerModule, FormsModule, CommonModule],
  template: `
    <div>
      <label>Choose Format:</label>
      <select [(ngModel)]="selectedFormat" (change)="onFormatChange()">
        <option value="MM/dd/yyyy">US (MM/dd/yyyy)</option>
        <option value="dd/MM/yyyy">European (dd/MM/yyyy)</option>
        <option value="yyyy-MM-dd">ISO (yyyy-MM-dd)</option>
        <option value="dd MMMM yyyy">Long (15 March 2024)</option>
      </select>
      
      <ejs-datepicker
        [format]="selectedFormat"
        [(ngModel)]="selectedDate"
        placeholder="Select date">
      </ejs-datepicker>
      
      <p *ngIf="selectedDate">
        Selected: {{ selectedDate | date:'fullDate' }}
      </p>
    </div>
  `
})
export class DatePickerComponent {
  selectedFormat = 'MM/dd/yyyy';
  selectedDate: Date | null = null;

  onFormatChange() {
    console.log('Format changed to:', this.selectedFormat);
  }
}
```

## Common Format Scenarios

### Scenario 1: Birth Date Entry (US Application)
```typescript
// Familiar US format for most users
format: 'MM/dd/yyyy'  // 03/15/1990
```

### Scenario 2: Invoice Date (International Business)
```typescript
// ISO format for clear, unambiguous dates
format: 'yyyy-MM-dd'  // 2024-03-15
```

### Scenario 3: Event Calendar (User-Friendly Display)
```typescript
// Full format with day name and month name
format: 'EEEE, MMMM dd, yyyy'  // Wednesday, March 15, 2024
```

### Scenario 4: Mobile Application (Compact)
```typescript
// Minimal format for small screens
format: 'M/d/yy'  // 3/15/24
```

### Scenario 5: Financial System (Audit Trail)
```typescript
// Verbose format with timestamp concept
format: 'yyyy-MM-dd'  // 2024-03-15 (ISO standard for record-keeping)
```

### Scenario 6: Multi-Language Application
```typescript
// Set format that works across languages
// Culture determines day/month names interpretation
format: 'dd MMMM yyyy'
locale: 'de-DE'  // German: "15 März 2024"
locale: 'fr-FR'  // French: "15 mars 2024"
```

## Edge Cases and Troubleshooting

### Issue: Format not matching user input

**Problem:** User types "15/03/2024" but DatePicker doesn't recognize it

**Solution:** Ensure format exactly matches input pattern
```typescript
// If user types: 15/03/2024
format: 'dd/MM/yyyy'  // ✓ Correct

// NOT:
format: 'MM/dd/yyyy'  // ✗ Wrong - expects MM/dd/yyyy
```

### Issue: Ambiguous dates with format

**Problem:** Format like "1/2/24" can be interpreted as January 2 or February 1

**Solution:** Use 2-digit components (MM, dd) for clarity
```typescript
// Ambiguous:
format: 'M/d/yy'  // 1/2/24 (is it Jan 2 or Feb 1?)

// Clear:
format: 'MM/dd/yyyy'  // 01/02/2024
```

### Issue: Month names not translating

**Problem:** Month names always show in English

**Solution:** Load CLDR data for target culture (see Globalization reference)

### Issue: Custom format breaking with locale change

**Problem:** Changing locale breaks existing custom format

**Solution:** Formats override culture defaults. If locale changes and format is set, format takes precedence:
```typescript
format: 'yyyy-MM-dd';  // This always applies
locale: 'en-US';       // Locale affects day names but not this format
```

---

**Related References:**
- [Globalization and Localization](globalization-and-localization.md)
- [Date Range and Validation](date-range-and-validation.md)
