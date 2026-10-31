# Validation and Globalization

## Table of Contents
- [Step Validation](#step-validation)
- [Validation States](#validation-states)
- [Linear Flow](#linear-flow)
- [Preventing Invalid Transitions](#preventing-invalid-transitions)
- [Localization](#localization)
- [Globalization](#globalization)
- [Accessibility](#accessibility)

## Step Validation

Steps can display validation states to indicate success or error conditions. The `isValid` property controls this.

**Validation States:**

| Value | Display | Use Case |
|-------|---------|----------|
| `null` | Default (not started) | Before step interaction |
| `true` | Success/checkmark | Step completed successfully |
| `false` | Error/X mark | Step has errors |

**Basic Validation:**

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

let steps: StepModel[] = [
  { label: 'Step 1', isValid: true },      // Completed
  { label: 'Step 2', isValid: null },      // Not started
  { label: 'Step 3', isValid: false }      // Error
];

let stepper: Stepper = new Stepper({
  steps: steps
});

stepper.appendTo('#stepper');
```

## Validation States

Display validation results with appropriate icons:

```typescript
let validationSteps: StepModel[] = [
  { label: 'Email', iconCss: 'sf-icon-email', isValid: true },
  { label: 'Password', iconCss: 'sf-icon-lock', isValid: null },
  { label: 'Confirm', iconCss: 'sf-icon-check', isValid: false }
];

let stepper: Stepper = new Stepper({
  steps: validationSteps,
  stepChanging: (args) => {
    // Validate before allowing change
    const isValid = performValidation(args.previousStep);
    if (!isValid) {
      args.cancel = true;
      stepper.steps[args.previousStep].isValid = false;
    }
  },
  stepChanged: (args) => {
    // Mark successful step
    stepper.steps[args.previousStep].isValid = true;
  }
});

stepper.appendTo('#form');

function performValidation(stepIndex: number): boolean {
  // Implement validation logic
  return true;
}
```

## Linear Flow

Enforce sequential step progression using the `linear` property. Users can only advance to the next step, not skip.

**Linear Stepper:**

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

let steps: StepModel[] = [
  { label: 'Personal Info', iconCss: 'sf-icon-user' },
  { label: 'Address', iconCss: 'sf-icon-location' },
  { label: 'Payment', iconCss: 'sf-icon-payment' }
];

let stepper: Stepper = new Stepper({
  steps: steps,
  linear: true  // Enforce sequential navigation
});

stepper.appendTo('#stepper');
```

**With Validation:**

```typescript
let stepper: Stepper = new Stepper({
  steps: steps,
  linear: true,
  stepChanging: (args) => {
    // Validate current step before proceeding
    if (args.activeStep > args.previousStep) {
      // Moving forward
      if (!validateStep(args.previousStep)) {
        args.cancel = true;
        showError('Please complete this step');
      }
    }
  }
});

stepper.appendTo('#stepper');
```

**Non-Linear (Default):**

```typescript
// Allow jumping between steps (default behavior)
let stepper: Stepper = new Stepper({
  steps: steps,
  linear: false  // Users can click any step
});

stepper.appendTo('#stepper');
```

## Preventing Invalid Transitions

Use `stepChanging` event to block invalid transitions:

```typescript
let stepper: Stepper = new Stepper({
  steps: formSteps,
  stepChanging: (args) => {
    const currentStep = stepper.steps[args.previousStep];
    
    // Example 1: Require all fields filled
    if (!allFieldsFilled(args.previousStep)) {
      args.cancel = true;
      displayError('Please fill in all required fields');
    }
    
    // Example 2: Prevent going back multiple steps
    if (args.previousStep - args.activeStep > 1) {
      args.cancel = true;
      displayError('Cannot skip backward');
    }
    
    // Example 3: Validate with async API call
    validateStepAsync(args.previousStep)
      .then(valid => {
        if (!valid) {
          args.cancel = true;
        }
      });
  }
});

stepper.appendTo('#form');
```

## Localization

Localize the Stepper control using the `L10n` class. Customize text for different languages.

**Supported Localization Keys:**

| Key | Default | Description |
|-----|---------|-------------|
| `optional` | "Optional" | Text for optional steps |

**Setting Localization:**

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';
import { L10n } from '@syncfusion/ej2-base';

// Define French localization
L10n.load({
  'fr-BE': {
    'stepper': {
      'optional': 'facultatif'
    }
  }
});

let steps: StepModel[] = [
  { label: 'Panier', iconCss: 'sf-icon-cart' },
  { label: 'Adresse', iconCss: 'sf-icon-location' },
  { label: 'Paiement', iconCss: 'sf-icon-payment', optional: true },
  { label: 'Confirmation', iconCss: 'sf-icon-check' }
];

let stepper: Stepper = new Stepper({
  steps: steps,
  locale: 'fr-BE'  // Apply French locale
});

stepper.appendTo('#stepper');
```

**Multiple Locales:**

```typescript
import { L10n } from '@syncfusion/ej2-base';

// English (default)
L10n.load({
  'en-US': {
    'stepper': {
      'optional': 'Optional'
    }
  }
});

// Spanish
L10n.load({
  'es-ES': {
    'stepper': {
      'optional': 'Opcional'
    }
  }
});

// German
L10n.load({
  'de-DE': {
    'stepper': {
      'optional': 'Optional'
    }
  }
});

// Switch locale at runtime
function switchLocale(locale: string) {
  stepper.locale = locale;
  stepper.dataBind();
}
```

## Globalization

### RTL (Right-to-Left) Support

Enable RTL layout for languages that read right-to-left:

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let steps = [
  { text: 'سلة التسوق', iconCss: 'sf-icon-cart' },           // Arabic
  { text: 'عنوان التسليم', iconCss: 'sf-icon-location' },   // Arabic
  { text: 'الدفع', iconCss: 'sf-icon-payment' }             // Arabic
];

let stepper: Stepper = new Stepper({
  steps: steps,
  enableRtl: true,  // Enable right-to-left layout
  locale: 'ar-AE'   // Arabic locale
});

stepper.appendTo('#stepper');
```

**CSS for RTL:**

```css
/* RTL styling */
.e-stepper[dir="rtl"] {
  direction: rtl;
}

.e-stepper[dir="rtl"] .e-step-label {
  margin-right: 10px;
  margin-left: 0;
}
```

### Locale-Aware Formatting

```typescript
function getLocalizedSteps(locale: string): StepModel[] {
  const stepLabels: { [key: string]: string[] } = {
    'en-US': ['Cart', 'Shipping', 'Payment', 'Confirm'],
    'fr-FR': ['Panier', 'Expédition', 'Paiement', 'Confirmer'],
    'es-ES': ['Carrito', 'Envío', 'Pago', 'Confirmar'],
    'de-DE': ['Einkaufswagen', 'Versand', 'Zahlung', 'Bestätigen']
  };
  
  const labels = stepLabels[locale] || stepLabels['en-US'];
  return labels.map((label, i) => ({
    label: label,
    iconCss: `sf-icon-step-${i + 1}`
  }));
}

let stepper: Stepper = new Stepper({
  steps: getLocalizedSteps('fr-FR'),
  locale: 'fr-FR'
});

stepper.appendTo('#stepper');
```

## Accessibility

The Stepper is built with accessibility in mind:

### ARIA Attributes

The Stepper automatically includes ARIA attributes:

```html
<div role="region" aria-label="Stepper">
  <div role="tab" aria-selected="true" aria-label="Step 1">
    <!-- Step content -->
  </div>
</div>
```

### Keyboard Navigation

- **Tab**: Navigate between elements
- **Arrow Keys**: Move between steps (if supported)
- **Enter**: Activate step

### Screen Reader Support

```typescript
let stepper: Stepper = new Stepper({
  steps: [
    { label: 'Step 1: Enter Information', iconCss: 'sf-icon-info' },
    { label: 'Step 2: Review Details', iconCss: 'sf-icon-review' },
    { label: 'Step 3: Submit Form', iconCss: 'sf-icon-submit' }
  ]
});

stepper.appendTo('#stepper');
```

Screen readers will announce:
- Current step number and label
- Total step count
- Validation state (success/error)

### Color Contrast

Ensure sufficient color contrast for validation states:

```css
/* High contrast for validation states */
.e-step-completed {
  color: #008000;  /* Green - sufficient contrast */
}

.e-step-error {
  color: #cc0000;  /* Red - sufficient contrast */
}

.e-step-active {
  color: #0066cc;  /* Blue - sufficient contrast */
}
```

## Key Takeaways

- Use `isValid` property to show step validation states
- Set `linear: true` for sequential workflows
- Use `stepChanging` event to validate before transitions
- Set localization with `L10n.load()` and `locale` property
- Enable RTL with `enableRtl: true` for right-to-left languages
- Built-in accessibility with ARIA and keyboard support
- Ensure color contrast for validation states
