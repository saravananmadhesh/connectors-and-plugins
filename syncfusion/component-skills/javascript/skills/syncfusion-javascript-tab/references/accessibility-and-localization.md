# Accessibility and Localization

## Table of Contents
- [Accessibility Overview](#accessibility-overview)
- [WCAG Compliance](#wcag-compliance)
- [ARIA Attributes](#aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [RTL Support](#rtl-support)
- [Localization](#localization)
- [Multi-Language Support](#multi-language-support)

## Accessibility Overview

Tab component is built with accessibility in mind, supporting:

- WAI-ARIA specifications
- Keyboard navigation
- Screen reader compatibility
- High contrast modes
- Focus indicators
- Semantic HTML

## WCAG Compliance

### Level A Compliance

```typescript
let tabObj: Tab = new Tab({
    items: [
        { 
            header: { 
                'text': 'Dashboard',
                'tooltip': 'View dashboard overview'  // Tooltip for tooltip
            }, 
            content: 'Dashboard content'
        },
        { 
            header: { 
                'text': 'Reports',
                'tooltip': 'Generate and view reports'
            }, 
            content: 'Reports content'
        }
    ],
    aria: {  // Accessibility settings
        label: 'Main navigation tabs',
        describedBy: 'tab-instructions'
    }
});
tabObj.appendTo('#element');
```

### Level AA Compliance

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    cssClass: 'accessible-tabs',  // Custom accessible styling
    enableRtl: false,
    created: () => {
        // Add focus indicators
        document.querySelectorAll('.e-toolbar-item').forEach((item) => {
            item.setAttribute('tabindex', '0');
        });
    }
});
tabObj.appendTo('#element');
```

### Accessible CSS

```css
/* High contrast mode */
.accessible-tabs {
    --tab-text-color: #000;
    --tab-bg-color: #fff;
    --tab-active-color: #0066cc;
    --tab-border-color: #000;
}

/* Focus indicator */
.accessible-tabs .e-toolbar-item:focus {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
}

/* High contrast outline */
@media (prefers-contrast: more) {
    .accessible-tabs .e-toolbar-item {
        border: 1px solid #000;
    }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    .accessible-tabs .e-content {
        animation: none;
    }
}
```

## ARIA Attributes

### Tab Role Attributes

```html
<div role="tablist" aria-label="Content sections">
    <button role="tab" 
            id="tab-1" 
            aria-selected="true" 
            aria-controls="panel-1">
        Tab 1
    </button>
    <button role="tab" 
            id="tab-2" 
            aria-selected="false" 
            aria-controls="panel-2">
        Tab 2
    </button>
</div>

<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
    Content for Tab 1
</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
    Content for Tab 2
</div>
```

### Component Level Attributes

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    created: () => {
        // Add ARIA labels
        tabObj.element.setAttribute('role', 'tablist');
        tabObj.element.setAttribute('aria-label', 'Navigation tabs');
        
        // Add to headers
        let headers = document.querySelectorAll('.e-toolbar-item');
        headers.forEach((header, index) => {
            header.setAttribute('role', 'tab');
            header.setAttribute('id', `tab-${index}`);
            header.setAttribute('aria-controls', `panel-${index}`);
            header.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        });
        
        // Add to content
        let contents = document.querySelectorAll('.e-content .e-item');
        contents.forEach((content, index) => {
            content.setAttribute('role', 'tabpanel');
            content.setAttribute('id', `panel-${index}`);
            content.setAttribute('aria-labelledby', `tab-${index}`);
            if (index !== 0) {
                content.setAttribute('hidden', 'true');
            }
        });
    },
    selected: (args) => {
        // Update ARIA attributes on selection
        let headers = document.querySelectorAll('[role="tab"]');
        let contents = document.querySelectorAll('[role="tabpanel"]');
        
        headers.forEach((header, index) => {
            header.setAttribute('aria-selected', 
                index === tabObj.selectedItem ? 'true' : 'false');
        });
        
        contents.forEach((content, index) => {
            if (index === tabObj.selectedItem) {
                content.removeAttribute('hidden');
            } else {
                content.setAttribute('hidden', 'true');
            }
        });
    }
});
tabObj.appendTo('#element');
```

## Keyboard Navigation

### Supported Keys

| Key | Action |
|-----|--------|
| **Tab** | Move focus to next tab |
| **Shift+Tab** | Move focus to previous tab |
| **ArrowRight** | Select next tab (Horizontal) |
| **ArrowLeft** | Select previous tab (Horizontal) |
| **ArrowDown** | Select next tab (Vertical) |
| **ArrowUp** | Select previous tab (Vertical) |
| **Home** | Select first tab |
| **End** | Select last tab |
| **Enter** | Activate tab |
| **Space** | Activate tab |

### Enable Keyboard Navigation

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    enableKeyboardInteraction: true,  // Usually enabled by default
    created: () => {
        // Add keyboard event handlers
        document.addEventListener('keydown', (event) => {
            if (event.target !== tabObj.element) return;
            
            let currentIndex = tabObj.selectedItem;
            
            switch (event.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    event.preventDefault();
                    if (currentIndex < tabObj.items.length - 1) {
                        tabObj.select(currentIndex + 1);
                    }
                    break;
                    
                case 'ArrowLeft':
                case 'ArrowUp':
                    event.preventDefault();
                    if (currentIndex > 0) {
                        tabObj.select(currentIndex - 1);
                    }
                    break;
                    
                case 'Home':
                    event.preventDefault();
                    tabObj.select(0);
                    break;
                    
                case 'End':
                    event.preventDefault();
                    tabObj.select(tabObj.items.length - 1);
                    break;
            }
        });
    }
});
tabObj.appendTo('#element');
```

## Screen Reader Support

### Descriptive Labels

```typescript
let tabObj: Tab = new Tab({
    items: [
        {
            header: { 
                'text': 'Dashboard',
                'tooltip': 'View your dashboard overview'
            },
            content: '<div aria-label="Dashboard content">Dashboard data here</div>'
        },
        {
            header: { 
                'text': 'Analytics',
                'tooltip': 'View analytics and reports'
            },
            content: '<div aria-label="Analytics content">Analytics data here</div>'
        }
    ]
});
tabObj.appendTo('#element');
```

### Content Structure for Screen Readers

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    created: () => {
        // Add semantic headings
        document.querySelectorAll('.e-content .e-item').forEach((item, index) => {
            let heading = document.createElement('h2');
            heading.textContent = tabObj.items[index].header.text;
            heading.setAttribute('aria-level', '2');
            item.insertBefore(heading, item.firstChild);
        });
    }
});
tabObj.appendTo('#element');
```

### Skip Navigation Link

```html
<a href="#main-content" class="skip-link">Skip to main content</a>

<div id="element"></div>
<main id="main-content">
    <!-- Main page content -->
</main>

<style>
.skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: white;
    padding: 8px;
    z-index: 100;
}

.skip-link:focus {
    top: 0;
}
</style>
```

## RTL Support

### Enable Right-to-Left

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    enableRtl: true
});
tabObj.appendTo('#element');
```

### RTL CSS

```css
/* Automatic mirroring for RTL */
.e-rtl .e-tab-header {
    direction: rtl;
    text-align: right;
}

