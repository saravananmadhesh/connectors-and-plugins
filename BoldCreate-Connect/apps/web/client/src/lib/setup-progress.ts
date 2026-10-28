import { useCallback, useState } from 'react';

/** Setup steps no server data can confirm; the browser remembers them. Ids only, nothing secret. */
export type SetupFlag = 'browsed-marketplace' | 'connected-agent';

const keyOf = (flag: SetupFlag, orgId: string) => `web-setup-${flag}-${orgId}`;

export function readSetupFlag(flag: SetupFlag, orgId: string): boolean {
  try {
    return window.localStorage.getItem(keyOf(flag, orgId)) === '1';
  } catch {
    return false;
  }
}

export function writeSetupFlag(flag: SetupFlag, orgId: string, value: boolean): void {
  try {
    if (value) window.localStorage.setItem(keyOf(flag, orgId), '1');
    else window.localStorage.removeItem(keyOf(flag, orgId));
  } catch {
    // Storage can be blocked; the step then stays open.
  }
}

/** One remembered step, as a value and a setter. */
export function useSetupFlag(flag: SetupFlag, orgId: string): [boolean, (value: boolean) => void] {
  const [value, setValue] = useState(() => readSetupFlag(flag, orgId));
  const set = useCallback(
    (next: boolean) => {
      writeSetupFlag(flag, orgId, next);
      setValue(next);
    },
    [flag, orgId],
  );
  return [value, set];
}
