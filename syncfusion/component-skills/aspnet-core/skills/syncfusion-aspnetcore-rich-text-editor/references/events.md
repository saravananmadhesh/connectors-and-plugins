# Events

Complete reference for all events available on the Syncfusion ASP.NET Core Rich Text Editor (`<ejs-richtexteditor>`).

## Lifecycle Events

### Created
**Signature:** `public string Created { get; set; }`  
Triggers when the Rich Text Editor is fully rendered and ready.

### Destroyed
**Signature:** `public string Destroyed { get; set; }`  
Triggers when the Rich Text Editor is destroyed.

## Focus / Blur Events

### Focus
**Signature:** `public string Focus { get; set; }`  
Triggers when the Rich Text Editor gains focus.

### Blur
**Signature:** `public string Blur { get; set; }`  
Triggers when the Rich Text Editor loses focus.

### Change
**Signature:** `public string Change { get; set; }`  
Triggers when the Rich Text Editor loses focus and changes have been made to the content since the last saved state.

## Toolbar / Command Events

### ActionBegin
**Signature:** `public string ActionBegin { get; set; }`  
Triggers before executing a command via toolbar items. Set `args.cancel = true` to prevent the command from executing.

### ActionComplete
**Signature:** `public string ActionComplete { get; set; }`  
Triggers after a toolbar command has been executed.

## Paste / Clipboard Events

### BeforePasteCleanup
**Signature:** `public string BeforePasteCleanup { get; set; }`  
Triggers before pasted content is cleaned up.

### AfterPasteCleanup
**Signature:** `public string AfterPasteCleanup { get; set; }`  
Triggers after pasted content has been cleaned up.

### BeforeClipboardWrite
**Signature:** `public string BeforeClipboardWrite { get; set; }`  
Triggers before copy or cut content is written to the clipboard.

## Dialog Events

### BeforeDialogOpen
**Signature:** `public string BeforeDialogOpen { get; set; }`  
Triggers before a dialog is opened. Set `args.cancel = true` to prevent the dialog from opening.

### DialogOpen
**Signature:** `public string DialogOpen { get; set; }`  
Triggers when a dialog is opened.

### BeforeDialogClose
**Signature:** `public string BeforeDialogClose { get; set; }`  
Triggers before a dialog is closed. Set `args.cancel = true` to prevent the dialog from closing.

### DialogClose
**Signature:** `public string DialogClose { get; set; }`  
Triggers after a dialog has been closed.

## Popup Events

### BeforePopupOpen
**Signature:** `public string BeforePopupOpen { get; set; }`  
Triggers before a popup is about to open. Can be used to manipulate popup content or cancelled by setting `args.cancel = true`.

### BeforePopupClose
**Signature:** `public string BeforePopupClose { get; set; }`  
Triggers before a popup is about to close. Useful for cleaning up custom elements added to the popup. Can be cancelled by setting `args.cancel = true`.

### BeforeQuickToolbarOpen
**Signature:** `public string BeforeQuickToolbarOpen { get; set; }`  
Triggers before the quick toolbar opens.

## Image Events

### ImageSelected
**Signature:** `public string ImageSelected { get; set; }`  
Triggers when an image is selected or dragged into the insert image dialog.

### BeforeImageUpload
**Signature:** `public string BeforeImageUpload { get; set; }`  
Triggers before the image upload process starts.

### ImageUploading
**Signature:** `public string ImageUploading { get; set; }`  
Triggers when an image upload begins in the insert image dialog. Provides access to upload details via the event arguments.

### ImageUploadSuccess
**Signature:** `public string ImageUploadSuccess { get; set; }`  
Triggers when an image has been successfully uploaded to the server.

### ImageUploadFailed
**Signature:** `public string ImageUploadFailed { get; set; }`  
Triggers when there is an error during image upload.

### ImageRemoving
**Signature:** `public string ImageRemoving { get; set; }`  
Triggers when a selected image is removed from the insert image dialog.

