# Item Configuration

## Table of Contents
- [Button Items](#button-items)
- [Separator Items](#separator-items)
- [Input Items](#input-items)
- [NumericTextBox in Toolbar](#numerictextbox-in-toolbar)
- [DropDownList in Toolbar](#dropdownlist-in-toolbar)
- [CheckBox in Toolbar](#checkbox-in-toolbar)
- [RadioButton in Toolbar](#radiobutton-in-toolbar)
- [Tab Key Navigation](#tab-key-navigation)

## Button Items

Button is the default item type and renders button commands in the toolbar. It's configured using the `<e-item>` directive.

### Button Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `text` | string | Text to display on the button | `text='Cut'` |
| `id` | string | Unique identifier for the button | `id='btn-cut'` |
| `prefixIcon` | string | CSS icon class before text | `prefixIcon='e-icons e-cut'` |
| `suffixIcon` | string | CSS icon class after text | `suffixIcon='e-icons e-undo'` |
| `width` | string | Button width (px, %, em) | `width='100px'` |
| `align` | string | Alignment: Left, Center, Right | `align='Right'` |

### Basic Button Example

```typescript
<ejs-toolbar>
  <e-items>
    <e-item text='Cut'></e-item>
    <e-item text='Copy'></e-item>
    <e-item text='Paste'></e-item>
  </e-items>
</ejs-toolbar>
```

### Button with Icons

**Prefix Icon (before text):**

```typescript
<e-item text='Cut' prefixIcon='e-icons e-cut'></e-item>
<e-item text='Copy' prefixIcon='e-icons e-copy'></e-item>
<e-item text='Paste' prefixIcon='e-icons e-paste'></e-item>
```

**Suffix Icon (after text):**

```typescript
<e-item text='Undo' suffixIcon='e-icons e-undo'></e-item>
<e-item text='Redo' suffixIcon='e-icons e-redo'></e-item>
```

> **Note:** If both `prefixIcon` and `suffixIcon` are specified, only `prefixIcon` displays.

### Button with Width and Alignment

```typescript
<e-item text='Save' width='120px'></e-item>
<e-item text='Settings' align='Right'></e-item>
<e-item text='Help' align='Center'></e-item>
```

## Separator Items

The Separator type adds a vertical divider between toolbar items to group related commands.

### Separator Example

```typescript
<ejs-toolbar>
  <e-items>
    <e-item text='Cut'></e-item>
    <e-item text='Copy'></e-item>
    <e-item type='Separator'></e-item>
    <e-item text='Paste'></e-item>
    <e-item type='Separator'></e-item>
    <e-item text='Undo'></e-item>
    <e-item text='Redo'></e-item>
  </e-items>
</ejs-toolbar>
```

**Output:**
```
Cut | Copy | || Paste || Undo | Redo
```

### Important Notes

- If a Separator is added as the first or last item, it is not visible
- Separators help visually group related toolbar commands
- Separators don't have any properties beyond `type='Separator'`

## Input Items

The `Input` type allows embedding Syncfusion input-based components within toolbar items. This is configured with the `<ng-template #template>` directive.

### Input Type Configuration

```typescript
<e-item type='Input'>
  <ng-template #template>
    <!-- Component goes here -->
  </ng-template>
</e-item>
```

> **Important:** Set `type='Input'` ONLY for input-based components. The `ng-template` with `#template` attribute is mandatory.

## NumericTextBox in Toolbar

### Setup

1. Import `NumericTextBoxModule` from `@syncfusion/ej2-angular-inputs`
2. Set item `type='Input'`
3. Use `ng-template` to define the NumericTextBox component

### Example

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule, NumericTextBoxModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item text='Cut'></e-item>
        <e-item type='Input'>
          <ng-template #template>
            <ejs-numerictextbox format="c2" value="1" width="150"></ejs-numerictextbox>
          </ng-template>
        </e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent { }
```

### Configuration

NumericTextBox properties within template:
- `format="c2"` - Currency format with 2 decimal places
- `value="1"` - Default value
- `width="150"` - Width of the input

## DropDownList in Toolbar

### Setup

1. Import `DropDownListModule` from `@syncfusion/ej2-angular-dropdowns`
2. Set item `type='Input'`
3. Bind data source to the dropdown

### Example

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule, DropDownListModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item type='Input'>
          <ng-template #template>
            <ejs-dropdownlist [dataSource]='data' width="120" index="2"></ejs-dropdownlist>
          </ng-template>
        </e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent {
  public data: string[] = ['Badminton', 'Basketball', 'Cricket', 'Golf', 'Hockey', 'Rugby'];
}
```

## CheckBox in Toolbar

### Setup

1. Import `CheckBoxModule` from `@syncfusion/ej2-angular-buttons`
2. Set item `type='Input'`
3. Configure checkbox properties

### Example

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule, CheckBoxModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item type='Input'>
          <ng-template #template>
            <ejs-checkbox label="Enable Feature" [checked]="true"></ejs-checkbox>
          </ng-template>
        </e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent { }
```

## RadioButton in Toolbar

### Setup

1. Import `RadioButtonModule` from `@syncfusion/ej2-angular-buttons`
2. Set item `type='Input'`
3. Configure radio button with name grouping

### Example

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule, RadioButtonModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item type='Input'>
          <ng-template #template>
            <ejs-radiobutton label='Option 1' name='group1' checked="true"></ejs-radiobutton>
          </ng-template>
        </e-item>
        <e-item type='Input'>
          <ng-template #template>
            <ejs-radiobutton label='Option 2' name='group1'></ejs-radiobutton>
          </ng-template>
        </e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent { }
```

## Tab Key Navigation

Enable Tab key navigation for toolbar items using the `tabIndex` property.

### tabIndex Property

- `tabIndex > 0` - Enables tab navigation in specified order
- `tabIndex = 0` - Navigation based on element order
- `tabIndex < 0` - Disables tab key navigation for item

### Example: Enable Tab Navigation for Specific Items

```typescript
<ejs-toolbar>
  <e-items>
    <e-item text='Item 1' tabIndex="1"></e-item>
    <e-item text='Item 2' tabIndex="2"></e-item>
    <e-item text='Item 3' tabIndex="3"></e-item>
  </e-items>
</ejs-toolbar>
```

Users can now switch between items using Tab (forward) and Shift+Tab (backward) keys.

### Navigation Order

The `tabIndex` values determine the tab navigation order:

```typescript
<e-item text='Third' tabIndex="3"></e-item>
<e-item text='First' tabIndex="1"></e-item>
<e-item text='Second' tabIndex="2"></e-item>
```

Tab navigation order: First → Second → Third (in tabIndex order, not document order)

### Default Element Order

If all `tabIndex` values are 0, tab navigation follows document element order:

```typescript
<e-item text='Item 1' tabIndex="0"></e-item>
<e-item text='Item 2' tabIndex="0"></e-item>
<e-item text='Item 3' tabIndex="0"></e-item>
```

Navigation order: Item 1 → Item 2 → Item 3

## Mixed Item Types Example

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule, NumericTextBoxModule, DropDownListModule, CheckBoxModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item text='Cut'></e-item>
        <e-item text='Copy'></e-item>
        <e-item type='Separator'></e-item>
        <e-item text='Undo'></e-item>
        <e-item text='Redo'></e-item>
        
        <e-item type='Input' tabIndex="1">
          <ng-template #template>
            <ejs-numerictextbox format="c2" value="1" width="150"></ejs-numerictextbox>
          </ng-template>
        </e-item>
        
        <e-item type='Input' tabIndex="2">
          <ng-template #template>
            <ejs-dropdownlist [dataSource]='sportsList' width="120"></ejs-dropdownlist>
          </ng-template>
        </e-item>
        
        <e-item type='Input'>
          <ng-template #template>
            <ejs-checkbox label="Enable" [checked]="true"></ejs-checkbox>
          </ng-template>
        </e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent {
  public sportsList: string[] = ['Badminton', 'Basketball', 'Cricket'];
}
```

