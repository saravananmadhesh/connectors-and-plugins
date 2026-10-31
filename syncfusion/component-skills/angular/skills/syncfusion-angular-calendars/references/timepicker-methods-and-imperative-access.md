# Methods and Imperative Access

## ViewChild Access and Component References

Access the TimePicker component instance using ViewChild:

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
  
  // Call this after view initializes
  ngAfterViewInit(): void {
    console.log('TimePicker instance:', this.timePickerInstance);
    console.log('Current value:', this.timePickerInstance.value);
  }
  
  // Access properties
  getCurrentValue(): void {
    const value = this.timePickerInstance.value;
    console.log('Current time:', value);
    alert('Selected time: ' + (value ? value.toLocaleTimeString() : 'None'));
  }
  
  // Check if enabled
  isEnabled(): boolean {
    return this.timePickerInstance.enabled;
  }
}
```

```html
<!-- app.component.html -->
<ejs-timepicker #timePickerRef [(ngModel)]="selectedTime"></ejs-timepicker>

<div style="margin-top: 20px;">
  <button (click)="getCurrentValue()">Get Current Value</button>
  <p>Is Enabled: {{ isEnabled() }}</p>
</div>
```

## Show Method

Open the time picker popup programmatically:

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
  
  // Open popup
  openTimePicker(): void {
    this.timePickerInstance.show();
  }
  
  // Open on button click instead of input
  openOnButtonClick(): void {
    console.log('Opening TimePicker...');
    this.timePickerInstance.show();
  }
  
  // Open with delay
  openWithDelay(): void {
    setTimeout(() => {
      this.timePickerInstance.show();
    }, 500);
  }
}
```

```html
<!-- app.component.html -->
<div>
  <label>TimePicker:</label>
  <ejs-timepicker
    #timePickerRef
    [(ngModel)]="selectedTime"
    [openOnFocus]="false">
  </ejs-timepicker>
  
  <div style="margin-top: 15px;">
    <button (click)="openTimePicker()">Open TimePicker</button>
    <button (click)="openWithDelay()">Open After Delay</button>
  </div>
</div>
```

## Hide Method

Close the time picker popup programmatically:

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
  
  // Close popup
  closeTimePicker(): void {
    this.timePickerInstance.hide();
  }
  
  // Close after selection
  selectTimeAndClose(time: Date): void {
    this.selectedTime = time;
    this.timePickerInstance.hide();
  }
  
  // Auto-close after 5 seconds
  autoCloseAfterDelay(): void {
    this.timePickerInstance.show();
    setTimeout(() => {
      this.timePickerInstance.hide();
    }, 5000);
  }
}
```

```html
<!-- app.component.html -->
<div>
  <ejs-timepicker
    #timePickerRef
    [(ngModel)]="selectedTime">
  </ejs-timepicker>
  
  <div style="margin-top: 15px;">
    <button (click)="closeTimePicker()">Close TimePicker</button>
    <button (click)="autoCloseAfterDelay()">Auto-Close (5s)</button>
  </div>
</div>
```

## FocusIn Method

Programmatically focus the TimePicker input:

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
  focusAttempts: number = 0;
  
  // Focus the input
  focusTimePickerInput(): void {
    this.timePickerInstance.focusIn();
    this.focusAttempts++;
    console.log('Focused - attempt #' + this.focusAttempts);
  }
  
  // Focus with text selection
  focusAndSelect(): void {
    this.timePickerInstance.focusIn();
    // Text in input will be selected
  }
  
  // Focus on form submission
  focusOnSubmit(): void {
    if (!this.selectedTime) {
      // If no time selected, focus the input
      this.timePickerInstance.focusIn();
      alert('Please select a time');
    }
  }
}
```

```html
<!-- app.component.html -->
<div>
  <ejs-timepicker
    #timePickerRef
    [(ngModel)]="selectedTime"
    placeholder="Select time">
  </ejs-timepicker>
  
  <div style="margin-top: 15px;">
    <button (click)="focusTimePickerInput()">Focus Input</button>
    <button (click)="focusAndSelect()">Focus & Select</button>
    <button (click)="focusOnSubmit()">Focus on Error</button>
    <p>Focus Attempts: {{ focusAttempts }}</p>
  </div>
</div>
```

## FocusOut Method

Programmatically blur/remove focus from the TimePicker input:

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
  
  // Remove focus from input
  blurTimePickerInput(): void {
    this.timePickerInstance.focusOut();
  }
  
  // Blur and close popup
  blurAndClose(): void {
    this.timePickerInstance.focusOut();
    this.timePickerInstance.hide();
  }
  
  // Auto-blur after selection
  onTimeChange(): void {
    // Focus moves to next field after delay
    setTimeout(() => {
      this.timePickerInstance.focusOut();
    }, 100);
  }
}
```

```html
<!-- app.component.html -->
<div>
  <ejs-timepicker
    #timePickerRef
    [(ngModel)]="selectedTime"
    (change)="onTimeChange()"
    placeholder="Select time">
  </ejs-timepicker>
  
  <div style="margin-top: 15px;">
    <button (click)="blurTimePickerInput()">Blur Input</button>
    <button (click)="blurAndClose()">Blur & Close</button>
  </div>
  
  <input style="margin-left: 10px;" placeholder="Next field">
