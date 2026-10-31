# API Reference – Syncfusion Angular Message

**Source:** https://ej2.syncfusion.com/angular/documentation/api/message/index-default  
**Package:** `@syncfusion/ej2-angular-notifications`  
**Selector:** `ejs-message`  
**Class:** `MessageComponent`

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Type References](#type-references)

---

## Properties

### content
`string | object`  
**Default:** `null`

Specifies the content to be displayed in the Message component. It can be a paragraph, a list, or any other HTML element. Can also be provided via `<ng-template #content>` inside the component tag.

```html
<ejs-message content="Please read the comments carefully"></ejs-message>
```

---

### cssClass
`string`  
**Default:** `''`

Specifies one or more CSS classes (space-separated) to append to the root element of the Message component. Use this to customize the message appearance or apply alignment helpers.

Built-in alignment classes: `e-content-center`, `e-content-right`

```html
<ejs-message cssClass="e-content-center custom-msg" severity="Warning" content="License expiring soon"></ejs-message>
```

---

### enablePersistence
`boolean`  
**Default:** `false`

Enable or disable persisting the component's state between page reloads.

```html
<ejs-message [enablePersistence]="true" content="State will persist on reload"></ejs-message>
```

---

### enableRtl
`boolean`  
**Default:** `false`

Enable or disable rendering the component in right-to-left direction. Used for RTL language support (Arabic, Hebrew, etc.).

```html
<ejs-message [enableRtl]="true" content="نص عربي" severity="Info"></ejs-message>
```

---

### locale
`string`  
**Default:** `''`

Overrides the global culture and localization value for this component. The default global culture is `'en-US'`.

```html
<ejs-message locale="fr-FR" content="Un message en français"></ejs-message>
```

---

### severity
`string | Severity`  
**Default:** `Severity.Normal` (`'Normal'`)

Specifies the severity of the message. Controls the icon displayed and the color scheme applied.

| Value | Description |
|-------|-------------|
| `'Normal'` | Neutral, default style |
| `'Info'` | Blue informational style |
| `'Success'` | Green success style |
| `'Warning'` | Yellow/orange warning style |
| `'Error'` | Red error style |

```html
<ejs-message severity="Error" content="A problem occurred while submitting your data"></ejs-message>
```

---

### showCloseIcon
`boolean`  
**Default:** `false`

Shows or hides the close icon in the Message component. When the end user clicks the close icon, the message hides and the `closed` event is triggered.

```html
<ejs-message [showCloseIcon]="true" severity="Warning" content="Network issue detected"></ejs-message>
```

---

### showIcon
`boolean`  
**Default:** `true`

Shows or hides the severity icon in the Message component. When `true`, the icon is displayed at the left edge of the component. The icon changes based on the `severity` property.

```html
<ejs-message [showIcon]="false" severity="Info" content="No icon shown"></ejs-message>
```

---

### variant
`string | Variant`  
**Default:** `Variant.Text` (`'Text'`)

Specifies the variant from predefined appearance variants.

| Value | Description |
|-------|-------------|
| `'Text'` | Text color + light background (default) |
| `'Outlined'` | Text color + border, no background |
| `'Filled'` | Text color + dark background |

```html
<ejs-message variant="Filled" severity="Success" content="Operation completed"></ejs-message>
```

---

### visible
`boolean`  
**Default:** `true`

Shows or hides the entire Message component. Set to `false` to hide; set back to `true` to show.

```typescript
// Programmatically restore a dismissed message
@ViewChild('msg') msg!: MessageComponent;

reopenMessage(): void {
  this.msg.visible = true;
}
```

```html
<ejs-message #msg [visible]="isVisible" severity="Info" content="This can be toggled"></ejs-message>
```

---

## Methods

### destroy()
**Returns:** `void`

Removes the Message component from the DOM and detaches all bound events. Also removes component attributes and classes.

```typescript
@ViewChild('msg') msg!: MessageComponent;

removeMessage(): void {
  this.msg.destroy();
}
```

> After calling `destroy()`, the component instance is no longer usable. For hiding/showing, use the `visible` property instead.

---

### getPersistData()
**Returns:** `string`

Returns a JSON string of the persisted state properties of the Message component. Used internally when `enablePersistence` is `true`.

```typescript
@ViewChild('msg') msg!: MessageComponent;

logPersistedState(): void {
  const state = this.msg.getPersistData();
  console.log(state);
}
```

---

## Events

### closed
**Type:** `EmitType<MessageCloseEventArgs>`

Triggers when the Message component is closed (i.e., the user clicks the close icon). Requires `showCloseIcon` to be `true`.

```html
<ejs-message [showCloseIcon]="true" severity="Warning" (closed)="onClosed($event)">
  Network issue detected
</ejs-message>
```

```typescript
onClosed(args: any): void {
  console.log('Message closed');
}
```

See [Type References](#type-references) for `MessageCloseEventArgs`.

---

### created
**Type:** `EmitType<Object>`

Triggers when the Message component is created and rendered successfully.

```html
<ejs-message (created)="onCreated()">Message content</ejs-message>
```

```typescript
onCreated(): void {
  console.log('Message component created');
}
```

---

### destroyed
**Type:** `EmitType<Event>`

Triggers when the Message component is destroyed via the `destroy()` method.

```html
<ejs-message (destroyed)="onDestroyed()">Message content</ejs-message>
```

```typescript
onDestroyed(): void {
  console.log('Message component destroyed');
}
```

---

## Type References

### MessageCloseEventArgs

The argument passed to the `closed` event handler.

| Property | Type | Description |
|----------|------|-------------|
| *(base Event properties)* | — | Standard browser/Angular event properties |

> The `closed` event payload is of type `MessageCloseEventArgs`. Import from `@syncfusion/ej2-angular-notifications` if you need to type the handler parameter:

```typescript
import { MessageCloseEventArgs } from '@syncfusion/ej2-angular-notifications';

onClosed(args: MessageCloseEventArgs): void {
  // handle close
}
```

---

### Severity Enum

```typescript
// Equivalent string values
type Severity = 'Normal' | 'Info' | 'Success' | 'Warning' | 'Error';
```

---

### Variant Enum

```typescript
// Equivalent string values
type Variant = 'Text' | 'Outlined' | 'Filled';
```
