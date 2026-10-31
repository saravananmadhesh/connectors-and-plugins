# Stop Responding in AI AssistView

## Overview

The SfAIAssistView control includes a Stop Responding feature that allows users to cancel an ongoing AI response by clicking the Stop Responding button. This ensures users can interrupt the response if it is no longer needed.

## Prerequisites

- `SfAIAssistView` has been created and added to your form
- A `ViewModel` is bound to the control via the `Messages` property
- Required `using` directives:

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Syncfusion.WinForms.AIAssistView;
```

## Enabling the Stop Responding Button

By default, the Stop Responding button is not displayed. Set `EnableStopResponding` to `true`:

```csharp
SfAIAssistView sfAIAssistView1 = new SfAIAssistView();
sfAIAssistView1.EnableStopResponding = true;
```

The stop button appears in the input area when `EnableStopResponding` is `true` and a response is being generated.

## Stop Responding Event

The `StopRespondingButtonClicked` event is triggered when the Stop Responding button is clicked. Use it to cancel any in-flight AI request:

```csharp
sfAIAssistView1.StopRespondingButtonClicked += SfaiAssistView1_StopResponding;

private void SfaiAssistView1_StopResponding(object sender, EventArgs e)
{
    CancelAIRequest();
}
```

## CancellationTokenSource Integration

Use `CancellationTokenSource` to wire cancellation into your AI request flow:

```csharp
private CancellationTokenSource cts;

private void CancelAIRequest()
{
    if (cts != null && !cts.IsCancellationRequested)
    {
        cts.Cancel();
        cts.Dispose();
        cts = null;
    }
}
```

## Complete Cancellation Flow

### Wiring Cancellation into the AI Request Handler

```csharp
private async void Chats_CollectionChanged(object sender, NotifyCollectionChangedEventArgs e)
{
    if (e.NewItems == null || e.NewItems.Count == 0) return;
    var item = e.NewItems[0] as TextMessage;
    if (item == null) return;
    if (item.Author?.Name != viewModel.CurrentUser?.Name) return;

    viewModel.ShowTypingIndicator = true;
    cts = new CancellationTokenSource();

    try
    {
        string response = await aiService.NonStreamingChatAsync(item.Text, cts.Token);
        viewModel.Chats.Add(new TextMessage
        {
            Author = new Author { Name = "Bot" },
            Text = response
        });
    }
    catch (OperationCanceledException)
    {
        // The request was canceled by the user — optionally add a note
        viewModel.Chats.Add(new TextMessage
        {
            Author = new Author { Name = "Bot" },
            Text = "[Response canceled by user]"
        });
    }
    finally
    {
        viewModel.ShowTypingIndicator = false;
    }
}
```

### Full Form Setup Example

```csharp
public partial class Form1 : Form
{
    ViewModel viewModel;
    private CancellationTokenSource cts;

    public Form1()
    {
        InitializeComponent();
        viewModel = new ViewModel();

        SfAIAssistView sfAIAssistView1 = new SfAIAssistView();
        sfAIAssistView1.Dock = DockStyle.Fill;
        this.Controls.Add(sfAIAssistView1);

        // Enable stop responding
        sfAIAssistView1.EnableStopResponding = true;

        // Bind data
        sfAIAssistView1.DataBindings.Add("Messages", viewModel, "Chats",
            true, DataSourceUpdateMode.OnPropertyChanged);
        sfAIAssistView1.DataBindings.Add("ShowTypingIndicator", viewModel,
            "ShowTypingIndicator", true, DataSourceUpdateMode.OnPropertyChanged);

        // Handle stop event
        sfAIAssistView1.StopRespondingButtonClicked += (sender, e) =>
        {
            if (cts != null && !cts.IsCancellationRequested)
            {
                cts.Cancel();
                cts.Dispose();
                cts = null;
            }
        };
    }
}
```

> **Important:** Create a new `CancellationTokenSource` instance for each AI request. Token sources cannot be reused after cancellation.

## Customization

Customize the button text and the hold duration (the button stays disabled after a click to prevent repeated cancellation requests).

| Property | Description | Default |
|----------|-------------|---------|
| `StopRespondingButtonText` | Text shown before cancellation | `"Stop"` |
| `StopRespondingButtonCancelingText` | Text shown while cancellation is in progress | `"Canceling..."` |
| `StopRespondingHoldSeconds` | Seconds the button stays disabled after click | `0` |

```csharp
sfAIAssistView1.StopRespondingButtonText = "\u23F9 Stop";
sfAIAssistView1.StopRespondingButtonCancelingText = "Stopping...";
sfAIAssistView1.StopRespondingHoldSeconds = 2;
```

## Troubleshooting

| Issue | Possible Cause | Resolution |
|-------|----------------|------------|
| Stop button not appearing | `EnableStopResponding` is not set to `true` | Set `sfAIAssistView1.EnableStopResponding = true` |
| `StopRespondingButtonClicked` not firing | Event handler not subscribed | Subscribe with `+=` before the control is displayed |
| `OperationCanceledException` not caught | The try-catch block is missing or does not catch the exception | Wrap the `await` call in a try-catch block that catches `OperationCanceledException` |
| Token source already disposed | Reusing a canceled `CancellationTokenSource` | Create a new `CancellationTokenSource` instance for each AI request |
| Typing indicator stuck after cancel | `ShowTypingIndicator` not reset in the `finally` block | Always set `ShowTypingIndicator = false` in a `finally` block after the async call |