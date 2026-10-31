# Links in Syncfusion JavaScript Modern Rich Text Editor

The **Link Settings** govern how hyperlinks are created, normalized, and validated inside the editable area — covering automatic link creation when a URL is pasted over selected text, the default target applied to newly created links, protocol normalization for URLs that lack one, and the allow-list of accepted URL protocols. The **Link Quick Toolbar** is the contextual popup that opens when the caret enters an `<a>` element inside the editable area and surfaces the most relevant link commands — Open, Copy, Edit, Remove — without requiring the user to reach for the main toolbar.

## Table of contents

- [Link settings](#link-settings)
- [Paste link as text](#paste-link-as-text)
- [Always open link in new tab](#always-open-link-in-new-tab)
- [Configure available protocols](#configure-available-protocols)
- [Default protocol](#default-protocol)
- [Configure allowed protocols](#configure-allowed-protocols)
- [Link quick toolbar](#link-quick-toolbar)
- [Keyboard shortcut](#keyboard-shortcut)
- [API references](#api-references)

## Link settings

`linkSettings` is wired through `RichTextEditorUI.linkSettings` and has five properties:

| Property | Type | Default | Purpose |
| --- | --- | --- | --- |
| `linkOnPaste` | `boolean` | `true` | When `true`, pasting a URL over selected text converts it into a link. |
| `defaultTarget` | `string` | `'_blank'` | Default `target` applied to newly created links (`''`, `'_self'`, `'_blank'`, `'_parent'`, `'_top'`). |
| `autoPrependProtocol` | `boolean` | `true` | When `true`, prepends `defaultProtocol` to URLs that do not contain one. |
| `defaultProtocol` | `string` | `'https'` | Protocol prepended when `autoPrependProtocol` is `true` and the URL has no protocol. Must be present in `allowedProtocols`. |
| `allowedProtocols` | `string[]` | `['http', 'https', 'mailto', 'tel']` | Allow-list for accepted URL protocols. URLs whose protocol is outside this list are rejected. |

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    linkSettings: {
        linkOnPaste: true,
        defaultTarget: '_blank',
        autoPrependProtocol: true,
        defaultProtocol: 'https',
        allowedProtocols: ['http', 'https', 'mailto', 'tel']
    },
    placeholder: 'Type something ...'
});

editor.appendTo('#editor');
```

> If `defaultProtocol` is **not** present in `allowedProtocols`, the editor logs a warning and silently falls back to the first entry of `allowedProtocols`. Add your default to the allow-list, or change `defaultProtocol` to one that already exists.

## Paste link as text

`linkSettings.linkOnPaste` controls what happens when the user pastes a URL over a non-collapsed text selection inside the editor.

| Value | Behavior |
| --- | --- |
| `true` (default) | The pasted URL replaces the selection and is converted into a hyperlink. The link uses the editor's `defaultTarget`, `defaultProtocol`, and `autoPrependProtocol` settings. |
| `false` | The pasted URL replaces the selection as plain text. No `<a>` element is created. |

`linkOnPaste` only triggers for **URL-like** payloads:

- A URL with a protocol such as `https://example.com` or `mailto:foo@bar.com`.
- A protocol-less host such as `www.example.com` or `example.com/path`.
- A relative URL starting with `/`, `?`, or `#`.

A paste whose payload contains whitespace, or that is plain text with a URL inside it, is treated as a normal paste and is **not** auto-linked.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    linkSettings: {
        linkOnPaste: true,
        defaultTarget: '_blank',
        autoPrependProtocol: true,
        defaultProtocol: 'https',
        allowedProtocols: ['http', 'https', 'mailto', 'tel']
    }
});

editor.appendTo('#editor');
```

> When `autoPrependProtocol` is `true` and the pasted URL has no protocol, the editor prepends `defaultProtocol` (for example `https://`) before dispatching the `link` command.

## Always open link in new tab

`linkSettings.defaultTarget` sets the `target` attribute applied to hyperlinks the editor creates through the Insert-Link dialog or through `linkOnPaste`. The supported values mirror the standard HTML `target` attribute.

| Value | Behavior |
| --- | --- |
| `''` | No `target` attribute is set — the link navigates in the current browsing context. |
| `'_self'` | Opens in the same browsing context (the default browser behavior). |
| `'_blank'` (default) | Opens in a new tab or window. |
| `'_parent'` | Opens in the parent browsing context, if any. |
| `'_top'` | Opens in the topmost browsing context, breaking out of any nested frames. |

The Insert-Link dialog exposes an **"Open link in new window"** checkbox. When checked, the new link gets `target="_blank"`. When unchecked, the link gets `linkSettings.defaultTarget`.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    linkSettings: {
        defaultTarget: '_blank'
    }
});

editor.appendTo('#editor');
```

> The Link Quick Toolbar's `Open` item always uses `window.open(href, target || '_blank')` — so a link with no `target` still opens in a new tab from the quick toolbar.

## Configure available protocols

`linkSettings.autoPrependProtocol` and `linkSettings.defaultProtocol` work as a pair: when `autoPrependProtocol` is `true`, URLs typed into the Insert-Link dialog or pasted over a selection that lack a protocol are prefixed with `defaultProtocol` (for example `https://`). When `autoPrependProtocol` is `false`, the URL is left untouched and is inserted exactly as typed.

| autoPrependProtocol | defaultProtocol | URL typed | URL stored as |
| --- | --- | --- | --- |
| `true` | `'https'` | `example.com/page` | `https://example.com/page` |
| `true` | `'http'` | `example.com/page` | `http://example.com/page` |
| `false` | `any` | `example.com/page` | `example.com/page` |
| `true` | `any` | `https://example.com` | `https://example.com` (untouched) |

The Insert-Link dialog renders a protocol dropdown next to the URL input when `autoPrependProtocol` is `true`. The dropdown is populated from `allowedProtocols`, and the initial selection is `defaultProtocol`. As the user types in the URL input, the dropdown auto-syncs to the protocol it can detect.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    linkSettings: {
        autoPrependProtocol: true,
        defaultProtocol: 'https'
    }
});

editor.appendTo('#editor');
```

> Relative URLs that start with `/`, `?`, or `#` are never prepended — they are always inserted as typed.

## Default protocol

`linkSettings.defaultProtocol` selects which protocol is prepended to protocol-less URLs when `autoPrependProtocol` is `true`. It is also the initial selection in the Insert-Link dialog's protocol dropdown.

The value must be one of the entries in `allowedProtocols` (matched case-insensitively). The editor logs a warning and falls back to `allowedProtocols[0]` if it cannot find a match.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    linkSettings: {
        autoPrependProtocol: true,
        defaultProtocol: 'https',
        allowedProtocols: ['http', 'https', 'mailto', 'tel']
    }
});

