# Customization and Styling in Syncfusion Angular ListBox

## Table of Contents
- [Icons and IconCss](#icons-and-iconcss)
- [Custom Item Templates](#custom-item-templates)
- [Grouping Items](#grouping-items)
- [Sorting Items](#sorting-items)
- [CSS Styling and Theming](#css-styling-and-theming)
- [Responsive Design](#responsive-design)
- [Accessibility Customization](#accessibility-customization)

---

## Icons and IconCss

Add icons to ListBox items using the `iconCss` field:

### Icon Setup

1. **Include Icon Library** (Syncfusion Material icons):
```css
@import '@syncfusion/ej2-base/styles/material3.css';
/* Icons are included in base styles */
```

Or use Font Awesome:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
```

### Example: Syncfusion Material Icons

```typescript
import { Component, OnInit } from '@angular/core';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-icons-list',
  standalone: true,
  imports: [ListBoxModule],
  template: `
    <ejs-listbox 
      [dataSource]="items"
      [fields]="fields"
      height="300px">
    </ejs-listbox>
  `
})
export class IconsListComponent implements OnInit {
  public items: any[] = [];
  public fields = {
    text: 'name',
    value: 'code',
    iconCss: 'icon'
  };

  ngOnInit(): void {
    this.items = [
      { name: 'Document', code: 'doc', icon: 'e-icons e-document' },
      { name: 'Folder', code: 'folder', icon: 'e-icons e-folder' },
      { name: 'Music', code: 'music', icon: 'e-icons e-music' },
      { name: 'Image', code: 'image', icon: 'e-icons e-image' },
      { name: 'Video', code: 'video', icon: 'e-icons e-video' }
    ];
  }
}
```

### Example: Font Awesome Icons

```typescript
public items: any[] = [
  { name: 'JavaScript', code: 'js', icon: 'fab fa-js-square' },
  { name: 'Python', code: 'py', icon: 'fab fa-python' },
  { name: 'Java', code: 'java', icon: 'fab fa-java' },
  { name: 'React', code: 'react', icon: 'fab fa-react' }
];
```

### Icon Classes Reference

Common Syncfusion Material icon classes:
```
e-icons e-document       - File/Document
e-icons e-folder        - Folder
e-icons e-settings      - Settings
e-icons e-user          - User/Person
e-icons e-delete        - Delete/Trash
e-icons e-save          - Save/Download
e-icons e-edit          - Edit/Pencil
e-icons e-search        - Search/Magnifier
e-icons e-home          - Home
e-icons e-chart         - Chart/Analytics
```

---

## Custom Item Templates

Render items with custom HTML structure for complex layouts:

### Basic Template Example

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-custom-template',
  standalone: true,
  imports: [CommonModule, ListBoxModule],
  template: `
    <ng-template #itemTemplate let-data>
      <div style="padding: 8px; border-bottom: 1px solid #eee;">
        <strong>{{ data.name }}</strong>
        <p style="margin: 4px 0; color: #666; font-size: 12px;">
          {{ data.description }}
        </p>
      </div>
    </ng-template>
    
    <ejs-listbox 
      [dataSource]="items"
      [itemTemplate]="itemTemplate"
      height="300px">
    </ejs-listbox>
  `
})
export class CustomTemplateComponent implements OnInit {
  public items: any[] = [];

  ngOnInit(): void {
    this.items = [
      { 
        name: 'JavaScript', 
        description: 'Web scripting language',
        id: 'js'
      },
      { 
        name: 'TypeScript', 
        description: 'Typed superset of JavaScript',
        id: 'ts'
      },
      { 
        name: 'Angular', 
        description: 'Full-featured web framework',
        id: 'ang'
      }
    ];
  }
}
```

### Advanced Template with Icons and Status

```typescript
@Component({
  selector: 'app-advanced-template',
  standalone: true,
  imports: [CommonModule, ListBoxModule],
  template: `
    <ng-template #advancedTemplate let-data>
      <div style="display: flex; align-items: center; padding: 10px; gap: 10px;">
        <span [class]="'e-icons ' + data.icon" style="font-size: 18px;"></span>
        
        <div style="flex: 1;">
          <div style="font-weight: 500;">{{ data.name }}</div>
          <div style="font-size: 12px; color: #999;">
            {{ data.version }}
          </div>
        </div>
        
        <span [ngClass]="{ 'status-active': data.active, 'status-inactive': !data.active }"
              style="padding: 2px 8px; border-radius: 4px; font-size: 11px;">
          {{ data.active ? 'Active' : 'Inactive' }}
        </span>
      </div>
    </ng-template>
    
    <ejs-listbox 
      [dataSource]="projects"
      [itemTemplate]="advancedTemplate"
      height="350px">
    </ejs-listbox>
  `,
  styles: [`
    .status-active {
      background: #d4edda;
      color: #155724;
    }
    .status-inactive {
      background: #f8d7da;
      color: #721c24;
    }
  `]
})
export class AdvancedTemplateComponent implements OnInit {
  public projects: any[] = [];

  ngOnInit(): void {
    this.projects = [
      { 
        name: 'Project Alpha', 
        version: 'v2.1.0',
        icon: 'e-folder',
        active: true,
        id: 'proj1'
      },
      { 
        name: 'Project Beta', 
        version: 'v1.5.2',
        icon: 'e-folder',
        active: false,
        id: 'proj2'
      },
      { 
        name: 'Project Gamma', 
        version: 'v3.0.0',
        icon: 'e-folder',
        active: true,
        id: 'proj3'
      }
    ];
  }
}
```

---

## Grouping Items

Group related items by category using the `groupBy` field:

### Basic Grouping

```typescript
import { Component, OnInit } from '@angular/core';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-grouped-list',
  standalone: true,
  imports: [ListBoxModule],
  template: `
    <ejs-listbox 
      [dataSource]="languages"
      [fields]="fields"
      height="300px">
    </ejs-listbox>
  `
})
export class GroupedListComponent implements OnInit {
  public languages: any[] = [];
  public fields = {
    text: 'name',
    value: 'code',
    groupBy: 'category'
  };

  ngOnInit(): void {
    this.languages = [
      // Web Languages
      { name: 'JavaScript', code: 'js', category: 'Web' },
      { name: 'TypeScript', code: 'ts', category: 'Web' },
      { name: 'CSS', code: 'css', category: 'Web' },
      { name: 'HTML', code: 'html', category: 'Web' },
      
      // Backend Languages
      { name: 'Python', code: 'py', category: 'Backend' },
      { name: 'Java', code: 'java', category: 'Backend' },
      { name: 'C#', code: 'cs', category: 'Backend' },
      { name: 'PHP', code: 'php', category: 'Backend' },
      
      // Mobile Languages
      { name: 'Kotlin', code: 'kotlin', category: 'Mobile' },
      { name: 'Swift', code: 'swift', category: 'Mobile' }
    ];
  }
}
```

### Grouping with Nested Properties

```typescript
public fields = {
  text: 'name',
  groupBy: 'category.name'  // Dot notation for nested groupBy
};

public items = [
  {
    name: 'JavaScript',
    category: { name: 'Web', code: 'web' }
  }
];
```

---

## Sorting Items

Sort ListBox items automatically using the `sortOrder` property:

### Enable Sorting

Use the `sortOrder` property with `'Ascending'` or `'Descending'`:

```typescript
@Component({
  template: `
    <ejs-listbox 
      [dataSource]="items"
      sortOrder="Ascending"
      height="300px">
    </ejs-listbox>
  `
})
export class SortedListComponent implements OnInit {
  public items: string[] = [
    'Zebra',
    'Apple',
    'Mango',
    'Banana',
    'Cherry'
  ];
}
```

### Sort Order Options

| Value | Description |
|---|---|
| `None` | Data source is not sorted (default) |
| `Ascending` | Sorted in ascending order |
| `Descending` | Sorted in descending order |

### Example: Descending Sort

```typescript
@Component({
  template: `
    <ejs-listbox 
      [dataSource]="items"
      sortOrder="Descending"
      height="300px">
    </ejs-listbox>
  `
})
export class DescSortedListComponent implements OnInit {
  public items: any[] = [];

  ngOnInit(): void {
    this.items = [
      { text: 'Charlie', id: '1' },
      { text: 'Alice', id: '2' },
      { text: 'Bob', id: '3' }
    ];
  }
}
```

---

## CSS Styling and Theming

### Available Themes

Syncfusion provides multiple built-in themes. Adjust the import in `styles.css`:

```css
/* Material Design (Default) */
@import '@syncfusion/ej2-dropdowns/styles/material3.css';

/* Bootstrap 5 */
@import '@syncfusion/ej2-dropdowns/styles/bootstrap5.css';

/* Microsoft Fluent */
@import '@syncfusion/ej2-dropdowns/styles/fluent.css';

/* Tailwind CSS */
@import '@syncfusion/ej2-dropdowns/styles/tailwind.css';

/* High Contrast (Accessibility) */
@import '@syncfusion/ej2-dropdowns/styles/highcontrast.css';
```

### Custom CSS Styling

Override default styles with custom CSS:

```css
/* Style the ListBox container */
.e-listbox {
  border: 2px solid #007bff;
  border-radius: 8px;
}

/* Style individual items */
.e-list-item {
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
}

/* Style hover state */
.e-list-item:hover {
  background-color: #f8f9fa;
}

/* Style selected items */
.e-list-item.e-selected {
  background-color: #007bff;
  color: white;
}

/* Style focus state (keyboard navigation) */
.e-list-item.e-focused {
  outline: 2px solid #0056b3;
  outline-offset: -2px;
}
```

### Using CSS Classes

```typescript
@Component({
  selector: 'app-styled-list',
  template: `
    <ejs-listbox 
      [dataSource]="items"
      cssClass="my-custom-listbox"
      height="300px">
    </ejs-listbox>
  `,
  styles: [`
    :host ::ng-deep .my-custom-listbox {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    :host ::ng-deep .my-custom-listbox .e-list-item {
      color: white;
      padding: 14px;
    }
    
    :host ::ng-deep .my-custom-listbox .e-list-item.e-selected {
      background: rgba(255, 255, 255, 0.2);
    }
  `]
})
export class StyledListComponent implements OnInit {
  public items: string[] = [];

  ngOnInit(): void {
    this.items = ['Item 1', 'Item 2', 'Item 3'];
  }
}
```

### Theme Studio

Create custom themes using [Theme Studio](https://ej2.syncfusion.com/angular/documentation/appearance/theme-studio):

1. Go to Theme Studio
2. Customize colors and appearance
3. Download custom CSS file
4. Import in your project

---

## Responsive Design

### Responsive Height and Width

```typescript
@Component({
  selector: 'app-responsive-listbox',
  template: `
    <div style="display: flex; gap: 20px;">
      <div style="flex: 1; min-width: 0;">
        <h4>Column 1</h4>
        <ejs-listbox 
          [dataSource]="items1"
          [height]="'100%'"
          style="min-height: 300px;">
        </ejs-listbox>
      </div>
      
      <div style="flex: 1; min-width: 0;">
        <h4>Column 2</h4>
        <ejs-listbox 
          [dataSource]="items2"
          [height]="'100%'"
          style="min-height: 300px;">
        </ejs-listbox>
      </div>
    </div>
  `
})
export class ResponsiveListBoxComponent {
  public items1 = ['Item 1', 'Item 2', 'Item 3'];
  public items2 = ['Item A', 'Item B', 'Item C'];
}
```

### Mobile-First Template

```typescript
@Component({
  selector: 'app-mobile-listbox',
  template: `
    <ng-template #mobileTemplate let-data>
      <div style="padding: 12px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong>{{ data.name }}</strong>
          <p style="font-size: 12px; color: #666; margin: 4px 0;">
            {{ data.subtitle }}
          </p>
        </div>
        <span style="color: #999; font-size: 14px;">›</span>
      </div>
    </ng-template>
    
    <ejs-listbox 
      [dataSource]="items"
      [itemTemplate]="mobileTemplate"
      height="400px">
    </ejs-listbox>
  `
})
export class MobileListBoxComponent implements OnInit {
  public items: any[] = [];

  ngOnInit(): void {
    this.items = [
      { name: 'Profile', subtitle: 'Edit your profile', id: '1' },
      { name: 'Settings', subtitle: 'App preferences', id: '2' },
      { name: 'Help', subtitle: 'Get help and support', id: '3' }
    ];
  }
}
```

---

## Accessibility Customization

### Keyboard Navigation Styling

```css
/* Ensure focus is visible */
.e-list-item.e-focused {
  outline: 3px solid #0066cc;
  outline-offset: -3px;
}

/* High contrast for accessibility */
.e-list-item {
  color: #000000;  /* Dark text */
}

.e-list-item.e-selected {
  background: #0066cc;
  color: #ffffff;
}
```

---

## Complete Customization Example

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBoxComponent, CheckBoxSelection, ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

ListBoxComponent.Inject(CheckBoxSelection);

@Component({
  selector: 'app-full-custom',
  standalone: true,
  imports: [CommonModule, ListBoxModule],
  template: `
    <ng-template #customTemplate let-data>
      <div style="display: flex; align-items: center; padding: 10px; gap: 12px;">
        <span [class]="'e-icons ' + data.icon"
              style="font-size: 20px; color: #007bff;"></span>
        <div style="flex: 1;">
          <div style="font-weight: 600; color: #333;">{{ data.name }}</div>
          <div style="font-size: 12px; color: #999;">{{ data.description }}</div>
        </div>
        <span [ngClass]="{ 'badge': true, 'badge-primary': data.level === 'Expert' }"
              style="padding: 3px 8px; border-radius: 12px; font-size: 11px; background: #e7f3ff; color: #007bff;">
          {{ data.level }}
        </span>
      </div>
    </ng-template>
    
    <ejs-listbox 
      [dataSource]="skills"
      [fields]="fields"
      [itemTemplate]="customTemplate"
      [selectionSettings]="{ mode: 'Multiple', showCheckbox: true }"
      [allowDragAndDrop]="true"
      cssClass="skill-listbox"
      height="400px">
    </ejs-listbox>
  `,
  styles: [`
    :host ::ng-deep .skill-listbox {
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    :host ::ng-deep .skill-listbox .e-list-item {
      border-bottom: 1px solid #f0f0f0;
    }
    
    :host ::ng-deep .skill-listbox .e-list-item:hover {
      background-color: #f8f9fa;
    }
    
    :host ::ng-deep .skill-listbox .e-list-item.e-selected {
      background: #e7f3ff;
      border-left: 3px solid #007bff;
    }
  `]
})
export class FullCustomComponent implements OnInit {
  public skills: any[] = [];
  public fields = { text: 'name', groupBy: 'category' };

  ngOnInit(): void {
    this.skills = [
      { name: 'Angular', category: 'Frontend', icon: 'e-document', level: 'Expert', id: 'ang' },
      { name: 'React', category: 'Frontend', icon: 'e-document', level: 'Intermediate', id: 'react' },
      { name: 'Python', category: 'Backend', icon: 'e-document', level: 'Expert', id: 'py' },
      { name: 'Java', category: 'Backend', icon: 'e-document', level: 'Beginner', id: 'java' }
    ];
  }
}
```

---

## Next Steps

- Explore [drag-and-drop-features.md](drag-and-drop-features.md) to add interactions
- See [practical-examples.md](practical-examples.md) for real-world implementations
- Review [selection-modes.md](selection-modes.md) for selection styling
