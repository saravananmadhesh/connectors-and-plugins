# Configuration — Syncfusion Angular TextArea

## Table of Contents
- [Floating Label](#floating-label)
- [Placeholder with Localization](#placeholder-with-localization)
- [Rows and Columns](#rows-and-columns)
- [Max Length](#max-length)
- [Resize Mode](#resize-mode)
- [Width](#width)

---

## Floating Label

Use the `floatLabelType` property to control how the placeholder text behaves:

| Value | Behavior |
|---|---|
| `Never` (default) | Placeholder never floats; stays inside the textarea |
| `Auto` | Placeholder floats above when the textarea is focused or has a value; returns on blur if empty |
| `Always` | Placeholder always floats above the textarea |

```typescript
import { Component } from '@angular/core';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `
    <!-- Auto: floats on focus/value, returns when empty -->
    <ejs-textarea
      id="auto"
      placeholder="Description"
      floatLabelType="Auto">
    </ejs-textarea>

    <!-- Always: label always floats above -->
    <ejs-textarea
      id="always"
      placeholder="Comments"
      floatLabelType="Always">
    </ejs-textarea>

    <!-- Never: label never floats (default) -->
    <ejs-textarea
      id="never"
      placeholder="Notes"
      floatLabelType="Never">
    </ejs-textarea>
  `
})
export class App {}
```

> **Tip:** `floatLabelType="Auto"` provides the best UX for forms — placeholder acts as both a hint and a label.

---

## Placeholder with Localization

Use the `locale` property to localize the placeholder text for different cultures. Load translations using the `L10n` class from `@syncfusion/ej2-base`:

```typescript
import { Component, OnInit } from '@angular/core';
import { L10n } from '@syncfusion/ej2-base';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

L10n.load({
  'de': {
    'textarea': { placeholder: 'Kommentar eingeben' }
  }
});

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `
    <ejs-textarea
      id="localized"
      locale="de"
      floatLabelType="Auto"
      placeholder="Enter comment">
    </ejs-textarea>
  `
})
export class App {}
```

---

## Rows and Columns

Control the initial visible size of the textarea using `rows` (height in lines) and `cols` (width in characters):

```typescript
import { Component } from '@angular/core';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `
    <!-- 6 visible rows, 60 character-wide columns -->
    <ejs-textarea
      id="sized"
      placeholder="Enter description"
      [rows]="6"
      [cols]="60">
    </ejs-textarea>
  `
})
export class App {}
```

> **Note:** `rows` sets the initial visible height. `cols` sets initial visible width in average character widths. Both can be overridden with CSS or the `width` property.

---

## Max Length

Use `maxLength` to enforce a character limit — the TextArea will prevent input beyond this count:

```typescript
import { Component } from '@angular/core';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `
    <ejs-textarea
      id="limited"
      placeholder="Max 200 characters"
      [maxLength]="200"
      [rows]="4">
    </ejs-textarea>
  `
})
export class App {}
```

> **Use case:** Pair `maxLength` with a character counter using the `input` event to show remaining characters in real time.

---

## Resize Mode

Use `resizeMode` to control how users can resize the textarea:

| Value | Behavior |
|---|---|
| `Both` (default) | Resize both vertically and horizontally |
| `Vertical` | Resize height only |
| `Horizontal` | Resize width only |
| `None` | Disable resizing entirely |

```typescript
import { Component } from '@angular/core';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `
    <!-- Vertical only (most common for forms) -->
    <ejs-textarea id="vresize" resizeMode="Vertical" [rows]="4"></ejs-textarea>

    <!-- No resize (fixed layout) -->
    <ejs-textarea id="noresize" resizeMode="None" [rows]="4" [cols]="50"></ejs-textarea>

    <!-- Both (default) -->
    <ejs-textarea id="bothresize" resizeMode="Both" [rows]="4"></ejs-textarea>
  `
})
export class App {}
```

> **Note:** When `resizeMode` defaults to `Both`, width is not auto-adjusted — use `cols` or the `width` property for explicit width control.

---

## Width

Use the `width` property to set a precise width for the TextArea. Accepts a number (pixels) or a string with units:

```typescript
import { Component } from '@angular/core';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `
    <!-- Fixed pixel width -->
    <ejs-textarea id="fixed" [width]="400" [rows]="4" placeholder="400px wide"></ejs-textarea>

    <!-- Percentage width -->
    <ejs-textarea id="fluid" width="100%" [rows]="4" placeholder="Full width"></ejs-textarea>
  `
})
export class App {}
```
