# Calendar Styling and Customization

## Table of Contents
- [CSS Classes](#css-classes)
- [Custom Day Cell Styling](#custom-day-cell-styling)
- [Theme Integration](#theme-integration)
- [Header Customization](#header-customization)
- [Responsive Styling](#responsive-styling)
- [RenderDayCell Hook](#renderdaycell-hook)

---

## CSS Classes

The Calendar component applies these standard classes for styling:

```css
.e-calendar           /* Root container */
.e-month              /* Month view */
.e-year               /* Year view */
.e-decade             /* Decade view */
.e-calendar-view      /* Calendar grid container */
.e-header             /* Header with navigation */
.e-cell               /* Individual day/month/year cell */
.e-selected           /* Selected cell */
.e-today              /* Today's date cell */
.e-disabled           /* Disabled cell */
.e-other-month        /* Previous/next month's days */
```

### Apply Custom Class via cssClass Property

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  value: new Date(),
  cssClass: 'custom-calendar compact-theme'
});

calendar.appendTo('#calendar');
```

CSS:
```css
.e-calendar.custom-calendar {
  max-width: 300px;
  border: 2px solid #2196f3;
  border-radius: 8px;
}

.e-calendar.custom-calendar .e-selected {
  background-color: #2196f3;
  color: white;
}

.e-calendar.custom-calendar .e-today {
  font-weight: bold;
  border: 2px solid #ff9800;
}
```

---

## Custom Day Cell Styling

Use the `renderDayCell` event to apply custom styles to individual cells.

### Highlight Today

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const today = new Date();
const calendar = new Calendar({
  value: today,
  renderDayCell: (args: any) => {
    if (args.date.toDateString() === today.toDateString()) {
      args.element.classList.add('today-highlighted');
    }
  }
});

calendar.appendTo('#calendar');
```

CSS:
```css
.today-highlighted {
  background-color: #ffeb3b;
  border-radius: 50%;
  font-weight: bold;
}
```

### Stripe Weekends

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  value: new Date(),
  renderDayCell: (args: any) => {
    const dayOfWeek = args.date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      args.element.classList.add('weekend');
    }
  }
});

calendar.appendTo('#calendar');
```

CSS:
```css
.e-calendar .weekend {
  background-color: #e0e0e0;
  font-style: italic;
}
```

### Mark Special Dates (Birthdays, Holidays)

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const specialDates: { [key: string]: string } = {
  '6/10/2026': 'birthday',
  '12/25/2026': 'christmas',
  '1/1/2027': 'newyear'
};

const calendar = new Calendar({
  value: new Date(),
  renderDayCell: (args: any) => {
    const key = `${args.date.getMonth() + 1}/${args.date.getDate()}/${args.date.getFullYear()}`;
    if (key in specialDates) {
      const type = specialDates[key];
      args.element.classList.add(`special-${type}`);
    }
  }
});

calendar.appendTo('#calendar');
```

CSS:
```css
.e-calendar .special-birthday {
  background-color: #e91e63;
  color: white;
  border-radius: 50%;
}

.e-calendar .special-christmas {
  background-color: #4caf50;
  color: white;
  border-radius: 50%;
}

.e-calendar .special-newyear {
  background-color: #2196f3;
  color: white;
  border-radius: 50%;
}
```

---

## Theme Integration

### Applying Built-in Themes

Include the appropriate theme CSS file before initializing the Calendar:

```html
<!-- Material Theme -->
<link rel="stylesheet" href="node_modules/@syncfusion/ej2-base/styles/material.css" />
<link rel="stylesheet" href="node_modules/@syncfusion/ej2-calendars/styles/material.css" />

<!-- Bootstrap Theme -->
<link rel="stylesheet" href="node_modules/@syncfusion/ej2-base/styles/bootstrap.css" />
<link rel="stylesheet" href="node_modules/@syncfusion/ej2-calendars/styles/bootstrap.css" />

<!-- Fabric Theme -->
<link rel="stylesheet" href="node_modules/@syncfusion/ej2-base/styles/fabric.css" />
<link rel="stylesheet" href="node_modules/@syncfusion/ej2-calendars/styles/fabric.css" />

<!-- Material Dark Theme -->
<link rel="stylesheet" href="node_modules/@syncfusion/ej2-base/styles/material-dark.css" />
<link rel="stylesheet" href="node_modules/@syncfusion/ej2-calendars/styles/material-dark.css" />
```

### Dark Mode Support

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-theme');
  
  // Re-create calendar or update class
  const calendar = document.querySelector('.e-calendar') as any;
  if (body.classList.contains('dark-theme')) {
    calendar.classList.add('dark-theme');
  } else {
    calendar.classList.remove('dark-theme');
  }
}
```

---

## Header Customization

### Customize Day Header Format

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  value: new Date(),
  dayHeaderFormat: 'Short'  // 'Short' | 'Abbreviated' | 'Full'
});

calendar.appendTo('#calendar');
```

