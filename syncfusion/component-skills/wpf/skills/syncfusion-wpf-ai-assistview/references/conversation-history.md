# Conversation History

## Table of Contents
- [Overview](#overview)
- [ShowNavigationView Property](#shownavigationview-property)
- [Conversations Property](#conversations-property)
- [Define the ViewModel](#define-the-viewmodel)
- [Bind Conversations to SfAIAssistView](#bind-conversations-to-sfaiassistview)
- [NavigationHeader](#navigationheader)
- [Built-In New Chat and Selection Behavior](#built-in-new-chat-and-selection-behavior)

---

## Overview

`SfAIAssistView` supports a built-in conversation history navigation view that lets users create new chats, preserve previous conversations, and switch between archived conversations. The history is rendered in a side navigation pane (collapsible via a built-in hamburger button), so the chat area and history are visible side-by-side.

This is useful for any AI assistant UI where the user is expected to have **multiple independent conversations** (e.g., a research assistant, customer support bot, or multi-topic chat).

---

## ShowNavigationView Property

The `ShowNavigationView` property controls the visibility of the conversation history navigation view. Default value: **`false`** (navigation view is hidden).

```xaml
<syncfusion:SfAIAssistView x:Name="aiAssistView"
                           ShowNavigationView="True" />
```

```csharp
using System.Windows;

namespace AIAssistViewHistoryWPF
{
    public partial class MainWindow : Window
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

---

## Define the ViewModel

Create a view model that exposes `Chats`, `CurrentUser`, and `Conversations`. Populate each `AssistConversationItem` with its associated messages so the history restores properly when a user selects a conversation.

```csharp
using System;
using System.Collections.ObjectModel;
using Syncfusion.UI.Xaml.Chat;

namespace AIAssistViewHistoryWPF
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

**`AssistConversationItem` key properties:**

| Property | Type | Description |
|---|---|---|
| `Title` | `string` | Display title of the conversation in the navigation view |
| `DateTime` | `DateTime` | Timestamp shown in the navigation view (used to group by today / yesterday / earlier) |
| `AssistItems` | `ObservableCollection<object>` | Messages belonging to this conversation (`TextMessage`, `AIMessage`, etc.) |

---

## Bind Conversations to SfAIAssistView

Set the window's `DataContext` to the view model and bind `Conversations`. Set `ShowNavigationView` to `True` so the navigation pane is visible.

```xaml
<Window
    x:Class="AIAssistViewHistoryWPF.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="clr-namespace:AIAssistViewHistoryWPF"
    xmlns:syncfusion="clr-namespace:Syncfusion.UI.Xaml.Chat;assembly=Syncfusion.SfChat.Wpf"
    Width="1000"
    Height="700">

    <Window.DataContext>
        <local:AIAssistViewModel />
    </Window.DataContext>

    <Grid Margin="20">
        <syncfusion:SfAIAssistView
            x:Name="aiAssistView"
            Messages="{Binding Chats}"
            CurrentUser="{Binding CurrentUser}"
            Conversations="{Binding Conversations}"
            ShowNavigationView="True" />
    </Grid>
</Window>
```

---

## NavigationHeader

The `NavigationHeader` property sets the header text displayed at the top of the navigation view. Default value: **`string.Empty`**.

```xaml
<syncfusion:SfAIAssistView x:Name="aiAssistView"
                           ShowNavigationView="True"
                           NavigationHeader="Sync AI Assist" />
```

```csharp
aiAssistView.ShowNavigationView = true;
aiAssistView.NavigationHeader = "Sync AI Assist";
```

---

## Built-In New Chat and Selection Behavior

`SfAIAssistView` provides built-in UX for the conversation history that requires no extra code:

- **Selecting a conversation** from the history replaces the currently-displayed `Messages` with the messages stored in that item's `AssistItems` collection.
- **Built-in New Chat option** starts a new conversation. Existing conversations that contain at least one user request are preserved in the navigation history.

---

## Gotchas

- **`ShowNavigationView` must be `True`** — without it, `Conversations` is loaded but the navigation pane is hidden.
- **`AssistItems` must be `ObservableCollection<object>`** — same rule as the top-level `Messages` collection, since conversations hold mixed message types.
- **Per-conversation `DateTime` drives grouping** — set realistic timestamps so the navigation view can order/group items (today / yesterday / earlier).
- **New conversations are added automatically** — the control appends a new `AssistConversationItem` to `Conversations` when a new chat begins and the user sends a message; no manual plumbing is required for the common flow.
