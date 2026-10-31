# Kanban Accessibility Reference

This reference provides comprehensive information about accessibility features in the Syncfusion TypeScript Kanban component, including WCAG compliance, keyboard navigation, and ARIA support.

## Table of Contents

- [Accessibility Standards](#accessibility-standards)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Accessibility Testing](#accessibility-testing)
- [Edge Cases and Troubleshooting](#edge-cases-and-troubleshooting)

## Accessibility Standards

The Kanban component is designed following WAI-ARIA specifications with complete accessibility support for assistive technologies and keyboard navigation.

### Compliance Overview

| Accessibility Criteria | Compatibility |
|------------------------|---------------|
| WCAG 2.2 Support | ✓ Full Support |
| Section 508 Support | ✓ Full Support |
| Screen Reader Support | ✓ Full Support |
| Right-To-Left Support | ✓ Full Support |
| Color Contrast | ◐ Intermediate |
| Mobile Device Support | ✓ Full Support |
| Keyboard Navigation Support | ✓ Full Support |
| Accessibility Checker Validation | ◐ Intermediate |
| Axe-core Accessibility Validation | ✓ Full Support |

**Legend**:
- ✓ Full Support: All features meet the requirement
- ◐ Intermediate: Some features do not meet the requirement
- ✗ No Support: Component does not meet the requirement

## WAI-ARIA Attributes

The Kanban component implements WAI-ARIA patterns for enhanced accessibility.

### ARIA Attributes Used

| Attribute | Purpose |
|-----------|---------|
| `aria-label` | Provides information about elements for assistive technology |
| `aria-expanded` | Indicates the state of collapsible elements (true/false) |
| `aria-selected` | Indicates selected cards (false by default, true when selected) |
| `aria-grabbed` | Indicates if element is grabbed for drag-and-drop (true when grabbed, false when available but not grabbed) |
| `aria-describedby` | Associates Kanban column headers with column bodies |
| `aria-roledescription` | Provides alternative descriptions for card elements |

### ARIA Implementation Examples

#### Card with ARIA Attributes

```html
<div class="e-card" 
     role="article"
     aria-label="Task ID-001: Implement login feature"
     aria-selected="false"
     aria-grabbed="false"
     tabindex="0">
    <!-- Card content -->
</div>
```

#### Column with ARIA Attributes

```html
<div class="e-header-cells" 
     role="columnheader"
     aria-label="Backlog column with 5 items"
     aria-expanded="true">
    <div class="e-header-text" id="column-backlog">Backlog</div>
</div>

<div class="e-content-cells"
     role="region"
     aria-describedby="column-backlog"
     aria-label="Backlog column content">
    <!-- Cards -->
</div>
```

#### Swimlane with ARIA Attributes

```html
<div class="e-swimlane-header"
     role="button"
     aria-expanded="true"
     aria-label="Swimlane for John Doe, 3 items">
    <span class="e-swimlane-text">John Doe</span>
</div>
```

## Keyboard Navigation

The Kanban component provides comprehensive keyboard support following WAI-ARIA guidelines.

### Keyboard Shortcuts

| Keys | Action |
|------|--------|
| <kbd>Home</kbd> | Select the first card in the Kanban |
| <kbd>End</kbd> | Select the last card in the Kanban |
| <kbd>Arrow Up</kbd> | Select the card above the current selection |
| <kbd>Arrow Down</kbd> | Select the card below the current selection |
| <kbd>Arrow Right</kbd> | Move column selection to the right |
| <kbd>Arrow Left</kbd> | Move column selection to the left |
| <kbd>Ctrl</kbd> + <kbd>Enter</kbd> | Select multiple cards |
| <kbd>Ctrl</kbd> + <kbd>Space</kbd> | Select multiple cards |
| <kbd>Shift</kbd> + <kbd>Arrow Up</kbd> | Select multiple cards upward |
| <kbd>Shift</kbd> + <kbd>Arrow Down</kbd> | Select multiple cards downward |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Reverse tab navigation order |
| <kbd>Enter</kbd> | Open the selected card in edit dialog |
| <kbd>Tab</kbd> | Navigate through Kanban columns |
| <kbd>Delete</kbd> | Delete selected cards |
| <kbd>Esc</kbd> | Escape/close dialog without saving |
| <kbd>Space</kbd> | Open card edit dialog based on column selection |

### Keyboard Navigation Example

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id',
        selectionType: 'Multiple'  // Enable multi-selection with keyboard
    }
});
kanbanObj.appendTo('#Kanban');
```

### Disabling Keyboard Interaction

You can disable all keyboard functionality by setting the `allowKeyboard` property to `false`:

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    allowKeyboard: false,  // Disable keyboard navigation
    columns: [
        { headerText: 'Backlog', keyField: 'Open', allowToggle: true },
        { headerText: 'In Progress', keyField: 'InProgress', allowToggle: true },
        { headerText: 'Testing', keyField: 'Testing', allowToggle: true },
        { headerText: 'Done', keyField: 'Close', allowToggle: true }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    },
    swimlaneSettings: {
        keyField: 'Assignee'
    }
});
kanbanObj.appendTo('#Kanban');
```

