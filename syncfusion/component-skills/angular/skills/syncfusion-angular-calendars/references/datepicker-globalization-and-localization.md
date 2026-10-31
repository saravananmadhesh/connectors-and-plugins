# Globalization and Localization

## Table of Contents
- [Overview](#overview)
- [CLDR Data Loading](#cldr-data-loading)
- [Culture-Specific Formatting](#culture-specific-formatting)
- [Locale Configuration](#locale-configuration)
- [Week Data and First Day](#week-data-and-first-day)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [Multi-Language Examples](#multi-language-examples)
- [Timezone-Aware Date Handling](#timezone-aware-date-handling)
- [Troubleshooting](#troubleshooting)

## Overview

Globalization combines internationalization (i18n) and localization (l10n):

- **Internationalization (i18n):** Support for multiple cultures/languages (technical framework)
- **Localization (l10n):** Adapt content for specific culture (day names, month names, today button text)

DatePicker supports 100+ cultures with CLDR (Unicode Common Locale Data Repository) data.

**Key elements:**
- Date formats (MM/dd/yyyy vs dd/MM/yyyy vs yyyy-MM-dd)
- Month/day names in local language
- Week start day (Sunday vs Monday)
- RTL text direction (Arabic, Hebrew, Persian)
- First/last day of week for calendar display

## CLDR Data Loading

CLDR (Common Locale Data Repository) contains locale-specific formatting information.

### Install CLDR Data

```bash
npm install cldr-data
```

### Load CLDR for Single Culture

```typescript
import { Component } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { loadCldr } from '@syncfusion/ej2-base';

declare var require: any;

@Component({
  selector: 'app-german-datepicker',
  standalone: true,
  imports: [DatePickerModule],
  template: `
    <ejs-datepicker
      locale="de-DE"
      placeholder="Datum wählen">
    </ejs-datepicker>
  `
})
export class GermanDatePickerComponent {
  constructor() {
    // Load German CLDR data
    loadCldr(
      require('cldr-data/main/de/numbers.json'),
      require('cldr-data/main/de/ca-gregorian.json'),
      require('cldr-data/supplemental/numberingSystems.json'),
      require('cldr-data/supplemental/weekdata.json')
    );
  }
}
```

**Result:** DatePicker displays in German (day names, month names, format: dd.MM.yyyy)

### Load CLDR for Multiple Cultures

```typescript
import { Component } from '@angular/core';
import { loadCldr } from '@syncfusion/ej2-base';

declare var require: any;

@Component({
  selector: 'app-multilingual',
  standalone: true,
  template: `
    <div>
      <label>Choose Language:</label>
      <select [(ngModel)]="selectedLocale" (change)="onLocaleChange()">
        <option value="en-US">English (US)</option>
        <option value="de-DE">German</option>
        <option value="fr-FR">French</option>
        <option value="es-ES">Spanish</option>
        <option value="ja-JP">Japanese</option>
      </select>
      
      <ejs-datepicker
        [locale]="selectedLocale"
        placeholder="Select date">
      </ejs-datepicker>
    </div>
  `
})
export class MultilingualComponent {
  selectedLocale = 'en-US';

  constructor() {
    // Load all required cultures at startup
    loadCldr(
      // English
      require('cldr-data/main/en/numbers.json'),
      require('cldr-data/main/en/ca-gregorian.json'),
      // German
      require('cldr-data/main/de/numbers.json'),
      require('cldr-data/main/de/ca-gregorian.json'),
      // French
      require('cldr-data/main/fr/numbers.json'),
      require('cldr-data/main/fr/ca-gregorian.json'),
      // Spanish
      require('cldr-data/main/es/numbers.json'),
      require('cldr-data/main/es/ca-gregorian.json'),
      // Japanese
      require('cldr-data/main/ja/numbers.json'),
      require('cldr-data/main/ja/ca-gregorian.json'),
      // Shared
      require('cldr-data/supplemental/numberingSystems.json'),
      require('cldr-data/supplemental/weekdata.json')
    );
  }

  onLocaleChange() {
    console.log('Locale changed to:', this.selectedLocale);
  }
}
```

**Result:** Users can switch languages, dates format according to selected culture

## Culture-Specific Formatting

Different cultures format dates differently:

### Default Formats by Culture

```typescript
// Automatically applied based on locale property

@Component({
  template: `
    <div>
      <ejs-datepicker locale="en-US"></ejs-datepicker> <!-- MM/dd/yyyy -->
      <ejs-datepicker locale="en-GB"></ejs-datepicker> <!-- dd/MM/yyyy -->
      <ejs-datepicker locale="de-DE"></ejs-datepicker> <!-- dd.MM.yyyy -->
      <ejs-datepicker locale="fr-FR"></ejs-datepicker> <!-- dd/MM/yyyy -->
      <ejs-datepicker locale="ja-JP"></ejs-datepicker> <!-- yyyy/MM/dd -->
      <ejs-datepicker locale="ar-AE"></ejs-datepicker> <!-- dd/MM/yyyy (RTL) -->
    </div>
  `
})
export class CultureFormatsComponent {}
```

### Example: Format Variations

```
Date: March 15, 2024

Culture    | Format       | Output
-----------|--------------|------------------
en-US      | MM/dd/yyyy   | 03/15/2024
en-GB      | dd/MM/yyyy   | 15/03/2024
de-DE      | dd.MM.yyyy   | 15.03.2024
fr-FR      | dd/MM/yyyy   | 15/03/2024
ja-JP      | yyyy/MM/dd   | 2024/03/15
zh-CN      | yyyy/MM/dd   | 2024/03/15
ko-KR      | yyyy. MM. dd | 2024. 03. 15
ar-AE      | dd/MM/yyyy   | 15/03/2024 (RTL)
```

### Custom Format Override

```typescript
@Component({
  template: `
    <ejs-datepicker
      locale="de-DE"
      format="yyyy-MM-dd"
      placeholder="yyyy-MM-dd">
    </ejs-datepicker>
  `
})
export class CustomFormatComponent {}
```

**Result:** German locale but ISO format (yyyy-MM-dd) instead of default dd.MM.yyyy

## Locale Configuration

Set locale using `locale` property:

### Single Locale

```typescript
@Component({
  template: `
    <ejs-datepicker
      locale="fr-FR"
      placeholder="Sélectionner une date">
    </ejs-datepicker>
  `
})
export class FrenchDatePickerComponent {}
```

**Result:** French locale - month names, day names in French

### Dynamic Locale Switching

```typescript
import { Component } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-locale-switcher',
  standalone: true,
  imports: [DatePickerModule, FormsModule],
  template: `
    <div>
      <label for="localeSelect">Language:</label>
      <select 
        id="localeSelect"
        [(ngModel)]="currentLocale"
        (change)="onLocaleChange()">
        <option value="en-US">English (US)</option>
        <option value="en-GB">English (UK)</option>
        <option value="de-DE">Deutsch</option>
        <option value="es-ES">Español</option>
      </select>
      
      <ejs-datepicker
        [locale]="currentLocale"
        [(ngModel)]="selectedDate">
      </ejs-datepicker>
      
      <p *ngIf="selectedDate">
        Selected: {{ selectedDate | date:'fullDate' }}
      </p>
    </div>
  `
})
export class LocaleSwitcherComponent {
  currentLocale = 'en-US';
  selectedDate: Date | null = null;

  onLocaleChange() {
    console.log('Locale changed to:', this.currentLocale);
  }
}
```

## Week Data and First Day

Different cultures start the week on different days:

### Default First Day by Culture

```typescript
// Monday first (most of world):
loadCldr(require('cldr-data/supplemental/weekdata.json'));

// en-GB: Monday
// de-DE: Monday
// fr-FR: Monday
// ja-JP: Sunday (same as en-US)
// ar-AE: Saturday

@Component({
  template: `
    <ejs-datepicker locale="de-DE"></ejs-datepicker> <!-- Monday first -->
    <ejs-datepicker locale="ja-JP"></ejs-datepicker> <!-- Sunday first -->
    <ejs-datepicker locale="ar-AE"></ejs-datepicker> <!-- Saturday first -->
  `
})
export class WeekDataComponent {}
```

### Complete Globalization Setup with Week Data

```typescript
import { Component } from '@angular/core';
import { loadCldr } from '@syncfusion/ej2-base';

declare var require: any;

@Component({
  selector: 'app-complete-globalization',
  standalone: true,
  template: `
    <ejs-datepicker locale="de-DE"></ejs-datepicker>
  `
})
export class CompleteGlobalizationComponent {
  constructor() {
    loadCldr(
      require('cldr-data/main/de/numbers.json'),
      require('cldr-data/main/de/ca-gregorian.json'),
      require('cldr-data/supplemental/numberingSystems.json'),
      require('cldr-data/supplemental/weekdata.json')  // ← Essential for correct first day
    );
  }
}
```

## Right-to-Left (RTL) Support

For RTL languages (Arabic, Hebrew, Persian):

### Enable RTL

```typescript
import { Component } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { loadCldr } from '@syncfusion/ej2-base';

declare var require: any;

@Component({
  selector: 'app-rtl-datepicker',
  standalone: true,
  imports: [DatePickerModule],
  host: { '[attr.dir]': '"rtl"' },  // Set RTL direction
  template: `
    <ejs-datepicker
      locale="ar-AE"
      placeholder="اختر التاريخ">
    </ejs-datepicker>
  `
})
export class RTLDatePickerComponent {
  constructor() {
    loadCldr(
      require('cldr-data/main/ar/numbers.json'),
      require('cldr-data/main/ar/ca-gregorian.json'),
      require('cldr-data/supplemental/numberingSystems.json'),
      require('cldr-data/supplemental/weekdata.json')
    );
  }
}
```

**Result:** 
- DatePicker displays in Arabic
- Text flows right-to-left
- Calendar layout mirrored

### Testing RTL

```typescript
// Add dir="rtl" to HTML element
<html dir="rtl">
  <!-- DatePicker will auto-detect and mirror -->
</html>

// Or in component:
@Component({
  host: { '[attr.dir]': '"rtl"' },
  template: `<ejs-datepicker locale="ar-AE"></ejs-datepicker>`
})
export class ArabicComponent {}
```

## Multi-Language Examples

### Example 1: Language Selection Dropdown

```typescript
import { Component } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { loadCldr } from '@syncfusion/ej2-base';
import { L10n } from '@syncfusion/ej2-base';

declare var require: any;

@Component({
  selector: 'app-multi-language',
  standalone: true,
  imports: [DatePickerModule, FormsModule, CommonModule],
  template: `
    <div>
      <select [(ngModel)]="selectedLanguage" (change)="onLanguageChange()">
        <option value="en">English</option>
        <option value="de">Deutsch</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
        <option value="ja">日本語</option>
        <option value="ar">العربية</option>
      </select>
      
      <ejs-datepicker
        [(ngModel)]="selectedDate"
        [locale]="getLocaleCode()"
        [attr.dir]="isRTL() ? 'rtl' : 'ltr'">
      </ejs-datepicker>
      
      <p>Selected: {{ selectedDate | date:'fullDate' }}</p>
    </div>
  `
})
export class MultiLanguageComponent {
  selectedLanguage = 'en';
  selectedDate: Date | null = null;

  constructor() {
    this.loadAllLanguages();
  }

  loadAllLanguages() {
    const languages = ['en', 'de', 'fr', 'es', 'ja', 'ar'];
    languages.forEach(lang => {
      loadCldr(
        require(`cldr-data/main/${this.getLangCode(lang)}/numbers.json`),
        require(`cldr-data/main/${this.getLangCode(lang)}/ca-gregorian.json`)
      );
    });
    loadCldr(
      require('cldr-data/supplemental/numberingSystems.json'),
      require('cldr-data/supplemental/weekdata.json')
    );
  }

  getLocaleCode(): string {
    const locales: {[key: string]: string} = {
      'en': 'en-US',
      'de': 'de-DE',
      'fr': 'fr-FR',
      'es': 'es-ES',
      'ja': 'ja-JP',
      'ar': 'ar-AE'
    };
    return locales[this.selectedLanguage] || 'en-US';
  }

  getLangCode(lang: string): string {
    const codes: {[key: string]: string} = {
      'en': 'en',
      'de': 'de',
      'fr': 'fr',
      'es': 'es',
      'ja': 'ja',
      'ar': 'ar'
    };
    return codes[lang] || 'en';
  }

  isRTL(): boolean {
    return this.selectedLanguage === 'ar';
  }

  onLanguageChange() {
    console.log('Language changed to:', this.selectedLanguage);
  }
}
```

### Example 2: Browser Locale Auto-Detection

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auto-locale',
  standalone: true,
  template: `
    <ejs-datepicker
      [locale]="browserLocale"
      placeholder="Select date">
    </ejs-datepicker>
  `
})
export class AutoLocaleComponent implements OnInit {
  browserLocale = 'en-US';

  ngOnInit() {
    // Detect browser language
    const browserLang = navigator.language; // e.g., "de-DE", "fr-FR"
    this.browserLocale = browserLang;
  }
}
```

## Timezone-Aware Date Handling

DatePicker uses browser timezone. For server-side handling:

### Timezone Considerations

```typescript
@Component({
  selector: 'app-timezone-aware',
  standalone: true,
  imports: [DatePickerModule, FormsModule],
  template: `
    <ejs-datepicker
      [(ngModel)]="selectedDate"
      (change)="onDateChange($event)">
    </ejs-datepicker>
    <p>Browser timezone: {{ browserTimezone }}</p>
    <p>ISO string: {{ selectedDate | date:'yyyy-MM-ddTHH:mm:ssZ' }}</p>
  `
})
export class TimezoneAwareComponent {
  selectedDate: Date | null = null;
  browserTimezone: string;

  constructor() {
    // Get browser timezone
    this.browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  onDateChange(event: any) {
    if (event.value) {
      // Convert to ISO string for server transmission
      const isoString = event.value.toISOString();
      console.log('Date in ISO format:', isoString);
      
      // Server can parse and convert to its timezone
    }
  }
}
```

### Server-Side Timezone Handling

```typescript
// When sending date to server, use ISO format:
const date = new Date(2024, 2, 15); // March 15, 2024 (local browser time)
const isoString = date.toISOString(); // "2024-03-15T00:00:00.000Z" (UTC)

// Server receives ISO string and converts to its timezone:
// ISO: 2024-03-15T00:00:00Z
// Server timezone: Europe/Berlin (UTC+1)
// Local server time: 2024-03-15T01:00:00+01:00
```

## Troubleshooting

### Issue: Locale not changing

**Problem:** Changing `locale` property doesn't update calendar display

**Solution:** Ensure CLDR data is loaded before setting locale:

```typescript
constructor() {
  loadCldr(
    require('cldr-data/main/de/numbers.json'),
    require('cldr-data/main/de/ca-gregorian.json'),
    require('cldr-data/supplemental/weekdata.json')
  );
}

// Then locale change works:
selectedLocale = 'de-DE';  // ✓ Works now
```

### Issue: Month names still in English

**Problem:** DatePicker displays but day/month names are in English

**Solution:** Load L10n (localization) data:

```typescript
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
  'de': {
    'datepicker': {
      'placeholder': 'Datum auswählen',
      'today': 'Heute'
    }
  }
});
```

### Issue: RTL layout not mirroring

**Problem:** Arabic DatePicker doesn't mirror layout

**Solution:** Set `dir="rtl"` on HTML or component:

```typescript
@Component({
  host: { '[attr.dir]': '"rtl"' },
  template: `<ejs-datepicker locale="ar-AE"></ejs-datepicker>`
})
export class ArabicComponent {}
```

### Issue: Week starts on wrong day

**Problem:** Calendar shows Sunday as first day for German locale

**Solution:** Load week data CLDR file:

```typescript
loadCldr(
  require('cldr-data/supplemental/weekdata.json')  // ← This is required
);
```

---

**Related References:**
- [Getting Started](getting-started.md)
- [Date Formats and Parsing](date-formats-and-parsing.md)
- [Accessibility and Forms](accessibility-and-forms.md)
