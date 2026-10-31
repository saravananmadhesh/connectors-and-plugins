# User Configuration — Syncfusion ASP.NET MVC Chat UI

## Table of Contents
1. [ChatUIUser Model](#chatuiuser-model)
2. [Defining the Current User](#defining-the-current-user)
3. [Avatar URL](#avatar-url)
4. [Avatar Background Color](#avatar-background-color)
5. [User CSS Class](#user-css-class)
6. [User Status Icons](#user-status-icons)

---

## ChatUIUser Model

`ChatUIUser` represents a participant in the chat. It is used for both the `User` property (current user) and the `Author` property on each `ChatUIMessage`.

| Property | Type | Description |
|----------|------|-------------|
| `Id` | `string` | **Required.** Unique identifier. Determines message alignment — messages authored by the `User.Id` appear on the right. |
| `User` | `string` | Display name shown in the chat. |
| `AvatarUrl` | `string` | URL for the user's avatar image. |
| `AvatarBgColor` | `string` | Hex color for the avatar background when no image is set. |
| `CssClass` | `string` | Custom CSS class applied to the user's avatar element. |
| `StatusIconCss` | `string` | CSS class for presence status indicator (online/offline/busy/away). |

---

## Defining the Current User

The `User` property on the Chat UI identifies the logged-in user. Messages whose `Author.Id` matches `User.Id` appear right-aligned (sent messages); all others are left-aligned (received messages).

**Controller:**
```csharp
using Syncfusion.EJ2.InteractiveChat;

public ActionResult Index()
{
    var currentUser = new ChatUIUser { Id = "user1", User = "Albert" };
    var otherUser   = new ChatUIUser { Id = "user2", User = "Michale Suyama" };

    var messages = new List<ChatUIMessage>
    {
        new ChatUIMessage { Text = "Hi Michale!", Author = currentUser },
        new ChatUIMessage { Text = "Hi Albert!",  Author = otherUser  }
    };

    ViewBag.CurrentUser = currentUser;
    ViewBag.Messages    = messages;
    return View();
}
```

**View:**
```razor
@Html.EJS().ChatUI("chatUI")
    .User(ViewBag.CurrentUser)
    .Messages(ViewBag.Messages)
    .Render()
```

> **Important:** The `Id` property is essential for differentiating users. Always provide a unique, stable `Id` (e.g., a database user ID) — do not use display names as IDs.

---

## Avatar URL

Set `AvatarUrl` to display a profile image for the user. If omitted, the Chat UI automatically generates initials from the first and last word of the `User` name.

```csharp
var otherUser = new ChatUIUser
{
    Id        = "user2",
    User      = "Michale Suyama",
    AvatarUrl = "https://ej2.syncfusion.com/demos/src/avatar/images/pic03.png"
};
```

**Fallback behavior:** `"Michale Suyama"` → displays `"MS"` as initials when no URL is provided.

---

## Avatar Background Color

Use `AvatarBgColor` to set a specific background color (hex value) for the avatar when displaying initials. If not set, the component applies a theme-based color automatically.

```csharp
var otherUser = new ChatUIUser
{
    Id            = "user2",
    User          = "Michale Suyama",
    AvatarBgColor = "#ccc9f7"
};
```

This is useful for visually distinguishing participants in group chats.

---

## User CSS Class

Use `CssClass` to apply a custom CSS class to the user's avatar element for advanced styling:

```csharp
var otherUser = new ChatUIUser
{
    Id       = "user2",
    User     = "Michale Suyama",
    CssClass = "custom-user"
};
```

```css
.e-chat-ui .e-message-icon.custom-user {
    background-color: #416fbd;
    color: white;
    border-radius: 5px;
}
```

---

## User Status Icons

Use `StatusIconCss` to show a presence indicator on the user's avatar. The Chat UI provides predefined status CSS classes:

| Status | CSS Class |
|--------|-----------|
| Available (Online) | `e-icons e-user-online` |
| Away | `e-icons e-user-away` |
| Busy | `e-icons e-user-busy` |
| Offline | `e-icons e-user-offline` |

```csharp
var currentUser = new ChatUIUser
{
    Id           = "user1",
    User         = "Alice Brown",
    StatusIconCss = "e-icons e-user-online"
};
var user2 = new ChatUIUser
{
    Id           = "user2",
    User         = "Michale Suyama",
    StatusIconCss = "e-icons e-user-away"
};
var user3 = new ChatUIUser
{
    Id           = "user3",
    User         = "Charlie",
    StatusIconCss = "e-icons e-user-busy"
};
var user4 = new ChatUIUser
{
    Id           = "user4",
    User         = "Jordan Peele",
    StatusIconCss = "e-icons e-user-offline"
};
```

**View — group chat with header:**
```razor
@Html.EJS().ChatUI("chatUI")
    .User(ViewBag.CurrentUser)
    .Messages(ViewBag.Messages)
    .HeaderText("Design Community")
    .HeaderIconCss("chat_header_icon")
    .Render()
```

The status dot appears as a small colored circle overlaid on the avatar image or initials.

> **Real-time updates:** To update user status dynamically (e.g., from a SignalR hub), reassign the `typingUsers` or rebuild the messages collection and call `dataBind()`.
