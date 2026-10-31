# FloatingActionButton API Reference

> Complete API for FAB component properties, methods, and events.

---

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `icon-css` | string | '' | Icon CSS class |
| `position` | string | 'BottomRight' | FAB position |
| `is-primary` | boolean | true | Primary style |
| `css-class` | string | '' | Custom CSS class |
| `disabled` | boolean | false | Disable FAB |
| `visible` | boolean | true | Visibility |

## Methods

### click()
Trigger FAB click programmatically:

```vue
<script setup>
const fab = ref(null);
fab.value?.click();
</script>
```

## Events

### click
Fired when FAB is clicked:

```vue
@click="args => console.log('Clicked', args)"
```

### created
Fired when FAB is created:

```vue
@created="() => console.log('Created')"
```

### destroyed
Fired when FAB is destroyed:

```vue
@destroyed="() => console.log('Destroyed')"
```

---

## Complete Example

```vue
<template>
  <ejs-fab 
    ref="fab"
    iconCss="e-icons e-plus"
    position="BottomRight"
    cssClass="e-primary"
    :disabled="isDisabled"
    aria-label="Create new"
    @click="onAdd"
  ></ejs-fab>
</template>

<script setup>
import { ref } from 'vue';
import { FabComponent } from '@syncfusion/ej2-vue-buttons';

const fab = ref(null);
const isDisabled = ref(false);

const onAdd = () => {
  console.log('Add action');
};
</script>
```

---

## Next Steps

- Return to [SKILL.md](../SKILL.md) for overview
