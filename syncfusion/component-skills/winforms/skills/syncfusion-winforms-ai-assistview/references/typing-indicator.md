# Typing Indicator in AI AssistView

The Typing Indicator feature provides visual feedback to users during asynchronous AI processing by displaying an animated "typing" indicator, enhancing the conversational experience and setting proper expectations.

## Overview

The typing indicator:
- Shows when the AI is processing or generating a response
- Provides real-time feedback during async operations
- Improves user experience by indicating activity
- Can be customized with author information and text

## When to Use the Typing Indicator

Display the typing indicator when:
- Waiting for AI/API responses
- Processing complex computations
- Fetching data from external services
- Any operation that takes more than a few hundred milliseconds
- Simulating human-like conversation pacing

## Key Properties

### ShowTypingIndicator

Controls the visibility of the typing indicator:

```csharp
public bool ShowTypingIndicator { get; set; }
```

Set to `true` before starting an async operation and to `false` after it completes.

### TypingIndicator

The `TypingIndicator` object provides configuration options:

```csharp
public TypingIndicator TypingIndicator { get; set; }
```

**Configurable sub-properties:**
- `Author`: The `Author` object shown with the indicator (typically the bot), including `Name` and `AvatarImage`
- `DisplayText`: The text shown next to the indicator (e.g., "Typing", "Thinking", "Generating response...")

## Basic Implementation

### Step 1: Add ShowTypingIndicator to ViewModel

```csharp
public class ViewModel : INotifyPropertyChanged
{
    private ObservableCollection<object> chats;
    private Author currentUser;
    private bool showTypingIndicator;
    
    public ViewModel()
    {
        this.Chats = new ObservableCollection<object>();
        this.CurrentUser = new Author { Name = "User" };
    }
    
    public bool ShowTypingIndicator
    {
        get => this.showTypingIndicator;
        set
        {
            this.showTypingIndicator = value;
            RaisePropertyChanged("ShowTypingIndicator");
        }
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
```

### Step 2: Configure and Bind in the Form

```csharp
public partial class Form1 : Form
{
    ViewModel viewModel;

    public Form1()
    {
        InitializeComponent();
        viewModel = new ViewModel();

        SfAIAssistView sfAIAssistView1 = new SfAIAssistView();
        sfAIAssistView1.Location = new System.Drawing.Point(41, 40);
        sfAIAssistView1.Size = new System.Drawing.Size(818, 457);
        sfAIAssistView1.Dock = DockStyle.Fill;
        this.Controls.Add(sfAIAssistView1);

        // Bind messages and typing indicator
        sfAIAssistView1.DataBindings.Add("Messages", viewModel, "Chats", 
            true, DataSourceUpdateMode.OnPropertyChanged);
        sfAIAssistView1.DataBindings.Add("ShowTypingIndicator", viewModel, 
            "ShowTypingIndicator", true, DataSourceUpdateMode.OnPropertyChanged);
        sfAIAssistView1.DataBindings.Add("Suggestions", viewModel, "Suggestion", 
            true, DataSourceUpdateMode.OnPropertyChanged);
        viewModel.CurrentUser = sfAIAssistView1.User;

        // Configure the typing indicator appearance
        sfAIAssistView1.TypingIndicator.Author = new Author() 
        { 
            Name = "Bot", 
            AvatarImage = Image.FromFile(@"Asset\AI_Assist.png") 
        };
        sfAIAssistView1.TypingIndicator.DisplayText = "Typing";
    }
}
```

### Step 3: Use in Async AI Flow

```csharp
// Example: In the CollectionChanged handler for Chats
private async void Chats_CollectionChanged(object sender, NotifyCollectionChangedEventArgs e)
{
    if (e.NewItems == null || e.NewItems.Count == 0) return;
    var item = e.NewItems[0] as TextMessage;
    if (item == null) return;
    if (item.Author?.Name != CurrentUser?.Name) return;

    // Show the typing indicator while processing
    ShowTypingIndicator = true;

    // Simulate AI response generation
    string response = await GetAIResponse(item.Text);

    // Add the bot response
    Chats.Add(new TextMessage
    {
        Author = new Author { Name = "Bot", AvatarImage = Image.FromFile(@"Asset\AI_Assist.png") },
        DateTime = DateTime.Now,
        Text = response
    });

    // Hide the typing indicator
    ShowTypingIndicator = false;
}
```

## Troubleshooting

| Issue | Possible Cause | Resolution |
|-------|----------------|------------|
| The indicator never appears | `ShowTypingIndicator` is not bound, or the bound property is not set to `true` | Ensure `ShowTypingIndicator = true` is set in the `ViewModel` and the property is bound |
| `FileNotFoundException` for avatar image | The bot avatar image is missing from the project or path is incorrect | Add the image file to the project's `Asset` folder, or update the path |
| The indicator shows the wrong avatar/name | `TypingIndicator.Author` is not set | Assign an `Author` to `TypingIndicator.Author` before the control is shown |
| Indicator flickers or never hides | `ShowTypingIndicator = false` is not called after the async operation | Ensure the property is set to `false` in a finally block or after the await completes |