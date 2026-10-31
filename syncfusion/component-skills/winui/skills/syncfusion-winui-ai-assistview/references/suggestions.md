# AI Suggestions in WinUI AI AssistView

The Suggestions feature displays AI-driven quick response options in the bottom-right corner of the AI AssistView, making it easy for users to quickly respond or choose from relevant options without typing.

## Overview

**Suggestions** appear as clickable chips that users can select to expedite the conversation flow. They're particularly useful for:
- Common follow-up questions
- Predefined responses
- Next logical steps in a conversation
- Context-aware quick actions
- Guided conversation paths

## Basic Suggestions Usage

Use the `Suggestions` property to display quick response options:

```xaml
<syncfusion:SfAIAssistView 
    CurrentUser="{Binding CurrentUser}"
    Messages="{Binding Chats}"
    Suggestions="{Binding CurrentSuggestions}"/>
```

```csharp
public class ViewModel : INotifyPropertyChanged
{
    private IEnumerable<string> currentSuggestions;

    public ViewModel()
    {
        CurrentUser = new Author { Name = "User" };
        Chats = new ObservableCollection<object>();
        
        // Initialize with default suggestions
        CurrentSuggestions = new ObservableCollection<string>
        {
            "Hello!",
            "How can you help me?",
            "Tell me more"
        };
    }

    public IEnumerable<string> CurrentSuggestions
    {
        get => currentSuggestions;
        set
        {
            currentSuggestions = value;
            OnPropertyChanged(nameof(CurrentSuggestions));
        }
    }
}
```

## Dynamic Suggestions Based on Context

Update suggestions dynamically based on the conversation context:

```csharp
public class ChatViewModel : INotifyPropertyChanged
{
    private IEnumerable<string> suggestions;

    private async void SendMessage(string userMessage)
    {
        // Add user message
        Chats.Add(new TextMessage { Author = CurrentUser, Text = userMessage });
        
        // Clear suggestions while processing
        Suggestions = null;
        
        // Get AI response
        var aiResponse = await CallAIService(userMessage);
        
        // Add AI response
        Chats.Add(new TextMessage { Author = new Author { Name = "AI" }, Text = aiResponse });
        
        // Update suggestions based on response
        UpdateSuggestionsBasedOnContext(aiResponse);
    }

    private void UpdateSuggestionsBasedOnContext(string aiResponse)
    {
        // Generate contextual suggestions
        if (aiResponse.Contains("WinUI"))
        {
            Suggestions = new ObservableCollection<string>
            {
                "What is the future of WinUI?",
                "What is XAML?",
                "Show me WinUI controls",
                "WinUI vs WPF?"
            };
        }
        else if (aiResponse.Contains("code"))
        {
            Suggestions = new ObservableCollection<string>
            {
                "Show me an example",
                "Explain the code",
                "Any best practices?"
            };
        }
        else
        {
            Suggestions = new ObservableCollection<string>
            {
                "Tell me more",
                "Can you clarify?",
                "What else?",
                "Show alternatives"
            };
        }
    }

    public IEnumerable<string> Suggestions
    {
        get => suggestions;
        set
        {
            suggestions = value;
            OnPropertyChanged(nameof(Suggestions));
        }
    }
}
```

## Complete Example with Suggestions

```xaml
<Page
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Chat">
    
    <Page.DataContext>
        <local:SuggestionViewModel />
    </Page.DataContext>
    
    <Grid>
        <syncfusion:SfAIAssistView 
            CurrentUser="{Binding CurrentUser}"
            Messages="{Binding Chats}"
            Suggestions="{Binding Suggestions}"/>
    </Grid>
</Page>
```

