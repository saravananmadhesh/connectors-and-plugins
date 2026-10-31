---
name: syncfusion-javascript-calendars
description: Implement Calendar, DatePicker, DateRangePicker, DateTimePicker, and TimePicker components using Syncfusion JavaScript (EJ2) calendars library. Covers date/time selection, formatting, validation, localization, masking, accessibility, and advanced customization patterns.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Calendars"
  components:
    - Calendar
    - DatePicker
    - DateRangePicker
    - DateTimePicker
    - TimePicker
---

# Implementing Syncfusion JavaScript (EJ2) Calendars

## Calendar

The Syncfusion EJ2 **Calendar** is a highly customizable calendar UI control that allows users to select single or multiple dates. It supports multiple views (Month, Year, Decade), navigation, week numbers, disabled dates, custom day cell rendering, localization, RTL support, and full accessibility (WCAG 2.2 compliant).

### Quick Start (TypeScript)

#### Install

```bash
npm install @syncfusion/ej2-calendars @syncfusion/ej2-base
npm audit
```

#### Basic Example

```html
<div id="calendar"></div>
```

```typescript
import { Calendar } from '@syncfusion/ej2-calendars';

const calendar = new Calendar({
  value: new Date(),
  change: (args: any) => {
    console.log('Selected date:', args.value);
  }
});

calendar.appendTo('#calendar');
```

Notes:
- Use the `change` event to respond to selected date changes.
- Import theme CSS to style the control.
- No React state management needed — EJ2 handles internal state.

### Guidance & Patterns

- **Controlled component:** Access current value via `calendar.value` property and listen to `change` event.
- **Multi-selection:** Use `isMultiSelection: true` with `values` property and `addDate()`/`removeDate()` methods.
- **Programmatic navigation:** Call `navigateTo(view, date)` method — both arguments are required.
- **Date ranges:** For range selection, use DateRangePicker (separate component). Calendar does not have built-in range highlight mode.
- **Accessibility:** Calendar handles ARIA attributes automatically. Use wrapper elements with `role="region"` for additional context if needed.
- **Week numbers:** Enable with `weekNumber: true` property.

### References

Navigate to the reference that matches your current task:

#### Getting Started
📄 **Read:** [references/calendar-getting-started.md](references/calendar-getting-started.md)
- Installation and npm setup
- TypeScript component examples
- CSS/theme imports
- Using methods and event handling

#### Date Selection
📄 **Read:** [references/calendar-date-selection.md](references/calendar-date-selection.md)
- Single date selection
- Multiple dates and ranges
- Min/max constraints
- Disabling specific dates

#### Calendar Views
📄 **Read:** [references/calendar-calendar-views.md](references/calendar-calendar-views.md)
- Month, Year, Decade views
- Navigating between views
- Initial and depth controls
- Programmatic navigation

#### Styling & Customization
📄 **Read:** [references/calendar-styling-and-customization.md](references/calendar-styling-and-customization.md)
- Theme selection and switching
- CSS class customization
- Custom day cell rendering
- RTL and responsive design

#### Events & Methods
📄 **Read:** [references/calendar-events-and-methods.md](references/calendar-events-and-methods.md)
- Event handlers (change, created, renderDayCell)
- Using methods (navigateTo, addDate, removeDate)
- Advanced renderDayCell hook
- Event tracking patterns

#### Accessibility & Globalization
📄 **Read:** [references/calendar-accessibility-and-globalization.md](references/calendar-accessibility-and-globalization.md)
- WCAG 2.1 compliance
- Keyboard navigation
- ARIA attributes
- Locale support and RTL

#### API Reference (Quick Lookup)
📄 **Read:** [references/calendar-api-reference.md](references/calendar-api-reference.md)
- Props, events, methods at a glance
- Common enums and types
- Link to upstream docs

#### Troubleshooting & Tips

- **Styles not applied:** Confirm CSS imports point to `node_modules/@syncfusion/ej2-calendars/styles/` and are loaded before component initialization.
- **Value not updating:** Use the `change` event to update component state — EJ2 components notify changes through events, not automatic binding.
- **Multiple date selection not working:** Ensure `isMultiSelection: true` and use `values` array property for initial values.
- **`navigateTo` not working:** The method requires two arguments — `navigateTo(view: CalendarView, date: Date)`.
- **"Cannot find module":** Run `npm install @syncfusion/ej2-calendars @syncfusion/ej2-base` and confirm `package.json`.
- **Week numbers not showing:** Use `weekNumber: true` (not `showWeekNumber`).

