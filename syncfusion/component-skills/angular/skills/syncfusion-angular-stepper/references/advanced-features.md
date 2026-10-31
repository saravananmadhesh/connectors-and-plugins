# Advanced Features in Angular Stepper

## Table of Contents
- [Animation Settings](#animation-settings)
- [Tooltips](#tooltips)
- [Globalization and Localization](#globalization-and-localization)
- [RTL Support](#rtl-support)
- [Accessibility](#accessibility)

## Animation Settings

The Angular Stepper component supports smooth animations during step transitions. Configure animations using the `animation` property with `StepperAnimationSettingsModel`.

**See also:** [API Reference - Animation Settings](api-reference.md#animation-settings) | [API Reference - StepperAnimationSettingsModel](api-reference.md#steppersanimationsettingsmodel)

### Animation Configuration

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule, StepperAnimationSettingsModel } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="animation-example">
      <div class="controls">
        <button (click)="toggleAnimation()">
          {{ animationEnabled ? 'Disable' : 'Enable' }} Animation
        </button>
        <span>Duration: {{ animationDuration }}ms | Delay: {{ animationDelay }}ms</span>
      </div>

      <ejs-stepper [animation]="animationSettings">
        <e-steps>
          <e-step label="Step 1" iconCss="sf-icon-home"></e-step>
          <e-step label="Step 2" iconCss="sf-icon-settings"></e-step>
          <e-step label="Step 3" iconCss="sf-icon-database"></e-step>
          <e-step label="Step 4" iconCss="sf-icon-check"></e-step>
        </e-steps>
      </ejs-stepper>
    </div>
  `,
  styles: [`
    .animation-example {
      padding: 20px;
      max-width: 700px;
      margin: 0 auto;
    }
    .controls {
      margin-bottom: 20px;
      padding: 10px;
      background-color: #f5f5f5;
      border-radius: 4px;
      display: flex;
      gap: 10px;
      align-items: center;
    }
    button {
      padding: 8px 16px;
      background-color: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class AppComponent {
  animationEnabled = true;
  animationDuration = 2000; // milliseconds
  animationDelay = 0; // milliseconds

  animationSettings: StepperAnimationSettingsModel = {
    enable: true,
    duration: 2000,
    delay: 0
  };

  toggleAnimation(): void {
    this.animationEnabled = !this.animationEnabled;
    this.animationSettings.enable = this.animationEnabled;
  }
}
```

### Animation Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enable` | boolean | `true` | Enable/disable animations |
| `duration` | number | `2000` | Animation duration in milliseconds |
| `delay` | number | `0` | Delay before animation starts (ms) |

### Animation Examples

**Fast Animation (500ms):**
```ts
animationSettings: StepperAnimationSettingsModel = {
  enable: true,
  duration: 500,
  delay: 0
};
```

**Slow Animation with Delay (3000ms + 200ms delay):**
```ts
animationSettings: StepperAnimationSettingsModel = {
  enable: true,
  duration: 3000,
  delay: 200
};
```

**No Animation:**
```ts
animationSettings: StepperAnimationSettingsModel = {
  enable: false
};
```

## Tooltips

Display helpful tooltips when users hover over step indicators or labels.

**See also:** [API Reference - showTooltip](api-reference.md#showtooltip) | [API Reference - tooltipTemplate](api-reference.md#tooltiptemplate)

### Enable Tooltips

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="tooltip-example">
      <ejs-stepper [showTooltip]="true">
        <e-steps>
          <e-step label="Cart" 
                   iconCss="sf-icon-cart"
                   text="Review your items"></e-step>
          <e-step label="Delivery" 
                   iconCss="sf-icon-transport"
                   text="Enter shipping address"></e-step>
          <e-step label="Payment" 
                   iconCss="sf-icon-payment"
                   text="Complete payment"></e-step>
          <e-step label="Confirmation" 
                   iconCss="sf-icon-success"
                   text="Order confirmed"></e-step>
        </e-steps>
      </ejs-stepper>
      <p class="instruction">Hover over steps to see tooltips</p>
    </div>
  `,
  styles: [`
    .tooltip-example {
      padding: 20px;
      max-width: 700px;
      margin: 0 auto;
    }
    .instruction {
      margin-top: 20px;
      color: #666;
      font-size: 14px;
    }
  `]
})
export class AppComponent { }
```

### Tooltip with Templates

Create custom tooltip templates:

```ts
@Component({
  imports: [ StepperAllModule, StepperModule, CommonModule ],
  standalone: true,
  template: `
    <ejs-stepper [showTooltip]="true">
      <e-steps>
        <e-step label="Step 1" iconCss="sf-icon-1">
          <ng-template #stepTooltip>
            <div class="custom-tooltip">
              <strong>Step 1: Getting Started</strong>
              <p>This is the first step in the process</p>
              <ul>
                <li>Install dependencies</li>
                <li>Configure project</li>
              </ul>
            </div>
          </ng-template>
        </e-step>
      </e-steps>
    </ejs-stepper>
  `,
  styles: [`
    .custom-tooltip {
      padding: 10px;
    }
    .custom-tooltip strong {
      display: block;
      margin-bottom: 5px;
    }
  `]
})
export class AppComponent { }
```

### Tooltip Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showTooltip` | boolean | `false` | Enable/disable tooltips |

## Globalization and Localization

Support multiple languages and cultural settings in your Stepper.

**See also:** [API Reference - locale](api-reference.md#locale)

### Localization Example

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="localization-example">
      <div class="language-selector">
        <button (click)="setLanguage('en')">English</button>
        <button (click)="setLanguage('es')">Español</button>
        <button (click)="setLanguage('fr')">Français</button>
        <button (click)="setLanguage('de')">Deutsch</button>
      </div>

      <ejs-stepper>
        <e-steps>
          <e-step [label]="translations[currentLanguage].step1"></e-step>
          <e-step [label]="translations[currentLanguage].step2"></e-step>
          <e-step [label]="translations[currentLanguage].step3"></e-step>
          <e-step [label]="translations[currentLanguage].step4"></e-step>
        </e-steps>
      </ejs-stepper>
    </div>
  `,
  styles: [`
    .localization-example {
      padding: 20px;
    }
    .language-selector {
      margin-bottom: 20px;
      display: flex;
      gap: 10px;
    }
    button {
      padding: 8px 12px;
      background-color: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class AppComponent {
  currentLanguage = 'en';

  translations: any = {
    en: {
      step1: 'Cart',
      step2: 'Delivery Address',
      step3: 'Payment',
      step4: 'Confirmation'
    },
    es: {
      step1: 'Carrito',
      step2: 'Dirección de Entrega',
      step3: 'Pago',
      step4: 'Confirmación'
    },
    fr: {
      step1: 'Panier',
      step2: 'Adresse de Livraison',
      step3: 'Paiement',
      step4: 'Confirmation'
    },
    de: {
      step1: 'Wagen',
      step2: 'Lieferadresse',
      step3: 'Zahlung',
      step4: 'Bestätigung'
    }
  };

  setLanguage(lang: string): void {
    this.currentLanguage = lang;
  }
}
```

### Best Practices for Localization

1. **Use language codes**: Follow standards like `en`, `es`, `fr`
2. **Right-to-left languages**: Set RTL for Arabic, Hebrew, Urdu
3. **Date/number formats**: Adapt formatting to locale
4. **Testing**: Test with actual language speakers
5. **Resource files**: Store translations in separate files

## RTL Support

Enable Right-to-Left (RTL) support for languages like Arabic, Hebrew, and Urdu.

**See also:** [API Reference - enableRtl](api-reference.md#enablertl)

### Enable RTL

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div [attr.dir]="isRTL ? 'rtl' : 'ltr'" class="rtl-example">
      <button (click)="toggleRTL()">
        {{ isRTL ? 'Switch to LTR' : 'Switch to RTL' }}
      </button>

      <ejs-stepper [enableRtl]="isRTL">
        <e-steps>
          <e-step label="الخطوة الأولى" iconCss="sf-icon-cart"></e-step>
          <e-step label="الخطوة الثانية" iconCss="sf-icon-transport"></e-step>
          <e-step label="الخطوة الثالثة" iconCss="sf-icon-payment"></e-step>
          <e-step label="الخطوة الرابعة" iconCss="sf-icon-success"></e-step>
        </e-steps>
      </ejs-stepper>
    </div>
  `,
  styles: [`
    .rtl-example {
      padding: 20px;
      max-width: 700px;
      margin: 0 auto;
    }
  `]
})
export class AppComponent {
  isRTL = false;

  toggleRTL(): void {
    this.isRTL = !this.isRTL;
  }
}
```

### RTL CSS

```css
/* RTL specific styling */
[dir="rtl"] :deep(.e-stepper) {
  flex-direction: row-reverse;
}

[dir="rtl"] :deep(.e-step-label-container) {
  text-align: right;
}

[dir="rtl"] :deep(.e-stepper-progressbar) {
  transform: scaleX(-1);
}
```

### RTL Localization Example

```ts
@Component({
  template: `
    <div [attr.dir]="language.dir">
      <ejs-stepper [enableRtl]="language.dir === 'rtl'">
        <e-steps>
          <e-step [label]="currentLanguageLabels[0]"></e-step>
          <e-step [label]="currentLanguageLabels[1]"></e-step>
          <e-step [label]="currentLanguageLabels[2]"></e-step>
        </e-steps>
      </ejs-stepper>
    </div>
  `
})
export class AppComponent {
  language = { code: 'ar', dir: 'rtl' }; // Arabic with RTL

  languages = {
    en: { label: 'English', dir: 'ltr' },
    ar: { label: 'العربية', dir: 'rtl' },
    he: { label: 'עברית', dir: 'rtl' },
    ur: { label: 'اردو', dir: 'rtl' }
  };

  currentLanguageLabels = ['الخطوة الأولى', 'الخطوة الثانية', 'الخطوة الثالثة'];
}
```

## Accessibility

Ensure your Stepper is accessible to all users, including those using assistive technologies.

**Related:** WCAG compliance, keyboard navigation, screen reader support

### WCAG Compliance

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="accessible-stepper">
      <h1>Form Completion</h1>
      <ejs-stepper role="navigation" 
                    [attr.aria-label]="'4-step form navigation'">
        <e-steps>
          <e-step label="Personal Info" 
                   iconCss="sf-icon-profile"
                   title="Personal Information"></e-step>
          <e-step label="Address" 
                   iconCss="sf-icon-location"
                   title="Delivery Address"></e-step>
          <e-step label="Payment" 
                   iconCss="sf-icon-payment"
                   title="Payment Method"></e-step>
          <e-step label="Review" 
                   iconCss="sf-icon-check"
                   title="Review and Confirmation"></e-step>
        </e-steps>
      </ejs-stepper>

      <!-- Update main content region on step change -->
      <main [attr.aria-live]="'polite'" [attr.aria-label]="'Step content'">
        <div role="region">
          <!-- Step content here -->
        </div>
      </main>
    </div>
  `,
  styles: [`
    .accessible-stepper {
      padding: 20px;
      max-width: 700px;
      margin: 0 auto;
    }
  `]
})
export class AppComponent { }
```

### Accessibility Best Practices

1. **ARIA labels**: Add `aria-label` and `aria-live` attributes
2. **Keyboard navigation**: Support Tab key to reach steps
3. **Focus indicators**: Ensure visible focus for keyboard users
4. **Color contrast**: Maintain WCAG AA color contrast ratios
5. **Screen readers**: Test with screen readers (NVDA, JAWS)
6. **Title attributes**: Provide titles for hover information
7. **Semantic HTML**: Use proper heading hierarchy

### Keyboard Navigation Support

```html
<ejs-stepper [attr.tabindex]="'0'"
             (keydown)="handleKeydown($event)">
  <e-steps>
    <e-step label="Step 1"></e-step>
    <e-step label="Step 2"></e-step>
    <e-step label="Step 3"></e-step>
  </e-steps>
</ejs-stepper>
```

```ts
handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'ArrowRight') {
    // Move to next step
  } else if (event.key === 'ArrowLeft') {
    // Move to previous step
  }
}
```

## Best Practices Summary

1. **Animation**: Keep animations smooth but not distracting (500-2000ms)
2. **Tooltips**: Use for additional context, not redundant info
3. **Localization**: Plan for multi-language support from the start
4. **RTL**: Test thoroughly with RTL languages
5. **Accessibility**: Always include ARIA labels and keyboard support
6. **Performance**: Disable animations on low-end devices if needed

**See also:** [events-and-interactions.md](events-and-interactions.md) for event handling, [templates-and-customization.md](templates-and-customization.md) for custom layouts.
