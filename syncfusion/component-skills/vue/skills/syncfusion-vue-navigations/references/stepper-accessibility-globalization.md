# Accessibility and Globalization

## Table of Contents
- [Web Accessibility (WCAG)](#web-accessibility-wcag)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Internationalization (i18n)](#internationalization-i18n)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [Localization](#localization)

## Web Accessibility (WCAG)

The Syncfusion Stepper component is designed to comply with WCAG 2.2 Level AA accessibility standards. Key features include:

### ARIA Labels and Roles

The component automatically provides ARIA roles and labels for screen readers:

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { 
    label: 'Personal Information',
    ariaLabel: 'Step 1: Enter your personal information including name and date of birth'
  },
  { 
    label: 'Contact Details',
    ariaLabel: 'Step 2: Provide your email and phone number for contact'
  },
  { 
    label: 'Address',
    ariaLabel: 'Step 3: Enter your residential address'
  },
  { 
    label: 'Confirmation',
    ariaLabel: 'Step 4: Review and confirm all information before submission'
  }
]);
</script>

<template>
  <!-- Stepper automatically includes:
    - role="tablist" on the stepper container
    - role="tab" on each step
    - aria-selected="true|false" on steps
    - aria-label and aria-describedby on steps
  -->
  <ejs-stepper :steps="steps" />
</template>
```

### Semantic HTML Structure

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { label: 'Step 1', description: 'First step description' },
  { label: 'Step 2', description: 'Second step description' }
]);
</script>

<template>
  <div class="form-wrapper">
    <!-- Use semantic HTML with stepper -->
    <nav aria-label="Form steps">
      <ejs-stepper :steps="steps" />
    </nav>

    <main>
      <section aria-labelledby="step-1">
        <h2 id="step-1">{{ steps[0].label }}</h2>
        <p>{{ steps[0].description }}</p>
      </section>
    </main>
  </div>
</template>
```

### Color Contrast

Ensure sufficient color contrast for visibility:

```vue
<style scoped>
/* ✅ Minimum 4.5:1 contrast ratio for normal text */
.step-label {
  color: #000;  /* Black */
  background: #fff;  /* White */
}

/* ✅ Active state with high contrast */
.step.active {
  color: #fff;  /* White */
  background: #1565c0;  /* Blue - 6.5:1 contrast */
  border: 2px solid #0d47a1;
}

/* ✅ Focus indicator for keyboard navigation */
.step:focus-visible {
  outline: 3px solid #ff6d00;  /* Orange - high visibility */
  outline-offset: 2px;
}
</style>
```

## Keyboard Navigation

Users can navigate the stepper using keyboard controls:

### Keyboard Controls

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' },
  { label: 'Step 4' }
]);

const handleKeyDown = (e) => {
  // These are handled automatically by the stepper, but shown for documentation
  /*
  - Tab: Move focus to next step
  - Shift+Tab: Move focus to previous step
  - Arrow Right/Down: Move to next step
  - Arrow Left/Up: Move to previous step
  - Home: Move to first step
  - End: Move to last step
  - Enter/Space: Activate current step
  */
};
</script>

<template>
  <div role="region" aria-label="Multi-step form navigation">
    <ejs-stepper :steps="steps" />
  </div>
</template>
```

### Custom Keyboard Handling

```vue
<script setup>
import { ref } from 'vue';

const stepperRef = ref(null);
const currentStep = ref(0);
const steps = ref([
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' }
]);

const handleKeyboardNavigation = (e) => {
  if (!stepperRef.value) return;

  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      if (currentStep.value < steps.value.length - 1) {
        stepperRef.value.nextStep();
        currentStep.value++;
      }
      e.preventDefault();
      break;

    case 'ArrowLeft':
    case 'ArrowUp':
      if (currentStep.value > 0) {
        stepperRef.value.previousStep();
        currentStep.value--;
      }
      e.preventDefault();
      break;

    case 'Home':
      stepperRef.value.activeStep = 0;
      currentStep.value = 0;
      e.preventDefault();
      break;

    case 'End':
      const lastStep = steps.value.length - 1;
      stepperRef.value.activeStep = lastStep;
      currentStep.value = lastStep;
      e.preventDefault();
      break;
  }
};
</script>

<template>
  <div @keydown="handleKeyboardNavigation">
    <ejs-stepper 
      ref="stepperRef"
      :steps="steps"
      :activeStep="currentStep"
      tabindex="0"
    />
  </div>
</template>
```

### Focus Management

```vue
<script setup>
import { ref, onMounted } from 'vue';

const stepperRef = ref(null);
const steps = ref([
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' }
]);

onMounted(() => {
  // Focus stepper on mount for accessibility
  if (stepperRef.value) {
    stepperRef.value.focus();
  }
});

const skipToContent = () => {
  // Skip link functionality
  const mainContent = document.querySelector('main');
  if (mainContent) {
    mainContent.focus();
  }
};
</script>

