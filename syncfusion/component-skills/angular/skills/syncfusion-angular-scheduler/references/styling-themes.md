# Styling and Themes

## Table of Contents
- [Built-in Themes](#built-in-themes)
- [Custom CSS Class](#custom-css-class)
- [Common CSS Targets](#common-css-targets)
- [Scheduler Container](#scheduler-container)
- [Cells](#cells)
- [Appointments](#appointments)
- [Navigation](#navigation)
- [Best Practices](#best-practices)

Customize the Scheduler appearance using built-in themes, CSS customization, and styling properties.

## Built-in Themes

Syncfusion Scheduler supports multiple built-in themes. Install and import the desired theme CSS in your application:

```typescript
// In angular.json or styles.scss
@import '@syncfusion/ej2-material3-theme/styles/schedule/index.css';
```

**Available Themes**:
- `material` - Material Design
- `bootstrap5` - Bootstrap 5
- `bootstrap4` - Bootstrap 4
- `bootstrap` - Bootstrap 3
- `fabric` - Microsoft Fabric
- `tailwind` - Tailwind CSS
- `fluent` - Microsoft Fluent
- `material3` - Material Design 3
- `highcontrast` - High Contrast

## Custom CSS Class

Apply custom styles using the `cssClass` property:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
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
      cssClass='custom-scheduler'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'>
    </ejs-schedule>
  `,
  styles: [`
    .custom-scheduler.e-schedule {
      background-color: #f5f5f5;
    }
    
    .custom-scheduler .e-schedule-toolbar {
      background-color: #2196F3;
      color: white;
    }
    
    .custom-scheduler .e-work-hours {
      background-color: #fff9e6;
    }
    
    .custom-scheduler .e-appointment {
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public eventSettings: EventSettingsModel = { dataSource: [] };
}
```

## Common CSS Targets

### Scheduler Container
```css
.e-schedule { /* Main container */ }
.e-schedule-toolbar { /* Header toolbar */ }
```

### Cells
```css
.e-work-cells { /* Work cells (Day/Week/Month) */ }
.e-work-hours { /* Working hour cells */ }
.e-all-day-cells { /* All-day row cells */ }
.e-date-header-wrap { /* Date header row */ }
.e-time-cells-wrap { /* Time column */ }
```

### Appointments
```css
.e-appointment { /* Event block */ }
.e-appointment-details { /* Event content */ }
.e-subject { /* Event subject/title */ }
.e-location { /* Event location */ }
.e-time { /* Event time */ }
```

### Navigation
```css
.e-prev { /* Previous button */ }
.e-next { /* Next button */ }
.e-date-range { /* Date range text */ }
```

## Best Practices

1. **Theme Consistency**: Use one theme across all Syncfusion components
2. **ViewEncapsulation.None**: Required for global CSS targeting
3. **CSS Specificity**: Use `.your-class.e-schedule` for higher specificity
4. **Color Contrast**: Ensure WCAG-compliant contrast ratios
5. **Responsive Styles**: Use media queries for mobile adaptation
6. **Print Styles**: Add `@media print` rules for printing
7. **Dark Mode**: Provide dark theme option for user preference
8. **CSS Variables**: Use CSS custom properties for themeable values
9. **Font Loading**: Ensure custom fonts load before Scheduler renders
10. **Performance**: Minimize CSS selector complexity
