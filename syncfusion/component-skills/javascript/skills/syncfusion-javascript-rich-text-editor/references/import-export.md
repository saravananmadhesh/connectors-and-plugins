# Import and Export

> Requires module injection: `ImportExport`

## Table of Contents
- [Import from Microsoft Word](#import-from-microsoft-word)
- [Export to Word](#export-to-word)
- [Export to PDF](#export-to-pdf)
- [Import/Export Markdown](#importexport-markdown)
- [Authentication for Import/Export](#authentication-for-importexport)

---

## Import from Microsoft Word

The RTE can import `.docx` files from a server endpoint, converting them to HTML and loading into the editor.

### Setup

```typescript
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table, PasteCleanup, ImportExport } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table, PasteCleanup, ImportExport);

const editor = new RichTextEditor({
  toolbarSettings: {
    items: ['ImportWord']
  },
  insertImageSettings: {
    saveUrl: 'url',
    removeUrl: 'url',
    path: 'url'
  },
  importWord: {
    serviceUrl: 'url'
  },
  enableXhtml: true
});
editor.appendTo('#editor');
```

### Server-side (ASP.NET Core, C#)

```csharp
[AcceptVerbs("Post")]
[Route("ImportFromWord")]
public IActionResult ImportFromWord(IList<IFormFile> UploadFiles)
{
    string HtmlString = string.Empty;
    foreach (var file in UploadFiles)
    {
        using var mStream = new MemoryStream();
        WordDocument document = new WordDocument(file.OpenReadStream(), FormatType.Docx);
        document.Save(mStream, FormatType.Html);
        mStream.Position = 0;
        HtmlString = new StreamReader(mStream).ReadToEnd();
    }
    return Ok(HtmlString);
}
```

---

## Export to Word

Export the current RTE content as a `.docx` file.

```typescript
const editor = new RichTextEditor({
  toolbarSettings: {
    items: ['ExportWord']
  },
  exportWord: {
    serviceUrl: hostUrl + 'api/RichTextEditor/ExportToDocx',
    fileName: 'MyDocument.docx',
    stylesheet: `
      .e-rte-content { font-family: Calibri; font-size: 12pt; }
      p { margin: 0 0 10px; }
    `
  }
});
```

### Server-side (ASP.NET Core, C#)

```csharp
[AcceptVerbs("Post")]
[Route("ExportToDocx")]
public IActionResult ExportToDocx([FromBody] ExportWordModel args)
{
    using var mStream = new MemoryStream();
    // Load HTML, convert to DOCX via Syncfusion.DocIO
    return File(mStream.ToArray(), "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "export.docx");
}
```

---

## Export to PDF

Export the current RTE content as a `.pdf` file.

```typescript
const editor = new RichTextEditor({
  toolbarSettings: {
    items: ['ExportPdf']
  },
  exportPdf: {
    serviceUrl: hostUrl + 'api/RichTextEditor/ExportToPdf',
    fileName: 'MyDocument.pdf',
    stylesheet: `
      .e-rte-content { font-family: Arial; }
    `
  }
});
```

---

## Import/Export Markdown

For Markdown mode, import/export is handled with plain strings — no special module needed.

### Export (save Markdown)

```typescript
// The value is already a Markdown string
const markdownContent = editor.value;

// Download as .md file
const blob = new Blob([markdownContent], { type: 'text/markdown' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'document.md';
a.click();
URL.revokeObjectURL(url);
```

### Import (load Markdown)

```typescript
// Load Markdown from a file input
document.getElementById('fileInput').addEventListener('change', (e: any) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    editor.value = event.target.result as string;
    editor.dataBind();
  };
  reader.readAsText(file);
});
```

---

## Authentication for Import/Export

Use the `wordImporting` event to add auth headers or custom form data:

```typescript
import { UploadingEventArgs } from '@syncfusion/ej2-inputs';

const editor = new RichTextEditor({
  toolbarSettings: { items: ['ImportWord'] },
  importWord: {
    serviceUrl: hostUrl + 'api/RichTextEditor/ImportFromWord'
  },
  wordImporting: (args: UploadingEventArgs) => {
    args.currentRequest.setRequestHeader('Authorization', 'Bearer your-token');
    args.customFormData = [{ userId: 'user-123' }];
  }
});
```

**Server-side reading of custom data:**

```csharp
var authorization = Request.Headers["Authorization"].ToString();
var userId = Request.Form["userId"].ToString();
```
