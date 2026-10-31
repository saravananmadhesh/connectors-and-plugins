# Input Toolbar in WinUI AI AssistView

## Table of Contents
- [Overview](#overview)
- [InputToolbarItem Class](#inputtoolbaritem-class)
- [Adding Input Toolbar Items](#adding-input-toolbar-items)
- [Input Toolbar Position](#input-toolbar-position)
- [Input Toolbar Visibility](#input-toolbar-visibility)
- [Input Toolbar Header Template](#input-toolbar-header-template)
- [Handling Toolbar Item Clicks](#handling-toolbar-item-clicks)
- [Common Patterns](#common-patterns)

## Overview

The Input Toolbar feature allows you to add custom toolbar items directly within the text input area of the AI AssistView. This provides quick access to frequently used actions such as file uploads, voice input, emoji pickers, or formatting tools.

**Note:** Unlike the response toolbar (which has built-in items like Copy, Regenerate, Like, Dislike), the input toolbar does NOT include built-in items by default. You must add custom items using the `InputToolbarItem` class.

## InputToolbarItem Class

The `InputToolbarItem` class defines toolbar items in the input area.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `IsEnabled` | bool | true | Whether the item is interactive |
| `Visible` | bool | true | Whether the item is visible |
| `Tooltip` | string | null | Tooltip text on hover |
| `ItemTemplate` | DataTemplate | null | Template for rendering the toolbar item |

## Adding Input Toolbar Items

Add custom toolbar items using `InputToolbarItems` collection and `ItemTemplate`:

```xaml
<syncfusion:SfAIAssistView 
    x:Name="aiAssistView"
    CurrentUser="{Binding CurrentUser}"
    Messages="{Binding Chats}"
    IsInputToolbarVisible="True">
    <syncfusion:SfAIAssistView.InputToolbarItems>
        <!-- Attach File button -->
        <syncfusion:InputToolbarItem Tooltip="Attach file">
            <syncfusion:InputToolbarItem.ItemTemplate>
                <DataTemplate>
                    <Button Height="24" Width="30" Padding="3" Background="Transparent">
                        <SymbolIcon Symbol="Attach"/>
                    </Button>
                </DataTemplate>
            </syncfusion:InputToolbarItem.ItemTemplate>
        </syncfusion:InputToolbarItem>
    </syncfusion:SfAIAssistView.InputToolbarItems>
</syncfusion:SfAIAssistView>
```

### Multiple Toolbar Items

```xaml
<syncfusion:SfAIAssistView.InputToolbarItems>
    <!-- Attach File -->
    <syncfusion:InputToolbarItem Tooltip="Attach file">
        <syncfusion:InputToolbarItem.ItemTemplate>
            <DataTemplate>
                <Button Background="Transparent" Padding="5">
                    <SymbolIcon Symbol="Attach"/>
                </Button>
            </DataTemplate>
        </syncfusion:InputToolbarItem.ItemTemplate>
    </syncfusion:InputToolbarItem>
    
    <!-- Voice Input -->
    <syncfusion:InputToolbarItem Tooltip="Voice input">
        <syncfusion:InputToolbarItem.ItemTemplate>
            <DataTemplate>
                <Button Background="Transparent" Padding="5">
                    <SymbolIcon Symbol="Microphone"/>
                </Button>
            </DataTemplate>
        </syncfusion:InputToolbarItem.ItemTemplate>
    </syncfusion:InputToolbarItem>
    
    <!-- Emoji Picker -->
    <syncfusion:InputToolbarItem Tooltip="Add emoji">
        <syncfusion:InputToolbarItem.ItemTemplate>
            <DataTemplate>
                <Button Background="Transparent" Padding="5">
                    <FontIcon Glyph="😊"/>
                </Button>
            </DataTemplate>
        </syncfusion:InputToolbarItem.ItemTemplate>
    </syncfusion:InputToolbarItem>
</syncfusion:SfAIAssistView.InputToolbarItems>
```

### Custom Icon Using Path

```xaml
<syncfusion:InputToolbarItem Tooltip="Format text">
    <syncfusion:InputToolbarItem.ItemTemplate>
        <DataTemplate>
            <Button Height="24" Width="30" Padding="3" Background="Transparent">
                <Viewbox>
                    <Path Fill="Black" Stretch="UniformToFill"
                        Data="M10.2656 3.0293C10.5 3.0293 10.7207 3.07422 10.9277 3.16406C11.1348 3.25391 11.3145 3.37695 11.4668 3.5332C11.623 3.68555 11.7461 3.86523 11.8359 4.07227C11.9258 4.2793 11.9707 4.5 11.9707 4.73438C11.9707 4.96484 11.9277 5.18164 11.8418 5.38477C11.7559 5.58789 11.6309 5.77148 11.4668 5.93555L6.31055 11.1152C6.16211 11.2637 5.98633 11.3633 5.7832 11.4141L3.46875 11.9824C3.45312 11.9863 3.4375 11.9902 3.42188 11.9941C3.41016 11.9941 3.39453 11.9941 3.375 11.9941C3.27344 11.9941 3.18555 11.957 3.11133 11.8828C3.04102 11.8086 3.00586 11.7207 3.00586 11.6191C3.00586 11.5996 3.00586 11.584 3.00586 11.5723C3.00977 11.5566 3.01367 11.541 3.01758 11.5254L3.60938 9.22266C3.63281 9.12891 3.66992 9.03711 3.7207 8.94727C3.77539 8.85352 3.83594 8.77344 3.90234 8.70703L9.06445 3.52734C9.22461 3.36719 9.4082 3.24414 9.61523 3.1582C9.82617 3.07227 10.043 3.0293 10.2656 3.0293Z"/>
                </Viewbox>
            </Button>
        </DataTemplate>
    </syncfusion:InputToolbarItem.ItemTemplate>
</syncfusion:InputToolbarItem>
```

## Input Toolbar Position

Control the position of the input toolbar using the `InputToolbarPosition` property:

```xaml
<!-- Toolbar on the right (default) -->
<syncfusion:SfAIAssistView 
    CurrentUser="{Binding CurrentUser}"
    Messages="{Binding Chats}"
    IsInputToolbarVisible="True"
    InputToolbarPosition="Right"/>

<!-- Toolbar on the left -->
<syncfusion:SfAIAssistView 
    CurrentUser="{Binding CurrentUser}"
    Messages="{Binding Chats}"
    IsInputToolbarVisible="True"
    InputToolbarPosition="Left"/>
```

```csharp
// Set position in code
aiAssistView.InputToolbarPosition = ToolbarPosition.Left;
// or
aiAssistView.InputToolbarPosition = ToolbarPosition.Right;
```

**When to use Left:**
- Right-to-left languages
- Ergonomic preferences for left-handed users
- Specific design requirements

**When to use Right (default):**
- Most Western languages
- Standard UI conventions

## Input Toolbar Visibility

Control toolbar visibility with the `IsInputToolbarVisible` property:

```xaml
<!-- Show input toolbar -->
<syncfusion:SfAIAssistView 
    CurrentUser="{Binding CurrentUser}"
    Messages="{Binding Chats}"
    IsInputToolbarVisible="True"/>
```

```csharp
// Toggle toolbar visibility
aiAssistView.IsInputToolbarVisible = true;
```

**Default:** `false` (toolbar is hidden by default)

**When to show:**
- File upload is supported
- Voice input is available
- Additional input options are needed
- Formatting tools are required

## Input Toolbar Header Template

The `InputToolbarHeaderTemplate` property allows you to customize the header section of the input area. This is useful for displaying file upload information, error messages, notifications, or other custom components.

### File Upload Indicator Example

```xaml
<syncfusion:SfAIAssistView 
    x:Name="aiAssistView"
    CurrentUser="{Binding CurrentUser}"
    Messages="{Binding Chats}"
    IsInputToolbarVisible="True">
    
    <syncfusion:SfAIAssistView.InputToolbarHeaderTemplate>
        <DataTemplate>
            <Border CornerRadius="6" Background="LightGray" Padding="8" Margin="4">
                <ItemsControl ItemsSource="{Binding UploadedFiles}">
                    <ItemsControl.ItemsPanel>
                        <ItemsPanelTemplate>
                            <StackPanel Orientation="Horizontal" Spacing="8"/>
                        </ItemsPanelTemplate>
                    </ItemsControl.ItemsPanel>
                    <ItemsControl.ItemTemplate>
                        <DataTemplate>
                            <Border BorderBrush="DarkGray" 
                                    BorderThickness="1" 
                                    CornerRadius="4" 
                                    Padding="8"
                                    Background="White">
                                <StackPanel Orientation="Horizontal" Spacing="8">
                                    <!-- File icon -->
                                    <SymbolIcon Symbol="Document"/>
                                    
                                    <!-- File info -->
                                    <StackPanel>
                                        <TextBlock Text="{Binding Name}" 
                                                   FontWeight="SemiBold"
                                                   FontSize="12"/>
                                        <TextBlock Text="{Binding Size}" 
                                                   FontSize="10"
                                                   Foreground="Gray"/>
                                    </StackPanel>
                                    
                                    <!-- Remove button -->
                                    <Button Content="✕" 
                                            FontSize="10"
                                            Padding="4"
                                            Background="Transparent"
                                            Click="RemoveFile_Click"/>
                                </StackPanel>
                            </Border>
                        </DataTemplate>
                    </ItemsControl.ItemTemplate>
                </ItemsControl>
            </Border>
        </DataTemplate>
    </syncfusion:SfAIAssistView.InputToolbarHeaderTemplate>
    
    <syncfusion:SfAIAssistView.InputToolbarItems>
        <syncfusion:InputToolbarItem Tooltip="Attach file">
            <syncfusion:InputToolbarItem.ItemTemplate>
                <DataTemplate>
                    <Button Background="Transparent" Click="AttachFile_Click">
                        <SymbolIcon Symbol="Attach"/>
                    </Button>
                </DataTemplate>
            </syncfusion:InputToolbarItem.ItemTemplate>
        </syncfusion:InputToolbarItem>
    </syncfusion:SfAIAssistView.InputToolbarItems>
</syncfusion:SfAIAssistView>
```

**ViewModel:**

```csharp
public class FileInfo
{
    public string Name { get; set; }
    public string Size { get; set; }
    public StorageFile File { get; set; }
}

public class ViewModel : INotifyPropertyChanged
{
    private ObservableCollection<FileInfo> uploadedFiles;

    public ObservableCollection<FileInfo> UploadedFiles
    {
        get => uploadedFiles;
        set
        {
            uploadedFiles = value;
            OnPropertyChanged(nameof(UploadedFiles));
        }
    }

    public ViewModel()
    {
        UploadedFiles = new ObservableCollection<FileInfo>();
    }
}
```

### Error/Notification Header

```xaml
<syncfusion:SfAIAssistView.InputToolbarHeaderTemplate>
    <DataTemplate>
        <Border Background="LightYellow" 
                BorderBrush="Orange" 
                BorderThickness="1"
                CornerRadius="4" 
                Padding="8"
                Margin="4"
                Visibility="{Binding HasError, Converter={StaticResource BoolToVisibilityConverter}}">
            <StackPanel Orientation="Horizontal" Spacing="8">
                <SymbolIcon Symbol="Important" Foreground="Orange"/>
                <TextBlock Text="{Binding ErrorMessage}" VerticalAlignment="Center"/>
            </StackPanel>
        </Border>
    </DataTemplate>
</syncfusion:SfAIAssistView.InputToolbarHeaderTemplate>
```

## Handling Toolbar Item Clicks

Use the `InputToolbarItemClicked` event to handle clicks:

```xaml
<syncfusion:SfAIAssistView 
    x:Name="aiAssistView"
    CurrentUser="{Binding CurrentUser}"
    Messages="{Binding Chats}"
    IsInputToolbarVisible="True"
    InputToolbarItemClicked="AiAssistView_InputToolbarItemClicked"/>
```

```csharp
private void AiAssistView_InputToolbarItemClicked(object sender, InputToolbarItemClickedEventArgs e)
{
    var item = e.Item;
    
    if (item.Tooltip == "Attach file")
    {
        _ = AttachFileAsync();
    }
    else if (item.Tooltip == "Voice input")
    {
        StartVoiceRecording();
    }
    else if (item.Tooltip == "Add emoji")
    {
        ShowEmojiPicker();
    }
}
```

### File Attachment Implementation

```csharp
private async Task AttachFileAsync()
{
    var openPicker = new FileOpenPicker();
    openPicker.ViewMode = PickerViewMode.List;
    openPicker.FileTypeFilter.Add("*");
    
    var file = await openPicker.PickSingleFileAsync();
    
    if (file != null)
    {
        var properties = await file.GetBasicPropertiesAsync();
        var sizeInKB = properties.Size / 1024;
        
        var fileInfo = new FileInfo
        {
            Name = file.Name,
            Size = $"{sizeInKB} KB",
            File = file
        };
        
        // Add to uploaded files collection
        ViewModel.UploadedFiles.Add(fileInfo);
        
        ShowNotification($"File attached: {file.Name}");
    }
}

private void RemoveFile_Click(object sender, RoutedEventArgs e)
{
    var button = sender as Button;
    var fileInfo = button.DataContext as FileInfo;
    
    if (fileInfo != null)
    {
        ViewModel.UploadedFiles.Remove(fileInfo);
    }
}
```

### Voice Input Implementation

```csharp
private async void StartVoiceRecording()
{
    var mediaCapture = new MediaCapture();
    
    try
    {
        await mediaCapture.InitializeAsync();
        
        // Show recording UI
        ShowRecordingIndicator();
        
        // Start recording
        var stream = new InMemoryRandomAccessStream();
        await mediaCapture.StartRecordToStreamAsync(
            MediaEncodingProfile.CreateWav(AudioEncodingQuality.High), 
            stream);
        
        // Wait for user to stop
        await Task.Delay(5000); // Or wait for button press
        
        await mediaCapture.StopRecordAsync();
        
        // Convert audio to text using speech recognition
        var recognizer = new SpeechRecognizer();
        var result = await recognizer.RecognizeSpeechAsync(stream);
        
        if (result.Status == SpeechRecognitionResultStatus.Success)
        {
            // Insert text into input box
            InsertTextIntoInput(result.Text);
        }
        
        HideRecordingIndicator();
    }
    catch (Exception ex)
    {
        ShowError($"Voice input failed: {ex.Message}");
    }
}
```

### Emoji Picker Implementation

```csharp
private async void ShowEmojiPicker()
{
    var flyout = new Flyout();
    
    var emojiPanel = new GridView
    {
        ItemsSource = new[] { "😊", "👍", "❤️", "😂", "🎉", "🔥", "💡", "✅", "❌", "⭐" },
        ItemTemplate = CreateEmojiTemplate()
    };
    
    emojiPanel.ItemClick += (s, e) =>
    {
        var emoji = e.ClickedItem as string;
        InsertTextIntoInput(emoji);
        flyout.Hide();
    };
    
    flyout.Content = emojiPanel;
    flyout.ShowAt(FindToolbarButton("Add emoji"));
}
```

## Common Patterns

### Pattern 1: File Upload with Preview

```csharp
public class FileUploadViewModel
{
    public ObservableCollection<FileInfo> Files { get; set; } = new();
    
    public async Task AddFileAsync()
    {
        var picker = new FileOpenPicker();
        picker.FileTypeFilter.Add(".pdf");
        picker.FileTypeFilter.Add(".docx");
        picker.FileTypeFilter.Add(".txt");
        
        var files = await picker.PickMultipleFilesAsync();
        
        foreach (var file in files)
        {
            var props = await file.GetBasicPropertiesAsync();
            Files.Add(new FileInfo
            {
                Name = file.Name,
                Size = FormatFileSize(props.Size),
                File = file
            });
        }
    }
    
    private string FormatFileSize(ulong bytes)
    {
        if (bytes < 1024) return $"{bytes} B";
        if (bytes < 1024 * 1024) return $"{bytes / 1024} KB";
        return $"{bytes / (1024 * 1024)} MB";
    }
}
```

### Pattern 2: Toolbar with Dynamic Items

```xaml
<syncfusion:SfAIAssistView.InputToolbarItems>
    <!-- Always show attach -->
    <syncfusion:InputToolbarItem Tooltip="Attach file">
        <syncfusion:InputToolbarItem.ItemTemplate>
            <DataTemplate>
                <Button><SymbolIcon Symbol="Attach"/></Button>
            </DataTemplate>
        </syncfusion:InputToolbarItem.ItemTemplate>
    </syncfusion:InputToolbarItem>
    
    <!-- Show voice only if supported -->
    <syncfusion:InputToolbarItem 
        Tooltip="Voice input"
        Visible="{Binding IsVoiceInputSupported}">
        <syncfusion:InputToolbarItem.ItemTemplate>
            <DataTemplate>
                <Button><SymbolIcon Symbol="Microphone"/></Button>
            </DataTemplate>
        </syncfusion:InputToolbarItem.ItemTemplate>
    </syncfusion:InputToolbarItem>
</syncfusion:SfAIAssistView.InputToolbarItems>
```

### Pattern 3: Formatting Toolbar

```xaml
<syncfusion:SfAIAssistView.InputToolbarItems>
    <syncfusion:InputToolbarItem Tooltip="Bold">
        <syncfusion:InputToolbarItem.ItemTemplate>
            <DataTemplate>
                <Button><TextBlock Text="B" FontWeight="Bold"/></Button>
            </DataTemplate>
        </syncfusion:InputToolbarItem.ItemTemplate>
    </syncfusion:InputToolbarItem>
    
    <syncfusion:InputToolbarItem Tooltip="Italic">
        <syncfusion:InputToolbarItem.ItemTemplate>
            <DataTemplate>
                <Button><TextBlock Text="I" FontStyle="Italic"/></Button>
            </DataTemplate>
        </syncfusion:InputToolbarItem.ItemTemplate>
    </syncfusion:InputToolbarItem>
    
    <syncfusion:InputToolbarItem Tooltip="Code block">
        <syncfusion:InputToolbarItem.ItemTemplate>
            <DataTemplate>
                <Button><TextBlock Text="&lt;/&gt;" FontFamily="Consolas"/></Button>
            </DataTemplate>
        </syncfusion:InputToolbarItem.ItemTemplate>
    </syncfusion:InputToolbarItem>
</syncfusion:SfAIAssistView.InputToolbarItems>
```

## Best Practices

1. **Clear Icons:** Use recognizable icons with descriptive tooltips.

2. **Limit Items:** Keep toolbar items to 3-5 for usability.

3. **Show When Needed:** Set `IsInputToolbarVisible="True"` only if you have toolbar items.

4. **Consistent Position:** Choose Left or Right based on language/region.

5. **Feedback:** Provide visual feedback when items are clicked (notifications, header updates).

6. **File Limits:** Validate file types and sizes before accepting uploads.

7. **Accessibility:** Ensure toolbar items are keyboard-accessible and have proper tooltips.

8. **Header Template:** Use InputToolbarHeaderTemplate to show upload status or errors.

## Troubleshooting

### Toolbar Not Showing
- Check `IsInputToolbarVisible="True"`
- Verify `InputToolbarItems` collection has items
- Ensure ItemTemplate is defined

### Buttons Not Clickable
- Verify buttons in ItemTemplate have proper event handlers
- Check IsEnabled property is true
- Ensure Button Background is not blocking interactions

### Header Template Not Appearing
- Verify InputToolbarHeaderTemplate is set
- Check DataContext binding
- Ensure bound collection has items

### File Picker Not Working
- Use correct APIs: `FileOpenPicker` for WinUI 3
- Initialize window handle for picker in WinUI 3 desktop apps
- Check file type filters are added
