# Toolbar in Syncfusion JavaScript Modern Rich Text Editor

The main toolbar is the primary interaction surface for formatting commands, and its layout and contents are fully configurable through `toolbarSettings`. This page covers the built-in items, layout, floating behaviour, custom items, the block-format toolbar identifiers, and the key-bindings customisation point.

## Table of contents

- [Toolbar items and types](#toolbar-items-and-types)
- [Layout configuration](#layout-configuration)
- [Floating toolbar](#floating-toolbar)
- [Block-format toolbar identifiers](#block-format-toolbar-identifiers)
- [Custom toolbar items](#custom-toolbar-items)
- [Configuring keyboard shortcuts](#configuring-keyboard-shortcuts)
- [Updating toolbar items at runtime](#updating-toolbar-items-at-runtime)
- [API references](#api-references)

## Toolbar items and types

Set `toolbarSettings.items` to the ordered list of buttons (and `'|'` separators) you want to show. The default set already covers the common cases, so you only need to set this when you want to trim it down or add other built-in tools.

If you don't want a toolbar at all — for example, when the editor is driven entirely by your own UI — set `toolbarSettings.enable` to `false` and no toolbar is rendered; the editor stays fully usable programmatically.

> Below are the default toolbar items:
> `['Bold','Italic','Underline','Strikethrough','|','Formats','Alignment','BulletList','NumberedList','|','Link','Image','Table','|','Undo','Redo']`

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI( {
    toolbarSettings: {
        items: ['Bold', 'Italic', 'Underline', 'Strikethrough', '|', 'Formats', 'Alignment', 'BulletList', 'NumberedList', '|', 'Link', 'Image', 'Table', '|', 'Undo', 'Redo'],
        type: 'MultiRow',
        position: 'Top',
        enableFloating: true,
        floatingOffset: 0,
        itemClicked: function (args: any) {
            console.log('Toolbar item clicked:', args);
        },
        updatedToolbarStatus: function (args: any) {
            console.log('Toolbar status updated:', args);
        }
    }
} );
editor.appendTo( '#editor' );
```

### Available toolbar items

The built-in items you can list in `toolbarSettings.items`:

- **History** — `Undo`, `Redo`
- **Text formatting** — `Bold`, `Italic`, `Underline`, `Strikethrough`, `Subscript`, `Superscript`, `InlineCode`, `ClearFormat`
- **Font and color** — `FontName`, `FontSize`, `FontColor`, `BackgroundColor`
- **Structure** — `Formats`, `Paragraph`, `Quote`, `Callout`, `CodeBlock`, `Indent`, `Outdent`, `HorizontalLine`
- **Alignment** — `Alignment`, `AlignLeft`, `AlignCenter`, `AlignRight`, `AlignJustify`
- **Lists** — `BulletFormatList`, `BulletList`, `NumberFormatList`, `NumberedList`
- **Insert** — `Link`, `Image`, `Table`

## Layout configuration

### Type

When your item list is longer than the available width, `toolbarSettings.type` controls how overflow items are displayed. The default value is `'Auto'`, which automatically uses `'Expanded'` mode on web/desktop devices and `'Scrollable'` mode on mobile devices. In `'Expanded'` mode, all toolbar items remain visible by expanding the toolbar to accommodate the available commands without introducing horizontal scrolling. Use `'Scrollable'` to always enable horizontal scrolling, or use `'MultiRow'` to wrap overflow items onto additional rows.

### Position

By default the toolbar sits at the top of the editor (`toolbarSettings.position: 'Top'`); set it to `'Bottom'` if your layout calls for the toolbar underneath the content instead.

## Floating toolbar

For a long document, losing the toolbar off-screen as the user scrolls down is disruptive. `toolbarSettings.enableFloating` is `true` by default, so the toolbar automatically detaches and sticks in place once the editor scrolls out of view. Set it to `false` if you'd rather the toolbar just scroll away with the content. If your page includes a sticky header, use `toolbarSettings.floatingOffset` to add a top offset (in pixels) and prevent the floating toolbar from overlapping the header. The default value is `0`.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

const editor: RichTextEditorUI = new RichTextEditorUI({
    width: '70%',
    toolbarSettings: {
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
    }
});
editor.appendTo('#editor');

const toolbarTypeData: Array<{ text: string; value: string }> = [
    { text: 'Expanded', value: 'Expanded' },
    { text: 'MultiRow', value: 'MultiRow' },
    { text: 'Scrollable', value: 'Scrollable' }
];

const toolbarPositionData: Array<{ text: string; value: string }> = [
    { text: 'Top', value: 'Top' },
    { text: 'Bottom', value: 'Bottom' }
];

const toolbarTypeDropdown: DropDownList = new DropDownList({
    dataSource: toolbarTypeData,
    fields: { text: 'text', value: 'value' },
    value: 'Expanded',
    popupHeight: '200px',
    floatLabelType: 'Auto',
    change: function (args: any) {
        editor.toolbarSettings.type = args.value;
        editor.dataBind();
    }
});

toolbarTypeDropdown.appendTo('#toolbarType');

const toolbarPositionDropdown: DropDownList = new DropDownList({
    dataSource: toolbarPositionData,
    fields: { text: 'text', value: 'value' },
    value: 'Top',
    popupHeight: '150px',
    floatLabelType: 'Auto',
    change: function (args: any) {
        editor.toolbarSettings.position = args.value;
        editor.dataBind();
    }
});

toolbarPositionDropdown.appendTo('#toolbarPosition');

const float: CheckBox = new CheckBox({
    checked: true,
    label: 'Enable Floating',
    change: function (args: any) {
        editor.toolbarSettings.enableFloating = args.checked;
        editor.dataBind();
    }
});

float.appendTo('#float');
```

## Block-format toolbar identifiers

Block formats in the Modern Rich Text Editor change the block-level structure of the document rather than inline text. The editor exposes block formats through two public surfaces: built-in toolbar identifiers in `toolbarSettings.items`, and slash-command entries in `slashCommandSettings.items`. There is no separate public `format` configuration object — every block format is wired through one of those two arrays.

Use the built-in toolbar identifiers from `BuiltInToolbarItem` to add block formats to the editor toolbar. The following example adds `Quote`, `CodeBlock`, `HorizontalLine`, and the `Callout` split-button alongside the default formatting controls.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    toolbarSettings: {
        items: [
            'Bold', 'Italic', 'Underline', 'Strikethrough', '|',
            'Formats', 'Alignment', 'BulletList', 'NumberedList', '|',
            'Quote', 'CodeBlock', 'HorizontalLine', 'Callout', '|',
            'Undo', 'Redo'
        ]
    },
    placeholder: 'Type something...'
});

editor.appendTo('#editor');
```

To expose the same block formats through the slash-command popup, set `slashCommandSettings.enable` to `true` and list the matching entries in `slashCommandSettings.items`. The popup reuses the toolbar identifiers for formats that share a name and adds dedicated entries for the callout variants and collapsible headings.

```ts
import { RichTextEditorUI, SlashCommand } from '@syncfusion/ej2-richtexteditor-ui';

RichTextEditorUI.Inject(SlashCommand);

const editor: RichTextEditorUI = new RichTextEditorUI({
    toolbarSettings: {
        items: ['Formats', 'Alignment', 'Quote', 'CodeBlock', 'HorizontalLine', 'Callout']
    },
    slashCommandSettings: {
        enable: true,
        items: [
            'Paragraph',
            'Heading 1', 'Heading 2', 'Heading 3', 'Heading 4',
            'Blockquote',
            'Info', 'Success', 'Warning', 'Error', 'Note',
            'Collapsible Paragraph',
            'Collapsible Heading 1', 'Collapsible Heading 2',
            'Collapsible Heading 3', 'Collapsible Heading 4'
        ]
    }
});

editor.appendTo('#editor');
```

The block-format toolbar identifiers map to:

- **Paragraph** — toolbar `Paragraph`, slash command `Paragraph`, command `paragraph`.
- **Heading 1–4** — toolbar `Heading 1` … `Heading 4`, slash commands `Heading 1` … `Heading 4`, commands `heading1` … `heading4`.

Headings and paragraph can also be reached through the `Formats` dropdown toolbar item, which exposes `Paragraph` and `Heading 1`–`Heading 4` as a single control.

## Custom toolbar items

Alongside the built-in strings, `toolbarSettings.items` also accepts item objects for tools of your own. Give each one an `actionId` — a unique identifier you'll check for in the `itemClicked` handler — plus the usual presentation properties (`prefixIcon`/`suffixIcon`, `tooltipText`, `align`, `cssClass`, `disabled`, and so on, the same set the underlying EJ2 Toolbar item model uses).

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    toolbarSettings: {
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
        ],
        itemClicked: (args: any): void => {
            if (args.item) {
                const words: number = editor.getText().trim().split(/\s+/).filter(Boolean).length;
                alert('Word count: ' + words);
            }
        }
    }
});

editor.appendTo('#editor');
```

### itemClicked event

Listen for `itemClicked` to know whenever any toolbar button is clicked, before its command runs — this is also how you handle a custom item's action, since custom items don't have a built-in command of their own. The event args' `item` field is the toolbar item's model, so check `args.item.actionId` to identify which custom item was clicked.

### updatedToolbarStatus event

The `updatedToolbarStatus` event is raised after the toolbar synchronizes its visual state with the current editor selection or cursor formatting. Its event arguments provide the active inline marks, block-level formats, and resolved font and color styles.

## Configuring keyboard shortcuts

You can override default shortcut key combinations or assign custom combinations using the `keyBindings` property on `toolbarSettings`.

Syntax rules:

- Modifiers and key values are separated with a `+` symbol (e.g., `'ctrl+alt+k'`).
- Supported modifier tokens: `ctrl`, `shift`, `alt`, and `meta`.
- Key values can be written in lowercase (e.g., `'ctrl+b'`).
- The Modern Rich Text Editor automatically updates corresponding toolbar button tooltips and accessibility attributes to match your custom key bindings.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI( {
    toolbarSettings: {
        items: ['Bold', 'Italic', 'Underline', 'Strikethrough', '|', 'BulletList', 'NumberedList', '|', 'Link', 'Image', 'Table', 'CodeBlock', '|', 'Undo', 'Redo'],
        keyBindings: {
            link: 'ctrl+alt+k',
            image: 'ctrl+alt+i',
            'code-block': 'ctrl+shift+c'
        }
    }
});
editor.appendTo( '#editor' );
```

## Updating toolbar items at runtime

If your toolbar needs to change based on application state — for example, showing a different set of tools depending on the user's permissions — call `editor.updateToolbarItems(updates)` with a batch of add/remove/reorder operations. The editor reconciles only what actually changed rather than re-rendering the whole toolbar, so things like an open dropdown or current focus aren't disrupted.

```ts
editor.updateToolbarItems([
    { action: 'add', item: 'Italic', index: 1 }
]);
```

## API references

API types that back the toolbar surface, sourced from the Syncfusion EJ2 TypeScript API reference for `@syncfusion/ej2-richtexteditor-ui`.

### `AlignmentCommandBuilder`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/alignmentcommandbuilder>

Builder for text alignment command.

#### Methods

- `align` — Set the text alignment. Returns `this`.
- `apply` — Execute the alignment command with set options. Returns `void`.

### `HorizontalRuleCommandBuilder`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/horizontalrulecommandbuilder>

Builder for horizontal line command.

#### Methods

- `apply` — Executes the toggle command. Returns `void`.

### `FormattingStateService`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/formattingstateservice>

Service for querying and caching the editor's formatting state. Ensures formatting state is queried only once per command, and the result is shared to both toolbar and quick-toolbar modules.

#### Methods

- `getCurrentState` — Returns the most recently cached formatting state. Returns `FormattingState | null`.
- `refreshFormattingState(editorCore)` — Queries the current formatting state from the editor and caches it. This is the single query point for all toolbar UI updates.

  | Parameter | Type | Description |
  | --- | --- | --- |
  | `editorCore` | `EditorCore` | The editor core instance |

  Returns `FormattingState`.
### `EditorKeyBindingAction`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/editorkeybindingaction>

Enum members:

- `toolbar-focus`
- `link`
- `image`
- `audio`
- `video`
- `table`
- `undo`
- `redo`
- `bold`
- `italic`
- `underline`
- `strikethrough`
- `superscript`
- `subscript`
- `indents`
- `outdents`
- `clear-format`
- `ordered-list`
- `unordered-list`
- `checklist`
- `inlinecode`
- `uppercase`
- `lowercase`
- `code-block`


### `QuickToolbarSettings`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/quicktoolbarsettings>

Configures the quick toolbar settings of the RichTextEditor.

#### Properties

- `enable` — `boolean` — Specifies whether the quick toolbar is enabled in the RichTextEditor.
  - **Defaults to `true`.**
- `enableAppendToBody` — `boolean` — Specifies whether to append the quick toolbar popup to the document body instead of the editor container. Enable this to avoid clipping in containers with constrained width or overflow. Disable it to keep the popup positioned within the editor container.
  - **Defaults to `false`.**
- `image` — `ImageQuickToolbarItem[]` — Specifies the toolbar items shown when an image is selected.
  - **Defaults to `['AltText', 'Caption', '|', 'Align', 'Display', 'WrapText', '|', 'Dimension', 'Replace', 'Remove']`.**
- `link` — `LinkQuickToolbarItem[]` — Specifies the toolbar items shown when the cursor is inside a link. If no items are configured, the link quick toolbar is not initialized. Default order: Open, Copy, Edit, Remove.
  - **Defaults to `['OpenLink', 'CopyLink', 'EditLink', 'RemoveLink']`.**
- `table` — `TableQuickToolbarItem[]` — Items displayed in the Table Quick Toolbar.
  - **Defaults to `['Header', 'Remove', '|', 'Row', 'Column', '|', 'CellBackgroundColor', 'Align', 'VerticalAlign']`.**
- `text` — `ToolbarItem[]` — Specifies the toolbar items shown when text is selected. If no items are configured, the text quick toolbar is not rendered.
  - **Defaults to `null`.**

### `QuickToolbarSettingsModel`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/quicktoolbarsettingsmodel>

Interface for the class `QuickToolbarSettings`.

#### Properties

- `enable` — `boolean` — Specifies whether the quick toolbar is enabled in the RichTextEditor.
- `enableAppendToBody` — `boolean` — Specifies whether to append the quick toolbar popup to the document body instead of the editor container. Enable this to avoid clipping in containers with constrained width or overflow. Disable it to keep the popup positioned within the editor container.
- `image` — `ImageQuickToolbarItem[]` — Specifies the toolbar items shown when an image is selected.
- `link` — `LinkQuickToolbarItem[]` — Specifies the toolbar items shown when the cursor is inside a link. If no items are configured, the link quick toolbar is not initialized. Default order: Open, Copy, Edit, Remove.
- `table` — `TableQuickToolbarItem[]` — Items displayed in the Table Quick Toolbar.
- `text` — `ToolbarItem[]` — Specifies the toolbar items shown when text is selected. If no items are configured, the text quick toolbar is not rendered.

### `ToolbarSettings`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/toolbarsettings>

Configures the Toolbar settings of the RichTextEditor.

#### Properties

- `enable` — `boolean` — Specifies whether to render the Toolbar in the Editor.
  - **Defaults to `true`.**
- `enableFloating` — `boolean` — Whether the toolbar remains visible while its scroll owner is scrolled.
  - **Defaults to `true`.**
- `floatingOffset` — `number` — Non-negative vertical offset, in pixels, applied while floating.
  - **Defaults to `0`.**
- `items` — `ToolbarItem[]` — Defines the items displayed in the toolbar.
  - **Defaults to `['Bold', 'Italic', 'Underline', 'Strikethrough', '|', 'Formats', 'Alignment', 'BulletList', 'NumberedList', '|', 'Link', 'Image', 'Table', '|', 'Undo', 'Redo']`.**
- `position` — `ToolbarPosition` — Defines whether the toolbar is rendered above or below the editor.
  - **Defaults to `'Top'`.**
- `type` — `ToolbarType` — Defines the toolbar overflow and layout behavior.
  - **Defaults to `'Auto'`.**

#### Events

- `itemClicked` — `EmitType<ToolbarItemClickedEventArgs>` — Event raised when a toolbar item is clicked in the component.
- `updatedToolbarStatus` — `EmitType<UpdatedToolbarStatusEventArgs>` — Raised after the toolbar item status (active states, dropdown values, color picker selections) has been synchronized with the current editor selection. This event fires after formatting states are updated to reflect the user's current cursor position or selection in the editor.

### `ToolbarItemClickedEventArgs`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/toolbaritemclickedeventargs>

Represents the event arguments for a toolbar item click event in the component.

#### Properties

- `dataIndex` — `number` — Specifies the index of the message data associated with the toolbar item click event. This property is not applicable for header toolbar item click.
- `event` — `Event` — Specifies the event object associated with the toolbar item click. Represents the underlying event that triggered the click action, providing details about the event.
- `item` — `ToolbarItemModel` — Specifies the toolbar item that was clicked. Represents the model of the toolbar item that triggered the click event.
- `name` — `string` — Specifies name of the event.

### `ToolbarSettingsModel`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/toolbarsettingsmodel>

Interface for the class `ToolbarSettings`.

#### Properties

- `enable` — `boolean` — Specifies whether to render the Toolbar in the Editor.
- `enableFloating` — `boolean` — Whether the toolbar remains visible while its scroll owner is scrolled.
- `floatingOffset` — `number` — Non-negative vertical offset, in pixels, applied while floating.
- `items` — `ToolbarItem[]` — Defines the items displayed in the toolbar.
- `position` — `ToolbarPosition` — Defines whether the toolbar is rendered above or below the editor.
- `type` — `ToolbarType` — Defines the toolbar overflow and layout behavior.

#### Events

- `itemClicked` — `EmitType<ToolbarItemClickedEventArgs>` — Event raised when a toolbar item is clicked in the component.
- `updatedToolbarStatus` — `EmitType<UpdatedToolbarStatusEventArgs>` — Raised after the toolbar item status (active states, dropdown values, color picker selections) has been synchronized with the current editor selection. This event fires after formatting states are updated to reflect the user's current cursor position or selection in the editor.

### `AddToolbarItem`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/addtoolbaritem>

Adds a toolbar item at a specified index.

#### Properties

- `index` — `number` — Index at which to insert the item.
- `item` — `ToolbarItem` — The item to add.


### `BuiltInToolbarItemConfig`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/builtintoolbaritemconfig>

Configuration for a built-in toolbar item. Helps align built-in items with `ItemModel` properties.

#### Properties

- `align` — `ItemAlign` — Specifies the location for aligning Toolbar items on the Toolbar. Each command will be aligned according to the `align` property.
  - `Left` — To align commands to the left side of the Toolbar.
  - `Center` — To align commands at the center of the Toolbar.
  - `Right` — To align commands to the right side of the Toolbar.

  ```ts
  let toolbar: Toolbar = new Toolbar({
      items: [
          { text: "Home" },
          { text: "My Home Page", align: 'Center' },
          { text: "Search", align: 'Right' },
          { text: "Settings", align: 'Right' }
      ]
  });
  toolbar.appendTo('#element');
  ```

- `cssClass` — `string` — Defines single/multiple classes (separated by space) to be used for customization of commands.
- `disabled` — `boolean` — Specifies whether an item should be disabled or not.
- `htmlAttributes` — `{ [key: string]: string }` — Defines `htmlAttributes` used to add custom attributes to Toolbar command. Supports HTML attributes such as `style`, `class`, etc.
- `id` — `string` — Specifies the unique ID to be used with button or input element of Toolbar items.
- `item` — `BuiltInToolbarItem` — The built-in toolbar item name.
- `overflow` — `OverflowOption` — Specifies the Toolbar command display area when an element's content is too large to fit available space. This is applicable only to popup mode.
  - `Show` — Always shows the item as the primary priority on the Toolbar.
  - `Hide` — Always shows the item as the secondary priority on the popup.
  - `None` — No priority for display, and as per normal order moves to popup when content exceeds.

- `prefixIcon` — `string` — Defines single/multiple classes separated by space used to specify an icon for the button. The icon will be positioned before the text content if text is available, otherwise the icon alone will be rendered.
- `showAlwaysInPopup` — `boolean` — Defines the priority of items to display it in popup always. It allows to maintain toolbar item on popup always but it does not work for toolbar priority items.
- `showTextOn` — `DisplayMode` — Specifies where the button text will be displayed on popup mode of the Toolbar.
  - `Toolbar` — Text will be displayed on Toolbar only.
  - `Overflow` — Text will be displayed only when content overflows to popup.
  - `Both` — Text will be displayed on popup and Toolbar.

- `suffixIcon` — `string` — Defines single/multiple classes separated by space used to specify an icon for the button. The icon will be positioned after the text content if text is available.
- `tabIndex` — `number` — Specifies the tab order of the Toolbar items. When positive values assigned, it allows to switch focus to the next/previous toolbar items with Tab/ShiftTab keys. By default, user can able to switch between items only via arrow keys. If the value is set to `0` for all tool bar items, then tab switches based on element order.
- `template` — `string | Object | Function` — Specifies the HTML element/element ID as a string that can be added as a Toolbar command.

  ```ts
  items: [{ template: '<input placeholder="Search"/>' }, { template: '#checkbox1' }]
  ```

- `text` — `string` — Specifies the text to be displayed on the Toolbar button.
- `tooltipText` — `string` — Specifies the text to be displayed on hovering the Toolbar button.
- `type` — `ItemType` — Specifies the types of command to be rendered in the Toolbar.
  - `Button` — Creates the Button control with its given properties like `text`, `prefixIcon`, etc.
  - `Separator` — Adds a horizontal line that separates the Toolbar commands.
  - `Input` — Creates an input element that is applicable to template rendering with Syncfusion controls like DropDownList, AutoComplete, etc.

- `visible` — `boolean` — Specifies whether an item should be hidden or not.
- `width` — `number | string` — Specifies the width of the Toolbar button commands.

#### Events

- `click` — `EmitType<ClickEventArgs>` — Event triggers when click the toolbar item.

### `CustomToolbarItem`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/customtoolbaritem>

Custom toolbar item with user-defined action.

#### Properties

- `actionId` — `string` — Unique identifier for the custom toolbar item. Used to distinguish items and handle `itemClick` events.
- `align` — `ItemAlign` — Specifies the location for aligning Toolbar items on the Toolbar.
  - `Left` — To align commands to the left side of the Toolbar.
  - `Center` — To align commands at the center of the Toolbar.
  - `Right` — To align commands to the right side of the Toolbar.

- `cssClass` — `string` — Defines single/multiple classes (separated by space) to be used for customization of commands.
- `disabled` — `boolean` — Specifies whether an item should be disabled or not.
- `htmlAttributes` — `{ [key: string]: string }` — Defines `htmlAttributes` used to add custom attributes to Toolbar command.
- `id` — `string` — Specifies the unique ID to be used with button or input element of Toolbar items.
- `macShortcutText` — `string` — Keyboard shortcut tooltip for macOS.
- `overflow` — `OverflowOption` — Specifies the Toolbar command display area when content is too large to fit available space. Applicable only to popup mode.
  - `Show` — Primary priority on the Toolbar.
  - `Hide` — Secondary priority on the popup.
  - `None` — No priority.

- `prefixIcon` — `string` — Defines single/multiple classes separated by space used to specify an icon for the button. The icon will be positioned before the text content if text is available, otherwise the icon alone will be rendered.
- `showAlwaysInPopup` — `boolean` — Defines the priority of items to display it in popup always. Does not work for toolbar priority items.
- `showTextOn` — `DisplayMode`
  - `Toolbar` — Text on Toolbar only.
  - `Overflow` — Text on overflow only.
  - `Both` — Text on popup and Toolbar.

- `suffixIcon` — `string` — Defines single/multiple classes separated by space used to specify an icon for the button. The icon will be positioned after the text content if text is available.
- `tabIndex` — `number` — Specifies the tab order of the Toolbar items. Supports positive values to enable Tab/ShiftTab key navigation; `0` switches based on element order.
- `template` — `string | Object | Function` — Specifies the HTML element/element ID as a string that can be added as a Toolbar command.
- `text` — `string` — Specifies the text to be displayed on the Toolbar button.
- `tooltipText` — `string` — Specifies the text to be displayed on hovering the Toolbar button.
- `type` — `ItemType`
  - `Button` — Button control with its given properties.
  - `Separator` — Horizontal line separator.
  - `Input` — Input element for Syncfusion controls (DropDownList, AutoComplete, etc.).

- `visible` — `boolean` — Specifies whether an item should be hidden or not.
- `width` — `number | string` — Specifies the width of the Toolbar button commands.
- `windowsShortcutText` — `string` — Keyboard shortcut tooltip for Windows.

#### Events

- `click` — `EmitType<ClickEventArgs>` — Event triggers when click the toolbar item.

### `DisableToolbarItem`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/disabletoolbaritem>

Disables a toolbar item by ID.

#### Properties

- `itemId` — `string` — Stable ID of the item to disable.

### `EnableToolbarItem`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/enabletoolbaritem>

Enables a toolbar item by ID.

#### Properties

- `itemId` — `string` — Stable ID of the item to enable.

### `HideToolbarItem`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/hidetoolbaritem>

Hides a toolbar item by ID.

#### Properties

- `itemId` — `string` — Stable ID of the item to hide.

### `RemoveToolbarItem`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/removetoolbaritem>

Removes a toolbar item by ID.

#### Properties

- `index` — `number` — Index of the item to remove.
- `itemId` — `string` — Stable ID of the item to remove.

### `ShowToolbarItem`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/showtoolbaritem>

Shows a toolbar item by ID.

#### Properties

- `itemId` — `string` — Stable ID of the item to show.

### `BuiltInToolbarItem`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/builtintoolbaritem>

Built-in toolbar item names for common editor commands.

#### Enum members

`Undo`, `Redo`, `Bold`, `Italic`, `Underline`, `Strikethrough`, `Subscript`, `Superscript`, `UpperCase`, `LowerCase`, `HorizontalLine`, `InlineCode`, `Formats`, `FontSize`, `FontColor`, `BackgroundColor`, `FontName`, `BulletList`, `NumberedList`, `NumberFormatList`, `BulletFormatList`, `Checklist`, `Alignment`, `Quote`, `CodeBlock`, `Callout`, `Link`, `Image`, `Table`, `ClearFormat`, `Heading 1`, `Heading 2`, `Heading 3`, `Heading 4`, `Paragraph`, `Indent`, `Outdent`, `AlignLeft`, `AlignCenter`, `AlignRight`, `AlignJustify`, `CalloutInfo`, `CalloutSuccess`, `CalloutWarning`, `CalloutError`, `CalloutNote`.

### `ToolbarItem`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/toolbaritem>

Union type for toolbar items. Accepts built-in items by name, custom configurations, custom items, or separators.

#### Union members

`BuiltInToolbarItem`, `BuiltInToolbarItemConfig`, `CustomToolbarItem`, `|`.

### `ToolbarItemUpdate`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/toolbaritemupdate>

Discriminated union for toolbar item update operations. Used during reconciliation of items array changes and direct toolbar updates.

#### Union members

`AddToolbarItem`, `RemoveToolbarItem`, `ShowToolbarItem`, `HideToolbarItem`, `EnableToolbarItem`, `DisableToolbarItem`.

### `ToolbarPosition`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/toolbarposition>

Defines the toolbar vertical position relative to editor.

#### Enum members

`Top`, `Bottom`.

### `ToolbarType`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/toolbartype>

Defines the toolbar overflow and layout behavior.

#### Enum members

`Auto`, `Expanded`, `MultiRow`, `Scrollable`.

### `StaticFunctions`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/staticfunctions>

Root static functions of the `RichTextEditorUI` component. Hosts toolbar reconciliation — see `getting-started.md` for the root component itself.

#### `reconcileToolbarItems`

Reconciles two toolbar item collections. Detects added and removed items and returns the required update operations.

| Parameter | Type | Description |
| --- | --- | --- |
| `newItems` | `ToolbarItem[]` | The updated toolbar items |
| `oldItems` | `ToolbarItem[]` | The previous toolbar items |

Returns `ToolbarItemUpdate[]`.
