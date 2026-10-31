# Smart Editing Features

## Table of Contents
- [Emoji Picker](#emoji-picker)
- [Slash Menu](#slash-menu)
- [Mentions Integration](#mentions-integration)
- [Mail Merge](#mail-merge)
- [Format Painter](#format-painter)
- [Code Block Formatting](#code-block-formatting)

---

## Emoji Picker

The emoji picker lets users search and insert emojis directly into the editor content.

Add `EmojiPicker` to the toolbar items:

```csharp
ViewBag.items = new[] {
    "Bold", "Italic", "|", "EmojiPicker", "|", "Undo", "Redo"
};
```

```razor
<ejs-richtexteditor id="editor" value="@ViewBag.value">
    <e-richtexteditor-toolbarsettings items="@ViewBag.items">
    </e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>
```

Clicking the emoji icon opens a searchable popup. Users can type to filter emojis by name.

---

## Slash Menu

The slash menu (also called a command menu) appears when the user types `/` at the start of a line. It provides a quick list of formatting and insertion commands without needing the toolbar.

Add `SlashMenu` to the toolbar items to enable it:

```csharp
ViewBag.items = new[] {
    "Bold", "Italic", "|", "SlashMenu", "|", "Undo", "Redo"
};
```

Users type `/` followed by a command keyword (e.g., `/heading`, `/table`, `/image`) to filter and apply the action.

---

## Mentions Integration

Integrate the Syncfusion Mention component to allow users to tag people or items using the `@` character. Mention is a separate component that targets the editor's editable area.

### Basic Setup

```razor
@{
    List<EmployeeData> data = new EmployeeData().EmployeeList();
}

<ejs-richtexteditor id="rte-mention"
    placeholder="Type @@ to mention a user"
    value="@ViewBag.value">
</ejs-richtexteditor>

<!-- Target the RTE's editable div using the pattern: {editor-id}_rte-edit-view -->
<ejs-mention id="mention"
    target="#rte-mention_rte-edit-view"
    dataSource="@data"
    suggestionCount="8">
    <e-mention-fields text="Name" Value="EmailId"></e-mention-fields>
</ejs-mention>
```

```csharp
public class EmployeeData
{
    public string Name { get; set; }
    public string EmailId { get; set; }

    public List<EmployeeData> EmployeeList() => new List<EmployeeData>
    {
        new EmployeeData { Name = "Alice Johnson", EmailId = "alice@example.com" },
        new EmployeeData { Name = "Bob Smith", EmailId = "bob@example.com" },
        new EmployeeData { Name = "Carol White", EmailId = "carol@example.com" }
    };
}
```

> **Target ID rule:** Always append `_rte-edit-view` to the editor's `id`. If the editor `id` is `rte-mention`, the target selector is `#rte-mention_rte-edit-view`.

### Controlling Suggestion Trigger

```razor
<ejs-mention id="mention"
    target="#rte-mention_rte-edit-view"
    dataSource="@data"
    minLength="2"
    suggestionCount="5">
    <e-mention-fields text="Name" Value="EmailId"></e-mention-fields>
</ejs-mention>
```

- `minLength` — number of characters to type after `@` before the suggestion list appears (default: 0)
- `suggestionCount` — maximum number of items shown (default: 25)

### Custom Item Template and Display Template

```razor
<ejs-mention id="mention"
    target="#rte-mention_rte-edit-view"
    dataSource="@data"
    allowSpaces="true"
    suggestionCount="8"
    displayTemplate="<a href='mailto:${EmailId}' title='${EmailId}'>${Name}</a>"
    itemTemplate="<div><strong>${Name}</strong><br/><small>${EmailId}</small></div>">
    <e-mention-fields text="Name" Value="EmailId"></e-mention-fields>
</ejs-mention>
```

- `itemTemplate` — controls how each suggestion appears in the dropdown list
- `displayTemplate` — controls how the selected mention chip renders in the editor content
- `allowSpaces` — allow space characters while searching after `@`

### Preventing Enter Key from Creating New Lines During Mention

When the mention popup is open, the Enter key should select the item, not create a new line. Handle this with `actionBegin`:

```razor
<ejs-richtexteditor id="rte-mention" actionBegin="onActionBegin">
</ejs-richtexteditor>
<script>
    function onActionBegin(args) {
        if (args.requestType === 'EnterAction') {
            args.cancel = true;
        }
    }
</script>
```

---

## Mail Merge

Mail Merge allows inserting dynamic field placeholders into the editor content that can be replaced with actual values during document generation.

Add `MailMerge` to the toolbar to enable:

```csharp
ViewBag.items = new[] { "Bold", "Italic", "|", "MailMerge", "|", "Undo", "Redo" };
```

Refer to the Syncfusion Mail Merge documentation for data source configuration and field mapping.

---

## Format Painter

Format Painter copies the formatting (font, size, color, styles) from one selection and applies it to another — similar to the Format Painter in Microsoft Word.

Add `FormatPainter` to the toolbar:

```csharp
ViewBag.items = new[] {
    "Bold", "Italic", "Underline", "|",
    "FormatPainter", "|",
    "Undo", "Redo"
};
```

**Usage:**
1. Select formatted text
2. Click Format Painter — cursor changes to a paintbrush
3. Select the target text to apply the formatting
4. Double-click Format Painter to lock it for multiple applications; press Escape to release

---

## Code Block Formatting

The Rich Text Editor supports inserting fenced code blocks. Add `Code` to the `Formats` dropdown or include it as a block format option.

In HTML mode, code blocks render as `<pre><code>` elements. For syntax-highlighted code blocks, integrate CodeMirror (see `references/customization.md`).

```razor
<ejs-richtexteditor id="editor" value="@ViewBag.value">
    <e-richtexteditor-toolbarsettings items="@ViewBag.items">
    </e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>
```

```csharp
ViewBag.items = new[] { "Formats", "Bold", "Italic", "SourceCode", "Undo", "Redo" };
```

> The `Formats` dropdown includes "Code" as a block format option that wraps selected content in a `<pre>` element.
