# Customization and Styling

## Table of Contents
- [CSS Class Customization](#css-class-customization)
- [Theme Integration](#theme-integration)
- [CSS Variables](#css-variables)
- [Custom Styling Examples](#custom-styling-examples)
- [Group and Item Customization](#group-and-item-customization)

## CSS Class Customization

### Custom Classes on Components

Add custom CSS classes to ribbon elements:

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon" cssClass="my-custom-ribbon">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Clipboard" cssClass="custom-clipboard-group">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" 
                      cssClass="custom-button"
                      [buttonSettings]="pasteButton">
                    </e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public pasteButton = { iconCss: "e-icons e-paste", content: "Paste" };
}
```

### CSS in app.component.css

```css
/* Custom ribbon styling */
.my-custom-ribbon {
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Custom group styling */
.custom-clipboard-group {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin: 5px;
}

/* Custom button styling */
.custom-button {
  border-radius: 2px;
}

.custom-button:hover {
  background-color: #e3f2fd;
}

.custom-button:active {
  background-color: #bbdefb;
}
```

## Theme Integration

### Available Themes

Syncfusion provides multiple built-in themes:

| Theme | File | Use Case |
|-------|------|----------|
| Material 3 | `material3.css` | Modern default theme |
| Material | `material.css` | Material Design (older) |
| Bootstrap 5 | `bootstrap5.css` | Bootstrap compatibility |
| Tailwind | `tailwind.css` | Tailwind CSS harmony |
| Fluent | `fluent.css` | Microsoft Fluent Design |
| Fabric | `fabric.css` | Microsoft Fabric |

### Switching Themes Dynamically

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <div>
      <div style="margin-bottom: 15px;">
        <label>Select Theme:</label>
        <select (change)="switchTheme($event)">
          <option value="material3">Material 3</option>
          <option value="bootstrap5">Bootstrap 5</option>
          <option value="fluent">Fluent</option>
          <option value="tailwind">Tailwind</option>
        </select>
      </div>
      
      <ejs-ribbon id="ribbon">
        <e-ribbon-tabs>
          <e-ribbon-tab header="Home">
            <e-ribbon-groups>
              <e-ribbon-group header="Clipboard">
                <e-ribbon-collections>
                  <e-ribbon-collection>
                    <e-ribbon-items>
                      <e-ribbon-item type="Button" [buttonSettings]="pasteButton"></e-ribbon-item>
                    </e-ribbon-items>
                  </e-ribbon-collection>
                </e-ribbon-collections>
              </e-ribbon-group>
            </e-ribbon-groups>
          </e-ribbon-tab>
        </e-ribbon-tabs>
      </ejs-ribbon>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public pasteButton = { iconCss: "e-icons e-paste", content: "Paste" };
  
  public switchTheme(event: any) {
    const theme = event.target.value;
    const head = document.head;
    
    // Remove existing theme link
    const existingLink = head.querySelector('link[id="theme-link"]');
    if (existingLink) {
      existingLink.remove();
    }
    
    // Add new theme link
    const link = document.createElement('link');
    link.id = 'theme-link';
    link.rel = 'stylesheet';
    link.href = `../node_modules/@syncfusion/ej2-${theme}-theme/styles/ribbon/index.css`;
    head.appendChild(link);
    
    console.log(`Theme switched to: ${theme}`);
  }
}
```

## CSS Variables

### Overriding Theme Variables

Modern Syncfusion themes use CSS variables for customization:

```css
/* Override default colors */
:root {
  /* Primary colors */
  --e-primary: #0078d4;
  --e-primary-dark: #005a9e;
  --e-primary-light: #b4d7f5;
  
  /* Text colors */
  --e-text: #333333;
  --e-text-light: #666666;
  
  /* Background colors */
  --e-background: #ffffff;
  --e-background-light: #f5f5f5;
  
  /* Border colors */
  --e-border: #d0d0d0;
  
  /* Spacing */
  --e-spacing-2xs: 2px;
  --e-spacing-xs: 4px;
  --e-spacing-sm: 8px;
  --e-spacing-md: 12px;
  --e-spacing-lg: 16px;
  
  /* Border radius */
  --e-border-radius-xs: 2px;
  --e-border-radius-sm: 4px;
  --e-border-radius-md: 6px;
  --e-border-radius-lg: 8px;
}

/* Use variables in custom styles */
.my-custom-ribbon {
  background-color: var(--e-background-light);
  border-bottom: 1px solid var(--e-border);
}

.my-custom-button {
  background-color: var(--e-primary);
  color: white;
  border-radius: var(--e-border-radius-sm);
  padding: var(--e-spacing-sm) var(--e-spacing-md);
}

.my-custom-button:hover {
  background-color: var(--e-primary-dark);
}
```

## Custom Styling Examples

### Example 1: Corporate Branding

```css
/* Corporate color scheme */
.corp-ribbon {
  background: linear-gradient(180deg, #1a4d8f 0%, #1e5a96 100%);
}

.corp-ribbon .e-ribbon-tab {
  color: #ffffff;
}

.corp-ribbon .e-ribbon-tab.e-active {
  border-bottom: 3px solid #ffb81c;
  color: #ffb81c;
}

.corp-ribbon .e-ribbon-group-header {
  color: #ffffff;
  font-weight: 600;
}

.corp-ribbon .e-ribbon-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.corp-ribbon .e-ribbon-item.e-active {
  background-color: rgba(255, 184, 28, 0.2);
  border-radius: 4px;
}
```

### Example 2: Dark Mode

```css
/* Dark mode styling */
.dark-ribbon {
  background-color: #2d2d2d;
  color: #e0e0e0;
}

.dark-ribbon .e-ribbon-tab {
  color: #e0e0e0;
  border-bottom-color: #555555;
}

.dark-ribbon .e-ribbon-tab.e-active {
  background-color: #1a1a1a;
  border-bottom-color: #4caf50;
  color: #4caf50;
}

.dark-ribbon .e-ribbon-group {
  background-color: #3a3a3a;
  border: 1px solid #555555;
}

.dark-ribbon .e-ribbon-group-header {
  color: #b0b0b0;
  font-weight: 600;
}

.dark-ribbon .e-ribbon-item:hover {
  background-color: #4a4a4a;
  border-radius: 3px;
}

.dark-ribbon .e-ribbon-item.e-active {
  background-color: #4caf50;
  color: #ffffff;
}
```

### Example 3: Compact/Dense UI

```css
/* Compact ribbon layout */
.compact-ribbon {
  padding: 0;
  --e-spacing-md: 6px;
  --e-spacing-sm: 4px;
}

.compact-ribbon .e-ribbon-tab {
  padding: 4px 12px;
  font-size: 12px;
}

.compact-ribbon .e-ribbon-group {
  padding: 4px;
  margin: 2px;
}

.compact-ribbon .e-ribbon-group-header {
  font-size: 11px;
  padding: 2px 4px;
}

.compact-ribbon .e-ribbon-item {
  padding: 3px 6px;
  margin: 1px;
}

.compact-ribbon .e-ribbon-item-label {
  font-size: 11px;
}

.compact-ribbon .e-icon-large {
  width: 20px;
  height: 20px;
  font-size: 16px;
}
```

## Group and Item Customization

### Custom Group Styling

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <!-- Prominent group -->
            <e-ribbon-group header="Critical" 
              cssClass="prominent-group"
              [showLauncherIcon]="true"
              groupIconCss="e-icons e-warning">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" [buttonSettings]="saveButton"></e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>
            
            <!-- Secondary group -->
            <e-ribbon-group header="Formatting" cssClass="secondary-group">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" [buttonSettings]="boldButton"></e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public saveButton = { iconCss: "e-icons e-save", content: "Save" };
  public boldButton = { iconCss: "e-icons e-bold", content: "Bold" };
}
```

### CSS for Custom Groups

```css
/* Prominent group - draws attention */
.prominent-group {
  background-color: #fff3cd;
  border: 2px solid #ffc107;
  border-radius: 4px;
}

.prominent-group .e-ribbon-group-header {
  color: #856404;
  font-weight: 700;
}

.prominent-group .e-ribbon-item {
  background-color: #fffbea;
}

.prominent-group .e-ribbon-item:hover {
  background-color: #ffeeba;
}

/* Secondary group - less emphasis */
.secondary-group {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  opacity: 0.8;
}

.secondary-group .e-ribbon-group-header {
  color: #6c757d;
  font-size: 12px;
}
```

### Custom Button Styling

```html
<!-- Buttons with custom styling -->
<e-ribbon-item type="Button" 
  cssClass="danger-button"
  [buttonSettings]="deleteButton">
</e-ribbon-item>

<e-ribbon-item type="Button" 
  cssClass="success-button"
  [buttonSettings]="applyButton">
</e-ribbon-item>
```

### CSS for Custom Buttons

```css
/* Danger button - red styling */
.danger-button .e-ribbon-button {
  background-color: #dc3545;
  color: white;
}

.danger-button .e-ribbon-button:hover {
  background-color: #c82333;
}

.danger-button .e-ribbon-button:active {
  background-color: #bd2130;
}

/* Success button - green styling */
.success-button .e-ribbon-button {
  background-color: #28a745;
  color: white;
}

.success-button .e-ribbon-button:hover {
  background-color: #218838;
}

.success-button .e-ribbon-button:active {
  background-color: #1e7e34;
}
```

### Best Practices for Customization

1. **Use CSS variables** for maintainability and theme switching
2. **Maintain color contrast** for accessibility (WCAG AA minimum)
3. **Test responsive behavior** across different ribbon widths
4. **Keep custom classes specific** to avoid unintended cascade
5. **Document custom styles** with comments explaining intent
6. **Test with multiple themes** to ensure compatibility
7. **Avoid inline styles** - use external stylesheets
8. **Use semantic class names** that describe purpose, not appearance

---
