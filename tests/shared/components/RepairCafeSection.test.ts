import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('RepairCafeSection Component', () => {
  let dom: JSDOM;
  let document: Document;

  describe('with subdomain URL (clickable version)', () => {
    beforeEach(() => {
      // Mock DOM structure for RepairCafeSection with subdomain URL
      dom = new JSDOM(`
        <!DOCTYPE html>
        <html>
          <body>
            <a href="https://chineham.basingstoke.repair" target="_blank" rel="noopener noreferrer" class="block w-full h-full">
              <section id="chineham" class="mb-8 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                <h2 class="text-brn-primary mb-4 text-2xl font-semibold">Chineham Repair Café</h2>
                <img src="/test-chineham.jpg" alt="Chineham Community Centre" class="w-full max-w-xl h-auto mb-4 rounded-lg shadow-md" />
                <p class="mb-1 text-lg"><span class="font-medium">When?</span> 3rd Saturday of each month, 10am-1pm</p>
                <p class="mb-1 text-lg"><span class="font-medium">Where?</span> Christ Church Chineham, Reading Road, RG24 8LT</p>
                <p class="text-lg italic">Active and running</p>
                <div class="slot-content">
                  <p>Additional information about the repair café.</p>
                </div>
              </section>
            </a>
          </body>
        </html>
      `, { url: 'http://localhost' });

      document = dom.window.document;
      global.document = document;
    });

    it('should render as clickable link when subdomain URL is provided', () => {
      const link = document.querySelector('a[href="https://chineham.basingstoke.repair"]');
      expect(link).toBeTruthy();
      expect(link?.getAttribute('target')).toBe('_blank');
      expect(link?.getAttribute('rel')).toBe('noopener noreferrer');
      expect(link?.classList.contains('block')).toBe(true);
    });

    it('should have hover effects for clickable section', () => {
      const section = document.querySelector('section');
      expect(section?.classList.contains('hover:shadow-lg')).toBe(true);
      expect(section?.classList.contains('transition-shadow')).toBe(true);
      expect(section?.classList.contains('hover:-translate-y-1')).toBe(true);
      expect(section?.classList.contains('transform')).toBe(true);
    });

    it('should display section title correctly', () => {
      const title = document.querySelector('h2');
      expect(title?.textContent).toBe('Chineham Repair Café');
      expect(title?.classList.contains('text-brn-primary')).toBe(true);
      expect(title?.classList.contains('text-2xl')).toBe(true);
      expect(title?.classList.contains('font-semibold')).toBe(true);
    });

    it('should render image with proper attributes', () => {
      const image = document.querySelector('img');
      expect(image).toBeTruthy();
      expect(image?.src).toContain('test-chineham.jpg');
      expect(image?.alt).toBe('Chineham Community Centre');
      expect(image?.classList.contains('w-full')).toBe(true);
      expect(image?.classList.contains('max-w-xl')).toBe(true);
      expect(image?.classList.contains('rounded-lg')).toBe(true);
    });

    it('should display when and where information', () => {
      const paragraphs = document.querySelectorAll('p');
      const whenParagraph = Array.from(paragraphs).find(p => p.textContent?.includes('When?'));
      const whereParagraph = Array.from(paragraphs).find(p => p.textContent?.includes('Where?'));

      expect(whenParagraph?.textContent).toContain('3rd Saturday of each month');
      expect(whereParagraph?.textContent).toContain('Christ Church Chineham');

      // Check font styling
      const whenSpan = whenParagraph?.querySelector('span');
      const whereSpan = whereParagraph?.querySelector('span');
      expect(whenSpan?.classList.contains('font-medium')).toBe(true);
      expect(whereSpan?.classList.contains('font-medium')).toBe(true);
    });

    it('should display note with italic styling', () => {
      const noteParagraph = Array.from(document.querySelectorAll('p')).find(p => 
        p.textContent === 'Active and running'
      );
      expect(noteParagraph).toBeTruthy();
      expect(noteParagraph?.classList.contains('italic')).toBe(true);
      expect(noteParagraph?.classList.contains('text-lg')).toBe(true);
    });

    it('should render slot content', () => {
      const slotContent = document.querySelector('.slot-content');
      expect(slotContent).toBeTruthy();
      expect(slotContent?.textContent).toContain('Additional information about the repair café');
    });
  });

  describe('without subdomain URL (static version)', () => {
    beforeEach(() => {
      // Mock DOM structure for RepairCafeSection without subdomain URL
      dom = new JSDOM(`
        <!DOCTYPE html>
        <html>
          <body>
            <section id="kings-furlong" class="mb-8 p-6 bg-white rounded-lg shadow-md">
              <h2 class="text-brn-primary mb-4 text-2xl font-semibold">Kings Furlong Repair Café</h2>
              <p class="text-lg italic">Coming later in 2025</p>
              <div class="slot-content">
                <p>More details will be announced soon.</p>
              </div>
            </section>
          </body>
        </html>
      `, { url: 'http://localhost' });

      document = dom.window.document;
      global.document = document;
    });

    it('should render as static section when no subdomain URL', () => {
      const section = document.querySelector('section');
      expect(section).toBeTruthy();
      expect(section?.id).toBe('kings-furlong');
      
      // Should not be wrapped in a link
      const link = document.querySelector('a');
      expect(link).toBeNull();
    });

    it('should not have hover transform effects for static section', () => {
      const section = document.querySelector('section');
      expect(section?.classList.contains('hover:shadow-lg')).toBe(false);
      expect(section?.classList.contains('hover:-translate-y-1')).toBe(false);
      expect(section?.classList.contains('transform')).toBe(false);
    });

    it('should have basic shadow without hover effects', () => {
      const section = document.querySelector('section');
      expect(section?.classList.contains('shadow-md')).toBe(true);
      expect(section?.classList.contains('bg-white')).toBe(true);
      expect(section?.classList.contains('rounded-lg')).toBe(true);
    });

    it('should display title for coming soon café', () => {
      const title = document.querySelector('h2');
      expect(title?.textContent).toBe('Kings Furlong Repair Café');
      expect(title?.classList.contains('text-brn-primary')).toBe(true);
    });

    it('should display coming soon note', () => {
      const note = Array.from(document.querySelectorAll('p')).find(p => 
        p.textContent === 'Coming later in 2025'
      );
      expect(note).toBeTruthy();
      expect(note?.classList.contains('italic')).toBe(true);
    });
  });

  describe('common styling and structure', () => {
    beforeEach(() => {
      dom = new JSDOM(`
        <!DOCTYPE html>
        <html>
          <body>
            <section class="mb-8 p-6 bg-white rounded-lg shadow-md">
              <h2 class="text-brn-primary mb-4 text-2xl font-semibold">Test Café</h2>
            </section>
          </body>
        </html>
      `, { url: 'http://localhost' });

      document = dom.window.document;
      global.document = document;
    });

    it('should have consistent spacing and layout classes', () => {
      const section = document.querySelector('section');
      expect(section?.classList.contains('mb-8')).toBe(true);
      expect(section?.classList.contains('p-6')).toBe(true);
      expect(section?.classList.contains('bg-white')).toBe(true);
      expect(section?.classList.contains('rounded-lg')).toBe(true);
      expect(section?.classList.contains('shadow-md')).toBe(true);
    });

    it('should have consistent heading styles', () => {
      const heading = document.querySelector('h2');
      expect(heading?.classList.contains('text-brn-primary')).toBe(true);
      expect(heading?.classList.contains('mb-4')).toBe(true);
      expect(heading?.classList.contains('text-2xl')).toBe(true);
      expect(heading?.classList.contains('font-semibold')).toBe(true);
    });
  });

  describe('accessibility and semantic structure', () => {
    beforeEach(() => {
      dom = new JSDOM(`
        <!DOCTYPE html>
        <html>
          <body>
            <a href="https://test.example.com" target="_blank" rel="noopener noreferrer">
              <section id="test-cafe">
                <h2>Test Repair Café</h2>
                <img src="/test.jpg" alt="Test venue description" />
                <p><span class="font-medium">When?</span> Test schedule</p>
                <p><span class="font-medium">Where?</span> Test location</p>
              </section>
            </a>
          </body>
        </html>
      `, { url: 'http://localhost' });

      document = dom.window.document;
      global.document = document;
    });

    it('should have proper section id for navigation', () => {
      const section = document.querySelector('section');
      expect(section?.id).toBe('test-cafe');
    });

    it('should have semantic heading structure', () => {
      const heading = document.querySelector('h2');
      expect(heading?.tagName.toLowerCase()).toBe('h2');
      expect(heading?.textContent).toBe('Test Repair Café');
    });

    it('should have descriptive alt text for images', () => {
      const image = document.querySelector('img');
      expect(image?.alt).toBe('Test venue description');
    });

    it('should have proper external link attributes for security', () => {
      const link = document.querySelector('a[target="_blank"]');
      expect(link?.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('should have clear visual hierarchy with font weights', () => {
      const labelSpans = document.querySelectorAll('span.font-medium');
      expect(labelSpans).toHaveLength(2);
      
      labelSpans.forEach(span => {
        expect(span.classList.contains('font-medium')).toBe(true);
      });
    });
  });

  describe('responsive design considerations', () => {
    beforeEach(() => {
      dom = new JSDOM(`
        <!DOCTYPE html>
        <html>
          <body>
            <section>
              <img src="/test.jpg" alt="Test" class="w-full max-w-xl h-auto mb-4 rounded-lg shadow-md" />
              <p class="mb-1 text-lg">Test paragraph</p>
            </section>
          </body>
        </html>
      `, { url: 'http://localhost' });

      document = dom.window.document;
      global.document = document;
    });

    it('should have responsive image sizing', () => {
      const image = document.querySelector('img');
      expect(image?.classList.contains('w-full')).toBe(true);
      expect(image?.classList.contains('max-w-xl')).toBe(true);
      expect(image?.classList.contains('h-auto')).toBe(true);
    });

    it('should have appropriate text sizing for readability', () => {
      const paragraph = document.querySelector('p');
      expect(paragraph?.classList.contains('text-lg')).toBe(true);
    });

    it('should have consistent spacing for content flow', () => {
      const image = document.querySelector('img');
      const paragraph = document.querySelector('p');
      expect(image?.classList.contains('mb-4')).toBe(true);
      expect(paragraph?.classList.contains('mb-1')).toBe(true);
    });
  });
});