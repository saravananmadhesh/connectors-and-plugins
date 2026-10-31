# Typing Indicator in Chat-UI

## Overview

Typing indicators display when users are actively composing messages, providing real-time feedback about ongoing activity. This enhances user experience by showing presence and engagement.

## Show or Hide Typing Indicator

Use the `showTypingIndicator` property to enable or disable the typing indicator display. This property controls whether the component visually shows when other users are typing.

**Default:** `true` (typing indicators are visible)

### Enabling Typing Indicators

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" showTypingIndicator="true">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-messages>
            @foreach (var message in ViewBag.ChatMessagesData)
            {
                <e-chatui-message text="@message.Text" author="@message.Author"></e-chatui-message>
            }
        </e-chatui-messages>
    </ejs-chatui>
</div>
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

public ActionResult TypingIndicator()
{
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "Hi, how can I help you?",
        Author = CurrentUserModel
    });
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}
```

### Disabling Typing Indicators

```razor
<ejs-chatui id="chatUser" showTypingIndicator="false">
    <!-- Chat content -->
</ejs-chatui>
```

## Detecting User Typing

Use the `userTyping` event to detect when the user is typing and broadcast this information to other participants:

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" userTyping="onUserTyping">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    </ejs-chatui>
</div>

<script>
    function onUserTyping(args) {
        // Broadcast typing status to other users
        console.log("User is typing");
        // Send WebSocket message or API call to notify other participants
    }
</script>
```

**C# Code-Behind:**
```csharp
using Syncfusion.EJ2.InteractiveChat;

public ActionResult UserTyping()
{
    return View();
}
```

## Typing Indicator Customization

### Custom Typing Indicator Template

Customize the appearance of the typing indicator using the `typingUsersTemplate` property:

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

**C# Code-Behind:**
```csharp
using Syncfusion.EJ2.InteractiveChat;

public ActionResult TypingUserTemplate()
{
    return View();
}
```

## Multi-User Typing Display

Support multiple users typing simultaneously:

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="multiUserTyping" typingUsersTemplate="#multiTypingContent">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    </ejs-chatui>
</div>

<script id="multiTypingContent" type="text/x-jsrender">
    <div class="multi-typing-users">
        {{if users.length === 1}}
            <span>${users[0].user} is typing</span>
        {{else if users.length === 2}}
            <span>${users[0].user} and ${users[1].user} are typing</span>
        {{else}}
            <span>${users.length} people are typing</span>
        {{/if}}
        <span class="typing-indicator">
            <span></span><span></span><span></span>
        </span>
    </div>
</script>

