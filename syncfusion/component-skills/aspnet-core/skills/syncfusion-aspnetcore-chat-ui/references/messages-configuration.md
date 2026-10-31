# Message Configuration in Chat-UI

## Table of Contents
- [Basic Message Setup](#basic-message-setup)
- [Pinned Messages](#pinned-messages)
- [Reply-To Messages](#reply-to-messages)
- [Forwarded Messages](#forwarded-messages)
- [Compact Mode](#compact-mode)

## Basic Message Setup

### Overview

Messages are the core content of the Chat-UI component. Each message is configured using the `<e-chatui-message>` tag directive within the `<e-chatui-messages>` container. Messages store content from both the current user and other participants.

### Adding Text Messages

Use the `<e-chatui-message>` directive to add individual messages. The `text` property contains the message content, and the `author` property identifies the message sender.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser">
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
public ChatUIUser MichaleUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "user2", 
    User = "Michale Suyama" 
};

public ActionResult Default()
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

### Message Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `text` | string | Yes | The message content displayed in the chat |
| `author` | ChatUIUser | Yes | The user object that identifies the message sender |
| `id` | string | No | Unique identifier for the message (auto-generated if not provided) |
| `timeStamp` | DateTime | No | When the message was sent (auto-generated as current time if not provided) |
| `isPinned` | boolean | No | Whether the message is pinned for emphasis (default: false) |
| `replyTo` | ReplyTo | No | Reference to the original message being replied to |
| `isForwarded` | boolean | No | Whether the message is forwarded from another conversation (default: false) |

## Pinned Messages

### Overview

Pinned messages are highlighted for importance. Once a message is pinned, an options menu allows users to continue the chat or unpin the message. Use the `isPinned` property to mark important messages.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-messages>
            @foreach (var message in ViewBag.ChatMessagesData)
            {
                <e-chatui-message text="@message.Text" 
                                author="@message.Author" 
                                isPinned="@message.IsPinned"></e-chatui-message>
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
public ChatUIUser MichaleUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "user2", 
    User = "Michale Suyama" 
};

public ActionResult Pinned()
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
        Author = CurrentUserModel,
        IsPinned = true
    });
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}
```

### Use Cases

- Mark critical deadlines or action items
- Highlight important decisions or agreements
- Pin announcements that all team members should see
- Keep reference information accessible

## Reply-To Messages

### Overview

The `replyTo` property creates threaded conversations by linking a message to the original message being responded to. This preserves context and creates organized discussion threads.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-messages>
            @foreach (var message in ViewBag.ChatMessagesData)
            {
                <e-chatui-message text="@message.Text" 
                                author="@message.Author" 
                                replyTo="@message.ReplyTo"></e-chatui-message>
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
public ChatUIUser MichaleUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "user2", 
    User = "Michale Suyama" 
};

public ActionResult ReplyTo()
{
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "Hi Michale, are we on track for the deadline?",
        Author = CurrentUserModel,
        Id = "chat-message-1"
    });
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "Yes, the design phase is complete.",
        Author = MichaleUserModel,
        Id = "chat-message-2"
    });
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "I'll review it and send feedback by today.",
        Author = CurrentUserModel,
        ReplyTo = new ReplyTo()
        {
            User = MichaleUserModel,
            Text = "Yes, the design phase is complete.",
            MessageID = "chat-message-2"
        }
    });
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}
```

### ReplyTo Properties

| Property | Type | Description |
|----------|------|-------------|
| `User` | ChatUIUser | The author of the original message being replied to |
| `Text` | string | The text content of the original message |
| `MessageID` | string | The unique ID of the original message |

## Forwarded Messages

### Overview

Use the `isForwarded` property to indicate when a message has been forwarded from another conversation. This helps track message origin and distinguish forwarded content.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-messages>
            @foreach (var message in ViewBag.ChatMessagesData)
            {
                <e-chatui-message text="@message.Text" 
                                author="@message.Author" 
                                isForwarded="@message.IsForwarded"></e-chatui-message>
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
public ChatUIUser MichaleUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "user2", 
    User = "Michale Suyama" 
};

public ActionResult Forward()
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
        Author = CurrentUserModel,
        IsForwarded = true
    });
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}
```

## Compact Mode

### Overview

Compact mode aligns all messages to the left side of the chat, creating a streamlined layout ideal for group conversations or space-constrained interfaces. Enable it with the `enableCompactMode` property on the `ejs-chatui` element.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" enableCompactMode="true">
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
public ChatUIUser MichaleUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "user2", 
    User = "Michale Suyama" 
};

public ActionResult CompactMode()
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

### Use Cases

- Group chats with multiple users
- Chat widgets with limited width (sidebars, panels)
- Mobile-optimized chat interfaces
- Minimalist chat displays

## Common Patterns

### Combine Features

Combine message features for complex scenarios:

```csharp
// Create a pinned reply to another message
ChatMessagesData.Add(new ChatUIMessage()
{
    Text = "Exactly! We're on schedule.",
    Author = CurrentUserModel,
    IsPinned = true,
    ReplyTo = new ReplyTo()
    {
        User = MichaleUserModel,
        Text = "Yes, the design phase is complete.",
        MessageID = "chat-message-2"
    }
});
```

## Attached Files in Messages

### Setting Attached Files

The `attachedFile` property specifies the list of files attached within a message. This property accepts an array of FileInfo objects that represent the files to be attached. By providing these files, they will be rendered during the initial rendering of the component.

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
        
        // Create message with attached files
        var messageWithAttachment = {
            text: "Here are the documents you requested",
            author: { id: "user1", user: "Albert" },
            attachedFile: [
                { name: "project-proposal.pdf", size: 2048576, type: "application/pdf" },
                { name: "budget.xlsx", size: 1024000, type: "application/vnd.ms-excel" }
            ]
        };
        
        chatUIObj.messages = [messageWithAttachment];
        chatUIObj.dataBind();
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

public ActionResult AttachedFiles()
{
    
    // Create message with attached files
    var message = new ChatUIMessage()
    {
        Text = "Here are the documents you requested",
        Author = CurrentUserModel,
        AttachedFile = new List<object>
        {
            new { name = "project-proposal.pdf", size = 2048576, type = "application/pdf" },
            new { name = "budget.xlsx", size = 1024000, type = "application/vnd.ms-excel" }
        }
    };
    
    ChatMessagesData.Add(message);
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}
```

