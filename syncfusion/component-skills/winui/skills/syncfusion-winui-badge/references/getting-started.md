# Getting Started with WinUI Badge

This guide covers the installation, setup, and basic implementation of the Syncfusion WinUI Badge control (`SfBadge`).

## Installation

### Step 1: Create WinUI 3 Desktop Application

If you don't have a WinUI 3 project yet:

1. Open Visual Studio
2. Create a new project
3. Select **"Blank App, Packaged (WinUI 3 in Desktop)"** template
4. Name your project and click Create

[Learn more about creating WinUI 3 apps](https://learn.microsoft.com/en-us/windows/apps/winui/winui3/create-your-first-winui3-app)

### Step 2: Add NuGet Package

Add the Syncfusion Notifications WinUI package to your project:

**Using Package Manager Console:**
```powershell
Install-Package Syncfusion.Notifications.WinUI
```

**Using NuGet Package Manager UI:**
1. Right-click your project → Manage NuGet Packages
2. Search for `Syncfusion.Notifications.WinUI`
3. Click Install

**Using .csproj file:**
```xml
<ItemGroup>
  <PackageReference Include="Syncfusion.Notifications.WinUI" Version="*" />
</ItemGroup>
```

### Step 3: Import the Namespace

Add the Badge namespace to your XAML page:

```xaml
<Page
    x:Class="YourApp.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:notification="using:Syncfusion.UI.Xaml.Notifications"
    Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
    
    <!-- Your content here -->
</Page>
```

For C# code-behind, add:
```csharp
using Syncfusion.UI.Xaml.Notifications;
```

## Basic Badge Implementation

### Creating a Simple Badge

The simplest Badge implementation:

```xaml
<notification:SfBadge Name="badge"
                      Content="10"
                      Height="30"
                      Width="30"/>
```

**In C#:**
```csharp
SfBadge badge = new SfBadge();
badge.Content = "10";
badge.Height = 30;
badge.Width = 30;
grid.Children.Add(badge);
```

## Adding Badge to Other Controls

The most common use case is adding a Badge to another control like a Button. This requires the `BadgeContainer` component.

### Understanding BadgeContainer

`BadgeContainer` is a wrapper that manages the relationship between a Badge and its target control. It has two key properties:

1. **Content** - The control to display (Button, Image, Icon, etc.)
2. **Badge** - The `SfBadge` to overlay on the content

### Adding Badge to a Button

```xaml
<notification:BadgeContainer Name="badgeContainer">
    <notification:BadgeContainer.Badge>
        <notification:SfBadge Name="badge" 
                              Content="10"/>
    </notification:BadgeContainer.Badge>
    <notification:BadgeContainer.Content>
        <Button Content="Inbox" Width="100" Height="40"/>
    </notification:BadgeContainer.Content>
</notification:BadgeContainer>
```

**In C#:**
```csharp
// Create the Badge
SfBadge badge = new SfBadge();
badge.Content = "10";

// Create the container
BadgeContainer badgeContainer = new BadgeContainer();
badgeContainer.Content = new Button() { Content = "Inbox", Width = 100, Height = 40 };

// Assign Badge to the container
badgeContainer.Badge = badge;

// Add to layout
grid.Children.Add(badgeContainer);
```

### Adding Badge to an Image

```xaml
<notification:BadgeContainer>
    <notification:BadgeContainer.Content>
        <Image Source="/Assets/notification-icon.png" 
               Width="48" 
               Height="48"/>
    </notification:BadgeContainer.Content>
    <notification:BadgeContainer.Badge>
        <notification:SfBadge Content="5" Fill="Error"/>
    </notification:BadgeContainer.Badge>
</notification:BadgeContainer>
```

### Adding Badge to a PersonPicture (Avatar)

```xaml
<notification:BadgeContainer>
    <notification:BadgeContainer.Content>
        <PersonPicture Width="80" 
                      Height="80" 
                      ProfilePicture="/Assets/user-avatar.png"/>
    </notification:BadgeContainer.Content>
    <notification:BadgeContainer.Badge>
        <notification:SfBadge Content="Online" 
                             Fill="Success"
                             Shape="Rectangle"/>
    </notification:BadgeContainer.Badge>
</notification:BadgeContainer>
```

## Setting Badge Content

The `Content` property determines what displays in the Badge. It can be:

### Numeric Content

```xaml
<notification:SfBadge Content="99"/>
```

### Text Content

```xaml
<notification:SfBadge Content="New"/>
```

### Formatted Content

```xaml
<notification:SfBadge Content="99+"/>
```

### Dynamic Content (Data Binding)

```xaml
<notification:SfBadge Content="{x:Bind UnreadMessageCount, Mode=OneWay}"/>
```

**In ViewModel or Code-Behind:**
```csharp
public int UnreadMessageCount { get; set; } = 25;
```

### Null or Empty Content

When `Content` is `null`, the Badge is automatically hidden:

```csharp
// Hide badge by setting content to null
badge.Content = null;

// Show badge with content
badge.Content = "5";
```

## Badge Visibility Control

Control Badge visibility explicitly:

```xaml
<!-- Visible Badge -->
<notification:SfBadge Content="10" 
                     Visibility="Visible"/>

<!-- Hidden Badge -->
<notification:SfBadge Content="10" 
                     Visibility="Collapsed"/>
```

**Conditional visibility in C#:**
```csharp
// Show badge only if count > 0
badge.Visibility = (count > 0) ? Visibility.Visible : Visibility.Collapsed;
badge.Content = count;
```

## Complete Example

Here's a complete working example:

**MainPage.xaml:**
```xaml
<Page
    x:Class="BadgeDemo.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:notification="using:Syncfusion.UI.Xaml.Notifications"
    Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
    
    <StackPanel Spacing="20" 
                HorizontalAlignment="Center" 
                VerticalAlignment="Center">
        
        <!-- Badge on Button -->
        <notification:BadgeContainer>
            <notification:BadgeContainer.Content>
                <Button Content="Messages" Width="120" Height="40"/>
            </notification:BadgeContainer.Content>
            <notification:BadgeContainer.Badge>
                <notification:SfBadge Content="{x:Bind MessageCount, Mode=OneWay}"
                                     Fill="Error"/>
            </notification:BadgeContainer.Badge>
        </notification:BadgeContainer>
        
        <!-- Update Count Button -->
        <Button Content="Increment Count" 
                Click="IncrementButton_Click"/>
    </StackPanel>
</Page>
```

**MainPage.xaml.cs:**
```csharp
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Syncfusion.UI.Xaml.Notifications;
using System.ComponentModel;

namespace BadgeDemo
{
    public sealed partial class MainPage : Page, INotifyPropertyChanged
    {
        private int _messageCount = 5;
        
        public int MessageCount
        {
            get => _messageCount;
            set
            {
                _messageCount = value;
                PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(MessageCount)));
            }
        }
        
        public event PropertyChangedEventHandler PropertyChanged;
        
        public MainPage()
        {
            this.InitializeComponent();
        }
        
        private void IncrementButton_Click(object sender, RoutedEventArgs e)
        {
            MessageCount++;
        }
    }
}
```

## Key Takeaways

1. **NuGet Package**: `Syncfusion.Notifications.WinUI`
2. **Namespace**: `Syncfusion.UI.Xaml.Notifications`
3. **Main Components**: `SfBadge` and `BadgeContainer`
4. **Content Property**: What displays in the badge (number, text, etc.)
5. **BadgeContainer**: Required for overlaying badges on other controls
6. **Auto-Hide**: Badge automatically hides when Content is null

## Next Steps

Now that you have the Badge set up, explore:

- **[Shapes and Fill Styles](shapes-and-fills.md)** - Change badge appearance with different shapes and colors
- **[Alignment and Positioning](alignment-positioning.md)** - Position badges precisely on controls
- **[Customization Options](customization.md)** - Fully customize badge appearance
- **[Features and Configuration](features.md)** - Add animations and advanced features
