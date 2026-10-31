# Cell Comments — Syncfusion ASP.NET MVC Spreadsheet (ASP.NET MVC Version)

The Syncfusion **ASP.NET MVC Spreadsheet** supports threaded comments with replies, resolving, and review workflows. Comments are added through the `comment` property in cell models or programmatically via `updateCell()`.


## 1. Minimal ASP.NET MVC Example

```cshtml
@using Syncfusion.EJ2.Spreadsheet

@{
    string now = DateTime.Now.ToString();
}

        @Html.EJS().Spreadsheet("spreadsheet").Author("John Doe").ShowCommentsPane(false).Created("onCreated").Sheets(sheet =>
            {
                sheet.Name("Data")
                .Rows(rows =>
                {
                    // ==== Row 1 ====
                    rows.Cells(cells =>
                    {
                        cells.Value("Product").Add();
                        cells.Value("Price").Add();
                    }).Add();

                    // ==== Row 2 ====
                    rows.Cells(cells =>
                    {
                        cells.Value("Widget A").Add();

                        // Cell B2 with comment
                        cells.Value("100")
                             .Comment(comment =>
                             {
                                 comment.Author("John Doe")
                                       .Text("Review this price before publishing")
                                       .CreatedTime(now)
                                       .IsResolved(false);
                             })
                             .Add();
                    }).Add();
                }).Add();
            }).Render()

<script>
    function onCreated() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];

        // === Add programmatic comment to cell B2 ===
        spreadsheet.updateCell({
            comment: {
                author: "John Doe",
                text: "Review this price",
                createdTime: new Date().toLocaleString(),
                isResolved: false,
                replies: []
            }
        }, "B2");
    }
</script>
```

## 2. Add Comment Programmatically

```cshtml
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

```cshtml
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

```cshtml
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

```cshtml
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

```cshtml
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
- Right-click → **New Comment**
- Ribbon → **Review → Comment → New Comment**
- Keyboard → **Ctrl + Shift + F2**

### Add Reply
- Right-click → **Comment → New Reply**
- Hover → type reply → Post

### Resolve / Reopen
- Comment Editor → **⋯ → Resolve Thread**
- Reopen via same menu

### Delete Comment
- Right-click → **Delete Comment**
- Delete reply via **⋯** inside reply

### Navigate Comments
- Review → **Next Comment**
- Review → **Previous Comment**

## 10. Notes & Best Practices

- Set `author` during initialization for consistent tagging.
- Comments & Notes **cannot coexist** in the same cell.
- Use `isResolved` to keep discussions organized.
- Comments do not print or export to PDF.
- Threaded comments are not real-time synced.

## 11. Example — Add Threaded Comments on Load

```cshtml
@using Syncfusion.EJ2.Spreadsheet

@{
    string now = DateTime.Now.ToString();
}

@Html.EJS().Spreadsheet("spreadsheet")
    .Sheets(sheet =>
    {
        sheet.Name("Report")
        .Rows(rows =>
        {
            rows.Index(1)
                .Cells(cells =>
                {
                    cells.Index(4)
                        .Value("10248")
                        .Comment(comment =>
                        {
                            comment.Author("Julius Gorner")
                                   .Text("Confirm delivery status.")
                                   .CreatedTime(now)
                                   .IsResolved(true)
                                   .Replies(replies =>
                                   {
                                       replies.Author("Cristi Espinos")
                                              .Text("Delivered.")
                                              .CreatedTime(now)
                                              .Add();

                                       replies.Author("Julius Gorner")
                                              .Text("Thanks.")
                                              .CreatedTime(now)
                                              .Add();
                                   });
                        })
                        .Add();
                })
                .Add();
        })
        .Add();
    })
    .Render()
```

## 12. Bulk Add Comments

```cshtml
var comments = [
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
