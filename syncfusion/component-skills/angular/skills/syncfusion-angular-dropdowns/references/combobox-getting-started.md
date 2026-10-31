# Getting Started with Angular ComboBox

This guide walks you through setting up the Syncfusion Angular ComboBox component from installation to your first working example. You'll have a functional ComboBox component in under 5 minutes.

---

## Prerequisites

Before you begin, ensure you have:
- **Angular CLI 19+** installed globally (`npm install -g @angular/cli`)
- **Node.js 18+** and npm 9+
- A modern code editor (VS Code recommended)
- Basic Angular knowledge (components, imports, templates)

---

## Step 1: Create an Angular Project

If you don't have an Angular project yet, create one:

```bash
ng new combobox-demo --standalone
cd combobox-demo
```

The `--standalone` flag creates a modern Angular 19+ project with standalone components (no NgModule required).

---

## Step 2: Install Syncfusion Packages

Install the ComboBox component from Syncfusion:

```bash
npm install @syncfusion/ej2-angular-dropdowns --save
```

This installs the complete dropdowns package, which includes:
- ComboBox
- DropDownList
- MultiSelect
- AutoComplete

**Package dependencies will auto-install:**
- `@syncfusion/ej2-dropdowns` - Core dropdown logic
- `@syncfusion/ej2-base` - Foundation utilities
- `@syncfusion/ej2-data` - Data binding support
- `@syncfusion/ej2-popups` - Popup management

---

## Step 3: Import CSS Theme

ComboBox requires CSS styling. Choose your preferred theme and import it in `main.ts`:

```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// Import Syncfusion ComboBox CSS
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/combo-box/index.css";

bootstrapApplication(AppComponent).catch(err => console.error(err));
```

**Available themes:**
- `bootstrap5.css` - Default, modern bootstrap style
- `bootstrap.css` - Bootstrap 4 style
- `fabric.css` - Microsoft Fabric design
- `fluent.css` - Fluent design system
- `material.css` - Material design
- `tailwind.css` - Tailwind CSS compatible

Choose **one** theme per project.

---

## Step 4: Create Your First ComboBox

Update `app.component.ts` with a simple ComboBox:

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComboBoxComponent, ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ComboBoxModule],
  template: `
    <div style="padding: 20px; font-family: Arial;">
      <h3>Select a Programming Language</h3>
      
      <ejs-combobox
        [dataSource]="languageList"
        fields="{ text: 'name', value: 'code' }"
        placeholder="Choose a language"
        [(ngModel)]="selectedLanguage"
        (change)="onLanguageChange()">
      </ejs-combobox>

      <p *ngIf="selectedLanguage">
        You selected: <strong>{{ selectedLanguage }}</strong>
      </p>
    </div>
  `,
  styles: [`
    :host {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
  `]
})
export class AppComponent {
  // Data array with objects
  languageList = [
    { code: 'js', name: 'JavaScript' },
    { code: 'ts', name: 'TypeScript' },
    { code: 'py', name: 'Python' },
    { code: 'java', name: 'Java' },
    { code: 'csharp', name: 'C#' }
  ];

  // Track selected value
  selectedLanguage = '';

  // Event handler
  onLanguageChange() {
    console.log('Selected language code:', this.selectedLanguage);
  }
}
```

**What's happening:**
1. Import `ComboBoxComponent` from Syncfusion
2. Import `FormsModule` for two-way binding with `[(ngModel)]`
3. Define `languageList` array with objects (code, name)
4. Use `fields` property to map object properties to display/value
5. Bind selected value with `[(ngModel)]="selectedLanguage"`
6. Handle changes with `(change)` event

---

## Step 5: Run Your Application

Start the development server:

```bash
ng serve
```

Open `http://localhost:4200` in your browser. You should see:
- A ComboBox with placeholder text "Choose a language"
- 5 language options in the dropdown
- Selected value displayed below

Click the dropdown, select an item, and see the value update in real-time.

---

## Understanding the Basic Template

### Data Source Binding

```html
<ejs-combobox
  [dataSource]="languageList"
  fields="{ text: 'name', value: 'code' }"
  ...
>
</ejs-combobox>
```

**Breaking it down:**
- `[dataSource]="languageList"` - Array of items to display
- `fields="{ text: 'name', value: 'code' }"` - Map which properties to use:
  - `text: 'name'` - Display this field in the list
  - `value: 'code'` - Store this field when selected

### Two-Way Value Binding

```typescript
[(ngModel)]="selectedLanguage"
```

**This creates two-way binding:**
- When user selects item → `selectedLanguage` updates automatically
- When `selectedLanguage` changes in code → ComboBox updates display

### Handling Selection

```typescript
(change)="onLanguageChange()"
```

**Fires when:**
- User selects a different item
- Value changes programmatically (not recommended, use events instead)

---

## Common Setup Issues & Fixes

### Issue: "ComboBoxModule is not a known element"

**Cause:** Forgot to import `ComboBoxModule` in the component

**Fix:**
```typescript
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [ComboBoxModule]  // Add here
})
```

---

### Issue: ComboBox appears unstyled (no colors/styling)

**Cause:** CSS theme not imported in `main.ts`

**Fix:**
```typescript
// main.ts
import '@syncfusion/ej2-base/styles/bootstrap5.css';
import '@syncfusion/ej2-dropdowns/styles/bootstrap5.css';
```

---

### Issue: "ngModel is not defined" or binding not working

**Cause:** Forgot to import `FormsModule`

**Fix:**
```typescript
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, ComboBoxModule]  // Add FormsModule
})
```

---

### Issue: Data not showing in dropdown

**Cause:** Field mapping incorrect or data structure wrong

**Debug:**
```typescript
// In component class
console.log('Data:', this.languageList);

// In template, check binding works
<p>{{ languageList | json }}</p>

// Verify fields match your data
fields="{ text: 'name', value: 'code' }"
// Make sure 'name' and 'code' actually exist in your data objects
```

---

## Next Steps: Beyond the Basics

Once your ComboBox is working, explore:

1. **Add Search:** Enable filtering with `allowFiltering="true"`
2. **Load from API:** Use `DataManager` for remote data sources
3. **Customize Display:** Use templates for custom item rendering
4. **Add to Form:** Integrate with Angular reactive or template-driven forms
5. **Handle Large Lists:** Enable virtual scrolling for performance

Check the [Data Binding & Sources](../data-binding.md) reference when ready to connect to real data.

---

## Minimal Working Example

**Single file example (app.component.ts):**

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComboBoxComponent, ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ComboBoxModule],
  template: `
    <ejs-combobox
      [dataSource]="['HTML', 'CSS', 'JavaScript', 'Angular']"
      placeholder="Select a skill">
    </ejs-combobox>
  `
})
export class AppComponent {}
```

This is the absolute minimum to get a working ComboBox. Build from here!

---

## Verify Your Setup

Check that all imports are correct:

```bash
# Make sure packages are installed
npm list @syncfusion/ej2-angular-dropdowns

# Should output: @syncfusion/ej2-angular-dropdowns@xx.x.x
```

You're ready! Your ComboBox is now set up and ready to use.
