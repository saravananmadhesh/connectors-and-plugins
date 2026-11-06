# Accessibility in Syncfusion Angular ListView

## WCAG 2.1 Compliance

The Syncfusion ListView component follows Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards, ensuring it's accessible to users with disabilities.

---

## Keyboard Navigation

### Built-in Keyboard Support

ListView automatically supports these keyboard shortcuts:

| Key | Action |
|-----|--------|
| `Arrow Up` | Move focus to previous item |
| `Arrow Down` | Move focus to next item |
| `Home` | Move focus to first item |
| `End` | Move focus to last item |
| `Space` | Select/deselect item (with checkboxes) |
| `Enter` | Activate/select focused item |
| `Ctrl+A` | Select all items (with checkboxes) |

### Example: Keyboard-Accessible ListView

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-accessible-list',
  template: `
    <ejs-listview 
      id='accessible-list'
      [dataSource]='items'
      [showCheckBox]='true'
      role='listbox'
      aria-label='Accessible list of items'>
    </ejs-listview>
  `
})
export class AccessibleListComponent {
  public items = [
    { text: 'Item 1', id: '1' },
    { text: 'Item 2', id: '2' },
    { text: 'Item 3', id: '3' }
  ];
}
```

---

## ARIA Attributes

ListView includes proper ARIA attributes for screen reader support:

```typescript
<ejs-listview 
  id='products-list'
  [dataSource]='products'
  role='listbox'
  aria-label='List of available products'
  aria-describedby='list-description'>
</ejs-listview>

<p id='list-description'>Select products from the list below</p>
```

### ARIA Roles and Properties

| Attribute | Purpose |
|-----------|---------|
| `role="listbox"` | Identifies the component as a list |
| `aria-label` | Provides accessible name for the list |
| `aria-describedby` | Links to descriptive text |
| `aria-selected` | Indicates selected state |
| `aria-disabled` | Indicates disabled items |
| `aria-checked` | Indicates checkbox state |
| `aria-live="polite"` | Announces dynamic content changes |

---

## Screen Reader Support

### Making ListView Screen-Reader Friendly

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-sr-friendly-list',
  template: `
    <div>
      <label for='item-list' class='sr-label'>
        Select items from the list
      </label>
      
      <ejs-listview 
        id='item-list'
        [dataSource]='items'
        [showCheckBox]='true'
        role='listbox'
        aria-label='Item selection list'
        [fields]='fields'>
      </ejs-listview>
    </div>
  `,
  styles: [`
    /* Hide label visually but keep it for screen readers */
    .sr-label {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0,0,0,0);
      white-space: nowrap;
      border: 0;
    }
  `]
})
export class ScreenReaderFriendlyComponent {
  public items = [
    { text: 'Apple', id: '1' },
    { text: 'Banana', id: '2' },
    { text: 'Orange', id: '3' }
  ];

  public fields = {
    id: 'id',
    isChecked: 'isChecked'
  };
}
```

---

## Focus Management

### Visible Focus Indicators

```css
/* Enhance focus visibility for keyboard navigation */
.e-listview .e-list-item:focus,
.e-listview .e-list-item:focus-visible {
  outline: 2px solid #007bff;
  outline-offset: -2px;
}

/* High contrast mode support */
@media (prefers-contrast: more) {
  .e-listview .e-list-item:focus {
    outline-width: 3px;
    outline-color: #000;
  }
}
```

### Programmatic Focus Management

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-focus-management',
  template: `
    <button (click)="focusFirstItem()">Focus First Item</button>
    <button (click)="focusLastItem()">Focus Last Item</button>
    
    <ejs-listview 
      #listview
      id='focus-list'
      [dataSource]='items'
      (select)="onSelect($event)">
    </ejs-listview>
  `
})
export class FocusManagementComponent {
  @ViewChild('listview', { read: ElementRef }) listView!: ElementRef;

  public items = [
    { text: 'Item 1', id: '1' },
    { text: 'Item 2', id: '2' },
    { text: 'Item 3', id: '3' }
  ];

