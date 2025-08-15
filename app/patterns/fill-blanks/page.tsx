'use client';

import { useState } from 'react';

export default function FillBlanksPattern() {
  const [answers, setAnswers] = useState<{[key: string]: string}>({});
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

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
        
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
          <button
            onClick={() => setActiveTab('jsx')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'jsx'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            JSX
          </button>
          <button
            onClick={() => setActiveTab('css')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'css'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            CSS
          </button>
        </div>

        {/* Tab Content */}
        <div className="code-block">
          {activeTab === 'jsx' ? (
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
          ) : (
            <pre className="text-sm leading-relaxed">
{`/* Fill in the Blanks CSS */

/* Main Container */
.fill-blanks-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

/* Interactive Panel */
.interactive-panel {
  background: linear-gradient(135deg, #eff6ff 0%, #f3e8ff 100%);
  border: 1px solid #3b82f6;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.panel-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Progress Bar */
.progress-container {
  margin-bottom: 1.5rem;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.progress-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.progress-percentage {
  font-size: 0.875rem;
  color: #6b7280;
}

.progress-bar {
  width: 100%;
  height: 0.5rem;
  background-color: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #3b82f6;
  border-radius: inherit;
  transition: width 0.3s ease;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Template Preview */
.template-preview {
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.template-title {
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.template-text {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.6;
}

/* Blank Indicators */
.blank-filled {
  background-color: #d1fae5;
  color: #065f46;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-weight: 500;
  display: inline-block;
  margin: 0 0.125rem;
  transition: all 0.2s ease;
}

.blank-empty {
  background-color: #fef3c7;
  color: #92400e;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-weight: 500;
  display: inline-block;
  margin: 0 0.125rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Input Section */
.input-section {
  margin-bottom: 1.5rem;
}

.input-section-title {
  font-weight: 500;
  color: #374151;
  margin-bottom: 1rem;
}

.input-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

/* Input Field */
.input-field-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.input-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.input-field {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  background-color: white;
}

.input-field:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-field.filled {
  border-color: #10b981;
  background-color: #f0fdfa;
}

.input-field.filled:focus {
  border-color: #059669;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

/* Validation Feedback */
.validation-success {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #10b981;
  margin-top: 0.25rem;
}

.validation-icon {
  width: 0.75rem;
  height: 0.75rem;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.primary-button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
}

.primary-button.enabled {
  background-color: #3b82f6;
  color: white;
}

.primary-button.enabled:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.primary-button.disabled {
  background-color: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
}

.secondary-button {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-weight: 500;
  background-color: white;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
}

.secondary-button:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

/* Results Panel */
.results-panel {
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
  border: 1px solid #10b981;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.results-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #065f46;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Generated Story */
.story-container {
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.story-title {
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.story-text {
  color: #374151;
  line-height: 1.6;
}

/* Success Message */
.success-message {
  background: #dbeafe;
  border: 1px solid #3b82f6;
  border-radius: 0.5rem;
  padding: 0.75rem;
}

.success-text {
  font-size: 0.875rem;
  color: #1e40af;
}

/* Placeholder Message */
.placeholder-message {
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
}

.placeholder-text {
  color: #6b7280;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .fill-blanks-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1rem;
  }
  
  .input-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .interactive-panel,
  .results-panel {
    padding: 1rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .primary-button,
  .secondary-button {
    width: 100%;
    justify-content: center;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .interactive-panel {
    background: linear-gradient(135deg, #1e3a8a 0%, #581c87 100%);
    border-color: #3b82f6;
  }
  
  .panel-title {
    color: #60a5fa;
  }
  
  .progress-label {
    color: #f9fafb;
  }
  
  .progress-percentage {
    color: #d1d5db;
  }
  
  .progress-bar {
    background-color: #374151;
  }
  
  .template-preview {
    background: #1f2937;
    border-color: #374151;
  }
  
  .template-title {
    color: #f9fafb;
  }
  
  .template-text {
    color: #9ca3af;
  }
  
  .blank-filled {
    background-color: #064e3b;
    color: #34d399;
  }
  
  .blank-empty {
    background-color: #451a03;
    color: #fbbf24;
  }
  
  .input-section-title {
    color: #f9fafb;
  }
  
  .input-label {
    color: #f9fafb;
  }
  
  .input-field {
    background-color: #1f2937;
    border-color: #374151;
    color: #f9fafb;
  }
  
  .input-field:focus {
    border-color: #60a5fa;
  }
  
  .input-field.filled {
    background-color: #064e3b;
    border-color: #10b981;
  }
  
  .secondary-button {
    background-color: #1f2937;
    border-color: #374151;
    color: #f9fafb;
  }
  
  .secondary-button:hover {
    background-color: #374151;
  }
  
  .results-panel {
    background: linear-gradient(135deg, #064e3b 0%, #065f46 100%);
    border-color: #10b981;
  }
  
  .results-title {
    color: #34d399;
  }
  
  .story-container {
    background: #1f2937;
    border-color: #374151;
  }
  
  .story-title,
  .story-text {
    color: #f9fafb;
  }
  
  .success-message {
    background: #1e3a8a;
    border-color: #3b82f6;
  }
  
  .success-text {
    color: #60a5fa;
  }
  
  .placeholder-message {
    background: #1f2937;
    border-color: #374151;
  }
  
  .placeholder-text {
    color: #9ca3af;
  }
}

/* Accessibility */
.input-field:focus-visible,
.primary-button:focus-visible,
.secondary-button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Animation for completed fields */
.input-field.filled {
  animation: successPulse 0.5s ease;
}

@keyframes successPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

/* Loading state for buttons */
.primary-button.loading {
  position: relative;
  color: transparent;
}

.primary-button.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}`}
            </pre>
          )}
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

      {/* Best Practices */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold mb-4 text-yellow-800 dark:text-yellow-200">
          💡 Best Practices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">1.</span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Clear Instructions</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Provide helpful hints and examples for each field</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">2.</span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Progress Tracking</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Show completion progress to motivate users</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">3.</span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Real-time Preview</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Show how inputs fit into the final result</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">4.</span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Validation Feedback</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Provide immediate feedback on field completion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
