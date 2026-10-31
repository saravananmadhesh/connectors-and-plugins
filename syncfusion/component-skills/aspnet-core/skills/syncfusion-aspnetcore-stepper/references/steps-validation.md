# Steps Validation

## Table of Contents
- [Validation Overview](#validation-overview)
- [Setting Validation State](#setting-validation-state)
- [Validation Icons](#validation-icons)
- [Validation Patterns](#validation-patterns)
- [Form Validation Integration](#form-validation-integration)
- [Async Validation](#async-validation)

## Validation Overview

The Stepper control displays validation state using the `isValid` property on each step, showing success or error indicators.

**Validation states:**
- `true` - Step is valid (displays success icon)
- `false` - Step has errors (displays error icon)
- `null` - Validation state unknown (default appearance)

## Setting Validation State

### Static Validation

Set validation state directly in markup:

```html
<ejs-stepper id="stepper">
    <e-stepper-steps>
        <e-stepper-step label="Profile" isValid="true"></e-stepper-step>
        <e-stepper-step label="Email" isValid="false"></e-stepper-step>
        <e-stepper-step label="Password" isValid="null"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

### Dynamic Validation

Update validation state in C# controller or event handler:

```csharp
// In Razor page
@{
    var steps = new List<StepperStep>
    {
        new StepperStep { Label = "Profile", IsValid = Model.IsProfileValid },
        new StepperStep { Label = "Email", IsValid = Model.IsEmailValid },
        new StepperStep { Label = "Password", IsValid = null }
    };
}

<ejs-stepper id="stepper">
    <e-stepper-steps>
        @foreach(var step in steps) {
            <e-stepper-step label="@step.Label" isValid="@step.IsValid"></e-stepper-step>
        }
    </e-stepper-steps>
</ejs-stepper>
```

### JavaScript Validation Update

```html
<script>
var stepper = document.getElementById('stepper').ej2_instances[0];

// Get all steps
var steps = stepper.steps;

// Update validation state
if (validateStep(0)) {
    steps[0].isValid = true;
} else {
    steps[0].isValid = false;
}

// Refresh stepper
stepper.refresh();
</script>
```

## Validation Icons

Validation icons display based on `stepType`:

### Default Step Type

In Default type, validation icon replaces the regular step icon:

```html
<ejs-stepper id="stepper" stepType="Default">
    <e-stepper-steps>
        <e-stepper-step label="Profile" isValid="true"></e-stepper-step>
        <e-stepper-step label="Email" isValid="false"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Icon display:**
- **isValid="true"** → Checkmark (✓) icon
- **isValid="false"** → Error (✗) icon
- **isValid="null"** → Standard step icon or number

### Label Step Type

In Label type, validation icon appears next to the label:

```html
<ejs-stepper id="stepper" stepType="Label">
    <e-stepper-steps>
        <e-stepper-step label="Valid Step" isValid="true"></e-stepper-step>
        <e-stepper-step label="Invalid Step" isValid="false"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

### Indicator Step Type

In Indicator type, validation state shows in the indicator circle:

```html
<ejs-stepper id="stepper" stepType="Indicator">
    <e-stepper-steps>
        <e-stepper-step label="Profile" iconCss="sf-icon-cart" isValid="true"></e-stepper-step>
        <e-stepper-step label="Address" iconCss="sf-icon-transport" isValid="false"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

## Validation Patterns

### Pattern 1: Form Field Validation

Validate form before step progression:

```html
<form id="stepForm">
    <input type="text" id="name" required>
    <input type="email" id="email" required>
    <button type="button" onclick="validateAndProgress()">Next</button>
</form>

<ejs-stepper id="stepper" stepChanging="validateStep">
    <e-stepper-steps>
        <e-stepper-step label="Personal Info"></e-stepper-step>
        <e-stepper-step label="Contact Info"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<script>
function validateStep(args) {
    var form = document.getElementById('stepForm');
    var isValid = form.reportValidity();
    
    if (!isValid) {
        args.cancel = true;
        updateStepValidation(args.previousStep, false);
    } else {
        updateStepValidation(args.previousStep, true);
    }
}

function updateStepValidation(stepIndex, isValid) {
    var stepper = document.getElementById('stepper').ej2_instances[0];
    stepper.steps[stepIndex].isValid = isValid;
    stepper.refresh();
}
</script>
```

### Pattern 2: Real-Time Validation

Validate input as user types:

```html
<input type="email" id="email" onchange="validateEmail()">

<ejs-stepper id="stepper">
    <e-stepper-steps>
        <e-stepper-step label="Email" isValid="null"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<script>
function validateEmail() {
    var email = document.getElementById('email').value;
    var isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    var stepper = document.getElementById('stepper').ej2_instances[0];
    stepper.steps[0].isValid = isValid;
    stepper.refresh();
}
</script>
```

### Pattern 3: Conditional Validation

Validate based on user selections:

```html
<ejs-stepper id="checkout" stepChanging="validateCheckout">
    <e-stepper-steps>
        <e-stepper-step label="Cart"></e-stepper-step>
        <e-stepper-step label="Shipping"></e-stepper-step>
        <e-stepper-step label="Payment"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<script>
function validateCheckout(args) {
    var stepper = document.getElementById('checkout').ej2_instances[0];

    if (args.activeStep === 1) {
        // Validate cart has items
        var hasItems = checkCartItems();
        stepper.steps[0].isValid = hasItems;
    }

    if (args.activeStep === 2) {
        // Validate shipping address exists
        var hasAddress = checkShippingAddress();
        stepper.steps[1].isValid = hasAddress;
    }
    
    if (!stepper.steps[args.previousStep].isValid) {
        args.cancel = true;
    }
    
    stepper.refresh();
}
</script>
```

## Form Validation Integration

### HTML5 Form Validation

```html
<form id="stepperForm">
    <input type="text" name="username" required pattern="[A-Za-z0-9]{3,}">
    <input type="email" name="email" required>
    <textarea name="bio" required></textarea>
</form>

<ejs-stepper id="stepper" stepChanging="onStepChanging">
    <e-stepper-steps>
        <e-stepper-step label="Account" isValid="null"></e-stepper-step>
        <e-stepper-step label="Profile" isValid="null"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<script>
function onStepChanging(args) {
    var form = document.getElementById('stepperForm');
    var isValid = form.checkValidity();
    
    var stepper = document.getElementById('stepper').ej2_instances[0];
    stepper.steps[args.previousStep].isValid = isValid;
    
    if (!isValid) {
        args.cancel = true;
    }
    
    stepper.refresh();
}
</script>
```

### Custom Validation Rules

```html
<script>
function validateAge(age) {
    return age >= 18 && age <= 120;
}

function validatePhoneNumber(phone) {
    return /^[\d\-\+\s\(\)]{10,}$/.test(phone);
}

function validateZipCode(zip) {
    return /^\d{5}(-\d{4})?$/.test(zip);
}

function onStepChanging(args) {
    var age = document.getElementById('age').value;
    var phone = document.getElementById('phone').value;
    
    var isValid = validateAge(age) && validatePhoneNumber(phone);
    
    var stepper = document.getElementById('stepper').ej2_instances[0];
    stepper.steps[args.previousStep].isValid = isValid;
    
    if (!isValid) {
        args.cancel = true;
    }
    
    stepper.refresh();
}
</script>
```

## Async Validation

Validate against server-side data (e.g., check email availability):

```html
<ejs-stepper id="stepper" stepChanging="validateAsync">
    <e-stepper-steps>
        <e-stepper-step label="Email" isValid="null"></e-stepper-step>
        <e-stepper-step label="Details" isValid="null"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<script>
async function validateAsync(args) {
    if (args.activeStep === 1) {
        var email = document.getElementById('email').value;
        
        try {
            // Check email availability on server
            var response = await fetch('/api/check-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            });
            
            var result = await response.json();
            
            var stepper = document.getElementById('stepper').ej2_instances[0];
            stepper.steps[0].isValid = result.isAvailable;
            
            if (!result.isAvailable) {
                args.cancel = true;
                alert('Email already registered');
            }
            
            stepper.refresh();
        } catch (error) {
            console.error('Validation error:', error);
            args.cancel = true;
        }
    }
}
</script>
```

### Loading State During Validation

```html
<script>
async function validateAsync(args) {
    var stepper = document.getElementById('stepper').ej2_instances[0];
    
    // Show loading state
    stepper.steps[args.previousStep].isValid = null;
    stepper.refresh();
    
    try {
        var response = await fetch('/api/validate-step', {
            method: 'POST',
            body: JSON.stringify(getStepData())
        });
        
        var isValid = await response.json();
        stepper.steps[args.previousStep].isValid = isValid.valid;
        
        if (!isValid.valid) {
            args.cancel = true;
        }
    } finally {
        stepper.refresh();
    }
}
</script>
```
