# Getting Started with Angular Ribbon Component

## Table of Contents
- [Installation and Setup](#installation-and-setup)
- [Ivy vs ngcc Packages](#ivy-vs-ngcc-packages)
- [CSS Theme Setup](#css-theme-setup)
- [Creating Your First Ribbon](#creating-your-first-ribbon)
- [Adding Tabs and Groups](#adding-tabs-and-groups)
- [Adding Basic Items](#adding-basic-items)
- [Running the Application](#running-the-application)

## Installation and Setup

### Prerequisites

Ensure you have an Angular project set up. If not, create one using Angular CLI:

```bash
npm install -g @angular/cli
ng new my-app
cd my-app
```

### Syncfusion Dependencies

The Ribbon component requires the following dependencies:

```
@syncfusion/ej2-angular-ribbon
├── @syncfusion/ej2-angular-base
├── @syncfusion/ej2-base
├── @syncfusion/ej2-data
├── @syncfusion/ej2-buttons
├── @syncfusion/ej2-popups
├── @syncfusion/ej2-splitbuttons
├── @syncfusion/ej2-inputs
├── @syncfusion/ej2-lists
├── @syncfusion/ej2-dropdowns
├── @syncfusion/ej2-navigations
└── @syncfusion/ej2-ribbon
```

## Ivy vs ngcc Packages

Syncfusion provides two package formats for Angular components:

### Ivy Library Format (Recommended)

For Angular 12+, use the Ivy format (default):

```bash
npm install @syncfusion/ej2-angular-ribbon --save
```

This is the modern package format and is compatible with Angular's latest rendering engine.

## CSS Theme Setup

To install the material3 theme package, use the following command:

```bash
npm install @syncfusion/ej2-material3-theme --save
```

Import the required CSS themes in your `styles.css` file:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ribbon/index.css";
```

**Available themes:**
- `material3.css` (default modern theme)
- `material.css` (Material Design)
- `bootstrap5.css` (Bootstrap 5)
- `tailwind.css` (Tailwind CSS)
- `fluent.css` (Microsoft Fluent Design)

Choose one theme based on your application requirements.

## Creating Your First Ribbon

### Step 1: Import RibbonModule

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home"></e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `
})
export class AppComponent { }
```

### Step 2: Render Ribbon

The minimal ribbon renders with a single empty tab. To make it functional, add groups and items.

## Adding Tabs and Groups

### Adding Multiple Tabs

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home"></e-ribbon-tab>
        <e-ribbon-tab header="Insert"></e-ribbon-tab>
        <e-ribbon-tab header="View"></e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `
})
export class AppComponent { }
```

### Adding Groups to Tabs

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Clipboard"></e-ribbon-group>
            <e-ribbon-group header="Font"></e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `
})
export class AppComponent { }
```

**Group orientation:**
- `orientation="Row"`: Horizontal layout (default)
- `orientation="Column"`: Vertical layout

## Adding Basic Items

### Adding Button Items

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';
import { RibbonButtonSettingsModel } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Clipboard" orientation="Row">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" [buttonSettings]="cutButton"></e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `
})
export class AppComponent {
  public cutButton: RibbonButtonSettingsModel = { 
    iconCss: "e-icons e-cut", 
    content: "Cut" 
  };
}
```

### Adding Multiple Items

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';
import { RibbonButtonSettingsModel, RibbonSplitButtonSettingsModel } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Clipboard" orientation="Row">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="SplitButton" [splitButtonSettings]="pasteSettings"></e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" [buttonSettings]="cutButton"></e-ribbon-item>
                    <e-ribbon-item type="Button" [buttonSettings]="copyButton"></e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `
})
export class AppComponent {
  public pasteSettings: RibbonSplitButtonSettingsModel = { 
    iconCss: "e-icons e-paste", 
    items: [
      { text: "Keep Source Format" }, 
      { text: "Merge format" }, 
      { text: "Keep text only" }
    ], 
    content: "Paste" 
  };
  public cutButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-cut", content: "Cut" };
  public copyButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-copy", content: "Copy" };
}
```

## Running the Application

Start the development server:

```bash
ng serve
```

Open your browser and navigate to `http://localhost:4200`. You should see your Ribbon component with tabs, groups, and items.

### Troubleshooting

**Issue:** Ribbon doesn't display
- Check that CSS imports are correct in `styles.css`
- Verify RibbonModule is imported in the component
- Ensure `standalone: true` or RibbonModule is in imports array

**Issue:** Icons not showing
- Verify Syncfusion icon CSS is imported
- Check that `iconCss` values match available icon classes (e.g., `e-icons e-cut`)

**Issue:** Styling issues
- Ensure correct theme CSS file is imported
- Clear browser cache and rebuild
- Check for CSS conflicts with other stylesheets

---
