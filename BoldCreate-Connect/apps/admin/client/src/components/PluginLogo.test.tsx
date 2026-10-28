import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PluginLogo } from './PluginLogo';
import { PluginStatusBadge, VersionStatusBadge } from './StatusBadge';

const LOGO = `https://raw.githubusercontent.com/acme/plugins/${'a'.repeat(40)}/tool/assets/logo.png`;

describe('plugin logo', () => {
  it("shows the plugin's own logo from its repository", () => {
    const { container } = render(<PluginLogo src={LOGO} />);
    const image = container.querySelector('img');
    expect(image).toHaveAttribute('src', LOGO);
    expect(image).toHaveAttribute('referrerpolicy', 'no-referrer');
    expect(container.querySelector('[data-logo="image"]')).not.toBeNull();
  });

  it('is hidden from assistive technology, since the name is next to it', () => {
    const { container } = render(<PluginLogo src={LOGO} />);
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelector('img')).toHaveAttribute('alt', '');
  });

  it('shows the default tile when there is no logo, and never an account picture or other host', () => {
    for (const src of [
      undefined,
      null,
      '',
      'https://github.com/acme.png?size=96',
      'https://avatars.githubusercontent.com/u/1',
      'https://evil.example/raw.githubusercontent.com/logo.png',
      'http://raw.githubusercontent.com/acme/plugins/main/logo.png',
      'javascript:alert(1)',
      'data:image/png;base64,AAAA',
    ]) {
      const { container, unmount } = render(<PluginLogo src={src} />);
      expect(container.querySelector('img')).toBeNull();
      expect(container.querySelector('[data-logo="default"]')).not.toBeNull();
      unmount();
    }
  });

  it('falls back to the default tile when the image cannot be loaded, and tries again for another logo', () => {
    const { container, rerender } = render(<PluginLogo src={LOGO} />);
    fireEvent.error(container.querySelector('img') as Element);
    expect(container.querySelector('[data-logo="default"]')).not.toBeNull();
    const other = LOGO.replace('tool', 'other');
    rerender(<PluginLogo src={other} />);
    expect(container.querySelector('img')).toHaveAttribute('src', other);
  });

  it('comes in three sizes', () => {
    const { container } = render(
      <>
        <PluginLogo size="sm" />
        <PluginLogo size="md" />
        <PluginLogo size="lg" />
      </>,
    );
    const sizes = [...container.querySelectorAll('[data-logo]')].map((node) =>
      [...node.classList].find((name) => name.startsWith('size-') && name !== 'size-full'),
    );
    expect(sizes).toEqual(['size-8', 'size-10', 'size-14']);
  });
});

describe('state colours', () => {
  const classOf = (node: HTMLElement) => node.className;

  it('colours a plugin by what it means', () => {
    const { getByText } = render(
      <>
        <PluginStatusBadge status="active" />
        <PluginStatusBadge status="deprecated" />
        <PluginStatusBadge status="suspended" />
      </>,
    );
    expect(classOf(getByText('Active'))).toContain('text-success');
    expect(classOf(getByText('Deprecated'))).toContain('text-warning');
    expect(classOf(getByText('Suspended'))).toContain('text-destructive');
  });

  it('colours a version by where it stands', () => {
    const { getByText } = render(
      <>
        <VersionStatusBadge status="pending" />
        <VersionStatusBadge status="approved" />
        <VersionStatusBadge status="published" />
        <VersionStatusBadge status="rejected" />
        <VersionStatusBadge status="yanked" />
      </>,
    );
    expect(classOf(getByText('Pending review'))).toContain('text-warning');
    expect(classOf(getByText('Approved'))).toContain('text-info');
    expect(classOf(getByText('Published'))).toContain('text-success');
    expect(classOf(getByText('Rejected'))).toContain('text-destructive');
    expect(classOf(getByText('Yanked'))).toContain('text-secondary-foreground');
  });
});
