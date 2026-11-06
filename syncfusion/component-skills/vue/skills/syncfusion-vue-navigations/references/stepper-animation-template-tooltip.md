# Animation, Templates, and Tooltips

## Table of Contents
- [Step Animation](#step-animation)
- [Custom Templates](#custom-templates)
- [Tooltips](#tooltips)
- [Combining Animation with Templates](#combining-animation-with-templates)

## Step Animation

Control how steps appear and disappear with animation settings.

### Animation Properties

The `animation` property accepts an object with the following properties:

```typescript
interface Animation {
  duration?: number;      // Duration in milliseconds (default: 400)
  delay?: number;         // Delay before animation starts (default: 0)
  easing?: string;        // Easing function (default: 'ease')
  enable?: boolean;       // Enable/disable animation (default: true)
}
```

### Basic Animation Example

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' }
]);

const animationConfig = ref({
  duration: 600,
  easing: 'ease-in-out',
  enable: true
});
</script>

<template>
  <ejs-stepper 
    :steps="steps"
    :animation="animationConfig"
  />
</template>
```

### Animation with Different Easing Functions

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { label: 'Fade', },
  { label: 'Slide' },
  { label: 'Bounce' }
]);

// Different easing functions
const animations = ref({
  fade: {
    duration: 500,
    easing: 'ease-out',
    enable: true
  },
  slide: {
    duration: 700,
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    enable: true
  },
  bounce: {
    duration: 800,
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    enable: true
  }
});

const selectedAnimation = ref('fade');

const applyAnimation = () => {
  return animations.value[selectedAnimation.value];
};
</script>

<template>
  <div>
    <select v-model="selectedAnimation">
      <option value="fade">Fade</option>
      <option value="slide">Slide</option>
      <option value="bounce">Bounce</option>
    </select>

    <ejs-stepper 
      :steps="steps"
      :animation="applyAnimation()"
    />
  </div>
</template>
```

### Disable Animation for Performance

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' }
]);

const animationConfig = ref({
  enable: false
});
</script>

<template>
  <ejs-stepper 
    :steps="steps"
    :animation="animationConfig"
  />
</template>
```

## Custom Templates

Customize how steps and their content are rendered using Vue slots.

### Templating with v-slot

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { label: 'Personal Info', iconCss: 'sf-icon-user' },
  { label: 'Address', iconCss: 'sf-icon-location' },
  { label: 'Payment', iconCss: 'sf-icon-wallet' }
]);
</script>

<template>
  <ejs-stepper :steps="steps">
    <template v-slot:stepTemplate="{ data }">
      <div class="custom-step">
        <i :class="data.iconCss"></i>
        <span>{{ data.label }}</span>
      </div>
    </template>
  </ejs-stepper>
</template>

<style scoped>
.custom-step {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
```

### Template with Dynamic Content

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { 
    label: 'Contact Info',
    content: 'Enter your email and phone',
    completed: false
  },
  { 
    label: 'Shipping',
    content: 'Select delivery address',
    completed: false
  },
  { 
    label: 'Payment',
    content: 'Choose payment method',
    completed: false
  }
]);

const handleStepChanged = (args) => {
  if (args.previousStep >= 0) {
    steps.value[args.previousStep].completed = true;
  }
};
</script>

<template>
  <ejs-stepper 
    :steps="steps"
    @stepChanged="handleStepChanged"
  >
    <template v-slot:stepTemplate="{ data }">
      <div class="step-content">
        <h4>{{ data.label }}</h4>
        <p>{{ data.content }}</p>
        <span v-if="data.completed" class="badge">✓</span>
      </div>
    </template>
  </ejs-stepper>
</template>

<style scoped>
.step-content {
  padding: 10px;
}

