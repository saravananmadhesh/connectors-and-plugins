# Advanced Features

## Overview

Kanban provides advanced features for performance optimization, accessibility compliance, and enhanced user interaction.

**Advanced Features:**
- Virtual scrolling for large datasets
- Accessibility (WCAG 2.2 compliance)
- Keyboard navigation
- Screen reader support
- Touch gesture support

## Virtual Scrolling

Virtual scrolling significantly improves performance when working with large datasets (1000+ cards) by rendering only visible cards in the viewport.

**Benefits:**
- Faster initial rendering
- Reduced memory consumption
- Smoother scrolling experience
- Handles 10,000+ cards efficiently

**Requirements:**
- `EnableVirtualization` must be set to `true`
- `Height` must be explicitly set (not "auto")
- `CardHeight` should be specified for optimal performance

### Basic Virtual Scrolling

**Example:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .EnableVirtualization(true)     // Enable virtual scrolling
    .Height("600px")                 // Required: set explicit height
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary")
            .HeaderField("Id")
            .CardHeight("80px");     // Recommended: set card height
    })
    .Render()
```

### Virtual Scrolling with Remote Data

**Example - Large Dataset from Server:**

```csharp
// Controller
public ActionResult Index()
{
    // Remote data via DataManager
    return View();
}
```

```razor
@(Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource(dataManger => 
    { 
        dataManger.Url("/Kanban/GetLargeDataset")
            .Adaptor("UrlAdaptor"); 
    })
    .EnableVirtualization(true)
    .Height("600px")
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary")
            .HeaderField("Id")
            .CardHeight("80px");
    })
    .Render()
)
```

**Server-Side:**

```csharp
[HttpPost]
public ActionResult GetLargeDataset()
{
    // Return large dataset (e.g., 10,000 records)
    var data = GenerateLargeDataset(10000);
    return Json(data);
}

private List<KanbanDataModel> GenerateLargeDataset(int count)
{
    var data = new List<KanbanDataModel>();
    var statuses = new[] { "Open", "InProgress", "Testing", "Close" };
    var assignees = new[] { "Nancy", "Andrew", "Janet", "Margaret" };
    
    for (int i = 1; i <= count; i++)
    {
        data.Add(new KanbanDataModel
        {
            Id = i,
            Status = statuses[i % 4],
            Summary = $"Task {i}",
            Assignee = assignees[i % 4],
            Priority = i % 10 == 0 ? "High" : "Normal"
        });
    }
    
    return data;
}
```

### Performance Optimization

**Best Practices:**

1. **Set CardHeight**: Prevents layout recalculations
```razor
.CardSettings(card =>
{
    card.ContentField("Summary")
        .HeaderField("Id")
        .CardHeight("80px");  // Fixed height
})
```

2. **Simple Card Templates**: Avoid complex templates
```razor
// Good: Simple template
card.Template("#simpleTemplate")

<script id="simpleTemplate" type="text/x-jsrender">
    <div class='simple-card'>
        <div>${Id} - ${Summary}</div>
    </div>
</script>

// Avoid: Complex template with heavy processing
```

3. **Minimize Events**: Use event delegation
```razor
// Efficient: Single event handler
.CardClick("onCardClick")

<script>
    function onCardClick(args) {
        // Handle for all cards
    }
</script>
```

## Accessibility

Kanban is designed to be accessible to users with disabilities, complying with WCAG 2.2, Section 508, and WAI-ARIA standards.

### WCAG 2.2 Compliance

**Compliance Level:** AA

**Features:**
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast ratios
- Focus indicators
- ARIA attributes

### Keyboard Navigation

Kanban supports comprehensive keyboard navigation for users who cannot use a mouse.

**Keyboard Shortcuts:**

| Key | Action |
|-----|--------|
| **Tab** | Move focus to next focusable element |
| **Shift + Tab** | Move focus to previous focusable element |
| **Enter** | Open dialog for focused card (edit) |
| **Ctrl + Enter** | Add new card to focused column |
| **Delete** | Delete focused/selected card |
| **Escape** | Close dialog |
| **Arrow Up** | Move focus to card above |
| **Arrow Down** | Move focus to card below |
| **Arrow Left** | Move focus to previous column |
| **Arrow Right** | Move focus to next column |
| **Home** | Move focus to first card in column |
| **End** | Move focus to last card in column |
| **Ctrl + Shift + Arrow Keys** | Move card to adjacent column/swimlane |
| **Space** | Select/deselect focused card (multi-select mode) |
| **Ctrl + A** | Select all cards (multi-select mode) |

**Enable Keyboard Navigation:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .AllowKeyboard(true)    // Enable keyboard navigation (default: true)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary")
            .HeaderField("Id")
            .SelectionType(SelectionType.Multiple);  // For multi-select keyboard shortcuts
    })
    .Render()
```

