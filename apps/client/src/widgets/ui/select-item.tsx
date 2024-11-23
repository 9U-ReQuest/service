"use client";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command";
import Typography from "@/shared/ui/common/typography/typography";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

interface SelectItemProps {
  placeholder?: string;
  items: { value: string; label: string }[];
  value: string[];
  setValue: (value: string[]) => void;
}

export default function SelectItem({
  placeholder = "아이템을 골라주세요",
  items,
  value,
  setValue,
}: SelectItemProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (currentValue: string) => {
    if (value.includes(currentValue)) {
      setValue(value.filter((item) => item !== currentValue));
    } else {
      if (value.length < 3) {
        setValue([...value, currentValue]);
      }
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          // biome-ignore lint/a11y/useSemanticElements: <explanation>
          role="combobox"
          aria-expanded={open}
          className="w-[350px] justify-between"
        >
          {/* overflow: hidden;
          white-space: nowrap; */}
          <Typography
            size="sm"
            weight="medium"
            className="overflow-hidden whitespace-nowrap overflow-ellipsis truncate"
          >
            {value.length > 0
              ? value.map((val) => items.find((item) => item.value === val)?.label || "").join(", ")
              : placeholder}
          </Typography>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup className="overflow-hidden">
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => {
                    handleSelect(item.value);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(item.value) ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
