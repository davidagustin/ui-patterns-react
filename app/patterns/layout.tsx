import Link from "next/link";

export default function PatternLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
        >
          <span className="mr-2">←</span>
          Back to Patterns
        </Link>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          UI Patterns Learning App
        </div>
      </div>
      <div className="pattern-card">{children}</div>
    </div>
  );
}
