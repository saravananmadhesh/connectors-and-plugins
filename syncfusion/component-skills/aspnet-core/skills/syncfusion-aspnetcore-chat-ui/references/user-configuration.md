# User Configuration in Chat-UI

## Overview

User configuration in Chat-UI defines who is participating in the conversation. The `ChatUIUser` model represents each participant, and the current user is set using the `<e-chatui-user>` tag directive. Proper user setup ensures correct message attribution and user identification.

## ChatUIUser Model

The `ChatUIUser` class defines user properties:

```csharp
public class ChatUIUser
{
    public string Id { get; set; }            // Unique identifier for the user
    public string User { get; set; }          // Display name of the user
    public string AvatarUrl { get; set; }     // Avatar image URL (optional)
    public string AvatarBgColor { get; set; } // Background color for avatar (optional)
    public string CssClass { get; set; }      // CSS class for custom styling (optional)
    public string StatusIconCss { get; set; } // CSS class for status icon (optional)
}
```

**Note:** If `AvatarUrl` is not provided, the user's initials (first and last name) are automatically generated from the `User` property.

## Setting Current User

The current user is the logged-in participant whose messages appear on the right side of the chat. Set it using the `<e-chatui-user>` tag directive with required `id` and `user` attributes.

### Basic User Setup

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    </ejs-chatui>
</div>
```

**C# Code-Behind:**
```csharp
using Syncfusion.EJ2.InteractiveChat;

public ActionResult Default()
{
    return View();
}
```

## Multi-User Support

Chat-UI supports multiple users in the same conversation. Other users are defined as message authors through the `author` property of `ChatUIMessage`.

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
public ChatUIUser OtherUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "user2", 
    User = "Michale Suyama" 
};

public ActionResult MultiUser()
{
    // Current user's message (appears right-aligned)
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "Hi Michale, are we on track for the deadline?",
        Author = CurrentUserModel
    });
    
    // Other user's message (appears left-aligned)
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "Yes, the design phase is complete.",
        Author = OtherUserModel
    });
    
    // Current user's reply
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "I'll review it and send feedback by today.",
        Author = CurrentUserModel
    });
    
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}
```

## User Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `Id` | string | Yes | Unique identifier for the user (e.g., "user1", "agent-002") |
| `User` | string | Yes | Display name shown in the chat (e.g., "Albert", "Support Agent"). Initials are auto-generated from this if no avatar is provided. |
| `AvatarUrl` | string | No | URL to user's avatar image |
| `AvatarBgColor` | string | No | Background color for avatar in hex format (e.g., "#FFFFFF") |
| `CssClass` | string | No | CSS class name(s) for custom styling of user messages |
| `StatusIconCss` | string | No | CSS class for custom status icon (e.g., "e-icons e-circle-check") |

## Avatar Configuration

### Using Avatar Image URL

Display user avatars by setting the `AvatarUrl` property with an image URL:

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser">
        <e-chatui-user id="user1" user="Albert" avatarUrl="https://example.com/albert.jpg"></e-chatui-user>
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
    User = "Albert",
    AvatarUrl = "https://example.com/albert.jpg"
};
public ChatUIUser OtherUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "user2", 
    User = "Michale Suyama",
    AvatarUrl = "https://example.com/michale.jpg"
};

public ActionResult AvatarUrl()
{
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "Hi Michale, are we on track for the deadline?",
        Author = CurrentUserModel
    });
    
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "Yes, the design phase is complete.",
        Author = OtherUserModel
    });
    
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}
```

### Auto-Generated Avatar Initials

When `AvatarUrl` is not provided, the Chat UI automatically generates initials from the user's name as a fallback. The initials are derived from the first and last name in the `User` property.

**Example:**
```csharp
public ChatUIUser CurrentUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "user1", 
    User = "Albert Brown"  // Initials "AB" will be auto-generated
};
public ChatUIUser OtherUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "user2", 
    User = "Michale Suyama"  // Initials "MS" will be auto-generated
};
```

**Note:** If the user name has only one word (e.g., "Albert"), only the first letter will be used as the initial.

### Custom Avatar Background Color

Use the `AvatarBgColor` property to customize the background color of user avatars:

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser">
        <e-chatui-user id="user1" user="Albert Brown" avatarBgColor="#4CAF50"></e-chatui-user>
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
    User = "Albert Brown",
    AvatarBgColor = "#4CAF50"  // Green background
};
public ChatUIUser OtherUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "user2", 
    User = "Michale Suyama",
    AvatarBgColor = "#2196F3"  // Blue background
};

public ActionResult AvatarBgColor()
{
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "Hi Michale, are we on track for the deadline?",
        Author = CurrentUserModel
    });
    
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "Yes, the design phase is complete.",
        Author = OtherUserModel
    });
    
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}
```

