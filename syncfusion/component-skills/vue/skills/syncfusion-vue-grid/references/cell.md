# Cells

## Table of Contents
- [When to Use](#when-to-use)
- [Cell Styling](#cell-styling)
- [Cell Content](#cell-content)
- [Cell Wrapping and Clipping](#cell-wrapping-and-clipping)
- [Cell Tooltips](#cell-tooltips)
- [Grid Lines](#grid-lines)
- [Cell Events](#cell-events)
- [Cell Formatting](#cell-formatting)

## When to Use

Use this reference when:
- **Styling cells** with custom backgrounds, colors, and CSS classes
- **Displaying HTML content** in cells safely
- **Wrapping and managing text** overflow in cells
- **Adding tooltips** to cell values
- **Configuring grid lines** and cell borders
- **Handling cell interactions** with events
- **Formatting cell display** with numbers, dates, and custom formatting
- **Creating interactive cells** with custom rendering

## Cell Styling

### Basic Cell Styling
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :queryCellInfo="handleQueryCellInfo">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
      <e-column field="Status" headerText="Status" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const handleQueryCellInfo = (args) => {
  if (args.column.field === 'OrderID') {
    args.cellElement.style.fontWeight = 'bold';
    args.cellElement.style.color = '#0078d4';
  }
  
  if (args.column.field === 'Freight' && args.data.Freight > 100) {
    args.cellElement.style.backgroundColor = '#fff3cd';
    args.cellElement.style.color = '#856404';
  }
};
</script>
```

### CSS Class-Based Styling
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :queryCellInfo="handleQueryCellInfo">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="Status" headerText="Status" width="100"></e-column>
      <e-column field="Priority" headerText="Priority" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const handleQueryCellInfo = (args) => {
  if (args.column.field === 'Status') {
    args.cellElement.classList.add(`status-${args.data.Status.toLowerCase()}`);
  }
  
  if (args.data.Priority === 'High') {
    args.cellElement.classList.add('high-priority');
  }
};
</script>

<style scoped>
:deep(.status-active) {
  background-color: #d4edda;
  color: #155724;
  font-weight: bold;
}

:deep(.status-pending) {
  background-color: #fff3cd;
  color: #856404;
}

:deep(.status-cancelled) {
  background-color: #f8d7da;
  color: #721c24;
}

:deep(.high-priority) {
  border-left: 4px solid #dc3545;
  padding-left: 8px;
}
</style>
```

### Conditional Cell Background
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :queryCellInfo="applyConditionalStyle">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
      <e-column field="Discount" headerText="Discount" type="number" format="P" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const applyConditionalStyle = (args) => {
  const value = args.data[args.column.field];
  
  // Color scale for freight
  if (args.column.field === 'Freight') {
    if (value < 25) {
      args.cellElement.style.backgroundColor = '#90ee90';  // Light green
    } else if (value < 75) {
      args.cellElement.style.backgroundColor = '#ffffe0';  // Light yellow
    } else {
      args.cellElement.style.backgroundColor = '#ffcccb';  // Light red
    }
  }
};
</script>
```

## Cell Content

### HTML Content in Cells
```vue
<template>
  <ejs-grid :dataSource="data">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer" width="120">
        <template v-slot:default="{ data }">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="width: 24px; height: 24px; border-radius: 50%; background: #007bff; color: white; display: flex; align-items: center; justify-content: center;">
              {{ data.CustomerID.charAt(0) }}
            </span>
            <span>{{ data.CustomerID }}</span>
          </div>
        </template>
      </e-column>
      <e-column field="Status" headerText="Status" width="100">
        <template v-slot:default="{ data }">
          <span :class="'badge badge-' + data.Status.toLowerCase()">
            {{ data.Status }}
          </span>
        </template>
      </e-column>
    </e-columns>
  </ejs-grid>
</template>

<style scoped>
.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.badge-active {
  background-color: #28a745;
  color: white;
}

.badge-pending {
  background-color: #ffc107;
  color: black;
}

.badge-cancelled {
  background-color: #dc3545;
  color: white;
}
</style>
```

### Hyperlinks in Cells
```vue
<template>
  <ejs-grid :dataSource="data">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerURL" headerText="Customer" width="150">
        <template v-slot:default="{ data }">
          <a :href="data.CustomerURL" target="_blank" style="color: #0078d4; text-decoration: underline;">
            {{ data.CustomerName }}
          </a>
        </template>
      </e-column>
      <e-column field="ProductURL" headerText="Product" width="150">
        <template v-slot:default="{ data }">
          <a :href="data.ProductURL" target="_blank">
            View Product
          </a>
        </template>
      </e-column>
    </e-columns>
  </ejs-grid>
</template>
```

### Images in Cells
```vue
<template>
  <ejs-grid :dataSource="data">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="ProductImage" headerText="Image" width="100">
        <template v-slot:default="{ data }">
          <img :src="data.ProductImage" style="height: 40px; width: auto; border-radius: 4px;" :alt="data.ProductName" />
        </template>
      </e-column>
      <e-column field="ProductName" headerText="Product" width="150"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const data = ref([
  {
    OrderID: 10248,
    ProductName: 'Widget A',
    ProductImage: 'url'
  }
]);
</script>
```

## Cell Wrapping and Clipping

### Enable Text Wrapping
```vue
<template>
  <ejs-grid :dataSource="data" :allowTextWrap="true">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="80"></e-column>
      <e-column field="Description" headerText="Description" width="150" :allowTextWrap="true"></e-column>
      <e-column field="Notes" headerText="Notes" width="150" :allowTextWrap="true"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const data = ref([
  {
    OrderID: 10248,
    Description: 'This is a long description that should wrap to multiple lines in the cell',
    Notes: 'Important: Remember to process this order with special handling instructions'
  }
]);
</script>
```

### Text Wrap with Row Height
```vue
<template>
  <ejs-grid 
    :dataSource="data" 
    :allowTextWrap="true"
    :rowHeight="48">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="80"></e-column>
      <e-column field="Description" headerText="Description" width="150" :textAlign="textAlign"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const textAlign = ref('Left');
const data = ref([
  {
    OrderID: 10248,
    Description: 'Long wrapped text example'
  }
]);
</script>
```

### Clipping vs Wrapping
```vue
<template>
  <ejs-grid :dataSource="data">
    <e-columns>
      <!-- Clipping: text hidden beyond width (default) -->
      <e-column field="OrderID" headerText="Order ID (Clip)" width="100"></e-column>
      
      <!-- Wrapping: text flows to multiple lines -->
      <e-column field="Description" headerText="Description (Wrap)" width="150" :allowTextWrap="true"></e-column>
      
      <!-- Ellipsis: show ... when text overflows -->
      <e-column field="Notes" headerText="Notes" width="120" 
        :template="elipsisTemplate"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const data = ref([]);

const elipsisTemplate = (props) => ({
  template: `<div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${props.Notes}">${props.Notes}</div>`
});
</script>

<style scoped>
:deep(.e-grid td) {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
```

## Cell Tooltips

### Basic Cell Tooltip
```vue
<template>
  <ejs-grid :dataSource="data" :queryCellInfo="showTooltip">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
      <e-column field="Description" headerText="Description" width="150"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const data = ref([
  {
    OrderID: 10248,
    Freight: 32.38,
    Description: 'Product Description'
  }
]);

const showTooltip = (args) => {
  if (args.column.field === 'Description') {
    args.cellElement.setAttribute('title', args.data.Description);
  }
};
</script>
```

### Custom Tooltip Content
```vue
<template>
  <ejs-grid :dataSource="data" :queryCellInfo="applyCustomTooltip">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="Status" headerText="Status" width="100"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const data = ref([]);

const applyCustomTooltip = (args) => {
  if (args.column.field === 'Status') {
    const statusText = {
      'Shipped': 'Order has been shipped. Tracking info available.',
      'Pending': 'Order is being prepared for shipment.',
      'Delivered': 'Order delivered successfully.'
    };
    
    args.cellElement.setAttribute('title', statusText[args.data.Status] || '');
  }
  
  if (args.column.field === 'Freight') {
    const tooltipText = `Freight Amount: $${args.data.Freight.toFixed(2)}\nCalculated on weight: ${args.data.Weight} kg`;
    args.cellElement.setAttribute('title', tooltipText);
  }
};
</script>
```

## Grid Lines

### Configure Grid Lines
```vue
<template>
  <ejs-grid :dataSource="data" gridLines="Both">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
      <e-column field="Status" headerText="Status" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const data = ref([]);

// gridLines options:
// 'Both' (default) - horizontal and vertical lines
// 'Horizontal' - only horizontal lines
// 'Vertical' - only vertical lines
// 'None' - no grid lines
</script>
```

### Style Grid Lines
```vue
<template>
  <ejs-grid :dataSource="data" gridLines="Both">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<style scoped>
:deep(.e-grid .e-gridcontent table tbody tr td) {
  border: 1px solid #d3d3d3;
}

:deep(.e-grid .e-gridheader thead tr th) {
  border: 1px solid #a9a9a9;
}

/* Light theme */
:deep(.e-grid.e-rtl .e-gridcontent table tbody tr td),
:deep(.e-grid .e-gridcontent table tbody tr td) {
  border-color: #e8e8e8;
}

/* Alternating row colors with visible grid lines */
:deep(.e-grid .e-gridcontent table tbody tr:nth-child(odd) td) {
  background-color: #f9f9f9;
  border-color: #e8e8e8;
}

:deep(.e-grid .e-gridcontent table tbody tr:nth-child(even) td) {
  background-color: #ffffff;
  border-color: #e8e8e8;
}
</style>
```

## Cell Events

### queryGridCellInfo Event
```vue
<template>
  <ejs-grid :dataSource="data" :queryGridCellInfo="handleQueryGridCellInfo">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
      <e-column field="Status" headerText="Status" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const data = ref([]);

const handleQueryGridCellInfo = (args) => {
  if (args.data.Freight > 100) {
    args.cellElement.style.fontWeight = 'bold';
    args.cellElement.style.color = '#d32f2f';
  }
};
</script>
```

### Record Cell Events
```vue
<template>
  <div>
    <ejs-grid 
      :dataSource="data" 
      @cellSelecting="handleCellSelecting"
      @cellSelected="handleCellSelected"
      @cellDeselecting="handleCellDeselecting"
      @cellDeselected="handleCellDeselected">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" width="100"></e-column>
      </e-columns>
    </ejs-grid>
    
    <div style="margin-top: 20px; padding: 10px; background: #f5f5f5;">
      <h4>Event Log:</h4>
      <ul>
        <li v-for="(event, index) in eventLog" :key="index">{{ event }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const data = ref([]);
const eventLog = ref([]);
const handleCellSelecting = (args) => {
  eventLog.value.push(`Selecting cell at Row ${args.rowIndex}, Column ${args.column.field}`);
};
const handleCellSelected = (args) => {
  eventLog.value.push(`Selected cell: ${args.column.field} = ${args.value}`);
};
const handleCellDeselecting = (args) => {
  eventLog.value.push(`Deselecting cell`);
};
const handleCellDeselected = (args) => {
  eventLog.value.push(`Deselected cell`);
};
</script>
```

## Cell Formatting

### Number Formatting
```vue
<template>
  <ejs-grid :dataSource="data">
    <e-columns>      
      <!-- Currency format -->
      <e-column field="Freight" headerText="Freight (Currency)" type="number" format="C2" width="140"></e-column>
      <!-- Percentage format -->
      <e-column field="Discount" headerText="Discount" type="number" format="P" width="120"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const data = ref([
  {
    OrderID: 10248,
    Freight: 32.38,
    Discount: 0.15,
    Rating: 4.5
  }
]);
</script>
```

### Date Formatting
```vue
<template>
  <ejs-grid :dataSource="data">
    <e-columns>
      <!-- Long date format -->
      <e-column field="ShippedDate" headerText="Shipped Date (Long)" type="date" format="MMMM dd, yyyy" width="160"></e-column>
      
      <!-- Date with time -->
      <e-column field="CreatedDate" headerText="Created" type="dateTime" format="M/d/yyyy h:mm a" width="170"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const data = ref([]);
</script>
```

### Custom Cell Formatting
```vue
<template>
  <ejs-grid :dataSource="data">
    <e-columns>      
      <e-column field="Frequency" headerText="Order Frequency" width="150">
        <template v-slot:default="{ data }">
          <span :class="getFrequencyClass(data.Frequency)">
            {{ formatFrequency(data.Frequency) }}
          </span>
        </template>
      </e-column>
      <e-column field="Amount" headerText="Amount" width="120">
        <template v-slot:default="{ data }">
          {{ formatAmount(data.Amount) }}
        </template>
      </e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const data = ref([
  {
    OrderID: 10248,
    Frequency: 15000,
    Amount: 5000.50
  }
]);

const formatAmount = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};

const formatFrequency = (value) => {
  if (value > 10000) return 'Very High';
  if (value > 5000) return 'High';
  if (value > 1000) return 'Medium';
  return 'Low';
};

const getFrequencyClass = (value) => {
  if (value > 10000) return 'frequency-very-high';
  if (value > 5000) return 'frequency-high';
  return 'frequency-normal';
};
</script>

<style scoped>
.frequency-very-high {
  color: #d32f2f;
  font-weight: bold;
}
.frequency-high {
  color: #f57c00;
  font-weight: bold;
}
.frequency-normal {
  color: #388e3c;
}
</style>
```

### Format Cell Values on Render
```vue
<template>
  <ejs-grid :dataSource="data" :queryCellInfo="formatCellDisplay">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="PhoneNumber" headerText="Phone" width="130"></e-column>
      <e-column field="ZipCode" headerText="Zip Code" width="120"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const data = ref([
  {
    OrderID: 10248,
    PhoneNumber: '5551234567',
    ZipCode: '12345'
  }
]);

const formatCellDisplay = (args) => {
  if (args.column.field === 'PhoneNumber') {
    const phone = args.data.PhoneNumber;
    args.cellElement.innerText = `(${phone.slice(0,3)}) ${phone.slice(3,6)}-${phone.slice(6)}`;
  }
  
  if (args.column.field === 'ZipCode') {
    args.cellElement.innerText = args.data.ZipCode.padStart(5, '0');
  }
};
</script>
```
