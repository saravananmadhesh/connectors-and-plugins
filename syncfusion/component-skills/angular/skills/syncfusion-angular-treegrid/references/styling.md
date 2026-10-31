---
name: Styling
description: 'Styling in Syncfusion Angular TreeGrid - built-in themes, CSS customization, row styling, cell styling, and responsive appearance management.'
---

# Styling and Appearance

Customize TreeGrid appearance with themes, CSS, and row/cell styling.

## When to Use

Use styling features when you need to:
- **Apply themes** — Use built-in light/dark/material themes
- **Custom styles** — Modify colors, fonts, spacing
- **Conditional formatting** — Style rows/cells based on data values
- **Branding** — Match corporate design guidelines
- **Highlight data** — Use colors to emphasize important information
- **Responsive appearance** — Adapt styles for different screen sizes
- **CSS customization** — Override default styles with custom CSS

## Table of Contents
- [CSS Customization](#css-customization)
- [Row and Cell Styling](#row-and-cell-styling)

## CSS Customization

### Custom Colors

```css
.e-treegrid .e-grid {
  background-color: #f5f5f5;
}

.e-treegrid .e-columnheader {
  background-color: #2196F3;
  color: white;
}

.e-treegrid .e-rowcell {
  border-color: #e0e0e0;
}
```

### Custom Font

```css
.e-treegrid {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 14px;
}
```

## Row and Cell Styling

### Row Highlighting

```typescript
<ejs-treegrid 
  (queryCellInfo)='onQueryCellInfo($event)'
  (rowDataBound)='onRowDataBound($event)'>
  <!-- columns -->
</ejs-treegrid>
```

```typescript
onRowDataBound(args: any) {
  if (args.data.Priority === 'High') {
    args.row.classList.add('high-priority-row');
  }
}

onQueryCellInfo(args: any) {
  if (args.data.Status === 'Completed') {
    args.cell.classList.add('completed-cell');
  }
}
```

### CSS Styles

```css
.high-priority-row {
  background-color: #FFEBEE;
  border-left: 4px solid #F44336;
}

.completed-cell {
  background-color: #C8E6C9;
  text-decoration: line-through;
}
```

### Responsive Styling

```css
@media (max-width: 768px) {
  .e-treegrid .e-grid {
    padding: 10px;
  }
  
  .e-treegrid .e-columnheader {
    font-size: 12px;
  }
}
```
