# Accessibility and Localization — Syncfusion Angular Uploader

## Table of Contents
- [Accessibility Compliance](#accessibility-compliance)
- [Keyboard Interaction](#keyboard-interaction)
- [Screen Reader Support](#screen-reader-support)
- [Localization](#localization)
- [Localization Keys Reference](#localization-keys-reference)

---

## Accessibility Compliance

The Syncfusion Angular Uploader meets the following accessibility standards:

| Standard | Status |
|----------|--------|
| WCAG 2.2 | ✅ Full support |
| Section 508 | ✅ Full support |
| Screen Reader | ✅ Full support |
| Right-to-Left (RTL) | ✅ Full support |
| Color Contrast | ✅ Full support |
| Mobile Device | ✅ Full support |
| Keyboard Navigation | ✅ Full support |
| Accessibility Checker | ✅ Validated |
| axe-core | ✅ Validated |

The component is validated with [accessibility-checker](https://www.npmjs.com/package/accessibility-checker) and [axe-core](https://www.npmjs.com/package/axe-core) tools.

---

## Keyboard Interaction

| Keyboard Shortcut | Action |
|-------------------|--------|
| `Tab` | Move focus to the next focusable element |
| `Shift + Tab` | Move focus to the previous focusable element |
| `Enter` | Trigger the action associated with the focused button |
| `Esc` | Close the file browser dialog and cancel the upload operation |

**Example with keyboard-accessible uploader:**
```typescript
import { Component } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <!-- All interactive elements are keyboard-accessible by default -->
    <ejs-uploader
      [asyncSettings]="asyncSettings"
      [autoUpload]="false"
      [showCloseIcon]="true">
    </ejs-uploader>
  `
})
export class AppComponent {
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };
}
```

---

## Screen Reader Support

The Uploader component includes ARIA roles and attributes for screen reader compatibility:

- **Browse button** — has a descriptive `aria-label`
- **File list items** — each file has name, size, and status announced
- **Progress bar** — role and value exposed for screen readers
- **Action buttons** (Upload, Clear, Remove) — each has accessible labels

**Enabling RTL for right-to-left screen readers:**
```typescript
<ejs-uploader
  [asyncSettings]="asyncSettings"
  [enableRtl]="true"
  locale="ar">
</ejs-uploader>
```

---

## Localization

Customize all static text using the Syncfusion `L10n` class. This includes button labels, status messages, and tooltips:

```typescript
import { Component, OnInit } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { L10n } from '@syncfusion/ej2-base';

// Register locale before component renders
L10n.load({
  'fr-FR': {
    'uploader': {
      'Browse': 'Parcourir',
      'Clear': 'Effacer',
      'Upload': 'Télécharger',
      'dropFilesHint': 'ou déposez les fichiers ici',
      'uploadFailedMessage': 'Échec du téléchargement du fichier',
      'uploadSuccessMessage': 'Fichier téléchargé avec succès',
      'removedSuccessMessage': 'Fichier supprimé avec succès',
      'removedFailedMessage': 'Impossible de supprimer le fichier',
      'inProgress': 'Téléchargement en cours',
      'readyToUploadMessage': 'Prêt à télécharger',
      'abort': 'Annuler',
      'remove': 'Supprimer',
      'cancel': 'Annuler',
      'delete': 'Supprimer le fichier',
      'pauseUpload': 'Téléchargement en pause',
      'pause': 'Pause',
      'resume': 'Reprendre',
      'retry': 'Réessayer',
      'fileUploadCancel': 'Téléchargement annulé'
    }
  }
});

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-uploader
      [asyncSettings]="asyncSettings"
      locale="fr-FR">
    </ejs-uploader>
  `
})
export class AppComponent implements OnInit {
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  ngOnInit(): void {
    // L10n.load should be called before component initializes
  }
}
```

**German (de) example:**
```typescript
L10n.load({
  'de': {
    'uploader': {
      'Browse': 'Durchsuchen',
      'Clear': 'Löschen',
      'Upload': 'Hochladen',
      'dropFilesHint': 'oder Dateien hier ablegen',
      'uploadFailedMessage': 'Datei-Upload fehlgeschlagen',
      'uploadSuccessMessage': 'Datei erfolgreich hochgeladen',
      'removedSuccessMessage': 'Datei erfolgreich entfernt',
      'removedFailedMessage': 'Datei konnte nicht entfernt werden',
      'inProgress': 'Upload läuft',
      'readyToUploadMessage': 'Bereit zum Hochladen',
      'remove': 'Entfernen',
      'cancel': 'Abbrechen',
      'delete': 'Datei löschen',
      'pauseUpload': 'Upload pausiert',
      'fileUploadCancel': 'Upload abgebrochen'
    }
  }
});
```

---

## Localization Keys Reference

| Key | Default Value | Description |
|-----|---------------|-------------|
| `Browse` | `Browse...` | Text for the browse button |
| `Clear` | `Clear` | Text for the clear all button |
| `Upload` | `Upload` | Text for the upload button |
| `dropFilesHint` | `or Drop files here` | Text displayed in the drop area |
| `uploadFailedMessage` | `File failed to upload` | Status when upload fails |
| `uploadSuccessMessage` | `File uploaded successfully` | Status when upload succeeds |
| `removedSuccessMessage` | `File removed successfully` | Status when removal succeeds |
| `removedFailedMessage` | `File failed to remove` | Status when removal fails |
| `inProgress` | `Uploading` | Status while upload is in progress |
| `readyToUploadMessage` | `Ready to upload` | Status when file is queued |
| `abort` | `Abort` | Text for abort action |
| `remove` | `Remove` | Tooltip for remove icon |
| `cancel` | `Cancel` | Tooltip for cancel icon |
| `delete` | `Delete file` | Tooltip for delete icon |
| `pauseUpload` | `File upload paused` | Status when upload is paused |
| `pause` | `Pause` | Tooltip for pause icon |
| `resume` | `Resume` | Tooltip for resume icon |
| `retry` | `Retry` | Tooltip for retry icon |
| `fileUploadCancel` | `File upload canceled` | Status when upload is canceled |
| `invalidMaxFileSize` | `File size is too large` | Status for oversized files |
| `invalidFileType` | `File type is not allowed` | Status for invalid extension |
| `invalidMinFileSize` | `File size is too small` | Status for undersized files |
| `totalFiles` | `Total files` | Tooltip for total files count |
| `size` | `Size` | Tooltip for file size label |

> The `locale` property on the component overrides the global culture setting:
> ```html
> <ejs-uploader [asyncSettings]="asyncSettings" locale="ja"></ejs-uploader>
> ```
> Default global culture is `'en-US'`.
