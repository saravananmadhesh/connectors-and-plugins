# Calendar Styling & Customization

## Table of Contents
- [CSS Classes](#css-classes)
- [Theme Selection](#theme-selection)
- [Custom CSS Styling](#custom-css-styling)
- [Day Cell Customization](#day-cell-customization)
- [Dark Mode](#dark-mode)
- [Hover & Focus States](#hover--focus-states)
- [Responsive Design](#responsive-design)
- [Advanced Styling Techniques](#advanced-styling-techniques)

## CSS Classes

The Calendar component uses standard Syncfusion CSS classes for styling.

### Main Calendar Classes

| Class | Element | Purpose |
|-------|---------|---------|
| `.e-calendar` | Calendar wrapper | Main container |
| `.e-calendar-header` | Header section | Month/year display |
| `.e-day-header` | Day names row | Days of week headers |
| `.e-day-cell` | Individual day | Day cell in calendar |
| `.e-selected` | Selected dates | Highlighted selected date |
| `.e-disabled` | Disabled dates | Grayed out unavailable dates |
| `.e-today` | Today's date | Current date highlighting |
| `.e-other-month` | Other month dates | Dates from previous/next month |
| `.e-weekend` | Weekend dates | Saturday/Sunday highlighting |
| `.e-footer` | Footer area | Today button area |

### Using CSS Classes for Styling

```css
/* app.component.css */

/* Style the main calendar container */
:host ::ng-deep .e-calendar {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px;
}

/* Style calendar header */
:host ::ng-deep .e-calendar .e-calendar-header {
  background-color: #3f51b5;
  color: white;
  padding: 10px;
  border-radius: 4px 4px 0 0;
}

/* Style day cells */
:host ::ng-deep .e-calendar .e-day-cell {
  padding: 8px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* Style selected dates */
:host ::ng-deep .e-calendar .e-selected {
  background-color: #3f51b5;
  color: white;
  font-weight: bold;
}

/* Style disabled dates */
:host ::ng-deep .e-calendar .e-disabled {
  color: #cccccc;
  cursor: not-allowed;
  opacity: 0.5;
}

/* Style today's date */
:host ::ng-deep .e-calendar .e-today {
  background-color: #ff9800;
  color: white;
  border-radius: 50%;
}
```

## Theme Selection

Syncfusion provides multiple pre-built themes for the Calendar component.

### Available Themes

```typescript
// app.component.ts
export class AppComponent {
  selectedTheme: string = 'material3'; // Default theme
  
  themes: Array<{ name: string, value: string }> = [
    { name: 'Material 3', value: 'material3' },
    { name: 'Bootstrap 5', value: 'bootstrap5' },
    { name: 'Fluent Design', value: 'fluent' },
    { name: 'Tailwind', value: 'tailwind' },
    { name: 'Fabric', value: 'fabric' }
  ];
}
```

### Importing Themes

```css
/* styles.css - Global styles */

/* Material 3 Theme (Default) */
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/material3.css';

/* Bootstrap 5 Theme */
/* @import '../node_modules/@syncfusion/ej2-base/styles/bootstrap5.css';
   @import '../node_modules/@syncfusion/ej2-calendars/styles/bootstrap5.css'; */

/* Fluent Design Theme */
/* @import '../node_modules/@syncfusion/ej2-base/styles/fluent.css';
   @import '../node_modules/@syncfusion/ej2-calendars/styles/fluent.css'; */

/* Tailwind CSS Theme */
/* @import '../node_modules/@syncfusion/ej2-base/styles/tailwind.css';
   @import '../node_modules/@syncfusion/ej2-calendars/styles/tailwind.css'; */

/* Fabric Theme */
/* @import '../node_modules/@syncfusion/ej2-base/styles/fabric.css';
   @import '../node_modules/@syncfusion/ej2-calendars/styles/fabric.css'; */
```

### Dynamic Theme Switching

```typescript
export class AppComponent {
  selectedTheme: string = 'material3';
  
  changeTheme(theme: string): void {
    // Remove old theme
    const oldLink = document.getElementById('theme-link');
    if (oldLink) {
      oldLink.remove();
    }
    
    // Add new theme
    const baseLink = document.createElement('link');
    baseLink.rel = 'stylesheet';
    baseLink.href = `node_modules/@syncfusion/ej2-base/styles/${theme}.css`;
    document.head.appendChild(baseLink);
    
    const calendarLink = document.createElement('link');
    calendarLink.rel = 'stylesheet';
    calendarLink.id = 'theme-link';
    calendarLink.href = `node_modules/@syncfusion/ej2-calendars/styles/${theme}.css`;
    document.head.appendChild(calendarLink);
    
    this.selectedTheme = theme;
  }
}
```

```html
<select (change)="changeTheme($event.target.value)">
  <option *ngFor="let theme of themes" [value]="theme.value">
    {{ theme.name }}
  </option>
</select>
```

## Custom CSS Styling

Create custom styles for the Calendar component while respecting the theme.

### Custom Color Scheme

```css
/* app.component.css */

/* Custom color palette */
:host ::ng-deep {
  --primary-color: #1976d2;
  --accent-color: #ff4081;
  --success-color: #4caf50;
  --warning-color: #ff9800;
  --danger-color: #f44336;
}

/* Apply custom colors to calendar */
:host ::ng-deep .e-calendar .e-selected {
  background-color: var(--primary-color);
  color: white;
}

:host ::ng-deep .e-calendar .e-today {
  background-color: var(--accent-color);
  color: white;
}

/* Hover effect */
:host ::ng-deep .e-calendar .e-day-cell:hover {
  background-color: rgba(var(--primary-color), 0.1);
  transform: scale(1.05);
}
```

### Rounded Calendar Style

```css
:host ::ng-deep .e-calendar {
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

:host ::ng-deep .e-calendar .e-day-cell {
  border-radius: 6px;
  margin: 2px;
}

:host ::ng-deep .e-calendar .e-selected {
  border-radius: 6px;
}
```

### Material Design Style

```css
:host ::ng-deep .e-calendar {
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2),
              0 1px 1px 0 rgba(0, 0, 0, 0.14),
              0 1px 3px 0 rgba(0, 0, 0, 0.12);
}

:host ::ng-deep .e-calendar .e-day-cell {
  transition: background-color 0.2s ease;
}

:host ::ng-deep .e-calendar .e-day-cell:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

:host ::ng-deep .e-calendar .e-selected {
  background-color: #3f51b5;
  color: white;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2);
}
```

## Day Cell Customization

Use the `renderDayCell` event to customize individual day cells.

### Custom Day Cell Classes

```typescript
import { Component } from '@angular/core';
import { RenderDayCellEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedDate: Date = new Date();
  
  onRenderDayCell(args: RenderDayCellEventArgs): void {
    const date = args.date;
    const today = new Date();
    
    // Add custom classes
    if (date.toDateString() === today.toDateString()) {
      args.cellData.className = 'today-special';
    }
    
    // Weekend styling
    if (date.getDay() === 0 || date.getDay() === 6) {
      args.cellData.className = 'weekend';
    }
    
    // Past dates
    if (date < today) {
      args.cellData.className = 'past-date';
    }
    
    // Holiday styling
    if (this.isHoliday(date)) {
      args.cellData.className = 'holiday';
    }
  }
  
  private isHoliday(date: Date): boolean {
    const holidays = [
      new Date(2026, 11, 25), // Christmas
      new Date(2026, 0, 1),   // New Year
    ];
    
    return holidays.some(h => h.toDateString() === date.toDateString());
  }
}
```

```css
/* app.component.css */

/* Custom styles for day cells */
:host ::ng-deep .today-special {
  background-color: #ff9800 !important;
  color: white !important;
  font-weight: bold;
  border-radius: 50%;
}

:host ::ng-deep .weekend {
  color: #f44336;
}

:host ::ng-deep .past-date {
  color: #cccccc;
  text-decoration: line-through;
}

:host ::ng-deep .holiday {
  background-color: #ffcccc !important;
  color: #cc0000 !important;
  border: 2px solid #cc0000;
}
```

## Dark Mode

Implement dark mode for the Calendar component.

### Dark Mode CSS

```css
/* app.component.css */

/* Dark mode media query */
@media (prefers-color-scheme: dark) {
  :host ::ng-deep .e-calendar {
    background-color: #1e1e1e;
    color: #e0e0e0;
    border-color: #333333;
  }
  
  :host ::ng-deep .e-calendar .e-calendar-header {
    background-color: #2d2d2d;
    color: #ffffff;
  }
  
  :host ::ng-deep .e-calendar .e-day-cell {
    color: #e0e0e0;
  }
  
  :host ::ng-deep .e-calendar .e-day-cell:hover {
    background-color: #333333;
  }
  
  :host ::ng-deep .e-calendar .e-selected {
    background-color: #5e35b1;
    color: white;
  }
  
  :host ::ng-deep .e-calendar .e-today {
    background-color: #ff6f00;
  }
  
  :host ::ng-deep .e-calendar .e-disabled {
    color: #666666;
  }
}

/* Manual dark mode toggle */
:host ::ng-deep.dark-mode .e-calendar {
  background-color: #1e1e1e;
  color: #e0e0e0;
}

:host ::ng-deep.dark-mode .e-calendar .e-calendar-header {
  background-color: #2d2d2d;
}
```

### Conditional Dark Mode

```typescript
export class AppComponent {
  selectedDate: Date = new Date();
  darkMode: boolean = false;
  
  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
  
  // Detect system preference
  ngOnInit(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
  }
}
```

```html
<button (click)="toggleDarkMode()">
  {{ darkMode ? 'Light Mode' : 'Dark Mode' }}
</button>

<ejs-calendar 
  [(ngModel)]="selectedDate"
  [class.dark-mode]="darkMode">
</ejs-calendar>
```

## Hover & Focus States

Customize hover and focus states for better UX.

### Hover Effects

```css
:host ::ng-deep .e-calendar .e-day-cell {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:host ::ng-deep .e-calendar .e-day-cell:hover {
  background-color: rgba(63, 81, 181, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

:host ::ng-deep .e-calendar .e-day-cell:hover:not(.e-disabled) {
  cursor: pointer;
}
```

### Focus States

```css
/* Keyboard focus styling */
:host ::ng-deep .e-calendar .e-day-cell:focus {
  outline: 3px solid #1976d2;
  outline-offset: 2px;
}

/* Focus-visible for keyboard only */
:host ::ng-deep .e-calendar .e-day-cell:focus-visible {
  outline: 3px dashed #1976d2;
  outline-offset: 4px;
}
```

## Responsive Design

Make Calendar responsive for different screen sizes.

### Responsive CSS

```css
/* Desktop (default) */
:host ::ng-deep .e-calendar {
  width: 100%;
  max-width: 400px;
}

/* Tablet */
@media (max-width: 768px) {
  :host ::ng-deep .e-calendar {
    max-width: 100%;
    width: 100%;
  }
  
  :host ::ng-deep .e-calendar .e-day-cell {
    padding: 6px;
    font-size: 14px;
  }
}

/* Mobile */
@media (max-width: 480px) {
  :host ::ng-deep .e-calendar {
    max-width: 100%;
  }
  
  :host ::ng-deep .e-calendar .e-calendar-header {
    padding: 8px;
  }
  
  :host ::ng-deep .e-calendar .e-day-cell {
    padding: 4px;
    font-size: 12px;
  }
  
  :host ::ng-deep .e-calendar .e-day-header {
    font-size: 11px;
  }
}
```

### Flexible Layout

```typescript
export class AppComponent {
  selectedDate: Date = new Date();
  isMobile: boolean = false;
  
  ngOnInit(): void {
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
  }
  
  private checkIfMobile(): void {
    this.isMobile = window.innerWidth < 768;
  }
}
```

## Advanced Styling Techniques

### CSS Grid for Calendar Layout

```css
:host ::ng-deep .e-calendar {
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 10px;
}

:host ::ng-deep .e-calendar .e-calendar-header {
  grid-row: 1;
}

:host ::ng-deep .e-calendar .e-day-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

:host ::ng-deep .e-calendar .e-calendar-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}
```

### CSS Variables for Theming

```css
/* Define theme variables */
:root {
  --calendar-bg-color: #ffffff;
  --calendar-border-color: #e0e0e0;
  --calendar-text-color: #000000;
  --calendar-selected-bg: #3f51b5;
  --calendar-selected-text: #ffffff;
  --calendar-hover-bg: rgba(63, 81, 181, 0.1);
  --calendar-disabled-color: #cccccc;
  --calendar-today-bg: #ff9800;
}

/* Apply variables */
:host ::ng-deep .e-calendar {
  background-color: var(--calendar-bg-color);
  border-color: var(--calendar-border-color);
  color: var(--calendar-text-color);
}

:host ::ng-deep .e-calendar .e-selected {
  background-color: var(--calendar-selected-bg);
  color: var(--calendar-selected-text);
}
```

### Animation Effects

```css
/* Fade in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:host ::ng-deep .e-calendar {
  animation: fadeIn 0.3s ease-out;
}

/* Pulse animation for today */
@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(255, 152, 0, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(255, 152, 0, 0);
  }
}

:host ::ng-deep .e-calendar .e-today {
  animation: pulse 2s infinite;
}

/* Flip animation for selected */
@keyframes flip {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}

:host ::ng-deep .e-calendar .e-day-cell.selected {
  animation: flip 0.6s ease;
}
```

## Complete Styling Example

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-styled-calendar',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class StyledCalendarComponent {
  selectedDate: Date = new Date();
  darkMode: boolean = false;
  customColor: string = '#3f51b5';
  
  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
  }
  
  onRenderDayCell(args: any): void {
    if (args.date.getDay() === 0 || args.date.getDay() === 6) {
      args.cellData.className = 'weekend';
    }
  }
}
```

```html
<!-- app.component.html -->
<div [class.dark-mode]="darkMode" style="padding: 20px;">
  <div style="margin-bottom: 20px;">
    <button (click)="toggleDarkMode()">
      Toggle Dark Mode
    </button>
    
    <label style="margin-left: 20px;">
      Primary Color:
      <input 
        type="color" 
        [(ngModel)]="customColor"
        style="margin-left: 10px; cursor: pointer;">
    </label>
  </div>
  
  <ejs-calendar 
    [(ngModel)]="selectedDate"
    (renderDayCell)="onRenderDayCell($event)"
    [style.--primary-color]="customColor">
  </ejs-calendar>
</div>
```

```css
/* app.component.css */
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/material3.css';

:root {
  --primary-color: #3f51b5;
}

:host ::ng-deep .e-calendar {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

:host ::ng-deep .e-calendar .e-selected {
  background-color: var(--primary-color);
}

:host ::ng-deep .weekend {
  color: #f44336;
  font-weight: bold;
}

:host ::ng-deep.dark-mode .e-calendar {
  background-color: #1e1e1e;
  color: #e0e0e0;
}
```

## Related References

- [Accessibility & Globalization](accessibility-and-globalization.md) - Theme support
- [Calendar Views](calendar-views.md) - Component structure
- [Events & Methods](events-and-methods.md) - renderDayCell event
