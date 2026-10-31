# Customizing Editor Menus

## Table of Contents
- [Overview](#overview)
- [Slash Command Menu](#slash-command-menu)
- [Context Menu](#context-menu)
- [Block Action Menu](#block-action-menu)
- [Inline Toolbar](#inline-toolbar)
- [Configuration Examples](#configuration-examples)

## Overview

The Block Editor provides four customizable menus that enable efficient content creation:

1. **Slash Command Menu** - Type "/" to access block creation commands
2. **Context Menu** - Right-click to access editing actions
3. **Block Action Menu** - Click menu icon next to block for block-specific actions
4. **Inline Toolbar** - Select text to access formatting options

Each menu can be customized with custom items, filtered commands, and event handlers.

## Slash Command Menu

The Slash Command menu opens when typing "/" and provides quick access to block insertion commands.

### Built-in Commands

The menu includes commands for:
- **Headings**: Heading 1, 2, 3, 4
- **Lists**: Bullet List, Numbered List, Checklist
- **Blocks**: Paragraph, Quote, Callout, Divider
- **Content**: Table, Image, Code Block, Embed
- **Utility**: Toggle (collapsible), Horizontal Rule

### Configuration

Customize using the `commandMenuSettings` property:

```typescript
commandMenuSettings: CommandMenuSettingsModel = {
  popupWidth: '350px',
  popupHeight: '400px',
  commands: [
    // Custom command items
    {
      id: 'custom-cmd',
      type: BlockType.Divider,
      groupBy: 'Utility',
      label: 'Custom Command',
      iconCss: 'e-icons e-custom-icon'
    }
  ],
  filtering: (args: CommandFilteringEventArgs) => {
    // Handle filtering
  },
  itemSelect: (args: CommandItemSelectEventArgs) => {
    // Handle selection
  }
};
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `popupWidth` | string | Width of the popup menu |
| `popupHeight` | string | Height of the popup menu |
| `commands` | array | Array of custom command items |
| `filtering` | function | Event triggered when filtering |
| `itemSelect` | function | Event triggered on selection |

### Example: Add Custom Slash Command

```typescript
import { Component } from '@angular/core';
import { BlockEditorModule } from '@syncfusion/ej2-angular-blockeditor';
import { BlockModel, BlockType, CommandFilteringEventArgs } from '@syncfusion/ej2-blockeditor';

@Component({
  imports: [BlockEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-blockeditor [blocks]="blocksData" [commandMenuSettings]="commandMenuSettings" />`
})
export class AppComponent {
  public blocksData: BlockModel[] = [
    {
      blockType: 'Paragraph',
      content: [{ contentType: ContentType.Text, content: 'Type "/" to open menu' }]
    }
  ];

  public commandMenuSettings = {
    popupWidth: '350px',
    popupHeight: '400px',
    commands: [
      {
        id: 'custom-divider',
        type: BlockType.Divider,
        groupBy: 'Utility',
        label: 'Horizontal Line',
        iconCss: 'e-icons e-separate'
      },
      {
        id: 'timestamp',
        groupBy: 'Actions',
        label: 'Insert Timestamp',
        iconCss: 'e-icons e-schedule'
      }
    ],
    itemSelect: (args: CommandItemSelectEventArgs) => {
      if (args.item.id === 'timestamp') {
        // Handle custom command
        console.log('Timestamp inserted');
      }
    }
  };
}
```

## Context Menu

The Context menu appears on right-click and provides editing actions.

### Built-in Items

- **Undo/Redo**: Revert or reapply actions
- **Cut/Copy/Paste**: Clipboard operations
- **Link**: Add or edit hyperlinks. When the cursor is focused on a link, options are available directly from the context menu to `Edit`, `Open`, `Copy`, and `Remove` the link
- **Table**: When the cursor is focused within a table cell, options are available directly from the context menu to `Insert` and `Delete` rows/columns
- **Indent/Outdent**: Adjust block indentation

### Configuration

Use `contextMenuSettings` to customize:

```typescript
contextMenuSettings = {
  enable: true,
  showItemOnClick: true,
  items: [
    {
      id: 'format-menu',
      text: 'Format',
      iconCss: 'e-icons e-format-painter',
      items: [
        { id: 'bold', text: 'Bold', iconCss: 'e-icons e-bold' },
        { id: 'italic', text: 'Italic', iconCss: 'e-icons e-italic' }
      ]
    },
    { separator: true },
    {
      id: 'export-menu',
      text: 'Export',
      items: [
        { id: 'export-json', text: 'As JSON' },
        { id: 'export-html', text: 'As HTML' }
      ]
    }
  ],
  opening: (args: ContextMenuOpeningEventArgs) => {
    // Modify menu before opening
  },
  closing: (args: ContextMenuClosingEventArgs) => {
    // Handle menu closing
  },
  itemSelect: (args: ContextMenuItemSelectEventArgs) => {
    // Handle item selection
  }
};
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `enable` | boolean | Enable/disable context menu |
| `showItemOnClick` | boolean | Show items on click vs hover |
| `items` | array | Menu items with nested support |
| `opening` | function | Fired before menu opens |
| `closing` | function | Fired before menu closes |
| `itemSelect` | function | Fired when item is selected |

### Example: Custom Context Menu

```typescript
const customContextMenu = {
  enable: true,
  showItemOnClick: true,
  items: [
    {
      id: 'statistics',
      text: 'Block Statistics',
      iconCss: 'e-icons e-chart'
    },
    { separator: true },
    {
      id: 'export',
      text: 'Export',
      items: [
        { id: 'json', text: 'JSON', iconCss: 'e-icons e-file-json' },
        { id: 'html', text: 'HTML', iconCss: 'e-icons e-file-html' }
      ]
    }
  ],
  itemSelect: (args: ContextMenuItemSelectEventArgs) => {
    if (args.item.id === 'statistics') {
      console.log('Show statistics');
    }
  }
};
```

## Block Action Menu

The Block Action menu appears when hovering over a block's drag handle icon.

### Built-in Actions

- **Duplicate**: Create a copy of the block
- **Delete**: Remove the block
- **Move Up/Down**: Reorder blocks

### Configuration

Use `blockActionMenuSettings`:

```typescript
blockActionMenuSettings = {
  enable: true,
  popupWidth: '180px',
  popupHeight: '110px',
  enableTooltip: true,
  items: [
    {
      id: 'highlight',
      label: 'Highlight Block',
      iconCss: 'e-icons e-highlight',
      tooltip: 'Add highlight styling'
    },
    {
      id: 'copy-content',
      label: 'Copy Content',
      iconCss: 'e-icons e-copy',
      tooltip: 'Copy to clipboard'
    },
    {
      id: 'info',
      label: 'Block Info',
      tooltip: 'Show block information'
    }
  ],
  opening: (args: BlockActionMenuOpeningEventArgs) => {
    // Customize menu before opening
  },
  itemSelect: (args: BlockActionItemSelectEventArgs) => {
    // Handle action selection
  }
};
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `enable` | boolean | Enable/disable menu |
| `popupWidth` | string | Menu width |
| `popupHeight` | string | Menu height |
| `enableTooltip` | boolean | Show tooltips on hover |
| `items` | array | Custom action items |
| `opening` | function | Fired before menu opens |
| `itemSelect` | function | Fired on action selection |

## Inline Toolbar

The Inline Toolbar appears when text is selected.

### Built-in Items

- **Text Styles**: Bold, Italic, Underline, Strikethrough
- **Colors**: Text color, Background color
- **Case**: Uppercase, Lowercase
- **Advanced**: Superscript, Subscript, Inline Code, Link

### Configuration

Use `inlineToolbarSettings`:

```typescript
inlineToolbarSettings = {
  enable: true,
  popupWidth: 'auto',
  items: [
    'Transform',
    'Bold',
    'Italic',
    'Underline',
    'StrikeThrough',
    'Color',
    'Backgroundcolor',
    'InlineCode',
    'Link'
  ],
  itemClick: (args: ToolbarItemClickEventArgs) => {
    // Handle toolbar action
  }
};
```

### Text Transform Options

The `transformSettings` property customizes block transformation options:

```typescript
transformSettings = {
  items: [
    'Paragraph',
    'Heading 1',
    'Heading 2',
    'Heading 3',
    'Heading 4',
    'BulletList',
    'NumberedList',
    'Checklist'
  ],
  itemSelect: (args: TransformItemSelectEventArgs) => {
    // Handle transform
  }
};
```

### Color Settings

Customize font and background colors:

```typescript
fontColorSettings = {
  mode: 'Picker',
  modeSwitcher: true,
  colors: ['#FF0000', '#00FF00', '#0000FF']
};

backgroundColorSettings = {
  mode: 'Palette',
  colors: ['#FFFF00', '#00FFFF', '#FF00FF']
};
```

## Configuration Examples

### Example 1: Minimal Toolbar

```typescript
inlineToolbarSettings = {
  enable: true,
  items: ['Bold', 'Italic', 'Underline']
};
```

### Example 2: Full-Featured Toolbar

```typescript
inlineToolbarSettings = {
  enable: true,
  popupWidth: 'auto',
  items: [
    'Transform',
    'Bold',
    'Italic',
    'Underline',
    'StrikeThrough',
    'Color',
    'Backgroundcolor',
    'InlineCode',
    'Link',
    'Superscript',
    'Subscript'
  ]
};
```

### Example 3: Complete Menu Setup

```typescript
@Component({
  imports: [BlockEditorModule],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public commandMenuSettings = {
    popupWidth: '350px',
    commands: [
      { id: 'divider', type: BlockType.Divider, label: 'Line' }
    ]
  };

  public contextMenuSettings = {
    enable: true,
    items: [
      { id: 'copy', text: 'Copy', iconCss: 'e-icons e-copy' },
      { id: 'paste', text: 'Paste', iconCss: 'e-icons e-paste' }
    ]
  };

  public inlineToolbarSettings = {
    enable: true,
    items: ['Bold', 'Italic', 'Underline', 'Color', 'Link']
  };

  public blockActionMenuSettings = {
    enable: true,
    items: [
      { id: 'duplicate', label: 'Duplicate' },
      { id: 'delete', label: 'Delete' }
    ]
  };
}
```

