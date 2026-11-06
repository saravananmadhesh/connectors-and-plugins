# Collapsible

The `collapsibleExtension` registers the `collapsible` block node for expandable sections.

## Table of Contents

- [Register the extension](#register-the-extension)
- [Node attributes](#node-attributes)
  - [collapsible](#collapsible)
- [Configure collapsible options](#configure-collapsible-options)
- [Commands](#commands)
- [Keyboard shortcuts](#keyboard-shortcuts)
- [API references](#api-references)
  - [CollapsibleExtensionOptions](#collapsibleextensionoptions)
  - [CollapsePayload](#collapsepayload)
  - [ExpandPayload](#expandpayload)

## Register the extension

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, collapsibleExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [collapsibleExtension]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

> The editor automatically registers `collapsibleKeymapExtension` when `collapsibleExtension` is registered, so <kbd>Enter</kbd>, <kbd>Backspace</kbd>, and <kbd>Delete</kbd> handling inside collapsible sections is enabled without an extra import.

## Node attributes

### collapsible

| Attribute | Description | Default |
|-----------|-------------|---------|
| `collapsed` | When `true`, the body content is collapsed and hidden. When `false`, the body is expanded and visible. | `false` |

`collapsibleHeader` and `collapsibleBody` nodes do not expose additional attributes.

## Configure collapsible options

The `collapsible` extension exposes an `htmlAttributes` option that adds custom HTML attributes to the outer collapsible `<div>` container. The `data-type` and `data-collapsed` attributes are always applied. It defaults to an empty object.

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, collapsibleExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [
        collapsibleExtension.configure({
            htmlAttributes: { class: 'custom-collapsible' }
        })
    ]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

## Commands

| Command | Description |
|---------|-------------|
| `toggleCollapsible({ triggerType, level? })` | Wraps the current block in a collapsible, or unwraps it if the selection is already inside one. `triggerType` selects the block type of the collapsible trigger child: `heading` or `paragraph`. When `triggerType` is `heading`, `level` sets the heading level (1 to 6) and defaults to `1`. |
| `collapse({ pos? })` | Sets `collapsed` to `true` on the nearest collapsible ancestor. Pass an explicit document `pos` to target a specific collapsible (used by custom NodeViews). |
| `expand({ pos? })` | Sets `collapsed` to `false` on the nearest collapsible ancestor. Pass an explicit document `pos` to target a specific collapsible (used by custom NodeViews). |

```ts
// Wrap the current block as a heading-triggered collapsible (level 1)
editor.commands.toggleCollapsible({ triggerType: 'heading', level: 2 });

// Wrap the current block as a paragraph-triggered collapsible
editor.commands.toggleCollapsible({ triggerType: 'paragraph' });

// Collapse the nearest collapsible
editor.commands.collapse();

// Expand the nearest collapsible
editor.commands.expand();
```

## Keyboard shortcuts

| Action | Windows | Mac |
|--------|---------|-----|
| Toggle Collapsible (paragraph trigger) | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>[</kbd> | <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>[</kbd> |
| Collapse nearest collapsible | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>,</kbd> | <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>,</kbd> |
| Expand nearest collapsible | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>.</kbd> | <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>.</kbd> |

> To create a heading-triggered collapsible via keyboard, call `toggleCollapsible({ triggerType: 'heading', level: N })` programmatically. The `Mod-Alt-[` shortcut always toggles a paragraph-triggered collapsible.

## API references

This section documents the collapsible-related public API surface — extension options, command payloads, and other types specific to this node.

### CollapsibleExtensionOptions

`CollapsibleExtensionOptions` — options accepted by the Collapsible extension.

| Property | Type | Description |
|----------|------|-------------|
| `htmlAttributes` | `Readonly<Record<string, string>>` | HTML attributes applied to the outer collapsible `<div>` container. Merged with the required `data-type` and `data-collapsed` attributes. |

### CollapsePayload

`CollapsePayload` — payload for `collapse` — `pos` bypasses selection-based lookup (used by NodeView).

| Property | Type | Description |
|----------|------|-------------|
| `pos` | `number` | Absolute document position of the collapsible node. When provided, selection is ignored. |

### ExpandPayload

`ExpandPayload` — payload for `expand` — `pos` bypasses selection-based lookup (used by NodeView).

| Property | Type | Description |
|----------|------|-------------|
| `pos` | `number` | Absolute document position of the collapsible node. When provided, selection is ignored. |
