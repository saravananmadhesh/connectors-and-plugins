# Toolbar Configuration in Syncfusion Angular Rich Text Editor

## Table of Contents
- [Toolbar Types](#toolbar-types)
- [Toolbar Position](#toolbar-position)
- [Sticky Floating Toolbar](#sticky-floating-toolbar)
- [Quick Toolbars](#quick-toolbars)
- [Configuring Toolbar Items](#configuring-toolbar-items)
- [Dynamic Toolbar Enable/Disable](#dynamic-toolbar-enabledisable)

---

## Toolbar Types

Configure using `toolbarSettings.type`. Requires `ToolbarService` in providers.

| Type | Behavior |
|---|---|
| `'Expand'` (default) | Overflowing items hidden in next row, revealed by expand arrow |
| `'MultiRow'` | All items spread across multiple rows — nothing hidden |
| `'Scrollable'` | All items in a single row with horizontal scroll |
| `'Popup'` | Overflowing items go into a popup dropdown |

**Expand (default):**
```typescript
import { Component } from '@angular/core';
import {
  RichTextEditorModule, ToolbarSettingsModel,
  ToolbarService, HtmlEditorService, QuickToolbarService,
  ImageService, LinkService, ToolbarType
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  imports: [RichTextEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-richtexteditor [toolbarSettings]="tools"></ejs-richtexteditor>`,
  providers: [ToolbarService, HtmlEditorService, QuickToolbarService, ImageService, LinkService]
})
export class AppComponent {
  public tools: ToolbarSettingsModel = {
    type: ToolbarType.Expand,
    items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments',
            'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image',
            '|', 'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
  };
}
```

**MultiRow:**
```typescript
public tools: ToolbarSettingsModel = {
  type: ToolbarType.MultiRow,
  items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
          'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
          'Formats', 'Alignments', 'OrderedList', 'UnorderedList', '|',
          'CreateLink', 'Image', 'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
};
```

**Scrollable:**
```typescript
public tools: ToolbarSettingsModel = { type: ToolbarType.Scrollable, items: [...] };
```

**Popup:**
```typescript
public tools: ToolbarSettingsModel = { type: ToolbarType.Popup, items: [...] };
```

---

## Toolbar Position

Set `toolbarSettings.position` to `'Top'` (default) or `'Bottom'`:

```typescript
public tools: ToolbarSettingsModel = {
  position: 'Bottom',
  items: ['Bold', 'Italic', 'Underline', '|', 'Undo', 'Redo']
};
```

---

## Sticky Floating Toolbar

By default, the toolbar floats/sticks at the top while scrolling. Control this with:

- `enableFloating` — enable/disable the floating behavior
- `floatingToolbarOffset` — pixel offset from top when floating

```typescript
import { Component, ViewChild } from '@angular/core';
import {
  RichTextEditorModule, RichTextEditorComponent, ToolbarSettingsModel,
  ToolbarService, HtmlEditorService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  imports: [RichTextEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-richtexteditor #rte [toolbarSettings]="tools" [floatingToolbarOffset]="60">
    </ejs-richtexteditor>
  `,
  providers: [ToolbarService, HtmlEditorService]
})
export class AppComponent {
  @ViewChild('rte') rteObj!: RichTextEditorComponent;

  public tools: ToolbarSettingsModel = {
    enableFloating: true  // default is true
  };

  disableFloating(): void {
    this.rteObj.toolbarSettings.enableFloating = false;
  }
}
```

---

## Quick Toolbars

Quick toolbars are context-sensitive floating toolbars that appear when clicking on images, links, tables, audio, or video. Requires `QuickToolbarService`.

**Image quick toolbar:**
```typescript
import { QuickToolbarSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';

public quickToolbarSettings: QuickToolbarSettingsModel = {
  image: [
    'Replace', 'Align', 'WrapText', 'Caption', 'Remove',
    'InsertLink', 'OpenImageLink', '|',
    'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension'
  ]
};
```

**Link quick toolbar:**
```typescript
public quickToolbarSettings: QuickToolbarSettingsModel = {
  link: ['Open', 'Edit', 'UnLink']
};
```

**Table quick toolbar:**
```typescript
public quickToolbarSettings: QuickToolbarSettingsModel = {
  table: [
    'TableHeader', 'TableRemove', '|',
    'TableRows', 'TableColumns', 'TableCell', '|',
    'TableEditProperties', 'TableCellProperties',
    'Styles', 'BackgroundColor', 'Alignments', 'TableCellVerticalAlign'
  ]
};
```

**Text quick toolbar (appears on text selection):**
```typescript
public quickToolbarSettings: QuickToolbarSettingsModel = {
  text: ['Bold', 'Italic', 'Underline', 'FontColor', 'BackgroundColor',
         'Alignments', '|', 'FontSize', 'FontName', 'Formats',
         'OrderedList', 'UnorderedList', 'FormatPainter']
};
```

**Audio quick toolbar:**
```typescript
public quickToolbarSettings: QuickToolbarSettingsModel = {
  showOnRightClick: true,
  audio: ['AudioReplace', 'Remove', 'AudioLayoutOption']
};
```

**Video quick toolbar:**
```typescript
public quickToolbarSettings: QuickToolbarSettingsModel = {
  showOnRightClick: true,
  video: ['VideoReplace', 'VideoAlign', 'VideoRemove', 'VideoLayoutOption', 'VideoDimension']
};
```

**Render quick toolbar in document body** (prevents clipping in small/constrained layouts):
```typescript
public quickToolbarSettings: QuickToolbarSettingsModel = {
  enableAppendToBody: true,
  text: ['Bold', 'Italic', 'Underline']
};
```

**Full component with quick toolbars:**
```typescript
@Component({
  template: `
    <ejs-richtexteditor
      [toolbarSettings]="tools"
      [quickToolbarSettings]="quickToolbarSettings">
    </ejs-richtexteditor>
  `,
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService,
              QuickToolbarService, TableService]
})
export class AppComponent {
  public tools: ToolbarSettingsModel = {
    items: ['Bold', 'Italic', 'CreateLink', 'Image', 'CreateTable']
  };
  public quickToolbarSettings: QuickToolbarSettingsModel = {
    image: ['Replace', 'Align', 'Remove', 'AltText', 'Dimension'],
    link: ['Open', 'Edit', 'UnLink'],
    table: ['TableHeader', 'TableRemove', 'TableRows', 'TableColumns']
  };
}
```

---

## Configuring Toolbar Items

Use `|` as a separator between groups. Use `-` for a line break in MultiRow mode.

**Common items reference:**

| Category | Items |
|---|---|
| Text formatting | `Bold`, `Italic`, `Underline`, `StrikeThrough`, `ClearFormat`, `Blockquote`, `SubScript`, `SuperScript`, `LowerCase`, `UpperCase` |
| Font & style | `FontName`, `FontSize`, `FontColor`, `BackgroundColor`, `Formats` |
| Alignment | `Alignments`, `JustifyLeft`, `JustifyCenter`, `JustifyRight`, `JustifyFull` |
| Lists | `OrderedList`, `UnorderedList`, `NumberFormatList`, `BulletFormatList`, `Indent`, `Outdent` |
| Insert | `CreateLink`, `Image`, `Video`, `Audio`, `CreateTable`, `HorizontalLine` |
| Other | `FullScreen`, `Print`, `SourceCode`, `Preview`, `Undo`, `Redo`, `ClearAll` |

---

## Dynamic Toolbar Enable/Disable

Access the RTE instance via `@ViewChild` to modify toolbar settings at runtime:

```typescript
import { Component, ViewChild } from '@angular/core';
import { RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  template: `
    <ejs-richtexteditor #rte></ejs-richtexteditor>
    <button (click)="toggleFloating()">Toggle Floating</button>
  `
})
export class AppComponent {
  @ViewChild('rte') rteObj!: RichTextEditorComponent;

  toggleFloating(): void {
    this.rteObj.toolbarSettings.enableFloating =
      !this.rteObj.toolbarSettings.enableFloating;
  }
}
```
