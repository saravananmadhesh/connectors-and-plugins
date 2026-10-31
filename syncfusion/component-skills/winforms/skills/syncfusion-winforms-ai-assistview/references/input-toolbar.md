# Input Toolbar in AI AssistView

## Table of Contents
- [Overview](#overview)
- [Enabling the Input Toolbar](#enabling-the-input-toolbar)
- [Input Toolbar Items](#input-toolbar-items)
- [Handling Toolbar Item Clicks](#handling-toolbar-item-clicks)
- [Action Buttons](#action-buttons)
- [Attachments](#attachments)
- [Toast Notifications](#toast-notifications)
- [Helper Methods](#helper-methods)
- [Troubleshooting](#troubleshooting)

## Overview

The SfAIAssistView control includes an Input Toolbar that exposes quick-action buttons beside the prompt editor. These buttons let users attach files, upload images, record audio, and invoke any custom action before a prompt is sent. The toolbar pairs with the Attachments collection so selected media, status, and feedback appear in the same input area.

## Enabling the Input Toolbar

By default, the Input Toolbar is not displayed. Set the `IsInputToolbarVisible` property to `true`:

```csharp
SfAIAssistView sfaiAssistView1 = new SfAIAssistView();
sfaiAssistView1.Dock = DockStyle.Fill;
this.Controls.Add(sfaiAssistView1);

sfaiAssistView1.DataBindings.Add("Messages", viewModel, "Chats", 
    true, DataSourceUpdateMode.OnPropertyChanged);

// Enable the Input Toolbar
sfaiAssistView1.IsInputToolbarVisible = true;
```

The toolbar renders next to the prompt editor when `IsInputToolbarVisible` is `true`.

## Input Toolbar Items

The `InputToolbarItems` collection defines the buttons that appear on the toolbar. Each `InputToolbarItem` supports:

| Property | Description |
|----------|-------------|
| `Name` | Unique identifier for recognizing the item in the `InputToolbarItemClicked` event handler |
| `Text` | Glyph or short text rendered inside the button (emoji shortcodes like 📎 or Unicode escapes `\U0001F4CE` are supported) |
| `ToolTip` | Tooltip text shown when the user hovers over the button |
| `IsVisible` | Controls whether the button is rendered on the toolbar |

### Adding Toolbar Items

```csharp
private void SetupInputToolbar()
{
    sfaiAssistView1.InputToolbarItems = new ObservableCollection<InputToolbarItem>
    {
        new InputToolbarItem
        {
            Name = "Attach",
            ToolTip = "Attach File",
            Text = "\U0001F4CE",
            IsVisible = true
        },
        new InputToolbarItem
        {
            Name = "ImageUpload",
            ToolTip = "Upload Image",
            Text = "\U0001F4CA",
            IsVisible = true
        },
        new InputToolbarItem
        {
            Name = "VoiceInput",
            ToolTip = "Record Audio",
            Text = "\U0001F3A4",
            IsVisible = true
        }
    };
}
```

## Handling Toolbar Item Clicks

The `InputToolbarItemClicked` event is raised whenever a toolbar button is tapped. Use the `InputToolbarItemClickedEventArgs.ToolbarItem.Name` property to dispatch the action:

```csharp
sfaiAssistView1.InputToolbarItemClicked += OnInputToolbarItemClicked;

private void OnInputToolbarItemClicked(object sender, InputToolbarItemClickedEventArgs args)
{
    var item = args.ToolbarItem;

    switch (item.Name)
    {
        case "Attach":
            HandleAttachFile();
            break;

        case "ImageUpload":
            // HandleImageUpload();
            break;

        case "VoiceInput":
            // HandleVoiceInput();
            break;
    }
}
```

## Action Buttons

When a toolbar item should expose a popup of secondary actions, define an `ActionButtons` collection on the input area. Each `ActionButton` provides:

| Property | Description |
|----------|-------------|
| `Name` | Unique identifier for dispatching in the event handler |
| `Text` | Display text for the action button |

### Defining Action Buttons

```csharp
sfaiAssistView1.ActionButtons = new ObservableCollection<ActionButton>
{
    new ActionButton
    {
        Name = "UploadFile",
        Text = "📤 Upload File",
    },
    new ActionButton
    {
        Name = "SearchWeb",
        Text = "🌐 Search Web",
    },
    new ActionButton
    {
        Name = "UploadVideo",
        Text = "🎥 Upload Video",
    }
};
```

### Handling Action Button Clicks

The `ActionButtonClicked` event is raised when the user picks an option from the popup:

```csharp
sfaiAssistView1.ActionButtonClicked += OnActionButtonClicked;

private void OnActionButtonClicked(object sender, ActionButtonClickedEventArgs args)
{
    var button = args.ActionButton;

    switch (button.Name)
    {
        case "UploadFile":
            HandleAttachFile();
            break;

        case "SearchWeb":
            // HandleSearchWebFromPopup();
            break;

        case "UploadVideo":
            // HandleUploadVideoFromPopup();
            break; 
    }
}
```

## Attachments

The `Attachments` collection is the recommended container for files chosen through the toolbar. Bound to the input area, it automatically displays each attachment as a card while the user drafts a prompt. The collection can be cleared once the prompt is sent.

### AttachmentItem Properties

| Property | Description |
|----------|-------------|
| `FileName` | Display name shown on the attachment card |
| `FileSize` | Pre-formatted size label, e.g. "2.45 MB" |
| `FileIcon` | Optional large icon or thumbnail used in the card |
| `FilePreviewIcon` | Optional preview thumbnail; falls back to `FileIcon` when not set |
| `FileExtension` | The extension of the attached file (e.g. ".pdf") |
| `FilePath` | Full local path used to reference the attached file |
| `FileContent` | Optional raw bytes for lazy loading or upload workflows |

### End-to-End Attachment Flow

```csharp
private void HandleAttachFile()
{
    using (var openFileDialog = new OpenFileDialog())
    {
        openFileDialog.Title = "Select a file to attach";
        openFileDialog.Filter = "All Files|*.*";
        
        if (openFileDialog.ShowDialog() == DialogResult.OK)
        {
            var fileInfo = new FileInfo(openFileDialog.FileName);
            
            // Validate file size (limit to 10 MB)
            if (fileInfo.Length > 10 * 1024 * 1024)
            {
                MessageBox.Show("File size exceeds the 10 MB limit.", 
                    "File Too Large", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }
            
            var attachment = new AttachmentItem
            {
                FileName = fileInfo.Name,
                FileSize = $"{fileInfo.Length / 1024.0 / 1024.0:F2} MB",
                FilePath = openFileDialog.FileName,
                FileExtension = fileInfo.Extension
            };
            
            sfaiAssistView1.Attachments.Add(attachment);
        }
    }
}

// Clear attachments after the prompt is sent
sfaiAssistView1.PromptRequest += (sender, e) =>
{
    // Process the attachments with the prompt
    foreach (AttachmentItem att in sfaiAssistView1.Attachments)
    {
        // Process each attachment
    }
    
    // Clear attachments after processing
    sfaiAssistView1.Attachments.Clear();
};
```

## Toast Notifications

Use toast notifications to confirm upload outcomes or surface validation errors (for example, file size limits) while toolbar actions run. Show a toast with `ShowNotification` and a `ToastOptions` object:

| Property | Description |
|----------|-------------|
| `Severity` | `ToastSeverity` value: Info, Success, Warning, or Error |
| `Message` | Text rendered in the toast |

```csharp
private void ShowToastOptions(ToastSeverity status, string message)
{
    sfaiAssistView1.ShowNotification(new ToastOptions
    {
        Severity = status,
        Message = message
    });
}

// Usage: reject files larger than 10 MB
if (fi.Length > 10 * 1024 * 1024)
{
    ShowToastOptions(ToastSeverity.Error, $"File size exceeds 10 MB limit. ({FormatFileSize(fi.Length)})");
    return;
}
ShowToastOptions(ToastSeverity.Success, "Uploaded successfully.");
```

## Helper Methods

Helpers for file size display and file-type icon extraction:

```csharp
private static string FormatFileSize(long bytes)
{
    const long KB = 1024;
    const long MB = KB * 1024;
    const long GB = MB * 1024;

    if (bytes >= GB) return $"{bytes / (double)GB:F2} GB";
    if (bytes >= MB) return $"{bytes / (double)MB:F2} MB";
    if (bytes >= KB) return $"{bytes / (double)KB:F2} KB";
    return $"{bytes} B";
}

private Image GetFileIcon(string filePath)
{
    try
    {
        var icon = Icon.ExtractAssociatedIcon(filePath);
        return icon?.ToBitmap();
    }
    catch
    {
        return null;
    }
}
```

## Troubleshooting

| Issue | Possible Cause | Resolution |
|-------|----------------|------------|
| Toolbar items not visible | `IsInputToolbarVisible` is not set to `true` | Set `sfaiAssistView1.IsInputToolbarVisible = true` after creating the control |
| `InputToolbarItemClicked` event not firing | Event handler not subscribed | Subscribe to the event with `+=` after creating the control |
| Action button popup not appearing | `ActionButtons` collection is empty or not set | Ensure `ActionButtons` is initialized with at least one `ActionButton` |
| Attachments not showing on the input area | `Attachments` is not an `ObservableCollection` | The `Attachments` property is of type `ObservableCollection<AttachmentItem>` and should be mutated in place |
| Unicode emoji not rendering correctly | Font or encoding issue | Use Unicode escape sequences (e.g., `\U0001F4CE`) rather than direct emoji characters |