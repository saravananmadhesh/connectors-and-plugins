# Advanced Features

## Table of Contents
- [Masked Input Mode](#masked-input-mode)
- [State Persistence](#state-persistence)
- [RTL Support](#rtl-support)
- [Floating Labels](#floating-labels)
- [Strict Mode](#strict-mode)
- [Keyboard Customization](#keyboard-customization)
- [Timezone Handling](#timezone-handling)
- [Input Format Parsing](#input-format-parsing)
- [Full Screen Mode](#full-screen-mode)
- [Allow Edit Control](#allow-edit-control)

## Masked Input Mode

### Enable Masked Input

Masked input provides a guided format template for entering date and time:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  enableMask: boolean = true;
  
  // Customize mask placeholder
  maskPlaceholder = {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
    hour: 'hh',
    minute: 'mm',
    second: 'ss',
    dayOfTheWeek: 'day of the week'
  };
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [enableMask]="enableMask"
  [maskPlaceholder]="maskPlaceholder"
  format="dd/MM/yyyy hh:mm:ss"
  placeholder="Masked input guide">
</ejs-datetimepicker>
```

### Mask Placeholder Customization

```typescript
export class AppComponent {
  selectedDateTime: Date;
  
  // Custom German placeholders
  germanMaskPlaceholder = {
    day: 'TT',
    month: 'MM',
    year: 'JJJJ',
    hour: 'HH',
    minute: 'MM',
    second: 'SS'
  };
  
  // Custom French placeholders
  frenchMaskPlaceholder = {
    day: 'jj',
    month: 'mm',
    year: 'aaaa',
    hour: 'hh',
    minute: 'mm',
    second: 'ss'
  };
}
```

```html
<!-- German format -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [enableMask]="true"
  [maskPlaceholder]="germanMaskPlaceholder"
  format="dd/MM/yyyy HH:mm:ss"
  locale="de-DE">
</ejs-datetimepicker>

<!-- French format -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [enableMask]="true"
  [maskPlaceholder]="frenchMaskPlaceholder"
  format="dd/MM/yyyy HH:mm:ss"
  locale="fr-FR">
</ejs-datetimepicker>
```

### Masked Input Patterns

```typescript
export class AppComponent {
  selectedDateTime: Date;
  selectedFormat: string = 'dmy';
  
  get enableMask(): boolean {
    return true;
  }
  
  get format(): string {
    switch(this.selectedFormat) {
      case 'dmy':
        return 'dd/MM/yyyy hh:mm a';
      case 'mdy':
        return 'MM/dd/yyyy hh:mm a';
      case 'iso':
        return 'yyyy-MM-dd HH:mm';
      default:
        return 'dd/MM/yyyy hh:mm a';
    }
  }
  
  get maskPlaceholder(): any {
    switch(this.selectedFormat) {
      case 'dmy':
        return { day: 'dd', month: 'mm', year: 'yyyy', hour: 'hh', minute: 'mm' };
      case 'mdy':
        return { day: 'dd', month: 'mm', year: 'yyyy', hour: 'hh', minute: 'mm' };
      case 'iso':
        return { day: 'dd', month: 'mm', year: 'yyyy', hour: 'hh', minute: 'mm' };
      default:
        return {};
    }
  }
}
```

## State Persistence

### Enable Persistence

Enable persistence to save and restore the selected datetime across browser sessions:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  enablePersistence: boolean = true;
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [enablePersistence]="enablePersistence"
  placeholder="Value persists across page reloads">
</ejs-datetimepicker>
```

**Persisted Properties:**
- `value` - The selected datetime value

### Manual State Management

```typescript
import { Component, ViewChild } from '@angular/core';
import { DateTimePickerComponent } from '@syncfusion/ej2-angular-datetimepickers';

export class AppComponent {
  selectedDateTime: Date;
  
  @ViewChild('datetimeRef') datetimeInstance: DateTimePickerComponent;
  
  saveState(): void {
    const stateData = this.datetimeInstance.getPersistData();
    const state = {
      datetime: this.selectedDateTime,
      persistenceData: stateData,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('datetimepickerState', JSON.stringify(state));
    console.log('State saved');
  }
  
  loadState(): void {
    const savedState = localStorage.getItem('datetimepickerState');
    if (savedState) {
      const state = JSON.parse(savedState);
      this.selectedDateTime = new Date(state.datetime);
      console.log('State restored from:', state.timestamp);
    }
  }
  
  ngOnInit(): void {
    this.loadState();
  }
  
  ngOnDestroy(): void {
    this.saveState();
  }
}
```

```html
<div>
  <ejs-datetimepicker
    #datetimeRef
    [(ngModel)]="selectedDateTime">
  </ejs-datetimepicker>
  
  <button (click)="saveState()">Save State</button>
  <button (click)="loadState()">Restore State</button>
</div>
```

## RTL Support

### Enable Right-to-Left Direction

For Arabic, Hebrew, Persian, and other RTL languages:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  enableRtl: boolean = true;
  locale: string = 'ar-AE'; // Arabic (UAE)
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [enableRtl]="enableRtl"
  [locale]="locale"
  placeholder="اختر التاريخ والوقت">
</ejs-datetimepicker>
```

### RTL with Different Locales

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  rtlLocales = [
    { locale: 'ar-AE', name: 'Arabic (UAE)', enableRtl: true },
    { locale: 'he-IL', name: 'Hebrew (Israel)', enableRtl: true },
    { locale: 'fa-IR', name: 'Persian (Iran)', enableRtl: true },
    { locale: 'ur-PK', name: 'Urdu (Pakistan)', enableRtl: true }
  ];
  
  currentLocale: string = 'ar-AE';
  
  get enableRtl(): boolean {
    return this.rtlLocales.some(l => l.locale === this.currentLocale && l.enableRtl);
  }
}
```

```html
<div>
  <select [(ngModel)]="currentLocale">
    <option *ngFor="let l of rtlLocales" [value]="l.locale">
      {{ l.name }}
    </option>
  </select>
  
  <ejs-datetimepicker
    [(ngModel)]="selectedDateTime"
    [locale]="currentLocale"
    [enableRtl]="enableRtl">
  </ejs-datetimepicker>
</div>
```

## Floating Labels

### Float Label Types

The `floatLabelType` property controls when labels float above the input:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  floatNever: string = 'Never';      // Label never floats
  floatAlways: string = 'Always';    // Label always floats
  floatAuto: string = 'Auto';        // Floats on focus or value
}
```

```html
<!-- Label never floats -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  floatLabelType="Never"
  placeholder="Enter date and time">
</ejs-datetimepicker>

<!-- Label always floats -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  floatLabelType="Always"
  placeholder="Enter date and time">
</ejs-datetimepicker>

<!-- Label floats on interaction (recommended) -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  floatLabelType="Auto"
  placeholder="Enter date and time">
</ejs-datetimepicker>
```

### Float Label with Form Labels

```typescript
export class FormComponent {
  appointmentDateTime: Date;
  appointmentTitle: string;
  appointmentNotes: string;
}
```

```html
<form>
  <div class="form-group">
    <label>Appointment Title</label>
    <input
      [(ngModel)]="appointmentTitle"
      placeholder="Enter title"
      name="title">
  </div>
  
  <div class="form-group">
    <label>Date & Time</label>
    <ejs-datetimepicker
      [(ngModel)]="appointmentDateTime"
      floatLabelType="Auto"
      format="dd/MM/yyyy hh:mm a"
      name="datetime">
    </ejs-datetimepicker>
  </div>
  
  <div class="form-group">
    <label>Notes</label>
    <textarea
      [(ngModel)]="appointmentNotes"
      placeholder="Additional notes"
      name="notes">
    </textarea>
  </div>
</form>
```

## Strict Mode

### Enable Strict Mode

Strict mode restricts input to valid datetime values within min/max range:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  strictMode: boolean = true;
  
  minDateTime: Date = new Date(2020, 0, 1);
  maxDateTime: Date = new Date(2030, 11, 31);
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [strictMode]="strictMode"
  [min]="minDateTime"
  [max]="maxDateTime"
  placeholder="Only valid values allowed">
</ejs-datetimepicker>
```

**Behavior:**
- Invalid entries are rejected
- Out-of-range values are reset to last valid value
- Non-date text is cleared

### Strict Mode vs Lenient Mode

```typescript
export class AppComponent {
  selectedDateTime: Date;
  useStrictMode: boolean = true;
  
  minDateTime: Date = new Date(2026, 2, 1);
  maxDateTime: Date = new Date(2026, 2, 31);
}
```

```html
<div>
  <label>
    <input
      type="checkbox"
      [(ngModel)]="useStrictMode">
    Enable Strict Mode
  </label>
</div>

<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [strictMode]="useStrictMode"
  [min]="minDateTime"
  [max]="maxDateTime"
  placeholder="Try entering values">
</ejs-datetimepicker>

<p>
  {{ useStrictMode ? 'Strict Mode: Only valid dates accepted' : 'Lenient Mode: Invalid dates highlighted' }}
</p>
```

## Keyboard Customization

### Custom Key Configuration

Customize keyboard shortcuts:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  keyConfigs = {
    select: 'space',           // Space to select
    home: 'ctrl+home',         // Ctrl+Home to go to today
    end: 'ctrl+end',           // Ctrl+End to go to end date
    moveDown: 'downarrow',
    moveUp: 'uparrow',
    moveLeft: 'leftarrow',
    moveRight: 'rightarrow'
  };
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [keyConfigs]="keyConfigs"
  placeholder="Custom keyboard shortcuts">
</ejs-datetimepicker>
```

### Common Key Configurations

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  // Vim-style navigation
  vimKeyConfig = {
    select: 'enter',
    moveDown: 'j',
    moveUp: 'k',
    moveLeft: 'h',
    moveRight: 'l'
  };
  
  // Emacs-style navigation
  emacsKeyConfig = {
    select: 'enter',
    moveDown: 'ctrl+n',
    moveUp: 'ctrl+p',
    moveLeft: 'ctrl+b',
    moveRight: 'ctrl+f'
  };
  
  // Accessibility-focused
  accessibilityKeyConfig = {
    select: 'enter',
    alt_up: 'alt+uparrow',
    alt_down: 'alt+downarrow',
    escape: 'escape'
  };
}
```

## Timezone Handling

### Server Timezone Offset

Process dates based on server timezone instead of browser timezone:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  // EST: UTC-5 = -300 minutes
  serverTimezoneOffset: number = -300;
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [serverTimezoneOffset]="serverTimezoneOffset"
  placeholder="Adjusted to server timezone">
</ejs-datetimepicker>
```

### Timezone Conversion

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  // Timezones: EST=-300, CST=-360, MST=-420, PST=-480
  timezoneOffsets = {
    'EST': -300,
    'CST': -360,
    'MST': -420,
    'PST': -480,
    'UTC': 0,
    'GMT+1': 60,
    'GMT+5:30': 330  // India
  };
  
  selectedTimezone: string = 'EST';
  
  get serverTimezoneOffset(): number {
    return this.timezoneOffsets[this.selectedTimezone] || 0;
  }
}
```

```html
<div>
  <label>Timezone:</label>
  <select [(ngModel)]="selectedTimezone">
    <option *ngFor="let tz of timezoneOffsets | keyvalue" [value]="tz.key">
      {{ tz.key }}
    </option>
  </select>
</div>

<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [serverTimezoneOffset]="serverTimezoneOffset">
</ejs-datetimepicker>
```

## Input Format Parsing

### Multiple Input Formats

Accept multiple date formats and parse automatically:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  // Accept various input formats
  inputFormats: string[] = [
    'dd/MM/yyyy hh:mm a',     // 24/03/2026 02:30 PM
    'MM/dd/yyyy hh:mm a',     // 03/24/2026 02:30 PM
    'yyyy-MM-dd HH:mm',        // 2026-03-24 14:30
    'MMM dd, yyyy hh:mm a',   // Mar 24, 2026 02:30 PM
    'dd-MM-yyyy HH:mm:ss'      // 24-03-2026 14:30:00
  ];
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [inputFormats]="inputFormats"
  format="dd/MM/yyyy hh:mm a"
  placeholder="Multiple formats accepted">
</ejs-datetimepicker>
```

## Full Screen Mode

### Enable Full Screen for Mobile

Display calendar as full screen on mobile devices:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  fullScreenMode: boolean = true;
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [fullScreenMode]="fullScreenMode"
  placeholder="Full screen on mobile">
</ejs-datetimepicker>
```

### Responsive Full Screen

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  get fullScreenMode(): boolean {
    // Full screen on small devices
    return window.innerWidth < 768;
  }
}
```

## Allow Edit Control

### Readonly Input with Popup Selection

Use `allowEdit` to make input readonly while allowing popup selection:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  allowEdit: boolean = false; // Input is readonly
}
```

```html
<!-- User cannot type, but can select from popup -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [allowEdit]="allowEdit"
  placeholder="Click to select">
</ejs-datetimepicker>
```

### Conditional Edit Mode

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  editMode: string = 'readonly'; // 'readonly' or 'edit'
  
  get allowEdit(): boolean {
    return this.editMode === 'edit';
  }
}
```

```html
<div style="margin-bottom: 10px;">
  <label>
    <input
      type="radio"
      [(ngModel)]="editMode"
      value="readonly">
    Readonly (Popup only)
  </label>
  <label>
    <input
      type="radio"
      [(ngModel)]="editMode"
      value="edit">
    Editable (Type or click)
  </label>
</div>

<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [allowEdit]="allowEdit"
  placeholder="Select date and time">
</ejs-datetimepicker>
```

## Complete Example: Advanced Configuration

```typescript
export class AdvancedPickerComponent {
  selectedDateTime: Date = new Date();
  
  // Configuration options
  config = {
    enableMask: true,
    strictMode: true,
    enablePersistence: true,
    enableRtl: false,
    fullScreenMode: false,
    allowEdit: true,
    showClearButton: true,
    showTodayButton: true
  };
  
  minDateTime: Date = new Date(2020, 0, 1);
  maxDateTime: Date = new Date(2030, 11, 31);
  
  format: string = 'dd/MM/yyyy hh:mm a';
  timeFormat: string = 'hh:mm a';
  locale: string = 'en-US';
  
  maskPlaceholder = {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
    hour: 'hh',
    minute: 'mm'
  };
  
  keyConfigs = {
    select: 'space',
    home: 'ctrl+home',
    end: 'ctrl+end'
  };
}
```

```html
<form>
  <fieldset style="margin-bottom: 20px;">
    <legend>Configuration</legend>
    
    <label>
      <input
        type="checkbox"
        [(ngModel)]="config.enableMask"
        name="mask">
      Enable Masked Input
    </label>
    
    <label>
      <input
        type="checkbox"
        [(ngModel)]="config.strictMode"
        name="strict">
      Strict Mode
    </label>
    
    <label>
      <input
        type="checkbox"
        [(ngModel)]="config.enablePersistence"
        name="persist">
      Enable Persistence
    </label>
    
    <label>
      <input
        type="checkbox"
        [(ngModel)]="config.enableRtl"
        name="rtl">
      RTL Mode
    </label>
  </fieldset>
  
  <ejs-datetimepicker
    [(ngModel)]="selectedDateTime"
    [enableMask]="config.enableMask"
    [strictMode]="config.strictMode"
    [enablePersistence]="config.enablePersistence"
    [enableRtl]="config.enableRtl"
    [fullScreenMode]="config.fullScreenMode"
    [allowEdit]="config.allowEdit"
    [showClearButton]="config.showClearButton"
    [showTodayButton]="config.showTodayButton"
    [min]="minDateTime"
    [max]="maxDateTime"
    [format]="format"
    [timeFormat]="timeFormat"
    [locale]="locale"
    [maskPlaceholder]="maskPlaceholder"
    [keyConfigs]="keyConfigs">
  </ejs-datetimepicker>
</form>
```
