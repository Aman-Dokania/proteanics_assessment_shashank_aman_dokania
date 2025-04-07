
import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { CalloutComponent } from '../CalloutComponent';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    callout: {
      setCallout: (attributes?: { calloutType: string }) => ReturnType;
      changeCalloutType: (type: string) => ReturnType;
    };
  }
}

export const Callout = Node.create({
  name: 'callout',
  group: 'block',
  content: 'block+',
  defining: true,

  addAttributes() {
    return {
      calloutType: {
        default: 'info',
        parseHTML: (element) => element.getAttribute('data-callout-type'),
        renderHTML: (attributes) => ({
          'data-callout-type': attributes.calloutType,
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-callout-type]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', HTMLAttributes, 0];
  },

  addCommands() {
    return {
      setCallout:
        () =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: { calloutType: 'info' },
            content: [{
              type: 'paragraph', 
            }],
          }),
      changeCalloutType:
        (type) =>
        ({ chain }) =>
          chain().updateAttributes(this.name, { calloutType: type }).run(),
    };
  },

  addKeyboardShortcuts() {
    return {
      'Alt-c': () => this.editor.commands.setCallout(),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutComponent);
  },
});
