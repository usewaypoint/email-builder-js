import EditorBlock from '~/documents/editor/EditorBlock';

export function EditorCanva() {
  return (
    <div className="w-full h-full flex-1 overflow-scroll">
      <EditorBlock id="root" />
    </div>
  );
}
