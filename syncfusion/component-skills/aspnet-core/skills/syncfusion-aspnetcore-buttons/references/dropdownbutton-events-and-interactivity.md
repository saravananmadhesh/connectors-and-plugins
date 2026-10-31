# Events and Interactivity – ASP.NET Core DropDownButton

## Click Event

Handle item selection:

```cshtml
@{
    List<object> items = new List<object>();
    items.Add(new { text = "Cut" });
    items.Add(new { text = "Copy" });
}

<ejs-dropdownbutton id="ddb" content="Edit" items="items"></ejs-dropdownbutton>

<div id="result"></div>

<script>
    document.getElementById('ddb').addEventListener('click', function(e) {
        if (e.item) {
            document.getElementById('result').innerHTML = 'Selected: ' + e.item.text;
        }
    });
</script>
```

## Open/Close Events

```cshtml
<ejs-dropdownbutton id="ddb" content="Menu" items="items"></ejs-dropdownbutton>

<script>
    const ddb = ej2_instances['ddb'][0];
    
    ddb.beforeOpen = function() {
        console.log('Menu opening');
    };
    
    ddb.beforeClose = function() {
        console.log('Menu closing');
    };
</script>
```

---

## See Also

- [DropDownButton Getting Started](dropdownbutton-getting-started.md)
- [DropDownButton Popup Items](dropdownbutton-popup-items.md)
- [DropDownButton API](dropdownbutton-api.md)
