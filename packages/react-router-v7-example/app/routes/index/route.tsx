import type { Route } from './+types/route';

import { InspectorSidebar } from '~/components/inspector-sidebar';
import { TemplateSidebar } from '~/components/template-sidebar';
import { Canvas } from './canvas';
import { Header } from './header';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }];
}

export default function Home() {
  return (
    <div className="flex min-h-screen max-h-svh overflow-hidden">
      {/* Left Sidebar */}
      <TemplateSidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <Header />

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto">
          <Canvas />
        </div>
      </div>

      {/* Right Sidebar */}
      <InspectorSidebar />
    </div>
  );
}
