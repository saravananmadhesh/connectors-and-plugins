# Methods in Syncfusion JavaScript Modern Rich Text Editor

The Syncfusion Essential JS 2 Rich Text Editor exposes a set of public methods on the component instance that let you programmatically interact with the editor from your application code. Use these methods to read content, control focus, persist the editor value, and update the toolbar state.

All methods are invoked on the editor instance after the component has been initialized and rendered. The standard EJ2 instance pattern is used in the examples below:

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

let editor: RichTextEditorUI = new RichTextEditorUI({
    // editor configuration
});
editor.appendTo('#default');
```

## Table of contents

- [save](#save)
- [focusIn](#focusin)
- [focusOut](#focusout)
- [getDocument](#getdocument)
- [getHtml](#gethtml)
- [getText](#gettext)
- [updateToolbarItems](#updatetoolbaritems)

- [save](#save)
- [focusIn](#focusin)
- [focusOut](#focusout)
- [getDocument](#getdocument)
- [getHtml](#gethtml)
- [getText](#gettext)
- [updateToolbarItems](#updatetoolbaritems)

## save

| Method | Description |
| --- | --- |
| `save` | Persists the current editor content into the component's `value` property. |

```ts
editor.save();
```

## focusIn

| Method | Description |
| --- | --- |
| `focusIn` | Moves focus into the editor's editable area and triggers the editor's focus-in handling. |

```ts
editor.focusIn();
```

## focusOut

| Method | Description |
| --- | --- |
| `focusOut` | Removes focus from the editor's editable area and triggers the editor's focus-out handling. |

```ts
editor.focusOut();
```

## getDocument

| Method | Description |
| --- | --- |
| `getDocument` | Returns the current editor document. |

```ts
let document = editor.getDocument();
```

## getHtml

| Method | Description |
| --- | --- |
| `getHtml` | Returns the current editor content as an HTML string. |

```ts
let html: string = editor.getHtml();
console.log('Rich Text Editor HTML: ', html);
```

## getText

| Method | Description |
| --- | --- |
| `getText` | Returns the current editor content as plain text. |

```ts
let text: string = editor.getText();
console.log('Rich Text Editor text: ', text);
```

## updateToolbarItems

| Method | Description |
| --- | --- |
| `updateToolbarItems` | Applies a batch of toolbar item updates (add, remove) to the editor's toolbar. |

```ts
editor.updateToolbarItems([
    { action: 'add', item: 'Italic', index: 1 }
]);
```