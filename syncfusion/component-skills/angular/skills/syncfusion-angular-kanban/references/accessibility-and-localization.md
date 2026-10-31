# Accessibility and Localization in Angular Kanban

## Table of Contents
- [Accessibility (WCAG)](#accessibility-wcag)
- [Keyboard Navigation](#keyboard-navigation)
- [ARIA Attributes](#aria-attributes)
- [Screen Reader Support](#screen-reader-support)
- [Internationalization (i18n)](#internationalization-i18n)
- [Multi-Language Support](#multi-language-support)
- [Locale Data](#locale-data)

## Accessibility (WCAG)

### WCAG 2.1 Compliance

Syncfusion Kanban supports WCAG 2.1 Level AA standards:

- ✓ **Perceivable** - Content is perceivable to all users
- ✓ **Operable** - Component can be operated via keyboard
- ✓ **Understandable** - Clear labels and structure
- ✓ **Robust** - Works with assistive technologies

### Enable Accessibility

```typescript
import { Component } from '@angular/core';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban-accessible',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <div role="main" aria-label="Project management kanban board">
      <h1>Task Board</h1>
      
      <ejs-kanban
        keyField="Status"
        [dataSource]="data"
        [allowKeyboard]="true"
        [cardSettings]="cardSettings"
        tabindex="0"
        role="region"
        aria-label="Kanban board with columns and cards">
        <e-columns>
          <e-column 
            headerText="To Do" 
            keyField="Open"
            role="region"
            aria-label="To do column with {{ getColumnCardCount('Open') }} cards">
          </e-column>
          <e-column 
            headerText="In Progress" 
            keyField="InProgress"
            role="region"
            aria-label="In progress column with {{ getColumnCardCount('InProgress') }} cards">
          </e-column>
          <e-column 
            headerText="Done" 
            keyField="Close"
            role="region"
            aria-label="Completed column with {{ getColumnCardCount('Close') }} cards">
          </e-column>
        </e-columns>
      </ejs-kanban>
    </div>
  `,
  styles: [`
    /* Focus indicators for keyboard navigation */
    :host ::ng-deep .e-kanban .e-card:focus,
    :host ::ng-deep .e-kanban .e-card:focus-visible {
      outline: 3px solid #4A90E2;
      outline-offset: 2px;
    }
  `]
})
export class KanbanAccessibleComponent {
  data = [
    { Id: 1, Status: 'Open', Summary: 'Design UI mockup' },
    { Id: 2, Status: 'InProgress', Summary: 'Implement authentication' }
  ];

  cardSettings = {
    headerField: 'Id',
    contentField: 'Summary'
  };

  getColumnCardCount(status: string): number {
    return this.data.filter(d => d.Status === status).length;
  }
}
```

## Keyboard Navigation

### Supported Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Tab** | Navigate to next card |
| **Shift + Tab** | Navigate to previous card |
| **Arrow Keys** | Move focus within board |
| **Space** | Select/deselect card |
| **Enter** | Open card details or dialog |
| **Delete** | Delete selected card |
| **Escape** | Close dialog or deselect |

### Keyboard Navigation Example

```typescript
@Component({
  selector: 'app-kanban-keyboard',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban
      [allowKeyboard]="true"
      keyField="Status"
      [cardSettings]="{selectionType: 'Multiple'}"
      (created)="onCreated()">
    </ejs-kanban>
  `
})
export class KanbanKeyboardComponent {
  onCreated(): void {
    // Configure custom keyboard shortcuts
    console.log('Keyboard navigation enabled');
    console.log('Use Tab to navigate, Space to select, Enter to edit');
  }
}
```

### Custom Keyboard Handlers

```typescript
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-kanban-custom-keys',
  standalone: true,
  template: `<ejs-kanban #kanban></ejs-kanban>`
})
export class KanbanCustomKeysComponent {
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case 's':
          event.preventDefault();
          this.saveBoard();
          break;
        case 'z':
          event.preventDefault();
          this.undo();
          break;
        case 'y':
          event.preventDefault();
          this.redo();
          break;
      }
    }
  }

  private saveBoard(): void {
    console.log('Board saved');
  }

  private undo(): void {
    console.log('Undo action');
  }

  private redo(): void {
    console.log('Redo action');
  }
}
```

## ARIA Attributes

### Add ARIA Labels and Roles

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-kanban-aria',
  standalone: true,
  template: `
    <div role="main" aria-label="Task management kanban">
      <h1 id="kanban-title">Project Kanban Board</h1>
      
      <ejs-kanban
        keyField="Status"
        aria-labelledby="kanban-title"
        role="region"
        aria-description="Drag and drop cards to organize tasks by status">
      </ejs-kanban>
    </div>
  `
})
export class KanbanAriaComponent {}
```

### Card ARIA Attributes

```typescript
cardSettings = {
  template: `
    <div 
      role="article"
      aria-label="Task \${data.Id}: \${data.Summary} - Status: \${data.Status}"
      tabindex="0">
      <div role="heading" aria-level="3">\${data.Id}</div>
      <p>\${data.Summary}</p>
      <div aria-label="Priority: \${data.Priority}">\${data.Priority}</div>
    </div>
  `
};
```

## Screen Reader Support

### Enable for Screen Readers

```typescript
@Component({
  selector: 'app-kanban-screenreader',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban
      keyField="Status"
      [dataSource]="data"
      [cardSettings]="cardSettings"
      role="region"
      aria-live="polite"
      (dragStop)="onDragStop($event)">
    </ejs-kanban>
  `
})
export class KanbanScreenReaderComponent {
  data = [
    { Id: 1, Status: 'Open', Summary: 'Design UI', Priority: 'High' }
  ];