## DatePicker

The Syncfusion EJ2 **DatePicker** provides an intuitive input control with a calendar popup for selecting a single date. It features flexible formatting, masked input, min/max date validation, strict mode, multiple input formats, custom day rendering, localization, and seamless form integration.

### Component Overview

The **DatePicker** is a Syncfusion EJ2 component for date selection with powerful features:

- **Calendar popup** - Visual date selection with navigation
- **Flexible formatting** - Display and input formats with pattern support
- **Masked input** - `enableMask` for segment-by-segment date entry with `maskPlaceholder`
- **Range validation** - Min/max dates with `strictMode` automatic correction
- **Multiple views** - Month, year, and decade views via `start` and `depth` properties
- **Day cell customization** - Disable weekends, highlight special dates via `renderDayCell` event
- **Full globalization** - 150+ cultures, RTL (`enableRtl`), locale-specific formatting, `firstDayOfWeek`
- **WCAG 2.2 compliant** - Full accessibility with keyboard navigation and ARIA attributes
- **Form ready** - Direct DOM binding, event-driven updates, form validation integration
- **Programmatic control** - `show()`, `hide()`, `focusIn()`, `focusOut()`, `navigateTo()`, `currentView()`

### Complete API Summary

#### Key Properties
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | Date | null | Selected date |
| `min` | Date | 1900-01-01 | Minimum selectable date |
| `max` | Date | 2099-12-31 | Maximum selectable date |
| `format` | string | null | Display format (e.g., `"dd/MM/yyyy"`) |
| `inputFormats` | string[] | null | Accepted input formats array |
| `placeholder` | string | null | Placeholder text for the input |
| `enabled` | boolean | true | Enable or disable the component |
| `readonly` | boolean | false | Readonly state |
| `allowEdit` | boolean | true | Allow editing the input textbox |
| `strictMode` | boolean | false | Auto-correct out-of-range dates |
| `showClearButton` | boolean | true | Show/hide the clear button |
| `showTodayButton` | boolean | true | Show/hide today button |
| `start` | CalendarView | Month | Initial view: `"Month"`, `"Year"`, `"Decade"` |
| `depth` | CalendarView | Month | Deepest navigation level |
| `enableMask` | boolean | false | Enable masked date input |
| `maskPlaceholder` | object | {...} | Segment placeholders for masked input |
| `enableRtl` | boolean | false | Right-to-left rendering |
| `locale` | string | '' | Culture/locale code |
| `firstDayOfWeek` | number | 0 | First day of week (0=Sunday) |
| `weekNumber` | boolean | false | Show week numbers |
| `weekRule` | WeekRule | FirstDay | Rule for first week of year |
| `calendarMode` | CalendarType | Gregorian | Calendar type (Gregorian or Islamic) |
| `dayHeaderFormat` | DayHeaderFormats | Short | Day name format in header |
| `floatLabelType` | FloatLabelType | Never | Floating label behavior |
| `fullScreenMode` | boolean | false | Full screen popup on mobile |
| `openOnFocus` | boolean | false | Open popup on input focus |
| `serverTimezoneOffset` | number | null | Server timezone offset |
| `cssClass` | string | null | Custom CSS class |
| `htmlAttributes` | object | {} | Additional HTML attributes |
| `keyConfigs` | object | null | Custom key action mappings |
| `width` | string \| number | null | Component width |
| `zIndex` | number | 1000 | Popup z-index |
| `enablePersistence` | boolean | false | Persist state between reloads |

#### Methods
| Method | Returns | Description |
|--------|---------|-------------|
| `show()` | void | Opens the calendar popup |
| `hide()` | void | Closes the calendar popup |
| `focusIn()` | void | Sets focus to the component |
| `focusOut()` | void | Removes focus from the component |
| `navigateTo(view, date)` | void | Navigates to a specific view and date |
| `currentView()` | string | Returns the current calendar view name |
| `getPersistData()` | string | Gets persisted state data |
| `destroy()` | void | Destroys the component |

#### Events
| Event | Args Type | Description |
|-------|-----------|-------------|
| `change` | ChangedEventArgs | Fires when the selected date changes |
| `focus` | FocusEventArgs | Fires when input gains focus |
| `blur` | BlurEventArgs | Fires when input loses focus |
| `open` | PopupEventArgs | Fires when the popup opens |
| `close` | PopupEventArgs | Fires when the popup closes |
| `cleared` | ClearedEventArgs | Fires when value is cleared |
| `created` | Object | Fires when component is created |
| `destroyed` | Object | Fires when component is destroyed |
| `navigated` | NavigatedEventArgs | Fires when calendar view is navigated |
| `renderDayCell` | RenderDayCellEventArgs | Fires when each day cell is rendered |