**Common Avatar Background Colors:**

| Color | Hex Code | Use Case |
|-------|----------|----------|
| Green | #4CAF50 | Success, available |
| Blue | #2196F3 | Information, default |
| Red | #F44336 | Error, urgent |
| Orange | #FF9800 | Warning, away |
| Purple | #9C27B0 | Premium, VIP |
| Gray | #9E9E9E | Inactive, offline |

## User Presence Status

Track which users are currently active or typing by creating additional UI elements or using custom templates. Status information can be stored separately and displayed through custom styling or templates.

**Example: Status Tracking**
```csharp
public class UserStatus
{
    public ChatUIUser User { get; set; }
    public bool IsOnline { get; set; }
    public bool IsTyping { get; set; }
}

// Usage in controller
var userStatuses = new List<UserStatus>()
{
    new UserStatus 
    { 
        User = CurrentUserModel, 
        IsOnline = true, 
        IsTyping = false 
    },
    new UserStatus 
    { 
        User = OtherUserModel, 
        IsOnline = true, 
        IsTyping = true 
    }
};

ViewBag.UserStatuses = userStatuses;
```

## Message Author Assignment

When adding messages, ensure the `author` property is set to the correct `ChatUIUser` object to properly attribute messages:

**Correct:**
```csharp
ChatMessagesData.Add(new ChatUIMessage()
{
    Text = "This is my message",
    Author = CurrentUserModel  // Message attributed to correct user
});
```

**Incorrect:**
```csharp
ChatMessagesData.Add(new ChatUIMessage()
{
    Text = "This is my message",
    Author = new ChatUIUser { Id = "user1", User = "Albert" }  // New instance - may not display correctly
});
```

## Common Patterns

### Group Chat Setup

Create a group chat with multiple users:

```csharp
public ActionResult GroupChat()
{
    var alice = new ChatUIUser { Id = "u1", User = "Alice Anderson" };  // Initials "AA" auto-generated
    var bob = new ChatUIUser { Id = "u2", User = "Bob Builder" };       // Initials "BB" auto-generated
    var carol = new ChatUIUser { Id = "u3", User = "Carol Carter" };    // Initials "CC" auto-generated
    
    ChatMessagesData.Add(new ChatUIMessage() { Text = "Hey team!", Author = alice });
    ChatMessagesData.Add(new ChatUIMessage() { Text = "Hello Alice!", Author = bob });
    ChatMessagesData.Add(new ChatUIMessage() { Text = "Hi everyone!", Author = carol });
    
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}
```

**Note:** Set the current user in the Razor template using `<e-chatui-user id="u1" user="Alice Anderson"></e-chatui-user>`

### User Switching

Change the current user for different chat contexts:

```csharp
public ActionResult SwitchUser(string userId)
{
    // User definition is handled in the Razor template
    // Use ViewBag or route parameters to pass userId to the view if needed
    ViewBag.UserId = userId ?? "user1";
    return View();
}
```

**Razor Template Example:**
```razor
<ejs-chatui id="chatUser">
    @if (ViewBag.UserId == "user1")
    {
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    }
    else if (ViewBag.UserId == "user2")
    {
        <e-chatui-user id="user2" user="Michale"></e-chatui-user>
    }
</ejs-chatui>
```

## Status Icon CSS

### Using StatusIconCss

The `statusIconCss` property specifies the CSS class to customize the appearance of the user's status icon. This allows you to add custom status indicators (like online, away, busy) to user avatars.

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
        
        // Create messages with users having different status icons
        var messages = [
            {
                text: "I'm available now",
                author: { 
                    id: "user1", 
                    user: "Albert",
                    statusIconCss: "e-icons e-circle-check status-online"
                }
            },
            {
                text: "I'm in a meeting",
                author: { 
                    id: "user2", 
                    user: "Michale",
                    statusIconCss: "e-icons e-circle status-busy"
                }
            },
            {
                text: "Be right back",
                author: { 
                    id: "user3", 
                    user: "Janet",
                    statusIconCss: "e-icons e-circle-info status-away"
                }
            }
        ];
        
        chatUIObj.messages = messages;
        chatUIObj.dataBind();
    }
</script>

