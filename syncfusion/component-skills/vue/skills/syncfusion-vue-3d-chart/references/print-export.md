# Print and Export

## Print Chart

### Basic Print

```vue
<template>
  <div>
    <button @click="printChart">Print Chart</button>
    
    <ejs-chart3d ref="chart" id="chart">
      <e-chart3d-series-collection>
        <e-chart3d-series 
          :dataSource="data" 
          type="Column" 
          xName="month" 
          yName="sales">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  </div>
</template>

<script>
export default {
  methods: {
    printChart() {
      this.$refs.chart.print();
    }
  }
};
</script>
```

### Print with Options

```vue
<script>
export default {
  methods: {
    printChart() {
      const options = {
        type: 'SVG',              // SVG or Canvas
        orientation: 'Portrait'    // Portrait or Landscape
      };
      this.$refs.chart.print(options);
    }
  }
};
</script>
```

---

## Export to Image

### Export as PNG

```vue
<template>
  <button @click="exportPNG">Export as PNG</button>
  <ejs-chart3d ref="chart" id="chart">
    <!-- series -->
  </ejs-chart3d>
</template>

<script>
export default {
  methods: {
    exportPNG() {
      this.$refs.chart.export('PNG', 'chart.png');
    }
  }
};
</script>
```

### Export as JPEG

```vue
<script>
export default {
  methods: {
    exportJPEG() {
      this.$refs.chart.export('JPEG', 'chart.jpg');
    }
  }
};
</script>
```

### Export as SVG

```vue
<script>
export default {
  methods: {
    exportSVG() {
      this.$refs.chart.export('SVG', 'chart.svg');
    }
  }
};
</script>
```

### Custom Export Options

```vue
<script>
export default {
  methods: {
    exportWithOptions() {
      const options = {
        type: 'PNG',
        fileName: 'my-chart.png',
        orientation: 'Portrait'
      };
      this.$refs.chart.export(options.type, options.fileName);
    }
  }
};
</script>
```

---

## Export to PDF

### Basic PDF Export

```vue
<template>
  <button @click="exportPDF">Export as PDF</button>
  <ejs-chart3d ref="chart" id="chart">
    <!-- series -->
  </ejs-chart3d>
</template>

<script>
export default {
  methods: {
    exportPDF() {
      this.$refs.chart.export('PDF', 'chart.pdf');
    }
  }
};
</script>
```

### PDF with Custom Options

```vue
<script>
export default {
  methods: {
    exportPDFAdvanced() {
      this.$refs.chart.export('PDF', 'chart.pdf', 'Portrait', this.$refs.chart);
    }
  }
};
</script>
```

### Multiple Charts in PDF

```vue
<template>
  <button @click="exportMultiplePDF">Export Multiple as PDF</button>
  
  <ejs-chart3d ref="chart1" id="chart1">
    <!-- series -->
  </ejs-chart3d>
  
  <ejs-chart3d ref="chart2" id="chart2">
    <!-- series -->
  </ejs-chart3d>
</template>

<script>
export default {
  methods: {
    exportMultiplePDF() {
      // Export first chart
      this.$refs.chart1.export('PDF', 'charts.pdf', 'Portrait');
    }
  }
};
</script>
```

---

## Export Menu

### Dropdown Export Options

```vue
<template>
  <div>
    <select @change="handleExport" v-model="exportFormat">
      <option value="">Select Export Format</option>
      <option value="PNG">PNG Image</option>
      <option value="JPEG">JPEG Image</option>
      <option value="SVG">SVG Vector</option>
      <option value="PDF">PDF Document</option>
    </select>
    
    <ejs-chart3d ref="chart" id="chart">
      <!-- series -->
    </ejs-chart3d>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exportFormat: ''
    };
  },
  methods: {
    handleExport() {
      if (!this.exportFormat) return;
      
      const fileName = `chart.${this.exportFormat.toLowerCase()}`;
      this.$refs.chart.export(this.exportFormat, fileName);
      
      this.exportFormat = '';
    }
  }
};
</script>
```

### Export Button Group