### Documentation & Navigation Guide

When you need help with DatePicker, guide to the appropriate reference:

#### Getting Started
📄 **Read:** [references/datepicker-getting-started.md](references/datepicker-getting-started.md)
- Installation via npm (@syncfusion/ej2-calendars)
- CSS theme imports (material3, bootstrap, fluent, tailwind)
- Component imports and setup
- Basic TypeScript implementation
- Running your first application

#### Date Formats & Input
📄 **Read:** [references/datepicker-date-formats-and-input.md](references/datepicker-date-formats-and-input.md)
- Display format property and patterns (yyyy-MM-dd, dd/MM/yyyy, etc.)
- Custom format specifiers (# and 0 patterns)
- Input formats for flexible date entry (accepting multiple formats)
- Format examples with real-world scenarios
- Parsing and converting user input automatically
- Culture-based default formatting

#### Date Range & Validation
📄 **Read:** [references/datepicker-date-range-and-validation.md](references/datepicker-date-range-and-validation.md)
- Min and max date properties for range restriction
- Range validation and error states
- strictMode for automatic out-of-range correction
- Out-of-range behavior and error handling
- Disabling dates outside valid range
- Edge cases and gotchas

#### Date Views & Navigation
📄 **Read:** [references/datepicker-date-views-and-navigation.md](references/datepicker-date-views-and-navigation.md)
- Start property (month, year, decade initial view)
- Depth property for restricting view levels
- Calendar navigation and user interactions
- Month and year selection shortcuts
- Navigating between different views
- Default behavior and best practices

#### Customization & Styling
📄 **Read:** [references/datepicker-customization-and-styling.md](references/datepicker-customization-and-styling.md)
- CSS classes for styling (e-datepicker, e-calendar, e-day, etc.)
- renderDayCell event for day customization
- Disabling specific dates and weekends
- Placeholder, disabled, and readonly states
- Custom CSS and theme customization
- Day cell appearance and behavior

#### Globalization & Localization
📄 **Read:** [references/datepicker-globalization-and-localization.md](references/datepicker-globalization-and-localization.md)
- Culture and locale configuration (German, French, Arabic, etc.)
- Loading CLDR data for internationalization
- Date format by culture (different countries, different formats)
- Locale text customization (today button, placeholder)
- Right-to-Left (RTL) support for Arabic, Hebrew, Urdu
- Week start day by culture
- Number formatting and calendar adjustments

#### Accessibility & Keyboard Navigation
📄 **Read:** [references/datepicker-accessibility-and-keyboard.md](references/datepicker-accessibility-and-keyboard.md)
- WCAG 2.2 compliance and accessibility standards
- Keyboard navigation shortcuts (Alt+Down, arrow keys, Esc)
- ARIA attributes (aria-expanded, aria-disabled, aria-activedescendant)
- Screen reader support and announcements
- Focus management and visible focus indicators
- Color contrast and visual accessibility
- Mobile device support

#### Date Masking & Advanced Validation
📄 **Read:** [references/datepicker-date-masking-and-strict-mode.md](references/datepicker-date-masking-and-strict-mode.md)
- `enableMask` property for structured segment-by-segment date input
- `maskPlaceholder` for custom segment placeholder text
- Date masking patterns for input guidance
- `strictMode` property behavior and enforcement
- Date parsing rules and validation logic
- Input validation and format enforcement
- Edge cases (leap years, month boundaries, etc.)
- Troubleshooting common validation issues
- Best practices for date input

### Quick Start Example

Here's a minimal working example to get started:

```html
<input id="datepicker" type="text" />
```

```typescript
import { DatePicker } from '@syncfusion/ej2-calendars';

const datepicker = new DatePicker({
  value: new Date(),
  change: (e: any) => {
    console.log('Selected date:', e.value);
  },
  placeholder: 'Enter date'
});

datepicker.appendTo('#datepicker');
```

**Key points:**
- Import `DatePicker` from `@syncfusion/ej2-calendars`
- Create an instance with `new DatePicker({...})`
- Use `appendTo()` to render in a target DOM element
- Use `change` event to react to date selection
- DatePicker opens a calendar popup on click or Alt+Down arrow

## DateRangePicker

The Syncfusion EJ2 **DateRangePicker** enables users to select a start and end date range with built-in support for presets, validation, custom formatting, separator configuration, full-screen mobile mode, and advanced range constraints (minDays, maxDays, min, max).

### Documentation Navigation Guide

#### Getting Started
📄 **Read:** [references/daterangepicker-getting-started.md](references/daterangepicker-getting-started.md)
- Installation via npm (@syncfusion/ej2-calendars)
- CSS imports and theme configuration
- Basic DateRangePicker implementation
- TypeScript component setup
- Running development server
- Common troubleshooting

#### Date Range Selection
📄 **Read:** [references/daterangepicker-date-range-selection.md](references/daterangepicker-date-range-selection.md)
- Start and end date properties
- Date range validation patterns
- Minimum and maximum date constraints
- Disabled dates configuration
- Date range presets (Last 7 days, Last 30 days, etc.)
- Value binding and two-way updates
- Read-only and disabled states
- Placeholder and labels

#### Date Range Formatting
📄 **Read:** [references/daterangepicker-date-range-formatting.md](references/daterangepicker-date-range-formatting.md)
- Date format string options (MM/dd/yyyy, dd-MMM-yyyy, etc.)
- Display format vs input format
- Locale-based date formatting
- Custom separator between start and end dates
- Float label types (Never, Always, Auto)
- Placeholder text customization
- htmlAttributes for DOM attributes

#### Events and Methods
📄 **Read:** [references/daterangepicker-events-and-methods.md](references/daterangepicker-events-and-methods.md)
- Event handlers (change, open, close, blur, focus, select)
- Event argument structures
- Methods (show, hide, focusIn, focusOut, reset, destroy)
- Direct method calls with component instance
- Lifecycle events (created, destroyed)
- Event patterns and best practices
- Clearing values and state reset
- DateRangeSelectingEvent and ChangedEventArgs

#### Customization and Styling
📄 **Read:** [references/daterangepicker-customization-and-styling.md](references/daterangepicker-customization-and-styling.md)
- CSS class customization with cssClass
- Theme options (Material, Bootstrap, Fluent, Tailwind, Fabric)
- Full-screen mode for mobile devices
- RTL (right-to-left) language support
- Preset ranges customization
- Z-index management
- Width and height configuration
- Accessibility features and ARIA attributes

#### API Reference
📄 **Read:** [references/daterangepicker-api-reference.md](references/daterangepicker-api-reference.md)
- Complete properties list (35+ properties)
- All methods with signatures (8 methods)
- All events with event arguments (12 events)
- Type definitions and interfaces
- Default values and constraints
- Use cases for each property and method

#### Advanced Patterns
📄 **Read:** [references/daterangepicker-advanced-patterns.md](references/daterangepicker-advanced-patterns.md)
- Form submission with date range validation
- Keyboard shortcuts and key navigation
- Server timezone offset handling
- Persistence and localStorage
- Multi-component integration (start/end date binding)
- Performance optimization with lazy loading
- Error handling and validation patterns
- Complex date range scenarios (fiscal years, quarters)

### Quick Start

```html
<input id="daterangepicker" type="text" />
```

```typescript
import { DateRangePicker } from '@syncfusion/ej2-calendars';

const drp = new DateRangePicker({
  placeholder: 'Select a range',
  change: (e: any) => {
    console.log('Start:', e.startDate, 'End:', e.endDate);
  }
});

drp.appendTo('#daterangepicker');
```

### Common Patterns

#### Pattern 1: Date Range with Min/Max Constraints
```typescript
const drp = new DateRangePicker({
  placeholder: 'Select a range in 2026',
  min: new Date(2026, 0, 1),
  max: new Date(2026, 11, 31),
  change: (e: any) => {
    console.log('Range:', e.startDate, '-', e.endDate);
  }
});

drp.appendTo('#drp');
```

#### Pattern 2: Date Range with Presets
```typescript
const drp = new DateRangePicker({
  placeholder: 'Select reporting period',
  presets: [
    { label: 'Today', start: new Date(), end: new Date() },
    { label: 'Last 7 Days', start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), end: new Date() },
    { label: 'Last 30 Days', start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), end: new Date() }
  ]
});

drp.appendTo('#drp');
```

## DateTimePicker

The Syncfusion EJ2 **DateTimePicker** combines date and time selection in a single control. It offers calendar + time list popup, customizable time steps, masking, strict validation, timezone handling, format customization, and full keyboard accessibility.

### Documentation (read these references in order)
- 📄 Read: [references/datetimepicker-getting-started.md](references/datetimepicker-getting-started.md) — installation, module setup, CSS imports, basic usage
- 📄 Read: [references/datetimepicker-api-reference.md](references/datetimepicker-api-reference.md) — full properties, methods, and events
- 📄 Read: [references/datetimepicker-date-time-selection.md](references/datetimepicker-date-time-selection.md) — selection patterns and constraints
- 📄 Read: [references/datetimepicker-time-configuration.md](references/datetimepicker-time-configuration.md) — step, minTime/maxTime, scroll behavior
- 📄 Read: [references/datetimepicker-events-and-methods.md](references/datetimepicker-events-and-methods.md) — event handlers and method usage
- 📄 Read: [references/datetimepicker-styling-and-customization.md](references/datetimepicker-styling-and-customization.md) — themes and cssClass usage
- 📄 Read: [references/datetimepicker-advanced-features.md](references/datetimepicker-advanced-features.md) — masked input, strict mode, calendar modes, timezone handling
- 📄 Read: [references/datetimepicker-accessibility.md](references/datetimepicker-accessibility.md) — keyboard and ARIA guidance

### Quick Start (TypeScript)

1. Install package:

```bash
npm install @syncfusion/ej2-calendars
npm audit
```

2. Import styles (in `index.css` or component CSS):

```css
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/material3.css';
```

3. Minimal example:

```html
<input id="datetimepicker" type="text" />
```

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker = new DateTimePicker({
  value: new Date(),
  format: 'dd/MM/yyyy hh:mm a',
  step: 15,
  placeholder: 'Select date and time',
  change: (args: any) => {
    console.log('Selected:', args.value);
  }
});

picker.appendTo('#datetimepicker');
```

### Common Patterns
- Direct value binding: Set `value` property and listen to `change` event.
- Range enforcement: Use `min`, `max` for dates, `minTime`/`maxTime` for times.
- Masked input: Enable with `enableMask` and provide `maskPlaceholder`.
- Localization: Set `locale` property for culture-specific formatting.
- Keyboard-first: Provide `keyConfigs` for custom shortcuts.

### Key Props Summary (see API reference for full list)
- `value`, `min`, `max`, `step`, `format`, `enableMask`, `placeholder`, `cssClass`, `locale`, `readonly`, `enabled`.

### Key Events
- `change`, `open`, `close`, `created`, `destroyed`, `navigated`, `blur`, `focus`, `renderDayCell`.

## TimePicker

The Syncfusion EJ2 **TimePicker** is a lightweight and feature-rich control for selecting time values. It supports 12/24-hour formats, time stepping, min/max constraints, masked input, localization, full-screen mode, and easy integration into HTML forms.

### Documentation Navigation Guide

#### Getting Started
📄 **Read:** [references/timepicker-getting-started.md](references/timepicker-getting-started.md)
- Installation via npm (@syncfusion/ej2-calendars)
- CSS imports and theme configuration
- Basic TimePicker implementation
- Component registration
- Running development server
- Common troubleshooting

#### Time Format and Display
📄 **Read:** [references/timepicker-time-format-and-display.md](references/timepicker-time-format-and-display.md)
- Format string options (24-hour, 12-hour formats)
- TimeFormatObject with skeleton property
- Locale-based time formatting
- Placeholder text customization
- Float label types (Never, Always, Auto)
- htmlAttributes for DOM attributes
- Masked input with enableMask
- Mask placeholder configuration

#### Time Range and Selection
📄 **Read:** [references/timepicker-time-range-and-selection.md](references/timepicker-time-range-and-selection.md)
- Minimum and maximum time constraints
- Time step intervals (15, 30, 60 minutes)
- ScrollTo default position
- Value binding and two-way updates
- Read-only and disabled states
- OpenOnFocus behavior
- Time popup list population
- Stepped time intervals

#### Events and Methods
📄 **Read:** [references/timepicker-events-and-methods.md](references/timepicker-events-and-methods.md)
- Event handlers (change, open, close, blur, focus)
- Event argument structures
- Methods (show, hide, focusIn, focusOut)
- Direct method calls on component instance
- Lifecycle events (created, destroyed)
- Event patterns and best practices
- Clearing values and state reset
- ItemRender for custom formatting

#### Customization and Styling
📄 **Read:** [references/timepicker-customization-and-styling.md](references/timepicker-customization-and-styling.md)
- CSS class customization with cssClass
- Theme options (Material, Bootstrap, Fluent, Tailwind)
- Full-screen mode for mobile devices
- RTL (right-to-left) language support
- Strict mode validation
- Z-index management
- Width and height configuration
- Accessibility features
- Theme Studio integration

#### API Reference
📄 **Read:** [references/timepicker-api-reference.md](references/timepicker-api-reference.md)
- Complete properties list (26 properties)
- All methods with signatures (5 methods)
- All events with event arguments (9 events)
- Type definitions and interfaces
- Default values and constraints
- Use cases for each property

#### Advanced Patterns
📄 **Read:** [references/timepicker-advanced-patterns.md](references/timepicker-advanced-patterns.md)
- Form submission with validation
- Keyboard shortcuts and keyConfigs
- Server timezone offset handling
- Persistence and localStorage
- Multi-component integration
- Performance optimization
- Error handling patterns
- Complex validation scenarios

### Quick Start

```html
<input id="timepicker" type="text" />
```

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const timepicker = new TimePicker({
  value: new Date('1/1/2018 9:00 AM'),
  change: (e: any) => {
    console.log('Selected time:', e.value);
  },
  placeholder: 'Select a time'
});

timepicker.appendTo('#timepicker');
```

### Common Patterns

#### Pattern 1: Time Picker with Min/Max Constraints

```typescript
const timepicker = new TimePicker({
  value: new Date('1/1/2018 9:00 AM'),
  min: new Date('1/1/2018 8:00 AM'),
  max: new Date('1/1/2018 5:00 PM'),
  step: 30,
  change: (e: any) => {
    console.log('Appointment time:', e.value);
  },
  placeholder: 'Choose time (8 AM - 5 PM)'
});

timepicker.appendTo('#timepicker');
```

#### Pattern 2: 12-Hour vs 24-Hour Format

```typescript
const timepicker12 = new TimePicker({
  format: 'hh:mm a',  // 12-hour with AM/PM
  placeholder: 'Select time'
});

const timepicker24 = new TimePicker({
  format: 'HH:mm',    // 24-hour
  placeholder: 'Select time'
});

timepicker12.appendTo('#timepicker12');
timepicker24.appendTo('#timepicker24');
```

#### Pattern 3: Event Handling

```typescript
const timepicker = new TimePicker({
  value: new Date(),
  change: (e: any) => {
    console.log('Changed to:', e.value?.toLocaleTimeString());
  },
  open: (e: any) => {
    console.log('Popup opened');
  },
  close: (e: any) => {
    console.log('Popup closed');
  }
});

timepicker.appendTo('#timepicker');
```

### Key Props Reference

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `value` | Date | null | Current selected time value |
| `format` | string | Based on culture | Time display format (e.g., "HH:mm", "hh:mm a") |
| `min` | Date | 00:00 | Minimum selectable time |
| `max` | Date | 00:00 | Maximum selectable time |
| `step` | number | 30 | Time interval in minutes between list items |
| `enabled` | boolean | true | Enable/disable the component |
| `readonly` | boolean | false | Read-only state (no editing) |
| `placeholder` | string | - | Input placeholder text |
| `openOnFocus` | boolean | false | Open popup on input focus |
| `enableMask` | boolean | false | Enable masked input mode |
| `enableRtl` | boolean | false | Enable right-to-left layout |
| `strictMode` | boolean | false | Validate input and restrict to valid times |
| `showClearButton` | boolean | true | Show/hide clear button |
| `fullScreenMode` | boolean | false | Mobile full-screen mode |
| `cssClass` | string | - | Custom CSS class for styling |
| `floatLabelType` | string | Never | Float label position |
| `allowEdit` | boolean | true | Allow manual input editing |
| `locale` | string | 'en-US' | Locale for time formatting |
| `scrollTo` | Date | - | Default scroll position in popup |
| `width` | string/number | - | Component width |
| `zIndex` | number | 1000 | Z-index of popup |
| `serverTimezoneOffset` | number | - | Server timezone offset for processing |
| `htmlAttributes` | object | {} | Custom HTML attributes |

---

**Next Steps:**
- Read [references/timepicker-getting-started.md](references/timepicker-getting-started.md) to install and set up your first TimePicker
- Explore [references/timepicker-time-format-and-display.md](references/timepicker-time-format-and-display.md) for format options
- Check [references/timepicker-time-range-and-selection.md](references/timepicker-time-range-and-selection.md) for time constraints
- See [references/timepicker-advanced-patterns.md](references/timepicker-advanced-patterns.md) for complex scenarios
