# Events and Advanced Features in Timeline

## Overview
Timeline provides events for lifecycle hooks and supports advanced features like RTL, persistence, and localization.

## Events
### Created Event
Triggered after the Timeline is rendered:
```cshtml
<ejs-timeline id="timeline" created="onCreated">
    ...
</ejs-timeline>
<script>
    function onCreated(args) {
        // Custom logic after render
    }
</script>
```

### BeforeItemRender Event
Triggered before each item is rendered:
```cshtml
<ejs-timeline id="timeline" beforeItemRender="onBeforeItemRender">
    ...
</ejs-timeline>
<script>
    function onBeforeItemRender(args) {
        // args.element, args.index
    }
</script>
```

## RTL Support
Enable right-to-left layout:
```cshtml
<ejs-timeline id="timeline" enableRtl="true">
    ...
</ejs-timeline>
```

## Persistence
Persist state across reloads:
```cshtml
<ejs-timeline id="timeline" enablePersistence="true">
    ...
</ejs-timeline>
```

## Localization
Set the locale:
```cshtml
<ejs-timeline id="timeline" locale="fr-FR">
    ...
</ejs-timeline>
```

## Best Practices
- Use events for custom logic, not for layout changes.
- Always test event handlers for idempotency.
- Validate localization and RTL in all supported languages.
