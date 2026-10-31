# Icons and Content – Syncfusion Angular Floating Action Button

## Table of Contents
- [Icon-Only FAB](#icon-only-fab)
- [FAB with Icon and Text](#fab-with-icon-and-text)
- [Icon Position](#icon-position)
- [Tooltip on Icon-Only FAB](#tooltip-on-icon-only-fab)

---

## Icon-Only FAB

Use the `iconCss` property to display an icon without any text label. This is the most compact FAB form and the most common usage in Material Design.

```typescript
import { FabModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [FabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative;min-height:350px;border:1px solid;"></div>
    <button ejs-fab id="fab" iconCss="fab-icons fab-icon-people" target="#targetElement"></button>
  `
})
export class AppComponent { }
```

Use Syncfusion's built-in icon classes (e.g., `e-icons e-edit`, `e-icons e-delete`) or custom icon fonts via the `iconCss` property.

---

## Tooltip on Icon-Only FAB

When using an icon-only FAB, add a `title` attribute so users can see additional details on hover:

```typescript
import { FabModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [FabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative;min-height:350px;border:1px solid;"></div>
    <button ejs-fab id="fab" iconCss="e-icons e-edit" title="Edit Record" target="#targetElement"></button>
  `
})
export class AppComponent { }
```

> For accessibility with icon-only FABs, also set `aria-label` via `cssClass` styling or add an `aria-label` attribute directly to the button element.

---

## FAB with Icon and Text

Use both `iconCss` and `content` properties to show an icon alongside a text label:

```typescript
import { FabModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [FabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative;min-height:350px;border:1px solid;"></div>
    <button ejs-fab id="fab" iconCss="fab-icons fab-icon-people" content="Contacts"
      target="#targetElement"></button>
  `
})
export class AppComponent { }
```

By default, the icon appears to the **left** of the text.

---

## Icon Position

Use the `iconPosition` property to place the icon to the **right** of the text content. Accepted values: `'Left'` (default) and `'Right'`.

```typescript
import { FabModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [FabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative;min-height:350px;border:1px solid;"></div>
    <button ejs-fab id="fab" iconCss="fab-icons fab-icon-people" content="Contacts"
      iconPosition="Right" target="#targetElement"></button>
  `
})
export class AppComponent { }
```

| `iconPosition` | Behavior |
|----------------|----------|
| `'Left'` (default) | Icon appears before the text content |
| `'Right'` | Icon appears after the text content |
