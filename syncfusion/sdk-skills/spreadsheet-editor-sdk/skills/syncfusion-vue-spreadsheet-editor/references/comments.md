
# Cell Comments — Syncfusion Vue Spreadsheet

The Syncfusion **Vue Spreadsheet** supports threaded comments with replies, resolving, and review workflows. Comments are added through the `comment` property in cell models or programmatically via `updateCell()`.

## 1. Minimal Vue Example

```vue
<template>
  <ejs-spreadsheet
    ref="spreadsheet"
    author="John Doe"
    :showCommentsPane="false"
    :created="onCreated"
  >
    <e-sheets>
      <e-sheet name="Data">
        <e-rows>
          <e-row>
            <e-cells>
              <e-cell :value="'Product'" />
              <e-cell :value="'Price'" />
            </e-cells>
          </e-row>
          <e-row>
            <e-cells>
              <e-cell :value="'Widget A'" />
              <e-cell
                :value="100"
                :comment="{
                  author: 'John Doe',
                  text: 'Review this price before publishing',
                  createdTime: new Date().toLocaleString(),
                  isResolved: false,
                  replies: []
                }"
              />
            </e-cells>
          </e-row>
        </e-rows>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>
</template>

<script>
import {
  SpreadsheetComponent,
  SheetsDirective,
  SheetDirective,
  RowsDirective,
  RowDirective,
  CellsDirective,
  CellDirective
} from "@syncfusion/ej2-vue-spreadsheet";

export default {
  components: {
    "ejs-spreadsheet": SpreadsheetComponent,
    "e-sheets": SheetsDirective,
    "e-sheet": SheetDirective,
    "e-rows": RowsDirective,
    "e-row": RowDirective,
    "e-cells": CellsDirective,
    "e-cell": CellDirective
  },
  methods: {
    onCreated() {
      const spreadsheet = this.$refs.spreadsheet;
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
    }
  }
};
</script>
```

## 2. Add Comment Programmatically

```vue
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

```vue
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

```vue
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

```vue
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

```vue
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

## 9. Built‑in UI Interactions

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

```vue
<template>
<ejs-spreadsheet ref="spreadsheet">
  <e-sheets>
    <e-sheet name="Report">
      <e-rows>
        <e-row :index="1">
          <e-cells>
            <e-cell
              :index="4"
              :value="'10248'"
              :comment="{
                author: 'Julius Gorner',
                text: 'Confirm delivery status.',
                createdTime: new Date().toLocaleString(),
                isResolved: true,
                replies: [
                  {
                    author: 'Cristi Espinos',
                    text: 'Delivered.',
                    createdTime: new Date().toLocaleString()
                  },
                  {
                    author: 'Julius Gorner',
                    text: 'Thanks.',
                    createdTime: new Date().toLocaleString()
                  }
                ]
              }"
            />
          </e-cells>
        </e-row>
      </e-rows>
    </e-sheet>
  </e-sheets>
</ejs-spreadsheet>
</template>

<script>
import {
SpreadsheetComponent,
SheetsDirective,
SheetDirective,
RowsDirective,
RowDirective,
CellsDirective,
CellDirective
} from "@syncfusion/ej2-vue-spreadsheet";

export default {
components: {
  "ejs-spreadsheet": SpreadsheetComponent,
  "e-sheets": SheetsDirective,
  "e-sheet": SheetDirective,
  "e-rows": RowsDirective,
  "e-row": RowDirective,
  "e-cells": CellsDirective,
  "e-cell": CellDirective
},

methods: {
  // Optional: You can add logic after load
  onCreated() {
    const spreadsheet = this.$refs.spreadsheet;
    console.log("Spreadsheet Created");
  }
}
};
</script>
```

## 12. Bulk Add Comments

```vue
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