.badge {
  color: green;
  font-weight: bold;
}
</style>
```

### Advanced Template with Conditional Rendering

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { label: 'Step 1', status: 'success' },
  { label: 'Step 2', status: 'in-progress' },
  { label: 'Step 3', status: 'pending' }
]);

const stepIcons = {
  success: '✓',
  'in-progress': '⟳',
  pending: '○'
};
</script>

<template>
  <ejs-stepper :steps="steps">
    <template v-slot:stepTemplate="{ data, index }">
      <div :class="['step-wrapper', data.status]">
        <div class="step-icon">
          {{ stepIcons[data.status] }}
        </div>
        <div class="step-label">
          {{ data.label }}
        </div>
      </div>
    </template>
  </ejs-stepper>
</template>

<style scoped>
.step-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 4px;
}

.step-wrapper.success {
  background: #e8f5e9;
  color: #2e7d32;
}

.step-wrapper.in-progress {
  background: #e3f2fd;
  color: #1565c0;
}

.step-wrapper.pending {
  background: #f5f5f5;
  color: #666;
}

.step-icon {
  font-weight: bold;
  font-size: 18px;
}
</style>
```

## Tooltips

Add tooltips to steps for additional information.

### Basic Tooltip

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { 
    label: 'Step 1',
    tooltip: 'Enter your contact information'
  },
  { 
    label: 'Step 2',
    tooltip: 'Provide shipping address'
  },
  { 
    label: 'Step 3',
    tooltip: 'Complete payment'
  }
]);
</script>

<template>
  <ejs-stepper :steps="steps">
    <template v-slot:stepTemplate="{ data }">
      <div 
        :title="data.tooltip"
        class="step-with-tooltip"
      >
        {{ data.label }}
      </div>
    </template>
  </ejs-stepper>
</template>

<style scoped>
.step-with-tooltip {
  cursor: help;
  border-bottom: 1px dotted #999;
}
</style>
```

### Custom Tooltip Component

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { 
    label: 'Personal',
    tooltipText: 'Your personal details',
    tooltipIcon: 'info'
  },
  { 
    label: 'Address',
    tooltipText: 'Your delivery address',
    tooltipIcon: 'location'
  },
  { 
    label: 'Payment',
    tooltipText: 'Payment information',
    tooltipIcon: 'credit-card'
  }
]);

const showTooltip = ref(false);
const tooltipContent = ref('');

const handleStepHover = (data) => {
  tooltipContent.value = data.tooltipText;
  showTooltip.value = true;
};

const handleStepLeave = () => {
  showTooltip.value = false;
};
</script>

<template>
  <div>
    <ejs-stepper :steps="steps">
      <template v-slot:stepTemplate="{ data }">
        <div 
          class="step-with-hover-tooltip"
          @mouseenter="handleStepHover(data)"
          @mouseleave="handleStepLeave"
        >
          <i :class="`icon-${data.tooltipIcon}`"></i>
          {{ data.label }}
        </div>
      </template>
    </ejs-stepper>

    <div v-if="showTooltip" class="tooltip">
      {{ tooltipContent }}
    </div>
  </div>
</template>

<style scoped>
.step-with-hover-tooltip {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background 0.2s;
}

.step-with-hover-tooltip:hover {
  background: #f0f0f0;
}

.tooltip {
  position: absolute;
  background: #333;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 1000;
  top: -40px;
  white-space: nowrap;
}
</style>
```

### Tooltip with Help Text

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { 
    label: 'Email Address',
    helpText: 'We will never share your email with anyone',
    required: true
  },
  { 
    label: 'Home Address',
    helpText: 'Used only for delivery purposes',
    required: true
  },
  { 
    label: 'Phone Number',
    helpText: 'Optional - for order updates',
    required: false
  }
]);
</script>

<template>
  <ejs-stepper :steps="steps">
    <template v-slot:stepTemplate="{ data }">
      <div class="step-with-help">
        <span>{{ data.label }}</span>
        <span v-if="data.required" class="required">*</span>
        <div class="help-text">{{ data.helpText }}</div>
      </div>
    </template>
  </ejs-stepper>
</template>

