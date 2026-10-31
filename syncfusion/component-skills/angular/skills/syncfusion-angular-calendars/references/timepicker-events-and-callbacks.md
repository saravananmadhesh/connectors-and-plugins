# Events and Callbacks

## Table of Contents
- [Change Event](#change-event)
- [Focus and Blur Events](#focus-and-blur-events)
- [Popup Events](#popup-events)
- [Lifecycle Events](#lifecycle-events)
- [Cleared Event](#cleared-event)
- [ItemRender Event](#itemrender-event)
- [Event Subscription Patterns](#event-subscription-patterns)
- [Error Handling in Events](#error-handling-in-events)

## Change Event

Triggers when the selected time changes:

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { ChangeEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  
  onTimeChange(args: ChangeEventArgs): void {
    console.log('Selected Value:', args.value);      // Date object
    console.log('Selected Text:', args.text);        // Time as formatted string
    console.log('Is User Interaction:', args.isInteracted);  // true if user-initiated
    console.log('Event Object:', args);              // Full event object
    
    // Additional logic
    if (args.value) {
      const selectedDate = args.value;
      console.log('Time:', selectedDate.toLocaleTimeString());
    }
  }
  
  onTimeSelection(args: ChangeEventArgs): void {
    // Log time selection for analytics
    if (args.value) {
      const time = args.value.toLocaleTimeString();
      console.log(`User selected: ${time}`);
      console.log(`Selected text: ${args.text}`);
      // Send to analytics service
      // this.analyticsService.logTimeSelection(time);
    }
  }
}
```

```html
<!-- app.component.html -->
<ejs-timepicker
  [(ngModel)]="selectedTime"
  (change)="onTimeChange($event)"
  placeholder="Select time">
</ejs-timepicker>
```

### Change Event Use Cases

- **Form Validation:** Validate time constraints
- **Analytics:** Track user selections
- **Dependent Fields:** Update other form fields based on time
- **Preview:** Show formatted time to user

## Focus and Blur Events

Handle input focus and blur states:

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { FocusEventArgs, BlurEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  isFocused: boolean = false;
  focusCount: number = 0;
  blurCount: number = 0;
  
  onInputFocus(args: FocusEventArgs): void {
    this.isFocused = true;
    this.focusCount++;
    console.log('Focus event:', args);
    console.log('Focus triggered count:', this.focusCount);
    
    // Add visual indicator
    // this.highlightField();
  }
  
  onInputBlur(args: BlurEventArgs): void {
    this.isFocused = false;
    this.blurCount++;
    console.log('Blur event:', args);
    console.log('Blur triggered count:', this.blurCount);
    
    // Validate on blur
    // this.validateTime();
  }
}
```

```html
<!-- app.component.html -->
<div>
  <ejs-timepicker
    [(ngModel)]="selectedTime"
    (focus)="onInputFocus($event)"
    (blur)="onInputBlur($event)"
    [style.border]="isFocused ? '2px solid blue' : '1px solid gray'"
    placeholder="Click to select time">
  </ejs-timepicker>
  
  <p>Focused: {{ isFocused ? 'Yes' : 'No' }}</p>
  <p>Focus Count: {{ focusCount }} | Blur Count: {{ blurCount }}</p>
</div>
```

### Focus/Blur Use Cases

- **Visual Feedback:** Highlight input when focused
- **Validation Timing:** Validate on blur instead of on change
- **Analytics:** Track user interaction patterns
- **Auto-save:** Save form on blur

## Popup Events

Handle time picker popup open/close:

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { PopupEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  isPopupOpen: boolean = false;
  popupOpenCount: number = 0;
  lastOpenTime: Date | null = null;
  
  onPopupOpen(args: PopupEventArgs): void {
    this.isPopupOpen = true;
    this.popupOpenCount++;
    this.lastOpenTime = new Date();
    
    console.log('Popup opened');
    console.log('Open count:', this.popupOpenCount);
    console.log('Event:', args);
    
    // Customize popup behavior
    // this.loadAvailableTimes();
    // this.trackUserInteraction('popup_opened');
  }
  
  onPopupClose(args: PopupEventArgs): void {
    this.isPopupOpen = false;
    console.log('Popup closed');
    console.log('Event:', args);
    
    // Handle after popup closes
    // this.validateFinalSelection();
  }
}
```

```html
<!-- app.component.html -->
<div>
  <ejs-timepicker
    [(ngModel)]="selectedTime"
    (open)="onPopupOpen($event)"
    (close)="onPopupClose($event)"
    placeholder="Click to open">
  </ejs-timepicker>
  
  <div style="margin-top: 15px; padding: 10px; background-color: #f0f0f0;">
    <p>Popup is: {{ isPopupOpen ? 'OPEN' : 'CLOSED' }}</p>
    <p>Times Opened: {{ popupOpenCount }}</p>
    <p *ngIf="lastOpenTime">Last Opened: {{ lastOpenTime | date:'medium' }}</p>
  </div>
</div>
```

### Popup Event Use Cases

- **Analytics:** Track how often popup is opened
- **Performance:** Load data only when popup opens
- **Validation:** Check constraints before closing
- **Auto-close:** Close popup after selection

## Lifecycle Events

Handle component creation and destruction:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  componentStatus: string = 'Not Created';
  
  onComponentCreated(): void {
    this.componentStatus = 'Created';
    console.log('TimePicker component created');
    
    // Initialize subscriptions
    // Initialize event listeners
    // Load default values
  }
  
  onComponentDestroyed(): void {
    this.componentStatus = 'Destroyed';
    console.log('TimePicker component destroyed');
    
    // Cleanup subscriptions
    // Remove event listeners
    // Clear resources
  }
}
```

```html
<!-- app.component.html -->
<div>
  <ejs-timepicker
    [(ngModel)]="selectedTime"
    (created)="onComponentCreated()"
    (destroyed)="onComponentDestroyed()"
    placeholder="Select time">
  </ejs-timepicker>
  
  <p>Component Status: {{ componentStatus }}</p>
</div>
```

### Lifecycle Use Cases

- **Created:** Initialize plugins, load configuration
- **Destroyed:** Cleanup resources, unsubscribe from observables

## Cleared Event

Triggers when the clear button is clicked:

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { ClearedEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  clearCount: number = 0;
  lastClearedTime: Date | null = null;
  
  onCleared(args: ClearedEventArgs): void {
    this.clearCount++;
    this.lastClearedTime = new Date();
    console.log('Time cleared');
    console.log('Clear count:', this.clearCount);
    console.log('Event:', args);
    
    // Respond to clear
    // this.resetRelatedFields();
    // this.trackUserAction('time_cleared');
  }
}
```

```html
<!-- app.component.html -->
<div>
  <ejs-timepicker
    [(ngModel)]="selectedTime"
    (cleared)="onCleared($event)"
    [showClearButton]="true"
    placeholder="Select time">
  </ejs-timepicker>
  
  <div style="margin-top: 15px;">
    <p>Clear Button Clicks: {{ clearCount }}</p>
    <p *ngIf="lastClearedTime">Last Cleared: {{ lastClearedTime | date:'medium' }}</p>
  </div>
</div>
```

### Cleared Event Use Cases

- **Reset Form:** Clear related fields
- **Analytics:** Track clear button usage
- **Validation:** Re-trigger validation after clear
- **Conditional Display:** Hide dependent content

## ItemRender Event

Customize each time item in the popup list:

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { ItemEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  minTime: Date = new Date(2026, 2, 24, 9, 0);
  maxTime: Date = new Date(2026, 2, 24, 17, 0);
  bookedTimes: Date[] = [
    new Date(2026, 2, 24, 10, 0),
    new Date(2026, 2, 24, 14, 30)
  ];
  
  onItemRender(args: ItemEventArgs): void {
    const itemTime = args.element.textContent || '';
    
    // Check if time is booked
    const isBooked = this.bookedTimes.some(booked => 
      booked.toLocaleTimeString().includes(itemTime.slice(0, 5))
    );
    
    if (isBooked) {
      // Add custom class or styling
      args.element.classList.add('booked-time');
      args.element.setAttribute('title', 'This time slot is already booked');
      args.element.style.opacity = '0.5';
      args.element.style.textDecoration = 'line-through';
    }
    
    // Highlight peak hours
    if (itemTime.includes('12') || itemTime.includes('1:')) {
      args.element.classList.add('peak-hour');
      args.element.style.fontWeight = 'bold';
      args.element.style.backgroundColor = '#fff3cd';
    }
  }
}
```

```html
<!-- app.component.html -->
<div>
  <ejs-timepicker
    [(ngModel)]="selectedTime"
    [min]="minTime"
    [max]="maxTime"
    (itemRender)="onItemRender($event)"
    format="hh:mm a"
    placeholder="Select time">
  </ejs-timepicker>
  
  <p style="color: #999; font-size: 12px;">
    Booked times shown in gray with strikethrough. Peak hours highlighted in yellow.
  </p>
</div>
```

```css
/* app.component.css */
:host ::ng-deep .booked-time {
  color: #999;
}

:host ::ng-deep .peak-hour {
  background-color: #fff3cd !important;
}
```

### ItemRender Use Cases

- **Availability Status:** Show booked/available indicators
- **Pricing Tiers:** Highlight premium time slots
- **Recommendations:** Suggest optimal times
- **Visual Distinction:** Color-code time categories

## Event Subscription Patterns

### Pattern 1: Multiple Event Handlers

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  eventLog: string[] = [];
  
  onTimeChange(): void {
    this.eventLog.push('Changed at ' + new Date().toLocaleTimeString());
  }
  
  onPopupOpen(): void {
    this.eventLog.push('Opened at ' + new Date().toLocaleTimeString());
  }
  
  onPopupClose(): void {
    this.eventLog.push('Closed at ' + new Date().toLocaleTimeString());
  }
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  (change)="onTimeChange()"
  (open)="onPopupOpen()"
  (close)="onPopupClose()">
</ejs-timepicker>

<div style="max-height: 200px; overflow-y: auto; border: 1px solid #ccc; padding: 10px;">
  <div *ngFor="let event of eventLog">{{ event }}</div>
</div>
```

### Pattern 2: Event Delegation

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  
  handleTimePickerEvent(eventName: string, args: any): void {
    switch(eventName) {
      case 'change':
        console.log('Time changed:', args.value);
        break;
      case 'open':
        console.log('Popup opened');
        break;
      case 'close':
        console.log('Popup closed');
        break;
    }
  }
}
```

## Error Handling in Events

### Handle Invalid Input

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { ChangeEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  minTime: Date = new Date(2026, 2, 24, 9, 0);
  maxTime: Date = new Date(2026, 2, 24, 17, 0);
  validationError: string = '';
  
  onTimeChange(args: ChangeEventArgs): void {
    try {
      if (!args.value) {
        this.validationError = 'Time is required';
        return;
      }
      
      const selectedTime = args.value;
      
      // Check min/max
      if (selectedTime < this.minTime) {
        this.validationError = 'Time is before business hours (9 AM)';
        return;
      }
      
      if (selectedTime > this.maxTime) {
        this.validationError = 'Time is after business hours (5 PM)';
        return;
      }
      
      this.validationError = '';
      console.log('Valid time selected:', selectedTime);
      
    } catch (error) {
      this.validationError = 'An error occurred: ' + (error as Error).message;
      console.error('Error in time change handler:', error);
    }
  }
}
```

```html
<!-- app.component.html -->
<div>
  <ejs-timepicker
    [(ngModel)]="selectedTime"
    [min]="minTime"
    [max]="maxTime"
    (change)="onTimeChange($event)"
    format="hh:mm a">
  </ejs-timepicker>
  
  <p *ngIf="validationError" style="color: red;">
    ⚠️ {{ validationError }}
  </p>
  <p *ngIf="!validationError && selectedTime" style="color: green;">
    ✓ Valid time selected: {{ selectedTime | date:'shortTime' }}
  </p>
</div>
```

### Complete Event Flow Example

```typescript
export class AppComponent {
  selectedTime: Date | null = null;
  eventSequence: string[] = [];
  
  logEvent(eventName: string): void {
    this.eventSequence.push(`${new Date().toLocaleTimeString()} - ${eventName}`);
  }
  
  onCreated(): void {
    this.logEvent('Created');
  }
  
  onFocus(): void {
    this.logEvent('Focus');
  }
  
  onOpen(): void {
    this.logEvent('Open');
  }
  
  onChange(args: ChangeEventArgs): void {
    this.logEvent(`Change (${args.value ? args.value.toLocaleTimeString() : args.text})`);
  }
  
  onClose(): void {
    this.logEvent('Close');
  }
  
  onBlur(): void {
    this.logEvent('Blur');
  }
  
  clearLog(): void {
    this.eventSequence = [];
  }
}
```

```html
<div>
  <ejs-timepicker
    [(ngModel)]="selectedTime"
    (created)="onCreated()"
    (focus)="onFocus()"
    (open)="onOpen()"
    (change)="onChange($event)"
    (close)="onClose()"
    (blur)="onBlur()">
  </ejs-timepicker>
  
  <div style="margin-top: 20px;">
    <h4>Event Sequence:</h4>
    <div style="border: 1px solid #ccc; padding: 10px; max-height: 200px; overflow-y: auto;">
      <div *ngFor="let event of eventSequence" style="font-family: monospace; font-size: 12px;">
        {{ event }}
      </div>
    </div>
    <button (click)="clearLog()">Clear Log</button>
  </div>
</div>
```
