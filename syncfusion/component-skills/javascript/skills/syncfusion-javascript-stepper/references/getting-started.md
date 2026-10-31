# Getting Started with Syncfusion TypeScript Stepper

## Table of Contents
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Set Up Development Environment](#set-up-development-environment)
- [Import CSS Styles](#import-css-styles)
- [Add Stepper to HTML](#add-stepper-to-html)
- [Initialize the Stepper](#initialize-the-stepper)
- [Run the Application](#run-the-application)
- [Basic Example with Labels](#basic-example-with-labels)
- [Common Initialization Properties](#common-initialization-properties)
- [Next Steps](#next-steps)

## Installation

The Syncfusion TypeScript Stepper is part of the `@syncfusion/ej2-navigations` package. Begin by installing the required dependencies:

```bash
npm install @syncfusion/ej2-navigations
```

## Dependencies

The Stepper control requires the following packages:

```
@syncfusion/ej2-navigations
├── @syncfusion/ej2-base
└── @syncfusion/ej2-popups
```

All dependencies are typically installed automatically when you install the main package.

## Set Up Development Environment

Clone and navigate to the Syncfusion quickstart repository:

```bash
git clone url
cd ej2-quickstart
npm install
```

**Requirements:** Node v14.15.0 or higher and webpack v4 or higher.

## Import CSS Styles

Add the required CSS imports to your `styles.css` file:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/stepper/index.css";
```

Themes available: `fluent2`, `bootstrap`, `bootstrap4`, `fabric`, `highcontrast`, `material`, `office365`, `tailwind`

## Add Stepper to HTML

Insert a `<nav>` element with an ID in your HTML file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Syncfusion Stepper</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="styles/styles.css" />
  </head>
  <body>
    <div class="control-container">
      <nav id="stepper"></nav>
    </div>
  </body>
</html>
```

## Initialize the Stepper

Import and create a new Stepper instance in your TypeScript file:

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

// Create stepper with basic 5 steps
let stepper: Stepper = new Stepper({
  steps: [{}, {}, {}, {}, {}]
});

// Render to DOM
stepper.appendTo('#stepper');
```

## Run the Application

Start the development server:

```bash
npm start
```

The Stepper now displays horizontally with 5 steps.

## Basic Example with Labels

Here's a complete example with labeled steps:

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

// Define steps with labels
let steps: StepModel[] = [
  { label: 'Cart' },
  { label: 'Shipping' },
  { label: 'Payment' },
  { label: 'Confirmation' }
];

let stepper: Stepper = new Stepper({
  steps: steps
});

stepper.appendTo('#stepper');
```

## Common Initialization Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `steps` | StepModel[] | [] | Array of step objects |
| `activeStep` | number | 0 | Currently active step index |
| `orientation` | string | 'horizontal' | Horizontal or vertical layout |
| `linear` | boolean | false | Enforce sequential navigation |
| `stepType` | string | 'default' | Display type of steps |

## Next Steps

- Configure individual steps with icons and labels: See [steps-configuration.md](steps-configuration.md)
- Customize step appearance and types: See [step-types.md](step-types.md)
- Handle user interactions and events: See [events-interaction.md](events-interaction.md)
