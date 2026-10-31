# Kanban Advanced Features Reference

This reference provides comprehensive information about advanced features in the Syncfusion TypeScript Kanban component, including localization, persistence, priority management, validation, virtual scrolling, and sorting.

## Table of Contents

- [Localization](#localization)
- [State Persistence](#state-persistence)
- [Priority Management](#priority-management)
- [Validation (WIP Limits)](#validation-wip-limits)
- [Virtual Scrolling](#virtual-scrolling)
- [Sorting](#sorting)
- [Edge Cases and Troubleshooting](#edge-cases-and-troubleshooting)

## Localization

Localize Kanban text content for different cultures using the `locale` property. In Kanban, total count, min/max count text, and dialog text are localized.

### Locale Keys

| Locale Key | en-US (default) |
|------------|-----------------|
| items | items |
| min | Min |
| max | Max |
| cardsSelected | Cards Selected |
| addTitle | Add New Card |
| editTitle | Edit Card Details |
| deleteTitle | Delete Card |
| deleteContent | Are you sure you want to delete this card? |
| save | Save |
| delete | Delete |
| cancel | Cancel |
| yes | Yes |
| no | No |
| close | Close |
| noCard | No cards to display |
| unassigned | Unassigned |

### Loading Translations

Use the `L10n.load()` function to load translation objects:

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { L10n } from '@syncfusion/ej2-base';
import { kanbanData } from './datasource';

L10n.load({
    'de': {
        'kanban': {
            'items': 'Artikel',
            'min': 'Min',
            'max': 'Max',
            'cardsSelected': 'Karten ausgewählt',
            'addTitle': 'Neue Karte hinzufügen',
            'editTitle': 'Kartendetails bearbeiten',
            'deleteTitle': 'Karte löschen',
            'deleteContent': 'Möchten Sie diese Karte wirklich löschen?',
            'save': 'speichern',
            'delete': 'Löschen',
            'cancel': 'Stornieren',
            'yes': 'Ja',
            'no': 'Nein',
            'close': 'Schließen',
            'noCard': 'Keine Karten zum Anzeigen',
            'unassigned': 'nicht zugewiesen'
        }
    }
});

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    locale: 'de',
    columns: [
        { headerText: 'Backlog', keyField: 'Open', showItemCount: true, minCount: 6 },
        { headerText: 'In Progress', keyField: 'InProgress', showItemCount: true, maxCount: 3 },
        { headerText: 'Done', keyField: 'Close', showItemCount: true }
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

### Right to Left (RTL)

Enable RTL mode for right-to-left languages (Arabic, Farsi, Urdu, etc.) by setting `enableRtl` to `true`:

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { L10n } from '@syncfusion/ej2-base';
import { kanbanData } from './datasource';

L10n.load({
    'ar': {
        'kanban': {
            'items': 'العناصر',
            'min': 'أنا',
            'max': 'ماكس',
            'cardsSelected': 'تم تحديد البطاقات',
            'addTitle': 'إضافة بطاقة جديدة',
            'editTitle': 'تحرير تفاصيل البطاقة',
            'deleteTitle': 'حذف البطاقة',
            'deleteContent': 'هل أنت متأكد أنك تريد حذف هذه البطاقة؟',
            'save': 'حفظ',
            'delete': 'حذف',
            'cancel': 'إلغاء',
            'yes': 'نعم',
            'no': 'لا',
            'close': 'قريب',
            'noCard': 'لا توجد بطاقات لعرضها',
            'unassigned': 'غير معين'
        }
    }
});

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    enableRtl: true,
    locale: 'ar',
    columns: [
        { headerText: 'Backlog', keyField: 'Open', showItemCount: true, minCount: 2 },
        { headerText: 'In Progress', keyField: 'InProgress', showItemCount: true, maxCount: 3 },
        { headerText: 'Done', keyField: 'Close', showItemCount: true }
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

### Additional Languages Example

#### French Localization

```typescript
L10n.load({
    'fr': {
        'kanban': {
            'items': 'articles',
            'min': 'Min',
            'max': 'Max',
            'cardsSelected': 'Cartes sélectionnées',
            'addTitle': 'Ajouter une nouvelle carte',
            'editTitle': 'Modifier les détails de la carte',
            'deleteTitle': 'Supprimer la carte',
            'deleteContent': 'Êtes-vous sûr de vouloir supprimer cette carte?',
            'save': 'Enregistrer',
            'delete': 'Supprimer',
            'cancel': 'Annuler',
            'yes': 'Oui',
            'no': 'Non',
            'close': 'Fermer',
            'noCard': 'Aucune carte à afficher',
            'unassigned': 'Non attribué'
        }
    }
});
```

## State Persistence

Maintain Kanban state in browser's `localStorage` even after page refresh by setting `enablePersistence` to `true`.

### What Gets Persisted

- Data source state
- Column expand/collapse state
- Swimlane expand/collapse state

### Implementation

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    enablePersistence: true,
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

### Clearing Persisted Data

```typescript
// Clear persisted data for a specific Kanban instance
window.localStorage.removeItem('kanbanKanban');

// Clear all localStorage data
window.localStorage.clear();
```

## Priority Management

Control card placement and order within columns using the `priority` property mapped from the data source.

### Basic Priority Implementation

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
        priority: 'RankId'  // Must be a number field
    }
});
kanbanObj.appendTo('#Kanban');
```

**Important**: The `priority` property mapping key value must be in `number` format.

### Priority Behavior on Card Drop

Priority values are dynamically updated in the following scenarios:

1. **Empty Cell**: Dropped card priority value does not change

2. **Single Card - Last Position**: Dropped card priority changes based on previous card value (when cards don't have continuous order)

3. **Single Card - Previous Position**: Priority changes only if cards have continuous order

4. **Non-Continuous Order**: Dropped card priority changes based on previous card value

5. **Continuous Order**: Dropped card and all following cards with continuous values update their priority

### Priority Update Examples

#### Continuous Order Example
```
Initial State:
Column A: Card A (priority: 1), Card B (priority: 2), Card C (priority: 3)
Column B: Card D (priority: 5)

Action: Drop Card D between Card A and Card B

Result:
Card D priority: 2
Card B priority: 3
Card C priority: 4
```

#### Odd/Even Order Example
```
Initial State:
Column A: Card A (priority: 1), Card B (priority: 3), Card C (priority: 5)
Column B: Card D (priority: 5)

Action: Drop Card D between Card A and Card B

Result:
Card D priority: 2
Card B priority: 3
Card C priority: 5 (unchanged)
```

## Validation (WIP Limits)

Validate columns or swimlane cells using `minCount` or `maxCount` properties. Failed validations result in visual indicators.

### Constraint Types

1. **Column**: Default validation based on column card count
2. **Swimlane**: Validation based on swimlane cell card count

### Column Validation

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { 
            headerText: 'Backlog', 
            keyField: 'Open', 
            showItemCount: true, 
            minCount: 6  // Minimum 6 cards required
        },
        { 
            headerText: 'In Progress', 
            keyField: 'InProgress', 
            showItemCount: true, 
            maxCount: 5  // Maximum 5 cards allowed
        },
        { 
            headerText: 'Testing', 
            keyField: 'Testing', 
            showItemCount: true, 
            maxCount: 4,
            minCount: 3  // Between 3 and 4 cards
        },
        { 
            headerText: 'Done', 
            keyField: 'Close', 
            showItemCount: true 
        }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
});
kanbanObj.appendTo('#Kanban');
```

### Swimlane Validation

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    constraintType: 'Swimlane',  // Enable swimlane constraints
    columns: [
        { headerText: 'Backlog', keyField: 'Open', showItemCount: true },
        { headerText: 'In Progress', keyField: 'InProgress', showItemCount: true },
        { headerText: 'Done', keyField: 'Close', showItemCount: true }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    },
    swimlaneSettings: {
        keyField: 'Assignee',
        minCount: 2,  // Minimum cards per swimlane
        maxCount: 10  // Maximum cards per swimlane
    }
});
kanbanObj.appendTo('#Kanban');
```

## Virtual Scrolling

Load large datasets without performance degradation by enabling `enableVirtualization`.

### Basic Virtual Scrolling

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { generateKanbanDataVirtualScrollData } from './datasource';

let kanbanObj: Kanban = new Kanban({
    enableVirtualization: true,
    dataSource: generateKanbanDataVirtualScrollData(),
    keyField: 'Status',
    enableTooltip: true,
    columns: [
        { headerText: 'To Do', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Code Review', keyField: 'Review' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        headerField: 'Id',
        contentField: 'Summary',
        selectionType: 'Multiple'
    },
    dialogSettings: {
        fields: [
            { key: 'Id', text: 'ID', type: 'TextBox' },
            { key: 'Status', text: 'Status', type: 'DropDown' },
            { key: 'StoryPoints', text: 'Story Points', type: 'Numeric' },
            { key: 'Summary', text: 'Summary', type: 'TextArea' }
        ]
    }
});
kanbanObj.appendTo('#Kanban');
```

### Card Height Configuration

Set card height using the `cardHeight` property (in pixels). Default is `auto`, but with virtualization, it becomes `100px`.

```typescript
cardHeight: 120  // Set explicit card height
```

**Important**: Card height must be specified in pixels; percentage values are not accepted.

### Remote Data Configuration

When using remote data with virtual scrolling, the server must handle the `KanbanVirtualization` parameter:

```typescript
public IActionResult LoadCard([FromBody] ExtendedDataManagerRequest dm)
{
    kanbanData = _context.KanbanCards.ToList();
    IEnumerable<KanbanCard> DataSource = kanbanData.AsEnumerable();
    DataOperations operation = new DataOperations();
    
    // Normal Kanban data load `Where` query handling
    if (dm.Where != null && dm.Where.Count > 0 && dm.KanbanVirtualization != "KanbanVirtualization")
    {
        dm.Where[0].value = dm.Where[0].value.ToString();
        DataSource = operation.PerformFiltering(DataSource, dm.Where, dm.Where[0].Operator);
    }
    
    if (dm.Skip != 0)
    {
        DataSource = operation.PerformSkip(DataSource, dm.Skip);
    }
    
    // Normal Kanban data load `Take` query handling
    if (dm.Take != 0 && dm.KanbanVirtualization != "KanbanVirtualization")
    {
        DataSource = operation.PerformTake(DataSource, dm.Take);
    }
    
    // Kanban virtual scrolling data load handling
    var columnCount = new List<KeyValuePair<string, int>>();
    if (dm.KanbanVirtualization == "KanbanVirtualization" && dm.Where != null && dm.Where.Count > 0 && dm.Take != 0)
    {
        IEnumerable<KanbanCard> currentData = new List<KanbanCard>();
        List<WhereFilter> currentFilter = new List<WhereFilter>();
        
        for (int i = 0; i < dm.Where.Count; i++)
        {
            dm.Where[i].value = dm.Where[i].value.ToString();
            currentFilter.Add(dm.Where[i]);
            var filterData = operation.PerformFiltering(DataSource, currentFilter, dm.Where[i].Operator);
            columnCount.Add(new KeyValuePair<string, int>(dm.Where[i].value.ToString(), filterData.Count()));
            filterData = operation.PerformTake(filterData, dm.Take);
            currentData = currentData.Concat(filterData);
            currentFilter.Clear();
        }
        DataSource = currentData;
    }
    
    // Return data for Kanban virtual scrolling
    if (dm.KanbanVirtualization == "KanbanVirtualization")
    {
        return Json(new { result = DataSource, count = columnCount });
    }
    else
    {
        return Json(DataSource);
    }
}
```

### Virtual Scrolling Limitations

1. Card height cannot be `auto` - defaults to `100px` if not specified
2. Card height must be in pixels, not percentages
3. Card index position is not preserved when scrolling after drag and drop
4. Virtual scrolling is not supported with swimlanes

## Sorting

Arrange cards within columns using the `sortSettings` property.

### Sort By Options

1. **Index**: Sort by index with or without field mapping
2. **DataSourceOrder**: Sort by JSON data order
3. **Custom**: Sort by custom field mapping

### Index Without Field Mapping

Default behavior - cards load based on JSON order and drop based on position:

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
    // sortSettings not specified - defaults to Index without field
});
kanbanObj.appendTo('#Kanban');
```

### Index With Field Mapping

Cards load and drop based on field values:

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
    sortSettings: {
        sortBy: 'Index',
        field: 'RankId'  // Must be numeric field
    }
});
kanbanObj.appendTo('#Kanban');
```

### DataSource Order

Cards maintain JSON data order for both loading and dropping:

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
    sortSettings: {
        sortBy: 'DataSourceOrder'
    }
});
kanbanObj.appendTo('#Kanban');
```

### Custom With Field Mapping

Sort cards based on custom field values:

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
    sortSettings: {
        sortBy: 'Custom',
        field: 'Summary'  // Sort by Summary field
    }
});
kanbanObj.appendTo('#Kanban');
```

