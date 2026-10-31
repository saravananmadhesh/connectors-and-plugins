# Globalization, Localization & RTL

Reference for localizing RTE UI strings using `L10n`, enabling right-to-left (RTL) mode, and customizing locale-specific behavior.

---

## Table of Contents
- [Localization with L10n](#localization-with-l10n)
  - [Default locale keys (en-US)](#default-locale-keys-en-us)
  - [Applying a locale](#applying-a-locale)
  - [Example: German (de-DE)](#example-german-de-de)
- [Right-to-Left (RTL) Mode](#right-to-left-rtl-mode)
  - [Enabling RTL](#enabling-rtl)
  - [CSS customization in RTL mode](#css-customization-in-rtl-mode)
- [Key Notes](#key-notes)

---

## Localization with L10n

The RTE uses the `L10n` utility from `@syncfusion/ej2-base` to load translated strings. By default it uses US English (`en-US`). Load your locale strings **before** bootstrapping the Angular app (i.e., in `main.ts` or at the top of the component file before `@Component`).

### Default locale keys (en-US)

The complete set of keys for `"richtexteditor"` (partial list of commonly customized keys):

| Key | Default Value |
|-----|---------------|
| `bold` | `"Bold"` |
| `italic` | `"Italic"` |
| `underline` | `"Underline"` |
| `strikethrough` | `"Strikethrough"` |
| `fontName` | `"Font Name"` |
| `fontSize` | `"Font Size"` |
| `fontColor` | `"Font Color"` |
| `backgroundColor` | `"Background Color"` |
| `alignments` | `"Alignments"` |
| `orderedList` | `"Numbered List"` |
| `unorderedList` | `"Bulleted List"` |
| `createLink` | `"Insert Link"` |
| `image` | `"Insert Image"` |
| `audio` | `"Insert Audio"` |
| `video` | `"Insert Video"` |
| `undo` | `"Undo"` |
| `redo` | `"Redo"` |
| `sourcecode` | `"Code View"` |
| `fullscreen` | `"Maximize"` |
| `formats` | `"Formats"` |
| `clearFormat` | `"Clear Format"` |
| `print` | `"Print"` |
| `pasteFormat` | `"Paste Format"` |
| `plainText` | `"Plain Text"` |
| `keepFormat` | `"Keep"` |
| `cleanFormat` | `"Clean"` |
| `emojiPicker` | `"Emoji Picker"` |
| `formatPainter` | `"Format Painter"` |
| `fileManager` | `"File Manager"` |
| `mergecells` | `"Merge cells"` |
| `inserttablebtn` | `"Insert Table"` |

For the full list of ~150+ keys, see the source locale object in `docs/rich-text-editor/globalization.md`.

### Applying a locale

Set the `locale` property on the component and call `L10n.load()` with your translations before the component initializes:

```typescript
import { enableRipple, L10n } from '@syncfusion/ej2-base';
import { Component } from '@angular/core';
import {
    RichTextEditorModule, ToolbarService, LinkService,
    ImageService, HtmlEditorService, QuickToolbarService,
    TableService, PasteCleanupService
} from '@syncfusion/ej2-angular-richtexteditor';
enableRipple(true);

L10n.load({
    'de-DE': {
        'richtexteditor': {
            bold: 'Fett gedruckt',
            italic: 'Kursiv',
            underline: 'Unterstreichen',
            // ... add remaining keys
        }
    }
});

@Component({
    imports: [RichTextEditorModule],
    standalone: true,
    selector: 'app-root',
    template: `<ejs-richtexteditor id="editor" locale="de-DE"></ejs-richtexteditor>`,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService,
        QuickToolbarService, TableService, PasteCleanupService]
})
export class AppComponent {}
```

### Example: German (de-DE)

Key translations (representative subset):

```typescript
L10n.load({
    'de-DE': {
        'richtexteditor': {
            alignments: 'Ausrichtungen',
            justifyLeft: 'Linksbündig',
            justifyCenter: 'Zentriert',
            justifyRight: 'Rechts ausrichten',
            justifyFull: 'Justify ausrichten',
            fontName: 'Schriftartenname',
            fontSize: 'Schriftgrösse',
            bold: 'Fett gedruckt',
            italic: 'Kursiv',
            underline: 'Unterstreichen',
            strikethrough: 'Durchgestrichen',
            clearFormat: 'Format löschen',
            clearAll: 'Alles löschen',
            undo: 'Rückgängig machen',
            redo: 'Wiederholen',
            createLink: 'Hyperlink einfügen',
            image: 'Bild einfügen',
            audio: 'Audio einfügen',
            video: 'Video einfügen',
            fullscreen: 'Maximieren',
            formats: 'Formate',
            sourcecode: 'Code-Ansicht',
            inserttablebtn: 'Tabelle einfügen',
            pasteFormat: 'Format einfügen',
            plainText: 'Einfacher Text',
            cleanFormat: 'Sauber',
            keepFormat: 'Behalten',
            dialogInsert: 'Einfügen',
            dialogCancel: 'Abbrechen',
            dialogUpdate: 'Aktualisieren',
            // Slash menu items
            slashMenuItemHeadingOneText: 'Überschrift 1',
            slashMenuItemHeadingTwoText: 'Überschrift 2',
            slashMenuItemParagraphText: 'Absatz',
            slashMenuItemTableText: 'Tisch',
            slashMenuItemLinkText: 'Link',
        }
    }
});
```

> **Tip:** If a key is missing from your locale object, the RTE falls back to the English (`en-US`) default for that string.

---

## Right-to-Left (RTL) Mode

### Enabling RTL

Set `[enableRtl]="true"` to render the editor with right-to-left layout. This is independent of `locale` — you can have an English locale with RTL layout or vice versa.

```typescript
import { Component } from '@angular/core';
import {
    RichTextEditorModule, ToolbarService, LinkService,
    ImageService, HtmlEditorService, QuickToolbarService,
    TableService, PasteCleanupService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
    imports: [RichTextEditorModule],
    standalone: true,
    selector: 'app-root',
    template: `<ejs-richtexteditor id="editor" [enableRtl]="true"></ejs-richtexteditor>`,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService,
        QuickToolbarService, TableService, PasteCleanupService]
})
export class AppComponent {}
```

### CSS customization in RTL mode

When RTL is enabled, the class `e-rtl` is added to the root element. Use it to apply RTL-specific styles:

```css
.e-richtexteditor .e-rtl {
    background-color: antiquewhite;
}
```

---

## Key Notes

- `L10n.load()` must be called **before** the component is instantiated (top of the module or `main.ts`)
- `locale` property accepts IETF language tag strings (e.g., `"de-DE"`, `"fr-FR"`, `"ar-AE"`)
- RTL (`enableRtl`) and `locale` are **independent** properties — changing one does not affect the other
- For Arabic/Hebrew, combine both: `locale="ar-AE"` + `[enableRtl]="true"`
- Slash menu items, emoji picker, and AI assistant strings are all localizable via their own locale keys
- Missing locale keys fall back gracefully to `en-US`