```vue
<template>
  <div class="export-buttons">
    <button @click="exportPNG" class="btn-export">📷 PNG</button>
    <button @click="exportJPEG" class="btn-export">🖼️ JPEG</button>
    <button @click="exportSVG" class="btn-export">📊 SVG</button>
    <button @click="exportPDF" class="btn-export">📄 PDF</button>
    <button @click="printChart" class="btn-export">🖨️ Print</button>
  </div>
  
  <ejs-chart3d ref="chart" id="chart">
    <!-- series -->
  </ejs-chart3d>
</template>

<script>
export default {
  methods: {
    exportPNG() {
      this.$refs.chart.export('PNG', 'chart.png');
    },
    exportJPEG() {
      this.$refs.chart.export('JPEG', 'chart.jpg');
    },
    exportSVG() {
      this.$refs.chart.export('SVG', 'chart.svg');
    },
    exportPDF() {
      this.$refs.chart.export('PDF', 'chart.pdf');
    },
    printChart() {
      this.$refs.chart.print();
    }
  }
};
</script>

<style scoped>
.export-buttons {
  margin: 10px 0;
}

.btn-export {
  margin-right: 5px;
  padding: 8px 15px;
  background-color: #4472C4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-export:hover {
  background-color: #2E5090;
}
</style>
```

---

## Export Programmatically

### Auto-Export on Data Update

```vue
<template>
  <button @click="updateAndExport">Update Data & Export</button>
  <ejs-chart3d ref="chart" id="chart">
    <!-- series -->
  </ejs-chart3d>
</template>

<script>
export default {
  methods: {
    updateAndExport() {
      // Update chart data
      this.data.push({ month: 'Jul', sales: 42 });
      
      // Wait for Vue to update
      this.$nextTick(() => {
        this.$refs.chart.export('PNG', `chart-${Date.now()}.png`);
      });
    }
  }
};
</script>
```

### Scheduled Export

```vue
<script>
export default {
  mounted() {
    // Auto-export every hour
    setInterval(() => {
      this.$refs.chart.export('PNG', `chart-${new Date().toISOString()}.png`);
      console.log('Chart exported');
    }, 3600000); // 1 hour
  }
};
</script>
```

---

## Export Format Comparison

| Format | Best For | Characteristics |
|--------|----------|-----------------|
| **PNG** | Web, email, general use | Lossless compression, supports transparency |
| **JPEG** | Photography, smaller files | Lossy compression, smaller file size |
| **SVG** | Vector editing, scalability | Infinite scaling, editable with vector tools |
| **PDF** | Printing, archiving, sharing | Preserves formatting, professional look |

---

## Troubleshooting Export Issues

### Chart Not Exporting

Ensure the chart is fully rendered:

```vue
<script>
export default {
  methods: {
    exportSafely() {
      // Wait for chart to render
      setTimeout(() => {
        this.$refs.chart.export('PNG', 'chart.png');
      }, 1000);
    }
  }
};
</script>
```

### Large File Sizes

For JPEG, file size is smaller:

```vue
<script>
export default {
  methods: {
    exportCompressed() {
      // Use JPEG for smaller files
      this.$refs.chart.export('JPEG', 'chart-compressed.jpg');
    }
  }
};
</script>
```

### Export Dimensions

Control export size:

```vue
<script>
export default {
  methods: {
    exportHighResolution() {
      // Chart exports at actual rendered dimensions
      this.$refs.chart.export('PNG', 'chart-hires.png');
    }
  }
};
</script>
```

---

## Complete Example: Dashboard with Export

```vue
<template>
  <div class="dashboard">
    <div class="toolbar">
      <h2>Sales Dashboard</h2>
      <div class="export-menu">
        <button @click="exportPNG" title="Export as PNG">📷</button>
        <button @click="exportPDF" title="Export as PDF">📄</button>
        <button @click="printChart" title="Print">🖨️</button>
      </div>
    </div>
    
    <ejs-chart3d 
      ref="chart"
      id="chart"
      :tooltip="tooltip"
      :legend="legend">
      <e-chart3d-series-collection>
        <e-chart3d-series 
          :dataSource="chartData" 
          type="Column" 
          xName="month" 
          yName="sales"
          name="Sales">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tooltip: { enable: true },
      legend: { visible: true },
      chartData: [
        { month: 'Jan', sales: 25000 },
        { month: 'Feb', sales: 28000 },
        { month: 'Mar', sales: 32000 },
        { month: 'Apr', sales: 35000 },
        { month: 'May', sales: 38000 }
      ]
    };
  },
  methods: {
    exportPNG() {
      this.$refs.chart.export('PNG', `sales-dashboard-${Date.now()}.png`);
    },
    exportPDF() {
      this.$refs.chart.export('PDF', 'sales-dashboard.pdf');
    },
    printChart() {
      this.$refs.chart.print();
    }
  }
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.export-menu {
  display: flex;
  gap: 10px;
}

.export-menu button {
  padding: 8px 12px;
  background-color: #4472C4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
}

.export-menu button:hover {
  background-color: #2E5090;
}

#chart {
  width: 100%;
  height: 500px;
}
</style>
```
