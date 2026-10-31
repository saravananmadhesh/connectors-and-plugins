# Templates and Customization in Angular Breadcrumb

## Table of Contents
- [Item Template](#item-template)
- [Separator Template](#separator-template)
- [Custom Separator Icons](#custom-separator-icons)
- [Customize Specific Items](#customize-specific-items)
- [Component Integration](#component-integration)
- [Advanced CSS Customization](#advanced-css-customization)

## Item Template

The `itemTemplate` property enables custom rendering of individual breadcrumb items. Use templates to create rich, interactive breadcrumb items with custom styling, nested components, or dynamic content.

### Basic Item Template

```ts
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [BreadcrumbModule, ChipListModule],
  standalone: true,
  selector: 'app-root',
  template: `<div class="e-section-control">
    <ejs-breadcrumb cssClass="e-breadcrumb-chips">
      <e-breadcrumb-items>
        <e-breadcrumb-item text="Cart"></e-breadcrumb-item>
        <e-breadcrumb-item text="Billing"></e-breadcrumb-item>
        <e-breadcrumb-item text="Shipping"></e-breadcrumb-item>
        <e-breadcrumb-item text="Payment"></e-breadcrumb-item>
      </e-breadcrumb-items>
      <ng-template #itemTemplate let-dataSource="">
        <ejs-chiplist>
          <e-chips>
            <e-chip text={{dataSource.text}} cssClass="e-primary"></e-chip>
          </e-chips>
        </ejs-chiplist>
      </ng-template>
    </ejs-breadcrumb>
  </div>`
})
export class AppComponent {}
```

The `itemTemplate` receives a context with access to:
- `dataSource.text`: Item text
- `dataSource.url`: Item URL
- `dataSource.iconCss`: Item icon CSS class
- `dataSource.disabled`: Item disabled state

Use item templates to:
- Render items as custom components (chips, cards, badges)
- Add interactive elements (buttons, checkboxes)
- Display item status or badges
- Integrate with third-party UI libraries
- Create specialized navigation experiences

## Separator Template

The `separatorTemplate` property customizes the separators between breadcrumb items. Replace the default text separator with custom icons, symbols, or styled elements.

### Custom Icon Separator

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
    <ejs-breadcrumb cssClass="e-breadcrumb-chips">
      <e-breadcrumb-items>
        <e-breadcrumb-item text="Cart"></e-breadcrumb-item>
        <e-breadcrumb-item text="Billing"></e-breadcrumb-item>
        <e-breadcrumb-item text="Shipping"></e-breadcrumb-item>
        <e-breadcrumb-item text="Payment"></e-breadcrumb-item>
      </e-breadcrumb-items>
      <ng-template #separatorTemplate>
        <span class="e-icons e-arrow"></span>
      </ng-template>
    </ejs-breadcrumb>
  </div>`
})
export class AppComponent {}
```

Separator template features:
- Access to Syncfusion icon library icons
- Custom HTML elements (spans, divs, symbols)
- CSS styling for appearance
- Animated or dynamic separators
- Different separators for different sections

Common separator icons:
- `e-arrow`: Right-pointing arrow
- `e-slash`: Forward slash (/)
- `e-chevron-right`: Chevron arrow
- `e-circle`: Circle dot
- `e-dash`: Dash separator

### Custom Styled Separator

```html
<ng-template #separatorTemplate>
  <span style="margin: 0 8px; color: #999;">→</span>
</ng-template>
```

Or use CSS classes:

```html
<ng-template #separatorTemplate>
  <span class="custom-separator"></span>
</ng-template>
```

```css
.custom-separator {
  display: inline-block;
  width: 20px;
  height: 2px;
  background-color: #ccc;
  margin: 0 8px;
}
```

## Custom Separator Icons

Combine icon classes with separators for visually distinctive breadcrumbs:

### Step Indicator Separators

```ts
@Component({
  template: `<ejs-breadcrumb>
    <e-breadcrumb-items>
      <e-breadcrumb-item text="Step 1"></e-breadcrumb-item>
      <e-breadcrumb-item text="Step 2"></e-breadcrumb-item>
      <e-breadcrumb-item text="Step 3"></e-breadcrumb-item>
      <e-breadcrumb-item text="Step 4"></e-breadcrumb-item>
    </e-breadcrumb-items>
    <ng-template #separatorTemplate>
      <span class="e-icons e-circle" style="color: #ddd;"></span>
    </ng-template>
  </ejs-breadcrumb>`
})
export class AppComponent {}
```

### Arrow Separators

```html
<ng-template #separatorTemplate>
  <span class="e-bicons e-arrow" style="color: #666;"></span>
</ng-template>
```

### Slash Separators

```html
<ng-template #separatorTemplate>
  <span style="margin: 0 8px; color: #999; font-weight: bold;">/</span>
</ng-template>
```

## Customize Specific Items

Apply conditional logic in `itemTemplate` to customize only certain items based on their properties:

```ts
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [BreadcrumbModule, CommonModule],
  standalone: true,
  selector: 'app-root',
  template: `<div class="e-section-control">
    <ejs-breadcrumb [enableNavigation]="false" cssClass="e-specific-item-template">
      <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Components" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Navigations" url="url"></e-breadcrumb-item>
        <e-breadcrumb-item text="Breadcrumb" url="./breadcrumb/default"></e-breadcrumb-item>
      </e-breadcrumb-items>
      <ng-template #itemTemplate let-dataSource="">
        <div>
          <span *ngIf="dataSource.text === 'Breadcrumb'; else otherContent" 
            class="e-searchfor-text">
            <span style="margin-right: 5px">Search for:</span>
            <a class="e-breadcrumb-text" 
              href="{{dataSource.url}}" 
              onclick="return false">
              {{dataSource.text}}
            </a>
          </span>
          <ng-template #otherContent>
            <a class="e-breadcrumb-text" 
              href="{{dataSource.url}}" 
              onclick="return false">
              {{dataSource.text}}
            </a>
          </ng-template>
        </div>
      </ng-template>
    </ejs-breadcrumb>
  </div>`
})
export class AppComponent {}
```

CSS for specific styling:

```css
.e-searchfor-text {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #d9534f;
  font-weight: bold;
}

.e-breadcrumb-text {
  text-decoration: none;
  color: inherit;
}
```

Customize specific items by:
- Checking `dataSource.text` property
- Checking item position in array
- Applying conditional CSS classes
- Rendering different templates per item type
- Highlighting important breadcrumb levels

## Component Integration

Integrate breadcrumb with other Syncfusion components using templates:

### Breadcrumb with Chip Components

```ts
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [BreadcrumbModule, ChipListModule],
  standalone: true,
  selector: 'app-root',
  template: `<div class="e-section-control">
    <ejs-breadcrumb cssClass="e-breadcrumb-chips">
      <e-breadcrumb-items>
        <e-breadcrumb-item text="Cart"></e-breadcrumb-item>
        <e-breadcrumb-item text="Billing"></e-breadcrumb-item>
        <e-breadcrumb-item text="Shipping"></e-breadcrumb-item>
        <e-breadcrumb-item text="Payment"></e-breadcrumb-item>
      </e-breadcrumb-items>
      <ng-template #itemTemplate let-dataSource="">
        <ejs-chiplist>
          <e-chips>
            <e-chip 
              text="{{dataSource.text}}" 
              cssClass="e-primary">
            </e-chip>
          </e-chips>
        </ejs-chiplist>
      </ng-template>
    </ejs-breadcrumb>
  </div>`
})
export class AppComponent {}
```

Integration enables:
- Using breadcrumb with other Syncfusion components
- Creating rich, interactive navigation experiences
- Combining breadcrumb with buttons, chips, badges
- Multi-feature navigation interfaces
- Component composition patterns

## Advanced CSS Customization

Customize breadcrumb appearance using CSS without modifying templates:

### Custom Styling

```css
/* Breadcrumb container */
.e-breadcrumb {
  background-color: #f5f5f5;
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 16px;
}

/* Breadcrumb items */
.e-breadcrumb-item {
  color: #0078d4;
  font-weight: 500;
}

.e-breadcrumb-item:hover {
  color: #106ebe;
  text-decoration: underline;
}

/* Active/last item */
.e-breadcrumb-item.e-active {
  color: #333;
  font-weight: bold;
  pointer-events: none;
}

/* Icons */
.e-breadcrumb-icon {
  margin-right: 8px;
  font-size: 16px;
}

/* Separators */
.e-breadcrumb-separator {
  margin: 0 8px;
  color: #999;
}
```

### Theme Customization

Apply color themes via CSS variables or custom classes:

```css
/* Light theme */
.e-breadcrumb-light {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
}

.e-breadcrumb-light .e-breadcrumb-item {
  color: #333;
}

/* Dark theme */
.e-breadcrumb-dark {
  background-color: #2d2d2d;
  border: 1px solid #444;
}

.e-breadcrumb-dark .e-breadcrumb-item {
  color: #f0f0f0;
}
```

### Responsive Customization

```css
/* Mobile layout */
@media (max-width: 768px) {
  .e-breadcrumb {
    padding: 8px 12px;
    font-size: 12px;
  }
  
  .e-breadcrumb-icon {
    font-size: 14px;
  }
}

/* Tablet layout */
@media (max-width: 1024px) {
  .e-breadcrumb {
    padding: 10px 14px;
  }
}
```

### Focus and Accessibility Styling

```css
/* Keyboard focus */
.e-breadcrumb-item:focus {
  outline: 2px solid #0078d4;
  outline-offset: 2px;
}

/* High contrast mode */
@media (prefers-contrast: more) {
  .e-breadcrumb-item {
    font-weight: bold;
  }
  
  .e-breadcrumb-separator {
    color: #000;
  }
}
```

## Template Best Practices

1. **Keep Templates Simple**: Avoid complex logic in templates, use component methods instead
2. **Preserve Context**: Always maintain access to breadcrumb data through `dataSource`
3. **Responsive Design**: Consider mobile and tablet layouts in template styling
4. **Performance**: Avoid rendering expensive components in every item template
5. **Accessibility**: Maintain semantic HTML and ARIA attributes in templates
6. **Consistency**: Use consistent styling across all item templates
7. **Testing**: Test templates with varying item counts and content lengths

Templates enable complete customization of breadcrumb appearance and behavior, allowing integration with existing design systems and component libraries.
