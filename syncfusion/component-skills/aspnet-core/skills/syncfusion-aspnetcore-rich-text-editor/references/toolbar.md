# Toolbar Configuration

## Table of Contents
- [Toolbar Types](#toolbar-types)
- [Sticky Floating Toolbar](#sticky-floating-toolbar)
- [Toolbar Position](#toolbar-position)
- [Quick Toolbars](#quick-toolbars)
- [HTML Mode Toolbar Items Reference](#html-mode-toolbar-items-reference)
- [Markdown Mode Toolbar Items Reference](#markdown-mode-toolbar-items-reference)

---

## Toolbar Types

Configure the toolbar layout with the `type` field in `toolbarSettings`. Choose the type that fits your available space.

| Type | Behaviour | Use when |
|------|-----------|----------|
| `Expand` (default) | Overflowing items collapse into an expand button | Standard editors with limited width |
| `MultiRow` | All items wrap across multiple rows | You want all tools always visible |
| `Scrollable` | Single row with horizontal scroll | Mobile-friendly or compact UIs |
| `Popup` | Overflow items go into a popup | Tight space, clean look |

### Expand Toolbar

```razor
<ejs-richtexteditor id="editor" value="@ViewBag.value">
    <e-richtexteditor-toolbarsettings type="Expand" items="@ViewBag.items">
    </e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>
```

### MultiRow Toolbar

```razor
<ejs-richtexteditor id="editor" value="@ViewBag.value">
    <e-richtexteditor-toolbarsettings type="MultiRow" items="@ViewBag.items">
    </e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>
```

### Scrollable Toolbar

```razor
<ejs-richtexteditor id="editor" value="@ViewBag.value">
    <e-richtexteditor-toolbarsettings type="Scrollable" items="@ViewBag.items">
    </e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>
```

### Popup Toolbar

```razor
<ejs-richtexteditor id="editor" value="@ViewBag.value">
    <e-richtexteditor-toolbarsettings type="Popup"></e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>
```

All toolbar types accept the same `items` array.

---

## Sticky Floating Toolbar

By default, the toolbar sticks to the top of the viewport as the user scrolls. Customize or disable this:

```razor
<!-- Disable floating; keep toolbar fixed to editor top -->
<ejs-richtexteditor id="editor" value="@ViewBag.value">
    <e-richtexteditor-toolbarsettings type="MultiRow" enableFloating="false">
    </e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>
```

```razor
<!-- Set offset from top of page (e.g. for a fixed header 60px tall) -->
<ejs-richtexteditor id="editor" floatingToolbarOffset="60" value="@ViewBag.value">
</ejs-richtexteditor>
```

Toggle floating at runtime via JavaScript:

```javascript
function toggleFloating(enable) {
    var rte = document.getElementById('editor').ej2_instances[0];
    rte.toolbarSettings.enableFloating = enable;
    rte.dataBind();
}
```

---

## Toolbar Position

Place the toolbar at the bottom instead of the top:

```razor
<ejs-richtexteditor id="editor" value="@ViewBag.value">
    <e-richtexteditor-toolbarsettings position="Bottom" items="@ViewBag.items">
    </e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>
```

---

## Quick Toolbars

Quick toolbars are context-sensitive toolbars that appear when the user selects or focuses specific elements (images, links, text, tables).

### Image Quick Toolbar

```razor
<ejs-richtexteditor id="editor" value="@ViewBag.value">
    <e-richtexteditor-toolbarsettings items="@ViewBag.items"></e-richtexteditor-toolbarsettings>
    <e-richtexteditor-quicktoolbarsettings image="@ViewBag.imageTools">
    </e-richtexteditor-quicktoolbarsettings>
</ejs-richtexteditor>
```

```csharp
ViewBag.imageTools = new[] {
    "Replace", "Align", "Caption", "Remove",
    "InsertLink", "OpenImageLink", "|",
    "EditImageLink", "RemoveImageLink",
    "Display", "AltText", "Dimension"
};
```

### Link Quick Toolbar

```razor
<e-richtexteditor-quicktoolbarsettings link="@ViewBag.linkTools">
</e-richtexteditor-quicktoolbarsettings>
```

```csharp
ViewBag.linkTools = new[] { "Open", "Edit", "UnLink" };
```

### Text Quick Toolbar

```razor
<e-richtexteditor-quicktoolbarsettings text="@ViewBag.textTools">
</e-richtexteditor-quicktoolbarsettings>
```

```csharp
ViewBag.textTools = new[] { "Bold", "Italic", "Underline" };
```

### Table Quick Toolbar

```razor
<e-richtexteditor-quicktoolbarsettings table="@ViewBag.tableTools">
</e-richtexteditor-quicktoolbarsettings>
```

```csharp
ViewBag.tableTools = new[] {
    "TableHeader", "TableRows", "TableColumns", "TableCell",
    "-", "BackgroundColor", "TableRemove",
    "TableCellVerticalAlign", "Styles"
};
```

---

## HTML Mode Toolbar Items Reference

Complete list of built-in items for HTML mode:

**Text styling:** `Bold`, `Italic`, `Underline`, `StrikeThrough`, `InlineCode`, `SubScript`, `SuperScript`, `LowerCase`, `UpperCase`

**Font:** `FontName`, `FontSize`, `FontColor`, `BackgroundColor`

**Paragraph:** `Formats`, `Alignments`, `Blockquote`, `OrderedList`, `UnorderedList`, `Indent`, `Outdent`

**Insert:** `CreateLink`, `Image`, `Video`, `Audio`, `CreateTable`, `EmojiPicker`

**Code/Source:** `SourceCode`, `FullScreen`, `Print`

**Formatting tools:** `ClearFormat`, `FormatPainter`, `RemoveFormat`

**History:** `Undo`, `Redo`

**Separators:** `|` (vertical), `-` (horizontal)

**AI:** `AICommands`, `AIQuery`

---

## Markdown Mode Toolbar Items Reference

Supported items in Markdown mode (HTML-specific items are not applicable):

**Text styling:** `Bold`, `Italic`, `StrikeThrough`, `InlineCode`, `SubScript`, `SuperScript`, `LowerCase`, `UpperCase`

**Paragraph:** `Formats`, `Blockquote`, `OrderedList`, `UnorderedList`

**Insert:** `CreateLink`, `Image`, `CreateTable`

**History:** `Undo`, `Redo`

**Separators:** `|`, `-`

> Toolbar items that produce HTML output (e.g., `FontColor`, `Alignments`, `SourceCode`) are not meaningful in Markdown mode and should be omitted from the items array.
