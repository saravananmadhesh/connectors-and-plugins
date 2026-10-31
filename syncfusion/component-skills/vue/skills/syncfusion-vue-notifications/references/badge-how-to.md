# Badge How-To Guides (Vue 3)

## Table of Contents
- [Integrate Badge into ListView](#integrate-badge-into-listview)
- [Dynamic Badge Content](#dynamic-badge-content)
- [Reactive Badge Count from a Composable](#reactive-badge-count-from-a-composable)

---

## Integrate Badge into ListView

Badges can be embedded directly in `ListViewComponent` item templates to display notification counts or status alongside list entries. The badge automatically scales to match the list item height — no manual size configuration is needed.

**When to use:** Email inboxes, notification panels, sidebar navigation with unread counts.

> Install `@syncfusion/ej2-vue-lists` for `ListViewComponent`:
> `npm install @syncfusion/ej2-vue-lists --save`

```vue
<template>
  <div class="sample_container badge-list">
    <ListViewComponent
      id="lists"
      :dataSource="dataSource"
      :fields="fields"
      headerTitle="Inbox"
      :showHeader="true"
      :template="template"
      :actionComplete="onActionComplete"
    />
  </div>
</template>

<script setup>
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const dataSource = [
  { id: 'p_01', text: 'Primary',    messages: '3 New',  badge: 'e-badge e-badge-primary',   icons: 'primary',   type: 'Primary' },
  { id: 'p_02', text: 'Social',     messages: '27 New', badge: 'e-badge e-badge-secondary',  icons: 'social',    type: 'Primary' },
  { id: 'p_03', text: 'Promotions', messages: '7 New',  badge: 'e-badge e-badge-success',    icons: 'promotion', type: 'Primary' },
  { id: 'p_04', text: 'Updates',    messages: '13 New', badge: 'e-badge e-badge-info',        icons: 'updates',   type: 'Primary' },
  { id: 'p_05', text: 'Starred',    messages: '',       badge: '',                            icons: 'starred',   type: 'All Labels' },
  { id: 'p_06', text: 'Important',  messages: '2 New',  badge: 'e-badge e-badge-danger',      icons: 'important', type: 'All Labels' },
  { id: 'p_07', text: 'Sent',       messages: '',       badge: '',                            icons: 'sent',      type: 'All Labels' },
  { id: 'p_08', text: 'Outbox',     messages: '',       badge: '',                            icons: 'outbox',    type: 'All Labels' },
  { id: 'p_09', text: 'Drafts',     messages: '7 New',  badge: 'e-badge e-badge-warning',     icons: 'draft',     type: 'All Labels' },
];

const fields = { groupBy: 'type' };

// Vue's render-function equivalent of a JSX template literal.
// The Vue ListView template expects a function that returns an HTMLElement.
const template = (data) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'listWrapper';
  wrapper.style.width = 'inherit';
  wrapper.style.height = 'inherit';

  const icon = document.createElement('span');
  icon.className = `${data.icons} list_svg`;
  icon.innerHTML = '&nbsp;';
  wrapper.appendChild(icon);

  const text = document.createElement('span');
  text.className = 'list_text';
  text.textContent = data.text;
  wrapper.appendChild(text);

  if (data.badge) {
    const badge = document.createElement('span');
    badge.className = data.badge;
    badge.style.float = 'right';
    badge.style.marginTop = '16px';
    badge.style.fontSize = '12px';
    badge.textContent = data.messages;
    wrapper.appendChild(badge);
  }

  return wrapper;
};

const onActionComplete = () => {
  const list = document.getElementById('lists').getElementsByClassName('e-list-group-item')[0];
  if (list) list.style.display = 'none';
};
</script>
```

**Key points:**
- Store badge CSS classes in the data source (`badge` field) so each item controls its own badge color independently.
- Items without a badge have an empty string for the `badge` field — the template renders nothing in that case.
- `onActionComplete` hides the first group header if not needed.

> For a Vue-native approach, prefer an explicit `<template>` slot or the `ScopedSlot` pattern, but the `ListViewComponent` template prop accepts a function returning DOM nodes for maximum flexibility.

---

## Dynamic Badge Content

Many applications need badge counts that update in response to user actions or incoming data. Because Badge is CSS-only, you can update the badge text content directly via Vue's reactive `ref`s or via DOM queries:

**When to use:** Inbox counters that increment on new messages, notification panels with live updates.

```vue
<template>
  <div class="sample_container badge-list">
    <ListViewComponent
      id="lists"
      :dataSource="dataSource"
      :fields="fields"
      headerTitle="Inbox"
      :showHeader="true"
      :template="listTemplate"
    />
    <p class="crossline" />
    <span class="incr_button">
      <button class="e-btn e-primary" @click="onClick">Increment Badge Count</button>
    </span>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const dataSource = [
  { id: 'p_01', text: 'Primary',    badge: 'e-badge e-badge-primary',   icons: 'primary',   type: 'Primary' },
  { id: 'p_02', text: 'Social',     badge: 'e-badge e-badge-secondary',  icons: 'social',    type: 'Primary' },
  { id: 'p_03', text: 'Promotions', badge: 'e-badge e-badge-success',    icons: 'promotion', type: 'Primary' },
  { id: 'p_04', text: 'Updates',    badge: 'e-badge e-badge-info',        icons: 'updates',   type: 'Primary' },
  { id: 'p_05', text: 'Starred',    badge: '',                            icons: 'starred',   type: 'All Labels' },
  { id: 'p_06', text: 'Important',  badge: 'e-badge e-badge-danger',      icons: 'important', type: 'All Labels' },
  { id: 'p_07', text: 'Sent',       badge: '',                            icons: 'sent',      type: 'All Labels' },
  { id: 'p_08', text: 'Outbox',     badge: '',                            icons: 'outbox',    type: 'All Labels' },
  { id: 'p_09', text: 'Drafts',     badge: 'e-badge e-badge-warning',     icons: 'draft',     type: 'All Labels' },
];

const fields = { groupBy: 'type' };

// Initial badge values mapped by list item text
const Values = reactive({
  Primary: 3,
  Social: 27,
  Promotions: 7,
  Updates: 13,
  Drafts: 7,
  Important: 2
});

// Vue render-function template for ListView items
const listTemplate = (data) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'listWrapper';
  wrapper.style.width = 'inherit';
  wrapper.style.height = 'inherit';

  const icon = document.createElement('span');
  icon.className = `${data.icons} list_svg`;
  icon.innerHTML = '&nbsp;';
  wrapper.appendChild(icon);

  const text = document.createElement('span');
  text.className = 'list_text';
  text.textContent = data.text;
  wrapper.appendChild(text);

  if (data.badge) {
    const badge = document.createElement('span');
    badge.className = data.badge;
    badge.style.float = 'right';
    badge.style.marginTop = '16px';
    badge.style.fontSize = '12px';
    badge.textContent = `${Values[data.text]} New`;
    wrapper.appendChild(badge);
  }

  return wrapper;
};

// Increment all badge counts by mutating reactive state and re-rendering
const onClick = () => {
  for (const key in Values) {
    Values[key] += 1;
  }
  // Re-trigger template by reassigning the function (ListView caches it)
  // Alternatively, query the DOM and update textContent directly
  const badgeElements = Array.from(
    document.getElementById('lists').getElementsByClassName('e-badge')
  );
  badgeElements.forEach((el) => {
    const current = el.textContent.split(' ')[0];
    el.textContent = `${Number(current) + 1} New`;
  });
};
</script>
```

**Key points:**
- Badge text follows the pattern `"{count} New"` — the increment splits on the space and parses the number.
- `getElementsByClassName('e-badge')` selects all badge elements within the list container by ID (`lists`).
- For real-time updates (WebSockets, polling), call the same update logic inside your data handler instead of the button `@click`.

---

## Reactive Badge Count from a Composable

For modern Vue 3 apps, prefer a fully reactive approach using a composable and `<template>` rendering instead of imperative DOM queries:

```ts
// composables/useInboxCounts.ts
import { reactive, readonly } from 'vue';

const state = reactive({
  Primary: 3,
  Social: 27,
  Promotions: 7,
  Updates: 13,
  Drafts: 7,
  Important: 2
});

export function useInboxCounts() {
  const increment = (key) => state[key]++;
  const incrementAll = () => {
    for (const key in state) state[key]++;
  };
  return {
    counts: readonly(state),
    increment,
    incrementAll
  };
}
```

```vue
<template>
  <ul class="inbox-list">
    <li v-for="item in items" :key="item.key" class="inbox-item">
      <span :class="item.icon" />
      <span class="inbox-text">{{ item.label }}</span>
      <span v-if="counts[item.key] !== undefined" :class="['e-badge', item.badgeClass, 'e-badge-pill']">
        {{ counts[item.key] }} New
      </span>
    </li>
  </ul>
  <button @click="incrementAll">Increment All</button>
</template>

<script setup>
import { useInboxCounts } from '@/composables/useInboxCounts';

const { counts, incrementAll } = useInboxCounts();

const items = [
  { key: 'Primary',    label: 'Primary',    icon: 'primary-icon',   badgeClass: 'e-badge-primary' },
  { key: 'Social',     label: 'Social',     icon: 'social-icon',    badgeClass: 'e-badge-secondary' },
  { key: 'Promotions', label: 'Promotions', icon: 'promotion-icon', badgeClass: 'e-badge-success' },
  { key: 'Updates',    label: 'Updates',    icon: 'updates-icon',   badgeClass: 'e-badge-info' },
  { key: 'Drafts',     label: 'Drafts',     icon: 'draft-icon',     badgeClass: 'e-badge-warning' },
  { key: 'Important',  label: 'Important',  icon: 'important-icon', badgeClass: 'e-badge-danger' }
];
</script>
```

> Vue's reactivity system automatically re-renders the badges when `counts[key]` changes. No DOM queries or manual subscriptions required. The `readonly()` wrapper prevents direct mutation, encouraging the use of composable methods.
