# Orientations and Layout

## Table of Contents
- [Horizontal Orientation](#horizontal-orientation)
- [Vertical Orientation](#vertical-orientation)
- [Comparison Table](#comparison-table)
- [Responsive Behavior](#responsive-behavior)
- [Switching Orientations Dynamically](#switching-orientations-dynamically)
- [Styling Considerations](#styling-considerations)
- [Practical Example: Responsive Stepper](#practical-example-responsive-stepper)
- [Key Takeaways](#key-takeaways)

The `orientation` property controls how steps are arranged visually. The Stepper supports **Horizontal** (default) and **Vertical** layouts to accommodate different UI designs.

## Horizontal Orientation

In **Horizontal** orientation, steps are displayed side-by-side in a row. This is the default layout and works well for most workflows.

**Configuration:**

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

let steps: StepModel[] = [
  { label: 'Cart', iconCss: 'sf-icon-cart' },
  { label: 'Shipping', iconCss: 'sf-icon-truck' },
  { label: 'Payment', iconCss: 'sf-icon-payment' },
  { label: 'Confirmation', iconCss: 'sf-icon-check' }
];

let stepper: Stepper = new Stepper({
  steps: steps,
  orientation: 'horizontal'  // Default, can be omitted
});

stepper.appendTo('#stepper');
```

**Characteristics:**
- Steps arranged left-to-right
- Progress line flows horizontally
- Best for desktop and tablet views
- Clear linear progression
- Responsive: adapts to smaller screens

**When to use:**
- Desktop/primary layouts
- Workflows with 4-6 steps
- Forms where horizontal space is available
- Clear step progression needed

**Example: Checkout Flow**

```typescript
let checkoutSteps: StepModel[] = [
  { label: 'Review', iconCss: 'sf-icon-review' },
  { label: 'Address', iconCss: 'sf-icon-location' },
  { label: 'Shipping', iconCss: 'sf-icon-truck' },
  { label: 'Payment', iconCss: 'sf-icon-card' },
  { label: 'Complete', iconCss: 'sf-icon-success' }
];

let stepper: Stepper = new Stepper({
  steps: checkoutSteps,
  orientation: 'horizontal'
});

stepper.appendTo('#checkout');
```

## Vertical Orientation

In **Vertical** orientation, steps are displayed one above another in a column. This layout is useful for limited horizontal space or tall, complex forms.

**Configuration:**

```typescript
let steps: StepModel[] = [
  { label: 'Personal Info', iconCss: 'sf-icon-user' },
  { label: 'Contact Details', iconCss: 'sf-icon-phone' },
  { label: 'Address', iconCss: 'sf-icon-home' },
  { label: 'Review', iconCss: 'sf-icon-check' }
];

let stepper: Stepper = new Stepper({
  steps: steps,
  orientation: 'vertical'
});

stepper.appendTo('#stepper');
```

**Characteristics:**
- Steps arranged top-to-bottom
- Progress line flows vertically
- Ideal for mobile and narrow viewports
- Allows detailed step descriptions
- Better for many steps (8+)

**When to use:**
- Mobile/responsive layouts
- Forms with many steps
- Vertical space available, horizontal limited
- Detailed explanations per step
- Tabbed or accordion-like behavior

**Example: Multi-Page Form**

```typescript
let formSteps: StepModel[] = [
  { label: 'Basic Information', text: 'Name and email' },
  { label: 'Address Details', text: 'Street and postal code' },
  { label: 'Payment Method', text: 'Credit card or digital wallet' },
  { label: 'Confirmation', text: 'Review and submit' }
];

let stepper: Stepper = new Stepper({
  steps: formSteps,
  orientation: 'vertical'
});

stepper.appendTo('#form');
```

## Comparison Table

| Aspect | Horizontal | Vertical |
|--------|-----------|----------|
| **Layout** | Left-to-right | Top-to-bottom |
| **Space** | Requires width | Requires height |
| **Best for** | Desktop | Mobile |
| **Max Steps** | 4-6 typical | 8+ recommended |
| **Responsive** | Good | Excellent |
| **Clarity** | Very high | High |

## Responsive Behavior

By default, the Stepper automatically adapts:

```typescript
let stepper: Stepper = new Stepper({
  steps: mySteps,
  orientation: 'horizontal'  // Start horizontal on desktop
});

stepper.appendTo('#stepper');

// Note: CSS media queries can manually control orientation
// For mobile:
// #stepper .e-stepper {
//   flex-direction: column; // Switch to vertical
// }
```

## Switching Orientations Dynamically

Change orientation at runtime:

```typescript
let stepper: Stepper = new Stepper({
  steps: mySteps,
  orientation: 'horizontal'
});

stepper.appendTo('#stepper');

// Toggle between orientations
function toggleOrientation() {
  if (stepper.orientation === 'horizontal') {
    stepper.orientation = 'vertical';
  } else {
    stepper.orientation = 'horizontal';
  }
  stepper.dataBind();  // Refresh UI
}

// Example: Switch based on screen size
function handleResize() {
  if (window.innerWidth < 768) {
    stepper.orientation = 'vertical';
  } else {
    stepper.orientation = 'horizontal';
  }
  stepper.dataBind();
}

window.addEventListener('resize', handleResize);
```

## Styling Considerations

### Horizontal Layout Styling

```css
/* Adjust width for horizontal stepper */
.e-stepper {
  max-width: 100%;
  padding: 20px;
}

/* Ensure steps fit on smaller screens */
@media (max-width: 768px) {
  .e-stepper {
    transform: scale(0.9); /* Compress if needed */
  }
}
```

### Vertical Layout Styling

```css
/* Vertical stepper styling */
.e-stepper {
  flex-direction: column;
  width: 100%;
}

/* Add spacing between vertical steps */
.e-step {
  margin-bottom: 20px;
}

/* Connect steps with line */
.e-stepper-progressbar {
  width: 2px;
  left: 25px;
}
```

## Practical Example: Responsive Stepper

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

let steps: StepModel[] = [
  { label: 'Step 1', iconCss: 'sf-icon-one' },
  { label: 'Step 2', iconCss: 'sf-icon-two' },
  { label: 'Step 3', iconCss: 'sf-icon-three' }
];

let stepper: Stepper = new Stepper({
  steps: steps,
  orientation: 'horizontal'
});

stepper.appendTo('#stepper');

// Adjust orientation on window resize
function adjustOrientation() {
  const width = window.innerWidth;
  stepper.orientation = width < 768 ? 'vertical' : 'horizontal';
  stepper.dataBind();
}

window.addEventListener('resize', adjustOrientation);
adjustOrientation();  // Initial setup
```

## Key Takeaways

- Use **Horizontal** for desktop layouts and 4-6 steps
- Use **Vertical** for mobile and complex forms
- Stepper auto-responds to screen size changes
- Switch orientations dynamically with `orientation` property
- Combine with CSS media queries for responsive design
