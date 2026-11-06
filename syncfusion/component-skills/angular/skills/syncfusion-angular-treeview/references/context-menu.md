# Context Menu Integration

## Table of Contents
- [Overview](#overview)
- [Setup Context Menu](#setup-context-menu)
- [Menu Items & Events](#menu-items--events)
- [Node Operations](#node-operations)
- [Dynamic Menus](#dynamic-menus)
- [Disabling Items](#disabling-items)

---

## Overview

TreeView integrates with Syncfusion ContextMenu component to provide right-click functionality for node operations like add, edit, delete, and custom actions.

## Setup Context Menu

### Package Installation

ContextMenu is part of the navigations package, so it's already available:

```bash
npm install @syncfusion/ej2-angular-navigations --save
```

No separate installation needed - both TreeView and ContextMenu are in the same package.

### Basic Integration

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeViewModule, TreeViewComponent, ContextMenuModule, ContextMenuComponent } from '@syncfusion/ej2-angular-navigations';
import { FormsModule } from '@angular/forms';
import { NodeClickEventArgs, BeforeOpenCloseMenuEventArgs, MenuEventArgs, MenuItemModel } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-context-menu-tree',
  standalone: true,
  imports: [FormsModule, TreeViewModule, ContextMenuModule],
  template: `
    <div id="treeparent">
      <ejs-treeview
        #treevalidate
        id="tree"
        [fields]="field"
        (nodeClicked)="nodeclicked($event)">
      </ejs-treeview>
      
      <ejs-contextmenu
        #contentmenutree
        id="contentmenutree"
        target="#tree"
        [items]="menuItems"
        (beforeOpen)="beforeopen($event)"
        (select)="menuclick($event)">
      </ejs-contextmenu>
    </div>
  `
})
export class ContextMenuTreeComponent {
  @ViewChild('treevalidate') treevalidate?: TreeViewComponent;
  @ViewChild('contentmenutree') contentmenutree?: ContextMenuComponent;

  public hierarchicalData: Object[] = [
    {
      id: '01', name: 'Local Disk (C:)', expanded: true, hasAttribute: { class: 'remove rename' },
      subChild: [
        {
          id: '01-01', name: 'Program Files',
          subChild: [
            { id: '01-01-01', name: 'Windows NT' },
            { id: '01-01-02', name: 'Windows Mail' },
            { id: '01-01-03', name: 'Windows Photo Viewer' },
          ]
        },
        {
          id: '01-02', name: 'Users', expanded: true,
          subChild: [
            { id: '01-02-01', name: 'Smith' },
            { id: '01-02-02', name: 'Public' },
            { id: '01-02-03', name: 'Admin' },
          ]
        },
      ]
    },
    {
      id: '02', name: 'Local Disk (D:)', hasAttribute: { class: 'remove' },
      subChild: [
        {
          id: '02-01', name: 'Personals',
          subChild: [
            { id: '02-01-01', name: 'My photo.png' },
            { id: '02-01-02', name: 'Rental document.docx' },
            { id: '02-01-03', name: 'Pay slip.pdf' },
          ]
        }
      ]
    }
  ];

  public field: Object = { dataSource: this.hierarchicalData, id: 'id', text: 'name', child: 'subChild', htmlAttributes: 'hasAttribute' };

  public nodeclicked(args: NodeClickEventArgs): void {
    if (args.event.which === 3) {
      (this.treevalidate as TreeViewComponent).selectedNodes = [args.node.getAttribute('data-uid') as string];
    }
  }

  public menuItems: MenuItemModel[] = [
    { text: 'Add New Item' },
    { text: 'Rename Item' },
    { text: 'Remove Item' }
  ];

  public index: number = 1;
  
  public menuclick(args: MenuEventArgs): void {
    let targetNodeId: string = this.treevalidate?.selectedNodes[0] as string;
    if (args.item.text == "Add New Item") {
      let nodeId: string = "tree_" + this.index;
      let item: { [key: string]: Object } = { id: nodeId, name: "New Folder" };
      this.treevalidate?.addNodes([item], targetNodeId, null as any);
      this.index++;
      this.treevalidate?.beginEdit(nodeId);
    }
    else if (args.item.text == "Remove Item") {
      this.treevalidate?.removeNodes([targetNodeId]);
    }
    else if (args.item.text == "Rename Item") {
      this.treevalidate?.beginEdit(targetNodeId);
    }
  }

  public beforeopen(args: BeforeOpenCloseMenuEventArgs): void {
    let targetNodeId: string = this.treevalidate?.selectedNodes[0] as string;
    let targetNode: Element = document.querySelector('[data-uid="' + targetNodeId + '"]') as Element;
    
    if (targetNode?.classList.contains('remove')) {
      this.contentmenutree?.enableItems(['Remove Item'], false);
    } else {
      this.contentmenutree?.enableItems(['Remove Item'], true);
    }
    
    if (targetNode?.classList.contains('rename')) {
      this.contentmenutree?.enableItems(['Rename Item'], false);
    } else {
      this.contentmenutree?.enableItems(['Rename Item'], true);
    }
  }
}
```

## Menu Items & Events

### Customized Menu Items

```typescript
contextMenuItems: MenuItemModel[] = [
  {
    text: 'Expand All',
    iconCss: 'e-icons e-chevron-down',
    id: 'expand-all'
  },
  {
    text: 'Collapse All',
    iconCss: 'e-icons e-chevron-up',
    id: 'collapse-all'
  },
  { separator: true },
  {
    text: 'Properties',
    iconCss: 'e-icons e-settings',
    id: 'properties'
  }
];
```

### Submenu Items

```typescript
contextMenuItems: MenuItemModel[] = [
  {
    text: 'File',
    items: [
      { text: 'New Folder', id: 'new-folder' },
      { text: 'Import', id: 'import' },
      { text: 'Export', id: 'export' }
    ]
  },
  {
    text: 'Edit',
    items: [
      { text: 'Rename', id: 'rename' },
      { text: 'Move', id: 'move' },
      { text: 'Delete', id: 'delete' }
    ]
  }
];
```

### Menu Item Events

```typescript
onContextMenuSelect(event: MenuEventArgs): void {
  const menuItem = event.item;
  console.log('Selected menu item:', menuItem?.text);
  console.log('Menu item ID:', menuItem?.id);
  
  // Check if item is disabled
  if (menuItem?.disabled) {
    return;
  }

  // Handle the menu action
  this.handleMenuAction(menuItem?.id as string);
}
```

## Node Operations

### Create Folder via Menu

```typescript
private createFolder(): void {
  const folderName = prompt('Enter folder name:');
  if (!folderName) return;

  const newFolder = {
    id: Date.now(),
    name: folderName,
    pid: this.selectedNode?.id,
    hasChild: true,
    expanded: true
  };

  this.treeViewComponent?.addNodes([newFolder], this.selectedNode?.id);
}
```

### Rename Node via Menu

```typescript
private renameNode(): void {
  this.treeViewComponent?.beginEdit(this.selectedNode?.id);
}
```

### Delete with Confirmation

```typescript
private deleteWithConfirm(): void {
  const message = `Delete "${this.selectedNode?.name}"?`;
  
  if (confirm(message)) {
    this.treeViewComponent?.removeNodes([this.selectedNode?.id]);
    console.log('Node deleted successfully');
  }
}
```

### Move to Different Parent

```typescript
private moveNode(): void {
  const newParentId = prompt('Enter target parent ID:');
  if (newParentId) {
    this.treeViewComponent?.moveNodes(
      [this.selectedNode?.id],
      newParentId
    );
  }
}
```

## Dynamic Menus

### Show Different Menu Items Based on Node Type

```typescript
onContextMenuOpen(event: BeforeOpenCloseMenuEventArgs): void {
  const target = event.event?.target as HTMLElement;
  const treeNode = target?.closest('.e-list-item');
  const nodeId = treeNode?.getAttribute('data-uid');
  this.selectedNode = this.treeViewComponent?.getTreeData(nodeId)?.[0];

  // Update menu based on node type
  this.updateContextMenu();
}

updateContextMenu(): void {
  if (this.selectedNode?.isFile) {
    // Show file-specific menu items
    this.contextMenuItems = [
      { text: 'Open', id: 'open' },
      { text: 'Edit', id: 'edit' },
      { separator: true },
      { text: 'Delete', id: 'delete' }
    ];
  } else {
    // Show folder-specific menu items
    this.contextMenuItems = [
      { text: 'Add', id: 'add' },
      { text: 'Rename', id: 'rename' },
      { separator: true },
      { text: 'Delete', id: 'delete' }
    ];
  }
}
```

### Conditional Menu Items

```typescript
contextMenuItems: MenuItemModel[] = [];

onContextMenuOpen(event: BeforeOpenCloseMenuEventArgs): void {
  // Determine node type
  const isFolder = this.selectedNode?.hasChild;
  
  this.contextMenuItems = [
    { text: 'Rename', id: 'rename' },
    ...(isFolder ? [{ text: 'Add Item', id: 'add' }] : []),
    { separator: true },
    { text: 'Delete', id: 'delete' }
  ];

  // Refresh context menu
  this.contextMenuComponent?.refresh();
}
```

## Disabling Items

### Disable Based on Conditions

```typescript
onContextMenuOpen(event: BeforeOpenCloseMenuEventArgs): void {
  // Disable certain actions based on user permissions
  const canEdit = this.userCanEdit(this.selectedNode);
  const canDelete = this.userCanDelete(this.selectedNode);

  this.contextMenuItems = [
    { text: 'Edit', id: 'edit', disabled: !canEdit },
    { text: 'Delete', id: 'delete', disabled: !canDelete }
  ];

  this.contextMenuComponent?.refresh();
}

userCanEdit(node: any): boolean {
  return node?.editable !== false;
}

userCanDelete(node: any): boolean {
  return node?.protected !== true;
}
```

### Disable Paste When Clipboard Empty

```typescript
onContextMenuOpen(event: BeforeOpenCloseMenuEventArgs): void {
  const hasClipboard = localStorage.getItem('clipboard') !== null;
  
  this.contextMenuItems = [
    { text: 'Copy', id: 'copy' },
    { text: 'Cut', id: 'cut' },
    { text: 'Paste', id: 'paste', disabled: !hasClipboard }
  ];

  this.contextMenuComponent?.refresh();
}
```

### Disable for Root Nodes

```typescript
onContextMenuOpen(event: BeforeOpenCloseMenuEventArgs): void {
  const isRootNode = this.selectedNode?.level === 0;
  
  this.contextMenuItems = [
    { text: 'Add', id: 'add' },
    { text: 'Delete', id: 'delete', disabled: isRootNode },
    { text: 'Move', id: 'move', disabled: isRootNode }
  ];

  this.contextMenuComponent?.refresh();
}
```

---

**Best Practices:**
- Always confirm destructive actions (delete, cut)
- Disable menu items when actions aren't applicable
- Provide visual feedback for completed operations
- Use keyboard shortcuts for frequent operations
- Group related menu items with separators
- Handle copy/paste using browser clipboard API or localStorage
- Show context menu only on valid targets
- Provide undo functionality for reversible operations
