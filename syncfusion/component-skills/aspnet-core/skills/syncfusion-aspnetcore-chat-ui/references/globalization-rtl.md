# Globalization & RTL Support in Chat-UI

## Overview

Globalization enables Chat-UI to support multiple languages and cultures, while Right-to-Left (RTL) layout support accommodates languages like Arabic, Hebrew, and Urdu that read from right to left.

## Localization & Language Support

### Setting Culture/Locale

Configure the culture to display UI strings in different languages:

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;
@using Newtonsoft.Json;

<div style="height: 380px; width: 450px">
    <ejs-chatui id="chatUser" created="onCreated" locale="de">
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
    ej.base.L10n.load({
        'de': {
            "chat-ui": {
            "oneUserTyping": "{0} tippt",
            "twoUserTyping": "{0} und {1} tippen",
            "threeUserTyping": "{0}, {1} und {2} andere tippen gerade",
            "multipleUsersTyping": "{0}, {1} und {2} andere tippen gerade"
            }
        }
    });
    var chatUIObj;
    var typingUsers = @Html.Raw(JsonConvert.SerializeObject(ViewBag.TypingUsers));
    function onCreated() {
        var chatUiEle = document.getElementById('chatUser');
        chatUIObj = ej.base.getInstance(chatUiEle, ejs.interactivechat.ChatUI);
        chatUIObj.typingUsers = typingUsers;
        chatUIObj.dataBind();
    }
</script>
```

**C# Code-Behind:**
```csharp
using Syncfusion.EJ2.InteractiveChat;

public List<ChatUIMessage> ChatMessagesData { get; set; } = new List<ChatUIMessage>();
public ChatUIUser CurrentUserModel { get; set; } = new ChatUIUser() { Id = "user1", User = "Albert" };
public ChatUIUser MichaleUserModel { get; set; } = new ChatUIUser() { Id = "user2", User = "Michale Suyama" };
public List<ChatUIUser> TypingUsers { get; set; }

public ActionResult Timestamp()
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
        Text = "I’ll review it and send feedback by today.",
        Author = CurrentUserModel
    });
    ViewBag.TypingUsers = new List<ChatUIUser>() { MichaleUserModel };
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}
```

### Supported Locales

| Locale Code | Language | Region |
|------------|----------|--------|
| `en` | English | United States (default) |
| `de` | German | Germany |
| `es` | Spanish | Spain |
| `fr` | French | France |
| `it` | Italian | Italy |
| `ja` | Japanese | Japan |
| `ko` | Korean | Korea |
| `zh` | Chinese Simplified | China |
| `zh-CN` | Chinese Simplified | China |
| `zh-TW` | Chinese Traditional | Taiwan |
| `ru` | Russian | Russia |
| `pt` | Portuguese | Portugal |
| `pt-BR` | Portuguese | Brazil |
| `ar` | Arabic | Middle East |
| `he` | Hebrew | Israel |
| `ur` | Urdu | Pakistan/India |

### Localized UI Strings

Localization affects:
- Placeholder text ("Type your message...")
- Button labels ("Send", "Attach")
- Timestamps and date formats
- Error messages
- Tooltip text

## Right-to-Left (RTL) Layout

### Enabling RTL Support

Use the `enableRtl` property to enable Right-to-Left layout for RTL languages:

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" enableRtl="true">
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

public ActionResult RTLLayout()
{
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "Greetings",
        Author = CurrentUserModel
    });
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}
```

**Default:** `false` (LTR layout)

### RTL Layout Changes

When RTL is enabled:
- **Message alignment:** Reversed (right-aligned for current user, left-aligned for others)
- **Input area:** Positioned on the right
- **Header:** Title and icons positioned on the right
- **Icons:** May be flipped or repositioned
- **Scroll direction:** Content scrolls from right to left

## Edge Cases

- **Mixed direction text:** Text with both LTR and RTL characters may display inconsistently
- **Links in RTL:** URLs typically remain LTR even in RTL layout
- **Special characters:** Ensure character encoding is UTF-8 for proper display
- **Font support:** Verify fonts support the target language/script
- **Number formatting:** Different locales have different number/currency formats
- **Timezone differences:** Consider timezone when displaying timestamps
