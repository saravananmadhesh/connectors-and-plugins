# Popup Items – ASP.NET Core SplitButton

## Table of Contents
- [Defining Popup Items](#defining-popup-items)
- [Item Properties](#item-properties)
- [Item Templating with beforeItemRender](#item-templating-with-beforeitemrender)
- [Popup Templating with target](#popup-templating-with-target)
- [Grouping Items Using ListView](#grouping-items-using-listview)

---

## Defining Popup Items

Pass an array of item objects to the `items` property. Each object represents one popup action item.

**Controller:**
```csharp
public ActionResult Index()
{
    List<object> items = new List<object>();
    items.Add(new { text = "Cut" });
    items.Add(new { text = "Copy" });
    items.Add(new { text = "Paste" });
    ViewBag.items = items;
    return View();
}
```

**View:**
```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"></ejs-splitbutton>
```

---

## Item Properties

Each item object supports the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `text` | string | Display text of the item |
| `iconCss` | string | CSS class for the item icon |
| `id` | string | Unique identifier for the item |
| `url` | string | Navigation URL when item is clicked |
| `disabled` | bool | Disables the individual item |
| `separator` | bool | Renders a separator line instead of a clickable item |

```csharp
items.Add(new { text = "Cut",    iconCss = "e-sb-icons e-cut" });
items.Add(new { text = "Copy",   iconCss = "e-icons e-copy", id = "copy-item" });
items.Add(new { text = "Save",   url = "/save", disabled = true });
items.Add(new { separator = true });
items.Add(new { text = "Paste",  iconCss = "e-sb-icons e-paste" });
```

---

## Item Templating with beforeItemRender

Customize each popup item's HTML at render time by handling the `beforeItemRender` event. The event argument exposes the item data and the rendered `<li>` element, so you can modify content, add attributes, or inject custom HTML.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    beforeItemRender="onBeforeItemRender"></ejs-splitbutton>

<script>
    function onBeforeItemRender(args) {
        // args.item  – the item data object
        // args.element – the rendered <li> DOM element
        if (args.item.text === 'Copy') {
            // Add a badge to the Copy item
            var badge = document.createElement('span');
            badge.className = 'e-badge e-badge-primary';
            badge.innerText = 'New';
            args.element.appendChild(badge);
        }
    }
</script>
```

**Underline a character** (e.g., underline "C" in "Copy"):
```javascript
function onBeforeItemRender(args) {
    if (args.item.text === 'Copy') {
        args.element.innerHTML = '<u>C</u>opy';
    }
}
```

---

## Popup Templating with target

Replace the entire popup content with any HTML element by setting the `target` property to the element's CSS selector. This lets you render custom HTML, a ListView, a grid, or any component inside the popup.

```cshtml
<!-- Custom popup content -->
<ul id="customPopup">
    <li class="e-item">Option A</li>
    <li class="e-item">Option B</li>
</ul>

<ejs-splitbutton id="element" content="SplitButton"
    target="#customPopup"></ejs-splitbutton>
```

> When `target` is used, the `items` property is ignored and the referenced element is rendered as the popup body.

---

## Grouping Items Using ListView

Use a Syncfusion ListView with grouping enabled as the `target` of the SplitButton to show grouped popup items.

**Controller:**
```csharp
public ActionResult GroupItems()
{
    List<object> listItems = new List<object>();
    listItems.Add(new { text = "Cut",   category = "Clipboard" });
    listItems.Add(new { text = "Copy",  category = "Clipboard" });
    listItems.Add(new { text = "Paste", category = "Clipboard" });
    listItems.Add(new { text = "Bold",  category = "Format" });
    listItems.Add(new { text = "Italic",category = "Format" });
    ViewBag.listItems = listItems;
    return View();
}
```

**View:**
```cshtml
<!-- ListView as popup target -->
<ejs-listview id="listview" dataSource="ViewBag.listItems"
    fields="@(new Syncfusion.EJ2.Lists.ListViewFieldSettings { Text = "text", GroupBy = "category" })">
</ejs-listview>

<ejs-splitbutton id="element" content="Clipboard"
    target="#listview"></ejs-splitbutton>
```

The ListView's grouped items are rendered inside the SplitButton popup, providing a visual category structure without needing the standard `items` array.
