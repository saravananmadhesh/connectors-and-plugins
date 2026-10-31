# Getting Started — Syncfusion Angular Uploader

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [CSS Imports](#css-imports)
- [Add Uploader to Component](#add-uploader-to-component)
- [Configure Async Settings](#configure-async-settings)
- [Custom Drop Area](#custom-drop-area)
- [Handle Success and Failure](#handle-success-and-failure)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Angular 12+ (Ivy compatible)
- Angular 19+ for standalone component architecture (recommended)

**Dependencies installed automatically by `ng add`:**
```
@syncfusion/ej2-angular-inputs
  └── @syncfusion/ej2-angular-base
  └── @syncfusion/ej2-angular-popups
  └── @syncfusion/ej2-angular-buttons
  └── @syncfusion/ej2-inputs
      ├── @syncfusion/ej2-base
      ├── @syncfusion/ej2-popups
      ├── @syncfusion/ej2-buttons
      └── @syncfusion/ej2-splitbuttons
```

---

## Installation

The recommended approach uses Angular CLI:

```bash
ng add @syncfusion/ej2-angular-inputs
```

This command:
- Adds the package and peer dependencies to `package.json`
- Imports the Uploader component in your application
- Registers the default Syncfusion material theme in `angular.json`

**Manual npm install (alternative):**
```bash
npm install @syncfusion/ej2-angular-inputs
```

> From v16.2.41+, the **EJ2 AJAX** library is integrated for upload server requests, which means Internet Explorer users need a `promise` polyfill library like bluebird.

---

## CSS Imports

Add to `src/styles.css` (component-specific imports):

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/uploader/index.css";
```

> Import order matters — follow the dependency chain shown above.

Available theme options: `material.css`, `material3.css`, `bootstrap5.css`, `fabric.css`, `fluent.css`, `highcontrast.css`

---

## Add Uploader to Component

### Standalone Component (Angular 19+)

```typescript
import { Component } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-uploader [autoUpload]="false"></ejs-uploader>`
})
export class AppComponent {}
```

### NgModule-based (Angular 12–18)

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, UploaderModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<ejs-uploader [autoUpload]="false"></ejs-uploader>`
})
export class AppComponent {}
```

---

## Configure Async Settings

The `asyncSettings` property configures the server endpoints for file save and remove operations:

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
      [autoUpload]="false">
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

**Minimal: Browse and auto-upload (no buttons shown)**
```typescript
<ejs-uploader [asyncSettings]="asyncSettings"></ejs-uploader>
// autoUpload defaults to true — files upload immediately after selection
```

**Manual upload with action buttons:**
```typescript
<ejs-uploader [asyncSettings]="asyncSettings" [autoUpload]="false"></ejs-uploader>
// Upload and Clear buttons are shown for manual control
```

---

## Custom Drop Area

By default, the uploader component itself acts as the drop zone. To use an external element:

```typescript
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div #dropTarget style="border: 2px dashed #ccc; padding: 40px; text-align: center;">
      Drop files here
    </div>
    <ejs-uploader
      [asyncSettings]="asyncSettings"
      [dropArea]="dropTargetElement">
    </ejs-uploader>
  `
})
export class AppComponent implements AfterViewInit {
  @ViewChild('dropTarget') dropTarget!: ElementRef;
  public dropTargetElement!: HTMLElement;

  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  ngAfterViewInit(): void {
    this.dropTargetElement = this.dropTarget.nativeElement;
  }
}
```

---

## Handle Success and Failure

Use the `success` event for both successful uploads and successful removals. Differentiate via `args.operation`:

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
      (success)="onSuccess($event)"
      (failure)="onFailure($event)">
    </ejs-uploader>
  `
})
export class AppComponent {
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  onSuccess(args: any): void {
    if (args.operation === 'upload') {
      console.log('Uploaded:', args.file.name);
      // Server response available in args.e.target.responseText
    } else if (args.operation === 'remove') {
      console.log('Removed:', args.file.name);
    }
  }

  onFailure(args: any): void {
    console.error('Failed:', args.operation, args.file.name);
  }
}
```

### Running the Application

```bash
ng serve
```

---

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| No styles applied | CSS imports missing or wrong order | Add all 5 CSS imports in correct dependency order |
| Files not uploading | `saveUrl` not configured or wrong endpoint | Verify `asyncSettings.saveUrl` points to a valid POST endpoint |
| "Remove" not working | `removeUrl` missing or server returns error | Configure `asyncSettings.removeUrl` to handle DELETE/POST with file name |
| Component not rendering | Module not imported | Add `UploaderModule` to `imports` (standalone) or `NgModule.imports` |
| CORS errors | Server doesn't allow cross-origin | Add CORS headers on server for your Angular dev origin |
| Upload button not shown | `autoUpload` is `true` (default) | Set `[autoUpload]="false"` to show Upload/Clear buttons |
