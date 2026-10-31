# Customization

## Table of Contents
- [Overview](#overview)
- [EmptyView](#emptyview)
- [EmptyViewTemplate](#emptyviewtemplate)
- [InputPlaceholderText](#inputplaceholdertext)
- [Empty View vs Banner](#empty-view-vs-banner)
- [Choosing Between EmptyView and EmptyViewTemplate](#choosing-between-emptyview-and-emptyviewtemplate)

---

## Overview

`SfAIAssistView` exposes a small set of customization properties that target three common UX needs:

1. Showing a placeholder for the **input box** before the user types (`InputPlaceholderText`).
2. Rendering rich content in the chat area when **no conversation has started** yet (`EmptyView` and `EmptyViewTemplate`).

These properties complement the existing `BannerTemplate` and `ViewTemplateSelector` features and are designed to be combined or used independently.

---

## EmptyView

The `EmptyView` property accepts any object as its content, which is then displayed in the center of the AI AssistView when there are no messages. This is the simplest way to show a one-line placeholder (e.g., "How can I help you?").

```xaml
<Window
    x:Class="GettingStarted.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="clr-namespace:GettingStarted"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    xmlns:syncfusion="clr-namespace:Syncfusion.UI.Xaml.Chat;assembly=Syncfusion.SfChat.Wpf"
    mc:Ignorable="d">
    <Grid>
        <syncfusion:SfAIAssistView x:Name="AiAssistView"
                                   EmptyView="How can I help you?" />
    </Grid>
</Window>
```

**`EmptyView` characteristics:**

- Type: `object` (any content)
- Display: rendered as the `Content` of the empty-state container
- When shown: when the `Messages` collection is empty

---

## EmptyViewTemplate

The `EmptyViewTemplate` property allows you to customize the appearance of the empty view by specifying a `DataTemplate`. Use this when you need a richer empty state — images, formatted text, multiple `TextBlock`s, icons, or any composite layout.

```xaml
<Window
    x:Class="GettingStarted.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="clr-namespace:GettingStarted"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    xmlns:syncfusion="clr-namespace:Syncfusion.UI.Xaml.Chat;assembly=Syncfusion.SfChat.Wpf"
    mc:Ignorable="d">
    <Grid>
        <syncfusion:SfAIAssistView x:Name="AiAssistView">
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
                                   Foreground="{DynamicResource ContentForeground}" />
                        <TextBlock Text="Ask anything to get started."
                                   HorizontalAlignment="Center"
                                   FontSize="16"
                                   Foreground="{DynamicResource ContentForeground}" />
                    </StackPanel>
                </DataTemplate>
            </syncfusion:SfAIAssistView.EmptyViewTemplate>
        </syncfusion:SfAIAssistView>
    </Grid>
</Window>
```

---

## InputPlaceholderText

The `InputPlaceholderText` property defines placeholder text that appears inside the input textbox before the user types a message. It is useful for guiding users with a hint or prompt (e.g., "Type your question here…").

The placeholder is shown until the user enters content in the input field. Once the user starts typing, the placeholder disappears automatically; it reappears when the input is cleared.

```xaml
<Window
    x:Class="GettingStarted.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="clr-namespace:GettingStarted"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    xmlns:syncfusion="clr-namespace:Syncfusion.UI.Xaml.Chat;assembly=Syncfusion.SfChat.Wpf"
    mc:Ignorable="d">
    <Grid x:Name="grid">
        <syncfusion:SfAIAssistView x:Name="AiAssistView"
                                   InputPlaceholderText="Type your message here..." />
    </Grid>
</Window>
```

**`InputPlaceholderText` characteristics:**

- Type: `string`
- Default: `string.Empty` (no placeholder shown)
- Visibility: shown only while the input box is empty

---

## Empty View vs Banner

The empty view and the banner are mutually exclusive in the default UX:

- When **`BannerTemplate` is set**, the banner is shown above the chat list and the empty view is **hidden** even if the `Messages` collection is empty.
- When only **`EmptyView` / `EmptyViewTemplate` is set** (and no `BannerTemplate`), the empty view is shown when the `Messages` collection is empty.

Choose one pattern per control instance to avoid conflicting visuals.

---

## Choosing Between EmptyView and EmptyViewTemplate

| Need | Use |
|---|---|
| A single short string of text | `EmptyView` |
| A composite layout (icon + title + subtitle, image, call-to-action, etc.) | `EmptyViewTemplate` |
| Theme-aware colors via dynamic resources | `EmptyViewTemplate` (DynamicResource works inside `DataTemplate`) |

If both `EmptyView` and `EmptyViewTemplate` are set, the `EmptyViewTemplate` takes precedence.

---

## Gotchas

- **`EmptyViewTemplate` precedence** — when both are set, the template wins; `EmptyView` is ignored.
- **Empty view is shown only when `Messages` is empty** — adding any message to `Chats` will hide it automatically.
- **`BannerTemplate` suppresses the empty view** — pick one pattern, not both.
- **`InputPlaceholderText` is a single line** — if you need multi-line placeholder content, combine with a custom input area instead.
