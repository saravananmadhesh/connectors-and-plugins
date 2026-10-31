# Mentions & User References in Chat-UI

## Overview

The mention feature allows users to reference other participants in messages using the @ symbol, creating notifications and drawing attention to specific users in conversations.

## Configuring Mentions

Use the mention integration to enable @mentions functionality in your Chat-UI component.

### Setting Mentionable Users

The `mentionUsers` property specifies the list of users available for mention in the chat UI. This property defines an array of user objects that populate the @mention suggestion popup when the mention trigger character is typed.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" created="onCreated">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    </ejs-chatui>
</div>

<script>
    function onCreated() {
        var chatUIObj = ej.base.getInstance(document.getElementById('chatUser'), ejs.interactivechat.ChatUI);
        
        // Set mentionable users
        var mentionableUsers = [
            { id: "user1", user: "Albert", avatarUrl: "https://example.com/albert.jpg" },
            { id: "user2", user: "Michale Suyama", avatarUrl: "https://example.com/michale.jpg" },
            { id: "user3", user: "Andrew Fuller", avatarUrl: "https://example.com/andrew.jpg" }
        ];
        
        chatUIObj.mentionUsers = mentionableUsers;
        chatUIObj.dataBind();
    }
</script>
```

## Mention Trigger Character

The `mentionTriggerChar` property specifies the character that triggers the @mention suggestion popup in the chat input. The trigger character must be a single character, such as '@' or '#', and is case-sensitive in the input.

**Default Value:** `"@"`

### Setting Mention Trigger Character

Configure the trigger character using the `mentionTriggerChar` property:

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" mentionTriggerChar="#">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-mentionusers>
            @foreach (var user in ViewBag.MentionableUsers)
            {
                <e-chatui-mention-user id="@user.Id" user="@user.User"></e-chatui-mention-user>
            }
        </e-chatui-mentionusers>
    </ejs-chatui>
</div>
```

**C# Code-Behind:**
```csharp
using Syncfusion.EJ2.InteractiveChat;

public List<ChatUIUser> MentionableUsers { get; set; } = new List<ChatUIUser>();
{ 
    Id = "user1", 
    User = "Albert" 
};

public ActionResult MentionTriggerChar()
{
    
    MentionableUsers.Add(new ChatUIUser { Id = "user1", User = "Albert" });
    MentionableUsers.Add(new ChatUIUser { Id = "user2", User = "Michale" });
    MentionableUsers.Add(new ChatUIUser { Id = "user3", User = "Andrew" });
    
    ViewBag.MentionableUsers = MentionableUsers;
    return View();
}
```

## Predefined Mentions in Messages

Include predefined mentions when creating messages programmatically:

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
public ChatUIUser AndrewUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "user3", 
    User = "Andrew Fuller" 
};

public ActionResult PredefinedMentions()
{
    
    // Message with mention reference
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "@Michale Could you review the design files?",
        Author = CurrentUserModel
    });
    
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "@Andrew Let's sync on the timeline",
        Author = MichaleUserModel
    });
    
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}
```

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
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
    function onCreated() {
        var chatUIObj = ej.base.getInstance(document.getElementById('chatUser'), ejs.interactivechat.ChatUI);
        var mentionableUsers = [
            { id: "user1", user: "Albert" },
            { id: "user2", user: "Michale Suyama" },
            { id: "user3", user: "Andrew Fuller" }
        ];
        chatUIObj.mentionableUsers = mentionableUsers;
    }
</script>
```

## Mention Selection Events

The `mentionSelect` event is triggered when a user selects a mention from the suggestion popup in the chat UI. This event provides details about the selected user and the current message text, allowing developers to handle mention-related logic, such as custom notifications or validation.

### Handling Mention Select Event

Configure the `mentionSelect` event to detect when users mention others:

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" mentionSelect="onMentionSelect" created="onCreated">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    </ejs-chatui>
</div>