## Message Status

### Setting Message Status

The `status` property specifies the status of the message in the Chat-UI component. It helps in tracking the messages within the chat component, such as sent, received, or read.

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
        
        // Create messages with different statuses
        var messages = [
            {
                text: "This message is sent",
                author: { id: "user1", user: "Albert" },
                status: { text: "Sent", iconCss: "e-icons e-check" }
            },
            {
                text: "This message is delivered",
                author: { id: "user1", user: "Albert" },
                status: { text: "Delivered", iconCss: "e-icons e-double-check" }
            },
            {
                text: "This message is read",
                author: { id: "user1", user: "Albert" },
                status: { text: "Read", iconCss: "e-icons e-double-check", cssClass: "read-status" }
            }
        ];
        
        chatUIObj.messages = messages;
        chatUIObj.dataBind();
    }
</script>

<style>
    .read-status {
        color: #2196f3;
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

public ActionResult MessageStatus()
{
    
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "This message is sent",
        Author = CurrentUserModel,
        Status = new { text = "Sent", iconCss = "e-icons e-check" }
    });
    
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "This message is delivered",
        Author = CurrentUserModel,
        Status = new { text = "Delivered", iconCss = "e-icons e-double-check" }
    });
    
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "This message is read",
        Author = CurrentUserModel,
        Status = new { text = "Read", iconCss = "e-icons e-double-check", cssClass = "read-status" }
    });
    
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}
```

### Status Properties

| Property | Type | Description |
|----------|------|-------------|
| `text` | string | Status text (e.g., "Sent", "Delivered", "Read") |
| `iconCss` | string | CSS class for status icon |
| `cssClass` | string | Additional CSS class for custom styling |

### Common Status States

| Status | Icon | Use Case |
|--------|------|----------|
| Sent | `e-icons e-check` | Message sent to server |
| Delivered | `e-icons e-double-check` | Message delivered to recipient |
| Read | `e-icons e-double-check` (colored) | Message read by recipient |
| Failed | `e-icons e-error` | Message failed to send |
| Pending | `e-icons e-time` | Message being sent |

## Mentioned Users in Messages

### Setting Mentioned Users

The `mentionUsers` property represents an array of users mentioned in the message. This field contains the list of users referenced via the @mention feature in the message text, populated when mentions are selected from the suggestion popup.

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
        
        // Create message with mentioned users
        var message = {
            text: "@Michale and @Andrew, please review the proposal",
            author: { id: "user1", user: "Albert" },
            mentionUsers: [
                { id: "user2", user: "Michale Suyama" },
                { id: "user3", user: "Andrew Fuller" }
            ]
        };
        
        chatUIObj.messages = [message];
        chatUIObj.dataBind();
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
public ChatUIUser AndrewUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "user3", 
    User = "Andrew Fuller" 
};

public ActionResult MentionedUsers()
{
    
    var message = new ChatUIMessage()
    {
        Text = "@Michale and @Andrew, please review the proposal",
        Author = CurrentUserModel,
        MentionUsers = new List<ChatUIUser>
        {
            MichaleUserModel,
            AndrewUserModel
        }
    };
    
    ChatMessagesData.Add(message);
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}
```

## Edge Cases

- Messages without timestamps will use current time by default
- Setting IsPinned on many messages may reduce visual impact
- ReplyTo contexts should match existing message IDs for proper display
- Forwarded messages retain original author attribution in the isForwarded indicator
- AttachedFile requires proper file objects with name, size, and type properties
- Status icon classes must be valid Syncfusion icon CSS classes
- MentionUsers should contain valid ChatUIUser objects matching the mention text
