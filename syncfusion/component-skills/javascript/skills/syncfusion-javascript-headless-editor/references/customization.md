# Customization

## Table of Contents

- [Overview](#overview)
- [Extension Config Fields](#extension-config-fields)
  - [API references](#api-references)
- [Custom Nodes](#custom-nodes)
  - [`NodeDefinition` shape](#nodedefinition-shape)
  - [Example: a custom `callout` block](#example-a-custom-callout-block)
  - [Priority for recursive containers](#priority-for-recursive-containers)
  - [API references](#api-references)
- [Custom Marks](#custom-marks)
  - [`MarkDefinition` shape](#markdefinition-shape)
  - [Example: a custom `highlight` mark](#example-a-custom-highlight-mark)
  - [How marks attach to text](#how-marks-attach-to-text)
  - [API references](#api-references)
- [Custom Commands](#custom-commands)
  - [`Command` shape](#command-shape)
  - [Defining a command](#defining-a-command)
  - [Command parameters](#command-parameters)
  - [Re-exporting a built-in command](#re-exporting-a-built-in-command)
  - [Reaching commands from application code](#reaching-commands-from-application-code)
- [Custom Keyboard Shortcuts](#custom-keyboard-shortcuts)
  - [Key names](#key-names)
  - [Handler signature](#handler-signature)
  - [Example: an extra `Mod-Shift-c` shortcut](#example-an-extra-mod-shift-c-shortcut)
  - [Shortcut conflicts](#shortcut-conflicts)
  - [Merging with `extend`](#merging-with-extend)
  - [How shortcuts are matched](#how-shortcuts-are-matched)
- [Custom Input Rules](#custom-input-rules)
  - [`InputRuleDefinition` shape](#inputruledefinition-shape)
  - [`InputRuleContext` shape](#inputrulecontext-shape)
  - [Mutating state](#mutating-state)
  - [Example: a `**bold**` input rule](#example-a-bold-input-rule)
  - [API references](#api-references)
- [Custom Plugins](#custom-plugins)
  - [Import plugin](#import-plugin)
  - [Example: a focus-tracker plugin](#example-a-focus-tracker-plugin)
  - [When to ship a plugin](#when-to-ship-a-plugin)
- [Custom DOM Specifications](#custom-dom-specifications)
  - [`NodeDOMDescriptor` shape](#nodedomdescriptor-shape)
  - [`MarkDOMDescriptor` shape](#markdomdescriptor-shape)
  - [`DOMOutputDescriptor` shape](#domoutputdescriptor-shape)
  - [`ParseRule` shape](#parserule-shape)
  - [Example: a callout with both render and parse](#example-a-callout-with-both-render-and-parse)
  - [API references](#api-references)
- [Custom Node Views](#custom-node-views)
  - [`NodeViewDescriptor` shape](#nodeviewdescriptor-shape)
  - [`dom` and `contentDOM`](#dom-and-contentdom)
  - [`update` lifecycle](#update-lifecycle)
  - [`ignoreMutation` lifecycle](#ignoremutation-lifecycle)
  - [Example: a badge with a click handler](#example-a-badge-with-a-click-handler)
  - [Precedence over `domSpecs`](#precedence-over-domspecs)
  - [API references](#api-references)
- [Custom Attributes](#custom-attributes)
  - [`AttributeDefinition` shape](#attributedefinition-shape)
  - [Example attribute definitions](#example-attribute-definitions)
  - [Default values](#default-values)
- [Layering a Node View on an Existing Node](#layering-a-node-view-on-an-existing-node)
  - [When to use `addNodeView` instead of `nodeViews`](#when-to-use-addnodeview-instead-of-nodeviews)
  - [Example: layering a custom UI on a built-in node](#example-layering-a-custom-ui-on-a-built-in-node)
- [Extension Constraints](#extension-constraints)
  - [What an extension can do](#what-an-extension-can-do)
  - [What an extension cannot do](#what-an-extension-cannot-do)

## Overview

When the built-in extensions don't cover your scenario, you can build your own. A custom extension adds a new node type, a new mark, a custom command, a keyboard shortcut, an input rule, a plugin, a DOM spec, or a node view — and you can mix any of them together.

Start from the `defineExtension` factory and an `ExtensionConfig` object that describes what you want the extension to contribute. The factory and signature are documented in [Extensions & Plugin System > Defining a Custom Extension](./extensions.md#defining-a-custom-extension).

Use a custom extension when the built-in extensions cannot express the behavior you need. Common cases include a new block type, a new mark, a custom shortcut, a custom input rule, or a NodeView that renders a built-in node with extra product UI.

---

## Extension Config Fields

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

The deep-dive documentation for each contributor (nodes, marks, commands, keyboardShortcuts, inputRules, plugins, domSpecs, nodeViews, attributes, addNodeView) is in the sections below. See [Extensions & Plugin System](./extensions.md) for the high-level overview, lifecycle, reuse, and the end-to-end Document Variable example.

### API references

#### ExtensionOptions

`ExtensionOptions` — common, reusable options shared by built-in extensions (bold, italic, underline, strikethrough, code, etc.). Each extension can use this interface as-is for its `TOptions` generic, or extend it with extension-specific fields. All fields are optional so an extension that only needs one or two of them can still use the shared type without forcing consumers to supply the rest.

| Property | Type | Description |
|----------|------|-------------|
| `htmlAttributes` | `Readonly<Record<string, string>>` | HTML attributes applied to the rendered DOM element (class, data-*, etc.). |

#### ExtensionConfig

`ExtensionConfig` — describes an extension's configuration and capabilities. v1 excludes `TStorage` generic, `defaultStorage` contributor, `nodeViews` contributor. All capability contributors and lifecycle hooks use `ExtensionScope` as `this`.

| Property | Type | Description |
|----------|------|-------------|
| `addExtensions` | `Object` | Contribute additional extensions (composition). |
| `commands` | `Object` | Contribute command definitions. |
| `defineOptions` | `Object` | Factory function that returns the option values for this extension. |
| `domSpecs` | `Object` | Contribute DOM rendering specs for custom nodes and marks. Called during `EditorBuilder._buildDOMSpecRegistry()` — before PM schema compilation. Implementations must not import or reference any PM types. Use `DOMOutputDescriptor` (`string \| readonly unknown[]`) as the return type for `toDOM` functions. |
| `inputRules` | `Object` | Contribute input rule definitions. |
| `keyboardShortcuts` | `Object` | Contribute keyboard shortcut definitions. |
| `marks` | `Object` | Contribute mark type definitions. |
| `name` | `string` | Unique extension identifier within an editor instance. |
| `nodeViews` | `Object` | Contribute NodeView factories for custom node rendering. Called during `bindEditorAndFinalize()` so the editor reference is available on `this`. Return a map of `node-type-name` → `NodeViewConstructor`. NodeViews take precedence over `domSpecs` for the same node type. Implementations must NOT import any PM types — use `editor.commands.*` for all state mutations. |
| `nodes` | `Object` | Contribute node type definitions. |
| `pasteRules` | `Object` | Contribute paste rule definitions. |
| `plugins` | `Object` | Contribute editor plugins. |
| `priority` | `number` | When this extension's nodes are added to the editor's schema. Higher numbers are added first. You only need to set this for extensions that contribute blocks which can hold other blocks (recursive containers — use `10`). For everything else, the default of `50` is the right choice. If you're adding a block that should always win as a filler (like a paragraph), use `100`. Quick guide: `100` — blocks that should be tried first when filling empty space (paragraph, heading, image, horizontal rule); `50` — default; safe for most custom extensions; `10` — blocks that can contain other blocks (table, blockquote, list, callout, collapsible). |
| `serializers` | `Object` | Contribute serializer definitions. |

| Method | Description | Returns |
|--------|-------------|---------|
| `onDestroy()` | Called during editor destruction. | `void` |
| `onReady()` | Called after editor startup completion. | `void` |
| `onRegister()` | Called after successful registration. | `void` |

#### ExtensionDefinition

`ExtensionDefinition` — an immutable extension definition. Created by `defineExtension()` factory function.

| Property | Type | Description |
|----------|------|-------------|
| `config` | `Readonly<...>` | Internal: full configuration (for `ExtensionCompiler` access). |
| `name` | `string` | Unique extension identifier. |

| Method | Description | Returns |
|--------|-------------|---------|
| `configure(options)` | Creates a new extension with merged options. Original is never modified. | `ExtensionDefinition` |
| `extend(overrides)` | Creates a new extension by overriding parts of the config. Original is never modified. | `ExtensionDefinition` |

#### Extension authoring static factories

`HeadlessEditor` exposes five static factories for authoring extension input rules without needing an editor instance. They live on the class because they construct immutable `ExtensionDefinition` / `InputRuleDefinition` values that exist independently of a live editor.

| Function | Description | Returns |
|----------|-------------|---------|
| `defineExtension(config)` | Creates an immutable extension definition from the given configuration. | `ExtensionDefinition` |
| `createLinkRule(options)` | Creates a link input rule definition. Generates a reusable input rule that detects URL patterns and Markdown link syntax, then converts them into link marks in the document. Supports both auto-linking (plain URLs) and explicit Markdown syntax. The handler receives the matched positions and dispatches an `'inputRuleMark'` command. | `InputRuleDefinition` |
| `createMarkRule(options)` | Creates a mark (inline format) input rule definition. Generates a reusable input rule that detects text patterns and applies inline formatting marks. The handler receives the matched positions and dispatches an `'inputRuleMark'` command. | `InputRuleDefinition` |
| `createTextBlockRule(options)` | Creates a text block transformation input rule definition. Generates a reusable input rule that detects text patterns and transforms the current text block into a different node type. The handler receives the matched positions and dispatches an `'inputRuleTransform'` command. | `InputRuleDefinition` |
| `createWrappingRule(options)` | Creates a block wrapping input rule definition. Generates a reusable input rule that detects text patterns and wraps the current block within a container node. Useful for creating lists, blockquotes, and other wrapper structures. The handler receives the matched positions and dispatches an `'inputRuleWrap'` command. | `InputRuleDefinition` |

The matching options types (`CreateNodeRuleOptions`, `CreateLinkRuleOptions`, `CreateTextBlockRuleOptions`, `CreateWrappingRuleOptions`) and the resulting `InputRuleDefinition` / `InputRuleContext` shapes are documented under `## Custom Input Rules` → `### API references` below.

---

## Custom Nodes

The `nodes` field on `ExtensionConfig` adds node types to the editor's schema. The contributor returns an array of `NodeDefinition` objects:

```ts
nodes?: (this: ExtensionScope<TOptions>) => NodeDefinition[]
```

The contributor returns the list of node definitions the extension adds to the editor. Each returned `NodeDefinition` must have a unique `name`.

### `NodeDefinition` shape

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Unique node type name. |
| `group` | `'root' \| 'block' \| 'container' \| 'inline' \| 'block list' \| 'list'` | Semantic group this node belongs to. |
| `content` | `NodeContent` | Optional. A content expression that constrains the children. |
| `attrs` | `AttributeDefinition[]` | Optional. Attribute definitions for the node. |
| `inline` | `boolean` | Optional. Marks the node as an inline (leaf) node. |
| `leaf` | `boolean` | Optional. Marks the node as a leaf with no content (for example, image or horizontal rule). |

### Example: a custom `callout` block

```ts
import { defineExtension, NodeContent } from '@syncfusion/ej2-headless-editor';

interface CalloutOptions {
    defaultVariant: 'info' | 'warning' | 'error';
    htmlAttributes?: Readonly<Record<string, string>>;
}

const calloutExtension = defineExtension<CalloutOptions>({
    name: 'callout',
    priority: 10,
    defineOptions: () => ({ defaultVariant: 'info', htmlAttributes: {} }),
    nodes() {
        return [
            {
                name: 'callout',
                group: 'block',
                content: NodeContent.block().oneOrMore(),
                attrs: [
                    { name: 'variant', type: 'enum', default: 'info',
                      values: ['info', 'warning', 'error'] }
                ]
            }
        ];
    }
});
```

This is a simplified version of the built-in Callout extension.

### Priority for recursive containers

When a block can contain other blocks (for example, a table cell or a callout body), set `priority` to `10` so the container is added to the schema after the blocks it contains. See [Extensions & Plugin System > Priority Field](./extensions.md#priority-field) for the full priority table.

### API references

#### NodeDefinition

`NodeDefinition` — describes a node type in the Syncfusion schema. Compiled to a PM `NodeSpec` by `PMSchemaAdapter`.

| Property | Type | Description |
|----------|------|-------------|
| `attrs` | `AttributeDefinition[]` | Typed attribute definitions for this node. |
| `content` | `NodeContent` | Content rule — what child nodes are allowed. |
| `group` | `NodeGroup` | Semantic group this node belongs to. |
| `inline` | `boolean` | Whether this node is an inline (leaf) node. |
| `leaf` | `boolean` | Whether this node is a leaf with no content (e.g. image, hr). |
| `name` | `string` | Unique node type name (e.g. `'paragraph'`, `'heading'`, `'table'`). |

#### AttributeDefinition

`AttributeDefinition` — describes a typed attribute on a node or mark.

| Property | Type | Description |
|----------|------|-------------|
| `default` | `unknown` | Default value — required so PM schema always has a fallback. |
| `name` | `string` | Attribute name as it appears in `EditorNode.attrs`. |
| `required` | `boolean` | If `true`, the attribute must be supplied explicitly; no default is used. |
| `values` | `string[]` | Allowed values when `type` is `'enum'`. Must be non-empty when `type` is `'enum'`. |

#### NodeGroup

`NodeGroup` — semantic grouping for a node type. Used in content expressions to refer to groups rather than specific types. Multiple groups can be combined with a space (e.g. `'block list'`) following ProseMirror's group convention, allowing generic queries across all list nodes.

Enum values: `block`, `inline`, `container`, `root`, `block list`, `list`.

#### NodeContent

`NodeContent` — fluent builder for content expressions.

Examples:

| Expression | Compiles to |
|------------|-------------|
| `NodeContent.block().oneOrMore()` | `block+` |
| `NodeContent.inline().zeroOrMore()` | `inline*` |
| `NodeContent.text().optional()` | `text?` |
| `NodeContent.node('tableRow').exactly(3)` | `tableRow{3}` |
| `NodeContent.sequence(NodeContent.node('tableRow').oneOrMore(), NodeContent.node('caption').optional())` | `tableRow+ caption?` |

Methods:

| Method | Description | Returns |
|--------|-------------|---------|
| `atLeast(n)` | At least `n` — compiles to `name{n,}`. | `NodeContent` |
| `exactly(n)` | Exactly `n` — compiles to `name{n}`. | `NodeContent` |
| `oneOrMore()` | One or more — compiles to `name+`. | `NodeContent` |
| `optional()` | Zero or one — compiles to `name?`. | `NodeContent` |
| `zeroOrMore()` | Zero or more — compiles to `name*`. | `NodeContent` |
| `block()` | Matches any node in the `'block'` group. | `NodeContent` |
| `choice(parts)` | Choice combinator — compiles child expressions separated by `\|`. When a quantifier is applied (e.g. `.oneOrMore()`), the group is automatically wrapped in parentheses: `(A \| B)+`. | `NodeContent` |
| `inline()` | Matches any node in the `'inline'` group. | `NodeContent` |
| `node(name)` | Matches a specific named node type. | `NodeContent` |
| `sequence(parts)` | Sequence combinator — compiles child expressions separated by spaces. When a quantifier is applied (e.g. `.oneOrMore()`), the group is automatically wrapped in parentheses: `(A B)+`. | `NodeContent` |
| `text()` | Matches a text leaf node. | `NodeContent` |

---

## Custom Marks

The `marks` field on `ExtensionConfig` adds mark types to the editor. The contributor returns an array of `MarkDefinition` objects:

```ts
marks?: (this: ExtensionScope<TOptions>) => MarkDefinition[]
```

The contributor returns the list of mark definitions the extension adds to the editor. Each returned `MarkDefinition` must have a unique `name`.

### `MarkDefinition` shape

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Unique mark type name. |
| `attrs` | `AttributeDefinition[]` | Optional. Attribute definitions for the mark. |
| `inclusive` | `boolean` | Optional. When `false`, the mark is exclusive (typing inside it leaves it). Defaults to `true`. |
| `spanning` | `boolean` | Optional. When `true`, the mark spans across block boundaries. |
| `excludes` | `string[]` | Optional. Names of marks that cannot coexist with this mark. |

### Example: a custom `highlight` mark

```ts
import { defineExtension } from '@syncfusion/ej2-headless-editor';

const highlightExtension = defineExtension({
    name: 'highlight',
    marks() {
        return [
            {
                name: 'highlight',
                attrs: [
                    { name: 'color', type: 'string', default: 'yellow' }
                ]
            }
        ];
    }
});
```

### How marks attach to text

Marks live on text nodes, not on blocks. When the user selects a range and applies a mark, every text node inside the range is wrapped with the mark.

### API references

#### MarkDefinition

`MarkDefinition` — describes a mark type in the Syncfusion schema. Compiled to a PM `MarkSpec` by `PMSchemaAdapter`.

| Property | Type | Description |
|----------|------|-------------|
| `attrs` | `AttributeDefinition[]` | Typed attribute definitions for this mark. |
| `excludes` | `string[]` | Marks that cannot coexist with this mark. Stored as an array here; compiled to a space-separated string by `PMSchemaAdapter` for PM's `MarkSpec.excludes`. |
| `inclusive` | `boolean` | Whether the mark extends to cover text inserted at its boundary. Defaults to `true` (inclusive) per ProseMirror convention. |
| `name` | `string` | Unique mark type name (e.g. `'bold'`, `'italic'`, `'link'`). |
| `spanning` | `boolean` | Whether the mark spans across block boundaries. |

`AttributeDefinition` is documented under `## Custom Nodes` above.

---

## Custom Commands

The `commands` field on `ExtensionConfig` adds new commands or re-exports built-in commands. Each command has a unique `name`, an optional `payload`, and an `execute` function:

```ts
commands?: () => Command[]
```

The option returns the list of commands the extension adds. You can return commands you define inline, or import and re-export a built-in command. The same name can only be registered once; conflicts are surfaced by the editor.

### `Command` shape

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Unique command name within the editor instance. |
| `meta` | object | Optional. Metadata (label, category, icon) for tooling and UI. |
| `canExecute(ctx, payload)` | function | Optional. Returns `true` when the command can run on the current selection. |
| `execute(ctx, payload)` | function | Runs the command, mutating state through the supplied context. |

`ctx` is a `CommandContext`. It carries the editor state, the current selection, the document, a back-reference to the editor, and a `dispatch` helper for writing back changes.

| Field | Description |
|-------|-------------|
| `editorState` | The current editor state. |
| `selection` | The current selection. |
| `document` | The current document. |
| `editor` | A back-reference to the editor. |
| `dispatch(transaction)` | Apply a transaction to mutate the state. |

### Defining a command

```ts
import { defineExtension } from '@syncfusion/ej2-headless-editor';

const counterExtension = defineExtension({
    name: 'counter',
    commands() {
        return [
            {
                name: 'incrementCounter',
                meta: { label: 'Increment', category: 'counter' },
                canExecute() { return true; },
                execute(ctx) {
                    // ctx.editorState, ctx.selection, ctx.dispatch are available
                }
            }
        ];
    }
});
```

### Command parameters

Commands accept an optional payload. The payload is opaque to the editor; you define its shape inside the command:

```ts
interface SetVariantPayload {
    variant: 'info' | 'warning' | 'error';
}

const calloutExtension = defineExtension({
    name: 'callout',
    commands() {
        return [
            {
                name: 'setCalloutVariant',
                canExecute(ctx, payload: SetVariantPayload) {
                    return payload?.variant !== undefined;
                },
                execute(ctx, payload: SetVariantPayload) {
                    // Apply payload.variant to the current callout
                }
            }
        ];
    }
});
```

The command facade at `editor.execute('setCalloutVariant', { variant: 'warning' })` enforces the payload shape at the call site.

### Re-exporting a built-in command

You can also import a built-in `Command` and re-export it from your own extension. The commands option accepts both new commands and command instances you have on hand:

```ts
import { defineExtension, insertNodeCommand } from '@syncfusion/ej2-headless-editor';

const mentionExtension = defineExtension({
    name: 'mention',
    commands() {
        return [
            insertNodeCommand
        ];
    }
});
```

Use this when you want a command to live alongside your extension's other code so consumers have a single import surface.

### Reaching commands from application code

Once the editor is created, custom commands are reachable through the same `execute` API as built-in commands:

```ts
const editor = HeadlessEditor.create({
    extensions: [counterExtension]
});

editor.execute('incrementCounter');
```

---

## Custom Keyboard Shortcuts

The `keyboardShortcuts` field on `ExtensionConfig` binds a key combination to a command:

```ts
keyboardShortcuts?: (this: ExtensionScope<TOptions>) => Record<string, () => boolean>
```

The option returns a map from key name to handler. Each handler runs a command and returns `true` when it handled the key, or `false` to let the next handler try.

### Key names

| Pattern | Meaning |
|---------|---------|
| `Mod-z` | <kbd>Ctrl</kbd>+<kbd>Z</kbd> on Windows / Linux, <kbd>⌘</kbd>+<kbd>Z</kbd> on macOS. |
| `Mod-Shift-z` | Adds <kbd>Shift</kbd>. |
| `Mod-Alt-Enter` | Adds <kbd>Alt</kbd> / <kbd>Option</kbd>. |
| `Enter`, `Tab`, `Backspace`, `Delete`, `Escape` | Named keys. |
| `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight` | Arrow keys. |

The `Mod-` prefix lets the same binding work cross-platform without writing two entries.

### Handler signature

A handler is a zero-arg function that returns `true` when it handled the key, or `false` to let the next handler run:

```ts
() => boolean
```

Return `true` after a successful command so the editor knows the key was used. Return `false` if you want the key event to keep flowing to other handlers.

### Example: an extra `Mod-Shift-c` shortcut

The editor already ships with a `toggleBold` command. Bind a custom shortcut to it without touching the built-in `Mod-b` binding:

```ts
import { defineExtension } from '@syncfusion/ej2-headless-editor';

const extraShortcutsExtension = defineExtension({
    name: 'extra-shortcuts',
    keyboardShortcuts() {
        return {
            'Mod-Shift-c': () => this.editor.commands.toggleBold()
        };
    }
});
```

Both `Mod-b` (built-in) and `Mod-Shift-c` (this extension) toggle bold.

### Shortcut conflicts

When two extensions register the same key, the editor dispatches them in registration order. The first handler that returns `true` consumes the key. To opt out, return `false` from your handler and let the next extension handle the key.

### Merging with `extend`

When you call `extend` on an extension that already defines shortcuts, the editor merges the two maps. Override keys win; the base extension's keys are preserved. See [Extensions & Plugin System > Extend Method](./extensions.md#extend-method) for the full merge semantics.

### How shortcuts are matched

The editor assembles a single keymap from two sources:

1. A **base keymap** of selection, navigation, and editing shortcuts that are always available.
2. **Extension-contributed shortcuts** that extensions register through their `keyboardShortcuts()` method.

When both sources define the same key, the editor runs the extension handlers first, in priority order, and the base handler is the **fallback**. If every extension handler returns `false`, the base handler runs. This guarantees that extensions cannot silently break `Enter`, `Backspace`, `Delete`, or any other base key.

Disabling a base keymap shortcut is not supported. If you need to override a base key for a single editor instance, write a custom extension that contributes a higher-priority handler for that key and let the framework's fallback chain decide what runs.

---

## Custom Input Rules

The `inputRules` field on `ExtensionConfig` turns a short typing pattern into a richer editor action. For example, typing `**word**` in plain text and watching it become bold.

```ts
inputRules?: (this: ExtensionScope<TOptions>) => readonly InputRuleDefinition[]
```

The contributor returns the list of input rule definitions the extension registers. Each rule matches a pattern against the text immediately before the cursor; when the pattern matches, the rule's handler runs and mutates state through `dispatchCommand`.

### `InputRuleDefinition` shape

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique rule identifier. Useful for debugging and analytics. |
| `pattern` | `RegExp` | Pattern tested against the text before the cursor. Must end with `$`. |
| `handler` | `(ctx: InputRuleContext) => void` | Invoked when the pattern matches. |
| `priority` | `number` | Optional. Higher rules run earlier. |
| `label` | `string` | Optional. Human-readable label for tooling. |
| `allowUndo` | `boolean` | Optional. Whether the resulting change participates in undo/redo. |

### `InputRuleContext` shape

| Field | Description |
|-------|-------------|
| `match` | The `RegExpExecArray` produced by `pattern.exec`. |
| `start` | Start position of the match in the document. |
| `end` | End position of the match in the document. |
| `nodeAt` | The `EditorNode` at the cursor, or `null` if unavailable. |
| `selection` | The current editor selection. |
| `dispatchCommand` | Call to mutate state from inside a handler. |

### Mutating state

Inside a handler, call `dispatchCommand(commandName, payload)` to mutate the document:

```ts
dispatchCommand('wrapInHeading', { level: 1 });
```

The pattern must end with `$` so it only matches when the user has just typed the closing characters of the trigger.

### Example: a `**bold**` input rule

```ts
import { defineExtension } from '@syncfusion/ej2-headless-editor';

const boldStarsExtension = defineExtension({
    name: 'bold-stars',
    inputRules() {
        return [
            {
                id: 'mark:bold-stars',
                pattern: /\*\*([^*]+)\*\*$/,
                priority: 100,
                handler(ctx) {
                    const text = ctx.match[1];
                    ctx.dispatchCommand('applyBold', { text });
                }
            }
        ];
    }
});
```

The handler extracts the captured text and dispatches a command, which applies bold to the matched range.

### API references

#### CreateNodeRuleOptions

`CreateNodeRuleOptions` — defines configuration options for creating a node insertion input rule.

| Property | Type | Description |
|----------|------|-------------|
| `allowUndo` | `boolean` | If set to `true`, enables undo support for the rule. @default `true` |
| `attributeProvider` | `Record \| Object` | Static attributes or a function that computes attributes from the regex match. Used to populate node attributes when the rule is triggered. |
| `id` | `string` | Unique identifier for the rule. |
| `pattern` | `RegExp` | Regular expression pattern to match in the input text. |
| `target` | `string` | Target node type name to insert (e.g., `horizontalRule`, `image`). |

#### CreateLinkRuleOptions

`CreateLinkRuleOptions` — defines configuration options for creating a link input rule.

| Property | Type | Description |
|----------|------|-------------|
| `allowUndo` | `boolean` | If set to `true`, enables undo support for the rule. @default `true` |
| `id` | `string` | Unique identifier for the rule. |
| `pattern` | `RegExp` | Regular expression pattern to match URLs or Markdown link syntax in the input text. Can match auto-links (URLs) or Markdown-style links with capturing groups for text and href. |

#### CreateTextBlockRuleOptions

`CreateTextBlockRuleOptions` — defines configuration options for creating a text block transformation input rule.

| Property | Type | Description |
|----------|------|-------------|
| `allowUndo` | `boolean` | If set to `true`, enables undo support for the rule. @default `true` |
| `attributeProvider` | `Record \| Object` | Static attributes or a function that computes attributes from the regex match. Used to populate node attributes when the rule is triggered. |
| `id` | `string` | Unique identifier for the rule. |
| `pattern` | `RegExp` | Regular expression pattern to match in the input text. |
| `target` | `string` | Target block node type to transform the current block into (e.g., `heading`, `codeBlock`). |

#### CreateWrappingRuleOptions

`CreateWrappingRuleOptions` — defines configuration options for creating a block wrapping input rule.

| Property | Type | Description |
|----------|------|-------------|
| `allowUndo` | `boolean` | If set to `true`, enables undo support for the rule. @default `true` |
| `attributeProvider` | `Record \| Object` | Static attributes or a function that computes attributes from the regex match. Used to populate wrapper node attributes when the rule is triggered. |
| `id` | `string` | Unique identifier for the rule. |
| `pattern` | `RegExp` | Regular expression pattern to match in the input text. |
| `target` | `string` | Target wrapper node type (e.g., `bulletList`, `orderedList`, `blockquote`). |

#### InputRuleDefinition

`InputRuleDefinition` — definition of a single input rule contributed by an extension. All fields are read-only; the registry never mutates definitions.

| Property | Type | Description |
|----------|------|-------------|
| `handler` | `Object` | Handler invoked when the pattern matches. |
| `id` | `string` | Unique rule identifier (e.g. `'mark:bold-stars'`). |
| `label` | `string` | Human-readable label for tooling / debugging. |
| `pattern` | `RegExp` | `RegExp` that is tested against the text immediately before the cursor. Must end with `$`. |
| `priority` | `number` | Priority for ordering rules (higher = earlier). Defaults to `0`. |

#### InputRuleContext

`InputRuleContext` — PM-free context passed to every input rule handler at the point a pattern match fires. All fields are read-only — handlers must not mutate the context. Handlers must use only `dispatchCommand()` to modify editor state. Direct state access or transaction dispatch is not available — use the command framework instead.

| Property | Type | Description |
|----------|------|-------------|
| `dispatchCommand` | `Object` | Dispatches a registered command by name, returning `true` if it executed successfully. This is the ONLY way for input rule handlers to modify editor state. Thin closure over `CommandManager.execute()` — goes through the full command pipeline, ensuring undo/redo grouping, event emission, and consistent state management. |
| `end` | `number` | End position of the match in the document. |
| `match` | `RegExpMatchArray` | The match array produced by `RegExp.exec` against the text before the cursor. |
| `nodeAt` | `EditorNode \| null` | The Syncfusion `EditorNode` at the cursor position, or `null` if unavailable. |
| `selection` | `Selection` | The current editor selection, converted to the Syncfusion model. |
| `start` | `number` | Start position of the match in the document. |

---

## Custom Plugins

The `plugins` field on `ExtensionConfig` adds a long-lived observer to the editor. A plugin is the right home for behavior that has to follow the editor over time, like logging, focus tracking, or content change reactions.

```ts
plugins?: (this: ExtensionScope<TOptions>) => readonly Plugin[]
```

The option returns the list of plugins the extension adds. Each entry is a `Plugin` instance built with the `Plugin` constructor from the `prosemirror-state` package, imported directly.

### Import plugin

`Plugin` is included in the `prosemirror-state` package used by the Headless Editor, so you do not need to install it separately.

Import it directly in your extension:

```ts
import { Plugin } from 'prosemirror-state';
```

### Example: a focus-tracker plugin

The following plugin watches the editor's focus and blur events and logs them. It is mounted by the editor and lives for the life of the editor instance.

```ts
import { defineExtension } from '@syncfusion/ej2-headless-editor';
import { Plugin } from 'prosemirror-state';

const focusTrackerExtension = defineExtension({
    name: 'focus-tracker',
    plugins() {
        return [
            new Plugin({
                view(editorView) {
                    const onFocus = () => console.log('editor focused');
                    const onBlur = () => console.log('editor blurred');
                    editorView.dom.addEventListener('focus', onFocus);
                    editorView.dom.addEventListener('blur', onBlur);
                    return {
                        destroy() {
                            editorView.dom.removeEventListener('focus', onFocus);
                            editorView.dom.removeEventListener('blur', onBlur);
                        }
                    };
                }
            })
        ];
    }
});
```

### When to ship a plugin

| Use `plugins` when | Use `addExtensions` when |
|---------------------|---------------------------|
| You need to observe or react to editor activity over time. | You only need to add nodes, marks, commands, or shortcuts. |
| The lifetime of the work is tied to the editor. | The lifetime of the work is per-extension. |
| You are wrapping a third-party library that needs to be present alongside the editor. | You are building a small extension. |

> A plugin that needs to change the document must dispatch a command through `editor.execute(name, payload)` rather than mutating state on its own.

---

## Custom DOM Specifications

The `domSpecs` field on `ExtensionConfig` describes how a node or mark is rendered to HTML and how HTML is read back into the schema. The two halves of the field, `toDOM` and `parseDOM`, keep saved content and parsed content in sync.

```ts
domSpecs?: (this: ExtensionScope<TOptions>) => ExtensionDOMSpecs
```

The option returns a `ExtensionDOMSpecs` collection keyed by node name and mark name. Each entry is one descriptor.

### `NodeDOMDescriptor` shape

| Field | Type | Description |
|-------|------|-------------|
| `toDOM(attrs)` | `(attrs) => DOMOutputDescriptor` | Returns the HTML representation of the node. |
| `parseDOM` | `readonly ParseRule[]` | Optional. Rules for parsing HTML into this node. |

### `MarkDOMDescriptor` shape

| Field | Type | Description |
|-------|------|-------------|
| `toDOM(attrs, inline)` | `(attrs, inline) => DOMOutputDescriptor` | Returns the HTML representation of the mark. |
| `parseDOM` | `readonly ParseRule[]` | Optional. Rules for parsing HTML into this mark. |

### `DOMOutputDescriptor` shape

`DOMOutputDescriptor` accepts either a tag-name string or a nested array spec:

```ts
'div'

['div', { class: 'callout' }, 0]

['span', { class: 'highlight', style: 'background-color: yellow' }, 0]
```

`0` is the content slot where the children are rendered.

### `ParseRule` shape

Each entry in `parseDOM` is a rule that matches against an HTML element and reads attributes from it.

| Field | Description |
|-------|-------------|
| `tag` | The CSS selector to match. For example, `div[data-type="callout"]`. |
| `getAttrs(node)` | Function. Reads the attribute values back out of the matched element. |

### Example: a callout with both render and parse

The following extension describes a callout that renders as a `<div data-type="callout" data-variant="...">` and parses the same shape back when HTML is loaded into the editor:

```ts
import { defineExtension, NodeContent } from '@syncfusion/ej2-headless-editor';

const calloutExtension = defineExtension({
    name: 'callout',
    nodes() {
        return [
            {
                name: 'callout',
                group: 'block',
                content: NodeContent.block().oneOrMore(),
                attrs: [
                    { name: 'variant', type: 'enum', default: 'info',
                      values: ['info', 'warning', 'error'] }
                ]
            }
        ];
    },
    domSpecs() {
        return {
            nodes: {
                callout: {
                    toDOM(attrs) {
                        return [
                            'div',
                            { 'data-type': 'callout', 'data-variant': attrs['variant'] },
                            0
                        ];
                    },
                    parseDOM: [
                        {
                            tag: 'div[data-type="callout"]',
                            getAttrs(node: Node) {
                                const element = node as HTMLElement;
                                return {
                                    variant: element.getAttribute('data-variant') ?? 'info'
                                };
                            }
                        }
                    ]
                }
            }
        };
    }
});
```

### API references

#### ExtensionDOMSpecs

`ExtensionDOMSpecs` — collection of node and mark DOM descriptors contributed by an extension.

| Property | Type | Description |
|----------|------|-------------|
| `marks` | `Readonly<...>` | Keyed by `MarkDefinition.name`. |
| `nodes` | `Readonly<...>` | Keyed by `NodeDefinition.name`. |

#### NodeDOMDescriptor

`NodeDOMDescriptor` — PM-free descriptor for how a node type should render to the DOM. Used by extensions to contribute custom `toDOM` behaviour without importing any ProseMirror types.

| Property | Type | Description |
|----------|------|-------------|
| `toDOM` | `Object` | Returns a `DOMOutputDescriptor` for the node. Receives the node's attribute bag — never the PM Node object. |

#### MarkDOMDescriptor

`MarkDOMDescriptor` — PM-free descriptor for how a mark type should render to the DOM.

| Property | Type | Description |
|----------|------|-------------|
| `toDOM` | `Object` | Returns a `DOMOutputDescriptor` for the mark. Receives the mark's attribute bag and inline flag. |

#### DOMOutputDescriptor

`DOMOutputDescriptor` — PM-free representation of a single DOM output item. Mirrors ProseMirror's `DOMOutputSpec` but without PM type imports. Accepts a tag-name string or a nested array spec.

| Type | Description |
|------|-------------|
| `string` | Tag-name string. |
| nested array spec | Nested array spec. |

---

## Custom Node Views

The `nodeViews` field on `ExtensionConfig` takes over how a node is rendered. A node view is the right home when you want the editor to display a node with your own DOM and your own behavior, not just the default `domSpecs` HTML.

```ts
nodeViews?: (this: ExtensionScope<TOptions>) => Record<string, (node: EditorNode) => NodeViewDescriptor | null>
```

### `NodeViewDescriptor` shape

| Field | Description |
|-------|-------------|
| `dom` | The DOM root this view manages. Required. |
| `contentDOM` | Where child content is rendered. If `null`, the node is treated as atom-like. |
| `update(attrs)` | Called when the node's data changes; return `true` if the view is still valid. |
| `ignoreMutation(mutation)` | Return `true` to tell the editor the mutation came from the view itself. |
| `destroy()` | Cleanup on view teardown. |
| `selectNode()` | Called when the node becomes the editor selection. |
| `deselectNode()` | Called when the node loses the editor selection. |

### `dom` and `contentDOM`

`dom` is the outer wrapper the editor mounts. If your node has editable children, `contentDOM` is where the editor inserts them. If you only need a leaf widget, omit `contentDOM`.

### `update` lifecycle

`update(attrs)` runs whenever the node's data changes. Returning `true` keeps the existing view in place; returning `false` triggers a full rebuild. Use `update` to react to attribute changes (for example, refreshing a label when an attribute changes).

### `ignoreMutation` lifecycle

`ignoreMutation(mutation)` runs for every DOM mutation inside the view. Return `true` when a mutation is the node view's own product. Returning `false` lets the editor treat the mutation as an external edit and respond accordingly.

### Example: a badge with a click handler

Imagine a `badge` block that displays a label and reacts to a click. The node view builds the wrapper element, attaches the click handler, and cleans up on teardown:

```ts
import { defineExtension } from '@syncfusion/ej2-headless-editor';

const badgeExtension = defineExtension({
    name: 'badge',
    nodes() {
        return [
            {
                name: 'badge',
                group: 'inline',
                inline: true,
                attrs: [
                    { name: 'label', type: 'string', default: '' }
                ]
            }
        ];
    },
    nodeViews() {
        return {
            badge: (node) => {
                const dom = document.createElement('span');
                dom.className = 'badge';
                dom.textContent = node.attrs['label'];
                dom.title = 'Click to copy';
                dom.style.cursor = 'pointer';

                const onClick = () => {
                    navigator.clipboard.writeText(node.attrs['label']);
                };
                dom.addEventListener('click', onClick);

                return {
                    dom,
                    update(node) {
                        dom.textContent = node.attrs['label'];
                        return true;
                    },
                    destroy() {
                        dom.removeEventListener('click', onClick);
                    }
                };
            }
        };
    }
});
```

### Precedence over `domSpecs`

Node views take precedence over DOM specs for rendering. The editor uses `domSpecs` to produce HTML on save; it uses `nodeViews` to mount the running view in the editor surface. If both are defined for the same node, `nodeViews` controls the live render.

### API references

#### NodeViewDescriptor

`NodeViewDescriptor` — describes the object returned by a `NodeViewConstructor`. Mirrors ProseMirror's `NodeView` interface but uses only DOM/primitives — no PM types are referenced here.

| Property | Type | Description |
|----------|------|-------------|
| `contentDOM` | `HTMLElement \| null` | If provided, ProseMirror will render the node's children into this element (the "content hole"). If omitted the node is treated as a leaf. |
| `deselectNode` | `Object` | Called when the node is deselected. |
| `destroy` | `Object` | Called when the node view is removed from the DOM. |
| `dom` | `HTMLElement` | The outer DOM element for the node. |
| `ignoreMutation` | `Object` | Called for every DOM mutation observed inside the NodeView. Return `true` to tell ProseMirror the mutation is harmless UI noise and must NOT trigger a remount — e.g. a widget's internal DOM swap (Syncfusion's `Button.appendTo` wraps the host element). Returning `false` lets ProseMirror process the mutation normally (re-reading children, dispatching transactions). |
| `selectNode` | `Object` | Called when the node is selected. |
| `update` | `Object` | Called whenever the node is updated with new attrs/content. Return `true` to accept the update (ProseMirror re-renders children); return `false` to force a full remount. |

#### NodeViewConstructor

`NodeViewConstructor` — PM-free factory function for a custom node view. Extensions implement this to take full control of a node's DOM rendering and interactive behaviour without importing any ProseMirror types.

| Parameter | Type | Description |
|-----------|------|-------------|
| `attrs` | `Record` | Node attributes. |
| `view` | `unknown` | The editor view. |
| `getPos` | `Object` | Function that returns the current node position. |
| `hasContent` (optional) | `boolean` | Whether the node has content. |

---

## Custom Attributes

The `attrs` field on `NodeDefinition` and `MarkDefinition` declares the typed attributes a node or mark carries. Each attribute is described by an `AttributeDefinition` that says what it is called, what type of value it stores, and what default it falls back to.

### `AttributeDefinition` shape

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Unique attribute name within the node or mark. |
| `type` | `'string' \| 'number' \| 'boolean' \| 'enum'` | Storage type. |
| `default` | `unknown` | Optional. Default value when the attribute is not supplied. |
| `required` | `boolean` | Optional. When `true`, the attribute must be supplied explicitly and no default is used. |
| `values` | `readonly string[]` | Required for `type: 'enum'`. Allowed values (non-empty). |

### Example attribute definitions

```ts
import { defineExtension, AttributeDefinition, NodeContent } from '@syncfusion/ej2-headless-editor';

const customBlockExtension = defineExtension({
    name: 'customBlock',
    nodes() {
        const blockAttrs: AttributeDefinition[] = [
            { name: 'variant', type: 'enum', default: 'primary',
              values: ['primary', 'secondary'] }
        ];
        return [
            {
                name: 'customBlock',
                group: 'block',
                content: NodeContent.inline().zeroOrMore(),
                attrs: blockAttrs
            }
        ];
    }
});
```

### Default values

When a node or mark is created without an attribute, the editor substitutes the `default` value. Use `null` for attributes that have no meaningful default and treat `null` as "unset" in your NodeView or DOM spec.

---

## Layering a Node View on an Existing Node

Built-in extensions expose an `addNodeView` option so the consuming product can layer its own UI on top of the extension's underlying node structure. The extension keeps ownership of the schema and the data; the product contributes the user-facing wrapper.

```ts
addNodeView?: () => Record<string, NodeViewFactory>
```

### When to use `addNodeView` instead of `nodeViews`

| Use `addNodeView` when | Use `nodeViews` when |
|------------------------|----------------------|
| You are extending an existing built-in extension. | You are defining a new node from scratch. |
| The extension already provides a schema. | You contribute both schema and render. |
| You want the extension to keep ownership of structure. | The node is fully yours. |

### Example: layering a custom UI on a built-in node

A product can mount its own DOM around a built-in node by passing a factory through `addNodeView`. The factory receives the node and returns the DOM the editor should display.

```ts
import { HeadlessEditor } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    enableTabKey: true,
    imageExtension: {
        addNodeView: () => ({
            image: ({ node }) => ({
                dom: // Define your custom UI here
            })
        })
    }
});
```

---

## Extension Constraints

### What an extension can do

- Contribute node types, marks, commands, shortcuts, input rules
- Define custom plugins and DOM specs
- Implement NodeView for custom rendering
- Participate in the editor lifecycle
- Compose with other extensions
- Use `configure()` and `extend()` for reuse

### What an extension cannot do

- Mutate its own definition after creation; `ExtensionDefinition` is immutable.
- Mutate document state outside of a command handler or input rule handler. Use `editor.commands.*` for all state mutations.
