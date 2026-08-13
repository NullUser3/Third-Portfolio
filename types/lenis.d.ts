declare global {
  interface Window {
    lenis?: {
      scrollTo: (
        target: string | number | HTMLElement,
        options?: {
          offset?: number;
          immediate?: boolean;
          duration?: number;
          easing?: (t: number) => number;
          onComplete?: () => void;
        }
      ) => void;
    };
  }
}

export {};