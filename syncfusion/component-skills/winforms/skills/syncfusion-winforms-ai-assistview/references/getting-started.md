# Getting Started with AI AssistView

This guide covers the essential steps to add the Syncfusion Windows Forms AI AssistView (SfAIAssistView) control to your application and implement basic chat functionality.

## Assembly Deployment

The SfAIAssistView control requires specific assemblies to function properly. You can add them via NuGet Package Manager or manual assembly references.

### NuGet Package Installation

Install the required package using NuGet Package Manager:

```powershell
Install-Package Syncfusion.SfAIAssistView.WinForms
```

Or search for "Syncfusion.SfAIAssistView.WinForms" in Visual Studio's NuGet Package Manager UI.

**Supported target frameworks:** .NET Framework 4.6.2 and above, or .NET 8.0 or above.

### Required Dependencies

The package automatically includes these dependencies:
- Syncfusion.Core.WinForms
- Syncfusion.Shared.Base
- Syncfusion.Licensing

## Creating a Windows Forms Application

### Step 1: Create New Project

1. Open Visual Studio
2. Select **File > New > Project**
3. Choose **Windows Forms App (.NET Framework)** or **Windows Forms App (.NET)**
4. Name your project (e.g., "AIAssistViewDemo")
5. Click **Create**

### Step 2: Add SfAIAssistView via Designer

The easiest way to add the control is through the Visual Studio Designer:

1. Open your Form in Designer view
2. Open the **Toolbox** (View > Toolbox or Ctrl+Alt+X)
3. Search for "SfAIAssistView"
4. Drag and drop the control onto your Form
5. Required assembly references are added automatically

### Step 3: Add SfAIAssistView via Code

Alternatively, add the control programmatically:

```csharp
using Syncfusion.WinForms.AIAssistView;

namespace WindowsFormsApplication1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            
            // Create an instance of the AIAssistView control
            SfAIAssistView sfAIAssistView1 = new SfAIAssistView();
            sfAIAssistView1.Location = new System.Drawing.Point(41, 40);
            sfAIAssistView1.Size = new System.Drawing.Size(818, 457);
            sfAIAssistView1.Dock = DockStyle.Fill;
            
            this.Controls.Add(sfAIAssistView1);
        }
    }
}
```

## Creating a ViewModel

A proper ViewModel is essential for managing chat messages and implementing the MVVM pattern with data binding.

### Basic ViewModel Structure

Create a new class file `ViewModel.cs`:

```csharp
using System.ComponentModel;
using System.Collections.ObjectModel;
using Syncfusion.WinForms.AIAssistView;

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
            Text = "Windows Forms (also known as WinForms) is a graphical user interface (GUI) framework developed by Microsoft for building desktop applications for the Windows operating system." 
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
    
    public void RaisePropertyChanged(string propName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propName));
    }
    
    public event PropertyChangedEventHandler PropertyChanged;
}
```

## Binding Messages

Create a ViewModel instance in the form. Bind the control's Messages property to the view-model property:

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
        
        sfAIAssistView1.DataBindings.Add("Messages", viewModel, "Chats", 
            true, DataSourceUpdateMode.OnPropertyChanged);
    }
}
```

## Message Types

The `Chats` collection uses `ObservableCollection<object>` to allow different message types:

- **TextMessage**: Standard text-based message with `Author`, `Text`, `DateTime`, and optional `Type` property (for example, `MessageType.Bot`)
- **Author**: Identifies the sender with `Name`, `AvatarImage`, or full `AvatarStyle`

## Key Data Binding Properties

| Property | Description |
|----------|-------------|
| `Messages` | Chat message collection (required) |
| `ShowTypingIndicator` | Controls typing indicator visibility |
| `Suggestions` | Response suggestion chips |

## Complete Working Example

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
            
            SfAIAssistView sfAIAssistView1 = new SfAIAssistView();
            sfAIAssistView1.Dock = DockStyle.Fill;
            this.Controls.Add(sfAIAssistView1);
            
            sfAIAssistView1.DataBindings.Add("Messages", viewModel, "Chats", 
                true, DataSourceUpdateMode.OnPropertyChanged);
        }
    }
    
    public class ViewModel : INotifyPropertyChanged
    {
        private ObservableCollection<object> chats;
        private Author currentUser;
        
        public ViewModel()
        {
            this.Chats = new ObservableCollection<object>();
            this.CurrentUser = new Author { Name = "John" };
            this.Chats.Add(new TextMessage 
            { 
                Author = CurrentUser, 
                Text = "What is Windows Forms?" 
            });
            this.Chats.Add(new TextMessage 
            { 
                Author = new Author { Name = "Bot" }, 
                Text = "Windows Forms is a GUI framework for building Windows desktop applications." 
            });
        }
        
        public ObservableCollection<object> Chats
        {
            get => this.chats;
            set { this.chats = value; RaisePropertyChanged("Chats"); }
        }
        
        public Author CurrentUser
        {
            get => this.currentUser;
            set { this.currentUser = value; RaisePropertyChanged("CurrentUser"); }
        }
        
        public event PropertyChangedEventHandler PropertyChanged;
        public void RaisePropertyChanged(string propName) =>
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propName));
    }
}
```