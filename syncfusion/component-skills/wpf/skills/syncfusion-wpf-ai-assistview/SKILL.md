---
name: syncfusion-wpf-ai-assistview
description: Implement Syncfusion WPF SfAIAssistView for AI chat and conversational assistant interfaces. Use this when building AI assistant UIs, message threads with AI responses, or integrating OpenAI/SemanticKernel in WPF. Covers typing indicators, suggestions, input/response toolbars, stop-responding features, conversation history, input placeholder text, empty view templates, and PromptRequest events using Syncfusion.SfChat.Wpf.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Implementing SfAIAssistView (WPF)

## When to Use This Skill

Use this skill when:
- Building AI chat or assistant UIs in WPF
- Displaying message threads with user and AI responses
- Integrating OpenAI or SemanticKernel with a chat interface
- Showing typing indicators while AI processes a response
- Adding suggestion chips after AI responses
- Customizing input/response toolbars
- Handling `PromptRequest` events or Stop Responding functionality
- Rendering Markdown in AI responses via `ViewTemplateSelector`
- Persisting and switching between multiple conversations via conversation history
- Showing a placeholder/hint in the input box before the user types
- Rendering an empty-state (welcome message, call-to-action) when no messages exist

**NuGet Package:** `Syncfusion.SfChat.Wpf`
**Namespace:** `Syncfusion.UI.Xaml.Chat`
**Key Classes:** `SfAIAssistView`, `TextMessage`, `AIMessage`, `Author`, `TypingIndicator`, `AssistConversationItem`

---

## Quick Start

```xaml
<!-- MainWindow.xaml -->
<Window xmlns:syncfusion="clr-namespace:Syncfusion.UI.Xaml.Chat;assembly=Syncfusion.SfChat.WPF">
    <Grid>
        <Grid.DataContext>
            <local:ViewModel/>
        </Grid.DataContext>
        <syncfusion:SfAIAssistView
            Messages="{Binding Chats}"
            CurrentUser="{Binding CurrentUser}"
            Suggestions="{Binding Suggestions}"
            ShowTypingIndicator="{Binding ShowTypingIndicator}"
            TypingIndicator="{Binding TypingIndicator}" />
    </Grid>
</Window>
```

```csharp
// ViewModel.cs
public class ViewModel : INotifyPropertyChanged
{
    public ObservableCollection<object> Chats { get; set; }
    public Author CurrentUser { get; set; }

    public ViewModel()
    {
        Chats = new ObservableCollection<object>();
        CurrentUser = new Author { Name = "User" };
        Chats.Add(new TextMessage
        {
            Author = CurrentUser,
            Text = "Hello, how can you help me?"
        });
        Chats.Add(new TextMessage
        {
            Author = new Author { Name = "AI" },
            Text = "I can answer questions and help with tasks."
        });
    }
}
```

---

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- NuGet installation and assembly references
- XAML namespace and control declaration
- ViewModel setup with `ObservableCollection<object>`
- `TextMessage` + `Author` binding pattern
- `CurrentUser` configuration
- Theme integration

### OpenAI Integration
📄 **Read:** [references/openai-integration.md](references/openai-integration.md)
- `Microsoft.SemanticKernel` NuGet setup
- `IChatCompletionService` + `Kernel` configuration
- `AIAssistChatService` pattern for async responses
- `CollectionChanged` trigger to invoke AI calls
- `AIMessage` with `ContentTemplate` (AI icon)
- `ViewTemplateSelector` for Markdown rendering via MdXaml
- Coordinating `ShowTypingIndicator` with async operations

### Suggestions & Typing Indicator
📄 **Read:** [references/suggestions-and-typing-indicator.md](references/suggestions-and-typing-indicator.md)
- `Suggestions` property (`IEnumerable<string>`) binding
- Updating suggestion chips after AI response
- `TypingIndicator` object setup in ViewModel
- `ShowTypingIndicator` property
- Toggling indicator on/off with async AI calls

### Input Toolbar
📄 **Read:** [references/input-toolbar.md](references/input-toolbar.md)
- `IsInputToolbarVisible` property
- `InputToolbarPosition` (Left/Right)
- `InputToolbarItem` (ItemTemplate, IsEnabled, Tooltip, Visible)
- `InputToolbarItemClicked` event handling
- `InputToolbarHeaderTemplate` for file-upload-style headers

### Response Toolbar
📄 **Read:** [references/response-toolbar.md](references/response-toolbar.md)
- `IsResponseToolbarVisible` property
- Built-in toolbar items: Copy, Regenerate, Like, Dislike
- `ResponseToolbarItem` with `Index`, `ItemType`, `ItemTemplate`
- `ResponseToolbarItemClicked` event handling
- Custom item template examples

