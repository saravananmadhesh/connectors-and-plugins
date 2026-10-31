# Filtering – Syncfusion ASP.NET Core AutoComplete

## Table of Contents
- [Overview](#overview)
- [Change the Filter Type](#change-the-filter-type)
- [Filter Item Count](#filter-item-count)
- [Minimum Filter Character Length](#minimum-filter-character-length)
- [Case-Sensitive Filtering](#case-sensitive-filtering)
- [Diacritics Filtering](#diacritics-filtering)
- [Debounce Delay](#debounce-delay)

---

## Overview

The AutoComplete has built-in filtering support. The filter operation starts as soon as you type characters in the input. All filtering is controlled through properties — no extra event handling is needed for standard scenarios.

---

## Change the Filter Type

Use `filterType` to control how the typed text is matched against items.

| Filter Type | Description | Supported Data Types |
|---|---|---|
| `StartsWith` | Matches items that begin with the typed text | String |
| `EndsWith` | Matches items that end with the typed text | String |
| `Contains` | Matches items that contain the typed text anywhere | String |

**Default:** `Contains`

**Example – StartsWith filter:**

```cshtml
@{
    List<Countries> country = new List<Countries> {
        new Countries { Name = "Australia", Code = "AU" },
        new Countries { Name = "Canada", Code = "CA" },
        new Countries { Name = "India", Code = "IN" },
        new Countries { Name = "United States", Code = "US" }
    };
}

<ejs-autocomplete id="country"
    dataSource="@country"
    placeholder="Select a country"
    filterType="StartsWith"
    popupHeight="200px">
    <e-autocomplete-fields value="Name"></e-autocomplete-fields>
</ejs-autocomplete>
```

**Remote data with StartsWith filter (using OData):**

```cshtml
<ejs-autocomplete id="customers"
    query="new ej.data.Query().from('Customers').select(['ContactName'])"
    placeholder="Find a customer"
    filterType="StartsWith"
    popupHeight="200px">
    <e-autocomplete-fields value="ContactName"></e-autocomplete-fields>
    <e-data-manager url="url"
        adaptor="ODataV4Adaptor" crossDomain="true">
    </e-data-manager>
</ejs-autocomplete>
```

---

## Filter Item Count

Use `suggestionCount` to limit the number of items shown in the suggestion list.

**Default:** `20`

```cshtml
@{
    var countries = new string[] { "Australia", "Bermuda", "Canada", "Denmark", "Finland", "France", "Germany", "India", "Italy", "Japan" };
}

<ejs-autocomplete id="country"
    dataSource="countries"
    placeholder="Select a country"
    suggestionCount="5">
</ejs-autocomplete>
```

> This restricts the suggestion list to display a maximum of 5 items.

---

## Minimum Filter Character Length

Use `minLength` to require the user to type a minimum number of characters before suggestions appear.

**Default:** `1`

Useful for remote data sources to avoid unnecessary server requests on single-character input.

```cshtml
<ejs-autocomplete id="customers"
    placeholder="Find a customer (type 3+ chars)"
    minLength="3">
    <e-autocomplete-fields value="ContactName"></e-autocomplete-fields>
    <e-data-manager url="url"
        adaptor="ODataV4Adaptor" crossDomain="true">
    </e-data-manager>
</ejs-autocomplete>
```

---

## Case-Sensitive Filtering

By default, filtering is case-insensitive (`ignoreCase="true"`). To enable case-sensitive filtering, set `ignoreCase="false"`.

```cshtml
@{
    var data = new string[] { "Australia", "australia", "CANADA", "canada", "India" };
}

<ejs-autocomplete id="country"
    dataSource="data"
    placeholder="Select a country"
    ignoreCase="false">
</ejs-autocomplete>
```

With `ignoreCase="false"`, typing "aus" will only match "australia" but not "Australia".

---

## Diacritics Filtering

Use `ignoreAccent="true"` to ignore diacritical marks (accents) when filtering. This is useful for international character sets.

**Default:** `false`

```cshtml
@{
    var data = new string[] { "Åland Islands", "Aland Islands", "résumé", "resume", "café", "cafe" };
}

<ejs-autocomplete id="diacritics"
    dataSource="data"
    placeholder="Search with/without accents"
    ignoreAccent="true">
</ejs-autocomplete>
```

With `ignoreAccent="true"`, typing "cafe" will match both "cafe" and "café".

---

## Debounce Delay

Use `debounceDelay` to set a delay (in milliseconds) before the filter operation is triggered after the user types. This reduces filtering frequency and improves performance, especially with remote data.

**Default:** `300` ms. Set to `0` to disable debouncing.

```cshtml
<ejs-autocomplete id="customers"
    placeholder="Find a customer"
    debounceDelay="500">
    <e-autocomplete-fields value="ContactName"></e-autocomplete-fields>
    <e-data-manager url="url"
        adaptor="ODataV4Adaptor" crossDomain="true">
    </e-data-manager>
</ejs-autocomplete>
```

> Setting `debounceDelay="0"` triggers filtering on every keystroke immediately.
