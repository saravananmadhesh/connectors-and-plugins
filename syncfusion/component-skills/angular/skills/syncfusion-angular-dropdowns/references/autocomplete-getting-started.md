# Getting Started with Syncfusion Angular AutoComplete

## Table of Contents
- [Prerequisites & Dependencies](#prerequisites--dependencies)
- [Installation](#installation)
- [CSS Themes Setup](#css-themes-setup)
- [Add AutoComplete to Component](#add-autocomplete-to-component)
- [Bind a Data Source](#bind-a-data-source)
- [Configure the Popup](#configure-the-popup)
- [Two-Way Binding](#two-way-binding)
- [Run the Application](#run-the-application)

---

## Prerequisites & Dependencies

**System:** Angular 21+ (standalone components architecture by default)

**Package dependencies:**

```
@syncfusion/ej2-angular-dropdowns
  ├── @syncfusion/ej2-base
  ├── @syncfusion/ej2-data
  ├── @syncfusion/ej2-lists
  ├── @syncfusion/ej2-inputs
  ├── @syncfusion/ej2-navigations
  ├── @syncfusion/ej2-notifications
  ├── @syncfusion/ej2-popups
  │     └── @syncfusion/ej2-buttons
  └── @syncfusion/ej2-angular-base
```

---

## Installation

**Option A – Recommended (ng add, sets up theme automatically):**

```bash
ng add @syncfusion/ej2-angular-dropdowns
```

This command:
- Adds `@syncfusion/ej2-angular-dropdowns` and peer dependencies to `package.json`
- Registers the default Syncfusion Material theme in `angular.json`

**Option B – Manual install:**

```bash
npm install @syncfusion/ej2-angular-dropdowns
```

---

## CSS Themes Setup

When using `ng add`, the Material theme is registered automatically.

To import only the styles required for AutoComplete, add to `styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/auto-complete/index.css";
```

> Import order matters — follow the dependency sequence above.

---

## Add AutoComplete to Component

Use the `<ejs-autocomplete>` selector inside any standalone Angular component:

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-autocomplete></ejs-autocomplete>`
})
export class AppComponent {}
```

> In Angular 21+, the file is `src/app/app.ts` (no `.component.` suffix). In Angular 19 and below, use `app.component.ts`.

---

## Bind a Data Source

Pass an array of strings (or objects) via the `dataSource` property:

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="atcelement"
      [dataSource]="sportsData"
      placeholder="Find a game">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public sportsData: string[] = [
    'Badminton', 'Basketball', 'Cricket',
    'Football', 'Golf', 'Gymnastics', 'Hockey', 'Rugby', 'Snooker', 'Tennis'
  ];
}
```

---

## Configure the Popup

Customize popup dimensions using `popupHeight` and `popupWidth`:

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="atcelement"
      [dataSource]="sportsData"
      [popupHeight]="height"
      [popupWidth]="width"
      placeholder="Find a game">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  public sportsData: string[] = [
    'Badminton', 'Cricket', 'Football', 'Golf', 'Hockey', 'Rugby', 'Snooker', 'Tennis'
  ];
  public width: string = '250px';
  public height: string = '200px';
}
```

**Defaults:**
- `popupHeight`: `'300px'`
- `popupWidth`: `'100%'` (matches input width)

---

## Two-Way Binding

The `value` property supports two-way binding via `[(value)]`:

```typescript
import { Component } from '@angular/core';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [AutoCompleteModule, FormsModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="atcelement"
      [dataSource]="sportsData"
      [(value)]="value">
    </ejs-autocomplete>

    <!-- Mirror the selected value elsewhere -->
    <div>Selected: {{ value }}</div>
  `
})
export class AppComponent {
  public sportsData: string[] = [
    'Badminton', 'Basketball', 'Cricket', 'Football', 'Golf', 'Gymnastics'
  ];
  public value: string = 'Badminton'; // Pre-selected value
}
```

---

## Run the Application

```bash
ng serve
```

Open `http://localhost:4200` in the browser. The AutoComplete will render with the data source and placeholder configured.

---

## Gotchas & Tips

| Issue | Cause | Fix |
|-------|-------|-----|
| Styles not applied | CSS imports missing or wrong order | Add all CSS imports in correct dependency order |
| Component not found | `AutoCompleteModule` not imported | Add `AutoCompleteModule` to `imports` array |
| Value not pre-selected | `value` set before data loads | Set `value` in `ngOnInit` after data is initialized |
| Popup width looks wrong | `popupWidth` defaults to `100%` (input width) | Set `popupWidth` explicitly in pixels |
