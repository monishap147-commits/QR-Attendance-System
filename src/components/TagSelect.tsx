import { useState, useRef, useEffect } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface TagSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  onCreate?: (value: string) => void;
  placeholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Type-or-select combobox.
 * - Select from existing options
 * - OR type a new value and press Enter (or click "Create") to add it
 */
export function TagSelect({
  value,
  onChange,
  options,
  onCreate,
  placeholder = "Type or select…",
  emptyText = "No matches. Press Enter to add.",
  disabled,
  className,
}: TagSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    if (open && triggerRef.current) setWidth(triggerRef.current.offsetWidth);
  }, [open]);

  const trimmed = query.trim();
  const exists = options.some((o) => o.toLowerCase() === trimmed.toLowerCase());
  const canCreate = !!trimmed && !exists;

  const handleSelect = (val: string) => {
    onChange(val);
    setQuery("");
    setOpen(false);
  };

  const handleCreate = () => {
    if (!canCreate) return;
    onCreate?.(trimmed);
    handleSelect(trimmed);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn("w-full justify-between font-normal", !value && "text-muted-foreground", className)}
        >
          <span className="truncate">{value || placeholder}</span>
          <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start" style={{ width }}>
        <Command shouldFilter>
          <CommandInput
            placeholder={placeholder}
            value={query}
            onValueChange={setQuery}
            onKeyDown={(e) => {
              if (e.key === "Enter" && canCreate) {
                e.preventDefault();
                handleCreate();
              }
            }}
          />
          <CommandList>
            <CommandEmpty>
              {canCreate ? (
                <button
                  type="button"
                  onClick={handleCreate}
                  className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded hover:bg-accent"
                >
                  <Plus className="h-4 w-4" /> Add "{trimmed}"
                </button>
              ) : (
                <span className="block px-2 py-1.5 text-sm text-muted-foreground">{emptyText}</span>
              )}
            </CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem key={opt} value={opt} onSelect={() => handleSelect(opt)}>
                  <Check className={cn("mr-2 h-4 w-4", value === opt ? "opacity-100" : "opacity-0")} />
                  {opt}
                </CommandItem>
              ))}
              {canCreate && (
                <CommandItem value={`__create_${trimmed}`} onSelect={handleCreate}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add "{trimmed}"
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
