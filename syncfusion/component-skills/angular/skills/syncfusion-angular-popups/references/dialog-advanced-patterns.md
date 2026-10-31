# Advanced Patterns

## Table of Contents
- [Nested Dialogs](#nested-dialogs)
- [Ajax-Loaded Content](#ajax-loaded-content)
- [Utility Functions](#utility-functions)
- [Complex Layouts](#complex-layouts)
- [Scroll Handling & Centering](#scroll-handling--centering)
- [Custom Event Emitters](#custom-event-emitters)
- [Routing Integration](#routing-integration)
- [Examples](#examples)

## Nested Dialogs

### Creating Nested Dialogs

Nested dialogs are dialogs within dialogs - useful for multi-level workflows:

```typescript
import { Component, ViewChild } from '@angular/core';
import { DialogModule, DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-nested-dialogs',
  standalone: true,
  imports: [DialogModule],
  template: `
    <div id="dialog-container" style="height: 600px;">
      <button class="e-control e-btn" (click)="openParent()">
        Open Parent Dialog
      </button>

      <!-- Parent Dialog -->
      <ejs-dialog
        #parentDialog
        [showCloseIcon]="true"
        width="500px"
        position="TopLeft"
        content="This is the parent dialog"
      >
        <ng-template #header>
          <span>Parent Dialog</span>
        </ng-template>

        <ng-template #content>
          <p>Parent dialog content</p>
          <button 
            class="e-control e-btn"
            (click)="openChild()"
          >
            Open Child Dialog
          </button>

          <!-- Nested Child Dialog -->
          <ejs-dialog
            #childDialog
            [showCloseIcon]="true"
            width="350px"
            position="Center"
            content="This is the child dialog"
          >
            <ng-template #header>
              <span>Child Dialog (Nested)</span>
            </ng-template>
          </ejs-dialog>
        </ng-template>
      </ejs-dialog>
    </div>
  `
})
export class NestedDialogsComponent {
  @ViewChild('parentDialog') parentDialog!: DialogComponent;
  @ViewChild('childDialog') childDialog!: DialogComponent;

  openParent(): void {
    this.parentDialog.show();
  }

  openChild(): void {
    this.childDialog.show();
  }
}
```

### Cascading Nested Dialogs

Multiple dialogs at different positions:

```typescript
@Component({
  template: `
    <div id="dialog-container" style="height: 600px;">
      <button (click)="openDialog1()">Level 1</button>

      <ejs-dialog
        #dialog1
        [position]="{ X: 50, Y: 50 }"
        width="300px"
        [allowDragging]="true"
      >
        <ng-template #header><span>Dialog 1</span></ng-template>
        <ng-template #content>
          <button (click)="openDialog2()">Open Level 2</button>
        </ng-template>
      </ejs-dialog>

      <ejs-dialog
        #dialog2
        [position]="{ X: 150, Y: 150 }"
        width="250px"
        [allowDragging]="true"
      >
        <ng-template #header><span>Dialog 2</span></ng-template>
        <ng-template #content>
          <button (click)="openDialog3()">Open Level 3</button>
        </ng-template>
      </ejs-dialog>

      <ejs-dialog
        #dialog3
        [position]="{ X: 250, Y: 250 }"
        width="200px"
        [allowDragging]="true"
      >
        <ng-template #header><span>Dialog 3</span></ng-template>
        <ng-template #content>
          <p>Deepest level</p>
        </ng-template>
      </ejs-dialog>
    </div>
  `
})
export class CascadingDialogsComponent {
  @ViewChild('dialog1') dialog1!: DialogComponent;
  @ViewChild('dialog2') dialog2!: DialogComponent;
  @ViewChild('dialog3') dialog3!: DialogComponent;

  openDialog1(): void { this.dialog1.show(); }
  openDialog2(): void { this.dialog2.show(); }
  openDialog3(): void { this.dialog3.show(); }
}
```

## Ajax-Loaded Content

### Loading Content from Server

```typescript
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-ajax-content',
  standalone: true,
  imports: [DialogModule],
  template: `
    <div id="dialog-container" style="height: 600px;">
      <button (click)="openDialog()">Load Content</button>

      <ejs-dialog
        #dialog
        [showCloseIcon]="true"
        (open)="onDialogOpen()"
        width="500px"
      >
        <ng-template #header>
          <span>{{ dialogTitle }}</span>
        </ng-template>

        <ng-template #content>
          <div *ngIf="isLoading" class="loading">
            <p>Loading content...</p>
          </div>
          <div *ngIf="!isLoading && content" [innerHTML]="content">
          </div>
        </ng-template>
      </ejs-dialog>
    </div>
  `,
  styles: [`
    .loading {
      text-align: center;
      padding: 20px;
    }
  `]
})
export class AjaxContentComponent {
  @ViewChild('dialog') dialog!: DialogComponent;
  content: string | null = null;
  dialogTitle = 'Loading...';
  isLoading = false;

  constructor(private http: HttpClient) {}

  openDialog(): void {
    this.dialog.show();
  }

  onDialogOpen(): void {
    if (!this.content) {
      this.loadContent();
    }
  }

  loadContent(): void {
    this.isLoading = true;
    this.http.get('/api/dialog-content', { responseType: 'text' })
      .subscribe({
        next: (data) => {
          this.content = data;
          this.dialogTitle = 'Content Loaded';
          this.isLoading = false;
        },
        error: () => {
          this.content = '<p>Error loading content</p>';
          this.isLoading = false;
        }
      });
  }
}
```

### Progressive Content Loading

```typescript
@Component({
  template: `
    <ejs-dialog (open)="onOpen()">
      <ng-template #content>
        <div *ngFor="let section of sections">
          <h3>{{ section.title }}</h3>
          <p *ngIf="section.content">{{ section.content }}</p>
          <p *ngIf="!section.content" class="loading">Loading...</p>
        </div>
      </ng-template>
    </ejs-dialog>
  `
})
export class ProgressiveLoadingComponent {
  sections = [
    { title: 'Section 1', content: null },
    { title: 'Section 2', content: null },
    { title: 'Section 3', content: null }
  ];

  constructor(private http: HttpClient) {}

  onOpen(): void {
    this.sections.forEach((section, index) => {
      setTimeout(() => {
        this.http.get(`/api/content/${index}`, { responseType: 'text' })
          .subscribe(data => {
            section.content = data;
          });
      }, index * 500);
    });
  }
}
```

## Utility Functions

### Programmatic Dialog Creation

```typescript
import { Component } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  template: `
    <div id="dialog-container" style="height: 600px;">
      <button (click)="createDialog()">Create Dialog Dynamically</button>
      <button (click)="showAlert()">Show Alert</button>
      <button (click)="showConfirm()">Show Confirm</button>
    </div>
  `
})
export class DialogUtilityComponent {
  createDialog(): void {
    const dialogElement = document.createElement('ejs-dialog');
    dialogElement.id = 'dynamic-dialog';
    dialogElement.setAttribute('content', 'Dynamically created dialog');
    dialogElement.setAttribute('[showCloseIcon]', 'true');
    
    const container = document.getElementById('dialog-container');
    container?.appendChild(dialogElement);
  }

  showAlert(message: string): void {
    alert(message || 'Alert dialog');
  }

  showConfirm(): void {
    const confirmed = confirm('Are you sure?');
    console.log('User confirmed:', confirmed);
  }
}
```

### Dialog Manager Service

```typescript
import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DialogService {
  private dialogs: DialogComponent[] = [];

  openDialog(config: {
    title: string;
    content: string;
    buttons?: any[];
    width?: string;
  }): DialogComponent {
    // Create dialog instance
    const dialog = new DialogComponent();
    dialog.header = config.title;
    dialog.content = config.content;
    dialog.buttons = config.buttons;
    dialog.width = config.width || '400px';
    
    this.dialogs.push(dialog);
    dialog.show();
    
    return dialog;
  }

  closeDialog(dialog: DialogComponent): void {
    dialog.hide();
    const index = this.dialogs.indexOf(dialog);
    if (index > -1) {
      this.dialogs.splice(index, 1);
    }
  }

  closeAllDialogs(): void {
    this.dialogs.forEach(d => d.hide());
    this.dialogs = [];
  }

  getOpenDialogsCount(): number {
    return this.dialogs.length;
  }
}
```

## Complex Layouts

### Dialog with Rich Text Editor

```typescript
@Component({
  template: `
    <ejs-dialog #dialog width="600px">
      <ng-template #header>
        <span>Rich Content Editor</span>
      </ng-template>

      <ng-template #content>
        <div class="editor-container">
          <textarea id="editor" [(ngModel)]="content"></textarea>
        </div>
      </ng-template>

      <ng-template #footerTemplate>
        <button class="e-control e-btn e-primary" (click)="onSave()">
          Save
        </button>
      </ng-template>
    </ejs-dialog>
  `,
  styles: [`
    .editor-container {
      min-height: 300px;
      border: 1px solid #ddd;
      padding: 10px;
    }
    textarea {
      width: 100%;
      min-height: 300px;
      border: none;
      font-family: monospace;
    }
  `]
})
export class RichContentDialogComponent {
  @ViewChild('dialog') dialog!: DialogComponent;
  content = '';

  onSave(): void {
    console.log('Saved content:', this.content);
    this.dialog.hide();
  }
}
```

### Multi-Column Dialog

```typescript
@Component({
  template: `
    <ejs-dialog width="800px">
      <ng-template #content>
        <div class="multi-column-layout">
          <div class="column-left">
            <h3>Options</h3>
            <ul>
              <li *ngFor="let option of options">
                {{ option }}
              </li>
            </ul>
          </div>
          
          <div class="column-right">
            <h3>Preview</h3>
            <p>Selected option preview</p>
          </div>
        </div>
      </ng-template>
    </ejs-dialog>
  `,
  styles: [`
    .multi-column-layout {
      display: flex;
      gap: 20px;
    }
    .column-left, .column-right {
      flex: 1;
    }
    .column-left ul {
      list-style: none;
      padding: 0;
    }
    .column-left li {
      padding: 8px;
      background: #f5f5f5;
      margin-bottom: 5px;
      cursor: pointer;
    }
  `]
})
export class MultiColumnDialogComponent {
  options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
}
```

## Scroll Handling & Centering

### Auto-Center on Scroll

```typescript
@Component({
  template: `
    <div id="dialog-container" style="height: 1000px;">
      <div style="height: 500px;">Scroll down...</div>
      
      <ejs-dialog
        #dialog
        position="Center"
        content="This stays centered during scroll"
      >
      </ejs-dialog>
    </div>
  `
})
export class AutoCenterComponent {
  @ViewChild('dialog') dialog!: DialogComponent;
  @HostListener('window:scroll', [])
  onScroll(): void {
    // Dialog automatically centers in viewport
  }
}
```

### Manual Centering Function

```typescript
@Component({
  template: `
    <ejs-dialog #dialog width="500px">
      <ng-template #header>
        <span>Centered Dialog</span>
      </ng-template>
    </ejs-dialog>
  `
})
export class ManualCenterComponent {
  @ViewChild('dialog') dialog!: DialogComponent;

  centerDialog(): void {
    const dialogElement = document.querySelector('.e-dialog') as HTMLElement;
    if (dialogElement) {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const dialogHeight = dialogElement.offsetHeight;
      const dialogWidth = dialogElement.offsetWidth;

      const top = (windowHeight - dialogHeight) / 2;
      const left = (windowWidth - dialogWidth) / 2;

      dialogElement.style.top = `${top}px`;
      dialogElement.style.left = `${left}px`;
    }
  }
}
```

## Custom Event Emitters

### Dialog Events with Output

```typescript
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-custom-dialog',
  standalone: true,
  imports: [DialogModule],
  template: `
    <ejs-dialog
      #dialog
      (open)="onOpen()"
      (close)="onClose()"
    >
    </ejs-dialog>
  `
})
export class CustomDialogComponent {
  @ViewChild('dialog') dialog!: DialogComponent;
  @Output() dialogOpened = new EventEmitter<void>();
  @Output() dialogClosed = new EventEmitter<void>();

  onOpen(): void {
    this.dialogOpened.emit();
  }

  onClose(): void {
    this.dialogClosed.emit();
  }
}

// Usage in parent
@Component({
  template: `
    <app-custom-dialog
      (dialogOpened)="onDialogOpened()"
      (dialogClosed)="onDialogClosed()"
    >
    </app-custom-dialog>
  `
})
export class ParentComponent {
  onDialogOpened(): void {
    console.log('Custom dialog opened event received');
  }

  onDialogClosed(): void {
    console.log('Custom dialog closed event received');
  }
}
```

## Routing Integration

### Dialog with Route Parameters

```typescript
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-route-dialog',
  standalone: true,
  imports: [DialogModule],
  template: `
    <ejs-dialog
      #dialog
      (open)="onOpen()"
    >
      <ng-template #header>
        <span>{{ itemName }}</span>
      </ng-template>

      <ng-template #content>
        <p>Details for item ID: {{ itemId }}</p>
      </ng-template>
    </ejs-dialog>
  `
})
export class RouteDialogComponent {
  @ViewChild('dialog') dialog!: DialogComponent;
  itemId: string | null = null;
  itemName: string = 'Item';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.itemId = params['id'];
      this.itemName = params['name'] || 'Item';
      this.dialog.show();
    });
  }

  onOpen(): void {
    console.log('Dialog opened for item:', this.itemId);
  }
}
```

### Dialog in Modal Routing

```typescript
@Component({
  selector: 'app-modal-route',
  template: `
    <ejs-dialog
      #dialog
      [isModal]="true"
      (beforeClose)="onBeforeClose($event)"
    >
      <ng-template #header>
        <span>Modal Dialog Route</span>
      </ng-template>

      <ng-template #content>
        <p>This dialog is shown as a modal route.</p>
      </ng-template>

      <ng-template #footerTemplate>
        <button class="e-control e-btn" (click)="closeAndNavigate()">
          Done
        </button>
      </ng-template>
    </ejs-dialog>
  `
})
export class ModalRouteComponent {
  @ViewChild('dialog') dialog!: DialogComponent;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  closeAndNavigate(): void {
    this.dialog.hide();
    this.route.navigate(['..'], { relativeTo: this.activatedRoute });
  }

  onBeforeClose(args: any): void {
    if (!this.isDataSaved()) {
      args.cancel = true;
      alert('Save your changes before closing');
    }
  }

  isDataSaved(): boolean {
    return true;
  }
}
```

## Examples

### Example 1: Confirmation Dialog with Async Operation

```typescript
@Component({
  template: `
    <ejs-dialog
      #dialog
      [isModal]="true"
      (beforeClose)="onBeforeClose($event)"
    >
      <ng-template #header>
        <span>Confirm Action</span>
      </ng-template>

      <ng-template #content>
        <p>{{ message }}</p>
        <div *ngIf="isProcessing" class="spinner">
          Processing...
        </div>
      </ng-template>

      <ng-template #footerTemplate>
        <button 
          class="e-control e-btn"
          [disabled]="isProcessing"
          (click)="dialog.hide()"
        >
          Cancel
        </button>
        <button 
          class="e-control e-btn e-primary"
          [disabled]="isProcessing"
          (click)="confirmAction()"
        >
          {{ isProcessing ? 'Processing...' : 'Confirm' }}
        </button>
      </ng-template>
    </ejs-dialog>
  `
})
export class ConfirmationWithAsyncComponent {
  @ViewChild('dialog') dialog!: DialogComponent;
  message = 'Are you sure you want to proceed?';
  isProcessing = false;

  confirmAction(): void {
    this.isProcessing = true;
    
    // Simulate async operation
    this.performAsyncOperation()
      .then(() => {
        console.log('Operation completed');
        this.dialog.hide();
      })
      .catch(error => {
        alert('Error: ' + error);
      })
      .finally(() => {
        this.isProcessing = false;
      });
  }

  performAsyncOperation(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => resolve(), 2000);
    });
  }

  onBeforeClose(args: any): void {
    if (this.isProcessing) {
      args.cancel = true;
    }
  }
}
```

