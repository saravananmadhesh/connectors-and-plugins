# Use Cases and Patterns

## Table of Contents
- [File Manager](#file-manager)
- [Text Editor](#text-editor)
- [Data Grid Context Menu](#data-grid-context-menu)
- [Dashboard Analytics](#dashboard-analytics)
- [E-Commerce Product Actions](#e-commerce-product-actions)
- [Admin Panel](#admin-panel)

## File Manager

Complete file manager with context menu operations:

```vue
<script setup>
import { ref } from 'vue'

interface FileSystemItem {
  id: string
  name: string
  type: 'folder' | 'file'
  size: number
  modified: Date
  selected: boolean
}

const files = ref<FileSystemItem[]>([
  { id: '1', name: 'Documents', type: 'folder', size: 0, modified: new Date(), selected: false },
  { id: '2', name: 'report.pdf', type: 'file', size: 2400000, modified: new Date(), selected: false },
  { id: '3', name: 'images', type: 'folder', size: 0, modified: new Date(), selected: false },
  { id: '4', name: 'data.xlsx', type: 'file', size: 1200000, modified: new Date(), selected: false }
])

const selectedFile = ref<FileSystemItem | null>(null)
const clipboard = ref<FileSystemItem | null>(null)
const operation = ref<'copy' | 'cut' | null>(null)

const items = ref([
  { text: 'Open', id: 'open', iconCss: 'e-icons e-folder-open' },
  { separator: true },
  { text: 'Cut', id: 'cut', iconCss: 'e-icons e-cut' },
  { text: 'Copy', id: 'copy', iconCss: 'e-icons e-copy' },
  { text: 'Paste', id: 'paste', iconCss: 'e-icons e-paste' },
  { separator: true },
  { text: 'Rename', id: 'rename', iconCss: 'e-icons e-edit' },
  { text: 'Delete', id: 'delete', iconCss: 'e-icons e-delete' },
  { separator: true },
  { text: 'Properties', id: 'properties', iconCss: 'e-icons e-info' }
])

const selectFile = (file) => {
  selectedFile.value = file
}

const handleSelect = (args) => {
  if (!selectedFile.value) return

  switch (args.item.id) {
    case 'open':
      if (selectedFile.value.type === 'folder') {
        console.log(`Opening folder: ${selectedFile.value.name}`)
      } else {
        console.log(`Opening file: ${selectedFile.value.name}`)
      }
      break
    case 'cut':
      clipboard.value = selectedFile.value
      operation.value = 'cut'
      console.log(`Cut: ${selectedFile.value.name}`)
      break
    case 'copy':
      clipboard.value = selectedFile.value
      operation.value = 'copy'
      console.log(`Copy: ${selectedFile.value.name}`)
      break
    case 'paste':
      if (clipboard.value) {
        console.log(`Pasted: ${clipboard.value.name}`)
      }
      break
    case 'rename':
      console.log(`Rename: ${selectedFile.value.name}`)
      break
    case 'delete':
      files.value = files.value.filter(f => f.id !== selectedFile.value?.id)
      console.log(`Deleted: ${selectedFile.value.name}`)
      break
    case 'properties':
      console.log(`Properties: ${selectedFile.value.name}`)
      break
  }
}

const formatSize = (bytes) => {
  if (bytes === 0) return '—'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}
</script>

<template>
  <div class="file-manager">
    <div class="sidebar">
      <h3>Clipboard</h3>
      <div v-if="clipboard" class="clipboard-info">
        <p>{{ operation }}: {{ clipboard.name }}</p>
      </div>
      <div v-else class="clipboard-empty">Empty</div>
    </div>

    <div class="main-content">
      <h2>File Manager</h2>
      <div class="file-list">
        <div
          v-for="file in files"
          :key="file.id"
          class="file-item"
          :class="{ selected: selectedFile?.id === file.id }"
          @click="selectFile(file)"
          id="target"
        >
          <span class="icon">{{ file.type === 'folder' ? '📁' : '📄' }}</span>
          <div class="file-info">
            <p class="file-name">{{ file.name }}</p>
            <p class="file-meta">{{ formatSize(file.size) }} • {{ file.modified.toLocaleDateString() }}</p>
          </div>
        </div>
      </div>

      <ejs-contextmenu
        target="#target"
        :items="items"
        @select="handleSelect"
      ></ejs-contextmenu>
    </div>
  </div>
</template>

<style scoped>
.file-manager {
  display: flex;
  gap: 20px;
  height: 100vh;
  background-color: #f5f5f5;
}

.sidebar {
  width: 250px;
  background-color: white;
  padding: 20px;
  border-right: 1px solid #e0e0e0;
}

.sidebar h3 {
  margin-top: 0;
  font-size: 14px;
  text-transform: uppercase;
  color: #999;
}

.clipboard-info,
.clipboard-empty {
  padding: 10px;
  border-radius: 4px;
  font-size: 12px;
}

.clipboard-info {
  background-color: #e3f2fd;
  color: #1976d2;
}

.clipboard-empty {
  background-color: #f5f5f5;
  color: #999;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.file-list {
  background-color: white;
  border-radius: 4px;
  overflow-y: auto;
  max-height: calc(100vh - 100px);
}

.file-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: context-menu;
}

.file-item:hover {
  background-color: #f9f9f9;
}

.file-item.selected {
  background-color: #e3f2fd;
}

.icon {
  font-size: 24px;
  width: 32px;
  text-align: center;
}

.file-info {
  flex: 1;
}

.file-name {
  margin: 0;
  font-weight: 500;
}

.file-meta {
  margin: 4px 0 0 0;
  font-size: 12px;
  color: #999;
}
</style>
```

## Text Editor

Text editing with selection-based context menu:

```vue
<script setup>
import { ref } from 'vue'

const editorContent = ref('Select text to see context menu...')
const selectedText = ref('')

const items = ref([
  { text: 'Cut', id: 'cut', iconCss: 'e-icons e-cut' },
  { text: 'Copy', id: 'copy', iconCss: 'e-icons e-copy' },
  { text: 'Paste', id: 'paste', iconCss: 'e-icons e-paste' },
  { separator: true },
  { text: 'Bold', id: 'bold', iconCss: 'e-icons e-bold' },
  { text: 'Italic', id: 'italic', iconCss: 'e-icons e-italic' },
  { text: 'Underline', id: 'underline', iconCss: 'e-icons e-underline' },
  { separator: true },
  { text: 'Select All', id: 'selectall', iconCss: 'e-icons e-select-all' }
])

const handleSelect = (args) => {
  const selection = window.getSelection()
  const selectedText = selection?.toString() || ''

  switch (args.item.id) {
    case 'cut':
      document.execCommand('cut')
      break
    case 'copy':
      document.execCommand('copy')
      break
    case 'paste':
      document.execCommand('paste')
      break
    case 'bold':
      document.execCommand('bold')
      break
    case 'italic':
      document.execCommand('italic')
      break
    case 'underline':
      document.execCommand('underline')
      break
    case 'selectall':
      document.execCommand('selectAll')
      break
  }
}

const updateSelectedText = () => {
  const selection = window.getSelection()
  selectedText.value = selection?.toString() || ''
}
</script>

<template>
  <div class="text-editor">
    <div class="toolbar">
      <h2>Text Editor</h2>
      <p v-if="selectedText" class="selected-text">
        Selected: "{{ selectedText }}"
      </p>
    </div>

    <div
      id="target"
      class="editor-area"
      contenteditable="true"
      @mouseup="updateSelectedText"
      @keyup="updateSelectedText"
    >
      {{ editorContent }}
    </div>

    <ejs-contextmenu
      target="#target"
      :items="items"
      @select="handleSelect"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.text-editor {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.toolbar {
  padding: 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.toolbar h2 {
  margin: 0 0 10px 0;
}

.selected-text {
  font-size: 12px;
  color: #666;
  margin: 0;
}

.editor-area {
  flex: 1;
  padding: 20px;
  background-color: white;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  outline: none;
  overflow-y: auto;
}

.editor-area:focus {
  outline: none;
}
</style>
```

## Data Grid Context Menu

Context menu for grid operations:

```vue
<script setup>
import { ref } from 'vue'

interface GridRow {
  id: number
  name: string
  email: string
  department: string
  salary: number
}

const data = ref<GridRow[]>([
  { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Engineering', salary: 80000 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Marketing', salary: 70000 },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', department: 'Sales', salary: 75000 }
])

const selectedRow = ref<GridRow | null>(null)
const deletedRows = ref<number[]>([])

const items = ref([
  { text: 'View Details', id: 'view', iconCss: 'e-icons e-folder-open' },
  { text: 'Edit', id: 'edit', iconCss: 'e-icons e-edit' },
  { separator: true },
  { text: 'Duplicate', id: 'duplicate', iconCss: 'e-icons e-copy' },
  { text: 'Delete', id: 'delete', iconCss: 'e-icons e-delete' },
  { separator: true },
  { text: 'Export', id: 'export', iconCss: 'e-icons e-download' }
])

const selectRow = (row) => {
  selectedRow.value = row
}

const handleSelect = (args) => {
  if (!selectedRow.value) return

  switch (args.item.id) {
    case 'view':
      console.log('View details:', selectedRow.value)
      break
    case 'edit':
      console.log('Edit:', selectedRow.value.name)
      break
    case 'duplicate':
      const newRow = { ...selectedRow.value, id: Math.max(...data.value.map(r => r.id)) + 1 }
      data.value.push(newRow)
      break
    case 'delete':
      deletedRows.value.push(selectedRow.value.id)
      data.value = data.value.filter(r => r.id !== selectedRow.value?.id)
      break
    case 'export':
      console.log('Export:', selectedRow.value.name)
      break
  }
}

const undo = () => {
  if (deletedRows.value.length > 0) {
    const id = deletedRows.value.pop()
    const originalData = [
      { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Engineering', salary: 80000 },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Marketing', salary: 70000 },
      { id: 3, name: 'Bob Wilson', email: 'bob@example.com', department: 'Sales', salary: 75000 }
    ]
    const restored = originalData.find(r => r.id === id)
    if (restored) data.value.push(restored)
  }
}
</script>

<template>
  <div class="grid-container">
    <div class="toolbar">
      <h2>Employee Directory</h2>
      <button v-if="deletedRows.length > 0" @click="undo">
        Undo Delete ({{ deletedRows.length }})
      </button>
    </div>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in data"
            :key="row.id"
            class="data-row"
            :class="{ selected: selectedRow?.id === row.id }"
            @click="selectRow(row)"
            id="target"
          >
            <td>{{ row.name }}</td>
            <td>{{ row.email }}</td>
            <td>{{ row.department }}</td>
            <td>{{ row.salary }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <ejs-contextmenu
      target="#target"
      :items="items"
      @select="handleSelect"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.grid-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
}

.table-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

table {
  width: 100%;
  background-color: white;
  border-collapse: collapse;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

thead {
  background-color: #f5f5f5;
}

th {
  padding: 12px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #e0e0e0;
}

td {
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.data-row {
  cursor: context-menu;
}

.data-row:hover {
  background-color: #f9f9f9;
}

.data-row.selected {
  background-color: #e3f2fd;
}

button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f5f5f5;
  cursor: pointer;
}
</style>
```

## Dashboard Analytics

Dashboard with chart context menus:

```vue
<script setup>
import { ref } from 'vue'

interface ChartData {
  id: string
  title: string
  type: 'line' | 'bar' | 'pie'
  data: number[]
}

const charts = ref<ChartData[]>([
  { id: 'chart1', title: 'Revenue Trend', type: 'line', data: [10, 20, 15, 25, 30] },
  { id: 'chart2', title: 'Category Distribution', type: 'pie', data: [30, 25, 20, 25] },
  { id: 'chart3', title: 'Monthly Sales', type: 'bar', data: [100, 120, 90, 110, 130] }
])

const selectedChart = ref<ChartData | null>(null)

const items = ref([
  { text: 'Refresh', id: 'refresh', iconCss: 'e-icons e-refresh' },
  { text: 'Download', id: 'download', iconCss: 'e-icons e-download' },
  { text: 'Settings', id: 'settings', iconCss: 'e-icons e-settings' },
  { separator: true },
  { text: 'Remove', id: 'remove', iconCss: 'e-icons e-close' }
])

const selectChart = (chart) => {
  selectedChart.value = chart
}

const handleSelect = (args) => {
  if (!selectedChart.value) return

  switch (args.item.id) {
    case 'refresh':
      console.log('Refreshing:', selectedChart.value.title)
      break
    case 'download':
      console.log('Downloading:', selectedChart.value.title)
      break
    case 'settings':
      console.log('Opening settings for:', selectedChart.value.title)
      break
    case 'remove':
      charts.value = charts.value.filter(c => c.id !== selectedChart.value?.id)
      selectedChart.value = null
      break
  }
}
</script>

<template>
  <div class="dashboard">
    <h1>Analytics Dashboard</h1>
    <div class="charts-grid">
      <div
        v-for="chart in charts"
        :key="chart.id"
        class="chart-card"
        :class="{ selected: selectedChart?.id === chart.id }"
        @click="selectChart(chart)"
        id="target"
      >
        <h3>{{ chart.title }}</h3>
        <div class="chart-placeholder">
          <span class="chart-icon">
            {{ chart.type === 'line' ? '📈' : chart.type === 'bar' ? '📊' : '📉' }}
          </span>
          <p>{{ chart.type }} chart</p>
        </div>
      </div>
    </div>

    <ejs-contextmenu
      target="#target"
      :items="items"
      @select="handleSelect"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 40px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.dashboard h1 {
  margin-bottom: 30px;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.chart-card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  cursor: context-menu;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.chart-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.chart-card.selected {
  border: 2px solid #2196f3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.2);
}

.chart-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: #f9f9f9;
  border-radius: 4px;
  color: #999;
}

.chart-icon {
  font-size: 48px;
  margin-bottom: 10px;
}
</style>
```

## E-Commerce Product Actions

E-commerce with product context menu:

```vue
<script setup>
import { ref } from 'vue'

interface Product {
  id: string
  name: string
  price: number
  stock: number
  image: string
}

const products = ref<Product[]>([
  { id: '1', name: 'Laptop', price: 999, stock: 5, image: '💻' },
  { id: '2', name: 'Phone', price: 599, stock: 10, image: '📱' },
  { id: '3', name: 'Tablet', price: 399, stock: 8, image: '📱' }
])

const selectedProduct = ref<Product | null>(null)
const wishlist = ref<string[]>([])

const items = ref([
  { text: 'View Details', id: 'view' },
  { text: 'Add to Cart', id: 'add' },
  { separator: true },
  { text: 'Add to Wishlist', id: 'wishlist' },
  { text: 'Share', id: 'share' },
  { separator: true },
  { text: 'Report Problem', id: 'report' }
])

const selectProduct = (product) => {
  selectedProduct.value = product
}

const handleSelect = (args) => {
  if (!selectedProduct.value) return

  switch (args.item.id) {
    case 'view':
      console.log('View details:', selectedProduct.value.name)
      break
    case 'add':
      console.log('Added to cart:', selectedProduct.value.name)
      break
    case 'wishlist':
      if (!wishlist.value.includes(selectedProduct.value.id)) {
        wishlist.value.push(selectedProduct.value.id)
        console.log('Added to wishlist:', selectedProduct.value.name)
      }
      break
    case 'share':
      console.log('Share:', selectedProduct.value.name)
      break
    case 'report':
      console.log('Report problem:', selectedProduct.value.name)
      break
  }
}
</script>

<template>
  <div class="ecommerce">
    <h1>Products</h1>
    <div class="products-grid">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
        :class="{ 
          selected: selectedProduct?.id === product.id,
          inWishlist: wishlist.includes(product.id)
        }"
        @click="selectProduct(product)"
        id="target"
      >
        <div class="product-image">{{ product.image }}</div>
        <h3>{{ product.name }}</h3>
        <p class="price">${{ product.price }}</p>
        <p class="stock">Stock: {{ product.stock }}</p>
      </div>
    </div>

    <ejs-contextmenu
      target="#target"
      :items="items"
      @select="handleSelect"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.ecommerce {
  padding: 40px;
  background-color: #f5f5f5;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.product-card {
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  cursor: context-menu;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.product-card.selected {
  border: 2px solid #2196f3;
}

.product-card.inWishlist::after {
  content: '❤️';
  position: absolute;
  top: 10px;
  right: 10px;
}

.product-image {
  font-size: 48px;
  text-align: center;
  margin-bottom: 10px;
}

.product-card h3 {
  margin: 10px 0;
  font-size: 16px;
}

.price {
  font-weight: bold;
  color: #2196f3;
  margin: 8px 0;
}

.stock {
  font-size: 12px;
  color: #999;
  margin: 0;
}
</style>
```

## Admin Panel

Admin panel with bulk actions:

```vue
<script setup>
import { ref, computed } from 'vue'

interface User {
  id: string
  name: string
  role: 'admin' | 'editor' | 'viewer'
  status: 'active' | 'inactive'
  email: string
}

const users = ref<User[]>([
  { id: '1', name: 'Alice', role: 'admin', status: 'active', email: 'alice@example.com' },
  { id: '2', name: 'Bob', role: 'editor', status: 'active', email: 'bob@example.com' },
  { id: '3', name: 'Carol', role: 'viewer', status: 'inactive', email: 'carol@example.com' }
])

const selectedUser = ref<User | null>(null)
const selectedUsers = ref<string[]>([])

const items = computed(() => {
  const baseItems = [
    { text: 'Edit User', id: 'edit', iconCss: 'e-icons e-edit' },
    { separator: true },
    { text: 'Change Role', id: 'role', iconCss: 'e-icons e-settings' }
  ]

  if (selectedUser.value?.status === 'active') {
    baseItems.push({ text: 'Deactivate', id: 'deactivate' })
  } else {
    baseItems.push({ text: 'Activate', id: 'activate' })
  }

  baseItems.push(
    { separator: true },
    { text: 'Delete User', id: 'delete', iconCss: 'e-icons e-delete' }
  )

  return baseItems
})

const selectUser = (user, event) => {
  if (event.ctrlKey || event.metaKey) {
    if (selectedUsers.value.includes(user.id)) {
      selectedUsers.value = selectedUsers.value.filter(id => id !== user.id)
    } else {
      selectedUsers.value.push(user.id)
    }
  } else {
    selectedUsers.value = [user.id]
  }
  selectedUser.value = user
}

const handleSelect = (args) => {
  if (!selectedUser.value) return

  switch (args.item.id) {
    case 'edit':
      console.log('Edit user:', selectedUser.value.name)
      break
    case 'role':
      console.log('Change role for:', selectedUser.value.name)
      break
    case 'activate':
      selectedUser.value.status = 'active'
      console.log('Activated:', selectedUser.value.name)
      break
    case 'deactivate':
      selectedUser.value.status = 'inactive'
      console.log('Deactivated:', selectedUser.value.name)
      break
    case 'delete':
      users.value = users.value.filter(u => u.id !== selectedUser.value?.id)
      console.log('Deleted:', selectedUser.value.name)
      break
  }
}
</script>

<template>
  <div class="admin-panel">
    <h1>Admin Panel - Users</h1>
    <p class="info">{{ selectedUsers.length }} selected</p>

    <table class="users-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
          class="user-row"
          :class="{ selected: selectedUsers.includes(user.id) }"
          @click="selectUser(user, $event)"
          id="target"
        >
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <span class="role-badge" :class="user.role">{{ user.role }}</span>
          </td>
          <td>
            <span class="status-badge" :class="user.status">
              {{ user.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <ejs-contextmenu
      target="#target"
      :items="items"
      @select="handleSelect"
    ></ejs-contextmenu>
  </div>
</template>

<style scoped>
.admin-panel {
  padding: 40px;
  background-color: #f5f5f5;
}

.info {
  font-size: 12px;
  color: #666;
}

.users-table {
  width: 100%;
  background-color: white;
  border-collapse: collapse;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

th {
  padding: 12px;
  text-align: left;
  font-weight: 600;
  background-color: #f5f5f5;
  border-bottom: 2px solid #e0e0e0;
}

td {
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.user-row {
  cursor: context-menu;
}

.user-row:hover {
  background-color: #f9f9f9;
}

.user-row.selected {
  background-color: #e3f2fd;
}

.role-badge,
.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.role-badge.admin {
  background-color: #ffebee;
  color: #c62828;
}

.role-badge.editor {
  background-color: #e3f2fd;
  color: #1565c0;
}

.role-badge.viewer {
  background-color: #f3e5f5;
  color: #6a1b9a;
}

.status-badge.active {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-badge.inactive {
  background-color: #fce4ec;
  color: #c2185b;
}
</style>
```

## Best Practices for All Use Cases

1. **Dynamic menu items:** Change menu based on selection context
2. **Clear feedback:** Show user actions clearly (logging, state changes)
3. **Undo/Redo:** Provide ability to reverse destructive actions
4. **Permission checks:** Disable items based on user roles
5. **Keyboard support:** Combine with keyboard shortcuts
6. **Performance:** Use computed properties for dynamic menus
7. **Accessibility:** Add ARIA labels for all actions
8. **Persistence:** Save user preferences and recent actions
