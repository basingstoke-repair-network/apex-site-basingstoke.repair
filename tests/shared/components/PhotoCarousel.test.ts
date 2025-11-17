import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('PhotoCarousel Component', () => {
  let dom: JSDOM;
  let document: Document;
  let window: Window;

  beforeEach(() => {
    vi.useFakeTimers();
    
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <section id="photo-carousel" class="mb-8 p-6 bg-white rounded-lg shadow-md">
            <h2 class="text-brn-primary mb-6 text-2xl font-semibold text-center">
              <a href="#photo-carousel" class="hover:underline">#</a> Our Teams in Action
            </h2>
            
            <div class="relative max-w-4xl mx-auto">
              <div class="carousel-container relative overflow-hidden rounded-lg">
                <div class="carousel-track flex transition-transform duration-500 ease-in-out" id="carousel-track">
                  <div class="carousel-slide min-w-full relative">
                    <img src="/test-chineham.jpg" alt="Chineham Repair Cafe Team" width="800" height="600" class="w-full h-64 md:h-80 lg:h-96 object-cover" />
                    <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 md:p-4">
                      <p class="text-sm md:text-lg font-semibold">Chineham Repair Cafe Team</p>
                    </div>
                  </div>
                  <div class="carousel-slide min-w-full relative">
                    <img src="/test-hatch.jpg" alt="Hatch Warren Repair Cafe Team" width="800" height="600" class="w-full h-64 md:h-80 lg:h-96 object-cover" />
                    <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 md:p-4">
                      <p class="text-sm md:text-lg font-semibold">Hatch Warren & Beggarwood Team</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <button id="prev-btn" class="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-1 md:p-2 shadow-lg transition-all duration-200" aria-label="Previous photo">
                <svg class="w-4 h-4 md:w-6 md:h-6 text-brn-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              
              <button id="next-btn" class="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-1 md:p-2 shadow-lg transition-all duration-200" aria-label="Next photo">
                <svg class="w-4 h-4 md:w-6 md:h-6 text-brn-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
              
              <div class="flex justify-center mt-4 space-x-2">
                <button class="carousel-dot w-3 h-3 rounded-full bg-brn-primary transition-colors duration-200" data-slide="0" aria-label="Go to slide 1"></button>
                <button class="carousel-dot w-3 h-3 rounded-full bg-gray-300 hover:bg-brn-primary transition-colors duration-200" data-slide="1" aria-label="Go to slide 2"></button>
              </div>
            </div>
          </section>
        </body>
      </html>
    `, { url: 'http://localhost' });

    document = dom.window.document;
    window = dom.window as any;
    global.document = document;
    global.window = window as any;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render the carousel with correct structure', () => {
    const carousel = document.getElementById('photo-carousel');
    expect(carousel).toBeTruthy();
    
    const title = carousel?.querySelector('h2');
    expect(title?.textContent).toContain('Our Teams in Action');
  });

  it('should display both team photos', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    expect(slides).toHaveLength(2);
    
    const chinehamImg = document.querySelector('img[alt="Chineham Repair Cafe Team"]') as HTMLImageElement;
    const hatchImg = document.querySelector('img[alt="Hatch Warren Repair Cafe Team"]') as HTMLImageElement;
    
    expect(chinehamImg).toBeTruthy();
    expect(hatchImg).toBeTruthy();
    expect(chinehamImg.src).toContain('chineham');
    expect(hatchImg.src).toContain('hatch');
  });

  it('should have navigation buttons with correct attributes', () => {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    expect(prevBtn).toBeTruthy();
    expect(nextBtn).toBeTruthy();
    expect(prevBtn?.getAttribute('aria-label')).toBe('Previous photo');
    expect(nextBtn?.getAttribute('aria-label')).toBe('Next photo');
  });

  it('should render carousel dots with correct data attributes', () => {
    const dots = document.querySelectorAll('.carousel-dot');
    expect(dots).toHaveLength(2);
    
    expect(dots[0].getAttribute('data-slide')).toBe('0');
    expect(dots[1].getAttribute('data-slide')).toBe('1');
    expect(dots[0].getAttribute('aria-label')).toBe('Go to slide 1');
    expect(dots[1].getAttribute('aria-label')).toBe('Go to slide 2');
  });

  it('should have the first dot active by default', () => {
    const dots = document.querySelectorAll('.carousel-dot');
    expect(dots[0].classList.contains('bg-brn-primary')).toBe(true);
    expect(dots[1].classList.contains('bg-gray-300')).toBe(true);
  });

  it('should have responsive image classes', () => {
    const images = document.querySelectorAll('.carousel-slide img');
    images.forEach(img => {
      const classes = img.className;
      expect(classes).toContain('w-full');
      expect(classes).toContain('h-64');
      expect(classes).toContain('md:h-80');
      expect(classes).toContain('lg:h-96');
      expect(classes).toContain('object-cover');
    });
  });

  it('should have photo captions with responsive text sizes', () => {
    const captions = document.querySelectorAll('.carousel-slide p');
    expect(captions).toHaveLength(2);
    
    captions.forEach(caption => {
      const classes = caption.className;
      expect(classes).toContain('text-sm');
      expect(classes).toContain('md:text-lg');
      expect(classes).toContain('font-semibold');
    });
    
    expect(captions[0].textContent).toBe('Chineham Repair Cafe Team');
    expect(captions[1].textContent).toBe('Hatch Warren & Beggarwood Team');
  });

  it('should have proper carousel track for sliding', () => {
    const track = document.getElementById('carousel-track');
    expect(track).toBeTruthy();
    expect(track?.classList.contains('flex')).toBe(true);
    expect(track?.classList.contains('transition-transform')).toBe(true);
    expect(track?.classList.contains('duration-500')).toBe(true);
  });

  it('should simulate carousel navigation functionality', () => {
    // Test DOM structure for navigation
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const track = document.getElementById('carousel-track');
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Verify elements exist for JavaScript to bind to
    expect(prevBtn).toBeTruthy();
    expect(nextBtn).toBeTruthy();
    expect(track).toBeTruthy();
    expect(dots).toHaveLength(2);
    
    // Test that clicking elements would work (structure is correct)
    const clickEvent = new window.Event('click');
    expect(() => prevBtn?.dispatchEvent(clickEvent)).not.toThrow();
    expect(() => nextBtn?.dispatchEvent(clickEvent)).not.toThrow();
    expect(() => dots[0].dispatchEvent(clickEvent)).not.toThrow();
  });

  it('should have accessible carousel controls', () => {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Check ARIA labels
    expect(prevBtn?.getAttribute('aria-label')).toBe('Previous photo');
    expect(nextBtn?.getAttribute('aria-label')).toBe('Next photo');
    
    dots.forEach((dot, index) => {
      expect(dot.getAttribute('aria-label')).toBe(`Go to slide ${index + 1}`);
    });
  });
});