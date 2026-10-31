# Customization in WinUI AI AssistView

This guide covers how to customize the `SfAIAssistView` empty state and input area to guide the user before a conversation starts.

## Table of Contents
- [Overview](#overview)
- [InputPlaceHolderText](#inputplaceholdertext)
- [EmptyView and EmptyViewTemplate](#emptyview-and-emptyviewtemplate)
  - [EmptyView](#emptyview)
  - [EmptyViewTemplate](#emptyviewtemplate)
- [Interaction Between Empty View and Banner](#interaction-between-empty-view-and-banner)
- [Common Patterns](#common-patterns)

---

## Overview

`SfAIAssistView` provides three properties that control what is shown before the user starts a conversation and what hint is displayed in the input area:

- **`InputPlaceholderText`** — text shown inside the input box before the user types.
- **`EmptyView`** — simple content (text or any UI element) shown in the center of the chat area when there are no messages.
- **`EmptyViewTemplate`** — a `DataTemplate` for rich empty-state content (welcome message, image, call-to-action, etc.).

Together, these properties let you create a polished first-run experience that guides the user into the conversation.

---

## InputPlaceHolderText

The `InputPlaceHolderText` property allows you to define placeholder text that appears in the input box before the user types a message. This is useful for guiding users with a hint or prompt, such as *"Type your question here…"*.

When set, the placeholder text is displayed until the user enters content in the input field, then disappears automatically.

### Property Signature

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `InputPlaceholderText` | `string` | `null` | Placeholder text shown in the input box before the user types a message. |

### XAML

```xaml
<Window
    x:Class="GettingStarted.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:GettingStarted"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Chat"
    mc:Ignorable="d"
    Title="GettingStarted">
    <Grid x:Name="grid">
        <syncfusion:SfAIAssistView x:Name="AiAssistView"
                                   InputPlaceholderText="Type your message here..."/>
    </Grid>
</Window>
```

### Code-Behind

```csharp
using Microsoft.UI.Xaml;

namespace GettingStarted
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            AiAssistView.InputPlaceholderText = "Type your message here...";
        }
    }
}
```

### When to Use

- Guide the user with a hint about the expected input (e.g., "Type your question here…", "Ask anything…").
- Localize the input prompt for different languages.
- Suggest the kind of content the AI is trained to handle ("Search products", "Ask about orders", etc.).

### Best Practices

1. **Keep it short:** One short sentence works best. Long placeholders truncate awkwardly.
2. **Be action-oriented:** Use verb phrases like "Type your message here…" or "Ask a question…".
3. **Match your brand voice:** Align the tone of the placeholder with the rest of the app's copy.
4. **Localize:** Bind to a localized resource for multi-language apps.

---

## EmptyView and EmptyViewTemplate

By using the `EmptyView` and `EmptyViewTemplate` properties, `SfAIAssistView` displays custom content (such as a welcome message, an image, or a call-to-action) when the conversation has no messages. This is useful for guiding the user before a chat begins.

The empty view is automatically displayed when the `Messages` collection is empty **and** either `EmptyView` or `EmptyViewTemplate` is defined. When a banner is also provided, the banner is displayed instead (see [Interaction Between Empty View and Banner](#interaction-between-empty-view-and-banner)).

### Property Signatures

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `EmptyView` | `object` | `null` | Simple content (string or UI element) shown in the center of the AI AssistView when there are no messages. |
| `EmptyViewTemplate` | `DataTemplate` | `null` | `DataTemplate` used to render rich content in the empty state. |

---

### EmptyView

The `EmptyView` property accepts any object as its content, which is then displayed in the center of the AI AssistView when there are no messages.

#### XAML

```xaml
<Window
    x:Class="GettingStarted.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:GettingStarted"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Chat"
    mc:Ignorable="d"
    Title="GettingStarted">
    <Grid x:Name="grid">
        <syncfusion:SfAIAssistView x:Name="AiAssistView"
                                   EmptyView="How can I help you?"/>
    </Grid>
</Window>
```

#### When to Use

- Quick, single-line welcome prompts.
- Minimalist first-run experiences.
- Localized string placeholders that don't need any layout.

---

### EmptyViewTemplate

The `EmptyViewTemplate` property allows you to customize the appearance of the empty view by specifying a `DataTemplate`. This is useful for displaying rich content, such as images, formatted text, or custom layouts, when no messages are available.

#### XAML

```xaml
<Window
    x:Class="GettingStarted.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:GettingStarted"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Chat"
    mc:Ignorable="d"
    Title="GettingStarted">
    <Grid x:Name="grid">
        <syncfusion:SfAIAssistView x:Name="AiAssistView" InputPlaceholderText="Type your message here...">
            <syncfusion:SfAIAssistView.EmptyViewTemplate>
                <DataTemplate>
                    <StackPanel
                        Orientation="Vertical"
                        VerticalAlignment="Center"
                        HorizontalAlignment="Center">
                        <TextBlock Text="Hi, How can I help you?"
                                   FontSize="20"
                                   HorizontalAlignment="Center"
                                   FontWeight="Bold"
                                   Foreground="Black"/>
                        <TextBlock Text="Ask anything to get started."
                                   HorizontalAlignment="Center"
                                   FontSize="16"
                                   Foreground="Black"/>
                    </StackPanel>
                </DataTemplate>
            </syncfusion:SfAIAssistView.EmptyViewTemplate>
        </syncfusion:SfAIAssistView>
    </Grid>
</Window>
```

#### When to Use

- A polished welcome screen with branding, an icon, or an image.
- A first-run call-to-action with a "Get started" button.
- A tutorial-style prompt with multiple lines of guidance.

#### Best Practices

1. **Center the content:** Use `VerticalAlignment="Center"` and `HorizontalAlignment="Center"` so the welcome looks intentional.
2. **Mind the contrast:** Set explicit `Foreground` colors that work against both light and dark themes.
3. **Pair with `InputPlaceholderText`:** Combine the empty state with `InputPlaceholderText` so the user knows what to do next.
4. **Keep it short:** Two or three lines of text is ideal — long blocks of copy feel overwhelming in an empty state.

---

## Interaction Between Empty View and Banner

| Scenario | What is shown |
|----------|---------------|
| `Messages` is empty **and** only `EmptyView` / `EmptyViewTemplate` is set | The empty view is displayed in the center of the chat area. |
| `Messages` is empty **and** a `BannerTemplate` is also set | The **banner** is displayed; the empty view is hidden. |
| `Messages` has at least one message | The conversation is displayed; the empty view is hidden automatically. |

> **Note:** If you need both a persistent top banner **and** a welcome screen, choose one approach. The banner is intended for persistent branding; the empty view is intended for pre-conversation guidance.

---

## Common Patterns

### 1. Minimal Welcome Prompt

Use `EmptyView` with a single string for a fast, localized welcome.

```xaml
<syncfusion:SfAIAssistView EmptyView="How can I help you?" />
```

**When to use:** Simple assistants where a single line of guidance is enough.

### 2. Branded Welcome with Logo

Use `EmptyViewTemplate` to show a logo, headline, and subtitle.

```xaml
<syncfusion:SfAIAssistView InputPlaceholderText="Type your message here...">
    <syncfusion:SfAIAssistView.EmptyViewTemplate>
        <DataTemplate>
            <StackPanel VerticalAlignment="Center" HorizontalAlignment="Center" Spacing="8">
                <Image Source="ms-appx:///Assets/logo.png" Width="64" Height="64" />
                <TextBlock Text="Hi, How can I help you?" FontSize="20" FontWeight="Bold" />
                <TextBlock Text="Ask anything to get started." FontSize="16" />
            </StackPanel>
        </DataTemplate>
    </syncfusion:SfAIAssistView.EmptyViewTemplate>
</syncfusion:SfAIAssistView>
```

**When to use:** Customer-facing assistants that need a polished first impression.

### 3. First Chat with Conversation History

Combine `ShowNavigationView` with `EmptyViewTemplate` so the navigation pane is visible while the user is on a fresh chat.

```xaml
<syncfusion:SfAIAssistView
    ShowNavigationView="True"
    NavigationHeader="My Chats"
    Conversations="{Binding Conversations}"
    CurrentUser="{Binding CurrentUser}"
    Messages="{Binding Chats}"
    InputPlaceholderText="Type your message here...">
    <syncfusion:SfAIAssistView.EmptyViewTemplate>
        <DataTemplate>
            <StackPanel VerticalAlignment="Center" HorizontalAlignment="Center" Spacing="8">
                <TextBlock Text="Start a new chat" FontSize="20" FontWeight="Bold" />
                <TextBlock Text="Ask me anything to get going." Opacity="0.7" />
            </StackPanel>
        </DataTemplate>
    </syncfusion:SfAIAssistView.EmptyViewTemplate>
</syncfusion:SfAIAssistView>
```

**When to use:** Multi-conversation assistants. See [conversation-history.md](conversation-history.md) for the full pattern.

---

## Key Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `InputPlaceholderText` | `string` | `null` | Placeholder text shown in the input box before the user types a message. |
| `EmptyView` | `object` | `null` | Simple content shown in the center of the AI AssistView when there are no messages. |
| `EmptyViewTemplate` | `DataTemplate` | `null` | `DataTemplate` used to render rich content in the empty state. |

---

## Implementation Tips

1. **Empty state auto-hides:** The empty view is shown only when `Messages` is empty. Once the user sends a message, the empty view is automatically hidden.

2. **Use either EmptyView or EmptyViewTemplate:** If both are set, `EmptyViewTemplate` takes precedence.

3. **Combine with placeholder text:** Pair the empty state with `InputPlaceholderText` to give the user both a visual cue and a textual hint.

4. **Mind theme colors:** Use theme resources or set explicit colors that work for both Light and Dark themes.

5. **Localize copy:** Bind empty-view text and placeholder text to localized string resources for multi-language apps.

6. **Test with no messages:** Always verify the empty state by starting the app with an empty `Messages` collection.
