# Localization in Angular Maps

Master internationalization and localization in Syncfusion Angular Maps to create globally accessible geographic visualizations. This guide covers translating UI text, formatting numbers, dates, and currencies, and implementing RTL support.

## Overview

Localization enables Maps to display content in different languages and cultural formats, making applications accessible to international users. The Maps component supports localization for zoom toolbar text, tooltips, data labels, and number/date formatting.

---

## Localizing Zoom Toolbar Text

Translate toolbar button labels into different languages using the L10n library.

### Basic Localization Setup

```typescript
import { Component, OnInit } from '@angular/core';
import { MapsModule, ZoomService } from '@syncfusion/ej2-angular-maps';
import { L10n, setCulture } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [ZoomService],
  template: `
    <ejs-maps [zoomSettings]="zoomSettings">
      <e-layers>
        <e-layer [shapeData]="worldMap"></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent implements OnInit {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  
  public zoomSettings: object = {
    enable: true,
    toolbarSettings: {
      buttonSettings: {
        toolbarItems: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset']
      }
    }
  };
  
  ngOnInit(): void {
    // Set locale to German
    setCulture('de');
    
    // Load German translations
    L10n.load({
      'de': {
        'maps': {
          'Zoom': 'Zoomen',
          'ZoomIn': 'Hineinzoomen',
          'ZoomOut': 'Herauszoomen',
          'Reset': 'Zurücksetzen',
          'Pan': 'Schwenken'
        }
      }
    });
  }
}
```

### Supported Locale Keys

**Toolbar Localizable Text:**

| Locale Key | Default English Text |
|------------|---------------------|
| `Zoom` | Zoom |
| `ZoomIn` | Zoom In |
| `ZoomOut` | Zoom Out |
| `Reset` | Reset |
| `Pan` | Pan |

### Multiple Language Support

Implement language switching:

```typescript
export class MultiLanguageMapComponent {
  private translations = {
    'en': {
      'maps': {
        'Zoom': 'Zoom',
        'ZoomIn': 'Zoom In',
        'ZoomOut': 'Zoom Out',
        'Reset': 'Reset',
        'Pan': 'Pan'
      }
    },
    'es': {
      'maps': {
        'Zoom': 'Acercar',
        'ZoomIn': 'Acercar más',
        'ZoomOut': 'Alejar',
        'Reset': 'Restablecer',
        'Pan': 'Mover'
      }
    },
    'fr': {
      'maps': {
        'Zoom': 'Zoomer',
        'ZoomIn': 'Zoom avant',
        'ZoomOut': 'Zoom arrière',
        'Reset': 'Réinitialiser',
        'Pan': 'Panoramique'
      }
    },
    'de': {
      'maps': {
        'Zoom': 'Zoomen',
        'ZoomIn': 'Hineinzoomen',
        'ZoomOut': 'Herauszoomen',
        'Reset': 'Zurücksetzen',
        'Pan': 'Schwenken'
      }
    },
    'ja': {
      'maps': {
        'Zoom': 'ズーム',
        'ZoomIn': 'ズームイン',
        'ZoomOut': 'ズームアウト',
        'Reset': 'リセット',
        'Pan': 'パン'
      }
    }
  };
  
  public currentLocale: string = 'en';
  
  public changeLanguage(locale: string): void {
    this.currentLocale = locale;
    setCulture(locale);
    L10n.load({ [locale]: this.translations[locale] });
  }
}
```

---

## Number Formatting

Format numbers in tooltips and data labels according to cultural conventions.

### Basic Number Formatting

```typescript
import { Component } from '@angular/core';
import { setCulture, loadCldr } from '@syncfusion/ej2-base';
import * as numberingSystems from 'cldr-data/supplemental/numberingSystems.json';
import * as currencyData from 'cldr-data/supplemental/currencyData.json';
import * as numbers from 'cldr-data/main/de/numbers.json';
import * as currencies from 'cldr-data/main/de/currencies.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [MapsTooltipService],
  template: `
    <ejs-maps 
      [format]="format"
      [useGroupingSeparator]="true">
      <e-layers>
        <e-layer 
          [shapeData]="worldMap"
          [dataSource]="populationData"
          [tooltipSettings]="tooltipSettings">
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent implements OnInit {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  public format: string = 'n';  // Number format
  public useGroupingSeparator: boolean = true;
  
  public populationData: object[] = [
    { name: 'Germany', population: 83240525 },
    { name: 'France', population: 67390000 }
  ];
  
  public tooltipSettings: object = {
    visible: true,
    valuePath: 'population',
    format: 'Population: ${population}'
  };
  
  ngOnInit(): void {
    // Load German number formatting
    setCulture('de');
    loadCldr(numberingSystems, currencyData, numbers, currencies);
  }
}
```

