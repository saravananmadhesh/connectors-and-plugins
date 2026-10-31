# Templates and Styling in ASP.NET Core Uploader

## Table of Contents
- [Overview](#overview)
- [Template Property](#template-property)
- [File List Template](#file-list-template)
- [Button Customization](#button-customization)
- [CSS Class Styling](#css-class-styling)
- [Theme Integration](#theme-integration)
- [Responsive Design](#responsive-design)

## Overview

The Uploader provides extensive customization through templates and CSS classes. Customize appearance without modifying core functionality using the `template` property for UI layout and CSS for styling.

**Customization Options:**
- File list item rendering
- Button text and appearance
- Upload progress display
- File preview
- Status indicators
- Responsive layout

## Template Property

The `template` property defines custom HTML for file list items:

### Basic Template

```html
<ejs-uploader id="uploader"
    template="<span class='file-name'>${name}</span> - ${size} bytes">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
```

### Template Variables

Available variables in template (use ES6 template literal syntax `${}`):

```
${name}              // File name
${size}              // File size in bytes
${type}              // File type/extension
${statusText}        // Upload status (e.g., "Uploaded")
```

## File List Template

Customize file list items with rich HTML:

### Enhanced File List Item

```html
<ejs-uploader id="uploader"
    template="<div class='file-item'><span class='file-icon'>📄</span><div class='file-info'><div class='file-name'>${name}</div><div class='file-size'>${size} bytes</div></div><span class='file-status'>${statusText}</span></div>">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>

<style>
.file-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
    gap: 10px;
}

.file-icon {
    font-size: 24px;
}

.file-info {
    flex: 1;
}

.file-name {
    font-weight: bold;
}

.file-size {
    color: #999;
    font-size: 12px;
}

.file-status {
    color: #4CAF50;
}
</style>
```

### File Preview Template with Progress

```html
<ejs-uploader id="uploader"
    template="<div class='file-preview'>
        <img src='#' alt='Preview' class='file-thumbnail'>
        <div class='file-details'>
            <p>${name}</p>
            <div class='progress-bar'>
                <div class='progress-fill' style='width: 0%'></div>
            </div>
            <span class='file-status'>${statusText}</span>
        </div>
    </div>"
    uploading="onUploading">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>

<style>
.file-preview {
    display: flex;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
    gap: 15px;
}

.file-thumbnail {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
}

.file-details {
    flex: 1;
}

.progress-bar {
    height: 4px;
    background: #e0e0e0;
    border-radius: 2px;
    margin: 5px 0;
}

.progress-fill {
    height: 100%;
    background: #4CAF50;
    border-radius: 2px;
    transition: width 0.3s;
}
</style>

<script>
function onUploading(args) {
    // args.e.loaded / args.e.total gives the upload progress
    // This event fires before upload; use progress event for live tracking
}
</script>
```

## Button Customization

Customize upload button text and appearance:

### Button Text with TagHelper

```html
<ejs-uploader id="uploader" autoUpload="false">
    <e-uploader-buttons browse="Choose Image"
                      upload="Start Upload"
                      clear="Remove All"></e-uploader-buttons>
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
```

### Styled Button Container

```html
<style>
/* Hide default buttons */
.e-uploader .e-upload-actions {
    display: none;
}

/* Custom buttons */
.custom-buttons {
    margin-top: 10px;
    display: flex;
    gap: 10px;
}

.btn-primary {
    background-color: #2196F3;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

.btn-primary:hover {
    background-color: #1976D2;
}

.btn-secondary {
    background-color: #f44336;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

.btn-secondary:hover {
    background-color: #d32f2f;
}
</style>

<ejs-uploader id="uploader">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>

<div class="custom-buttons">
    <button class="btn-primary" onclick="uploadFiles()">Upload Selected Files</button>
    <button class="btn-secondary" onclick="clearFiles()">Clear All</button>
</div>

<script>
function uploadFiles() {
    var uploader = document.getElementById('uploader').ej2_instances[0];
    uploader.upload(uploader.getFilesData());
}

function clearFiles() {
    var uploader = document.getElementById('uploader').ej2_instances[0];
    uploader.clearAll();
}
</script>
```

## CSS Class Styling

Customize Uploader appearance with CSS classes:

### Target Uploader Wrapper

```css
/* Uploader container */
.e-uploader {
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    background-color: #f9f9f9;
}

/* Drop area */
.e-uploader.e-file-select {
    background-color: #f5f5f5;
}

/* File list */
.e-uploader .e-file-select-wrap {
    margin-bottom: 15px;
}

/* Browse button */
.e-uploader .e-file-select .e-btn {
    background-color: #2196F3;
    border-color: #2196F3;
    color: white;
}

.e-uploader .e-file-select .e-btn:hover {
    background-color: #1976D2;
}

/* File list item */
.e-uploader .e-file-list {
    list-style: none;
}

.e-uploader .e-file-list-item {
    padding: 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.e-uploader .e-file-list-item:hover {
    background-color: #f5f5f5;
}

/* Success status */
.e-uploader .e-file-upload-success {
    color: #4CAF50;
}

/* Error status */
.e-uploader .e-file-upload-failed {
    color: #f44336;
}
```

## Theme Integration

Apply Syncfusion themes:

### Fluent Theme

```html
<head>
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/fluent.css" />
</head>

<ejs-uploader id="uploader">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
```

### Material Theme

```html
<head>
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/material.css" />
</head>

<ejs-uploader id="uploader">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
```

### Bootstrap 5 Theme

```html
<head>
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/bootstrap5.css" />
</head>

<ejs-uploader id="uploader">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
```

## Responsive Design

Make Uploader responsive for all screen sizes:

### Mobile-Responsive Layout

```html
<style>
/* Desktop */
.uploader-container {
    max-width: 500px;
}

/* Tablet */
@media (max-width: 768px) {
    .uploader-container {
        max-width: 100%;
    }
    
    .file-item {
        flex-direction: column;
    }
}

/* Mobile */
@media (max-width: 480px) {
    .e-uploader .e-file-select .e-btn {
        width: 100%;
    }
    
    .file-thumbnail {
        width: 40px;
        height: 40px;
    }
    
    .custom-buttons {
        flex-direction: column;
    }
    
    .btn-primary,
    .btn-secondary {
        width: 100%;
    }
}
</style>

<div class="uploader-container">
    <ejs-uploader id="uploader">
        <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
    </ejs-uploader>
</div>
```

### Fluid Container

```html
<style>
.uploader-fluid {
    width: 100%;
    max-width: 100%;
}

.e-uploader {
    width: 100%;
}

.e-file-list {
    width: 100%;
}
</style>

<ejs-uploader id="uploader"
    cssClass="uploader-fluid">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
```

## Complete Example: Custom Themed Uploader

```html
<style>
.custom-uploader {
    border: 2px dashed #667eea;
    border-radius: 12px;
    padding: 30px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    text-align: center;
    transition: all 0.3s ease;
}

.custom-uploader:hover {
    border-color: #764ba2;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.custom-uploader .e-file-select .e-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    padding: 10px 30px;
    font-weight: bold;
    border-radius: 20px;
}

.custom-uploader .e-file-select .e-btn:hover {
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}
</style>

<ejs-uploader id="uploader"
    multiple="true"
    autoUpload="false"
    allowedExtensions=".jpg,.png,.pdf,.doc,.docx"
    maxFileSize="5242880"
    cssClass="custom-uploader">
    <e-uploader-buttons browse="Select Files"
                      upload="Upload"
                      clear="Clear"></e-uploader-buttons>
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
```

## Summary

| Customization | Property | Example |
|---------------|----------|---------|
| File list HTML | `template` | Custom template HTML with `${name}`, `${size}` |
| Button text | `<e-uploader-buttons>` | `browse="Choose" upload="Upload" clear="Clear"` |
| CSS styling | `cssClass` | `cssClass="custom-class"` |
| Container width | CSS | `max-width: 500px;` |
| Responsive | CSS Media | `@media (max-width: 768px)` |
| Theme | CDN | `fluent.css`, `material.css` |
