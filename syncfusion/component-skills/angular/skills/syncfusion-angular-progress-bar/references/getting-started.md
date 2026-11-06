# Getting Started with Angular Progress Bar

## Table of Contents

- [Installation](#installation)
  - [Step 1: Install the Progress Bar Package](#step-1-install-the-progress-bar-package)
  - [Step 2: Verify Installation](#step-2-verify-installation)
- [Dependencies](#dependencies)
- [Module Setup](#module-setup)
  - [Angular Standalone Components (Recommended)](#angular-standalone-components-recommended)
  - [Traditional NgModule Setup (Angular <19)](#traditional-ngmodule-setup-angular-19)
- [Basic Implementation](#basic-implementation)
  - [Minimal Component](#minimal-component)
  - [Component with Type Property](#component-with-type-property)
- [First Example](#first-example)
- [Angular Standalone Architecture](#angular-standalone-architecture)
  - [Import in Component](#import-in-component)
  - [Benefits](#benefits)
  - [Bootstrap Application](#bootstrap-application)
- [Common Setup Issues](#common-setup-issues)
  - [Issue: Module Not Found Error](#issue-module-not-found-error)
  - [Issue: Type Not Found in Template](#issue-type-not-found-in-template)

## Installation

### Step 1: Install the Progress Bar Package

```bash
npm install @syncfusion/ej2-angular-progressbar
```

This will install the Progress Bar component and its dependencies.

### Step 2: Verify Installation

Check your `package.json` to confirm the package is listed:

```json
{
  "dependencies": {
    "@syncfusion/ej2-angular-progressbar": "^25.1.0",
    "@angular/common": "^21.0.0",
    "@angular/core": "^21.0.0"
  }
}
```

## Dependencies

The Progress Bar component requires these minimum dependencies:

```
@syncfusion/ej2-angular-progressbar
├── @syncfusion/ej2-base
├── @syncfusion/ej2-data
└── @syncfusion/ej2-svg-base
```

These are automatically installed with the main package.

## Module Setup

### Angular Standalone Components (Recommended)

For Angular 19+, use standalone components directly:

```typescript
import { Component } from '@angular/core';
import { ProgressBarModule } from '@syncfusion/ej2-angular-progressbar';

@Component({
  selector: 'app-progress-demo',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <ejs-progressbar [value]="50"></ejs-progressbar>
  `
})
export class ProgressDemoComponent {}
```

### Traditional NgModule Setup (Angular <19)

If using module-based architecture:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProgressBarModule } from '@syncfusion/ej2-angular-progressbar';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ProgressBarModule  // Add here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Basic Implementation

### Minimal Component

The simplest Progress Bar requires only:

```typescript
import { Component } from '@angular/core';
import { ProgressBarModule } from '@syncfusion/ej2-angular-progressbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <ejs-progressbar 
      [value]="65">
    </ejs-progressbar>
  `
})
export class AppComponent {
}
```

This renders a linear progress bar at 65% completion.

### Component with Type Property

Specify the progress bar shape:

```typescript
@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <ejs-progressbar 
      [value]="75"
      type="Linear">
    </ejs-progressbar>
  `
})
export class ProgressComponent {
}
```

**Valid types:**
- `Linear` - Horizontal or vertical bar (default)
- `Circular` - Circular shape

## First Example

Complete working example with all essential parts:

```typescript
import { Component } from '@angular/core';
import { ProgressBarModule } from '@syncfusion/ej2-angular-progressbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="margin: 20px;">
      <h3>File Download Progress</h3>
      
      <!-- Linear Progress Bar -->
      <div style="margin: 20px 0;">
        <label>Download (Linear)</label>
        <ejs-progressbar 
          id='linearProgress'
          [value]="downloadProgress"
          type="Linear">
        </ejs-progressbar>
        <p>{{ downloadProgress }}%</p>
      </div>

      <!-- Circular Progress Bar -->
      <div style="margin: 20px 0;">
        <label>Upload (Circular)</label>
        <ejs-progressbar 
          [value]="uploadProgress"
          type="Circular">
        </ejs-progressbar>
        <p>{{ uploadProgress }}%</p>
      </div>

      <button (click)="startProgress()">Start Progress</button>
    </div>
  `,
  styles: [`
    button {
      padding: 8px 16px;
      margin-top: 20px;
      background-color: #0078d4;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 4px;
    }
    button:hover {
      background-color: #005a9e;
    }
  `]
})
export class AppComponent {
  downloadProgress = 30;
  uploadProgress = 60;

  startProgress() {
    const interval = setInterval(() => {
      this.downloadProgress += 5;
      this.uploadProgress += 3;

      if (this.downloadProgress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  }
}
```

**HTML Output:** Three progress bars demonstrating different shapes with a button to animate progress.

## Angular Standalone Architecture

Starting with Angular 19, standalone components are the default. Key differences:

### Import in Component
```typescript
import { ProgressBarModule } from '@syncfusion/ej2-angular-progressbar';

@Component({
  standalone: true,
  imports: [ProgressBarModule]  // Direct import
})
export class MyComponent {}
```

### Benefits
- No module declarations needed
- Smaller initial bundle
- Tree-shaking friendly
- Simpler mental model

### Bootstrap Application
```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import 'zone.js';

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));
```

## Common Setup Issues

### Issue: Module Not Found Error
**Solution:** Reinstall the package:
```bash
npm install @syncfusion/ej2-angular-progressbar --save
```

### Issue: Type Not Found in Template
**Solution:** Ensure `ProgressBarModule` is imported in the component's `imports` array (standalone) or in `NgModule` (traditional).
