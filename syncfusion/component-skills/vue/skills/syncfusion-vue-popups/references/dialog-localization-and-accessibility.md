# Localization and Accessibility

## Table of Contents
- [Localization](#localization)
- [WCAG 2.2 Compliance](#wcag-22-compliance)
- [Keyboard Navigation](#keyboard-navigation)
- [ARIA Attributes](#aria-attributes)
- [Screen Reader Support](#screen-reader-support)
- [RTL Support](#rtl-support)
- [Focus Management](#focus-management)
- [Examples](#examples)

## Localization

Set the `locale` property to support different languages:

```vue
<template>
  <ejs-dialog
    header="Dialog"
    locale="fr-FR"
  >
    Content in French locale
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

**Supported Locales (20+):**
- `'en-US'` (Default)
- `'de-DE'` (German)
- `'fr-FR'` (French)
- `'es-ES'` (Spanish)
- `'ja-JP'` (Japanese)
- `'zh-CN'` (Chinese Simplified)
- `'zh-TW'` (Chinese Traditional)
- `'ru-RU'` (Russian)
- `'ar-AE'` (Arabic)
- `'pt-BR'` (Portuguese)
- And 11+ others

### Locale-Based Dialog

```vue
<template>
  <div style="margin-bottom: 20px">
    <label>Select Language:</label>
    <select v-model="currentLocale" style="padding: 8px">
      <option value="en-US">English</option>
      <option value="de-DE">German</option>
      <option value="fr-FR">French</option>
      <option value="es-ES">Spanish</option>
      <option value="ja-JP">Japanese</option>
    </select>
  </div>

  <button @click="showDialog" class="e-btn">Show Dialog</button>

  <ejs-dialog
    ref="dialogRef"
    header="Multilingual Dialog"
    :locale="currentLocale"
    width="350px"
    :visible="false"
  >
    <p>Dialog content changes based on selected locale.</p>
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
      currentLocale: 'en-US'
    };
  },
  methods: {
    showDialog: function() {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.show();
      }
    }
  }
};
</script>
```

## WCAG 2.2 Compliance

Syncfusion dialogs are built to meet WCAG 2.2 standards:

- **Level A**: Basic accessibility requirements
- **Level AA**: Enhanced accessibility (recommended)
- **Level AAA**: Enhanced accessibility for specialized needs

The component supports:
- Keyboard navigation
- Screen reader compatibility
- Color contrast standards
- Focus indicators
- Semantic HTML

## Keyboard Navigation

### Supported Keys

| Key | Action |
|-----|--------|
| **Tab** | Move focus to next element |
| **Shift+Tab** | Move focus to previous element |
| **Escape** | Close dialog (if `closeOnEscape={true}`) |
| **Enter** | Activate focused button |
| **Space** | Activate focused button |

### Tab Behavior

In modal dialogs, Tab cycles through only dialog elements:

```vue
<template>
  <div id="target" style="position: relative">
    <!-- Page elements (not accessible while dialog is modal) -->
    <button class="e-btn">Page Button 1</button>
    <button class="e-btn">Page Button 2</button>

    <ejs-dialog
      header="Modal Dialog"
      :isModal="true"
      target="#target"
      :visible="true"
      :buttons="buttons"
    >
      <input type="text" placeholder="Input 1" />
      <input type="text" placeholder="Input 2" />
      <!-- Tab cycles: Input 1 → Input 2 → OK Button → Cancel Button → Input 1 -->
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
      buttons: [
        {
          buttonModel: { content: 'OK', cssClass: 'e-flat', isPrimary: true },
          click: this.handleOk
        },
        {
          buttonModel: { content: 'Cancel', cssClass: 'e-flat' },
          click: this.handleCancel
        }
      ]
    };
  },
  methods: {
    handleOk: function() {},
    handleCancel: function() {}
  }
};
</script>
```

### Escape Key Behavior

```vue
<template>
  <div>
    <!-- Escape closes the dialog -->
    <ejs-dialog
      header="Close on Escape"
      :closeOnEscape="true"
    >
      Press Escape to close
    </ejs-dialog>

    <!-- Escape does NOT close -->
    <ejs-dialog
      header="Don't Close on Escape"
      :closeOnEscape="false"
    >
      Escape won't close this dialog
    </ejs-dialog>
  </div>
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

## ARIA Attributes

The dialog automatically includes semantic ARIA attributes:

```html
<div 
  role="dialog"
  aria-labelledby="dialog-header"
  aria-modal="true"
  aria-hidden="false"
>
  <div id="dialog-header">Dialog Title</div>
  <!-- Content -->
</div>
```

**Attributes automatically managed:**
- `role="dialog"` - Identifies as dialog
- `aria-modal="true"` - For modal dialogs
- `aria-labelledby` - Links to header
- `aria-hidden` - Shows/hides from screen readers

## Screen Reader Support

Screen readers announce:
- Dialog title/header
- Required fields in forms
- Button purposes and states
- Errors and validations

```vue
<template>
  <ejs-dialog
    header="Accessible Form"
    :isModal="true"
    width="400px"
  >
    <form style="padding: 16px">
      <div style="margin-bottom: 16px">
        <label for="email-input">Email Address (Required)</label>
        <input 
          id="email-input" 
          type="email" 
          required 
          aria-required="true"
          style="width: 100%; padding: 8px"
        />
      </div>

      <div style="margin-bottom: 16px">
        <label for="subject-input">Subject</label>
        <input 
          id="subject-input" 
          type="text" 
          style="width: 100%; padding: 8px"
        />
      </div>

      <div aria-live="polite" aria-atomic="true">
        <!-- Error messages announced to screen readers -->
      </div>
    </form>
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

## RTL Support

Enable right-to-left rendering for Arabic, Hebrew, Persian languages:

```vue
<template>
  <ejs-dialog
    header="RTL Dialog"
    :enableRtl="true"
    locale="ar-AE"
  >
    محتوى باللغة العربية
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

**RTL Automatically adjusts:**
- Text alignment (right instead of left)
- Button order (reversed)
- Dialog positioning
- Icon positioning

## Focus Management

### Initial Focus

Focus moves to the first focusable element when dialog opens:

```vue
<template>
  <ejs-dialog header="Focus Management" width="400px">
    <input type="text" placeholder="This gets initial focus" />
    <input type="text" placeholder="Press Tab to focus this" />
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

### Restore Focus

Focus returns to trigger element when dialog closes:

```vue
<template>
  <button ref="triggerButton" @click="showDialog" class="e-btn">
    Open Dialog
  </button>

  <ejs-dialog
    ref="dialogRef"
    header="Dialog"
    @close="restoreFocus"
  >
    Content
  </ejs-dialog>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  },
  methods: {
    showDialog: function() {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.show();
      }
    },
    restoreFocus: function() {
      if (this.$refs.triggerButton) {
        this.$refs.triggerButton.focus();
      }
    }
  }
};
</script>
```

## Examples

### Example 1: Accessible Form Dialog

```vue
<template>
  <button @click="showDialog" class="e-btn e-primary">Open Form</button>

  <ejs-dialog
    ref="formDialog"
    header="Contact Information"
    :isModal="true"
    :buttons="buttons"
    width="400px"
    :visible="false"
    locale="en-US"
  >
    <form @submit.prevent="handleSubmit" style="padding: 16px">
      <fieldset>
        <legend>Personal Information</legend>

        <div style="margin-bottom: 16px">
          <label for="name">Name (Required)</label>
          <input 
            id="name"
            v-model="form.name"
            type="text"
            required
            aria-required="true"
            style="width: 100%; padding: 8px"
          />
        </div>

        <div style="margin-bottom: 16px">
          <label for="email">Email (Required)</label>
          <input 
            id="email"
            v-model="form.email"
            type="email"
            required
            aria-required="true"
            style="width: 100%; padding: 8px"
          />
        </div>

        <div style="margin-bottom: 16px">
          <label for="message">Message</label>
          <textarea 
            id="message"
            v-model="form.message"
            style="width: 100%; height: 100px; padding: 8px"
          ></textarea>
        </div>
      </fieldset>
    </form>
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
      form: {
        name: '',
        email: '',
        message: ''
      }
    };
  },
  computed: {
    buttons: function() {
      return [
        {
          buttonModel: { content: 'Submit', cssClass: 'e-flat', isPrimary: true },
          click: this.handleSubmit
        },
        {
          buttonModel: { content: 'Cancel', cssClass: 'e-flat' },
          click: this.closeDialog
        }
      ];
    }
  },
  methods: {
    showDialog: function() {
      if (this.$refs.formDialog) {
        this.$refs.formDialog.show();
      }
    },
    closeDialog: function() {
      if (this.$refs.formDialog) {
        this.$refs.formDialog.hide();
      }
    },
    handleSubmit: function() {
      console.log('Form submitted:', this.form);
      this.closeDialog();
    }
  }
};
</script>

