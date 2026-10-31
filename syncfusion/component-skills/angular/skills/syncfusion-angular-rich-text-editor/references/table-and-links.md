# Tables and Links in Syncfusion Angular Rich Text Editor

## Table of Contents
- [Inserting Tables](#inserting-tables)
- [Table Quick Toolbar Actions](#table-quick-toolbar-actions)
- [Table Settings Configuration](#table-settings-configuration)
- [Inserting Links](#inserting-links)
- [Link Quick Toolbar Actions](#link-quick-toolbar-actions)
- [Auto Link Generation](#auto-link-generation)
- [Disabling Auto URL Protocol Prefix](#disabling-auto-url-protocol-prefix)

---

## Inserting Tables

Add `CreateTable` to toolbar items. Requires `TableService` in providers.

The table grid lets users select rows/columns visually. On mobile devices, a dialog with numeric input is shown instead.

```typescript
import { Component } from '@angular/core';
import {
  RichTextEditorModule, ToolbarSettingsModel,
  ToolbarService, LinkService, ImageService, HtmlEditorService,
  QuickToolbarService, TableService, PasteCleanupService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  imports: [RichTextEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-richtexteditor [toolbarSettings]="tools" [(value)]="content"></ejs-richtexteditor>`,
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService,
              QuickToolbarService, TableService, PasteCleanupService]
})
export class AppComponent {
  public content: string = '<p>Click the table tool to insert a table.</p>';
  public tools: ToolbarSettingsModel = {
    items: ['CreateTable', '|', 'Bold', 'Italic', '|', 'Undo', 'Redo']
  };
}
```

---

## Table Quick Toolbar Actions

Configure available table actions via `quickToolbarSettings.table`:

```typescript
import { QuickToolbarSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';

public quickToolbarSettings: QuickToolbarSettingsModel = {
  table: [
    'TableHeader',          // Toggle header row
    'TableRemove',          // Delete the entire table
    '|',
    'TableRows',            // Insert/delete rows dropdown
    'TableColumns',         // Insert/delete columns dropdown
    'TableCell',            // Merge/split cells
    '|',
    'TableEditProperties',  // Table width, padding, spacing
    'TableCellProperties',  // Cell width, padding, border
    'Styles',               // Table style presets
    'BackgroundColor',      // Cell background color
    'Alignments',           // Horizontal alignment
    'TableCellVerticalAlign' // Vertical alignment
  ]
};
```

**Available table quick toolbar items:**

| Item | What it does |
|---|---|
| `TableHeader` | Add/remove header row |
| `TableRemove` | Delete the entire table |
| `TableRows` | Insert row above/below, delete row |
| `TableColumns` | Insert column left/right, delete column |
| `TableCell` | Merge or split cells |
| `TableEditProperties` | Edit table width, padding, cell spacing |
| `TableCellProperties` | Edit individual cell width, padding, border |
| `Styles` | Apply a table style preset |
| `BackgroundColor` | Set cell background color |
| `Alignments` | Horizontal alignment for cell content |
| `TableCellVerticalAlign` | Vertical alignment (top/middle/bottom) |

---

## Table Settings Configuration

```typescript
import { TableSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';

public tableSettings: TableSettingsModel = {
  width: '100%',          // Default table width
  styles: [               // Available style presets in quick toolbar
    { text: 'Dashed Borders', command: 'Table', subcommand: 'Dashed' },
    { text: 'Alternate Rows', command: 'Table', subcommand: 'Alternate' }
  ],
  resize: true,           // Enable column resize by dragging borders
  minWidth: 0,            // Min column width
  maxWidth: null          // Max column width (null = no limit)
};
```

```html
<ejs-richtexteditor [tableSettings]="tableSettings"></ejs-richtexteditor>
```

---

## Inserting Links

Add `CreateLink` to toolbar items. Requires `LinkService` in providers.

The Insert Link dialog provides:
- **Web Address** — destination URL
- **Display Text** — text shown for the link
- **Tooltip** — hover tooltip text
- **Open Link in New Window** — adds `target="_blank"`

```typescript
import { Component } from '@angular/core';
import {
  RichTextEditorModule,
  ToolbarService, LinkService, ImageService,
  HtmlEditorService, QuickToolbarService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  imports: [RichTextEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-richtexteditor [toolbarSettings]="tools"></ejs-richtexteditor>`,
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService]
})
export class AppComponent {
  public tools = { items: ['CreateLink', 'Image'] };
}
```

---

## Link Quick Toolbar Actions

Configure link context toolbar via `quickToolbarSettings.link`:

```typescript
public quickToolbarSettings = {
  link: ['Open', 'Edit', 'UnLink']
};
```

| Item | What it does |
|---|---|
| `Open` | Open the URL in a new tab |
| `Edit` | Reopen the link dialog to edit |
| `UnLink` | Remove the link, preserve text |

---

## Auto Link Generation

When a user types a URL and presses **Space** or **Enter**, the editor automatically wraps it in an `<a>` tag. This is enabled by default.

To disable this auto-link behavior:

```typescript
@Component({
  template: `<ejs-richtexteditor [enableAutoUrl]="false"></ejs-richtexteditor>`
})
```

---

## Disabling Auto URL Protocol Prefix

By default, the editor prefixes `https://` to relative URLs typed in the link dialog. To accept URLs as-is (e.g., relative paths like `/about`), set `enableAutoUrl` to `true`:

```typescript
@Component({
  template: `<ejs-richtexteditor [enableAutoUrl]="true"></ejs-richtexteditor>`
})
export class AppComponent {}
```

> **Counterintuitive:** `enableAutoUrl: true` means "accept the URL as typed" (no auto prefix). `enableAutoUrl: false` (default) means "auto-add https:// if missing".
