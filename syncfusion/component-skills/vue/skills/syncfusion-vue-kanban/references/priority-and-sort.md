# Kanban Priority and Sort Settings

## Table of Contents
- [Priority (Card Position by Rank)](#priority-card-position-by-rank)
- [Sort Settings Overview](#sort-settings-overview)
- [Sort by Index (Default)](#sort-by-index-default)
- [Sort by Index with Field Mapping](#sort-by-index-with-field-mapping)
- [Sort by DataSourceOrder](#sort-by-datasourceorder)
- [Sort by Custom Field](#sort-by-custom-field)
- [Sort Direction](#sort-direction)

---

## Priority (Card Position by Rank)

Map a numeric rank field to `cardSettings.priority` to preserve exact card positions after drag-and-drop. When a card is dropped, the Kanban automatically recalculates the priority values for surrounding cards to maintain consistent ordering.

```vue
<script setup>
const cardSettings = {
  contentField: 'Summary',
  headerField: 'Id',
  priority: 'RankId',  // ← numeric field in your data
};
</script>
```

**Data example:**
```js
{ Id: 1, Status: 'Open', Summary: 'Task A', RankId: 1 }
{ Id: 2, Status: 'Open', Summary: 'Task B', RankId: 2 }
{ Id: 3, Status: 'Open', Summary: 'Task C', RankId: 3 }
```

**Reordering behavior:**

| Scenario | Outcome |
|---|---|
| Drop into an empty cell | Priority value unchanged |
| Drop at last position (non-continuous order) | Priority updated based on previous card value |
| Drop between continuous-order cards | Dropped card and all following continuous cards are re-numbered |
| Drop between odd/even-order cards | Dropped card and following cards re-numbered with inserted values |

> `priority` must map to a **numeric** field. String values are not supported.

---

## Sort Settings Overview

`sortSettings` controls how cards are ordered within columns and how dropped cards are placed. It has three modes via `sortBy`:

| Value | Cards Load Order | Cards Drop Order |
|---|---|---|
| `'Index'` (default) | JSON data order or `field` order | Dropped clone position |
| `'DataSourceOrder'` | JSON data order | JSON data order |
| `'Custom'` | `field` mapped value order | `field` mapped value order |

---

## Sort by Index (Default)

Without a `sortSettings` prop, the board uses `Index` mode without field mapping — cards load in JSON order and drop exactly where you place them:

```vue
<ejs-kanban keyField="Status" :dataSource="kanbanData" :cardSettings="cardSettings">
  <!-- columns — no sortSettings needed -->
</ejs-kanban>
```

---

## Sort by Index with Field Mapping

Combine `sortBy: 'Index'` with a `field` to load cards in rank order **and** update the rank field when cards are dropped:

```vue
<script setup>
const sortSettings = {
  sortBy: 'Index',
  field: 'RankId',  // numeric field
};
</script>

<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings" :sortSettings="sortSettings">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>
```

The `field` value is automatically adjusted for the dropped card (and consecutive cards if needed) using the same continuous/odd-even reorder logic as `priority`.

> `field` must be a **numeric** data field.

---

## Sort by DataSourceOrder

Cards load and are re-inserted in JSON data order, regardless of where you drop them:

```vue
<script setup>
const sortSettings = {
  sortBy: 'DataSourceOrder',
};
</script>
```

Use this when you want the board to always reflect the server-side data order.

---

## Sort by Custom Field

Cards are sorted by any data field value (string or number). Drop order also follows the field value:

```vue
<script setup>
const sortSettings = {
  sortBy: 'Custom',
  field: 'Summary',    // sort cards alphabetically by Summary
};
</script>
```

---

## Sort Direction

Control ascending or descending card order within columns using `direction`. Works with all `sortBy` values:

```vue
<script setup>
const sortSettings = {
  sortBy: 'Custom',
  field: 'Summary',
  direction: 'Descending',   // 'Ascending' is the default
};
</script>

<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings" :sortSettings="sortSettings">
    <!-- columns -->
  </ejs-kanban>
</template>
```

| `direction` Value | Result |
|---|---|
| `'Ascending'` (default) | Cards sorted A→Z or 1→N |
| `'Descending'` | Cards sorted Z→A or N→1 |
