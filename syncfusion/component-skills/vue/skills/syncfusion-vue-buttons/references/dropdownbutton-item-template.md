# DropdownButton Item Template

> Create custom item templates for advanced DropdownButton menu layouts.

---

## Table of Contents

1. [Basic Template](#basic-template)
2. [Rich Content Template](#rich-content-template)
3. [Custom Styling Template](#custom-styling-template)
4. [Template with Images](#template-with-images)
5. [Template with Metadata](#template-with-metadata)

---

## Basic Template

Create simple custom templates:

```vue
<template>
  <div class="example-section">
    <h2>Basic Item Template</h2>

    <ejs-dropdownbutton :items="items">
      <template #itemTemplate="{ data }">
        <div class="custom-item">
          <span class="item-icon">▶</span>
          <span class="item-text">{{ data.text }}</span>
        </div>
      </template>
      Custom Template
    </ejs-dropdownbutton>
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

.custom-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
}

.item-icon {
  font-size: 12px;
  opacity: 0.6;
}

.item-text {
  flex: 1;
}
</style>
```

---

## Rich Content Template

Display complex content in templates:

```vue
<template>
  <div class="example-section">
    <h2>Rich Content Template</h2>

    <ejs-dropdownbutton :items="richItems">
      <template #itemTemplate="{ data }">
        <div class="rich-item">
          <div class="item-header">
            <strong>{{ data.title }}</strong>
            <span v-if="data.badge" class="badge">{{ data.badge }}</span>
          </div>
          <p class="item-description">{{ data.description }}</p>
        </div>
      </template>
      Menu
    </ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      richItems: [
        {
          title: 'New Document',
          description: 'Create a new blank document',
          badge: 'Ctrl+N'
        },
        {
          title: 'Open',
          description: 'Open an existing document',
          badge: 'Ctrl+O'
        },
        {
          title: 'Save',
          description: 'Save the current document',
          badge: 'Ctrl+S'
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

.rich-item {
  padding: 10px;
  min-width: 250px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.item-header strong {
  color: #333;
}

.badge {
  font-size: 11px;
  background-color: #f0f0f0;
  padding: 2px 6px;
  border-radius: 3px;
  color: #666;
}

.item-description {
  margin: 0;
  font-size: 12px;
  color: #666;
}
</style>
```

---

## Custom Styling Template

Apply custom styling within templates:

```vue
<template>
  <div class="example-section">
    <h2>Styled Item Template</h2>

    <ejs-dropdownbutton :items="styledItems">
      <template #itemTemplate="{ data }">
        <div class="styled-item" :class="data.priority">
          <span class="priority-badge">{{ data.priority.toUpperCase() }}</span>
          <span class="item-text">{{ data.text }}</span>
        </div>
      </template>
      Priority
    </ejs-dropdownbutton>
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
        { text: 'High Priority', priority: 'high' },
        { text: 'Medium Priority', priority: 'medium' },
        { text: 'Low Priority', priority: 'low' }
      ]
    };
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

.styled-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 4px;
}

.priority-badge {
  font-size: 11px;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 3px;
  min-width: 50px;
  text-align: center;
}

.styled-item.high .priority-badge {
  background-color: #ffebee;
  color: #c62828;
}

.styled-item.medium .priority-badge {
  background-color: #fff3e0;
  color: #e65100;
}

.styled-item.low .priority-badge {
  background-color: #e8f5e9;
  color: #2e7d32;
}
</style>
```

---

## Template with Images

Include images in templates:

```vue
<template>
  <div class="example-section">
    <h2>Template with Images</h2>

    <ejs-dropdownbutton :items="imageItems">
      <template #itemTemplate="{ data }">
        <div class="image-item">
          <img :src="data.image" :alt="data.name" />
          <div class="item-info">
            <div class="item-name">{{ data.name }}</div>
            <div class="item-size">{{ data.size }}</div>
          </div>
        </div>
      </template>
      Recent Files
    </ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      imageItems: [
        {
          name: 'Document.pdf',
          image: 'https://via.placeholder.com/32/f44336/ffffff?text=PDF',
          size: '2.5 MB'
        },
        {
          name: 'Presentation.pptx',
          image: 'https://via.placeholder.com/32/ff9800/ffffff?text=PPT',
          size: '5.2 MB'
        },
        {
          name: 'Spreadsheet.xlsx',
          image: 'https://via.placeholder.com/32/4caf50/ffffff?text=XLS',
          size: '1.8 MB'
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

.image-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
}

.image-item img {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  object-fit: cover;
}

.item-info {
  flex: 1;
}

.item-name {
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.item-size {
  font-size: 12px;
  color: #999;
}
</style>
```

---

## Template with Metadata

Add metadata to template items:

```vue
<template>
  <div class="example-section">
    <h2>Template with Metadata</h2>

    <ejs-dropdownbutton :items="metadataItems">
      <template #itemTemplate="{ data }">
        <div class="metadata-item">
          <div class="item-main">
            <span class="item-icon">📝</span>
            <div class="item-content">
              <div class="item-title">{{ data.title }}</div>
              <div class="item-meta">{{ data.author }} • {{ data.date }}</div>
            </div>
          </div>
          <div class="item-action">
            <span v-if="data.starred" class="star">⭐</span>
          </div>
        </div>
      </template>
      Documents
    </ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      metadataItems: [
        {
          title: 'Project Proposal',
          author: 'John Doe',
          date: 'Today',
          starred: true
        },
        {
          title: 'Meeting Notes',
          author: 'Jane Smith',
          date: 'Yesterday',
          starred: false
        },
        {
          title: 'Budget Report',
          author: 'Mike Johnson',
          date: '2 days ago',
          starred: true
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

.metadata-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 4px;
  min-width: 280px;
}

.metadata-item:hover {
  background-color: #f5f5f5;
}

.item-main {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.item-icon {
  font-size: 18px;
}

.item-content {
  flex: 1;
}

.item-title {
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.item-meta {
  font-size: 12px;
  color: #999;
  margin-top: 2px;
}

.item-action {
  display: flex;
  align-items: center;
}

.star {
  font-size: 16px;
}
</style>
```

---

## Next Steps

- Learn ListView integration in [dropdownbutton-listview-integration.md](dropdownbutton-listview-integration.md)
- Check accessibility in [dropdownbutton-accessibility.md](dropdownbutton-accessibility.md)
- Explore events in [dropdownbutton-events-and-interactivity.md](dropdownbutton-events-and-interactivity.md)
