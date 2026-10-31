# Getting Started with WinUI AI AssistView

This guide covers installation, basic setup, and your first AI chat interface implementation.

## Installation

### NuGet Package

Install the Syncfusion.Chat.WinUI NuGet package:

```powershell
Install-Package Syncfusion.Chat.WinUI
```

Or via .NET CLI:

```bash
dotnet add package Syncfusion.Chat.WinUI
```

Or via Package Manager in Visual Studio:
1. Right-click project → Manage NuGet Packages
2. Search for "Syncfusion.Chat.WinUI"
3. Click Install

### License Registration

**Required for production use.** Register your Syncfusion license in `App.xaml.cs` before any Syncfusion control is used:

```csharp
public App()
{
    // Register Syncfusion license
    Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
    
    this.InitializeComponent();
}
```

**License Types:**
- **Community License:** Free for companies/individuals with <$1M revenue
- **Trial License:** 30-day evaluation
- **Commercial License:** For production applications

Get your license key from [https://www.syncfusion.com/account/downloads](https://www.syncfusion.com/account/downloads)

## Namespace Import

Add the Syncfusion namespace to your XAML page:

```xaml
<Page
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Chat">
    <!-- AI AssistView controls here -->
</Page>
```

For C# code:

```csharp
using Syncfusion.UI.Xaml.Chat;
using System.Collections.ObjectModel;
using System.ComponentModel;
```

## Basic AI AssistView Initialization

The simplest AI AssistView requires just the control declaration:

```xaml
<syncfusion:SfAIAssistView />
```

However, for a functional chat interface, you need to bind `CurrentUser` and `Messages` properties:

```xaml
<syncfusion:SfAIAssistView 
    CurrentUser="{Binding CurrentUser}"
    Messages="{Binding Chats}"/>
```

```csharp
SfAIAssistView aiAssistView = new SfAIAssistView();
```

## Core Concepts

### 1. Author Class

Represents a message author (user or AI):

```csharp
public class Author
{
    public string Name { get; set; }
    public ImageSource Avatar { get; set; }
    public DataTemplate ContentTemplate { get; set; }
}
```

**Usage:**

```csharp
Author currentUser = new Author { Name = "John" };
Author aiBot = new Author { Name = "AI Assistant" };
```

### 2. TextMessage Class

Represents a chat message:

```csharp
public class TextMessage
{
    public Author Author { get; set; }
    public string Text { get; set; }
    public DateTime DateTime { get; set; }
}
```

**Usage:**

```csharp
var userMessage = new TextMessage 
{ 
    Author = currentUser, 
    Text = "What is WinUI?",
    DateTime = DateTime.Now
};
```

### 3. Messages Collection

The `Messages` property is an `ObservableCollection<object>` that stores all chat messages:

```csharp
public ObservableCollection<object> Chats { get; set; } = new ObservableCollection<object>();
```

### 4. CurrentUser Property

Identifies the current user to distinguish user messages from AI responses:

```csharp
public Author CurrentUser { get; set; } = new Author { Name = "User" };
```

## Creating a ViewModel

Create a ViewModel to manage chat data:

```csharp
using System.Collections.ObjectModel;
using System.ComponentModel;

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
        // User asks a question
        this.Chats.Add(new TextMessage 
        { 
            Author = CurrentUser, 
            Text = "What is WinUI?" 
        });
        
        // Simulate AI processing delay
        await Task.Delay(1000);
        
        // AI responds
        this.Chats.Add(new TextMessage 
        { 
            Author = new Author { Name = "Bot" }, 
            Text = "WinUI is a user interface layer that contains modern controls and styles for building Windows apps." 
        });
    }

    public ObservableCollection<object> Chats
    {
        get => this.chats;
        set
        {
            this.chats = value;
            RaisePropertyChanged(nameof(Chats));
        }
    }

    public Author CurrentUser
    {
        get => this.currentUser;
        set
        {
            this.currentUser = value;
            RaisePropertyChanged(nameof(CurrentUser));
        }
    }

    public void RaisePropertyChanged(string propName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propName));
    }

    public event PropertyChangedEventHandler PropertyChanged;
}
```

## Binding ViewModel to View

**XAML:**

```xaml
<Page
    x:Class="AIAssistApp.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:AIAssistApp"
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Chat">
    
    <Page.DataContext>
        <local:ViewModel />
    </Page.DataContext>
    
    <Grid>
        <syncfusion:SfAIAssistView 
            CurrentUser="{Binding CurrentUser}"
            Messages="{Binding Chats}"/>
    </Grid>
</Page>
```

**Code-Behind:**

```csharp
public sealed partial class MainPage : Page
{
    public MainPage()
    {
        this.InitializeComponent();
        this.DataContext = new ViewModel();
    }
}
```

## First Complete Example: Simple AI Chat

Here's a complete working example:

**MainPage.xaml:**

```xaml
<Page
    x:Class="AIAssistApp.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:AIAssistApp"
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Chat"
    Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
    
    <Page.DataContext>
        <local:ChatViewModel />
    </Page.DataContext>
    
    <Grid Padding="20">
        <syncfusion:SfAIAssistView 
            x:Name="aiAssistView"
            CurrentUser="{Binding CurrentUser}"
            Messages="{Binding Chats}"/>
    </Grid>
</Page>
```

**ChatViewModel.cs:**

```csharp
using Syncfusion.UI.Xaml.Chat;
using System;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Threading.Tasks;

namespace AIAssistApp
{
    public class ChatViewModel : INotifyPropertyChanged
    {
        private ObservableCollection<object> chats;
        private Author currentUser;

        public ChatViewModel()
        {
            this.CurrentUser = new Author { Name = "John" };
            this.Chats = new ObservableCollection<object>();
            InitializeChat();
        }

        private async void InitializeChat()
        {
            // Welcome message from AI
            this.Chats.Add(new TextMessage
            {
                Author = new Author { Name = "AI Assistant" },
                Text = "Hello! I'm your AI assistant. How can I help you today?",
                DateTime = DateTime.Now
            });

            // Simulate user typing delay
            await Task.Delay(2000);

            // User message
            this.Chats.Add(new TextMessage
            {
                Author = CurrentUser,
                Text = "What is WinUI?",
                DateTime = DateTime.Now
            });

            // Simulate AI processing
            await Task.Delay(1500);

            // AI response
            this.Chats.Add(new TextMessage
            {
                Author = new Author { Name = "AI Assistant" },
                Text = "WinUI is a user interface layer that contains modern controls and styles for building Windows apps. It's the latest native UI framework for Windows desktop applications.",
                DateTime = DateTime.Now
            });
        }

        public ObservableCollection<object> Chats
        {
            get => chats;
            set
            {
                chats = value;
                OnPropertyChanged(nameof(Chats));
            }
        }

        public Author CurrentUser
        {
            get => currentUser;
            set
            {
                currentUser = value;
                OnPropertyChanged(nameof(CurrentUser));
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;

        protected void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
```

## Adding New Messages Dynamically

To add messages dynamically (e.g., when user sends a prompt):

```csharp
private void SendMessage(string messageText)
{
    // Add user message
    Chats.Add(new TextMessage
    {
        Author = CurrentUser,
        Text = messageText,
        DateTime = DateTime.Now
    });

    // Process with AI (async)
    _ = ProcessAIResponse(messageText);
}

private async Task ProcessAIResponse(string userPrompt)
{
    // Call AI service
    string aiResponse = await CallAIService(userPrompt);

    // Add AI response
    Chats.Add(new TextMessage
    {
        Author = new Author { Name = "AI" },
        Text = aiResponse,
        DateTime = DateTime.Now
    });
}
```

## Common Setup Issues

### Issue 1: Messages Not Displaying
**Cause:** CurrentUser not set or Messages collection is null.

**Solution:**
1. Ensure `CurrentUser` is bound and not null
2. Initialize `Messages` collection: `new ObservableCollection<object>()`
3. Verify ViewModel implements INotifyPropertyChanged

### Issue 2: Can't Type in Input Box
**Cause:** By default, the input box doesn't automatically handle submission.

**Solution:** Handle the `PromptRequest` event (covered in theming-and-events.md) or add your own input handling logic.

### Issue 3: License Warning
**Cause:** License key not registered.

**Solution:** Register license in App.xaml.cs constructor before InitializeComponent().

### Issue 4: Author Names Not Showing
**Cause:** Author.Name property is null or empty.

**Solution:** Always set Author.Name when creating Author instances.

## Next Steps

- **Suggestions:** Add AI-driven suggestions in [suggestions.md](suggestions.md)
- **Typing Indicator:** Show typing feedback in [typing-and-stop-responding.md](typing-and-stop-responding.md)
- **Response Toolbar:** Add actions to responses in [response-toolbar.md](response-toolbar.md)
- **Input Toolbar:** Customize input area in [input-toolbar.md](input-toolbar.md)
- **Events:** Handle user input in [theming-and-events.md](theming-and-events.md)
- **Conversation History:** Manage multiple archived chats in [conversation-history.md](conversation-history.md)
- **Customization:** Set input placeholder and empty state in [customization.md](customization.md)

## Welcome the User Before the First Message

Before any messages are exchanged, the chat area is empty. Use `InputPlaceholderText` to hint at the expected input and `EmptyView` / `EmptyViewTemplate` to render a welcome screen, image, or call-to-action.

```xaml
<syncfusion:SfAIAssistView
    CurrentUser="{Binding CurrentUser}"
    Messages="{Binding Chats}"
    InputPlaceholderText="Type your message here...">
    <syncfusion:SfAIAssistView.EmptyViewTemplate>
        <DataTemplate>
            <StackPanel VerticalAlignment="Center" HorizontalAlignment="Center">
                <TextBlock Text="Hi, How can I help you?"
                           FontSize="20"
                           FontWeight="Bold" />
                <TextBlock Text="Ask anything to get started."
                           FontSize="16" />
            </StackPanel>
        </DataTemplate>
    </syncfusion:SfAIAssistView.EmptyViewTemplate>
</syncfusion:SfAIAssistView>
```

See [customization.md](customization.md) for the full customization guide.
