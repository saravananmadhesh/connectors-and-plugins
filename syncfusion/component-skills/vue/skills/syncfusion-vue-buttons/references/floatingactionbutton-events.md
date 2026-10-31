# FloatingActionButton Events

> Handle FAB click and interaction events.

---

## Click Event

Handle FAB clicks:

```vue
<template>
  <ejs-fab 
    iconCss="e-icons e-plus"
    @click="onFabClick"
  ></ejs-fab>
</template>

<script setup>
import { ref } from 'vue';
import { FabComponent } from '@syncfusion/ej2-vue-buttons';

const clickCount = ref(0);

const onFabClick = () => {
  clickCount.value++;
  console.log(`Clicked ${clickCount.value} times`);
};
</script>
```

## Multiple Events

Handle various FAB events:

```vue
<template>
  <ejs-fab 
    iconCss="e-icons e-plus"
    @click="onClick"
    @created="onCreated"
    @destroyed="onDestroyed"
  ></ejs-fab>
</template>

<script setup>
import { FabComponent } from '@syncfusion/ej2-vue-buttons';

const onClick = (args) => {
  console.log('FAB clicked:', args);
};

const onCreated = () => {
  console.log('FAB created');
};

const onDestroyed = () => {
  console.log('FAB destroyed');
};
</script>
```

---

## Next Steps

- View accessibility in [floatingactionbutton-accessibility.md](floatingactionbutton-accessibility.md)
