# Kanban Style and CSS Customization

## Table of Contents
- [Overview](#overview)
- [CSS Class Reference — Header](#css-class-reference--header)
- [CSS Class Reference — Content and Cards](#css-class-reference--content-and-cards)
- [CSS Class Reference — Swimlanes](#css-class-reference--swimlanes)
- [CSS Class Reference — Compact Table Selectors](#css-class-reference--compact-table-selectors)
- [Fixed / Sticky Header](#fixed--sticky-header)
- [Theme Studio](#theme-studio)

---

## Overview

To customize Kanban appearance, override the default CSS classes listed below.
All selectors are scoped under `.e-kanban` to prevent conflicts with other components.

Apply overrides in a `<style>` block (scoped or global) or in a separate CSS file imported after the theme.

```css
/* Example: increase card padding */
.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card {
  padding: 12px;
}
```

---

## CSS Class Reference — Header

| CSS Class | Purpose |
|---|---|
| `.e-kanban .e-kanban-table` | Customize the outer Kanban table. |
| `.e-kanban .e-kanban-header .e-header-cells` | All column header cells. |
| `.e-kanban .e-kanban-header .e-header-cells .e-header-wrap .e-header-title` | Column header title wrapper. |
| `.e-kanban .e-kanban-header .e-header-cells .e-header-text` | Column header label text. |
| `.e-kanban .e-kanban-header .e-header-cells .e-item-count` | Card count badge in column header. |
| `.e-kanban .e-kanban-header .e-header-cells .e-limits` | WIP limits container in column header (column constraint). |
| `.e-kanban .e-kanban-header .e-header-cells .e-limits .e-min-count` | Minimum WIP count label. |
| `.e-kanban .e-kanban-header .e-header-cells .e-limits .e-max-count` | Maximum WIP count label. |
| `.e-kanban .e-kanban-header .e-header-cells.e-min-color` | Header cell background when card count is below minimum. |
| `.e-kanban .e-kanban-header .e-header-cells.e-max-color` | Header cell background when card count exceeds maximum. |
| `.e-kanban .e-kanban-header .e-header-cells.e-collapsed.e-min-color` | Collapsed column header — below minimum (column constraint). |
| `.e-kanban .e-kanban-header .e-header-cells.e-collapsed.e-max-color` | Collapsed column header — above maximum (column constraint). |

---

## CSS Class Reference — Content and Cards

| CSS Class | Purpose |
|---|---|
| `.e-kanban .e-kanban-content` | Kanban content area (all columns). |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-limits` | WIP limits container per cell (swimlane constraint). |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-limits .e-min-count` | Minimum count label in cell. |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-limits .e-max-count` | Maximum count label in cell. |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells.e-min-color` | Cell background when below minimum. |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells.e-max-color` | Cell background when above maximum. |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells.e-collapsed .e-collapse-header-text` | Header text of a collapsed content cell. |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells.e-collapsed .e-collapse-header-text .e-item-count` | Card count inside collapsed content cell. |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-show-add-button` | "Add" button container inside a content cell. |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-show-add-button .e-show-add-icon` | "Add" button icon. |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-empty-card` | Placeholder shown in empty content cells. |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card` | Individual card element. |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card .e-card-header .e-card-header-title` | Card header title text. |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card .e-card-content` | Card body content area. |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card .e-card-footer` | Card footer area. |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card.e-card-color` | Card color/grabber stripe. |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card .e-card-tags` | Card tags container. |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card .e-card-tag` | Individual card tag label. |

---

## CSS Class Reference — Swimlanes

| CSS Class | Purpose |
|---|---|
| `.e-kanban .e-kanban-content .e-content-row.e-swimlane-row .e-content-cells .e-swimlane-header .e-swimlane-row-expand` | Expand icon for a collapsed swimlane row. |
| `.e-kanban .e-kanban-content .e-content-row.e-swimlane-row .e-content-cells .e-swimlane-header .e-swimlane-row-collapse` | Collapse icon for an expanded swimlane row. |
| `.e-kanban .e-kanban-content .e-content-row.e-swimlane-row .e-content-cells .e-swimlane-header .e-swimlane-text` | Swimlane row header label text. |
| `.e-kanban .e-kanban-content .e-content-row.e-swimlane-row .e-content-cells .e-swimlane-header .e-item-count` | Card count in the swimlane row header. |
| `.e-kanban .e-kanban-content .e-content-row:not(.e-swimlane-row) .e-content-cells` | Content cells inside a swimlane layout. |
| `.e-kanban .e-kanban-content .e-content-row:not(.e-swimlane-row) .e-content-cells.e-dropping` | Cell highlighted during card drop inside swimlane. |
| `.e-kanban .e-kanban-content .e-content-row:not(.e-swimlane-row) .e-content-cells .e-card-wrapper` | Card wrapper inside swimlane cell. |
| `.e-kanban .e-kanban-content .e-content-row:not(.e-swimlane-row) .e-content-cells.e-min-color` | Swimlane cell background when below minimum. |
| `.e-kanban .e-kanban-content .e-content-row:not(.e-swimlane-row) .e-content-cells.e-max-color` | Swimlane cell background when above maximum. |

---

## CSS Class Reference — Compact Table Selectors

Shorter selector variants that also work for common overrides:

| CSS Class | Purpose |
|---|---|
| `.e-kanban .e-kanban-table .e-header-cells` | Column header cells. |
| `.e-kanban .e-kanban-table .e-header-cells .e-header-text` | Column header text. |
| `.e-kanban .e-kanban-table .e-header-cells .e-item-count` | Card count in header. |
| `.e-kanban .e-kanban-table .e-header-cells .e-column-expand` | Toggle expand icon in column header. |
| `.e-kanban .e-kanban-table .e-header-cells .e-column-collapse` | Toggle collapse icon in column header. |
| `.e-kanban .e-kanban-table.e-content-table .e-content-row:not(.e-swimlane-row) .e-content-cells` | Content cells in swimlane layout. |
| `.e-kanban .e-kanban-table.e-content-table .e-content-row.e-swimlane-row .e-swimlane-text` | Swimlane header text. |
| `.e-kanban .e-kanban-table.e-content-table .e-content-row.e-swimlane-row .e-item-count` | Swimlane card count. |
| `.e-kanban .e-kanban-table.e-content-table .e-content-row .e-show-add-button .e-show-add-icon` | Add icon in content cells. |
| `.e-kanban .e-kanban-table.e-content-table .e-card.e-selection` | Currently selected card. |
| `.e-kanban .e-kanban-table.e-content-table .e-card .e-card-header` | Card header. |
| `.e-kanban .e-kanban-table.e-content-table .e-card .e-card-content` | Card body. |
| `.e-kanban .e-kanban-table.e-content-table .e-card .e-card-tag.e-card-label` | Card label tag. |

---

## Fixed / Sticky Header

Fix the Kanban header so it stays visible when scrolling the card content.

**Option 1 — Fixed height on content area:**

```css
.e-kanban .e-kanban-content {
  height: 500px;
}
```

> This constrains the scrollable area to 500 px. The header sits above it and remains visible.

**Option 2 — Sticky header CSS:**

```css
.e-kanban-header {
  position: -webkit-sticky;
  position: sticky;
  z-index: 100;
  top: 0;
}
```

> This does **not** affect the content area height — the header overlays the scroll viewport.

---

## Theme Studio

Use [Theme Studio](https://ej2.syncfusion.com/themestudio/?theme=material) to generate a custom CSS
theme for all Syncfusion components without writing CSS overrides manually.

1. Open Theme Studio and select a base theme (Material, Bootstrap, Fabric, High Contrast).
2. Adjust primary color, font size, and component-specific variables.
3. Download the generated CSS and import it instead of the default theme file.

```css
/* Replace default theme import with your custom theme */
@import './my-custom-theme.css';
```
