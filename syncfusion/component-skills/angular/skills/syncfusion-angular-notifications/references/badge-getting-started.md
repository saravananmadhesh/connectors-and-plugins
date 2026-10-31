# Getting Started with Angular Badge

The Syncfusion Angular Badge is a pure CSS component. There is no Angular component class — badges are rendered as plain HTML elements styled with CSS modifier classes.

## Installation

Install the notifications package which bundles the Badge component:

```bash
npm install @syncfusion/ej2-angular-notifications --save
```

> The `--save` flag records the package in the `dependencies` section of `package.json`.

## Setting Up an Angular Project

Create a new Angular project (recommended):

```bash
ng new syncfusion-angular-app
cd syncfusion-angular-app
ng serve
```

## Adding CSS References

Add the following imports to `src/styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/badge/index.css";
```

The styles in `src/styles.css` are included automatically by Angular.

## Adding Your First Badge

Badges attach to any inline element — typically a `<span>` nested inside a heading, button, or container. The only requirement is the base `e-badge` class plus a color variant class:

```html
<!-- src/app/app.component.html -->
<h1>Badge Component <span class="e-badge e-badge-primary">New</span></h1>
```

## Running the Application

```bash
ng serve
```

The browser opens with your badge rendered inline inside the heading.

## Key Points

- **No component import needed** — Badge is CSS-only; just add classes to a `<span>` or `<a>`.
- **Always include `e-badge`** as the base class alongside any modifier class.
- **Parent positioning** — For notification/dot/overlap badges, the parent container should have `position: relative` so the badge positions correctly.