  cardSettings = {
    headerField: 'Id',
    contentField: 'Summary',
    template: `
      <article role="article">
        <h4 aria-label="Card ID">\${data.Id}</h4>
        <p aria-label="Task Description">\${data.Summary}</p>
        <span aria-label="Priority Level">\${data.Priority}</span>
      </article>
    `
  };

  onDragStop(args: any): void {
    // Announce card movement to screen readers
    const announcement = `Card \${args.data.Id} moved to \${args.data.Status} column`;
    this.announceToScreenReader(announcement);
  }

  private announceToScreenReader(message: string): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.textContent = message;
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    document.body.appendChild(announcement);

    setTimeout(() => announcement.remove(), 1000);
  }
}
```

## Internationalization (i18n)

### Setup i18n in Angular

```bash
ng add @angular/localize
ng extract-i18n
```

### Localize Component Text

```typescript
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-kanban-i18n',
  standalone: true,
  imports: [KanbanModule, TranslateModule],
  template: `
    <select (change)="onLanguageChange($event)">
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
      <option value="de">Deutsch</option>
    </select>

    <ejs-kanban
      keyField="Status"
      [dataSource]="data">
      <e-columns>
        <e-column 
          [headerText]="'TODO' | translate" 
          keyField="Open">
        </e-column>
        <e-column 
          [headerText]="'IN_PROGRESS' | translate" 
          keyField="InProgress">
        </e-column>
        <e-column 
          [headerText]="'DONE' | translate" 
          keyField="Close">
        </e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanI18nComponent {
  data = [{ Id: 1, Status: 'Open', Summary: 'Task 1' }];

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLanguage('en');
  }

  onLanguageChange(event: any): void {
    this.translate.use(event.target.value);
  }
}
```

## Multi-Language Support

### Translation Files

**en.json**
```json
{
  "TODO": "To Do",
  "IN_PROGRESS": "In Progress",
  "DONE": "Done",
  "ADD_CARD": "Add Card",
  "DELETE_CARD": "Delete Card",
  "PRIORITY": "Priority",
  "ASSIGNEE": "Assignee"
}
```

**es.json**
```json
{
  "TODO": "Por hacer",
  "IN_PROGRESS": "En progreso",
  "DONE": "Completado",
  "ADD_CARD": "Agregar tarjeta",
  "DELETE_CARD": "Eliminar tarjeta",
  "PRIORITY": "Prioridad",
  "ASSIGNEE": "Asignado a"
}
```

**fr.json**
```json
{
  "TODO": "À faire",
  "IN_PROGRESS": "En cours",
  "DONE": "Terminé",
  "ADD_CARD": "Ajouter une carte",
  "DELETE_CARD": "Supprimer la carte",
  "PRIORITY": "Priorité",
  "ASSIGNEE": "Assigné à"
}
```

**de.json**
```json
{
  "TODO": "Zu erledigen",
  "IN_PROGRESS": "In Bearbeitung",
  "DONE": "Fertig",
  "ADD_CARD": "Karte hinzufügen",
  "DELETE_CARD": "Karte löschen",
  "PRIORITY": "Priorität",
  "ASSIGNEE": "Zugewiesen an"
}
```

## Locale Data

### Configure Locale Settings

```typescript
import { Component } from '@angular/core';
import { L10n } from '@syncfusion/ej2-base';

// Set locale for Kanban component
L10n.load({
  'ar': {
    'kanban': {
      'addCard': 'إضافة بطاقة',
      'deleteCard': 'حذف البطاقة',
      'editCard': 'تعديل البطاقة',
      'openDialog': 'فتح الحوار'
    }
  },
  'fr': {
    'kanban': {
      'addCard': 'Ajouter une carte',
      'deleteCard': 'Supprimer la carte',
      'editCard': 'Modifier la carte',
      'openDialog': 'Ouvrir la boîte de dialogue'
    }
  }
});

@Component({
  selector: 'app-kanban-locale',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban
      keyField="Status"
      locale="ar"
      [dataSource]="data">
    </ejs-kanban>
  `
})
export class KanbanLocaleComponent {
  data = [{ Id: 1, Status: 'Open', Summary: 'Task 1' }];
}
```

### Supported Locales

- Arabic (ar)
- Chinese (zh)
- Dutch (nl)
- English (en)
- French (fr)
- German (de)
- Italian (it)
- Japanese (ja)
- Korean (ko)
- Portuguese (pt)
- Russian (ru)
- Spanish (es)
- Swedish (sv)
- Turkish (tr)

## Accessibility Checklist

- [ ] `allowKeyboard` enabled
- [ ] ARIA labels added to regions
- [ ] Focus indicators visible
- [ ] Semantic HTML used
- [ ] Color not sole indicator
- [ ] Card content readable
- [ ] Screen reader tested
- [ ] Keyboard navigation works
- [ ] Contrast ratio WCAG AA (4.5:1)
- [ ] Font size minimum 12px

## Testing Accessibility

### Automated Testing
```bash
npm install --save-dev @axe-core/cli
npx axe https://localhost:4200
```

### Manual Testing
1. **Keyboard Only** - Navigate using only Tab and Arrow keys
2. **Screen Reader** - Test with NVDA (Windows) or VoiceOver (Mac)
3. **Color Contrast** - Use WebAIM Contrast Checker
4. **WCAG Validator** - Use WAVE browser extension

## Best Practices

1. Always provide descriptive labels
2. Use semantic HTML (article, section, heading roles)
3. Ensure color contrast ratios meet WCAG AA
4. Test with real assistive technology
5. Support keyboard-only navigation
6. Provide text alternatives for visual content
7. Use aria-live for dynamic updates
8. Test with actual users who use assistive tech
