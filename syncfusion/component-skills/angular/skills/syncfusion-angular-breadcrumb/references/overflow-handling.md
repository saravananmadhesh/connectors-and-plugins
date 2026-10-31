# Overflow Handling in Angular Breadcrumb

## Table of Contents
- [Overflow Mode Overview](#overflow-mode-overview)
- [Collapsed Mode](#collapsed-mode)
- [Menu Mode](#menu-mode)
- [Wrap Mode](#wrap-mode)
- [Scroll Mode](#scroll-mode)
- [Hidden Mode](#hidden-mode)
- [None Mode](#none-mode)
- [Choosing the Right Mode](#choosing-the-right-mode)

## Overflow Mode Overview

The Breadcrumb component uses `maxItems` and `overflowMode` properties to control how breadcrumb items are displayed when they exceed the available container space. The `maxItems` property sets the maximum number of items to display, while `overflowMode` determines the behavior for handling additional items.

Available overflow modes:
- **Collapsed**: First and last items visible, middle items behind ellipsis
- **Menu**: Visible items + remaining items in dropdown submenu
- **Wrap**: Items wrap to multiple lines
- **Scroll**: Horizontal scrollbar for single-line overflow
- **Hidden**: Only visible items shown, hidden items appear on navigation
- **None**: No overflow handling, all items displayed

## Collapsed Mode

Collapsed mode displays the first and last breadcrumb items while hiding intermediate items behind a collapsed icon (ellipsis). When the collapsed icon is clicked, all hidden items become visible and navigable.

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
    <ejs-breadcrumb [enableNavigation]="false" [maxItems]="3" overflowMode="Collapsed">
      <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="../"></e-breadcrumb-item>
        <e-breadcrumb-item text="Getting" url="./breadcrumb/getting-started"></e-breadcrumb-item>
        <e-breadcrumb-item text="Data-Binding" url="./breadcrumb/data-binding"></e-breadcrumb-item>
        <e-breadcrumb-item text="Icons" url="./breadcrumb/icons"></e-breadcrumb-item>
        <e-breadcrumb-item text="Navigations" url="./breadcrumb/navigations"></e-breadcrumb-item>
        <e-breadcrumb-item text="Templates" url="./breadcrumb/templates"></e-breadcrumb-item>
        <e-breadcrumb-item text="Overflow" url="./breadcrumb/overflow"></e-breadcrumb-item>
      </e-breadcrumb-items>
      <ng-template #separatorTemplate>
        <span class='e-bicons e-arrow'></span>
      </ng-template>
    </ejs-breadcrumb>
  </div>`
})
export class AppComponent {}
```

Collapsed mode behavior:
- Shows first item + last item
- Intermediate items hidden behind ellipsis (...)
- Click ellipsis to expand and view all items
- Provides compact display while maintaining accessibility

Use Collapsed mode when:
- Space is severely limited (narrow sidebars, mobile)
- Important to show the start and end of hierarchy
- Users occasionally need to navigate middle levels
- Maintaining breadcrumb visibility is critical

## Menu Mode

Menu mode displays the maximum number of breadcrumb items that fit within the container space and organizes the remaining items into a dropdown submenu. This is the default overflow mode.

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
    <ejs-breadcrumb [enableNavigation]="false" [maxItems]="3" overflowMode="Menu">
      <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="../"></e-breadcrumb-item>
        <e-breadcrumb-item text="Getting" url="./breadcrumb/getting-started"></e-breadcrumb-item>
        <e-breadcrumb-item text="Data-Binding" url="./breadcrumb/data-binding"></e-breadcrumb-item>
        <e-breadcrumb-item text="Icons" url="./breadcrumb/icons"></e-breadcrumb-item>
        <e-breadcrumb-item text="Navigations" url="./breadcrumb/navigations"></e-breadcrumb-item>
        <e-breadcrumb-item text="Templates" url="./breadcrumb/templates"></e-breadcrumb-item>
        <e-breadcrumb-item text="Overflow" url="./breadcrumb/overflow"></e-breadcrumb-item>
      </e-breadcrumb-items>
      <ng-template #separatorTemplate>
        <span class='e-bicons e-arrow'></span>
      </ng-template>
    </ejs-breadcrumb>
  </div>`
})
export class AppComponent {}
```

Menu mode behavior:
- Shows as many items as fit in container
- Remaining items appear in dropdown menu attached to a button
- Click menu button to see additional items
- Efficient space utilization while keeping all items accessible

Use Menu mode when:
- Need quick access to all items (dropdown always available)
- Container width is fixed but unknown
- Users frequently navigate to different levels
- Want standard dropdown behavior for navigation

## Wrap Mode

Wrap mode automatically wraps breadcrumb items to multiple lines when the total width exceeds the container space. Items flow to new lines rather than being hidden.

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
    <ejs-breadcrumb [enableNavigation]="false" [maxItems]="3" overflowMode="Wrap">
      <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="../"></e-breadcrumb-item>
        <e-breadcrumb-item text="Getting" url="./breadcrumb/getting-started"></e-breadcrumb-item>
        <e-breadcrumb-item text="Data-Binding" url="./breadcrumb/data-binding"></e-breadcrumb-item>
        <e-breadcrumb-item text="Icons" url="./breadcrumb/icons"></e-breadcrumb-item>
        <e-breadcrumb-item text="Navigations" url="./breadcrumb/navigations"></e-breadcrumb-item>
        <e-breadcrumb-item text="Templates" url="./breadcrumb/templates"></e-breadcrumb-item>
        <e-breadcrumb-item text="Overflow" url="./breadcrumb/overflow"></e-breadcrumb-item>
      </e-breadcrumb-items>
      <ng-template #separatorTemplate>
        <span class='e-bicons e-arrow'></span>
      </ng-template>
    </ejs-breadcrumb>
  </div>`
})
export class AppComponent {}
```

Wrap mode behavior:
- Items flow to next line when space runs out
- No items are hidden
- Multiple rows visible
- All items always accessible without clicking

Use Wrap mode when:
- Space can expand vertically
- All items should always be visible
- Users benefit from seeing full navigation path
- Container width varies (responsive design)

## Scroll Mode

Scroll mode displays an HTML scroll bar when the breadcrumb width exceeds the container space, allowing users to horizontally scroll to view hidden items. This maintains single-line layout while providing access.

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
    <ejs-breadcrumb [enableNavigation]="false" [maxItems]="3" overflowMode="Scroll">
      <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="../"></e-breadcrumb-item>
        <e-breadcrumb-item text="Getting" url="./breadcrumb/getting-started"></e-breadcrumb-item>
        <e-breadcrumb-item text="Data-Binding" url="./breadcrumb/data-binding"></e-breadcrumb-item>
        <e-breadcrumb-item text="Icons" url="./breadcrumb/icons"></e-breadcrumb-item>
        <e-breadcrumb-item text="Navigations" url="./breadcrumb/navigations"></e-breadcrumb-item>
        <e-breadcrumb-item text="Templates" url="./breadcrumb/templates"></e-breadcrumb-item>
        <e-breadcrumb-item text="Overflow" url="./breadcrumb/overflow"></e-breadcrumb-item>
      </e-breadcrumb-items>
      <ng-template #separatorTemplate>
        <span class='e-bicons e-arrow'></span>
      </ng-template>
    </ejs-breadcrumb>
  </div>`
})
export class AppComponent {}
```

Scroll mode behavior:
- Single horizontal line maintained
- Horizontal scrollbar appears when needed
- User scrolls to reveal hidden items
- No items are hidden, all accessible by scrolling

Use Scroll mode when:
- Single-line layout is critical (header constraints)
- Container width is limited and fixed
- Users can scroll horizontally
- Touch devices with scroll capability

## Hidden Mode

Hidden mode displays the maximum number of items that fit within the container space and completely hides the remaining items. Hidden items become visible when users navigate to previous levels by clicking on visible breadcrumb items.

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
    <ejs-breadcrumb [enableNavigation]="false" [maxItems]="3" overflowMode="Hidden">
      <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="../"></e-breadcrumb-item>
        <e-breadcrumb-item text="Getting" url="./breadcrumb/getting-started"></e-breadcrumb-item>
        <e-breadcrumb-item text="Data-Binding" url="./breadcrumb/data-binding"></e-breadcrumb-item>
        <e-breadcrumb-item text="Icons" url="./breadcrumb/icons"></e-breadcrumb-item>
        <e-breadcrumb-item text="Navigations" url="./breadcrumb/navigations"></e-breadcrumb-item>
        <e-breadcrumb-item text="Templates" url="./breadcrumb/templates"></e-breadcrumb-item>
        <e-breadcrumb-item text="Overflow" url="./breadcrumb/overflow"></e-breadcrumb-item>
      </e-breadcrumb-items>
      <ng-template #separatorTemplate>
        <span class='e-bicons e-arrow'></span>
      </ng-template>
    </ejs-breadcrumb>
  </div>`
})
export class AppComponent {}
```

Hidden mode behavior:
- Shows only items that fit in available space
- Remaining items completely hidden
- As user navigates (clicks items), breadcrumb updates
- Dynamic display based on current navigation position

Use Hidden mode when:
- Space is absolutely constrained
- Users navigate actively through hierarchy
- Current position is most important
- Items appear/disappear based on navigation

## None Mode

None mode displays all breadcrumb items without any overflow handling. Items are not hidden or wrapped, potentially overflowing the container.

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
    <ejs-breadcrumb [enableNavigation]="false" overflowMode="None">
      <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="../"></e-breadcrumb-item>
        <e-breadcrumb-item text="Getting" url="./breadcrumb/getting-started"></e-breadcrumb-item>
        <e-breadcrumb-item text="Data-Binding" url="./breadcrumb/data-binding"></e-breadcrumb-item>
        <e-breadcrumb-item text="Icons" url="./breadcrumb/icons"></e-breadcrumb-item>
        <e-breadcrumb-item text="Navigations" url="./breadcrumb/navigations"></e-breadcrumb-item>
        <e-breadcrumb-item text="Templates" url="./breadcrumb/templates"></e-breadcrumb-item>
        <e-breadcrumb-item text="Overflow" url="./breadcrumb/overflow"></e-breadcrumb-item>
      </e-breadcrumb-items>
      <ng-template #separatorTemplate>
        <span class='e-bicons e-arrow'></span>
      </ng-template>
    </ejs-breadcrumb>
  </div>`
})
export class AppComponent {}
```

None mode behavior:
- All items displayed in single line
- No wrapping, scrolling, or hiding
- May overflow container boundaries
- No maxItems limit applied

Use None mode when:
- Container is flexible/unbounded
- All items must always be visible
- Overflow is acceptable
- Simple, no-frills breadcrumb display

## Choosing the Right Mode

| Mode | Best For | Space Used | Visibility | Interaction |
|------|----------|-----------|------------|-------------|
| Collapsed | Very tight space | Minimal | Start & end visible | Click ellipsis |
| Menu | Limited space | Very efficient | Selected items | Click dropdown |
| Wrap | Vertical flexibility | Adaptive | All visible | No interaction |
| Scroll | Single-line requirement | Full width | Hidden until scroll | Scroll bar |
| Hidden | Very dynamic nav | Minimal | Current path only | Navigation-driven |
| None | Flexible containers | Full width | All always visible | No interaction |

### Decision Tree

```
Do you have space constraints?
├─ Very limited horizontally?
│  ├─ Show only first/last → Collapsed
│  └─ Show some, rest in menu → Menu
├─ Limited but flexible vertically?
│  └─ Wrap → Wrap
└─ No real constraints?
   ├─ Need single line? → Scroll
   └─ Anything goes? → None

Is navigation dynamic?
├─ Yes, user clicks items?
│  └─ Hidden
└─ No, static breadcrumb?
   └─ Choose based on space above
```

### Common Scenarios

**Mobile Navigation** → Wrap or Collapsed (accommodate small screens)

**Desktop Header** → Menu or Scroll (single-line constraint)

**File Browser** → Hidden (updates as user navigates)

**Documentation Site** → None or Menu (generous layout)

**Admin Panel** → Wrapped or Menu (variable content)

**Search Results** → Scroll (maintain header integrity)

Overflow handling ensures breadcrumbs remain usable and accessible regardless of item count or container width. Choose the mode that best fits your layout constraints and user interaction patterns.
