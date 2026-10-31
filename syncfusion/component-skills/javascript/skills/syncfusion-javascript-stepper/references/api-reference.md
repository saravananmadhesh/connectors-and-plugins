# API Reference - Syncfusion TypeScript Stepper

## Table of Contents
- [Stepper Control Properties](#stepper-control-properties)
- [Stepper Methods](#stepper-methods)
- [Stepper Events](#stepper-events)
- [Step Properties](#step-properties)
- [Step Status Enum](#step-status-enum)
- [Label Position Enum](#label-position-enum)
- [Step Type Enum](#step-type-enum)
- [Orientation Enum](#orientation-enum)
- [Animation Settings](#animation-settings)

---

## Stepper Control Properties

### activeStep

**Type:** `number`  
**Default:** `0`  
**Description:** Defines the current step index of the Stepper.

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}],
    activeStep: 2  // Start on third step (zero-based index)
});
stepper.appendTo('#stepper');
```

### animation

**Type:** `StepperAnimationSettingsModel`  
**Default:** `{ enable: true, duration: 2000, delay: 0 }`  
**Description:** Defines the step progress animation settings.

**Quick Example:**
```typescript
let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}],
    animation: { enable: true, duration: 3000, delay: 500 }
});
stepper.appendTo('#stepper');
```

**Full Guide:** See [Templates and Animation - Animation Configuration](./templates-animation.md#animation-configuration) for comprehensive animation patterns and advanced options.

**Animation Settings Properties:**
- `enable` (boolean): Enable/disable animation
- `duration` (number): Animation duration in milliseconds
- `delay` (number): Delay before animation starts

### cssClass

**Type:** `string`  
**Default:** `''`  
**Description:** Defines custom CSS classes to customize the Stepper appearance.

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}],
    cssClass: 'custom-stepper themed-stepper'
});
stepper.appendTo('#stepper');

// CSS in your stylesheet:
// .custom-stepper { /* custom styling */ }
// .custom-stepper .e-step-indicator { /* style indicators */ }
```

### enablePersistence

**Type:** `boolean`  
**Default:** `false`  
**Description:** Enable or disable persisting component's state between page reloads.

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}],
    enablePersistence: true  // State will be saved in localStorage
});
stepper.appendTo('#stepper');

// When page reloads, the stepper will restore to its previous state
```

### enableRtl

**Type:** `boolean`  
**Default:** `false`  
**Description:** Enable or disable rendering component in right to left direction.

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}],
    enableRtl: true  // Render in RTL mode for Arabic, Hebrew, etc.
});
stepper.appendTo('#stepper');
```

### labelPosition

**Type:** `string | StepLabelPosition`  
**Default:** `'bottom'`  
**Description:** Defines the label position in the Stepper. See [Label Position Enum](#label-position-enum).

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
    steps: [
        { label: 'Step 1', iconCss: 'sf-icon-1' },
        { label: 'Step 2', iconCss: 'sf-icon-2' }
    ],
    labelPosition: 'top'  // Labels appear above indicators
});
stepper.appendTo('#stepper');
```

### linear

**Type:** `boolean`  
**Default:** `false`  
**Description:** Enable sequential step-by-step navigation. When true, users can only proceed to the next step in order.

**Quick Example:**
```typescript
let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}],
    linear: true  // Enforce sequential navigation
});
stepper.appendTo('#stepper');
```

**Full Guide:** See [Validation and Globalization - Linear Flow](./validation-globalization.md#linear-flow) for validation patterns and enforcement strategies.

### locale

**Type:** `string`  
**Default:** `'en-US'`  
**Description:** Overrides the global culture and localization value for this component.

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}],
    locale: 'fr-FR'  // French localization
});
stepper.appendTo('#stepper');
```

### orientation

