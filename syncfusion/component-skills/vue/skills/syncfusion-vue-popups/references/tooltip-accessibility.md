# Tooltip - Accessibility and Localization

## WCAG 2.2 Compliance

### ARIA Attributes

```vue
<template>
  <div>
    <button 
      id="helpBtn"
      class="e-btn"
      aria-label="Help button"
      aria-describedby="help-tooltip"
    >
      Help
    </button>
    
    <ejs-tooltip 
      target="#helpBtn"
      content="Additional help text"
      id="help-tooltip"
      role="tooltip"
    />
  </div>
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-tooltip': TooltipComponent
  }
};
</script>
```

### ARIA Live Region

```vue
<template>
  <div>
    <button 
      id="statusBtn"
      class="e-btn"
      aria-label="Status notification"
      aria-describedby="status-tooltip"
    >
      Status
    </button>

    <ejs-tooltip 
      target="#statusBtn"
      :content="statusMessage"
      id="status-tooltip"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    />
  </div>
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-tooltip': TooltipComponent
  },
  data: function() {
    return {
      statusMessage: 'Operation completed successfully'
    };
  }
};
</script>
```

## Keyboard Navigation

### Focus-Based Tooltip

```vue
<template>
  <div style="display: flex; gap: 10px;">
    <input
      id="emailInput"
      type="email"
      placeholder="Enter email"
      aria-label="Email input"
      aria-describedby="email-help"
      style="padding: 8px; width: 200px;"
    />
    
    <ejs-tooltip 
      target="#emailInput"
      :content="emailHelp"
      id="email-help"
      opensOn="Focus"
      position="RightCenter"
    />
  </div>
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-tooltip': TooltipComponent
  },
  data: function() {
    return {
      emailHelp: 'Format: user@example.com'
    };
  }
};
</script>
```

### Custom Keyboard Handling

```vue
<template>
  <div>
    <button 
      id="helpBtn"
      class="e-btn"
      @keydown.shift.191="toggleTooltip"
      aria-label="Shortcut help (Shift+?)"
      aria-describedby="shortcut-help"
    >
      Help
    </button>

    <ejs-tooltip 
      ref="tooltip"
      target="#helpBtn"
      content="Press Shift+? for help"
      id="shortcut-help"
    />
  </div>
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-tooltip': TooltipComponent
  },
  methods: {
    toggleTooltip: function() {
      if (this.$refs.tooltip) {
        this.$refs.tooltip.toggle();
      }
    }
  }
};
</script>
```

### Tab Navigation

```vue
<template>
  <form style="display: flex; flex-direction: column; gap: 12px; max-width: 300px;">
    <div>
      <label for="firstName">First Name:</label>
      <input
        id="firstName"
        type="text"
        aria-label="First name"
        aria-describedby="firstName-help"
        style="width: 100%; padding: 8px;"
      />
      <ejs-tooltip 
        target="#firstName"
        content="Enter your first name"
        id="firstName-help"
        opensOn="Focus"
      />
    </div>

    <div>
      <label for="lastName">Last Name:</label>
      <input
        id="lastName"
        type="text"
        aria-label="Last name"
        aria-describedby="lastName-help"
        style="width: 100%; padding: 8px;"
      />
      <ejs-tooltip 
        target="#lastName"
        content="Enter your last name"
        id="lastName-help"
        opensOn="Focus"
      />
    </div>

    <div>
      <label for="emailAddr">Email:</label>
      <input
        id="emailAddr"
        type="email"
        aria-label="Email address"
        aria-describedby="emailAddr-help"
        style="width: 100%; padding: 8px;"
      />
      <ejs-tooltip 
        target="#emailAddr"
        content="Valid email: user@example.com"
        id="emailAddr-help"
        opensOn="Focus"
      />
    </div>

    <button type="submit" class="e-btn">Submit</button>
  </form>
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-tooltip': TooltipComponent
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
}
</style>
```

## Screen Reader Support

### Descriptive Content

```vue
<template>
  <button
    id="infoBtn"
    class="e-btn"
    aria-label="Information about this feature"
    aria-describedby="feature-info"
  >
    ℹ️ Info
  </button>

  <ejs-tooltip 
    target="#infoBtn"
    :content="featureInfo"
    id="feature-info"
    role="tooltip"
    aria-label="Feature information"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-tooltip': TooltipComponent
  },
  data: function() {
    return {
      featureInfo: '<div><strong>Important Feature Information:</strong><ul><li>Requires authentication</li><li>Available on desktop and mobile</li><li>Data is encrypted</li></ul></div>'
    };
  }
};
</script>
```

