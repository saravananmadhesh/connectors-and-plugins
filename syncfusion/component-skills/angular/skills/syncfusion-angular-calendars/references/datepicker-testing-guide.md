# Testing & Quality Assurance for DatePicker

## Overview
This guide shows how to test DatePicker implementations in Angular using unit tests (Jasmine/Karma), end-to-end tests (Cypress), and accessibility checks (axe-core). It includes examples for reactive forms, format parsing, range validation, keyboard navigation, and localization.

## Unit Testing (Jasmine + Karma)

### Goals
- Verify date parsing/formatting logic
- Validate min/max and custom validators
- Ensure component emits correct events

### Setup
- Ensure `@angular/core/testing`, `jasmine`, `karma`, and `zone.js` are installed
- Import `DatePickerModule` into the test host module and provide `FormsModule`/`ReactiveFormsModule` as needed

### Example: Test date change and format handling

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePickerDemoComponent } from './datepicker-demo.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { FormsModule } from '@angular/forms';

describe('DatePickerDemoComponent', () => {
  let fixture: ComponentFixture<DatePickerDemoComponent>;
  let component: DatePickerDemoComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerModule, FormsModule],
      declarations: [DatePickerDemoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DatePickerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update selectedDate when change event fires', () => {
    const testDate = new Date(2025, 0, 15);
    component.selectedDate = null;
    component.onDateChange({ value: testDate });
    expect(component.selectedDate).toEqual(testDate);
  });

  it('should reject invalid date in strictMode', () => {
    component.strictMode = true;
    // Simulate invalid parse
    const invalid = '32/13/2024';
    // Use utility parseDate if present or simulate input
    // Expect component to treat as invalid
    // (Example assertion depends on implementation)
  });
});
```

### Tips
- Mock timezone-sensitive values by setting `Intl.DateTimeFormat` where feasible
- Use `fakeAsync` and `tick()` for debounce/time-based behaviors
- Test validation errors by toggling `min`/`max` values

## E2E Testing (Cypress)

### Goals
- Verify calendar interactions (open/close, month navigation)
- Validate date selection flows and form submission
- Test date range selection flows

### Example: Select a date and assert form submission

```javascript
describe('DatePicker E2E', () => {
  it('selects a date and submits form', () => {
    cy.visit('/datepicker-demo');
    cy.get('ejs-datepicker input').click();
    // Open calendar and select 15th of current month
    cy.get('.e-calendar .e-day:not(.e-other-month)').contains('15').click();
    cy.get('#submit').click();
    cy.get('#result').should('contain', '15');
  });
});
```

### Timezone and Localization
- Run tests with CI environment timezone set explicitly where possible
- For culture-specific formats, load the CLDR/culture data in the test app fixture

## Accessibility Testing (axe-core)

### Goals
- Detect common accessibility regressions (contrast, ARIA, keyboard focus)
- Ensure keyboard navigation and screen-reader announcements are present

### Example: Run axe in Cypress

```javascript
import 'cypress-axe';

describe('Accessibility checks', () => {
  it('datepicker should have no detectable a11y violations', () => {
    cy.visit('/datepicker-demo');
    cy.injectAxe();
    cy.checkA11y('body', {
      includedImpacts: ['critical', 'serious']
    });
  });
});
```

### Keyboard Navigation Assertions
- Test arrow keys navigate dates: use `cy.get(...).trigger('keydown', { keyCode: 37 })` etc.
- Assert `aria-activedescendant` changes when moving focus
- Confirm `aria-expanded` toggles on popup open/close

## Test Coverage Guidelines
- Unit tests: cover parsing, format utilities, validators, and event emissions
- E2E tests: cover user flows, edge cases, and localization toggles
- Accessibility: include `axe` scans and keyboard focus tests

## Common Test Cases to Include
- Selecting a date via calendar and via manual entry
- Enabling `enableMask` and ensuring mask behaves across locales
- Min/Max date constraint violations
- Strict mode and invalid date handling
- Keyboard-only navigation (no mouse)
- Localized formats (switch `locale` and assert displayed format)

## Troubleshooting
- If tests fail intermittently on CI, ensure deterministic timezone and locale
- For flaky keyboard tests, add small waits only as last resort

## References
- Cypress: https://www.cypress.io/
- axe-core: https://github.com/dequelabs/axe-core
- Angular testing: https://angular.io/guide/testing
- Syncfusion testing patterns: use TestBed and minimal host components