**Format Specifiers:**
- `n` - Number format (83,240,525 in en-US, 83.240.525 in de-DE)
- `c` - Currency format ($83,240,525.00 in en-US, 83.240.525,00 € in de-DE)
- `p` - Percentage format (83.24%)

### Currency Formatting

Display currency values with proper symbols and formatting:

```typescript
export class CurrencyMapComponent implements OnInit {
  public format: string = 'c2';  // Currency with 2 decimal places
  
  public gdpData: object[] = [
    { name: 'United States', gdp: 21427700000000 },
    { name: 'China', gdp: 14342903000000 }
  ];
  
  public tooltipSettings: object = {
    visible: true,
    valuePath: 'gdp',
    format: 'GDP: ${gdp}'
  };
  
  ngOnInit(): void {
    // Set to German locale with Euro currency
    setCulture('de-DE');
    loadCldr(
      require('cldr-data/supplemental/numberingSystems.json'),
      require('cldr-data/supplemental/currencyData.json'),
      require('cldr-data/main/de/numbers.json'),
      require('cldr-data/main/de/currencies.json')
    );
  }
}
```

### Group Separator

Enable thousand separators in numbers:

```typescript
public useGroupingSeparator: boolean = true;

// Results:
// en-US: 1,234,567.89
// de-DE: 1.234.567,89
// fr-FR: 1 234 567,89
```

---

## Data Label Internationalization

Format data labels with localized number representations.

### Localized Data Labels

```typescript
import { Component } from '@angular/core';
import { setCulture } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  template: `
    <ejs-maps 
      [format]="format"
      [useGroupingSeparator]="true">
      <e-layers>
        <e-layer 
          [shapeData]="worldMap"
          [dataSource]="countryData"
          shapePropertyPath="name"
          shapeDataPath="country"
          [dataLabelSettings]="dataLabelSettings">
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent implements OnInit {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  public format: string = 'n0';  // Number format, no decimals
  
  public countryData: object[] = [
    { country: 'United States', population: 331002651 },
    { country: 'India', population: 1380004385 }
  ];
  
  public dataLabelSettings: object = {
    visible: true,
    labelPath: 'population',
    template: '${population}'
  };
  
  ngOnInit(): void {
    // Set locale
    setCulture('hi-IN');  // Hindi (India)
  }
}
```

---

## RTL (Right-to-Left) Support

Maps component supports RTL layouts for languages like Arabic and Hebrew.

### Enable RTL

```typescript
import { Component } from '@angular/core';
import { enableRtl } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <ejs-maps 
      [enableRtl]="true"
      [titleSettings]="titleSettings">
      <e-layers>
        <e-layer [shapeData]="worldMap"></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent implements OnInit {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  public titleSettings: object = {
    text: 'خريطة العالم',  // "World Map" in Arabic
    alignment: 'Center',
    textStyle: {
      fontFamily: 'Arial',
      size: '16px'
    }
  };
  
  ngOnInit(): void {
    // Enable RTL globally
    enableRtl(true);
    
    // Set Arabic culture
    setCulture('ar');
  }
}
```

---

## Best Practices

### Locale Management

1. **Load Only Required Locales**: Don't load all CLDR data; import only needed locales
2. **Cache Locale Data**: Store loaded locale data to avoid repeated loading
3. **Provide Fallbacks**: Always have English as fallback if translation missing
4. **Test All Locales**: Verify formatting works correctly for each supported locale
5. **Use Standard Locale Codes**: Follow BCP 47 language tags (e.g., 'en-US', 'de-DE')

### Number Formatting

1. **Choose Appropriate Precision**: Use sensible decimal places for your data
2. **Enable Grouping**: Always use `useGroupingSeparator` for large numbers
3. **Match User Locale**: Detect and apply user's browser locale automatically
4. **Document Format Codes**: Clearly document which format strings are used where
5. **Test Edge Cases**: Verify very large and very small numbers format correctly

### Translation Quality

1. **Use Native Speakers**: Have translations reviewed by native speakers
2. **Context Matters**: Provide context for translators (UI button vs tooltip)
3. **Check Text Length**: Ensure translations fit in UI space
4. **Maintain Consistency**: Use consistent terminology across all text
5. **Version Translations**: Track translation versions with code versions

---

## Common Patterns

### Auto-Detect User Locale

Automatically detect and apply user's locale:

```typescript
export class AutoLocaleComponent implements OnInit {
  ngOnInit(): void {
    // Get browser locale
    const userLocale = navigator.language || 'en-US';
    
    // Load appropriate locale data
    this.loadLocaleData(userLocale);
    
    // Set culture
    setCulture(userLocale);
    
    // Load translations
    this.loadTranslations(userLocale);
  }
  
