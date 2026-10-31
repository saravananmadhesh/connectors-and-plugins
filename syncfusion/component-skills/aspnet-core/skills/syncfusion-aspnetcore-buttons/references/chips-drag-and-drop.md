# Chip Drag and Drop

## Table of Contents
- [Overview](#overview)
- [Enabling Drag and Drop](#enabling-drag-and-drop)
- [Restricting the Drag Area](#restricting-the-drag-area)
- [Cross-Container Drag and Drop](#cross-container-drag-and-drop)
- [Drag and Drop Events](#drag-and-drop-events)
- [Preventing Drag or Drop](#preventing-drag-or-drop)
- [Customizing the Drag Clone](#customizing-the-drag-clone)

---

## Overview

The Chips component supports drag-and-drop reordering. Users can pick up a chip and drop it at a new position within the same `ChipList` or move it across multiple `ChipList` containers.

A visual indicator line appears between chips during dragging to show the insertion point.

---

## Enabling Drag and Drop

Set `AllowDragAndDrop="true"` on `ChipList`:

```razor
<ejs-chiplist id="draggable-chips" allowDragAndDrop="true">
    <e-chips>
        <e-chip text="Report" cssClass="e-info"></e-chip>
        <e-chip text="Meeting" cssClass="e-warning"></e-chip>
        <e-chip text="Review" cssClass="e-warning"></e-chip>
        <e-chip text="Budget" cssClass="e-danger"></e-chip>
        <e-chip text="Design" cssClass="e-primary"></e-chip>
    </e-chips>
</ejs-chiplist>
```

C# Controller:
```csharp
public IActionResult DraggableChips()
{
    var chips = new List<ChipModel>
    {
        new ChipModel { Text = "Report", CssClass = "e-info" },
        new ChipModel { Text = "Meeting", CssClass = "e-warning" },
        new ChipModel { Text = "Review", CssClass = "e-warning" },
        new ChipModel { Text = "Budget", CssClass = "e-danger" },
        new ChipModel { Text = "Design", CssClass = "e-primary" }
    };
    
    return View(chips);
}
```

- `AllowDragAndDrop="true"` — enables drag-and-drop reordering within the chip list.
- Default is `false`.

CSS for visual feedback:
```css
.e-chip-list.e-draggable-chip {
    user-select: none;
}

.e-chip-list .e-chip.e-dragging {
    opacity: 0.6;
    transform: scale(1.05);
}

.e-chip-list .e-chip-insert-indicator {
    height: 2px;
    background-color: #007bff;
    margin: 4px 0;
}
```

---

## Restricting the Drag Area

Use `DragArea` to confine dragging within a specific container. Accepts a CSS selector string or an HTML element ID.

```razor
<div id="drag-boundary" style="border: 2px dashed #ccc; padding: 16px; border-radius: 8px;">
    <h4>Drag chips within this boundary</h4>
    
    <ejs-chiplist id="bounded-chips" allowDragAndDrop="true" dragArea="#drag-boundary">
        <e-chips>
            <e-chip text="Task A"></e-chip>
            <e-chip text="Task B"></e-chip>
            <e-chip text="Task C"></e-chip>
        </e-chips>
    </ejs-chiplist>
</div>
```

C# Controller:
```csharp
public IActionResult BoundedDragChips()
{
    return View();
}
```

- `DragArea` — accepts an element ID (`"#drag-boundary"`), a CSS class (`.my-container"`), or an HTML element reference.
- By default, `DragArea` is `null` (no boundary restriction — chips can be dragged anywhere on the page).
- Useful for preventing accidental drops outside intended drop zones.

CSS:
```css
#drag-boundary {
    background-color: #f5f5f5;
    border-radius: 8px;
    transition: background-color 0.3s;
}

#drag-boundary.drag-active {
    background-color: #e3f2fd;
}
```

---

## Cross-Container Drag and Drop

Enable drag and drop across multiple `ChipList` instances by enabling `AllowDragAndDrop` on all participating containers:

```razor
<div class="chip-workspace" style="display: flex; gap: 24px;">
    <!-- Source list (To-Do) -->
    <div>
        <h4>📋 To-Do</h4>
        <ejs-chiplist id="todo-list" allowDragAndDrop="true">
            <e-chips>
                <e-chip text="Report" cssClass="e-info"></e-chip>
                <e-chip text="Meeting" cssClass="e-warning"></e-chip>
                <e-chip text="Review" cssClass="e-warning"></e-chip>
                <e-chip text="Budget" cssClass="e-danger"></e-chip>
                <e-chip text="Design" cssClass="e-primary"></e-chip>
                <e-chip text="Presentation" cssClass="e-success"></e-chip>
            </e-chips>
        </ejs-chiplist>
    </div>

    <!-- Target list (Done) — empty, accepts drops -->
    <div>
        <h4>✅ Done</h4>
        <ejs-chiplist id="done-list" allowDragAndDrop="true" style="min-height: 200px; border: 2px dashed #ccc; padding: 12px; border-radius: 8px;">
        </ejs-chiplist>
    </div>
</div>
```

C# Controller:
```csharp
public IActionResult CrossContainerDrag()
{
    var todoChips = new List<ChipModel>
    {
        new ChipModel { Text = "Report", CssClass = "e-info" },
        new ChipModel { Text = "Meeting", CssClass = "e-warning" },
        new ChipModel { Text = "Review", CssClass = "e-warning" },
        new ChipModel { Text = "Budget", CssClass = "e-danger" },
        new ChipModel { Text = "Design", CssClass = "e-primary" },
        new ChipModel { Text = "Presentation", CssClass = "e-success" }
    };
    
    ViewBag.TodoChips = todoChips;
    return View();
}
```

- Both containers must have `AllowDragAndDrop="true"`.
- Chips dragged from one list drop into the other seamlessly.
- The empty `ChipList` acts as a drop target.

JavaScript for advanced cross-container behavior (optional):
```javascript
document.addEventListener('DOMContentLoaded', function () {
    const todoList = document.getElementById('todo-list');
    const doneList = document.getElementById('done-list');
    
    todoList.addEventListener('dragend', function (e) {
        console.log('Chip dragged from To-Do:', e.target.textContent);
    });
    
    doneList.addEventListener('dragover', function (e) {
        e.preventDefault();
        this.style.backgroundColor = '#e3f2fd';
    });
    
    doneList.addEventListener('dragleave', function (e) {
        this.style.backgroundColor = '';
    });
});
```

---

## Drag and Drop Events

Three events fire during the drag lifecycle:

### `OnDragStart`
Fires when a chip drag operation begins.

```razor
<ejs-chiplist id="event-chips" allowDragAndDrop="true" onDragStart="onDragStartHandler">
    <e-chips>
        <e-chip text="Task 1"></e-chip>
        <e-chip text="Task 2"></e-chip>
    </e-chips>
</ejs-chiplist>

<script>
    function onDragStartHandler(args) {
        console.log('Started dragging: ' + args.text + ' from index ' + args.oldIndex);
    }
</script>
```

---

### `OnDragEnd`
Fires when a chip drag operation completes.

```razor
<ejs-chiplist id="drag-end-chips" allowDragAndDrop="true" onDragEnd="onDragEndHandler">
    <e-chips>
        <e-chip text="Item 1"></e-chip>
        <e-chip text="Item 2"></e-chip>
    </e-chips>
</ejs-chiplist>

<script>
    function onDragEndHandler(args) {
        console.log('Finished dragging: ' + args.text);
        console.log('Moved from index ' + args.oldIndex + ' to ' + args.newIndex);
    }
</script>
```

---

### `OnDrop`
Fires when a chip is successfully dropped.

```razor
<ejs-chiplist id="drop-chips" allowDragAndDrop="true" onDrop="onDropHandler">
    <e-chips>
        <e-chip text="Item A"></e-chip>
        <e-chip text="Item B"></e-chip>
    </e-chips>
</ejs-chiplist>

<script>
    function onDropHandler(args) {
        console.log('Dropped: ' + args.text);
        // Update database or perform other actions via AJAX
    }
</script>
```

---

## Preventing Drag or Drop

Cancel drag operations based on custom logic:

```razor
<ejs-chiplist id="conditional-drag-chips" allowDragAndDrop="true" onDragStart="onPreventDragIfInvalid">
    <e-chips>
        <e-chip text="Report" data-draggable="true"></e-chip>
        <e-chip text="Archived" data-draggable="false"></e-chip>
    </e-chips>
</ejs-chiplist>

<script>
    function onPreventDragIfInvalid(args) {
        // Check if chip has data-draggable="false" attribute
        // If so, cancel the drag by setting args.cancel = true
        console.log('Attempting to drag: ' + args.text);
    }
</script>
```

Client-side prevention with JavaScript:
```javascript
document.getElementById('conditional-drag-chips').addEventListener('dragstart', function (e) {
    const isDraggable = e.target.dataset.draggable !== 'false';
    if (!isDraggable) {
        e.preventDefault();
        console.log('Drag prevented for this chip');
    }
});
```

---

## Customizing the Drag Clone

Customize the visual appearance of the dragged chip clone:

```css
/* Style the ghost/clone element during drag */
.e-chip-list .e-chip.e-dragging {
    opacity: 0.7;
    transform: scale(1.08);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: transform 0.2s ease-out;
}

/* Style the drop indicator */
.e-chip-list .e-drop-indicator {
    height: 3px;
    background: linear-gradient(to right, #007bff, transparent);
    border-radius: 2px;
    margin: 6px 0;
}

/* Highlight valid drop zones */
.e-chip-list.e-drop-target {
    border: 2px solid #28a745;
    background-color: rgba(40, 167, 69, 0.05);
    border-radius: 8px;
}
```

JavaScript for advanced customization:
```javascript
document.addEventListener('DOMContentLoaded', function () {
    const chipList = document.getElementById('draggable-chips');
    
    chipList.addEventListener('dragstart', function (e) {
        const dragClone = e.target.cloneNode(true);
        dragClone.classList.add('e-chip-drag-clone');
        e.dataTransfer.setDragImage(dragClone, 0, 0);
    });
});
```

---

## Complete Drag-and-Drop Example

Here's a complete implementation with persistence:

**View (`ChipsManagement.cshtml`):**
```razor
@model ChipsViewModel

<div class="container">
    <div class="row">
        <div class="col-md-6">
            <h4>Pending Tasks</h4>
            <ejs-chiplist id="pending-tasks" allowDragAndDrop="true" onDragEnd="onTaskMoved">
                @if (Model.PendingChips != null)
                {
                    <e-chips>
                        @foreach (var chip in Model.PendingChips)
                        {
                            <e-chip text="@chip.Text" cssClass="@chip.CssClass"></e-chip>
                        }
                    </e-chips>
                }
            </ejs-chiplist>
        </div>

        <div class="col-md-6">
            <h4>Completed Tasks</h4>
            <ejs-chiplist id="completed-tasks" allowDragAndDrop="true" onDragEnd="onTaskMoved">
                @if (Model.CompletedChips != null)
                {
                    <e-chips>
                        @foreach (var chip in Model.CompletedChips)
                        {
                            <e-chip text="@chip.Text" cssClass="@chip.CssClass"></e-chip>
                        }
                    </e-chips>
                }
            </ejs-chiplist>
        </div>
    </div>
</div>

<script>
    function onTaskMoved(args) {
        // Persist changes to server via AJAX
        fetch('/api/chips/move', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: args.text, fromIndex: args.oldIndex, toIndex: args.newIndex })
        })
        .then(response => response.json())
        .then(data => console.log('Server response:', data))
        .catch(error => console.error('Error:', error));
    }
</script>
```

**C# Controller:**
```csharp
public class ChipsController : Controller
{
    public IActionResult ChipsManagement()
    {
        var viewModel = new ChipsViewModel
        {
            PendingChips = new List<ChipModel>
            {
                new ChipModel { Text = "Design Review", CssClass = "e-warning" },
                new ChipModel { Text = "Code Refactor", CssClass = "e-info" }
            },
            CompletedChips = new List<ChipModel>
            {
                new ChipModel { Text = "Bug Fix", CssClass = "e-success" }
            }
        };
        return View(viewModel);
    }
}
```
        // await TaskService.UpdateTaskStatus(args.Text, args.NewIndex);
    }
}
```

---

## Summary

Drag-and-drop functionality enhances user experience by allowing intuitive reordering and organization of chips. Use the properties, events, and customization options to create fluid, responsive interactions tailored to your application's needs.
