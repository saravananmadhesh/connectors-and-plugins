# Accessibility

## Table of Contents
- [Keyboard Navigation](#keyboard-navigation)
- [General Navigation](#general-navigation)
- [Cell Navigation](#cell-navigation)
- [Event Selection](#event-selection)
- [Enable Keyboard Interaction](#enable-keyboard-interaction)
- [Screen Reader Support](#screen-reader-support)
- [ARIA Attributes](#aria-attributes)
- [High Contrast Mode](#high-contrast-mode)
- [Color Contrast](#color-contrast)
- [Focus Indicators](#focus-indicators)
- [Best Practices](#best-practices)

The Scheduler is designed to be accessible to users with disabilities, supporting keyboard navigation, screen readers, and WCAG 2.2 compliance.

## Keyboard Navigation

The Scheduler provides comprehensive keyboard support:

### General Navigation

| Key | Action |
|-----|--------|
| Tab | Navigate between Scheduler elements |
| Shift + Tab | Navigate backwards |
| Enter | Open event editor or select element |
| Escape | Close popup or cancel action |
| Delete | Delete selected event |

### Cell Navigation

| Key | Action |
|-----|--------|
| Arrow keys | Move between cells |
| Home | Navigate to first cell of row |
| End | Navigate to last cell of row |
| Page Up | Navigate to previous week/month |
| Page Down | Navigate to next week/month |

### Event Selection

| Key | Action |
|-----|--------|
| Arrow keys | Navigate between events |
| Ctrl + Arrow keys | Move event (when selected) |
| Ctrl + C | Copy selected event |
| Ctrl + X | Cut selected event |
| Ctrl + V | Paste copied/cut event |

## Enable Keyboard Interaction

Keyboard navigation is enabled by default:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'
      [allowKeyboardInteraction]='true'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public eventSettings: EventSettingsModel = { dataSource: [] };
}
```

## Screen Reader Support

The Scheduler includes ARIA attributes for screen reader compatibility:

- **Role attributes**: Proper ARIA roles for grid, row, gridcell
- **Labels**: Descriptive labels for interactive elements
- **Live regions**: Announce dynamic content changes
- **Focus management**: Logical focus order

### ARIA Attributes

```html
<!-- Automatically applied by Scheduler -->
<div role="grid" aria-label="Event Scheduler">
  <div role="row">
    <div role="gridcell" aria-label="Monday, January 15, 2024, 9:00 AM">
      <div role="button" aria-label="Meeting with Team, 9:00 AM to 10:00 AM">
      </div>
    </div>
  </div>
</div>
```

## High Contrast Mode

Support Windows High Contrast mode by importing the high contrast theme:

```typescript
// In angular.json or styles.scss
@import '@syncfusion/ej2-angular-schedule/styles/highcontrast.css';
```

## Color Contrast

Ensure WCAG 2.2 Level AA compliance:

- **Text contrast**: Minimum 4.5:1 ratio for normal text
- **Large text**: Minimum 3:1 ratio for 18pt+ text
- **UI components**: Minimum 3:1 ratio for interactive elements

```css
/* Ensure sufficient contrast */
.e-schedule .e-appointment {
  color: #000000; /* Black text */
  background-color: #FFEB3B; /* Yellow background */
  /* Contrast ratio: 19.56:1 (WCAG AAA) */
}
```

## Focus Indicators

Provide visible focus indicators for keyboard users:

```css
.e-schedule .e-work-cells:focus,
.e-schedule .e-appointment:focus {
  outline: 2px solid #0078D4;
  outline-offset: 2px;
}
```

## Best Practices

1. **Keyboard Testing**: Test all functionality with keyboard only
2. **Screen Reader Testing**: Verify with NVDA, JAWS, or VoiceOver
3. **Focus Order**: Ensure logical tab order
4. **Error Messages**: Provide accessible error announcements
5. **Time Limits**: Avoid automatic timeouts or provide extensions
6. **Instructions**: Provide keyboard shortcut documentation
7. **Skip Links**: Add skip navigation for complex layouts
8. **Semantic HTML**: Use proper heading levels and landmarks
9. **Alt Text**: Provide alternative text for icons
10. **ARIA Labels**: Use descriptive labels for dynamic content
