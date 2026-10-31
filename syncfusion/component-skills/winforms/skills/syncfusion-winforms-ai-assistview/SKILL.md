---
name: syncfusion-winforms-ai-assistview
description: "Guide for implementing Syncfusion Windows Forms AI AssistView (SfAIAssistView) for building conversational AI interfaces in desktop applications. Use this when creating chat interfaces, AI assistants, or chatbots with Windows Forms. Supports OpenAI and Azure OpenAI integration, typing indicators, chat suggestions, message bubbles, custom views, input toolbar with attachments, response toolbar actions, and stop responding for interactive messaging experiences."
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Implementing AI AssistView

The Syncfusion Windows Forms AI AssistView (SfAIAssistView) is a sophisticated conversational interface control for building AI-powered chat applications with support for suggestions, typing indicators, custom views, input and response toolbars, stop responding, and seamless OpenAI/ChatGPT integration.

## When to Use This Skill

Use this skill when the user needs to:
- Build AI-powered chat interfaces in Windows Forms applications
- Integrate OpenAI, ChatGPT, or Azure OpenAI services into desktop apps
- Create conversational UI with message bubbles and chat history
- Display AI-driven response suggestions for quick user responses
- Show typing indicators during async AI response generation
- Customize chat message appearance with custom BotView and UserView
- Handle user prompts with validation and custom actions
- Build intelligent assistants with banner customization
- Add file attachments, image uploads, or custom input toolbar actions
- Enable copy, regenerate, like/dislike actions on bot responses
- Allow users to cancel in-flight AI responses
- Implement real-time chat experiences with data binding

## Component Overview

**Key Features:**
- **Suggestions**: Display selectable response suggestions to expedite conversation flow
- **Typing Indicator**: Show loading animation during AI processing
- **Banner Customization**: Customizable header with welcome messages and AI service info
- **Custom Views**: Create custom BotView and UserView for message presentation
- **Input Toolbar**: Quick-action buttons for file attachments, image uploads, audio recording, and custom actions
- **Response Toolbar**: Copy, Regenerate, Like, Dislike, and custom action buttons on each bot response
- **Stop Responding**: Cancel in-flight AI responses with a stop button
- **Theme Support**: Automatic light/dark theme adaptation
- **OpenAI Integration**: Seamless connection with OpenAI services via Semantic Kernel
- **Events**: PromptRequest, ResponseToolBarItemClicked, StopRespondingButtonClicked, InputToolbarItemClicked, and ActionButtonClicked events
- **Data Binding**: Full support for ObservableCollection and INotifyPropertyChanged

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Assembly deployment and NuGet packages
- Creating Windows Forms project with SfAIAssistView
- Adding control via Designer and Code
- Creating ViewModel with message collection
- Message binding and Author configuration
- Basic chat implementation

### Suggestions
📄 **Read:** [references/suggestions.md](references/suggestions.md)
- Displaying AI-driven suggestions
- Binding suggestions to ViewModel
- Quick response scenarios
- Dynamic suggestion updates
- Mutating ObservableCollection for live updates

### Typing Indicator
📄 **Read:** [references/typing-indicator.md](references/typing-indicator.md)
- ShowTypingIndicator property
- Async communication feedback
- Customizing indicator appearance
- Author and DisplayText configuration

### Customization
📄 **Read:** [references/customization.md](references/customization.md)
- BannerView customization with SetBannerView
- Creating custom BotView with SetBotView
- Creating custom UserView with SetUserView
- AvatarStyle customization (images, initials, glyphs, shapes, sizes)
- Interactive buttons in bot responses
- Custom styling and layouts

### Events
📄 **Read:** [references/events.md](references/events.md)
- PromptRequest event handling
- Input validation
- Custom action triggers
- Handled property usage

### Input Toolbar
📄 **Read:** [references/input-toolbar.md](references/input-toolbar.md)
- Enabling the input toolbar with IsInputToolbarVisible
- Configuring InputToolbarItem collection
- Handling InputToolbarItemClicked event
- ActionButtons for popup secondary actions
- Managing file attachments via the Attachments collection
- Toast notifications via ShowNotification and ToastOptions

### Response Toolbar
📄 **Read:** [references/response-toolbar.md](references/response-toolbar.md)
- Enabling the response toolbar with IsResponseToolBarVisible
- ResponseToolBarItem types: Copy, Regenerate, Like, Dislike, Custom
- Handling ResponseToolBarItemClicked event
- Per-message toolbar visibility control
- Hiding toolbar items on old messages

### Stop Responding
📄 **Read:** [references/stop-responding.md](references/stop-responding.md)
- Enabling the stop button with EnableStopResponding
- Handling StopRespondingButtonClicked event
- CancellationTokenSource integration
- Canceling in-flight AI requests
- Customizing button text and hold duration (StopRespondingHoldSeconds)

### OpenAI Integration
📄 **Read:** [references/openai-integration.md](references/openai-integration.md)
- Connecting to OpenAI/ChatGPT
- Microsoft Semantic Kernel setup
- API credentials configuration
- NonStreamingChat implementation
- Async response handling
- Complete working example

