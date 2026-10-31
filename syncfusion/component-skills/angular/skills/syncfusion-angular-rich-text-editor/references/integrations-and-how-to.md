# Integrations & How-To Guides

Reference for third-party integrations (CodeMirror, Highlight.js, Embedly, Tailwind Preflight) and common how-to patterns (RTE in Dialog/Tab, Google Fonts, file attachments).

---

## Table of Contents
- [CodeMirror Integration](#codemirror-integration)
- [Highlight.js Integration](#highlightjs-integration)
- [Embedly Integration](#embedly-integration)
- [Tailwind CSS Preflight Fix](#tailwind-css-preflight-fix)
  - [Default (non-IFrame) mode](#default-non-iframe-mode)
  - [IFrame mode](#iframe-mode)
- [RTE Inside a Dialog](#rte-inside-a-dialog)
- [RTE Inside Tabs](#rte-inside-tabs)
- [Adding Google Fonts](#adding-google-fonts)
- [File Attachments](#file-attachments)

---

## CodeMirror Integration

Replace the RTE's built-in source view textarea with a full CodeMirror 6 editor for syntax highlighting, line numbers, and dark theme support.

**Install packages:**

```bash
npm install codemirror @codemirror/state @codemirror/view @codemirror/lang-html @codemirror/theme-one-dark
```

**How it works:**
1. Listen to `(actionComplete)` — intercept `SourceCode` and `Preview` toggle events
2. On `SourceCode`: create a hidden `div`, append to `rteObj.rootContainer`, render a CodeMirror `EditorView` into it
3. On `Preview`: read `myCodeMirror.state.doc.toString()`, set as `rteObj.value`, call `dataBind()`, remove the CSS class that hides the editor panel

```typescript
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    RichTextEditorAllModule, ToolbarSettingsModel,
    ToolbarService, LinkService, ImageService,
    HtmlEditorService, RichTextEditorComponent, CountService, ActionCompleteEventArgs
} from '@syncfusion/ej2-angular-richtexteditor';
import { createElement } from '@syncfusion/ej2-base';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { html } from '@codemirror/lang-html';
import { basicSetup } from 'codemirror';
import { oneDark } from '@codemirror/theme-one-dark';

@Component({
    imports: [RichTextEditorAllModule],
    standalone: true,
    selector: 'app-root',
    encapsulation: ViewEncapsulation.None,
    template: `<ejs-richtexteditor #editor
        [value]="value"
        [toolbarSettings]="tools"
        (actionComplete)="actionCompleteHandler($event)">
    </ejs-richtexteditor>`,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, CountService]
})
export class AppComponent {
    @ViewChild('editor') rteObj!: RichTextEditorComponent;
    myCodeMirror?: EditorView;

    tools: ToolbarSettingsModel = {
        items: ['Bold', 'Italic', 'Underline', '|', 'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
    };
    value = '<p>Hello <b>World</b></p>';

    actionCompleteHandler(e: ActionCompleteEventArgs): void {
        if (e.targetItem === 'SourceCode' || e.targetItem === 'Preview') {
            this.mirrorConversion(e);
        }
    }

    mirrorConversion(e: ActionCompleteEventArgs): void {
        const id = this.rteObj.getID() + 'mirror-view';
        let mirrorView = this.rteObj.element.querySelector('#' + id) as HTMLElement;

        if (e.targetItem === 'Preview') {
            // Sync CodeMirror content back to RTE
            this.rteObj.value = this.myCodeMirror!.state.doc.toString();
            this.rteObj.dataBind();
            this.rteObj.rootContainer.classList.remove('e-rte-code-mirror-enabled');
            this.rteObj.focusIn();
        } else {
            // Show CodeMirror, hide default source textarea
            this.rteObj.rootContainer.classList.add('e-rte-code-mirror-enabled');
            this.rteObj.rootContainer.classList.remove('e-source-code-enabled');
            const srcValue = (this.rteObj.element.querySelector('.e-rte-srctextarea') as HTMLTextAreaElement).value;
            if (!mirrorView) {
                mirrorView = createElement('div', { className: 'rte-code-mirror', id, styles: 'display: none;' });
                this.rteObj.rootContainer.appendChild(mirrorView);
                this.renderCodeMirror(mirrorView, srcValue ?? '');
            } else {
                this.myCodeMirror!.setState(EditorState.create({
                    doc: srcValue,
                    extensions: [basicSetup, html(), EditorView.lineWrapping]
                }));
            }
            this.myCodeMirror!.focus();
        }
    }

    renderCodeMirror(parent: HTMLElement, content: string): void {
        const isDark = document.body.classList.contains('e-dark-mode');
        const extensions = isDark
            ? [basicSetup, html(), EditorView.lineWrapping, oneDark]
            : [basicSetup, html(), EditorView.lineWrapping];

        this.myCodeMirror = new EditorView({
            state: EditorState.create({ doc: content, extensions }),
            parent
        });
    }
}
```

**Required CSS** (add to `styles.css` or `app.css` with `ViewEncapsulation.None`):

```css
.e-rte-code-mirror-enabled .rte-code-mirror {
    display: block !important;
}
.e-rte-code-mirror-enabled .e-rte-content {
    display: none !important;
}
```

---

## Highlight.js Integration

Apply syntax highlighting to code blocks inside the RTE content area using `highlight.js`.

**Install:**

```bash
npm install highlight.js
```

**Wire events:** run `highlightAllCodeBlocks()` on `created` and `change` events.

```typescript
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    RichTextEditorModule, RichTextEditorComponent,
    ToolbarSettingsModel, ToolbarService, LinkService,
    ImageService, HtmlEditorService, QuickToolbarService, CodeBlockService
} from '@syncfusion/ej2-angular-richtexteditor';
import highlight from 'highlight.js/lib/common';

@Component({
    imports: [RichTextEditorModule],
    standalone: true,
    selector: 'app-root',
    encapsulation: ViewEncapsulation.None,
    template: `<ejs-richtexteditor #rte
        [value]="initialHtml"
        [toolbarSettings]="tools"
        (created)="onCreated()"
        (change)="onChange()">
    </ejs-richtexteditor>`,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService,
        QuickToolbarService, CodeBlockService]
})
export class AppComponent {
    @ViewChild('rte') rte!: RichTextEditorComponent;

    tools: ToolbarSettingsModel = {
        items: ['CodeBlock', 'InsertCode', 'Bold', 'Italic', '|', 'SourceCode', 'Undo', 'Redo']
    };
    initialHtml = `<pre data-language="Typescript" spellcheck="false">
<code class="language-typescript">export function hello(name: string) { console.log(name); }</code>
</pre>`;

    onCreated() { this.highlightAllCodeBlocks(); }
    onChange() { this.highlightAllCodeBlocks(); }

    private highlightAllCodeBlocks(): void {
        const container = this.rte?.element?.querySelector('.e-rte-content') as HTMLElement;
        if (!container) { return; }
        container.querySelectorAll('pre code').forEach((block) => {
            if (!block.classList.contains('hljs')) {
                highlight.highlightElement(block as HTMLElement);
            }
        });
    }
}
```

**Add highlight.js theme in `angular.json`:**

```json
"styles": [
    "src/styles.css",
    "node_modules/highlight.js/styles/atom-one-dark.min.css"
]
```

**Override RTE default code block colors** (in `styles.css`):

```css
.e-richtexteditor .e-rte-content .e-content pre code,
.e-richtexteditor .e-rte-content .e-content pre[data-language],
.e-richtexteditor .e-rte-content .e-content pre[data-language] code {
    color: #abb2bf;
    background-color: #282c34;
}
```

---

## Embedly Integration

Convert inserted hyperlinks into rich Embedly embed cards (Twitter, YouTube, etc.).

**Include the Embedly platform script in `index.html`:**

```html
<script async src="//cdn.embedly.com/widgets/platform.js"></script>
```

**Wire `actionComplete`** to detect link insertions and wrap them in an Embedly blockquote:

```typescript
public actionComplete(args: ActionCompleteEventArgs): void {
    if (args.requestType === 'Links') {
        const rteContent = document.querySelector('.e-rte-content');
        if (!rteContent) { return; }
        rteContent.querySelectorAll('a').forEach(link => {
            if (!link.closest('.embedly-card')) {
                const blockquote = document.createElement('blockquote');
                blockquote.className = 'embedly-card';
                link.parentNode!.insertBefore(blockquote, link);
                blockquote.appendChild(link);
            }
        });
    }
}
```

After insertion, Embedly's `platform.js` script automatically converts `blockquote.embedly-card > a` elements into embed cards.

---

## Tailwind CSS Preflight Fix

Tailwind Preflight resets list styles (`ul`, `ol`, `li`) which breaks the RTE's bullet and numbered list rendering.

### Default (non-IFrame) mode

**Global styles** (`src/styles.css`):

```css
@layer theme, base, components, utilities;
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);
```

**Fix CSS** — add to `styles.css` or `app.css` (with `ViewEncapsulation.None`):

```css
.e-rte-content li { margin-bottom: 10px !important; padding: unset !important; }
.e-rte-content ul { list-style-type: disc !important; padding: unset !important; margin-left: 40px; }
.e-rte-content ol { list-style-type: decimal !important; padding: unset !important; margin-left: 40px; }
.e-rte-content ul[style*="list-style-type: circle"] { list-style-type: circle !important; padding: unset !important; margin-left: 40px; }
.e-rte-content ul[style*="list-style-type: square"] { list-style-type: square !important; padding: unset !important; margin-left: 40px; }
.e-rte-content ol[style*="list-style-type: upper-alpha"] { list-style-type: upper-alpha !important; padding: unset !important; margin-left: 40px; }
.e-rte-content ol[style*="list-style-type: lower-alpha"] { list-style-type: lower-alpha !important; padding: unset !important; margin-left: 40px; }
.e-rte-content ol[style*="list-style-type: upper-roman"] { list-style-type: upper-roman !important; padding: unset !important; margin-left: 40px; }
.e-rte-content ol[style*="list-style-type: lower-roman"] { list-style-type: lower-roman !important; padding: unset !important; margin-left: 40px; }
.e-rte-content ol[style*="list-style-type: lower-greek"] { list-style-type: lower-greek !important; padding: unset !important; margin-left: 40px; }
```

### IFrame mode

In IFrame mode, Tailwind Preflight doesn't automatically apply inside the iframe. Inject the reset CSS into the iframe using `iframeSettings.resources.styles`:

```typescript
@Component({
    template: `<ejs-richtexteditor [iframeSettings]="iframe"></ejs-richtexteditor>`,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService]
})
export class AppComponent {
    iframe = {
        enable: true,
        resources: { styles: ['../styles.css'] }   // styles.css contains the fix CSS with body.e-content selectors
    };
}
```

**Fix CSS for IFrame** uses `body.e-content` selectors (the `<body>` inside the iframe has class `e-content`):

```css
body.e-content li { margin-bottom: 10px !important; padding: unset !important; }
body.e-content ul { list-style-type: disc !important; padding: unset !important; margin-left: 40px; }
body.e-content ol { list-style-type: decimal !important; padding: unset !important; margin-left: 40px; }
/* ... same pattern for circle, square, upper-alpha, lower-alpha, upper-roman, lower-roman, lower-greek */
```

---

## RTE Inside a Dialog

When the RTE is placed inside a Syncfusion Dialog, the dialog is initially hidden (`display: none`), which prevents the toolbar from calculating its width correctly. The toolbar renders above the content area.

**Fix:** Call `rteObj.refreshUI()` in the Dialog's `(open)` event:

```typescript
import { Component, ViewChild } from '@angular/core';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import {
    RichTextEditorComponent, RichTextEditorModule,
    ToolbarService, LinkService, ImageService,
    HtmlEditorService, QuickToolbarService, TableService, PasteCleanupService
} from '@syncfusion/ej2-angular-richtexteditor';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
    imports: [RichTextEditorModule, DialogModule, ButtonModule],
    standalone: true,
    selector: 'app-root',
    template: `
        <button ejs-button (click)="openDialog()">Open Dialog</button>
        <ejs-dialog #dialog [width]="'500px'" [visible]="false" (open)="onDialogOpen()">
            <ng-template #content>
                <ejs-richtexteditor #editor></ejs-richtexteditor>
            </ng-template>
        </ejs-dialog>`,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService,
        QuickToolbarService, TableService, PasteCleanupService]
})
export class AppComponent {
    @ViewChild('dialog') dialogObj!: DialogComponent;
    @ViewChild('editor') editorObj!: RichTextEditorComponent;

    openDialog(): void { this.dialogObj.show(); }

    onDialogOpen(): void {
        this.editorObj.refreshUI();   // ← fixes toolbar width calculation
    }
}
```

> **Key point:** The same `refreshUI()` pattern applies to any container that starts hidden — Accordion panels, collapsed sections, etc.

---

## RTE Inside Tabs

Place separate RTE instances in each tab using `ejs-tab` + `e-tabitems`:

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import {
    RichTextEditorModule, ToolbarService, LinkService,
    ImageService, HtmlEditorService, QuickToolbarService,
    TableService, PasteCleanupService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
    imports: [RichTextEditorModule, TabModule],
    standalone: true,
    selector: 'app-root',
    template: `
        <ejs-tab>
            <e-tabitems>
                <e-tabitem>
                    <ng-template #headerText><div>Tab 1</div></ng-template>
                    <ng-template #content>
                        <ejs-richtexteditor></ejs-richtexteditor>
                    </ng-template>
                </e-tabitem>
                <e-tabitem>
                    <ng-template #headerText><div>Tab 2</div></ng-template>
                    <ng-template #content>
                        <ejs-richtexteditor></ejs-richtexteditor>
                    </ng-template>
                </e-tabitem>
            </e-tabitems>
        </ejs-tab>`,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService,
        QuickToolbarService, TableService, PasteCleanupService]
})
export class AppComponent {}
```

> **Note:** Each tab has its own independent RTE instance. If toolbar rendering is incorrect when switching tabs, call `refreshUI()` on the tab's `selected` event (same pattern as the Dialog fix above).

---

## Adding Google Fonts

Reference Google Font stylesheets in `index.html` and add them to the `fontFamily.items` array:

**`index.html`:**

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Great+Vibes">
```

**Component:**

```typescript
import { Component } from '@angular/core';
import {
    RichTextEditorAllModule, ToolbarService,
    LinkService, ImageService, HtmlEditorService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
    imports: [RichTextEditorAllModule],
    standalone: true,
    selector: 'app-root',
    template: `<ejs-richtexteditor
        [fontFamily]="fontFamily"
        [toolbarSettings]="toolbarSettings">
    </ejs-richtexteditor>`,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class AppComponent {
    fontFamily = {
        items: [
            { text: 'Segoe UI', value: 'Segoe UI', class: 'e-segoe-ui', command: 'Font', subCommand: 'FontName' },
            { text: 'Roboto', value: 'Roboto', command: 'Font', subCommand: 'FontName' },
            { text: 'Great Vibes', value: 'Great Vibes,cursive', command: 'Font', subCommand: 'FontName' },
            { text: 'Tahoma', value: 'Tahoma,Geneva,sans-serif', class: 'e-tahoma', command: 'Font', subCommand: 'FontName' }
        ]
    };
    toolbarSettings = {
        items: ['Bold', 'Italic', 'Underline', '|', 'FontName', 'FontSize', '|', 'Undo', 'Redo']
    };
}
```

> **Note:** The `value` property must match the exact CSS font-family string (e.g., `'Great Vibes,cursive'`). The font must be loaded via a `<link>` or `@import` for it to render correctly in the editor.

---

## File Attachments

Allow users to attach files (not just images) by wiring a hidden `ejs-uploader` and inserting a download link into the editor content on upload success.

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileInfo, SuccessEventArgs, UploaderComponent, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import {
    ContentRender, HTMLFormatter, RichTextEditorModule,
    RichTextEditorComponent, NodeSelection,
    ToolbarService, LinkService, ImageService,
    HtmlEditorService, QuickToolbarService, TableService, PasteCleanupService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
    imports: [RichTextEditorModule, UploaderModule],
    standalone: true,
    selector: 'app-root',
    template: `
        <ejs-richtexteditor #editor id="editor"
            [insertImageSettings]="insertImageSettings"
            [(value)]="value">
        </ejs-richtexteditor>
        <ejs-uploader #uploader id="fileupload"
            [asyncSettings]="uploadPath"
            [dropArea]="'#editor'"
            (success)="onUploadSuccess($event)">
        </ejs-uploader>`,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService,
        QuickToolbarService, TableService, PasteCleanupService]
})
export class AppComponent {
    @ViewChild('editor') editorObj!: RichTextEditorComponent;
    @ViewChild('uploader') uploadObj!: UploaderComponent;

    value = '<p>Attach files by dropping them onto the editor.</p>';
    insertImageSettings = { saveUrl: '/api/uploadbox/Save', path: '../Files/' };
    uploadPath = { saveUrl: '/api/uploadbox/Save' };

    private selection = new NodeSelection();
    private savedRange!: NodeSelection;

    onUploadSuccess(args: SuccessEventArgs): void {
        (this.editorObj.contentModule as ContentRender).getEditPanel().focus();
        const range = this.selection.getRange(document);
        this.savedRange = this.selection.save(range, document);

        const fileUrl = document.URL + this.editorObj.insertImageSettings.path + (args.file as FileInfo).name;

        if ((this.editorObj.formatter as HTMLFormatter).getUndoRedoStack().length === 0) {
            (this.editorObj.formatter as HTMLFormatter).saveData();
        }
        this.savedRange.restore();
        this.editorObj.executeCommand('createLink', {
            url: fileUrl,
            text: fileUrl,
            selection: this.savedRange
        });
        (this.editorObj.formatter as HTMLFormatter).saveData();
        (this.editorObj.formatter as HTMLFormatter).enableUndo(this.editorObj);
        this.uploadObj.clearAll();
    }
}
```

**Pattern summary:**
1. Upload the file to the server → get back the file URL
2. Save the current cursor range before the async upload completes
3. Restore the range after upload success
4. Use `executeCommand('createLink', ...)` to insert a hyperlink at the saved cursor position
5. Save undo state manually so the link insertion is undoable
