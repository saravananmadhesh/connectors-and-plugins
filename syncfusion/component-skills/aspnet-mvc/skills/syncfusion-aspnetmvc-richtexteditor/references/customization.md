# Customization and Advanced

## Table of Contents
- [Custom CSS and Style Encapsulation](#custom-css-and-style-encapsulation)
- [Placeholder Text](#placeholder-text)
- [Globalization and RTL Support](#globalization-and-rtl-support)
- [Third-Party Library Integration](#third-party-library-integration)
- [Adding Google Fonts](#adding-google-fonts)
- [RTE Inside a Dialog](#rte-inside-a-dialog)
- [RTE Inside a Tab](#rte-inside-a-tab)

---

## Custom CSS and Style Encapsulation

**Apply custom styles to the editor content:**

Add a `CssClass` to the RTE and write styles targeting that class:

```cshtml
@(Html.EJS().RichTextEditor("editor")
    .CssClass("custom-rte")
    .Value(ViewBag.value)
    .Render())

<style>
    .custom-rte .e-content p {
        font-family: 'Georgia', serif;
        line-height: 1.8;
        color: #333;
    }
    .custom-rte .e-rte-toolbar {
        background-color: #f0f4f8;
    }
</style>
```

**Style encapsulation with IFrame mode:**

When using `IframeSettings`, inject custom styles directly into the iframe document:

```cshtml
@(Html.EJS().RichTextEditor("editor")
    .IframeSettings(s => s
        .Enable(true)
        .Resources(r => r.Styles(new[] { "/Content/rte-iframe.css" }))
    )
    .Render())
```

Create `/Content/rte-iframe.css` with styles that will only apply inside the editor frame — not leaking to the parent page.

---

## Placeholder Text

Show placeholder text when the editor is empty:

```cshtml
@(Html.EJS().RichTextEditor("editor")
    .Placeholder("Start typing your content here...")
    .Render())
```

**Custom placeholder styling:**

```cshtml
@(Html.EJS().RichTextEditor("editor")
    .Placeholder("Start typing...")
    .CssClass("styled-placeholder")
    .Render())

<style>
    .styled-placeholder.e-richtexteditor .e-rte-placeholder {
        font-style: italic;
        color: #aaa;
        font-size: 14px;
    }
</style>
```

---

## Globalization and RTL Support

**Set locale for UI strings (e.g., toolbar tooltips, dialog labels):**

```cshtml
@(Html.EJS().RichTextEditor("editor")
    .Locale("ar")
    .EnableRtl(true)
    .Value(ViewBag.value)
    .Render())
```

Load the locale file in your layout or view:

```cshtml
<script src="https://cdn.syncfusion.com/ej2/33.1.45/dist/ej2.min.js"></script>
<script>
    ej.base.L10n.load({
        'ar': {
            'rich-text-editor': {
                'alignments': 'محاذاة',
                'justifyLeft': 'محاذاة إلى اليسار',
                'justifyCenter': 'محاذاة للمركز',
                'justifyRight': 'محاذاة إلى اليمين',
                'justifyFull': 'محاذاة كاملة',
                'bold': 'غامق',
                'italic': 'مائل',
                'underline': 'تسطير',
                'strikethrough': 'يتوسطه خط'
            }
        }
    });
</script>
```

**RTL only (no locale change):**

```cshtml
@(Html.EJS().RichTextEditor("editor")
    .EnableRtl(true)
    .Render())
```

---

## Third-Party Library Integration

The RTE can integrate with third-party libraries for spell checking, code highlighting, or Markdown rendering.

**Prism.js for code block syntax highlighting:**

```cshtml
@(Html.EJS().RichTextEditor("editor")
    .Created("highlightCode")
    .Change("highlightCode")
    .Render())

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>

<script>
    function highlightCode() {
        Prism.highlightAll();
    }
</script>
```

---

## Adding Google Fonts

Make Google Fonts available in the `FontName` dropdown:

**Step 1 — Import the font in `_Layout.cshtml`:**

```cshtml
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Playfair+Display&display=swap" />
```

**Step 2 — Add to font list in the view:**

```cshtml
@(Html.EJS().RichTextEditor("editor")
    .FontFamily(e => e.Default("Roboto").Items((object)ViewBag.fontItems))
    .ToolbarSettings(e => e.Items((object)new[] { "FontName" }))
    .Render())
```

```csharp
ViewBag.fontItems = new[] {
    new { text = "Roboto",            value = "Roboto, sans-serif" },
    new { text = "Playfair Display",  value = "'Playfair Display', serif" },
    new { text = "Arial",             value = "Arial, Helvetica, sans-serif" },
    new { text = "Times New Roman",   value = "'Times New Roman', Times, serif" }
};
```

---

## RTE Inside a Dialog

When placing the RTE inside a Syncfusion Dialog, call `refreshUI()` after the dialog opens to ensure proper rendering:

```cshtml
@(Html.EJS().Dialog("dialog")
    .Header("Content Editor")
    .Width("600px")
    .Visible(false)
    .Open("onDialogOpen")
    .ContentTemplate(@<div>
        @(Html.EJS().RichTextEditor("rteInDialog")
            .Value(ViewBag.value)
            .Render())
    </div>)
    .Render())

<button onclick="openDialog()">Open Editor</button>

<script>
    function openDialog() {
        var dialogObj = document.getElementById('dialog').ej2_instances[0];
        dialogObj.show();
    }

    function onDialogOpen() {
        var rteObj = document.getElementById('rteInDialog').ej2_instances[0];
        rteObj.refreshUI();
    }
</script>
```

---

## RTE Inside a Tab

Similarly, call `refreshUI()` when the tab containing the RTE becomes active:

```cshtml
@(Html.EJS().Tab("tab")
    .Selected("onTabSelected")
    .Items(items => {
        items.Header(h => h.Text("Details")).Content(@<div>
            @(Html.EJS().RichTextEditor("rteInTab").Value(ViewBag.value).Render())
        </div>).Add();
    })
    .Render())

<script>
    function onTabSelected(args) {
        if (args.selectedIndex === 0) { // adjust index for your tab
            var rteObj = document.getElementById('rteInTab').ej2_instances[0];
            if (rteObj) {
                rteObj.refreshUI();
            }
        }
    }
</script>
```

> `refreshUI()` recalculates the editor's dimensions and toolbar layout. Always call it after showing a hidden container (dialog, tab, accordion) that holds an RTE.
