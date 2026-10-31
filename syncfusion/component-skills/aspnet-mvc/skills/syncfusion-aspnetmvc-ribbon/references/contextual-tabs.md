# Contextual Tabs — Syncfusion ASP.NET MVC Ribbon

## Table of Contents
- [Overview](#overview)
- [Adding Contextual Tabs](#adding-contextual-tabs)
- [Controlling Visibility](#controlling-visibility)
- [Selected State](#selected-state)
- [ShowTab and HideTab Methods](#showtab-and-hidetab-methods)

---

## Overview

Contextual tabs are ribbon tabs that appear on demand — typically when a specific element is selected in the document (e.g., an image, a table, or a shape). They are defined via the `ContextualTabs` property and support all standard ribbon groups and items.

---

## Adding Contextual Tabs

`ContextualTabs` accepts a `List<RibbonContextualTab>`. Each contextual tab object holds one or more `RibbonTab` instances (with their own groups, collections, and items).

```cshtml
@using Syncfusion.EJ2.Ribbon
@using Syncfusion.EJ2.Navigations

@{
    List<RibbonContextualTab> contextTabs = new List<RibbonContextualTab>()
    {
        new RibbonContextualTab
        {
            Visible = true,
            Tabs = new List<RibbonTab>()
            {
                new RibbonTab()
                {
                    Id = "ShapeFormat",
                    Header = "Shape Format",
                    Groups = new List<RibbonGroup>()
                    {
                        new RibbonGroup()
                        {
                            Header = "Text Decoration",
                            ShowLauncherIcon = true,
                            Collections = new List<RibbonCollection>()
                            {
                                new RibbonCollection()
                                {
                                    Items = new List<RibbonItem>()
                                    {
                                        new RibbonItem() {
                                            Type = RibbonItemType.Button,
                                            ButtonSettings = new RibbonButtonSettings {
                                                Content = "Text Header", IconCss = "e-icons e-text-header"
                                            }
                                        },
                                        new RibbonItem() {
                                            Type = RibbonItemType.Button,
                                            ButtonSettings = new RibbonButtonSettings {
                                                Content = "Text Wrap", IconCss = "e-icons e-text-wrap"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        new RibbonGroup()
                        {
                            Header = "Arrange",
                            ShowLauncherIcon = true,
                            Collections = new List<RibbonCollection>()
                            {
                                new RibbonCollection()
                                {
                                    Items = new List<RibbonItem>()
                                    {
                                        new RibbonItem() {
                                            Type = RibbonItemType.Button,
                                            ButtonSettings = new RibbonButtonSettings {
                                                Content = "Bring Forward", IconCss = "e-icons e-bring-forward"
                                            }
                                        },
                                        new RibbonItem() {
                                            Type = RibbonItemType.Button,
                                            ButtonSettings = new RibbonButtonSettings {
                                                Content = "Send Backward", IconCss = "e-icons e-send-backward"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
}

@Html.EJS().Ribbon("ribbon").ContextualTabs(contextTabs).Tabs(tab =>
{
    tab.Header("Home").Groups(groups =>
    {
        groups.Header("Clipboard").Collections(collection =>
        {
            collection.Items(items =>
            {
                items.Type(RibbonItemType.Button).ButtonSettings(button =>
                {
                    button.IconCss("e-icons e-cut").Content("Cut");
                }).Add();
            }).Add();
        }).Add();
    }).Add();
}).Render()
```

> Contextual tabs support all built-in ribbon item types and group configurations (orientation, launcher icon, etc.) — identical to regular tabs.

---

## Controlling Visibility

Use the `Visible` property on `RibbonContextualTab` to show or hide it on initial render.

```cshtml
new RibbonContextualTab
{
    Visible = true,   // shown immediately
    Tabs = new List<RibbonTab>() { ... }
}

new RibbonContextualTab
{
    Visible = false,  // hidden; show programmatically via ShowTab()
    Tabs = new List<RibbonTab>() { ... }
}
```

---

## Selected State

Use `IsSelected` to make a contextual tab the active tab when it first becomes visible.

```cshtml
new RibbonContextualTab
{
    Visible = true,
    IsSelected = true,   // this tab is the active one
    Tabs = new List<RibbonTab>()
    {
        new RibbonTab()
        {
            Header = "Styles",
            Groups = new List<RibbonGroup>()
            {
                new RibbonGroup()
                {
                    Header = "Style",
                    ShowLauncherIcon = true,
                    Collections = new List<RibbonCollection>()
                    {
                        new RibbonCollection()
                        {
                            Items = new List<RibbonItem>()
                            {
                                new RibbonItem() {
                                    Type = RibbonItemType.Button,
                                    ButtonSettings = new RibbonButtonSettings {
                                        Content = "Style", IconCss = "e-icons e-style"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
```

---

## ShowTab and HideTab Methods

Show or hide a contextual tab programmatically by passing the tab's `Id` and a boolean indicating whether to make it visible.

```cshtml
@{
    List<RibbonContextualTab> contextTabs = new List<RibbonContextualTab>()
    {
        new RibbonContextualTab
        {
            Tabs = new List<RibbonTab>()
            {
                new RibbonTab()
                {
                    Header = "Arrange & View",
                    Id = "ArrangeView",
                    Groups = new List<RibbonGroup>() { /* groups here */ }
                }
            }
        }
    };
}

<button class="e-btn" id="show-contextual">Show Tab</button>
<button class="e-btn" id="hide-contextual">Hide Tab</button>

@Html.EJS().Ribbon("ribbon").ContextualTabs(contextTabs).Created("ribbonCreated").Tabs(...).Render()

<script>
    var ribbon;

    function ribbonCreated() {
        ribbon = document.getElementById('ribbon').ej2_instances[0];
    }

    document.getElementById('show-contextual').onclick = function() {
        ribbon.showTab('ArrangeView', true);   // show tab with Id "ArrangeView"
    };

    document.getElementById('hide-contextual').onclick = function() {
        ribbon.hideTab('ArrangeView', true);   // hide tab with Id "ArrangeView"
    };
</script>
```

**Usage pattern:** In a document editor, call `ribbon.showTab('ImageFormat', true)` when the user selects an image, and `ribbon.hideTab('ImageFormat', true)` when they deselect it.
