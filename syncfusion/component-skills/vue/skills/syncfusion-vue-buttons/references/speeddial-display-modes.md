# SpeedDial Display Modes

> Configure how SpeedDial items display.

---

## Linear Mode

Items display in a line:

```vue
<template>
  <ejs-speeddial 
    :items="items"
    iconCss="e-icons e-plus"
    :mode="'Linear'"
  ></ejs-speeddial>
</template>

<script setup>
import { SpeedDialComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-speeddial": SpeedDialComponent
  }
}

const items = [
  { text: 'Item 1', icon: 'e-icons e-cut' },
  { text: 'Item 2', icon: 'e-icons e-copy' },
  { text: 'Item 3', icon: 'e-icons e-paste' }
];
</script>
```

## Radial Mode

Items display in a circle:

```vue
<template>
  <ejs-speeddial 
    :items="items"
    iconCss="e-icons e-plus"
    :mode="'Radial'"
  ></ejs-speeddial>
</template>

<script setup>
import { SpeedDialComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-speeddial": SpeedDialComponent
  }
}

const items = [
  { text: 'Email', icon: 'e-icons e-mail' },
  { text: 'Phone', icon: 'e-icons e-phone' },
  { text: 'Chat', icon: 'e-icons e-chat' }
];
</script>
```

## Quad Mode

Items display in quadrants:

```vue
<template>
  <ejs-speeddial 
    :items="items"
    iconCss="e-icons e-plus"
    :mode="'Quad'"
  ></ejs-speeddial>
</template>

<script setup>
import { SpeedDialComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-speeddial": SpeedDialComponent
  }
}

const items = [
  { text: 'Top', icon: 'e-icons e-upload' },
  { text: 'Bottom', icon: 'e-icons e-download' },
  { text: 'Left', icon: 'e-icons e-arrow-left' },
  { text: 'Right', icon: 'e-icons e-arrow-right' }
];
</script>
```

---

## Next Steps

- Explore positions in [speeddial-positions.md](speeddial-positions.md)
