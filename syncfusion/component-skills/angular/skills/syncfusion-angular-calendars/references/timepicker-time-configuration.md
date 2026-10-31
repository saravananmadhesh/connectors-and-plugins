# Time Configuration and Formatting

## Time Format Customization

The `format` property controls how time displays in the input field:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  
  // Different format examples
  format12Hour: string = 'hh:mm a';           // 02:30 PM
  format24Hour: string = 'HH:mm';              // 14:30
  formatWithSeconds: string = 'hh:mm:ss a';   // 02:30:45 PM
  formatNoSpace: string = 'hh:mma';            // 02:30PM
  formatGeneral: string = 'h:mm a';            // 2:30 PM
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <div>
    <label>12-Hour Format (hh:mm a):</label>
    <ejs-timepicker
      [(ngModel)]="selectedTime"
      [format]="format12Hour">
    </ejs-timepicker>
    <p>Display: {{ selectedTime | date:'shortTime' }}</p>
  </div>
  
  <div style="margin-top: 15px;">
    <label>24-Hour Format (HH:mm):</label>
    <ejs-timepicker
      [(ngModel)]="selectedTime"
      [format]="format24Hour">
    </ejs-timepicker>
    <p>Display: {{ selectedTime | date:'HH:mm' }}</p>
  </div>
  
  <div style="margin-top: 15px;">
    <label>With Seconds (hh:mm:ss a):</label>
    <ejs-timepicker
      [(ngModel)]="selectedTime"
      [format]="formatWithSeconds">
    </ejs-timepicker>
    <p>Display: {{ selectedTime | date:'mediumTime' }}</p>
  </div>
</div>
```

### Format Characters

| Character | Description | Example |
|-----------|-------------|---------|
| `h` | Hour in 12-hour format (1-12) | 2, 3, 11 |
| `hh` | Hour in 12-hour format, padded (01-12) | 02, 03, 11 |
| `H` | Hour in 24-hour format (0-23) | 2, 14, 23 |
| `HH` | Hour in 24-hour format, padded (00-23) | 02, 14, 23 |
| `m` | Minute (0-59) | 5, 30, 59 |
| `mm` | Minute, padded (00-59) | 05, 30, 59 |
| `s` | Second (0-59) | 5, 45 |
| `ss` | Second, padded (00-59) | 05, 45 |
| `a` | AM/PM | AM, PM |
| `A` | AM/PM uppercase | AM, PM |

## TimeFormatObject Usage

For more complex formatting, use the TimeFormatObject:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  
  // Using skeleton format
  skeletonFormat = { skeleton: 'Hms' };  // Hour, minute, second
  
  // Different skeleton combinations
  hourMinuteSkeleton = { skeleton: 'Hm' };        // 14:30
  hourMinuteSecondSkeleton = { skeleton: 'Hms' }; // 14:30:45
}
```

### Skeleton Format Options

| Skeleton | Result | Example |
|----------|--------|---------|
| `H` | Hour only | 14 |
| `Hm` | Hour, minute | 14:30 |
| `Hms` | Hour, minute, second | 14:30:45 |
| `h` | Hour (12-hour) | 2 |
| `hm` | Hour, minute (12-hour) | 2:30 |
| `hms` | Hour, minute, second (12-hour) | 2:30:45 |
| `hma` | Hour, minute, AM/PM | 2:30 PM |
| `hmsa` | Hour, minute, second, AM/PM | 2:30:45 PM |

## Step Intervals

Control the time increments in the popup list with the `step` property:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  
  step15: number = 15;   // 15-minute intervals
  step30: number = 30;   // 30-minute intervals (default)
  step60: number = 60;   // 60-minute intervals (hourly)
  step5: number = 5;     // 5-minute intervals
  step1: number = 1;     // 1-minute intervals (granular)
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <div>
    <label>15-Minute Intervals:</label>
    <ejs-timepicker
      [(ngModel)]="selectedTime"
      [step]="step15"
      format="hh:mm a">
    </ejs-timepicker>
    <p>Available: 12:00, 12:15, 12:30, 12:45, 1:00...</p>
  </div>
  
  <div style="margin-top: 15px;">
    <label>30-Minute Intervals (Default):</label>
    <ejs-timepicker
      [(ngModel)]="selectedTime"
      [step]="step30"
      format="hh:mm a">
    </ejs-timepicker>
    <p>Available: 12:00, 12:30, 1:00, 1:30...</p>
  </div>
  
  <div style="margin-top: 15px;">
    <label>60-Minute Intervals (Hourly):</label>
    <ejs-timepicker
      [(ngModel)]="selectedTime"
      [step]="step60"
      format="hh:mm a">
    </ejs-timepicker>
    <p>Available: 12:00, 1:00, 2:00, 3:00...</p>
  </div>
  
  <div style="margin-top: 15px;">
    <label>5-Minute Intervals:</label>
    <ejs-timepicker
      [(ngModel)]="selectedTime"
      [step]="step5"
      format="hh:mm a">
    </ejs-timepicker>
    <p>Available: 12:00, 12:05, 12:10, 12:15...</p>
  </div>
