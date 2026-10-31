# Smart Editing Features in Syncfusion Angular Rich Text Editor

## Table of Contents
- [Mentions (@user tagging)](#mentions-user-tagging)
- [Emoji Picker](#emoji-picker)
- [Slash Command Menu](#slash-command-menu)
- [Mail Merge](#mail-merge)

---

## Mentions (@user tagging)

Integrates the Syncfusion `Mention` component (`@syncfusion/ej2-angular-dropdowns`) with the RTE. When users type `@`, a suggestion list appears.

**Required package:** `@syncfusion/ej2-angular-dropdowns`

```typescript
import { Component } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';
import {
  RichTextEditorModule,
  ToolbarService, HtmlEditorService, ImageService,
  LinkService, QuickToolbarService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  imports: [RichTextEditorModule, MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-richtexteditor
      id="mention_integration"
      placeholder="Type @ to mention someone">
    </ejs-richtexteditor>

    <ejs-mention
      [dataSource]="users"
      target="#mention_integration_rte-edit-view"
      [fields]="fields"
      [minLength]="1"
      popupWidth="250px"
      popupHeight="200px">
    </ejs-mention>
  `,
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService]
})
export class AppComponent {
  public users = [
    { Name: 'Alice', Email: 'alice@example.com' },
    { Name: 'Bob', Email: 'bob@example.com' },
    { Name: 'Carol', Email: 'carol@example.com' }
  ];
  public fields = { text: 'Name' };
}
```

> **Key:** The Mention component's `target` must be set to `#<rte-id>_rte-edit-view` — appending `_rte-edit-view` to the RTE's `id`.

**Using with IFrame editor:**
```typescript
// When RTE uses iframeSettings, assign target dynamically in (created) event
@ViewChild('rte') rteObj!: RichTextEditorComponent;
@ViewChild('mention') mentionObj!: Mention;

created(): void {
  this.mentionObj.target = this.rteObj.inputElement;
}
```

**minLength — delay suggestion until N chars typed:**
```html
<ejs-mention [minLength]="3" ...></ejs-mention>
```

---

## Emoji Picker

Requires `EmojiPickerService` in providers. Add `EmojiPicker` to toolbar items.

```typescript
import { Component } from '@angular/core';
import {
  RichTextEditorModule, ToolbarSettingsModel, EmojiSettingsModel,
  ToolbarService, HtmlEditorService, ImageService,
  LinkService, QuickToolbarService, EmojiPickerService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  imports: [RichTextEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-richtexteditor
      [toolbarSettings]="tools"
      [emojiPickerSettings]="emojiSettings">
    </ejs-richtexteditor>
  `,
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService,
              QuickToolbarService, EmojiPickerService]
})
export class AppComponent {
  public tools: ToolbarSettingsModel = {
    items: ['EmojiPicker', 'Bold', 'Italic', '|', 'Undo', 'Redo']
  };

  // Optional: customize emoji categories and icons
  public emojiSettings: EmojiSettingsModel = {
    iconsSet: [
      {
        name: 'Smilies & People',
        code: '1F600',
        iconCss: 'e-emoji',
        icons: [
          { code: '1F600', desc: 'Grinning face' },
          { code: '1F603', desc: 'Grinning face with big eyes' },
          { code: '1F604', desc: 'Grinning face with smiling eyes' },
          { code: '1F602', desc: 'Face with tears of joy' }
        ]
      },
      {
        name: 'Animals & Nature',
        code: '1F435',
        iconCss: 'e-animals',
        icons: [
          { code: '1F436', desc: 'Dog face' },
          { code: '1F431', desc: 'Cat face' }
        ]
      }
    ]
  };
}
```

> Leave `emojiPickerSettings` unconfigured to use the default built-in emoji set.

---

## Slash Command Menu

Requires `SlashMenuService` in providers. Triggered when user types `/` at the beginning of a line.

```typescript
import { Component } from '@angular/core';
import {
  RichTextEditorModule, SlashMenuSettingsModel,
  ToolbarService, HtmlEditorService, LinkService,
  ImageService, QuickToolbarService, SlashMenuService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  imports: [RichTextEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-richtexteditor
      [slashMenuSettings]="slashSettings">
    </ejs-richtexteditor>
  `,
  providers: [ToolbarService, HtmlEditorService, LinkService, ImageService,
              QuickToolbarService, SlashMenuService]
})
export class AppComponent {
  public slashSettings: SlashMenuSettingsModel = {
    enable: true,
    items: [
      'Paragraph', 'Heading 1', 'Heading 2', 'Heading 3',
      'Heading 4', 'OrderedList', 'UnorderedList',
      'CodeBlock', 'Blockquote', 'Link', 'Image', 'Table'
    ],
    popupWidth: 300,
    popupHeight: 320
  };
}
```

**Adding custom slash menu items:**
```typescript
public slashSettings: SlashMenuSettingsModel = {
  enable: true,
  items: [
    'Paragraph', 'Heading 1',
    {
      text: 'Meeting Notes',
      description: 'Insert a meeting notes template',
      iconCss: 'e-icons e-notes',
      command: 'Custom',
      type: 'Basic',
      handler: () => {
        this.rteObj.executeCommand('insertHTML',
          '<h3>Meeting Notes</h3><ul><li>Attendees:</li><li>Discussion:</li><li>Actions:</li></ul>');
      }
    }
  ]
};
```

---

## Mail Merge

Mail merge inserts `{{placeholders}}` into the editor using custom toolbar buttons, then replaces them with actual data. There's no built-in `MailMerge` service — this is implemented with custom toolbar items and `executeCommand('insertHTML')`.

**Pattern:**

1. Add custom toolbar buttons (Insert Field, Merge Data) using `template`
2. Insert fields as `{{FieldName}}` using `executeCommand('insertHTML', ...)`
3. On merge, find/replace all placeholders with real data

```typescript
import { Component, ViewChild } from '@angular/core';
import {
  RichTextEditorModule, RichTextEditorComponent, ToolbarSettingsModel,
  ToolbarService, HtmlEditorService, LinkService, ImageService, SelectedEventArgs
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  imports: [RichTextEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-richtexteditor #rte [toolbarSettings]="tools"></ejs-richtexteditor>
    <ejs-dropdownbutton
      #insertField
      [items]="mergeFields"
      content="Insert Field"
      (select)="onFieldSelect($event)">
    </ejs-dropdownbutton>
    <button (click)="mergeData()">Merge Data</button>
  `,
  providers: [ToolbarService, HtmlEditorService, LinkService, ImageService]
})
export class AppComponent {
  @ViewChild('rte') rteObj!: RichTextEditorComponent;

  public mergeFields = [
    { text: 'First Name', id: 'FirstName' },
    { text: 'Last Name', id: 'LastName' },
    { text: 'Company', id: 'Company' }
  ];

  public mergeData = {
    FirstName: 'John', LastName: 'Smith', Company: 'Acme Inc.'
  };

  public tools: ToolbarSettingsModel = {
    items: ['Bold', 'Italic', '|', 'Undo', 'Redo']
  };

  onFieldSelect(args: SelectedEventArgs): void {
    // Insert placeholder at cursor position
    this.rteObj.executeCommand('insertHTML', `{{${args.item.id}}}`);
  }

  mergeData(): void {
    let content = this.rteObj.value || '';
    // Replace all {{FieldName}} with actual values
    Object.entries(this.mergeData).forEach(([key, value]) => {
      content = content.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });
    this.rteObj.value = content;
  }
}
```
