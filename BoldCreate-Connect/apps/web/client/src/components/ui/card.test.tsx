import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>card body</Card>);
    expect(screen.getByText('card body')).toBeInTheDocument();
  });

  it('CardTitle renders as h2', () => {
    render(<CardTitle>My Title</CardTitle>);
    expect(screen.getByRole('heading', { level: 2, name: 'My Title' })).toBeInTheDocument();
  });

  it('CardDescription renders text', () => {
    render(<CardDescription>A description</CardDescription>);
    expect(screen.getByText('A description')).toBeInTheDocument();
  });

  it('composes full card structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Desc</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Desc')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});
