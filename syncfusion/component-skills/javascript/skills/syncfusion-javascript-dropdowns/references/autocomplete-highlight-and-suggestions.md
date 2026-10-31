# Highlight and Suggestions — Syncfusion TypeScript AutoComplete

## Table of Contents
- [highlight](#highlight)
- [suggestionCount](#suggestioncount)
- [showPopupButton](#showpopupbutton)
- [showPopup()](#showpopup)
- [hidePopup()](#hidepopup)
- [Combining All Three](#combining-all-three)

---

## highlight

When `true`, the characters in each suggestion item that match the typed text are visually highlighted (bold / styled). Default is `false`.

```typescript
import { AutoComplete } from '@syncfusion/ej2-dropdowns';

const countries: string[] = [
  'Australia', 'Austria', 'Brazil', 'Canada',
  'China', 'France', 'Germany', 'India', 'Japan'
];

const atcObj: AutoComplete = new AutoComplete({
  dataSource: countries,
  highlight: true,
  placeholder: 'Search a country'
});
atcObj.appendTo('#atc');
// Typing "an" bolds the "an" substring in "France", "Germany", "Japan" etc.
```

**How highlighting works internally:**
- After each filter pass, the component wraps matched substrings in a `<span class="e-highlight">` element
- The span is styled by the active theme's CSS — you can override it:

```css
/* Override highlight color */
.e-autocomplete .e-highlight {
  background-color: #fff3cd;
  font-weight: 700;
  color: #333;
}
```

Toggle `highlight` at runtime:

```typescript
atcObj.highlight = true;
atcObj.dataBind();
```

---

## suggestionCount

Specifies the maximum number of items displayed in the suggestion popup. The limit is applied after filtering — if filtering returns 50 items but `suggestionCount` is `10`, only the first 10 are rendered. Default is `20`.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: largeSportsList,  // hundreds of items
  suggestionCount: 8,
  placeholder: 'Search (max 8 results)'
});
atcObj.appendTo('#atc');
```

**With remote data:** `suggestionCount` adds a `.take(n)` clause to the filter query, limiting what the server returns:

```typescript
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

const atcObj: AutoComplete = new AutoComplete({
  dataSource: new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  }),
  fields: { text: 'ContactName', value: 'CustomerID' },
  suggestionCount: 5,   // only fetch and show 5 results per query
  minLength: 2,
  placeholder: 'Search customers'
});
atcObj.appendTo('#atc');
```

Update `suggestionCount` at runtime:

```typescript
atcObj.suggestionCount = 15;
atcObj.dataBind();
```

---

## showPopupButton

When `true`, renders a dropdown arrow button on the right side of the input. Clicking the button opens the popup (showing all items filtered by the current input text). Default is `false`.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Alice', 'Bob', 'Carol', 'David'],
  showPopupButton: true,
  placeholder: 'Search or click ▼'
});
atcObj.appendTo('#atc');
```

Toggle the button at runtime:

```typescript
// Show button
atcObj.showPopupButton = true;
atcObj.dataBind();

// Hide button
atcObj.showPopupButton = false;
atcObj.dataBind();
```

> **Note:** When `showPopupButton` is `true`, the visual appearance resembles a ComboBox. The popup still only shows items matching the current input text — it does not show all items like a ComboBox's full open behavior (unless `minLength: 0` is also set).

---

## showPopup()

Programmatically opens the suggestion popup. The popup shows items matching the current input value. If the input is empty and `minLength` is `0`, all items are shown.

```typescript
import { AutoComplete } from '@syncfusion/ej2-dropdowns';

const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Alice', 'Bob', 'Carol'],
  minLength: 0,
  placeholder: 'Search'
});
atcObj.appendTo('#atc');

// Open popup programmatically — e.g. on button click
document.getElementById('openBtn')!.addEventListener('click', () => {
  atcObj.showPopup();
});
```

**Signature:**
```typescript
showPopup(e?: MouseEvent | KeyboardEventArgs | TouchEvent): void
```

---

## hidePopup()

Programmatically closes the suggestion popup if it is currently open. Does nothing if the popup is already closed.

```typescript
document.getElementById('closeBtn')!.addEventListener('click', () => {
  atcObj.hidePopup();
});
```

**Signature:**
```typescript
hidePopup(e?: MouseEvent | KeyboardEventArgs | TouchEvent): void
```

---

## Combining All Three

A common pattern is to combine `highlight`, `suggestionCount`, and `showPopupButton` for an enhanced search input:

```typescript
import { AutoComplete } from '@syncfusion/ej2-dropdowns';

const cities: string[] = [
  'Amsterdam', 'Bangkok', 'Barcelona', 'Beijing', 'Berlin',
  'Cairo', 'Chicago', 'Dubai', 'Dublin', 'Istanbul',
  'Jakarta', 'Karachi', 'Lagos', 'London', 'Los Angeles',
  'Madrid', 'Melbourne', 'Mexico City', 'Moscow', 'Mumbai',
  'New York', 'Oslo', 'Paris', 'Rome', 'São Paulo',
  'Seoul', 'Singapore', 'Stockholm', 'Sydney', 'Tokyo',
  'Toronto', 'Vienna', 'Warsaw', 'Zurich'
];

const atcObj: AutoComplete = new AutoComplete({
  dataSource: cities,
  highlight: true,          // bold matched characters
  suggestionCount: 8,       // show max 8 results
  showPopupButton: true,    // show dropdown arrow
  minLength: 0,             // open popup on any focus/click
  filterType: 'StartsWith', // match from beginning
  placeholder: 'Search a city'
});
atcObj.appendTo('#atc');
```

```css
/* Custom highlight style */
.e-autocomplete .e-highlight {
  background-color: #e8f4fd;
  font-weight: 600;
}
```

**Expected behavior:**
- Click the ▼ button → shows all cities (up to 8)
- Type `'ber'` → shows `'Berlin'` with `'ber'` highlighted — plus matches depending on `filterType`
- Press **Escape** or blur → popup closes
