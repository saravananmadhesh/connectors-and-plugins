import { ApiError } from './api';

/** Plain-language text for an error, with what to do next. */
export function errorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    switch (error.code) {
      case 'invalid_credentials':
        return 'The email or password is not correct. After several wrong tries the account is locked for a while.';
      case 'password_policy_violation':
        return 'Choose a longer password that is not common and does not match your email.';
      case 'token_invalid_or_expired':
        return 'This link has expired or was already used. Ask for a new one.';
      case 'validation_failed':
        if (error.details.length > 0)
          return `Check the fields and try again. ${error.details.join(' ')}`;
        return 'Check the fields and try again. The owner must be on the allow-list, and the folder must be a relative path.';
      case 'conflict':
        return 'That cannot be done in the current state: it already exists, a sync is running, the version is not at the right step, or the plugin is still installed. Reload and check.';
      case 'not_found':
        return 'That item no longer exists. Reload the page.';
      case 'forbidden':
        return 'The page expired. Reload and try again.';
      case 'rate_limited':
        return 'Too many tries. Wait a minute and try again.';
    }
  }
  return 'Something went wrong. Try again in a moment.';
}
