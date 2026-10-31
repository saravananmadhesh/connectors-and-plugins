# Templates & Advanced Features

## Table of Contents
- [Custom Item Templates](#custom-item-templates)
- [Rich Content with HTML](#rich-content-with-html)
- [Table Templates](#table-templates)
- [Character Underlining](#character-underlining)
- [Separator Items](#separator-items)
- [Accessibility & Keyboard Navigation](#accessibility--keyboard-navigation)

## Custom Item Templates

### itemTemplate Property

The `itemTemplate` property allows custom HTML rendering for each menu item:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ContextMenuComponent, ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-navigations';
import { Browser } from '@syncfusion/ej2-base';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContextMenuModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="e-section-control">
      <div id="target">Right click / Touch hold to open the ContextMenu</div>
      
      <ejs-contextmenu 
        #contextmenu
        target='#target' 
        [items]='menuItems'
        itemTemplate='itemTemplate'
        [animationSettings]='animationSettings'>
      </ejs-contextmenu>
      
      <ng-template #itemTemplate let-data="data">
        <div class="custom-item">
          <span class="item-icon">{{ data.answerType }}</span>
          <div class="item-content">
            <div class="item-title">{{ data.answerType }}</div>
            <div class="item-description">{{ data.description }}</div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .custom-item {
      display: flex;
      align-items: center;
      padding: 8px 0;
      gap: 12px;
    }

    .item-icon {
      font-size: 20px;
      min-width: 30px;
      text-align: center;
    }

    .item-content {
      flex: 1;
    }

    .item-title {
      font-weight: 600;
      color: #333;
    }

    .item-description {
      font-size: 12px;
      color: #999;
      margin-top: 2px;
    }
  `]
})
export class AppComponent {
  @ViewChild('contextmenu')
  public contextmenu?: ContextMenuComponent;

  public animationSettings = {
    effect: Browser.isDevice ? 'ZoomIn' : 'SlideDown',
    duration: 400
  };

  public menuItems: any[] = [
    {
      answerType: 'Selection',
      description: 'Choose from options'
    },
    {
      answerType: 'Yes / No',
      description: 'Select Yes or No'
    },
    {
      answerType: 'Text',
      description: 'Type own answer'
    }
  ];

  onCreated(): void {
    if (Browser.isDevice) {
      this.animationSettings.effect = 'ZoomIn';
    } else {
      this.animationSettings.effect = 'SlideDown';
    }
  }
}
```

## Rich Content with HTML

### HTML Content in Items

Use `beforeItemRender` to inject custom HTML:

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
      <div id="target">Right click / Touch hold</div>
      <ejs-contextmenu 
        target='#target' 
        [items]='menuItems'
        (beforeItemRender)='onItemRender($event)'>
      </ejs-contextmenu>
    </div>
  `
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    { text: 'Cut', id: 'cut' },
    { text: 'Copy', id: 'copy' },
    { text: 'Paste', id: 'paste' }
  ];

  onItemRender(args: MenuEventArgs): void {
    if (args.item.id === 'cut') {
      args.element.innerHTML = `
        <div class="menu-item-custom">
          <strong>Cut</strong>
          <small style="color: #999;">Ctrl+X</small>
        </div>
      `;
    } else if (args.item.id === 'copy') {
      args.element.innerHTML = `
        <div class="menu-item-custom">
          <strong>Copy</strong>
          <small style="color: #999;">Ctrl+C</small>
        </div>
      `;
    }
  }
}
```

### Complex HTML Structures

```typescript
onItemRender(args: MenuEventArgs): void {
  if (args.item.text === 'Format') {
    args.element.innerHTML = `
      <div style="padding: 8px; background: #f5f5f5; border-radius: 4px;">
        <div style="font-weight: bold; margin-bottom: 4px;">Format Options</div>
        <div style="font-size: 12px; color: #666;">
          Choose text formatting
        </div>
      </div>
    `;
  }
}
```

## Table Templates

### Show Table in Sub ContextMenu

Create table layouts within menu items:

```typescript
import { Component } from '@angular/core';
import { ContextMenuModule, MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-navigations';
import { createCheckBox } from '@syncfusion/ej2-buttons';
import { closest } from '@syncfusion/ej2-base';

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
        (beforeItemRender)='onItemRender($event)'>
      </ejs-contextmenu>
    </div>
  `,
  styles: [`
    :host ::ng-deep table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
    }

    :host ::ng-deep td {
      border: 1px solid #ddd;
      padding: 8px;
      cursor: pointer;
      width: 30px;
      height: 30px;
      text-align: center;
    }

    :host ::ng-deep td:hover {
      background-color: #007bff;
      color: white;
    }

    :host ::ng-deep h4 {
      margin: 10px 0 5px 0;
    }

    :host ::ng-deep .bg-transparent {
      background-color: transparent !important;
    }
  `]
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    { text: 'Cut', iconCss: 'e-cm-icons e-cut' },
    { text: 'Copy', iconCss: 'e-cm-icons e-copy' },
    { separator: true },
    {
      text: 'Table',
      iconCss: 'e-icons e-table',
      items: [
        { id: 'table' }
      ]
    }
  ];

  onItemRender(args: MenuEventArgs): void {
    if (args.item.id === 'table') {
      args.element.classList.add('bg-transparent');
      args.element.appendChild(this.createHeader());
      args.element.appendChild(this.createTable());
    }
  }

  private createHeader(): HTMLElement {
    const header = document.createElement('h4');
    header.textContent = 'Insert Table';
    return header;
  }

  private createTable(): HTMLElement {
    const table = document.createElement('table');
    
    // Create 5x5 grid
    for (let i = 0; i < 5; i++) {
      const row = document.createElement('tr');
      
      for (let j = 0; j < 5; j++) {
        const cell = document.createElement('td');
        cell.textContent = '';
        
        cell.addEventListener('click', (e) => {
          console.log(`Selected: ${i + 1} x ${j + 1} table`);
          e.stopPropagation();
        });
        
        row.appendChild(cell);
      }
      
      table.appendChild(row);
    }
    
    return table;
  }
}
```

## Character Underlining

### Underline Specific Characters

Use `beforeItemRender` to underline keyboard shortcuts:

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
      <div id="target">Right click / Touch hold</div>
      <ejs-contextmenu 
        target='#target' 
        [items]='menuItems'
        (beforeItemRender)='onItemRender($event)'>
      </ejs-contextmenu>
    </div>
  `
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];

  onItemRender(args: MenuEventArgs): void {
    // Underline first character
    if (args.item.text === 'Cut') {
      args.element.innerHTML = '<u>C</u>ut';
    } else if (args.item.text === 'Copy') {
      args.element.innerHTML = '<u>C</u>opy';
    } else if (args.item.text === 'Paste') {
      args.element.innerHTML = '<u>P</u>aste';
    }
  }
}
```

### Advanced Character Formatting

```typescript
onItemRender(args: MenuEventArgs): void {
  const text = args.item.text || '';
  
  // Underline character after colon (e.g., "Save: S")
  if (text.includes(':')) {
    const [before, after] = text.split(':');
    args.element.innerHTML = `
      <span>${before}:</span>
      <u style="margin-left: 8px;">${after}</u>
    `;
  }
}
```

## Separator Items

### Basic Separators

Use separator property to create visual dividers:

```typescript
public menuItems: MenuItemModel[] = [
  { text: 'New' },
  { text: 'Open' },
  { separator: true },         // Visual separator line
  { text: 'Save' },
  { text: 'Save As...' },
  { separator: true },
  { text: 'Exit' }
];
```

### Conditional Separators

```typescript
public get dynamicMenuItems(): MenuItemModel[] {
  const items: MenuItemModel[] = [
    { text: 'Edit' },
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];

  // Add separator and delete option if not read-only
  if (!this.isReadOnly) {
    items.push({ separator: true });
    items.push({ text: 'Delete' });
  }

  return items;
}
```

### Styled Separators

```typescript
@Component({
  styles: [`
    :host ::ng-deep .e-separator {
      background: linear-gradient(90deg, 
        transparent 0%, 
        #999 50%, 
        transparent 100%);
      height: 1px;
      margin: 8px 0;
    }
  `]
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    { text: 'Option 1' },
    { separator: true },
    { text: 'Option 2' }
  ];
}
```

## Accessibility & Keyboard Navigation

### ARIA Attributes

Enhance accessibility with proper ARIA labels:

```typescript
onItemRender(args: MenuEventArgs): void {
  if (args.element) {
    // Add ARIA attributes
    args.element.setAttribute('role', 'menuitem');
    args.element.setAttribute('aria-label', args.item.text);
    
    // Add keyboard indicator
    if (args.item.text === 'Cut') {
      args.element.setAttribute('aria-keyshortcuts', 'Ctrl+X');
    }
  }
}
```

### Keyboard Shortcut Display

```typescript
@Component({
  template: `
    <ejs-contextmenu 
      [items]='menuItems'
      (beforeItemRender)='onItemRender($event)'>
    </ejs-contextmenu>
  `,
  styles: [`
    .shortcut {
      float: right;
      font-size: 12px;
      color: #999;
      margin-left: 16px;
    }
  `]
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    { text: 'Cut', id: 'cut' },
    { text: 'Copy', id: 'copy' },
    { text: 'Paste', id: 'paste' }
  ];

  private shortcuts: { [key: string]: string } = {
    'cut': 'Ctrl+X',
    'copy': 'Ctrl+C',
    'paste': 'Ctrl+V'
  };

  onItemRender(args: MenuEventArgs): void {
    const shortcut = this.shortcuts[args.item.id as string];
    if (shortcut) {
      args.element.innerHTML = `
        <div style="display: flex; justify-content: space-between; width: 100%;">
          <span>${args.item.text}</span>
          <span class="shortcut">${shortcut}</span>
        </div>
      `;
    }
  }
}
```

### Keyboard Event Handling

```typescript
@Component({
  host: {
    '(keydown)': 'onKeyDown($event)'
  }
})
export class AppComponent {
  private menuOpen = false;
  private selectedIndex = -1;

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      this.selectNextItem();
      event.preventDefault();
    } else if (event.key === 'ArrowUp') {
      this.selectPreviousItem();
      event.preventDefault();
    } else if (event.key === 'Enter') {
      this.activateCurrentItem();
      event.preventDefault();
    } else if (event.key === 'Escape') {
      this.closeMenu();
      event.preventDefault();
    }
  }

  private selectNextItem(): void {
    // Navigation logic
    console.log('Next item');
  }

  private selectPreviousItem(): void {
    // Navigation logic
    console.log('Previous item');
  }

  private activateCurrentItem(): void {
    // Activate logic
    console.log('Activate current');
  }

  private closeMenu(): void {
    console.log('Close menu');
  }
}
```

## Complete Example: Advanced Features

```typescript
import { Component, ViewChild } from '@angular/core';
import { ContextMenuComponent, ContextMenuModule, MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-navigations';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContextMenuModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="e-section-control">
      <div id="target">Right click / Touch hold for advanced menu</div>
      
      <ejs-contextmenu 
        #contextmenu
        target='#target' 
        [items]='menuItems'
        (beforeItemRender)='onItemRender($event)'
        (select)='onSelect($event)'>
      </ejs-contextmenu>
    </div>
  `,
  styles: [`
    :host ::ng-deep .e-contextmenu-wrapper {
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    :host ::ng-deep .e-menu-item-text {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    :host ::ng-deep .shortcut-hint {
      font-size: 12px;
      color: #aaa;
      margin-left: 20px;
    }

    :host ::ng-deep .icon-label {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class AppComponent {
  @ViewChild('contextmenu')
  public contextmenu?: ContextMenuComponent;

  public menuItems: MenuItemModel[] = [
    { text: 'Cut', id: 'cut', iconCss: 'e-cm-icons e-cut' },
    { text: 'Copy', id: 'copy', iconCss: 'e-cm-icons e-copy' },
    { text: 'Paste', id: 'paste', iconCss: 'e-cm-icons e-paste' },
    { separator: true },
    { text: 'Select All', id: 'select-all', iconCss: 'e-icons e-select-all' },
    { separator: true },
    { text: 'Delete', id: 'delete', iconCss: 'e-icons e-delete' }
  ];

  private shortcuts: { [key: string]: string } = {
    'cut': 'Ctrl+X',
    'copy': 'Ctrl+C',
    'paste': 'Ctrl+V',
    'select-all': 'Ctrl+A',
    'delete': 'Del'
  };

  onItemRender(args: MenuEventArgs): void {
    if (!args.item.text) return; // Skip separators

    const shortcut = this.shortcuts[args.item.id as string];
    
    if (shortcut) {
      args.element.innerHTML = `
        <div class="e-menu-item-text">
          <span>${args.item.text}</span>
          <span class="shortcut-hint">${shortcut}</span>
        </div>
      `;
    }

    // Add accessibility attributes
    args.element.setAttribute('role', 'menuitem');
    args.element.setAttribute('aria-label', args.item.text);
  }

  onSelect(args: MenuEventArgs): void {
    console.log(`Action: ${args.item.text}`);
    
    switch (args.item.id) {
      case 'cut':
        console.log('Cutting content...');
        break;
      case 'copy':
        console.log('Copying content...');
        break;
      case 'paste':
        console.log('Pasting content...');
        break;
      case 'select-all':
        console.log('Selecting all...');
        break;
      case 'delete':
        console.log('Deleting content...');
        break;
    }
  }
}
```

---

**Skill Complete!** You now have comprehensive coverage of all ContextMenu features. For more advanced customization, refer to the Syncfusion documentation or explore the API reference.
