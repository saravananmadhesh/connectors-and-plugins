# Built-in Ribbon Items — Syncfusion ASP.NET MVC Ribbon

## Table of Contents
- [Item Type Overview](#item-type-overview)
- [Button](#button)
- [CheckBox](#checkbox)
- [DropDown Button](#dropdown-button)
- [SplitButton](#splitbutton)
- [ComboBox](#combobox)
- [ColorPicker](#colorpicker)
- [GroupButton](#groupbutton)
- [Gallery](#gallery)
- [Template (Custom Items)](#template-custom-items)
- [Display Options](#display-options)
- [Item Size Control](#item-size-control)
- [Disabling Items](#disabling-items)

---

## Item Type Overview

| Type | `RibbonItemType` value | Settings class |
|---|---|---|
| Button | `Button` | `RibbonButtonSettings` |
| CheckBox | `CheckBox` | `RibbonCheckBoxSettings` |
| DropDown | `DropDown` | `RibbonDropDownSettings` |
| SplitButton | `SplitButton` | `RibbonSplitButtonSettings` |
| ComboBox | `ComboBox` | `RibbonComboBoxSettings` |
| ColorPicker | `ColorPicker` | `RibbonColorPickerSettings` |
| GroupButton | `GroupButton` | `RibbonGroupButtonSettings` |
| Gallery | `Gallery` | `RibbonGallerySettings` |
| Custom HTML | `Template` | `ItemTemplate` (string selector) |

---

## Button

Renders an EJ2 Button. Supports icon, text, and toggle behavior.

```cshtml
items.Type(RibbonItemType.Button).ButtonSettings(button =>
{
    button.IconCss("e-icons e-cut").Content("Cut");
}).Add();
```

**Toggle button** — acts as an on/off switch:
```cshtml
items.Type(RibbonItemType.Button).ButtonSettings(button =>
{
    button.IconCss("e-icons e-bold").Content("Bold").IsToggle(true);
}).Add();
```

**Icon only (small size):**
```cshtml
items.Type(RibbonItemType.Button).AllowedSizes(RibbonItemSize.Small).ButtonSettings(button =>
{
    button.IconCss("e-icons e-underline").IsToggle(true);
}).Add();
```

---

## CheckBox

Renders an EJ2 CheckBox. Supports label text, label position, and checked state.

```cshtml
items.Type(RibbonItemType.CheckBox).CheckBoxSettings(checkBox =>
{
    checkBox.Label("Ruler").Checked(false);
}).Add();
```

**Label before the checkbox:**
```cshtml
items.Type(RibbonItemType.CheckBox).CheckBoxSettings(checkBox =>
{
    checkBox.Label("Ruler").Checked(true).LabelPosition("Before");
}).Add();
```

Default `LabelPosition` is `After`.

---

## DropDown Button

Renders an EJ2 DropDownButton with a popup menu.

```cshtml
@{
    List<MenuItem> tableOptions = new List<MenuItem>() {
        new MenuItem { Text = "Insert Table" },
        new MenuItem { Text = "This device" },
        new MenuItem { Text = "Convert Table" },
        new MenuItem { Text = "Excel SpreadSheet" }
    };
}

items.Type(RibbonItemType.DropDown).DropDownSettings(dropDown =>
{
    dropDown.IconCss("e-icons e-table").Content("Table").Items(tableOptions);
}).Add();
```

**Custom target element** (renders a ListView or any HTML in the popup):
```cshtml
items.Type(RibbonItemType.DropDown).DropDownSettings(dropDown =>
{
    dropDown.IconCss("e-icons e-image").Content("Pictures").Target("#listView");
}).Add();
@Html.EJS().ListView("listView").ShowHeader(true).HeaderTitle("Insert Picture From")
    .DataSource(new string[] { "This device", "Stock Images", "Online Images" }).Render()
```

**Create popup on demand** (deferred creation for performance):
```cshtml
dropDown.IconCss("e-icons e-table").Content("Table").Items(tableOptions).CreatePopupOnClick(true);
```

**Customize item appearance via `BeforeItemRender`:**
```cshtml
dropDown.Items(tableOptions).BeforeItemRender("function(args){ beforeItemRender(args) }");
// Script:
// function beforeItemRender(args) {
//     if (args.item.text === 'Insert Table') args.element.classList.add("e-custom-class");
// }
```

---

## SplitButton

Renders an EJ2 SplitButton — a primary action button combined with a dropdown arrow.

```cshtml
@{
    List<MenuItem> pasteOptions = new List<MenuItem>() {
        new MenuItem { Text = "Keep Source Format" },
        new MenuItem { Text = "Merge format" },
        new MenuItem { Text = "Keep text only" }
    };
}

items.Type(RibbonItemType.SplitButton).AllowedSizes(RibbonItemSize.Large).SplitButtonSettings(sb =>
{
    sb.IconCss("e-icons e-paste").Items(pasteOptions).Content("Paste");
}).Add();
```

**Custom target element** (same as DropDown):
```cshtml
sb.IconCss("e-icons e-image").Content("Pictures").Target("#listView");
```

---

## ComboBox

Renders an EJ2 ComboBox for selecting from a list.

```cshtml
@{
    List<string> fontStyle = new List<string>() { "Algerian", "Arial", "Calibri", "Cambria", "Courier New" };
}

items.Type(RibbonItemType.ComboBox).ComboBoxSettings(comboBox =>
{
    comboBox.DataSource(fontStyle).Index(3).AllowFiltering(true).Width("150px");
}).Add();
```

**Key properties:**

| Property | Description |
|---|---|
| `DataSource` | List of items |
| `Index` | Initially selected item (0-based) |
| `AllowFiltering` | Enables type-to-filter; default `false` |
| `Width` | CSS width string, e.g. `"150px"` |
| `SortOrder` | `"None"` / `"Ascending"` / `"Descending"` |

---

## ColorPicker

Renders an EJ2 ColorPicker. `Value` is a hex color string.

```cshtml
items.Type(RibbonItemType.ColorPicker).AllowedSizes(RibbonItemSize.Small).ColorPickerSettings(colorPicker =>
{
    colorPicker.Value("#123456");
}).Add();
```

---

## GroupButton

Renders a set of toggle buttons as a group. Supports single or multiple selection.

**Single selection (radio-like):**
```cshtml
@{
    List<RibbonGroupButtonItem> alignItems = new List<RibbonGroupButtonItem>() {
        new RibbonGroupButtonItem { IconCss = "e-icons e-align-left", Content = "Align Left" },
        new RibbonGroupButtonItem { IconCss = "e-icons e-align-center", Content = "Align Center", Selected = true },
        new RibbonGroupButtonItem { IconCss = "e-icons e-align-right", Content = "Align Right" },
        new RibbonGroupButtonItem { IconCss = "e-icons e-justify", Content = "Justify" }
    };
}

items.Type(RibbonItemType.GroupButton).AllowedSizes(RibbonItemSize.Small).GroupButtonSettings(groupButton =>
{
    groupButton.Selection(RibbonGroupButtonSelection.Single).Items(alignItems);
}).Add();
```

**Multiple selection (checkbox-like):**
```cshtml
@{
    List<RibbonGroupButtonItem> formatItems = new List<RibbonGroupButtonItem>() {
        new RibbonGroupButtonItem { IconCss = "e-icons e-bold", Content = "Bold" },
        new RibbonGroupButtonItem { IconCss = "e-icons e-italic", Content = "Italic", Selected = true },
        new RibbonGroupButtonItem { IconCss = "e-icons e-underline", Content = "Underline" },
        new RibbonGroupButtonItem { IconCss = "e-icons e-strikethrough", Content = "Strikethrough", Selected = true }
    };
}

items.Type(RibbonItemType.GroupButton).AllowedSizes(RibbonItemSize.Small).GroupButtonSettings(groupButton =>
{
    groupButton.Selection(RibbonGroupButtonSelection.Multiple).Items(formatItems);
}).Add();
```

> In **Simplified** layout, GroupButton renders as a DropDownButton. The dropdown icon updates to reflect the last selected button.

---

## Gallery

Renders a visual gallery of selectable items, displayed inline and in an expanded popup.

**Basic gallery with text items:**
```cshtml
items.Type(RibbonItemType.Gallery).GallerySettings(gallery =>
{
    gallery.ItemCount(3).Groups(galleryGroups =>
    {
        galleryGroups.Header("Styles").Items(galleryItems =>
        {
            galleryItems.Content("Normal").Add();
            galleryItems.Content("No Spacing").Add();
            galleryItems.Content("Heading 1").Add();
            galleryItems.Content("Heading 2").Add();
        }).Add();
    });
}).Add();
```

**Gallery with icons:**
```cshtml
galleryGroups.Header("Transitions").Items(galleryItems =>
{
    galleryItems.Content("None").IconCss("e-icons e-rectangle").Add();
    galleryItems.Content("Fade").IconCss("e-icons e-send-backward").Add();
    galleryItems.Content("Reveal").IconCss("e-icons e-bring-forward").Add();
    galleryItems.Content("Zoom").IconCss("e-icons e-zoom-to-fit").Add();
}).Add();
```

**Key Gallery properties:**

| Property | Description |
|---|---|
| `ItemCount` | Number of items visible inline; default `3` |
| `SelectedItemIndex` | Index of initially selected item |
| `PopupWidth` | CSS width of popup, e.g. `"350"` |
| `PopupHeight` | CSS height of popup, e.g. `"180"` |
| `Template` | JS template selector for item rendering |
| `PopupTemplate` | JS template selector for popup item rendering |

**Group-level properties:**

| Property | Description |
|---|---|
| `Header` | Group header label in popup |
| `ItemWidth` | CSS width of each item cell, e.g. `"100"` |
| `ItemHeight` | CSS height of each item cell, e.g. `"30"` |
| `CssClass` | Custom CSS class for group styling |

**Item-level properties:**

| Property | Description |
|---|---|
| `Content` | Text label |
| `IconCss` | Icon CSS class |
| `Disabled` | Disable interaction; default `false` |
| `CssClass` | Custom CSS class for individual item |
| `HtmlAttributes` | Dictionary of HTML attributes (e.g., `title`) |

---

## Template (Custom Items)

Render arbitrary HTML using `ItemTemplate`. The `${activeSize}` token gives the current size class (`Large`, `Medium`, or `Small`).

```cshtml
items.Type(RibbonItemType.Template)
    .ItemTemplate("<span class='ribbonTemplate ${activeSize}'><span class='e-icons e-video'></span><span class='text'>Video</span></span>")
    .Add();
```

```css
.ribbonTemplate { display: flex; align-items: center; justify-content: center; cursor: pointer; }
.ribbonTemplate.Large { flex-direction: column; }
.ribbonTemplate.Large .e-icons { font-size: 35px; }
.ribbonTemplate.Medium .e-icons, .ribbonTemplate.Small .e-icons { font-size: 20px; margin: 15px 5px; }
.ribbonTemplate.Small .text { display: none; }
```

---

## Display Options

Control which layout renders an item using `DisplayOptions`:

| Mode | Behavior |
|---|---|
| `Auto` (default) | Shown in all layouts based on overflow state |
| `Classic` | Only shown in Classic layout |
| `Simplified` | Only shown in Simplified layout |
| `Overflow` | Only shown in the overflow popup |

```cshtml
// Show only in classic layout
items.Type(RibbonItemType.Button).DisplayOptions(Syncfusion.EJ2.Ribbon.DisplayMode.Classic)
    .ButtonSettings(b => { b.IconCss("e-icons e-cut").Content("Cut"); }).Add();

// Show only in simplified layout
items.Type(RibbonItemType.ColorPicker).AllowedSizes(RibbonItemSize.Small)
    .DisplayOptions(Syncfusion.EJ2.Ribbon.DisplayMode.Simplified)
    .ColorPickerSettings(cp => { cp.Value("#123456"); }).Add();
```

---

## Item Size Control

**`AllowedSizes`** — locks an item to specific size(s), preventing resize:
```cshtml
items.Type(RibbonItemType.SplitButton).AllowedSizes(RibbonItemSize.Large)  // always large
items.Type(RibbonItemType.Button).AllowedSizes(RibbonItemSize.Medium)       // always medium
items.Type(RibbonItemType.Button).AllowedSizes(RibbonItemSize.Small)        // always small
```

**`ActiveSize`** — sets the initial size before first resize. Updates automatically during resize based on `AllowedSizes` constraints. Default is `Medium`.

Classic layout resize order: `Large → Medium → Small` (collapse) and `Small → Medium → Large` (expand).

---

## Disabling Items

Set `Disabled(true)` on any item to prevent user interaction:

```cshtml
items.Type(RibbonItemType.Button).Disabled(true).ButtonSettings(button =>
{
    button.IconCss("e-icons e-cut").Content("Cut");
}).Add();

items.Type(RibbonItemType.CheckBox).Disabled(true).CheckBoxSettings(checkBox =>
{
    checkBox.Checked(true).Label("Ruler");
}).Add();
```
