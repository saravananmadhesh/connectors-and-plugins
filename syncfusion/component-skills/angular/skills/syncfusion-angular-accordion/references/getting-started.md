# Getting Started with Angular Accordion

## Table of Contents
- [Installation](#installation)
- [Setup](#setup)
- [CSS Configuration](#css-configuration)
- [Basic Template Initialization](#basic-template-initialization)
- [Items Array Initialization](#items-array-initialization)
- [HTML Elements Initialization](#html-elements-initialization)
- [Core Properties Reference](#core-properties-reference)
- [AccordionItem Properties](#accordionitem-properties)
- [Running Your Application](#running-your-application)

## Installation

### Prerequisites
Ensure you have Node.js and Angular CLI installed on your system.

### Install Angular CLI
If you don't have Angular CLI, install it globally:

```bash
npm install -g @angular/cli
```

### Create a New Angular Application
Generate a new Angular application:

```bash
ng new syncfusion-angular-accordion-app
```

When prompted, select your preferred options:
- **Stylesheet format**: Choose CSS, SCSS, or your preference
- **Angular routing**: Select based on your needs
- **Server-side rendering (SSR)**: Choose appropriate option

Navigate to your project:

```bash
cd syncfusion-angular-accordion-app
```

### Install Syncfusion Accordion Package

Install the `@syncfusion/ej2-angular-navigations` package:

```bash
npm install @syncfusion/ej2-angular-navigations --save
```

**For Angular versions below 12** (legacy support), use:

```bash
npm install @syncfusion/ej2-angular-navigations@ngcc --save
```

Update your `package.json` with:

```json
"@syncfusion/ej2-angular-navigations": "20.2.38-ngcc"
```

## Setup

### Import Required Modules

In your component file, import `AccordionModule`:

```typescript
import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `<!-- your accordion here -->`
})
export class AppComponent {}
```

## CSS Configuration

### Add Syncfusion Theme CSS

Add the CSS imports to your main styles file (`src/styles.css`):

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/accordion/index.css";
```

**Available Themes:**
- `material3` (default modern theme)
- `material` (standard Material Design)
- `bootstrap5` (Bootstrap 5 theme)
- `fluent` (Microsoft Fluent Design)
- `tailwind` (Tailwind CSS theme)

Choose based on your application's design system.

## Basic Template Initialization

The simplest way to create an accordion using template-based items with `ng-template`:

```typescript
import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <ejs-accordion>
      <e-accordionitems>
        <e-accordionitem expanded="true">
          <ng-template #header>
            <div>ASP.NET</div>
          </ng-template>
          <ng-template #content>
            <div>Microsoft ASP.NET is a set of technologies in the Microsoft .NET Framework for building Web applications and XML Web services. ASP.NET pages execute on the server and generate markup such as HTML, WML, or XML that is sent to a desktop or mobile browser.</div>
          </ng-template>
        </e-accordionitem>

        <e-accordionitem>
          <ng-template #header>
            <div>ASP.NET MVC</div>
          </ng-template>
          <ng-template #content>
            <div>The Model-View-Controller (MVC) architectural pattern separates an application into three main components: the model, the view, and the controller. The ASP.NET MVC framework provides an alternative to the ASP.NET Web Forms pattern for creating Web applications.</div>
          </ng-template>
        </e-accordionitem>

        <e-accordionitem>
          <ng-template #header>
            <div>JavaScript</div>
          </ng-template>
          <ng-template #content>
            <div>JavaScript (JS) is an interpreted computer programming language. It was originally implemented as part of web browsers so that client-side scripts could interact with the user, control the browser, communicate asynchronously, and alter the document content.</div>
          </ng-template>
        </e-accordionitem>
      </e-accordionitems>
    </ejs-accordion>
  `
})
export class AppComponent {}
```

**Key points:**
- Use `<ejs-accordion>` as the root component
- Wrap items in `<e-accordionitems>`
- Each item is `<e-accordionitem>`
- Set `expanded="true"` on initial item to expand it
- Use `<ng-template #header>` for the header content
- Use `<ng-template #content>` for the expandable content

## Items Array Initialization

Initialize accordion items using a TypeScript array for dynamic or data-driven scenarios:

```typescript
import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `<ejs-accordion [items]="accordionItems"></ejs-accordion>`
})
export class AppComponent {
  public accordionItems = [
    {
      header: 'ASP.NET',
      content: `Microsoft ASP.NET is a set of technologies in the Microsoft .NET Framework for building Web applications and XML Web services. ASP.NET pages execute on the server and generate markup such as HTML, WML, or XML that is sent to a desktop or mobile browser.`,
      expanded: true
    },
    {
      header: 'ASP.NET MVC',
      content: `The Model-View-Controller (MVC) architectural pattern separates an application into three main components: the model, the view, and the controller. The ASP.NET MVC framework provides an alternative to the ASP.NET Web Forms pattern.`
    },
    {
      header: 'JavaScript',
      content: `JavaScript (JS) is an interpreted computer programming language. It was originally implemented as part of web browsers so that client-side scripts could interact with the user, control the browser, and alter the document content.`
    }
  ];
}
```

**Advantages:**
- Easy to populate from API or database
- Simple data binding
- Scales well for large datasets
- Can be modified at runtime

## HTML Elements Initialization

Initialize accordion using plain HTML div elements:

```typescript
import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <ejs-accordion>
      <div>
        <div>
          <div>ASP.NET</div>
        </div>
        <div>
          <div>Microsoft ASP.NET is a set of technologies in the Microsoft .NET Framework for building Web applications and XML Web services.</div>
        </div>
      </div>

      <div>
        <div>
          <div>ASP.NET MVC</div>
        </div>
        <div>
          <div>The Model-View-Controller (MVC) architectural pattern separates an application into three main components: the model, the view, and the controller.</div>
        </div>
      </div>

      <div>
        <div>
          <div>JavaScript</div>
        </div>
        <div>
          <div>JavaScript (JS) is an interpreted computer programming language used for creating interactive web pages and applications.</div>
        </div>
      </div>
    </ejs-accordion>
  `
})
export class AppComponent {}
```

**Structure:**
- Item container: outer `<div>`
- Header container: first inner `<div>`
- Header text: `<div>` inside header container
- Content container: second inner `<div>`
- Content text: `<div>` inside content container

## Core Properties Reference

The Accordion component uses the following essential properties during initialization:

### `items` Property
**Type:** `AccordionItemModel[]`

Specifies the collection of accordion items to display. Each item is an `AccordionItemModel` object defining header, content, and state.

**Example: Using items array with mixed configurations**
```typescript
import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-accordion-items',
  standalone: true,
  imports: [AccordionModule],
  template: `<ejs-accordion [items]="items"></ejs-accordion>`
})
export class AppComponent {
  public items = [
    { header: 'Item 1', content: 'Content 1', expanded: true },
    { header: 'Item 2', content: 'Content 2', disabled: false },
    { header: 'Item 3', content: 'Content 3', cssClass: 'custom-item' }
  ];
}
```

### `expandMode` Property
**Type:** `ExpandMode` (enum: `'Single'` | `'Multiple'`)

Controls whether one item or multiple items can be expanded simultaneously. Defaults to `'Multiple'`.

**Example: Setting single expand mode**
```typescript
import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-expand-mode',
  standalone: true,
  imports: [AccordionModule],
  template: `<ejs-accordion expandMode="Single" [items]="items"></ejs-accordion>`
})
export class AppComponent {
  public items = [
    { header: 'Item 1', content: 'Content 1', expanded: true },
    { header: 'Item 2', content: 'Content 2' },
    { header: 'Item 3', content: 'Content 3' }
  ];
}
```

### `headerTemplate` Property
**Type:** `string | Function | any`

Specifies a custom template for accordion item headers. Allows rich HTML and Angular components.

**Example: Custom header template with icons**
```typescript
import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-template',
  standalone: true,
  imports: [AccordionModule, CommonModule],
  template: `
    <ejs-accordion [items]="items">
      <ng-template #headerTemplate let-data="data">
        <span class="icon">{{ data.header }}</span>
      </ng-template>
    </ejs-accordion>
  `
})
export class AppComponent {
  public items = [
    { header: '📧 Emails', content: 'Email content here' },
    { header: '📅 Calendar', content: 'Calendar content here' },
    { header: '📝 Tasks', content: 'Tasks content here' }
  ];
}
```

### `itemTemplate` Property
**Type:** `string | Function | any`

Specifies a custom template for accordion item content areas.

**Example: Custom content template**
```typescript
import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-template',
  standalone: true,
  imports: [AccordionModule, CommonModule],
  template: `
    <ejs-accordion [items]="items">
      <ng-template #itemTemplate let-data="data">
        <div class="custom-content">
          <p>{{ data.description }}</p>
          <button>Learn More</button>
        </div>
      </ng-template>
    </ejs-accordion>
  `
})
export class AppComponent {
  public items = [
    { header: 'Feature 1', description: 'Description for feature 1' },
    { header: 'Feature 2', description: 'Description for feature 2' }
  ];
}
```

### `enableRtl` Property
**Type:** `boolean`

Enables right-to-left (RTL) layout for languages like Arabic, Hebrew, Urdu. Defaults to `false`.

**Example: Enabling RTL support**
```typescript
<ejs-accordion enableRtl="true" [items]="items"></ejs-accordion>
```

### `enablePersistence` Property
**Type:** `boolean`

When enabled, saves the expanded/collapsed state in browser localStorage. Defaults to `false`.

**Example: Preserving state across sessions**
```typescript
<ejs-accordion enablePersistence="true" [items]="items"></ejs-accordion>
```

### `height` and `width` Properties
**Type:** `string | number`

Sets the accordion component dimensions. Can be pixel values or percentages.

**Example: Setting dimensions**
```typescript
<ejs-accordion 
  height="500px" 
  width="100%" 
  [items]="items">
