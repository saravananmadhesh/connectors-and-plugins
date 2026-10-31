# Getting Started – Syncfusion TypeScript Rating

## Dependencies

```
@syncfusion/ej2-inputs
  └── @syncfusion/ej2-base
  └── @syncfusion/ej2-popups
```

## Installation

Install via the quickstart project (clone and install):

```bash
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack- ej2-quickstart
cd ej2-quickstart
npm install
```

Or install individual packages:

```bash
npm install @syncfusion/ej2-inputs @syncfusion/ej2-base @syncfusion/ej2-popups
```

## CSS Imports

Add the following CSS imports (Material theme shown):

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/rating/index.css";
```

> The `ej2-popups` CSS is required because the Rating component uses a Tooltip internally.

## HTML Markup

The Rating component renders on an `<input>` element:

```html
<input id="rating" />
```

## Basic Initialization

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating();
rating.appendTo('#rating');
```

## Setting an Initial Value

Use the `value` property to pre-select a rating:

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({ value: 3.0 });
rating.appendTo('#rating');
```

## Run the Application

```bash
npm start
```

## Full Minimal Example

```ts
import { Rating } from '@syncfusion/ej2-inputs';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let rating: Rating = new Rating({ value: 3.0 });
rating.appendTo('#rating');
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>EJ2 Rating</title>
</head>
<body>
  <input id="rating" />
</body>
</html>
```
