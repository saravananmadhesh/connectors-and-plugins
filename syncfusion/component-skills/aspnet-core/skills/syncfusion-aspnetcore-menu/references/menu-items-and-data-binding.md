# Menu Items and Data Binding

## Table of Contents
- [MenuItem Structure](#menuitem-structure)
- [Items Property](#items-property)
- [Hierarchical Data Binding](#hierarchical-data-binding)
- [Self-Referential Data Binding](#self-referential-data-binding)
- [FieldSettings Configuration](#fieldsettings-configuration)
- [Property Mapping Examples](#property-mapping-examples)
- [Dynamic Data Updates](#dynamic-data-updates)
- [Best Practices](#best-practices)

## MenuItem Structure

The Menu component renders menu items using the `MenuItemModel` interface. Each menu item has the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `text` | string | Display text for the menu item |
| `items` | MenuItemModel[] | Array of sub-menu items |
| `id` | string | Unique identifier for the menu item |
| `iconCss` | string | CSS class for icon display |
| `separator` | boolean | Renders item as separator line |
| `htmlAttributes` | Record | Custom HTML attributes |

### Menu Item Properties in C#

```csharp
public class MenuItem
{
    public string text { get; set; }           // Display text
    public List<MenuItem> items { get; set; }  // Sub-items
    public string id { get; set; }             // Unique ID
    public string iconCss { get; set; }        // Icon CSS class
    public bool separator { get; set; }        // Is separator
}
```

## Items Property

The `items` property is the primary way to populate the Menu component. It accepts:

- Array of `MenuItemModel` objects
- Array of dynamic/anonymous objects (C# dynamic typing)
- Data bound from controller/page properties

### Inline Items Array

Define menu items directly in your view using an anonymous object list:

```html
@{
    List<object> menuItems = new List<object>();
    menuItems.Add(new { text = "Home" });
    menuItems.Add(new { text = "About" });
    menuItems.Add(new { text = "Services" });
}

<ejs-menu id="menu" items="menuItems"></ejs-menu>
```

### Items from Controller

Pass items from the controller via `ViewBag`:

**Controller (MVC):**

```csharp
public IActionResult Index()
{
    var menuItems = new List<object>
    {
        new { text = "Products", id = "prod" },
        new { text = "Services", id = "svc" },
        new { text = "Support", id = "sup" }
    };
    
    ViewBag.MenuItems = menuItems;
    return View();
}
```

**View:**

```html
<ejs-menu id="menu" items="ViewBag.MenuItems"></ejs-menu>
```

### Items from PageModel

For Razor Pages:

**PageModel (C#):**

```csharp
public class IndexModel : PageModel
{
    public List<object> MenuItems { get; set; }
    
    public void OnGet()
    {
        MenuItems = new List<object>
        {
            new { text = "Dashboard" },
            new { text = "Settings" },
            new { text = "Profile" }
        };
    }
}
```

**Razor Page:**

```html
<ejs-menu id="menu" items="Model.MenuItems"></ejs-menu>
```

## Hierarchical Data Binding

Hierarchical data binding uses parent items containing `items` arrays for sub-menus. This is the most common approach for traditional menu structures.

### Single-Level Hierarchy (Header + Sub-items)

```html
@{
    List<object> menuItems = new List<object>();
    menuItems.Add(new
    {
        text = "File",
        id = "menu_file",
        items = new List<object>
        {
            new { text = "New", id = "menu_new" },
            new { text = "Open", id = "menu_open" },
            new { text = "Save", id = "menu_save" }
        }
    });
    menuItems.Add(new
    {
        text = "Edit",
        id = "menu_edit",
        items = new List<object>
        {
            new { text = "Undo", id = "menu_undo" },
            new { text = "Redo", id = "menu_redo" },
            new { text = "Cut", id = "menu_cut" }
        }
    });
}

<ejs-menu id="menu" items="menuItems"></ejs-menu>
```

### Multi-Level Hierarchy (2+ Levels)

Create deeply nested menu structures:

```html
@{
    List<object> menuItems = new List<object>();
    menuItems.Add(new
    {
        text = "File",
        items = new List<object>
        {
            new { text = "New", },
            new {
                text = "Open",
                items = new List<object>
                {
                    new { text = "Open File" },
                    new { text = "Open Folder" }
                }
            },
            new {
                text = "Recent",
                items = new List<object>
                {
                    new { text = "Document1.txt" },
                    new { text = "Document2.txt" },
                    new { text = "Document3.txt" }
                }
            },
            new { text = "Save" }
        }
    });
}

<ejs-menu id="menu" items="menuItems"></ejs-menu>
```

### Practical Example: Application Menu

```html
@{
    var siteMenu = new List<object>
    {
        new
        {
            text = "Dashboard",
            id = "dashboard",
            items = new List<object>
            {
                new { text = "Overview" },
                new { text = "Analytics" },
                new { text = "Reports" }
            }
        },
        new
        {
            text = "Administration",
            id = "admin",
            items = new List<object>
            {
                new { text = "Users" },
                new { text = "Roles" },
                new { text = "Permissions" }
            }
        },
        new
        {
            text = "Settings",
            id = "settings",
            items = new List<object>
            {
                new { text = "General" },
                new { text = "Security" },
                new { text = "Notifications" }
            }
        }
    };
}

<ejs-menu id="mainMenu" items="siteMenu"></ejs-menu>
```

## Self-Referential Data Binding

Self-referential data uses a flat structure with parent-child relationships defined by IDs, rather than nested arrays. This is useful when data comes from databases.

### Self-Referential Structure

Each item has:
- Unique ID (`itemId`)
- Parent ID (`parentId`) - null/empty for root items
- Display text (`text`)
- Optional icon and metadata

```csharp
public class MenuItem
{
    public int id { get; set; }          // Unique ID
    public int? parentId { get; set; }   // Parent ID (null for root)
    public string text { get; set; }     // Display text
    public string icon { get; set; }     // Icon CSS class
}
```

### Self-Referential Data Example

**Controller:**

```csharp
public IActionResult Index()
{
    var menuData = new List<dynamic>
    {
        // Root items (parentId = null)
        new { id = 1, parentId = (int?)null, text = "Dashboard" },
        new { id = 2, parentId = (int?)null, text = "Settings" },
        
        // Sub-items of Dashboard (parentId = 1)
        new { id = 3, parentId = 1, text = "Overview" },
        new { id = 4, parentId = 1, text = "Analytics" },
        
        // Sub-items of Settings (parentId = 2)
        new { id = 5, parentId = 2, text = "General" },
        new { id = 6, parentId = 2, text = "Security" }
    };
    
    ViewBag.MenuData = menuData;
    ViewBag.MenuFields = new
    {
        itemId = "id",
        parentId = "parentId",
        text = "text",
        iconCss = "icon"
    };
    
    return View();
}
```

**View:**

```html
<ejs-menu id="menu" items="ViewBag.MenuData" fields="ViewBag.MenuFields"></ejs-menu>
```

### Database Example: From SQL

When loading from a database:

```csharp
public IActionResult Index()
{
    using (var db = new ApplicationDbContext())
    {
        var menuData = db.MenuItems
            .Select(m => new
            {
                m.id,
                m.parentId,
                m.text,
                m.iconCss
            })
            .ToList();
        
        ViewBag.MenuData = menuData;
        ViewBag.MenuFields = new
        {
            itemId = "id",
            parentId = "parentId",
            text = "text",
            iconCss = "iconCss"
        };
        
        return View();
    }
}
```

## FieldSettings Configuration

When your data doesn't match the standard MenuItemModel properties, use `FieldSettingsModel` to map custom field names:

| Property | Type | Purpose |
|----------|------|---------|
| `text` | string \| string[] | Maps to item display text |
| `children` | string \| string[] | Maps to nested items array |
| `itemId` | string \| string[] | Maps to unique item ID |
| `parentId` | string \| string[] | Maps to parent ID (self-referential) |
| `iconCss` | string \| string[] | Maps to icon CSS class |
| `separator` | string \| string[] | Maps to separator flag |
| `url` | string \| string[] | Maps to navigation URL |

### FieldSettings Structure

```csharp
public class FieldSettings
{
    public string text { get; set; }          // Display field name
    public string children { get; set; }      // Sub-items field name
    public string itemId { get; set; }        // ID field name
    public string parentId { get; set; }      // Parent ID field name
    public string iconCss { get; set; }       // Icon field name
    public string separator { get; set; }     // Separator field name
    public string url { get; set; }           // URL field name
}
```

### FieldSettings Example

**Custom Data Structure:**

```csharp
public class NavItem
{
    public int ItemId { get; set; }
    public int? ParentItemId { get; set; }
    public string ItemName { get; set; }
    public string IconClass { get; set; }
    public string NavigationUrl { get; set; }
}
```

**Controller with Field Mapping:**

```csharp
public IActionResult Index()
{
    var menuData = new List<NavItem>
    {
        new { ItemId = 1, ParentItemId = null, ItemName = "Home", IconClass = "e-home", NavigationUrl = "/" },
        new { ItemId = 2, ParentItemId = null, ItemName = "Products", IconClass = "e-products", NavigationUrl = "/products" },
        new { ItemId = 3, ParentItemId = 2, ItemName = "Electronics", IconClass = "e-electronics", NavigationUrl = "/products/electronics" }
    };
    
    ViewBag.MenuData = menuData;
    ViewBag.MenuFields = new
    {
        itemId = "ItemId",         // Map ItemId property
        parentId = "ParentItemId", // Map ParentItemId property
        text = "ItemName",         // Map ItemName property
        iconCss = "IconClass",     // Map IconClass property
        url = "NavigationUrl"      // Map NavigationUrl property
    };
    
    return View();
}
```

**View:**

```html
<ejs-menu id="menu" items="ViewBag.MenuData" fields="ViewBag.MenuFields"></ejs-menu>
```

## Property Mapping Examples

### Example 1: Hierarchical with Custom Fields

```csharp
var customMenuData = new List<object>
{
    new
    {
        itemName = "File",
        itemIcon = "e-icons e-file",
        subitems = new List<object>
        {
            new { itemName = "New" },
            new { itemName = "Open" },
            new { itemName = "Save" }
        }
    }
};

var fields = new { text = "itemName", iconCss = "itemIcon", children = "subitems" };
```

View:

```html
<ejs-menu id="menu" items="customMenuData" fields="fields"></ejs-menu>
```

### Example 2: Self-Referential with Multiple Levels

```csharp
var flatMenuData = new List<object>
{
    new { id = 1, pid = 0, title = "Computers" },
    new { id = 2, pid = 1, title = "Desktops" },
    new { id = 3, pid = 1, title = "Laptops" },
    new { id = 4, pid = 2, title = "Gaming" },
    new { id = 5, pid = 2, title = "Workstation" }
};

var fields = new { itemId = "id", parentId = "pid", text = "title" };
```

### Example 3: Mixed Data with Separators

```csharp
var menuWithSeparators = new List<object>
{
    new { text = "New" },
    new { text = "Open" },
    new { separator = true },  // Separator between groups
    new { text = "Save" },
    new { text = "Save As" },
    new { separator = true },
    new { text = "Exit" }
};
```

## Dynamic Data Updates

### Loading Data from External Source

```csharp
public async Task<IActionResult> GetMenuData()
{
    // Load from API, database, or service
    var menuData = await _menuService.GetMenuItemsAsync();
    
    return Json(new
    {
        data = menuData,
        fields = new
        {
            text = "text",
            children = "items",
            iconCss = "iconCss"
        }
    });
}
```

### Binding at Runtime

For dynamic menu updates after page load, initialize the Menu with initial data:

```html
@{
    var initialMenu = new List<object>
    {
        new { text = "Loading..." }
    };
}

<ejs-menu id="menu" items="initialMenu"></ejs-menu>

<script>
    // Update menu items dynamically via JavaScript (after component initialization)
    // This requires accessing the component instance and calling appropriate methods
</script>
```

## Best Practices

### 1. Use Consistent Naming

Keep field names consistent across your data:

```csharp
// Good: Consistent naming
new { text = "Home", iconCss = "e-home", items = new List<object> { } }

// Avoid: Mixed naming conventions
new { Text = "Home", icon_css = "e-home", subitems = new List<object> { } }
```

### 2. Always Provide Unique IDs

Especially important for self-referential data:

```csharp
// Good: Non-null unique IDs
new { id = 1, parentId = null, text = "Home" }   // Root item
new { id = 2, parentId = 1, text = "Overview" }  // Child of 1

// Avoid: Duplicate or missing IDs
new { id = 1, text = "Home" }
new { id = 1, text = "About" }  // Duplicate ID!
```

### 3. Validate parentId References

Ensure all parentId values reference existing items:

```csharp
var menuData = new List<object>
{
    new { id = 1, parentId = null, text = "Home" },
    new { id = 2, parentId = 1, text = "Overview" },
    new { id = 3, parentId = 5, text = "Unknown" }  // parentId = 5 doesn't exist!
};
```

### 4. Handle Null Values in Optional Fields

```csharp
// Good: Explicit null handling
new
{
    text = "Home",
    items = (List<object>)null,  // Explicitly null
    iconCss = "e-home",
    separator = false
}

// Avoid: Missing properties
new { text = "Home" }  // items and other properties undefined
```

### 5. Use Hierarchical for Small Datasets

For small, stable menus, use hierarchical binding:

```csharp
// Recommended for <50 items
var smallMenu = new List<object>
{
    new
    {
        text = "File",
        items = new List<object> { /* ... */ }
    }
};
```

### 6. Use Self-Referential for Large/Dynamic Datasets

For large or database-driven menus, use self-referential:

```csharp
// Recommended for >50 items or database-driven
var dbMenu = (from item in dbContext.MenuItems
              select new
              {
                  item.id,
                  item.parentId,
                  item.text,
                  item.iconCss
              }).ToList();
```

---

**Related References:**
- [getting-started.md](getting-started.md) - Basic setup and first menu
- [icons-submenus-and-hierarchy.md](icons-submenus-and-hierarchy.md) - Working with nested structures
- [api-reference.md](api-reference.md) - Complete MenuItemModel and FieldSettingsModel reference