### Error Messages

```vue
<template>
  <div>
    <input
      id="passwordInput"
      type="password"
      placeholder="Password"
      aria-label="Password input"
      aria-describedby="password-error"
      @input="validatePassword"
      style="padding: 8px; width: 200px;"
    />

    <ejs-tooltip 
      v-if="passwordError"
      target="#passwordInput"
      :content="passwordError"
      id="password-error"
      position="RightCenter"
      cssClass="error-tooltip"
      :isSticky="true"
      role="alert"
    />
  </div>
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-tooltip': TooltipComponent
  },
  data: function() {
    return {
      passwordError: ''
    };
  },
  methods: {
    validatePassword: function(event) {
      const value = event.target.value;
      
      if (value.length < 8) {
        this.passwordError = 'Password must be at least 8 characters';
      } else if (!/[A-Z]/.test(value)) {
        this.passwordError = 'Password must contain uppercase letter';
      } else if (!/[0-9]/.test(value)) {
        this.passwordError = 'Password must contain number';
      } else {
        this.passwordError = '';
      }
    }
  }
};
</script>

<style scoped>
:deep(.error-tooltip .e-tooltip) {
  background-color: #f44336;
  color: white;
}
</style>
```

## Motion and Animation Preferences

### Respects prefers-reduced-motion

```vue
<template>
  <div>
    <button id="motionBtn" class="e-btn">Accessible Animation</button>
    <ejs-tooltip 
      target="#motionBtn"
      content="Motion-safe animation"
      :animationSettings="animationSettings"
    />
  </div>
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-tooltip': TooltipComponent
  },
  data: function() {
    return {
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };
  },
  computed: {
    animationSettings: function() {
      return {
        effect: this.prefersReducedMotion ? 'None' : 'Fade',
        duration: this.prefersReducedMotion ? 0 : 300
      };
    }
  }
};
</script>
```

## Localization

### Multiple Languages

```vue
<template>
  <div>
    <select v-model="currentLocale" @change="loadLocale" style="padding: 8px; margin-bottom: 10px;">
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
      <option value="de">Deutsch</option>
      <option value="ja">日本語</option>
      <option value="zh">中文</option>
    </select>

    <button id="helpLocaleBtn" class="e-btn">{{ buttonText }}</button>
    <ejs-tooltip 
      target="#helpLocaleBtn"
      :content="tooltipText"
      :locale="currentLocale"
    />
  </div>
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-tooltip': TooltipComponent
  },
  data: function() {
    return {
      currentLocale: 'en',
      translations: {
        en: { button: 'Help', tooltip: 'Click for more information' },
        es: { button: 'Ayuda', tooltip: 'Haga clic para más información' },
        fr: { button: 'Aide', tooltip: "Cliquez pour plus d'informations" },
        de: { button: 'Hilfe', tooltip: 'Klicken Sie für weitere Informationen' },
        ja: { button: 'ヘルプ', tooltip: '詳細については、ここをクリックしてください' },
        zh: { button: '帮助', tooltip: '点击查看更多信息' }
      }
    };
  },
  computed: {
    buttonText: function() {
      return this.translations[this.currentLocale] ? this.translations[this.currentLocale].button : '';
    },
    tooltipText: function() {
      return this.translations[this.currentLocale] ? this.translations[this.currentLocale].tooltip : '';
    }
  },
  methods: {
    loadLocale: function() {
      // Locale changed
    }
  }
};
</script>

<style scoped>
select {
  font-family: inherit;
}
</style>
```

### Right-to-Left (RTL) Support

```vue
<template>
  <div :dir="isRTL ? 'rtl' : 'ltr'">
    <button style="margin-bottom: 10px;">
      <input type="checkbox" v-model="isRTL" />
      RTL Mode
    </button>

    <button id="rtlBtn" class="e-btn">المساعدة</button>
    <ejs-tooltip 
      target="#rtlBtn"
      content="اضغط للحصول على مزيد من المعلومات"
      :enableRtl="isRTL"
    />
  </div>
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-tooltip': TooltipComponent
  },
  data: function() {
    return {
      isRTL: false
    };
  }
};
</script>
```

## Color Contrast

### High Contrast Mode

