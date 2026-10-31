# Items and Display Configuration

## Table of Contents
- [Setting Text, Value, and Index](#setting-text-value-and-index)
- [Placeholder and Float Label](#placeholder-and-float-label)
- [HTML Attributes](#html-attributes)
- [Component and Popup Width](#component-and-popup-width)
- [Popup Height](#popup-height)
- [Show Clear Button](#show-clear-button)
- [CSS Class](#css-class)
- [Disabled State](#disabled-state)
- [Read Only Mode](#read-only-mode)
- [Grid Settings](#grid-settings)

## Setting Text, Value, and Index

Pre-select an item using `text` (display string), `value` (hidden key), or `index` (zero-based position):

```html
<!-- Pre-select by text -->
<ejs-multicolumncombobox [dataSource]='empData' [fields]='fields' text='Michael'>

<!-- Pre-select by value -->
<ejs-multicolumncombobox [dataSource]='empData' [fields]='fields' value='1015'>

<!-- Pre-select by index (0-based) -->
<ejs-multicolumncombobox [dataSource]='empData' [fields]='fields' index='1'>
```

When the clear button is clicked or value is reset, `value`, `text`, and `index` all reset to `null`.

## Placeholder and Float Label

Set placeholder hint text with `placeholder`. Combine with `floatLabelType` for floating label behavior:

```typescript
export class AppComponent {
  public waterMark: string = 'Select an employee';
}
```

```html
<!-- Never: label never floats (default) -->
<ejs-multicolumncombobox [placeholder]='waterMark' floatLabelType='Never' ...>

<!-- Always: label always floats above the input -->
<ejs-multicolumncombobox [placeholder]='waterMark' floatLabelType='Always' ...>

<!-- Auto: label floats after focus or after typing -->
<ejs-multicolumncombobox [placeholder]='waterMark' floatLabelType='Auto' ...>
```

## HTML Attributes

Add extra HTML attributes (e.g., `title`, `name`, `aria-*`) using `[htmlAttributes]`:

```typescript
export class AppComponent {
  public htmlAttributes: Object = { title: 'Select an employee', name: 'employeeSelect' };
}
```

```html
<ejs-multicolumncombobox [dataSource]='empData' [fields]='fields' [htmlAttributes]='htmlAttributes'>
```

## Component and Popup Width

Control the overall component width with `width`. By default, the component fills its parent container.

```html
<!-- Fixed pixel width -->
<ejs-multicolumncombobox [dataSource]='empData' [fields]='fields' width='500px'>

<!-- Percentage width -->
<ejs-multicolumncombobox [dataSource]='empData' [fields]='fields' width='80%'>

<!-- Popup width independent of component width -->
<ejs-multicolumncombobox [dataSource]='empData' [fields]='fields' popupWidth='400px'>
```

## Popup Height

Default popup height is `300px`. Override with `popupHeight`:

```html
<ejs-multicolumncombobox [dataSource]='empData' [fields]='fields' popupHeight='400px'>
```

## Show Clear Button

Show a clear (×) button inside the input to reset selection. Default is `false`:

```html
<ejs-multicolumncombobox
  [dataSource]='empData'
  [fields]='fields'
  [placeholder]='waterMark'
  showClearButton='true'>
```

When clicked, `value`, `text`, and `index` all reset to `null`.

## CSS Class

Apply a custom CSS class to the component's root element for styling:

```typescript
export class AppComponent {
  public cssClass: string = 'e-custom-multi-column';
}
```

```html
<ejs-multicolumncombobox [dataSource]='empData' [fields]='fields' [cssClass]='cssClass'>
```

```css
.e-custom-multi-column .e-input {
  border-color: #0078d4;
}
```

## Disabled State

Disable all user interaction with `disabled='true'`. By default `disabled` is `false`:

```html
<ejs-multicolumncombobox
  [dataSource]='empData'
  [fields]='fields'
  text='Michael'
  disabled='true'>
```

## Read Only Mode

Allow display but prevent user interaction (no dropdown, no typing) with `readonly='true'`:

```html
<ejs-multicolumncombobox
  [dataSource]='empData'
  [fields]='fields'
  text='Michael'
  readonly='true'>
```

Unlike `disabled`, `readonly` still submits the value in forms.

## Grid Settings

Configure the popup's data grid appearance with `[gridSettings]`. Uses the `GridSettingsModel`:

| Property | Type | Description |
|----------|------|-------------|
| `gridLines` | string | `'Default'`, `'Horizontal'`, `'Vertical'`, `'Both'`, `'None'` |
| `rowHeight` | number | Row height in pixels |
| `enableAltRow` | boolean | Alternate row styling (adds `e-altrow` CSS class) |

```typescript
export class AppComponent {
  // Show horizontal lines only
  public gridSettingsLines: Object = { gridLines: 'Horizontal' };

  // Custom row height for larger content (e.g., images)
  public gridSettingsHeight: Object = { rowHeight: 40 };

  // Alternate row background for readability
  public gridSettingsAltRow: Object = { enableAltRow: true };

  // Combined configuration
  public gridSettings: Object = { gridLines: 'Horizontal', rowHeight: 40, enableAltRow: true };
}
```

```html
<ejs-multicolumncombobox
  [dataSource]='empData'
  [fields]='fields'
  [gridSettings]='gridSettings'
  width='500px'>
```

**gridLines values:**
- `Default` — lines based on the active theme
- `Horizontal` — only horizontal row separators
- `Vertical` — only vertical column separators
- `Both` — both horizontal and vertical
- `None` — no grid lines
