# Localization in Angular Image Editor

Support multiple languages for international users.

## Set Locale

```typescript
import { Component } from '@angular/core';
import { ImageEditorModule } from '@syncfusion/ej2-angular-image-editor';

@Component({
  selector: 'app-localization',
  template: `<ejs-imageeditor [locale]="'es'"></ejs-imageeditor>`,
  imports: [ImageEditorModule],
  standalone: true
})
export class LocalizationComponent { }
```

## Supported Locales

- 'en' - English (default)
- 'de' - German
- 'fr' - French
- 'es' - Spanish
- 'ar' - Arabic
- 'ja' - Japanese
- 'zh' - Chinese
- 'ru' - Russian
- And 50+ more

## Custom Translations

```typescript
@Component({
  template: `<ejs-imageeditor [locale]="'de'"></ejs-imageeditor>`
})
export class GermanEditorComponent { }
```

## Define Custom Locale

```typescript
import { register } from '@syncfusion/ej2-base';

const customLocale = {
  'my-custom': {
    ImageEditor: {
      'Crop': 'Custom Crop',
      'ZoomIn': 'Aumentar',
      'Save': 'Guardar',
      'Undo': 'Deshacer'
    }
  }
};

register('customLocale', customLocale);

@Component({
  template: `<ejs-imageeditor [locale]="'my-custom'"></ejs-imageeditor>`
})
export class CustomLocaleComponent { }
```

## Common Localization Keys

Key UI elements that are localized:
- Toolbar labels (Crop, Save, Undo, Redo, etc.)
- Dialog titles and buttons
- Tooltips
- Filter names
- Shape names
- Error messages

## Multi-language Application

```typescript
@Component({
  selector: 'app-multi-lang',
  template: `
    <select (change)="onLanguageChange($event)">
      <option value="en">English</option>
      <option value="es">Spanish</option>
      <option value="fr">French</option>
      <option value="de">German</option>
    </select>
    <ejs-imageeditor [locale]="selectedLocale"></ejs-imageeditor>
  `,
  imports: [ImageEditorModule, CommonModule],
  standalone: true
})
export class MultiLanguageComponent {
  selectedLocale = 'en';

  onLanguageChange(event: any) {
    this.selectedLocale = event.target.value;
  }
}
```

## RTL Support

For Arabic, Hebrew, and other RTL languages, set the HTML `dir` attribute:

```typescript
// In HTML template or globally
// <html dir="rtl">

@Component({
  template: `
    <ejs-imageeditor 
      [locale]="'ar'"
    ></ejs-imageeditor>
  `
})
export class RTLComponent { }
```

## Edge Cases

**Issue:** Some text not translating
- **Solution:** Custom components need individual translations

**Issue:** RTL not applying correctly
- **Solution:** Ensure enableRtl matches locale direction
