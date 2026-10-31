# Navigation Configuration in Angular Breadcrumb

## Table of Contents
- [URL Binding](#url-binding)
- [Relative URL Configuration](#relative-url-configuration)
- [Absolute URL Configuration](#absolute-url-configuration)
- [Enable Navigation for Last Item](#enable-navigation-for-last-item)
- [Open URL in New Page or Tab](#open-url-in-new-page-or-tab)

## URL Binding

The Breadcrumb component enables navigation functionality by binding URLs to breadcrumb items. Each item represents a URL destination that can be navigated to when clicked. The component supports relative and absolute URL configurations for flexible navigation management.

## Relative URL Configuration

Relative URLs contain only the path segment without the complete location or server details. Use relative URLs for navigating within your application:

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
    <!-- Breadcrumb with relative URLs -->
    <ejs-breadcrumb [enableNavigation]="false">
      <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="../"></e-breadcrumb-item>
        <e-breadcrumb-item text="Getting" url="./breadcrumb/getting-started"></e-breadcrumb-item>
        <e-breadcrumb-item text="Icons" url="./breadcrumb/icons"></e-breadcrumb-item>
        <e-breadcrumb-item text="Navigations" url="./breadcrumb/navigations"></e-breadcrumb-item>
        <e-breadcrumb-item text="Overflow" url="./breadcrumb/overflow"></e-breadcrumb-item>
      </e-breadcrumb-items>
    </ejs-breadcrumb>
  </div>`
})
export class AppComponent {}
```

Relative URL patterns:
- `../` - Go up one directory level
- `./breadcrumb/getting-started` - Navigate to specific folder path
- `../sibling/path` - Navigate to sibling directory
- `./page` - Navigate to page in current directory

Use relative URLs when:
- Navigation is within your application
- You want flexible deployment (works at any domain)
- Building multi-level navigation hierarchies
- The base path can change without breaking links

## Absolute URL Configuration

Absolute URLs contain the complete path and navigate directly to the specified resource across different domains. Use absolute URLs for external links or complete navigation paths:

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
    <!-- Breadcrumb with absolute URLs -->
    <ejs-breadcrumb [enableNavigation]="false">
      <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Getting" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Icons" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Navigations" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Overflow" url="url"></e-breadcrumb-item>
      </e-breadcrumb-items>
    </ejs-breadcrumb>
  </div>`
})
export class AppComponent {}
```

Absolute URL patterns:
- `https://example.com/path` - Full URL with protocol and domain
- Full URL with query parameters: `https://example.com/page?id=123&sort=asc`
- Full URL with anchors: `https://example.com/docs#section-header`

Use absolute URLs when:
- Linking to external websites
- Navigating to completely different domains
- Building navigation across multiple web properties
- Creating links that should work from any location

## Enable Navigation for Last Item

By default, the last breadcrumb item (active/current item) is not clickable. Enable navigation for the last item using the `enableActiveItemNavigation` property:

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
    <!-- Enable navigation for all items including the last one -->
    <ejs-breadcrumb [enableNavigation]="true" [enableActiveItemNavigation]="true">
      <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Getting" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Icons" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Navigations" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Overflow" url="url"></e-breadcrumb-item>
      </e-breadcrumb-items>
    </ejs-breadcrumb>
  </div>`
})
export class AppComponent {}
```

When `enableActiveItemNavigation` is `true`:
- The last/active breadcrumb item becomes clickable
- Clicking the active item navigates to its URL
- Useful for refresh or reload scenarios
- Maintains consistent navigation behavior

When `enableActiveItemNavigation` is `false` (default):
- The last item is not clickable
- Indicates the current page/section
- Prevents accidental navigation away from current page
- Standard web breadcrumb behavior

Enable active item navigation for:
- Allowing user refresh of current page
- Creating "sticky" navigation points
- Implementing reload functionality
- Applications requiring navigation to current item

## Open URL in New Page or Tab

Use the `beforeItemRender` event to set the `target` attribute of breadcrumb items, enabling them to open in new pages or tabs:

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
    <!-- Breadcrumb items open in new tab -->
    <ejs-breadcrumb (beforeItemRender)="beforeItemRenderHandler($event)">
      <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Getting" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Icons" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Navigations" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Overflow" url="url"></e-breadcrumb-item>
      </e-breadcrumb-items>
    </ejs-breadcrumb>
  </div>`
})
export class AppComponent {
  public beforeItemRenderHandler(args: BreadcrumbBeforeItemRenderEventArgs): void {
    // Set target to open in new tab
    if (args.element.children[0]) {
      (args.element.children[0] as any).target = "_blank";
    }
  }
}
```

Target attribute values:
- `_blank` - Open in new tab
- `_self` - Open in same window (default)
- `_parent` - Open in parent window
- `_top` - Open in top window
- Named window/frame: `mywindow` - Opens in window named "mywindow"

Conditional target assignment:

```ts
public beforeItemRenderHandler(args: BreadcrumbBeforeItemRenderEventArgs): void {
  // Open external links in new tab, internal in same tab
  if (args.element.children[0]) {
    if (args.item.url.startsWith('http')) {
      (args.element.children[0] as any).target = "_blank";
    } else {
      (args.element.children[0] as any).target = "_self";
    }
  }
}
```

Open in new tab for:
- External documentation links
- Third-party resources
- Optional reference material
- User research links

Open in same tab for:
- Internal application navigation
- Primary workflow navigation
- Default breadcrumb behavior
- Site structure navigation

## Navigation Summary

| Scenario | Configuration | Example |
|----------|---|---|
| Internal navigation | Relative URL | `./products/electronics` |
| External link | Absolute URL | `url` |
| Current page refresh | `enableActiveItemNavigation="true"` | Allow clicking active item |
| Open external in new tab | `beforeItemRender` with `target="_blank"` | Documentation links |
| Current tab navigation | Default behavior | Standard breadcrumb |

Navigation provides the primary user interface for moving through hierarchical content. Combine URL configuration with event handlers for advanced control over breadcrumb behavior.
