---
name: syncfusion-aspnetmvc-chat-ui
description: Implement a real-time Chat UI with Syncfusion ASP.NET MVC ChatUI component. Use when building chat interfaces, messaging apps, bot integrations, or interactive conversations. Covers messages, header/footer, templates, events, methods, file attachments, typing indicators, mentions, globalization, speech-to-text, and bot integrations.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion ASP.NET MVC Chat UI

The Syncfusion ASP.NET MVC Chat UI (`Syncfusion.EJ2.InteractiveChat.ChatUI`) is a feature-rich conversational interface component for building real-time chat applications, AI assistants, and bot integrations. It supports structured messages, user avatars, typing indicators, file attachments, mention tagging, markdown rendering, and extensive template customization.

## Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- NuGet package installation (`Syncfusion.EJ2.MVC5`)
- Namespace, stylesheet, and script references
- Script manager registration
- Basic Chat UI rendering with `@Html.EJS().ChatUI()`
- Configuring initial messages and current user

### Messages
📄 **Read:** [references/messages.md](references/messages.md)
- `ChatUIMessage` model: `Text`, `Id`, `Author`, `Timestamp`, `Status`, `AttachedFile`
- Pinned messages, reply-to threading (`ChatUIReplyTo` with `Timestamp`, `TimestampFormat`, `MentionUsers`), forwarded messages
- Compact mode, auto-scroll, quick reply suggestions
- Message toolbar with `MessageToolbarItemClickedEventArgs` (`item`, `message`, `cancel`, `event`)
- Message status: `IconCss`, `Text`, `Tooltip` usage
- Markdown content rendering with `marked` + `DOMPurify`

### User Configuration
📄 **Read:** [references/user-configuration.md](references/user-configuration.md)
- `ChatUIUser` model: `Id`, `User`, `AvatarUrl`, `AvatarBgColor`, `CssClass`, `StatusIconCss`
- Defining the current user with the `User` property
- Avatar images, fallback initials, background color
- Presence status icons (online, offline, busy, away)

### Header and Toolbar
📄 **Read:** [references/header-and-toolbar.md](references/header-and-toolbar.md)
- Show/hide header (`ShowHeader`), header text and icon
- `ChatUIToolbarSettings` — header toolbar items
- Toolbar item properties: `IconCss`, `Type`, `Text`, `Visible`, `Disabled`, `Tooltip`, `CssClass`, `Align`, `TabIndex`, `Template`
- `ItemClicked` event handler

### Footer and Templates
📄 **Read:** [references/footer-and-templates.md](references/footer-and-templates.md)
- Show/hide footer (`ShowFooter`), custom footer template
- Empty chat template, message template, suggestion template
- Typing users template, time break template
- Template context variables (`message`, `index`, `users`, `messageDate`, `suggestion`)

### Events and Methods
📄 **Read:** [references/events-and-methods.md](references/events-and-methods.md)
- `Created`, `MessageSend`, `UserTyping` events with full event args (`cancel`, `isTyping`, `message`, `user`, `itemData`)
- `addMessage()` — add message as string or object
- `updateMessage()` — edit an existing message by ID
- `scrollToBottom()` — programmatic scroll to latest message
- `scrollToMessage(messageId)` — scroll to a specific message by ID
- `focus()` — programmatically focus the chat input textarea
- Accessing the ChatUI instance via `ej.base.getInstance()`

### Appearance and Layout
📄 **Read:** [references/appearance-and-layout.md](references/appearance-and-layout.md)
- Placeholder, `Width`, `Height`, `CssClass`
- Timestamps (`ShowTimeStamp`, `TimeStampFormat`)
- Time breaks (`ShowTimeBreak`, `TimeBreakTemplate`)
- Typing indicator (`TypingUsers`)
- Load on demand (`LoadOnDemand`) for long conversation histories
- Persistence (`EnablePersistence`) — save and restore state across page reloads

### File Attachments
📄 **Read:** [references/file-attachments.md](references/file-attachments.md)
- Enable file attachments (`EnableAttachments`)
- `AttachmentSettings`: `SaveUrl`, `RemoveUrl`, `AllowedFileTypes`, `MaxFileSize`, `SaveFormat`, `Path`
- Drag-and-drop, maximum file count
- Custom attachment and preview templates
- Pre-populating attachments on messages at initial render (`AttachedFile`)
- Attachment lifecycle events and `ChatAttachmentClickEventArgs` (`file`, `cancel`, `event`)

### Mentions and Globalization
📄 **Read:** [references/mentions-and-globalization.md](references/mentions-and-globalization.md)
- `MentionUsers` list, `@` mention trigger popup
- Custom trigger character (`MentionTriggerChar`)
- Predefined mentions in message text using `{0}`, `{1}` placeholders
- `MentionSelect` event
- Localization (`Locale`, `ej.base.L10n.load`) and RTL (`EnableRtl`)

