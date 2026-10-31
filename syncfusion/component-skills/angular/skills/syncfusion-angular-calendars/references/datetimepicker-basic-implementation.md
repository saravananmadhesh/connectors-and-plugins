# Basic DatetimePicker Implementation

## Table of Contents
- [Simple Datetime Binding](#simple-datetime-binding)
- [Two-Way Data Binding](#two-way-data-binding)
- [Readonly and Disabled States](#readonly-and-disabled-states)
- [Basic Validation](#basic-validation)
- [Event Handling](#event-handling)
- [ViewChild Component Access](#viewchild-component-access)
- [Common Scenarios](#common-scenarios)

## Simple Datetime Binding

### One-Way Binding (Property Binding)

Display a datetime picker with a default value:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  // Initialize datetime value
  appointmentDateTime: Date = new Date(2026, 2, 24, 14, 30); // Mar 24, 2026 2:30 PM
}
```

```html
<!-- app.component.html -->
<ejs-datetimepicker
  [value]="appointmentDateTime">
</ejs-datetimepicker>
```

### Default Current Date & Time

```typescript
export class AppComponent {
  // Current date and time
  currentDateTime: Date = new Date();
  
  // Specific default
  defaultAppointment: Date = new Date();
  
  constructor() {
    this.defaultAppointment.setHours(10, 0, 0); // 10:00 AM
  }
}
```

```html
<ejs-datetimepicker [value]="currentDateTime"></ejs-datetimepicker>
<ejs-datetimepicker [value]="defaultAppointment"></ejs-datetimepicker>
```

## Two-Way Data Binding

### Using ngModel for Template-Driven Binding

Two-way binding automatically updates the component when the value changes and updates the value when the user selects a new datetime:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  // Display what was selected
  getSelectedDateTime(): string {
    return this.selectedDateTime?.toLocaleString() || 'No selection';
  }
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <!-- Two-way binding with ngModel -->
  <ejs-datetimepicker
    [(ngModel)]="selectedDateTime"
    placeholder="Select date and time">
  </ejs-datetimepicker>
  
  <!-- Displays selected value in real-time -->
  <p>Selected: {{ selectedDateTime | date:'medium' }}</p>
  <p>{{ getSelectedDateTime() }}</p>
</div>
```

**Key Points:**
- `[(ngModel)]` enables two-way binding (banana-in-a-box syntax)
- Value updates in component property whenever user selects
- Value updates in UI whenever component property changes
- Requires `FormsModule` in module imports

### Updating Selection Programmatically

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  // Set to now
  setToNow(): void {
    this.selectedDateTime = new Date();
  }
  
  // Set to tomorrow at 9 AM
  setToTomorrow(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);
    this.selectedDateTime = tomorrow;
  }
  
  // Clear selection
  clearSelection(): void {
    this.selectedDateTime = null;
  }
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime">
</ejs-datetimepicker>

<button (click)="setToNow()">Now</button>
<button (click)="setToTomorrow()">Tomorrow 9 AM</button>
<button (click)="clearSelection()">Clear</button>
```

## Readonly and Disabled States

### Readonly State

In readonly mode, users can only select from the popup calendar/time picker, not type in the input:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  isReadonly: boolean = true;
}
```

```html
<!-- Cannot type, but can select from calendar/time popup -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [readonly]="isReadonly"
  placeholder="Click to select date and time">
</ejs-datetimepicker>

<!-- Toggle readonly -->
<button (click)="isReadonly = !isReadonly">
  Toggle Readonly
</button>
```

### Disabled State

When disabled, the component is completely inactive and cannot be used:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  isDisabled: boolean = false;
}
```

```html
<!-- Component is grayed out and non-interactive -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [enabled]="!isDisabled"
  placeholder="Select date and time">
</ejs-datetimepicker>

<!-- Toggle enabled state -->
<button (click)="isDisabled = !isDisabled">
  {{ isDisabled ? 'Enable' : 'Disable' }}
</button>
```

### Conditional Enable/Disable

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  isProcessing: boolean = false;
  
  submitAppointment(): void {
    this.isProcessing = true;
    
    // Simulate API call
    setTimeout(() => {
      console.log('Appointment submitted:', this.selectedDateTime);
      this.isProcessing = false;
    }, 2000);
  }
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [enabled]="!isProcessing">
</ejs-datetimepicker>

<button
  (click)="submitAppointment()"
  [disabled]="isProcessing">
  {{ isProcessing ? 'Submitting...' : 'Submit Appointment' }}
</button>
```

## Basic Validation

### Required Field Validation

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class AppComponent {
  appointmentForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      appointmentDateTime: [
        new Date(),
        Validators.required // DateTime is required
      ]
    });
  }
  
  submitForm(): void {
    if (this.appointmentForm.valid) {
      const selectedDateTime = this.appointmentForm.get('appointmentDateTime')?.value;
      console.log('Valid appointment:', selectedDateTime);
    } else {
      console.log('Form is invalid');
    }
  }
}
```

```html
<form [formGroup]="appointmentForm">
  <ejs-datetimepicker
    formControlName="appointmentDateTime"
    placeholder="Select date and time">
  </ejs-datetimepicker>
  
  <!-- Show error if field is empty and touched -->
  <span *ngIf="
    appointmentForm.get('appointmentDateTime')?.invalid &&
    appointmentForm.get('appointmentDateTime')?.touched"
    style="color: red;">
    Date and time are required
  </span>
  
  <button
    (click)="submitForm()"
    [disabled]="appointmentForm.invalid">
    Submit
  </button>
</form>
```

### Min/Max Date Validation

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  // Only allow dates in the current week
  minDateTime: Date = new Date();
  maxDateTime: Date = new Date();
  
  constructor() {
    // Min: today at 9 AM
    this.minDateTime.setHours(9, 0, 0, 0);
    
    // Max: 7 days from now at 5 PM
    this.maxDateTime.setDate(this.maxDateTime.getDate() + 7);
    this.maxDateTime.setHours(17, 0, 0, 0);
  }
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [min]="minDateTime"
  [max]="maxDateTime"
  placeholder="Select within this week, 9 AM - 5 PM">
</ejs-datetimepicker>

<p style="font-size: 12px; color: #666;">
  Valid range: {{ minDateTime | date:'medium' }} to
  {{ maxDateTime | date:'medium' }}
</p>
```

### Custom Validation

```typescript
export class AppComponent {
  appointmentForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      appointmentDateTime: [
        new Date(),
        [
          Validators.required,
          this.notWeekendValidator.bind(this),
          this.notInPastValidator.bind(this)
        ]
      ]
    });
  }
  
  // Custom validator: disallow weekends
  notWeekendValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const date = new Date(control.value);
    const day = date.getDay();
    
    // 0 = Sunday, 6 = Saturday
    if (day === 0 || day === 6) {
      return { weekend: true };
    }
    
    return null;
  }
  
  // Custom validator: disallow past dates
  notInPastValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const selectedDate = new Date(control.value);
    const now = new Date();
    
    if (selectedDate < now) {
      return { pastDate: true };
    }
    
    return null;
  }
  
  getErrorMessage(): string {
    const control = this.appointmentForm.get('appointmentDateTime');
    
    if (control?.hasError('required')) {
      return 'Date and time are required';
    }
    if (control?.hasError('weekend')) {
      return 'Appointments cannot be on weekends';
    }
    if (control?.hasError('pastDate')) {
      return 'Appointment must be in the future';
    }
    
    return '';
  }
}
```

```html
<form [formGroup]="appointmentForm">
  <ejs-datetimepicker
    formControlName="appointmentDateTime"
    placeholder="Select future weekday date and time">
  </ejs-datetimepicker>
  
  <span *ngIf="appointmentForm.get('appointmentDateTime')?.invalid"
    style="color: red; font-size: 12px;">
    {{ getErrorMessage() }}
  </span>
</form>
```

## Event Handling

### Change Event

The change event fires when the user selects a new datetime:

```typescript
import { Component } from '@angular/core';
import { ChangedEventArgs } from '@syncfusion/ej2-datetimepickers';

export class AppComponent {
  selectedDateTime: Date = new Date();
  
  onDateTimeChange(args: ChangedEventArgs): void {
    console.log('New value:', args.value);
    console.log('Previous value:', args.previousValue);
    console.log('Event type:', args.type); // 'change' for user selection
  }
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  (change)="onDateTimeChange($event)">
</ejs-datetimepicker>
```

### Focus and Blur Events

```typescript
export class AppComponent {
  isFocused: boolean = false;
  
  onFocus(): void {
    this.isFocused = true;
    console.log('DatetimePicker focused');
  }
  
  onBlur(): void {
    this.isFocused = false;
    console.log('DatetimePicker blurred');
  }
}
```

```html
<ejs-datetimepicker
  (focus)="onFocus()"
  (blur)="onBlur()"
  placeholder="Click to focus">
</ejs-datetimepicker>

<p [style.color]="isFocused ? 'green' : 'gray'">
  {{ isFocused ? 'Focused' : 'Not focused' }}
</p>
```

### Open and Close Events

```typescript
export class AppComponent {
  isPopupOpen: boolean = false;
  
  onPopupOpen(): void {
    this.isPopupOpen = true;
    console.log('Popup calendar and time picker opened');
  }
  
  onPopupClose(): void {
    this.isPopupOpen = false;
    console.log('Popup calendar and time picker closed');
  }
}
```

```html
<ejs-datetimepicker
  (open)="onPopupOpen()"
  (close)="onPopupClose()">
</ejs-datetimepicker>

<p>Popup is {{ isPopupOpen ? 'open' : 'closed' }}</p>
```

## ViewChild Component Access

### Direct Component Access

Access the DatetimePicker component instance for programmatic control:

```typescript
import { Component, ViewChild } from '@angular/core';
import { DateTimePickerComponent } from '@syncfusion/ej2-angular-datetimepickers';

export class AppComponent {
  @ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;
  
  getCurrentView(): void {
    // Get current calendar view (Month, Year, or Decade)
    const view = this.datetimeInstance.currentView();
    console.log('Current view:', view);
  }
  
  navigateToYear(): void {
    // Navigate to Year view
    this.datetimeInstance.navigateTo('Year', new Date());
  }
  
  setFocus(): void {
    // Focus the input
    this.datetimeInstance.focusIn();
  }
  
  removeFocus(): void {
    // Remove focus
    this.datetimeInstance.focusOut();
  }
  
  clearComponent(): void {
    // Destroy and clean up
    this.datetimeInstance.destroy();
  }
}
```

```html
<ejs-datetimepicker
  #datetimeRef
  placeholder="Select date and time">
</ejs-datetimepicker>

<button (click)="getCurrentView()">Get Current View</button>
<button (click)="navigateToYear()">Go to Year View</button>
<button (click)="setFocus()">Focus</button>
<button (click)="removeFocus()">Blur</button>
<button (click)="clearComponent()">Destroy</button>
```

## Common Scenarios

### Appointment Booking

```typescript
export class AppointmentComponent {
  appointmentDateTime: Date;
  appointmentDuration: number = 30; // minutes
  description: string;
  
  bookAppointment(): void {
    const endTime = new Date(this.appointmentDateTime);
    endTime.setMinutes(endTime.getMinutes() + this.appointmentDuration);
    
    const appointment = {
      start: this.appointmentDateTime,
      end: endTime,
      description: this.description
    };
    
    console.log('Booking appointment:', appointment);
  }
}
```

```html
<div>
  <h3>Book an Appointment</h3>
  
  <ejs-datetimepicker
    [(ngModel)]="appointmentDateTime"
    placeholder="Select appointment date and time">
  </ejs-datetimepicker>
  
  <input
    type="number"
    [(ngModel)]="appointmentDuration"
    min="15"
    max="240"
    step="15"
    placeholder="Duration (minutes)">
  
  <input
    type="text"
    [(ngModel)]="description"
    placeholder="Appointment description">
  
  <button (click)="bookAppointment()">Book</button>
</div>
```

### Meeting Scheduler

```typescript
export class MeetingComponent {
  meetingStart: Date;
  meetingEnd: Date;
  attendees: string[] = [];
  
  onStartChange(args: ChangedEventArgs): void {
    // Auto-set end time to 1 hour after start
    this.meetingStart = args.value as Date;
    this.meetingEnd = new Date(this.meetingStart);
    this.meetingEnd.setHours(this.meetingEnd.getHours() + 1);
  }
}
```

```html
<div>
  <label>Meeting Start:</label>
  <ejs-datetimepicker
    [(ngModel)]="meetingStart"
    (change)="onStartChange($event)"
    placeholder="Select start time">
  </ejs-datetimepicker>
  
  <label>Meeting End:</label>
  <ejs-datetimepicker
    [(ngModel)]="meetingEnd"
    [min]="meetingStart"
    placeholder="Select end time">
  </ejs-datetimepicker>
</div>
```

### Form with Multiple Datetimepickers

```typescript
export class ReservationComponent {
  checkInDateTime: Date = new Date();
  checkOutDateTime: Date;
  
  constructor() {
    // Check-out is 3 days after check-in
    this.checkOutDateTime = new Date(this.checkInDateTime);
    this.checkOutDateTime.setDate(this.checkOutDateTime.getDate() + 3);
  }
  
  onCheckInChange(args: ChangedEventArgs): void {
    const newCheckIn = args.value as Date;
    
    // Update checkout minimum to be at least 1 day after check-in
    const newCheckOut = new Date(newCheckIn);
    newCheckOut.setDate(newCheckOut.getDate() + 1);
    this.checkOutDateTime = newCheckOut;
  }
}
```

```html
<form>
  <div>
    <label>Check-in Date & Time:</label>
    <ejs-datetimepicker
      [(ngModel)]="checkInDateTime"
      (change)="onCheckInChange($event)"
      placeholder="Select check-in">
    </ejs-datetimepicker>
  </div>
  
  <div>
    <label>Check-out Date & Time:</label>
    <ejs-datetimepicker
      [(ngModel)]="checkOutDateTime"
      [min]="checkInDateTime"
      placeholder="Select check-out">
    </ejs-datetimepicker>
  </div>
</form>
```