### Custom Keyboard Shortcuts

You can implement custom keyboard shortcuts using event handlers:

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
});
kanbanObj.appendTo('#Kanban');

// Add custom keyboard shortcut
document.addEventListener('keydown', (e: KeyboardEvent) => {
    // Ctrl + N to add new card
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        kanbanObj.openDialog('Add');
    }
    
    // Ctrl + F to filter cards
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        // Implement custom filter logic
    }
});
```

## Screen Reader Support

The Kanban component provides comprehensive screen reader support through proper ARIA attributes and semantic HTML.

### Screen Reader Announcements

#### Card Selection
```
"Task ID-001, Implement login feature, Status: In Progress, Priority: High, Selected"
```

#### Column Navigation
```
"Backlog column, 5 items, Column 1 of 4"
```

#### Drag and Drop
```
"Task ID-001 grabbed, use arrow keys to move, press space to drop"
"Task ID-001 dropped in In Progress column"
```

#### Dialog Operations
```
"Edit card dialog opened"
"Card details updated successfully"
"Card deleted"
```

### Implementing Screen Reader Support

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    },
    // Enhance screen reader support with custom rendering
    cardRendered: (args) => {
        const card = args.element;
        const data = args.data;
        
        // Add detailed aria-label
        card.setAttribute('aria-label', 
            `Task ${data.Id}, ${data.Summary}, Status: ${data.Status}, Priority: ${data.Priority}`
        );
        
        // Add role description
        card.setAttribute('aria-roledescription', 'Kanban card');
    }
});
kanbanObj.appendTo('#Kanban');
```

### Live Region for Announcements

```html
<div id="kanban-announcements" 
     class="sr-only" 
     role="status" 
     aria-live="polite" 
     aria-atomic="true">
</div>
```

```typescript
// Function to announce changes
function announceChange(message: string): void {
    const announcer = document.getElementById('kanban-announcements');
    if (announcer) {
        announcer.textContent = message;
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    }
}

// Use in events
kanbanObj.cardClick = (args) => {
    announceChange(`Card ${args.data.Id} selected`);
};

kanbanObj.dragStop = (args) => {
    announceChange(`Card moved to ${args.data[0].Status}`);
};
```

## Accessibility Testing

### Testing Tools

1. **Accessibility Checker**: NPM package for automated testing
2. **Axe-core**: Comprehensive accessibility testing
3. **Screen Readers**: NVDA, JAWS, VoiceOver
4. **Keyboard Only Testing**: Test without mouse
5. **Color Contrast Analyzers**: Check WCAG compliance

### Manual Testing Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Screen reader announces all important information
- [ ] Color contrast meets WCAG 2.2 AA standards
- [ ] Keyboard shortcuts don't conflict with browser/screen reader shortcuts
- [ ] Drag and drop works with keyboard
- [ ] Dialogs are modal and trap focus
- [ ] Error messages are announced
- [ ] Success messages are announced
- [ ] All images have alt text
- [ ] All form fields have labels

### Automated Testing Example

```typescript
// Using axe-core for testing
import { Kanban } from '@syncfusion/ej2-kanban';
import * as axe from 'axe-core';

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
});
kanbanObj.appendTo('#Kanban');

// Run accessibility tests
axe.run(document.querySelector('#Kanban'), {
    rules: {
        'color-contrast': { enabled: true },
        'aria-required-attr': { enabled: true },
        'aria-valid-attr-value': { enabled: true },
        'button-name': { enabled: true },
        'link-name': { enabled: true }
    }
}).then(results => {
    if (results.violations.length > 0) {
        console.error('Accessibility violations found:', results.violations);
    } else {
        console.log('No accessibility violations found!');
    }
});
```

### Sample Test Link

