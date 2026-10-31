# Getting Started with Angular Chips

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Adding CSS Reference](#adding-css-reference)
- [Rendering a Single Chip](#rendering-a-single-chip)
- [Rendering a Chip List](#rendering-a-chip-list)
- [Run the Application](#run-the-application)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Node.js (LTS recommended)
- Angular CLI or a compatible Angular workspace

Create a new Angular app:
```bash
npx @angular/cli new syncfusion-angular-app --routing=false --style=css
cd syncfusion-angular-app
npm install
```

---

## Installation

Install the Syncfusion Angular buttons package, which contains the Chips component:

```bash
npm install @syncfusion/ej2-angular-buttons --save
```

---

## Adding CSS Reference

Add the following CSS imports in `src/styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/chips/index.css";
```

> You can replace `tailwind3` with other available themes: `material`, `material3`, `bootstrap5`, `fluent2`, `fabric`.

---

## Rendering a Single Chip

The simplest usage — a single chip with display text:

```typescript
import { Component } from '@angular/core';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChipListModule],
  template: `
    <ejs-chiplist text="Janet Leverling"></ejs-chiplist>
  `
})
export class AppComponent {}
```

- `text` — sets the label displayed on the chip.
- `enableRipple(true)` — enables the Material-style ripple effect on interaction.

---

## Rendering a Chip List

To render multiple chips, use `e-chips` and `e-chip` inside `ejs-chiplist`:

```typescript
import { Component } from '@angular/core';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChipListModule],
  template: `
    <ejs-chiplist id="chip-list">
      <e-chips>
        <e-chip text="Andrew"></e-chip>
        <e-chip text="Janet"></e-chip>
        <e-chip text="Laura"></e-chip>
        <e-chip text="Margaret"></e-chip>
      </e-chips>
    </ejs-chiplist>
  `
})
export class AppComponent {}
```

- `ejs-chiplist` — the container/wrapper component.
- `e-chips` — holds the collection of chips.
- `e-chip` — defines an individual chip item. Accepts all per-chip properties (`text`, `cssClass`, `avatarText`, `leadingIconCss`, etc.).

---

## Chips via `chips` Property (Alternative)

Instead of template markup, you can pass data as an array via the `chips` property:

```typescript
import { Component } from '@angular/core';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChipListModule],
  template: `
    <ejs-chiplist id="chip-list" [chips]="chips"></ejs-chiplist>
  `
})
export class AppComponent {
  chips = [
    { text: 'Angular' },
    { text: 'Vue' },
    { text: 'Svelte' }
  ];
}
```

- `chips` accepts `string[]`, `number[]`, or `ChipModel[]`.
- `ChipModel` supports: `text`, `cssClass`, `avatarText`, `avatarIconCss`, `leadingIconCss`, `leadingIconUrl`, `trailingIconCss`, `trailingIconUrl`, `enabled`, `htmlAttributes`.

---

## Run the Application

```bash
ng serve
```

The app will start in development mode and open in the browser.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Chip renders without styles | Verify CSS imports are in `src/styles.css` |
| `ejs-chiplist` not found | Ensure `@syncfusion/ej2-angular-buttons` is installed and imported |
| Ripple not working | Call `enableRipple(true)` before rendering the component |
| Chips not rendering in list | Wrap `e-chip` inside `e-chips` inside `ejs-chiplist` |
