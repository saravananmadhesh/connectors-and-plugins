# Advanced Features

## Table of Contents
- [Masked Input Mode](#masked-input-mode)
- [State Persistence](#state-persistence)
- [RTL Support](#rtl-support)
- [Floating Labels](#floating-labels)
- [Strict Mode Validation](#strict-mode-validation)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Timezone Offset Handling](#timezone-offset-handling)
- [Full Screen Mode](#full-screen-mode)
- [Clear Button Behavior](#clear-button-behavior)
- [OpenOnFocus Property](#openonfocus-property)

## Masked Input Mode

Enable masked input to guide users through time entry with placeholders:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date | null = null;
  
  // Enable mask
  enableMask: boolean = true;
  
  // Custom mask placeholders
  maskPlaceholder = {
    hour: 'hh',
    minute: 'mm',
    second: 'ss'
  };
  
  format: string = 'hh:mm:ss a';
}
```

```html
<!-- app.component.html -->
<div>
  <label>Masked Time Input:</label>
  <ejs-timepicker
    [(ngModel)]="selectedTime"
    [enableMask]="enableMask"
    [maskPlaceholder]="maskPlaceholder"
    [format]="format"
    placeholder="Enter time with guide">
  </ejs-timepicker>
  
  <p style="color: #666; font-size: 12px;">
    Type in the input to see masked format guide (hh:mm:ss AM/PM)
  </p>
</div>
```

### Mask Placeholder Variations

```typescript
export class AppComponent {
  // Minimal placeholders
  minimalMask = {
    hour: 'h',
    minute: 'm'
  };
  
  // Descriptive placeholders
  descriptiveMask = {
    hour: 'hours',
    minute: 'mins',
    second: 'secs'
  };
  
  // Short format
  shortMask = {
    hour: '00',
    minute: '00'
  };
}
```

## State Persistence

Enable persistence to save the selected time across page reloads:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  
  // Enable persistence
  enablePersistence: boolean = true;
}
```

```html
<!-- app.component.html -->
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [enablePersistence]="enablePersistence"
  placeholder="Select time">
</ejs-timepicker>

<p style="color: #666; font-size: 12px;">
  Selected time is saved. Refresh the page to see it persist.
</p>
```

### How Persistence Works

1. **Initial Load:** Component loads previously saved value
2. **User Selection:** Value is automatically saved
3. **Page Reload:** Previously selected time reappears
4. **Browser Storage:** Uses browser's localStorage API

### Clear Persisted Data

```typescript
export class AppComponent {
  clearPersistedData(): void {
    // Clear from localStorage
    localStorage.removeItem('timepicker-value');
    
    // Reset component
    this.selectedTime = new Date();
    
    console.log('Persisted data cleared');
  }
}
```

## RTL Support

Enable Right-to-Left (RTL) layout for Arabic, Hebrew, and other RTL languages:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  
  // Enable RTL
  enableRtl: boolean = true;
  
  // Toggle RTL
  toggleRtl(): void {
    this.enableRtl = !this.enableRtl;
  }
}
```

```html
<!-- app.component.html -->
<div [dir]="enableRtl ? 'rtl' : 'ltr'">
  <ejs-timepicker
    [(ngModel)]="selectedTime"
    [enableRtl]="enableRtl"
    format="hh:mm a"
    placeholder="اختر الوقت">
  </ejs-timepicker>
  
  <button (click)="toggleRtl()" style="margin-top: 10px;">
    {{ enableRtl ? 'Switch to LTR' : 'Switch to RTL' }}
  </button>
</div>
```

## Floating Labels

Display floating labels that animate when input is focused or has value:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date | null = null;
  
  // Floating label types
  floatLabelTypeNever: string = 'Never';      // Label doesn't float
  floatLabelTypeAlways: string = 'Always';    // Label always floats
  floatLabelTypeAuto: string = 'Auto';        // Label floats on focus or value
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <!-- Never float -->
  <div style="margin-bottom: 20px;">
    <ejs-timepicker
      [(ngModel)]="selectedTime"
      floatLabelType="Never"
      placeholder="Select appointment time">
    </ejs-timepicker>
  </div>
  
  <!-- Always float -->
  <div style="margin-bottom: 20px;">
    <ejs-timepicker
      [(ngModel)]="selectedTime"
      floatLabelType="Always"
      placeholder="Select appointment time">
    </ejs-timepicker>
  </div>
  
  <!-- Auto float (default) -->
  <div style="margin-bottom: 20px;">
    <ejs-timepicker
      [(ngModel)]="selectedTime"
      floatLabelType="Auto"
      placeholder="Select appointment time">
    </ejs-timepicker>
  </div>
</div>
```

## Strict Mode Validation

Enforce strict validation to accept only valid time values within range:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date(2026, 2, 24, 14, 0);
  
  // Enable strict mode
  strictMode: boolean = true;
  
  // Set valid range
  minTime: Date = new Date(2026, 2, 24, 9, 0);
  maxTime: Date = new Date(2026, 2, 24, 17, 0);
  
  toggleStrictMode(): void {
    this.strictMode = !this.strictMode;
  }
}
```

```html
<!-- app.component.html -->
<div>
  <ejs-timepicker
    [(ngModel)]="selectedTime"
    [strictMode]="strictMode"
    [min]="minTime"
    [max]="maxTime"
    format="hh:mm a"
    placeholder="Select time">
  </ejs-timepicker>
  
  <div style="margin-top: 15px;">
    <button (click)="toggleStrictMode()">
      Strict Mode: {{ strictMode ? 'ON' : 'OFF' }}
    </button>
  </div>
  
  <p style="color: #666; font-size: 12px;">
    With strict mode ON: Invalid times outside 9 AM - 5 PM are rejected.
    Type invalid time and click elsewhere to see it revert.
  </p>
</div>
```

### Strict Mode Behavior

- **Valid Input:** Accepted and kept
- **Invalid Input (out of range):** Reverts to previous valid value
- **Invalid Format:** Rejected or reformatted
- **With Min/Max:** Enforces range strictly

## Keyboard Shortcuts

Customize keyboard shortcuts using keyConfigs:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  
  // Default key configurations
  keyConfigs = {
    enter: 'enter',
    escape: 'escape',
    tab: 'tab',
    home: 'home',
    end: 'end',
    down: 'downarrow',
    up: 'uparrow',
    left: 'leftarrow',
    right: 'rightarrow',
    open: 'alt+downarrow',
    close: 'alt+uparrow'
  };
  
  // Custom key configurations for German keyboard
  customKeyConfigs = {
    enter: 'space',
    home: 'ctrl+home',
    end: 'ctrl+end',
    open: 'ctrl+downarrow',
    close: 'ctrl+uparrow'
  };
}
```

```html
<!-- app.component.html -->
<div>
  <ejs-timepicker
    [(ngModel)]="selectedTime"
    [keyConfigs]="keyConfigs"
    placeholder="Try keyboard shortcuts">
  </ejs-timepicker>
  
  <div style="margin-top: 15px; padding: 10px; background-color: #f5f5f5;">
    <h4>Keyboard Shortcuts:</h4>
    <ul style="font-size: 12px;">
      <li><strong>Alt + Down Arrow:</strong> Open popup</li>
      <li><strong>Alt + Up Arrow:</strong> Close popup</li>
      <li><strong>Down Arrow:</strong> Next time in list</li>
      <li><strong>Up Arrow:</strong> Previous time in list</li>
      <li><strong>Enter:</strong> Select highlighted time</li>
      <li><strong>Escape:</strong> Close popup</li>
      <li><strong>Tab:</strong> Move to next field</li>
      <li><strong>Home:</strong> First time in list</li>
      <li><strong>End:</strong> Last time in list</li>
    </ul>
  </div>
</div>
```

## Timezone Offset Handling

Process time values using server timezone instead of browser timezone:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  
  // Server is in UTC+5:30 (India)
  serverTimezoneOffset: number = 330;  // minutes from UTC
  
  // Server is in UTC-8 (Pacific)
  // serverTimezoneOffset: number = -480;
  
  // Get browser timezone offset
  getBrowserTimezoneOffset(): number {
    return new Date().getTimezoneOffset() * -1;  // Convert to minutes from UTC
  }
}
```

```html
<!-- app.component.html -->
<div>
  <ejs-timepicker
    [(ngModel)]="selectedTime"
    [serverTimezoneOffset]="serverTimezoneOffset"
    format="hh:mm a"
    placeholder="Select time">
  </ejs-timepicker>
  
  <p style="color: #666; font-size: 12px;">
    Browser Timezone Offset: {{ getBrowserTimezoneOffset() }} minutes
    <br>
    Server Timezone Offset: {{ serverTimezoneOffset }} minutes
  </p>
</div>
```

## Full Screen Mode

Enable full screen mode on mobile devices:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  
  // Enable full screen on mobile
  fullScreenMode: boolean = true;
}
```

```html
<!-- app.component.html -->
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [fullScreenMode]="fullScreenMode"
  placeholder="Select time">
</ejs-timepicker>

<p style="color: #666; font-size: 12px;">
  On mobile devices, the time picker will open in full screen mode for easier selection.
</p>
```

## Clear Button Behavior

Control the clear button visibility and behavior:

```typescript
// app.component.ts
import { Component, ViewChild } from '@angular/core';
import { TimePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { ClearedEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('timePickerRef') timePickerInstance!: TimePickerComponent;
  
  selectedTime: Date = new Date();
  clearCount: number = 0;
  
  // Show/hide clear button
  showClearButton: boolean = true;
  
  onCleared(args: ClearedEventArgs): void {
    this.clearCount++;
    console.log('Time cleared - count:', this.clearCount);
  }
  
  toggleClearButton(): void {
    this.showClearButton = !this.showClearButton;
  }
}
```

```html
<!-- app.component.html -->
<div>
  <ejs-timepicker
    #timePickerRef
    [(ngModel)]="selectedTime"
    [showClearButton]="showClearButton"
    (cleared)="onCleared($event)"
    placeholder="Select time">
  </ejs-timepicker>
  
  <div style="margin-top: 15px;">
    <button (click)="toggleClearButton()">
      {{ showClearButton ? 'Hide' : 'Show' }} Clear Button
    </button>
    <p>Clear Button Clicked: {{ clearCount }} times</p>
  </div>
</div>
```

## OpenOnFocus Property

Control whether popup opens when input is focused:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  
  // Open on focus
  openOnFocus: boolean = true;
  
  toggleOpenOnFocus(): void {
    this.openOnFocus = !this.openOnFocus;
  }
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <div>
    <label>OpenOnFocus: {{ openOnFocus ? 'Enabled' : 'Disabled' }}</label>
    <ejs-timepicker
      [(ngModel)]="selectedTime"
      [openOnFocus]="openOnFocus"
      placeholder="Click or focus to open">
    </ejs-timepicker>
  </div>
  
  <div style="margin-top: 15px;">
    <button (click)="toggleOpenOnFocus()">
      Toggle OpenOnFocus
    </button>
  </div>
  
  <p style="color: #666; font-size: 12px;">
    When ON: Popup opens on input focus.
    <br>
    When OFF: Popup opens only on icon click.
  </p>
</div>
```

## Advanced Features Combination Example

```typescript
// app.component.ts
export class AppComponent {
  selectedTime: Date = new Date();
  
  // Complete advanced configuration
  advancedConfig = {
    enableMask: true,
    enablePersistence: true,
    enableRtl: false,
    floatLabelType: 'Auto' as any,
    strictMode: true,
    fullScreenMode: true,
    showClearButton: true,
    openOnFocus: false,
    serverTimezoneOffset: 0
  };
  
  maskPlaceholder = {
    hour: 'hh',
    minute: 'mm',
    second: 'ss'
  };
  
  keyConfigs = {
    enter: 'enter',
    open: 'alt+downarrow',
    close: 'alt+uparrow'
  };
  
  minTime: Date = new Date(2026, 2, 24, 8, 0);
  maxTime: Date = new Date(2026, 2, 24, 20, 0);
  format: string = 'hh:mm:ss a';
}
```

```html
<!-- app.component.html -->
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [enableMask]="advancedConfig.enableMask"
  [maskPlaceholder]="maskPlaceholder"
  [enablePersistence]="advancedConfig.enablePersistence"
  [enableRtl]="advancedConfig.enableRtl"
  [floatLabelType]="advancedConfig.floatLabelType"
  [strictMode]="advancedConfig.strictMode"
  [fullScreenMode]="advancedConfig.fullScreenMode"
  [showClearButton]="advancedConfig.showClearButton"
  [openOnFocus]="advancedConfig.openOnFocus"
  [serverTimezoneOffset]="advancedConfig.serverTimezoneOffset"
  [keyConfigs]="keyConfigs"
  [min]="minTime"
  [max]="maxTime"
  [format]="format"
  placeholder="Advanced TimePicker">
</ejs-timepicker>
```
