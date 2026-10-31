# Getting Started with Angular Stepper

## Table of Contents
- [Dependencies](#dependencies)
- [Setup Angular Environment](#setup-angular-environment)
- [Create a New Application](#create-a-new-application)
- [Install Syncfusion Package](#install-syncfusion-package)
- [Add Stepper Component](#add-stepper-component)
- [Using CSS Themes](#using-css-themes)
- [Running the Application](#running-the-application)

## Dependencies

The following dependencies are required to use the Stepper component:

```
@syncfusion/ej2-angular-navigations
├── @syncfusion/ej2-base
├── @syncfusion/ej2-popups
├── @syncfusion/ej2-navigations
└── @syncfusion/ej2-angular-base
```

These packages are automatically installed when you install the main Syncfusion navigations package.

## Setup Angular Environment

### Install Angular CLI

Use [Angular CLI](https://github.com/angular/angular-cli) to set up your Angular application:

```bash
npm install -g @angular/cli
```

### Install Specific Angular CLI Version

To install a particular version of Angular CLI required for your project:

```bash
npm install -g @angular/cli@21.0.0
```

## Create a New Application

Generate a new Angular application using the Angular CLI:

```bash
ng new syncfusion-angular-app
```

During the setup wizard, you'll be prompted to configure:

```bash
? Which stylesheet format would you like to use? (Use arrow keys)
> CSS             [ https://developer.mozilla.org/docs/Web/CSS                     ]
  Sass (SCSS)     [ https://sass-lang.com/documentation/syntax#scss                ]
  Sass (Indented) [ https://sass-lang.com/documentation/syntax#the-indented-syntax ]
  Less            [ http://lesscss.org/                                             ]
```

For SCSS support, use:

```bash
ng new syncfusion-angular-app --style=scss
```

**Server-side rendering (SSR) prompt:** Choose the appropriate configuration for your needs.

**Additional prompts:**
- Select AI tool support if needed, or choose 'none'
- Configure any other project-specific settings

Navigate to your project directory:

```bash
cd syncfusion-angular-app
```

## Install Syncfusion Package

Install the Syncfusion navigations package:

```bash
npm install @syncfusion/ej2-angular-navigations
```

This command installs the Stepper component along with all required dependencies.

## Add Stepper Component

### Basic Stepper Implementation

Create a basic stepper with steps in your component:

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Component logic here
}
```

Bootstrap your application:

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'zone.js';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

### HTML Template

Add the Stepper component to your template with steps:

```html
<div class="stepper-container">
  <ejs-stepper>
    <e-steps>
      <e-step label="Step 1" iconCss="sf-icon-home"></e-step>
      <e-step label="Step 2" iconCss="sf-icon-settings"></e-step>
      <e-step label="Step 3" iconCss="sf-icon-check"></e-step>
      <e-step label="Step 4" iconCss="sf-icon-success"></e-step>
    </e-steps>
  </ejs-stepper>
</div>
```

### Component Styling

Basic styling for the stepper container:

```css
.stepper-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
```

## Using CSS Themes

Syncfusion Stepper supports multiple built-in themes. Import the theme CSS in your global styles file.

### Import Theme in Main CSS

Add to your `styles.css`:

```css
/* Material Theme (Default) */
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/stepper/index.css";
```

### Theme Options

Available themes:
- **material** - Material Design (default)
- **bootstrap** - Bootstrap 5 style
- **bootstrap4** - Bootstrap 4 style
- **fluent** - Microsoft Fluent Design
- **tailwind** - Tailwind CSS theme
- **highcontrast** - High contrast for accessibility

Choose one based on your application's design system.

## Running the Application

Start the development server:

```bash
ng serve
```

Open your browser and navigate to:
```
http://localhost:4200
```

You should see your Stepper component rendering with the configured steps.

## Complete Getting Started Example

Combine all elements for a complete working example:

```ts
// app.component.ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="stepper-container">
      <h1>Order Workflow</h1>
      <ejs-stepper>
        <e-steps>
          <e-step label="Cart" iconCss="sf-icon-cart"></e-step>
          <e-step label="Delivery Address" iconCss="sf-icon-transport"></e-step>
          <e-step label="Payment" iconCss="sf-icon-payment"></e-step>
          <e-step label="Confirmation" iconCss="sf-icon-success"></e-step>
        </e-steps>
      </ejs-stepper>
    </div>
  `,
  styles: [`
    .stepper-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    h1 {
      text-align: center;
      margin-bottom: 30px;
    }
  `]
})
export class AppComponent { }
```

## Troubleshooting

**Issue: Styles not applied?**
- Ensure CSS theme is imported in `styles.css`
- Check that `@syncfusion/ej2-angular-navigations` package is installed

**Issue: Component not rendering?**
- Verify `StepperModule` is imported in component
- Check standalone component setup with `imports: [StepperModule]`

**Issue: Icons not displaying?**
- Ensure icon library CSS is imported (check `iconCss` values)
- Icon classes must be defined in your CSS or use a font icon library

**Next Steps:** Once you have the basic stepper working, explore configuring steps with [steps-configuration.md](steps-configuration.md) and different step types with [step-types.md](step-types.md).
