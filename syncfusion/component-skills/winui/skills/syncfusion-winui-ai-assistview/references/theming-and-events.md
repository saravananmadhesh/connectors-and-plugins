# Theming and Events in WinUI AI AssistView

This guide covers theme support and event handling in the AI AssistView control.

## Theme Support

The AI AssistView control automatically adapts to the application's theme (Light or Dark mode). Set the theme in your `App.xaml` file.

### Setting Application Theme

Configure the theme at the application level:

**App.xaml:**

```xaml
<!-- Dark Theme -->
<Application
    x:Class="AIAssistApp.App"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    RequestedTheme="Dark">
    <Application.Resources>
        <!-- App resources -->
    </Application.Resources>
</Application>

<!-- Light Theme -->
<Application
    x:Class="AIAssistApp.App"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    RequestedTheme="Light">
    <Application.Resources>
        <!-- App resources -->
    </Application.Resources>
</Application>

<!-- System Default (follows Windows theme) -->
<Application
    x:Class="AIAssistApp.App"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    RequestedTheme="Default">
    <Application.Resources>
        <!-- App resources -->
    </Application.Resources>
</Application>
```

### Theme Options

| Theme | Description | Use Case |
|-------|-------------|----------|
| `Dark` | Dark background, light text | Low-light environments, modern apps, eye strain reduction |
| `Light` | Light background, dark text | Bright environments, traditional apps, high contrast |
| `Default` | Follows system theme | Best user experience, respects user preferences |

### AI AssistView in Dark Theme

The control automatically adapts all elements:
- Chat background becomes dark
- Message bubbles adjust colors
- Text becomes light-colored
- Borders and separators adjust

```xaml
<!-- App.xaml -->
<Application RequestedTheme="Dark">
    <!-- ... -->
</Application>

<!-- Page with AI AssistView -->
<Page>
    <Grid>
        <syncfusion:SfAIAssistView 
            CurrentUser="{Binding CurrentUser}"
            Messages="{Binding Chats}"/>
    </Grid>
</Page>
```

### AI AssistView in Light Theme

```xaml
<!-- App.xaml -->
<Application RequestedTheme="Light">
    <!-- ... -->
</Application>

<!-- Page with AI AssistView -->
<Page>
    <Grid>
        <syncfusion:SfAIAssistView 
            CurrentUser="{Binding CurrentUser}"
            Messages="{Binding Chats}"/>
    </Grid>
</Page>
```

### Changing Theme at Runtime

```csharp
using Microsoft.UI.Xaml;

public class ThemeManager
{
    public void SetTheme(ElementTheme theme)
    {
        // Get the root element (usually the main window's content)
        if (App.MainWindow?.Content is FrameworkElement rootElement)
        {
            rootElement.RequestedTheme = theme;
        }
    }

    public void ToggleTheme()
    {
        if (App.MainWindow?.Content is FrameworkElement rootElement)
        {
            rootElement.RequestedTheme = rootElement.ActualTheme == ElementTheme.Dark
                ? ElementTheme.Light
                : ElementTheme.Dark;
        }
    }

    public ElementTheme GetCurrentTheme()
    {
        if (App.MainWindow?.Content is FrameworkElement rootElement)
        {
            return rootElement.ActualTheme;
        }
        return ElementTheme.Default;
    }
}

// Usage
private ThemeManager themeManager = new ThemeManager();

private void DarkModeToggle_Toggled(object sender, RoutedEventArgs e)
{
    themeManager.ToggleTheme();
}
```

### Per-Page Theme

Set theme for specific pages:

```xaml
<Page RequestedTheme="Dark">
    <Grid>
        <syncfusion:SfAIAssistView 
            CurrentUser="{Binding CurrentUser}"
            Messages="{Binding Chats}"/>
    </Grid>
</Page>
```

### Custom Theme Colors

While AI AssistView adapts automatically, you can customize colors using theme resources:

