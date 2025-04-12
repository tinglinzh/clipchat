import { Layout, ThemeProvider } from '@lobehub/ui';
import Sidebar from './components/sidebar';
import Chat from './components/chat';
import Draggable from 'react-draggable';
import { useRef } from 'react';
export function Welcome() {
  const dragRef = useRef<HTMLDivElement>(null);
  return (
    <ThemeProvider themeMode='dark' >
      <main className="bg-[#f8f8f8] w-[100vw] h-[100vh] flex items-center justify-center">
        {/* <Draggable nodeRef={dragRef as React.RefObject<HTMLElement>}> */}
        <div ref={dragRef} className=" w-3/5 h-[70vh] bg-[#111111] rounded-xl overflow-hidden shadow-2xl shadow-gray-400">
          <Layout
            headerHeight={0}
            sidebar={
              <Sidebar />
            }
          >
            <Chat />
          </Layout>
        </div>
        {/* </Draggable> */}
      </main>
    </ThemeProvider>
  );
}
