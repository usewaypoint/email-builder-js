import React from 'react';
import { Button } from '~/components/ui/button';

type BlockButtonProps = {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
};

export function BlockButton({ label, icon, onClick }: BlockButtonProps) {
  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      variant="ghost"
      className="flex flex-col gap-1 h-16 w-20 p-3"
    >
      {icon}
      <p className="text-xs text-center mt-1">{label}</p>
    </Button>
  );
}
