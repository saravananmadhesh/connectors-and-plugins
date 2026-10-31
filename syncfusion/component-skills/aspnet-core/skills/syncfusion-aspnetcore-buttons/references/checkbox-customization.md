# Customization and Appearance – ASP.NET Core Checkbox

Customize checkbox appearance using CSS classes and styling properties.

---

## Table of Contents
- [CSS Class Overrides](#css-class-overrides)
- [Size Variants](#size-variants)
- [Color Variants](#color-variants)
- [Custom Frame Shape](#custom-frame-shape)
- [Label Positioning](#label-positioning)
- [RTL Support](#rtl-support)
- [Complete Customization Example](#complete-customization-example)

---

## CSS Class Overrides

Customize the Checkbox appearance by overriding its default CSS classes. Use the `cssClass` property to apply a custom class, then define styles in your stylesheet:

| CSS Selector | Purpose |
|---|---|
| `.e-checkbox-wrapper .e-frame` | Checkbox frame |
| `.e-checkbox-wrapper:hover .e-frame` | Frame on hover |
| `.e-checkbox-wrapper .e-label` | Checkbox label text |
| `.e-checkbox-wrapper .e-frame.e-check` | Checked frame |
| `.e-checkbox-wrapper .e-frame.e-indeterminate` | Indeterminate frame |
| `.e-checkbox-wrapper.e-disabled .e-frame` | Disabled frame |

```cshtml
<style>
    /* Custom border styling */
    .e-checkbox-wrapper.e-custom .e-frame {
        border: 2px solid #666;
        border-radius: 4px;
    }
    
    .e-checkbox-wrapper.e-custom .e-frame.e-check {
        background-color: #007bff;
        border-color: #007bff;
    }
</style>

<ejs-checkbox id="customCheckbox" label="Custom Styled" cssClass="e-custom"></ejs-checkbox>
```

---

## Size Variants

Use CSS classes to control checkbox size:

```cshtml
<!-- Default size -->
<ejs-checkbox id="default" label="Default Size"></ejs-checkbox>

<!-- Small size -->
<ejs-checkbox id="small" label="Small Size" cssClass="e-small"></ejs-checkbox>
```

**Available sizes:** `e-small` (others use default size)

---

## Color Variants

Apply semantic color meanings using custom CSS classes with built-in color schemes:

**Razor Page (.cshtml):**
```cshtml
<style>
    /* Primary */
    .e-checkbox-wrapper.e-primary .e-frame.e-check,
    .e-checkbox-wrapper.e-primary:hover .e-frame.e-check {
        background-color: #e3165b;
        border-color: #e3165b;
    }
    
    /* Success */
    .e-checkbox-wrapper.e-success .e-frame.e-check,
    .e-checkbox-wrapper.e-success:hover .e-frame.e-check {
        background-color: #4caf50;
        border-color: #4caf50;
    }
    
    /* Warning */
    .e-checkbox-wrapper.e-warning .e-frame.e-check,
    .e-checkbox-wrapper.e-warning:hover .e-frame.e-check {
        background-color: #ff9800;
        border-color: #ff9800;
    }
    
    /* Danger */
    .e-checkbox-wrapper.e-danger .e-frame.e-check,
    .e-checkbox-wrapper.e-danger:hover .e-frame.e-check {
        background-color: #f44336;
        border-color: #f44336;
    }
    
    /* Info */
    .e-checkbox-wrapper.e-info .e-frame.e-check,
    .e-checkbox-wrapper.e-info:hover .e-frame.e-check {
        background-color: #17a2b8;
        border-color: #17a2b8;
    }
</style>

<ul>
    <li><ejs-checkbox id="primary" label="Primary" cssClass="e-primary" checked="true"></ejs-checkbox></li>
    <li><ejs-checkbox id="success" label="Success" cssClass="e-success" checked="true"></ejs-checkbox></li>
    <li><ejs-checkbox id="warning" label="Warning" cssClass="e-warning" checked="true"></ejs-checkbox></li>
    <li><ejs-checkbox id="danger" label="Danger" cssClass="e-danger" checked="true"></ejs-checkbox></li>
    <li><ejs-checkbox id="info" label="Info" cssClass="e-info" checked="true"></ejs-checkbox></li>
</ul>
```

---

## Custom Frame Shape

Create round (circular) checkboxes by setting `border-radius: 100%` on the frame:

```cshtml
<style>
    /* Round frame */
    .e-checkbox-wrapper.e-rounded .e-frame {
        border-radius: 100%;
    }
    
    .e-checkbox-wrapper.e-rounded .e-frame.e-check {
        border-radius: 100%;
        background-color: #007bff;
        border-color: #007bff;
    }
</style>

<ul>
    <li><ejs-checkbox id="round1" label="Buy Groceries" cssClass="e-rounded" checked="true"></ejs-checkbox></li>
    <li><ejs-checkbox id="round2" label="Pay Rent" cssClass="e-rounded"></ejs-checkbox></li>
    <li><ejs-checkbox id="round3" label="Make Dinner" cssClass="e-rounded"></ejs-checkbox></li>
</ul>
```

---

## Label Positioning

Control label placement using the `labelPosition` property:

| Value | Behavior |
|-------|----------|
| `"After"` | Label appears to the **right** of the checkbox (default) |
| `"Before"` | Label appears to the **left** of the checkbox |

```cshtml
<!-- Label on the right (default) -->
<ejs-checkbox id="default" label="Right Side Label"></ejs-checkbox>

<!-- Label on the left -->
<ejs-checkbox id="before" label="Left Side Label" labelPosition="Before"></ejs-checkbox>
```

---

## RTL Support

Enable right-to-left layout for RTL languages (Arabic, Hebrew, etc.):

```cshtml
<!-- Single checkbox with RTL -->
<ejs-checkbox id="rtl" label="RTL Checkbox" enableRtl="true"></ejs-checkbox>

<!-- Multiple checkboxes with RTL -->
<ul dir="rtl">
    <li><ejs-checkbox id="rtl1" label="خيار 1" enableRtl="true"></ejs-checkbox></li>
    <li><ejs-checkbox id="rtl2" label="خيار 2" enableRtl="true"></ejs-checkbox></li>
</ul>
```

When `enableRtl="true"`, the checkbox frame and label render in right-to-left order.

---

## Complete Customization Example

```cshtml
@{
    // Combine multiple customizations
}

<style>
    .task-checkbox .e-frame {
        width: 24px;
        height: 24px;
        border-width: 2px;
    }
    
    .task-checkbox .e-frame.e-check {
        background-color: #28a745;
        border-color: #28a745;
    }
    
    .task-checkbox:hover .e-frame {
        border-color: #28a745;
    }
    
    .task-checkbox .e-label {
        font-weight: 500;
        margin-left: 8px;
    }
</style>

<fieldset>
    <legend>Task Checklist</legend>
    
    <ul>
        <li><ejs-checkbox id="task1" label="Complete project documentation" cssClass="task-checkbox" checked="true"></ejs-checkbox></li>
        <li><ejs-checkbox id="task2" label="Review pull requests" cssClass="task-checkbox"></ejs-checkbox></li>
        <li><ejs-checkbox id="task3" label="Update dependencies" cssClass="task-checkbox" checked="true"></ejs-checkbox></li>
        <li><ejs-checkbox id="task4" label="Deploy to production" cssClass="task-checkbox"></ejs-checkbox></li>
    </ul>
</fieldset>
```

---

## See Also

- [Checkbox Getting Started](checkbox-getting-started.md)
- [Checkbox States and Features](checkbox-features-and-state.md)
- [Checkbox Label and Size](checkbox-label-and-size.md)
- [Checkbox API Reference](checkbox-api.md)
- [Checkbox Accessibility](checkbox-accessibility.md)
