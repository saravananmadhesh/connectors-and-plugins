# Syncfusion<sup>®</sup> ASP.NET Core Spreadsheet Editor Skill

## Overview

Build Excel-like spreadsheet applications in ASP.NET Core using the Syncfusion Spreadsheet Editor. This skill provides AI-guided code generation and integration guidance for the Syncfusion ASP.NET Core Spreadsheet component, helping you create feature-rich spreadsheet experiences with data binding, formulas, charts, import/export, and more.

See **[SKILL.md](SKILL.md)** for the full intent-routing guide and rules.

---

## Key Capabilities

- **File Operations:** Import/export Excel files (`xlsx`, `xls`, `xlsb`), CSV files, and PDF export
- **Data Management:** Data binding (local arrays, JSON, remote APIs), editing, sorting, filtering, and validation
- **Cell Operations:** Formatting (fonts, colors, borders, alignment), merge cells, wrap text, number formatting
- **Formulas & Calculations:** Commonly used Excel formulas, custom functions, named ranges, formula bar
- **Collaboration:** Notes, comments, and threaded discussions
- **Advanced Features:** Charts (column, line, pie, scatter, etc.), images, hyperlinks, conditional formatting, freeze panes, sheet protection, row/column operations
- **Performance:** Virtual scrolling and lazy loading for large datasets (millions of cells)

---

## Getting Started

### How to Integrate Skills

**Step 1: Checkout and copy the required skills**

Clone or download the Spreadsheet-Editor-SDK-Skills repository and copy the **syncfusion-aspnetcore-spreadsheet-editor** skill from the `skills/` directory.

**Step 2: Install the skill**

Place the copied skill folder in your workspace following this structure:

```
your-workspace/
├── .github/skills/ or .claude/skills/ or .codestudio/skills/
│   └── syncfusion-aspnetcore-spreadsheet-editor/
│       ├── SKILL.md
│       └── references/
├── your-project-files...
│
├── Controllers/
│       └── HomeController.cs
└── Views/
    └── Home/
        └── Index.cshtml
```

**Step 3: Verify and manage your skills**

Type `/skills` in the GitHub Copilot or Code Studio chat to quickly access the Configure Skills menu and manage your installed skills.

**Step 4: Use skills in VS Code**

There are two ways to use skills:

1. **Slash commands** - Type `/` in the GitHub Copilot chat to see available skills. For example:
   ```
   /syncfusion-aspnetcore-spreadsheet-editor Create a spreadsheet with data binding and cell formatting
   ```

2. **Automatic loading** - Simply describe your task naturally, and your AI Agent automatically loads the relevant skill:
   ```
   Create an ASP.NET Core spreadsheet component that loads product data from an API and displays it with currency formatting
   ```

When a skill is loaded, AI Agent gains specialized knowledge of the Syncfusion ASP.NET Core Spreadsheet and can help you generate code snippets or build complete spreadsheet features.

---

## Prerequisites

### Runnable ASP.NET Core Project

To integrate the Syncfusion Spreadsheet component directly into your project files, you need a working ASP.NET Core MVC or Razor Pages application. If you don't have one yet, follow the [Getting Started guide](https://help.syncfusion.com/document-processing/excel/spreadsheet/asp-net-core/getting-started-core) to set up a new ASP.NET Core project.

**Alternative Options:**
- **No project needed:** You can request code snippets directly in the chat window for learning or reference purposes
- **Separate file generation:** Code can be saved to the skill's output folder (`syncfusion-aspnetcore-spreadsheet-editor/output/`) as standalone files

---

## Example Prompts

- "Create an ASP.NET Core spreadsheet component that loads remote data from an API endpoint"
- "Add currency formatting to column C and apply conditional formatting to highlight values over $1000"
- "Generate code to insert a column chart for sales data in columns A-D"
- "Show me how to protect Sheet1 and allow only specific cells to be edited"
- "Create a spreadsheet with freeze panes on the first row and column"
- "Add a custom function called PROFIT that calculates revenue minus cost"
- "Enable data validation on the Quantity column to allow only numbers between 1-100"
- "Create a multi-sheet spreadsheet with navigation between sheets"

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Spreadsheet not rendering** | Ensure container has explicit height (`height: 600px` or `100vh`). Verify script and CSS references are loaded correctly. Check browser console for errors. |
| **License watermark appears** | Verify that your license key is properly configured in `Program.cs` or `Startup.cs`. For more information, check the [Licensing](https://help.syncfusion.com/document-processing/licensing/overview) page. |
| **Formulas not calculating** | Ensure formula strings start with `=`. Use `spreadsheet.updateCell()` to set the cell formula, for example: `spreadsheet.updateCell({ formula: '=A2*B2' }, 'C2')`. |
| **Data not displaying** | Verify `dataSource` format matches expected structure (`List<object>`, `DataTable`, or JSON). Check `startCell` property. Ensure ViewBag data is properly passed from controller. |
| **Import/Export not working** | Configure server-side controller actions and verify `openUrl` and `saveUrl` are configured and point to valid server endpoints for Open and Save operations. Ensure proper routing and CORS settings. Check file upload size limits in `web.config`. |
| **Style/Theme not applied** | Verify CDN link is correct and accessible. Ensure theme CSS is loaded before the Syncfusion script. Clear browser cache. |
| **Ref is null/undefined** | Access `this` only after component mounts (e.g., in `created` event). |
| **Tag Helper not recognized** | Ensure `@addTagHelper *, Syncfusion.EJ2` is added in `_ViewImports.cshtml`. Verify NuGet package is installed and restored. |
| **Script errors in console** | Check that `ej2.min.js` is loaded correctly. Verify CDN version matches your NuGet package version. Ensure scripts are loaded in correct order. |

---

## Documentation

- [Syncfusion ASP.NET Core Spreadsheet Docs](https://help.syncfusion.com/document-processing/excel/spreadsheet/asp-net-core/overview)
- [API Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Spreadsheet.html)
- [Syncfusion Spreadsheet Demo](https://document.syncfusion.com/demos/spreadsheet-editor/asp-net-core/spreadsheet/defaultfunctionalities#/bootstrap5)
- [Product Page](https://www.syncfusion.com/spreadsheet-editor-sdk)

---

## Resources

- [Syncfusion ASP.NET Core Documentation](https://ej2.syncfusion.com/aspnetcore/documentation/introduction)
- [GitHub Samples](https://github.com/syncfusion/ej2-aspnetcore-samples)
- [Knowledge Base](https://www.syncfusion.com/kb/aspnetcore)
- [Community Forums](https://www.syncfusion.com/forums/aspnetcore)
- [Support](https://www.syncfusion.com/support/directtrac)

---

## License

Syncfusion ASP.NET Core Spreadsheet Editor requires a commercial license for production use. A [free community license](https://www.syncfusion.com/products/communitylicense) is available for qualifying organizations and individuals (companies with less than $1M USD in annual gross revenue and 5 or fewer developers).

**Get a License:**
- Free Community License: https://www.syncfusion.com/products/communitylicense
- Trial License: https://www.syncfusion.com/downloads/license
- Commercial License: https://www.syncfusion.com/sales/products