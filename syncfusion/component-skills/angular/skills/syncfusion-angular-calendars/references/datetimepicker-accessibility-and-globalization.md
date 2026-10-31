# Accessibility & Globalization

## Table of Contents
- [WCAG Compliance](#wcag-compliance)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Localization](#localization)
- [Day Header Formats](#day-header-formats)
- [First Day of Week](#first-day-of-week)
- [Week Numbers](#week-numbers)
- [RTL Support](#rtl-support)

## WCAG Compliance

### WCAG 2.2 Level AA Compliance

The Syncfusion DatetimePicker is built with WCAG 2.2 Level AA compliance:

- **Perceivable:** High color contrast ratios (>4.5:1)
- **Operable:** Full keyboard accessibility and navigation
- **Understandable:** Clear labels and instructions
- **Robust:** Compatible with assistive technologies

```typescript
export class AccessiblePickerComponent {
  selectedDateTime: Date = new Date();
  
  // Set ARIA attributes for screen readers
  ariaLabel: string = 'Select appointment date and time';
  ariaDescribedBy: string = 'datetimepicker-help';
}
```

```html
<div>
  <label for="appointment-picker">Appointment Date & Time</label>
  
  <ejs-datetimepicker
    id="appointment-picker"
    [(ngModel)]="selectedDateTime"
    [aria-label]="ariaLabel"
    [aria-describedby]="ariaDescribedBy">
  </ejs-datetimepicker>
  
  <p id="datetimepicker-help" style="font-size: 12px; color: #666;">
    Select your preferred date and time. Use arrow keys to navigate, Enter to select.
  </p>
</div>
```

### Accessibility Best Practices

```typescript
export class AccessibleFormComponent {
  appointmentDateTime: Date;
  appointmentTitle: string;
  notes: string;
  
  submitForm(): void {
    // Validate accessibility requirements
    if (!this.appointmentDateTime) {
      console.error('Date and time required');
      return;
    }
    
    if (!this.appointmentTitle) {
      console.error('Appointment title required');
      return;
    }
  }
}
```

```html
<form (submit)="submitForm()" aria-label="Appointment booking form">
  <fieldset>
    <legend>Schedule Appointment</legend>
    
    <div class="form-group">
      <label for="title">
        Appointment Title
        <span aria-label="required">*</span>
      </label>
      <input
        id="title"
        type="text"
        [(ngModel)]="appointmentTitle"
        name="title"
        required
        aria-required="true">
    </div>
    
    <div class="form-group">
      <label for="datetime">
        Date & Time
        <span aria-label="required">*</span>
      </label>
      <ejs-datetimepicker
        id="datetime"
        [(ngModel)]="appointmentDateTime"
        name="datetime"
        aria-required="true">
      </ejs-datetimepicker>
    </div>
    
    <div class="form-group">
      <label for="notes">Notes</label>
      <textarea
        id="notes"
        [(ngModel)]="notes"
        name="notes"
        aria-describedby="notes-help">
      </textarea>
      <p id="notes-help">Optional additional information</p>
    </div>
    
    <button type="submit" aria-label="Submit appointment">
      Submit
    </button>
  </fieldset>
</form>
```

## WAI-ARIA Attributes

### ARIA Roles and Attributes

```typescript
export class AccessiblePickerComponent {
  selectedDateTime: Date = new Date();
  isOpen: boolean = false;
  
  onPopupOpen(): void {
    this.isOpen = true;
  }
  
  onPopupClose(): void {
    this.isOpen = false;
  }
}
```

```html
<div role="application" aria-label="Date and time selection application">
  <!-- Input with ARIA attributes -->
  <input
    type="text"
    role="combobox"
    aria-haspopup="dialog"
    [aria-expanded]="isOpen"
    aria-controls="datetime-popup"
    placeholder="Select date and time"
    readonly>
  
  <!-- Popup dialog -->
  <div
    id="datetime-popup"
    role="dialog"
    aria-label="Calendar and time picker"
    [hidden]="!isOpen">
    
    <!-- Calendar table -->
    <table role="presentation">
      <thead>
        <tr>
          <th abbr="Sunday">Su</th>
          <th abbr="Monday">Mo</th>
          <th abbr="Tuesday">Tu</th>
          <th abbr="Wednesday">We</th>
          <th abbr="Thursday">Th</th>
          <th abbr="Friday">Fr</th>
          <th abbr="Saturday">Sa</th>
        </tr>
      </thead>
      <tbody>
        <!-- Calendar days -->
      </tbody>
    </table>
  </div>
</div>
```

### Custom ARIA Implementation

```typescript
export class CustomAccessiblePicker {
  selectedDateTime: Date = new Date();
  
  htmlAttributes = {
    'aria-label': 'Select date and time for appointment',
    'aria-describedby': 'picker-instructions',
    'role': 'combobox',
    'aria-haspopup': 'dialog',
    'tabindex': '0'
  };
}
```

```html
<div>
  <ejs-datetimepicker
    [(ngModel)]="selectedDateTime"
    [htmlAttributes]="htmlAttributes">
  </ejs-datetimepicker>
  
  <div id="picker-instructions" style="display: none;">
    Use arrow keys to navigate dates, Enter to select, Escape to close.
  </div>
</div>
```

## Keyboard Navigation

### Input Navigation Shortcuts

```typescript
export class KeyboardNavigationComponent {
  selectedDateTime: Date = new Date();
  
  keyConfigs = {
    altUpArrow: 'alt+uparrow',      // Close popup
    altDownArrow: 'alt+downarrow',  // Open popup
    escape: 'escape'                 // Close popup
  };
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [keyConfigs]="keyConfigs">
</ejs-datetimepicker>

<p style="font-size: 12px; color: #666;">
  <strong>Keyboard Shortcuts:</strong><br>
  Alt+↑ or Esc: Close popup<br>
  Alt+↓: Open popup<br>
  Arrow Keys: Navigate dates<br>
  Enter: Select date<br>
  Tab: Move to next field
</p>
```

### Calendar Navigation Keys

```typescript
export class CalendarKeyboardComponent {
  selectedDateTime: Date = new Date();
  
  // Customize calendar navigation keys
  keyConfigs = {
    // Calendar navigation
    controlUp: 'ctrl+38',        // Previous month
    controlDown: 'ctrl+40',      // Next month
    moveDown: 'downarrow',       // Next week
    moveUp: 'uparrow',           // Previous week
    moveLeft: 'leftarrow',       // Previous day
    moveRight: 'rightarrow',     // Next day
    select: 'enter',             // Select date
    home: 'home',                // First day of month
    end: 'end',                  // Last day of month
    pageUp: 'pageup',            // Previous year
    pageDown: 'pagedown',        // Next year
    
    // Time picker
    timeDown: 'downarrow',       // Decrease time
    timeUp: 'uparrow'            // Increase time
  };
}
```

### Complete Keyboard Guide

| Shortcut | Action | Context |
|----------|--------|---------|
| Alt+↓ | Open popup | Input focused |
| Alt+↑ / Esc | Close popup | Popup open |
| ↓ Arrow | Next week | Calendar view |
| ↑ Arrow | Previous week | Calendar view |
| ← Arrow | Previous day | Calendar view |
| → Arrow | Next day | Calendar view |
| Enter | Select date | Calendar view |
| Home | First day | Calendar view |
| End | Last day | Calendar view |
| PageUp | Previous year | Calendar view |
| PageDown | Next year | Calendar view |
| Ctrl+Home | Today | Calendar view |
| Space | Select in time | Time picker view |
| Tab | Next field | Any field |

## Screen Reader Support

### Screen Reader Announcements

```typescript
export class ScreenReaderComponent {
  selectedDateTime: Date = new Date();
  selectedDateDescription: string = '';
  
  onDateTimeChange(args: ChangedEventArgs): void {
    const selected = args.value as Date;
    
    // Create accessible description
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    this.selectedDateDescription = selected.toLocaleDateString('en-US', options);
    
    // Announce to screen readers via live region
    this.announceToScreenReader(`Date and time selected: ${this.selectedDateDescription}`);
  }
  
  private announceToScreenReader(message: string): void {
    // Create/update live region
    let liveRegion = document.getElementById('aria-live-region');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'aria-live-region';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.style.position = 'absolute';
      liveRegion.style.left = '-10000px';
      document.body.appendChild(liveRegion);
    }
    
    liveRegion.textContent = message;
  }
}
```

```html
<div>
  <ejs-datetimepicker
    [(ngModel)]="selectedDateTime"
    (change)="onDateTimeChange($event)"
    placeholder="Select date and time">
  </ejs-datetimepicker>
  
  <p aria-live="assertive" id="selection-status">
    {{ selectedDateDescription ? 'Selected: ' + selectedDateDescription : 'No selection' }}
  </p>
</div>
```

### Focus Management

```typescript
export class FocusManagementComponent {
  selectedDateTime: Date = new Date();
  
  showErrorMessage(message: string): void {
    // Focus on error message for screen readers
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.focus();
    }
  }
}
```

```html
<div>
  <label for="appointment-picker">Select Appointment</label>
  <ejs-datetimepicker
    id="appointment-picker"
    [(ngModel)]="selectedDateTime">
  </ejs-datetimepicker>
  
  <div
    id="error-message"
    role="alert"
    tabindex="-1"
    style="color: red; margin-top: 8px;">
  </div>
</div>
```

## Localization

### Setting Locale

The `locale` property controls date formatting, day names, month names, and translations:

```typescript
export class LocalizedPickerComponent {
  selectedDateTime: Date = new Date();
  locale: string = 'en-US'; // Default
  
  locales = [
    { value: 'en-US', label: 'English (US)' },
    { value: 'en-GB', label: 'English (GB)' },
    { value: 'de-DE', label: 'German' },
    { value: 'fr-FR', label: 'French' },
    { value: 'es-ES', label: 'Spanish' },
    { value: 'it-IT', label: 'Italian' },
    { value: 'ja-JP', label: 'Japanese' },
    { value: 'zh-CN', label: 'Chinese (Simplified)' },
    { value: 'ar-AE', label: 'Arabic (UAE)' },
    { value: 'he-IL', label: 'Hebrew' }
  ];
}
```

```html
<div style="margin-bottom: 20px;">
  <label>Select Language:</label>
  <select [(ngModel)]="locale">
    <option *ngFor="let l of locales" [value]="l.value">
      {{ l.label }}
    </option>
  </select>
</div>

<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [locale]="locale"
  format="dd/MM/yyyy hh:mm a">
</ejs-datetimepicker>
```

### Locale-Specific Formats

Different locales have different date/time conventions:

```typescript
export class LocaleFormatsComponent {
  selectedDateTime: Date = new Date();
  locale: string = 'en-US';
  
  get format(): string {
    switch(this.locale) {
      case 'en-US':
        return 'MM/dd/yyyy hh:mm a';     // US: MM/DD/YYYY 02:30 PM
      case 'en-GB':
        return 'dd/MM/yyyy HH:mm';       // UK: DD/MM/YYYY 14:30
      case 'de-DE':
        return 'dd.MM.yyyy HH:mm';       // German: DD.MM.YYYY 14:30
      case 'fr-FR':
        return 'dd/MM/yyyy HH:mm';       // French: DD/MM/YYYY 14:30
      case 'ja-JP':
        return 'yyyy年MM月dd日 HH:mm';    // Japanese: YYYY年MM月DD日 HH:MM
      case 'zh-CN':
        return 'yyyy年MM月dd日 HH:mm';    // Chinese: YYYY年MM月DD日 HH:MM
      case 'ar-AE':
        return 'dd/MM/yyyy hh:mm a';     // Arabic
      default:
        return 'dd/MM/yyyy hh:mm a';
    }
  }
}
```

## Day Header Formats

### Day Header Format Options

```typescript
export class DayHeaderComponent {
  selectedDateTime: Date = new Date();
  
  dayHeaderFormat: string = 'Short'; // Short, Narrow, Abbreviated, Wide
  
  formats = [
    { value: 'Short', label: 'Short', example: 'Su, Mo, Tu, We, Th, Fr, Sa' },
    { value: 'Narrow', label: 'Narrow', example: 'S, M, T, W, T, F, S' },
    { value: 'Abbreviated', label: 'Abbreviated', example: 'Sun, Mon, Tue, Wed, Thu, Fri, Sat' },
    { value: 'Wide', label: 'Wide', example: 'Sunday, Monday, Tuesday, ...' }
  ];
}
```

```html
<div style="margin-bottom: 20px;">
  <div *ngFor="let f of formats" style="margin-bottom: 10px;">
    <label>
      <input
        type="radio"
        [(ngModel)]="dayHeaderFormat"
        [value]="f.value">
      {{ f.label }}: <code>{{ f.example }}</code>
    </label>
  </div>
</div>

<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [dayHeaderFormat]="dayHeaderFormat">
</ejs-datetimepicker>
```

## First Day of Week

### Setting First Day of Week

Different cultures have different first days of week:

```typescript
export class FirstDayComponent {
  selectedDateTime: Date = new Date();
  
  // 0 = Sunday, 1 = Monday, 2 = Tuesday, etc.
  firstDayOfWeek: number = 0; // Default: Sunday (US)
  
  weekStarts = [
    { value: 0, label: 'Sunday (US, China)' },
    { value: 1, label: 'Monday (Europe, ISO)' },
    { value: 5, label: 'Friday (Middle East)' },
    { value: 6, label: 'Saturday (Middle East)' }
  ];
}
```

```html
<div style="margin-bottom: 20px;">
  <label>Week Starts On:</label>
  <select [(ngModel)]="firstDayOfWeek">
    <option *ngFor="let w of weekStarts" [value]="w.value">
      {{ w.label }}
    </option>
  </select>
</div>

<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [firstDayOfWeek]="firstDayOfWeek">
</ejs-datetimepicker>
```

## Week Numbers

### Display Week Numbers

Enable week number display:

```typescript
export class WeekNumberComponent {
  selectedDateTime: Date = new Date();
  showWeekNumber: boolean = true;
  
  weekRule: string = 'FirstDay'; // FirstDay, FirstFullWeek, FirstFourDays
}
```

```html
<div style="margin-bottom: 15px;">
  <label>
    <input
      type="checkbox"
      [(ngModel)]="showWeekNumber">
    Show Week Numbers
  </label>
</div>

<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [weekNumber]="showWeekNumber"
  [weekRule]="weekRule">
</ejs-datetimepicker>
```

### Week Rules

```typescript
export class WeekRuleComponent {
  selectedDateTime: Date = new Date();
  weekNumber: boolean = true;
  
  weekRule: string = 'FirstDay'; // or 'FirstFullWeek', 'FirstFourDays'
  
  get weekRuleDescription(): string {
    switch(this.weekRule) {
      case 'FirstDay':
        return 'Week 1 contains the first day of the year';
      case 'FirstFullWeek':
        return 'Week 1 is the first week that is fully in the new year';
      case 'FirstFourDays':
        return 'Week 1 is the first week with 4+ days in the new year (ISO 8601)';
      default:
        return '';
    }
  }
}
```

## RTL Support

### Enable RTL Mode

```typescript
export class RTLComponent {
  selectedDateTime: Date = new Date();
  enableRtl: boolean = true;
  locale: string = 'ar-AE';
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

### RTL with Different Languages

```typescript
export class MultiRTLComponent {
  selectedDateTime: Date = new Date();
  
  rtlLanguages = [
    { locale: 'ar-AE', label: 'العربية', enableRtl: true },
    { locale: 'he-IL', label: 'עברית', enableRtl: true },
    { locale: 'fa-IR', label: 'فارسی', enableRtl: true },
    { locale: 'ur-PK', label: 'اردو', enableRtl: true }
  ];
  
  selectedLanguage: string = 'ar-AE';
  
  get currentLanguage() {
    return this.rtlLanguages.find(l => l.locale === this.selectedLanguage);
  }
  
  get enableRtl(): boolean {
    return this.currentLanguage?.enableRtl || false;
  }
}
```

```html
<div style="margin-bottom: 20px;">
  <label>Select Language:</label>
  <select [(ngModel)]="selectedLanguage">
    <option *ngFor="let l of rtlLanguages" [value]="l.locale">
      {{ l.label }}
    </option>
  </select>
</div>

<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [locale]="selectedLanguage"
  [enableRtl]="enableRtl">
</ejs-datetimepicker>
```

## Complete Accessible & Globalized Example

```typescript
export class CompleteAccessibleComponent {
  selectedDateTime: Date = new Date();
  
  // Localization
  locale: string = 'en-US';
  enableRtl: boolean = false;
  firstDayOfWeek: number = 0;
  
  // Accessibility
  ariaLabel: string = 'Select appointment date and time';
  
  keyConfigs = {
    select: 'enter',
    home: 'ctrl+home',
    altUpArrow: 'alt+uparrow',
    altDownArrow: 'alt+downarrow'
  };
  
  htmlAttributes = {
    'aria-label': this.ariaLabel,
    'role': 'combobox'
  };
}
```

```html
<div [attr.lang]="locale" [dir]="enableRtl ? 'rtl' : 'ltr'">
  <ejs-datetimepicker
    [(ngModel)]="selectedDateTime"
    [locale]="locale"
    [enableRtl]="enableRtl"
    [firstDayOfWeek]="firstDayOfWeek"
    [htmlAttributes]="htmlAttributes"
    [keyConfigs]="keyConfigs"
    placeholder="Select date and time">
  </ejs-datetimepicker>
</div>
```