<template>
  <div>
    <!-- Skip to content link (visually hidden but accessible) -->
    <a href="#main-content" class="skip-link" @click="skipToContent">
      Skip to main content
    </a>

    <ejs-stepper 
      ref="stepperRef"
      :steps="steps"
      role="tablist"
    />

    <main id="main-content" tabindex="-1">
      <!-- Main content here -->
    </main>
  </div>
</template>

<style scoped>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
</style>
```

## Screen Reader Support

### Announcing Step Changes

```vue
<script setup>
import { ref } from 'vue';

const stepperRef = ref(null);
const announcementText = ref('');
const steps = ref([
  { label: 'Personal Information' },
  { label: 'Shipping Address' },
  { label: 'Payment Method' },
  { label: 'Order Review' }
]);

const handleStepChanged = (args) => {
  const stepLabel = steps.value[args.activeStep]?.label;
  announcementText.value = `Step ${args.activeStep + 1} of ${steps.value.length}: ${stepLabel}. Please complete the information for this step before proceeding.`;
};
</script>

<template>
  <div>
    <!-- Screen reader only announcement area -->
    <div 
      aria-live="polite"
      aria-atomic="true"
      class="sr-only"
    >
      {{ announcementText }}
    </div>

    <ejs-stepper 
      ref="stepperRef"
      :steps="steps"
      @stepChanged="handleStepChanged"
    />
  </div>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
```

### Custom Step Instructions

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { 
    label: 'Email',
    instructions: 'Enter your email address. Use a valid email format (example@domain.com)'
  },
  { 
    label: 'Password',
    instructions: 'Create a secure password with at least 8 characters including numbers and symbols'
  },
  { 
    label: 'Verification',
    instructions: 'Check your email for a verification code and enter it here'
  }
]);
</script>

<template>
  <ejs-stepper :steps="steps">
    <template v-slot:stepTemplate="{ data }">
      <div>
        <span>{{ data.label }}</span>
        <span class="sr-only">{{ data.instructions }}</span>
      </div>
    </template>
  </ejs-stepper>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
```

## Internationalization (i18n)

### Using Vue i18n

```vue
<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const steps = ref([
  { label: t('steps.personal') },
  { label: t('steps.address') },
  { label: t('steps.payment') },
  { label: t('steps.review') }
]);
</script>

<template>
  <div>
    <h1>{{ t('title.checkout') }}</h1>
    <ejs-stepper :steps="steps" />
  </div>
</template>
```

### i18n Configuration

```javascript
// i18n.js
import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    title: {
      checkout: 'Checkout Process'
    },
    steps: {
      personal: 'Personal Information',
      address: 'Shipping Address',
      payment: 'Payment Details',
      review: 'Review Order'
    },
    buttons: {
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit'
    }
  },
  es: {
    title: {
      checkout: 'Proceso de Pago'
    },
    steps: {
      personal: 'Información Personal',
      address: 'Dirección de Envío',
      payment: 'Detalles de Pago',
      review: 'Revisar Pedido'
    },
    buttons: {
      next: 'Siguiente',
      previous: 'Anterior',
      submit: 'Enviar'
    }
  },
  fr: {
    title: {
      checkout: 'Processus de Paiement'
    },
    steps: {
      personal: 'Informations Personnelles',
      address: 'Adresse de Livraison',
      payment: 'Détails du Paiement',
      review: 'Examiner la Commande'
    },
    buttons: {
      next: 'Suivant',
      previous: 'Précédent',
      submit: 'Soumettre'
    }
  }
};

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages
});

export default i18n;
```

### Multi-Language Stepper Component

```vue
<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const currentLocale = ref(locale.value);
const steps = ref([
  { label: t('steps.personal') },
  { label: t('steps.address') },
  { label: t('steps.payment') },
  { label: t('steps.review') }
]);

const changeLanguage = (newLocale) => {
  locale.value = newLocale;
  currentLocale.value = newLocale;
  // Update steps with new translations
  steps.value = [
    { label: t('steps.personal') },
    { label: t('steps.address') },
    { label: t('steps.payment') },
    { label: t('steps.review') }
  ];
};
</script>

<template>
  <div>
    <div class="language-selector">
      <button 
        @click="changeLanguage('en')"
        :class="{ active: currentLocale === 'en' }"
      >
        English
      </button>
      <button 
        @click="changeLanguage('es')"
        :class="{ active: currentLocale === 'es' }"
      >
        Español
      </button>
      <button 
        @click="changeLanguage('fr')"
        :class="{ active: currentLocale === 'fr' }"
      >
        Français
      </button>
    </div>

    <ejs-stepper :steps="steps" />

    <div class="form-controls">
      <button>{{ t('buttons.previous') }}</button>
      <button>{{ t('buttons.next') }}</button>
      <button>{{ t('buttons.submit') }}</button>
    </div>
  </div>
</template>

<style scoped>
.language-selector {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.language-selector button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.language-selector button.active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.form-controls {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
</style>
```

