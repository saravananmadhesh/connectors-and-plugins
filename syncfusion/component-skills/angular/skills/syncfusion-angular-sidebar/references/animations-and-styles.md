# Sidebar Animations and Styling

## Table of Contents
- [Animation Control](#animation-control)
- [Animation Types](#animation-types)
- [CSS Theming](#css-theming)
- [RTL Support](#rtl-support)
- [Responsive Design](#responsive-design)
- [Custom Styling](#custom-styling)

## Animation Control

Enable or disable expand/collapse animations using the `animate` property (enabled by default):

```typescript
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [SidebarModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-sidebar id="default-sidebar" #sidebar 
              [animate]="animateEnabled"
              (created)="onCreated($event)"
              style="visibility: hidden">
              <div class="title">Sidebar content</div>
              <button (click)="closeSidebar()">Close</button>
            </ejs-sidebar>
            <div>
              <div class="title">Main content</div>
              <div class="controls">
                <label>
                  <input type="checkbox" 
                         [(ngModel)]="animateEnabled"
                         (change)="updateAnimation()">
                  Enable Animation
                </label>
              </div>
              <button (click)="toggleSidebar()">Toggle Sidebar</button>
            </div>`
})
export class AnimationControlComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;
  animateEnabled = true;

  onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
  }

  updateAnimation() {
    if (this.sidebar) {
      (this.sidebar as SidebarComponent).animate = this.animateEnabled;
      (this.sidebar as SidebarComponent).dataBind();
    }
  }

  toggleSidebar() {
    this.sidebar?.toggle();
  }

  closeSidebar() {
    this.sidebar?.hide();
  }
}
```

### Animation Duration

Control animation speed with CSS transitions:

```css
:host ::ng-deep {
  .e-sidebar {
    transition: all 0.3s ease-in-out !important;
  }
}
```

## Animation Types

Syncfusion provides built-in animation variations through CSS classes and positioning types:

### Push Type Animation

Smooth slide-and-resize animation:

```typescript
@Component({
  template: `<ejs-sidebar #sidebar 
              type="Push"
              [animate]="true"
              [width]="'280px'">
            </ejs-sidebar>`
})
export class PushAnimationComponent { }
```

### Slide Type Animation

Content shifts with sidebar expansion:

```typescript
@Component({
  template: `<ejs-sidebar #sidebar 
              type="Slide"
              [animate]="true"
              [width]="'280px'">
            </ejs-sidebar>`
})
export class SlideAnimationComponent { }
```

### Over Type Animation

Sidebar animates over main content:

```typescript
@Component({
  template: `<ejs-sidebar #sidebar 
              type="Over"
              [animate]="true"
              [width]="'280px'>
            </ejs-sidebar>`
})
export class OverAnimationComponent { }
```

## CSS Theming

### Available Themes

Import theme CSS in `src/styles.css`:

```css
/* Material 3 (Default, Modern) */
@import '@syncfusion/ej2-base/styles/material3.css';
@import '@syncfusion/ej2-angular-navigations/styles/material3.css';

/* Bootstrap 5 */
@import '@syncfusion/ej2-base/styles/bootstrap5.css';
@import '@syncfusion/ej2-angular-navigations/styles/bootstrap5.css';

/* Fluent Design */
@import '@syncfusion/ej2-base/styles/fluent.css';
@import '@syncfusion/ej2-angular-navigations/styles/fluent.css';

/* Tailwind */
@import '@syncfusion/ej2-base/styles/tailwind.css';
@import '@syncfusion/ej2-angular-navigations/styles/tailwind.css';

/* High Contrast (Accessibility) */
@import '@syncfusion/ej2-base/styles/highcontrast.css';
@import '@syncfusion/ej2-angular-navigations/styles/highcontrast.css';
```

### Theme Switching at Runtime

Switch themes dynamically:

```typescript
@Component({
  selector: 'app-root',
  template: `<select (change)="changeTheme($event)">
              <option value="material3">Material 3</option>
              <option value="bootstrap5">Bootstrap 5</option>
              <option value="fluent">Fluent</option>
              <option value="tailwind">Tailwind</option>
            </select>
            <ejs-sidebar #sidebar></ejs-sidebar>`
})
export class ThemeSwitchComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;
  currentTheme = 'material3';

  changeTheme(event: any) {
    const theme = event.target.value;
    this.currentTheme = theme;

    // Remove all theme classes
    document.body.classList.remove('e-material3', 'e-bootstrap5', 'e-fluent', 'e-tailwind');

    // Add new theme class
    document.body.classList.add(`e-${theme}`);

    // Rebind component
    this.sidebar?.dataBind();
  }
}
```

## RTL Support

Enable right-to-left layout for Arabic, Hebrew, and other RTL languages using `enableRtl`:

```typescript
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [SidebarModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-sidebar id="default-sidebar" #sidebar 
              [enableRtl]="true"
              position="Right"
              [animate]="true"
              (created)="onCreated($event)"
              style="visibility: hidden">
              <div class="title">محتوى الشريط الجانبي</div>
              <button (click)="closeSidebar()">إغلاق</button>
            </ejs-sidebar>
            <div [dir]="'rtl'">
              <div class="title">المحتوى الرئيسي</div>
              <button (click)="toggleSidebar()">قائمة</button>
            </div>`
})
export class RTLSidebarComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
    // Set HTML dir attribute for RTL
    document.documentElement.dir = 'rtl';
  }

  toggleSidebar() {
    this.sidebar?.toggle();
  }

  closeSidebar() {
    this.sidebar?.hide();
  }
}
```

### RTL CSS

Apply RTL styles:

```css
:host-context([dir="rtl"]) {
  .e-sidebar {
    transform: translateX(-100%);
  }
  
  .sidebar-nav {
    text-align: right;
  }
  
  .sidebar-nav .icon {
    margin-left: 10px;
    margin-right: 0;
  }
}
```

## Responsive Design

### Media Query Responsive

Use media queries to automatically switch sidebar behavior:

```typescript
@Component({
  selector: 'app-responsive-sidebar',
  template: `<ejs-sidebar #sidebar 
              [type]="sidebarType"
              [mediaQuery]="mediaQuery"
              (created)="onCreated($event)"
              style="visibility: hidden">
              <div class="nav-items">
                <ul>
                  <li>Home</li>
                  <li>About</li>
                  <li>Services</li>
                </ul>
              </div>
            </ejs-sidebar>
            <div class="main-container">
              <header class="app-header">
                <button (click)="toggleSidebar()">☰</button>
              </header>
              <main class="content">
                Responsive content area
              </main>
            </div>`,
  styles: [`
    :host {
      --sidebar-width: 280px;
    }
    
    /* Mobile */
    @media (max-width: 768px) {
      :host {
        --sidebar-width: 240px;
      }
    }
    
    /* Small devices */
    @media (max-width: 480px) {
      :host {
        --sidebar-width: 200px;
      }
    }
  `]
})
export class ResponsiveSidebarComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;
  
  sidebarType = 'Auto';
  mediaQuery = window.matchMedia('(max-width: 768px)');

  onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
  }

  toggleSidebar() {
    this.sidebar?.toggle();
  }
}
```

### Responsive Breakpoints

```css
/* Desktop: Sidebar always visible */
@media (min-width: 1200px) {
  .e-sidebar {
    position: relative;
    width: 280px;
  }
}

/* Tablet: Sidebar collapsible */
@media (min-width: 768px) and (max-width: 1199px) {
  .e-sidebar {
    width: 240px;
  }
}

/* Mobile: Sidebar overlay */
@media (max-width: 767px) {
  .e-sidebar {
    width: 200px;
    position: fixed;
  }
}
```

## Custom Styling

### Custom CSS Classes

Apply custom styles to sidebar:

```typescript
@Component({
  selector: 'app-custom-style',
  template: `<ejs-sidebar #sidebar 
              cssClass="custom-sidebar"
              (created)="onCreated($event)"
              style="visibility: hidden">
              <div class="sidebar-content">
                Custom styled sidebar
              </div>
            </ejs-sidebar>`,
  styles: [`
    :host ::ng-deep {
      .custom-sidebar {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }
      
      .custom-sidebar .sidebar-content {
        padding: 20px;
      }
      
      .custom-sidebar a {
        color: #e0e0e0;
        text-decoration: none;
      }
      
      .custom-sidebar a:hover {
        color: white;
        background: rgba(255,255,255,0.1);
      }
    }
  `]
})
export class CustomStyleComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
  }
}
```

### Color Customization

```css
:host ::ng-deep {
  .e-sidebar {
    /* Background */
    background-color: #f8f9fa;
    
    /* Text Color */
    color: #333;
    
    /* Border */
    border-right: 1px solid #e0e0e0;
  }
  
  .e-sidebar .nav-item {
    color: #555;
    padding: 12px 20px;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .e-sidebar .nav-item:hover {
    background: #e8f4f8;
    color: #667eea;
  }
  
  .e-sidebar .nav-item.active {
    background: #667eea;
    color: white;
  }
}
```

### Docked State Styling

```css
:host ::ng-deep {
  /* Docked (collapsed) state */
  .e-dock.e-close {
    width: 72px !important;
  }
  
  .e-dock.e-close .e-text {
    display: none;
  }
  
  .e-dock.e-close .icon {
    display: block;
    text-align: center;
  }
  
  /* Open state */
  .e-dock.e-open {
    width: 220px !important;
  }
  
  .e-dock.e-open .e-text {
    display: inline;
  }
}
```

## Complete Example: Styled Application Shell

```typescript
@Component({
  selector: 'app-shell',
  template: `<ejs-sidebar #sidebar 
              cssClass="app-sidebar"
              type="Push"
              [animate]="true"
              [enableRtl]="isRTL"
              (created)="onCreated($event)"
              style="visibility: hidden">
              <div class="sidebar-header">
                <img src="assets/logo.svg" alt="App Logo">
                <h2>MyApp</h2>
              </div>
              <nav class="sidebar-nav">
                <a href="#" class="nav-item active">
                  <span class="icon home"></span>
                  <span class="text">Home</span>
                </a>
                <a href="#" class="nav-item">
                  <span class="icon users"></span>
                  <span class="text">Users</span>
                </a>
                <a href="#" class="nav-item">
                  <span class="icon settings"></span>
                  <span class="text">Settings</span>
                </a>
              </nav>
            </ejs-sidebar>
            
            <div class="app-container">
              <header class="app-header">
                <button (click)="toggleSidebar()" class="menu-btn">☰</button>
                <h1>Dashboard</h1>
                <button (click)="toggleRTL()" class="rtl-btn">RTL</button>
              </header>
              <main class="app-content">
                <!-- Page content -->
              </main>
            </div>`,
  styles: [`
    :host {
      display: flex;
      height: 100vh;
    }
    
    :host ::ng-deep {
      .app-sidebar {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        box-shadow: 2px 0 8px rgba(0,0,0,0.1);
      }
      
      .sidebar-header {
        padding: 20px;
        text-align: center;
        border-bottom: 2px solid rgba(255,255,255,0.2);
      }
      
      .sidebar-header img {
        width: 50px;
        margin-bottom: 10px;
      }
      
      .sidebar-nav {
        list-style: none;
        padding: 20px 0;
      }
      
      .nav-item {
        display: flex;
        align-items: center;
        padding: 15px 20px;
        text-decoration: none;
        color: rgba(255,255,255,0.8);
        transition: all 0.3s;
      }
      
      .nav-item:hover,
      .nav-item.active {
        background: rgba(255,255,255,0.1);
        color: white;
        padding-left: 25px;
      }
      
      .nav-item .icon {
        width: 20px;
        margin-right: 15px;
      }
      
      .app-container {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      
      .app-header {
        background: white;
        padding: 15px 20px;
        border-bottom: 1px solid #e0e0e0;
        display: flex;
        align-items: center;
        gap: 15px;
      }
      
      .app-content {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
      }
    }
  `]
})
export class AppShellComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;
  isRTL = false;

  onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
  }

  toggleSidebar() {
    this.sidebar?.toggle();
  }

  toggleRTL() {
    this.isRTL = !this.isRTL;
    document.documentElement.dir = this.isRTL ? 'rtl' : 'ltr';
  }
}
```
