// Runs before the first paint so the saved theme shows without a flash. Kept in sync with src/lib/theme.ts.
(function () {
  var choice = 'system';
  try {
    var stored = window.localStorage.getItem('web-theme');
    if (stored === 'light' || stored === 'dark') choice = stored;
  } catch {
    choice = 'system';
  }
  var dark =
    choice === 'dark' ||
    (choice === 'system' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
})();
