import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
  buttonElement: HTMLElement | null;
  onClick: () => void;
};
export function DividerButton({ buttonElement, onClick }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function listener({ clientX, clientY }: MouseEvent) {
      if (!buttonElement) {
        return;
      }
      const rect = buttonElement.getBoundingClientRect();
      const rectY = rect.y;
      const bottomX = rect.x;
      const topX = bottomX + rect.width;

      if (Math.abs(clientY - rectY) < 20) {
        if (bottomX < clientX && clientX < topX) {
          setVisible(true);
          return;
        }
      }
      setVisible(false);
    }
    window.addEventListener('mousemove', listener);
    return () => {
      window.removeEventListener('mousemove', listener);
    };
  }, [buttonElement, setVisible]);

  return (
    <button
      className={`${visible ? 'opacity-100' : 'opacity-0'} absolute -top-3 left-1/2 -translate-x-1/2 p-0.5 bg-cyan-600 text-white rounded-full z-50 hover:bg-cyan-700 focus:bg-cyan-700 active:bg-cyan-700 transition-all cursor-pointer`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <Plus className="size-5 p-0.5" />
    </button>
  );
}
