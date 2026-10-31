# Popup Resizing – Syncfusion ASP.NET Core AutoComplete

## Overview

The AutoComplete supports resizable popup via the `allowResize` property. When enabled, a resize handle appears in the bottom-right corner of the popup, allowing users to adjust the width and height. The resized dimensions are retained across sessions.

**Default:** `allowResize` is `false`

---

## Enable Popup Resizing

```cshtml
@{
    List<PopupResizeData> data = new List<PopupResizeData> {
        new PopupResizeData { Status = "Open",        State = false },
        new PopupResizeData { Status = "Waiting",     State = false },
        new PopupResizeData { Status = "In Progress", State = true  },
        new PopupResizeData { Status = "Completed",   State = false }
    };
}

<ejs-autocomplete id="status"
    dataSource="@data"
    placeholder="Select a status"
    allowResize="true">
    <e-autocomplete-fields value="Status" disabled="State"></e-autocomplete-fields>
</ejs-autocomplete>
```

**Model:**
```csharp
public class PopupResizeData {
    public string Status { get; set; }
    public bool State { get; set; }
}
```

---

## Resize Events

Three events fire during popup resize interactions:

| Event | Description |
|---|---|
| `resizeStart` | Fires when the user starts resizing the popup |
| `resizing` | Fires continuously while the popup is being resized (live width/height updates) |
| `resizeStop` | Fires when the user finishes resizing |

```cshtml
<ejs-autocomplete id="status"
    dataSource="@data"
    placeholder="Select a status"
    allowResize="true"
    resizeStart="onResizeStart"
    resizing="onResizing"
    resizeStop="onResizeStop">
    <e-autocomplete-fields value="Status"></e-autocomplete-fields>
</ejs-autocomplete>

<script>
    function onResizeStart(args) {
        console.log("Resize started");
    }
    function onResizing(args) {
        console.log("Resizing - Width:", args.width, "Height:", args.height);
    }
    function onResizeStop(args) {
        console.log("Resize stopped");
    }
</script>
```

> Resized dimensions persist across page sessions for a consistent user experience.
