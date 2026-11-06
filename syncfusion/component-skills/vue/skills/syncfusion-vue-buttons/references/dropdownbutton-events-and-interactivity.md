# DropdownButton Events and Interactivity

> Handle events and implement interactive behaviors for Syncfusion DropdownButton.

---

## Table of Contents

1. [Core Events](#core-events)
2. [Item Selection](#item-selection)
3. [Popup Events](#popup-events)
4. [Keyboard Interaction](#keyboard-interaction)
5. [Advanced Interactions](#advanced-interactions)

---

## Core Events

Handle DropdownButton events:

```vue
<template>
  <div class="example-section">
    <h2>DropdownButton Events</h2>

    <ejs-dropdownbutton
      :items="items"
      @open="onOpen"
      @close="onClose"
      @select="onSelect"
      @created="onCreated"
      @destroyed="onDestroyed"
    >Events</ejs-dropdownbutton>

    <div class="event-log">
      <h3>Event Log:</h3>
      <p v-for="(log, index) in eventLogs" :key="index">
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
      items: [
        { text: 'Item 1' },
        { text: 'Item 2' },
        { text: 'Item 3' }
      ],
      eventLogs: []
    };
  },
  methods: {
    addLog(message) {
      const timestamp = new Date().toLocaleTimeString();
      this.eventLogs.unshift(`[${timestamp}] ${message}`);
      if (this.eventLogs.length > 10) {
        this.eventLogs.pop();
      }
    },
    onOpen(args) {
      this.addLog('Dropdown opened');
    },
    onClose(args) {
      this.addLog('Dropdown closed');
    },
    onSelect(args) {
      this.addLog(`Selected: ${args.item ? args.item.text : ''}`);
    },
    onCreated(args) {
      this.addLog('Component created');
    },
    onDestroyed(args) {
      this.addLog('Component destroyed');
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
}

.event-log h3 {
  margin-top: 0;
  margin-bottom: 10px;
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

## Item Selection

React to item selection:

```vue
<template>
  <div class="example-section">
    <h2>Item Selection</h2>

    <ejs-dropdownbutton
      :items="menuItems"
      @select="onItemSelect"
    >{{ selectedAction }}</ejs-dropdownbutton>

    <div class="info">
      <p>Selected Item: <strong>{{ selectedItem }}</strong></p>
      <p>Action Performed: <strong>{{ actionStatus }}</strong></p>
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
        { text: 'Download', id: 'download' },
        { text: 'Upload', id: 'upload' },
        { text: 'Share', id: 'share' },
        { text: 'Archive', id: 'archive' }
      ],
      selectedItem: 'None',
      selectedAction: 'Actions',
      actionStatus: 'Waiting for selection'
    };
  },
  methods: {
    onItemSelect(args) {
      this.selectedItem = args.item ? args.item.text : '';
      this.selectedAction = args.item ? args.item.text : 'Actions';

      // Perform action based on selection
      switch (args.item ? args.item.id : null) {
        case 'download':
          this.actionStatus = 'Downloading file...';
          break;
        case 'upload':
          this.actionStatus = 'Upload dialog opened';
          break;
        case 'share':
          this.actionStatus = 'Share options shown';
          break;
        case 'archive':
          this.actionStatus = 'Archiving file...';
          break;
      }
    }
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

.info {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f7ff;
  border-left: 4px solid #1976d2;
  border-radius: 4px;
}

.info p {
  margin: 8px 0;
}
</style>
```

---

## Popup Events

Handle popup display events:

```vue
<template>
  <div class="example-section">
    <h2>Popup Events</h2>

    <ejs-dropdownbutton
      :items="items"
      @before-open="onBeforeOpen"
      @after-open="onAfterOpen"
      @before-close="onBeforeClose"
      @after-close="onAfterClose"
    >Popup Events</ejs-dropdownbutton>

    <div class="status">
      <p>Popup Status: <strong>{{ popupStatus }}</strong></p>
      <p>Open Count: <strong>{{ openCount }}</strong></p>
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
      items: [
        { text: 'Option 1' },
        { text: 'Option 2' }
      ],
      popupStatus: 'Closed',
      openCount: 0
    };
  },
  methods: {
    onBeforeOpen(args) {
      console.log('Before open');
    },
    onAfterOpen(args) {
      this.popupStatus = 'Open';
      this.openCount++;
    },
    onBeforeClose(args) {
      console.log('Before close');
    },
    onAfterClose(args) {
      this.popupStatus = 'Closed';
    }
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

.status {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.status p {
  margin: 8px 0;
}
</style>
```

---

## Keyboard Interaction

Support keyboard navigation:

```vue
<template>
  <div class="example-section">
    <h2>Keyboard Interaction</h2>
    <p class="hint">
      Keyboard Shortcuts:
      <br>Tab - Focus, Enter/Space - Open, Arrow Keys - Navigate, Escape - Close
    </p>

    <ejs-dropdownbutton
      :items="items"
      @key-down="onKeyDown"
    >Keyboard Support</ejs-dropdownbutton>
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
  },
  methods: {
    onKeyDown(args) {
      // Keyboard shortcuts handled by component
      // Tab: Move focus
      // Enter/Space: Open/Select
      // Arrow Keys: Navigate items
      // Escape: Close popup
    }
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

.hint {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #fff3cd;
  border-left: 4px solid #ffc107;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}
</style>
```

---

## Advanced Interactions

Complex interactive patterns:

```vue
<template>
  <div class="example-section">
    <h2>Advanced Interactions</h2>

    <ejs-dropdownbutton
      :items="dynamicItems"
      @select="onSelect"
      @open="onOpen"
    >{{ buttonText }}</ejs-dropdownbutton>

    <div class="info">
      <p>Last Action: {{ lastAction }}</p>
      <p>Item Count: {{ dynamicItems.length }}</p>
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
      dynamicItems: [
        { text: 'Recent 1' },
        { text: 'Recent 2' },
        { text: 'Recent 3' }
      ],
      lastAction: 'Waiting...'
    };
  },
  computed: {
    buttonText() {
      return `Options (${this.dynamicItems.length})`;
    }
  },
  methods: {
    onSelect(args) {
      this.lastAction = `Selected: ${args.item ? args.item.text : ''}`;

      // Move to top
      const index = this.dynamicItems.findIndex(
        item => item.text === (args.item ? args.item.text : '')
      );
      if (index > 0) {
        const [item] = this.dynamicItems.splice(index, 1);
        this.dynamicItems.unshift(item);
      }
    },
    onOpen() {
      this.lastAction = 'Dropdown opened';
    }
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

.info {
  margin-top: 20px;
  padding: 15px;
  background-color: #e8f5e9;
  border-left: 4px solid #4caf50;
  border-radius: 4px;
}

.info p {
  margin: 8px 0;
}
</style>
```

---

## Next Steps

- View templates in [dropdownbutton-item-template.md](dropdownbutton-item-template.md)
- Learn ListView integration in [dropdownbutton-listview-integration.md](dropdownbutton-listview-integration.md)
- Check accessibility in [dropdownbutton-accessibility.md](dropdownbutton-accessibility.md)
