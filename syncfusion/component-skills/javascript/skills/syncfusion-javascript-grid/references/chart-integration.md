---
name: chart-integration
description: 'Chart integration in Syncfusion Grid: embed charts, data synchronization, interactive visualizations.'
---

# Chart Integration

## Table of Contents
- [Overview](#overview)
- [Basic Chart in Grid](#basic-chart-in-grid)
- [Detail Row Charts](#detail-row-charts)
- [Data Synchronization](#data-synchronization)
- [Interactive Charts](#interactive-charts)
- [Advanced Examples](#advanced-examples)

## When to Use This Reference

- Embed interactive charts within grid rows or detail views
- Visualize grid data trends and distributions
- Create master-detail charts linked to grid selection
- Display dynamic charts updated with grid data changes
- Combine tabular and visual data representations

## Overview

Integrate Syncfusion Charts with Grid for advanced data visualization. Charts can be displayed in detail templates, custom columns, or alongside grids.

### Use Cases
- Display trend charts per group
- Show KPI charts in detail rows
- Aggregate data visualization
- Multi-view analysis (grid + chart)
- Real-time data dashboard

## Basic Chart in Grid

### Embed Chart in Detail Template

```ts
import { Grid, DetailRow, Page } from '@syncfusion/ej2-grids';
import { Chart, Series, SeriesDirective, SeriesCollectionDirective } from '@syncfusion/ej2-charts';

Grid.Inject(DetailRow, Page);

const data = [
  { 
    CategoryID: 1, 
    CategoryName: 'Electronics',
    Description: 'Electronic devices and gadgets',
    Sales: [100, 150, 200, 180, 220]  // 5-month sales
  },
  { 
    CategoryID: 2, 
    CategoryName: 'Stationery',
    Description: 'Office and school supplies',
    Sales: [80, 90, 110, 120, 140]
  }
];

const detailTemplate = `
  <div style="padding: 20px;">
    <h3>Sales Trend: \${CategoryName}</h3>
    <div id="chart-\${CategoryID}" style="height: 300px;"></div>
  </div>
`;

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'CategoryID', headerText: 'Category ID', width: 100 },
    { field: 'CategoryName', headerText: 'Category', width: 150 },
    { field: 'Description', headerText: 'Description', width: 200 }
  ],
  detailTemplate: detailTemplate,
  detailDataBound: (args: any) => {
    // Create chart when detail row is expanded
    createChartInDetailRow(args.data);
  }
});

grid.appendTo('#grid');

const createChartInDetailRow = (rowData: any) => {
  const chartData = rowData.Sales.map((sales, idx) => ({
    Month: ['January', 'February', 'March', 'April', 'May'][idx],
    Sales: sales
  }));

  const chart = new Chart({
    primaryXAxis: {
      valueType: 'Category',
      majorGridLines: { width: 0 }
    },
    primaryYAxis: {
      labelFormat: '${value}K',
      title: 'Sales Amount'
    },
    series: [
      {
        dataSource: chartData,
        xName: 'Month',
        yName: 'Sales',
        name: rowData.CategoryName,
        type: 'Line',
        marker: { visible: true, width: 10, height: 10 }
      }
    ],
    title: `Sales Trend - ${rowData.CategoryName}`,
    tooltip: { enable: true }
  });

  chart.appendTo(`#chart-${rowData.CategoryID}`);
};
```

## Detail Row Charts

### Multiple Charts in Detail

```ts
import { Grid, DetailRow, Page } from '@syncfusion/ej2-grids';
import { Chart, SeriesCollectionDirective, SeriesDirective } from '@syncfusion/ej2-charts';

Grid.Inject(DetailRow, Page);

const detailTemplate = `
  <div style="padding: 20px;">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
      <div>
        <h4>Sales by Region</h4>
        <div id="pieChart-\${OrderID}" style="height: 300px;"></div>
      </div>
      <div>
        <h4>Monthly Trend</h4>
        <div id="lineChart-\${OrderID}" style="height: 300px;"></div>
      </div>
    </div>
  </div>
`;

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer', width: 150 }
  ],
  detailTemplate: detailTemplate,
  detailDataBound: (args: any) => {
    createDetailCharts(args.data);
  }
});

grid.appendTo('#grid');

const createDetailCharts = (rowData: any) => {
  // Pie Chart - Sales by Region
  const regionData = [
    { Region: 'North', Sales: 35 },
    { Region: 'South', Sales: 28 },
    { Region: 'East', Sales: 22 },
    { Region: 'West', Sales: 15 }
  ];

  const pieChart = new Chart({
    series: [
      {
        dataSource: regionData,
        xName: 'Region',
        yName: 'Sales',
        type: 'Pie',
        dataLabel: { visible: true }
      }
    ],
    tooltip: { enable: true }
  });

  pieChart.appendTo(`#pieChart-${rowData.OrderID}`);

  // Line Chart - Monthly Trend
  const trendData = [
    { Month: 'Jan', Sales: 50 },
    { Month: 'Feb', Sales: 65 },
    { Month: 'Mar', Sales: 72 },
    { Month: 'Apr', Sales: 80 }
  ];

  const lineChart = new Chart({
    primaryXAxis: {
      valueType: 'Category'
    },
    series: [
      {
        dataSource: trendData,
        xName: 'Month',
        yName: 'Sales',
        type: 'Line',
        marker: { visible: true }
      }
    ],
    tooltip: { enable: true }
  });

  lineChart.appendTo(`#lineChart-${rowData.OrderID}`);
};
```

## Data Synchronization

### Grid and Chart Sync

```ts
import { Grid, Page, Sort, Filter, Selection } from '@syncfusion/ej2-grids';
import { Chart, SeriesCollectionDirective, SeriesDirective } from '@syncfusion/ej2-charts';

Grid.Inject(Page, Sort, Filter, Selection);

const orderData = [
  { Region: 'North', Sales: 100, Profit: 35 },
  { Region: 'South', Sales: 80, Profit: 28 },
  { Region: 'East', Sales: 120, Profit: 40 },
  { Region: 'West', Sales: 90, Profit: 30 }
];

// Create Grid
const grid = new Grid({
  dataSource: orderData,
  columns: [
    { field: 'Region', headerText: 'Region', width: 100 },
    { field: 'Sales', headerText: 'Sales', type: 'number', width: 100 },
    { field: 'Profit', headerText: 'Profit', type: 'number', width: 100 }
  ],
  allowSelection: true,
  selectionSettings: { type: 'Single', mode: 'Row' },
  rowSelected: (args: any) => {
    // Update chart when row is selected
    updateChartData(args.data);
  }
});

grid.appendTo('#grid');

// Create Chart
const chart = new Chart({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: orderData,
      xName: 'Region',
      yName: 'Sales',
      name: 'Sales',
      type: 'Column'
    },
    {
      dataSource: orderData,
      xName: 'Region',
      yName: 'Profit',
      name: 'Profit',
      type: 'Line'
    }
  ]
});

