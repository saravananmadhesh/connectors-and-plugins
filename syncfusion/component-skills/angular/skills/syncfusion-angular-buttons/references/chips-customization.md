# Chip Customization

## Table of Contents
- [Predefined Styles](#predefined-styles)
- [Leading Icon](#leading-icon)
- [Leading Icon URL](#leading-icon-url)
- [Avatar Image](#avatar-image)
- [Avatar Text](#avatar-text)
- [Trailing Icon](#trailing-icon)
- [Trailing Icon URL](#trailing-icon-url)
- [Outline Chip](#outline-chip)
- [Custom Template](#custom-template)
- [HTML Attributes](#html-attributes)
- [Disabled State](#disabled-state)
- [RTL Support](#rtl-support)

---

## Predefined Styles

Apply semantic color styles using the `cssClass` property on `e-chip` or `ejs-chiplist`.

| Class | Meaning |
|-------|---------|
| `e-primary` | Primary action or important chip |
| `e-success` | Positive / success status |
| `e-info` | Informational / neutral content |
| `e-warning` | Caution or warning |
| `e-danger` | Error, negative, or destructive action |

```typescript
import { Component } from '@angular/core';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  selector: 'app-styled-chips',
  standalone: true,
  imports: [ChipListModule],
  template: `
    <ejs-chiplist id="styled-chips">
      <e-chips>
        <e-chip text="Primary" cssClass="e-primary"></e-chip>
        <e-chip text="Success" cssClass="e-success"></e-chip>
        <e-chip text="Info" cssClass="e-info"></e-chip>
        <e-chip text="Warning" cssClass="e-warning"></e-chip>
        <e-chip text="Danger" cssClass="e-danger"></e-chip>
      </e-chips>
    </ejs-chiplist>
  `
})
export class StyledChipsComponent {}
```

- Apply `cssClass` on `e-chip` for per-chip styling, or on `ejs-chiplist` to apply to all chips.

---

## Leading Icon

Place an icon to the left of the chip text using `leadingIconCss`. Define the CSS class with a background image.

```typescript
import { Component } from '@angular/core';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  selector: 'app-leading-icon-chips',
  standalone: true,
  imports: [ChipListModule],
  template: `
    <ejs-chiplist id="leading-icon-chips">
      <e-chips>
        <e-chip text="Andrew" leadingIconCss="andrew"></e-chip>
        <e-chip text="Janet" leadingIconCss="janet"></e-chip>
        <e-chip text="Laura" leadingIconCss="laura"></e-chip>
        <e-chip text="Margaret" leadingIconCss="margaret"></e-chip>
      </e-chips>
    </ejs-chiplist>
  `
})
export class LeadingIconChipsComponent {}
```

CSS to define each icon class:
```css
.andrew {
  background-image: url('path/to/andrew.png');
}
.janet {
  background-image: url('path/to/janet.png');
}
```

- `leadingIconCss` — CSS class applied to the leading icon element.

---

## Leading Icon URL

Provide a direct image URL for the leading icon using `leadingIconUrl`:

```html
<e-chip
  text="Profile"
  leadingIconUrl="https://example.com/images/profile.png"
></e-chip>
```

- Useful when you don't want to define CSS background-image classes.
- `leadingIconUrl` sets the `src` of an image element inside the chip.

---

## Avatar Image

Display a circular avatar image using `avatarIconCss`. The CSS class defines the avatar's background image.

```typescript
import { Component } from '@angular/core';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  selector: 'app-avatar-chips',
  standalone: true,
  imports: [ChipListModule],
  template: `
    <ejs-chiplist id="avatar-chips">
      <e-chips>
        <e-chip text="Andrew" avatarIconCss="andrew"></e-chip>
        <e-chip text="Janet" avatarIconCss="janet"></e-chip>
        <e-chip text="Laura" avatarIconCss="laura"></e-chip>
        <e-chip text="Margaret" avatarIconCss="margaret"></e-chip>
      </e-chips>
    </ejs-chiplist>
  `
})
export class AvatarChipsComponent {}
```

CSS:
```css
.andrew {
  background-image: url('path/to/andrew.png');
}
```

- `avatarIconCss` renders the icon inside a circular avatar container (distinct from `leadingIconCss`).

---

## Avatar Text

Show initials or short labels inside a circular avatar using `avatarText`:

```typescript
import { Component } from '@angular/core';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  selector: 'app-avatar-text-chips',
  standalone: true,
  imports: [ChipListModule],
  template: `
    <ejs-chiplist id="avatar-text-chips">
      <e-chips>
        <e-chip text="Andrew" avatarText="A"></e-chip>
        <e-chip text="Janet" avatarText="J"></e-chip>
        <e-chip text="Laura" avatarText="L"></e-chip>
        <e-chip text="Margaret" avatarText="M"></e-chip>
      </e-chips>
    </ejs-chiplist>
  `
})
export class AvatarTextChipsComponent {}
```

- `avatarText` — ideal for user initials when avatar images aren't available.
- Renders text inside the circular avatar area.

---

## Trailing Icon

Add an icon to the right of the chip text using `trailingIconCss`:

```typescript
import { Component } from '@angular/core';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  selector: 'app-trailing-icon-chips',
  standalone: true,
  imports: [ChipListModule],
  template: `
    <ejs-chiplist id="trailing-icon-chips">
      <e-chips>
        <e-chip text="Andrew" trailingIconCss="e-dlt-btn"></e-chip>
        <e-chip text="Janet" trailingIconCss="e-dlt-btn"></e-chip>
        <e-chip text="Laura" trailingIconCss="e-dlt-btn"></e-chip>
        <e-chip text="Margaret" trailingIconCss="e-dlt-btn"></e-chip>
      </e-chips>
    </ejs-chiplist>
  `
})
export class TrailingIconChipsComponent {}
```

- `trailingIconCss` — applies a CSS class to the trailing icon element on the right side.
- Use `e-dlt-btn` for the built-in delete icon style.

---

## Trailing Icon URL

Provide a direct image URL for the trailing icon using `trailingIconUrl`:

```html
<e-chip
  text="Download"
  trailingIconUrl="https://example.com/icons/download.svg"
></e-chip>
```

---

## Outline Chip

Create chips with a visible border and transparent background using `cssClass="e-outline"`:

```typescript
import { Component } from '@angular/core';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  selector: 'app-outline-chips',
  standalone: true,
  imports: [ChipListModule],
  template: `
    <div>
      <ejs-chiplist id="outline-chips" cssClass="e-outline">
        <e-chips>
          <e-chip text="Chai"></e-chip>
          <e-chip text="Chang"></e-chip>
          <e-chip text="Aniseed Syrup"></e-chip>
          <e-chip text="Ikura"></e-chip>
        </e-chips>
      </ejs-chiplist>

      <ejs-chiplist id="outline-deletable" cssClass="e-outline" [enableDelete]="true">
        <e-chips>
          <e-chip text="Andrew"></e-chip>
          <e-chip text="Janet"></e-chip>
          <e-chip text="Laura"></e-chip>
          <e-chip text="Margaret"></e-chip>
        </e-chips>
      </ejs-chiplist>
    </div>
  `
})
export class OutlineChipsComponent {}
```

- Apply `cssClass="e-outline"` on the `ejs-chiplist` to outline all chips in the list.

---

## Custom Template

Use the `template` property on `e-chip` to fully customize the chip's inner HTML content:

```typescript
import { Component } from '@angular/core';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  selector: 'app-template-chips',
  standalone: true,
  imports: [ChipListModule],
  template: `
    <ejs-chiplist id="template-chips">
      <e-chips>
        <e-chip
          text="Breaking"
          template='<a href="https://example.com/news" target="_blank" class="chip-link">#BreakingNews</a><span class="chip-count">125k posts</span>'
        ></e-chip>
        <e-chip
          text="Photos"
          template='<a href="https://example.com/photos" target="_blank" class="chip-link">#PhotoOfTheDay</a>'
        ></e-chip>
      </e-chips>
    </ejs-chiplist>
  `
})
export class TemplateChipsComponent {}
```

- `template` accepts an HTML string and replaces the default chip content.
- Combine with `leadingIconCss` or `avatarIconCss` for richer layouts.
- Useful for chips that include links, badges, or custom sub-elements.

---

## HTML Attributes

Pass additional HTML attributes (e.g., `aria-label`, `title`, `data-*`) using `htmlAttributes`:

```html
<ejs-chiplist
  id="chip-accessible"
  [htmlAttributes]="{ 'aria-label': 'Contact chips', title: 'Team Members' }"
>
  <e-chips>
    <e-chip text="Andrew"></e-chip>
    <e-chip text="Janet"></e-chip>
  </e-chips>
</ejs-chiplist>
```

- `htmlAttributes` accepts `{ [key: string]: string }`.
- Useful for accessibility labels, test IDs, or custom data attributes.

---

## Disabled State

Disable the chip list so chips are visible but not interactive:

```html
<ejs-chiplist id="chip-disabled" [enabled]="false">
  <e-chips>
    <e-chip text="Disabled"></e-chip>
    <e-chip text="Not Clickable"></e-chip>
  </e-chips>
</ejs-chiplist>
```

---

## RTL Support

Enable right-to-left layout for RTL languages:

```html
<ejs-chiplist id="chip-rtl" [enableRtl]="true">
  <e-chips>
    <e-chip text="مرحبا"></e-chip>
    <e-chip text="العالم"></e-chip>
  </e-chips>
</ejs-chiplist>
```

- `[enableRtl]="true"` — flips the chip layout direction for Arabic, Hebrew, etc.
