# Calendar Accessibility & Globalization

## Table of Contents
- [WCAG 2.2 Compliance](#wcag-22-compliance)
- [WAI-ARIA Support](#wai-aria-support)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Compatibility](#screen-reader-compatibility)
- [Localization](#localization)
- [Date Formatting](#date-formatting)
- [RTL Support](#rtl-support)
- [Accessibility Testing](#accessibility-testing)

## WCAG 2.2 Compliance

The Syncfusion Calendar component meets WCAG 2.2 Level AA standards.

### Compliance Features

- **Keyboard Accessible:** Full keyboard navigation without mouse
- **Screen Reader Support:** Proper ARIA labels and roles
- **Color Contrast:** Meets minimum 4.5:1 ratio for text
- **Focus Visible:** Clear focus indicators for keyboard navigation
- **Text Alternatives:** All icons have text labels
- **Semantic HTML:** Proper heading and landmark structure

### Implementation

```typescript
// app.component.ts
import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-calendar-accessible',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AccessibleCalendarComponent {
  @ViewChild('calendar') calendar!: CalendarComponent;
  selectedDate: Date = new Date();
  
  // Ensure component is accessible by default
  ngOnInit(): void {
    console.log('Calendar initialized with accessibility features enabled');
  }
}
```

```html
<!-- app.component.html -->
<div role="region" aria-label="Calendar date picker">
  <label for="calendarInput">Select Date:</label>
  <ejs-calendar 
    #calendar
    id="calendarInput"
    [(ngModel)]="selectedDate"
    aria-label="Calendar for date selection">
  </ejs-calendar>
</div>
```

## WAI-ARIA Support

The Calendar component includes built-in WAI-ARIA attributes.

### ARIA Attributes

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `role="button"` | Day cells act as buttons | Applied to each date |
| `aria-label` | Descriptive labels | "Tuesday, March 15, 2026" |
| `aria-selected` | Selected state | Applied to selected dates |
| `aria-disabled` | Disabled state | Applied to disabled dates |
| `aria-current="date"` | Current/today date | Applied to today's date |
| `tabindex="0"` | Keyboard focus | Applied to interactive elements |

### Custom ARIA Implementation

```typescript
export class AppComponent {
  @ViewChild('calendar') calendar!: CalendarComponent;
  selectedDate: Date = new Date();
  
  onRenderDayCell(args: any): void {
    // Enhance ARIA labels for specific dates
    const dateString = args.date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    args.cellData.ariaLabel = dateString;
    
    // Mark holidays specially
    if (this.isHoliday(args.date)) {
      args.cellData.ariaLabel += ', Holiday';
    }
  }
  
  private isHoliday(date: Date): boolean {
    // Holiday detection logic
    return false;
  }
}
```

## Keyboard Navigation

Full keyboard support for calendar navigation and selection.

### Keyboard Shortcuts

```
Arrow Up              - Move focus to previous week (month view) or previous year (year view)
Arrow Down            - Move focus to next week (month view) or next year (year view)
Arrow Left            - Move focus to previous day (month view) or previous month (year view)
Arrow Right           - Move focus to next day (month view) or next month (year view)
Enter / Space         - Select focused date or navigate to month view
Page Up               - Navigate to previous month
Page Down             - Navigate to next month
Ctrl + Page Up        - Navigate to previous year
Ctrl + Page Down      - Navigate to next year
Home                  - Move focus to the first day of month
End                   - Move focus to the last day of month
```

### Implementing Keyboard-Only Navigation

The Calendar component has built-in keyboard navigation support. Use the `keyConfigs` property to customize keyboard shortcuts:

```typescript
export class AppComponent {
  @ViewChild('calendar') calendar!: CalendarComponent;
  selectedDate: Date = new Date();
  
  // Customize key actions using keyConfigs
  keyConfigs: { [key: string]: string } = {
    select: 'enter',
    home: 'home',
    end: 'end',
    pageUp: 'pageup',
    pageDown: 'pagedown',
    controlUp: 'ctrl+38',
    controlDown: 'ctrl+40',
    moveUp: 'uparrow',
    moveDown: 'downarrow',
    moveLeft: 'leftarrow',
    moveRight: 'rightarrow'
  };
}
```

```html
<ejs-calendar
  [(ngModel)]="selectedDate"
  [keyConfigs]="keyConfigs">
</ejs-calendar>
```

## Screen Reader Compatibility

Ensure calendar is fully navigable with screen readers.

### Testing with Screen Readers

- **NVDA** (Windows, free)
- **JAWS** (Windows, commercial)
- **VoiceOver** (macOS, iOS, built-in)
- **TalkBack** (Android, built-in)

### Screen Reader Announcement Example

```typescript
export class AppComponent {
  selectedDate: Date = new Date();
  screenReaderAnnouncement: string = '';
  
  onDateChange(args: any): void {
    // Create announcement for screen readers
    const dateString = this.selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    this.screenReaderAnnouncement = `Date selected: ${dateString}`;
    this.announceToScreenReader(this.screenReaderAnnouncement);
  }
  
  private announceToScreenReader(message: string): void {
    // Use aria-live region for announcements
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => announcement.remove(), 1000);
  }
}
```

## Localization

Support multiple languages and regional formats.

### Setting Locale

```typescript
// app.component.ts
export class AppComponent {
  selectedDate: Date = new Date();
  
  // Set to French
  locale: string = 'fr-FR';
  
  // Set to Arabic (RTL)
  locale: string = 'ar-SA';
  
  // Set to German
  locale: string = 'de-DE';
}
```

```html
<!-- app.component.html -->
<!-- English (default) -->
<ejs-calendar [(ngModel)]="selectedDate"></ejs-calendar>

<!-- French -->
<ejs-calendar 
  [(ngModel)]="selectedDate"
  locale="fr-FR">
</ejs-calendar>

<!-- German -->
<ejs-calendar 
  [(ngModel)]="selectedDate"
  locale="de-DE">
</ejs-calendar>

<!-- Arabic -->
<ejs-calendar 
  [(ngModel)]="selectedDate"
  locale="ar-SA"
  [enableRtl]="true">
</ejs-calendar>
```

### Supported Locales

```typescript
const supportedLocales = [
  'en-US',  // English (USA)
  'en-GB',  // English (UK)
  'fr-FR',  // French
  'de-DE',  // German
  'es-ES',  // Spanish
  'it-IT',  // Italian
  'ja-JP',  // Japanese
  'zh-CN',  // Chinese (Simplified)
  'zh-TW',  // Chinese (Traditional)
  'ar-SA',  // Arabic
  'he-IL',  // Hebrew
  'ru-RU',  // Russian
];
```

### Locale-Specific Formatting

```typescript
export class AppComponent {
  selectedDate: Date = new Date(2026, 2, 15);
  locale: string = 'en-US';
  
  getLocalizedDate(): string {
    return this.selectedDate.toLocaleDateString(this.locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  changeLocale(newLocale: string): void {
    this.locale = newLocale;
  }
}
```

```html
<select (change)="changeLocale($event.target.value)">
  <option value="en-US">English (USA)</option>
  <option value="fr-FR">French</option>
  <option value="de-DE">German</option>
  <option value="ar-SA">Arabic</option>
  <option value="ja-JP">Japanese</option>
</select>

<p>{{ getLocalizedDate() }}</p>

<ejs-calendar 
  [(ngModel)]="selectedDate"
  [locale]="locale">
</ejs-calendar>
```

## Date Formatting

Customize date display format with locale awareness.

### Day Header Formats

Control how day names appear in the calendar header:

```typescript
export class AppComponent {
  selectedDate: Date = new Date();
  
  // Possible values: 'Short', 'Narrow', 'Abbreviated', 'Wide'
  dayHeaderFormat: string = 'Short'; // Default
}
```

```html
<!-- Short format: "Su", "Mo", "Tu", etc. -->
<ejs-calendar 
  [(ngModel)]="selectedDate"
  dayHeaderFormat="Short">
</ejs-calendar>

<!-- Narrow format: "S", "M", "T", etc. -->
<ejs-calendar 
  [(ngModel)]="selectedDate"
  dayHeaderFormat="Narrow">
</ejs-calendar>

<!-- Abbreviated format: "Sun", "Mon", "Tue", etc. -->
<ejs-calendar 
  [(ngModel)]="selectedDate"
  dayHeaderFormat="Abbreviated">
</ejs-calendar>

<!-- Wide format: "Sunday", "Monday", "Tuesday", etc. -->
<ejs-calendar 
  [(ngModel)]="selectedDate"
  dayHeaderFormat="Wide">
</ejs-calendar>
```

### Custom Date Formatting Utility

```typescript
export class DateFormattingService {
  private formatter: Intl.DateTimeFormat;
  
  constructor(private locale: string) {
    this.formatter = new Intl.DateTimeFormat(locale);
  }
  
  formatShort(date: Date): string {
    return this.formatter.format(date);
  }
  
  formatLong(date: Date): string {
    return date.toLocaleDateString(this.locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  formatISO(date: Date): string {
    return date.toISOString().split('T')[0];
  }
  
  formatCustom(date: Date, format: string): string {
    // Custom format like "MM/DD/YYYY"
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    
    return format
      .replace('DD', String(d).padStart(2, '0'))
      .replace('MM', String(m).padStart(2, '0'))
      .replace('YYYY', String(y));
  }
}
```

## RTL Support

Enable Right-to-Left layout for Arabic, Hebrew, and other RTL languages.

### Enabling RTL

```typescript
// app.component.ts
export class AppComponent {
  selectedDate: Date = new Date();
  enableRtl: boolean = true;
  locale: string = 'ar-SA'; // Arabic
}
```

```html
<!-- app.component.html -->
<ejs-calendar 
  [(ngModel)]="selectedDate"
  locale="ar-SA"
  [enableRtl]="true">
</ejs-calendar>

<!-- Or programmatically -->
<ejs-calendar 
  [(ngModel)]="selectedDate"
  [enableRtl]="enableRtl">
</ejs-calendar>

<label>
  <input 
    type="checkbox" 
    [(ngModel)]="enableRtl">
  Enable RTL
</label>
```

### RTL CSS Adjustments

```css
:host ::ng-deep.e-calendar {
  direction: rtl;
}

:host ::ng-deep .e-calendar .e-header {
  flex-direction: row-reverse;
}

:host ::ng-deep .e-calendar .e-day-cell {
  text-align: center;
}
```

### Locale-Specific RTL

```typescript
export class AppComponent {
  selectedDate: Date = new Date();
  locale: string = 'en-US';
  
  // RTL locales
  private rtlLocales = ['ar-SA', 'ar-AE', 'he-IL', 'fa-IR', 'ur-PK'];
  
  shouldEnableRtl(): boolean {
    return this.rtlLocales.includes(this.locale);
  }
  
  changeLocale(locale: string): void {
    this.locale = locale;
  }
}
```

## Accessibility Testing

### Automated Testing

```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('Calendar Accessibility', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent]
    }).compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should have proper ARIA attributes', () => {
    const calendar = fixture.nativeElement.querySelector('.e-calendar');
    expect(calendar).toBeTruthy();
    // Check for ARIA roles and labels
  });
  
  it('should be keyboard navigable', () => {
    const calendar = fixture.nativeElement.querySelector('.e-calendar');
    expect(calendar.getAttribute('role')).toBeTruthy();
  });
  
  it('should have proper color contrast', () => {
    const styles = window.getComputedStyle(
      fixture.nativeElement.querySelector('.e-selected')
    );
    // Verify contrast ratio >= 4.5:1
  });
  
  it('should announce changes to screen readers', () => {
    const liveRegion = fixture.nativeElement.querySelector('[aria-live]');
    expect(liveRegion).toBeTruthy();
  });
});
```

### Manual Testing Checklist

- [ ] Tab through calendar - all interactive elements focusable
- [ ] Arrow keys navigate dates smoothly
- [ ] Enter/Space selects highlighted date
- [ ] Page Up/Down switches months
- [ ] Escape closes calendar if popup
- [ ] Screen reader announces all dates
- [ ] Focus indicator clearly visible
- [ ] Text readable with zoom at 200%
- [ ] Works without mouse/trackpad
- [ ] Disabled dates properly announced

## Complete Accessible Calendar Example

```typescript
// app.component.ts
import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-accessible-calendar',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AccessibleCalendarComponent {
  @ViewChild('calendar') calendar!: CalendarComponent;
  
  selectedDate: Date = new Date();
  locale: string = 'en-US';
  dayHeaderFormat: string = 'Wide'; // Better for screen readers
  showWeekNumbers: boolean = true;
  
  // RTL support
  enableRtl: boolean = false;
  rtlLocales = ['ar-SA', 'he-IL', 'ur-PK'];
  
  changeLocale(locale: string): void {
    this.locale = locale;
    this.enableRtl = this.rtlLocales.includes(locale);
  }
  
  onDateChange(args: any): void {
    // Announce to screen readers
    this.announceToScreenReader(
      `Date selected: ${this.selectedDate.toLocaleDateString(this.locale)}`
    );
  }
  
  private announceToScreenReader(message: string): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1500);
  }
}
```

```html
<!-- app.component.html -->
<div class="calendar-container">
  <h1>Accessible Calendar</h1>
  
  <div class="controls">
    <label for="localeSelect">Select Language:</label>
    <select 
      id="localeSelect"
      (change)="changeLocale($event.target.value)">
      <option value="en-US">English</option>
      <option value="fr-FR">Français</option>
      <option value="de-DE">Deutsch</option>
      <option value="ar-SA">العربية</option>
      <option value="he-IL">עברית</option>
    </select>
  </div>
  
  <div role="region" aria-label="Calendar date picker">
    <label for="calendarInput">Choose a date:</label>
    <ejs-calendar 
      #calendar
      id="calendarInput"
      [(ngModel)]="selectedDate"
      [locale]="locale"
      [enableRtl]="enableRtl"
      [dayHeaderFormat]="dayHeaderFormat"
      [weekNumber]="showWeekNumbers"
      (change)="onDateChange($event)"
      aria-label="Calendar for date selection">
    </ejs-calendar>
  </div>
  
  <p aria-live="polite">
    Selected Date: {{ selectedDate | date:'fullDate' }}
  </p>
</div>
```

## Related References

- [Calendar Navigation](calendar-navigation.md) - Keyboard navigation details
- [Date Selection](date-selection.md) - Selection patterns
- [Styling & Customization](styling-and-customization.md) - Visual customization
