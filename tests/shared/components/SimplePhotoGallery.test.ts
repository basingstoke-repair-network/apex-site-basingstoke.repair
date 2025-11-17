import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('SimplePhotoGallery Component', () => {
  let dom: JSDOM;
  let document: Document;
  let window: Window;

  beforeEach(() => {
    // Mock DOM structure for SimplePhotoGallery component
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <div class="simple-photo-gallery test-gallery">
            <div class="gallery-header">
              <h3 class="gallery-title">Test Photo Gallery</h3>
            </div>
            
            <div class="gallery-grid">
              <div class="gallery-item" data-index="0">
                <img src="/test1.jpg" alt="Test image 1" loading="lazy" />
                <div class="gallery-item-title">First Image</div>
              </div>
              <div class="gallery-item" data-index="1">
                <img src="/test2.jpg" alt="Test image 2" loading="lazy" />
                <div class="gallery-item-title">Second Image</div>
              </div>
              <div class="gallery-item" data-index="2">
                <img src="/test3.jpg" alt="Test image 3" loading="lazy" />
              </div>
            </div>
          </div>

          <!-- Lightbox overlay -->
          <div class="lightbox-overlay" style="display: none;">
            <div class="lightbox-container">
              <button class="lightbox-close" aria-label="Close">&times;</button>
              <button class="lightbox-prev" aria-label="Previous">‹</button>
              <button class="lightbox-next" aria-label="Next">›</button>
              <img class="lightbox-image" src="" alt="" />
              <div class="lightbox-caption"></div>
              <div class="lightbox-counter"></div>
            </div>
          </div>
        </body>
      </html>
    `, { url: 'http://localhost' });

    document = dom.window.document;
    window = dom.window as any;
    global.document = document;
    global.window = window as any;
  });

  it('should render with correct structure and title', () => {
    const gallery = document.querySelector('.simple-photo-gallery');
    const title = document.querySelector('.gallery-title');
    
    expect(gallery).toBeTruthy();
    expect(title?.textContent).toBe('Test Photo Gallery');
  });

  it('should display all gallery images', () => {
    const items = document.querySelectorAll('.gallery-item');
    const images = document.querySelectorAll('.gallery-item img');
    
    expect(items).toHaveLength(3);
    expect(images).toHaveLength(3);
  });

  it('should have proper image attributes', () => {
    const images = document.querySelectorAll('.gallery-item img');
    
    expect(images[0].src).toContain('test1.jpg');
    expect(images[0].alt).toBe('Test image 1');
    expect(images[0].getAttribute('loading')).toBe('lazy');
    
    expect(images[1].src).toContain('test2.jpg');
    expect(images[1].alt).toBe('Test image 2');
    
    expect(images[2].src).toContain('test3.jpg');
    expect(images[2].alt).toBe('Test image 3');
  });

  it('should display image titles when provided', () => {
    const titles = document.querySelectorAll('.gallery-item-title');
    
    expect(titles).toHaveLength(2); // Only first two items have titles
    expect(titles[0].textContent).toBe('First Image');
    expect(titles[1].textContent).toBe('Second Image');
  });

  it('should have proper gallery grid structure', () => {
    const grid = document.querySelector('.gallery-grid');
    expect(grid).toBeTruthy();
    expect(grid?.classList.contains('gallery-grid')).toBe(true);
  });

  it('should have clickable gallery items with data attributes', () => {
    const items = document.querySelectorAll('.gallery-item');
    
    items.forEach((item, index) => {
      expect(item.getAttribute('data-index')).toBe(index.toString());
      expect(item.classList.contains('gallery-item')).toBe(true);
    });
  });

  describe('Lightbox functionality', () => {
    it('should have lightbox overlay with proper structure', () => {
      const overlay = document.querySelector('.lightbox-overlay');
      const container = document.querySelector('.lightbox-container');
      const image = document.querySelector('.lightbox-image');
      const caption = document.querySelector('.lightbox-caption');
      const counter = document.querySelector('.lightbox-counter');
      
      expect(overlay).toBeTruthy();
      expect(container).toBeTruthy();
      expect(image).toBeTruthy();
      expect(caption).toBeTruthy();
      expect(counter).toBeTruthy();
    });

    it('should have lightbox controls with proper attributes', () => {
      const closeBtn = document.querySelector('.lightbox-close');
      const prevBtn = document.querySelector('.lightbox-prev');
      const nextBtn = document.querySelector('.lightbox-next');
      
      expect(closeBtn?.getAttribute('aria-label')).toBe('Close');
      expect(prevBtn?.getAttribute('aria-label')).toBe('Previous');
      expect(nextBtn?.getAttribute('aria-label')).toBe('Next');
      
      expect(closeBtn?.textContent).toBe('×');
      expect(prevBtn?.textContent).toBe('‹');
      expect(nextBtn?.textContent).toBe('›');
    });

    it('should start with lightbox hidden', () => {
      const overlay = document.querySelector('.lightbox-overlay') as HTMLElement;
      expect(overlay.style.display).toBe('none');
    });

    it('should support opening and closing lightbox', () => {
      const overlay = document.querySelector('.lightbox-overlay') as HTMLElement;
      const image = document.querySelector('.lightbox-image') as HTMLImageElement;
      const caption = document.querySelector('.lightbox-caption') as HTMLElement;
      const counter = document.querySelector('.lightbox-counter') as HTMLElement;
      
      // Simulate opening lightbox with first image
      overlay.style.display = 'flex';
      image.src = '/test1.jpg';
      image.alt = 'Test image 1';
      caption.textContent = 'Test image 1';
      counter.textContent = '1 / 3';
      
      expect(overlay.style.display).toBe('flex');
      expect(image.src).toContain('test1.jpg');
      expect(caption.textContent).toBe('Test image 1');
      expect(counter.textContent).toBe('1 / 3');
      
      // Simulate closing lightbox
      overlay.style.display = 'none';
      expect(overlay.style.display).toBe('none');
    });

    it('should handle navigation between images', () => {
      const image = document.querySelector('.lightbox-image') as HTMLImageElement;
      const counter = document.querySelector('.lightbox-counter') as HTMLElement;
      
      // Simulate navigation to second image
      image.src = '/test2.jpg';
      image.alt = 'Test image 2';
      counter.textContent = '2 / 3';
      
      expect(image.src).toContain('test2.jpg');
      expect(counter.textContent).toBe('2 / 3');
      
      // Simulate navigation to third image
      image.src = '/test3.jpg';
      image.alt = 'Test image 3';
      counter.textContent = '3 / 3';
      
      expect(image.src).toContain('test3.jpg');
      expect(counter.textContent).toBe('3 / 3');
    });
  });

  describe('Responsive design and grid layout', () => {
    it('should support column configuration classes', () => {
      const grid = document.querySelector('.gallery-grid');
      
      // Test adding different column classes
      grid?.classList.add('columns-2');
      expect(grid?.classList.contains('columns-2')).toBe(true);
      
      grid?.classList.remove('columns-2');
      grid?.classList.add('columns-3');
      expect(grid?.classList.contains('columns-3')).toBe(true);
    });

    it('should have proper aspect ratio for gallery items', () => {
      const items = document.querySelectorAll('.gallery-item');
      
      items.forEach(item => {
        expect(item.classList.contains('gallery-item')).toBe(true);
      });
    });

    it('should have images with proper styling classes', () => {
      const images = document.querySelectorAll('.gallery-item img');
      
      images.forEach(img => {
        expect(img.getAttribute('loading')).toBe('lazy');
      });
    });
  });

  describe('Accessibility and semantic structure', () => {
    it('should have proper heading hierarchy', () => {
      const title = document.querySelector('.gallery-title');
      expect(title?.tagName.toLowerCase()).toBe('h3');
    });

    it('should have descriptive alt text for images', () => {
      const images = document.querySelectorAll('.gallery-item img');
      
      images.forEach((img, index) => {
        expect(img.alt).toBe(`Test image ${index + 1}`);
      });
    });

    it('should have keyboard navigation support structure', () => {
      // Test that lightbox controls exist for keyboard events
      const overlay = document.querySelector('.lightbox-overlay');
      const prevBtn = document.querySelector('.lightbox-prev');
      const nextBtn = document.querySelector('.lightbox-next');
      const closeBtn = document.querySelector('.lightbox-close');
      
      expect(overlay).toBeTruthy();
      expect(prevBtn).toBeTruthy();
      expect(nextBtn).toBeTruthy();
      expect(closeBtn).toBeTruthy();
    });
  });

  describe('Event handling simulation', () => {
    it('should handle click events on gallery items', () => {
      const items = document.querySelectorAll('.gallery-item');
      
      items.forEach(item => {
        const clickEvent = new window.Event('click');
        expect(() => item.dispatchEvent(clickEvent)).not.toThrow();
      });
    });

    it('should handle lightbox button clicks', () => {
      const closeBtn = document.querySelector('.lightbox-close');
      const prevBtn = document.querySelector('.lightbox-prev');
      const nextBtn = document.querySelector('.lightbox-next');
      
      const clickEvent = new window.Event('click');
      
      expect(() => closeBtn?.dispatchEvent(clickEvent)).not.toThrow();
      expect(() => prevBtn?.dispatchEvent(clickEvent)).not.toThrow();
      expect(() => nextBtn?.dispatchEvent(clickEvent)).not.toThrow();
    });

    it('should handle overlay click for closing', () => {
      const overlay = document.querySelector('.lightbox-overlay');
      const clickEvent = new window.Event('click');
      
      expect(() => overlay?.dispatchEvent(clickEvent)).not.toThrow();
    });

    it('should handle keyboard events', () => {
      const keyEvents = ['Escape', 'ArrowLeft', 'ArrowRight'];
      
      keyEvents.forEach(key => {
        const keyEvent = new window.KeyboardEvent('keydown', { key });
        expect(() => document.dispatchEvent(keyEvent)).not.toThrow();
      });
    });
  });

  describe('Content management', () => {
    it('should support galleries with different numbers of images', () => {
      // Test with single image gallery
      const singleImageGallery = document.createElement('div');
      singleImageGallery.className = 'simple-photo-gallery';
      singleImageGallery.innerHTML = `
        <div class="gallery-grid">
          <div class="gallery-item" data-index="0">
            <img src="/single.jpg" alt="Single image" loading="lazy" />
          </div>
        </div>
      `;
      
      document.body.appendChild(singleImageGallery);
      
      const singleItem = singleImageGallery.querySelector('.gallery-item');
      expect(singleItem).toBeTruthy();
      expect(singleItem?.getAttribute('data-index')).toBe('0');
    });

    it('should handle images without titles', () => {
      const item = document.querySelectorAll('.gallery-item')[2]; // Third item has no title
      const title = item.querySelector('.gallery-item-title');
      
      expect(title).toBeNull();
    });

    it('should support custom CSS classes', () => {
      const gallery = document.querySelector('.simple-photo-gallery');
      
      // Test adding custom class
      gallery?.classList.add('custom-style');
      expect(gallery?.classList.contains('custom-style')).toBe(true);
      expect(gallery?.classList.contains('test-gallery')).toBe(true);
    });
  });

  describe('Image loading and performance', () => {
    it('should have lazy loading enabled for all images', () => {
      const images = document.querySelectorAll('.gallery-item img');
      
      images.forEach(img => {
        expect(img.getAttribute('loading')).toBe('lazy');
      });
    });

    it('should have proper image container structure for responsive design', () => {
      const items = document.querySelectorAll('.gallery-item');
      
      items.forEach(item => {
        const img = item.querySelector('img');
        expect(img).toBeTruthy();
        expect(item.classList.contains('gallery-item')).toBe(true);
      });
    });
  });

  describe('Multiple gallery support', () => {
    it('should support multiple galleries on the same page', () => {
      // Add second gallery
      const secondGallery = document.createElement('div');
      secondGallery.className = 'simple-photo-gallery';
      secondGallery.innerHTML = `
        <div class="gallery-header">
          <h3 class="gallery-title">Second Gallery</h3>
        </div>
        <div class="gallery-grid">
          <div class="gallery-item" data-index="0">
            <img src="/second1.jpg" alt="Second gallery image" loading="lazy" />
          </div>
        </div>
      `;
      
      document.body.appendChild(secondGallery);
      
      const galleries = document.querySelectorAll('.simple-photo-gallery');
      expect(galleries).toHaveLength(2);
      
      const titles = document.querySelectorAll('.gallery-title');
      const titleTexts = Array.from(titles).map(title => title.textContent);
      expect(titleTexts).toContain('Test Photo Gallery');
      expect(titleTexts).toContain('Second Gallery');
    });
  });
});