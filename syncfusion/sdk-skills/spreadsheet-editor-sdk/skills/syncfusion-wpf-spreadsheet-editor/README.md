# Syncfusion<sup>®</sup> WPF Spreadsheet Editor Skill

## Overview

Integrate and configure the Syncfusion WPF Spreadsheet — an interactive Excel-like UI — into WPF projects.
This skill generates minimal, copy-pasteable C# and XAML code that you can drop directly into your WPF application.

See **[SKILL.md](SKILL.md)** for the full intent-routing guide and rules.

---

## Key Capabilities

- **Create & Edit:** Workbooks (.xlsx, .xls, .xlsm), worksheets, cell editing, formatting, styles
- **Advanced Features:** 400+ formulas, named ranges, data validation, dropdown lists, cell locking, worksheet protection
- **UI Components:** SpreadsheetRibbon (File, Home, Insert, Formulas tabs), interactive editing
- **Visual Elements:** Charts (Column, Line, Pie, Bar, Area, Scatter, etc.), sparklines (Line, Column, Win/Loss)
- **Navigation:** Hyperlinks (web URLs, email, files, workbook navigation)

---

## Getting Started

### How to Integrate Skills

**Step 1: Checkout and copy the required skills**

Clone or download the Spreadsheet-Editor-SDK-Skills repository and copy the **wpf-spreadsheet-editor** skill from the `skills/` directory.

**Step 2: Install the skill**

Place the copied skill folders in your workspace following this structure:

```
your-workspace/
├── .github/skills/          # or .claude/skills/ or .codestudio/skills/
│   └── wpf-spreadsheet-editor/
│       └── SKILL.md
├── Spreadsheet/              # WPF projects
│   ├── MainWindow.xaml
│   ├── MainWindow.xaml.cs
│   └── ...
└── Spreadsheet.sln          # Solution file
```

**Step 3: Verify and manage your skills**

Type `/skills` in the GitHub Copilot or Code Studio chat to quickly access the Configure Skills menu and manage your installed skills.

**Step 4: Use skills in VS Code**

There are two ways to use skills:

1. **Slash commands** - Type `/` in the GitHub Copilot chat to see available skills. For example:
   ```
   /wpf-spreadsheet-editor Create a spreadsheet with sample data
   ```

2. **Automatic loading** - Simply describe your task naturally, and your AI Agent automatically loads the relevant skill:
   ```
   Create a spreadsheet without the ribbon
   ```

When a skill is loaded, AI Agent gains specialized knowledge of Syncfusion WPF Spreadsheet and can help you generate code for your WPF project efficiently.

### Prerequisites

### Runnable WPF project 

To integrate the Syncfusion WPF Spreadsheet component directly into your project files, you need a working WPF project. If you don't have one yet, follow the [Getting Started guide](https://help.syncfusion.com/document-processing/excel/spreadsheet/wpf/getting-started) to set up a new WPF project.

**Alternative Options:**
- **No project needed:** You can request code snippets directly in the chat window for learning or reference purposes
- **Separate file generation:** Code can be saved to the skill's output folder (`syncfusion-wpf-spreadsheet-editor/output/`) as standalone files

## Example Prompts

*Use these when you want C# code snippets for your WPF project.*

- "Create a WPF application with Syncfusion Spreadsheet control and Ribbon"
- "Show me how to set up SpreadsheetRibbon with the Spreadsheet control"
- "Generate code to add hyperlinks that navigate to other sheets in the workbook"
- "Add sparkline support to display trend lines in cells"
- "Generate code to protect a worksheet with a password"
- "Show me how to insert rows, columns, and manage worksheets"
- "Add age validation to column C that only accepts values between 18 and 65"

---
## Troubleshooting

| Issue | Solution |
|-------|----------|
| License Watermark | Add key to `SyncfusionLicense.txt` or use env var `SYNCFUSION_LICENSE_KEY` |
| Missing NuGet package | `dotnet add package Syncfusion.SfSpreadsheet.WPF`, `dotnet add package Syncfusion.SfSpreadsheetHelper.WPF` | `dotnet add package Syncfusion.ExcelToPDFConverter.WPF` |
| File access error | Ensure the Excel file path is correct and accessible |
| Google Drive error | Verify service account credentials and file ID |
| Component not rendering | Ensure Syncfusion script and stylesheet are referenced in your layout |

---

## Resources

- [Syncfusion WPF Spreadsheet Documentation](https://help.syncfusion.com/wpf/spreadsheet/overview)
- [API Reference](https://help.syncfusion.com/cr/wpf/Syncfusion.UI.Xaml.Spreadsheet.SfSpreadsheet.html)
- [Demo & Examples](https://github.com/syncfusion/wpf-demos)

---

## License

Syncfusion WPF Spreadsheet requires a commercial license for production use. A [free community license](https://www.syncfusion.com/products/communitylicense) is available for qualifying organizations.
