# Multiline and Sizing Features

## Table of Contents
- [Multiline Configuration](#multiline-configuration)
- [Textarea Setup](#textarea-setup)
- [Height Management](#height-management)
- [Responsive Design](#responsive-design)
- [Character Counting](#character-counting)
- [Edge Cases](#edge-cases)

---

## Multiline Configuration

The TextBox component supports multiline text input through the `multiline` property, allowing users to enter content that spans multiple lines.

### Basic Multiline

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-multiline-basic',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <h2>Multiline TextBox</h2>
      <ejs-textbox 
        placeholder="Enter your message"
        [multiline]="true"
        [floatLabelType]="'Auto'"
      ></ejs-textbox>
    </div>
  `
})
export class MultilineBasicComponent {}
```

### Enable/Disable Multiline Dynamically

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toggle-multiline',
  standalone: true,
  imports: [TextBoxModule, CommonModule],
  template: `
    <div style="margin: 50px;">
      <label>
        <input type="checkbox" [(ngModel)]="isMultiline"> Multiline
      </label>
      <ejs-textbox 
        placeholder="Type here"
        [multiline]="isMultiline"
        [floatLabelType]="'Auto'"
      ></ejs-textbox>
    </div>
  `
})
export class ToggleMultilineComponent {
  isMultiline = false;
}
```

---

## Textarea Setup

When multiline is enabled, the component behaves like a textarea but with Syncfusion's enhanced features.

### Auto Resizing

Create a multiline TextBox that automatically adjusts its height based on content using the `created` and `input` events combined with the [`addAttributes`](api.md#addattributes) method:

```typescript
import { Component, ViewChild } from '@angular/core';
import { TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-auto-resize',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox #textbox [multiline]="true"
        value="Mr. Dodsworth Dodsworth, System Analyst, Studio 103"
        floatLabelType="Auto" placeholder="Enter your address"
        (created)="createHandler($event)" (input)="inputHandler($event)">
      </ejs-textbox>
    </div>
  `
})
export class AutoResizeComponent {
  @ViewChild('textbox')
  public textareaObj!: TextBoxComponent;

  public createHandler(args: any): void {
    this.textareaObj.addAttributes({ rows: 1 } as any);
    this.textareaObj.element.style.height = 'auto';
    this.textareaObj.element.style.height = this.textareaObj.element.scrollHeight + 'px';
  }

  public inputHandler(args: any): void {
    this.textareaObj.element.style.height = 'auto';
    this.textareaObj.element.style.height = this.textareaObj.element.scrollHeight + 'px';
  }
}
```

### Disable Resizing

Prevent users from manually resizing the multiline TextBox by applying CSS:

```css
textarea.e-input,
.e-input-group textarea,
.e-input-group textarea.e-input,
.e-input-group.e-control-wrapper textarea,
.e-float-input textarea,
.e-float-input.e-control-wrapper textarea {
  resize: none;
}
```

### Multiline with Rows via addAttributes

Use the [`addAttributes`](api.md#addattributes) method in the `(created)` event to set the `rows` attribute on the underlying textarea element, since `rows` is not a direct component property:

```typescript
import { Component, ViewChild } from '@angular/core';
import { TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-textarea-rows',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <h3>Comments (5 rows)</h3>
      <ejs-textbox #commentsBox
        placeholder="Enter your comments"
        [multiline]="true"
        floatLabelType="Auto"
        (created)="onCommentsCreated()"
      ></ejs-textbox>

      <h3>Description (10 rows)</h3>
      <ejs-textbox #descBox
        placeholder="Enter description"
        [multiline]="true"
        floatLabelType="Auto"
        (created)="onDescCreated()"
      ></ejs-textbox>
    </div>
  `
})
export class TextareaRowsComponent {
  @ViewChild('commentsBox') commentsBox!: TextBoxComponent;
  @ViewChild('descBox') descBox!: TextBoxComponent;

  onCommentsCreated(): void {
    this.commentsBox.addAttributes({ rows: '5' } as any);
  }

  onDescCreated(): void {
    this.descBox.addAttributes({ rows: '10' } as any);
  }
}
```

---

## Height Management

### Auto-Growing Textarea

```typescript
import { Component, ViewChild } from '@angular/core';
import { TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auto-grow',
  standalone: true,
  imports: [TextBoxModule, FormsModule],
  template: `
    <div style="margin: 50px; max-width: 500px;">
      <ejs-textbox 
        #autoGrowTextarea
        [(ngModel)]="content"
        placeholder="Type and watch me grow..."
        [multiline]="true"
        [cssClass]="'auto-grow'"
        (created)="onCreated()"
        (input)="adjustHeight()"
      ></ejs-textbox>
    </div>
  `,
  styles: [`
    :host ::ng-deep .e-float-input.auto-grow textarea {
      resize: none;
      min-height: 80px;
      max-height: 400px;
      overflow-y: auto;
    }
  `]
})
export class AutoGrowComponent {
  @ViewChild('autoGrowTextarea') textareaRef!: TextBoxComponent;
  content = '';

  onCreated(): void {
    this.textareaRef.addAttributes({ rows: '3' } as any);
  }

  adjustHeight() {
    const textarea = this.textareaRef?.element;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }
}
```

### Fixed Height with Scroll

Use CSS to set a fixed height on the textarea. The `rows` attribute is not a component property; use `addAttributes` if you need it:

```typescript
@Component({
  selector: 'app-fixed-height-scroll',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox 
        placeholder="Fixed height with scroll"
        [multiline]="true"
        [cssClass]="'fixed-height'"
      ></ejs-textbox>
    </div>
  `,
  styles: [`
    :host ::ng-deep .e-float-input.fixed-height textarea {
      height: 200px;
      overflow-y: auto;
      resize: none;
    }
  `]
})
export class FixedHeightScrollComponent {}
```

### Min and Max Height

```typescript
@Component({
  selector: 'app-minmax-height',
  standalone: true,
  imports: [TextBoxModule],
  styles: [`
    :host ::ng-deep .e-float-input.minmax textarea {
      min-height: 100px;
      max-height: 300px;
      resize: vertical;
    }
  `],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox 
        placeholder="Drag to resize (100px - 300px)"
        [multiline]="true"
        [cssClass]="'minmax'"
      ></ejs-textbox>
    </div>
  `
})
export class MinMaxHeightComponent {}
```

---

## Responsive Design

### Mobile-Friendly Multiline

```typescript
@Component({
  selector: 'app-responsive-multiline',
  standalone: true,
  imports: [TextBoxModule],
  styles: [`
    :host ::ng-deep {
      /* Desktop */
      .e-float-input.responsive textarea {
        font-size: 14px;
        padding: 12px;
        min-height: 120px;
      }

      /* Tablet */
      @media (max-width: 768px) {
        .e-float-input.responsive textarea {
          font-size: 16px;
          padding: 10px;
          min-height: 100px;
        }
      }

      /* Mobile */
      @media (max-width: 480px) {
        .e-float-input.responsive textarea {
          font-size: 16px;
          padding: 8px;
          min-height: 80px;
          width: 100% !important;
        }
      }
    }
  `],
  template: `
    <div style="margin: 20px; max-width: 600px;">
      <ejs-textbox 
        placeholder="Responsive textarea"
        [multiline]="true"
        [cssClass]="'responsive'"
      ></ejs-textbox>
    </div>
  `
})
export class ResponsiveMultilineComponent {}
```

### Flexbox Container

```typescript
@Component({
  selector: 'app-flex-multiline',
  standalone: true,
  imports: [TextBoxModule],
  styles: [`
    :host ::ng-deep .form-group {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }

    :host ::ng-deep .form-group .e-float-input {
      flex: 1 1 100%;
      min-width: 200px;
    }

    :host ::ng-deep .form-group .e-float-input.half-width {
      flex: 1 1 calc(50% - 8px);
    }
  `],
  template: `
    <div class="form-group">
      <ejs-textbox 
        placeholder="Full width"
        [multiline]="true"
      ></ejs-textbox>
      <ejs-textbox 
        placeholder="Half width"
        [multiline]="true"
        [cssClass]="'half-width'"
      ></ejs-textbox>
    </div>
  `
})
export class FlexMultilineComponent {}
```

---

## Character Counting

### Real-Time Character Count

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-char-count',
  standalone: true,
  imports: [TextBoxModule, FormsModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox 
        [(ngModel)]="content"
        placeholder="Type message (max 100 characters)"
        [multiline]="true"
      ></ejs-textbox>
      <p style="font-size: 12px; color: #666; margin-top: 8px;">
        {{ content.length }} / 100 characters
      </p>
    </div>
  `
})
export class CharCountComponent {
  content = '';
}
```

### Character Count with Warning

```typescript
@Component({
  selector: 'app-char-warning',
  standalone: true,
  imports: [TextBoxModule, FormsModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox 
        [(ngModel)]="content"
        placeholder="Type comment"
        [multiline]="true"
        [htmlAttributes]="{ maxlength: '100' }"
      ></ejs-textbox>
      <p [style.color]="getCountColor()">
        {{ content.length }}/100
        <span *ngIf="content.length > 80" style="color: #ffca1c;">
          ({{ 100 - content.length }} remaining)
        </span>
      </p>
    </div>
  `
})
export class CharWarningComponent {
  content = '';

  getCountColor(): string {
    if (this.content.length > 95) return '#dc2626';
    if (this.content.length > 80) return '#ffca1c';
    return '#666';
  }
}
```

### Word Count

```typescript
@Component({
  selector: 'app-word-count',
  standalone: true,
  imports: [TextBoxModule, FormsModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox 
        [(ngModel)]="content"
        placeholder="Type text"
        [multiline]="true"
      ></ejs-textbox>
      <div style="margin-top: 10px; font-size: 12px; color: #666;">
        <p>Characters: {{ content.length }}</p>
        <p>Words: {{ getWordCount() }}</p>
        <p>Lines: {{ getLineCount() }}</p>
      </div>
    </div>
  `
})
export class WordCountComponent {
  content = '';

  getWordCount(): number {
    return this.content.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  getLineCount(): number {
    return this.content.split('\n').length;
  }
}
```

---

## Edge Cases

### Preserve Line Breaks

```typescript
@Component({
  selector: 'app-preserve-breaks',
  standalone: true,
  imports: [TextBoxModule, FormsModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox 
        [(ngModel)]="content"
        placeholder="Line breaks are preserved"
        [multiline]="true"
        (change)="displayContent()"
      ></ejs-textbox>
      <pre>{{ displayedContent }}</pre>
    </div>
  `
})
export class PreserveBreaksComponent {
  content = '';
  displayedContent = '';

  displayContent() {
    // Preserve exact content with breaks
    this.displayedContent = this.content;
  }
}
```

---

## Next Steps

- Learn about [styling-appearance.md](styling-appearance.md) for textarea styling
- Explore [validation-states.md](validation-states.md) for multiline validation
- Check [accessibility-migration.md](accessibility-migration.md) for textarea accessibility

