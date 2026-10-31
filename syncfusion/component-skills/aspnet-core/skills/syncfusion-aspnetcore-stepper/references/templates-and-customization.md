# Templates and Customization

## Table of Contents
- [Step Templates](#step-templates)
  - [Basic Step Template](#basic-step-template)
  - [Template Context](#template-context)
  - [Complex Template Example](#complex-template-example)
  - [Template with Custom Icons](#template-with-custom-icons)
  - [Template with CSS Styling](#template-with-css-styling)
- [Tooltip Configuration](#tooltip-configuration)
- [Tooltip Templates](#tooltip-templates)
- [CSS Customization](#css-customization)
- [Theme Customization](#theme-customization)
- [Animation Effects](#animation-effects)

## Step Templates

The `template` property allows you to create custom HTML content for step display, overriding the default appearance.

### Basic Step Template

```html
<ejs-stepper id="stepper" template="<div>${step.label}<br/><small>${step.text}</small></div>">
    <e-stepper-steps>
        <e-stepper-step label="Profile" text="Set your profile"></e-stepper-step>
        <e-stepper-step label="Security" text="Configure security"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

### Template Context

Templates have access to step properties:

```html
<ejs-stepper id="stepper" template="
    <div class='step-content'>
        <strong>${step.label}</strong>
        <p>${step.text}</p>
        <small class='step-index'>Step ${currentStep + 1}</small>
    </div>
">
    <e-stepper-steps>
        <e-stepper-step label="Step 1" text="Begin"></e-stepper-step>
        <e-stepper-step label="Step 2" text="Continue"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Available in template context:**
- `step` - Current step object with all properties
- `currentStep` - Zero-based index of the step
- `step.label` - Step label text
- `step.text` - Step text content
- `step.iconCss` - Icon CSS class
- `step.status` - Step status (NotStarted, InProgress, Completed) *(verified)*
- `step.disabled` - Whether step is disabled *(verified)*
- `step.isValid` - Validation state - verify against official Syncfusion API as availability may vary

### Complex Template Example

```html
<ejs-stepper id="stepper" template="
    <div class='custom-step'>
        <div class='step-header'>
            <h3>${step.label}</h3>
            <span class='status-badge'>${step.status}</span>
        </div>
        <div class='step-description'>
            <p>${step.text}</p>
        </div>
    </div>
">
    <e-stepper-steps>
        <e-stepper-step label="Cart" text="Review items" status="Completed"></e-stepper-step>
        <e-stepper-step label="Shipping" text="Enter address" status="InProgress"></e-stepper-step>
        <e-stepper-step label="Payment" text="Select payment" status="NotStarted"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

### Template with Custom Icons

Here's a complete example with custom icons using the template feature:

```html
@using Syncfusion.EJ2.Navigations;

<div class="stepper-template-section">
    <ejs-stepper id="stepperTemplate" activeStep="1" template="#template">
        <e-stepper-steps>
            <e-stepper-step label="Powerpoint" iconCss="sf-icon-powerpoint"></e-stepper-step>
            <e-stepper-step label="Presentation" iconCss="sf-icon-projector"></e-stepper-step>
            <e-stepper-step label="Backup" iconCss="sf-icon-onedrive"></e-stepper-step>
        </e-stepper-steps>
    </ejs-stepper>
</div>

<script id="template" type="text/x-jsrender">
    <div class="template-content">
        <span class="${step.iconCss}"></span> <br>
        <span class="e-label">${step.label}</span>
    </div>
</script>

<style>
    .template-content {
        background: #fff;
        width: 65px;
    }

    /* Stepper progressbar customization */
    .e-stepper .e-stepper-progressbar {
        height: 3px;
        top: 25px;
    }
    .e-stepper .e-stepper-progressbar .e-progressbar-value {
        background-color: #27d96d;
    }

    /* Stepper status customization */
    #stepperTemplate .e-step-completed * {
        color: #19cd60;
    }

    #stepperTemplate .e-step-inprogress * {
        color: #3479f3;
    }

    #stepperTemplate .e-step-notstarted * {
        color: #bdbdbd;
    }

    @@font-face {
        font-family: 'template';
        src: url(data:application/x-font-ttf;charset=utf-8;base64,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) format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    [class^="sf-icon-"], [class*=" sf-icon-"] {
        font-family: 'template' !important;
        speak: none;
        font-size: 40px;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .sf-icon-projector:before { content: "\e700"; }
    .sf-icon-powerpoint:before { content: "\e701"; }
    .sf-icon-onedrive:before { content: "\e702"; }

    .stepper-template-section {
        width: 75%;
        margin: 0px auto;
        min-width: 85px;
        padding: 25px 0;
    }
</style>
```

### Template with CSS Styling

```html
<style>
    .custom-step {
        padding: 10px 15px;
        border-radius: 4px;
        background: #f5f5f5;
    }
    
    .step-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
    }
    
    .status-badge {
        font-size: 0.75rem;
        padding: 2px 6px;
        border-radius: 3px;
        background: #ddd;
    }
</style>

<ejs-stepper id="stepper" template="
    <div class='custom-step'>
        <div class='step-header'>
            <h3>${step.label}</h3>
            <span class='status-badge'>${step.status}</span>
        </div>
    </div>
">
    <!-- Steps here -->
</ejs-stepper>
```

## Tooltip Configuration

Enable tooltips to show additional information when hovering over steps.

### Basic Tooltip

```html
<ejs-stepper id="stepper" showTooltip="true">
    <e-stepper-steps>
        <e-stepper-step label="Shipping" text="Enter delivery address"></e-stepper-step>
        <e-stepper-step label="Payment" text="Select payment method"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Behavior:**
- `showTooltip="true"` enables tooltips
- Tooltip displays step label on hover
- Default: `showTooltip="false"`

### Tooltip Styling

```html
<style>
    .e-stepper .e-tooltip {
        background-color: #333;
        color: #fff;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 0.875rem;
    }
</style>

<ejs-stepper id="stepper" showTooltip="true">
    <e-stepper-step label="Profile Setup"></e-stepper-step>
    <e-stepper-step label="Verify Email"></e-stepper-step>
</ejs-stepper>
```

## Tooltip Templates

The `tooltipTemplate` property allows custom HTML content in tooltips.

### Basic Tooltip Template

```html
<ejs-stepper id="stepper" showTooltip="true" tooltipTemplate="
    <div class='tooltip-content'>
        <strong>${step.label}</strong>
        <p>${step.text}</p>
    </div>
">
    <e-stepper-steps>
        <e-stepper-step label="Account" text="Create your account"></e-stepper-step>
        <e-stepper-step label="Verify" text="Verify your email"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

### Detailed Tooltip Template

```html
<ejs-stepper id="stepper" showTooltip="true" tooltipTemplate="
    <div class='detailed-tooltip'>
        <div class='tooltip-header'>
            <h4>${step.label}</h4>
            <span class='tooltip-badge'>${step.status}</span>
        </div>
        <p>${step.text}</p>
        <ul>
            <li>Est. time: 5 minutes</li>
            <li>Required fields: 3</li>
        </ul>
    </div>
">
    <e-stepper-steps>
        <e-stepper-step label="Personal Info" text="Enter your details"></e-stepper-step>
        <e-stepper-step label="Contact Info" text="Enter contact details"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

### Tooltip Template with Dynamic Content

```html
<ejs-stepper id="stepper" showTooltip="true" tooltipTemplate="
    <div class='dynamic-tooltip'>
        <h5>${step.label}</h5>
        <p>${step.text}</p>
        <small style='color: ${getStatusColor(step.status)}'>
            Status: ${step.status}
        </small>
    </div>
">
    <!-- Steps here -->
</ejs-stepper>

<script>
function getStatusColor(status) {
    return status === 'Completed' ? 'green' : 
           status === 'InProgress' ? 'orange' : 'gray';
}
</script>
```

## CSS Customization

Apply custom CSS classes and styles to stepper components.

### Custom CSS Class on Stepper

```html
<ejs-stepper id="stepper" cssClass="custom-stepper">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<style>
    .custom-stepper {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 20px;
        background-color: #f9f9f9;
    }

    .custom-stepper .e-step {
        min-width: 100px;
    }
</style>
```

### Custom CSS Class on Steps

```html
<ejs-stepper id="stepper">
    <e-stepper-steps>
        <e-stepper-step label="Required" cssClass="step-required"></e-stepper-step>
        <e-stepper-step label="Optional" cssClass="step-optional"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>

<style>
    .step-required::before {
        background-color: #FF9800 !important;
    }
    
    .step-optional::before {
        background-color: #2196F3 !important;
    }
</style>
```

### Icon Styling

```html
<style>
    .e-stepper .e-icon {
        width: 36px;
        height: 36px;
        font-size: 18px;
    }
    
    .e-stepper .e-step.e-step-active .e-icon {
        font-weight: bold;
    }
</style>
```

## Theme Customization

Change the stepper appearance using CSS variables or predefined themes.

### Bootstrap 5 Theme (CDN)

```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/bootstrap5.css" />
```

### Fluent Theme

```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/fluent.css" />
```

### Material Theme

```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/material.css" />
```

### Custom CSS Variables

```html
<style>
    .e-stepper {
        --accent-color: #FF6B35;
        --background-color: #F5F5F5;
        --text-color: #333;
        --border-color: #DDD;
    }
</style>
```

## Animation Effects

The `e-stepper-animation` element controls step transition animations.

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

### Customize Animation Duration

```html
<ejs-stepper id="stepper">
    <e-stepper-steps>
        <e-stepper-step label="Profile"></e-stepper-step>
        <e-stepper-step label="Settings"></e-stepper-step>
    </e-stepper-steps>
    <e-stepper-animation enable="true" duration="1500"></e-stepper-animation>
</ejs-stepper>
```

**Parameters:**
- `enable` - Enable/disable animation (default: true)
- `duration` - Transition duration in milliseconds (default: 2000)

### Animation with Delay

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

**Parameters:**
- `delay` - Delay before animation starts in milliseconds (default: 0)
- Creates staggered animation effect when switching steps

### Fast Animation for Performance

```html
<ejs-stepper id="stepper">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
    </e-stepper-steps>
    <e-stepper-animation enable="true" duration="500"></e-stepper-animation>
</ejs-stepper>
```

Choose shorter durations for responsive interfaces or performance-critical applications.
