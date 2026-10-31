# Appearance and Customization

## Table of Contents
- [Editor Dimensions](#editor-dimensions)
- [CSS Classes and Styling](#css-classes-and-styling)
- [Theme Customization](#theme-customization)
  - [Default CSS Override](#default-css-override)
  - [Block Editor CSS Classes and IDs](#block-editor-css-classes-and-ids)
  - [Block Editor CSS Variables](#block-editor-css-variables)
  - [Theme Customization Example](#theme-customization-example)
- [Custom CSS Variables](#custom-css-variables)
- [Font and Typography Customization](#font-and-typography-customization)
- [Color Schemes](#color-schemes)
- [Advanced Customization Examples](#advanced-customization-examples)
- [Using Theme Studio](#using-theme-studio)

## Editor Dimensions

### Width and Height Configuration

Set custom dimensions for the editor:

```typescript
@Component({
  selector: 'app-root',
  template: `
    <ejs-blockeditor 
      [width]="editorWidth"
      [height]="editorHeight"
    />
  `,
  standalone: true,
  imports: [BlockEditorModule]
})
export class AppComponent {
  public editorWidth = '100%';      // Width (string or number)
  public editorHeight = '500px';    // Height (string or number)
}
```

### Responsive Sizing

```typescript
@Component({
  selector: 'app-responsive-editor',
  template: `
    <ejs-blockeditor 
      [width]="getWidth()"
      [height]="getHeight()"
    />
  `,
  standalone: true,
  imports: [BlockEditorModule]
})
export class ResponsiveEditorComponent {
  public getWidth(): string {
    const width = window.innerWidth;
    if (width < 768) return '100%';
    if (width < 1024) return '90%';
    return '80%';
  }

  public getHeight(): string {
    const height = window.innerHeight;
    return Math.max(400, height - 150) + 'px';
  }

  constructor() {
    window.addEventListener('resize', () => {
      // Trigger resize detection
    });
  }
}
```

### Min/Max Constraints

```typescript
public editorConfig = {
  width: '100%',
  height: '600px',
  minHeight: '300px',
  maxHeight: '1000px',
  minWidth: '200px',
  maxWidth: 'none'
};
```

## CSS Classes and Styling

### Default Editor Classes

```css
/* Main editor container */
.ej-blockeditor {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #fff;
}

/* Content area */
.ej-blockeditor .content {
  padding: 16px;
  min-height: 300px;
}

/* Individual block */
.ej-blockeditor .block {
  margin: 8px 0;
  padding: 4px 0;
  position: relative;
}

/* Block placeholder */
.ej-blockeditor .block-placeholder {
  color: #999;
  font-style: italic;
}

/* Toolbar */
.ej-blockeditor .toolbar {
  display: flex;
  gap: 4px;
  padding: 8px;
  border-bottom: 1px solid #e0e0e0;
}

/* Toolbar buttons */
.ej-blockeditor .toolbar-button {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
  background-color: #fff;
}

.ej-blockeditor .toolbar-button:hover {
  background-color: #f5f5f5;
}

.ej-blockeditor .toolbar-button.active {
  background-color: #e3f2fd;
  border-color: #2196f3;
  color: #2196f3;
}
```

### Custom Styling Example

```css
.custom-editor {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  background-color: #fafafa;
}

.custom-editor .content {
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.custom-editor .block {
  transition: background-color 0.2s ease;
}

.custom-editor .block:hover {
  background-color: #f5f5f5;
}

.custom-editor .toolbar {
  background-color: #f5f5f5;
  border-radius: 4px 4px 0 0;
}
```

## Theme Customization

The Block Editor provides flexible theme customization options to help match the editor appearance with your application design. You can customize built-in themes by overriding CSS variables, targeting specific CSS classes/IDs, or create a fully customized theme using Syncfusion Theme Studio.

### Default CSS Override

The Block Editor uses CSS variables with the unified `--sf` naming convention. These variables control colors, typography, backgrounds, borders, icons, and other visual elements across the editor.

### Block Editor CSS Classes and IDs

| Selector                      | Purpose                            |
| ----------------------------- | ---------------------------------- |
| `.e-blockeditor`              | Main Block Editor element          |
| `.e-active`                   | Active Block Editor element        |
| `.e-selected`                 | Selected Block Editor element      |
| `.e-list-item`                | Dropdown or list item              |
| `.e-dropdownbase`             | Dropdown container                 |
| `.e-table-element`            | Block Editor table element         |
| `#blockeditor_contextmenu`    | Block Editor context menu          |
| `#blockeditor_code-ddl_popup` | Code block language dropdown popup |

### Block Editor CSS Variables

| Variable                               | Purpose                  |
| -------------------------------------- | ------------------------ |
| `--color-sf-content-bg-color`          | Content background       |
| `--color-sf-content-bg-color-hover`    | Hover background         |
| `--color-sf-content-bg-color-selected` | Selected background      |
| `--color-sf-content-bg-color-pressed`  | Pressed background       |
| `--color-sf-content-text-color`        | Content text color       |
| `--color-sf-content-text-color-alt1`   | Alternate text color     |
| `--color-sf-placeholder-text-color`    | Placeholder text color   |
| `--color-sf-border-light`              | Light border color       |
| `--color-sf-border`                    | Border color             |
| `--color-sf-border-hover`              | Hover border color       |
| `--color-sf-border-selected`           | Selected border color    |
| `--color-sf-primary`                   | Primary color            |
| `--color-sf-primary-bg-color`          | Primary background color |
| `--color-sf-primary-border-color`      | Primary border color     |
| `--color-sf-primary-text-color`        | Primary text color       |
| `--color-sf-icon-color`                | Icon color               |

### Theme Customization Example

The following example demonstrates how to customize the Block Editor appearance using CSS variable overrides with multiple built-in themes.

**app.ts**

```typescript
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockEditorModule, ContentType } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BlockEditorModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  public currentTheme = 'slateLightTheme';
  public availableThemes = [
    { name: 'Slate Light', value: 'slateLightTheme' },
    { name: 'Sage Green', value: 'sageGreenTheme' },
    { name: 'Dark Pro', value: 'darkProTheme' }
  ];

  public users = [
    {
      avatarUrl: 'https://ej2.syncfusion.com/demos/src/block-editor/images/andrew.png',
      id: 'user1',
      user: 'Andrews'
    }
  ];

  public blockData = [
    {
      blockType: 'Heading',
      properties: { level: 1 },
      content: [
        {
          contentType: ContentType.Text,
          content: 'Block Editor - All Block Types'
        }
      ]
    },
    {
      blockType: 'Paragraph',
      content: [
        {
          contentType: ContentType.Text,
          content: 'This sample shows every block type used once, including a '
        },
        {
          contentType: ContentType.Text,
          content: 'bold',
          properties: { styles: { bold: true } }
        },
        {
          contentType: ContentType.Text,
          content: ' word, a '
        },
        {
          contentType: ContentType.Link,
          content: 'link',
          properties: {
            url: 'https://ej2.syncfusion.com/documentation/block-editor/getting-started'
          }
        },
        {
          contentType: ContentType.Text,
          content: ', a mention '
        },
        {
          contentType: ContentType.Mention,
          properties: { userId: 'user1' }
        },
        {
          contentType: ContentType.Text,
          content: ', and a label '
        },
        {
          contentType: ContentType.Label,
          properties: { labelId: 'progress' }
        },
        {
          contentType: ContentType.Text,
          content: '.'
        }
      ]
    },
    {
      blockType: 'BulletList',
      content: [
        {
          contentType: ContentType.Text,
          content: 'Bullet list item'
        }
      ]
    },
    {
      blockType: 'NumberedList',
      content: [
        {
          contentType: ContentType.Text,
          content: 'Numbered list item'
        }
      ]
    },
    {
      blockType: 'Checklist',
      properties: {
        isChecked: true
      },
      content: [
        {
          contentType: ContentType.Text,
          content: 'Checklist item'
        }
      ]
    },
    {
      blockType: 'Quote',
      properties: {
        children: [
          {
            blockType: 'Paragraph',
            content: [
              {
                contentType: ContentType.Text,
                content: 'Quote block example.'
              }
            ]
          }
        ]
      }
    },
    {
      blockType: 'Code',
      content: [
        {
          contentType: ContentType.Text,
          content: 'function greet(name) {\n  return `Hello, ${name}!`;\n}'
        }
      ]
    },
    {
      blockType: 'CollapsibleParagraph',
      content: [
        {
          contentType: ContentType.Text,
          content: 'Toggle block example',
          properties: { styles: { bold: true } }
        }
      ],
      properties: {
        isExpanded: false,
        children: [
          {
            blockType: 'Paragraph',
            content: [
              {
                contentType: ContentType.Text,
                content: 'Collapsed content goes here.'
              }
            ]
          }
        ]
      }
    },
    {
      blockType: 'Image',
      properties: {
        src: './src/block-editor/images/overview.png',
        alt: 'Block Editor Image'
      }
    },
    {
      blockType: 'Table',
      properties: {
        columns: [
          { headerText: 'Name' },
          { headerText: 'Role' },
          { headerText: 'Status' }
        ],
        rows: [
          {
            cells: [
              {
                blocks: [
                  {
                    blockType: 'Paragraph',
                    content: [
                      {
                        contentType: ContentType.Text,
                        content: 'Arun Kumar'
                      }
                    ]
                  }
                ]
              },
              {
                blocks: [
                  {
                    blockType: 'Paragraph',
                    content: [
                      {
                        contentType: ContentType.Text,
                        content: 'Developer'
                      }
                    ]
                  }
                ]
              },
              {
                blocks: [
                  {
                    blockType: 'Paragraph',
                    content: [
                      {
                        contentType: ContentType.Text,
                        content: 'Active'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            cells: [
              {
                blocks: [
                  {
                    blockType: 'Paragraph',
                    content: [
                      {
                        contentType: ContentType.Text,
                        content: 'Divya Sharma'
                      }
                    ]
                  }
                ]
              },
              {
                blocks: [
                  {
                    blockType: 'Paragraph',
                    content: [
                      {
                        contentType: ContentType.Text,
                        content: 'Designer'
                      }
                    ]
                  }
                ]
              },
              {
                blocks: [
                  {
                    blockType: 'Paragraph',
                    content: [
                      {
                        contentType: ContentType.Text,
                        content: 'Active'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    {
      blockType: 'Divider'
    }
  ];

  ngOnInit(): void {
    this.applyTheme(this.currentTheme);
  }

  /**
   * Apply theme by adding/removing theme class from body element
   * Uses CSS custom properties defined in styles.css
   */
  applyTheme(themeName: string): void {
    // Remove all theme classes
    document.body.classList.remove(
      'slateLightTheme',
      'sageGreenTheme',
      'darkProTheme'
    );

    // Add selected theme class
    document.body.classList.add(themeName);

    // Update current theme
    this.currentTheme = themeName;
  }
}
```

**main.ts**

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app';
import 'zone.js';
bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

**app.html**

```html
<div class="container">
  <h2>Block Editor - Theme Customization</h2>

  <div class="theme-switcher">
    <button
      *ngFor="let theme of availableThemes"
      [class.active]="currentTheme === theme.value"
      (click)="applyTheme(theme.value)"
      class="theme-button">
      {{ theme.name }}
    </button>
  </div>

  <ejs-blockeditor
    id="blockeditor"
    width="100%"
    height="600px"
    [blocks]="blockData"
    [users]="users">
  </ejs-blockeditor>
</div>
```

**app.css**

```css
/* Theme Customization Styles */

#container {
  padding: 40px 20px;
  min-height: 100vh;
  box-sizing: border-box;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

h2 {
  margin: 0 0 16px;
  font-size: 2rem;
  color: inherit;
  font-weight: 600;
}

/* =====================================
   THEME SWITCHER
   ===================================== */

/* Theme button container */
.theme-switcher {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

/* Theme buttons */
.theme-switcher button {
  padding: 10px 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  background: #fff;
  color: #303030;
  font-weight: 600;
  transition: all 0.3s ease;
}

/* Theme button hover state */
.theme-switcher button:hover {
  background-color: #f0f0f0;
  border-color: #999;
}

/* Active theme button */
.theme-switcher button.active {
  background: inherit;
  border-color: inherit;
}

/* =====================================
   SLATE LIGHT THEME
   ===================================== */

/* Block Editor appearance */
.slateLightTheme .e-blockeditor {
  /* Background Colors */
  --color-sf-content-bg-color: #f8f7f4;
  --color-sf-content-bg-color-hover: #efede7;
  --color-sf-content-bg-color-selected: #e7e5df;
  --color-sf-content-bg-color-pressed: #dcd9d2;

  /* Text Colors */
  --color-sf-content-text-color: #2f3437;
  --color-sf-content-text-color-alt1: #1f2328;
  --color-sf-placeholder-text-color: #787774;

  /* Border Colors */
  --color-sf-border-light: #e7e5df;
  --color-sf-border: #d0cdc7;
  --color-sf-border-hover: #8b8b8b;
  --color-sf-border-selected: #5f5f5f;

  /* Primary Accent */
  --color-sf-primary: #2563eb;
  --color-sf-primary-bg-color: #2563eb;
  --color-sf-primary-border-color: #2563eb;
  --color-sf-primary-text-color: #ffffff;

  /* Icons */
  --color-sf-icon-color: #6b7280;

  background: #f8f7f4 !important;
  border: 1px solid #d0cdc7;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

/* Context menu and popup styling */
body.slateLightTheme #blockeditor_contextmenu,
body.slateLightTheme .e-content .e-dropdownbase,
body.slateLightTheme #blockeditor_code-ddl_popup {
  background: #ffffff;
  border: 1px solid #d0cdc7;
  color: #2f3437;
}

/* Dropdown items */
body.slateLightTheme #blockeditor_code-ddl_popup .e-list-item {
  background: #ffffff !important;
  color: #2f3437 !important;
}

/* Dropdown hover state */
body.slateLightTheme #blockeditor_code-ddl_popup .e-list-item:hover {
  background: #efede7 !important;
  color: #1f2328 !important;
}

/* Selected dropdown item */
body.slateLightTheme #blockeditor_code-ddl_popup .e-selected,
body.slateLightTheme #blockeditor_code-ddl_popup .e-active {
  background: #2563eb !important;
  color: #ffffff !important;
}

/* Table headers */
.slateLightTheme .e-blockeditor .e-table-element thead th {
  background: #2563eb !important;
  color: #ffffff !important;
}

/* =====================================
   SAGE GREEN THEME
   ===================================== */

/* Block Editor appearance */
.sageGreenTheme .e-blockeditor {
  /* Background Colors */
  --color-sf-content-bg-color: #f6f8f4;
  --color-sf-content-bg-color-hover: #edf2e8;
  --color-sf-content-bg-color-selected: #dfe8d5;
  --color-sf-content-bg-color-pressed: #d2dfc4;

  /* Text Colors */
  --color-sf-content-text-color: #2f3e2f;
  --color-sf-content-text-color-alt1: #243224;
  --color-sf-placeholder-text-color: #6b7a61;

  /* Border Colors */
  --color-sf-border-light: #dfe8d5;
  --color-sf-border: #c8d5b9;
  --color-sf-border-hover: #7a9b5f;
  --color-sf-border-selected: #6b8e23;

  /* Primary Accent */
  --color-sf-primary: #6b8e23;
  --color-sf-primary-bg-color: #6b8e23;
  --color-sf-primary-border-color: #6b8e23;
  --color-sf-primary-text-color: #ffffff;

  /* Icons */
  --color-sf-icon-color: #5f7d3b;

  background: #f6f8f4 !important;
  border: 1px solid #c8d5b9;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(107, 142, 35, 0.12);
}

/* Context menu and popup styling */
body.sageGreenTheme #blockeditor_contextmenu,
body.sageGreenTheme .e-content .e-dropdownbase,
body.sageGreenTheme #blockeditor_code-ddl_popup {
  background: #fbfcfa;
  border: 1px solid #c8d5b9;
  color: #2f3e2f;
}

/* Dropdown items */
body.sageGreenTheme #blockeditor_code-ddl_popup .e-list-item {
  background: #fbfcfa !important;
  color: #2f3e2f !important;
}

/* Dropdown hover state */
body.sageGreenTheme #blockeditor_code-ddl_popup .e-list-item:hover {
  background: #edf2e8 !important;
  color: #4d6530 !important;
}

/* Selected dropdown item */
body.sageGreenTheme #blockeditor_code-ddl_popup .e-selected,
body.sageGreenTheme #blockeditor_code-ddl_popup .e-active {
  background: #6b8e23 !important;
  color: #ffffff !important;
}

/* Table headers */
.sageGreenTheme .e-blockeditor .e-table-element thead th {
  background: #6b8e23 !important;
  color: #ffffff !important;
}

/* =====================================
   DARK PRO THEME
   ===================================== */

/* Block Editor appearance */
.darkProTheme .e-blockeditor {
  /* Background Colors */
  --color-sf-content-bg-color: #0d1117;
  --color-sf-content-bg-color-hover: #161b22;
  --color-sf-content-bg-color-selected: #21262d;
  --color-sf-content-bg-color-pressed: #30363d;

  /* Text Colors */
  --color-sf-content-text-color: #e6edf3;
  --color-sf-content-text-color-alt1: #ffffff;
  --color-sf-placeholder-text-color: #7d8590;

  /* Border Colors */
  --color-sf-border-light: #21262d;
  --color-sf-border: #30363d;
  --color-sf-border-hover: #58a6ff;
  --color-sf-border-selected: #58a6ff;

  /* Primary Accent */
  --color-sf-primary: #1f6feb;
  --color-sf-primary-bg-color: #1f6feb;
  --color-sf-primary-border-color: #1f6feb;
  --color-sf-primary-text-color: #ffffff;

  /* Icons */
  --color-sf-icon-color: #8b949e;

  background: #0d1117 !important;
  border: 1px solid #30363d;
  border-radius: 20px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.55);
}

/* Context menu and popup styling */
body.darkProTheme #blockeditor_contextmenu,
body.darkProTheme .e-content .e-dropdownbase,
body.darkProTheme #blockeditor_code-ddl_popup {
  background: #161b22;
  border: 1px solid #30363d;
  color: #e6edf3;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

/* Dropdown items */
body.darkProTheme #blockeditor_code-ddl_popup .e-list-item {
  background: #161b22 !important;
  color: #e6edf3 !important;
}

/* Dropdown hover state */
body.darkProTheme #blockeditor_code-ddl_popup .e-list-item:hover {
  background: #21262d !important;
  color: #ffffff !important;
}

/* Selected dropdown item */
body.darkProTheme #blockeditor_code-ddl_popup .e-selected,
body.darkProTheme #blockeditor_code-ddl_popup .e-active {
  background: #1f6feb !important;
  color: #ffffff !important;
}

/* Table headers */
.darkProTheme .e-blockeditor .e-table-element thead th {
  background: #1f6feb !important;
  color: #ffffff !important;
}

/* Active editor elements */
.darkProTheme .e-blockeditor .e-active,
.darkProTheme .e-blockeditor .e-selected {
  color: #58a6ff !important;
}

/* Links */
.darkProTheme .e-blockeditor a {
  color: #58a6ff !important;
}
```

## Custom CSS Variables

### Define CSS Variables

```css
:root {
  /* Color variables */
  --color-primary: #2196F3;
  --color-primary-light: #E3F2FD;
  --color-primary-dark: #1976D2;
  
  --color-secondary: #FF9800;
  --color-secondary-light: #FFE0B2;
  --color-secondary-dark: #F57C00;
  
  --color-background: #FFFFFF;
  --color-surface: #F5F5F5;
  --color-surface-variant: #EEEEEE;
  
  --color-text: #212121;
  --color-text-secondary: #666666;
  --color-text-disabled: #BDBDBD;
  
  --color-border: #E0E0E0;
  --color-divider: #BDBDBD;
  
  /* Spacing variables */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Typography variables */
  --font-family-base: 'Segoe UI', Tahoma, Geneva, sans-serif;
  --font-family-mono: 'Monaco', 'Courier New', monospace;
  
  --font-size-sm: 12px;
  --font-size-base: 14px;
  --font-size-lg: 16px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-loose: 1.8;
  
  /* Border variables */
  --border-radius-sm: 3px;
  --border-radius-md: 4px;
  --border-radius-lg: 8px;
  
  --border-width: 1px;
  --border-width-thick: 2px;
  
  /* Shadow variables */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12);
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.2);
}
```

### Use CSS Variables in Editor

```css
.ej-blockeditor {
  font-family: var(--font-family-base);
  background-color: var(--color-background);
  color: var(--color-text);
  border: var(--border-width) solid var(--color-border);
}

.ej-blockeditor .content {
  padding: var(--spacing-md);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
}

.ej-blockeditor .block {
  margin: var(--spacing-sm) 0;
  border-radius: var(--border-radius-sm);
}

.ej-blockeditor .toolbar {
  background-color: var(--color-surface);
  border-bottom: var(--border-width) solid var(--color-border);
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
}

.ej-blockeditor .toolbar-button {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  color: var(--color-text);
  background-color: var(--color-background);
  border: var(--border-width) solid var(--color-border);
}

.ej-blockeditor .toolbar-button:hover {
  background-color: var(--color-surface-variant);
}

.ej-blockeditor .toolbar-button.active {
  color: var(--color-primary);
  background-color: var(--color-primary-light);
  border-color: var(--color-primary);
}
```

## Font and Typography Customization

### Font Configuration

```typescript
public fontSettings = {
  fontFamily: 'Arial, sans-serif',
  fontSize: 14,
  lineHeight: 1.5,
  fontWeight: 400,
  letterSpacing: '0px'
};

@Component({
  selector: 'app-typography-editor',
  template: `<ejs-blockeditor [ngClass]="fontClass" />`,
  styles: [`
    .serif-font {
      font-family: Georgia, serif;
    }
    
    .sans-serif-font {
      font-family: 'Trebuchet MS', sans-serif;
    }
    
    .monospace-font {
      font-family: 'Courier New', monospace;
    }
  `],
  standalone: true,
  imports: [BlockEditorModule]
})
export class TypographyEditorComponent {
  public fontClass = 'sans-serif-font';

  public setFont(font: 'serif' | 'sans-serif' | 'monospace'): void {
    this.fontClass = font + '-font';
  }
}
```

### Heading Styles

```css
.ej-blockeditor h1 {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  margin-top: 24px;
  margin-bottom: 16px;
  color: var(--color-text);
}

.ej-blockeditor h2 {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.3;
  margin-top: 20px;
  margin-bottom: 12px;
}

.ej-blockeditor h3 {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.4;
  margin-top: 16px;
  margin-bottom: 10px;
}

.ej-blockeditor h4 {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5;
  margin-top: 12px;
  margin-bottom: 8px;
}

.ej-blockeditor p {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 12px;
}

.ej-blockeditor code {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  background-color: var(--color-surface);
  padding: 2px 4px;
  border-radius: 3px;
}
```

## Color Schemes

### Light Theme

```typescript
export const LIGHT_THEME = {
  primary: '#2196F3',
  secondary: '#FF9800',
  background: '#FFFFFF',
  surface: '#F5F5F5',
  text: '#212121',
  textSecondary: '#666666',
  border: '#E0E0E0',
  error: '#F44336',
  success: '#4CAF50',
  warning: '#FFC107',
  info: '#2196F3'
};
```

### Dark Theme

```typescript
export const DARK_THEME = {
  primary: '#90CAF9',
  secondary: '#FFCC80',
  background: '#121212',
  surface: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#BDBDBD',
  border: '#424242',
  error: '#EF5350',
  success: '#81C784',
  warning: '#FFD54F',
  info: '#64B5F6'
};
```

### High Contrast Theme

```typescript
export const HIGH_CONTRAST_THEME = {
  primary: '#0000FF',
  secondary: '#FFFF00',
  background: '#FFFFFF',
  surface: '#F0F0F0',
  text: '#000000',
  textSecondary: '#333333',
  border: '#000000',
  error: '#FF0000',
  success: '#008000',
  warning: '#CCAA00',
  info: '#0000FF'
};
```

### Theme Service

```typescript
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themes = {
    light: LIGHT_THEME,
    dark: DARK_THEME,
    'high-contrast': HIGH_CONTRAST_THEME
  };

  private currentTheme$ = new BehaviorSubject<string>('light');

  public setTheme(theme: string): void {
    if (this.themes[theme as keyof typeof this.themes]) {
      this.currentTheme$.next(theme);
      this.applyTheme(this.themes[theme as keyof typeof this.themes]);
    }
  }

  public getTheme(name: string): any {
    return this.themes[name as keyof typeof this.themes];
  }

  private applyTheme(theme: any): void {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--color-${this.kebabCase(key)}`, value as string);
    });
  }

  private kebabCase(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }
}
```

## Advanced Customization Examples

### Example 1: Custom Editor with Full Theming

```typescript
@Component({
  selector: 'app-themed-editor-full',
  template: `
    <div class="editor-wrapper" [attr.data-theme]="currentTheme">
      <div class="theme-selector">
        <button *ngFor="let theme of themes" 
                (click)="setTheme(theme)"
                [class.active]="currentTheme === theme">
          {{ theme | titlecase }}
        </button>
      </div>
      <ejs-blockeditor 
        #blockEditor
        class="custom-block-editor"
        [width]="'100%'"
        [height]="'600px'"
      />
    </div>
  `,
  styles: [`
    .editor-wrapper {
      padding: 20px;
    }

    [data-theme="light"] {
      --bg-primary: #fff;
      --text-primary: #333;
      --border-color: #ddd;
    }

    [data-theme="dark"] {
      --bg-primary: #1e1e1e;
      --text-primary: #fff;
      --border-color: #444;
    }

    [data-theme="high-contrast"] {
      --bg-primary: #fff;
      --text-primary: #000;
      --border-color: #000;
    }

    .custom-block-editor {
      background-color: var(--bg-primary);
      color: var(--text-primary);
      border: 2px solid var(--border-color);
    }

    .theme-selector {
      margin-bottom: 16px;
      display: flex;
      gap: 8px;
    }

    .theme-selector button {
      padding: 8px 16px;
      border: 1px solid var(--border-color);
      background-color: var(--bg-primary);
      color: var(--text-primary);
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    .theme-selector button.active {
      background-color: var(--text-primary);
      color: var(--bg-primary);
    }
  `],
  standalone: true,
  imports: [BlockEditorModule, CommonModule]
})
export class ThemedEditorFullComponent {
  public currentTheme = 'light';
  public themes = ['light', 'dark', 'high-contrast'];

  constructor(private themeService: ThemeService) {}

  public setTheme(theme: string): void {
    this.currentTheme = theme;
    this.themeService.setTheme(theme);
  }
}
```

### Example 2: Responsive Custom Styling

```typescript
@Component({
  selector: 'app-responsive-styled',
  template: `<ejs-blockeditor [ngClass]="'editor-' + screenSize" />`,
  styles: [`
    /* Mobile */
    .editor-xs {
      width: 100%;
      height: 400px;
    }

    .editor-xs ::ng-deep .toolbar {
      flex-wrap: wrap;
    }

    /* Tablet */
    .editor-sm {
      width: 90%;
      height: 500px;
      margin: 0 auto;
    }

    /* Desktop */
    .editor-md,
    .editor-lg {
      width: 80%;
      height: 600px;
      margin: 0 auto;
    }

    /* Large Desktop */
    .editor-xl {
      width: 1200px;
      height: 700px;
      margin: 0 auto;
    }
  `],
  standalone: true,
  imports: [BlockEditorModule]
})
export class ResponsiveStyledComponent {
  public screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  constructor() {
    this.updateScreenSize();
    window.addEventListener('resize', () => this.updateScreenSize());
  }

  private updateScreenSize(): void {
    const width = window.innerWidth;
    if (width < 576) this.screenSize = 'xs';
    else if (width < 768) this.screenSize = 'sm';
    else if (width < 992) this.screenSize = 'md';
    else if (width < 1200) this.screenSize = 'lg';
    else this.screenSize = 'xl';
  }
}
```

## Using Theme Studio

Syncfusion Theme Studio provides an advanced way to create a fully customized theme for the Block Editor and other EJ2 components.

1. Visit the [Syncfusion<sup style="font-size:70%">&reg;</sup> Theme Studio](https://ej2.syncfusion.com/themestudio/).
2. Select a base theme such as Material 3, Fluent 2, Bootstrap 5.3, or Tailwind 3.
3. Customize colors, typography, borders, and component styles.
4. Download the generated CSS file.
5. Include the generated theme in your application.

This approach ensures consistent styling across all Syncfusion components in your application.