**Disable Keyboard Navigation:**

```razor
.AllowKeyboard(false)  // Disable if implementing custom keyboard logic
```

### ARIA Attributes

Kanban automatically applies appropriate ARIA attributes for screen readers.

**Automatically Applied ARIA Attributes:**
- `role="grid"` - Main Kanban container
- `role="row"` - Card rows
- `role="gridcell"` - Individual cards
- `role="button"` - Action buttons
- `aria-label` - Descriptive labels
- `aria-selected` - Selection state
- `aria-expanded` - Collapse/expand state
- `aria-describedby` - Associated descriptions

**Example - Custom ARIA Labels:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .HtmlAttributes(new { 
        aria_label = "Project Task Management Board",
        aria_describedby = "kanban-description"
    })
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()

<div id="kanban-description" style="display:none;">
    This Kanban board displays project tasks organized by status. Use arrow keys to navigate between cards.
</div>
```

### Screen Reader Support

Kanban is compatible with popular screen readers:
- JAWS (Job Access With Speech)
- NVDA (NonVisual Desktop Access)
- Narrator (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

**Screen Reader Announcements:**
- Column names when focused
- Card count per column
- Card content when focused
- Drag-and-drop operations
- Dialog open/close states
- Validation messages

**Example - Enhanced Screen Reader Support:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary")
            .HeaderField("Id")
            .Template("#accessibleCardTemplate");
    })
    .Render()

<script id="accessibleCardTemplate" type="text/x-jsrender">
    <div class='card-template' 
         aria-label="Task ${Id}: ${Summary}. Assigned to ${Assignee}. Priority: ${Priority}">
        <div class='card-header'>#${Id}</div>
        <div class='card-content'>${Summary}</div>
        <div class='card-footer'>${Assignee}</div>
    </div>
</script>
```

### Color Contrast

Ensure sufficient color contrast ratios for users with visual impairments.

**WCAG AA Requirements:**
- Normal text: Minimum 4.5:1 contrast ratio
- Large text: Minimum 3:1 contrast ratio
- UI components: Minimum 3:1 contrast ratio

**Example - High Contrast Theme:**

```html
<!-- Use high contrast theme -->
<link href="https://cdn.syncfusion.com/ej2/highcontrast.css" rel="stylesheet" />
```

**Custom High Contrast Colors:**

```css
/* High contrast card styling */
.high-contrast-kanban .e-card {
    background-color: #000000;
    color: #FFFFFF;
    border: 2px solid #FFFFFF;
}

.high-contrast-kanban .e-card:focus {
    outline: 3px solid #FFD700;
    outline-offset: 2px;
}

.high-contrast-kanban .e-kanban-header {
    background-color: #000000;
    color: #FFFFFF;
    border-bottom: 3px solid #FFFFFF;
}
```

### Focus Indicators

Visible focus indicators help keyboard users identify the currently focused element.

**Default Focus Indicators:**
- Blue outline around focused cards
- Highlight on focused column headers
- Border on focused buttons

**Custom Focus Styles:**

```css
/* Enhanced focus indicators */
.e-kanban .e-card:focus {
    outline: 3px solid #2196F3;
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba(33, 150, 243, 0.2);
}

.e-kanban .e-card:focus-visible {
    outline: 3px solid #2196F3;
}

/* Ensure focus is visible in high contrast mode */
@media (prefers-contrast: high) {
    .e-kanban .e-card:focus {
        outline: 4px solid currentColor;
    }
}
```

## Touch Gesture Support

Kanban automatically supports touch gestures for mobile and tablet devices.

