# Appearance & Styling in Chat-UI

## Setting Placeholder

The placeholder property sets the hint text displayed in the message input field. The default placeholder is "Type your message…".

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" placeholder="Start typing...">
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

public ActionResult Placeholder()
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

## Setting Width

The width property controls the horizontal size of the Chat-UI component. The default is 100% (full container width).

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px;">
    <ejs-chatui id="chatUser" width="450px">
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

public ActionResult Width()
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

### Width Options

- **Pixel values:** `width="450px"` - Fixed width
- **Percentage:** `width="80%"` - Percentage of container
- **Auto:** `width="auto"` - Fits content

## Setting Height

The height property controls the vertical size of the Chat-UI component. The default is 100% (full container height).

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="width:450px;">
    <ejs-chatui id="chatUser" height="380px">
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

public ActionResult Height()
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

### Height Options

- **Pixel values:** `height="380px"` - Fixed height with scrolling if needed
- **Percentage:** `height="100%"` - Percentage of container
- **Auto:** `height="auto"` - Fits content

## Setting CSS Class

Customize the appearance of the Chat-UI component using the `cssClass` property to apply custom CSS classes for styling.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" cssClass="custom-container">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-messages>
            @foreach (var message in ViewBag.ChatMessagesData)
            {
                <e-chatui-message text="@message.Text" author="@message.Author"></e-chatui-message>
            }
        </e-chatui-messages>
    </ejs-chatui>
</div>

<style>
    .custom-container {
        border-color: #e0e0e0;
        background-color: #f4f4f4;
        box-shadow: 3px 3px 10px 0px rgba(0, 0, 0, 0.2);
    }

    .custom-container .e-chat-header {
        background: #0c888e;
    }

    .custom-container .e-footer .e-input-group {
        border: 3px solid #bde0e2;
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

public ActionResult CssClass()
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

### Custom CSS Classes

Target specific Chat-UI elements with CSS:

| Selector | Element | Use Case |
|----------|---------|----------|
| `.e-chat-header` | Header section | Customize header background, text, icons |
| `.e-footer` | Footer/input section | Style input area and send button |
| `.e-input-group` | Input box | Style message input field |
| `.e-right` | Current user messages | Style your own messages |
| `.e-left` | Other user messages | Style received messages |
| `.e-message` | Individual message | Style message bubbles |

### Advanced Styling Examples

**Dark Theme:**
```css
.dark-theme {
    background-color: #1e1e1e;
    color: #ffffff;
}

.dark-theme .e-chat-header {
    background-color: #0d47a1;
}

.dark-theme .e-message {
    background-color: #333333;
    color: #ffffff;
}
```

**Compact Layout:**
```css
.compact-layout {
    padding: 5px;
}

.compact-layout .e-message {
    margin: 2px 0;
    padding: 4px 8px;
    border-radius: 8px;
}
```

**Rounded Message Bubbles:**
```css
.rounded-messages .e-right .e-message {
    border-radius: 16px 16px 2px 16px;
    background-color: #c5ffbf;
}

.rounded-messages .e-left .e-message {
    border-radius: 16px 16px 16px 2px;
    background-color: #f5f5f5;
}
```

## Theme Customization

Chat-UI uses Syncfusion themes. Change the theme by updating the stylesheet reference in `_Layout.cshtml`:

**Available Themes:**
- Fluent (default): `fluent.css`
- Bootstrap: `bootstrap5.css`
- Material: `material.css`
- Fabric: `fabric.css`
- Tailwind: `tailwind.css`

**Example:**
```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/material.css" />
```

## Responsive Design

Create responsive chat layouts:

**Mobile-Friendly Layout:**
```razor
<div style="height:100vh; width:100%; max-width:100vw">
    <ejs-chatui id="chatUI" width="100%" height="100%">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    </ejs-chatui>
</div>
```

**Sidebar Chat:**
```razor
<div style="display:flex; height:100vh">
    <div style="width:300px; border-right:1px solid #ddd">
        <!-- Chat list -->
    </div>
    <div style="flex:1; display:flex; flex-direction:column">
        <ejs-chatui id="chatUI" width="100%" height="100%">
            <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        </ejs-chatui>
    </div>
</div>
```

## Common Patterns

### Combine Width, Height, and CSS Class

```razor
<ejs-chatui id="chatUI" 
            width="500px" 
            height="600px" 
            cssClass="custom-chat"
            placeholder="Ask me anything...">
    <e-chatui-user id="user1" user="Albert"></e-chatui-user>
</ejs-chatui>
```

### Responsive Container

```razor
<div style="width:100%; max-width:600px; height:500px">
    <ejs-chatui id="chatUI" width="100%" height="100%">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    </ejs-chatui>
</div>
```

## Edge Cases

- Very small heights may truncate messages; ensure minimum 250px
- Very large widths may make message bubbles too wide; consider max-width constraints
- CSS classes should not conflict with Syncfusion internal classes
- Percentage-based sizing requires parent container with defined dimensions
