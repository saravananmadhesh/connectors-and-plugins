---
title: CRUD Operations in Syncfusion Angular DataManager
---

# CRUD Operations in Syncfusion Angular DataManager

## Table of Contents

- [Overview](#overview)
- [Insert - Adding Records](#insert---adding-records)
- [Update - Modifying Records](#update---modifying-records)
- [Delete - Removing Records](#delete---removing-records)
- [Batch Operations](#batch-operations)
- [Response Handling](#response-handling)
- [Error Handling](#error-handling)

---

## Overview

CRUD (Create, Read, Update, Delete) operations manage data persistence. DataManager provides methods for each operation:

- **insert()** — Add new records
- **update()** — Modify existing records
- **remove()** — Delete records
- **saveChanges()** — Batch persist all changes

All CRUD methods return Promises for async handling.

---

## Insert - Adding Records

### Basic Insert

```typescript
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
});

const newOrder = {
  OrderID: 10251,
  CustomerID: 'NEW01',
  EmployeeID: 1,
  Freight: 25.50
};

dataManager.insert(newOrder, 'Orders')
  .then((result) => {
    console.log('Record inserted successfully');
  })
  .catch((error) => {
    console.error('Insert failed:', error);
  });
```

### Insert Multiple Records

```typescript
const newOrders = [
  { CustomerID: 'CUST1', EmployeeID: 1, Freight: 20 },
  { CustomerID: 'CUST2', EmployeeID: 2, Freight: 30 },
  { CustomerID: 'CUST3', EmployeeID: 3, Freight: 40 }
];

// Insert one by one
for (const order of newOrders) {
  dataManager.insert(order, 'Orders');
}

// Or collect and insert via saveChanges
const batch = [];
for (const order of newOrders) {
  batch.push(dataManager.insert(order, 'Orders'));
}

await Promise.all(batch);
```

### Insert with Local Data

```typescript
const localData = [
  { OrderID: 10248, CustomerID: 'VINET' },
  { OrderID: 10249, CustomerID: 'TOMSP' }
];

const dataManager = new DataManager({
  json: localData,
  adaptor: new JsonAdaptor()
});

// For local data, add to array and reassign
const newRecord = { OrderID: 10250, CustomerID: 'HANAR' };
localData.push(newRecord);

// Or use DataSource property
dataManager.insert(newRecord, null);
```

---

## Update - Modifying Records

### Basic Update

```typescript
const dataManager = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
});

const updatedRecord = {
  OrderID: 10248,
  CustomerID: 'VINET_UPDATED',
  Freight: 50.00
};

dataManager.update('Orders', updatedRecord)
  .then(() => {
    console.log('Record updated successfully');
  })
  .catch((error) => {
    console.error('Update failed:', error);
  });
```

### Update Specific Fields

```typescript
// Update only selected fields
const partialUpdate = {
  OrderID: 10248,
  Freight: 45.00  // Only update Freight
};

dataManager.update('OrderID', partialUpdate, 'Orders');
```

### Update Multiple Records

```typescript
const updates = [
  { OrderID: 10248, Freight: 40.00 },
  { OrderID: 10249, Freight: 25.00 },
  { OrderID: 10250, Freight: 60.00 }
];

const promises = updates.map(update => 
  dataManager.update('OrderID', update, 'Orders')
);

Promise.all(promises)
  .then(() => console.log('All updates complete'))
  .catch((error) => console.error('Update failed:', error));
```

---

## Delete - Removing Records

### Basic Delete

```typescript
const dataManager = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
});

const recordToDelete = { OrderID: 10248 };

dataManager.remove('OrderID', recordToDelete.OrderID, 'Orders')
  .then(() => {
    console.log('Record deleted successfully');
  })
  .catch((error) => {
    console.error('Delete failed:', error);
  });
```

### Delete by Key

```typescript
// Pass just the key value
dataManager.remove('OrderID', 10248, 'Orders');  // Deletes record with OrderID = 10248

// For string keys
dataManager.remove('CustomerID', 'VINET', 'Orders');  // Deletes record with CustomerID = 'VINET'
```

### Delete Multiple Records

```typescript
const keysToDelete = [10248, 10249, 10250];

const promises = keysToDelete.map(id => 
  dataManager.remove('OrderID', id, 'Orders')
);

Promise.all(promises)
  .then(() => console.log('All deletions complete'))
  .catch((error) => console.error('Delete failed:', error));
```

---

## Batch Operations

### Using saveChanges()

saveChanges() persists multiple operations (inserts, updates, deletes) in a single batch.

```typescript
const dataManager = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
});

// Collect changes
const recordsToInsert = [
  { CustomerID: 'NEW1', Freight: 25 },
  { CustomerID: 'NEW2', Freight: 30 }
];

const recordsToUpdate = [
  { OrderID: 10248, Freight: 40 }
];

const recordsToDelete = [10249, 10250];

// Execute batch
dataManager.saveChanges({
  addedRecords: recordsToInsert,
  changedRecords: recordsToUpdate,
  deletedRecords: recordsToDelete
})
  .then((result) => {
    console.log('Batch operation completed');
    console.log('Inserted:', result.addedRecords);
    console.log('Updated:', result.changedRecords);
    console.log('Deleted:', result.deletedRecords);
  })
  .catch((error) => {
    console.error('Batch operation failed:', error);
  });
```

### Batch Example with Component

```typescript
import { Component } from '@angular/core';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-batch-crud',
  template: `
    <div>
      <h3>Manage Orders</h3>
      <button (click)="addOrder()">Add Order</button>
      <button (click)="updateOrder()">Update Order</button>
      <button (click)="deleteOrder()">Delete Order</button>
      <button (click)="saveBatch()" style="font-weight:bold;">Save All Changes</button>
    </div>
  `
})
export class BatchCrudComponent {
  private dataManager = new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor()
  });

  private toAdd = [];
  private toUpdate = [];
  private toDelete = [];

  addOrder(): void {
    const newOrder = {
      CustomerID: 'NEWCUST',
      EmployeeID: 1,
      Freight: 30
    };
    this.toAdd.push(newOrder);
    console.log('Order added to batch');
  }

  updateOrder(): void {
    const updatedOrder = {
      OrderID: 10248,
      Freight: 50
    };
    this.toUpdate.push(updatedOrder);
    console.log('Order updated in batch');
  }

  deleteOrder(): void {
    this.toDelete.push(10249);
    console.log('Order deleted from batch');
  }

  async saveBatch(): Promise<void> {
    try {
      const result = await this.dataManager.saveChanges({
        addedRecords: this.toAdd,
        changedRecords: this.toUpdate,
        deletedRecords: this.toDelete
      });

      console.log('Batch saved successfully:', result);

      // Clear batches
      this.toAdd = [];
      this.toUpdate = [];
      this.toDelete = [];
    } catch (error) {
      console.error('Batch save failed:', error);
    }
  }
}
```

---

## Response Handling

### Success Response

```typescript
dataManager.insert('Orders', newOrder)
  .then((result) => {
    // result = { AddedRecords: [...] } or similar
    console.log('Insertion successful');
    console.log('Response:', result);
  });
```

### Response Structure

```typescript
interface InsertResponse {
  AddedRecords?: any[];
  ChangedRecords?: any[];
  DeletedRecords?: any[];
}

dataManager.saveChanges({...})
  .then((response: InsertResponse) => {
    console.log('Added:', response.AddedRecords);
    console.log('Changed:', response.ChangedRecords);
    console.log('Deleted:', response.DeletedRecords);
  });
```

---

## Error Handling

### HTTP Error Codes

```typescript
dataManager.update('Orders', updatedRecord)
  .catch((error: any) => {
    if (error.status === 400) {
      console.error('Bad request - invalid data');
    } else if (error.status === 401) {
      console.error('Unauthorized - check authentication');
    } else if (error.status === 404) {
      console.error('Record not found');
    } else if (error.status === 409) {
      console.error('Conflict - record modified by another user');
    } else if (error.status === 500) {
      console.error('Server error - retry later');
    }
  });
```

### Validation Before CRUD

```typescript
function validateOrder(order: any): boolean {
  if (!order.OrderID) {
    console.error('OrderID is required');
    return false;
  }
  if (!order.CustomerID) {
    console.error('CustomerID is required');
    return false;
  }
  if (order.Freight < 0) {
    console.error('Freight cannot be negative');
    return false;
  }
  return true;
}

if (validateOrder(newOrder)) {
  dataManager.insert(newOrder, 'Orders');
}
```

### Optimistic Error Recovery

```typescript
const originalData = { ...recordToUpdate };

dataManager.update('OrderID', recordToUpdate, 'Orders')
  .catch((error) => {
    if (error.status === 409) {
      console.warn('Update conflict - reverting to original data');
      // Restore from originalData
    } else {
      console.error('Update failed:', error);
    }
  });
```

---

## Complete CRUD Example

```typescript
import { Component, OnInit } from '@angular/core';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

interface Order {
  OrderID?: number;
  CustomerID: string;
  EmployeeID: number;
  Freight: number;
}

@Component({
  selector: 'app-order-crud',
  template: `
    <div>
      <form (ngSubmit)="onSubmit()">
        <label>Customer ID: <input [(ngModel)]="form.CustomerID" name="customer"></label>
        <label>Employee ID: <input type="number" [(ngModel)]="form.EmployeeID" name="employee"></label>
        <label>Freight: <input type="number" [(ngModel)]="form.Freight" name="freight"></label>
        <button type="submit">{{ isEdit ? 'Update' : 'Add' }}</button>
        <button type="button" (click)="cancel()" *ngIf="isEdit">Cancel</button>
      </form>

      <table>
        <thead>
          <tr><th>ID</th><th>Customer</th><th>Employee</th><th>Freight</th><th>Actions</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let order of orders">
            <td>{{ order.OrderID }}</td>
            <td>{{ order.CustomerID }}</td>
            <td>{{ order.EmployeeID }}</td>
            <td>{{ order.Freight }}</td>
            <td>
              <button (click)="onEdit(order)">Edit</button>
              <button (click)="onDelete(order.OrderID)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class OrderCrudComponent implements OnInit {
  public orders: Order[] = [];
  public form: Order = { CustomerID: '', EmployeeID: 0, Freight: 0 };
  public isEdit = false;
  public editingId: number | null = null;

  private dataManager = new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor()
  });

  ngOnInit(): void {
    this.loadOrders();
  }

  async loadOrders(): Promise<void> {
    try {
      const result = await this.dataManager.executeQuery(new Query());
      this.orders = result.result as Order[];
    } catch (error) {
      console.error('Load failed:', error);
    }
  }

  async onSubmit(): Promise<void> {
    try {
      if (this.isEdit && this.editingId) {
        await this.dataManager.update('OrderID', { OrderID: this.editingId, ...this.form }, 'Orders');
      } else {
        await this.dataManager.insert(this.form, 'Orders');
      }
      await this.loadOrders();
      this.resetForm();
    } catch (error) {
      console.error('Save failed:', error);
    }
  }

  onEdit(order: Order): void {
    this.form = { ...order };
    this.editingId = order.OrderID;
    this.isEdit = true;
  }

  async onDelete(id: number): Promise<void> {
    try {
      await this.dataManager.remove('Orders', id);
      await this.loadOrders();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  }

  cancel(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.form = { CustomerID: '', EmployeeID: 0, Freight: 0 };
    this.isEdit = false;
    this.editingId = null;
  }
}
```

---
