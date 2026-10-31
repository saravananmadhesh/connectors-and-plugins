# Syncfusion<sup>®</sup> Vue Spreadsheet Editor Skill

## Overview

Build Excel-like spreadsheet applications in Vue using the Syncfusion Spreadsheet Editor. This skill provides AI-guided code generation and integration guidance for the Vue Spreadsheet component, helping you create feature-rich spreadsheet experiences with data binding, formulas, charts, import/export, and more.

See **[SKILL.md](SKILL.md)** for the full intent-routing guide and rules.

---

## Key Capabilities

- **File Operations:** Import/export Excel files (`xlsx`, `xls`, `xlsb`), CSV files, and PDF export  
- **Data Management:** Data binding (local arrays, JSON, remote APIs), editing, sorting, filtering, and validation  
- **Cell Operations:** Formatting (fonts, colors, borders, alignment), merge cells, wrap text, number formatting  
- **Formulas & Calculations:** Commonly used Excel formulas, custom functions, named ranges, formula bar 
- **Collaboration:** Notes, comments, and threaded discussions  
- **Advanced Features:** Charts, images, hyperlinks, conditional formatting, freeze panes, sheet protection  
- **Performance:** Virtual scrolling and lazy loading for large datasets (millions of cells)

---

## Getting Started

### How to Integrate Skills

#### **Step 1: Checkout and copy the required skills**

Clone or download the Spreadsheet-Editor-SDK-Skills repository and copy the **syncfusion-vue-spreadsheet-editor** skill from the `skills/` folder.

#### **Step 2: Install the skill**

Place the copied skill folder into your workspace following this structure:

```
your-workspace/
├── .github/skills/ or .claude/skills/ or .codestudio/skills/
│   └── syncfusion-vue-spreadsheet-editor/
│       ├── SKILL.md
│       └── references/
├── your-project-files...
└── src/
    └── App.vue
```

#### **Step 3: Verify and manage your skills**

Type `/skills` in GitHub Copilot or Code Studio chat to open the Configure Skills menu.

#### **Step 4: Use skills in VS Code**

Two ways to use skills:

1. **Slash Commands**
   ```
   /syncfusion-vue-spreadsheet-editor Create a spreadsheet with data binding and formulas
   ```

2. **Automatic skill loading**
   ```
   Create a Vue spreadsheet component that loads inventory data from an API and formats amounts as currency
   ```

---

## Prerequisites

### Runnable Vue Project

You need a working [Vue application](https://help.syncfusion.com/document-processing/excel/spreadsheet/vue/getting-started) (Vite or Vue CLI).

**Alternative Options:**

- Request Vue code snippets directly in chat  
- Let the AI save output files to:  
  `syncfusion-vue-spreadsheet-editor/output/`

---

## Example Prompts

- “Create a Vue spreadsheet component that loads data from a remote API”  
- “Format column C as currency and highlight values over 1000”  
- “Insert a column chart based on sales data in A-D”  
- “Protect Sheet1 and allow edits only in cells B2:C10”  
- “Create a spreadsheet with freeze panes on row 1”  
- “Add a custom function called PROFIT”  
- “Add data validation for Quantity to allow only numbers between 1-100”  
- “Create multiple sheets and enable sheet navigation”

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Spreadsheet not rendering** | Ensure container height is set (`600px` or `100vh`). Verify CSS imports. |
| **License watermark appears** | Confirm your Syncfusion license key is properly configured. |
| **Formulas not calculating** | Ensure formula strings start with `=`. Use `spreadsheet.updateCell()` to set the cell formula, for example: `spreadsheet.updateCell({ formula: '=A2*B2' }, 'C2')`. |
| **Data not displaying** | Ensure `dataSource` structure matches expected object array format. |
| **Import/Export failures** | Verify correct `openUrl` and `saveUrl` and check CORS settings. |
| **Theme issues** | Ensure CSS files are imported in correct order. |
| **Ref undefined** | Access `$refs` after mount (`onMounted`). |
| **TypeScript errors** | Ensure TS config supports Vue and JSX features if used. |

---

## Documentation

- [Syncfusion Spreadsheet Editor Docs (Vue)](https://help.syncfusion.com/document-processing/excel/spreadsheet/vue/overview)  
- [Vue Spreadsheet API Reference](https://ej2.syncfusion.com/vue/documentation/api/spreadsheet/)  
- [Spreadsheet Demo (Vue)](https://document.syncfusion.com/demos/spreadsheet-editor/vue/)  
- [Product Page](https://www.syncfusion.com/spreadsheet-editor-sdk)

---

## Resources

- [Syncfusion Vue Documentation](https://ej2.syncfusion.com/vue/documentation/introduction)  
- [GitHub Samples](https://github.com/syncfusion/ej2-vue-samples)  
- [Knowledge Base](https://www.syncfusion.com/kb/vue)  
- [Community Forums](https://www.syncfusion.com/forums/vue)  
- [Support](https://www.syncfusion.com/support/directtrac)

---

## License

Syncfusion Vue Spreadsheet Editor requires a commercial license for production use. A **free community license** is available for eligible developers and small businesses.

**Get a License:**

- Free Community License: https://www.syncfusion.com/products/communitylicense  
- Trial License: https://www.syncfusion.com/downloads/license  
- Commercial License: https://www.syncfusion.com/sales/products
