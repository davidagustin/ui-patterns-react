'use client';

import { useState, useRef } from 'react';

export default function WysiwygPattern() {
  const [content, setContent] = useState('Welcome to the WYSIWYG editor! This is a rich text editor where you can format your content using the toolbar above.\n\nTry italicizing text, creating underlined text, or even making lists. Click the buttons in the toolbar to format your text!');
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const editorRef = useRef<HTMLDivElement>(null);
  const [showSource, setShowSource] = useState(false);
  const [htmlContent, setHtmlContent] = useState('<p>Welcome to the WYSIWYG editor! This is a <strong>rich text editor</strong> where you can format your content using the toolbar above.</p><p>Try <em>italicizing</em> text, creating <u>underlined</u> text, or even making lists:</p><ul><li>First item</li><li>Second item</li></ul><p>Click the buttons in the toolbar to format your text!</p>');

  const formatText = (command: string, value?: string) => {
    try {
      // Focus the editor first
      const editor = document.getElementById('wysiwyg-editor') as HTMLDivElement;
      if (editor) {
        editor.focus();
        
        // Use modern execCommand with fallbacks
        if (document.queryCommandSupported && document.queryCommandSupported(command)) {
          document.execCommand(command, false, value);
        } else {
          // Modern browser fallback for some commands
          if (command === 'bold') {
            document.execCommand('bold', false);
          } else if (command === 'italic') {
            document.execCommand('italic', false);
          } else if (command === 'underline') {
            document.execCommand('underline', false);
          }
        }
        updateContent();
      }
    } catch (error) {
      console.warn('Format command not supported:', command, error);
    }
  };

  const updateContent = () => {
    const editor = document.getElementById('wysiwyg-editor') as HTMLDivElement;
    if (editor) {
      setHtmlContent(editor.innerHTML);
      // Convert HTML back to plain text for the text area
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = editor.innerHTML;
      setContent(tempDiv.textContent || tempDiv.innerText || '');
    }
  };

  const handleEditorInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    setHtmlContent(target.innerHTML);
    // Convert HTML back to plain text for the text area
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = target.innerHTML;
    setContent(tempDiv.textContent || tempDiv.innerText || '');
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    
    // Convert plain text to HTML with basic formatting
    const htmlContent = newContent
      .split('\n\n')
      .map(paragraph => paragraph.trim())
      .filter(paragraph => paragraph.length > 0)
      .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
      .join('');
    
    setHtmlContent(htmlContent || '<p><br></p>');
    
    // Update the contentEditable div
    const editor = document.getElementById('wysiwyg-editor') as HTMLDivElement;
    if (editor) {
      editor.innerHTML = htmlContent || '<p><br></p>';
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      formatText('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      formatText('insertImage', url);
    }
  };

  const clearFormatting = () => {
    formatText('removeFormat');
  };

  const resetContent = () => {
    const defaultHtmlContent = '<p>Welcome to the WYSIWYG editor! This is a <strong>rich text editor</strong> where you can format your content using the toolbar above.</p><p>Try <em>italicizing</em> text, creating <u>underlined</u> text, or even making lists:</p><ul><li>First item</li><li>Second item</li></ul><p>Click the buttons in the toolbar to format your text!</p>';
    const defaultTextContent = 'Welcome to the WYSIWYG editor! This is a rich text editor where you can format your content using the toolbar above.\n\nTry italicizing text, creating underlined text, or even making lists. Click the buttons in the toolbar to format your text!';
    
    setHtmlContent(defaultHtmlContent);
    setContent(defaultTextContent);
    
    const editor = document.getElementById('wysiwyg-editor') as HTMLDivElement;
    if (editor) {
      editor.innerHTML = defaultHtmlContent;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ✏️ WYSIWYG Editor Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          What You See Is What You Get editor provides rich text formatting capabilities with a visual interface.
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
              Use the toolbar to format your text. The editor shows exactly how your content will appear when published.
            </p>
            
            <div className="space-y-4">
              {/* Mode Toggle */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Editor Mode:</span>
                <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setShowSource(false)}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      !showSource
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    📝 Visual
                  </button>
                  <button
                    onClick={() => setShowSource(true)}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      showSource
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    🧑‍💻 Text
                  </button>
                </div>
              </div>

              {/* Toolbar */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Text Formatting */}
                  <div className="flex items-center space-x-1 border-r border-gray-300 dark:border-gray-600 pr-2">
                    <button
                      onClick={() => formatText('bold')}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm font-bold transition-colors"
                      title="Bold"
                    >
                      B
                    </button>
                    <button
                      onClick={() => formatText('italic')}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm italic transition-colors"
                      title="Italic"
                    >
                      I
                    </button>
                    <button
                      onClick={() => formatText('underline')}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm underline transition-colors"
                      title="Underline"
                    >
                      U
                    </button>
                  </div>

                  {/* Text Alignment */}
                  <div className="flex items-center space-x-1 border-r border-gray-300 dark:border-gray-600 pr-2">
                    <button
                      onClick={() => formatText('justifyLeft')}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      title="Align Left"
                    >
                      ⬅️
                    </button>
                    <button
                      onClick={() => formatText('justifyCenter')}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      title="Align Center"
                    >
                      ↔️
                    </button>
                    <button
                      onClick={() => formatText('justifyRight')}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      title="Align Right"
                    >
                      ➡️
                    </button>
                  </div>

                  {/* Lists */}
                  <div className="flex items-center space-x-1 border-r border-gray-300 dark:border-gray-600 pr-2">
                    <button
                      onClick={() => formatText('insertUnorderedList')}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      title="Bullet List"
                    >
                      •
                    </button>
                    <button
                      onClick={() => formatText('insertOrderedList')}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      title="Numbered List"
                    >
                      1.
                    </button>
                  </div>

                  {/* Links and Media */}
                  <div className="flex items-center space-x-1 border-r border-gray-300 dark:border-gray-600 pr-2">
                    <button
                      onClick={insertLink}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      title="Insert Link"
                    >
                      🔗
                    </button>
                    <button
                      onClick={insertImage}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      title="Insert Image"
                    >
                      🖼️
                    </button>
                  </div>

                  {/* Clear Formatting */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={clearFormatting}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm transition-colors"
                      title="Clear Formatting"
                    >
                      🧹
                    </button>
                    <button
                      onClick={resetContent}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm transition-colors"
                      title="Reset Content"
                    >
                      ↺
                    </button>
                  </div>
                </div>
              </div>

              {/* Editor - Choose between textarea and contentEditable */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg min-h-[300px]">
                {showSource ? (
                  /* Text Mode - Simple textarea for easy typing */
                  <textarea
                    value={content}
                    onChange={handleTextAreaChange}
                    placeholder="Start typing here... Use the toolbar buttons to format your text!"
                    className="w-full h-full min-h-[300px] p-4 bg-transparent border-none outline-none resize-none text-gray-900 dark:text-gray-100 leading-relaxed focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-lg"
                    style={{
                      fontFamily: 'inherit',
                      lineHeight: '1.6'
                    }}
                  />
                ) : (
                  /* Visual Mode - Rich text editor */
                  <div
                    id="wysiwyg-editor"
                    ref={editorRef}
                    contentEditable
                    onInput={handleEditorInput}
                    onBlur={updateContent}
                    suppressContentEditableWarning={true}
                    className="p-4 min-h-[300px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset text-gray-900 dark:text-gray-100 leading-relaxed"
                    style={{
                      WebkitUserSelect: 'text',
                      userSelect: 'text',
                      whiteSpace: 'pre-wrap',
                      lineHeight: '1.6'
                    }}
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                )}
              </div>

              {/* Editor Info */}
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-500 dark:text-gray-400">
                  {showSource ? '📝 Text Editor' : '🎨 Visual Editor'} - {content.length} characters
                </div>
                <button
                  onClick={() => setShowSource(!showSource)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  Switch to {showSource ? 'Visual' : 'Text'} Mode
                </button>
              </div>

              {/* Preview of HTML Output */}
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">HTML Output Preview:</h4>
                <pre className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap overflow-x-auto bg-white dark:bg-gray-800 p-3 rounded border">
                  {htmlContent}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="space-y-6">
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

export default function WysiwygPattern() {
  const [content, setContent] = useState('<p>Start typing...</p>');
  const [showSource, setShowSource] = useState(false);

  const formatText = (command, value) => {
    try {
      const editor = document.getElementById('wysiwyg-editor');
      if (editor) {
        editor.focus();
        if (document.queryCommandSupported && document.queryCommandSupported(command)) {
          document.execCommand(command, false, value);
        }
        updateContent();
      }
    } catch (error) {
      console.warn('Format command not supported:', command, error);
    }
  };

  const updateContent = () => {
    const editor = document.getElementById('wysiwyg-editor');
    if (editor) {
      setContent(editor.innerHTML);
    }
  };

  const handleEditorInput = () => {
    updateContent();
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      formatText('createLink', url);
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-white border border-gray-200 rounded-lg p-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => formatText('bold')}
            className="p-2 hover:bg-gray-100 rounded font-bold"
            title="Bold"
          >
            B
          </button>
          <button
            onClick={() => formatText('italic')}
            className="p-2 hover:bg-gray-100 rounded italic"
            title="Italic"
          >
            I
          </button>
          <button
            onClick={() => formatText('underline')}
            className="p-2 hover:bg-gray-100 rounded underline"
            title="Underline"
          >
            U
          </button>
          <button
            onClick={insertLink}
            className="p-2 hover:bg-gray-100 rounded"
            title="Insert Link"
          >
            🔗
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-white border border-gray-200 rounded-lg min-h-[200px]">
        <div
          id="wysiwyg-editor"
          contentEditable
          onInput={handleEditorInput}
          className="p-4 min-h-[200px] focus:outline-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      {/* Toggle Source */}
      <button
        onClick={() => setShowSource(!showSource)}
        className="text-sm text-blue-600 hover:text-blue-800"
      >
        {showSource ? 'Hide' : 'Show'} HTML Source
      </button>

      {showSource && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <pre className="text-xs text-gray-600 whitespace-pre-wrap">
            {content}
          </pre>
        </div>
      )}
    </div>
  );
}`}
              </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`.wysiwyg-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  padding: 0.75rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-bottom: none;
  border-radius: 0.5rem 0.5rem 0 0;
}

.toolbar-group {
  display: flex;
  gap: 0.25rem;
  padding-right: 0.75rem;
  border-right: 1px solid #e5e7eb;
}

.toolbar-group:last-child {
  border-right: none;
  padding-right: 0;
}

.toolbar-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  background: transparent;
  color: #374151;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.toolbar-button:hover {
  background: #e5e7eb;
  border-color: #d1d5db;
}

.toolbar-button.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.toolbar-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.toolbar-separator {
  width: 1px;
  background: #e5e7eb;
  margin: 0 0.25rem;
}

.toolbar-select {
  padding: 0.25rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  background: white;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
}

.toolbar-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.editor-container {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0 0 0.5rem 0.5rem;
  min-height: 200px;
}

.editor-content {
  padding: 1rem;
  min-height: 200px;
  outline: none;
  line-height: 1.6;
  color: #111827;
}

.editor-content:focus {
  outline: none;
}

.editor-content p {
  margin: 0 0 1rem 0;
}

.editor-content h1,
.editor-content h2,
.editor-content h3,
.editor-content h4,
.editor-content h5,
.editor-content h6 {
  margin: 1.5rem 0 1rem 0;
  font-weight: 600;
  line-height: 1.25;
}

.editor-content h1 {
  font-size: 2rem;
}

.editor-content h2 {
  font-size: 1.5rem;
}

.editor-content h3 {
  font-size: 1.25rem;
}

.editor-content ul,
.editor-content ol {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.editor-content li {
  margin: 0.25rem 0;
}

.editor-content blockquote {
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  border-left: 4px solid #3b82f6;
  background: #f8fafc;
  font-style: italic;
}

.editor-content a {
  color: #3b82f6;
  text-decoration: underline;
}

.editor-content a:hover {
  color: #2563eb;
}

.editor-content strong {
  font-weight: 600;
}

.editor-content em {
  font-style: italic;
}

.editor-content u {
  text-decoration: underline;
}

.editor-content code {
  background: #f1f5f9;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-family: 'Courier New', monospace;
  font-size: 0.875em;
}

.source-toggle {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  font-size: 0.875rem;
  text-decoration: underline;
}

.source-toggle:hover {
  color: #2563eb;
}

.source-view {
  margin-top: 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
}

.source-code {
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: #6b7280;
  white-space: pre-wrap;
  line-height: 1.5;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .toolbar {
    background: #1f2937;
    border-color: #374151;
  }
  
  .toolbar-button {
    color: #d1d5db;
  }
  
  .toolbar-button:hover {
    background: #374151;
    border-color: #4b5563;
  }
  
  .toolbar-button.active {
    background: #3b82f6;
    color: white;
  }
  
  .toolbar-separator {
    background: #374151;
  }
  
  .toolbar-select {
    background: #1f2937;
    border-color: #374151;
    color: #d1d5db;
  }
  
  .editor-container {
    background: #1f2937;
    border-color: #374151;
  }
  
  .editor-content {
    color: #f9fafb;
  }
  
  .editor-content blockquote {
    background: #111827;
    border-left-color: #3b82f6;
  }
  
  .editor-content code {
    background: #374151;
  }
  
  .source-view {
    background: #1f2937;
    border-color: #374151;
  }
  
  .source-code {
    color: #9ca3af;
  }
}`}
                </pre>
              )}
            </div>
          </div>
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Rich Text Formatting</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Bold, italic, underline, and text alignment</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Lists and Links</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Create bullet points, numbered lists, and hyperlinks</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Feedback</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">See formatting changes immediately as you type</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">HTML Source View</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Toggle between visual editor and HTML code</p>
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
            <div className="text-2xl mb-2">📝</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Content Management</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Rich text editing for blog posts and articles</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📧</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Email Composer</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Format emails with rich text capabilities</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📋</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Document Editor</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Create formatted documents and notes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
