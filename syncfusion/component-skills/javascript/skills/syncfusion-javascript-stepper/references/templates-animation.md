# Templates and Animation

## Table of Contents
- [Overview](#overview)
- [Template Basics](#template-basics)
- [Template Context](#template-context)
- [Animation Configuration](#animation-configuration)
- [Animation Properties](#animation-properties)
- [Tooltips and Templates](#tooltips-and-templates)
- [Advanced Customization](#advanced-customization)

## Overview

Templates and animations enhance the Stepper's visual appeal and interactivity:

- **Templates** allow custom HTML content for steps
- **Animations** smooth transitions between steps
- **Tooltip Templates** customize hover information

## Template Basics

The `template` property lets you customize the appearance of each step using HTML markup.

**Basic Template Implementation:**

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

let steps: StepModel[] = [
  { label: 'PowerPoint', iconCss: 'sf-icon-powerpoint' },
  { label: 'Presentation', iconCss: 'sf-icon-projector' },
  { label: 'Backup', iconCss: 'sf-icon-drive' }
];

let stepper: Stepper = new Stepper({
  activeStep: 1,
  steps: steps,
  template: '<div class="custom-step"><span class="${step.iconCss}"></span><br><span class="label">${step.label}</span></div>'
});

stepper.appendTo('#stepper');
```

**Template Syntax:**

- `${step.property}` accesses step properties
- `${currentStep}` accesses current step index
- `${step.label}` inserts step label text
- `${step.iconCss}` inserts icon class

## Template Context

Available variables in template context:

```typescript
{
  step: StepModel,      // Current step object
  currentStep: number   // Step index (0-based)
}
```

**Example with Context:**

```typescript
let stepper: Stepper = new Stepper({
  steps: [
    { label: 'Step 1' },
    { label: 'Step 2' },
    { label: 'Step 3' }
  ],
  template: '<div class="step-wrapper"><div class="step-number">${currentStep + 1}</div><div class="step-name">${step.label}</div></div>'
});

stepper.appendTo('#stepper');
```

## Custom HTML Templates

Create rich templates with additional HTML elements:

```typescript
let steps: StepModel[] = [
  { label: 'Upload', iconCss: 'sf-icon-upload', description: 'Upload your file' },
  { label: 'Process', iconCss: 'sf-icon-process', description: 'Processing...' },
  { label: 'Download', iconCss: 'sf-icon-download', description: 'Ready to download' }
];

let stepper: Stepper = new Stepper({
  steps: steps,
  template: `
    <div class="step-container">
      <div class="step-icon ${step.iconCss}"></div>
      <div class="step-info">
        <div class="step-title">${step.label}</div>
        <div class="step-description">${step.description || 'No description'}</div>
      </div>
    </div>
  `
});

stepper.appendTo('#stepper');
```

## CSS for Custom Templates

Style custom templates with CSS:

```css
.step-container {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
}

.step-icon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f0f0f0;
}

.step-info {
  display: flex;
  flex-direction: column;
}

.step-title {
  font-weight: bold;
  font-size: 14px;
}

.step-description {
  font-size: 12px;
  color: #666;
}
```

## Animation Configuration

Enable and customize step transition animations with the `animation` property.

**Animation Structure:**

```typescript
animation: {
  enable: boolean,    // Enable/disable animation
  duration: number,   // Duration in milliseconds
  delay: number       // Delay before animation starts
}
```

**Basic Animation Setup:**

```typescript
import { Stepper } from '@syncfusion/ej2-navigations';

let stepper: Stepper = new Stepper({
  steps: [{}, {}, {}, {}],
  animation: {
    enable: true,       // Enable animations
    duration: 2000,     // 2 second animation
    delay: 500          // 0.5 second delay
  }
});

stepper.appendTo('#stepper');
```

## Animation Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enable` | boolean | true | Activate/deactivate animations |
| `duration` | number | 2000 | Animation duration (milliseconds) |
| `delay` | number | 0 | Delay before animation starts (milliseconds) |

**Preset Animations:**

```typescript
// Fast animation
let fastStepper: Stepper = new Stepper({
  steps: steps,
  animation: { enable: true, duration: 500, delay: 0 }
});

// Slow animation with delay
let slowStepper: Stepper = new Stepper({
  steps: steps,
  animation: { enable: true, duration: 3000, delay: 1000 }
});

// No animation
let staticStepper: Stepper = new Stepper({
  steps: steps,
  animation: { enable: false }
});
```

## Tooltips and Templates

Add informative tooltips to steps using `showTooltip` and `tooltipTemplate`.

**Basic Tooltip:**

```typescript
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

let steps: StepModel[] = [
  { label: 'Cart', iconCss: 'sf-icon-cart' },
  { label: 'Shipping', iconCss: 'sf-icon-truck' },
  { label: 'Payment', iconCss: 'sf-icon-card' }
];

let stepper: Stepper = new Stepper({
  steps: steps,
  showTooltip: true  // Show label as tooltip on hover
});

stepper.appendTo('#stepper');
```

**Custom Tooltip Template:**

```typescript
let steps: StepModel[] = [
  { text: 'Review your items', label: 'Cart', iconCss: 'sf-icon-cart' },
  { text: 'Enter shipping address', label: 'Shipping', iconCss: 'sf-icon-truck' },
  { text: 'Complete payment', label: 'Payment', iconCss: 'sf-icon-card' }
];

let stepper: Stepper = new Stepper({
  steps: steps,
  showTooltip: true,
  tooltipTemplate: '<div class="tooltip-content"><span class="icon ${value.iconCss}"></span><span class="text">${value.text}</span></div>'
});

stepper.appendTo('#stepper');
```

**Tooltip Styling:**

```css
.tooltip-content {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #333;
  color: white;
  border-radius: 4px;
}

.tooltip-content .icon {
  font-size: 16px;
}

.tooltip-content .text {
  font-size: 14px;
}

.e-stepper-tooltip {
  border-radius: 4px;
}
```

## Advanced Customization

### Combining Templates and Animation

```typescript
let stepper: Stepper = new Stepper({
  steps: richSteps,
  template: customTemplate,
  animation: {
    enable: true,
    duration: 1500,
    delay: 300
  },
  stepChanged: (args) => {
    applyAnimationClass(args.activeStep);
  }
});

stepper.appendTo('#stepper');
```

### Conditional Templates

```typescript
let stepper: Stepper = new Stepper({
  steps: steps,
  beforeStepRender: (args) => {
    // Modify template based on step state
    if (args.currentStep === 0) {
      args.step.cssClass = 'first-step';
    } else if (args.currentStep === steps.length - 1) {
      args.step.cssClass = 'last-step';
    }
  }
});

stepper.appendTo('#stepper');
```

### Progress Animation

```typescript
let stepper: Stepper = new Stepper({
  steps: steps,
  animation: {
    enable: true,
    duration: 800,
    delay: 200
  }
});

stepper.appendTo('#stepper');

// Track animation progress
const progressIndicator = document.querySelector('.progress');
let startTime: number;

function animationFrame(timestamp: number) {
  if (!startTime) startTime = timestamp;
  const progress = (timestamp - startTime) / 800; // 800ms duration
  
  if (progress < 1) {
    progressIndicator.style.width = (progress * 100) + '%';
    requestAnimationFrame(animationFrame);
  }
}
```

## Key Takeaways

- Use templates to customize step appearance with HTML
- Access step properties with `${step.property}` syntax
- Enable animations for smooth transitions
- Configure duration (default 2000ms) and delay
- Use tooltips to show extra information on hover
- Combine templates, animations, and events for rich UX
- Test animations on different devices for performance
