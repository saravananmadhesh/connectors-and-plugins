# Popup Items and Templating — Syncfusion Angular DropDownButton

## Table of Contents
- [Icons on Popup Items](#icons-on-popup-items)
- [Navigation Links](#navigation-links)
- [Separator Items](#separator-items)
- [Item Templating with beforeItemRender](#item-templating-with-beforeitemrender)
- [itemTemplate Property](#itemtemplate-property)
- [Full Popup Templating with target](#full-popup-templating-with-target)
- [Grouping Items with ListView](#grouping-items-with-listview)
- [Underlining a Character in Item Text](#underlining-a-character-in-item-text)

---

## Icons on Popup Items

Each `ItemModel` in the `items` array can display an icon using its own `iconCss` property. The icon is placed to the left of the item text by default.

```typescript
@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <button ejs-dropdownbutton [items]="items" content="Message" iconCss="ddb-icons e-message"></button>
  `
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Edit',         iconCss: 'ddb-icons e-edit' },
    { text: 'Delete',       iconCss: 'ddb-icons e-delete' },
    { text: 'Mark As Read', iconCss: 'ddb-icons e-read' },
    { text: 'Like Message', iconCss: 'ddb-icons e-like' }
  ];
}
```

---

## Navigation Links

Set the `url` property on an `ItemModel` to make it a navigation link. The item renders as an anchor (`<a>`) tag pointing to the URL. Use `beforeItemRender` to open links in a new tab.

```typescript
import { Component } from '@angular/core';
import { DropDownButtonModule, ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <button ejs-dropdownbutton [items]="items" content="Shop By"
      iconCss="e-cart-icon e-shopping"
      (beforeItemRender)="onItemBeforeRender($event)">
    </button>
  `
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Flipkart', iconCss: 'e-cart-icon e-link', url: 'https://www.google.co.in/search?q=flipkart' },
    { text: 'Amazon',   iconCss: 'e-cart-icon e-link', url: 'https://www.google.co.in/search?q=amazon' },
    { text: 'Snapdeal', iconCss: 'e-cart-icon e-link', url: 'https://www.google.co.in/search?q=snapdeal' }
  ];

  onItemBeforeRender(args: MenuEventArgs) {
    // Open links in a new tab
    const anchor = args.element.getElementsByTagName('a')[0];
    if (anchor) anchor.setAttribute('target', '_blank');
  }
}
```

---

## Separator Items

Add a horizontal divider between groups of popup items by including an `ItemModel` with `separator: true`. Separators are not selectable.

```typescript
public items: ItemModel[] = [
  { text: 'Cut',       iconCss: 'e-db-icons e-cut' },
  { text: 'Copy',      iconCss: 'e-icons e-copy' },
  { text: 'Paste',     iconCss: 'e-db-icons e-paste' },
  { separator: true },
  { text: 'Font',      iconCss: 'e-db-icons e-font' },
  { text: 'Paragraph', iconCss: 'e-db-icons e-paragraph' }
];
```

---

## Item Templating with beforeItemRender

Use the `beforeItemRender` event to customize each popup item's HTML while it is being rendered. The event fires for each item and gives you access to the `li` element and the `ItemModel`.

```typescript
import { Component } from '@angular/core';
import { DropDownButtonModule, ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <button ejs-dropdownbutton [items]="items" content="Paste"
      iconCss="e-ddb-icons e-paste"
      iconPosition="Top"
      cssClass="e-vertical"
      (beforeItemRender)="onItemRender($event)">
    </button>
  `
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Edit' },
    { text: 'Cut' }
  ];

  onItemRender(args: MenuEventArgs) {
    if (args.item.text === 'Edit') {
      args.element.innerHTML =
        '<span></span><div><b>Paste Text</b><div>Provides option to paste only the<br>selected text.</div></div>';
      args.element.style.height = '80px';
      args.element.children[0].setAttribute('class', 'e-cm-icons e-pastetext e-align');
      args.element.children[1].setAttribute('class', 'e-div-align');
    } else {
      args.element.innerHTML =
        '<span></span><div><b>Paste Special</b><div>Provides options to paste formulas,<br> values, comments, validations etc...</div></div>';
      args.element.style.height = '80px';
      args.element.children[0].setAttribute('class', 'e-cm-icons e-pastespecial e-align');
      args.element.children[1].setAttribute('class', 'e-div-align');
    }
  }
}
```

---

## itemTemplate Property

The `itemTemplate` property accepts an Angular `TemplateRef` for declarative item rendering. This is cleaner than using `beforeItemRender` for complex layouts.

```typescript
import { Component } from '@angular/core';
import { DropDownButtonModule, ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [DropDownButtonModule, CommonModule],
  template: `
    <button ejs-dropdownbutton [items]="items" content="DropdownButton" [itemTemplate]="itemTemplate"></button>

    <ng-template #itemTemplate let-data>
      <div>
        <span class="e-menu-icon {{ data.iconCss }}"></span>
        <ng-container *ngIf="data.url; else textOnly">
          <span><a [href]="data.url" target="_blank" rel="noopener noreferrer">{{ data.text }}</a></span>
        </ng-container>
        <ng-template #textOnly>
          <span>{{ data.text }}</span>
        </ng-template>
      </div>
    </ng-template>
  `
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Home',       iconCss: 'e-icons e-home' },
    { text: 'Search',     iconCss: 'e-icons e-search', url: 'http://www.google.com' },
    { text: 'Yes / No',   iconCss: 'e-icons e-check-box' },
    { text: 'Text',       iconCss: 'e-icons e-caption' },
    { separator: true },
    { text: 'Syncfusion', iconCss: 'e-icons e-mouse-pointer', url: 'http://www.syncfusion.com' }
  ];
}
```

---

## Full Popup Templating with target

Replace the entire popup with a custom HTML element by providing a DOM element or CSS selector to the `target` property. The target element becomes the popup content.

```typescript
@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <div id="target" style="border: 1px solid #999;">
      <table>
        <caption style="height:18px; background-color:#e0e0e0;"><b>Insert Table</b></caption>
        <tr *ngFor="let row of [1,2,3,4,5,6]" class="e-row">
          <td *ngFor="let col of [1,2,3,4,5,6]" class="e-data"></td>
        </tr>
      </table>
    </div>
    <button ejs-dropdownbutton target="#target" content="Table"
      iconCss="e-icons e-table"
      iconPosition="Top"
      cssClass="e-vertical">
    </button>
  `
})
export class AppComponent {}
```

Use `target` when you need a completely custom popup layout (e.g., a color picker, calendar, or table grid).

---

## Grouping Items with ListView

To show grouped items with category headers, use a Syncfusion `ListView` as the popup `target`. The `groupBy` field setting in ListView creates the header rows.

```typescript
import { Component } from '@angular/core';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';

@Component({
  standalone: true,
  imports: [DropDownButtonModule, ListViewModule],
  template: `
    <ejs-listview id="listview" [dataSource]="data" [fields]="field" showCheckBox="true"></ejs-listview>
    <button ejs-dropdownbutton target="#listview" iconCss="e-icons e-down" cssClass="e-caret-hide"></button>
  `
})
export class AppComponent {
  public data: Object[] = [
    { text: 'Print',         id: 'data1', category: 'Customize Quick Access Toolbar' },
    { text: 'Save As',       id: 'data2', category: 'Customize Quick Access Toolbar' },
    { text: 'Update Folder', id: 'data3', category: 'Customize Quick Access Toolbar' },
    { text: 'Reply',         id: 'data4', category: 'Customize Quick Access Toolbar' }
  ];

  public field: Object = { text: 'text', groupBy: 'category' };
}
```

---

## Underlining a Character in Item Text

Use the `beforeItemRender` event to insert HTML tags into the rendered item's `innerHTML`. For example, wrap a character with `<u>` to underline it:

```typescript
import { Component } from '@angular/core';
import { DropDownButtonModule, ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <button ejs-dropdownbutton [items]="items" content="Clipboard"
      (beforeItemRender)="onItemRender($event)">
    </button>
  `
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];

  onItemRender(args: MenuEventArgs) {
    if (args.item.text === 'Copy') {
      args.element.innerHTML = '<u>C</u>opy';
    }
  }
}
```

> Note: When using `enableHtmlSanitizer` (default `true`), direct `innerHTML` manipulation in `beforeItemRender` is not affected — the sanitizer only applies to the `content` and `items[].text` properties rendered by the component itself.
