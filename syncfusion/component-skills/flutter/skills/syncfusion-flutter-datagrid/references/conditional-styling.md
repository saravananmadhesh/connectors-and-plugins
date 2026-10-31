# Conditional Styling in SfDataGrid

## Table of Contents
- [Cell Styling](#cell-styling)
  - [Style Cells Based on Content](#style-cells-based-on-content)
  - [Style Alternate Cells](#style-alternate-cells)
- [Row Styling](#row-styling)
  - [Style Rows Based on Content](#style-rows-based-on-content)
  - [Style Alternate Rows](#style-alternate-rows)

---

All conditional styling in `SfDataGrid` is applied inside the `DataGridSource.buildRow` method by 
customizing the widgets returned in `DataGridRowAdapter`. There is no separate styling API — the 
full power of Flutter widgets is available for each cell and row.

---

## Cell Styling

### Style Cells Based on Content

Use the `DataGridRowAdapter.cells` list to return different widget styles depending on the 
cell's value. Check `dataGridCell.columnName` and `dataGridCell.value` inside `buildRow`:

```dart
@override
DataGridRowAdapter? buildRow(DataGridRow row) {
  return DataGridRowAdapter(
    cells: row.getCells().map<Widget>((dataGridCell) {

      // Determine background color based on cell value
      Color getColor() {
        if (dataGridCell.columnName == 'designation') {
          if (dataGridCell.value == 'Developer') return Colors.tealAccent;
          if (dataGridCell.value == 'Manager') return Colors.blue[200]!;
        }
        return Colors.transparent;
      }

      // Determine text style based on cell value
      TextStyle? getTextStyle() {
        if (dataGridCell.columnName == 'designation') {
          if (dataGridCell.value == 'Developer' ||
              dataGridCell.value == 'Manager') {
            return TextStyle(fontStyle: FontStyle.italic);
          }
        }
        return null;
      }

      return Container(
        color: getColor(),
        alignment: (dataGridCell.columnName == 'id' ||
                    dataGridCell.columnName == 'salary')
            ? Alignment.centerRight
            : Alignment.centerLeft,
        padding: EdgeInsets.symmetric(horizontal: 16.0),
        child: Text(
          dataGridCell.value.toString(),
          overflow: TextOverflow.ellipsis,
          style: getTextStyle(),
        ),
      );
    }).toList(),
  );
}
```

### Style Alternate Cells

Use `effectiveRows.indexOf(row)` to get the current row index, then apply styling to specific 
cells on odd or even rows. `effectiveRows` reflects the sorted order when sorting is active.

```dart
@override
DataGridRowAdapter? buildRow(DataGridRow row) {
  return DataGridRowAdapter(
    cells: row.getCells().map<Widget>((dataGridCell) {
      if (dataGridCell.columnName == 'id') {
        final int index = effectiveRows.indexOf(row);
        return Container(
          color: (index % 2 != 0) ? Colors.blueAccent : Colors.transparent,
          alignment: Alignment.centerRight,
          padding: EdgeInsets.symmetric(horizontal: 16.0),
          child: Text(
            dataGridCell.value.toString(),
            overflow: TextOverflow.ellipsis,
            style: (index % 2 != 0)
                ? TextStyle(fontStyle: FontStyle.italic)
                : null,
          ),
        );
      }

      return Container(
        alignment: (dataGridCell.columnName == 'salary')
            ? Alignment.centerRight
            : Alignment.centerLeft,
        padding: EdgeInsets.symmetric(horizontal: 16.0),
        child: Text(
          dataGridCell.value.toString(),
          overflow: TextOverflow.ellipsis,
        ),
      );
    }).toList(),
  );
}
```

---

## Row Styling

### Style Rows Based on Content

Set `DataGridRowAdapter.color` to apply a background color to the entire row. Examine cell values 
via `row.getCells()` to decide the color:

```dart
@override
DataGridRowAdapter buildRow(DataGridRow row) {

  Color getRowBackgroundColor() {
    final int salary = row.getCells()[3].value;  // salary is at index 3
    if (salary >= 10000 && salary < 15000) return Colors.blue[300]!;
    if (salary <= 15000) return Colors.orange[300]!;
    return Colors.transparent;
  }

  TextStyle? getTextStyle() {
    final int salary = row.getCells()[3].value;
    if (salary >= 10000 && salary < 15000) return TextStyle(color: Colors.white);
    if (salary <= 15000) return TextStyle(color: Colors.white);
    return null;
  }

  return DataGridRowAdapter(
    color: getRowBackgroundColor(),
    cells: row.getCells().map<Widget>((dataGridCell) {
      return Container(
        alignment: (dataGridCell.columnName == 'id' ||
                    dataGridCell.columnName == 'salary')
            ? Alignment.centerRight
            : Alignment.centerLeft,
        padding: EdgeInsets.symmetric(horizontal: 16.0),
        child: Text(
          dataGridCell.value.toString(),
          overflow: TextOverflow.ellipsis,
          style: getTextStyle(),
        ),
      );
    }).toList(),
  );
}
```

### Style Alternate Rows

Use `effectiveRows.indexOf(row)` to get the row index and alternate the `DataGridRowAdapter.color`:

> Use `effectiveRows` (not `rows`) to get the correct index after sorting is applied.

```dart
@override
DataGridRowAdapter? buildRow(DataGridRow row) {
  Color getRowBackgroundColor() {
    final int index = effectiveRows.indexOf(row);
    return (index % 2 != 0) ? Colors.lightGreen[300]! : Colors.transparent;
  }

  return DataGridRowAdapter(
    color: getRowBackgroundColor(),
    cells: row.getCells().map<Widget>((dataGridCell) {
      return Container(
        alignment: (dataGridCell.columnName == 'id' ||
                    dataGridCell.columnName == 'salary')
            ? Alignment.centerRight
            : Alignment.centerLeft,
        padding: EdgeInsets.symmetric(horizontal: 16.0),
        child: Text(
          dataGridCell.value.toString(),
          overflow: TextOverflow.ellipsis,
        ),
      );
    }).toList(),
  );
}
```

---

## Key Tips

| Scenario | Approach |
|----------|----------|
| Style a specific cell by value | Check `dataGridCell.columnName` and `dataGridCell.value` in `buildRow` |
| Style an entire row by value | Set `DataGridRowAdapter.color` and inspect `row.getCells()` |
| Alternate row/cell styling | Use `effectiveRows.indexOf(row)` and check `index % 2` |
| Text style per cell | Return a `TextStyle` in `Text.style` inside `buildRow` |
| Sort-aware index | Always use `effectiveRows.indexOf(row)` — not `rows.indexOf(row)` |
