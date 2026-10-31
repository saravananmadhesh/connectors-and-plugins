# Conversation History in WinUI AI AssistView

This guide covers how to display, navigate, and manage multiple conversations using the built-in conversation history navigation view in `SfAIAssistView`.

## Table of Contents
- [Overview](#overview)
- [ShowNavigationView Property](#shownavigationview-property)
- [Conversations Property](#conversations-property)
- [AssistConversationItem Class](#assistconversationitem-class)
- [Define the ViewModel](#define-the-viewmodel)
- [Bind Conversations to SfAIAssistView](#bind-conversations-to-sfaiassistview)
- [NavigationHeader](#navigationheader)
- [Built-in New Chat and Selection Behavior](#built-in-new-chat-and-selection-behavior)
- [Common Patterns](#common-patterns)
  - [Add a Welcome Empty State](#1-add-a-welcome-empty-state)
  - [Filter Conversations by Date](#2-filter-conversations-by-date)

---

## Overview

`SfAIAssistView` supports a built-in conversation history navigation view that lets users create new chats, preserve previous conversations, and switch between archived conversations. The history is rendered in a side navigation pane (collapsible via a built-in hamburger button), so the chat area and history are visible side-by-side.

This is useful for any AI assistant UI where the user is expected to have **multiple independent conversations** (e.g., a research assistant, customer support bot, or multi-topic chat).

---

## ShowNavigationView Property

The `ShowNavigationView` property controls the visibility of the conversation history navigation view. Default value: **`false`** (navigation view is hidden).

### XAML

```xaml
<syncfusion:SfAIAssistView x:Name="aiAssistView"
                           ShowNavigationView="True" />
```

### Code-Behind

```csharp
using Microsoft.UI.Xaml;

namespace AIAssistViewHistoryWinUI
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            aiAssistView.ShowNavigationView = true;
        }
    }
}
```

When `ShowNavigationView="True"`, a built-in hamburger button is rendered in the header. Clicking it collapses or expands the navigation view.

---

## Conversations Property

The `Conversations` property is the data source for the navigation view. It accepts an `ObservableCollection<AssistConversationItem>`. Each `AssistConversationItem` represents a single archived conversation and contains the conversation's metadata plus the messages that belong to it.

This collection is also updated at runtime when new requests are made in the conversation — the control automatically adds a new `AssistConversationItem` to the `Conversations` collection when a new chat starts and the user sends a message.

### Property Signature

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `Conversations` | `ObservableCollection<AssistConversationItem>` | `null` | Collection of archived conversations rendered in the navigation view. |

---

## AssistConversationItem Class

Each item in the `Conversations` collection is an `AssistConversationItem`. It carries the conversation's metadata and the messages that should be restored when the user selects it.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `Title` | `string` | Display title for the conversation in the navigation view. |
| `DateTime` | `DateTime` | When the conversation occurred. Used for grouping (today / yesterday / older). |
| `AssistItems` | `ObservableCollection<object>` | The messages that belong to this conversation (typically `TextMessage` items). |

---

## Define the ViewModel

Create a view model that exposes `Chats`, `CurrentUser`, and `Conversations`. Populate each `AssistConversationItem` with its associated messages so the history restores properly when a user selects a conversation.

```csharp
using System;
using System.Collections.ObjectModel;
using Syncfusion.UI.Xaml.Chat;

namespace AIAssistViewHistoryWinUI
{
    public class AIAssistViewModel
    {
        public ObservableCollection<object> Chats { get; set; }

        public Author CurrentUser { get; set; }

        public ObservableCollection<AssistConversationItem> Conversations { get; set; }

        public AIAssistViewModel()
        {
            CurrentUser = new Author() { Name = "User" };
            Chats = new ObservableCollection<object>();

            DateTime today = DateTime.Today;
            DateTime yesterday = today.Subtract(TimeSpan.FromDays(1));
            DateTime twoDaysAgo = today.Subtract(TimeSpan.FromDays(2));

            Conversations = new ObservableCollection<AssistConversationItem>()
            {
                CreateConversation(
                    "Scotland",
                    "Tell me about Scotland.",
                    "Scotland is known for its historic castles, landscapes, and cultural heritage.",
                    twoDaysAgo),

                CreateConversation(
                    "Coding practices",
                    "What are some good coding practices?",
                    "Use code reviews, unit testing, clear naming, and consistent coding standards.",
                    yesterday),

                CreateConversation(
                    "Syncfusion",
                    "What does Syncfusion provide?",
                    "Syncfusion provides UI controls and components for .NET applications.",
                    today)
            };
        }

        private AssistConversationItem CreateConversation(string title, string requestText, string responseText, DateTime dateTime)
        {
            return new AssistConversationItem()
            {
                Title = title,
                DateTime = dateTime,
                AssistItems = new ObservableCollection<object>()
                {
                    new TextMessage()
                    {
                        Text = requestText,
                        DateTime = dateTime,
                        Author = CurrentUser
                    },
                    new TextMessage()
                    {
                        Text = responseText,
                        DateTime = dateTime.AddMinutes(1),
                        Author = new Author() { Name = "Syncfusion AI" }
                    }
                }
            };
        }
    }
}
```

---

## Bind Conversations to SfAIAssistView

Set the root grid's `DataContext` in code-behind and bind the `Conversations` property to display the archived conversations in the navigation view. Set `ShowNavigationView` to `True` because the navigation view is hidden by default.

### MainWindow.xaml

```xaml
<Window
    x:Class="AIAssistViewHistoryWinUI.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:AIAssistViewHistoryWinUI"
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Chat">

    <Grid x:Name="RootGrid" Padding="20">
        <syncfusion:SfAIAssistView
            x:Name="aiAssistView"
            Messages="{Binding Chats}"
            CurrentUser="{Binding CurrentUser}"
            Conversations="{Binding Conversations}"
            ShowNavigationView="True" />
    </Grid>
</Window>
```

### MainWindow.xaml.cs

```csharp
using Microsoft.UI.Xaml;

namespace AIAssistViewHistoryWinUI
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            RootGrid.DataContext = new AIAssistViewModel();
        }
    }
}
```

Selecting a conversation from the history replaces the current messages with the messages stored in its `AssistItems` collection. The built-in New Chat option starts a new conversation while preserving existing conversations that contain user requests in the conversation history.

---

## NavigationHeader

The `NavigationHeader` property sets the header text shown at the top of the navigation view. Default value: **`string.Empty`**.

### XAML

```xaml
<syncfusion:SfAIAssistView x:Name="aiAssistView"
                           ShowNavigationView="True"
                           NavigationHeader="Sync AI Assist" />
```

### Code-Behind

```csharp
using Microsoft.UI.Xaml;

namespace AIAssistViewHistoryWinUI
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            aiAssistView.ShowNavigationView = true;
            aiAssistView.NavigationHeader = "Sync AI Assist";
        }
    }
}
```

Use this to brand the side panel (for example, "Sync AI Assist", "My Chats", or a product name).

---

## Built-in New Chat and Selection Behavior

The conversation history navigation view provides the following built-in interactions:

- **New Chat button:** Starts a new conversation. The current `Messages` collection is cleared and a new entry is created once the user sends a prompt.
- **Conversation selection:** Selecting an archived conversation replaces the current `Messages` with the `AssistItems` stored in that `AssistConversationItem`.
- **Hamburger button:** Collapses or expands the navigation view (visible only when `ShowNavigationView="True"`).

---

## Common Patterns

### 1. Add a Welcome Empty State

Combine `ShowNavigationView` with an `EmptyViewTemplate` so first-time users see a friendly prompt before starting their first chat. See [customization.md](customization.md) for the empty-state pattern.

**When to use:** New-user onboarding flows.

### 2. Filter Conversations by Date

Group or filter the `Conversations` collection by `DateTime` (today / yesterday / older) using a `CollectionViewSource` or by manually bucketing items.

**When to use:** Apps that need visual date grouping in the navigation view.

---

## Key Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ShowNavigationView` | `bool` | `false` | Shows or hides the conversation history navigation view. |
| `Conversations` | `ObservableCollection<AssistConversationItem>` | `null` | Data source for archived conversations. |
| `NavigationHeader` | `string` | `string.Empty` | Header text shown at the top of the navigation view. |

## Key Classes

| Class | Description |
|-------|-------------|
| `AssistConversationItem` | Represents a single archived conversation. Has `Title`, `DateTime`, and `AssistItems`. |
| `TextMessage` | Chat message carried inside `AssistItems` (also used for the live `Messages` collection). |
| `Author` | Identifies who sent a `TextMessage` (user or AI). |

---

## Implementation Tips

1. **Use ObservableCollection:** Bind `Conversations` as `ObservableCollection<AssistConversationItem>` so the navigation view updates automatically when items are added or removed.

2. **Populate AssistItems:** Always populate `AssistItems` on every `AssistConversationItem` you create. The control restores these messages when the user selects the conversation.

3. **Set DateTime:** Assign `DateTime` to each conversation so the navigation view can group items by today / yesterday / older.

4. **Combine with Empty State:** Use `EmptyViewTemplate` to display a welcome screen on the first launch when no conversations exist yet.

5. **Hamburger Behavior:** The hamburger button is rendered automatically when `ShowNavigationView="True"`. You do not need to wire it up manually.

6. **Brand the Panel:** Use `NavigationHeader` to give the side panel a clear identity ("Sync AI Assist", "My Chats", etc.).
