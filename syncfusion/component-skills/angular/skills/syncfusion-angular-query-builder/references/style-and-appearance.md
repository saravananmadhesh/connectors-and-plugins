# Style and Appearance — Syncfusion Angular Query Builder

Customize the Query Builder's visual appearance using CSS overrides, themes, and layout configuration properties.

---

## CSS Class Reference

Override these classes to customize the Query Builder's appearance without replacing its default functionality:

| CSS Class | What It Targets |
|---|---|
| `.e-group-header .e-btn` | Condition (AND/OR) button in the group header |
| `.e-group-body .e-rule-container` | Rule container (each condition row) |
| `.e-group-container .e-group-header .e-dropdown-btn` | Add Group/Condition dropdown button |
| `.e-query-builder .e-group-header .e-deletegroup` | Delete Group button |
| `.e-query-builder .e-rule-field .e-rule-value-delete .e-rule-delete` | Delete Condition button |
| `.e-query-builder .e-rule-list > ::after, .e-query-builder .e-rule-list > ::before` | Group joining connector lines |
| `.e-query-builder .e-rule-container.e-joined-rule` | Condition joining line between rules |

### Example: Custom Color Scheme

```css
/* styles.css */

/* Make condition button blue */
.e-group-header .e-btn {
  background-color: #1976D2;
  color: white;
  border-radius: 4px;
}

/* Style rule containers with subtle background */
.e-group-body .e-rule-container {
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px;
}

/* Make delete buttons red */
.e-query-builder .e-rule-field .e-rule-value-delete .e-rule-delete {
  color: #d32f2f;
}

/* Custom connector lines */
.e-query-builder .e-rule-list > ::before {
  border-color: #1976D2;
}
```

---

## Themes

The Query Builder supports all Syncfusion themes. Switch themes by changing the CSS import in `styles.css`:

```css
/* Material 3 (default with ng add) */
@import "../node_modules/@syncfusion/ej2-angular-querybuilder/styles/material3.css";

/* Bootstrap 5 */
@import "../node_modules/@syncfusion/ej2-angular-querybuilder/styles/bootstrap5.css";

/* Fluent 2 */
@import "../node_modules/@syncfusion/ej2-angular-querybuilder/styles/fluent2.css";

/* Tailwind CSS */
@import "../node_modules/@syncfusion/ej2-angular-querybuilder/styles/tailwind.css";

/* High Contrast (accessibility) */
@import "../node_modules/@syncfusion/ej2-angular-querybuilder/styles/highcontrast.css";
```

> Always import the matching theme CSS for all dependent packages (`ej2-base`, `ej2-buttons`, `ej2-dropdowns`, etc.) before the querybuilder theme.

### Theme Studio

For fully custom themes, use [Syncfusion Theme Studio](https://ej2.syncfusion.com/themestudio/?theme=material) to:
1. Adjust colors, fonts, and spacing interactively
2. Download a custom CSS file
3. Replace the default theme import with your custom file

---

## Display Modes

Switch between horizontal (default) and vertical layout orientations using `displayMode`:

```html
<!-- Horizontal layout (default) — fields, operators, values side by side -->
<ejs-querybuilder [displayMode]="'Horizontal'">
</ejs-querybuilder>

<!-- Vertical layout — fields, operators, values stacked vertically -->
<ejs-querybuilder [displayMode]="'Vertical'">
</ejs-querybuilder>
```

```typescript
// Toggle display mode dynamically
public currentMode: string = 'Horizontal';

toggleLayout(): void {
  this.currentMode = this.currentMode === 'Horizontal' ? 'Vertical' : 'Horizontal';
}
```

> Use vertical mode in mobile/responsive layouts or when column labels are long.

---

## Summary View

Enable a human-readable text summary of the current query below the rule editor:

```html
<ejs-querybuilder [summaryView]="true" [rule]="importRules">
  <e-columns>
    <e-column field="EmployeeID" label="Employee ID" type="number"></e-column>
    <e-column field="Country"    label="Country"     type="string"></e-column>
  </e-columns>
</ejs-querybuilder>
```

The summary view displays a plain-English description like:
> *Employee ID Equal 1 AND Country Equal 'USA'*

> Summary view is hidden by default (`summaryView: false`). Enable it for end-user review or read-only display scenarios.

---

## RTL Support

Enable right-to-left layout for Arabic, Farsi, Urdu, and other RTL languages:

```html
<ejs-querybuilder [enableRtl]="true" [rule]="importRules">
  <e-columns>
    <e-column field="EmployeeID" label="Employee ID" type="number"></e-column>
    <e-column field="Country"    label="Country"     type="string"></e-column>
  </e-columns>
</ejs-querybuilder>
```

When enabled, the component layout flips:
- Text reads right to left
- Icons and buttons mirror horizontally
- Dropdown popups open to the left

---

## State Persistence

Persist the Query Builder's current rules to the browser's `localStorage`, so they survive page refresh or navigation:

```html
<ejs-querybuilder [enablePersistence]="true" id="querybuilder">
  <e-columns>
    <e-column field="EmployeeID" label="Employee ID" type="number"></e-column>
    <e-column field="Country"    label="Country"     type="string"></e-column>
  </e-columns>
</ejs-querybuilder>
```

The `id` attribute is used as the localStorage key. The `rule` object is automatically saved on any change and restored on reload.

> Always set a unique `id` when using `enablePersistence` to avoid collisions between multiple Query Builder instances.

---

## Sort Columns

Control the order in which fields appear in the field selector dropdown:

```html
<!-- Ascending alphabetical order -->
<ejs-querybuilder [sortDirection]="'Ascending'">
</ejs-querybuilder>

<!-- Descending order -->
<ejs-querybuilder [sortDirection]="'Descending'">
</ejs-querybuilder>
```

> By default, fields appear in their definition order. Use `sortDirection` to help users find fields faster in large column sets.

---

## Responsive Design Tips

```css
/* Compact rule rows on small screens */
@media (max-width: 600px) {
  .e-group-body .e-rule-container {
    flex-direction: column;
  }
  .e-rule-filter, .e-rule-operator, .e-rule-value {
    width: 100% !important;
  }
}
```

Combined with `displayMode="Vertical"` and `maxGroupCount="2"`, this creates a mobile-friendly query builder.

---

## Troubleshooting

| Issue | Solution |
|---|---|
| Theme not applying | Ensure all dependency CSS imports are in correct order in `styles.css` |
| Custom CSS not overriding | Add higher specificity or use `!important` as a last resort |
| RTL partially working | Wrap the app in `dir="rtl"` at the HTML level for full RTL support |
| State not persisting | Verify `id` attribute is set on `<ejs-querybuilder>` when using `enablePersistence` |
| Summary view not visible | Set `[summaryView]="true"` (boolean binding, not string `"true"`) |