<style scoped>
.step-with-help {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.required {
  color: red;
}

.help-text {
  font-size: 12px;
  color: #999;
  font-weight: normal;
}
</style>
```

## Combining Animation with Templates

Create advanced UI patterns by combining animation, templates, and custom styling.

### Complete Example: Animated Wizard with Status

```vue
<script setup>
import { ref } from 'vue';

const stepperRef = ref(null);
const steps = ref([
  { 
    label: 'Account Setup',
    status: 'success',
    icon: '✓'
  },
  { 
    label: 'Verify Email',
    status: 'in-progress',
    icon: '⟳'
  },
  { 
    label: 'Configure Profile',
    status: 'pending',
    icon: '○'
  },
  { 
    label: 'Complete',
    status: 'pending',
    icon: '○'
  }
]);

const animationConfig = ref({
  duration: 500,
  easing: 'ease-in-out',
  enable: true
});

const handleStepChanged = (args) => {
  // Update step status
  steps.value.forEach((step, index) => {
    if (index < args.activeStep) {
      step.status = 'success';
      step.icon = '✓';
    } else if (index === args.activeStep) {
      step.status = 'in-progress';
      step.icon = '⟳';
    } else {
      step.status = 'pending';
      step.icon = '○';
    }
  });
};
</script>

<template>
  <div class="wizard-container">
    <ejs-stepper 
      ref="stepperRef"
      :steps="steps"
      :animation="animationConfig"
      @stepChanged="handleStepChanged"
    >
      <template v-slot:stepTemplate="{ data }">
        <div :class="['wizard-step', data.status]">
          <div class="step-icon">{{ data.icon }}</div>
          <div class="step-label">{{ data.label }}</div>
        </div>
      </template>
    </ejs-stepper>
  </div>
</template>

<style scoped>
.wizard-container {
  padding: 20px;
}

.wizard-step {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.wizard-step.success {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  color: #1b5e20;
  box-shadow: 0 2px 4px rgba(76, 175, 80, 0.2);
}

.wizard-step.in-progress {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  color: #0d47a1;
  box-shadow: 0 2px 4px rgba(33, 150, 243, 0.2);
  animation: pulse 1.5s infinite;
}

.wizard-step.pending {
  background: linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%);
  color: #666;
}

.step-icon {
  font-size: 18px;
  font-weight: bold;
  min-width: 24px;
  text-align: center;
}

.step-label {
  flex: 1;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>
```

### Multi-Phase Onboarding Stepper

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { 
    label: 'Create Account',
    phase: 'basics',
    description: 'Set up your account',
    duration: '2 min'
  },
  { 
    label: 'Add Details',
    phase: 'profile',
    description: 'Complete your profile',
    duration: '3 min'
  },
  { 
    label: 'Verify Email',
    phase: 'verification',
    description: 'Confirm your email address',
    duration: '1 min'
  },
  { 
    label: 'Start Using',
    phase: 'complete',
    description: 'You are all set!',
    duration: '-'
  }
]);

const animationConfig = ref({
  duration: 600,
  delay: 100,
  easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  enable: true
});
</script>

<template>
  <div class="onboarding-container">
    <ejs-stepper 
      :steps="steps"
      :animation="animationConfig"
    >
      <template v-slot:stepTemplate="{ data, index }">
        <div class="onboarding-step">
          <div class="phase-badge">{{ data.phase }}</div>
          <div class="step-info">
            <div class="step-label">{{ data.label }}</div>
            <div class="step-description">{{ data.description }}</div>
          </div>
          <div class="step-duration">{{ data.duration }}</div>
        </div>
      </template>
    </ejs-stepper>
  </div>
</template>

<style scoped>
.onboarding-container {
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

.onboarding-step {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.phase-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  min-width: fit-content;
}

.step-info {
  flex: 1;
}

.step-label {
  font-weight: 600;
  font-size: 16px;
}

.step-description {
  font-size: 14px;
  opacity: 0.9;
  margin-top: 4px;
}

.step-duration {
  font-size: 12px;
  opacity: 0.8;
  min-width: fit-content;
}
</style>
```

## Best Practices

**Animation:**
- ✅ Use moderate durations (300-600ms) for smooth UX
- ✅ Disable animation for performance-critical scenarios
- ✅ Use appropriate easing functions for the use case
- ✅ Consider accessibility when adding animations

**Templates:**
- ✅ Keep templates simple for better performance
- ✅ Use v-slot for flexible customization
- ✅ Bind data properties correctly
- ✅ Apply conditional styling with :class

**Tooltips:**
- ✅ Provide helpful, concise text
- ✅ Use title attribute for native tooltips
- ✅ Implement hover states for interactivity
- ✅ Consider mobile users when using hover tooltips

