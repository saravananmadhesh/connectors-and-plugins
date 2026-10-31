# Advanced Features in Chat-UI

## Table of Contents
- [Load On Demand](#load-on-demand)
- [Auto Scroll to Bottom](#auto-scroll-to-bottom)
- [Enable Persistence](#enable-persistence)

## Load On Demand

The `loadOnDemand` property enables on-demand loading of messages, typically triggered as the user scrolls through the chat history. When enabled, older messages will load progressively, improving performance for large message histories by avoiding initial loading of all messages.

### Enabling Load On Demand

Set `loadOnDemand="true"` to enable progressive message loading:

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" loadOnDemand="true">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-messages>
            @foreach (var message in ViewBag.ChatMessagesData)
            {
                <e-chatui-message text="@message.Text" 
                                author="@message.Author"
                                timeStamp="@message.TimeStamp"></e-chatui-message>
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

public ActionResult LoadOnDemand()
{
    
    // Load initial batch of messages (most recent)
    var recentMessages = GetRecentMessages(20); // Load last 20 messages
    ChatMessagesData = recentMessages;
    
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}

private List<ChatUIMessage> GetRecentMessages(int count)
{
    // Fetch most recent messages from database or service
    var allMessages = FetchAllMessagesFromDatabase();
    return allMessages.OrderByDescending(m => m.TimeStamp).Take(count).Reverse().ToList();
}

private List<ChatUIMessage> FetchAllMessagesFromDatabase()
{
    // Database query or service call
    return new List<ChatUIMessage>(); // Implementation depends on your data source
}
```

**Default Value:** `false`

### How Load On Demand Works

1. **Initial Load:** Only the most recent messages are loaded (e.g., last 20-50 messages)
2. **Scroll Detection:** When user scrolls to the top of the chat, a load event is triggered
3. **Progressive Loading:** Older messages are fetched and prepended to the chat
4. **Performance Benefit:** Reduces initial page load time and memory usage

### Use Cases

- **Large conversation histories:** Chats with thousands of messages
- **Customer support tickets:** Long-running support conversations
- **Group discussions:** High-volume team channels
- **Archive viewing:** Historical message browsing
- **Mobile applications:** Limited bandwidth and memory constraints
- **Performance optimization:** Reduce initial load time

## Auto Scroll to Bottom

The `autoScrollToBottom` property specifies whether the UI should automatically scroll to the bottom when a new message is added to the Chat-UI component. When set to `true`, the chat will automatically scroll to display the latest message, ensuring that users can see new messages without manual intervention.

### Enabling Auto Scroll

Set `autoScrollToBottom="true"` to enable automatic scrolling:

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" autoScrollToBottom="true">
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

public ActionResult AutoScroll()
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
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}
```

**Default Value:** `false`

### When Auto Scroll Activates

Auto scroll to bottom triggers in the following scenarios:

1. **New message sent:** User sends a new message
2. **New message received:** New message arrives from other participants
3. **Message added programmatically:** Messages added via API
4. **Initial render:** Component loads with messages
5. **Message updates:** Existing messages are updated

### Use Cases

**Enable Auto Scroll (`true`):**
- Active conversations with frequent messages
- Real-time chat applications
- Customer support chats (agent view)
- Live event discussions
- Team collaboration in active channels

**Disable Auto Scroll (`false`):**
- Reading historical messages
- Searching through conversation history
- Reviewing old messages while new ones arrive
- Multi-tasking scenarios
- Archive viewing

## Enable Persistence

The `enablePersistence` property enables or disables persisting the component's state between page reloads. When enabled, the Chat-UI will remember its state (scroll position, loaded messages, user preferences) across browser sessions.

### Enabling Persistence

Set `enablePersistence="true"` to enable state persistence:

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" enablePersistence="true">
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

public ActionResult Persistence()
{
    ChatMessagesData = LoadMessagesFromService();
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}

private List<ChatUIMessage> LoadMessagesFromService()
{
    // Load messages from database or service
    return new List<ChatUIMessage>();
}
```

**Default Value:** `false`

## Common Patterns

### Combine Load On Demand with Auto Scroll

```razor
<ejs-chatui id="chatUser" 
            loadOnDemand="true" 
            autoScrollToBottom="true"
            created="onCreated">
    <e-chatui-user id="user1" user="Albert"></e-chatui-user>
</ejs-chatui>

<script>
    function onCreated() {
        // Load On Demand handles historical messages
        setupLoadOnDemand();
        
        // Auto Scroll handles new messages
        // Already enabled via property
    }
</script>
```

### Performance Optimization

```razor
<ejs-chatui id="chatUser" 
            loadOnDemand="true" 
            autoScrollToBottom="true"
            enablePersistence="true">
    <e-chatui-user id="user1" user="Albert"></e-chatui-user>
</ejs-chatui>
```

This combination provides:
- **Load On Demand:** Reduces initial load time
- **Auto Scroll:** Improves UX for new messages
- **Persistence:** Maintains user context across sessions
