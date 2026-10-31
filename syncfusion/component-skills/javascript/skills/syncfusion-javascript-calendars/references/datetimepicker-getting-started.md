# DateTimePicker Getting Started

## Overview

The DateTimePicker component enables selection of both date and time from a single input. It combines calendar and time picker functionality with support for different time formats, step intervals, and validation.

## Installation

```bash
npm install @syncfusion/ej2-calendars
```

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';
```

## Quick Example

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker = new DateTimePicker({
  value: new Date(),
  format: 'MM/dd/yyyy hh:mm aa'
});

picker.appendTo('#datetimepicker');
```

HTML:
```html
<input id="datetimepicker" type="text" />
```

Result: Input showing date and time like "06/15/2026 02:30 PM"

## Basic Properties

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker = new DateTimePicker({
  value: new Date(),
  format: 'MM/dd/yyyy hh:mm aa',
  timeFormat: 'hh:mm aa',
  min: new Date(2026, 0, 1, 8, 0),     // 8:00 AM
  max: new Date(2026, 11, 31, 18, 0),  // 6:00 PM
  step: 30,                             // 30-minute intervals
  placeholder: 'Select date and time',
  enabled: true
});

picker.appendTo('#datetimepicker');
```

## Time Formats

### 12-Hour Format

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker12h = new DateTimePicker({
  value: new Date(2026, 5, 15, 14, 30),
  format: 'MM/dd/yyyy hh:mm aa',  // 06/15/2026 02:30 PM
  timeFormat: 'hh:mm aa'
});

picker12h.appendTo('#12h');
```

### 24-Hour Format

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const picker24h = new DateTimePicker({
  value: new Date(2026, 5, 15, 14, 30),
  format: 'MM/dd/yyyy HH:mm',     // 06/15/2026 14:30
  timeFormat: 'HH:mm'
});

picker24h.appendTo('#24h');
```

## Step Intervals

Control time picker granularity:

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

// 15-minute intervals
const picker15 = new DateTimePicker({
  value: new Date(),
  step: 15
});
picker15.appendTo('#15min');

// 30-minute intervals
const picker30 = new DateTimePicker({
  value: new Date(),
  step: 30
});
picker30.appendTo('#30min');

// 60-minute intervals
const picker60 = new DateTimePicker({
  value: new Date(),
  step: 60
});
picker60.appendTo('#60min');

// Custom interval (5 minutes)
const pickerCustom = new DateTimePicker({
  value: new Date(),
  step: 5
});
pickerCustom.appendTo('#5min');
```

## Events

### Change Event

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

let selectedDateTime: Date | null = null;

const picker = new DateTimePicker({
  value: new Date(),
  format: 'MM/dd/yyyy hh:mm aa',
  change: (args: any) => {
    selectedDateTime = args.value;
    console.log('DateTime changed:', selectedDateTime);
    
    const formatted = selectedDateTime!.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    document.getElementById('result')!.innerText = formatted;
  }
});

picker.appendTo('#datetimepicker');
```

HTML:
```html
<input id="datetimepicker" type="text" />
<p>Selected: <span id="result"></span></p>
```

## Business Hours

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

const businessStart = 8;   // 8:00 AM
const businessEnd = 18;    // 6:00 PM

const picker = new DateTimePicker({
  value: new Date(),
  format: 'MM/dd/yyyy hh:mm aa',
  min: new Date(2026, 0, 1, businessStart, 0),
  max: new Date(2026, 0, 1, businessEnd, 0),
  step: 30,
  change: (args: any) => {
    const hour = args.value.getHours();
    if (hour < businessStart || hour >= businessEnd) {
      console.error('Selected time outside business hours');
      picker.value = new Date(2026, 0, 1, businessStart, 0);
    }
  }
});

picker.appendTo('#datetimepicker');
```

## Localization

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';

// German
const pickerDE = new DateTimePicker({
  locale: 'de',
  format: 'dd.MM.yyyy HH:mm'
});
pickerDE.appendTo('#de');

// French
const pickerFR = new DateTimePicker({
  locale: 'fr',
  format: 'dd/MM/yyyy HH:mm'
});
pickerFR.appendTo('#fr');

// Japanese
const pickerJA = new DateTimePicker({
  locale: 'ja',
  format: 'yyyy/MM/dd HH:mm'
});
pickerJA.appendTo('#ja');
```