**Type:** `string | StepperOrientation`  
**Default:** `'Horizontal'`  
**Description:** Defines the layout orientation of the Stepper. See [Orientation Enum](#orientation-enum).

**Quick Example:**
```typescript
let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}],
    orientation: 'Vertical'  // Stack steps vertically
});
stepper.appendTo('#stepper');
```

**Valid Values:**
- `'Horizontal'` - Side-by-side layout (default, desktop-friendly)
- `'Vertical'` - Stacked layout (mobile-friendly, space-efficient)

**Full Guide:** See [Orientations and Layout Complete Guide](./orientations.md) for detailed characteristics, responsive behavior, and styling options.

### readOnly

**Type:** `boolean`  
**Default:** `false`  
**Description:** Defines whether read-only mode is enabled, disabling all user interactions.

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}],
    readOnly: true  // Users cannot interact with the stepper
});
stepper.appendTo('#stepper');
```

### showTooltip

**Type:** `boolean`  
**Default:** `false`  
**Description:** Defines whether to show tooltip on each step.

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
    steps: [
        { label: 'Cart', iconCss: 'sf-icon-cart' },
        { label: 'Address', iconCss: 'sf-icon-address' }
    ],
    showTooltip: true  // Tooltips appear on hover
});
stepper.appendTo('#stepper');
```

### stepType

**Type:** `string`  
**Default:** `'Default'`  
**Description:** Defines how steps are displayed (Default, Label, or Indicator). See [Step Type Enum](#step-type-enum).

**Quick Example:**
```typescript
let stepper: Stepper = new Stepper({
    steps: [{ label: 'Step 1' }, { label: 'Step 2' }],
    stepType: 'Label'  // Show labels only
});
stepper.appendTo('#stepper');
```

**Valid Values:**
- `'Default'` - Icons with labels (recommended)
- `'Label'` - Text labels only (space-efficient)
- `'Indicator'` - Icons/numbers only (compact)

**Full Guide:** See [Step Types Complete Guide](./step-types.md) for detailed comparison, use cases, and switching types dynamically.

### steps

**Type:** `StepModel[]`  
**Default:** `[]`  
**Description:** Defines the array of steps in the Stepper.

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

const steps: StepModel[] = [
    { label: 'Cart', iconCss: 'sf-icon-cart', text: '4 items' },
    { label: 'Shipping', iconCss: 'sf-icon-truck', text: 'Select address' },
    { label: 'Payment', iconCss: 'sf-icon-credit-card', text: 'Enter details' },
    { label: 'Confirmation', iconCss: 'sf-icon-check', text: 'Review order' }
];

let stepper: Stepper = new Stepper({
    steps: steps
});
stepper.appendTo('#stepper');
```

### template

**Type:** `string | Function`  
**Default:** `''`  
**Description:** Defines custom HTML template content for each step.

**Quick Example:**
```typescript
let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}],
    template: '<div class="step-content">${currentStep}</div>'
});
stepper.appendTo('#stepper');
```

**Template Variables:**
- `${step}` - Current step object
- `${currentStep}` - Current step index
- `${step.label}` - Step label text
- `${step.iconCss}` - Step icon class

**Full Guide:** See [Templates and Animation - Template Basics](./templates-animation.md#template-basics) for template context, custom HTML examples, and advanced customization patterns.

### tooltipTemplate

**Type:** `string | Function`  
**Default:** `''`  
**Description:** Defines custom template for tooltip content shown on step hover.

**Quick Example:**
```typescript
let stepper: Stepper = new Stepper({
    steps: [
        { label: 'Cart' },
        { label: 'Shipping' }
    ],
    showTooltip: true,
    tooltipTemplate: '<div class="custom-tooltip">${label}</div>'
});
stepper.appendTo('#stepper');
```

**Full Guide:** See [Templates and Animation - Tooltips and Templates](./templates-animation.md#tooltips-and-templates) for template context and advanced tooltip customization.

---

## Stepper Methods

### addEventListener(eventName, handler)

**Description:** Adds a handler to the given event listener.

**Parameters:**
- `eventName` (string): Name of the event to listen to
- `handler` (Function): Function to execute when event occurs

**Returns:** `void`

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}]
});
stepper.appendTo('#stepper');

// Add event listener
stepper.addEventListener('stepChanged', (args: any) => {
    console.log('Current step:', args.activeStep);
});
```

### appendTo(selector?)

**Description:** Appends the control within the given HTML element.

**Parameters:**
- `selector` (string | HTMLElement, optional): Target container for the stepper

**Returns:** `void`

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}]
});

// Using CSS selector
stepper.appendTo('#stepper-container');

// Or using HTMLElement
const container = document.getElementById('stepper-container');
stepper.appendTo(container);
```

### dataBind()

**Description:** Applies pending property changes immediately and updates the view.

**Parameters:** None

**Returns:** `void`

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}]
});
stepper.appendTo('#stepper');

// Modify properties
stepper.activeStep = 2;
stepper.orientation = 'Vertical';

// Apply changes to DOM
stepper.dataBind();
```

