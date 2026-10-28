import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Label } from './label';
import { Input, Select, Textarea } from './input';

const classesOf = (element: HTMLElement) => element.className.split(/\s+/);

describe('form fields', () => {
  it.each([
    ['input', () => <Input aria-label="field" />],
    ['text area', () => <Textarea aria-label="field" />],
    ['select', () => <Select aria-label="field" />],
  ])('set their own text colour, weight and line height on a %s', (_name, field) => {
    render(field());
    const classes = classesOf(screen.getByLabelText('field'));
    expect(classes).toEqual(
      expect.arrayContaining(['text-foreground', 'font-normal', 'leading-normal', 'bg-card']),
    );
  });

  it('shows the placeholder in the muted colour and a disabled field by its fill', () => {
    render(<Input aria-label="field" placeholder="Search" disabled />);
    const classes = classesOf(screen.getByLabelText('field'));
    expect(classes).toContain('placeholder:text-muted-foreground');
    expect(classes).toContain('disabled:bg-muted');
    expect(classes).toContain('disabled:text-muted-foreground');
    expect(classes).not.toContain('disabled:opacity-50');
  });

  it('marks an invalid field with the destructive colour', () => {
    render(<Input aria-label="field" aria-invalid />);
    expect(classesOf(screen.getByLabelText('field'))).toContain('aria-invalid:border-destructive');
  });

  it('keeps the value text out of the label style around it', () => {
    render(
      <Label>
        Name
        <Input defaultValue="Tools" />
      </Label>,
    );
    const label = screen.getByText('Name').closest('label') as HTMLElement;
    expect(classesOf(label)).toContain('font-medium');
    const field = screen.getByDisplayValue('Tools');
    expect(classesOf(field)).toContain('font-normal');
    expect(classesOf(field)).not.toContain('font-medium');
  });

  it('uses theme tokens only, never fixed colours or faded text', () => {
    render(<Input aria-label="field" />);
    const classes = classesOf(screen.getByLabelText('field')).join(' ');
    expect(classes).not.toMatch(/#[0-9a-f]{3,8}|rgb\(|text-(?:gray|zinc|slate|neutral)-/i);
    expect(classes).not.toMatch(/text-foreground\//);
  });

  it('passes a custom class and any attribute through', () => {
    render(<Input aria-label="field" className="max-w-xs" type="search" />);
    const field = screen.getByLabelText('field');
    expect(classesOf(field)).toContain('max-w-xs');
    expect(field).toHaveAttribute('type', 'search');
  });
});
