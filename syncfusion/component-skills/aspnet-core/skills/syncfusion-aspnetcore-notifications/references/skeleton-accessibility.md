# Skeleton Accessibility

## Table of Contents
- [Compliance Overview](#compliance-overview)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Using the label Attribute](#using-the-label-attribute)
- [RTL Support](#rtl-support)
- [Motion and Animation Accessibility](#motion-and-animation-accessibility)
- [Screen Reader Behavior](#screen-reader-behavior)

---

## Compliance Overview

The Syncfusion ASP.NET Core Skeleton component meets the following accessibility standards:

| Accessibility Criteria | Support |
|---|---|
| WCAG 2.2 | Full |
| Section 508 | Full |
| ADA | Full |
| Screen Reader | Full |
| Right-To-Left (RTL) | Full |
| Color Contrast | Full |
| Mobile Device | Full |
| Keyboard Navigation | Full |
| Accessibility Checker Validation | Full |
| Axe-core Validation | Full |

The component is validated using [accessibility-checker](https://www.npmjs.com/package/accessibility-checker) and [axe-core](https://www.npmjs.com/package/axe-core) during automated testing.

---

## WAI-ARIA Attributes

The Skeleton component implements the [WAI-ARIA status pattern](https://www.w3.org/WAI/ARIA/apg/patterns/status/) to communicate loading state to assistive technologies:

| Attribute | Value | Purpose |
|---|---|---|
| `role` | `"status"` | Identifies the element as a live status region announcing loading state |
| `aria-label` | Configurable via `label` attribute | Describes the skeleton's purpose or the content loading |
| `aria-live` | `"polite"` | Announces updates to screen readers when content replaces the skeleton |
| `aria-busy` | `"true"` while loading, `"false"` when done | Signals pending content to assistive technologies |

These attributes are applied automatically — no manual configuration needed.

---

## Using the label Attribute

The `label` attribute sets the `aria-label` value for the skeleton element. By default, it reads `"Loading..."`.

Customize `label` to describe the specific content being loaded, giving screen reader users meaningful context:

```cshtml
@* Default: announces "Loading..." *@
<ejs-skeleton id="sk_default" height="15px" width="60%"></ejs-skeleton>

@* Custom: announces "Loading user profile" *@
<ejs-skeleton id="sk_avatar" shape="Circle" width="48px" label="Loading user profile"></ejs-skeleton>

@* Custom: announces "Loading article image" *@
<ejs-skeleton id="sk_image" shape="Rectangle" width="100%" height="200px" label="Loading article image"></ejs-skeleton>
```

Providing descriptive labels is especially important in multi-skeleton layouts where each skeleton represents a different content element:

```cshtml
<div>
    <ejs-skeleton id="sk_a" shape="Circle" width="48px" label="Loading avatar"></ejs-skeleton>
    <ejs-skeleton id="sk_n" height="15px" width="60%" label="Loading user name"></ejs-skeleton>
    <ejs-skeleton id="sk_r" height="12px" width="40%" label="Loading user role"></ejs-skeleton>
</div>
```

---

## RTL Support

Enable right-to-left rendering using the `enableRtl="true"` attribute. This mirrors the shimmer animation direction and flips the layout for RTL languages (Arabic, Hebrew, etc.):

```cshtml
<ejs-skeleton id="sk_rtl" height="15px" width="80%" enableRtl="true"></ejs-skeleton>
```

For a full RTL card skeleton:

```cshtml
@* ~/Pages/Index.cshtml *@
<div dir="rtl" style="padding: 16px;">
    <div style="display: flex; align-items: center; gap: 10px;">
        <ejs-skeleton id="sk_rtl_av" shape="Circle" width="48px" enableRtl="true" label="تحميل الصورة الرمزية"></ejs-skeleton>
        <div style="flex: 1;">
            <ejs-skeleton id="sk_rtl_n" height="15px" width="50%" enableRtl="true" label="تحميل الاسم"></ejs-skeleton>
            <br />
            <ejs-skeleton id="sk_rtl_r" height="12px" width="35%" enableRtl="true" label="تحميل الدور"></ejs-skeleton>
        </div>
    </div>
</div>
```

---

## Motion and Animation Accessibility

The Skeleton component's shimmer effects (Wave, Pulse, Fade) respect the `prefers-reduced-motion` CSS media query. Users who have configured their OS or browser to reduce motion will see minimal or no animation, maintaining accessibility without requiring any code changes.

This behavior is automatic — no extra configuration needed.

---

## Screen Reader Behavior

- Screen readers announce the skeleton's `aria-label` when the skeleton becomes visible (`aria-busy="true"`)
- When the skeleton is replaced with actual content, `aria-live="polite"` ensures the transition is announced without interrupting the user
- The `role="status"` landmark keeps skeleton announcements non-intrusive

For the best screen reader experience:
1. Set meaningful `label` values on each skeleton
2. Use conditional rendering to swap skeletons for real content once loaded
3. Avoid rapidly toggling `visible` on/off, which can produce excessive announcements