editor.appendTo('#editor');
```

## Configure allowed protocols

`linkSettings.allowedProtocols` is the allow-list applied to URL validation in two places:

1. The Insert-Link dialog validates the URL input on every keystroke. A URL whose protocol is outside the allow-list is marked with the `e-error` CSS class, and the Insert / Update button refuses to submit.
2. The `linkOnPaste` flow validates the pasted URL the same way. A URL whose protocol is outside the allow-list falls through to plain-text paste.

Relative URLs (`/foo`, `?bar=1`, `#section`) skip protocol validation.

### Built-in entries

The default allow-list is `['http', 'https', 'mailto', 'tel']`. These protocols cover the four link shapes the editor creates out of the box:

| Entry | Use case |
| --- | --- |
| `http` | Plain HTTP URLs. |
| `https` | Secure HTTP URLs. |
| `mailto` | `mailto:user@example.com` links that open the user's mail client. |
| `tel` | `tel:+15551234567` links that open the dialer. |

### Adding `sms` or `ftp`

Extend `allowedProtocols` to accept protocols that are not in the default allow-list. Each entry is matched case-insensitively against the protocol parsed from the URL.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    linkSettings: {
        allowedProtocols: ['http', 'https', 'mailto', 'tel', 'sms', 'ftp'],
        defaultProtocol: 'https'
    }
});

editor.appendTo('#editor');
```

### Restricting to a single protocol

To restrict the editor to one protocol, list only that protocol in `allowedProtocols`. The Insert-Link dialog's protocol dropdown collapses to that single entry, and `linkOnPaste` falls through to plain text for any other URL shape.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    linkSettings: {
        allowedProtocols: ['https'],
        defaultProtocol: 'https',
        autoPrependProtocol: true
    }
});

editor.appendTo('#editor');
```

> Protocols that can execute scripts (`javascript:`, `data:`) are **not** included in the default allow-list. The editor never validates URLs whose protocol is outside `allowedProtocols` as a successful link — the URL is rejected at dialog validation and at `linkOnPaste`.

## Link quick toolbar

It is wired through `quickToolbarSettings.link` on `RichTextEditorUI`:

```ts
type LinkQuickToolbarItem = 'Open' | 'Copy' | 'Edit' | 'Remove' | '|' | CustomToolbarItem;
```

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    quickToolbarSettings: {
        enable: true,
        link: ['Open', 'Copy', 'Edit', 'Remove']
    }
});

