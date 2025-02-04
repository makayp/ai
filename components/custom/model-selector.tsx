'use client';

import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { models } from '@/lib/ai/models';
import { cn } from '@/lib/utils';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';

export function ModelSelector({
  selectedModelId,
  className,
}: {
  selectedModelId: string;
} & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);

  const selectedModel = useMemo(
    () => models.find((model) => model.id === selectedModelId),
    [selectedModelId]
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        className={cn(
          'w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground shadow-none border-0 text-gray-600',
          className
        )}
      >
        <Button
          variant='outline'
          className='md:px-4 md:h-[34px] flex items-center text-pretty text-[17px] sm:text-lg md:text-[19px] font-semibold'
        >
          AIPro {selectedModel?.label}
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='min-w-[10px]'>
        {models.map((model) => (
          <DropdownMenuItem
            key={model.id}
            disabled={model.label === 'Others'}
            onSelect={() => {
              setOpen(false);
            }}
            className='gap-4 group/item flex flex-row justify-between items-center text-sm'
            data-active={model.id === selectedModelId}
          >
            <div className='flex flex-col gap-1 items-start'>
              {model.label}
              {model.description && (
                <div className='text-xs text-muted-foreground'>
                  {model.description}
                </div>
              )}
            </div>
            <div className='text-foreground dark:text-foreground opacity-0 group-data-[active=true]/item:opacity-100'>
              <CheckIcon className='size-5' />
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