<style>
    .multi-typing-users {
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

## Broadcasting Typing Status

Implement real-time typing notifications using WebSockets or SignalR:

**Client-Side (Razor):**
```javascript
function onUserTyping(args) {
    // Connect to WebSocket or SignalR
    if (connection) {
        connection.send("TypingNotification", {
            userId: "user1",
            userName: "Albert",
            isTyping: true
        });
    }
}
```

**Server-Side Example (C#):**
```csharp
// Using SignalR Hub
public class ChatHub : Hub
{
    public async Task NotifyTyping(string userId, string userName, bool isTyping)
    {
        await Clients.Others.SendAsync("UserTyping", userId, userName, isTyping);
    }
}
```

## Use Cases

- **Real-time collaboration:** Show when team members are composing responses
- **Support chats:** Indicate when support agent is typing a reply
- **Group messaging:** Display multiple users typing simultaneously
- **Engagement tracking:** Monitor user activity in conversations

## Common Patterns

### With Typing Detection

```razor
<ejs-chatui id="chatUI" 
            showTypingIndicator="true"
            userTyping="onUserTyping">
    <e-chatui-user id="user1" user="Albert"></e-chatui-user>
</ejs-chatui>

<script>
    function onUserTyping(args) {
        // Broadcast typing status
        broadcastTypingStatus("user1", "Albert", true);
    }
    
    function broadcastTypingStatus(userId, userName, isTyping) {
        // Send to other users via WebSocket/SignalR
    }
</script>
```

### Suppress Typing Indicator for Privacy

```razor
<ejs-chatui id="chatUI" showTypingIndicator="false">
    <e-chatui-user id="user1" user="Albert"></e-chatui-user>
</ejs-chatui>
```

### Custom Styling for Visual Impact

```css
.typing-indicator span {
    width: 8px;
    height: 8px;
    background-color: #2196f3;  /* Blue instead of gray */
    animation: pulse 1s infinite;
}

@keyframes pulse {
    0%, 100% {
        opacity: 0.3;
    }
    50% {
        opacity: 1;
    }
}
```

## Typing Users Property

### Managing Typing Users Collection

The `typingUsers` property represents an array of users who are currently typing in the chat. This property allows you to programmatically set and manage the list of users shown in the typing indicator.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" created="onCreated">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    </ejs-chatui>
</div>

<script>
    var chatUIObj;
    
    function onCreated() {
        chatUIObj = ej.base.getInstance(
            document.getElementById('chatUser'), 
            ejs.interactivechat.ChatUI
        );
        
        // Set initial typing users
        chatUIObj.typingUsers = [
            { id: "user2", user: "Michale Suyama" }
        ];
        chatUIObj.dataBind();
    }
    
    // Function to add a typing user
    function addTypingUser(userId, userName) {
        var typingUser = { id: userId, user: userName };
        var existingUsers = chatUIObj.typingUsers || [];
        
        // Check if user is not already in the list
        var userExists = existingUsers.some(u => u.id === userId);
        if (!userExists) {
            existingUsers.push(typingUser);
            chatUIObj.typingUsers = existingUsers;
            chatUIObj.dataBind();
        }
    }
    
    // Function to remove a typing user
    function removeTypingUser(userId) {
        var existingUsers = chatUIObj.typingUsers || [];
        chatUIObj.typingUsers = existingUsers.filter(u => u.id !== userId);
        chatUIObj.dataBind();
    }
    
    // Example: Simulate typing status changes
    setTimeout(function() {
        addTypingUser("user3", "Janet Leverling");
    }, 2000);
    
    setTimeout(function() {
        removeTypingUser("user2");
    }, 5000);
</script>
```

**C# Code-Behind:**
```csharp
using Syncfusion.EJ2.InteractiveChat;

public List<ChatUIUser> TypingUsersData { get; set; } = new List<ChatUIUser>();
public ChatUIUser MichaleUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "user2", 
    User = "Michale Suyama" 
};

public ActionResult TypingUsers()
{
    // Set initial typing users
    TypingUsersData.Add(MichaleUserModel);
    
    ViewBag.TypingUsers = TypingUsersData;
    return View();
}
```

### Real-Time Typing Status with SignalR

Integrate with SignalR to manage typing users in real-time:

**SignalR Hub (C#):**
```csharp
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

public class ChatHub : Hub
{
    public async Task NotifyTyping(string userId, string userName, bool isTyping)
    {
        if (isTyping)
        {
            await Clients.Others.SendAsync("UserStartedTyping", userId, userName);
        }
        else
        {
            await Clients.Others.SendAsync("UserStoppedTyping", userId);
        }
    }
}
```

### Multiple Typing Users Example

```javascript
// Set multiple users typing
chatUIObj.typingUsers = [
    { id: "user2", user: "Michale Suyama" },
    { id: "user3", user: "Janet Leverling" },
    { id: "user4", user: "Andrew Fuller" }
];
chatUIObj.dataBind();
```

### Clear All Typing Users

```javascript
// Clear typing users
chatUIObj.typingUsers = [];
chatUIObj.dataBind();
```

### Typing Users Property Details

| Property | Type | Description |
|----------|------|-------------|
| `typingUsers` | Array<ChatUIUser> | Array of user objects currently typing |

**ChatUIUser Structure:**
```typescript
{
    id: string,      // Unique user identifier
    user: string     // User display name
}
```

### Best Practices for TypingUsers

1. **Auto-timeout:** Clear typing status after inactivity (typically 3-5 seconds)
2. **Debouncing:** Throttle typing notifications to avoid excessive updates
3. **Cleanup:** Remove typing users when they disconnect or leave the chat
4. **Performance:** Limit the number of typing users displayed (e.g., "3+ people typing")
5. **Validation:** Ensure user IDs in typingUsers array are valid

## Edge Cases

- **Slow network:** Typing indicator may lag behind actual typing
- **User leaves:** Clear typing indicator when user disconnects
- **Timeout:** Auto-clear typing indicator if no activity after set time
- **Performance:** Many simultaneous typing users may impact performance
- **Mobile:** Touch keyboard appearances may not trigger typing events
- **TypingUsers array:** Ensure user objects in typingUsers have valid id and user properties
- **Duplicate users:** Check for existing users before adding to typingUsers array to avoid duplicates
