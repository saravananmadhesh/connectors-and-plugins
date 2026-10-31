# ChipList Component API Reference

> **Source:** [https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.buttons.chiplist.html#properties](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.buttons.chiplist.html#properties)  
> **Namespace:** `Syncfusion.EJ2.Buttons`  
> **Assembly:** `Syncfusion.AspNetCore.Buttons.dll`  
> **Tag Helper:** `<ejs-chiplist>`

## Table of Contents
- [Properties](#properties)
- [Events](#events)

---

## Properties

| Property | Tag Helper Attr | Type | Default | Description |
|----------|-----------------|------|---------|-------------|
| `AllowDragAndDrop` | `allowDragAndDrop` | `bool` | `false` | Specifies whether the chip item can be dragged and reordered. Enables drag-and-drop within a single container or across multiple containers |
| `AvatarIconCss` | `avatarIconCss` | `string` | `""` | Specifies the icon CSS class for the avatar in the chip |
| `AvatarText` | `avatarText` | `string` | `""` | Specifies the customized text value for the avatar in the chip |
| `BeforeClick` | `beforeClick` | `string` (JS function) | `null` | Triggers before the click event of the chip is fired. Can be used to prevent the further process and restrict the click action over a chip |
| `Chips` | `chips` | `object` | `null` | This chips property helps to render ChipList component |
| `Click` | `click` | `string` (JS function) | `null` | Triggers when a chip is clicked |
| `Created` | `created` | `string` (JS function) | `null` | Triggers when the component is created successfully |
| `CssClass` | `cssClass` | `string` | `""` | Specifies the custom classes to be added to the chip element to customize the ChipList component |
| `Delete` | `delete` | `string` (JS function) | `null` | Fires before removing the chip element |
| `Deleted` | `deleted` | `string` (JS function) | `null` | Triggers when the chip item is removed |
| `DragArea` | `dragArea` | `string` | `null` | Specifies the target in which the draggable element can be moved and dropped. By default, draggable element movement occurs in the page |
| `Dragging` | `dragging` | `string` (JS function) | `null` | Fires while a chip item is being dragged |
| `DragStart` | `dragStart` | `string` (JS function) | `null` | Fires when a chip item starts moving due to a drag action |
| `DragStop` | `dragStop` | `string` (JS function) | `null` | Fires when a chip item is reordered after completing a drag action |
| `Enabled` | `enabled` | `bool` | `true` | Specifies a value that indicates whether the chip component is enabled or not |
| `EnableDelete` | `enableDelete` | `bool` | `false` | Enables or disables the delete functionality of a chip |
| `EnablePersistence` | `enablePersistence` | `bool` | `false` | Enable or disable persisting component's state between page reloads |
| `EnableRtl` | `enableRtl` | `bool` | `false` | Enable or disable rendering component in right to left direction |
| `HtmlAttributes` | `htmlAttributes` | `object` | `null` | Allows additional HTML attributes such as aria labels, title, name, etc. in key-value pair format |
| `LeadingIconCss` | `leadingIconCss` | `string` | `""` | Specifies the leading icon CSS class for the chip |
| `LeadingIconUrl` | `leadingIconUrl` | `string` | `""` | Specifies the leading icon url for the chip |
| `Locale` | `locale` | `string` | `""` | Overrides the global culture and localization value. Default global culture is `'en-US'` |
| `SelectedChips` | `selectedChips` | `object` | `null` | Sets or gets the selected chip items in the chip list |
| `Selection` | `selection` | `Selection` | `Selection.None` | Defines the selection type of the chip. Available types: `Input chip`, `Choice chip`, `Filter chip`, `Action chip` |
| `Text` | `text` | `string` | `""` | Specifies the text content for the chip |
| `TrailingIconCss` | `trailingIconCss` | `string` | `""` | Specifies the trailing icon CSS class for the chip |
| `TrailingIconUrl` | `trailingIconUrl` | `string` | `""` | Specifies the trailing icon url for the chip |

---

## Events

> The official `Syncfusion.EJ2.Buttons.ChipList` page documents events as tag-helper string properties (e.g. `Click`, `BeforeClick`, `Created`, `Delete`, `Deleted`, `Dragging`, `DragStart`, `DragStop`). Use the property name as a tag helper attribute with a JavaScript function name as the value.

### `BeforeClick`
Triggers before the click event of the chip is fired. Can be used to prevent the further process and restrict the click action over a chip.

```razor
<ejs-chiplist id="event-chips" beforeClick="onBeforeClick">
    <e-chips>
        <e-chip text="Send"></e-chip>
    </e-chips>
</ejs-chiplist>

<script>
    function onBeforeClick(args) {
        console.log('Before click: ' + args.text);
        // args.cancel = true; // To prevent the click
    }
</script>
```

### `Click`
Triggers when a chip is clicked.

```razor
<ejs-chiplist id="click-chips" click="onChipClicked">
    <e-chips>
        <e-chip text="Send"></e-chip>
        <e-chip text="Delete"></e-chip>
    </e-chips>
</ejs-chiplist>

<script>
    function onChipClicked(args) {
        console.log('Clicked: ' + args.text);
    }
</script>
```

### `Created`
Triggers when the component is created successfully.

```razor
<ejs-chiplist id="event-chips" created="onChipsCreated">
    <e-chips>
        <e-chip text="React"></e-chip>
    </e-chips>
</ejs-chiplist>

<script>
    function onChipsCreated() {
        console.log('Chips component created!');
    }
</script>
```

### `Delete`
Fires before removing the chip element.

```razor
<ejs-chiplist id="delete-chips" enableDelete="true" delete="onChipDelete">
    <e-chips>
        <e-chip text="Item 1"></e-chip>
    </e-chips>
</ejs-chiplist>

<script>
    function onChipDelete(args) {
        console.log('Deleting chip: ' + args.text);
    }
</script>
```

### `Deleted`
Triggers when the chip item is removed.

```razor
<ejs-chiplist id="deleted-chips" enableDelete="true" deleted="onChipDeleted">
    <e-chips>
        <e-chip text="Item 1"></e-chip>
    </e-chips>
</ejs-chiplist>

<script>
    function onChipDeleted(args) {
        console.log('Deleted chip: ' + args.text);
    }
</script>
```

### `Dragging`
Fires while a chip item is being dragged.

### `DragStart`
Fires when a chip item starts moving due to a drag action.

### `DragStop`
Fires when a chip item is reordered after completing a drag action.

```razor
<ejs-chiplist id="drag-chips" allowDragAndDrop="true"
              dragStart="onDragStart" dragging="onDragging" dragStop="onDragStop">
    <e-chips>
        <e-chip text="Item 1"></e-chip>
    </e-chips>
</ejs-chiplist>

<script>
    function onDragStart(args)  { console.log('Started dragging: ' + args.text); }
    function onDragging(args)   { console.log('Dragging: ' + args.text); }
    function onDragStop(args)   { console.log('Stopped dragging: ' + args.text); }
</script>
```
