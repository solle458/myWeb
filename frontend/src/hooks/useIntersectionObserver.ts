import { useState, useEffect, RefObject } from 'react';

interface IntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useIntersectionObserver = (
  ref: RefObject<HTMLElement>,
  options: IntersectionObserverOptions = {}
) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > (options.threshold || 0.1)) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        rootMargin: options.rootMargin || '0px',
        threshold: options.threshold || 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // 初期表示を設定
    setIsVisible(true);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options.rootMargin, options.threshold]);

  return isVisible;
};
