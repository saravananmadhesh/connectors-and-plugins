# Response Toolbar in WinUI AI AssistView

## Table of Contents
- [Overview](#overview)
- [Built-in Toolbar Items](#built-in-toolbar-items)
- [ResponseToolbarItem Class](#responsetoolbaritem-class)
- [Customizing Toolbar Items](#customizing-toolbar-items)
- [Response Toolbar Visibility](#response-toolbar-visibility)
- [Handling Toolbar Item Clicks](#handling-toolbar-item-clicks)
- [Common Patterns](#common-patterns)

## Overview

The Response Toolbar feature provides built-in options for each AI chat response, including **Copy**, **Regenerate**, **Like**, and **Dislike**. These toolbar items enhance user interactions by providing quick actions. You can also add custom toolbar items to suit specific application needs.

The toolbar appears below each AI response message (messages from authors other than CurrentUser).

## Built-in Toolbar Items

By default, the response toolbar includes four items:

| Item | Icon | Description | Use Case |
|------|------|-------------|----------|
| **Copy** | 📋 | Copy response text to clipboard | Allow users to copy AI responses |
| **Regenerate** | 🔄 | Request a new AI response | Let users get alternative answers |
| **Like** | 👍 | Mark response as helpful | Collect positive feedback |
| **Dislike** | 👎 | Mark response as unhelpful | Collect negative feedback |

**Basic usage (built-in items work automatically):**

```xaml
<syncfusion:SfAIAssistView 
    x:Name="aiAssistView"
    CurrentUser="{Binding CurrentUser}"
    Messages="{Binding Chats}"/>
```

Built-in items are functional by default without any additional code.

## ResponseToolbarItem Class

The `ResponseToolbarItem` class defines toolbar items in the response toolbar.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `Index` | int | Auto | Internal order/position of the toolbar item |
| `ItemType` | ResponseToolbarItemType | Custom | Type of toolbar item (Copy, Regenerate, Like, Dislike, or Custom) |
| `IsEnabled` | bool | true | Whether the item is interactive |
| `Visible` | bool | true | Whether the item is visible |
| `Tooltip` | string | null | Tooltip text on hover |
| `ItemTemplate` | DataTemplate | null | Custom template for rendering the item |

### ResponseToolbarItemType Enum

```csharp
public enum ResponseToolbarItemType
{
    Copy,
    Regenerate,
    Like,
    Dislike,
    Custom
}
```

## Customizing Toolbar Items

### Adding Custom Toolbar Items

Add custom toolbar items using the `ResponseToolbarItems` collection:

```xaml
<syncfusion:SfAIAssistView 
    x:Name="aiAssistView"
    CurrentUser="{Binding CurrentUser}"
    Messages="{Binding Chats}">
    <syncfusion:SfAIAssistView.ResponseToolbarItems>
        <!-- Custom item: Export -->
        <syncfusion:ResponseToolbarItem 
            ItemType="Custom" 
            Tooltip="Export response">
            <syncfusion:ResponseToolbarItem.ItemTemplate>
                <DataTemplate>
                    <Button Padding="5,2" Background="Transparent" BorderThickness="0">
                        <StackPanel Orientation="Horizontal">
                            <SymbolIcon Symbol="Save"/>
                            <TextBlock Text="Export" Margin="5,0,0,0"/>
                        </StackPanel>
                    </Button>
                </DataTemplate>
            </syncfusion:ResponseToolbarItem.ItemTemplate>
        </syncfusion:ResponseToolbarItem>
    </syncfusion:SfAIAssistView.ResponseToolbarItems>
</syncfusion:SfAIAssistView>
```

### Customizing Built-in Item Appearance

Override the template of built-in items:

```xaml
<syncfusion:SfAIAssistView.ResponseToolbarItems>
    <!-- Customize Copy button -->
    <syncfusion:ResponseToolbarItem ItemType="Copy" Tooltip="Copy to clipboard">
        <syncfusion:ResponseToolbarItem.ItemTemplate>
            <DataTemplate>
                <Button ToolTipService.ToolTip="Copy to clipboard"
                        Padding="5,2"
                        Background="Transparent"
                        BorderThickness="0">
                    <StackPanel Orientation="Horizontal" VerticalAlignment="Center">
                        <Path Width="16" Height="16" Fill="Black" Stretch="Uniform"
                            Data="M3,1 L10,1 C10.55,1 11,1.45 11,2 L11,3 L12,3 C12.55,3 13,3.45 13,4 L13,14 C13,14.55 12.55,15 12,15 L4,15 C3.45,15 3,14.55 3,14 L3,4 C3,3.45 3.45,3 4,3 L5,3 L5,2 C5,1.45 5.45,1 6,1 Z M5,3 L9,3 L9,2 L5,2 Z M4,5 L12,5 L12,14 L4,14 Z"/>
                        <TextBlock Text="Copy" Margin="6,0,0,0" VerticalAlignment="Center"/>
                    </StackPanel>
                </Button>
            </DataTemplate>
        </syncfusion:ResponseToolbarItem.ItemTemplate>
    </syncfusion:ResponseToolbarItem>
</syncfusion:SfAIAssistView.ResponseToolbarItems>
```

### Multiple Custom Items

```xaml
<syncfusion:SfAIAssistView.ResponseToolbarItems>
    <!-- Export button -->
    <syncfusion:ResponseToolbarItem ItemType="Custom" Tooltip="Export">
        <syncfusion:ResponseToolbarItem.ItemTemplate>
            <DataTemplate>
                <Button Content="📥 Export" Background="Transparent"/>
            </DataTemplate>
        </syncfusion:ResponseToolbarItem.ItemTemplate>
    </syncfusion:ResponseToolbarItem>
    
    <!-- Share button -->
    <syncfusion:ResponseToolbarItem ItemType="Custom" Tooltip="Share">
        <syncfusion:ResponseToolbarItem.ItemTemplate>
            <DataTemplate>
                <Button Content="🔗 Share" Background="Transparent"/>
            </DataTemplate>
        </syncfusion:ResponseToolbarItem.ItemTemplate>
    </syncfusion:ResponseToolbarItem>
    
    <!-- Translate button -->
    <syncfusion:ResponseToolbarItem ItemType="Custom" Tooltip="Translate">
        <syncfusion:ResponseToolbarItem.ItemTemplate>
            <DataTemplate>
                <Button Content="🌐 Translate" Background="Transparent"/>
            </DataTemplate>
        </syncfusion:ResponseToolbarItem.ItemTemplate>
    </syncfusion:ResponseToolbarItem>
</syncfusion:SfAIAssistView.ResponseToolbarItems>
```

## Response Toolbar Visibility

Control toolbar visibility with the `IsResponseToolbarVisible` property:

```xaml
<!-- Hide response toolbar -->
<syncfusion:SfAIAssistView 
    CurrentUser="{Binding CurrentUser}"
    Messages="{Binding Chats}"
    IsResponseToolbarVisible="False"/>
```

```csharp
// Toggle toolbar visibility
aiAssistView.IsResponseToolbarVisible = false;
```

**When to hide:**
- Read-only chat views
- Print/export modes
- Simplified UI requirements

## Handling Toolbar Item Clicks

Use the `ResponseToolbarItemClicked` event to handle item clicks:

```xaml
<syncfusion:SfAIAssistView 
    x:Name="aiAssistView"
    CurrentUser="{Binding CurrentUser}"
    Messages="{Binding Chats}"
    ResponseToolbarItemClicked="AiAssistView_ResponseToolbarItemClicked"/>
```

```csharp
private void AiAssistView_ResponseToolbarItemClicked(object sender, ResponseToolbarItemClickedEventArgs e)
{
    var item = e.Item;
    var message = e.Message as TextMessage;

    switch (item.ItemType)
    {
        case ResponseToolbarItemType.Copy:
            CopyResponseToClipboard(message.Text);
            break;

        case ResponseToolbarItemType.Regenerate:
            RegenerateAIResponse(message);
            break;

        case ResponseToolbarItemType.Like:
            SendFeedbackToServer("like", message.Text);
            ShowNotification("Thank you for your feedback!");
            break;

        case ResponseToolbarItemType.Dislike:
            SendFeedbackToServer("dislike", message.Text);
            ShowFeedbackDialog(message);
            break;

        case ResponseToolbarItemType.Custom:
            HandleCustomAction(item, message);
            break;
    }
}
```

### Copy Implementation

```csharp
private void CopyResponseToClipboard(string text)
{
    var dataPackage = new DataPackage();
    dataPackage.SetText(text);
    Clipboard.SetContent(dataPackage);
    
    ShowNotification("Copied to clipboard!");
}
```

### Regenerate Implementation

```csharp
private async void RegenerateAIResponse(TextMessage originalMessage)
{
    // Find the original prompt (previous user message)
    int messageIndex = Chats.IndexOf(originalMessage);
    TextMessage userPrompt = null;
    
    for (int i = messageIndex - 1; i >= 0; i--)
    {
        if (Chats[i] is TextMessage msg && msg.Author == CurrentUser)
        {
            userPrompt = msg;
            break;
        }
    }
    
    if (userPrompt == null) return;
    
    // Remove the old AI response
    Chats.Remove(originalMessage);
    
    // Show typing indicator
    IsProcessing = true;
    
    // Get new AI response
    string newResponse = await CallAIService(userPrompt.Text);
    
    // Hide typing indicator
    IsProcessing = false;
    
    // Add new response
    Chats.Add(new TextMessage
    {
        Author = new Author { Name = "AI" },
        Text = newResponse,
        DateTime = DateTime.Now
    });
}
```

### Like/Dislike Implementation

```csharp
private void SendFeedbackToServer(string feedbackType, string messageText)
{
    // Log feedback to analytics
    Analytics.TrackEvent("AI Response Feedback", new Dictionary<string, string>
    {
        ["FeedbackType"] = feedbackType,
        ["MessageLength"] = messageText.Length.ToString(),
        ["Timestamp"] = DateTime.Now.ToString()
    });
    
    // Send to backend
    _ = PostFeedbackAsync(new FeedbackData
    {
        Type = feedbackType,
        MessageText = messageText,
        Timestamp = DateTime.Now
    });
}

private async void ShowFeedbackDialog(TextMessage message)
{
    var dialog = new ContentDialog
    {
        Title = "Help us improve",
        Content = "What could be better about this response?",
        PrimaryButtonText = "Submit",
        CloseButtonText = "Cancel",
        DefaultButton = ContentDialogButton.Primary
    };
    
    var textBox = new TextBox
    {
        PlaceholderText = "Optional feedback...",
        Height = 100,
        AcceptsReturn = true
    };
    
    dialog.Content = textBox;
    
    var result = await dialog.ShowAsync();
    
    if (result == ContentDialogResult.Primary && !string.IsNullOrWhiteSpace(textBox.Text))
    {
        await PostDetailedFeedbackAsync(message.Text, textBox.Text);
    }
}
```

### Custom Action Implementation

```csharp
private async void HandleCustomAction(ResponseToolbarItem item, TextMessage message)
{
    if (item.Tooltip == "Export")
    {
        await ExportResponse(message);
    }
    else if (item.Tooltip == "Share")
    {
        await ShareResponse(message);
    }
    else if (item.Tooltip == "Translate")
    {
        await TranslateResponse(message);
    }
}

private async Task ExportResponse(TextMessage message)
{
    var savePicker = new FileSavePicker();
    savePicker.SuggestedStartLocation = PickerLocationId.DocumentsLibrary;
    savePicker.FileTypeChoices.Add("Text Document", new List<string> { ".txt" });
    savePicker.SuggestedFileName = $"AI_Response_{DateTime.Now:yyyyMMdd_HHmmss}";
    
    var file = await savePicker.PickSaveFileAsync();
    
    if (file != null)
    {
        await FileIO.WriteTextAsync(file, message.Text);
        ShowNotification("Response exported successfully!");
    }
}
```

## Common Patterns

### Pattern 1: Basic Toolbar with Click Handling

```xaml
<syncfusion:SfAIAssistView 
    ResponseToolbarItemClicked="HandleToolbarClick"/>
```

```csharp
private void HandleToolbarClick(object sender, ResponseToolbarItemClickedEventArgs e)
{
    var message = e.Message as TextMessage;
    
    switch (e.Item.ItemType)
    {
        case ResponseToolbarItemType.Copy:
            Clipboard.SetText(message.Text);
            break;
        case ResponseToolbarItemType.Regenerate:
            RegenerateResponse(message);
            break;
    }
}
```

### Pattern 2: Toolbar with Analytics

```csharp
private void TrackToolbarUsage(object sender, ResponseToolbarItemClickedEventArgs e)
{
    Analytics.TrackEvent("ResponseToolbar", new Dictionary<string, string>
    {
        ["Action"] = e.Item.ItemType.ToString(),
        ["MessageLength"] = (e.Message as TextMessage)?.Text.Length.ToString() ?? "0"
    });
    
    // Continue with actual handling
    HandleToolbarAction(e);
}
```

### Pattern 3: Conditional Toolbar Items

```csharp
private void UpdateToolbarBasedOnContext()
{
    var toolbarItems = new ObservableCollection<ResponseToolbarItem>();
    
    // Always add Copy
    toolbarItems.Add(new ResponseToolbarItem { ItemType = ResponseToolbarItemType.Copy });
    
    // Add Regenerate only for AI responses
    toolbarItems.Add(new ResponseToolbarItem { ItemType = ResponseToolbarItemType.Regenerate });
    
    // Add Like/Dislike only if feedback is enabled
    if (IsFeedbackEnabled)
    {
        toolbarItems.Add(new ResponseToolbarItem { ItemType = ResponseToolbarItemType.Like });
        toolbarItems.Add(new ResponseToolbarItem { ItemType = ResponseToolbarItemType.Dislike });
    }
    
    // Add custom export for premium users
    if (IsPremiumUser)
    {
        toolbarItems.Add(new ResponseToolbarItem
        {
            ItemType = ResponseToolbarItemType.Custom,
            Tooltip = "Export",
            ItemTemplate = CreateExportTemplate()
        });
    }
    
    // Note: Setting toolbar items dynamically may require accessing the control directly
}
```

### Pattern 4: Disabled Items Based on State

```xaml
<syncfusion:SfAIAssistView.ResponseToolbarItems>
    <syncfusion:ResponseToolbarItem 
        ItemType="Regenerate" 
        IsEnabled="{Binding CanRegenerate}"/>
    
    <syncfusion:ResponseToolbarItem 
        ItemType="Copy" 
        IsEnabled="True"/>
</syncfusion:SfAIAssistView.ResponseToolbarItems>
```

## Best Practices

1. **Keep It Simple:** Don't add too many toolbar items. 3-5 items maximum for usability.

2. **Clear Icons:** Use recognizable icons with tooltips for custom items.

3. **Handle Gracefully:** Always handle toolbar click events to provide feedback or perform actions.

4. **Feedback Collection:** Use Like/Dislike for continuous improvement of AI responses.

5. **Analytics:** Track toolbar item usage to understand user behavior.

6. **Accessibility:** Ensure custom toolbar items have proper tooltips and keyboard navigation.

7. **Performance:** Keep toolbar click handlers lightweight; use async for long operations.

8. **User Expectations:** Copy should copy, Regenerate should regenerate. Don't repurpose built-in items.

## Troubleshooting

### Toolbar Not Showing
- Check `IsResponseToolbarVisible` is true (default)
- Verify messages are from AI (not CurrentUser)
- Ensure control is properly initialized

### Custom Items Not Appearing
- Verify `ResponseToolbarItems` collection is set
- Check ItemTemplate is defined
- Ensure Visible property is true

### Click Events Not Firing
- Verify `ResponseToolbarItemClicked` event is wired up
- Check that buttons in ItemTemplate don't have their own click handlers that stop propagation
- Ensure items are enabled (IsEnabled = true)

### Copy Not Working
- Built-in copy works automatically on WinUI 3
- For custom implementation, use DataPackage and Clipboard APIs
- Ensure app has clipboard permissions
