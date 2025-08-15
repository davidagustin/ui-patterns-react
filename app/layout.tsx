import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UI Patterns Learning App",
  description: "Learn and practice UI design patterns interactively",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold">🎨 UI Patterns Learning App</h1>
            <p className="text-blue-100 mt-2">Interactive examples for mastering UI design patterns</p>
          </div>
        </header>
        <main className="container mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
