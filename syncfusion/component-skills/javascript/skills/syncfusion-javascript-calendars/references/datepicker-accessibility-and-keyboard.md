# DatePicker Accessibility and Keyboard Navigation

## Table of Contents
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [ARIA Attributes](#aria-attributes)
- [Screen Reader Support](#screen-reader-support)
- [Focus Management](#focus-management)
- [Keyboard Event Handling](#keyboard-event-handling)
- [Accessibility Patterns](#accessibility-patterns)

---

## Keyboard Shortcuts

The DatePicker supports the following keyboard interactions:

| Key | Action |
|-----|--------|
| `Alt + Down Arrow` | Open calendar popup |
| `Escape` | Close calendar popup |
| `Arrow Up` | Go to previous week date |
| `Arrow Down` | Go to next week date |
| `Arrow Left` | Go to previous day |
| `Arrow Right` | Go to next day |
| `Page Up` | Go to previous month |
| `Page Down` | Go to next month |
| `Ctrl + Page Up` | Go to previous year |
| `Ctrl + Page Down` | Go to next year |
| `Home` | Go to first day of month |
| `End` | Go to last day of month |
| `Enter` | Select focused date |
| `Space` | Select focused date |
| `Tab` | Move to next control |
| `Shift + Tab` | Move to previous control |

---

## ARIA Attributes

The DatePicker automatically includes ARIA attributes for screen reader accessibility:

```html
<div role="combobox" aria-label="Date picker" aria-expanded="false" aria-haspopup="dialog">
  <input type="text" aria-label="Date picker input" />
  <!-- Calendar popup with role="dialog" -->
</div>
```

### Key ARIA Properties

- `role="combobox"` — Identifies component as a date picker combo
- `aria-label` — Provides descriptive text (e.g., "Select your birth date")
- `aria-expanded="true/false"` — Indicates if popup is open
- `aria-haspopup="dialog"` — Indicates a calendar popup exists
- `aria-disabled="true/false"` — Marks component as disabled
- `aria-selected="true/false"` — Marks selected dates

---

## Screen Reader Support

### Proper Labeling

```html
<label for="birthdate">Date of Birth:</label>
<input id="birthdate" type="text" aria-label="Date of birth picker" />

<div id="date-status" aria-live="polite"></div>
```

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  format: 'MM/dd/yyyy',
  change: (args: any) => {
    // Announce change to screen readers
    const status = document.getElementById('date-status')!;
    status.innerText = `Date selected: ${args.value.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}`;
  }
});

picker.appendTo('#birthdate');
```

### Describe Purpose

```html
<div>
  <label for="event-date">Event Date:</label>
  <p id="event-date-hint">Select the date when your event will occur</p>
  <input id="event-date" type="text" aria-describedby="event-date-hint" />
</div>
```

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  format: 'yyyy-MM-dd',
  placeholder: 'YYYY-MM-DD'
});

picker.appendTo('#event-date');
```

---

## Focus Management

### Automatic Focus to Input

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  created: () => {
    // Focus on the input after creation
    const input = picker.element as HTMLInputElement;
    input.focus();
  }
});

picker.appendTo('#datepicker');
```

### Manage Popup Focus

When the popup opens, focus should move to the calendar. The DatePicker handles this automatically:

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  value: new Date(),
  created: () => {
    // Calendar focus automatically managed when popup opens
    console.log('DatePicker ready with automatic popup focus management');
  }
});

picker.appendTo('#datepicker');
```

### Return Focus After Selection

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

let previousActiveElement: Element | null = null;

const picker = new DatePicker({
  change: (args: any) => {
    // Return focus to input after selection
    if (picker.element) {
      (picker.element as HTMLInputElement).focus();
    }
  }
});

picker.appendTo('#datepicker');
```

---

## Keyboard Event Handling

### Respond to Keyboard Navigation

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  value: new Date()
});

picker.appendTo('#datepicker');

// Listen to keyboard events on the input
const input = picker.element as HTMLInputElement;

input.addEventListener('keydown', (e: KeyboardEvent) => {
  console.log(`Key pressed: ${e.key}, Code: ${e.code}`);

  if (e.key === 'Enter' && !picker.popupObject?.element.classList.contains('e-popup-open')) {
    console.log('User pressed Enter to open picker');
  }

  if (e.key === 'Escape' && picker.popupObject?.element.classList.contains('e-popup-open')) {
    console.log('User pressed Escape to close picker');
  }
});
```

### Custom Keyboard Shortcuts

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  value: new Date(),
  format: 'MM/dd/yyyy'
});

