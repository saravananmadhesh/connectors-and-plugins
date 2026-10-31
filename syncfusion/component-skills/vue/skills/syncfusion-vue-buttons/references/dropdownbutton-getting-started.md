# DropdownButton Getting Started

> Learn how to set up and use Syncfusion DropdownButton component in Vue 3.

---

## Table of Contents

1. [Installation](#installation)
2. [CSS Imports](#css-imports)
3. [Creating Your First DropdownButton](#creating-your-first-dropdownbutton)
4. [Adding Menu Items](#adding-menu-items)
5. [Handling Events](#handling-events)
6. [Running the App](#running-the-app)

---

## Installation

Install the required Syncfusion packages:

```bash
npm install @syncfusion/ej2-vue-splitbuttons @syncfusion/ej2-base
```

---

## CSS Imports

Import the required CSS files in your component:

```vue
<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/drop-down-button/index.css";
</style>
```

**Available Themes:**
- `tailwind3.css` (default)
- `material.css`
- `bootstrap5.css`
- `bootstrap.css`
- `fabric.css`
- `fluent.css`

---

## Creating Your First DropdownButton

Create a basic DropdownButton:

```vue
<template>
  <div class="example-section">
    <h2>Basic DropdownButton</h2>

    <ejs-dropdownbutton :items="items">Options</ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      items: [
        { text: 'Option 1' },
        { text: 'Option 2' },
        { text: 'Option 3' }
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

## Adding Menu Items

Add dropdown menu items:

```vue
<template>
  <div class="example-section">
    <h2>DropdownButton with Menu Items</h2>

    <ejs-dropdownbutton
      :items="menuItems"
      @select="onItemSelect"
    >{{ selectedItem }}</ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      menuItems: [
        { text: 'Cut' },
        { text: 'Copy' },
        { text: 'Paste' },
        { separator: true },
        { text: 'Delete' }
      ],
      selectedItem: 'Edit'
    };
  },
  methods: {
    onItemSelect(args) {
      this.selectedItem = args.item ? args.item.text : 'Edit';
      console.log('Selected:', args.item ? args.item.text : '');
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

## Handling Events

Respond to dropdown button events:

```vue
<template>
  <div class="example-section">
    <h2>Event Handling</h2>

    <ejs-dropdownbutton
      :items="menuItems"
      @open="onOpen"
      @close="onClose"
      @select="onSelect"
      @created="onCreated"
    >Actions</ejs-dropdownbutton>

    <div class="event-log">
      <p v-for="(log, index) in logs" :key="index">
        {{ log }}
      </p>
    </div>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      menuItems: [
        { text: 'Save' },
        { text: 'Open' },
        { text: 'Recent' }
      ],
      logs: []
    };
  },
  methods: {
    addLog(message) {
      const timestamp = new Date().toLocaleTimeString();
      this.logs.push(`[${timestamp}] ${message}`);
      if (this.logs.length > 5) {
        this.logs.shift();
      }
    },
    onOpen() {
      this.addLog('Dropdown opened');
    },
    onClose() {
      this.addLog('Dropdown closed');
    },
    onSelect(args) {
      this.addLog(`Selected: ${args.item ? args.item.text : ''}`);
    },
    onCreated() {
      this.addLog('Component created');
    }
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

.event-log {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
}

.event-log p {
  margin: 4px 0;
  font-size: 12px;
  font-family: monospace;
  color: #333;
}
</style>
```

---

## Running the App

Start your development server:

```bash
npm run dev
```

Your DropdownButton will be available at `http://localhost:5173` (or your configured port).

---

## Browser Support

Supported browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Next Steps

- Learn about menu items in [dropdownbutton-popup-items.md](dropdownbutton-popup-items.md)
- Add icons and layout in [dropdownbutton-icons-and-layout.md](dropdownbutton-icons-and-layout.md)
- Explore styling in [dropdownbutton-appearance-and-styling.md](dropdownbutton-appearance-and-styling.md)
- Check events in [dropdownbutton-events-and-interactivity.md](dropdownbutton-events-and-interactivity.md)
