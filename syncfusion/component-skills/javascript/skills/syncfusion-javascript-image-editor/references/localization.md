# Localization

## Table of Contents
- [Language Support](#language-support)
- [Setting Locale](#setting-locale)
- [Custom Translations](#custom-translations)
- [RTL Support](#rtl-support)
- [Common Patterns](#common-patterns)

## Language Support

### Supported Languages

The Image Editor supports multiple languages out of the box:

```typescript
import { ImageEditor } from '@syncfusion/ej2-image-editor';

// Supported locales:
const supportedLanguages = [
    'en-US',      // English (United States)
    'en',         // English (default)
    'de',         // German
    'fr',         // French
    'es',         // Spanish
    'it',         // Italian
    'ja',         // Japanese
    'ko',         // Korean
    'zh',         // Chinese (Simplified)
    'zh-TW',      // Chinese (Traditional)
    'ru',         // Russian
    'ar',         // Arabic
    'he',         // Hebrew
    'pt',         // Portuguese
    'pt-BR',      // Portuguese (Brazil)
    'tr',         // Turkish
    'ur',         // Urdu
    'vi',         // Vietnamese
    'id',         // Indonesian
    'th',         // Thai
    'sw',         // Swedish
    'da',         // Danish
    'nl',         // Dutch
    'fi',         // Finnish
    'nb',         // Norwegian
    'pl',         // Polish
    'hu',         // Hungarian
    'cs',         // Czech
    'ro',         // Romanian
    'el',         // Greek
    'tr',         // Turkish
];
```

### Language-Specific Features

Different languages have different text directions and formatting:

```typescript
// Left-to-Right (LTR) languages
const ltrLanguages = ['en', 'de', 'fr', 'es', 'ja', 'ko', 'zh'];

// Right-to-Left (RTL) languages
const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
```

## Setting Locale

### Basic Locale Setting

```typescript
import { ImageEditor } from '@syncfusion/ej2-image-editor';

const imageEditor = new ImageEditor({
    width: '550px',
    height: '330px',
    locale: 'fr'  // French
});

imageEditor.appendTo('#imageeditor');
```

### Common Locale Examples

Locale is set at initialization time:

```typescript
// English (US)
new ImageEditor({ locale: 'en-US' });

// German
new ImageEditor({ locale: 'de' });

// Spanish
new ImageEditor({ locale: 'es' });

// Japanese
new ImageEditor({ locale: 'ja' });

// Arabic
new ImageEditor({ locale: 'ar' });

// Chinese (Simplified)
new ImageEditor({ locale: 'zh' });

// Portuguese (Brazil)
new ImageEditor({ locale: 'pt-BR' });
```

### Dynamic Locale Change

To change locale at runtime, recreate the editor with the new locale, or update it via the property and call `refresh()`:

```typescript
function changeLanguage(imageEditor: ImageEditor, languageCode: string) {
    imageEditor.locale = languageCode;
    imageEditor.refresh();
}

// Language selector
document.getElementById('languageSelect').addEventListener('change', (e) => {
    changeLanguage(imageEditor, (e.target as HTMLSelectElement).value);
});
```

## Custom Translations

### Load Custom Locale Data

```typescript
import { L10n } from '@syncfusion/ej2-base';

// Define custom translations
L10n.load({
    'en-US': {
        'image-editor': {
            'open': 'Open Image',
            'save': 'Save Image',
            'crop': 'Crop',
            'rotate': 'Rotate',
            'flip': 'Flip',
            'undo': 'Undo',
            'redo': 'Redo',
            'reset': 'Reset',
            'zoom': 'Zoom',
            'filter': 'Filter',
            'annotation': 'Add Text',
            'shape': 'Add Shape',
            'freehand': 'Draw'
        }
    },
    'es': {
        'image-editor': {
            'open': 'Abrir imagen',
            'save': 'Guardar imagen',
            'crop': 'Cortar',
            'rotate': 'Girar',
            'flip': 'Voltear',
            'undo': 'Deshacer',
            'redo': 'Rehacer',
            'reset': 'Reiniciar',
            'zoom': 'Zoom',
            'filter': 'Filtro',
            'annotation': 'Añadir texto',
            'shape': 'Añadir forma',
            'freehand': 'Dibujar'
        }
    }
});

const imageEditor = new ImageEditor({
    locale: 'es'
});
```

### Add Translation for New Language

```typescript
import { L10n } from '@syncfusion/ej2-base';

// Add Japanese translation
L10n.load({
    'ja': {
        'image-editor': {
            'open': '画像を開く',
            'save': '画像を保存',
            'crop': 'トリミング',
            'rotate': '回転',
            'flip': '反転',
            'undo': '元に戻す',
            'redo': 'やり直す',
            'reset': 'リセット',
            'zoom': 'ズーム',
            'filter': 'フィルター',
            'annotation': 'テキスト追加',
            'shape': 'シェイプ追加',
            'freehand': '描画'
        }
    }
});

const imageEditor = new ImageEditor({
    locale: 'ja'
});
```

### Override Existing Translations

```typescript
import { L10n } from '@syncfusion/ej2-base';

// Load overrides for specific keys — merges with existing data
L10n.load({
    'en-US': {
        'image-editor': {
            'save': 'Export Image',       // Override
            'reset': 'Revert Changes'     // Override
        }
    }
});
```

## RTL Support

### Enable RTL via HTML and CSS

RTL layout is applied via the `dir` attribute on the container element, combined with an RTL CSS theme import:

```html
<!DOCTYPE html>
<html>
<head>
    <link href="node_modules/@syncfusion/ej2/styles/material.css" rel="stylesheet" />
</head>
<body dir="rtl">
    <div id="imageeditor"></div>
</body>
</html>
```

```typescript
import { L10n } from '@syncfusion/ej2-base';
import { ImageEditor } from '@syncfusion/ej2-image-editor';

L10n.load({
    'ar': { 'image-editor': { /* Arabic strings */ } }
});

const imageEditor = new ImageEditor({
    locale: 'ar'
});

imageEditor.appendTo('#imageeditor');
```

### RTL with Different Locales

```typescript
// Arabic
new ImageEditor({ locale: 'ar' }).appendTo('#editor');

// Hebrew
new ImageEditor({ locale: 'he' }).appendTo('#editor');

// Persian
new ImageEditor({ locale: 'fa' }).appendTo('#editor');

// Urdu
new ImageEditor({ locale: 'ur' }).appendTo('#editor');
```

### RTL CSS

```html
<!DOCTYPE html>
<html dir="rtl">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Image Editor RTL</title>
    <link href="styles/material.css" rel="stylesheet" />
    <style>
        body { direction: rtl; }
        .e-image-editor { direction: rtl; }
    </style>
</head>
<body>
    <div id="imageeditor"></div>
</body>
</html>
```

### Dynamic RTL Toggle

Toggle page direction and refresh the editor:

```typescript
function toggleRTL(imageEditor: ImageEditor, enable: boolean) {
    document.documentElement.dir = enable ? 'rtl' : 'ltr';
    imageEditor.refresh();
}

document.getElementById('rtlToggle').addEventListener('change', (e) => {
    toggleRTL(imageEditor, (e.target as HTMLInputElement).checked);
});
```

## Common Patterns

### Pattern: Language Selector

```typescript
import { ImageEditor } from '@syncfusion/ej2-image-editor';

function createLanguageSelector(imageEditor: ImageEditor) {
    const languages = [
        { code: 'en-US', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Deutsch' },
        { code: 'ja', name: '日本語' },
        { code: 'zh', name: '中文' },
        { code: 'ar', name: 'العربية' },
        { code: 'pt-BR', name: 'Português (BR)' }
    ];

    const select = document.createElement('select');
    select.id = 'languageSelector';

    languages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.code;
        option.textContent = lang.name;
        select.appendChild(option);
    });

    select.addEventListener('change', (e) => {
        const code = (e.target as HTMLSelectElement).value;
        imageEditor.locale = code;
        imageEditor.refresh();

        // Toggle page direction for RTL languages
        document.documentElement.dir = ['ar', 'he', 'fa'].includes(code) ? 'rtl' : 'ltr';
    });

    document.getElementById('controls').appendChild(select);
}
```

### Pattern: Detect Browser Language

```typescript
function autoDetectLanguage(imageEditor: ImageEditor) {
    const browserLanguage = navigator.language || 'en-US';

    const languageMap: Record<string, string> = {
        'de': 'de', 'fr': 'fr', 'es': 'es',
        'it': 'it', 'ja': 'ja', 'zh': 'zh',
        'ar': 'ar', 'pt': 'pt-BR'
    };

    const languageCode = browserLanguage.split('-')[0];
    const locale = languageMap[languageCode] || 'en-US';

    imageEditor.locale = locale;
    imageEditor.refresh();
}

autoDetectLanguage(imageEditor);
```

### Pattern: Multi-Language Application

```typescript
import { ImageEditor } from '@syncfusion/ej2-image-editor';

class MultiLanguageApp {
    private imageEditor: ImageEditor;
    private currentLocale: string = 'en-US';

    constructor() {
        const saved = localStorage.getItem('preferredLanguage') || 'en-US';
        this.imageEditor = new ImageEditor({
            width: '550px',
            height: '330px',
            locale: saved
        });
        this.imageEditor.appendTo('#imageeditor');
        this.currentLocale = saved;
    }

    setLanguage(locale: string) {
        this.currentLocale = locale;
        this.imageEditor.locale = locale;
        this.imageEditor.refresh();
        localStorage.setItem('preferredLanguage', locale);
    }
}

const app = new MultiLanguageApp();
```

### Pattern: Locale Fallback

```typescript
function setLocaleWithFallback(imageEditor: ImageEditor, preferredLocale: string) {
    const supported = ['en-US', 'es', 'fr', 'de', 'ja', 'zh', 'ar'];

    if (supported.includes(preferredLocale)) {
        imageEditor.locale = preferredLocale;
        return;
    }

    const languageCode = preferredLocale.split('-')[0];
    const fallback = supported.find(l => l.startsWith(languageCode));

    imageEditor.locale = fallback || 'en-US';
    imageEditor.refresh();
}

setLocaleWithFallback(imageEditor, 'pt-PT');  // Falls back to 'en-US'
```

