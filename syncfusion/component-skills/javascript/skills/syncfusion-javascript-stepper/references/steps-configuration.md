# Steps Configuration

## Table of Contents
- [Overview](#overview)
- [Adding Steps](#adding-steps)
- [Step Properties](#step-properties)
- [Step Models and Type Safety](#step-models-and-type-safety)
- [Complete Configuration Examples](#complete-configuration-examples)
- [Disabling Steps](#disabling-steps)
- [Setting Readonly](#setting-readonly)
- [Setting Active Step](#setting-active-step)

## Overview

Steps are the core building blocks of the Stepper control. Each step can be customized with icons, labels, text, and styling. Steps are defined using the `steps` property which accepts an array of `StepModel` objects.

## Adding Steps

The simplest way to add steps is to pass an array to the `steps` property:

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

// Basic steps (empty objects render as simple indicators)
let stepper: Stepper = new Stepper({
  steps: [{}, {}, {}, {}]
});

stepper.appendTo('#stepper');
```

## Step Properties

Each step is a `StepModel` object that supports these properties:

| Property | Type | Description |
|----------|------|-------------|
| `label` | string | Text label displayed for the step |
| `text` | string | Alternative text for the step |
| `iconCss` | string | CSS class for step icon |
| `cssClass` | string | Custom CSS class for styling |
| `isValid` | boolean \| null | Validation state (true: success, false: error, null: default) |
| `optional` | boolean | Mark step as optional |

## Icon-Only Steps

Display only icons without labels:

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

let iconOnlySteps: StepModel[] = [
  { iconCss: 'sf-icon-cart' },
  { iconCss: 'sf-icon-transport' },
  { iconCss: 'sf-icon-payment' },
  { iconCss: 'sf-icon-success' }
];

let stepper: Stepper = new Stepper({
  steps: iconOnlySteps
});

stepper.appendTo('#stepper');
```

## Label-Only Steps

Display only labels without icons:

```typescript
let labelOnlySteps: StepModel[] = [
  { label: 'Cart' },
  { label: 'Shipping' },
  { label: 'Payment' },
  { label: 'Confirmation' }
];

let stepper: Stepper = new Stepper({
  steps: labelOnlySteps
});

stepper.appendTo('#stepper');
```

## Icon and Label Combined

Display both icons and labels (most common):

```typescript
let iconWithLabelSteps: StepModel[] = [
  { label: 'Cart', iconCss: 'sf-icon-cart' },
  { label: 'Delivery Address', iconCss: 'sf-icon-transport' },
  { label: 'Payment', iconCss: 'sf-icon-payment' },
  { label: 'Confirmation', iconCss: 'sf-icon-success' }
];

let stepper: Stepper = new Stepper({
  steps: iconWithLabelSteps
});

stepper.appendTo('#stepper');
```

## Step Validation States

Set validation state using the `isValid` property:

```typescript
let validatedSteps: StepModel[] = [
  { label: 'Cart', iconCss: 'sf-icon-cart', isValid: true },      // Success/completed
  { label: 'Shipping', iconCss: 'sf-icon-transport' },             // Neutral/in-progress
  { label: 'Payment', iconCss: 'sf-icon-payment', isValid: false }, // Error
  { label: 'Confirmation', iconCss: 'sf-icon-success' }            // Not started
];

let stepper: Stepper = new Stepper({
  steps: validatedSteps
});

stepper.appendTo('#stepper');
```

## Optional Steps

Mark steps as optional with the `optional` property:

```typescript
let optionalSteps: StepModel[] = [
  { label: 'Cart', iconCss: 'sf-icon-cart' },
  { label: 'Shipping', iconCss: 'sf-icon-transport' },
  { label: 'Gift Message', iconCss: 'sf-icon-gift', optional: true },
  { label: 'Payment', iconCss: 'sf-icon-payment' }
];

let stepper: Stepper = new Stepper({
  steps: optionalSteps
});

stepper.appendTo('#stepper');
```

## Using StepModel Interface

For type safety, import and use `StepModel`:

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

const mySteps: StepModel[] = [
  {
    label: 'Step 1',
    iconCss: 'sf-icon-cart',
    cssClass: 'custom-class',
    isValid: true,
    optional: false
  },
  {
    label: 'Step 2',
    iconCss: 'sf-icon-truck'
  }
];

let stepper: Stepper = new Stepper({
  steps: mySteps
});

stepper.appendTo('#stepper');
```

## Complete Configuration Example

A real-world checkout flow with all features:

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

let checkoutSteps: StepModel[] = [
  {
    label: 'Review Order',
    iconCss: 'sf-icon-cart',
    isValid: true
  },
  {
    label: 'Shipping Address',
    iconCss: 'sf-icon-transport'
  },
  {
    label: 'Shipping Method',
    iconCss: 'sf-icon-truck',
    optional: true
  },
  {
    label: 'Payment Details',
    iconCss: 'sf-icon-payment'
  },
  {
    label: 'Order Confirmation',
    iconCss: 'sf-icon-check'
  }
];

let stepper: Stepper = new Stepper({
  steps: checkoutSteps,
  activeStep: 1,
  linear: true
});

stepper.appendTo('#stepper');
```

## Accessing Steps at Runtime

Access and modify steps after initialization:

```typescript
// Get current steps
let currentSteps = stepper.steps;

// Update a specific step
stepper.steps[2].isValid = false;

// Add custom styling
stepper.steps[1].cssClass = 'active-emphasis';

// Update step content
stepper.steps[0].label = 'Review Your Items';
```

## Disabling Steps

Disable specific steps to prevent user interaction while keeping them visible. Use the `disabled` property on individual steps.

**Setting Disabled State:**

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

let steps: StepModel[] = [
  { iconCss: 'sf-icon-cart', label: 'Cart' },
  { iconCss: 'sf-icon-transport', label: 'Delivery' },
  { iconCss: 'sf-icon-payment', label: 'Payment', disabled: true },
  { iconCss: 'sf-icon-success', label: 'Confirmation' }
];

let stepper: Stepper = new Stepper({
  steps: steps
});

stepper.appendTo('#stepper');
```

**Disabling Steps Dynamically:**

```typescript
// Disable a step at runtime
stepper.steps[2].disabled = true;

// Enable a step
stepper.steps[2].disabled = false;

// Update the UI
stepper.dataBind();
```

**Use Cases for Disabled Steps:**

- Prevent access to incomplete checkout steps
- Disable future steps until current step is validated
- Hide unavailable payment methods
- Lock steps based on user role or permissions

## Setting Readonly

Makes the entire Stepper read-only, disabling all user interactions. Unlike disabling individual steps, `readOnly` applies to the entire control.

**Readonly vs Disabled Comparison:**

| Property | Scope | Effect | Visible | Use Case |
|----------|-------|--------|---------|----------|
| `disabled` (step) | Individual step | Prevents clicking that step | Yes | Block specific steps |
| `readOnly` (stepper) | Entire stepper | Prevents clicking any step | Yes | Review-only mode or locked workflow |

**Setting Readonly:**

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

let steps: StepModel[] = [
  { iconCss: 'sf-icon-cart', label: 'Shopping Cart' },
  { iconCss: 'sf-icon-transport', label: 'Shipping' },
  { iconCss: 'sf-icon-payment', label: 'Payment' },
  { iconCss: 'sf-icon-success', label: 'Order Complete' }
];

// Read-only stepper
let stepper: Stepper = new Stepper({
  steps: steps,
  readOnly: true,
  activeStep: 3  // Display final step
});

stepper.appendTo('#stepper');
```

**Toggling Readonly At Runtime:**

```typescript
// Enable read-only mode
stepper.readOnly = true;

// Allow editing
stepper.readOnly = false;

// Update the UI
stepper.dataBind();
```

**Common Scenarios:**

- **Order Review Mode**: Display completed order flow as read-only
- **Form Preview**: Show form progress without allowing navigation
- **Locked Workflows**: Prevent changes in finalized processes
- **Approval Workflows**: Display readonly until approved

## Setting Active Step

Control which step is active by default or change it dynamically using the `activeStep` property. The value is zero-based (0 = first step).

**Setting Initial Active Step:**

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

let steps: StepModel[] = [
  { label: 'Account Info', iconCss: 'sf-icon-user' },
  { label: 'Shipping', iconCss: 'sf-icon-truck' },
  { label: 'Payment', iconCss: 'sf-icon-wallet' },
  { label: 'Review', iconCss: 'sf-icon-checkmark' }
];

// Start on step 2 (Payment step)
let stepper: Stepper = new Stepper({
  steps: steps,
  activeStep: 2
});

stepper.appendTo('#stepper');
```

**Changing Active Step Dynamically:**

```typescript
// Move to step 0 (first step)
stepper.activeStep = 0;

// Move to step 2 (third step)
stepper.activeStep = 2;

// Move to last step
stepper.activeStep = stepper.steps.length - 1;

// Update the UI
stepper.dataBind();
```

**Navigation Helpers:**

```typescript
// Go to next step
function goToNextStep() {
  if (stepper.activeStep < stepper.steps.length - 1) {
    stepper.activeStep++;
    stepper.dataBind();
  }
}

// Go to previous step
function goToPreviousStep() {
  if (stepper.activeStep > 0) {
    stepper.activeStep--;
    stepper.dataBind();
  }
}

// Jump to specific step
function jumpToStep(stepIndex: number) {
  if (stepIndex >= 0 && stepIndex < stepper.steps.length) {
    stepper.activeStep = stepIndex;
    stepper.dataBind();
  }
}
```

**Real-World Example - Multi-Step Form:**

```typescript
let checkoutForm: Stepper = new Stepper({
  steps: [
    { label: 'Account', text: 'Create account' },
    { label: 'Address', text: 'Shipping address' },
    { label: 'Payment', text: 'Payment method' },
    { label: 'Review', text: 'Review order' }
  ],
  activeStep: 0  // Start at account creation
});

checkoutForm.appendTo('#checkout-form');

// Form submission handlers
document.getElementById('nextBtn').addEventListener('click', () => {
  if (validateCurrentStep()) {
    goToNextStep();
  }
});

document.getElementById('prevBtn').addEventListener('click', () => {
  goToPreviousStep();
});
```

## Key Takeaways

- Use `StepModel[]` array for the `steps` property
- Each step can have `label`, `iconCss`, `text`, `isValid`, `optional` properties
- `isValid: true` shows success state, `isValid: false` shows error state
- Combine icons and labels for best visual communication
- Use `optional: true` to indicate non-required steps
