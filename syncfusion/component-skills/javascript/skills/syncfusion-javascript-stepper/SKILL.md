---
name: syncfusion-javascript-stepper
description: Create and implement the Syncfusion TypeScript Stepper navigation component. Use this skill whenever a user wants to display a progress indicator with steps, implement a wizard workflow, show a multi-step process, display navigation between form pages, add step validation, or configure step-by-step guided experiences. Always reference this skill when working with Stepper controls, step configuration, orientations, events, or animations.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Navigation"
---

# Implementing Syncfusion TypeScript Stepper Control

## Complete Table of Contents

### 1. Getting Started
- [Getting Started Guide](references/getting-started.md)
- [Installation & Setup](#installation-setup)
- [First Stepper](#first-stepper)
- [CSS Themes](#css-themes)

### 2. API Reference
- [Complete API Reference](references/api-reference.md)
  - **Stepper Properties** (15 properties)
  - **Stepper Methods** (12 methods)
  - **Stepper Events** (5 events)
  - **Step Properties** (8 properties)
  - **Enums & Types** (4 enums)
  - **Animation Settings** (3 properties)
  - **Event Arguments** (4 argument interfaces)

### 3. Core Concepts
- [Steps Configuration](references/steps-configuration.md)
  - Adding & Managing Steps
  - Step Properties (label, iconCss, text, disabled, optional, status, isValid)
  - Disabling Steps
  - Setting Read-Only Mode
  - Setting Active Step
  - Icon-Only, Label-Only, and Hybrid Steps
  - Validation States

- [Step Types](references/step-types.md)
  - Default Type (Icons + Labels)
  - Label-Only Type
  - Indicator-Only Type
  - Label Positioning (Top, Bottom, Start, End)
  - Type Comparison & Selection
  - Switching Types Dynamically

- [Orientations & Layout](references/orientations.md)
  - Horizontal Orientation (Default)
  - Vertical Orientation
  - Responsive Behavior
  - Dynamic Layout Switching
  - Layout-Specific Styling

### 4. Advanced Features
- [Events & Interaction](references/events-interaction.md)
  - **All 5 Events:**
    - created
    - beforeStepRender
    - stepClick
    - stepChanging (with cancellation)
    - stepChanged
  - Event Arguments & Properties
  - Event Handling Patterns
  - Validation with Events
  - User Interaction Detection

- [Templates & Animation](references/templates-animation.md)
  - Custom Step Templates
  - Template Context Variables
  - Template Data Binding
  - Tooltip Customization
  - Animation Configuration
  - Animation Duration & Delay
  - Animation Enable/Disable

- [Validation & Globalization](references/validation-globalization.md)
  - Step Validation (isValid states)
  - Linear Flow Enforcement
  - Preventing Invalid Transitions
  - Localization (L10n, Locale)
  - Right-to-Left (RTL) Support
  - Multi-Language Support
  - Accessibility (ARIA, Keyboard Navigation)

### 5. Utilities & Patterns
- [Troubleshooting & Best Practices](references/troubleshooting-patterns.md)
  - Common Setup Issues
  - Event Handling Best Practices
  - Form Validation Patterns
  - CSS Customization
  - Theme Integration
  - Performance Optimization
  - Edge Cases & Solutions

---

## When to Use This Skill

Use the **Syncfusion TypeScript Stepper** skill when you need to:

- Display a **multi-step process or wizard** workflow
- Create a **progress indicator** showing completion status
- Build a **form wizard** with validation between steps
- Show **step-by-step guided experiences** (checkout, onboarding, setup)
- Add **step navigation** with back/forward controls
- Implement **linear workflow validation**
- Create **checkpoint-based processes** with tracking
- Enable **step customization** with icons, labels, and templates
- Handle **step events** and user interactions
- Support **multiple orientations** (horizontal/vertical layouts)

## Stepper Overview

The **Stepper** is a navigation control that displays a series of logical steps to guide users through a workflow. Each step can have:

- **Indicators** (numbers, icons, or shapes)
- **Labels** (text descriptions)
- **Status tracking** (active, completed, disabled)
- **Event handlers** for step transitions
- **Custom templates** for rich content
- **Flexible styling** with themes

### Key Characteristics

| Aspect | Description |
|--------|-------------|
| **Component** | Navigation control for multi-step workflows |
| **Steps** | Array of step objects with properties |
| **Indicators** | Numbered or icon-based step markers |
| **Orientations** | Horizontal (default) or Vertical layouts |
| **Types** | Default (icon+label), Label-only, Indicator-only |
| **Events** | created, beforeStepRender, stepClick, stepChanging, stepChanged |
| **Methods** | 12 control methods (nextStep, previousStep, reset, etc.) |
| **Properties** | 15 stepper + 8 step properties |
| **Customization** | Templates, animations, themes, CSS styling |

---

## Documentation and Navigation Guide

### 📚 Learning Path (Recommended Order)

1. **Start Here:** [Getting Started](references/getting-started.md)
   - Installation and npm package setup
   - Dependencies (ej2-navigations, ej2-base, ej2-popups)
   - Development environment configuration
   - Basic stepper initialization with code examples
   - CSS imports and theme setup

2. **Fundamentals:** [Steps Configuration](references/steps-configuration.md)
   - Adding steps to the stepper
   - Step properties (iconCss, text, label, cssClass, disabled, status)
   - Using StepModel interface for type safety
   - Step arrays and dynamic step updates
   - Accessing and modifying steps at runtime

3. **Data Organization:** [Step Types](references/step-types.md)
   - Default type: icons with labels
   - Label-only type: text descriptions only
   - Indicator-only type: numbers or icons only
   - Label positions (top, bottom, start, end)
   - Choosing the right type for your use case

4. **UI Layout:** [Orientations and Layout](references/orientations.md)
   - Horizontal orientation (default, side-by-side)
   - Vertical orientation (stacked, one above another)
   - Responsive behavior and switching
   - Layout-specific styling

5. **Interactivity:** [Events and Interaction](references/events-interaction.md)
   - stepChanged: when step successfully changes
   - stepChanging: before step change (can cancel)
   - stepClick: user clicked a step
   - beforeStepRender: before rendering each step
   - created: initialization complete
   - Event arguments and patterns

6. **Enhancements:** [Templates and Animation](references/templates-animation.md)
   - Custom HTML templates for step content
   - Template data binding
   - Animation settings and timing
   - Animation duration and delay
   - Tooltip customization

7. **Production:** [Validation and Globalization](references/validation-globalization.md)
   - Form validation patterns
   - Linear workflow enforcement
   - Multi-language support
   - Right-to-left (RTL) support
   - Accessibility compliance

8. **Troubleshooting:** [Best Practices](references/troubleshooting-patterns.md)
   - Common issues and solutions
   - Performance optimization
   - CSS customization
   - Theme integration
   - Edge cases

### 🔍 Quick Navigation by Topic

**By Feature:**
- 📄 [Steps Configuration](references/steps-configuration.md) - Working with steps
- 📄 [Step Types](references/step-types.md) - Display options
- 📄 [Orientations](references/orientations.md) - Layout options
- 📄 [Events & Interaction](references/events-interaction.md) - Handling user actions

**By Use Case:**
- 🧩 **Form Wizard:** See [Events & Interaction](references/events-interaction.md) and [Validation](references/validation-globalization.md)
- 🛒 **Checkout Flow:** See [Steps Configuration](references/steps-configuration.md) and [Events](references/events-interaction.md)
- 🎨 **Custom Styling:** See [Templates & Animation](references/templates-animation.md) and [Best Practices](references/troubleshooting-patterns.md)
- 🌍 **Multi-Language:** See [Validation & Globalization](references/validation-globalization.md)

**By API Lookup:**
- 🔗 [Complete API Reference](references/api-reference.md) - All properties, methods, events, and enums

---

## Quick Start Example

Here's a minimal stepper setup to get started immediately:

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

// Create a basic stepper with 4 steps
let stepper: Stepper = new Stepper({
  steps: [
    { label: 'Cart' },
    { label: 'Shipping' },
    { label: 'Payment' },
    { label: 'Confirmation' }
  ]
});

// Render to DOM
stepper.appendTo('#stepper');
```

```html
<nav id="stepper"></nav>
```

---

## Common Patterns

### Pattern 1: Icon + Label Steps (Default)
```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

let steps: StepModel[] = [
  { iconCss: 'sf-icon-cart', label: 'Cart' },
  { iconCss: 'sf-icon-truck', label: 'Shipping' },
  { iconCss: 'sf-icon-payment', label: 'Payment' }
];

let stepper: Stepper = new Stepper({ steps: steps });
stepper.appendTo('#stepper');
```

### Pattern 2: Vertical Workflow with Events
```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
  steps: [{}, {}, {}, {}],
  orientation: 'Vertical',
  stepChanged: (args) => console.log('Changed to step:', args.activeStep),
  stepChanging: (args) => {
    if (!validateCurrentStep()) args.cancel = true;
  }
});
stepper.appendTo('#stepper');
```

### Pattern 3: Form Wizard with Validation
```typescript
import { Stepper, StepperChangingEventArgs } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
  steps: [
    { label: 'Personal Info' },
    { label: 'Address' },
    { label: 'Review' }
  ],
  linear: true,  // Must complete steps in order
  stepChanging: (args: StepperChangingEventArgs) => {
    // Validate current step before allowing transition
    if (!isCurrentStepValid()) {
      args.cancel = true;  // Prevent step change
    }
  }
});
stepper.appendTo('#stepper');
```

### Pattern 4: Dynamic Step Management
```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
  steps: [{}, {}, {}, {}],
  activeStep: 0
});
stepper.appendTo('#stepper');

