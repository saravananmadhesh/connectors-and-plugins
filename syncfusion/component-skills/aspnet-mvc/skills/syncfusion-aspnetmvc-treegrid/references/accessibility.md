# Accessibility in Tree Grid

## Table of Contents
- [When to Use This](#when-to-use-this)
- [Compliance & Standards](#compliance--standards)
- [WAI-ARIA Attributes Used](#wai-aria-attributes-used)
- [Keyboard Interaction](#keyboard-interaction)
- [Testing & Tools](#testing--tools)
- [Accessibility Best Practices](#accessibility-best-practices)
- [Notes & References](#notes--references)

## When to Use This

Use the accessibility guidance when you need to:
- Ensure your Tree Grid meets WCAG/Section 508 requirements
- Provide keyboard-only navigation and screen-reader support
- Confirm ARIA roles/attributes are present for hierarchical data
- Validate accessibility with automated tools before release

## Compliance & Standards

The Tree Grid follows accessibility standards including:
- WCAG 2.2 (AA)
- Section 508
- WAI-ARIA patterns for `treegrid`

It reports support for keyboard navigation, RTL, color contrast, and mobile usage.

## WAI-ARIA Attributes Used

Common ARIA attributes applied by the component:
- `role="treegrid"` — identifies the tree grid widget
- `aria-selected` — reflects selection state
- `aria-expanded` — indicates expanded/collapsed nodes
- `aria-sort` — indicates column sort order
- `aria-busy` — indicates loading state
- `aria-invalid` — marks invalid input fields
- `aria-grabbed` — used for draggable elements
- `aria-owns` — expresses ownership relationships
- `aria-label` — provides accessible names for controls/icons

## Keyboard Interaction

The Tree Grid implements keyboard interactions following ARIA patterns. Key supported actions include (selection):
- Navigation: `Arrow` keys, `Home`, `End`, `PageUp`, `PageDown`
- Selection: `Enter`, `Shift+Arrow`, `Ctrl+A`
- Sorting & multi-sort: `Enter`, `Ctrl+Enter` on header cells
- Expand/Collapse: `Ctrl+Shift+Down/Up`, `Ctrl+Down/Up`
- Printing: `Ctrl+P`

Refer to the component docs for the complete key mapping.

## Testing & Tools

Syncfusion validates accessibility using automated tools such as:
- `accessibility-checker`
- `axe-core`

## Accessibility Best Practices

- Ensure data cell templates escape or sanitize user content to avoid confusing AT.
- Provide meaningful column headers and use `aria-label` where required.
- Test with screen readers (NVDA, VoiceOver) and keyboard-only flows.
- Validate color contrast and RTL layouts in your theme.

## Notes & References
- This document summarizes the Tree Grid accessibility features and supported ARIA attributes.
