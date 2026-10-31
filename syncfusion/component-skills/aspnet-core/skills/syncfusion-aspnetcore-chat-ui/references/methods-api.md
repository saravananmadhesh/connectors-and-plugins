# Methods & API in Chat-UI

## Table of Contents
- [Overview](#overview)
- [addMessage Method](#addmessage-method)
- [updateMessage Method](#updatemessage-method)
- [scrollToBottom Method](#scrolltobottom-method)
- [Common Patterns](#common-patterns)
- [Best Practices](#best-practices)

## Overview

The Chat-UI component provides public methods for programmatic control of messages and view behavior. These methods enable dynamic message management, editing capabilities, and view navigation without requiring user interaction.

## addMessage Method

The `addMessage` method programmatically adds a new message to the chat. It accepts either a string (simple text message) or a MessageModel object (with full message configuration).

### Adding Message as String

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <button id="addMessageString" class="e-btn e-primary">Add Message</button>
    <ejs-chatui id="chatUser" created="onCreated">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-messages>
            @foreach (var message in ViewBag.ChatMessagesData)
            {
                <e-chatui-message text="@message.Text" author="@message.Author"></e-chatui-message>
            }
        </e-chatui-messages>
    </ejs-chatui>
</div>

<script>
    var chatUIObj;
    
    function onCreated() {
        var chatUiEle = document.getElementById('chatUser');
        chatUIObj = ej.base.getInstance(chatUiEle, ejs.interactivechat.ChatUI);
    }
    
    document.addEventListener('click', function (event) {
        if (event.target && event.target.id === 'addMessageString') {
            chatUIObj.addMessage("Let me know if there are any blockers we should address.");
        }
    });
</script>
```

**C# Code-Behind:**
```csharp
using Syncfusion.EJ2.InteractiveChat;

public List<ChatUIMessage> ChatMessagesData { get; set; } = new List<ChatUIMessage>();
public ChatUIUser CurrentUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "user1", 
    User = "Albert" 
};

public ActionResult AddMessage()
{
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "Hi, how are you?",
        Author = CurrentUserModel
    });
    
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}
```

### Adding Message as Object

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;
@using Newtonsoft.Json;

<div style="height:380px; width:450px">
    <button id="addMessageModel" class="e-btn e-primary">Add Message as Object</button>
    <ejs-chatui id="chatUser" created="onCreated">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-messages>
            @foreach (var message in ViewBag.ChatMessagesData)
            {
                <e-chatui-message text="@message.Text" author="@message.Author"></e-chatui-message>
            }
        </e-chatui-messages>
    </ejs-chatui>
</div>

<script>
    var chatUIObj;
    
    function onCreated() {
        var chatUiEle = document.getElementById('chatUser');
        chatUIObj = ej.base.getInstance(chatUiEle, ejs.interactivechat.ChatUI);
    }
    
    document.addEventListener('click', function (event) {
        if (event.target && event.target.id === 'addMessageModel') {
            chatUIObj.addMessage({
                author: @Html.Raw(JsonConvert.SerializeObject(ViewBag.MichaleUser)),
                text: "Great! Let me know if there's anything that needs adjustment.",
                timeStamp: new Date()
            });
        }
    });
</script>
```

**C# Code-Behind:**
```csharp
using Syncfusion.EJ2.InteractiveChat;
using Newtonsoft.Json;

public ChatUIUser MichaleUser { get; set; }
public List<ChatUIMessage> ChatMessagesData { get; set; } = new List<ChatUIMessage>();
public ChatUIUser CurrentUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "user1", 
    User = "Albert" 
};
public ChatUIUser MichaleUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "user2", 
    User = "Michale Suyama" 
};

public ActionResult AddMessageObject()
{
    MichaleUser = MichaleUserModel;
    
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "Hi Michale, are we on track for the deadline?",
        Author = CurrentUserModel
    });
    
    ViewBag.ChatMessagesData = ChatMessagesData;
    ViewBag.MichaleUser = MichaleUser;
    return View();
}
```

### addMessage Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | string \| ChatUIMessage | String text or full message object to add |

**Message Object Properties:**
- `text`: Message content (string)
- `author`: User who sent the message (ChatUIUser)
- `timeStamp`: When message was sent (Date, optional)
- `id`: Unique message identifier (string, optional)
- `iconCss`: Icon CSS class (string, optional)
- `cssClass`: Custom CSS class (string, optional)

### Use Cases for addMessage

- **Automated responses:** Add bot or system messages
- **Message broadcasting:** Add messages from other users via WebSocket/SignalR
- **Import messages:** Load historical messages from server
- **Template responses:** Add pre-defined quick replies
- **Notifications:** Add system notifications to chat

## updateMessage Method

The `updateMessage` method modifies an existing message in the chat. It's useful for editing sent messages, correcting errors, or updating message status.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;
@using Newtonsoft.Json;

<div style="height:380px; width:450px">
    <button id="updateMessage" class="e-btn e-primary">Update Message</button>
    <ejs-chatui id="chatUser" created="onCreated">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-messages>
            @foreach (var message in ViewBag.ChatMessagesData)
            {
                <e-chatui-message text="@message.Text" author="@message.Author" id="@message.Id"></e-chatui-message>
            }
        </e-chatui-messages>
    </ejs-chatui>
</div>

<script>
    var chatUIObj;
    
    function onCreated() {
        var chatUiEle = document.getElementById('chatUser');
        chatUIObj = ej.base.getInstance(chatUiEle, ejs.interactivechat.ChatUI);
    }
    
    document.addEventListener('click', function (event) {
        if (event.target && event.target.id === 'updateMessage') {
            chatUIObj.updateMessage({
                text: "Hi Michael, are we still on schedule to meet the deadline?",
                author: @Html.Raw(JsonConvert.SerializeObject(ViewBag.CurrentUser))
            }, 'msg1');
        }
    });
</script>
```

**C# Code-Behind:**
```csharp
using Syncfusion.EJ2.InteractiveChat;
using Newtonsoft.Json;

public List<ChatUIMessage> ChatMessagesData { get; set; } = new List<ChatUIMessage>();
public ChatUIUser CurrentUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "user1", 
    User = "Albert" 
};

public ActionResult UpdateMessage()
{
    
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Id = "msg1",
        Text = "Hi Michale, are we on track for the deadline?",
        Author = CurrentUserModel
    });
    
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}
```

### updateMessage Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | ChatUIMessage | Updated message object with new content |
| `messageId` | string | ID of the message to update |

**Updatable Properties:**
- `text`: New message text
- `author`: Updated author (rarely changed)
- `timeStamp`: Updated timestamp
- `iconCss`: Updated icon
- `cssClass`: Updated styling
- `status`: Updated message status

### Use Cases for updateMessage

- **Edit functionality:** Allow users to edit sent messages
- **Status updates:** Update message delivery/read status
- **Error correction:** Fix typos or incorrect information
- **Content moderation:** Update messages after moderation review
- **Real-time sync:** Sync edits from other devices

## scrollToBottom Method

The `scrollToBottom` method scrolls the chat view to the latest message, ensuring the newest content is visible to users.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <button id="scrollToBottom" class="e-btn e-primary">Scroll To Bottom</button>
    <ejs-chatui id="chatUser" created="onCreated">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-messages>
            @foreach (var message in ViewBag.ChatMessagesData)
            {
                <e-chatui-message text="@message.Text" author="@message.Author"></e-chatui-message>
            }
        </e-chatui-messages>
    </ejs-chatui>
</div>

<script>
    var chatUIObj;
    
    function onCreated() {
        var chatUiEle = document.getElementById('chatUser');
        chatUIObj = ej.base.getInstance(chatUiEle, ejs.interactivechat.ChatUI);
    }
    
    document.addEventListener('click', function (event) {
        if (event.target && event.target.id === 'scrollToBottom') {
            chatUIObj.scrollToBottom();
        }
    });
</script>
```