### Sort Direction

Control sort direction using the `direction` property (Ascending or Descending):

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
    sortSettings: {
        sortBy: 'Custom',
        field: 'Summary',
        direction: 'Descending'  // Sort in descending order
    }
});
kanbanObj.appendTo('#Kanban');
```

**Default**: Cards are sorted in `Ascending` order.

## Edge Cases and Troubleshooting

### Localization Issues

**Issue**: Translations not applying
- **Solution**: Ensure `L10n.load()` is called before Kanban initialization
- **Solution**: Verify locale key matches the locale property value
- **Solution**: Check all required translation keys are provided

**Issue**: RTL layout not working
- **Solution**: Set `enableRtl: true`
- **Solution**: Verify CSS supports RTL (no hardcoded left/right values)

### Persistence Issues

**Issue**: State not persisting
- **Solution**: Verify `enablePersistence: true`
- **Solution**: Check browser localStorage is enabled
- **Solution**: Ensure Kanban ID is unique on the page

**Issue**: Old state causing issues
- **Solution**: Clear localStorage data
- **Solution**: Version your persistence key

### Priority Issues

**Issue**: Priority not working
- **Solution**: Ensure priority field contains numeric values
- **Solution**: Verify field mapping is correct
- **Solution**: Check data source has the priority field

**Issue**: Priority values not updating
- **Solution**: Verify sortSettings is configured correctly
- **Solution**: Check if cards have continuous priority values

### Validation Issues

**Issue**: WIP limits not showing
- **Solution**: Set `showItemCount: true` on columns
- **Solution**: Verify minCount/maxCount values are correct
- **Solution**: Check constraintType for swimlane validation

**Issue**: Visual indicators not appearing
- **Solution**: Ensure CSS classes are not overridden
- **Solution**: Check browser console for errors

### Virtual Scrolling Issues

**Issue**: Performance still slow
- **Solution**: Verify `enableVirtualization: true`
- **Solution**: Set explicit `cardHeight` value
- **Solution**: Optimize server-side data handling

**Issue**: Cards not loading
- **Solution**: Check server response format
- **Solution**: Verify `KanbanVirtualization` parameter handling
- **Solution**: Review browser console for errors

**Issue**: Scroll position jumping
- **Solution**: Ensure consistent card heights
- **Solution**: Avoid dynamic height changes

### Sorting Issues

**Issue**: Cards not sorting
- **Solution**: Verify sortSettings configuration
- **Solution**: Check field mapping is correct
- **Solution**: Ensure field exists in data source

**Issue**: Sort order incorrect
- **Solution**: Check direction property (Ascending/Descending)
- **Solution**: Verify field data types are consistent
- **Solution**: Review data source values

### Best Practices

1. **Localization**: Load translations before component initialization
2. **Persistence**: Use unique IDs for each Kanban instance
3. **Priority**: Always use numeric values for priority fields
4. **Validation**: Combine with visual indicators for better UX
5. **Virtual Scrolling**: Set explicit card heights for consistent behavior
6. **Sorting**: Choose appropriate sort method based on use case
7. **Testing**: Test all features across different browsers and devices
8. **Performance**: Monitor performance with large datasets
9. **Accessibility**: Ensure features work with keyboard and screen readers
10. **Documentation**: Document custom configurations for maintenance
