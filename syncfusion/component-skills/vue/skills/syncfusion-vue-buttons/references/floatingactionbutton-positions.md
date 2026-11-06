# FloatingActionButton Positions

> Control FAB positioning on screen.

---

## Position Property

Set FAB position:

```vue
<template>
  <ejs-fab 
    iconCss="e-icons e-plus"
    position="BottomRight"
  ></ejs-fab>
</template>

<script setup>
import { FabComponent } from '@syncfusion/ej2-vue-buttons';
</script>
```

## Available Positions

| Position | Location |
|----------|----------|
| TopLeft | Top-left corner |
| TopCenter | Top-center |
| TopRight | Top-right corner |
| MiddleLeft | Middle-left |
| MiddleCenter | Center |
| MiddleRight | Middle-right |
| BottomLeft | Bottom-left |
| BottomCenter | Bottom-center |
| BottomRight | Bottom-right (default) |

---

## Position Examples

```vue
<template>
  <div>
    <ejs-fab position="TopLeft" iconCss="e-icons e-plus"></ejs-fab>
    <ejs-fab position="TopRight" iconCss="e-icons e-edit"></ejs-fab>
    <ejs-fab position="BottomLeft" iconCss="e-icons e-delete"></ejs-fab>
    <ejs-fab position="BottomRight" iconCss="e-icons e-share"></ejs-fab>
  </div>
</template>

<script setup>
import { FabComponent } from '@syncfusion/ej2-vue-buttons';
</script>
```

---

## Next Steps

- Explore styling in [floatingactionbutton-styles.md](floatingactionbutton-styles.md)
