# Globalization & Localization

## Table of Contents
- [Locale Configuration](#locale-configuration)
- [Supported Locales](#supported-locales)
- [Date Format Localization](#date-format-localization)
- [RTL Support](#rtl-support)
- [Custom Localization](#custom-localization)
- [Timezone Handling](#timezone-handling)
- [Translation Examples](#translation-examples)

## Locale Configuration

### Setting Locale Property

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 31);
  
  // Set locale for date formatting and labels
  locale: string = 'en-US';  // Default US English
  
  // Change locale dynamically
  onLocaleChange(newLocale: string): void {
    this.locale = newLocale;
  }
}
```

```html
<div>
  <label for="locale-select">Select Language:</label>
  <select id="locale-select" (change)="onLocaleChange($event.target.value)">
    <option value="en-US">English (US)</option>
    <option value="en-GB">English (UK)</option>
    <option value="de-DE">German</option>
    <option value="fr-FR">French</option>
    <option value="es-ES">Spanish</option>
    <option value="it-IT">Italian</option>
    <option value="ja-JP">Japanese</option>
    <option value="zh-CN">Chinese (Simplified)</option>
    <option value="ar-SA">Arabic</option>
  </select>
  
  <ejs-daterangepicker 
    [startDate]="startDate"
    [endDate]="endDate"
    [locale]="locale"
    placeholder="Select date range">
  </ejs-daterangepicker>
</div>
```

## Supported Locales

### Common Locale Codes

| Locale Code | Language | Region | Format |
|------------|----------|--------|--------|
| `en-US` | English | United States | MM/DD/YYYY |
| `en-GB` | English | United Kingdom | DD/MM/YYYY |
| `de-DE` | German | Germany | DD.MM.YYYY |
| `fr-FR` | French | France | DD/MM/YYYY |
| `es-ES` | Spanish | Spain | DD/MM/YYYY |
| `it-IT` | Italian | Italy | DD/MM/YYYY |
| `pt-BR` | Portuguese | Brazil | DD/MM/YYYY |
| `ru-RU` | Russian | Russia | DD.MM.YYYY |
| `ja-JP` | Japanese | Japan | YYYY/MM/DD |
| `zh-CN` | Chinese | China | YYYY/MM/DD |
| `ar-SA` | Arabic | Saudi Arabia | DD/MM/YYYY |
| `he-IL` | Hebrew | Israel | DD/MM/YYYY |
| `th-TH` | Thai | Thailand | DD/MM/YYYY |

### Business Locales Example

```typescript
export class AppComponent {
  supportedLocales = [
    { code: 'en-US', name: 'English (US)', format: 'MM/DD/YYYY' },
    { code: 'en-GB', name: 'English (UK)', format: 'DD/MM/YYYY' },
    { code: 'de-DE', name: 'German', format: 'DD.MM.YYYY' },
    { code: 'fr-FR', name: 'French', format: 'DD/MM/YYYY' },
    { code: 'es-ES', name: 'Spanish', format: 'DD/MM/YYYY' },
    { code: 'ja-JP', name: '日本語', format: 'YYYY/MM/DD' },
    { code: 'zh-CN', name: '中文', format: 'YYYY-MM-DD' },
    { code: 'ar-SA', name: 'العربية', format: 'DD/MM/YYYY' }
  ];
  
  currentLocale: string = 'en-US';
  
  selectLocale(locale: string): void {
    this.currentLocale = locale;
  }
  
  get currentLocaleInfo(): any {
    return this.supportedLocales.find(l => l.code === this.currentLocale);
  }
}
```

## Date Format Localization

### Automatic Locale-Based Formatting

```typescript
export class AppComponent {
  startDate: Date = new Date(2026, 2, 15);  // March 15, 2026
  endDate: Date = new Date(2026, 3, 15);    // April 15, 2026
  
  locale: string = 'en-US';
  
  // Dates are automatically formatted based on locale:
  // en-US: 03/15/2026 to 04/15/2026
  // en-GB: 15/03/2026 to 15/04/2026
  // de-DE: 15.03.2026 to 15.04.2026
  // ja-JP: 2026/03/15 to 2026/04/15
}
```

### Day Header Formats

```typescript
export class AppComponent {
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 31);
  locale: string = 'en-US';
  
  // Day header format options
  dayHeaderFormats = ['Short', 'Narrow', 'Abbreviated', 'Wide'];
  selectedFormat: string = 'Short';
}
```

```html
<div>
  <label>Day Header Format:</label>
  <select [(ngModel)]="selectedFormat">
    <option value="Short">Short (S, M, T...)</option>
    <option value="Narrow">Narrow (S, M, T...)</option>
    <option value="Abbreviated">Abbreviated (Sun, Mon...)</option>
    <option value="Wide">Wide (Sunday, Monday...)</option>
  </select>
  
  <ejs-daterangepicker 
    [startDate]="startDate"
    [endDate]="endDate"
    [locale]="locale"
    [dayHeaderFormat]="selectedFormat">
  </ejs-daterangepicker>
</div>
```

## RTL Support

### Enable Right-to-Left Layout

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 31);
  
  locale: string = 'ar-SA';  // Arabic locale
  enableRtl: boolean = true;
  
  // RTL languages: Arabic, Hebrew, Urdu, Persian, etc.
  rtlLocales = ['ar-SA', 'ar-AE', 'he-IL', 'ur-PK', 'fa-IR'];
  
  onLocaleChange(locale: string): void {
    this.locale = locale;
    // Enable RTL for RTL languages
    this.enableRtl = this.rtlLocales.includes(locale);
  }
}
```

```html
<div [dir]="enableRtl ? 'rtl' : 'ltr'">
  <label>Select Language:</label>
  <select (change)="onLocaleChange($event.target.value)">
    <option value="en-US">English</option>
    <option value="ar-SA">العربية</option>
    <option value="he-IL">עברית</option>
    <option value="de-DE">Deutsch</option>
    <option value="fr-FR">Français</option>
  </select>
  
  <ejs-daterangepicker 
    [startDate]="startDate"
    [endDate]="endDate"
    [locale]="locale"
    [enableRtl]="enableRtl"
    placeholder="Select date range">
  </ejs-daterangepicker>
</div>
```

```css
/* RTL-specific styling */
:host ::ng-deep .e-daterangepicker[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

:host ::ng-deep .e-daterangepicker[dir="rtl"] .e-input {
  direction: rtl;
  text-align: right;
}
```

## Custom Localization

### Define Custom Locale Strings

```typescript
import { Component } from '@angular/core';
import { loadCldr } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 31);
  
  locale: string = 'en-US';
  
  // Custom locale strings
  customStrings: any = {
    'en-US': {
      'today': 'Today',
      'apply': 'Apply',
      'cancel': 'Cancel',
      'clear': 'Clear',
      'startLabel': 'Start Date',
      'endLabel': 'End Date'
    },
    'de-DE': {
      'today': 'Heute',
      'apply': 'Anwenden',
      'cancel': 'Abbrechen',
      'clear': 'Löschen',
      'startLabel': 'Startdatum',
      'endLabel': 'Enddatum'
    },
    'fr-FR': {
      'today': "Aujourd'hui",
      'apply': 'Appliquer',
      'cancel': 'Annuler',
      'clear': 'Effacer',
      'startLabel': 'Date de début',
      'endLabel': 'Date de fin'
    }
  };
}
```

### Custom Month and Day Names

```typescript
export class AppComponent {
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 31);
  
  locale: string = 'custom';
  
  // Custom date format with month/day names
  customDateNames = {
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthNames: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };
}
```

## Timezone Handling

### Server Timezone Offset

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 31);
  
  // Set timezone offset if communicating with server
  // This represents server timezone offset in minutes
  serverTimezoneOffset: number = 0;  // UTC
  
  onServerTimezoneChange(timezone: string): void {
    const offsets: any = {
      'UTC': 0,
      'EST': -5 * 60,      // Eastern Standard Time
      'CST': -6 * 60,      // Central Standard Time
      'MST': -7 * 60,      // Mountain Standard Time
      'PST': -8 * 60,      // Pacific Standard Time
      'CET': 1 * 60,       // Central European Time
      'IST': 5.5 * 60,     // Indian Standard Time
      'JST': 9 * 60        // Japan Standard Time
    };
    
    this.serverTimezoneOffset = offsets[timezone] || 0;
  }
}
```

```html
<div>
  <label>Server Timezone:</label>
  <select (change)="onServerTimezoneChange($event.target.value)">
    <option value="UTC">UTC (±0:00)</option>
    <option value="EST">EST (-5:00)</option>
    <option value="CST">CST (-6:00)</option>
    <option value="PST">PST (-8:00)</option>
    <option value="CET">CET (+1:00)</option>
    <option value="IST">IST (+5:30)</option>
    <option value="JST">JST (+9:00)</option>
  </select>
  
  <ejs-daterangepicker 
    [startDate]="startDate"
    [endDate]="endDate"
    [serverTimezoneOffset]="serverTimezoneOffset">
  </ejs-daterangepicker>
</div>
```

## Translation Examples

### Multi-Language UI with DateRangePicker

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-multilingual',
  templateUrl: './app.component.html'
})
export class MultilingualComponent {
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 31);
  
  language: string = 'en';
  
  translations: any = {
    en: {
      title: 'Select Travel Dates',
      placeholder: 'Choose your travel period',
      startLabel: 'Check-in Date',
      endLabel: 'Check-out Date',
      apply: 'Book Now'
    },
    de: {
      title: 'Reisedaten auswählen',
      placeholder: 'Wählen Sie Ihre Reisezeit',
      startLabel: 'Ankunftsdatum',
      endLabel: 'Abreisedatum',
      apply: 'Jetzt buchen'
    },
    fr: {
      title: 'Sélectionner les dates de voyage',
      placeholder: 'Choisissez votre période de voyage',
      startLabel: 'Date d\'arrivée',
      endLabel: 'Date de départ',
      apply: 'Réserver maintenant'
    },
    es: {
      title: 'Seleccionar fechas de viaje',
      placeholder: 'Elija su período de viaje',
      startLabel: 'Fecha de entrada',
      endLabel: 'Fecha de salida',
      apply: 'Reservar ahora'
    },
    ja: {
      title: '旅行日程を選択',
      placeholder: '旅行期間を選択してください',
      startLabel: 'チェックイン日',
      endLabel: 'チェックアウト日',
      apply: '今すぐ予約'
    }
  };
  
  get currentTranslation(): any {
    return this.translations[this.language];
  }
  
  onLanguageChange(lang: string): void {
    this.language = lang;
  }
}
```

```html
<div>
  <div style="margin-bottom: 20px;">
    <button *ngFor="let lang of ['en', 'de', 'fr', 'es', 'ja']"
            (click)="onLanguageChange(lang)"
            [style.font-weight]="language === lang ? 'bold' : 'normal'">
      {{ language === 'en' ? 'English' : language === 'de' ? 'Deutsch' : 
         language === 'fr' ? 'Français' : language === 'es' ? 'Español' : '日本語' }}
    </button>
  </div>
  
  <div>
    <h3>{{ currentTranslation.title }}</h3>
    
    <ejs-daterangepicker 
      [startDate]="startDate"
      [endDate]="endDate"
      [placeholder]="currentTranslation.placeholder"
      [locale]="language + '-' + language.toUpperCase()">
    </ejs-daterangepicker>
    
    <button style="margin-top: 10px; padding: 8px 16px;">
      {{ currentTranslation.apply }}
    </button>
  </div>
</div>
```

---

**Next Step:** For complete API reference, read [api-reference.md](api-reference.md).
