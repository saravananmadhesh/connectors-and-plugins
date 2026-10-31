# ListView Accessibility & Events (Vue 3)

## Table of Contents
- [WCAG 2.1 Level AA Compliance](#wcag-21-level-aa-compliance)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [ARIA Attributes](#aria-attributes)
- [Event Lifecycle](#event-lifecycle)

## WCAG 2.1 Level AA Compliance

The ListView component follows WCAG 2.1 Level AA standards for accessible lists.

### Key Compliance Features

- Semantic list structure (`<ul>`, `<li>`)
- ARIA roles and properties
- Keyboard navigation support
- Focus management
- Screen reader announcements
- High contrast support

## Keyboard Navigation

### Default Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus into/out of list |
| `Arrow Down` | Move focus to next item |
| `Arrow Up` | Move focus to previous item |
| `Home` | Move focus to first item |
| `End` | Move focus to last item |
| `Enter` / `Space` | Select focused item |
| `Ctrl/Cmd + A` | Select all (with checkboxes) |
| `Esc` | Clear selection / cancel action |

### Custom Keyboard Handlers

```vue
<template>
  <div @keydown="onKeyDown">
    <ListViewComponent :dataSource="items" :fields="fields" />
  </div>
</template>

<script setup>
const onKeyDown = (event) => {
  if (event.ctrlKey && event.key === 'a') {
    event.preventDefault();
    // Select all items
    items.value.forEach(i => i.isChecked = true);
  }

  if (event.key === 'Delete') {
    event.preventDefault();
    // Remove selected items
    removeSelected();
  }
};

const removeSelected = () => {
  const toRemove = items.value.filter(i => i.isChecked);
  listViewRef.value?.removeMultipleItems(toRemove);
};
</script>
```

### Focus Indicators

```vue
<style>
.e-list-item:focus {
  outline: 2px solid #0066cc;
  outline-offset: -2px;
  background: #f0f8ff;
}

.e-list-item:focus:not(:focus-visible) {
  outline: none;
}

.e-list-item:focus-visible {
  outline: 2px solid #0066cc;
}
</style>
```

## Screen Reader Support

### Default ARIA Roles

The component automatically applies:

- `role="listbox"` on the list container
- `role="option"` on each item
- `aria-selected` for selected items
- `aria-disabled` for disabled items
- `aria-label` for context

### Status Announcements

```vue
<template>
  <div>
    <div
      ref="liveRegion"
      aria-live="polite"
      aria-atomic="true"
      class="sr-only"
    >
      {{ announcement }}
    </div>
    <ListViewComponent
      :dataSource="items"
      :fields="fields"
      :showCheckBox="true"
      @change="announceChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const announcement = ref('');

const announceChange = () => {
  const selected = items.value.filter(i => i.isChecked);
  announcement.value = `${selected.length} of ${items.value.length} items selected`;
};
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
```

### Item-Level Labels

```vue
<script setup>
import { ref, onMounted, nextTick } from 'vue';

const listViewRef = ref(null);

onMounted(async () => {
  await nextTick();
  const items = document.querySelectorAll('.e-list-item');
  items.forEach((item, index) => {
    const text = item.textContent.trim();
    item.setAttribute('aria-label', `Item ${index + 1}: ${text}`);
  });
});
</script>
```

## ARIA Attributes

### Custom ARIA Attributes

```vue
<template>
  <ListViewComponent
    :dataSource="items"
    :fields="fields"
    :htmlAttributes="htmlAttrs"
  />
</template>

<script setup>
const htmlAttrs = {
  'aria-label': 'Todo list',
  'aria-describedby': 'todo-instructions',
  role: 'listbox',
  'aria-multiselectable': 'true'
};
</script>
```

### Instructions Element

```vue
<template>
  <div>
    <p id="todo-instructions" class="instructions">
      Use arrow keys to navigate. Press space to select items.
    </p>
    <ListViewComponent
      :dataSource="items"
      :fields="fields"
      :htmlAttributes="htmlAttrs"
    />
  </div>
</template>
```

### Disabled State

```vue
<script setup>
const items = ref([
  { id: 1, text: 'Available', isEnabled: true },
  { id: 2, text: 'Unavailable', isEnabled: false }
]);

const fields = { id: 'id', text: 'text', enabled: 'isEnabled' };
</script>

<style>
.e-list-item[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

## Event Lifecycle

### Event Sequence: Item Selection

1. `actionBegin` - Action started
2. Internal selection state updates
3. `select` - Item selected (with details)
4. `actionComplete` - Action completed

### Event Sequence: Data Update

1. Data source changes
2. `change` - Change event fires
3. List re-renders

### Listening to All Events

```vue
<template>
  <ListViewComponent
    :dataSource="items"
    :fields="fields"
    :select="onSelect"
    :actionBegin="onActionBegin"
    :actionComplete="onActionComplete"
    :actionFailure="onActionFailure"
    :change="onChange"
    :scroll="onScroll"
  />
</template>

<script setup>
const onSelect = (args) => {
  console.log('Select:', args);
};

const onActionBegin = (args) => {
  console.log('Action begin:', args);
  // args.action - 'select' | 'remove' | etc.
};

const onActionComplete = (args) => {
  console.log('Action complete:', args);
};

const onActionFailure = (args) => {
  console.error('Action failed:', args);
};

const onChange = (args) => {
  console.log('Data changed:', args);
};

const onScroll = (args) => {
  // Load more on near-bottom
  if (args.scrollDirection === 'Down' && nearBottom(args)) {
    loadMore();
  }
};

const nearBottom = (args) => {
  // Custom check based on scroll position
  return false;
};
</script>
```

### Event Argument Reference

```typescript
interface SelectEventArgs {
  item: object | object[];
  text: string;
  index: number;
  event: Event;
  isInteracted: boolean;
  cancel: boolean;
}

interface ActionEventArgs {
  action: string;          // 'select' | 'remove' | 'add' etc.
  items: object[];
  cancel: boolean;
}

interface ChangeEventArgs {
  data: object[];          // Current data
  previousData: object[];  // Previous data
  changes: {
    added: object[];
    removed: object[];
    modified: object[];
  };
}

interface ScrollEventArgs {
  scrollDirection: 'Up' | 'Down' | 'Left' | 'Right';
  scrollTop: number;
  scrollLeft: number;
  distanceFromTop: number;
  distanceFromBottom: number;
}
```

## Best Practices for Accessibility

1. **Always provide meaningful item text**: Avoid generic labels like "Item 1"

2. **Use proper heading hierarchy**: List title should match surrounding content structure

3. **Test with actual screen readers**: NVDA, JAWS, VoiceOver, TalkBack

4. **Provide keyboard alternatives**: All mouse actions should be keyboard accessible

5. **Use ARIA live regions**: For dynamic content changes

6. **Maintain focus visibility**: Always show focus indicator

7. **Avoid auto-focus**: Don't auto-focus lists on page load

8. **Group related items**: Use semantic grouping with proper ARIA roles

9. **Provide instructions**: Help text for complex interactions

10. **Test with high contrast modes**: Ensure visibility in high contrast

## Sample Accessible Implementation

```vue
<template>
  <div class="accessible-list">
    <h2 id="list-title">Email Folders</h2>
    <p id="list-instructions">
      Use Tab to focus the list. Use arrow keys to navigate items. Press Enter to open a folder.
    </p>

    <ListViewComponent
      :dataSource="items"
      :fields="fields"
      :htmlAttributes="htmlAttrs"
      :select="onSelect"
    />

    <div
      aria-live="polite"
      aria-atomic="true"
      class="sr-only"
    >
      {{ announcement }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const announcement = ref('');

const items = ref([
  { id: 'inbox', text: 'Inbox', count: 5 },
  { id: 'sent', text: 'Sent', count: 0 },
  { id: 'drafts', text: 'Drafts', count: 2 }
]);

const fields = { id: 'id', text: 'text' };

const htmlAttrs = {
  'aria-labelledby': 'list-title',
  'aria-describedby': 'list-instructions',
  role: 'listbox'
};

const onSelect = (args) => {
  announcement.value = `${args.text} folder selected`;
  // Navigate to folder
};
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
```

**Next:** Return to the [SKILL.md](../SKILL.md#listview) for the complete ListView overview.
