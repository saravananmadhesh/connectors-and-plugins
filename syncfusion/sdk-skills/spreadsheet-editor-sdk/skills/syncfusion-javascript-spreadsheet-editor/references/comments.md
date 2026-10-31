# Cell Comments

Add threaded comments with replies, resolve discussions, and manage review workflows in the Spreadsheet Editor.

## Minimal Code

```typescript
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';

const spreadsheet: Spreadsheet = new Spreadsheet({
  author: 'John Doe',                  // Set author name for new comments
  showCommentsPane: false,             // Show/hide comments review pane
  sheets: [{
    name: 'Data',
    rows: [
      { 
        index: 0,
        cells: [
          { value: 'Product' }, 
          { value: 'Price' }
        ]
      },
      { 
        index: 1,
        cells: [
          { value: 'Widget A' }, 
          { 
            value: '100',
            comment: {
              author: 'John Doe',
              text: 'Review this price before publishing',
              createdTime: 'March 16, 2026 at 2:00 PM',
              isResolved: false,
              replies: []
            }
          }
        ]
      }
    ]
  }]
});

spreadsheet.appendTo('#spreadsheet');

// === Add Comment via updateCell ===
spreadsheet.updateCell(
  {
    comment: {
      author: '[AUTHOR]',
      text: '[TEXT]',
      createdTime: 'March 16, 2026 at 2:00 PM',
      isResolved: false,
      replies: []
    }
  },
  '[CELL]'
);

// === Add Comment with Replies ===
spreadsheet.updateCell(
  {
    comment: {
      author: 'John Doe',
      text: 'Are you completed the report',
      createdTime: 'January 03, 2026 at 5:00 PM',
      isResolved: false,
      replies: [
        { 
          author: 'Jane Smith', 
          text: 'Yes, completed',
          createdTime: 'January 03, 2026 at 7:00 PM' 
        }
      ]
    }
  },
  'A1'
);

// === Edit Comment (set isResolved or update replies) ===
spreadsheet.updateCell(
  {
    comment: {
      author: 'John Doe',
      text: 'Updated comment text',
      createdTime: 'January 03, 2026 at 5:00 PM',
      isResolved: true,
      replies: []
    }
  },
  'A1'
);

// === Mark Comment as Resolved ===
spreadsheet.updateCell(
  {
    comment: {
      author: 'John Doe',
      text: 'Original comment',
      createdTime: 'January 03, 2026 at 5:00 PM',
      isResolved: true,
      replies: [
        { 
          author: 'Jane Smith', 
          text: 'Issue resolved',
          createdTime: 'January 03, 2026 at 7:00 PM' 
        }
      ]
    }
  },
  'B2'
);

// === Show/Hide Comments Review Pane ===
spreadsheet.showCommentsPane = true;      // Show pane
spreadsheet.showCommentsPane = false;     // Hide pane

// === User Interactions (UI-based) ===
// Right-click cell → "New Comment" → type text → "Post"
// Right-click cell with comment → "New Reply" → type text → "Post"
// Comment editor: Click "⋯" (More) → "Edit Comment" or "Resolve Thread"
// Keyboard: Ctrl + Shift + F2 on a cell to open comment editor
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[AUTHOR]` | Author name | `'John Doe'`, `'Admin'`, `'System'` |
| `[TEXT]` | Comment text | `'Review this price'`, `'Need approval'` |
| `[CELL]` | Target cell address | `'A1'`, `'Sheet1!B2'`, `'B2'` |
| `[CREATED_TIME]` | Comment timestamp | `'March 16, 2026 at 2:00 PM'` |

## Comment Model Structure

```typescript
{
  author: string,                       // Name of comment author
  text: string,                         // Comment content
  createdTime: string,                  // Timestamp (formatted string)
  isResolved: boolean,                  // true = resolved thread, false = active
  replies: [
    {
      author: string,                   // Reply author name
      text: string,                     // Reply content
      createdTime: string               // Reply timestamp
    }
    // Can have multiple replies
  ]
}
```

## API Methods Reference

### Set Author (During Initialization)
```typescript
const spreadsheet = new Spreadsheet({
  author: '[AUTHOR]'                    // Set author for new comments
  // If not set, "Guest User" is used by default
});
```

### Add/Update Comment via updateCell
```typescript
spreadsheet.updateCell(
  {
    comment: {
      author: '[AUTHOR]',
      text: '[TEXT]',
      createdTime: '[CREATED_TIME]',
      isResolved: false,
      replies: []
    }
  },
  '[CELL]'
);
// Creates new comment or replaces existing one
```

### Add Reply to Comment
```typescript
// Fetch current comment, add reply, update back
spreadsheet.updateCell(
  {
    comment: {
      author: 'John Doe',
      text: 'Original comment',
      createdTime: 'January 03, 2026 at 5:00 PM',
      isResolved: false,
      replies: [
        { 
          author: 'Jane Smith', 
          text: 'My reply here',
          createdTime: 'January 03, 2026 at 7:00 PM' 
        }
      ]
    }
  },
  'A1'
);
```

### Resolve Comment Thread
```typescript
spreadsheet.updateCell(
  {
    comment: {
      author: 'John Doe',
      text: 'Comment text',
      createdTime: 'January 03, 2026 at 5:00 PM',
      isResolved: true,          // Set to true to resolve
      replies: [...]
    }
  },
  'A1'
);
```

