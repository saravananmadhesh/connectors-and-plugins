# Extensions & Plugin System

## Table of Contents

- [basicExtensions Preset](#basicextensions-preset)
  - [Register the Preset](#register-the-preset)
  - [Extensions Included in the Preset](#extensions-included-in-the-preset)
- [Adding Extensions Alongside the Preset](#adding-extensions-alongside-the-preset)
- [Registering Extensions Individually](#registering-extensions-individually)
- [How Extensions Compose](#how-extensions-compose)
- [Defining a Custom Extension](#defining-a-custom-extension)
  - [Import](#import)
  - [Signature](#signature)
  - [Minimum Config](#minimum-config)
- [The Extension Definition](#the-extension-definition)
- [Extension Config Fields (Summary)](#extension-config-fields-summary)
  - [Priority Field](#priority-field)
- [Reusing Extensions](#reusing-extensions)
  - [Configure Method](#configure-method)
  - [Extend Method](#extend-method)
- [Extension Lifecycle](#extension-lifecycle)
- [Registering Custom Extensions](#registering-custom-extensions)
  - [Pass to HeadlessEditor.create](#pass-to-headlesseditorcreate)
  - [Combine with Built-In Extensions](#combine-with-built-in-extensions)
- [End-to-End Example: Document Variable](#end-to-end-example-document-variable)
  - [`index.ts`](#indexts)
  - [`index.html`](#indexhtml)

## basicExtensions Preset

`basicExtensions` is a preset that includes commonly used built-in extensions for general-purpose document editing. Use it as a drop-in preset instead of registering each extension individually.

### Register the Preset

```ts
import { HeadlessEditor, basicExtensions } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [basicExtensions]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

All commands, keyboard shortcuts, and input rules contributed by the composed extensions become available immediately:

```ts
editor.commands.toggleBold();
editor.commands.setHeading({ level: 2 });
editor.commands.undo();
```

### Extensions Included in the Preset

| Category | Extensions |
|----------|------------|
| Document structure | `document`, `paragraph`, `heading`, `blockquote`, `text` |
| Code support | `codeBlock`, `inlineCode` |
| Visual separators | `horizontalRule`, `hardBreak` |
| Lists | `list`, `listKeymap`, `taskList` |
| Text formatting | `bold`, `italic`, `underline`, `strikethrough` |
| History management | `undoRedo` |

> `basicExtensions` does not include every available node extension, such as `table`, `image`, or `collapsible`. Register those extensions individually alongside `basicExtensions` if your application needs them.

The preset honors the `enableInputRules` option on `EditorConfig` (default `true`). When set to `false`, all markdown-style input rules — `**bold**`, `# heading`, `- list`, `> quote`, `` ``` `` code fences, and similar patterns — are skipped. See `EditorConfig` under [editor-api.md](../editor-api.md#editor-config) for the full option reference.

---

## Adding Extensions Alongside the Preset

You can combine `basicExtensions` with additional individual extensions:

```ts
import { HeadlessEditor, basicExtensions, tableExtension, imageExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [basicExtensions, tableExtension, imageExtension]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

---

## Registering Extensions Individually

If you need full control over which node types and behavior are available, register the required extensions individually instead of using the preset:

```ts
import { HeadlessEditor, documentExtension, paragraphExtension, textExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [documentExtension, paragraphExtension, textExtension]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

> Note that `document` and `text` are mandatory for a valid schema. The Headless Editor automatically adds the required `document` and `text` extensions if they are not registered.

---

## How Extensions Compose

Extensions are modular packages that contribute features to the editor. They are built from `defineExtension` and registered through `HeadlessEditor.create({ extensions: [...] })`. Each extension can add node types, marks, commands, keyboard shortcuts, input rules, plugins, DOM rendering, and lifecycle hooks.

A few extensions are **always registered automatically** in addition to whatever you pass in:

- `documentExtension` and `textExtension` are required by every editor instance.
- `listKeymapExtension` is auto-registered when `listExtension` is present.
- `collapsibleKeymapExtension` is auto-registered when the `collapsibleExtension` is present.
- `indentOutdentExtension` is auto-registered when `enableTabKey` is `true` and the user has not already registered one.

---

## Defining a Custom Extension

When the built-in extensions don't cover your scenario, you can build your own. A custom extension adds a new node type, a new mark, a custom command, a keyboard shortcut, an input rule, a plugin, a DOM spec, or a node view — and you can mix any of them together.

Start from the `defineExtension` factory and an `ExtensionConfig` object that describes what you want the extension to contribute.

### Import

```ts
import { defineExtension } from '@syncfusion/ej2-headless-editor';
```

### Signature

```ts
function defineExtension<TOptions extends object = object>(
    config: ExtensionConfig<TOptions>
): ExtensionDefinition<TOptions>
```

`TOptions` is the extension's option shape. It defaults to `object`. Pass a stronger shape for typed `defineOptions`, `configure`, and `extend`.

### Minimum Config

The only required field is `name`. Every other field is optional.

```ts
import { defineExtension } from '@syncfusion/ej2-headless-editor';

const greetingExtension = defineExtension({
    name: 'greeting'
});
```

The factory requires a non-empty `name`. Passing an empty or whitespace-only string throws an error.

```ts
defineExtension({ name: '   ' });
// throws: Error: Extension name cannot be empty.
```

Other contributors are not validated here; pass valid shapes to avoid editor startup errors.

---

## The Extension Definition

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | The unique extension identifier. |
| `configure(options)` | method | Returns a new `ExtensionDefinition` with merged option defaults. |
| `extend(overrides)` | method | Returns a new `ExtensionDefinition` with overridden configuration. |

A defined extension can be registered with multiple editors. `configure` and `extend` return a new definition each time. The original is not modified, so the same base extension can be customized differently for different editors.

```ts
const base = defineExtension({ name: 'demo' });
const themed = base.configure({ htmlAttributes: { class: 'dark' } });
```

---

## Extension Config Fields (Summary)

For deep-dive documentation on each contributor (shape, fields, examples), see [Customization](./customization.md).

| Field | Purpose |
|-------|---------|
| `name` | Unique identifier for the extension within an editor instance. |
| `priority` | Controls the order in which the extension's nodes are added to the schema. Defaults to `50`. |
| `defineOptions` | Factory that returns the extension's default option values. |
| `addExtensions` | Contribute additional extensions (composition). |
| `nodes` | Contribute node type definitions. |
| `marks` | Contribute mark type definitions. |
| `commands` | Contribute command definitions. |
| `keyboardShortcuts` | Contribute keyboard shortcut handlers. |
| `inputRules` | Contribute input rule definitions. |
| `plugins` | Contribute editor plugins. |
| `domSpecs` | Contribute DOM rendering specs for nodes and marks. |
| `nodeViews` | Contribute NodeView factories for nodes. |
| `onRegister` | Lifecycle hook called after successful registration. |
| `onReady` | Lifecycle hook called after editor startup completion. |
| `onDestroy` | Lifecycle hook called during editor destruction. |

### Priority Field

`priority` is an optional numeric field that controls the order in which the extension is wired up. Higher numbers are processed first; lower numbers are processed last. When `priority` is omitted, the editor uses `50`.

| Priority | Use for | Built-in examples |
|----------|---------|-------------------|
| `100` | Standalone blocks (fillers) that should be available before the blocks that hold them. | Paragraph, heading, image, horizontal rule. |
| `50` | The default. Most extensions do not need to set this. | Bold, italic, link. |
| `10` | Recursive containers that hold other blocks. | Table, blockquote, list, callout, collapsible. |

```ts
import { defineExtension, NodeContent } from '@syncfusion/ej2-headless-editor';

const calloutExtension = defineExtension({
    name: 'callout',
    priority: 10,
    nodes() {
        return [
            {
                name: 'callout',
                group: 'block',
                content: NodeContent.block().oneOrMore()
            }
        ];
    }
});
```

---

## Reusing Extensions

### Configure Method

Use `ExtensionDefinition.configure(options)` to change an extension's option values without rebuilding the extension from scratch. The call returns a new extension with the supplied options layered on top of the defaults.

```ts
configure(options: Partial<TOptions>): ExtensionDefinition<TOptions>
```

`configure` merges the supplied options over the defaults returned by `defineOptions`. The merge is shallow; nested objects are not deep-merged.

```ts
const baseExtension = defineExtension({
    name: 'counter',
    defineOptions: () => ({ start: 0, step: 1, max: 10 })
});

const zeroStepExtension = baseExtension.configure({ step: 0 });
// zeroStepExtension has: { start: 0, step: 0, max: 10 }
```

Most built-in extensions expose an `htmlAttributes` option through the shared `ExtensionOptions` interface:

```ts
import { paragraphExtension } from '@syncfusion/ej2-headless-editor';

const themedBasicExtensions = paragraphExtension.configure({
    htmlAttributes: { class: 'dark-theme' }
});

const editor = HeadlessEditor.create({
    extensions: [themedBasicExtensions]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

### Extend Method

Use `ExtensionDefinition.extend(overrides)` to add, replace, or remove a contributor without rebuilding the extension from scratch. The call returns a new extension with the overrides applied.

```ts
extend(overrides: Partial<ExtensionConfig<TOptions>>): ExtensionDefinition<TOptions>
```

Unlike `configure`, which only replaces option values, `extend` can override any field in `ExtensionConfig` — including the contributor functions and lifecycle hooks.

```ts
import { defineExtension } from '@syncfusion/ej2-headless-editor';

const baseExtension = defineExtension({
    name: 'counter',
    commands: () => [
        { name: 'increment', execute() { /* ... */ } }
    ]
});

const loggedExtension = baseExtension.extend({
    onRegister() {
        console.log('counter registered');
    }
});
```

`loggedExtension` inherits `name`, the `commands` contributor, and any other fields, but adds an `onRegister` hook.

| Use `configure` when | Use `extend` when |
|----------------------|---------------------|
| You only want to change option values. | You want to add, replace, or remove a contributor. |
| You want defaults to be inherited. | You want a new `nodes`, `marks`, `commands`, etc. |

`keyboardShortcuts` is merged rather than replaced when both the base and the override define it. The override is applied on top of the base, so the override can add or replace individual bindings without losing the base's bindings.

---

## Extension Lifecycle

Every custom extension moves through three lifecycle phases during the editor's life: registration, ready, and destruction. Hooks let you run code at the boundary of each phase.

| Hook | When it fires | Typical use |
|------|---------------|-------------|
| `onRegister` | After the extension has been registered with the editor. | Validate config, prepare internal state. |
| `onReady` | After the editor is fully started. | Start background tasks, register listeners. |
| `onDestroy` | During editor destruction, in reverse registration order. | Release listeners, flush pending state. |

All three hooks are optional. If a hook is not implemented, the extension simply moves to the next phase.

When an editor starts up:

1. Each extension is registered. `onRegister` fires in registration order.
2. The editor finishes starting up. `onReady` fires in registration order.

When the editor is destroyed:

1. `onDestroy` fires in reverse registration order, so the most recently registered extension cleans up first.

```ts
import { defineExtension } from '@syncfusion/ej2-headless-editor';

const analyticsExtension = defineExtension({
    name: 'analytics',
    onRegister() {
        console.log('analytics registered');
    },
    onReady() {
        // Start a heartbeat or register a contentChanged listener
    },
    onDestroy() {
        // Flush pending analytics, remove listeners
    }
});
```

If an extension fails to start up because of an invalid configuration, the editor surfaces the error. Other extensions are not affected. Use `onRegister` to surface configuration errors early so they are caught before the editor finishes starting up.

---

## Registering Custom Extensions

### Pass to HeadlessEditor.create

```ts
import { HeadlessEditor, defineExtension } from '@syncfusion/ej2-headless-editor';

const counterExtension = defineExtension({
    name: 'counter',
    commands: () => [
        {
            name: 'incrementCounter',
            execute() { /* ... */ }
        }
    ]
});

const editor = HeadlessEditor.create({
    extensions: [counterExtension]
});
```

### Combine with Built-In Extensions

```ts
import {
    HeadlessEditor,
    basicExtensions,
    defineExtension
} from '@syncfusion/ej2-headless-editor';

const customExtension = defineExtension({
    name: 'my-feature'
});

const editor = HeadlessEditor.create({
    extensions: [basicExtensions, customExtension]
});
```

---

## End-to-End Example: Document Variable

The Document Variable example ties the contributors together: a `variable` mark with `name` and `value` attributes, a registered `insertVariable` command with payload validation, a `{{name}}` input rule, a `domSpecs` block that renders the mark as a chip, and a <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>V</kbd> shortcut that cycles through the configured variables.

### `index.ts`

```ts
import {
    HeadlessEditor,
    basicExtensions,
    defineExtension
} from '@syncfusion/ej2-headless-editor';

interface VariableDef {
    name: string;
    label: string;
    value: string;
}

const VARIABLES: VariableDef[] = [
    { name: 'customerName', label: 'Customer Name', value: 'John Smith' },
    { name: 'invoiceNumber', label: 'Invoice Number', value: 'INV-2026-0042' },
    { name: 'dueDate', label: 'Due Date', value: '2026-10-15' }
];

interface InsertVariablePayload {
    name: string;
}

function resolveVariable(
    variables: readonly VariableDef[],
    name: string
): VariableDef | undefined {
    return variables.find((v) => v.name === name);
}

let editorRef: HeadlessEditor | null = null;

interface InsertVariableArgs {
    name: string;
    from: number;
    to: number;
}

const variableExtension = defineExtension({
    name: 'variable',

    defineOptions: () => ({
        variables: VARIABLES
    }),

    marks() {
        return [
            {
                name: 'variable',
                attrs: [
                    { name: 'name', type: 'string', default: '' },
                    { name: 'value', type: 'string', default: '' }
                ]
            }
        ];
    },

    commands() {
        return [
            {
                name: 'insertVariable',
                canExecute(_ctx: any, payload: InsertVariablePayload) {
                    return (
                        payload !== undefined &&
                        typeof payload.name === 'string' &&
                        payload.name.length > 0
                    );
                },
                execute(_ctx: any, payload: InsertVariableArgs) {
                    const def = resolveVariable(VARIABLES, payload.name);
                    if (!def) {
                        return;
                    }
                    editorRef?.execute('inputRuleMark', {
                        markType: 'variable',
                        text: def.value,
                        matchStart: payload.from,
                        matchEnd: payload.to,
                        attrs: { name: def.name, value: def.value }
                    });
                }
            }
        ];
    },

    keyboardShortcuts() {
        const variables = this.options.variables;
        let cycleIndex = 0;
        return {
            'Mod-Alt-v': () => {
                const editor = this.editor;
                if (!editor) {
                    return false;
                }
                const def = variables[cycleIndex % variables.length];
                cycleIndex += 1;
                const selection = editor.getSelection();
                return editor.execute('insertVariable', {
                    name: def.name,
                    from: selection.from,
                    to: selection.to
                });
            }
        };
    },

    inputRules(this) {
        const _this = this;
        return [
            {
                id: 'variable:double-braces',
                pattern: /\{\{(\w+)\}\}$/,
                handler(ctx: any) {
                    const name = ctx.match[1];
                    const def = resolveVariable(_this.options.variables, name);
                    if (!def) {
                        return;
                    }
                    ctx.dispatchCommand('inputRuleMark', {
                        markType: 'variable',
                        text: def.value,
                        matchStart: ctx.start,
                        matchEnd: ctx.end,
                        attrs: { name: def.name, value: def.value }
                    });
                }
            }
        ];
    },

    domSpecs() {
        return {
            marks: {
                variable: {
                    toDOM(attrs) {
                        return [
                            'span',
                            { 'data-type': 'variable', 'data-name': attrs['name'], 'class': 'variable-chip' },
                            0
                        ];
                    },
                    parseDOM: [
                        {
                            tag: 'span[data-type="variable"]',
                            getAttrs(node) {
                                const element = node as HTMLElement;
                                return {
                                    name: element.getAttribute('data-name') ?? '',
                                    value: ''
                                };
                            }
                        }
                    ]
                }
            }
        };
    }
});

const headlessEditor: HeadlessEditor = HeadlessEditor.create({
    enableTabKey: true,
    extensions: [basicExtensions, variableExtension]
});

editorRef = headlessEditor;

const container: HTMLElement | null = document.getElementById('headless-editor');
if (container) {
    headlessEditor.mount(container);
}
```

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Syncfusion TypeScript Headless Editor - Document Variable</title>
    <link href="https://unpkg.com/@syncfusion/ej2-tailwind3-theme@35.1.37/styles/headless-editor/index.css" rel="stylesheet">
</head>
<body>
    <div id="headless-editor"></div>
    <script type="module" src="index.ts"></script>
</body>
</html>
```
