'use client';

import { useState } from 'react';

export default function PreviewPattern() {
  const [text, setText] = useState('Hello World');
  const [fontSize, setFontSize] = useState(16);
  const [color, setColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textAlign, setTextAlign] = useState('left');
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          👁️ Preview Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Show live previews of changes as users make them, providing immediate visual feedback and reducing the need for trial and error.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Adjust the controls below to see the live preview update in real-time. This pattern is perfect for design tools, editors, and configuration panels.
            </p>
            
            <div className="space-y-4">
              {/* Controls */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Text Content
                  </label>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="input-field"
                    placeholder="Enter text to preview..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Font Size: {fontSize}px
                    </label>
                    <input
                      type="range"
                      min="8"
                      max="72"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Color
                    </label>
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Font Family
                    </label>
                    <select
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      className="input-field"
                    >
                      <option value="Arial">Arial</option>
                      <option value="Helvetica">Helvetica</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Verdana">Verdana</option>
                      <option value="Courier New">Courier New</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Text Align
                    </label>
                    <select
                      value={textAlign}
                      onChange={(e) => setTextAlign(e.target.value)}
                      className="input-field"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                      <option value="justify">Justify</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              🖼️ Live Preview
            </h2>
            <div className="bg-white dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 min-h-[200px] flex items-center justify-center">
              <div
                style={{
                  fontSize: `${fontSize}px`,
                  color: color,
                  fontFamily: fontFamily,
                  textAlign: textAlign as any,
                  lineHeight: '1.4',
                  maxWidth: '100%',
                  wordWrap: 'break-word'
                }}
              >
                {text || 'Enter text to see preview...'}
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <p><strong>Current Settings:</strong></p>
              <ul className="mt-1 space-y-1">
                <li>• Font: {fontFamily}</li>
                <li>• Size: {fontSize}px</li>
                <li>• Color: {color}</li>
                <li>• Alignment: {textAlign}</li>
              </ul>
            </div>
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
{`import { useState } from 'react';

export default function PreviewPattern() {
  const [text, setText] = useState('Hello World');
  const [fontSize, setFontSize] = useState(16);
  const [color, setColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textAlign, setTextAlign] = useState('left');

  return (
    <div className="preview-container">
      {/* Controls Panel */}
      <div className="controls-panel">
        <h2 className="controls-title">🎯 Controls</h2>
        
        <div className="controls-grid">
          <div className="control-group">
            <label className="control-label">Text Content</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="text-input"
              placeholder="Enter text to preview..."
            />
          </div>

          <div className="control-group-inline">
            <div className="control-group">
              <label className="control-label">Font Size: {fontSize}px</label>
              <input
                type="range"
                min="8"
                max="72"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="range-input"
              />
            </div>
            <div className="control-group">
              <label className="control-label">Color</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="color-input"
              />
            </div>
          </div>

          <div className="control-group-inline">
            <div className="control-group">
              <label className="control-label">Font Family</label>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="select-input"
              >
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Georgia">Georgia</option>
                <option value="Verdana">Verdana</option>
                <option value="Courier New">Courier New</option>
              </select>
            </div>
            <div className="control-group">
              <label className="control-label">Text Align</label>
              <select
                value={textAlign}
                onChange={(e) => setTextAlign(e.target.value)}
                className="select-input"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
                <option value="justify">Justify</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="preview-panel">
        <h2 className="preview-title">🖼️ Live Preview</h2>
        <div className="preview-area">
          <div
            className="preview-text"
            style={{
              fontSize: \`\${fontSize}px\`,
              color: color,
              fontFamily: fontFamily,
              textAlign: textAlign
            }}
          >
            {text || 'Enter text to see preview...'}
          </div>
        </div>
        <div className="preview-settings">
          <p><strong>Current Settings:</strong></p>
          <ul>
            <li>• Font: {fontFamily}</li>
            <li>• Size: {fontSize}px</li>
            <li>• Color: {color}</li>
            <li>• Alignment: {textAlign}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}`}
            </pre>
          ) : (
            <pre className="text-sm leading-relaxed">
{`/* Preview Pattern CSS */

/* Preview Container */
.preview-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

/* Controls Panel */
.controls-panel {
  background: linear-gradient(135deg, #eff6ff 0%, #f3e8ff 100%);
  border: 1px solid #3b82f6;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.controls-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.controls-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Control Groups */
.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-group-inline {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

/* Control Labels */
.control-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
  display: block;
}

/* Input Controls */
.text-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  background-color: white;
}

.text-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.range-input {
  width: 100%;
  height: 0.5rem;
  background: #e5e7eb;
  border-radius: 0.25rem;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.range-input::-webkit-slider-thumb {
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.range-input::-webkit-slider-thumb:hover {
  background: #2563eb;
  transform: scale(1.1);
}

.color-input {
  width: 100%;
  height: 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
  background: none;
}

.color-input::-webkit-color-swatch-wrapper {
  padding: 0;
}

.color-input::-webkit-color-swatch {
  border: none;
  border-radius: 0.25rem;
}

.select-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.select-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Preview Panel */
.preview-panel {
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.preview-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Preview Area */
.preview-area {
  background: white;
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  padding: 1.5rem;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
}

.preview-area::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(45deg, #f8fafc 25%, transparent 25%), 
    linear-gradient(-45deg, #f8fafc 25%, transparent 25%), 
    linear-gradient(45deg, transparent 75%, #f8fafc 75%), 
    linear-gradient(-45deg, transparent 75%, #f8fafc 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  opacity: 0.3;
  pointer-events: none;
}

.preview-text {
  position: relative;
  z-index: 1;
  line-height: 1.4;
  max-width: 100%;
  word-wrap: break-word;
  transition: all 0.3s ease;
}

/* Preview Settings Display */
.preview-settings {
  font-size: 0.875rem;
  color: #6b7280;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.75rem;
}

.preview-settings strong {
  color: #374151;
  font-weight: 600;
}

.preview-settings ul {
  margin-top: 0.5rem;
  list-style: none;
  padding: 0;
}

.preview-settings li {
  padding: 0.125rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.preview-settings li:last-child {
  border-bottom: none;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .preview-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1rem;
  }
  
  .control-group-inline {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .controls-panel,
  .preview-panel {
    padding: 1rem;
  }
  
  .preview-area {
    min-height: 150px;
    padding: 1rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .controls-panel {
    background: linear-gradient(135deg, #1e3a8a 0%, #581c87 100%);
    border-color: #3b82f6;
  }
  
  .controls-title {
    color: #60a5fa;
  }
  
  .control-label {
    color: #f9fafb;
  }
  
  .text-input,
  .select-input {
    background-color: #1f2937;
    border-color: #374151;
    color: #f9fafb;
  }
  
  .text-input:focus,
  .select-input:focus {
    border-color: #60a5fa;
  }
  
  .range-input {
    background: #374151;
  }
  
  .range-input::-webkit-slider-thumb {
    background: #60a5fa;
  }
  
  .color-input {
    border-color: #374151;
  }
  
  .preview-panel {
    background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
    border-color: #374151;
  }
  
  .preview-title {
    color: #f9fafb;
  }
  
  .preview-area {
    background: #111827;
    border-color: #4b5563;
  }
  
  .preview-settings {
    background: #1f2937;
    border-color: #374151;
    color: #9ca3af;
  }
  
  .preview-settings strong {
    color: #f9fafb;
  }
  
  .preview-settings li {
    border-bottom-color: #374151;
  }
}

/* Interactive States */
.text-input:hover,
.select-input:hover {
  border-color: #9ca3af;
}

.color-input:hover {
  transform: scale(1.02);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Animation for preview updates */
.preview-text {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Enhanced focus states */
.text-input:focus-visible,
.select-input:focus-visible,
.color-input:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Accessibility */
.range-input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Preview transitions */
.preview-text {
  transition: font-size 0.2s ease, color 0.2s ease, font-family 0.2s ease, text-align 0.2s ease;
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Real-time Updates</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Instant visual feedback as users make changes</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Reduced Trial & Error</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Users can see results immediately without guessing</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Contextual Preview</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Show changes in the actual context they'll be used</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Performance Optimized</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Efficient updates that don't slow down the interface</p>
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
            <div className="text-2xl mb-2">🎨</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Design Tools</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Live preview of design changes in graphic editors</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📝</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Text Editors</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Real-time formatting preview in rich text editors</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚙️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Configuration</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Settings panels with live preview of changes</p>
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
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Debounce Updates</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Limit update frequency for performance</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">2.</span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Show Context</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Preview changes in realistic environments</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">3.</span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Optimize Rendering</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Use efficient rendering techniques</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">4.</span>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Clear Boundaries</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Distinguish preview from actual content</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}