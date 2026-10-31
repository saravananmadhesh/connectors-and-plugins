# Icons and Visual Enhancements in Angular Breadcrumb

## Table of Contents
- [Loading Icons in Breadcrumb Items](#loading-icons-in-breadcrumb-items)
- [Breadcrumb with Font Icons](#breadcrumb-with-font-icons)
- [Breadcrumb with Images](#breadcrumb-with-images)
- [Breadcrumb with SVG Icons](#breadcrumb-with-svg-icons)
- [Icon Positioning](#icon-positioning)
- [Icon Only Items](#icon-only-items)
- [Show Icon Only for First Item](#show-icon-only-for-first-item)

## Loading Icons in Breadcrumb Items

The `iconCss` property adds visual representation to breadcrumb items. Icons enhance the navigation experience by providing visual context for each level. The Breadcrumb component supports font icons, image icons, and SVG graphics through the `iconCss` property.

## Breadcrumb with Font Icons

Use Syncfusion's built-in font icon library (`e-icons`) to add icons to breadcrumb items. Set the `iconCss` property to `e-icons` followed by the specific icon class:

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
        <e-breadcrumb-item iconCss="e-icons e-home" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Components" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Navigations" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Breadcrumb" url="./breadcrumb/default"></e-breadcrumb-item>
      </e-breadcrumb-items>
    </ejs-breadcrumb>
  </div>`
})
export class AppComponent {}
```

Common icon classes:
- `e-home`: Home icon
- `e-folder`: Folder icon
- `e-file`: File icon
- `e-star`: Star icon
- `e-settings`: Settings icon
- `e-clock`: Clock icon
- `e-left-arrow`: Left arrow
- `e-right-arrow`: Right arrow

By default, icons appear to the left of item text. Combine icon with text for maximum clarity.

## Breadcrumb with Images

Add image icons to breadcrumb items using the `iconCss` property with a custom CSS class. Create the class with `background-image` pointing to your image:

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
        <e-breadcrumb-item iconCss="e-image-home" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Components" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Navigations" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Breadcrumb" url="./breadcrumb/default"></e-breadcrumb-item>
      </e-breadcrumb-items>
    </ejs-breadcrumb>
  </div>`
})
export class AppComponent {}
```

Define the image CSS class in your stylesheet:

```css
.e-image-home {
  background-image: url('./assets/home.png');
  background-size: contain;
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
  display: inline-block;
}
```

Use images when:
- You need custom graphics beyond icon fonts
- Displaying brand-specific or domain-specific icons
- Integrating with existing image assets
- Achieving specific visual styling not available in fonts

## Breadcrumb with SVG Icons

SVG icons provide scalable graphics for breadcrumb items. Define SVG icons using a custom CSS class:

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
        <e-breadcrumb-item iconCss="e-svg-home" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Components" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Navigations" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Breadcrumb" url="./breadcrumb/default"></e-breadcrumb-item>
      </e-breadcrumb-items>
    </ejs-breadcrumb>
  </div>`
})
export class AppComponent {}
```

Define SVG CSS class in your stylesheet using `mask-image` or `background-image`:

```css
.e-svg-home::before {
  content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>');
  display: inline-block;
  width: 24px;
  height: 24px;
}
```

SVG icons are ideal for:
- Responsive, resolution-independent graphics
- Complex or multi-color icons
- Performance-optimized graphics
- Dynamic color changes via CSS

## Icon Positioning

By default, icons display to the LEFT of item text. Change icon position to the RIGHT using the `e-icon-right` CSS class applied via the `beforeItemRender` event:

```ts
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';
import { BreadcrumbBeforeItemRenderEventArgs } from '@syncfusion/ej2-angular-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [BreadcrumbModule],
  standalone: true,
  selector: 'app-root',
  template: `<div class="e-section-control">
    <div id="breadcrumb-control" class="control-section">
      <div class="header"><b>Icon Position - Left (Default)</b></div><br />
      <ejs-breadcrumb [enableNavigation]="false">
        <e-breadcrumb-items>
          <e-breadcrumb-item iconCss="e-bicons e-folder" text="Program Files"></e-breadcrumb-item>
          <e-breadcrumb-item iconCss="e-bicons e-folder" text="Services"></e-breadcrumb-item>
          <e-breadcrumb-item iconCss="e-bicons e-file" text="Config.json"></e-breadcrumb-item>
        </e-breadcrumb-items>
      </ejs-breadcrumb>
      <br /><br/>
      <div class="header"><b>Icon Position - Right</b></div><br />
      <ejs-breadcrumb [enableNavigation]="false" (beforeItemRender)="beforeItemRenderHandler($event)">
        <e-breadcrumb-items>
          <e-breadcrumb-item iconCss="e-bicons e-folder" text="Program Files"></e-breadcrumb-item>
          <e-breadcrumb-item iconCss="e-bicons e-folder" text="Services"></e-breadcrumb-item>
          <e-breadcrumb-item iconCss="e-bicons e-file" text="Config.json"></e-breadcrumb-item>
        </e-breadcrumb-items>
      </ejs-breadcrumb>
    </div>
  </div>`
})
export class AppComponent {
  public beforeItemRenderHandler(args: BreadcrumbBeforeItemRenderEventArgs): void {
    // Add e-icon-right class to move icons to the right
    if (args.item.text !== '') {
      args.element.classList.add('e-icon-right');
    }
  }
}
```

Icon positioning CSS (if needed):

```css
.e-breadcrumb .e-icon-right .e-breadcrumb-icon {
  margin-left: 8px;
  margin-right: 0;
}
```

## Icon Only Items

Display only icons without text by omitting the `text` property. Use this for compact breadcrumbs or icon-based navigation:

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
    <!-- Breadcrumb items with only icons -->
    <ejs-breadcrumb [enableNavigation]="false">
      <e-breadcrumb-items>
        <e-breadcrumb-item iconCss="e-icons e-home"></e-breadcrumb-item>
        <e-breadcrumb-item iconCss="e-bicons e-folder"></e-breadcrumb-item>
        <e-breadcrumb-item iconCss="e-bicons e-file"></e-breadcrumb-item>
      </e-breadcrumb-items>
    </ejs-breadcrumb>
  </div>`
})
export class AppComponent {}
```

Icon-only breadcrumbs work best when:
- Space is severely limited (mobile layouts)
- Icons are universally understood (home, back, forward)
- Combined with hover tooltips for clarity
- Displaying file system hierarchies

## Show Icon Only for First Item

Display an icon for the first item only, with text for remaining items:

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
    <!-- First item with icon, rest with text only -->
    <ejs-breadcrumb [enableNavigation]="false">
      <e-breadcrumb-items>
        <e-breadcrumb-item iconCss="e-icons e-home" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Components" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Navigations" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Breadcrumb" url="./breadcrumb/default"></e-breadcrumb-item>
      </e-breadcrumb-items>
    </ejs-breadcrumb>
  </div>`
})
export class AppComponent {}
```

This pattern provides:
- Visual distinction for the root/home level
- Conservation of space for intermediate levels
- Clear hierarchy indication
- Balance of icons and text

## Icon Size and Styling

Control icon size and color using custom CSS:

```css
.e-breadcrumb .e-breadcrumb-icon {
  font-size: 18px;
  color: #333;
}

.e-breadcrumb .e-breadcrumb-item:hover .e-breadcrumb-icon {
  color: #0078d4;
}
```

Customize icon appearance by targeting the icon element class.