// Navigate with methods
stepper.nextStep();      // Move to next step
stepper.previousStep();  // Move to previous step
stepper.reset();         // Return to first step

// Update properties
stepper.activeStep = 2;
stepper.dataBind();      // Apply changes
```

---

## Key Properties at a Glance

### Stepper Control Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `steps` | StepModel[] | [] | Array of step definitions |
| `activeStep` | number | 0 | Currently active step (zero-based) |
| `stepType` | string | 'Default' | Type: Default, Label, or Indicator |
| `orientation` | string | 'Horizontal' | Layout: Horizontal or Vertical |
| `labelPosition` | string | 'Bottom' | Label placement: Top, Bottom, Start, End |
| `linear` | boolean | false | Enforce sequential navigation |
| `readOnly` | boolean | false | Disable all interactions |
| `showTooltip` | boolean | false | Show tooltips on steps |
| `animation` | object | {...} | Animation settings (enable, duration, delay) |
| `locale` | string | 'en-US' | Language/region code |
| `enableRtl` | boolean | false | Right-to-left rendering |
| `enablePersistence` | boolean | false | Save state in localStorage |

### Step Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | string | '' | Step label text |
| `text` | string | '' | Step description |
| `iconCss` | string | '' | Step icon CSS class |
| `status` | string | 'NotStarted' | NotStarted, InProgress, Completed |
| `isValid` | boolean \| null | null | Validation state (true/false/null) |
| `disabled` | boolean | false | Disable this step |
| `optional` | boolean | false | Step is optional |
| `cssClass` | string | '' | Custom CSS class |

---

## Common Use Cases

**Checkout Wizard:** Multi-step purchase flow with cart, shipping, payment, and confirmation steps.

**Form Wizard:** Split long forms across multiple steps with validation at each stage.

**Onboarding Flow:** Guide new users through setup steps with progress indication.

**Task Workflow:** Track progress through a series of tasks or milestones.

**Process Tracker:** Display current position in a documented process flow.

**Multi-Page Survey:** Distribute survey questions across steps with progress tracking.

---

## API Reference Quick Links

- **[Complete API Documentation](references/api-reference.md)**
  - Stepper Properties (15 total)
  - Stepper Methods (12 total)
  - Stepper Events (5 total)
  - Step Properties (8 total)
  - Enums (4 types)
  - Animation Settings
  - Event Arguments

---

**🚀 Ready to implement?** Start with [Getting Started](references/getting-started.md) to set up your first stepper, or jump to the [API Reference](references/api-reference.md) for complete documentation.