chart.appendTo('#chart');

// Sync function
const updateChartData = (selectedData: any) => {
  console.log('Selected region:', selectedData.Region);
  // Could highlight selected bar or redraw chart
  chart.series[0].marker = { visible: true };
  chart.refresh();
};

// Also sync reverse direction - click chart to select grid row
chart.pointRender = (args: any) => {
  const region = args.point.x;
  const rowData = orderData.find(d => d.Region === region);
  if (rowData) {
    const rowIndex = orderData.indexOf(rowData);
    grid.selectRow(rowIndex);
  }
};
```

## Interactive Charts

### Chart with Drill-Down

```ts
import { Chart, SeriesCollectionDirective, SeriesDirective } from '@syncfusion/ej2-charts';

const regionData = [
  { Region: 'North', Sales: 100 },
  { Region: 'South', Sales: 80 },
  { Region: 'East', Sales: 120 },
  { Region: 'West', Sales: 90 }
];

const detailedData = {
  'North': [
    { Product: 'Electronics', Sales: 40 },
    { Product: 'Stationery', Sales: 35 },
    { Product: 'Clothing', Sales: 25 }
  ],
  'South': [
    { Product: 'Electronics', Sales: 30 },
    { Product: 'Stationery', Sales: 30 },
    { Product: 'Clothing', Sales: 20 }
  ]
};

let currentView = 'region';  // 'region' or 'product'

