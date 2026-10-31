# API Reference – ASP.NET Core Button

> **Source:** [https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.buttons.button.html#properties](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.buttons.button.html#properties)  
> **Namespace:** `Syncfusion.EJ2.Buttons`  
> **Assembly:** `Syncfusion.AspNetCore.Buttons.dll`  
> **Tag Helper:** `<ejs-button>`

Complete reference for all Button properties, methods, and events.

---

## Properties

| Property | Tag Helper Attr | Type | Default | Description |
|----------|-----------------|------|---------|-------------|
| `Clicked` | `clicked` | `string` (JS function) | `null` | Triggers on every click fire — both the initial press and each repeat while the button is held. Only emitted when `enableRepeat` is `true` |
| `Content` | `content` | `string` | `""` | Defines the text content of the Button element |
| `ContentTemplate` | `content-template` | `MvcTemplate<object>` | — | Tag template for content |
| `Created` | `created` | `string` (JS function) | `null` | Triggers once the component rendering is completed |
| `CssClass` | `css-class` | `string` | `""` | Defines class/multiple classes separated by a space in the Button element (type, style, size) |
| `Disabled` | `disabled` | `bool` | `false` | Specifies a value that indicates whether the Button is disabled or not |
| `EnableHtmlSanitizer` | `enable-html-sanitizer` | `bool` | `true` | Specifies whether to enable rendering of untrusted HTML values; sanitizes suspected untrusted strings and scripts |
| `EnablePersistence` | `enable-persistence` | `bool` | `false` | Enable or disable persisting component's state between page reloads |
| `EnableRepeat` | `enable-repeat` | `bool` | `false` | Enables hold-to-repeat behavior on the Button when set to `true` |
| `EnableRtl` | `enable-rtl` | `bool` | `false` | Enable or disable rendering component in right to left direction |
| `HtmlAttributes` | `html-attributes` | `object` | `null` | Allows additional HTML attributes such as title, name, etc. in key-value pair format |
| `IconCss` | `icon-css` | `string` | `""` | Defines class/multiple classes separated by a space for the Button that is used to include an icon (font icon or sprite image) |
| `IconPosition` | `icon-position` | `IconPosition` | `IconPosition.Left` | Positions the icon before/after the text content. Possible values: `Left`, `Right` |
| `IsPrimary` | `is-primary` | `bool` | `false` | Allows the appearance of the Button to be enhanced and visually appealing when set to `true` |
| `IsToggle` | `is-toggle` | `bool` | `false` | Makes the Button toggle; when clicked, the state changes from normal to active |
| `RepeatDelay` | `repeat-delay` | `double` | `400` | Delay in milliseconds before repeat firing begins after the initial press (only when `enableRepeat` is `true`) |
| `RepeatInterval` | `repeat-interval` | `double` | `0` | Interval in milliseconds between repeated `clicked` fires during a hold. When set to `0`, pointer repeat uses 100ms; keyboard repeat defers to native OS rate |

---

## Tag Helper Syntax

### Basic Button

```cshtml
<ejs-button id="button1" content="Click Me"></ejs-button>
```

### Button with All Properties

```cshtml
<ejs-button 
    id="button1" 
    content="Save" 
    cssClass="e-primary e-small"
    disabled="false"
    type="submit"
    iconCss="e-icons e-save-icon"
    iconPosition="Left"
    isPrimary="true"
    isToggle="false"
    enableRtl="false"
    content="Save"></ejs-button>
```

### Button with HTML Attributes

```cshtml
<ejs-button 
    id="button1" 
    cssClass="e-primary"
    htmlAttributes="@new { data_tooltip = 'Save your work', aria_label = 'Save button' }"
    content="Save"></ejs-button>
```

---

## Events

| Event | Tag Helper Attr | Type | Description |
|-------|-----------------|------|-------------|
| `Created` | `created` | `string` (JS function) | Triggers once the component rendering is completed |
| `Clicked` | `clicked` | `string` (JS function) | Triggers on every click fire — both the initial press and each repeat while the button is held. Only emitted when `enableRepeat` is `true` |

### Handling Events in JavaScript

**View:**
```cshtml
<ejs-button id="eventBtn" created="onCreated" clicked="onClicked" content="Click Me"></ejs-button>

<script>
    function onCreated() {
        console.log('Button created');
    }

    function onClicked(args) {
        // args.originalEvent - the originating DOM event
        // args.isRepeat - false for first press, true for repeat fires (only when enableRepeat is true)
        console.log('Button was clicked!', args);
    }
</script>
```

---

## Methods

> The official `Syncfusion.EJ2.Buttons.Button` API page does not document a public Methods section. Component instance methods can be invoked via the underlying EJ2 widget reference (e.g. `document.getElementById('id').ej2_instances[0]`). For guaranteed behavior, prefer the documented properties and events above.

---

## Common Scenarios

### Primary Action Button

```cshtml
<ejs-button id="saveBtn" cssClass="e-primary" type="submit" content="Save Changes"></ejs-button>
```

### Danger Action Button

```cshtml
<ejs-button id="deleteBtn" cssClass="e-danger" onclick="confirmDelete()" content="Delete"></ejs-button>

<script>
    function confirmDelete() {
        if (confirm('Are you sure?')) {
            // Proceed with deletion
        }
    }
</script>
```

### Small Icon Button

```cshtml
<ejs-button id="compactBtn" cssClass="e-small" iconCss="e-icons e-plus-icon"></ejs-button>
```

### Disabled State

```cshtml
<ejs-button id="submitBtn" disabled="@(!Model.IsFormValid)" content="Submit"></ejs-button>
```

### Round Button (Circular)

```cshtml
<ejs-button id="roundBtn" cssClass="e-round e-primary" iconCss="e-icons e-edit-icon"></ejs-button>
```

### Toggle Button

```cshtml
<ejs-button id="toggleBtn" isToggle="true" cssClass="e-flat" content="Toggle State"></ejs-button>
```

---

## CSS Classes for Styling

| Class | Purpose |
|-------|---------|
| `e-primary` | Primary action styling |
| `e-success` | Success/positive action |
| `e-info` | Informational action |
| `e-warning` | Warning action |
| `e-danger` | Danger/destructive action |
| `e-link` | Link appearance |
| `e-flat` | Flat (no background) button |
| `e-outline` | Outline button with border |
| `e-small` | Small size button |
| `e-round` | Round/circular button |
| `e-active` | Active/toggled state (applied automatically) |
| `e-disabled` | Disabled state (applied automatically) |

---

## Complete Example

**View (`~/Pages/Index.cshtml`):**
```cshtml
@{
    ViewData["Title"] = "Button Examples";
}

<div class="button-examples">
    <!-- Primary Actions -->
    <section class="actions">
        <h3>Primary Actions</h3>
        <ejs-button id="saveBtn" cssClass="e-primary" type="submit" content="Save"></ejs-button>
        <ejs-button id="cancelBtn" cssClass="e-outline" content="Cancel"></ejs-button>
    </section>

    <!-- Danger Actions -->
    <section class="actions">
        <h3>Danger Actions</h3>
        <ejs-button id="deleteBtn" cssClass="e-danger" content="Delete"></ejs-button>
        <ejs-button id="resetBtn" type="reset" content="Reset"></ejs-button>
    </section>

    <!-- Icon Buttons -->
    <section class="actions">
        <h3>Icon Buttons</h3>
        <ejs-button id="addBtn" cssClass="e-small" iconCss="e-icons e-plus-icon"></ejs-button>
        <ejs-button id="editBtn" cssClass="e-small" iconCss="e-icons e-edit-icon" content="Edit"></ejs-button>
        <ejs-button id="searchBtn" cssClass="e-small e-primary" iconCss="e-icons e-search-icon"></ejs-button>
    </section>

    <!-- Disabled -->
    <section class="actions">
        <h3>Disabled Button</h3>
        <ejs-button id="disabledBtn" disabled="true" content="Cannot Click"></ejs-button>
    </section>

    <!-- Custom Styling -->
    <section class="actions">
        <h3>Custom Styled</h3>
        <ejs-button id="customBtn" cssClass="custom-style" content="Custom"></ejs-button>
    </section>
</div>

<style>
    .button-examples section {
        margin: 20px 0;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .button-examples h3 {
        margin-top: 0;
    }

    .button-examples .e-btn {
        margin: 5px;
    }

    .custom-style {
        background-color: #ff6b6b !important;
        border-color: #ff6b6b !important;
    }

    .custom-style:hover {
        background-color: #ff5252 !important;
    }
</style>
```

---

## See Also

- [Button Getting Started](button-getting-started.md)
- [Button Types and Styles](button-types-and-styles.md)
- [Button How-To Patterns](button-how-to.md)
- [Button Accessibility](button-accessibility.md)