## Quick Start Example

### Basic Chat Interface

```csharp
using Syncfusion.WinForms.AIAssistView;
using System.ComponentModel;
using System.Collections.ObjectModel;

namespace AIAssistViewDemo
{
    public partial class Form1 : Form
    {
        ViewModel viewModel;
        
        public Form1()
        {
            InitializeComponent();
            viewModel = new ViewModel();
            
            // Create AI AssistView
            SfAIAssistView sfAIAssistView1 = new SfAIAssistView();
            sfAIAssistView1.Dock = DockStyle.Fill;
            this.Controls.Add(sfAIAssistView1);
            
            // Bind messages
            sfAIAssistView1.DataBindings.Add("Messages", viewModel, "Chats", 
                true, DataSourceUpdateMode.OnPropertyChanged);
        }
    }
    
    // ViewModel
    public class ViewModel : INotifyPropertyChanged
    {
        private ObservableCollection<object> chats;
        private Author currentUser;
        
        public ViewModel()
        {
            this.Chats = new ObservableCollection<object>();
            this.CurrentUser = new Author { Name = "John" };
            this.GenerateMessages();
        }
        
        private async void GenerateMessages()
        {
            // User message
            this.Chats.Add(new TextMessage 
            { 
                Author = CurrentUser, 
                Text = "What is Windows Forms?" 
            });
            
            await Task.Delay(1000);
            
            // Bot response
            this.Chats.Add(new TextMessage 
            { 
                Author = new Author { Name = "Bot" }, 
                Text = "Windows Forms is a GUI framework for building Windows desktop applications." 
            });
        }
        
        public ObservableCollection<object> Chats
        {
            get => this.chats;
            set
            {
                this.chats = value;
                RaisePropertyChanged("Chats");
            }
        }
        
        public Author CurrentUser
        {
            get => this.currentUser;
            set
            {
                this.currentUser = value;
                RaisePropertyChanged("CurrentUser");
            }
        }
        
        public event PropertyChangedEventHandler PropertyChanged;
        
        public void RaisePropertyChanged(string propName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propName));
        }
    }
}
```

## Common Patterns

### Pattern 1: Chat with Suggestions

```csharp
// In ViewModel
private IEnumerable<string> suggestion;

public IEnumerable<string> Suggestion
{
    get => this.suggestion;
    set
    {
        this.suggestion = value;
        RaisePropertyChanged("Suggestion");
    }
}

// Set suggestions after bot response
Suggestion = new ObservableCollection<string> 
{ 
    "Tell me more", 
    "What are alternatives?" 
};

// In Form
sfAIAssistView1.DataBindings.Add("Suggestions", viewModel, "Suggestion", 
    true, DataSourceUpdateMode.OnPropertyChanged);
```

### Pattern 2: Typing Indicator During AI Processing

```csharp
// In ViewModel
private bool showTypingIndicator;

public bool ShowTypingIndicator
{
    get => this.showTypingIndicator;
    set
    {
        this.showTypingIndicator = value;
        RaisePropertyChanged("ShowTypingIndicator");
    }
}

// Usage
ShowTypingIndicator = true;
var response = await GetAIResponse(userMessage);
Chats.Add(new TextMessage { Author = botAuthor, Text = response });
ShowTypingIndicator = false;

// In Form
sfAIAssistView1.DataBindings.Add("ShowTypingIndicator", viewModel, 
    "ShowTypingIndicator", true, DataSourceUpdateMode.OnPropertyChanged);
    
sfAIAssistView1.TypingIndicator.Author = new Author 
{ 
    Name = "Bot", 
    AvatarImage = Image.FromFile(@"Assets\bot.png") 
};
sfAIAssistView1.TypingIndicator.DisplayText = "Typing";
```

### Pattern 3: Custom Banner

```csharp
BannerStyle customStyle = new BannerStyle
{
    TitleFont = new Font("Segoe UI", 14F, FontStyle.Bold),
    SubTitleFont = new Font("Segoe UI", 12F, FontStyle.Italic),
    ImageSize = AvatarSize.Medium,
    SubTitleColor = Color.Gray,
    TitleColor = Color.DarkBlue
};

string title = "AI Assistant";
string subTitle = "Powered by OpenAI";
sfAIAssistView1.SetBannerView(title, subTitle, 
    Image.FromFile(@"Assets\ai-icon.png"), customStyle);
```

### Pattern 4: Prompt Validation

```csharp
sfAIAssistView1.PromptRequest += (sender, e) =>
{
    var message = e.Message as TextMessage;
    if (message == null) return;
    
    // Validate input
    if (string.IsNullOrWhiteSpace(message.Text))
    {
        e.Handled = true; // Prevent adding to messages
        MessageBox.Show("Please enter a message.");
        return;
    }
    
    // Custom processing
    LogUserInput(message.Text);
};
```

### Pattern 5: Input Toolbar with Attachments

