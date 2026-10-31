# Resize and Dimensions in TextArea

## Table of Contents
- [resizeMode Options](#resizemode-options)
- [Setting resizeMode](#setting-resizemode)
- [Width Property](#width-property)
- [Rows and Cols Properties](#rows-and-cols-properties)

---

## resizeMode Options

The `resizeMode` property controls how users can manually resize the TextArea:

| Value | Behavior |
|---|---|
| `Both` | Users can resize both height and width. **Default value.** |
| `Vertical` | Users can only resize the height (drag vertically). |
| `Horizontal` | Users can only resize the width (drag horizontally). |
| `None` | Resizing is disabled entirely. Useful for fixed-layout forms. |

> When `resizeMode` is `Both` (default), the TextArea width is not auto-adjusted. Use the `cols` property or CSS to control width explicitly.

---

## Setting resizeMode

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

// Vertical resize only — most common for comment fields
let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments',
    resizeMode: 'Vertical'
});
textareaObj.appendTo('#default');
```

Disable resizing for strict layout control:

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments',
    resizeMode: 'None'
});
textareaObj.appendTo('#default');
```

Allow both axes:

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments',
    resizeMode: 'Both'
});
textareaObj.appendTo('#default');
```

---

## Width Property

Use the `width` property to set an explicit width. Accepts a number (pixels) or a string (e.g., `'100%'`, `'500px'`):

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments',
    resizeMode: 'Both',
    width: 500          // 500px
});
textareaObj.appendTo('#default');
```

With percentage width:

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments',
    width: '100%',
    resizeMode: 'Vertical'
});
textareaObj.appendTo('#default');
```

---

## Rows and Cols Properties

`rows` controls the initial visible height (in lines). `cols` controls the visible width (in average character widths).

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments',
    rows: 5,
    cols: 40,
    floatLabelType: 'Auto'
});
textareaObj.appendTo('#default');
```

Multiple TextArea instances with different dimensions:

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

// Compact textarea
let smallTextarea: TextArea = new TextArea({
    placeholder: 'Short note',
    rows: 3,
    cols: 35,
    floatLabelType: 'Auto'
});
smallTextarea.appendTo('#default1');

// Larger textarea
let largeTextarea: TextArea = new TextArea({
    placeholder: 'Detailed feedback',
    rows: 8,
    cols: 50,
    floatLabelType: 'Auto'
});
largeTextarea.appendTo('#default2');
```

---

## Notes

- `rows` and `cols` set the initial size; they do not prevent manual resizing unless `resizeMode: 'None'`.
- `width` overrides `cols` for width control and provides more precise pixel/percentage control.
- Use `resizeMode: 'None'` combined with explicit `rows`, `cols`, or `width` for fully fixed-size TextAreas.
