# Common Use Cases and Patterns

Real-world implementation patterns for barcode generation in Vue applications.

## Use Case 1: Product Label Generation

Generate printable product labels with barcodes for retail items.

### Basic Product Label

```vue
<template>
  <div class="label-system">
    <h2>Product Label Generator</h2>

    <div class="input-form">
      <div class="form-group">
        <label>Product Name:</label>
        <input v-model="product.name" placeholder="e.g., Premium Widget" />
      </div>

      <div class="form-group">
        <label>SKU:</label>
        <input v-model="product.sku" placeholder="e.g., SKU-2024-001" />
      </div>

      <div class="form-group">
        <label>Price:</label>
        <input v-model="product.price" type="number" placeholder="0.00" />
      </div>

      <button @click="generateLabel">Generate Label</button>
    </div>

    <div class="label-preview">
      <div class="label">
        <h3>{{ product.name }}</h3>

        <!-- ✅ Barcode value must be a string -->
        <ejs-barcodegenerator
          type="Code128"
          :value="product.sku"
          width="200px"
          height="150px"
          mode="SVG"
        ></ejs-barcodegenerator>

        <p class="sku">{{ product.sku }}</p>
        <p class="price">${{ formattedPrice }}</p>
        <p class="date">{{ currentDate }}</p>
      </div>

      <button @click="printLabel" class="print-btn">Print Label</button>
    </div>
  </div>
</template>

<script>
import { BarcodeGeneratorComponent } from '@syncfusion/ej2-vue-barcode-generator';

export default {
  name: 'App',
  components: {
    'ejs-barcodegenerator': BarcodeGeneratorComponent,
  },

  data() {
    return {
      product: {
        name: 'Premium Widget',
        sku: 'SKU-2024-001',
        price: '29.99',
      },
      currentDate: new Date().toLocaleDateString(),
    };
  },

  computed: {
    formattedPrice() {
      return parseFloat(this.product.price).toFixed(2);
    },
  },

  methods: {
    generateLabel() {
      console.log('Label generated for:', this.product);
    },
    printLabel() {
      window.print();
    },
  },
};
</script>

<style scoped>
/* your styles unchanged */
.label {
  width: 4in;
  height: 3in;
  padding: 0.25in;
  border: 1px solid #333;
  text-align: center;
  background: white;
  font-family: Arial, sans-serif;
}

.label h3 {
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: bold;
}

.sku {
  font-family: monospace;
  font-size: 11px;
  margin: 5px 0;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin: 5px 0;
}

.date {
  font-size: 10px;
  color: #666;
  margin: 5px 0 0 0;
}

@media print {
  body {
    margin: 0;
    padding: 0;
  }
  .input-form,
  .print-btn,
  button:not(.label) {
    display: none;
  }
  .label-preview {
    margin: 0;
    padding: 0;
  }
}
</style>

<script>
import { BarcodeGeneratorComponent } from '@syncfusion/ej2-vue-barcode-generator';

export default {
  name: 'App',

  components: {
    'ejs-barcodegenerator': BarcodeGeneratorComponent,
  },

  data() {
    return {
      product: {
        name: 'Premium Widget',
        sku: 'SKU-2024-001',
        price: '29.99',
      },
      currentDate: new Date().toLocaleDateString(),
    };
  },

  computed: {
    formattedPrice() {
      return parseFloat(this.product.price || 0).toFixed(2);
    },
  },

  methods: {
    generateLabel() {
      console.log('Label generated for:', this.product);
    },
    printLabel() {
      window.print();
    },
  },
};
</script>

```

## Use Case 2: QR Code for URL Sharing

Create QR codes for easy URL sharing and tracking.

### Dynamic QR Code Generator

