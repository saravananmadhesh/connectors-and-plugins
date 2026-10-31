# Response Toolbar in AI AssistView

## Table of Contents
- [Overview](#overview)
- [Enabling the Response Toolbar](#enabling-the-response-toolbar)
- [Response Toolbar Items](#response-toolbar-items)
- [Handling Item Clicks](#handling-item-clicks)
- [Per-Message Visibility Control](#per-message-visibility-control)
- [Hiding Regenerate on Old Messages](#hiding-regenerate-on-old-messages)
- [Troubleshooting](#troubleshooting)

## Overview

The SfAIAssistView control includes a Response Toolbar feature that allows users to perform actions on bot responses by clicking action buttons. This provides an interactive way for users to engage with AI responses through copy, regenerate, like, and other custom actions.

## Enabling the Response Toolbar

By default, the Response Toolbar is not displayed. Set `IsResponseToolBarVisible` to `true`:

```csharp
SfAIAssistView sfAIAssistView1 = new SfAIAssistView();
sfAIAssistView1.IsResponseToolBarVisible = true;
```

## Response Toolbar Items

The Response Toolbar supports the following action button types:

| Item Type | Default Behavior |
|-----------|------------------|
| `Copy` | Copies the bot response text to the clipboard |
| `Regenerate` | Regenerates the response for the same prompt |
| `Like` | Marks the response as helpful/liked |
| `Dislike` | Marks the response as not helpful |
| `Custom` | User-defined custom actions |

### Configuring Toolbar Items

Set custom toolbar items on the control to replace the default set:

```csharp
sfAIAssistView1.ResponseToolBarItems = new ObservableCollection<ResponseToolBarItem>
{
    new ResponseToolBarItem { ItemType = ResponseToolBarItemType.Copy,      Name = "Copy" },
    new ResponseToolBarItem { ItemType = ResponseToolBarItemType.Regenerate, Name = "Regenerate" },
    new ResponseToolBarItem { ItemType = ResponseToolBarItemType.Like,       Name = "Like" }
};
```

> **Note:** Setting `ResponseToolBarItems` replaces the default toolbar items. Include all desired items in the collection.

## Handling Item Clicks

The `ResponseToolBarItemClicked` event is triggered when a user clicks any toolbar action button:

### Event Args

`ResponseToolBarItemClickedEventArgs` exposes:
- `ChatItem` — the `TextMessage` (or other `IChatItem`) being acted upon
- `ToolBarItem` — the clicked `ResponseToolBarItem` with `ItemType`, `Name`, etc.

### Event Handler Example

```csharp
sfAIAssistView1.ResponseToolBarItemClicked += sfAIAssistView1_ResponseToolBarItemClicked;

private void sfAIAssistView1_ResponseToolBarItemClicked(
    object sender,
    ResponseToolBarItemClickedEventArgs e)
{
    if (e.ToolBarItem?.ItemType == ResponseToolBarItemType.Copy)
    {
        Clipboard.SetText(e.ChatItem?.Text);
        MessageBox.Show("Message copied to clipboard.");
    }
    else if (e.ToolBarItem?.ItemType == ResponseToolBarItemType.Regenerate)
    {
        MessageBox.Show("Regenerating response.");
        // Handle regeneration logic
    }
    else if (e.ToolBarItem?.ItemType == ResponseToolBarItemType.Like)
    {
        MessageBox.Show("Response marked as helpful.");
    }
}
```

## Per-Message Visibility Control

You can control the visibility of the entire toolbar or individual toolbar items on a per-message basis.

### Controlling Toolbar Visibility

```csharp
var messagesList = sfAIAssistView1.Messages as IList;
if (messagesList != null && messagesList.Count > 0)
{
    // The Response Toolbar is typically rendered on bot messages;
    // adjust the index to target the specific message you need.
    var message = messagesList[1] as TextMessage;
    
    // Hide the entire toolbar for a specific message
    sfAIAssistView1.SetToolBarVisibility(message, false);

    // Show the toolbar for a specific message
    sfAIAssistView1.SetToolBarVisibility(message, true);

    // Hide a specific toolbar item for a message (by enum)
    sfAIAssistView1.SetToolBarItemVisibility(
        message,
        ResponseToolBarItemType.Regenerate.ToString(),
        false);

    // Hide toolbar item by name
    sfAIAssistView1.SetToolBarItemVisibility(message, "Copy", false);
}
```

### Getting Toolbar Items

Retrieve toolbar items from a specific message:

```csharp
ResponseToolBarItem copyButton = sfAIAssistView1.GetToolBarItem(
    message,
    ResponseToolBarItemType.Copy.ToString());

if (copyButton != null)
{
    string itemName = copyButton.Name;
    // Use other properties on copyButton as needed
}
```

`GetToolBarItem` returns `null` when no matching item exists for the given message.

## Hiding Regenerate on Old Messages

Hide the `Regenerate` toolbar item on every bot message except the most recent one:

```csharp
private void UpdateToolbarForLatestMessage()
{
    var messages = (sfAIAssistView1.Messages as IList)?
        .Cast<TextMessage>().ToList();

    if (messages == null) return;

    var botMessages = messages
        .Where(m => m.Author?.Name == "Bot")
        .ToList();

    var latestMessage = botMessages.LastOrDefault();
    if (latestMessage == null) return;

    // Hide Regenerate on all old bot messages
    foreach (var oldMessage in botMessages.Where(m => m != latestMessage))
    {
        sfAIAssistView1.SetToolBarItemVisibility(
            oldMessage,
            ResponseToolBarItemType.Regenerate.ToString(),
            false);
    }
}
```

Call `UpdateToolbarForLatestMessage` whenever a new bot response is added (for example, in the `Chats_CollectionChanged` handler used in the OpenAI integration).

## Troubleshooting

| Issue | Possible Cause | Resolution |
|-------|----------------|------------|
| `e.ToolBarItem` is `null` | The clicked item is not a known toolbar item, or the default items have been replaced | Null-check `e.ToolBarItem` and ensure the item is registered in `ResponseToolBarItems` |
| `GetToolBarItem` returns `null` | The message has no toolbar (e.g., user message) or the item name does not match | Ensure the message is a bot response with the toolbar visible, and verify the item name |
| `messagesList[1]` throws `ArgumentOutOfRangeException` | The `Messages` collection has fewer than 2 items | Guard the index with a length check before accessing the collection |
| Toolbar not visible on bot messages | `IsResponseToolBarVisible` is `false` or the control is not configured | Set `IsResponseToolBarVisible = true` and ensure messages are added as `TextMessage` with a bot `Author` |