# WebMCP Integration

## Table of Contents
- [Feature Overview](#feature-overview)
- [When to Use WebMCP Integration](#when-to-use-webmcp-integration)
- [Required Scheduler Configuration](#required-scheduler-configuration)
- [WebMCP Configuration](#webmcp-configuration)
- [Built-in WebMCP Tools](#built-in-webmcp-tools)
- [beforeWebMcpToolExecute Hook](#beforewebmcptoolexecute-hook)
- [Vue Examples](#vue-examples)
  - [WebMcpScheduler Module Injection](#webmcpscheduler-module-injection)
  - [enableWebMcp](#enablewebmcp)
  - [webMcpSettings](#webmcpsettings)
  - [Tool Filtering (Allowlist)](#tool-filtering-allowlist)
  - [Custom Prefix Configuration](#custom-prefix-configuration)
  - [exposedTo Configuration](#exposedto-configuration)
  - [beforeWebMcpToolExecute](#beforewebmcptoolexecute)
- [Dependencies and Prerequisites](#dependencies-and-prerequisites)
- [Constraints and Limitations](#constraints-and-limitations)
- [Validation Guidance](#validation-guidance)
- [AI Generation Guidance](#ai-generation-guidance)
- [Best Practices](#best-practices)

## Feature Overview
The WebMCP Integration enables an MCP-aware client to drive Scheduler actions by registering WebMCP tools and executing them against the same Scheduler instance.

When `enableWebMcp` is set to `true`, Scheduler registers the WebMCP tools defined by `webMcpSettings`.

## When to Use WebMCP Integration
Use this feature when you need an external agent (for example, an AI assistant) to:
- Create, update, or delete appointments in Scheduler
- Change the Scheduler view
- Navigate Scheduler dates
- Optionally approve/cancel tool execution via a pre-execution hook

## Required Scheduler Configuration
- Inject `WebMcpScheduler` as a module
- Set `enableWebMcp=true`
- Provide a `webMcpSettings` object (for prefixing and tool allowlisting)

## WebMCP Configuration
The relevant Scheduler properties are:

### `enableWebMcp`
- Type: boolean
- Behavior: when `true`, Scheduler registers WebMCP tools during its lifecycle.

### `webMcpSettings`
- Type: object
- Properties:
  - `name` (string): prefix used when registering tools (tool names follow the pattern `<prefix>_<toolName>`). If the prefix is empty (`""`), the tool name starts with an underscore (for example `_createEvent`). If the prefix is omitted, the adapter uses the Scheduler container element id as the prefix.
  - `tools` (string[] | WebMcpTool[]): allowlist of tool names to register. When you pass a `string[]`, it filters to only those built-in tool names.
  - `exposedTo` (string[]): optional allowlist of origins for cross-context access. If provided as a non-empty array, it is forwarded to the WebMCP registration.

## Built-in WebMCP Tools
The following built-in tools are supported (tool names are registered with the configured prefix):

- `createEvent`
  - Command args: `{ eventObj }`
- `updateEvent`
  - Command args: `{ eventObj }`
- `deleteEvent`
  - Command args: `{ eventObj }`
- `changeView`
  - Command args: `{ view }`
- `navigateDate`
  - Command args: `{ selectedDate }`

## beforeWebMcpToolExecute Hook
Scheduler exposes a pre-execution hook:
- Event: `beforeWebMcpToolExecute`
- Purpose: runs before the selected WebMCP tool executes.
- Cancellation behavior (verified): if your handler sets `args.cancel = true`, tool execution is cancelled and the tool result indicates that the user cancelled it.

## Vue Examples
The examples below follow common Scheduler Vue patterns: module injection via `provide('schedule', [...])`, and event/props wiring via `<ejs-schedule ...>`.

### WebMcpScheduler Module Injection
```vue
<template>
  <ejs-schedule />
</template>

<script setup lang="ts">
import { provide } from "vue";
import { WebMcpScheduler, Day, Week } from "@syncfusion/ej2-vue-schedule";

provide("schedule", [Day, Week, WebMcpScheduler]);
</script>
```

### enableWebMcp
```vue
<template>
  <ejs-schedule :enableWebMcp="true" :webMcpSettings="webMcpSettings" />
</template>
```

### webMcpSettings
```ts
const webMcpSettings = {
  name: "scheduleTools",
  tools: ["createEvent", "deleteEvent"],
};
```

### Tool Filtering (Allowlist)
```ts
const webMcpSettings = {
  name: "scheduleTools",
  tools: ["createEvent"],
};
```

### Custom Prefix Configuration
```ts
const webMcpSettings = {
  name: "mycustomprefix",
  tools: ["createEvent"],
};
// Expected registered tool name: mycustomprefix_createEvent
```

### exposedTo Configuration
```ts
const webMcpSettings = {
  name: "scheduleTools",
  tools: ["createEvent"],
  exposedTo: ["assistant"],
};
```

### beforeWebMcpToolExecute
```vue
<template>
  <ejs-schedule
    :enableWebMcp="true"
    :webMcpSettings="webMcpSettings"
    :beforeWebMcpToolExecute="onBeforeWebMcpToolExecute"
  />
</template>

<script setup lang="ts">
const onBeforeWebMcpToolExecute = (args: any) => {
  // args.cancel = true cancels the tool execution
  args.cancel = true;
};

const webMcpSettings = {
  name: "scheduleTools",
  tools: ["createEvent"],
};
</script>
```

### Vue Complete Example (enableWebMcp + beforeWebMcpToolExecute)
```vue
<template>
  <ejs-schedule
    :height="height"
    :selectedDate="selectedDate"
    :eventSettings="eventSettings"
    :enableWebMcp="true"
    :webMcpSettings="webMcpSettings"
    :beforeWebMcpToolExecute="beforeWebMcpToolExecute"
  />
</template>

<script>
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  WebMcpScheduler
} from '@syncfusion/ej2-vue-schedule';

export default {
  components: {
    'ejs-schedule': ScheduleComponent
  },

  provide: {
    schedule: [
      Day,
      Week,
      WorkWeek,
      Month,
      Agenda,
      WebMcpScheduler
    ]
  },

  data() {
    return {
      height: '650px',
      selectedDate: new Date(),
      eventSettings: {
        dataSource: []
      },
      webMcpSettings: {
        tools: [
          'createEvent',
          'updateEvent',
          'deleteEvent',
          'changeView',
          'navigateDate'
        ]
      }
    };
  },

  methods: {
    beforeWebMcpToolExecute(args) {
      if (args.toolName?.includes('deleteEvent')) {
        args.cancel = true;
      }
    }
  }
};
</script>
```

## Dependencies and Prerequisites
- The `WebMcpScheduler` module must be injected via Vue’s module injection (`provide('schedule', [...])`).
- WebMCP tool registration only occurs when `enableWebMcp` is enabled.

## Constraints and Limitations
- If `webMcpSettings.tools` is provided, only the allowlisted built-in tools are registered.
- Tool name prefixing affects the registered tool identifiers. Be consistent across your MCP client and UI.

## Validation Guidance
1. Set `enableWebMcp=true` to trigger tool registration.
2. Configure `webMcpSettings.name` to control tool name prefixing. Use `""` if you intentionally want no prefix (tool names start with `_`).
3. Configure `webMcpSettings.tools` as an allowlist (for example, only `createEvent`) to reduce agent surface area.
4. Configure `webMcpSettings.exposedTo` as a `string[]` when you need to restrict where tools are exposed.
5. In `beforeWebMcpToolExecute`, cancel execution by setting `args.cancel = true`.

## AI Generation Guidance
1. Ensure the Vue Scheduler instance injects `WebMcpScheduler` via `provide('schedule', [...])`.
2. Enable integration with `<ejs-schedule :enableWebMcp="true" ... />`.
3. Set `webMcpSettings` with:
   - `name` for tool prefixing
   - `tools` to allowlist built-in tools (for example `createEvent`/`deleteEvent`)
   - optional `exposedTo` for origin allowlisting
4. Add `beforeWebMcpToolExecute` to implement guardrails (for example, cancelling `createEvent` until user confirmation).
5. Do NOT document or rely on `registerWebMcpTools` as the recommended approach; prefer `enableWebMcp` + `webMcpSettings`.

## Best Practices
- Start with the smallest allowlist (for example, only `createEvent`) and expand tool coverage once you validate the workflow.
- Use a stable `webMcpSettings.name` so your MCP client can reliably target the same tool names across sessions.
- Keep `beforeWebMcpToolExecute` lightweight (validation/cancellation) and avoid long-running operations before the tool executes.
