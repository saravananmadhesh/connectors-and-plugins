# Layouts & Resizing — Syncfusion ASP.NET MVC Ribbon

## Table of Contents
- [Classic Layout](#classic-layout)
- [Simplified Layout](#simplified-layout)
- [Minimized State](#minimized-state)
- [Show/Hide Layout Switcher](#showhide-layout-switcher)
- [Resizing Behavior](#resizing-behavior)

---

## Classic Layout

The default layout. Items are organized in multi-row groups with Large/Medium/Small sizes.

```cshtml
@using Syncfusion.EJ2.Ribbon

@Html.EJS().Ribbon("ribbon").ActiveLayout(RibbonLayout.Classic).Tabs(tab =>
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
            collection.Items(items =>
            {
                items.Type(RibbonItemType.Button).ButtonSettings(button =>
                {
                    button.IconCss("e-icons e-cut").Content("Cut");
                }).Add();
                items.Type(RibbonItemType.Button).ButtonSettings(button =>
                {
                    button.IconCss("e-icons e-copy").Content("Copy");
                }).Add();
            }).Add();
        }).Add();
    }).Add();
}).Render()
```

`ActiveLayout` defaults to `Classic` — you can omit it for the default behavior.

### Item Sizes in Classic Layout

Items in Classic layout appear in three sizes controlled by `AllowedSizes`:

| Size | Appearance |
|---|---|
| `Large` | Large icon + text below |
| `Medium` | Small icon + text beside |
| `Small` | Small icon only |

On resize, items transition: `Large → Medium → Small` (shrink), `Small → Medium → Large` (expand).

```cshtml
collection.Items(item =>
{
    item.Type(RibbonItemType.SplitButton).AllowedSizes(RibbonItemSize.Large).SplitButtonSettings(sb =>
    {
        sb.IconCss("e-icons e-paste").Content("Paste").Items(pasteOptions);
    }).Add();
}).Add();
collection.Items(item =>
{
    item.Type(RibbonItemType.Button).AllowedSizes(RibbonItemSize.Medium).ButtonSettings(b =>
    {
        b.IconCss("e-icons e-cut").Content("Cut");
    }).Add();
    item.Type(RibbonItemType.Button).AllowedSizes(RibbonItemSize.Small).ButtonSettings(b =>
    {
        b.IconCss("e-icons e-copy").Content("Copy");
    }).Add();
}).Add();
```

### Group Orientation in Classic Layout

**Column (default)** — items stacked vertically. Rules:
- 1 large item per collection, OR
- Up to 3 medium/small items per collection
- Two large items in the same collection auto-convert to medium

**Row** — items arranged horizontally. Rules:
- Max 3 collections per group
- Any number of items per collection

```cshtml
// Column group
group.Header("Clipboard").Orientation(ItemOrientation.Column).Collections(...).Add();

// Row group — good for font controls
group.Header("Font").Orientation(ItemOrientation.Row).GroupIconCss("e-icons e-bold").Collections(collection =>
{
    collection.Items(items =>
    {
        items.Type(RibbonItemType.ComboBox).ComboBoxSettings(cb =>
        {
            cb.DataSource(fontStyle).Index(3).AllowFiltering(true).Width("150px");
        }).Add();
        items.Type(RibbonItemType.ComboBox).ComboBoxSettings(cb =>
        {
            cb.DataSource(fontSize).Index(3).Width("65px");
        }).Add();
    }).Add();
    collection.Items(items =>
    {
        items.Type(RibbonItemType.Button).AllowedSizes(RibbonItemSize.Small).ButtonSettings(b =>
        {
            b.IconCss("e-icons e-bold").IsToggle(true);
        }).Add();
        items.Type(RibbonItemType.Button).AllowedSizes(RibbonItemSize.Small).ButtonSettings(b =>
        {
            b.IconCss("e-icons e-italic").IsToggle(true);
        }).Add();
    }).Add();
}).Add();
```

---

## Simplified Layout

All items and groups are arranged in a single row. Groups can overflow into individual popups or a shared popup.

```cshtml
@Html.EJS().Ribbon("ribbon").ActiveLayout(RibbonLayout.Simplified).Tabs(tab =>
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
            collection.Items(items =>
            {
                items.Type(RibbonItemType.Button).ButtonSettings(button =>
                {
                    button.IconCss("e-icons e-cut").Content("Cut");
                }).Add();
                items.Type(RibbonItemType.Button).ButtonSettings(button =>
                {
                    button.IconCss("e-icons e-copy").Content("Copy");
                }).Add();
            }).Add();
        }).Add();
    }).Add();
}).Render()
```

Resize order in Simplified layout: `Medium → Small` (shrink), `Small → Medium` (expand).

### Group Overflow in Simplified Layout

Use `EnableGroupOverflow(true)` to give a group its own overflow popup when space is insufficient. Without it, overflowing items go to a shared popup at the right end of the tab.

```cshtml
group.Header("Font").Orientation(ItemOrientation.Row).GroupIconCss("e-icons e-bold")
    .EnableGroupOverflow(true)
    .Collections(collection =>
    {
        // items that may overflow go here
    }).Add();
```

---

## Minimized State

When minimized, only tab headers are visible. Clicking a tab header temporarily expands the ribbon. Double-clicking a tab header also toggles minimized state at runtime.

```cshtml
@Html.EJS().Ribbon("ribbon").IsMinimized(true).Tabs(...).Render()
```

Default: `IsMinimized` is `false`.

---

## Show/Hide Layout Switcher

The layout switcher button lets users toggle between Classic and Simplified at runtime. Hide it with `HideLayoutSwitcher(true)`.

```cshtml
@Html.EJS().Ribbon("ribbon").HideLayoutSwitcher(false).Tabs(...).Render()
```

Toggle dynamically via JavaScript:
```javascript
function OnChange(args) {
    var ribbonObj = document.getElementById('ribbon').ej2_instances[0];
    ribbonObj.hideLayoutSwitcher = !args.checked;
}
```

Default: `HideLayoutSwitcher` is `false` (switcher is visible).

---

## Resizing Behavior

### AllowedSizes — Lock Item Size

Prevents an item from changing size during resize. If set, item stays at that size regardless of available space.

```cshtml
items.Type(RibbonItemType.Button).AllowedSizes(RibbonItemSize.Large)   // always Large
items.Type(RibbonItemType.Button).AllowedSizes(RibbonItemSize.Medium)  // always Medium
items.Type(RibbonItemType.Button).AllowedSizes(RibbonItemSize.Small)   // always Small
```

### ActiveSize — Initial Display Size

Sets the starting size of an item before any resize event. Automatically updated by the ribbon's resize logic based on `AllowedSizes` constraints.

Default: `Medium`

```cshtml
// Item starts large but can shrink during resize
items.Type(RibbonItemType.Button).ActiveSize(RibbonItemSize.Large)
    .ButtonSettings(b => { b.IconCss("e-icons e-paste").Content("Paste"); }).Add();
```
