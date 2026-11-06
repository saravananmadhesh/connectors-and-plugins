# AI Exporting

## Table of Contents
- [Prerequisites and EnableSmartActions](#prerequisites-and-enablesmartactions)
- [Overview](#overview)
- [Export Formats](#export-formats)
- [Excel Exporting](#excel-exporting)
- [PDF Exporting](#pdf-exporting)
- [Combined Export](#combined-export)
- [Natural Language Syntax](#natural-language-syntax)
- [Use Cases](#use-cases)

## Prerequisites and EnableSmartActions

**Requirement:** AI exporting capabilities require the `EnableSmartActions` property to be set to `true` on the Smart DataGrid. This property is part of the Syncfusion.SfSmartComponents.WPF assembly, which provides AI-assisted and smart behaviors for data grids including natural language sorting, filtering, grouping, highlighting, and exporting.

**XAML Configuration:**
```xml
<syncfusion:SfSmartDataGrid x:Name="SmartGrid" 
                            ItemsSource="{Binding OrderInfoCollection}" 
                            EnableSmartActions="True">
    <!-- Grid columns defined here -->
</syncfusion:SfSmartDataGrid>
```

**Required Assembly:** Ensure `Syncfusion.SfSmartComponents.WPF` is installed and referenced. See docs/getting-started.md - Assembly Deployment for complete assembly setup instructions.

## Overview

The Smart DataGrid provides AI-powered exporting capabilities through natural language commands. Users can export grid data to Excel, PDF, or both formats simultaneously without writing export logic or configuring export options manually.

**Key Capabilities:**
- **Excel Export** – Export data to Excel format with natural language commands
- **PDF Export** – Export data to PDF format with natural language commands
- **Combined Export** – Export to both Excel and PDF simultaneously
- **AI Interpretation** – The AI interprets export requests and determines the appropriate format
- **Natural Language** – Simple, conversational commands to trigger exports
- **Automatic Execution** – Export happens automatically after prompt processing

## Export Formats

The Smart DataGrid supports two primary export formats, each with specific use cases:

### Excel Format

Exports data to Microsoft Excel format (.xlsx):

**Benefits:**
- Compatible with spreadsheet software (Excel, Google Sheets, LibreOffice)
- Preserves column structure and data types
- Allows further data analysis and manipulation
- Suitable for data archiving and distribution
- Easy to share with non-technical users

### PDF Format

Exports data to Portable Document Format (.pdf):

**Benefits:**
- Universal compatibility across all devices and operating systems
- Preserves exact formatting and layout
- Prevents accidental data modification
- Optimized for printing and archival
- Professional document appearance

## Excel Exporting

Export grid data to Excel format using natural language commands.

### Basic Excel Export Syntax

**Pattern:**
```
Export the DataGrid to Excel.
Export the data to Excel.
Export to Excel.
```

### Excel Export Examples

```
// Simple Excel export
Export the DataGrid to Excel.

// Alternative phrasing
Export the data to Excel.

// Abbreviated
Export to Excel.
```

### Excel Export Workflow

1. User enters a prompt mentioning Excel export
2. AI interprets the request and identifies Excel as the target format
3. Smart DataGrid triggers the Excel export process
4. Data is formatted and written to Excel file
5. File is automatically saved or presented for download

### What Gets Exported to Excel

**Included:**
- All grid columns and their headers
- Visible rows (respects applied filters)
- Applied sorting order
- Cell values and data types
- Column widths (approximate)

**Not Included:**
- Row highlighting (visual styles)
- Grid conditional formatting
- Hidden columns
- Row/cell grouping visualization
- Template content (replaced with values)

## PDF Exporting

Export grid data to PDF format using natural language commands.

### Basic PDF Export Syntax

**Pattern:**
```
Export the DataGrid to PDF.
Export the data to PDF.
Export to PDF.
```

### PDF Export Examples

```
// Simple PDF export
Export the DataGrid to PDF.

// Alternative phrasing
Export the data to PDF.

// Abbreviated
Export to PDF.
```

### PDF Export Workflow

1. User enters a prompt mentioning PDF export
2. AI interprets the request and identifies PDF as the target format
3. Smart DataGrid triggers the PDF export process
4. Data is formatted for PDF layout
5. File is automatically saved or presented for download

### What Gets Exported to PDF

**Included:**
- All grid columns and their headers
- Visible rows (respects applied filters)
- Applied sorting order
- Professional formatting
- Pagination for large datasets

**Not Included:**
- Interactive elements (hyperlinks become static text)
- Row highlighting (visual styles)
- Grid conditional formatting
- Hidden columns
- Row/cell grouping visualization

## Combined Export

Export grid data to both Excel and PDF formats simultaneously using a single command.

### Combined Export Syntax

**Pattern:**
```
Export the data to both Excel and PDF.
Export to Excel and PDF.
Export DataGrid to both formats.
```

### Combined Export Examples

```
// Export to both formats
Export the data to both Excel and PDF.

// Alternative phrasing
Export to Excel and PDF.

// Another variant
Export the DataGrid to both Excel and PDF.
```

### Combined Export Workflow

1. User enters a prompt mentioning both Excel and PDF export
2. AI interprets the request and identifies both formats as targets
3. Smart DataGrid triggers both export processes simultaneously
4. Data is formatted for both Excel and PDF
5. Both files are automatically saved or presented for download

### When to Use Combined Export

**Scenarios:**
- Sharing data with multiple stakeholders (Excel for analysis, PDF for archival)
- Compliance and documentation requirements
- Creating multiple output formats for different use cases
- Generating reports in multiple formats at once
- Distributing data in user-preferred formats

## Natural Language Syntax

### Export Command Patterns

The AI recognizes various command patterns for exporting:

#### Excel-Only Commands
```
Export the DataGrid to Excel.
Export to Excel.
Export data to Excel.
Export the grid to Excel.
Save as Excel.
Download as Excel.
```

#### PDF-Only Commands
```
Export the DataGrid to PDF.
Export to PDF.
Export data to PDF.
Export the grid to PDF.
Save as PDF.
Download as PDF.
```

#### Combined Commands
```
Export the data to both Excel and PDF.
Export to Excel and PDF.
Export DataGrid to both formats.
Export in Excel and PDF formats.
Save as both Excel and PDF.
Download Excel and PDF versions.
```

### Command Components

Natural language export commands typically include:

1. **Action Verb** - Export, Save, Download, Send
2. **Target** - DataGrid, data, grid, table
3. **Format** - Excel, PDF, both
4. **Keyword** - "to" to specify format

**Example Breakdown:**
```
"Export the DataGrid to Excel"
  ↑       ↑            ↑  ↑
Action  Target       Prep Format
```

## Use Cases

### Case 1: Reporting and Distribution

```
Scenario: Manager needs to share quarterly sales data with team
Command: Export the data to both Excel and PDF
Result: 
  - Excel file for further analysis by analysts
  - PDF file for presentation to stakeholders
```

### Case 2: Data Archive

```
Scenario: Need to create a snapshot of current data for compliance
Command: Export the DataGrid to PDF
Result: 
  - PDF file with current state locked for archival
  - Professional document format for long-term storage
```

### Case 3: Analysis and Manipulation

```
Scenario: User needs to perform further analysis on grid data
Command: Export to Excel
Result:
  - Excel file with data that can be pivoted, charted, or analyzed
  - Compatible with Excel formulas and analysis tools
```

### Case 4: Multiple Format Distribution

```
Scenario: Different teams need data in different formats
Command: Export the data to both Excel and PDF
Result:
  - Analysts get Excel for computation
  - Management gets PDF for review and approval
  - Single command handles both requirements
```

### Case 5: Filtered Data Export

```
Scenario: User has applied filters and needs to export only visible rows
Command: Export filtered results to Excel
Result:
  - Only rows matching the current filter criteria are exported
  - Export respects all currently applied filters and sorting
```

## Best Practices

### 1. Use Clear, Specific Commands

**Good:**
```
Export the DataGrid to PDF
Export to both Excel and PDF
```

**Avoid:**
```
Send this somewhere
Do something with the data
```

### 2. Apply Filters Before Export

If you only need specific data:
```
// First: Apply filter
filter Country equals Germany

// Then: Export filtered results
Export to Excel
```

### 3. Sort Data Before Export

Organize data as needed before exporting:
```
// First: Apply sort
sort by Sales descending

// Then: Export sorted data
Export to PDF
```

### 4. Choose Format Based on Use Case

**Use Excel when:**
- Recipients need to analyze or manipulate data
- Further calculations or pivoting is needed
- Data will be integrated with other spreadsheets

**Use PDF when:**
- Creating archival documents
- Sharing read-only snapshots
- Professional presentation required
- Printing is intended

## Troubleshooting

### Issue: Export Command Not Recognized

**Cause:** AI service not properly configured or command syntax unclear

**Solution:**
- Ensure Azure OpenAI service is properly configured
- Use clear, specific export command (e.g., "Export to Excel")
- Check that Smart DataGrid has data to export

### Issue: Exported File Not Found

**Cause:** Export completed but file location unclear

**Solution:**
- Check default downloads folder
- Look in application's working directory
- Verify export permissions in application
- Check file system notifications

### Issue: Wrong Format Exported

**Cause:** AI misinterpreted export format request

**Solution:**
- Use explicit format names (Excel, PDF)
- Avoid ambiguous commands
- Separate multiple exports into distinct commands
- Use "both" keyword for combined exports

## Common Prompts Reference

Quick reference for common export prompts:

```
# Excel Export
Export the DataGrid to Excel.
Export to Excel.

# PDF Export
Export the DataGrid to PDF.
Export to PDF.

# Combined Export
Export to both Excel and PDF.
Export the data to Excel and PDF.

# With Current Data State
Export the current filtered results to Excel.
Export the sorted data to PDF.
```