### Events & Stop Responding
📄 **Read:** [references/events-and-stop-responding.md](references/events-and-stop-responding.md)
- `PromptRequest` event + `PromptRequestEventArgs`
- `InputMessage` and `Handled` property pattern
- `EnableStopResponding` property
- `StopResponding` event and `StopRespondingCommand` (MVVM)
- `StopRespondingTemplate` customization

### Conversation History
📄 **Read:** [references/conversation-history.md](references/conversation-history.md)
- `ShowNavigationView` property to show/hide the history pane
- `Conversations` (`ObservableCollection<AssistConversationItem>`) data source
- `AssistConversationItem` with `Title`, `DateTime`, and `AssistItems` messages
- `NavigationHeader` for the navigation pane header text
- Built-in New Chat and conversation selection behavior

### Customization (Empty View, Placeholder)
📄 **Read:** [references/customization.md](references/customization.md)
- `EmptyView` for simple text/objects in the empty state
- `EmptyViewTemplate` for rich `DataTemplate` empty states
- `InputPlaceholderText` for input-box hint text
- How `EmptyView` interacts with `BannerTemplate`

---

## Key Properties

| Property | Type | Purpose |
|---|---|---|
| `Messages` | `ObservableCollection<object>` | Chat message collection |
| `CurrentUser` | `Author` | Identifies the local user |
| `Suggestions` | `IEnumerable<string>` | Suggestion chips shown after AI response |
| `ShowTypingIndicator` | `bool` | Shows/hides typing animation |
| `TypingIndicator` | `TypingIndicator` | Typing indicator with Author |
| `IsInputToolbarVisible` | `bool` | Shows custom input toolbar (default: false) |
| `IsResponseToolbarVisible` | `bool` | Shows response toolbar (default: true) |
| `EnableStopResponding` | `bool` | Enables Stop Responding button (default: false) |
| `ViewTemplateSelector` | `DataTemplateSelector` | Custom rendering per message type |
| `ShowNavigationView` | `bool` | Shows/hides the conversation history navigation pane (default: false) |
| `Conversations` | `ObservableCollection<AssistConversationItem>` | Archived conversations shown in the history pane |
| `NavigationHeader` | `string` | Header text for the navigation pane (default: empty) |
| `EmptyView` | `object` | Simple content shown in the empty state |
| `EmptyViewTemplate` | `DataTemplate` | Rich template shown in the empty state |
| `InputPlaceholderText` | `string` | Placeholder/hint text in the input box |

---

## Common Patterns

### User sends message → AI responds
```csharp
// Subscribe to CollectionChanged on Chats
Chats.CollectionChanged += async (s, e) =>
{
    if (e.Action == NotifyCollectionChangedAction.Add
        && e.NewItems[0] is TextMessage msg
        && msg.Author.Name == CurrentUser.Name)
    {
        ShowTypingIndicator = true;
        var reply = await aiService.GetResponseAsync(msg.Text);
        Chats.Add(new AIMessage { Author = aiAuthor, Text = reply });
        ShowTypingIndicator = false;
    }
};
```

### Adding suggestions after AI response
```csharp
Suggestions = new List<string> { "Tell me more", "Give an example", "Summarize" };
```

### Handling PromptRequest event
```xaml
<syncfusion:SfAIAssistView PromptRequest="OnPromptRequest" />
```
```csharp
private void OnPromptRequest(object sender, PromptRequestEventArgs e)
{
    // e.InputMessage contains the user's text
    e.Handled = true; // Prevent default processing
}
```

### Showing conversation history
```xaml
<syncfusion:SfAIAssistView
    Messages="{Binding Chats}"
    CurrentUser="{Binding CurrentUser}"
    Conversations="{Binding Conversations}"
    ShowNavigationView="True"
    NavigationHeader="Sync AI Assist" />
```
```csharp
Conversations = new ObservableCollection<AssistConversationItem>
{
    new AssistConversationItem
    {
        Title = "Scotland",
        DateTime = DateTime.Today,
        AssistItems = new ObservableCollection<object>
        {
            new TextMessage { Author = CurrentUser, Text = "Tell me about Scotland." },
            new TextMessage { Author = new Author { Name = "AI" }, Text = "Scotland is known for its castles and landscapes." }
        }
    }
};
```

### Empty state with placeholder + welcome template
```xaml
<syncfusion:SfAIAssistView
    Messages="{Binding Chats}"
    CurrentUser="{Binding CurrentUser}"
    InputPlaceholderText="Type your message here...">
    <syncfusion:SfAIAssistView.EmptyViewTemplate>
        <DataTemplate>
            <StackPanel HorizontalAlignment="Center" VerticalAlignment="Center">
                <TextBlock Text="Hi, how can I help you?" FontSize="20" FontWeight="Bold" HorizontalAlignment="Center" />
                <TextBlock Text="Ask anything to get started." FontSize="16" HorizontalAlignment="Center" />
            </StackPanel>
        </DataTemplate>
    </syncfusion:SfAIAssistView.EmptyViewTemplate>
</syncfusion:SfAIAssistView>
```