- `'Short'` → S, M, T, W, T, F, S
- `'Abbreviated'` → Sun, Mon, Tue, Wed, Thu, Fri, Sat
- `'Full'` → Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday

### Custom Header Text

Cannot directly customize header in Calendar, but you can display custom text in parent:

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

let currentMonth = new Date();

const calendar = new Calendar({
  value: currentMonth,
  navigated: (args: any) => {
    currentMonth = args.date;
    updateCustomHeader();
  }
});

calendar.appendTo('#calendar');

function updateCustomHeader() {
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();
  document.getElementById('customHeader')!.innerText = `${monthName} ${year}`;
}

updateCustomHeader();
```

HTML:
```html
<h2 id="customHeader"></h2>
<div id="calendar"></div>
```

---

## Responsive Styling

### Mobile Responsive Calendar

```css
/* Default (Desktop) */
.e-calendar {
  width: 350px;
  font-size: 14px;
}

/* Tablet */
@media (max-width: 768px) {
  .e-calendar {
    width: 100%;
    max-width: 320px;
    font-size: 13px;
  }
  
  .e-calendar .e-cell {
    padding: 8px;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .e-calendar {
    width: 100%;
    max-width: 280px;
    font-size: 12px;
  }
  
  .e-calendar .e-cell {
    padding: 6px;
  }
  
  .e-calendar .e-header {
    padding: 8px;
  }
}
```

### Full-width Calendar on Mobile

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

function initializeResponsiveCalendar() {
  const isMobile = window.innerWidth < 480;
  
  const calendar = new Calendar({
    value: new Date(),
    cssClass: isMobile ? 'mobile-calendar' : ''
  });
  
  calendar.appendTo('#calendar');
}

window.addEventListener('resize', () => {
  // Optionally re-initialize on resize
});

initializeResponsiveCalendar();
```

CSS:
```css
.e-calendar.mobile-calendar {
  width: 100%;
  max-width: 100%;
}
```

---

## RenderDayCell Hook

The `renderDayCell` hook is called for every day cell rendered. Use it to customize appearance and behavior.

### Hook Signature

```typescript
renderDayCell: (args: RenderDayCellEventArgs) => {
  args.date          // Date object for the cell
  args.element       // DOM element (HTMLTableCellElement)
  args.isDisabled    // boolean - set to true to disable
  args.isOtherMonth  // boolean - date from prev/next month
}
```

### Complete Example: Enterprise Calendar

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const today = new Date();
const disabledDates = [new Date(2026, 5, 15)];
const holidays = [new Date(2026, 11, 25), new Date(2027, 0, 1)];

const calendar = new Calendar({
  value: today,
  renderDayCell: (args: any) => {
    // Hide prev/next month dates
    if (args.isOtherMonth) {
      args.element.style.visibility = 'hidden';
    }
    
    // Disable specific dates
    if (disabledDates.some(d => d.toDateString() === args.date.toDateString())) {
      args.isDisabled = true;
      args.element.classList.add('disabled-date');
    }
    
    // Mark holidays
    if (holidays.some(h => h.toDateString() === args.date.toDateString())) {
      args.element.classList.add('holiday');
      args.element.setAttribute('data-tooltip', 'Holiday');
    }
    
    // Highlight today
    if (args.date.toDateString() === today.toDateString()) {
      args.element.classList.add('today');
    }
  }
});

calendar.appendTo('#calendar');
```

CSS:
```css
.e-calendar .today {
  background-color: #2196f3;
  color: white;
  border-radius: 50%;
  font-weight: bold;
}

.e-calendar .holiday {
  background-color: #ff5252;
  color: white;
  border-radius: 50%;
}

.e-calendar .disabled-date {
  opacity: 0.5;
  cursor: not-allowed;
}
```