### destroy()

**Description:** Destroy the stepper control and remove it from DOM.

**Parameters:** None

**Returns:** `void`

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}]
});
stepper.appendTo('#stepper');

// Clean up: destroy the stepper
function cleanup() {
    stepper.destroy();
}

// When leaving a page or cleaning up
window.addEventListener('beforeunload', cleanup);
```

### getRootElement()

**Description:** Returns the root HTML element of the stepper component.

**Parameters:** None

**Returns:** `HTMLElement`

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}]
});
stepper.appendTo('#stepper');

// Get root element
const rootElement: HTMLElement = stepper.getRootElement();
console.log(rootElement.classList); // e-stepper, e-horizontal, etc.
```

### nextStep()

**Description:** Move to the next step from the current step.

**Parameters:** None

**Returns:** `void`

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}],
    activeStep: 0
});
stepper.appendTo('#stepper');

// Move to next step
document.getElementById('nextBtn').addEventListener('click', () => {
    stepper.nextStep();
});
```

### previousStep()

**Description:** Move to the previous step from the current step.

**Parameters:** None

**Returns:** `void`

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}],
    activeStep: 2
});
stepper.appendTo('#stepper');

// Move to previous step
document.getElementById('prevBtn').addEventListener('click', () => {
    stepper.previousStep();
});
```

### refresh()

**Description:** Applies all pending property changes and renders the component again.

**Parameters:** None

**Returns:** `void`

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}]
});
stepper.appendTo('#stepper');

// Make multiple changes
stepper.orientation = 'Vertical';
stepper.stepType = 'Label';
stepper.labelPosition = 'start';

// Refresh to apply all changes at once
stepper.refresh();
```

### refreshProgressbar()

**Description:** Refreshes the position of the progress bar when parent container dimensions change.

**Parameters:** None

**Returns:** `void`

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}]
});
stepper.appendTo('#stepper');

// When window resizes or parent container changes
window.addEventListener('resize', () => {
    stepper.refreshProgressbar();
});
```

### removeEventListener(eventName, handler)

**Description:** Removes the handler from the given event listener.

**Parameters:**
- `eventName` (string): Name of the event
- `handler` (Function): Function to remove

**Returns:** `void`

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}]
});
stepper.appendTo('#stepper');

// Define handler
const handleStepChange = (args: any) => {
    console.log('Step changed to:', args.activeStep);
};

// Add listener
stepper.addEventListener('stepChanged', handleStepChange);

// Later, remove listener
stepper.removeEventListener('stepChanged', handleStepChange);
```

### reset()

**Description:** Reset the state of the Stepper and move to the first step.

**Parameters:** None

**Returns:** `void`

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}],
    activeStep: 3
});
stepper.appendTo('#stepper');

// Reset to first step
document.getElementById('resetBtn').addEventListener('click', () => {
    stepper.reset();
    // activeStep now = 0
});
```

### Inject(moduleList)

**Description:** Dynamically injects the required modules to the component.

**Parameters:**
- `moduleList` (Function[]): Array of module functions to inject

**Returns:** `void`

```typescript
import { Stepper, StepStyle } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}]
});

// Inject additional modules if needed
Stepper.Inject(StepStyle);
stepper.appendTo('#stepper');
```

---

## Stepper Events

The Stepper fires 5 events during the component lifecycle and user interactions. **For comprehensive event patterns, validation examples, and detailed usage**, see [Events and Interaction Complete Guide](./events-interaction.md).

### Event Summary

| Event | Triggers | Cancelable | Key Properties |
|-------|----------|-----------|-----------------|
| `created` | Component initialization complete | No | None |
| `beforeStepRender` | Before each step renders | No | `element`, `index` |
| `stepClick` | User clicks a step | No | `activeStep`, `previousStep` |
| `stepChanging` | Before step change | **YES** | `activeStep`, `cancel`, `isInteracted` |
| `stepChanged` | After step changes | No | `activeStep`, `isInteracted` |

**Detailed Event Documentation:**
See [Events and Interaction Guide](./events-interaction.md) for:
- Complete event arguments for all 5 events
- Practical event handling patterns
- Validation workflows
- Form integration examples
- Analytics and tracking patterns