```xaml
<Application.Resources>
    <ResourceDictionary>
        <ResourceDictionary.ThemeDictionaries>
            <!-- Dark theme customization -->
            <ResourceDictionary x:Key="Dark">
                <SolidColorBrush x:Key="ChatBackgroundBrush" Color="#1E1E1E"/>
                <SolidColorBrush x:Key="UserMessageBrush" Color="#0078D4"/>
                <SolidColorBrush x:Key="AIMessageBrush" Color="#2D2D30"/>
            </ResourceDictionary>
            
            <!-- Light theme customization -->
            <ResourceDictionary x:Key="Light">
                <SolidColorBrush x:Key="ChatBackgroundBrush" Color="#FFFFFF"/>
                <SolidColorBrush x:Key="UserMessageBrush" Color="#0078D4"/>
                <SolidColorBrush x:Key="AIMessageBrush" Color="#F3F3F3"/>
            </ResourceDictionary>
        </ResourceDictionary.ThemeDictionaries>
    </ResourceDictionary>
</Application.Resources>
```

## Events

The AI AssistView control provides events for handling user interactions and prompt submissions.

## PromptRequest Event

The `PromptRequest` event is fired when the user submits a prompt. This allows you to validate input, preprocess messages, or trigger custom actions before the message is added to the chat.

### Event Signature

```csharp
public event EventHandler<PromptRequestEventArgs> PromptRequest;
```

### PromptRequestEventArgs Properties

| Property | Type | Description |
|----------|------|-------------|
| `InputMessage` | IMessage | The input message submitted by the user |
| `Handled` | bool | Set to `true` to prevent the message from being added to the Messages collection |

### Basic Usage

```xaml
<syncfusion:SfAIAssistView 
    x:Name="aiAssistView"
    CurrentUser="{Binding CurrentUser}"
    Messages="{Binding Chats}"
    PromptRequest="AiAssistView_PromptRequest"/>
```

```csharp
private void AiAssistView_PromptRequest(object sender, PromptRequestEventArgs e)
{
    var message = e.InputMessage as TextMessage;
    
    if (message != null)
    {
        // Access the user's input
        string userInput = message.Text;
        
        // Process the message
        ProcessUserMessage(userInput);
    }
}
```

### Validating User Input

```csharp
private void AiAssistView_PromptRequest(object sender, PromptRequestEventArgs e)
{
    var message = e.InputMessage as TextMessage;
    
    if (message == null)
    {
        e.Handled = true;
        return;
    }
    
    // Validate: Empty message
    if (string.IsNullOrWhiteSpace(message.Text))
    {
        e.Handled = true;
        ShowError("Please enter a message.");
        return;
    }
    
    // Validate: Message length
    if (message.Text.Length > 1000)
    {
        e.Handled = true;
        ShowError("Message is too long. Maximum 1000 characters.");
        return;
    }
    
    // Validate: Inappropriate content (example)
    if (ContainsInappropriateContent(message.Text))
    {
        e.Handled = true;
        ShowError("Message contains inappropriate content.");
        return;
    }
    
    // Allow the message to be added
    e.Handled = false;
    
    // Process with AI
    _ = ProcessAIRequestAsync(message.Text);
}
```

### Preprocessing Messages

```csharp
private void AiAssistView_PromptRequest(object sender, PromptRequestEventArgs e)
{
    var message = e.InputMessage as TextMessage;
    
    if (message != null)
    {
        // Log the message
        LogUserMessage(message.Text);
        
        // Analytics
        TrackUserInteraction(message.Text);
        
        // Preprocess: Trim whitespace
        message.Text = message.Text.Trim();
        
        // Preprocess: Replace special characters
        message.Text = PreprocessText(message.Text);
        
        // Add context to the message
        var contextualPrompt = $"[User: {CurrentUser.Name}] {message.Text}";
        
        // Send to AI with context
        _ = SendToAIAsync(contextualPrompt);
    }
}
```

