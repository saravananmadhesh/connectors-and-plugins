# Features and State – ASP.NET Core RadioButton

## Disabled State

```cshtml
<ejs-radiobutton id="disabled" name="group1" label="Disabled" disabled="true"></ejs-radiobutton>
<ejs-radiobutton id="disabledSelected" name="group2" label="Disabled & Selected" disabled="true" checked="true"></ejs-radiobutton>
```

## Form Integration

```cshtml
<form method="post">
    <fieldset>
        <legend>Choose Option</legend>
        <ul>
            <li><ejs-radiobutton id="opt1" name="choice" value="a" label="Option A"></ejs-radiobutton></li>
            <li><ejs-radiobutton id="opt2" name="choice" value="b" label="Option B"></ejs-radiobutton></li>
            <li><ejs-radiobutton id="opt3" name="choice" value="c" label="Option C"></ejs-radiobutton></li>
        </ul>
    </fieldset>
    <button type="submit" class="e-btn e-primary">Submit</button>
</form>
```

**Handler:**
```csharp
public async Task<IActionResult> OnPostAsync()
{
    string choice = Request.Form["choice"];
    // Process selection
    return Page();
}
```

## Change Event

```cshtml
<ejs-radiobutton id="radio1" name="group1" label="Check me"></ejs-radiobutton>

<script>
    document.getElementById('radio1').addEventListener('change', function(e) {
        console.log('Selected:', e.target.checked);
    });
</script>
```

---

## See Also

- [RadioButton Getting Started](radiobutton-getting-started.md)
- [RadioButton Label and Size](radiobutton-label-and-size.md)
- [RadioButton API](radiobutton-api.md)
