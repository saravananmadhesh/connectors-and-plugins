# Header and Toolbar — Syncfusion ASP.NET MVC Chat UI

## Table of Contents
1. [Show or Hide Header](#show-or-hide-header)
2. [Header Text](#header-text)
3. [Header Icon CSS](#header-icon-css)
4. [Header Toolbar](#header-toolbar)
   - [Adding Toolbar Items](#adding-toolbar-items)
   - [Item Properties Reference](#item-properties-reference)
   - [Item Type](#item-type)
   - [Text Items](#text-items)
   - [Show/Hide and Disable Items](#showhide-and-disable-items)
   - [Tooltip Text](#tooltip-text)
   - [CSS Class](#css-class)
   - [Alignment](#alignment)
   - [Tab Key Navigation](#tab-key-navigation)
   - [Template Items](#template-items)
5. [ItemClicked Event](#itemclicked-event)

---

## Show or Hide Header

Use `ShowHeader` to toggle the header area. The header contains the title text and optional icon and toolbar buttons.

```razor
@Html.EJS().ChatUI("chatUI")
    .HeaderText("Michale")
    .HeaderIconCss("e-icons e-people")
    .ShowHeader(false)   // hides the header entirely
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()
```

Default: `ShowHeader = true`.

---

## Header Text

Use `HeaderText` to display a title in the header area — typically the contact name, group name, or bot name.

```razor
@Html.EJS().ChatUI("chatUI")
    .HeaderText("Michale Suyama")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()
```

```csharp
// Controller
ViewBag.CurrentUser = new ChatUIUser { Id = "user1", User = "Albert" };
```

---

## Header Icon CSS

Use `HeaderIconCss` to display an icon in the header alongside the `HeaderText`. Accepts any EJ2 icon CSS class or a custom icon class.

```razor
@Html.EJS().ChatUI("chatUI")
    .HeaderText("Design Team")
    .HeaderIconCss("e-icons e-people")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()
```

**Custom icon with background image:**
```css
.chat_header_icon {
    background-image: url('/images/group-avatar.png');
    background-size: cover;
    width: 32px;
    height: 32px;
    border-radius: 50%;
}
```
```razor
.HeaderIconCss("chat_header_icon")
```

---

## Header Toolbar

The `HeaderToolbar` property accepts a `ChatUIToolbarSettings` object with an `Items` list. Use it to add action buttons (refresh, menu, user profile, etc.) to the header area.

### Adding Toolbar Items

**Controller:**
```csharp
using Syncfusion.EJ2.InteractiveChat;

public ActionResult Index()
{
    var toolbar = new List<ToolbarItemModel>
    {
        new ToolbarItemModel { align = "Right", iconCss = "e-icons e-menu" }
    };
    ViewBag.HeaderToolbar = toolbar;
    // ... messages, user
    return View();
}

public class ToolbarItemModel
{
    public string align   { get; set; }
    public string iconCss { get; set; }
}
```

**View:**
```razor
@Html.EJS().ChatUI("chatUI")
    .HeaderToolbar(new ChatUIToolbarSettings { Items = ViewBag.HeaderToolbar })
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()
```

---

### Item Properties Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `iconCss` | `string` | — | CSS class for the item icon |
| `type` | `string` | `"Button"` | Item type: `Button`, `Separator`, `Input` |
| `text` | `string` | — | Display text for the item |
| `visible` | `bool` | `true` | Show or hide the item |
| `disabled` | `bool` | `false` | Enable or disable the item |
| `tooltip` | `string` | — | Tooltip text on hover |
| `cssClass` | `string` | — | Custom CSS class for the item |
| `align` | `string` | `"Left"` | Alignment: `Left`, `Center`, `Right` |
| `tabIndex` | `int` | — | Tab key navigation order |
| `template` | `string` | — | HTML template for custom content (`type: Input`) |

---

### Item Type

The `type` property controls rendering:
- `Button` (default) — renders as a clickable button
- `Separator` — renders a vertical divider between items
- `Input` — renders the `template` HTML string (use for custom components like dropdowns)

```csharp
new ToolbarItemModel { align = "Right", type = "Button", iconCss = "e-icons e-refresh" }
```

---

### Text Items

Use `text` to show a text label instead of (or alongside) an icon:

```csharp
new ToolbarItemModel { align = "Right", text = "Log Out" }
```

---

### Show/Hide and Disable Items

```csharp
// Hidden item (still in DOM, not visible)
new ToolbarItemModel { align = "Right", iconCss = "e-icons e-refresh", visible = false },

// Visible item
new ToolbarItemModel { align = "Right", iconCss = "e-icons e-user" }
```

```csharp
// Disabled item (visible but non-interactive)
new ToolbarItemModel { align = "Right", iconCss = "e-icons e-refresh", disabled = true },
new ToolbarItemModel { align = "Right", iconCss = "e-icons e-user" }
```

---

### Tooltip Text

```csharp
new ToolbarItemModel { align = "Right", iconCss = "e-icons e-refresh", tooltip = "Refresh" }
```

---

### CSS Class

Apply custom styling to individual toolbar items:

```csharp
new ToolbarItemModel { align = "Right", iconCss = "e-icons e-user", cssClass = "custom-btn" }
```

```css
.custom-btn .e-user::before {
    color: white;
    font-size: 15px;
}

.custom-btn.e-toolbar-item button.e-tbar-btn {
    border: 2px solid white;
}
```

---

### Alignment

Supports `Left` (default), `Center`, and `Right`:

```csharp
new ToolbarItemModel { align = "Right",  iconCss = "e-icons e-menu"    },
new ToolbarItemModel { align = "Center", iconCss = "e-icons e-search"  },
new ToolbarItemModel { align = "Left",   iconCss = "e-icons e-refresh" }
```

---

### Tab Key Navigation

By default, arrow keys navigate toolbar items. Setting `tabIndex` enables Tab/Shift+Tab navigation:

```csharp
new ToolbarItemModel { text = "Item 1", tabIndex = 1 },
new ToolbarItemModel { text = "Item 2", tabIndex = 2 }
```

Set all items to `tabIndex = 0` to navigate in DOM order:

```csharp
new ToolbarItemModel { text = "Item 1", tabIndex = 0 },
new ToolbarItemModel { text = "Item 2", tabIndex = 0 }
```

---

### Template Items

Use `type = "Input"` with a `template` to embed custom components (e.g., a dropdown button) in the toolbar:

**Controller:**
```csharp
new ToolbarItemModel { type = "Input", align = "Right", template = "<div id=\"ddMenu\"></div>" }
```

**View — initialize the component in `Created`:**
```razor
@Html.EJS().ChatUI("chatUI")
    .HeaderToolbar(new ChatUIToolbarSettings { Items = ViewBag.HeaderToolbar })
    .Created("onCreated")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()

<script>
    function onCreated() {
        var dropDown = new ej.splitbuttons.DropDownButton({
            items: [
                { text: 'Info'       },
                { text: 'Search'     },
                { text: 'Add to list'},
                { text: 'Mute'       }
            ],
            content:  'Menu',
            iconCss:  'e-icons e-menu',
            cssClass: 'custom-dropdown'
        });
        dropDown.appendTo('#ddMenu');
    }
</script>
```

---

## ItemClicked Event

The `ItemClicked` event fires when any header toolbar item is clicked. Use the event args to identify the clicked item and perform custom actions. Set `args.cancel = true` to prevent the default click behaviour.

**`ToolbarItemClickedEventArgs` properties:**

| Property | Type | Description |
|----------|------|-------------|
| `item` | `ToolbarItemModel` | The toolbar item that was clicked. Access its properties such as `args.item.tooltip`, `args.item.text`, `args.item.iconCss`. |
| `cancel` | `bool` | Set to `true` to prevent the default action associated with the clicked item. |
| `event` | `Event` | The underlying browser click event. Useful for obtaining click coordinates or the target element. |
| `dataIndex` | `number` | Index of the message data associated with the click. Not applicable for header toolbar items — always use the header toolbar `ItemClicked` exclusively for header actions. |
| `name` | `string` | Name of the event (`"itemClicked"`). |

```razor
@Html.EJS().ChatUI("chatUI")
    .HeaderToolbar(new ChatUIToolbarSettings
    {
        Items       = ViewBag.HeaderToolbar,
        ItemClicked = "onHeaderItemClicked"
    })
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()

<script>
    function onHeaderItemClicked(args) {
        // args.item   — the clicked ToolbarItemModel
        // args.cancel — set to true to suppress default action
        // args.event  — the native browser click event
        console.log('Clicked:', args.item.tooltip);

        if (args.item.tooltip === "Refresh") {
            args.cancel = true;  // prevent default, handle manually
            location.reload();
        }
    }
</script>
```