### AfterImageDelete
**Signature:** `public string AfterImageDelete { get; set; }`  
Triggers when a selected image is removed from the Rich Text Editor content.

### BeforeImageDrop
**Signature:** `public string BeforeImageDrop { get; set; }`  
Triggers before an image is dropped into the editor.

## Media (Audio / Video) Events

### FileSelected
**Signature:** `public string FileSelected { get; set; }`  
Triggers when media (audio/video) is selected or dragged into the insert media dialog.

### BeforeFileUpload
**Signature:** `public string BeforeFileUpload { get; set; }`  
Triggers before the media (audio/video) upload process starts.

### FileUploading
**Signature:** `public string FileUploading { get; set; }`  
Triggers when media begins uploading in the insert media dialog.

### FileUploadSuccess
**Signature:** `public string FileUploadSuccess { get; set; }`  
Triggers when media has been successfully uploaded to the server.

### FileUploadFailed
**Signature:** `public string FileUploadFailed { get; set; }`  
Triggers when there is an error during media upload.

### FileRemoving
**Signature:** `public string FileRemoving { get; set; }`  
Triggers when selected media is removed from the insert audio/video dialog.

### AfterMediaDelete
**Signature:** `public string AfterMediaDelete { get; set; }`  
Triggers when selected media is removed from the Rich Text Editor content.

### BeforeMediaDrop
**Signature:** `public string BeforeMediaDrop { get; set; }`  
Triggers before a media element is dropped into the editor.

## Security Events

### BeforeSanitizeHtml
**Signature:** `public string BeforeSanitizeHtml { get; set; }`  
Triggers before sanitizing the value. Applicable only when `editorMode` is `HTML`. Use this event to customize or extend the sanitization logic.

## Export Events

### DocumentExporting
**Signature:** `public string DocumentExporting { get; set; }`  
Triggers just before a PDF or Word export request is dispatched, allowing customization of the outgoing request.

## AI Assistant Events

### AiAssistantPromptRequest
**Signature:** `public string AiAssistantPromptRequest { get; set; }`  
Triggers when a user sends a prompt to the AI Assistant. Use this event to handle the request with your preferred AI provider.

### AiAssistantStopRespondingClick
**Signature:** `public string AiAssistantStopRespondingClick { get; set; }`  
Triggers when the user clicks the "Stop Responding" button in the AI Assistant. Use this event to cancel the ongoing AI request.

### AiAssistantToolbarClick
**Signature:** `public string AiAssistantToolbarClick { get; set; }`  
Triggers when a user selects an item from the AI Assistant toolbar (via mouse, touch, or keyboard). Use this event to handle custom toolbar item click actions.

## Usage Example

```razor
<ejs-richtexteditor id="editor"
    created="onCreated"
    change="onChange"
    actionBegin="onActionBegin"
    focus="onFocus"
    blur="onBlur"
    imageUploadSuccess="onImageUploadSuccess"
    beforeSanitizeHtml="onBeforeSanitizeHtml">
</ejs-richtexteditor>

<script>
    function onCreated() {
        console.log('RTE is ready');
    }

    function onChange(args) {
        console.log('Content changed:', args.value);
    }

    function onActionBegin(args) {
        // Cancel bold command example
        if (args.requestType === 'Bold') {
            args.cancel = true;
        }
    }

    function onFocus(args) {
        console.log('Editor focused');
    }

    function onBlur(args) {
        console.log('Editor blurred');
    }

    function onImageUploadSuccess(args) {
        // Update image src with server-returned path
        var filename = JSON.parse(args.e.currentTarget.response).name;
        args.file.name = filename;
        var imgSrc = document.querySelector('.e-rte-image.e-imginline');
        if (imgSrc) imgSrc.setAttribute('src', args.e.currentTarget.responseText);
    }

    function onBeforeSanitizeHtml(args) {
        // Allow custom attributes during sanitization
        args.helper = function (value) {
            return value;
        };
    }
</script>
```
