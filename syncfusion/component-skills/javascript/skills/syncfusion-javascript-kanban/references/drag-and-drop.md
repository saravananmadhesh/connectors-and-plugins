# Kanban Drag and Drop Reference

This reference provides comprehensive information about drag and drop functionality in the Syncfusion TypeScript Kanban component.

## Table of Contents

- [Overview](#overview)
- [Internal Drag and Drop](#internal-drag-and-drop)
- [External Drag and Drop](#external-drag-and-drop)
- [Advanced Scenarios](#advanced-scenarios)
- [Edge Cases and Troubleshooting](#edge-cases-and-troubleshooting)

## Overview

The Kanban component supports comprehensive drag and drop functionality for cards:
- **Internal**: Within columns, across columns, and across swimlanes
- **External**: Between Kanban boards and with external components (TreeView, Schedule)

Card positioning after drop depends on the `sortSettings` property configuration.

## Internal Drag and Drop

### Column Drag and Drop

By default, all cards can be dragged and dropped across columns and within columns. This behavior is controlled by the `allowDragAndDrop` property.

#### Enable/Disable Drag and Drop

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
    allowDragAndDrop: false  // Disable drag and drop
});
kanbanObj.appendTo('#Kanban');
```

#### Column-Specific Control

You can control drag and drop behavior for individual columns using `allowDrag` and `allowDrop` properties:

```typescript
columns: [
    { headerText: 'Backlog', keyField: 'Open', allowDrag: true, allowDrop: true },
    { headerText: 'In Progress', keyField: 'InProgress', allowDrag: true, allowDrop: true },
    { headerText: 'Testing', keyField: 'Testing', allowDrag: true, allowDrop: false },  // Cannot drop here
    { headerText: 'Done', keyField: 'Close', allowDrag: false, allowDrop: true }  // Cannot drag from here
]
```

#### Transition Columns

Control the flow of cards between columns using the `transitionColumns` property:

```typescript
columns: [
    { 
        headerText: 'Backlog', 
        keyField: 'Open',
        transitionColumns: ['InProgress']  // Can only move to In Progress
    },
    { 
        headerText: 'In Progress', 
        keyField: 'InProgress',
        transitionColumns: ['Testing', 'Open']  // Can move to Testing or back to Backlog
    },
    { 
        headerText: 'Testing', 
        keyField: 'Testing',
        transitionColumns: ['Close', 'InProgress']
    },
    { 
        headerText: 'Done', 
        keyField: 'Close',
        transitionColumns: []  // Cannot move to any column
    }
]
```

### Swimlane Drag and Drop

By default, cards cannot be dragged across swimlane rows. Enable this by setting `allowDragAndDrop` in `swimlaneSettings`:

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
    swimlaneSettings: {
        keyField: 'Assignee',
        allowDragAndDrop: true  // Enable drag across swimlanes
    }
});
kanbanObj.appendTo('#Kanban');
```

## External Drag and Drop

### Kanban to Kanban

Drag and drop cards between two separate Kanban boards.

```typescript
import { Kanban, DragEventArgs } from '@syncfusion/ej2-kanban';
import { closest } from '@syncfusion/ej2-base';
import { kanbanAData, kanbanBData } from './datasource';

const kanbanObjA: Kanban = new Kanban({
    dataSource: kanbanAData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    externalDropId: ['#kanbanB'],  // Allow drop to kanbanB
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id',
        selectionType: 'Multiple'
    },
    showEmptyColumn: true,
    dragStop: (args: DragEventArgs): void => {
        if (closest(args.event.target as Element, '#kanbanB')) {
            kanbanObjA.deleteCard(args.data);
            
            // Handle duplicate IDs
            args.data.forEach((card: Record<string, any>, i: number) => {
                const index: number = kanbanObjB.kanbanData.findIndex(
                    (colData: Record<string, any>) =>
                        colData[kanbanObjB.cardSettings.headerField] === 
                        card[kanbanObjB.cardSettings.headerField]
                );
                if (index !== -1) {
                    // Generate new ID if duplicate exists
                    card[kanbanObjB.cardSettings.headerField] = 
                        Math.max(...kanbanObjB.kanbanData.map(
                            (obj: Record<string, string>) => 
                                parseInt(obj[kanbanObjB.cardSettings.headerField], 10)
                        )) + ++i;
                }
            });
            
            kanbanObjB.addCard(args.data, args.dropIndex);
            args.cancel = true;
        }
    }
});
kanbanObjA.appendTo('#kanbanA');

const kanbanObjB: Kanban = new Kanban({
    dataSource: kanbanBData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    },
    externalDropId: ['#kanbanA'],  // Allow drop to kanbanA
    showEmptyColumn: true,
    dragStop: (args: DragEventArgs): void => {
        if (closest(args.event.target as Element, '#kanbanA')) {
            kanbanObjB.deleteCard(args.data);
            
            args.data.forEach((card: Record<string, any>, i: number) => {
                const index: number = kanbanObjA.kanbanData.findIndex(
                    (colData: Record<string, any>) =>
                        colData[kanbanObjA.cardSettings.headerField] === 
                        card[kanbanObjA.cardSettings.headerField]
                );
                if (index !== -1) {
                    card[kanbanObjA.cardSettings.headerField] = 
                        Math.max(...kanbanObjA.kanbanData.map(
                            (obj: Record<string, string>) => 
                                parseInt(obj[kanbanObjA.cardSettings.headerField], 10)
                        )) + ++i;
                }
            });
            
            kanbanObjA.addCard(args.data, args.dropIndex);
            args.cancel = true;
        }
    }
});
kanbanObjB.appendTo('#kanbanB');
```

### TreeView to Kanban

Drag items from a TreeView component and drop them into the Kanban board.

```typescript
import { Kanban, KanbanModel, DragEventArgs } from '@syncfusion/ej2-kanban';
import { kanbanData, treeViewData } from './datasource';
import { closest } from '@syncfusion/ej2-base';
import { TreeView, DragAndDropEventArgs } from '@syncfusion/ej2-navigations';

const kanbanOptions: KanbanModel = {
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    externalDropId: ['#TreeView'],  // Allow drop to TreeView
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    },
    showEmptyColumn: true,
    dragStop: (args: DragEventArgs): void => {
        if (closest(args.event.target as Element, '#TreeView')) {
            kanbanObj.deleteCard(args.data);
            treeObj.addNodes(args.data);
            args.cancel = true;
        }
    }
};

const kanbanObj: Kanban = new Kanban(kanbanOptions);
kanbanObj.appendTo('#Kanban');

let treeObj: TreeView = new TreeView({
    fields: { 
        dataSource: treeViewData, 
        id: 'Id', 
        text: 'Status' 
    },
    allowDragAndDrop: true,
    nodeDragStop: onTreeDragStop,
    nodeTemplate: '#treeTemplate'
});
treeObj.appendTo('#TreeView');

function onTreeDragStop(args: DragAndDropEventArgs): void {
    if (closest(args.event.target as Element, '#Kanban')) {
        let treeData: { [key: string]: Object }[] =
            treeObj.fields.dataSource as { [key: string]: Object }[];
        const filteredData: { [key: string]: Object }[] =
            treeData.filter((item: any) => 
                item.Id === parseInt(args.draggedNodeData.id as string, 10)
            );
        
        treeObj.removeNodes([args.draggedNodeData.id] as string[]);
        kanbanObj.openDialog('Add', filteredData[0]);
        args.cancel = true;
    }
}
```

### Schedule to Kanban

Integrate Kanban with Schedule component for event management.

```typescript
import { Kanban, KanbanModel, DragEventArgs } from '@syncfusion/ej2-kanban';
import { kanbanData, scheduleData } from './datasource';
import { Schedule, TimelineViews, TimelineMonth, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import { closest, removeClass } from '@syncfusion/ej2-base';

const kanbanOptions: KanbanModel = {
    dataSource: kanbanData,
    keyField: 'DepartmentName',
    columns: [
        { headerText: 'GENERAL', keyField: 'GENERAL' }
    ],
    externalDropId: ['#Schedule'],
    cardSettings: {
        contentField: 'Name',
        headerField: 'Id',
        selectionType: 'Multiple'
    },
    showEmptyColumn: true,
    dragStop: (args: DragEventArgs): void => {
        if (closest(args.event.target as Element, '#Schedule')) {
            kanbanObj.deleteCard(args.data);
            scheduleObj.openEditor(args.data[0], 'Add', true);
            args.cancel = true;
        }
    }
};

const kanbanObj: Kanban = new Kanban(kanbanOptions);
kanbanObj.appendTo('#Kanban');

Schedule.Inject(TimelineViews, TimelineMonth, Resize, DragAndDrop);

let scheduleObj: Schedule = new Schedule({
    width: '350px',
    height: '650px',
    selectedDate: new Date(2018, 7, 1),
    currentView: 'TimelineDay',
    eventDragArea: "body",
    cssClass: 'schedule-drag-drop',
    workHours: {
        start: '08:00',
        end: '18:00'
    },
    views: [
        { option: 'TimelineDay' },
        { option: 'TimelineMonth' }
    ],
    group: {
        enableCompactView: false,
        resources: ['Departments', 'Consultants']
    },
    resources: [
        {
            field: 'DepartmentID', 
            title: 'Department',
            name: 'Departments', 
            allowMultiple: false,
            dataSource: [
                { Text: 'GENERAL', Id: 1, Color: '#bbdc00' },
                { Text: 'DENTAL', Id: 2, Color: '#9e5fff' }
            ],
            textField: 'Text', 
            idField: 'Id', 
            colorField: 'Color'
        },
        {
            field: 'ConsultantID', 
            title: 'Consultant',
            name: 'Consultants', 
            allowMultiple: false,
            dataSource: [
                { Text: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00', Designation: 'Cardiologist' },
                { Text: 'Nancy', Id: 2, GroupId: 2, Color: '#9e5fff', Designation: 'Orthodontist' },
                { Text: 'Robert', Id: 3, GroupId: 1, Color: '#bbdc00', Designation: 'Optometrist' },
                { Text: 'Robson', Id: 4, GroupId: 2, Color: '#9e5fff', Designation: 'Periodontist' },
                { Text: 'Laura', Id: 5, GroupId: 1, Color: '#bbdc00', Designation: 'Orthopedic' },
                { Text: 'Margaret', Id: 6, GroupId: 2, Color: '#9e5fff', Designation: 'Endodontist' }
            ],
            textField: 'Text', 
            idField: 'Id', 
            groupIDField: 'GroupId', 
            colorField: 'Color'
        }
    ],
    eventSettings: {
        dataSource: scheduleData,
        fields: {
            subject: { title: 'Patient Name', name: 'Name' },
            startTime: { title: 'From', name: 'StartTime' },
            endTime: { title: 'To', name: 'EndTime' },
            description: { title: 'Reason', name: 'Description' }
        }
    },
    dragStop: scheduleDragStop
});
scheduleObj.appendTo('#Schedule');

function scheduleDragStop(args: ScheduleDragEventArgs): void {
    if (closest(args.event.target as Element, '#Kanban')) {
        scheduleObj.deleteEvent(args.data.Id);
        removeClass([scheduleObj.element.querySelector('.e-selected-cell')], 'e-selected-cell');
        kanbanObj.openDialog('Add', args.data);
        args.cancel = true;
    }
}
```

## Advanced Scenarios

### Handling Duplicate IDs

When dragging cards between Kanban boards, handle duplicate IDs:

```typescript
dragStop: (args: DragEventArgs): void => {
    if (closest(args.event.target as Element, '#targetKanban')) {
        args.data.forEach((card: Record<string, any>, i: number) => {
            const existingCard = targetKanban.kanbanData.find(
                (data: any) => data.Id === card.Id
            );
            
            if (existingCard) {
                // Generate new unique ID
                const maxId = Math.max(...targetKanban.kanbanData.map(d => d.Id));
                card.Id = maxId + i + 1;
            }
        });
        
        sourceKanban.deleteCard(args.data);
        targetKanban.addCard(args.data, args.dropIndex);
        args.cancel = true;
    }
}
```

### Multi-Select Drag and Drop

Enable dragging multiple cards at once:

```typescript
cardSettings: {
    contentField: 'Summary',
    headerField: 'Id',
    selectionType: 'Multiple'  // Enable multi-selection
}
```

### Custom Drag Cursors

Customize the drag cursor appearance:

```css
.e-kanban .e-card.e-dragging {
    cursor: move;
    opacity: 0.7;
}

.e-kanban .e-card.e-drag-clone {
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}
```

## Edge Cases and Troubleshooting

### Common Issues

**Issue**: Cards cannot be dragged
- **Solution**: Check if `allowDragAndDrop` is set to `true` (default)
- **Solution**: Verify column-specific `allowDrag` property is not `false`

**Issue**: Cards cannot be dropped in certain columns
- **Solution**: Check `allowDrop` property on target columns
- **Solution**: Verify `transitionColumns` allows the drop

**Issue**: Swimlane drag not working
- **Solution**: Set `swimlaneSettings.allowDragAndDrop` to `true`

**Issue**: External drop not working
- **Solution**: Ensure `externalDropId` is correctly configured
- **Solution**: Verify the target element selector is correct

**Issue**: Card position incorrect after drop
- **Solution**: Check `sortSettings` configuration
- **Solution**: Verify `dropIndex` parameter in `addCard` method

**Issue**: Duplicate IDs causing errors
- **Solution**: Implement ID conflict resolution in `dragStop` event
- **Solution**: Ensure unique ID generation logic

### Best Practices

1. **Always handle dragStop event**: Use this event to implement custom logic and prevent conflicts
2. **Check for duplicates**: When dragging between boards, always check for duplicate IDs
3. **Use transaction columns**: Define allowed transitions to enforce workflow rules
4. **Enable showEmptyColumn**: This helps visualize drop targets
5. **Handle edge cases**: Test with empty columns, single cards, and multiple selections

### Performance Considerations

- Minimize operations in `dragStop` event handler
- Use `args.cancel = true` to prevent default behavior when implementing custom logic
- Batch operations when possible (use multiple selections)
- Consider debouncing for external component integrations

### Accessibility

- Ensure keyboard navigation works for drag and drop
- Provide visual feedback during drag operations
- Use ARIA attributes for drag state
- Test with screen readers for accessibility compliance
