# Styling and Customization

## Table of Contents
- [Theme Application](#theme-application)
- [CSS Customization](#css-customization)
- [Separator Styling](#separator-styling)
- [RTL Support](#rtl-support)

---

## Theme Application

### Available Themes

Syncfusion provides multiple built-in themes:

- **bootstrap5** - Bootstrap 5 (modern, default-like)
- **bootstrap** - Bootstrap 4
- **fabric** - Microsoft Fabric design
- **tailwind** - Tailwind CSS theme
- **material** - Material Design
- **material3** - Material Design 3 (latest)
- **fluent** - Microsoft Fluent UI
- **highcontrast** - High contrast (accessibility)

### Import Theme in styles.css

```css
/* Material 3 Theme (Recommended) */
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-icons/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-angular-layouts/styles/material3.css';
```

### Bootstrap 5 Theme Example

```css
@import '../node_modules/@syncfusion/ej2-base/styles/bootstrap5.css';
@import '../node_modules/@syncfusion/ej2-icons/styles/bootstrap5.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/bootstrap5.css';
@import '../node_modules/@syncfusion/ej2-angular-layouts/styles/bootstrap5.css';
```

### Tailwind Theme Example

```css
@import '../node_modules/@syncfusion/ej2-base/styles/tailwind.css';
@import '../node_modules/@syncfusion/ej2-icons/styles/tailwind.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/tailwind.css';
@import '../node_modules/@syncfusion/ej2-angular-layouts/styles/tailwind.css';
```

### Component-Level Theme

Import theme in component styles:

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-themed-splitter',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter height='300px' width='100%'>
      <e-panes>
        <e-pane size='300px'></e-pane>
        <e-pane size='300px'></e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    @import '../node_modules/@syncfusion/ej2-angular-layouts/styles/material3.css';
  `]
})
export class ThemedSplitterComponent {}
```

---

## CSS Customization

### Custom Styles for Pane Content

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-custom-styled',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter height='300px' width='100%'>
      <e-panes>
        <e-pane size='300px'>
          <ng-template #content>
            <div class='pane-blue'>
              <h3>Blue Pane</h3>
              <p>Custom styled content</p>
            </div>
          </ng-template>
        </e-pane>
        <e-pane size='300px'>
          <ng-template #content>
            <div class='pane-green'>
              <h3>Green Pane</h3>
              <p>Different styling</p>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .pane-blue {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      height: 100%;
    }

    .pane-green {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      padding: 20px;
      height: 100%;
    }

    .pane-blue h3, .pane-green h3 {
      margin-top: 0;
    }
  `]
})
export class CustomStyledComponent {}
```

### Dark Mode Styling

```typescript
<ejs-splitter height='300px' width='100%'>
  <e-panes>
    <e-pane size='300px'>
      <ng-template #content>
        <div class='dark-pane'>
          <h3>Dark Theme</h3>
          <p>Professional dark appearance</p>
        </div>
      </ng-template>
    </e-pane>
    <e-pane size='300px'>
      <ng-template #content>
        <div class='light-pane'>
          <h3>Light Theme</h3>
          <p>Bright, clean look</p>
        </div>
      </ng-template>
    </e-pane>
  </e-panes>
</ejs-splitter>
```

```typescript
styles: [`
  .dark-pane {
    background-color: #1e1e1e;
    color: #d4d4d4;
    padding: 20px;
  }

  .light-pane {
    background-color: #ffffff;
    color: #333333;
    padding: 20px;
    border: 1px solid #ddd;
  }
`]
```

---

## Separator Styling

### Separator Size

Control separator thickness with `separatorSize` property:

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-separator-size',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <!-- Thin separator (default 4px) -->
    <ejs-splitter height='200px' width='100%' separatorSize='4'>
      <e-panes>
        <e-pane size='300px'></e-pane>
        <e-pane size='300px'></e-pane>
      </e-panes>
    </ejs-splitter>

    <br />

    <!-- Thick separator (8px) -->
    <ejs-splitter height='200px' width='100%' separatorSize='8'>
      <e-panes>
        <e-pane size='300px'></e-pane>
        <e-pane size='300px'></e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class SeparatorSizeComponent {}
```

### Separator Styling with CSS

```css
/* Target separator in horizontal splitter */
.e-splitter .e-split-bar {
  background-color: #ddd;
  border-left: 1px solid #bbb;
  border-right: 1px solid #bbb;
}

/* Separator hover effect */
.e-splitter .e-split-bar:hover {
  background-color: #007bff;
}

/* Cursor on separator */
.e-splitter .e-split-bar {
  cursor: col-resize; /* horizontal */
}

.e-splitter.e-vertical .e-split-bar {
  cursor: row-resize; /* vertical */
}

/* Vertical splitter separator */
.e-splitter.e-vertical .e-split-bar {
  background-color: #ddd;
  border-top: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
}
```

### Custom Separator Appearance

```typescript
@Component({
  selector: 'app-custom-separator',
  styles: [`
    :host ::ng-deep .e-splitter .e-split-bar {
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      width: 6px;
      border: none;
      border-radius: 3px;
    }

    :host ::ng-deep .e-splitter .e-split-bar:hover {
      background: linear-gradient(90deg, #764ba2 0%, #667eea 100%);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
  `]
})
export class CustomSeparatorComponent {}
```

### Separator Color Themes

```css
/* Professional gray */
.e-splitter .e-split-bar {
  background-color: #d0d0d0;
}

/* Modern blue */
.e-splitter .e-split-bar {
  background-color: #007bff;
}

/* Subtle light */
.e-splitter .e-split-bar {
  background-color: #efefef;
}

/* Dark accent */
.e-splitter .e-split-bar {
  background-color: #333333;
}
```

---

## RTL Support

### Enable RTL in Component

Use the `enableRtl` property for right-to-left layouts:

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-rtl-splitter',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter 
      height='300px' 
      width='100%'
      [enableRtl]='true'>
      <e-panes>
        <e-pane size='200px'>
          <ng-template #content>
            <div class='rtl-content'>
              <h3>اليمين</h3>
              <p>محتوى باللغة العربية</p>
            </div>
          </ng-template>
        </e-pane>
        <e-pane size='200px'>
          <ng-template #content>
            <div class='rtl-content'>
              <h3>اليسار</h3>
              <p>المزيد من المحتوى</p>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .rtl-content {
      padding: 20px;
      text-align: right;
      direction: rtl;
    }
  `]
})
export class RTLSplitterComponent {}
```

### Global RTL Setup

Set RTL for entire application:

```typescript
// In main.ts or app.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  ngOnInit() {
    // Set RTL for all components
    document.body.setAttribute('dir', 'rtl');
  }
}
```

### RTL with HTML Attribute

```html
<!-- In index.html -->
<html dir="rtl" lang="ar">
  <head>
    <meta charset="utf-8">
    <title>RTL App</title>
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>
```

---

## Globalization (i18n)

### Locale Support

Syncfusion supports multiple locales. Set locale for date/time pickers within splitter:

```typescript
import { Component, OnInit } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';
import { setCulture } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-locale-splitter',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter height='300px' width='100%'>
      <e-panes>
        <e-pane size='200px'>
          <ng-template #content>
            <div>English Content</div>
          </ng-template>
        </e-pane>
        <e-pane size='200px'>
          <ng-template #content>
            <div>日本語 コンテンツ</div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class LocaleSplitterComponent implements OnInit {
  ngOnInit() {
    // Set Japanese locale
    setCulture('ja');
  }
}
```

### Supported Locales

- `en` - English
- `es` - Spanish
- `fr` - French
- `de` - German
- `ja` - Japanese
- `zh` - Chinese
- `ar` - Arabic
- `pt` - Portuguese
- And many more...

---

## Complete Styling Example

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-styled-dashboard',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter 
      height='100vh' 
      width='100%'
      separatorSize='6'>
      <e-panes>
        <e-pane size='250px'>
          <ng-template #content>
            <div class='sidebar'>
              <h2>Dashboard</h2>
              <nav class='menu'>
                <a href='#'>Overview</a>
                <a href='#'>Analytics</a>
                <a href='#'>Reports</a>
              </nav>
            </div>
          </ng-template>
        </e-pane>
        <e-pane>
          <ng-template #content>
            <div class='content'>
              <h1>Welcome</h1>
              <p>Main content area</p>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .sidebar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      height: 100%;
      overflow: auto;
    }

    .sidebar h2 {
      margin: 0 0 30px 0;
      font-size: 24px;
    }

    .menu {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .menu a {
      color: white;
      text-decoration: none;
      padding: 12px 15px;
      border-radius: 6px;
      transition: background 0.3s;
    }

    .menu a:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .content {
      padding: 40px;
      background: white;
    }

    :host ::ng-deep .e-splitter .e-split-bar {
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      width: 6px;
      border: none;
    }

    :host ::ng-deep .e-splitter .e-split-bar:hover {
      background: linear-gradient(90deg, #764ba2 0%, #667eea 100%);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
  `]
})
export class StyledDashboardComponent {}
```

---

## Best Practices

✓ Always include all required CSS files for theme
✓ Test color contrast for accessibility (WCAG AA minimum)
✓ Use gradients and shadows sparingly for performance
✓ Consider RTL layouts if supporting Arabic/Hebrew
✓ Test on different browsers for styling compatibility
✓ Use CSS variables for theme-wide color changes

