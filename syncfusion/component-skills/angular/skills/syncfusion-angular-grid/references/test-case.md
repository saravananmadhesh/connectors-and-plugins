# Grid Component - Testing Guide

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Unit Tests](#unit-tests)
- [Integration Tests](#integration-tests)

## When to Use This Skill

Use this skill when you need to:
- **Unit testing** — Write tests for grid components
- **Test initialization** — Verify grid component creation and setup
- **Render verification** — Test that grid renders with data correctly
- **Interaction testing** — Test user interactions like sort, filter, select
- **Method testing** — Test programmatic methods
- **Event testing** — Verify event handlers trigger correctly
- **Integration tests** — Test grid with other components
- **Test utilities** — Use TestBed and fixture for grid testing

---

## Unit Tests

```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { PerformanceGridComponent } from './performance-grid.component';

describe('Grid Component Tests', () => {
  let component: PerformanceGridComponent;
  let fixture: ComponentFixture<PerformanceGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerformanceGridComponent, GridComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PerformanceGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create grid component', () => {
    expect(component).toBeTruthy();
  });

  it('should render grid with data', () => {
    component.data = mockData;
    fixture.detectChanges();
    const gridElement = fixture.nativeElement.querySelector('.e-grid');
    expect(gridElement).toBeTruthy();
  });

  it('should display correct number of rows', (done) => {
    component.data = mockData;
    fixture.detectChanges();
    
    setTimeout(() => {
      const rows = fixture.nativeElement.querySelectorAll('.e-row');
      expect(rows.length).toBe(mockData.length);
      done();
    }, 100);
  });

  it('should handle sorting', (done) => {
    component.data = mockData;
    fixture.detectChanges();
    
    const headerCell = fixture.nativeElement.querySelector('[data-field="OrderID"]');
    headerCell.click();
    fixture.detectChanges();
    
    setTimeout(() => {
      const firstRow = fixture.nativeElement.querySelector('.e-row');
      expect(firstRow.textContent).toContain('10248');
      done();
    }, 100);
  });

  it('should handle filtering', (done) => {
    component.data = mockData;
    fixture.detectChanges();
    
    component.gridInstance.filterByColumn('OrderID', 'equal', 10248);
    fixture.detectChanges();
    
    setTimeout(() => {
      const rows = fixture.nativeElement.querySelectorAll('.e-row');
      expect(rows.length).toBe(1);
      done();
    }, 100);
  });

  it('should handle inline editing', (done) => {
    component.data = mockData;
    component.gridInstance.allowInlineEdit = true;
    fixture.detectChanges();
    
    component.gridInstance.startEdit(0);
    fixture.detectChanges();
    
    setTimeout(() => {
      const editCell = fixture.nativeElement.querySelector('.e-editedinput');
      expect(editCell).toBeTruthy();
      done();
    }, 100);
  });

  it('should filter data correctly', () => {
    const fixture = TestBed.createComponent(GridComponent);
    const component = fixture.componentInstance;
    component.mockData = mockData;
    fixture.detectChanges();
    
    const filterInput = fixture.nativeElement.querySelector('.e-filterinput');
    filterInput.value = 'VINET';
    filterInput.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    
    const rows = fixture.nativeElement.querySelectorAll('.e-row');
    expect(rows.length).toBeLessThan(mockData.length);
  });

  it('should edit and save data correctly', () => {
    const fixture = TestBed.createComponent(GridComponent);
    const component = fixture.componentInstance;
    component.mockData = mockData;
    component.editSettings = { mode: 'Inline' };
    fixture.detectChanges();
    
    const editButton = fixture.nativeElement.querySelector('[aria-label="Edit"]');
    editButton.click();
    fixture.detectChanges();
    
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'NewValue';
    input.dispatchEvent(new Event('change'));
    
    const saveButton = fixture.nativeElement.querySelector('[aria-label="Save"]');
    saveButton.click();
    fixture.detectChanges();
    
    expect(mockData[0].CustomerID).toBe('NewValue');
  });
});

const mockData = [
  { OrderID: 10248, CustomerID: 'VINET', OrderDate: new Date(1996, 6, 4), Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', OrderDate: new Date(1996, 6, 5), Freight: 11.61 }
];
```

---

## Integration Tests

```typescript
describe('Grid Integration Tests', () => {
  test('pagination, sorting, and filtering work together', () => {
    const fixture = TestBed.createComponent(GridComponent);
    const component = fixture.componentInstance;
    component.largeDataset = largeDataset;
    component.allowPaging = true;
    component.allowSorting = true;
    component.allowFiltering = true;
    fixture.detectChanges();

    // Apply filter
    const filterInput = fixture.nativeElement.querySelector('.e-filterinput');
    filterInput.value = 'Berlin';
    filterInput.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    // Sort
    const sortHeader = fixture.nativeElement.querySelector('[data-field="OrderDate"]');
    sortHeader.click();
    fixture.detectChanges();

    // Change page
    const pageInput = fixture.nativeElement.querySelector('.e-pagejump input');
    pageInput.value = '2';
    pageInput.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('.e-row');
    expect(rows.length).toBeGreaterThan(0);
  });

  test('edit and save with validation', () => {
    const onSave = jasmine.createSpy('onSave');
    const fixture = TestBed.createComponent(GridComponent);
    const component = fixture.componentInstance;
    component.mockData = mockData;
    component.editSettings = { mode: 'Dialog', allowEditing: true };
    component.actionComplete = onSave;
    fixture.detectChanges();

    // Start edit
    const editButton = fixture.nativeElement.querySelector('[aria-label="Edit"]');
    editButton.click();
    fixture.detectChanges();

    // Fill form
    const form = fixture.nativeElement.querySelector('.e-dialog-component');
    const inputs = form.querySelectorAll('input');
    inputs[0].value = 'UpdatedValue';
    inputs[0].dispatchEvent(new Event('change'));
    fixture.detectChanges();

    // Save
    const saveButton = form.querySelector('.e-primary');
    saveButton.click();
    fixture.detectChanges();

    expect(onSave).toHaveBeenCalled();
  });

  test('CRUD operations work correctly', () => {
    const fixture = TestBed.createComponent(GridComponent);
    const component = fixture.componentInstance;
    component.data = [...mockData];
    component.editSettings = { 
      allowAdding: true, 
      allowEditing: true, 
      allowDeleting: true
    };
    fixture.detectChanges();

    // Test Add
    const initialLength = component.data.length;
    component.gridComponent.addRecord({ OrderID: 99999, CustomerID: 'TEST', Freight: 100 });
    expect(component.data.length).toBeGreaterThan(initialLength);

    // Test Edit
    component.gridComponent.setCellValue(mockData[0].OrderID, 'Freight', 50);
    expect(component.data[0].Freight).toBe(50);

    // Test Delete
    const lengthBeforeDelete = component.data.length;
    component.gridComponent.deleteRecord('OrderID', mockData[0]);
    expect(component.data.length).toBeLessThan(lengthBeforeDelete);
  });

  test('selection and batch operations work', () => {
    const fixture = TestBed.createComponent(GridComponent);
    const component = fixture.componentInstance;
    component.data = mockData;
    component.editSettings = { mode: 'Batch', allowEditing: true };
    fixture.detectChanges();

    // Select multiple rows
    component.gridComponent.selectRows([0, 1]);
    const selected = component.gridComponent.getSelectedRecords();
    expect(selected.length).toBe(2);

    // Get batch changes
    component.gridComponent.setCellValue(mockData[0].OrderID, 'Freight', 100);
    const changes = component.gridComponent.getBatchChanges();
    expect(changes.changedRecords.length).toBeGreaterThan(0);
  });

  test('column operations work correctly', () => {
    const fixture = TestBed.createComponent(GridComponent);
    const component = fixture.componentInstance;
    component.data = mockData;
    fixture.detectChanges();

    // Hide column
    component.gridComponent.hideColumns('Freight');
    let visibleColumns = component.gridComponent.getColumns().filter(c => !c.visible);
    expect(visibleColumns.some(c => c.field === 'Freight')).toBeTruthy();

    // Show column
    component.gridComponent.showColumns('Freight');
    visibleColumns = component.gridComponent.getColumns().filter(c => c.visible);
    expect(visibleColumns.some(c => c.field === 'Freight')).toBeTruthy();

    // Get column by field
    const column = component.gridComponent.getColumnByField('OrderID');
    expect(column.field).toBe('OrderID');
  });

  test('search functionality works', () => {
    const fixture = TestBed.createComponent(GridComponent);
    const component = fixture.componentInstance;
    component.data = mockData;
    fixture.detectChanges();

    component.gridInstance.search('VINET');
    const filtered = component.gridInstance.getFilteredRecords();
    expect(filtered.length).toBeLessThanOrEqual(mockData.length);
    expect(filtered.some(r => r.CustomerID === 'VINET')).toBeTruthy();
  });
});

const mockData = [
  { OrderID: 10248, CustomerID: 'VINET', OrderDate: new Date(1996, 6, 4), Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', OrderDate: new Date(1996, 6, 5), Freight: 11.61 },
  { OrderID: 10250, CustomerID: 'HANAR', OrderDate: new Date(1996, 6, 8), Freight: 65.83 }
];

const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
  OrderID: 10000 + i,
  CustomerID: `CUST${i}`,
  OrderDate: new Date(1996, 6, 4 + (i % 30)),
  Freight: Math.random() * 100
}));
```
