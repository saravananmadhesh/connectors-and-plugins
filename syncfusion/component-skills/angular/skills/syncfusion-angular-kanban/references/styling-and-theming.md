# Styling and Theming in Angular Kanban

## Table of Contents
- [Built-in Themes](#built-in-themes)
- [Applying Themes](#applying-themes)
- [CSS Variables](#css-variables)
- [Custom Card Styling](#custom-card-styling)
- [Dark Mode](#dark-mode)
- [RTL Support](#rtl-support)
- [Theme Studio](#theme-studio)

## Built-in Themes

Syncfusion provides 5 built-in themes:

| Theme | Best For | Description |
|-------|----------|-------------|
| **Material 3** | Modern apps | Latest Material Design (default) |
| **Material** | Material Design | Material Design v1 |
| **Bootstrap 5** | Bootstrap apps | Modern Bootstrap styling |
| **Bootstrap 4** | Bootstrap apps | Bootstrap v4 compatibility |
| **Fabric** | Microsoft apps | Fluent Design System |
| **High Contrast** | Accessibility | WCAG AA compliant |

## Applying Themes

### Add Theme CSS to styles.css

```css
/* Material 3 Theme (Default) */
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-kanban/styles/material3.css';

/* OR Bootstrap 5 Theme */
@import '../node_modules/@syncfusion/ej2-base/styles/bootstrap5.css';
@import '../node_modules/@syncfusion/ej2-kanban/styles/bootstrap5.css';

/* OR Fabric Theme */
@import '../node_modules/@syncfusion/ej2-base/styles/fabric.css';
@import '../node_modules/@syncfusion/ej2-kanban/styles/fabric.css';

/* OR High Contrast Theme */
@import '../node_modules/@syncfusion/ej2-base/styles/high-contrast.css';
@import '../node_modules/@syncfusion/ej2-kanban/styles/high-contrast.css';
```

### Theme-Specific CSS Paths

```css
/* Material 3 */
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';

/* Material */
@import '../node_modules/@syncfusion/ej2-base/styles/material.css';

/* Bootstrap 5 */
@import '../node_modules/@syncfusion/ej2-base/styles/bootstrap5.css';

/* Bootstrap 4 */
@import '../node_modules/@syncfusion/ej2-base/styles/bootstrap4.css';

/* Fabric */
@import '../node_modules/@syncfusion/ej2-base/styles/fabric.css';

/* High Contrast */
@import '../node_modules/@syncfusion/ej2-base/styles/high-contrast.css';
```

### Switch Themes Dynamically

```typescript
import { Component } from '@angular/core';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kanban-themes',
  standalone: true,
  imports: [CommonModule, KanbanModule],
  template: `
    <div style="margin-bottom: 20px;">
      <label>Select Theme:</label>
      <select (change)="onThemeChange($event)">
        <option value="material3">Material 3</option>
        <option value="bootstrap5">Bootstrap 5</option>
        <option value="fabric">Fabric</option>
        <option value="high-contrast">High Contrast</option>
      </select>
    </div>

    <ejs-kanban keyField="Status" [dataSource]="data">
      <e-columns>
        <e-column headerText="To Do" keyField="Open"></e-column>
        <e-column headerText="Done" keyField="Close"></e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanThemesComponent {
  data = [{ Id: 1, Status: 'Open', Summary: 'Task 1' }];

  onThemeChange(event: any): void {
    const theme = event.target.value;
    this.loadTheme(theme);
  }

  private loadTheme(theme: string): void {
    const themePath = `/assets/themes/${theme}.css`;
    
    // Remove existing theme link
    const existingLink = document.getElementById('theme-css');
    if (existingLink) {
      existingLink.remove();
    }

    // Add new theme link
    const link = document.createElement('link');
    link.id = 'theme-css';
    link.rel = 'stylesheet';
    link.href = themePath;
    document.head.appendChild(link);
  }
}
```

## CSS Variables

Customize theme colors using CSS variables:

```css
/* Material 3 Theme Variables */
:root {
  /* Primary colors */
  --ej2-primary: #6200EA;
  --ej2-primary-rgb: rgb(98, 0, 234);
  
  /* Surface and background */
  --ej2-surface: #FFFBFE;
  --ej2-surface-dim: #E8DEF8;
  --ej2-surface-bright: #FFFBFE;
  
  /* Card styling */
  --ej2-surface-variant: #F2E4F3;
  --ej2-outline: #79747E;
  
  /* Text colors */
  --ej2-on-primary: #FFFFFF;
  --ej2-on-surface: #1C1B1F;
  --ej2-on-surface-variant: #49454E;
}

/* Override for dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --ej2-primary: #D0BCFF;
    --ej2-surface: #1C1B1F;
    --ej2-on-surface: #E6E1E5;
  }
}
```

### Custom Kanban Colors

```css
/* Custom Kanban card colors */
:root {
  /* Card background */
  --kanban-card-bg: #FFFFFF;
  --kanban-card-border: #E0E0E0;
  
  /* Column header */
  --kanban-header-bg: #F5F5F5;
  --kanban-header-text: #333333;
  
  /* Swimlane */
  --kanban-swimlane-bg: #FAFAFA;
  
  /* Status colors */
  --kanban-priority-critical: #D32F2F;
  --kanban-priority-high: #F57C00;
  --kanban-priority-medium: #FBC02D;
  --kanban-priority-low: #388E3C;
}

.e-kanban .e-card {
  background-color: var(--kanban-card-bg);
  border: 1px solid var(--kanban-card-border);
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.e-kanban .e-column-header {
  background-color: var(--kanban-header-bg);
  color: var(--kanban-header-text);
}
```

## Custom Card Styling

### Card with Priority Color

```typescript
import { Component } from '@angular/core';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban-styling',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban keyField="Status" [cardSettings]="cardSettings">
    </ejs-kanban>
  `,
  styles: [`
    ::ng-deep .e-kanban .e-card {
      border-radius: 6px;
      padding: 12px;
      transition: all 0.3s ease;
    }

    ::ng-deep .e-kanban .e-card:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }

    ::ng-deep .e-kanban .e-card.priority-critical {
      border-left: 4px solid #D32F2F;
      background: #FFEBEE;
    }

    ::ng-deep .e-kanban .e-card.priority-high {
      border-left: 4px solid #F57C00;
      background: #FFF3E0;
    }

    ::ng-deep .e-kanban .e-card.priority-medium {
      border-left: 4px solid #FBC02D;
      background: #FFFDE7;
    }

    ::ng-deep .e-kanban .e-card.priority-low {
      border-left: 4px solid #388E3C;
      background: #E8F5E9;
    }
  `]
})
export class KanbanStylingComponent {
  cardSettings = {
    template: `
      <div class="priority-\${data.Priority?.toLowerCase()}">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <strong>\${data.Id}</strong>
          <span style="font-size: 12px; font-weight: bold;">\${data.Priority}</span>
        </div>
        <p style="margin: 8px 0;">\${data.Summary}</p>
        <div style="display: flex; gap: 8px; font-size: 11px; color: #666;">
          <span>👤 \${data.Assignee}</span>
          <span>⏱️ \${data.Estimate} hrs</span>
        </div>
      </div>
    `
  };

  data = [
    { Id: 1, Status: 'Open', Summary: 'Task 1', Priority: 'High', Assignee: 'Nancy', Estimate: 5 }
  ];
}
```

## Dark Mode

### Detect and Apply Dark Mode

```typescript
@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <button (click)="toggleDarkMode()">
      {{ isDarkMode ? '☀️ Light' : '🌙 Dark' }}
    </button>
    <ejs-kanban keyField="Status"></ejs-kanban>
  `,
  styles: [`
    :host.dark-mode {
      background-color: #121212;
      color: #E0E0E0;
    }

    :host.dark-mode ::ng-deep .e-kanban {
      background-color: #1E1E1E;
    }

    :host.dark-mode ::ng-deep .e-kanban .e-card {
      background-color: #2C2C2C;
      color: #E0E0E0;
      border-color: #424242;
    }

    :host.dark-mode ::ng-deep .e-kanban .e-column-header {
      background-color: #1F1F1F;
      color: #E0E0E0;
    }
  `]
})
export class KanbanDarkModeComponent {
  isDarkMode = this.prefersDarkMode();

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.applyDarkMode();
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyDarkMode();
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }

  private applyDarkMode(): void {
    if (this.isDarkMode) {
      this.renderer.addClass(this.el.nativeElement, 'dark-mode');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'dark-mode');
    }
  }

  private prefersDarkMode(): boolean {
    // Check localStorage first
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return saved === 'true';
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
```

## RTL Support

### Enable Right-to-Left Layout

```typescript
import { Component } from '@angular/core';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban-rtl',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <div [dir]="isRTL ? 'rtl' : 'ltr'">
      <button (click)="toggleRTL()">Toggle RTL</button>
      <ejs-kanban 
        keyField="Status"
        [enableRtl]="isRTL">
        <e-columns>
          <e-column headerText="انجام شده" keyField="Close"></e-column>
          <e-column headerText="درحال انجام" keyField="InProgress"></e-column>
          <e-column headerText="باقی مانده" keyField="Open"></e-column>
        </e-columns>
      </ejs-kanban>
    </div>
  `,
  styles: [`
    div[dir="rtl"] ::ng-deep .e-kanban {
      direction: rtl;
      text-align: right;
    }

    div[dir="rtl"] ::ng-deep .e-kanban .e-card {
      text-align: right;
    }
  `]
})
export class KanbanRTLComponent {
  isRTL = false;

  toggleRTL(): void {
    this.isRTL = !this.isRTL;
    localStorage.setItem('rtl', this.isRTL.toString());
  }
}
```

### RTL in HTML

```html
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <title>Kanban RTL</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

## Theme Studio

### Export and Use Custom Themes

Syncfusion provides Theme Studio for creating custom themes:

1. Visit: https://ej2.syncfusion.com/themestudio/
2. Customize colors and typography
3. Export CSS file
4. Import into your project

```css
/* Custom theme from Theme Studio */
@import 'custom-theme.css';
```

### Programmatic Theme Customization

```typescript
class ThemeCustomizer {
  static applyCustomTheme(colors: ThemeColors): void {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --primary-color: ${colors.primary};
        --secondary-color: ${colors.secondary};
        --surface-color: ${colors.surface};
        --text-color: ${colors.text};
      }
    `;
    document.head.appendChild(style);
  }
}

interface ThemeColors {
  primary: string;
  secondary: string;
  surface: string;
  text: string;
}

// Usage
ThemeCustomizer.applyCustomTheme({
  primary: '#6200EA',
  secondary: '#03DAC6',
  surface: '#FFFFFF',
  text: '#1C1B1F'
});
```

## Responsive Styling

```css
/* Desktop */
@media (min-width: 1024px) {
  .e-kanban .e-card {
    padding: 12px;
    font-size: 14px;
  }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  .e-kanban .e-card {
    padding: 10px;
    font-size: 13px;
  }
}

/* Mobile */
@media (max-width: 767px) {
  .e-kanban .e-card {
    padding: 8px;
    font-size: 12px;
  }

  .e-kanban .e-column {
    min-width: 100%;
  }
}
```
