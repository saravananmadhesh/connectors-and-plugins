# Editor Value, Selection & Commands in Syncfusion Angular Rich Text Editor

## Table of Contents
- [Getting and Setting Value](#getting-and-setting-value)
- [Placeholder Text](#placeholder-text)
- [executeCommand API](#executecommand-api)
- [Undo/Redo Configuration](#undoredo-configuration)
- [Selection and Cursor Control](#selection-and-cursor-control)

---

## Getting and Setting Value

**Setting content via property binding:**
```typescript
// Two-way binding (recommended)
<ejs-richtexteditor [(value)]="htmlContent"></ejs-richtexteditor>

// One-way input
<ejs-richtexteditor [value]="htmlContent"></ejs-richtexteditor>
```

**Setting content via ng-template (valueTemplate):**
```typescript
@Component({
  template: `
    <ejs-richtexteditor>
      <ng-template #valueTemplate>
        <p>This is initial content set via <strong>template</strong>.</p>
      </ng-template>
    </ejs-richtexteditor>
  `
})
```

**Getting value programmatically:**
```typescript
import { Component, ViewChild } from '@angular/core';
import { RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  template: `
    <ejs-richtexteditor #rte [(value)]="content"></ejs-richtexteditor>
    <button (click)="saveContent()">Save</button>
  `
})
export class AppComponent {
  @ViewChild('rte') rteObj!: RichTextEditorComponent;
  public content: string = '';

  saveContent(): void {
    const html = this.rteObj.value;   // Get current HTML value
    console.log('Content:', html);
  }
}
```

**Listening to change events:**
```typescript
import { ChangeEventArgs } from '@syncfusion/ej2-angular-richtexteditor';

// change fires when editor loses focus AND content has changed
(change)="onChange($event)"

// input fires on every keystroke
(input)="onInput($event)"

onChange(args: ChangeEventArgs): void {
  console.log(args.value);  // Updated HTML string
}
```

---

## Placeholder Text

```typescript
// Via property
<ejs-richtexteditor placeholder="Start typing here..."></ejs-richtexteditor>
```

Style the placeholder via CSS:
```css
.e-richtexteditor .e-rte-placeholder {
  font-family: monospace;
  color: #aaa;
}
```

---

## executeCommand API

`executeCommand` programmatically applies formatting or inserts content at the current cursor position. Only works in HTML mode (not Markdown).

```typescript
import { Component, ViewChild } from '@angular/core';
import { RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  template: `<ejs-richtexteditor #rte></ejs-richtexteditor>`
})
export class AppComponent {
  @ViewChild('rte') rteObj!: RichTextEditorComponent;

  applyFormatting(): void {
    this.rteObj.executeCommand('bold');
    this.rteObj.executeCommand('italic');
    this.rteObj.executeCommand('fontColor', '#FF0000');
    this.rteObj.executeCommand('fontSize', '18pt');
    this.rteObj.executeCommand('fontName', 'Arial');
    this.rteObj.executeCommand('formatBlock', 'H2');
  }

  insertContent(): void {
    this.rteObj.executeCommand('insertText', 'Inserted text here');
    this.rteObj.executeCommand('insertHTML', '<b>Bold HTML</b>');
    this.rteObj.executeCommand('insertImage', {
      url: 'url',
      cssClass: 'rte-img'
    });
    this.rteObj.executeCommand('createLink', {
      text: 'Syncfusion',
      url: 'https://syncfusion.com',
      title: 'Syncfusion'
    });
  }
}
```

**Full executeCommand reference:**

| Command | Description | Example |
|---|---|---|
| `bold` | Bold selected text | `executeCommand('bold')` |
| `italic` | Italic selected text | `executeCommand('italic')` |
| `underline` | Underline selected text | `executeCommand('underline')` |
| `strikeThrough` | Strikethrough | `executeCommand('strikeThrough')` |
| `superscript` | Superscript | `executeCommand('superscript')` |
| `subscript` | Subscript | `executeCommand('subscript')` |
| `uppercase` | To uppercase | `executeCommand('uppercase')` |
| `lowercase` | To lowercase | `executeCommand('lowercase')` |
| `fontColor` | Set font color | `executeCommand('fontColor', '#red')` |
| `fontName` | Set font family | `executeCommand('fontName', 'Arial')` |
| `fontSize` | Set font size | `executeCommand('fontSize', '14pt')` |
| `formatBlock` | Set block format | `executeCommand('formatBlock', 'H1')` |
| `backColor` | Set background color | `executeCommand('backColor', 'yellow')` |
| `justifyCenter` | Center align | `executeCommand('justifyCenter')` |
| `justifyLeft` | Left align | `executeCommand('justifyLeft')` |
| `justifyRight` | Right align | `executeCommand('justifyRight')` |
| `justifyFull` | Justify | `executeCommand('justifyFull')` |
| `indent` | Increase indent | `executeCommand('indent')` |
| `outdent` | Decrease indent | `executeCommand('outdent')` |
| `insertOrderedList` | Numbered list | `executeCommand('insertOrderedList')` |
| `insertUnorderedList` | Bulleted list | `executeCommand('insertUnorderedList')` |
| `insertHTML` | Insert HTML at cursor | `executeCommand('insertHTML', '<b>text</b>')` |
| `insertText` | Insert plain text | `executeCommand('insertText', 'hello')` |
| `insertImage` | Insert image | `executeCommand('insertImage', { url, cssClass })` |
| `insertVideo` | Insert video | `executeCommand('insertVideo', { url, cssClass })` |
| `insertAudio` | Insert audio | `executeCommand('insertAudio', { url, cssClass })` |
| `createLink` | Insert link | `executeCommand('createLink', { text, url, title })` |
| `removeFormat` | Remove all formatting | `executeCommand('removeFormat')` |
| `undo` | Undo | `executeCommand('undo')` |
| `redo` | Redo | `executeCommand('redo')` |

---

## Undo/Redo Configuration

```typescript
@Component({
  template: `
    <ejs-richtexteditor
      [undoRedoSteps]="50"
      [undoRedoTimer]="400"
      [toolbarSettings]="{ items: ['Undo', 'Redo'] }">
    </ejs-richtexteditor>
  `
})
```

| Property | Default | Description |
|---|---|---|
| `undoRedoSteps` | 30 | Max undo/redo history entries |
| `undoRedoTimer` | 300 | Debounce time (ms) between history snapshots |

**Clear the undo/redo stack (e.g., when loading new content):**
```typescript
@ViewChild('rte') rteObj!: RichTextEditorComponent;

loadNewContent(html: string): void {
  this.rteObj.value = html;
  this.rteObj.clearUndoRedo();  // Clear history so user can't undo to old content
}
```

---

## Selection and Cursor Control

**Position cursor at end of content (on created event):**
```typescript
import { Component, ViewChild } from '@angular/core';
import { RichTextEditorComponent, NodeSelection } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  template: `<ejs-richtexteditor #rte (created)="onCreated()" [(value)]="content"></ejs-richtexteditor>`
})
export class AppComponent {
  @ViewChild('rte') rteObj!: RichTextEditorComponent;
  public content: string = '<p>Some content</p>';

  onCreated(): void {
    // Focus and move cursor to end
    this.rteObj.focusIn();
    const editPanel = this.rteObj.contentModule.getEditPanel() as HTMLElement;
    const range = document.createRange();
    range.selectNodeContents(editPanel);
    range.collapse(false);  // false = collapse to end
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
}
```

**Get current selection range:**
```typescript
import { NodeSelection } from '@syncfusion/ej2-angular-richtexteditor';

const nodeSelection = new NodeSelection();
const range = nodeSelection.getRange(document);
// Save range for later use (e.g., before opening a dialog)
this.savedRange = range;
```

**Restore a saved range (re-apply selection):**
```typescript
nodeSelection.setRange(document, this.savedRange);
```

> **Pattern:** Save the range before opening a custom dialog, then restore it when inserting content — this ensures `insertHTML` lands at the user's original cursor position.