---

## Step Properties

Each step in the `steps` array uses the `StepModel` interface with these properties:

### cssClass

**Type:** `string`  
**Default:** `''`  
**Description:** Custom CSS classes for styling individual steps.

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

const steps: StepModel[] = [
    { label: 'Step 1', cssClass: 'step-highlight' },
    { label: 'Step 2', cssClass: 'step-secondary' }
];

let stepper: Stepper = new Stepper({ steps });
stepper.appendTo('#stepper');
```

### disabled

**Type:** `boolean`  
**Default:** `false`  
**Description:** Disable a specific step to prevent user interaction.

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

const steps: StepModel[] = [
    { label: 'Step 1' },
    { label: 'Step 2', disabled: true },  // Can't click this step
    { label: 'Step 3' }
];

let stepper: Stepper = new Stepper({ steps });
stepper.appendTo('#stepper');
```

### iconCss

**Type:** `string`  
**Default:** `''`  
**Description:** CSS class for the step icon.

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

const steps: StepModel[] = [
    { label: 'Cart', iconCss: 'sf-icon-shopping-cart' },
    { label: 'Payment', iconCss: 'sf-icon-credit-card' },
    { label: 'Success', iconCss: 'sf-icon-checkmark' }
];

let stepper: Stepper = new Stepper({ steps });
stepper.appendTo('#stepper');
```

### isValid

**Type:** `boolean | null`  
**Default:** `null`  
**Description:** Indicates step validation state: `true` (valid), `false` (invalid), `null` (undetermined).

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

const steps: StepModel[] = [
    { label: 'Step 1', isValid: true },    // Completed/valid
    { label: 'Step 2', isValid: false },   // Error state
    { label: 'Step 3', isValid: null }     // Pending/not started
];

let stepper: Stepper = new Stepper({ steps });
stepper.appendTo('#stepper');
```

### label

**Type:** `string`  
**Default:** `''`  
**Description:** Text label displayed for the step.

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

const steps: StepModel[] = [
    { label: 'Shipping Address', iconCss: 'sf-icon-truck' },
    { label: 'Payment Method', iconCss: 'sf-icon-card' },
    { label: 'Order Summary', iconCss: 'sf-icon-document' }
];

let stepper: Stepper = new Stepper({ steps });
stepper.appendTo('#stepper');
```

### optional

**Type:** `boolean`  
**Default:** `false`  
**Description:** Mark a step as optional (can be skipped).

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

const steps: StepModel[] = [
    { label: 'Shipping', optional: false },
    { label: 'Gift Message', optional: true },  // Can be skipped
    { label: 'Payment', optional: false }
];

let stepper: Stepper = new Stepper({ steps });
stepper.appendTo('#stepper');
```

### status

