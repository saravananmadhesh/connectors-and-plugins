# Data Binding in Angular Breadcrumb

## Table of Contents
- [Items as Tag Directive](#items-as-tag-directive)
- [Items Based on Current URL](#items-based-on-current-url)
- [Static URL Configuration](#static-url-configuration)
- [Customize Generated Item Text](#customize-generated-item-text)

## Items as Tag Directive

The most explicit data binding approach uses `e-breadcrumb-items` and `e-breadcrumb-item` tag directives. Each item uses the `BreadcrumbItemModel` interface with properties:
- `text`: Display text for the item
- `url`: Navigation destination
- `iconCss`: CSS class for icons
- `disabled`: Enable or disable the item

### Basic Example

```ts
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [BreadcrumbModule],
  standalone: true,
  selector: 'app-root',
  template: `<div class="e-section-control">
    <ejs-breadcrumb [enableNavigation]="false">
      <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Components" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Navigations" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Breadcrumb" url="./breadcrumb/default"></e-breadcrumb-item>
      </e-breadcrumb-items>
    </ejs-breadcrumb>
  </div>`
})
export class AppComponent {}
```

This approach is ideal when:
- Items are known at compile time
- Items rarely change
- Each item has custom properties or states
- You want explicit, readable code

## Items Based on Current URL

The Breadcrumb can automatically generate items from the current page URL. When neither items nor url property is provided, the component parses the browser's current location:

```ts
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [BreadcrumbModule],
  standalone: true,
  selector: 'app-root',
  template: `<div class="e-section-control">
    <!-- Breadcrumb generates items from current page URL -->
    <ejs-breadcrumb [enableNavigation]="false"></ejs-breadcrumb>
  </div>`
})
export class AppComponent {}
```

For example, if the page is at `https://example.com/products/electronics/laptops`:
- Item 1: "products" → links to `/products`
- Item 2: "electronics" → links to `/products/electronics`
- Item 3: "laptops" → links to `/products/electronics/laptops` (active)

**Note:** This method works best in hosted environments. Development servers may show the sample location instead of actual browser location.

## Static URL Configuration

Provide a static URL to the breadcrumb using the `url` property. The component generates items by parsing the URL path:

```ts
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [BreadcrumbModule],
  standalone: true,
  selector: 'app-root',
  template: `<div class="e-section-control">
    <!-- Generate items from provided URL path -->
    <ejs-breadcrumb 
      [enableNavigation]="false" 
      url="url">
    </ejs-breadcrumb>
  </div>`
})
export class AppComponent {}
```

The provided URL is parsed to create breadcrumb items:
- "ej2.syncfusion.com" → root
- "angular" → first level
- "demos" → second level
- "breadcrumb" → third level
- "bind-to-location" → active (last item)

Use this when:
- You want breadcrumb to reflect a specific URL structure
- Items should be derived from a known navigation path
- You need dynamic path generation without manual item definition

## Customize Generated Item Text

Use the `beforeItemRender` event to modify generated item text. This is useful when URL segments need user-friendly names:

```ts
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';
import { enableRipple } from '@syncfusion/ej2-base';
import { BreadcrumbBeforeItemRenderEventArgs } from '@syncfusion/ej2-navigations';

enableRipple(true);

@Component({
  imports: [BreadcrumbModule],
  standalone: true,
  selector: 'app-root',
  template: `<div class="e-section-control">
    <ejs-breadcrumb 
      [enableNavigation]="false" 
      (beforeItemRender)="beforeItemRenderHandler($event)" 
      url="url">
    </ejs-breadcrumb>
  </div>`
})
export class AppComponent {
  beforeItemRenderHandler(args: BreadcrumbBeforeItemRenderEventArgs): void {
    // Replace 'bind-to-location' with 'location'
    if (args.item.text === 'bind-to-location') {
      args.item.text = 'location';
    }
  }
}
```

The `beforeItemRender` event fires for each item before rendering. The event argument includes:
- `args.item`: The BreadcrumbItemModel for customization
- `args.element`: The DOM element being rendered

Use this event to:
- Convert kebab-case to Title Case
- Replace technical names with user-friendly labels
- Add conditional styling or properties
- Transform data before display

## Data Binding Comparison

| Approach | Best For | Pros | Cons |
|----------|----------|------|------|
| Tag Directive | Static, known items | Explicit, readable, flexible | Verbose, hardcoded |
| Current URL | Dynamic, browser-based | Automatic, no configuration | Limited control, dev server issues |
| Static URL | Path-based generation | Auto-generated from known path | Less flexible, requires parsing |
| beforeItemRender Event | Dynamic customization | Flexible text transformation | Event-driven, runtime overhead |

## Key Properties for Data Binding

| Property | Type | Purpose |
|----------|------|---------|
| `items` | BreadcrumbItemModel[] | Direct items array |
| `url` | String | Static URL for item generation |
| `text` | String | Item display text |
| `url` (item) | String | Navigation destination |
| `iconCss` | String | Icon CSS class |
| `beforeItemRender` | Event | Customize items before render |

## Common Patterns

### Hide Last Item Behind Ellipsis
```ts
beforeItemRenderHandler(args: BreadcrumbBeforeItemRenderEventArgs): void {
  if (args.item.text.length > 20) {
    args.item.text = args.item.text.substring(0, 17) + '...';
  }
}
```

### Add Icons Dynamically
```ts
beforeItemRenderHandler(args: BreadcrumbBeforeItemRenderEventArgs): void {
  if (args.item.text === 'Home') {
    args.item.iconCss = 'e-icons e-home';
  }
}
```

### Convert Underscores to Spaces
```ts
beforeItemRenderHandler(args: BreadcrumbBeforeItemRenderEventArgs): void {
  args.item.text = args.item.text.replace(/_/g, ' ');
}
```