</ejs-accordion>
```

## AccordionItem Properties

Each accordion item uses `AccordionItemModel` interface with these properties:

### `header` Property
**Type:** `string | HTMLElement | Element`

The header text or HTML element displayed for the accordion item.

### `content` Property
**Type:** `string | HTMLElement | Element | Function`

The content displayed when the item is expanded. Can be HTML string, DOM element, or function returning content.

**Example: Mixed content types**
```typescript
public items = [
  { header: 'Text Header', content: 'Plain text content' },
  { header: 'HTML Header', content: '<strong>HTML</strong> content' },
  { header: 'Dynamic Header', content: () => this.fetchDynamicContent() }
];
```

### `expanded` Property
**Type:** `boolean`

Sets initial expanded state of the item. Defaults to `false`.

**Example: Multiple expanded items**
```typescript
public items = [
  { header: 'Item 1', content: 'Content 1', expanded: true },
  { header: 'Item 2', content: 'Content 2', expanded: true },
  { header: 'Item 3', content: 'Content 3', expanded: false }
];
```

### `disabled` Property
**Type:** `boolean`

Disables the item, preventing expansion/collapse. Defaults to `false`.

**Example: Disabling specific items**
```typescript
public items = [
  { header: 'Enabled Item', content: 'Can expand', disabled: false },
  { header: 'Disabled Item', content: 'Cannot expand', disabled: true }
];
```

### `visible` Property
**Type:** `boolean`

Controls visibility of the item. When `false`, item is hidden. Defaults to `true`.

**Example: Showing/hiding items**
```typescript
public items = [
  { header: 'Visible Item', content: 'Content here', visible: true },
  { header: 'Hidden Item', content: 'Not shown', visible: false }
];
```

### `cssClass` Property
**Type:** `string`

Custom CSS class to apply styling to specific accordion items.

**Example: Custom styling**
```typescript
public items = [
  { header: 'Featured', content: 'Special item', cssClass: 'featured-item' },
  { header: 'Standard', content: 'Normal item', cssClass: 'standard-item' }
];
```

**In your styles.css:**
```css
.featured-item {
  background-color: #f0f8ff;
  border-left: 4px solid #007bff;
}

