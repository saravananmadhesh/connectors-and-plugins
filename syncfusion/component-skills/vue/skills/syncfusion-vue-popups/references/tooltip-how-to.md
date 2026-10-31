# Tooltip - How To

## Common Scenarios

### Form Field Help

```vue
<template>
  <form style="display: flex; flex-direction: column; gap: 12px; max-width: 300px;">
    <div>
      <label for="username">Username</label>
      <input
        id="username"
        type="text"
        placeholder="3-20 characters"
        aria-describedby="username-help"
        style="width: 100%; padding: 8px;"
      />
      <ejs-tooltip 
        target="#username"
        content="Letters, numbers, underscores only"
        id="username-help"
        position="RightCenter"
        opensOn="Focus"
      />
    </div>

    <div>
      <label for="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="user@example.com"
        aria-describedby="email-help"
        style="width: 100%; padding: 8px;"
      />
      <ejs-tooltip 
        target="#email"
        content="Valid email: user@example.com"
        id="email-help"
        position="RightCenter"
        opensOn="Focus"
      />
    </div>

    <button type="submit" class="e-btn">Register</button>
  </form>
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: 'App',
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

### Validation Feedback

```vue
<template>
  <div style="max-width: 300px;">
    <label for="password">Password</label>
    <input
      id="password"
      type="password"
      placeholder="Enter password"
      @input="validatePassword"
      style="width: 100%; padding: 8px; margin: 8px 0;"
    />

    <ejs-tooltip 
      v-if="passwordError"
      target="#password"
      :content="passwordError"
      :isSticky="true"
      cssClass="error-tooltip"
      role="alert"
    />

    <div v-if="passwordStrength" style="margin-top: 10px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
        <span>Strength:</span>
        <span :style="{ color: strengthColor }">{{ strengthText }}</span>
      </div>
      <div style="height: 4px; background: #e0e0e0; border-radius: 2px; overflow: hidden;">
        <div 
          :style="{
            width: strengthPercent + '%',
            height: '100%',
            background: strengthColor,
            transition: 'width 0.3s ease'
          }"
        />
      </div>
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
      passwordValue: '',
      passwordError: ''
    };
  },
  computed: {
    passwordStrength() {
      return this.passwordValue.length > 0;
    },
    strengthPercent() {
      const value = this.passwordValue;
      let score = 0;

      if (value.length >= 8) score += 20;
      if (/[a-z]/.test(value)) score += 20;
      if (/[A-Z]/.test(value)) score += 20;
      if (/[0-9]/.test(value)) score += 20;
      if (/[!@#$%^&*]/.test(value)) score += 20;

      return score;
    },
    strengthText() {
      if (this.strengthPercent < 40) return 'Weak';
      if (this.strengthPercent < 80) return 'Medium';
      return 'Strong';
    },
    strengthColor() {
      if (this.strengthPercent < 40) return '#f44336';
      if (this.strengthPercent < 80) return '#FF9800';
      return '#4CAF50';
    }
  },
  methods: {
    validatePassword(event) {
      this.passwordValue = event.target.value;
      this.passwordError = '';

      if (this.passwordValue.length === 0) {
        this.passwordError = '';
      } else if (this.passwordValue.length < 8) {
        this.passwordError = 'Minimum 8 characters required';
      } else if (!/[A-Z]/.test(this.passwordValue)) {
        this.passwordError = 'Must contain uppercase letter (A-Z)';
      } else if (!/[a-z]/.test(this.passwordValue)) {
        this.passwordError = 'Must contain lowercase letter (a-z)';
      } else if (!/[0-9]/.test(this.passwordValue)) {
        this.passwordError = 'Must contain number (0-9)';
      } else if (!/[!@#$%^&*]/.test(this.passwordValue)) {
        this.passwordError = 'Must contain special character (!@#$%^&*)';
      }
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  font-weight: 500;
  margin-bottom: 4px;
}

:deep(.error-tooltip .e-tooltip) {
  background-color: #f44336;
  color: white;
}
</style>
```

### Info Icons

```vue
<template>
  <div style="display: flex; gap: 20px; padding: 20px;">
    <div>
      <h3>
        API Rate Limit
        <button 
          id="infoBtn1"
          class="info-icon"
          aria-label="Rate limit information"
        >
          ℹ️
        </button>
      </h3>
      <ejs-tooltip 
        target="#infoBtn1"
        content="100 requests per minute"
        position="RightCenter"
      />
    </div>

    <div>
      <h3>
        Authentication
        <button 
          id="infoBtn2"
          class="info-icon"
          aria-label="Authentication information"
        >
          ℹ️
        </button>
      </h3>
      <ejs-tooltip 
        target="#infoBtn2"
        :content="authInfo"
        position="RightCenter"
      />
    </div>

    <div>
      <h3>
        Premium Features
        <button 
          id="infoBtn3"
          class="info-icon"
          aria-label="Premium features information"
        >
          ℹ️
        </button>
      </h3>
      <ejs-tooltip 
        target="#infoBtn3"
        :content="premiumInfo"
        position="RightCenter"
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
      authInfo: `
  <div style="font-size: 12px;">
    <strong>Supported Methods:</strong>
    <ul style="margin: 5px 0; padding-left: 15px;">
      <li>API Key</li>
      <li>OAuth 2.0</li>
      <li>JWT</li>
    </ul>
  </div>
`,
      premiumInfo: `
  <div style="font-size: 12px;">
    <strong>Upgrade to Premium:</strong>
    <ul style="margin: 5px 0; padding-left: 15px;">
      <li>Unlimited requests</li>
      <li>Advanced analytics</li>
      <li>Priority support</li>
    </ul>
  </div>
`
    };
  }
};
</script>

<style scoped>
.info-icon {
  background: none;
  border: none;
  padding: 0;
  margin-left: 8px;
  cursor: pointer;
  font-size: 16px;
  vertical-align: super;
}

.info-icon:hover {
  transform: scale(1.1);
}
</style>
```

### Keyboard Shortcuts

```vue
<template>
  <div style="padding: 20px;">
    <h2>Keyboard Shortcuts</h2>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
      <button id="saveBtn" class="e-btn shortcut-btn">
        💾 Save
      </button>
      <button id="undoBtn" class="e-btn shortcut-btn">
        ↶ Undo
      </button>
      <button id="redoBtn" class="e-btn shortcut-btn">
        ↷ Redo
      </button>
      <button id="searchBtn" class="e-btn shortcut-btn">
        🔍 Search
      </button>
    </div>

    <ejs-tooltip 
      target="#saveBtn"
      content="Ctrl+S"
      position="TopCenter"
    />

    <ejs-tooltip 
      target="#undoBtn"
      content="Ctrl+Z"
      position="TopCenter"
    />

    <ejs-tooltip 
      target="#redoBtn"
      content="Ctrl+Y"
      position="TopCenter"
    />

    <ejs-tooltip 
      target="#searchBtn"
      content="Ctrl+F"
      position="TopCenter"
    />
  </div>
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: 'App',
  components: {
    'ejs-tooltip': TooltipComponent
  }
};
</script>

