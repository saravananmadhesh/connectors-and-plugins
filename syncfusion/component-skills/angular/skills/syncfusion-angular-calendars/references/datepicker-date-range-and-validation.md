# Date Range and Validation

## Table of Contents
- [Setting Date Range Constraints](#setting-date-range-constraints)
- [Out-of-Range Date Handling](#out-of-range-date-handling)
- [Strict Mode Validation](#strict-mode-validation)
- [Invalid Date Detection](#invalid-date-detection)
- [Real-World Patterns](#real-world-patterns)
- [Integration with Form Validators](#integration-with-form-validators)
- [Troubleshooting](#troubleshooting)

## Setting Date Range Constraints

Use `min` and `max` properties to restrict selectable date range:

### Basic Min/Max Setup

```typescript
import { Component } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [DatePickerModule, FormsModule],
  template: `
    <ejs-datepicker
      [min]="minDate"
      [max]="maxDate"
      placeholder="Select date between Jan 1 and Dec 31, 2024">
    </ejs-datepicker>
  `
})
export class DatePickerComponent {
  minDate = new Date(2024, 0, 1);   // January 1, 2024
  maxDate = new Date(2024, 11, 31); // December 31, 2024
}
```

**Behavior:**
- Dates before `min` are disabled (grayed out) in calendar
- Dates after `max` are disabled in calendar
- User can still type out-of-range date in input
- If `strictMode` is true, out-of-range typed dates are rejected

### Dynamic Date Range

Set date range based on business logic:

```typescript
@Component({
  template: `
    <ejs-datepicker
      [min]="calculatedMin"
      [max]="calculatedMax">
    </ejs-datepicker>
  `
})
export class DatePickerComponent implements OnInit {
  calculatedMin: Date;
  calculatedMax: Date;

  ngOnInit() {
    // Set min to today
    this.calculatedMin = new Date();
    
    // Set max to 90 days from today
    this.calculatedMax = new Date();
    this.calculatedMax.setDate(this.calculatedMax.getDate() + 90);
  }
}
```

### Date Range by Month/Year

Restrict to specific month or year:

```typescript
@Component({
  template: `
    <div>
      <label>Select meeting date (March only)</label>
      <ejs-datepicker
        [min]="marchStart"
        [max]="marchEnd"
        placeholder="Select date in March">
      </ejs-datepicker>
    </div>
  `
})
export class DatePickerComponent {
  marchStart = new Date(2024, 2, 1);   // March 1
  marchEnd = new Date(2024, 2, 31);    // March 31
}
```

## Out-of-Range Date Handling

When user selects or types a date outside the min/max range:

### Default Behavior (strictMode = false)

Without strict mode, out-of-range dates are accepted but marked with error styling:

```typescript
@Component({
  template: `
    <ejs-datepicker
      [min]="minDate"
      [max]="maxDate"
      [(ngModel)]="selectedDate"
      placeholder="Select date">
    </ejs-datepicker>
    <p>Selected: {{ selectedDate | date:'fullDate' }}</p>
  `
})
export class DatePickerComponent {
  minDate = new Date(2024, 0, 1);
  maxDate = new Date(2024, 11, 31);
  selectedDate: Date | null = null;
}
```

**Result:** 
- User can select/type 2025-01-15 (outside range)
- Date accepts but input has `.e-error` CSS class (red border)
- `selectedDate` gets the out-of-range value

### Strict Mode Behavior (strictMode = true)

With strict mode enabled, invalid/out-of-range dates are rejected:

```typescript
@Component({
  template: `
    <ejs-datepicker
      [min]="minDate"
      [max]="maxDate"
      [strictMode]="true"
      [(ngModel)]="selectedDate"
      placeholder="Select date (strict mode)">
    </ejs-datepicker>
    <p *ngIf="selectedDate">Selected: {{ selectedDate | date:'fullDate' }}</p>
    <p *ngIf="!selectedDate" style="color: red;">Invalid or out-of-range date</p>
  `
})
export class DatePickerComponent {
  minDate = new Date(2024, 0, 1);
  maxDate = new Date(2024, 11, 31);
  selectedDate: Date | null = null;
}
```

**Result:**
- User types 2025-01-15 (outside range)
- DatePicker rejects input, clears field, sets `selectedDate` to null
- No out-of-range dates can be selected

### Catching Out-of-Range Events

Handle out-of-range dates in events:

```typescript
@Component({
  template: `
    <ejs-datepicker
      [min]="minDate"
      [max]="maxDate"
      [(ngModel)]="selectedDate"
      (change)="onDateChange($event)">
    </ejs-datepicker>
    <p *ngIf="errorMessage" style="color: red;">{{ errorMessage }}</p>
  `
})
export class DatePickerComponent {
  minDate = new Date(2024, 0, 1);
  maxDate = new Date(2024, 11, 31);
  selectedDate: Date | null = null;
  errorMessage = '';

  onDateChange(event: any) {
    if (event.value && event.value < this.minDate) {
      this.errorMessage = 'Date is before minimum allowed date';
    } else if (event.value && event.value > this.maxDate) {
      this.errorMessage = 'Date is after maximum allowed date';
    } else {
      this.errorMessage = '';
      console.log('Valid date selected:', event.value);
    }
  }
}
```

## Strict Mode Validation

### Enabling Strict Mode

```typescript
@Component({
  template: `
    <ejs-datepicker
      [min]="minDate"
      [max]="maxDate"
      [strictMode]="true"
      [(ngModel)]="selectedDate">
    </ejs-datepicker>
  `
})
export class DatePickerComponent {
  minDate = new Date(2024, 0, 1);
  maxDate = new Date(2024, 11, 31);
  selectedDate: Date | null = null;
}
```

### Strict Mode Effects

With `strictMode = true`:

1. **Out-of-range dates rejected:** Date outside min/max is not accepted
2. **Invalid dates rejected:** Malformed dates like "32/13/2024" are rejected
3. **selectedDate set to null:** If invalid, bound property becomes null
4. **Input cleared:** Invalid input is cleared automatically
5. **No error class:** Unlike default mode, no visual error state

### When to Use Strict Mode

✓ **Use strict mode for:**
- Forms requiring valid dates (no optional out-of-range selection)
- Critical business logic (can't process invalid dates)
- Age verification (must be within range)
- Appointment scheduling (strict availability)

✗ **Avoid strict mode for:**
- Optional date fields
- Historical data (might need dates outside current constraints)
- Flexible date handling scenarios

## Invalid Date Detection

DatePicker automatically validates date formats:

### Format Validation

```typescript
// With format specified
@Component({
  template: `
    <ejs-datepicker
      format="dd/MM/yyyy"
      [strictMode]="true"
      [(ngModel)]="selectedDate">
    </ejs-datepicker>
  `
})
export class DatePickerComponent {
  selectedDate: Date | null = null;
}
```

**Valid inputs:** "15/03/2024", "1/1/2024", "31/12/2024"
**Invalid inputs:** "32/13/2024" (day 32, month 13), "abc/def/2024", "15-03-2024" (wrong separator)

### Invalid Date Examples

```
Format: dd/MM/yyyy

✓ Valid:     ✗ Invalid:
15/03/2024   32/03/2024  (no day 32)
01/01/2024   15/13/2024  (no month 13)
31/12/2024   15-03-2024  (wrong separator)
1/1/2024     32/32/2024  (invalid day and month)
```

### Detecting Invalid Dates in Code

```typescript
@Component({
  template: `
    <ejs-datepicker
      [(ngModel)]="selectedDate"
      (change)="onDateChange($event)">
    </ejs-datepicker>
    <p [style.color]="isValid ? 'green' : 'red'">
      {{ isValid ? 'Valid date' : 'Invalid date' }}
    </p>
  `
})
export class DatePickerComponent {
  selectedDate: Date | null = null;
  isValid = true;

  onDateChange(event: any) {
    this.isValid = event.value !== null && !isNaN(event.value);
  }
}
```

## Real-World Patterns

### Pattern 1: Flight Booking (No Past Dates, 1 Year Ahead)

```typescript
@Component({
  template: `
    <label>Flight Departure Date</label>
    <ejs-datepicker
      [min]="todayDate"
      [max]="oneYearFromToday"
      [strictMode]="true"
      placeholder="Select departure date">
    </ejs-datepicker>
  `
})
export class FlightBookingComponent implements OnInit {
  todayDate: Date;
  oneYearFromToday: Date;

  ngOnInit() {
    this.todayDate = new Date();
    this.oneYearFromToday = new Date();
    this.oneYearFromToday.setFullYear(this.oneYearFromToday.getFullYear() + 1);
  }
}
```

**Logic:** Users cannot book past flights or too far in future

### Pattern 2: Appointment Scheduling (Next 30 Days)

```typescript
@Component({
  template: `
    <label>Appointment Date (Next 30 days)</label>
    <ejs-datepicker
      [min]="tomorrow"
      [max]="thirtyDaysFromToday"
      placeholder="Select appointment date">
    </ejs-datepicker>
  `
})
export class AppointmentComponent implements OnInit {
  tomorrow: Date;
  thirtyDaysFromToday: Date;

  ngOnInit() {
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);

    this.thirtyDaysFromToday = new Date();
    this.thirtyDaysFromToday.setDate(this.thirtyDaysFromToday.getDate() + 30);
  }
}
```

**Logic:** Appointments available starting tomorrow, up to 30 days out

### Pattern 3: Birth Date (Age Verification)

```typescript
@Component({
  template: `
    <label>Birth Date (Must be 18+)</label>
    <ejs-datepicker
      [max]="maxBirthDate"
      [strictMode]="true"
      (change)="onBirthDateChange($event)">
    </ejs-datepicker>
    <p *ngIf="ageError" style="color: red;">{{ ageError }}</p>
  `
})
export class AgeVerificationComponent implements OnInit {
  maxBirthDate: Date;
  ageError = '';

  ngOnInit() {
    // Set max to today 18 years ago
    this.maxBirthDate = new Date();
    this.maxBirthDate.setFullYear(this.maxBirthDate.getFullYear() - 18);
  }

  onBirthDateChange(event: any) {
    if (event.value === null) {
      this.ageError = 'Birth date required';
    } else if (event.value > this.maxBirthDate) {
      this.ageError = 'Must be at least 18 years old';
    } else {
      this.ageError = '';
    }
  }
}
```

**Logic:** Only accepts birth dates for people 18+ years old

### Pattern 4: License/Permit Expiry Validation

```typescript
@Component({
  template: `
    <label>License Expiry Date (Current or future)</label>
    <ejs-datepicker
      [min]="todayDate"
      [strictMode]="true"
      placeholder="Select expiry date">
    </ejs-datepicker>
  `
})
export class LicenseComponent implements OnInit {
  todayDate: Date;

  ngOnInit() {
    this.todayDate = new Date();
  }
}
```

**Logic:** Cannot select past dates (expired licenses)

## Integration with Form Validators

Combine DatePicker with Syncfusion FormValidator:

```typescript
import { Component, ViewChild } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { FormValidatorModule } from '@syncfusion/ej2-angular-inputs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [DatePickerModule, FormValidatorModule, FormsModule],
  template: `
    <form #form="ngForm" (submit)="onSubmit()">
      <label>Birth Date (Required, 18+)</label>
      <ejs-datepicker
        name="birthDate"
        [(ngModel)]="birthDate"
        [min]="minBirthDate"
        required>
      </ejs-datepicker>
      
      <button type="submit">Submit</button>
    </form>
  `
})
export class FormComponent {
  @ViewChild('form') form: any;
  birthDate: Date | null = null;
  minBirthDate: Date;

  constructor() {
    this.minBirthDate = new Date();
    this.minBirthDate.setFullYear(this.minBirthDate.getFullYear() - 18);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form valid, birth date:', this.birthDate);
    }
  }
}
```

## Troubleshooting

### Issue: Min/Max not preventing selection

**Problem:** User can select dates outside min/max range

**Solution:** Ensure dates are valid Date objects:
```typescript
// ✗ Wrong - strings don't work
minDate = '2024-01-01';  // This is a string, not a Date

// ✓ Correct
minDate = new Date(2024, 0, 1);  // Proper Date object
```

### Issue: Strict mode not rejecting invalid dates

**Problem:** Invalid dates still get accepted

**Solution:** Ensure `strictMode` is explicitly set to true:
```typescript
// May not work:
[strictMode]="strictMode"  // if strictMode is undefined

// Always works:
[strictMode]="true"
```

### Issue: Date range calculations off by one day

**Problem:** Min/max dates seem shifted

**Solution:** Remember JavaScript months are 0-indexed:
```typescript
// ✗ Wrong - February 1 instead of January 1
minDate = new Date(2024, 1, 1);

// ✓ Correct - January 1
minDate = new Date(2024, 0, 1);
```

### Issue: Out-of-range date showing as selected

**Problem:** Despite min/max, selected date is outside range

**Solution:** Use `strictMode = true` to enforce rejection:
```typescript
// Default (allows out-of-range but marks with error):
<ejs-datepicker [min]="minDate" [max]="maxDate"></ejs-datepicker>

// Enforce (rejects out-of-range):
<ejs-datepicker 
  [min]="minDate" 
  [max]="maxDate"
  [strictMode]="true">
</ejs-datepicker>
```

---

**Related References:**
- [Getting Started](getting-started.md)
- [Date Formats and Parsing](date-formats-and-parsing.md)
- [Accessibility and Forms](accessibility-and-forms.md)
