# Accessibility and Globalization

## Table of Contents
- [Accessibility Compliance](#accessibility-compliance)
- [ARIA Attributes](#aria-attributes)
- [Keyboard Shortcuts — HTML Mode](#keyboard-shortcuts--html-mode)
- [Keyboard Shortcuts — Markdown Mode](#keyboard-shortcuts--markdown-mode)
- [Localization](#localization)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)

---

## Accessibility Compliance

The Syncfusion ASP.NET Core Rich Text Editor is compliant with:

| Standard | Level |
|----------|-------|
| WCAG 2.2 | AA |
| Section 508 | Supported |

The editor supports full keyboard navigation, screen reader announcements, and focus management. All interactive elements (toolbar buttons, dialogs, dropdowns) are reachable via keyboard.

**Screen Reader Support:** The editor is tested against NVDA + Chrome and JAWS + Chrome on Windows.

---

## ARIA Attributes

The editor renders the following ARIA attributes automatically:

| Element | ARIA Attributes |
|---------|----------------|
| Editor root element | `role="application"`, `aria-label`, `aria-disabled` |
| Toolbar | `role="toolbar"`, `aria-label`, `aria-orientation="horizontal"` |
| Toolbar buttons | `role="button"`, `aria-label`, `aria-pressed` (for toggleable), `aria-disabled` |
| Toolbar dropdowns | `role="combobox"`, `aria-haspopup`, `aria-expanded` |
| Colour pickers | `role="listbox"`, `aria-owns` |
| Source view textarea | `aria-label`, `role="textbox"` |

No additional configuration is required — these are rendered automatically.

---

## Keyboard Shortcuts — HTML Mode

### Text Formatting

| Shortcut | Action |
|----------|--------|
| `Ctrl+B` | Bold |
| `Ctrl+I` | Italic |
| `Ctrl+U` | Underline |
| `Ctrl+Shift+S` | Strikethrough |
| `Ctrl+Shift+L` | Lowercase |
| `Ctrl+Shift+U` (legacy) | Uppercase |
| `Ctrl+=` | Subscript |
| `Ctrl+Shift+=` | Superscript |

### Lists and Indentation

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+O` | Ordered list |
| `Ctrl+Shift+N` | Unordered list |
| `Tab` (in list) | Increase indent |
| `Shift+Tab` (in list) | Decrease indent |

### Clipboard

| Shortcut | Action |
|----------|--------|
| `Ctrl+C` | Copy |
| `Ctrl+X` | Cut |
| `Ctrl+V` | Paste |
| `Ctrl+Shift+V` | Paste as plain text |

### Undo / Redo

| Shortcut | Action |
|----------|--------|
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |

### Links and Images

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` | Insert/edit link |

### Full Screen

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+F` | Toggle fullscreen |

### Source Code

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+H` | Toggle HTML source view |

### AI Query

| Shortcut | Action |
|----------|--------|
| `Alt+Enter` | Open AI Query input |

---

## Keyboard Shortcuts — Markdown Mode

| Shortcut | Markdown Output |
|----------|----------------|
| `Ctrl+B` | `**Bold**` |
| `Ctrl+I` | `_Italic_` |
| `Ctrl+Shift+S` | `~~Strikethrough~~` |
| `Ctrl+Shift+O` | `1. Ordered item` |
| `Ctrl+Shift+N` | `- Unordered item` |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |
| `Ctrl+K` | `[Link text](url)` |

---

## Localization

Change the editor UI language by setting the `locale` property. The locale code must match an available translation.

**Example — French:**

```razor
<ejs-richtexteditor id="editor" locale="fr">
</ejs-richtexteditor>
```

**Steps to enable localization:**

1. Add the locale JSON file for the target language. Download from [Syncfusion GitHub locale repository](https://github.com/syncfusion/ej2-locale).

2. Load the locale data and set it on the `ej2_base` module before the component renders:

```html
<script src="~/js/locale/fr.json" type="text/javascript"></script>
<script>
    ej.base.L10n.load(window['fr']);
</script>
```

3. Set the `locale` property on the component:

```razor
<ejs-richtexteditor id="editor" locale="fr">
</ejs-richtexteditor>
```

**Common locale codes:**

| Language | Code |
|----------|------|
| French | `fr` |
| German | `de` |
| Spanish | `es` |
| Japanese | `ja` |
| Chinese (Simplified) | `zh` |
| Arabic | `ar` |

---

## Right-to-Left (RTL) Support

Enable RTL layout for languages such as Arabic, Hebrew, or Urdu:

```razor
<ejs-richtexteditor id="editor" enableRtl="true">
</ejs-richtexteditor>
```

When `enableRtl` is `true`:
- The toolbar items flow from right to left
- Text is aligned right by default
- Dropdowns and popup menus open toward the left
- The editor layout mirrors for RTL reading direction

**Combined RTL + Arabic Locale:**

```razor
<ejs-richtexteditor id="editor" enableRtl="true" locale="ar">
</ejs-richtexteditor>
```

```html
<script>
    ej.base.L10n.load(window['ar']);
</script>
```

### RTL with IFrame Mode

When using IFrame mode alongside RTL, add the `dir` attribute to the iframe body:

```razor
<ejs-richtexteditor id="editor" enableRtl="true">
    <e-richtexteditor-iframesettings enable="true">
        <e-iframesettings-attributes>
            <e-attributes dir="rtl">
            </e-attributes>
        </e-iframesettings-attributes>
    </e-richtexteditor-iframesettings>
</ejs-richtexteditor>
```
