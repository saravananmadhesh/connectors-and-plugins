# Filtering — Syncfusion Angular Mention

## Table of Contents
- [Overview](#overview)
- [Filter Type](#filter-type)
- [Minimum Filter Character Length](#minimum-filter-character-length)
- [Allow Spaces in Mention Search](#allow-spaces-in-mention-search)
- [Customize Suggestion Item Count](#customize-suggestion-item-count)
- [Debounce Delay](#debounce-delay)
- [Case and Accent Sensitivity](#case-and-accent-sensitivity)

---

## Overview

The Mention component has built-in filtering that activates as soon as the user types after the trigger character. You can control filter strategy, minimum input length, space handling, suggestion count, and debounce behavior.

---

## Filter Type

Use `filterType` to define how suggestions are matched. The default is `Contains`.

| Value | Behavior |
|-------|----------|
| `Contains` (default) | Items that contain the typed characters anywhere |
| `StartsWith` | Items that begin with the typed characters |
| `EndsWith` | Items that end with the typed characters |

```typescript
import { Component } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <label>Comments</label>
    <div id="mentionElement" placeholder="Type @ and tag user"></div>
    <ejs-mention
      [dataSource]="searchData"
      [query]="query"
      [fields]="fields"
      [filterType]="filterType"
      [target]="mentionTarget">
    </ejs-mention>
  `
})
export class AppComponent {
  public searchData: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
  });
  public mentionTarget: string = '#mentionElement';
  public query: Query = new Query().select(['ContactName', 'CustomerID']).take(7);
  public fields: Object = { text: 'ContactName', value: 'CustomerID' };
  // Only show items ending with the typed text
  public filterType: string = 'EndsWith';
}
```

---

## Minimum Filter Character Length

Use `minLength` to require the user to type a minimum number of characters before the suggestion popup opens. The default is `0` (popup opens immediately on trigger character).

This is especially useful with remote data to reduce unnecessary API calls.

```typescript
import { Component } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <label>Comments</label>
    <div id="mentionElement" placeholder="Type @ and tag user"></div>
    <ejs-mention
      [dataSource]="searchData"
      [query]="query"
      [fields]="fields"
      [minLength]="minLen"
      [target]="mentionTarget">
    </ejs-mention>
  `
})
export class AppComponent {
  public searchData: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
  });
  public mentionTarget: string = '#mentionElement';
  public query: Query = new Query().select(['ContactName', 'CustomerID']).take(7);
  public fields: Object = { text: 'ContactName', value: 'CustomerID' };
  // Require at least 3 characters before fetching suggestions
  public minLen: number = 3;
}
```

---

## Allow Spaces in Mention Search

By default, pressing **Space** ends the mention search. Set `allowSpaces` to `true` to support multi-word mentions (e.g., typing `@John Do` to match "John Doe").

> **Default:** `allowSpaces` is `false`. When disabled, space ends the mention search.

```typescript
import { Component } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <label>Comments</label>
    <div id="mentionElement" placeholder="Type @ and tag user"></div>
    <ejs-mention
      [dataSource]="userData"
      [fields]="fields"
      [allowSpaces]="allowSpaces"
      [target]="mentionTarget">
    </ejs-mention>
  `
})
export class AppComponent {
  public userData: { [key: string]: Object }[] = [
    { Name: 'Andrew Fuller', ID: '1' },
    { Name: 'Anne Dodsworth', ID: '2' },
    { Name: 'Janet Leverling', ID: '3' },
    { Name: 'Laura Callahan', ID: '4' },
    { Name: 'Margaret Peacock', ID: '5' }
  ];
  public fields: Object = { text: 'Name' };
  public mentionTarget: string = '#mentionElement';
  public allowSpaces: boolean = true;
}
```

---

## Customize Suggestion Item Count

Use `suggestionCount` to limit how many items are shown in the popup at once. The default is `25`.

```typescript
import { Component } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <label>Comments</label>
    <div id="mentionElement" placeholder="Type @ and tag user"></div>
    <ejs-mention
      [dataSource]="emailData"
      [fields]="fields"
      [suggestionCount]="suggestionCount"
      [target]="mentionTarget">
    </ejs-mention>
  `
})
export class AppComponent {
  public emailData: { [key: string]: Object }[] = [
    { Name: 'Selma Rose', EmailId: 'selma@gmail.com' },
    { Name: 'Maria', EmailId: 'maria@gmail.com' },
    { Name: 'Russo Kay', EmailId: 'russo@gmail.com' },
    { Name: 'Robert', EmailId: 'robert@gmail.com' },
    { Name: 'Camden Kate', EmailId: 'camden@gmail.com' },
    { Name: 'Garth', EmailId: 'garth@gmail.com' },
    { Name: 'Andrew James', EmailId: 'james@gmail.com' },
    { Name: 'Olivia', EmailId: 'olivia@gmail.com' }
  ];
  public mentionTarget: string = '#mentionElement';
  public fields: Object = { text: 'Name' };
  // Only show 4 suggestions at a time
  public suggestionCount: number = 4;
}
```

---

## Debounce Delay

Use `debounceDelay` to specify a delay (in milliseconds) before the filtering operation fires after the user stops typing. This is important for remote data sources to avoid flooding the API.

The default is `300` ms.

```typescript
// In your component class
public debounceDelay: number = 500; // Wait 500ms after user stops typing
```

```html
<ejs-mention
  [dataSource]="searchData"
  [debounceDelay]="debounceDelay"
  [target]="mentionTarget">
</ejs-mention>
```

---

## Case and Accent Sensitivity

### ignoreCase

By default, filtering is case-insensitive (`ignoreCase` defaults to `true`). Set to `false` for strict case-sensitive matching.

```html
<ejs-mention
  [dataSource]="userData"
  [ignoreCase]="false"
  [target]="mentionTarget">
</ejs-mention>
```

### ignoreAccent

Set `ignoreAccent` to `true` to treat accented characters (diacritics) as their base character equivalents during filtering (e.g., `é` matches `e`).

```html
<ejs-mention
  [dataSource]="userData"
  [ignoreAccent]="true"
  [target]="mentionTarget">
</ejs-mention>
```