```vue
<template>
  <div class="qr-sharing-system">
    <h2>Share via QR Code</h2>

    <div class="url-input">
      <input
        v-model="shareUrl"
        placeholder="https://example.com"
        @input="updateQR"
      />
      <div class="url-options">
        <button
          v-for="preset in presets"
          :key="preset.id"
          @click="selectPreset(preset)"
        >
          {{ preset.name }}
        </button>
      </div>
    </div>

    <div class="qr-display">
      <ejs-qrcodegenerator
        ref="qrRef"
        :value="shareUrl || 'https://example.com'"
        width="300px"
        height="300px"
        mode="SVG"
      ></ejs-qrcodegenerator>
    </div>

    <div class="qr-actions">
      <button @click="downloadQR">Download QR Code</button>
      <button @click="copyShareUrl">Copy URL</button>
      <p v-if="feedback" class="feedback">{{ feedback }}</p>
    </div>

    <div class="usage-stats">
      <p>QR Code scans tracked via: {{ shareUrl }}</p>
    </div>
  </div>
</template>

<script>
import { QRCodeGeneratorComponent } from '@syncfusion/ej2-vue-barcode-generator';

export default {
  name: 'QRShare',

  components: {
    // ✅ EXACT pattern from your previous working sample
    'ejs-qrcodegenerator': QRCodeGeneratorComponent,
  },

  data() {
    return {
      shareUrl: 'https://www.example.com/product',
      feedback: '',
      presets: [
        { id: 1, name: 'Product Page', url: 'https://www.example.com/product' },
        { id: 2, name: 'Support', url: 'https://www.example.com/support' },
        { id: 3, name: 'Download App', url: 'https://www.example.com/app' },
      ],
    };
  },

  methods: {
    updateQR() {
      console.log('QR updated:', this.shareUrl);
    },

    selectPreset(preset) {
      this.shareUrl = preset.url;
    },

    downloadQR() {
      const instance = this.$refs.qrRef;

      if (instance && instance.exportImage) {
        instance.exportImage('qrcode', 'PNG');
        this.feedback = 'QR code downloaded!';
        setTimeout(() => (this.feedback = ''), 2000);
      } else {
        console.error('QR Instance missing', instance);
        this.feedback = 'QR instance not ready';
      }
    },

    async copyShareUrl() {
      try {
        await navigator.clipboard.writeText(this.shareUrl);
        this.feedback = 'URL copied to clipboard!';
        setTimeout(() => (this.feedback = ''), 2000);
      } catch (err) {
        console.error('Clipboard blocked:', err);
        this.feedback = 'Clipboard blocked by browser';
      }
    },
  },
};
</script>

<style scoped>
.url-input input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.url-options {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.url-options button {
  padding: 6px 12px;
  background: #e7e7e7;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.url-options button:hover {
  background: #d0d0d0;
}

.qr-display {
  text-align: center;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 20px;
}

.qr-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.qr-actions button {
  flex: 1;
  padding: 10px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.feedback {
  color: #107c10;
  margin: 0;
  padding: 10px;
  background: #dff6dd;
  border-radius: 4px;
}
</style>

```

## Use Case 3: Inventory Tracking System

Track inventory with barcodes and Data Matrix codes.

### Inventory System Interface

