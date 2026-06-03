import { useEffect, useRef, useCallback } from 'react';

declare global {
  interface Window {
    turnstile: {
      render: (container: string | HTMLElement, opts: Record<string, unknown>) => string;
      execute: (widgetId: string, opts?: Record<string, unknown>) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY;

export function useTurnstile() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const resolveRef = useRef<((token: string) => void) | null>(null);
  const readyRef = useRef(false);

  useEffect(() => {
    const container = document.createElement('div');
    container.id = 'turnstile-' + Math.random().toString(36).slice(2, 10);
    container.style.display = 'none';
    document.body.appendChild(container);
    containerRef.current = container;

    const interval = setInterval(() => {
      if (typeof window.turnstile !== 'undefined') {
        clearInterval(interval);
        widgetIdRef.current = window.turnstile.render(container, {
          sitekey: SITE_KEY,
          execution: 'execute',
          callback: (token: string) => {
            resolveRef.current?.(token);
            resolveRef.current = null;
          },
          'expired-callback': () => {
            resolveRef.current = null;
          },
          'error-callback': () => {
            resolveRef.current = null;
          },
        });
        readyRef.current = true;
      }
    }, 100);

    return () => {
      clearInterval(interval);
      if (widgetIdRef.current && typeof window.turnstile !== 'undefined') {
        window.turnstile.remove(widgetIdRef.current);
      }
      container.remove();
    };
  }, []);

  const execute = useCallback(async (): Promise<string> => {
    if (!widgetIdRef.current || typeof window.turnstile === 'undefined') {
      throw new Error('Turnstile no está listo');
    }
    return new Promise((resolve, reject) => {
      resolveRef.current = resolve;
      const timeout = setTimeout(() => {
        resolveRef.current = null;
        reject(new Error('Turnstile timeout'));
      }, 30000);
      window.turnstile.execute(widgetIdRef.current!, {
        callback: (token: string) => {
          clearTimeout(timeout);
          resolve(token);
        },
      });
    });
  }, []);

  return { execute, ready: readyRef.current };
}
