# Templates and Customization

## Table of Contents
- [Overview](#overview)
- [Value Template](#value-template)
- [Operator Template](#operator-template)
- [Field Template](#field-template)
- [HTML Templates](#html-templates)
- [CSS Customization](#css-customization)
- [Advanced Styling](#advanced-styling)

## Overview

QueryBuilder allows deep customization through templates for every UI element. You can create custom value inputs, operator dropdowns, and field selectors.

## Value Template

### Basic Value Template

```typescript
import { QueryBuilder, ColumnsModel } from '@syncfusion/ej2-querybuilder';

const columns: ColumnsModel[] = [
  {
    field: 'Status',
    label: 'Status',
    type: 'string',
    template: {
      create: () => {
        const element = document.createElement('input');
        element.type = 'text';
        return element;
      },
      destroy: (args: { element: HTMLElement }) => {
        // Cleanup custom component resources if needed
      },
      write: (args: { element: HTMLInputElement; value: string }) => {
        // Set the initial value on the custom component
        args.element.value = args.value || '';
      }
    }
  }
];

const qb = new QueryBuilder({
  columns: columns,
  dataSource: data
});

qb.appendTo('#querybuilder');
```

### Dropdown Value Template

```typescript
const statusColumn: ColumnsModel = {
  field: 'Status',
  label: 'Status',
  type: 'string',
  template: {
    create: () => {
      const select = document.createElement('select');
      select.innerHTML = `
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        <option value="Pending">Pending</option>
      `;
      return select;
    },
    write: (args: { element: HTMLSelectElement; value: string }) => {
      args.element.value = args.value || '';
    }
  }
};
```

### Date Picker Template

```typescript
const dateColumn: ColumnsModel = {
  field: 'HireDate',
  label: 'Hire Date',
  type: 'date',
  format: 'dd/MM/yyyy',
  template: {
    create: () => {
      const dateInput = document.createElement('input');
      dateInput.type = 'date';
      dateInput.className = 'custom-date-picker';
      return dateInput;
    },
    write: (args: { element: HTMLInputElement; value: string }) => {
      if (args.value) {
        // Convert dd/MM/yyyy to yyyy-MM-dd for the native date input
        const parts = args.value.split('/');
        if (parts.length === 3) {
          args.element.value = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
      }
    }
  }
};
```

### Number Range Template

Use `notifyChange` to push value updates back to QueryBuilder from within a custom template:

```typescript
const salaryColumn: ColumnsModel = {
  field: 'Salary',
  label: 'Salary',
  type: 'number',
  template: {
    create: () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <input type="number" class="min-value" placeholder="Min">
        <input type="number" class="max-value" placeholder="Max">
      `;
      return container;
    },
    write: (args: { element: HTMLElement; value: number[] }) => {
      const minInput = args.element.querySelector('.min-value') as HTMLInputElement;
      const maxInput = args.element.querySelector('.max-value') as HTMLInputElement;

      if (Array.isArray(args.value)) {
        minInput.value = String(args.value[0]);
        maxInput.value = String(args.value[1]);
      }

      // Notify QueryBuilder when values change
      const notify = () => {
        const min = Number(minInput.value);
        const max = Number(maxInput.value);
        qb.notifyChange([min, max] as any, args.element);
      };
      minInput.addEventListener('change', notify);
      maxInput.addEventListener('change', notify);
    }
  }
};
```

## Operator Template

### Custom Operator List

```typescript
const customOperatorColumn: ColumnsModel = {
  field: 'Title',
  label: 'Title',
  type: 'string',
  operators: [
    { key: 'startswith', value: 'Starts with' },
    { key: 'endswith', value: 'Ends with' },
    { key: 'contains', value: 'Contains' },
    { key: 'equal', value: 'Equals' }
  ],
  template: {
    // Custom value input template
    create: () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'operator-input';
      return input;
    },
    write: (args: { element: HTMLInputElement; value: string }) => {
      args.element.value = args.value || '';
      args.element.addEventListener('change', () => {
        qb.notifyChange(args.element.value, args.element);
      });
    }
  }
};
```

## Field Template

### Rule Template (Full Row)

Use `ruleTemplate` on a `ColumnsModel` to replace the entire rule row with a custom template:

```typescript
const customRuleColumn: ColumnsModel = {
  field: 'Status',
  label: 'Status',
  type: 'string',
  ruleTemplate: '#statusRuleTemplate'  // ID of a script/HTML template element
};
```

You can also use a function:

```typescript
const customRuleColumn: ColumnsModel = {
  field: 'Status',
  label: 'Status',
  type: 'string',
  ruleTemplate: (args: any) => {
    return `<div class="custom-rule">
      <label>Status</label>
      <select class="status-select">
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>`;
  }
};
```

## HTML Templates

### Using HTML String Templates

```typescript
// Value template with HTML buttons and notifyChange
const advancedColumn: ColumnsModel = {
  field: 'Priority',
  label: 'Priority',
  type: 'string',
  template: {
    create: () => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
        <div class="priority-selector">
          <button class="priority-btn" data-value="High">🔴 High</button>
          <button class="priority-btn" data-value="Medium">🟡 Medium</button>
          <button class="priority-btn" data-value="Low">🟢 Low</button>
        </div>
      `;
      return wrapper;
    },
    write: (args: { element: HTMLElement; value: string }) => {
      // Highlight the current value
      args.element.querySelectorAll('.priority-btn').forEach((btn: Element) => {
        (btn as HTMLElement).classList.toggle(
          'selected',
          (btn as HTMLElement).dataset.value === args.value
        );
      });
      // Notify QueryBuilder on click
      args.element.querySelectorAll('.priority-btn').forEach((btn: Element) => {
        btn.addEventListener('click', () => {
          const val = (btn as HTMLElement).dataset.value || '';
          qb.notifyChange(val, args.element);
        });
      });
    }
  }
};
```

### Complex HTML Template

```typescript
const complexTemplate: ColumnsModel = {
  field: 'Employee',
  label: 'Employee',
  type: 'string',
  template: {
    create: () => {
      return document.createElement('div');
    },
    write: (args: { element: HTMLElement; value: string }) => {
      args.element.innerHTML = `
        <div class="employee-card">
          <input type="text" class="employee-search" placeholder="Search..." value="${args.value || ''}">
          <div class="employee-list">
            ${generateEmployeeOptions()}
          </div>
        </div>
      `;
      const searchInput = args.element.querySelector('.employee-search') as HTMLInputElement;
      searchInput.addEventListener('change', () => {
        qb.notifyChange(searchInput.value, args.element);
      });
    }
  }
};

function generateEmployeeOptions(): string {
  return employeeData.map(emp => `
    <div class="employee-option" data-id="${emp.EmployeeID}">
      ${emp.FirstName} - ${emp.Title}
    </div>
  `).join('');
}
```

## CSS Customization

### Custom Classes

```typescript
// Define custom CSS classes
const customColumn: ColumnsModel = {
  field: 'Status',
  label: 'Status',
  type: 'string',
  template: {
    create: () => {
      const input = document.createElement('input');
      input.className = 'custom-status-input';  // Custom class
      return input;
    },
    write: (args: { element: HTMLInputElement; value: string }) => {
      args.element.value = args.value || '';
      // Add dynamic class based on value
      args.element.classList.toggle('status-active', args.value === 'Active');
      args.element.classList.toggle('status-inactive', args.value === 'Inactive');
      args.element.addEventListener('change', () => {
        qb.notifyChange(args.element.value, args.element);
      });
    }
  }
};
```

### Add CSS Styles

```css
/* QueryBuilder custom styles */
.e-querybuilder {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
}

/* Custom input styling */
.custom-status-input {
  padding: 8px 12px;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.custom-status-input:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 8px rgba(33, 150, 243, 0.2);
}

/* Status specific styles */
.status-active {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-inactive {
  background-color: #ffebee;
  color: #c62828;
}

/* Priority selector */
.priority-selector {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.priority-btn {
  padding: 6px 12px;
  border: 2px solid transparent;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.priority-btn:hover {
  background: #f0f0f0;
}

.priority-btn.selected {
  border-color: #2196F3;
  background: #e3f2fd;
}
```

## Advanced Styling

### Theme-Based Customization

```typescript
// Apply different themes based on configuration
function createQBWithTheme(theme: 'light' | 'dark' | 'highcontrast') {
  const baseColumns = getColumns();
  
  // Modify template styling based on theme
  baseColumns.forEach(col => {
    col.template = getThemedTemplate(col, theme);
  });
  
  const qb = new QueryBuilder({
    columns: baseColumns,
    dataSource: data
  });
  
  // Add theme class to container
  qb.appendTo('#querybuilder');
  document.getElementById('querybuilder')?.classList.add(`qb-${theme}`);
}

function getThemedTemplate(column: ColumnsModel, theme: string): TemplateColumn {
  const themeStyles: Record<string, { background: string; text: string; border: string }> = {
    light: { background: '#ffffff', text: '#333333', border: '#e0e0e0' },
    dark: { background: '#1e1e1e', text: '#ffffff', border: '#444444' },
    highcontrast: { background: '#000000', text: '#ffff00', border: '#ffff00' }
  };

  const style = themeStyles[theme] || themeStyles['light'];

  return {
    create: () => {
      const input = document.createElement('input');
      input.style.backgroundColor = style.background;
      input.style.color = style.text;
      input.style.borderColor = style.border;
      return input;
    },
    write: (args: { element: HTMLInputElement; value: string }) => {
      args.element.value = args.value || '';
      args.element.addEventListener('change', () => {
        qb.notifyChange(args.element.value, args.element);
      });
    }
  };
}
```

### Responsive Templates

```typescript
// Templates that adapt to screen size
const responsiveTemplate: ColumnsModel = {
  field: 'Description',
  label: 'Description',
  type: 'string',
  template: {
    create: () => {
      const container = document.createElement('div');
      container.className = 'responsive-input-container';

      // Use textarea on mobile, input on desktop
      const isMobile = window.innerWidth < 768;
      const element = isMobile
        ? document.createElement('textarea')
        : document.createElement('input');

      if (!isMobile) (element as HTMLInputElement).type = 'text';
      element.className = 'responsive-input';
      container.appendChild(element);

      return container;
    },
    write: (args: { element: HTMLElement; value: string }) => {
      const input = args.element.querySelector('textarea, input') as HTMLInputElement | HTMLTextAreaElement;
      input.value = args.value || '';
      input.addEventListener('change', () => {
        qb.notifyChange(input.value, args.element);
      });
    }
  }
};
```

### Validation in Templates

Use the `validation` property on `ColumnsModel` for built-in validation, or enforce it inside `write` with `notifyChange`:

```typescript
// Add validation to template using ColumnsModel.validation
const validatedColumn: ColumnsModel = {
  field: 'Email',
  label: 'Email',
  type: 'string',
  validation: { isRequired: true },  // Built-in required validation
  template: {
    create: () => {
      const input = document.createElement('input');
      input.type = 'email';
      input.className = 'email-input';
      return input;
    },
    write: (args: { element: HTMLInputElement; value: string }) => {
      args.element.value = args.value || '';
      args.element.addEventListener('change', () => {
        const value = args.element.value;
        // Validate email format visually
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        args.element.classList.toggle('error', !emailRegex.test(value));
        args.element.title = emailRegex.test(value) ? '' : 'Invalid email format';
        // Notify QueryBuilder of the new value
        qb.notifyChange(value, args.element);
      });
    }
  }
};
```

### Complete Example with Multiple Customizations

```typescript
const advancedColumns: ColumnsModel[] = [
  {
    field: 'EmployeeID',
    label: 'Employee',
    type: 'number',
    template: {
      create: () => {
        const select = document.createElement('select');
        select.className = 'employee-select';
        employeeData.forEach(emp => {
          const option = document.createElement('option');
          option.value = emp.EmployeeID;
          option.text = emp.FirstName;
          select.appendChild(option);
        });
        return select;
      },
      write: (args: any) => {
        args.element.value = args.value || '';
        args.element.addEventListener('change', () => {
          qb.notifyChange(args.element.value, args.element);
        });
      }
    }
  },
  {
    field: 'HireDate',
    label: 'Date Range',
    type: 'date',
    template: {
      create: () => {
        const container = document.createElement('div');
        container.className = 'date-range';
        container.innerHTML = `
          <input type="date" class="start-date" placeholder="From">
          <span class="range-separator">to</span>
          <input type="date" class="end-date" placeholder="To">
        `;
        return container;
      },
      write: (args: any) => {
        if (Array.isArray(args.value)) {
          args.element.querySelector('.start-date').value = args.value[0];
          args.element.querySelector('.end-date').value = args.value[1];
        }
        const notify = () => {
          const start = args.element.querySelector('.start-date').value;
          const end = args.element.querySelector('.end-date').value;
          qb.notifyChange([start, end], args.element);
        };
        args.element.querySelector('.start-date').addEventListener('change', notify);
        args.element.querySelector('.end-date').addEventListener('change', notify);
      }
    }
  }
];

const qb = new QueryBuilder({
  columns: advancedColumns,
  dataSource: data,
  width: '100%'
});

qb.appendTo('#querybuilder');
```

---

**Need help?** Check [references/getting-started.md](getting-started.md) for basic setup or [references/columns-definition.md](columns-definition.md) for column configuration.
