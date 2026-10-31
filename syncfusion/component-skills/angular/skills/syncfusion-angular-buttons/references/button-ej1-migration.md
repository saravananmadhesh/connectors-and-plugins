# EJ1 to EJ2 API Migration — Syncfusion Angular Button

## Table of Contents
- [Overview](#overview)
- [Properties Migration](#properties-migration)
- [Methods Migration](#methods-migration)
- [Events Migration](#events-migration)
- [Key Differences Summary](#key-differences-summary)

---

## Overview

This guide describes the API changes when migrating from Syncfusion Essential JS 1 (`ej-button`) to Essential JS 2 (`ejs-button`) for the Angular Button component.

**EJ1 directive:** `ej-button`  
**EJ2 directive:** `ejs-button`

---

## Properties Migration

| Behavior | EJ1 Property | EJ2 Property |
|---|---|---|
| Button label text | `text="Button"` | `content="Button"` |
| Content type (text + image) | `contentType="TextAndImage"` | Not applicable — use `iconCss` |
| Button icon | `prefixIcon="e-icon e-save"` | `iconCss="e-icons e-save"` |
| Icon position | `imagePosition="ImageRight"` | `iconPosition="Right"` |
| Secondary icon | `suffixIcon="e-icon e-file-html"` | Not applicable |
| Custom CSS class | `cssClass="custom-class"` | `cssClass="custom-class"` (unchanged) |
| Button size (small) | `size="small"` | `cssClass="e-small"` |
| Rounded corners | `[showRoundedCorner]="true"` | Not applicable — use custom CSS |
| Width | `width="150px"` | Not applicable — use CSS |
| Height | `height="50px"` | Not applicable — use CSS |
| HTML attributes | `[htmlAttributes]="attributes"` | Not applicable |
| Primary appearance | Not applicable | `[isPrimary]="true"` |
| Toggle behavior | Not applicable | `[isToggle]="true"` |
| Disabled state | `[enabled]="false"` | `[disabled]="true"` |
| RTL direction | `[enableRTL]="true"` | `[enableRtl]="true"` |
| Repeat button | `[repeatButton]="true"` | Not applicable — implement manually |
| Repeat interval | `timeInterval="100"` | Not applicable — implement manually |
| Button type (HTML) | `type="Button"` | Not applicable — use HTML `type` attribute |

---

## Methods Migration

| Behavior | EJ1 Method | EJ2 Method |
|---|---|---|
| Destroy instance | `this.btnObj.destroy()` | `this.btnObj.destroy()` (unchanged) |
| Disable the button | `this.btnObj.disable()` | Not applicable — bind `[disabled]="true"` |
| Enable the button | `this.btnObj.enable()` | Not applicable — bind `[disabled]="false"` |

---

## Events Migration

| Behavior | EJ1 Event | EJ2 Event |
|---|---|---|
| Button click | `(click)="btnClick($event)"` | Not applicable — use native `(click)` |
| Component created | `(create)="onCreate($event)"` | `(created)="onCreated()"` |
| Component destroyed | `(destroy)="onDestroy($event)"` | Not applicable |

---

## Key Differences Summary

1. **`text` → `content`:** Label property renamed.
2. **`prefixIcon` → `iconCss`:** Icon CSS class property renamed; icon class format changed from `e-icon e-save` (EJ1) to `e-icons e-save` (EJ2).
3. **`imagePosition` → `iconPosition`:** Icon position property renamed; values simplified (`"ImageRight"` → `"Right"`).
4. **`[enabled]="false"` → `[disabled]="true"`:** Disabled logic inverted — EJ1 used `enabled` (default: true), EJ2 uses `disabled` (default: false).
5. **`enableRTL` → `enableRtl`:** Casing changed (RTL → Rtl).
6. **`size="small"` → `cssClass="e-small"`:** Size is now controlled via CSS class, not a separate property.
7. **`repeatButton` removed:** Repeat button behavior must be implemented manually using `mousedown`/`mouseup`/`touchstart`/`touchend` events with `setInterval`.
8. **`suffixIcon`, `htmlAttributes`, `width`, `height`, `showRoundedCorner`, `timeInterval` removed:** These EJ1-specific properties have no EJ2 equivalents.
9. **New in EJ2:** `isPrimary`, `isToggle`, `enableHtmlSanitizer`, `enablePersistence` are new properties with no EJ1 equivalent.
