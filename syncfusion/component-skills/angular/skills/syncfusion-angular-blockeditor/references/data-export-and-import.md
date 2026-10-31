# Data Export and Import

## Table of Contents
- [Exporting Data](#exporting-data)
- [Importing Data](#importing-data)
- [Conversion Methods](#conversion-methods)
- [Serialization Examples](#serialization-examples)
- [Practical Use Cases](#practical-use-cases)

## Exporting Data

### Export as JSON

Export the current editor content as JSON format:

```typescript
@ViewChild('blockEditor', { static: false }) blockEditorObj!: BlockEditorComponent;

public exportAsJson(): void {
  const jsonData = this.blockEditorObj.getDataAsJson();
  console.log('Editor JSON:', jsonData);
  
  // Download as file
  this.downloadFile(jsonData, 'document.json', 'application/json');
}

private downloadFile(data: any, filename: string, type: string): void {
  const dataStr = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: type });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
}
```

### Export as HTML

Export content as HTML for web display:

```typescript
public exportAsHtml(): void {
  const htmlData = this.blockEditorObj.getDataAsHtml();
  console.log('Editor HTML:', htmlData);
  
  // Download as file
  this.downloadFile(htmlData, 'document.html', 'text/html');
}
```

### Export as Markdown

Convert to markdown format:

```typescript
public exportAsMarkdown(): void {
  const jsonData = this.blockEditorObj.getDataAsJson();
  const markdown = this.convertToMarkdown(jsonData);
  this.downloadFile(markdown, 'document.md', 'text/markdown');
}

private convertToMarkdown(blocks: BlockModel[]): string {
  return blocks.map(block => {
    switch (block.blockType) {
      case 'Heading':
        const level = block.properties?.level || 1;
        const heading = this.getBlockText(block);
        return `${'#'.repeat(level)} ${heading}`;
      case 'Paragraph':
        return this.getBlockText(block);
      case 'BulletList':
        return `- ${this.getBlockText(block)}`;
      case 'NumberedList':
        return `1. ${this.getBlockText(block)}`;
      case 'Code':
        const lang = block.properties?.language || '';
        return `${lang}\n${this.getBlockText(block)}`;
      default:
        return this.getBlockText(block);
    }
  }).join('\n\n');
}

private getBlockText(block: BlockModel): string {
  return block.content?.map(c => c.content || '').join('') || '';
}
```

### Print Document

Print the editor content:

```typescript
public printDocument(): void {
  const printWindow = window.open('', '', 'height=600,width=800');
  if (printWindow) {
    const htmlContent = this.blockEditorObj.getDataAsHtml();
    const styles = `
      <style>
        body { font-family: Arial, sans-serif; }
        h1, h2, h3 { margin-top: 16px; }
        code { background-color: #f5f5f5; padding: 2px 4px; }
      </style>
    `;
    printWindow.document.write(styles + htmlContent);
    printWindow.document.close();
    printWindow.print();
  }
}
```

## Importing Data

### Import from JSON

Load JSON data into the editor:

```typescript
public importFromJson(): void {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'application/json';
  
  fileInput.onchange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e: any) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        this.blockEditorObj.setDataAsJson(jsonData);
      } catch (error) {
        console.error('Invalid JSON:', error);
      }
    };
    
    reader.readAsText(file);
  };
  
  fileInput.click();
}
```

### Import from HTML

Load HTML content into the editor:

```typescript
public importFromHtml(): void {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'text/html';
  
  fileInput.onchange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e: any) => {
      try {
        const htmlContent = e.target.result;
        const blocks = this.blockEditorObj.parseHtmlToBlocks(htmlContent);
        this.blockEditorObj.setDataAsJson(blocks);
      } catch (error) {
        console.error('HTML parsing error:', error);
      }
    };
    
    reader.readAsText(file);
  };
  
  fileInput.click();
}
```

### Import from Clipboard

Paste content from clipboard:

```typescript
public importFromClipboard(): void {
  navigator.clipboard.readText().then(text => {
    try {
      const jsonData = JSON.parse(text);
      this.blockEditorObj.setDataAsJson(jsonData);
    } catch (error) {
      // Try parsing as HTML if JSON fails
      const blocks = this.blockEditorObj.parseHtmlToBlocks(text);
      this.blockEditorObj.setDataAsJson(blocks);
    }
  });
}
```

## Conversion Methods

### Method: getDataAsJson

Get editor content as JSON array of blocks:

```typescript
public method_getDataAsJson(): void {
  const jsonData: BlockModel[] = this.blockEditorObj.getDataAsJson();
  console.log('Block count:', jsonData.length);
  console.log('First block type:', jsonData[0].blockType);
}
```

Returns: `BlockModel[]` - Array of block objects

### Method: getDataAsHtml

Get editor content as HTML string:

```typescript
public method_getDataAsHtml(): void {
  const htmlContent: string = this.blockEditorObj.getDataAsHtml();
  console.log('HTML length:', htmlContent.length);
  
  // Display in preview panel
  const preview = document.getElementById('preview');
  if (preview) {
    preview.innerHTML = htmlContent;
  }
}
```

Returns: `string` - HTML representation

### Method: parseHtmlToBlocks

Convert HTML to Block Editor format:

```typescript
public method_parseHtmlToBlocks(): void {
  const htmlString = `
    <h2>Title</h2>
    <p>Paragraph content</p>
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
    </ul>
  `;
  
  const blocks: BlockModel[] = this.blockEditorObj.parseHtmlToBlocks(htmlString);
  console.log('Converted blocks:', blocks);
}
```

Converts HTML tags:
- `<h1>` - `<h6>` → Heading blocks
- `<p>` → Paragraph blocks
- `<ul>` → BulletList blocks
- `<ol>` → NumberedList blocks
- `<pre><code>` → Code blocks
- `<table>` → Table blocks

### Method: renderBlocksFromJson

Render blocks from JSON format:

```typescript
public method_renderBlocksFromJson(): void {
  const blocksData: BlockModel[] = [
    {
      blockType: 'Heading',
      properties: { level: 1 },
      content: [
        { contentType: ContentType.Text, content: 'Title' }
      ]
    },
    {
      blockType: 'Paragraph',
      content: [
        { contentType: ContentType.Text, content: 'Content here' }
      ]
    }
  ];
  
  this.blockEditorObj.setDataAsJson(blocksData);
}
```

## Serialization Examples

### Example 1: Complete Export/Import Workflow

```typescript
@Component({
  selector: 'app-document-manager',
  template: `
    <div class="controls">
      <button (click)="saveDocument()">Save</button>
      <button (click)="loadDocument()">Load</button>
      <button (click)="exportHtml()">Export HTML</button>
    </div>
    <ejs-blockeditor #blockEditor></ejs-blockeditor>
  `,
  standalone: true,
  imports: [BlockEditorModule]
})
export class DocumentManagerComponent {
  @ViewChild('blockEditor') blockEditor!: BlockEditorComponent;

  public saveDocument(): void {
    const data = this.blockEditor.getDataAsJson();
    const jsonString = JSON.stringify(data, null, 2);
    
    // Save to localStorage for demo
    localStorage.setItem('document', jsonString);
    console.log('Document saved');
  }

  public loadDocument(): void {
    const jsonString = localStorage.getItem('document');
    if (jsonString) {
      const data = JSON.parse(jsonString);
      this.blockEditor.setDataAsJson(data);
      console.log('Document loaded');
    }
  }

  public exportHtml(): void {
    const html = this.blockEditor.getDataAsHtml();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.html';
    link.click();
  }
}
```

### Example 2: Batch Operations

```typescript
public processBatch(jsonArray: BlockModel[][]): void {
  jsonArray.forEach((blocks, index) => {
    const html = this.convertBlocksToHtml(blocks);
    const filename = `document_${index + 1}.html`;
    this.saveFile(html, filename);
  });
}

private convertBlocksToHtml(blocks: BlockModel[]): string {
  let html = '';
  blocks.forEach(block => {
    switch (block.blockType) {
      case 'Heading':
        const level = block.properties?.level || 1;
        html += `<h${level}>${this.getBlockText(block)}</h${level}>`;
        break;
      case 'Paragraph':
        html += `<p>${this.getBlockText(block)}</p>`;
        break;
      // ... other block types
    }
  });
  return html;
}

private saveFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
}
```

## Practical Use Cases

### Use Case 1: Document Versioning

```typescript
@Component({
  selector: 'app-version-control',
  standalone: true,
  imports: [BlockEditorModule, CommonModule]
})
export class VersionControlComponent {
  @ViewChild('blockEditor') blockEditor!: BlockEditorComponent;
  
  public versions: Array<{timestamp: Date, data: BlockModel[]}> = [];

  public saveVersion(): void {
    const currentData = this.blockEditor.getDataAsJson();
    this.versions.push({
      timestamp: new Date(),
      data: JSON.parse(JSON.stringify(currentData))
    });
    console.log(`Version ${this.versions.length} saved`);
  }

  public restoreVersion(index: number): void {
    const versionData = this.versions[index].data;
    this.blockEditor.setDataAsJson(versionData);
    console.log(`Restored version ${index + 1}`);
  }

  public getVersions(): Array<{timestamp: Date, data: BlockModel[]}> {
    return this.versions;
  }
}
```

### Use Case 2: API Synchronization

```typescript
@Injectable()
export class DocumentService {
  constructor(private http: HttpClient) {}

  public saveToServer(blockEditor: BlockEditorComponent): Observable<any> {
    const data = blockEditor.getDataAsJson();
    return this.http.post('/api/documents', { blocks: data });
  }

  public loadFromServer(id: string): Observable<BlockModel[]> {
    return this.http.get<BlockModel[]>(`/api/documents/${id}`);
  }

  public exportDocument(blockEditor: BlockEditorComponent, format: 'json' | 'html'): string {
    if (format === 'json') {
      return JSON.stringify(blockEditor.getDataAsJson(), null, 2);
    } else {
      return blockEditor.getDataAsHtml();
    }
  }
}
```

### Use Case 3: Template Generation

```typescript
public createTemplateFromCurrent(): void {
  const currentData = this.blockEditor.getDataAsJson();
  const template = {
    name: 'My Template',
    created: new Date(),
    blocks: currentData,
    description: 'Custom template'
  };
  
  localStorage.setItem('template_1', JSON.stringify(template));
}

public applyTemplate(templateName: string): void {
  const template = localStorage.getItem(templateName);
  if (template) {
    const parsed = JSON.parse(template);
    this.blockEditor.setDataAsJson(parsed.blocks);
  }
}
```