</div>
```

## Min/Max Time Constraints

Restrict the selectable time range:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  
  // Business hours: 9 AM to 5 PM
  businessMinTime: Date = new Date(2026, 2, 24, 9, 0);
  businessMaxTime: Date = new Date(2026, 2, 24, 17, 0);
  
  // Medical office: 8:30 AM to 4:30 PM
  medicalMinTime: Date = new Date(2026, 2, 24, 8, 30);
  medicalMaxTime: Date = new Date(2026, 2, 24, 16, 30);
  
  // All day constraint
  allDayMinTime: Date = new Date(2026, 2, 24, 0, 0);
  allDayMaxTime: Date = new Date(2026, 2, 24, 23, 59);
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <div>
    <label>Business Hours (9 AM - 5 PM):</label>
    <ejs-timepicker
      [(ngModel)]="selectedTime"
      [min]="businessMinTime"
      [max]="businessMaxTime"
      format="hh:mm a">
    </ejs-timepicker>
    <small>Only times between 9:00 AM and 5:00 PM are available</small>
  </div>
  
  <div style="margin-top: 15px;">
    <label>Medical Office (8:30 AM - 4:30 PM):</label>
    <ejs-timepicker
      [(ngModel)]="selectedTime"
      [min]="medicalMinTime"
      [max]="medicalMaxTime"
      format="hh:mm a">
    </ejs-timepicker>
    <small>Only times between 8:30 AM and 4:30 PM are available</small>
  </div>
</div>
```

### Min/Max Behavior

- **Times outside range are disabled** in the popup list (grayed out)
- **User cannot select times outside range** - disabled times cannot be clicked
- **Invalid input is rejected** - if user types outside range, value reverts to previous valid time
- **Works with any step interval** - constraints apply regardless of step value

## ScrollTo Position

Set the default scroll position in the time list when no value is selected:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date | null = null;  // No initial value
  
  // Scroll to 9 AM when opening
  scrollTo: Date = new Date(2026, 2, 24, 9, 0);
  
  // Different scroll positions
  morningScroll: Date = new Date(2026, 2, 24, 8, 0);
  afternoonScroll: Date = new Date(2026, 2, 24, 14, 0);
  eveningScroll: Date = new Date(2026, 2, 24, 18, 0);
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <div>
    <label>Scroll to 9 AM by Default:</label>
    <ejs-timepicker
      [(ngModel)]="selectedTime"
      [scrollTo]="scrollTo"
      format="hh:mm a"
      placeholder="Select time">
    </ejs-timepicker>
    <p *ngIf="selectedTime">Selected: {{ selectedTime | date:'shortTime' }}</p>
    <p *ngIf="!selectedTime">Opens scrolled to 9 AM position</p>
  </div>
  
  <div style="margin-top: 15px;">
    <label>Scroll to Afternoon (2 PM):</label>
    <ejs-timepicker
      [(ngModel)]="selectedTime"
      [scrollTo]="afternoonScroll"
      format="hh:mm a"
      placeholder="Select time">
    </ejs-timepicker>
  </div>
</div>
```

### When ScrollTo is Used

- **Initial load** with no selected value - list shows at scrollTo position
- **Value exists** - scrollTo is ignored, list scrolls to selected value
- **Value is set** - user interaction overrides scrollTo
- **Clearing value** - next open will scroll to scrollTo position again

## Time Configuration Examples

### Example 1: Medical Appointment Booking

Appointments available every 15 minutes during medical office hours:

```typescript
export class AppComponent {
  appointmentTime: Date | null = null;
  format: string = 'hh:mm a';
  step: number = 15;
  minTime: Date = new Date(2026, 2, 24, 8, 30);
  maxTime: Date = new Date(2026, 2, 24, 16, 30);
  scrollTo: Date = new Date(2026, 2, 24, 9, 0);
}
```

```html
<ejs-timepicker
  [(ngModel)]="appointmentTime"
  [format]="format"
  [step]="step"
  [min]="minTime"
  [max]="maxTime"
  [scrollTo]="scrollTo"
  placeholder="Select appointment time">
</ejs-timepicker>
```

### Example 2: Flight Departure Times

Flights depart every hour during operational hours:

```typescript
export class AppComponent {
  departureTime: Date | null = null;
  format: string = 'HH:mm';  // 24-hour format
  step: number = 60;         // Hourly intervals
  minTime: Date = new Date(2026, 2, 24, 6, 0);    // 6 AM
  maxTime: Date = new Date(2026, 2, 24, 22, 0);   // 10 PM
  scrollTo: Date = new Date(2026, 2, 24, 12, 0);  // Noon
}
```

### Example 3: Server Maintenance Window

30-second precision for system maintenance scheduling:

```typescript
export class AppComponent {
  maintenanceTime: Date | null = null;
  format: { skeleton: 'Hms' } = { skeleton: 'Hms' };  // HH:mm:ss
  step: number = 30;  // 30-second intervals
  minTime: Date = new Date(2026, 2, 24, 22, 0);   // 10 PM
  maxTime: Date = new Date(2026, 2, 24, 23, 59);  // 11:59 PM
}
```

```html
<ejs-timepicker
  [(ngModel)]="maintenanceTime"
  [format]="format"
  [step]="step"
  [min]="minTime"
  [max]="maxTime"
  placeholder="Select maintenance time">
</ejs-timepicker>
```

## Format and Step Best Practices

| Use Case | Format | Step | Min | Max |
|----------|--------|------|-----|-----|
| Appointments | `hh:mm a` | 15 | 8:00 AM | 5:00 PM |
| Flights | `HH:mm` | 60 | 6:00 | 22:00 |
| Medical | `hh:mm a` | 15 | 8:30 AM | 4:30 PM |
| Restaurant | `hh:mm a` | 30 | 11:00 AM | 10:00 PM |
| Server Maint | `HH:mm:ss` | 30 | 22:00 | 23:59 |
| Detailed | `hh:mm:ss a` | 5 | Any | Any |
| Hourly | `hh a` | 60 | Any | Any |
