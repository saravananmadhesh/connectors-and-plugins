# Styling, Layout, and Responsive Design

## Table of Contents
- [CSS Classes and Styling](#css-classes-and-styling)
- [Predefined Header Styles](#predefined-header-styles)
- [Height Adjustment Modes](#height-adjustment-modes)
- [Header Positioning and Orientation](#header-positioning-and-orientation)
- [Icon Positioning](#icon-positioning)
- [Overflow Modes](#overflow-modes)
- [Responsive Design](#responsive-design)
- [Custom CSS Styling](#custom-css-styling)
- [Theme Integration](#theme-integration)

## CSS Classes and Styling

The Tab component applies CSS classes that can be extended with custom styles.

### Tab Element Structure

```html
<div id="ej2Tab" class="e-tab">
    <div class="e-tab-header">
        <div class="e-tab-header-item">Header 1</div>
        <div class="e-tab-header-item e-active">Header 2 (Active)</div>
    </div>
    <div class="e-content">
        <div class="e-item">Content 1</div>
        <div class="e-item e-active">Content 2 (Active)</div>
    </div>
</div>
```

### Root Element Classes

```csharp
// Apply CSS classes to Tab root
public class Tab
{
    public string CssClass { get; set; }  // Custom CSS for styling
}
```

### Tab Root Styling

```cshtml
@using Syncfusion.EJ2.Navigations;

<ejs-tab id="ej2Tab" cssClass="custom-tab-styling">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 1" })" content="Content 1"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>

<style>
    .custom-tab-styling {
        background-color: #f5f5f5;
        border: 1px solid #ddd;
    }
    
    .custom-tab-styling .e-tab-header {
        background-color: #e8e8e8;
    }
</style>
```

## Predefined Header Styles

The Tab component provides predefined style classes for headers.

### Available Style Classes

| Class | Effect | Use Case |
|-------|--------|----------|
| `e-fill` | Solid fill background on selected tab, transparent on others | Modern look |
| `e-background` | Solid background with highlighted border on selected tab | Default style |
| `e-background e-accent` | Solid background with accent color border on selection | Emphasis |

### Applying Header Styles

```cshtml
@using Syncfusion.EJ2.Navigations;

<!-- e-fill style -->
<ejs-tab id="ej2Tab" cssClass="e-fill">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Home" })" content="Home content"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "About" })" content="About content"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>

<!-- e-background style -->
<ejs-tab id="ej2Tab2" cssClass="e-background">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Products" })" content="Products"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Contact" })" content="Contact"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>

<!-- e-background with e-accent -->
<ejs-tab id="ej2Tab3" cssClass="e-background e-accent">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Settings" })" content="Settings"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Help" })" content="Help"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>
```

## Height Adjustment Modes

Control how tab content panels adjust height using `heightAdjustMode`.

### Height Adjustment Options

| Mode | Behavior | Use Case |
|------|----------|----------|
| **None** | Height set by `height` property | Fixed height containers |
| **Auto** | Tallest panel height applied to all | Variable content length |
| **Content** | Each panel uses its own content height | Dynamic layouts |
| **Fill** | Content fills available parent space | Full-screen layouts |

### None Mode (Fixed Height)

```cshtml
<ejs-tab id="ej2Tab" heightAdjustMode="@HeightStyles.None" height="300px">
    <!-- All panels are exactly 300px -->
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Short" })" content="Brief content"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Long" })" content="@Html.Raw(new string('Long content ', 50))"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>
```

### Auto Mode (Tallest Panel)

```cshtml
<ejs-tab id="ej2Tab" heightAdjustMode="@HeightStyles.Auto">
    <!-- All panels adjust to height of tallest content -->
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 1" })" content="Content"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 2" })" content="@Html.Raw(new string('More ', 100))"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>
```

### Content Mode (Dynamic Height)

```cshtml
<ejs-tab id="ej2Tab" heightAdjustMode="@HeightStyles.Content">
    <!-- Each panel uses only its own content height, no padding -->
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Compact" })" content="<p>Short</p>"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Verbose" })" content="<p>Very long content here...</p>"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>
```

### Fill Mode (Parent-Relative)

```cshtml
<div style="height: 500px; border: 1px solid #ddd;">
    <ejs-tab id="ej2Tab" heightAdjustMode="@HeightStyles.Fill">
        <!-- Tab fills entire parent container -->
        <e-tab-tabitems>
            <e-tab-tabitem header="@(new TabHeader { Text = "Tab 1" })" content="Fills 500px"></e-tab-tabitem>
            <e-tab-tabitem header="@(new TabHeader { Text = "Tab 2" })" content="Fills 500px"></e-tab-tabitem>
        </e-tab-tabitems>
    </ejs-tab>
</div>
```

## Header Positioning and Orientation

Control header position relative to content using `headerPlacement`.

### Header Positioning Options

| Position | Location | Use Case |
|----------|----------|----------|
| **Top** | Above content (default) | Standard layout |
| **Bottom** | Below content | Uncommon |
| **Left** | Vertical on left side | Sidebar navigation |
| **Right** | Vertical on right side | Less common |

### Top Position (Default)

```cshtml
<ejs-tab id="ej2Tab" headerPlacement="@HeaderPosition.Top">
    <!-- Headers appear above content, stack horizontally -->
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 1" })" content="Content 1"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 2" })" content="Content 2"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>
```

### Left Position (Vertical)

```cshtml
<ejs-tab id="ej2Tab" headerPlacement="@HeaderPosition.Left">
    <!-- Headers appear on left side, stack vertically -->
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Profile" })" content="User profile"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Settings" })" content="User settings"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Security" })" content="Security options"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>

<style>
    #ej2Tab {
        display: flex;
        width: 100%;
    }
</style>
```

### Right Position

```cshtml
<ejs-tab id="ej2Tab" headerPlacement="@HeaderPosition.Right">
    <!-- Headers on right side, content on left -->
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Menu 1" })" content="Content 1"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Menu 2" })" content="Content 2"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>
```

### Bottom Position

```cshtml
<ejs-tab id="ej2Tab" headerPlacement="@HeaderPosition.Bottom">
    <!-- Headers appear below content -->
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 1" })" content="Content 1"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 2" })" content="Content 2"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>
```

## Icon Positioning

Control icon position within headers using icon positioning properties.

### Icon Position Options

| Position | Location | Use Case |
|----------|----------|----------|
| **Left** | Left of text (default) | Standard |
| **Right** | Right of text | Reversed layout |
| **Top** | Above text | Vertical stacking |
| **Bottom** | Below text | Less common |

### Define Icons in Headers

```cshtml
@using Syncfusion.EJ2.Navigations;

<ejs-tab id="ej2Tab">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { 
                                    Text = "Home", 
                                    IconCss = "e-icons e-home" 
                                })" 
                        content="Home content">
        </e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { 
                                    Text = "Profile", 
                                    IconCss = "e-icons e-person" 
                                })" 
                        content="Profile content">
        </e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>

<style>
    .e-icons {
        font-family: 'e-icons';
    }
</style>
```

### Icon Position Example (Top)

Use custom CSS to position icons above text:

```cshtml
<ejs-tab id="ej2Tab" cssClass="icon-top">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { 
                                    Text = "Home", 
                                    IconCss = "e-icons e-home" 
                                })" 
                        content="Home">
        </e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>

<style>
    .icon-top .e-tab-header .e-tab-header-item {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .icon-top .e-icons {
        margin-bottom: 5px;
    }
</style>
```

## Overflow Modes

Control header display when tabs exceed container width using `overflowMode`.

### Overflow Options

| Mode | Behavior | Use Case |
|------|----------|----------|
| **Scrollable** | Horizontal scroll with navigation arrows | Many tabs in narrow space |
| **Popup** | Hidden tabs in dropdown menu | Space-limited layouts |

### Scrollable Mode

```cshtml
<ejs-tab id="ej2Tab" overflowMode="OverflowMode.Scrollable">
    <!-- Many tabs with left/right scroll arrows -->
    <e-tab-tabitems>
        @for (int i = 1; i <= 20; i++)
        {
            <e-tab-tabitem header="@(new TabHeader { Text = $"Tab {i}" })" 
                            content="@($"Content {i}")">
            </e-tab-tabitem>
        }
    </e-tab-tabitems>
</ejs-tab>
```

### Popup Mode

```cshtml
<ejs-tab id="ej2Tab" overflowMode="OverflowMode.Popup">
    <!-- Visible tabs with dropdown for hidden ones -->
    <e-tab-tabitems>
        @for (int i = 1; i <= 20; i++)
        {
            <e-tab-tabitem header="@(new TabHeader { Text = $"Tab {i}" })" 
                            content="@($"Content {i}")">
            </e-tab-tabitem>
        }
    </e-tab-tabitems>
</ejs-tab>
```

### Scroll Step Configuration

Control scroll distance per click:

```cshtml
<ejs-tab id="ej2Tab" 
         overflowMode="OverflowMode.Scrollable" 
         scrollStep="200">
    <!-- Each scroll arrow click moves 200px -->
</ejs-tab>
```

## Responsive Design

Make tabs responsive across different screen sizes.

### Mobile-Friendly Tab Layout

```cshtml
@using Syncfusion.EJ2.Navigations;

<ejs-tab id="ej2Tab" cssClass="responsive-tabs">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Mobile" })" content="Mobile content"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tablet" })" content="Tablet content"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Desktop" })" content="Desktop content"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>

<style>
    /* Desktop: Headers on top */
    @media (min-width: 768px) {
        .responsive-tabs {
            width: 100%;
        }
    }
    
    /* Mobile: Headers on left in vertical layout */
    @media (max-width: 767px) {
        #ej2Tab {
            display: flex;
            flex-direction: column;
        }
        
        .e-tab-header {
            order: 1;
            margin-bottom: 10px;
        }
        
        .e-content {
            order: 2;
        }
    }
</style>
```

### Responsive Mode (Automatic Adjustment)

```javascript
// Detect screen size and adjust Tab layout
function adjustTabLayout() {
    var tabObj = document.getElementById('ej2Tab').ej2_instances[0];
    var width = window.innerWidth;
    
    if (width < 768) {
        tabObj.headerPlacement = 'Left';  // Mobile: vertical headers
    } else {
        tabObj.headerPlacement = 'Top';   // Desktop: horizontal headers
    }
}

window.addEventListener('resize', adjustTabLayout);
adjustTabLayout();  // Initial call
```

## Custom CSS Styling

Create custom styles by targeting Tab element classes.

### Custom Header Styling

```cshtml
<ejs-tab id="ej2Tab" cssClass="custom-header-style">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 1" })" content="Content 1"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 2" })" content="Content 2"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>

<style>
    /* Custom header styling */
    .custom-header-style .e-tab-header-item {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 5px 5px 0 0;
        padding: 12px 20px;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .custom-header-style .e-tab-header-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    
    .custom-header-style .e-tab-header-item.e-active {
        background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    
    /* Custom content styling */
    .custom-header-style .e-content .e-item {
        padding: 30px;
        background: #f8f9fa;
        border: 1px solid #ddd;
    }
</style>
```

### Animation Transitions

```cshtml
<ejs-tab id="ej2Tab">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 1" })" content="Content 1"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 2" })" content="Content 2"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>

<style>
    /* Smooth content transitions */
    .e-content .e-item {
        opacity: 0;
        transform: translateX(20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .e-content .e-item.e-active {
        opacity: 1;
        transform: translateX(0);
    }
</style>
```

## Theme Integration

Apply Syncfusion themes to Tab component.

### Available Themes (CDN Links)

```cshtml
<!-- Fluent (Default) -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />

<!-- Bootstrap 5 -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/bootstrap5.css" />

<!-- Material -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/material.css" />

<!-- Tailwind -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/tailwind.css" />
```

### Custom Theme Variables

```css
/* Override Syncfusion theme colors */
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --success-color: #28a745;
    --warning-color: #ffc107;
    --danger-color: #dc3545;
}

.e-tab-header-item {
    color: var(--primary-color);
}

.e-tab-header-item.e-active {
    border-bottom-color: var(--primary-color);
}
```

---

**Next Steps:** Explore advanced-features.md for state persistence, animations, and more, or api-reference.md for complete API documentation.
