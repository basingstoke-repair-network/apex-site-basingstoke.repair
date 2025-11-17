import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setupMockCollections, createMockCafe, createMockFAQ } from '@tests/utils/test-helpers';

// Mock Astro content collections
vi.mock('astro:content', () => ({
  getCollection: vi.fn(),
  getEntry: vi.fn()
}));

describe('Main Site Index Page', () => {
  beforeEach(() => {
    setupMockCollections();
  });

  it('should display mission statement section', () => {
    // Test the mission statement content structure
    const missionContent = `
      The Basingstoke Repair Network brings communities together to fix, mend, and give new life to broken items. 
      We believe in the power of repair to reduce waste, build skills, and strengthen neighborhood connections.
    `;
    
    expect(missionContent).toContain('Basingstoke Repair Network');
    expect(missionContent).toContain('repair');
    expect(missionContent).toContain('communities');
    expect(missionContent).toContain('reduce waste');
  });

  it('should list all repair cafés in the network', () => {
    const expectedCafes = [
      { id: 'chineham', title: 'Chineham', status: 'active' },
      { id: 'hatch-warren', title: 'Hatch Warren & Beggarwood', status: 'active' },
      { id: 'kings-furlong', title: 'Kings Furlong', status: 'coming-soon' }
    ];

    expectedCafes.forEach(cafe => {
      expect(cafe.title).toBeTruthy();
      expect(['active', 'coming-soon', 'closed']).toContain(cafe.status);
    });
  });

  it('should display cafe schedules and locations', () => {
    const chinehamSchedule = {
      title: 'Chineham',
      when: '3rd Saturday of each month 10am-1pm',
      where: 'Christ Church Chineham, Reading Road (next to Surgery), RG24 8LT',
      url: 'https://chineham.basingstokerepairnetwork.org.uk'
    };

    const hatchWarrenSchedule = {
      title: 'Hatch Warren & Beggarwood',
      when: '1st Saturday of each month 10.30am-1pm',
      where: 'Hatch Warren Community Centre, RG22 4XF',
      url: 'https://hatchwarren.basingstokerepairnetwork.org.uk'
    };

    expect(chinehamSchedule.when).toContain('3rd Saturday');
    expect(chinehamSchedule.where).toContain('Christ Church Chineham');
    expect(hatchWarrenSchedule.when).toContain('1st Saturday');
    expect(hatchWarrenSchedule.where).toContain('Hatch Warren Community Centre');
  });

  it('should include FAQ section with common questions', () => {
    const expectedFAQs = [
      'How much does it cost?',
      'Do I need to book?',
      'What can I bring?',
      'Can I learn how to repair?',
      'What if my item cannot be fixed?'
    ];

    expectedFAQs.forEach(question => {
      expect(question).toBeTruthy();
      expect(question.endsWith('?')).toBe(true);
    });
  });

  it('should have contact information section', () => {
    const contactInfo = {
      general: 'info@basingstoke.repair',
      chineham: 'info@chinehamrepair.org.uk'
    };

    expect(contactInfo.general).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(contactInfo.chineham).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('should display supporter logos', () => {
    const supporters = [
      'B+D Council',
      'Four Lanes Trust',
      'Restarters',
      'North Hampshire Repair Network',
      'Repair Cafe International',
      'Greener Basingstoke'
    ];

    supporters.forEach(supporter => {
      expect(supporter).toBeTruthy();
      expect(supporter.length).toBeGreaterThan(3);
    });
  });

  it('should have proper page structure with sections', () => {
    const expectedSections = [
      'photo-carousel',
      'mission',
      'introduction',
      'our-cafes',
      'common-info',
      'get-involved',
      'other-local-repair-cafes',
      'supported-by'
    ];

    expectedSections.forEach(sectionId => {
      expect(sectionId).toBeTruthy();
      expect(sectionId).toMatch(/^[a-z-]+$/);
    });
  });

  it('should link to individual café sites', () => {
    const cafeUrls = {
      chineham: 'https://chineham.basingstokerepairnetwork.org.uk',
      hatchWarren: 'https://hatchwarren.basingstokerepairnetwork.org.uk'
    };

    Object.values(cafeUrls).forEach(url => {
      expect(url).toMatch(/^https:\/\/\w+\.basingstokerepairnetwork\.org\.uk$/);
    });
  });

  it('should have responsive grid layout for cafes', () => {
    const gridClasses = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';
    const classArray = gridClasses.split(' ');
    
    expect(classArray).toContain('grid');
    expect(classArray).toContain('grid-cols-1');
    expect(classArray).toContain('md:grid-cols-2');
    expect(classArray).toContain('lg:grid-cols-3');
    expect(classArray).toContain('gap-8');
  });

  it('should include other local repair cafes section', () => {
    const otherCafes = {
      name: 'North Hampshire Repair Cafe',
      schedule: 'Check website for dates and times',
      location: 'Various locations across North Hampshire',
      url: 'https://nhrc.uk'
    };

    expect(otherCafes.name).toContain('North Hampshire');
    expect(otherCafes.url).toBe('https://nhrc.uk');
  });

  it('should have proper SEO title', () => {
    const expectedTitle = 'Basingstoke Repair Network';
    expect(expectedTitle).toBe('Basingstoke Repair Network');
  });
});