# How-To Guides

## Table of Contents
- [Integrate Badge into ListView](#integrate-badge-into-listview)
- [Dynamic Badge Content](#dynamic-badge-content)

---

## Integrate Badge into ListView

Badges can be embedded directly in `ListViewComponent` item templates to display notification counts or status alongside list entries. The badge automatically scales to match the list item height — no manual size configuration is needed.

**When to use:** Email inboxes, notification panels, sidebar navigation with unread counts.

```ts
// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public dataSource: { [key: string]: any }[] = [
    { id: 'p_01', text: 'Primary', messages: '3 New', badge: 'e-badge e-badge-primary', icons: 'primary', type: 'Primary' },
    { id: 'p_02', text: 'Social', messages: '27 New', badge: 'e-badge e-badge-secondary', icons: 'social', type: 'Primary' },
    { id: 'p_03', text: 'Promotions', messages: '7 New', badge: 'e-badge e-badge-success', icons: 'promotion', type: 'Primary' },
    { id: 'p_04', text: 'Updates', messages: '13 New', badge: 'e-badge e-badge-info', icons: 'updates', type: 'Primary' },
    { id: 'p_05', text: 'Starred', messages: '', badge: '', icons: 'starred', type: 'All Labels' },
    { id: 'p_06', text: 'Important', messages: '2 New', badge: 'e-badge e-badge-danger', icons: 'important', type: 'All Labels' },
    { id: 'p_07', text: 'Sent', messages: '', badge: '', icons: 'sent', type: 'All Labels' },
    { id: 'p_08', text: 'Outbox', messages: '', badge: '', icons: 'outbox', type: 'All Labels' },
    { id: 'p_09', text: 'Drafts', messages: '7 New', badge: 'e-badge e-badge-warning', icons: 'draft', type: 'All Labels' }
  ];

  public fields: object = { groupBy: 'type' };
}
```

```html
<!-- src/app/app.component.html -->
<div class="sample_container badge-list">
  <ejs-listview
    id="lists"
    [dataSource]="dataSource"
    [fields]="fields"
    headerTitle="Inbox"
    [showHeader]="true"
  >
    <ng-template #template let-data>
      <div class="listWrapper" style="width: inherit; height: inherit;">
        <span class="{{data.icons}} list_svg">&nbsp;</span>
        <span class="list_text">{{ data.text }}</span>
        <span
          *ngIf="data.badge !== ''"
          [ngClass]="data.badge"
          style="float: right; margin-top: 16px; font-size: 12px;"
        >
          {{ data.messages }}
        </span>
      </div>
    </ng-template>
  </ejs-listview>
</div>
```

**Key points:**
- Store badge CSS classes in the data source (`badge` field) so each item controls its own badge color independently.
- Items without a badge have an empty string for the `badge` field — the template renders nothing in that case.
- Custom header behavior is optional in Angular and can be handled with component logic if needed.
- Install `@syncfusion/ej2-angular-lists` for `ListViewComponent`: `npm install @syncfusion/ej2-angular-lists --save`

---

## Dynamic Badge Content

Many applications need badge counts that update in response to user actions or incoming data. Because Badge is CSS-only, update the badge text content directly via DOM queries rather than through template re-render.

**When to use:** Inbox counters that increment on new messages, notification panels with live updates.

```ts
// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public dataSource: { [key: string]: any }[] = [
    { id: 'p_01', text: 'Primary', badge: 'e-badge e-badge-primary', icons: 'primary', type: 'Primary' },
    { id: 'p_02', text: 'Social', badge: 'e-badge e-badge-secondary', icons: 'social', type: 'Primary' },
    { id: 'p_03', text: 'Promotions', badge: 'e-badge e-badge-success', icons: 'promotion', type: 'Primary' },
    { id: 'p_04', text: 'Updates', badge: 'e-badge e-badge-info', icons: 'updates', type: 'Primary' },
    { id: 'p_05', text: 'Starred', badge: '', icons: 'starred', type: 'All Labels' },
    { id: 'p_06', text: 'Important', badge: 'e-badge e-badge-danger', icons: 'important', type: 'All Labels' },
    { id: 'p_07', text: 'Sent', badge: '', icons: 'sent', type: 'All Labels' },
    { id: 'p_08', text: 'Outbox', badge: '', icons: 'outbox', type: 'All Labels' },
    { id: 'p_09', text: 'Drafts', badge: 'e-badge e-badge-warning', icons: 'draft', type: 'All Labels' }
  ];

  public fields: object = { groupBy: 'type' };

  public values: { [key: string]: number } = {
    Primary: 3,
    Social: 27,
    Promotions: 7,
    Updates: 13,
    Drafts: 7,
    Important: 2
  };

  public increment(): void {
    const list = document.getElementById('lists');
    if (!list) {
      return;
    }
    const badgeElements = Array.prototype.slice.call(list.getElementsByClassName('e-badge'));
    badgeElements.forEach((element: HTMLElement) => {
      const count = Number(element.textContent?.split(' ')[0]);
      element.textContent = `${count + 1} New`;
    });
  }
}
```

```html
<!-- src/app/app.component.html -->
<div class="sample_container badge-list">
  <ejs-listview
    id="lists"
    [dataSource]="dataSource"
    [fields]="fields"
    headerTitle="Inbox"
    [showHeader]="true"
  >
    <ng-template #template let-data>
      <div class="listWrapper" style="width: inherit; height: inherit;">
        <span class="{{data.icons}} list_svg">&nbsp;</span>
        <span class="list_text">{{ data.text }}</span>
        <span
          *ngIf="data.badge !== ''"
          [ngClass]="data.badge"
          style="float: right; margin-top: 16px; font-size: 12px;"
        >
          {{ values[data.text] }} New
        </span>
      </div>
    </ng-template>
  </ejs-listview>
  <p class="crossline"></p>
  <span class="incr_button">
    <button class="e-btn e-primary" (click)="increment()">Increment Badge Count</button>
  </span>
</div>
```

**Key points:**
- Badge text follows the pattern `"{count} New"` — the increment splits on the space and parses the number.
- `getElementsByClassName('e-badge')` selects all badge elements within the list container by ID (`lists`).
- The template keeps badge rendering isolated and reusable across list items.
- For real-time updates (WebSockets, polling), call the same DOM-update logic inside your data handler instead of the button `increment()`.
