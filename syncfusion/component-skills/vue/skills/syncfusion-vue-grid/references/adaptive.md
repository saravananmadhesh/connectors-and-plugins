# Adaptive UI

## Table of Contents
- [When to Use This Guide](#when-to-use)
- [Enable Adaptive UI](#enable-adaptive-ui)
- [Adaptive Rendering Modes](#adaptive-rendering-modes)
- [Adaptive UI with Virtualization](#adaptive-ui-with-virtualization)
- [Mobile Device Handling](#mobile-device-handling)
- [Responsive Columns](#responsive-columns)
- [Adaptive Detail Templates](#adaptive-detail-templates)

## When to Use This Guide

Use this reference when:
- **Building responsive grids** that work on mobile and desktop
- **Enabling vertical row rendering** for narrow screens
- **Optimizing grid layout** for small screens and devices
- **Configuring adaptive UI modes** (Details, Grid, Both)
- **Handling device-specific rendering** automatically
- **Creating mobile-friendly data display** with proper viewport handling

## Enable Adaptive UI

### Basic Adaptive Configuration
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :enableAdaptiveUI="true">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
      <e-column field="OrderDate" headerText="Order Date" type="date" format="yMd" width="130"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-grids';
import { ref } from 'vue';

const data = ref([
  { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38, OrderDate: new Date(2023, 2, 15) },
  { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61, OrderDate: new Date(2023, 2, 16) }
]);
</script>
```

When enabled, Grid automatically switches rendering mode based on screen width:
- **Desktop** (default): Standard grid view
- **Mobile**: Vertical detail row view or full-row template

### Adaptive UI with Paging
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :enableAdaptiveUI="true"
    :allowPaging="true"
    :pageSettings="pageSettings">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const pageSettings = ref({ pageSize: 5 });
</script>
```

Paging works seamlessly—rows display in full-row adaptive template on mobile, standard grid on desktop.

## Adaptive Rendering Modes

### Detail Mode (Mobile First)
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :enableAdaptiveUI="true"
    :rowRenderingMode="'Details'">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
      <e-column field="OrderDate" headerText="Date" type="date" format="yMd" width="130"></e-column>
    </e-columns>
  </ejs-grid>
</template>
```

On mobile:
- Shows each record as a detail card
- Field names on left, values on right
- Expandable for additional fields
- Single column of data flowing vertically

### Grid Mode (Horizontal Scroll)
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :enableAdaptiveUI="true"
    :rowRenderingMode="'Grid'">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>
```

Displays traditional horizontal grid on all screen sizes.
- Horizontally scrollable on mobile
- Maintains all columns visible if width permits
- Best for data that fits in few columns

### Both Modes (Responsive Switch)
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :enableAdaptiveUI="true"
    :rowRenderingMode="'Both'">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="ShipAddress" headerText="Address" width="150"></e-column>
      <e-column field="ShipCity" headerText="City" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>
```

Smart switching:
- **Desktop**: Shows grid (horizontal columns)
- **Mobile**: Shows details (vertical rows)
- Automatically detects viewport width
- Best user experience across devices

## Adaptive UI with Virtualization

### Virtual Scrolling in Adaptive Mode
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :enableAdaptiveUI="true"
    :enableVirtualization="true"
    :rowRenderingMode="'Details'"
    :rowHeight="100">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
      <e-column field="OrderDate" headerText="Order Date" type="date" format="yMd" width="130"></e-column>
      <e-column field="ShipAddress" headerText="Address" width="150"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, VirtualScroll } from '@syncfusion/ej2-vue-grids';
import { provide } from 'vue';

const data = ref(generateLargeDataset(10000));

const generateLargeDataset = (count) => {
  const result = [];
  for (let i = 1; i <= count; i++) {
    result.push({
      OrderID: 10247 + i,
      CustomerID: ['VINET', 'TOMSP', 'HANAR'][i % 3],
      Freight: Math.random() * 500,
      OrderDate: new Date(2023, Math.floor(i / 100) % 12, (i % 28) + 1)
    });
  }
  return result;
};

provide('grid', [VirtualScroll]);
</script>
```

Combines:
- Adaptive rendering (Details mode on mobile)
- Virtual scrolling (renders only visible rows)
- Supports large datasets (10k+ rows)
- Smooth touch scrolling on mobile

## Mobile Device Handling

### Detect and Adjust for Mobile
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :enableAdaptiveUI="true"
    :rowRenderingMode="isMobile ? 'Details' : 'Grid'"
    :allowPaging="true"
    :pageSettings="pageSettings">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
      <e-column field="OrderDate" headerText="Order Date" type="date" format="yMd" width="130"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isMobile = ref(false);
const pageSettings = ref({ pageSize: 5 });

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>
```

Programmatically detect screen size and adjust rendering mode.

### Touch-Friendly Interactive Buttons
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :enableAdaptiveUI="true"
    :allowSelection="true"
    :selectionSettings="selectionSettings"
    :recordClick="onRecordClick">
    <e-columns>
      <e-column type="checkbox" width="50"></e-column>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const selectionSettings = ref({ type: 'Multiple', mode: 'Cell' });

const onRecordClick = (args) => {
  console.log('Row selected:', args.rowData);
};
</script>
```

## Responsive Columns

### Hide Columns on Small Screens
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :enableAdaptiveUI="true"
    :columnSelected="onColumnSelected">
    <e-columns>
      <!-- Always visible -->
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer" width="120"></e-column>
      
      <!-- Hidden on mobile, shown on desktop -->
      <e-column 
        field="ShipAddress" 
        headerText="Address" 
        width="150"
        :hideAtMedia="'(max-width: 768px)'">
      </e-column>
      
      <e-column 
        field="ShipCity" 
        headerText="City" 
        width="120"
        :hideAtMedia="'(max-width: 768px)'">
      </e-column>
      
      <e-column 
        field="OrderDate" 
        headerText="Date" 
        type="date"
        format="yMd"
        width="130"
        :hideAtMedia="'(max-width: 1024px)'">
      </e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const onColumnSelected = (args) => {
  console.log('Column visibility changed');
};
</script>
```

Automatically hides columns based on media queries:
- Keeps essential columns for mobile (Order ID, Customer)
- Shows detailed columns on tablets/desktops
- Smooth responsive behavior

### Variable Column Widths
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :enableAdaptiveUI="true">
    <e-columns>
      <!-- Wide on desktop, narrower on mobile -->
      <e-column 
        field="OrderID" 
        headerText="Order ID" 
        :width="isMobile ? '50px' : '100px'">
      </e-column>
      
      <e-column 
        field="CustomerID" 
        headerText="Customer" 
        :width="isMobile ? '80px' : '120px'">
      </e-column>
      
      <e-column 
        field="Freight" 
        headerText="Freight" 
        type="number"
        format="C2"
        :width="isMobile ? '70px' : '100px'">
      </e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isMobile = ref(false);

onMounted(() => {
  const checkWidth = () => {
    isMobile.value = window.innerWidth < 768;
  };
  
  checkWidth();
  window.addEventListener('resize', checkWidth);
});
</script>
```

## Adaptive Detail Templates

### Custom Detail Template for Adaptive Mode
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :enableAdaptiveUI="true"
    :rowRenderingMode="'Details'"
    :detailTemplate="detailTemplate">
    <e-columns>
      <e-column type="expand" width="50"></e-column>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
    </e-columns>
    
    <template v-slot:detailTemplate="{ data }">
      <div class="adaptive-detail">
        <div class="detail-section">
          <h5>Order #{{ data.OrderID }}</h5>
          <p>Customer: <strong>{{ data.CustomerID }}</strong></p>
          <p>Amount: <strong>${{ data.Freight }}</strong></p>
        </div>
        
        <div class="detail-section">
          <h6>Shipping Details</h6>
          <p>{{ data.ShipAddress }}</p>
          <p>{{ data.ShipCity }}, {{ data.ShipCountry }}</p>
        </div>
        
        <div class="detail-actions">
          <button @click="viewDetails(data)">View Details</button>
          <button @click="editOrder(data)">Edit</button>
        </div>
      </div>
    </template>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const viewDetails = (order) => {
  console.log('View details for:', order.OrderID);
};

const editOrder = (order) => {
  console.log('Edit order:', order.OrderID);
};
</script>

<style scoped>
.adaptive-detail {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
}

.detail-section {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}

.detail-section h5 {
  margin: 0 0 10px 0;
  color: #333;
}

.detail-section p {
  margin: 5px 0;
  color: #666;
}

.detail-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.detail-actions button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #007bff;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.detail-actions button:hover {
  background: #0056b3;
}
</style>
```

### Responsive Detail Card Layout
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :enableAdaptiveUI="true"
    :rowRenderingMode="'Details'">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
      <e-column field="OrderDate" headerText="Date" type="date" format="yMd" width="130"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<style scoped>
/* Adaptive detail row card styling */
:deep(.e-adaptive-detail-row) {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

:deep(.e-adaptive-detail-row .e-adaptive-field-label) {
  font-weight: 600;
  color: #333;
  min-width: 120px;
}

:deep(.e-adaptive-detail-row .e-adaptive-field-value) {
  color: #666;
}

/* Enhanced spacing for mobile */
@media (max-width: 768px) {
  :deep(.e-adaptive-detail-row) {
    padding: 20px 15px;
  }
  
  :deep(.e-adaptive-detail-row .e-adaptive-field) {
    margin-bottom: 12px;
  }
}
</style>
```

### Combining Adaptive with Toolbar
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :enableAdaptiveUI="true"
    :rowRenderingMode="'Details'"
    :toolbar="toolbar"
    :toolbarClick="onToolbarClick">
    <e-columns>
      <e-column type="checkbox" width="50"></e-column>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const toolbar = ref(['Add', 'Edit', 'Delete', 'Search']);

const onToolbarClick = (args) => {
  console.log('Toolbar action:', args.item.text);
};
</script>
```

Toolbar items adapt to mobile display with compact layout.

