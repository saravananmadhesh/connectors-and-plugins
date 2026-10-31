# Slash Commands in Syncfusion JavaScript Modern Rich Text Editor

The Slash command in the Modern Rich Text Editor provides users with an efficient way to apply formatting, insert elements, and execute custom commands by simply typing the `/` character. This feature enhances the user experience by offering quick access to common editing actions within the editor.

## Table of contents

- [Enabling the slash command](#enabling-the-slash-command)
- [Module injection](#module-injection)
- [Available items](#available-items)
- [Configure slash command items](#configure-slash-command-items)
- [Add custom slash command items](#add-custom-slash-command-items)
- [Use the itemSelect event](#use-the-itemselect-event)
- [Selection and lifecycle behavior](#selection-and-lifecycle-behavior)
- [API references](#api-references)

## Enabling the slash command

To use the Slash command, set the `enable` property within `slashCommandSettings` to `true`. By default, this feature is disabled. Once enabled, the Slash command popup will appear when the user types the `/` character in the editor.

```ts
import { RichTextEditorUI, SlashCommand } from '@syncfusion/ej2-richtexteditor-ui';

RichTextEditorUI.Inject(SlashCommand);

const editor: RichTextEditorUI = new RichTextEditorUI({
    slashCommandSettings: {
        enable: true
    }
});
editor.appendTo('#editor');
```

Setting `enable` to `false` at runtime removes the popup and stops listening for the `/` trigger. The editor continues to function normally without the Slash command feature.

## Module injection

Slash command is a standalone module. Inject it through `RichTextEditorUI.Inject` before creating the editor instance. If you skip this step, the editor renders without the Slash command capability, even when `slashCommandSettings.enable` is `true`.

```ts
import { RichTextEditorUI, SlashCommand } from '@syncfusion/ej2-richtexteditor-ui';

RichTextEditorUI.Inject(SlashCommand);

const editor: RichTextEditorUI = new RichTextEditorUI({
    slashCommandSettings: { enable: true }
});
editor.appendTo('#editor');
```

The injection is a one-time, side-effect-only call. It registers the module class with the editor; subsequent `new RichTextEditorUI({...})` calls do not need to re-inject.

## Available items

The Slash command ships with a curated set of built-in items. When `items` is not overridden, all of the following are available:

| Item | Type | Dispatches |
| --- | --- | --- |
| `Paragraph` | `Basic Block` | `paragraph` |
| `Heading 1` | `Basic Block` | `heading1` |
| `Heading 2` | `Basic Block` | `heading2` |
| `Heading 3` | `Basic Block` | `heading3` |
| `Heading 4` | `Basic Block` | `heading4` |
| `NumberedList` | `Basic Block` | `numberedList` |
| `BulletList` | `Basic Block` | `bulletList` |
| `Checklist` | `Basic Block` | `checklist` |
| `Blockquote` | `Basic Block` | `blockQuote` |
| `Info` | `Basic Block` | `calloutInfo` |
| `Warning` | `Basic Block` | `calloutWarning` |
| `Error` | `Basic Block` | `calloutError` |
| `Success` | `Basic Block` | `calloutSuccess` |
| `Note` | `Basic Block` | `calloutNote` |
| `Collapsible Paragraph` | `Basic Block` | `collapsible` with `triggerType: 'paragraph'` |
| `Collapsible Heading 1` | `Basic Block` | `collapsible` with `level: 1` |
| `Collapsible Heading 2` | `Basic Block` | `collapsible` with `level: 2` |
| `Collapsible Heading 3` | `Basic Block` | `collapsible` with `level: 3` |
| `Collapsible Heading 4` | `Basic Block` | `collapsible` with `level: 4` |
| `Link` | `Inline` | `InsertLink` (provided by the `Link` module) |
| `Image` | `Media` | `InsertImage` (provided by the `Image` module) |
| `Table` | `Basic Block` | `InsertTable` (provided by the `Table` module) |

The `Dispatches` column shows the editor command the item routes through. Built-in items never raise the `itemSelect` event for their default action; the editor dispatches the command itself.

`Link`, `Image`, and `Table` are contributed by their respective feature modules. They appear in the popup only when the corresponding module is also injected.

## Configure slash command items

The `items` property on `slashCommandSettings` controls which items appear in the popup. By default, every built-in item is included. Override `items` to:

- **Restrict** the popup to a subset of built-ins.
- **Reorder** items — the array order is the popup order.
- **Add** custom items alongside or instead of built-ins.
- **Remove** specific groups, for example to hide all `Media` items.

```ts
slashCommandSettings: {
    enable: true,
    items: ['Paragraph', 'Heading 1', 'Heading 2', 'Heading 3', 'BulletList', 'NumberedList']
}
```

The popup size can be customized through `popupWidth` and `popupHeight`. Both accept pixel values, numbers (treated as pixels), or CSS strings.

```ts
slashCommandSettings: {
    enable: true,
    items: ['Paragraph', 'Heading 1', 'Heading 2', 'Heading 3'],
    popupWidth: 250,
    popupHeight: 300
}
```

Items are filtered as the user types after `/`. The popup narrows to items whose `text` or `description` matches the typed query. Backspace restores the full list.

## Add custom slash command items

Custom items extend the popup with commands the built-in set does not cover. Each custom item is described by an `ISlashCommandItem`:

| Property | Type | Description |
| --- | --- | --- |
| `text` | `string` | Label shown in the popup. |
| `command` | `string` | Logical name of the command. Used for grouping, identification in the `itemSelect` event, and routing. |
| `iconCss` | `string` | CSS class for the leading icon (for example, `e-icons e-link`). |
| `description` | `string` | Secondary text shown beneath the label. |
| `type` | `string` | Group used to classify the item in the popup. Built-in values are `'Inline'`, `'Basic Block'`, and `'Media'`. Custom strings are allowed. |

A custom item is any element of `items` that is not one of the built-in names listed above. Mixing built-ins and customs in the same array is supported.

```ts
slashCommandSettings: {
    enable: true,
    items: [
        'Paragraph',
        'Heading 1',
        {
            text: 'Insert Date',
            command: 'insertDate',
            iconCss: 'e-icons e-date',
            description: 'Insert today\u2019s date',
            type: 'Inline'
        },
        {
            text: 'Insert Horizontal Rule',
            command: 'horizontalLine',
            iconCss: 'e-icons e-horizontal-rule',
            description: 'Insert a separator line',
            type: 'Basic Block'
        }
    ]
}
```

When a custom item is selected, the editor does not dispatch any command on its own. Your `itemSelect` handler is responsible for the action.

## Use the itemSelect event

The `itemSelect` event fires when the user picks an item from the popup. The handler receives `SlashCommandItemSelectArgs` with the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `isInteracted` | `boolean` | `true` when the selection was triggered by user interaction (mouse, keyboard, or touch); `false` for programmatic selection. |
| `item` | `HTMLLIElement` | The selected DOM list item. |
| `itemData` | `ISlashCommandItem` | The data of the selected item, matching the entry declared in `slashCommandSettings.items`. |
| `originalEvent` | `MouseEvent \| KeyboardEvent \| TouchEvent` | The original browser event that triggered the selection. |
| `cancel` | `boolean` | Set to `true` inside the handler to suppress the editor's default command execution. |

The event fires for every selection, including built-in items. For built-in items, the default dispatch happens after the handler returns; setting `cancel` suppresses it. For custom items there is no default dispatch, so the handler is the only place where the action runs.

```ts
const editor: RichTextEditorUI = new RichTextEditorUI({
    slashCommandSettings: {
        enable: true,
        items: [
            'Paragraph',
            'Heading 1',
            {
                text: 'Inline Code',
                command: 'applyInlineCode',
                iconCss: 'e-icons e-code',
                description: 'Wrap selection in inline code',
                type: 'Inline'
            }
        ],
        itemSelect: (args) => {
            if (args.itemData.command === 'applyInlineCode') {
                // Take over the action — cancel the default execution.
                args.cancel = true;

                // Run the action through the editor's command pipeline
                // by chaining methods on the `commands()` builder.
                editor.commands().inlineCode().apply();
            }
        }
    }
});
editor.appendTo('#editor');
```

Branching on `args.itemData.command` lets one handler serve many custom items. The `originalEvent` is the underlying `MouseEvent` / `KeyboardEvent` / `TouchEvent` and can be inspected when the action needs to react to the trigger source.

## Selection and lifecycle behavior

- **Caret restoration** — the popup saves the editor's selection when filtering and restores it before the item is selected, so the chosen command always applies to the position where `/` was typed.
- **Filtering** — items are filtered as the user types after `/`. The match is against the item's `text` and `description` fields.
- **Read-only and disabled editors** — when the editor's `readonly` property is `true` or `enable` is `false`, the Slash command popup does not appear.
- **Destroy** — when the editor instance is destroyed, the Slash command module removes its listeners and tears down the popup. No manual cleanup is required.
- **Default labels** — the popup's text and descriptions are taken from the editor's locale. The default English strings are listed in the *Available items* table above.

## API references

API types that back the slash-command popup, sourced from the Syncfusion EJ2 TypeScript API reference for `@syncfusion/ej2-richtexteditor-ui`.

### `ISlashCommandItem`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/islashcommanditem>

Specifies the custom slash command item configuration.

#### Properties

- `command` — `string` — Specifies the command to execute when the slash command item is clicked.
- `description` — `string` — Specifies the description to be displayed for the slash command item.
- `iconCss` — `string` — Specifies the icon class for the slash command item.
- `text` — `string` — Specifies the text to be displayed in the slash command item.
- `type` — `string` — Specifies the type of the slash command item. Grouping is done based on this value.

### `SlashCommandItemSelectArgs`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/slashcommanditemselectargs>

Provides detailed information about a `SlashCommandItemSelect` event.

#### Properties

- `cancel` — `boolean` — Specifies whether to cancel the default action.
- `isInteracted` — `boolean` — Returns `true` if the event is triggered by user interaction; otherwise `false`.
- `item` — `HTMLLIElement` — Returns the selected list item element of the slash command list.
- `itemData` — `ISlashCommandItem` — Returns the selected slash command item data.
- `originalEvent` — `MouseEvent | KeyboardEvent | TouchEvent` — Specifies the original event arguments (MouseEvent, KeyboardEvent, or TouchEvent).

### `SlashCommandItems`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/slashcommanditems>

Lists the items available in the slash command popup.

- `Heading 1`
- `Heading 2`
- `Heading 3`
- `Heading 4`
- `Collapsible Paragraph`
- `Collapsible Heading 1`
- `Collapsible Heading 2`
- `Collapsible Heading 3`
- `Collapsible Heading 4`
- `Paragraph`
- `Blockquote`
- `Info`
- `Warning`
- `Error`
- `Success`
- `Note`
- `NumberedList`
- `BulletList`
- `Checklist`
- `Table`
- `Image`
- `Link`


### `SlashCommandSettings`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/slashcommandsettings>

Configures the slash command settings of the RichTextEditor.

#### Properties

- `enable` — `boolean` — Specifies whether to enable or disable the slash command in the editor.
  - **Defaults to `false`.**
- `items` — `[]` — Defines the items to be displayed in the slash command popup.
  - **Defaults to `['Paragraph', 'Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'NumberedList', 'BulletList', 'Checklist', 'Blockquote', 'Table', 'Link', 'Image', 'Collapsible Paragraph', 'Collapsible Heading 1', 'Collapsible Heading 2', 'Collapsible Heading 3', 'Collapsible Heading 4', 'Info', 'Warning', 'Error', 'Success', 'Note']`.**
- `popupHeight` — `string | number` — Specifies the height of the slash command popup. Can be defined in pixels, numbers, or percentages. A numeric value is treated as pixels.
  - **Defaults to `'320px'`.**
- `popupWidth` — `string | number` — Specifies the width of the slash command popup. Can be defined in pixels, numbers, or percentages. A numeric value is treated as pixels.
  - **Defaults to `'300px'`.**

#### Events

- `itemSelect` — `EmitType<SlashCommandItemSelectArgs>` — Raised when a slash command item is selected from the slash command popup. Set `args.cancel` to `true` inside the handler to prevent the default command execution. The event args are of type `SlashCommandItemSelectArgs`.

### `SlashCommandType`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/slashcommandtype>

Defines the type of the slash command item.

- `Inline`
- `Basic Block`
- `Media`

### `SlashCommandSettingsModel`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/slashcommandsettingsmodel>

Interface for the class `SlashCommandSettings`.

#### Properties

- `enable` — `boolean` — Specifies whether to enable or disable the slash command in the editor.
- `items` — `[]` — Defines the items to be displayed in the slash command popup.
- `popupHeight` — `string | number` — Specifies the height of the slash command popup. Can be defined in pixels, numbers, or percentages. A numeric value is treated as pixels.
- `popupWidth` — `string | number` — Specifies the width of the slash command popup. Can be defined in pixels, numbers, or percentages. A numeric value is treated as pixels.

#### Events

- `itemSelect` — `EmitType<SlashCommandItemSelectArgs>` — Raised when a slash command item is selected from the slash command popup. Set `args.cancel` to `true` inside the handler to prevent the default command execution. The event args are of type `SlashCommandItemSelectArgs`.
