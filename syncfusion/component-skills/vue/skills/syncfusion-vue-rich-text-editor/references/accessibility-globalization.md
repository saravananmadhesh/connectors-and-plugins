# Accessibility & Globalization

## Accessibility Compliance

The Rich Text Editor meets the following standards out of the box:

| Standard | Compliance |
|---|---|
| WCAG 2.2 | AA (Full) |
| Section 508 | Full |
| WAI-ARIA | Full |
| Keyboard Navigation | Full |
| Screen Reader | Full |
| RTL Support | Full |
| Color Contrast | AA |

## ARIA Roles

| Element | ARIA Role/Attribute |
|---|---|
| Editor content area | `role="application"` |
| Toolbar | `role="toolbar"` |
| Toolbar items | `aria-disabled` on inactive items |
| Toolbar orientation | `aria-orientation="horizontal"` |
| Dropdown toolbar items | `aria-haspopup="true"`, `aria-owns` linking to popup id |
| Popup panels | `role="listbox"` or `role="dialog"` |

The editor automatically manages these roles and states as the user interacts with the toolbar and content area.

## Keyboard Navigation

### Editor Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + B` | Bold |
| `Ctrl + I` | Italic |
| `Ctrl + U` | Underline |
| `Ctrl + Z` | Undo |
| `Ctrl + Y` | Redo |
| `Ctrl + K` | Insert Link |
| `Ctrl + A` | Select All |
| `Alt + Enter` | Open AI Query popup (when AI Assistant is enabled) |
| `Escape` | Close active popup/dropdown |
| `Tab` | Move focus to the next focusable element |

### Toolbar Keyboard Navigation

| Key | Action |
|---|---|
| `Tab` | Move focus into the toolbar |
| `Arrow Left / Right` | Navigate between toolbar items |
| `Enter` / `Space` | Activate focused toolbar button |
| `Escape` | Return focus to editor from toolbar |

## Screen Reader Support

The Rich Text Editor is tested and compatible with the following screen readers:

| Screen Reader | Browser |
|---|---|
| NVDA | Chrome |
| JAWS | Chrome |
| VoiceOver (macOS) | Safari |
| Narrator | Edge |

The editor announces toolbar actions, popup states, and content changes through live ARIA regions.

## RTL (Right-to-Left) Support

Enable RTL mode to mirror the editor layout for Arabic, Hebrew, Persian, and other RTL languages:

```vue
<ejs-richtexteditor
  :enableRtl="true"
  :value="content"
/>
```

When RTL is enabled:
- The toolbar flows from right to left
- Text direction defaults to right-to-left
- Popups and dropdowns open from the right

## Globalization (Locale)

The Rich Text Editor supports locale customization for all UI strings (toolbar tooltips, dialog labels, button text, etc.).

### Setting a Locale

```js
import { L10n, setCulture } from '@syncfusion/ej2-base';

// Define translations for your target locale
L10n.load({
  'fr-FR': {
    'richtexteditor': {
      'alignments': 'Alignements',
      'justifyLeft': 'Aligner à gauche',
      'justifyCenter': 'Centrer',
      'justifyRight': 'Aligner à droite',
      'justifyFull': 'Justifier',
      'fontName': 'Police',
      'fontSize': 'Taille de police',
      'bold': 'Gras',
      'italic': 'Italique',
      'underline': 'Souligner',
      'insertLink': 'Insérer un lien',
      'imageCaption': 'Légende',
      'undo': 'Annuler',
      'redo': 'Rétablir'
    }
  }
});

// Set culture for date/number formatting
setCulture('fr-FR');
```

```vue
<ejs-richtexteditor locale="fr-FR" />
```

### Common Locale Keys

| Key | Description |
|---|---|
| `bold`, `italic`, `underline` | Basic text formatting tooltip labels |
| `alignments`, `justifyLeft`, `justifyRight`, `justifyCenter`, `justifyFull` | Alignment tooltip labels |
| `fontName`, `fontSize` | Font picker labels |
| `insertLink` | Insert Link dialog title |
| `imageCaption` | Image caption label |
| `undo`, `redo` | Undo/Redo tooltip labels |
| `pasteFormat` | Paste prompt dialog title |
| `keepFormat`, `cleanFormat`, `plainText` | Paste option labels |
| `table` | Table creation label |
| `cancel`, `insert` | Dialog button labels |

> For a full list of locale keys, refer to the [Syncfusion ej2-locale repository](https://github.com/syncfusion/ej2-locale).

## Customize Keyboard Shortcuts

Override default shortcuts using `keyConfig`:

```vue
<ejs-richtexteditor :keyConfig="keyConfig" />
```

```js
const keyConfig = {
  bold: 'ctrl+alt+b',
  italic: 'ctrl+alt+i',
  underline: 'ctrl+alt+u'
};
```

## Focus Management

Programmatically focus the editor:

```js
rteRef.value.ej2Instances.focusIn();   // Focus the content area
rteRef.value.ej2Instances.focusOut();  // Remove focus
```
