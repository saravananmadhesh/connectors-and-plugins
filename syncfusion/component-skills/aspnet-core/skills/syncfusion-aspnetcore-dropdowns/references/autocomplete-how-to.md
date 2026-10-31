# How-To Scenarios – Syncfusion ASP.NET Core AutoComplete

## Table of Contents
- [Autofill While Filtering](#autofill-while-filtering)
- [Custom Highlight Search](#custom-highlight-search)
- [Show List Items with Icons](#show-list-items-with-icons)
- [Filter by Both Text and Value Fields](#filter-by-both-text-and-value-fields)
- [AutoCompleteFor with Model Binding](#autocompletefor-with-model-binding)
- [Data Annotations with AutoCompleteFor](#data-annotations-with-autocompletefor)

---

## Autofill While Filtering

Use `autofill="true"` to auto-complete the first matched item inline in the input as the user types. If no match is found, nothing is suggested.

**Default:** `autofill` is `false`

```cshtml
@{
    var sports = new string[] { "Badminton", "Basketball", "Cricket", "Football", "Golf", "Hockey", "Tennis" };
}

<ejs-autocomplete id="sports"
    dataSource="sports"
    placeholder="Select a sport"
    autofill="true">
</ejs-autocomplete>
```

> With `autofill="true"`, as the user types "Bas", the input auto-fills "Basketball" inline. The user can press `Delete` to remove the auto-filled portion and continue typing.

---

## Custom Highlight Search

Use `highlight="true"` to highlight the typed characters in the suggestion list items. Matched characters are wrapped with the `e-highlight` CSS class.

**Default:** `highlight` is `false`

```cshtml
@{
    var sports = new string[] { "Badminton", "Basketball", "Cricket", "Football", "Golf", "Hockey", "Tennis" };
}

<ejs-autocomplete id="sports"
    dataSource="sports"
    placeholder="Select a sport"
    highlight="true">
</ejs-autocomplete>
```

**Customize highlight appearance:**
```css
.e-highlight {
    color: #e91e63;
    font-weight: bold;
}
```

---

## Show List Items with Icons

Use the `iconCss` field in `<e-autocomplete-fields>` to display icons in list items. The `iconCss` field maps to a CSS class that applies icon styles.

**Model:**
```csharp
public class IconData {
    public string Name { get; set; }
    public string IconCss { get; set; }
}
```

**View:**
```cshtml
@{
    List<IconData> items = new List<IconData> {
        new IconData { Name = "Badminton",   IconCss = "e-badminton" },
        new IconData { Name = "Basketball",  IconCss = "e-basketball" },
        new IconData { Name = "Cricket",     IconCss = "e-cricket" },
        new IconData { Name = "Football",    IconCss = "e-football" }
    };
}

<ejs-autocomplete id="sports"
    dataSource="@items"
    placeholder="Select a sport"
    popupHeight="200px">
    <e-autocomplete-fields value="Name" iconCss="IconCss"></e-autocomplete-fields>
</ejs-autocomplete>
```

**CSS for icons:**
```css
.e-badminton::before  { content: "\e805"; font-family: 'e-sport'; }
.e-basketball::before { content: "\e806"; font-family: 'e-sport'; }
.e-cricket::before    { content: "\e807"; font-family: 'e-sport'; }
.e-football::before   { content: "\e808"; font-family: 'e-sport'; }
```

> The icon `<span>` is created automatically by the component using the mapped CSS class.

---

## Filter by Both Text and Value Fields

Use the `filtering` event with a `DataManager` predicate to filter by both the text and value fields simultaneously.

```cshtml
@{
    List<FilterData> filterItems = new List<FilterData> {
        new FilterData { Text = "Australia", Id = "AU" },
        new FilterData { Text = "Canada",    Id = "CA" },
        new FilterData { Text = "India",     Id = "IN" },
        new FilterData { Text = "Germany",   Id = "DE" }
    };
}

<ejs-autocomplete id="country"
    dataSource="@filterItems"
    placeholder="Search by name or code"
    filtering="onFiltering">
    <e-autocomplete-fields value="Text"></e-autocomplete-fields>
</ejs-autocomplete>

<script>
    function onFiltering(args) {
        var query = new ej.data.Query();
        // Build a predicate that matches text OR id
        var predicate = new ej.data.Predicate('Text', 'contains', args.text, true)
            .or('Id', 'contains', args.text, true);
        query = query.where(predicate);
        args.updateData(this.dataSource, query);
    }
</script>
```

**Model:**
```csharp
public class FilterData {
    public string Text { get; set; }
    public string Id { get; set; }
}
```

> Use `args.updateData(dataSource, query)` in the `filtering` event to apply the custom query. This replaces the default filtering behavior.

---

## AutoCompleteFor with Model Binding

Use `ejs-for` (the `For` property) to bind the AutoComplete to a model property in Razor Pages or MVC. The selected value is posted back with the form.

**Model:**
```csharp
public class AutoCompleteModel {
    [Required]
    public string Value { get; set; }
}
```

**Controller/PageModel:**
```csharp
public IActionResult OnPost(AutoCompleteModel model)
{
    // model.Value contains the selected AutoComplete value
    return Page();
}
```

**View:**
```cshtml
@model AutoCompleteModel

@{
    var sports = new string[] { "Badminton", "Basketball", "Cricket", "Football", "Golf" };
}

<form method="post">
    <ejs-autocomplete id="sports"
        dataSource="sports"
        placeholder="Select a sport"
        ej-for="@Model.Value">
    </ejs-autocomplete>
    <button type="submit">Submit</button>
</form>
```

---

## Data Annotations with AutoCompleteFor

Combine `ej-for` with Data Annotations for model validation:

**Model with validation:**
```csharp
public class AutoCompleteModel {
    [Required(ErrorMessage = "Please select a sport")]
    [Display(Name = "Sport")]
    public string Value { get; set; }
}
```

**View:**
```cshtml
@model AutoCompleteModel

@{
    var sports = new string[] { "Badminton", "Basketball", "Cricket", "Football", "Golf" };
}

<form method="post">
    <ejs-autocomplete id="sport"
        dataSource="sports"
        placeholder="Select a sport"
        ej-for="@Model.Value">
    </ejs-autocomplete>
    <span asp-validation-for="Value" class="text-danger"></span>
    <button type="submit">Submit</button>
</form>
```

> Use `value` property to get or set the selected item in the component. Data Annotations attributes like `[Required]`, `[StringLength]`, etc., are respected automatically during model validation.
