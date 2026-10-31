# Accessibility

## Table of Contents
- [WCAG & Section 508 Compliance](#wcag--section-508-compliance)
  - [Supported Accessibility Standards](#supported-accessibility-standards)
- [WAI-ARIA Attributes](#wai-aria-attributes)
  - [ARIA Attributes Implemented](#aria-attributes-implemented)
  - [ARIA Attributes Reference](#aria-attributes-reference)
- [Screen Reader Support](#screen-reader-support)
  - [Screen Reader Announcement Example](#screen-reader-announcement-example)
  - [What Screen Readers Announce](#what-screen-readers-announce)
- [Keyboard Navigation](#keyboard-navigation)
  - [Keyboard Support](#keyboard-support)
  - [Keyboard Shortcuts](#keyboard-shortcuts)
- [Color Contrast](#color-contrast)
  - [High Contrast Colors](#high-contrast-colors)
  - [Testing Color Contrast](#testing-color-contrast)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
  - [RTL Implementation](#rtl-implementation)
- [Mobile Device Accessibility](#mobile-device-accessibility)
  - [Mobile-Friendly Progressbar](#mobile-friendly-progressbar)
- [Accessible Progress Patterns](#accessible-progress-patterns)
  - [Accessible Loading Indicator](#accessible-loading-indicator)
  - [Accessible Task Progress](#accessible-task-progress)
- [Accessibility Testing](#accessibility-testing)
  - [Tools to Verify Accessibility](#tools-to-verify-accessibility)
  - [Accessibility Checklist](#accessibility-checklist)

## WCAG & Section 508 Compliance

The Syncfusion Vue Progressbar component meets strict accessibility standards including WCAG 2.2 and Section 508 requirements.

### Supported Accessibility Standards

**The component includes:**
- ✓ WCAG 2.2 Level AA compliance
- ✓ Section 508 compliance
- ✓ Screen reader support
- ✓ Right-to-left (RTL) support
- ✓ Keyboard navigation
- ✓ High contrast support
- ✓ Color contrast compliance
- ✓ Mobile device accessibility

## WAI-ARIA Attributes

The progressbar implements proper ARIA attributes for screen readers.

### ARIA Attributes Implemented

```vue
<template>
  <div class="aria-example">
    <h3>WAI-ARIA Attributes</h3>

    <ejs-progressbar
      id="accessible-progress"
      type="Circular"
      height="200px"
      width="200px"
      :value="75"
      :showProgressValue="true"
      role="progressbar"
      aria-label="File download progress"
      :aria-valuemin="0"
      :aria-valuemax="100"
      :aria-valuenow="75"
      aria-valuetext="75% complete"
    >
    </ejs-progressbar>

    <p>Screen reader will announce: "File download progress, 75% complete"</p>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.aria-example {
  padding: 20px;
}

p {
  margin-top: 15px;
  color: #666;
  font-size: 14px;
}
</style>
```

### ARIA Attributes Reference

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `role` | `progressbar` | Identifies element as a progress indicator |
| `aria-label` | Descriptive text | Describes progressbar purpose |
| `aria-valuemin` | Number | Minimum value (0) |
| `aria-valuemax` | Number | Maximum value (100) |
| `aria-valuenow` | Number | Current value |
| `aria-valuetext` | Text | Human-readable current value |

## Screen Reader Support

Progressbars are announced correctly to screen reader users.

### Screen Reader Announcement Example

```vue
<template>
  <div class="screen-reader-example">
    <h3>Screen Reader Accessible Progressbar</h3>

    <!-- Task Completion -->
    <ejs-progressbar
      id="task-progress"
      type="Linear"
      height="60"
      :value="taskProgress"
      :showProgressValue="true"
      role="progressbar"
      aria-label="Task completion"
      :aria-valuemin="0"
      :aria-valuemax="100"
      :aria-valuenow="taskProgress"
      :aria-valuetext="`${taskProgress}% complete`"
    >
    </ejs-progressbar>

    <label for="task-progress">Installation Progress</label>

    <div class="controls">
      <button @click="incrementTask" aria-label="Increase progress">+10%</button>
      <button @click="decrementTask" aria-label="Decrease progress">-10%</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const taskProgress = ref(0);

const incrementTask = () => {
  taskProgress.value = Math.min(taskProgress.value + 10, 100);
};

const decrementTask = () => {
  taskProgress.value = Math.max(taskProgress.value - 10, 0);
};
</script>

<style scoped>
.screen-reader-example {
  padding: 20px;
}

label {
  display: block;
  margin-top: 15px;
  margin-bottom: 10px;
  font-weight: bold;
}

.controls {
  margin-top: 15px;
}

button {
  margin-right: 10px;
  padding: 8px 12px;
  cursor: pointer;
}
</style>
```

### What Screen Readers Announce

**Example announcements:**
- "File upload, progressbar, 75% complete"
- "Circular progress bar, 50 out of 100"
- "Task installation, indeterminate loading state"

## Keyboard Navigation

Users can navigate and interact with progressbars using keyboard.

### Keyboard Support

```vue
<template>
  <div class="keyboard-nav">
    <h3>Keyboard Navigation</h3>

    <ejs-progressbar
      id="keyboard-progress"
      type="Circular"
      height="200px"
      width="200px"
      :value="keyboardProgress"
      :showProgressValue="true"
      tabindex="0"
      role="progressbar"
      aria-label="Keyboard accessible progress"
      @keydown="handleKeydown"
    >
    </ejs-progressbar>

    <div class="keyboard-help">
      <h4>Keyboard Shortcuts:</h4>
      <ul>
        <li><kbd>Tab</kbd> - Focus progressbar</li>
        <li><kbd>Ctrl + P</kbd> - Print progressbar</li>
        <li><kbd>→</kbd> - Increase progress</li>
        <li><kbd>←</kbd> - Decrease progress</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const keyboardProgress = ref(50);

const handleKeydown = (event) => {
  switch (event.key) {
    case "ArrowRight":
      keyboardProgress.value = Math.min(keyboardProgress.value + 10, 100);
      event.preventDefault();
      break;
    case "ArrowLeft":
      keyboardProgress.value = Math.max(keyboardProgress.value - 10, 0);
      event.preventDefault();
      break;
    case "p":
      if (event.ctrlKey) {
        window.print();
        event.preventDefault();
      }
      break;
  }
};
</script>

<style scoped>
.keyboard-nav {
  padding: 20px;
  text-align: center;
}

.keyboard-help {
  text-align: left;
  margin-top: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 4px;
}

.keyboard-help h4 {
  margin-top: 0;
}

.keyboard-help ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.keyboard-help li {
  padding: 5px 0;
}

kbd {
  background: #fff;
  border: 1px solid #ccc;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
  font-size: 12px;
}
</style>
```

### Keyboard Shortcuts

| Key | Action | Use Case |
|-----|--------|----------|
| <kbd>Tab</kbd> | Move focus to progressbar | Navigate between elements |
| <kbd>Ctrl + P</kbd> | Print progressbar | Print the component |
| <kbd>→</kbd> | Increase progress (custom) | Custom increment |
| <kbd>←</kbd> | Decrease progress (custom) | Custom decrement |

## Color Contrast

Ensure progressbars meet color contrast requirements for visibility.

### High Contrast Colors

```vue
<template>
  <div class="contrast-examples">
    <h3>Color Contrast Compliance</h3>

    <!-- WCAG AAA Contrast (7:1 ratio) -->
    <div class="contrast-section">
      <label>High Contrast (WCAG AAA: 7:1 ratio)</label>
      <ejs-progressbar
        type="Linear"
        height="50"
        progressColor="#000000"
        trackColor="#FFFFFF"
        :value="80"
      >
      </ejs-progressbar>
    </div>

    <!-- WCAG AA Contrast (4.5:1 ratio) -->
    <div class="contrast-section">
      <label>Standard Contrast (WCAG AA: 4.5:1 ratio)</label>
      <ejs-progressbar
        type="Linear"
        height="50"
        progressColor="#0047AB"
        trackColor="#F0F0F0"
        :value="80"
      >
      </ejs-progressbar>
    </div>

    <!-- Enhanced for visibility -->
    <div class="contrast-section">
      <label>Enhanced Contrast</label>
      <ejs-progressbar
        type="Linear"
        height="50"
        progressColor="#003366"
        trackColor="#CCCCCC"
        :value="80"
      >
      </ejs-progressbar>
    </div>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.contrast-examples {
  padding: 20px;
}

.contrast-section {
  margin-bottom: 30px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}
</style>
```

### Testing Color Contrast

Use these tools to verify contrast:
- WebAIM Contrast Checker
- Axe DevTools Browser Extension
- Lighthouse in Chrome DevTools
- Wave Browser Extension

## Right-to-Left (RTL) Support

The progressbar fully supports RTL languages.

### RTL Implementation

```vue
<template>
  <div class="rtl-example" :dir="isRTL ? 'rtl' : 'ltr'">
    <h3>{{ isRTL ? 'من اليمين إلى اليسار' : 'Right-to-Left Support' }}</h3>

    <ejs-progressbar
      :enableRtl="isRTL"
      type="Linear"
      height="60"
      :value="60"
      :showProgressValue="true"
    >
    </ejs-progressbar>

    <button @click="toggleRTL">Toggle RTL</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const isRTL = ref(false);

const toggleRTL = () => {
  isRTL.value = !isRTL.value;
};
</script>

<style scoped>
.rtl-example {
  padding: 20px;
  text-align: center;
}

button {
  margin-top: 15px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
```

## Mobile Device Accessibility

Progressbars are fully accessible on mobile devices.

### Mobile-Friendly Progressbar

```vue
<template>
  <div class="mobile-accessible">
    <h3>Mobile Accessible Progressbar</h3>

    <!-- Responsive sizing -->
    <ejs-progressbar
      type="Linear"
      :width="containerWidth"
      height="50"
      :value="mobileProgress"
      :showProgressValue="true"
      role="progressbar"
      aria-label="Download progress"
      :aria-valuenow="mobileProgress"
    >
    </ejs-progressbar>

    <!-- Touch-friendly buttons -->
    <div class="mobile-controls">
      <button @click="startDownload" aria-label="Start download">Start</button>
      <button @click="pauseDownload" aria-label="Pause download">Pause</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const mobileProgress = ref(0);
const containerWidth = ref("90%");
let downloadInterval = null;

const updateWidth = () => {
  const width = window.innerWidth;
  if (width < 480) {
    containerWidth.value = "85%";
  } else if (width < 768) {
    containerWidth.value = "90%";
  } else {
    containerWidth.value = "60%";
  }
};

const startDownload = () => {
  if (downloadInterval) return;
  
  downloadInterval = setInterval(() => {
    mobileProgress.value = Math.min(mobileProgress.value + 5, 100);
    
    if (mobileProgress.value >= 100) {
      clearInterval(downloadInterval);
      downloadInterval = null;
    }
  }, 400);
};

const pauseDownload = () => {
  if (downloadInterval) {
    clearInterval(downloadInterval);
    downloadInterval = null;
  }
};

onMounted(() => {
  updateWidth();
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
  if (downloadInterval) {
    clearInterval(downloadInterval);
  }
});
</script>

<style scoped>
.mobile-accessible {
  padding: 20px;
  text-align: center;
}

.mobile-controls {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

button {
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  min-width: 100px;
  touch-action: manipulation;
}

@media (max-width: 480px) {
  button {
    flex: 1;
    min-width: 80px;
  }
}
</style>
```

## Accessible Progress Patterns

### Accessible Loading Indicator

```vue
<template>
  <div class="accessible-loading">
    <h3>Accessible Loading Pattern</h3>

    <div role="status" aria-live="polite" aria-label="Loading content">
      <ejs-progressbar
        type="Linear"
        height="60"
        :value="0"
        :isIndeterminate="true"
      >
      </ejs-progressbar>
      <p>{{ loadingMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const loadingMessage = ref("Loading content...");
</script>

<style scoped>
.accessible-loading {
  padding: 20px;
}

[role="status"] {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
}

p {
  margin: 10px 0 0 0;
  color: #666;
}
</style>
```

### Accessible Task Progress

```vue
<template>
  <div class="accessible-task">
    <h3>Accessible Task Progress</h3>

    <fieldset>
      <legend>Installation Steps</legend>
      
      <ejs-progressbar
        type="Linear"
        height="60"
        :value="stepProgress"
        :segmentCount="totalSteps"
        :showProgressValue="true"
        role="progressbar"
        :aria-label="`Step ${currentStep} of ${totalSteps}: ${stepNames[currentStep - 1]}`"
        :aria-valuenow="stepProgress"
        :aria-valuemin="0"
        :aria-valuemax="100"
      >
      </ejs-progressbar>
    </fieldset>

    <div class="step-description">
      <p>{{ stepDescriptions[currentStep - 1] }}</p>
    </div>

    <div class="controls">
      <button @click="prevStep" :disabled="currentStep === 1">Previous</button>
      <button @click="nextStep" :disabled="currentStep === totalSteps">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const totalSteps = 5;
const currentStep = ref(1);

const stepNames = [
  "Preparing",
  "Downloading",
  "Installing",
  "Configuring",
  "Completing"
];

const stepDescriptions = [
  "Preparing installation files",
  "Downloading required components",
  "Installing software",
  "Configuring system settings",
  "Completing installation"
];

const stepProgress = computed(() => {
  return (currentStep.value / totalSteps) * 100;
});

const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};
</script>

<style scoped>
.accessible-task {
  padding: 20px;
}

fieldset {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 15px;
}

legend {
  font-weight: bold;
  padding: 0 10px;
}

.step-description {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
  margin: 15px 0;
}

.controls {
  text-align: center;
}

button {
  margin: 0 5px;
  padding: 8px 16px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

## Accessibility Testing

### Tools to Verify Accessibility

1. **Axe DevTools** - Browser extension for accessibility checking
2. **Wave** - Web accessibility evaluation tool
3. **Lighthouse** - Chrome DevTools built-in auditing
4. **Screen Readers** - NVDA (free), JAWS, VoiceOver
5. **Color Contrast** - WebAIM Contrast Checker

### Accessibility Checklist

- [ ] ARIA labels provided for all progressbars
- [ ] Proper `role="progressbar"` attribute
- [ ] `aria-valuenow`, `aria-valuemin`, `aria-valuemax` set
- [ ] Color contrast meets WCAG AA (4.5:1) minimum
- [ ] Keyboard navigation functional
- [ ] Screen reader testing completed
- [ ] RTL support verified for RTL languages
- [ ] Mobile touch targets are adequate (≥48px)
- [ ] Labels associated with progressbars
- [ ] Error messages clear and announced
