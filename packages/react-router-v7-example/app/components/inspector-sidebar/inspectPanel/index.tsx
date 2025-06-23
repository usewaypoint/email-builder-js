import { setDocument, useDocument, useSelectedBlockId } from '~/context/editor';
import type { TEditorBlock } from '~/documents/editor/core';
import AvatarSidebarPanel from './panels/AvatarSidebarPanel';
import ButtonSidebarPanel from './panels/ButtonSidebarPanel';
import ContainerSidebarPanel from './panels/ContainerSidebarPanel';

export function InspectPanel() {
  const document = useDocument();
  const selectedBlockId = useSelectedBlockId();

  if (!selectedBlockId) {
    return <p className="text-muted-foreground">Click on a block to inspect.</p>;
  }
  const block = document[selectedBlockId];
  if (!block) {
    return (
      <p className="text-muted-foreground">
        Block with id ${selectedBlockId} was not found. Click on a block to reset.
      </p>
    );
  }

  const { data, type } = block;

  // TypePanel will pass out new data, and setBlock will update the selected block
  const setBlock = (conf: TEditorBlock) => setDocument({ [selectedBlockId]: conf });

  // TODO: Implement the inspect panel based on the block type
  switch (type) {
    case 'Avatar':
      return <AvatarSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Button':
      return <ButtonSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'ColumnsContainer':
      //   return (
      //     <ColumnsContainerSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />
      //   );
      break;
    case 'Container':
      return <ContainerSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Divider':
    //   return <DividerSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Heading':
    //   return <HeadingSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Html':
    //   return <HtmlSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Image':
    //   return <ImageSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'EmailLayout':
    //   return <EmailLayoutSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Spacer':
    //   return <SpacerSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Text':
    //   return <TextSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    default:
      return (
        <div className="space-y-3">
          <p className="bg-destructive text-xs text-white px-2 py-1.5">
            block type <code className="font-mono">{type}</code> is not supported yet.
          </p>
          <pre className="text-xs">{JSON.stringify(block, null, '  ')}</pre>;
        </div>
      );
  }
}
