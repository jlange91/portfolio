import "@testing-library/jest-dom";

// Framer Motion uses IntersectionObserver and ResizeObserver in jsdom
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(globalThis, "ResizeObserver", {
  writable: true,
  value: MockResizeObserver,
});

// matchMedia stub required by ThemeToggle and framer-motion
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
