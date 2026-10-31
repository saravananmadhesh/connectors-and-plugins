# Aggregates

## Table of Contents
- [When to Use](#when-to-use)
- [Basic Aggregates](#basic-aggregates)
- [Aggregate Types](#aggregate-types)
- [Footer Aggregates](#footer-aggregates)
- [Group Aggregates](#group-aggregates)
- [Custom Aggregates](#custom-aggregates)
- [Reactive Aggregates](#reactive-aggregates)
- [Multiple Aggregates](#multiple-aggregates)

## When to Use

Use this reference when you need to:
- Display summary calculations in grid footers or groups
- Calculate totals, averages, counts, max/min values
- Configure aggregates for grouped or ungrouped data
- Create custom aggregate functions
- Show aggregates in group captions
- Implement footer summary rows

## Basic Aggregates

Display summary calculations:

```vue
<template>
  <ejs-grid :dataSource="data" :allowPaging="true" :allowGrouping="true" :groupSettings="groupSettings">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" format="C2" width="100"></e-column>
    </e-columns>
    
    <e-aggregates>
      <e-aggregate>
        <e-columns>
          <e-column type="Sum" field="Freight" format="C2"></e-column>
          <e-column type="Count" field="OrderID"></e-column>
        </e-columns>
      </e-aggregate>
    </e-aggregates>
  </ejs-grid>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, AggregateDirective as EAggregate, AggregatesDirective as EAggregates, Page, Group, Aggregate } from "@syncfusion/ej2-vue-grids";
import { provide } from 'vue';

const groupSettings = {
  columns: ['ShipCountry']
};

provide('grid', [Page, Group, Aggregate]);
</script>
```

## Aggregate Types

### Sum
Total of numeric values:

```vue
<e-column type="Sum" field="Freight" format="C2"></e-column>
```

### Average
Average of numeric values:

```vue
<e-column type="Average" field="Freight" format="C2"></e-column>
```

### Count
Count total records:

```vue
<e-column type="Count" field="OrderID"></e-column>
```

### Max
Maximum value:

```vue
<e-column type="Max" field="Freight" format="C2"></e-column>
```

### Min
Minimum value:

```vue
<e-column type="Min" field="Freight" format="C2"></e-column>
```

### True Count
Count boolean true values:

```vue
<e-column type="TrueCount" field="IsActive"></e-column>
```

### False Count
Count boolean false values:

```vue
<e-column type="FalseCount" field="IsActive"></e-column>
```

## Footer Aggregates

Display totals at grid footer with custom formatting:

```vue
<template>
  <ejs-grid :dataSource="data">
    <e-columns>
      <e-column field="OrderID" width="100"></e-column>
      <e-column 
        field="Freight" 
        width="100"
        :footerTemplate="'footerSum'">
      </e-column>
    </e-columns>
    
    <e-aggregates>
      <e-aggregate>
        <e-columns>
          <e-column type="Sum" field="Freight" format="C2"></e-column>
        </e-columns>
      </e-aggregate>
    </e-aggregates>
    
    <template v-slot:footerSum="{ data }">
      <span><strong>Grand Total: ${{ data.Sum.toFixed(2) }}</strong></span>
    </template>
  </ejs-grid>
</template>
```

### Footer Template Formatting

Use the `format` property to display aggregates with specific formatting:

```javascript
// Currency formatting
<e-column type="Sum" field="Freight" format="C2"></e-column>

// Number with decimals
<e-column type="Average" field="Freight" format="N2"></e-column>

// Percentage
<e-column type="Percent" field="CompletionRate" format="P2"></e-column>
```

## Group Aggregates

Display subtotals in group footers and captions:

```vue
<template>
  <ejs-grid 
    :dataSource="data" 
    :allowGrouping="true" 
    :groupSettings="groupSettings">
    <e-columns>
      <e-column field="OrderID" width="100"></e-column>
      <e-column field="ShipCountry" width="150"></e-column>
      <e-column 
        field="Freight" 
        width="100"
        :groupFooterTemplate="'groupFooter'"
        :groupCaptionTemplate="'groupCaption'">
      </e-column>
    </e-columns>
    
    <e-aggregates>
      <e-aggregate>
        <e-columns>
          <e-column type="Sum" field="Freight" format="C2"></e-column>
          <e-column type="Average" field="Freight" format="C2"></e-column>
        </e-columns>
      </e-aggregate>
    </e-aggregates>
    
    <template v-slot:groupFooter="{ data }">
      <span>Subtotal: {{ data.Sum }}</span>
    </template>
    
    <template v-slot:groupCaption="{ data }">
      <span>(Average: {{ data.Average }})</span>
    </template>
  </ejs-grid>
</template>

<script setup>
const groupSettings = {
  columns: ['ShipCountry'],
  disablePageWiseAggregates: false  // Default: calculate per page
};
</script>
```

### Disable Page-Wise Aggregates

When grouping with paging, aggregates are calculated per page by default. To calculate across all data:

```javascript
const groupSettings = {
  columns: ['ShipCountry'],
  disablePageWiseAggregates: true  // Calculate totals for entire dataset
};
```

## Custom Aggregates

Define custom aggregate calculations for non-standard summaries:

```vue
<template>
  <ejs-grid :dataSource="data">
    <e-columns>
      <e-column field="CustomerID" width="120"></e-column>
      <e-column 
        field="Freight" 
        width="100"
        :footerTemplate="'customTotal'">
      </e-column>
    </e-columns>
    
    <e-aggregates>
      <e-aggregate>
        <e-columns>
          <e-column type="Custom" field="Freight" customAggregate="customSum"></e-column>
        </e-columns>
      </e-aggregate>
    </e-aggregates>
    
    <template v-slot:customTotal="{ data }">
      <span>Custom Total: {{ data.Custom }}</span>
    </template>
  </ejs-grid>
</template>

<script setup>
import { DataUtil } from '@syncfusion/ej2-data';

// Count distinct customers
const customAggregate = (data) => {
  const distinctRecords = DataUtil.distinct(data, 'CustomerID');
  return distinctRecords.length;
};

// Alternative: Sum values greater than threshold
const customThresholdSum = (data) => {
  let result = 0;
  data.forEach(item => {
    if (item.Freight > 50) {
      result += item.Freight;
    }
  });
  return result;
};
</script>
```

## Reactive Aggregates

### Batch Editing - Auto Update
Aggregates automatically update when batch editing is enabled:

```vue
<template>
  <ejs-grid 
    :dataSource="data" 
    :editSettings="editSettings"
    :allowPaging="true">
    <!-- columns -->
    <e-aggregates>
      <e-aggregate>
        <e-columns>
          <e-column type="Sum" field="Freight" format="C2"></e-column>
        </e-columns>
      </e-aggregate>
    </e-aggregates>
  </ejs-grid>
</template>

<script setup>
const editSettings = {
  allowEditing: true,
  allowAdding: true,
  mode: 'Batch'  // Aggregates auto-update
};
</script>
```

### Inline Editing - Manual Refresh
In inline mode, manually refresh aggregates after editing:

```javascript
// After edit completion, refresh aggregates
const handleActionComplete = (args) => {
  if (args.requestType === 'save') {
    // Refresh aggregates for the edited record
    const aggregateModule = gridInstance.aggregateModule;
    if (aggregateModule) {
      aggregateModule.refresh(args.data);
    }
  }
};
```

## Multiple Aggregates

Define multiple aggregate types:

```vue
<e-aggregates>
  <e-aggregate>
    <e-columns>
      <e-column type="Sum" field="Freight" format="C2"></e-column>
      <e-column type="Average" field="Freight" format="C2"></e-column>
      <e-column type="Max" field="Freight" format="C2"></e-column>
      <e-column type="Count" field="OrderID"></e-column>
    </e-columns>
  </e-aggregate>
  
  <e-aggregate>
    <e-columns>
      <e-column type="Sum" field="Quantity"></e-column>
    </e-columns>
  </e-aggregate>
</e-aggregates>
```
