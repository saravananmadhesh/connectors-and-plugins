# Getting Started with Angular Image Editor

## Installation and Setup

### Prerequisites

Ensure your development environment meets the system requirements for Syncfusion Angular UI Components.

### Install Angular CLI

```bash
npm install -g @angular/cli
```

### Create a New Application

```bash
ng new syncfusion-image-editor-app
cd syncfusion-image-editor-app
```

You can choose your preferred stylesheet format (CSS, SCSS, Less).

### Install Syncfusion Image Editor Package

Use Angular CLI's add command to install the package:

```bash
ng add @syncfusion/ej2-angular-image-editor
```

This command automatically:
- Adds `@syncfusion/ej2-angular-image-editor` and peer dependencies to `package.json`
- Imports the Image Editor component in your application
- Registers the default Syncfusion Material theme in `angular.json`

### Install for Legacy Projects (Angular 15 and Below)

For ngcc compatibility:

```bash
npm add @syncfusion/ej2-angular-image-editor@32.1.19-ngcc
```

## Module Import

In your component file, import the Image Editor module:

```typescript
import { ImageEditorModule } from '@syncfusion/ej2-angular-image-editor';
import { Component } from '@angular/core';

@Component({
  imports: [ImageEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-imageeditor></ejs-imageeditor>`
})
export class AppComponent { }
```

## CSS Configuration

### Using Material3 Theme (Recommended)

The Material theme is automatically added when you run `ng add`. If you need to add it manually:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/image-editor/index.css";
```

**Important:** Import CSS files in the order shown to ensure proper dependency resolution.

### Other Theme Options

- `material.css` - Standard Material theme
- `bootstrap.css` - Bootstrap theme
- `bootstrap5.css` - Bootstrap 5 theme
- `fabric.css` - Fabric theme
- `fluent.css` - Fluent theme
- `highcontrast.css` - High Contrast theme

## Basic Component Implementation

### Minimal Example

```typescript
import { Component } from '@angular/core';
import { ImageEditorModule } from '@syncfusion/ej2-angular-image-editor';

@Component({
  imports: [ImageEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div style="width: 550px; height: 350px;">
      <ejs-imageeditor></ejs-imageeditor>
    </div>
  `
})
export class AppComponent { }
```

### With Initial Image

```typescript
import { Component, ViewChild } from '@angular/core';
import { ImageEditorModule, ImageEditorComponent } from '@syncfusion/ej2-angular-image-editor';

@Component({
  imports: [ImageEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div style="width: 550px; height: 350px;">
      <ejs-imageeditor 
        #imageEditor
        [created]="onCreated"
      ></ejs-imageeditor>
    </div>
  `
})
export class AppComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  onCreated() {
    this.imageEditor?.open('image.png');
  }
}
```

## Running the Application

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser.

## Dependencies

The Image Editor component has the following dependencies:

```
@syncfusion/ej2-angular-image-editor
├── @syncfusion/ej2-angular-base
└── @syncfusion/ej2-image-editor
    ├── @syncfusion/ej2-base
    ├── @syncfusion/ej2-data
    ├── @syncfusion/ej2-buttons
    ├── @syncfusion/ej2-lists
    ├── @syncfusion/ej2-dropdowns
    ├── @syncfusion/ej2-inputs
    ├── @syncfusion/ej2-navigations
    ├── @syncfusion/ej2-popups
    └── @syncfusion/ej2-splitbuttons
```

These dependencies are automatically installed with `ng add`.

## Supported Angular Versions

- Angular 21 and above (recommended)
- Angular 19, 20
- Angular 12-18 with compatibility considerations

## First Render

After installation, the Image Editor renders in the template with:
- Empty canvas ready for image loading
- Toolbar with default editing tools
- Ready to handle user interactions

Use the `open()` method to load an image after the component is initialized using the `created` event or `@ViewChild` reference.

## Troubleshooting

**Issue:** Module not found error
- **Solution:** Run `npm install` to ensure all dependencies are installed

**Issue:** Styles not applied
- **Solution:** Verify CSS imports are in the correct order and point to the correct theme folder

**Issue:** Image Editor not rendering
- **Solution:** Ensure the container has specified `width` and `height` styles
