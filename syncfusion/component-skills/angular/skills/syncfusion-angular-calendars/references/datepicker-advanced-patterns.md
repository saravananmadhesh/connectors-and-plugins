# Advanced Patterns for DatePicker

## Overview
This reference describes advanced, real-world patterns: cascading date pickers, dynamic date ranges, blackout/unavailable dates, and recurring dates for bookings or scheduled events.

## Cascading Date Pickers

### Scenario
Choose a country → city → available booking date. When the city changes, available dates and min/max should update.

### Pattern
- Maintain a service with availability windows per city
- Subscribe to city changes and update `min`/`max` and a local blackout set used by `renderDayCell`

```typescript
selectedCity = 'NYC';
availabilityService.getAvailability(this.selectedCity).subscribe(range => {
  this.minDate = new Date(range.start);
  this.maxDate = new Date(range.end);
  // Keep a compact set of blackout timestamps for render checks
  this.blackoutTimestamps = (range.blackouts || []).map(d => +new Date(d));
});
```

### Considerations
- Debounce city changes when typed input used
- Show loading state in DatePicker while fetching availability

## Dynamic Date Ranges

### Scenario
Business rule: booking length depends on customer tier or promotion

### Pattern
- Compute `min` and `max` dynamically in component logic

```typescript
computeRange(customerTier) {
  const start = new Date();
  const end = new Date();
  if (customerTier === 'premium') {
    end.setDate(start.getDate() + 365);
  } else {
    end.setDate(start.getDate() + 90);
  }
  this.minDate = start;
  this.maxDate = end;
}
```

### Edge Cases
- Promo windows that depend on timezone — compute in UTC and convert for display
- Overlapping promos: merge ranges and compute union

### Date Blackouts & Unavailable Dates

### Scenario
Block maintenance periods, holidays, or custom blackout windows.

### Pattern
Use the `renderDayCell` event to customize or disable specific day cells when rendering the calendar. This avoids shipping large arrays of disabled dates and gives full control over presentation.

```html
<ejs-datepicker (renderDayCell)="onRenderDayCell($event)" [min]="minDate" [max]="maxDate"></ejs-datepicker>
```

```typescript
onRenderDayCell(args: any) {
  const date: Date = args.date;
  // Example: disable specific blackout dates by comparing timestamps
  const isBlackout = this.blackoutTimestamps?.includes(+date);
  if (isBlackout) {
    args.isDisabled = true; // mark cell disabled for rendering/selection
    args.cell.classList.add('e-disabled');
  }
}
```

### Considerations
- Use `renderDayCell` to compute per-cell state only for the visible window (current month ± 1 month) to avoid heavy computation.
- Provide accessible explanations for disabled dates via tooltips or adjacent helper text.

## Recurring Dates

### Scenario
Users need to pick dates that match a recurrence rule (e.g., every 1st Monday of the month) or avoid repeating unavailable patterns.

### Pattern
- Store recurrence rules server-side using RFC 5545 or a simplified rule set.

- Compute a list of invalid dates for the visible window and use the `renderDayCell` event to mark them disabled.

```typescript
// Example: generate upcoming occurrences for a monthly rule
function nextMonthlyOccurrences(start: Date, count: number) {
  const occurrences: Date[] = [];
  let current = new Date(start);
  for (let i = 0; i < count; i++) {
    occurrences.push(new Date(current));
    current.setMonth(current.getMonth() + 1);
  }
  return occurrences;
}

this.blackoutTimestamps = nextMonthlyOccurrences(new Date(2026, 0, 1), 12).map(d => +d);
```

### Edge Cases
- Recurrence across DST boundaries — compute in UTC then convert for presentation.
- Large recurrence sets: compute only visible window (current month ± 2 months).

## Testing & Validation
- Unit test blackout logic used by `renderDayCell` to ensure correct dates are disabled.
- E2E test selecting a date near a blackout window to ensure the UI prevents selection.
- Accessibility: ensure `aria-disabled` and explanatory text are present for blackout dates.

## Real-World Examples
- Venue booking: blackout maintenance windows + dynamic customer-tier-based maximum stay
- Event scheduling: recurring weekly sessions with exceptions (holidays)

## References
- Date manipulation libraries: `date-fns`, `luxon`
- Recurrence rule reference: RFC 5545 (iCalendar)