## Right-to-Left (RTL) Support

### Enabling RTL Mode

```vue
<script setup>
import { ref } from 'vue';
import { enableRtl } from '@syncfusion/ej2-base';

const isRtl = ref(false);
const steps = ref([
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' }
]);

const toggleRtl = () => {
  isRtl.value = !isRtl.value;
  enableRtl(isRtl.value);
};
</script>

<template>
  <div :dir="isRtl ? 'rtl' : 'ltr'">
    <button @click="toggleRtl">
      {{ isRtl ? 'Switch to LTR' : 'Switch to RTL' }}
    </button>

    <ejs-stepper 
      :steps="steps"
      :enableRtl="isRtl"
    />
  </div>
</template>
```

### RTL with Arabic Labels

```vue
<script setup>
import { ref } from 'vue';
import { enableRtl } from '@syncfusion/ej2-base';

enableRtl(true);

const steps = ref([
  { label: 'المعلومات الشخصية' },  // Personal Information (Arabic)
  { label: 'العنوان' },              // Address (Arabic)
  { label: 'الدفع' },               // Payment (Arabic)
  { label: 'المراجعة' }             // Review (Arabic)
]);
</script>

<template>
  <div dir="rtl">
    <ejs-stepper :steps="steps" :enableRtl="true" />
  </div>
</template>

<style scoped>
:global(body) {
  font-family: 'Arial Unicode MS', 'Droid Arabic Kufi', sans-serif;
}
</style>
```

## Localization

### Complete Localized Form Example

```vue
<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { enableRtl } from '@syncfusion/ej2-base';

const { t, locale } = useI18n();

const isRtl = ref(locale.value === 'ar');
const currentLocale = ref(locale.value);

const steps = ref([
  { label: t('steps.personal') },
  { label: t('steps.address') },
  { label: t('steps.payment') },
  { label: t('steps.review') }
]);

const formData = ref({
  name: '',
  email: '',
  address: '',
  city: ''
});

const changeLanguage = (newLocale) => {
  locale.value = newLocale;
  currentLocale.value = newLocale;
  isRtl.value = newLocale === 'ar';
  
  enableRtl(isRtl.value);
  
  // Update steps with new translations
  steps.value = [
    { label: t('steps.personal') },
    { label: t('steps.address') },
    { label: t('steps.payment') },
    { label: t('steps.review') }
  ];
};

const submitForm = () => {
  console.log(`Form submitted in ${currentLocale.value}`);
  console.log(formData.value);
};
</script>

<template>
  <div :dir="isRtl ? 'rtl' : 'ltr'" class="localized-form">
    <div class="language-selector">
      <button 
        v-for="lang in ['en', 'es', 'fr', 'ar']"
        :key="lang"
        @click="changeLanguage(lang)"
        :class="{ active: currentLocale === lang }"
      >
        {{ t(`languages.${lang}`) }}
      </button>
    </div>

    <h1>{{ t('title.checkout') }}</h1>

    <ejs-stepper 
      :steps="steps"
      :enableRtl="isRtl"
    />

    <div class="form-container">
      <input 
        v-model="formData.name"
        :placeholder="t('form.name')"
      />
      <input 
        v-model="formData.email"
        :placeholder="t('form.email')"
        type="email"
      />
      <input 
        v-model="formData.address"
        :placeholder="t('form.address')"
      />
      <input 
        v-model="formData.city"
        :placeholder="t('form.city')"
      />
    </div>

    <button @click="submitForm">{{ t('buttons.submit') }}</button>
  </div>
</template>

<style scoped>
.localized-form {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.language-selector {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.language-selector button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.language-selector button:hover {
  background: #f0f0f0;
}

.language-selector button.active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 20px 0;
}

.form-container input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}
</style>
```

## Best Practices

**Accessibility:**
- ✅ Always include ARIA labels and descriptions
- ✅ Ensure adequate color contrast (4.5:1 minimum)
- ✅ Provide keyboard navigation support
- ✅ Test with screen readers (NVDA, JAWS, VoiceOver)
- ✅ Announce step changes to screen readers
- ✅ Use semantic HTML

**Internationalization:**
- ✅ Use vue-i18n for translations
- ✅ Support RTL languages with `enableRtl()`
- ✅ Provide language switcher
- ✅ Test with native speakers
- ✅ Include regional date/time formats
- ✅ Handle plural forms correctly

**Globalization:**
- ✅ Use locale-aware number formatting
- ✅ Support multiple character sets
- ✅ Consider cultural differences in UI
- ✅ Test accessibility in multiple languages
- ✅ Maintain consistent styling across all languages
- ✅ Provide fallback content for unsupported languages

