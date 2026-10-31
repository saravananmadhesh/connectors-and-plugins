# Conditional Formatting in Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable Conditional Formatting](#enable-conditional-formatting)
- [Configure Programmatically](#configure-programmatically)
- [Apply to All Fields](#apply-to-all-fields)
- [Apply to Specific Field](#apply-to-specific-field)
- [Apply to Specific Row/Column](#apply-to-specific-rowcolumn)
- [Condition Types](#condition-types)
- [Style Properties](#style-properties)
- [Open Dialog Programmatically](#open-dialog-programmatically)
- [Events](#events)

## Overview

Conditional Formatting allows customizing the appearance of pivot table value cells by applying styling based on specific conditions. You can modify:
- Background color
- Font color
- Font family
- Font size

This is useful for highlighting important values, identifying trends, and improving data visualization.

## Enable Conditional Formatting

Enable conditional formatting through the toolbar by setting required properties:

```html
<ejs-pivotview id="pivotview" width="100%" height="300" allowConditionalFormatting="true" 
    showFieldList="true" showToolbar="true" toolbar="@(new List<string>() { "ConditionalFormatting" })">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" 
                useGrouping="true"></e-field>
        </e-formatsettings>
        <e-drilledmembers>
            <e-field name="Country" items="@ViewBag.drilledMembers"></e-field>
        </e-drilledmembers>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year"></e-field>
            <e-field name="Order_Source" caption="Order Source"></e-field>
        </e-columns>
        <e-values>
            <e-field name="In_Stock" caption="In Stock"></e-field>
            <e-field name="Sold" caption="Units Sold"></e-field>
        </e-values>
        <e-filters>
            <e-field name="Product_Categories" caption="Product Categories"></e-field>
        </e-filters>
        <e-conditionalformatsettings>
            <e-format measure="In_Stock" conditions="LessThan" value1="5000">
                <e-fieldlist-style backgroundColor="#80cbc4" color="black" fontFamily="Tahoma" fontSize="12px" />
            </e-format>
            <e-format measure="Sold" conditions="Between" value1="3400" value2="40000">
                <e-fieldlist-style backgroundColor="#f48fb1" color="black" fontFamily="Tahoma" fontSize="12px" />
            </e-format>
        </e-conditionalformatsettings>
    </e-datasourcesettings>
    <e-gridSettings columnWidth="100"></e-gridSettings>
</ejs-pivotview>
```

**Key Properties:**
- `allowConditionalFormatting="true"` - Enables the feature
- `showToolbar="true"` - Displays the toolbar
- `toolbar="@(new List<string>() { "ConditionalFormatting" })"` - Adds ConditionalFormatting button to toolbar

Users click the "Conditional Formatting" icon to open the dialog and define rules.

## Configure Programmatically

Define formatting rules during initialization using `<e-conditionalformatsettings>`:

```html
<ejs-pivotview id="pivotview" allowConditionalFormatting="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sales" type="Sum"></e-field>
        </e-values>
        <e-conditionalformatsettings>
            <e-format measure="Sales" conditions="GreaterThan" value1="100000">
                <e-fieldlist-style backgroundColor="#FFE699" color="#000000" fontSize="14px"></e-fieldlist-style>
            </e-format>
        </e-conditionalformatsettings>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Condition Properties:**
- `measure` - Specifies the value field name
- `conditions` - Accepts condition types (LessThan, GreaterThan, Between, Equals, etc.)
- `value1` - Starting value for comparison
- `value2` - Ending value (for Between/NotBetween conditions)
- `<e-fieldlist-style>` - Contains style properties (backgroundColor, color, fontSize, etc.)

## Apply to All Fields

Format all value fields with the same rule by omitting `measure`:

```html
<e-conditionalformatsettings>
    <e-format conditions="GreaterThan" value1="50000">
        <e-fieldlist-style backgroundColor="#FFC7CE" color="#9C0006"></e-fieldlist-style>
    </e-format>
</e-conditionalformatsettings>
```

**Result:** Rule applies to every value field in the pivot table.

## Apply to Specific Field

Format only one value field:

```html
<e-conditionalformatsettings>
    <e-format measure="Sales" conditions="LessThan" value1="20000">
        <e-fieldlist-style backgroundColor="#C6EFCE" color="#006100"></e-fieldlist-style>
    </e-format>
</e-conditionalformatsettings>
```

**Measure Attribute:** Specify exact field name (case-sensitive).

## Apply to Specific Row/Column

Format specific row or column members using the `label` attribute:

```html
<e-conditionalformatsettings>
    <e-format label="USA" conditions="GreaterThan" value1="75000">
        <e-fieldlist-style backgroundColor="#FF6B6B" color="#FFFFFF" fontFamily="Arial"></e-fieldlist-style>
    </e-format>
</e-conditionalformatsettings>
```

**Label Attribute:** Uses header name (row/column member).

## Condition Types

Supported comparison operators:

| Operator | Description | Properties |
|----------|-------------|-----------|
| **Equals** | Exact match | value1 |
| **GreaterThan** | Value exceeds | value1 |
| **LessThan** | Value below | value1 |
| **GreaterThanOrEqualTo** | Value >= | value1 |
| **LessThanOrEqualTo** | Value <= | value1 |
| **NotEquals** | Not equal to | value1 |
| **Between** | Within range | value1, value2 |
| **NotBetween** | Outside range | value1, value2 |

### Between Condition Example:

```html
<e-conditionalformatsettings>
    <e-format measure="Sales" conditions="Between" value1="50000" value2="100000">
        <e-fieldlist-style backgroundColor="#FFFFCC"></e-fieldlist-style>
    </e-format>
</e-conditionalformatsettings>
```

## Style Properties

Apply formatting using attributes on the `<e-fieldlist-style>` element:

```html
<e-format measure="Sales" conditions="GreaterThan" value1="100000">
    <e-fieldlist-style backgroundColor="#FFE699"
                      color="#000000"
                      fontFamily="Arial"
                      fontSize="14px">
    </e-fieldlist-style>
</e-format>
```

### ApplyGrandTotals Option:

Control whether formatting applies to grand totals:

```html
<e-format measure="Sales" conditions="GreaterThan" value1="100000" applyGrandTotals="true">
    <e-fieldlist-style backgroundColor="#FFE699"></e-fieldlist-style>
</e-format>
```

## Open Dialog Programmatically

Open formatting dialog via external button:

```html
<button onclick="openConditionalFormatting()">Configure Formatting</button>

<script>
    function openConditionalFormatting() {
        var pivotObj = document.getElementById('pivotview').ej2_instances[0];
        pivotObj.showConditionalFormattingDialog();
    }
</script>
```

## Events

### ConditionalFormatting Event

Triggered when "ADD CONDITION" is clicked in the dialog:

```html
<ejs-pivotview id="pivotview" conditionalFormatting="onConditionalFormatting">
</ejs-pivotview>

<script>
    function onConditionalFormatting(args) {
        // Event parameters:
        // args.conditions - Operator type
        // args.label - Row/column member
        // args.measure - Value field name
        // args.value1 -  Start value
        // args.value2 - End value (Between conditions)
        // args.style - Applied styling
        
        console.log("Applying:", args.conditions, "to", args.measure);
    }
</script>
```

## Best Practices

- **Condition Types:** Use valid condition values (LessThan, GreaterThan, Between, Equals, etc.)
- **Style Attributes:** Use `backgroundColor`, `color`, `fontFamily`, `fontSize` attributes
- **Color contrast:** Ensure readability with sufficient contrast
- **Grand totals:** Use `applyGrandTotals="false"` to exclude summary rows
- **Performance:** Limit rules on large datasets
- **Accessibility:** Avoid color-only differentiation
- **Consistency:** Use uniform color schemes and naming conventions
- **Testing:** Verify with actual data before deployment
- **KPI visualization:** Use for highlighting important metrics and trends
- **Values only:** Apply to value fields primarily
- **Multiple conditions:** Add multiple `<e-field>` elements for multiple rules
