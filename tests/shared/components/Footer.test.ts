import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Footer Component', () => {
  let dom: JSDOM;
  let document: Document;

  beforeEach(() => {
    // Mock a typical footer structure based on the Footer.astro component
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <footer class="footer-bg text-white py-8 mt-auto">
            <div class="max-w-5xl mx-auto px-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <!-- Contact Information -->
                <div>
                  <h3 class="text-lg font-semibold mb-4">Contact Us</h3>
                  <div class="space-y-2">
                    <p>
                      <strong>General Enquiries:</strong><br>
                      <a href="mailto:info@basingstoke.repair" class="footer-link hover:underline">info@basingstoke.repair</a>
                    </p>
                    <p>
                      <strong>Chineham Specific:</strong><br>
                      <a href="mailto:info@chinehamrepair.org.uk" class="footer-link hover:underline">info@chinehamrepair.org.uk</a>
                    </p>
                  </div>
                </div>

                <!-- Quick Links -->
                <div>
                  <h3 class="text-lg font-semibold mb-4">Our Repair Cafés</h3>
                  <ul class="space-y-2">
                    <li><a href="https://chineham.basingstoke.repair" class="footer-link hover:underline">Chineham</a></li>
                    <li><a href="https://hatchwarren.basingstoke.repair" class="footer-link hover:underline">Hatch Warren</a></li>
                    <li><a href="#kings-furlong" class="footer-link hover:underline">Kings Furlong (Coming Soon)</a></li>
                  </ul>
                </div>

                <!-- Network Info -->
                <div>
                  <h3 class="text-lg font-semibold mb-4">About the Network</h3>
                  <p class="text-sm mb-4">
                    Part of the global Repair Café movement, bringing communities together to fix, learn, and reduce waste.
                  </p>
                  <div class="flex space-x-4">
                    <a href="https://repaircafe.org/" target="_blank" rel="noopener noreferrer" class="footer-link hover:underline text-sm">
                      Repair Café International
                    </a>
                  </div>
                </div>
              </div>

              <!-- Copyright -->
              <div class="border-t border-gray-600 mt-8 pt-6 text-center text-sm">
                <p>&copy; 2025 Basingstoke Repair Network. Licensed under CC0-1.0.</p>
                <p class="mt-2">
                  Supported by local community organizations and volunteers.
                </p>
              </div>
            </div>
          </footer>
        </body>
      </html>
    `, { url: 'http://localhost' });

    document = dom.window.document;
    global.document = document;
  });

  it('should render footer with correct background styling', () => {
    const footer = document.querySelector('footer');
    expect(footer).toBeTruthy();
    expect(footer?.classList.contains('footer-bg')).toBe(true);
    expect(footer?.classList.contains('text-white')).toBe(true);
  });

  it('should display contact information section', () => {
    const contactSection = document.querySelector('footer h3');
    expect(contactSection?.textContent).toBe('Contact Us');
    
    const generalEmail = document.querySelector('a[href="mailto:info@basingstoke.repair"]');
    const chinehamEmail = document.querySelector('a[href="mailto:info@chinehamrepair.org.uk"]');
    
    expect(generalEmail).toBeTruthy();
    expect(chinehamEmail).toBeTruthy();
    expect(generalEmail?.classList.contains('footer-link')).toBe(true);
  });

  it('should list all repair café locations', () => {
    const cafeLinks = document.querySelectorAll('footer ul li a');
    expect(cafeLinks).toHaveLength(3);
    
    const linkTexts = Array.from(cafeLinks).map(link => link.textContent?.trim());
    expect(linkTexts).toContain('Chineham');
    expect(linkTexts).toContain('Hatch Warren');
    expect(linkTexts).toContain('Kings Furlong (Coming Soon)');
  });

  it('should have correct links to subdomain sites', () => {
    const chinehamLink = document.querySelector('a[href="https://chineham.basingstoke.repair"]');
    const hatchWarrenLink = document.querySelector('a[href="https://hatchwarren.basingstoke.repair"]');
    
    expect(chinehamLink).toBeTruthy();
    expect(hatchWarrenLink).toBeTruthy();
  });

  it('should display network information', () => {
    const headings = document.querySelectorAll('footer h3');
    const networkHeading = Array.from(headings).find(h => h.textContent === 'About the Network');
    
    expect(networkHeading).toBeTruthy();
    
    const repairCafeIntlLink = document.querySelector('a[href="https://repaircafe.org/"]');
    expect(repairCafeIntlLink).toBeTruthy();
    expect(repairCafeIntlLink?.getAttribute('target')).toBe('_blank');
    expect(repairCafeIntlLink?.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should have copyright information', () => {
    const copyright = document.querySelector('footer .border-t p');
    expect(copyright?.textContent).toContain('© 2025 Basingstoke Repair Network');
    expect(copyright?.textContent).toContain('CC0-1.0');
  });

  it('should have responsive grid layout', () => {
    const gridContainer = document.querySelector('footer .grid');
    expect(gridContainer?.classList.contains('grid-cols-1')).toBe(true);
    expect(gridContainer?.classList.contains('md:grid-cols-3')).toBe(true);
    expect(gridContainer?.classList.contains('gap-8')).toBe(true);
  });

  it('should have proper link styling', () => {
    const footerLinks = document.querySelectorAll('footer .footer-link');
    expect(footerLinks.length).toBeGreaterThan(0);
    
    footerLinks.forEach(link => {
      expect(link.classList.contains('hover:underline')).toBe(true);
    });
  });

  it('should mention community support', () => {
    const supportText = document.querySelector('footer .border-t p:last-child');
    expect(supportText?.textContent).toContain('Supported by');
    expect(supportText?.textContent).toContain('community organizations');
    expect(supportText?.textContent).toContain('volunteers');
  });

  it('should have proper accessibility for external links', () => {
    const externalLinks = document.querySelectorAll('footer a[target="_blank"]');
    
    externalLinks.forEach(link => {
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });
  });

  it('should have structured sections with proper headings', () => {
    const headings = document.querySelectorAll('footer h3');
    expect(headings).toHaveLength(3);
    
    const headingTexts = Array.from(headings).map(h => h.textContent);
    expect(headingTexts).toContain('Contact Us');
    expect(headingTexts).toContain('Our Repair Cafés');
    expect(headingTexts).toContain('About the Network');
  });
});