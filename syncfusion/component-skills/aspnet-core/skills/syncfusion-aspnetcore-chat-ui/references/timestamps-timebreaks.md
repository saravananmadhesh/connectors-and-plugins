# Timestamps & Time Breaks in Chat-UI

## Show or Hide Timestamps

The `showTimeStamp` property enables or disables timestamps for all messages, displaying the exact date and time when they were sent.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;
@using Newtonsoft.Json;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" created="onCreated" showTimeStamp="false">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    </ejs-chatui>
</div>

<script>
    var chatUIObj;
    var chatMessages = @Html.Raw(JsonConvert.SerializeObject(ViewBag.ChatMessagesData));
    chatMessages.forEach(message => {
        message.timeStamp = new Date(message.timeStamp);
    });
    function onCreated() {
        var chatUiEle = document.getElementById('chatUser');
        chatUIObj = ej.base.getInstance(chatUiEle, ejs.interactivechat.ChatUI);
        chatUIObj.messages = chatMessages;
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

public ActionResult Timestamp()
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

**Default:** `true` (timestamps are visible)

### Use Cases

- **Show timestamps:** Audit trails, professional support chats, legal conversations
- **Hide timestamps:** Personal messaging, social chats, gaming lobbies

## Timestamp Format Customization

### Setting Timestamp Format

Use the `timeStampFormat` property to customize the timestamp display format for all messages.

**Default Format:** `dd/MM/yyyy hh:mm a`

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" timeStampFormat="MMMM hh:mm a">
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

public ActionResult TimestampFormat()
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

### Common Timestamp Formats

| Format | Example | Use Case |
|--------|---------|----------|
| `dd/MM/yyyy hh:mm a` | 25/12/2024 07:30 AM | Standard date and time |
| `MMMM hh:mm a` | December 07:30 AM | Month and time only |
| `hh:mm a` | 07:30 AM | Time only |
| `HH:mm` | 07:30 | 24-hour time |
| `dd/MM/yyyy` | 25/12/2024 | Date only |
| `yyyy-MM-dd HH:mm:ss` | 2024-12-25 07:30:00 | ISO format |
| `ddd, MMM d, hh:mm a` | Tue, Dec 25, 07:30 AM | Verbose format |

### Format Pattern References

| Pattern | Meaning |
|---------|---------|
| `d` | Day of month (1-31) |
| `dd` | Day of month (01-31) with leading zero |
| `ddd` | Day name abbreviated (Mon, Tue, etc.) |
| `M` | Month (1-12) |
| `MM` | Month (01-12) with leading zero |
| `MMM` | Month name abbreviated (Jan, Feb, etc.) |
| `MMMM` | Full month name (January, February, etc.) |
| `y` | Year (2-digit) |
| `yy` | Year (2-digit) with leading zero |
| `yyyy` | Year (4-digit) |
| `h` | Hour in 12-hour format (1-12) |
| `hh` | Hour in 12-hour format (01-12) |
| `H` | Hour in 24-hour format (0-23) |
| `HH` | Hour in 24-hour format (00-23) |
| `m` | Minute (0-59) |
| `mm` | Minute (00-59) |
| `s` | Second (0-59) |
| `ss` | Second (00-59) |
| `a` | AM/PM indicator |

## Time Break Separators

### Overview

Time breaks are visual separators that group messages by time periods (Today, Yesterday, specific dates). They enhance conversation organization by clearly separating messages based on time.

Use the `showTimeBreak` property to enable time breaks and customize with `timeBreakTemplate`.

### Implementing Time Breaks

Refer to the [Templates & Customization](templates-customization.md#time-break-template) section for detailed time break template implementation with custom formatting.

### Use Cases

- **Date-wise organization:** Separate conversations by day for clarity
- **Archive views:** Show time breaks in historical chats
- **Long conversations:** Make conversations easier to navigate
- **Multi-day chats:** Track conversation progression over time

## Message Timestamp Configuration

### Setting Timestamp on Individual Messages

When creating messages, optionally set the `TimeStamp` property:

```csharp
var message = new ChatUIMessage()
{
    Text = "Hi Michale, are we on track?",
    Author = CurrentUserModel,
    TimeStamp = new DateTime(2024, 12, 25, 7, 30, 0)  // Custom timestamp
};
```

**Default Behavior:** If `TimeStamp` is not set, the system uses the current date and time.

## Common Patterns

### Professional Support Chat

Show detailed timestamps with date:

```razor
<ejs-chatui id="chatUI" 
            showTimeStamp="true"
            timeStampFormat="dd/MM/yyyy hh:mm a"
            showTimeBreak="true">
    <e-chatui-user id="user1" user="Support Agent"></e-chatui-user>
</ejs-chatui>
```

### Quick Messaging Chat

Show only time without date:

```razor
<ejs-chatui id="chatUI" 
            showTimeStamp="true"
            timeStampFormat="hh:mm a"
            showTimeBreak="false">
    <e-chatui-user id="user1" user="Albert"></e-chatui-user>
</ejs-chatui>
```

### Minimalist Chat

Hide timestamps for casual messaging:

```razor
<ejs-chatui id="chatUI" 
            showTimeStamp="false"
            showTimeBreak="false">
    <e-chatui-user id="user1" user="Albert"></e-chatui-user>
</ejs-chatui>
```

## Edge Cases

- **No TimeStamp set:** Messages default to current system time
- **Invalid format pattern:** Falls back to default format
- **Timezone differences:** Ensure server and client timezones are synchronized
- **Very old messages:** Consider date grouping with time breaks for readability
- **Rapid message sending:** Multiple messages may have same second, but remain distinguishable by order
