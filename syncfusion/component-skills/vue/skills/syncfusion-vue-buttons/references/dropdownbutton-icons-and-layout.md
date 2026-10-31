# DropdownButton Icons and Layout

> Configure icons and layout options for Syncfusion DropdownButton.

---

## Table of Contents

1. [Button Icons](#button-icons)
2. [Popup Icons](#popup-icons)
3. [Icon Position](#icon-position)
4. [Layout Modes](#layout-modes)
5. [Custom Icon Styling](#custom-icon-styling)

---

## Button Icons

Add icon to main button:

```vue
<template>
  <div class="example-section">
    <h2>Button Icons</h2>

    <h3>Icon Left (Default)</h3>
    <ejs-dropdownbutton
      icon-css="e-icons e-save"
      :items="items"
    >Save</ejs-dropdownbutton>

    <h3>Icon Right</h3>
    <ejs-dropdownbutton
      icon-css="e-icons e-down"
      icon-position="Right"
      :items="items"
    >Options</ejs-dropdownbutton>
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
        { text: 'Save' },
        { text: 'Save As' }
      ]
    };
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

h3 {
  margin-top: 25px;
  margin-bottom: 15px;
}
</style>
```

---

## Popup Icons

Add icons to menu items:

```vue
<template>
  <div class="example-section">
    <h2>Popup Item Icons</h2>

    <ejs-dropdownbutton :items="itemsWithIcons">File</ejs-dropdownbutton>
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
        { text: 'New', iconCss: 'e-icons e-new-file' },
        { text: 'Open', iconCss: 'e-icons e-folder-open' },
        { text: 'Save', iconCss: 'e-icons e-save' },
        { separator: true },
        { text: 'Exit', iconCss: 'e-icons e-close' }
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

## Icon Position

Control icon placement:

```vue
<template>
  <div class="example-section">
    <h2>Icon Positions</h2>

    <h3>Left Position</h3>
    <ejs-dropdownbutton
      icon-css="e-icons e-settings"
      icon-position="Left"
      :items="items"
    >Settings</ejs-dropdownbutton>

    <h3>Right Position</h3>
    <ejs-dropdownbutton
      icon-css="e-icons e-settings"
      icon-position="Right"
      :items="items"
    >Settings</ejs-dropdownbutton>

    <h3>Top Position</h3>
    <ejs-dropdownbutton
      icon-css="e-icons e-settings"
      icon-position="Top"
      :items="items"
    >Settings</ejs-dropdownbutton>
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
      ]
    };
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

h3 {
  margin-top: 25px;
  margin-bottom: 15px;
}
</style>
```

---

## Layout Modes

Configure popup layout:

```vue
<template>
  <div class="example-section">
    <h2>Layout Modes</h2>

    <h3>Horizontal Layout</h3>
    <ejs-dropdownbutton :items="toolbarItems">Format</ejs-dropdownbutton>

    <h3>Vertical Layout</h3>
    <ejs-dropdownbutton :items="menuItems">Menu</ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      toolbarItems: [
        { text: 'Bold', iconCss: 'e-icons e-bold' },
        { text: 'Italic', iconCss: 'e-icons e-italic' },
        { text: 'Underline', iconCss: 'e-icons e-underline' }
      ],
      menuItems: [
        { text: 'Save', iconCss: 'e-icons e-save' },
        { text: 'Open', iconCss: 'e-icons e-folder-open' },
        { text: 'Download', iconCss: 'e-icons e-download' }
      ]
    };
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

h3 {
  margin-top: 25px;
  margin-bottom: 15px;
}
</style>
```

---

## Custom Icon Styling

Style icons with custom CSS:

```vue
<template>
  <div class="example-section">
    <h2>Custom Icon Styling</h2>

    <ejs-dropdownbutton
      icon-css="e-icons e-star custom-icon"
      :items="styledItems"
    >Favorites</ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      styledItems: [
        { text: 'Add to Favorites', iconCss: 'e-icons e-star' },
        { text: 'Remove from Favorites', iconCss: 'e-icons e-delete' }
      ]
    };
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

:deep(.custom-icon) {
  color: #ffd700;
  font-size: 18px;
  margin-right: 8px;
}

:deep(.custom-icon:before) {
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
}
</style>
```

---

## Advanced Icon Layout

Complex icon arrangements:

```vue
<template>
  <div class="example-section">
    <h2>Advanced Icon Layout</h2>

    <ejs-dropdownbutton
      :items="advancedItems"
      icon-css="e-icons e-more-vertical-1"
    >More</ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      advancedItems: [
        {
          text: 'File Operations',
          items: [
            { text: 'New', iconCss: 'e-icons e-new-file' },
            { text: 'Open', iconCss: 'e-icons e-folder-open' },
            { text: 'Save', iconCss: 'e-icons e-save' }
          ]
        },
        { separator: true },
        {
          text: 'Edit Operations',
          items: [
            { text: 'Cut', iconCss: 'e-icons e-cut' },
            { text: 'Copy', iconCss: 'e-icons e-copy' },
            { text: 'Paste', iconCss: 'e-icons e-paste' }
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

## Next Steps

- Explore appearance in [dropdownbutton-appearance-and-styling.md](dropdownbutton-appearance-and-styling.md)
- Check events in [dropdownbutton-events-and-interactivity.md](dropdownbutton-events-and-interactivity.md)
- View templates in [dropdownbutton-item-template.md](dropdownbutton-item-template.md)
- Learn popup items in [dropdownbutton-popup-items.md](dropdownbutton-popup-items.md)