.e-rtl .e-tab-header .e-toolbar-items {
    flex-direction: row-reverse;
}

.e-rtl .e-tab-icon {
    margin-right: 0;
    margin-left: 8px;
}
```

### Dynamic RTL Toggle

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    enableRtl: false
});
tabObj.appendTo('#element');

document.getElementById('rtlToggle')?.addEventListener('change', (event) => {
    let isRtl = (event.target as HTMLInputElement).checked;
    tabObj.enableRtl = isRtl;
    tabObj.refresh();
});
```

## Localization

### Configure Locale

```typescript
import { L10n } from '@syncfusion/ej2-base';

// Add locale strings
L10n.load({
    'en-US': {
        'tab': {
            'ScrollLeft': 'Scroll Left',
            'ScrollRight': 'Scroll Right'
        }
    },
    'es-ES': {
        'tab': {
            'ScrollLeft': 'Desplazarse a la izquierda',
            'ScrollRight': 'Desplazarse a la derecha'
        }
    }
});

let tabObj: Tab = new Tab({
    items: [...],
    locale: 'es-ES'
});
tabObj.appendTo('#element');
```

## Multi-Language Support

### Language Switching

```typescript
import { L10n } from '@syncfusion/ej2-base';

// Define translations
const translations = {
    'en': {
        tab1: 'Dashboard',
        tab2: 'Reports',
        tab3: 'Settings'
    },
    'es': {
        tab1: 'Panel de Control',
        tab2: 'Informes',
        tab3: 'Configuración'
    },
    'fr': {
        tab1: 'Tableau de Bord',
        tab2: 'Rapports',
        tab3: 'Paramètres'
    }
};

let currentLang = 'en';

function switchLanguage(lang: string) {
    currentLang = lang;
    
    let newItems = [
        { header: { 'text': translations[lang].tab1 }, content: 'Dashboard' },
        { header: { 'text': translations[lang].tab2 }, content: 'Reports' },
        { header: { 'text': translations[lang].tab3 }, content: 'Settings' }
    ];
    
    tabObj.items = newItems;
    tabObj.refresh();
}

let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': translations['en'].tab1 }, content: 'Dashboard' },
        { header: { 'text': translations['en'].tab2 }, content: 'Reports' },
        { header: { 'text': translations['en'].tab3 }, content: 'Settings' }
    ]
});
tabObj.appendTo('#element');

// Language selector
document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let lang = (e.target as HTMLElement).getAttribute('data-lang');
        if (lang) switchLanguage(lang);
    });
});
```

### Bi-Directional Text Support

```typescript
let tabObj: Tab = new Tab({
    items: [
        { 
            header: { 'text': 'English', 'iconCss': 'e-icon-en' }, 
            content: 'This is English content' 
        },
        { 
            header: { 'text': 'العربية', 'iconCss': 'e-icon-ar' }, 
            content: 'هذا محتوى عربي' 
        },
        { 
            header: { 'text': 'עברית', 'iconCss': 'e-icon-he' }, 
            content: 'זה תוכן עברי' 
        }
    ]
});
tabObj.appendTo('#element');

// Auto-detect text direction
document.querySelectorAll('.e-tab-text').forEach((text) => {
    let content = text.textContent || '';
    let isRtl = /[\u0590-\u08FF]/.test(content);  // Hebrew, Arabic ranges
    
    if (isRtl) {
        (text as HTMLElement).style.direction = 'rtl';
        (text as HTMLElement).style.textAlign = 'right';
    }
});
```

---

**Related Topics:**
- [Tab Structure and Content](./tab-structure-and-content.md) - Tab configuration
- [Customization and Styling](./customization-and-styling.md) - Accessible styling
