# Events and Interaction

## Table of Contents
- [Overview](#overview)
- [stepChanged Event](#stepchanged-event)
- [stepChanging Event](#stepchanging-event)
- [stepClick Event](#stepclick-event)
- [beforeStepRender Event](#beforesteprender-event)
- [created Event](#created-event)
- [Event Handling Patterns](#event-handling-patterns)
- [Error Handling](#error-handling)

## Overview

The Stepper control triggers five main events during its lifecycle and user interactions:

| Event | Trigger | Cancellable | Use Case |
|-------|---------|-----------|----------|
| **created** | After rendering | No | Initialization setup |
| **beforeStepRender** | Before each step renders | Yes | Modify step before display |
| **stepClick** | User clicks a step | No | Track step clicks |
| **stepChanging** | Before step changes | Yes | Validate before changing |
| **stepChanged** | After step changes | No | Update UI after change |

## stepChanged Event

The **stepChanged** event fires **after** the active step successfully changes. Use this to react to completed step changes.

**Event Arguments:**

```typescript
interface StepperChangedEventArgs {
  activeStep: number;      // Provides the index of the current step
  element: HTMLElement;    // Provides the stepper element
  event: Event;            // Provides the original event
  isInteracted: boolean;   // Provides whether the change is triggered by user interaction
  name: string;            // Specifies name of the event
  previousStep: number;    // Provides the index of the previous step
}
```

**Implementation:**

```typescript
import { Stepper, StepperChangedEventArgs } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
  steps: [{}, {}, {}, {}],
  stepChanged: (args: StepperChangedEventArgs) => {
    console.log(`Changed from step ${args.previousStep} to ${args.activeStep}`);
    
    // Update UI to reflect new step
    updateStepContent(args.activeStep);
    saveCurrentProgress(args.activeStep);
  }
});

stepper.appendTo('#stepper');

function updateStepContent(stepIndex: number) {
  // Load content for step
}

function saveCurrentProgress(stepIndex: number) {
  // Save to localStorage or API
}
```

**Practical Example:**

```typescript
let stepper: Stepper = new Stepper({
  steps: [
    { label: 'Personal Info' },
    { label: 'Address' },
    { label: 'Payment' }
  ],
  stepChanged: (args) => {
    const messages = ['Personal details saved', 'Address saved', 'Payment processed'];
    console.log(messages[args.activeStep]);
  }
});

stepper.appendTo('#form');
```

## stepChanging Event

The **stepChanging** event fires **before** the step changes. Use this to validate the current step before allowing transition to the next step.

**Event Arguments:**

```typescript
interface StepperChangingEventArgs {
  activeStep: number;      // Provides the index of the current step
  cancel: boolean;         // Provides whether the change has been prevented or not. Default value is false
  element: HTMLElement;    // Provides the stepper element
  event: Event;            // Provides the original event
  isInteracted: boolean;   // Provides whether the change is triggered by user interaction
  name: string;            // Specifies name of the event
  previousStep: number;    // Provides the index of the previous step
}
```

**Implementation:**

```typescript
import { Stepper, StepperChangingEventArgs } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
  steps: [{}, {}, {}, {}],
  stepChanging: (args: StepperChangingEventArgs) => {
    // Validate current step before allowing progression
    if (!isCurrentStepValid(args.previousStep)) {
      args.cancel = true;  // Prevent step change
      console.log('Please complete the current step');
    }
  }
});

stepper.appendTo('#stepper');

function isCurrentStepValid(stepIndex: number): boolean {
  // Perform validation
  return true;
}
```

**Form Validation Example:**

```typescript
let stepper: Stepper = new Stepper({
  steps: [
    { label: 'Email' },
    { label: 'Password' },
    { label: 'Confirm' }
  ],
  stepChanging: (args) => {
    if (args.previousStep === 0) {
      // Validate email on step 0
      if (!isValidEmail(getEmailInput())) {
        args.cancel = true;
        showError('Invalid email format');
      }
    } else if (args.previousStep === 1) {
      // Validate password on step 1
      if (getPasswordInput().length < 8) {
        args.cancel = true;
        showError('Password must be at least 8 characters');
      }
    }
  }
});

stepper.appendTo('#form');
```

## stepClick Event

The **stepClick** event fires when the user clicks on a step. Use this to track navigation or implement custom click behavior.

**Event Arguments:**

```typescript
interface StepperClickEventArgs {
  activeStep: number;      // Provides the index of the current step
  element: HTMLElement;    // Provides the stepper element
  event: Event;            // Provides the original event
  name: string;            // Specifies name of the event
  previousStep: number;    // Provides the index of the previous step
}
```

**Implementation:**

```typescript
import { Stepper, StepperClickEventArgs } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
  steps: [{}, {}, {}, {}],
  stepClick: (args: StepperClickEventArgs) => {
    console.log(`Clicked on step ${args.activeStep}`);
    logAnalytics('step_clicked', { stepIndex: args.activeStep });
  }
});

stepper.appendTo('#stepper');

function logAnalytics(event: string, data: any) {
  // Send to analytics service
}
```

## beforeStepRender Event

The **beforeStepRender** event fires before each step is rendered. Use this to dynamically modify step appearance or content.

**Event Arguments:**

```typescript
interface StepperRenderingEventArgs {
  element: HTMLElement;    // Provides the stepper element
  index: number;           // Provides the index of the current step
  name: string;            // Specifies name of the event
}
```

**Implementation:**

```typescript
import { Stepper, StepperRenderingEventArgs } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
  steps: [{}, {}, {}, {}],
  beforeStepRender: (args: StepperRenderingEventArgs) => {
    // Dynamically modify step before rendering
    if (args.currentStep === 2) {
      args.step.cssClass = 'highlight-payment-step';
    }
  }
});

stepper.appendTo('#stepper');
```

**Dynamic Step Styling:**

```typescript
let stepper: Stepper = new Stepper({
  steps: [
    { label: 'Basic', iconCss: 'sf-icon-info' },
    { label: 'Shipping', iconCss: 'sf-icon-truck' },
    { label: 'Payment', iconCss: 'sf-icon-card' }
  ],
  beforeStepRender: (args) => {
    // Add visual emphasis to important steps
    if (args.currentStep === 2) {
      args.step.cssClass = 'payment-step-important';
    }
    
    // Mark optional steps
    if (args.step.optional) {
      args.step.cssClass = (args.step.cssClass || '') + ' optional-step';
    }
  }
});

stepper.appendTo('#checkout');
```

## created Event

The **created** event fires when the Stepper control has finished rendering and initialization.

**Implementation:**

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
  steps: [{}, {}, {}, {}],
  created: () => {
    console.log('Stepper initialized');
    loadInitialData();
  }
});

stepper.appendTo('#stepper');

function loadInitialData() {
  // Load initial step data from API
}
```

## Event Handling Patterns

### Pattern 1: Multi-Step Form with Validation

```typescript
let stepper: Stepper = new Stepper({
  steps: formSteps,
  stepChanging: (args) => {
    if (!validateStep(args.previousStep)) {
      args.cancel = true;
      showError('Please fix errors before proceeding');
    }
  },
  stepChanged: (args) => {
    saveStepData(args.previousStep);
    loadStepContent(args.activeStep);
  }
});

stepper.appendTo('#form');
```

### Pattern 2: Step Tracking and Analytics

```typescript
let stepper: Stepper = new Stepper({
  steps: steps,
  stepChanged: (args) => {
    trackStepProgression(args.previousStep, args.activeStep);
  },
  stepClick: (args) => {
    trackStepNavigation(args.activeStep);
  }
});

stepper.appendTo('#stepper');
```

### Pattern 3: Dynamic Content Loading

```typescript
let stepper: Stepper = new Stepper({
  steps: steps,
  stepChanged: (args) => {
    // Load content asynchronously
    loadStepContentAsync(args.activeStep)
      .then(content => {
        updateUI(content);
      })
      .catch(error => {
        handleError(error);
      });
  }
});

stepper.appendTo('#stepper');
```

## Error Handling

Handle errors in event handlers safely:

```typescript
let stepper: Stepper = new Stepper({
  steps: steps,
  stepChanging: (args) => {
    try {
      if (!performValidation(args.previousStep)) {
        args.cancel = true;
      }
    } catch (error) {
      console.error('Validation error:', error);
      args.cancel = true;  // Fail safely
    }
  }
});

stepper.appendTo('#stepper');
```

## Key Takeaways

- Use **stepChanging** to validate before step transitions (with cancel support)
- Use **stepChanged** to react after successful step changes
- Use **stepClick** to track user navigation
- Use **beforeStepRender** to dynamically modify steps
- Use **created** for initialization setup
- Always handle errors to prevent broken workflows
