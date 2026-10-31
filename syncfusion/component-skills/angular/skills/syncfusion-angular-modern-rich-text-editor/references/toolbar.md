# Toolbar

## Table of Contents
- [Overview](#overview)
- [Toolbar items (`toolbarSettings.items`)](#toolbar-items-toolbarsettingsitems)
  - [Default toolbar items](#default-toolbar-items)
  - [Available built-in toolbar items](#available-built-in-toolbar-items)
- [Layout configuration](#layout-configuration)
  - [Type (`toolbarSettings.type`)](#type-toolbarsettingstype)
  - [Position (`toolbarSettings.position`)](#position-toolbarsettingsposition)
- [Floating Toolbar (`toolbarSettings.enableFloating`)](#floating-toolbar-toolbarsettingsenablefloating)
- [Quick Toolbar overview (`quickToolbarSettings`)](#quick-toolbar-overview-quicktoolbarsettings)
  - [Text Quick Toolbar](#text-quick-toolbar)
  - [Image Quick Toolbar](#image-quick-toolbar)
  - [Link Quick Toolbar](#link-quick-toolbar)
  - [Table Quick Toolbar](#table-quick-toolbar)
  - [Custom toolbar items (`CustomToolbarItem`)](#custom-toolbar-items-customtoolbaritem)
- [Toolbar events](#toolbar-events)
  - [`itemClicked` event](#itemclicked-event)
  - [`updatedToolbarStatus` event](#updatedtoolbarstatus-event)
- [Updating toolbar items at runtime](#updating-toolbar-items-at-runtime)
- [Keyboard shortcuts (history & navigation)](#keyboard-shortcuts-history--navigation)
- [API Reference](#api-reference)
  - [AddToolbarItem](#addtoolbaritem)
  - [DisableToolbarItem](#disabletoolbaritem)
  - [EnableToolbarItem](#enabletoolbaritem)
  - [HideToolbarItem](#hidetoolbaritem)
  - [HorizontalRuleCommandBuilder](#horizontalrulecommandbuilder)
  - [itemClickEventArgs](#itemclickeventargs)
  - [QuickToolbarSettings](#quicktoolbarsettings)
  - [QuickToolbarSettingsModel](#quicktoolbarsettingsmodel)
  - [RemoveToolbarItem](#removetoolbaritem)
  - [ShowToolbarItem](#showtoolbaritem)
  - [Static Functions (`reconcileToolbarItems`)](#static-functions-reconciletoolbaritems)
  - [ToolbarItem](#toolbaritem)
  - [ToolbarItemClickedEventArgs](#toolbaritemclickedeventargs)
  - [ToolbarItemUpdate](#toolbaritemupdate)
  - [ToolbarPosition](#toolbarposition)
  - [ToolbarSettings](#toolbarsettings)
  - [ToolbarSettingsModel](#toolbarsettingsmodel)
  - [ToolbarType](#toolbartype)
  - [UpdatedToolbarStatusEventArgs](#updatedtoolbarstatuseventargs)
  - [BuiltInToolbarItem](#builtintoolbaritem)
  - [BuiltInToolbarItemConfig](#builtintoolbaritemconfig)
  - [CustomToolbarItem](#customtoolbaritem)

---

## Overview

The main toolbar is the primary interaction surface for formatting commands, and its layout and contents are fully configurable through `toolbarSettings`. The Quick Toolbar is a contextual popup toolbar that appears next to the current selection inside the editable area, giving fast access to the most relevant commands without moving focus to the top of the editor. It is wired through `quickToolbarSettings` on `<ejs-richtexteditor-ui>`.

## Toolbar items (`toolbarSettings.items`)

Set `toolbarSettings.items` to the ordered list of buttons (and `'|'` separators) you want to show. The default set already covers the common cases, so you only need to set this when you want to trim it down or add other built-in tools.

If you don't want a toolbar at all — for example, when the editor is driven entirely by your own UI — set `toolbarSettings.enable` to `false` and no toolbar is rendered; the editor stays fully usable programmatically.

### Default toolbar items

> **Note:** Below are the default toolbar items:
> `['Bold','Italic','Underline','Strikethrough','|','Formats','Alignment','BulletList','NumberedList','|','Link','Image','Table','|','Undo','Redo']`

### Available built-in toolbar items

The built-in items you can list in [`toolbarSettings.items`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/toolbarsettings#items):

* **History** — `Undo`, `Redo`
* **Text formatting** — `Bold`, `Italic`, `Underline`, `Strikethrough`, `Subscript`, `Superscript`, `InlineCode`, `ClearFormat`
* **Font and color** — `FontName`, `FontSize`, `FontColor`, `BackgroundColor`
* **Structure** — `Formats`, `Paragraph`, `Quote`, `Callout`, `CodeBlock`, `Indent`, `Outdent`, `HorizontalLine`
* **Alignment** — `Alignment`, `AlignLeft`, `AlignCenter`, `AlignRight`, `AlignJustify`
* **Lists** — `BulletFormatList`, `BulletList`, `NumberFormatList`, `NumberedList`
* **Insert** — `Link`, `Image`, `Table`

Beyond these, you can add your own entries — see [Custom toolbar items](#custom-toolbar-items-customtoolbaritem) below.

## Layout configuration

### Type (`toolbarSettings.type`)

When your item list is longer than the available width, [`toolbarSettings.type`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/toolbarsettings#type) controls how overflow items are displayed. The default value is `'Auto'`, which automatically uses `'Expanded'` mode on web/desktop devices and `'Scrollable'` mode on mobile devices. In `'Expanded'` mode, all toolbar items remain visible by expanding the toolbar to accommodate the available commands without introducing horizontal scrolling. Use `'Scrollable'` to always enable horizontal scrolling, or use `'MultiRow'` to wrap overflow items onto additional rows.

### Position (`toolbarSettings.position`)

By default the toolbar sits at the top of the editor (`toolbarSettings.position: 'Top'`); set it to `'Bottom'` if your layout calls for the toolbar underneath the content instead.

## Floating Toolbar (`toolbarSettings.enableFloating`)

For a long document, losing the toolbar off-screen as the user scrolls down is disruptive. [`toolbarSettings.enableFloating`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/toolbarSettings#enableFloating) is `true` by default, so the toolbar automatically detaches and sticks in place once the editor scrolls out of view. Set it to `false` if you'd rather the toolbar just scroll away with the content. If your page includes a sticky header, use [`toolbarSettings.floatingOffset`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/toolbarSettings#floatingOffset) to add a top offset (in pixels) and prevent the floating toolbar from overlapping the header. The default value is `0`.

```ts
import { Component } from '@angular/core';
import { RichTextEditorUIModule } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class App {
    public toolbarSettings: object = {
        items: [
            'Undo', 'Redo', '|',
            'Bold', 'Italic', 'Underline', 'Strikethrough', '|',
            'FontColor', 'BackgroundColor', '|',
            'Formats', 'Alignment', '|',
            'Table', 'Image', 'Link', '|',
            'FontName', 'FontSize', '|',
            'NumberFormatList', 'BulletFormatList', '|',
            'Subscript', 'Superscript'
        ],
        type: 'Expanded',
        position: 'Top'
    };
}
```

```html
<ejs-richtexteditor-ui [toolbarSettings]="toolbarSettings"></ejs-richtexteditor-ui>
```

## Quick Toolbar overview (`quickToolbarSettings`)

The Modern Rich Text Editor exposes the Quick Toolbar through one configuration object with five sub-surfaces:

| Property | Type | Default | Purpose |
| --- | --- | --- | --- |
| `enable` | `boolean` | `true` | Master switch for all quick toolbars. |
| `enableAppendToBody` | `boolean` | `false` | Mounts the popup to the document body to escape clipping inside narrow or scroll-constrained containers. |
| `text` | `ToolbarItem[]` | `null` | Items shown when text is selected. |
| `image` | `ImageQuickToolbarItem[]` | `['AltText', 'Caption', '\|', 'Align', 'Display', 'WrapText', '\|', 'Dimension', 'Replace', 'Remove']` | Items shown when an image is selected. |
| `link` | `LinkQuickToolbarItem[]` | `['Open', 'Copy', 'Edit', 'Remove']` | Items shown when the caret is inside a link. |
| `table` | `TableQuickToolbarItem[]` | `['Header', 'Remove', '\|', 'Row', 'Column', '\|', 'CellBackgroundColor', 'Align', 'VerticalAlign']` | Items shown when the caret is inside a table. |

```ts
import { Component } from '@angular/core';
import { RichTextEditorUIModule, SlashCommandService } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    providers: [SlashCommandService],
    templateUrl: './app.component.html'
})
export class App {
    public placeholder: string = 'Type something ...';
    public quickToolbarSettings: object = {
        enable: true,
        text: [
            'Undo', 'Redo', '|',
            'Bold', 'Italic', 'Underline', 'Strikethrough', '|',
            'FontColor', 'BackgroundColor', '|',
            'Formats', '|',
            'NumberedList', 'BulletList'
        ],
        image: ['AltText', 'Caption', '|', 'Align', 'Display', 'WrapText', '|', 'Dimension', 'Replace', 'Remove'],
        link:  ['Open', 'Copy', 'Edit', 'Remove'],
        table: ['Header', 'Remove', '|', 'Row', 'Column', '|', 'CellBackgroundColor', 'Align', 'VerticalAlign']
    };
}
```

```html
<ejs-richtexteditor-ui
    [placeholder]="placeholder"
    [quickToolbarSettings]="quickToolbarSettings">
</ejs-richtexteditor-ui>
```

When [`quickToolbarSettings.enable`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/index-default#quicktoolbarsettings) is `true` and at least one of `text`, `image`, `link`, or `table` is non-empty, the corresponding popup is built and bound to the relevant editor surface. Any sub-surface whose array is empty (or `null`) is **not** instantiated — set `text` to `null` to disable the text quick toolbar while keeping the image / link / table ones.

> **Note:** Inline mode can be achieved by disabling the main toolbar and adding the text quick-toolbar items on the `quickToolbarSettings.text` surface:
>
> ```ts
> public toolbarSettings: object = {
>     enable: false
> };
> public quickToolbarSettings: object = {
>     enable: true,
>     text: [
>         'Bold', 'Italic', 'Underline', '|',
>         'Formats', 'Alignment', '|',
>         'NumberedList', 'BulletList', '|',
>         'Undo', 'Redo'
>     ]
> };
> ```

### Text Quick Toolbar

`text` is the array of items shown when a non-collapsed text selection exists inside the editor. The popup opens on `mouseup` and `keyup` (when a non-collapsed selection exists), and closes on `Escape`, on outside interaction, or on `selectionchange` that empties the selection.

The default is `null`, which means the Text Quick Toolbar is **not** rendered unless you supply a non-empty `text` array. The Text Quick Toolbar is the only quick-toolbar surface that accepts the full [`ToolbarItem`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/toolbaritem) union — built-in identifiers, built-in-with-config objects, custom items, and the `'|'` separator.

```ts
import { Component } from '@angular/core';
import { RichTextEditorUIModule } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class App {
    public quickToolbarSettings: object = {
        enable: true,
        text: [
            'Undo', 'Redo', '|',
            'Bold', 'Italic', 'Underline', 'Strikethrough', '|',
            'FontColor', 'BackgroundColor', '|',
            'Formats', '|',
            'NumberedList', 'BulletList'
        ]
    };
}
```

```html
<ejs-richtexteditor-ui [quickToolbarSettings]="quickToolbarSettings"></ejs-richtexteditor-ui>
```

#### When the Text Quick Toolbar opens

The Text Quick Toolbar opens under three triggers:

- **Mouse selection (`mouseup`)** — after the user finishes a drag-select inside the editable area.
- **Keyboard selection (`keyup`)** — when the user extends a selection with Shift + arrow keys.
- **Triple-click (`trippleclick`)** — when the user triple-clicks a word or block; the toolbar opens centred above the block.

The popup is dismissed on:

- `Escape` key.
- Editor blur (configurable).

### Image Quick Toolbar

```ts
type ImageQuickToolbarItem = 'AltText' | 'Caption' | 'Align' | 'Display' | 'WrapText' | 'Dimension' | 'Replace' | 'Remove' | '|' | CustomToolbarItem;
```

| Identifier | Behavior |
| --- | --- |
| `AltText` | Opens the alt-text editor for the selected image. |
| `Caption` | Adds or edits a `<figcaption>` rendered inside a `<figure>` wrapper. |
| `Align` | Opens the horizontal-align picker (left / center / right). |
| `Display` | Switches between `inline` (default) and `break` (block) display. |
| `WrapText` | Opens the wrap-text picker (left / right / none). |
| `Dimension` | Opens the width/height editor (uses `imageSettings.dimension`). |
| `Replace` | Replaces the selected image with a new source. |
| `Remove` | Deletes the image. |
| `\|` | Visual separator. |
| `CustomToolbarItem` | A user-defined item routed through `toolbarSettings.itemClicked`. |

The default array is:

```ts
image: ['AltText', 'Caption', '|', 'Align', 'Display', 'WrapText', '|', 'Dimension', 'Replace', 'Remove']
```

### Link Quick Toolbar

```ts
type LinkQuickToolbarItem = 'Open' | 'Copy' | 'Edit' | 'Remove' | '|' | CustomToolbarItem;
```

| Identifier | Behavior |
| --- | --- |
| `Open` | Opens the link `href` in a new tab using the configured `target`. |
| `Copy` | Copies the link `href` to the clipboard. |
| `Edit` | Opens the Insert-Link dialog pre-filled with the current link. |
| `Remove` | Removes the link while keeping the link text. |
| `\|` | Visual separator used to split action groups inside the popup. |
| `CustomToolbarItem` | A user-defined item routed through `toolbarSettings.itemClicked`. |

The default array is:

```ts
link: ['Open', 'Copy', 'Edit', 'Remove']
```

To disable the Link Quick Toolbar without disabling the rest of the quick toolbar system, set `link: []` or `link: null` — the toolbar is only instantiated when `link` is a non-empty array.

### Table Quick Toolbar

```ts
type TableQuickToolbarItem = 'Row' | 'Column' | 'Header' | 'CellBackgroundColor' | 'VerticalAlign' | 'Align' | 'Remove' | '|' | CustomToolbarItem;
```

| Identifier | Behavior |
| --- | --- |
| `Row` | Opens the row sub-popup (insert above / below, delete row). |
| `Column` | Opens the column sub-popup (insert left / right, delete column). |
| `Header` | Toggles the table header row. |
| `CellBackgroundColor` | Opens the background-color picker for the active cell. |
| `VerticalAlign` | Opens the vertical-align picker (top / middle / bottom). |
| `Align` | Opens the horizontal-align picker (left / center / right). |
| `Remove` | Deletes the table. |
| `\|` | Visual separator. |
| `CustomToolbarItem` | A user-defined item routed through `toolbarSettings.itemClicked`. |

The default array is:

```ts
table: ['Header', 'Remove', '|', 'Row', 'Column', '|', 'CellBackgroundColor', 'Align', 'VerticalAlign']
```

### Custom toolbar items (`CustomToolbarItem`)

A **Custom Toolbar Item** is a user-supplied toolbar entry that does not map to a built-in editor command. It is declared through the `CustomToolbarItem` interface and is dispatched through the editor's `toolbarSettings.itemClicked` event.

The Text Quick Toolbar [`quickToolbarSettings.text`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/quicktoolbarsettings#text) accepts the full `ToolbarItem` union — built-in identifiers, built-in-with-config objects, custom items, and the `'|'` separator. The item shapes that can be mixed into any Text Quick Toolbar array are:

| Item form | Example | Purpose |
| --- | --- | --- |
| Built-in identifier | `'Bold'` | Use the editor's built-in handler. |
| Built-in with config | `{ item: 'Bold', align: 'Right' }` | Override the label of a built-in. |
| Custom item | `{ actionId: 'save', id: 'save', text: 'Save' }` | Wire a user-defined action (this section). |
| Separator | \| | Visual divider between groups. |

Add `actionId` (and optional shortcut labels) to the toolbar item to make it route through [`toolbarSettings.itemClicked`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/toolbarsettings#itemclicked):

```ts
export interface CustomToolbarItem extends ItemModel {
    actionId: string;
    windowsShortcutText?: string;
    macShortcutText?: string;
}
```

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `actionId` | `string` | Yes | Stable identifier — read off the clicked item in [`toolbarSettings.itemClicked`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/toolbarsettings#itemclicked) to route the action. |
| `windowsShortcutText` | `string` | No | Tooltip text for the Windows keyboard shortcut. |
| `macShortcutText` | `string` | No | Tooltip text for the macOS keyboard shortcut. |

Any other field inherited from `ItemModel` (`text`, `id`, `iconCss`, `prefixIcon`, `tooltipText`, `htmlAttributes`, etc.) is also accepted.

A custom item can appear in any of the four quick-toolbar arrays — `text`, `image`, `link`, `table` — because each of those arrays is a union that includes `CustomToolbarItem`. See [Available Items](#available-items) for the full built-in catalog.

The click is delivered through `toolbarSettings.itemClicked` with the following args shape:

```ts
interface ToolbarItemClickedEventArgs {
    item?: ToolbarItemModel;   // the clicked item (custom `actionId` is preserved)
    event?: Event;             // the originating DOM event
    dataIndex?: number;
}
```

[`ToolbarItemClickedEventArgs`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/ToolbarItemClickedEventArgs) is defined in `@syncfusion/ej2-richtexteditor-ui`'s toolbar settings model and is the declared type of the `toolbarSettings.itemClicked` event handler. If your import surface only re-exports it indirectly, declare the handler args shape inline (the type is structural).

```ts
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { RichTextEditorUIModule, RichTextEditorUIComponent } from '@syncfusion/ej2-angular-richtexteditor-ui';

// The args shape is `{ item: ToolbarItemModel, event: Event }`.
// `ToolbarItemClickedEventArgs` lives in the toolbar-settings model file and
// is the canonical handler-arg type — declared inline here for portability.
interface ClickedArgs {
    item?: { id?: string; actionId?: string };
    event?: Event;
}

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class App implements AfterViewInit {
    @ViewChild('editor') public rteObj!: RichTextEditorUIComponent;

    public toolbarSettings: object = {
        itemClicked: (args: ClickedArgs): void => {
            if (args.item && args.item.actionId === 'uppercase') {
                // dispatch the `uppercase` command through the fluent builder
                this.rteObj.commands().uppercase().apply();
            }
        }
    };

    public quickToolbarSettings: object = {
        enable: true,
        text: [
            'Bold', 'Italic', 'Underline', '|',
            {
                actionId: 'uppercase',
                id: 'uppercase',
                text: 'UPPERCASE',
                tooltipText: 'Transform selection to UPPERCASE',
                windowsShortcutText: 'Ctrl + Shift + U',
                macShortcutText: '⇧ ⌘ U'
            },
            '|',
            'NumberedList', 'BulletList'
        ]
    };

    ngAfterViewInit(): void {
        // Replace the placeholder toolbarSettings on the live instance to wire the click handler
        (this.rteObj as any).toolbarSettings = this.toolbarSettings;
    }
}
```

```html
<ejs-richtexteditor-ui
    #editor
    [toolbarSettings]="toolbarSettings"
    [quickToolbarSettings]="quickToolbarSettings">
</ejs-richtexteditor-ui>
```

> `actionId` is the routing key. `toolbarSettings.itemClicked` is fired for every toolbar item (main and quick) — branch on `args.item.actionId` to dispatch the right command or run your custom handler. The public top-level `itemClick` event you may see in older guides does not exist on `RichTextEditorUI`; the public surface is `toolbarSettings.itemClicked`.

Custom items are accepted by `image`, `link`, and `table` as well. The `link` and `image` arrays are unions that include `CustomToolbarItem`, so the same shape works in every quick-toolbar context.

## Toolbar events

### `itemClicked` event

Listen for `itemClicked` to know whenever any toolbar button is clicked, before its command runs — this is also how you handle a custom item's action, since custom items don't have a built-in command of their own. The event args' `item` field is the toolbar item's model, so check `args.item.actionId` to identify which custom item was clicked.

```ts
import { Component, ViewChild } from '@angular/core';
import { RichTextEditorUIModule, RichTextEditorUIComponent } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class App {
    @ViewChild('editor') public rteObj!: RichTextEditorUIComponent;

    public toolbarSettings: object = {
        items: [
            'Bold', 'Italic', 'Underline', '|',
            {
                id: 'WordCount',
                actionId: 'wordCount',
                prefixIcon: 'e-icons e-numbering-list',
                tooltipText: 'Word count',
                align: 'Left'
            },
            '|', 'Undo', 'Redo'
        ]
    };

    public onItemClicked(args: any): void {
        if (args.item) {
            const words: number = this.rteObj.getText().trim().split(/\s+/).filter(Boolean).length;
            alert('Word count: ' + words);
        }
    }
}
```

```html
<ejs-richtexteditor-ui
    #editor
    [toolbarSettings]="toolbarSettings"
    (itemClicked)="onItemClicked($event)">
</ejs-richtexteditor-ui>
```

### `updatedToolbarStatus` event

The [`updatedToolbarStatus`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/toolbarsettings#updatedtoolbarstatus) event is raised after the toolbar synchronizes its visual state with the current editor selection or cursor formatting. Its event arguments provide the active inline marks, block-level formats, and resolved font and color styles.

The following example demonstrates how to handle the `updatedToolbarStatus` event and display which text formatting styles (bold, italic, underline, strikethrough) are currently active at the cursor position.

```ts
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { RichTextEditorUIModule, RichTextEditorUIComponent, UpdatedToolbarStatusEventArgs } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html'
})
export class App implements AfterViewInit {
    @ViewChild('editor') public rteObj!: RichTextEditorUIComponent;

    public eventLog: string = 'Action: Click or type inside the editor to see active toolbar status...';

    public toolbarSettings: object = {
        items: ['Bold', 'Italic', 'Underline', 'Strikethrough', '|', 'Formats', 'Alignment', 'BulletList', 'NumberedList', '|', 'Link', 'Image', 'Table', '|', 'Undo', 'Redo']
    };

    ngAfterViewInit(): void {
        // This event fires whenever the cursor moves or text formatting changes
        this.rteObj.toolbarSettings = this.toolbarSettings;
        (this.rteObj.toolbarSettings as any).updatedToolbarStatus = (args: UpdatedToolbarStatusEventArgs) => {
            if (args) {
                const activeMarks: any = (args as any).activeMarks || {};
                // Format a simple readable string for beginners to see what is active
                if (activeMarks.bold && activeMarks.italic) {
                    this.eventLog = 'Active Formats: Both Bold and Italic format is active';
                } else if (activeMarks.bold) {
                    this.eventLog = 'Active Formats: Bold format is active';
                } else if (activeMarks.italic) {
                    this.eventLog = 'Active Formats: Italic format is active';
                } else {
                    this.eventLog = 'Active Formats: Neither Bold nor Italic is active';
                }
            }
        };
    }
}
```

```html
<p>Type some text here, make it <strong>bold</strong> or <em>italic</em>, and watch the status below change!</p>
<ejs-richtexteditor-ui #editor></ejs-richtexteditor-ui>
<div class="event-dashboard">
    <span class="badge">{{ eventLog }}</span>
</div>
```

## Updating toolbar items at runtime

If your toolbar needs to change based on application state — for example, showing a different set of tools depending on the user's permissions — call `editor.updateToolbarItems(updates)` with a batch of add/remove/reorder operations. The editor reconciles only what actually changed rather than re-rendering the whole toolbar, so things like an open dropdown or current focus aren't disrupted.

## Keyboard shortcuts (history & navigation)

| Action | Windows / Linux | macOS | Description |
| :--- | :--- | :--- | :--- |
| **Undo** | <kbd>Ctrl</kbd> + <kbd>Z</kbd> | <kbd>⌘</kbd> + <kbd>Z</kbd> | Reverts the previous editing action. |
| **Redo** | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> | <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> | Reapplies the previously undone action. |
| **Toolbar Focus** | <kbd>Alt</kbd> + <kbd>F10</kbd> | <kbd>Option</kbd> + <kbd>F10</kbd> | Shifts focus directly to the first active toolbar item. |
| **Escape** | <kbd>Esc</kbd> | <kbd>Esc</kbd> | Closes open dropdowns, popups, or dialog windows. |

For the complete list of keyboard shortcuts covering text formatting, lists, and insertions, see the per-feature references: [Formatting](formatting.md), [Lists](lists.md), [Table](table.md), [Image](image.md), [Links](links.md), [Code Block](codeblock.md).

### Enable Append To Body

`enableAppendToBody` controls whether the quick toolbar popup is mounted on `document.body` or on the editor container.

- When set to `true`, the popup is appended to the document body and remains visible over the editor area.
- When set to `false` (default), the popup is appended to the editor area and always remains inside the editor area.

```ts
import { Component } from '@angular/core';
import { RichTextEditorUIModule } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class App {
    public quickToolbarSettings: object = {
        enable: true,
        enableAppendToBody: true,
        text: ['Bold', 'Italic', 'Underline', '|', 'Formats', '|', 'NumberedList', 'BulletList'],
        image: ['AltText', 'Caption', 'Align', 'Display', 'WrapText', '|', 'Dimension', 'Replace', 'Remove'],
        link:  ['Open', 'Copy', 'Edit', 'Remove'],
        table: ['Header', 'Remove', '|', 'Row', 'Column', '|', 'CellBackgroundColor', 'Align', 'VerticalAlign']
    };
}
```

```html
<ejs-richtexteditor-ui [quickToolbarSettings]="quickToolbarSettings"></ejs-richtexteditor-ui>
```

> With `enableAppendToBody: true`, the popup is parented to `document.body` and its visibility is clamped to the editor's bounds — the popup hides itself off-screen when the target block scrolls out of the editor's visible region.
---

## API Reference

### AddToolbarItem

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/addtoolbaritem>

Adds a toolbar item at a specified index.

#### Properties

- `index: number` — Index at which to insert the item.
- `item: ToolbarItem` — The item to add.

---

### DisableToolbarItem

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/disabletoolbaritem>

Disables a toolbar item by ID.

#### Properties

- `itemId: string` — Stable ID of the item to disable.

---

### EnableToolbarItem

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/enabletoolbaritem>

Enables a toolbar item by ID.

#### Properties

- `itemId: string` — Stable ID of the item to enable.

---

### HideToolbarItem

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/hidetoolbaritem>

Hides a toolbar item by ID.

#### Properties

- `itemId: string` — Stable ID of the item to hide.

---

### HorizontalRuleCommandBuilder

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/horizontalrulecommandbuilder>

Builder for horizontal line command.

#### Methods

- `apply(): void` — Executes the toggle command.

---

### itemClickEventArgs

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/itemclickeventargs>

Event arguments for the `itemClick` event raised when a toolbar item is clicked.

#### Properties

- `actionId: string` — The action/command ID for the clicked item.
- `item: ToolbarItem` — The toolbar item configuration.
- `itemId: string` — Stable ID of the toolbar item that was clicked.
- `originalEvent: MouseEvent | KeyboardEvent` — The originating DOM event.

---

### QuickToolbarSettings

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/quicktoolbarsettings>

Configures the quick toolbar settings of the RichTextEditor.

#### Properties

- `enable: boolean` — Specifies whether the quick toolbar is enabled in the RichTextEditor. Defaults to `true`.
- `enableAppendToBody: boolean` — Specifies whether to append the quick toolbar popup to the document body instead of the editor container. Enable this to avoid clipping in containers with constrained width or overflow. Disable it to keep the popup positioned within the editor container. Defaults to `false`.
- `image: ImageQuickToolbarItem[]` — Specifies the toolbar items shown when an image is selected. Defaults to `['AltText', 'Caption', '|', 'Align', 'Display', 'WrapText', '|', 'Dimension', 'Replace', 'Remove']`.
- `link: LinkQuickToolbarItem[]` — Specifies the toolbar items shown when the cursor is inside a link. If no items are configured, the link quick toolbar is not initialized. Default order: `Open`, `Copy`, `Edit`, `Remove`. Defaults to `['OpenLink', 'CopyLink', 'EditLink', 'RemoveLink']`.
- `table: TableQuickToolbarItem[]` — Items displayed in the Table Quick Toolbar. Defaults to `['Header', 'Remove', '|', 'Row', 'Column', '|', 'CellBackgroundColor', 'Align', 'VerticalAlign']`.
- `text: ToolbarItem[]` — Specifies the toolbar items shown when text is selected. If no items are configured, the text quick toolbar is not rendered. Defaults to `null`.

---

### QuickToolbarSettingsModel

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/quicktoolbarsettingsmodel>

Interface for a class `QuickToolbarSettings`.

#### Properties

- `enable: boolean` — Specifies whether the quick toolbar is enabled in the RichTextEditor.
- `enableAppendToBody: boolean` — Specifies whether to append the quick toolbar popup to the document body instead of the editor container.
- `image: ImageQuickToolbarItem[]` — Specifies the toolbar items shown when an image is selected.
- `link: LinkQuickToolbarItem[]` — Specifies the toolbar items shown when the cursor is inside a link.
- `table: TableQuickToolbarItem[]` — Items displayed in the Table Quick Toolbar.
- `text: ToolbarItem[]` — Specifies the toolbar items shown when text is selected.

---

### RemoveToolbarItem

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/removetoolbaritem>

Removes a toolbar item by ID.

#### Properties

- `index: number` — Index of the item to remove.
- `itemId: string` — Stable ID of the item to remove.

---

### ShowToolbarItem

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/showtoolbaritem>

Shows a toolbar item by ID.

#### Properties

- `itemId: string` — Stable ID of the item to show.

---

### Static Functions (`reconcileToolbarItems`)

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/staticfunctions>

Root static functions of the RichtexteditorUi Component.

#### `reconcileToolbarItems(newItems, oldItems): ToolbarItemUpdate[]`

Reconciles two toolbar item collections. Detects added and removed items and returns the required update operations.

- `newItems: ToolbarItem[]` — The updated toolbar items.
- `oldItems: ToolbarItem[]` — The previous toolbar items.

Returns `ToolbarItemUpdate[]`.

---

### ToolbarItem

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/toolbaritem>

Union type for toolbar items. Accepts built-in items by name, custom configurations, custom items, or separators.

Members:

- `BuiltInToolbarItem`
- `BuiltInToolbarItemConfig`
- `CustomToolbarItem`
- `|` (separator)

---

### ToolbarItemClickedEventArgs

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/toolbaritemclickedeventargs>

Represents the event arguments for a toolbar item click event in the component.

#### Properties

- `dataIndex: number` — Specifies the index of the message data associated with the toolbar item click event. This property is not applicable for header toolbar item click.
- `event: Event` — Specifies the event object associated with the toolbar item click. Represents the underlying event that triggered the click action, providing details about the event.
- `item: ToolbarItemModel` — Specifies the toolbar item that was clicked. Represents the model of the toolbar item that triggered the click event.
- `name: string` — Specifies name of the event.

---

### ToolbarItemUpdate

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/toolbaritemupdate>

Discriminated union for toolbar item update operations. Used during reconciliation of items array changes and direct toolbar updates.

Members:

- `AddToolbarItem`
- `RemoveToolbarItem`
- `ShowToolbarItem`
- `HideToolbarItem`
- `EnableToolbarItem`
- `DisableToolbarItem`

---

### ToolbarPosition

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/toolbarposition>

Defines the toolbar vertical position relative to editor.

Members:

- `Top`
- `Bottom`

---

### ToolbarSettings

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/toolbarsettings>

Configures the Toolbar settings of the RichTextEditor.

#### Properties

- `enable: boolean` — Specifies whether to render the Toolbar in the Editor. Defaults to `true`.
- `enableFloating: boolean` — Whether the toolbar remains visible while its scroll owner is scrolled. Defaults to `true`.
- `floatingOffset: number` — Non-negative vertical offset, in pixels, applied while floating. Defaults to `0`.
- `items: ToolbarItem[]` — Defines the items displayed in the toolbar. Defaults to `['Bold', 'Italic', 'Underline', 'Strikethrough', '|', 'Formats', 'Alignment', 'BulletList', 'NumberedList', '|', 'Link', 'Image', 'Table', '|', 'Undo', 'Redo']`.
- `position: ToolbarPosition` — Defines whether the toolbar is rendered above or below the editor. Defaults to `'Top'`.
- `type: ToolbarType` — Defines the toolbar overflow and layout behavior. Defaults to `'Auto'`.

#### Events

- `itemClicked: EmitType<ToolbarItemClickedEventArgs>` — Event raised when a toolbar item is clicked in the component.
- `updatedToolbarStatus: EmitType<UpdatedToolbarStatusEventArgs>` — Raised after the toolbar item status (active states, dropdown values, color picker selections) has been synchronized with the current editor selection. This event fires after formatting states are updated to reflect the user's current cursor position or selection in the editor.

---

### ToolbarSettingsModel

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/toolbarsettingsmodel>

Interface for a class `ToolbarSettings`.

#### Properties

- `enable: boolean` — Specifies whether to render the Toolbar in the Editor.
- `enableFloating: boolean` — Whether the toolbar remains visible while its scroll owner is scrolled.
- `floatingOffset: number` — Non-negative vertical offset, in pixels, applied while floating.
- `items: ToolbarItem[]` — Defines the items displayed in the toolbar.
- `position: ToolbarPosition` — Defines whether the toolbar is rendered above or below the editor.
- `type: ToolbarType` — Defines the toolbar overflow and layout behavior.

#### Events

- `itemClicked: EmitType<ToolbarItemClickedEventArgs>` — Event raised when a toolbar item is clicked in the component.
- `updatedToolbarStatus: EmitType<UpdatedToolbarStatusEventArgs>` — Raised after the toolbar item status (active states, dropdown values, color picker selections) has been synchronized with the current editor selection. This event fires after formatting states are updated to reflect the user's current cursor position or selection in the editor.

---

### ToolbarType

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/toolbartype>

Defines the toolbar overflow and layout behavior.

Members:

- `Auto`
- `Expanded`
- `MultiRow`
- `Scrollable`

---

### UpdatedToolbarStatusEventArgs

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/updatedtoolbarstatuseventargs>

Event arguments for the `updatedToolbarStatus` event raised after the toolbar synchronizes its visual state (active buttons, dropdown values, color pickers) with the current editor selection / cursor formatting.

#### Properties

- `activeMarks: Object` — Snapshot of the active marks at the current selection.
- `blockFormats: Object` — Snapshot of block-level formats at the current selection.
- `styles: Object` — Resolved font / color values at the current selection.

---

### BuiltInToolbarItem

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/builtintoolbaritem>

Built-in toolbar item names for common editor commands.

Members:

- `Undo`
- `Redo`
- `Bold`
- `Italic`
- `Underline`
- `Strikethrough`
- `Subscript`
- `Superscript`
- `UpperCase`
- `LowerCase`
- `HorizontalLine`
- `InlineCode`
- `Formats`
- `FontSize`
- `FontColor`
- `BackgroundColor`
- `FontName`
- `BulletList`
- `NumberedList`
- `NumberFormatList`
- `BulletFormatList`
- `Checklist`
- `Alignment`
- `Quote`
- `CodeBlock`
- `Callout`
- `Link`
- `Image`
- `Table`
- `ClearFormat`
- `Heading 1`
- `Heading 2`
- `Heading 3`
- `Heading 4`
- `Paragraph`
- `Indent`
- `Outdent`
- `AlignLeft`
- `AlignCenter`
- `AlignRight`
- `AlignJustify`
- `CalloutInfo`
- `CalloutSuccess`
- `CalloutWarning`
- `CalloutError`
- `CalloutNote`

---

### BuiltInToolbarItemConfig

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/builtintoolbaritemconfig>

Configuration for a built-in toolbar item. Helps align built-in items with `ItemModel` properties.

#### Properties

- `align: ItemAlign` — Specifies the location for aligning Toolbar items on the Toolbar. Possible values: `Left`, `Center`, `Right`.
- `cssClass: string` — Defines single/multiple classes (separated by space) to be used for customization of commands.
- `disabled: boolean` — Specifies whether an item should be disabled or not.
- `htmlAttributes: { [key: string]: string }` — Defines `htmlAttributes` used to add custom attributes to Toolbar command. Supports HTML attributes such as `style`, `class`, etc.
- `id: string` — Specifies the unique ID to be used with button or input element of Toolbar items.
- `item: BuiltInToolbarItem` — The built-in toolbar item name.
- `overflow: OverflowOption` — Specifies the Toolbar command display area when an element's content is too large to fit available space. Applicable only to `popup` mode. Possible values: `Show` (always shows the item as primary priority), `Hide` (always shows as secondary priority on the popup), `None` (no priority; moves to popup when content exceeds).
- `prefixIcon: string` — Defines single/multiple classes separated by space used to specify an icon for the button. Positioned before the text content if text is available, otherwise the icon alone will be rendered.
- `showAlwaysInPopup: boolean` — Defines the priority of items to display it in popup always. Maintains toolbar item on popup always but does not work for toolbar priority items.
- `showTextOn: DisplayMode` — Specifies where the button text will be displayed on popup mode of the Toolbar. Possible values: `Toolbar` (text on Toolbar only), `Overflow` (text only when content overflows to popup), `Both` (text on popup and Toolbar).
- `suffixIcon: string` — Defines single/multiple classes separated by space used to specify an icon for the button. Positioned after the text content if text is available.
- `tabIndex: number` — Specifies the tab order of the Toolbar items. When positive values assigned, it allows to switch focus to the next/previous toolbar items with Tab/ShiftTab keys. By default, user can switch between items only via arrow keys. If the value is set to 0 for all toolbar items, then tab switches based on element order.
- `template: string | object` — Specifies the HTML element/element ID as a string that can be added as a Toolbar command. Example: `items: [{ template: '<input placeholder="Search"/>' },{ template: '#checkbox1' }]`.
- `text: string` — Specifies the text to be displayed on the Toolbar button.
- `tooltipText: string` — Specifies the text to be displayed on hovering the Toolbar button.
- `type: ItemType` — Specifies the types of command to be rendered in the Toolbar. Supported types: `Button` (creates the Button control), `Separator` (adds a horizontal line), `Input` (creates an input element for template rendering with Syncfusion controls like DropDownList, AutoComplete, etc.).
- `visible: boolean` — Specifies whether an item should be hidden or not.
- `width: number | string` — Specifies the width of the Toolbar button commands.

#### Events

- `click: EmitType<ClickEventArgs>` — Event triggers when `click` the toolbar item.

---

### CustomToolbarItem

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/customtoolbaritem>

Custom toolbar item with user-defined action.

#### Properties

- `actionId: string` — Unique identifier for the custom toolbar item. Used to distinguish items and handle `itemClick` events.
- `align: ItemAlign` — Specifies the location for aligning Toolbar items on the Toolbar. Possible values: `Left`, `Center`, `Right`.
- `cssClass: string` — Defines single/multiple classes (separated by space) to be used for customization of commands.
- `disabled: boolean` — Specifies whether an item should be disabled or not.
- `htmlAttributes: { [key: string]: string }` — Defines `htmlAttributes` used to add custom attributes to Toolbar command.
- `id: string` — Specifies the unique ID to be used with button or input element of Toolbar items.
- `macShortcutText: string` — Keyboard shortcut tooltip for macOS.
- `overflow: OverflowOption` — Specifies the Toolbar command display area when an element's content is too large to fit available space. Possible values: `Show`, `Hide`, `None`.
- `prefixIcon: string` — Defines single/multiple classes separated by space used to specify an icon for the button.
- `showAlwaysInPopup: boolean` — Defines the priority of items to display it in popup always.
- `showTextOn: DisplayMode` — Specifies where the button text will be displayed on popup mode of the Toolbar.
- `suffixIcon: string` — Defines single/multiple classes separated by space used to specify an icon for the button.
- `tabIndex: number` — Specifies the tab order of the Toolbar items.
- `template: string | object` — Specifies the HTML element/element ID as a string that can be added as a Toolbar command.
- `text: string` — Specifies the text to be displayed on the Toolbar button.
- `tooltipText: string` — Specifies the text to be displayed on hovering the Toolbar button.
- `type: ItemType` — Specifies the types of command to be rendered in the Toolbar.
- `visible: boolean` — Specifies whether an item should be hidden or not.
- `width: number | string` — Specifies the width of the Toolbar button commands.
- `windowsShortcutText: string` — Keyboard shortcut tooltip for Windows.

#### Events

- `click: EmitType<ClickEventArgs>` — Event triggers when `click` the toolbar item.