const chart = new Chart({
  primaryXAxis: {
    valueType: 'Category',
    title: 'Region'
  },
  primaryYAxis: {
    title: 'Sales'
  },
  series: [
    {
      dataSource: regionData,
      xName: 'Region',
      yName: 'Sales',
      type: 'Column',
      name: 'Sales'
    }
  ],
  title: 'Sales by Region',
  tooltip: { enable: true },
  pointRender: (args: any) => {
    args.tooltip.content = `${args.point.x}: ${args.point.y}`;
  }
});

chart.appendTo('#chart');

// Click to drill down
chart.pointRender = (args: any) => {
  args.point.tooltip = `Click to see ${args.point.x} details`;
};

// Add drill-down functionality
document.getElementById('chart')?.addEventListener('click', (e: any) => {
  if (currentView === 'region') {
    const clickedRegion = 'North';  // Get from click event
    
    // Update chart with detailed data
    chart.series[0].dataSource = detailedData['North'];
    chart.primaryXAxis.title = 'Products in North';
    chart.title.text = 'Products in North Region';
    chart.refresh();
    
    currentView = 'product';
  } else {
    // Go back to region view
    chart.series[0].dataSource = regionData;
    chart.primaryXAxis.title = 'Region';
    chart.title.text = 'Sales by Region';
    chart.refresh();
    
    currentView = 'region';
  }
});
```

## Advanced Examples

### Dashboard with Grid and Multiple Charts

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';
import { Chart } from '@syncfusion/ej2-charts';

Grid.Inject(Page);

const dashboardData = [
  { Month: 'Jan', Sales: 100, Profit: 35, Units: 120 },
  { Month: 'Feb', Sales: 150, Profit: 45, Units: 150 },
  { Month: 'Mar', Sales: 120, Profit: 40, Units: 140 }
];

// Left Panel - Grid
const grid = new Grid({
  dataSource: dashboardData,
  columns: [
    { field: 'Month', headerText: 'Month', width: 100 },
    { field: 'Sales', headerText: 'Sales', type: 'number', width: 100 },
    { field: 'Profit', headerText: 'Profit', type: 'number', width: 100 },
    { field: 'Units', headerText: 'Units', type: 'number', width: 100 }
  ],
  allowPaging: false,
  height: '100%'
});

grid.appendTo('#gridPanel');

// Right Panel - Charts
const salesChart = new Chart({
  primaryXAxis: { valueType: 'Category' },
  series: [{
    dataSource: dashboardData,
    xName: 'Month',
    yName: 'Sales',
    type: 'Line',
    marker: { visible: true }
  }],
  title: 'Monthly Sales'
});

salesChart.appendTo('#salesChart');

const profitChart = new Chart({
  primaryXAxis: { valueType: 'Category' },
  series: [{
    dataSource: dashboardData,
    xName: 'Month',
    yName: 'Profit',
    type: 'Area'
  }],
  title: 'Monthly Profit'
});

profitChart.appendTo('#profitChart');

const unitsChart = new Chart({
  primaryXAxis: { valueType: 'Category' },
  series: [{
    dataSource: dashboardData,
    xName: 'Month',
    yName: 'Units',
    type: 'Column'
  }],
  title: 'Monthly Units'
});

unitsChart.appendTo('#unitsChart');
```

### Real-Time Updating Chart and Grid

```ts
import { Grid } from '@syncfusion/ej2-grids';
import { Chart } from '@syncfusion/ej2-charts';

let liveData = [
  { Time: '10:00', Value: 50 },
  { Time: '10:05', Value: 55 },
  { Time: '10:10', Value: 48 }
];

const grid = new Grid({
  dataSource: liveData,
  columns: [
    { field: 'Time', headerText: 'Time' },
    { field: 'Value', headerText: 'Value', type: 'number' }
  ]
});

grid.appendTo('#grid');

const chart = new Chart({
  series: [{
    dataSource: liveData,
    xName: 'Time',
    yName: 'Value',
    type: 'SplineArea'
  }]
});

chart.appendTo('#chart');

// Simulate real-time updates
setInterval(() => {
  const newTime = new Date().toLocaleTimeString();
  const newValue = Math.floor(Math.random() * 100);
  
  liveData.push({ Time: newTime, Value: newValue });
  
  // Keep only last 10 points
  if (liveData.length > 10) {
    liveData.shift();
  }
  
  grid.dataSource = liveData;
  grid.refresh();
  
  chart.series[0].dataSource = liveData;
  chart.refresh();
}, 5000);  // Update every 5 seconds
```