  private loadLocaleData(locale: string): void {
    const [language, region] = locale.split('-');
    
    try {
      loadCldr(
        require(`cldr-data/supplemental/numberingSystems.json`),
        require(`cldr-data/supplemental/currencyData.json`),
        require(`cldr-data/main/${language}/numbers.json`),
        require(`cldr-data/main/${language}/currencies.json`)
      );
    } catch (error) {
      console.warn(`Failed to load locale data for ${locale}, falling back to en-US`);
      this.loadLocaleData('en-US');
    }
  }
  
  private loadTranslations(locale: string): void {
    // Load translations for the locale
    // Fallback to English if not available
  }
}
```

### Currency Conversion Display

Show values in different currencies:

```typescript
export class CurrencyConverterComponent {
  private exchangeRates = {
    'USD': 1.0,
    'EUR': 0.85,
    'GBP': 0.73,
    'JPY': 110.0,
    'INR': 74.5
  };
  
  public selectedCurrency: string = 'USD';
  
  public convertValue(value: number): number {
    return value * this.exchangeRates[this.selectedCurrency];
  }
  
  public getTooltipFormat(): string {
    const symbols = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'JPY': '¥',
      'INR': '₹'
    };
    
    return `GDP: ${symbols[this.selectedCurrency]}\${gdp}`;
  }
}
```

### Multilingual Data Labels

Display labels in multiple languages:

```typescript
export class MultilingualLabelsComponent {
  public currentLanguage: string = 'en';
  
  public countryNames = {
    'en': {
      'US': 'United States',
      'DE': 'Germany',
      'FR': 'France'
    },
    'de': {
      'US': 'Vereinigte Staaten',
      'DE': 'Deutschland',
      'FR': 'Frankreich'
    },
    'fr': {
      'US': 'États-Unis',
      'DE': 'Allemagne',
      'FR': 'France'
    }
  };
  
  public getLocalizedName(countryCode: string): string {
    return this.countryNames[this.currentLanguage][countryCode] || countryCode;
  }
  
  public dataLabelSettings: object = {
    visible: true,
    template: (args: any) => {
      const code = args.data['code'];
      return this.getLocalizedName(code);
    }
  };
}
```

---

## Next Steps

- **[Accessibility](./accessibility.md)** - Implement accessible internationalization
- **[Customization](./customization.md)** - Style localized text elements
- **[User Interactions](./user-interactions.md)** - Localize interactive elements
- **[Data Visualization](./data-visualization.md)** - Format visualized data
- **[Advanced Features](./advanced-features.md)** - Export localized maps

For complete API documentation, visit the [Syncfusion Angular Maps API Reference](https://ej2.syncfusion.com/angular/documentation/api/maps/).

---

## API Reference Summary

### Localization APIs

| API | Description | Documentation Link |
|-----|-------------|-------------------|
| `locale` | Localization culture | [locale](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#locale) |
| `enableRtl` | Right-to-left mode | [enableRtl](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#enablertl) |

**For complete API documentation, see:** [api-reference.md](references/api-reference.md)