# Speed Dial Styles and Appearance

## Table of Contents
- [Button Icon and Text](#button-icon-and-text)
- [Predefined CSS Styles](#predefined-css-styles)
- [Disabled State](#disabled-state)
- [Visible Property](#visible-property)
- [Opens On Hover](#opens-on-hover)
- [Item Tooltip](#item-tooltip)
- [Custom CSS Class](#custom-css-class)

---

## Button Icon and Text

Customize what appears on the Speed Dial trigger button using these properties:

| Property | Type | Description |
|---|---|---|
| `openIconCss` | `string` | CSS class for icon when popup is **closed** |
| `closeIconCss` | `string` | CSS class for icon when popup is **open** |
| `content` | `string` | Text displayed on the button |

### Icon only

```typescript
import { Component } from '@angular/core';
import { SpeedDialModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SpeedDialModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative; min-height:350px; border:1px solid;"></div>
    <button ejs-speeddial
      id="speeddial"
      openIconCss="e-icons e-edit"
      target="#targetElement">
    </button>
  `
})
export class AppComponent { }
```

### Text only

```typescript
import { Component } from '@angular/core';
import { SpeedDialModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SpeedDialModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative; min-height:350px; border:1px solid;"></div>
    <button ejs-speeddial
      id="speeddial"
      content="Edit"
      target="#targetElement">
    </button>
  `
})
export class AppComponent { }
```

### Icon with text

```typescript
import { Component } from '@angular/core';
import { SpeedDialModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SpeedDialModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative; min-height:350px; border:1px solid;"></div>
    <button ejs-speeddial
      id="speeddial"
      content="Edit"
      openIconCss="e-icons e-edit"
      target="#targetElement">
    </button>
  `
})
export class AppComponent { }
```

---

## Predefined CSS Styles

Use the `cssClass` property to apply a predefined visual style to the Speed Dial button:

| cssClass Value | Description |
|---|---|
| `e-primary` | Primary action style |
| `e-outline` | Outlined button appearance |
| `e-info` | Informational style |
| `e-success` | Positive/success style |
| `e-warning` | Caution/warning style |
| `e-danger` | Negative/danger style |

### Example: Warning style

```typescript
import { Component } from '@angular/core';
import { SpeedDialModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SpeedDialModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative; min-height:350px; border:1px solid;"></div>
    <button ejs-speeddial
      id="speeddial"
      content="Edit"
      cssClass="e-warning"
      target="#targetElement">
    </button>
  `
})
export class AppComponent { }
```

---

## Disabled State

Disable the entire Speed Dial component (not individual items) using `disabled`:

```html
<button ejs-speeddial id="speeddial" content="Edit" [disabled]="true"></button>
```

> To disable specific items only, use the `disabled` field on `SpeedDialItemModel`.

---

## Visible Property

Show or hide the Speed Dial button:

```html
<!-- Hidden -->
<button ejs-speeddial id="speeddial" content="Edit" [visible]="false"></button>
```

---

## Opens On Hover

Open the popup on mouse hover instead of click:

```html
<button ejs-speeddial
  id="speeddial"
  openIconCss="e-icons e-edit"
  closeIconCss="e-icons e-close"
  [items]="items"
  [opensOnHover]="true">
</button>
```

---

## Item Tooltip

Set a tooltip on individual action items using the `title` field of `SpeedDialItemModel`. Useful for icon-only items:

```typescript
import { Component } from '@angular/core';
import { SpeedDialModule, SpeedDialItemModel } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SpeedDialModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative; min-height:350px; border:1px solid;"></div>
    <button ejs-speeddial
      id="speeddial"
      openIconCss="e-icons e-edit"
      [items]="items"
      target="#targetElement">
    </button>
  `
})
export class AppComponent {
  public items: SpeedDialItemModel[] = [
    { iconCss: 'e-icons e-cut',   title: 'Cut' },
    { iconCss: 'e-icons e-copy',  title: 'Copy' },
    { iconCss: 'e-icons e-paste', title: 'Paste' }
  ];
}
```

---

## Custom CSS Class

Apply a custom CSS class for advanced styling:

```typescript
import { Component } from '@angular/core';
import { SpeedDialModule, SpeedDialItemModel } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SpeedDialModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative; min-height:350px; border:1px solid;"></div>
    <button ejs-speeddial
      id="speeddial"
      openIconCss="e-icons e-edit"
      closeIconCss="e-icons e-close"
      target="#targetElement"
      [items]="items"
      cssClass="custom-css">
    </button>
  `,
  styles: [`
    .custom-css {
      background-color: #6200ea;
      color: white;
    }
  `]
})
export class AppComponent {
  public items: SpeedDialItemModel[] = [
    { iconCss: 'e-icons e-cut' },
    { iconCss: 'e-icons e-copy' },
    { iconCss: 'e-icons e-paste' }
  ];
}
```
