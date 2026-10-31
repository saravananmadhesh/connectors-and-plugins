# Calendar Accessibility and Globalization

## Table of Contents
- [Keyboard Navigation](#keyboard-navigation)
- [ARIA Attributes](#aria-attributes)
- [Localization](#localization)
- [RTL Support](#rtl-support)
- [Date Formats and Cultures](#date-formats-and-cultures)
- [Screen Reader Support](#screen-reader-support)

---

## Keyboard Navigation

The Calendar supports keyboard navigation for accessibility:

| Key | Action |
|-----|--------|
| `Arrow Up` | Go to same date in previous week |
| `Arrow Down` | Go to same date in next week |
| `Arrow Left` | Go to previous day |
| `Arrow Right` | Go to next day |
| `Ctrl + Up` | Navigate to Month view (from Month) |
| `Ctrl + Down` | Navigate to Day view (from Year/Decade) |
| `Page Up` | Go to previous month |
| `Page Down` | Go to next month |
| `Home` | Go to first day of month |
| `End` | Go to last day of month |
| `Enter` / `Space` | Select focused date |
| `Tab` | Move focus to next control |
| `Shift + Tab` | Move focus to previous control |

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  value: new Date()
});

calendar.appendTo('#calendar');

// Users can now navigate entirely with keyboard
```

---

## ARIA Attributes

The Calendar component automatically includes ARIA attributes for accessibility.

```html
<div id="calendar" role="application" aria-label="Calendar">
  <!-- Calendar markup with ARIA attributes -->
</div>
```

Key ARIA properties applied:
- `role="application"` — Identifies as interactive application
- `aria-label` — Descriptive label for the calendar
- `aria-selected="true/false"` — Indicates selected dates
- `aria-disabled="true/false"` — Marks disabled dates
- `aria-current="date"` — Marks today's date
- `aria-pressed` — Navigation buttons state

---

## Localization

### Changing the Locale

Use the `locale` property to set language and regional format.

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

// Load locale data first
import { loadCldrData } from '@syncfusion/ej2-base';

// Example locales
const calendar_de = new Calendar({
  value: new Date(),
  locale: 'de'  // German
});
calendar_de.appendTo('#calendar_de');

const calendar_es = new Calendar({
  value: new Date(),
  locale: 'es'  // Spanish
});
calendar_es.appendTo('#calendar_es');

const calendar_fr = new Calendar({
  value: new Date(),
  locale: 'fr'  // French
});
calendar_fr.appendTo('#calendar_fr');

const calendar_ja = new Calendar({
  value: new Date(),
  locale: 'ja'  // Japanese
});
calendar_ja.appendTo('#calendar_ja');
```

### Common Locales

- `'en'` — English (default)
- `'de'` — German
- `'es'` — Spanish
- `'fr'` — French
- `'ja'` — Japanese
- `'zh'` — Chinese
- `'ar'` — Arabic
- `'ru'` — Russian
- `'pt'` — Portuguese
- `'it'` — Italian

---

## RTL Support

Enable Right-to-Left layout for Arabic and Hebrew languages.

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  value: new Date(),
  locale: 'ar',     // Arabic
  enableRtl: true   // Enable RTL layout
});

calendar.appendTo('#calendar');
```

HTML with RTL:
```html
<html dir="rtl">
  <body>
    <div id="calendar"></div>
  </body>
</html>
```

### CSS for RTL

```css
body[dir="rtl"] .e-calendar {
  direction: rtl;
  text-align: right;
}

body[dir="rtl"] .e-calendar .e-header {
  flex-direction: row-reverse;
}
```

---

## Date Formats and Cultures

### Different Date Formats by Culture

The calendar automatically applies culture-specific date formats:

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

// US English: 12/25/2026
const calUS = new Calendar({
  value: new Date(2026, 11, 25),
  locale: 'en-US'
});
calUS.appendTo('#calUS');

// British English: 25/12/2026
const calGB = new Calendar({
  value: new Date(2026, 11, 25),
  locale: 'en-GB'
});
calGB.appendTo('#calGB');

// German: 25.12.2026
const calDE = new Calendar({
  value: new Date(2026, 11, 25),
  locale: 'de-DE'
});
calDE.appendTo('#calDE');

// French: 25/12/2026
const calFR = new Calendar({
  value: new Date(2026, 11, 25),
  locale: 'fr-FR'
});
calFR.appendTo('#calFR');
```

### Custom Date Formatting

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  value: new Date(),
  locale: 'en-US'
});