### Handling Command-like Inputs

```csharp
private void AiAssistView_PromptRequest(object sender, PromptRequestEventArgs e)
{
    var message = e.InputMessage as TextMessage;
    
    if (message == null) return;
    
    string input = message.Text.Trim();
    
    // Check for commands
    if (input.StartsWith("/"))
    {
        e.Handled = true; // Prevent adding to chat
        
        HandleCommand(input);
        return;
    }
    
    // Regular message processing
    _ = ProcessAIRequestAsync(input);
}

private void HandleCommand(string command)
{
    switch (command.ToLower())
    {
        case "/clear":
            Chats.Clear();
            break;
        case "/help":
            ShowHelpMessage();
            break;
        case "/export":
            ExportConversation();
            break;
        default:
            Chats.Add(new TextMessage
            {
                Author = new Author { Name = "System" },
                Text = $"Unknown command: {command}",
                DateTime = DateTime.Now
            });
            break;
    }
}
```

### Rate Limiting

```csharp
private DateTime lastMessageTime = DateTime.MinValue;
private const int MinMessageIntervalMs = 1000; // 1 second

private void AiAssistView_PromptRequest(object sender, PromptRequestEventArgs e)
{
    // Rate limiting
    var timeSinceLastMessage = (DateTime.Now - lastMessageTime).TotalMilliseconds;
    
    if (timeSinceLastMessage < MinMessageIntervalMs)
    {
        e.Handled = true;
        ShowError("Please wait a moment before sending another message.");
        return;
    }
    
    lastMessageTime = DateTime.Now;
    
    var message = e.InputMessage as TextMessage;
    if (message != null)
    {
        _ = ProcessAIRequestAsync(message.Text);
    }
}
```

### Complete Event Example

```csharp
private void AiAssistView_PromptRequest(object sender, PromptRequestEventArgs e)
{
    var message = e.InputMessage as TextMessage;
    
    if (message == null)
    {
        e.Handled = true;
        return;
    }
    
    try
    {
        // 1. Validate input
        if (string.IsNullOrWhiteSpace(message.Text))
        {
            e.Handled = true;
            ShowNotification("Please enter a message.", NotificationType.Warning);
            return;
        }
        
        // 2. Check rate limits
        if (!CheckRateLimit())
        {
            e.Handled = true;
            ShowNotification("Too many requests. Please wait.", NotificationType.Warning);
            return;
        }
        
        // 3. Log for analytics
        Analytics.TrackEvent("UserPrompt", new Dictionary<string, string>
        {
            ["Length"] = message.Text.Length.ToString(),
            ["Timestamp"] = DateTime.Now.ToString()
        });
        
        // 4. Preprocess
        string processedText = PreprocessPrompt(message.Text);
        
        // 5. Send to AI
        _ = ProcessAIRequestAsync(processedText);
        
        // 6. Update suggestions
        ClearSuggestions();
        
    }
    catch (Exception ex)
    {
        e.Handled = true;
        ShowNotification($"Error processing message: {ex.Message}", NotificationType.Error);
        LogError(ex);
    }
}
```

## Common Patterns

### Pattern 1: Theme Toggle in Settings

```xaml
<ToggleSwitch 
    Header="Dark Mode"
    IsOn="{Binding IsDarkMode, Mode=TwoWay}"
    Toggled="DarkMode_Toggled"/>
```

```csharp
private void DarkMode_Toggled(object sender, RoutedEventArgs e)
{
    var toggleSwitch = sender as ToggleSwitch;
    
    if (toggleSwitch != null && App.MainWindow?.Content is FrameworkElement root)
    {
        root.RequestedTheme = toggleSwitch.IsOn ? ElementTheme.Dark : ElementTheme.Light;
        
        // Save preference
        SaveThemePreference(toggleSwitch.IsOn);
    }
}
```

### Pattern 2: System Theme Detection

