# Accessibility and Forms

## Table of Contents
- [WCAG 2.2 Compliance](#wcag-22-compliance)
- [ARIA Attributes](#aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [FormValidator Integration](#formvalidator-integration)
- [Reactive Forms Patterns](#reactive-forms-patterns)
- [Template-Driven Forms](#template-driven-forms)
- [Custom Validation Rules](#custom-validation-rules)
- [Testing Accessibility](#testing-accessibility)

## WCAG 2.2 Compliance

Syncfusion DatePicker follows WCAG 2.2 Level AA standards. Key compliance areas:

### Accessibility Standards Compliance

| Standard | Status | Coverage |
|----------|--------|----------|
| WCAG 2.2 Level AA | ✓ Supported | Most features |
| Section 508 (ADA) | ✓ Supported | Most features |
| EN 301 549 (EU) | ✓ Supported | Most features |
| ARIA Spinbutton | ✓ Compliant | For date selection |

### Required for Full Compliance

1. **Semantic HTML:** Use labels and proper form structure
2. **Color contrast:** Minimum 4.5:1 for text
3. **Keyboard navigation:** All features accessible via keyboard
4. **Screen reader support:** Meaningful labels and announcements
5. **Focus indicators:** Clear visual indication of focused element

## ARIA Attributes

DatePicker includes built-in ARIA support. Key attributes:

### aria-expanded

Indicates whether calendar popup is open/closed:

```html
<!-- Calendar closed -->
<ejs-datepicker aria-expanded="false"></ejs-datepicker>

<!-- Calendar open -->
<ejs-datepicker aria-expanded="true"></ejs-datepicker>
```

### aria-disabled

Indicates disabled state:

```html
    <ejs-datepicker 
      [enabled]="false"
      aria-disabled="true">
    </ejs-datepicker>
```

### aria-label and aria-labelledby

Provide accessible names:

```typescript
@Component({
  template: `
    <label id="birthDateLabel">Birth Date (Required)</label>
    <ejs-datepicker
      aria-labelledby="birthDateLabel"
      placeholder="MM/DD/YYYY">
    </ejs-datepicker>
  `
})
export class AccessibleDatePickerComponent {}
```

### aria-activedescendant

Indicates currently focused date in calendar:

```html
<!-- While navigating calendar with keyboard -->
<ejs-datepicker 
  aria-activedescendant="date-15"
  role="combobox">
</ejs-datepicker>
```

### Complete Accessible Example

```typescript
import { Component } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-accessible-datepicker',
  standalone: true,
  imports: [DatePickerModule],
  template: `
    <fieldset>
      <legend>Event Scheduling</legend>
      
      <label for="eventDate">
        Event Date
        <span aria-label="required">*</span>
      </label>
      
      <ejs-datepicker
        id="eventDate"
        aria-label="Select event date"
        aria-describedby="eventDateHint"
        placeholder="MM/DD/YYYY"
        [min]="todayDate"
        [max]="oneYearFromToday">
      </ejs-datepicker>
      
      <small id="eventDateHint">
        Select a date within the next year
      </small>
    </fieldset>
  `
})
export class AccessibleEventPickerComponent {
  todayDate = new Date();
  oneYearFromToday: Date;

  constructor() {
    this.oneYearFromToday = new Date();
    this.oneYearFromToday.setFullYear(this.oneYearFromToday.getFullYear() + 1);
  }
}
```

## Keyboard Navigation

Complete keyboard support for accessibility:

### Essential Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Tab** | Move focus to DatePicker |
| **Shift+Tab** | Move focus away from DatePicker |
| **Alt+Down** | Open calendar popup |
| **Escape** | Close calendar popup |
| **Enter** | Select focused date |
| **Arrow Up** | Previous date (or segment in mask mode) |
| **Arrow Down** | Next date (or segment in mask mode) |
| **Arrow Left** | Previous week (or segment) |
| **Arrow Right** | Next week (or segment) |
| **Ctrl+Home** | Go to first date of month |
| **Ctrl+End** | Go to last date of month |
| **Page Up** | Previous month |
| **Page Down** | Next month |

### Enabling Keyboard Navigation

```typescript
import { Component } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-keyboard-nav',
  standalone: true,
  imports: [DatePickerModule],
  template: `
    <div>
      <label for="datepicker">Select Date (Use keyboard)</label>
      <ejs-datepicker
        id="datepicker"
        placeholder="Press Alt+Down to open">
      </ejs-datepicker>
      
      <p role="alert">
        Keyboard shortcuts enabled. Press Alt+Down to open calendar.
      </p>
    </div>
  `
})
export class KeyboardNavComponent {}
```

### Testing Keyboard Navigation

1. Click DatePicker to focus
2. Press **Alt+Down** to open calendar
3. Use **Arrow keys** to navigate dates
4. Press **Enter** to select
5. Press **Escape** to close

## Screen Reader Support

DatePicker provides announcements for screen readers (NVDA, JAWS, VoiceOver):

### Screen Reader Announcements

```typescript
import { Component } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-screen-reader',
  standalone: true,
  imports: [DatePickerModule],
  template: `
    <form>
      <div>
        <label for="appointment">
          Appointment Date
          <span class="required" aria-label="required">*</span>
        </label>
        <ejs-datepicker
          id="appointment"
          aria-required="true"
          aria-describedby="appointmentHelp"
          placeholder="Select date">
        </ejs-datepicker>
        <small id="appointmentHelp">
          Required field. Select a date from the calendar.
        </small>
      </div>
    </form>
  `,
  styles: [`
    .required {
      color: red;
    }
    
    label {
      display: block;
      margin-bottom: 8px;
    }
  `]
})
export class ScreenReaderComponent {}
```

**Screen reader announces:**
- "Appointment Date, required, edit text"
- "Select date from the calendar" (from aria-describedby)
- Calendar events: "Monday, March 15, 2024 selected"

### Testing with Screen Readers

1. **Windows:** Use NVDA (free) - download from [nvaccess.org](https://www.nvaccess.org)
2. **Mac:** Use built-in VoiceOver (Cmd+F5)
3. **Navigation:**
   - Tab to DatePicker
   - Press Alt+Down to open calendar
   - Listen to announcements

## FormValidator Integration

Validate DatePicker using Syncfusion FormValidator:

### Basic Validation

```typescript
import { Component, ViewChild } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { FormValidatorModule, FormValidator } from '@syncfusion/ej2-angular-inputs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-validation',
  standalone: true,
  imports: [DatePickerModule, FormValidatorModule, FormsModule],
  template: `
    <form #validationForm="ngForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="birthDate">Birth Date (Required):</label>
        <ejs-datepicker
          id="birthDate"
          name="birthDate"
          [(ngModel)]="birthDate"
          placeholder="MM/DD/YYYY"
          required>
        </ejs-datepicker>
        <span class="error-message" *ngIf="validationForm.submitted && !birthDate">
          Birth date is required
        </span>
      </div>
      
      <button type="submit">Submit</button>
    </form>
  `,
  styles: [`
    .form-group {
      margin-bottom: 16px;
    }
    
    .error-message {
      color: red;
      font-size: 12px;
      display: block;
      margin-top: 4px;
    }
  `]
})
export class FormValidationComponent {
  @ViewChild('validationForm') form: any;
  birthDate: Date | null = null;

  onSubmit() {
    if (this.form.valid) {
      console.log('Form valid, birth date:', this.birthDate);
    }
  }
}
```

### Validation with Rules

```typescript
import { Component, ViewChild } from '@angular/core';
import { FormValidator } from '@syncfusion/ej2-angular-inputs';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-advanced-validation',
  standalone: true,
  imports: [DatePickerModule],
  template: `
    <form #form>
      <label for="eventDate">Event Date:</label>
      <ejs-datepicker
        id="eventDate"
        name="eventDate"
        [(ngModel)]="eventDate"
        placeholder="Select date">
      </ejs-datepicker>
      
      <button (click)="validateForm()">Validate</button>
      <p *ngIf="validationMessage" class="message">{{ validationMessage }}</p>
    </form>
  `,
  styles: [`
    .message {
      color: green;
      margin-top: 8px;
    }
  `]
})
export class AdvancedValidationComponent {
  @ViewChild('form') form: any;
  eventDate: Date | null = null;
  validationMessage = '';

  validateForm() {
    // Custom validation logic
    if (!this.eventDate) {
      this.validationMessage = 'Event date is required';
    } else if (this.eventDate < new Date()) {
      this.validationMessage = 'Event date must be in the future';
    } else {
      this.validationMessage = 'Date is valid!';
    }
  }
}
```

## Reactive Forms Patterns

Use DatePicker with Angular Reactive Forms:

### Basic Reactive Form

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [DatePickerModule, ReactiveFormsModule, CommonModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div>
        <label for="eventDate">Event Date:</label>
        <ejs-datepicker
          id="eventDate"
          formControlName="eventDate"
          placeholder="Select date">
        </ejs-datepicker>
        
        <div *ngIf="isFieldInvalid('eventDate')" class="error">
          <p *ngIf="form.get('eventDate')?.hasError('required')">
            Event date is required
          </p>
        </div>
      </div>
      
      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  `,
  styles: [`
    .error {
      color: red;
      font-size: 12px;
      margin-top: 4px;
    }
    
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class ReactiveFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      eventDate: [null, Validators.required]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    }
  }
}
```

### Reactive Form with Date Range

```typescript
@Component({
  selector: 'app-date-range-form',
  standalone: true,
  imports: [DatePickerModule, ReactiveFormsModule, CommonModule],
  template: `
    <form [formGroup]="form">
      <div>
        <label for="startDate">Start Date:</label>
        <ejs-datepicker
          id="startDate"
          formControlName="startDate"
          (change)="onStartDateChange()">
        </ejs-datepicker>
      </div>
      
      <div>
        <label for="endDate">End Date:</label>
        <ejs-datepicker
          id="endDate"
          formControlName="endDate"
          [min]="startDate">
        </ejs-datepicker>
        
        <p *ngIf="isEndDateInvalid()" class="error">
          End date must be after start date
        </p>
      </div>
    </form>
  `
})
export class DateRangeFormComponent {
  form: FormGroup;
  startDate: Date | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  onStartDateChange() {
    this.startDate = this.form.get('startDate')?.value;
    this.form.get('endDate')?.reset();
  }

  isEndDateInvalid(): boolean {
    const endDate = this.form.get('endDate')?.value;
    return endDate && this.startDate && endDate < this.startDate;
  }
}
```

## Template-Driven Forms

Use DatePicker with template-driven forms:

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template-form',
  standalone: true,
  imports: [DatePickerModule, FormsModule, CommonModule],
  template: `
    <form #form="ngForm" (ngSubmit)="onSubmit(form)">
      <div>
        <label for="appointmentDate">Appointment Date:</label>
        <ejs-datepicker
          id="appointmentDate"
          name="appointmentDate"
          [(ngModel)]="appointment.date"
          required
          #appointmentDateCtrl="ngModel">
        </ejs-datepicker>
        
        <div *ngIf="form.submitted && appointmentDateCtrl.invalid" class="error">
          Appointment date is required
        </div>
      </div>
      
      <button type="submit">Book Appointment</button>
    </form>
  `
})
export class TemplateDrivenFormComponent {
  appointment = {
    date: null as Date | null
  };

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Appointment:', this.appointment);
    }
  }
}
```

## Custom Validation Rules

Create custom validators for DatePicker:

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { CommonModule } from '@angular/common';

// Custom validator: Must be 18+
function ageValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  const today = new Date();
  const birthDate = new Date(value);
  const age = today.getFullYear() - birthDate.getFullYear();

  return age >= 18 ? null : { 'insufficientAge': true };
}

// Custom validator: Date cannot be weekend
function noWeekendsValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  const date = new Date(value);
  const day = date.getDay();
  const isWeekend = day === 0 || day === 6;

  return isWeekend ? { 'weekend': true } : null;
}

@Component({
  selector: 'app-custom-validators',
  standalone: true,
  imports: [DatePickerModule, ReactiveFormsModule, CommonModule],
  template: `
    <form [formGroup]="form">
      <div>
        <label for="birthDate">Birth Date (18+ only):</label>
        <ejs-datepicker
          id="birthDate"
          formControlName="birthDate">
        </ejs-datepicker>
        
        <p *ngIf="form.get('birthDate')?.hasError('insufficientAge')" class="error">
          Must be at least 18 years old
        </p>
      </div>
      
      <div>
        <label for="appointmentDate">Appointment Date (Weekdays only):</label>
        <ejs-datepicker
          id="appointmentDate"
          formControlName="appointmentDate">
        </ejs-datepicker>
        
        <p *ngIf="form.get('appointmentDate')?.hasError('weekend')" class="error">
          Appointments not available on weekends
        </p>
      </div>
    </form>
  `
})
export class CustomValidatorsComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      birthDate: [null, [Validators.required, ageValidator]],
      appointmentDate: [null, [Validators.required, noWeekendsValidator]]
    });
  }
}
```

## Testing Accessibility

### Automated Testing with Axe DevTools

1. Install [Axe DevTools Chrome Extension](https://www.deque.com/axe/devtools/)
2. Open DatePicker component in browser
3. Run Axe scan from browser DevTools
4. Review accessibility violations

### Manual Keyboard Testing

```typescript
// Test checklist
1. Tab to DatePicker ✓
2. Alt+Down to open calendar ✓
3. Arrow keys navigate dates ✓
4. Enter selects date ✓
5. Escape closes calendar ✓
6. All focus visible ✓
7. Labels present ✓
8. ARIA attributes correct ✓
```

### Screen Reader Testing (NVDA)

```
1. Download NVDA (free) from nvaccess.org
2. Launch NVDA (Ctrl+Alt+N)
3. Navigate to page with DatePicker
4. Tab to DatePicker
5. Listen for screen reader announcement
6. Press Alt+Down, listen for calendar announcement
7. Navigate with arrow keys
8. Check all announcements are clear
```

---

**Related References:**
- [Getting Started](getting-started.md)
- [Styling and Customization](styling-and-customization.md)
- [Date Range and Validation](date-range-and-validation.md)
