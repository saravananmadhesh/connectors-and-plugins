# Globalization and Localization

## Table of Contents
- [Localization](#localization)
- [Internationalization (i18n)](#internationalization-i18n)
- [Right-to-Left Support](#right-to-left-support)
- [Currency Formatting](#currency-formatting)
- [Examples](#examples)

---

## Localization

Localization adapts UI text (labels, tooltips) to different languages without changing the component logic.

### Setting Locale

Use the `locale` property to change UI language:

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  template: `
    <ejs-numerictextbox
      value="100"
      locale="de-DE"
      placeholder="German locale">
    </ejs-numerictextbox>
  `
})
export class LocaleComponent {}
```

### Supported Locales

| Locale | Language | Region |
|--------|----------|--------|
| `en-US` | English | United States |
| `en-GB` | English | United Kingdom |
| `de-DE` | German | Germany |
| `fr-FR` | French | France |
| `es-ES` | Spanish | Spain |
| `ja-JP` | Japanese | Japan |
| `zh-CN` | Chinese (Simplified) | China |
| `ar-SA` | Arabic | Saudi Arabia |
| `hi-IN` | Hindi | India |

### Localized Spin Button Tooltips

By default, spin button titles change based on locale:

| Locale | Increment | Decrement |
|--------|-----------|-----------|
| `en-US` | "Increment value" | "Decrement value" |
| `de-DE` | "Wert erhöhen" | "Wert verringern" |
| `fr-FR` | "Augmenter la valeur" | "Diminuer la valeur" |
| `ja-JP` | "値を増やす" | "値を減らす" |

### Loading Localized Strings

Custom translations and localized resources are handled outside the NumericTextBox API (for example via Syncfusion's `L10n` utilities). See the official Syncfusion localization guide for examples on loading translations and resource bundles.

```text
Refer to: https://ej2.syncfusion.com/angular/documentation/localization/
```

---

## Internationalization (i18n)

Internationalization formats numbers, dates, and currencies according to regional conventions.

### Regional Number Formatting

Numeric formatting differs by locale (e.g., `1,234.56` vs `1.234,56`). The NumericTextBox supports the `locale` property to apply culture-specific formatting. For advanced CLDR data loading and environment setup, consult the official Syncfusion localization documentation — CLDR loading and runtime setup are outside the scope of the NumericTextBox component API.

### Regional Number Formatting

Different locales format numbers differently:

```typescript
// English (US): 1,234.56
// German (DE): 1.234,56
// French (FR): 1 234,56
// Arabic (SA): ١٬٢٣٤٫٥٦

@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  template: `
    <div class="locale-demo">
      <div>
        <label>US English</label>
        <ejs-numerictextbox value="1234.56" locale="en-US"></ejs-numerictextbox>
        <!-- Output: 1,234.56 -->
      </div>

      <div>
        <label>German</label>
        <ejs-numerictextbox value="1234.56" locale="de-DE"></ejs-numerictextbox>
        <!-- Output: 1.234,56 -->
      </div>

      <div>
        <label>Arabic</label>
        <ejs-numerictextbox value="1234.56" locale="ar-SA"></ejs-numerictextbox>
        <!-- Output: ١٬٢٣٤٫٥٦ -->
      </div>
    </div>
  `
})
export class LocaleFormattingComponent {}
```

### Currency Formatting by Locale

```typescript
import { loadCldr } from '@syncfusion/ej2-base';

declare var require: any;

// Load currency data for multiple locales
loadCldr(
  require('cldr-data/main/en/currencies.json'),
  require('cldr-data/main/de/currencies.json'),
  require('cldr-data/main/fr/currencies.json'),
  require('cldr-data/supplemental/currencyData.json')
);

@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  template: `
    <div class="currency-locales">
      <div>
        <label>US Dollar (en-US)</label>
        <ejs-numerictextbox
          value="1000"
          locale="en-US"
          format="c2"
          currency="USD">
        </ejs-numerictextbox>
        <!-- Output: $1,000.00 -->
      </div>

      <div>
        <label>Euro (de-DE)</label>
        <ejs-numerictextbox
          value="1000"
          locale="de-DE"
          format="c2"
          currency="EUR">
        </ejs-numerictextbox>
        <!-- Output: 1.000,00€ -->
      </div>

      <div>
        <label>British Pound (en-GB)</label>
        <ejs-numerictextbox
          value="1000"
          locale="en-GB"
          format="c2"
          currency="GBP">
        </ejs-numerictextbox>
        <!-- Output: £1,000.00 -->
      </div>
    </div>
  `
})
export class CurrencyLocalesComponent {}
```

---

## Right-to-Left Support

Enable RTL mode for languages written right-to-left (Arabic, Hebrew, Persian, Urdu):

### Enable RTL

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  template: `
    <ejs-numerictextbox
      value="100"
      locale="ar-SA"
      [enableRtl]="true"
      placeholder="أدخل القيمة">
    </ejs-numerictextbox>
  `,
  host: { dir: 'rtl' }  // Set document direction
})
export class ArabicComponent {}
```

### RTL with CSS

```css
/* Global RTL mode */
:host-context([dir="rtl"]) .e-numeric {
  direction: rtl;
  text-align: right;
}

/* Component-specific RTL */
.e-numeric[dir="rtl"] {
  direction: rtl;
}
```

