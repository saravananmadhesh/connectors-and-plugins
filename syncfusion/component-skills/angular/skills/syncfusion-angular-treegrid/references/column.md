---
name: Column
description: 'Columns in Syncfusion Angular TreeGrid - column configuration, headers, width management, custom templates, reordering, and visibility control.'
---

# Columns

Columns define the structure and display of TreeGrid data with various customization options.

## When to Use

Use column features when you need to:
- **Define data structure** — Map data fields to columns for display
- **Customize column headers** — Add icons, tooltips, and custom header templates
- **Control column width** — Set fixed or auto-calculated column widths
- **Hide/show columns** — Toggle visibility of specific columns
- **Reorder columns** — Allow users to drag columns to reorder
- **Format column data** — Display dates, numbers, currency with proper formatting
- **Custom column templates** — Render custom HTML or components in columns

## Table of Contents
- [Column Definition](#column-definition)
- [Column Types](#column-types)
- [Headers and Width](#headers-and-width)
- [Templates and Customization](#templates-and-customization)

## Column Definition

### Basic Column Setup

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid [dataSource]='data' [childMapping]='childMapping'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='150'></e-column>
        <e-column field='Duration' headerText='Duration' width='100'></e-column>
      </e-columns>
    </ejs-treegrid>
  `
})
export class AppComponent {
  public data: Object[] = [];
  public childMapping: string = 'subtasks';
}
```

## Column Types

### Text Column

```typescript
<e-column field='TaskName' headerText='Task Name' type='sting' width='150'></e-column>
```

### Number Column

```typescript
<e-column field='Duration' headerText='Duration' type='number' width='100'></e-column>
```

### Date Column

```typescript
<e-column field='StartDate' headerText='Start Date' type='date' format='yMd' width='130'></e-column>
```

### Boolean Column

```typescript
<e-column field='IsCompleted' headerText='Completed' type='boolean' width='100'></e-column>
```

## Headers and Width

### Fixed Width

```typescript
<e-column field='TaskName' headerText='Task Name' width='200'></e-column>
```

### Auto Width

```typescript
<e-column field='TaskName' headerText='Task Name' width='auto'></e-column>
```

### Min/Max Width

```typescript
<e-column field='TaskName' headerText='Task Name' minWidth='100' maxWidth='300'></e-column>
```

### Custom Header

```typescript
<e-column field='TaskName' headerText='Task Information' width='200'></e-column>
```

## Templates and Customization

### Column Template

```typescript
<e-columns>
  <e-column field='TaskName' headerText='Task Name' width='150' >
    <ng-template #template let-data>
      <strong>{{ data.TaskName }}</strong>
    </ng-template>
  </e-column>
</e-columns>


```

### Header Template

```typescript
<e-column field='TaskName' width='150'>
  <ng-template #headerTemplate>
    <div style="text-align: center;">
      <strong>Task Information</strong>
    </div>
  </ng-template>
</e-column>
```

### Column Visibility

```typescript
<e-column field='InternalNotes' headerText='Notes' [visible]='false'></e-column>
```

### Column Reordering

```typescript
<ejs-treegrid 
  [allowReordering]='true'>
  <!-- columns -->
</ejs-treegrid>
```

### Frozen Columns

```typescript
<ejs-treegrid 
  [frozenColumns]='2'>
  <e-column field='TaskID' headerText='Task ID' freeze='Right' width='90'></e-column>
  <e-column field='TaskName' headerText='Task Name' freeze='Left' width='150'></e-column>
</ejs-treegrid>
```
