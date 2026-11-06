# Stepper Component Properties Reference

Complete guide to all Syncfusion ASP.NET Core Stepper component properties with examples and use cases.

## Table of Contents
- [Stepper-Level Properties](#stepper-level-properties)
- [Step-Level Properties](#step-level-properties)
- [Animation Properties](#animation-properties)

## Stepper-Level Properties

### activeStep
**Type:** `number`  
**Default:** `0`  
**Description:** Sets the index (0-based) of the currently active step.

**Example - Basic Usage:**
```html
<ejs-stepper activeStep="2">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
        <e-stepper-step label="Step 3"></e-stepper-step>
        <e-stepper-step label="Step 4"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Example - Dynamic Update from Model:**
```html
<ejs-stepper id="stepper" activeStep="@Model.CurrentStepIndex">
    <e-stepper-steps>
        <e-stepper-step label="Account"></e-stepper-step>
        <e-stepper-step label="Profile"></e-stepper-step>
        <e-stepper-step label="Complete"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Use Cases:**
- Resume multi-page forms from saved progress
- Show wizard at specific workflow stage
- Display checkpoint in ongoing process
- Sync stepper state with backend data

---

### animation
**Type:** `StepperAnimationSettingsModel`  
**Default:** `{ enable: true, duration: 2000, delay: 0 }`  
**Description:** Configures animation when transitioning between steps.

**Sub-properties:**
- `enable` (boolean) - Enable/disable animation
- `duration` (number) - Duration in milliseconds
- `delay` (number) - Delay before animation starts in milliseconds

**Example - Enable Smooth Animation:**
```html
<ejs-stepper id="stepper">
    <e-stepper-animation enable="true" duration="1000" delay="500"></e-stepper-animation>
    <e-stepper-steps>
        <e-stepper-step label="Cart"></e-stepper-step>
        <e-stepper-step label="Shipping"></e-stepper-step>
        <e-stepper-step label="Payment"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Example - Fast Animation:**
```html
<ejs-stepper id="stepper">
    <e-stepper-animation enable="true" duration="300" delay="0"></e-stepper-animation>
    <e-stepper-steps>
        <!-- Steps here -->
    </e-stepper-steps>
</ejs-stepper>
```

**Use Cases:**
- Smooth visual transitions for better UX
- Delayed animations for emphasis
- Fast animations for responsive feedback
- Customized motion for brand personality

---

### cssClass
**Type:** `string`  
**Default:** `''`  
**Description:** Applies custom CSS classes to the stepper component for global styling.

**Example - Theme Styling:**
```html
<ejs-stepper id="stepper" cssClass="custom-stepper premium-theme">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<style>
.custom-stepper.premium-theme {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 20px;
}

.custom-stepper.premium-theme .e-stepper-step {
    font-weight: 500;
}
</style>
```

**Use Cases:**
- Apply theme-specific styling
- Implement dark mode variants
- Create branded checkout flows
- Style stepper for different contexts

---

### enablePersistence
**Type:** `boolean`  
**Default:** `false`  
**Description:** When enabled, persists the stepper's state (active step, scroll position) across page reloads using browser's localStorage.

**Example - Enable State Persistence:**
```html
<ejs-stepper id="stepper" enablePersistence="true">
    <e-stepper-steps>
        <e-stepper-step label="Account Setup"></e-stepper-step>
        <e-stepper-step label="Profile Info"></e-stepper-step>
        <e-stepper-step label="Verification"></e-stepper-step>
        <e-stepper-step label="Complete"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Example - Multi-Session Form Recovery:**
```html
<!-- On page load, automatically resumes from where user left off -->
<ejs-stepper id="wizard" enablePersistence="true" stepChanged="onStepChanged">
    <e-stepper-steps>
        <e-stepper-step label="Billing Address"></e-stepper-step>
        <e-stepper-step label="Shipping Address"></e-stepper-step>
        <e-stepper-step label="Review Order"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<script>
function onStepChanged(args) {
    console.log("User is at step: " + args.activeStep);
    // State persists automatically
}
</script>
```

**Use Cases:**
- Recover user progress on accidental page reload
- Multi-session wizard completion
- Improve UX for long forms
- Track user progress across sessions

---

### enableRtl
**Type:** `boolean`  
**Default:** `false`  
**Description:** Renders the stepper component in right-to-left (RTL) direction for languages like Arabic, Hebrew, Persian, etc.

**Example - RTL Layout:**
```html
<ejs-stepper id="stepper" enableRtl="true">
    <e-stepper-steps>
        <e-stepper-step label="الحساب" text="إنشاء حسابك"></e-stepper-step>
        <e-stepper-step label="الملف الشخصي" text="أكمل ملفك الشخصي"></e-stepper-step>
        <e-stepper-step label="التحقق" text="تحقق من بريدك"></e-stepper-step>
        <e-stepper-step label="نجاح" text="مكتمل!"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Example - Dynamic RTL Based on Culture:**
```html
<ejs-stepper id="stepper" enableRtl="@(System.Globalization.CultureInfo.CurrentCulture.TextInfo.IsRightToLeft)">
    <e-stepper-steps>
        <e-stepper-step label="@Resources.Step1"></e-stepper-step>
        <e-stepper-step label="@Resources.Step2"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Use Cases:**
- Support Arabic, Persian, Hebrew languages
- Implement multi-language applications
- Ensure proper text direction rendering
- Provide inclusive global experiences

---

### labelPosition
**Type:** `string | StepLabelPosition`  
**Default:** `Top`  
**Values:** `Top`, `Bottom`, `Start`, `End`  
**Description:** Controls where step labels appear relative to the step indicator.

**Example - Label at Bottom:**
```html
<ejs-stepper id="stepper" labelPosition="Bottom">
    <e-stepper-steps>
        <e-stepper-step iconCss="sf-icon-cart" label="Cart"></e-stepper-step>
        <e-stepper-step iconCss="sf-icon-transport" label="Shipping"></e-stepper-step>
        <e-stepper-step iconCss="sf-icon-payment" label="Payment"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Example - Label at Start (Left):**
```html
<ejs-stepper id="stepper" labelPosition="Start" orientation="Vertical">
    <e-stepper-steps>
        <e-stepper-step iconCss="sf-icon-cart" label="Shopping Cart"></e-stepper-step>
        <e-stepper-step iconCss="sf-icon-transport" label="Delivery Address"></e-stepper-step>
        <e-stepper-step iconCss="sf-icon-payment" label="Payment"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Use Cases:**
- Adjust layout for space constraints
- Match design system specifications
- Optimize for mobile vs desktop
- Create unique visual hierarchies

---

### linear
**Type:** `boolean`  
**Default:** `false`  
**Description:** When enabled, users can only progress to the next step sequentially. Prevents skipping or jumping to non-adjacent steps.

**Example - Linear Wizard Mode:**
```html
<ejs-stepper id="wizard" linear="true">
    <e-stepper-steps>
        <e-stepper-step label="Create Account"></e-stepper-step>
        <e-stepper-step label="Verify Email"></e-stepper-step>
        <e-stepper-step label="Set Password"></e-stepper-step>
        <e-stepper-step label="Complete"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Example - Linear with Validation:**
```html
<ejs-stepper id="wizard" linear="true" stepChanging="validateStep">
    <e-stepper-steps>
        <e-stepper-step label="Personal Info"></e-stepper-step>
        <e-stepper-step label="Contact Info"></e-stepper-step>
        <e-stepper-step label="Review"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<script>
function validateStep(args) {
    // Validate before allowing next step
    if (!isCurrentStepValid(args.activeStep)) {
        args.cancel = true;
        showError("Please complete all fields");
    }
}
</script>
```

**Use Cases:**
- Registration wizards requiring sequential completion
- Onboarding flows with mandatory steps
- Guided product setup
- Multi-step surveys requiring specific order

---

### locale
**Type:** `string`  
**Default:** `'en-US'`  
**Description:** Sets the culture/locale for the stepper component, affecting labels and text localization.

**Example - Spanish Locale:**
```html
<ejs-stepper id="stepper" locale="es-ES">
    <e-stepper-steps>
        <e-stepper-step label="Cuenta"></e-stepper-step>
        <e-stepper-step label="Perfil"></e-stepper-step>
        <e-stepper-step label="Verificación"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Example - Dynamic Locale from User Settings:**
```html
<ejs-stepper id="stepper" locale="@User.PreferredCulture">
    <e-stepper-steps>
        <e-stepper-step label="@Localizer["Account"]"></e-stepper-step>
        <e-stepper-step label="@Localizer["Profile"]"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Supported Locales:** en-US, de-DE, fr-FR, es-ES, it-IT, ja-JP, pt-BR, zh-CN, ar-SA, and many others

**Use Cases:**
- Multi-language applications
- User preference-based localization
- Global application deployment
- Regional customization

---

### orientation
**Type:** `string | StepperOrientation`  
**Default:** `Horizontal`  
**Values:** `Horizontal`, `Vertical`  
**Description:** Sets the visual layout direction of the stepper component.

**Example - Horizontal Orientation (Default):**
```html
<ejs-stepper id="stepper" orientation="Horizontal">
    <e-stepper-steps>
        <e-stepper-step iconCss="sf-icon-cart" label="Cart"></e-stepper-step>
        <e-stepper-step iconCss="sf-icon-transport" label="Shipping"></e-stepper-step>
        <e-stepper-step iconCss="sf-icon-payment" label="Payment"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Example - Vertical Orientation:**
```html
<ejs-stepper id="stepper" orientation="Vertical">
    <e-stepper-steps>
        <e-stepper-step label="Account Setup"></e-stepper-step>
        <e-stepper-step label="Verify Email"></e-stepper-step>
        <e-stepper-step label="Set Preferences"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Use Cases:**
- Horizontal for desktop checkout flows
- Vertical for long-form wizards
- Mobile-responsive layout
- Limited horizontal space scenarios

---

### readOnly
**Type:** `boolean`  
**Default:** `false`  
**Description:** Disables all user interactions with the stepper. Users cannot click steps or navigate. Useful for displaying completed workflows.

**Example - Read-Only Progress Display:**
```html
<ejs-stepper id="stepper" readOnly="true" activeStep="2">
    <e-stepper-steps>
        <e-stepper-step status="Completed" label="Order Placed"></e-stepper-step>
        <e-stepper-step status="Completed" label="Shipped"></e-stepper-step>
        <e-stepper-step status="InProgress" label="In Transit"></e-stepper-step>
        <e-stepper-step status="NotStarted" label="Delivered"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Use Cases:**
- Display order status tracking
- Show workflow history
- Provide progress visualization
- Prevent user interaction with completed flows

---

### showTooltip
**Type:** `boolean`  
**Default:** `false`  
**Description:** When enabled, displays a tooltip on each step when the user hovers over it. Tooltip content can be customized with `tooltipTemplate`.

**Example - Enable Default Tooltips:**
```html
<ejs-stepper id="stepper" showTooltip="true">
    <e-stepper-steps>
        <e-stepper-step label="Cart" text="Your shopping items"></e-stepper-step>
        <e-stepper-step label="Shipping" text="Enter delivery address"></e-stepper-step>
        <e-stepper-step label="Payment" text="Select payment method"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Example - Custom Tooltip Content:**
```html
<ejs-stepper id="stepper" showTooltip="true" tooltipTemplate="<p>${step.label}: ${step.text}</p>">
    <e-stepper-steps>
        <e-stepper-step label="Step 1" text="First step description"></e-stepper-step>
        <e-stepper-step label="Step 2" text="Second step description"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Use Cases:**
- Provide step-specific guidance
- Show extended descriptions
- Clarify complex workflows
- Improve accessibility

---

### stepType
**Type:** `string | StepType`  
**Default:** `Default`  
**Values:** `Default`, `Label`, `Indicator`  
**Description:** Controls how steps are visually displayed.

**Example - Default Step Type (Icon + Label):**
```html
<ejs-stepper id="stepper" stepType="Default">
    <e-stepper-steps>
        <e-stepper-step iconCss="sf-icon-cart" label="Cart"></e-stepper-step>
        <e-stepper-step iconCss="sf-icon-transport" label="Shipping"></e-stepper-step>
        <e-stepper-step iconCss="sf-icon-payment" label="Payment"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Example - Label Only Type:**
```html
<ejs-stepper id="stepper" stepType="Label">
    <e-stepper-steps>
        <e-stepper-step label="Account Info"></e-stepper-step>
        <e-stepper-step label="Shipping Address"></e-stepper-step>
        <e-stepper-step label="Payment Method"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Example - Indicator Only Type (Icon Only):**
```html
<ejs-stepper id="stepper" stepType="Indicator">
    <e-stepper-steps>
        <e-stepper-step iconCss="sf-icon-cart"></e-stepper-step>
        <e-stepper-step iconCss="sf-icon-transport"></e-stepper-step>
        <e-stepper-step iconCss="sf-icon-payment"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Use Cases:**
- Text-only for minimalist design
- Icons-only for space-constrained layouts
- Combined for maximum clarity
- Different types for different screens

---

### template
**Type:** `string | Function`  
**Default:** `null`  
**Description:** Custom HTML template for rendering step content. Allows complete control over step appearance.

**Template Context Variables:**
- `${step.label}` - Step label
- `${step.text}` - Step text
- `${step.status}` - Step status
- `${currentStep}` - Index of current step
- `${step.optional}` - Whether step is optional
- `${step.disabled}` - Whether step is disabled

**Example - Simple Template:**
```html
<ejs-stepper id="stepper" template="<span class='step-title'>${step.label}</span>">
    <e-stepper-steps>
        <e-stepper-step label="Cart"></e-stepper-step>
        <e-stepper-step label="Shipping"></e-stepper-step>
        <e-stepper-step label="Payment"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Example - Complex Custom Template:**
```html
<ejs-stepper id="stepper" template="<div class='custom-step'><p>${step.label}</p><small>${step.text || 'Not started'}</small></div>">
    <e-stepper-steps>
        <e-stepper-step label="Step 1" text="Required"></e-stepper-step>
        <e-stepper-step label="Step 2" text="Optional" optional="true"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Use Cases:**
- Brand-specific step designs
- Dynamic status displays
- Custom step numbering
- Complex step hierarchies

---

### tooltipTemplate
**Type:** `string | Function`  
**Default:** `null`  
**Description:** Custom HTML template for tooltip content when `showTooltip="true"`.

**Template Context Variables:**
- `${step.label}` - Step label
- `${step.text}` - Step text
- `${currentStep}` - Current step index

**Example - Rich Tooltip Content:**
```html
<ejs-stepper id="stepper" showTooltip="true" tooltipTemplate="<div><strong>${step.label}</strong><p>${step.text}</p></div>">
    <e-stepper-steps>
        <e-stepper-step label="Cart" text="Review your selected items"></e-stepper-step>
        <e-stepper-step label="Shipping" text="Choose delivery method and address"></e-stepper-step>
        <e-stepper-step label="Payment" text="Select payment and confirm order"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Use Cases:**
- Detailed step descriptions
- Contextual help text
- Step-specific guidance
- Extended user instructions

---

## Step-Level Properties

### cssClass
**Type:** `string`  
**Default:** `''`  
**Description:** Applies custom CSS class to a specific step for individual styling.

**Example:**
```html
<ejs-stepper>
    <e-stepper-steps>
        <e-stepper-step label="Premium Step" cssClass="premium"></e-stepper-step>
        <e-stepper-step label="Standard Step" cssClass="standard"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<style>
.premium::before { background: gold !important; }
.standard::before { background: silver !important; }
</style>
```

---

### disabled
**Type:** `boolean`  
**Default:** `false`  
**Description:** Disables a specific step, preventing user interaction and displaying it as grayed out.

**Example:**
```html
<ejs-stepper>
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2 (Disabled)" disabled="true"></e-stepper-step>
        <e-stepper-step label="Step 3"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

---

### iconCss
**Type:** `string`  
**Default:** `''`  
**Description:** CSS class for the step icon (uses Syncfusion icon library).

**Example:**
```html
<ejs-stepper>
    <e-stepper-steps>
        <e-stepper-step iconCss="sf-icon-cart" label="Cart"></e-stepper-step>
        <e-stepper-step iconCss="sf-icon-location" label="Address"></e-stepper-step>
        <e-stepper-step iconCss="sf-icon-credit-card" label="Payment"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

---

### isValid
**Type:** `boolean | null`  
**Default:** `null`  
**Values:** `true` (valid), `false` (invalid), `null` (undetermined)  
**Description:** Indicates the validation state of the step.

**Example:**
```html
<ejs-stepper>
    <e-stepper-steps>
        <e-stepper-step label="Valid Step" isValid="true"></e-stepper-step>
        <e-stepper-step label="Invalid Step" isValid="false"></e-stepper-step>
        <e-stepper-step label="Pending Step" isValid="null"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

---

### label
**Type:** `string`  
**Default:** `''`  
**Description:** Primary label text for the step.

**Example:**
```html
<ejs-stepper>
    <e-stepper-steps>
        <e-stepper-step label="Shipping Address"></e-stepper-step>
        <e-stepper-step label="Payment Method"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

---

### optional
**Type:** `boolean`  
**Default:** `false`  
**Description:** Marks a step as optional. Users can skip optional steps during progression.

**Example:**
```html
<ejs-stepper>
    <e-stepper-steps>
        <e-stepper-step label="Billing Address"></e-stepper-step>
        <e-stepper-step label="Gift Message" optional="true"></e-stepper-step>
        <e-stepper-step label="Confirm Order"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

---

### status
**Type:** `string | StepStatus`  
**Default:** `NotStarted`  
**Values:** `NotStarted`, `InProgress`, `Completed`  
**Description:** Indicates the current status/progress of the step.

**Example:**
```html
<ejs-stepper>
    <e-stepper-steps>
        <e-stepper-step label="Completed" status="Completed"></e-stepper-step>
        <e-stepper-step label="In Progress" status="InProgress"></e-stepper-step>
        <e-stepper-step label="Not Started" status="NotStarted"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

---

### text
**Type:** `string`  
**Default:** `''`  
**Description:** Secondary descriptive text for the step, displayed below or alongside the label.

**Example:**
```html
<ejs-stepper>
    <e-stepper-steps>
        <e-stepper-step label="Shipping" text="Enter delivery address"></e-stepper-step>
        <e-stepper-step label="Payment" text="Select payment method"></e-stepper-step>
        <e-stepper-step label="Review" text="Confirm order details"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

---

## Animation Properties

Located within the `<e-stepper-animation>` element:

### enable
**Type:** `boolean`  
**Default:** `true`  
**Description:** Enables/disables step transition animations.

### duration
**Type:** `number`  
**Default:** `2000`  
**Description:** Animation duration in milliseconds.

### delay
**Type:** `number`  
**Default:** `0`  
**Description:** Delay before animation starts in milliseconds.

**Complete Animation Configuration Example:**
```html
<ejs-stepper>
    <e-stepper-animation enable="true" duration="1000" delay="500"></e-stepper-animation>
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```
