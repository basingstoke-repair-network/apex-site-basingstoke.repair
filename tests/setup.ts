import { beforeAll, vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock Astro globals
beforeAll(() => {
  // Mock Astro.props
  global.Astro = {
    props: {},
    request: {
      url: 'http://localhost:4321/',
      headers: new Headers()
    },
    params: {},
    site: new URL('http://localhost:4321'),
    generator: 'Astro v5.15.4',
    redirect: vi.fn(),
    response: {
      headers: new Headers()
    }
  };

  // Mock window.matchMedia for responsive tests
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Mock IntersectionObserver
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // Mock ResizeObserver
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
});