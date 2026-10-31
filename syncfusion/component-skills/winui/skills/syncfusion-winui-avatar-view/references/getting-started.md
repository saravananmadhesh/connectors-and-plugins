# Getting Started with WinUI AvatarView

This guide covers installation, basic setup, and your first AvatarView implementation.

## Installation

### NuGet Package

Install the Syncfusion.Core.WinUI NuGet package:

```powershell
Install-Package Syncfusion.Core.WinUI
```

Or via .NET CLI:

```bash
dotnet add package Syncfusion.Core.WinUI
```

Or via Package Manager in Visual Studio:
1. Right-click project → Manage NuGet Packages
2. Search for "Syncfusion.Core.WinUI"
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
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Core">
    <!-- AvatarView controls here -->
</Page>
```

For C# code:

```csharp
using Syncfusion.UI.Xaml.Core;
using Microsoft.UI.Xaml.Media.Imaging;
using Microsoft.UI;
```

## Default Avatar Behavior

When you create an AvatarView without setting any properties, it displays:
- **ContentType:** Default (shows Avatar1 character)
- **AvatarShape:** Circle
- **AvatarSize:** Small (48x48 pixels)

```xaml
<!-- Minimal avatar - shows Avatar1 character, circle shape, small size -->
<syncfusion:SfAvatarView />
```

```csharp
// Minimal avatar in code
SfAvatarView avatarView = new SfAvatarView();
```

## Basic Avatar with Custom Image

The most common scenario is displaying a user's profile picture using the `ImageSource` property:

```xaml
<syncfusion:SfAvatarView 
    ContentType="CustomImage"
    ImageSource="ms-appx:///Assets/ProfilePictures/user.png"
    AvatarSize="Medium"
    AvatarShape="Circle"/>
```

**Image Source Formats:**
- **Local app assets:** `ms-appx:///Assets/image.png`
- **Web URLs:** `https://example.com/image.jpg`
- **Local storage:** `file:///C:/Users/.../image.png`

```csharp
// Set image source in code
SfAvatarView avatarView = new SfAvatarView
{
    ContentType = AvatarContentType.CustomImage,
    ImageSource = new BitmapImage(new Uri("ms-appx:///Assets/ProfilePictures/user.png")),
    AvatarSize = AvatarSize.Medium,
    AvatarShape = AvatarShape.Circle
};
```

## First Complete Example: User Profile

Here's a complete example showing a user profile with avatar, name, and email:

**XAML:**

```xaml
<Page
    x:Class="AvatarDemo.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Core">
    
    <StackPanel Padding="20" Spacing="10" HorizontalAlignment="Center">
        <!-- User Avatar -->
        <syncfusion:SfAvatarView 
            x:Name="userAvatar"
            ContentType="Initials"
            AvatarName="John Doe"
            InitialsType="DoubleCharacter"
            AvatarSize="ExtraLarge"
            AvatarShape="Circle"
            Background="CornflowerBlue"
            Foreground="White"
            HorizontalAlignment="Center"/>
        
        <!-- User Details -->
        <TextBlock 
            Text="John Doe" 
            FontSize="24" 
            FontWeight="Bold"
            HorizontalAlignment="Center"/>
        
        <TextBlock 
            Text="john.doe@example.com" 
            FontSize="14"
            Foreground="Gray"
            HorizontalAlignment="Center"/>
    </StackPanel>
</Page>
```

**Code-Behind (C#):**

```csharp
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Syncfusion.UI.Xaml.Core;
using Microsoft.UI;
using Microsoft.UI.Xaml.Media;

namespace AvatarDemo
{
    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            this.InitializeComponent();
            ConfigureAvatar();
        }

        private void ConfigureAvatar()
        {
            // You can also configure the avatar in code
            userAvatar.ContentType = AvatarContentType.Initials;
            userAvatar.AvatarName = "John Doe";
            userAvatar.InitialsType = AvatarInitialsType.DoubleCharacter;
            userAvatar.AvatarSize = AvatarSize.ExtraLarge;
            userAvatar.AvatarShape = AvatarShape.Circle;
            userAvatar.Background = new SolidColorBrush(Colors.CornflowerBlue);
            userAvatar.Foreground = new SolidColorBrush(Colors.White);
        }
    }
}
```

**Result:** Displays "JD" initials in a large blue circle.

## Quick Examples by Scenario

### Avatar with Image
```xaml
<syncfusion:SfAvatarView 
    ContentType="CustomImage"
    ImageSource="ms-appx:///Assets/john.jpg"
    AvatarSize="Large"
    AvatarShape="Circle"/>
```

### Avatar with Initials
```xaml
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="Sarah Johnson"
    InitialsType="DoubleCharacter"
    AvatarSize="Medium"
    Background="#FF6A5ACD"
    Foreground="White"/>
```

### Avatar with Character
```xaml
<syncfusion:SfAvatarView 
    ContentType="AvatarCharacter"
    AvatarCharacter="Avatar12"
    AvatarSize="Medium"/>
```

## Common Setup Issues

### Issue 1: Avatar Not Appearing
**Cause:** Missing NuGet package or namespace import.

**Solution:**
1. Verify Syncfusion.Core.WinUI is installed
2. Check namespace: `xmlns:syncfusion="using:Syncfusion.UI.Xaml.Core"`
3. Ensure license is registered in App.xaml.cs

### Issue 2: Image Not Loading
**Cause:** Incorrect ImageSource path or file not included in project.

**Solution:**
1. Verify image file is in project with Build Action = Content
2. Use correct URI format: `ms-appx:///Assets/image.png`
3. Check image file exists at specified path

### Issue 3: License Warning/Watermark
**Cause:** License key not registered or invalid.

**Solution:**
1. Register license in App.xaml.cs constructor
2. Use valid license key from Syncfusion account
3. For evaluation, use trial license key

## Next Steps

- **Content Types:** Learn about 5 content types (Initials, CustomImage, AvatarCharacter, Group) in [content-types.md](content-types.md)
- **Visual Styles:** Explore shapes and sizes in [visual-styles.md](visual-styles.md)
- **Customization:** Customize colors, borders, and gradients in [customization.md](customization.md)
