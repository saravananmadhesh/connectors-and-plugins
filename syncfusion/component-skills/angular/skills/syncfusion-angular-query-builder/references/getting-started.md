# Getting Started — Syncfusion Angular Query Builder

Set up and render the Query Builder component in an Angular standalone application.

---

## Dependencies

The Query Builder relies on several Syncfusion packages, all installed automatically with `ng add`:

```
@syncfusion/ej2-angular-querybuilder
  ├── @syncfusion/ej2-angular-base
  ├── @syncfusion/ej2-querybuilder
      ├── @syncfusion/ej2-base
      ├── @syncfusion/ej2-buttons
      ├── @syncfusion/ej2-data
      ├── @syncfusion/ej2-dropdowns
      ├── @syncfusion/ej2-calendars
      ├── @syncfusion/ej2-inputs
      └── @syncfusion/ej2-splitbuttons
```

---

## Step 1: Create an Angular Application

Install Angular CLI (if not already installed):

```bash
npm install -g @angular/cli
```

Create a new application:

```bash
ng new syncfusion-angular-app
cd syncfusion-angular-app
```

> **Angular 21+:** Standalone components are the default. This guide uses standalone architecture.  
> In Angular 20+, the CLI generates `app.ts`, `app.html`, `app.css` (no `.component.` suffix).  
> In Angular 19 and below, files are `app.component.ts`, `app.component.html`, etc.

---

## Step 2: Install the Query Builder Package

Use `ng add` to install and auto-configure the package:

```bash
ng add @syncfusion/ej2-angular-querybuilder
```

This command automatically:
- Adds `@syncfusion/ej2-angular-querybuilder` and peer dependencies to `package.json`
- Imports the component into your application
- Registers the default **Material3** theme in `angular.json`

For legacy Angular apps (Angular 15 and below using ngcc):
```bash
npm add @syncfusion/ej2-angular-querybuilder@32.1.19-ngcc
```

---

## Step 3: Add CSS / Theme Reference

The Material3 theme is auto-added to `styles.css` when using `ng add`. To manually style only the Query Builder:

```css
@import "@syncfusion/ej2-material3-theme/styles/query-builder/index.css";
```

> Import order matters — follow the component dependency sequence above.

Available themes: `material3`, `material`, `bootstrap5`, `fabric`, `tailwind`, `fluent2`

---

## Step 4: Add the Query Builder Component

**`src/app/app.ts`** (Angular 20+ standalone):

```typescript
import { QueryBuilderModule } from '@syncfusion/ej2-angular-querybuilder';
import { Component } from '@angular/core';

@Component({
  imports: [QueryBuilderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-querybuilder width="70%">
      <e-columns>
        <e-column field="EmployeeID" label="Employee ID" type="number"></e-column>
        <e-column field="FirstName" label="First Name" type="string"></e-column>
        <e-column field="TitleOfCourtesy" label="Title Of Courtesy" type="string" [values]="values"></e-column>
        <e-column field="Title" label="Title" type="string"></e-column>
        <e-column field="HireDate" label="Hire Date" type="date" format="dd/MM/yyyy"></e-column>
        <e-column field="Country" label="Country" type="string"></e-column>
        <e-column field="City" label="City" type="string"></e-column>
      </e-columns>
    </ejs-querybuilder>
  `
})
export class App {
  public values: string[] = ['Mr.', 'Mrs.'];
}
```

**`src/main.ts`:**

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import 'zone.js';
bootstrapApplication(App).catch((err) => console.error(err));
```

> **Column types:** `'string'`, `'number'`, `'date'`, `'boolean'`  
> Use `[values]` on string columns to render a dropdown instead of a free-text input.

---

## Step 5: Run the Application

```bash
ng serve
```

Open `http://localhost:4200` to see the Query Builder. You should see a rule interface with field, operator, and value dropdowns.

---

## Rendering with an Initial Rule

Use the `[rule]` property to pre-populate the Query Builder with conditions on load:

```typescript
import { QueryBuilderModule } from '@syncfusion/ej2-angular-querybuilder';
import { Component } from '@angular/core';

@Component({
  imports: [QueryBuilderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-querybuilder width="70%" [rule]="importRules">
      <e-columns>
        <e-column field="EmployeeID" label="Employee ID" type="number"></e-column>
        <e-column field="FirstName" label="First Name" type="string"></e-column>
        <e-column field="Title" label="Title" type="string"></e-column>
        <e-column field="HireDate" label="Hire Date" type="date" format="dd/MM/yyyy"></e-column>
        <e-column field="Country" label="Country" type="string"></e-column>
      </e-columns>
    </ejs-querybuilder>
  `
})
export class App {
  public importRules = {
    condition: 'and',
    rules: [
      {
        label: 'Employee ID', field: 'EmployeeID',
        type: 'number', operator: 'equal', value: 1
      },
      {
        label: 'Title', field: 'Title',
        type: 'string', operator: 'equal', value: 'Sales Manager'
      }
    ]
  };
}
```

---

## Troubleshooting

| Issue | Solution |
|---|---|
| Component not rendering | Ensure `QueryBuilderModule` is in `imports` array of the standalone component |
| Styles missing | Check import order in `styles.css`; all dependencies must be imported before the querybuilder style |
| `zone.js` error | Add `import 'zone.js'` to `main.ts` |
| ngcc warnings | Use Ivy-compatible package; ngcc is not supported in Angular 16+ |
| Columns empty | Ensure each `<e-column>` has a `field` property matching the dataSource keys |
