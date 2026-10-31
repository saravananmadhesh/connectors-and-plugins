# File Validation

## Table of Contents
- [Overview](#overview)
- [File Type Validation](#file-type-validation)
- [File Size Validation](#file-size-validation)
- [File Count Limits](#file-count-limits)
- [Custom Validation](#custom-validation)
- [Error Handling](#error-handling)

## Overview

The Uploader validates files using `allowedExtensions`, `minFileSize`, and `maxFileSize`. Validation occurs on selection and drag-drop.

## File Type Validation

Use `allowedExtensions` as a comma-separated list, e.g. `.png,.jpg,.pdf`.

## File Size Validation

Set `minFileSize` and `maxFileSize` (bytes). Provide user-friendly messages when limits are exceeded.

## File Count Limits

Restrict number of files via UI and by modifying `selected` event args with `modifiedFilesData`.

## Custom Validation

Use the `selected` event to implement custom checks (file content, magic bytes) before assigning `modifiedFilesData`.

## Error Handling

Provide consistent UI feedback and map client-side validation errors to localized messages.
