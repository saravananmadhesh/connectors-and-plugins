# File Attachments in AI AssistView

## Table of Contents
- [Enable Attachment](#enable-attachment)
- [Configuring Attachments](#configuring-attachments)
  - [Setting Save and Remove URLs](#setting-save-and-remove-urls)
  - [Setting File Type](#setting-file-type)
  - [Setting File Size](#setting-file-size)
  - [Setting Maximum Count](#setting-maximum-count)
  - [Attachment Templates](#attachment-templates)
- [Pre-loading Attached Files in Prompts](#pre-loading-attached-files-in-prompts)

## Enable Attachment

You can enable the attachment by using the `enableAttachments` property. By default, it is set to `false`.

```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView").EnableAttachments(true).PromptRequest("onPromptRequest").Created("onCreated").Render()
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest() {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>
```

## Configuring Attachments

You can use the `e-aiassistview-attachmentsettings` tag to configure the attachments in the AI AssistView.

### Setting Save and Remove URLs

You can use the `saveUrl` and `removeUrl` property to add the save and remove the URL for the file uploaded in the AI AssistView.

```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView").EnableAttachments(true).PromptRequest("onPromptRequest").Created("onCreated").AttachmentSettings(new AIAssistViewAttachmentSettings() { SaveUrl = @Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save"), RemoveUrl = @Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove") }).Render()
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest() {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>
```

### Setting File Type

You can use the `allowedFileTypes` property to restrict the file types that can be uploaded as attachments.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" enableAttachments="true" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-attachmentsettings
            saveUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save")
            removeUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")
            allowedFileTypes=".png,.jpg,.jpeg">
        </e-aiassistview-attachmentsettings>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest() {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>
```

### Setting File Size

You can use the `maxFileSize` property to allowed a maximum file size of the upload file in the AI AssistView. By default, it is set to `2000000` bytes.

```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView").EnableAttachments(true).PromptRequest("onPromptRequest").Created("onCreated").AttachmentSettings(new AIAssistViewAttachmentSettings() { SaveUrl = @Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save"), RemoveUrl = @Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove"), MaxFileSize(1000000) }).Render()
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest() {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>
```

### Setting Maximum Count

Restrict how many files can be attached at once using the `maximumCount` property. The default value is `10`. If users select more than the allowed count, the maximum count reached error will be displayed.

```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView").EnableAttachments(true).PromptRequest("onPromptRequest").Created("onCreated").AttachmentSettings(new AIAssistViewAttachmentSettings() { SaveUrl = @Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save"), RemoveUrl = @Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove"), MaximumCount = 5 }).Render()
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest() {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>
```

### Attachment Templates

Control how attachments appear inside message bubbles after sending.

```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView")
        .EnableAttachments(true)
        .AttachmentSettings(new AIAssistViewAttachmentSettings()
        {
            SaveUrl = @Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save"),
            RemoveUrl = @Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove"),
            AttachmentTemplate = "attachmentTemplate"
        })
        .PromptRequest("onPromptRequest")
        .Created("onCreated")
        .Render()
</div>

<script>
    var assistObj;

    function attachmentTemplate(context) {
        return `
            <div class="e-attached-file-temp">
                <div class="attached-file-name">${context.selectedFile.name}</div>
                <div class="attached-file-type">${context.selectedFile.type}</div>
            </div>
        `;
    }

    function onCreated() {
        assistObj = this;
    }

    function onPromptRequest() {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>
```

## Common Patterns

### Pattern 1: Basic Attachments with Save/Remove URLs
```razor
@using Syncfusion.EJ2.InteractiveChat;

<ejs-aiassistview id="aiAssistView" enableAttachments="true">
    <e-aiassistview-attachmentsettings 
        saveUrl="https://your-api/save" 
        removeUrl="https://your-api/remove">
    </e-aiassistview-attachmentsettings>
</ejs-aiassistview>
```

### Pattern 2: Restricting File Types
```razor
@using Syncfusion.EJ2.InteractiveChat;

<ejs-aiassistview id="aiAssistView" enableAttachments="true">
    <e-aiassistview-attachmentsettings 
        saveUrl="https://your-api/save" 
        removeUrl="https://your-api/remove"
        allowedFileTypes=".pdf,.doc,.docx">
    </e-aiassistview-attachmentsettings>
</ejs-aiassistview>
```

### Pattern 3: Limiting File Size and Count
```razor
@using Syncfusion.EJ2.InteractiveChat;

<ejs-aiassistview id="aiAssistView" enableAttachments="true">
    <e-aiassistview-attachmentsettings 
        saveUrl="https://your-api/save" 
        removeUrl="https://your-api/remove"
        maxFileSize="5000000"
        maximumCount="3">
    </e-aiassistview-attachmentsettings>
</ejs-aiassistview>
```

### Pattern 4: Complete Attachment Configuration
```razor
@using Syncfusion.EJ2.InteractiveChat;

<ejs-aiassistview id="aiAssistView" 
    enableAttachments="true" 
    beforeAttachmentUpload="onBeforeUpload"
    attachmentUploadSuccess="onUploadSuccess"
    attachmentUploadFailure="onUploadFailure"
    attachmentRemoved="onAttachmentRemoved">
    <e-aiassistview-attachmentsettings 
        saveUrl="https://your-api/save" 
        removeUrl="https://your-api/remove"
        allowedFileTypes=".pdf,.doc,.docx,.txt,.xlsx"
        maxFileSize="5000000"
        maximumCount="5">
    </e-aiassistview-attachmentsettings>
</ejs-aiassistview>

<script>
    function onBeforeUpload(args) {
        console.log('Before upload:', args);
    }
    function onUploadSuccess(args) {
        console.log('Upload successful:', args);
    }
    function onUploadFailure(args) {
        console.log('Upload failed:', args);
    }
    function onAttachmentRemoved(args) {
        console.log('Attachment removed:', args);
    }
</script>
```

## Pre-loading Attached Files in Prompts

You can use the `attachedFiles` property on each item in the `prompts` collection to pre-load files that were attached to a prompt during the initial rendering of the AI AssistView. This property accepts an array of `FileInfo` objects representing files associated with that prompt.

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using System.Text.Json;

@{
    var promptsData = new[]
    {
        new
        {
            prompt = "Summarize this document.",
            response = "<div>The document discusses AI-powered tools for productivity.</div>",
            attachedFiles = new[]
            {
                new { name = "report.pdf", size = 204800, type = ".pdf" }
            }
        }
    };
    var promptsJson = JsonSerializer.Serialize(promptsData);
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" prompts="@promptsData" enableAttachments="true" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-attachmentsettings
            saveUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save")
            removeUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")>
        </e-aiassistview-attachmentsettings>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    var prompts = @Html.Raw(promptsJson);
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>
```

## Best Practices

- Always provide both `saveUrl` and `removeUrl` for complete attachment functionality
- Use `allowedFileTypes` to restrict accepted file formats for security
- Validate file types on both client and server side for security
- Set reasonable file size limits to prevent performance issues
- Use `maximumCount` to prevent user confusion with too many attachments
- Implement proper error handling for upload failures
- Test attachment uploads with various file types and sizes
- Consider security implications when accepting file uploads