<style>
fieldset {
  border: none;
  padding: 0;
}

legend {
  font-weight: bold;
  margin-bottom: 12px;
}

label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
}
</style>
```

### Example 2: Multilingual Dialog

```vue
<template>
  <div style="margin-bottom: 20px">
    <label>Language:</label>
    <select v-model="language" style="padding: 8px">
      <option value="en-US">English</option>
      <option value="fr-FR">Français</option>
      <option value="de-DE">Deutsch</option>
      <option value="ar-AE">العربية</option>
    </select>
  </div>

  <button @click="showDialog" class="e-btn">Show</button>

  <ejs-dialog
    ref="dialogRef"
    :header="headers[language]"
    :locale="language"
    :enableRtl="isRTL"
    width="400px"
    :visible="false"
  >
    {{ messages[language] }}
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
      language: 'en-US',
      headers: {
        'en-US': 'Welcome',
        'fr-FR': 'Bienvenue',
        'de-DE': 'Willkommen',
        'ar-AE': 'أهلا وسهلا'
      },
      messages: {
        'en-US': 'This dialog supports multiple languages.',
        'fr-FR': 'Cette boîte de dialogue supporte plusieurs langues.',
        'de-DE': 'Dieser Dialog unterstützt mehrere Sprachen.',
        'ar-AE': 'يدعم هذا الحوار عدة لغات.'
      }
    };
  },
  computed: {
    isRTL: function() {
      return ['ar-AE'].includes(this.language);
    }
  },
  methods: {
    showDialog: function() {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.show();
      }
    }
  }
};
</script>
```

## Key Takeaways

- **Localization** supports 20+ languages
- **WCAG 2.2** compliance built-in
- **Keyboard navigation** fully supported
- **Screen reader** friendly with ARIA
- **RTL** support for Arabic, Hebrew, etc.
- **Focus management** automatic

**Next:** Choose another reference topic based on your needs.
