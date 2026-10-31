# Events in TextArea

## Table of Contents
- [created](#created)
- [input](#input)
- [change](#change)
- [focus](#focus)
- [blur](#blur)
- [destroyed](#destroyed)
- [Event Argument Types](#event-argument-types)

---

## created

Fires when the TextArea component is fully created and initialized. Use this to run setup logic that depends on the component being ready.

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments',
    created: () => {
        console.log('TextArea is ready');
    }
});
textareaObj.appendTo('#default');
```

---

## input

Fires **every time** the value changes — on each keystroke or paste. Use this for real-time reactions like character counts or live previews.

```typescript
import { TextArea, InputEventArgs } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Type here...',
    input: (args: InputEventArgs) => {
        console.log('Current value:', args.value);
    }
});
textareaObj.appendTo('#default');
```

---

## change

Fires when the content has **changed** and the TextArea **loses focus**. This is the standard event for capturing finalized user input. Does not fire if the value hasn't changed since focus was gained.

```typescript
import { TextArea, ChangedEventArgs } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments',
    change: (args: ChangedEventArgs) => {
        console.log('Final value:', args.value);
    }
});
textareaObj.appendTo('#default');
```

---

## focus

Fires when the TextArea **gains focus** — when the user clicks or tabs into it.

```typescript
import { TextArea, FocusInEventArgs } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments',
    focus: (args: FocusInEventArgs) => {
        console.log('TextArea focused');
    }
});
textareaObj.appendTo('#default');
```

---

## blur

Fires when the TextArea **loses focus** — when the user clicks away or tabs out.

```typescript
import { TextArea, FocusOutEventArgs } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments',
    blur: (args: FocusOutEventArgs) => {
        console.log('TextArea blurred');
    }
});
textareaObj.appendTo('#default');
```

---

## destroyed

Fires when the TextArea component is destroyed (via `destroy()` method).

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments',
    destroyed: () => {
        console.log('TextArea destroyed');
    }
});
textareaObj.appendTo('#default');
```

---

## Event Argument Types

| Event | Argument Type | Import |
|---|---|---|
| `created` | `Object` | — |
| `input` | `InputEventArgs` | `@syncfusion/ej2-inputs` |
| `change` | `ChangedEventArgs` | `@syncfusion/ej2-inputs` |
| `focus` | `FocusInEventArgs` | `@syncfusion/ej2-inputs` |
| `blur` | `FocusOutEventArgs` | `@syncfusion/ej2-inputs` |
| `destroyed` | `Object` | — |

---

## Choosing Between `input` and `change`

| Scenario | Use |
|---|---|
| Real-time character count | `input` |
| Live preview of typed content | `input` |
| Capture final value when user done | `change` |
| Form validation on blur | `change` |
| Auto-save after user finishes typing | `change` |