**Type:** `string | StepStatus`  
**Default:** `'NotStarted'`  
**Description:** Current status of the step. See [Step Status Enum](#step-status-enum).

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

const steps: StepModel[] = [
    { label: 'Completed Task', status: 'Completed' },
    { label: 'Current Task', status: 'InProgress' },
    { label: 'Future Task', status: 'NotStarted' }
];

let stepper: Stepper = new Stepper({ steps });
stepper.appendTo('#stepper');
```

### text

**Type:** `string`  
**Default:** `''`  
**Description:** Descriptive text for the step (appears below/beside label).

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

const steps: StepModel[] = [
    { label: 'Cart', text: '4 items', iconCss: 'sf-icon-cart' },
    { label: 'Shipping', text: 'Standard', iconCss: 'sf-icon-truck' },
    { label: 'Payment', text: 'Credit Card', iconCss: 'sf-icon-card' }
];

let stepper: Stepper = new Stepper({ steps });
stepper.appendTo('#stepper');
```

---

## Step Status Enum

Represents the status of a step in the workflow.

| Value | Description |
|-------|-------------|
| `'NotStarted'` | Step has not been started |
| `'InProgress'` | Step is currently in progress |
| `'Completed'` | Step has been completed |

```typescript
import { Stepper, StepModel, StepStatus } from '@syncfusion/ej2-navigations';

const steps: StepModel[] = [
    { label: 'Order Details', status: StepStatus.Completed },
    { label: 'Payment', status: StepStatus.InProgress },
    { label: 'Confirmation', status: StepStatus.NotStarted }
];

let stepper: Stepper = new Stepper({ steps });
stepper.appendTo('#stepper');
```

---

## Label Position Enum

Defines where step labels are positioned relative to step indicators.

| Value | Description |
|-------|-------------|
| `'Top'` | Label appears above the indicator |
| `'Bottom'` | Label appears below the indicator (default) |
| `'Start'` | Label appears to the left of the indicator |
| `'End'` | Label appears to the right of the indicator |

```typescript
import { Stepper, StepLabelPosition } from '@syncfusion/ej2-navigations';

// Top position
let stepper1: Stepper = new Stepper({
    steps: [{ label: 'Step 1' }, { label: 'Step 2' }],
    labelPosition: StepLabelPosition.Top
});
stepper1.appendTo('#stepper1');

// Start (left) position
let stepper2: Stepper = new Stepper({
    steps: [{ label: 'Step 1' }, { label: 'Step 2' }],
    labelPosition: StepLabelPosition.Start
});
stepper2.appendTo('#stepper2');

// Using string values
let stepper3: Stepper = new Stepper({
    steps: [{ label: 'Step 1' }, { label: 'Step 2' }],
    labelPosition: 'End'
});
stepper3.appendTo('#stepper3');
```

---

## Step Type Enum

Defines how individual steps are displayed in the stepper.

| Value | Description |
|-------|-------------|
| `'Default'` | Display both icon and label for each step |
| `'Label'` | Display labels only |
| `'Indicator'` | Display only indicators (icons or numbers) |

```typescript
import { Stepper, StepType } from '@syncfusion/ej2-navigations';

// Default: icon + label
let stepperDefault: Stepper = new Stepper({
    steps: [
        { label: 'Cart', iconCss: 'sf-icon-cart' },
        { label: 'Shipping', iconCss: 'sf-icon-truck' }
    ],
    stepType: StepType.Default
});
stepperDefault.appendTo('#stepper-default');

// Label only
let stepperLabel: Stepper = new Stepper({
    steps: [
        { label: 'Cart' },
        { label: 'Shipping' }
    ],
    stepType: StepType.Label
});
stepperLabel.appendTo('#stepper-label');

// Indicator only
let stepperIndicator: Stepper = new Stepper({
    steps: [{}, {}],
    stepType: StepType.Indicator
});
stepperIndicator.appendTo('#stepper-indicator');

// Using string values
let stepper: Stepper = new Stepper({
    steps: [{ label: 'Step 1' }, { label: 'Step 2' }],
    stepType: 'Label'
});
stepper.appendTo('#stepper');
```

---

## Orientation Enum

Defines the layout orientation of the stepper component.

| Value | Description |
|-------|-------------|
| `'Horizontal'` | Steps displayed side-by-side (default) |
| `'Vertical'` | Steps stacked vertically |

```typescript
import { Stepper, StepperOrientation } from '@syncfusion/ej2-navigations';

// Horizontal orientation (default)
let stepperHorizontal: Stepper = new Stepper({
    steps: [{}, {}, {}],
    orientation: StepperOrientation.Horizontal
});
stepperHorizontal.appendTo('#stepper-h');

// Vertical orientation
let stepperVertical: Stepper = new Stepper({
    steps: [{}, {}, {}],
    orientation: StepperOrientation.Vertical
});
stepperVertical.appendTo('#stepper-v');

// Using string values
let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}],
    orientation: 'Vertical'
});
stepper.appendTo('#stepper');
```

---

## Animation Settings

### Animation Settings Properties

Customize how the progress indicator animates between steps.

#### enable

**Type:** `boolean`  
**Default:** `true`  
**Description:** Enable or disable step animation.

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}],
    animation: {
        enable: false  // Disable animation for instant step changes
    }
});
stepper.appendTo('#stepper');
```

#### duration

**Type:** `number`  
**Default:** `2000`  
**Description:** Animation duration in milliseconds.

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}],
    animation: {
        enable: true,
        duration: 3000  // 3 seconds animation
    }
});
stepper.appendTo('#stepper');
```

#### delay

**Type:** `number`  
**Default:** `0`  
**Description:** Delay before animation starts, in milliseconds.

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
    steps: [{}, {}, {}, {}],
    animation: {
        enable: true,
        duration: 2000,
        delay: 500  // 0.5 second delay before animation
    }
});
stepper.appendTo('#stepper');
```

---

