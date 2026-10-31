# Sorting & Disabled Items — Syncfusion Angular Mention

## Table of Contents
- [Sorting Suggestions](#sorting-suggestions)
- [Disabling Items via Data Source](#disabling-items-via-data-source)
- [Disabling Items Dynamically](#disabling-items-dynamically)

---

## Sorting Suggestions

Use `sortOrder` to control the display order of suggestions. The possible values are:

| Value | Behavior |
|-------|----------|
| `'None'` (default) | Data source order is preserved |
| `'Ascending'` | Items sorted A → Z |
| `'Descending'` | Items sorted Z → A |

```typescript
import { Component } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <label>Comments</label>
    <div id="mentionElement" placeholder="Type @ and tag sport"></div>
    <ejs-mention
      [dataSource]="userData"
      [fields]="fields"
      [sortOrder]="sortOrder"
      [target]="mentionTarget">
    </ejs-mention>
  `
})
export class AppComponent {
  public userData: { [key: string]: Object }[] = [
    { ID: 'game1', Game: 'Badminton' },
    { ID: 'game2', Game: 'Football' },
    { ID: 'game3', Game: 'Tennis' },
    { ID: 'game4', Game: 'Hockey' },
    { ID: 'game5', Game: 'Basketball' },
    { ID: 'game6', Game: 'Cricket' }
  ];
  public fields: Object = { text: 'Game' };
  public mentionTarget: string = '#mentionElement';
  // Sort suggestions in descending alphabetical order
  public sortOrder: string = 'Descending';
}
```

---

## Disabling Items via Data Source

Use `fields.disabled` to map a boolean column from your data source that marks specific items as non-selectable. Disabled items appear in the list but cannot be chosen.

```typescript
import { Component } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <label>Comments</label>
    <div id="mentionElement" placeholder="Type @ and tag status"></div>
    <ejs-mention
      [dataSource]="statusData"
      [fields]="fields"
      [target]="mentionTarget">
    </ejs-mention>
  `
})
export class AppComponent {
  public statusData: { [key: string]: Object }[] = [
    { Status: 'Open', State: false },
    { Status: 'Waiting for Customer', State: false },
    { Status: 'On Hold', State: true },        // disabled
    { Status: 'Follow-up', State: false },
    { Status: 'Closed', State: true },          // disabled
    { Status: 'Solved', State: false },
    { Status: 'Feature Request', State: false }
  ];
  // Map 'State' column to fields.disabled
  public fields: Object = { value: 'Status', disabled: 'State' };
  public mentionTarget: string = '#mentionElement';
}
```

> Items with `State: true` appear grayed out and cannot be selected.

---

## Disabling Items Dynamically

Use the `disableItem` method to disable a specific item at runtime. The method accepts a value, an `HTMLLIElement`, or an index.

| Parameter | Type | Description |
|-----------|------|-------------|
| `item` | `string \| number \| object \| HTMLLIElement` | The item to disable — by value, object, or DOM element |

> The `disableItem` method updates the `disabled` field state in the `dataSource`. To disable multiple items, iterate over the list and call `disableItem` for each one.

```typescript
import { Component, ViewChild } from '@angular/core';
import { MentionModule, MentionComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <label>Comments</label>
    <div id="mentionElement" placeholder="Type @ and tag user"></div>
    <ejs-mention #mention
      [dataSource]="userData"
      [fields]="fields"
      [target]="mentionTarget">
    </ejs-mention>
    <button (click)="disableItem()">Disable 'Robert'</button>
  `
})
export class AppComponent {
  @ViewChild('mention') mentionObj!: MentionComponent;

  public userData: { [key: string]: Object }[] = [
    { Name: 'Selma Rose', ID: '1' },
    { Name: 'Maria', ID: '2' },
    { Name: 'Robert', ID: '3' },
    { Name: 'William', ID: '4' },
    { Name: 'Joseph', ID: '5' }
  ];
  public fields: Object = { text: 'Name', value: 'ID' };
  public mentionTarget: string = '#mentionElement';

  disableItem(): void {
    // Disable 'Robert' by its value
    this.mentionObj.disableItem('3');
  }
}
```
