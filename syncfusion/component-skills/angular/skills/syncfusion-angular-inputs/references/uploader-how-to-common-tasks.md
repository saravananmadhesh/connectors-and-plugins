# How-To: Common Tasks & Recipes

## Table of Contents
- [Programmatic Upload](#programmatic-upload)
- [Invisible Upload](#invisible-upload)
- [Additional Data on Upload](#additional-data-on-upload)
- [Confirmation Dialog](#confirmation-dialog)
- [File Size & Type Validation](#file-size--type-validation)
- [Image Processing](#image-processing)
- [Button Customization](#button-customization)
- [UI Customization](#ui-customization)
- [File Operations](#file-operations)

## Programmatic Upload

Use `upload()` method to trigger upload programmatically. Retrieve selected files with `getFilesData()`.

```ts
@ViewChild('uploader') uploaderRef;

onUploadClick() {
  this.uploaderRef.upload(this.uploaderRef.getFilesData());
}
```

## Invisible Upload

Hide default UI and implement custom upload triggers via buttons or events. Set `autoUpload` to false and control flow with events and methods.

## Additional Data on Upload

Pass custom data with uploads via `formData` or event handlers to include metadata with each file.

```ts
onUploading(args) {
  args.customFormData = [{ key: 'userId', value: this.userId }];
}
```

## Confirmation Dialog

Show confirmation dialog before removing files using the `removing` event.

```ts
onRemoving(args) {
  if (!confirm('Remove this file?')) {
    args.cancel = true;
  }
}
```

## File Size & Type Validation

- **File Size:** Use `minFileSize`, `maxFileSize` properties
- **Total Size:** Track cumulative file size in `selected` event
- **MIME Type:** Validate via `allowedExtensions` or custom logic in `selected` event

## Image Processing

- **Preview Before Upload:** Use `selected` event to create preview URLs with FileReader
- **Resize Images:** Apply canvas resizing before upload
- **Convert Format:** Use canvas to convert images to binary/base64

```ts
onSelected(args) {
  args.filesData.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      // Create image preview
      this.previews.push(e.target.result);
    };
    reader.readAsDataURL(file.rawFile);
  });
}
```

## Button Customization

Customize browse/upload/remove buttons using `buttonText` property or replace with HTML templates.

## UI Customization

- **Hide Drop Area:** Set `dropArea` to empty or remove from template
- **Progress Bar:** Use progress template for custom styling
- **Item List:** Use item template for custom file list display

## File Operations

- **Detect File Input:** Check if uploader has input element via `FilesData`
- **Sort Files:** Reorder files in selected event before upload
- **Edit Uploaded Files:** Access `FilesData` to edit or remove after upload
- **External Button Trigger:** Bind external buttons to uploader methods

```ts
onSort() {
  this.uploader.getFilesData().sort((a, b) => a.name.localeCompare(b.name));
}
```

---

**Common Pattern: Programmatic + Validation + Custom UI**

```ts
onFileSelected(args) {
  // Validate
  const valid = args.filesData.every(f => f.size < 5000000); // 5MB
  if (!valid) { args.cancel = true; return; }
  
  // Show preview
  args.filesData.forEach(f => this.createPreview(f));
}

onUploadClick() {
  // Programmatic upload with additional data
  const formData = { userId: this.userId, ...this.metadata };
  this.uploader.upload(null); // uploads all
}
```
