# Node Types Overview

The TypeScript Headless Editor ships with built-in block and inline node types, each contributed by its own extension. The preset `basicExtensions` includes `document`, `paragraph`, `heading`, `blockquote`, `text`, `codeBlock`, `inlineCode`, `horizontalRule`, `hardBreak`, `list`, `taskList`, and `undoRedo`; other nodes such as `table`, `image`, `callout`, and `collapsible` are registered individually as needed.

This page is the index of every per-node reference file. Use it to locate the right file for a given feature; each per-node file contains the verbatim registration, attributes, options, commands, shortcuts, input rules, and related types for that single node.

## Per-node reference files

### Root
- 📄 [document.md](document.md) — `document` (the root container; auto-registered with `text`)

### Block nodes
- 📄 [paragraph.md](paragraph.md) — `paragraph` (default body block; supports `align`, `indent`, `htmlAttributes`)
- 📄 [heading.md](heading.md) — `heading` (levels 1–6; supports `level`, `align`, `indent`, `htmlAttributes`)
- 📄 [block-quote.md](block-quote.md) — `blockquote` (quoted content; supports `htmlAttributes`)
- 📄 [code-block.md](code-block.md) — `codeBlock` (`<pre><code>`; supports `language`, exit behavior, tab indentation)
- 📄 [list.md](list.md) — `bulletList`, `orderedList`, `listItem` (shared `listExtension`; supports `listStyleType`, `order`, `htmlAttributes`, `itemHtmlAttributes`)
- 📄 [task-list.md](task-list.md) — `taskList`, `taskItem` (checkable to-do lists; supports `checked`, `nested`, `htmlAttributes`)
- 📄 [horizontal-rule.md](horizontal-rule.md) — `horizontalRule` (leaf divider; supports `htmlAttributes`)

### Recursive containers (priority `10`)
- 📄 [callout.md](callout.md) — `callout` (highlighted info/warning/note/success/error/tip boxes; supports `variant`, `htmlAttributes`)
- 📄 [collapsible.md](collapsible.md) — `collapsible`, `collapsibleHeader`, `collapsibleBody` (expandable sections; supports `collapsed`, `htmlAttributes`)

### Standalone nodes (registered individually, not in `basicExtensions`)
- 📄 [table.md](table.md) — `table`, `tableRow`, `tableCell`, `tableHeader` (rows, columns, cells, headers, resize)
- 📄 [image.md](image.md) — `image` (block), `imageInline` (inline); supports captions, alignment, wrap, resize

### Inline nodes
- 📄 [text-node.md](text-node.md) — `text` (mandatory inline leaf; auto-registered)
- 📄 [hard-break.md](hard-break.md) — `hard_break` (inline `<br>` line break)

## Shared behavior across all nodes

Every per-node file in this skill uses the same structure:

1. **Register the extension** — `extensions: [nodeExtension]` (or `.configure({ ... })`) inside `HeadlessEditor.create({ extensions })`. Two nodes — `document` and `text` — have no options and are auto-registered; explicit registration is supported but not required.
2. **Node attributes** — schema attributes set on the node instance, mutated only through commands.
3. **Configure the extension** — options passed via `nodeExtension.configure({ ... })` at create-time. Most nodes expose an `htmlAttributes` field for static HTML attributes on the rendered element.
4. **Commands** — `editor.commands.<command>(payload)` or `editor.chain().<command>(payload).run()` for chaining.
5. **Keyboard shortcuts** — global or context-sensitive bindings. The default shortcut table for each feature lives in the matching per-node reference file's `## Keyboard shortcuts` section.
6. **Input rules** — markdown-style triggers at the start of an empty line (for example, `#`, `-`, `1.`, `>`, ``` ``` ```, `---`, `!!!`).

## Two auto-registered extensions to remember

These keymap extensions are registered automatically when their parent node extension is present, so they are not listed as separate per-node files:

- **`listKeymapExtension`** — auto-registered when either `listExtension` or `taskListExtension` is present. Enables list-navigation keys (<kbd>Tab</kbd>, <kbd>Shift</kbd> + <kbd>Tab</kbd>, <kbd>Enter</kbd>, <kbd>Backspace</kbd>) for bullet, ordered, and task lists. See [list.md](list.md) and [task-list.md](task-list.md).
- **`collapsibleKeymapExtension`** — auto-registered when `collapsibleExtension` is present. Enables <kbd>Enter</kbd>, <kbd>Backspace</kbd>, and <kbd>Delete</kbd> handling inside collapsible sections. See [collapsible.md](collapsible.md).

## Schema role of each node

The Headless Editor's schema classifies nodes into block, inline, leaf, and container roles. The table below mirrors the node classification in [document.md](document.md) — `## Block-level nodes` and `## Inline content`.

| Node | Schema role | File |
|---|---|---|
| `document` | Root container (block) | [document.md](document.md) |
| `paragraph` | Block | [paragraph.md](paragraph.md) |
| `heading` | Block | [heading.md](heading.md) |
| `blockquote` | Container (block) | [block-quote.md](block-quote.md) |
| `codeBlock` | Block | [code-block.md](code-block.md) |
| `bulletList` | Container (block) | [list.md](list.md) |
| `orderedList` | Container (block) | [list.md](list.md) |
| `taskList` | Container (block) | [task-list.md](task-list.md) |
| `table` | Container (block) | [table.md](table.md) |
| `tableRow` | Block | [table.md](table.md) |
| `tableCell` | Block | [table.md](table.md) |
| `callout` | Container (block) | [callout.md](callout.md) |
| `collapsible` | Container (block) | [collapsible.md](collapsible.md) |
| `image` | Leaf (block) | [image.md](image.md) |
| `imageInline` | Inline (leaf) | [image.md](image.md) |
| `horizontalRule` | Leaf (block) | [horizontal-rule.md](horizontal-rule.md) |
| `hardBreak` | Inline (leaf) | [hard-break.md](hard-break.md) |
| `text` | Inline (leaf) | [text-node.md](text-node.md) |

## Index of all node types

- [document.md](document.md)
- [paragraph.md](paragraph.md)
- [heading.md](heading.md)
- [block-quote.md](block-quote.md)
- [code-block.md](code-block.md)
- [list.md](list.md)
- [task-list.md](task-list.md)
- [text-node.md](text-node.md)
- [hard-break.md](hard-break.md)
- [horizontal-rule.md](horizontal-rule.md)
- [table.md](table.md)
- [image.md](image.md)
- [callout.md](callout.md)
- [collapsible.md](collapsible.md)
