# TimePicker API Reference

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | Date \| null | null | Gets or sets the time value |
| `format` | string | 'h:mm a' | Format string for time display (HH:mm, hh:mm aa, etc.) |
| `step` | number | 30 | Time interval in minutes (15, 30, 60) |
| `min` | Date | Jan 1, 1900 00:00 | Minimum time that can be selected |
| `max` | Date | Dec 31, 2099 23:59 | Maximum time that can be selected |
| `enabled` | boolean | true | Enable or disable the TimePicker |
| `readonly` | boolean | false | Set read-only mode |
| `placeholder` | string | 'Select a time' | Placeholder text for empty input |
| `cssClass` | string | '' | Custom CSS class for styling |
| `locale` | string | 'en' | Localization culture (en, de, ja, fr, etc.) |
| `enableRtl` | boolean | false | Enable right-to-left direction |
| `strictMode` | boolean | false | Strict input validation |
| `enableMask` | boolean | false | Input masking for time format |
| `floatLabelType` | string | 'Never' | Floating label behavior |

## Methods

| Method | Parameters | Return | Description |
|--------|------------|--------|-------------|
| `show()` | - | void | Open the time picker popup |
| `hide()` | - | void | Close the time picker popup |
| `focus()` | - | void | Set focus to the input element |
| `blur()` | - | void | Remove focus from the input element |
| `enable()` | - | void | Enable the TimePicker |
| `disable()` | - | void | Disable the TimePicker |
| `destroy()` | - | void | Destroy the TimePicker component |
| `refresh()` | - | void | Refresh the component |
| `reset()` | - | void | Reset the value to default |
| `getFormattedValue()` | value?: Date | string | Get formatted time string |

## Events

| Event | Arguments | Description |
|-------|-----------|-------------|
| `change` | TimePickerChangeEventArgs | Fires when the time value changes |
| `open` | object | Fires when the time picker popup opens |
| `close` | object | Fires when the time picker popup closes |
| `focus` | FocusEventArgs | Fires when input gets focus |
| `blur` | BlurEventArgs | Fires when input loses focus |
| `created` | object | Fires when component is created |
| `destroyed` | object | Fires when component is destroyed |

## Complete Example with All Features

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';

const picker = new TimePicker({
  // Value and Time
  value: new Date(2026, 0, 1, 14, 30),
  format: 'hh:mm aa',
  
  // Time Range
  min: new Date(2026, 0, 1, 9, 0),
  max: new Date(2026, 0, 1, 17, 0),
  
  // Intervals
  step: 30,
  
  // State and UI
  enabled: true,
  readonly: false,
  placeholder: 'Select meeting time',
  cssClass: 'meeting-time-picker',
  
  // Localization
  locale: 'en',
  enableRtl: false,
  
  // Input Behavior
  strictMode: false,
  enableMask: false,
  floatLabelType: 'Auto',
  
  // Event Handlers
  open: (args: any) => {
    console.log('TimePicker opened');
  },
  close: (args: any) => {
    console.log('TimePicker closed with value:', args.value);
  },
  change: (args: any) => {
    console.log('Time changed:', args.value);
    console.log('Previous value:', args.previousValue);
  },
  focus: (args: any) => {
    console.log('Input focused');
  },
  blur: (args: any) => {
    console.log('Input blurred');
  },
  created: (args: any) => {
    console.log('Component created');
  },
  destroyed: (args: any) => {
    console.log('Component destroyed');
  }
});

picker.appendTo('#timepicker');
```

## TimePickerChangeEventArgs

```typescript
interface TimePickerChangeEventArgs {
  value: Date;                    // New selected time
  previousValue: Date | null;    // Previously selected time
  element: HTMLElement;           // Input element
  isInteracted: boolean;          // Whether user interacted
}
```

## Usage Patterns

### Basic Time Selection

```typescript
const picker = new TimePicker({
  value: new Date(),
  format: 'hh:mm aa'
});
picker.appendTo('#timepicker');
```

### Time Range with Validation

```typescript
const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  min: new Date(2026, 0, 1, 9, 0),
  max: new Date(2026, 0, 1, 17, 0),
  change: (args: any) => {
    if (args.value < picker.min || args.value > picker.max) {
      console.log('Time out of range');
    }
  }
});
picker.appendTo('#timepicker');
```

### 24-Hour Business Hours

```typescript
const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  format: 'HH:mm',
  min: new Date(2026, 0, 1, 8, 0),
  max: new Date(2026, 0, 1, 20, 0),
  step: 15
});
picker.appendTo('#timepicker');
```

### Quarter-Hour Intervals

```typescript
const picker = new TimePicker({
  step: 15,
  format: 'hh:mm aa',
  value: new Date()
});
picker.appendTo('#timepicker');
```

### Disabled State

```typescript
const picker = new TimePicker({
  value: new Date(),
  enabled: false
});
picker.appendTo('#timepicker');
```

### Localization Examples

```typescript
// English (US)
const enPicker = new TimePicker({
  locale: 'en',
  format: 'hh:mm aa'
});

// German
const dePicker = new TimePicker({
  locale: 'de',
  format: 'HH:mm'
});

// French
const frPicker = new TimePicker({
  locale: 'fr',
  format: 'HH:mm'
});

// Arabic (RTL)
const arPicker = new TimePicker({
  locale: 'ar',
  enableRtl: true,
  format: 'HH:mm'
});
```

## Styling Classes

| Class | Target | Description |
|-------|--------|-------------|
| `.e-timepicker` | Root container | Main component wrapper |
| `.e-input-group` | Input group | Input container with icon |
| `.e-input` | Input element | Time input field |
| `.e-icon-btn` | Icon button | Time picker toggle button |
| `.e-popup` | Popup container | Time selection popup |
| `.e-list-item` | List item | Time option in popup |
| `.e-selected` | Selected item | Currently selected time |

## CSS Customization Template

```css
/* Custom styling for TimePicker */
.custom-timepicker {
  /* Input styling */
}

.custom-timepicker .e-input-group {
  border: 2px solid #007bff;
  border-radius: 4px;
}

.custom-timepicker .e-input {
  font-size: 14px;
  font-weight: 500;
}

.custom-timepicker .e-icon-btn {
  background-color: #f8f9fa;
  color: #007bff;
}

/* Popup styling */
.custom-timepicker .e-popup {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}

.custom-timepicker .e-list-item {
  padding: 8px 12px;
  border-bottom: 1px solid #e9ecef;
}

.custom-timepicker .e-list-item:hover {
  background-color: #e7f1ff;
}

.custom-timepicker .e-list-item.e-selected {
  background-color: #007bff;
  color: white;
}

/* Disabled state */
.custom-timepicker.e-disabled .e-input {
  background-color: #e9ecef;
  color: #6c757d;
}
```

## Best Practices

1. **Always set format explicitly** - Don't rely on defaults for consistency
2. **Validate time range** - Set appropriate min/max for business logic
3. **Use step intervals** - Align with business requirements (15, 30, 60 mins)
4. **Handle events properly** - Validate on change event, not after
5. **Provide clear feedback** - Show validation messages to users
6. **Test localization** - Ensure proper display in target locales
7. **Consider accessibility** - Use proper labels and ARIA attributes
8. **Optimize performance** - Avoid heavy operations in change event

## Related Components

- **DatePicker**: Select date only
- **DateTimePicker**: Select both date and time
- **DateRangePicker**: Select date range
- **Calendar**: Display calendar grid
