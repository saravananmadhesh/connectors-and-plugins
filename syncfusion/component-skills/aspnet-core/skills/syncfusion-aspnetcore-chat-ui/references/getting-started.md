# Getting Started with ASP.NET Core Chat-UI

## Table of Contents
- [NuGet Package Installation](#nuget-package-installation)
- [Project Setup](#project-setup)
- [Basic Implementation](#basic-implementation)
- [Add Initial Messages](#add-initial-messages)

## NuGet Package Installation

### Step 1: Open NuGet Package Manager

In Visual Studio, open the NuGet Package Manager:
- Navigate to **Tools** → **NuGet Package Manager** → **Manage NuGet Packages for Solution**

### Step 2: Search and Install Syncfusion Package

Search for `Syncfusion.EJ2.AspNet.Core` and install the latest version.

Alternatively, use the Package Manager Console:

## Project Setup

### Step 1: Register Tag Helper

Open `~/Pages/_ViewImports.cshtml` and add the Syncfusion tag helper registration:

```razor
@addTagHelper *, Syncfusion.EJ2
```

### Step 2: Add Resources to Layout

Edit `~/Pages/Shared/_Layout.cshtml` and add the Syncfusion CSS and JavaScript references:

```html
<head>
    ...
    <!-- Syncfusion ASP.NET Core controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
</head>

<body>
    ...
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
    
    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

## Basic Implementation

### Step 1: Add Chat-UI to Razor Page

Create or edit a Razor page (e.g., `~/Pages/Index.cshtml`):

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:400px; width:450px">
    <ejs-chatui id="chatUI">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    </ejs-chatui>
</div>
```

### Step 2: Configure C# Code-Behind

In the code-behind file (e.g., `Index.cshtml.cs`):

```csharp
using Syncfusion.EJ2.InteractiveChat;

public class IndexModel : PageModel
{
    public ChatUIUser CurrentUser { get; set; }
    public ChatUIUser CurrentUserModel { get; set; } = new ChatUIUser() 
    { 
        Id = "user1", 
        User = "Albert" 
    };

    public void OnGet()
    {
        CurrentUser = CurrentUserModel;
        ViewData["CurrentUser"] = CurrentUser;
    }
}
```

### Step 3: Run the Application

Press **Ctrl+F5** (Windows) or **⌘+F5** (macOS) to run the application. The Chat-UI component will render in your browser with a basic chat interface and a single user.

## Add Initial Messages

### Step 1: Create Message List in Code-Behind

Modify your code-behind to include initial messages:

```csharp
using Syncfusion.EJ2.InteractiveChat;

public class IndexModel : PageModel
{
    public ChatUIUser CurrentUser { get; set; }
    public List<ChatUIMessage> ChatMessagesData { get; set; } = new List<ChatUIMessage>();
    public ChatUIUser CurrentUserModel { get; set; } = new ChatUIUser() 
    { 
        Id = "user1", 
        User = "Albert" 
    };
    public ChatUIUser OtherUserModel { get; set; } = new ChatUIUser() 
    { 
        Id = "user2", 
        User = "Michale Suyama" 
    };

    public void OnGet()
    {
        CurrentUser = CurrentUserModel;
        
        ChatMessagesData.Add(new ChatUIMessage()
        {
            Text = "Hi Michale, are we on track for the deadline?",
            Author = CurrentUserModel
        });
        
        ChatMessagesData.Add(new ChatUIMessage()
        {
            Text = "Yes, the design phase is complete.",
            Author = OtherUserModel
        });
        
        ChatMessagesData.Add(new ChatUIMessage()
        {
            Text = "I'll review it and send feedback by today.",
            Author = CurrentUserModel
        });
        
        ViewData["ChatMessagesData"] = ChatMessagesData;
        ViewData["CurrentUser"] = CurrentUser;
    }
}
```

### Step 2: Render Messages in Razor Page

Update your Razor page to display the messages:

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:400px; width:450px">
    <ejs-chatui id="chatUI">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-messages>
            @foreach (var message in ViewData["ChatMessagesData"] as List<ChatUIMessage>)
            {
                <e-chatui-message text="@message.Text" author="@message.Author"></e-chatui-message>
            }
        </e-chatui-messages>
    </ejs-chatui>
</div>
```

## Troubleshooting

**Issue: NuGet package not found**
- Verify you're searching in the correct NuGet source
- Ensure you have internet connectivity for nuget.org
- Clear NuGet cache and try again

**Issue: Tag helpers not recognized**
- Confirm `@addTagHelper *, Syncfusion.EJ2` is in `_ViewImports.cshtml`
- Check that the file is in the correct location (`~/Pages/`)
- Rebuild the solution after adding the tag helper

**Issue: Styles/scripts not loading**
- Verify CDN URLs are correct in `_Layout.cshtml`
- Check browser console for 404 errors
- Ensure internet connectivity for CDN resources
