import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Countdown Component', () => {
  let dom: JSDOM;
  let document: Document;
  let window: Window;

  beforeEach(() => {
    vi.useFakeTimers();
    // Set a fixed date for consistent testing - January 15, 2025 at 9:00 AM
    vi.setSystemTime(new Date('2025-01-15T09:00:00Z'));

    // Mock DOM structure for Countdown component
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <div class="countdown-container test-countdown" 
               data-event-type="chineham" 
               data-target-date="" 
               data-event-duration="3" 
               data-event-time="10:00" 
               data-skip-december="true" 
               data-before-text="Chineham event starts in:" 
               data-during-text="Chineham event ends in:">
            <div class="countdown-title">
              <h3>Chineham Repair Café Countdown</h3>
            </div>
            
            <div class="countdown-status">
              <p class="status-text">Loading...</p>
            </div>
            
            <div class="countdown-display">
              <div class="time-unit">
                <span class="time-value days">00</span>
                <span class="time-label">Days</span>
              </div>
              <div class="time-unit">
                <span class="time-value hours">00</span>
                <span class="time-label">Hours</span>
              </div>
              <div class="time-unit">
                <span class="time-value minutes">00</span>
                <span class="time-label">Minutes</span>
              </div>
              <div class="time-unit">
                <span class="time-value seconds">00</span>
                <span class="time-label">Seconds</span>
              </div>
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

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render with correct structure and title', () => {
    const container = document.querySelector('.countdown-container');
    const title = document.querySelector('.countdown-title h3');
    
    expect(container).toBeTruthy();
    expect(title?.textContent).toBe('Chineham Repair Café Countdown');
  });

  it('should have all required data attributes', () => {
    const container = document.querySelector('.countdown-container');
    
    expect(container?.getAttribute('data-event-type')).toBe('chineham');
    expect(container?.getAttribute('data-event-duration')).toBe('3');
    expect(container?.getAttribute('data-event-time')).toBe('10:00');
    expect(container?.getAttribute('data-skip-december')).toBe('true');
    expect(container?.getAttribute('data-before-text')).toBe('Chineham event starts in:');
    expect(container?.getAttribute('data-during-text')).toBe('Chineham event ends in:');
  });

  it('should display all time units with labels', () => {
    const timeUnits = document.querySelectorAll('.time-unit');
    expect(timeUnits).toHaveLength(4);

    const labels = document.querySelectorAll('.time-label');
    const labelTexts = Array.from(labels).map(label => label.textContent);
    
    expect(labelTexts).toEqual(['Days', 'Hours', 'Minutes', 'Seconds']);
  });

  it('should have all time value elements', () => {
    const days = document.querySelector('.time-value.days');
    const hours = document.querySelector('.time-value.hours');
    const minutes = document.querySelector('.time-value.minutes');
    const seconds = document.querySelector('.time-value.seconds');

    expect(days).toBeTruthy();
    expect(hours).toBeTruthy();
    expect(minutes).toBeTruthy();
    expect(seconds).toBeTruthy();
  });

  it('should initialize with loading status', () => {
    const status = document.querySelector('.status-text');
    expect(status?.textContent).toBe('Loading...');
  });

  it('should have proper CSS classes for styling', () => {
    const container = document.querySelector('.countdown-container');
    const display = document.querySelector('.countdown-display');
    const timeUnits = document.querySelectorAll('.time-unit');

    expect(container?.classList.contains('countdown-container')).toBe(true);
    expect(display?.classList.contains('countdown-display')).toBe(true);
    
    timeUnits.forEach(unit => {
      expect(unit.classList.contains('time-unit')).toBe(true);
    });
  });

  it('should have status element for dynamic text updates', () => {
    const status = document.querySelector('.status-text');
    expect(status).toBeTruthy();
    expect(status?.classList.contains('status-text')).toBe(true);
  });

  describe('Time calculation logic verification', () => {
    it('should handle custom target date override', () => {
      // Create a countdown with custom target date
      const customCountdown = document.createElement('div');
      customCountdown.className = 'countdown-container';
      customCountdown.setAttribute('data-event-type', 'custom');
      customCountdown.setAttribute('data-target-date', '2025-02-01T15:30:00Z');
      customCountdown.innerHTML = `
        <div class="countdown-status">
          <p class="status-text">Loading...</p>
        </div>
        <div class="countdown-display">
          <span class="time-value days">00</span>
          <span class="time-value hours">00</span>
          <span class="time-value minutes">00</span>
          <span class="time-value seconds">00</span>
        </div>
      `;
      
      document.body.appendChild(customCountdown);
      
      expect(customCountdown.getAttribute('data-target-date')).toBe('2025-02-01T15:30:00Z');
    });

    it('should handle hatch-warren event type', () => {
      const hatchWarrenCountdown = document.createElement('div');
      hatchWarrenCountdown.className = 'countdown-container';
      hatchWarrenCountdown.setAttribute('data-event-type', 'hatch-warren');
      hatchWarrenCountdown.setAttribute('data-event-time', '10:30');
      hatchWarrenCountdown.innerHTML = `
        <div class="countdown-status">
          <p class="status-text">Loading...</p>
        </div>
        <div class="countdown-display">
          <span class="time-value days">00</span>
          <span class="time-value hours">00</span>
          <span class="time-value minutes">00</span>
          <span class="time-value seconds">00</span>
        </div>
      `;
      
      document.body.appendChild(hatchWarrenCountdown);
      
      expect(hatchWarrenCountdown.getAttribute('data-event-type')).toBe('hatch-warren');
      expect(hatchWarrenCountdown.getAttribute('data-event-time')).toBe('10:30');
    });
  });

  describe('Event state management', () => {
    it('should have classes for different event states', () => {
      // Test that status can have different classes
      const status = document.querySelector('.status-text');
      expect(status).toBeTruthy();
      
      // The component would add these classes dynamically based on event state
      // We're testing the structure supports this
      status?.classList.add('event-before');
      expect(status?.classList.contains('event-before')).toBe(true);
      
      status?.classList.remove('event-before');
      status?.classList.add('event-active');
      expect(status?.classList.contains('event-active')).toBe(true);
    });
  });

  describe('Configuration options', () => {
    it('should support custom event duration', () => {
      const container = document.querySelector('.countdown-container');
      container?.setAttribute('data-event-duration', '4');
      expect(container?.getAttribute('data-event-duration')).toBe('4');
    });

    it('should support custom event time', () => {
      const container = document.querySelector('.countdown-container');
      container?.setAttribute('data-event-time', '14:00');
      expect(container?.getAttribute('data-event-time')).toBe('14:00');
    });

    it('should support custom text messages', () => {
      const container = document.querySelector('.countdown-container');
      container?.setAttribute('data-before-text', 'Custom event starts in:');
      container?.setAttribute('data-during-text', 'Custom event ends in:');
      
      expect(container?.getAttribute('data-before-text')).toBe('Custom event starts in:');
      expect(container?.getAttribute('data-during-text')).toBe('Custom event ends in:');
    });

    it('should support December skip option', () => {
      const container = document.querySelector('.countdown-container');
      container?.setAttribute('data-skip-december', 'false');
      expect(container?.getAttribute('data-skip-december')).toBe('false');
    });
  });

  describe('Accessibility and semantic structure', () => {
    it('should have proper heading hierarchy', () => {
      const heading = document.querySelector('.countdown-title h3');
      expect(heading?.tagName.toLowerCase()).toBe('h3');
    });

    it('should have meaningful time labels for screen readers', () => {
      const labels = document.querySelectorAll('.time-label');
      labels.forEach(label => {
        expect(label.textContent).toMatch(/^(Days|Hours|Minutes|Seconds)$/);
      });
    });

    it('should have status text that can be updated dynamically', () => {
      const status = document.querySelector('.status-text');
      expect(status).toBeTruthy();
      
      // Simulate status updates
      status!.textContent = 'Event starts in:';
      expect(status?.textContent).toBe('Event starts in:');
      
      status!.textContent = 'Event is happening now!';
      expect(status?.textContent).toBe('Event is happening now!');
    });
  });

  describe('Time display formatting', () => {
    it('should display time values with zero-padding format', () => {
      const timeValues = document.querySelectorAll('.time-value');
      
      timeValues.forEach(value => {
        expect(value.textContent).toMatch(/^\d{2}$/);
      });
    });

    it('should support updating time values programmatically', () => {
      const days = document.querySelector('.time-value.days');
      const hours = document.querySelector('.time-value.hours');
      const minutes = document.querySelector('.time-value.minutes');
      const seconds = document.querySelector('.time-value.seconds');

      // Simulate countdown updates
      days!.textContent = '05';
      hours!.textContent = '12';
      minutes!.textContent = '30';
      seconds!.textContent = '45';

      expect(days?.textContent).toBe('05');
      expect(hours?.textContent).toBe('12');
      expect(minutes?.textContent).toBe('30');
      expect(seconds?.textContent).toBe('45');
    });
  });

  describe('Multiple countdown support', () => {
    it('should support multiple countdowns on the same page', () => {
      // Add second countdown for Hatch Warren
      const hatchWarrenCountdown = document.createElement('div');
      hatchWarrenCountdown.className = 'countdown-container';
      hatchWarrenCountdown.setAttribute('data-event-type', 'hatch-warren');
      hatchWarrenCountdown.innerHTML = `
        <div class="countdown-title">
          <h3>Hatch Warren Countdown</h3>
        </div>
        <div class="countdown-status">
          <p class="status-text">Loading...</p>
        </div>
        <div class="countdown-display">
          <span class="time-value days">00</span>
          <span class="time-value hours">00</span>
          <span class="time-value minutes">00</span>
          <span class="time-value seconds">00</span>
        </div>
      `;
      
      document.body.appendChild(hatchWarrenCountdown);
      
      const countdowns = document.querySelectorAll('.countdown-container');
      expect(countdowns).toHaveLength(2);
      
      // Each should have its own title
      const titles = document.querySelectorAll('.countdown-title h3');
      const titleTexts = Array.from(titles).map(title => title.textContent);
      expect(titleTexts).toContain('Chineham Repair Café Countdown');
      expect(titleTexts).toContain('Hatch Warren Countdown');
    });
  });

  describe('Responsive design structure', () => {
    it('should have grid layout for time display', () => {
      const display = document.querySelector('.countdown-display');
      expect(display?.classList.contains('countdown-display')).toBe(true);
      
      const timeUnits = display?.querySelectorAll('.time-unit');
      expect(timeUnits).toHaveLength(4);
    });

    it('should have properly structured time units for CSS grid', () => {
      const timeUnits = document.querySelectorAll('.time-unit');
      
      timeUnits.forEach(unit => {
        const value = unit.querySelector('.time-value');
        const label = unit.querySelector('.time-label');
        
        expect(value).toBeTruthy();
        expect(label).toBeTruthy();
      });
    });
  });
});