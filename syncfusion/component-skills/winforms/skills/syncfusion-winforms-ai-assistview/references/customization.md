# Customization in AI AssistView

## Table of Contents
- [Overview](#overview)
- [Banner Customization](#banner-customization)
- [Custom BotView](#custom-botview)
- [Custom UserView](#custom-userview)
- [AvatarStyle Customization](#avatarstyle-customization)
- [Advanced Customization](#advanced-customization)
- [Best Practices](#best-practices)

## Overview

The AI AssistView offers extensive customization options to match your application's branding and UX requirements. You can customize:
- **BannerView**: The header area with title, subtitle, and icon
- **BotView**: The appearance of AI/bot messages
- **UserView**: The appearance of user messages

## Prerequisites

- A `ViewModel` class with a `Chats` collection, `ShowTypingIndicator`, `Suggestion`, and `CurrentUser` properties (see Getting Started)
- A banner image added to the project at the path referenced in code (e.g., `Asset\AI_Assist.png`)
- Required `using` directives:

```csharp
using System;
using System.Collections.Specialized;
using System.ComponentModel;
using System.Drawing;
using System.Windows.Forms;
using Syncfusion.WinForms.Forms;
using Syncfusion.WinForms.AIAssistView;
```

## Banner Customization

The banner appears at the top of the AssistView and typically displays a welcome message, AI service information, or branding.

### SetBannerView Method

```csharp
public void SetBannerView(string title, string subtitle, Image image, BannerStyle style)
```

**Parameters:**
- `title`: Main heading text
- `subtitle`: Secondary text below the title
- `image`: Icon or logo image
- `style`: `BannerStyle` object with appearance settings

### BannerStyle Properties

```csharp
public class BannerStyle
{
    public Font TitleFont { get; set; }
    public Font SubTitleFont { get; set; }
    public AvatarSize ImageSize { get; set; }
    public Color TitleColor { get; set; }
    public Color SubTitleColor { get; set; }
}
```

### Basic Banner Example

```csharp
private void SetupBanner()
{
    BannerStyle customStyle = new BannerStyle
    {
        TitleFont = new Font("Segoe UI", 14F, FontStyle.Bold),
        SubTitleFont = new Font("Segoe UI", 12F, FontStyle.Italic),
        ImageSize = AvatarSize.Medium,
        SubTitleColor = Color.Gray,
        TitleColor = Color.DarkBlue
    };
    
    string title = "AI Assistant";
    string subTitle = "Your intelligent companion";
    
    sfAIAssistView1.SetBannerView(
        title, 
        subTitle, 
        Image.FromFile(@"Assets\AI_Assist.png"), 
        customStyle
    );
}
```

### Complete Banner Implementation

```csharp
public partial class Form1 : Form
{
    ViewModel viewModel;
    private SfAIAssistView sfAIAssistView1;
    
    public Form1()
    {
        InitializeComponent();
        viewModel = new ViewModel();
        
        sfAIAssistView1 = new SfAIAssistView();
        sfAIAssistView1.Dock = DockStyle.Fill;
        this.Controls.Add(sfAIAssistView1);
        
        sfAIAssistView1.DataBindings.Add("Messages", viewModel, "Chats", 
            true, DataSourceUpdateMode.OnPropertyChanged);
        
        viewModel.CurrentUser = sfAIAssistView1.User;
        
        // Customize banner
        BannerTemplate();
    }
    
    private void BannerTemplate()
    {
        BannerStyle customStyle = new BannerStyle
        {
            TitleFont = new Font("Segoe UI", 14F, System.Drawing.FontStyle.Bold),
            SubTitleFont = new Font("Segoe UI", 12F, System.Drawing.FontStyle.Italic),
            ImageSize = AvatarSize.Medium,
            SubTitleColor = Color.Red,
            TitleColor = Color.Green,
        };

        string title = "AI Assist ";
        string subTitle = "Your best AI Companion";
        sfAIAssistView1.SetBannerView(title, subTitle, 
            Image.FromFile(@"Asset\AI_Assist.png"), customStyle);
    }
}
```

## Custom BotView

Create and set a custom BotView using the `SetBotView` method to control how bot/AI messages are rendered.

### SetBotView Method

```csharp
public void SetBotView(object chatItem, Control view)
```

### Creating a Custom BotView

The following example creates a custom bot message view with a styled label and interactive buttons for the initial prompt message:

```csharp
public partial class Form1 : Form
{
    public Form1()
    {
        // Apply custom views to existing default messages
        foreach (var item in viewModel.Chats)
        {
            if (item is TextMessage tm)
            {           
                sfAIAssistView1.SetBotView(tm, CreateBotView(tm));
            }
        }
        
        viewModel.Chats.CollectionChanged += Chats_CollectionChanged;
    }

    private void Chats_CollectionChanged(object sender, NotifyCollectionChangedEventArgs e)
    {
        if (e.Action != NotifyCollectionChangedAction.Add) return;

        foreach (var newItem in e.NewItems ?? new object[0])
        {
            if (newItem is TextMessage message)
            {
                sfAIAssistView1.SetBotView(message, CreateBotView(message));
            }
        }
    }

    private Control CreateBotView(TextMessage message)
    {
        string text = string.IsNullOrEmpty(message?.Text) ? "Hello from the bot." : message.Text;

        var container = new FlowLayoutPanel
        {
            AutoSize = true,
            WrapContents = true,
            Padding = new Padding(6),
            BackColor = Color.Transparent
        };

        var lbl = new Label
        {
            Text = text,
            AutoSize = true,
            BackColor = Color.FromArgb(230, 240, 255),
            ForeColor = Color.FromArgb(24, 24, 24),
            Padding = new Padding(8),
            Margin = new Padding(0, 0, 0, 6)
        };

        container.Controls.Add(lbl);

        // Show buttons only for the initial prompt message
        const string prompt = "I am an AI assistant. Please choose from the options below";
        if (string.Equals(text?.Trim(), prompt, StringComparison.OrdinalIgnoreCase))
        {
            var btnRow = new FlowLayoutPanel
            {
                AutoSize = true,
                WrapContents = true,
                Margin = new Padding(0)
            };

            string[] choices = new[] { "What is WinForms?", "What is AI?" };
            foreach (var c in choices)
            {
                var btn = new Button
                {
                    Text = c,
                    AutoSize = true,
                    Tag = c,
                    BackColor = Color.WhiteSmoke,
                    Margin = new Padding(0, 0, 6, 0)
                };

                btn.Click += (s, e) =>
                {
                    var choice = (string)((Button)s).Tag;
                    viewModel?.Chats.Add(new TextMessage
                    {
                        Author = viewModel.CurrentUser,
                        Text = choice
                    });
                };

                btnRow.Controls.Add(btn);
            }

            container.Controls.Add(btnRow);
        }

        return container;
    }
}
```

## Custom UserView

Create and set a custom UserView using the `SetUserView` method to control how user messages are rendered.

### SetUserView Method

```csharp
public void SetUserView(object chatItem, Control view)
```

### Creating a Custom UserView

```csharp
public partial class Form1 : Form
{
    public Form1()
    {
        InitializeComponent();
        viewModel.Chats.CollectionChanged += Chats_CollectionChanged;
    }

    private void Chats_CollectionChanged(object sender, NotifyCollectionChangedEventArgs e)
    {
        if (e.Action != NotifyCollectionChangedAction.Add) return;

        foreach (var newItem in e.NewItems ?? new object[0])
        {
            if (newItem is TextMessage message)
            {
                sfAIAssistView1.SetUserView(message, CreateUserView(message));
            }
        }
    }
    
    private Control CreateUserView(TextMessage message)
    {
        string content = message?.Text ?? string.Empty;

        var lbl = new Label 
        {
            Text = content,
            AutoSize = true,
            MaximumSize = new System.Drawing.Size(520, 0),
            BackColor = Color.LightGoldenrodYellow,
            ForeColor = Color.Blue,
            Padding = new Padding(5),
        };
        
        return lbl;
    }
}
```

## AvatarStyle Customization

Avatars represent the bot, the user, and the banner. The `AvatarStyle` class centralizes avatar appearance (image, initials, themed glyph, shape, size, colors). Apply one instance to `BannerStyle.AvatarStyle`, an `Author.AvatarStyle` on a message, or `TypingIndicator.Author.AvatarStyle`.

### AvatarStyle Properties

| Property | Type | Description |
|----------|------|-------------|
| `AvatarContent` | `AvatarContentType` | Rendering source: `Default`, `CustomImage`, `Initials`, `AvatarCharacter` |
| `AvatarImage` | `Image` | Image used when `AvatarContent` is `CustomImage` |
| `AvatarName` | `string` | Name used to derive initials when `AvatarContent` is `Initials` |
| `AvatarCharacterType` | `AvatarCharacterType` | Themed glyph `Avatar1`...`Avatar25` (used with `AvatarCharacter`) |
| `AvatarInitialsType` | `AvatarInitialsType` | `SingleCharacter` (default) or `TwoCharacter` |
| `AvatarBackColor` / `AvatarForeColor` | `Color` | Fill and text/glyph color for initials and glyphs |
| `AvatarShape` | `AvatarShape` | `Circle` (default), `Square`, `Custom` |
| `CornerRadius` | `int` | Pixel radius; only applied when `AvatarShape = Custom` |
| `AvatarSize` | `AvatarSize` | `ExtraSmall` (18px), `Small` (24px), `Medium` (32px), `Large`, `ExtraLarge` |

### Banner Avatar (Image)

```csharp
BannerStyle bannerStyle = new BannerStyle
{
    TitleFont = new Font("Segoe UI", 14F, FontStyle.Bold),
    SubTitleFont = new Font("Segoe UI", 12F, FontStyle.Italic),
    TitleColor = Color.MidnightBlue,
    SubTitleColor = Color.DimGray,
    ImageSize = AvatarSize.ExtraLarge,
    AvatarStyle = new AvatarStyle
    {
        AvatarContent = AvatarContentType.CustomImage,
        AvatarImage = Image.FromFile(@"Ai Assistance\Ai Assistance@3x.png"),
        AvatarShape = AvatarShape.Circle
    },
    Title = "AI Assist view",
    SubTitle = "Your best AI Companion"
};

sfaiAssistView1.SetBannerView(bannerStyle);
```

### Banner Avatar (Initials)

```csharp
BannerStyle bannerStyle = new BannerStyle
{
    ImageSize = AvatarSize.ExtraLarge,
    AvatarStyle = new AvatarStyle
    {
        AvatarContent = AvatarContentType.Initials,
        AvatarName = "AI",
        AvatarInitialsType = AvatarInitialsType.SingleCharacter,
        AvatarShape = AvatarShape.Square,
        AvatarBackColor = Color.SteelBlue,
        AvatarForeColor = Color.White
    }
};

// Pass null for the image so AvatarStyle is the single source of truth
sfaiAssistView1.SetBannerView("AI Assist view", "Your best AI Companion", null, bannerStyle);
```

### Message and Typing Indicator Avatars

Create one `Author` per identity and reuse it for the initial greeting, bot replies, and the typing indicator.

```csharp
Author botAuthor = new Author
{
    Name = "Bot",
    AvatarStyle = new AvatarStyle
    {
        AvatarContent = AvatarContentType.Initials,
        AvatarName = "AI",
        AvatarInitialsType = AvatarInitialsType.SingleCharacter,
        AvatarBackColor = Color.SteelBlue,
        AvatarForeColor = Color.White,
        AvatarShape = AvatarShape.Circle
    }
};

sfaiAssistView1.TypingIndicator.Author = botAuthor;
sfaiAssistView1.TypingIndicator.DisplayText = "Typing";

viewModel.Chats.Add(new TextMessage
{
    Author = botAuthor,
    DateTime = DateTime.Now,
    Text = "Hello, I am an AI Assistant. \nAsk anything you want to know",
    Type = MessageType.Bot
});
```

### Custom Shape with CornerRadius

```csharp
AvatarStyle style = new AvatarStyle
{
    AvatarName = "Finley James",
    AvatarInitialsType = AvatarInitialsType.TwoCharacter,   // renders "FJ"
    AvatarBackColor = Color.Teal,
    AvatarForeColor = Color.White,
    AvatarShape = AvatarShape.Custom,
    CornerRadius = 10
};

Author bot = new Author { Name = "Finley James", AvatarStyle = style };
```

### Avatar Notes

- If `AvatarContent` is `CustomImage` and `AvatarImage` is `null`, the control falls back to `Default` (themed glyph from `AvatarCharacterType`).
- `CornerRadius` is ignored for `Circle` and `Square`.
- Reuse one `AvatarStyle`/`Author` instance across messages to avoid unnecessary layout refreshes.
- Pair `BannerStyle.ImageSize` with the chat avatar `AvatarSize` for visual consistency.

## Best Practices

- **Apply views early**: Apply custom views to existing messages before they are displayed, and subscribe to `CollectionChanged` to handle new messages
- **Check message type**: Always check the message type (`is TextMessage`) before calling `SetBotView` or `SetUserView`
- **Clean up event handlers**: Unsubscribe from `CollectionChanged` when the form is disposed to prevent memory leaks
- **Use `AutoSize`**: Set `AutoSize = true` on container controls to let them size to their content properly
- **Set `MaximumSize`**: For user message labels, set `MaximumSize` to prevent the label from extending beyond the viewport