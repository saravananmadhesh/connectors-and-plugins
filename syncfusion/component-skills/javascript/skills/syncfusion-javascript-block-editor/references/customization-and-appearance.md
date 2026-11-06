# Customization and Appearance Reference

Complete reference for customizing the appearance and styling of the Syncfusion JavaScript BlockEditor.

## Table of Contents

- [Overview](#overview)
- [Font Color Customization](#font-color-customization)
  - [Configuration](#font-color-configuration)
  - [Predefined Colors](#predefined-font-colors)
  - [Custom Color Picker](#custom-font-color-picker)
- [Background Color Customization](#background-color-customization)
  - [Configuration](#background-color-configuration)
  - [Predefined Colors](#predefined-background-colors)
  - [Custom Color Picker](#custom-background-color-picker)
- [Editor Dimensions](#editor-dimensions)
  - [Setting Width](#setting-width)
  - [Setting Height](#setting-height)
- [RTL Support](#rtl-support)
- [Custom CSS Classes](#custom-css-classes)
- [Read-Only Mode](#read-only-mode)
- [Locale Configuration](#locale-configuration)
- [Theme Customization](#theme-customization)
  - [Default CSS Override](#default-css-override)
  - [Block Editor CSS Classes and IDs](#block-editor-css-classes-and-ids)
  - [Block Editor CSS Variables](#block-editor-css-variables)
  - [Theme Customization Example](#theme-customization-example)
  - [Using Theme Studio](#using-theme-studio)
- [Complete API Reference](#complete-api-reference)
- [Code Examples](#code-examples)

## Overview

The Block Editor offers extensive customization options to tailor the editor's look and feel. You can configure font colors, background colors, dimensions, RTL support, custom CSS classes, and more.

## Font Color Customization

The Block Editor allows users to apply colors to text within inline content blocks through the inline toolbar.

### Font Color Configuration

Configure font colors using the `fontColorSettings` property:

```typescript
const editor = new BlockEditor({
    fontColorSettings: {
        colorPalette: ['#FF0000', '#00FF00', '#0000FF'],
        showColorPicker: true
    }
});
```

### Predefined Font Colors

By default, the editor provides a standard set of colors. You can customize this palette:

**Default Color Palette:**
```typescript
[
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#808080', '#C0C0C0'
]
```

**Configuration:**
```typescript
fontColorSettings: {
    colorPalette: [
        '#000000', // Black
        '#434343', // Dark Gray
        '#666666', // Medium Gray
        '#999999', // Light Gray
        '#B7B7B7', // Silver
        '#CCCCCC', // Light Silver
        '#D9D9D9', // Very Light Gray
        '#EFEFEF', // Near White
        '#F3F3F3', // Off White
        '#FFFFFF', // White
        
        '#980000', // Dark Red
        '#FF0000', // Red
        '#FF9900', // Orange
        '#FFFF00', // Yellow
        '#00FF00', // Green
        '#00FFFF', // Cyan
        '#4A86E8', // Blue
        '#0000FF', // Dark Blue
        '#9900FF', // Purple
        '#FF00FF'  // Magenta
    ]
}
```

### Custom Font Color Picker

Enable or disable the custom color picker option:

```typescript
fontColorSettings: {
    colorPalette: ['#FF0000', '#00FF00', '#0000FF'],
    showColorPicker: true  // Enables custom color picker
}
```

**Complete Example:**
```typescript
import { BlockEditor, ContentType } from '@syncfusion/ej2-blockeditor';

const blockEditor: BlockEditor = new BlockEditor({
    blocks: [
        {
            blockType: 'Paragraph',
            content: [
                {
                    contentType: ContentType.Text,
                    content: 'Select text to apply custom font colors.'
                }
            ]
        }
    ],
    fontColorSettings: {
        colorPalette: [
            '#000000', '#434343', '#666666', '#999999', '#B7B7B7',
            '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF',
            '#980000', '#FF0000', '#FF9900', '#FFFF00', '#00FF00',
            '#00FFFF', '#4A86E8', '#0000FF', '#9900FF', '#FF00FF'
        ],
        showColorPicker: true
    }
});

blockEditor.appendTo('#blockeditor');
```

## Background Color Customization

The Block Editor allows users to apply background colors to text within inline content blocks through the inline toolbar.

### Background Color Configuration

Configure background colors using the `backgroundColorSettings` property:

```typescript
const editor = new BlockEditor({
    backgroundColorSettings: {
        colorPalette: ['#FFFF00', '#00FF00', '#00FFFF'],
        showColorPicker: true
    }
});
```

### Predefined Background Colors

Similar to font colors, you can customize the background color palette:

**Configuration:**
```typescript
backgroundColorSettings: {
    colorPalette: [
        '#FFFFFF', // White
        '#FFFFE0', // Light Yellow
        '#FFFACD', // Lemon Chiffon
        '#FFE4B5', // Moccasin
        '#FFDAB9', // Peach Puff
        '#FFB6C1', // Light Pink
        '#FFC0CB', // Pink
        '#E6E6FA', // Lavender
        '#D8BFD8', // Thistle
        '#DDA0DD', // Plum
        
        '#B0E0E6', // Powder Blue
        '#ADD8E6', // Light Blue
        '#87CEEB', // Sky Blue
        '#87CEFA', // Light Sky Blue
        '#B0C4DE', // Light Steel Blue
        '#98FB98', // Pale Green
        '#90EE90', // Light Green
        '#00FA9A', // Medium Spring Green
        '#AFEEEE', // Pale Turquoise
        '#E0FFFF'  // Light Cyan
    ]
}
```

### Custom Background Color Picker

Enable or disable the custom color picker for background colors:

```typescript
backgroundColorSettings: {
    colorPalette: ['#FFFF00', '#00FF00', '#00FFFF'],
    showColorPicker: true  // Enables custom color picker
}
```

**Complete Example:**
```typescript
import { BlockEditor, ContentType } from '@syncfusion/ej2-blockeditor';

const blockEditor: BlockEditor = new BlockEditor({
    blocks: [
        {
            blockType: 'Paragraph',
            content: [
                {
                    contentType: ContentType.Text,
                    content: 'Select text to apply custom background colors.'
                }
            ]
        }
    ],
    backgroundColorSettings: {
        colorPalette: [
            '#FFFFFF', '#FFFFE0', '#FFFACD', '#FFE4B5', '#FFDAB9',
            '#FFB6C1', '#FFC0CB', '#E6E6FA', '#D8BFD8', '#DDA0DD',
            '#B0E0E6', '#ADD8E6', '#87CEEB', '#87CEFA', '#B0C4DE',
            '#98FB98', '#90EE90', '#00FA9A', '#AFEEEE', '#E0FFFF'
        ],
        showColorPicker: true
    }
});

blockEditor.appendTo('#blockeditor');
```

## Editor Dimensions

The Block Editor supports customizable width and height properties to fit various layout requirements.

### Setting Width

The `width` property specifies the editor's width. It accepts string values with units (px, %, em, rem, etc.) or numeric values (treated as pixels).

**Default:** `'100%'`

**Configuration:**
```typescript
width: '800px'    // Fixed width
width: '100%'     // Responsive width
width: 800        // 800 pixels (numeric)
```

**Example:**
```typescript
const blockEditor = new BlockEditor({
    width: '900px',
    blocks: [
        {
            blockType: 'Paragraph',
            content: [
                {
                    contentType: ContentType.Text,
                    content: 'This editor has a fixed width of 900px.'
                }
            ]
        }
    ]
});

blockEditor.appendTo('#blockeditor');
```

### Setting Height

The `height` property specifies the editor's height. It accepts string values with units or numeric values.

**Default:** `'400px'`

**Configuration:**
```typescript
height: '600px'   // Fixed height
height: '100vh'   // Full viewport height
height: 600       // 600 pixels (numeric)
```

**Example:**
```typescript
const blockEditor = new BlockEditor({
    height: '600px',
    blocks: [
        {
            blockType: 'Paragraph',
            content: [
                {
                    contentType: ContentType.Text,
                    content: 'This editor has a fixed height of 600px.'
                }
            ]
        }
    ]
});

blockEditor.appendTo('#blockeditor');
```

**Combined Width and Height:**
```typescript
const blockEditor = new BlockEditor({
    width: '1200px',
    height: '800px',
    blocks: [
        {
            blockType: 'Paragraph',
            content: [
                {
                    contentType: ContentType.Text,
                    content: 'This editor has fixed dimensions.'
                }
            ]
        }
    ]
});

blockEditor.appendTo('#blockeditor');
```

## RTL Support

The Block Editor supports Right-to-Left (RTL) text direction for languages like Arabic, Hebrew, and Persian.

**Property:** `enableRtl`

**Default:** `false`

**Configuration:**
```typescript
enableRtl: true
```

**Example:**
```typescript
import { BlockEditor, ContentType } from '@syncfusion/ej2-blockeditor';

const blockEditor: BlockEditor = new BlockEditor({
    enableRtl: true,
    blocks: [
        {
            blockType: 'Heading',
            properties: { level: 1 },
            content: [
                {
                    contentType: ContentType.Text,
                    content: 'مرحبا بك في محرر الكتلة'  // Arabic: Welcome to Block Editor
                }
            ]
        },
        {
            blockType: 'Paragraph',
            content: [
                {
                    contentType: ContentType.Text,
                    content: 'هذا نص تجريبي باللغة العربية'  // Arabic: This is sample text in Arabic
                }
            ]
        }
    ]
});

blockEditor.appendTo('#blockeditor');
```

## Custom CSS Classes

Use the `cssClass` property to apply custom CSS classes to the Block Editor root element for styling.

**Property:** `cssClass`

**Default:** `''` (empty string)

**Configuration:**
```typescript
cssClass: 'custom-editor-theme dark-mode'
```

**Example:**
```html
<style>
    .custom-editor-theme {
        border: 2px solid #4A86E8;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .custom-editor-theme .e-block-editor-content {
        font-family: 'Georgia', serif;
        line-height: 1.8;
        padding: 24px;
    }
    
    .dark-mode {
        background-color: #1E1E1E;
        color: #D4D4D4;
    }
    
    .dark-mode .e-block {
        color: #D4D4D4;
    }
</style>
```

```typescript
import { BlockEditor, ContentType } from '@syncfusion/ej2-blockeditor';

const blockEditor: BlockEditor = new BlockEditor({
    cssClass: 'custom-editor-theme dark-mode',
    blocks: [
        {
            blockType: 'Heading',
            properties: { level: 1 },
            content: [
                {
                    contentType: ContentType.Text,
                    content: 'Custom Styled Editor'
                }
            ]
        },
        {
            blockType: 'Paragraph',
            content: [
                {
                    contentType: ContentType.Text,
                    content: 'This editor uses custom CSS classes for theming.'
                }
            ]
        }
    ]
});

blockEditor.appendTo('#blockeditor');
```

## Read-Only Mode

The Block Editor supports a read-only mode that prevents content editing while still allowing users to view and interact with the content (such as clicking links).

**Property:** `readOnly`

**Default:** `false`

**Configuration:**
```typescript
readOnly: true
```

**Example:**
```typescript
import { BlockEditor, BlockModel, ContentType } from '@syncfusion/ej2-blockeditor';

const blocksData: BlockModel[] = [
    {
        blockType: 'Heading',
        properties: { level: 1 },
        content: [
            {
                contentType: ContentType.Text,
                content: 'Read-Only Document'
            }
        ]
    },
    {
        blockType: 'Paragraph',
        content: [
            {
                contentType: ContentType.Text,
                content: 'This content cannot be edited. Visit '
            },
            {
                contentType: ContentType.Link,
                content: 'our website',
                properties: { href: 'https://www.syncfusion.com' }
            },
            {
                contentType: ContentType.Text,
                content: ' for more information.'
            }
        ]
    }
];

const blockEditor: BlockEditor = new BlockEditor({
    blocks: blocksData,
    readOnly: true
});

blockEditor.appendTo('#blockeditor');
```

**Dynamic Read-Only Toggle:**
```typescript
const blockEditor = new BlockEditor({
    blocks: blocksData
});

blockEditor.appendTo('#blockeditor');

// Toggle read-only mode
document.getElementById('toggleReadOnly')?.addEventListener('click', () => {
    blockEditor.readOnly = !blockEditor.readOnly;
    console.log('Read-only mode:', blockEditor.readOnly);
});
```

## Locale Configuration

The Block Editor supports internationalization (i18n) for localizing UI elements like menus, tooltips, and messages.

**Property:** `locale`

**Default:** `'en-US'`

**Supported Locales:**
- `'en-US'` - English (United States)
- `'de-DE'` - German (Germany)
- `'fr-FR'` - French (France)
- `'es-ES'` - Spanish (Spain)
- `'ar-AE'` - Arabic (United Arab Emirates)
- And more...

**Configuration:**
```typescript
import { L10n } from '@syncfusion/ej2-base';

// Load locale strings
L10n.load({
    'de-DE': {
        'blockeditor': {
            'Bold': 'Fett',
            'Italic': 'Kursiv',
            'Underline': 'Unterstreichen',
            'Insert Link': 'Link einfügen',
            'Heading 1': 'Überschrift 1',
            'Heading 2': 'Überschrift 2',
            'Paragraph': 'Absatz',
            'Bullet List': 'Aufzählungsliste',
            'Numbered List': 'Nummerierte Liste'
        }
    }
});

const blockEditor = new BlockEditor({
    locale: 'de-DE',
    blocks: [
        {
            blockType: 'Paragraph',
            content: [
                {
                    contentType: ContentType.Text,
                    content: 'Deutscher Text'
                }
            ]
        }
    ]
});

blockEditor.appendTo('#blockeditor');
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

**TypeScript (`index.ts`):**

```ts
import { BlockEditor, ContentType } from '@syncfusion/ej2-blockeditor';

const blockData = [
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

const blockEditor: BlockEditor = new BlockEditor({
  width: '100%',
  height: '600px',
  blocks: blockData,
  users: [
    {
      avatarUrl: 'https://ej2.syncfusion.com/demos/src/block-editor/images/andrew.png',
      id: 'user1',
      user: 'Andrews',
    },
  ],
});

blockEditor.appendTo('#blockeditor');

function applyTheme(themeName: string): void {
  document.body.classList.remove('slateLightTheme', 'sageGreenTheme', 'darkProTheme');
  document.body.classList.add(themeName);

  const themeButtons = [
    document.getElementById('slateLightThemeBtn') as HTMLElement | null,
    document.getElementById('sageGreenThemeBtn') as HTMLElement | null,
    document.getElementById('darkProThemeBtn') as HTMLElement | null
  ];

  themeButtons.forEach((button) => {
    if (!button) {
      return;
    }

    const isActive =
      (button.id === 'slateLightThemeBtn' && themeName === 'slateLightTheme') ||
      (button.id === 'sageGreenThemeBtn' && themeName === 'sageGreenTheme') ||
      (button.id === 'darkProThemeBtn' && themeName === 'darkProTheme');

    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

const slateLightBtn = document.getElementById('slateLightThemeBtn') as HTMLElement;
const sageGreenBtn = document.getElementById('sageGreenThemeBtn') as HTMLElement;
const darkProBtn = document.getElementById('darkProThemeBtn') as HTMLElement;

if (slateLightBtn) {
  slateLightBtn.addEventListener('click', () => applyTheme('slateLightTheme'));
}

if (sageGreenBtn) {
  sageGreenBtn.addEventListener('click', () => applyTheme('sageGreenTheme'));
}

if (darkProBtn) {
  darkProBtn.addEventListener('click', () => applyTheme('darkProTheme'));
}

applyTheme('slateLightTheme');
```

**HTML (`index.html`):**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Essential JS 2 - BlockEditor Theme Customization</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <meta name="description" content="Essential JS 2" />
    <meta name="author" content="Syncfusion" />
    <link href="https://cdn.syncfusion.com/ej2/35.1.37/tailwind3.css" rel="stylesheet" />

    <link href="index.css" rel="stylesheet" />

    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.19.38/system.js"></script>
    <script src="systemjs.config.js"></script>
</head>

<body>
    <div id="container">
        <h2>Block Editor - Theme Customization</h2>
        <div class="theme-switcher" aria-label="Theme switcher">
            <button id="slateLightThemeBtn" type="button" aria-pressed="false">Slate Light</button>
            <button id="sageGreenThemeBtn" type="button" aria-pressed="true">Sage Green</button>
            <button id="darkProThemeBtn" type="button" aria-pressed="false">Dark Pro</button>
        </div>
        <div id="blockeditor"></div>
    </div>
    <script type="module" src="index.ts"></script>
</body>

</html>
```

**CSS (`index.css`):**

```css
@import "node_modules/@syncfusion/ej2-tailwind3-theme/styles/blockeditor/index.css";

/* Theme Customization Styles */

body {
  margin: 0;
  font-family: "Segoe UI", sans-serif;
  background: #f4f5f7;
  color: #1f2937;
  transition: background-color 0.3s ease, color 0.3s ease;
}

#container {
  padding: 40px 20px;
  min-height: 100vh;
  box-sizing: border-box;
}

#loader {
  color: #008cff;
  font-size: 14px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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

### Using Theme Studio

Syncfusion Theme Studio provides an advanced way to create a fully customized theme for the Block Editor and other EJ2 components.

1. Visit the [Syncfusion Theme Studio](https://ej2.syncfusion.com/themestudio/).
2. Select a base theme such as Material 3, Fluent 2, Bootstrap 5.3, or Tailwind 3.
3. Customize colors, typography, borders, and component styles.
4. Download the generated CSS file.
5. Include the generated theme in your application.

This approach ensures consistent styling across all Syncfusion components in your application.

## Complete API Reference

### Appearance Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `fontColorSettings` | `ColorSettings` | `{ colorPalette: [...], showColorPicker: true }` | Font color configuration |
| `backgroundColorSettings` | `ColorSettings` | `{ colorPalette: [...], showColorPicker: true }` | Background color configuration |
| `width` | `string \| number` | `'100%'` | Editor width |
| `height` | `string \| number` | `'400px'` | Editor height |
| `cssClass` | `string` | `''` | Custom CSS classes |
| `enableRtl` | `boolean` | `false` | Enable RTL mode |
| `readOnly` | `boolean` | `false` | Enable read-only mode |
| `locale` | `string` | `'en-US'` | Locale for internationalization |

### ColorSettings Interface

```typescript
interface ColorSettings {
    colorPalette?: string[];
    showColorPicker?: boolean;
}
```

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `colorPalette` | `string[]` | `[...]` | Array of color hex codes |
| `showColorPicker` | `boolean` | `true` | Show custom color picker |

## Code Examples

### Complete Customization Example

```typescript
import { BlockEditor, BlockModel, ContentType } from '@syncfusion/ej2-blockeditor';
import { L10n } from '@syncfusion/ej2-base';

// Custom CSS
const customStyles = `
<style>
    .premium-editor-theme {
        border: 2px solid #4A86E8;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        background: linear-gradient(to bottom, #FFFFFF, #F8F9FA);
    }
    
    .premium-editor-theme .e-block-editor-content {
        font-family: 'Inter', 'Segoe UI', sans-serif;
        line-height: 1.75;
        padding: 32px;
    }
    
    .premium-editor-theme .e-block {
        margin-bottom: 16px;
    }
    
    .premium-editor-theme h1 {
        color: #1A73E8;
        font-weight: 700;
    }
</style>
`;

document.head.insertAdjacentHTML('beforeend', customStyles);

// Sample blocks
const blocksData: BlockModel[] = [
    {
        blockType: 'Heading',
        properties: { level: 1 },
        content: [
            {
                contentType: ContentType.Text,
                content: 'Customized Block Editor'
            }
        ]
    },
    {
        blockType: 'Paragraph',
        content: [
            {
                contentType: ContentType.Text,
                content: 'This editor showcases extensive customization options including custom colors, dimensions, and styling.'
            }
        ]
    },
    {
        blockType: 'Paragraph',
        content: [
            {
                contentType: ContentType.Text,
                content: 'Select text to see the custom font and background color palettes.'
            }
        ]
    }
];

// Create editor with full customization
const blockEditor: BlockEditor = new BlockEditor({
    blocks: blocksData,
    
    // Dimensions
    width: '1000px',
    height: '600px',
    
    // Custom styling
    cssClass: 'premium-editor-theme',
    
    // Font colors
    fontColorSettings: {
        colorPalette: [
            '#000000', '#434343', '#666666', '#999999', '#B7B7B7',
            '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF',
            '#980000', '#FF0000', '#FF9900', '#FFFF00', '#00FF00',
            '#00FFFF', '#4A86E8', '#0000FF', '#9900FF', '#FF00FF',
            '#1A73E8', '#EA4335', '#FBBC04', '#34A853'
        ],
        showColorPicker: true
    },
    
    // Background colors
    backgroundColorSettings: {
        colorPalette: [
            '#FFFFFF', '#FFFFE0', '#FFFACD', '#FFE4B5', '#FFDAB9',
            '#FFB6C1', '#FFC0CB', '#E6E6FA', '#D8BFD8', '#DDA0DD',
            '#B0E0E6', '#ADD8E6', '#87CEEB', '#87CEFA', '#B0C4DE',
            '#98FB98', '#90EE90', '#00FA9A', '#AFEEEE', '#E0FFFF',
            '#E8F0FE', '#FCE8E6', '#FEF7E0', '#E6F4EA'
        ],
        showColorPicker: true
    },
    
    // Locale
    locale: 'en-US',
    
    // RTL support (disabled for English)
    enableRtl: false,
    
    // Read-only (disabled for editing)
    readOnly: false
});

blockEditor.appendTo('#blockeditor');
```

### RTL and Localization Example

```typescript
import { BlockEditor, BlockModel, ContentType } from '@syncfusion/ej2-blockeditor';
import { L10n } from '@syncfusion/ej2-base';

// Load Arabic locale
L10n.load({
    'ar-AE': {
        'blockeditor': {
            'Bold': 'عريض',
            'Italic': 'مائل',
            'Underline': 'تسطير',
            'Insert Link': 'إدراج رابط',
            'Heading 1': 'عنوان 1',
            'Heading 2': 'عنوان 2',
            'Paragraph': 'فقرة',
            'Bullet List': 'قائمة نقطية',
            'Numbered List': 'قائمة مرقمة',
            'Code Block': 'كتلة التعليمات البرمجية',
            'Quote': 'اقتباس'
        }
    }
});

const arabicBlocks: BlockModel[] = [
    {
        blockType: 'Heading',
        properties: { level: 1 },
        content: [
            {
                contentType: ContentType.Text,
                content: 'محرر الكتلة'
            }
        ]
    },
    {
        blockType: 'Paragraph',
        content: [
            {
                contentType: ContentType.Text,
                content: 'هذا مثال على محرر الكتلة مع دعم اللغة العربية واتجاه النص من اليمين إلى اليسار.'
            }
        ]
    },
    {
        blockType: 'BulletList',
        items: [
            {
                content: [
                    {
                        contentType: ContentType.Text,
                        content: 'دعم كامل للغة العربية'
                    }
                ]
            },
            {
                content: [
                    {
                        contentType: ContentType.Text,
                        content: 'اتجاه النص من اليمين إلى اليسار'
                    }
                ]
            },
            {
                content: [
                    {
                        contentType: ContentType.Text,
                        content: 'ترجمة واجهة المستخدم'
                    }
                ]
            }
        ]
    }
];

const blockEditor: BlockEditor = new BlockEditor({
    blocks: arabicBlocks,
    locale: 'ar-AE',
    enableRtl: true,
    width: '100%',
    height: '500px'
});

blockEditor.appendTo('#blockeditor');
```

### Dynamic Theme Switcher Example

```typescript
import { BlockEditor, BlockModel, ContentType } from '@syncfusion/ej2-blockeditor';

const blocksData: BlockModel[] = [
    {
        blockType: 'Heading',
        properties: { level: 1 },
        content: [
            {
                contentType: ContentType.Text,
                content: 'Theme Switcher Demo'
            }
        ]
    },
    {
        blockType: 'Paragraph',
        content: [
            {
                contentType: ContentType.Text,
                content: 'Use the buttons below to switch between different themes.'
            }
        ]
    }
];

// Define themes
const themes = {
    light: 'light-theme',
    dark: 'dark-theme',
    blue: 'blue-theme'
};

// Custom CSS for themes
const themeStyles = `
<style>
    .light-theme {
        background-color: #FFFFFF;
        color: #000000;
    }
    
    .dark-theme {
        background-color: #1E1E1E;
        color: #D4D4D4;
    }
    
    .dark-theme .e-block {
        color: #D4D4D4;
    }
    
    .blue-theme {
        background-color: #E8F4F8;
        color: #003D5C;
    }
    
    .blue-theme h1 {
        color: #0066A1;
    }
</style>
`;

document.head.insertAdjacentHTML('beforeend', themeStyles);

// Create editor
const blockEditor: BlockEditor = new BlockEditor({
    blocks: blocksData,
    cssClass: themes.light,
    width: '100%',
    height: '400px'
});

blockEditor.appendTo('#blockeditor');

// Theme switcher buttons
document.getElementById('lightTheme')?.addEventListener('click', () => {
    blockEditor.cssClass = themes.light;
});

document.getElementById('darkTheme')?.addEventListener('click', () => {
    blockEditor.cssClass = themes.dark;
});

document.getElementById('blueTheme')?.addEventListener('click', () => {
    blockEditor.cssClass = themes.blue;
});
```

### Read-Only Mode with Toggle Example

```typescript
import { BlockEditor, BlockModel, ContentType } from '@syncfusion/ej2-blockeditor';

const blocksData: BlockModel[] = [
    {
        blockType: 'Heading',
        properties: { level: 1 },
        content: [
            {
                contentType: ContentType.Text,
                content: 'Document Viewer/Editor'
            }
        ]
    },
    {
        blockType: 'Paragraph',
        content: [
            {
                contentType: ContentType.Text,
                content: 'This document can be viewed in read-only mode or edited. Click the toggle button to switch modes.'
            }
        ]
    }
];

const blockEditor: BlockEditor = new BlockEditor({
    blocks: blocksData,
    readOnly: true,  // Start in read-only mode
    width: '100%',
    height: '500px'
});

blockEditor.appendTo('#blockeditor');

// Toggle button
const toggleBtn = document.getElementById('toggleEditMode');
const statusLabel = document.getElementById('modeStatus');

toggleBtn?.addEventListener('click', () => {
    blockEditor.readOnly = !blockEditor.readOnly;
    
    // Update UI
    if (blockEditor.readOnly) {
        toggleBtn.textContent = 'Enable Editing';
        statusLabel.textContent = 'Mode: Read-Only';
        statusLabel.style.color = '#666666';
    } else {
        toggleBtn.textContent = 'Disable Editing';
        statusLabel.textContent = 'Mode: Editable';
        statusLabel.style.color = '#00AA00';
    }
});
```
---
