# Accessibility & Localization — Syncfusion Angular Query Builder

The Query Builder meets modern accessibility standards and supports full UI localization for international applications.

---

## Accessibility Compliance

The Query Builder adheres to the following standards:

| Accessibility Standard | Support |
|---|---|
| WCAG 2.2 | ✅ Full |
| Section 508 | ✅ Full |
| Screen Reader Support | ✅ Full |
| Right-To-Left (RTL) | ✅ Full |
| Color Contrast | ✅ Full |
| Mobile Device Support | ✅ Full |
| Keyboard Navigation | ✅ Full |
| Accessibility Checker Validation | ✅ Full |
| Axe-Core Validation | ✅ Full |

Test the live accessibility sample: [ej2.syncfusion.com/accessibility/query-builder.html](https://ej2.syncfusion.com/accessibility/query-builder.html)

---

## WAI-ARIA Attributes

The Query Builder uses the following ARIA attributes to convey role and state information to assistive technologies:

| Attribute | Purpose |
|---|---|
| `role` | Identifies the query builder widget to screen readers |

> The Query Builder's child elements (dropdowns, buttons, inputs) inherit ARIA support from their respective Syncfusion components.

---

## Keyboard Navigation

Users can navigate and interact with the Query Builder using only a keyboard:

| Key | Action |
|---|---|
| `Tab` | Move focus to the next interactive element in the rule |
| `Shift + Tab` | Move focus to the previous interactive element in the rule |

> All dropdowns and inputs within the Query Builder support their own keyboard interactions (arrow keys, Enter, Escape) as defined by the individual Syncfusion components.

---

## High Contrast Theme

For users who require high contrast display:

```css
/* styles.css */
@import "../node_modules/@syncfusion/ej2-base/styles/highcontrast.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/highcontrast.css";
@import "../node_modules/@syncfusion/ej2-dropdowns/styles/highcontrast.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/highcontrast.css";
@import "../node_modules/@syncfusion/ej2-calendars/styles/highcontrast.css";
@import "../node_modules/@syncfusion/ej2-popups/styles/highcontrast.css";
@import "../node_modules/@syncfusion/ej2-navigations/styles/highcontrast.css";
@import "../node_modules/@syncfusion/ej2-angular-querybuilder/styles/highcontrast.css";
```

---

## Localization

Use the Syncfusion `L10n` library to translate all Query Builder UI text. Load locale data before the component renders (typically in `main.ts` or `app.ts`).

### Setup

```typescript
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
  'de-DE': {
    'querybuilder': {
      'AddGroup':       'Gruppe hinzufügen',
      'AddCondition':   'Bedingung hinzufügen',
      'AddButton':      'Gruppe/Bedingung hinzufügen',
      'DeleteRule':     'Diese Bedingung entfernen',
      'DeleteGroup':    'Gruppe löschen',
      'Edit':           'BEARBEITEN',
      'SelectField':    'Feld auswählen',
      'SelectOperator': 'Operator auswählen',
      'StartsWith':     'Beginnt mit',
      'EndsWith':       'Endet mit',
      'Contains':       'Enthält',
      'Equal':          'Gleich',
      'NotEqual':       'Nicht gleich',
      'LessThan':       'Kleiner als',
      'GreaterThan':    'Größer als',
      'Between':        'Zwischen',
      'In':             'In',
      'NotIn':          'Nicht in',
      'SelectValue':    'Wert eingeben',
      'AND':            'UND',
      'OR':             'ODER'
    }
  }
});
```

```html
<ejs-querybuilder locale="de-DE" [rule]="importRules">
  <e-columns>
    <!-- columns -->
  </e-columns>
</ejs-querybuilder>
```

---

## Full Locale Key Reference

All translatable strings in the Query Builder:

| Locale Key | Default English Text |
|---|---|
| `AddGroup` | Add Group |
| `AddCondition` | Add Condition |
| `AddButton` | Add Group/Condition |
| `DeleteRule` | Remove this condition |
| `DeleteGroup` | Delete group |
| `Edit` | EDIT |
| `SelectField` | Select a field |
| `SelectOperator` | Select operator |
| `StartsWith` | Starts With |
| `EndsWith` | Ends With |
| `DoesNotStartWith` | Does Not Start With |
| `DoesNotEndWith` | Does Not End With |
| `Contains` | Contains |
| `DoesNotContain` | Does Not Contain |
| `Equal` | Equal |
| `NotEqual` | Not Equal |
| `LessThan` | Less Than |
| `LessThanOrEqual` | Less Than Or Equal |
| `GreaterThan` | Greater Than |
| `GreaterThanOrEqual` | Greater Than Or Equal |
| `Between` | Between |
| `NotBetween` | Not Between |
| `In` | In |
| `NotIn` | Not In |
| `Remove` | REMOVE |
| `ValidationMessage` | This field is required |
| `SummaryViewTitle` | Summary View |
| `OtherFields` | Other Fields |
| `AND` | AND |
| `OR` | OR |
| `SelectValue` | Enter Value |
| `IsEmpty` | Is Empty |
| `IsNotEmpty` | Is Not Empty |
| `IsNull` | Is Null |
| `IsNotNull` | Is Not Null |
| `True` | True |
| `False` | False |

### Arabic Example (RTL + Localization)

```typescript
L10n.load({
  'ar': {
    'querybuilder': {
      'AddGroup':     'إضافة مجموعة',
      'AddCondition': 'إضافة شرط',
      'DeleteRule':   'حذف هذا الشرط',
      'DeleteGroup':  'حذف المجموعة',
      'SelectField':  'اختر حقلاً',
      'AND':          'و',
      'OR':           'أو'
    }
  }
});
```

```html
<ejs-querybuilder locale="ar" [enableRtl]="true" [rule]="importRules">
</ejs-querybuilder>
```

---

## Accessibility Validation Tools

Use these tools to verify Query Builder accessibility in your application:

```bash
# Install accessibility-checker
npm install --save-dev accessibility-checker

# Install axe-core
npm install --save-dev axe-core
```

Run automated accessibility tests as part of your CI pipeline to catch regressions.

---

## Troubleshooting

| Issue | Solution |
|---|---|
| Locale not applying | Call `L10n.load()` before bootstrapping the Angular application |
| Missing locale keys | Check the full key table above; key names are case-sensitive |
| Screen reader skipping elements | Ensure no `aria-hidden` is applied to the query builder container |
| High contrast theme not loading | All dependency CSS files must use `highcontrast` theme import |
| RTL + localization not working together | Set both `locale="ar"` and `[enableRtl]="true"` on `<ejs-querybuilder>` |
