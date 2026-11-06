# Templates & Customization in Chat-UI

## Table of Contents
- [Empty Chat Template](#empty-chat-template)
- [Message Template](#message-template)
- [Time Break Template](#time-break-template)
- [Typing Indicator Template](#typing-indicator-template)
- [Suggestion Template](#suggestion-template)
- [Footer Template](#footer-template)

## Empty Chat Template

### Overview

The `emptyChatTemplate` customizes the chat interface when no messages are displayed. Personalized content like welcome messages or images creates an engaging experience for users starting conversations.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="chatui-container" style="height:380px; width:450px">
    <ejs-chatui id="chatUser" emptyChatTemplate="#emptyChatContent">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    </ejs-chatui>
</div>

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

## Message Template

### Overview

The `messageTemplate` customizes the appearance and styling of each chat message. Modify text styling, layout, and design elements for a personalized chat experience. Template context includes `message` and `index` items.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="messageTemplate" messageTemplate="#messagesContent">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-messages>
            @foreach (var message in ViewBag.ChatMessagesData)
            {
                <e-chatui-message text="@message.Text" author="@message.Author"></e-chatui-message>
            }
        </e-chatui-messages>
    </ejs-chatui>
</div>

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

**C# Code-Behind:**
```csharp
using Syncfusion.EJ2.InteractiveChat;

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

public ActionResult MessageTemplate()
{
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "Hi Michale, are we on track for the deadline?",
        Author = CurrentUserModel
    });
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "Yes, the design phase is complete.",
        Author = MichaleUserModel
    });
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "I'll review it and send feedback by today.",
        Author = CurrentUserModel
    });
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}
```

### Template Context Variables

| Variable | Type | Description |
|----------|------|-------------|
| `message` | ChatUIMessage | The current message object |
| `message.text` | string | Message content |
| `message.author` | ChatUIUser | Message author |
| `index` | number | Message index in the list |

## Time Break Template

### Overview

The `timeBreakTemplate` customizes time-based separation of messages. Display "Today," "Yesterday," or specific dates to enhance conversation organization and improve readability. Template context includes `messageDate`.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;
@using Newtonsoft.Json;

<div style="height:380px; width:450px">
    <ejs-chatui id="timeBreakTemplate" showTimeBreak="true" timeBreakTemplate="#timebreakContent" created="onCreated">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    </ejs-chatui>
</div>

<script id="timebreakContent" type="text/x-jsrender">
    <div class="timebreak-wrapper">${getFormattedTime(messageDate)}</div>
</script>

<style>
    #timeBreakTemplate .timebreak-wrapper {
        background-color: #6495ed;
        color: #ffffff;
        border-radius: 5px;
        padding: 2px;
    }
</style>

<script>
    var chatUIObj;
    var chatMessages = @Html.Raw(JsonConvert.SerializeObject(ViewBag.ChatMessagesData));
    chatMessages.forEach(message => {
        message.timeStamp = new Date(message.timeStamp);
    });

    function onCreated() {
        var chatUiEle = document.getElementById('timeBreakTemplate');
        chatUIObj = ej.base.getInstance(chatUiEle, ejs.interactivechat.ChatUI);
        chatUIObj.messages = chatMessages;
        chatUIObj.dataBind();
    }

    function getFormattedTime(messageDate) {
        var date = new Date(messageDate);
        var day = String(date.getDate()).padStart(2, '0');
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var year = date.getFullYear();
        var hours = date.getHours();
        var minutes = String(date.getMinutes()).padStart(2, '0');
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
    }
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
public ChatUIUser MichaleUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "user2", 
    User = "Michale Suyama" 
};

public ActionResult TimeBreakTemplate()
{
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "Hi Michale, are we on track for the deadline?",
        Author = CurrentUserModel,
        TimeStamp = new DateTime(2024, 12, 25, 7, 30, 0)
    });
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "Yes, the design phase is complete.",
        Author = MichaleUserModel,
        TimeStamp = new DateTime(2024, 12, 25, 8, 0, 0)
    });
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "I'll review it and send feedback by today.",
        Author = CurrentUserModel,
        TimeStamp = new DateTime(2024, 12, 25, 11, 0, 0)
    });
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}
```

## Typing Indicator Template

### Overview

The `typingUsersTemplate` customizes the display of users currently typing. Allow styling and positioning of the typing indicator to enhance user experience. Template context includes `users`.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="typingUserTemplate" typingUsersTemplate="#typingUsersContent">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    </ejs-chatui>
</div>

<script id="typingUsersContent" type="text/x-jsrender">
    <div class="typing-users">
        <span>${users[0].user} is typing</span>
        <span class="typing-indicator">
            <span></span><span></span><span></span>
        </span>
    </div>
</script>

<style>
    .typing-users {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        color: #999;
        font-size: 12px;
    }

    .typing-indicator span {
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #999;
        animation: typing 1.4s infinite;
    }

    .typing-indicator span:nth-child(2) {
        animation-delay: 0.2s;
    }

    .typing-indicator span:nth-child(3) {
        animation-delay: 0.4s;
    }

    @keyframes typing {
        0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.5;
        }
        30% {
            transform: translateY(-10px);
            opacity: 1;
        }
    }
</style>
```