```vue
<template>
  <div>
    <button style="margin-bottom: 10px;">
      <input type="checkbox" v-model="highContrast" />
      High Contrast
    </button>

    <button id="contrastBtn" class="e-btn" :class="{ 'high-contrast': highContrast }">Help</button>
    <ejs-tooltip 
      target="#contrastBtn"
      content="Additional information"
      :cssClass="highContrast ? 'tooltip-high-contrast' : ''"
    />
  </div>
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-tooltip': TooltipComponent
  },
  data: function() {
    return {
      highContrast: false
    };
  }
};
</script>

<style scoped>
.high-contrast {
  background-color: #000;
  color: #ffff00;
  border: 2px solid #ffff00;
}

:deep(.tooltip-high-contrast .e-tooltip) {
  background-color: #000;
  color: #ffff00;
  border: 2px solid #ffff00;
  font-weight: bold;
}

:deep(.tooltip-high-contrast .e-arrow-tip.e-tooltip-bottom) {
  border-top-color: #000;
}
</style>
```

## Examples

### Fully Accessible Tooltip

```vue
<template>
  <div style="padding: 20px;">
    <h2>Accessible Tooltip Examples</h2>

    <div style="margin: 20px 0;">
      <h3>Email Form</h3>
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 300px;">
        <div>
          <label for="username">Username:</label>
          <input
            id="username"
            type="text"
            placeholder="Enter username"
            aria-label="Username field"
            aria-describedby="username-help"
            style="width: 100%; padding: 8px;"
          />
          <ejs-tooltip 
            target="#username"
            content="3-20 characters, letters and numbers only"
            id="username-help"
            opensOn="Focus"
          />
        </div>

        <div>
          <label for="emailForm">Email:</label>
          <input
            id="emailForm"
            type="email"
            placeholder="user@example.com"
            aria-label="Email field"
            aria-describedby="emailForm-help"
            style="width: 100%; padding: 8px;"
          />
          <ejs-tooltip 
            target="#emailForm"
            content="Valid format: user@example.com"
            id="emailForm-help"
            opensOn="Focus"
          />
        </div>

        <div>
          <label for="passwordForm">Password:</label>
          <input
            id="passwordForm"
            type="password"
            placeholder="Enter password"
            aria-label="Password field"
            aria-describedby="passwordForm-help"
            style="width: 100%; padding: 8px;"
            @input="validatePass"
          />
          <ejs-tooltip 
            v-if="passwordMessage"
            target="#passwordForm"
            :content="passwordMessage"
            id="passwordForm-help"
            cssClass="info-tooltip"
            :isSticky="true"
          />
        </div>

        <button class="e-btn">Submit</button>
      </div>
    </div>

    <div style="margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 8px;">
      <h3>Language Selection</h3>
      <select v-model="language" style="padding: 8px; margin: 10px 0;">
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
      </select>

      <button id="langBtn" class="e-btn" style="display: block;">
        {{ langLabels[language] }}
      </button>
      <ejs-tooltip 
        target="#langBtn"
        :content="langTooltips[language]"
      />
    </div>
  </div>
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: 'App',
  components: {
    'ejs-tooltip': TooltipComponent
  },
  data() {
    return {
      language: 'en',
      passwordMessage: '',
      langLabels: {
        en: 'Help',
        es: 'Ayuda',
        fr: 'Aide'
      },
      langTooltips: {
        en: 'Click for more information',
        es: 'Haga clic para más información',
        fr: 'Cliquez pour plus d\'informations'
      }
    };
  },
  methods: {
    validatePass(event) {
      const value = event.target.value;
      
      if (value.length < 8) {
        this.passwordMessage = 'Minimum 8 characters required';
      } else if (!/[A-Z]/.test(value)) {
        this.passwordMessage = 'Must contain uppercase letter';
      } else if (!/[0-9]/.test(value)) {
        this.passwordMessage = 'Must contain number';
      } else {
        this.passwordMessage = '';
      }
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
}

:deep(.info-tooltip .e-tooltip) {
  background-color: #2196F3;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
}
</style>
```

## Notes

- Use `aria-describedby` to link tooltips to elements
- Set `role="tooltip"` for semantic meaning
- Use `aria-live="polite"` for status messages
- Always provide `aria-label` on trigger elements
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Ensure keyboard accessibility with proper focus management
- Respect `prefers-reduced-motion` for animations
- Support RTL languages with `enableRtl` prop
- Maintain minimum 4.5:1 color contrast ratio
- Use `aria-invalid` and `role="alert"` for error messages
