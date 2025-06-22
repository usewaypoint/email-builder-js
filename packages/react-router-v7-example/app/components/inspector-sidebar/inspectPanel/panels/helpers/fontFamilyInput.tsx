import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '~/components/ui/command';
import { Label } from '~/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { FONT_FAMILIES } from '~/documents/blocks/helpers/fontFamily';
import { cn } from '~/lib/utils';

export function FontFamilyInput({ label = 'Font family', defaultValue = 'inherit', onChange = (value: string) => {} }) {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState(defaultValue);

  const fontFamiliesWithInherit = [
    {
      label: 'Match email settings',
      key: 'inherit',
      value: 'inherit',
    },
    ...FONT_FAMILIES,
  ];

  return (
    <div className="space-y-1">
      <Label htmlFor="font-family">{label}</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="font-family"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {fontFamiliesWithInherit.find((font) => font.key === key)?.label}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Search font..." className="h-9" />
            <CommandList>
              <CommandEmpty>No font found.</CommandEmpty>
              <CommandGroup>
                {fontFamiliesWithInherit.map((font) => (
                  <CommandItem
                    key={font.key}
                    value={font.key}
                    onSelect={(currentKey) => {
                      setKey(currentKey === key ? '' : currentKey);
                      onChange(currentKey);
                      setOpen(false);
                    }}
                  >
                    <span className="font-sans" style={{ fontFamily: font.value }}>
                      {font.label}
                    </span>
                    <Check className={cn('ml-auto', key === font.key ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
