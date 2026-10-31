# Accessibility & Localization in Angular AutoComplete

## Table of Contents
- [Accessibility Standards Compliance](#accessibility-standards-compliance)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Focus Management](#focus-management)
- [Localization with L10n](#localization-with-l10n)
- [RTL Support](#rtl-support)

---

## Accessibility Standards Compliance

The AutoComplete component follows established accessibility guidelines:

| Accessibility Criteria | Compliance |
|---|---|
| WCAG 2.2 Support | Partial |
| Section 508 Support | Partial |
| Screen Reader Support | Full |
| Right-To-Left Support | Full |
| Color Contrast | Full |
| Mobile Device Support | Full |
| Keyboard Navigation Support | Full |
| Accessibility Checker Validation | Full |
| Axe-core Accessibility Validation | Full |

---

## WAI-ARIA Attributes

The AutoComplete uses the `combobox` ARIA role for the input and `option` role for each suggestion item.

| ARIA Attribute | Purpose |
|---|---|
| `aria-haspopup` | Indicates the input has a suggestion popup |
| `aria-expanded` | Indicates whether the popup is open |
| `aria-selected` | Indicates the currently selected option |
| `aria-readonly` | Indicates read-only state |
| `aria-disabled` | Indicates disabled state |
| `aria-activedescendant` | Points to the ID of the active suggestion item |
| `aria-owns` | Links the input to its popup list element |
| `aria-autocomplete` | Set to `'both'` — inline completion and list |

These attributes are managed automatically by the component — no manual configuration is needed.

---

## Keyboard Navigation

| Key | Action |
|---|---|
| `Arrow Down` | Opens popup if closed; moves to next item if open |
| `Arrow Up` | Opens popup if closed; moves to previous item if open |
| `Page Down` | Scrolls to next page, selects first item |
| `Page Up` | Scrolls to previous page, selects first item |
| `Enter` | Selects focused item and sets it as the AutoComplete value |
| `Tab` | Closes popup and moves focus to next tab-indexed element |
| `Shift + Tab` | Closes popup and moves focus to previous tab-indexed element |
| `Alt + Down` | Opens the popup |
| `Alt + Up` | Toggles the popup open/closed |
| `Esc` | Closes popup and removes selection |
| `Home` | Moves cursor to beginning of input text |
| `End` | Moves cursor to end of input text |

---

## Focus Management

Use the `focusIn()` and `focusOut()` methods to control focus programmatically.

The following example uses `Alt + T` keyboard shortcut to focus the AutoComplete:

```typescript
import { Component, HostListener, ViewChild } from '@angular/core';
import { AutoCompleteModule, AutoCompleteComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <p>Press <kbd>Alt+T</kbd> to focus the AutoComplete</p>
    <ejs-autocomplete
      id="atcelement"
      #samples
      [dataSource]="sportsData"
      [fields]="fields"
      placeholder="Find a game">
    </ejs-autocomplete>
  `
})
export class AppComponent {
  @ViewChild('samples') public sports!: AutoCompleteComponent;

  public sportsData: { [key: string]: Object }[] = [
    { Id: 'Game1', Game: 'Badminton' },
    { Id: 'Game2', Game: 'Basketball' },
    { Id: 'Game3', Game: 'Cricket' },
    { Id: 'Game4', Game: 'Football' },
    { Id: 'Game5', Game: 'Golf' },
    { Id: 'Game6', Game: 'Hockey' },
    { Id: 'Game7', Game: 'Rugby' },
    { Id: 'Game8', Game: 'Snooker' },
    { Id: 'Game9', Game: 'Tennis' }
  ];
  public fields: Object = { value: 'Game' };

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.altKey && event.keyCode === 84 /* t */) {
      this.sports.focusIn();
    }
  }
}
```

---

## Localization with L10n

Use the `L10n` class from `@syncfusion/ej2-base` to localize static text strings in the AutoComplete.

**Localizable strings:**

| Locale Key | Default (en-US) | Description |
|---|---|---|
| `noRecordsTemplate` | `No Records Found` | Shown when no suggestions match |
| `actionFailureTemplate` | `The Request Failed` | Shown when remote request fails |

**Example — French (fr-BE) localization:**

```typescript
import { Component, OnInit } from '@angular/core';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { L10n } from '@syncfusion/ej2-base';

@Component({
  imports: [AutoCompleteModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-autocomplete
      id="atcelement"
      [dataSource]="data"
      [query]="query"
      [fields]="fields"
      [locale]="locale"
      placeholder="Trouver un client">
    </ejs-autocomplete>
  `
})
export class AppComponent implements OnInit {
  public data: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
  });
  public fields: Object = { value: 'ContactName' };
  public query: Query = new Query().select(['ContactName', 'CustomerID']).take(0);
  public locale: string = 'fr-BE';

  ngOnInit(): void {
    L10n.load({
      'fr-BE': {
        'dropdowns': {
          'noRecordsTemplate': 'Aucun enregistrement trouvé',
          'actionFailureTemplate': "Modèle d'échec d'action"
        }
      }
    });
  }
}
```

**Steps:**
1. Import `L10n` from `@syncfusion/ej2-base`
2. Call `L10n.load({ ... })` in `ngOnInit` (or before component render)
3. Set `[locale]="'fr-BE'"` on the component

---

## RTL Support

Enable right-to-left layout for Arabic, Hebrew, Urdu, and other RTL languages:

```html
<ejs-autocomplete
  [dataSource]="data"
  [enableRtl]="true"
  placeholder="ابحث عن لعبة">
</ejs-autocomplete>
```

RTL affects:
- Input text direction
- Popup alignment and scroll direction
- Icon positions
