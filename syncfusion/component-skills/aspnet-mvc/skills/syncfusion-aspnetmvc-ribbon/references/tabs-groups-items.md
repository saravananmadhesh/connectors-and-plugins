# Tabs, Groups, Collections & Items — Syncfusion ASP.NET MVC Ribbon

## Table of Contents
- [Adding Tabs](#adding-tabs)
- [Adding Groups](#adding-groups)
- [Group Orientation](#group-orientation)
- [Group Header and Icon](#group-header-and-icon)
- [Launcher Icon](#launcher-icon)
- [Group Collapsible State](#group-collapsible-state)
- [Group Collapse Priority](#group-collapse-priority)
- [Adding Collections and Items](#adding-collections-and-items)

---

## Adding Tabs

Use the `Tabs` property to add tabs. Each tab requires a `Header`. Optionally provide an `Id` (needed for programmatic selection) and a `KeyTip`.

```cshtml
@using Syncfusion.EJ2.Ribbon

@Html.EJS().Ribbon("ribbon").Tabs(tab =>
{
    tab.Header("Home").Add();
    tab.Header("Insert").Add();
    tab.Header("View").Add();
}).Render()
```

With explicit ID for programmatic control:

```cshtml
tab.Id("homeTab").Header("Home").Add();
tab.Id("insertTab").Header("Insert").Add();
```

---

## Adding Groups

Use the `Groups` property inside a tab. Each group requires a `Header`.

```cshtml
tab.Header("Home").Groups(groups =>
{
    groups.Header("Clipboard").Add();
    groups.Header("Font").Add();
}).Add();
```

---

## Group Orientation

Control how items are arranged within a group using `Orientation`:

| Value | Behavior |
|---|---|
| `Column` (default) | Items arranged vertically. Max: 1 large item OR 3 medium/small items per collection. |
| `Row` | Items arranged horizontally. Max: 3 collections per group, any number of items each. |

```cshtml
// Column (default) — for classic stacked layouts
group.Header("Clipboard").Orientation(ItemOrientation.Column).Collections(...).Add();

// Row — for horizontal toolbars (font, alignment controls)
group.Header("Font").Orientation(ItemOrientation.Row).Collections(...).Add();
```

> **Note:** When `Orientation` is `Column` and two large-sized items are specified, they automatically convert to medium/small size.

---

## Group Header and Icon

`Header` sets the group label at the bottom. `GroupIconCss` sets the icon shown in the group overflow popup when the ribbon collapses.

```cshtml
group.Header("Clipboard").GroupIconCss("e-icons e-paste").Collections(...).Add();
group.Header("Font").GroupIconCss("e-icons e-bold").Collections(...).Add();
```

---

## Launcher Icon

The launcher icon appears at the bottom-right of a group and fires the `LauncherIconClick` event (typically opens a dialog).

**Enable per group:**
```cshtml
group.Header("Clipboard").ShowLauncherIcon(true).Collections(...).Add();
```

**Customize icon globally** (applies to all launcher icons in the ribbon):
```cshtml
@Html.EJS().Ribbon("ribbon").LauncherIconCss("e-icons e-description").Tabs(...).Render()
```

Default: `ShowLauncherIcon` is `false`.

---

## Group Collapsible State

By default, groups collapse to an icon+popup when the ribbon is resized smaller. Set `IsCollapsible(false)` to prevent a group from collapsing.

```cshtml
// Clipboard collapses normally; Font never collapses
group.Header("Clipboard").GroupIconCss("e-icons e-paste").Collections(...).Add();
group.Header("Font").IsCollapsible(false).Collections(...).Add();
```

---

## Group Collapse Priority

Use `Priority` to control the order in which groups collapse (resize smaller) or expand (resize larger).

- **Collapsing:** Higher priority value → collapses first
- **Expanding:** Lower priority value → expands first

```cshtml
group.Header("Clipboard").GroupIconCss("e-icons e-paste").Priority(2).Collections(...).Add();
group.Header("Font").GroupIconCss("e-icons e-bold").Priority(0).Collections(...).Add();
group.Header("Editing").GroupIconCss("e-icons e-edit").Priority(1).Collections(...).Add();
// Collapse order: Clipboard (2) → Editing (1) → Font (0)
// Expand order:  Font (0) → Editing (1) → Clipboard (2)
```

---

## Adding Collections and Items

Collections group related items within a group. Items are the actual controls. Assign `Id` to collections and items when you need programmatic access.

```cshtml
@using Syncfusion.EJ2.Ribbon
@using Syncfusion.EJ2.Navigations

@{
    List<MenuItem> pasteOptions = new List<MenuItem>() {
        new MenuItem { Text = "Keep Source Format" },
        new MenuItem { Text = "Merge format" },
        new MenuItem { Text = "Keep text only" }
    };
}

@Html.EJS().Ribbon("ribbon").Tabs(tab =>
{
    tab.Header("Home").Groups(group =>
    {
        group.Header("Clipboard").ShowLauncherIcon(true).GroupIconCss("e-icons e-paste").Collections(collection =>
        {
            // First collection: one large SplitButton
            collection.Id("paste-collection").Items(items =>
            {
                items.Id("pasteBtn").Type(RibbonItemType.SplitButton).AllowedSizes(RibbonItemSize.Large)
                    .SplitButtonSettings(sb =>
                    {
                        sb.IconCss("e-icons e-paste").Items(pasteOptions).Content("Paste");
                    }).Add();
            }).Add();
            // Second collection: three medium buttons
            collection.Id("cutcopy-collection").Items(items =>
            {
                items.Type(RibbonItemType.Button).ButtonSettings(b =>
                {
                    b.IconCss("e-icons e-cut").Content("Cut");
                }).Add();
                items.Type(RibbonItemType.Button).ButtonSettings(b =>
                {
                    b.IconCss("e-icons e-copy").Content("Copy");
                }).Add();
                items.Type(RibbonItemType.Button).ButtonSettings(b =>
                {
                    b.IconCss("e-icons e-format-painter").Content("Format Painter");
                }).Add();
            }).Add();
        }).Add();
    }).Add();
}).Render()
```

> **Rule:** In `Column` orientation, each collection may hold 1 large item OR up to 3 medium/small items. In `Row` orientation, a group may have at most 3 collections with any number of items each.