**Supported Touch Gestures:**
- **Tap**: Select card
- **Double Tap**: Open dialog (edit card)
- **Long Press**: Multi-select mode
- **Swipe**: Scroll within columns
- **Drag**: Move cards (touch-friendly)
- **Pinch**: Not supported (use responsive sizing instead)

**Touch Optimization:**

```css
/* Touch-friendly sizing */
@media (hover: none) and (pointer: coarse) {
    .e-kanban .e-card {
        min-height: 60px;
        padding: 12px;
        touch-action: pan-y;
    }
    
    .e-kanban .e-card-header {
        padding: 12px;
        min-height: 44px; /* Minimum touch target size */
    }
    
    .e-kanban button {
        min-width: 44px;
        min-height: 44px;
    }
}
```

## Section 508 Compliance

Kanban complies with Section 508 standards for federal accessibility.

**Section 508 Features:**
- Keyboard-only operation
- Screen reader compatibility
- No time-based interactions
- Clear focus indicators
- Text alternatives for visual elements

## Best Practices

### Virtual Scrolling
1. **Always set Height**: Required for virtual scrolling to work
2. **Set CardHeight**: Improves performance by 30-40%
3. **Use remote data**: Better for datasets > 5,000 cards
4. **Test with real data**: Ensure realistic performance testing
5. **Monitor memory**: Watch browser memory with large datasets

### Accessibility
1. **Test with keyboard only**: Ensure all features are accessible without mouse
2. **Use screen readers**: Test with JAWS, NVDA, or VoiceOver
3. **Check color contrast**: Use tools like WebAIM Contrast Checker
4. **Provide alt text**: For images and icons in card templates
5. **Label form fields**: In custom dialog templates
6. **Test high contrast mode**: Verify appearance in Windows high contrast
7. **Meaningful focus order**: Ensure logical tab order
8. **Error messages**: Make validation errors accessible to screen readers
9. **Skip links**: Consider adding skip navigation links for large boards
10. **Semantic HTML**: Use proper HTML5 semantic elements

### Keyboard Navigation
1. **Enable AllowKeyboard**: Keep default keyboard support enabled
2. **Document shortcuts**: Provide keyboard shortcut help for users
3. **Visual feedback**: Show clear focus indicators
4. **Prevent conflicts**: Avoid custom keyboard handlers that conflict
5. **Test tab order**: Ensure logical focus progression

### Touch Support
1. **44px minimum**: Ensure touch targets are at least 44x44px
2. **Spacing**: Provide adequate spacing between interactive elements
3. **Test on devices**: Use real mobile devices for testing
4. **Avoid hover**: Don't rely on hover states for critical functionality
5. **Touch feedback**: Provide visual feedback for touch interactions

## Testing Accessibility

**Tools:**
- **WAVE**: Web accessibility evaluation tool
- **axe DevTools**: Automated accessibility testing
- **Lighthouse**: Chrome DevTools audit
- **Screen readers**: JAWS, NVDA, VoiceOver
- **Keyboard only**: Unplug mouse and navigate
- **Color contrast analyzers**: Check contrast ratios

**Checklist:**
- [ ] All functionality accessible via keyboard
- [ ] Focus indicators visible on all interactive elements
- [ ] Screen reader announces card and column information
- [ ] Color contrast meets WCAG AA standards (4.5:1 minimum)
- [ ] Dialog can be operated with keyboard
- [ ] Validation errors announced to screen readers
- [ ] ARIA labels present and meaningful
- [ ] Tab order logical and predictable
- [ ] No keyboard traps
- [ ] Touch targets minimum 44x44px on mobile

## Performance Benchmarks

**Without Virtual Scrolling:**
- 100 cards: ~50ms render time
- 500 cards: ~250ms render time
- 1,000 cards: ~600ms render time
- 5,000 cards: ~3,000ms render time (not recommended)

**With Virtual Scrolling:**
- 100 cards: ~40ms render time
- 500 cards: ~80ms render time
- 1,000 cards: ~100ms render time
- 5,000 cards: ~120ms render time
- 10,000 cards: ~150ms render time
- 50,000 cards: ~200ms render time

**Note:** Benchmarks vary based on card complexity, browser, and hardware.
