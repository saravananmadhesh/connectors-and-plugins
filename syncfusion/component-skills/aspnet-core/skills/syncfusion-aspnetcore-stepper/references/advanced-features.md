# Advanced Features

## Table of Contents
- [Linear Flow](#linear-flow)
- [Animation Configuration](#animation-configuration)
- [Localization](#localization)
- [RTL Support](#rtl-support)
- [Accessibility](#accessibility)
- [Readonly Mode](#readonly-mode)
- [Performance Optimization](#performance-optimization)

## Linear Flow

Linear flow enforces sequential step progression, requiring users to complete steps in order.

### Enable Linear Mode

```html
<ejs-stepper id="wizard" linear="true">
    <e-stepper-steps>
        <e-stepper-step label="Step 1" text="First step"></e-stepper-step>
        <e-stepper-step label="Step 2" text="Second step"></e-stepper-step>
        <e-stepper-step label="Step 3" text="Third step"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Linear mode behavior:**
- Users can only proceed to the next step
- Cannot skip steps or navigate backward
- Perfect for guided wizards
- Usually combined with form validation

### Non-Linear Mode (Default)

```html
<ejs-stepper id="stepper" linear="false">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
        <e-stepper-step label="Step 3"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Non-linear behavior:**
- Users can click any step to navigate
- Jump to any step immediately
- More flexible but less guided
- Default: `linear="false"`

### Linear with Validation

Combine linear mode with step validation:

```html
<ejs-stepper id="form" linear="true" stepChanging="validateForm">
    <e-stepper-steps>
        <e-stepper-step label="Personal" text="Your details"></e-stepper-step>
        <e-stepper-step label="Contact" text="How to reach you"></e-stepper-step>
        <e-stepper-step label="Review" text="Confirm information"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<script>
function validateForm(args) {
    // Only allow progression if validation passes
    var form = document.querySelector("form");
    if (!form.reportValidity()) {
        args.cancel = true;
    }
}
</script>
```

## Animation Configuration

Control step transition animations with the `e-stepper-animation` element.

### Animation Properties

```html
<ejs-stepper id="stepper">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
    </e-stepper-steps>
    <e-stepper-animation
        enable="true"
        duration="2000"
        delay="0">
    </e-stepper-animation>
</ejs-stepper>
```

**Properties:**
- `enable` - Enable/disable animation (boolean, default: true)
- `duration` - Transition duration in milliseconds (number, default: 2000)
- `delay` - Delay before animation starts in milliseconds (number, default: 0)

### Disable Animation

```html
<ejs-stepper id="stepper">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
    </e-stepper-steps>
    <e-stepper-animation enable="false"></e-stepper-animation>
</ejs-stepper>
```

### Faster Animation

```html
<ejs-stepper id="stepper">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
    </e-stepper-steps>
    <e-stepper-animation enable="true" duration="500"></e-stepper-animation>
</ejs-stepper>
```

Shorter duration (500ms) improves perceived responsiveness on mobile devices.

### Staggered Animation Effect

```html
<ejs-stepper id="stepper">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
        <e-stepper-step label="Step 3"></e-stepper-step>
    </e-stepper-steps>
    <e-stepper-animation enable="true" duration="1500" delay="300"></e-stepper-animation>
</ejs-stepper>
```

The 300ms delay creates a smooth transition effect between step changes.

## Localization

Customize text content for different languages/cultures using the `locale` property.

### Set Locale

```html
<ejs-stepper id="stepper" locale="fr">
    <e-stepper-steps>
        <e-stepper-step label="Step 1" optional="true"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

### Localizable Text

| Key | Default (en-US) |
|-----|-----------------|
| `optional` | "Optional" |

**Supported locales:**
- `en` - English
- `fr` - French
- `de` - German
- `es` - Spanish
- `ar` - Arabic
- `ja` - Japanese
- Plus many others

### Custom Localization

```html
<script>
// Define custom locale
ej.locale.setLocale('custom');

// Create locale dictionary
ej.base.L10n.load({
    'custom': {
        'stepper': {
            'optional': 'Étape Optionnelle'  // French
        }
    }
});
</script>

<ejs-stepper id="stepper" locale="custom">
    <e-stepper-steps>
        <e-stepper-step label="Step 1" optional="true"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

## RTL Support

Enable right-to-left (RTL) layout for Arabic, Hebrew, and other RTL languages.

### Enable RTL

```html
<ejs-stepper id="stepper" enableRtl="true">
    <e-stepper-steps>
        <e-stepper-step label="خطوة 1" text="الخطوة الأولى"></e-stepper-step>
        <e-stepper-step label="خطوة 2" text="الخطوة الثانية"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**RTL behavior:**
- Layout mirrors left-to-right layout
- Steps progress right-to-left
- Labels align to the right

### RTL with Locale

```html
<ejs-stepper id="stepper" enableRtl="true" locale="ar">
    <e-stepper-steps>
        <e-stepper-step label="ملف الشخصي" optional="true"></e-stepper-step>
        <e-stepper-step label="التحقق"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

Combine RTL with appropriate locale for complete internationalization.

## Accessibility

The Stepper control includes built-in accessibility features following WCAG guidelines.

### ARIA Labels

Stepper controls include semantic ARIA attributes automatically:
- Steps have `role="button"` for keyboard navigation
- Active step marked with `aria-current="step"`
- Steps have descriptive `aria-label` attributes

### Keyboard Navigation

**Supported keyboard shortcuts:**
- **Tab** - Navigate to next focusable step
- **Shift+Tab** - Navigate to previous focusable step
- **Enter/Space** - Activate current step
- **Arrow Right** - Next step (in linear mode)
- **Arrow Left** - Previous step (in linear mode)

### High Contrast Support

Ensure sufficient color contrast:

```css
.e-stepper .e-step {
    border-color: #000;  /* High contrast */
}

.e-stepper .e-step.e-step-active {
    background-color: #003;  /* High contrast */
}
```

### Screen Reader Support

Screen readers announce:
- Step label and text content
- Step status (completed, in-progress, not started)
- Current step index (e.g., "Step 2 of 5")
- Disabled/optional state

### Accessible Implementation

```html
<ejs-stepper id="stepper" ariaLabel="Registration Wizard">
    <e-stepper-steps>
        <e-stepper-step label="Account" text="Create account"></e-stepper-step>
        <e-stepper-step label="Profile" text="Complete profile"></e-stepper-step>
        <e-stepper-step label="Verify" text="Verify email"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

## Readonly Mode

Disable all user interactions using `readOnly` property.

### Enable Readonly

```html
<ejs-stepper id="stepper" readOnly="true">
    <e-stepper-steps>
        <e-stepper-step label="Completed" status="Completed"></e-stepper-step>
        <e-stepper-step label="In Progress" status="InProgress"></e-stepper-step>
        <e-stepper-step label="Pending" status="NotStarted"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Effects:**
- Users cannot click any steps
- No step navigation possible
- Display-only mode for progress tracking
- Perfect for showing completed workflows

**Display completed order flow:**
```html
<ejs-stepper id="order-flow" readOnly="true">
    <e-stepper-steps>
        <e-stepper-step label="Order Placed" status="Completed"></e-stepper-step>
        <e-stepper-step label="Processing" status="Completed"></e-stepper-step>
        <e-stepper-step label="Shipped" status="InProgress"></e-stepper-step>
        <e-stepper-step label="Delivered" status="NotStarted"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Show read-only status tracker:**
```html
<ejs-stepper id="status" readOnly="true" orientation="Vertical">
    <e-stepper-steps>
        <e-stepper-step label="Submitted" status="Completed"></e-stepper-step>
        <e-stepper-step label="Reviewing" status="InProgress"></e-stepper-step>
        <e-stepper-step label="Approved" status="NotStarted"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

## Performance Optimization

Optimize stepper performance for large-scale applications.

### Lazy Load Step Content

Load step content on demand:

```html
<script>
var stepContent = {};

function onStepChanged(args) {
    var activeStep = args.activeStep;
    
    // Load content only for current step
    if (!stepContent[activeStep]) {
        loadStepContent(activeStep);
    }
}

function loadStepContent(stepIndex) {
    fetch(`/api/step/${stepIndex}`)
        .then(r => r.json())
        .then(data => {
            stepContent[stepIndex] = data;
            renderStepContent(stepIndex, data);
        });
}
</script>
```

### Disable Unnecessary Animations

Disable animations for better performance on low-end devices:

```html
<ejs-stepper id="stepper">
    <e-stepper-animation enable="false"></e-stepper-animation>
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

### Minimize DOM Updates

Use event delegation and batch updates:

```javascript
// Bad: Multiple individual updates
for (let i = 0; i < steps.length; i++) {
    updateStep(i);  // Triggers reflow each time
}

// Good: Batch update
requestAnimationFrame(() => {
    for (let i = 0; i < steps.length; i++) {
        updateStep(i);
    }
});
```

### Monitor Performance

```javascript
// Measure stepper initialization time
console.time("Stepper Init");
// ... stepper creation code
console.timeEnd("Stepper Init");

// Measure step transition time
console.time("Step Transition");
// ... navigation code
console.timeEnd("Step Transition");
```