```csharp
public class ThemeDetector
{
    public static bool IsSystemDarkMode()
    {
        var uiSettings = new Windows.UI.ViewManagement.UISettings();
        var color = uiSettings.GetColorValue(Windows.UI.ViewManagement.UIColorType.Background);
        
        // Dark mode has dark background (low RGB values)
        return color.R + color.G + color.B < 382;
    }
    
    public static void ApplySystemTheme()
    {
        if (App.MainWindow?.Content is FrameworkElement root)
        {
            root.RequestedTheme = IsSystemDarkMode() ? ElementTheme.Dark : ElementTheme.Light;
        }
    }
}
```

### Pattern 3: Prompt Validation with Feedback

```csharp
private void AiAssistView_PromptRequest(object sender, PromptRequestEventArgs e)
{
    var validationResult = ValidatePrompt(e.InputMessage as TextMessage);
    
    if (!validationResult.IsValid)
    {
        e.Handled = true;
        ShowValidationError(validationResult.ErrorMessage);
        return;
    }
    
    ProcessValidPrompt((TextMessage)e.InputMessage);
}

private (bool IsValid, string ErrorMessage) ValidatePrompt(TextMessage message)
{
    if (message == null)
        return (false, "Invalid message");
    
    if (string.IsNullOrWhiteSpace(message.Text))
        return (false, "Message cannot be empty");
    
    if (message.Text.Length > 2000)
        return (false, "Message too long (max 2000 characters)");
    
    return (true, string.Empty);
}
```

### Pattern 4: Theme Persistence

```csharp
public class ThemeService
{
    private const string ThemeKey = "AppTheme";
    
    public void SaveTheme(ElementTheme theme)
    {
        ApplicationData.Current.LocalSettings.Values[ThemeKey] = theme.ToString();
    }
    
    public ElementTheme LoadTheme()
    {
        if (ApplicationData.Current.LocalSettings.Values.TryGetValue(ThemeKey, out var value))
        {
            if (Enum.TryParse<ElementTheme>(value.ToString(), out var theme))
            {
                return theme;
            }
        }
        
        return ElementTheme.Default;
    }
    
    public void ApplyTheme(ElementTheme theme)
    {
        if (App.MainWindow?.Content is FrameworkElement root)
        {
            root.RequestedTheme = theme;
            SaveTheme(theme);
        }
    }
}

// Usage in App.xaml.cs
protected override void OnLaunched(LaunchActivatedEventArgs args)
{
    // ... window initialization
    
    var themeService = new ThemeService();
    var savedTheme = themeService.LoadTheme();
    themeService.ApplyTheme(savedTheme);
}
```

## Best Practices

### Theming
1. **Use Default:** Let users' system preferences control the theme when possible.
2. **Provide Toggle:** Offer in-app theme switching for user preference.
3. **Persist Choice:** Save theme preference locally.
4. **Test Both:** Test UI in both light and dark modes.
5. **Consistent Colors:** Use theme-aware resources for custom colors.

### Events
1. **Validate Early:** Check input in PromptRequest before processing.
2. **Handle Gracefully:** Always have error handling in event handlers.
3. **Set Handled:** Use `e.Handled = true` to prevent default behavior when validation fails.
4. **Async Processing:** Use async methods for AI calls, don't block UI.
5. **User Feedback:** Always inform users why input was rejected.

## Troubleshooting

### Theme Not Applying
- Check RequestedTheme is set in App.xaml
- Verify theme is applied to root element
- Restart app after changing App.xaml theme

### PromptRequest Not Firing
- Verify event is wired up in XAML or code
- Check that user is actually submitting messages
- Ensure event handler signature matches

### Messages Added Despite Handled=true
- Verify `e.Handled = true` is set before return
- Check no other code is adding messages
- Ensure correct event argument property name

### Theme Colors Not Changing
- Use theme-aware resources (ThemeResource)
- Avoid hard-coded colors
- Check custom templates respect theme changes
