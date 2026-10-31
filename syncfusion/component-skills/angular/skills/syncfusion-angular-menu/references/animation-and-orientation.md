# Animation and Orientation

## Table of Contents
- [Animation Settings](#animation-settings)
- [Animation Effects](#animation-effects)
- [Orientation](#orientation)
- [Menu Opening Behavior](#menu-opening-behavior)
- [Sub-menu Position](#sub-menu-position)

## Animation Settings

Customize menu animation behavior using the `animationSettings` property of type `MenuAnimationSettingsModel`:

```typescript
export interface MenuAnimationSettingsModel {
  effect?: MenuEffect;      // Animation effect type
  duration?: number;        // Duration in milliseconds
  easing?: string;          // CSS easing function
}
```

### Basic Animation Example

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel, MenuAnimationSettingsModel } from '@syncfusion/ej2-angular-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ejs-menu [items]="menuItems" [animationSettings]="animationSettings"></ejs-menu>
    </div>
  `
})
export class AppComponent {
  public animationSettings: MenuAnimationSettingsModel = {
    effect: 'FadeIn',
    duration: 800,
    easing: 'ease-in-out'
  };

  public menuItems: MenuItemModel[] = [
    {
      text: 'File',
      items: [
        { text: 'Open' },
        { text: 'Save' },
        { text: 'Exit' }
      ]
    },
    {
      text: 'Edit',
      items: [
        { text: 'Cut' },
        { text: 'Copy' },
        { text: 'Paste' }
      ]
    },
    { text: 'Help' }
  ];
}
```

## Animation Effects

### Available Effects

| Effect | Description |
|--------|-------------|
| `None` | No animation (instant display) |
| `SlideDown` | Menu slides down from top |
| `ZoomIn` | Menu zooms in from center |
| `FadeIn` | Menu fades in gradually |

### Effect Examples

#### SlideDown Effect
```typescript
public animationSettings: MenuAnimationSettingsModel = {
  effect: 'SlideDown',
  duration: 400
};
```

#### ZoomIn Effect
```typescript
public animationSettings: MenuAnimationSettingsModel = {
  effect: 'ZoomIn',
  duration: 600,
  easing: 'ease-out'
};
```

#### FadeIn Effect
```typescript
public animationSettings: MenuAnimationSettingsModel = {
  effect: 'FadeIn',
  duration: 800
};
```

#### No Animation
```typescript
public animationSettings: MenuAnimationSettingsModel = {
  effect: 'None'
};
```

### Animation Duration

Duration is specified in **milliseconds**:

```typescript
{
  effect: 'FadeIn',
  duration: 300      // 300ms animation
}

{
  effect: 'SlideDown',
  duration: 600      // 600ms animation
}

{
  effect: 'ZoomIn',
  duration: 1000     // 1 second animation
}
```

### Easing Functions

CSS easing functions control animation timing:

```typescript
{
  effect: 'FadeIn',
  duration: 800,
  easing: 'ease'              // Default
}

{
  effect: 'FadeIn',
  duration: 800,
  easing: 'ease-in'           // Slow start
}

{
  effect: 'FadeIn',
  duration: 800,
  easing: 'ease-out'          // Slow end
}

{
  effect: 'FadeIn',
  duration: 800,
  easing: 'ease-in-out'       // Slow start and end
}

{
  effect: 'FadeIn',
  duration: 800,
  easing: 'linear'            // Constant speed
}

{
  effect: 'FadeIn',
  duration: 800,
  easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)'  // Custom
}
```

## Orientation

Control whether the menu displays **horizontally** or **vertically** using the `orientation` property:

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <h3>Horizontal Menu (Default)</h3>
      <ejs-menu [items]="menuItems" orientation="Horizontal"></ejs-menu>
      
      <h3>Vertical Menu</h3>
      <ejs-menu [items]="menuItems" orientation="Vertical"></ejs-menu>
    </div>
  `
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    {
      text: 'File',
      items: [
        { text: 'Open' },
        { text: 'Save' },
        { text: 'Exit' }
      ]
    },
    {
      text: 'Edit',
      items: [
        { text: 'Cut' },
        { text: 'Copy' },
        { text: 'Paste' }
      ]
    },
    { text: 'Help' }
  ];
}
```

### Orientation Types

| Value | Description |
|-------|-------------|
| `Horizontal` | Menu items display in a horizontal row (default) |
| `Vertical` | Menu items stack vertically (sidebar style) |

### Horizontal Menu

```typescript
orientation="Horizontal"
// or
[orientation]="'Horizontal'"
```

Typical use cases:
- Application menu bars
- Top navigation bars
- Toolbar menus

### Vertical Menu

```typescript
orientation="Vertical"
// or
[orientation]="'Vertical'"
```

Typical use cases:
- Sidebar navigation
- Left-side menus
- Mobile navigation

## Menu Opening Behavior

Control how submenus open using the `showItemOnClick` property:

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <h3>Click to Open Submenu</h3>
      <ejs-menu [items]="menuItems" [showItemOnClick]="true"></ejs-menu>
      
      <h3>Hover to Open Submenu (Default)</h3>
      <ejs-menu [items]="menuItems" [showItemOnClick]="false"></ejs-menu>
    </div>
  `
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    {
      text: 'File',
      items: [
        { text: 'Open' },
        { text: 'Save' },
        { text: 'Exit' }
      ]
    },
    {
      text: 'Edit',
      items: [
        { text: 'Cut' },
        { text: 'Copy' },
        { text: 'Paste' }
      ]
    },
    {
      text: 'View',
      items: [
        {
          text: 'Toolbars',
          items: [
            { text: 'Menu Bar' },
            { text: 'Bookmarks Toolbar' }
          ]
        },
        {
          text: 'Zoom',
          items: [
            { text: 'Zoom In' },
            { text: 'Zoom Out' }
          ]
        }
      ]
    },
    { text: 'Help' }
  ];
}
```

### Opening Behaviors

| Property | Value | Behavior |
|----------|-------|----------|
| `showItemOnClick` | `false` | Submenu opens on **hover** (default) |
| `showItemOnClick` | `true` | Submenu opens on **click** only |

### Click-Based Opening

```typescript
public showItemOnClick: boolean = true;

// Template:
<ejs-menu [items]="menuItems" [showItemOnClick]="showItemOnClick"></ejs-menu>
```

**Use case:** Mobile menus or touch devices where hover is not available.

### Hover-Based Opening

```typescript
public showItemOnClick: boolean = false;  // or omit (default)

// Template:
<ejs-menu [items]="menuItems" [showItemOnClick]="false"></ejs-menu>
```

**Use case:** Desktop applications with mouse interaction.

## Sub-menu Position

Control the position of submenus relative to parent items. By default, submenus appear below or to the right of the parent. Use the `beforeOpen` event to customize positioning:

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel, BeforeOpenCloseMenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ejs-menu [items]="menuItems" (beforeOpen)="beforeOpen($event)"></ejs-menu>
    </div>
  `,
  styles: [`
    .submenu-left {
      /* Position submenu on left */
    }
    .submenu-right {
      /* Position submenu on right (default) */
    }
  `]
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    {
      text: 'File',
      items: [
        { text: 'New' },
        { text: 'Open' },
        { text: 'Save' }
      ]
    },
    {
      text: 'Edit',
      items: [
        { text: 'Cut' },
        { text: 'Copy' },
        { text: 'Paste' }
      ]
    }
  ];

  public beforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
    // Custom positioning logic before submenu opens
    console.log('Submenu opening:', args.element);
  }
}
```

### Sub-menu Positioning Patterns

#### Right Alignment (Default)
```
File  Edit  View
 └─ New
    └─ Submenu ──┐
                  └─ Item
```

#### Nested Multi-level Menus
```
File
 └─ New
     └─ Project
         └─ Web Application
             └─ Template Selection
```

#### Custom Positioning with CSS

```typescript
{
  text: 'View',
  items: [
    {
      text: 'Sidebar',
      htmlAttributes: {
        class: 'custom-position-left'
      }
    }
  ]
}
```

### Complete Animation and Orientation Example

```typescript
@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ejs-menu 
        [items]="menuItems"
        [animationSettings]="animationSettings"
        [orientation]="'Horizontal'"
        [showItemOnClick]="false">
      </ejs-menu>
    </div>
  `
})
export class AppComponent {
  public animationSettings: MenuAnimationSettingsModel = {
    effect: 'FadeIn',
    duration: 600,
    easing: 'ease-out'
  };

  public menuItems: MenuItemModel[] = [
    // Your menu items
  ];
}
```

---

**Next:** To handle menu events and customize behavior dynamically, see [references/events-and-interactions.md](events-and-interactions.md).
