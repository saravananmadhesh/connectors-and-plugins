# Menu Items and Data Binding

## Table of Contents
- [MenuItem Structure](#menuitem-structure)
- [Single-Level Menu Items](#single-level-menu-items)
- [Multi-Level Nested Items](#multi-level-nested-items)
- [Separator Usage](#separator-usage)
- [Data Binding Patterns](#data-binding-patterns)
- [Dynamic Menu Updates](#dynamic-menu-updates)

## MenuItem Structure

Each menu item in ContextMenu is defined as a `MenuItemModel` with the following properties:

| Property | Type | Required | Purpose |
|----------|------|----------|---------|
| `text` | string | Yes | Display text for the menu item |
| `id` | string | No | Unique identifier for the item (useful for select event handling) |
| `iconCss` | string | No | CSS class for icon (e.g., "e-icons e-cut", Font Awesome classes) |
| `url` | string | No | Navigation URL for the menu item |
| `items` | MenuItemModel[] | No | Submenu items array for nested menus |
| `separator` | boolean | No | If true, renders a horizontal separator line (ignores other properties) |
| `htmlAttributes` | Record | No | Custom HTML attributes to apply to the menu item element |

**Key Rules:**
- When `separator: true` is set, ONLY the separator property should be present. Other properties like `text` or `iconCss` are ignored.
- The `items` array enables multi-level nesting without depth limits (typically 3-4 levels recommended)
- The `id` property is optional but recommended for menu item identification in events

## Single-Level Menu Items

Create a flat menu with no submenus:

**C# Data Binding:**
```csharp
public List<object> MenuItems { get; set; }

public void OnGet()
{
    MenuItems = new List<object>
    {
        new { text = "Cut", id = "cm_cut", iconCss = "e-icons e-cut" },
        new { text = "Copy", id = "cm_copy", iconCss = "e-icons e-copy" },
        new { text = "Paste", id = "cm_paste", iconCss = "e-icons e-paste" },
        new { text = "Delete", id = "cm_delete", iconCss = "e-icons e-delete" }
    };
}
```

**TagHelper in View:**
```html
<div id="target">Right-click here</div>
<ejs-contextmenu id="contextmenu" target="#target" items="Model.MenuItems"></ejs-contextmenu>
```

**Result:** A menu with four options appears on right-click. Each item has a unique ID and icon for identification in select event handling.

## Multi-Level Nested Items

Create hierarchical menus with submenus using the `items` property for nested arrays:

**C# Data Binding (3-Level Nesting):**
```csharp
public List<object> MenuItems { get; set; }

public void OnGet()
{
    MenuItems = new List<object>
    {
        new { 
            text = "Edit",
            id = "edit",
            items = new List<object>
            {
                new { text = "Cut", id = "edit_cut" },
                new { text = "Copy", id = "edit_copy" },
                new { text = "Paste", id = "edit_paste" }
            }
        },
        new { 
            text = "Format",
            id = "format",
            items = new List<object>
            {
                new { text = "Bold", id = "fmt_bold" },
                new { text = "Italic", id = "fmt_italic" },
                new { text = "Underline", id = "fmt_underline" },
                new { 
                    text = "Text Case",
                    id = "textcase",
                    items = new List<object>
                    {
                        new { text = "Uppercase", id = "case_upper" },
                        new { text = "Lowercase", id = "case_lower" },
                        new { text = "Capitalize", id = "case_capital" }
                    }
                }
            }
        },
        new { 
            text = "View",
            id = "view",
            items = new List<object>
            {
                new { text = "Zoom In", id = "view_zin" },
                new { text = "Zoom Out", id = "view_zout" },
                new { text = "Reset", id = "view_reset" }
            }
        }
    };
}
```

**TagHelper in View:**
```html
<div id="editor">Right-click to edit</div>
<ejs-contextmenu id="contextmenu" target="#editor" items="Model.MenuItems"></ejs-contextmenu>
```
```csharp
public List<object> MenuItems { get; set; }

public void OnGet()
{
    MenuItems = new List<object>
    {
        new 
        { 
            text = "Edit",
            items = new dynamic[]
            {
                new { text = "Cut", id = "edit_cut" },
                new { text = "Copy", id = "edit_copy" },
                new { text = "Paste", id = "edit_paste" }
            }
        },
        new 
        { 
            text = "Format",
            items = new dynamic[]
            {
                new { text = "Bold", id = "fmt_bold" },
                new { text = "Italic", id = "fmt_italic" },
                new { text = "Underline", id = "fmt_underline" },
                new 
                { 
                    text = "Text Case",
                    items = new dynamic[]
                    {
                        new { text = "Uppercase", id = "case_upper" },
                        new { text = "Lowercase", id = "case_lower" },
                        new { text = "Capitalize", id = "case_capital" }
                    }
                }
            }
        },
        new 
        { 
            text = "View",
            items = new dynamic[]
            {
                new { text = "Zoom In", id = "view_zin" },
                new { text = "Zoom Out", id = "view_zout" },
                new { text = "Reset", id = "view_reset" }
            }
        }
    };
}
```

**Behavior:**
- Hovering over parent items (Edit, Format, View) opens the submenu
- Clicking submenus opens nested items (e.g., "Text Case" opens additional options)
- Recommended nesting depth: 2-3 levels for optimal UX

## Separator Usage

Use separators to visually group related menu items:

**C# Data Binding:**
```csharp
MenuItems = new List<object>
{
    new { text = "New", id = "new_item" },
    new { text = "Open", id = "open_item" },
    new { separator = true },  // Horizontal line separator
    new { text = "Save", id = "save_item" },
    new { text = "Save As", id = "saveas_item" },
    new { separator = true },  // Another separator
    new { text = "Exit", id = "exit_item" }
};
```

**TagHelper in View:**
```html
<ejs-contextmenu id="contextmenu" target="#target" items="Model.MenuItems"></ejs-contextmenu>
```

**Separator Rules:**
- When `separator: true`, ONLY include the separator property (do not add text, id, or other properties)
- Separators are non-interactive and do not fire select events
- Multiple separators can appear in sequence
- Separators are rendered as horizontal lines with appropriate styling

**Result:** The menu displays with horizontal lines separating related command groups (File operations | Save operations | Exit).

## Data Binding Patterns

### Pattern 1: List of Objects (Recommended)
```csharp
public List<object> MenuItems { get; set; }

public void OnGet()
{
    MenuItems = new List<object>
    {
        new { text = "Option 1", id = "opt1" },
        new { text = "Option 2", id = "opt2" },
        new { text = "Option 3", id = "opt3" }
    };
}
```

**Advantages:**
- Simple, readable C# code
- Easy property access
- Supports nested items naturally

### Pattern 2: Dictionary Collection
```csharp
public List<Dictionary<string, object>> MenuItems { get; set; }

public void OnGet()
{
    MenuItems = new List<Dictionary<string, object>>
    {
        new Dictionary<string, object> 
        { 
            { "text", "Option 1" }, 
            { "id", "opt1" } 
        },
        new Dictionary<string, object> 
        { 
            { "text", "Option 2" }, 
            { "id", "opt2" } 
        }
    };
}
```

**Advantages:**
- Flexible key-value structure
- Dynamic property addition at runtime

### Pattern 3: Custom Model Class
```csharp
public class MenuItem
{
    public string Text { get; set; }
    public string Id { get; set; }
    public string IconCss { get; set; }
    public string Url { get; set; }
    public List<MenuItem> Items { get; set; }
    public bool Separator { get; set; }
}

public List<MenuItem> MenuItems { get; set; }

public void OnGet()
{
    MenuItems = new List<MenuItem>
    {
        new MenuItem { text = "Cut", id = "cut", iconCss = "e-icons e-cut" },
        new MenuItem { text = "Copy", id = "copy", iconCss = "e-icons e-copy" },
        new MenuItem { text = "Paste", id = "paste", iconCss = "e-icons e-paste" }
    };
}
```

**Advantages:**
- Strong typing with IntelliSense support
- Validation and business logic integration
- Performance optimization for large datasets

### Pattern 4: JavaScript Binding (for Complex Scenarios)

For advanced scenarios requiring runtime menu item updates without page reload:

**File: `~/Pages/Index.cshtml`**
```html
<ejs-contextmenu id="contextmenu" target="#target"></ejs-contextmenu>

<script>
// Initialize items via JavaScript after component creation
var contextmenuInstance = document.getElementById('contextmenu').ej2_instances[0];
contextmenuInstance.items = [
    { text: "Cut", id: "cut", iconCss: "e-icons e-cut" },
    { text: "Copy", id: "copy", iconCss: "e-icons e-copy" },
    { text: "Paste", id: "paste", iconCss: "e-icons e-paste" },
    { separator: true },
    { text: "Delete", id: "delete", iconCss: "e-icons e-delete" }
];
</script>
```

**Advantages:**
- Dynamic runtime updates without page reload
- Fetch items from API endpoints
- Conditional item population based on element context

## Proper Data Binding Approaches

**✅ CORRECT APPROACHES:** Use property binding with `items="Model.MenuItems"` or `items="ViewBag.items"` to bind menu data:

| Approach | Syntax | When to Use |
|----------|--------|-------------|
| **PageModel Property Binding** | `items="Model.MenuItems"` | ✅ RECOMMENDED - Razor Pages, strongly typed |
| **ViewBag Binding** | `items="ViewBag.items"` | ✅ MVC Controllers, dynamic data |
| **JavaScript Initialization** | Set `contextmenuInstance.items = [...]` in script | ✅ Runtime updates, API-driven menus |

**✅ CORRECT EXAMPLES:**

PageModel binding (Razor Pages):
```html
<!-- View -->
<ejs-contextmenu id="contextmenu" target="#target" items="Model.MenuItems"></ejs-contextmenu>

<!-- PageModel -->
public List<object> MenuItems { get; set; }
public void OnGet() {
    MenuItems = new List<object> {
        new { text = "Cut", id = "cut" },
        new { text = "Copy", id = "copy" }
    };
}
```

ViewBag binding (MVC):
```html
<!-- View -->
<ejs-contextmenu id="contextmenu" target="#target" items="ViewBag.menuItems"></ejs-contextmenu>

<!-- Controller -->
ViewBag.menuItems = new List<object> {
    new { text = "Cut", id = "cut" },
    new { text = "Copy", id = "copy" }
};
```

JavaScript binding (Runtime updates):
```html
<ejs-contextmenu id="contextmenu" target="#target"></ejs-contextmenu>
<script>
    var contextmenuInstance = document.getElementById('contextmenu').ej2_instances[0];
    contextmenuInstance.items = [
        { text: "Cut", id: "cut", iconCss: "e-icons e-cut" },
        { text: "Copy", id: "copy", iconCss: "e-icons e-copy" }
    ];
</script>
```

**❌ IMPORTANT - NO CHILD TAGHELPER ELEMENTS:**

```html
<!-- WRONG: No e-menu-items or e-menu-item child elements exist -->
<ejs-contextmenu>
    <e-menu-items>  <!-- ❌ This element doesn't exist -->
        <e-menu-item><!-- ❌ This element doesn't exist -->
        </e-menu-item>
    </e-menu-items>
</ejs-contextmenu>

<!-- WRONG: No e-animation-settings child element -->
<ejs-contextmenu>
    <e-animation-settings><!-- ❌ This element doesn't exist -->
    </e-animation-settings>
</ejs-contextmenu>
```

## Dynamic Menu Updates

Update menu items programmatically based on user interactions or application state:

**Scenario: Conditional Menu Items**
```csharp
public List<object> GetContextMenuItems(bool isAdmin, bool hasSelection)
{
    var items = new List<object>
    {
        new { text = "Cut", id = "cut" },
        new { text = "Copy", id = "copy" }
    };
    
    // Show Paste only if clipboard content exists
    if (hasSelection)
    {
        items.Add(new { text = "Paste", id = "paste" });
    }
    
    // Show Admin options only for administrators
    if (isAdmin)
    {
        items.Add(new { separator = true });
        items.Add(new { text = "Delete Permanently", id = "delete_admin" });
        items.Add(new { text = "Change Permissions", id = "perms_admin" });
    }
    
    return items;
}
```

**Usage in Page Model:**
```csharp
public List<object> MenuItems { get; set; }

public void OnGet()
{
    bool isAdmin = User.IsInRole("Admin");
    bool hasSelection = GetClipboardStatus();
    
    MenuItems = GetContextMenuItems(isAdmin, hasSelection);
}
```

**Scenario: Database-Driven Menu Items**
```csharp
public List<object> MenuItems { get; set; }

public async Task OnGetAsync(int documentId)
{
    // Fetch menu items from database based on document type
    var document = await _context.Documents.FindAsync(documentId);
    
    MenuItems = _context.MenuConfigurations
        .Where(m => m.DocumentType == document.Type)
        .Select(m => new 
        { 
            text = m.DisplayText, 
            id = m.CommandId,
            iconCss = m.IconClass,
            items = m.Submenus.Select(s => new { text = s.DisplayText, id = s.CommandId })
        })
        .ToList();
}
```

**Scenario: Localization-Based Items**
```csharp
public List<object> GetLocalizedMenuItems(string locale)
{
    var localizer = _localizerFactory.Create(typeof(MenuResources));
    
    return new List<object>
    {
        new { text = localizer["Cut"].Value, id = "cut" },
        new { text = localizer["Copy"].Value, id = "copy" },
        new { text = localizer["Paste"].Value, id = "paste" },
        new { separator = true },
        new { text = localizer["Exit"].Value, id = "exit" }
    };
}
```

**Update Trigger Points:**
- OnGet() - Static menu for page load
- Ajax requests - Dynamic menu based on user selection
- Database queries - Data-driven menu items
- User role/permissions - Conditional menu items
- Localization - Translated menu texts

This flexibility allows menus to adapt to application context, user permissions, and language preferences.

