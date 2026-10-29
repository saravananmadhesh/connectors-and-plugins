import { useCallback, useState, useSyncExternalStore } from 'react';

const WIDE = '(min-width: 768px)';

function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia?.(WIDE);
  query?.addEventListener('change', onChange);
  return () => query?.removeEventListener('change', onChange);
}

/** The narrow sidebar only exists beside the page; the phone drawer is always the full one. */
const isWide = (): boolean => window.matchMedia?.(WIDE).matches ?? true;

const KEY = 'admin-sidebar-collapsed';

function read(): boolean {
  try {
    return window.localStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

/** Whether the desktop sidebar is narrowed to icons, kept in this browser so it stays as the person left it. */
export function useSidebarCollapsed(): [boolean, () => void] {
  const [collapsed, setCollapsed] = useState(read);
  const toggle = useCallback(() => {
    setCollapsed((current) => {
      const next = !current;
      try {
        window.localStorage.setItem(KEY, next ? '1' : '0');
      } catch {
        // Storage can be blocked; the sidebar still toggles for this visit.
      }
      return next;
    });
  }, []);
  const wide = useSyncExternalStore(subscribe, isWide, () => true);
  return [collapsed && wide, toggle];
}