<style scoped>
.shortcut-btn {
  width: 100%;
}
</style>
```

### Status Indicators

```vue
<template>
  <div style="display: flex; gap: 15px; padding: 20px;">
    <div class="status-item">
      <div class="status-dot" id="online" style="background: #4CAF50;"></div>
      <span>Online</span>
      <ejs-tooltip 
        target="#online"
        content="Connected"
        position="RightCenter"
      />
    </div>

    <div class="status-item">
      <div class="status-dot" id="idle" style="background: #FF9800;"></div>
      <span>Idle</span>
      <ejs-tooltip 
        target="#idle"
        content="Away for 5 minutes"
        position="RightCenter"
      />
    </div>

    <div class="status-item">
      <div class="status-dot" id="offline" style="background: #f44336;"></div>
      <span>Offline</span>
      <ejs-tooltip 
        target="#offline"
        content="Disconnected"
        position="RightCenter"
      />
    </div>

    <div class="status-item">
      <div class="status-dot" id="dnd" style="background: #9E9E9E;"></div>
      <span>Do Not Disturb</span>
      <ejs-tooltip 
        target="#dnd"
        content="Notifications disabled"
        position="RightCenter"
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
  }
};
</script>

<style scoped>
.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
```

## Advanced Patterns

### Dynamic Content

```vue
<template>
  <div>
    <button id="btn" class="e-btn" @click="updateData">
      Hover for data
    </button>

    <ejs-tooltip 
      ref="tooltip"
      target="#btn"
      :content="tooltipContent"
      position="TopCenter"
    />
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
      data: {
        name: 'John Doe',
        status: 'Active',
        lastSeen: new Date().toLocaleTimeString()
      }
    };
  },
  computed: {
    tooltipContent() {
      return `
    <div style="font-size: 12px;">
      <strong>${this.data.name}</strong>
      <p>Status: ${this.data.status}</p>
      <p>Last seen: ${this.data.lastSeen}</p>
    </div>
  `;
    }
  },
  methods: {
    updateData() {
      this.data.lastSeen = new Date().toLocaleTimeString();
      this.$refs.tooltip?.refresh();
    }
  }
};
</script>
```

### Adaptive Positioning

```vue
<template>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 100px 20px;">
    <button id="topLeft" class="e-btn">Top Left</button>
    <button id="topCenter" class="e-btn">Top Center</button>
    <button id="topRight" class="e-btn">Top Right</button>

    <button id="leftTop" class="e-btn">Left Top</button>
    <button id="center" class="e-btn">Center</button>
    <button id="rightTop" class="e-btn">Right Top</button>

    <button id="bottomLeft" class="e-btn">Bottom Left</button>
    <button id="bottomCenter" class="e-btn">Bottom Center</button>
    <button id="bottomRight" class="e-btn">Bottom Right</button>

    <ejs-tooltip target="#topLeft" content="TopLeft" position="TopLeft" />
    <ejs-tooltip target="#topCenter" content="TopCenter" position="TopCenter" />
    <ejs-tooltip target="#topRight" content="TopRight" position="TopRight" />

    <ejs-tooltip target="#leftTop" content="LeftTop" position="LeftTop" />
    <ejs-tooltip target="#center" content="Center" position="TopCenter" />
    <ejs-tooltip target="#rightTop" content="RightTop" position="RightTop" />

    <ejs-tooltip target="#bottomLeft" content="BottomLeft" position="BottomLeft" />
    <ejs-tooltip target="#bottomCenter" content="BottomCenter" position="BottomCenter" />
    <ejs-tooltip target="#bottomRight" content="BottomRight" position="BottomRight" />
  </div>
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: 'App',
  components: {
    'ejs-tooltip': TooltipComponent
  }
};
</script>

