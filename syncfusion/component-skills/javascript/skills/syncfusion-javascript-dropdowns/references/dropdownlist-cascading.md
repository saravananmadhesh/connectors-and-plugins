# Cascading DropDownList — Syncfusion TypeScript

## Overview

Cascading DropDownLists are linked dropdowns where the data of each child depends on the selection of its parent. The pattern is:

1. Listen to the `change` event on the parent DropDownList
2. Use a `Query` to filter the child's data source based on the parent's selected value
3. Enable the child dropdown and call `dataBind()` to apply the changes

---

## Basic Cascading: Country → State → City

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

let countryData: { [key: string]: Object }[] = [
    { CountryName: 'United States', CountryId: '1' },
    { CountryName: 'Australia',     CountryId: '2' }
];

let stateData: { [key: string]: Object }[] = [
    { StateName: 'New York',   CountryId: '1', StateId: '101' },
    { StateName: 'Virginia',   CountryId: '1', StateId: '102' },
    { StateName: 'Tasmania',   CountryId: '2', StateId: '105' }
];

let cityData: { [key: string]: Object }[] = [
    { CityName: 'Albany',     StateId: '101', CityId: 201 },
    { CityName: 'Beacon',     StateId: '101', CityId: 202 },
    { CityName: 'Hampton',    StateId: '102', CityId: 205 },
    { CityName: 'Emporia',    StateId: '102', CityId: 206 },
    { CityName: 'Hobart',     StateId: '105', CityId: 213 },
    { CityName: 'Launceston', StateId: '105', CityId: 214 }
];

// Country dropdown
let countryObj: DropDownList = new DropDownList({
    dataSource: countryData,
    fields: { value: 'CountryId', text: 'CountryName' },
    placeholder: 'Select a country',
    change: () => {
        // Filter states by selected country
        stateObj.query = new Query().where('CountryId', 'equal', countryObj.value);
        stateObj.enabled = true;
        stateObj.text = null;
        stateObj.dataBind();

        // Reset city
        cityObj.text = null;
        cityObj.enabled = false;
        cityObj.dataBind();
    }
});
countryObj.appendTo('#countries');

// State dropdown (disabled by default)
let stateObj: DropDownList = new DropDownList({
    dataSource: stateData,
    fields: { value: 'StateId', text: 'StateName' },
    enabled: false,
    placeholder: 'Select a state',
    change: () => {
        // Filter cities by selected state
        cityObj.query = new Query().where('StateId', 'equal', stateObj.value);
        cityObj.enabled = true;
        cityObj.text = null;
        cityObj.dataBind();
    }
});
stateObj.appendTo('#states');

// City dropdown (disabled by default)
let cityObj: DropDownList = new DropDownList({
    dataSource: cityData,
    fields: { text: 'CityName', value: 'CityId' },
    enabled: false,
    placeholder: 'Select a city'
});
cityObj.appendTo('#cities');
```

### Required HTML

```html
<input type="text" id="countries" />
<input type="text" id="states" />
<input type="text" id="cities" />
```

---

## Key Pattern Details

**Always call `dataBind()` after changing properties** — this applies the pending changes to the component immediately:

```ts
stateObj.query = new Query().where('CountryId', 'equal', countryObj.value);
stateObj.enabled = true;
stateObj.text = null;
stateObj.dataBind();  // ← required to reflect changes
```

**Disable child dropdowns by default** — use `enabled: false` to prevent users from interacting with a child before a parent is selected.

**Reset the child's text to null** when the parent changes — clears the stale selection before the child is repopulated.

---

## Preselecting Items in Cascading Dropdowns

To preselect values on load, manually trigger the cascade logic and set `index` on each child after calling `dataBind()`:

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

// ... (same data as above)

let countryObj: DropDownList = new DropDownList({
    dataSource: countryData,
    fields: { value: 'CountryId', text: 'CountryName' },
    change: countryChange,
    index: 1,  // preselect second country (Australia)
    placeholder: 'Select a country'
});
countryObj.appendTo('#countries');

let stateObj: DropDownList = new DropDownList({
    dataSource: stateData,
    fields: { value: 'StateId', text: 'StateName' },
    enabled: false,
    change: stateChange,
    placeholder: 'Select a state'
});
stateObj.appendTo('#states');

let cityObj: DropDownList = new DropDownList({
    dataSource: cityData,
    fields: { text: 'CityName', value: 'CityId' },
    enabled: false,
    placeholder: 'Select a city'
});
cityObj.appendTo('#cities');

// The change event doesn't fire on initial render, so trigger manually
countryChange();
stateObj.index = 0;   // preselect first state
stateObj.dataBind();
stateChange();
cityObj.index = 0;    // preselect first city
cityObj.dataBind();

function countryChange(): void {
    stateObj.query = new Query().where('CountryId', 'equal', countryObj.value);
    stateObj.enabled = true;
    stateObj.text = null;
    stateObj.dataBind();
    cityObj.text = null;
    cityObj.enabled = false;
    cityObj.dataBind();
}

function stateChange(): void {
    cityObj.query = new Query().where('StateId', 'equal', stateObj.value);
    cityObj.enabled = true;
    cityObj.text = null;
    cityObj.dataBind();
}
```

---

## Common Gotchas

- **`change` does not fire on initial render** — if you need preselection, call the cascade function manually after initialization.
- **Always call `dataBind()` after setting properties** on a child dropdown — without it, changes are queued but not applied.
- **Disable child dropdowns** — forgetting `enabled: false` on child dropdowns lets users interact before a parent is selected, which returns undefined results.
- **Clear the child's `text`** before `dataBind()` — otherwise the old selected text stays visible even after the list changes.
