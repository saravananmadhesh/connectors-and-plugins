## Find and Replace
> Provides programmatic support to search, replace, and navigate cells or ranges in the spreadsheet using public API methods and configurable properties.

### PROPERTY
```csharp
AllowFindAndReplace="true(Default)/false"
```

### BUTTON
<!-- Refer the below button for creating button and update the API public method calling. -->
<button @onclick="#MethodName">#Button Name</button>

### API METHODS
```csharp
// Searches for the specified text or value within the configured scope and returns the matching result.
SpreadsheetRef.FindAsync(string searchText, SearchScope searchScope = SearchScope.CurrentSheet, bool matchCase = false, bool matchEntireCell = false, SearchDirection searchDirection = SearchDirection.ByRows, FindOption findOption = FindOption.Next)

// Retrieves all occurrences of the specified text or value within the configured scope and returns their sheet-qualified cell addresses as a string array.
SpreadsheetRef.FindAllAsync(string searchText, SearchScope searchScope = SearchScope.CurrentSheet, bool matchCase = false, bool matchEntireCell = false)

// Replaces matching text or values within the specified search scope.
SpreadsheetRef.ReplaceAsync(string searchText, string replacementText, SearchScope searchScope = SearchScope.CurrentSheet, bool matchCase = false, bool matchEntireCell = false, bool isReplaceAll = false)

// Navigates to the specified cell reference, range, or named range.
SpreadsheetRef.GoTo(string cellAddress)

```

### API Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `#MethodName` | Name of the method calling when clicking the button | - |
| `#Button Name` | Provide a meaning full name to button which binds to API method | - |
| `searchText` | 	Text or value to search for | "Error" |
| `replacementText` | Text used to replace the matched content | ""Success"" |
| `cellAddress` | Cell reference, range, or named range to navigate to | "Sheet1!A1" |
| `matches` | String array of sheet-qualified cell addresses returned by `FindAllAsync` | `["Sheet1!A1", "Car Sales Report1!D1"]` |

### FIND AND REPLACE ENUMS

| Enum | Values | Description |
|---|---|---|	
| `SearchScope` | `CurrentSheet`, `EntireWorkbook` | Defines where the search is performed |
| `FindOption` | `Next`, `Previous` | Defines navigation direction for search results |
| `SearchDirection` | `ByRows`, `ByColumns` | Defines the order in which cells are searched |

### FIND AND REPLACE FEATURE SUPPORT

**Search Scope**
- **CurrentSheet** : Searches only within the active worksheet
- **EntireWorkbook** : Searches across all worksheets in the workbook

**Find Option**
- **Next**: Moves to the next matching result
- **Previous**: Moves to the previous matching result

**Search Direction**
- **ByRows** : Searches row by row
- **ByColumns** : Searches column by column

### RELATED PROPERTY THAT CONTROLS FIND AND REPLACE

| Property | Default | Effect when set to "false" |
|---|---|---|
| `AllowFindAndReplace`	| true |Disables Find, Replace, and Go To operations from the UI and prevents programmatic usage |

### WHEN FIND AND REPLACE IS DISABLED
When `AllowFindAndReplace` is set to false, the following features become unavailable through the UI:

- Find dialog
- Replace dialog
- Go To navigation
- Ribbon access to search and replacement commands
- Keyboard shortcuts related to find and replace

**Note**: These actions are blocked at the spreadsheet level when the feature is disabled.

### METHODS BEHAVIOR
**FindAsync**
- Searches for the specified text or value
- Supports current sheet or entire workbook search
- Supports case-sensitive and whole-cell matching
- Supports row-wise or column-wise navigation
- Navigates to the matching result if found

**FindAllAsync**
- Retrieves all occurrences of the specified text or value without modifying the active cell or spreadsheet state
- Returns a `Task<string[]>` containing sheet-qualified cell addresses (e.g., "Sheet1!A1", "Sheet2!D5")
- Supports current sheet or entire workbook search
- Supports case-sensitive and whole-cell matching
- Sorts results by cell address (row-wise search order)
- Returns an empty string array when no matches are found or when the search text is null, empty, or whitespace
- Does not require navigation; the results can be used directly for custom highlighting, reporting, or external processing

**ReplaceAsync**
- Searches for matching text or values
- Replaces the first match or all matches
- Supports current sheet or entire workbook search
- Supports case-sensitive and whole-cell matching
- Supports undo and redo behavior

**GoTo**
- Navigates to a specific cell, range, or named range
- Supports sheet-qualified addresses
- Selects the target cell or range as the active selection

**NOTES**
- **AllowFindAndReplace** is enabled by default; set it to false only when search and replace access must be restricted.
- Use the SfSpreadsheet reference to call the API methods programmatically.
- Ensure the spreadsheet component has a valid @ref or ID based on your implementation pattern.
- **Important:** API methods should **NOT** be called inside `OnInitialized` or `OnParametersSet` lifecycle methods. Even if you call them, they will not work properly. Call API methods in response to user interactions (like button clicks) or in other appropriate lifecycle methods after the component is fully rendered.

### Documentation link
[Blazor Spreadsheet Find And Replace](https://help.syncfusion.com/document-processing/excel/spreadsheet/blazor/find-and-replace)