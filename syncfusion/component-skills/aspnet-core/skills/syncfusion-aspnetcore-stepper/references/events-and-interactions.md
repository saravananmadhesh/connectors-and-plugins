# Events and Interactions

## Table of Contents
- [Event Overview](#event-overview)
- [created Event](#created-event)
- [stepChanged Event](#stepchanged-event)
- [stepChanging Event](#stepchanging-event)
- [stepClick Event](#stepclick-event)
- [beforeStepRender Event](#beforesteprender-event)
- [Linear Navigation](#linear-navigation)
- [Event Patterns](#event-patterns)

## Event Overview

The Stepper control provides five key events for handling user interactions and workflow logic:

| Event | Triggered | Purpose |
|-------|-----------|---------|
| `created` | After stepper renders | Initialize or configure control |
| `stepChanged` | After active step changes | Update UI based on new step |
| `stepChanging` | Before active step changes | Validate or prevent step change |
| `stepClick` | When user clicks a step | Track user interaction |
| `beforeStepRender` | Before rendering each step | Modify step properties dynamically |

## created Event

Fires when the Stepper control finishes rendering and initializes.

```html
<ejs-stepper id="stepper" created="onStepperCreated">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<script>
function onStepperCreated(args) {
    console.log("Stepper created successfully");
    console.log(args);
}
</script>
```

**Event arguments (args):**
- `element` (HTMLElement) - The stepper element

**Use cases:**
- Initialize form data
- Load step content dynamically
- Log application state
- Trigger animations
- Pre-populate form fields

## stepChanged Event

Fires after the active step successfully changes. This is the final confirmation that step navigation completed.

```html
<ejs-stepper id="stepper" stepChanged="onStepChanged">
    <e-stepper-steps>
        <e-stepper-step label="Cart"></e-stepper-step>
        <e-stepper-step label="Shipping"></e-stepper-step>
        <e-stepper-step label="Payment"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<script>
function onStepChanged(args) {
    console.log("Step changed to: " + args.activeStep);
    console.log("Was user interaction: " + args.isInteracted);
}
</script>
```

**Event arguments (args):**
- `activeStep` (number) - Index of the current step
- `element` (HTMLElement) - The stepper element
- `event` (Event) - The original browser event
- `isInteracted` (boolean) - Whether the change is triggered by user interaction
- `name` (string) - Event name ("stepChanged")
- `previousStep` (number) - Index of the previous step

**Use cases:**
- Update form display based on current step
- Save form data to the database
- Fetch data for the new step
- Update progress indicators
- Track user navigation patterns
- Enable/disable dependent controls

## stepChanging Event

Fires **before** the active step changes. Allows you to validate, prevent, or modify the step change.

```html
<ejs-stepper id="stepper" stepChanging="onStepChanging">
    <e-stepper-steps>
        <e-stepper-step label="Profile"></e-stepper-step>
        <e-stepper-step label="Email"></e-stepper-step>
        <e-stepper-step label="Security"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<script>
function onStepChanging(args) {
    var targetStep = args.activeStep;
    
    // Validate current step before allowing change
    if (!validateCurrentStep()) {
        args.cancel = true;  // Prevent step change
        console.log("Form validation failed");
    }
}

function validateCurrentStep() {
    // Implement validation logic
    var form = document.querySelector("form");
    return form.reportValidity();
}
</script>
```

**Event arguments (args):**
- `activeStep` (number) - Index of the current step
- `cancel` (boolean) - Whether the change has been prevented (default: false)
- `element` (HTMLElement) - The stepper element
- `event` (Event) - The original browser event
- `isInteracted` (boolean) - Whether the change is triggered by user interaction
- `name` (string) - Event name ("stepChanging")
- `previousStep` (number) - Index of the previous step

**Use cases:**
- Validate form fields before progression
- Prevent moving to next step if data is incomplete
- Confirm with user before leaving a step
- Async validation (e.g., checking email availability)
- Conditional step skipping

## stepClick Event

Fires when the user clicks a step, regardless of whether the active step actually changes.

```html
<ejs-stepper id="stepper" stepClick="onStepClick">
    <e-stepper-step label="Step 1"></e-stepper-step>
    <e-stepper-step label="Step 2"></e-stepper-step>
    <e-stepper-step label="Step 3"></e-stepper-step>
</ejs-stepper>

<script>
function onStepClick(args) {
    console.log("Clicked step: " + args.activeStep);
    console.log("Previous step was: " + args.previousStep);
}
</script>
```

**Event arguments (args):**
- `activeStep` (number) - Index of clicked step
- `previousStep` (number) - Index of previously active step
- `element` (HTMLElement) - The stepper component element
- `event` (Event) - The original browser event
- `name` (string) - Event name ("stepClick")

**Use cases:**
- Log user interactions
- Track which steps users explore
- Show help/tooltip for clicked step
- Prevent clicking specific steps
- Analytics/telemetry

## beforeStepRender Event

Fires before rendering each step in the stepper. Allows dynamic modification of step properties.

```html
<ejs-stepper id="stepper" beforeStepRender="onBeforeStepRender">
    <e-stepper-step label="Step 1" iconCss="sf-icon-cart"></e-stepper-step>
    <e-stepper-step label="Step 2" iconCss="sf-icon-transport"></e-stepper-step>
</ejs-stepper>
```

**Event arguments (args):**
- `index` (number) - Index of step being rendered
- `element` (HTMLElement) - The stepper component element
- `name` (string) - Event name ("beforeStepRender")

**Use cases:**
- Conditionally disable steps
- Apply dynamic styling based on state
- Modify step properties at runtime
- Enable/disable steps based on user permissions
- Show/hide optional steps

## Linear Navigation

Enable sequential-only step progression by setting `linear="true"`:

```html
<ejs-stepper id="wizard" linear="true">
    <e-stepper-steps>
        <e-stepper-step label="Account" text="Create account"></e-stepper-step>
        <e-stepper-step label="Profile" text="Complete profile"></e-stepper-step>
        <e-stepper-step label="Verify" text="Verify email"></e-stepper-step>
        <e-stepper-step label="Success" text="All done!"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Linear mode behavior:**
- Users can only proceed to the **next** step
- Cannot jump forward or navigate backward
- Commonly combined with `stepChanging` event for validation
- Perfect for guided workflows

**Non-linear mode (default):**
- Users can click any step to navigate
- Jump to completed, current, or future steps
- More flexible but less guided

**Use cases:**
- Multi-step registration wizards
- Guided product tours
- Ordered task workflows
- Onboarding flows requiring sequential steps

## Event Patterns

### Pattern 1: Form Validation Before Progression

```html
<ejs-stepper id="form-stepper" stepChanging="validateAndProgress">
    <e-stepper-step label="Personal Info"></e-stepper-step>
    <e-stepper-step label="Contact Info"></e-stepper-step>
    <e-stepper-step label="Review"></e-stepper-step>
</ejs-stepper>

<script>
function validateAndProgress(args) {
    var currentStepForm = getCurrentStepForm(args.previousStep);
    
    if (!currentStepForm.checkValidity()) {
        args.cancel = true;
        alert("Please fill all required fields");
    }
}
</script>
```

### Pattern 2: Track Progress State

```html
<script>
var stepperState = {
    currentStep: 0,
    stepData: {}
};

function onStepChanged(args) {
    stepperState.currentStep = args.activeStep;
    stepperState.stepData[args.previousStep] = getCurrentStepData();
    saveProgressToServer();
}

function saveProgressToServer() {
    fetch('/api/progress', {
        method: 'POST',
        body: JSON.stringify(stepperState)
    });
}
</script>
```

### Pattern 3: Dynamic Step Enabling

```html
<script>
function onBeforeStepRender(args) {
    // Only enable step 2 after step 1 is completed
    if (args.index === 2) {
        args.step.disabled = stepperState.stepData[1].isComplete !== true;
    }
}
</script>
```

### Pattern 4: Conditional Step Content

```html
<script>
function onStepChanged(args) {
    // Load step-specific content
    var stepContent = loadStepContent(args.activeStep);
    displayStepContent(stepContent);
}
</script>
```
