# States and Features – ASP.NET Core Checkbox

The checkbox component supports three visual states: **checked**, **unchecked**, and **indeterminate**. A **disabled** state is also available.

---

## Table of Contents
- [Checked and Unchecked State](#checked-and-unchecked-state)
- [Indeterminate State](#indeterminate-state)
- [Disabled State](#disabled-state)
- [Form Integration](#form-integration)
- [Change Event Handling](#change-event-handling)
- [State Summary](#state-summary)

---

## Checked and Unchecked State

Use the `checked` attribute to control the checkbox state. Set `checked="true"` for a checked box:

```cshtml
<!-- Checked state -->
<ejs-checkbox id="checked" label="Checked State" checked="true"></ejs-checkbox>

<!-- Unchecked state (default) -->
<ejs-checkbox id="unchecked" label="Unchecked State"></ejs-checkbox>
```

**Property:** `checked` — `bool`, defaults to `false`

---

## Indeterminate State

Set `indeterminate="true"` to display a partial-selection indicator. This is commonly used for **parent checkboxes** in hierarchical lists where some (but not all) child items are selected.

> The indeterminate state can only be set programmatically — users cannot toggle it directly from UI.

```cshtml
<fieldset>
    <legend>Features</legend>
    
    <!-- Parent checkbox (indeterminate) -->
    <ejs-checkbox id="selectAll" label="Select All" indeterminate="true"></ejs-checkbox>
    
    <!-- Child checkboxes -->
    <ul style="margin-left: 20px;">
        <li><ejs-checkbox id="feature1" label="Feature 1" checked="true"></ejs-checkbox></li>
        <li><ejs-checkbox id="feature2" label="Feature 2" checked="true"></ejs-checkbox></li>
        <li><ejs-checkbox id="feature3" label="Feature 3"></ejs-checkbox></li>
    </ul>
</fieldset>
```

**Property:** `indeterminate` — `bool`, defaults to `false`

---

## Disabled State

Set `disabled="true"` to prevent user interaction. Disabled checkboxes are visually dimmed and non-interactive. **Disabled checkbox values are NOT submitted** in forms.

```cshtml
<ul>
    <li><ejs-checkbox id="active" label="Active Option" checked="true"></ejs-checkbox></li>
    <li><ejs-checkbox id="disabled" label="Disabled Option" disabled="true"></ejs-checkbox></li>
    <li><ejs-checkbox id="disabledChecked" label="Disabled & Checked" disabled="true" checked="true"></ejs-checkbox></li>
</ul>
```

**Property:** `disabled` — `bool`, defaults to `false`

---

## Form Integration

Checkboxes integrate with HTML forms using the standard `name` and `value` attributes. Only **checked** checkboxes are submitted with the form.

**Razor Page (.cshtml):**
```cshtml
<form method="post">
    <fieldset>
        <legend>Select Sports</legend>
        
        <ejs-checkbox id="cricket" name="Sports" value="Cricket" label="Cricket" checked="true"></ejs-checkbox>
        <ejs-checkbox id="hockey" name="Sports" value="Hockey" label="Hockey" checked="true"></ejs-checkbox>
        <ejs-checkbox id="tennis" name="Sports" value="Tennis" label="Tennis"></ejs-checkbox>
        <ejs-checkbox id="basketball" name="Sports" value="Basketball" label="Basketball" disabled="true"></ejs-checkbox>
    </fieldset>
    
    <ejs-button id="submit" type="submit" cssClass="e-primary" content="Submit"></ejs-button>
</form>
```

**Page Handler (C#):**
```csharp
public async Task<IActionResult> OnPostAsync()
{
    // Get all selected checkbox values
    var selectedSports = Request.Form["Sports"].ToList();
    
    // Access individual values
    if (Request.Form.ContainsKey("Sports"))
    {
        var sports = Request.Form["Sports"].ToList();
        // Process sports list
    }
    
    return Page();
}
```

**Form Submission Behavior:**
| State | Submitted |
|-------|-----------|
| Checked | ✓ Yes |
| Unchecked | ✗ No |
| Disabled | ✗ No |

---

## Change Event Handling

Respond to state changes using the `change` event:

**Razor Page:**
```cshtml
<ejs-checkbox id="notifyCheckbox" label="Notify on change"></ejs-checkbox>

<div id="status"></div>

<script>
    document.getElementById('notifyCheckbox').addEventListener('change', function(e) {
        var status = document.getElementById('status');
        status.textContent = 'Checked: ' + e.target.checked;
        console.log('Checkbox changed to:', e.target.checked);
    });
</script>
```

**Advanced: Update Server State:**
```cshtml
<ejs-checkbox id="autoSaveCheckbox" label="Auto-save preferences"></ejs-checkbox>

<script>
    document.getElementById('autoSaveCheckbox').addEventListener('change', function(e) {
        // Send AJAX request to server
        fetch('/Settings/UpdatePreference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                preference: 'autoSave',
                enabled: e.target.checked
            })
        }).then(response => response.json())
          .then(data => console.log('Saved:', data));
    });
</script>
```

---

## State Summary

| State | Property | Default | Use Case |
|-------|----------|---------|----------|
| Checked | `checked="true"` | `false` | Selected option |
| Unchecked | `checked="false"` | — | Unselected option |
| Indeterminate | `indeterminate="true"` | `false` | Partial selection (parent checkbox) |
| Disabled | `disabled="true"` | `false` | Unavailable option |

---

## See Also

- [Checkbox Getting Started](checkbox-getting-started.md)
- [Checkbox Label and Size](checkbox-label-and-size.md)
- [Checkbox Customization](checkbox-customization.md)
- [Checkbox API Reference](checkbox-api.md)
- [Checkbox Accessibility](checkbox-accessibility.md)