```csharp
// Enable the input toolbar
sfAIAssistView1.IsInputToolbarVisible = true;

// Configure toolbar items
sfAIAssistView1.InputToolbarItems = new ObservableCollection<InputToolbarItem>
{
    new InputToolbarItem
    {
        Name = "Attach",
        ToolTip = "Attach File",
        Text = "\U0001F4CE",
        IsVisible = true
    }
};

// Handle toolbar clicks
sfAIAssistView1.InputToolbarItemClicked += (sender, args) =>
{
    if (args.ToolbarItem.Name == "Attach")
    {
        // Open file dialog and add attachment
        var dialog = new OpenFileDialog();
        if (dialog.ShowDialog() == DialogResult.OK)
        {
            var fileInfo = new FileInfo(dialog.FileName);
            sfAIAssistView1.Attachments.Add(new AttachmentItem
            {
                FileName = fileInfo.Name,
                FileSize = $"{fileInfo.Length / 1024.0:F2} KB",
                FilePath = dialog.FileName,
                FileExtension = fileInfo.Extension
            });
        }
    }
};
```

### Pattern 6: Response Toolbar with Custom Actions

```csharp
// Enable the response toolbar
sfAIAssistView1.IsResponseToolBarVisible = true;

// Configure toolbar items
sfAIAssistView1.ResponseToolBarItems = new ObservableCollection<ResponseToolBarItem>
{
    new ResponseToolBarItem { ItemType = ResponseToolBarItemType.Copy, Name = "Copy" },
    new ResponseToolBarItem { ItemType = ResponseToolBarItemType.Regenerate, Name = "Regenerate" },
    new ResponseToolBarItem { ItemType = ResponseToolBarItemType.Like, Name = "Like" },
    new ResponseToolBarItem { ItemType = ResponseToolBarItemType.Dislike, Name = "Dislike" }
};

// Handle toolbar item clicks
sfAIAssistView1.ResponseToolBarItemClicked += (sender, e) =>
{
    if (e.ToolBarItem?.ItemType == ResponseToolBarItemType.Copy)
    {
        Clipboard.SetText(e.ChatItem?.Text);
    }
    else if (e.ToolBarItem?.ItemType == ResponseToolBarItemType.Regenerate)
    {
        // Handle regeneration logic
    }
};
```

### Pattern 7: Stop Responding with Cancellation

```csharp
// Enable the stop button
sfAIAssistView1.EnableStopResponding = true;

private CancellationTokenSource cts;

sfAIAssistView1.StopRespondingButtonClicked += (sender, e) =>
{
    if (cts != null && !cts.IsCancellationRequested)
    {
        cts.Cancel();
        cts.Dispose();
        cts = null;
    }
};

// In AI request handler
cts = new CancellationTokenSource();
string response = await aiService.NonStreamingChatAsync(message, cts.Token);
```

## Key Properties and Methods

| Property/Method | Type | Description |
|-----------------|------|-------------|
| `Messages` | ObservableCollection<object> | Chat message collection |
| `Suggestions` | IEnumerable<string> | Response suggestion items |
| `ShowTypingIndicator` | bool | Shows/hides typing indicator |
| `TypingIndicator` | TypingIndicator | Typing indicator configuration |
| `User` | Author | Current user information |
| `IsInputToolbarVisible` | bool | Shows/hides the input toolbar |
| `InputToolbarItems` | ObservableCollection<InputToolbarItem> | Input toolbar buttons |
| `ActionButtons` | ObservableCollection<ActionButton> | Popup action buttons on input area |
| `Attachments` | ObservableCollection<AttachmentItem> | File attachments for the current prompt |
| `IsResponseToolBarVisible` | bool | Shows/hides the response toolbar |
| `ResponseToolBarItems` | ObservableCollection<ResponseToolBarItem> | Response toolbar action buttons |
| `EnableStopResponding` | bool | Enables the stop responding button |
| `SetBannerView()` | Method | Customize banner appearance |
| `SetBotView()` | Method | Set custom bot message view |
| `SetUserView()` | Method | Set custom user message view |
| `SetToolBarVisibility()` | Method | Control response toolbar visibility per message |
| `SetToolBarItemVisibility()` | Method | Control individual toolbar item visibility per message |
| `GetToolBarItem()` | Method | Retrieve a specific toolbar item from a message |
| `PromptRequest` | Event | Fires when user submits prompt |
| `ResponseToolBarItemClicked` | Event | Fires when a response toolbar action is clicked |
| `StopRespondingButtonClicked` | Event | Fires when stop responding button is clicked |
| `InputToolbarItemClicked` | Event | Fires when an input toolbar button is clicked |
| `ActionButtonClicked` | Event | Fires when an action button from the popup is clicked |

## Common Use Cases

### Use Case 1: Customer Support Chatbot
Build an AI-powered customer support interface with suggestion chips for common questions and typing indicators during response generation.

### Use Case 2: AI-Powered Help Desk
Implement a help desk application where users can attach files, receive AI-generated responses, and provide feedback through like/dislike buttons.

### Use Case 3: Desktop AI Assistant
Create a full-featured desktop AI assistant with banner branding, file attachment support, response actions, and the ability to cancel long-running AI requests.

### Use Case 4: Conversational Data Entry
Build guided conversational flows with suggestion chips that lead users through multi-step data entry processes, with custom views for complex response rendering.