// utils/validation.ts
import { Schema } from 'prosemirror-model';

export function validateContent(content: string, schema: Schema) {
  try {
    // Attempt to parse as ProseMirror node
    const doc = schema.nodeFromJSON(JSON.parse(content));
    doc.check(); // Validate against schema
    return { valid: true, content: doc };
  } catch {
    // Fallback to paragraph if invalid
    return {
      valid: false,
      content: schema.nodes.paragraph.create(
        {},
        schema.text(content)
      )
    };
  }
}
