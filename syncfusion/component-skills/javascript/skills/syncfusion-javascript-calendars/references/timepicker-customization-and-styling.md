# TimePicker Customization and Styling

## CSS Customization

### Custom CSS Class

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  format: 'hh:mm aa',
  cssClass: 'custom-timepicker'
});

picker.appendTo('#timepicker');
```

CSS:
```css
.custom-timepicker .e-input-group {
  border: 2px solid #4CAF50;
  border-radius: 8px;
}

.custom-timepicker .e-input-group:focus-within {
  border-color: #2196F3;
  box-shadow: 0 0 5px rgba(33, 150, 243, 0.3);
}

.custom-timepicker .e-input {
  font-size: 16px;
  font-weight: 500;
}
```

## Themes

### Material Theme

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  format: 'hh:mm aa'
});

picker.appendTo('#timepicker');
```

### Bootstrap Theme

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';
import '@syncfusion/ej2-base/styles/bootstrap.css';
import '@syncfusion/ej2-calendars/styles/bootstrap.css';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  format: 'hh:mm aa'
});

picker.appendTo('#timepicker');
```

### Fabric Theme

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';
import '@syncfusion/ej2-base/styles/fabric.css';
import '@syncfusion/ej2-calendars/styles/fabric.css';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  format: 'hh:mm aa'
});

picker.appendTo('#timepicker');
```

## Disabled State

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  enabled: false
});

picker.appendTo('#timepicker');

// Enable/Disable dynamically
document.getElementById('btnToggle')?.addEventListener('click', () => {
  picker.enabled = !picker.enabled;
});
```

## Read-Only Mode

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  readonly: true
});

picker.appendTo('#timepicker');
```

## Placeholder and Label

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  placeholder: 'Select a time',
  format: 'hh:mm aa'
});

picker.appendTo('#timepicker');
```

HTML:
```html
<div>
  <label for="timepicker">Meeting Time</label>
  <input id="timepicker" type="text" />
</div>
```

## Sizing

### Compact Size

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  cssClass: 'compact-picker'
});

picker.appendTo('#timepicker');
```

CSS:
```css
.compact-picker .e-input {
  padding: 4px 8px;
  font-size: 12px;
}
```

### Large Size

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  cssClass: 'large-picker'
});

picker.appendTo('#timepicker');
```

CSS:
```css
.large-picker .e-input {
  padding: 12px 16px;
  font-size: 18px;
  font-weight: 600;
}
```

## Advanced Styling

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  format: 'hh:mm aa',
  cssClass: 'styled-picker'
});

picker.appendTo('#timepicker');
```

CSS:
```css
.styled-picker .e-input-group {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.styled-picker .e-input {
  color: white;
  background: transparent;
  font-weight: 600;
}

.styled-picker .e-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.styled-picker .e-icon-btn {
  background: transparent;
  color: white;
}

.styled-picker .e-popup {
  border-radius: 8px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
```

## Dynamic Styling

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  format: 'hh:mm aa',
  change: (args: any) => {
    const hour = args.value?.getHours();
    
    // Change color based on time of day
    if (hour! >= 9 && hour! < 12) {
      picker.cssClass = 'morning-time';
    } else if (hour! >= 12 && hour! < 17) {
      picker.cssClass = 'afternoon-time';
    } else {
      picker.cssClass = 'evening-time';
    }
  }
});

picker.appendTo('#timepicker');
```

CSS:
```css
.morning-time .e-input-group {
  border-left: 4px solid #FF9800;
}

.afternoon-time .e-input-group {
  border-left: 4px solid #2196F3;
}

.evening-time .e-input-group {
  border-left: 4px solid #9C27B0;
}
```

## RTL Support

```typescript
import { TimePicker } from '@syncfusion/ej2-calendars';
import '@syncfusion/ej2-calendars/styles/material-rtl.css';

const picker = new TimePicker({
  value: new Date(2026, 0, 1, 14, 0),
  format: 'hh:mm aa',
  enableRtl: true
});

picker.appendTo('#timepicker');
```

HTML:
```html
<div dir="rtl">
  <input id="timepicker" type="text" />
</div>
```
