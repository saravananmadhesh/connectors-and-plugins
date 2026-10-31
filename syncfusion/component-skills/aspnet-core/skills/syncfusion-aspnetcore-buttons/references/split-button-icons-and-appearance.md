# Icons and Appearance – ASP.NET Core SplitButton

## Table of Contents
- [SplitButton Icons](#splitbutton-icons)
- [Icon Position](#icon-position)
- [Vertical Button Layout](#vertical-button-layout)
- [Icons on Popup Items](#icons-on-popup-items)
- [Separator Between Popup Items](#separator-between-popup-items)
- [Style and Appearance CSS Classes](#style-and-appearance-css-classes)
- [Theme Studio Customization](#theme-studio-customization)

---

## SplitButton Icons

Use the `iconCss` property to add an icon to the primary button. Set it to `e-icons` with the required icon CSS class.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    iconCss="e-sb-icons e-paste"></ejs-splitbutton>
```

> EJ2 provides a built-in icon set loadable with `e-icons`. Third-party icon fonts (e.g., Font Awesome) can also be used with `iconCss`.

---

## Icon Position

By default the icon appears on the **left** side of the button text. Use `iconPosition` to move it to the **top**.

| Value | Behavior |
|-------|----------|
| `Left` (default) | Icon to the left of the text |
| `Top` | Icon above the text |

```cshtml
<!-- Left icon (default) -->
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    iconCss="e-sb-icons e-paste"></ejs-splitbutton>

<!-- Top icon -->
<ejs-splitbutton id="element1" content="Paste" items="ViewBag.items"
    iconCss="e-sb-icons e-paste" iconPosition="Top"></ejs-splitbutton>
```

---

## Vertical Button Layout

To render the SplitButton vertically (icon stacked above text), add `e-vertical` via the `cssClass` property.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    iconCss="e-sb-icons e-paste" cssClass="e-vertical"></ejs-splitbutton>
```

---

## Icons on Popup Items

Each popup item object can include `iconCss` to render an icon beside the item text.

**Controller:**
```csharp
public ActionResult Index()
{
    List<object> items = new List<object>();
    items.Add(new { text = "Cut",   iconCss = "e-sb-icons e-cut" });
    items.Add(new { text = "Copy",  iconCss = "e-icons e-copy" });
    items.Add(new { text = "Paste", iconCss = "e-sb-icons e-paste" });
    ViewBag.items = items;
    return View();
}
```

**View:**
```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    iconCss="e-sb-icons e-paste"></ejs-splitbutton>
```

---

## Separator Between Popup Items

Add a visual separator line between popup items by inserting an item object with `separator = true`.

```csharp
items.Add(new { text = "Cut",   iconCss = "e-sb-icons e-cut" });
items.Add(new { text = "Copy",  iconCss = "e-icons e-copy" });
items.Add(new { text = "Paste", iconCss = "e-sb-icons e-paste" });
items.Add(new { separator = true });   // separator line
items.Add(new { text = "Paste Special", iconCss = "e-sb-icons e-pastespecial" });
```

```cshtml
<ejs-splitbutton id="separator" content="Edit" items="ViewBag.items"
    iconCss="e-sb-icons e-edit"></ejs-splitbutton>
```

---

## Style and Appearance CSS Classes

Override these CSS classes to customize the SplitButton appearance:

| CSS Class | Purpose |
|-----------|---------|
| `.e-dropdown-btn` | Customizes the primary button part |
| `.e-split-btn` | Customizes the dropdown arrow part |
| `.e-dropdown-popup ul .e-item` | Customizes popup list items |
| `.e-dropdown-popup ul .e-item .e-menu-icon` | Customizes popup list item icons |

**Example – change primary button background:**
```css
.e-dropdown-btn {
    background-color: #0078d4;
    color: #ffffff;
}
```

Multiple CSS classes can be applied at once using `cssClass` (space-separated):
```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    cssClass="e-small my-custom-class"></ejs-splitbutton>
```

---

## Theme Studio Customization

Generate a custom theme with your own color palette at [Syncfusion Theme Studio](https://ej2.syncfusion.com/themestudio/?theme=material) and replace the CDN stylesheet reference with the downloaded CSS file.
