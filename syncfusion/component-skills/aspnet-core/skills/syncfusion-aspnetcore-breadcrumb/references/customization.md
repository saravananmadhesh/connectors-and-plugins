# Advanced Customization and Configuration

## Table of Contents
- [CSS Class Application](#css-class-application)
- [RTL Support](#rtl-support)
- [Disabled State](#disabled-state)
- [Component State Persistence](#component-state-persistence)
- [beforeItemRender Event](#beforeitemrender-event)
- [Customization Patterns](#customization-patterns)
- [Advanced Configuration](#advanced-configuration)

## CSS Class Application

The `cssClass` property applies one or more CSS classes to the breadcrumb component container, enabling custom styling and layout control.

### cssClass Property

```cshtml
<ejs-breadcrumb cssClass="custom-breadcrumb highlight-items">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products" url="~/products"></e-breadcrumb-item>
        <e-breadcrumb-item text="Details"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

### Single Class Application

```cshtml
<style>
    .custom-breadcrumb {
        padding: 16px;
        background-color: #f9f9f9;
        border-radius: 6px;
        border: 1px solid #e0e0e0;
    }

    .custom-breadcrumb .e-breadcrumb-item {
        font-weight: 500;
    }
</style>

<ejs-breadcrumb cssClass="custom-breadcrumb">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Category" url="~/category"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

### Multiple Classes

Separate multiple classes with spaces:

```cshtml
<ejs-breadcrumb cssClass="elevated-breadcrumb styled-separators large-text">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products" url="~/products"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

<style>
    .elevated-breadcrumb {
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        padding: 12px 16px;
    }

    .styled-separators .e-breadcrumb-separator {
        color: #0066cc;
        font-weight: bold;
    }

    .large-text .e-breadcrumb-item {
        font-size: 16px;
        line-height: 1.6;
    }
</style>
```

### Theme-Based Styling

Use CSS classes to apply theme-specific styling:

```cshtml
<!-- Light theme -->
<ejs-breadcrumb cssClass="light-theme">
    <!-- Items -->
</ejs-breadcrumb>

<!-- Dark theme -->
<ejs-breadcrumb cssClass="dark-theme">
    <!-- Items -->
</ejs-breadcrumb>

<style>
    .light-theme {
        background: white;
        color: #333;
    }

    .light-theme .e-breadcrumb-item {
        color: #0066cc;
    }

    .dark-theme {
        background: #1e1e1e;
        color: #fff;
    }

    .dark-theme .e-breadcrumb-item {
        color: #4da6ff;
    }
</style>
```

## RTL Support

Right-to-Left (RTL) rendering displays breadcrumbs and all content in right-to-left direction, supporting languages like Arabic, Hebrew, and Farsi.

### enableRtl Property

```cshtml
<!-- Enable RTL rendering -->
<ejs-breadcrumb enableRtl="true">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="الرئيسية" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="المنتجات" url="~/products"></e-breadcrumb-item>
        <e-breadcrumb-item text="التفاصيل"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

### RTL Display Changes

With `enableRtl="true"`:
- Text direction reverses (right-to-left)
- Separators appear on opposite side
- Icons align accordingly
- Layout mirrors horizontally

### Dynamic RTL Based on Culture

```csharp
// In PageModel
public bool UseRtl { get; set; }

public void OnGet()
{
    // Detect culture and set RTL accordingly
    var culture = CultureInfo.CurrentCulture.Name;
    UseRtl = culture switch
    {
        "ar-AE" => true,  // Arabic
        "ar-SA" => true,  // Arabic (Saudi Arabia)
        "he-IL" => true,  // Hebrew
        "fa-IR" => true,  // Farsi
        _ => false
    };
}
```

```cshtml
<!-- Use dynamic RTL -->
<ejs-breadcrumb enableRtl="@Model.UseRtl">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="@ViewBag.Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="@ViewBag.Products" url="~/products"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

### RTL CSS Adjustments

Some CSS properties might need RTL adjustments:

```css
.e-breadcrumb {
    direction: rtl;
    text-align: right;
}

.e-breadcrumb .e-breadcrumb-item {
    margin-left: auto;
    margin-right: 8px;
}
```

## Disabled State

Disable the entire breadcrumb component using the `disabled` property, making it non-interactive.

### disabled Property

```cshtml
<!-- Disabled breadcrumb -->
<ejs-breadcrumb disabled="true">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products" url="~/products"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Effects of disabled="true":**
- All items appear grayed out
- No items are clickable
- No events are triggered
- Navigation is prevented

### CSS for Disabled State

```css
.e-breadcrumb.e-disabled {
    opacity: 0.6;
    pointer-events: none;
    color: #999;
}

.e-breadcrumb.e-disabled .e-breadcrumb-item {
    color: #bbb;
    cursor: not-allowed;
}
```

### Dynamic Disable Based on Condition

```cshtml
@{
    bool canNavigate = User.IsInRole("Admin");
}

<ejs-breadcrumb disabled="@(!canNavigate)">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Admin" url="~/admin"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

### Individual Item Disable

Disable specific items even when component is enabled:

```cshtml
<ejs-breadcrumb>
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Public" url="~/public"></e-breadcrumb-item>
        <e-breadcrumb-item text="Restricted" url="~/restricted" disabled="true"></e-breadcrumb-item>
        <e-breadcrumb-item text="Open" url="~/open"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

## Component State Persistence

The `enablePersistence` property saves the component's state to browser storage, allowing the state to persist across page reloads.

### enablePersistence Property

```cshtml
<ejs-breadcrumb enablePersistence="true">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Dashboard" url="~/dashboard"></e-breadcrumb-item>
        <e-breadcrumb-item text="Reports" url="~/reports"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

### How Persistence Works

With `enablePersistence="true"`:
1. Component state is saved to browser localStorage
2. On page reload, previous state is restored
3. User navigation history is maintained
4. State survives across browser sessions

### Persistence Storage Location

State is stored in browser localStorage with a component-specific key. Example:
```
localStorage key: ej2_breadcrumb_state
```

### When to Use Persistence

**Enable (true) when:**
- Breadcrumbs show user navigation history
- Users frequently reload pages
- You want to remember user's last location
- Multi-page forms where navigation is important

**Disable (false, default) when:**
- Breadcrumbs are static indicators
- State should reset on page reload
- Navigation shouldn't be remembered
- Standard read-only breadcrumbs

### Handling Persisted State

```cshtml
@functions {
    public void OnGet()
    {
        // Check if persisted state exists and adjust accordingly
        // This happens automatically with enablePersistence="true"
    }
}
```

## beforeItemRender Event

The `beforeItemRender` event fires before each breadcrumb item is rendered, allowing advanced customization and conditional logic.

### Event Signature

```cshtml
<ejs-breadcrumb beforeItemRender="OnBeforeItemRender">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products" url="~/products"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

@functions {
    public void OnBeforeItemRender(BreadcrumbBeforeItemRenderEventArgs args)
    {
        // Customize item before rendering
        // args.Item - The breadcrumb item
        // args.Element - The HTML element
        // args.Cancel - Set true to prevent rendering
        // args.Name - Event name
    }
}
```

### Advanced Customization Example

```cshtml
<ejs-breadcrumb beforeItemRender="CustomizeAllItems">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Dashboard" url="~/dashboard"></e-breadcrumb-item>
        <e-breadcrumb-item text="Analytics" url="~/analytics"></e-breadcrumb-item>
        <e-breadcrumb-item text="Reports" url="~/reports"></e-breadcrumb-item>
        <e-breadcrumb-item text="Export"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

@functions {
    public void CustomizeAllItems(BreadcrumbBeforeItemRenderEventArgs args)
    {
        // Add icons based on item text
        switch (args.Item.Text)
        {
            case "Dashboard":
                args.Item.IconCss = "e-icons e-dashboard";
                break;
            case "Analytics":
                args.Item.IconCss = "e-icons e-chart";
                break;
            case "Reports":
                args.Item.IconCss = "e-icons e-document";
                break;
        }

        // Add CSS classes for styling
        if (args.Item.Text == "Export")
        {
            args.Element?.ClassList.Add("action-item");
        }

        // Disable based on permissions
        if (args.Item.Text == "Reports" && !User.IsInRole("Analyst"))
        {
            args.Item.Disabled = true;
        }
    }
}

<style>
    .action-item {
        font-weight: bold;
        color: #0066cc;
    }
</style>
```

## Customization Patterns

### Pattern 1: Breadcrumb with Active Indicator

Highlight the active breadcrumb item:

```cshtml
<ejs-breadcrumb beforeItemRender="HighlightActive">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/" id="home"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products" url="~/products" id="products"></e-breadcrumb-item>
        <e-breadcrumb-item text="Electronics" id="active"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

@functions {
    public void HighlightActive(BreadcrumbBeforeItemRenderEventArgs args)
    {
        if (args.Item.Id == "active")
        {
            args.Element?.ClassList.Add("active-breadcrumb");
        }
    }
}

<style>
    .active-breadcrumb {
        font-weight: bold;
        color: #0066cc;
        background: #f0f7ff;
        padding: 4px 8px;
        border-radius: 4px;
    }
</style>
```

### Pattern 2: Role-Based Customization

Customize breadcrumbs based on user role:

```cshtml
<ejs-breadcrumb beforeItemRender="ApplyRoleBasedCustomization">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Dashboard" url="~/dashboard"></e-breadcrumb-item>
        <e-breadcrumb-item text="Admin" url="~/admin"></e-breadcrumb-item>
        <e-breadcrumb-item text="Restricted" url="~/restricted"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

@functions {
    public void ApplyRoleBasedCustomization(BreadcrumbBeforeItemRenderEventArgs args)
    {
        if (args.Item.Text == "Admin" && !User.IsInRole("Admin"))
        {
            args.Item.Disabled = true;
            args.Item.IconCss = "e-icons e-lock";
        }

        if (args.Item.Text == "Restricted")
        {
            if (!User.IsInRole("Editor"))
            {
                args.Cancel = true; // Don't render
            }
        }
    }
}
```

### Pattern 3: Dynamic URL Parameter Injection

Add query parameters to URLs dynamically:

```cshtml
@{
    var filterId = ViewBag.FilterId;
}

<ejs-breadcrumb beforeItemRender="InjectParameters">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Products" url="~/products"></e-breadcrumb-item>
        <e-breadcrumb-item text="Categories" url="~/categories"></e-breadcrumb-item>
        <e-breadcrumb-item text="Current"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

@functions {
    public void InjectParameters(BreadcrumbBeforeItemRenderEventArgs args)
    {
        if (!string.IsNullOrEmpty(args.Item.Url) && args.Item.Text != "Current")
        {
            args.Item.Url += $"?filterId=@ViewBag.FilterId";
        }
    }
}
```

## Advanced Configuration

### Complete Customized Breadcrumb Example

```cshtml
<ejs-breadcrumb 
    cssClass="advanced-breadcrumb"
    enableRtl="false"
    disabled="false"
    enablePersistence="true"
    enableNavigation="true"
    overflowMode="Collapsed"
    maxItems="4"
    beforeItemRender="AdvancedCustomization">
    <e-breadcrumb-items>
        <e-breadcrumb-item 
            text="Company" 
            url="~/"
            iconCss="e-icons e-home"
            id="company">
        </e-breadcrumb-item>
        <e-breadcrumb-item 
            text="Departments" 
            url="~/departments"
            iconCss="e-icons e-people"
            id="departments">
        </e-breadcrumb-item>
        <e-breadcrumb-item 
            text="Engineering" 
            url="~/departments/engineering"
            iconCss="e-icons e-settings"
            id="engineering">
        </e-breadcrumb-item>
        <e-breadcrumb-item 
            text="Team" 
            url="~/departments/engineering/team"
            iconCss="e-icons e-group"
            id="team">
        </e-breadcrumb-item>
        <e-breadcrumb-item 
            text="Current Projects" 
            iconCss="e-icons e-list"
            id="current">
        </e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

<style>
    .advanced-breadcrumb {
        padding: 16px;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .advanced-breadcrumb .e-breadcrumb-item {
        font-weight: 500;
        color: #2c3e50;
        transition: color 0.3s ease;
    }

    .advanced-breadcrumb .e-breadcrumb-item:hover {
        color: #0066cc;
        text-decoration: underline;
    }

    .advanced-breadcrumb .e-icons {
        margin-right: 6px;
        font-size: 14px;
    }
</style>

@functions {
    public void AdvancedCustomization(BreadcrumbBeforeItemRenderEventArgs args)
    {
        // Add accessibility attributes
        if (args.Element != null)
        {
            args.Element.SetAttribute("role", "link");
            args.Element.SetAttribute("aria-label", $"Navigate to {args.Item.Text}");
        }

        // Highlight current section
        if (args.Item.Id == "current")
        {
            args.Element?.ClassList.Add("current-section");
        }

        // Add tooltips
        if (args.Element != null && !string.IsNullOrEmpty(args.Item.Text))
        {
            args.Element.SetAttribute("title", $"Go to {args.Item.Text}");
        }
    }
}

<style>
    .current-section {
        font-weight: 700;
        color: #0066cc;
        border-bottom: 3px solid #0066cc;
        padding-bottom: 2px;
    }
</style>
```

---

## Summary

Advanced customization enables:
- **CSS Classes:** Theme and style control
- **RTL Support:** Multi-language support
- **Disabled State:** Conditional interactivity
- **State Persistence:** Maintain navigation history
- **beforeItemRender:** Item-level customization

Combine these features to create fully customized, accessible breadcrumb experiences.
