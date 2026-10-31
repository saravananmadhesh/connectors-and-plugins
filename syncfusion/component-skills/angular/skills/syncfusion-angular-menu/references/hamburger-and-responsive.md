# Hamburger Mode and Responsive Menu

## Table of Contents
- [Overview](#overview)
- [Hamburger Mode Properties](#hamburger-mode-properties)
- [Basic Hamburger Implementation](#basic-hamburger-implementation)
- [Advanced Hamburger Patterns](#advanced-hamburger-patterns)
- [Mobile Responsive Menu](#mobile-responsive-menu)
- [State Persistence](#state-persistence)
- [Best Practices](#best-practices)

---

## Overview

Hamburger mode transforms the menu into a collapsible drawer menu, ideal for mobile and responsive layouts. When enabled, menu items are hidden by default and revealed through a toggle button (hamburger icon).

**Key Features:**
- Collapsible menu drawer
- Mobile-friendly interaction
- Toggle animation support
- Responsive design ready
- Touch-friendly interface

---

## Hamburger Mode Properties

### Core Properties

| Property | Type | Purpose |
|----------|------|---------|
| `hamburgerMode` | `boolean` | Enables/disables hamburger mode |
| `target` | `string` | Selector for toggle button element |
| `title` | `string` | Title displayed in hamburger drawer |

### Example Configuration

```typescript
@Component({
  template: `
    <ejs-menu 
      [items]="menuItems"
      [hamburgerMode]="true"
      [target]="'#menu-toggle'"
      [title]="'Navigation'">
    </ejs-menu>
  `
})
export class MenuComponent { }
```

---

## Basic Hamburger Implementation

### Simple Hamburger Menu

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-hamburger-menu',
  template: `
    <header class="app-header">
      <div class="header-content">
        <h1 class="app-title">My App</h1>
        <button 
          id="menu-toggle" 
          class="hamburger-btn"
          title="Toggle Menu">
          <span class="hamburger-icon">☰</span>
        </button>
      </div>
    </header>
    
    <ejs-menu 
      #menu
      [items]="menuItems"
      [hamburgerMode]="true"
      [target]="'#menu-toggle'"
      [title]="'Menu'"
      [cssClass]="'mobile-menu'">
    </ejs-menu>
  `,
  styles: [`
    :host ::ng-deep .app-header {
      background: #2c3e50;
      color: white;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    :host ::ng-deep .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    
    :host ::ng-deep .hamburger-btn {
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
    }
    
    :host ::ng-deep .hamburger-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
    }
    
    :host ::ng-deep .mobile-menu.e-menu {
      background: #34495e;
      color: white;
    }
    
    :host ::ng-deep .mobile-menu.e-menu-item:hover {
      background: #2c3e50;
    }
  `]
})
export class HamburgerMenuComponent {
  public menuItems: MenuItemModel[] = [
    {
      text: 'Home',
      iconCss: 'e-icons e-home',
      url: '/'
    },
    {
      text: 'Products',
      iconCss: 'e-icons e-shopping',
      items: [
        { text: 'Electronics', url: '/products/electronics' },
        { text: 'Books', url: '/products/books' },
        { text: 'Clothing', url: '/products/clothing' }
      ]
    },
    {
      text: 'Services',
      iconCss: 'e-icons e-settings',
      items: [
        { text: 'Consulting', url: '/services/consulting' },
        { text: 'Support', url: '/services/support' },
        { text: 'Training', url: '/services/training' }
      ]
    },
    {
      text: 'About Us',
      iconCss: 'e-icons e-info',
      url: '/about'
    },
    {
      text: 'Contact',
      iconCss: 'e-icons e-mail',
      url: '/contact'
    }
  ];
}
```

---

## Advanced Hamburger Patterns

### Responsive Toggle (Desktop/Mobile)

```typescript
import { Component, HostListener } from '@angular/core';
import { MenuComponent } from '@syncfusion/ej2-angular-navigations';
import { ViewChild } from '@angular/core';

@Component({
  template: `
    <div [class.desktop-view]="isDesktop">
      <button 
        *ngIf="!isDesktop"
        id="menu-toggle" 
        class="hamburger-btn"
        (click)="toggleMobileMenu()">
        ☰ Menu
      </button>
      
      <ejs-menu 
        #menu
        [items]="menuItems"
        [hamburgerMode]="!isDesktop"
        [target]="'#menu-toggle'"
        [title]="'Menu'"
        [orientation]="isDesktop ? 'Horizontal' : 'Vertical'">
      </ejs-menu>
    </div>
  `,
  styles: [`
    :host.desktop-view ::ng-deep .e-menu {
      display: block;
    }
    
    :host ::ng-deep .hamburger-btn {
      display: block;
      background: #2c3e50;
      color: white;
      border: none;
      padding: 0.75rem 1rem;
      cursor: pointer;
      font-size: 1rem;
      border-radius: 4px;
    }
    
    :host ::ng-deep .hamburger-btn:hover {
      background: #34495e;
    }
  `]
})
export class ResponsiveMenuComponent {
  @ViewChild('menu')
  public menuObj?: MenuComponent;

  public isDesktop: boolean = window.innerWidth > 768;

  public menuItems: MenuItemModel[] = [
    // ... menu items
  ];

  @HostListener('window:resize', ['$event'])
  public onWindowResize(event: Event): void {
    const width = (event.target as Window).innerWidth;
    this.isDesktop = width > 768;
  }

  public toggleMobileMenu(): void {
    // Toggle mobile menu visibility
    console.log('Menu toggled');
  }
}
```

### Hamburger with Animation

```typescript
import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  template: `
    <header [@headerSlide]="isMenuOpen ? 'open' : 'closed'">
      <button 
        id="menu-toggle"
        (click)="isMenuOpen = !isMenuOpen"
        [@hamburgerRotate]="isMenuOpen ? 'rotated' : 'normal'">
        ☰
      </button>
    </header>
    
    <ejs-menu 
      #menu
      [items]="menuItems"
      [hamburgerMode]="true"
      [target]="'#menu-toggle'"
      [@slideIn]="isMenuOpen ? 'in' : 'out'">
    </ejs-menu>
  `,
  animations: [
    trigger('hamburgerRotate', [
      state('normal', style({ transform: 'rotate(0deg)' })),
      state('rotated', style({ transform: 'rotate(90deg)' })),
      transition('normal <=> rotated', animate('300ms ease-in-out'))
    ]),
    trigger('slideIn', [
      state('in', style({ transform: 'translateX(0)', opacity: 1 })),
      state('out', style({ transform: 'translateX(-100%)', opacity: 0 })),
      transition('in <=> out', animate('300ms ease-in-out'))
    ]),
    trigger('headerSlide', [
      state('open', style({ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' })),
      state('closed', style({ boxShadow: 'none' })),
      transition('open <=> closed', animate('300ms ease-in-out'))
    ])
  ]
})
export class AnimatedHamburgerComponent {
  public isMenuOpen: boolean = false;

  public menuItems: MenuItemModel[] = [
    // ... menu items
  ];
}
```

---

## Mobile Responsive Menu

### Complete Mobile Menu Solution

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [MenuModule, CommonModule],
  standalone: true,
  selector: 'app-mobile-menu',
  template: `
    <div class="mobile-container">
      <!-- Mobile Header -->
      <header class="mobile-header">
        <button 
          id="menu-toggle"
          class="menu-trigger"
          (click)="toggleMenu()">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
        <h1 class="mobile-title">App Name</h1>
        <button class="user-menu" (click)="toggleUserMenu()">
          <span class="user-icon">👤</span>
        </button>
      </header>

      <!-- Mobile Menu -->
      <div class="menu-wrapper" [class.open]="menuOpen">
        <ejs-menu 
          #menu
          [items]="menuItems"
          [hamburgerMode]="true"
          [target]="'#menu-toggle'"
          [enablePersistence]="true"
          [cssClass]="'mobile-menu'">
        </ejs-menu>
      </div>

      <!-- Main Content -->
      <main class="mobile-content">
        <p>Your content here</p>
      </main>
    </div>
  `,
  styles: [`
    :host ::ng-deep .mobile-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }

    :host ::ng-deep .mobile-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    :host ::ng-deep .menu-trigger {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 0.5rem;
    }

    :host ::ng-deep .hamburger-line {
      width: 24px;
      height: 2px;
      background: white;
      transition: all 0.3s ease;
    }

    :host ::ng-deep .mobile-title {
      flex: 1;
      text-align: center;
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
    }

    :host ::ng-deep .user-menu {
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid white;
      color: white;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      cursor: pointer;
      font-size: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    :host ::ng-deep .user-menu:active {
      background: rgba(255, 255, 255, 0.3);
    }

    :host ::ng-deep .menu-wrapper {
      position: fixed;
      top: 57px;
      left: -300px;
      width: 300px;
      height: calc(100vh - 57px);
      background: white;
      transition: left 0.3s ease;
      z-index: 99;
      overflow-y: auto;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
    }

    :host ::ng-deep .menu-wrapper.open {
      left: 0;
    }

    :host ::ng-deep .mobile-menu.e-menu {
      border: none;
      box-shadow: none;
    }

    :host ::ng-deep .mobile-menu.e-menu-item {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #f0f0f0;
    }

    :host ::ng-deep .mobile-menu.e-menu-item:hover {
      background: #f8f9fa;
    }

    :host ::ng-deep .mobile-content {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
    }

    @media (max-width: 480px) {
      :host ::ng-deep .mobile-title {
        font-size: 1rem;
      }

      :host ::ng-deep .menu-wrapper {
        width: 80vw;
        left: -80vw;
      }
    }
  `]
})
export class MobileMenuComponent implements OnInit {
  public menuOpen: boolean = false;

  public menuItems: MenuItemModel[] = [
    {
      text: 'Dashboard',
      iconCss: 'e-icons e-home',
      url: '/dashboard'
    },
    {
      text: 'Profile',
      iconCss: 'e-icons e-user',
      items: [
        { text: 'View Profile', url: '/profile' },
        { text: 'Edit Profile', url: '/profile/edit' },
        { text: 'Settings', url: '/settings' }
      ]
    },
    {
      text: 'Notifications',
      iconCss: 'e-icons e-bell',
      url: '/notifications'
    },
    {
      text: 'Support',
      iconCss: 'e-icons e-help',
      items: [
        { text: 'Help Center', url: '/help' },
        { text: 'Contact Us', url: '/contact' },
        { text: 'FAQ', url: '/faq' }
      ]
    },
    { separator: true },
    {
      text: 'Logout',
      iconCss: 'e-icons e-logout',
      url: '/logout'
    }
  ];

  ngOnInit(): void {
    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!(e.target as HTMLElement).closest('#menu-toggle') && 
          !(e.target as HTMLElement).closest('.menu-wrapper')) {
        this.menuOpen = false;
      }
    });
  }

  public toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  public toggleUserMenu(): void {
    console.log('User menu clicked');
  }
}
```

---

## State Persistence

### Persistent Hamburger Menu State

```typescript
@Component({
  template: `
    <ejs-menu 
      [items]="menuItems"
      [hamburgerMode]="true"
      [target]="'#menu-toggle'"
      [enablePersistence]="true"
      [cssClass]="'persistent-menu'">
    </ejs-menu>
  `
})
export class PersistentMenuComponent {
  public menuItems: MenuItemModel[] = [
    // ... menu items
  ];
}
```

**How It Works:**
1. User opens submenu items
2. State is automatically saved to localStorage
3. User closes browser
4. User returns to site
5. Previous menu state is restored (same items remain open)

**localStorage Key:** `ejs_persist_<MenuId>`

---

## Best Practices

### 1. Accessibility
```typescript
<button 
  id="menu-toggle"
  aria-label="Toggle navigation menu"
  aria-expanded="false"
  (click)="toggleMenu()">
  ☰
</button>

<ejs-menu 
  [items]="menuItems"
  [hamburgerMode]="true"
  role="navigation"
  aria-label="Main navigation">
</ejs-menu>
```

### 2. Performance
- Use `enablePersistence` to reduce re-renders
- Lazy load submenu items if needed
- Avoid excessive animations on mobile

### 3. User Experience
- Keep menu items to 5-7 top level
- Use clear icons with text labels
- Provide visual feedback on clicks
- Ensure adequate touch target size (44x44 px minimum)

### 4. Responsive Breakpoints
```typescript
@HostListener('window:resize', ['$event'])
public onResize(event: Event): void {
  const width = window.innerWidth;
  
  if (width > 1024) {
    // Desktop: Horizontal menu
    this.showHorizontal();
  } else if (width > 768) {
    // Tablet: Vertical sidebar
    this.showVerticalSidebar();
  } else {
    // Mobile: Hamburger
    this.showHamburger();
  }
}
```

---

**Next:** For advanced state management and scrolling features, see [references/advanced-features.md](advanced-features.md).