### Reopen Resolved Comment
```typescript
spreadsheet.updateCell(
  {
    comment: {
      author: 'John Doe',
      text: 'Comment text',
      createdTime: 'January 03, 2026 at 5:00 PM',
      isResolved: false,         // Set to false to reopen
      replies: [...]
    }
  },
  'A1'
);
```

### Show/Hide Comments Review Pane
```typescript
spreadsheet.showCommentsPane = true;    // Display pane
spreadsheet.showCommentsPane = false;   // Hide pane
// Pane provides centralized view of all comments and replies
```

### Delete Comment (via UI or programmatically)
```typescript
// Programmatically: set comment to undefined or empty object
// UI: Right-click cell → "Delete Comment" or use comment editor "⋯" menu
```

## User Interactions (Built-in UI)

### Add Comment
- **Context Menu**: Right-click cell → "New Comment"
- **Ribbon**: Review > Comment > New Comment
- **Keyboard**: Ctrl + Shift + F2 on empty cell
- **Result**: Comment indicator appears on cell; hover to preview

### Add Reply
- **Context Menu**: Right-click cell with comment → Comment > New Reply
- **Ribbon**: Review > Comment > New Comment (on cell with comment)
- **Keyboard**: Ctrl + Shift + F2 on cell with comment
- **Editor**: Hover over comment indicator → type reply → Post

### Edit Comment/Reply
- **In Editor**: Click "⋯" (More) → "Edit Comment" → modify text → Post
- **For Reply**: Hover over reply → click "⋯" → "Edit Comment"

### Resolve/Reopen Comment
- **Resolve**: In comment editor → click "⋯" → "Resolve Thread"
- **Reopen**: In comment editor → click "Reopen" button (for resolved threads)

### Delete Comment/Reply
- **Delete Thread**: Right-click cell → Comment > Delete Comment
- **Delete Reply**: Hover over reply → click "⋯" → Delete Comment

### Navigate Comments
- **Next**: Review > Comment > Next Comment (moves to next cell with comment)
- **Previous**: Review > Comment > Previous Comment

## Export & Persistence

### Supported Formats
| Format | Comments Preserved | Replies | Thread Status |
|---|---|---|---|
| XLSX | ✅ Yes | ✅ Yes | ✅ Yes (resolved state) |
| XLS | ❌ No | ❌ No | ❌ No |
| CSV | ❌ No | ❌ No | ❌ No |
| PDF | ❌ No | ❌ No | ❌ No |

**Important**: Always save as `.xlsx` to preserve threaded comments with replies and resolved state.

## Notes

- **Best Practice**: Set `author` property during initialization so all new comments are tagged with a user
- **Best Practice**: Use timestamps (createdTime) to track discussion history
- **Best Practice**: Reply threads provide context; avoid long single-comment text blocks
- **Best Practice**: Use `isResolved` to mark completed discussions and keep threads organized
- **Best Practice**: Enable `showCommentsPane: true` for collaborative/review workflows
- **Gotcha**: One comment per cell only; new remarks must be added as replies in existing thread
- **Gotcha**: Comment and Notes cannot coexist in same cell
- **Gotcha**: Un-posted comments (typed but not submitted) are not saved
- **Gotcha**: Print output does NOT include comments; export to Excel if printing needed
- **Gotcha**: Comments are not real-time collaborative; sync via export/reimport only
- **Collaboration**: Author info is preserved through export/import cycle
- **Performance**: No performance impact for reasonable comment counts (<1000)

## Example: Initialize with Threaded Comments

```typescript
const spreadsheet = new Spreadsheet({
  author: 'John Doe',
  showCommentsPane: true,
  sheets: [{
    name: 'Report',
    rows: [{
      index: 1,
      cells: [{
        index: 4,
        value: '10248',
        comment: {
          author: 'Julius Gorner',
          text: 'Confirm delivery status for Order 10248.',
          createdTime: 'November 18, 2025 at 3:00 PM',
          isResolved: true,
          replies: [
            { 
              author: 'Cristi Espinos', 
              text: 'Status verified as delivered.',
              createdTime: 'November 18, 2025 at 3:30 PM' 
            },
            { 
              author: 'Julius Gorner', 
              text: 'Acknowledged, thank you.',
              createdTime: 'November 18, 2025 at 3:45 PM' 
            }
          ]
        }
      }]
    }]
  }]
});

spreadsheet.appendTo('#spreadsheet');
```

## Example: Add Comment with Reply

```typescript
spreadsheet.updateCell(
  {
    comment: {
      author: 'John Doe',
      text: 'Please verify this data',
      createdTime: new Date().toLocaleString(),
      isResolved: false,
      replies: [
        {
          author: 'Jane Smith',
          text: 'Data verification complete.',
          createdTime: new Date().toLocaleString()
        }
      ]
    }
  },
  'B3'
);
```

## Example: Bulk Add Comments to Multiple Cells

```typescript
const commentData = [
  { cell: 'A1', text: 'First item', author: 'John' },
  { cell: 'A2', text: 'Second item', author: 'Jane' },
  { cell: 'A3', text: 'Third item', author: 'Bob' }
];

commentData.forEach((item) => {
  spreadsheet.updateCell(
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
```
