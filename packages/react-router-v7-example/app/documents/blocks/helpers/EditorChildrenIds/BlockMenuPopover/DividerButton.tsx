import { Plus } from 'lucide-react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { cn } from '~/lib/utils';

interface DividerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export const DividerButton = forwardRef<HTMLButtonElement, DividerButtonProps>(
  ({ containerRef, ...props }, forwardedRef) => {
    const [visible, setVisible] = useState(false);
    const internalRef = useRef<HTMLButtonElement>(null);

    const buttonRef = internalRef;

    useEffect(() => {
      if (forwardedRef) {
        if (typeof forwardedRef === 'function') {
          forwardedRef(internalRef.current);
        } else {
          forwardedRef.current = internalRef.current;
        }
      }
    }, [forwardedRef]);

    useEffect(() => {
      function listener({ clientX, clientY }: MouseEvent) {
        // Use the containerRef if provided, otherwise use the buttonRef
        const targetElement = containerRef?.current || buttonRef.current;

        if (!targetElement) {
          console.log('No target element:', { containerRef: containerRef?.current, buttonRef: buttonRef.current });
          return;
        }

        const rect = targetElement.getBoundingClientRect();

        const isNearTopEdge = Math.abs(clientY - rect.top) < 20;
        const isNearBottomEdge = Math.abs(clientY - rect.bottom) < 20;
        const isInHorizontalRange = rect.left < clientX && clientX < rect.right;

        if ((isNearTopEdge || isNearBottomEdge) && isInHorizontalRange) {
          setVisible(true);
          return;
        }

        setVisible(false);
      }

      window.addEventListener('mousemove', listener);

      return () => {
        window.removeEventListener('mousemove', listener);
      };
    }, [containerRef, buttonRef]);

    return (
      <button
        ref={buttonRef}
        {...props}
        className={cn(
          `absolute -top-3 left-1/2 -translate-x-1/2 p-0.5 bg-cyan-600 text-white rounded-full z-50 hover:bg-cyan-700 focus:bg-cyan-700 active:bg-cyan-700 transition-all cursor-pointer`,
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
        )}
        tabIndex={visible ? undefined : -1}
      >
        <Plus className="size-5 p-0.5" />
      </button>
    );
  }
);

DividerButton.displayName = 'DividerButton';
