# Frozen Columns

## Table of Contents
- [When to Use](#when-to-use)
- [Freeze Columns](#freeze-columns)
- [Freeze Direction](#freeze-direction)
- [Programmatic Freeze](#programmatic-freeze)

## When to Use

Use this reference when you need to:
- Keep specific columns visible while scrolling horizontally
- Maintain important columns (ID, Name) visible during horizontal scroll
- Configure freeze direction (left, right, both sides)
- Programmatically freeze/unfreeze columns
- Create split views with frozen and scrollable columns

Keep specific columns visible when scrolling horizontally:

## Freeze Columns

```vue
<template>
  <ejs-grid :dataSource="data">
    <e-columns>
      <!-- Frozen columns (left side) -->
      <e-column field="OrderID" headerText="Order ID" width="100" :isFrozen="true"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120" :isFrozen="true"></e-column>
      
      <!-- Scrollable columns -->
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
      <e-column field="ShipAddress" headerText="Ship Address" width="150"></e-column>
      <e-column field="ShipCity" headerText="Ship City" width="120"></e-column>
      <e-column field="ShipCountry" headerText="Ship Country" width="120"></e-column>
    </e-columns>
  </ejs-grid>
</template>
```

## Freeze Direction

```vue
<template>
  <ejs-grid :dataSource="data">
    <e-columns>
      <!-- Frozen on left (default) -->
      <e-column field="OrderID" headerText="Order ID" width="100" :freeze="'Left'"></e-column>
      
      <!-- Scrollable columns -->
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
      <e-column field="ShipAddress" headerText="Address" width="150"></e-column>
      
      <!-- Frozen on right -->
      <e-column field="ShipDate" headerText="Ship Date" width="130" type="date" :freeze="'Right'"></e-column>
    </e-columns>
  </ejs-grid>
</template>
```

Valid directions: `Left`, `Right`

## Programmatic Freeze

```vue
<template>
  <div>
    <button @click="freezeColumn">Freeze Order ID</button>
    <button @click="unfreezeColumn">Unfreeze All</button>
    
    <ejs-grid ref="gridRef" :dataSource="data">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const gridRef = ref(null);

const freezeColumn = () => {
  gridRef.value?.freezeColumns(1);  // Freeze first column
};

const unfreezeColumn = () => {
  gridRef.value?.freezeColumns(0);  // Unfreeze all
};
</script>
```
