
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
    <div className="absolute bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 w-60 z-50">
      {items.map((item, index) => (
        <button
          key={index}
          className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
            index === selectedIndex ? "bg-gray-100 dark:bg-gray-700" : ""
          }`}
          onClick={() => selectItem(index)}
        >
          {item.icon && <span>{item.icon}</span>}
          <div>
            <p className="font-medium text-sm">{item.title}</p>
            {item.description && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
});

SlashMenu.displayName = "SlashMenu";
export default SlashMenu;
