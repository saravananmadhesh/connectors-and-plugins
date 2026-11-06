# Typing Indicator and Stop Responding

## Table of Contents
- [Typing Indicator Overview](#typing-indicator-overview)
- [Implementing Typing Indicator](#implementing-typing-indicator)
- [Stop Responding Feature](#stop-responding-feature)
- [Complete Integration Example](#complete-integration-example)
- [Common Patterns](#common-patterns)

## Typing Indicator Overview

The Typing Indicator feature shows a visual loading indicator while the AI is processing or generating a response. This provides real-time feedback to users and enhances the conversational flow by indicating that the AI is "thinking" or "typing."

### Benefits:
- **User Feedback:** Shows that the system is processing the request
- **Perceived Performance:** Makes wait times feel shorter
- **Natural Conversation:** Mimics human chat behavior
- **Professional UX:** Indicates system is responsive

## Implementing Typing Indicator

### Basic Setup

Two properties control the typing indicator:

1. **`ShowTypingIndicator`** (bool): Controls visibility
2. **`TypingIndicator`** (TypingIndicator object): Configuration

```xaml
<syncfusion:SfAIAssistView 
    CurrentUser="{Binding CurrentUser}"
    Messages="{Binding Chats}"
    ShowTypingIndicator="{Binding IsAIProcessing}"
    TypingIndicator="{Binding TypingIndicator}"/>
```

### TypingIndicator Class

```csharp
public class TypingIndicator
{
    public Author Author { get; set; }
    public string Text { get; set; } // Optional text to display
}
```

### ViewModel Setup

```csharp
public class ViewModel : INotifyPropertyChanged
{
    private ObservableCollection<object> chats;
    private Author currentUser;
    private TypingIndicator typingIndicator;
    private bool isAIProcessing;

    public ViewModel()
    {
        this.CurrentUser = new Author { Name = "John" };
        this.Chats = new ObservableCollection<object>();
        
        // Configure typing indicator
        this.TypingIndicator = new TypingIndicator 
        { 
            Author = new Author { Name = "AI Assistant" }
        };
    }

    public bool IsAIProcessing
    {
        get => isAIProcessing;
        set
        {
            isAIProcessing = value;
            OnPropertyChanged(nameof(IsAIProcessing));
        }
    }

    public TypingIndicator TypingIndicator
    {
        get => typingIndicator;
        set
        {
            typingIndicator = value;
            OnPropertyChanged(nameof(TypingIndicator));
        }
    }

    private async void SendMessageToAI(string userMessage)
    {
        // Add user message
        this.Chats.Add(new TextMessage 
        { 
            Author = CurrentUser, 
            Text = userMessage 
        });
        
        // Show typing indicator
        IsAIProcessing = true;
        
        // Call AI service
        string aiResponse = await CallAIService(userMessage);
        
        // Hide typing indicator
        IsAIProcessing = false;
        
        // Add AI response
        this.Chats.Add(new TextMessage 
        { 
            Author = new Author { Name = "AI Assistant" }, 
            Text = aiResponse 
        });
    }

    public event PropertyChangedEventHandler PropertyChanged;
    protected void OnPropertyChanged(string propertyName) =>
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
}
```

### Complete XAML Example

```xaml
<Page
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Chat"
    xmlns:local="using:YourApp">
    
    <Page.DataContext>
        <local:ChatViewModel />
    </Page.DataContext>
    
    <Grid>
        <syncfusion:SfAIAssistView 
            CurrentUser="{Binding CurrentUser}"
            Messages="{Binding Chats}"
            Suggestions="{Binding Suggestions}"
            ShowTypingIndicator="{Binding IsProcessing}"
            TypingIndicator="{Binding TypingIndicator}"/>
    </Grid>
</Page>
```

### Showing/Hiding Typing Indicator Programmatically

```csharp
private async Task ProcessUserQuery(string query)
{
    try
    {
        // Show typing indicator
        IsAIProcessing = true;
        
        // Simulate or call actual AI processing
        await Task.Delay(2000); // Or: var response = await CallAIAsync(query);
        
        // Add response
        Chats.Add(new TextMessage
        {
            Author = new Author { Name = "AI" },
            Text = "Here's your answer...",
            DateTime = DateTime.Now
        });
    }
    catch (Exception ex)
    {
        ShowError(ex.Message);
    }
    finally
    {
        // Always hide typing indicator
        IsAIProcessing = false;
    }
}
```

## Stop Responding Feature

The **Stop Responding** feature allows users to cancel an ongoing AI response. This is essential for long-running AI operations where users may want to interrupt processing.

### Enabling Stop Responding

Set the `EnableStopResponding` property to `true`:

```xaml
<syncfusion:SfAIAssistView 
    CurrentUser="{Binding CurrentUser}"
    Messages="{Binding Chats}"
    EnableStopResponding="True"
    StopResponding="StopResponding_Event"/>
```

```csharp
// Enable in code
aiAssistView.EnableStopResponding = true;
```

**Default:** `false` (button is hidden by default)

### Handling Stop Responding Event

```xaml
<syncfusion:SfAIAssistView 
    x:Name="aiAssistView"
    EnableStopResponding="True"
    StopResponding="AiAssistView_StopResponding"/>
```

```csharp
private CancellationTokenSource aiCancellationToken;

private async void SendToAI(string prompt)
{
    // Create cancellation token
    aiCancellationToken = new CancellationTokenSource();
    
    // Show typing indicator
    IsAIProcessing = true;
    
    try
    {
        // Call AI with cancellation support
        var response = await CallAIServiceAsync(prompt, aiCancellationToken.Token);
        
        // Add response
        Chats.Add(new TextMessage 
        { 
            Author = new Author { Name = "AI" }, 
            Text = response 
        });
    }
    catch (OperationCanceledException)
    {
        // User canceled the operation
        Chats.Add(new TextMessage 
        { 
            Author = new Author { Name = "AI" }, 
            Text = "Response canceled by user." 
        });
    }
    catch (Exception ex)
    {
        ShowError($"Error: {ex.Message}");
    }
    finally
    {
        // Hide typing indicator
        IsAIProcessing = false;
    }
}

private void AiAssistView_StopResponding(object sender, EventArgs e)
{
    // Cancel the ongoing AI operation
    aiCancellationToken?.Cancel();
}
```

### Using StopRespondingCommand

Alternative to event handling:

```xaml
<syncfusion:SfAIAssistView 
    EnableStopResponding="True"
    StopRespondingCommand="{Binding StopRespondingCommand}"/>
```

```csharp
public class ViewModel : INotifyPropertyChanged
{
    public ICommand StopRespondingCommand { get; set; }
    private CancellationTokenSource cancellationToken;

    public ViewModel()
    {
        StopRespondingCommand = new RelayCommand(ExecuteStopResponding);
    }

    private void ExecuteStopResponding()
    {
        cancellationToken?.Cancel();
        
        Chats.Add(new TextMessage
        {
            Author = new Author { Name = "AI" },
            DateTime = DateTime.Now,
            Text = "You canceled the response."
        });
        
        IsProcessing = false;
    }

    private async Task CallAI(string prompt)
    {
        cancellationToken = new CancellationTokenSource();
        
        try
        {
            IsProcessing = true;
            var response = await AIService.GetResponseAsync(prompt, cancellationToken.Token);
            AddAIMessage(response);
        }
        catch (OperationCanceledException)
        {
            // Handled by StopRespondingCommand
        }
        finally
        {
            IsProcessing = false;
        }
    }
}
```

### Custom Stop Responding Template

Customize the appearance of the stop responding button:

```xaml
<Grid>
    <Grid.Resources>
        <DataTemplate x:Key="stopRespondingTemplate">
            <Grid Background="Transparent">
                <Button Content="Stop AI" 
                        Background="Red" 
                        Foreground="White" 
                        FontSize="14" 
                        CornerRadius="5" 
                        HorizontalAlignment="Center" 
                        VerticalAlignment="Center"/>
            </Grid>
        </DataTemplate>
    </Grid.Resources>
    
    <syncfusion:SfAIAssistView 
        x:Name="aiAssistView"
        EnableStopResponding="True"
        StopRespondingTemplate="{StaticResource stopRespondingTemplate}"/>
</Grid>
```

```csharp
// Set template in code
if (this.Resources.TryGetValue("stopRespondingTemplate", out var templateObj) 
    && templateObj is DataTemplate template)
{
    aiAssistView.StopRespondingTemplate = template;
}
```

## Complete Integration Example

Here's a complete example integrating typing indicator and stop responding:

```xaml
<Page
    x:Class="AIChat.MainPage"
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Chat">
    
    <Page.DataContext>
        <local:ChatViewModel />
    </Page.DataContext>
    
    <Grid>
        <syncfusion:SfAIAssistView 
            CurrentUser="{Binding CurrentUser}"
            Messages="{Binding Chats}"
            ShowTypingIndicator="{Binding IsProcessing}"
            TypingIndicator="{Binding TypingIndicator}"
            EnableStopResponding="True"
            StopRespondingCommand="{Binding StopCommand}"/>
    </Grid>
</Page>
```

```csharp
public class ChatViewModel : INotifyPropertyChanged
{
    private ObservableCollection<object> chats;
    private Author currentUser;
    private TypingIndicator typingIndicator;
    private bool isProcessing;
    private CancellationTokenSource cancellationToken;

    public ChatViewModel()
    {
        CurrentUser = new Author { Name = "User" };
        Chats = new ObservableCollection<object>();
        TypingIndicator = new TypingIndicator { Author = new Author { Name = "AI" } };
        
        StopCommand = new RelayCommand(StopAIResponse);
    }

    public ICommand StopCommand { get; }

    public bool IsProcessing
    {
        get => isProcessing;
        set { isProcessing = value; OnPropertyChanged(nameof(IsProcessing)); }
    }

    public async Task SendMessageAsync(string userMessage)
    {
        // Add user message
        Chats.Add(new TextMessage
        {
            Author = CurrentUser,
            Text = userMessage,
            DateTime = DateTime.Now
        });

        // Create cancellation token
        cancellationToken = new CancellationTokenSource();

        // Show typing indicator
        IsProcessing = true;

        try
        {
            // Call AI service with cancellation support
            string aiResponse = await CallAIServiceAsync(userMessage, cancellationToken.Token);

            // Add AI response
            Chats.Add(new TextMessage
            {
                Author = new Author { Name = "AI" },
                Text = aiResponse,
                DateTime = DateTime.Now
            });
        }
        catch (OperationCanceledException)
        {
            // User stopped the response
            Chats.Add(new TextMessage
            {
                Author = new Author { Name = "AI" },
                Text = "Response canceled.",
                DateTime = DateTime.Now
            });
        }
        catch (Exception ex)
        {
            // Handle error
            Chats.Add(new TextMessage
            {
                Author = new Author { Name = "System" },
                Text = $"Error: {ex.Message}",
                DateTime = DateTime.Now
            });
        }
        finally
        {
            // Always hide typing indicator
            IsProcessing = false;
        }
    }

    private void StopAIResponse()
    {
        cancellationToken?.Cancel();
    }

    private async Task<string> CallAIServiceAsync(string prompt, CancellationToken cancellationToken)
    {
        // Simulate AI service call with cancellation support
        // In real app, pass cancellationToken to HTTP client or AI SDK
        
        await Task.Delay(5000, cancellationToken); // Simulate long operation
        
        if (cancellationToken.IsCancellationRequested)
            throw new OperationCanceledException();
        
        return "AI response to: " + prompt;
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

    public TypingIndicator TypingIndicator
    {
        get => typingIndicator;
        set { typingIndicator = value; OnPropertyChanged(nameof(TypingIndicator)); }
    }

    public event PropertyChangedEventHandler PropertyChanged;
    protected void OnPropertyChanged(string propertyName) =>
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
}
```

## Common Patterns

### Pattern 1: Simple Typing Indicator

```csharp
private async void ProcessQuery(string query)
{
    IsAIProcessing = true;
    
    var response = await GetAIResponseAsync(query);
    
    IsAIProcessing = false;
    
    AddMessage(response);
}
```

### Pattern 2: Typing Indicator with Delay

```csharp
private async void ProcessQuery(string query)
{
    // Minimum display time for indicator (prevents flickering)
    const int MinDisplayTime = 500;
    
    var stopwatch = Stopwatch.StartNew();
    IsAIProcessing = true;
    
    var response = await GetAIResponseAsync(query);
    
    // Ensure minimum display time
    var elapsed = stopwatch.ElapsedMilliseconds;
    if (elapsed < MinDisplayTime)
        await Task.Delay(MinDisplayTime - (int)elapsed);
    
    IsAIProcessing = false;
    AddMessage(response);
}
```

### Pattern 3: Progressive Loading Messages

```csharp
private async void ProcessLongQuery(string query)
{
    IsAIProcessing = true;
    
    // Show different typing messages over time
    TypingIndicator.Text = "Processing your request...";
    await Task.Delay(2000);
    
    if (IsAIProcessing)
    {
        TypingIndicator.Text = "Analyzing data...";
        await Task.Delay(2000);
    }
    
    if (IsAIProcessing)
    {
        TypingIndicator.Text = "Generating response...";
    }
    
    var response = await GetAIResponseAsync(query);
    
    IsAIProcessing = false;
    AddMessage(response);
}
```

### Pattern 4: Timeout with Stop Button

```csharp
private async void ProcessWithTimeout(string query)
{
    cancellationToken = new CancellationTokenSource();
    
    // Set 30-second timeout
    cancellationToken.CancelAfter(TimeSpan.FromSeconds(30));
    
    IsAIProcessing = true;
    
    try
    {
        var response = await GetAIResponseAsync(query, cancellationToken.Token);
        AddMessage(response);
    }
    catch (OperationCanceledException)
    {
        if (cancellationToken.IsCancellationRequested)
            AddMessage("Request timed out or was canceled.");
    }
    finally
    {
        IsAIProcessing = false;
    }
}
```

## Best Practices

1. **Always Hide Indicator:** Use try-finally to ensure typing indicator is hidden even if errors occur.

2. **Cancellation Support:** Implement CancellationToken support in AI service calls.

3. **Minimum Display Time:** Show indicator for at least 300-500ms to avoid flickering for fast responses.

4. **User Feedback:** Show appropriate message when user stops a response.

5. **Timeout:** Set reasonable timeouts for AI operations (30-60 seconds).

6. **Error Handling:** Handle cancellation and errors gracefully with user-friendly messages.

7. **Progressive Feedback:** For long operations, update typing indicator text to show progress.

8. **Resource Cleanup:** Dispose CancellationTokenSource after use.

## Troubleshooting

### Typing Indicator Not Showing
- Verify `ShowTypingIndicator` is bound to a boolean property
- Check TypingIndicator object is not null
- Ensure PropertyChanged is raised when IsProcessing changes

### Stop Button Not Appearing
- Set `EnableStopResponding="True"`
- Verify property is set before AI processing starts

### Cancellation Not Working
- Ensure CancellationToken is passed to async operations
- Check that AI service supports cancellation
- Verify StopResponding event or command is wired up

### Indicator Stays Visible
- Use try-finally to guarantee IsProcessing = false
- Check for exceptions that might skip hiding logic
- Verify PropertyChanged event is raised