<style scoped>
.e-btn {
  width: 100%;
}
</style>
```

### Multi-Target Tooltip

```vue
<template>
  <div style="display: flex; gap: 10px; padding: 20px;">
    <button id="btn1" class="e-btn success">Success</button>
    <button id="btn2" class="e-btn success">Success</button>
    <button id="btn3" class="e-btn success">Success</button>

    <ejs-tooltip 
      target="#btn1, #btn2, #btn3"
      content="Operation successful"
      cssClass="success-tooltip"
    />
  </div>
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: 'App',
  components: {
    'ejs-tooltip': TooltipComponent
  }
};
</script>

<style scoped>
:deep(.success-tooltip .e-tooltip) {
  background-color: #4CAF50;
  color: white;
}

.success {
  background-color: #4CAF50;
  color: white;
  border: none;
}

.success:hover {
  background-color: #45a049;
}
</style>
```

## Best Practices

### 1. Keep Content Concise

```vue
<!-- ✅ Good -->
<ejs-tooltip 
  target="#btn"
  content="Save document (Ctrl+S)"
/>

<!-- ❌ Avoid -->
<ejs-tooltip 
  target="#btn"
  content="This button saves your document to the server. You can also use the keyboard shortcut Ctrl+S to save. The document will be saved to your default folder and you can manage your saved documents in the file manager."
/>
```

### 2. Use Meaningful Positions

```vue
<!-- ✅ Good - Position right of input -->
<ejs-tooltip 
  target="#input"
  content="Enter valid email"
  position="RightCenter"
/>

<!-- ❌ Avoid - Position may cover input -->
<ejs-tooltip 
  target="#input"
  content="Enter valid email"
  position="BottomCenter"
/>
```

### 3. Respect Animation Preferences

```vue
<ejs-tooltip 
  target="#btn"
  content="Tooltip"
  :animationSettings="{
    effect: prefersReducedMotion ? 'None' : 'Fade',
    duration: 300
  }"
/>
```

### 4. Provide Accessible Alternatives

```vue
<!-- For info icons, always have aria-label -->
<button id="info" aria-label="Learn more about this feature">
  ℹ️
</button>

<ejs-tooltip 
  target="#info"
  content="Additional feature information"
  role="tooltip"
/>
```

### 5. Test on Touch Devices

```vue
<ejs-tooltip 
  target="#btn"
  content="Tooltip"
  :opensOn="isTouchDevice ? 'Click' : 'Hover'"
/>
```

## Notes

- Use tooltips for supplementary information only
- Don't use tooltips to hide critical information
- Test with keyboard navigation
- Consider touch device behavior (hover not available)
- Keep tooltips under 100 characters when possible
- Use proper ARIA labels for screen readers
- Respect `prefers-reduced-motion` for animations
- Test color contrast for accessibility
- Avoid too many tooltips on single page
