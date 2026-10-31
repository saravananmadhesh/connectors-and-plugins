# Rich Text Editor Events

## Table of Contents
- [Lifecycle Events](#lifecycle-events)
- [Content Change Events](#content-change-events)
- [Action Events](#action-events)
- [Toolbar Events](#toolbar-events)
- [Dialog & Popup Events](#dialog--popup-events)
- [Media & File Events](#media--file-events)
- [Paste & Clipboard Events](#paste--clipboard-events)
- [AI Assistant Events](#ai-assistant-events)
- [Resize Events](#resize-events)
- [Selection Events](#selection-events)
- [Import / Export Events](#import--export-events)

---

## Lifecycle Events

### `created` — Type: `object` (plain)
Fires when the component is first rendered. No typed arguments.

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .Created("onCreated")
    .Render())

<script>
function onCreated(e) {
    console.log('RTE ready');
}
</script>
```

### `destroyed` — Type: `object` (plain)
Fires when the component is destroyed (unmounted / `destroy()` called). No typed arguments.

### `focus` — Type: `object` (plain)
Fires when the editor gains focus. No typed arguments.

### `blur` — Type: `object` (plain)
Fires when the editor loses focus. No typed arguments.

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .Focus("onFocus")
    .Blur("onBlur")
    .Render())

<script>
function onFocus(e) { console.log('focused'); }
function onBlur(e) { console.log('blurred'); }
</script>
```

---

## Content Change Events

### `change` ← most commonly used — Type: `ChangeEventArgs`
Fires on focus-out when content has been modified.

| Arg | Type | Description |
|---|---|---|
| `value` | `string` | Current HTML (or Markdown) content |
| `previousValue` | `string` | Previous content before the change |

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .Change("onChange")
    .Render())

<script>
function onChange(e) {
    console.log(e.value); // HTML string
    saveContent(e.value);
}
</script>
```

### `selectionChanged` — Type: `SelectionChangedEventArgs`
Fires when the user makes a non-empty text selection.

| Arg | Type | Description |
|---|---|---|
| `selectedContent` | `string` | Selected HTML content |

---

## Action Events

### `actionBegin` — Type: `ActionBeginEventArgs`
Fires **before** a toolbar command executes. Set `args.cancel = true` to prevent it.

| Arg | Type | Description |
|---|---|---|
| `cancel` | `boolean` | Set to `true` to abort the action |
| `requestType` | `string` | The command being executed (e.g. `'Bold'`, `'CreateLink'`) |

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .ActionBegin("onActionBegin")
    .Render())

<script>
function onActionBegin(e) {
    if (e.requestType === 'SourceCode') {
        e.cancel = true; // block source code view
    }
}
</script>
```

### `actionComplete` — Type: `ActionCompleteEventArgs`
Fires **after** a toolbar command finishes.

| Arg | Type | Description |
|---|---|---|
| `requestType` | `string` | The completed command |

---

## Toolbar Events

### `toolbarClick` — Type: `object` (plain)
Fires when any toolbar item is clicked.

| Arg | Type | Description |
|---|---|---|
| `item` | `ToolbarItemModel` | Clicked toolbar item |

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .ToolbarClick("onToolbarClick")
    .Render())

<script>
function onToolbarClick(e) {
    console.log('Toolbar item clicked:', e.item?.tooltipText);
}
</script>
```

---

## Dialog & Popup Events

### `beforeDialogOpen` — Type: `BeforeOpenEventArgs`
Fires before any insert dialog (Image, Link, Table, etc.) opens. Cancel with `args.cancel = true`.

| Arg | Type | Description |
|---|---|---|
| `cancel` | `boolean` | Set to prevent dialog open |

### `beforeDialogClose` — Type: `BeforeCloseEventArgs`
Fires before any dialog closes. Cancel with `args.cancel = true`.

| Arg | Type | Description |
|---|---|---|
| `cancel` | `boolean` | Set to prevent dialog close |

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .BeforeDialogOpen("onBeforeDialogOpen")
    .BeforeDialogClose("onBeforeDialogClose")
    .Render())

<script>
function onBeforeDialogOpen(e) {
    console.log('Dialog about to open');
}
function onBeforeDialogClose(e) {
    if (someCondition) e.cancel = true;
}
</script>
```

### `dialogOpen` / `dialogClose` — Type: `object` (plain)
Fire after a dialog opens or closes. No typed arguments.

### `beforePopupOpen` / `beforePopupClose` — Type: `BeforePopupOpenCloseEventArgs`
Fire before any popup opens or closes. Cancel with `args.cancel = true`.

| Arg | Type | Description |
|---|---|---|
| `cancel` | `boolean` | Set to prevent popup open/close |

---

## Media & File Events

### Image Events

| Event | When | Main Args |
|---|---|---|
| `beforeImageUpload` | Before image upload starts | `cancel`, `file` |
| `imageUploading` | During image upload progress | — |
| `imageUploadSuccess` | Image upload succeeded | `file`, `response` |
| `imageUploadFailed` | Image upload failed | `file`, `error` |
| `imageSelected` | Image file selected/dropped | `file` |
| `afterImageDelete` | Image removed from editor | — |
| `beforeImageDrop` | Before image dropped | — |

**Image Upload Success Example:**
```cshtml
@(Html.EJS().RichTextEditor("rte")
    .ToolbarSettings(e => e.Items((object)new[] { "Image" }))
    .InsertImageSettings(img => img.SaveUrl("/Home/UploadImage"))
    .ImageUploadSuccess("onImageUploadSuccess")
    .Render())

<script>
function onImageUploadSuccess(e) {
    var serverPath = JSON.parse(e.response.responseText).url;
    e.element.src = serverPath;
}
</script>
```

> **⚠️ Note:** For image events to fire, the `Image` toolbar item **must** be present in your toolbar configuration.

### Audio / Video Events

| Event | When | Main Args |
|---|---|---|
| `beforeFileUpload` | Before media upload starts | `cancel`, `file` |
| `fileUploading` | During media upload | — |
| `fileUploadSuccess` | Media upload succeeded | — |
| `fileUploadFailed` | Media upload failed | — |
| `fileSelected` | Media file selected/dropped | `file` |
| `afterMediaDelete` | Media removed from editor | — |
| `beforeMediaDrop` | Before media dropped | — |

---

## Paste & Clipboard Events

### `beforePasteCleanup` — Type: `PasteCleanupArgs`
Fires before pasted content is cleaned. Inspect or modify the pasted value.

| Arg | Type | Description |
|---|---|---|
| `value` | `string` | Pasted HTML content |

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .BeforePasteCleanup("onBeforePasteCleanup")
    .Render())

<script>
function onBeforePasteCleanup(e) {
    // Remove script tags
    e.value = e.value.replace(/<script[^>]*>[\s\S]*?<\/script>/g, "");
}
</script>
```

### `afterPasteCleanup` — Type: `object` (plain)
Fires after paste cleanup finishes. No typed arguments.

### `beforeSanitizeHtml` — Type: `BeforeSanitizeHtmlArgs`
Fires before HTML sanitization (HTML mode only).

| Arg | Type | Description |
|---|---|---|
| `cancel` | `boolean` | Set to cancel sanitization |

---

## AI Assistant Events

### `aiAssistantPromptRequest` — Type: `AIAssistantPromptRequestArgs`
Fires when the user submits a prompt in the AI Assistant. Use it to integrate a custom AI service.

| Arg | Type | Description |
|---|---|---|
| `cancel` | `boolean` | Set `true` to handle manually |
| `prompt` | `string` | User's prompt text |
| `html` | `string` | Selected HTML in editor |
| `text` | `string` | Selected plain text |

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .AiAssistantPromptRequest("onAiPromptRequest")
    .Render())

<script>
function onAiPromptRequest(e) {
    console.log("AI prompt:", e.prompt);
    
    fetch('/api/ai-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: e.prompt })
    })
    .then(res => res.json())
    .then(data => {
        var rte = document.getElementById('rte').ej2_instances[0];
        rte.addAIPromptResponse(data.response);
    });
}
</script>
```

### `aiAssistantToolbarClick` — Type: `AIAssistantToolbarClickEventArgs`
Fires when the user clicks an item in the AI Assistant response toolbar.

| Arg | Type | Description |
|---|---|---|
| `requestType` | `string` | Type of toolbar action |

### `aiAssistantStopRespondingClick` — Type: `AIAssistantStopRespondingArgs`
Fires when the user clicks "Stop responding" in the AI Assistant.

| Arg | Type | Description |
|---|---|---|
| `prompt` | `string` | The prompt being responded to |

---

## Resize Events

### `resizeStart` / `resizing` / `resizeStop` — Type: `ResizeArgs`
Fire during resize operations (table cells, images, video).

| Arg | Type | Description |
|---|---|---|
| `cancel` | `boolean` | Set on `resizeStart` to prevent resize |
| `requestType` | `string` | What is being resized (e.g. 'Image') |

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .EnableResize(true)
    .ResizeStart("onResizeStart")
    .Resizing("onResizing")
    .ResizeStop("onResizeStop")
    .Render())

<script>
function onResizeStart(e) {
    if (e.requestType === 'Image') {
        e.cancel = true; // prevent image resize
    }
}
function onResizing(e) {
    console.log('Resizing:', e.requestType);
}
function onResizeStop(e) {
    console.log('Resize stopped');
}
</script>
```

---

## Selection Events

### `beforeQuickToolbarOpen` — Type: `BeforeQuickToolbarOpenArgs`
Fires before the inline toolbar opens. Cancel with `args.cancel = true`.

| Arg | Type | Description |
|---|---|---|
| `cancel` | `boolean` | Set to prevent toolbar open |
| `targetElement` | `Element` | Element that triggered toolbar |

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .BeforeQuickToolbarOpen("onBeforeQuickToolbarOpen")
    .Render())

<script>
function onBeforeQuickToolbarOpen(e) {
    if (e.targetElement.tagName === 'IMG') {
        console.log('Opening toolbar for image');
    }
}
</script>
```

### `quickToolbarOpen` / `quickToolbarClose` — Type: `object` (plain)
Fire after the inline toolbar opens or closes. No typed arguments.

---

## Import / Export Events

### `wordImporting` — Type: `UploadingEventArgs`
Fires when a Word import upload begins. Use to add custom form data.

| Arg | Type | Description |
|---|---|---|
| `customFormData` | `object[]` | Custom form data to send |
| `cancel` | `boolean` | Set to cancel import |

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .WordImporting("onWordImporting")
    .Render())

<script>
function onWordImporting(e) {
    e.customFormData = [{ userId: '123', dept: 'admin' }];
}
</script>
```

### `documentExporting` — Type: `ExportingEventArgs`
Fires before Word/PDF export request is sent. Use to add custom form data.

| Arg | Type | Description |
|---|---|---|
| `exportType` | `string` | `'Word'` or `'Pdf'` |
| `customFormData` | `object[]` | Custom form data to send |

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .DocumentExporting("onDocumentExporting")
    .Render())

<script>
function onDocumentExporting(e) {
    if (e.exportType === 'Word') {
        e.customFormData = [{ userId: '42', format: 'docx' }];
    }
}
</script>
```

---
