# Cell Comments

Add threaded comments with replies, resolve discussions, and manage review workflows in the Syncfusion Angular Spreadsheet.

---

## Table of Contents

- [Minimal Angular Code](#minimal-angular-code)
- [Comment Model Structure](#comment-model-structure)
- [API Reference](#api-reference)
- [Comment Operations](#comment-operations)
  - [Add Comment](#add-comment)
  - [Add Comment with Replies](#add-comment-with-replies)
  - [Edit Comment](#edit-comment)
  - [Resolve Comment Thread](#resolve-comment-thread)
  - [Reopen Resolved Comment](#reopen-resolved-comment)
  - [Show or Hide Comments Pane](#show-or-hide-comments-pane)
  - [Bulk Add Comments](#bulk-add-comments)
- [Template Button Binding Example](#template-button-binding-example)
- [User Interactions (Built-in UI)](#user-interactions-built-in-ui)
- [Export and Persistence](#export-and-persistence)
- [Placeholders](#placeholders)
- [Notes](#notes)

---

## Minimal Angular Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet
    #spreadsheet
    [author]="author"
    [showCommentsPane]="false"
    (created)="created()">
    <e-sheets>
      <e-sheet name="Data">
        <e-rows>
          <e-row>
            <e-cells>
              <e-cell value="Product"></e-cell>
              <e-cell value="Price"></e-cell>
            </e-cells>
          </e-row>
          <e-row>
            <e-cells>
              <e-cell value="Widget A"></e-cell>
              <e-cell
                [value]="100"
                [comment]="{
                  author: 'John Doe',
                  text: 'Review this price before publishing',
                  createdTime: 'March 16, 2026 at 2:00 PM',
                  isResolved: false,
                  replies: []
                }">
              </e-cell>
            </e-cells>
          </e-row>
        </e-rows>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  public author: string = 'John Doe';

  created(): void {
    this.spreadsheet.updateCell(
      {
        comment: {
          author: 'John Doe',
          text: 'Review this price before publishing',
          createdTime: 'March 16, 2026 at 2:00 PM',
          isResolved: false,
          replies: []
        }
      },
      'B2'
    );
  }
}
```

---

## Comment Model Structure

```typescript
{
  author: string,        // Name of comment author
  text: string,          // Comment content
  createdTime: string,   // Timestamp (formatted string)
  isResolved: boolean,   // true = resolved thread, false = active
  replies: [
    {
      author: string,    // Reply author name
      text: string,      // Reply content
      createdTime: string // Reply timestamp
    }
    // Can have multiple replies
  ]
}
```

---

## API Reference

| Method / Property | Signature | Description |
|---|---|---|
| `updateCell` | `updateCell(cell: CellModel, address?: string)` | Add or update a comment on a cell |
| `author` | `string` | Sets author name for new comments |
| `showCommentsPane` | `boolean` | Show/hide the comments review pane |

---

## Comment Operations

### Add Comment
```typescript
created(): void {
  this.spreadsheet.updateCell(
    {
      comment: {
        author: 'John Doe',
        text: 'Review this value',
        createdTime: 'March 19, 2026 at 10:00 AM',
        isResolved: false,
        replies: []
      }
    },
    'A1'
  );
}
```

### Add Comment with Replies
```typescript
created(): void {
  this.spreadsheet.updateCell(
    {
      comment: {
        author: 'John Doe',
        text: 'Are you completed the report?',
        createdTime: 'January 03, 2026 at 5:00 PM',
        isResolved: false,
        replies: [
          {
            author: 'Jane Smith',
            text: 'Yes, completed.',
            createdTime: 'January 03, 2026 at 7:00 PM'
          }
        ]
      }
    },
    'A1'
  );
}
```

### Edit Comment
```typescript
editComment(): void {
  this.spreadsheet.updateCell(
    {
      comment: {
        author: 'John Doe',
        text: 'Updated comment text',
        createdTime: 'January 03, 2026 at 5:00 PM',
        isResolved: false,
        replies: []
      }
    },
    'A1'
  );
}
```

### Resolve Comment Thread
```typescript
resolveComment(): void {
  this.spreadsheet.updateCell(
    {
      comment: {
        author: 'John Doe',
        text: 'Original comment',
        createdTime: 'January 03, 2026 at 5:00 PM',
        isResolved: true,   // Set true to resolve
        replies: [
          {
            author: 'Jane Smith',
            text: 'Issue resolved.',
            createdTime: 'January 03, 2026 at 7:00 PM'
          }
        ]
      }
    },
    'B2'
  );
}
```

### Reopen Resolved Comment
```typescript
reopenComment(): void {
  this.spreadsheet.updateCell(
    {
      comment: {
        author: 'John Doe',
        text: 'Original comment',
        createdTime: 'January 03, 2026 at 5:00 PM',
        isResolved: false,   // Set false to reopen
        replies: []
      }
    },
    'B2'
  );
}
```

### Show or Hide Comments Pane
```typescript
showPane(): void {
  this.spreadsheet.showCommentsPane = true;   // Show pane
}

hidePane(): void {
  this.spreadsheet.showCommentsPane = false;  // Hide pane
}
```

### Bulk Add Comments
```typescript
created(): void {
  const commentData = [
    { cell: 'A1', text: 'First item',  author: 'John' },
    { cell: 'A2', text: 'Second item', author: 'Jane' },
    { cell: 'A3', text: 'Third item',  author: 'Bob'  }
  ];

  commentData.forEach((item) => {
    this.spreadsheet.updateCell(
      {
        comment: {
          author: item.author,
          text: item.text,
          createdTime: new Date().toLocaleString(),
          isResolved: false,
          replies: []
        }
      },
      item.cell
    );
  });
}
```

---

## Template Button Binding Example

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template: `
    <ejs-spreadsheet
    #spreadsheet
    [author]="author"
    [showCommentsPane]="showPane"
    (created)="created()">
    <e-sheets>
      <e-sheet name="Report">
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>
  <button (click)="addComment()">Add Comment</button>
  <button (click)="resolveComment()">Resolve Comment</button>
  <button (click)="reopenComment()">Reopen Comment</button>
  <button (click)="togglePane()">Toggle Comments Pane</button>
  `
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  public author: string = 'John Doe';
  public showPane: boolean = false;

  created(): void {
    // Initialization logic if needed
  }

  addComment(): void {
    this.spreadsheet.updateCell(
      {
        comment: {
          author: this.author,
          text: 'Please verify this data',
          createdTime: new Date().toLocaleString(),
          isResolved: false,
          replies: []
        }
      },
      'B3'
    );
  }

  resolveComment(): void {
    this.spreadsheet.updateCell(
      {
        comment: {
          author: this.author,
          text: 'Please verify this data',
          createdTime: new Date().toLocaleString(),
          isResolved: true,
          replies: []
        }
      },
      'B3'
    );
  }

  reopenComment(): void {
    this.spreadsheet.updateCell(
      {
        comment: {
          author: this.author,
          text: 'Please verify this data',
          createdTime: new Date().toLocaleString(),
          isResolved: false,
          replies: []
        }
      },
      'B3'
    );
  }

  togglePane(): void {
    this.showPane = !this.showPane;
  }
}
```

---

## User Interactions (Built-in UI)

| Action | Method |
|---|---|
| Add Comment | Right-click cell → **New Comment** or `Ctrl + Shift + F2` |
| Add Reply | Right-click cell with comment → **New Reply** |
| Edit Comment | Hover over comment → click **⋯** → **Edit Comment** |
| Resolve Thread | Hover over comment → click **⋯** → **Resolve Thread** |
| Reopen Thread | Hover over resolved comment → click **Reopen** |
| Delete Comment | Right-click cell → **Delete Comment** |
| Navigate Comments | Ribbon: **Review > Next Comment / Previous Comment** |

---

## Export and Persistence

| Format | Comments | Replies | Thread Status |
|---|---|---|---|
| XLSX | ✅ Yes | ✅ Yes | ✅ Yes |
| XLS  | ❌ No  | ❌ No  | ❌ No  |
| CSV  | ❌ No  | ❌ No  | ❌ No  |
| PDF  | ❌ No  | ❌ No  | ❌ No  |

> **Important:** Always save as `.xlsx` to preserve threaded comments with replies and resolved state.

---

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[AUTHOR]` | Author name | `'John Doe'`, `'Admin'`, `'System'` |
| `[TEXT]` | Comment text | `'Review this price'`, `'Need approval'` |
| `[CELL]` | Target cell address | `'A1'`, `'Sheet1!B2'`, `'B2'` |
| `[CREATED_TIME]` | Comment timestamp | `'March 19, 2026 at 10:00 AM'` |

---

## Notes

- Always access `SpreadsheetComponent` via `@ViewChild` — never use `new Spreadsheet()` in Angular.
- All comment operations must be placed inside the `created()` event to ensure the component is fully initialized.
- Use `#spreadsheet` template reference variable on `<ejs-spreadsheet>` to match `@ViewChild('spreadsheet')`.
- Set `[author]="authorName"` in the template to tag all new comments with the correct user.
- **One comment per cell only** — additional remarks must be added as replies in the existing thread.
- **Comments and Notes cannot coexist** in the same cell.
- `isResolved: true` marks the thread as resolved; set back to `false` to reopen.
- Un-posted comments (typed but not submitted via UI) are not saved programmatically.
- Print output does **NOT** include comments — export to `.xlsx` if needed.
- Comments are not real-time collaborative — sync via export/reimport only.
- No performance impact for reasonable comment counts (< 1000).
- Import `SpreadsheetAllModule` in the `imports` array of the standalone component.