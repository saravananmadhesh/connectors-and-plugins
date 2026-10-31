# Kanban Dimensions (Height and Width)

## Table of Contents
- [Auto Height and Width](#auto-height-and-width)
- [Pixel Dimensions](#pixel-dimensions)
- [Percentage Dimensions](#percentage-dimensions)
- [When to Use Each Mode](#when-to-use-each-mode)

## Auto Height and Width

`auto` is the default for both `height` and `width`. The board expands to match its parent container's width and its total card content's height — no scrolling occurs.

```vue
<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings" width="auto" height="auto">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
      <e-column headerText="Testing"     keyField="Testing"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>
```

> In `auto` mode, column headers are **not** sticky — they scroll away with the page.

## Pixel Dimensions

Set exact pixel values for predictable sizing. Both `number` and string `"Npx"` formats are accepted:

```vue
<template>
  <!-- width as number, height as string -->
  <ejs-kanban keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings" :width="650" height="550px">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
      <e-column headerText="Testing"     keyField="Testing"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>
```

When `height` is a fixed pixel value, the board's content area becomes vertically scrollable.

> A fixed `height` is **required** for:
> - `enableVirtualization: true`
> - `swimlaneSettings.enableFrozenRows: true`

## Percentage Dimensions

Percentage values make the board fill its parent container proportionally:

```vue
<template>
  <!-- Fills the entire parent container -->
  <ejs-kanban keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings" width="100%" height="100%">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
      <e-column headerText="Testing"     keyField="Testing"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>
```

> The parent container must have a defined height for `height="100%"` to work. If the parent has `height: auto`, the Kanban will collapse to zero height.

## When to Use Each Mode

| Mode | Use Case |
|---|---|
| `auto` (default) | Simple page layouts where the board should grow with its content |
| Pixel (`650px`) | Dashboards, fixed-size panels, or modals with known dimensions |
| Percentage (`100%`) | Responsive full-screen layouts where the board fills a flex/grid container |
