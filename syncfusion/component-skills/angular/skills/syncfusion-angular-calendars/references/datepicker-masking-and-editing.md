# Masking and Editing

## Table of Contents
- [Overview](#overview)
- [Enabling Date Masking](#enabling-date-masking)
- [Mask Patterns](#mask-patterns)
- [Keyboard Navigation in Masked Input](#keyboard-navigation-in-masked-input)
- [Custom Mask Placeholders](#custom-mask-placeholders)
- [Locale-Aware Mask Configuration](#locale-aware-mask-configuration)
- [Practical Examples](#practical-examples)
- [Troubleshooting](#troubleshooting)

## Overview

Date masking provides guided date entry by displaying placeholder characters that users fill in. As users type, the mask automatically formats according to the date format pattern.

**Benefits:**
- Visual guidance (shows expected format)
- Keyboard navigation (arrow keys increment date segments)
- Prevents invalid date entry during input
- Better mobile experience with constrained input

## Enabling Date Masking

### Basic Mask Setup

```typescript
import { Component } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
// Masking is enabled via the `enableMask` property on the component.

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [DatePickerModule],
  // No provider required; enable masking with `[enableMask]`.
  template: `
    <ejs-datepicker
      [enableMask]="true"
      format="dd/MM/yyyy"
      placeholder="DD/MM/YYYY">
    </ejs-datepicker>
  `
})
export class DatePickerComponent {}
```

**Result:** Input shows placeholder like "dd/MM/yyyy". As user types, segments fill in: "1_/MM/yyyy" → "15/MM/yyyy" → "15/03/yyyy" → "15/03/2024"

### With Two-Way Binding

```typescript
@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [DatePickerModule],
  // No provider required; enable masking with `[enableMask]`.
  template: `
    <ejs-datepicker
      [enableMask]="true"
      format="MM/dd/yyyy"
      [(ngModel)]="selectedDate"
      placeholder="MM/DD/YYYY">
    </ejs-datepicker>
    <p>Selected: {{ selectedDate | date:'fullDate' }}</p>
  `
})
export class DatePickerComponent {
  selectedDate: Date | null = null;
}
```

## Mask Patterns

Mask patterns are automatically generated from the date format. Each format component gets a placeholder:

### Standard Format Placeholders

```typescript
// Format: dd/MM/yyyy
// Mask: dd/MM/yyyy (each letter is placeholder for that component)

// Format: MM-dd-yyyy
// Mask: MM-dd-yyyy

// Format: yyyy.MM.dd
// Mask: yyyy.MM.dd
```

### Examples by Format

```typescript
@Component({
  template: `
    <div>
      <label>US Format (MM/dd/yyyy)</label>
      <ejs-datepicker
        format="MM/dd/yyyy"
        [enableMask]="true">
      </ejs-datepicker>
      
      <label>European (dd/MM/yyyy)</label>
      <ejs-datepicker
        format="dd/MM/yyyy"
        [enableMask]="true">
      </ejs-datepicker>
      
      <label>ISO (yyyy-MM-dd)</label>
      <ejs-datepicker
        format="yyyy-MM-dd"
        [enableMask]="true">
      </ejs-datepicker>
      
      <label>Long (dd MMMM yyyy)</label>
      <ejs-datepicker
        format="dd MMMM yyyy"
        [enableMask]="true">
      </ejs-datepicker>
    </div>
  `
})
export class DatePickerComponent {}
```

## Keyboard Navigation in Masked Input

When mask is enabled, keyboard shortcuts allow segment navigation and increment:

### Arrow Key Navigation

- **Right Arrow:** Move to next segment (day → month → year)
- **Left Arrow:** Move to previous segment (year → month → day)

### Increment/Decrement with Up/Down

- **Up Arrow:** Increment current segment (day: 15→16, month: 3→4, year: 2024→2025)
- **Down Arrow:** Decrement current segment (day: 15→14, month: 3→2, year: 2025→2024)

### Example: Keyboard Navigation

User interaction sequence:

```
Initial: [dd/MM/yyyy] - cursor at day
Type '1': [1d/MM/yyyy] - day segment "1_"
Type '5': [15/MM/yyyy] - day segment complete, auto-advance to month
Type '0': [15/0M/yyyy] - month segment "0_"
Type '3': [15/03/yyyy] - month segment complete, auto-advance to year
Type '2': [15/03/2y__] - year segment "2___"
Type '0': [15/03/20__] - continuing year
Type '2': [15/03/202_] - continuing year
Type '4': [15/03/2024] - date complete

Alternative using arrow keys:
[15/MM/yyyy] - day complete, at month segment
Up arrow:   [16/MM/yyyy] - day incremented
Left arrow: [15/MM/yyyy] - back to day segment
Down arrow: [14/MM/yyyy] - day decremented
```

## Custom Mask Placeholders

Override default placeholder text using `maskPlaceholder` property:

### Built-in Placeholders

Default placeholders in English:

```typescript
day     // for day segment
month   // for month segment
year    // for year segment
```

### Setting Custom Placeholder

```typescript
@Component({
  template: `
    <ejs-datepicker
      format="dd/MM/yyyy"
      [enableMask]="true"
      [maskPlaceholder]="'day'">
    </ejs-datepicker>
  `
})
export class DatePickerComponent {}
```

**Result:** 
- Shows: `day/month/year` initially
- User types: `15/03/2024`
- Final: `15/03/2024` (placeholders replaced with values)

### Placeholder Values

Common placeholder options:

```typescript
maskPlaceholder: 'day'      // Shows "day" for day segment
maskPlaceholder: 'month'    // Shows "month" for month segment  
maskPlaceholder: 'year'     // Shows "year" for year segment
maskPlaceholder: 'M'        // Shows "M" (single character)
maskPlaceholder: '0'        // Shows "0" (numeric placeholder)
```

## Locale-Aware Mask Configuration

For multi-language apps, load locale data for correct mask placeholder text:

### Loading L10n (Localization) Data

```typescript
import { Component } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
// MaskedDateTimeService is not required; masking is enabled via `enableMask`.
import { L10n, loadCldr } from '@syncfusion/ej2-base';
import { CommonModule } from '@angular/common';

declare var require: any;

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [DatePickerModule, CommonModule],
  // No provider required; enable masking with `[enableMask]`.
  template: `
    <div>
      <select [(ngModel)]="selectedLocale" (change)="onLocaleChange()">
        <option value="en">English</option>
        <option value="de">German</option>
        <option value="fr">French</option>
      </select>
      
      <ejs-datepicker
        [enableMask]="true"
        format="dd/MM/yyyy"
        [locale]="selectedLocale">
      </ejs-datepicker>
    </div>
  `
})
export class DatePickerComponent {
  selectedLocale = 'en';

  constructor() {
    // Load German culture CLDR data
    loadCldr(
      require('cldr-data/main/de/numbers.json'),
      require('cldr-data/main/de/ca-gregorian.json'),
      require('cldr-data/supplemental/numberingSystems.json')
    );

    // Set German L10n text
    L10n.load({
      'de': {
        'datepicker': {
          'placeholder': 'Datum wählen',
          'today': 'Heute'
        }
      }
    });
  }

  onLocaleChange() {
    console.log('Locale changed to:', this.selectedLocale);
  }
}
```

### Setting Mask Placeholder for Locale

```typescript
L10n.load({
  'de': {
    'datepicker': {
      'placeholder': 'Wählen Sie das Datum',
      'today': 'Heute',
      'day': 'Tag',
      'month': 'Monat',
      'year': 'Jahr'
    }
  }
});
```

## Practical Examples

### Example 1: Simple Date Entry with Masking

User types date with visual guidance:

```typescript
@Component({
  selector: 'app-simple-mask',
  standalone: true,
  imports: [DatePickerModule],
  // No provider required; enable masking with `[enableMask]`.
  template: `
    <label>Enter your birth date:</label>
    <ejs-datepicker
      format="dd/MM/yyyy"
      [enableMask]="true"
      [(ngModel)]="birthDate"
      placeholder="DD/MM/YYYY"
      (change)="onDateChange($event)">
    </ejs-datepicker>
    <p *ngIf="birthDate">You entered: {{ birthDate | date:'fullDate' }}</p>
  `
})
export class SimpleMaskComponent {
  birthDate: Date | null = null;

  onDateChange(event: any) {
    if (event.value) {
      console.log('Date selected:', event.value);
    }
  }
}
```

### Example 2: Date Entry with Validation

Mask + date range validation:

```typescript
@Component({
  selector: 'app-mask-validation',
  standalone: true,
  imports: [DatePickerModule, FormsModule],
  template: `
    <label>Select appointment date (next 30 days):</label>
    <ejs-datepicker
      format="dd/MM/yyyy"
      [enableMask]="true"
      [min]="todayDate"
      [max]="thirtyDaysFromToday"
      [(ngModel)]="appointmentDate"
      placeholder="DD/MM/YYYY">
    </ejs-datepicker>
    <p *ngIf="appointmentDate">
      Appointment: {{ appointmentDate | date:'fullDate' }}
    </p>
  `
})
export class MaskValidationComponent implements OnInit {
  appointmentDate: Date | null = null;
  todayDate: Date;
  thirtyDaysFromToday: Date;

  ngOnInit() {
    this.todayDate = new Date();
    this.thirtyDaysFromToday = new Date();
    this.thirtyDaysFromToday.setDate(this.thirtyDaysFromToday.getDate() + 30);
  }
}
```

### Example 3: Multi-Format DatePicker with Masking

Users choose their preferred format:

```typescript
@Component({
  selector: 'app-multi-format-mask',
  standalone: true,
  imports: [DatePickerModule, FormsModule, CommonModule],
  template: `
    <div>
      <label>Select format:</label>
      <select [(ngModel)]="selectedFormat">
        <option value="MM/dd/yyyy">US (MM/dd/yyyy)</option>
        <option value="dd/MM/yyyy">European (dd/MM/yyyy)</option>
        <option value="yyyy-MM-dd">ISO (yyyy-MM-dd)</option>
      </select>
      
      <label>Enter date:</label>
      <ejs-datepicker
        [format]="selectedFormat"
        [enableMask]="true"
        [(ngModel)]="selectedDate"
        [placeholder]="selectedFormat">
      </ejs-datepicker>
      
      <p *ngIf="selectedDate">
        Selected: {{ selectedDate | date:'fullDate' }}
      </p>
    </div>
  `
})
export class MultiFormatMaskComponent {
  selectedFormat = 'MM/dd/yyyy';
  selectedDate: Date | null = null;
}
```

## Troubleshooting

### Issue: Mask not showing

**Problem:** Placeholder text doesn't appear in DatePicker

**Solution:**
1. Ensure `enableMask` is set to true on the component.

**Example fix:**
```typescript
@Component({
  template: `
    <ejs-datepicker
      [enableMask]="true">  // ← Must be true
    </ejs-datepicker>
  `
})
export class DatePickerComponent {}
```

### Issue: Arrow keys not incrementing segments

**Problem:** Up/Down arrows don't change day/month/year values

**Solution:** Ensure DatePicker input has focus:

```typescript
@Component({
  template: `
    <ejs-datepicker
      #datepicker
      [enableMask]="true"
      format="dd/MM/yyyy">
    </ejs-datepicker>
    <button (click)="focusDatePicker()">Focus DatePicker</button>
  `
})
export class DatePickerComponent {
  @ViewChild('datepicker') datepicker: any;

  focusDatePicker() {
    this.datepicker.inputElement?.focus();
  }
}
```

### Issue: Placeholder text in wrong language

**Problem:** Mask shows "day/month/year" in English even with German locale

**Solution:** Load locale L10n data and set locale:

```typescript
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
  'de': {
    'datepicker': {
      'day': 'Tag',
      'month': 'Monat',
      'year': 'Jahr'
    }
  }
});

@Component({
  template: `
    <ejs-datepicker
      [enableMask]="true"
      locale="de"
      format="dd/MM/yyyy">
    </ejs-datepicker>
  `
})
export class DatePickerComponent {}
```

### Issue: Auto-advance not working between segments

**Problem:** After typing day, cursor stays on day instead of advancing to month

**Solution:** Type valid value for segment:

Correct:
Type '1': Shows "1_" (incomplete)
Type '5': Auto-advances to month (complete day "15")
Cursor: Now at month segment

Wrong:
Type '3': Shows "3_" (this is day, not complete)
No auto-advance yet

Type 'a': Invalid character rejected
Cursor: Still at day
```

---

**Related References:**
- [Getting Started](getting-started.md)
- [Date Formats and Parsing](date-formats-and-parsing.md)
- [Accessibility and Forms](accessibility-and-forms.md)
