# Advanced Features and Scrolling

## Table of Contents
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [Horizontal Scrolling](#horizontal-scrolling)
- [Vertical Scrolling](#vertical-scrolling)
- [Large Menu Handling](#large-menu-handling)
- [Menu Item Grouping](#menu-item-grouping)
- [Accessibility Features](#accessibility-features)
- [Nested Submenu Patterns](#nested-submenu-patterns)

## Right-to-Left (RTL) Support

Enable RTL layout for languages that read right-to-left (Arabic, Hebrew, Urdu, etc.) using the `enableRtl` property:

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
      <ejs-menu 
        [items]="menuItems" 
        [enableRtl]="true"
        [orientation]="'Horizontal'">
      </ejs-menu>
    </div>
  `,
  styles: [`
    .e-section-control {
      direction: rtl;
      text-align: right;
    }
  `]
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    {
      text: 'ملف',  // File in Arabic
      items: [
        { text: 'فتح' },   // Open
        { text: 'حفظ' },   // Save
        { text: 'خروج' }   // Exit
      ]
    },
    {
      text: 'تحرير',       // Edit
      items: [
        { text: 'قص' },    // Cut
        { text: 'نسخ' },   // Copy
        { text: 'لصق' }    // Paste
      ]
    },
    { text: 'مساعدة' }     // Help
  ];
}
```

### RTL with HTML Direction

Set the HTML `dir` attribute for proper text alignment:

```html
<!-- In index.html or component template -->
<html dir="rtl">
  <head>...</head>
  <body>
    <app-root></app-root>
  </body>
</html>
```

### Dynamic RTL Toggle

```typescript
public enableRtl: boolean = false;

public toggleRtl(): void {
  this.enableRtl = !this.enableRtl;
  document.documentElement.dir = this.enableRtl ? 'rtl' : 'ltr';
}

// In template:
// <button (click)="toggleRtl()">Toggle RTL</button>
```

## Horizontal Scrolling

Enable horizontal scrolling for menus with many items that exceed container width:

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ejs-menu 
        [items]="menuItems"
        [hScroll]="true">
      </ejs-menu>
    </div>
  `,
  styles: [`
    .e-menu {
      width: 500px;  /* Constrain width to trigger scroll */
      overflow-x: auto;
    }
  `]
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    { text: 'Home' },
    { text: 'About' },
    { text: 'Services' },
    { text: 'Products' },
    { text: 'Solutions' },
    { text: 'Resources' },
    { text: 'Contact' },
    { text: 'Blog' },
    { text: 'FAQ' },
    { text: 'Support' }
  ];
}
```

### hScroll Interface

```typescript
export interface HScroll {
  scrollStep?: number;        // Pixels per scroll
  scrollFrequency?: number;   // Scroll speed (ms)
}

public hScroll: HScroll = {
  scrollStep: 100,
  scrollFrequency: 50
};
```

### Horizontal Scroll Example

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel, hScrollModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ejs-menu 
        [items]="menuItems"
        [hScroll]="hScrollSettings">
      </ejs-menu>
    </div>
  `
})
export class AppComponent {
  public hScrollSettings: hScrollModel = {
    enable: true,
    scrollStep: 100
  };

  public menuItems: MenuItemModel[] = [
    { text: 'Dashboard' },
    { text: 'Accounts' },
    { text: 'Reports' },
    { text: 'Analytics' },
    { text: 'Performance' },
    { text: 'Revenue' },
    { text: 'Profit' },
    { text: 'Growth' }
  ];
}
```

## Vertical Scrolling

Enable vertical scrolling for dropdown menus with many items:

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ejs-menu 
        [items]="menuItems"
        [vScroll]="vScrollSettings"
        [orientation]="'Vertical'">
      </ejs-menu>
    </div>
  `
})
export class AppComponent {
  public vScrollSettings: any = {
    enable: true,
    scrollStep: 50
  };

  public menuItems: MenuItemModel[] = [
    { text: 'Item 1' },
    { text: 'Item 2' },
    { text: 'Item 3' },
    { text: 'Item 4' },
    { text: 'Item 5' },
    { text: 'Item 6' },
    { text: 'Item 7' },
    { text: 'Item 8' },
    { text: 'Item 9' },
    { text: 'Item 10' },
    { text: 'Item 11' },
    { text: 'Item 12' },
    { text: 'Item 13' },
    { text: 'Item 14' },
    { text: 'Item 15' }
  ];
}
```

## Large Menu Handling

### Strategy 1: Split into Categories

Instead of a single large menu, organize items into logical categories:

```typescript
public menuItems: MenuItemModel[] = [
  {
    text: 'File Management',
    items: [
      { text: 'New', iconCss: 'e-icons e-new' },
      { text: 'Open', iconCss: 'e-icons e-open' },
      { text: 'Save', iconCss: 'e-icons e-save' }
    ]
  },
  {
    text: 'Edit Tools',
    items: [
      { text: 'Cut', iconCss: 'e-icons e-cut' },
      { text: 'Copy', iconCss: 'e-icons e-copy' },
      { text: 'Paste', iconCss: 'e-icons e-paste' }
    ]
  },
  {
    text: 'View Options',
    items: [
      { text: 'Zoom In' },
      { text: 'Zoom Out' },
      { text: 'Fit to Width' }
    ]
  }
];
```

### Strategy 2: Implement Search

Add search functionality for large menus:

```typescript
@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <input 
        type="text" 
        placeholder="Search menu items..." 
        (keyup)="filterMenu($event)"
        class="menu-search">
      <ejs-menu [items]="filteredMenuItems"></ejs-menu>
    </div>
  `,
  styles: [`
    .menu-search {
      width: 100%;
      padding: 8px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `]
})
export class AppComponent {
  public allMenuItems: MenuItemModel[] = [
    // ... large menu items
  ];

  public filteredMenuItems: MenuItemModel[] = this.allMenuItems;

  public filterMenu(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    
    if (!searchTerm) {
      this.filteredMenuItems = this.allMenuItems;
      return;
    }

    this.filteredMenuItems = this.allMenuItems.filter(item =>
      item.text?.toLowerCase().includes(searchTerm)
    );
  }
}
```

## Menu Item Grouping

Use separators to organize related menu items:

```typescript
public menuItems: MenuItemModel[] = [
  {
    text: 'File',
    items: [
      { text: 'New' },
      { text: 'Open' },
      { text: 'Recent', items: [
        { text: 'Document 1' },
        { text: 'Document 2' }
      ]},
      { separator: true },
      { text: 'Save' },
      { text: 'Save As' },
      { separator: true },
      { text: 'Exit' }
    ]
  }
];
```

## Accessibility Features

### Keyboard Navigation

The Menu supports full keyboard navigation:

| Key | Action |
|-----|--------|
| `Arrow Up/Down` | Navigate menu items |
| `Arrow Left/Right` | Open/close submenus |
| `Enter` | Select item |
| `Escape` | Close submenu |

### ARIA Attributes

Ensure proper ARIA labels for screen readers:

```typescript
public menuItems: MenuItemModel[] = [
  {
    text: 'File',
    htmlAttributes: {
      'role': 'menuitem',
      'aria-label': 'File menu',
      'aria-haspopup': 'true'
    },
    items: [
      {
        text: 'Open',
        htmlAttributes: {
          'role': 'menuitem',
          'aria-label': 'Open file'
        }
      }
    ]
  }
];
```

### Screen Reader Support

```css
/* Hide visual-only elements from screen readers */
.icon-only::after {
  content: attr(aria-label);
  clip: rect(0 0 0 0);
  overflow: hidden;
  position: absolute;
}
```

### Complete Accessibility Example

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
      <nav role="navigation" aria-label="Main navigation">
        <ejs-menu 
          [items]="menuItems"
          role="menubar">
        </ejs-menu>
      </nav>
    </div>
  `
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    {
      text: 'File',
      htmlAttributes: {
        'aria-label': 'File operations',
        'role': 'menuitem'
      },
      items: [
        {
          text: 'New',
          htmlAttributes: { 'aria-label': 'Create new document' }
        },
        {
          text: 'Open',
          htmlAttributes: { 'aria-label': 'Open existing document' }
        }
      ]
    }
  ];
}
```

## Nested Submenu Patterns

### 3-Level Deep Menu

```typescript
public menuItems: MenuItemModel[] = [
  {
    text: 'Products',
    items: [
      {
        text: 'Electronics',
        items: [
          { text: 'Laptops' },
          { text: 'Phones' },
          { text: 'Tablets' }
        ]
      },
      {
        text: 'Clothing',
        items: [
          { text: 'Men' },
          { text: 'Women' },
          { text: 'Kids' }
        ]
      }
    ]
  }
];
```

### 4-Level Deep Menu

```typescript
public menuItems: MenuItemModel[] = [
  {
    text: 'Organization',
    items: [
      {
        text: 'Departments',
        items: [
          {
            text: 'Engineering',
            items: [
              { text: 'Frontend' },
              { text: 'Backend' },
              { text: 'DevOps' }
            ]
          },
          {
            text: 'Sales',
            items: [
              { text: 'US Region' },
              { text: 'EU Region' },
              { text: 'Asia Region' }
            ]
          }
        ]
      }
    ]
  }
];
```

### Limiting Submenu Depth

In practice, keep nesting to 2-3 levels for usability:

```typescript
// ✅ Good: 2-3 levels
{
  text: 'Level 1',
  items: [
    {
      text: 'Level 2',
      items: [
        { text: 'Level 3' }
      ]
    }
  ]
}

// ⚠️ Avoid: 4+ levels
// Creates complex UX and harder to navigate
```

### Complete Advanced Features Example

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
      <ejs-menu 
        [items]="menuItems"
        [enableRtl]="false"
        [hScroll]="false"
        orientation="Horizontal">
      </ejs-menu>
    </div>
  `
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    {
      text: 'Catalog',
      iconCss: 'e-icons e-list',
      items: [
        { text: 'Electronics' },
        { text: 'Books' },
        { text: 'Clothing' }
      ]
    },
    {
      text: 'Account',
      iconCss: 'e-icons e-user',
      items: [
        { text: 'Profile' },
        { text: 'Settings' },
        { separator: true },
        { text: 'Logout' }
      ]
    }
  ];
}
```

---

**Next:** For real-world implementation patterns, see [references/use-cases-and-scenarios.md](use-cases-and-scenarios.md).
