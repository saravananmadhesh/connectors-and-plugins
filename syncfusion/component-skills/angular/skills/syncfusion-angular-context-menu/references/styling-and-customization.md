# Styling & Customization

## Table of Contents
- [Animation Settings](#animation-settings)
- [CSS Customization](#css-customization)
- [Icon Styling](#icon-styling)
- [URL Navigation](#url-navigation)
- [Scrollable Menus](#scrollable-menus)
- [Responsive Design](#responsive-design)

## Animation Settings

### Supported Animation Effects

The ContextMenu supports four animation effects:

| Effect | Behavior |
|--------|----------|
| **None** | No animation, menu appears instantly |
| **SlideDown** | Menu slides down from top (default) |
| **ZoomIn** | Menu scales from small to full size |
| **FadeIn** | Menu fades in gradually |

### Basic Animation Configuration

```typescript
import { Component } from '@angular/core';
import { ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel, MenuAnimationSettingsModel } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContextMenuModule],
  template: `
    <div class="e-section-control">
      <div id="target">Right click / Touch hold to open the ContextMenu</div>
      <ejs-contextmenu 
        target='#target' 
        [items]='menuItems'
        [animationSettings]='animationSettings'>
      </ejs-contextmenu>
    </div>
  `
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    { text: 'New' },
    { text: 'Open' },
    { text: 'Save' }
  ];

  public animationSettings: MenuAnimationSettingsModel = {
    effect: 'FadeIn',
    duration: 400
  };
}
```

### Animation Options

```typescript
// SlideDown effect (default)
public animationSettings1 = {
  effect: 'SlideDown',
  duration: 400,
  easing: 'ease'
};

// ZoomIn effect
public animationSettings2 = {
  effect: 'ZoomIn',
  duration: 600,
  easing: 'ease-out'
};

// FadeIn effect
public animationSettings3 = {
  effect: 'FadeIn',
  duration: 300,
  easing: 'linear'
};

// No animation
public animationSettings4 = {
  effect: 'None',
  duration: 0
};
```

### Custom Duration and Easing

```typescript
public animationSettings = {
  effect: 'SlideDown',
  duration: 800,      // 800ms animation time
  easing: 'ease-in-out'
};
```

### Complete Animation Example

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContextMenuModule],
  template: `
    <div class="e-section-control">
      <label>Select Animation:</label>
      <select [(ngModel)]='selectedEffect' (change)='updateAnimation()'>
        <option>SlideDown</option>
        <option>ZoomIn</option>
        <option>FadeIn</option>
        <option>None</option>
      </select>
      
      <div id="target">Right click / Touch hold</div>
      <ejs-contextmenu 
        target='#target' 
        [items]='menuItems'
        [animationSettings]='animationSettings'>
      </ejs-contextmenu>
    </div>
  `
})
export class AppComponent {
  public selectedEffect = 'SlideDown';
  public animationSettings: MenuAnimationSettingsModel = {
    effect: 'SlideDown',
    duration: 400
  };

  public menuItems: MenuItemModel[] = [
    { text: 'New' },
    { text: 'Open' },
    { text: 'Save' }
  ];

  updateAnimation(): void {
    this.animationSettings.effect = this.selectedEffect as any;
  }
}
```

## CSS Customization

### CSS Classes Reference

Target specific menu elements with these classes:

```css
/* Main wrapper */
.e-contextmenu-wrapper {
  background-color: #fff;
  border: 1px solid #ddd;
}

/* Menu item */
.e-contextmenu-wrapper .e-menu-parent {
  color: #333;
}

/* Menu item on hover */
.e-contextmenu-wrapper ul .e-menu-item:hover {
  background-color: #f0f0f0;
}

/* Selected item */
.e-contextmenu-wrapper ul .e-menu-item.e-selected {
  background-color: #007bff;
  color: #fff;
}

/*  context menu caret icon */
.e-contextmenu-wrapper ul .e-menu-item.e-selected .e-caret::before {
  color: inherit;
}

/* Caret/Arrow for submenus */
.e-contextmenu-wrapper ul .e-menu-item .e-menu-icon::before {
  color: inherit;
}

/* Disabled item */
.e-contextmenu-wrapper ul .e-menu-item.e-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Separator line */
.e-contextmenu-wrapper .e-separator {
  border-bottom: 1px solid #ddd;
  margin: 5px 0;
}
```

### Custom Theme Example

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContextMenuModule],
  template: `
    <div class="e-section-control">
      <div id="target">Right click / Touch hold</div>
      <ejs-contextmenu 
        target='#target' 
        [items]='menuItems'>
      </ejs-contextmenu>
    </div>
  `,
  styles: [`
    :host ::ng-deep .e-contextmenu-wrapper {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    :host ::ng-deep .e-contextmenu-wrapper ul .e-menu-item {
      color: #fff;
      padding: 12px 16px;
      font-weight: 500;
    }

    :host ::ng-deep .e-contextmenu-wrapper ul .e-menu-item:hover {
      background-color: rgba(255,255,255,0.2);
    }

    :host ::ng-deep .e-contextmenu-wrapper ul .e-menu-item.e-selected {
      background-color: rgba(255,255,255,0.3);
    }

    :host ::ng-deep .e-separator {
      background-color: rgba(255,255,255,0.3);
    }
  `]
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    { text: 'New' },
    { text: 'Open' },
    { separator: true },
    { text: 'Save' }
  ];
}
```

## Icon Styling

### Adding Icons with iconCss

Use the `iconCss` property to add icons from Syncfusion icon library:

```typescript
public menuItems: MenuItemModel[] = [
  { text: 'Cut', iconCss: 'e-cm-icons e-cut' },
  { text: 'Copy', iconCss: 'e-cm-icons e-copy' },
  { text: 'Paste', iconCss: 'e-cm-icons e-paste' },
  { separator: true },
  { text: 'Select All', iconCss: 'e-icons e-select-all' }
];
```

### Common Syncfusion Icons

```typescript
// File operations
{ text: 'New', iconCss: 'e-icons e-new' }
{ text: 'Open', iconCss: 'e-icons e-open' }
{ text: 'Save', iconCss: 'e-icons e-save' }
{ text: 'Delete', iconCss: 'e-icons e-delete' }

// Edit operations
{ text: 'Cut', iconCss: 'e-cm-icons e-cut' }
{ text: 'Copy', iconCss: 'e-cm-icons e-copy' }
{ text: 'Paste', iconCss: 'e-cm-icons e-paste' }
{ text: 'Undo', iconCss: 'e-icons e-undo' }
{ text: 'Redo', iconCss: 'e-icons e-redo' }

// Navigation
{ text: 'Back', iconCss: 'e-icons e-back' }
{ text: 'Forward', iconCss: 'e-icons e-forward' }
{ text: 'Refresh', iconCss: 'e-icons e-refresh' }

// Other
{ text: 'Settings', iconCss: 'e-icons e-settings' }
{ text: 'Help', iconCss: 'e-icons e-help' }
{ text: 'Info', iconCss: 'e-icons e-info' }
```

### Custom Icon Classes

Define custom icon classes in your CSS:

```typescript
@Component({
  template: `<ejs-contextmenu [items]='menuItems'></ejs-contextmenu>`,
  styles: [`
    .custom-icon-download::before {
      content: '⬇️';
    }

    .custom-icon-upload::before {
      content: '⬆️';
    }

    .custom-icon-share::before {
      content: '↗️';
    }
  `]
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    { text: 'Download', iconCss: 'custom-icon-download' },
    { text: 'Upload', iconCss: 'custom-icon-upload' },
    { text: 'Share', iconCss: 'custom-icon-share' }
  ];
}
```

## URL Navigation

### Navigate to External URLs

Configure menu items to navigate to URLs:

```typescript
import { Component } from '@angular/core';
import { ContextMenuModule, MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContextMenuModule],
  template: `
    <div class="e-section-control">
      <div id="target">Right click / Touch hold to open the ContextMenu</div>
      <ejs-contextmenu 
        target='#target' 
        [items]='menuItems'
        (beforeItemRender)='onBeforeItemRender($event)'>
      </ejs-contextmenu>
    </div>
  `
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    { text: 'Flipkart', iconCss: 'e-cart-icon e-link', url: 'https://www.flipkart.com' },
    { text: 'Amazon', iconCss: 'e-cart-icon e-link', url: 'https://www.amazon.com' },
    { separator: true },
    { text: 'GitHub', iconCss: 'e-code-icon e-link', url: 'https://github.com' }
  ];

  onBeforeItemRender(args: MenuEventArgs): void {
    if (args.item.url) {
      // Make URL items clickable
      args.element.style.cursor = 'pointer';
    }
  }
}
```

### Navigate via Event Handler

```typescript
onSelect(args: MenuEventArgs): void {
  if (args.item.url) {
    // Open in new tab
    window.open(args.item.url, '_blank');
  }
}
```

### Navigate to Routes

```typescript
import { Router } from '@angular/router';

export class AppComponent {
  constructor(private router: Router) {}

  onSelect(args: MenuEventArgs): void {
    switch (args.item.text) {
      case 'Dashboard':
        this.router.navigate(['/dashboard']);
        break;
      case 'Settings':
        this.router.navigate(['/settings']);
        break;
      case 'Profile':
        this.router.navigate(['/profile']);
        break;
    }
  }
}
```

## Scrollable Menus

### enableScrolling Property

Enable scrolling for menus with many items:

```typescript
import { Component } from '@angular/core';
import { ContextMenuModule, MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContextMenuModule],
  template: `
    <div class="e-section-control">
      <div id="target">Right click / Touch hold to open the ContextMenu</div>
      <ejs-contextmenu 
        target='#target' 
        [items]='menuItems'
        [enableScrolling]='true'
        (beforeOpen)='beforeOpen($event)'>
      </ejs-contextmenu>
    </div>
  `
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    { text: 'Option 1' },
    { text: 'Option 2' },
    { text: 'Option 3' },
    { text: 'Option 4' },
    { text: 'Option 5' },
    { text: 'Option 6' },
    { text: 'Option 7' },
    { text: 'Option 8' },
    { text: 'Option 9' },
    { text: 'Option 10' }
  ];

  beforeOpen(args: MenuEventArgs): void {
    if (args.element && args.element.parentElement) {
      // Set max height for scrollable area
      args.element.parentElement.style.height = '200px';
    }
  }
}
```

### Setting Menu Container Height

```typescript
beforeOpen(args: MenuEventArgs): void {
  if (args.element && args.element.parentElement) {
    args.element.parentElement.style.maxHeight = '300px';
    args.element.parentElement.style.overflowY = 'auto';
  }
}
```

## Responsive Design

### Mobile-Friendly Configuration

Adapt menu behavior for different devices:

```typescript
import { Component } from '@angular/core';
import { ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { Browser } from '@syncfusion/ej2-base';
import { MenuItemModel, MenuAnimationSettingsModel } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContextMenuModule],
  template: `
    <div class="e-section-control">
      <div id="target">Right click / Touch hold</div>
      <ejs-contextmenu 
        target='#target' 
        [items]='menuItems'
        [animationSettings]='animationSettings'>
      </ejs-contextmenu>
    </div>
  `
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    { text: 'New' },
    { text: 'Open' },
    { text: 'Save' }
  ];

  public animationSettings: MenuAnimationSettingsModel;

  constructor() {
    // Adjust animation for mobile devices
    if (Browser.isDevice) {
      this.animationSettings = {
        effect: 'ZoomIn',
        duration: 200
      };
    } else {
      this.animationSettings = {
        effect: 'SlideDown',
        duration: 400
      };
    }
  }
}
```

### Responsive Styling

```typescript
@Component({
  selector: 'app-root',
  template: `<ejs-contextmenu [items]='menuItems'></ejs-contextmenu>`,
  styles: [`
    :host ::ng-deep .e-contextmenu-wrapper {
      font-size: 14px;
    }

    /* Tablet screens */
    @media (max-width: 768px) {
      :host ::ng-deep .e-contextmenu-wrapper ul .e-menu-item {
        padding: 12px 16px;
        font-size: 16px;
      }
    }

    /* Mobile screens */
    @media (max-width: 480px) {
      :host ::ng-deep .e-contextmenu-wrapper ul .e-menu-item {
        padding: 16px 20px;
        font-size: 18px;
      }
    }
  `]
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    { text: 'New' },
    { text: 'Open' },
    { text: 'Save' }
  ];
}
```

## Complete Example: Advanced Customization

```typescript
import { Component, ViewChild } from '@angular/core';
import { ContextMenuComponent, ContextMenuModule, MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel, MenuAnimationSettingsModel } from '@syncfusion/ej2-navigations';
import { Browser } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContextMenuModule],
  template: `
    <div class="e-section-control">
      <div id="target">Right click / Touch hold</div>
      
      <ejs-contextmenu 
        #contextmenu
        target='#target' 
        [items]='menuItems'
        [animationSettings]='animationSettings'
        [enableScrolling]='true'
        (beforeOpen)='beforeOpen($event)'
        (select)='onSelect($event)'>
      </ejs-contextmenu>
    </div>
  `,
  styles: [`
    :host ::ng-deep .e-contextmenu-wrapper {
      background: #f8f9fa;
      border: 2px solid #dee2e6;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.12);
    }

    :host ::ng-deep .e-contextmenu-wrapper ul .e-menu-item {
      color: #212529;
      padding: 10px 16px;
      transition: all 0.2s ease;
    }

    :host ::ng-deep .e-contextmenu-wrapper ul .e-menu-item:hover {
      background-color: #e7f1ff;
      color: #0066cc;
    }

    :host ::ng-deep .e-contextmenu-wrapper ul .e-menu-item.e-selected {
      background-color: #0066cc;
      color: #fff;
    }

    :host ::ng-deep .e-separator {
      background-color: #dee2e6;
      margin: 5px 0;
    }
  `]
})
export class AppComponent {
  @ViewChild('contextmenu')
  public contextmenu?: ContextMenuComponent;

  public menuItems: MenuItemModel[] = [
    { text: 'New', iconCss: 'e-icons e-new' },
    { text: 'Open', iconCss: 'e-icons e-open' },
    { text: 'Save', iconCss: 'e-icons e-save' },
    { separator: true },
    { text: 'Print', iconCss: 'e-icons e-print' },
    { text: 'Settings', iconCss: 'e-icons e-settings' }
  ];

  public animationSettings: MenuAnimationSettingsModel = Browser.isDevice
    ? { effect: 'ZoomIn', duration: 200 }
    : { effect: 'SlideDown', duration: 400 };

  beforeOpen(args: MenuEventArgs): void {
    if (args.element && args.element.parentElement) {
      args.element.parentElement.style.maxHeight = '300px';
    }
  }

  onSelect(args: MenuEventArgs): void {
    console.log(`Selected: ${args.item.text}`);
  }
}
```

---

**Next:** Create custom templates and advanced features in [references/templates-and-advanced.md](../templates-and-advanced.md).
