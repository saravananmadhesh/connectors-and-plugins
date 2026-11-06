# Cell Comments — Syncfusion React Spreadsheet (React Version)

The Syncfusion **React Spreadsheet** supports threaded comments with replies, resolving, and review workflows. Comments are added through the `comment` property in cell models or programmatically via `updateCell()`.


## 1. Minimal React Example

```jsx
import * as React from "react";
import {
  SpreadsheetComponent,
  SheetsDirective,
  SheetDirective,
  RowsDirective,
  RowDirective,
  CellsDirective,
  CellDirective
} from "@syncfusion/ej2-react-spreadsheet";

export default function App() {
  const spreadsheetRef = useRef(null);

  const onCreated = () => {
    const spreadsheet = spreadsheetRef.current;
    if (!spreadsheet) return;

    // Add a programmatic comment
    spreadsheet.updateCell(
      {
        comment: {
          author: "John Doe",
          text: "Review this price",
          createdTime: new Date().toLocaleString(),
          isResolved: false,
          replies: []
        }
      },
      "B2"
    );
  };

  return (
    <SpreadsheetComponent
      ref={spreadsheetRef}
      author="John Doe"
      showCommentsPane={false}
      created={onCreated}
    >
      <SheetsDirective>
        <SheetDirective name="Data">
          <RowsDirective>
            <RowDirective>
              <CellsDirective>
                <CellDirective value="Product" />
                <CellDirective value="Price" />
              </CellsDirective>
            </RowDirective>

            <RowDirective>
              <CellsDirective>
                <CellDirective value="Widget A" />
                <CellDirective
                  value={100}
                  comment={{
                    author: "John Doe",
                    text: "Review this price before publishing",
                    createdTime: new Date().toLocaleString(),
                    isResolved: false,
                    replies: []
                  }}
                />
              </CellsDirective>
            </RowDirective>
          </RowsDirective>
        </SheetDirective>
      </SheetsDirective>
    </SpreadsheetComponent>
  );
}
```

## 2. Add Comment Programmatically

```jsx
spreadsheet.updateCell(
  {
    comment: {
      author: "John Doe",
      text: "Check this value",
      createdTime: new Date().toLocaleString(),
      isResolved: false,
      replies: []
    }
  },
  "A2"
);
```

## 3. Add Comment with Replies

```jsx
spreadsheet.updateCell(
  {
    comment: {
      author: "John Doe",
      text: "Are you completed the report?",
      createdTime: new Date().toLocaleString(),
      isResolved: false,
      replies: [
        {
          author: "Jane Smith",
          text: "Yes, completed",
          createdTime: new Date().toLocaleString()
        }
      ]
    }
  },
  "A1"
);
```

## 4. Edit Comment / Resolve Thread

```jsx
spreadsheet.updateCell(
  {
    comment: {
      author: "John Doe",
      text: "Updated comment text",
      createdTime: "January 03, 2026 at 5:00 PM",
      isResolved: true,
      replies: []
    }
  },
  "A1"
);
```

## 5. Mark Comment as Resolved

```jsx
spreadsheet.updateCell(
  {
    comment: {
      author: "John Doe",
      text: "Original comment",
      createdTime: "January 03, 2026 at 5:00 PM",
      isResolved: true,
      replies: [
        {
          author: "Jane Smith",
          text: "Issue resolved",
          createdTime: "January 03, 2026 at 7:00 PM"
        }
      ]
    }
  },
  "B2"
);
```

## 6. Show / Hide Comments Pane

```jsx
spreadsheet.showCommentsPane = true;   // Show
spreadsheet.showCommentsPane = false;  // Hide
```

## 7. Comment Model Structure

```ts
{
  author: string,
  text: string,
  createdTime: string,
  isResolved: boolean,
  replies: [
    {
      author: string,
      text: string,
      createdTime: string
    }
  ]
}
```

## 8. Placeholders

| Placeholder | Description | Example |
|------------|-------------|---------|
| `[AUTHOR]` | Comment author | `'John Doe'` |
| `[TEXT]` | Comment text | `'Review this item'` |
| `[CELL]` | Cell address | `'A1'`, `'Sheet1!B2'` |
| `[CREATED_TIME]` | Timestamp | `'March 16, 2026 at 2:00 PM'` |

## 9. Built-in UI Interactions

### Add Comment
- Right click → **New Comment**
- Ribbon → **Review → Comment → New Comment**
- Keyboard → **Ctrl + Shift + F2**

### Add Reply
- Right click → **Comment → New Reply**
- Hover → type reply → Post

### Resolve / Reopen
- Comment Editor → **⋯ → Resolve Thread**
- Reopen via same menu

### Delete Comment
- Right click → **Delete Comment**
- Delete reply via **⋯** inside reply

### Navigate Comments
- Review → **Next Comment**
- Review → **Previous Comment**

## 10. Notes & Best Practices

- Set `author` during initialization for consistent tagging.
- Comments & Notes **cannot coexist** in the same cell.
- Use `isResolved` to keep discussions organized.
- Comments do not print or export to PDF.
- Threaded comments are not real time synced.

## 11. Example — Add Threaded Comments on Load

```jsx
<SheetDirective
  name="Report"
  rows={[
    {
      index: 1,
      cells: [
        {
          index: 4,
          value: "10248",
          comment: {
            author: "Julius Gorner",
            text: "Confirm delivery status.",
            createdTime: new Date().toLocaleString(),
            isResolved: true,
            replies: [
              {
                author: "Cristi Espinos",
                text: "Delivered.",
                createdTime: new Date().toLocaleString()
              },
              {
                author: "Julius Gorner",
                text: "Thanks.",
                createdTime: new Date().toLocaleString()
              }
            ]
          }
        }
      ]
    }
  ]}
/>
```

## 12. Bulk Add Comments

```jsx
const comments = [
  { cell: "A1", author: "John", text: "First" },
  { cell: "A2", author: "Jane", text: "Second" },
  { cell: "A3", author: "Bob", text: "Third" }
];

comments.forEach((item) => {
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
