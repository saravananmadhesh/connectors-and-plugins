# How-To – ASP.NET Core SplitButton

## Table of Contents
- [Set the Disabled State](#set-the-disabled-state)
- [Enable Right-to-Left (RTL)](#enable-right-to-left-rtl)
- [Open a Dialog on Popup Item Click](#open-a-dialog-on-popup-item-click)
- [Underline a Character in Item Text](#underline-a-character-in-item-text)
- [Group Items in Popup with ListView](#group-items-in-popup-with-listview)

---

## Set the Disabled State

Set the `disabled` property to `true` to prevent user interaction with the entire SplitButton (both the primary button and the dropdown arrow).

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    iconCss="e-sb e-sigma" disabled="true"></ejs-splitbutton>
```

**Controller:**
```csharp
public ActionResult Disabled()
{
    List<object> items = new List<object>();
    items.Add(new { text = "Cut" });
    items.Add(new { text = "Copy" });
    items.Add(new { text = "Paste" });
    ViewBag.items = items;
    return View();
}
```

> To toggle disabled state dynamically via JavaScript, get the component instance and set its `disabled` property:
> ```javascript
> var splitBtn = document.getElementById('element').ej2_instances[0];
> splitBtn.disabled = true;
> ```

---

## Enable Right-to-Left (RTL)

Set `enableRtl="true"` to render the SplitButton in right-to-left direction. This flips the layout so the icon, text, and dropdown arrow align for RTL languages.

```cshtml
<ejs-splitbutton id="rtl" content="Message" items="ViewBag.items"
    iconCss="e-sb e-sigma" enableRtl="true"></ejs-splitbutton>
```

**Controller:**
```csharp
public ActionResult Rtl()
{
    List<object> items = new List<object>();
    items.Add(new { text = "Cut" });
    items.Add(new { text = "Copy" });
    items.Add(new { text = "Paste" });
    ViewBag.items = items;
    return View();
}
```

---

## Open a Dialog on Popup Item Click

Handle the `select` event to detect which popup item was clicked, then open a Dialog component programmatically.

**View:**
```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    select="onItemSelect"></ejs-splitbutton>

<!-- Syncfusion Dialog (hidden by default) -->
<ejs-dialog id="dialog" header="Update" content="Are you sure you want to update?"
    visible="false" showCloseIcon="true" width="300px">
</ejs-dialog>

<script>
    function onItemSelect(args) {
        if (args.item.text === 'Update...') {
            var dialog = document.getElementById('dialog').ej2_instances[0];
            dialog.show();
        }
    }
</script>
```

**Controller:**
```csharp
public ActionResult DialogDemo()
{
    List<object> items = new List<object>();
    items.Add(new { text = "Update..." });
    items.Add(new { text = "Help" });
    items.Add(new { text = "About" });
    ViewBag.items = items;
    return View();
}
```

> Use `args.item.text` or `args.item.id` inside the `select` handler to identify which item was clicked.

---

## Underline a Character in Item Text

Use the `beforeItemRender` event to inject custom HTML into a popup item's content. To underline a specific character, wrap it in a `<u>` tag and assign the result as the element's `innerHTML`.

In the following example, `C` is underlined in the text `Copy`:

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    beforeItemRender="onBeforeItemRender"></ejs-splitbutton>

<script>
    function onBeforeItemRender(args) {
        if (args.item.text === 'Copy') {
            args.element.innerHTML = '<u>C</u>opy';
        }
    }
</script>
```

**Controller:**
```csharp
public ActionResult Underline()
{
    List<object> items = new List<object>();
    items.Add(new { text = "Cut" });
    items.Add(new { text = "Copy" });
    items.Add(new { text = "Paste" });
    ViewBag.items = items;
    return View();
}
```

---

## Group Items in Popup with ListView

Replace the standard popup with a grouped Syncfusion ListView by setting it as the `target` of the SplitButton. This is useful when popup items need category headers.

**Controller:**
```csharp
public ActionResult GroupItems()
{
    List<object> listItems = new List<object>();
    listItems.Add(new { text = "Cut",   category = "Clipboard" });
    listItems.Add(new { text = "Copy",  category = "Clipboard" });
    listItems.Add(new { text = "Paste", category = "Clipboard" });
    listItems.Add(new { text = "Bold",  category = "Font" });
    listItems.Add(new { text = "Italic",category = "Font" });
    ViewBag.listItems = listItems;
    return View();
}
```

**View:**
```cshtml
<!-- ListView element used as popup target -->
<ejs-listview id="listview" dataSource="ViewBag.listItems"
    fields="@(new Syncfusion.EJ2.Lists.ListViewFieldSettings
    {
        Text = "text",
        GroupBy = "category"
    })">
</ejs-listview>

<ejs-splitbutton id="element" content="Clipboard"
    target="#listview"></ejs-splitbutton>
```

> The ListView's `groupBy` field creates visual group headers inside the SplitButton popup.
