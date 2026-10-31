# Validation, Security & Editor Access Control

Reference for Angular form integration (template-driven and reactive), XHTML validation, XSS prevention, read-only mode, and disabled state management.

---

## Table of Contents
- [Template-Driven Form Integration](#template-driven-form-integration)
- [Reactive Form Integration](#reactive-form-integration)
  - [Basic reactive form binding](#basic-reactive-form-binding)
  - [Dynamic enable/disable with FormControl](#dynamic-enabledisable-with-formcontrol)
- [Read-Only Mode](#read-only-mode)
- [Disabled Mode](#disabled-mode)
- [XHTML Validation](#xhtml-validation)
  - [Attribute rules](#attribute-rules)
  - [Element rules](#element-rules)
- [XSS Prevention](#xss-prevention)
  - [Built-in sanitization (default on)](#built-in-sanitization-default-on)
  - [Custom XSS filtering with beforeSanitizeHtml](#custom-xss-filtering-with-beforesanitizehtml)
  - [Allowing specific tags (e.g., iframe)](#allowing-specific-tags-eg-iframe)

---

## Template-Driven Form Integration

Use `ngModel` with the `name` attribute to register the RTE in a template-driven form. Import `FormsModule` in your component:

```typescript
import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import {
    RichTextEditorAllModule, ToolbarService, LinkService,
    ImageService, HtmlEditorService, RichTextEditorComponent
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
    imports: [RichTextEditorAllModule, FormsModule, ButtonModule,
        ReactiveFormsModule, CommonModule],
    standalone: true,
    selector: 'app-root',
    template: `
        <form (ngSubmit)="onSubmit()" #editorForm="ngForm">
            <ejs-richtexteditor
                #fromEditor
                #name="ngModel"
                [(value)]="value"
                [(ngModel)]="value"
                name="content"
                required
                (created)="editorCreated()">
            </ejs-richtexteditor>
            <div *ngIf="name.invalid && name.touched" class="alert alert-danger">
                <div *ngIf="name.errors!['required']">Value is required.</div>
            </div>
            <button type="submit" ejs-button [disabled]="!editorForm.valid">Submit</button>
            <button type="reset" ejs-button style="margin-left: 20px">Reset</button>
        </form>`,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class AppComponent {
    value: string | null = null;

    @ViewChild('fromEditor') editorEle!: RichTextEditorComponent;

    editorCreated(): void {
        this.editorEle.element.focus();
    }

    onSubmit(): void {
        alert('Form submitted successfully');
    }
}
```

**Key points:**
- `name` attribute is required for `ngForm` to detect the control
- Use `[(ngModel)]` for two-way binding
- Apply `required` validator directly on the component element
- Validation errors are accessible via `#name="ngModel"`

---

## Reactive Form Integration

### Basic reactive form binding

Use `formControlName` to bind the RTE in a reactive form. Import `ReactiveFormsModule`:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    RichTextEditorModule, ToolbarService, LinkService, ImageService,
    HtmlEditorService, QuickToolbarService, TableService, PasteCleanupService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
    imports: [RichTextEditorModule, FormsModule, CommonModule, ReactiveFormsModule],
    standalone: true,
    selector: 'app-root',
    template: `
        <form [formGroup]="editorForm">
            <div>Current value: <pre>{{ editorForm.controls['editor'].value }}</pre></div>
            <ejs-richtexteditor formControlName="editor" [saveInterval]="1">
            </ejs-richtexteditor>
        </form>`,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService,
        QuickToolbarService, TableService, PasteCleanupService]
})
export class AppComponent {
    editorForm = new FormGroup({
        editor: new FormControl('<p><b>Rich Text Editor</b> with Reactive Form</p>')
    });
}
```

**Key point:** Set `[saveInterval]="1"` (milliseconds) to ensure the `FormControl` value updates immediately as the user types rather than on blur.

### Dynamic enable/disable with FormControl

In Angular 15+, use `FormControl.disable()` and `FormControl.enable()` to programmatically toggle the editor:

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
    RichTextEditorModule, ToolbarService, LinkService, ImageService,
    HtmlEditorService, QuickToolbarService, TableService, PasteCleanupService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
    imports: [RichTextEditorModule, FormsModule, CommonModule, ReactiveFormsModule],
    standalone: true,
    selector: 'app-root',
    template: `
        <input type="checkbox" [(ngModel)]="isDisabled" (change)="onCheckboxChange()"/>
        <label>Disabled</label>
        <form [formGroup]="form">
            <ejs-richtexteditor formControlName="editor"></ejs-richtexteditor>
        </form>`,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService,
        QuickToolbarService, TableService, PasteCleanupService]
})
export class AppComponent {
    isDisabled = true;
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            editor: new FormControl({ value: '', disabled: true })
        });
    }

    onCheckboxChange(): void {
        const ctrl = this.form.get('editor')!;
        this.isDisabled ? ctrl.disable() : ctrl.enable();
    }
}
```

---

## Read-Only Mode

Read-only mode allows users to view content but not edit it. Toolbar buttons are visible but inactive:

```typescript
@Component({
    template: `<ejs-richtexteditor
        [readonly]="true"
        [value]="value"
        [toolbarSettings]="tools">
    </ejs-richtexteditor>`,
    providers: [ToolbarService, HtmlEditorService, QuickToolbarService,
        LinkService, ImageService, TableService, PasteCleanupService]
})
export class AppComponent {
    value = '<p>This content is <b>read-only</b>. Users can view but not edit.</p>';
    tools = { items: ['Bold', 'Italic', 'Underline', '|', 'Undo', 'Redo'] };
}
```

| Property | Value | Effect |
|----------|-------|--------|
| `[readonly]` | `true` | Content visible, editing disabled, toolbar shown |
| `[enabled]` | `false` | Entire editor disabled (no interaction at all) |

---

## Disabled Mode

Disabled mode makes the entire editor non-interactive. Unlike read-only, users cannot interact with the toolbar either:

```typescript
@Component({
    template: `<ejs-richtexteditor [enabled]="false" [toolbarSettings]="tools"></ejs-richtexteditor>`,
    providers: [ToolbarService, HtmlEditorService, QuickToolbarService,
        LinkService, ImageService, TableService, PasteCleanupService]
})
export class AppComponent {
    tools = { items: ['Bold', 'Italic', 'Underline', 'FullScreen'] };
}
```

---

## XHTML Validation

Enable `[enableXhtml]="true"` to continuously validate and auto-correct editor content against XHTML standards. Requires `editorMode: 'HTML'`.

```typescript
@Component({
    template: `<ejs-richtexteditor [enableXhtml]="true"></ejs-richtexteditor>`,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService,
        QuickToolbarService, TableService, PasteCleanupService]
})
export class AppComponent {}
```

### Attribute rules

When `enableXhtml` is enabled, these attribute rules are enforced:
- Attributes must be **lowercase** (`class`, not `CLASS`)
- Attribute values must be **quoted**
- Only **valid attributes** for each element are allowed
- **Required attributes** must be present (e.g., `alt` on `<img>`)

### Element rules

- Tags must be **lowercase** (`<p>`, not `<P>`)
- All tags must be **properly closed**
- Only **valid HTML elements** are permitted
- Elements must be **properly nested** (no inline elements wrapping block elements)
- Content must have a **single root element**

> **Note:** `enableXhtml: true` is also required when using the built-in export features (`ExportWord`, `ExportPdf`) to ensure valid document structure.

---

## XSS Prevention

### Built-in sanitization (default on)

`enableHtmlSanitizer` is `true` by default. It automatically strips dangerous tags (`<script>`) and event attributes (`onmouseover`, `onclick`, etc.) from pasted or programmatically inserted content:

```typescript
// Default behavior - sanitizer is on
@Component({
    template: `<ejs-richtexteditor [value]="dangerousContent"></ejs-richtexteditor>`,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService,
        QuickToolbarService, TableService, PasteCleanupService]
})
export class AppComponent {
    // <script> and onmouseover will be stripped automatically
    dangerousContent = `<div onmouseover="alert(1)">Hello</div><script>alert('xss')</script>`;
}
```

> **Only applies in `editorMode: 'HTML'`.** Markdown mode does not run HTML sanitization.

### Custom XSS filtering with beforeSanitizeHtml

Use the `beforeSanitizeHtml` event to implement custom filtering logic. Set `e.cancel = true` to take full control:

```typescript
import { BeforeSanitizeHtmlArgs } from '@syncfusion/ej2-angular-richtexteditor';
import { detach } from '@syncfusion/ej2-base';

@Component({
    template: `<ejs-richtexteditor
        [value]="value"
        (beforeSanitizeHtml)="onBeforeSanitize($event)">
    </ejs-richtexteditor>`,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService,
        QuickToolbarService, TableService, PasteCleanupService]
})
export class AppComponent {
    value = `<div>Hello</div><script>alert('xss')</script>`;

    onBeforeSanitize(e: BeforeSanitizeHtmlArgs): void {
        e.helper = (value: string) => {
            e.cancel = true;    // Take over sanitization completely
            const temp = document.createElement('div');
            temp.innerHTML = value;
            const script = temp.querySelector('script');
            if (script) { detach(script); }
            return temp.innerHTML;
        };
    }
}
```

### Allowing specific tags (e.g., iframe)

Modify `e.selectors.tags` to remove specific tags from the sanitizer's block list, allowing them to pass through:

```typescript
onBeforeSanitize(e: BeforeSanitizeHtmlArgs): void {
    if (e.selectors?.tags) {
        // Remove the iframe block rule, then add a safe-source-only rule
        e.selectors.tags = e.selectors.tags.filter(
            (tag: string) => tag !== 'iframe:not(.e-rte-embed-url)'
        );
        e.selectors.tags.push('iframe[src^="https://"]');
    }
}
```

> **Security Note:** Only allow tags you explicitly trust. Allowing `<iframe>` with unrestricted `src` values can reintroduce XSS vectors. Always restrict to trusted origins (`src^="https://trusted-domain.com"`).
