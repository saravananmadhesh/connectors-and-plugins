# Accessibility & Localization — Syncfusion Angular Mention

## Table of Contents
- [Accessibility Overview](#accessibility-overview)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Ensuring Accessibility](#ensuring-accessibility)
- [Localization](#localization)
- [RTL Support](#rtl-support)

---

## Accessibility Overview

The Mention component follows accessibility guidelines and standards including:

| Accessibility Criteria | Support |
|------------------------|---------|
| WCAG 2.2 | ✅ Full |
| Section 508 | ✅ Full |
| Screen Reader Support | ✅ Full |
| Right-To-Left Support | ✅ Full |
| Color Contrast | ✅ Full |
| Mobile Device Support | ✅ Full |
| Keyboard Navigation | ✅ Full |
| Accessibility Checker Validation | ✅ Full |
| Axe-core Accessibility Validation | ✅ Full |

---

## WAI-ARIA Attributes

The Mention uses the `Listbox` role for the popup and `option` role for each list item. The following ARIA attributes describe the component state:

| Attribute | Purpose |
|-----------|---------|
| `aria-selected` | Indicates the currently selected option |
| `aria-activedescendent` | Holds the ID of the active list item to focus its descendant child |
| `aria-owns` | Contains the ID of the popup list element, indicating it as a child |

These attributes are managed automatically by the component.

---

## Keyboard Navigation

| Keyboard Shortcut | Action |
|-------------------|--------|
| **Arrow Down** | Selects the first item, or the next item after the current selection |
| **Arrow Up** | Selects the item before the currently selected one |
| **Escape** | Closes the popup without making a selection |
| **Enter** | Selects the focused item and closes the popup |
| **Tab** | Inserts the selected popup item and closes the popup; if popup is closed, moves focus to the next focusable element |

**Example with accessible markup:**

```typescript
import { Component } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <label id="comment">Comments</label>
    <div id="mentionElement"
         role="textbox"
         aria-labelledby="comment"
         placeholder="Type @ and tag user">
    </div>
    <ejs-mention [dataSource]="userData" [target]="mentionTarget" [fields]="fields">
    </ejs-mention>
  `
})
export class AppComponent {
  public userData: { [key: string]: Object }[] = [
    { Name: 'Andrew Fuller', ID: '1' },
    { Name: 'Anne Dodsworth', ID: '2' },
    { Name: 'Janet Leverling', ID: '3' },
    { Name: 'Laura Callahan', ID: '4' },
    { Name: 'Margaret Peacock', ID: '5' }
  ];
  public fields: Object = { text: 'Name' };
  public mentionTarget: string = '#mentionElement';
}
```

---

## Ensuring Accessibility

Syncfusion validates accessibility using:
- **accessibility-checker** npm package
- **axe-core** npm package

These are run during automated testing. You can view a live accessibility demo at: [https://ej2.syncfusion.com/accessibility/mention.html](https://ej2.syncfusion.com/accessibility/mention.html)

---

## Localization

The Mention component supports localization of its static text via `L10n.load()`. The only locale key is:

| Locale Key | Default (en-US) |
|------------|-----------------|
| `noRecordsTemplate` | `No records found` |

**Example — French locale:**

```typescript
import { Component, OnInit } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { L10n } from '@syncfusion/ej2-base';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <label>Comments</label>
    <div id="mentionElement" placeholder="Type @ and tag user"></div>
    <ejs-mention
      [dataSource]="customerData"
      [fields]="fields"
      [query]="query"
      [locale]="locale"
      [target]="mentionTarget">
    </ejs-mention>
  `
})
export class AppComponent implements OnInit {
  public customerData: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
  });
  public mentionTarget: string = '#mentionElement';
  public fields: Object = { text: 'ContactName', value: 'CustomerID' };
  // take(0) ensures no records load — triggers the noRecordsTemplate
  public query: Query = new Query().select(['ContactName', 'CustomerID']).take(0);
  public locale: string = 'fr-BE';

  ngOnInit(): void {
    // Load French translations before component renders
    L10n.load({
      'fr-BE': {
        'mention': {
          'noRecordsTemplate': 'Aucun enregistrement trouvé'
        }
      }
    });
  }
}
```

> Call `L10n.load()` in `ngOnInit` (before the component renders) to ensure translations are available.

---

## RTL Support

Use `enableRtl` to render the Mention component in right-to-left direction. This is useful for languages such as Arabic and Hebrew.

```html
<ejs-mention [dataSource]="userData" [enableRtl]="true" [target]="mentionTarget">
</ejs-mention>
```
