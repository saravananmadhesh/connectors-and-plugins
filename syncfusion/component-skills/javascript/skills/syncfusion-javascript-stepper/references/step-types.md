# Step Types

## Table of Contents
- [Overview](#overview)
- [Default Type](#default-type)
- [Label Only Type](#label-only-type)
- [Indicator Only Type](#indicator-only-type)
- [When to Use Each Type](#when-to-use-each-type)
- [Label Positions](#label-positions)
- [Switching Step Types](#switching-step-types)

## Overview

The `stepType` property controls how steps are displayed visually. There are three distinct step type options available, each suited for different UI requirements:

- **Default**: Icons + Labels (most common)
- **Label**: Text labels only (space-efficient)
- **Indicator**: Numbers or icons only (compact)

## Default Type

The **Default** type displays both indicators (with icons) and labels. This is the recommended type for most use cases as it provides clear visual information.

**Setting the type:**

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

let steps: StepModel[] = [
  { label: 'Cart', iconCss: 'sf-icon-cart' },
  { label: 'Delivery Address', iconCss: 'sf-icon-transport' },
  { label: 'Payment', iconCss: 'sf-icon-payment' },
  { label: 'Confirmation', iconCss: 'sf-icon-success' }
];

let stepper: Stepper = new Stepper({
  steps: steps,
  stepType: 'default'  // Explicitly set (also default if not specified)
});

stepper.appendTo('#stepper');
```

**Visual output:** Each step shows a numbered indicator (1, 2, 3, 4) or icon with the label text below.

**When to use:**
- Maximum clarity needed
- Desktop/large screen layouts
- Complex workflows requiring clear identification
- First-time user experiences

## Label Only Type

The **Label** type displays only step labels without icons or numbered indicators. This is space-efficient for multi-step processes.

**Setting the type:**

```typescript
let steps: StepModel[] = [
  { label: 'Cart' },
  { label: 'Shipping' },
  { label: 'Payment' },
  { label: 'Confirmation' }
];

let stepper: Stepper = new Stepper({
  steps: steps,
  stepType: 'label'
});

stepper.appendTo('#stepper');
```

**Visual output:** Each step displays only text labels, connected by a progress line.

**When to use:**
- Mobile or narrow viewports
- Text provides sufficient context
- Minimal design aesthetics
- When icons might be ambiguous

## Indicator Only Type

The **Indicator** type displays only numbered indicators (or icons if provided) without text labels. This is the most compact representation.

**Setting the type:**

```typescript
let steps: StepModel[] = [
  { iconCss: 'sf-icon-cart' },
  { iconCss: 'sf-icon-transport' },
  { iconCss: 'sf-icon-payment' },
  { iconCss: 'sf-icon-success' }
];

let stepper: Stepper = new Stepper({
  steps: steps,
  stepType: 'indicator'
});

stepper.appendTo('#stepper');
```

**Visual output:** Each step shows only a numbered indicator (1, 2, 3, 4) or custom icon without accompanying text.

**When to use:**
- Highly space-constrained layouts
- Icons are universally understood (payment, shipping, etc.)
- Detailed information available elsewhere
- Complex workflows with many steps (8+)

## Comparison Table

| Type | Display | Use Case | Space | Clarity |
|------|---------|----------|-------|---------|
| **Default** | Icon + Label | Most workflows | Medium | High |
| **Label** | Text only | Mobile, simple | Low | Medium |
| **Indicator** | Icon or number only | Compact, many steps | Minimal | Low |

## Practical Examples

**E-commerce checkout:**
```typescript
// Default type provides clarity at each stage
let checkoutSteps: StepModel[] = [
  { label: '1. Cart', iconCss: 'sf-icon-cart' },
  { label: '2. Shipping', iconCss: 'sf-icon-truck' },
  { label: '3. Payment', iconCss: 'sf-icon-credit' },
  { label: '4. Confirm', iconCss: 'sf-icon-check' }
];

let stepper: Stepper = new Stepper({
  steps: checkoutSteps,
  stepType: 'default'
});
stepper.appendTo('#checkout');
```

**Mobile form wizard:**
```typescript
// Label type saves space on mobile
let steps: StepModel[] = [
  { label: 'Personal' },
  { label: 'Contact' },
  { label: 'Address' },
  { label: 'Review' }
];

let stepper: Stepper = new Stepper({
  steps: steps,
  stepType: 'label'
});
stepper.appendTo('#mobileForm');
```

**Progress tracker:**
```typescript
// Indicator type for compact display
let steps: StepModel[] = [
  { iconCss: 'sf-icon-document' },
  { iconCss: 'sf-icon-review' },
  { iconCss: 'sf-icon-approve' },
  { iconCss: 'sf-icon-archive' },
  { iconCss: 'sf-icon-complete' }
];

let stepper: Stepper = new Stepper({
  steps: steps,
  stepType: 'indicator'
});
stepper.appendTo('#progress');
```

## Key Properties for Each Type

| Type | Icon Property | Label Property | Display |
|------|---------------|-----------------|---------|
| default | iconCss | label/text | Both shown |
| label | Ignored | label/text | Label only |
| indicator | iconCss | Ignored | Indicator only |

## Label Positions

The `labelPosition` property controls where step labels are displayed relative to step indicators. You can position labels at the **top**, **bottom**, **start** (left), or **end** (right).

**Label Position Values:**

| Value | Description | Visual |
|-------|-------------|--------|
| `top` | Label displayed above the indicator | Icon centered, label above |
| `bottom` | Label displayed below the indicator | Icon centered, label below |
| `start` | Label displayed to the left | Label-left ← Icon |
| `end` | Label displayed to the right | Icon → Label-right |

**Default Position:**

The default `labelPosition` is `bottom`.

**Setting Label Position:**

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

let steps: StepModel[] = [
  { label: 'Cart', iconCss: 'sf-icon-cart' },
  { label: 'Delivery Address', iconCss: 'sf-icon-transport' },
  { label: 'Payment', iconCss: 'sf-icon-payment' },
  { label: 'Confirmation', iconCss: 'sf-icon-success' }
];

// Top position
let stepperTop: Stepper = new Stepper({
  steps: steps,
  labelPosition: 'top'
});
stepperTop.appendTo('#stepper-top');

// Bottom position (default)
let stepperBottom: Stepper = new Stepper({
  steps: steps,
  labelPosition: 'bottom'
});
stepperBottom.appendTo('#stepper-bottom');

// Start position (left)
let stepperStart: Stepper = new Stepper({
  steps: steps,
  labelPosition: 'start'
});
stepperStart.appendTo('#stepper-start');

// End position (right)
let stepperEnd: Stepper = new Stepper({
  steps: steps,
  labelPosition: 'end'
});
stepperEnd.appendTo('#stepper-end');
```

**Changing Label Position Dynamically:**

```typescript
let stepper: Stepper = new Stepper({
  steps: steps,
  labelPosition: 'bottom'
});

stepper.appendTo('#stepper');

// Switch label position at runtime
function changeLabelPosition(position: string) {
  stepper.labelPosition = position;
  stepper.dataBind();  // Refresh UI
}

// Usage
changeLabelPosition('top');    // Move labels to top
changeLabelPosition('start');  // Move labels to left
changeLabelPosition('end');    // Move labels to right
changeLabelPosition('bottom'); // Move labels to bottom (default)
```

**Use Cases:**

- **Top**: Maximizes horizontal space, good for vertical layouts
- **Bottom**: Default and most common, clear vertical separation
- **Start**: Saves vertical space in horizontal layouts
- **End**: Alternative horizontal arrangement

## Switching Types Dynamically

Change step type at runtime:

```typescript
let stepper: Stepper = new Stepper({
  steps: mySteps,
  stepType: 'default'
});

stepper.appendTo('#stepper');

// Later, switch to label type
function switchToLabelType() {
  stepper.stepType = 'label';
  stepper.dataBind();  // Refresh the UI
}

function switchToIndicatorType() {
  stepper.stepType = 'indicator';
  stepper.dataBind();
}
```
