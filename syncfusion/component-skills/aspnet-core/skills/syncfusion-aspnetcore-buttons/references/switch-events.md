# Switch Events & State Management

## Table of Contents
- [BeforeChange Event](#beforechange-event)
- [Change Event](#change-event)
- [Created Event](#created-event)
- [Preventing State Change](#preventing-state-change)

---

## BeforeChange Event

The `BeforeChange` event fires **before** the switch's state is altered. It allows you to intercept the toggle action and optionally cancel it. This is the correct event for conditional logic or validation before the state change is applied to the UI.

**Tag Helper:**
```cshtml
<ejs-switch id="switch1" BeforeChange="onBeforeChange"></ejs-switch>

<script>
    function onBeforeChange(args) {
        // args.cancel = true prevents the state from changing
        args.cancel = true;
    }
</script>
```

**The `args` object includes:**
- `args.cancel` — Set to `true` to cancel the state change.
- `args.checked` — The new state that would be applied (if not cancelled).

> Use `BeforeChange` for confirmation dialogs, validation checks, or any scenario where you need to decide programmatically whether to allow the toggle.

---

## Change Event

The `Change` event fires **after** the Switch state has been changed by user interaction. Use this event to react to confirmed state changes (e.g., trigger API calls, update UI).

**Tag Helper:**
```cshtml
<ejs-switch id="switch1" Change="onChange"></ejs-switch>

<script>
    function onChange(args) {
        console.log('Switch is now: ' + args.checked);
    }
</script>
```

 **The `args` object includes:**
- `args.checked` — The current state of the switch after the change (`true` = ON, `false` = OFF).

---

## Created Event

The `Created` event fires once the Switch component has finished rendering. Use it to execute initialization logic that depends on the switch being fully mounted in the DOM.

**Tag Helper:**
```cshtml
<ejs-switch id="switch1" Created="onCreated"></ejs-switch>

<script>
    function onCreated() {
        console.log('Switch component is ready.');
    }
</script>
```

---

## Preventing State Change

To prevent the Switch from toggling under specific conditions (e.g., user is not authorized, form validation fails), use the `BeforeChange` event and set `args.cancel = true`.

**Example – Prevent toggle when a condition is not met:**
```cshtml
<ejs-switch id="switch1" BeforeChange="checkPermission"></ejs-switch>

<script>
    function checkPermission(args) {
        var userHasPermission = false; // Replace with actual logic
        if (!userHasPermission) {
            args.cancel = true;
            alert('You do not have permission to change this setting.');
        }
    }
</script>
```

> **Tip:** Unlike `Change` (which fires after state change), `BeforeChange` fires before — making it the only correct event for preventing a toggle.
