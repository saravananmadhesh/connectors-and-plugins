# WebMCP Integration

Enable the Angular Scheduler to be driven by AI assistants and Model Context Protocol (MCP)-aware clients by exposing a set of typed tools that can create, update, delete, navigate, and view Scheduler events on demand.

**Package**: `@syncfusion/ej2-angular-schedule`

---

## Table of Contents

- [When to Read This Reference](#when-to-read-this-reference)
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Configuration](#configuration)
  - [`enableWebMcp` (Scheduler)](#enablewebmcp-scheduler)
  - [`webMcpSettings` (Scheduler)](#webmcpsettings-scheduler)
  - [`webMcpSettings.name` (Prefix)](#webmcpsettingsname-prefix)
  - [`webMcpSettings.tools` (Tool Filter)](#webmcpsettingstools-tool-filter)
  - [`webMcpSettings.exposedTo` (Origins)](#webmcpsettingsexposedto-origins)
- [`WebMcpScheduler` Module Injection](#webmcpscheduler-module-injection)
- [`beforeWebMcpToolExecute` Event](#beforewebmcptoolexecute-event)
- [Built-in WebMCP Tools](#built-in-webmcp-tools)
- [Tool Registration Flow](#tool-registration-flow)
- [Minimal Working Sample](#minimal-working-sample)
- [Samples by Scenario](#samples-by-scenario)
  - [Filter Registered Tools](#filter-registered-tools)
  - [Custom Prefix](#custom-prefix)
  - [`exposedTo` Origins](#exposedto-origins-sample)
  - [Cancel a Tool Call](#cancel-a-tool-call)
  - [Request a Confirmation Dialog](#request-a-confirmation-dialog)
- [Validation Rules and Constraints](#validation-rules-and-constraints)
- [Common Scenarios and Best Practices](#common-scenarios-and-best-practices)
- [Hallucination Prevention (for AI Assistants)](#hallucination-prevention-for-ai-assistants)

---

## When to Read This Reference

Read this reference when you need to:

- Expose the Angular Scheduler as a set of typed tools for an AI assistant or MCP-aware client.
- Allow an external agent to create, update, delete, navigate, or change view in the Scheduler.
- Filter the list of registered tools to a specific allowlist (`createEvent`, `deleteEvent`, etc.).
- Set a custom prefix for tool names so multiple Scheduler instances can coexist in the same page.
- Restrict the tools to a list of allowed origins for cross-origin iframe access.
- Inspect, modify, or cancel a tool call from the application code via `beforeWebMcpToolExecute`.
- Request user confirmation in a dialog before a mutating tool is executed.

---

## Overview

WebMCP integration is configured with three complementary inputs:

- A boolean flag on the Scheduler — `enableWebMcp` — that turns the whole feature on or off.
- An object on the Scheduler — `webMcpSettings` — that exposes three sub-options:
  - `name` — the prefix applied to every registered tool name.
  - `tools` — the allowlist of tool names (or a list of fully customized `WebMcpTool` objects) to register.
  - `exposedTo` — the list of origins that are allowed to invoke the registered tools.
- A module that must be injected into the Scheduler — `WebMcpScheduler` — so the registration pipeline is wired up.

When `enableWebMcp` is `true` and the Scheduler renders, it notifies the `WebMcpScheduler` module which then registers the configured tools on `document.modelContext` (the global MCP bridge). The AI assistant can then invoke those tools to drive the Scheduler.

The tools are registered with the names you provide, with a `_` separator between the prefix and the base tool name. For example, with `name: 'schedule'` and the `createEvent` tool, the registered name is `schedule_createEvent`.

---

## Prerequisites

- `ScheduleComponent`, `EventSettingsModel`, and view services (`DayService`, `WeekService`, `MonthService`, etc.) imported from `@syncfusion/ej2-angular-schedule`.
- The `WebMcpScheduler` module provided in the component's `providers` array (or injected via `Schedule.Inject` when using the EJ2 class directly).
- An MCP-aware host page that exposes `document.modelContext.registerTool` (the global MCP bridge). Without it, registration is a no-op and the Scheduler continues to work normally.
- The `eventSettings.allowAdding`, `eventSettings.allowEditing`, and `eventSettings.allowDeleting` flags must be `true` for the mutating tools (`createEvent`, `updateEvent`, `deleteEvent`) to be allowed to dispatch against the Scheduler. If any of them is `false`, the tool returns an error envelope.

---

## Configuration

### `enableWebMcp` (Scheduler)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enableWebMcp` | `boolean` | `false` | When `true`, the WebMCP integration is enabled and the configured tools are registered on `document.modelContext` after the Scheduler is initialized. |

### `webMcpSettings` (Scheduler)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `webMcpSettings` | `SchedulerWebMcpSettingsModel` | `{}` | Holds the WebMCP registration options. Used only when `enableWebMcp` is `true`. |

The `SchedulerWebMcpSettingsModel` (importable from `@syncfusion/ej2-angular-schedule`) is described below.

#### `webMcpSettings.name` (Prefix)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `name` | `string \| null` | `null` | Prefix applied to every registered tool name. |

Prefix rules:

- If `name` is `null` or `undefined`, the component element's `id` is used as the prefix.
- If `name` is an empty string `''`, tools are registered without a prefix (for example, `_createEvent`).
- If `name` is a non-empty string, the registered name is `${name}_${baseToolName}` (for example, `schedule_createEvent`).

Setting a unique prefix is required when multiple Scheduler instances are rendered on the same page, so the registered tool names do not collide.

#### `webMcpSettings.tools` (Tool Filter)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `tools` | `string[] \| WebMcpTool[] \| null` | `null` | Allowlist of tools to register. |

Tool filter rules:

- If `tools` is `null` or `undefined`, all built-in tools are registered.
- If `tools` is a `string[]`, only the named built-in tools are registered (for example, `['createEvent', 'deleteEvent']`).
- If `tools` is a `WebMcpTool[]`, each entry is registered as a custom tool with the supplied `name`, `description`, `inputSchema`, `outputSchema`, `annotations`, and (optional) `execute` function.

#### `webMcpSettings.exposedTo` (Origins)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `exposedTo` | `string[] \| null` | `null` | List of origins allowed to invoke the registered tools. |

Origin rules:

- If `exposedTo` is `null` or `undefined`, or an empty array, the `exposedTo` option is **not** passed to `document.modelContext.registerTool`. The tools are exposed according to the host's default policy.
- If `exposedTo` is a non-empty `string[]`, the array is passed to `document.modelContext.registerTool` so the host can restrict which cross-origin callers are allowed to invoke the tool.

---

## `WebMcpScheduler` Module Injection

The `WebMcpScheduler` module is responsible for wiring the `getWebMcpTools` and `registerWebMcpTools` notification handlers and for talking to `document.modelContext`.

In Angular, inject it in the component's `providers` array alongside the view services:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService, WebMcpScheduler } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService, WebMcpScheduler],
  template: `<ejs-schedule ...></ejs-schedule>`
})
export class AppComponent { }
```

Without the `WebMcpScheduler` provider, the Scheduler can still set `enableWebMcp: true` and `webMcpSettings`, but the registration notification will not be handled and the tools will not appear in `document.modelContext`.

---

## `beforeWebMcpToolExecute` Event

The `beforeWebMcpToolExecute` event fires before any WebMCP tool is dispatched against the Scheduler. It lets the application inspect the tool, modify the arguments, request a confirmation dialog, or cancel the call entirely.

Event arguments (imported as `WebMcpToolExecuteEventArgs` from `@syncfusion/ej2-angular-schedule`):

| Field | Type | Description |
|-------|------|-------------|
| `toolName` | `string` | The registered name of the tool, including the prefix (for example, `schedule_createEvent`). |
| `toolArgs` | `object` | The arguments passed to the tool, matching the tool's `inputSchema`. |
| `cancel` | `boolean` | Set to `true` to cancel the tool execution. |
| `showConfirmationDialog` | `boolean` | Set to `true` to request a confirmation dialog before the tool runs. Skipped automatically for read-only tools. |
| `cancellationResponse` | `string` | Optional. Custom response message returned to the AI when the tool is cancelled. |

Wire it in the template with the standard Angular event binding:

```typescript
(beforeWebMcpToolExecute)="onBeforeWebMcpToolExecute($event)"
```

---

## Built-in WebMCP Tools

The following tools are registered by default. The base names (without the prefix) are the values you pass in `webMcpSettings.tools`.

| Tool name | Type | Description |
|-----------|------|-------------|
| `createEvent` | Mutating | Creates a new Scheduler event. |
| `updateEvent` | Mutating | Updates an existing Scheduler event matched by `Subject` (and optionally `StartTime` / `EndTime`). |
| `deleteEvent` | Mutating | Deletes an existing Scheduler event matched by `Subject` (and optionally `StartTime` / `EndTime`). |
| `changeView` | Read-only | Changes the current Scheduler view (`Day`, `Week`, `Month`, etc.). |
| `navigateDate` | Read-only | Navigates the Scheduler to a specific date. |

`createEvent`, `updateEvent`, and `deleteEvent` are the mutating tools. When `showConfirmationDialog` is requested in `beforeWebMcpToolExecute`, these three tools prompt the user; `changeView` and `navigateDate` always run without confirmation.

### `createEvent`

Required `eventObj` fields: `Subject`, `StartTime`, `EndTime`.

Optional `eventObj` fields: `IsAllDay`, `Location`, `Description`.

`StartTime` and `EndTime` must be ISO 8601 strings, for example `2026-04-08T09:00:00`.

### `updateEvent`

Required `eventObj` fields: `Subject` (used to locate the event).

Optional identification fields: `StartTime`, `EndTime` (used to narrow down the match).

Optional update fields (each `New*` field is applied only when supplied): `NewSubject`, `NewStartTime`, `NewEndTime`, `IsAllDay`, `Location`, `Description`.

### `deleteEvent`

Required `eventObj` fields: `Subject` (used to locate the event).

Optional identification fields: `StartTime`, `EndTime` (used to narrow down the match).

### `changeView`

Required field: `view`. The accepted values are the standard Scheduler view names: `Day`, `Week`, `WorkWeek`, `Month`, `Agenda`, `MonthAgenda`, `TimelineDay`, `TimelineWeek`, `TimelineWorkWeek`, `TimelineMonth`, `Year`, `TimelineYear`.

### `navigateDate`

Required field: `selectedDate`. Accepts an ISO 8601 date or date-time string, for example `2026-04-08` or `2026-04-08T09:00:00`.

---

## Tool Registration Flow

When `enableWebMcp` is `true` and the Scheduler is rendered:

1. The Scheduler fires a `registerWebMcpTools` notification with `prefix: settings.name`, `tools: settings.tools`, and `exposedTo: settings.exposedTo`.
2. The `WebMcpScheduler` module receives the notification, creates a new `AbortController`, resolves the tool list (filtering by `settings.tools` if supplied), and registers each tool on `document.modelContext` with the prefixed name and the abort signal.
3. The `exposedTo` option is forwarded to `registerTool` only when `settings.exposedTo` is a non-empty array.
4. When the Scheduler is destroyed, the `AbortController` is aborted, all listeners are removed, and the parent reference is cleared.

---

## Minimal Working Sample

The simplest end-to-end example: enable WebMCP, register a custom prefix, restrict the registration to a single tool, and bind a `beforeWebMcpToolExecute` listener.

```typescript
import { Component } from '@angular/core';
import {
    ScheduleModule,
    EventSettingsModel,
    SchedulerWebMcpSettingsModel
} from '@syncfusion/ej2-angular-schedule';
import {
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    MonthAgendaService,
    WebMcpScheduler,
    WebMcpToolExecuteEventArgs
} from '@syncfusion/ej2-angular-schedule';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ScheduleModule],
    providers: [
        DayService,
        WeekService,
        WorkWeekService,
        MonthService,
        MonthAgendaService,
        WebMcpScheduler
    ],
    template: `
        <ejs-schedule
            id="schedule"
            width="100%"
            height="650px"
            [selectedDate]="selectedDate"
            [eventSettings]="eventSettings"
            [enableWebMcp]="true"
            [webMcpSettings]="webMcpSettings"
            (beforeWebMcpToolExecute)="onBeforeWebMcpToolExecute($event)">
            <e-views>
                <e-view option="Day"></e-view>
                <e-view option="Week"></e-view>
                <e-view option="WorkWeek"></e-view>
                <e-view option="Month"></e-view>
                <e-view option="MonthAgenda"></e-view>
            </e-views>
        </ejs-schedule>
    `
})
export class AppComponent {
    public selectedDate: Date = new Date(2024, 10, 1);

    public eventSettings: EventSettingsModel = {
        dataSource: [
            {
                Id: 1,
                Subject: 'Team Meeting',
                StartTime: new Date(2024, 10, 1, 10, 0),
                EndTime: new Date(2024, 10, 1, 11, 0)
            }
        ]
    };

    public webMcpSettings: SchedulerWebMcpSettingsModel = {
        name: 'schedule',
        tools: ['createEvent', 'deleteEvent']
    };

    public onBeforeWebMcpToolExecute(args: WebMcpToolExecuteEventArgs): void {
        // Inspect, modify, or cancel the tool call here.
    }
}
```

The CSS imports are the standard ones used by every Scheduler reference; no extra styles are required for WebMCP.

---

## Samples by Scenario

### Filter Registered Tools

Pass a `string[]` of base tool names in `webMcpSettings.tools` to register only the listed tools.

```typescript
public webMcpSettings: SchedulerWebMcpSettingsModel = {
    name: 'schedule',
    tools: ['createEvent', 'deleteEvent']
};
```

`updateEvent`, `changeView`, and `navigateDate` will not be registered in this example.

### Custom Prefix

Set `webMcpSettings.name` to a non-empty string. The registered tool names will be `${name}_${baseToolName}`.

```typescript
public webMcpSettings: SchedulerWebMcpSettingsModel = {
    name: 'myCalendar',
    tools: ['createEvent', 'updateEvent', 'deleteEvent', 'changeView', 'navigateDate']
};
```

With the example above, the registered names are `myCalendar_createEvent`, `myCalendar_updateEvent`, `myCalendar_deleteEvent`, `myCalendar_changeView`, and `myCalendar_navigateDate`. A unique prefix is required when multiple Scheduler instances are rendered on the same page.

### `exposedTo` Origins Sample

Pass a non-empty `string[]` in `webMcpSettings.exposedTo` to forward the list of allowed origins to `document.modelContext.registerTool`.

```typescript
public webMcpSettings: SchedulerWebMcpSettingsModel = {
    name: 'schedule',
    tools: ['createEvent', 'deleteEvent'],
    exposedTo: ['https://assistant.example.com', 'https://mcp.example.com']
};
```

When `exposedTo` is omitted or empty, the option is **not** passed to the host; the host's default cross-origin policy is used.

### Cancel a Tool Call

Set `args.cancel = true` from the `beforeWebMcpToolExecute` listener. Optionally provide `args.cancellationResponse` to return a custom message to the AI.

```typescript
public onBeforeWebMcpToolExecute(args: WebMcpToolExecuteEventArgs): void {
    if (args.toolName === 'schedule_deleteEvent') {
        args.cancel = true;
        args.cancellationResponse = 'Deletion is disabled for this Scheduler.';
    }
}
```

When `args.cancel` is `true` and `args.cancellationResponse` is not provided, a default cancellation message is returned.

### Request a Confirmation Dialog

Set `args.showConfirmationDialog = true` to prompt the user before the mutating tool runs. The dialog is skipped automatically for `changeView` and `navigateDate`.

```typescript
public onBeforeWebMcpToolExecute(args: WebMcpToolExecuteEventArgs): void {
    if (
        args.toolName === 'schedule_createEvent' ||
        args.toolName === 'schedule_updateEvent' ||
        args.toolName === 'schedule_deleteEvent'
    ) {
        args.showConfirmationDialog = true;
    }
}
```

If the user dismisses the dialog, the tool is cancelled and a `cancelled` response is returned to the AI.

---

## Validation Rules and Constraints

- The `WebMcpScheduler` provider must be present in the component's `providers` array. Without it, `enableWebMcp` and `webMcpSettings` are accepted but no tool registration happens.
- `enableWebMcp` must be `true` for the `webMcpSettings` object to be applied. With `enableWebMcp: false` (the default), the `webMcpSettings` object is ignored.
- When `webMcpSettings.tools` is omitted or `null`, all built-in tools (`createEvent`, `updateEvent`, `deleteEvent`, `changeView`, `navigateDate`) are registered.
- When `webMcpSettings.tools` is a `string[]`, only the named tools are registered. Unknown names are silently ignored.
- When `webMcpSettings.tools` is a `WebMcpTool[]`, each entry is registered as a custom tool. The `name` you provide is the **base** name; the `WebMcpScheduler` module still prepends the prefix when registering.
- When `webMcpSettings.exposedTo` is `null` or an empty array, the option is **not** forwarded to `document.modelContext.registerTool`.
- The mutating tools require `eventSettings.allowAdding`, `eventSettings.allowEditing`, and `eventSettings.allowDeleting` (respectively) to be `true`. The tool returns an error envelope when the corresponding flag is `false`.
- A unique `webMcpSettings.name` (or a unique component `id` when `name` is `null`) is required when multiple Scheduler instances are rendered on the same page, so the registered tool names do not collide.
- The tool names in `args.toolName` (inside `beforeWebMcpToolExecute`) include the prefix. Compare against the prefixed name (for example, `schedule_createEvent`), not the base name.

---

## Common Scenarios and Best Practices

- **Always provide a custom prefix when multiple Schedulers are rendered on the same page.** Use the component's purpose as the prefix (for example, `'hrCalendar'`, `'teamCalendar'`) to keep tool names unique.
- **Restrict the registered tools with `webMcpSettings.tools`** when the AI should only be able to perform a subset of operations. For example, a read-only bot should be registered with `['changeView', 'navigateDate']` only.
- **Forward `exposedTo` when the host application is embedded in a cross-origin iframe.** Pass the list of allowed parent origins so the host can enforce them.
- **Use `beforeWebMcpToolExecute` to gate mutating tools** with `args.showConfirmationDialog = true`. The dialog is the recommended pattern for any destructive or state-changing operation.
- **Use `args.cancellationResponse`** when the cancellation reason is application-specific. A clear message helps the AI recover instead of retrying blindly.
- **Match the tool name against the prefixed name** in `beforeWebMcpToolExecute` (for example, `schedule_createEvent`), not the base name. The `WebMcpScheduler` module strips the prefix before dispatching to the built-in handler, but the event listener always sees the prefixed name.
- **Do not call the deprecated `schedule.registerWebMcpTools(prefix, tools, exposedTo)` instance method from Angular code.** The recommended approach is to declare `enableWebMcp` and `webMcpSettings` on the component and let the `WebMcpScheduler` module handle the registration through the standard notification flow.
- **Provide a `Subject`, `StartTime`, and `EndTime` when the agent updates or deletes an event.** The matcher uses all three fields when present, so providing them avoids accidental matches on events that share a `Subject`.
- **Use ISO 8601 strings for `StartTime` and `EndTime`** in every tool call. The internal handler parses them with `new Date(...)`; passing non-ISO strings (for example, `"9:00 AM"`) is not supported.

---

## Hallucination Prevention (for AI Assistants)

- Only document the tools, events, and settings that are explicitly listed in this reference. Do not invent additional WebMCP-related fields, services, or events.
- The only public-facing WebMCP module name is `WebMcpScheduler`. Do not reference the older `WebMcpAdapter` name in samples, providers, or imports.
- The only public-facing settings model is `SchedulerWebMcpSettingsModel` with three fields: `name`, `tools`, and `exposedTo`. Do not add or rename fields.
- The only public-facing event for gating tools is `beforeWebMcpToolExecute`. Do not invent `afterWebMcpToolExecute` or similar events.
- The `WebMcpToolExecuteEventArgs` interface has exactly five fields: `toolName`, `toolArgs`, `cancel`, `showConfirmationDialog`, and `cancellationResponse`. Do not add or rename fields.
- The five built-in tool names are exactly `createEvent`, `updateEvent`, `deleteEvent`, `changeView`, and `navigateDate`. Do not invent additional tool names.
- The mutating tool allowlist (the only tools that honor `showConfirmationDialog`) is exactly `createEvent`, `updateEvent`, and `deleteEvent`. `changeView` and `navigateDate` never prompt.
- The recommended Angular pattern is to set `enableWebMcp` and `webMcpSettings` on the Scheduler, provide the `WebMcpScheduler` module, and bind `beforeWebMcpToolExecute` from the template. Do not call the instance `registerWebMcpTools(prefix, tools, exposedTo)` method from Angular code.
- The `webMcpSettings.name` field maps to the tool-name prefix. The `webMcpSettings.tools` field is the allowlist. The `webMcpSettings.exposedTo` field is the cross-origin allowlist. Do not describe `exposedTo` as a prefix or a tool filter.
- `webMcpSettings.exposedTo` is forwarded to `document.modelContext.registerTool` **only** when it is a non-empty array. Empty arrays and `null` are both equivalent to "do not pass the option". Do not claim that an empty array disables the feature; the host applies its default policy.
- When `webMcpSettings.name` is `null` or `undefined`, the component element's `id` is used. An empty string `''` produces a leading underscore (for example, `_createEvent`). Do not claim that `''` uses the component `id`.
- The `WebMcpScheduler` module must be listed in the component's `providers` array. Without it, `enableWebMcp` and `webMcpSettings` are accepted but no tool registration happens. Do not claim that the module is optional.
- `eventSettings.allowAdding`, `eventSettings.allowEditing`, and `eventSettings.allowDeleting` are read by the mutating tools. When the relevant flag is `false`, the tool returns an error envelope. Do not claim the mutating tools always succeed.
- The tool name passed to `beforeWebMcpToolExecute` includes the prefix (for example, `schedule_createEvent`). The internal handler strips the prefix before dispatching. Do not claim the listener sees the base name only.
- The CSS for the Scheduler is unchanged when WebMCP is enabled. Do not add or remove styles for the WebMCP feature.
