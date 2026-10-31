# Templates and Content

## Table of Contents
- [String Content](#string-content)
- [HTML Content](#html-content)
- [Template Content](#template-content)
- [Header Template](#header-template)
- [Footer Template](#footer-template)
- [Dynamic Content](#dynamic-content)
- [HTML Sanitization](#html-sanitization)
- [Examples](#examples)

## String Content

Simple text content:

```vue
<template>
  <ejs-dialog header="Welcome">
    This is simple string content.
  </ejs-dialog>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  }
};
</script>
```

## HTML Content

Display HTML markup with special characters:

```vue
<template>
  <ejs-dialog header="HTML Content">
    <h3>This is a heading</h3>
    <p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </ejs-dialog>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  }
};
</script>
```

## Template Content

Use Vue slots for dynamic/reactive content:

```vue
<template>
  <ejs-dialog header="Template Content">
    <p>Count: {{ count }}</p>
    <button @click="increment" class="e-btn">Increment</button>
  </ejs-dialog>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  },
  data: function() {
    return {
      count: 0
    };
  },
  methods: {
    increment: function() {
      this.count++;
    }
  }
};
</script>
```

## Header Template

Customize the dialog header:

```vue
<template>
  <ejs-dialog width="400px">
    <template #header>
      <div style="display: flex; align-items: center; gap: 8px">
        <span class="e-icons e-settings"></span>
        <span>Settings</span>
      </div>
    </template>

    Dialog content here
  </ejs-dialog>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  }
};
</script>
```

## Footer Template

Use a custom footer instead of buttons:

```vue
<template>
  <ejs-dialog header="Custom Footer" width="400px">
    <p>Content goes here</p>

    <template #footer>
      <div style="display: flex; justify-content: flex-end; gap: 8px; padding: 12px">
        <button class="e-btn e-outline">Cancel</button>
        <button class="e-btn e-primary">Save</button>
      </div>
    </template>
  </ejs-dialog>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  }
};
</script>
```

## Dynamic Content

Update content reactively:

```vue
<template>
  <div id="dialog-target" style="position: relative">
    <button @click="showDialog" class="e-btn">Show</button>

    <ejs-dialog
      ref="dialogRef"
      header="Dynamic Content"
      target="#dialog-target"
      :visible="false"
    >
      <div>
        <p>Current Data:</p>
        <pre>{{ JSON.stringify(data, null, 2) }}</pre>
        <button @click="updateData" class="e-btn">Update Data</button>
      </div>
    </ejs-dialog>
  </div>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  },
  data: function() {
    return {
      data: {
        name: 'John',
        email: 'john@example.com',
        timestamp: new Date().toLocaleTimeString()
      }
    };
  },
  methods: {
    showDialog: function() {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.show();
      }
    },
    updateData: function() {
      this.data = {
        name: 'Jane',
        email: 'jane@example.com',
        timestamp: new Date().toLocaleTimeString()
      };
    }
  }
};
</script>
```

## HTML Sanitization

By default, HTML is sanitized to prevent XSS attacks:

```vue
<template>
  <ejs-dialog
    header="Sanitization"
    :enableHtmlSanitizer="true"
  >
    <!-- This script tag will be removed -->
    <script>alert('XSS')</script>
    
    <!-- This is safe and will render -->
    <p>This is safe content</p>
  </ejs-dialog>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  }
};
</script>
```

**Disable sanitization only for trusted content:**

```vue
<template>
  <ejs-dialog
    header="Trusted Content"
    :enableHtmlSanitizer="false"
  >
    <!-- Use only for trusted content! -->
    Safe HTML from your database
  </ejs-dialog>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  }
  // ⚠️ Warning: Only disable sanitization if content is from trusted sources
};
</script>
```

## Examples

### Example 1: Form Dialog with Reactive Content

```vue
<template>
  <div id="dialog-target" style="position: relative">
    <button @click="showForm" class="e-btn e-primary">Edit Profile</button>

    <ejs-dialog
      ref="formDialog"
      header="Edit Profile"
      target="#dialog-target"
      :visible="false"
      :buttons="formButtons"
      width="400px"
    >
      <div style="padding: 16px">
        <div style="margin-bottom: 16px">
          <label style="display: block; margin-bottom: 4px">Name:</label>
          <input v-model="form.name" class="e-input" style="width: 100%" />
        </div>

        <div style="margin-bottom: 16px">
          <label style="display: block; margin-bottom: 4px">Email:</label>
          <input v-model="form.email" type="email" class="e-input" style="width: 100%" />
        </div>

        <div style="margin-bottom: 16px">
          <label style="display: block; margin-bottom: 4px">Bio:</label>
          <textarea v-model="form.bio" class="e-input" style="width: 100%; height: 80px"></textarea>
        </div>

        <p style="color: #999; font-size: 12px">Last updated: {{ form.lastUpdated }}</p>
      </div>
    </ejs-dialog>
  </div>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  },
  data: function() {
    return {
      form: {
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'Software developer',
        lastUpdated: new Date().toLocaleString()
      }
    };
  },
  computed: {
    formButtons: function() {
      return [
        {
          buttonModel: {
            content: 'Save',
            cssClass: 'e-flat',
            isPrimary: true
          },
          click: this.saveForm
        },
        {
          buttonModel: {
            content: 'Cancel',
            cssClass: 'e-flat'
          },
          click: this.closeDialog
        }
      ];
    }
  },
  methods: {
    showForm: function() {
      if (this.$refs.formDialog) {
        this.$refs.formDialog.show();
      }
    },
    closeDialog: function() {
      if (this.$refs.formDialog) {
        this.$refs.formDialog.hide();
      }
    },
    saveForm: function() {
      this.form.lastUpdated = new Date().toLocaleString();
      console.log('Form saved:', this.form);
      this.closeDialog();
    }
  }
};
</script>

<style>
.e-input {
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 4px;
}
</style>
```

### Example 2: List Dialog with Template

```vue
<template>
  <div id="dialog-target" style="position: relative">
    <button @click="showList" class="e-btn">View Items</button>

    <DialogComponent
      ref="listDialog"
      header="Items"
      target="#dialog-target"
      :visible="false"
      width="400px"
    >
      <div style="padding: 16px">
        <div v-if="items.length === 0">
          <p>No items found</p>
        </div>
        <div v-else>
          <ul style="list-style: none; padding: 0">
            <li v-for="item in items" :key="item.id" style="padding: 8px; border-bottom: 1px solid #eee">
              <strong>{{ item.name }}</strong>
              <p style="margin: 4px 0; color: #666; font-size: 12px">{{ item.description }}</p>
            </li>
          </ul>
        </div>
        <p style="margin-top: 16px; text-align: center; color: #999">Total: {{ items.length }} items</p>
      </div>
    </ejs-dialog>
  </div>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  },
  data: function() {
    return {
      items: [
        { id: 1, name: 'Item 1', description: 'First item' },
        { id: 2, name: 'Item 2', description: 'Second item' },
        { id: 3, name: 'Item 3', description: 'Third item' }
      ]
    };
  },
  methods: {
    showList: function() {
      if (this.$refs.listDialog) {
        this.$refs.listDialog.show();
      }
    }
  }
};
</script>
```

### Example 3: Rich Content Dialog

```vue
<template>
  <ejs-dialog header="Rich Content" width="600px" :isModal="true">
    <div style="padding: 20px">
      <h3>Dialog with Complex Content</h3>

      <section style="margin-top: 20px; padding: 12px; background: #f5f5f5; border-radius: 4px">
        <h4>Features</h4>
        <ul>
          <li v-for="feature in features" :key="feature">{{ feature }}</li>
        </ul>
      </section>

      <section style="margin-top: 20px; padding: 12px; background: #f5f5f5; border-radius: 4px">
        <h4>Code Example</h4>
        <pre style="background: #222; color: #0f0; padding: 12px; border-radius: 4px; overflow-x: auto">{{ codeExample }}</pre>
      </section>

      <section style="margin-top: 20px; padding: 12px; background: #f5f5f5; border-radius: 4px">
        <h4>Stats</h4>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px">
          <div style="text-align: center; padding: 12px; background: white; border-radius: 4px">
            <div style="font-size: 24px; font-weight: bold">1.2K</div>
            <div style="font-size: 12px; color: #666">Downloads</div>
          </div>
          <div style="text-align: center; padding: 12px; background: white; border-radius: 4px">
            <div style="font-size: 24px; font-weight: bold">4.8★</div>
            <div style="font-size: 12px; color: #666">Rating</div>
          </div>
          <div style="text-align: center; padding: 12px; background: white; border-radius: 4px">
            <div style="font-size: 24px; font-weight: bold">v2.1</div>
            <div style="font-size: 12px; color: #666">Version</div>
          </div>
        </div>
      </section>
    </div>
  </ejs-dialog>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  },
  data: function() {
    return {
      features: [
        'Responsive design',
        'Dark mode support',
        'TypeScript support',
        'Zero dependencies'
      ],
      codeExample: "import { DialogComponent } from '@syncfusion/ej2-vue-popups';\n\nexport default {\n  components: { DialogComponent }\n};"
    };
  }
};
</script>
```

## Key Takeaways

- **String content** for simple text
- **HTML content** for markup
- **Templates (slots)** for reactive/dynamic content
- **Custom templates** for headers/footers
- **Sanitization** on by default for security
- **Disable sanitization** only for trusted content

**Next:** Choose another reference topic based on your needs.
