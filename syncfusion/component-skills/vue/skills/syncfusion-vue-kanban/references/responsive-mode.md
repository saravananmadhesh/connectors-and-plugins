# Kanban Responsive Mode

## Overview

The Kanban component automatically adapts its layout for small screens (mobile/tablet). No additional configuration is required — the responsive behavior is built-in and activates based on the browser viewport width.

## Mobile Layout — Default Board

On narrow screens:
- The **first column occupies ~80%** of the screen width; the **second column occupies ~20%**, acting as a visual hint that more columns exist
- Users **swipe left/right** to navigate between columns
- Users **tap and hold** a card to initiate drag-and-drop

## Mobile Layout — Swimlane Board

When swimlanes are enabled on mobile:
- A **menu icon** appears in the top-left corner of the board
- Tapping the menu icon opens a **popup listing all swimlane groups** by their header text
- Selecting a swimlane group filters the board to show only that swimlane's cards
- By default the first swimlane group is selected on load

## Scrolling

If the total number of columns exceeds the screen width, a horizontal scroll bar appears at the bottom of the content area, allowing users to scroll to hidden columns.

## Card Selection on Mobile

### Single Selection
Tapping a card once selects it. Tapping another card deselects the previous one.

### Multiple Selection
1. Enable `selectionType: 'Multiple'` in `cardSettings`
2. **Tap and hold** a card to select it — its header text appears in a top popup
3. Once one card is selected, additional cards can be selected with a **single tap**
4. The popup shows the count of selected cards when multiple are selected

```vue
<script setup>
const cardSettings = {
  contentField: 'Summary',
  headerField: 'Id',
  selectionType: 'Multiple',
};
</script>
```

## Notes

- Responsive behavior is automatic; there are no props to configure it
- The board uses CSS media queries and touch event detection internally
- For full touch drag-and-drop support, the `@syncfusion/ej2-base` touch module is included automatically with the kanban package
