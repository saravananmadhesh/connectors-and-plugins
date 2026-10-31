# Filtering – Syncfusion ASP.NET Core Mention

## Table of Contents
- [Overview](#overview)
- [Filter Type](#filter-type)
- [Minimum Filter Character Length](#minimum-filter-character-length)
- [Allow Spaces in Search](#allow-spaces-in-search)
- [Customize Suggestion Count](#customize-suggestion-count)
- [Case-Sensitive Filtering](#case-sensitive-filtering)
- [Debounce Delay](#debounce-delay)
- [Custom Filtering with the Filtering Event](#custom-filtering-with-the-filtering-event)

---

## Overview

The Mention control has built-in filtering support. The filter operation starts as soon as the user types characters after the trigger character (`mentionChar`). Use the filtering properties to control how and when suggestions appear.

---

## Filter Type

Use `filterType` to control which part of the item text must match the user's input.

| Value | Behavior |
|---|---|
| `Contains` | Matches items where the text contains the typed characters (default) |
| `StartsWith` | Matches items where the text starts with the typed characters |
| `EndsWith` | Matches items where the text ends with the typed characters |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    filterType="StartsWith">
    <e-mention-fields text="Name" value="EmailId"></e-mention-fields>
</ejs-mention>
```

---

## Minimum Filter Character Length

Use `minLength` to require a minimum number of characters before the search action starts. This helps reduce unnecessary requests on large datasets.

- Default value: `0` (suggestion list opens immediately when the trigger character is typed)

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    minLength="3">
    <e-mention-fields text="Name" value="EmailId"></e-mention-fields>
</ejs-mention>
```

> With `minLength="3"`, the suggestion list will only appear after the user types at least 3 characters after `@`.

**Remote data with minLength:**
```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    minLength="3">
    <e-mention-fields text="ContactName" value="CustomerID"></e-mention-fields>
    <e-data-manager url="url"
        adaptor="ODataV4Adaptor" crossDomain="true">
    </e-data-manager>
</ejs-mention>
```

---

## Allow Spaces in Search

By default, pressing the spacebar ends the Mention search. Use `allowSpaces="true"` to allow spaces in the middle of the search term (useful for searching full names).

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    allowSpaces="true">
    <e-mention-fields text="Name" value="EmailId"></e-mention-fields>
</ejs-mention>
```

**Model:**
```csharp
public class EmailData
{
    public string Name { get; set; }
    public string EmailId { get; set; }
}
```

> When `allowSpaces` is `false` (default), typing `@Amy F` would close the popup on the space. With `allowSpaces="true"`, the search continues and can match "Amy Fernandez".

---

## Customize Suggestion Count

Use `suggestionCount` to limit how many items appear in the suggestion list.

- Default value: `25`

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    suggestionCount="5">
    <e-mention-fields text="Name" value="EmailId"></e-mention-fields>
</ejs-mention>
```

---

## Case-Sensitive Filtering

By default, `ignoreCase` is `true` (filtering is case-insensitive). Set to `false` for case-sensitive filtering.

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    ignoreCase="false">
    <e-mention-fields text="Name"></e-mention-fields>
</ejs-mention>
```

---

## Debounce Delay

The `debounceDelay` property controls the delay (in milliseconds) before the filter action runs after the user stops typing. This reduces rapid-fire filtering calls.

- Default: `300` ms

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    debounceDelay="500">
    <e-mention-fields text="Name"></e-mention-fields>
</ejs-mention>
```

---

## Custom Filtering with the Filtering Event

Use the `filtering` event for advanced server-side filtering or custom logic that overrides the default filter behavior.

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    filtering="onFiltering">
    <e-mention-fields text="Name" value="EmailId"></e-mention-fields>
</ejs-mention>

<script>
    function onFiltering(args) {
        // Apply a custom query based on input text
        var query = new ej.data.Query().where('Name', 'contains', args.text, true);
        // Update data with filtered result
        var dataManager = new ej.data.DataManager(this.dataSource);
        dataManager.executeQuery(query).then(function(e) {
            args.updateData(e.result);
        });
    }
</script>
```

> The `filtering` event receives `args.text` (typed value) and `args.updateData()` to return the filtered dataset to the component.
