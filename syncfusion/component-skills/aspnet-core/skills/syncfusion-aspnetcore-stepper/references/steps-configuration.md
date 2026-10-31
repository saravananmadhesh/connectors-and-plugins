# Steps Configuration

## Table of Contents
- [Defining Step Icons](#defining-step-icons)
- [Text and Label Content](#text-and-label-content)
- [Optional Steps](#optional-steps)
- [Disabled Steps](#disabled-steps)
- [Readonly Mode](#readonly-mode)
- [Active Step](#active-step)
- [Step Status](#step-status)
- [Step Styling](#step-styling)
- [Step Validation](#step-validation)

## Defining Step Icons

Use the `iconCss` property to display icons in each step:

```html
<ejs-stepper id="stepper">
    <e-stepper-steps>
        <e-stepper-step iconCss="sf-icon-cart" label="Profile"></e-stepper-step>
        <e-stepper-step iconCss="sf-icon-transport" label="Address"></e-stepper-step>
        <e-stepper-step iconCss="sf-icon-payment" label="Payment"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

Icons are provided by Syncfusion icons (`sf-icon-*` classes). The icon displays as a circular indicator in the step.

**Common icon classes:**
- `sf-icon-cart` - Shopping cart
- `sf-icon-transport` - Transport/location
- `sf-icon-payment` - Payment
- `sf-icon-success` - Success/checkmark
- `sf-icon-user` - User/profile

## Text and Label Content

### Label Property
The `label` property sets the main text displayed below or next to the step indicator. Display behavior depends on `stepType`.

### Text Property
The `text` property displays secondary descriptive text. Label takes priority when both are defined based on `stepType`.

```html
<ejs-stepper id="stepper">
    <e-stepper-steps>
        <e-stepper-step label="Shipping" text="Enter delivery address"></e-stepper-step>
        <e-stepper-step label="Payment" text="Select payment method"></e-stepper-step>
        <e-stepper-step label="Review" text="Confirm order details"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Behavior:**
- Label and text display together for Default and Indicator step types
- For Label step type, label takes priority
- Text provides context about the step's purpose

## Optional Steps

Mark steps as optional using the `optional` property set to `true`:

```html
<ejs-stepper id="stepper">
    <e-stepper-step label="Required Step"></e-stepper-step>
    <e-stepper-step label="Optional Step" optional="true"></e-stepper-step>
    <e-stepper-step label="Another Required Step"></e-stepper-step>
</ejs-stepper>
```

When `optional="true"`:
- "Optional" text appears next to the step label
- Users can skip the step during progression
- Default: `optional="false"` (steps are required)

This is useful for checkout flows (e.g., "Gift message - Optional"), surveys, or form wizards where some steps are conditional.

## Disabled Steps

Prevent user interaction with a step by setting `disabled="true"`:

```html
<ejs-stepper id="stepper">
    <e-stepper-step label="Step 1" disabled="false"></e-stepper-step>
    <e-stepper-step label="Step 2 (Disabled)" disabled="true"></e-stepper-step>
    <e-stepper-step label="Step 3" disabled="false"></e-stepper-step>
</ejs-stepper>
```

**Effects of disabled="true":**
- User cannot click the step
- Step appears grayed out/dimmed
- Step cannot become active
- Default: `disabled="false"`

**Use cases:**
- Lock form steps pending prerequisite completion
- Disable future steps until current step validates
- Prevent access to advanced options based on permissions

## Readonly Mode

Disable all stepper interactions using `readOnly` property on the stepper:

```html
<ejs-stepper id="stepper" readOnly="true">
    <e-stepper-step label="Step 1"></e-stepper-step>
    <e-stepper-step label="Step 2"></e-stepper-step>
    <e-stepper-step label="Step 3"></e-stepper-step>
</ejs-stepper>
```

**Effects of readOnly="true":**
- Users cannot click any steps
- Stepper displays but is non-interactive
- Useful for displaying completed workflows as progress indicators
- Default: `readOnly="false"`

**Use cases:**
- Display finalized order flow
- Show read-only status tracker
- Display workflow history without editing capability

## Active Step

Set the currently active step using `activeStep` property:

```html
<ejs-stepper id="stepper" activeStep="2">
    <e-stepper-step label="Step 1"></e-stepper-step>
    <e-stepper-step label="Step 2"></e-stepper-step>
    <e-stepper-step label="Step 3"></e-stepper-step>
    <e-stepper-step label="Step 4"></e-stepper-step>
</ejs-stepper>
```

**Properties:**
- `activeStep` - Zero-based index of the active step (0 = first step)
- Default: `activeStep="0"` (first step active)
- Range: 0 to (total_steps - 1)

**Use cases:**
- Resume multi-page form from saved progress
- Navigate to specific workflow stage
- Display dynamic progress based on application state

## Step Status

Control the visual progress state of each step using the `status` property:

```html
<ejs-stepper id="stepper">
    <e-stepper-step label="Completed" status="Completed"></e-stepper-step>
    <e-stepper-step label="In Progress" status="InProgress"></e-stepper-step>
    <e-stepper-step label="Not Started" status="NotStarted"></e-stepper-step>
</ejs-stepper>
```

**Status values:**
- `NotStarted` - Step not yet initiated (default appearance)
- `InProgress` - Currently being processed (special styling)
- `Completed` - Successfully completed (checkmark or completion indicator)

**Visual indicators:**
- Different colors or icons for each status
- Helps users understand workflow progress
- Independent of `activeStep` property

## Step Styling

Apply custom CSS styles to individual steps using `cssClass`:

```html
<ejs-stepper id="stepper">
    <e-stepper-step label="Premium Step" cssClass="premium-step"></e-stepper-step>
    <e-stepper-step label="Standard Step" cssClass="standard-step"></e-stepper-step>
    <e-stepper-step label="Urgent Step" cssClass="urgent-step"></e-stepper-step>
</ejs-stepper>
```

With CSS:
```css
.premium-step::before {
    background-color: #FFD700 !important;
}

.standard-step::before {
    background-color: #4CAF50 !important;
}

.urgent-step::before {
    background-color: #F44336 !important;
}
```

**Use cases:**
- Highlight important steps
- Indicate priority or severity
- Group related steps visually
- Apply theme-specific styling

## Step Validation

Display validation state (success or error) for each step using `isValid`:

```html
<ejs-stepper id="stepper">
    <e-stepper-steps>
        <e-stepper-step label="Profile" isValid="true"></e-stepper-step>
        <e-stepper-step label="Email" isValid="false"></e-stepper-step>
        <e-stepper-step label="Address" isValid="null"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**isValid values:**
- `true` - Step is valid (displays success/checkmark icon)
- `false` - Step has errors (displays error icon)
- `null` - Validation state unknown (default appearance)

**Icon display:**
- **Default/Label stepType:** Validation icon replaces regular icon
- **Indicator stepType:** Icon displays in the step indicator

**Use cases:**
- Show form field validation before submission
- Highlight steps with data issues
- Indicate which steps are ready for progression

See [Steps validation](./steps-validation.md) reference for advanced validation patterns.
