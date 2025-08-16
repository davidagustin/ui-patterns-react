'use client';

import { useState, useRef, useEffect } from 'react';

export default function WysiwygPattern() {
  const [content, setContent] = useState('Welcome to the WYSIWYG editor! This is a rich text editor where you can format your content using the toolbar above.\n\nTry italicizing text, creating underlined text, or even making lists. Click the buttons in the toolbar to format your text!');
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const editorRef = useRef<HTMLDivElement>(null);
  const [showSource, setShowSource] = useState(false);
  const [renderKey, setRenderKey] = useState(0);

  // Enhanced formatting functions that work in combination
  const formatText = (command: string, value?: string) => {
    // Ensure the editor has focus
    if (editorRef.current) {
      editorRef.current.focus();
    }
    
    // Handle special cases for better combination support
    switch (command) {
      case 'insertUnorderedList':
      case 'insertOrderedList':
        // Improved list handling
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          
          // Check if we're already in a list item
          let listItem = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE 
            ? (range.commonAncestorContainer as Element).closest('li')
            : range.commonAncestorContainer.parentElement?.closest('li');
          
          if (listItem) {
            // We're already in a list, check if we need to change list type
            const currentList = listItem.parentElement;
            if (currentList) {
              const isOrdered = command === 'insertOrderedList';
              const shouldBeOrdered = currentList.tagName === 'OL';
              
              if (isOrdered !== shouldBeOrdered) {
                // Change list type
                const newList = document.createElement(isOrdered ? 'ol' : 'ul');
                newList.innerHTML = currentList.innerHTML;
                currentList.parentNode?.replaceChild(newList, currentList);
              }
            }
          } else {
            // Create new list
            // First, ensure we have a proper selection
            if (range.collapsed) {
              // If no text is selected, create a list item with placeholder text
              const listItem = document.createElement('li');
              listItem.textContent = 'List item';
              const list = document.createElement(command === 'insertOrderedList' ? 'ol' : 'ul');
              list.appendChild(listItem);
              
              // Insert the list at cursor position
              range.deleteContents();
              range.insertNode(list);
              
              // Place cursor inside the list item
              const newRange = document.createRange();
              newRange.setStart(listItem.firstChild || listItem, 0);
              newRange.collapse(true);
              selection.removeAllRanges();
              selection.addRange(newRange);
            } else {
              // Use execCommand for selected text
              document.execCommand(command, false, value);
            }
          }
        } else {
          // No selection, create a new list
          const listItem = document.createElement('li');
          listItem.textContent = 'List item';
          const list = document.createElement(command === 'insertOrderedList' ? 'ol' : 'ul');
          list.appendChild(listItem);
          
          // Insert at the end of the editor
          editorRef.current?.appendChild(list);
          
          // Place cursor inside the list item
          const newRange = document.createRange();
          newRange.setStart(listItem.firstChild || listItem, 0);
          newRange.collapse(true);
          selection?.removeAllRanges();
          selection?.addRange(newRange);
        }
        break;
        
      case 'bold':
      case 'italic':
      case 'underline':
        // These work well with lists and other formatting
        document.execCommand(command, false, value);
        break;
        
      case 'createLink':
        // Handle link creation and reset visited state
        document.execCommand(command, false, value);
        // Reset visited state for the newly created link
        setTimeout(() => {
          resetVisitedState();
        }, 100);
        break;
        
      case 'justifyLeft':
      case 'justifyCenter':
      case 'justifyRight':
      case 'justifyFull':
        // Alignment works on block elements
        document.execCommand(command, false, value);
        break;
        
      default:
        document.execCommand(command, false, value);
    }
    
    // Ensure proper HTML structure after formatting
    ensureValidStructure();
    
    updateContent();
    // Force re-render of the rendered preview
    setRenderKey(prev => prev + 1);
  };

  const updateContent = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerText || '');
    }
  };

  const handleEditorInput = () => {
    // Ensure proper HTML structure on input
    ensureValidStructure();
    updateContent();
  };

  const getCleanHtmlContent = () => {
    if (editorRef.current) {
      // Get the HTML content
      let html = editorRef.current.innerHTML;
      
      // Create a temporary div to parse and clean the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      
      // Function to clean up styles while preserving text alignment
      const cleanElement = (element: Element) => {
        if (element.hasAttribute('style')) {
          const style = element.getAttribute('style') || '';
          // Keep only text-align and remove everything else
          const textAlignMatch = style.match(/text-align:\s*[^;]+/);
          if (textAlignMatch) {
            element.setAttribute('style', textAlignMatch[0]);
          } else {
            element.removeAttribute('style');
          }
        }
        
        // Remove class attributes
        element.removeAttribute('class');
        
        // Recursively clean child elements
        Array.from(element.children).forEach(cleanElement);
      };
      
      // Clean all elements
      cleanElement(tempDiv);
      
      // Fix invalid HTML structure - remove lists from inside paragraphs
      const paragraphsWithLists = tempDiv.querySelectorAll('p');
      paragraphsWithLists.forEach(p => {
        const lists = p.querySelectorAll('ul, ol');
        lists.forEach(list => {
          // Move the list outside of the paragraph
          p.parentNode?.insertBefore(list, p.nextSibling);
          // Remove the list from the paragraph
          list.remove();
        });
        
        // If paragraph is now empty, remove it
        if (p.innerHTML.trim() === '') {
          p.remove();
        }
      });
      
      // Convert remaining divs to paragraphs for cleaner output
      const divs = tempDiv.querySelectorAll('div');
      divs.forEach(div => {
        // Skip if div contains lists
        if (div.querySelector('ul, ol')) {
          return;
        }
        
        const p = document.createElement('p');
        p.innerHTML = div.innerHTML;
        if (div.hasAttribute('style')) {
          p.setAttribute('style', div.getAttribute('style') || '');
        }
        div.parentNode?.replaceChild(p, div);
      });
      
      // Process links to ensure they have proper attributes
      const links = tempDiv.querySelectorAll('a');
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
          // Ensure external links have target and rel attributes
          if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
          }
        }
      });
      
      return tempDiv.innerHTML;
    }
    return content.replace(/\n/g, '<br>');
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      // Format the URL to ensure it has a protocol
      let formattedUrl = url.trim();
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://') && !formattedUrl.startsWith('mailto:') && !formattedUrl.startsWith('tel:')) {
        formattedUrl = 'https://' + formattedUrl;
      }
      
      // Ensure we have a selection
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        formatText('createLink', formattedUrl);
      } else {
        // If no text is selected, insert the URL as text
        formatText('insertHTML', `<a href="${formattedUrl}" target="_blank" rel="noopener noreferrer">${url}</a>`);
      }
      
      // Reset visited state for newly created links
      setTimeout(() => {
        resetVisitedState();
      }, 100);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      // Insert image with proper alt text
      const altText = prompt('Enter alt text for the image:') || 'Image';
      formatText('insertHTML', `<img src="${url}" alt="${altText}" style="max-width: 100%; height: auto;">`);
    }
  };

  const clearFormatting = () => {
    formatText('removeFormat');
  };

  const resetContent = () => {
    const defaultContent = 'Welcome to the WYSIWYG editor! This is a rich text editor where you can format your content using the toolbar above.\n\nTry italicizing text, creating underlined text, or even making lists. Click the buttons in the toolbar to format your text!';
    setContent(defaultContent);
    
    if (editorRef.current) {
      editorRef.current.innerHTML = defaultContent.replace(/\n/g, '<br>');
    }
    
    // Reset visited state for any existing links
    setTimeout(() => {
      resetVisitedState();
    }, 100);
  };

  // Helper function to reset visited state for links
  const resetVisitedState = () => {
    if (editorRef.current) {
      // Get all links in the editor
      const links = editorRef.current.querySelectorAll('a');
      links.forEach(link => {
        // Add a unique timestamp to force browser to treat as new link
        const href = link.getAttribute('href');
        if (href) {
          const separator = href.includes('?') ? '&' : '?';
          const timestamp = Date.now();
          const newHref = `${href}${separator}_t=${timestamp}`;
          link.setAttribute('href', newHref);
          
          // Remove the timestamp after a brief delay to keep the URL clean
          setTimeout(() => {
            link.setAttribute('href', href);
          }, 50);
        }
      });
    }
  };

  // Helper function to ensure proper HTML structure
  const ensureValidStructure = () => {
    if (editorRef.current) {
      // Fix common issues with list structure
      const lists = editorRef.current.querySelectorAll('ul, ol');
      lists.forEach(list => {
        // Ensure list is not inside a paragraph
        const parent = list.parentElement;
        if (parent && parent.tagName === 'P') {
          parent.parentNode?.insertBefore(list, parent.nextSibling);
          if (parent.innerHTML.trim() === '') {
            parent.remove();
          }
        }
        
        // Ensure list items are properly structured
        const listItems = list.querySelectorAll('li');
        listItems.forEach(item => {
          // Remove any nested lists that shouldn't be there
          const nestedLists = item.querySelectorAll('ul, ol');
          nestedLists.forEach(nestedList => {
            // Only keep nested lists if they're properly structured
            const nestedItems = nestedList.querySelectorAll('li');
            if (nestedItems.length === 0) {
              nestedList.remove();
            }
          });
        });
      });
      
      // Fix orphaned list items (list items not in a list)
      const orphanedItems = editorRef.current.querySelectorAll('li:not(ul li):not(ol li)');
      orphanedItems.forEach(item => {
        // Wrap orphaned list items in a ul
        const ul = document.createElement('ul');
        item.parentNode?.insertBefore(ul, item);
        ul.appendChild(item);
      });
    }
  };

  // Handle link clicks in rendered preview
  const handlePreviewClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A') {
      e.preventDefault();
      const href = target.getAttribute('href');
      if (href) {
        // Open external links in new tab
        if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) {
          window.open(href, '_blank', 'noopener,noreferrer');
        }
      }
    }
  };

  // Set initial content
  useEffect(() => {
    if (editorRef.current && !showSource) {
      editorRef.current.innerHTML = content.replace(/\n/g, '<br>');
    }
  }, [showSource]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ✏️ WYSIWYG Editor Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          What You See Is What You Get editor with rich text formatting capabilities, toolbar controls, and real-time preview.
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

            {/* Editor Mode Toggle */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Editor Mode:
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowSource(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    !showSource
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  ✏️ Visual
                </button>
                <button
                  onClick={() => setShowSource(true)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    showSource
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  👤 Text
                </button>
              </div>
            </div>

            {/* Toolbar */}
            {!showSource && (
              <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Text Formatting */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => formatText('bold')}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm font-bold transition-colors"
                      title="Bold"
                    >
                      B
                    </button>
                    <button
                      onClick={() => formatText('italic')}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm italic transition-colors"
                      title="Italic"
                    >
                      I
                    </button>
                    <button
                      onClick={() => formatText('underline')}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm underline transition-colors"
                      title="Underline"
                    >
                      U
                    </button>
                  </div>

                  {/* History */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => formatText('undo')}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm transition-colors"
                      title="Undo"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => formatText('redo')}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm transition-colors"
                      title="Redo"
                    >
                      →
                    </button>
                  </div>

                  {/* Alignment */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => formatText('justifyLeft')}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm transition-colors"
                      title="Align Left"
                    >
                      ⬅️
                    </button>
                    <button
                      onClick={() => formatText('justifyCenter')}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm transition-colors"
                      title="Align Center"
                    >
                      ↔️
                    </button>
                    <button
                      onClick={() => formatText('justifyRight')}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm transition-colors"
                      title="Align Right"
                    >
                      ➡️
                    </button>
                  </div>

                  {/* Lists */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => formatText('insertUnorderedList')}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm transition-colors"
                      title="Bullet List"
                    >
                      •
                    </button>
                    <button
                      onClick={() => formatText('insertOrderedList')}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm transition-colors"
                      title="Numbered List"
                    >
                      1.
                    </button>
                  </div>

                  {/* Links and Media */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={insertLink}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm transition-colors"
                      title="Insert Link"
                    >
                      🔗
                    </button>
                    <button
                      onClick={insertImage}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm transition-colors"
                      title="Insert Image"
                    >
                      🖼️
                    </button>
                  </div>

                  {/* Clear Formatting */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={clearFormatting}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm transition-colors"
                      title="Clear Formatting"
                    >
                      🧹
                    </button>
                    <button
                      onClick={resetContent}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm transition-colors"
                      title="Reset Content"
                    >
                      ↺
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Editor */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg min-h-[300px]">
              {showSource ? (
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
                <div
                  ref={editorRef}
                  contentEditable
                  onInput={handleEditorInput}
                  suppressContentEditableWarning={true}
                  className="w-full h-full min-h-[300px] p-4 bg-transparent border-none outline-none resize-none text-gray-900 dark:text-gray-100 leading-relaxed focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-lg"
                  style={{
                    fontFamily: 'inherit',
                    lineHeight: '1.6'
                  }}
                />
              )}
            </div>

            {/* Editor Info */}
            <div className="flex items-center justify-between text-sm">
              <div className="text-gray-500 dark:text-gray-400">
                {showSource ? '📝 Text Editor' : '🎨 Visual Editor'} - {content.length} characters
              </div>
            </div>

                         {/* Preview of HTML Output */}
             <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
               <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">HTML Output Preview:</h4>
               <pre className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap overflow-x-auto bg-white dark:bg-gray-800 p-3 rounded border">
                 {getCleanHtmlContent()}
               </pre>
             </div>

                            {/* Rendered HTML Preview */}
               <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                 <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rendered Preview:</h4>
                 <div 
                   key={renderKey}
                   className="bg-white dark:bg-gray-800 p-4 rounded border min-h-[100px] rendered-preview"
                   style={{
                     fontFamily: 'inherit',
                     lineHeight: '1.6'
                   }}
                   dangerouslySetInnerHTML={{ __html: getCleanHtmlContent() }}
                   onClick={handlePreviewClick}
                 />
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

import { useState, useRef, useEffect } from 'react';

export default function WysiwygEditor() {
  const [content, setContent] = useState('');
  const [showSource, setShowSource] = useState(false);
  const editorRef = useRef(null);

  const formatText = (command, value) => {
    document.execCommand(command, false, value);
    updateContent();
  };

  const updateContent = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerText || '');
    }
  };

  const handleEditorInput = () => {
    updateContent();
  };

  const handleTextAreaChange = (e) => {
    setContent(e.target.value);
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      // Format the URL to ensure it has a protocol
      let formattedUrl = url.trim();
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://') && !formattedUrl.startsWith('mailto:') && !formattedUrl.startsWith('tel:')) {
        formattedUrl = 'https://' + formattedUrl;
      }
      
      // Ensure we have a selection
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        formatText('createLink', formattedUrl);
      } else {
        // If no text is selected, insert the URL as text
        formatText('insertHTML', \`<a href="\${formattedUrl}" target="_blank" rel="noopener noreferrer">\${url}</a>\`);
      }
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
    const defaultContent = 'Welcome to the WYSIWYG editor!';
    setContent(defaultContent);
    
    if (editorRef.current) {
      editorRef.current.innerHTML = defaultContent;
    }
  };

  // Handle link clicks in rendered preview
  const handlePreviewClick = (e) => {
    const target = e.target;
    if (target.tagName === 'A') {
      e.preventDefault();
      const href = target.getAttribute('href');
      if (href) {
        // Open external links in new tab
        if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) {
          window.open(href, '_blank', 'noopener,noreferrer');
        }
      }
    }
  };

  return (
    <div className="wysiwyg-container">
      {/* Editor Mode Toggle */}
      <div className="mode-toggle">
        <button
          onClick={() => setShowSource(false)}
          className={\`mode-button \${!showSource ? 'active' : ''}\`}
        >
          Visual
        </button>
        <button
          onClick={() => setShowSource(true)}
          className={\`mode-button \${showSource ? 'active' : ''}\`}
        >
          Text
        </button>
      </div>

      {/* Toolbar */}
      {!showSource && (
        <div className="toolbar">
          <div className="toolbar-group">
            <button onClick={() => formatText('bold')} className="toolbar-button">
              B
            </button>
            <button onClick={() => formatText('italic')} className="toolbar-button">
              I
            </button>
            <button onClick={() => formatText('underline')} className="toolbar-button">
              U
            </button>
          </div>
          
          <div className="toolbar-group">
            <button onClick={() => formatText('justifyLeft')} className="toolbar-button">
              Left
            </button>
            <button onClick={() => formatText('justifyCenter')} className="toolbar-button">
              Center
            </button>
            <button onClick={() => formatText('justifyRight')} className="toolbar-button">
              Right
            </button>
          </div>
          
          <div className="toolbar-group">
            <button onClick={() => formatText('insertUnorderedList')} className="toolbar-button">
              •
            </button>
            <button onClick={() => formatText('insertOrderedList')} className="toolbar-button">
              1.
            </button>
          </div>
          
          <div className="toolbar-group">
            <button onClick={insertLink} className="toolbar-button">
              Link
            </button>
            <button onClick={insertImage} className="toolbar-button">
              Image
            </button>
          </div>
          
          <div className="toolbar-group">
            <button onClick={clearFormatting} className="toolbar-button">
              Clear
            </button>
            <button onClick={resetContent} className="toolbar-button">
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Editor */}
      <div className="editor-container">
        {showSource ? (
          <textarea
            value={content}
            onChange={handleTextAreaChange}
            placeholder="Start typing here..."
            className="text-editor"
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleEditorInput}
            className="visual-editor"
          />
        )}
      </div>

      {/* Editor Info */}
      <div className="editor-info">
        <span>{showSource ? 'Text Editor' : 'Visual Editor'} - {content.length} characters</span>
      </div>

      {/* HTML Preview */}
      <div className="html-preview">
        <h4>HTML Output:</h4>
        <pre>{editorRef.current?.innerHTML || content}</pre>
      </div>

      {/* Rendered Preview */}
      <div className="rendered-preview">
        <h4>Rendered Preview:</h4>
        <div 
          className="preview-content"
          dangerouslySetInnerHTML={{ __html: editorRef.current?.innerHTML || content }}
          onClick={handlePreviewClick}
        />
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* WYSIWYG Container */
.wysiwyg-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

/* Mode Toggle */
.mode-toggle {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.mode-button {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mode-button:hover {
  background: #f9fafb;
}

.mode-button.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

/* Toolbar */
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
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
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.toolbar-button:hover {
  background: #e5e7eb;
  border-color: #d1d5db;
}

.toolbar-button:active {
  background: #d1d5db;
}

/* Editor Container */
.editor-container {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  min-height: 200px;
  margin-bottom: 1rem;
}

/* Text Editor */
.text-editor {
  width: 100%;
  height: 100%;
  min-height: 200px;
  padding: 1rem;
  border: none;
  outline: none;
  resize: none;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.6;
  color: #111827;
  background: transparent;
}

.text-editor:focus {
  outline: none;
}

/* Visual Editor */
.visual-editor {
  width: 100%;
  height: 100%;
  min-height: 200px;
  padding: 1rem;
  outline: none;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.6;
  color: #111827;
  background: transparent;
}

.visual-editor:focus {
  outline: none;
}

.visual-editor p {
  margin: 0 0 1rem 0;
}

.visual-editor ul,
.visual-editor ol {
  margin: 1rem 0;
  padding-left: 2rem;
  border-left: 3px solid #e5e7eb;
  background: rgba(59, 130, 246, 0.05);
  border-radius: 0 0.5rem 0.5rem 0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.visual-editor ul {
  list-style-type: disc;
  list-style-position: outside;
}

.visual-editor ol {
  list-style-type: decimal;
  list-style-position: outside;
}

.visual-editor li {
  margin: 0.5rem 0;
  line-height: 1.6;
  padding-left: 0.5rem;
  position: relative;
}

.visual-editor li::marker {
  font-weight: 600;
  color: #3b82f6;
}

.visual-editor ul ul,
.visual-editor ol ol,
.visual-editor ul ol,
.visual-editor ol ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  border-left: 2px solid #d1d5db;
  background: rgba(59, 130, 246, 0.03);
  border-radius: 0 0.25rem 0.25rem 0;
}

.visual-editor ul ul {
  list-style-type: circle;
}

.visual-editor ul ul ul {
  list-style-type: square;
}

.visual-editor ol ol {
  list-style-type: lower-alpha;
}

.visual-editor ol ol ol {
  list-style-type: lower-roman;
}

.visual-editor a {
  color: #3b82f6;
  text-decoration: underline;
}

.visual-editor a:hover {
  color: #2563eb;
}

.visual-editor strong {
  font-weight: 600;
}

.visual-editor em {
  font-style: italic;
}

.visual-editor u {
  text-decoration: underline;
}

/* Editor Info */
.editor-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

.editor-info button {
  color: #3b82f6;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
}

.editor-info button:hover {
  color: #2563eb;
}

/* HTML Preview */
.html-preview {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
}

.html-preview h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.html-preview pre {
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: #6b7280;
  white-space: pre-wrap;
  line-height: 1.5;
  background: white;
  padding: 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid #e5e7eb;
  overflow-x: auto;
}

/* Rendered Preview Styles */
.rendered-preview {
  font-family: inherit;
  line-height: 1.6;
}

.rendered-preview p {
  margin: 0 0 1rem 0;
}

.rendered-preview ul,
.rendered-preview ol {
  margin: 1rem 0;
  padding-left: 2rem;
  border-left: 3px solid #e5e7eb;
  background: rgba(59, 130, 246, 0.05);
  border-radius: 0 0.5rem 0.5rem 0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.rendered-preview ul {
  list-style-type: disc;
  list-style-position: outside;
}

.rendered-preview ol {
  list-style-type: decimal;
  list-style-position: outside;
}

.rendered-preview li {
  margin: 0.5rem 0;
  line-height: 1.6;
  padding-left: 0.5rem;
  position: relative;
}

.rendered-preview li::marker {
  font-weight: 600;
  color: #3b82f6;
}

.rendered-preview ul ul,
.rendered-preview ol ol,
.rendered-preview ul ol,
.rendered-preview ol ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  border-left: 2px solid #d1d5db;
  background: rgba(59, 130, 246, 0.03);
  border-radius: 0 0.25rem 0.25rem 0;
}

.rendered-preview ul ul {
  list-style-type: circle;
}

.rendered-preview ul ul ul {
  list-style-type: square;
}

.rendered-preview ol ol {
  list-style-type: lower-alpha;
}

.rendered-preview ol ol ol {
  list-style-type: lower-roman;
}

.rendered-preview a {
  color: #3b82f6;
  text-decoration: underline;
  transition: color 0.2s ease;
}

.rendered-preview a:hover {
  color: #2563eb;
  text-decoration: underline;
}

.rendered-preview strong {
  font-weight: 600;
}

.rendered-preview em {
  font-style: italic;
}

.rendered-preview u {
  text-decoration: underline;
}

.rendered-preview h1,
.rendered-preview h2,
.rendered-preview h3,
.rendered-preview h4,
.rendered-preview h5,
.rendered-preview h6 {
  margin: 1.5rem 0 1rem 0;
  font-weight: 600;
  line-height: 1.25;
}

.rendered-preview h1 {
  font-size: 2rem;
}

.rendered-preview h2 {
  font-size: 1.5rem;
}

.rendered-preview h3 {
  font-size: 1.25rem;
}

.rendered-preview blockquote {
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  border-left: 4px solid #3b82f6;
  background: #f8fafc;
  font-style: italic;
}

.rendered-preview code {
  background: #f1f5f9;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-family: 'Courier New', monospace;
  font-size: 0.875em;
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .rendered-preview {
    color: #f9fafb;
  }
  
  .rendered-preview a {
    color: #60a5fa;
  }
  
  .rendered-preview a:hover {
    color: #93c5fd;
  }
  
  .rendered-preview blockquote {
    background: #111827;
    border-left-color: #3b82f6;
  }
  
  .rendered-preview code {
    background: #374151;
  }
  
  .rendered-preview ul,
  .rendered-preview ol {
    border-left-color: #4b5563;
    background: rgba(96, 165, 250, 0.1);
  }
  
  .rendered-preview li::marker {
    color: #60a5fa;
  }
  
  .rendered-preview ul ul,
  .rendered-preview ol ol,
  .rendered-preview ul ol,
  .rendered-preview ol ul {
    border-left-color: #6b7280;
    background: rgba(96, 165, 250, 0.05);
  }
  
  .visual-editor ul,
  .visual-editor ol {
    border-left-color: #4b5563;
    background: rgba(96, 165, 250, 0.1);
  }
  
  .visual-editor li::marker {
    color: #60a5fa;
  }
  
  .visual-editor ul ul,
  .visual-editor ol ol,
  .visual-editor ul ol,
  .visual-editor ol ul {
    border-left-color: #6b7280;
    background: rgba(96, 165, 250, 0.05);
  }
  
  .mode-button {
    background: #1f2937;
    border-color: #374151;
    color: #d1d5db;
  }
  
  .mode-button:hover {
    background: #374151;
  }
  
  .mode-button.active {
    background: #3b82f6;
    color: white;
  }
  
  .toolbar {
    background: #1f2937;
    border-color: #374151;
  }
  
  .toolbar-button {
    color: #d1d5db;
  }
  
  .toolbar-button:hover {
    background: #374151;
  }
  
  .editor-container {
    background: #1f2937;
    border-color: #374151;
  }
  
  .text-editor,
  .visual-editor {
    color: #f9fafb;
  }
  
  .html-preview {
    background: #1f2937;
    border-color: #374151;
  }
  
  .html-preview h4 {
    color: #d1d5db;
  }
  
  .html-preview pre {
    background: #111827;
    border-color: #374151;
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
