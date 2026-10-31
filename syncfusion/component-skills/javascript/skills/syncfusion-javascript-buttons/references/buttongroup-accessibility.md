# ButtonGroup - Accessibility (TypeScript)

## WCAG 2.2 Compliance

ButtonGroup components meet WCAG 2.2 Level AA accessibility standards:

- ✅ **Perceivable:** Clear visual separation of buttons
- ✅ **Operable:** Full keyboard navigation
- ✅ **Understandable:** Clear labels and purpose
- ✅ **Robust:** Compatible with assistive technologies

## Keyboard Navigation

```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

const groupDiv = document.getElementById('keyboardGroup')!;
groupDiv.innerHTML = `
  <button class="e-btn">Option 1</button>
  <button class="e-btn">Option 2</button>
  <button class="e-btn">Option 3</button>
`;

createButtonGroup(groupDiv);

// Tab: Focus first button
// Right Arrow: Move focus to next button
// Left Arrow: Move focus to previous button
// Enter/Space: Activate button
```

## Screen Reader Support

```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

const groupDiv = document.getElementById('srGroup')!;
groupDiv.innerHTML = `
  <input type="radio" name="view" id="grid" value="grid" aria-label="Grid view" />
  <label for="grid" class="e-btn">Grid</label>
  <input type="radio" name="view" id="list" value="list" aria-label="List view" />
  <label for="list" class="e-btn">List</label>
  <input type="radio" name="view" id="card" value="card" aria-label="Card view" />
  <label for="card" class="e-btn">Card</label>
`;

// Add group label
const legend = document.createElement('fieldset');
legend.innerHTML = '<legend>Select View</legend>';
groupDiv.parentElement?.insertBefore(legend, groupDiv);

createButtonGroup(groupDiv);
```

## Focus Management

```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

const groupDiv = document.getElementById('focusGroup')!;
groupDiv.innerHTML = `
  <button class="e-btn">First</button>
  <button class="e-btn">Second</button>
  <button class="e-btn">Third</button>
`;

createButtonGroup(groupDiv);

// Set focus to first button
const firstButton = groupDiv.querySelector('button') as HTMLButtonElement;
firstButton?.focus();
```

## Color Contrast

Ensure sufficient contrast (4.5:1):

```css
/* Light theme - good contrast */
.e-primary button {
  background-color: #0066cc;
  color: #ffffff;
  /* Contrast ratio: 8.6:1 */
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .e-primary button {
    background-color: #3399ff;
    color: #000000;
  }
}
```

## Accessibility Checklist

- [ ] ButtonGroup has descriptive labels
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Full keyboard accessibility
- [ ] Focus indicators clearly visible
- [ ] Screen reader tested
- [ ] Form fieldset used for grouped inputs
- [ ] RTL layout works correctly
- [ ] Touch target size adequate (48x48px)