</div>
```

## GetPersistData Method

Retrieve persisted component state:

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
  persistedData: string = '';
  
  // Get persisted data
  getPersistData(): void {
    const data = this.timePickerInstance.getPersistData();
    this.persistedData = data;
    console.log('Persisted data:', data);
    alert('Persisted data: ' + data);
  }
  
  // Save to localStorage
  savePersistData(): void {
    const data = this.timePickerInstance.getPersistData();
    localStorage.setItem('timePickerState', data);
    console.log('State saved to localStorage');
  }
  
  // Retrieve from localStorage
  retrievePersistData(): void {
    const saved = localStorage.getItem('timePickerState');
    if (saved) {
      console.log('Retrieved from localStorage:', saved);
    }
  }
}
```

```html
<!-- app.component.html -->
<div>
  <ejs-timepicker
    #timePickerRef
    [(ngModel)]="selectedTime"
    [enablePersistence]="true">
  </ejs-timepicker>
  
  <div style="margin-top: 15px;">
    <button (click)="getPersistData()">Get Persist Data</button>
    <button (click)="savePersistData()">Save to LocalStorage</button>
    <button (click)="retrievePersistData()">Retrieve from LocalStorage</button>
    
    <p style="word-break: break-all; max-width: 500px;">
      <strong>Persisted Data:</strong> {{ persistedData }}
    </p>
  </div>
</div>
```

## Complete Methods Usage Example

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
  actionLog: string[] = [];
  
  logAction(action: string): void {
    this.actionLog.push(`[${new Date().toLocaleTimeString()}] ${action}`);
  }
  
  // Scenario 1: Open and focus
  openAndFocus(): void {
    this.timePickerInstance.show();
    this.timePickerInstance.focusIn();
    this.logAction('Opened and focused');
  }
  
  // Scenario 2: Select and close
  selectTimeAndClose(time: Date): void {
    this.selectedTime = time;
    setTimeout(() => {
      this.timePickerInstance.hide();
      this.logAction(`Selected ${time.toLocaleTimeString()} and closed`);
    }, 300);
  }
  
  // Scenario 3: Toggle open/close
  isPopupOpen: boolean = false;

  togglePopup(): void {
    if (this.isPopupOpen) {
      this.timePickerInstance.hide();
      this.logAction('Closed popup');
    } else {
      this.timePickerInstance.show();
      this.logAction('Opened popup');
    }
  }

  onPopupOpen(): void {
    this.isPopupOpen = true;
  }

  onPopupClose(): void {
    this.isPopupOpen = false;
  }
  
  // Scenario 4: Reset
  resetTimePickerState(): void {
    this.selectedTime = new Date();
    this.timePickerInstance.hide();
    this.logAction('Reset time picker');
  }
  
  // Scenario 5: Advanced workflow
  advancedWorkflow(): void {
    this.logAction('Workflow started');
    
    // Step 1: Focus input
    this.timePickerInstance.focusIn();
    this.logAction('Step 1: Focused input');
    
    // Step 2: Open popup after delay
    setTimeout(() => {
      this.timePickerInstance.show();
      this.logAction('Step 2: Opened popup');
    }, 500);
    
    // Step 3: Get current state
    setTimeout(() => {
      const data = this.timePickerInstance.getPersistData();
      this.logAction('Step 3: Got persist data');
    }, 1000);
  }
  
  clearLog(): void {
    this.actionLog = [];
  }
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <ejs-timepicker
    #timePickerRef
    [(ngModel)]="selectedTime"
    (open)="onPopupOpen()"
    (close)="onPopupClose()"
    placeholder="Select time">
  </ejs-timepicker>
  
  <div style="margin-top: 20px;">
    <h3>Method Calls:</h3>
    <button (click)="openAndFocus()">Open & Focus</button>
    <button (click)="togglePopup()">Toggle Popup</button>
    <button (click)="resetTimePickerState()">Reset</button>
    <button (click)="advancedWorkflow()">Advanced Workflow</button>
  </div>
  
  <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 4px;">
    <h4>Action Log:</h4>
    <div style="max-height: 300px; overflow-y: auto; font-family: monospace; font-size: 12px;">
      <div *ngFor="let action of actionLog" style="padding: 5px; border-bottom: 1px solid #ddd;">
        {{ action }}
      </div>
    </div>
    <button (click)="clearLog()" style="margin-top: 10px;">Clear Log</button>
  </div>
</div>
```

## Timing Considerations for Method Calls

### AfterViewInit Timing

```typescript
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { TimePickerComponent } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('timePickerRef') timePickerInstance!: TimePickerComponent;
  
  selectedTime: Date = new Date();
  
  // ✓ Correct: Call methods in AfterViewInit or later
  ngAfterViewInit(): void {
    console.log('View initialized, safe to call methods');
    // this.timePickerInstance.show(); // Safe
  }
  
  // ✗ Incorrect: OnInit runs before view initialization
  ngOnInit(): void {
    // this.timePickerInstance.show(); // Error! Instance not ready
  }
  
  // ✓ Correct: Call from event handlers
  onButtonClick(): void {
    this.timePickerInstance.show(); // Safe
  }
}
```

### Async/Await Pattern

```typescript
export class AppComponent implements AfterViewInit {
  @ViewChild('timePickerRef') timePickerInstance!: TimePickerComponent;
  
  selectedTime: Date = new Date();
  
  async ngAfterViewInit(): Promise<void> {
    // Wait for component to fully initialize
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Now safe to call methods
    this.timePickerInstance.show();
    this.timePickerInstance.focusIn();
  }
}
```
