interface PatternHeaderProps {
  title: string;
  description: string;
  emoji?: string;
}

export default function PatternHeader({
  title,
  description,
  emoji,
}: PatternHeaderProps) {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {emoji && `${emoji} `}
        {title}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
}
