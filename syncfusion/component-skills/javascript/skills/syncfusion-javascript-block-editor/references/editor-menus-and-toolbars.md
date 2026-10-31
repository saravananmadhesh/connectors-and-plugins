# Editor Menus and Toolbars Reference

Complete reference for all menu systems and toolbar configurations in the Syncfusion JavaScript BlockEditor.

## Table of Contents

- [Overview](#overview)
- [Slash Command Menu](#slash-command-menu)
  - [Configuration](#slash-command-configuration)
  - [Built-in Commands](#slash-command-built-in-commands)
  - [Custom Commands](#slash-command-custom-commands)
  - [Events](#slash-command-events)
- [Context Menu](#context-menu)
  - [Configuration](#context-menu-configuration)
  - [Built-in Items](#context-menu-built-in-items)
  - [Custom Items](#context-menu-custom-items)
  - [Events](#context-menu-events)
- [Block Action Menu](#block-action-menu)
  - [Configuration](#block-action-menu-configuration)
  - [Built-in Actions](#block-action-built-in-actions)
  - [Custom Actions](#block-action-custom-actions)
  - [Tooltip Configuration](#block-action-tooltip-configuration)
  - [Events](#block-action-events)
- [Inline Toolbar](#inline-toolbar)
  - [Configuration](#inline-toolbar-configuration)
  - [Built-in Formatting Items](#inline-toolbar-built-in-items)
  - [Transform Block Options](#inline-toolbar-transform-options)
  - [Inline Code Support](#inline-toolbar-inline-code)
  - [Inline Link Support](#inline-toolbar-inline-link)
  - [Font and Background Color](#inline-toolbar-color-support)
  - [Events](#inline-toolbar-events)
- [CommandMenuSettings API](#commandmenusettings-api)
- [ContextMenuSettings API](#contextmenusettings-api)
- [BlockActionMenuSettings API](#blockactionmenusettings-api)
- [InlineToolbarSettings API](#inlinetoolbarsettings-api)
- [TransformSettings API](#transformsettings-api)
- [Code Examples](#code-examples)

## Overview

The Block Editor control includes several intuitive, context-aware menus that streamline content creation and editing. These menus provide quick access to formatting options and commands, improving user productivity.

## Slash Command Menu

The Slash Command menu allows users to quickly insert or transform blocks by typing `/` followed by a command. This provides an efficient, keyboard-driven way to interact with the editor.

### Slash Command Configuration

Configure the Slash Command menu using the `commandMenuSettings` property:

```typescript
const blockEditor = new BlockEditor({
    commandMenuSettings: {
        popupWidth: '350px',
        popupHeight: '400px',
        commands: [
            {
                id: 'line-cmd',
                type: BlockType.Divider,
                groupBy: 'Utility',
                label: 'Insert a Line',
                iconCss: 'e-icons e-divider',
            }
        ]
    }
});
```

### Slash Command Built-in Commands

The Slash Command menu comes with pre-defined commands for all block types:

- **Headings (Level 1 to 4)**: Inserts a heading block of the corresponding level
- **Lists (Bullet, Numbered, Checklist)**: Creates a block for the specified list type
- **Paragraph**: Inserts a standard text block
- **Image**: Inserts a media block for images
- **Table**: Inserts a table block
- **Toggle**: Creates a collapsible content block
- **Callout**: Inserts a block for highlighting important information
- **Utility (Divider, Quote, Code)**: Inserts a utility block

### Slash Command Custom Commands

Add custom commands to the Slash Command menu:

```typescript
commands: [
    {
        id: 'timestamp-cmd',
        groupBy: 'Actions',
        label: 'Insert Timestamp',
        iconCss: 'e-icons e-schedule',
    }
]
```

### Slash Command Events

| Event | Type | Description |
|-------|------|-------------|
| `filtering` | CommandFilteringEventArgs | Triggers when the user types to filter command menu items |
| `itemSelect` | CommandItemSelectEventArgs | Triggers when the user clicks on a command menu item |

**Event Usage:**

```typescript
commandMenuSettings: {
    itemSelect: (args: CommandItemSelectEventArgs) => {
        console.log('Command selected:', args.command.label);
        // Handle custom command actions
    },
    filtering: (args: CommandFilteringEventArgs) => {
        console.log('Filtering with query:', args.text);
    }
}
```

## Context Menu

The Context menu appears when a user right-clicks within a specific block, providing context-aware actions relevant to the clicked block or content.

### Context Menu Configuration

Configure the Context menu using the `contextMenuSettings` property:

```typescript
const blockEditor = new BlockEditor({
    contextMenuSettings: {
        enable: true,
        showItemOnClick: true,
        items: customContextMenuItems
    }
});
```

### Context Menu Built-in Items

The Context menu offers the following built-in options:

- **Undo/Redo**: Reverses or re-applies the last action
- **Cut/Copy/Paste**: Standard clipboard actions for selected content
- **Indent**: Increases or decreases the indent level of the selected block
- **Link**: Adds or edits a hyperlink for the selected text. When the cursor is focused on an existing link, the context menu also exposes `Open Link`, `Edit Link`, `Copy Link`, and `Remove Link` options
- **Table**: Provides `Insert` and `Delete` actions for rows and columns. These options appear when the cursor is focused within a table cell and the context menu is opened

### Context Menu Custom Items

Create custom context menu items with submenus:

```typescript
const customContextMenuItems: ContextMenuItemModel[] = [
    {
        id: 'format-menu',
        text: 'Format',
        iconCss: 'e-icons e-format-painter',
        items: [
            {
                id: 'bold-item',
                text: 'Bold',
                iconCss: 'e-icons e-bold',
            },
            {
                id: 'italic-item',
                text: 'Italic',
                iconCss: 'e-icons e-italic',
            },
            {
                id: 'underline-item',
                text: 'Underline',
                iconCss: 'e-icons e-underline',
            }
        ]
    },
    { separator: true },
    {
        id: 'statistics-item',
        text: 'Block Statistics',
        iconCss: 'e-icons e-chart'
    },
    {
        id: 'export-item',
        text: 'Export Options',
        iconCss: 'e-icons e-export',
        items: [
            {
                id: 'export-json',
                text: 'Export as JSON',
                iconCss: 'e-icons e-file-json'
            },
            {
                id: 'export-html',
                text: 'Export as HTML',
                iconCss: 'e-icons e-file-html'
            },
            {
                id: 'export-pdf',
                text: 'Export as PDF',
                iconCss: 'e-icons e-file-pdf'
            }
        ]
    }
];
```

### Context Menu Events

| Event | Type | Description |
|-------|------|-------------|
| `opening` | ContextMenuOpeningEventArgs | Triggers before the context menu opens |
| `closing` | ContextMenuClosingEventArgs | Triggers before the context menu closes |
| `itemSelect` | ContextMenuItemSelectEventArgs | Triggers when a context menu item is clicked |

**Event Usage:**

```typescript
contextMenuSettings: {
    opening: (args: ContextMenuOpeningEventArgs) => {
        console.log('Context menu opening');
        // Modify menu items before display
    },
    closing: (args: ContextMenuClosingEventArgs) => {
        console.log('Context menu closing');
    },
    itemSelect: (args: ContextMenuItemSelectEventArgs) => {
        console.log('Item selected:', args.item.text);
        // Handle custom actions
    }
}
```

## Block Action Menu

The Block Action menu appears next to a block when you hover over it and click the drag handle icon, offering quick actions specific to that block.

### Block Action Menu Configuration

Configure the Block Action menu using the `blockActionMenuSettings` property:

```typescript
const blockEditor = new BlockEditor({
    blockActionMenuSettings: {
        enable: true,
        popupWidth: '180px',
        popupHeight: '110px',
        enableTooltip: false,
        items: customActionItems
    }
});
```

### Block Action Built-in Actions

The Block Action menu provides convenient actions for managing individual blocks:

- **Duplicate**: Creates an exact copy of the current block
- **Delete**: Removes the block from the editor
- **Move Up**: Moves the block one position higher
- **Move Down**: Moves the block one position lower

### Block Action Custom Actions

Add custom action items to the Block Action menu:

```typescript
items: [
    {
        id: 'highlight-action',
        label: 'Highlight Block',
        iconCss: 'e-icons e-highlight',
        tooltip: 'Highlight this block'
    },
    {
        id: 'copy-content-action',
        label: 'Copy Content',
        iconCss: 'e-icons e-copy',
        tooltip: 'Copy block content to clipboard'
    },
    {
        id: 'block-info-action',
        label: 'Block Info',
        tooltip: 'Show block information'
    }
]
```

### Block Action Tooltip Configuration

Control tooltip display using the `enableTooltip` property:

```typescript
blockActionMenuSettings: {
    enableTooltip: false  // Disables tooltips
}
```

When `enableTooltip` is true, tooltips are displayed based on the `tooltip` property of each action item.

### Block Action Events

| Event | Type | Description |
|-------|------|-------------|
| `opening` | BlockActionMenuOpeningEventArgs | Triggers when the block action menu is opened |
| `closing` | BlockActionMenuClosingEventArgs | Triggers when the block action menu is closed |
| `itemSelect` | BlockActionItemSelectEventArgs | Triggers when a block action menu item is clicked |

**Event Usage:**

```typescript
blockActionMenuSettings: {
    opening: (args: BlockActionMenuOpeningEventArgs) => {
        console.log('Block action menu opening for block:', args.blockId);
    },
    closing: (args: BlockActionMenuClosingEventArgs) => {
        console.log('Block action menu closing');
    },
    itemSelect: (args: BlockActionItemSelectEventArgs) => {
        console.log('Action selected:', args.item.label);
        // Handle custom block actions
    }
}
```

## Inline Toolbar

The Inline Toolbar appears when text is selected in the editor, providing quick access to common text formatting actions that apply to inline content.

### Inline Toolbar Configuration

Configure the Inline Toolbar using the `inlineToolbarSettings` property:

```typescript
const blockEditor = new BlockEditor({
    inlineToolbarSettings: {
        popupWidth: 'auto',
        enable: true,
        items: ['Transform', 'Bold', 'Italic', 'InlineCode', 'Link']
    }
});
```

### Inline Toolbar Built-in Items

The Inline Toolbar includes the following built-in formatting options:

- **Text Styles**: Bold, Italic, Underline, and Strikethrough
- **Superscript/Subscript**: For mathematical or scientific notations
- **Case Conversion**: Change text to uppercase or lowercase
- **Text Color**: Change the color of the selected text
- **Background Color**: Change the background color of the selected text

**Available Built-in Items:**

```typescript
items: [
    'Bold', 
    'Italic', 
    'Underline', 
    'Strikethrough',
    'Superscript',
    'Subscript',
    'Uppercase',
    'Lowercase',
    'Color',
    'BackgroundColor',
    'Transform',
    'InlineCode',
    'Link'
]
```

### Inline Toolbar Transform Options

The inline toolbar includes transform options to quickly convert blocks between different types:

```typescript
const blockEditor = new BlockEditor({
    inlineToolbarSettings: {
        items: ['Transform', 'Bold', 'Italic']
    },
    transformSettings: {
        items: ['Paragraph', 'Heading 1', 'Heading 2', 'BulletList'],
        itemSelect: (args: TransformItemSelectEventArgs) => {
            console.log('Transform to:', args.item);
        }
    }
});
```

**Built-in Transform Block Options:**

| Transform Type |
|----------------|
| Paragraph |
| Heading1 to Heading4 |
| Checklist |
| BulletList |
| NumberedList |

**Note:** Transform options are not available for `code`, `callout`, `quote`, `divider`, `image`, `table`, and `collapsible` blocks. These will be added as new blocks instead.

### Inline Toolbar Inline Code

Added inline code formatting in the toolbar with light syntax highlighting and seamless integration with other text formatting options:

```typescript
inlineToolbarSettings: {
    items: ['Bold', 'Italic', 'InlineCode']
}
```

### Inline Toolbar Inline Link

Added inline link formatting in the toolbar. When the link item is clicked, a link dialog opens for inserting or editing links:

```typescript
inlineToolbarSettings: {
    items: ['Bold', 'Italic', 'Link']
}
```

### Inline Toolbar Color Support

Enhanced font and background color options in the inline toolbar with integrated ColorPicker:

```typescript
const blockEditor = new BlockEditor({
    inlineToolbarSettings: {
        items: ['Color', 'BackgroundColor']
    },
    fontColorSettings: {
        mode: 'Picker',
        modeSwitcher: true,
        default: '#ff0000',
        columns: 10
    },
    backgroundColorSettings: {
        mode: 'Palette',
        modeSwitcher: false,
        default: '#ffff00',
        columns: 5
    }
});
```

### Inline Toolbar Events

| Event | Type | Description |
|-------|------|-------------|
| `itemClick` | ToolbarItemClickEventArgs | Triggers when the user clicks on an inline toolbar item |

**Event Usage:**

```typescript
inlineToolbarSettings: {
    itemClick: (args: ToolbarItemClickEventArgs) => {
        console.log('Toolbar item clicked:', args.item);
        // Handle custom actions
    }
}
```

## CommandMenuSettings API

Complete API reference for `CommandMenuSettingsModel`:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `commands` | `CommandItemModel[]` | `[]` | Array of command item models representing available commands |
| `popupHeight` | `string` | `'300px'` | Height of the command menu popup |
| `popupWidth` | `string` | `'280px'` | Width of the command menu popup |

### CommandItemModel

| Property | Type | Description |
|----------|------|-------------|
| `disabled` | `boolean` | Whether the command item is disabled |
| `groupBy` | `string` | Header text for the command item group |
| `iconCss` | `string` | CSS classes for the icon |
| `id` | `string` | Unique identifier of the command item |
| `label` | `string` | Display label for the command item |
| `shortcut` | `string` | Keyboard shortcut for the command |
| `tooltip` | `string` | Tooltip text for the item |
| `type` | `string \| BlockType` | Type of the command item |

## ContextMenuSettings API

Complete API reference for `ContextMenuSettingsModel`:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enable` | `boolean` | `true` | Whether the context menu is enabled |
| `itemTemplate` | `string \| Function` | `null` | Custom template for menu items |
| `items` | `ContextMenuItemModel[]` | `[]` | List of context menu items |
| `showItemOnClick` | `boolean` | `false` | Whether submenu items appear only when clicked |

### ContextMenuItemModel

| Property | Type | Description |
|----------|------|-------------|
| `iconCss` | `string` | CSS class for the menu item icon |
| `id` | `string` | Unique identifier of the context menu item |
| `items` | `ContextMenuItemModel[]` | Submenu items |
| `separator` | `boolean` | Whether this item is a separator |
| `shortcut` | `string` | Keyboard shortcut for the menu item |
| `text` | `string` | Display text of the context menu item |

## BlockActionMenuSettings API

Complete API reference for `BlockActionMenuSettingsModel`:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enable` | `boolean` | `true` | Whether the block actions menu is enabled |
| `enableTooltip` | `boolean` | `true` | Whether tooltips are enabled |
| `items` | `BlockActionItemModel[]` | `[]` | Action items in the block actions menu |
| `popupHeight` | `string` | `'auto'` | Popup height for the action menu |
| `popupWidth` | `string` | `'230px'` | Popup width for the action menu |

### BlockActionItemModel

| Property | Type | Description |
|----------|------|-------------|
| `disabled` | `boolean` | Whether the action item is disabled |
| `iconCss` | `string` | CSS class for the action icon |
| `id` | `string` | Unique identifier of the action item |
| `label` | `string` | Display label of the action item |
| `shortcut` | `string` | Keyboard shortcut for the action |
| `tooltip` | `string` | Tooltip for the action item |

## InlineToolbarSettings API

Complete API reference for `InlineToolbarSettingsModel`:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enable` | `boolean` | `true` | Whether to enable the inline toolbar |
| `items` | `string[]` | `[]` | Individual items within the toolbar |
| `popupWidth` | `string \| number` | `'100%'` | Width of the popup |

## TransformSettings API

Complete API reference for `TransformSettingsModel`:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `string[]` | `[]` | Array of transform command items |
| `popupHeight` | `string` | `''` | Height of the transform menu popup |
| `popupWidth` | `string` | `''` | Width of the transform menu popup |

### Transform Events

| Event | Type | Description |
|-------|------|-------------|
| `itemSelect` | TransformItemSelectEventArgs | Triggers when a transform item is clicked |

## Code Examples

### Complete Slash Command Menu Example

```typescript
import { BlockEditor, BlockType, ContentType } from '@syncfusion/ej2-blockeditor';
import { CommandItemSelectEventArgs, CommandFilteringEventArgs } from '@syncfusion/ej2-blockeditor';

const blockEditor: BlockEditor = new BlockEditor({
    blocks: [
        {
            blockType: 'Paragraph',
            content: [
                {
                    contentType: ContentType.Text,
                    content: 'Type "/" anywhere to open the slash command menu.'
                }
            ]
        }
    ],
    commandMenuSettings: {
        popupWidth: '350px',
        popupHeight: '400px',
        commands: [
            {
                id: 'line-cmd',
                type: BlockType.Divider,
                groupBy: 'Utility',
                label: 'Insert a Line',
                iconCss: 'e-icons e-divider',
            },
            {
                id: 'timestamp-cmd',
                groupBy: 'Actions',
                label: 'Insert Timestamp',
                iconCss: 'e-icons e-schedule',
            }
        ],
        itemSelect: (args: CommandItemSelectEventArgs) => {
            console.log('Command selected:', args.command);
        },
        filtering: (args: CommandFilteringEventArgs) => {
            console.log('Filtering commands:', args.text);
        }
    }
});

blockEditor.appendTo('#blockeditor');
```

### Complete Context Menu Example

This example also demonstrates the built-in **Table** and **Link** context menu options: right-clicking inside a table cell surfaces row/column `Insert`/`Delete` actions, and right-clicking on a link surfaces `Open Link`, `Edit Link`, `Copy Link`, and `Remove Link`.

```typescript
import { BlockEditor, ContentType, ContextMenuItemModel } from '@syncfusion/ej2-blockeditor';
import { ContextMenuOpeningEventArgs, ContextMenuClosingEventArgs, ContextMenuItemSelectEventArgs } from '@syncfusion/ej2-blockeditor';

const customContextMenuItems: ContextMenuItemModel[] = [
    {
        id: 'format-menu',
        text: 'Format',
        iconCss: 'e-icons e-format-painter',
        items: [
            {
                id: 'bold-item',
                text: 'Bold',
                iconCss: 'e-icons e-bold',
            },
            {
                id: 'italic-item',
                text: 'Italic',
                iconCss: 'e-icons e-italic',
            },
            {
                id: 'underline-item',
                text: 'Underline',
                iconCss: 'e-icons e-underline',
            }
        ]
    },
    { separator: true },
    {
        id: 'statistics-item',
        text: 'Block Statistics',
        iconCss: 'e-icons e-chart'
    },
    {
        id: 'export-item',
        text: 'Export Options',
        iconCss: 'e-icons e-export',
        items: [
            {
                id: 'export-json',
                text: 'Export as JSON',
                iconCss: 'e-icons e-file-json'
            },
            {
                id: 'export-html',
                text: 'Export as HTML',
                iconCss: 'e-icons e-file-html'
            },
            {
                id: 'export-pdf',
                text: 'Export as PDF',
                iconCss: 'e-icons e-file-pdf'
            }
        ]
    }
];

// Initialize BlockEditor with custom context menu configuration
const blockEditor: BlockEditor = new BlockEditor({
    blocks: [
        {
            blockType: 'Heading',
            properties: { level: 1 },
            content: [
                {
                    contentType: ContentType.Text,
                    content: 'Context Menu'
                }
            ]
        },
        {
            blockType: 'Paragraph',
            content: [
                {
                    contentType: ContentType.Text,
                    content: 'This is a sample text with a '
                },
                {
                    contentType: ContentType.Link,
                    content: 'link',
                    url: 'https://ej2.syncfusion.com/documentation/block-editor/getting-started',
                    title: 'Block Editor Documentation'
                },
                {
                    contentType: ContentType.Text,
                    content: '. Right-click the link to see link context menu options.'
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
                                content: 'When the cursor is focused on a link, right-click to open the context menu with options like Open Link, Edit Link, Copy Link, and Remove Link.'
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
                    { id: 'col1', headerText: 'Column 1' },
                    { id: 'col2', headerText: 'Column 2' }
                ],
                rows: [
                    {
                        cells: [
                            {
                                columnId: 'col1',
                                blocks: [
                                    {
                                        blockType: 'Paragraph',
                                        content: [
                                            {
                                                contentType: ContentType.Text,
                                                content: 'Cell 1'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                columnId: 'col2',
                                blocks: [
                                    {
                                        blockType: 'Paragraph',
                                        content: [
                                            {
                                                contentType: ContentType.Text,
                                                content: 'Cell 2'
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
                                columnId: 'col1',
                                blocks: [
                                    {
                                        blockType: 'Paragraph',
                                        content: [
                                            {
                                                contentType: ContentType.Text,
                                                content: 'Cell 3'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                columnId: 'col2',
                                blocks: [
                                    {
                                        blockType: 'Paragraph',
                                        content: [
                                            {
                                                contentType: ContentType.Text,
                                                content: 'Cell 4'
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
            blockType: 'Quote',
            properties: {
                children: [
                    {
                        blockType: 'Paragraph',
                        content: [
                            {
                                contentType: ContentType.Text,
                                content: 'Right-click inside a table cell to open the context menu, where you can access options such as inserting or deleting rows/columns and formatting the table.'
                            }
                        ]
                    }
                ]
            }
        }
    ],
    contextMenuSettings: {
        enable: true,
        showItemOnClick: true,
        items: customContextMenuItems,
        opening: (args: ContextMenuOpeningEventArgs) => {
            console.log('Opening context menu');
        },
        closing: (args: ContextMenuClosingEventArgs) => {
            console.log('Closing context menu');
        },
        itemSelect: (args: ContextMenuItemSelectEventArgs) => {
            console.log('Selected:', args.item.text);
        }
    }
});

blockEditor.appendTo('#blockeditor');
```

### Complete Block Action Menu Example

```typescript
import { BlockEditor, ContentType } from '@syncfusion/ej2-blockeditor';
import { BlockActionItemSelectEventArgs } from '@syncfusion/ej2-blockeditor';

const blockEditor: BlockEditor = new BlockEditor({
    blocks: [
        {
            blockType: 'Paragraph',
            content: [
                {
                    contentType: ContentType.Text,
                    content: 'Hover over blocks to see action menu.'
                }
            ]
        }
    ],
    blockActionMenuSettings: {
        enable: true,
        popupWidth: '180px',
        popupHeight: '110px',
        enableTooltip: false,
        items: [
            {
                id: 'highlight-action',
                label: 'Highlight Block',
                iconCss: 'e-icons e-highlight',
                tooltip: 'Highlight this block'
            },
            {
                id: 'copy-content-action',
                label: 'Copy Content',
                iconCss: 'e-icons e-copy',
                tooltip: 'Copy block content'
            }
        ],
        itemSelect: (args: BlockActionItemSelectEventArgs) => {
            console.log('Action selected:', args.item.label);
        }
    }
});

blockEditor.appendTo('#blockeditor');
```

### Complete Inline Toolbar with Transform Example

```typescript
import { BlockEditor, ContentType, ToolbarItemClickEventArgs, TransformItemSelectEventArgs } from '@syncfusion/ej2-blockeditor';

const blockEditor: BlockEditor = new BlockEditor({
    blocks: [
        {
            blockType: 'Paragraph',
            content: [
                {
                    contentType: ContentType.Text,
                    content: 'Select text to see the inline toolbar.'
                }
            ]
        }
    ],
    inlineToolbarSettings: {
        popupWidth: 'auto',
        enable: true,
        items: ['Transform', 'Bold', 'InlineCode', 'Link', 'Color'],
        itemClick: (args: ToolbarItemClickEventArgs) => {
            console.log('Toolbar item clicked:', args.item);
        }
    },
    transformSettings: {
        items: ['Paragraph', 'Heading 1', 'Heading 2', 'BulletList'],
        itemSelect: (args: TransformItemSelectEventArgs) => {
            console.log('Transform to:', args.item);
        }
    },
    fontColorSettings: {
        mode: 'Picker',
        modeSwitcher: true,
        default: '#ff0000',
        columns: 10
    }
});

blockEditor.appendTo('#blockeditor');
```
---
