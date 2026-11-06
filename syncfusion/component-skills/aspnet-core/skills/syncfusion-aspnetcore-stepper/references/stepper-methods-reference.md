# Stepper Component Methods Reference

Complete guide to all public methods available on the Syncfusion ASP.NET Core Stepper component.

## Table of Contents
- [Navigation Methods](#navigation-methods)
- [Event Management Methods](#event-management-methods)
- [Lifecycle Methods](#lifecycle-methods)
- [State Management Methods](#state-management-methods)

## Navigation Methods

### nextStep()
**Returns:** `void`  
**Description:** Programmatically moves to the next step from the current step.

**Example - Button Navigation:**
```html
<ejs-stepper id="stepper">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
        <e-stepper-step label="Step 3"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<button onclick="goToNext()">Next Step</button>

<script>
function goToNext() {
    var stepperObj = document.getElementById('stepper').ej2_instances[0];
    stepperObj.nextStep();
}
</script>
```

**Example - Conditional Navigation:**
```html
<button onclick="navigateNext()">Next</button>

<script>
function navigateNext() {
    var stepperObj = document.getElementById('stepper').ej2_instances[0];
    
    // Validate current step before moving to next
    if (validateCurrentStep()) {
        stepperObj.nextStep();
    } else {
        alert('Please complete all required fields');
    }
}

function validateCurrentStep() {
    var form = document.getElementById('stepForm');
    return form.checkValidity();
}
</script>
```

**Use Cases:**
- Custom navigation buttons
- Post-validation progression
- Conditional step skipping
- Form submission workflows

---

### previousStep()
**Returns:** `void`  
**Description:** Programmatically moves to the previous step from the current step.

**Example - Back Button Navigation:**
```html
<ejs-stepper id="stepper">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
        <e-stepper-step label="Step 3"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<button onclick="goBack()">Back</button>

<script>
function goBack() {
    var stepperObj = document.getElementById('stepper').ej2_instances[0];
    stepperObj.previousStep();
}
</script>
```

**Example - Guided Wizard with Previous:**
```html
<div>
    <button onclick="goBack()" id="backBtn" disabled>← Back</button>
    <button onclick="goNext()">Next →</button>
</div>

<script>
function goBack() {
    var stepperObj = document.getElementById('stepper').ej2_instances[0];
    stepperObj.previousStep();
    updateButtonStates();
}

function goNext() {
    var stepperObj = document.getElementById('stepper').ej2_instances[0];
    stepperObj.nextStep();
    updateButtonStates();
}

function updateButtonStates() {
    var stepperObj = document.getElementById('stepper').ej2_instances[0];
    var backBtn = document.getElementById('backBtn');
    
    // Disable back button on first step
    backBtn.disabled = stepperObj.activeStep === 0;
}
</script>
```

**Use Cases:**
- Allow users to review previous steps
- Edit previously entered data
- Navigate through form sections
- Multi-step form workflows

---

## Event Management Methods

### addEventListener(eventName, handler)
**Parameters:**
- `eventName` (string) - Name of the event to listen for
- `handler` (Function) - Callback function to execute when event fires

**Returns:** `void`

**Description:** Dynamically adds an event listener to the stepper component.

**Example - Add Event Handler Programmatically:**
```html
<ejs-stepper id="stepper">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
        <e-stepper-step label="Step 3"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<script>
var stepperObj = document.getElementById('stepper').ej2_instances[0];

// Add listener for step changes
stepperObj.addEventListener('stepChanged', function(args) {
    console.log('User moved to step: ' + args.activeStep);
    updateStepContent(args.activeStep);
});

// Add listener for validation
stepperObj.addEventListener('stepChanging', function(args) {
    if (!isStepValid(args.activeStep)) {
        args.cancel = true;
    }
});

function updateStepContent(stepIndex) {
    // Load content for the new step
}

function isStepValid(stepIndex) {
    // Perform validation
    return true;
}
</script>
```

**Example - Multiple Event Handlers:**
```html
<script>
var stepperObj = document.getElementById('stepper').ej2_instances[0];

// Track user progress
stepperObj.addEventListener('stepChanged', trackProgress);

// Log interactions for analytics
stepperObj.addEventListener('stepClick', logAnalytics);

// Initialize on creation
stepperObj.addEventListener('created', initializeContent);

function trackProgress(args) {
    console.log('Progress: Step ' + args.activeStep + ' completed');
}

function logAnalytics(args) {
    console.log('User interacted with step: ' + args.activeStep);
}

function initializeContent(args) {
    console.log('Stepper initialized');
}
</script>
```

**Use Cases:**
- Dynamically add event handlers based on conditions
- Multiple handlers for same event
- Late-binding event listeners
- Conditional event handling

---

### removeEventListener(eventName, handler)
**Parameters:**
- `eventName` (string) - Name of the event to remove listener from
- `handler` (Function) - The callback function to remove

**Returns:** `void`

**Description:** Removes a previously added event listener from the stepper component.

**Example - Conditional Event Removal:**
```html
<script>
var stepperObj = document.getElementById('stepper').ej2_instances[0];

function onStepChanged(args) {
    console.log('Step changed to: ' + args.activeStep);
}

// Add listener
stepperObj.addEventListener('stepChanged', onStepChanged);

// Later, remove the listener when no longer needed
function disableTracking() {
    stepperObj.removeEventListener('stepChanged', onStepChanged);
    console.log('Tracking disabled');
}
</script>
```

**Use Cases:**
- Clean up listeners when component is destroyed
- Prevent memory leaks
- Stop tracking specific events
- Disable conditional behaviors

---

## Lifecycle Methods

### dataBind()
**Returns:** `void`  
**Description:** Applies all pending property changes immediately to the component without waiting for the next refresh cycle.

**Example - Batch Property Updates:**
```html
<ejs-stepper id="stepper">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
        <e-stepper-step label="Step 3"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<script>
var stepperObj = document.getElementById('stepper').ej2_instances[0];

// Change multiple properties
stepperObj.activeStep = 2;
stepperObj.orientation = 'Vertical';
stepperObj.linear = true;

// Apply all changes immediately
stepperObj.dataBind();
</script>
```

**Use Cases:**
- Immediate property application
- Batch updates without multiple renders
- Prevent intermediate render states
- Performance optimization for multiple changes

---

### refresh()
**Returns:** `void`  
**Description:** Re-renders the component applying all pending changes. Useful after external DOM modifications.

**Example - Refresh After Dynamic Changes:**
```html
<ejs-stepper id="stepper">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<script>
var stepperObj = document.getElementById('stepper').ej2_instances[0];

// Make changes
stepperObj.activeStep = 1;
stepperObj.stepType = 'Label';

// Force re-render
stepperObj.refresh();
</script>
```

**Use Cases:**
- Force component re-rendering
- Update after external changes
- Sync component state with data model
- Refresh visual appearance

---

### refreshProgressbar()
**Returns:** `void`  
**Description:** Recalculates and updates the progress bar position. Useful when the container dimensions change.

**Example - Window Resize Handling:**
```html
<ejs-stepper id="stepper">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
        <e-stepper-step label="Step 3"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<script>
var stepperObj = document.getElementById('stepper').ej2_instances[0];

// Refresh progress bar on window resize
window.addEventListener('resize', function() {
    stepperObj.refreshProgressbar();
});
</script>
```

**Use Cases:**
- Responsive layout adjustments
- Window resize handling
- Orientation changes (mobile)
- Container dimension updates

---

## State Management Methods

### reset()
**Returns:** `void`  
**Description:** Resets the stepper to its initial state, moving to the first step and clearing any saved progress.

**Example - Reset Wizard:**
```html
<ejs-stepper id="stepper">
    <e-stepper-steps>
        <e-stepper-step label="Account"></e-stepper-step>
        <e-stepper-step label="Profile"></e-stepper-step>
        <e-stepper-step label="Complete"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<button onclick="resetWizard()">Reset</button>

<script>
function resetWizard() {
    var stepperObj = document.getElementById('stepper').ej2_instances[0];
    stepperObj.reset();
    clearFormData();
}

function clearFormData() {
    document.getElementById('accountForm').reset();
    document.getElementById('profileForm').reset();
}
</script>
```

**Example - Confirm Before Reset:**
```html
<button onclick="confirmReset()">Reset Wizard</button>

<script>
function confirmReset() {
    if (confirm('Are you sure you want to start over? All progress will be lost.')) {
        var stepperObj = document.getElementById('stepper').ej2_instances[0];
        stepperObj.reset();
        loadInitialContent();
    }
}

function loadInitialContent() {
    // Load initial step content
}
</script>
```

**Use Cases:**
- Allow users to start over
- Clear completed workflows
- Reset form data
- Start new process instances

---

### getRootElement()
**Returns:** `HTMLElement`  
**Description:** Returns the root DOM element of the stepper component.

**Example - Access Root Element:**
```html
<ejs-stepper id="stepper" cssClass="my-stepper">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<script>
var stepperObj = document.getElementById('stepper').ej2_instances[0];
var rootElement = stepperObj.getRootElement();

// Modify root element
rootElement.style.padding = '20px';
rootElement.style.border = '1px solid #ccc';

// Get element properties
console.log('Root element:', rootElement);
console.log('Classes:', rootElement.className);
console.log('Parent:', rootElement.parentElement);
</script>
```

**Use Cases:**
- Access root DOM element directly
- Apply dynamic styling
- Attach additional event listeners
- Integrate with third-party libraries

---

### destroy()
**Returns:** `void`  
**Description:** Destroys the stepper component and releases all associated resources.

**Example - Cleanup on Unload:**
```html
<ejs-stepper id="stepper">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<script>
var stepperObj = document.getElementById('stepper').ej2_instances[0];

// Destroy when navigating away
window.addEventListener('beforeunload', function() {
    stepperObj.destroy();
});
</script>
```

**Example - Component Lifecycle:**
```html
<script>
var stepperObj = null;

function initializeStepper() {
    stepperObj = document.getElementById('stepper').ej2_instances[0];
    console.log('Stepper initialized');
}

function cleanupStepper() {
    if (stepperObj) {
        stepperObj.destroy();
        stepperObj = null;
        console.log('Stepper destroyed');
    }
}

// Initialize on page load
window.addEventListener('load', initializeStepper);

// Cleanup on page unload
window.addEventListener('unload', cleanupStepper);
</script>
```

**Use Cases:**
- Clean up before navigating away
- Memory management
- Remove event listeners
- Release component resources

---

### appendTo(selector)
**Parameters:**
- `selector` (string | HTMLElement, optional) - Target element or selector where control should be appended

**Returns:** `void`

**Description:** Appends the stepper component to the specified HTML element.

**Example - Dynamic Component Creation:**
```html
<div id="container"></div>

<script>
// Create stepper dynamically
var stepperObj = new ej.navigations.Stepper({
    steps: [
        { label: 'Step 1' },
        { label: 'Step 2' },
        { label: 'Step 3' }
    ],
    activeStep: 0
});

// Append to container
stepperObj.appendTo('#container');
</script>
```

**Use Cases:**
- Dynamically create and insert components
- Move components between containers
- Programmatic component instantiation
- Single Page Application workflows

---

## Common Method Usage Patterns

### Pattern 1: Custom Navigation Control
```html
<ejs-stepper id="stepper">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
        <e-stepper-step label="Step 3"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<div class="navigation">
    <button onclick="previousStep()" id="prevBtn">← Previous</button>
    <span id="stepIndicator">Step 1 of 3</span>
    <button onclick="nextStep()" id="nextBtn">Next →</button>
    <button onclick="skipToStep(2)">Jump to Step 3</button>
</div>

<script>
var stepperObj = document.getElementById('stepper').ej2_instances[0];

function previousStep() {
    stepperObj.previousStep();
    updateUI();
}

function nextStep() {
    if (validateStep(stepperObj.activeStep)) {
        stepperObj.nextStep();
        updateUI();
    }
}

function skipToStep(index) {
    stepperObj.activeStep = index;
    stepperObj.dataBind();
    updateUI();
}

function updateUI() {
    var stepCount = 3;
    var current = stepperObj.activeStep + 1;
    document.getElementById('stepIndicator').textContent = 'Step ' + current + ' of ' + stepCount;
    document.getElementById('prevBtn').disabled = stepperObj.activeStep === 0;
    document.getElementById('nextBtn').disabled = stepperObj.activeStep === stepCount - 1;
}

// Initialize UI on load
updateUI();
</script>
```

### Pattern 2: Progress Tracking
```html
<script>
var stepperObj = document.getElementById('stepper').ej2_instances[0];

// Track all interactions
stepperObj.addEventListener('stepChanged', function(args) {
    saveProgress(args.activeStep);
    logAnalytics('step_changed', { step: args.activeStep });
});

stepperObj.addEventListener('stepClick', function(args) {
    logAnalytics('step_clicked', { step: args.activeStep });
});

function saveProgress(stepIndex) {
    localStorage.setItem('currentStep', stepIndex);
    console.log('Progress saved at step: ' + stepIndex);
}

function logAnalytics(eventType, data) {
    console.log('Analytics: ' + eventType, data);
}
</script>
```

### Pattern 3: Conditional Reset
```html
<script>
var stepperObj = document.getElementById('stepper').ej2_instances[0];

function resetWizard() {
    var unsavedData = detectUnsavedChanges();
    
    if (unsavedData) {
        if (confirm('You have unsaved changes. Are you sure?')) {
            stepperObj.reset();
            clearAllData();
        }
    } else {
        stepperObj.reset();
    }
}

function detectUnsavedChanges() {
    // Check if any form fields have been modified
    return false; // Implement your logic
}

function clearAllData() {
    document.querySelectorAll('form').forEach(form => form.reset());
}
</script>
```
