# Toolbar Configuration in Chat-UI

## Table of Contents
- [Header Toolbar](#header-toolbar)
- [Message Toolbar Settings](#message-toolbar-settings)
- [Toolbar Items Configuration](#toolbar-items-configuration)
- [Toolbar Events](#toolbar-events)
- [Common Patterns](#common-patterns)

## Header Toolbar

The `headerToolbar` property configures the toolbar displayed in the Chat-UI header. Use this to add custom actions, navigation buttons, or utility features accessible from the header area.

### Setting Header Toolbar

Configure the header toolbar using the `<e-chatui-headertoolbar>` tag directive:

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-headertoolbar items="@ViewBag.HeaderToolbar" itemClicked="onHeaderToolbarClick">
        </e-chatui-headertoolbar>
    </ejs-chatui>
</div>

<script>
    function onHeaderToolbarClick(args) {
        console.log("Header toolbar item clicked:", args.item.text);
        // Handle toolbar action based on item clicked
        if (args.item.text === "Search") {
            // Open search functionality
        } else if (args.item.text === "Settings") {
            // Open settings dialog
        }
    }
</script>
```

**C# Code-Behind:**
```csharp
using Syncfusion.EJ2.InteractiveChat;

public List<ToolbarItemModel> HeaderToolbar { get; set; } = new List<ToolbarItemModel>();

public ActionResult HeaderToolbar()
{
    HeaderToolbar.Add(new ToolbarItemModel { align = "Right", iconCss = "e-icons e-menu" });
    ViewBag.HeaderToolbar = HeaderToolbar;
    return View();
}
```

### Header Toolbar Properties

| Property | Type | Description |
|----------|------|-------------|
| `items` | object | Collection of toolbar items to display |
| `itemClicked` | string | Event handler for toolbar item clicks |

### Header Toolbar Use Cases

- **Search:** Add search functionality to find messages
- **Settings:** Configure chat preferences and options
- **Info:** Display participant information or chat details
- **Video/Audio:** Start video or audio calls
- **Pin/Unpin:** Toggle pinned messages view
- **Archive:** Archive the conversation

## Message Toolbar Settings

The `messageToolbarSettings` property configures the toolbar displayed for individual messages. This provides context-specific actions like reply, forward, copy, pin, and delete.

### Setting Message Toolbar

Configure message-level toolbar using the `<e-chatui-messagetoolbarsettings>` tag directive:

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-messagetoolbarsettings items="@ViewBag.MessageToolbarItems" itemClicked="onMessageToolbarClick" width="250px">
        </e-chatui-messagetoolbarsettings>
        <e-chatui-messages>
            @foreach (var message in ViewBag.ChatMessagesData)
            {
                <e-chatui-message text="@message.Text" author="@message.Author"></e-chatui-message>
            }
        </e-chatui-messages>
    </ejs-chatui>
</div>

<script>
    function onMessageToolbarClick(args) {
        console.log("Message toolbar item clicked:", args.item.text);
        console.log("Message data:", args.message);
        
        // Handle toolbar action
        switch(args.item.text) {
            case "Reply":
                // Implement reply functionality
                replyToMessage(args.message);
                break;
            case "Forward":
                // Implement forward functionality
                forwardMessage(args.message);
                break;
            case "Copy":
                // Copy message text to clipboard
                navigator.clipboard.writeText(args.message.text);
                break;
            case "Pin":
                // Pin/unpin message
                togglePinMessage(args.message);
                break;
            case "Delete":
                // Delete message
                deleteMessage(args.message);
                break;
        }
    }
    
    function replyToMessage(message) {
        // Implementation for reply
    }
    
    function forwardMessage(message) {
        // Implementation for forward
    }
    
    function togglePinMessage(message) {
        // Implementation for pin/unpin
    }
    
    function deleteMessage(message) {
        // Implementation for delete
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
public List<ToolbarItemModel> MessageToolbarItems { get; set; } = new List<ToolbarItemModel>();

public ActionResult MessageToolbar()
{
    MessageToolbarItems.Add(new ToolbarItemModel { type = "Button", text = "Reply", iconCss = "e-icons e-reply" });
    MessageToolbarItems.Add(new ToolbarItemModel { type = "Button", text = "Forward", iconCss = "e-icons e-share" });
    MessageToolbarItems.Add(new ToolbarItemModel { type = "Button", text = "Copy", iconCss = "e-icons e-copy" });
    MessageToolbarItems.Add(new ToolbarItemModel { type = "Button", text = "Pin", iconCss = "e-icons e-pin" });
    MessageToolbarItems.Add(new ToolbarItemModel { type = "Button", text = "Delete", iconCss = "e-icons e-delete" });
    
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
    ViewBag.ChatMessagesData = ChatMessagesData;
    ViewBag.MessageToolbarItems = MessageToolbarItems;
    return View();
}
```

### Message Toolbar Properties

| Property | Type | Description |
|----------|------|-------------|
| `items` | object | Collection of toolbar items to display for messages |
| `itemClicked` | string | Event handler for message toolbar item clicks |
| `width` | string | Width of the message toolbar (default: "100%") |

### Default Message Toolbar Items

If `items` is not provided, the following default toolbar actions are rendered:
- **Copy** - Copy message text
- **Reply** - Reply to the message
- **Pin** - Pin/unpin the message
- **Delete** - Delete the message

## Toolbar Items Configuration

### Toolbar Item Properties

Each toolbar item supports the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `type` | string | Type of toolbar item ("Button", "Separator") |
| `text` | string | Display text for the toolbar item |
| `iconCss` | string | CSS class for the item icon |
| `id` | string | Unique identifier for the item |
| `tooltipText` | string | Tooltip text displayed on hover |
| `align` | string | Alignment of item ("Left", "Center", "Right") |
| `disabled` | boolean | Whether the item is disabled |

### Available Icon Classes

Common Syncfusion icon classes for toolbar items:

| Icon | Class | Use Case |
|------|-------|----------|
| Search | `e-icons e-search` | Search messages |
| Settings | `e-icons e-settings` | Chat settings |
| Info | `e-icons e-info` | Chat information |
| Reply | `e-icons e-reply` | Reply to message |
| Forward | `e-icons e-share` | Forward message |
| Copy | `e-icons e-copy` | Copy message |
| Pin | `e-icons e-pin` | Pin message |
| Delete | `e-icons e-delete` | Delete message |
| Edit | `e-icons e-edit` | Edit message |
| Video | `e-icons e-video` | Video call |
| Phone | `e-icons e-phone` | Audio call |
| Attachment | `e-icons e-attach` | Attach files |

## Toolbar Events

### Header Toolbar Item Clicked Event

The `itemClicked` event fires when a user clicks a header toolbar item.

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `item` | object | The clicked toolbar item |
| `item.text` | string | Text of the clicked item |
| `item.id` | string | ID of the clicked item |
| `originalEvent` | Event | Original DOM event |

### Message Toolbar Item Clicked Event

The `itemClicked` event fires when a user clicks a message toolbar item.

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `item` | object | The clicked toolbar item |
| `message` | ChatUIMessage | The message associated with the toolbar |
| `originalEvent` | Event | Original DOM event |

## Common Patterns

### Minimal Header Toolbar

**Razor Template:**
```razor
<e-chatui-headertoolbar items="@ViewBag.MinimalHeaderToolbar" itemClicked="onHeaderToolbarClick">
</e-chatui-headertoolbar>
```

**C# Code-Behind:**
```csharp
public List<ToolbarItemModel> MinimalHeaderToolbar { get; set; } = new List<ToolbarItemModel>();

public ActionResult MinimalHeader()
{
    MinimalHeaderToolbar.Add(new ToolbarItemModel { type = "Button", iconCss = "e-icons e-search", tooltipText = "Search" });
    MinimalHeaderToolbar.Add(new ToolbarItemModel { type = "Button", iconCss = "e-icons e-settings", tooltipText = "Settings" });
    ViewBag.MinimalHeaderToolbar = MinimalHeaderToolbar;
    return View();
}
```

### Custom Message Actions

**Razor Template:**
```razor
<e-chatui-messagetoolbarsettings items="@ViewBag.CustomMessageActions" itemClicked="onMessageToolbarClick">
</e-chatui-messagetoolbarsettings>
```

**C# Code-Behind:**
```csharp
public List<ToolbarItemModel> CustomMessageActions { get; set; } = new List<ToolbarItemModel>();

public ActionResult CustomActions()
{
    CustomMessageActions.Add(new ToolbarItemModel { type = "Button", text = "Translate", iconCss = "e-icons e-language" });
    CustomMessageActions.Add(new ToolbarItemModel { type = "Button", text = "React", iconCss = "e-icons e-like" });
    CustomMessageActions.Add(new ToolbarItemModel { type = "Separator" });
    CustomMessageActions.Add(new ToolbarItemModel { type = "Button", text = "Report", iconCss = "e-icons e-warning" });
    ViewBag.CustomMessageActions = CustomMessageActions;
    return View();
}
```

### Conditional Toolbar Items

Show different toolbar items based on conditions:

```javascript
function onMessageToolbarClick(args) {
    var message = args.message;
    var currentUser = getCurrentUser();
    
    // Only allow delete for own messages
    if (args.item.text === "Delete" && message.author.id !== currentUser.id) {
        args.cancel = true;
        alert("You can only delete your own messages");
        return;
    }
    
    // Process the action
    handleToolbarAction(args.item.text, message);
}
```

### Dynamic Toolbar Updates

Update toolbar items dynamically:

```javascript
function onCreated() {
    var chatUIObj = ej.base.getInstance(
        document.getElementById('chatUser'), 
        ejs.interactivechat.ChatUI
    );
    
    // Add dynamic toolbar item
    var newItem = {
        type: "Button",
        text: "Archive",
        iconCss: "e-icons e-archive"
    };
    
    // Update header toolbar (via JavaScript API if available)
    // chatUIObj.headerToolbar.items.push(newItem);
}
```

### Toolbar with Separators

**Razor Template:**
```razor
<e-chatui-headertoolbar items="@ViewBag.ToolbarWithSeparators" itemClicked="onHeaderToolbarClick">
</e-chatui-headertoolbar>
```

**C# Code-Behind:**
```csharp
public List<ToolbarItemModel> ToolbarWithSeparators { get; set; } = new List<ToolbarItemModel>();

public ActionResult ToolbarSeparators()
{
    ToolbarWithSeparators.Add(new ToolbarItemModel { type = "Button", text = "Search", iconCss = "e-icons e-search" });
    ToolbarWithSeparators.Add(new ToolbarItemModel { type = "Separator" });
    ToolbarWithSeparators.Add(new ToolbarItemModel { type = "Button", text = "Video", iconCss = "e-icons e-video" });
    ToolbarWithSeparators.Add(new ToolbarItemModel { type = "Button", text = "Audio", iconCss = "e-icons e-phone" });
    ToolbarWithSeparators.Add(new ToolbarItemModel { type = "Separator" });
    ToolbarWithSeparators.Add(new ToolbarItemModel { type = "Button", text = "Settings", iconCss = "e-icons e-settings" });
    ViewBag.ToolbarWithSeparators = ToolbarWithSeparators;
    return View();
}
```

## Use Cases

### Customer Support Chat
- Header toolbar: Search, Transfer, Close Ticket
- Message toolbar: Reply, Copy, Report Issue

### Team Collaboration
- Header toolbar: Video Call, Add Participants, Settings
- Message toolbar: Reply, Forward, Pin, React

### Social Messaging
- Header toolbar: Info, Search, Mute
- Message toolbar: Reply, Forward, Delete, Report

### Enterprise Communication
- Header toolbar: Search, Archive, Compliance
- Message toolbar: Reply, Forward, Copy, Legal Hold

## Edge Cases

- **Empty toolbar:** If no items configured, toolbar may not display
- **Too many items:** Consider using overflow menu for many toolbar items
- **Icon paths:** Ensure icon CSS classes are loaded correctly
- **Event bubbling:** Prevent default event bubbling if needed
- **Permission-based items:** Show/hide items based on user permissions
- **Disabled items:** Properly handle click events on disabled items

## Accessibility

- Toolbar items should have proper `tooltipText` for screen readers
- Use semantic HTML and ARIA labels where appropriate
- Ensure keyboard navigation works (Tab, Enter, Arrow keys)
- Test with screen readers for accessibility compliance
