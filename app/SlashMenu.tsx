"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { Editor } from "@tiptap/core";

interface CommandItem {
  title: string;
  description?: string;
  icon?: string;
  command: ({ editor }: { editor: Editor }) => void;
}

interface SlashMenuProps {
  items: CommandItem[];
  command: (item: CommandItem) => void;
}

export interface SlashMenuRef {
  onKeyDown: (event: KeyboardEvent) => boolean;
}

const SlashMenu = forwardRef<SlashMenuRef, SlashMenuProps>(({ items, command }, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useImperativeHandle(ref, () => ({
    onKeyDown: (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev + 1) % items.length);
        return true;
      }
      if (event.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
        return true;
      }
      if (event.key === "Enter") {
        selectItem(selectedIndex);
        return true;
      }
      return false;
    },
  }));

  const selectItem = (index: number) => {
    const item = items[index];
    if (item) {
      command(item);
    }
  };

  return (
    <div className="absolute z-50 w-72 bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-2 space-y-1 border border-gray-200 dark:border-gray-700">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => selectItem(index)}
          className={`group w-full flex items-start gap-3 rounded-xl px-3 py-2 transition-colors duration-150 text-left 
            ${index === selectedIndex
              ? "bg-gray-100 dark:bg-gray-800"
              : "hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
        >
          {item.icon && (
            <span className="text-xl mt-0.5">{item.icon}</span>
          )}
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{item.title}</span>
            {item.description && (
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.description}</span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
});

SlashMenu.displayName = "SlashMenu";
export default SlashMenu;
