# Rich Text Editor Events — Media, Upload & Toolbar

## Table of Contents
- [AI Assistant Events](#ai-assistant-events)
- [Media Events](#media-events)
- [Paste and Clipboard Events](#paste-and-clipboard-events)
- [Toolbar Events](#toolbar-events)
- [Upload Events](#upload-events)
- [Document Import/Export Events](#document-importexport-events)

---

## AI Assistant Events

### aiAssistantPromptRequest

Triggers when a user sends a prompt to the AI Assistant. Use this event to handle the request with your preferred AI Provider.

**Event Type:** `EmitType<AIAssistantPromptRequestArgs>`

**Event Arguments:**
- `cancel` (boolean): Set to `true` to cancel the prompt request
- `html` (string): Current selection as HTML
- `text` (string): Current selection as plain text
- `prompt` (string): The prompt text
- `promptSuggestions` (string[]): List of prompt suggestions
- `responseToolbarItems` (ToolbarItemModel[]): Toolbar items for the output view

**Example:**
```typescript
import { AIAssistantPromptRequestArgs } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  template: `<ejs-richtexteditor (aiAssistantPromptRequest)="onAIPromptRequest($event)"></ejs-richtexteditor>`,
  providers: [AIAssistantService]
})
export class AppComponent {
  @ViewChild('rte') rteObj!: RichTextEditorComponent;

  async onAIPromptRequest(args: AIAssistantPromptRequestArgs): Promise<void> {
    console.log('AI Prompt:', args.prompt);
    console.log('Selected text:', args.text);
    console.log('Selected HTML:', args.html);

    try {
      const response = await this.callOpenAI(args.prompt, args.text);
      this.rteObj.addAIPromptResponse(response, true);
    } catch (error) {
      console.error('AI request failed:', error);
      this.rteObj.addAIPromptResponse('Error: Unable to generate response', true);
    }
  }

  async callOpenAI(prompt: string, context: string): Promise<string> {
    const response = await fetch('url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a writing assistant.' },
          { role: 'user', content: `${prompt}\n\nContext: ${context}` }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  }
}
```

### aiAssistantStopRespondingClick

Triggers when the user clicks the stop responding button in the AI Assistant. Helps cancel ongoing AI query requests.

**Event Type:** `EmitType<AIAssistantStopRespondingArgs>`

**Event Arguments:**
- `dataIndex` (number): Index of the prompt in the list
- `event` (Event): Event object associated with the action
- `prompt` (string): Prompt text associated with the request

**Example:**
```typescript
import { AIAssistantStopRespondingArgs } from '@syncfusion/ej2-angular-richtexteditor';

onAIStopResponding(args: AIAssistantStopRespondingArgs): void {
  console.log('Stop responding clicked for:', args.prompt);

  // Cancel ongoing API request
  if (this.currentAIRequest) {
    this.currentAIRequest.abort();
  }
}
```

### aiAssistantToolbarClick

Triggers when a user selects an item from the AI Assistant toolbar. Use this event to handle custom toolbar item clicks.

**Event Type:** `EmitType<AIAssitantToolbarClickEventArgs>`

**Event Arguments:**
- `cancel` (boolean): Set to `true` to cancel the default action
- `dataIndex` (number): Index of the message data (not applicable for header toolbar)
- `item` (IAIAssistantToolbarItem): Toolbar item that was clicked
- `originalEvent` (Event): Original event object
- `requestType` (AssistantToolbarType): Toolbar section where click occurred (Header, Prompt, Response, Footer)

**Example:**
```typescript
import { AIAssitantToolbarClickEventArgs } from '@syncfusion/ej2-angular-richtexteditor';

onAIToolbarClick(args: AIAssitantToolbarClickEventArgs): void {
  console.log('AI Toolbar item:', args.item.text);
  console.log('Request type:', args.requestType);

  // Handle custom toolbar actions
  if (args.item.command === 'CustomExport') {
    this.exportAIConversation();
    args.cancel = true; // Prevent default action
  }
}
```

---

## Media Events

### afterImageDelete

Triggers when a selected image is removed from the editor content.

**Event Type:** `EmitType<AfterImageDeleteEventArgs>`

**Event Arguments:**
- `element` (Node): Image DOM element that was deleted
- `src` (string): 'src' attribute of the deleted image

**Example:**
```typescript
import { AfterImageDeleteEventArgs } from '@syncfusion/ej2-angular-richtexteditor';

onAfterImageDelete(args: AfterImageDeleteEventArgs): void {
  console.log('Image deleted:', args.src);

  // Remove image from server
  this.http.delete(`/api/images?src=${encodeURIComponent(args.src)}`)
    .subscribe(
      () => console.log('Image removed from server'),
      (error) => console.error('Failed to delete image:', error)
    );
}
```

### afterMediaDelete

Triggers when selected media (audio/video) is removed from the editor content.

**Event Type:** `EmitType<AfterMediaDeleteEventArgs>`

**Event Arguments:**
- `element` (Node): Audio/video DOM element that was deleted
- `src` (string): 'src' attribute of the deleted media

**Example:**
```typescript
import { AfterMediaDeleteEventArgs } from '@syncfusion/ej2-angular-richtexteditor';

onAfterMediaDelete(args: AfterMediaDeleteEventArgs): void {
  console.log('Media deleted:', args.src);

  // Clean up server storage
  this.deleteMediaFromServer(args.src);
}
```

### beforeImageDrop

Triggers before an image is dropped into the editor.

**Event Type:** `EmitType<ImageDropEventArgs>`

**Event Arguments:**
- `cancel` (boolean): Set to `true` to prevent the drop
- `dataTransfer` (DataTransfer | null): DataTransfer object for the event
- `rangeOffset` (number): Offset value for the drop range
- `rangeParent` (Element): Parent element of the drop range
- Plus standard drag event properties

**Example:**
```typescript
import { ImageDropEventArgs } from '@syncfusion/ej2-angular-richtexteditor';

onBeforeImageDrop(args: ImageDropEventArgs): void {
  const files = args.dataTransfer?.files;
  if (files && files.length > 0) {
    const file = files[0];

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      args.cancel = true;
      alert('Image size must be less than 5MB');
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      args.cancel = true;
      alert('Only image files are allowed');
    }
  }
}
```

### beforeMediaDrop

Triggers before media (audio/video) is dropped into the editor.

**Event Type:** `EmitType<MediaDropEventArgs>`

**Event Arguments:**
- Similar to `beforeImageDrop` with additional `mediaType` property

**Example:**
```typescript
import { MediaDropEventArgs } from '@syncfusion/ej2-angular-richtexteditor';

onBeforeMediaDrop(args: MediaDropEventArgs): void {
  console.log('Media type:', args.mediaType);
  console.log('Drop position:', args.rangeOffset);

  if (args.mediaType === 'video' && !this.allowVideoUpload) {
    args.cancel = true;
    alert('Video uploads are not allowed');
  }
}
```

---

## Paste and Clipboard Events

### beforePasteCleanup

Triggers before cleaning up copied content.

**Event Type:** `EmitType<PasteCleanupArgs>`

**Event Arguments:**
- `filesData` (FileInfo[]): List of image file data pasted
- `value` (string): Content data from ClipboardEvent

**Example:**
```typescript
import { PasteCleanupArgs } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  template: `<ejs-richtexteditor (beforePasteCleanup)="onBeforePaste($event)"></ejs-richtexteditor>`,
  providers: [PasteCleanupService]
})
export class AppComponent {
  onBeforePaste(args: PasteCleanupArgs): void {
    console.log('Pasting content:', args.value);

    if (args.filesData.length > 0) {
      console.log(`Pasting ${args.filesData.length} images`);
    }

    if (args.value.includes('<script>')) {
      console.warn('Potentially harmful content detected');
    }
  }
}
```

### afterPasteCleanup

Triggers after cleaning up copied content.

**Event Type:** `EmitType<object>`

**Example:**
```typescript
onAfterPasteCleanup(): void {
  console.log('Paste cleanup completed');
  // Additional processing after paste
}
```

### beforeClipboardWrite

Triggers before setting copy or cut clipboard data.

**Event Type:** `EmitType<ClipboardWriteEventArgs>`

**Example:**
```typescript
onBeforeClipboardWrite(args: ClipboardWriteEventArgs): void {
  console.log('Content being copied/cut');
  this.logClipboardAction('copy');
}
```

---

## Toolbar Events

### toolbarClick

Triggers when a toolbar item is clicked.

**Event Type:** `EmitType<Object>`

**Example:**
```typescript
@Component({
  template: `<ejs-richtexteditor (toolbarClick)="onToolbarClick($event)"></ejs-richtexteditor>`,
  providers: [ToolbarService]
})
export class AppComponent {
  onToolbarClick(args: any): void {
    console.log('Toolbar item clicked:', args.item);

    // Custom handling for specific toolbar items
    if (args.item.subCommand === 'CustomButton') {
      this.handleCustomAction();
    }
  }
}
```

### updatedToolbarStatus

Triggers when the toolbar items status is updated (particularly undo/redo).

**Event Type:** `EmitType<ToolbarStatusEventArgs>`

**Event Arguments:**
- `html` (object): HTML toolbar status
- `markdown` (object): Markdown toolbar status
- `name` (string): Event name
- `redo` (boolean): Indicates if redo action can be performed
- `undo` (boolean): Indicates if undo action can be performed

**Example:**
```typescript
import { ToolbarStatusEventArgs } from '@syncfusion/ej2-angular-richtexteditor';

onToolbarStatusUpdate(args: ToolbarStatusEventArgs): void {
  console.log('Undo available:', args.undo);
  console.log('Redo available:', args.redo);

  // Update custom undo/redo buttons
  this.canUndo = args.undo;
  this.canRedo = args.redo;
}
```

### slashMenuItemSelect

Triggers when a slash menu item is selected.

**Event Type:** `EmitType<SlashMenuItemSelectArgs>`

**Event Arguments:**
- `cancel` (boolean): Set to `true` to cancel default action
- `isInteracted` (boolean): If triggered by user interaction
- `item` (HTMLLIElement): Selected list item
- `itemData` (ISlashMenuItem): Slash menu item data
- `originalEvent` (MouseEvent | KeyboardEvent | TouchEvent): Original event

**Example:**
```typescript
import { SlashMenuItemSelectArgs } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  template: `<ejs-richtexteditor (slashMenuItemSelect)="onSlashMenuSelect($event)"></ejs-richtexteditor>`,
  providers: [SlashMenuService]
})
export class AppComponent {
  onSlashMenuSelect(args: SlashMenuItemSelectArgs): void {
    console.log('Slash menu item:', args.itemData.text);
    console.log('Command:', args.itemData.command);

    // Handle custom slash commands
    if (args.itemData.command === 'custom-template') {
      this.insertCustomTemplate();
      args.cancel = true; // Prevent default action
    }
  }
}
```

---

## Upload Events

### beforeImageUpload

Triggers before the image upload process starts.

**Event Type:** `EmitType<BeforeUploadEventArgs>`

**Example:**
```typescript
@Component({
  template: `<ejs-richtexteditor (beforeImageUpload)="onBeforeImageUpload($event)"></ejs-richtexteditor>`,
  providers: [ImageService]
})
export class AppComponent {
  onBeforeImageUpload(args: BeforeUploadEventArgs): void {
    // Add custom headers to upload request
    args.currentRequest = args.currentRequest || [];
    args.currentRequest.push({ name: 'Authorization', value: `Bearer ${this.authToken}` });
  }
}
```

### imageUploading

Triggers when an image upload begins.

**Event Type:** `EmitType<UploadingEventArgs>`

**Example:**
```typescript
onImageUploading(args: UploadingEventArgs): void {
  this.showUploadProgress = true;
}
```

### imageUploadSuccess

Triggers when an image has been successfully uploaded to the server.

**Event Type:** `EmitType<ImageSuccessEventArgs>`

**Event Arguments:**
- `detectImageSource` (ImageInputSource): Detected image source
- `e` (object): Original event arguments
- `element` (HTMLElement): Image element
- `file` (FileInfo): File details
- `name` (string): Event name
- `operation` (string): Operation performed
- `response` (ResponseEventArgs): Response details
- `statusText` (string): Status text

**Example:**
```typescript
import { ImageSuccessEventArgs } from '@syncfusion/ej2-angular-richtexteditor';

onImageUploadSuccess(args: ImageSuccessEventArgs): void {
  console.log('Image uploaded:', args.file.name);

  this.uploadedImages.push({
    name: args.file.name,
    url: args.element.getAttribute('src')
  });
}
```

### imageUploadFailed

Triggers when there is an error during image upload.

**Event Type:** `EmitType<ImageFailedEventArgs>`

**Event Arguments:**
- `file` (FileInfo): File that failed to upload
- `name` (string): Event name
- `operation` (string): Operation attempted
- `response` (ResponseEventArgs): Response details
- `statusText` (string): Status text
- `e` (object): Original event

**Example:**
```typescript
import { ImageFailedEventArgs } from '@syncfusion/ej2-angular-richtexteditor';

onImageUploadFailed(args: ImageFailedEventArgs): void {
  console.error('Image upload failed:', args.file.name);
  alert(`Failed to upload ${args.file.name}: ${args.statusText}`);
}
```

### imageSelected

Triggers when an image is selected or dragged into the insert image dialog.

**Event Type:** `EmitType<SelectedEventArgs>`

**Example:**
```typescript
onImageSelected(args: SelectedEventArgs): void {
  console.log('Image selected for upload');
}
```

### imageRemoving

Triggers when a selected image is removed from the insert image dialog.

**Event Type:** `EmitType<RemovingEventArgs>`

**Example:**
```typescript
onImageRemoving(args: RemovingEventArgs): void {
  console.log('Image being removed from upload queue');
}
```

### beforeFileUpload

Triggers before media (audio/video) upload process starts.

**Event Type:** `EmitType<BeforeUploadEventArgs>`

**Example:**
```typescript
onBeforeFileUpload(args: BeforeUploadEventArgs): void {
  console.log('Media file upload starting');
}
```

### fileUploading

Triggers when media begins uploading.

**Event Type:** `EmitType<UploadingEventArgs>`

**Example:**
```typescript
onFileUploading(args: UploadingEventArgs): void {
  console.log('Uploading media file...');
}
```

### fileUploadSuccess

Triggers when media has been successfully uploaded.

**Event Type:** `EmitType<Object>`

**Example:**
```typescript
onFileUploadSuccess(): void {
  console.log('Media uploaded successfully');
}
```

### fileUploadFailed

Triggers when there is an error during media upload.

**Event Type:** `EmitType<Object>`

**Example:**
```typescript
onFileUploadFailed(): void {
  console.error('Media upload failed');
}
```

### fileSelected

Triggers when media is selected or dragged into the insert media dialog.

**Event Type:** `EmitType<SelectedEventArgs>`

**Example:**
```typescript
onFileSelected(args: SelectedEventArgs): void {
  console.log('Media file selected');
}
```

### fileRemoving

Triggers when selected media is removed from the insert media dialog.

**Event Type:** `EmitType<RemovingEventArgs>`

**Example:**
```typescript
onFileRemoving(args: RemovingEventArgs): void {
  console.log('Media file being removed');
}
```

---

## Document Import/Export Events

### documentExporting

Triggers just before PDF or Word export requests are dispatched, allowing customization of the outgoing request.

**Event Type:** `EmitType<ExportingEventArgs>`

**Event Arguments:**
- `currentRequest` ([key: string]: string)[]: HTTP headers to merge into the export request
- `customFormData` ([key: string]: Object)[]: Form-data entries to include
- `exportType` (ExportDocumentType): Export type (PDF or Word)

**Example:**
```typescript
import { ExportingEventArgs } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  template: `<ejs-richtexteditor (documentExporting)="onDocumentExporting($event)"></ejs-richtexteditor>`,
  providers: [ImportExportService]
})
export class AppComponent {
  onDocumentExporting(args: ExportingEventArgs): void {
    console.log('Exporting to:', args.exportType);

    // Add authentication headers
    args.currentRequest = args.currentRequest || [];
    args.currentRequest.push({
      name: 'Authorization',
      value: `Bearer ${this.authToken}`
    });

    // Add custom form data
    args.customFormData = args.customFormData || [];
    args.customFormData.push({
      name: 'userId',
      value: this.currentUser.id
    });
  }
}
```

### wordImporting

Triggers when a Word document import is initiated, allowing customization of the outgoing request.

**Event Type:** `EmitType<UploadingEventArgs>`

**Example:**
```typescript
onWordImporting(args: UploadingEventArgs): void {
  console.log('Importing Word document');

  args.currentRequest = args.currentRequest || [];
  args.currentRequest.push({
    name: 'Authorization',
    value: `Bearer ${this.authToken}`
  });
}
```
