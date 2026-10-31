# Getting Started with Angular Breadcrumb

## Table of Contents
- [Dependencies](#dependencies)
- [Setup Angular Environment](#setup-angular-environment)
- [Install Syncfusion Package](#install-syncfusion-package)
- [Add Breadcrumb Component](#add-breadcrumb-component)
- [Add CSS References](#add-css-references)
- [Run Application](#run-application)
- [Add Items to Breadcrumb](#add-items-to-breadcrumb)
- [Enable or Disable Navigation](#enable-or-disable-navigation)

## Dependencies

The Breadcrumb module requires the following dependencies from Syncfusion:

```
@syncfusion/ej2-angular-navigations
├── @syncfusion/ej2-angular-base
└── @syncfusion/ej2-navigations
    ├── @syncfusion/ej2-base
    ├── @syncfusion/ej2-data
    ├── @syncfusion/ej2-lists
    ├── @syncfusion/ej2-inputs
    ├── @syncfusion/ej2-splitbuttons
    ├── @syncfusion/ej2-popups
        └── @syncfusion/ej2-buttons
```

These dependencies are automatically installed when you add the Breadcrumb package.

## Setup Angular Environment

Use Angular CLI to set up your Angular application:

```bash
npm install -g @angular/cli
```

## Install Syncfusion Package

Install the Breadcrumb component package:

```bash
npm install @syncfusion/ej2-angular-navigations --save
```

For Angular versions below 12, use the legacy ngcc package:

```bash
npm install @syncfusion/ej2-angular-navigations@ngcc --save
```

Update `package.json` if using ngcc:

```json
{
  "@syncfusion/ej2-angular-navigations": "20.2.38-ngcc"
}
```

## Add Breadcrumb Component

Import `BreadcrumbModule` and add the component to your Angular component:

```ts
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [BreadcrumbModule],
  standalone: true,
  selector: 'app-root',
  template: `<div class="e-section-control">
    <!-- To Render Breadcrumb -->
    <ejs-breadcrumb [enableNavigation]="false"></ejs-breadcrumb>
  </div>`
})
export class AppComponent {}
```

## Add CSS References

Add Breadcrumb styles to your `style.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/breadcrumb/index.css";
```

Alternative theme imports:
- Fabric: `@import '../node_modules/@syncfusion/ej2-navigations/styles/fabric';`
- Bootstrap: `@import '../node_modules/@syncfusion/ej2-navigations/styles/bootstrap';`
- Material: `@import '../node_modules/@syncfusion/ej2-navigations/styles/material';`
- Fluent: `@import '../node_modules/@syncfusion/ej2-navigations/styles/fluent';`

## Run Application

Start the development server:

```bash
ng serve
```

Open `http://localhost:4200` in your browser.

## Add Items to Breadcrumb

Use `e-breadcrumb-items` and `e-breadcrumb-item` directives to add navigable items. Each item follows `BreadcrumbItemModel` with properties like `text`, `url`, `iconCss`, and `disabled`:

```ts
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [BreadcrumbModule],
  standalone: true,
  selector: 'app-root',
  template: `<div class="e-section-control">
    <ejs-breadcrumb [enableNavigation]="false">
      <e-breadcrumb-items>
        <e-breadcrumb-item 
          iconCss="e-icons e-home" 
          url="url">
        </e-breadcrumb-item>
        <e-breadcrumb-item 
          text="Components" 
          url="url">
        </e-breadcrumb-item>
        <e-breadcrumb-item 
          text="Navigations" 
          url="url">
        </e-breadcrumb-item>
        <e-breadcrumb-item 
          text="Breadcrumb" 
          url="./breadcrumb/default">
        </e-breadcrumb-item>
      </e-breadcrumb-items>
    </ejs-breadcrumb>
  </div>`
})
export class AppComponent {}
```

## Enable or Disable Navigation

Control breadcrumb item click behavior with the `enableNavigation` property:

### Disable Navigation (Default Pattern)

```ts
<ejs-breadcrumb [enableNavigation]="false">
  <e-breadcrumb-items>
    <e-breadcrumb-item text="Home"></e-breadcrumb-item>
    <e-breadcrumb-item text="Products"></e-breadcrumb-item>
    <e-breadcrumb-item text="Electronics"></e-breadcrumb-item>
  </e-breadcrumb-items>
</ejs-breadcrumb>
```

When `enableNavigation` is `false`, clicking items does NOT navigate. The component displays items for visual reference only.

### Enable Navigation

```ts
<ejs-breadcrumb [enableNavigation]="true">
  <e-breadcrumb-items>
    <e-breadcrumb-item text="Home" url="url"></e-breadcrumb-item>
    <e-breadcrumb-item text="Components" url="url"></e-breadcrumb-item>
    <e-breadcrumb-item text="Navigations" url="url"></e-breadcrumb-item>
    <e-breadcrumb-item text="Breadcrumb" url="url"></e-breadcrumb-item>
  </e-breadcrumb-items>
</ejs-breadcrumb>
```

When `enableNavigation` is `true` and `url` property is set, clicking items navigates to the specified URL.

## Key Takeaways

- Always enable `enableRipple(true)` for ripple effects
- Import `BreadcrumbModule` in your component's `imports` array
- Add CSS imports for your chosen theme
- Use `e-breadcrumb-item` directives for each breadcrumb level
- Control click behavior with `enableNavigation` property
- Structure items with `text`, `url`, and `iconCss` properties
