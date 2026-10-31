# Quick Reference and Patterns

## Table of Contents
- [Common Setup Issues](#common-setup-issues)
- [Event Handling Patterns](#event-handling-patterns)
- [Styling Patterns](#styling-patterns)
- [API Quick Reference](#api-quick-reference)
- [Edge Cases and Gotchas](#edge-cases-and-gotchas)
- [Debugging Tips](#debugging-tips)
- [Best Practices](#best-practices)
- [Key Takeaways](#key-takeaways)

## Common Setup Issues

### Issue: Stepper Not Displaying

**Problem:** Stepper element renders but appears empty.

**Solution:**

```typescript
// Ensure the container exists
<nav id="stepper"></nav>

// Verify CSS is imported
@import "../../node_modules/@syncfusion/ej2-navigations/styles/fluent2.css";

// Check appendTo() is called with correct ID
stepper.appendTo('#stepper');  // Must match HTML element ID
```

### Issue: Styles Not Applying

**Problem:** Stepper appears without styling or with broken layout.

**Solution:** Import all required CSS files in correct order:

```css
@import "../../node_modules/@syncfusion/ej2-base/styles/fluent2.css";
@import "../../node_modules/@syncfusion/ej2-popups/styles/fluent2.css";
@import "../../node_modules/@syncfusion/ej2-navigations/styles/fluent2.css";
```

### Issue: Events Not Firing

**Problem:** Event handlers defined but not being called.

**Solution:** Verify event is defined during initialization:

```typescript
// Correct: Events defined at initialization
let stepper = new Stepper({
  steps: steps,
  stepChanged: (args) => {
    console.log('Step changed');
  }
});

// Incorrect: Events assigned after initialization may not work
let stepper = new Stepper({ steps: steps });
stepper.stepChanged = (args) => { /* won't work */ };
```

### Issue: Icons Not Showing

**Problem:** `iconCss` property set but icons don't appear.

**Solution:** Ensure icon font is properly loaded:

```typescript
// Include font-face CSS
@font-face {
  font-family: 'SF-Icons';
  src: url('path/to/font.ttf') format('truetype');
}

// Use correct class prefix
let steps = [
  { iconCss: 'sf-icon-cart' }  // Must match font-icon classes
];
```

## Event Handling Patterns

### Pattern: Form Validation Workflow

```typescript
let stepper = new Stepper({
  steps: formSteps,
  linear: true,
  stepChanging: (args) => {
    // Validate current step before allowing transition
    if (!validateFields(args.previousStep)) {
      args.cancel = true;
      showValidationError();
    }
  },
  stepChanged: (args) => {
    // Save step data after successful transition
    saveStepData(args.previousStep);
    clearValidationErrors();
  }
});

stepper.appendTo('#form');

function validateFields(stepIndex): boolean {
  // Implement validation logic
  return true;
}

function saveStepData(stepIndex): void {
  // Save to localStorage or API
}
```

### Pattern: Progress Tracking

```typescript
let stepper = new Stepper({
  steps: steps,
  stepChanged: (args) => {
    const progress = ((args.activeStep + 1) / steps.length) * 100;
    updateProgressBar(progress);
    logProgress(args.activeStep);
  }
});

stepper.appendTo('#stepper');

function updateProgressBar(percentage: number): void {
  document.querySelector('.progress-bar').style.width = percentage + '%';
}

function logProgress(stepIndex: number): void {
  console.log(`User progress: Step ${stepIndex + 1} of ${steps.length}`);
}
```

### Pattern: Conditional Step Content

```typescript
let stepper = new Stepper({
  steps: steps,
  stepChanged: (args) => {
    loadStepContent(args.activeStep);
  },
  beforeStepRender: (args) => {
    // Modify step appearance based on condition
    if (args.currentStep === 2) {
      args.step.cssClass = 'payment-step-important';
    }
  }
});

stepper.appendTo('#stepper');

function loadStepContent(stepIndex: number): void {
  const contentMap = {
    0: 'loading/cart-content',
    1: 'loading/shipping-content',
    2: 'loading/payment-content'
  };
  
  const url = contentMap[stepIndex];
  fetch(url).then(res => res.html()).then(html => {
    document.querySelector('.step-content').innerHTML = html;
  });
}
```

## Styling Patterns

### Custom Theme Implementation

```typescript
// Custom CSS overrides
.custom-stepper .e-step-active {
  color: #4CAF50;  // Custom green
  background: #f1f8f6;
}

.custom-stepper .e-step-completed {
  color: #2196F3;  // Custom blue
}

.custom-stepper .e-step-progressbar {
  background: #e0e0e0;
  height: 4px;
}

.custom-stepper .e-step-progressbar .e-progressbar-value {
  background: linear-gradient(to right, #2196F3, #4CAF50);
}

// Apply to stepper
let stepper = new Stepper({
  steps: steps,
  cssClass: 'custom-stepper'
});
```

### Responsive Design

```typescript
// Mobile-first approach
@media (max-width: 768px) {
  .e-stepper {
    flex-direction: column;  // Vertical on mobile
  }
  
  .e-step-label {
    font-size: 12px;  // Smaller text
  }
}

@media (min-width: 769px) {
  .e-stepper {
    flex-direction: row;  // Horizontal on desktop
  }
}

// TypeScript responsive handler
function handleResponsive() {
  if (window.innerWidth < 768) {
    stepper.orientation = 'vertical';
  } else {
    stepper.orientation = 'horizontal';
  }
  stepper.dataBind();
}

window.addEventListener('resize', handleResponsive);
```

## API Quick Reference

### Key Properties

```typescript
stepper.activeStep = 2;           // Set active step
stepper.steps = newSteps;         // Update steps
stepper.orientation = 'vertical'; // Change orientation
stepper.stepType = 'label';       // Change display type
stepper.linear = true;            // Enforce sequential
```

### Key Methods

```typescript
stepper.dataBind();     // Refresh UI after property changes
stepper.reset();        // Reset to initial state
stepper.appendTo(id);   // Render to element
```

### Event Handlers

```typescript
// Register handlers
stepper.on('stepChanged', handler);
stepper.on('stepChanging', handler);
stepper.on('stepClick', handler);

// Unregister handlers
stepper.off('stepChanged', handler);
```

## Edge Cases and Gotchas

### Edge Case: Empty Steps Array

```typescript
// Avoid: Will render nothing
let stepper = new Stepper({ steps: [] });

// Better: Provide default steps
let stepper = new Stepper({
  steps: [
    { label: 'Step 1' },
    { label: 'Step 2' },
    { label: 'Step 3' }
  ]
});
```

### Gotcha: stepChanging vs stepChanged

```typescript
// stepChanging - BEFORE change (can cancel)
stepChanging: (args) => {
  args.cancel = true;  // This works - prevents change
}

// stepChanged - AFTER change (cannot cancel)
stepChanged: (args) => {
  args.cancel = true;  // This does nothing
}
```

### Gotcha: Template Variable Syntax

```typescript
// Correct: Use ${property}
template: '<div>${step.label}</div>'

// Incorrect: Don't use JavaScript syntax
template: '<div>{{step.label}}</div>'  // Won't work
template: `<div>${step.label}</div>`   // Template literal syntax
```

### Performance: Large Step Arrays

```typescript
// For many steps (50+), consider virtualization
let stepper = new Stepper({
  steps: generateLargeStepArray(100),
  enableVirtualization: true  // If supported
});

// Or implement lazy loading
stepper.stepChanged = (args) => {
  if (args.activeStep > stepper.steps.length - 5) {
    loadMoreSteps();  // Load more as user progresses
  }
};
```

## Debugging Tips

### Enable Console Logging

```typescript
let stepper = new Stepper({
  steps: steps,
  stepChanged: (args) => {
    console.log('Step changed:', args);
    console.log('Previous:', args.previousStep);
    console.log('Active:', args.activeStep);
  },
  stepChanging: (args) => {
    console.log('Step changing:', args);
    console.log('Cancel:', args.cancel);
  }
});
```

### Inspect Element State

```typescript
// Check current state
console.log('Current step:', stepper.activeStep);
console.log('Steps:', stepper.steps);
console.log('Orientation:', stepper.orientation);
console.log('Step Type:', stepper.stepType);

// Check DOM structure
console.log('DOM Element:', document.querySelector('#stepper'));
```

### Validate Configuration

```typescript
// Verify initialization worked
if (stepper) {
  console.log('Stepper initialized successfully');
  console.log('Steps count:', stepper.steps.length);
  console.log('Active step:', stepper.activeStep);
} else {
  console.error('Stepper failed to initialize');
}
```

## Best Practices

1. **Always define steps at initialization** - Don't add steps dynamically unless necessary
2. **Use TypeScript interfaces** - Import `StepModel` and `StepperChangedEventArgs` for type safety
3. **Validate in stepChanging** - Prevent invalid transitions early
4. **Import CSS before scripts** - Styling depends on order
5. **Test across browsers** - Animation and rendering may vary
6. **Use meaningful labels** - Help users understand each step
7. **Provide feedback** - Show validation errors clearly
8. **Optimize for mobile** - Use vertical orientation on small screens

## Key Takeaways

- Check browser console for initialization errors
- Verify HTML element ID matches appendTo() parameter
- Use stepChanging to validate before transitions
- Import all required CSS files for styling
- Test responsive layout on actual devices
- Use linear mode for strict workflow enforcement
- Combine events for complete user feedback