.standard-item {
  background-color: #ffffff;
}
```

### `iconCss` Property
**Type:** `string`

Specifies CSS class for displaying an icon in the accordion item header.

**Example: Icons using Font Awesome**
```typescript
public items = [
  { header: 'Settings', content: 'Settings content', iconCss: 'fas fa-cog' },
  { header: 'Users', content: 'Users content', iconCss: 'fas fa-users' },
  { header: 'Reports', content: 'Reports content', iconCss: 'fas fa-chart-bar' }
];
```

### `id` Property
**Type:** `string`

Unique identifier for the accordion item, useful for referencing items programmatically.

**Example: Item identification**
```typescript
public items = [
  { id: 'item-1', header: 'Item 1', content: 'Content 1' },
  { id: 'item-2', header: 'Item 2', content: 'Content 2' },
  { id: 'item-3', header: 'Item 3', content: 'Content 3' }
];
```

## Running Your Application

### Start Development Server

Run your application:

```bash
npm start
```

Or using ng command:

```bash
ng serve
```

The application will be available at `http://localhost:4200`

### Verify Accordion Renders

Open your browser to `http://localhost:4200` and verify:
- All accordion items display with headers
- First item is expanded (showing content)
- Other items are collapsed
- Headers can be clicked to expand/collapse

### Next Steps

- Read **expand-modes.md** to control single vs. multiple expansion
- Read **data-binding.md** to load data from external sources
- Read **dynamic-loading-and-interactions.md** for event handling and dynamic updates
- Read **advanced-features.md** for animations and nested accordions