**C# Code-Behind:**
```csharp
using Syncfusion.EJ2.InteractiveChat;

public List<ChatUIMessage> ChatMessagesData { get; set; } = new List<ChatUIMessage>();
public ChatUIUser CurrentUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "user1", 
    User = "Albert" 
};
public ChatUIUser OtherUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "user2", 
    User = "Michale Suyama" 
};

public ActionResult ScrollToBottom()
{
    
    // Add multiple messages to demonstrate scrolling
    for (int i = 1; i <= 20; i++)
    {
        ChatMessagesData.Add(new ChatUIMessage()
        {
            Text = $"Message {i}",
            Author = i % 2 == 0 ? CurrentUserModel : OtherUserModel
        });
    }
    
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}
```

### scrollToBottom Parameters

No parameters required. This method simply scrolls the chat container to the bottom.

### Use Cases for scrollToBottom

- **New message notifications:** Scroll to new messages after adding them
- **Return to current:** Bring user back to latest conversation after scrolling up
- **After bulk load:** Scroll to bottom after loading multiple messages
- **Focus on latest:** Ensure attention on most recent activity
- **Navigation aid:** Help users navigate back to active conversation

## Common Patterns

### Auto-Scroll with New Messages

Automatically scroll when adding messages:

```javascript
function addNewMessage(messageText) {
    chatUIObj.addMessage(messageText);
    
    // Automatically scroll to show new message
    setTimeout(function() {
        chatUIObj.scrollToBottom();
    }, 100);
}
```

### Scroll to Bottom on Window Resize

Maintain view position during resize:

```javascript
var wasAtBottom = true;

// Track scroll position
chatContainer.addEventListener('scroll', function() {
    var scrollTop = chatContainer.scrollTop;
    var scrollHeight = chatContainer.scrollHeight;
    var clientHeight = chatContainer.clientHeight;
    
    wasAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
});

// Restore position after resize
window.addEventListener('resize', function() {
    if (wasAtBottom) {
        chatUIObj.scrollToBottom();
    }
});
```

## Best Practices

### Performance Optimization

**Batch Operations:**
```javascript
// Good: Batch multiple additions
function addMultipleMessages(messages) {
    messages.forEach(msg => chatUIObj.addMessage(msg));
    chatUIObj.scrollToBottom(); // Scroll once after all additions
}

// Avoid: Scrolling after each message
function addMessagesSlowly(messages) {
    messages.forEach(msg => {
        chatUIObj.addMessage(msg);
        chatUIObj.scrollToBottom(); // Inefficient!
    });
}
```

### Message ID Management

**Always provide unique IDs:**
```javascript
// Good: Unique IDs for messages
chatUIObj.addMessage({
    id: `msg-${Date.now()}-${Math.random()}`,
    text: "Hello",
    author: currentUser
});

// Better: Use server-generated UUIDs
chatUIObj.addMessage({
    id: serverResponse.messageId, // UUID from server
    text: "Hello",
    author: currentUser
});
```

## Edge Cases

- **Rapid message additions:** May cause performance issues; consider batching or throttling
- **Update non-existent message:** Fails silently; always verify message exists before updating
- **Scroll during user interaction:** May interrupt user reading; check scroll position before auto-scrolling
- **Large message count:** Performance degrades with 1000+ messages; implement virtual scrolling or pagination
- **Concurrent updates:** Multiple simultaneous updates may conflict; implement update queuing
- **Network delays:** Server-side operations may return out of order; use timestamps for proper ordering