### RTL Currency Example

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  template: `
    <div [dir]="direction">
      <label>السعر</label>
      <ejs-numerictextbox
        value="500"
        locale="ar-SA"
        format="c2"
        currency="SAR"
        [enableRtl]="true">
      </ejs-numerictextbox>
    </div>
  `,
  styles: [`
    :host {
      direction: rtl;
      text-align: right;
    }
  `]
})
export class ArabicCurrencyComponent {
  direction = 'rtl';
}
```

---

## Currency Formatting

### Specifying Currency

```typescript
<!-- US Dollar -->
<ejs-numerictextbox
  value="1000"
  format="c2"
  currency="USD"
  locale="en-US">
</ejs-numerictextbox>

<!-- Euro -->
<ejs-numerictextbox
  value="1000"
  format="c2"
  currency="EUR"
  locale="de-DE">
</ejs-numerictextbox>

<!-- Japanese Yen (no decimals) -->
<ejs-numerictextbox
  value="100000"
  format="c0"
  currency="JPY"
  locale="ja-JP">
</ejs-numerictextbox>
```

### Multi-Currency Selection

```typescript
@Component({
  imports: [NumericTextBoxModule, CommonModule, FormsModule],
  standalone: true,
  template: `
    <div class="currency-selector">
      <label>Amount</label>
      <ejs-numerictextbox
        [(ngModel)]="amount"
        format="c2"
        [currency]="selectedCurrency"
        min="0">
      </ejs-numerictextbox>

      <label>Currency</label>
      <select [(ngModel)]="selectedCurrency" (change)="onCurrencyChange()">
        <option value="USD">US Dollar</option>
        <option value="EUR">Euro</option>
        <option value="GBP">British Pound</option>
        <option value="JPY">Japanese Yen</option>
      </select>

      <p>Selected: {{ amount | currency:selectedCurrency }}</p>
    </div>
  `
})
export class MultiCurrencyComponent {
  amount: number = 100;
  selectedCurrency: string = 'USD';

  onCurrencyChange() {
    // Handle currency change
  }
}
```

---

## Examples

### Multi-Language Form

```typescript
@Component({
  imports: [NumericTextBoxModule, CommonModule, FormsModule],
  standalone: true,
  selector: 'app-multilang-form',
  template: `
    <div class="language-selector">
      <button *ngFor="let lang of languages"
              [class.active]="currentLanguage === lang.code"
              (click)="setLanguage(lang.code)">
        {{ lang.name }}
      </button>
    </div>

    <form [dir]="isRTL ? 'rtl' : 'ltr'">
      <label>{{ labels[currentLanguage].quantity }}</label>
      <ejs-numerictextbox
        [(ngModel)]="quantity"
        [locale]="currentLanguage"
        [enableRtl]="isRTL"
        min="1"
        max="999">
      </ejs-numerictextbox>

      <label>{{ labels[currentLanguage].price }}</label>
      <ejs-numerictextbox
        [(ngModel)]="price"
        format="c2"
        [locale]="currentLanguage"
        [enableRtl]="isRTL"
        min="0">
      </ejs-numerictextbox>

      <p>Total: {{ (quantity * price) | currency:getCurrency(currentLanguage) }}</p>
    </form>
  `,
  styles: [`
    .language-selector { margin-bottom: 20px; }
    button { margin-right: 10px; padding: 8px 16px; }
    button.active { background: #007bff; color: white; }
  `]
})
export class MultiLanguageFormComponent {
  currentLanguage = 'en-US';
  quantity: number = 1;
  price: number = 100;

  languages = [
    { code: 'en-US', name: 'English' },
    { code: 'de-DE', name: 'Deutsch' },
    { code: 'fr-FR', name: 'Français' },
    { code: 'ar-SA', name: 'العربية' }
  ];

  labels: { [key: string]: { quantity: string; price: string } } = {
    'en-US': { quantity: 'Quantity', price: 'Price' },
    'de-DE': { quantity: 'Menge', price: 'Preis' },
    'fr-FR': { quantity: 'Quantité', price: 'Prix' },
    'ar-SA': { quantity: 'الكمية', price: 'السعر' }
  };

  get isRTL(): boolean {
    return this.currentLanguage.startsWith('ar');
  }

  setLanguage(code: string) {
    this.currentLanguage = code;
  }

  getCurrency(locale: string): string {
    const currencyMap: { [key: string]: string } = {
      'en-US': 'USD',
      'de-DE': 'EUR',
      'fr-FR': 'EUR',
      'ar-SA': 'SAR'
    };
    return currencyMap[locale] || 'USD';
  }
}
```

---

## Troubleshooting

**Issue:** CLDR data not loading
- **Solution:** Verify `cldr-data` package installed and paths correct

**Issue:** Locale not changing
- **Solution:** Ensure `locale` property set on component

**Issue:** RTL not working
- **Solution:** Set `[enableRtl]="true"` AND `dir="rtl"` on parent

**Issue:** Currency symbol not showing
- **Solution:** Verify `currency` property and CLDR data loaded for that locale

---

## See Also

- [Getting Started](./getting-started.md)
- [Formats and Styling](./formats-styling.md)
- [Accessibility and Migration](./accessibility-and-migration.md)
