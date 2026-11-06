# Drag & Drop Upload

## Table of Contents
- [Enable Drag & Drop](#enable-drag--drop)
- [Drop Zone Configuration](#drop-zone-configuration)
- [Drop Events](#drop-events)
- [Feedback Patterns](#feedback-patterns)

## Enable Drag & Drop

Set `dropArea` or enable default drop zone by allowing the component to accept drag events. Provide visual affordances to guide users.

```html
<ejs-uploader id="uploader" [asyncSettings]="asyncSettings"></ejs-uploader>
```

## Drop Zone Configuration

Customize the drop area by passing an element selector to `dropArea` and applying CSS classes for hover/active states.

## Drop Events

Handle `selected` and `uploading` events to inspect files added via drag-and-drop and to validate before uploading.

## Feedback Patterns

- Use progress bars and item-level statuses
- Show count badges for multiple items
- Provide clear error messages on validation failures
