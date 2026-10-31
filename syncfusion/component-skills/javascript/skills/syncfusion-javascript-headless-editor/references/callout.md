# Callout

The `calloutExtension` registers the `callout` block container node for rendering highlighted message boxes such as informational notes, warnings, errors, success and tips.

## Table of Contents

- [Register the extension](#register-the-extension)
- [Node attributes](#node-attributes)
- [Configure callout options](#configure-callout-options)
- [Commands](#commands)
- [Keyboard shortcut](#keyboard-shortcut)
- [Input rules](#input-rules)
- [API references](#api-references)
  - [CalloutExtensionOptions](#calloutextensionoptions)
  - [CalloutVariant](#calloutvariant)

## Register the extension

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, calloutExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [calloutExtension]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

## Node attributes

| Attribute | Description |
|-----------|-------------|
| `variant` | Visual style variant of the callout: `info`, `warning`, `note`, `success`, `error`, or `tip`. Defaults to `info`. |

## Configure callout options

The `callout` extension provides options to set the default variant and add custom HTML attributes:

| Option | Description | Default |
|--------|-------------|---------|
| `defaultVariant` | Default variant used when creating a callout without specifying one. | `'info'` |
| `htmlAttributes` | Custom HTML attributes applied to the outer callout container element. | `{}` |

Use `.configure()` to apply custom settings:

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, calloutExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [
        calloutExtension.configure({
            defaultVariant: 'note',
            htmlAttributes: { class: 'custom-callout' }
        })
    ]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

## Commands

| Command | Description |
|---------|-------------|
| `toggleCallout({ variant? })` | Toggles a callout wrapper around the current block or selection. Accepts an optional `variant` (`info`, `warning`, `note`, `success`, `error`, or `tip`). If already inside a callout, unwraps the content. |

```ts
// Toggle with default variant
editor.commands.toggleCallout();

// Toggle with a warning variant
editor.commands.toggleCallout({ variant: 'warning' });
```

## Keyboard shortcut

| Action | Windows | Mac |
|--------|---------|-----|
| Toggle Callout | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>C</kbd> | <kbd>⌘</kbd> + <kbd>⇧</kbd> + <kbd>C</kbd> |

## Input rules

Type the following triggers followed by a space at the start of a line to wrap the current block in a callout:

* `!!!` creates an `info` callout
* `:::` creates a `note` callout

## API references

This section documents the callout-related public API surface — extension options, command payloads, and other types specific to this node.

### CalloutExtensionOptions

`CalloutExtensionOptions` — options for the Callout extension.

| Property | Type | Description |
|----------|------|-------------|
| `defaultVariant` | `string` | Default variant used when no variant is specified. |
| `htmlAttributes` | `Readonly<Record<string, string>>` | HTML attributes applied to the outer callout element. |

### CalloutVariant

`CalloutVariant` — the six predefined Callout variants provided by the built-in extension. This union represents only the variants the built-in Callout knows how to render. The variant attribute on the callout node itself remains a plain string at the schema level — a customer who extends the Callout extension can store a custom variant name there and render it through their own `nodeViews()` implementation.

Enum values: `info`, `warning`, `note`, `success`, `error`, `tip`.
