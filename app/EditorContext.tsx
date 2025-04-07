'use client';
import { createContext, useContext } from 'react';
import { Editor } from '@tiptap/core'; 

const EditorContext = createContext<Editor | null>(null);

export function EditorProvider({ 
  children,
  editor
}: {
  children: React.ReactNode;
  editor: Editor;
}) {
  return (
    <EditorContext.Provider value={editor}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditorContext() {
  const editor = useContext(EditorContext);
  if (!editor) throw new Error('EditorContext not found');
  return editor;
}