```vue
<template>
  <div class="inventory-system">
    <h2>Inventory Management</h2>

    <div class="controls">
      <input
        v-model="searchQuery"
        placeholder="Search items..."
        @input="filterInventory"
      />

      <select v-model="barcodeType">
        <option value="Code128">Code128</option>
        <option value="DataMatrix">Data Matrix</option>
      </select>
    </div>

    <div class="inventory-list">
      <div
        v-for="item in filteredInventory"
        :key="item.id"
        class="inventory-item"
      >
        <div class="item-info">
          <h3>{{ item.name }}</h3>
          <p>Stock: {{ item.quantity }}</p>
          <p>Location: {{ item.location }}</p>
        </div>

        <div class="item-barcode">
          <ejs-barcodegenerator
            v-if="barcodeType === 'Code128'"
            :type="barcodeType"
            :value="item.sku"
            width="150px"
            height="100px"
            :ref="'barcode-' + item.id"
          />

          <ejs-datamatrixgenerator
            v-else
            :value="item.sku"
            width="120px"
            height="120px"
            :ref="'barcode-' + item.id"
          />
        </div>

        <div class="item-actions">
          <button @click="printBarcode(item)">Print</button>
          <button @click="updateStock(item)">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BarcodeGeneratorComponent,
  DataMatrixGeneratorComponent,
} from '@syncfusion/ej2-vue-barcode-generator';

export default {
  name: 'InventorySample',

  components: {
    'ejs-barcodegenerator': BarcodeGeneratorComponent,
    'ejs-datamatrixgenerator': DataMatrixGeneratorComponent,
  },

  data() {
    return {
      searchQuery: '',
      barcodeType: 'Code128',

      inventory: [
        {
          id: 1,
          name: 'Widget A',
          sku: 'SKU-001',
          quantity: 50,
          location: 'A1',
        },
        {
          id: 2,
          name: 'Widget B',
          sku: 'SKU-002',
          quantity: 30,
          location: 'A2',
        },
        {
          id: 3,
          name: 'Widget C',
          sku: 'SKU-003',
          quantity: 75,
          location: 'B1',
        },
        {
          id: 4,
          name: 'Widget D',
          sku: 'SKU-004',
          quantity: 20,
          location: 'B2',
        },
      ],
    };
  },

  computed: {
    filteredInventory() {
      if (!this.searchQuery) return this.inventory;
      return this.inventory.filter((item) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },

  methods: {
    filterInventory() {
      console.log('Filtered:', this.searchQuery);
    },

    printBarcode(item) {
      // Find the Vue ref for this specific barcode
      const refName = 'barcode-' + item.id;
      const barcodeEl =
        this.$refs[refName]?.[0]?.$el || this.$refs[refName]?.$el;

      if (!barcodeEl) {
        console.error('Barcode not found for:', item);
        return;
      }

      // Open temporary print window
      const printWindow = window.open('', '_blank', 'width=400,height=400');

      // Write barcode SVG only
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Barcode</title>
            <style>
              body { text-align:center; margin:0; padding:20px; }
            </style>
          </head>
          <body>
            ${barcodeEl.outerHTML}
          </body>
        </html>
      `);

      printWindow.document.close();

      // Delay ensures SVG renders before printing
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    },

    updateStock(item) {
      console.log('Updating stock for:', item.name);
    },
  },
};
</script>

