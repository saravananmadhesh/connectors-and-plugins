# Floating Label and Localization in TextArea

## Table of Contents
- [floatLabelType Options](#floatlabeltype-options)
- [Basic Floating Label Usage](#basic-floating-label-usage)
- [Placeholder with Locale Property](#placeholder-with-locale-property)
- [Loading Translations with L10n](#loading-translations-with-l10n)

---

## floatLabelType Options

The `floatLabelType` property controls how the placeholder text behaves relative to the TextArea:

| Value | Behavior |
|---|---|
| `Never` | Placeholder stays inside the TextArea — never floats. This is the default. |
| `Always` | Placeholder always floats above the TextArea, regardless of content or focus. |
| `Auto` | Placeholder floats above the TextArea when focused or when a value is entered; returns to position when unfocused and empty. |

---

## Basic Floating Label Usage

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

// Auto: floats on focus or input
let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments',
    floatLabelType: 'Auto'
});
textareaObj.appendTo('#default');
```

Always floating label:

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Description',
    floatLabelType: 'Always'
});
textareaObj.appendTo('#default');
```

---

## Placeholder with Locale Property

Use the `locale` property to display the placeholder in a different culture:

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'veuillez inscrire vos commentaires',
    locale: 'fr-BE',
    floatLabelType: 'Auto'
});
textareaObj.appendTo('#default');
```

---

## Loading Translations with L10n

Use the `L10n.load()` function from `@syncfusion/ej2-base` to load culture-specific placeholder text. The translation key for TextArea is `textarea.placeholder`.

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';
import { L10n } from '@syncfusion/ej2-base';

// Load German translation for the textarea placeholder
L10n.load({
    'de-DE': {
        'textarea': { 'placeholder': 'Geben Sie Ihre Kommentare ein' }
    }
});

let textareaObj: TextArea = new TextArea({
    locale: 'de-DE',
    floatLabelType: 'Auto'
});
textareaObj.appendTo('#default');
```

---

## Notes

- `floatLabelType` only has a visual effect when a `placeholder` is also set.
- The `Never` value (default) renders the TextArea without any floating label behavior — the placeholder simply appears as standard HTML placeholder.
- `floatLabelType: 'Auto'` is the most common choice for form UX — the label lifts out of the way when users type.
- Outline and filled mode (`cssClass: 'e-outline'` or `cssClass: 'e-filled'`) work best with `floatLabelType: 'Auto'` or `'Always'`.
