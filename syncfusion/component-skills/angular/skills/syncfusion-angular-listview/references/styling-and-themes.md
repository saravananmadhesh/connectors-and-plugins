# Styling and Themes in Syncfusion Angular ListView

## Table of Contents
- [Available Themes](#available-themes)
- [CSS Class Customization](#css-class-customization)
- [Custom Styling](#custom-styling)
- [Responsive Design](#responsive-design)
- [Animation Settings](#animation-settings)
- [RTL Support](#rtl-support)
- [Dark Mode](#dark-mode)

---

## Available Themes

Syncfusion provides multiple built-in themes that you can import and customize.

### Material3 Theme (Recommended)

```css
/* styles.css */
@import "../node_modules/@syncfusion/ej2-base/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-angular-lists/styles/material3.css";
```

### Bootstrap5 Theme

```css
@import "../node_modules/@syncfusion/ej2-base/styles/bootstrap5.css";
@import "../node_modules/@syncfusion/ej2-angular-lists/styles/bootstrap5.css";
```

### Microsoft Fabric Theme

```css
@import "../node_modules/@syncfusion/ej2-base/styles/fabric.css";
@import "../node_modules/@syncfusion/ej2-angular-lists/styles/fabric.css";
```

### Tailwind CSS Theme

```css
@import "../node_modules/@syncfusion/ej2-base/styles/tailwind.css";
@import "../node_modules/@syncfusion/ej2-angular-lists/styles/tailwind.css";
```

### High Contrast Theme

```css
@import "../node_modules/@syncfusion/ej2-base/styles/highcontrast.css";
@import "../node_modules/@syncfusion/ej2-angular-lists/styles/highcontrast.css";
```

---

## CSS Class Customization

Override default styles with custom CSS classes.

### Custom Item Styles

```css
/* Override default item styles */
.e-listview .e-list-item {
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.2s ease;
}

.e-listview .e-list-item:hover {
  background-color: #f5f5f5;
}

.e-listview .e-list-item.e-active {
  background-color: #e3f2fd;
  border-left: 4px solid #007bff;
}
```

### Custom Header Styles

```css
.e-listview .e-list-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 18px;
  padding: 20px;
}
```

### Custom Group Header Styles

```css
.e-listview .e-list-group-item {
  background-color: #f9f9f9;
  padding: 12px 16px;
  font-weight: 600;
  border-left: 4px solid #007bff;
}
```

---

## Custom Styling

### Inline Styles with Component Binding

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-styled-list',
  template: `
    <ejs-listview 
      [dataSource]='data'
      [style.height]='height'
      [style.border]='border'
      [style.border-radius]='borderRadius'>
    </ejs-listview>
  `
})
export class StyledListComponent {
  public data: string[] = ['Item 1', 'Item 2', 'Item 3'];
  public height: string = '400px';
  public border: string = '1px solid #ddd';
  public borderRadius: string = '8px';
}
```

### CSS Custom Properties (CSS Variables)

```css
:root {
  --listview-bg-color: #ffffff;
  --listview-item-padding: 12px 16px;
  --listview-item-hover: #f5f5f5;
  --listview-primary-color: #007bff;
  --listview-border-color: #ddd;
}

.custom-listview {
  background-color: var(--listview-bg-color);
}

.custom-listview .e-list-item {
  padding: var(--listview-item-padding);
}

.custom-listview .e-list-item:hover {
  background-color: var(--listview-item-hover);
}
```

### SCSS Styling

```scss
$primary-color: #007bff;
$border-radius: 8px;
$padding-base: 12px;

.custom-listview {
  border-radius: $border-radius;
  
  .e-list-item {
    padding: $padding-base;
    border-bottom: 1px solid #ddd;
    
    &:hover {
      background-color: lighten($primary-color, 45%);
    }
    
    &.e-active {
      background-color: lighten($primary-color, 35%);
      border-left: 4px solid $primary-color;
    }
  }
}
```

---

## Responsive Design

### Mobile-Responsive ListView

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, HostListener } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-responsive-list',
  template: `
    <ejs-listview 
      [dataSource]='data'
      cssClass='responsive-list'
      [height]='isMobile ? "100%" : "400px"'>
    </ejs-listview>
  `,
  styles: [`
    .responsive-list {
      width: 100%;
    }
    
    @media (max-width: 768px) {
      .responsive-list {
        font-size: 14px;
        padding: 8px;
      }
      
      .responsive-list .e-list-item {
        padding: 12px 8px;
      }
    }
    
    @media (max-width: 480px) {
      .responsive-list {
        font-size: 12px;
      }
      
      .responsive-list .e-list-item {
        padding: 8px;
      }
    }
  `]
})
export class ResponsiveListComponent {
  public data: string[] = ['Item 1', 'Item 2', 'Item 3'];
  public isMobile: boolean = window.innerWidth < 768;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth < 768;
  }
}
```

### Grid Responsive Layout

```css
@media (max-width: 1024px) {
  .grid-layout {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (max-width: 768px) {
  .grid-layout {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .grid-layout {
    grid-template-columns: 1fr;
  }
}
```

---

## Animation Settings

### Configuring Animations

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-animated-list',
  template: `
    <ejs-listview 
      [dataSource]='data'
      [animationSettings]='animationSettings'>
    </ejs-listview>
  `
})
export class AnimatedListComponent {
  public data: string[] = ['Item 1', 'Item 2', 'Item 3'];

  public animationSettings = {
    // Add animation for item entering/leaving
    effect: 'SlideLeft',  // SlideLeft, SlideRight, SlideUp, SlideDown, Fade
    duration: 300,        // Duration in milliseconds
    easing: 'ease-in-out' // Easing function
  };
}
```

### CSS Animations

```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOut {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(20px);
  }
}

.e-list-item {
  animation: slideIn 0.3s ease-in-out;
}

.e-list-item.removing {
  animation: slideOut 0.3s ease-in-out;
}
```

### Hover Animations

```css
.e-listview .e-list-item {
  transition: all 0.3s ease;
}

.e-listview .e-list-item:hover {
  transform: translateX(5px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.e-listview .e-list-item.e-active {
  transform: scale(1.02);
}
```

---

## RTL Support

### Enable Right-to-Left Layout

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-rtl-list',
  template: `
    <div dir="rtl">
      <ejs-listview 
        [dataSource]='arabicText'
        enableRtl='true'>
      </ejs-listview>
    </div>
  `
})
export class RtlListComponent {
  public arabicText = [
    { text: 'عنصر 1', id: '1' },
    { text: 'عنصر 2', id: '2' },
    { text: 'عنصر 3', id: '3' }
  ];
}
```

### RTL CSS Adjustments

```css
[dir="rtl"] .e-listview .e-list-item {
  padding-right: 20px;
  padding-left: 0;
}

[dir="rtl"] .e-listview .e-list-icon {
  margin-left: 10px;
  margin-right: 0;
}

[dir="rtl"] .e-listview .e-avatar {
  margin-left: 10px;
  margin-right: 0;
}
```

---

## Dark Mode

### Implementing Dark Mode

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ListViewModule, CommonModule],
  standalone: true,
  selector: 'app-dark-mode',
  template: `
    <button (click)="toggleDarkMode()">
      {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
    </button>
    
    <ejs-listview 
      [dataSource]='data'
      [ngClass]="isDarkMode ? 'dark-mode' : 'light-mode'">
    </ejs-listview>
  `,
  styles: [`
    .light-mode {
      background-color: white;
      color: #333;
    }
    
    .light-mode .e-list-item {
      border-bottom: 1px solid #e0e0e0;
    }
    
    .light-mode .e-list-item:hover {
      background-color: #f5f5f5;
    }
    
    .dark-mode {
      background-color: #222;
      color: #fff;
    }
    
    .dark-mode .e-list-item {
      border-bottom: 1px solid #444;
      color: #ccc;
    }
    
    .dark-mode .e-list-item:hover {
      background-color: #333;
    }
    
    .dark-mode .e-list-item.e-active {
      background-color: #007bff;
      color: white;
    }
  `]
})
export class DarkModeComponent {
  public data: string[] = ['Item 1', 'Item 2', 'Item 3'];
  public isDarkMode: boolean = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    // Persist to localStorage
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }

  ngOnInit() {
    // Load saved preference
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      this.isDarkMode = saved === 'true';
    }
  }
}
```

### CSS Variables for Dark Mode

```css
:root {
  --list-bg: white;
  --list-text: #333;
  --list-item-hover: #f5f5f5;
  --list-border: #e0e0e0;
}

[data-theme="dark"] {
  --list-bg: #222;
  --list-text: #fff;
  --list-item-hover: #333;
  --list-border: #444;
}

.e-listview {
  background-color: var(--list-bg);
  color: var(--list-text);
}

.e-listview .e-list-item {
  border-bottom: 1px solid var(--list-border);
}

.e-listview .e-list-item:hover {
  background-color: var(--list-item-hover);
}
```

---

## Best Practices

✅ Choose a theme that matches your brand  
✅ Test responsive designs on multiple devices  
✅ Use CSS variables for consistent theming  
✅ Ensure sufficient color contrast for accessibility  
✅ Test animations on lower-end devices  
✅ Provide dark mode option for better UX  
✅ Keep custom CSS organized and maintainable  
✅ Document custom theme customizations  
✅ Test RTL layouts with right-to-left languages  
✅ Optimize CSS file sizes for production  

