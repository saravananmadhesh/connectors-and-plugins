# Tab Content Rendering and Management

## Table of Contents
- [Content Rendering Overview](#content-rendering-overview)
- [Header Structure and Properties](#header-structure-and-properties)
- [Basic Content Rendering](#basic-content-rendering)
- [HTML Content](#html-content)
- [Partial View Content](#partial-view-content)
- [External POST Content](#external-post-content)
- [Content Templates](#content-templates)
- [Dynamic Content Population](#dynamic-content-population)
- [Load-on-Demand Content Modes](#load-on-demand-content-modes)

## Content Rendering Overview

The Tab component provides multiple methods to render tab headers and content:

| Rendering Method | Use Case | Performance | Best For |
|------------------|----------|-------------|----------|
| **Inline Content** | Simple static text/HTML | Fast | Getting started, simple tabs |
| **HTML Elements** | Existing DOM structure | Very Fast | Progressive enhancement |
| **Templates** | Complex layouts, repeated content | Moderate | Dynamic content structures |
| **Partial Views** | Server-rendered views | Moderate | ASP.NET Core views |
| **External POST** | Remote content loading | Slower | Large content, code reuse |
| **Data Binding** | JSON collection | Fast | Programmatic generation |

## Header Structure and Properties

Tab headers are defined using the `TabHeader` class with customization options.

### Header Properties

```csharp
public class TabHeader
{
    public string Text { get; set; }              // Display text in header
    public string IconCss { get; set; }           // CSS class for icon
    public string IconPosition { get; set; }      // Icon position: Left, Right, Top, Bottom
    public string CssClass { get; set; }          // Custom CSS class for styling
    public bool ShowCloseButton { get; set; }     // Show 'x' to close tab item
}
```

### Header with Icon Example

```cshtml
@using Syncfusion.EJ2.Navigations;

<ejs-tab id="ej2Tab">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { 
                                    Text = "Home", 
                                    IconCss = "e-icons e-home" 
                                })" 
                        content="Welcome to Home">
        </e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { 
                                    Text = "Profile", 
                                    IconCss = "e-icons e-person" 
                                })" 
                        content="User Profile">
        </e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>

<style>
    .e-icons {
        font-family: 'e-icons';
    }
</style>
```

### Header Icon Positioning

Control icon placement relative to header text using the `IconPosition` property within the `TabHeader`:

```cshtml
@using Syncfusion.EJ2.Navigations;

<ejs-tab id="ej2Tab">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { 
                                    Text = "Home", 
                                    IconCss = "e-icons e-home",
                                    IconPosition = "Right"
                                })" 
                        content="Welcome to Home">
        </e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { 
                                    Text = "Profile", 
                                    IconCss = "e-icons e-person",
                                    IconPosition = "Top"
                                })" 
                        content="User Profile">
        </e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>
```

Supported positions:
- `Left` - Default position, icon left of text
- `Right` - Icon right of text
- `Top` - Icon above text
- `Bottom` - Icon below text

## Basic Content Rendering

### Inline String Content

Simplest approach using string properties:

```cshtml
@using Syncfusion.EJ2.Navigations;

<ejs-tab id="ej2Tab">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "HTML" })" 
                        content="HyperText Markup Language (HTML) is the fundamental building block of the Web.">
        </e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "CSS" })" 
                        content="Cascading Style Sheets (CSS) is used to format HTML elements and control layout.">
        </e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "JavaScript" })" 
                        content="JavaScript enables interactive web pages and is an essential part of web development.">
        </e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>
```

### Multi-line Content in Controller

```csharp
using Syncfusion.EJ2.Navigations;
using Microsoft.AspNetCore.Mvc.RazorPages;

public class IndexModel : PageModel
{
    public List<TabItem> TabItems { get; set; }
    
    public void OnGet()
    {
        var htmlContent = @"<p>HyperText Markup Language (HTML) is the fundamental building block of the Web. " +
                         "It is used to structure and present content on web pages.</p>";
        
        TabItems = new List<TabItem>
        {
            new TabItem
            {
                Header = new TabHeader { Text = "About HTML" },
                Content = htmlContent
            }
        };
    }
}
```

## HTML Content

Render HTML markup within tab content panels.

### Inline HTML in TabItem

```cshtml
@using Syncfusion.EJ2.Navigations;

<ejs-tab id="ej2Tab">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Features" })" 
                        content="@Html.Raw("<ul><li>Feature 1</li><li>Feature 2</li><li>Feature 3</li></ul>")">
        </e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>
```

### HTML Content from Controller

```csharp
public void OnGet()
{
    var featuresList = @"
        <div class='feature-list'>
            <h4>Key Features</h4>
            <ul>
                <li><strong>Responsive Design</strong> - Works on all screen sizes</li>
                <li><strong>Drag and Drop</strong> - Reorder tabs easily</li>
                <li><strong>Persistence</strong> - Saves state across sessions</li>
            </ul>
        </div>";
    
    TabItems = new List<TabItem>
    {
        new TabItem
        {
            Header = new TabHeader { Text = "Features" },
            Content = featuresList
        }
    };
}
```

### HTML Sanitization

By default, the Tab component sanitizes HTML to prevent XSS attacks:

```cshtml
<ejs-tab id="ej2Tab" enableHtmlSanitizer="true">
    <!-- Unsafe HTML is cleaned before rendering -->
</ejs-tab>
```

To disable sanitization (use only with trusted content):

```cshtml
<ejs-tab id="ej2Tab" enableHtmlSanitizer="false">
    <!-- Warning: Only disable for trusted internal content -->
</ejs-tab>
```

## Partial View Content

Render ASP.NET Core Razor Partial Views within tabs.

### Define Partial View

Create `_UserProfile.cshtml`:

```cshtml
@model User

<div class="profile-card">
    <h3>@Model.Name</h3>
    <p><strong>Email:</strong> @Model.Email</p>
    <p><strong>Department:</strong> @Model.Department</p>
    <p><strong>Joined:</strong> @Model.JoinDate.ToShortDateString()</p>
</div>

<style>
    .profile-card {
        border: 1px solid #ddd;
        padding: 15px;
        border-radius: 5px;
    }
</style>
```

### Load Partial in Tab

```cshtml
@using Syncfusion.EJ2.Navigations;
@model IndexModel

<ejs-tab id="ej2Tab">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Profile" })" 
                        content="@Html.Raw(await Html.PartialAsync("_UserProfile", Model.CurrentUser))">
        </e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Settings" })" 
                        content="@Html.Raw(await Html.PartialAsync("_UserSettings", Model.SettingsData))">
        </e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>
```

### Controller Setup

```csharp
public class IndexModel : PageModel
{
    public List<TabItem> TabItems { get; set; }
    public User CurrentUser { get; set; }
    public UserSettings SettingsData { get; set; }
    
    public async Task OnGetAsync()
    {
        CurrentUser = await _userService.GetCurrentUserAsync();
        SettingsData = await _settingsService.GetUserSettingsAsync();
    }
}
```

## External POST Content

Load content from server endpoints via HTTP POST requests.

### Define Content Source URL

The `contentLoad` event can trigger external loading:

```cshtml
@using Syncfusion.EJ2.Navigations;

<ejs-tab id="ej2Tab">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "External Content" })" 
                        content="">
        </e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>

<script>
    var tabObj = document.getElementById('ej2Tab').ej2_instances[0];
    
    tabObj.contentLoad = function(args) {
        // Load content from server endpoint
        fetch('/api/tab/content?id=' + args.position)
            .then(response => response.text())
            .then(data => {
                args.element.innerHTML = data;
            });
    };
</script>
```

### Server Endpoint

```csharp
[ApiController]
[Route("api/[controller]")]
public class TabController : ControllerBase
{
    [HttpGet("content")]
    public IActionResult GetContent(int id)
    {
        var content = _contentService.GetContentById(id);
        return Ok(content);
    }
}
```

## Content Templates

Use Razor templates for complex, reusable content structures.

### Template Helper Method

Create a helper in your page model:

```cshtml
@{
    Func<dynamic, IHtmlContent> productTemplate = @<text>
        <div class="product-item">
            <h4>@item.ProductName</h4>
            <p>Price: $@item.Price</p>
            <p>Stock: @item.Stock units available</p>
        </div>
    </text>;
}
```

### Use in TabItem

```cshtml
@using Syncfusion.EJ2.Navigations;

<ejs-tab id="ej2Tab">
    <e-tab-tabitems>
        @foreach (var product in Model.Products)
        {
            <e-tab-tabitem header="@(new TabHeader { Text = product.ProductName })" 
                            content="@Html.Raw(productTemplate(product).ToString())">
            </e-tab-tabitem>
        }
    </e-tab-tabitems>
</ejs-tab>
```

### Controller Data

```csharp
public List<Product> Products { get; set; }

public void OnGet()
{
    Products = new List<Product>
    {
        new Product { ProductName = "Laptop", Price = 999.99m, Stock = 15 },
        new Product { ProductName = "Phone", Price = 699.99m, Stock = 30 },
        new Product { ProductName = "Tablet", Price = 499.99m, Stock = 20 }
    };
}
```

## Dynamic Content Population

Update tab content programmatically after initialization.

### Modify Content via Events

```cshtml
@using Syncfusion.EJ2.Navigations;

<ejs-tab id="ej2Tab" selected="@(new EventCallback(async () => await OnTabSelected()))">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Data" })" content=""></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>

<script>
    var tabObj = document.getElementById('ej2Tab').ej2_instances[0];
    
    tabObj.selected = function(args) {
        // Dynamically update content
        if (args.index === 0) {
            fetch('/api/data/fetch')
                .then(response => response.text())
                .then(data => {
                    args.element.innerHTML = data;
                });
        }
    };
</script>
```

### Add Tabs Dynamically

```cshtml
<button onclick="addNewTab()">Add Tab</button>

<script>
    function addNewTab() {
        var tabObj = document.getElementById('ej2Tab').ej2_instances[0];
        
        tabObj.addTab([
            {
                header: { text: 'New Tab' },
                content: 'Dynamic content here'
            }
        ]);
    }
</script>
```

## Load-on-Demand Content Modes

The `loadOn` property controls when content is loaded:

| Mode | Load Timing | Memory | Use Case |
|------|------------|--------|----------|
| **Init** | All tabs at startup | High | Few tabs with small content |
| **Demand** | First tab at startup, others on first select | Medium | Many tabs, moderate content |
| **Dynamic** | Only selected tab in DOM | Low | Many large tabs, performance critical |

### Demand Mode (Default)

```cshtml
<ejs-tab id="ej2Tab" loadOn="ContentLoad.Demand">
    <!-- Content loaded first time tab is selected, then cached -->
</ejs-tab>
```

### Dynamic Mode

```cshtml
<ejs-tab id="ej2Tab" loadOn="ContentLoad.Dynamic">
    <!-- Only active tab content in DOM, others loaded/unloaded on demand -->
</ejs-tab>
```

### Init Mode

```cshtml
<ejs-tab id="ej2Tab" loadOn="ContentLoad.Init">
    <!-- All content loaded at initialization -->
</ejs-tab>
```

---

**Performance Recommendation:** Use `Demand` mode for optimal balance between responsiveness and resource efficiency in most scenarios.

**Next Steps:** Explore tab-interaction.md for user interaction features, or advanced-features.md for loading strategies.