  focusFirstItem() {
    const firstItem = this.listView.nativeElement.querySelector('.e-list-item');
    if (firstItem) {
      firstItem.focus();
    }
  }

  focusLastItem() {
    const items = this.listView.nativeElement.querySelectorAll('.e-list-item');
    if (items.length > 0) {
      items[items.length - 1].focus();
    }
  }

  onSelect(event: any) {
    // Announce selection to screen readers
    const announcement = `${event.data.text} selected`;
    this.announceToScreenReader(announcement);
  }

  announceToScreenReader(message: string) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => announcement.remove(), 1000);
  }
}
```

---

## Color Contrast

### Ensuring Sufficient Contrast

```css
/* Meet WCAG AA standards (4.5:1 for text, 3:1 for graphics) */
.e-listview .e-list-item {
  color: #212121;  /* Dark text */
  background-color: #ffffff;  /* Light background */
}

.e-listview .e-list-item:hover {
  background-color: #e3f2fd;  /* Sufficient contrast */
}

.e-listview .e-list-item.e-active {
  background-color: #0052cc;
  color: #ffffff;  /* Sufficient contrast */
}

/* Ensure icons have sufficient contrast */
.e-listview .e-icon {
  color: #212121;  /* Dark icon */
}
```

### Testing Contrast Ratios

Use WebAIM's Contrast Checker or axe DevTools to verify contrast ratios meet WCAG requirements.

---

## Text Alternatives

### Providing Text for Visual Content

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-text-alternatives',
  template: `
    <ejs-listview 
      [dataSource]='items'
      cssClass='e-list-template'>
      
      <ng-template #template let-data="">
        <div class="e-list-wrapper">
          <!-- Image with alt text -->
          <img 
            [src]="data.imageUrl" 
            [alt]="data.imageAlt"
            class="item-image">
          
          <!-- Text description -->
          <span class="item-text">{{data.name}}</span>
          
          <!-- Icon with aria-label -->
          <span 
            class="item-icon"
            [ngClass]="data.iconClass"
            [attr.aria-label]="data.iconDescription">
          </span>
        </div>
      </ng-template>
    </ejs-listview>
  `
})
export class TextAlternativesComponent {
  public items = [
    {
      id: '1',
      name: 'Product A',
      imageUrl: 'product-a.jpg',
      imageAlt: 'Product A - a blue widget',
      iconClass: 'e-icons e-add-icon',
      iconDescription: 'Add product to cart'
    },
    {
      id: '2',
      name: 'Product B',
      imageUrl: 'product-b.jpg',
      imageAlt: 'Product B - a red gadget',
      iconClass: 'e-icons e-delete-icon',
      iconDescription: 'Remove product from list'
    }
  ];
}
```

---

## Testing Accessibility

### Automated Testing

```typescript
// Example using axe accessibility testing
import { axe, toHaveNoViolations } from 'jest-axe';

describe('ListView Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const results = await axe(document);
    expect(results).toHaveNoViolations();
  });
});
```

### Manual Testing Checklist

- [ ] Test keyboard navigation (Tab, Arrow keys, Enter, Space)
- [ ] Use screen reader (NVDA, JAWS, VoiceOver) to verify announcements
- [ ] Check color contrast with accessibility tools (WebAIM, Contrast Checker)
- [ ] Verify focus indicators are visible
- [ ] Test with browser zoom at 200%
- [ ] Verify text alternatives for all images/icons
- [ ] Check for keyboard traps
- [ ] Test with high contrast mode enabled

---

## Best Practices

✅ Always provide meaningful ARIA labels  
✅ Ensure keyboard navigation works smoothly  
✅ Use semantic HTML elements  
✅ Maintain sufficient color contrast ratios  
✅ Provide text alternatives for visual content  
✅ Test with actual assistive technology  
✅ Document accessibility features  
✅ Follow WCAG 2.1 Level AA guidelines  
✅ Keep focus indicators visible  
✅ Use screen reader testing tools  

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe DevTools](https://www.deque.com/axe/devtools/)

