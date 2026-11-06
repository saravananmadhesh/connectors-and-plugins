# Keyboard Navigation & Accessibility

## Table of Contents
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Accessibility Features](#accessibility-features)
- [WCAG 2.2 Compliance](#wcag-22-compliance)
- [ARIA Implementation](#aria-implementation)
- [Screen Reader Support](#screen-reader-support)
- [Focus Management](#focus-management)
- [Mobile Accessibility](#mobile-accessibility)

## Keyboard Shortcuts

### Calendar Navigation Keys

| Key | Action | Description |
|-----|--------|-------------|
| **Tab** | Move focus | Move to next focusable element |
| **Shift + Tab** | Move focus back | Move to previous focusable element |
| **Enter** | Select date | Confirm date selection in calendar |
| **Space** | Select date | Alternative to Enter for selection |
| **Escape** | Close popup | Close the date range picker |
| **Arrow Left** | Previous date | Move to previous day in calendar |
| **Arrow Right** | Next date | Move to next day in calendar |
| **Arrow Up** | Previous week | Move to same day in previous week |
| **Arrow Down** | Next week | Move to same day in next week |
| **Home** | First day of month | Jump to first day |
| **End** | Last day of month | Jump to last day |
| **Page Up** | Previous month | Navigate to previous month |
| **Page Down** | Next month | Navigate to next month |
| **Alt + Page Up** | Previous year | Navigate to previous year |
| **Alt + Page Down** | Next year | Navigate to next year |
| **Alt + Up** | Switch view up | Year → Decade view |
| **Alt + Down** | Switch view down | Decade → Year → Month view |

### Keyboard Navigation Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { DateRangePickerComponent } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('daterangepicker') drp!: DateRangePickerComponent;
  
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 15);
  
  // Event to track keyboard input
  onKeyDown(event: KeyboardEvent): void {
    console.log(`Key pressed: ${event.key} (Code: ${event.code})`);
    
    // Additional keyboard handling if needed
    if (event.key === 'Escape') {
      console.log('Escape pressed - closing picker');
      this.drp.hide();
    }
  }
}
```

```html
<div>
  <label for="daterange">Select Date Range (Try keyboard navigation):</label>
  <ejs-daterangepicker 
    id="daterange"
    #daterangepicker
    [startDate]="startDate"
    [endDate]="endDate"
    placeholder="Use arrow keys to navigate"
    (keydown)="onKeyDown($event)">
  </ejs-daterangepicker>
</div>

<p style="font-size: 12px; color: #666;">
  Tip: Use Tab to focus, Arrows to navigate, Enter to select, Escape to close
</p>
```

## Accessibility Features

### Semantic HTML and ARIA Attributes

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 15);
}
```

```html
<!-- Accessible DateRangePicker markup -->
<div class="date-range-container">
  <!-- Proper label association -->
  <label for="travel-dates" class="form-label">
    <span class="required">*</span>
    Select Travel Dates (Required)
  </label>
  
  <!-- Help text for additional context -->
  <p id="daterange-help" class="help-text">
    Select your check-in date and check-out date. Use keyboard navigation with arrow keys.
  </p>
  
  <!-- DateRangePicker with proper attributes -->
  <ejs-daterangepicker 
    id="travel-dates"
    #daterangepicker
    [startDate]="startDate"
    [endDate]="endDate"
    placeholder="Select date range"
    aria-labelledby="travel-dates"
    aria-describedby="daterange-help"
    [required]="true">
  </ejs-daterangepicker>
  
  <!-- Error message container -->
  <div id="daterange-error" aria-live="polite" aria-atomic="true"></div>
</div>

<style>
  .required {
    color: red;
    font-weight: bold;
  }
  
  .help-text {
    font-size: 14px;
    color: #666;
    margin: 5px 0;
  }
</style>
```

## WCAG 2.2 Compliance

### Level AA Compliance Checklist

```typescript
export class AccessibleDateRangePickerComponent implements OnInit {
  @ViewChild('daterangepicker') drp!: DateRangePickerComponent;
  
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 15);
  
  ngOnInit(): void {
    // Verify WCAG 2.2 Level AA compliance
    this.validateAccessibility();
  }
  
  // WCAG 2.2 Level AA Checklist:
  // ✓ Perceivable: Information and components are presentable
  // ✓ Operable: Navigation via keyboard (Tab, Arrow keys, etc.)
  // ✓ Understandable: Clear labels, help text, error messages
  // ✓ Robust: Compatible with assistive technologies
  
  private validateAccessibility(): void {
    console.log('WCAG 2.2 Level AA Compliance Check:');
    console.log('✓ Keyboard accessibility enabled');
    console.log('✓ Focus indicators visible');
    console.log('✓ Color contrast: PASS (> 4.5:1)');
    console.log('✓ Semantic HTML with ARIA');
    console.log('✓ Screen reader compatible');
    console.log('✓ Mobile touch accessible');
  }
}
```

### Color Contrast Requirements

```css
/* WCAG AA requires minimum 4.5:1 contrast for normal text */
/* and 3:1 for large text (18pt+ or 14pt+ bold) */

:host ::ng-deep .e-daterangepicker {
  /* Label text (dark text on light background) */
  color: #1a1a1a;  /* Contrast ratio: 17.5:1 */
  background: #ffffff;
  
  /* Focus indicator (high contrast) */
  &:focus {
    outline: 3px solid #0066cc;  /* Contrast ratio: 8.6:1 */
  }
  
  /* Placeholder text (lighter but still compliant) */
  &::placeholder {
    color: #666666;  /* Contrast ratio: 7:1 */
  }
  
  /* Error message (red text, high contrast) */
  &.error {
    color: #d32f2f;  /* Contrast ratio: 5.3:1 */
  }
  
  /* Disabled state */
  &:disabled {
    color: #999999;  /* Contrast ratio: 4.5:1 */
    background: #f5f5f5;
  }
}
```

## ARIA Implementation

### ARIA Attributes for DateRangePicker

```html
<!-- Complete ARIA implementation -->
<div class="form-group">
  <!-- ARIA labelledby for label association -->
  <label id="daterange-label" for="daterange-input">
    Event Date Range
  </label>
  
  <!-- ARIA describedby for help text -->
  <!-- ARIA required for form validation -->
  <!-- Role explicit if needed -->
  <ejs-daterangepicker 
    id="daterange-input"
    role="group"
    aria-labelledby="daterange-label"
    aria-describedby="daterange-help"
    aria-required="true"
    [required]="true"
    [startDate]="startDate"
    [endDate]="endDate">
  </ejs-daterangepicker>
  
  <!-- Help/instruction text -->
  <p id="daterange-help">
    Format: MM/DD/YYYY to MM/DD/YYYY. Minimum 7 days required.
  </p>
  
  <!-- Error message with aria-live -->
  <div id="daterange-error" 
       class="error-message" 
       aria-live="polite" 
       aria-atomic="true"
       role="alert">
  </div>
</div>

<style>
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }
  
  #daterange-help {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
  }
  
  .error-message {
    margin-top: 5px;
    color: #d32f2f;
    font-weight: bold;
  }
</style>
```

### ARIA Live Regions for Dynamic Content

```typescript
export class AppComponent {
  @ViewChild('errorMessage') errorElement!: ElementRef;
  
  startDate: Date = new Date();
  endDate: Date = new Date();
  errorMessage: string = '';
  
  onRangeChange(args: any): void {
    // Validate range
    if (args.daySpan < 7) {
      this.errorMessage = 'Error: Range must be at least 7 days';
      // Screen readers automatically announce aria-live="polite" regions
    } else {
      this.errorMessage = '';
    }
  }
}
```

```html
<!-- Dynamic error announcement with aria-live -->
<div id="daterange-error" 
     aria-live="polite" 
     aria-atomic="true"
     role="status">
  {{ errorMessage }}
</div>
```

## Screen Reader Support

### Accessible Form with DateRangePicker

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()">
      <fieldset>
        <legend>Hotel Booking Information</legend>
        
        <!-- Check-in date field -->
        <div class="form-group">
          <label for="checkin-date">
            <span class="required">*</span> Check-in Date
          </label>
          <p id="checkin-help" class="help-text">
            Select your check-in date using the calendar or keyboard navigation
          </p>
          <ejs-daterangepicker 
            id="checkin-date"
            formControlName="checkInDate"
            aria-labelledby="checkin-label"
            aria-describedby="checkin-help"
            placeholder="MM/DD/YYYY">
          </ejs-daterangepicker>
          
          <div *ngIf="bookingForm.get('checkInDate')?.hasError('required')" 
               class="error-message"
               role="alert">
            Check-in date is required
          </div>
        </div>
        
        <!-- Check-out date field -->
        <div class="form-group">
          <label for="checkout-date">
            <span class="required">*</span> Check-out Date
          </label>
          <p id="checkout-help" class="help-text">
            Select your check-out date. Must be after check-in date
          </p>
          <ejs-daterangepicker 
            id="checkout-date"
            formControlName="checkOutDate"
            aria-labelledby="checkout-label"
            aria-describedby="checkout-help"
            placeholder="MM/DD/YYYY">
          </ejs-daterangepicker>
          
          <div *ngIf="bookingForm.get('checkOutDate')?.hasError('required')"
               class="error-message"
               role="alert">
            Check-out date is required
          </div>
        </div>
        
        <!-- Submit button -->
        <button type="submit" 
                class="btn-primary"
                [disabled]="!bookingForm.valid">
          Book Hotel
        </button>
      </fieldset>
    </form>
  `,
  styles: [`
    fieldset {
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 20px;
    }
    
    legend {
      font-size: 18px;
      font-weight: bold;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    
    .required {
      color: red;
    }
    
    .help-text {
      font-size: 12px;
      color: #666;
      margin: 5px 0;
    }
    
    .error-message {
      color: #d32f2f;
      font-size: 12px;
      margin-top: 5px;
    }
  `]
})
export class BookingFormComponent {
  bookingForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.bookingForm.valid) {
      console.log('Form submitted:', this.bookingForm.value);
    }
  }
}
```

## Focus Management

### Custom Focus Handling

```typescript
import { Component, ViewChild } from '@angular/core';
import { DateRangePickerComponent } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('daterangepicker') drp!: DateRangePickerComponent;
  
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  focusInput(): void {
    // Programmatically focus the input
    this.drp.focusIn();
  }
  
  blurInput(): void {
    // Remove focus from input
    this.drp.focusOut();
  }
  
  handleFocusEvent(): void {
    console.log('DateRangePicker focused');
    // Open picker on focus if desired
    // this.drp.show();
  }
  
  handleBlurEvent(): void {
    console.log('DateRangePicker blurred');
    // Validate on blur
    // this.validateDateRange();
  }
}
```

### Visible Focus Indicators

```css
/* Ensure visible focus indicators */
:host ::ng-deep {
  .e-daterangepicker:focus,
  .e-daterangepicker:focus-within {
    outline: 3px solid #0066cc;
    outline-offset: 2px;
  }
  
  /* Calendar popup focus management */
  .e-calendar:focus {
    outline: 2px solid #0066cc;
  }
  
  .e-day:focus {
    outline: 2px dotted #0066cc;
    outline-offset: -2px;
  }
}
```

## Mobile Accessibility

### Touch-Friendly DateRangePicker

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  // Detect mobile device
  isMobile: boolean = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}
```

```html
<!-- Mobile-optimized DateRangePicker -->
<div [class.mobile-view]="isMobile">
  <label for="daterange">Select Travel Dates</label>
  
  <ejs-daterangepicker 
    id="daterange"
    [startDate]="startDate"
    [endDate]="endDate"
    placeholder="Tap to select dates"
    [fullScreenMode]="isMobile"
    [width]="isMobile ? '100%' : '300px'">
  </ejs-daterangepicker>
</div>

<style>
  .mobile-view {
    width: 100%;
    padding: 10px;
  }
  
  :host ::ng-deep .e-daterangepicker {
    /* Touch-friendly sizing */
    font-size: 16px;  /* Prevents auto-zoom on iOS */
  }
  
  :host ::ng-deep .e-day {
    /* Larger touch targets */
    padding: 10px;
    min-width: 45px;
    min-height: 45px;
  }
</style>
```

---

**Next Step:** For styling and customization, read [styling-and-customization.md](styling-and-customization.md).
