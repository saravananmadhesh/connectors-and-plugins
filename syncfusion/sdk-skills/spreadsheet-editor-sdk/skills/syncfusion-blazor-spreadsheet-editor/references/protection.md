## Protection

> Protect sheets and workbooks to prevent unauthorized modifications. Protection can be applied with or without a password, depending on the level of security required. Configure protection settings to restrict specific actions while allowing others.

### Sheet Protection

> Prevent accidental changes such as editing, moving, or deleting data within a sheet. Protect sheets via the UI and configure which actions users are allowed to perform.

### Workbook Protection

> Restrict structural modifications within a workbook by disabling actions such as inserting, deleting, renaming, or hiding sheets.

### UI-only Operations

These operations are available only through the user interface. There are no public APIs or events to trigger or customize these operations programmatically.

**Summary**
Sheet Protection, Unlock Range, and Workbook Protection are UI-only actions. No public API or event is provided to trigger, intercept, or automate these operations.

**How to Perform**

**Protect Sheet:**
- Navigate to the **Review** tab in the Ribbon and select **Protect Sheet**.
- Right-click the sheet's tab in the bottom bar and select **Protect Sheet** from the context menu.
- In the **Protect Sheet** dialog, set a password (optional) and specify which actions users are allowed to perform.

**Unlock Range:**
- Open the **Protect Sheet** dialog from the **Review** tab.
- Navigate to the **Unlock Range** tab.
- Select the desired cell(s) or range(s) that should remain editable, even when the sheet is protected.

**Protection Settings:**
- Open the **Protect Sheet** dialog from the **Review** tab.
- Navigate to the **Sheet Options** tab to view available protection settings.
- Select or deselect the desired options to allow or restrict specific actions.

**Unprotect Sheet:**
- Select **Unprotect Sheet** from the **Review** tab in the Ribbon toolbar.
- Right-click the sheet tab context menu option and select **Unprotect Sheet** from the context menu.
- Enter the correct password if one was set during protection.

**Protect Workbook:**
- Go to the **Review** tab in the Ribbon toolbar.
- Select **Protect Workbook**, enter and confirm the desired password, and then click **OK** to apply the protection.

**Unprotect Workbook:**
- Select **Unprotect Workbook** from the **Review** tab in the Ribbon toolbar.
- Enter the correct password in the dialog box, then click **OK**.

### BUTTON
<!-- Refer the below button for creating button and update the API public method calling. -->
<button @onclick="#MethodName">#Button Name</button>

### API Methods

```csharp
// Protects a worksheet or the entire workbook using default protection settings without a password.
await SpreadsheetRef.ProtectSheetAsync(SHEETNAME);

// Removes protection from a worksheet or the entire workbook.
await SpreadsheetRef.UnprotectSheetAsync(SHEETNAME);
```

### Placeholders

| Parameter | Description | Example |
|---|---|---|
| `#MethodName` | Name of the method calling when clicking the button | - |
| `#Button Name` | Provide a meaning full name to button which binds to API method | - |
| `SHEETNAME` | Optional sheet name to protect/unprotect. Omit to operate on workbook structure (all sheets). | `"Sheet1"` |

### Protection Settings

The available protection settings in Spreadsheet are:

| Options | Description |
|---|---|
| Select Cells | Allows cell selection. |
| Format Cells | Allows cell formatting. |
| Format Rows | Allows row formatting. |
| Format Columns | Allows column formatting. |
| Insert Columns | Allows inserting new columns. |
| Insert Rows | Allows inserting new rows. |
| Insert Hyperlinks | Allows adding hyperlinks. |
| Sort | Allows sorting data. |
| Filter | Allows filtering data. |

### Limitations

- To unprotect a sheet/workbook, the correct password must be provided if one was set during protection.
- By default, when a sheet is protected, most actions such as formatting, inserting, sorting, and filtering are restricted, while selecting cells remains allowed.
- Undo/Redo history is cleared when worksheet protection is enabled.
- Many sheet operations are disabled under protection.

### Notes
- **Important:** API methods should **NOT** be called inside `OnInitialized` or `OnParametersSet` lifecycle methods. Even if you call them, they will not work properly. Call API methods in response to user interactions (like button clicks) or in other appropriate lifecycle methods after the component is fully rendered.

### Documentation link
[Blazor Spreadsheet Protection](https://help.syncfusion.com/document-processing/excel/spreadsheet/blazor/protection)
