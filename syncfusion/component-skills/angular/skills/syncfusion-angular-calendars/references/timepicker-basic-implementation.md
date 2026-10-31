# Basic Implementation of TimePicker

## Table of Contents
- [Simple Time Picker](#simple-time-picker)
- [Two-Way Data Binding](#two-way-data-binding)
- [Readonly and Disabled States](#readonly-and-disabled-states)
- [Basic Constraints](#basic-constraints)
- [Event Handling](#event-handling)
- [ViewChild Component Access](#viewchild-component-access)
- [Output Formatting and Display](#output-formatting-and-display)
- [Common Implementation Patterns](#common-implementation-patterns)

## Simple Time Picker

The simplest way to create a TimePicker is with just the component selector:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  // Empty component - uses defaults
}
```

```html
<!-- app.component.html -->
<ejs-timepicker></ejs-timepicker>
```

This creates a TimePicker with:
- Current system time as default
- 30-minute intervals
- 12-hour format with AM/PM
- No min/max constraints

## Two-Way Data Binding

Use `[(ngModel)]` for two-way binding with a time value:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Initialize with current time
  selectedTime: Date = new Date();
  
  // Or initialize with specific time
  appointmentTime: Date = new Date(2026, 2, 24, 14, 30, 0);  // 2:30 PM
  
  // Or initialize as null
  optionalTime: Date | null = null;
}
```

```html
<!-- app.component.html -->
<div>
  <h3>Time Selection</h3>
  
  <!-- Simple binding -->
  <ejs-timepicker [(ngModel)]="selectedTime"></ejs-timepicker>
  
  <!-- Display selected value -->
  <p *ngIf="selectedTime">
    You selected: {{ selectedTime | date:'shortTime' }}
  </p>
  
  <!-- Another instance -->
  <ejs-timepicker [(ngModel)]="appointmentTime"></ejs-timepicker>
  <p>Appointment at: {{ appointmentTime | date:'medium' }}</p>
  
  <!-- Nullable time -->
  <ejs-timepicker [(ngModel)]="optionalTime"></ejs-timepicker>
  <p *ngIf="optionalTime">
    Optional time selected: {{ optionalTime | date:'shortTime' }}
  </p>
  <p *ngIf="!optionalTime">No time selected</p>
</div>
```

## Readonly and Disabled States

Control user interaction with readonly and disabled properties:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date(2026, 2, 24, 10, 0);
  isReadonly: boolean = false;
  isDisabled: boolean = false;
  isEditable: boolean = true;
  
  toggleReadonly(): void {
    this.isReadonly = !this.isReadonly;
  }
  
  toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
  }
  
  toggleEditable(): void {
    this.isEditable = !this.isEditable;
  }
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <!-- Readonly TimePicker -->
  <div>
    <label>Readonly (can select from popup, cannot type):</label>
    <ejs-timepicker
      [(ngModel)]="selectedTime"
      [readonly]="isReadonly">
    </ejs-timepicker>
    <button (click)="toggleReadonly()">
      {{ isReadonly ? 'Enable' : 'Disable' }} Readonly
    </button>
  </div>
  
  <!-- Disabled TimePicker -->
  <div style="margin-top: 20px;">
    <label>Disabled (fully disabled):</label>
    <ejs-timepicker
      [(ngModel)]="selectedTime"
      [enabled]="!isDisabled">
    </ejs-timepicker>
    <button (click)="toggleDisabled()">
      {{ isDisabled ? 'Enable' : 'Disable' }} Component
    </button>
  </div>
  
  <!-- AllowEdit property -->
  <div style="margin-top: 20px;">
    <label>Allow Edit (can type in input):</label>
    <ejs-timepicker
      [(ngModel)]="selectedTime"
      [allowEdit]="isEditable">
    </ejs-timepicker>
    <button (click)="toggleEditable()">
      {{ isEditable ? 'Disable' : 'Enable' }} Editing
    </button>
  </div>
</div>
```

**Key Differences:**
- **readonly:** User can select from popup but cannot type in input
- **enabled (false):** Component is completely disabled and grayed out
- **allowEdit (false):** User can only select from popup, cannot edit input

## Basic Constraints

Apply min/max time constraints to restrict selectable times:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  
  // Business hours
  minTime: Date = new Date(2026, 2, 24, 9, 0, 0);    // 9:00 AM
  maxTime: Date = new Date(2026, 2, 24, 17, 0, 0);   // 5:00 PM
  
  // Medical office hours
  medicalMinTime: Date = new Date(2026, 2, 24, 8, 30, 0);   // 8:30 AM
  medicalMaxTime: Date = new Date(2026, 2, 24, 16, 30, 0);  // 4:30 PM
  
  // 24-hour constraint
  dayMinTime: Date = new Date(2026, 2, 24, 0, 0, 0);        // 12:00 AM
  dayMaxTime: Date = new Date(2026, 2, 24, 23, 59, 59);     // 11:59 PM
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <!-- Business hours only -->
  <div>
    <label>Business Hours (9 AM - 5 PM):</label>
    <ejs-timepicker
      [(ngModel)]="selectedTime"
      [min]="minTime"
      [max]="maxTime"
      format="hh:mm a">
    </ejs-timepicker>
  </div>
  
  <!-- Medical office hours -->
  <div style="margin-top: 20px;">
    <label>Medical Office (8:30 AM - 4:30 PM):</label>
    <ejs-timepicker
      [(ngModel)]="selectedTime"
      [min]="medicalMinTime"
      [max]="medicalMaxTime"
      format="hh:mm a">
    </ejs-timepicker>
  </div>
  
  <!-- Full day -->
  <div style="margin-top: 20px;">
    <label>Full Day (24 hours):</label>
    <ejs-timepicker
      [(ngModel)]="selectedTime"
      [min]="dayMinTime"
      [max]="dayMaxTime"
      format="HH:mm">
    </ejs-timepicker>
  </div>
</div>
```

## Event Handling

Respond to user interactions with events:

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { ChangeEventArgs, FocusEventArgs, BlurEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  eventLog: string[] = [];
  
  onTimeChange(args: ChangeEventArgs): void {
    const time = args.value ? args.value.toLocaleTimeString() : args.text;
    this.eventLog.push(`Changed to: ${time}`);
    console.log('Time changed:', args.value);
    console.log('Time text:', args.text);
  }
  
  onTimeFocus(args: FocusEventArgs): void {
    this.eventLog.push('TimePicker focused');
    console.log('Focus event:', args);
  }
  
  onTimeBlur(args: BlurEventArgs): void {
    this.eventLog.push('TimePicker blurred');
    console.log('Blur event:', args);
  }
  
  onPopupOpen(): void {
    this.eventLog.push('Popup opened');
    console.log('Popup opened');
  }
  
  onPopupClose(): void {
    this.eventLog.push('Popup closed');
    console.log('Popup closed');
  }
  
  onCreated(): void {
    this.eventLog.push('TimePicker created');
    console.log('Component created');
  }
  
  clearLog(): void {
    this.eventLog = [];
  }
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <ejs-timepicker
    [(ngModel)]="selectedTime"
    (change)="onTimeChange($event)"
    (focus)="onTimeFocus($event)"
    (blur)="onTimeBlur($event)"
    (open)="onPopupOpen()"
    (close)="onPopupClose()"
    (created)="onCreated()"
    placeholder="Select a time">
  </ejs-timepicker>
  
  <div style="margin-top: 20px; padding: 10px; background-color: #f0f0f0; border-radius: 4px;">
    <h4>Event Log:</h4>
    <ul style="max-height: 200px; overflow-y: auto;">
      <li *ngFor="let event of eventLog">{{ event }}</li>
    </ul>
    <button (click)="clearLog()">Clear Log</button>
  </div>
</div>
```

## ViewChild Component Access

Access the TimePicker component programmatically using ViewChild:

```typescript
// app.component.ts
import { Component, ViewChild } from '@angular/core';
import { TimePickerComponent } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('timePickerRef') timePickerInstance!: TimePickerComponent;
  
  selectedTime: Date = new Date();
  
  openTimePicker(): void {
    // Show the time picker popup
    this.timePickerInstance.show();
  }
  
  closeTimePicker(): void {
    // Hide the time picker popup
    this.timePickerInstance.hide();
  }
  
  focusTimePicker(): void {
    // Focus the input
    this.timePickerInstance.focusIn();
  }
  
  blurTimePicker(): void {
    // Remove focus from input
    this.timePickerInstance.focusOut();
  }
  
  getCurrentValue(): void {
    // Get current value
    const time = this.timePickerInstance.value;
    console.log('Current time:', time);
    alert('Current time: ' + (time ? time.toLocaleTimeString() : 'No time selected'));
  }
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <ejs-timepicker
    #timePickerRef
    [(ngModel)]="selectedTime">
  </ejs-timepicker>
  
  <div style="margin-top: 20px;">
    <button (click)="openTimePicker()">Open TimePicker</button>
    <button (click)="closeTimePicker()">Close TimePicker</button>
    <button (click)="focusTimePicker()">Focus Input</button>
    <button (click)="blurTimePicker()">Blur Input</button>
    <button (click)="getCurrentValue()">Get Value</button>
  </div>
</div>
```

## Output Formatting and Display

Format and display the selected time in various ways:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date(2026, 2, 24, 14, 30, 45);
  
  getTimeString(): string {
    if (!this.selectedTime) return 'No time selected';
    return this.selectedTime.toLocaleTimeString();
  }
  
  getHours(): number {
    return this.selectedTime ? this.selectedTime.getHours() : 0;
  }
  
  getMinutes(): number {
    return this.selectedTime ? this.selectedTime.getMinutes() : 0;
  }
  
  getSeconds(): number {
    return this.selectedTime ? this.selectedTime.getSeconds() : 0;
  }
  
  get12HourFormat(): string {
    if (!this.selectedTime) return '';
    return this.selectedTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  }
  
  get24HourFormat(): string {
    if (!this.selectedTime) return '';
    return this.selectedTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  }
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <ejs-timepicker [(ngModel)]="selectedTime"></ejs-timepicker>
  
  <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 4px;">
    <h3>Time Display Formats:</h3>
    
    <p><strong>Default Angular Format:</strong> {{ selectedTime | date:'shortTime' }}</p>
    <p><strong>Medium Format:</strong> {{ selectedTime | date:'medium' }}</p>
    <p><strong>Long Format:</strong> {{ selectedTime | date:'long' }}</p>
    <p><strong>Custom Format (HH:mm:ss):</strong> {{ selectedTime | date:'HH:mm:ss' }}</p>
    
    <p><strong>12-Hour Format:</strong> {{ get12HourFormat() }}</p>
    <p><strong>24-Hour Format:</strong> {{ get24HourFormat() }}</p>
    
    <p><strong>Component Value:</strong> {{ getTimeString() }}</p>
    <p><strong>Hours:</strong> {{ getHours() }} | <strong>Minutes:</strong> {{ getMinutes() }} | <strong>Seconds:</strong> {{ getSeconds() }}</p>
  </div>
</div>
```

## Common Implementation Patterns

### Pattern 1: Time Slot Selection

Allow users to select from predefined time slots:

```typescript
export class AppComponent {
  selectedTime: Date;
  timeSlots: Date[] = [
    new Date(2026, 2, 24, 9, 0),
    new Date(2026, 2, 24, 10, 0),
    new Date(2026, 2, 24, 11, 0),
    new Date(2026, 2, 24, 14, 0),
    new Date(2026, 2, 24, 15, 0),
    new Date(2026, 2, 24, 16, 0)
  ];
  
  selectSlot(slot: Date): void {
    this.selectedTime = slot;
  }
}
```

```html
<div>
  <ejs-timepicker [(ngModel)]="selectedTime" format="hh:mm a"></ejs-timepicker>
  
  <div>
    <h4>Quick Select:</h4>
    <button *ngFor="let slot of timeSlots" (click)="selectSlot(slot)">
      {{ slot | date:'shortTime' }}
    </button>
  </div>
</div>
```

### Pattern 2: Default Time Based on Hour

Set a default time based on current hour:

```typescript
export class AppComponent {
  selectedTime: Date;
  
  constructor() {
    // Set default to next hour
    const now = new Date();
    this.selectedTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0);
  }
}
```

### Pattern 3: Time Validation

Validate selected time against constraints:

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  minTime: Date = new Date(2026, 2, 24, 9, 0);
  maxTime: Date = new Date(2026, 2, 24, 17, 0);
  
  isTimeValid(): boolean {
    if (!this.selectedTime) return false;
    return this.selectedTime >= this.minTime && this.selectedTime <= this.maxTime;
  }
  
  getValidationMessage(): string {
    if (!this.selectedTime) return 'Please select a time';
    if (!this.isTimeValid()) return 'Selected time is outside business hours';
    return 'Time is valid';
  }
}
```

```html
<div>
  <ejs-timepicker [(ngModel)]="selectedTime"></ejs-timepicker>
  
  <p [style.color]="isTimeValid() ? 'green' : 'red'">
    {{ getValidationMessage() }}
  </p>
</div>
```
