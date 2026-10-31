# Accessibility and RTL Support

## Table of Contents
- [Overview](#overview)
- [WCAG 2.1 Compliance](#wcag-21-compliance)
- [Keyboard Navigation](#keyboard-navigation)
- [ARIA Attributes](#aria-attributes)
- [Screen Reader Support](#screen-reader-support)
- [RTL Support](#rtl-support)
- [Localization](#localization)
- [Testing Accessibility](#testing-accessibility)

## Overview

Accessibility ensures QueryBuilder is usable by everyone, including people with disabilities. QueryBuilder supports:
- WCAG 2.1 AA compliance
- Full keyboard navigation
- ARIA labels and roles
- Screen reader support
- Right-to-Left (RTL) languages
- Localization

## WCAG 2.1 Compliance

### Level AA Conformance

QueryBuilder meets WCAG 2.1 Level AA standards:

**Perceivable:**
- Color alone is not used to convey information
- High contrast ratio (4.5:1 minimum for text)
- Resizable text

**Operable:**
- All functionality available via keyboard
- Focus visible and logical
- No seizure-inducing content

**Understandable:**
- Clear labels for all controls
- Error messages clear
- Consistent navigation

**Robust:**
- Valid HTML and ARIA
- Compatible with assistive technologies

### Basic Setup

QueryBuilder includes built-in accessibility support (ARIA roles, keyboard navigation) without requiring additional configuration:

```typescript
import { QueryBuilder } from '@syncfusion/ej2-querybuilder';

const qb = new QueryBuilder({
  width: '100%',
  dataSource: employeeData,
  columns: columns
});

qb.appendTo('#querybuilder');
```

### High Contrast Theme

Apply the high contrast CSS theme by importing it in your stylesheet:

```html
<!-- High contrast theme via CSS class on body -->
<link href="node_modules/@syncfusion/ej2-querybuilder/styles/high-contrast.css" rel="stylesheet">
```

```typescript
// Toggle high contrast by adding/removing CSS class
function toggleHighContrast(enabled: boolean) {
  if (enabled) {
    document.body.classList.add('e-high-contrast');
  } else {
    document.body.classList.remove('e-high-contrast');
  }
}

// Detect system preference
if (window.matchMedia('(prefers-contrast: more)').matches) {
  toggleHighContrast(true);
}
```

## Keyboard Navigation

### Standard Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Move to next element |
| `Shift+Tab` | Move to previous element |
| `Enter` | Activate button, select item |
| `Space` | Toggle checkbox |
| `Arrow Up/Down` | Navigate options in dropdown |
| `Escape` | Close dropdown |
| `Delete` | Remove rule (when focused) |

### Implement Custom Keyboard Handling

```typescript
// Add custom keyboard handlers
qb.addEventListener('keydown', (event: KeyboardEvent) => {
  const target = event.target as HTMLElement;
  
  // Alt+A: Add new rule
  if (event.altKey && event.code === 'KeyA') {
    event.preventDefault();
    qb.addRules([{
      field: columns[0].field,
      operator: 'equal',
      value: ''
    }], 'group0');
  }
  
  // Alt+D: Delete focused rule
  if (event.altKey && event.code === 'KeyD') {
    event.preventDefault();
    if (target.dataset.ruleId) {
      qb.deleteRules([target.dataset.ruleId]);
    }
  }
  
  // Alt+S: Save query
  if (event.altKey && event.code === 'KeyS') {
    event.preventDefault();
    saveQuery();
  }
});
```

### Focus Management

```typescript
// Ensure focus is always visible
const focusStyle = `
.e-querybuilder *:focus {
  outline: 3px solid #2196F3;
  outline-offset: 2px;
}

.e-querybuilder button:focus {
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.3);
}
`;

document.head.appendChild(document.createElement('style')).innerHTML = focusStyle;

// Set initial focus
function setInitialFocus() {
  const firstButton = document.querySelector(
    '.e-querybuilder button'
  ) as HTMLButtonElement;
  if (firstButton) {
    firstButton.focus();
  }
}

document.addEventListener('DOMContentLoaded', setInitialFocus);
```

## ARIA Attributes

### Add ARIA Labels

```typescript
import { ColumnsModel } from '@syncfusion/ej2-querybuilder';

// Add ARIA roles and labels
const columns: ColumnsModel[] = [
  {
    field: 'FirstName',
    label: 'First Name',
    type: 'string'
  },
  {
    field: 'HireDate',
    label: 'Hire Date',
    type: 'date'
  }
];

// Enhance with ARIA using the created event
qb.addEventListener('created', () => {
  // Add ARIA labels to rules
  const rules = document.querySelectorAll('.e-rule');
  rules.forEach((rule, index) => {
    rule.setAttribute('role', 'group');
    rule.setAttribute('aria-label', `Rule ${index + 1}`);
  });
  
  // Add ARIA labels to groups
  const groups = document.querySelectorAll('.e-group');
  groups.forEach((group, index) => {
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', `Group ${index + 1}`);
  });
  
  // Add ARIA labels to dropdowns
  const selects = document.querySelectorAll(
    '.e-querybuilder select'
  ) as NodeListOf<HTMLSelectElement>;
  selects.forEach((select, index) => {
    select.setAttribute('aria-label', `Option ${index + 1}`);
  });
});
```

### ARIA Live Regions

```typescript
// Announce changes to screen readers
const liveRegion = document.createElement('div');
liveRegion.setAttribute('role', 'status');
liveRegion.setAttribute('aria-live', 'polite');
liveRegion.setAttribute('aria-atomic', 'true');
liveRegion.className = 'sr-only';  // Hidden visually
document.body.appendChild(liveRegion);

function announceChange(message: string) {
  liveRegion.textContent = message;
}

// Use the official change event to detect rule/group changes
// ChangeEventArgs (from '@syncfusion/ej2-querybuilder') exposes only the `name` property
qb.addEventListener('change', (args: ChangeEventArgs) => {
  announceChange('Query Builder updated: ' + args.name);
});

// CSS for screen reader only
const srOnlyCSS = `
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border-width: 0;
}
`;
```

## Screen Reader Support

### Test with Screen Readers

**Windows:**
- NVDA (free) - https://www.nvaccess.org/
- JAWS (commercial) - https://www.freedomscientific.com/

**macOS:**
- VoiceOver (built-in)

**Android/iOS:**
- TalkBack / VoiceOver (built-in)

### Improve Screen Reader Experience

```typescript
// Provide context for screen reader users
function improveScreenReaderExperience() {
  // Add description to QueryBuilder
  const qbContainer = document.getElementById('querybuilder');
  if (qbContainer) {
    qbContainer.setAttribute('role', 'main');
    qbContainer.setAttribute(
      'aria-label',
      'Query builder for creating filter conditions'
    );
    qbContainer.setAttribute(
      'aria-describedby',
      'qb-instructions'
    );
  }
  
  // Add instructions
  const instructions = document.createElement('div');
  instructions.id = 'qb-instructions';
  instructions.className = 'sr-only';
  instructions.innerHTML = `
    <h2>How to use the Query Builder</h2>
    <ol>
      <li>Press Tab to navigate to controls</li>
      <li>Use Arrow keys to select options</li>
      <li>Press Enter to confirm selection</li>
      <li>Alt+A to add a new rule</li>
      <li>Alt+D to delete selected rule</li>
    </ol>
  `;
  
  qbContainer?.parentElement?.insertBefore(
    instructions,
    qbContainer
  );
}

improveScreenReaderExperience();
```

### Test Announcements

```typescript
// Verify announcements are working
function testAccessibilityAnnouncements() {
  console.log('Testing accessibility announcements...');
  
  // Test rule addition - should trigger change event with type 'insertRule'
  qb.addRules([{
    field: 'City',
    operator: 'equal',
    value: 'Seattle',
    type: 'string'
  }], 'group0');
  // Should announce: "New filter rule added"
  
  // Verify focus
  setTimeout(() => {
    const focused = document.activeElement;
    console.log('Focused element:', focused?.tagName, focused?.className);
  }, 100);
}

testAccessibilityAnnouncements();
```

## RTL Support

### Enable RTL

```typescript
import { QueryBuilder } from '@syncfusion/ej2-querybuilder';

const qb = new QueryBuilder({
  width: '100%',
  dataSource: employeeData,
  columns: columns,
  enableRtl: true  // Enable RTL layout
});

qb.appendTo('#querybuilder');
```

### RTL CSS

```html
<!-- Set document direction -->
<html dir="rtl" lang="ar">
<head>
  <!-- Import RTL stylesheet -->
  <link href="node_modules/@syncfusion/ej2-querybuilder/styles/material-rtl.css" rel="stylesheet">
</head>
<body>
  <div id="querybuilder"></div>
</body>
</html>
```

### Dynamic RTL Toggle

```typescript
// Toggle RTL at runtime
function toggleRTL(enabled: boolean) {
  if (enabled) {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
    qb.enableRtl = true;
    document.body.classList.add('e-rtl');
  } else {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
    qb.enableRtl = false;
    document.body.classList.remove('e-rtl');
  }
  
  qb.refresh();
}

// Detect browser language
function detectAndApplyLanguage() {
  const userLanguage = navigator.language || navigator.languages?.[0];
  const isRTL = ['ar', 'he', 'fa', 'ur'].some(lang =>
    userLanguage.startsWith(lang)
  );
  
  toggleRTL(isRTL);
}

detectAndApplyLanguage();
```

## Localization

### Translate UI Text

```typescript
import { L10n } from '@syncfusion/ej2-base';

// Define translations
L10n.load({
  'ar': {
    'querybuilder': {
      'addgroup': 'إضافة مجموعة',
      'addrule': 'إضافة قاعدة',
      'deletegroup': 'حذف المجموعة',
      'deleterule': 'حذف القاعدة',
      'between': 'بين',
      'notbetween': 'ليس بين',
      'contains': 'يحتوي على',
      'startswith': 'يبدأ بـ',
      'endswith': 'ينتهي بـ'
    }
  },
  'es': {
    'querybuilder': {
      'addgroup': 'Agregar grupo',
      'addrule': 'Agregar regla',
      'deletegroup': 'Eliminar grupo',
      'deleterule': 'Eliminar regla'
    }
  }
});

// Create with specific locale
const qb = new QueryBuilder({
  columns: columns,
  dataSource: data,
  locale: 'ar'  // Arabic
});

qb.appendTo('#querybuilder');
```

### Translate Column Labels

```typescript
// Localize column labels
function getLocalizedColumns(locale: string): ColumnsModel[] {
  const translations = {
    'en': {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address'
    },
    'ar': {
      firstName: 'الاسم الأول',
      lastName: 'اسم العائلة',
      email: 'عنوان البريد الإلكتروني'
    },
    'es': {
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Dirección de correo electrónico'
    }
  };
  
  const trans = translations[locale] || translations['en'];
  
  return [
    { field: 'FirstName', label: trans.firstName, type: 'string' },
    { field: 'LastName', label: trans.lastName, type: 'string' },
    { field: 'Email', label: trans.email, type: 'string' }
  ];
}

// Apply localized columns
const locale = localStorage.getItem('locale') || 'en';
const qb = new QueryBuilder({
  columns: getLocalizedColumns(locale),
  dataSource: data,
  locale: locale
});

qb.appendTo('#querybuilder');
```

### Locale-Aware Date Formatting

```typescript
// Format dates according to locale
function getDateFormat(locale: string): string {
  const formats: {[key: string]: string} = {
    'en-US': 'MM/dd/yyyy',
    'en-GB': 'dd/MM/yyyy',
    'de': 'dd.MM.yyyy',
    'fr': 'dd/MM/yyyy',
    'ar': 'dd/MM/yyyy',
    'es': 'dd/MM/yyyy'
  };
  
  return formats[locale] || 'dd/MM/yyyy';
}

const dateColumn: ColumnsModel = {
  field: 'HireDate',
  label: 'Hire Date',
  type: 'date',
  format: getDateFormat(locale)
};
```

## Testing Accessibility

### Automated Testing

```typescript
// Using jest-axe for accessibility testing
import { axe, toHaveNoViolations } from 'jest-axe';

describe('QueryBuilder Accessibility', () => {
  test('should not have accessibility violations', async () => {
    const qb = new QueryBuilder({
      columns: columns,
      dataSource: data
    });
    
    qb.appendTo('#querybuilder');
    
    const results = await axe(document);
    expect(results).toHaveNoViolations();
  });
  
  test('keyboard navigation works', () => {
    const addButton = document.querySelector(
      '.e-addgroup'
    ) as HTMLButtonElement;
    
    addButton.focus();
    expect(document.activeElement).toBe(addButton);
    
    addButton.click();
    // Verify group was added
  });
});
```

### Manual Testing Checklist

```typescript
// Manual accessibility testing checklist
const a11yChecklist = [
  '[ ] Tab through all controls - focus visible',
  '[ ] Keyboard only - all features work',
  '[ ] Color contrast - 4.5:1 ratio minimum',
  '[ ] Screen reader - announces changes',
  '[ ] RTL mode - layout reverses correctly',
  '[ ] High contrast - visible in high contrast mode',
  '[ ] Forms - labels associated with inputs',
  '[ ] Images - alt text provided',
  '[ ] Skip links - navigation shortcuts available',
  '[ ] Zoom - works at 200% zoom'
];

console.log('Accessibility Testing Checklist:');
a11yChecklist.forEach(item => console.log(item));
```

---

**Need help?** Check [references/getting-started.md](getting-started.md) for basic setup or [references/columns-definition.md](columns-definition.md) for column configuration.
