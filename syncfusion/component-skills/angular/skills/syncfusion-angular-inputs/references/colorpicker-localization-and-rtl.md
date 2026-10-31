# Localization and RTL — Syncfusion Angular ColorPicker

## Table of Contents
- [Localization Overview](#localization-overview)
- [Locale Keys](#locale-keys)
- [Loading Translations](#loading-translations)
- [Example: German (de-DE)](#example-german-de-de)
- [Example: Arabic (ar-AE) with RTL](#example-arabic-ar-ae-with-rtl)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)

---

## Localization Overview

The `Localization` library from `@syncfusion/ej2-base` allows you to replace the ColorPicker's built-in English text with translated text for any locale.

The text that can be localized in the ColorPicker:
- **Apply** button label
- **Cancel** button label
- **ModeSwitcher** button label (the "Switch Mode" toggle)

---

## Locale Keys

| Locale Key | Default Text (en-US) |
|-----------|---------------------|
| `Apply` | Apply |
| `Cancel` | Cancel |
| `ModeSwitcher` | Switch Mode |

These keys live under the `colorpicker` namespace in the translation object.

---

## Loading Translations

Use `L10n.load()` from `@syncfusion/ej2-base` to register translations before rendering the component. Then pass the locale string to the `locale` property.

```ts
import { Component } from '@angular/core';
import { L10n } from '@syncfusion/ej2-base';
import { ColorPickerModule } from '@syncfusion/ej2-angular-inputs';

L10n.load({
  'fr-FR': {
    colorpicker: {
      Apply: 'Appliquer',
      Cancel: 'Annuler',
      ModeSwitcher: 'Changer de mode'
    }
  }
});

@Component({
  selector: 'app-root',
  template: `
    <ejs-input ejs-colorpicker type="color" locale="fr-FR"></ejs-input>
  `,
  standalone: true,
  imports: [ ColorPickerModule]
})
export class AppComponent {}
```

> Call `L10n.load()` once at the application entry point (e.g., `main.ts` or `app.component.ts` top-level) before any component renders.

---

## Example: German (de-DE)

```ts
import { Component } from '@angular/core';
import { L10n } from '@syncfusion/ej2-base';
import { ColorPickerModule } from '@syncfusion/ej2-angular-inputs';

L10n.load({
  'de-DE': {
    colorpicker: {
      Apply: 'Anwenden',
      Cancel: 'Abbrechen',
      ModeSwitcher: 'Modus wechseln'
    }
  }
});

@Component({
  selector: 'app-root',
  template: `
    <ejs-input ejs-colorpicker type="color" locale="de-DE"></ejs-input>
  `,
  standalone: true,
  imports: [ ColorPickerModule]
})
export class AppComponent {}
```

---

## Example: Arabic (ar-AE) with RTL

For right-to-left languages, combine the `locale` property with `[enableRtl]="true"`:

```ts
import { Component } from '@angular/core';
import { L10n } from '@syncfusion/ej2-base';
import { ColorPickerModule } from '@syncfusion/ej2-angular-inputs';

L10n.load({
  'ar-AE': {
    colorpicker: {
      Apply: 'تطبيق',
      Cancel: 'إلغاء',
      ModeSwitcher: 'مفتاح كهربائي الوضع'
    }
  }
});

@Component({
  selector: 'app-root',
  template: `
    <ejs-input ejs-colorpicker type="color" [enableRtl]="true" locale="ar-AE"></ejs-input>
  `,
  standalone: true,
  imports: [ ColorPickerModule]
})
export class AppComponent {}
```

---

## Right-to-Left (RTL) Support

`[enableRtl]="true"` flips the component layout for right-to-left languages (Arabic, Hebrew, Farsi, Urdu, etc.):

- The gradient area and sliders mirror horizontally
- The button order reverses (Cancel appears on the right)
- The mode switcher aligns to the right

```html
<ejs-input ejs-colorpicker type="color" [enableRtl]="true"></ejs-colorpicker>
```

RTL can be enabled independently of localization — for example, in an RTL layout without custom button text:

```html
<ejs-input ejs-colorpicker type="color" [enableRtl]="true"></ejs-input>
```

> For global RTL across all Syncfusion components in your app, use `enableRtl` from `@syncfusion/ej2-base`:
> ```ts
> import { enableRtl } from '@syncfusion/ej2-base';
> enableRtl(true);
> ```
