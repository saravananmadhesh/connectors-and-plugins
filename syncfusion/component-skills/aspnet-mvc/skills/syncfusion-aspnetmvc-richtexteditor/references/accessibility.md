# Accessibility and Keyboard Support

The Syncfusion ASP.NET MVC Rich Text Editor is built to comply with WCAG 2.1 accessibility standards, ensuring it is usable by keyboard-only users and screen readers.

## WCAG Compliance

The RTE meets the following accessibility standards:
- **WCAG 2.1 Level AA** compliant
- Screen reader support via **WAI-ARIA** attributes
- Sufficient color contrast ratios in all official themes
- Keyboard navigation without requiring a mouse

---

## Keyboard Navigation Shortcuts

### Editor Content Area

| Key | Action |
|-----|--------|
| `Tab` | Move focus to toolbar |
| `Shift+Tab` | Move focus from editor to previous element |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |
| `Ctrl+B` | Bold |
| `Ctrl+I` | Italic |
| `Ctrl+U` | Underline |
| `Ctrl+K` | Insert link |
| `Ctrl+A` | Select all content |
| `Ctrl+C` / `Ctrl+V` | Copy / Paste |
| `Ctrl+X` | Cut |
| `Enter` | New paragraph |
| `Shift+Enter` | Line break (`<br>`) |

### Toolbar Navigation

| Key | Action |
|-----|--------|
| `Alt+F10` | Move focus to toolbar |
| `Left` / `Right` arrow | Navigate between toolbar items |
| `Enter` / `Space` | Activate focused toolbar item |
| `Escape` | Return focus to editor content area |
| `Tab` | Move to next toolbar group |

### Full Screen and Source Code

| Key | Action |
|-----|--------|
| `Ctrl+Shift+F` | Toggle full-screen mode |
| `Ctrl+Shift+H` | Toggle HTML source code view |

### AI Assistant

| Key | Action |
|-----|--------|
| `Alt+Enter` | Open AI Query popup |

---

## ARIA Attributes

The RTE automatically applies appropriate ARIA roles and attributes:

- The editor content area has `role="textbox"` with `aria-multiline="true"`
- Toolbar buttons include `aria-label` (e.g., `aria-label="Bold"`)
- Toolbar dropdowns use `role="listbox"` with `aria-selected` on the active option
- Dialogs (link, image, table insert) have `role="dialog"` with `aria-modal="true"` and `aria-label`
- Disabled toolbar items have `aria-disabled="true"`

---

## Screen Reader Support

The RTE is tested with:
- **JAWS** (Windows)
- **NVDA** (Windows)
- **VoiceOver** (macOS / iOS)

Screen readers will announce:
- Toolbar button labels and states (pressed/not pressed for toggles like Bold)
- Dialog titles and field labels
- Validation error messages

---

## Focus Indicators

All focusable elements (toolbar buttons, links, dropdowns) display visible focus rings in compliance with WCAG 2.4.7. The focus ring styling uses the active theme's focus color and is not suppressed.

---

## Accessibility Configuration Tips

- Always set a meaningful `Placeholder` text for empty editors in forms
- Use `Enabled(false)` with an associated `<label>` so screen readers announce the disabled state
- When using `ReadOnly(true)`, ensure the content is also accessible outside the editor as static HTML if screen readers need it for navigation
- In IFrame mode, inject an accessible CSS reset inside the iframe to ensure consistent focus styles
