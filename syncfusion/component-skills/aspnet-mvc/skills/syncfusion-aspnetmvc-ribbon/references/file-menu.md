# File Menu — Syncfusion ASP.NET MVC Ribbon

## Table of Contents
- [Overview](#overview)
- [Enabling the File Menu](#enabling-the-file-menu)
- [Adding Menu Items](#adding-menu-items)
- [Open Submenu on Click](#open-submenu-on-click)
- [Custom Header Text](#custom-header-text)
- [File Menu Events](#file-menu-events)

---

## Overview

The File Menu is a built-in dropdown menu placed at the left of the ribbon tab bar — similar to the "File" button in Office applications. It is distinct from the Backstage view: the File Menu shows a standard dropdown/context menu, while the Backstage view shows a full-panel overlay.

Configure it using the `FileMenu` property on the ribbon, which accepts a `FileMenuSettings` builder.

---

## Enabling the File Menu

Set `Visible(true)` to show the file menu. By default it is hidden.

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Ribbon
@using Syncfusion.EJ2.Navigations

@{
    List<MenuItem> fileOptions = new List<MenuItem>() {
        new MenuItem { Text = "New", IconCss = "e-icons e-file-new" }
    };
}

@Html.EJS().Ribbon("ribbon").FileMenu(file =>
{
    file.Visible(true).MenuItems(fileOptions);
}).Tabs(tab =>
{
    tab.Header("Home").Groups(group =>
    {
        group.Header("Clipboard").Collections(collection =>
        {
            collection.Items(items =>
            {
                items.Type(RibbonItemType.Button).ButtonSettings(button =>
                {
                    button.IconCss("e-icons e-paste").Content("Paste");
                }).Add();
            }).Add();
        }).Add();
    }).Add();
}).Render()
```

---

## Adding Menu Items

Use `MenuItems` to provide the list of `MenuItem` objects. Assign `Id` values for event handling or programmatic access.

```cshtml
@{
    List<MenuItem> fileOptions = new List<MenuItem>() {
        new MenuItem { Text = "New",     IconCss = "e-icons e-file-new"    },
        new MenuItem { Text = "Open",    IconCss = "e-icons e-folder-open", Id = "open"   },
        new MenuItem { Text = "Rename",  IconCss = "e-icons e-rename",      Id = "rename" },
        new MenuItem { Text = "Save as", IconCss = "e-icons e-save",        Id = "save"   }
    };
}

@Html.EJS().Ribbon("ribbon").FileMenu(file =>
{
    file.Visible(true).MenuItems(fileOptions);
}).Tabs(...).Render()
```

---

## Open Submenu on Click

By default, submenus open on mouse hover. Set `ShowItemOnClick(true)` so submenus only open on click.

```cshtml
@{
    List<MenuItem> fileOptions = new List<MenuItem>() {
        new MenuItem { Text = "New",  IconCss = "e-icons e-file-new"    },
        new MenuItem { Text = "Open", IconCss = "e-icons e-folder-open" },
        new MenuItem {
            Text = "Save as", IconCss = "e-icons e-save",
            Items = new List<MenuItem>() {
                new MenuItem { Text = "Microsoft Word (.docx)" },
                new MenuItem { Text = "Microsoft Word 97-2003 (.doc)" },
                new MenuItem { Text = "Download as PDF" }
            }
        }
    };
}

@Html.EJS().Ribbon("ribbon").FileMenu(file =>
{
    file.Visible(true).ShowItemOnClick(true).MenuItems(fileOptions);
}).Tabs(...).Render()
```

---

## Custom Header Text

Change the button label from the default "File" using `Text`:

```cshtml
@Html.EJS().Ribbon("ribbon").FileMenu(file =>
{
    file.Text("App").Visible(true).MenuItems(fileOptions);
}).Tabs(...).Render()
```

---

## File Menu Events

All events are configured on the `FileMenu` builder:

```cshtml
@Html.EJS().Ribbon("ribbon").FileMenu(file =>
{
    file.Visible(true).MenuItems(fileOptions)
        .BeforeOpen("function(args){ beforeOpenEvent(args) }")
        .BeforeClose("function(args){ beforeCloseEvent(args) }")
        .Open("function(args){ openEvent(args) }")
        .Close("function(args){ closeEvent(args) }")
        .BeforeItemRender("function(args){ beforeItemRenderEvent(args) }")
        .Select("function(args){ selectEvent(args) }");
}).Tabs(...).Render()
```

| Event | Triggered When |
|---|---|
| `BeforeOpen` | Before the file menu popup opens |
| `BeforeClose` | Before the file menu popup closes |
| `Open` | After the popup opens |
| `Close` | After the popup closes |
| `BeforeItemRender` | While rendering each menu item |
| `Select` | When a menu item is selected |

```javascript
function selectEvent(args) {
    console.log('Selected:', args.item.text);
}
function beforeItemRenderEvent(args) {
    if (args.item.text === 'New') {
        args.element.style.color = 'green';
    }
}
```

**Keytip for File Menu:**
```cshtml
FileMenuSettings fileMenuSettings = new FileMenuSettings() {
    Text = "File",
    KeyTip = "F",
    Visible = true,
    MenuItems = fileOptions
};
@Html.EJS().Ribbon("ribbon").EnableKeyTips(true).FileMenu(fileMenuSettings).Tabs(...).Render()
```