picker.appendTo('#datepicker');

const input = picker.element as HTMLInputElement;

input.addEventListener('keydown', (e: KeyboardEvent) => {
  // Ctrl + T: Set to today
  if (e.ctrlKey && e.key === 't') {
    e.preventDefault();
    picker.value = new Date();
    console.log('Set to today');
  }

  // Ctrl + Shift + 7: Set to 7 days from now
  if (e.ctrlKey && e.shiftKey && e.key === '&') {
    e.preventDefault();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    picker.value = futureDate;
    console.log('Set to 7 days ahead');
  }
});
```

---

## Accessibility Patterns

### Error Message Announcement

```html
<label for="dob">Date of Birth:</label>
<input id="dob" type="text" aria-invalid="false" aria-describedby="dob-error" />
<div id="dob-error" aria-live="polite" role="alert"></div>
```

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const minAge = 18;
const picker = new DatePicker({
  format: 'MM/dd/yyyy',
  change: (args: any) => {
    const age = calculateAge(args.value);
    const input = picker.element as HTMLInputElement;
    const errorDiv = document.getElementById('dob-error')!;

    if (age < minAge) {
      input.setAttribute('aria-invalid', 'true');
      errorDiv.innerText = `You must be at least ${minAge} years old.`;
    } else {
      input.setAttribute('aria-invalid', 'false');
      errorDiv.innerText = '';
    }
  }
});

picker.appendTo('#dob');

function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
```

### Disabled State Announcement

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  format: 'MM/dd/yyyy',
  enabled: false
});

picker.appendTo('#datepicker');

const input = picker.element as HTMLInputElement;
input.setAttribute('aria-disabled', 'true');

function toggleDisabled() {
  picker.enabled = !picker.enabled;
  input.setAttribute('aria-disabled', !picker.enabled ? 'true' : 'false');
  
  // Announce state change
  const status = document.getElementById('status')!;
  status.setAttribute('aria-live', 'polite');
  status.innerText = picker.enabled ? 'Date picker enabled' : 'Date picker disabled';
}
```

### Complete Accessible Form

```html
<form>
  <fieldset>
    <legend>Event Registration</legend>
    
    <div class="form-group">
      <label for="event-name">Event Name:</label>
      <input id="event-name" type="text" required />
    </div>
    
    <div class="form-group">
      <label for="event-date">Event Date:</label>
      <p id="event-date-help">Select the date your event will occur</p>
      <input id="event-date" type="text" aria-describedby="event-date-help" />
      <div id="event-date-error" aria-live="polite" role="alert"></div>
    </div>
    
    <button type="submit">Register Event</button>
  </fieldset>
</form>
```

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const picker = new DatePicker({
  min: new Date(),  // Cannot select past dates
  format: 'MM/dd/yyyy',
  change: (args: any) => {
    const errorDiv = document.getElementById('event-date-error')!;
    if (args.value < new Date()) {
      errorDiv.innerText = 'Event date must be in the future';
    } else {
      errorDiv.innerText = '';
    }
  }
});

picker.appendTo('#event-date');
```

---

## Testing Accessibility

### Test Checklist

- ✅ Test with keyboard only (no mouse)
- ✅ Verify all keyboard shortcuts work
- ✅ Test with screen readers (NVDA, JAWS, VoiceOver)
- ✅ Check focus indicators visible
- ✅ Verify color not sole means of communication
- ✅ Test zoom to 200% for readability
- ✅ Verify form labels properly associated
- ✅ Test error messages announced
- ✅ Verify RTL/LTR support
- ✅ Test with high contrast modes

### Screen Reader Testing Commands

**NVDA (Windows):**
- Insert + F7: Element list
- Insert + H: Reading mode
- Insert + Down Arrow: Read next

**JAWS (Windows):**
- Insert + F5: Virtual cursor
- Insert + Plus: Headings list
- F6: Tab to next landmark

**VoiceOver (macOS):**
- VO + U: Web rotor
- VO + Right Arrow: Next item
- VO + Down Arrow: Enter web area

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
