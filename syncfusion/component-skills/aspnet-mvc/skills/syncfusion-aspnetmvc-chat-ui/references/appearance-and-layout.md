# Appearance and Layout — Syncfusion ASP.NET MVC Chat UI

## Table of Contents
1. [Placeholder Text](#placeholder-text)
2. [Width and Height](#width-and-height)
3. [CSS Class Customization](#css-class-customization)
4. [Timestamps](#timestamps)
5. [Time Breaks](#time-breaks)
6. [Typing Indicator](#typing-indicator)
7. [Load on Demand](#load-on-demand)
8. [Persistence](#persistence)

---

## Placeholder Text

Use `Placeholder` to set the hint text shown in the message input area. Default: `"Type your message…"`.

```razor
@Html.EJS().ChatUI("chatUI")
    .Placeholder("Start typing...")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()
```

---

## Width and Height

Control component dimensions using `Width` and `Height`. Both default to `"100%"` (fills the parent container). Accepts any valid CSS value: `px`, `%`, `em`, `vw`, `vh`.

```razor
<!-- Fixed dimensions -->
@Html.EJS().ChatUI("chatUI")
    .Width("450px")
    .Height("380px")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()
```

```razor
<!-- Responsive — fills a flex/grid container -->
<div style="height: 600px; width: 100%; max-width: 600px;">
    @Html.EJS().ChatUI("chatUI")
        .Messages(ViewBag.Messages)
        .User(ViewBag.CurrentUser)
        .Render()
</div>
```

> **Tip:** Always provide an explicit height on either the Chat UI itself or its container. Without a fixed height, the component may collapse to zero height.

---

## CSS Class Customization

Use `CssClass` to apply one or more custom CSS classes to the root Chat UI element for theming and layout overrides.

```razor
@Html.EJS().ChatUI("chatUI")
    .CssClass("custom-container")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()
```

```css
/* Override border, background, and shadow */
.custom-container {
    border-color: #e0e0e0;
    background-color: #f4f4f4;
    box-shadow: 3px 3px 10px 0px rgba(0, 0, 0, 0.2);
}

/* Override header background */
.custom-container .e-chat-header {
    background: #0c888e;
}

/* Override footer input border */
.custom-container .e-footer .e-input-group {
    border: 3px solid #bde0e2;
}
```

**Common CSS selectors:**

| Selector | Targets |
|----------|---------|
| `.e-chat-ui` | Root component element |
| `.e-chat-header` | Header area |
| `.e-footer` | Footer / input area |
| `.e-message-icon` | User avatar |
| `.e-right .e-message-wrapper` | Sent message bubbles |
| `.e-left .e-message-wrapper` | Received message bubbles |
| `.e-suggestion-list` | Quick reply suggestion chips |
| `.e-timebreak` | Date separator labels |

---

## Timestamps

### Show or Hide Timestamps

Use `ShowTimeStamp` to display or hide message timestamps globally. Default: `true`.

```razor
@using Newtonsoft.Json

@Html.EJS().ChatUI("chatUI")
    .ShowTimeStamp(false)
    .Created("onCreated")
    .User(ViewBag.CurrentUser)
    .Render()

<script>
    // Timestamps include JavaScript Date objects — must be set client-side
    var chatMessages = @Html.Raw(JsonConvert.SerializeObject(ViewBag.Messages));
    chatMessages.forEach(function (msg) {
        msg.timeStamp = new Date(msg.timeStamp);
    });

    function onCreated() {
        var chatUI = ej.base.getInstance(
            document.getElementById('chatUI'),
            ejs.interactivechat.ChatUI
        );
        chatUI.messages = chatMessages;
        chatUI.dataBind();
    }
</script>
```

### Global Timestamp Format

Use `TimeStampFormat` to change the format for all messages. Default: `"dd/MM/yyyy hh:mm a"`.

```razor
@Html.EJS().ChatUI("chatUI")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .TimeStampFormat("MMMM hh:mm a")
    .Render()
```

**Common format patterns:**

| Format | Example Output |
|--------|---------------|
| `"dd/MM/yyyy hh:mm a"` | `25/12/2024 07:30 AM` (default) |
| `"MMMM hh:mm a"` | `December 07:30 AM` |
| `"MM/dd/yyyy"` | `12/25/2024` |
| `"hh:mm a"` | `07:30 AM` |

### Per-Message Timestamp Format

Override the format for an individual message using the `TimeStampFormat` property on `ChatUIMessage`:

```csharp
new ChatUIMessage
{
    Text            = "Yes, the design phase is complete.",
    Author          = otherUser,
    TimeStampFormat = "MMMM hh:mm a"
}
```

### Configuring Message Timestamps

Timestamps with specific `DateTime` values must be assigned in the controller and then converted to JavaScript `Date` objects client-side (since `DateTime` serializes as a string):

```csharp
// Controller
ViewBag.Messages = new List<ChatUIMessage>
{
    new ChatUIMessage { Text = "Hi Michale!", Author = currentUser, TimeStamp = new DateTime(2024, 12, 25, 7, 30, 0) },
    new ChatUIMessage { Text = "Hi Albert!",  Author = otherUser,   TimeStamp = new DateTime(2024, 12, 25, 8,  0, 0) }
};
```

```javascript
// View — convert serialized strings to Date objects before binding
var messages = @Html.Raw(JsonConvert.SerializeObject(ViewBag.Messages));
messages.forEach(function (msg) { msg.timeStamp = new Date(msg.timeStamp); });
chatUI.messages = messages;
chatUI.dataBind();
```

---

## Time Breaks

Time breaks display date-group separators between messages from different calendar days, improving readability in long conversations.

Use `ShowTimeBreak(true)` to enable. Default: `false`. Messages must have `TimeStamp` set.

```razor
@Html.EJS().ChatUI("chatUI")
    .ShowTimeBreak(true)
    .Created("onCreated")
    .User(ViewBag.CurrentUser)
    .Render()
```

> For custom time break labels (e.g., "Today", "Yesterday"), use `TimeBreakTemplate`. See the Footer and Templates reference.

---

## Typing Indicator

Use `TypingUsers` to show a typing animation for one or more users. Provide a `List<ChatUIUser>` of currently typing participants. Clear the list to hide the indicator.

Because `TypingUsers` is typically set dynamically (e.g., from SignalR), update it client-side via the component instance:

```razor
@using Newtonsoft.Json

@Html.EJS().ChatUI("chatUI")
    .Messages(ViewBag.Messages)
    .Created("onCreated")
    .User(ViewBag.CurrentUser)
    .Render()

<script>
    var typingUsers = @Html.Raw(JsonConvert.SerializeObject(ViewBag.TypingUsers));

    function onCreated() {
        var chatUI = ej.base.getInstance(
            document.getElementById('chatUI'),
            ejs.interactivechat.ChatUI
        );
        chatUI.typingUsers = typingUsers;
        chatUI.dataBind();
    }
</script>
```

```csharp
// Controller
ViewBag.TypingUsers = new List<ChatUIUser>
{
    new ChatUIUser { Id = "user2", User = "Michale Suyama" }
};
```

**Clear typing indicator dynamically:**
```javascript
chatUI.typingUsers = [];
chatUI.dataBind();
```

**Default typing text strings** (localizable):

| Key | Default |
|-----|---------|
| `oneUserTyping` | `{0} is typing` |
| `twoUserTyping` | `{0} and {1} are typing` |
| `threeUserTyping` | `{0}, {1}, and {2} other are typing` |
| `multipleUsersTyping` | `{0}, {1}, and {2} others are typing` |

---

## Load on Demand

Use `LoadOnDemand(true)` to lazily load messages as the user scrolls up — ideal for long conversation histories with hundreds of messages. Default: `false`.

When enabled, the component renders only a viewport-sized batch of messages and fetches more as the scroll position reaches the top.

```razor
@Html.EJS().ChatUI("chatUI")
    .Created("onCreated")
    .User(ViewBag.CurrentUser)
    .LoadOnDemand(true)
    .Render()

<script>
    var currentUser = @Html.Raw(JsonConvert.SerializeObject(ViewBag.CurrentUser));
    var michale     = @Html.Raw(JsonConvert.SerializeObject(ViewBag.OtherUser));

    // Generate a large message set client-side (or fetch from API)
    var allMessages = [];
    for (var i = 1; i <= 150; i++) {
        allMessages.push({
            text:   i % 2 === 0 ? 'Message ' + i + ' from Michale' : 'Message ' + i + ' from Albert',
            author: i % 2 === 0 ? michale : currentUser
        });
    }

    function onCreated() {
        var chatUI = ej.base.getInstance(
            document.getElementById('chatUI'),
            ejs.interactivechat.ChatUI
        );
        chatUI.messages = allMessages;
        chatUI.dataBind();
    }
</script>
```

> **Performance tip:** For real applications, fetch historical messages in pages from the server when the scroll reaches the top, rather than loading all 150+ messages upfront.

---

## Persistence

Use `EnablePersistence(true)` to persist the Chat UI's state across page reloads. When enabled, the component saves its current state — including message list and scroll position — to the browser's `localStorage`, restoring it automatically when the page is revisited. Default: `false`.

```razor
@Html.EJS().ChatUI("chatUI")
    .EnablePersistence(true)
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()
```

> **Note:** Persistence relies on the browser's `localStorage` API, keyed by the component's element ID. If you render multiple Chat UI instances on different pages, ensure each has a unique ID to avoid state collisions. Sensitive message content stored in `localStorage` is not encrypted — avoid enabling persistence for conversations that contain confidential data.
