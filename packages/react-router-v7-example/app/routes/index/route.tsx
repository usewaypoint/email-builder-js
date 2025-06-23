import type { Route } from './+types/route';

import { useEffect } from 'react';
import { InspectorSidebar } from '~/components/inspector-sidebar';
import { TemplateSidebar } from '~/components/template-sidebar';
import WELCOME from '~/components/templates/welcome';
import { resetDocument } from '~/context/editor';
import { restoreSharedDocument } from '~/lib/utils/get-template';
import { Canvas } from './canvas';
import { Header } from './header';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }];
}

export default function Home() {
  useEffect(() => {
    if (window && window.location.hash.startsWith('#code/')) {
      restoreSharedDocument(window.location.hash);
    } else {
      resetDocument(WELCOME);
    }
  }, []);

  return (
    <div className="flex h-svh overflow-hidden bg-background">
      {/* Left Sidebar */}
      <TemplateSidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <Header />

        {/* Canvas */}
        <div className="flex-1 overflow-auto">
          <Canvas />
        </div>
      </div>

      {/* Right Sidebar */}
      <InspectorSidebar />
    </div>
  );
}
