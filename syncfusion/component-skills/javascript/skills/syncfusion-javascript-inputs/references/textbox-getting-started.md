# Getting Started – Syncfusion TypeScript TextBox

## Table of Contents
- [Dependencies](#dependencies)
- [Project Setup](#project-setup)
- [Add CSS Styles](#add-css-styles)
- [Basic Initialization](#basic-initialization)
- [Adding Icons](#adding-icons)
- [Floating Label](#floating-label)

---

## Dependencies

The TextBox only requires `@syncfusion/ej2-inputs` (which depends on `@syncfusion/ej2-base`).

```
|-- @syncfusion/ej2-inputs
    |-- @syncfusion/ej2-base
```

Install via npm:
```bash
npm install @syncfusion/ej2-inputs
```

---

## Project Setup

Use the Syncfusion webpack quickstart for the fastest setup:

```bash
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack- ej2-quickstart
cd ej2-quickstart
npm install
```

Add an `<input>` element as the mount point in `src/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>EJ2 TextBox</title>
  <meta charset="utf-8" />
</head>
<body>
  <input id="firstName" />
</body>
</html>
```

---

## Add CSS Styles

Import the CSS theme in `src/styles/styles.css`. The Material theme is the recommended default:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/textbox/index.css";
```

Other available themes: `bootstrap4`, `bootstrap5`, `fluent`, `tailwind`, `highcontrast`.

---

## Basic Initialization

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let input: TextBox = new TextBox({
  placeholder: 'Enter Date'
});

input.appendTo('#firstName');
```

Run the application:
```bash
npm start
```

---

## Adding Icons

Use the `addIcon()` method inside the `created` event callback to add icons to the TextBox as an input group. Pass the position (`'append'` or `'prepend'`) and the CSS icon class.

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

// TextBox without icon
let textBoxObj: TextBox = new TextBox({
  placeholder: 'Enter Date'
});
textBoxObj.appendTo('#textbox');

// TextBox with appended icon
let iconTextBox: TextBox = new TextBox({
  placeholder: 'Enter Date',
  created: () => {
    iconTextBox.addIcon('append', 'e-icons e-date-range');
  }
});
iconTextBox.appendTo('#textboxicon');
```

You can also add icons to both sides:

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let textIconAppendPrepend: TextBox = new TextBox({
  placeholder: 'Enter Date',
  created: () => {
    textIconAppendPrepend.addIcon('prepend', 'e-date-icon');
    textIconAppendPrepend.addIcon('append', 'e-chevron-down-fill');
  }
});
textIconAppendPrepend.appendTo('#textIconAppendPrepend');
```

`addIcon()` accepts a single icon class string or an array of icon class strings.

---

## Floating Label

The floating label floats above the TextBox after the user focuses it or enters a value. Use the `floatLabelType` property to configure the behaviour.

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let inputobj: TextBox = new TextBox({
  placeholder: 'First Name',
  floatLabelType: 'Auto'
});

inputobj.appendTo('#firstName');
```

`floatLabelType` values:
- `'Never'` – placeholder never floats (default)
- `'Always'` – label always floats above the input
- `'Auto'` – label floats after the user focuses or types a value

### With floating label and icon

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let textFloatIconAppend: TextBox = new TextBox({
  placeholder: 'Enter Date',
  floatLabelType: 'Auto',
  created: () => {
    textFloatIconAppend.addIcon('append', 'e-date-icon');
  }
});
textFloatIconAppend.appendTo('#textFloatIconAppend');
```
