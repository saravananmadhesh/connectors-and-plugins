# Levels and Layout in Angular TreeMap

## Table of Contents

- [Configuring Multiple Hierarchy Levels](#configuring-multiple-hierarchy-levels)
- [Group Padding and Spacing](#group-padding-and-spacing)
  - [Customizing Item Gaps](#customizing-item-gaps)
- [Layout Types](#layout-types)
  - [Squarified Layout (Default)](#squarified-layout-default)
  - [SliceAndDiceVertical](#sliceanddicevertical)
  - [SliceAndDiceHorizontal](#sliceanddicehorizontal)
  - [SliceAndDiceAuto](#sliceanddiceauto)
- [Header Formatting and Styling](#header-formatting-and-styling)
  - [Header Format with Data Binding](#header-format-with-data-binding)
  - [Header Alignment](#header-alignment)
- [Header Height and Styling](#header-height-and-styling)
  - [Custom Header Height](#custom-header-height)
  - [Header Text Styling](#header-text-styling)
  - [Multi-Level Header Styling](#multi-level-header-styling)
- [Complete Hierarchical Example](#complete-hierarchical-example)
- [Best Practices](#best-practices)
  - [DO: Use Clear, Descriptive Group Paths](#do-use-clear-descriptive-group-paths)
  - [DON'T: Use Ambiguous Field Names](#dont-use-ambiguous-field-names)
  - [DO: Match Layout to Data Type](#do-match-layout-to-data-type)
  - [DO: Use Appropriate Header Heights](#do-use-appropriate-header-heights)
  - [DO: Limit Hierarchy Depth](#do-limit-hierarchy-depth)

## Configuring Multiple Hierarchy Levels

Use the `levels` collection to define grouped hierarchy in the TreeMap. Each level uses `groupPath` to group data from the outer level to the inner level, and the final visible items are configured through `leafItemSettings`.

```typescript
import { Component, signal } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <ejs-treemap
      id="treemap-container"
      [dataSource]="data()"
      weightValuePath="Sales"
      [levels]="levels"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `,
  styles: [`
    #treemap-container {
      display: block;
      width: 100%;
      height: 520px;
    }
  `]
})
export class TreeMapComponent {
  public data = signal([
    { Continent: 'Asia', Country: 'India', City: 'Delhi', Sales: 15000 },
    { Continent: 'Asia', Country: 'India', City: 'Mumbai', Sales: 12000 },
    { Continent: 'Europe', Country: 'Germany', City: 'Berlin', Sales: 8000 }
  ]);

  public levels = [
    { groupPath: 'Continent' },
    { groupPath: 'Country' }
  ];

  public leafItemSettings = {
    labelPath: 'City',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };
}
```

**How it works:**

- Level 0 with `groupPath: 'Continent'` creates the outer grouped blocks.
- Level 1 with `groupPath: 'Country'` creates the inner grouped blocks.
- `leafItemSettings.labelPath` shows the final leaf item text, such as `City`.

## Group Padding and Spacing

Use `groupGap` inside each level to control spacing between grouped blocks. Use `gap` inside `leafItemSettings` to control spacing between leaf rectangles.

```typescript
public levels = [
  {
    groupPath: 'Continent',
    groupGap: 8
  },
  {
    groupPath: 'Country',
    groupGap: 5
  }
];

public leafItemSettings = {
  labelPath: 'City',
  gap: 3,
  border: { color: '#ffffff', width: 1 }
};
```

### Customizing Item Gaps

```typescript
public levels = [
  {
    groupPath: 'Category',
    groupGap: 10
  }
];
```

Use larger values when you want stronger visual separation between hierarchy groups.

## Layout Types

Use the `layoutType` property to control how rectangles are arranged inside the TreeMap.

### Squarified Layout (Default)

`Squarified` produces more balanced rectangles and is usually the best choice for readability.

```typescript
<ejs-treemap
  [dataSource]="data()"
  weightValuePath="Sales"
  layoutType="Squarified"
  [levels]="levels"
  [leafItemSettings]="leafItemSettings">
</ejs-treemap>
```

**When to use it:**

- general-purpose dashboards
- better area comparison
- better label readability in many datasets

### SliceAndDiceVertical

`SliceAndDiceVertical` arranges items in vertical slices.

```typescript
<ejs-treemap
  [dataSource]="data()"
  weightValuePath="Sales"
  layoutType="SliceAndDiceVertical"
  [levels]="levels"
  [leafItemSettings]="leafItemSettings">
</ejs-treemap>
```

**When to use it:**

- when vertical segmentation is easier to scan
- when the container is relatively narrow

### SliceAndDiceHorizontal

`SliceAndDiceHorizontal` arranges items in horizontal slices.

```typescript
<ejs-treemap
  [dataSource]="data()"
  weightValuePath="Sales"
  layoutType="SliceAndDiceHorizontal"
  [levels]="levels"
  [leafItemSettings]="leafItemSettings">
</ejs-treemap>
```

**When to use it:**

- when horizontal segmentation is preferred
- when the container is relatively wide

### SliceAndDiceAuto

`SliceAndDiceAuto` automatically chooses the slice direction based on the available space.

```typescript
<ejs-treemap
  [dataSource]="data()"
  weightValuePath="Sales"
  layoutType="SliceAndDiceAuto"
  [levels]="levels"
  [leafItemSettings]="leafItemSettings">
</ejs-treemap>
```

`SliceAndDiceAuto` remains a slice-and-dice layout and adapts the slicing direction to the available area.

## Header Formatting and Styling

Level headers support text formatting and styling through properties such as `headerFormat`, `headerAlignment`, `headerHeight`, `headerStyle`, `fill`, and `border`.

### Header Format with Data Binding

Use `headerFormat` to display data fields inside the group header text.

```typescript
public levels = [
  {
    groupPath: 'Country',
    headerFormat: '${Country}'
  },
  {
    groupPath: 'Region',
    headerFormat: '${Region}'
  }
];
```

Use `${FieldName}` placeholders for fields that exist in the grouped data. If you want totals or aggregates in the header text, include those values in the data source before binding.

### Header Alignment

Use `headerAlignment` to control how the header text is placed inside the header area.

```typescript
public levels = [
  {
    groupPath: 'Region',
    headerFormat: '${Region}',
    headerAlignment: 'Center'
  }
];
```

**Common alignment values:**

- `Near`
- `Center`
- `Far`

## Header Height and Styling

### Custom Header Height

Use `headerHeight` to control the height reserved for a group header.

```typescript
public levels = [
  {
    groupPath: 'Category',
    headerHeight: 50
  }
];
```

Larger header heights are useful when the header is more important or when the header text needs more vertical space.

### Header Text Styling

Use `headerStyle` to control the header text appearance. Use `fill` to control the group background color.

```typescript
public levels = [
  {
    groupPath: 'Region',
    fill: '#2563eb',
    headerStyle: {
      color: '#ffffff',
      fontFamily: 'Arial',
      size: '14px',
      fontWeight: '600',
      opacity: 1
    }
  }
];
```

### Multi-Level Header Styling

Style each hierarchy level differently to make outer groups and inner groups easier to distinguish.

```typescript
public levels = [
  {
    groupPath: 'Continent',
    headerHeight: 50,
    fill: '#1d4ed8',
    headerStyle: {
      size: '18px',
      fontWeight: '700',
      color: '#ffffff'
    }
  },
  {
    groupPath: 'Country',
    headerHeight: 36,
    fill: '#dbeafe',
    headerStyle: {
      size: '13px',
      fontWeight: '500',
      color: '#111827'
    }
  }
];
```

This makes outer levels more prominent and inner levels more compact.

## Complete Hierarchical Example

```typescript
import { Component, signal } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <ejs-treemap
      id="treemap-container"
      [dataSource]="hierarchicalData()"
      weightValuePath="Sales"
      layoutType="Squarified"
      [levels]="levels"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `,
  styles: [`
    #treemap-container {
      display: block;
      width: 100%;
      height: 560px;
    }
  `]
})
export class TreeMapComponent {
  public hierarchicalData = signal([
    { Region: 'Asia', Country: 'India', Product: 'Software', Sales: 15000 },
    { Region: 'Asia', Country: 'China', Product: 'Hardware', Sales: 18000 },
    { Region: 'Asia', Country: 'Japan', Product: 'Services', Sales: 12000 },
    { Region: 'Europe', Country: 'Germany', Product: 'Services', Sales: 12000 },
    { Region: 'Europe', Country: 'France', Product: 'Software', Sales: 10000 },
    { Region: 'Europe', Country: 'Italy', Product: 'Hardware', Sales: 13000 }
  ]);

  public levels = [
    {
      groupPath: 'Region',
      groupGap: 8,
      headerFormat: '${Region}',
      headerHeight: 46,
      fill: '#1d4ed8',
      headerStyle: {
        color: '#ffffff',
        size: '14px',
        fontWeight: '700'
      }
    },
    {
      groupPath: 'Country',
      groupGap: 5,
      headerFormat: '${Country}',
      headerHeight: 34,
      fill: '#dbeafe',
      headerStyle: {
        color: '#111827',
        size: '12px',
        fontWeight: '500'
      }
    }
  ];

  public leafItemSettings = {
    labelPath: 'Product',
    showLabels: true,
    labelPosition: 'Center',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };
}
```

## Best Practices

### DO: Use Clear, Descriptive Group Paths

```typescript
public levels = [
  { groupPath: 'Department' },
  { groupPath: 'Category' },
  { groupPath: 'Region' }
];
```

Use field names that clearly describe the hierarchy level.

### DON'T: Use Ambiguous Field Names

```typescript
public levels = [
  { groupPath: 'D' },
  { groupPath: 'Cat' }
];
```

Avoid unclear abbreviations because they make the TreeMap harder to maintain and debug.

### DO: Match Layout to Data Type

```typescript
layoutType="Squarified"
```

Use `Squarified` when balanced rectangles and readability matter most.

```typescript
layoutType="SliceAndDiceVertical"
```

Use slice-and-dice layouts when you want a stronger directional visual grouping.

### DO: Use Appropriate Header Heights

```typescript
public levels = [
  {
    groupPath: 'Category',
    headerHeight: 50
  },
  {
    groupPath: 'SubCategory',
    headerHeight: 35
  }
];
```

Outer hierarchy levels can usually justify larger headers than inner levels.

### DO: Limit Hierarchy Depth

```typescript
public levels = [
  { groupPath: 'L1' },
  { groupPath: 'L2' },
  { groupPath: 'L3' }
];
```

Three levels are usually easier to scan than very deep hierarchies. Use more levels only when the grouping remains clear and readable.

