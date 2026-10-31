# DropdownButton ListView Integration

> Integrate Syncfusion ListView component with DropdownButton for advanced list displays.

---

## Table of Contents

1. [Basic ListView Integration](#basic-listview-integration)
2. [Data Binding](#data-binding)
3. [Selection Handling](#selection-handling)
4. [Grouped Lists](#grouped-lists)
5. [Virtual Lists](#virtual-lists)

---

## Basic ListView Integration

Integrate ListView with DropdownButton:

```vue
<template>
  <div class="example-section">
    <h2>ListView with DropdownButton</h2>

    <ejs-dropdownbutton>
      <template #popupTemplate>
        <ejs-listview :dataSource="listItems" @select="onListItemSelect"></ejs-listview>
      </template>
      Select Item
    </ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

export default {
  name: 'App',
  components: {
    'ejs-dropdownbutton': DropDownButtonComponent,
    'ejs-listview': ListViewComponent
  },
  data() {
    return {
      listItems: [
        { id: '1', text: 'Option 1' },
        { id: '2', text: 'Option 2' },
        { id: '3', text: 'Option 3' }
      ]
    };
  },
  methods: {
    onListItemSelect(args) {
      console.log('Selected:', args.data ? args.data.text : '');
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

## Data Binding

Bind data to ListView in dropdown:

```vue
<template>
  <div class="example-section">
    <h2>Data Binding</h2>

    <ejs-dropdownbutton :items="dropdownItems">
      <template #popupTemplate>
        <ejs-listview
          :dataSource="boundData"
          :fields="listFields"
          @select="onSelect"
        ></ejs-listview>
      </template>
      Users
    </ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

export default {
  name: 'App',
  components: {
    'ejs-dropdownbutton': DropDownButtonComponent,
    'ejs-listview': ListViewComponent
  },
  data() {
    return {
      dropdownItems: [
        { text: 'Select User' }
      ],
      listFields: { text: 'name', id: 'id' },
      boundData: [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
      ]
    };
  },
  methods: {
    onSelect(args) {
      console.log('User selected:', args.data ? args.data.name : '');
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

## Selection Handling

Handle ListView selections in dropdown:

```vue
<template>
  <div class="example-section">
    <h2>Selection Handling</h2>

    <ejs-dropdownbutton
      @select="onDropdownSelect"
      @close="onDropdownClose"
    >
      <template #popupTemplate>
        <ejs-listview
          ref="listView"
          :dataSource="items"
          :showCheckBox="true"
          @select="onListSelect"
        ></ejs-listview>
      </template>
      {{ selectionText }}
    </ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

export default {
  name: 'App',
  components: {
    'ejs-dropdownbutton': DropDownButtonComponent,
    'ejs-listview': ListViewComponent
  },
  data() {
    return {
      items: [
        { id: 1, text: 'Item 1' },
        { id: 2, text: 'Item 2' },
        { id: 3, text: 'Item 3' }
      ],
      selectedItems: []
    };
  },
  computed: {
    selectionText() {
      if (this.selectedItems.length === 0) {
        return 'Select Items';
      }
      return `Selected: ${this.selectedItems.length}`;
    }
  },
  methods: {
    onListSelect(args) {
      const text = args.data ? args.data.text : '';
      if (text && !this.selectedItems.includes(text)) {
        this.selectedItems.push(text);
      }
    },
    onDropdownSelect(args) {
      console.log('Selection:', this.selectedItems);
    },
    onDropdownClose() {
      // Save selections when dropdown closes
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

## Grouped Lists

Display grouped data in ListView:

```vue
<template>
  <div class="example-section">
    <h2>Grouped ListView</h2>

    <ejs-dropdownbutton>
      <template #popupTemplate>
        <ejs-listview
          :dataSource="groupedData"
          :fields="listFields"
        ></ejs-listview>
      </template>
      Categories
    </ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

export default {
  name: 'App',
  components: {
    'ejs-dropdownbutton': DropDownButtonComponent,
    'ejs-listview': ListViewComponent
  },
  data() {
    return {
      listFields: { groupBy: 'category', text: 'name' },
      groupedData: [
        { id: 1, name: 'Chrome', category: 'Browsers' },
        { id: 2, name: 'Firefox', category: 'Browsers' },
        { id: 3, name: 'Safari', category: 'Browsers' },
        { id: 4, name: 'VS Code', category: 'Editors' },
        { id: 5, name: 'Sublime', category: 'Editors' }
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

## Virtual Lists

Implement virtualization for large datasets:

```vue
<template>
  <div class="example-section">
    <h2>Virtual List</h2>

    <ejs-dropdownbutton>
      <template #popupTemplate>
        <ejs-listview
          :dataSource="largeData"
          :enableVirtualization="true"
          :fields="listFields"
          height="300px"
        ></ejs-listview>
      </template>
      Large List
    </ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

export default {
  name: 'App',
  components: {
    'ejs-dropdownbutton': DropDownButtonComponent,
    'ejs-listview': ListViewComponent
  },
  data() {
    return {
      listFields: { text: 'name' },
      largeData: Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`
      }))
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

## Advanced Integration

Complex ListView integration patterns:

```vue
<template>
  <div class="example-section">
    <h2>Advanced Integration</h2>

    <ejs-dropdownbutton
      @select="onSelect"
      @open="onOpen"
      @close="onClose"
    >
      <template #popupTemplate>
        <div class="list-wrapper">
          <input
            v-model="searchText"
            type="text"
            placeholder="Search..."
            class="search-input"
          />
          <ejs-listview
            :dataSource="filteredData"
            @select="onListSelect"
          ></ejs-listview>
        </div>
      </template>
      {{ selectedText }}
    </ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

export default {
  name: 'App',
  components: {
    'ejs-dropdownbutton': DropDownButtonComponent,
    'ejs-listview': ListViewComponent
  },
  data() {
    return {
      data: [
        { id: 1, text: 'Apple' },
        { id: 2, text: 'Android' },
        { id: 3, text: 'Windows' },
        { id: 4, text: 'Linux' },
        { id: 5, text: 'macOS' }
      ],
      searchText: '',
      selectedText: 'Select OS'
    };
  },
  computed: {
    filteredData() {
      if (!this.searchText) {
        return this.data;
      }
      return this.data.filter(item =>
        item.text.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  },
  methods: {
    onListSelect(args) {
      this.selectedText = args.data ? args.data.text : 'Select OS';
    },
    onSelect(args) {
      console.log('Selection confirmed');
    },
    onOpen() {
      this.searchText = '';
    },
    onClose() {
      this.searchText = '';
    }
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

.list-wrapper {
  padding: 10px;
  min-width: 200px;
}

.search-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
```

---

## Next Steps

- Check accessibility in [dropdownbutton-accessibility.md](dropdownbutton-accessibility.md)
- View complete API reference in [SKILL.md](../SKILL.md)
- Learn events in [dropdownbutton-events-and-interactivity.md](dropdownbutton-events-and-interactivity.md)
