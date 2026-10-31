# Customization — Syncfusion Angular Mention

## Table of Contents
- [Show or Hide Mention Character](#show-or-hide-mention-character)
- [Adding a Suffix After Selection](#adding-a-suffix-after-selection)
- [Popup Dimensions](#popup-dimensions)
- [Custom Trigger Character](#custom-trigger-character)
- [Leading Space Requirement](#leading-space-requirement)
- [Highlight Matched Characters](#highlight-matched-characters)
- [Custom CSS Class](#custom-css-class)
- [Z-Index](#z-index)

---

## Show or Hide Mention Character

By default, the trigger character is **not** included in the inserted text. Use `showMentionChar` to prepend it to the selected value.

> **Default:** `showMentionChar` is `false`.

```typescript
import { Component } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <label>Comments</label>
    <div id="mentionElement" placeholder="Type @ and tag user"></div>
    <ejs-mention
      [dataSource]="userData"
      [showMentionChar]="mentionShow"
      [target]="mentionTarget"
      [fields]="fields">
    </ejs-mention>
  `
})
export class AppComponent {
  public userData: { [key: string]: Object }[] = [
    { Name: 'Selma Rose', EmailId: 'selma@gmail.com' },
    { Name: 'Maria', EmailId: 'maria@gmail.com' },
    { Name: 'Russo Kay', EmailId: 'russo@gmail.com' },
    { Name: 'Robert', EmailId: 'robert@gmail.com' },
    { Name: 'Garth', EmailId: 'garth@gmail.com' }
  ];
  public fields: Object = { text: 'Name' };
  public mentionTarget: string = '#mentionElement';
  public mentionShow: boolean = true;
}
```

---

## Adding a Suffix After Selection

Use `suffixText` to append text immediately after the inserted mention value. Common choices are a non-breaking space (`'&nbsp;'`) or a newline character.

> **Default:** `suffixText` is `null` (empty string, no suffix appended).

```typescript
import { Component } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <label>Comments</label>
    <div id="mentionElement" placeholder="Type @ and tag country"></div>
    <ejs-mention
      [dataSource]="userData"
      [showMentionChar]="mentionShow"
      [suffixText]="textSuffix"
      [target]="mentionTarget"
      [fields]="fields">
    </ejs-mention>
  `
})
export class AppComponent {
  public userData: { [key: string]: Object }[] = [
    { Country: 'Australia', Code: 'AU' },
    { Country: 'Bermuda', Code: 'BM' },
    { Country: 'Canada', Code: 'CA' },
    { Country: 'Cameroon', Code: 'CM' },
    { Country: 'Denmark', Code: 'DK' }
  ];
  public fields: Object = { text: 'Country' };
  public mentionTarget: string = '#mentionElement';
  public mentionShow: boolean = true;
  // Append a non-breaking space after the selected mention
  public textSuffix: string = '&nbsp;';
}
```

**Use cases for `suffixText`:**
- `'&nbsp;'` — add a space after the mention so the user can continue typing
- `'\n'` — move to the next line after inserting the mention

---

## Popup Dimensions

Use `popupHeight` and `popupWidth` to control the suggestion popup size.

- **Default height:** `'300px'`
- **Default width:** `'auto'` (adjusts to fit content)

```typescript
import { Component } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <label>Comments</label>
    <div id="mentionElement" placeholder="Type @ and tag sport"></div>
    <ejs-mention
      [dataSource]="sportsData"
      [fields]="fields"
      [target]="mentionTarget"
      [popupHeight]="height"
      [popupWidth]="width">
    </ejs-mention>
  `
})
export class AppComponent {
  public sportsData: { [key: string]: Object }[] = [
    { ID: 'game1', Game: 'Badminton' },
    { ID: 'game2', Game: 'Football' },
    { ID: 'game3', Game: 'Tennis' },
    { ID: 'game4', Game: 'Hockey' },
    { ID: 'game5', Game: 'Basketball' },
    { ID: 'game6', Game: 'Cricket' }
  ];
  public fields: Object = { text: 'Game' };
  public mentionTarget: string = '#mentionElement';
  // Constrain popup to 100px tall and 250px wide
  public height: string = '100px';
  public width: string = '250px';
}
```

---

## Custom Trigger Character

By default, `@` triggers the suggestion popup. Change it with `mentionChar`.

> `mentionChar` must be a single character.

```html
<!-- Use '#' as the trigger character -->
<ejs-mention
  [dataSource]="userData"
  [target]="mentionTarget"
  mentionChar="#">
</ejs-mention>
```

```typescript
// Or bind dynamically
public mentionCharacter: string = '#';
```

```html
<ejs-mention [mentionChar]="mentionCharacter" ...></ejs-mention>
```

---

## Leading Space Requirement

`requireLeadingSpace` controls whether a space is needed before the trigger character to open suggestions.

- **Default:** `true` — a space before `@` is required
- Set to `false` — allows `@mention` at the start of a line or immediately after other characters

```typescript
import { Component } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <label>Comments</label>
    <div id="mentionElement" placeholder="Type @ and tag user"></div>
    <ejs-mention
      [dataSource]="userData"
      [requireLeadingSpace]="false"
      [target]="mentionTarget"
      [fields]="fields">
    </ejs-mention>
  `
})
export class AppComponent {
  public userData: { [key: string]: Object }[] = [
    { Name: 'Selma Rose', EmailId: 'selma@gmail.com' },
    { Name: 'Maria', EmailId: 'maria@gmail.com' },
    { Name: 'Russo Kay', EmailId: 'russo@gmail.com' },
    { Name: 'Robert', EmailId: 'robert@gmail.com' },
    { Name: 'Garth', EmailId: 'garth@gmail.com' }
  ];
  public fields: Object = { text: 'Name' };
  public mentionTarget: string = '#mentionElement';
}
```

---

## Highlight Matched Characters

Use `highlight` to visually emphasize the matching characters in suggestion list items.

```html
<ejs-mention
  [dataSource]="userData"
  [highlight]="true"
  [target]="mentionTarget">
</ejs-mention>
```

---

## Custom CSS Class

Use `cssClass` to apply one or more CSS classes to the Mention component for styling or theming purposes.

```typescript
public customClass: string = 'custom-mention dark-theme';
```

```html
<ejs-mention [dataSource]="userData" [cssClass]="customClass" [target]="mentionTarget">
</ejs-mention>
```

---

## Z-Index

Use `zIndex` to control the stacking order of the suggestion popup. The default is `1000`.

```html
<ejs-mention [dataSource]="userData" [zIndex]="1500" [target]="mentionTarget">
</ejs-mention>
```

> Increase `zIndex` if the popup appears behind other overlays such as modals or dialogs.
