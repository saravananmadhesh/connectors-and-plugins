# Events & Methods

## Table of Contents
- [Overview](#overview)
- [Event Handlers](#event-handlers)
- [Range Selection Events](#range-selection-events)
- [Lifecycle Events](#lifecycle-events)
- [UI State Events](#ui-state-events)
- [Component Methods](#component-methods)
- [Event Payload Structures](#event-payload-structures)

## Overview

DateRangePicker provides comprehensive event handling for user interactions and lifecycle management, plus methods for programmatic control.

**Event Types:**
- **Selection Events:** change, select
- **Lifecycle Events:** created, destroyed
- **UI Events:** open, close
- **Render Events:** renderDayCell
- **Navigation Events:** navigated
- **Focus Events:** blur, focus
- **Clear Events:** cleared

## Event Handlers

### Binding Events in Template

```html
<!-- Event binding syntax -->
<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  (created)="onCreated($event)"
  (change)="onChange($event)"
  (select)="onSelect($event)"
  (open)="onOpen($event)"
  (close)="onClose($event)"
  (navigated)="onNavigated($event)"
  (blur)="onBlur($event)"
  (focus)="onFocus($event)"
  (cleared)="onCleared($event)"
  (destroyed)="onDestroyed($event)"
  (renderDayCell)="onRenderDayCell($event)">
</ejs-daterangepicker>
```

## Range Selection Events

### Change Event (Most Common)

Fires when the date range changes:

```typescript
import { Component } from '@angular/core';
import { RangeEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  startDate: Date = new Date();
  endDate: Date = new Date();
  changeLog: string = '';
  
  onChangeEvent(args: RangeEventArgs): void {
    console.log('Change Event:');
    console.log('  Start Date:', args.startDate);
    console.log('  End Date:', args.endDate);
    console.log('  Day Span:', args.daySpan);
    console.log('  Event Type:', args.type);
    console.log('  Is Interacted:', args.isInteracted);
    
    // Update UI with change info
    const startStr = (args.startDate as Date).toLocaleDateString();
    const endStr = (args.endDate as Date).toLocaleDateString();
    this.changeLog = `Range changed: ${startStr} to ${endStr}`;
  }
}
```

```html
<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  (change)="onChangeEvent($event)">
</ejs-daterangepicker>

<p *ngIf="changeLog">{{ changeLog }}</p>
```

**RangeEventArgs Properties:**
- `startDate`: Date - Start date of range
- `endDate`: Date - End date of range
- `daySpan`: number - Number of days between start and end
- `element`: HTMLElement - The DateRangePicker element
- `event`: Event - The DOM event object
- `isInteracted`: boolean - Whether user interacted
- `text`: string - Formatted range text
- `type`: string - Event type (e.g., 'input')

### Select Event

Fires when user selects a start and end date:

```typescript
export class AppComponent {
  selectedRangeText: string = '';
  
  onSelectEvent(args: any): void {
    console.log('Select Event fired');
    console.log('Selected range:', args);
    
    this.selectedRangeText = `Range selected and confirmed`;
  }
}
```

## Lifecycle Events

### Created Event

Fires when component is initialized:

```typescript
export class AppComponent {
  @ViewChild('daterangepicker') drp!: DateRangePickerComponent;
  
  componentCreated: boolean = false;
  
  onCreatedEvent(): void {
    console.log('DateRangePicker component created');
    console.log('Component instance:', this.drp);
    
    this.componentCreated = true;
    
    // Initialize component state after creation
    this.initializeComponent();
  }
  
  private initializeComponent(): void {
    // Set default values, load data, etc.
    console.log('Component initialization complete');
  }
}
```

```html
<ejs-daterangepicker 
  #daterangepicker
  (created)="onCreatedEvent()">
</ejs-daterangepicker>

<p *ngIf="componentCreated">✓ DateRangePicker initialized</p>
```

### Destroyed Event

Fires when component is destroyed:

```typescript
export class AppComponent implements OnDestroy {
  componentDestroyed: boolean = false;
  
  onDestroyedEvent(): void {
    console.log('DateRangePicker component destroyed');
    this.componentDestroyed = true;
    
    // Cleanup any subscriptions or resources
    this.cleanup();
  }
  
  private cleanup(): void {
    console.log('Cleaning up DateRangePicker resources');
  }
  
  ngOnDestroy(): void {
    // Angular lifecycle cleanup
  }
}
```

## UI State Events

### Open Event

Fires when calendar popup opens:

```typescript
export class AppComponent {
  isOpen: boolean = false;
  openCount: number = 0;
  
  onOpenEvent(args: any): void {
    console.log('DateRangePicker popup opened');
    this.isOpen = true;
    this.openCount++;
    
    // Perform actions when picker opens
    this.loadDateData();
  }
  
  private loadDateData(): void {
    console.log('Loading date data for display');
  }
}
```

```html
<ejs-daterangepicker 
  (open)="onOpenEvent($event)"
  [startDate]="startDate"
  [endDate]="endDate">
</ejs-daterangepicker>

<p>Picker opened {{ openCount }} times</p>
```

### Close Event

Fires when calendar popup closes:

```typescript
export class AppComponent {
  isOpen: boolean = false;
  closeCount: number = 0;
  lastClosedTime: Date = new Date();
  
  onCloseEvent(args: any): void {
    console.log('DateRangePicker popup closed');
    this.isOpen = false;
    this.closeCount++;
    this.lastClosedTime = new Date();
    
    // Perform cleanup or validation
    this.validateSelection();
  }
  
  private validateSelection(): void {
    console.log('Validating selected range');
  }
}
```

### Navigated Event

Fires when the Calendar is navigated to another view or within the same level of view:

```typescript
import { NavigatedEventArgs } from '@syncfusion/ej2-calendars';

export class AppComponent {
  onNavigatedEvent(args: NavigatedEventArgs): void {
    console.log('Calendar navigated to view:', args.view);
    console.log('Navigation date:', args.date);
  }
}
```

```html
<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  (navigated)="onNavigatedEvent($event)">
</ejs-daterangepicker>
```

### Blur Event

Fires when the control loses focus:

```typescript
import { BlurEventArgs } from '@syncfusion/ej2-inputs';

export class AppComponent {
  onBlurEvent(args: BlurEventArgs): void {
    console.log('DateRangePicker lost focus');
  }
}
```

```html
<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  (blur)="onBlurEvent($event)">
</ejs-daterangepicker>
```

### Focus Event

Fires when the control receives focus:

```typescript
import { FocusEventArgs } from '@syncfusion/ej2-inputs';

export class AppComponent {
  onFocusEvent(args: FocusEventArgs): void {
    console.log('DateRangePicker focused');
  }
}
```

```html
<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  (focus)="onFocusEvent($event)">
</ejs-daterangepicker>
```

### Cleared Event

Fires when the DateRangePicker value is cleared using the clear button:

```typescript
import { ClearedEventArgs } from '@syncfusion/ej2-calendars';

export class AppComponent {
  onClearedEvent(args: ClearedEventArgs): void {
    console.log('DateRangePicker value cleared');
  }
}
```

```html
<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  [showClearButton]="true"
  (cleared)="onClearedEvent($event)">
</ejs-daterangepicker>
```

## Component Methods

### Show/Hide Picker

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
  
  // Open picker programmatically
  openPicker(): void {
    this.drp.show();
  }
  
  // Close picker programmatically
  closePicker(): void {
    this.drp.hide();
  }
  
  // Toggle picker visibility
  togglePicker(): void {
    if (this.drp.isOpen) {
      this.drp.hide();
    } else {
      this.drp.show();
    }
  }
}
```

```html
<div>
  <button (click)="openPicker()">Open Picker</button>
  <button (click)="closePicker()">Close Picker</button>
  <button (click)="togglePicker()">Toggle Picker</button>
  
  <ejs-daterangepicker 
    #daterangepicker
    [startDate]="startDate"
    [endDate]="endDate">
  </ejs-daterangepicker>
</div>
```

### Get Selected Range

```typescript
export class AppComponent {
  @ViewChild('daterangepicker') drp!: DateRangePickerComponent;
  
  selectedRangeInfo: string = '';
  
  getSelectedRange(): void {
    const range = this.drp.getSelectedRange();
    
    if (range && range.startDate && range.endDate) {
      const startStr = (range.startDate as Date).toLocaleDateString();
      const endStr = (range.endDate as Date).toLocaleDateString();
      this.selectedRangeInfo = `Selected: ${startStr} to ${endStr}`;
    } else {
      this.selectedRangeInfo = 'No range selected';
    }
  }
}
```

```html
<div>
  <ejs-daterangepicker 
    #daterangepicker
    [startDate]="startDate"
    [endDate]="endDate">
  </ejs-daterangepicker>
  
  <button (click)="getSelectedRange()">Get Range Info</button>
  <p *ngIf="selectedRangeInfo">{{ selectedRangeInfo }}</p>
</div>
```

### Enable/Disable Component

Use the `enabled` property to enable or disable the DateRangePicker component:

```typescript
export class AppComponent {
  isEnabled: boolean = true;
  
  toggleEnabled(): void {
    this.isEnabled = !this.isEnabled;
  }
}
```

```html
<div>
  <button (click)="toggleEnabled()">
    {{ isEnabled ? 'Disable' : 'Enable' }} Picker
  </button>
  
  <ejs-daterangepicker 
    [startDate]="startDate"
    [endDate]="endDate"
    [enabled]="isEnabled">
  </ejs-daterangepicker>
</div>
```

### Focus/Blur Control

```typescript
export class AppComponent {
  @ViewChild('daterangepicker') drp!: DateRangePickerComponent;
  
  setFocus(): void {
    this.drp.focusIn();
  }
  
  removeFocus(): void {
    this.drp.focusOut();
  }
}
```

```html
<div>
  <button (click)="setFocus()">Focus Picker</button>
  <button (click)="removeFocus()">Blur Picker</button>
  
  <ejs-daterangepicker 
    #daterangepicker
    [startDate]="startDate"
    [endDate]="endDate">
  </ejs-daterangepicker>
</div>
```

### Destroy Component

```typescript
export class AppComponent {
  @ViewChild('daterangepicker') drp!: DateRangePickerComponent;
  
  destroyPicker(): void {
    this.drp.destroy();
    console.log('DateRangePicker destroyed');
  }
}
```

## Event Payload Structures

### RangeEventArgs Structure

```typescript
interface RangeEventArgs {
  startDate: Date;           // Start date of the range
  endDate: Date;             // End date of the range
  daySpan: number;           // Number of days between dates
  element?: HTMLElement;     // The input element
  event?: Event;             // DOM event object
  isInteracted?: boolean;    // User interaction flag
  text?: string;             // Formatted range text
  type?: string;             // Event type
  name?: string;             // Event name
  cancel?: boolean;          // Can cancel event
}
```

### NavigatedEventArgs Structure

```typescript
interface NavigatedEventArgs {
  date?: Date;               // Current navigation date
  event?: Event;             // DOM event
  view?: string;             // Current view (Month, Year, Decade)
  name?: string;             // Event name
  cancel?: boolean;          // Can cancel navigation
}
```

### ClearedEventArgs Structure

```typescript
interface ClearedEventArgs {
  event?: Event;             // DOM event
  name?: string;             // Event name
}
```

### RenderDayCellEventArgs Structure

```typescript
interface RenderDayCellEventArgs {
  date: Date;                // Date being rendered
  element: HTMLElement;      // Cell element
  isDisabled?: boolean;      // Whether date is disabled
  isOutOfRange?: boolean;    // Whether date is outside range
  name?: string;             // Event name
}
```

## Practical Event Usage Examples

### Complete Event Handling Example

```typescript
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('daterangepicker') drp!: DateRangePickerComponent;
  
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  eventLog: string[] = [];
  changeCount: number = 0;
  
  ngOnInit(): void {
    console.log('Component initialized');
  }
  
  onCreatedEvent(): void {
    this.addLog('Component created');
  }
  
  onOpenEvent(): void {
    this.addLog('Picker opened');
  }
  
  onChangeEvent(args: RangeEventArgs): void {
    this.changeCount++;
    const message = `Change #${this.changeCount}: ${args.daySpan} days`;
    this.addLog(message);
  }
  
  onCloseEvent(): void {
    this.addLog('Picker closed');
  }
  
  onRenderDayCell(args: RenderDayCellEventArgs): void {
    // Disable weekends
    if (args.date.getDay() === 0 || args.date.getDay() === 6) {
      args.isDisabled = true;
    }
  }
  
  onDestroyedEvent(): void {
    this.addLog('Component destroyed');
  }
  
  private addLog(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.push(`[${timestamp}] ${message}`);
    
    // Keep last 10 events
    if (this.eventLog.length > 10) {
      this.eventLog.shift();
    }
  }
  
  ngOnDestroy(): void {
    console.log('Component cleanup');
  }
}
```

```html
<div style="display: flex; gap: 20px;">
  <div style="flex: 1;">
    <ejs-daterangepicker 
      #daterangepicker
      [startDate]="startDate"
      [endDate]="endDate"
      (created)="onCreatedEvent()"
      (open)="onOpenEvent()"
      (change)="onChangeEvent($event)"
      (select)="onSelectEvent($event)"
      (navigated)="onNavigatedEvent($event)"
      (blur)="onBlurEvent($event)"
      (focus)="onFocusEvent($event)"
      (cleared)="onClearedEvent($event)"
      (close)="onCloseEvent()"
      (renderDayCell)="onRenderDayCell($event)"
      (destroyed)="onDestroyedEvent()">
    </ejs-daterangepicker>
  </div>
  
  <div style="flex: 1;">
    <h4>Event Log:</h4>
    <div style="background: #f5f5f5; padding: 10px; border-radius: 4px; max-height: 300px; overflow-y: auto;">
      <p *ngFor="let event of eventLog" style="margin: 5px 0; font-family: monospace; font-size: 12px;">
        {{ event }}
      </p>
    </div>
  </div>
</div>
```

---

**Next Step:** For date formatting and constraint details, read [date-formatting-and-constraints.md](date-formatting-and-constraints.md).
