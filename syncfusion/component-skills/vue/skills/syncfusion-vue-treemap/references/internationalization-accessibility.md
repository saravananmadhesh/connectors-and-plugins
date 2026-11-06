# Internationalization and Accessibility in Vue TreeMap

This guide covers right-to-left (RTL) support, localization, accessibility, and keyboard navigation in the TreeMap component.

## Table of Contents
- [Overview](#overview)
- [RTL Support](#rtl-support)
- [Localization](#localization)
- [Accessibility](#accessibility)
- [Keyboard Navigation](#keyboard-navigation)
- [ARIA Labels](#aria-labels)
- [Screen Reader Support](#screen-reader-support)

## Overview

The TreeMap supports:

1. **RTL (Right-to-Left)** - For Arabic, Hebrew, Urdu, and other RTL languages
2. **Localization** - Multi-language support for UI text
3. **Accessibility (A11y)** - WCAG 2.1 compliance, screen reader support
4. **Keyboard Navigation** - Full keyboard control without mouse

## RTL Support

Enable RTL mode for right-to-left languages.

### Enable RTL

```vue
<template>
    <div class="control_wrapper" dir="rtl">
        <ejs-treemap 
            :dataSource='dataSource'
            :enableRtl='true'
            ...>
        </ejs-treemap>
    </div>
</template>

<script setup>
import { TreeMapComponent as EjsTreemap } from "@syncfusion/ej2-vue-treemap";

const dataSource = [
    { name: "برازيل", value: 25 },
    { name: "كولومبيا", value: 12 },
    { name: "الأرجنتين", value: 9 }
];

const enableRtl = true;
</script>
```

### RTL with Elements

```vue
<script setup>
const leafItemSettings = {
    labelPath: 'name',
    labelPosition: 'Center',
    labelStyle: {
        size: '14px',
        color: '#ffffff'
    }
};

// Add dir="rtl" to HTML root or parent container
// This mirrors all text direction automatically
</script>
```

### RTL Legends

```vue
<script setup>
import { TreeMapComponent as EjsTreemap, TreeMapLegend } from "@syncfusion/ej2-vue-treemap";
import { provide } from 'vue';

const legendSettings = {
    visible: true,
    position: 'Left',      // Position moves opposite in RTL
    shape: 'Rectangle',
    mode: 'Default'
};

const enableRtl = true;

provide('treemap', [TreeMapLegend]);
</script>

<template>
    <div dir="rtl">
        <ejs-treemap :enableRtl='true' :legendSettings='legendSettings' ...></ejs-treemap>
    </div>
</template>
```

**RTL Behavior:**
- Text flows right-to-left
- Legend positions mirror (Left becomes Right, Top stays Top)
- Animations flow opposite direction
- Header text aligns to right

## Localization

Support multiple languages by translating text content.

### Multi-Language Setup

```vue
<template>
    <div>
        <select v-model="currentLanguage" @change="changeLanguage">
            <option value="en">English</option>
            <option value="ar">العربية</option>
            <option value="hi">हिन्दी</option>
            <option value="es">Español</option>
        </select>
        <ejs-treemap 
            :dataSource='translatedDataSource'
            :leafItemSettings='leafItemSettings'
            :levels='translatedLevels'
            ...>
        </ejs-treemap>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { TreeMapComponent as EjsTreemap } from "@syncfusion/ej2-vue-treemap";

const currentLanguage = ref('en');

// Language-specific translations
const translations = {
    en: {
        dataSource: [
            { Category: 'Sales', Region: 'North America', Value: 150 },
            { Category: 'Sales', Region: 'Europe', Value: 120 }
        ],
        labels: { category: 'Category', region: 'Region', value: 'Value' }
    },
    ar: {
        dataSource: [
            { Category: 'المبيعات', Region: 'أمريكا الشمالية', Value: 150 },
            { Category: 'المبيعات', Region: 'أوروبا', Value: 120 }
        ],
        labels: { category: 'الفئة', region: 'المنطقة', value: 'القيمة' }
    },
    hi: {
        dataSource: [
            { Category: 'बिक्रय', Region: 'उत्तर अमेरिका', Value: 150 },
            { Category: 'बिक्रय', Region: 'यूरोप', Value: 120 }
        ],
        labels: { category: 'श्रेणी', region: 'क्षेत्र', value: 'मूल्य' }
    }
};

const translatedDataSource = computed(() => translations[currentLanguage.value].dataSource);

const changeLanguage = () => {
    // Language change triggers component re-render with new data
};

const leafItemSettings = {
    labelPath: 'Region'
};

const translatedLevels = computed(() => [
    { groupPath: 'Category', headerAlignment: 'Center' }
]);
</script>
```

### Data Localization Patterns

```vue
<script setup>
// Pattern 1: Translated data source
const localizedData = {
    'en': [{ Product: 'Widget', Sales: 100 }],
    'fr': [{ Product: 'Gadget', Sales: 100 }],
    'de': [{ Product: 'Geräte', Sales: 100 }]
};

// Pattern 2: Translation function
const getLocalizedLabel = (key, language) => {
    const translations = {
        'Product': { en: 'Product', fr: 'Produit', de: 'Produkt' },
        'Sales': { en: 'Sales', fr: 'Ventes', de: 'Vertrieb' }
    };
    return translations[key]?.[language] || key;
};

// Pattern 3: Date/Time localization
const formatDate = (date, language) => {
    return new Intl.DateTimeFormat(language).format(date);
};
</script>
```

## Accessibility

Make TreeMap accessible to all users including those with disabilities.

### WCAG 2.1 Compliance

```vue
<template>
    <div role="img" aria-label="Employee distribution by country and department">
        <ejs-treemap 
            :dataSource='dataSource'
            :levels='levels'
            :leafItemSettings='leafItemSettings'
            :ariaLabel='ariaLabel'
            ...>
        </ejs-treemap>
    </div>
</template>

<script setup>
const ariaLabel = 'Tree map visualization showing employee distribution across countries and job descriptions';

// Role and aria attributes inform screen readers
</script>
```

### Color Contrast

Ensure sufficient contrast between text and background colors.

```vue
<script setup>
// GOOD: High contrast
const leafItemSettings = {
    fill: '#1a237e',           // Dark blue
    labelStyle: {
        color: '#ffffff',       // White text - high contrast
        size: '14px'
    }
};

// BAD: Low contrast (avoid)
const badSettings = {
    fill: '#f0f0f0',           // Light gray
    labelStyle: {
        color: '#e0e0e0'        // Very light gray - low contrast
    }
};

// GOOD: Color mapping with accessible palette
const colorMapping = [
    { from: 0, to: 50, color: '#d4e6f1' },      // Light blue
    { from: 50, to: 100, color: '#2874a6' },    // Dark blue
    { from: 100, to: 150, color: '#1a5276' }    // Very dark blue
];
</script>
```

### Not Relying on Color Alone

Combine color with text labels or patterns.

```vue
<script setup>
// GOOD: Color + text labels
const leafItemSettings = {
    labelPath: 'Status',  // Also shows status as text
    colorMapping: [
        { value: 'Active', color: '#4caf50' },
        { value: 'Inactive', color: '#f44336' }
    ]
};

// GOOD: Color + numeric value
const leafItemSettings = {
    labelPath: 'Score',   // Number helps distinguish
    colorMapping: [
        { from: 0, to: 50, color: '#ff5252' },     // Red
        { from: 50, to: 100, color: '#4caf50' }    // Green
    ]
};
</script>
```

## Keyboard Navigation

Enable full keyboard control of TreeMap features.

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Navigate between items/groups |
| `Shift+Tab` | Navigate backward |
| `Enter` | Select/Drill into item |
| `Escape` | Deselect item |
| `ArrowUp/Down/Left/Right` | Navigate adjacent items |
| `Ctrl+A` | Select all items |
| `Backspace` | Return to parent level (drill-up) |

### Keyboard Navigation Setup

```vue
<template>
    <div class="control_wrapper" tabindex="0">
        <ejs-treemap 
            id="treemap"
            ref="treemapRef"
            :dataSource='dataSource'
            :enableDrillDown='true'
            :selectionSettings='selectionSettings'
            @keydown='handleKeyboardNavigation'
            ...>
        </ejs-treemap>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { TreeMapComponent as EjsTreemap, TreeMapSelection } from "@syncfusion/ej2-vue-treemap";
import { provide } from 'vue';

const treemapRef = ref(null);

const handleKeyboardNavigation = (event) => {
    const { key, ctrlKey, shiftKey } = event;
    
    switch (key) {
        case 'Enter':
            // Drill into selected group
            if (treemapRef.value) {
                // Trigger drill-down for group items
            }
            event.preventDefault();
            break;
        case 'Backspace':
            // Drill up to parent level
            if (treemapRef.value) {
                treemapRef.value.drillUp?.();
            }
            event.preventDefault();
            break;
        case 'ArrowLeft':
        case 'ArrowRight':
            // Navigate between items
            event.preventDefault();
            break;
    }
};

const selectionSettings = {
    enable: true,
    fill: '#ff9800'
};

provide('treemap', [TreeMapSelection]);
</script>

<style scoped>
.control_wrapper {
    outline: 2px solid #ccc;
    padding: 20px;
}

.control_wrapper:focus {
    outline: 2px solid #2196F3;  /* Visual focus indicator */
}
</style>
```

## ARIA Labels

Use ARIA attributes for enhanced screen reader support.

### ARIA Label Implementation

```vue
<template>
    <ejs-treemap 
        :dataSource='dataSource'
        aria-label="Employee distribution visualization"
        role="img"
        aria-describedby="description"
        ...>
    </ejs-treemap>
    <p id="description" class="sr-only">
        This tree map shows the distribution of employees across different countries,
        job descriptions, and positions. Each rectangle size represents the number of employees.
        Use keyboard navigation to explore the hierarchy.
    </p>
</template>

<script setup>
// sr-only class hides text visually but keeps it for screen readers
</script>

<style>
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

### Dynamic ARIA Updates

```vue
<script setup>
import { ref } from 'vue';

const selectedItem = ref(null);
const itemCount = ref(0);

const handleItemSelect = (args) => {
    selectedItem.value = args.currentItem?.label;
    
    // Update ARIA live region
    const liveRegion = document.getElementById('aria-live');
    if (liveRegion) {
        liveRegion.textContent = `Selected: ${selectedItem.value}`;
    }
};
</script>

<template>
    <div>
        <ejs-treemap 
            @nodeClick='handleItemSelect'
            aria-label="Filterable tree map"
            ...>
        </ejs-treemap>
        <div id="aria-live" aria-live="polite" aria-atomic="true" class="sr-only"></div>
    </div>
</template>
```

## Screen Reader Support

Optimize for screen reader users.

### Accessible Data Announcement

```vue
<script setup>
const announceData = (itemLabel, itemValue, context) => {
    const announcement = `${itemLabel}, value ${itemValue}${context ? ', ' + context : ''}`;
    
    // Announce to screen reader
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.textContent = announcement;
    
    document.body.appendChild(liveRegion);
    
    // Clean up after announcement
    setTimeout(() => liveRegion.remove(), 1000);
};

const handleItemHover = (args) => {
    announceData(
        args.currentItem?.label,
        args.currentItem?.value,
        'in tree map'
    );
};
</script>
```

### Accessible Data Table Alternative

Provide tabular alternative for screen reader users:

```vue
<template>
    <div>
        <!-- Visual TreeMap -->
        <ejs-treemap :dataSource='dataSource' ...></ejs-treemap>
        
        <!-- Accessible data table for screen readers -->
        <table aria-label="TreeMap data in table format" class="sr-only">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Value</th>
                    <th>Percentage</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in dataSource" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.value }}</td>
                    <td>{{ (item.value / totalValue * 100).toFixed(1) }}%</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const totalValue = computed(() => 
    dataSource.reduce((sum, item) => sum + item.value, 0)
);
</script>
```

## Accessibility Checklist

- [ ] ARIA labels describe visualization purpose
- [ ] Color contrast meets WCAG AA standard (4.5:1 for text, 3:1 for graphics)
- [ ] Text alternatives provided (tooltips, data labels)
- [ ] Keyboard navigation fully functional
- [ ] Focus indicators visible and clear
- [ ] Error messages clear and actionable
- [ ] Language set appropriately (lang attribute)
- [ ] RTL mode working if applicable
- [ ] Mobile touch targets ≥44x44 pixels
- [ ] Data table alternative available for complex visualizations

## Best Practices

1. **Always provide context** - Describe what TreeMap shows
2. **Combine color with text** - Don't rely on color alone for meaning
3. **Test with screen readers** - NVDA, JAWS, VoiceOver
4. **Keyboard first** - Ensure all features work with keyboard
5. **Meaningful labels** - Use descriptive field names and headers
6. **Language support** - Set proper lang attributes
7. **Focus management** - Indicate current focus clearly
8. **Skip links** - Allow users to skip lengthy data
9. **Progressive enhancement** - Base functionality works without JavaScript
10. **User testing** - Test with users with disabilities

## Resources

- **WCAG 2.1 Guidelines** - https://www.w3.org/WAI/WCAG21/quickref/
- **ARIA Authoring Practices** - https://www.w3.org/WAI/ARIA/apg/
- **Web Accessibility Evaluation Tool** - https://wave.webaim.org/
- **Color Contrast Checker** - https://contrast-ratio.com/
