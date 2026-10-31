# Suggestions Feature in Chat-UI

## Overview

The suggestions feature displays predefined message suggestions above the input textarea in the Chat-UI component. This helps users compose messages quickly by providing common responses or actions they can select with a single click.

## Table of Contents
- [Setting Suggestions](#setting-suggestions)
- [Suggestion Template](#suggestion-template)
- [Suggestion Events](#suggestion-events)
- [Common Patterns](#common-patterns)

## Setting Suggestions

The `suggestions` property specifies the list of message suggestions displayed above the input textarea. This property accepts an array of strings that represent quick reply options for the user.

### Basic Suggestions Setup

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
    var chatUIObj;
    
    function onCreated() {
        chatUIObj = ej.base.getInstance(
            document.getElementById('chatUser'), 
            ejs.interactivechat.ChatUI
        );
        
        // Set suggestions
        chatUIObj.suggestions = [
            "Yes, that works for me",
            "No, I need more time",
            "Can we discuss this later?",
            "I'll get back to you soon"
        ];
        
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

public ActionResult Suggestions()
{
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "Hi Michale, are we on track for the deadline?",
        Author = CurrentUserModel
    });
    ChatMessagesData.Add(new ChatUIMessage()
    {
        Text = "What's your availability this week?",
        Author = MichaleUserModel
    });
    ViewBag.ChatMessagesData = ChatMessagesData;
    return View();
}
```

### Setting Suggestions via C#

You can also pass suggestions from the controller:

**C# Code-Behind:**
```csharp
using Syncfusion.EJ2.InteractiveChat;
using Newtonsoft.Json;

public ActionResult SuggestionsFromController()
{
    CurrentUser = CurrentUserModel;
    
    var suggestions = new List<string>
    {
        "Yes, that works for me",
        "No, I need more time",
        "Can we discuss this later?",
        "I'll get back to you soon"
    };
    
    ViewBag.Suggestions = JsonConvert.SerializeObject(suggestions);
    ViewBag.ChatMessagesData = ChatMessagesData;
    ViewBag.CurrentUser = CurrentUser;
    return View();
}
```

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" created="onCreated">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    </ejs-chatui>
</div>

<script>
    var suggestions = @Html.Raw(ViewBag.Suggestions);
    
    function onCreated() {
        var chatUIObj = ej.base.getInstance(
            document.getElementById('chatUser'), 
            ejs.interactivechat.ChatUI
        );
        chatUIObj.suggestions = suggestions;
        chatUIObj.dataBind();
    }
</script>
```

## Suggestion Template

The `suggestionTemplate` property customizes the appearance of suggestion items. Use this to create visually appealing and branded suggestion chips.

### Basic Suggestion Template

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="suggestionTemplate" suggestionTemplate="#suggestionsContent" created="onCreated">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    </ejs-chatui>
</div>

<script id="suggestionsContent" type="text/x-jsrender">
    <div class="suggestion-item">
        <button class="suggestion-button e-btn e-outline">${suggestion}</button>
    </div>
</script>

<style>
    .suggestion-item {
        display: inline-block;
        margin: 4px;
    }

    .suggestion-button {
        padding: 8px 16px;
        background-color: #ffffff;
        border: 1px solid #2196f3;
        border-radius: 20px;
        cursor: pointer;
        font-size: 13px;
        transition: all 0.3s;
    }

    .suggestion-button:hover {
        background-color: #2196f3;
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(33, 150, 243, 0.3);
    }
</style>

<script>
    function onCreated() {
        var chatUIObj = ej.base.getInstance(
            document.getElementById('suggestionTemplate'), 
            ejs.interactivechat.ChatUI
        );
        chatUIObj.suggestions = [
            "Yes, that works",
            "No, thanks",
            "Tell me more",
            "I'll get back to you"
        ];
        chatUIObj.dataBind();
    }
</script>
```

### Template Context Variables

| Variable | Type | Description |
|----------|------|-------------|
| `suggestion` | string | The suggestion text |
| `index` | number | Zero-based index of the suggestion |

### Advanced Suggestion Template with Icons

**Razor Template:**
```razor
<div style="height:380px; width:450px">
    <ejs-chatui id="iconSuggestionTemplate" suggestionTemplate="#iconSuggestionsContent" created="onCreatedIcon">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    </ejs-chatui>
</div>

<script id="iconSuggestionsContent" type="text/x-jsrender">
    <div class="icon-suggestion-item">
        <button class="icon-suggestion-button">
            <span class="e-icons ${getIcon(suggestion)}"></span>
            <span>${suggestion}</span>
        </button>
    </div>
</script>

<style>
    .icon-suggestion-item {
        display: inline-block;
        margin: 4px;
    }

    .icon-suggestion-button {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 14px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        font-size: 13px;
        transition: all 0.3s;
    }

    .icon-suggestion-button:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }

    .icon-suggestion-button .e-icons {
        font-size: 14px;
    }
</style>

<script>
    function onCreatedIcon() {
        var chatUIObj = ej.base.getInstance(
            document.getElementById('iconSuggestionTemplate'), 
            ejs.interactivechat.ChatUI
        );
        chatUIObj.suggestions = [
            "👍 Agree",
            "❌ Decline",
            "📅 Schedule",
            "ℹ️ More info"
        ];
        chatUIObj.dataBind();
    }
    
    function getIcon(suggestionText) {
        // Map suggestion text to icon classes
        if (suggestionText.includes("Agree")) return "e-check";
        if (suggestionText.includes("Decline")) return "e-close";
        if (suggestionText.includes("Schedule")) return "e-calendar";
        if (suggestionText.includes("info")) return "e-info";
        return "e-comment";
    }
</script>
```

## Common Patterns

### Customer Support Suggestions

**Quick Response Suggestions:**
```javascript
var supportSuggestions = {
    greeting: [
        "Hi! How can I help you today?",
        "Hello! What can I assist you with?",
        "Welcome! Let me know how I can help."
    ],
    technical: [
        "Have you tried restarting?",
        "Can you provide more details?",
        "Let me escalate this to our tech team."
    ],
    closing: [
        "Is there anything else I can help with?",
        "Thank you for contacting us!",
        "Feel free to reach out anytime."
    ]
};

function setSupportSuggestions(category) {
    chatUIObj.suggestions = supportSuggestions[category];
    chatUIObj.dataBind();
}
```

### E-commerce Suggestions

**Shopping Assistant:**
```javascript
chatUIObj.suggestions = [
    "Show me similar products",
    "What's the return policy?",
    "Do you offer express shipping?",
    "Add to cart"
];
```

### Scheduling Suggestions

**Meeting Coordination:**
```javascript
chatUIObj.suggestions = [
    "Tomorrow at 10 AM",
    "Next week works",
    "Let me check my calendar",
    "Suggest a time"
];
```

### Feedback Suggestions

**Quick Feedback:**
```javascript
chatUIObj.suggestions = [
    "⭐⭐⭐⭐⭐ Excellent",
    "⭐⭐⭐⭐ Good",
    "⭐⭐⭐ Average",
    "⭐⭐ Below Average",
    "⭐ Poor"
];
```


## Use Cases

### Customer Support
- **Quick responses:** "I'll look into this", "Thank you for waiting"
- **Status updates:** "Resolved", "In Progress", "Escalated"
- **Follow-ups:** "Anything else?", "Rate your experience"

### E-commerce
- **Product inquiries:** "Show similar", "Add to cart", "Compare prices"
- **Shipping:** "Track order", "Change address", "Express shipping"
- **Returns:** "Start return", "Exchange item", "Refund status"

### Scheduling
- **Availability:** Time slots like "9 AM", "2 PM", "Tomorrow"
- **Confirmation:** "Confirmed", "Reschedule", "Cancel"
- **Reminders:** "Send reminder", "Add to calendar"

### Team Collaboration
- **Quick replies:** "Approved", "Needs revision", "On it"
- **Status:** "In progress", "Completed", "Blocked"
- **Actions:** "Assign to me", "Tag someone", "Set deadline"

### Surveys & Feedback
- **Ratings:** Star ratings, numeric scales
- **Yes/No questions:** "Yes", "No", "Not applicable"
- **Sentiment:** "Very satisfied", "Satisfied", "Unsatisfied"

## Best Practices

1. **Limit Count:** Show 3-6 suggestions at a time for better UX
2. **Relevance:** Ensure suggestions match conversation context
3. **Brevity:** Keep suggestion text short and actionable
4. **Update Dynamically:** Change suggestions based on conversation flow
5. **Clear Labels:** Use clear, unambiguous text
6. **Visual Design:** Make suggestions visually distinct from messages
7. **Accessibility:** Ensure suggestions are keyboard-navigable
8. **Mobile-Friendly:** Test touch interactions on mobile devices

## Edge Cases

- **Empty suggestions:** No suggestions displayed if array is empty
- **Long text:** Truncate very long suggestion text
- **Special characters:** Properly escape HTML/JavaScript special characters
- **Rapid clicking:** Prevent duplicate message sends
- **Template errors:** Validate template syntax to prevent rendering issues
- **Performance:** Limit number of suggestions for performance
- **Localization:** Consider RTL languages for suggestion display
