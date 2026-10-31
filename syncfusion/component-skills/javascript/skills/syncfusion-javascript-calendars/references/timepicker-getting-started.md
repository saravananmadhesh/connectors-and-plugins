# TimePicker Getting Started

## Overview

The TimePicker component allows users to select time values (hours, minutes, seconds) without a date component. It supports 12/24-hour formats, step intervals, localization, and various customization options.

## Installation

```bash
npm install @syncfusion/ej2-calendars
```

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';
```

## Quick Example

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(),
  format: 'hh:mm aa'
});

picker.appendTo('#timepicker');
```

HTML:
```html
<input id="timepicker" type="text" />
```

Result: Input showing time like "02:30 PM"

## Basic Properties

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(),
  format: 'hh:mm aa',
  step: 30,
  min: new Date(2026, 0, 1, 8, 0),
  max: new Date(2026, 0, 1, 18, 0),
  placeholder: 'Select time',
  enabled: true
});

picker.appendTo('#timepicker');
```

## Time Formats

### 12-Hour Format

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker12 = new TimePicker({
  value: new Date(2026, 0, 1, 14, 30),
  format: 'hh:mm aa'  // 02:30 PM
});

picker12.appendTo('#12h');
```

### 24-Hour Format

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker24 = new TimePicker({
  value: new Date(2026, 0, 1, 14, 30),
  format: 'HH:mm'  // 14:30
});

picker24.appendTo('#24h');
```

## Step Intervals

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

// 15-minute intervals
const picker15 = new TimePicker({
  step: 15
});
picker15.appendTo('#15min');

// 30-minute intervals
const picker30 = new TimePicker({
  step: 30
});
picker30.appendTo('#30min');

// Hourly
const pickerHourly = new TimePicker({
  step: 60
});
pickerHourly.appendTo('#hourly');
```

## Events

### Change Event

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

let selectedTime: Date | null = null;

const picker = new TimePicker({
  value: new Date(),
  format: 'hh:mm aa',
  change: (args: any) => {
    selectedTime = args.value;
    const timeString = selectedTime?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
    document.getElementById('result')!.innerText = `Selected: ${timeString}`;
  }
});

picker.appendTo('#timepicker');
```

HTML:
```html
<input id="timepicker" type="text" />
<p id="result"></p>
```

## Time Range (Min/Max)

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 12, 0),
  min: new Date(2026, 0, 1, 9, 0),    // 9:00 AM
  max: new Date(2026, 0, 1, 17, 0),   // 5:00 PM
  format: 'hh:mm aa'
});

picker.appendTo('#timepicker');
```

## Localization

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

// English
const enPicker = new TimePicker({
  locale: 'en',
  format: 'hh:mm aa'
});
enPicker.appendTo('#en');

// German
const dePicker = new TimePicker({
  locale: 'de',
  format: 'HH:mm'
});
dePicker.appendTo('#de');

// Japanese
const jaPicker = new TimePicker({
  locale: 'ja',
  format: 'HH:mm'
});
jaPicker.appendTo('#ja');
```
