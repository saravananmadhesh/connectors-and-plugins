# Mark Types in TypeScript Headless Editor

The TypeScript Headless Editor ships with built-in marks for inline text formatting, each contributed by its own extension. The preset `basicExtensions` includes the `bold`, `italic`, `underline`, and `strikethrough` marks; other marks such as link, inline code, font color, background color, font family, font size, subscript, superscript, and case transforms are registered individually as needed.

## Table of Contents

- [Bold Mark](#bold-mark)
  - [Register the extension](#register-the-extension)
  - [Configure the extension](#configure-the-extension)
  - [Commands](#commands)
  - [Keyboard shortcut](#keyboard-shortcut)
  - [Input rules](#input-rules)
- [Italic Mark](#italic-mark)
- [Underline Mark](#underline-mark)
- [Strikethrough Mark](#strikethrough-mark)
- [Link Mark](#link-mark)
  - [Markdown input rules](#markdown-input-rules)
  - [Link validation](#link-validation)
  - [API references](#api-references)
- [Inline Code Mark](#inline-code-mark)
- [Font Color Mark](#font-color-mark)
- [Background Color Mark](#background-color-mark)
- [Font Family Mark](#font-family-mark)
- [Font Size Mark](#font-size-mark)
- [Subscript Mark](#subscript-mark)
- [Superscript Mark](#superscript-mark)
- [To Lower Case](#to-lower-case)
- [To Upper Case](#to-upper-case)
- [Generic Mark Payload](#generic-mark-payload)
  - [SetMarkPayload](#setmarkpayload)

## Bold Mark

The `boldExtension` registers the `bold` mark, which applies semantic bold formatting to text and renders the content as a `<strong>` element. It contributes the `toggleBold` command, a keyboard shortcut for toggling bold, and Markdown-style input rules that convert `**text**` or `__text__` into bold as the user types.

### Register the extension

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, boldExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [boldExtension]
});

editor.mount(document.getElementById('editor') as HTMLElement);
```

### Configure the extension

The `bold` extension exposes an `htmlAttributes` option that adds custom HTML attributes to every rendered `<strong>` element. Use `.configure()` to set it:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `htmlAttributes` | `Record<string, string>` | `{}` | Custom HTML attributes applied to the rendered `<strong>` element. |

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, boldExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [
        boldExtension.configure({
            htmlAttributes: { class: 'my-custom-class' }
        })
    ]
});

editor.mount(document.getElementById('editor') as HTMLElement);
```

### Commands

| Command | Description |
|---------|-------------|
| `toggleBold()` | Toggles bold formatting on the current selection. |

```ts
editor.commands.toggleBold();
```

### Keyboard shortcut

| Action | Windows | Mac |
|--------|---------|-----|
| Toggle Bold | <kbd>Ctrl</kbd> + <kbd>B</kbd> | <kbd>⌘</kbd> + <kbd>B</kbd> |

### Input rules

The Bold mark supports Markdown-style input rules using `**text**` or `__text__` syntax.

```text
Type:    **important**
Result:  <strong>important</strong>
```

---

## Italic Mark

The `italicExtension` registers the `italic` mark, which applies semantic italic formatting to text and renders the content as an `<em>` element. It contributes the `toggleItalic` command, a keyboard shortcut for toggling italic, and Markdown-style input rules that convert `*text*` or `_text_` into italic as the user types.

### Register the extension

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, italicExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [italicExtension]
});

editor.mount(document.getElementById('editor') as HTMLElement);
```

### Configure the extension

The `italic` extension exposes an `htmlAttributes` option that adds custom HTML attributes to every rendered `<em>` element. Use `.configure()` to set it:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `htmlAttributes` | `Record<string, string>` | `{}` | Custom HTML attributes applied to the rendered `<em>` element. |

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, italicExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [
        italicExtension.configure({
            htmlAttributes: { class: 'my-custom-class' }
        })
    ]
});

editor.mount(document.getElementById('editor') as HTMLElement);
```

### Commands

| Command | Description |
|---------|-------------|
| `toggleItalic()` | Toggles italic formatting on the current selection. |

```ts
editor.commands.toggleItalic();
```

### Keyboard shortcut

| Action | Windows | Mac |
|--------|---------|-----|
| Toggle Italic | <kbd>Ctrl</kbd> + <kbd>I</kbd> | <kbd>⌘</kbd> + <kbd>I</kbd> |

### Input rules

The Italic mark supports Markdown-style input rules using `*text*` or `_text_` syntax.

```text
Type:    *emphasis*
Result:  <em>emphasis</em>
```

---

## Underline Mark

The `underlineExtension` registers the `underline` mark, which applies underline formatting to text and renders the content as a `<u>` element. It contributes the `toggleUnderline` command, a keyboard shortcut for toggling underline, and input rules that convert `++text++` into underline as the user types.

### Register the extension

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, underlineExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [underlineExtension]
});

editor.mount(document.getElementById('editor') as HTMLElement);
```

### Configure the extension

The `underline` extension exposes an `htmlAttributes` option that adds custom HTML attributes to every rendered `<u>` element. Use `.configure()` to set it:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `htmlAttributes` | `Record<string, string>` | `{}` | Custom HTML attributes applied to the rendered `<u>` element. |

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, underlineExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [
        underlineExtension.configure({
            htmlAttributes: { class: 'my-custom-class' }
        })
    ]
});

editor.mount(document.getElementById('editor') as HTMLElement);
```

### Commands

| Command | Description |
|---------|-------------|
| `toggleUnderline()` | Toggles underline formatting on the current selection. |

```ts
editor.commands.toggleUnderline();
```

### Keyboard shortcut

| Action | Windows | Mac |
|--------|---------|-----|
| Toggle Underline | <kbd>Ctrl</kbd> + <kbd>U</kbd> | <kbd>⌘</kbd> + <kbd>U</kbd> |

### Input rules

The Underline mark supports `++text++` syntax for inline conversion.

```text
Type:    ++draft++
Result:  <u>draft</u>
```

---

## Strikethrough Mark

The `strikethroughExtension` registers the `strikethrough` mark, which applies strikethrough formatting to text and renders the content as an `<s>` element. It contributes the `toggleStrikethrough` command, a keyboard shortcut for toggling strikethrough, and Markdown-style input rules that convert `~~text~~` into strikethrough as the user types.

### Register the extension

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, strikethroughExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [strikethroughExtension]
});

editor.mount(document.getElementById('editor') as HTMLElement);
```

### Configure the extension

The `strikethrough` extension exposes an `htmlAttributes` option that adds custom HTML attributes to every rendered `<s>` element. Use `.configure()` to set it:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `htmlAttributes` | `Record<string, string>` | `{}` | Custom HTML attributes applied to the rendered `<s>` element. |

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, strikethroughExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [
        strikethroughExtension.configure({
            htmlAttributes: { class: 'my-custom-class' }
        })
    ]
});

editor.mount(document.getElementById('editor') as HTMLElement);
```

### Commands

| Command | Description |
|---------|-------------|
| `toggleStrikethrough()` | Toggles strikethrough formatting on the current selection. |

```ts
editor.commands.toggleStrikethrough();
```

### Keyboard shortcut

| Action | Windows | Mac |
|--------|---------|-----|
| Toggle Strikethrough | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>X</kbd> | <kbd>⌘</kbd> + <kbd>⇧</kbd> + <kbd>X</kbd> |

### Input rules

The Strikethrough mark supports Markdown-style input rules using `~~text~~` syntax.

```text
Type:    ~~deprecated~~
Result:  <s>deprecated</s>
```

---

## Link Mark

The `linkExtension` registers the `link` mark, which applies hyperlink formatting to text and renders the content as an `<a>` element with `href`, `title`, `target`, and `rel` attributes. It contributes the `setLink` and `unsetLink` commands, a keyboard shortcut for opening the link prompt, Markdown-style input rules that convert `[label](url)` into links, and URL validation against a protocol allow list to block unsafe schemes.

### Register the extension

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, linkExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [linkExtension]
});

editor.mount(document.getElementById('editor') as HTMLElement);
```

### Configure the extension

The `link` extension exposes the following options. Use `.configure()` to set them:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `htmlAttributes` | `Record<string, string>` | `{}` | Custom HTML attributes applied to the rendered `<a>` element. |
| `openOnClick` | `boolean` | `true` | Determines whether clicking a link opens it in a new tab. When disabled, the cursor is placed inside the link for in-place editing. |

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, linkExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [
        linkExtension.configure({
            htmlAttributes: { class: 'my-custom-class' },
            openOnClick: false
        })
    ]
});

editor.mount(document.getElementById('editor') as HTMLElement);
```

### Commands

| Command | Description |
|---------|-------------|
| `setLink({ href, title?, target?, rel?, displayText? })` | Adds or updates a link on the current selection. The optional `displayText` argument replaces the selection with the provided display text. |
| `unsetLink()` | Removes the link from the current selection while preserving the text. |

#### `setLink` payload

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `href` | `string` | Yes | Destination URL. Validated against the protocol allow list. |
| `title` | `string` | No | Tooltip text shown on hover. |
| `target` | `string` | No | Where to open the link (e.g., `_blank`, `_self`). |
| `rel` | `string` | No | Link relationship metadata (e.g., `noopener noreferrer`). |
| `displayText` | `string` | No | When provided, the current selection is replaced with this text in the same transaction so the link mark wraps the new text. |

```ts
// Add a link to the current selection
editor.commands.setLink({ href: 'https://example.com' });

// Add a link with display text
editor.commands.setLink({
    href: 'https://example.com',
    displayText: 'Visit Example'
});

// Remove the link from the current selection
editor.commands.unsetLink();
```

### Markdown input rules

The Link mark supports Markdown-style input rules using `[label](url)` syntax. Bare URLs, `www.` host names, and email addresses are also recognized.

```text
Type:    [Syncfusion](https://www.syncfusion.com)
Result:  <a href="https://www.syncfusion.com" aria-label="Visit Syncfusion website">Syncfusion</a>
```

### Link validation

URLs passed to `setLink` are validated against a protocol allow list before being applied. Validation is performed by the internal `isValidUrl` helper.

The following protocols are allowed:

- `http://`
- `https://`
- `mailto:`
- `tel:`
- `ftp://`

### API references

#### SetLinkPayload

| Property | Type | Description |
|----------|------|-------------|
| `displayText` | `string` | Optional display text. When provided, the current selection is replaced with this text in the same transaction so the link mark wraps the new text. Falls back to current selection text, then `href`. If omitted, the selection is left as-is (mark-only). |
| `href` | `string` | Destination URL of the link. |
| `rel` | `string \| null` | Link relationship metadata (`noopener noreferrer`, etc.). |
| `target` | `string \| null` | Where to open the link (`_blank`, `_self`, etc.). |
| `title` | `string \| null` | Tooltip text shown on hover. |

#### LinkExtensionOptions

`LinkExtensionOptions` — options accepted by the Link extension.

| Property | Type | Description |
|----------|------|-------------|
| `htmlAttributes` | `Readonly<Record<string, string>>` | HTML attributes applied to the rendered DOM element (class, data-*, etc.). |
| `openOnClick` | `boolean` | Determines whether links open when clicked in the editor. When enabled, clicking a link navigates to its target URL in a new browser tab. When disabled, clicking places the cursor inside the link for editing. |

---

## Inline Code Mark

The `inlineCodeExtension` registers the `code` mark, which applies inline code formatting to text and renders the content as a `<code>` element. It contributes the `toggleCodeMark` command, a keyboard shortcut for toggling inline code, and Markdown-style input rules that convert `` `text` `` into inline code as the user types.

### Register the extension

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, inlineCodeExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [inlineCodeExtension]
});

editor.mount(document.getElementById('editor') as HTMLElement);
```

### Configure the extension

The `inlineCode` extension exposes an `htmlAttributes` option that adds custom HTML attributes to every rendered `<code>` element. Use `.configure()` to set it:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `htmlAttributes` | `Record<string, string>` | `{}` | Custom HTML attributes applied to the rendered `<code>` element. |

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, inlineCodeExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [
        inlineCodeExtension.configure({
            htmlAttributes: { class: 'my-custom-class' }
        })
    ]
});

editor.mount(document.getElementById('editor') as HTMLElement);
```

### Commands

| Command | Description |
|---------|-------------|
| `toggleCodeMark()` | Toggles inline code formatting on the current selection. |

```ts
editor.commands.toggleCodeMark();
```

### Keyboard shortcut

| Action | Windows | Mac |
|--------|---------|-----|
| Toggle Inline Code | <kbd>Ctrl</kbd> + <kbd>`</kbd> | <kbd>⌘</kbd> + <kbd>`</kbd> |

### Input rules

The Inline Code mark supports Markdown-style input rules using `` `text` `` syntax.

```text
Type:    `let x = 10;`
Result:  <code>let x = 10;</code>
```

---

## Font Color Mark

The `fontColorExtension` registers the `fontColor` capability, which applies a foreground color to text. Color values are stored using the shared `textStyle` mark, allowing color to coexist with other text style attributes such as font family, font size, and background color. It contributes the `setColor` and `unsetColor` commands.

Supported color formats include hex values (`#ff0000`), RGB/RGBA values (`rgb(255, 0, 0)`), and named CSS colors.

### Register the extension

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, fontColorExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [fontColorExtension]
});

editor.mount(document.getElementById('editor') as HTMLElement);
```

### Commands

| Command | Description |
|---------|-------------|
| `setColor({ color })` | Applies the specified color to the current selection. |
| `unsetColor()` | Removes the font color from the current selection. |

```ts
// Apply red color to the current selection
editor.commands.setColor({ color: '#ff0000' });

// Remove the font color from the current selection
editor.commands.unsetColor();
```

### API references

#### SetColorPayload

`SetColorPayload` — payload for the `setColor` command. Applies a color to the currently selected text or applies color to the editor's active text style mark.

| Property | Type | Description |
|----------|------|-------------|
| `color` | `string` | Hex, RGB, or named CSS color string. |

---

## Background Color Mark

The `backgroundColorExtension` registers the `backgroundColor` capability, which applies a background highlight to text. Color values are stored using the shared `textStyle` mark, allowing background color to coexist with other text style attributes such as font family, font size, and font color. It contributes the `setHighlight` and `unsetHighlight` commands.

Supported color formats include hex values (`#ffff00`), RGB/RGBA values (`rgb(255, 255, 0)`), and named CSS colors (`yellow`).

### Register the extension

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, backgroundColorExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [backgroundColorExtension]
});

editor.mount(document.getElementById('editor') as HTMLElement);
```

### Commands

| Command | Description |
|---------|-------------|
| `setHighlight({ color })` | Applies the specified background color to the current selection. |
| `unsetHighlight()` | Removes the background color from the current selection. |

```ts
// Apply yellow highlight to the current selection
editor.commands.setHighlight({ color: '#ffff00' });

// Remove the background color from the current selection
editor.commands.unsetHighlight();
```

### API references

#### SetHighlightPayload

`SetHighlightPayload` — payload for the `setHighlight` command. Specifies the background color (highlight) to apply to selected text. The color value is a CSS color that can be specified as hex, rgb, rgba, or named colors.

| Property | Type | Description |
|----------|------|-------------|
| `color` | `string` | The CSS color value for the background highlight. Accepts hex colors (`#RRGGBB`), RGB/RGBA values (`rgb(r, g, b)` or `rgba(r, g, b, a)`), HSL/HSLA values, or named CSS colors (`yellow`, `blue`, etc.). |

---

## Font Family Mark

The `fontFamilyExtension` registers the `fontFamily` capability, which applies a font family to text. Family values are stored using the shared `textStyle` mark, allowing font family to coexist with other text style attributes such as font size, font color, and background color. It contributes the `setFontFamily` and `unsetFontFamily` commands. Family names that contain spaces are automatically wrapped in double quotes in the generated CSS.

### Register the extension

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, fontFamilyExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [fontFamilyExtension]
});

editor.mount(document.getElementById('editor') as HTMLElement);
```

### Commands

| Command | Description |
|---------|-------------|
| `setFontFamily({ family })` | Applies the specified font family to the current selection. |
| `unsetFontFamily()` | Removes the font family from the current selection. |

```ts
// Apply Arial to the current selection
editor.commands.setFontFamily({ family: 'Arial' });

// Apply a font stack with quoted multi-word family names
editor.commands.setFontFamily({ family: '"Helvetica Neue", Arial, sans-serif' });

// Remove the font family from the current selection
editor.commands.unsetFontFamily();
```

### API references

#### SetFontFamilyPayload

`SetFontFamilyPayload` — payload for the `setFontFamily` command. Specifies the font family to apply to selected text. The family value is a CSS `font-family` property value (e.g., `'Arial'`, `'Georgia'`, `'monospace'`).

| Property | Type | Description |
|----------|------|-------------|
| `family` | `string` | The CSS font-family value to apply to the selected text. Accepts a single font name, a comma-separated font stack with fallbacks, or generic font family keywords (`serif`, `sans-serif`, `monospace`, etc.). |

---

## Font Size Mark

The `fontSizeExtension` registers the `fontSize` capability, which applies a font size to text. Size values are stored using the shared `textStyle` mark, allowing font size to coexist with other text style attributes such as font family, font color, and background color. It contributes the `setFontSize` and `unsetFontSize` commands.

Supported size formats include absolute units (`14px`, `12pt`), relative units (`1.2em`, `0.9rem`, `150%`), and CSS keywords (`small`, `medium`, `large`, `x-large`).

### Register the extension

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, fontSizeExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [fontSizeExtension]
});

editor.mount(document.getElementById('editor') as HTMLElement);
```

### Commands

| Command | Description |
|---------|-------------|
| `setFontSize({ size })` | Applies the specified font size to the current selection. |
| `unsetFontSize()` | Removes the font size from the current selection. |

```ts
// Apply 14px font size to the current selection
editor.commands.setFontSize({ size: '14px' });

// Remove the font size from the current selection
editor.commands.unsetFontSize();
```

### API references

#### SetFontSizePayload

`SetFontSizePayload` — payload for the `setFontSize` command. Specifies the font size to apply to selected text. The size value is a CSS `font-size` property value (e.g., `'14px'`, `'1.5em'`, `'larger'`).

| Property | Type | Description |
|----------|------|-------------|
| `size` | `string` | The CSS font-size value to apply to the selected text. Accepts any valid CSS font-size value including pixels (`px`), em units, rem units, percentages, or keyword values (`small`, `medium`, `large`, etc.). |

---

## Subscript Mark

The `subscriptExtension` registers the `subscript` mark, which applies subscript formatting to text and renders the content as a `<sub>` element. It contributes the `toggleSubscript` command, a keyboard shortcut for toggling subscript, and input rules that convert `,,text,,` into subscript as the user types.

### Register the extension

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, subscriptExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [subscriptExtension]
});

editor.mount(document.getElementById('editor') as HTMLElement);
```

### Configure the extension

The `subscript` extension exposes an `htmlAttributes` option that adds custom HTML attributes to every rendered `<sub>` element. Use `.configure()` to set it:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `htmlAttributes` | `Record<string, string>` | `{}` | Custom HTML attributes applied to the rendered `<sub>` element. |

### Commands

| Command | Description |
|---------|-------------|
| `toggleSubscript()` | Toggles subscript formatting on the current selection. |

```ts
editor.commands.toggleSubscript();
```

### Keyboard shortcut

| Action | Windows | Mac |
|--------|---------|-----|
| Toggle Subscript | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>,</kbd> | <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>,</kbd> |

### Input rules

The Subscript mark supports `,,text,,` syntax for inline conversion.

```text
Type:    ,,2,,
Result:  <sub>2</sub>
```

---

## Superscript Mark

The `superscriptExtension` registers the `superscript` mark, which applies superscript formatting to text and renders the content as a `<sup>` element. It contributes the `toggleSuperscript` command, a keyboard shortcut for toggling superscript, and input rules that convert `^text^` into superscript as the user types.

### Register the extension

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, superscriptExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [superscriptExtension]
});

editor.mount(document.getElementById('editor') as HTMLElement);
```

### Configure the extension

The `superscript` extension exposes an `htmlAttributes` option that adds custom HTML attributes to every rendered `<sup>` element. Use `.configure()` to set it:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `htmlAttributes` | `Record<string, string>` | `{}` | Custom HTML attributes applied to the rendered `<sup>` element. |

### Commands

| Command | Description |
|---------|-------------|
| `toggleSuperscript()` | Toggles superscript formatting on the current selection. |

```ts
editor.commands.toggleSuperscript();
```

### Keyboard shortcut

| Action | Windows | Mac |
|--------|---------|-----|
| Toggle Superscript | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>.</kbd> | <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>.</kbd> |

### Input rules

The Superscript mark supports `^text^` syntax for inline conversion.

```text
Type:    ^2^
Result:  <sup>2</sup>
```

---

## To Lower Case

The `toLowerCaseExtension` registers the `toLowerCase` command, which transforms the literal text characters in the current selection to lowercase.

### Register the extension

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, toLowerCaseExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [toLowerCaseExtension]
});

editor.mount(document.getElementById('editor') as HTMLElement);
```

### Commands

| Command | Description |
|---------|-------------|
| `toLowerCase()` | Converts the literal text characters of the current selection to lowercase. |

```ts
editor.commands.toLowerCase();
```

---

## To Upper Case

The `toUpperCaseExtension` registers the `toUpperCase` command, which transforms the literal text characters in the current selection to UPPERCASE.

### Register the extension

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, toUpperCaseExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [toUpperCaseExtension]
});

editor.mount(document.getElementById('editor') as HTMLElement);
```

### Commands

| Command | Description |
|---------|-------------|
| `toUpperCase()` | Converts the literal text characters of the current selection to UPPERCASE. |

```ts
editor.commands.toUpperCase();
```

## Generic Mark Payload

Most mark toggle / set commands accept a per-mark payload type that lives with that mark (for example, `SetLinkPayload` lives in the Link Mark section above). There is also a generic `SetMarkPayload` payload for commands that accept any mark type by name — useful when building tools that operate on marks dynamically.

### SetMarkPayload

`SetMarkPayload` — payload for the `setMark` command.

| Property | Type | Description |
|----------|------|-------------|
| `attrs` | `Record<string, unknown>` | Attributes to apply to the mark. |
| `markType` | `string` | The target mark type. |
