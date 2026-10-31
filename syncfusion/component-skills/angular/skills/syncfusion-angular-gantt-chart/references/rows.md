# Rows in Angular Gantt Chart

## Table of Contents
- [Row Style Customization](#row-style-customization)
- [Styling Parent and Child Rows](#styling-parent-and-child-rows)
- [Auto Focus Taskbar on Row Click](#auto-focus-taskbar-on-row-click)
- [Row Height](#row-height)
- [Customize Row Height for a Particular Row](#customize-row-height-for-a-particular-row)
- [Row Hover with Custom Action or Items](#row-hover-with-custom-action-or-items)
- [Add a New Row Programmatically](#add-a-new-row-programmatically)
- [Show or Hide a Row Using External Actions](#show-or-hide-a-row-using-external-actions)
- [Row Spanning](#row-spanning)
- [Row Drag and Drop](#row-drag-and-drop)
- [Indent and Outdent](#indent-and-outdent)
- [Alternate Row Styling](#alternate-row-styling)

---

## Row Style Customization

Use `rowDataBound` to apply styles based on row data.

```typescript
public rowDataBound(args: any): void {
  if (args.data.Progress < 30) {
    args.row.classList.add('below-30');
  }
}
```

You can also use `queryCellInfo` for cell-level styling or CSS classes such as `.e-selectionbackground` and `.e-altrow`.

## Styling Parent and Child Rows

Use `rowDataBound` and check `hasChildRecords` to style parent rows differently from child rows.

```typescript
public rowDataBound(args: any): void {
  const rowData = args.data as any;
  (args.row as HTMLElement).classList.add(rowData.hasChildRecords ? 'parent-row' : 'child-row');
}
```

## Auto Focus Taskbar on Row Click

Enable `autoFocusTasks` so the corresponding taskbar is focused when a row is selected.

```html
<ejs-gantt [autoFocusTasks]="true"></ejs-gantt>
```

## Row Height

Set a uniform row height with `rowHeight`.

```html
<ejs-gantt [rowHeight]="42"></ejs-gantt>
```

`rowHeight` applies to all rows and should be greater than `taskbarHeight`.

## Customize Row Height for a Particular Row

Use `rowDataBound` to change the height of a specific row.

```typescript
public rowDataBound(args: any): void {
  if ((args.data as any).TaskID === 2) {
    args.rowHeight = 90;
  }
}
```

## Row Hover with Custom Action or Items

Use `dataBound` to attach hover behavior and show custom content such as a tooltip or button.

```typescript
public dataBound(): void {
  const root = (this.gantt as any).getRootElement() as HTMLElement;
  root.addEventListener('mouseover', (event: MouseEvent) => {
    // Add hover UI based on the target row cell.
  });
}
```

## Add a New Row Programmatically

Use `addRecord` to insert rows above, below, or as a child.

```typescript
this.gantt.addRecord(newRecord, 'Below', 1);
this.gantt.addRecord(newRecord, 'Child', 2);
```

## Show or Hide a Row Using External Actions

You can hide or reveal rows by using `getRowByIndex` and changing the row element display style.

```typescript
const row = gantt.treeGrid.getRowByIndex(index);
if (row) {
  (row as HTMLElement).style.display = 'none';
}
```

## Row Spanning

Use `queryCellInfo` with `rowSpan` to merge cells vertically.

```typescript
public queryCellInfo(args: any): void {
  if ((args.data as any).TaskID === 4 && args.column.field === 'TaskName') {
    args.rowSpan = 2;
  }
}
```

## Row Drag and Drop

Enable row drag and drop with `allowRowDragAndDrop` and inject `RowDDService`.

```html
<ejs-gantt [allowRowDragAndDrop]="true"></ejs-gantt>
```

Handle `rowDrop` to read the dropped record and drop position.

```typescript
public rowDrop(args: any): void {
  console.log(args.dropPosition); // Above | Below | Child
}
```

## Indent and Outdent

Enable hierarchy changes with `editSettings.allowEditing` and inject `EditService` and `SelectionService`.

```typescript
public toolbar: string[] = ['Add', 'Indent', 'Outdent'];
this.gantt.indent();
this.gantt.outdent();
```

Select a row before calling `indent()` or `outdent()`. Multiple-row indent or outdent is not supported.

## Alternate Row Styling

Customize the alternate row background using CSS targeting the `.e-altrow` class.

```css
.e-gantt .e-altrow {
  background-color: #f0f4f8;
}
```
