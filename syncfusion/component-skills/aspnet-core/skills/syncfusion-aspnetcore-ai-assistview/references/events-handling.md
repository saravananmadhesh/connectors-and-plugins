# Handling Events in AI AssistView

## Table of Contents
- [Created Event](#created-event)
- [PromptRequest Event](#promptrequest-event)
- [PromptChanged Event](#promptchanged-event)
- [StopRespondingClick Event](#stoprespondingclick-event)
- [Attachment Events](#attachment-events)
  - [BeforeAttachmentUpload](#beforeattachmentupload)
  - [AttachmentUploadSuccess](#attachmentuploadSuccess)
  - [AttachmentUploadFailure](#attachmentuploadfailure)
  - [AttachmentRemoving](#attachmentremoving)
  - [AttachmentRemoved](#attachmentremoved)
  - [AttachmentClick](#attachmentclick)

## Created Event

The AI AssistView control triggers the `created` event when the control rendering is completed.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        // your required action here..
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>
```

## PromptRequest Event

The `promptRequest` event is triggered when the prompt request is made in the AI AssistView control. The event argument provides the following properties:

| Property | Type | Description |
|---|---|---|
| `prompt` | `string` | The text of the prompt that was submitted. |
| `attachedFiles` | `FileInfo[]` | Files attached along with the prompt request. |
| `promptSuggestions` | `string[]` | The current list of prompt suggestions at the time of the request. |
| `responseToolbarItems` | `ToolbarItemModel[]` | Toolbar items to display in the response area. |
| `cancel` | `boolean` | Set to `true` to cancel the prompt request and prevent default processing. |
| `name` | `string` | The name of the event. |

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using System.Text.Json;

@{
    var suggestions = new string[] { "How do I prioritize my tasks?", "How can I improve my time management skills?" };
    var prompts = new[]
    {
        new { prompt = "How do I prioritize my tasks?", response = "Prioritize tasks by urgency and impact: tackle high-impact tasks first, delegate when possible, and break large tasks into smaller steps." },
        new { prompt = "How can I improve my time management skills?", response = "Try setting clear goals, using a planner, prioritizing tasks, and minimizing distractions." }
    };
    var promptsJson = JsonSerializer.Serialize(prompts);
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" promptSuggestions="@suggestions" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
</div>

<script>
    var assistObj;
    var prompts = @Html.Raw(promptsJson);
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        // Access prompt text
        console.log('Prompt:', args.prompt);
        // Access attached files (when enableAttachments is true)
        console.log('Attached files:', args.attachedFiles);
        // Access current prompt suggestions
        console.log('Suggestions:', args.promptSuggestions);

        // Cancel the request conditionally
        if (args.prompt.trim() === '') {
            args.cancel = true;
            return;
        }

        setTimeout(() => {
            let foundPrompt = prompts.find((promptObj) => promptObj.prompt === args.prompt);
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
        }, 2000);
    }
</script>
```

## PromptChanged Event

The `promptChanged` event is triggered when the prompt text is changed in the AI AssistView control. The event argument provides the following properties:

| Property | Type | Description |
|---|---|---|
| `value` | `string` | The current value of the prompt after the change. |
| `previousValue` | `string` | The previous value of the prompt before the change. |
| `element` | `HTMLElement` | The HTML element of the text area container. |
| `event` | `Event` | The underlying browser event that triggered the change. |
| `name` | `string` | The name of the event. |

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using System.Text.Json;

@{
    var suggestions = new string[] { "How do I prioritize my tasks?", "How can I improve my time management skills?" };
    var prompts = new[]
    {
        new { prompt = "How do I prioritize my tasks?", response = "Prioritize tasks by urgency and impact: tackle high-impact tasks first, delegate when possible, and break large tasks into smaller steps." },
        new { prompt = "How can I improve my time management skills?", response = "Try setting clear goals, using a planner, prioritizing tasks, and minimizing distractions." }
    };
    var promptsJson = JsonSerializer.Serialize(prompts);
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" promptChanged="onPromptChanged" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
</div>

<script>
    var assistObj;
    var prompts = @Html.Raw(promptsJson);
    function onCreated() {
        assistObj = this;
    }
    function onPromptChanged(args) {
        // args.value       - current prompt text
        // args.previousValue - previous prompt text
        console.log('Prompt changed from "' + args.previousValue + '" to "' + args.value + '"');
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            let foundPrompt = prompts.find((promptObj) => promptObj.prompt === args.prompt);
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
        }, 2000);
    }
</script>
```

## StopRespondingClick Event

The `stopRespondingClick` event is triggered when the **Stop Responding** button is clicked while a prompt request is in progress. Use this event to cancel an ongoing AI request and update the UI accordingly. The event argument provides the following properties:

| Property | Type | Description |
|---|---|---|
| `prompt` | `string` | The prompt text for which the response was being generated. |
| `dataIndex` | `number` | The index of the prompt in the prompts collection. |
| `event` | `Event` | The underlying browser event that triggered the action. |
| `name` | `string` | The name of the event. |

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" stopRespondingClick="onStopRespondingClick" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
</div>

<script>
    var assistObj;
    var requestTimer;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        requestTimer = setTimeout(() => {
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
    function onStopRespondingClick(args) {
        // args.prompt     - the prompt being processed
        // args.dataIndex  - index of the prompt in the collection
        clearTimeout(requestTimer);
        console.log('Stopped responding for prompt: ' + args.prompt);
    }
</script>
```

## Attachment Events

The AI AssistView provides several events for handling file attachments throughout the upload lifecycle.

### BeforeAttachmentUpload

The `BeforeAttachmentUpload` event is triggered before the attached files upload begins in the AI AssistView.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" enableAttachments="true" beforeAttachmentUpload="beforeAttachmentUpload" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-attachmentsettings saveUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save") removeUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")></e-aiassistview-attachmentsettings>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function beforeAttachmentUpload() {
        // your required action here..
    }
    function onPromptRequest() {
        setTimeout(() => {
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>
```

### AttachmentUploadSuccess

The `AttachmentUploadSuccess` event is triggered when the attached file is successfully uploaded in the AI AssistView.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" enableAttachments="true" attachmentUploadSuccess="attachmentUploadSuccess" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-attachmentsettings saveUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save") removeUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")></e-aiassistview-attachmentsettings>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function attachmentUploadSuccess() {
        // your required action here..
    }
    function onPromptRequest() {
        setTimeout(() => {
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>
```

### AttachmentUploadFailure

The `AttachmentUploadFailure` event is triggered when the attached file upload fails in the AI AssistView.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" enableAttachments="true" attachmentUploadFailure="attachmentUploadFailure" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-attachmentsettings saveUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save") removeUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")></e-aiassistview-attachmentsettings>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function attachmentUploadFailure() {
        // your required action here..
    }
    function onPromptRequest() {
        setTimeout(() => {
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>
```

### AttachmentRemoved

The `AttachmentRemoved` event is triggered when an attached file is removed in the AI AssistView.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" enableAttachments="true" attachmentRemoved="attachmentRemoved" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-attachmentsettings saveUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save") removeUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")></e-aiassistview-attachmentsettings>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function attachmentRemoved() {
        // your required action here..
    }
    function onPromptRequest() {
        setTimeout(() => {
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>
```

### AttachmentRemoving

The `attachmentRemoving` event is triggered when an attached file is being removed in the AI AssistView.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" enableAttachments="true" attachmentRemoving="attachmentRemoving" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-attachmentsettings saveUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save") removeUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")></e-aiassistview-attachmentsettings>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function attachmentRemoving() {
        // your required action here..
    }
    function onPromptRequest() {
        setTimeout(() => {
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>
```

**Event Arguments:**

The following arguments are available in the `attachmentRemoving` event handler:

| Argument | Type | Description |
|---|---|---|
| `cancel` | `boolean` | Defines whether the current action can be prevented. |
| `currentRequest` | `XMLHttpRequest` | Returns the XMLHttpRequest instance that is associated with the remove action. |
| `customFormData` | `{ [key: string]: Object }[]` | Defines the additional data with key and value pair format that will be submitted to the remove action. |
| `event` | `MouseEvent \| TouchEvent \| KeyboardEventArgs` | Returns the original event arguments. |
| `filesData` | [`FileInfo[]`](https://ej2.syncfusion.com/documentation/api/uploader/fileinfo) | Returns the list of files' details that will be removed. |
| `postRawFile` | `boolean` | Defines whether the selected raw file is sent to the server's remove action. Set `true` to send the raw file; set `false` to send the file name only. |

### AttachmentClick

The `attachmentClick` event is triggered when an attached file is clicked in the AI AssistView.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" enableAttachments="true" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-attachmentsettings attachmentClick="attachmentClick" saveUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save") removeUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")></e-aiassistview-attachmentsettings>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function attachmentClick() {
        // your required action here..
    }
    function onPromptRequest() {
        setTimeout(() => {
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>
```
