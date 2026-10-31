# Messages — Syncfusion ASP.NET MVC Chat UI

## Table of Contents
1. [Configuring Messages](#configuring-messages)
2. [Pinned Messages](#pinned-messages)
3. [Reply-To (Threaded Conversations)](#reply-to-threaded-conversations)
4. [Forwarded Messages](#forwarded-messages)
5. [Compact Mode](#compact-mode)
6. [Auto-Scroll to Bottom](#auto-scroll-to-bottom)
7. [Quick Reply Suggestions](#quick-reply-suggestions)
8. [Message Toolbar](#message-toolbar)
9. [Message Status](#message-status)
10. [Markdown Content Rendering](#markdown-content-rendering)

---

## Configuring Messages

Use the `Messages` property to provide a `List<ChatUIMessage>`. Each message must have at minimum a `Text` and `Author`.

**ChatUIMessage properties:**

| Property | Type | Description |
|----------|------|-------------|
| `Id` | `string` | Unique message identifier (required for `updateMessage` and `scrollToMessage`) |
| `Text` | `string` | Message content (supports HTML when using Markdown) |
| `Author` | `ChatUIUser` | User who sent the message |
| `TimeStamp` | `DateTime` | Message send time (defaults to current time) |
| `TimeStampFormat` | `string` | Per-message timestamp format override |
| `IsPinned` | `bool` | Highlights message as pinned |
| `IsForwarded` | `bool` | Marks message as forwarded |
| `ReplyTo` | `ChatUIReplyTo` | Links to a parent message (threaded reply) |
| `Status` | object | Delivery/read receipt (IconCss, Text, Tooltip) |
| `MentionUsers` | `List<ChatUIUser>` | Users mapped to `{0}`, `{1}` placeholders in `Text` |
| `AttachedFile` | `FileInfo` | A file attachment pre-populated on the message at initial render time. Rendered using the `AttachmentTemplate`. |

```csharp
var messages = new List<ChatUIMessage>
{
    new ChatUIMessage
    {
        Id     = "msg1",
        Text   = "Hi Michale, are we on track for the deadline?",
        Author = currentUser
    },
    new ChatUIMessage
    {
        Id     = "msg2",
        Text   = "Yes, the design phase is complete.",
        Author = otherUser
    }
};
ViewBag.Messages = messages;
```

```razor
@Html.EJS().ChatUI("chatUI").Messages(ViewBag.Messages).User(ViewBag.CurrentUser).Render()
```

---

## Pinned Messages

Set `IsPinned = true` on a `ChatUIMessage` to highlight it. Pinned messages display a pin indicator; users can unpin or continue the conversation from the options menu.

```csharp
new ChatUIMessage
{
    Text     = "I'll review it and send feedback by today.",
    Author   = currentUser,
    IsPinned = true
}
```

---

## Reply-To (Threaded Conversations)

Use the `ReplyTo` property to link a message to a previous one, preserving context as a threaded reply. Requires the parent message to have an `Id`.

**`ChatUIReplyTo` properties:**

| Property | Type | Description |
|----------|------|-------------|
| `MessageID` | `string` | The `Id` of the parent message being replied to. |
| `User` | `ChatUIUser` | The author of the original (parent) message. |
| `Text` | `string` | The text content of the original message, shown as a preview in the reply bubble. |
| `Timestamp` | `DateTime` | The timestamp of the original message. Used to display when the replied-to message was sent. |
| `TimestampFormat` | `string` | Format string for the replied-to message's timestamp display (e.g. `"hh:mm a"`). Defaults to the application culture if not set. |
| `MentionUsers` | `List<ChatUIUser>` | Users mentioned in the original message, mapped to `{0}`, `{1}` placeholders in `Text`. |

```csharp
// Parent message
new ChatUIMessage
{
    Id        = "msg2",
    Text      = "Yes, the design phase is complete.",
    Author    = otherUser,
    TimeStamp = new DateTime(2024, 12, 25, 8, 0, 0)
},
// Reply message
new ChatUIMessage
{
    Text    = "I'll review it and send feedback by today.",
    Author  = currentUser,
    ReplyTo = new ChatUIReplyTo
    {
        MessageID       = "msg2",
        User            = otherUser,
        Text            = "Yes, the design phase is complete.",
        Timestamp       = new DateTime(2024, 12, 25, 8, 0, 0),
        TimestampFormat = "hh:mm a"
    }
}
```

The reply message renders with a quoted preview of the parent message above it.

**Reply with mentioned users in the original message:**

```csharp
new ChatUIMessage
{
    Text    = "Noted, I will follow up.",
    Author  = currentUser,
    ReplyTo = new ChatUIReplyTo
    {
        MessageID    = "msg3",
        User         = otherUser,
        Text         = "Hi {0}, please review the updated spec.",
        MentionUsers = new List<ChatUIUser>
        {
            new ChatUIUser { Id = "user1", User = "Albert" }
        }
    }
}

---

## Forwarded Messages

Set `IsForwarded = true` to visually mark a message as forwarded from another conversation:

```csharp
new ChatUIMessage
{
    Text        = "Please review this update.",
    Author      = currentUser,
    IsForwarded = true
}
```

A "Forwarded" label appears above the message bubble.

---

## Compact Mode

`EnableCompactMode(true)` aligns **all** messages to the left regardless of authorship — useful for group chats or space-constrained interfaces. Default is `false`.

```razor
@Html.EJS().ChatUI("chatUI")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .EnableCompactMode(true)
    .Render()
```

---

## Auto-Scroll to Bottom

By default (`AutoScrollToBottom = false`), the view does not auto-scroll when other users send messages — users must scroll manually or use the floating scroll button.

Set `AutoScrollToBottom(true)` to always scroll to the bottom when a new message arrives:

```razor
@Html.EJS().ChatUI("chatUI")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .AutoScrollToBottom(true)
    .Render()
```

> **Tip:** Keep this `false` in group chats to avoid interrupting users who are scrolling through history.

---

## Quick Reply Suggestions

The `Suggestions` property shows quick-reply chips above the input field. Because it requires client-side initialization, set it in the `Created` event handler:

```razor
@Html.EJS().ChatUI("suggestion")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Created("onCreated")
    .Render()

<script>
    function onCreated() {
        var chatUI = ej.base.getInstance(
            document.getElementById('suggestion'),
            ejs.interactivechat.ChatUI
        );
        chatUI.suggestions = ["Okay will check it", "Sounds good!"];
        chatUI.dataBind();
    }
</script>
```

Clicking a suggestion populates it directly into the input field.

---

## Message Toolbar

The `MessageToolbarSettings` property customizes the per-message action toolbar (hover over a message to reveal it). Default actions: **Copy**, **Reply**, **Pin**, **Delete**.

### Custom toolbar items

```razor
@Html.EJS().ChatUI("chatUI")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .MessageToolbarSettings(new ChatUIMessageToolbarSettings
    {
        Items = ViewBag.MessageToolbarItems
    })
    .Render()
```

```csharp
var items = new List<ToolbarItemModel>
{
    new ToolbarItemModel { iconCss = "e-icons e-chat-forward", tooltipText = "Forward" },
    new ToolbarItemModel { iconCss = "e-icons e-chat-copy",    tooltipText = "Copy"    },
    new ToolbarItemModel { iconCss = "e-icons e-chat-reply",   tooltipText = "Reply"   },
    new ToolbarItemModel { iconCss = "e-icons e-chat-pin",     tooltipText = "Pin"     },
    new ToolbarItemModel { iconCss = "e-icons e-chat-trash",   tooltipText = "Delete"  }
};
ViewBag.MessageToolbarItems = items;

public class ToolbarItemModel
{
    public string iconCss     { get; set; }
    public string tooltipText { get; set; }
}
```

### Handling toolbar item click

Use the `ItemClicked` event to respond to custom actions. The event args provide the clicked item, the associated message, and a `cancel` flag to prevent built-in default behaviour (such as the default delete or pin action).

**`MessageToolbarItemClickedEventArgs` properties:**

| Property | Type | Description |
|----------|------|-------------|
| `item` | `object` | The toolbar item that was clicked. Access item properties such as `args.item.tooltip`. |
| `message` | `ChatUIMessage` | The message associated with the toolbar action. |
| `cancel` | `bool` | Set to `true` to prevent the default built-in action for the clicked item (e.g. suppress the default delete behaviour and handle it yourself). |
| `event` | `Event` | The underlying browser click event. |

```razor
.MessageToolbarSettings(new ChatUIMessageToolbarSettings
{
    Items       = ViewBag.MessageToolbarItems,
    ItemClicked = "onMessageToolbarClicked"
})
```

```javascript
function onMessageToolbarClicked(args) {
    // args.item    — clicked toolbar item
    // args.message — associated ChatUIMessage object
    // args.cancel  — set to true to suppress default action

    if (args.item.tooltip === "Forward") {
        // Cancel any default behaviour and handle forwarding manually
        args.cancel = true;
        chatUIObj.addMessage({
            id:          'msg-' + Date.now(),
            isForwarded: true,
            author:      args.message.author,
            text:        args.message.text
        });
    }
}
```

### Toolbar width

```razor
.MessageToolbarSettings(new ChatUIMessageToolbarSettings { Width = "50%" })
```

---

## Message Status

The `Status` property shows delivery/read receipts on messages. Use `IconCss`, `Text`, and `Tooltip` independently or together:

```csharp
// IconCss only
new ChatUIMessage
{
    Text   = "I'll review it and send feedback by today.",
    Author = currentUser,
    Status = new StatusModel { iconCss = "e-icons e-chat-seen" }
}

// Text only (label without icon)
new ChatUIMessage
{
    Text   = "Meeting confirmed for tomorrow.",
    Author = currentUser,
    Status = new StatusModel { text = "Sent" }
}

// IconCss + Tooltip
new ChatUIMessage
{
    Text   = "I'll review it and send feedback by today.",
    Author = currentUser,
    Status = new StatusModel { iconCss = "e-icons e-chat-seen", tooltip = "Seen" }
}

// All three combined
new ChatUIMessage
{
    Text   = "Please review the attached document.",
    Author = currentUser,
    Status = new StatusModel { iconCss = "e-icons e-chat-seen", text = "Read", tooltip = "Read by Michale" }
}

public class StatusModel
{
    public string iconCss  { get; set; }
    public string text     { get; set; }
    public string tooltip  { get; set; }
}
```

---

## Markdown Content Rendering

The Chat UI supports Markdown by parsing messages with the `marked` library and sanitizing with `DOMPurify` before setting as HTML in the `text` field.

### Setup — include libraries in the view

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/marked/4.0.0/marked.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.4.0/purify.min.js"></script>
```

### Controller — pass raw Markdown text

```csharp
using Newtonsoft.Json;

ViewBag.CurrentUserModel = new ChatUIUser { Id = "user1", User = "Albert" };
ViewBag.MichaleUserModel = new ChatUIUser { Id = "user2", User = "Michale Suyama" };
ViewBag.ChatMessagesData = new List<ChatUIMessage>
{
    new ChatUIMessage
    {
        Text      = "Hey Michale, did you review the _new API documentation_?",
        Author    = (ChatUIUser)ViewBag.CurrentUserModel,
        TimeStamp = new DateTime(2024, 1, 15, 9, 30, 0)
    },
    new ChatUIMessage
    {
        Text      = "Yes! The **endpoint specifications** look great.",
        Author    = (ChatUIUser)ViewBag.MichaleUserModel,
        TimeStamp = new DateTime(2024, 1, 15, 9, 32, 0)
    }
};
```

### View — parse Markdown in `Created`, intercept send in `MessageSend`

```razor
@using Syncfusion.EJ2.InteractiveChat
@using Newtonsoft.Json

@Html.EJS().ChatUI("markdown")
    .HeaderText("Chat UI with Markdown")
    .User((ChatUIUser)ViewBag.CurrentUserModel)
    .Created("onCreated")
    .MessageSend("onMessageSend")
    .Render()

<script>
    var currentUser = @Html.Raw(JsonConvert.SerializeObject(ViewBag.CurrentUserModel));
    var chatMessages = @Html.Raw(JsonConvert.SerializeObject(ViewBag.ChatMessagesData));

    // Convert stored timestamps to Date objects and parse Markdown
    chatMessages.forEach(function (msg) {
        msg.timeStamp = new Date(msg.timeStamp);
        msg.text      = DOMPurify.sanitize(marked.parse(msg.text));
    });

    var chatUIObj;
    function onCreated() {
        chatUIObj = ej.base.getInstance(document.getElementById('markdown'), ejs.interactivechat.ChatUI);
        chatUIObj.messages = chatMessages;
        chatUIObj.dataBind();
    }

    function onMessageSend(args) {
        args.cancel = true;  // Prevent default send; we'll add the parsed version
        var parsed = DOMPurify.sanitize(marked.parse(args.message.text));
        chatUIObj.addMessage({ text: parsed, author: currentUser, timeStamp: new Date() });
    }
</script>
```

**Supported Markdown via `marked`:**
- `**bold**` / `__bold__`
- `*italic*` / `_italic_`
- `[Link text](url)`
- `- Item` (unordered list) / `1. Item` (ordered list)
- `` `inline code` `` / fenced code blocks

> **Security:** Always sanitize Markdown output with `DOMPurify` before injecting into the DOM to prevent XSS attacks.
