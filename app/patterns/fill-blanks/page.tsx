'use client';

import { useState } from 'react';

export default function FillBlanksPattern() {
  const [answers, setAnswers] = useState<{[key: string]: string}>({});
  const [showResults, setShowResults] = useState(false);

  const template = {
    title: "Complete the Story",
    text: "Once upon a time, there was a {adjective} {noun} who lived in a {place}. Every day, the {noun} would {verb} to the {place2} to {verb2} with their friends. One day, they discovered a {adjective2} {object} that could {magical_action}. This changed everything!",
    blanks: [
      { key: 'adjective', label: 'Adjective', hint: 'Describing word (e.g., happy, brave)' },
      { key: 'noun', label: 'Noun', hint: 'Person, place, or thing' },
      { key: 'place', label: 'Place', hint: 'Where they live' },
      { key: 'verb', label: 'Action', hint: 'What they do' },
      { key: 'place2', label: 'Another Place', hint: 'Where they go' },
      { key: 'verb2', label: 'Another Action', hint: 'What they do there' },
      { key: 'adjective2', label: 'Another Adjective', hint: 'Describing the object' },
      { key: 'object', label: 'Object', hint: 'What they found' },
      { key: 'magical_action', label: 'Magical Action', hint: 'What the object can do' }
    ]
  };

  const handleAnswerChange = (key: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const generateStory = () => {
    let story = template.text;
    template.blanks.forEach(blank => {
      const answer = answers[blank.key] || `[${blank.label}]`;
      story = story.replace(`{${blank.key}}`, answer);
    });
    return story;
  };

  const isComplete = () => {
    return template.blanks.every(blank => answers[blank.key] && answers[blank.key].trim() !== '');
  };

  const getCompletionPercentage = () => {
    const filled = template.blanks.filter(blank => answers[blank.key] && answers[blank.key].trim() !== '').length;
    return Math.round((filled / template.blanks.length) * 100);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📝 Fill in the Blanks
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Interactive form completion that guides users through filling in missing information with helpful prompts and real-time feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            
            <div className="space-y-6">
              {/* Progress Indicator */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Completion Progress
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {getCompletionPercentage()}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getCompletionPercentage()}%` }}
                  ></div>
                </div>
              </div>

              {/* Template Preview */}
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  {template.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {template.text.split(/\{([^}]+)\}/).map((part, index) => {
                    if (index % 2 === 1) {
                      const key = part;
                      const answer = answers[key];
                      return answer ? (
                        <span key={index} className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 px-1 rounded font-medium">
                          {answer}
                        </span>
                      ) : (
                        <span key={index} className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 px-1 rounded font-medium">
                          [Fill this in]
                        </span>
                      );
                    }
                    return part;
                  })}
                </p>
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">
                  Fill in the blanks:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {template.blanks.map((blank) => (
                    <div key={blank.key} className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {blank.label}
                      </label>
                      <input
                        type="text"
                        value={answers[blank.key] || ''}
                        onChange={(e) => handleAnswerChange(blank.key, e.target.value)}
                        placeholder={blank.hint}
                        className={`input-field transition-all duration-200 ${
                          answers[blank.key] && answers[blank.key].trim() !== ''
                            ? 'border-green-500 focus:ring-green-500'
                            : 'border-gray-300 focus:ring-blue-500'
                        }`}
                      />
                      {answers[blank.key] && answers[blank.key].trim() !== '' && (
                        <div className="flex items-center text-green-600 dark:text-green-400 text-xs">
                          <span className="mr-1">✓</span>
                          Filled
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowResults(true)}
                  disabled={!isComplete()}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isComplete()
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Generate Story
                </button>
                <button
                  onClick={() => {
                    setAnswers({});
                    setShowResults(false);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <h2 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-200">
              📖 Generated Story
            </h2>
            
            {showResults && isComplete() ? (
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                    Your Completed Story:
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {generateStory()}
                  </p>
                </div>
                
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Great job!</strong> You've successfully completed all the blanks. 
                    Try changing some answers to create different stories!
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  {isComplete() 
                    ? 'Click "Generate Story" to see your completed story!'
                    : 'Fill in all the blanks above to generate your story.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          💻 Code Example
        </h2>
        
        <div className="code-block">
          <pre className="text-sm leading-relaxed">
{`'use client';

import { useState } from 'react';

export default function FillBlanksExample() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const template = {
    text: "Once upon a time, there was a {adjective} {noun} who lived in a {place}.",
    blanks: [
      { key: 'adjective', label: 'Adjective', hint: 'Describing word' },
      { key: 'noun', label: 'Noun', hint: 'Person, place, or thing' },
      { key: 'place', label: 'Place', hint: 'Where they live' }
    ]
  };

  const handleAnswerChange = (key, value) => {
    setAnswers(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const generateStory = () => {
    let story = template.text;
    template.blanks.forEach(blank => {
      const answer = answers[blank.key] || \`[\${blank.label}]\`;
      story = story.replace(\`{\${blank.key}}\`, answer);
    });
    return story;
  };

  const isComplete = () => {
    return template.blanks.every(blank => 
      answers[blank.key] && answers[blank.key].trim() !== ''
    );
  };

  const getCompletionPercentage = () => {
    const filled = template.blanks.filter(blank => 
      answers[blank.key] && answers[blank.key].trim() !== ''
    ).length;
    return Math.round((filled / template.blanks.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Progress</span>
          <span>{getCompletionPercentage()}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: \`\${getCompletionPercentage()}%\` }}
          ></div>
        </div>
      </div>

      {/* Template Preview */}
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="text-sm">
          {template.text.split(/\\{([^}]+)\\}/).map((part, index) => {
            if (index % 2 === 1) {
              const key = part;
              const answer = answers[key];
              return answer ? (
                <span key={index} className="bg-green-100 text-green-800 px-1 rounded">
                  {answer}
                </span>
              ) : (
                <span key={index} className="bg-yellow-100 text-yellow-800 px-1 rounded">
                  [Fill this in]
                </span>
              );
            }
            return part;
          })}
        </p>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {template.blanks.map((blank) => (
          <div key={blank.key}>
            <label className="block text-sm font-medium mb-1">
              {blank.label}
            </label>
            <input
              type="text"
              value={answers[blank.key] || ''}
              onChange={(e) => handleAnswerChange(blank.key, e.target.value)}
              placeholder={blank.hint}
              className={\`input-field \${answers[blank.key] ? 'border-green-500' : 'border-gray-300'}\`}
            />
          </div>
        ))}
      </div>

      {/* Generate Button */}
      <button
        onClick={() => setShowResults(true)}
        disabled={!isComplete()}
        className={\`px-4 py-2 rounded-lg \${isComplete() ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'}\`}
      >
        Generate Story
      </button>

      {/* Results */}
      {showResults && isComplete() && (
        <div className="p-4 bg-white border rounded-lg">
          <h3>Your Story:</h3>
          <p>{generateStory()}</p>
        </div>
      )}
    </div>
  );
}`}
          </pre>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold mb-4 text-green-800 dark:text-green-200">
          ✨ Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Progress Tracking</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Visual progress indicator shows completion status</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Real-time Preview</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">See how your answers fit into the template</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Helpful Hints</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Placeholder text guides users on what to enter</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Validation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ensure all required fields are completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <h3 className="text-lg font-semibold mb-4 text-purple-800 dark:text-purple-200">
          🎯 Common Use Cases
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📚</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Educational Content</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Interactive learning exercises and quizzes</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📝</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Form Templates</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Guided form completion with placeholders</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🎮</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Interactive Stories</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Choose-your-own-adventure style content</p>
          </div>
        </div>
      </div>
    </div>
  );
}
