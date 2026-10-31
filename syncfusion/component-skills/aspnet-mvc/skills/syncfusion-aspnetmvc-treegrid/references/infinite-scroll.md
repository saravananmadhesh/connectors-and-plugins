# Infinite Scroll in Tree Grid

## Table of Contents
- [When to Use This](#when-to-use-this)
- [Enable Infinite Scrolling](#enable-infinite-scrolling)
- [Initial Blocks & Cache Mode](#initial-blocks--cache-mode)
- [Limitations](#limitations)
- [Notes & References](#notes--references)

## When to Use This

Use infinite scrolling when you need to:
- Load very large datasets incrementally as the user scrolls
- Keep initial render time low while providing continuous scrolling
- Implement on-demand loading similar to lazy loading

## Enable Infinite Scrolling

Turn on infinite scroll using `EnableInfiniteScrolling(true)` on the Tree Grid.

```cshtml
@Html.EJS().TreeGrid("DefaultFunctionalities")
    .DataSource((IEnumerable<object>)ViewBag.datasource)
    .Columns(col => { /* columns */ })
    .Height(400)
    .ChildMapping("Children")
    .TreeColumnIndex(1)
    .EnableInfiniteScrolling(true)
    .Render()
```

## Initial Blocks & Cache Mode

- `InitialBlocks` (inside `InfiniteScrollSettings`) controls how many pages are loaded during initial render (default: 3).
- `EnableCache(true)` stores loaded row objects and can reuse them when scrolling back to visited pages; control retention using `MaxBlocks`.

```cshtml
.InfiniteScrollSettings(settings => { settings.InitialBlocks(5); settings.EnableCache(true); })
```

## Limitations

- Maximum records limited by browser element height capabilities.
- Initial loaded rows total height must exceed viewport height.
- Cell selection is not persisted in cache mode.
- Not compatible with: Batch editing, Cell editing, Detail template, Hierarchy features.
- Programmatic selection APIs like `selectRows`/`selectRow` are not supported.
- Infinite scroll requires records to be fully expanded at initial rendering (no collapsed rendering supported).

## Notes & References
- Infinite scrolling improves perceived performance for very large datasets but imposes UI limitations; choose virtualization or paging where appropriate.

