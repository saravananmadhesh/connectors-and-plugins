/**
 * RouteFallbacks tests.
 * Covers: an unknown address gets a readable page, a crashed page gets a message and a way out.
 */
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RouteError, RouteNotFound } from './RouteFallbacks';
import { renderWithRouter } from '@/test/render-with-router';

describe('RouteFallbacks', () => {
  it('explains an unknown address and links to the start page', async () => {
    await renderWithRouter(RouteNotFound, '/');
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go to the start page' })).toBeInTheDocument();
  });

  it('shows a message and a reload button for a page that failed', async () => {
    await renderWithRouter(RouteError, '/');
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reload' })).toBeInTheDocument();
  });
});
