# DatePicker API Reference (Vue 3)

## Component: `ejs-datepicker`

---

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | Date | null | Selected date value |
| `format` | string | "M/d/y" | Date format pattern |
| `placeholder` | string | "Select a date" | Input placeholder text |
| `readonly` | boolean | false | Disable date picking |
| `disabled` | boolean | false | Disable component |

### Range Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `min` | Date | null | Minimum selectable date |
| `max` | Date | null | Maximum selectable date |
| `start` | string | "Month" | Initial view (Month/Year/Decade) |
| `depth` | string | "Month" | Max depth for navigation |

### Appearance Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `locale` | string | "en" | Locale for date labels |
| `enableRtl` | boolean | false | Enable RTL layout |
| `cssClass` | string | "" | Custom CSS class |
| `popupWidth` | string | "280px" | Calendar popup width |

### Behavior Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `strictMode` | boolean | true | Enforce strict format validation |
| `allowEdit` | boolean | true | Allow manual date input |
| `showClearButton` | boolean | false | Show clear button |
| `openOnFocus` | boolean | true | Open calendar on input focus |

---

## Events

### Change Events

| Event | Args | Description |
|-------|------|-------------|
| `@change` | ChangeEventArgs | Fired when date selection changes |
| `@blur` | BlurEventArgs | Fired when component loses focus |
| `@focus` | FocusEventArgs | Fired when component gains focus |

### Lifecycle Events

| Event | Args | Description |
|-------|------|-------------|
| `@created` | Object | Fired when component is created |
| `@destroyed` | Object | Fired when component is destroyed |

### Render Events

| Event | Args | Description |
|-------|------|-------------|
| `@renderDayCell` | RenderDayCellEventArgs | Fired for each day cell rendering |

### Navigation Events

| Event | Args | Description |
|-------|------|-------------|
| `@navigated` | NavigatedEventArgs | Fired when calendar view changes |

---

## Methods (via Template Refs)

```vue
<script setup>
const datePickerRef = ref(null);

// Access methods like:
datePickerRef.value.methodName(...);
</script>
```

### Selection Methods

| Method | Args | Returns | Description |
|--------|------|---------|-------------|
| `addDate` | Date | void | Add date to selection |
| `removeDate` | Date | void | Remove date from selection |
| `setProperties` | Object | void | Update component properties |

### Navigation Methods

| Method | Args | Returns | Description |
|--------|------|---------|-------------|
| `navigateTo` | (view: string, date: Date) | void | Navigate to specific view |
| `currentView` | - | string | Get current calendar view |

### State Methods

| Method | Args | Returns | Description |
|--------|------|---------|-------------|
| `getPersistData` | - | string | Get serialized state |
| `destroy` | - | void | Destroy component |

---

## Event Args Objects

### ChangeEventArgs

```typescript
{
  value: Date;           // Selected date
  text: string;          // Formatted date string
  isInteracted: boolean; // User interaction flag
  element: HTMLElement;  // Triggering element
}
```

### RenderDayCellEventArgs

```typescript
{
  date: Date;           // Current cell date
  element: HTMLElement; // Cell element
  isDisabled: boolean;  // Set to true to disable
  isOutOfRange: boolean;// Is date out of range
  isToday: boolean;     // Is today's date
}
```

### NavigatedEventArgs

```typescript
{
  view: string;         // Current view (Month/Year/Decade)
  date: Date;          // Navigation date
}
```

---

## Usage Examples

### Basic Setup

```vue
<template>
  <ejs-datepicker
    ref="datePickerRef"
    :value="selectedDate"
    :format="'MM/dd/yyyy'"
    :min="minDate"
    :max="maxDate"
    @change="handleChange"
  ></ejs-datepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const datePickerRef = ref(null);
const selectedDate = ref(new Date());
const minDate = ref(new Date(2026, 0, 1));
const maxDate = ref(new Date(2026, 11, 31));

const handleChange = (args) => {
  console.log('Date changed:', args.value);
  selectedDate.value = args.value;
};
</script>
```

### With Validation

```vue
<template>
  <ejs-datepicker
    :value="selectedDate"
    @renderDayCell="disableWeekends"
  ></ejs-datepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());

const disableWeekends = (args) => {
  if (args.date.getDay() === 0 || args.date.getDay() === 6) {
    args.isDisabled = true;
  }
};
</script>
```

### Programmatic Control

```vue
<template>
  <div>
    <ejs-datepicker
      ref="datePickerRef"
      :value="selectedDate"
    ></ejs-datepicker>
    
    <button @click="navigateToToday">Today</button>
    <button @click="navigateToNextMonth">Next Month</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const datePickerRef = ref(null);
const selectedDate = ref(new Date());

const navigateToToday = () => {
  const today = new Date();
  datePickerRef.value.navigateTo('Month', today);
};

const navigateToNextMonth = () => {
  const next = new Date(selectedDate.value);
  next.setMonth(next.getMonth() + 1);
  datePickerRef.value.navigateTo('Month', next);
};
</script>
```

---

## Related Components

- **Calendar**: Full calendar component
- **DateRangePicker**: Select date ranges
- **DateTimePicker**: Select dates and times
- **TimePicker**: Select times only

---

## See Also

- [DatePicker Getting Started](datepicker-getting-started.md)
- [Date Formats & Input](datepicker-date-formats-and-input.md)
- [Date Range & Validation](datepicker-date-range-and-validation.md)
- [Date Views & Navigation](datepicker-date-views-and-navigation.md)
- [Customization & Styling](datepicker-customization-and-styling.md)
- [Accessibility & Keyboard](datepicker-accessibility-and-keyboard.md)
- [Globalization & Localization](datepicker-globalization-and-localization.md)
