# Getting Started with Angular Splitter

Learn how to install, import, and create your first Splitter component.

## Installation

### Install the Layouts Package

The Splitter component is part of the `@syncfusion/ej2-angular-layouts` package. Install it using npm:

```bash
npm install @syncfusion/ej2-angular-layouts --save
```

### Angular Version Compatibility

Syncfusion Angular packages support:
- **Ivy (Angular 12+)**: Default distribution for modern Angular
- **ngcc (Angular < 12)**: Legacy compatibility package

For Angular < 12, install the ngcc version:

```bash
npm install @syncfusion/ej2-angular-layouts@ngcc --save
```

## Module Import

### Standalone Component (Recommended - Angular 14+)

Import `SplitterModule` directly in your component:

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-splitter',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter height="250px" width="600px">
      <e-panes>
        <e-pane></e-pane>
        <e-pane></e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class AppComponent {}
```

### NgModule Import (Traditional)

For NgModule-based applications, import `SplitterModule` in your app module:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-root',
  template: `
    <ejs-splitter height="250px" width="600px">
      <e-panes>
        <e-pane></e-pane>
        <e-pane></e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class AppComponent {}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SplitterModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## CSS Theme Setup

### Add Theme Imports

Include Syncfusion CSS files in `src/styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/splitter/index.css";
```

### Available Themes

Replace `material3` with any of these options:
- `bootstrap5` - Bootstrap 5 theme
- `bootstrap` - Bootstrap 4 theme
- `fabric` - Microsoft Fabric theme
- `tailwind` - Tailwind CSS theme
- `material` - Material Design
- `highcontrast` - High contrast accessibility theme

## Basic Component Setup

### Minimal Splitter Example

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-basic-splitter',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <div id='container'>
      <ejs-splitter height='250px' width='600px'>
        <e-panes>
          <e-pane size='200px'>
            <ng-template #content>
              <div class='content'>Left Pane</div>
            </ng-template>
          </e-pane>
          <e-pane size='200px'>
            <ng-template #content>
              <div class='content'>Right Pane</div>
            </ng-template>
          </e-pane>
        </e-panes>
      </ejs-splitter>
    </div>
  `,
  styles: [`
    .content {
      padding: 20px;
      text-align: center;
    }
  `]
})
export class BasicSplitterComponent {}
```

## Component Structure

### XML-like Syntax

Splitter uses Syncfusion's element syntax:

```typescript
<ejs-splitter>                    <!-- Root component -->
  <e-panes>                       <!-- Panes container -->
    <e-pane>                      <!-- Individual pane -->
      <ng-template #content>      <!-- Pane content -->
        Content goes here
      </ng-template>
    </e-pane>
  </e-panes>
</ejs-splitter>
```

### Key Elements

- **`<ejs-splitter>`**: Main component container
  - `height`: Splitter container height
  - `width`: Splitter container width
  - `orientation`: "Horizontal" (default) or "Vertical"

- **`<e-panes>`**: Container for all panes (required)

- **`<e-pane>`**: Individual resizable pane
  - `size`: Pane size (pixels like "200px" or percentage like "30%")
  - `collapsible`: Enable collapse/expand icons (boolean)
  - `content`: String content (alternative to ng-template)

## Running the Application

### Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200` in your browser.

### Production Build

```bash
ng build
```

## Complete First Example

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <div style='margin: 20px'>
      <h2>My First Splitter</h2>
      <ejs-splitter height='300px' width='100%'>
        <e-panes>
          <e-pane size='200px'>
            <ng-template #content>
              <div style='padding: 15px'>
                <h3>Sidebar</h3>
                <p>Navigation menu goes here</p>
              </div>
            </ng-template>
          </e-pane>
          <e-pane>
            <ng-template #content>
              <div style='padding: 15px'>
                <h3>Main Content</h3>
                <p>Your content area</p>
              </div>
            </ng-template>
          </e-pane>
        </e-panes>
      </ejs-splitter>
    </div>
  `
})
export class AppComponent {}

bootstrapApplication(AppComponent).catch(err => console.error(err));
```

## Verification Checklist

Before proceeding to advanced features, verify:
- ✓ Package installed successfully
- ✓ SplitterModule imported in component
- ✓ CSS theme file imported
- ✓ Splitter renders in browser
- ✓ Panes are visible and draggable
- ✓ No console errors

## Next Steps

- **Layouts**: Create horizontal and vertical splits with [split-panes.md](split-panes.md)
- **Sizing**: Configure pane sizes with [pane-sizing.md](pane-sizing.md)
- **Interactivity**: Add collapsible panes with [expand-collapse.md](expand-collapse.md)
