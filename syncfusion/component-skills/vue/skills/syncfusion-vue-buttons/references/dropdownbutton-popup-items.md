# DropdownButton Popup Items

> Configure and manage dropdown menu items in Syncfusion DropdownButton.

---

## Table of Contents

1. [Basic Menu Items](#basic-menu-items)
2. [Separator Items](#separator-items)
3. [Grouped Items](#grouped-items)
4. [Icon Support](#icon-support)
5. [Nested Menus](#nested-menus)

---

## Basic Menu Items

Define menu items structure:

```vue
<template>
  <div class="example-section">
    <h2>Basic Menu Items</h2>

    <ejs-dropdownbutton
      :items="basicItems"
      @select="onItemSelect"
    >File</ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      basicItems: [
        { text: 'New', id: 'new' },
        { text: 'Open', id: 'open' },
        { text: 'Save', id: 'save' },
        { text: 'Save As', id: 'saveas' }
      ]
    };
  },
  methods: {
    onItemSelect(args) {
      console.log('Selected:', args.item ? args.item.text : '', 'ID:', args.item ? args.item.id : '');
    }
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}
</style>
```

---

## Separator Items

Add visual separators between item groups:

```vue
<template>
  <div class="example-section">
    <h2>Items with Separators</h2>

    <ejs-dropdownbutton :items="itemsWithSeparators">Edit</ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      itemsWithSeparators: [
        { text: 'Cut' },
        { text: 'Copy' },
        { text: 'Paste' },
        { separator: true },
        { text: 'Select All' },
        { text: 'Find' },
        { separator: true },
        { text: 'Replace' }
      ]
    };
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}
</style>
```

---

## Grouped Items

Organize items in groups:

```vue
<template>
  <div class="example-section">
    <h2>Grouped Items</h2>

    <ejs-dropdownbutton :items="groupedItems">Project</ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      groupedItems: [
        {
          group: 'File',
          items: [
            { text: 'New' },
            { text: 'Open' },
            { text: 'Recent' }
          ]
        },
        { separator: true },
        {
          group: 'View',
          items: [
            { text: 'Zoom In' },
            { text: 'Zoom Out' },
            { text: 'Reset View' }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}
</style>
```

---

## Icon Support

Add icons to menu items:

```vue
<template>
  <div class="example-section">
    <h2>Items with Icons</h2>

    <ejs-dropdownbutton :items="itemsWithIcons">Format</ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      itemsWithIcons: [
        { text: 'Bold', iconCss: 'e-icons e-bold' },
        { text: 'Italic', iconCss: 'e-icons e-italic' },
        { text: 'Underline', iconCss: 'e-icons e-underline' },
        { separator: true },
        { text: 'Align Left', iconCss: 'e-icons e-align-left' },
        { text: 'Center', iconCss: 'e-icons e-align-center' },
        { text: 'Align Right', iconCss: 'e-icons e-align-right' }
      ]
    };
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}
</style>
```

---

## Nested Menus

Create nested dropdown menus:

```vue
<template>
  <div class="example-section">
    <h2>Nested Menus</h2>

    <ejs-dropdownbutton :items="nestedItems">Styles</ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      nestedItems: [
        {
          text: 'Basic Styles',
          items: [
            { text: 'Heading' },
            { text: 'Body Text' },
            { text: 'Quote' }
          ]
        },
        {
          text: 'Advanced Styles',
          items: [
            { text: 'Code Block' },
            { text: 'Table' },
            { text: 'List' }
          ]
        },
        { separator: true },
        { text: 'Clear Formatting' }
      ]
    };
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}
</style>
```

---

## Dynamic Items

Add/remove items dynamically:

```vue
<template>
  <div class="example-section">
    <h2>Dynamic Menu Items</h2>

    <div class="controls">
      <button @click="addItem">Add Item</button>
      <button @click="removeItem">Remove Last</button>
      <button @click="clearItems">Clear All</button>
    </div>

    <ejs-dropdownbutton
      :items="dynamicItems"
      @select="onItemSelect"
    >Dynamic ({{ dynamicItems.length }})</ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      dynamicItems: [
        { text: 'Initial Item 1' },
        { text: 'Initial Item 2' }
      ],
      itemCount: 2
    };
  },
  methods: {
    addItem() {
      this.itemCount++;
      this.dynamicItems.push({ text: `Item ${this.itemCount}` });
    },
    removeItem() {
      if (this.dynamicItems.length > 0) {
        this.dynamicItems.pop();
      }
    },
    clearItems() {
      this.dynamicItems = [];
      this.itemCount = 0;
    },
    onItemSelect(args) {
      console.log('Selected:', args.item ? args.item.text : '');
    }
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

.controls {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #1565c0;
}
</style>
```

---

## Next Steps

- Learn icons and layout in [dropdownbutton-icons-and-layout.md](dropdownbutton-icons-and-layout.md)
- Explore appearance in [dropdownbutton-appearance-and-styling.md](dropdownbutton-appearance-and-styling.md)
- Check events in [dropdownbutton-events-and-interactivity.md](dropdownbutton-events-and-interactivity.md)
- View templates in [dropdownbutton-item-template.md](dropdownbutton-item-template.md)
