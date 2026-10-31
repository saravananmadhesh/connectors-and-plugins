# Smart Editing Features

## Table of Contents
- [Mention Support (@ Tagging)](#mention-support--tagging)
- [Emoji Picker](#emoji-picker)
- [Slash Commands Menu](#slash-commands-menu)
- [Mail Merge Fields](#mail-merge-fields)

---

## Mention Support (@ Tagging)

Integrate the Syncfusion **Mention** control with the RTE to allow users to tag people or objects by typing `@`. Works in both HTML and Markdown modes.

**How it works:**
- Set the Mention's `Target` to the RTE's editable content ID
- Append `_editable-content` to the RTE's ID as the target selector
- For **HTML mode** use `#rteId_rte-edit-view`; for **Markdown mode** use `#rteId_editable-content`

### HTML Mode Mention

```cshtml
@using Syncfusion.EJ2.DropDowns
@using Syncfusion.EJ2.RichTextEditor

@(Html.EJS().RichTextEditor("rteHtml").Value(ViewBag.value).Render())

@Html.EJS().Mention("mention")
    .Target("#rteHtml_rte-edit-view")
    .DataSource((IEnumerable<object>)ViewBag.mentionData)
    .Fields(new MentionFieldSettings { Text = "Name" })
    .DisplayTemplate("<span>@@${Name}</span>")
    .Render()
```

### Markdown Mode Mention

```cshtml
@(Html.EJS().RichTextEditor("rteMd")
    .EditorMode(Syncfusion.EJ2.RichTextEditor.EditorMode.Markdown)
    .Value(ViewBag.value)
    .Render())

@Html.EJS().Mention("mentionMd")
    .Target("#rteMd_editable-content")
    .DataSource((IEnumerable<object>)ViewBag.mentionData)
    .Fields(new MentionFieldSettings { Text = "Name" })
    .DisplayTemplate("[@@${Name}](mailto:${Email})")
    .Render()
```

### Controller Setup

```csharp
public ActionResult Index()
{
    ViewBag.mentionData = new List<object> {
        new { Name = "Alice Johnson", Email = "alice@example.com" },
        new { Name = "Bob Smith", Email = "bob@example.com" },
        new { Name = "Carol White", Email = "carol@example.com" }
    };
    ViewBag.value = "Hello, type @ to mention someone.";
    return View();
}
```

### Customizable Mention Properties

| Property | Description |
|----------|-------------|
| `AllowSpaces` | Continue search after space following `@` |
| `SuggestionCount` | Max items shown in dropdown |
| `ItemTemplate` | Custom HTML template for each suggestion item |
| `PopupWidth` / `PopupHeight` | Dimensions of the suggestion popup |
| `SortOrder` | Sort suggestion list (Ascending/Descending) |

---

## Emoji Picker

Add `EmojiPicker` to the toolbar to let users insert emojis into the editor content:

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .ToolbarSettings(e => e.Items((object)new[] {
        "Bold", "Italic", "|", "EmojiPicker", "|", "Undo", "Redo"
    }))
    .Value(ViewBag.value)
    .Render())
```

Clicking the emoji button opens a searchable emoji popup. Selected emoji is inserted at the cursor position.

---

## Slash Commands Menu

The Slash Menu gives users a command palette triggered by typing `/` at the start of a line. This provides quick access to formatting blocks (Heading, List, Quote, Table, etc.) without touching the toolbar. The slash menu only works in HTML mode, not Markdown mode.

### Basic Slash Menu

Enable with default built-in commands:

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .SlashMenuSettings(s => s.Enable(true))
    .Value(ViewBag.value)
    .Render())
```

### Customizing Built-in Slash Commands

Select specific built-in commands to show:

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .SlashMenuSettings(s => s
        .Enable(true)
        .Items(new object[] { 
            "Paragraph", "Heading 1", "Heading 2", "Heading 3", "Heading 4",
            "OrderedList", "UnorderedList", "CodeBlock", "Blockquote",
            "Link", "Image", "Video", "Audio", "Table"
        })
    )
    .Value(ViewBag.value)
    .Render())
```

### Custom Slash Menu Items with Event Handlers

Add custom commands using anonymous objects and handle selection via the `SlashMenuItemSelect` event:

```cshtml
@(Html.EJS().RichTextEditor("mentionInlineFormat")
    .Placeholder("Type '/' and choose format")
    .Created("created")
    .ToolbarSettings(e => e.Items((object)ViewData["Items"]))
    .SlashMenuSettings((Syncfusion.EJ2.RichTextEditor.RichTextEditorSlashMenuSettings)ViewData["SlashMenuSettings"])
    .SlashMenuItemSelect("slashMenuItemSelect")
    .Render())

<script>
    var rteObj;
    
    // Pre-defined content templates
    const meetingNotes = '<p><strong>Meeting Notes</strong></p><table class="e-rte-table" style="width: 100%; min-width: 0px; height: 150px;"> <tbody> <tr style="height: 20%;"> <td style="width: 50%;"><strong>Attendees</strong></td> <td style="width: 50%;" class=""><br></td> </tr> <tr style="height: 20%;"> <td style="width: 50%;"><strong>Date &amp; Time</strong></td> <td style="width: 50%;"><br></td> </tr> <tr style="height: 20%;"> <td style="width: 50%;"><strong>Agenda</strong></td> <td style="width: 50%;"><br></td> </tr> <tr style="height: 20%;"> <td style="width: 50%;"><strong>Discussed Items</strong></td> <td style="width: 50%;"><br></td> </tr> <tr style="height: 20%;"> <td style="width: 50%;"><strong>Action Items</strong></td> <td style="width: 50%;"><br></td> </tr> </tbody> </table>';

    const signature = '<p><br></p><p>Warm regards,</p><p>John Doe<br>Event Coordinator<br>ABC Company</p>';

    function created() {
        rteObj = this;
    }

    function slashMenuItemSelect(args) {
        if (args.itemData.command === "MeetingNotes") {
            rteObj.executeCommand("insertHTML", meetingNotes, { undo: true });
        }
        if (args.itemData.command === "Signature") {
            rteObj.executeCommand("insertHTML", signature, { undo: true });
        }
    }
</script>
```

**Controller Setup (C#):**

```csharp
public ActionResult Index()
{
    ViewData["SlashMenuSettings"] = new Syncfusion.EJ2.RichTextEditor.RichTextEditorSlashMenuSettings
    {
        Enable = true,
        Items = new object[] { 
            "Paragraph", "Heading 1", "Heading 2", "Heading 3", "Heading 4", 
            "OrderedList", "UnorderedList", "CodeBlock", "Blockquote", 
            "Link", "Image", "Video", "Audio", "Table", "Emojipicker",
            // Custom items
            new {
                text = "Meeting notes",
                description = "Insert a meeting note template.",
                iconCss = "e-icons e-description",
                type = "Custom",
                command = "MeetingNotes"
            },
            new {
                text = "Signature",
                description = "Insert a signature template.",
                iconCss = "e-icons e-signature",
                type = "Custom",
                command = "Signature"
            }
        }
    };

    ViewData["Items"] = new[] { "Bold", "Italic", "Underline", "|", "Undo", "Redo" };
    
    return View();
}
```

### Custom Item Properties

When defining custom slash menu items as anonymous objects:

| Property | Type | Description |
|----------|------|-------------|
| `text` | string | Display text for the menu item |
| `description` | string | Tooltip or description shown below text |
| `iconCss` | string | CSS class for the icon (e.g., `e-icons e-description`) |
| `type` | string | Set to `"Custom"` for custom items |
| `command` | string | Unique command identifier to match in the `SlashMenuItemSelect` event |

**Note:** The slash menu only works in HTML mode, not Markdown mode.

---

## Mail Merge Fields

Mail Merge lets you insert placeholder fields into the editor content that can be replaced with dynamic data at generation time. Useful for email templates, letter generation, and document automation.

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .ToolbarSettings(e => e.Items((object)new[] {
        "Bold", "Italic", "|", "CreateLink", "Image", "|", "Undo", "Redo"
    }))
    .Value(ViewBag.value)
    .Render())
```

Integrate a `DropDownList` or `ComboBox` outside the editor as a field inserter, then use `executeCommand` to insert the field placeholder at the cursor:

```javascript
var rteObj = document.getElementById('rte').ej2_instances[0];

// Insert a merge field at the current cursor position
function insertMergeField(fieldName) {
    rteObj.focusIn();
    rteObj.executeCommand('insertHTML', '<span class="merge-field">{{' + fieldName + '}}</span>');
}
```

```csharp
// Fields to expose as merge candidates
ViewBag.mergeFields = new[] {
    "FirstName", "LastName", "Company", "Email", "Address"
};
```
