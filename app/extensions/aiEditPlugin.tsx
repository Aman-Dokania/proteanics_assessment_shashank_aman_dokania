
import { Plugin, PluginKey } from 'prosemirror-state';

export const aiEditPluginKey = new PluginKey('ai-edit');

export const aiEditPlugin = new Plugin({
  key: aiEditPluginKey,
  state: {
    init: () => ({
      active: false,
      originalText: '',
      selection: { from: 0, to: 0 }
    }),
    apply(tr, prev) {
      const meta = tr.getMeta(aiEditPluginKey);
      return meta ? { ...prev, ...meta } : prev;
    }
  },
  props: {
    handleKeyDown(view, event) {
      if ((event.ctrlKey || event.metaKey) && event.key === 'e') {
        const { from, to } = view.state.selection;
        if (from === to) return false;
        
        view.dispatch(view.state.tr.setMeta(aiEditPluginKey, {
          active: true,
          originalText: view.state.doc.textBetween(from, to),
          selection: { from, to }
        }));
        
        return true;
      }
      return false;
    }
  }
});
