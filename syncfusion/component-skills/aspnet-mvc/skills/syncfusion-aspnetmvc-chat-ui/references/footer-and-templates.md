# Footer and Templates — Syncfusion ASP.NET MVC Chat UI

## Table of Contents
1. [Show or Hide Footer](#show-or-hide-footer)
2. [Footer Template](#footer-template)
3. [Empty Chat Template](#empty-chat-template)
4. [Message Template](#message-template)
5. [Suggestion Template](#suggestion-template)
6. [Typing Users Template](#typing-users-template)
7. [Time Break Template](#time-break-template)
8. [Template Context Reference](#template-context-reference)

---

## Show or Hide Footer

Use `ShowFooter` to toggle the footer area (message input + send button). Default: `true`.

```razor
@Html.EJS().ChatUI("chatUI")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .ShowFooter(false)
    .Render()
```

Hide the footer when the Chat UI is read-only (e.g., a log viewer or bot output display).

---

## Footer Template

Use `FooterTemplate` to replace the default footer with a fully custom layout. This is essential for integrating rich input features such as emoji pickers, file buttons, or Speech-to-Text.

The template is a `<script>` block with `type="text/x-jsrender"`. Access the Chat UI instance via `ej.base.getInstance()` in the `Created` event to call `addMessage()`.

```razor
@using Syncfusion.EJ2.InteractiveChat
@using Newtonsoft.Json

@Html.EJS().ChatUI("footerTemplate")
    .Created("onCreated")
    .FooterTemplate("#footerContent")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()

<script id="footerContent" type="text/x-jsrender">
    <div class="custom-footer">
        <input id="chatTextArea" class="e-input" placeholder="Type your message...">
        <button id="sendMessage" class="e-btn e-primary e-icons e-send"></button>
    </div>
</script>

<style>
    #footerTemplate.e-chat-ui .e-footer {
        margin: unset;
        align-self: auto;
    }
    .custom-footer {
        display: flex;
        gap: 10px;
        padding: 10px;
    }
    #chatTextArea {
        width: 100%;
        border-radius: 5px;
        border: 1px solid #ccc;
        padding: 5px;
        margin-bottom: 0;
    }
</style>

<script>
    var chatUIObj;
    function onCreated() {
        chatUIObj = ej.base.getInstance(
            document.getElementById('footerTemplate'),
            ejs.interactivechat.ChatUI
        );
    }

    document.addEventListener('click', function (e) {
        if (e.target && e.target.id === 'sendMessage') {
            var input = document.getElementById('chatTextArea');
            if (input && input.value.trim().length > 0) {
                chatUIObj.addMessage({
                    author: @Html.Raw(JsonConvert.SerializeObject(ViewBag.CurrentUser)),
                    text:   input.value
                });
                input.value = '';
            }
        }
    });
</script>
```

---

## Empty Chat Template

Use `EmptyChatTemplate` to customize the placeholder shown when no messages exist. Ideal for onboarding messages, welcome screens, or call-to-action prompts.

```razor
@Html.EJS().ChatUI("chatUI")
    .EmptyChatTemplate("#emptyChatContent")
    .User(ViewBag.CurrentUser)
    .Render()

<script id="emptyChatContent" type="text/x-jsrender">
    <div class="empty-chat-text">
        <h4><span class="e-icons e-comment-show"></span></h4>
        <h4>No Messages Yet</h4>
        <p>Start a conversation to see your messages here.</p>
    </div>
</script>

<style>
    .empty-chat-text {
        font-size: 15px;
        text-align: center;
        margin-top: 90px;
    }
</style>
```

**Controller:** No messages needed — just pass the current user:
```csharp
ViewBag.CurrentUser = new ChatUIUser { Id = "user1", User = "Albert" };
```

---

## Message Template

Use `MessageTemplate` to control the appearance of every message bubble. The template context exposes `message` (the `ChatUIMessage` object) and `index` (zero-based position).

```razor
@Html.EJS().ChatUI("messageTemplate")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .MessageTemplate("#messagesContent")
    .Render()

<script id="messagesContent" type="text/x-jsrender">
    <div class="message-items e-card">
        <div class="message-text">${message.text}</div>
    </div>
</script>

<style>
    #messageTemplate .e-right .message-items {
        border-radius: 16px 16px 2px 16px;
        background-color: #c5ffbf;
    }
    #messageTemplate .e-left .message-items {
        border-radius: 16px 16px 16px 2px;
        background-color: #f5f5f5;
    }
    #messageTemplate .message-items {
        padding: 5px;
    }
</style>
```

**Available context variables in template:**
- `${message.text}` — message content
- `${message.author.user}` — author display name
- `${message.timeStamp}` — timestamp value
- `${index}` — message index in the list

---

## Suggestion Template

Use `SuggestionTemplate` to customize the quick-reply suggestion chips. The template context exposes `suggestion` (the suggestion string) and `index`.

```razor
@Html.EJS().ChatUI("suggestionTemplate")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Created("onCreated")
    .SuggestionTemplate("#suggestionContent")
    .Render()

<script id="suggestionContent" type="text/x-jsrender">
    <div class="suggestion-item active">
        <div class="content">${suggestion}</div>
    </div>
</script>

<style>
    #suggestionTemplate .e-suggestion-list li {
        padding: 0;
        border: none;
        box-shadow: none;
    }
    #suggestionTemplate .suggestion-item {
        display: flex;
        align-items: center;
        background-color: #87b6fb;
        color: black;
        padding: 4px;
        height: 30px;
        border-radius: 5px;
    }
    #suggestionTemplate .suggestion-item .content {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
</style>

<script>
    function onCreated() {
        var chatUI = ej.base.getInstance(
            document.getElementById('suggestionTemplate'),
            ejs.interactivechat.ChatUI
        );
        chatUI.suggestions = ["Okay will check it", "Sounds good!"];
        chatUI.dataBind();
    }
</script>
```

---

## Typing Users Template

Use `TypingUsersTemplate` to customize the typing indicator. The template context exposes `users` (an array of `ChatUIUser` objects currently typing).

```razor
@using Newtonsoft.Json

@Html.EJS().ChatUI("typingUsersTemplate")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .TypingUsersTemplate("#typingUsersContent")
    .Created("onCreated")
    .Render()

<script id="typingUsersContent" type="text/x-jsrender">
    <div class="typing-wrapper">${getTypingUsersList(users) + ' are typing...'}</div>
</script>

<style>
    .typing-wrapper {
        display: flex;
        gap: 4px;
        align-items: center;
        font-size: 14px;
        color: #555;
        margin: 5px 0;
    }
    .typing-user {
        font-weight: bold;
        color: #0078d4;
    }
</style>

<script>
    var typingUsers = @Html.Raw(JsonConvert.SerializeObject(ViewBag.TypingUsers));

    function onCreated() {
        var chatUI = ej.base.getInstance(
            document.getElementById('typingUsersTemplate'),
            ejs.interactivechat.ChatUI
        );
        chatUI.typingUsers = typingUsers;
        chatUI.dataBind();
    }

    function getTypingUsersList(users) {
        if (!users || users.length === 0) return '';
        return users.map(function (user, i) {
            var prefix = (i === users.length - 1 && i > 0) ? 'and ' : '';
            return prefix + '<span class="typing-user">' + user.user + '</span>';
        }).join(' ');
    }
</script>
```

**Controller — provide typing users:**
```csharp
ViewBag.TypingUsers = new List<ChatUIUser>
{
    new ChatUIUser { Id = "user2", User = "Michale Suyama" },
    new ChatUIUser { Id = "user3", User = "Reena" }
};
```

---

## Time Break Template

Use `TimeBreakTemplate` to customize date separator labels between messages grouped by date. Requires `ShowTimeBreak(true)`. The template context exposes `messageDate`.

```razor
@using Newtonsoft.Json

@Html.EJS().ChatUI("timeBreakTemplate")
    .User(ViewBag.CurrentUser)
    .ShowTimeBreak(true)
    .TimeBreakTemplate("#timebreakContent")
    .Created("onCreated")
    .Render()

<script id="timebreakContent" type="text/x-jsrender">
    <div class="timebreak-wrapper">${getFormattedTime(messageDate)}</div>
</script>

<style>
    .timebreak-wrapper {
        background-color: #6495ed;
        color: #ffffff;
        border-radius: 5px;
        padding: 2px 8px;
    }
</style>

<script>
    var chatMessages = @Html.Raw(JsonConvert.SerializeObject(ViewBag.Messages));
    chatMessages.forEach(function (msg) {
        msg.timeStamp = new Date(msg.timeStamp);
    });

    function onCreated() {
        var chatUI = ej.base.getInstance(
            document.getElementById('timeBreakTemplate'),
            ejs.interactivechat.ChatUI
        );
        chatUI.messages = chatMessages;
        chatUI.dataBind();
    }

    function getFormattedTime(messageDate) {
        var d       = new Date(messageDate);
        var day     = String(d.getDate()).padStart(2, '0');
        var month   = String(d.getMonth() + 1).padStart(2, '0');
        var year    = d.getFullYear();
        var hours   = d.getHours();
        var minutes = String(d.getMinutes()).padStart(2, '0');
        var ampm    = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ' ' + ampm;
    }
</script>
```

**Controller — messages with timestamps spanning multiple dates:**
```csharp
ViewBag.Messages = new List<ChatUIMessage>
{
    new ChatUIMessage { Text = "Hi Michale, are we on track?",    Author = currentUser, TimeStamp = new DateTime(2024, 12, 25, 7, 30, 0) },
    new ChatUIMessage { Text = "Yes, the design phase is done.",   Author = otherUser,   TimeStamp = new DateTime(2024, 12, 25, 8, 0, 0)  },
    new ChatUIMessage { Text = "I'll send feedback by today.",     Author = currentUser, TimeStamp = new DateTime(2024, 12, 26, 9, 0, 0)  }
};
```

---

## Template Context Reference

| Template | Context Variable | Type | Description |
|----------|-----------------|------|-------------|
| `MessageTemplate` | `message` | `ChatUIMessage` | The full message object |
| `MessageTemplate` | `index` | `number` | Zero-based message index |
| `SuggestionTemplate` | `suggestion` | `string` | Suggestion text string |
| `SuggestionTemplate` | `index` | `number` | Zero-based suggestion index |
| `TypingUsersTemplate` | `users` | `ChatUIUser[]` | Array of typing users |
| `TimeBreakTemplate` | `messageDate` | `Date` | Date of the message group |
| `EmptyChatTemplate` | *(none)* | — | No context variables |
| `FooterTemplate` | *(none)* | — | No context variables |