```csharp
public class SuggestionViewModel : INotifyPropertyChanged
{
    private ObservableCollection<object> chats;
    private Author currentUser;
    private IEnumerable<string> suggestions;

    public SuggestionViewModel()
    {
        this.CurrentUser = new Author { Name = "John" };
        this.Chats = new ObservableCollection<object>();
        this.Suggestions = new ObservableCollection<string>();
        InitializeChat();
    }

    private async void InitializeChat()
    {
        // User asks a question
        this.Chats.Add(new TextMessage 
        { 
            Author = CurrentUser, 
            Text = "What is WinUI?" 
        });
        
        await Task.Delay(1000);
        
        // AI responds
        this.Chats.Add(new TextMessage 
        { 
            Author = new Author { Name = "Bot" }, 
            Text = "WinUI is a user interface layer that contains modern controls and styles for building Windows apps." 
        });
        
        // Show contextual suggestions
        Suggestions = new ObservableCollection<string>
        {
            "What is the future of WinUI?",
            "What is XAML?",
            "What is the difference between WinUI 2 and WinUI 3?"
        };
    }

    public ObservableCollection<object> Chats
    {
        get => chats;
        set { chats = value; OnPropertyChanged(nameof(Chats)); }
    }

    public Author CurrentUser
    {
        get => currentUser;
        set { currentUser = value; OnPropertyChanged(nameof(CurrentUser)); }
    }

    public IEnumerable<string> Suggestions
    {
        get => suggestions;
        set { suggestions = value; OnPropertyChanged(nameof(Suggestions)); }
    }

    public event PropertyChangedEventHandler PropertyChanged;
    protected void OnPropertyChanged(string propertyName) =>
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
}
```

## Clearing Suggestions

Clear suggestions when they're no longer relevant:

```csharp
// Clear suggestions after user selects one
private void OnSuggestionSelected(string suggestion)
{
    // Add suggestion as user message
    Chats.Add(new TextMessage { Author = CurrentUser, Text = suggestion });
    
    // Clear suggestions
    Suggestions = null;
    
    // Process with AI
    _ = ProcessAIResponse(suggestion);
}

// Clear suggestions after a few exchanges
private int messageCount = 0;

private void AddMessage(TextMessage message)
{
    Chats.Add(message);
    messageCount++;
    
    // Clear suggestions after 5 messages
    if (messageCount > 5)
    {
        Suggestions = null;
    }
}
```

## Suggestions Based on AI Service Response

Generate suggestions from AI service responses:

```csharp
private async Task<(string response, List<string> suggestions)> CallAIServiceWithSuggestions(string prompt)
{
    // Call AI service with request for suggestions
    var systemPrompt = @"Provide a response and 3 follow-up question suggestions.
                        Format: 
                        RESPONSE: [your response]
                        SUGGESTIONS: [suggestion 1]|[suggestion 2]|[suggestion 3]";
    
    var aiResult = await CallAIService(systemPrompt, prompt);
    
    // Parse response and suggestions
    var parts = aiResult.Split("SUGGESTIONS:");
    var response = parts[0].Replace("RESPONSE:", "").Trim();
    var suggestionsText = parts.Length > 1 ? parts[1].Trim() : "";
    var suggestions = suggestionsText.Split('|').Select(s => s.Trim()).ToList();
    
    return (response, suggestions);
}

private async void ProcessUserMessage(string userMessage)
{
    Chats.Add(new TextMessage { Author = CurrentUser, Text = userMessage });
    
    var (aiResponse, suggestions) = await CallAIServiceWithSuggestions(userMessage);
    
    Chats.Add(new TextMessage { Author = new Author { Name = "AI" }, Text = aiResponse });
    
    Suggestions = new ObservableCollection<string>(suggestions);
}
```

## Predefined Suggestion Sets

Create predefined suggestion sets for common scenarios:

```csharp
public class SuggestionSets
{
    public static IEnumerable<string> WelcomeSuggestions => new[]
    {
        "How can you help me?",
        "What can you do?",
        "Show me examples"
    };

    public static IEnumerable<string> CodeRelatedSuggestions => new[]
    {
        "Show me the code",
        "Explain the implementation",
        "Are there alternatives?",
        "Best practices?"
    };

    public static IEnumerable<string> TroubleshootingSuggestions => new[]
    {
        "Why isn't it working?",
        "Common issues?",
        "How do I debug this?",
        "Show error solutions"
    };

    public static IEnumerable<string> LearnMoreSuggestions => new[]
    {
        "Tell me more",
        "Go deeper",
        "Show advanced features",
        "Related topics?"
    };
}

// Usage
private void ShowWelcomeSuggestions()
{
    Suggestions = SuggestionSets.WelcomeSuggestions;
}

private void ShowCodeSuggestions()
{
    Suggestions = SuggestionSets.CodeRelatedSuggestions;
}
```

## Adaptive Suggestions

Adjust suggestions based on user behavior:

