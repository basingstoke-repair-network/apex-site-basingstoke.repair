import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('ExpandableCard Component', () => {
  let dom: JSDOM;
  let document: Document;
  let window: Window;

  beforeEach(() => {
    // Mock DOM structure for ExpandableCard
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <div class="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
            <button
              class="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-brn-primary flex justify-between items-center transition-colors duration-200"
              data-accordion-toggle
            >
              <h3 class="text-lg font-semibold text-brn-primary">Test FAQ Question</h3>
              <svg class="w-5 h-5 transform transition-transform duration-200" data-accordion-icon viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="p-4 hidden" data-accordion-content>
              <p>This is the expandable content area for the test FAQ question.</p>
            </div>
          </div>
        </body>
      </html>
    `, { url: 'http://localhost' });

    document = dom.window.document;
    window = dom.window as any;
    global.document = document;
    global.window = window as any;

    // Mock the DOMContentLoaded script
    const buttons = document.querySelectorAll('[data-accordion-toggle]');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const content = button.nextElementSibling as HTMLElement;
        const icon = button.querySelector('[data-accordion-icon]') as HTMLElement;

        if (content?.classList.contains('hidden')) {
          content.classList.remove('hidden');
          content.classList.add('block');
          icon?.classList.add('rotate-180');
        } else {
          content?.classList.remove('block');
          content?.classList.add('hidden');
          icon?.classList.remove('rotate-180');
        }
      });
    });
  });

  it('should render with correct structure and styling', () => {
    const card = document.querySelector('.bg-white.rounded-lg.shadow-md');
    expect(card).toBeTruthy();
    expect(card?.classList.contains('mb-4')).toBe(true);
    expect(card?.classList.contains('overflow-hidden')).toBe(true);
  });

  it('should display the title correctly', () => {
    const title = document.querySelector('h3');
    expect(title?.textContent).toBe('Test FAQ Question');
    expect(title?.classList.contains('text-lg')).toBe(true);
    expect(title?.classList.contains('font-semibold')).toBe(true);
    expect(title?.classList.contains('text-brn-primary')).toBe(true);
  });

  it('should have toggle button with correct attributes', () => {
    const button = document.querySelector('[data-accordion-toggle]');
    expect(button).toBeTruthy();
    expect(button?.classList.contains('w-full')).toBe(true);
    expect(button?.classList.contains('text-left')).toBe(true);
    expect(button?.classList.contains('p-4')).toBe(true);
    expect(button?.classList.contains('bg-gray-100')).toBe(true);
  });

  it('should have expandable icon with correct styling', () => {
    const icon = document.querySelector('[data-accordion-icon]');
    expect(icon).toBeTruthy();
    expect(icon?.classList.contains('w-5')).toBe(true);
    expect(icon?.classList.contains('h-5')).toBe(true);
    expect(icon?.classList.contains('transform')).toBe(true);
    expect(icon?.classList.contains('transition-transform')).toBe(true);
  });

  it('should start with content hidden', () => {
    const content = document.querySelector('[data-accordion-content]');
    expect(content).toBeTruthy();
    expect(content?.classList.contains('hidden')).toBe(true);
    expect(content?.classList.contains('p-4')).toBe(true);
  });

  it('should expand content when toggle button is clicked', () => {
    const button = document.querySelector('[data-accordion-toggle]') as HTMLElement;
    const content = document.querySelector('[data-accordion-content]') as HTMLElement;
    const icon = document.querySelector('[data-accordion-icon]') as HTMLElement;

    // Initial state
    expect(content.classList.contains('hidden')).toBe(true);
    expect(icon.classList.contains('rotate-180')).toBe(false);

    // Click to expand
    const clickEvent = new window.Event('click');
    button.dispatchEvent(clickEvent);

    // After click
    expect(content.classList.contains('hidden')).toBe(false);
    expect(content.classList.contains('block')).toBe(true);
    expect(icon.classList.contains('rotate-180')).toBe(true);
  });

  it('should collapse content when clicked again', () => {
    const button = document.querySelector('[data-accordion-toggle]') as HTMLElement;
    const content = document.querySelector('[data-accordion-content]') as HTMLElement;
    const icon = document.querySelector('[data-accordion-icon]') as HTMLElement;

    const clickEvent = new window.Event('click');

    // First click to expand
    button.dispatchEvent(clickEvent);
    expect(content.classList.contains('block')).toBe(true);

    // Second click to collapse
    button.dispatchEvent(clickEvent);
    expect(content.classList.contains('hidden')).toBe(true);
    expect(content.classList.contains('block')).toBe(false);
    expect(icon.classList.contains('rotate-180')).toBe(false);
  });

  it('should have proper focus styling', () => {
    const button = document.querySelector('[data-accordion-toggle]');
    expect(button?.classList.contains('focus:outline-none')).toBe(true);
    expect(button?.classList.contains('focus:ring-2')).toBe(true);
    expect(button?.classList.contains('focus:ring-brn-primary')).toBe(true);
  });

  it('should have hover effect on button', () => {
    const button = document.querySelector('[data-accordion-toggle]');
    expect(button?.classList.contains('hover:bg-gray-200')).toBe(true);
    expect(button?.classList.contains('transition-colors')).toBe(true);
  });

  it('should display slot content in the expandable area', () => {
    const content = document.querySelector('[data-accordion-content]');
    const paragraph = content?.querySelector('p');
    expect(paragraph?.textContent).toContain('This is the expandable content area');
  });

  it('should have correct flexbox layout for button', () => {
    const button = document.querySelector('[data-accordion-toggle]');
    expect(button?.classList.contains('flex')).toBe(true);
    expect(button?.classList.contains('justify-between')).toBe(true);
    expect(button?.classList.contains('items-center')).toBe(true);
  });

  it('should have proper SVG icon attributes', () => {
    const icon = document.querySelector('[data-accordion-icon]') as SVGElement;
    expect(icon.tagName.toLowerCase()).toBe('svg');
    expect(icon.getAttribute('viewBox')).toBe('0 0 24 24');
    expect(icon.getAttribute('fill')).toBe('none');
    expect(icon.getAttribute('stroke')).toBe('currentColor');
    expect(icon.getAttribute('stroke-width')).toBe('2');
  });

  it('should handle multiple accordion cards independently', () => {
    // Add a second card to test independence
    const secondCard = document.createElement('div');
    secondCard.innerHTML = `
      <button class="w-full" data-accordion-toggle>
        <h3>Second Question</h3>
        <svg data-accordion-icon></svg>
      </button>
      <div class="hidden" data-accordion-content>Second content</div>
    `;
    document.body.appendChild(secondCard);

    // Re-attach event listeners for the new card
    const allButtons = document.querySelectorAll('[data-accordion-toggle]');
    allButtons.forEach(button => {
      button.addEventListener('click', () => {
        const content = button.nextElementSibling as HTMLElement;
        const icon = button.querySelector('[data-accordion-icon]') as HTMLElement;

        if (content?.classList.contains('hidden')) {
          content.classList.remove('hidden');
          content.classList.add('block');
          icon?.classList.add('rotate-180');
        } else {
          content?.classList.remove('block');
          content?.classList.add('hidden');
          icon?.classList.remove('rotate-180');
        }
      });
    });

    const firstButton = allButtons[0] as HTMLElement;
    const secondButton = allButtons[1] as HTMLElement;
    const firstContent = firstButton.nextElementSibling as HTMLElement;
    const secondContent = secondButton.nextElementSibling as HTMLElement;

    const clickEvent = new window.Event('click');

    // Click first accordion
    firstButton.dispatchEvent(clickEvent);
    expect(firstContent.classList.contains('block')).toBe(true);
    expect(secondContent.classList.contains('hidden')).toBe(true);

    // Click second accordion
    secondButton.dispatchEvent(clickEvent);
    expect(firstContent.classList.contains('block')).toBe(true);
    expect(secondContent.classList.contains('block')).toBe(true);
  });
});