### Bot Integrations and Speech-to-Text
📄 **Read:** [references/bot-integrations.md](references/bot-integrations.md)
- Microsoft Bot Framework (Direct Line) integration
- Google Dialogflow integration
- Speech-to-Text via Web Speech API + `SpeechToText` component
- Secure token server pattern
- `MessageSend` + `addMessage()` integration pattern
- Troubleshooting common bot connection issues

---

## Quick Start Example

**Controller (`HomeController.cs`):**
```csharp
using Syncfusion.EJ2.InteractiveChat;

public ActionResult Index()
{
    var currentUser = new ChatUIUser { Id = "user1", User = "Albert" };
    var otherUser   = new ChatUIUser { Id = "user2", User = "Michale Suyama" };

    var messages = new List<ChatUIMessage>
    {
        new ChatUIMessage { Text = "Hi Michale, are we on track for the deadline?", Author = currentUser },
        new ChatUIMessage { Text = "Yes, the design phase is complete.", Author = otherUser },
        new ChatUIMessage { Text = "I'll review it and send feedback by today.", Author = currentUser }
    };

    ViewBag.CurrentUser = currentUser;
    ViewBag.Messages    = messages;
    return View();
}
```

**View (`Index.cshtml`):**
```razor
@using Syncfusion.EJ2.InteractiveChat

<div style="height:400px; width:450px;">
    @Html.EJS().ChatUI("chatUI")
        .User(ViewBag.CurrentUser)
        .Messages(ViewBag.Messages)
        .HeaderText("Team Chat")
        .Render()
</div>
```

**Required layout references (`_Layout.cshtml`):**
```html
<head>
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
<body>
    ...
    @Html.EJS().ScriptManager()
</body>
```

---

## Common Patterns

### Programmatically Add a Message (Bot Reply)
```javascript
function onMessageSend(args) {
    var chatUI = ej.base.getInstance(document.getElementById('chatUI'), ejs.interactivechat.ChatUI);
    fetch('/api/bot/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: args.message.text })
    })
    .then(r => r.json())
    .then(data => chatUI.addMessage({ text: data.reply, author: botUser }));
}
```

### Enable File Attachments
```razor
@Html.EJS().ChatUI("chatUI")
    .User(ViewBag.CurrentUser)
    .EnableAttachments(true)
    .AttachmentSettings(new ChatUIFileAttachmentSettings {
        SaveUrl = Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save"),
        RemoveUrl = Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")
    })
    .Render()
```

### Show Typing Indicator (Client-Side)
```javascript
function onCreated() {
    var chatUI = ej.base.getInstance(document.getElementById('chatUI'), ejs.interactivechat.ChatUI);
    chatUI.typingUsers = [{ id: "user2", user: "Michale Suyama" }];
    chatUI.dataBind();
}
```

---

## Key Properties Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `User` | `ChatUIUser` | — | Current logged-in user |
| `Messages` | `List<ChatUIMessage>` | `[]` | Initial message collection |
| `HeaderText` | `string` | — | Text shown in header |
| `HeaderIconCss` | `string` | — | CSS class for header icon |
| `ShowHeader` | `bool` | `true` | Show or hide the header |
| `ShowFooter` | `bool` | `true` | Show or hide the footer |
| `Placeholder` | `string` | `"Type your message…"` | Textarea placeholder |
| `Width` | `string` | `"100%"` | Component width |
| `Height` | `string` | `"100%"` | Component height |
| `CssClass` | `string` | — | Custom CSS class |
| `AutoScrollToBottom` | `bool` | `false` | Auto-scroll on new message |
| `ShowTimeStamp` | `bool` | `true` | Show message timestamps |
| `TimeStampFormat` | `string` | `"dd/MM/yyyy hh:mm a"` | Global timestamp format |
| `ShowTimeBreak` | `bool` | `false` | Show date separators |
| `EnableCompactMode` | `bool` | `false` | Align all messages left |
| `LoadOnDemand` | `bool` | `false` | Lazy-load messages on scroll |
| `EnablePersistence` | `bool` | `false` | Persist state across page reloads via localStorage |
| `EnableAttachments` | `bool` | `false` | Enable file attachments |
| `MentionUsers` | `List<ChatUIUser>` | — | Users available for `@` mention |
| `TypingUsers` | `List<ChatUIUser>` | — | Users currently typing |
| `EnableRtl` | `bool` | `false` | Right-to-left layout |
| `Locale` | `string` | `"en"` | Localization culture code |
