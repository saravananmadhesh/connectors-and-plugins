# Label and Size – ASP.NET Core Checkbox

Configure checkbox caption text, label position, and display size.

---

## Table of Contents
- [Checkbox Label](#checkbox-label)
- [Label Position](#label-position)
- [Size Variants](#size-variants)
- [Combined Example](#combined-example)

---

## Checkbox Label

Use the `label` property to define the caption for the checkbox. This eliminates the need for separate `<label>` HTML elements:

```cshtml
<ejs-checkbox id="default" label="Accept Terms and Conditions"></ejs-checkbox>
```

**Property:** `label` — `string`, defaults to `''`

**Multiple Checkboxes with Labels:**
```cshtml
<ul>
    <li><ejs-checkbox id="news" label="Receive news and updates"></ejs-checkbox></li>
    <li><ejs-checkbox id="promotions" label="Receive promotional offers"></ejs-checkbox></li>
    <li><ejs-checkbox id="surveys" label="Participate in surveys"></ejs-checkbox></li>
</ul>
```

---

## Label Position

Use the `labelPosition` property to place the label **before** or **after** the checkbox frame:

| Value | Behavior |
|-------|----------|
| `"After"` | Label appears to the **right** of the checkbox (default) |
| `"Before"` | Label appears to the **left** of the checkbox |

```cshtml
<!-- Label on the right (default) -->
<ejs-checkbox id="right" label="Right Side Label"></ejs-checkbox>

<!-- Label on the left -->
<ejs-checkbox id="left" label="Left Side Label" labelPosition="Before"></ejs-checkbox>
```

**Property:** `labelPosition` — `'Before' | 'After'`, defaults to `'After'`

---

## Size Variants

The Checkbox offers two size options:

| Size | How to Set |
|------|-----------|
| **Default** | No additional property needed |
| **Small** | `cssClass="e-small"` |

Use small checkboxes in compact layouts, data tables, or dense form fields:

```cshtml
<!-- Small size -->
<ejs-checkbox id="small" label="Small Checkbox" cssClass="e-small"></ejs-checkbox>

<!-- Default size -->
<ejs-checkbox id="default" label="Default Checkbox"></ejs-checkbox>
```

---

## Combined Example

Combine label, label position, and size for complete customization:

```cshtml
<style>
    .preference-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    .preference-group {
        display: flex;
        align-items: center;
        gap: 8px;
    }
</style>

<fieldset>
    <legend>Email Preferences</legend>
    
    <div class="preference-list">
        <!-- Default size, label on right -->
        <div class="preference-group">
            <ejs-checkbox 
                id="newsletters" 
                label="Subscribe to newsletters"
                labelPosition="After"
                checked="true">
            </ejs-checkbox>
        </div>
        
        <!-- Small size, label on left -->
        <div class="preference-group">
            <ejs-checkbox 
                id="updates" 
                label="Product updates"
                labelPosition="Before"
                cssClass="e-small">
            </ejs-checkbox>
        </div>
        
        <!-- Default size, label on right -->
        <div class="preference-group">
            <ejs-checkbox 
                id="promotions" 
                label="Promotional offers"
                labelPosition="After"
                checked="true">
            </ejs-checkbox>
        </div>
        
        <!-- Small size, label on left -->
        <div class="preference-group">
            <ejs-checkbox 
                id="surveys" 
                label="Survey invitations"
                labelPosition="Before"
                cssClass="e-small">
            </ejs-checkbox>
        </div>
    </div>
</fieldset>
```

---

## See Also

- [Checkbox Getting Started](checkbox-getting-started.md)
- [Checkbox States and Features](checkbox-features-and-state.md)
- [Checkbox Customization](checkbox-customization.md)
- [Checkbox API Reference](checkbox-api.md)
- [Checkbox Accessibility](checkbox-accessibility.md)