View the accessibility sample: [Kanban Accessibility Sample](https://ej2.syncfusion.com/accessibility/kanban.html)

## Edge Cases and Troubleshooting

### Common Accessibility Issues

**Issue**: Keyboard navigation not working
- **Solution**: Check if `allowKeyboard` is set to `true` (default)
- **Solution**: Verify no conflicting keyboard event handlers
- **Solution**: Ensure focus is on Kanban element

**Issue**: Screen reader not announcing changes
- **Solution**: Verify ARIA attributes are present
- **Solution**: Check if live regions are implemented
- **Solution**: Test with updated screen reader versions

**Issue**: Focus indicators not visible
- **Solution**: Check CSS for `:focus` styles
- **Solution**: Ensure `outline` is not removed globally
- **Solution**: Add custom focus styles

**Issue**: Color contrast fails
- **Solution**: Use Theme Studio to adjust colors
- **Solution**: Test with contrast checker tools
- **Solution**: Provide high contrast theme option

**Issue**: Drag and drop not keyboard accessible
- **Solution**: Ensure keyboard shortcuts are documented
- **Solution**: Test with <kbd>Space</kbd> and arrow keys
- **Solution**: Verify ARIA grab states are correct

### Best Practices

#### 1. Always Provide Text Alternatives

```typescript
// Add meaningful descriptions
cardSettings: {
    contentField: 'Summary',
    headerField: 'Id',
    template: '#cardTemplate'
}

// In template, ensure all images have alt text
// <img src="avatar.png" alt="User avatar for ${Assignee}">
```

#### 2. Maintain Logical Tab Order

```typescript
// Ensure columns are in logical order
columns: [
    { headerText: 'Step 1', keyField: 'Open', tabIndex: 1 },
    { headerText: 'Step 2', keyField: 'InProgress', tabIndex: 2 },
    { headerText: 'Step 3', keyField: 'Testing', tabIndex: 3 },
    { headerText: 'Step 4', keyField: 'Close', tabIndex: 4 }
]
```

#### 3. Provide Clear Labels

```typescript
// Use descriptive column headers
columns: [
    { headerText: 'Open Items (Backlog)', keyField: 'Open' },
    { headerText: 'Work In Progress', keyField: 'InProgress' },
    { headerText: 'Quality Assurance Testing', keyField: 'Testing' },
    { headerText: 'Completed Tasks', keyField: 'Close' }
]
```

#### 4. Handle Focus Management

```typescript
// Custom focus management for dialogs
kanbanObj.dialogOpen = (args) => {
    // Focus first input field when dialog opens
    setTimeout(() => {
        const firstInput = args.element.querySelector('input');
        if (firstInput) {
            firstInput.focus();
        }
    }, 100);
};

kanbanObj.dialogClose = (args) => {
    // Return focus to triggering element
    const triggerCard = document.querySelector('.e-card.e-selection');
    if (triggerCard) {
        (triggerCard as HTMLElement).focus();
    }
};
```

#### 5. Announce Dynamic Changes

```typescript
// Create announcement function
function announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const announcer = document.getElementById('announcements');
    if (announcer) {
        announcer.setAttribute('aria-live', priority);
        announcer.textContent = message;
        setTimeout(() => announcer.textContent = '', 1000);
    }
}

// Use in operations
kanbanObj.actionComplete = (args) => {
    if (args.requestType === 'cardChanged') {
        announce('Card updated successfully');
    } else if (args.requestType === 'cardRemoved') {
        announce('Card deleted', 'assertive');
    } else if (args.requestType === 'cardCreated') {
        announce('New card added');
    }
};
```

#### 6. Provide Skip Links

```html
<a href="#kanban-content" class="skip-link">Skip to Kanban content</a>

<div id="Kanban">
    <div id="kanban-content" tabindex="-1">
        <!-- Kanban content -->
    </div>
</div>
```

```css
.skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: #fff;
    padding: 8px;
    z-index: 100;
}

.skip-link:focus {
    top: 0;
}
```

### Color Contrast Recommendations

Ensure WCAG 2.2 AA compliance (minimum 4.5:1 ratio for normal text, 3:1 for large text):

```css
/* Good contrast examples */
.e-kanban .e-card {
    background-color: #ffffff;
    color: #000000; /* 21:1 ratio */
}

.e-kanban .e-header-cells {
    background-color: #0066cc;
    color: #ffffff; /* 7.5:1 ratio */
}

/* Validation colors with sufficient contrast */
.e-kanban .e-header-cells.e-max-color {
    background-color: #d32f2f;
    color: #ffffff; /* 4.5:1 ratio */
}

.e-kanban .e-header-cells.e-min-color {
    background-color: #f57c00;
    color: #000000; /* 4.6:1 ratio */
}
```

### RTL (Right-to-Left) Support

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { L10n } from '@syncfusion/ej2-base';
import { kanbanData } from './datasource';

// Load RTL locale
L10n.load({
    'ar': {
        'kanban': {
            // Arabic translations
        }
    }
});

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    enableRtl: true,  // Enable RTL mode
    locale: 'ar',
    columns: [
        { headerText: 'مفتوحة', keyField: 'Open' },
        { headerText: 'قيد التقدم', keyField: 'InProgress' },
        { headerText: 'اختبار', keyField: 'Testing' },
        { headerText: 'مغلق', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
});
kanbanObj.appendTo('#Kanban');
```

### Performance Considerations

- Minimize DOM manipulations in ARIA updates
- Use debouncing for frequent announcements
- Batch ARIA attribute updates
- Avoid excessive live region updates
- Test with assistive technologies for performance impact

### Testing Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
- [Accessibility Insights](https://accessibilityinsights.io/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
