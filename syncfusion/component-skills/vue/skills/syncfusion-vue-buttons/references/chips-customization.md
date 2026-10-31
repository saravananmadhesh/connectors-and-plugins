# Chips Customization

> Advanced customization techniques for Syncfusion chips including templates, icons, and avatars.

---

## Table of Contents

1. [Chip with Icons](#chip-with-icons)
2. [Chip with Avatars](#chip-with-avatars)
3. [Custom Chip Template](#custom-chip-template)
4. [HTML Attributes](#html-attributes)
5. [Predefined Styles](#predefined-styles)

---

## Chip with Icons

Add leading icons to chips:

```vue
<template>
  <div class="example-section">
    <h2>Chips with Icons</h2>
    
    <ejs-chiplist id="chipIcons" :data-source="iconsChips" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const iconsChips = ref([
  { text: 'Save', icon: 'e-icons e-save' },
  { text: 'Edit', icon: 'e-icons e-edit' },
  { text: 'Delete', icon: 'e-icons e-delete' },
  { text: 'Download', icon: 'e-icons e-download' }
]);
</script>

<style scoped>
.example-section {
  padding: 20px;
}
</style>
```

---

## Chip with Avatars

Add avatar images to chips:

```vue
<template>
  <div class="example-section">
    <h2>Chips with Avatars</h2>
    
    <ejs-chiplist id="chipAvatars" :data-source="avatarChips" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const avatarChips = ref([
  { 
    text: 'Alice Johnson',
    avatar: 'https://api.syncfusion.com/demos/secure/api/Avatar/AliceJohnson'
  },
  { 
    text: 'Bob Smith',
    avatar: 'https://api.syncfusion.com/demos/secure/api/Avatar/BobSmith'
  },
  { 
    text: 'Charlie Brown',
    avatar: 'https://api.syncfusion.com/demos/secure/api/Avatar/CharlieBrown'
  }
]);
</script>

<style scoped>
.example-section {
  padding: 20px;
}
</style>
```

---

## Custom Chip Template

Use custom templates for advanced layouts:

```vue
<template>
  <div class="example-section">
    <h2>Custom Chip Templates</h2>
    
    <ejs-chiplist id="chipCustomTemplate" :data-source="customChips">
      <template #chip-template="{ data }">
        <div class="custom-chip">
          <img v-if="data.avatar" :src="data.avatar" class="chip-avatar" />
          <span class="chip-text">{{ data.text }}</span>
          <span v-if="data.badge" class="chip-badge">{{ data.badge }}</span>
        </div>
      </template>
    </ejs-chiplist>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const customChips = ref([
  { 
    text: 'React',
    badge: '18.2',
    avatar: 'https://api.syncfusion.com/demos/secure/api/Avatar/ReactIcon'
  },
  { 
    text: 'Vue',
    badge: '3.3',
    avatar: 'https://api.syncfusion.com/demos/secure/api/Avatar/VueIcon'
  },
  { 
    text: 'Angular',
    badge: '16.0',
    avatar: 'https://api.syncfusion.com/demos/secure/api/Avatar/AngularIcon'
  }
]);
</script>

<style scoped>
.example-section {
  padding: 20px;
}

.custom-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background-color: #f5f5f5;
  border-radius: 16px;
  border: 1px solid #ddd;
}

.chip-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

.chip-text {
  font-size: 14px;
  font-weight: 500;
}

.chip-badge {
  font-size: 11px;
  background-color: #1976d2;
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 4px;
}
</style>
```

---

## HTML Attributes

Add custom HTML attributes to chips:

```vue
<template>
  <div class="example-section">
    <h2>Chips with HTML Attributes</h2>
    
    <ejs-chiplist id="chipAttributes" :data-source="attributesChips" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const attributesChips = ref([
  { 
    text: 'Important',
    htmlAttributes: {
      'data-priority': 'high',
      'aria-label': 'Important task chip'
    }
  },
  { 
    text: 'Medium Priority',
    htmlAttributes: {
      'data-priority': 'medium'
    }
  },
  { 
    text: 'Low Priority',
    htmlAttributes: {
      'data-priority': 'low'
    }
  }
]);
</script>

<style scoped>
.example-section {
  padding: 20px;
}

/* Style chips based on data attributes */
:deep([data-priority="high"]) {
  background-color: #ffebee;
  border-color: #ef5350;
  color: #c62828;
}

:deep([data-priority="medium"]) {
  background-color: #fff3e0;
  border-color: #ffb74d;
  color: #e65100;
}

:deep([data-priority="low"]) {
  background-color: #e8f5e9;
  border-color: #81c784;
  color: #2e7d32;
}
</style>
```

---

## Predefined Styles

Apply predefined style variants:

```vue
<template>
  <div class="example-section">
    <h2>Predefined Styles</h2>
    
    <h3>Outlined Chips</h3>
    <ejs-chiplist id="chipOutline"
      :data-source="outlineChips"
      css-class="e-outline"
    />
    
    <h3>Filled Chips</h3>
    <ejs-chiplist id="chipFilled"
      :data-source="filledChips"
      css-class="e-filled"
    />
    
    <h3>Colored Chips</h3>
    <ejs-chiplist id="chipColored"
      :data-source="coloredChips"
      css-class="e-primary"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const outlineChips = ref([
  { text: 'Outline 1' },
  { text: 'Outline 2' },
  { text: 'Outline 3' }
]);

const filledChips = ref([
  { text: 'Filled 1' },
  { text: 'Filled 2' },
  { text: 'Filled 3' }
]);

const coloredChips = ref([
  { text: 'Primary' },
  { text: 'Chips' },
  { text: 'Example' }
]);
</script>

<style scoped>
.example-section {
  padding: 20px;
}

h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
```

---

## Combined Customization

Combine multiple customization features:

```vue
<template>
  <div class="example-section">
    <h2>Advanced Customization</h2>
    
    <ejs-chiplist id="chipAdvanced"
      :data-source="advancedChips"
      chip-type="Filter"
      selection="Multiple"
      :deletable="true"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const advancedChips = ref([
  { 
    text: 'JavaScript',
    icon: 'e-icons e-code',
    selected: true,
    htmlAttributes: { 'data-language': 'javascript' }
  },
  { 
    text: 'TypeScript',
    icon: 'e-icons e-code',
    htmlAttributes: { 'data-language': 'typescript' }
  },
  { 
    text: 'Python',
    icon: 'e-icons e-code',
    htmlAttributes: { 'data-language': 'python' }
  }
]);
</script>

<style scoped>
.example-section {
  padding: 20px;
}
</style>
```

---

## Next Steps

- Learn drag and drop in [chips-drag-and-drop.md](chips-drag-and-drop.md)
- Check styling in [chips-style.md](chips-style.md)
- Review accessibility in [chips-accessibility.md](chips-accessibility.md)
- View complete API in [chips-api.md](chips-api.md)
