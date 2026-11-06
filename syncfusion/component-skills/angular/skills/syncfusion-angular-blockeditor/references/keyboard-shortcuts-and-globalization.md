# Keyboard Shortcuts and Globalization

## Table of Contents
- [Default Keyboard Shortcuts](#default-keyboard-shortcuts)
- [Custom Key Configuration](#custom-key-configuration)
- [Internationalization (i18n)](#internationalization-i18n)
- [Localization](#localization)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [Advanced Configuration Examples](#advanced-configuration-examples)

## Default Keyboard Shortcuts

### Text Formatting

| Shortcut | Windows | Mac | Action |
|----------|---------|-----|--------|
| Bold | Ctrl + B | ⌘ + B | Make text bold |
| Italic | Ctrl + I | ⌘ + I | Make text italic |
| Underline | Ctrl + U | ⌘ + U | Underline text |
| Strikethrough | Ctrl + Shift + X | ⌘ + Shift + X | Strike through text |
| Code | Ctrl + ` | ⌘ + ` | Inline code |

### Block Operations

| Shortcut | Windows | Mac | Action |
|----------|---------|-----|--------|
| Block Menu | / | / | Open slash menu |
| Indent | Tab | Tab | Indent block |
| Unindent | Shift + Tab | Shift + Tab | Decrease indentation |
| Duplicate | Ctrl + D | ⌘ + D | Duplicate block |
| Delete | Delete/Backspace | Delete/Backspace | Delete block |

### History

| Shortcut | Windows | Mac | Action |
|----------|---------|-----|--------|
| Undo | Ctrl + Z | ⌘ + Z | Undo last action |
| Redo | Ctrl + Y | ⌘ + Y | Redo last action |

### Navigation

| Shortcut | Windows | Mac | Action |
|----------|---------|-----|--------|
| Select All | Ctrl + A | ⌘ + A | Select all content |
| Copy | Ctrl + C | ⌘ + C | Copy selection |
| Cut | Ctrl + X | ⌘ + X | Cut selection |
| Paste | Ctrl + V | ⌘ + V | Paste clipboard |

## Custom Key Configuration

### Define Custom Shortcuts

Create custom keyboard shortcuts:

```typescript
public keyConfig = {
  bold: 'Ctrl+B',
  italic: 'Ctrl+I',
  underline: 'Ctrl+U',
  strikethrough: 'Ctrl+Shift+X',
  inlineCode: 'Ctrl+`',
  superscript: 'Ctrl+Shift+P',
  subscript: 'Ctrl+Shift+B'
};

@Component({
  selector: 'app-root',
  template: `<ejs-blockeditor [keyConfig]="keyConfig" />`,
  standalone: true,
  imports: [BlockEditorModule]
})
export class AppComponent {
  public keyConfig = this.keyConfig;
}
```

### Custom Format Shortcuts

```typescript
public keyConfig = {
  // Text formatting
  bold: 'Ctrl+B',
  italic: 'Ctrl+I',
  underline: 'Ctrl+U',
  
  // Block operations
  indent: 'Tab',
  unindent: 'Shift+Tab',
  duplicate: 'Ctrl+D',
  delete: 'Delete',
  
  // Custom shortcuts
  highlight: 'Ctrl+Alt+H',
  comment: 'Ctrl+Alt+C',
  bookmark: 'Ctrl+Alt+M'
};
```

### Platform-Specific Shortcuts

```typescript
public getKeyConfig(): any {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  
  return {
    bold: isMac ? '⌘+B' : 'Ctrl+B',
    italic: isMac ? '⌘+I' : 'Ctrl+I',
    underline: isMac ? '⌘+U' : 'Ctrl+U',
    undo: isMac ? '⌘+Z' : 'Ctrl+Z',
    redo: isMac ? '⌘+Shift+Z' : 'Ctrl+Y'
  };
}

@Component({
  selector: 'app-root',
  template: `<ejs-blockeditor [keyConfig]="keyConfig" />`,
  standalone: true,
  imports: [BlockEditorModule]
})
export class AppComponent {
  public keyConfig = this.getKeyConfig();

  private getKeyConfig(): any {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    return {
      bold: isMac ? '⌘+B' : 'Ctrl+B',
      italic: isMac ? '⌘+I' : 'Ctrl+I',
      underline: isMac ? '⌘+U' : 'Ctrl+U'
    };
  }
}
```

## Internationalization (i18n)

### Localization Files

Define localized strings:

```typescript
// localization.ts
export const locales = {
  en: {
    // UI Labels
    insertBlock: 'Insert block',
    formatText: 'Format text',
    deleteBlock: 'Delete block',
    duplicateBlock: 'Duplicate block',
    
    // Menu Items
    heading: 'Heading',
    paragraph: 'Paragraph',
    bulletList: 'Bullet list',
    numberedList: 'Numbered list',
    code: 'Code',
    quote: 'Quote',
    
    // Messages
    confirmDelete: 'Are you sure?',
    saved: 'Saved successfully',
    error: 'An error occurred'
  },
  es: {
    insertBlock: 'Insertar bloque',
    formatText: 'Dar formato al texto',
    deleteBlock: 'Eliminar bloque',
    duplicateBlock: 'Duplicar bloque',
    
    heading: 'Encabezado',
    paragraph: 'Párrafo',
    bulletList: 'Lista de viñetas',
    numberedList: 'Lista numerada',
    code: 'Código',
    quote: 'Cita',
    
    confirmDelete: '¿Está seguro?',
    saved: 'Guardado exitosamente',
    error: 'Ocurrió un error'
  },
  fr: {
    insertBlock: 'Insérer un bloc',
    formatText: 'Formater le texte',
    deleteBlock: 'Supprimer le bloc',
    duplicateBlock: 'Dupliquer le bloc',
    
    heading: 'En-tête',
    paragraph: 'Paragraphe',
    bulletList: 'Liste à puces',
    numberedList: 'Liste numérotée',
    code: 'Code',
    quote: 'Citation',
    
    confirmDelete: 'Êtes-vous sûr ?',
    saved: 'Enregistré avec succès',
    error: 'Une erreur est survenue'
  },
  de: {
    insertBlock: 'Block einfügen',
    formatText: 'Text formatieren',
    deleteBlock: 'Block löschen',
    duplicateBlock: 'Block duplizieren',
    
    heading: 'Überschrift',
    paragraph: 'Absatz',
    bulletList: 'Aufzählung',
    numberedList: 'Nummerierte Liste',
    code: 'Code',
    quote: 'Zitat',
    
    confirmDelete: 'Sind Sie sicher?',
    saved: 'Erfolgreich gespeichert',
    error: 'Ein Fehler ist aufgetreten'
  }
};
```

### Locale Service

```typescript
@Injectable({ providedIn: 'root' })
export class LocalizationService {
  private currentLocale$ = new BehaviorSubject<string>('en');
  public locales = locales;

  public setLocale(locale: string): void {
    this.currentLocale$.next(locale);
  }

  public getLocale(): string {
    return this.currentLocale$.getValue();
  }

  public getTranslation(key: string): string {
    const locale = this.getLocale();
    return this.locales[locale as keyof typeof locales]?.[key as any] || key;
  }

  public getCurrentLocaleData(): any {
    const locale = this.getLocale();
    return this.locales[locale as keyof typeof locales];
  }
}
```

### Component Implementation

```typescript
@Component({
  selector: 'app-editor',
  template: `
    <div class="toolbar">
      <button (click)="setLocale('en')">English</button>
      <button (click)="setLocale('es')">Español</button>
      <button (click)="setLocale('fr')">Français</button>
      <button (click)="setLocale('de')">Deutsch</button>
    </div>
    <ejs-blockeditor #blockEditor></ejs-blockeditor>
  `,
  standalone: true,
  imports: [BlockEditorModule, CommonModule]
})
export class EditorComponent {
  constructor(private localizationService: LocalizationService) {}

  public setLocale(locale: string): void {
    this.localizationService.setLocale(locale);
    this.updateUILabels();
  }

  private updateUILabels(): void {
    const labels = this.localizationService.getCurrentLocaleData();
    // Update UI elements with translated strings
  }
}
```

## Localization

### Language Support

Configure available languages:

```typescript
public localeSettings: LocaleSettings = {
  languages: [
    { locale: 'en-US', name: 'English (US)' },
    { locale: 'en-GB', name: 'English (UK)' },
    { locale: 'es-ES', name: 'Spanish (Spain)' },
    { locale: 'es-MX', name: 'Spanish (Mexico)' },
    { locale: 'fr-FR', name: 'French (France)' },
    { locale: 'de-DE', name: 'German (Germany)' },
    { locale: 'it-IT', name: 'Italian (Italy)' },
    { locale: 'pt-BR', name: 'Portuguese (Brazil)' },
    { locale: 'ru-RU', name: 'Russian (Russia)' },
    { locale: 'ja-JP', name: 'Japanese (Japan)' },
    { locale: 'zh-CN', name: 'Chinese (Simplified)' },
    { locale: 'ko-KR', name: 'Korean (Korea)' }
  ],
  defaultLocale: 'en-US'
};
```

### Date/Number Formatting

Format based on locale:

```typescript
public formatValue(value: any, format: 'date' | 'number' | 'currency'): string {
  const locale = this.localizationService.getLocale();
  
  switch (format) {
    case 'date':
      return new Intl.DateTimeFormat(locale).format(new Date(value));
    case 'number':
      return new Intl.NumberFormat(locale).format(value);
    case 'currency':
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'USD'
      }).format(value);
    default:
      return value;
  }
}
```

## Right-to-Left (RTL) Support

### Enable RTL Mode

```typescript
@Component({
  selector: 'app-root',
  template: `
    <div [dir]="isRTL ? 'rtl' : 'ltr'" class="editor-container">
      <ejs-blockeditor 
        [enableRtl]="isRTL"
        [locale]="currentLocale"
      />
    </div>
  `,
  styles: [`
    .editor-container {
      transition: direction 0.3s ease;
    }
    
    [dir="rtl"] .ej-blockeditor {
      direction: rtl;
      text-align: right;
    }
  `],
  standalone: true,
  imports: [BlockEditorModule, CommonModule]
})
export class AppComponent {
  public isRTL = false;
  public currentLocale = 'en-US';

  public toggleRTL(): void {
    this.isRTL = !this.isRTL;
    this.currentLocale = this.isRTL ? 'ar-AE' : 'en-US';
  }
}
```

### RTL Styling

```css
/* RTL-specific styles */
[dir="rtl"] .ej-blockeditor {
  direction: rtl;
  text-align: right;
}

[dir="rtl"] .ej-blockeditor .toolbar {
  flex-direction: row-reverse;
}

[dir="rtl"] .ej-blockeditor .toolbar-button {
  margin-left: 0;
  margin-right: 8px;
}

[dir="rtl"] .ej-blockeditor .dropdown-menu {
  right: 0;
  left: auto;
}

[dir="rtl"] .ej-blockeditor .indent {
  margin-right: 16px;
  margin-left: 0;
}
```

### RTL Languages

Automatic RTL for these locales:
- Arabic (ar-*)
- Hebrew (he-IL)
- Persian (fa-IR)
- Urdu (ur-PK)

## Advanced Configuration Examples

### Example 1: Multi-Language Editor

```typescript
@Component({
  selector: 'app-multilingual-editor',
  template: `
    <div class="language-selector">
      <select (change)="onLanguageChange($event)">
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="ar">Arabic</option>
      </select>
    </div>
    <div [dir]="isRTL ? 'rtl' : 'ltr'" class="editor-wrapper">
      <ejs-blockeditor 
        #blockEditor
        [enableRtl]="isRTL"
        [keyConfig]="keyConfig"
      />
    </div>
  `,
  standalone: true,
  imports: [BlockEditorModule, CommonModule, FormsModule]
})
export class MultilingualEditorComponent {
  @ViewChild('blockEditor') blockEditor!: BlockEditorComponent;
  
  public isRTL = false;
  public currentLanguage = 'en';
  public keyConfig: any = {};

  constructor(private localizationService: LocalizationService) {
    this.setupKeyConfig();
  }

  public onLanguageChange(event: any): void {
    const language = event.target.value;
    this.localizationService.setLocale(language);
    this.isRTL = this.isRTLLanguage(language);
    this.currentLanguage = language;
  }

  private isRTLLanguage(lang: string): boolean {
    return ['ar', 'he', 'fa', 'ur'].includes(lang);
  }

  private setupKeyConfig(): void {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    this.keyConfig = {
      bold: isMac ? '⌘+B' : 'Ctrl+B',
      italic: isMac ? '⌘+I' : 'Ctrl+I',
      underline: isMac ? '⌘+U' : 'Ctrl+U'
    };
  }
}
```

### Example 2: Custom Keyboard Bindings

```typescript
@Component({
  selector: 'app-custom-shortcuts',
  template: `<ejs-blockeditor [keyConfig]="keyConfig" />`,
  standalone: true,
  imports: [BlockEditorModule]
})
export class CustomShortcutsComponent {
  public keyConfig = {
    // Standard shortcuts
    bold: 'Ctrl+B',
    italic: 'Ctrl+I',
    underline: 'Ctrl+U',
    
    // Custom shortcuts
    formatAsCode: 'Ctrl+`',
    insertLink: 'Ctrl+K',
    insertImage: 'Ctrl+Shift+I',
    insertTable: 'Ctrl+Shift+T',
    insertQuote: 'Ctrl+\'',
    insertList: 'Ctrl+L',
    insertNumberedList: 'Ctrl+Shift+L',
    
    // Navigation
    selectAll: 'Ctrl+A',
    focusNext: 'Ctrl+Right',
    focusPrev: 'Ctrl+Left',
    
    // History
    undo: 'Ctrl+Z',
    redo: 'Ctrl+Y'
  };
}
```

### Example 3: Global Localization Setup

```typescript
// app.config.ts
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

export const appConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    {
      provide: 'LOCALE_ID',
      useValue: navigator.language || 'en-US'
    }
  ]
};

// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig);
```

