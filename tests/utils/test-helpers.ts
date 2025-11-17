import { render, type RenderResult } from '@testing-library/react';
import { vi } from 'vitest';

// Test utilities for Astro components
export const mockAstroComponent = (name: string, props: Record<string, any> = {}) => {
  return {
    name,
    props,
    render: vi.fn().mockResolvedValue({ html: `<div data-testid="${name.toLowerCase()}">${name}</div>` })
  };
};

// Mock image imports for tests
export const mockImage = {
  src: '/test-image.jpg',
  width: 800,
  height: 600,
  format: 'jpg'
};

// Create test data for repair cafés
export const createMockCafe = (overrides: Partial<any> = {}) => ({
  id: 'test-cafe',
  slug: 'test-cafe',
  collection: 'cafes',
  data: {
    title: 'Test Repair Café',
    status: 'active',
    location: {
      address: '123 Test Street',
      postcode: 'T35T 1NG',
      venue: 'Test Community Centre'
    },
    schedule: {
      frequency: 'third-saturday',
      time: '10:00',
      duration: 3,
      skipDecember: true
    },
    contact: {
      email: 'test@example.com',
      website: 'https://test.example.com'
    },
    order: 1,
    ...overrides
  },
  render: vi.fn().mockResolvedValue({
    Content: () => '<p>Test café description</p>'
  })
});

// Create test data for FAQ items
export const createMockFAQ = (overrides: Partial<any> = {}) => ({
  id: 'test-faq',
  slug: 'test-faq',
  collection: 'faq',
  data: {
    title: 'Test FAQ Question',
    order: 1,
    ...overrides
  },
  render: vi.fn().mockResolvedValue({
    Content: () => '<p>Test FAQ answer</p>'
  })
});

// Mock content collections
export const mockGetCollection = vi.fn();
export const mockGetEntry = vi.fn();

// Setup mock content collections
export const setupMockCollections = () => {
  mockGetCollection.mockImplementation((collection: string) => {
    switch (collection) {
      case 'cafes':
        return Promise.resolve([
          createMockCafe({ id: 'chineham', data: { title: 'Chineham' } }),
          createMockCafe({ id: 'hatch-warren', data: { title: 'Hatch Warren' } }),
          createMockCafe({ id: 'kings-furlong', data: { title: 'Kings Furlong', status: 'coming-soon' } })
        ]);
      case 'faq':
        return Promise.resolve([
          createMockFAQ({ id: 'cost', data: { title: 'How much does it cost?', order: 1 } }),
          createMockFAQ({ id: 'booking', data: { title: 'Do I need to book?', order: 2 } })
        ]);
      default:
        return Promise.resolve([]);
    }
  });

  mockGetEntry.mockImplementation((collection: string, id: string) => {
    if (collection === 'pages' && id === 'introduction') {
      return Promise.resolve({
        id: 'introduction',
        data: { title: 'Welcome to BRN' },
        render: vi.fn().mockResolvedValue({
          Content: () => '<p>Welcome to the Basingstoke Repair Network</p>'
        })
      });
    }
    return Promise.resolve(null);
  });
};

// Test environment helpers
export const isTestEnvironment = () => process.env.NODE_ENV === 'test';

// Mock window location for site-specific tests
export const mockLocation = (site: 'main' | 'chineham' | 'hatch-warren' | 'kings-furlong') => {
  const urls = {
    main: 'https://basingstoke.repair',
    chineham: 'https://chineham.basingstoke.repair',
    'hatch-warren': 'https://hatchwarren.basingstoke.repair',
    'kings-furlong': 'https://kingsfurlong.basingstoke.repair'
  };

  Object.defineProperty(window, 'location', {
    value: new URL(urls[site]),
    writable: true
  });
};

// Assert functions for common patterns
export const assertComponentExists = (container: HTMLElement, testId: string) => {
  const element = container.querySelector(`[data-testid="${testId}"]`);
  expect(element).toBeInTheDocument();
  return element;
};

export const assertLinkHref = (container: HTMLElement, selector: string, expectedHref: string) => {
  const link = container.querySelector(selector) as HTMLAnchorElement;
  expect(link).toBeInTheDocument();
  expect(link.href).toContain(expectedHref);
};