<script>
    function onCreated() {
        var chatUIObj = ej.base.getInstance(document.getElementById('chatUser'), ejs.interactivechat.ChatUI);
        
        // Set mentionable users
        chatUIObj.mentionUsers = [
            { id: "user1", user: "Albert" },
            { id: "user2", user: "Michale Suyama" },
            { id: "user3", user: "Andrew Fuller" }
        ];
        chatUIObj.dataBind();
    }
    
    function onMentionSelect(args) {
        console.log("Mentioned user:", args.user);
        console.log("Current message text:", args.text);
        
        // Send notification to mentioned user
        notifyUser(args.user.id, "You were mentioned in a message");
        
        // Optional: Prevent default behavior
        // args.cancel = true;
    }
    
    function notifyUser(userId, message) {
        // Send notification via API or WebSocket
        fetch('/Notifications/Send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: userId, message: message })
        });
    }
</script>
```


### Event Arguments

| Property | Type | Description |
|----------|------|-------------|
| `user` | ChatUIUser | The user object that was selected from the mention popup |
| `text` | string | The current message text with the mention |
| `cancel` | boolean | Set to `true` to prevent the default behavior of inserting the mention |

### Preventing Default Mention Behavior

You can cancel the default mention insertion:

**Example:**
```javascript
function onMentionSelect(args) {
    // Validate mention
    if (!isUserAllowedToMention(args.user.id)) {
        args.cancel = true;
        alert("You don't have permission to mention this user");
        return;
    }
    
    // Allow mention
    console.log("Mention allowed for:", args.user.user);
}

function isUserAllowedToMention(userId) {
    // Check permissions
    return true; // or false based on your logic
}
```

## Mention Item Template

Customize the appearance of mention suggestions using a template:

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="mentionTemplate" mentionItemTemplate="#mentionItemTemplate">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    </ejs-chatui>
</div>

<script id="mentionItemTemplate" type="text/x-jsrender">
    <div class="mention-item">
        <img src="${avatar}" class="mention-avatar" alt="${user}" />
        <span class="mention-name">${user}</span>
        <span class="mention-status">Online</span>
    </div>
</script>

<style>
    .mention-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px;
        cursor: pointer;
    }

    .mention-item:hover {
        background-color: #f0f0f0;
    }

    .mention-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
    }

    .mention-name {
        font-weight: 500;
        flex: 1;
    }

    .mention-status {
        font-size: 11px;
        color: #00C851;
    }
</style>
```

## Common Patterns

### With Notification System

```razor
<ejs-chatui id="chatUI" created="onCreated">
    <e-chatui-user id="user1" user="Albert"></e-chatui-user>
</ejs-chatui>

<script>
    function onCreated() {
        var chatUIObj = ej.base.getInstance(document.getElementById('chatUI'), ejs.interactivechat.ChatUI);
        
        chatUIObj.mentionableUsers = [
            { id: "user1", user: "Albert" },
            { id: "user2", user: "Michale Suyama" },
            { id: "user3", user: "Andrew Fuller" }
        ];
        
        // Listen for mention events
        chatUIObj.addEventListener('mentionSelect', function(args) {
            // Send notification to mentioned user
            notifyMentionedUser(args.user.id, args.user.user);
        });
    }
    
    function notifyMentionedUser(userId, userName) {
        // Show notification
        var notification = `${userName} mentioned you`;
        console.log(notification);
    }
</script>
```

### Group Mentions

Mention multiple users:

**C# Code-Behind:**
```csharp
var message = new ChatUIMessage()
{
    Text = "@Michale @Andrew Please review and approve",
    Author = CurrentUserModel
};
```

## Use Cases

- **Team collaboration:** Notify specific team members about tasks
- **Support chats:** Escalate to specific support agents
- **Project management:** Assign tasks to team members
- **Emergency notifications:** Quickly alert specific users
- **Discussion moderation:** Tag moderators for rule violations

## Edge Cases

- **Mention with special characters:** Ensure user names are sanitized
- **Case sensitivity:** Most systems treat mentions case-insensitively
- **Duplicate mentions:** Same user mentioned multiple times in one message
- **Mention not found:** User mentions someone who's no longer in the group
- **Mention outside active list:** User tries to mention someone not in mentionable users list
