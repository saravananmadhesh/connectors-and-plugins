# API Reference

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Interfaces & Types](#interfaces--types)
- [CSS Classes](#css-classes)
- [Browser Support](#browser-support)

## Properties

### Data Binding Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `startDate` | `Date` | `null` | Gets or sets the start date of the date range |
| `endDate` | `Date` | `null` | Gets or sets the end date of the date range |
| `value` | `Date[]` \| `DateRange` | `null` | Gets or sets the value (alternative to startDate/endDate) |
| `format` | `string` \| `RangeFormatObject` | `null` | Date display format string |
| `separator` | `string` | `'-'` | Separator between start and end dates |

### Configuration Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `placeholder` | `string` | `null` | Placeholder text in input field |
| `locale` | `string` | `'en-US'` | Locale code for date formatting and labels |
| `enabled` | `boolean` | `true` | Enable or disable the component |
| `readonly` | `boolean` | `false` | Make input read-only |
| `allowEdit` | `boolean` | `true` | Allow manual text input of dates |
| `openOnFocus` | `boolean` | `false` | Open picker when input receives focus |
| `strictMode` | `boolean` | `false` | Enforce strict date validation |
| `showClearButton` | `boolean` | `true` | Display clear button in input |

### Constraint Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `min` | `Date` | `new Date(1900, 0, 1)` | Minimum selectable date |
| `max` | `Date` | `new Date(2099, 11, 31)` | Maximum selectable date |
| `minDays` | `number` | `null` | Minimum number of days in range |
| `maxDays` | `number` | `null` | Maximum number of days in range |
| `firstDayOfWeek` | `number` | `0` | First day of week (0=Sunday, 1=Monday, etc.) |

### Display Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `width` | `number \| string` | `''` | Component width |
| `cssClass` | `string` | `''` | Custom CSS classes |
| `dayHeaderFormat` | `DayHeaderFormats` | `'Short'` | Day header format (Short, Narrow, Abbreviated, Wide) |
| `depth` | `CalendarView` | `'Month'` | Maximum calendar view (Month, Year, Decade) |
| `start` | `CalendarView` | `'Month'` | Initial view of the Calendar when opened |
| `weekNumber` | `boolean` | `false` | Display week number in every week row |
| `weekRule` | `WeekRule` | `'FirstDay'` | Rule for defining the first week of the year |
| `enableRtl` | `boolean` | `false` | Enable right-to-left layout |
| `enablePersistence` | `boolean` | `false` | Persist component state |
| `fullScreenMode` | `boolean` | `false` | Display popup full screen on mobile devices |
| `zIndex` | `number` | `1000` | Popup z-index value |

### Preset Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `presets` | `PresetsModel[]` | `null` | Array of preset date ranges |

### Formatting Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `inputFormats` | `string[] \| RangeFormatObject[]` | `null` | Allowed input date formats |
| `serverTimezoneOffset` | `number` | `null` | Server timezone offset in minutes |

### HTML Attributes

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `htmlAttributes` | `Object` | `{}` | Additional HTML attributes |
| `floatLabelType` | `FloatLabelType` | `'Never'` | Floating label behavior |
| `keyConfigs` | `Object` | `null` | Custom keyboard configurations |

## Methods

### Interaction Methods

**`show(): void`**
- Opens the date range picker popup

```typescript
@ViewChild('daterangepicker') drp!: DateRangePickerComponent;

openPicker(): void {
  this.drp.show();
}
```

**`hide(): void`**
- Closes the date range picker popup

```typescript
closePicker(): void {
  this.drp.hide();
}
```

**`focusIn(): void`**
- Sets focus to the input element

```typescript
setFocus(): void {
  this.drp.focusIn();
}
```

**`focusOut(): void`**
- Removes focus from the input element

```typescript
removeFocus(): void {
  this.drp.focusOut();
}
```

### Data Methods

**`getSelectedRange(): Object`**
- Returns the currently selected date range

```typescript
getRange(): void {
  const range = this.drp.getSelectedRange();
  console.log('Start:', range.startDate);
  console.log('End:', range.endDate);
  console.log('Days:', range.daySpan);
}
```

**Returns:** 
```typescript
{
  startDate: Date;
  endDate: Date;
  daySpan: number;
}
```

### Lifecycle Methods

**`destroy(): void`**
- Destroy the component and clean up resources

```typescript
destroyComponent(): void {
  this.drp.destroy();
}
```

**`getPersistData(): string`**
- Get component persistence data

```typescript
savePersistenceData(): void {
  const data = this.drp.getPersistData();
  localStorage.setItem('drpData', data);
}
```

## Events

### Selection Events

**`change: RangeEventArgs`**
Fires when the date range changes

```typescript
onRangeChange(args: RangeEventArgs): void {
  console.log('Start Date:', args.startDate);
  console.log('End Date:', args.endDate);
  console.log('Day Span:', args.daySpan);
  console.log('Is Interacted:', args.isInteracted);
}
```

**Event Arguments:**
- `startDate: Date` - Start date of the range
- `endDate: Date` - End date of the range
- `daySpan: number` - Number of days between dates
- `element: HTMLElement` - The input element
- `event: Event` - DOM event object
- `isInteracted: boolean` - Whether user interacted
- `text: string` - Formatted range text
- `type: string` - Event type

**`select: RangeEventArgs`**
Fires when user selects a date range

```typescript
onRangeSelect(args: RangeEventArgs): void {
  console.log('Range selected:', args);
}
```

### Lifecycle Events

**`created: Object`**
Fires when component is initialized

```typescript
onCreated(): void {
  console.log('DateRangePicker created');
}
```

**`destroyed: Object`**
Fires when component is destroyed

```typescript
onDestroyed(): void {
  console.log('DateRangePicker destroyed');
}
```

### UI Events

**`open: Object`**
Fires when the picker popup opens

```typescript
onOpen(): void {
  console.log('Picker opened');
}
```

**`close: Object`**
Fires when the picker popup closes

```typescript
onClose(): void {
  console.log('Picker closed');
}
```

### Render Events

**`renderDayCell: RenderDayCellEventArgs`**
Fires for each day cell rendering

```typescript
onRenderDayCell(args: RenderDayCellEventArgs): void {
  // Disable weekends
  if (args.date.getDay() === 0 || args.date.getDay() === 6) {
    args.isDisabled = true;
  }
}
```

**Event Arguments:**
- `date: Date` - The date being rendered
- `element: HTMLElement` - The cell element
- `isDisabled: boolean` - Whether date is disabled
- `isOutOfRange: boolean` - Whether date is outside valid range
- `name: string` - Event name

### Navigation Events

**`navigated: NavigatedEventArgs`**
Fires when the Calendar is navigated to another view or within the same level of view

```typescript
onNavigated(args: NavigatedEventArgs): void {
  console.log('Navigated to view:', args.view);
  console.log('Navigation date:', args.date);
}
```

### Cleared Event

**`cleared: ClearedEventArgs`**
Fires when the DateRangePicker value is cleared using the clear button

```typescript
onCleared(args: ClearedEventArgs): void {
  console.log('DateRangePicker cleared');
}
```

### Blur/Focus Events

**`blur: BlurEventArgs`**
Fires when component loses focus

```typescript
onBlur(args: BlurEventArgs): void {
  console.log('DateRangePicker blurred');
}
```

**`focus: FocusEventArgs`**
Fires when component receives focus

```typescript
onFocus(args: FocusEventArgs): void {
  console.log('DateRangePicker focused');
}
```

## Interfaces & Types

### RangeEventArgs

```typescript
interface RangeEventArgs {
  startDate?: Date;         // Start date of range
  endDate?: Date;           // End date of range
  daySpan?: number;         // Days between start and end
  element?: HTMLElement;    // Input element
  event?: Event;            // DOM event
  isInteracted?: boolean;   // User interaction flag
  text?: string;            // Formatted range text
  type?: string;            // Event type name
  name?: string;            // Event name
  cancel?: boolean;         // Cancel event flag
}
```

### RenderDayCellEventArgs

```typescript
interface RenderDayCellEventArgs {
  date: Date;               // Date being rendered
  element: HTMLElement;     // Cell DOM element
  isDisabled?: boolean;     // Disabled state
  isOutOfRange?: boolean;   // Out of valid range
  name?: string;            // Event name
}
```

### PresetsModel

```typescript
interface PresetsModel {
  label: string;            // Display label
  start: Date;              // Start date of preset
  end: Date;                // End date of preset
}
```

### DateRange

```typescript
interface DateRange {
  startDate: Date;          // Start date
  endDate: Date;            // End date
}
```

### NavigatedEventArgs

```typescript
interface NavigatedEventArgs {
  date?: Date;               // Current navigation date
  event?: Event;             // DOM event
  view?: string;             // Current view (Month, Year, Decade)
  name?: string;             // Event name
  cancel?: boolean;          // Can cancel navigation
}
```

### ClearedEventArgs

```typescript
interface ClearedEventArgs {
  event?: Event;             // DOM event
  name?: string;             // Event name
}
```

### CalendarView

```typescript
type CalendarView = 'Month' | 'Year' | 'Decade';
```

### DayHeaderFormats

```typescript
type DayHeaderFormats = 'Short' | 'Narrow' | 'Abbreviated' | 'Wide';
```

### FloatLabelType

```typescript
type FloatLabelType = 'Auto' | 'Always' | 'Never';
```

### WeekRule

```typescript
type WeekRule = 'FirstDay' | 'FirstFourDayWeek' | 'FirstFullWeek';
```

## CSS Classes

### Component Classes

| Class | Purpose |
|-------|---------|
| `.e-daterangepicker` | Main component container |
| `.e-input` | Input field |
| `.e-input-group` | Input group wrapper |
| `.e-input-group-icon` | Calendar icon |
| `.e-calendar` | Calendar popup |
| `.e-range-header` | Range header section |
| `.e-popup` | Popup container |
| `.e-apply` | Apply button |
| `.e-cancel` | Cancel button |

### Day Cell Classes

| Class | Purpose |
|-------|---------|
| `.e-day` | Individual day cell |
| `.e-selected` | Selected date |
| `.e-today` | Today's date |
| `.e-disabled` | Disabled date |
| `.e-focused-date` | Focused date |
| `.e-out-of-range` | Out of range date |

### State Classes

| Class | Purpose |
|-------|---------|
| `.e-bigger` | Bigger/touch-friendly size |
| `.e-small` | Smaller/compact size |
| `.e-flat` | Flat styling |
| `.e-css` | CSS theme indicator |

## Browser Support

### Supported Browsers

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | Latest 2 versions | ✓ Full |
| Firefox | Latest 2 versions | ✓ Full |
| Safari | Latest 2 versions | ✓ Full |
| Edge | Latest 2 versions | ✓ Full |
| Opera | Latest 2 versions | ✓ Full |
| Internet Explorer | 11+ | ⚠ Limited |

### Browser-Specific Features

**Mobile Browsers:**
- Chrome for Android - Full support
- Safari iOS - Full support
- Samsung Internet - Full support
- Firefox Android - Full support

**Accessibility:**
- NVDA (Windows) - Full support
- JAWS (Windows) - Full support
- VoiceOver (macOS/iOS) - Full support
- TalkBack (Android) - Full support

## Complete Example with All Features

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { DateRangePickerComponent, RangeEventArgs, RenderDayCellEventArgs } from '@syncfusion/ej2-angular-calendars';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-complete',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class CompleteExampleComponent implements OnInit {
  @ViewChild('daterangepicker') drp!: DateRangePickerComponent;
  
  form: FormGroup;
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 31);
  
  minDate: Date = new Date(2020, 0, 1);
  maxDate: Date = new Date(2030, 11, 31);
  minDays: number = 7;
  maxDays: number = 90;
  
  locale: string = 'en-US';
  enableRtl: boolean = false;
  format: string = 'mm/dd/yyyy';
  separator: string = ' - ';
  
  presets: any[] = [
    { label: 'Last 7 Days', start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), end: new Date() },
    { label: 'This Month', start: new Date(new Date().getFullYear(), new Date().getMonth(), 1), end: new Date() }
  ];
  
  rangeInfo: string = '';
  validationError: string = '';
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      dateRange: [{ startDate: this.startDate, endDate: this.endDate }, Validators.required]
    });
  }
  
  ngOnInit(): void {
    // Component initialization
  }
  
  onRangeChange(args: RangeEventArgs): void {
    if (args.daySpan < this.minDays) {
      this.validationError = `Minimum ${this.minDays} days required`;
    } else if (args.daySpan > this.maxDays) {
      this.validationError = `Maximum ${this.maxDays} days allowed`;
    } else {
      this.validationError = '';
      this.rangeInfo = `Selected: ${args.daySpan} days`;
    }
  }
  
  onRenderDayCell(args: RenderDayCellEventArgs): void {
    // Disable weekends
    if (args.date.getDay() === 0 || args.date.getDay() === 6) {
      args.isDisabled = true;
    }
  }
  
  selectPreset(preset: any): void {
    this.startDate = preset.start;
    this.endDate = preset.end;
  }
  
  getRange(): void {
    const range = this.drp.getSelectedRange();
    console.log('Current range:', range);
  }
  
  setFocus(): void {
    this.drp.focusIn();
  }
  
  removeFocus(): void {
    this.drp.focusOut();
  }
}
```

---

**For implementation examples and best practices, refer to the main SKILL.md guide.**
