# Events & Interactions in Chat-UI

## Table of Contents
- [Created Event](#created-event)
- [Message Send Event](#message-send-event)
- [User Typing Event](#user-typing-event)
- [Attachment Upload Events](#attachment-upload-events)
- [Attachment Removal Event](#attachment-removal-event)
- [Attachment Click Event](#attachment-click-event)

## Created Event

The `created` event fires when the Chat-UI control rendering is completed. Use this to initialize data or perform post-render setup.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" created="onCreated">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    </ejs-chatui>
</div>

<script>
    function onCreated() {
        // Your required action here
        console.log("Chat-UI component created successfully");
    }
</script>
```

### Use Cases

- Load message history from server
- Initialize typing indicators
- Set up event subscriptions
- Configure initial UI state

## Message Send Event

The `messageSend` event triggers before a message is sent. Use it to validate content, modify messages, or track send operations.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" messageSend="messageSend">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    </ejs-chatui>
</div>

<script>
    function messageSend(args) {
        // args contains event data
        console.log("Message being sent:", args.message);
    }
</script>
```

### Event Arguments

| Property | Type | Description |
|----------|------|-------------|
| `message` | ChatUIMessage | The message being sent |
| `text` | string | The message content text |
| `author` | ChatUIUser | The message author |
| `timestamp` | DateTime | When the message was sent |

### Use Cases

- Validate message content (no empty messages)
- Filter inappropriate content
- Add server-side processing
- Track analytics and logging
- Modify message before sending
- Prevent message send based on conditions

## User Typing Event

The `userTyping` event triggers when the user is typing in the message input field. Use it to detect user activity and display typing indicators.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" userTyping="userTyping">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    </ejs-chatui>
</div>

<script>
    function userTyping(args) {
        // args contains typing event data
        console.log("User is typing:", args);
    }
</script>
```

### Use Cases

- Broadcast "user is typing" indicator to other participants
- Implement typing-based auto-save
- Detect user inactivity
- Track engagement metrics

## Attachment Upload Events

### Before Attachment Upload

The `beforeAttachmentUpload` event triggers before attached files begin uploading. Use it to validate files before upload.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" enableAttachments="true" beforeAttachmentUpload="beforeAttachmentUpload">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-attachmentsettings saveUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save") 
                                     removeUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")></e-chatui-attachmentsettings>
    </ejs-chatui>
</div>

<script>
    function beforeAttachmentUpload(args) {
        // args.files contains file information
        console.log("Before upload:", args.files);
    }
</script>
```

### Attachment Upload Success

The `attachmentUploadSuccess` event triggers when an attached file is successfully uploaded.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" enableAttachments="true" attachmentUploadSuccess="attachmentUploadSuccess">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-attachmentsettings saveUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save") 
                                     removeUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")></e-chatui-attachmentsettings>
    </ejs-chatui>
</div>

<script>
    function attachmentUploadSuccess(args) {
        // args contains successful upload details
        console.log("Upload successful:", args);
    }
</script>
```

### Attachment Upload Failure

The `attachmentUploadFailure` event triggers when a file upload fails.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" enableAttachments="true" attachmentUploadFailure="attachmentUploadFailure">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-attachmentsettings saveUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save") 
                                     removeUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")></e-chatui-attachmentsettings>
    </ejs-chatui>
</div>

<script>
    function attachmentUploadFailure(args) {
        // args contains error details
        console.error("Upload failed:", args);
    }
</script>
```

## Attachment Removal Event

The `attachmentRemoved` event triggers when an attachment is removed from a message.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" enableAttachments="true" attachmentRemoved="attachmentRemoved">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-attachmentsettings saveUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save") 
                                     removeUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")></e-chatui-attachmentsettings>
    </ejs-chatui>
</div>

<script>
    function attachmentRemoved(args) {
        // args contains removed attachment details
        console.log("Attachment removed:", args);
    }
</script>
```

## Attachment Click Event

The `attachmentClick` event triggers when a user clicks on an attachment in the chat.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" enableAttachments="true">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-attachmentsettings attachmentClick="attachmentClick" saveUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save") 
                                     removeUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")></e-chatui-attachmentsettings>
    </ejs-chatui>
</div>

<script>
    function attachmentClick(args) {
        // args contains clicked attachment details
        console.log("Attachment clicked:", args);
        // Handle file download or preview
    }
</script>
```

## Common Patterns

### Combine Multiple Events

Handle multiple events for comprehensive interaction tracking:

```razor
<ejs-chatui id="chatUser" 
            created="onCreated"
            messageSend="messageSend"
            userTyping="userTyping"
            enableAttachments="true"
            beforeAttachmentUpload="beforeAttachmentUpload"
            attachmentUploadSuccess="attachmentUploadSuccess">
    <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    <e-chatui-attachmentsettings attachmentClick="attachmentClick" saveUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save") 
                                    removeUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")></e-chatui-attachmentsettings>
</ejs-chatui>

<script>
    function onCreated() {
        console.log("Chat initialized");
    }
    
    function messageSend(args) {
        console.log("Message sent:", args.message);
    }
    
    function userTyping(args) {
        console.log("User typing");
    }
    
    function beforeAttachmentUpload(args) {
        console.log("Validating attachment");
    }
    
    function attachmentUploadSuccess(args) {
        console.log("Attachment uploaded");
    }
    
    function attachmentClick(args) {
        console.log("Attachment clicked");
    }
</script>
```

### Prevent Message Send

Stop message sending based on validation:

```javascript
function messageSend(args) {
    // Prevent empty messages
    if (!args.text || args.text.trim() === "") {
        args.cancel = true;  // Cancel send
        console.log("Message cannot be empty");
    }
    
    // Prevent messages exceeding character limit
    if (args.text && args.text.length > 500) {
        args.cancel = true;
        console.log("Message exceeds 500 character limit");
    }
}
```

## Edge Cases

- Events may fire in rapid succession during bulk operations
- Upload events may not fire if file size exceeds limits (validate in beforeAttachmentUpload)
- Events may not fire if component is not fully initialized
- Event handlers should be lightweight to avoid UI lag
