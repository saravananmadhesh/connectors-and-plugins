# Import, Export & Spell Check

Reference for importing content from Word documents, exporting to PDF/Word, spell/grammar check integration via WProofreader, and required CSS for external export tools.

---

## Table of Contents
- [Import from Word](#import-from-word)
  - [Using hidden Uploader component](#using-hidden-uploader-component)
  - [Using built-in ImportWord toolbar item](#using-built-in-importword-toolbar-item)
  - [Secure import with authentication](#secure-import-with-authentication)
- [Export to PDF and Word](#export-to-pdf-and-word)
  - [Custom toolbar buttons approach](#custom-toolbar-buttons-approach)
  - [Built-in ExportWord and ExportPdf toolbar items](#built-in-exportword-and-exportpdf-toolbar-items)
  - [Secure export with authentication](#secure-export-with-authentication)
- [CSS for External Export Tools](#css-for-external-export-tools)
- [Spell and Grammar Check (WProofreader)](#spell-and-grammar-check-wproofreader)

---

## Import from Word

### Using hidden Uploader component

Attach a hidden `ejs-uploader` to accept `.docx`/`.doc`/`.rtf` files and POST them to an ASP.NET Core endpoint that converts them to HTML:

```typescript
import { Component, ViewChild } from '@angular/core';
import {
    AsyncSettingsModel, SuccessEventArgs,
    UploaderComponent, UploaderModule
} from '@syncfusion/ej2-angular-inputs';
import {
    RichTextEditorModule, RichTextEditorComponent,
    ToolbarSettingsModel, ToolbarService, LinkService,
    ImageService, HtmlEditorService, QuickToolbarService,
    TableService, PasteCleanupService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
    imports: [RichTextEditorModule, UploaderModule],
    standalone: true,
    selector: 'app-root',
    template: `
        <ejs-richtexteditor #editor [toolbarSettings]="tools" [(value)]="value"></ejs-richtexteditor>
        <ejs-uploader #uploadObj
            allowedExtensions=".docx,.doc,.rtf"
            [asyncSettings]="asyncSettings"
            (success)="onUploadSuccess($event)"
            style="display: none;">
        </ejs-uploader>`,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService,
        QuickToolbarService, TableService, PasteCleanupService]
})
export class AppComponent {
    @ViewChild('editor') editorObj!: RichTextEditorComponent;
    @ViewChild('uploadObj') uploadObj!: UploaderComponent;
    value = '<p>Start editing or import a Word document.</p>';
    private hostUrl = 'url';

    asyncSettings: AsyncSettingsModel = {
        saveUrl: this.hostUrl + 'api/RichTextEditor/ImportFromWord'
    };

    tools: ToolbarSettingsModel = {
        items: [{
            tooltipText: 'Import from Word',
            template: `<button class="e-tbar-btn e-control e-btn e-lib e-icon-btn" tabindex="-1" style="width:100%">
                <span class="e-icons e-rte-import-doc e-btn-icon"></span></button>`,
            click: this.importFromWord.bind(this)
        }]
    };

    onUploadSuccess(args: SuccessEventArgs): void {
        const html = ((args.e as ProgressEvent).currentTarget as XMLHttpRequest).response;
        this.editorObj.executeCommand('insertHTML', html, { undo: true });
    }

    importFromWord(): void {
        this.uploadObj.element.click();
    }
}
```

**Server-side handler (ASP.NET Core):**
- Accepts `IList<IFormFile> UploadFiles`
- Uses Syncfusion `DocIO` to parse the file and convert to HTML
- Returns sanitized HTML string in the response body

### Using built-in ImportWord toolbar item

For a simpler setup, use the built-in `'ImportWord'` toolbar item with the `importWord` property:

```typescript
@Component({
    template: `<ejs-richtexteditor
        [toolbarSettings]="toolbarSettings"
        [importWord]="importWord">
    </ejs-richtexteditor>`,
    providers: [ToolbarService, QuickToolbarService, LinkService,
        ImageService, HtmlEditorService]
})
export class AppComponent {
    private hostUrl = 'url';
    toolbarSettings = { items: ['ImportWord'] };
    importWord = {
        serviceUrl: this.hostUrl + 'api/RichTextEditor/ImportFromWord'
    };
}
```

### Secure import with authentication

Use the `wordImporting` event to inject auth headers and custom form data before the upload POST:

```typescript
import { UploadingEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
    template: `<ejs-richtexteditor
        [toolbarSettings]="toolbarSettings"
        [importWord]="importWord"
        [wordImporting]="onWordImport">
    </ejs-richtexteditor>`,
    providers: [ToolbarService, QuickToolbarService, LinkService,
        ImageService, HtmlEditorService]
})
export class AppComponent {
    private hostUrl = 'url';
    toolbarSettings = { items: ['ImportWord'] };
    importWord = { serviceUrl: this.hostUrl + 'api/RichTextEditor/ImportFromWord' };

    onWordImport = (args: UploadingEventArgs) => {
        args.currentRequest.setRequestHeader('Authorization', 'Bearer <token>');
        args.customFormData = [{ userId: '1234' }];
    };
}
```

---

## Export to PDF and Word

### Custom toolbar buttons approach

Use `fetch` to POST the editor's HTML to a server endpoint that returns a file blob:

```typescript
@Component({
    template: `<ejs-richtexteditor #editor [toolbarSettings]="tools" [enableXhtml]="true"></ejs-richtexteditor>`,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService,
        QuickToolbarService, TableService, PasteCleanupService]
})
export class AppComponent {
    @ViewChild('editor') editorObj!: RichTextEditorComponent;
    private hostUrl = 'url';

    tools: ToolbarSettingsModel = {
        items: [
            {
                tooltipText: 'Export to Word',
                template: `<button class="e-tbar-btn e-control e-btn e-lib e-icon-btn" tabindex="-1" style="width:100%">
                    <span class="e-icons e-rte-export-doc e-btn-icon"></span></button>`,
                click: this.exportToWord.bind(this)
            },
            {
                tooltipText: 'Export to PDF',
                template: `<button class="e-tbar-btn e-control e-btn e-lib e-icon-btn" tabindex="-1" style="width:100%">
                    <span class="e-icons e-rte-export-pdf e-btn-icon"></span></button>`,
                click: this.exportToPDF.bind(this)
            }
        ]
    };

    exportToWord(): void {
        const html = `<html><head></head><body>${this.editorObj.getHtml()}</body></html>`;
        fetch(this.hostUrl + 'api/RichTextEditor/ExportToDocx', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ html })
        })
        .then(r => r.blob())
        .then(blob => this.downloadBlob(blob, 'Result.docx'));
    }

    exportToPDF(): void {
        const html = `<html><head></head><body>${this.editorObj.getHtml()}</body></html>`;
        fetch(this.hostUrl + 'api/RichTextEditor/ExportToPdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ html })
        })
        .then(r => r.blob())
        .then(blob => this.downloadBlob(blob, 'Sample.pdf'));
    }

    private downloadBlob(blob: Blob, filename: string): void {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = filename;
        document.body.appendChild(a); a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
}
```

### Built-in ExportWord and ExportPdf toolbar items

Use the built-in toolbar items with the `exportWord` and `exportPdf` properties:

```typescript
@Component({
    template: `<ejs-richtexteditor
        [toolbarSettings]="toolbarSettings"
        [exportWord]="exportWord"
        [exportPdf]="exportPdf">
    </ejs-richtexteditor>`,
    providers: [ToolbarService, QuickToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class AppComponent {
    private hostUrl = 'url';
    toolbarSettings = { items: ['ExportWord', 'ExportPdf'] };

    exportWord = {
        serviceUrl: this.hostUrl + 'api/RichTextEditor/ExportToDocx',
        fileName: 'RichTextEditor.docx',
        stylesheet: '.e-rte-content { font-size: 1em; font-weight: 400; margin: 0; }'
    };

    exportPdf = {
        serviceUrl: this.hostUrl + 'api/RichTextEditor/ExportToPdf',
        fileName: 'RichTextEditor.pdf',
        stylesheet: '.e-rte-content { font-size: 1em; font-weight: 400; margin: 0; }'
    };
}
```

### Secure export with authentication

Use the `documentExporting` event to add auth headers:

```typescript
import { ExportingEventArgs } from '@syncfusion/ej2-angular-richtexteditor';

onDocumentExporting = (args: ExportingEventArgs) => {
    args.currentRequest = [{ Authorization: 'Bearer <token>' }];
    args.customFormData = [{ userId: '1234' }];
};
```

---

## CSS for External Export Tools

When exporting RTE content via **external** (non-Syncfusion) tools, the editor's internal styles are not automatically included. Apply the following CSS to the export container to preserve formatting. Add class `e-rte-content` to the container element.

```css
.e-rte-content { font-size: 1em; font-weight: 400; margin: 0; }
html { height: auto; margin: 0; }
body { margin: 0; color: #333; word-wrap: break-word; }
.e-content {
    min-height: 100px; outline: 0 solid transparent; padding: 16px;
    font-weight: normal; line-height: 1.5; font-size: 14px;
    font-family: "Roboto", "Segoe UI", "sans-serif";
}
p { margin: 0 0 10px 0; }
h1 { font-size: 2.857em; font-weight: 600; line-height: 1.2; margin: 10px 0; }
h2 { font-size: 2.285em; font-weight: 600; line-height: 1.2; margin: 10px 0; }
h3 { font-size: 2em; font-weight: 600; line-height: 1.2; margin: 10px 0; }
blockquote { margin: 10px 0; padding-left: 12px; border-left: 2px solid #5c5c5c; }
table { margin-bottom: 10px; border-collapse: collapse; }
th { background-color: rgba(157,157,157,.15); border: 1px solid #BDBDBD; padding: 2px 5px; }
td { border: 1px solid #BDBDBD; padding: 2px 5px; }
```

---

## Spell and Grammar Check (WProofreader)

The RTE does not have built-in spell check. Integrate the third-party **WProofreader** library from WebSpellChecker for real-time spelling and grammar checking.

**Features:** Real-time spell checking, multi-language support, custom dictionary, grammar suggestions.

### Installation

```bash
npm install @webspellchecker/wproofreader-sdk-js
```

### Integration

Point WProofreader's `container` to the RTE's `inputElement` after the view initializes:

```typescript
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {
    RichTextEditorModule, RichTextEditorComponent,
    ToolbarService, LinkService, ImageService,
    HtmlEditorService, QuickToolbarService,
    TableService, PasteCleanupService
} from '@syncfusion/ej2-angular-richtexteditor';
import WProofreader from '@webspellchecker/wproofreader-sdk-js';

@Component({
    imports: [RichTextEditorModule],
    standalone: true,
    selector: 'app-root',
    template: `<ejs-richtexteditor #spellEditor id="editor" [value]="value"></ejs-richtexteditor>`,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService,
        QuickToolbarService, TableService, PasteCleanupService]
})
export class AppComponent implements AfterViewInit {
    @ViewChild('spellEditor') spellEditor!: RichTextEditorComponent;
    value = '<p>Enter your text here to check spelling and grammar.</p>';

    ngAfterViewInit(): void {
        WProofreader.init({
            container: this.spellEditor.inputElement,
            lang: 'en_US',
            serviceId: '<your-service-id>'   // Get from webspellchecker.com
        });
    }
}
```

> **Note:** `serviceId` is a WProofreader license key obtained from [webspellchecker.com](https://webspellchecker.com). The `container` must be the RTE's `inputElement` (the actual editable area), not the host element.
