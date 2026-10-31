# How-To Recipes for Syncfusion ASP.NET Core Kanban

## Table of Contents
- [Dynamically Change Columns](#dynamically-change-columns)
- [Filter Cards with Dropdown](#filter-cards-with-dropdown)
- [Search Cards by Field Value](#search-cards-by-field-value)
- [Handle Column Header Double-Click](#handle-column-header-double-click)

## Dynamically Change Columns

Update column configuration at runtime using the `columns` property on the Kanban instance.

```html
<ejs-button id="particularColumn" content="Enable Allow Toggle"></ejs-button>
<ejs-button id="column" content="Change Columns"></ejs-button>

<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    created="onCreate">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"></e-kanban-column>
        <e-kanban-column headerText="In Review" keyField="Review"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"
        showHeader="false">
    </e-kanban-cardsettings>
</ejs-kanban>

<script type="text/javascript">
    var kanbanObj;
    function onCreate() {
        kanbanObj = this;
    }

    // Enable allowToggle on the second column (index 1)
    document.getElementById('particularColumn').onclick = function () {
        kanbanObj.columns[1].allowToggle = true;
    };

    // Replace all columns with a new 2-column layout
    document.getElementById('column').onclick = function () {
        kanbanObj.columns = [
            { headerText: 'To Do', keyField: 'Open' },
            { headerText: 'Done', keyField: 'Close' }
        ];
    };
</script>
```

**Key techniques:**
- Use `created="onCreate"` event to capture the Kanban instance reference (`this`)
- Access `kanbanObj.columns[index]` to modify a specific column's properties
- Assign a new array to `kanbanObj.columns` to replace all columns dynamically
- The board re-renders immediately after assignment

## Filter Cards with Dropdown

Filter visible cards using the `query` property with an EJ2 DropDownList:

```html
<ejs-dropdownlist id="priority_filter"
    dataSource="@ViewBag.PriorityData"
    index="0"
    change="change"
    placeholder="Select a priority">
</ejs-dropdownlist>

<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    created="onCreate">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"></e-kanban-column>
        <e-kanban-column headerText="In Review" keyField="Review"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>

<script type="text/javascript">
    var kanbanObj;
    function onCreate() {
        kanbanObj = this;
    }

    function change(args) {
        var filterQuery = new ej.data.Query();
        if (args.value !== 'None') {
            filterQuery = new ej.data.Query().where('Priority', 'equal', args.value);
        }
        kanbanObj.query = filterQuery;
    }
</script>
```

**Controller — pass dropdown options:**

```csharp
public IActionResult Index()
{
    ViewBag.data = new KanbanDataModels().KanbanTasks();
    ViewBag.PriorityData = new List<string> { "None", "Low", "Normal", "Critical", "Release Breaker" };
    return View();
}
```

**Key techniques:**
- Assign an `ej.data.Query` object to `kanbanObj.query` to filter cards
- Use `.where(field, operator, value)` to build the filter condition
- Reset to an empty `new ej.data.Query()` to show all cards again (e.g., when `"None"` is selected)
- The filter applies client-side over the full data source

## Search Cards by Field Value

Search across multiple card fields using a text input and the `search` query method:

```html
<table>
    <tbody>
        <tr>
            <td style="width: 200px">
                <ejs-textbox id="search_text"
                    placeholder="Enter search text"
                    showClearButton="true"
                    created="searchCreated">
                </ejs-textbox>
            </td>
            <td>
                <ejs-button id="reset_filter" content="Reset"></ejs-button>
            </td>
        </tr>
    </tbody>
</table>

<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    created="kanbanCreate">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"></e-kanban-column>
        <e-kanban-column headerText="In Review" keyField="Review"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>

<script>
    var kanbanObj, textObj;

    function kanbanCreate() {
        kanbanObj = this;
    }

    function searchCreated() {
        textObj = this;
    }

    // Reset button clears search and shows all cards
    document.getElementById('reset_filter').onclick = function () {
        textObj.value = '';
        kanbanObj.query = new ej.data.Query();
    };

    // Live search as user types
    document.getElementById('search_text').onkeyup = function (e) {
        var searchValue = e.target.value;
        var searchQuery = new ej.data.Query();
        if (searchValue !== '') {
            searchQuery = new ej.data.Query()
                .search(searchValue, ['Id', 'Summary'], 'contains', true);
        }
        kanbanObj.query = searchQuery;
    };
</script>
```

**`Query.search()` parameters:**
1. Search string (the typed value)
2. Array of field names to search across (e.g., `['Id', 'Summary']`)
3. Operator — `'contains'` for partial match, `'equal'` for exact match
4. `true` — case-insensitive search

The search executes client-side over the full data source on each keystroke.

## Handle Column Header Double-Click

Attach a double-click handler to column headers using the `dataBound` event:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    dataBound="onDataBound">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"></e-kanban-column>
        <e-kanban-column headerText="In Review" keyField="Review"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>

<script>
    function onDataBound(args) {
        // Attach dblclick listener to the header row after data loads
        var headerEle = document.querySelector('.e-header-row');
        headerEle.addEventListener("dblclick", function (e) {
            var target = ej.base.closest(e.target, '.e-header-cells');
            if (target) {
                ej.popups.DialogUtility.alert({
                    title: 'Header',
                    content: "Double clicked on " +
                        target.querySelector('.e-header-text').innerText + " header",
                    showCloseIcon: true,
                    closeOnEscape: true,
                    animationSettings: { effect: 'Zoom' }
                });
            }
        });
    }
</script>
```

**Key techniques:**
- Use `dataBound` (not `created`) so the header DOM is guaranteed to exist before attaching the listener
- `ej.base.closest(target, selector)` — traverses DOM upward to find the nearest matching ancestor
- `.e-header-row` — the CSS class on the header `<tr>` element
- `.e-header-cells` — the CSS class on individual column header `<td>` elements
- `.e-header-text` — the inner element containing the column's `headerText`
- `ej.popups.DialogUtility.alert()` — convenience method to show a simple EJ2 alert dialog
