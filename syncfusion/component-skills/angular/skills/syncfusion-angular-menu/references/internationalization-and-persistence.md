# Internationalization, Persistence, and Advanced Configuration

## Table of Contents
- [Localization (i18n)](#localization-i18n)
- [State Persistence](#state-persistence)
- [HTML Sanitization](#html-sanitization)
- [Hover Delay Control](#hover-delay-control)
- [Custom CSS Classes](#custom-css-classes)
- [Advanced Configuration Patterns](#advanced-configuration-patterns)

---

## Localization (i18n)

The Menu component supports multiple languages through the `locale` property. This controls UI text and RTL layouts.

### Supported Locales

| Locale Code | Language | Script |
|-------------|----------|--------|
| `en-US` | English (US) | LTR |
| `en-GB` | English (GB) | LTR |
| `de-DE` | German | LTR |
| `fr-FR` | French | LTR |
| `es-ES` | Spanish | LTR |
| `it-IT` | Italian | LTR |
| `pt-BR` | Portuguese (Brazil) | LTR |
| `ru-RU` | Russian | LTR |
| `ar-AE` | Arabic (UAE) | RTL |
| `ar-SA` | Arabic (Saudi Arabia) | RTL |
| `he-IL` | Hebrew | RTL |
| `ja-JP` | Japanese | LTR |
| `zh-CN` | Chinese (Simplified) | LTR |
| `zh-TW` | Chinese (Traditional) | LTR |
| `ko-KR` | Korean | LTR |
| `th-TH` | Thai | LTR |

### Basic Localization

```typescript
import { Component } from '@angular/core';

@Component({
  template: `
    <div>
      <label>Select Language:</label>
      <select (change)="changeLocale($event)">
        <option value="en-US">English</option>
        <option value="de-DE">Deutsch</option>
        <option value="fr-FR">Français</option>
        <option value="es-ES">Español</option>
        <option value="ar-AE">العربية</option>
      </select>
    </div>
    
    <ejs-menu 
      #menu
      [items]="menuItems"
      [locale]="currentLocale"
      [enableRtl]="isRtlLocale()">
    </ejs-menu>
  `
})
export class LocalizationComponent {
  public currentLocale: string = 'en-US';
  
  public menuItems: MenuItemModel[] = [
    {
      text: 'File',
      items: [
        { text: 'New' },
        { text: 'Open' },
        { text: 'Save' }
      ]
    },
    {
      text: 'Edit',
      items: [
        { text: 'Cut' },
        { text: 'Copy' },
        { text: 'Paste' }
      ]
    },
    { text: 'Help' }
  ];

  public changeLocale(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.currentLocale = selectElement.value;
  }

  public isRtlLocale(): boolean {
    const rtlLocales = ['ar-AE', 'ar-SA', 'he-IL', 'fa-IR'];
    return rtlLocales.includes(this.currentLocale);
  }
}
```

### Localized Menu Items

Create different menu items for different languages:

```typescript
@Component({
  template: `
    <ejs-menu 
      [items]="getMenuItemsForLocale()"
      [locale]="currentLocale"
      [enableRtl]="isRtlLocale()">
    </ejs-menu>
  `
})
export class LocalizedMenuComponent {
  public currentLocale: string = 'en-US';

  private translations = {
    'en-US': {
      file: 'File',
      edit: 'Edit',
      view: 'View',
      new: 'New',
      open: 'Open',
      save: 'Save',
      cut: 'Cut',
      copy: 'Copy',
      paste: 'Paste'
    },
    'de-DE': {
      file: 'Datei',
      edit: 'Bearbeiten',
      view: 'Ansicht',
      new: 'Neu',
      open: 'Öffnen',
      save: 'Speichern',
      cut: 'Ausschneiden',
      copy: 'Kopieren',
      paste: 'Einfügen'
    },
    'fr-FR': {
      file: 'Fichier',
      edit: 'Édition',
      view: 'Affichage',
      new: 'Nouveau',
      open: 'Ouvrir',
      save: 'Enregistrer',
      cut: 'Couper',
      copy: 'Copier',
      paste: 'Coller'
    },
    'es-ES': {
      file: 'Archivo',
      edit: 'Editar',
      view: 'Ver',
      new: 'Nuevo',
      open: 'Abrir',
      save: 'Guardar',
      cut: 'Cortar',
      copy: 'Copiar',
      paste: 'Pegar'
    }
  };

  public getMenuItemsForLocale(): MenuItemModel[] {
    const t = this.translations[this.currentLocale as keyof typeof this.translations] 
      || this.translations['en-US'];

    return [
      {
        text: t.file,
        items: [
          { text: t.new },
          { text: t.open },
          { text: t.save }
        ]
      },
      {
        text: t.edit,
        items: [
          { text: t.cut },
          { text: t.copy },
          { text: t.paste }
        ]
      },
      { text: t.view }
    ];
  }

  public isRtlLocale(): boolean {
    const rtlLocales = ['ar-AE', 'ar-SA', 'he-IL'];
    return rtlLocales.includes(this.currentLocale);
  }
}
```

### RTL (Right-to-Left) Languages

Automatic RTL support for Arabic, Hebrew, Persian:

```typescript
@Component({
  template: `
    <ejs-menu 
      [items]="menuItems"
      [locale]="'ar-AE'"
      [enableRtl]="true"
      dir="rtl">
    </ejs-menu>
  `,
  styles: [`
    :host {
      direction: rtl;
    }
  `]
})
export class ArabicMenuComponent {
  public menuItems: MenuItemModel[] = [
    {
      text: 'ملف',
      items: [
        { text: 'جديد' },
        { text: 'فتح' },
        { text: 'حفظ' }
      ]
    },
    {
      text: 'تحرير',
      items: [
        { text: 'قص' },
        { text: 'نسخ' },
        { text: 'لصق' }
      ]
    }
  ];
}
```

---

## State Persistence

### enablePersistence Property

Persists menu state (open/closed submenus) to localStorage:

```typescript
@Component({
  template: `
    <ejs-menu 
      [items]="menuItems"
      [enablePersistence]="true">
    </ejs-menu>
  `
})
export class PersistentMenuComponent {
  public menuItems: MenuItemModel[] = [
    // ... menu items
  ];
}
```

**What Gets Persisted:**
- Open/closed state of submenus
- Last selected item
- Scroll position

**Storage Key:** `ej2_<ComponentId>_persist`

### Programmatic State Management

```typescript
@Component({
  template: `
    <button (click)="saveMenuState()">Save State</button>
    <button (click)="restoreMenuState()">Restore State</button>
    <button (click)="clearMenuState()">Clear State</button>
    
    <ejs-menu 
      #menu
      [items]="menuItems"
      [enablePersistence]="enablePersistence">
    </ejs-menu>
  `
})
export class MenuStateComponent {
  @ViewChild('menu')
  public menuObj?: MenuComponent;

  public enablePersistence: boolean = true;

  public menuItems: MenuItemModel[] = [
    // ... menu items
  ];

  public saveMenuState(): void {
    const state = this.getMenuState();
    localStorage.setItem('custom_menu_state', JSON.stringify(state));
    console.log('Menu state saved', state);
  }

  public restoreMenuState(): void {
    const savedState = localStorage.getItem('custom_menu_state');
    if (savedState) {
      const state = JSON.parse(savedState);
      this.applyMenuState(state);
      console.log('Menu state restored', state);
    }
  }

  public clearMenuState(): void {
    localStorage.removeItem('custom_menu_state');
    localStorage.removeItem('ej2_menu_persist');
    console.log('Menu state cleared');
  }

  private getMenuState(): any {
    // Extract menu state (custom implementation)
    return {
      timestamp: new Date().toISOString(),
      locale: 'en-US'
    };
  }

  private applyMenuState(state: any): void {
    // Apply saved state (custom implementation)
    console.log('Applying state:', state);
  }
}
```

---

## HTML Sanitization

### enableHtmlSanitizer Property

Controls sanitization of HTML content to prevent XSS attacks:

```typescript
@Component({
  template: `
    <div>
      <label>
        <input type="checkbox" [checked]="sanitizeHtml" (change)="toggleSanitizer()">
        Enable HTML Sanitizer (Security)
      </label>
    </div>
    
    <ejs-menu 
      [items]="menuItems"
      [enableHtmlSanitizer]="sanitizeHtml">
    </ejs-menu>
  `
})
export class SanitizationComponent {
  public sanitizeHtml: boolean = true;

  public menuItems: MenuItemModel[] = [
    {
      text: 'Safe Content',
      htmlAttributes: {
        title: 'This is <b>safe</b> HTML'
      }
    },
    {
      text: 'With Script',
      htmlAttributes: {
        // Sanitized: script tags removed
        title: 'This will remove <script>alert("xss")</script> tags'
      }
    }
  ];

  public toggleSanitizer(): void {
    this.sanitizeHtml = !this.sanitizeHtml;
  }
}
```

**Security Note:**
- ✅ **Default (true):** Sanitizes suspicious HTML/scripts
- ⚠️ **false:** Allows raw HTML (use only with trusted sources)

### Safe HTML Content

```typescript
// Always safe - plain text
{ text: 'File', items: [...] }

// Safe with properties
{ text: 'Edit', url: '/edit', iconCss: 'e-icons e-edit' }

// Use templates for complex content
@Component({
  template: `
    <ejs-menu [items]="menuItems">
      <ng-template #itemTemplate let-data="data">
        <span [innerHTML]="data.customHtml"></span>
      </ng-template>
    </ejs-menu>
  `
})
```

---

## Hover Delay Control

### hoverDelay Property

Controls millisecond delay before submenu opens on hover:

```typescript
@Component({
  template: `
    <div>
      <label>Hover Delay: {{ hoverDelay }}ms</label>
      <input 
        type="range" 
        min="0" 
        max="1000" 
        step="100"
        [(ngModel)]="hoverDelay"
        (change)="applyHoverDelay()">
    </div>
    
    <ejs-menu 
      #menu
      [items]="menuItems"
      [hoverDelay]="hoverDelay">
    </ejs-menu>
  `
})
export class HoverDelayComponent {
  @ViewChild('menu')
  public menuObj?: MenuComponent;

  public hoverDelay: number = 0;

  public menuItems: MenuItemModel[] = [
    {
      text: 'File',
      items: [
        { text: 'New' },
        { text: 'Open' }
      ]
    }
  ];

  public applyHoverDelay(): void {
    if (this.menuObj) {
      this.menuObj.hoverDelay = this.hoverDelay;
    }
  }
}
```

**Common Values:**
- `0` - Instant (default, faster desktop experience)
- `200` - Quick (200ms delay)
- `300` - Moderate (300ms delay, prevents accidental opens)
- `500` - Slow (500ms delay, more deliberate)

---

## Custom CSS Classes

### cssClass Property

Apply custom CSS classes for extensive styling:

```typescript
@Component({
  template: `
    <ejs-menu 
      [items]="menuItems"
      [cssClass]="'dark-theme gradient-bg custom-menu'">
    </ejs-menu>
  `,
  styles: [`
    :host ::ng-deep .dark-theme.e-menu {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: #ffffff;
    }

    :host ::ng-deep .dark-theme.e-menu-item {
      color: #ffffff;
      transition: all 0.3s ease;
    }

    :host ::ng-deep .dark-theme.e-menu-item:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateX(4px);
    }

    :host ::ng-deep .dark-theme.e-menu-item:active {
      background: rgba(255, 255, 255, 0.2);
    }

    :host ::ng-deep .gradient-bg .e-ul {
      background: linear-gradient(180deg, rgba(26, 26, 46, 0.95), rgba(22, 33, 62, 0.95));
    }

    :host ::ng-deep .custom-menu .e-icons {
      margin-right: 8px;
    }
  `]
})
export class CustomThemeComponent {
  public menuItems: MenuItemModel[] = [
    { text: 'File', iconCss: 'e-icons e-file' },
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Help', iconCss: 'e-icons e-help' }
  ];
}
```

---

## Advanced Configuration Patterns

### Complete Advanced Setup

```typescript
@Component({
  imports: [MenuModule, CommonModule],
  standalone: true,
  selector: 'app-advanced-menu',
  template: `
    <div class="menu-config">
      <div class="config-panel">
        <h3>Configuration</h3>
        
        <label>
          Locale:
          <select [(ngModel)]="locale" (change)="applyConfig()">
            <option value="en-US">English</option>
            <option value="de-DE">Deutsch</option>
            <option value="ar-AE">العربية</option>
          </select>
        </label>

        <label>
          <input type="checkbox" [(ngModel)]="enableRtl" (change)="applyConfig()">
          Enable RTL
        </label>

        <label>
          <input type="checkbox" [(ngModel)]="enablePersistence" (change)="applyConfig()">
          Enable Persistence
        </label>

        <label>
          <input type="checkbox" [(ngModel)]="enableSanitizer" (change)="applyConfig()">
          Enable HTML Sanitizer
        </label>

        <label>
          Hover Delay: {{ hoverDelay }}ms
          <input 
            type="range" 
            min="0" 
            max="1000" 
            step="100"
            [(ngModel)]="hoverDelay"
            (change)="applyConfig()">
        </label>

        <label>
          CSS Theme:
          <select [(ngModel)]="selectedTheme" (change)="applyConfig()">
            <option value="light-theme">Light</option>
            <option value="dark-theme">Dark</option>
            <option value="material-theme">Material</option>
          </select>
        </label>
      </div>

      <ejs-menu 
        #menu
        [items]="menuItems"
        [locale]="locale"
        [enableRtl]="enableRtl"
        [enablePersistence]="enablePersistence"
        [enableHtmlSanitizer]="enableSanitizer"
        [hoverDelay]="hoverDelay"
        [cssClass]="selectedTheme">
      </ejs-menu>
    </div>
  `,
  styles: [`
    :host ::ng-deep .menu-config {
      display: flex;
      gap: 2rem;
    }

    :host ::ng-deep .config-panel {
      flex: 1;
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 4px;
    }

    :host ::ng-deep .config-panel label {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
      font-weight: 500;
    }

    :host ::ng-deep .config-panel input,
    :host ::ng-deep .config-panel select {
      margin-top: 0.5rem;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    :host ::ng-deep .dark-theme.e-menu {
      background: #2c3e50;
      color: white;
    }

    :host ::ng-deep .material-theme.e-menu {
      background: #e8eaf6;
      border: 1px solid #5e35b1;
    }
  `]
})
export class AdvancedMenuComponent {
  @ViewChild('menu')
  public menuObj?: MenuComponent;

  public locale: string = 'en-US';
  public enableRtl: boolean = false;
  public enablePersistence: boolean = true;
  public enableSanitizer: boolean = true;
  public hoverDelay: number = 0;
  public selectedTheme: string = 'light-theme';

  public menuItems: MenuItemModel[] = [
    { text: 'File', items: [
      { text: 'New' },
      { text: 'Open' },
      { text: 'Save' }
    ]},
    { text: 'Edit', items: [
      { text: 'Cut' },
      { text: 'Copy' },
      { text: 'Paste' }
    ]},
    { text: 'Help' }
  ];

  public applyConfig(): void {
    console.log('Configuration applied');
    console.log({
      locale: this.locale,
      rtl: this.enableRtl,
      persistence: this.enablePersistence,
      sanitizer: this.enableSanitizer,
      hoverDelay: this.hoverDelay,
      theme: this.selectedTheme
    });
  }
}
```

---

**Next:** Explore comprehensive API documentation in [references/api-reference.md](api-reference.md) for all properties, methods, and events.

