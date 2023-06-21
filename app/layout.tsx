import './globals.css';
import Provider from './provider';
import Navbar from './components/nav-bar';
import MonitorSession from './components/monitor-session';

export const metadata = {
  title: 'e2e lesson',
  description: 'playwrightの練習用サイトです',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Provider>
          <MonitorSession />
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