editor.appendTo('#editor');
```

By default, `quickToolbarSettings.link` is set to `['Open', 'Copy', 'Edit', 'Remove']`. To disable the Link Quick Toolbar without disabling the rest of the quick toolbar system, set `link: []` or `link: null` — the toolbar is only instantiated when `link` is a non-empty array.

### Available items

The Link Quick Toolbar accepts the `LinkQuickToolbarItem` union, which narrows the available identifiers to the four link-specific commands plus a visual separator and any user-supplied custom item.

### Built-in items

| Identifier | Behaviour |
| --- | --- |
| `Open` | Opens the link `href` in a new tab using `window.open(href, target \|\| '_blank')`. The link's own `target` attribute is honored when present. |
| `Copy` | Copies the link `href` to the clipboard as both `text/plain` and `text/html` (using `navigator.clipboard.write` with a `ClipboardItem`). |
| `Edit` | Opens the Insert-Link dialog pre-filled with the link's current `href`, `text`, `title`, and `target` attributes. |
| `Remove` | Unlinks the selection — removes the `<a>` wrapper but keeps the link's text content. |
| `\|` | Visual separator used to split action groups inside the popup. |
| `CustomToolbarItem` | A user-defined item routed through `toolbarSettings.itemClicked`. |

### Default configuration

The default `link` array is:

```ts
link: ['Open', 'Copy', 'Edit', 'Remove']
```

The order is significant — items render left-to-right in the array order, separated visually by the popup's tip-pointer logic. To rearrange the buttons, supply the items in the order you want.

### Default-link toolbar surface

The Link Quick Toolbar is **not** rendered until the caret enters an `<a>` element. The toolbar is governed by:

- `quickToolbarSettings.enable` — master switch. When `false`, no quick toolbars (text, link, image, table) are rendered.
- `quickToolbarSettings.link` — the items array. When empty or `null`, the link quick toolbar is not instantiated.
- `toolbarSettings.enable` — when `false`, the Link Quick Toolbar is also disabled (it requires the main toolbar subsystem to be enabled).

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    quickToolbarSettings: {
        enable: true,
        link: ['Open', 'Copy', 'Edit', 'Remove']
    }
});

editor.appendTo('#editor');
```

> When `link` is configured, the toolbar is positioned directly above the link element using the same tip-pointer logic as the text quick toolbar (top-position collision flipping).

### Customizing the items

`link` accepts any of the `LinkQuickToolbarItem` union members:

| Item form | Example | Purpose |
| --- | --- | --- |
| Built-in identifier | `'Open'` | Use the editor's built-in handler. |
| Custom item | `{ actionId: 'bookmark', id: 'bookmark', text: 'Bookmark link' }` | Wire a user-defined action that branches on `toolbarSettings.itemClicked`. |
| Separator | `\|` | Visual divider between groups. |

The example below adds a custom "Bookmark" item alongside the four built-ins, then routes the click through `toolbarSettings.itemClicked`:

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

interface ClickedArgs {
    item?: { id?: string; actionId?: string };
    event?: Event;
}

const editor: RichTextEditorUI = new RichTextEditorUI({
    toolbarSettings: {
        itemClicked: (args: ClickedArgs): void => {
            if (args.item && args.item.actionId === 'bookmark') {
                // dispatch your bookmark logic here
            }
        }
    },
    quickToolbarSettings: {
        enable: true,
        link: [
            'Open', 'Copy',
            '|',
            {
                actionId: 'bookmark',
                id: 'bookmark',
                text: 'Bookmark',
                tooltipText: 'Bookmark this link'
            },
            '|',
            'Edit', 'Remove'
        ]
    }
});

