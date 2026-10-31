# Styling and Appearance — Syncfusion Angular Uploader

## Table of Contents
- [CSS Class Reference](#css-class-reference)
- [Customize Wrapper Dimensions](#customize-wrapper-dimensions)
- [Customize Browse Button](#customize-browse-button)
- [Customize Drop Area Text](#customize-drop-area-text)
- [Customize File List Container](#customize-file-list-container)
- [Hide the Default Drop Area](#hide-the-default-drop-area)
- [Using cssClass Property](#using-cssclass-property)
- [RTL Support](#rtl-support)
- [Angular Encapsulation Considerations](#angular-encapsulation-considerations)

---

## CSS Class Reference

Key CSS classes for the Uploader component:

| Class | Element |
|-------|---------|
| `.e-upload.e-control-wrapper` | Main uploader wrapper container |
| `.e-upload .e-file-select-wrap` | Browse button and drop text container |
| `.e-upload .e-file-select-wrap .e-btn` | Browse button element |
| `.e-upload .e-file-select-wrap .e-file-drop` | Drag-and-drop hint text |
| `.e-upload .e-file-select` | File input select area |
| `.e-upload .e-file-drop` | Drop zone area |
| `.e-upload .e-upload-files` | File list container |
| `.e-upload .e-upload-files .e-upload-file-list` | Individual file list item |
| `.e-upload .e-upload-actions .e-btn` | Upload/Clear action buttons |
| `.e-upload-drag-hover` | Applied to drop area when files are dragged over |

---

## Customize Wrapper Dimensions

Control the size of the entire Uploader component:

```css
/* Set fixed dimensions on the wrapper */
.e-upload.e-control-wrapper,
.e-bigger.e-small .e-upload.e-control-wrapper {
  height: 300px;
  width: 500px;
}
```

---

## Customize Browse Button

Style the browse button with custom font, size, and colors:

```css
/* Browse button and action buttons */
.e-upload .e-file-select-wrap .e-btn,
.e-upload .e-upload-actions .e-btn,
.e-bigger.e-small .e-upload .e-file-select-wrap .e-btn,
.e-bigger.e-small .e-upload .e-upload-actions .e-btn {
  font-family: 'Segoe UI', sans-serif;
  height: 40px;
  background-color: #007bff;
  color: #ffffff;
  border-radius: 4px;
}

.e-upload .e-file-select-wrap .e-btn:hover,
.e-upload .e-upload-actions .e-btn:hover {
  background-color: #0056b3;
}
```

---

## Customize Drop Area Text

Change the font size and color of the drag-and-drop hint text:

```css
/* Drop area hint text */
.e-upload .e-file-select-wrap .e-file-drop,
.e-bigger.e-small .e-upload .e-file-select-wrap .e-file-drop {
  font-size: 16px;
  color: #666666;
  font-style: italic;
}
```

---

## Customize File List Container

Apply background and padding to the file list area:

```css
/* File list item background */
.e-upload .e-upload-files .e-upload-file-list {
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 4px;
}

/* Success state */
.e-upload .e-upload-files .e-upload-file-list.e-upload-success .e-file-name {
  color: #28a745;
}

/* Failure state */
.e-upload .e-upload-files .e-upload-file-list.e-upload-failed .e-file-name {
  color: #dc3545;
}
```

---

## Hide the Default Drop Area

To show only the browse button without the drag-and-drop zone:

```css
/* Hide main uploader container drop area */
.e-upload.e-control-wrapper {
  border: none;
}

/* Hide the file select area (drop zone) */
.e-upload .e-file-select {
  display: none;
}

/* Hide the drop hint text */
.e-upload .e-file-drop {
  display: none;
}
```

Or override in Angular component styles:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  template: `<ejs-uploader [asyncSettings]="asyncSettings"></ejs-uploader>`,
  styles: [`
    .e-upload .e-file-select,
    .e-upload .e-file-drop {
      display: none;
    }
  `]
})
export class AppComponent {
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };
}
```

---

## Using cssClass Property

Add custom CSS classes to the root element for scoped styling:

```typescript
import { Component } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-uploader
      [asyncSettings]="asyncSettings"
      cssClass="my-custom-uploader">
    </ejs-uploader>
  `,
  styles: [`
    /* Target only this uploader instance */
    :host ::ng-deep .my-custom-uploader.e-upload {
      border-color: #007bff;
      border-radius: 8px;
    }

    :host ::ng-deep .my-custom-uploader .e-file-select-wrap .e-btn {
      background: #007bff;
      color: white;
    }
  `]
})
export class AppComponent {
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };
}
```

---

## RTL Support

Enable right-to-left layout for Arabic, Hebrew, or other RTL languages:

```typescript
import { Component } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-uploader
      [asyncSettings]="asyncSettings"
      [enableRtl]="true">
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

## Angular Encapsulation Considerations

Angular's default `ViewEncapsulation.Emulated` prevents global styles from penetrating component boundaries. Use one of these approaches to apply custom Uploader styles:

**Option 1: `ViewEncapsulation.None`** (global scope — use carefully)
```typescript
@Component({
  encapsulation: ViewEncapsulation.None,
  styles: [`.e-upload { border-color: blue; }`]
})
```

**Option 2: `::ng-deep` selector** (deprecated but widely used)
```typescript
styles: [`:host ::ng-deep .e-upload { border-color: blue; }`]
```

**Option 3: Global styles in `styles.css`**
```css
/* styles.css — applies globally */
.e-upload.e-control-wrapper {
  border-radius: 8px;
}
```

**Option 4: `cssClass` + global styles** (recommended for scoping)
```typescript
// Component
cssClass="brand-uploader"

// styles.css
.brand-uploader.e-upload { border-color: #007bff; }
```
