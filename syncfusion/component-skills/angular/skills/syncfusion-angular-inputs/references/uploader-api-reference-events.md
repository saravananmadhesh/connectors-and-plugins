# API Reference & Events

## Table of Contents
- [Key Properties](#key-properties)
- [Common Events](#common-events)
- [Event Handler Patterns](#event-handler-patterns)
- [Examples](#examples)

## Key Properties

- `asyncSettings` — `saveUrl`, `removeUrl`
- `allowedExtensions` — string list of extensions
- `multiple` — allow multiple selection
- `minFileSize`, `maxFileSize` — validation limits

## Common Events

- `selected` — files chosen (pre-upload)
- `uploading` — progress updates
- `success` — single upload success
- `failure` — single upload failure
- `removed` — file removed

## Event Handler Patterns

Inspect event args to validate or modify `modifiedFilesData` during `selected`. Use `upload`/`abort` controls to manage flow.

## Examples

```ts
onSelected(args) {
  // validate then set args.modifiedFilesData
}

onSuccess(args) { console.log('uploaded', args); }
```
