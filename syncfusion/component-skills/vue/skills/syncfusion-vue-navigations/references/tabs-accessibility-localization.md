# Accessibility and Localization

## Table of Contents
- [WCAG 2.2 Compliance](#wcag-22-compliance)
- [ARIA Attributes](#aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Localization (L10n)](#localization-l10n)
- [RTL Support](#rtl-support)
- [Accessibility Examples](#accessibility-examples)

## WCAG 2.2 Compliance

The Syncfusion Tab component is built to meet WCAG 2.2 Level AA accessibility standards.

### Key Compliance Areas

| Guideline | Implementation | Status |
|-----------|----------------|--------|
| **Perceivable** | Color contrast, text alternatives, visual clarity | ✅ AA Compliant |
| **Operable** | Keyboard navigation, sufficient target size | ✅ AA Compliant |
| **Understandable** | Clear labels, consistent behavior, help text | ✅ AA Compliant |
| **Robust** | Semantic HTML, ARIA support, browser compatibility | ✅ AA Compliant |

### Color Contrast

The component ensures sufficient color contrast between tab headers and backgrounds (minimum 4.5:1 for text).

```vue
<template>
  <!-- Built-in styles meet WCAG AA contrast requirements -->
  <ejs-tab class="e-fill">
    <e-tab-items>
      <e-tab-item :header="{ text: 'Accessible' }">
        <template #content>Text contrast verified at WCAG AA level</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Readable' }">
        <template #content>High contrast for text readability</template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
| `role="tablist"` | Tab container | Static | Identifies component as tab list |
| `role="tab"` | Tab headers | Static | Each header is a tab control |
| `role="tabpanel"` | Tab content | Static | Each content is a tab panel |
| `aria-selected` | Active tab | `true/false` | Indicates selected tab |
| `aria-controls` | Tab header | Panel ID | Links header to content panel |
| `aria-labelledby` | Tab panel | Header ID | Links content to its header |

### Verify ARIA Structure

```vue
<template>
  <div>
    <p>ARIA structure is automatically applied to this component</p>
    <ejs-tab>
      <e-tab-items>
        <!-- Each item automatically gets role="tab" -->
        <e-tab-item :header="{ text: 'First Tab' }">
          <template #content>
            Content automatically gets role="tabpanel"
          </template>
        </e-tab-item>
        <!-- aria-selected automatically managed -->
        <e-tab-item :header="{ text: 'Second Tab' }">
          <template #content>
            aria-controls links content to header
          </template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>
```

### Custom ARIA Labels

```vue
<template>
  <ejs-tab>
    <e-tab-items>
      <e-tab-item :header="{ text: 'Account Settings', ariaLabel: 'Account Settings tab' }">
        <template #content>
          <div aria-label="Account settings panel">
            Manage your account information
          </div>
        </template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Privacy Controls', ariaLabel: 'Privacy Settings tab' }">
        <template #content>
          <div aria-label="Privacy settings panel">
            Control your privacy settings
          </div>
        </template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>
```

## Keyboard Navigation

The Tab component provides full keyboard accessibility following WAI-ARIA authoring practices.

### Keyboard Shortcuts

| Key | Action | Behavior |
|-----|--------|----------|
| `Tab` | Focus navigation | Move focus to next interactive element |
| `Shift+Tab` | Reverse focus | Move focus to previous interactive element |
| `Arrow Right` | Next tab | Activate next tab header (LTR) |
| `Arrow Left` | Previous tab | Activate previous tab header (LTR) |
| `Arrow Down` | Next tab (vertical) | Activate next tab (when Left/Right placement) |
| `Arrow Up` | Previous tab (vertical) | Activate previous tab (when Left/Right placement) |
| `Home` | First tab | Jump to first tab |
| `End` | Last tab | Jump to last tab |
| `Enter` | Activate tab | Activate focused tab (when focus mode) |
| `Space` | Activate tab | Activate focused tab (when focus mode) |

### Example: Keyboard Navigation

```vue
<template>
  <div>
    <p>Use arrow keys to navigate between tabs (must focus on a tab first)</p>
    <p>Press Home/End to jump to first/last tab</p>
    
    <ejs-tab>
      <e-tab-items>
        <!-- Press Tab to reach this, then use arrows -->
        <e-tab-item :header="{ text: 'Tab 1' }">
          <template #content>
            <input type="text" placeholder="Tab 1 content - try tabbing and using arrows">
          </template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Tab 2' }">
          <template #content>
            <input type="text" placeholder="Tab 2 content">
          </template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Tab 3' }">
          <template #content>
            <input type="text" placeholder="Tab 3 content">
          </template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>
```

### Track Keyboard Events

```vue
<template>
  <div>
    <p>Last key pressed: <strong>{{ lastKey }}</strong></p>
    
    <ejs-tab @keydown="handleKeyDown">
      <e-tab-items>
        <e-tab-item :header="{ text: 'Navigation' }">
          <template #content>Focus on tab and press arrow keys</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Shortcuts' }">
          <template #content>Home/End keys work too</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Accessible' }">
          <template #content>Fully keyboard navigable</template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const lastKey = ref('None');

const handleKeyDown = (args) => {
  const keyMap = {
    'ArrowRight': 'Right Arrow',
    'ArrowLeft': 'Left Arrow',
    'ArrowUp': 'Up Arrow',
    'ArrowDown': 'Down Arrow',
    'Home': 'Home',
    'End': 'End',
    'Enter': 'Enter',
    ' ': 'Space'
  };
  
  lastKey.value = keyMap[args.key] || args.key;
};
</script>
```

## Screen Reader Support

### NVDA and JAWS Compatibility

The Tab component works with popular screen readers:
- **NVDA** (Windows)
- **JAWS** (Windows)
- **VoiceOver** (macOS/iOS)
- **TalkBack** (Android)

### Screen Reader Announcements

```vue
<template>
  <ejs-tab>
    <e-tab-items>
      <!-- Screen reader will announce "Tab 1 of 3, selected" for active tab -->
      <!-- And "Tab 2 of 3, not selected" for inactive tabs -->
      <e-tab-item :header="{ text: 'Dashboard' }">
        <template #content>
          <section aria-label="Dashboard content">
            <h2>Dashboard Overview</h2>
            <p>Screen reader identifies this as tabpanel</p>
          </section>
        </template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Reports' }">
        <template #content>
          <section aria-label="Reports content">
            <h2>Reports Section</h2>
            <p>Each tab panel is clearly labeled</p>
          </section>
        </template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Settings' }">
        <template #content>
          <section aria-label="Settings content">
            <h2>Settings Panel</h2>
            <p>Navigation is clear and predictable</p>
          </section>
        </template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>
```

## Localization (L10n)

### Apply Localization Class

Use the `L10n` class to apply localized strings to the component.

```vue
<template>
  <div>
    <p>The component automatically uses localized strings</p>
    <ejs-tab>
      <e-tab-items>
        <e-tab-item :header="{ text: 'Home' }">
          <template #content>Home content</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'About' }">
          <template #content>About content</template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { L10n } from '@syncfusion/ej2-base';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

// Register localization
L10n.load({
  'en-US': {
    'tab': {
      'scrollButtons': 'Scroll',
      'overflowButton': 'More'
    }
  }
});
</script>
```

### Multi-Language Support

```vue
<template>
  <div>
    <select v-model="currentLanguage" @change="changeLanguage">
      <option value="en">English</option>
      <option value="fr">Français (French)</option>
      <option value="de">Deutsch (German)</option>
      <option value="es">Español (Spanish)</option>
      <option value="ja">日本語 (Japanese)</option>
      <option value="ar">العربية (Arabic)</option>
    </select>
    
    <ejs-tab :locale="currentLanguage">
      <e-tab-items>
        <e-tab-item :header="{ text: getTabText('tab1') }">
          <template #content>{{ getTabText('content1') }}</template>
        </e-tab-item>
        <e-tab-item :header="{ text: getTabText('tab2') }">
          <template #content>{{ getTabText('content2') }}</template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { L10n } from '@syncfusion/ej2-base';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const currentLanguage = ref('en');

// Define localization for multiple languages
L10n.load({
  'en': {
    'tab': {
      'tab1': 'Home',
      'tab2': 'Settings',
      'content1': 'Welcome to our application',
      'content2': 'Configure your preferences'
    }
  },
  'fr': {
    'tab': {
      'tab1': 'Accueil',
      'tab2': 'Paramètres',
      'content1': 'Bienvenue dans notre application',
      'content2': 'Configurez vos préférences'
    }
  },
  'de': {
    'tab': {
      'tab1': 'Startseite',
      'tab2': 'Einstellungen',
      'content1': 'Willkommen in unserer Anwendung',
      'content2': 'Konfigurieren Sie Ihre Einstellungen'
    }
  },
  'es': {
    'tab': {
      'tab1': 'Inicio',
      'tab2': 'Configuración',
      'content1': 'Bienvenido a nuestra aplicación',
      'content2': 'Configure sus preferencias'
    }
  },
  'ja': {
    'tab': {
      'tab1': 'ホーム',
      'tab2': '設定',
      'content1': 'アプリケーションへようこそ',
      'content2': 'お好みを設定してください'
    }
  },
  'ar': {
    'tab': {
      'tab1': 'الصفحة الرئيسية',
      'tab2': 'الإعدادات',
      'content1': 'مرحبا بك في تطبيقنا',
      'content2': 'قم بتكوين تفضيلاتك'
    }
  }
});

const getTabText = (key) => {
  const translations = {
    en: {
      tab1: 'Home', tab2: 'Settings',
      content1: 'Welcome to our application', content2: 'Configure your preferences'
    },
    fr: {
      tab1: 'Accueil', tab2: 'Paramètres',
      content1: 'Bienvenue dans notre application', content2: 'Configurez vos préférences'
    },
    de: {
      tab1: 'Startseite', tab2: 'Einstellungen',
      content1: 'Willkommen in unserer Anwendung', content2: 'Konfigurieren Sie Ihre Einstellungen'
    },
    es: {
      tab1: 'Inicio', tab2: 'Configuración',
      content1: 'Bienvenido a nuestra aplicación', content2: 'Configure sus preferencias'
    },
    ja: {
      tab1: 'ホーム', tab2: '設定',
      content1: 'アプリケーションへようこそ', content2: 'お好みを設定してください'
    },
    ar: {
      tab1: 'الصفحة الرئيسية', tab2: 'الإعدادات',
      content1: 'مرحبا بك في تطبيقنا', content2: 'قم بتكوين تفضيلاتك'
    }
  };
  
  return translations[currentLanguage.value][key];
};

const changeLanguage = () => {
  console.log('Language changed to:', currentLanguage.value);
};
</script>
```

## RTL Support

### Enable RTL Mode

Use `enableRtl` property for right-to-left language support:

```vue
<template>
  <div>
    <label>
      <input type="checkbox" v-model="isRtl">
      Enable RTL (Right-to-Left)
    </label>
    
    <ejs-tab :enableRtl="isRtl" :locale="isRtl ? 'ar' : 'en'">
      <e-tab-items>
        <e-tab-item :header="{ text: isRtl ? 'الصفحة الرئيسية' : 'Home' }">
          <template #content>
            {{ isRtl ? 'محتوى الصفحة الرئيسية' : 'Home content' }}
          </template>
        </e-tab-item>
        <e-tab-item :header="{ text: isRtl ? 'حول' : 'About' }">
          <template #content>
            {{ isRtl ? 'محتوى حول' : 'About content' }}
          </template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const isRtl = ref(false);
</script>
```

### RTL with Arabic Layout

```vue
<template>
  <ejs-tab enableRtl locale="ar">
    <e-tab-items>
      <e-tab-item :header="{ text: 'الإحصائيات' }">
        <template #content>
          <div dir="rtl">
            <h3>إحصائيات الحساب</h3>
            <p>تُعرض البيانات من اليمين إلى اليسار</p>
          </div>
        </template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'الحسابات' }">
        <template #content>
          <div dir="rtl">
            <h3>إدارة الحسابات</h3>
            <p>واجهة متوافقة مع اللغة العربية</p>
          </div>
        </template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'الإعدادات' }">
        <template #content>
          <div dir="rtl">
            <h3>إعدادات النظام</h3>
            <p>جميع العناصر محاذاة من اليمين</p>
          </div>
        </template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>
```

## Accessibility Examples

### Example 1: Fully Accessible Dashboard

```vue
<template>
  <main>
    <h1>Accessible Dashboard</h1>
    
    <ejs-tab role="tablist" aria-label="Dashboard navigation">
      <e-tab-items>
        <e-tab-item :header="{ text: 'Overview', ariaLabel: 'Dashboard overview tab' }">
          <template #content>
            <article aria-label="Dashboard overview content">
              <h2>Dashboard Overview</h2>
              <p>Key metrics and statistics</p>
              <table>
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Users</td>
                    <td>1,234</td>
                  </tr>
                </tbody>
              </table>
            </article>
          </template>
        </e-tab-item>
        
        <e-tab-item :header="{ text: 'Analytics', ariaLabel: 'Analytics data tab' }">
          <template #content>
            <article aria-label="Analytics content">
              <h2>Analytics</h2>
              <p>Detailed analytics and reports</p>
            </article>
          </template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </main>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>

<style scoped>
main {
  padding: 20px;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f5f5f5;
}
</style>
```

### Example 2: Responsive Accessible Tabs

```vue
<template>
  <div class="tab-wrapper" :class="{ rtl: isRtl }" :lang="currentLang">
    <button @click="toggleRtl">{{ isRtl ? 'LTR' : 'RTL' }}</button>
    <select v-model="currentLang">
      <option value="en">English</option>
      <option value="ar">العربية</option>
      <option value="fr">Français</option>
    </select>
    
    <ejs-tab 
      :enableRtl="isRtl"
      :locale="currentLang"
      :headerPlacement="isMobile ? 'Bottom' : 'Top'"
      role="tablist"
      :aria-label="`Tabbed content navigation in ${currentLang}`"
    >
      <e-tab-items>
        <e-tab-item :header="{ text: 'Content' }">
          <template #content>Main content area</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Details' }">
          <template #content>Additional details</template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const isRtl = ref(false);
const currentLang = ref('en');
const isMobile = ref(window.innerWidth <= 768);

const toggleRtl = () => {
  isRtl.value = !isRtl.value;
};

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>

<style scoped>
.tab-wrapper {
  padding: 20px;
}

.tab-wrapper.rtl {
  direction: rtl;
}

button, select {
  margin-right: 10px;
  padding: 8px 12px;
  cursor: pointer;
}
</style>
```

## Best Practices

1. **Always provide labels**: Use descriptive text for tab headers and content
2. **Test with screen readers**: Use NVDA, JAWS, or VoiceOver to verify accessibility
3. **Keyboard testing**: Navigate using only keyboard before releasing
4. **Color contrast**: Verify color ratios meet WCAG AA standards (4.5:1 minimum)
5. **ARIA correctly**: Don't over-use ARIA; let semantic HTML do the work
6. **Localization**: Support multiple languages and RTL where applicable
7. **Mobile considerations**: Ensure tabs work on touch devices with sufficient target sizes
8. **Test combinations**: Test accessibility + RTL + mobile together
