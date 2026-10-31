# Inline Content & Styles — Syncfusion ASP.NET MVC Block Editor

## Table of Contents
- [Content Types](#content-types)
- [Text Content](#text-content)
- [Link Content](#link-content)
- [Label Content](#label-content)
- [Mention Content & Users Configuration](#mention-content)
- [Inline Styles](#inline-styles)

---

## Content Types

Each block's `content` array holds one or more inline content items. Use `contentType` to specify the kind:

| contentType | Description |
|---|---|
| `"Text"` | Plain or styled text (default) |
| `"Link"` | Hyperlink |
| `"Code"` | Inline code snippet |
| `"Label"` | Colored label/tag (requires LabelSettings) |
| `"Mention"` | User mention (requires Users collection) |

> If `contentType` is omitted, `Text` is assumed.

---

## Text Content

Plain text within any block:

```csharp
new BlockModel
{
    blockType = "Paragraph",
    content = new List<object>
    {
        new { contentType = "Text", content = "Hello, world!" }
    }
}
```

Multiple inline items in one block (text mixed with links):

```csharp
new BlockModel
{
    blockType = "Paragraph",
    content = new List<object>
    {
        new { contentType = "Text", content = "Visit the " },
        new
        {
            contentType = "Link",
            content = "documentation",
            properties = new { url = "https://ej2.syncfusion.com/documentation" }
        },
        new { contentType = "Text", content = " for more details." }
    }
}
```

---

## Link Content

Set `contentType = "Link"` and provide `url` inside `properties`. Use `openInNewWindow` to control the link target:

```csharp
new BlockModel
{
    blockType = "Paragraph",
    content = new List<object>
    {
        new
        {
            contentType = "Link",
            content = "Syncfusion Documentation",
            properties = new
            {
                url = "https://ej2.syncfusion.com/documentation",
                openInNewWindow = true   // Opens in a new browser tab
            }
        }
    }
}
```

### Link Content Properties

| Property | Type | Description | Default |
|---|---|---|---|
| `url` | string | Destination URL the link navigates to | `""` |
| `openInNewWindow` | bool | Open the link in a new tab/window | `false` |

---

## Label Content

Labels are colored tag indicators. Set `contentType = "Label"` and reference a label by its `labelId` from the `LabelSettings.Items` collection.

### Define LabelSettings

```csharp
using Syncfusion.EJ2.BlockEditor;

public LabelSettings labelSettings { get; set; }

public ActionResult Index()
{
    var labelItems = new List<object>
    {
        new { id = "bug",     text = "Bug",     labelColor = "#ff5252", groupBy = "Status" },
        new { id = "task",    text = "Task",    labelColor = "#90caf9", groupBy = "Status" },
        new { id = "feature", text = "Feature", labelColor = "#81c784", groupBy = "Status" },
        new { id = "high",    text = "High",    labelColor = "#ffab91", groupBy = "Priority" },
        new { id = "medium",  text = "Medium",  labelColor = "#fff59d", groupBy = "Priority" },
        new { id = "low",     text = "Low",     labelColor = "#c5e1a5", groupBy = "Priority" }
    };

    labelSettings = new LabelSettings
    {
        TriggerChar = "#",   // User types # to open label picker; default is "$"
        Items = labelItems
    };

    ViewBag.labelSettings = labelSettings;
    return View();
}
```

### Use Labels in Blocks

```csharp
new BlockModel
{
    blockType = "Paragraph",
    content = new List<object>
    {
        new { contentType = "Text", content = "Fix homepage layout — " },
        new { contentType = "Label", props = new { labelId = "bug" } },
        new { contentType = "Text", content = " " },
        new { contentType = "Label", props = new { labelId = "high" } }
    }
}
```

```razor
@Html.EJS().BlockEditor("block-editor")
    .Blocks((List<BlockModel>)ViewBag.BlocksData)
    .LabelSettings(ViewBag.labelSettings)
    .Render()
```

### Label Item Properties

| Property | Description |
|---|---|
| `id` | Unique identifier referenced in content via `labelId` |
| `text` | Display text inside the label |
| `labelColor` | Background color (HEX) |
| `groupBy` | Category grouping in the picker popup |
| `iconCss` | Optional CSS class for an icon |

---

## Mention Content

Mentions reference users. Set `contentType = "Mention"` and provide the `userId` that matches a user in the `Users` collection configured on the editor. Mentions are triggered by typing `@` while editing.

### Configure the Users Collection

Define a `UserModel` class and pass users via `ViewBag`:

```csharp
using Syncfusion.EJ2.BlockEditor;

public class UserModel
{
    public string id { get; set; }
    public string user { get; set; }
    public string avatarUrl { get; set; }
    public string avatarBgColor { get; set; }
    public string cssClass { get; set; }
}

public ActionResult Index()
{
    var users = new List<UserModel>
    {
        new UserModel { id = "user1", user = "Andrews",  avatarUrl = "/avatars/andrews.png" },
        new UserModel { id = "user2", user = "Charlie",  avatarBgColor = "#4caf50" },
        new UserModel { id = "user3", user = "Laura",    avatarBgColor = "#2196f3" }
    };
    ViewBag.Users = users;
    return View();
}
```

```razor
@Html.EJS().BlockEditor("block-editor")
    .Blocks((List<BlockModel>)ViewBag.BlocksData)
    .Users((List<UserModel>)ViewBag.Users)
    .Render()
```

### Use Mention in a Block

```csharp
new BlockModel
{
    blockType = "Paragraph",
    content = new List<object>
    {
        new { contentType = "Text", content = "Assigned to " },
        new { contentType = "Mention", properties = new { userId = "user1" } }
    }
}
```

### UserModel Properties

| Property | Description |
|---|---|
| `id` | Unique identifier matched by `userId` in mention content |
| `user` | Display name shown in the mention picker and inline |
| `avatarUrl` | URL of the user's avatar image |
| `avatarBgColor` | Background color for the avatar when no image is provided |
| `cssClass` | Additional CSS class applied to the user's mention element |

---

## Inline Styles

Apply rich formatting to any `Text` or `Link` content item via the `styles` property:

```csharp
new BlockModel
{
    blockType = "Paragraph",
    content = new List<object>
    {
        new
        {
            contentType = "Text",
            content = "Bold and colored text",
            styles = new
            {
                bold = true,
                color = "#e53935"
            }
        },
        new
        {
            contentType = "Text",
            content = " with italic and highlight",
            styles = new
            {
                italic = true,
                backgroundColor = "#fff9c4"
            }
        }
    }
}
```

### Available Style Properties

| Style | Type | Description | Default |
|---|---|---|---|
| `bold` | bool | Bold text | `false` |
| `italic` | bool | Italic text | `false` |
| `underline` | bool | Underline | `false` |
| `strikethrough` | bool | Strikethrough line | `false` |
| `color` | string | Text color (HEX or RGBA) | `""` |
| `backgroundColor` | string | Background highlight color | `""` |
| `superscript` | bool | Superscript text | `false` |
| `subscript` | bool | Subscript text | `false` |
| `uppercase` | bool | Uppercase transform | `false` |
| `lowercase` | bool | Lowercase transform | `false` |
| `inlineCode` | bool | Inline code formatting | `false` |

> Multiple styles can be combined in a single content item. Bold + italic + color are commonly combined.
