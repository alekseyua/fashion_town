import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { GxInput } from '@garpix/garpix-web-components-react';

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, Document, Paragraph, Text],
    content: '',
  });

  return (
    <GxInput>
      <EditorContent editor={editor} />
    </GxInput>
  );
};

export default React.memo(Tiptap);