```csharp
public class AdaptiveSuggestionEngine
{
    private Dictionary<string, int> userPreferences = new Dictionary<string, int>();

    public void RecordSuggestionUsage(string suggestion)
    {
        if (userPreferences.ContainsKey(suggestion))
            userPreferences[suggestion]++;
        else
            userPreferences[suggestion] = 1;
    }

    public IEnumerable<string> GetAdaptiveSuggestions(IEnumerable<string> baseSuggestions)
    {
        // Sort by usage frequency
        return baseSuggestions
            .OrderByDescending(s => userPreferences.ContainsKey(s) ? userPreferences[s] : 0)
            .Take(4);
    }
}

// Usage in ViewModel
private AdaptiveSuggestionEngine suggestionEngine = new AdaptiveSuggestionEngine();

private void OnSuggestionSelected(string suggestion)
{
    suggestionEngine.RecordSuggestionUsage(suggestion);
    
    // Use the suggestion
    Chats.Add(new TextMessage { Author = CurrentUser, Text = suggestion });
    
    // Update suggestions adaptively
    var baseSuggestions = new[] { "Option A", "Option B", "Option C", "Option D", "Option E" };
    Suggestions = suggestionEngine.GetAdaptiveSuggestions(baseSuggestions);
}
```

## Limiting Suggestion Count

Keep suggestions concise (3-5 options recommended):

```csharp
private void SetSuggestions(IEnumerable<string> allSuggestions)
{
    // Limit to 4 suggestions
    Suggestions = allSuggestions.Take(4);
}

// Or with priority
private void SetPrioritizedSuggestions(List<(string text, int priority)> suggestionsWithPriority)
{
    Suggestions = suggestionsWithPriority
        .OrderByDescending(s => s.priority)
        .Take(4)
        .Select(s => s.text);
}
```

## Common Patterns

### Pattern 1: Initial Suggestions

```csharp
public ViewModel()
{
    Suggestions = new ObservableCollection<string>
    {
        "What is WinUI?",
        "Show me examples",
        "Getting started guide"
    };
}
```

### Pattern 2: Contextual Follow-ups

```csharp
private void UpdateSuggestionsForTopic(string topic)
{
    var suggestionMap = new Dictionary<string, string[]>
    {
        ["winui"] = new[] { "WinUI controls?", "WinUI vs WPF?", "WinUI 3 features?" },
        ["code"] = new[] { "Show example", "Explain code", "Best practices?" },
        ["error"] = new[] { "Common issues?", "Debug steps?", "Solutions?" }
    };

    var key = topic.ToLower();
    Suggestions = suggestionMap.ContainsKey(key) 
        ? new ObservableCollection<string>(suggestionMap[key])
        : null;
}
```

### Pattern 3: Progressive Suggestions

```csharp
private int conversationDepth = 0;

private void UpdateSuggestionsByDepth()
{
    conversationDepth++;
    
    if (conversationDepth == 1)
        Suggestions = new[] { "Basic question 1", "Basic question 2" };
    else if (conversationDepth <= 3)
        Suggestions = new[] { "Intermediate question 1", "Intermediate question 2" };
    else
        Suggestions = new[] { "Advanced question 1", "Advanced question 2" };
}
```

## Best Practices

1. **Keep Suggestions Short:** Use concise text (3-7 words) that fits on one line.

2. **Limit Count:** Show 3-5 suggestions. Too many choices can overwhelm users.

3. **Context-Aware:** Update suggestions based on conversation context.

4. **Clear After Selection:** Remove or update suggestions after user selects one.

5. **Actionable:** Each suggestion should be a complete, actionable prompt.

6. **Diverse Options:** Offer different types of follow-ups (clarification, examples, related topics).

7. **Natural Language:** Use conversational, question-like phrasing.

8. **Performance:** Update suggestions efficiently; don't regenerate on every message if not needed.

## Troubleshooting

### Suggestions Not Showing
- Verify `Suggestions` property is not null
- Check that INotifyPropertyChanged is implemented
- Ensure suggestions collection has items

### Suggestions Overlapping Content
- Suggestions appear in bottom-right corner by default
- Ensure sufficient space in layout
- Consider clearing suggestions when no longer relevant

### Suggestions Not Updating
- Verify PropertyChanged event is raised when Suggestions is set
- Check that binding is correct in XAML
- Ensure ViewModel property is public