editor.appendTo('#editor');
```

### Link Quick Toolbar behaviour

| Trigger | What happens |
| --- | --- |
| Caret enters an `<a>` (mouseup or keyup) | The toolbar opens above the link element. |
| Caret leaves an `<a>` | The toolbar closes. |
| `Escape` key | The toolbar closes. |
| Outside mouse-down | The toolbar closes. |
| User clicks `Remove` | The link is unwrapped and the toolbar closes (the caret no longer sits in a link). |
| User clicks `Edit` | The toolbar closes and the Insert-Link dialog opens pre-filled. |

## Keyboard shortcut

The default keyboard shortcut for inserting a link is **Ctrl+K** (Windows) / `⌘ K` (macOS). To remap the shortcut, override `keyBindings.link` on `toolbarSettings` — see [toolbar.md](toolbar.md) → *Configuring keyboard shortcuts*.

## API references

API types that back the link surface, sourced from the Syncfusion EJ2 TypeScript API reference for `@syncfusion/ej2-richtexteditor-ui`.

### `LinkCommandBuilder`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/linkcommandbuilder>

Builder for link command with chainable URL/text options. Owns the link-command payload assembly and dispatch. The internal link module simply produces the building blocks (`operation`, `href`, `displayText`, `target`, `title`) and delegates the final mutation through this builder so all link-related actions route through one entry point.

#### Methods

- `apply` — Execute the link command and dispatch through the action pipeline. Returns `void`.
- `displayText(displayValue)` — Set the display text of the link. Alias for `text()`.

  | Parameter | Type | Description |
  | --- | --- | --- |
  | `displayValue` | `string` | The display text value to set |

  Returns `this`.

- `href(hrefValue)` — Set the href for the link.

  | Parameter | Type | Description |
  | --- | --- | --- |
  | `hrefValue` | `string` | The href value to set |

  Returns `this`.

- `operation` — Set the link operation mode. Default is `'insert'`. Pass `'edit'` to update an existing link, `'remove'` to unlink a selection, and `'open'` / `'copy'` for the matching Quick Toolbar actions. Returns `this`.
- `source(event)` — Capture the originating event so the action pipeline can forward it through `EditorController.process`. Optional for callers that only need a fire-and-forget mutation (e.g. `executeCommand('link', ...)`).

  | Parameter | Type | Description |
  | --- | --- | --- |
  | `event` | `MouseEvent` \| `KeyboardEvent` | The source event |

  Returns `this`.

- `target(targetValue)` — Set the target attribute (e.g. `'_blank'`, `'_self'`).

  | Parameter | Type | Description |
  | --- | --- | --- |
  | `targetValue` | `string` \| `null` | The target attribute value to set |

  Returns `this`.

- `text(textValue)` — Set the visible text of the link.

  | Parameter | Type | Description |
  | --- | --- | --- |
  | `textValue` | `string` | The text value to set |

  Returns `this`.

- `title(titleValue)` — Set the title/tooltip attribute of the link.

  | Parameter | Type | Description |
  | --- | --- | --- |
  | `titleValue` | `string` \| `null` | The title value to set |

  Returns `this`.

- `url(urlValue)` — Set the URL/href for the link. Alias for `href()` to match the public API expected from dialog consumers.

  | Parameter | Type | Description |
  | --- | --- | --- |
  | `urlValue` | `string` | The URL value to set |

  Returns `this`.


### `LinkSettings`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/linksettings>

Configures the link settings of the RichTextEditor.

#### Properties

- `allowedProtocols` — `string[]` — Specifies the list of allowed protocols for link URLs. URLs with a protocol outside this list are rejected. Relative URLs, query strings, and fragments skip this validation.
  - Defaults to `['http', 'https', 'mailto', 'tel']`.
- `autoPrependProtocol` — `boolean` — Specifies whether to automatically prepend a protocol (such as `https://`) to URLs that do not contain one.
  - Defaults to `true`.
- `defaultProtocol` — `string` — Specifies the protocol to prepend when `autoPrependProtocol` is enabled and the URL lacks a protocol.
  - Defaults to `'https'`.
- `defaultTarget` — `string` — Specifies the default target for newly created links. Possible values: `''`, `'_self'`, `'_blank'`, `'_parent'`, `'_top'`.
  - Defaults to `'_blank'`.
- `linkOnPaste` — `boolean` — Specifies whether pasting a URL over selected text converts it into a link.
  - Defaults to `true`.

### `LinkSettingsModel`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/linksettingsmodel>

Interface for the class `LinkSettings`.

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| `allowedProtocols` | `string[]` | Specifies the list of allowed protocols for link URLs. URLs with a protocol outside this list are rejected. Relative URLs, query strings, and fragments skip this validation. |
| `autoPrependProtocol` | `boolean` | Specifies whether to automatically prepend a protocol (such as `https://`) to URLs that do not contain one. |
| `defaultProtocol` | `string` | Specifies the protocol to prepend when `autoPrependProtocol` is enabled and the URL lacks a protocol. |
| `defaultTarget` | `string` | Specifies the default target for newly created links. Possible values: `''`, `'_self'`, `'_blank'`, `'_parent'`, `'_top'`. |
| `linkOnPaste` | `boolean` | Specifies whether pasting a URL over selected text converts it into a link. |


### `LinkQuickToolbarItem`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/linkquicktoolbaritem>

Built-in items exposed by the Link Quick Toolbar.

#### Enum members

- `Open`
- `Copy`
- `Edit`
- `Remove`
- `|`
- `CustomToolbarItem`
