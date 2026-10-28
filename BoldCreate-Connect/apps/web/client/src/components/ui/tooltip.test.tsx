import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Tooltip } from './tooltip';

function setup(side?: 'top' | 'bottom' | 'right') {
  render(
    <Tooltip label="Remove from the project" {...(side ? { side } : {})}>
      <button type="button">Remove</button>
    </Tooltip>,
  );
  return {
    button: screen.getByRole('button', { name: 'Remove' }),
    tip: () => document.querySelector('[role="tooltip"]')!,
  };
}

describe('Tooltip', () => {
  it('is hidden until the control is hovered, and describes the control', async () => {
    const { button, tip } = setup();
    expect(tip()).not.toBeVisible();
    expect(button).toHaveAccessibleDescription('Remove from the project');
    await userEvent.hover(button);
    expect(tip()).toBeVisible();
    await userEvent.unhover(button);
    expect(tip()).not.toBeVisible();
  });

  it('opens on keyboard focus and closes on blur', async () => {
    const { tip } = setup('bottom');
    await userEvent.tab();
    expect(tip()).toBeVisible();
    await userEvent.tab();
    expect(tip()).not.toBeVisible();
  });

  it('closes on Escape without moving focus', async () => {
    const { button, tip } = setup('right');
    await userEvent.tab();
    expect(tip()).toBeVisible();
    await userEvent.keyboard('{Escape}');
    expect(tip()).not.toBeVisible();
    expect(button).toHaveFocus();
  });

  it('ignores other keys', async () => {
    const { tip } = setup();
    await userEvent.tab();
    await userEvent.keyboard('a');
    expect(tip()).toBeVisible();
  });

  it('ignores Escape while closed, even with the focus on the control', async () => {
    const { button, tip } = setup();
    await userEvent.tab();
    await userEvent.hover(button);
    await userEvent.unhover(button);
    expect(tip()).not.toBeVisible();
    await userEvent.keyboard('{Escape}');
    expect(tip()).not.toBeVisible();
    expect(button).toHaveFocus();
  });
});