## Suggestion Template

### Overview

The `suggestionTemplate` customizes the appearance of suggestion items displayed to users. Enhance the suggestion display with custom styling and formatting.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="suggestionTemplate" suggestionTemplate="#suggestionsContent">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    </ejs-chatui>
</div>

<script id="suggestionsContent" type="text/x-jsrender">
    <div class="suggestion-item">
        <button class="suggestion-button">${suggestion}</button>
    </div>
</script>

<style>
    .suggestion-item {
        display: inline-block;
        margin: 4px;
    }

    .suggestion-button {
        padding: 6px 12px;
        background-color: #e3f2fd;
        border: 1px solid #2196f3;
        border-radius: 16px;
        cursor: pointer;
        font-size: 12px;
        transition: background-color 0.3s;
    }

    .suggestion-button:hover {
        background-color: #2196f3;
        color: white;
    }
</style>
```

## Footer Template

### Overview

The `footerTemplate` customizes the chat input footer area. Create custom input controls, buttons, or actions in the footer section.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="footerTemplate" footerTemplate="#customFooter">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    </ejs-chatui>
</div>

<script id="customFooter" type="text/x-jsrender">
    <div class="custom-footer">
        <input type="text" class="footer-input" placeholder="Type message...">
        <button class="footer-button">Send</button>
        <button class="footer-button">Attach</button>
    </div>
</script>

<style>
    .custom-footer {
        display: flex;
        gap: 8px;
        padding: 12px;
        background-color: #f5f5f5;
        border-top: 1px solid #e0e0e0;
    }

    .footer-input {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 13px;
    }

    .footer-button {
        padding: 8px 16px;
        background-color: #2196f3;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
    }

    .footer-button:hover {
        background-color: #1976d2;
    }
</style>
```

## Common Patterns

### Combine Multiple Templates

Use multiple templates together for complete customization:

```razor
<ejs-chatui id="chatUI"
            emptyChatTemplate="#emptyTemplate"
            messageTemplate="#messageTemplate"
            timeBreakTemplate="#timebreakTemplate"
            typingUsersTemplate="#typingTemplate"
            footerTemplate="#footerTemplate">
    <e-chatui-user id="user1" user="Albert"></e-chatui-user>
</ejs-chatui>
```

### Conditional Template Display

Show different templates based on conditions:

```javascript
function onCreated() {
    var chatUIObj = ej.base.getInstance(document.getElementById('chatUI'), ejs.interactivechat.ChatUI);
    
    if (chatUIObj.messages.length === 0) {
        // Empty state - template will show
    } else {
        // Messages present - message template will show
    }
}
```

## Edge Cases

- Template variables must match exactly (case-sensitive)
- jsrender syntax requires proper JSON formatting
- Complex templates may impact performance with many messages
- Test templates across different browsers for compatibility
- Ensure template IDs are unique to prevent conflicts
