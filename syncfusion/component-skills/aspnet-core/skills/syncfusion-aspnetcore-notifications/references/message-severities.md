# Message Severity Levels

Severity communicates the importance and type of information in a message. The Message component uses the `severity` tag attribute to apply distinct icons and color schemes that help users quickly understand the message context.

## Available Severity Levels

| Severity | Value | Use Case |
|----------|-------|----------|
| Normal | `"Normal"` (default) | General information, neutral messages |
| Info | `"Info"` | Informational content, tips, guidance |
| Success | `"Success"` | Confirmation, completed operations, positive outcomes |
| Warning | `"Warning"` | Caution, potential issues, non-critical problems |
| Error | `"Error"` | Critical failures, invalid input, system errors |

## Basic Usage

Set the `severity` attribute to one of the five values. When omitted, `Normal` is used:

```cshtml
@* ~/Pages/Index.cshtml *@
<ejs-message id="msg_normal" content="Editing is restricted"></ejs-message>
<ejs-message id="msg_info" content="Please read the comments carefully" severity="Info"></ejs-message>
<ejs-message id="msg_success" content="Your message has been sent successfully" severity="Success"></ejs-message>
<ejs-message id="msg_warning" content="There was a problem with your network connection" severity="Warning"></ejs-message>
<ejs-message id="msg_error" content="A problem occurred while submitting your data" severity="Error"></ejs-message>
```

## Choosing the Right Severity

- **Normal** — Neutral context that doesn't require action (e.g., a read-only notice).
- **Info** — Background information the user should know, but no action required (e.g., a tooltip-style note).
- **Success** — Confirm an action completed correctly (e.g., form submitted, file uploaded).
- **Warning** — Alert the user to something that may become a problem (e.g., session expiring soon, low disk space).
- **Error** — Signal a failure that needs immediate attention (e.g., validation failed, network unreachable).

## Combining Severity with Variant

Severity works independently of the `variant` attribute. You can combine any severity with any variant:

```cshtml
@* Filled error — maximum visual emphasis *@
<ejs-message id="msg_fe" content="A problem occurred" severity="Error" variant="Filled"></ejs-message>

@* Outlined success — clear but not overwhelming *@
<ejs-message id="msg_os" content="Changes saved" severity="Success" variant="Outlined"></ejs-message>
```

See `message-variants.md` for full variant documentation.

## Dynamic Severity

Severity can be driven from a model value when iterating or using conditional Razor:

```cshtml
@* ~/Pages/Index.cshtml *@
@{
    var status = "success";
    var severityMap = new Dictionary<string, string>
    {
        { "success", "Success" },
        { "error",   "Error" },
        { "info",    "Info" }
    };
}
<ejs-message id="msg_status" content="Status: @status" severity="@severityMap[status]"></ejs-message>
```
