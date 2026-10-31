# API Reference – ASP.NET Core Checkbox

> **Source:** [https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.buttons.checkbox.html#properties](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.buttons.checkbox.html#properties)  
> **Namespace:** `Syncfusion.EJ2.Buttons`  
> **Assembly:** `Syncfusion.AspNetCore.Buttons.dll`  
> **Tag Helper:** `<ejs-checkbox>`

Complete API reference for the Syncfusion ASP.NET Core Checkbox component.

---

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Tag Helper Attributes](#tag-helper-attributes)
- [Complete Example](#complete-example)

---

## Properties

| Property | Tag Helper Attr | Type | Default | Description |
|----------|-----------------|------|---------|-------------|
| `Change` | `change` | `string` (JS function) | `null` | Triggers when the CheckBox state has been changed by user interaction |
| `Checked` | `checked` | `bool` | `false` | Specifies a value that indicates whether the CheckBox is `checked` or not |
| `Created` | `created` | `string` (JS function) | `null` | Triggers once the component rendering is completed |
| `CssClass` | `cssClass` | `string` | `""` | Defines class/multiple classes separated by a space in the CheckBox element |
| `Disabled` | `disabled` | `bool` | `false` | Specifies a value that indicates whether the CheckBox is `disabled` or not |
| `EnableHtmlSanitizer` | `enableHtmlSanitizer` | `bool` | `true` | Specifies whether to enable rendering of untrusted HTML values; sanitizes suspected untrusted strings and scripts |
| `EnablePersistence` | `enablePersistence` | `bool` | `false` | Enable or disable persisting component's state between page reloads |
| `EnableRtl` | `enableRtl` | `bool` | `false` | Enable or disable rendering component in right to left direction |
| `For` | `for` | `ModelExpression` | — | Overrides `Syncfusion.EJ2.EJTagHelper.For` |
| `HtmlAttributes` | `htmlAttributes` | `object` | `null` | Add additional HTML attributes (e.g., disabled, value). If both property and equivalent HTML attribute are configured, the component considers the property value |
| `Indeterminate` | `indeterminate` | `bool` | `false` | Specifies a value that indicates whether the CheckBox is in `indeterminate` state or not |
| `Label` | `label` | `string` | `""` | Defines the caption for the CheckBox that describes its purpose |
| `LabelPosition` | `labelPosition` | `LabelPosition` | `LabelPosition.After` | Positions label `before`/`after` the CheckBox. Possible values: `Before`, `After` |
| `Locale` | `locale` | `string` | `""` | Overrides the global culture and localization value. Default global culture is `'en-US'` |
| `Name` | `name` | `string` | `""` | Defines `name` attribute for the CheckBox. Used to reference form data after form submission |
| `Value` | `value` | `string` | `""` | Defines `value` attribute for the CheckBox. Form data passed to the server when submitting the form |

---

## Property Usage Examples

### enableHtmlSanitizer

Control HTML content sanitization in labels for security:

```cshtml
<!-- HTML sanitized (safe, default) -->
<ejs-checkbox 
    id="sanitized" 
    label="<b>Bold Label</b>"
    enableHtmlSanitizer="true">
</ejs-checkbox>

<!-- HTML NOT sanitized (use with caution) -->
<ejs-checkbox 
    id="unsanitized" 
    label="<b>Bold Label</b>"
    enableHtmlSanitizer="false">
</ejs-checkbox>
```

**Property:** `enableHtmlSanitizer` — `bool`, defaults to `true`

### enablePersistence

Persist checkbox state across page reloads:

```cshtml
<!-- State persists using localStorage -->
<ejs-checkbox 
    id="persistent" 
    label="Remember my preference"
    enablePersistence="true"
    name="userPreference"
    value="remembered">
</ejs-checkbox>
```

**Property:** `enablePersistence` — `bool`, defaults to `false`

> When enabled, the checkbox state is saved to browser localStorage and restored on page reload.

---

## Events

| Event | Tag Helper Attr | Type | Description |
|-------|-----------------|------|-------------|
| `Change` | `change` | `string` (JS function) | Triggers when the CheckBox state has been changed by user interaction |
| `Created` | `created` | `string` (JS function) | Triggers once the component rendering is completed |

**Event Usage Example:**
```cshtml
<ejs-checkbox id="eventCheckbox" label="Change Event Checkbox" change="onChange" created="onCreated"></ejs-checkbox>

<div id="eventLog"></div>

<script>
    function onChange(args) {
        var log = document.getElementById('eventLog');
        log.textContent = 'Checkbox changed to: ' + args.checked;
    }

    function onCreated() {
        console.log('Checkbox created');
    }
</script>
```

---

## Methods

> The official `Syncfusion.EJ2.Buttons.CheckBox` API page does not document a public Methods section. Component instance methods can be invoked via the underlying EJ2 widget reference (e.g. `document.getElementById('id').ej2_instances[0]`). For guaranteed behavior, prefer the documented properties and events above.

---

## Tag Helper Attributes

All documented properties are available as tag helper attributes (PascalCase, matching the C# property names):

```cshtml
<ejs-checkbox 
    id="complete-checkbox"
    label="I accept all terms"
    checked="true"
    disabled="false"
    indeterminate="false"
    name="acceptance"
    value="yes"
    cssClass="e-primary"
    labelPosition="After"
    enableRtl="false"
    enableHtmlSanitizer="true"
    enablePersistence="false"
    locale="en-US"
    htmlAttributes="@new { data_custom = 'value' }">
</ejs-checkbox>
```

---

## Complete Example

```cshtml
@{
    // Controller or Page Handler can set initial values
    ViewData["TermsAccepted"] = false;
}

<form method="post">
    <fieldset>
        <legend>Account Settings</legend>
        
        <!-- Basic checkbox -->
        <div>
            <ejs-checkbox 
                id="emailUpdates" 
                name="emailUpdates"
                value="yes"
                label="Receive email updates"
                checked="false">
            </ejs-checkbox>
        </div>
        
        <!-- Disabled checkbox -->
        <div>
            <ejs-checkbox 
                id="twoFactor" 
                name="twoFactor"
                value="enabled"
                label="Two-factor authentication (must be enabled)"
                checked="true"
                disabled="true">
            </ejs-checkbox>
        </div>
        
        <!-- Required checkbox with small size -->
        <div>
            <ejs-checkbox 
                id="terms" 
                name="agreeTerms"
                value="agreed"
                label="I agree to the terms of service"
                cssClass="e-small"
                labelPosition="After">
            </ejs-checkbox>
        </div>
        
        <!-- Indeterminate (parent) checkbox -->
        <div>
            <ejs-checkbox 
                id="selectAll" 
                label="Select All Notifications"
                indeterminate="true">
            </ejs-checkbox>
            
            <ul style="margin-left: 30px;">
                <li><ejs-checkbox name="notifications" value="email" label="Email Notifications"></ejs-checkbox></li>
                <li><ejs-checkbox name="notifications" value="sms" label="SMS Notifications"></ejs-checkbox></li>
                <li><ejs-checkbox name="notifications" value="push" label="Push Notifications" checked="true"></ejs-checkbox></li>
            </ul>
        </div>
        
        <ejs-button id="submit" type="submit" cssClass="e-primary" content="Save Settings"></ejs-button>
    </fieldset>
</form>

<script>
    // Enable ripple effect on all checkboxes
    Syncfusion.enableRipple(true);
</script>
```

**C# Page Handler:**
```csharp
public async Task<IActionResult> OnPostAsync()
{
    // Retrieve checkbox values from form submission
    bool emailUpdates = Request.Form["emailUpdates"] == "yes";
    bool agreeTerms = Request.Form["agreeTerms"] == "agreed";
    
    var notifications = Request.Form["notifications"].ToList();
    // notifications contains: ["email", "sms", "push"] etc.
    
    // Process and save settings
    // ...
    
    return RedirectToPage("./Success");
}
```

---

## See Also

- [Checkbox Getting Started](checkbox-getting-started.md)
- [Checkbox States and Features](checkbox-features-and-state.md)
- [Checkbox Label and Size](checkbox-label-and-size.md)
- [Checkbox Customization](checkbox-customization.md)
- [Checkbox Accessibility](checkbox-accessibility.md)
