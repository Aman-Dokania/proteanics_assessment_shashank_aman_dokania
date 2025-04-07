
import { Extension } from "@tiptap/core";
import Suggestion, { SuggestionOptions, SuggestionProps } from "@tiptap/suggestion";
import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance, Props } from "tippy.js";
import SlashMenu from "../SlashMenu";
import { Editor } from "@tiptap/core";
import { PluginKey } from "prosemirror-state";

const slashCommandKey = new PluginKey('slash-command');

interface CommandItem {
  title: string;
  description?: string;
  icon?: string;
  command: ({ editor }: { editor: Editor }) => void;
}

interface SuggestionItemsParams {
  query: string;
  editor: Editor;
}

export const SlashCommand = Extension.create<{
  suggestion: Omit<SuggestionOptions, "editor"> & {
    items?: (params: SuggestionItemsParams) => CommandItem[];
  };
}>({
  name: "slashCommand",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        startOfLine: true,
        items: () => [], 
        command: ({ editor, range, props }) => {
          props.command({ editor, range });
        },
      }
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
        pluginKey: slashCommandKey,
        items: ({ query, editor }: SuggestionItemsParams) => 
          this.options.suggestion.items?.({ query, editor }) || [],
        render: () => {
          let component: ReactRenderer | null = null;
          let popup: Instance<Props> | null = null;

          return {
            onStart: (props: SuggestionProps) => {
              component = new ReactRenderer(SlashMenu, {
                props: {
                  items: this.options.suggestion.items?.({ 
                    query: "", 
                    editor: this.editor 
                  }) || [],
                  command: props.command,
                },
                editor: this.editor,
              });

              popup = tippy(document.body, {
                getReferenceClientRect: props.clientRect as () => DOMRect,
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
              });
            },
            onUpdate: (props: SuggestionProps) => {
              component?.updateProps({
                items: this.options.suggestion.items?.({ 
                  query: props.query, 
                  editor: this.editor 
                }) || [],
                command: props.command,
              });
              popup?.setProps({
                getReferenceClientRect: props.clientRect as () => DOMRect,
              });
            },
            onKeyDown: (props: { event: KeyboardEvent }) => {
              if (props.event.key === "Escape") {
                popup?.hide();
                return true;
              }
              return (component?.ref as { onKeyDown?: (props: unknown) => boolean })?.onKeyDown?.(props) || false;
            },
            onExit: () => {
              popup?.destroy();
              component?.destroy();
            },
          };
        },
      }),
    ];
  },
});
