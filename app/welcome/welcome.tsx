import { Layout, ThemeProvider } from '@lobehub/ui';
import Sidebar from './components/sidebar';
export function Welcome() {
  return (
    <ThemeProvider themeMode='dark' >
      <main className="bg-[#f8f8f8] w-[100vw] h-[100vh] flex items-center justify-center">
        <div className=" w-3/5 h-[70vh] bg-[#111111] rounded-xl overflow-hidden shadow-2xl shadow-gray-400">
          <Layout
            headerHeight={0}
            sidebar={
              <Sidebar />
            }
          >
            <div>
              1231312415
            </div>
          </Layout>
        </div>
      </main>
    </ThemeProvider>
  );
}
