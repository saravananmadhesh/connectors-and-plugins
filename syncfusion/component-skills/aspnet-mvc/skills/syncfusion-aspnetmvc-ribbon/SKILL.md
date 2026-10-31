---
name: syncfusion-aspnetmvc-ribbon
description: Implement the Syncfusion ASP.NET MVC Ribbon control with tabs, groups, and built-in items (Button, CheckBox, DropDown, SplitButton, ComboBox, ColorPicker, GroupButton, Gallery). Covers layouts (Classic/Simplified), backstage view, file menu, contextual tabs, keytips, tooltips, events, and dynamic methods. Use when building ribbon toolbars for ASP.NET MVC applications.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion ASP.NET MVC Ribbon Control

A comprehensive skill for implementing the Syncfusion EJ2 Ribbon control in ASP.NET MVC (Razor/HTML Helper) applications. Covers the full feature set: structure, items, layouts, menus, keytips, events, and programmatic control.

## Quick Start Example

```cshtml
@using Syncfusion.EJ2.Ribbon
@using Syncfusion.EJ2.Navigations

@Html.EJS().Ribbon("ribbon").Tabs(tab =>
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

---

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- NuGet package installation and setup
- Namespace and script/style references
- ScriptManager registration
- Root ribbon configuration: `SelectedTab`, `Width`, `CssClass`, `Locale`, `EnableRtl`, `EnablePersistence`, `TabAnimation`
- First ribbon render with tabs, groups, collections, items
- Full working example

### Tabs, Groups, Collections & Items Structure
📄 **Read:** [references/tabs-groups-items.md](references/tabs-groups-items.md)
- Adding and configuring tabs (`Header`, `Id`, `KeyTip`)
- Adding groups (`Header`, `Orientation`, `GroupIconCss`, `ShowLauncherIcon`, `IsCollapsible`, `Priority`)
- Adding collections and items (`Collections`, `Items`, `Type`)
- Launcher icon — enabling and customizing
- Group collapse/expand priority on resize

### Built-in Ribbon Items
📄 **Read:** [references/built-in-items.md](references/built-in-items.md)
- **Button** — toggle, icon, content, `IsToggle`
- **CheckBox** — checked state, label, `LabelPosition`
- **DropDown** — `Target`, `CreatePopupOnClick`, `BeforeItemRender`
- **SplitButton** — `Target`, popup items
- **ComboBox** — `AllowFiltering`, `Index`, `SortOrder`
- **ColorPicker** — `Value`
- **GroupButton** — `Items`, `Selection` (Single/Multiple), simplified mode behavior
- **Gallery** — groups, items, `ItemCount`, `SelectedItemIndex`, `PopupWidth`, `PopupHeight`, templates
- **Template** — custom HTML items (`ItemTemplate`)
- `DisplayOptions` — Classic / Simplified / Overflow / Auto
- `Disabled`, `AllowedSizes`, `ActiveSize`

### Layouts & Resizing
📄 **Read:** [references/layouts-resizing.md](references/layouts-resizing.md)
- Classic layout — item sizes (Large/Medium/Small), orientation (Row/Column)
- Simplified layout — single-row mode, group overflow popup
- Minimized state (`IsMinimized`)
- Show/hide layout switcher (`HideLayoutSwitcher`)
- Resize behavior and `AllowedSizes` / `ActiveSize`

### Backstage View
📄 **Read:** [references/backstage.md](references/backstage.md)
- Enabling backstage (`BackStageMenu` property)
- Adding backstage items (`Items`, `Content`, `IconCss`, `Id`)
- Footer items (`IsFooter`)
- Separators (`Separator`)
- Back button (`BackButton`, `Text`, `IconCss`, `Visible`)
- Backstage target (`Target`)
- Custom template (`Template`)
- Setting width, height, and header height
- Auto-close behavior on item click (`AutoClose`)
- Auto-close and header height customization

### File Menu
📄 **Read:** [references/file-menu.md](references/file-menu.md)
- Enabling file menu (`FileMenu`, `Visible`)
- Adding menu items (`MenuItems`)
- Open submenu on click (`ShowItemOnClick`)
- Custom header text (`Text`)

### Contextual Tabs
📄 **Read:** [references/contextual-tabs.md](references/contextual-tabs.md)
- Adding contextual tabs (`ContextualTabs`)
- Controlling visibility (`Visible`)
- Selected state (`IsSelected`)
- `ShowTab` and `HideTab` methods

### Keytips & Tooltips
📄 **Read:** [references/keytips-tooltips.md](references/keytips-tooltips.md)
- Enabling keytips (`EnableKeyTips`)
- Keytips on items, groups, tabs, file menu, backstage, layout switcher, launcher icon
- `showKeyTips` / `hideKeyTips` methods
- Keytip guidelines and gotchas
- Tooltip title, content, icon, and `ShowDelay` (`RibbonTooltipSettings`)
- Tooltip CSS customization (`CssClass`)

### Events & Methods
📄 **Read:** [references/events-methods.md](references/events-methods.md)
- Ribbon-level events: `Created`, `TabSelected`, `TabSelecting`, `RibbonCollapsing`, `RibbonExpanding`, `RibbonLayoutSwitched`, `LauncherIconClick`, `OverflowPopupOpen`, `OverflowPopupClose` (with arg documentation)
- Item events: Button, CheckBox, ColorPicker, ComboBox, DropDown, SplitButton, GroupButton, Gallery, FileMenu, Backstage
- Dynamic methods: `addTab`, `addGroup`, `addCollection`, `addItem`
- Removal methods: `removeTab`, `removeGroup`, `removeCollection`, `removeItem`
- Item state methods: `enableItem`, `disableItem`, `showItem`, `hideItem`, `getItem`, `updateItem`
- Group state methods: `enableGroup`, `disableGroup`, `showGroup`, `hideGroup`, `updateGroup`
- Tab state methods: `selectTab`, `showTab`, `hideTab`, `enableTab`, `disableTab`, `updateTab`
- Collection methods: `updateCollection`
- Layout methods: `selectTab`, `refreshLayout`

---

## Common Patterns

### Pattern: Clipboard Group (Classic)
```cshtml
group.Header("Clipboard").GroupIconCss("e-icons e-paste").ShowLauncherIcon(true).Collections(collection =>
{
    collection.Items(items =>
    {
        items.Type(RibbonItemType.SplitButton).AllowedSizes(RibbonItemSize.Large)
            .SplitButtonSettings(sb => { sb.IconCss("e-icons e-paste").Content("Paste").Items(pasteOptions); }).Add();
    }).Add();
    collection.Items(items =>
    {
        items.Type(RibbonItemType.Button).ButtonSettings(b => { b.IconCss("e-icons e-cut").Content("Cut"); }).Add();
        items.Type(RibbonItemType.Button).ButtonSettings(b => { b.IconCss("e-icons e-copy").Content("Copy"); }).Add();
    }).Add();
}).Add();
```

### Pattern: Font Group (Row Orientation)
```cshtml
group.Header("Font").Orientation(ItemOrientation.Row).GroupIconCss("e-icons e-bold").Collections(collection =>
{
    collection.Items(items =>
    {
        items.Type(RibbonItemType.ComboBox).ComboBoxSettings(cb => { cb.DataSource(fontStyle).Index(3).AllowFiltering(true).Width("150px"); }).Add();
        items.Type(RibbonItemType.ComboBox).ComboBoxSettings(cb => { cb.DataSource(fontSize).Index(3).Width("65px"); }).Add();
    }).Add();
}).Add();
```

### Pattern: Help Pane Template
```cshtml
@Html.EJS().Ribbon("ribbon").HelpPaneTemplate("#helpPaneTemplate").Tabs(...).Render()

<script type="text/x-jsrender" id="helpPaneTemplate">
    <button class="action_btn"><span class="e-icons e-undo"></span> Undo</button>
    <button class="action_btn"><span class="e-icons e-redo"></span> Redo</button>
</script>
```

---

## Key Properties Reference

| Property | Type | Description |
|---|---|---|
| `ActiveLayout` | `RibbonLayout` | `Classic` (default) or `Simplified` |
| `IsMinimized` | `bool` | Collapse ribbon to tab headers only |
| `HideLayoutSwitcher` | `bool` | Show/hide the layout toggle button |
| `EnableKeyTips` | `bool` | Enable Alt+Win/Command keytip navigation |
| `HelpPaneTemplate` | `string` | Selector for right-side help pane content |
| `LauncherIconCss` | `string` | Global launcher icon CSS class |
| `FileMenu` | `FileMenuSettings` | File menu configuration |
| `BackStageMenu` | `BackStageMenu` | Backstage view configuration |
| `ContextualTabs` | `List<RibbonContextualTab>` | On-demand contextual tab list |
