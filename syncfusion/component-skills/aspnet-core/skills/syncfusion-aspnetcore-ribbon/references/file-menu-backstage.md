# File Menu and Backstage View

## Table of Contents

- [File Menu](#file-menu)
- [File Menu Events](#file-menu-events)
- [File Menu Item Template](#file-menu-item-template)
- [File Menu Popup Template](#file-menu-popup-template)
- [Backstage View](#backstage-view)
- [Backstage Advanced Configuration](#backstage-advanced-configuration)
- [Menu Items Configuration](#menu-items-configuration)
- [Backstage Items](#backstage-items)
- [Footer Items](#footer-items)
- [Complete Example](#complete-example)

## File Menu

The traditional file menu provides quick access to file operations (New, Open, Save, etc.).

### Basic File Menu

```razor
@{
    List<MenuItem> fileOptions = new List<MenuItem>() {
        new MenuItem { Text = "New", IconCss = "e-icons e-file-new" },
        new MenuItem { Text = "Open", IconCss = "e-icons e-folder-open" }
    };
}

<ejs-ribbon id="ribbon">
    <e-ribbon-filemenusettings visible="true" menuItems=fileOptions></e-ribbon-filemenusettings>
    <e-ribbon-tabs>
        <!-- Ribbon tabs -->
    </e-ribbon-tabs>
</ejs-ribbon>
```

### File Menu Hidden

```razor
<ejs-ribbon id="ribbon">
    <e-ribbon-filemenusettings visible="false"></e-ribbon-filemenusettings>
    <e-ribbon-tabs>
        <!-- Ribbon tabs -->
    </e-ribbon-tabs>
</ejs-ribbon>
```

### File Menu Settings

| Property | Type | Description |
|----------|------|-------------|
| `visible` | bool | Show/hide file menu (default: false) |
| `text` | string | Menu button text (default: "File") |
| `menuItems` | List<MenuItem> | Array of menu items |
| `keyTip` | string | KeyTip character for the file menu button |
| `showItemOnClick` | bool | Open sub-menus only on click (default: false) |

### File Menu with KeyTip

```razor
<e-ribbon-filemenusettings visible="true" text="File" keyTip="F" menuItems=fileOptions></e-ribbon-filemenusettings>
```

## File Menu Events

The file menu exposes six events for handling user interactions. Attach them on `<e-ribbon-filemenusettings>`.

### Event: select

Triggered when the user clicks a file menu item. Use `args.item` to identify which item was selected.

```razor
@{
    List<MenuItem> fileOptions = new List<MenuItem>() {
        new MenuItem { Text = "New", IconCss = "e-icons e-file-new", Id = "new" },
        new MenuItem { Text = "Open", IconCss = "e-icons e-folder-open", Id = "open" },
        new MenuItem { Text = "Save", IconCss = "e-icons e-save", Id = "save" }
    };
}

<ejs-ribbon id="ribbon">
    <e-ribbon-filemenusettings visible="true" menuItems=fileOptions select="onFileMenuSelect"></e-ribbon-filemenusettings>
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <!-- Content -->
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>

<script>
    function onFileMenuSelect(args) {
        console.log('File menu item selected:', args.item.text);
        switch (args.item.id) {
            case 'new':  createNewDocument(); break;
            case 'open': openDocument(); break;
            case 'save': saveDocument(); break;
        }
    }
</script>
```

### Event: beforeOpen / beforeClose

Triggered before the file menu popup opens or closes. Set `args.cancel = true` to prevent the action.

```razor
<e-ribbon-filemenusettings visible="true" menuItems=fileOptions
    beforeOpen="onFileMenuBeforeOpen"
    beforeClose="onFileMenuBeforeClose">
</e-ribbon-filemenusettings>

<script>
    function onFileMenuBeforeOpen(args) {
        console.log('File menu about to open');
        // args.cancel = true; // Prevent opening if needed
    }

    function onFileMenuBeforeClose(args) {
        console.log('File menu about to close');
        // args.cancel = true; // Prevent closing if needed
    }
</script>
```

### Event: open / close

Triggered after the file menu popup has fully opened or closed.

```razor
<e-ribbon-filemenusettings visible="true" menuItems=fileOptions
    open="onFileMenuOpen"
    close="onFileMenuClose">
</e-ribbon-filemenusettings>

<script>
    function onFileMenuOpen(args) {
        console.log('File menu opened');
    }

    function onFileMenuClose(args) {
        console.log('File menu closed');
    }
</script>
```

### Event: beforeItemRender

Triggered before each file menu item is rendered. Use `args.element` to modify the item's DOM element.

```razor
<e-ribbon-filemenusettings visible="true" menuItems=fileOptions
    beforeItemRender="onFileMenuItemRender">
</e-ribbon-filemenusettings>

<script>
    function onFileMenuItemRender(args) {
        // Add a badge or custom class to a specific item
        if (args.item.id === 'new') {
            args.element.classList.add('e-file-new-highlight');
        }
    }
</script>
```

### All File Menu Events Summary

| Event | When Triggered | Key Args |
|-------|----------------|----------|
| `select` | Item clicked/selected | `args.item` (MenuItemModel) |
| `beforeOpen` | Before popup opens | `args.cancel` |
| `beforeClose` | Before popup closes | `args.cancel` |
| `open` | After popup opens | `args.element` |
| `close` | After popup closes | `args.element` |
| `beforeItemRender` | Before each item renders | `args.item`, `args.element` |

## File Menu Item Template

Use `itemTemplate` to customize the rendering of each file menu item. The template receives the `MenuItem` data context.

```razor
@{
    List<MenuItem> fileOptions = new List<MenuItem>() {
        new MenuItem { Text = "New", IconCss = "e-icons e-file-new", Id = "new" },
        new MenuItem { Text = "Open", IconCss = "e-icons e-folder-open", Id = "open" },
        new MenuItem { Text = "Save", IconCss = "e-icons e-save", Id = "save" }
    };
}

<ejs-ribbon id="ribbon">
    <e-ribbon-filemenusettings visible="true" menuItems=fileOptions
        itemTemplate="<span class='custom-menu-item'><span class='${iconCss}'></span><b>${text}</b></span>">
    </e-ribbon-filemenusettings>
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <!-- Content -->
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>

<style>
    .custom-menu-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 0;
    }
</style>
```

## File Menu Popup Template

Use `popupTemplate` to replace the entire file menu popup content with custom HTML.

```razor
<ejs-ribbon id="ribbon">
    <e-ribbon-filemenusettings visible="true" popupTemplate="#fileMenuPopup"></e-ribbon-filemenusettings>
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <!-- Content -->
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>

<!-- Custom popup content defined outside the ribbon -->
<div id="fileMenuPopup" style="display:none">
    <div style="padding: 10px; min-width: 200px;">
        <div class="file-menu-item" onclick="createNew()">
            <span class="e-icons e-file-new"></span> New
        </div>
        <div class="file-menu-item" onclick="openFile()">
            <span class="e-icons e-folder-open"></span> Open
        </div>
        <hr />
        <div class="file-menu-item" onclick="saveFile()">
            <span class="e-icons e-save"></span> Save
        </div>
    </div>
</div>

<style>
    .file-menu-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        cursor: pointer;
    }
    .file-menu-item:hover {
        background-color: #f0f0f0;
    }
</style>
```

## Backstage View

The backstage view is a modern file menu alternative displaying options on the left and content on the right.

### Basic Backstage View

```razor
@{
    List<BackstageItem> backstageItems = new List<BackstageItem>() {
        new BackstageItem { 
            Id = "home", 
            Text = "Home", 
            IconCss = "e-icons e-home", 
            Content = "<div>Home content here</div>" 
        },
        new BackstageItem { 
            Id = "new", 
            Text = "New", 
            IconCss = "e-icons e-file-new", 
            Content = "<div>New document options</div>" 
        }
    };
}

<ejs-ribbon id="ribbon">
    <e-ribbon-backstagemenusettings visible="true" items=backstageItems></e-ribbon-backstagemenusettings>
    <e-ribbon-tabs>
        <!-- Ribbon tabs -->
    </e-ribbon-tabs>
</ejs-ribbon>
```

### Backstage Menu Settings

| Property | Type | Description |
|----------|------|-------------|
| `visible` | bool | Show/hide backstage button |
| `text` | string | Menu button text (default: "File") |
| `items` | List<BackstageItem> | Backstage item list |
| `backButton` | object | Back button configuration |
| `height` | string | Height of the backstage panel (e.g., "500px") |
| `width` | string | Width of the backstage panel (e.g., "600px") |
| `keyTip` | string | KeyTip character for the backstage button |
| `target` | string | CSS selector of the element the backstage is positioned within |
| `template` | string | Template for the entire backstage content area |

## Backstage Advanced Configuration

### Setting Height and Width

Control the size of the backstage panel with `height` and `width`:

```razor
<e-ribbon-backstagemenusettings
    visible="true"
    text="File"
    height="400px"
    width="550px"
    items=backstageItems>
</e-ribbon-backstagemenusettings>
```

### Backstage KeyTip

Assign a keyboard shortcut to the backstage button so users can open it via Alt+key navigation:

```razor
<e-ribbon-backstagemenusettings
    visible="true"
    text="File"
    keyTip="F"
    items=backstageItems>
</e-ribbon-backstagemenusettings>
```

### Target Container

Use `target` to position the backstage panel within a specific container element (instead of the full page):

```razor
<div id="ribbonContainer" style="position: relative; width: 900px;">
    <ejs-ribbon id="ribbon">
        <e-ribbon-backstagemenusettings
            visible="true"
            text="File"
            target="#ribbonContainer"
            items=backstageItems>
        </e-ribbon-backstagemenusettings>
        <e-ribbon-tabs>
            <e-ribbon-tab header="Home">
                <!-- Content -->
            </e-ribbon-tab>
        </e-ribbon-tabs>
    </ejs-ribbon>
</div>
```

### Full Backstage Template

Use `template` to replace the entire backstage content area with a custom layout. When `template` is set, the `items` list is not rendered.

```razor
<ejs-ribbon id="ribbon">
    <e-ribbon-backstagemenusettings
        visible="true"
        text="File"
        height="450px"
        width="600px"
        template="#backstageTemplate">
    </e-ribbon-backstagemenusettings>
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <!-- Content -->
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>

<div id="backstageTemplate" style="display:none">
    <div style="display: flex; height: 100%;">
        <!-- Custom left navigation -->
        <div style="width: 160px; background: #f3f3f3; padding: 10px;">
            <div class="bs-nav-item">Home</div>
            <div class="bs-nav-item">New</div>
            <div class="bs-nav-item">Open</div>
        </div>
        <!-- Custom right content -->
        <div style="flex: 1; padding: 20px;">
            <h3>Welcome</h3>
            <p>Select an option from the left panel.</p>
        </div>
    </div>
</div>

<style>
    .bs-nav-item {
        padding: 10px;
        cursor: pointer;
        border-radius: 4px;
    }
    .bs-nav-item:hover {
        background-color: #e0e0e0;
    }
</style>
```

## Menu Items Configuration

### Creating MenuItem List (for File Menu)

```razor
@{
    List<MenuItem> fileOptions = new List<MenuItem>() {
        new MenuItem { Text = "New", IconCss = "e-icons e-file-new", Id = "new" },
        new MenuItem { Text = "Open", IconCss = "e-icons e-folder-open", Id = "open" },
        new MenuItem { Text = "Save", IconCss = "e-icons e-save", Id = "save" },
        new MenuItem { Text = "Export", IconCss = "e-icons e-export" }
    };
}

<e-ribbon-filemenusettings visible="true" menuItems=fileOptions></e-ribbon-filemenusettings>
```

### MenuItem Properties

| Property | Type | Description |
|----------|------|-------------|
| `Text` | string | Display text |
| `IconCss` | string | Icon class |
| `Id` | string | Unique identifier |
| `Items` | List | Submenu items |

### With Submenus

```razor
@{
    List<MenuItem> fileOptions = new List<MenuItem>() {
        new MenuItem { 
            Text = "New", 
            IconCss = "e-icons e-file-new",
            Items = new List<MenuItem>() {
                new MenuItem { Text = "Blank Document" },
                new MenuItem { Text = "Template 1" },
                new MenuItem { Text = "Template 2" }
            }
        },
        new MenuItem { Text = "Open", IconCss = "e-icons e-folder-open" }
    };
}
```

## Backstage Items

### BackstageItem Configuration

```razor
@{
    List<BackstageItem> backstageItems = new List<BackstageItem>() {
        new BackstageItem { 
            Id = "home", 
            Text = "Home", 
            IconCss = "e-icons e-home", 
            Content = "<div style='padding: 20px;'><h3>Welcome</h3></div>" 
        },
        new BackstageItem { 
            Id = "new", 
            Text = "New", 
            IconCss = "e-icons e-file-new", 
            Content = "<div style='padding: 20px;'><h3>New Document</h3></div>" 
        },
        new BackstageItem { 
            Id = "open", 
            Text = "Open", 
            IconCss = "e-icons e-folder-open", 
            Content = "<div style='padding: 20px;'><h3>Open File</h3></div>" 
        }
    };
}

<ejs-ribbon id="ribbon">
    <e-ribbon-backstagemenusettings visible="true" items=backstageItems></e-ribbon-backstagemenusettings>
    <e-ribbon-tabs>
        <!-- Ribbon tabs -->
    </e-ribbon-tabs>
</ejs-ribbon>
```

### BackstageItem Properties

| Property | Type | Description |
|----------|------|-------------|
| `Id` | string | Unique identifier |
| `Text` | string | Display text |
| `IconCss` | string | Icon class |
| `Content` | string | HTML content (rendered on right) |
| `IsFooter` | bool | Place in footer section |

## Footer Items

Add footer items to backstage (typically for settings, about, etc.):

```razor
@{
    List<BackstageItem> backstageItems = new List<BackstageItem>() {
        new BackstageItem { 
            Id = "home", 
            Text = "Home", 
            IconCss = "e-icons e-home", 
            Content = "<div>Home content</div>" 
        },
        new BackstageItem { 
            Id = "settings", 
            Text = "Settings", 
            IconCss = "e-icons e-settings", 
            Content = "<div>Settings content</div>",
            IsFooter = true 
        },
        new BackstageItem { 
            Id = "about", 
            Text = "About", 
            IconCss = "e-icons e-info",
            Content = "<div>About content</div>",
            IsFooter = true 
        }
    };
    
    var backButtonSettings = new { Text = "Close" };
}

<e-ribbon-backstagemenusettings 
    visible="true" 
    items=backstageItems 
    backButton=backButtonSettings>
</e-ribbon-backstagemenusettings>
```

## Complete Example

Full backstage view with multiple sections:

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Ribbon
@using Syncfusion.EJ2.Navigations

@{
    List<BackstageItem> backstageItems = new List<BackstageItem>() {
        new BackstageItem { 
            Id = "home", 
            Text = "Home", 
            IconCss = "e-icons e-home", 
            Content = @"<div style='padding: 20px;'>
                        <div style='margin-bottom: 20px;'>
                            <div style='font-size: 14px; font-weight: bold;'>Recent Documents</div>
                            <div style='padding: 12px 0; cursor: pointer;'>
                                <span class='e-icons e-open-link' style='margin-right: 10px;'></span>
                                Document1.docx
                            </div>
                            <div style='padding: 12px 0; cursor: pointer;'>
                                <span class='e-icons e-open-link' style='margin-right: 10px;'></span>
                                Document2.docx
                            </div>
                        </div>
                    </div>" 
        },
        new BackstageItem { 
            Id = "new", 
            Text = "New", 
            IconCss = "e-icons e-file-new", 
            Content = @"<div style='padding: 20px;'>
                        <div style='margin-bottom: 15px;'>
                            <div style='cursor: pointer; padding: 10px; border: 1px solid #ddd;'>
                                <span style='font-weight: bold;'>Blank Document</span>
                            </div>
                        </div>
                    </div>" 
        },
        new BackstageItem { 
            Id = "open", 
            Text = "Open", 
            IconCss = "e-icons e-folder-open", 
            Content = @"<div style='padding: 20px;'>
                        <button style='padding: 8px 12px; background: #007bff; color: white; border: none; cursor: pointer;'>
                            Browse Files
                        </button>
                    </div>" 
        },
        new BackstageItem { 
            Id = "settings", 
            Text = "Options", 
            IconCss = "e-icons e-settings", 
            Content = @"<div style='padding: 20px;'>
                        <div style='margin-bottom: 10px;'>
                            <label>
                                <input type='checkbox' /> Enable AutoSave
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type='checkbox' /> Show Tips
                            </label>
                        </div>
                    </div>",
            IsFooter = true 
        }
    };
    
    var backButtonSettings = new { Text = "Back" };
}

<ejs-ribbon id="ribbon">
    <e-ribbon-backstagemenusettings 
        text="File" 
        visible="true" 
        items=backstageItems 
        backButton=backButtonSettings>
    </e-ribbon-backstagemenusettings>
    
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <e-ribbon-groups>
                <e-ribbon-group header="Clipboard">
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-paste" content="Paste"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>
```

## Styling Backstage Content

Use HTML/CSS in the Content property:

```csharp
string contentHtml = @"
<div style='padding: 20px;'>
    <h2>New Document</h2>
    <p>Select a template to create a new document.</p>
    <div style='display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 20px;'>
        <div style='border: 1px solid #ddd; padding: 15px; cursor: pointer; text-align: center;'>
            <div style='font-weight: bold;'>Blank</div>
        </div>
        <div style='border: 1px solid #ddd; padding: 15px; cursor: pointer; text-align: center;'>
            <div style='font-weight: bold;'>Template 1</div>
        </div>
        <div style='border: 1px solid #ddd; padding: 15px; cursor: pointer; text-align: center;'>
            <div style='font-weight: bold;'>Template 2</div>
        </div>
    </div>
</div>";

new BackstageItem { 
    Id = "new", 
    Text = "New", 
    IconCss = "e-icons e-file-new", 
    Content = contentHtml 
}
```

---
