# Localization and Styling

## Table of Contents
- [Localization Overview](#localization-overview)
- [Supported Locales](#supported-locales)
- [Implementing Localization](#implementing-localization)
- [Right-to-Left (RTL)](#right-to-left-rtl)
- [Custom CSS Styling](#custom-css-styling)
- [Theme Integration](#theme-integration)
- [Dark Mode](#dark-mode)

## Localization Overview

The Inline AI Assist component supports multiple languages and locales. You can customize all user-facing text including buttons, placeholders, and labels.

### Default Localization Strings

The following strings can be customized for each locale:

| Key | Default Text | Purpose |
|-----|--------------|---------|
| `send` | Send | Send button label |
| `stopResponseText` | Stop Responding | Stop processing label |
| `thinkingIndicator` | Thinking | Thinking state indicator |
| `editingIndicator` | Editing | Editing state indicator |

## Supported Locales

Common locale codes:
- `en` - English (default)
- `de` - German
- `de-DE` - German (Germany)
- `es` - Spanish
- `es-ES` - Spanish (Spain)
- `fr` - French
- `fr-FR` - French (France)
- `ja` - Japanese
- `zh` - Chinese
- `zh-CN` - Chinese (Simplified)
- `ar` - Arabic
- `it` - Italian
- `pt` - Portuguese
- `ru` - Russian
- And many more...

## Implementing Localization

### Basic Localization Setup

```typescript
import { Component, ViewChild } from '@angular/core';
import { InlineAIAssistModule, InlineAIAssistComponent } from '@syncfusion/ej2-angular-interactive-chat';
import { L10n } from '@syncfusion/ej2-base';

@Component({
    imports: [InlineAIAssistModule],
    standalone: true,
    selector: 'app-root',
    template: `
        <ejs-inlineaiassist 
            id="assist"
            [relateTo]="'#button'"
            [locale]="locale">
        </ejs-inlineaiassist>
    `
})
export class AppComponent {
    @ViewChild('inlineAssistComponent')
    public inlineAssistComponent!: InlineAIAssistComponent;

    public locale: string = 'en';

    ngOnInit(): void {
        this.setupLocalization();
    }

    private setupLocalization(): void {
        // Load German localization
        L10n.load({
            'de': {
                'inline-ai-assist': {
                    'send': 'Senden',
                    'stopResponseText': 'Antwort stoppen',
                    'thinkingIndicator': 'Wird verarbeitet',
                    'editingIndicator': 'Wird bearbeitet'
                }
            }
        });
    }
}
```

### Setting Locale Property

```typescript
export class AppComponent {
    public locale: string = 'de-DE'; // German (Germany)

    // Change locale dynamically
    changeLocale(newLocale: string): void {
        this.locale = newLocale;
        this.inlineAssistComponent.locale = newLocale;
        this.inlineAssistComponent.dataBind();
    }
}
```

### Multiple Language Support

```typescript
import { L10n } from '@syncfusion/ej2-base';

export class LocalizationService {
    public static setupAllLocales(): void {
        L10n.load({
            'de': {
                'inline-ai-assist': {
                    'send': 'Senden',
                    'stopResponseText': 'Antwort stoppen'
                }
            },
            'es': {
                'inline-ai-assist': {
                    'send': 'Enviar',
                    'stopResponseText': 'Detener respuesta'
                }
            },
            'fr': {
                'inline-ai-assist': {
                    'send': 'Envoyer',
                    'stopResponseText': 'Arrêter la réponse'
                }
            },
            'ja': {
                'inline-ai-assist': {
                    'send': '送信',
                    'stopResponseText': '応答を停止'
                }
            },
            'zh-CN': {
                'inline-ai-assist': {
                    'send': '发送',
                    'stopResponseText': '停止响应'
                }
            }
        });
    }
}

// In your app component
export class AppComponent {
    ngOnInit(): void {
        LocalizationService.setupAllLocales();
    }
}
```

## Right-to-Left (RTL)

### Enable RTL

Use the `enableRtl` property to support right-to-left languages:

```typescript
export class AppComponent {
    public enableRtl: boolean = false;

    public setArabic(): void {
        this.locale = 'ar';
        this.enableRtl = true;
        this.inlineAssistComponent.locale = 'ar';
        this.inlineAssistComponent.enableRtl = true;
        this.inlineAssistComponent.dataBind();
    }
}
```

### RTL Localization Example

```typescript
export class AppComponent {
    ngOnInit(): void {
        // Load Arabic localization with RTL
        L10n.load({
            'ar': {
                'inline-ai-assist': {
                    'send': 'إرسال',
                    'stopResponseText': 'إيقاف الاستجابة',
                    'thinkingIndicator': 'جاري المعالجة',
                    'editingIndicator': 'جاري التحرير'
                }
            }
        });

        this.locale = 'ar';
        this.enableRtl = true;
    }
}
```

### RTL CSS

```css
/* RTL Container */
.e-inline-ai-assist[dir="rtl"] {
    direction: rtl;
    text-align: right;
}

/* RTL Buttons */
.e-inline-ai-assist[dir="rtl"] .e-btn {
    margin-left: 5px;
    margin-right: 0;
}

/* RTL Input */
.e-inline-ai-assist[dir="rtl"] input,
.e-inline-ai-assist[dir="rtl"] textarea {
    direction: rtl;
    text-align: right;
}

/* RTL Icons */
.e-inline-ai-assist[dir="rtl"] .e-icon {
    margin-right: 5px;
    margin-left: 0;
}
```

## Custom CSS Styling

### Global CSS Customization

```css
/* Component container */
.e-inline-ai-assist {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
}

/* Popup styling */
.e-inline-ai-assist .e-popup {
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* Input area */
.e-inline-ai-assist textarea {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    font-size: 14px;
    line-height: 1.5;
}

.e-inline-ai-assist textarea:focus {
    outline: none;
    border-color: #2196f3;
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

/* Buttons */
.e-inline-ai-assist .e-btn {
    border-radius: 4px;
    font-weight: 500;
    transition: all 0.3s ease;
}

.e-inline-ai-assist .e-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Response area */
.e-inline-ai-assist .e-response-item {
    padding: 12px;
    margin: 8px 0;
    background: #f5f5f5;
    border-radius: 6px;
    border-left: 3px solid #2196f3;
}

/* Toolbar */
.e-inline-ai-assist .e-toolbar {
    background: #f9f9f9;
    border-top: 1px solid #ddd;
    padding: 8px;
}
```

### Component-Specific CSS Class

```typescript
export class AppComponent {
    public cssClass: string = 'custom-assist-theme';
}
```

```css
/* Custom theme */
.custom-assist-theme {
    --primary-color: #007bff;
    --border-color: #ddd;
    --background-color: #fff;
    --text-color: #333;
}

.custom-assist-theme .e-popup {
    background: var(--background-color);
    border: 1px solid var(--border-color);
}

.custom-assist-theme .e-btn-primary {
    background: var(--primary-color);
}
```

## Theme Integration

### Material Theme

```typescript
import "@syncfusion/ej2-material3-theme/styles/inline-ai-assist/index.css";

// Component automatically uses Material design
```

### Fluent Theme

```typescript
import "@syncfusion/ej2-fluent-theme/styles/inline-ai-assist/index.css";
```

### Bootstrap Theme

```typescript
import "@syncfusion/ej2-bootstrap-theme/styles/inline-ai-assist/index.css";
```

## Dark Mode

### Dark Mode CSS

```css
/* Dark mode styles */
@media (prefers-color-scheme: dark) {
    .e-inline-ai-assist {
        background: #1e1e1e;
        color: #e0e0e0;
    }

    .e-inline-ai-assist .e-popup {
        background: #2d2d2d;
        border-color: #444;
    }

    .e-inline-ai-assist textarea {
        background: #3c3c3c;
        color: #e0e0e0;
        border-color: #555;
    }

    .e-inline-ai-assist .e-response-item {
        background: #2a2a2a;
        border-left-color: #64b5f6;
    }

    .e-inline-ai-assist .e-toolbar {
        background: #2d2d2d;
        border-color: #444;
    }
}
```

### Manual Dark Mode Toggle

```typescript
export class AppComponent {
    public isDarkMode: boolean = false;

    public toggleDarkMode(): void {
        this.isDarkMode = !this.isDarkMode;
        
        if (this.isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
}
```

```css
/* Dark mode implementation */
body.dark-mode {
    background: #1a1a1a;
    color: #e0e0e0;
}

body.dark-mode .e-inline-ai-assist {
    background: #2d2d2d;
    color: #e0e0e0;
}

body.dark-mode .e-inline-ai-assist textarea {
    background: #3c3c3c;
    color: #e0e0e0;
    border-color: #555;
}
```

## Complete Localization Example

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { InlineAIAssistModule, InlineAIAssistComponent } from '@syncfusion/ej2-angular-interactive-chat';
import { L10n } from '@syncfusion/ej2-base';

@Component({
    imports: [InlineAIAssistModule],
    standalone: true,
    selector: 'app-root',
    template: `
        <div class="settings">
            <label>Language: 
                <select (change)="changeLanguage($event.target.value)" [value]="currentLanguage">
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="ar">العربية</option>
                </select>
            </label>
            <label>
                <input type="checkbox" (change)="toggleDarkMode()" [checked]="isDarkMode">
                Dark Mode
            </label>
        </div>
        
        <button id="assistBtn" class="e-btn e-primary" (click)="onClick()">
            {{ currentLanguage === 'de' ? 'AI Assistent öffnen' : 'Open AI Assist' }}
        </button>
        
        <div id="editableText" contenteditable="true">
            <p>Content...</p>
        </div>
        
        <ejs-inlineaiassist 
            id="assist" 
            #inlineAssistComponent
            [relateTo]="'#assistBtn'"
            [locale]="currentLanguage"
            [enableRtl]="currentLanguage === 'ar'"
            [cssClass]="isDarkMode ? 'dark-mode' : ''">
        </ejs-inlineaiassist>
    `,
    styles: [`
        .settings { margin-bottom: 20px; }
        .settings label { margin-right: 20px; }
        .settings select { padding: 5px; }
        #editableText { width: 100%; min-height: 120px; padding: 12px; border: 1px solid; }
    `]
})
export class AppComponent implements OnInit {
    @ViewChild('inlineAssistComponent')
    public inlineAssistComponent!: InlineAIAssistComponent;

    public currentLanguage: string = 'en';
    public isDarkMode: boolean = false;

    ngOnInit(): void {
        this.setupLocales();
    }

    private setupLocales(): void {
        L10n.load({
            'de': {
                'inline-ai-assist': {
                    'send': 'Senden',
                    'stopResponseText': 'Antwort stoppen',
                    'thinkingIndicator': 'Wird verarbeitet',
                    'editingIndicator': 'Wird bearbeitet'
                }
            },
            'es': {
                'inline-ai-assist': {
                    'send': 'Enviar',
                    'stopResponseText': 'Detener respuesta'
                }
            },
            'fr': {
                'inline-ai-assist': {
                    'send': 'Envoyer',
                    'stopResponseText': 'Arrêter la réponse'
                }
            },
            'ar': {
                'inline-ai-assist': {
                    'send': 'إرسال',
                    'stopResponseText': 'إيقاف الاستجابة'
                }
            }
        });
    }

    public changeLanguage(lang: string): void {
        this.currentLanguage = lang;
        this.inlineAssistComponent.locale = lang;
        this.inlineAssistComponent.enableRtl = lang === 'ar';
        this.inlineAssistComponent.dataBind();
    }

    public toggleDarkMode(): void {
        this.isDarkMode = !this.isDarkMode;
        const body = document.body;
        
        if (this.isDarkMode) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    }

    public onClick(): void {
        this.inlineAssistComponent.showPopup();
    }
}
```