calendar.appendTo('#calendar');

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return date.toLocaleDateString('en-US', options);
}

// Result: "Thursday, December 25, 2026"
console.log(formatDate(new Date(2026, 11, 25)));
```

---

## Screen Reader Support

### HTML Structure with Labels

```html
<form>
  <label for="calendar-input">Select a date:</label>
  <div id="calendar" aria-labelledby="calendar-input"></div>
  
  <label for="selected-date">Selected date:</label>
  <output id="selected-date" aria-live="polite">No date selected</output>
</form>
```

### TypeScript with Screen Reader Updates

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  value: new Date(),
  change: (args: any) => {
    // Update output for screen reader to announce
    const output = document.getElementById('selected-date')!;
    output.innerText = args.value.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
});

calendar.appendTo('#calendar');
```

### Announce Navigation Changes

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  value: new Date(),
  navigated: (args: any) => {
    // Use aria-live region for navigation announcements
    const announcement = document.getElementById('calendar-announcement')!;
    const viewText = `Viewing ${args.view} for ${args.date.toLocaleDateString()}`;
    announcement.setAttribute('aria-live', 'polite');
    announcement.innerText = viewText;
  }
});

calendar.appendTo('#calendar');
```

HTML:
```html
<div id="calendar-announcement" class="sr-only" aria-live="polite"></div>
<div id="calendar"></div>
```

CSS for Screen Readers:
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## Complete Accessible Calendar Example

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

interface AccessibleCalendarOptions {
  containerId: string;
  locale: string;
  enableRtl: boolean;
  announceChanges: boolean;
}

class AccessibleCalendar {
  private calendar: Calendar;
  private options: AccessibleCalendarOptions;

  constructor(opts: AccessibleCalendarOptions) {
    this.options = opts;
    this.initializeCalendar();
  }

  private initializeCalendar() {
    this.calendar = new Calendar({
      locale: this.options.locale,
      enableRtl: this.options.enableRtl,
      value: new Date(),
      change: (args: any) => this.onDateChange(args),
      navigated: (args: any) => this.onNavigate(args)
    });

    this.calendar.appendTo(`#${this.options.containerId}`);
  }

  private onDateChange(args: any) {
    const selected = document.getElementById('selected-date')!;
    selected.innerText = args.value.toLocaleDateString(this.options.locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  private onNavigate(args: any) {
    if (this.options.announceChanges) {
      const announcement = document.getElementById('calendar-announcement')!;
      announcement.setAttribute('aria-live', 'polite');
      announcement.innerText = `Now viewing ${args.view}`;
    }
  }
}

// Initialize
const accessibleCal = new AccessibleCalendar({
  containerId: 'calendar',
  locale: 'de',
  enableRtl: false,
  announceChanges: true
});
```

---

## Accessibility Checklist

- ✅ Keyboard navigation enabled (arrow keys, Tab, Enter)
- ✅ ARIA labels and roles applied
- ✅ Date changes announced to screen readers
- ✅ High contrast mode supported (theme CSS)
- ✅ RTL support for Arabic/Hebrew
- ✅ Localization for multiple languages
- ✅ Disabled dates marked with aria-disabled
- ✅ Today highlighted with aria-current="date"
- ✅ Focus indicators visible
- ✅ Color not sole means of communication (text labels, icons also used)