<style>
    .status-online {
        color: #4caf50;
    }
    
    .status-busy {
        color: #f44336;
    }
    
    .status-away {
        color: #ff9800;
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
    User = "Albert",
    StatusIconCss = "e-icons e-circle-check status-online"
};
public ChatUIUser BusyUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "user2", 
    User = "Michale",
    StatusIconCss = "e-icons e-circle status-busy"
};
public ChatUIUser AwayUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "user3", 
    User = "Janet",
    StatusIconCss = "e-icons e-circle-info status-away"
};

public ActionResult StatusIcons()
{
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "I'm available now",
        Author = CurrentUserModel
    });
    
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "I'm in a meeting",
        Author = BusyUserModel
    });
    
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "Be right back",
        Author = AwayUserModel
    });
    
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}
```

### Common Status Icon Classes

| Status | Icon CSS | Color | Use Case |
|--------|----------|-------|----------|
| Online | `e-icons e-circle-check` | Green (#4caf50) | User is active |
| Busy | `e-icons e-circle` | Red (#f44336) | User is in a meeting or busy |
| Away | `e-icons e-circle-info` | Orange (#ff9800) | User is temporarily away |
| Offline | `e-icons e-circle-close` | Gray (#9e9e9e) | User is not connected |
| Do Not Disturb | `e-icons e-minus-circle` | Red (#f44336) | User should not be disturbed |

## User CSS Class

### Using CssClass Property

The `cssClass` property allows you to add custom CSS classes to individual users for personalized styling. This enables user-specific visual customization beyond the default theme.

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
        
        // Create messages with users having custom CSS classes
        var messages = [
            {
                text: "This is an admin message",
                author: { 
                    id: "admin1", 
                    user: "Admin",
                    cssClass: "admin-user"
                }
            },
            {
                text: "This is a moderator message",
                author: { 
                    id: "mod1", 
                    user: "Moderator",
                    cssClass: "moderator-user"
                }
            },
            {
                text: "This is a regular user message",
                author: { 
                    id: "user1", 
                    user: "Albert",
                    cssClass: "regular-user"
                }
            }
        ];
        
        chatUIObj.messages = messages;
        chatUIObj.dataBind();
    }
</script>

<style>
    .admin-user .e-message {
        background-color: #ffebee;
        border-left: 4px solid #f44336;
    }
    
    .moderator-user .e-message {
        background-color: #e8f5e9;
        border-left: 4px solid #4caf50;
    }
    
    .regular-user .e-message {
        background-color: #e3f2fd;
        border-left: 4px solid #2196f3;
    }
</style>
```

**C# Code-Behind:**
```csharp
using Syncfusion.EJ2.InteractiveChat;

public List<ChatUIMessage> ChatMessagesData { get; set; } = new List<ChatUIMessage>();
public ChatUIUser AdminUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "admin1", 
    User = "Admin",
    CssClass = "admin-user"
};
public ChatUIUser ModeratorUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "mod1", 
    User = "Moderator",
    CssClass = "moderator-user"
};
public ChatUIUser RegularUserModel { get; set; } = new ChatUIUser() 
{ 
    Id = "user1", 
    User = "Albert",
    CssClass = "regular-user"
};

public ActionResult UserCssClass()
{
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "This is an admin message",
        Author = AdminUserModel
    });
    
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "This is a moderator message",
        Author = ModeratorUserModel
    });
    
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "This is a regular user message",
        Author = RegularUserModel
    });
    
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}
```

### Common Use Cases for CssClass

| Use Case | CSS Class | Styling Purpose |
|----------|-----------|-----------------|
| Admin Users | `admin-user` | Distinguish administrative messages |
| Moderators | `moderator-user` | Highlight moderator messages |
| VIP Users | `vip-user` | Special styling for important users |
| Bot Messages | `bot-user` | Different appearance for automated responses |
| Guest Users | `guest-user` | Distinguish guest from registered users |

## Edge Cases

- **User ID uniqueness:** Ensure each user has a unique `Id` to avoid message attribution errors
- **Missing AvatarUrl:** If `AvatarUrl` is not provided, initials are automatically generated from the `User` property (first and last name)
- **Single-word names:** For names with only one word (e.g., "Albert"), only the first letter is used as the initial
- **User display:** Ensure user names are concise and fit in the UI
- **Cross-browser avatars:** Test image URLs across different browsers and devices
- **Invalid avatar URLs:** If the avatar URL is invalid or returns 404, the system falls back to auto-generated initials
- **AvatarBgColor format:** Use hexadecimal color format (e.g., "#FFFFFF") for `AvatarBgColor`
- **Status icon classes:** Ensure `StatusIconCss` uses valid Syncfusion icon classes or custom CSS classes defined in your stylesheet
- **CSS class specificity:** When using `CssClass`, ensure your custom styles have sufficient specificity to override default theme styles
