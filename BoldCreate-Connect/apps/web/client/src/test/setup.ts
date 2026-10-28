import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Increase async timeout for router-based tests
configure({ asyncUtilTimeout: 5000 });

// jsdom does not implement window.scrollTo — silence the "Not implemented" noise
Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true });
