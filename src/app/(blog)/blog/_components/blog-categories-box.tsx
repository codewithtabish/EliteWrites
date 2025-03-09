"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { categories } from "@/utils/category";

interface BlogCategoryBoxProps {
  selectedCategory?: string;
  onCategorySelect: (category: string) => void;
}

const BlogCategoryBox: React.FC<BlogCategoryBoxProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(selectedCategory || "");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between px-4 py-2 text-white p-7 hover:text-white"
        >
          {value ? (
            <div className="flex items-center gap-2">
              {categories.find((cat) => cat.label === value)?.icon}
              {categories.find((cat) => cat.label === value)?.label}
            </div>
          ) : (
            "Select category..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full bg-[#020817] text-white shadow-lg p-0">
        <Command>
          <CommandInput
            placeholder="Search category..."
            className="px-3 py-2 bg-[#020817] text-white border-b border-gray-700"
          />
          <CommandList>
            <CommandEmpty className="text-center py-2 text-white">
              No category found.
            </CommandEmpty>
            <CommandGroup>
              {categories.map((cat) => (
                <CommandItem
                  key={cat.id}
                  value={cat.label}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    setValue(newValue);
                    onCategorySelect(newValue); // Send selected category to parent
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-[#1e293b] transition"
                >
                  {cat.icon}
                  <span className="text-white">{cat.label}</span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === cat.label ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default BlogCategoryBox;
