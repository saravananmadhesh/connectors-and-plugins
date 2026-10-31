# Events and Methods — Syncfusion ASP.NET MVC Chat UI

## Table of Contents
1. [Accessing the ChatUI Instance](#accessing-the-chatui-instance)
2. [Events](#events)
   - [Created](#created)
   - [MessageSend](#messagesend)
   - [UserTyping](#usertyping)
3. [Methods](#methods)
   - [addMessage()](#addmessage)
   - [updateMessage()](#updatemessage)
   - [scrollToBottom()](#scrolltobottom)
   - [scrollToMessage()](#scrolltomessage)
   - [focus()](#focus)
4. [Common Patterns](#common-patterns)

---

## Accessing the ChatUI Instance

All methods require a reference to the Chat UI JavaScript instance. Retrieve it inside the `Created` event handler:

```javascript
var chatUIObj;

function onCreated() {
    chatUIObj = ej.base.getInstance(
        document.getElementById('chatUI'),
        ejs.interactivechat.ChatUI
    );
}
```

**View — register the Created handler:**
```razor
@Html.EJS().ChatUI("chatUI")
    .Created("onCreated")
    .User(ViewBag.CurrentUser)
    .Render()
```

> **Why:** EJ2 components initialize asynchronously. Accessing the instance before `Created` fires will return `undefined`.

---

## Events

### Created

Fires when the Chat UI has fully rendered. Use this event to:
- Store a reference to the component instance
- Set client-side-only properties (`typingUsers`, `suggestions`, `messages` with `Date` objects)
- Initialize third-party components (Speech-to-Text, dropdowns) in the toolbar or footer

```razor
@Html.EJS().ChatUI("chatUI")
    .Created("onCreated")
    .User(ViewBag.CurrentUser)
    .Render()

<script>
    function onCreated() {
        // Component is ready — safe to call methods here
    }
</script>
```

**Controller:**
```csharp
ViewBag.CurrentUser = new ChatUIUser { Id = "user1", User = "Albert" };
```

---

### MessageSend

Fires **before** the user's message is added to the chat. Use this event to:
- Forward messages to a bot or AI backend
- Cancel the default send and replace with a modified version
- Parse Markdown before display
- Log analytics

```razor
@Html.EJS().ChatUI("chatUI")
    .MessageSend("onMessageSend")
    .User(ViewBag.CurrentUser)
    .Render()

<script>
    function onMessageSend(args) {
        // args.message — the ChatUIMessage about to be sent
        // args.cancel  — set to true to prevent default send
        console.log('Sending:', args.message.text);
    }
</script>
```

**Cancelling the default send and adding a modified message:**
```javascript
function onMessageSend(args) {
    args.cancel = true;   // Stop the original message from being added
    var sanitized = DOMPurify.sanitize(marked.parse(args.message.text));
    chatUIObj.addMessage({
        text:      sanitized,
        author:    args.message.author,
        timeStamp: new Date()
    });
}
```

**Bot integration pattern:**
```javascript
function onMessageSend(args) {
    // The user's message is added automatically (args.cancel not set)
    fetch('/api/bot/reply', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ text: args.message.text })
    })
    .then(function (r) { return r.json(); })
    .then(function (data) {
        chatUIObj.addMessage({ text: data.reply, author: botUser });
    });
}
```

---

### UserTyping

Fires when the user types in the chat input area. Use this to send typing indicators to other participants via SignalR or WebSocket, or to react to the typed message content in real time.

**`TypingEventArgs` properties:**

| Property | Type | Description |
|----------|------|-------------|
| `isTyping` | `bool` | `true` while the user is actively typing; `false` when the input is cleared or the message is sent. |
| `message` | `string` | The current text content of the input field at the time the event fires. |
| `user` | `ChatUIUser` | The current user who is typing. |
| `event` | `Event` | The underlying browser input event that triggered this notification. |
| `name` | `string` | Name of the event (`"userTyping"`). |

```razor
@Html.EJS().ChatUI("chatUI")
    .UserTyping("onUserTyping")
    .User(ViewBag.CurrentUser)
    .Render()

<script>
    function onUserTyping(args) {
        // args.isTyping  — true while typing, false when input is cleared or message sent
        // args.message   — current text in the input field
        // args.user      — the ChatUIUser who is typing
        if (args.isTyping) {
            console.log(args.user.user + " is typing: " + args.message);
            signalRHub.invoke("SendTyping", args.user.id);
        } else {
            signalRHub.invoke("StopTyping", args.user.id);
        }
    }
</script>
```

**Branching on typing start vs. stop (SignalR pattern):**

```javascript
function onUserTyping(args) {
    if (args.isTyping) {
        // User started or continued typing — broadcast to other participants
        connection.invoke("UserTyping", args.user.id, args.user.user);
    } else {
        // User cleared the input or sent the message — stop the indicator
        connection.invoke("UserStoppedTyping", args.user.id);
    }
}
```

---

## Methods

### addMessage()

Adds a new message to the chat programmatically. Accepts either:
- A **string** — added as a plain-text message from the current user
- A **message object** — full `ChatUIMessage`-compatible object with `author`, `text`, `timeStamp`, etc.

**As string:**
```javascript
chatUIObj.addMessage("Also, let me know if there are any blockers.");
```

**As object:**
```javascript
chatUIObj.addMessage({
    author:    { id: "user2", user: "Michale Suyama" },
    text:      "Great! Let me know if there's anything that needs adjustment.",
    timeStamp: new Date()
});
```

**Full example — button triggers addMessage:**
```razor
@using Newtonsoft.Json

<button id="addMsg" class="e-btn e-primary">Add Reply</button>

@Html.EJS().ChatUI("chatUI")
    .Created("onCreated")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()

<script>
    var chatUIObj;
    var michale = @Html.Raw(JsonConvert.SerializeObject(ViewBag.OtherUser));

    function onCreated() {
        chatUIObj = ej.base.getInstance(
            document.getElementById('chatUI'),
            ejs.interactivechat.ChatUI
        );
    }

    document.getElementById('addMsg').addEventListener('click', function () {
        chatUIObj.addMessage({
            author: michale,
            text:   "Great! Let me know if there's anything that needs adjustment."
        });
    });
</script>
```

---

### updateMessage()

Updates an existing message by its `Id`. Useful for editing sent messages, updating bot responses (streaming), or correcting typos.

**Signature:** `chatUIObj.updateMessage(messageModel, messageId)`

```razor
@using Newtonsoft.Json

<button id="updateMsg" class="e-btn e-primary">Edit Message</button>

@Html.EJS().ChatUI("chatUI")
    .Created("onCreated")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()

<script>
    var chatUIObj;
    var currentUser = @Html.Raw(JsonConvert.SerializeObject(ViewBag.CurrentUser));

    function onCreated() {
        chatUIObj = ej.base.getInstance(
            document.getElementById('chatUI'),
            ejs.interactivechat.ChatUI
        );
    }

    document.getElementById('updateMsg').addEventListener('click', function () {
        chatUIObj.updateMessage(
            {
                text:   "Hi Michael, are we still on schedule to meet the deadline?",
                author: currentUser
            },
            'msg1'   // Id of the message to update
        );
    });
</script>
```

**Controller — messages must have `Id` for updateMessage to work:**
```csharp
var messages = new List<ChatUIMessage>
{
    new ChatUIMessage { Id = "msg1", Text = "Hi Michale, are we on track for the deadline?", Author = currentUser },
    new ChatUIMessage { Id = "msg2", Text = "Yes, the design phase is complete.", Author = otherUser },
    new ChatUIMessage { Id = "msg3", Text = "I'll review it and send feedback by today.", Author = currentUser }
};
ViewBag.Messages = messages;
```

---

### scrollToBottom()

Programmatically scrolls the message list to the most recent message. Useful after dynamically adding messages when `AutoScrollToBottom` is `false`.

```razor
<button id="scrollBtn" class="e-btn e-primary">Scroll to Bottom</button>

@Html.EJS().ChatUI("chatUI")
    .Created("onCreated")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()

<script>
    var chatUIObj;
    function onCreated() {
        chatUIObj = ej.base.getInstance(
            document.getElementById('chatUI'),
            ejs.interactivechat.ChatUI
        );
    }
    document.getElementById('scrollBtn').addEventListener('click', function () {
        chatUIObj.scrollToBottom();
    });
</script>
```

---

### scrollToMessage()

Scrolls the message list to a specific message identified by its `Id`. Useful for reply-jump navigation (clicking a quoted reply to reveal the original) or search-result highlighting.

**Signature:** `chatUIObj.scrollToMessage(messageId)`

**Parameters:**
- `messageId` (`string`) — the `Id` of the target `ChatUIMessage` to scroll into view.

```razor
@using Newtonsoft.Json

<button id="jumpBtn" class="e-btn e-outline">Jump to First Message</button>

@Html.EJS().ChatUI("chatUI")
    .Created("onCreated")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()

<script>
    var chatUIObj;

    function onCreated() {
        chatUIObj = ej.base.getInstance(
            document.getElementById('chatUI'),
            ejs.interactivechat.ChatUI
        );
    }

    document.getElementById('jumpBtn').addEventListener('click', function () {
        // Scrolls to the message whose Id is "msg1"
        chatUIObj.scrollToMessage('msg1');
    });
</script>
```

**Controller — messages must have `Id` set for `scrollToMessage` to locate them:**

```csharp
ViewBag.Messages = new List<ChatUIMessage>
{
    new ChatUIMessage { Id = "msg1", Text = "Hi Michale, are we on track?", Author = currentUser },
    new ChatUIMessage { Id = "msg2", Text = "Yes, the design phase is complete.", Author = otherUser },
    new ChatUIMessage { Id = "msg3", Text = "I'll review it and send feedback by today.", Author = currentUser }
};
```

> **Tip:** Combine `scrollToMessage` with reply-to threading — when a user clicks a quoted reply preview, call `chatUIObj.scrollToMessage(replyToMessageId)` to jump to the original message.

---

### focus()

Sets focus on the chat message input textarea. Use this to direct keyboard input to the chat field after a programmatic action — for example, after the component initialises, after a modal closes, or after a bot reply is added.

**Signature:** `chatUIObj.focus()`

```razor
<button id="focusBtn" class="e-btn e-outline">Focus Input</button>

@Html.EJS().ChatUI("chatUI")
    .Created("onCreated")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()

<script>
    var chatUIObj;

    function onCreated() {
        chatUIObj = ej.base.getInstance(
            document.getElementById('chatUI'),
            ejs.interactivechat.ChatUI
        );
        // Auto-focus the input when the chat loads
        chatUIObj.focus();
    }

    document.getElementById('focusBtn').addEventListener('click', function () {
        chatUIObj.focus();
    });
</script>
```

---

## Common Patterns

### Streaming Bot Response (Word-by-Word Update)

Use `addMessage()` to insert a placeholder, record its ID, then call `updateMessage()` as tokens arrive:

```javascript
var streamMsgId = 'bot-stream-' + Date.now();

// Add empty placeholder
chatUIObj.addMessage({ id: streamMsgId, author: botUser, text: '' });

// Simulate streaming tokens
var fullText = '';
var tokens   = ['Sure', ', ', 'here', ' is', ' the', ' answer', '...'];
var i        = 0;
var interval = setInterval(function () {
    if (i >= tokens.length) { clearInterval(interval); return; }
    fullText += tokens[i++];
    chatUIObj.updateMessage({ author: botUser, text: fullText }, streamMsgId);
}, 100);
```

### Real-time Typing Indicator via SignalR

```javascript
// When remote user is typing (received from SignalR)
connection.on('UserTyping', function (userId, userName) {
    chatUIObj.typingUsers = [{ id: userId, user: userName }];
    chatUIObj.dataBind();
});

// When remote user stops typing
connection.on('UserStoppedTyping', function () {
    chatUIObj.typingUsers = [];
    chatUIObj.dataBind();
});
```
