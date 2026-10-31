# Events

All events available on the `RichTextEditor` component from `@syncfusion/ej2-richtexteditor`.

## Table of Contents
- [actionBegin](#actionbegin)
- [actionComplete](#actioncomplete)
- [afterImageDelete](#afterimagedelete)
- [afterMediaDelete](#aftermediadelete)
- [afterPasteCleanup](#afterpastecleanup)
- [aiAssistantPromptRequest](#aiassistantpromptrequest)
- [aiAssistantStopRespondingClick](#aiassistantstoprespondingclick)
- [aiAssistantToolbarClick](#aiassistanttoolbarclick)
- [beforeClipboardWrite](#beforeclipboardwrite)
- [beforeDialogClose](#beforedialogclose)
- [beforeDialogOpen](#beforedialogopen)
- [beforeFileUpload](#beforefileupload)
- [beforeImageDrop](#beforeimagedrop)
- [beforeImageUpload](#beforeimageupload)
- [beforeMediaDrop](#beforemediadrop)
- [beforePasteCleanup](#beforepastecleanup)
- [beforePopupClose](#beforepopupclose)
- [beforePopupOpen](#beforepopupopen)
- [beforeQuickToolbarOpen](#beforequicktoolbaropen)
- [beforeSanitizeHtml](#beforesanitizehtml)
- [blur](#blur)
- [change](#change)
- [created](#created)
- [destroyed](#destroyed)
- [dialogClose](#dialogclose)
- [dialogOpen](#dialogopen)
- [documentExporting](#documentexporting)
- [fileRemoving](#fileremoving)
- [fileSelected](#fileselected)
- [fileUploadFailed](#fileuploadfailed)
- [fileUploadSuccess](#fileuploadsuccess)
- [fileUploading](#fileuploading)
- [focus](#focus)
- [imageRemoving](#imageremoving)
- [imageSelected](#imageselected)
- [imageUploadFailed](#imageuploadfailed)
- [imageUploadSuccess](#imageuploadsuccess)
- [imageUploading](#imageuploading)
- [quickToolbarClose](#quicktoolbarclose)
- [quickToolbarOpen](#quicktoolbaropen)
- [resizeStart](#resizestart)
- [resizeStop](#resizestop)
- [resizing](#resizing)
- [selectionChanged](#selectionchanged)
- [slashMenuItemSelect](#slashmenuitemselect)
- [toolbarClick](#toolbarclick)
- [toolbarStatusUpdate](#toolbarstatusupdate)
- [updatedToolbarStatus](#updatedtoolbarstatus)
- [wordImporting](#wordimporting)

---

## actionBegin

**Type:** `EmitType<ActionBeginEventArgs>`

Triggers **before** executing a command via toolbar items. Set `args.cancel = true` to prevent the command from running.

**Event arguments (`ActionBeginEventArgs`):**

| Argument | Type | Required | Description |
|---|---|---|---|
| `cancel` | `boolean` | optional | Set to `true` to cancel the current action. |
| `name` | `string` | optional | Name of the event. |
| `originalEvent` | `MouseEvent \| KeyboardEvent \| DragEvent` | optional | The initiating browser event. |
| `requestType` | `string` | optional | Type of the current action. |
| `selectType` | `string` | optional | Whether the selection type is a dropdown. |

---

## actionComplete

**Type:** `EmitType<ActionCompleteEventArgs>`

Triggers **after** executing a command via toolbar items.

**Event arguments (`ActionCompleteEventArgs`):**

| Argument | Type | Description |
|---|---|---|
| `name` | `string` | Name of the event. |
| `editorMode` | `string` | Current mode of the editor (`'HTML'` or `'Markdown'`). |
| `event` | `MouseEvent \| KeyboardEvent` | The associated browser event. |
| `requestType` | `string` | Type of the current action. |

---

## afterImageDelete

**Type:** `EmitType<AfterImageDeleteEventArgs>`

Triggers when a selected image is **removed** from the editor content.

**Event arguments (`AfterImageDeleteEventArgs`):**

| Argument | Type | Required | Description |
|---|---|---|---|
| `element` | `Node` | optional | The deleted image DOM element. |
| `src` | `string` | optional | The `src` attribute of the deleted image. |

---

## afterMediaDelete

**Type:** `EmitType<AfterMediaDeleteEventArgs>`

Triggers when selected media (audio/video) is **removed** from the editor content.

**Event arguments (`AfterMediaDeleteEventArgs`):**

| Argument | Type | Required | Description |
|---|---|---|---|
| `element` | `Node` | optional | The deleted audio/video DOM element. |
| `src` | `string` | optional | The `src` attribute of the deleted media element. |

---

## afterPasteCleanup

**Type:** `EmitType<object>`

Triggers **after** cleaning up copied content during a paste operation.

---

## aiAssistantPromptRequest

**Type:** `EmitType<AIAssistantPromptRequestArgs>`

Triggers when a user sends a prompt to the AI Assistant via the slash menu. Use this event to handle the request with your preferred AI provider.

---

## aiAssistantStopRespondingClick

**Type:** `EmitType<AIAssistantStopRespondingArgs>`

Triggers when the user clicks the **Stop Responding** button in the AI Assistant. Use this to cancel the ongoing AI query.

---

## aiAssistantToolbarClick

**Type:** `EmitType<AIAssitantToolbarClickEventArgs>`

Triggers when a user selects an item from the AI Assistant toolbar (via mouse, touch, or keyboard). Use to handle custom toolbar item click actions.

---

## beforeClipboardWrite

**Type:** `EmitType<ClipboardWriteEventArgs>`

Triggers **before** copy or cut clipboard data is written to the clipboard.

---

## beforeDialogClose

**Type:** `EmitType<BeforeCloseEventArgs>`

Triggers **before** a dialog is closed. Set `args.cancel = true` to prevent closing.

**Event arguments:**

| Argument | Type | Description |
|---|---|---|
| `cancel` | `Boolean` | Set to `true` to prevent the dialog from closing. |

---

## beforeDialogOpen

**Type:** `EmitType<BeforeOpenEventArgs>`

Triggers **before** a dialog is opened. Set `args.cancel = true` to prevent opening.

**Event arguments:**

| Argument | Type | Description |
|---|---|---|
| `cancel` | `Boolean` | Set to `true` to prevent the dialog from opening. |

---

## beforeFileUpload

**Type:** `EmitType<BeforeUploadEventArgs>`

Triggers **before** the media (audio/video) upload process starts.

---

## beforeImageDrop

**Type:** `EmitType<ImageDropEventArgs>`

Triggers **before** an image is dropped into the editor.

---

## beforeImageUpload

**Type:** `EmitType<BeforeUploadEventArgs>`

Triggers **before** the image upload process starts.

---

## beforeMediaDrop

**Type:** `EmitType<MediaDropEventArgs>`

Triggers **before** a media file is dropped into the editor.

---

## beforePasteCleanup

**Type:** `EmitType<PasteCleanupArgs>`

Triggers **before** cleaning up copied content during a paste operation.

---

## beforePopupClose

**Type:** `EmitType<BeforePopupOpenCloseEventArgs>`

Triggers before a popup is about to **close**. Set `args.cancel = true` to prevent closing. Useful for cleaning up custom elements added to the popup.

**Event arguments:**

| Argument | Type | Description |
|---|---|---|
| `cancel` | `Boolean` | Set to `true` to prevent the popup from closing. |

---

## beforePopupOpen

**Type:** `EmitType<BeforePopupOpenCloseEventArgs>`

Triggers before a popup is about to **open**. Set `args.cancel = true` to prevent opening. Use to manipulate popup content or add custom logic.

**Event arguments:**

| Argument | Type | Description |
|---|---|---|
| `cancel` | `Boolean` | Set to `true` to prevent the popup from opening. |

---

## beforeQuickToolbarOpen

**Type:** `EmitType<BeforeQuickToolbarOpenArgs>`

Triggers **before** the quick toolbar opens.

---

## beforeSanitizeHtml

**Type:** `EmitType<BeforeSanitizeHtmlArgs>`

Triggers **before** sanitizing the editor value. Applicable only when `editorMode` is `'HTML'`.

---

## blur

**Type:** `EmitType<Object>`

Triggers when the Rich Text Editor **loses focus**.

---

## change

**Type:** `EmitType<ChangeEventArgs>`

Triggers when the Rich Text Editor **loses focus** and changes have been made to the content since the last save.

---

## created

**Type:** `EmitType<Object>`

Triggers when the Rich Text Editor is **rendered** for the first time.

---

## destroyed

**Type:** `EmitType<Object>`

Triggers when the Rich Text Editor is **destroyed**.

---

## dialogClose

**Type:** `EmitType<Object>`

Triggers **after** a dialog has been closed.

---

## dialogOpen

**Type:** `EmitType<Object>`

Triggers **when** a dialog is opened.

---

## documentExporting

**Type:** `EmitType<ExportingEventArgs>`

Triggers just **before** a PDF or Word export request is dispatched by the editor, allowing you to customize the outgoing HTTP request.

---

## fileRemoving

**Type:** `EmitType<RemovingEventArgs>`

Triggers when selected media is **removed** from the insert audio/video dialog.

---

## fileSelected

**Type:** `EmitType<SelectedEventArgs>`

Triggers when media is **selected or dragged** into the insert audio/video dialog.

---

## fileUploadFailed

**Type:** `EmitType<Object>`

Triggers when an **error occurs** during media upload.

---

## fileUploadSuccess

**Type:** `EmitType<Object>`

Triggers when media has been **successfully uploaded** to the server.

---

## fileUploading

**Type:** `EmitType<UploadingEventArgs>`

Triggers when media **begins uploading** in the insert audio/video dialog. Provides upload details through event arguments.

---

## focus

**Type:** `EmitType<Object>`

Triggers when the Rich Text Editor **gains focus**.

---

## imageRemoving

**Type:** `EmitType<RemovingEventArgs>`

Triggers when a selected image is **removed** from the insert image dialog.

---

## imageSelected

**Type:** `EmitType<SelectedEventArgs>`

Triggers when an image is **selected or dragged** into the insert image dialog.

---

## imageUploadFailed

**Type:** `EmitType<ImageFailedEventArgs>`

Triggers when an **error occurs** during image upload.

---

## imageUploadSuccess

**Type:** `EmitType<ImageSuccessEventArgs>`

Triggers when an image has been **successfully uploaded** to the server.

---

## imageUploading

**Type:** `EmitType<UploadingEventArgs>`

Triggers when an image **upload begins** in the insert image dialog. Provides upload details through event arguments.

---

## quickToolbarClose

**Type:** `EmitType<Object>`

Triggers **after** the quick toolbar has been closed.

---

## quickToolbarOpen

**Type:** `EmitType<Object>`

Triggers when the quick toolbar is **opened**.

---

## resizeStart

**Type:** `EmitType<ResizeArgs>`

Triggers when **resizing starts** for tables, images, videos, or the overall editor.

---

## resizeStop

**Type:** `EmitType<ResizeArgs>`

Triggers when **resizing stops** for tables, images, videos, or the overall editor.

---

## resizing

**Type:** `EmitType<ResizeArgs>`

Triggers **during resizing** of tables, images, videos, or the overall editor.

---

## selectionChanged

**Type:** `EmitType<SelectionChangedEventArgs>`

Triggers when a **non-empty text selection** is made or updated. Fires in both HTML and Markdown modes.

**Event arguments:**

| Argument | Type | Description |
|---|---|---|
| `selectedContent` | `string` | The currently selected content as a string. |
| `selection` | `Range` | The current selection range. |
| `editorMode` | `EditorMode` | Current editor mode (`'HTML'` or `'Markdown'`). |

**Example:**

```typescript
import {
  RichTextEditor, Toolbar, Image, Link, HtmlEditor,
  QuickToolbar, Table, SelectionChangedEventArgs,
} from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Image, Link, HtmlEditor, QuickToolbar, Table);

const editorObj: RichTextEditor = new RichTextEditor({
  selectionChanged: (args: SelectionChangedEventArgs): void => {
    console.log(args.selectedContent);
    console.log(args.selection);
    console.log(args.editorMode);
  },
});
editorObj.appendTo('#editor');
```

---

## slashMenuItemSelect

**Type:** `EmitType<SlashMenuItemSelectArgs>`

Triggers when a slash menu item is **selected** by the user (mouse, tap, or keyboard navigation).

---

## toolbarClick

**Type:** `EmitType<Object>`

Triggers when a Rich Text Editor **toolbar item is clicked**.

---

## toolbarStatusUpdate

**Type:** `EmitType<Object>`

> ⚠️ **Deprecated.** This event no longer works. Use [`updatedToolbarStatus`](#updatedtoolbarstatus) for undo/redo status tracking.

---

## updatedToolbarStatus

**Type:** `EmitType<ToolbarStatusEventArgs>`

Triggers when the **toolbar items status is updated** (e.g., undo/redo enabled state changes).

---

## wordImporting

**Type:** `EmitType<UploadingEventArgs>`

Triggers when a Word document **import is initiated**, allowing you to customize the outgoing HTTP request before it is sent.