<style scoped>
.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.controls input,
.controls select {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.inventory-list {
  display: grid;
  gap: 15px;
}

.inventory-item {
  display: grid;
  grid-template-columns: 1fr 180px 150px;
  gap: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  align-items: center;
}

.item-info h3 {
  margin: 0 0 10px;
}

.item-info p {
  margin: 5px 0;
  font-size: 14px;
  color: #666;
}

.item-barcode {
  text-align: center;
}

.item-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.item-actions button {
  padding: 8px 12px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
</style>

```

## Use Case 4: Event Registration QR Codes

Generate QR codes for event registration and ticketing.

### Event Registration System

```vue
<template>
  <div class="event-registration">
    <h2>Event Registration</h2>

    <div class="event-form">
      <div class="form-group">
        <label>Event Name:</label>
        <input v-model="event.name" />
      </div>

      <div class="form-group">
        <label>Attendee Name:</label>
        <input v-model="attendee.name" />
      </div>

      <div class="form-group">
        <label>Email:</label>
        <input v-model="attendee.email" type="email" />
      </div>

      <button @click="generateTicket">Generate Ticket</button>
    </div>

    <div v-if="generatedTicket" ref="ticketRef" class="ticket">
      <div class="ticket-header">
        <h2>{{ event.name }}</h2>
        <p class="event-date">{{ event.date }}</p>
      </div>

      <div class="ticket-content">
        <h3>{{ attendee.name }}</h3>

        <div class="qr-section">
          <ejs-qrcodegenerator
            :value="ticketQRData"
            width="200px"
            height="200px"
            mode="SVG"
          ></ejs-qrcodegenerator>
        </div>

        <p class="ticket-number">TICKET #{{ ticketNumber }}</p>
        <p class="seat">Seat: TBA</p>
      </div>
    </div>

    <button v-if="generatedTicket" @click="downloadTicket">
      Download Ticket
    </button>
  </div>
</template>

<script>
import { QRCodeGeneratorComponent } from '@syncfusion/ej2-vue-barcode-generator';

export default {
  name: 'EventTicket',

  components: {
    'ejs-qrcodegenerator': QRCodeGeneratorComponent,
  },

  data() {
    return {
      event: {
        name: 'Tech Conference 2024',
        date: 'March 25, 2024',
      },
      attendee: {
        name: '',
        email: '',
      },
      generatedTicket: false,
      ticketNumber: '',
      ticketQRData: '',
    };
  },

  methods: {
    generateTicket() {
      this.ticketNumber = Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase();

      this.ticketQRData = `TICKET:${this.ticketNumber}:${this.attendee.email}`;
      this.generatedTicket = true;
    },

    downloadTicket() {
      const ticketEl = this.$refs.ticketRef;

      if (!ticketEl) return;

      const printWindow = window.open('', '_blank', 'width=500,height=800');

      printWindow.document.write(`
      <html>
        <head>
          <title>Event Ticket</title>
          <style>
            body { margin:0; padding:20px; text-align:center; }
          </style>
        </head>
        <body>
          ${ticketEl.outerHTML}
        </body>
      </html>
    `);

      printWindow.document.close();

      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    },
  },
};
</script>

<style scoped>
.ticket {
  width: 4in;
  height: 6in;
  border: 2px dashed #0078d4;
  padding: 0.5in;
  margin-top: 30px;
  background: linear-gradient(to bottom, #f0f8ff, #ffffff);
  text-align: center;
}

.ticket-header h2 {
  margin: 0 0 5px 0;
  color: #0078d4;
}

.event-date {
  font-size: 12px;
  color: #666;
  margin: 0 0 15px 0;
}

.qr-section {
  margin: 15px 0;
}

.ticket-number {
  font-family: monospace;
  font-weight: bold;
  margin: 10px 0;
}

.seat {
  font-size: 12px;
  margin: 10px 0 15px 0;
}

.event-form {
  display: grid;
  gap: 10px;
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
}
</style>

```

## Performance Optimization Tips

### Lazy Load Barcodes

```vue
<template>
  <div class="barcode-list">
    <div v-for="item in visibleItems" :key="item.id" class="barcode-item">
      <ejs-barcodegenerator
        :type="barcodeType"
        :value="item.barcode"
        width="150px"
        height="100px"
      ></ejs-barcodegenerator>
    </div>

    <button v-if="canLoadMore" @click="loadMore" class="load-more">
      Load More
    </button>
  </div>
</template>

<script>
import { BarcodeGeneratorComponent } from '@syncfusion/ej2-vue-barcode-generator';

export default {
  name: 'BarcodeList',

  components: {
    'ejs-barcodegenerator': BarcodeGeneratorComponent,
  },

  data() {
    return {
      barcodeType: 'Code128',

      allItems: Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        barcode: `BARCODE-${i}`,
      })),

      ITEMS_PER_PAGE: 50,
      currentPage: 0,
    };
  },

  computed: {
    visibleItems() {
      const count = (this.currentPage + 1) * this.ITEMS_PER_PAGE;
      return this.allItems.slice(0, count);
    },

    canLoadMore() {
      return this.visibleItems.length < this.allItems.length;
    },
  },

  methods: {
    loadMore() {
      if (this.canLoadMore) {
        this.currentPage++;
      }
    },
  },
};
</script>

<style scoped>
.barcode-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}

.barcode-item {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  text-align: center;
  background: white;
}

.load-more {
  margin-top: 20px;
  padding: 12px 18px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: block;
  width: 100%;
}
</style>

```

### Batch Generation

```javascript
    methods: {
    loadMore() {
      if (this.canLoadMore) {
        this.currentPage++;
      }
    },

    // ✅ Batch generation function (your requirement)
    async generateInBatches(items, batchSize = 20) {
      const results = [];

      for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);

        const batchResult = batch.map((item) => ({
          ...item,
          barcode: `BARCODE-${item.id}`, // your generator logic
        }));

        results.push(...batchResult);

        // allow UI to breathe
        await new Promise((resolve) => setTimeout(resolve, 10));
      }

      return results;
    },
  },

  async mounted() {
    // ✅ auto-generate all 1000 barcodes in batches
    const processed = await this.generateInBatches(this.allItems, 20);
    this.allItems = processed;
  },
```

## Best Practices Summary

1. **Choose Right Component:** BarcodeGenerator (1D), QRCodeGenerator (URLs), DataMatrixGenerator (industrial)
2. **Optimize Performance:** Use Canvas for real-time, SVG for print
3. **Size Appropriately:** Minimum 100px, 200px recommended
4. **Test Scanability:** Verify with actual scanners
5. **Error Handling:** Validate input before generating
6. **User Feedback:** Show success/error messages
7. **Export Options:** Provide multiple formats (PNG, JPG)
8. **Accessibility:** Include alt text and labels
