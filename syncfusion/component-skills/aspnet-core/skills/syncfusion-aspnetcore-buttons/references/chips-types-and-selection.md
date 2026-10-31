# Chip Types and Selection

## Table of Contents
- [Chip Types Overview](#chip-types-overview)
- [Input Chip](#input-chip)
- [Choice Chip (Single Selection)](#choice-chip-single-selection)
- [Filter Chip (Multiple Selection)](#filter-chip-multiple-selection)
- [Action Chip](#action-chip)
- [Deletable Chip](#deletable-chip)
- [Pre-selecting Chips](#pre-selecting-chips)
- [Handling Click Events](#handling-click-events)
- [Handling Delete Events](#handling-delete-events)
- [Disabled Chips](#disabled-chips)

---

## Chip Types Overview

The `selection` property on `<ejs-chiplist>` controls the chip type behavior:

| Type | `selection` value | Purpose |
|------|-------------------|---------|
| Input Chip | `"None"` (default) + `enableDelete="true"` | User-generated tags that can be removed |
| Choice Chip | `"Single"` | Select one option (radio-like) |
| Filter Chip | `"Multiple"` | Select multiple options (checkbox-like) |
| Action Chip | `"None"` (default) | Triggers an action on click |

---

## Input Chip

Input chips represent user-provided values (e.g., email tags, search filters). They are typically deletable.

```razor
<ejs-chiplist id="input-chip" enableDelete="true" selection="Single">
    <e-chips>
        <e-chip text="Andrew"></e-chip>
        <e-chip text="Janet"></e-chip>
        <e-chip text="Laura"></e-chip>
        <e-chip text="Margaret"></e-chip>
    </e-chips>
</ejs-chiplist>
```

C# Controller:
```csharp
public IActionResult InputChip()
{
    return View();
}
```

- `enableDelete="true"` — shows the delete (×) icon on each chip.
- `selection="Single"` — only one chip is selected at a time in this input scenario.

---

## Choice Chip (Single Selection)

Choice chips allow selecting exactly one option from a group — similar to radio buttons.

```razor
<ejs-chiplist id="choice-chip" selection="Single">
    <e-chips>
        <e-chip text="Small"></e-chip>
        <e-chip text="Medium"></e-chip>
        <e-chip text="Large"></e-chip>
        <e-chip text="Extra Large"></e-chip>
    </e-chips>
</ejs-chiplist>
```

C# Controller:
```csharp
public IActionResult ChoiceChip()
{
    return View();
}
```

- Set `selection="Single"` to enable single-choice behavior.
- Clicking a chip selects it and deselects the previously selected chip.
- Common use cases: view toggle, size selector, sort preference.

---

## Filter Chip (Multiple Selection)

Filter chips allow selecting multiple options simultaneously — similar to checkboxes.

```razor
<ejs-chiplist id="filter-chip" selection="Multiple">
    <e-chips>
        <e-chip text="Chai"></e-chip>
        <e-chip text="Chung"></e-chip>
        <e-chip text="Aniseed Syrup"></e-chip>
        <e-chip text="Ikura"></e-chip>
    </e-chips>
</ejs-chiplist>
```

C# Controller:
```csharp
public IActionResult FilterChip()
{
    return View();
}
```

- Set `selection="Multiple"` to allow multi-selection.
- Selected chips receive the `e-active` CSS class.
- Common use cases: category filters, skill selection, preference toggles.

**Dynamic filter chips from C# Model:**
```razor
@model List<string>

<ejs-chiplist id="dynamic-filter" selection="Multiple">
    <e-chips>
        @foreach (var filter in Model)
        {
            <e-chip text="@filter"></e-chip>
        }
    </e-chips>
</ejs-chiplist>
```

```csharp
public IActionResult FilterChip()
{
    var filters = new List<string> { "React", "Angular", "Vue", "Svelte" };
    return View(filters);
}
```

---

## Action Chip

Action chips trigger operations when clicked. They do not have selection state — they simply fire the `click` event.

```razor
<ejs-chiplist id="action-chip" clicked="@OnChipClick">
    <e-chips>
        <e-chip text="Send a text"></e-chip>
        <e-chip text="Set a reminder"></e-chip>
        <e-chip text="Read my emails"></e-chip>
        <e-chip text="Set alarm"></e-chip>
    </e-chips>
</ejs-chiplist>

<div id="output" class="mt-3"></div>

<script>
    function onChipClick(args) {
        alert('You clicked: ' + args.text);
        document.getElementById('output').innerHTML = 'You clicked: ' + args.text;
    }
</script>
```

C# Controller (optional for server-side handling):
```csharp
[HttpPost]
public IActionResult HandleChipClick(string chipText)
{
    // Server-side action handling
    Console.WriteLine($"Chip clicked: {chipText}");
    return Json(new { success = true });
}
```

- No `selection` prop needed; defaults to `"None"`.
- Use `clicked` to respond to interactions.
- Common use cases: shortcut buttons, suggested actions, command chips.

---

## Deletable Chip

Show a delete icon on each chip to allow users to remove them from the list.

```razor
<ejs-chiplist id="deletable-chip" enableDelete="true">
    <e-chips>
        <e-chip text="Send a text"></e-chip>
        <e-chip text="Set a reminder"></e-chip>
        <e-chip text="Read my emails"></e-chip>
        <e-chip text="Set alarm"></e-chip>
    </e-chips>
</ejs-chiplist>
```

C# Controller:
```csharp
public IActionResult DeletableChip()
{
    return View();
}
```

- `enableDelete="true"` — displays the delete icon on every chip.
- Triggers the `onDelete` event when a chip is removed.

---

## Pre-selecting Chips

Use `selectedChips` to pre-select specific chips at initialization:

```razor
<ejs-chiplist id="preselected-chips" selection="Multiple" 
               selected-chips="@(new List<int> { 0, 2 })">
    <e-chips>
        <e-chip text="React"></e-chip>
        <e-chip text="Angular"></e-chip>
        <e-chip text="Vue"></e-chip>
        <e-chip text="Svelte"></e-chip>
    </e-chips>
</ejs-chiplist>
```

C# Controller (dynamic pre-selection):
```csharp
public IActionResult PreSelected()
{
    var chips = new List<ChipModel>
    {
        new ChipModel { Text = "React" },
        new ChipModel { Text = "Angular" },
        new ChipModel { Text = "Vue" }
    };
    
    ViewBag.SelectedIndices = new List<int> { 0, 2 };
    return View(chips);
}
```

---

## Handling Click Events

Handle chip clicks using the `clicked` event:

```razor
<ejs-chiplist id="clickable-chips" clicked="@OnChipClicked">
    <e-chips>
        <e-chip text="Save"></e-chip>
        <e-chip text="Cancel"></e-chip>
        <e-chip text="Delete"></e-chip>
    </e-chips>
</ejs-chiplist>

<div id="result" class="mt-3 alert alert-info"></div>

<script>
    function onChipClicked(args) {
        console.log('Clicked chip:', args.text);
        console.log('Index:', args.index);
        document.getElementById('result').innerHTML = 
            'You clicked: <strong>' + args.text + '</strong> at index ' + args.index;
    }
</script>
```

---

## Handling Delete Events

Handle chip deletion using the `onDelete` event:

```razor
<ejs-chiplist id="deletable-chips" enableDelete="true" onDelete="@OnChipDeleted">
    <e-chips>
        <e-chip text="Item 1"></e-chip>
        <e-chip text="Item 2"></e-chip>
        <e-chip text="Item 3"></e-chip>
    </e-chips>
</ejs-chiplist>

<div id="delete-log" class="mt-3"></div>

<script>
    function onChipDeleted(args) {
        console.log('Deleted chip:', args.text);
        document.getElementById('delete-log').innerHTML = 
            'Deleted: ' + args.text;
    }
</script>
```

**Server-side delete handling with AJAX:**
```razor
<ejs-chiplist id="ajax-deletable" enableDelete="true">
    <e-chips>
        @foreach (var item in Model)
        {
            <e-chip text="@item.Name" data-id="@item.Id"></e-chip>
        }
    </e-chips>
</ejs-chiplist>

<script>
    document.getElementById('ajax-deletable').addEventListener('onDelete', function(args) {
        const chipId = args.event.target.dataset.id;
        
        fetch('/api/chips/' + chipId, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => console.log('Deleted from server:', data))
        .catch(error => console.error('Error:', error));
    });
</script>
```

```csharp
[ApiController]
[Route("api/[controller]")]
public class ChipsApiController : ControllerBase
{
    [HttpDelete("{id}")]
    public IActionResult DeleteChip(int id)
    {
        // Delete from database
        return Ok(new { success = true, id = id });
    }
}
```

---

## Disabled Chips

Disable individual chips or the entire chip list:

```razor
<!-- Disable entire chip list -->
<ejs-chiplist id="disabled-chips" enabled="false">
    <e-chips>
        <e-chip text="Disabled"></e-chip>
    </e-chips>
</ejs-chiplist>

<!-- Disable individual chips -->
<ejs-chiplist id="partial-disabled">
    <e-chips>
        <e-chip text="Enabled" enabled="true"></e-chip>
        <e-chip text="Disabled" enabled="false"></e-chip>
    </e-chips>
</ejs-chiplist>
```

C# Model with conditional enabling:
```csharp
public class ChipItem
{
    public string Text { get; set; }
    public bool IsEnabled { get; set; } = true;
}
```

```razor
@model List<ChipItem>

<ejs-chiplist id="conditional-chips">
    <e-chips>
        @foreach (var item in Model)
        {
            <e-chip text="@item.Text" enabled="@item.IsEnabled"></e-chip>
        }
    </e-chips>
</ejs-chiplist>
```

---

## Complete Selection Example

Here's a complete example combining multiple chip types:

```razor
@{
    ViewData["Title"] = "Chip Types Demo";
}

<div class="container mt-4">
    <h2>Chip Types Demonstration</h2>
    
    <!-- Action Chips -->
    <div class="mb-4">
        <h4>Action Chips</h4>
        <ejs-chiplist id="action-chips" clicked="@OnActionClick">
            <e-chips>
                <e-chip text="Save"></e-chip>
                <e-chip text="Share"></e-chip>
                <e-chip text="Export"></e-chip>
            </e-chips>
        </ejs-chiplist>
    </div>
    
    <!-- Choice Chips -->
    <div class="mb-4">
        <h4>Choice Chips (Single Selection)</h4>
        <ejs-chiplist id="choice-chips" selection="Single">
            <e-chips>
                <e-chip text="Small"></e-chip>
                <e-chip text="Medium"></e-chip>
                <e-chip text="Large"></e-chip>
            </e-chips>
        </ejs-chiplist>
    </div>
    
    <!-- Filter Chips -->
    <div class="mb-4">
        <h4>Filter Chips (Multiple Selection)</h4>
        <ejs-chiplist id="filter-chips" selection="Multiple">
            <e-chips>
                <e-chip text="React"></e-chip>
                <e-chip text="Angular"></e-chip>
                <e-chip text="Vue"></e-chip>
                <e-chip text="Svelte"></e-chip>
            </e-chips>
        </ejs-chiplist>
    </div>
    
    <!-- Deletable Chips -->
    <div class="mb-4">
        <h4>Deletable Chips</h4>
        <ejs-chiplist id="deletable-chips" enableDelete="true">
            <e-chips>
                <e-chip text="Tag 1"></e-chip>
                <e-chip text="Tag 2"></e-chip>
                <e-chip text="Tag 3"></e-chip>
            </e-chips>
        </ejs-chiplist>
    </div>
</div>

<script>
    function onActionClick(args) {
        alert('Action: ' + args.text);
    }
</script>
```

---

## Summary

Understanding chip types and selection modes helps you choose the right component configuration for your use case. Use the `selection` property to control behavior and `enableDelete` to allow user removal of chips.
