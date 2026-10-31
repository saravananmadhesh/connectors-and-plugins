# Keytips & Tooltips — Syncfusion ASP.NET MVC Ribbon

## Table of Contents
- [Keytips Overview](#keytips-overview)
- [Enabling Keytips](#enabling-keytips)
- [Assigning Keytips to Items](#assigning-keytips-to-items)
- [Keytips on Tabs and Groups](#keytips-on-tabs-and-groups)
- [Keytips on File Menu and Backstage](#keytips-on-file-menu-and-backstage)
- [Keytips on Layout Switcher and Launcher Icon](#keytips-on-layout-switcher-and-launcher-icon)
- [ShowKeyTips and HideKeyTips Methods](#showkeytips-and-hidekeytips-methods)
- [Keytip Guidelines](#keytip-guidelines)
- [Tooltips Overview](#tooltips-overview)
- [Tooltip Title and Content](#tooltip-title-and-content)
- [Tooltip Icon](#tooltip-icon)
- [Tooltip CSS Customization](#tooltip-css-customization)

---

## Keytips Overview

Keytips enable keyboard navigation through ribbon items without using the mouse. They appear as overlaid letter badges when the user presses **Alt + Windows/Command**. Pressing the indicated key(s) activates that item or navigates into it.

---

## Enabling Keytips

Set `EnableKeyTips(true)` on the ribbon:

```cshtml
@Html.EJS().Ribbon("ribbon").EnableKeyTips(true).Tabs(...).Render()
```

---

## Assigning Keytips to Items

Use the `KeyTip` property on any ribbon item:

```cshtml
collection.Items(items =>
{
    items.Type(RibbonItemType.SplitButton).KeyTip("PA").SplitButtonSettings(sb =>
    {
        sb.IconCss("e-icons e-paste").Items(pasteOptions).Content("Paste");
    }).Add();
}).Add();
collection.Items(items =>
{
    items.Type(RibbonItemType.Button).KeyTip("CU").ButtonSettings(b =>
    {
        b.IconCss("e-icons e-cut").Content("Cut");
    }).Add();
    items.Type(RibbonItemType.Button).KeyTip("CO").ButtonSettings(b =>
    {
        b.IconCss("e-icons e-copy").Content("Copy");
    }).Add();
}).Add();
```

For **GroupButton** items, assign keytips on individual `RibbonGroupButtonItem` objects:

```cshtml
List<RibbonGroupButtonItem> groupButtonItems = new List<RibbonGroupButtonItem>() {
    new RibbonGroupButtonItem { IconCss = "e-icons e-bold",          KeyTip = "1", Content = "Bold",          Selected = true },
    new RibbonGroupButtonItem { IconCss = "e-icons e-italic",        KeyTip = "2", Content = "Italic"        },
    new RibbonGroupButtonItem { IconCss = "e-icons e-underline",     KeyTip = "3", Content = "Underline"     },
    new RibbonGroupButtonItem { IconCss = "e-icons e-strikethrough", KeyTip = "4", Content = "Strikethrough" }
};
```

---

## Keytips on Tabs and Groups

Set `KeyTip` on tab and group definitions:

```cshtml
@Html.EJS().Ribbon("ribbon").EnableKeyTips(true).Tabs(tab =>
{
    tab.Header("Home").KeyTip("H").Groups(group =>
    {
        group.Header("Clipboard").KeyTip("CD").GroupIconCss("e-icons e-paste").Collections(collection =>
        {
            collection.Items(items =>
            {
                items.Type(RibbonItemType.ComboBox).KeyTip("O1").ComboBoxSettings(cb =>
                {
                    cb.DataSource(fontStyle).Index(3).AllowFiltering(true).Width("150px");
                }).Add();
            }).Add();
        }).Add();
    }).Add();
}).Render()
```

---

## Keytips on File Menu and Backstage

**File Menu keytip:**

```cshtml
FileMenuSettings fileMenuSettings = new FileMenuSettings() {
    Text = "File",
    KeyTip = "F",
    Visible = true,
    MenuItems = fileOptions
};

@Html.EJS().Ribbon("ribbon").EnableKeyTips(true).FileMenu(fileMenuSettings).Tabs(...).Render()
```

**Backstage menu keytip** — set on `BackStageMenu` and on individual `BackstageItem` objects:

```cshtml
List<BackstageItem> backstageItems = new List<BackstageItem>() {
    new BackstageItem { Id = "home", Text = "Home", KeyTip = "H", IconCss = "e-icons e-home", Content = HomeContent() },
    new BackstageItem { Id = "new",  Text = "New",  KeyTip = "N", IconCss = "e-icons e-file-new", Content = NewContent() },
    new BackstageItem { Id = "open", Text = "Open", KeyTip = "O", IconCss = "e-icons e-folder-open", Content = OpenContent() }
};

BackStageMenu backstageSettings = new BackStageMenu() {
    Text = "File",
    Visible = true,
    KeyTip = "F",
    BackButton = new BackstageBackButton { Text = "Close" },
    Items = backstageItems
};
```

---

## Keytips on Layout Switcher and Launcher Icon

**Layout switcher keytip:**
```cshtml
@Html.EJS().Ribbon("ribbon").EnableKeyTips(true).LayoutSwitcherKeyTip("LS").Tabs(...).Render()
```

**Launcher icon keytip** — set per group:
```cshtml
group.Header("Clipboard").ShowLauncherIcon(true).LauncherIconKeyTip("L").Collections(...).Add();
```

---

## ShowKeyTips and HideKeyTips Methods

Show keytips programmatically (e.g., on page load for demos):

```javascript
function ribbonCreated() {
    var ribbon = this;
    // Show all keytips at the root level
    ribbon.ribbonKeyTipModule.showKeyTips();

    // Show keytips for a specific tab (navigate into it)
    ribbon.ribbonKeyTipModule.showKeyTips('H');
}
```

Hide all visible keytips:
```javascript
ribbon.ribbonKeyTipModule.hideKeyTips();
```

---

## Keytip Guidelines

Avoid these issues to ensure correct keytip activation:

1. **No duplicate keytip text** — If two items share keytip `"H"` or `"HF"`, only the first occurrence of `"H"` activates; subsequent `"H"` or `"HF"` items are ignored.

2. **No shared first letters between single and multi-character keytips** — If items have keytips `"F"`, `"FP"`, and `"FPF"`, pressing `"F"` only activates the single-character item; `"FP"` and `"FPF"` items become unreachable.

---

## Tooltips Overview

Tooltips appear when hovering over a ribbon item. Configure them using `RibbonTooltipSettings` on each item.

---

## Tooltip Title and Content

```cshtml
@{
    var cutTooltip    = new RibbonTooltipSettings { Title = "Cut",            Content = "Places selected text on the clipboard." };
    var copyTooltip   = new RibbonTooltipSettings { Title = "Copy",           Content = "Copies selected content to the clipboard." };
    var pasteTooltip  = new RibbonTooltipSettings { Title = "Paste",          Content = "Inserts clipboard content at cursor position." };
    var formatTooltip = new RibbonTooltipSettings { Title = "Format Painter", Content = "Copies formatting and applies it elsewhere." };
}

collection.Items(item =>
{
    item.Type(RibbonItemType.Button).ButtonSettings(b =>
    {
        b.IconCss("e-icons e-cut").Content("Cut");
    }).RibbonTooltipSettings(cutTooltip).Add();

    item.Type(RibbonItemType.Button).ButtonSettings(b =>
    {
        b.IconCss("e-icons e-copy").Content("Copy");
    }).RibbonTooltipSettings(copyTooltip).Add();
}).Add();
```

---

## Tooltip Icon

Add an icon inside the tooltip using `IconCss`:

```cshtml
var cutTooltip = new RibbonTooltipSettings {
    Title   = "Cut",
    Content = "Places the selected text or object on the clipboard so that you can paste it somewhere else.",
    IconCss = "e-icons e-cut"
};
```

---

## Tooltip Show Delay

Control the delay (in milliseconds) before the tooltip appears on hover using `ShowDelay`:

```cshtml
var cutTooltip = new RibbonTooltipSettings {
    Title    = "Cut",
    Content  = "Places the selected text or object on the clipboard.",
    IconCss  = "e-icons e-cut",
    ShowDelay = 500  // Tooltip appears 500ms after hover begins
};

collection.Items(item =>
{
    item.Type(RibbonItemType.Button).ButtonSettings(b =>
    {
        b.IconCss("e-icons e-cut").Content("Cut");
    }).RibbonTooltipSettings(cutTooltip).Add();
}).Add();
```

Typical values:
- `0` — Instant display (no delay)
- `200` — Short delay (perceived as instant)
- `500` — Moderate delay (default-like behavior)
- `1000` — 1-second delay (allows quick hover-overs without triggering tooltip)

---

## Tooltip CSS Customization

Use `CssClass` to apply custom styles to the tooltip popup and arrow:

```cshtml
var cutTooltip = new RibbonTooltipSettings {
    Title   = "Cut",
    Content = "Places the selected text or object on the clipboard.",
    IconCss = "e-icons e-cut",
    CssClass = "custom-tooltip"
};
```

```css
:root { --borderColor: rgb(72, 72, 72); --black: #000000; }

/* Popup border and background */
.custom-tooltip.e-ribbon-tooltip.e-popup {
    border: 2px solid var(--borderColor);
    border-radius: 5px;
    background: var(--black);
}

/* Arrow styling */
.custom-tooltip.e-ribbon-tooltip .e-arrow-tip .e-arrow-tip-inner.e-tip-top,
.custom-tooltip.e-ribbon-tooltip .e-arrow-tip .e-arrow-tip-inner.e-tip-bottom {
    color: var(--black);
}
.custom-tooltip.e-ribbon-tooltip .e-arrow-tip-outer.e-tip-top    { border-bottom: 8px solid var(--borderColor); }
.custom-tooltip.e-ribbon-tooltip .e-arrow-tip-outer.e-tip-bottom { border-top:    8px solid var(--borderColor); }

/* Title and content font sizes */
.custom-tooltip.e-ribbon-tooltip .e-tip-content .e-ribbon-tooltip-title  { font-size: 14px; }
.custom-tooltip.e-ribbon-tooltip .e-tip-content .e-ribbon-text-container
    .e-ribbon-tooltip-content { font-size: 11px; }
```
