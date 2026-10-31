# Templates in Vue Query Builder

## Table of Contents
- [Overview](#overview)
- [Header Template](#header-template)
- [Column Template](#column-template)
- [Rule Template](#rule-template)
- [Template Lifecycle](#template-lifecycle)
- [Examples](#examples)
- [Best Practices](#best-practices)

---

## Overview

Templates allow you to customize how Query Builder displays:

1. **Header Template** - AND/OR conditions, NOT button, add/delete buttons
2. **Column Template** - Custom input widgets for specific columns
3. **Rule Template** - Complete custom rule UI

Use templates when standard inputs don't meet your needs.

---

## Header Template

Customize the group header with custom AND/OR selectors, NOT button, and action buttons.

### Basic Header Template

```vue
<template>
  <div>
    <ejs-querybuilder 
      ref="querybuilder"
      :dataSource="employees"
      :headerTemplate="headerTemplate"
      enableNotCondition="true">
      <!-- Query Builder -->
    </ejs-querybuilder>
  </div>
</template>

<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-vue-querybuilder";
import { DropDownListComponent } from "@syncfusion/ej2-vue-dropdowns";
import { CheckBoxComponent, ButtonComponent } from "@syncfusion/ej2-vue-buttons";
import { getComponent } from '@syncfusion/ej2-base';

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective,
    "ejs-checkbox": CheckBoxComponent,
    "ejs-dropdownlist": DropDownListComponent,
    "ejs-button": ButtonComponent
  },
  data() {
    return {
      employees: [
        { 'FirstName': 'Nancy', 'Age': 31, 'City': 'Seattle' },
        { 'FirstName': 'Andrew', 'Age': 32, 'City': 'Tacoma' }
      ],
      conditions: [
        { 'key': 'AND', 'value': 'and' },
        { 'key': 'OR', 'value': 'or' }
      ]
    }
  },
  methods: {
    headerTemplate() {
      return { template: this.renderHeaderTemplate };
    },
    renderHeaderTemplate(context) {
      const div = document.createElement('div');
      div.className = 'e-groupheader';
      return div;
    },
    onNotChange(args) {
      const qryBldrObj = getComponent(document.querySelector('[role="application"]'), 'query-builder');
      qryBldrObj.notifyChange(args.checked, args.event.target, 'not');
    },
    onConditionChange(args) {
      const qryBldrObj = getComponent(document.querySelector('[role="application"]'), 'query-builder');
      qryBldrObj.notifyChange(args.value, args.element, 'condition');
    }
  }
}
</script>
```

---

## Column Template

Customize input widgets for specific columns (e.g., dropdown instead of text input).

### Column Template Example

```vue
<template>
  <ejs-querybuilder :rule="importRules" width="70%">
    <e-columns>
      <e-column field='Category' label='Category' type='string' />
      <e-column 
        field='PaymentMode' 
        label='Payment Mode' 
        type='string' 
        :template='paymentTemplate' />
      <e-column field='Amount' label='Amount' type='number' />
    </e-columns>
  </ejs-querybuilder>
</template>

<script>
import { QueryBuilderComponent, ColumnDirective, ColumnsDirective } from "@syncfusion/ej2-vue-querybuilder";
import { DropDownListComponent } from "@syncfusion/ej2-vue-dropdowns";
import { getComponent } from "@syncfusion/ej2-base";

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective,
    "ejs-dropdownlist": DropDownListComponent
  },
  data() {
    return {
      data: [
        { 'Category': 'Food', 'PaymentMode': 'Credit Card', 'Amount': 100 },
        { 'Category': 'Fuel', 'PaymentMode': 'Cash', 'Amount': 50 }
      ],
      importRules: {
        'condition': 'and',
        'rules': [{
          'label': 'Payment Mode',
          'field': 'PaymentMode',
          'type': 'string',
          'operator': 'equal',
          'value': 'Cash'
        }]
      }
    }
  },
  methods: {
    onPaymentChange(event) {
      const elem = document.querySelector('.e-rule-value');
      const qryBldrObj = getComponent(document.querySelector('div'), 'query-builder');
      qryBldrObj.notifyChange(event.value, elem, 'value');
    },
    paymentTemplate() {
      return { 
        template: {
          create: () => {
            const div = document.createElement('div');
            return div;
          },
          write: (args) => {
            const dropdown = new DropDownListComponent({
              dataSource: ['Cash', 'Debit Card', 'Credit Card', 'Net Banking', 'Wallet'],
              value: args.values,
              change: (e) => {
                this.$refs.qb.notifyChange(e.value, e.element, 'value');
              }
            });
            dropdown.appendTo(args.element);
          }
        }
      };
    }
  }
}
</script>
```

---

## Rule Template

Create a completely custom rule UI (e.g., with sliders, color pickers, etc.).

### Rule Template with Slider

```vue
<template>
  <div>
    <ejs-querybuilder 
      id="querybuilder"
      ref="querybuilder"
      :rule="importRules"
      @actionBegin="actionBegin">
      <e-columns>
        <e-column field='EmployeeID' label='Employee ID' type='number' />
        <e-column field='FirstName' label='First Name' type='string' />
        <e-column 
          field='Age' 
          label='Age' 
          type='number' 
          :ruleTemplate='ageTemplate' />
      </e-columns>
    </ejs-querybuilder>
  </div>
</template>

<script>
import { QueryBuilderComponent, ColumnDirective, ColumnsDirective } from '@syncfusion/ej2-vue-querybuilder';
import { SliderComponent } from "@syncfusion/ej2-vue-inputs";
import { DropDownListComponent } from "@syncfusion/ej2-vue-dropdowns";
import { getComponent } from '@syncfusion/ej2-base';

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective,
    "ejs-dropdownlist": DropDownListComponent,
    "ejs-slider": SliderComponent
  },
  data() {
    return {
      importRules: {
        'condition': 'and',
        'rules': [{
          'label': 'Age',
          'field': 'Age',
          'type': 'number',
          'operator': 'greaterthanorequal',
          'value': 30
        }]
      }
    }
  },
  methods: {
    ageTemplate() {
      return { 
        template: {
          create: () => {
            const div = document.createElement('div');
            div.className = 'e-rule e-rule-template';
            return div;
          },
          write: (args) => {
            const filterDiv = document.createElement('div');
            filterDiv.className = 'e-rule-filter';
            const sliderDiv = document.createElement('div');
            sliderDiv.className = 'e-slider-value';
            
            const dropdown = new DropDownListComponent({
              value: args.rule.field,
              dataSource: args.columns,
              fields: { text: 'label', value: 'field' },
              change: (e) => {
                this.$refs.querybuilder.notifyChange(e.value, e.element, 'field');
              }
            });
            dropdown.appendTo(filterDiv);
            
            const slider = new SliderComponent({
              min: 18,
              max: 70,
              value: args.rule.value || 30,
              ticks: { placement: 'Before', largeStep: 5, smallStep: 1, showSmallTicks: true },
              change: (e) => {
                if (e.isInteracted) {
                  this.$refs.querybuilder.notifyChange(e.value, e.element, 'value');
                }
              }
            });
            slider.appendTo(sliderDiv);
            
            args.element.appendChild(filterDiv);
            args.element.appendChild(sliderDiv);
          },
          destroy: (args) => {
            const slider = getComponent(document.getElementById(args.elementId), 'slider');
            if (slider) slider.destroy();
          }
        }
      };
    },
    actionBegin(args) {
      args.rule.operator = 'greaterthanorequal';
      if (args.requestType === 'template-initialize') {
        if (args.rule.value === '') {
          args.rule.value = 30;
        }
      }
      if (args.requestType === 'template-create') {
        const slider = getComponent(document.getElementById(args.ruleID + '_valuekey0'), 'slider');
        if (slider) slider.refresh();
      }
    }
  }
}
</script>

<style>
.e-rule-template {
  padding-bottom: 12px;
}
.e-slider-value {
  width: 40%;
  padding: 12px 0;
  display: inline-block;
}
</style>
```

---

## Template Lifecycle

Templates have three phases:

### 1. Create Phase

Initialize the template HTML:

```javascript
const template = {
  create: () => {
    return createElement('input', { attrs: { 'type': 'text' } });
  }
};
```

### 2. Write Phase

Populate and wire the component:

```javascript
const template = {
  write: (args) => {
    // args.element - DOM element
    // args.elements - Collection of elements
    // args.elementId - Unique element ID
    // args.operator - Current operator
    // args.values - Current values
    
    const dropdown = new DropDownList({
      dataSource: ['Option1', 'Option2'],
      value: args.values,
      change: (e) => {
        querybuilder.notifyChange(e.value, e.element);
      }
    });
    dropdown.appendTo('#' + args.elements.id);
  }
};
```

### 3. Destroy Phase

Clean up when template is removed:

```javascript
const template = {
  destroy: (args) => {
    // args.elementId - ID of element being destroyed
    const component = getComponent(document.getElementById(args.elementId), 'dropdownlist');
    if (component) {
      component.destroy();
    }
  }
};
```

---

## Examples

### Example 1: Multiple Payment Methods

```javascript
const columnTemplate = {
  create: () => createElement('input'),
  destroy: (args) => {
    const multiselect = getComponent(document.getElementById(args.elementId), 'multiselect');
    if (multiselect) multiselect.destroy();
  },
  write: (args) => {
    const paymentModes = ['Cash', 'Card', 'Check', 'Online'];
    
    if (['in', 'notin'].includes(args.operator)) {
      // Multiple selection for 'in' operator
      const multiselect = new MultiSelect({
        dataSource: paymentModes,
        value: args.values,
        mode: 'CheckBox',
        change: (e) => {
          querybuilder.notifyChange(e.value, e.element);
        }
      });
      multiselect.appendTo('#' + args.elements.id);
    } else {
      // Single selection for other operators
      const dropdown = new DropDownList({
        dataSource: paymentModes,
        value: args.values,
        change: (e) => {
          querybuilder.notifyChange(e.itemData.value, e.element);
        }
      });
      dropdown.appendTo('#' + args.elements.id);
    }
  }
};
```

### Example 2: Date Range Picker

```javascript
const dateRangeTemplate = {
  create: () => createElement('div'),
  write: (args) => {
    if (['in', 'notin'].includes(args.operator)) {
      // Show date range picker
      const daterangepicker = new DateRangePickerComponent({
        value: args.values,
        change: (e) => {
          querybuilder.notifyChange(e.value, e.element);
        }
      });
      daterangepicker.appendTo('#' + args.elements.id);
    }
  },
  destroy: (args) => {
    const picker = getComponent(document.getElementById(args.elementId), 'daterangepicker');
    if (picker) picker.destroy();
  }
};
```

---

## Best Practices

### 1. Always Implement Destroy
```javascript
destroy: (args) => {
  const component = getComponent(document.getElementById(args.elementId), 'componentType');
  if (component) {
    component.destroy();
  }
}
```

### 2. Use notifyChange for Updates
```javascript
querybuilder.notifyChange(newValue, element, 'value');
```

### 3. Validate Operator Types
```javascript
write: (args) => {
  const isMultiValue = ['in', 'notin', 'between'].includes(args.operator);
  if (isMultiValue) {
    // Show multi-select
  } else {
    // Show single-select
  }
}
```

### 4. Handle Null/Empty Values
```javascript
const value = args.values || defaultValue;
```

### 5. Refresh Components When Needed
```javascript
if (args.requestType === 'template-create') {
  getComponent(element, 'slider').refresh();
}
```

---

## Next Steps

- See [rules-and-filtering.md](rules-and-filtering.md) for managing rules
- See [import-export.md](import-export.md) for saving/loading rules
- See [advanced-features.md](advanced-features.md) for complex scenarios
