# Header & Footer Configuration in Chat-UI

## Overview

The header displays chat context information while the footer provides the message input area. Both can be customized or hidden based on your application requirements.

## Header Configuration

### Show or Hide Header

Use the `showHeader` property to enable or disable the chat header. The header contains:
- `headerText` - Title or name display
- `headerIconCss` - Icon styling

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" headerText="Michale" headerIconCss="e-icons e-people" showHeader="false">
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

public ActionResult ShowHeader()
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

**Default:** `true` (header is visible)

### Setting Header Text

The `headerText` property displays text that appears in the header, indicating the current username or group name providing context for the conversation.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" headerText="Michale">
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

public ActionResult HeaderText()
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

### Setting Header Icon CSS

Use the `headerIconCss` property to customize the styling of the header icon. Apply Syncfusion icon classes or custom CSS classes.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" headerIconCss="e-icons e-people">
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

public ActionResult HeaderIconCss()
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

### Common Header Icons

| Icon Class | Description |
|-----------|-------------|
| `e-icons e-people` | Multiple people (group chat) |
| `e-icons e-user` | Single user |
| `e-icons e-support-agent` | Support/agent icon |
| `e-icons e-circle` | Generic circle indicator |
| `e-icons e-star` | Star/favorite indicator |

## Footer Configuration

### Show or Hide Footer

Use the `showFooter` property to enable or disable the chat footer. The footer contains the message input area.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="chatui-container" style="height:380px; width:450px">
    <ejs-chatui id="chatUser" showFooter="false">
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

public ActionResult HideFooter()
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

**Default:** `true` (footer is visible)

### Use Cases for Hiding Footer

- **Read-only chat history:** Display messages without input capability
- **Archived conversations:** Show past conversations without reply option
- **Admin review mode:** Review messages in read-only format
- **Mobile layouts:** Conditionally hide footer on small screens

## Footer Template

Customize the footer appearance using the `footerTemplate` property. Refer to the [Templates & Customization](templates-customization.md#footer-template) section for detailed footer template implementation.

## Common Patterns

### Chat with Custom Header Only

```razor
<ejs-chatui id="chatUI" 
            headerText="Support Team"
            headerIconCss="e-icons e-support-agent"
            showHeader="true"
            showFooter="true">
    <e-chatui-user id="user1" user="Albert"></e-chatui-user>
</ejs-chatui>
```

### Read-Only Message View

```razor
<ejs-chatui id="chatUI" 
            headerText="Chat History"
            showHeader="true"
            showFooter="false">
    <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    <e-chatui-messages>
        @foreach (var message in ViewBag.ChatMessagesData)
        {
            <e-chatui-message text="@message.Text" author="@message.Author"></e-chatui-message>
        }
    </e-chatui-messages>
</ejs-chatui>
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

public ActionResult ReadOnly()
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

### Minimal Header with Icon

```razor
<ejs-chatui id="chatUI" 
            headerText="Agent"
            headerIconCss="e-icons e-circle"
            showHeader="true">
    <e-chatui-user id="user1" user="Albert"></e-chatui-user>
</ejs-chatui>
```

## Responsive Considerations

- **Header:** Always ensure header text is concise and fits mobile widths
- **Footer:** Consider modal/overlay inputs on very small screens
- **Icons:** Test icon visibility across different DPI settings

## Edge Cases

- **Empty headerText:** Header still displays with just icon
- **Very long headerText:** Text may overflow; consider truncation with CSS
- **Missing headerIconCss:** Header displays without icon
- **showFooter=false:** Users cannot send new messages; only view existing messages
