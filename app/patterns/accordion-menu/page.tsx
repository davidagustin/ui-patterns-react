'use client';

import { useState } from 'react';

export default function AccordionMenuPattern() {
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set(['section-1']));

  const toggleAccordion = (id: string) => {
    const newOpenAccordions = new Set(openAccordions);
    if (newOpenAccordions.has(id)) {
      newOpenAccordions.delete(id);
    } else {
      newOpenAccordions.add(id);
    }
    setOpenAccordions(newOpenAccordions);
  };

  const accordionSections = [
    {
      id: 'section-1',
      title: 'Getting Started',
      icon: '🚀',
      items: [
        { id: 'installation', title: 'Installation Guide', description: 'How to install and set up the project' },
        { id: 'quickstart', title: 'Quick Start', description: 'Get up and running in 5 minutes' },
        { id: 'configuration', title: 'Configuration', description: 'Configure your settings' },
      ]
    },
    {
      id: 'section-2',
      title: 'Components',
      icon: '🧩',
      items: [
        { id: 'buttons', title: 'Buttons', description: 'Various button styles and states' },
        { id: 'forms', title: 'Forms', description: 'Input fields and form controls' },
        { id: 'navigation', title: 'Navigation', description: 'Menus, tabs, and navigation components' },
        { id: 'feedback', title: 'Feedback', description: 'Alerts, notifications, and modals' },
      ]
    },
    {
      id: 'section-3',
      title: 'Advanced Topics',
      icon: '📚',
      items: [
        { id: 'theming', title: 'Theming', description: 'Customize colors and styles' },
        { id: 'accessibility', title: 'Accessibility', description: 'Making your app accessible' },
        { id: 'performance', title: 'Performance', description: 'Optimization techniques' },
      ]
    },
    {
      id: 'section-4',
      title: 'API Reference',
      icon: '📊',
      items: [
        { id: 'hooks', title: 'React Hooks', description: 'Custom hooks documentation' },
        { id: 'utilities', title: 'Utility Functions', description: 'Helper functions and utilities' },
        { id: 'types', title: 'TypeScript Types', description: 'Type definitions and interfaces' },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🎢 Accordion Menu Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Organize content in expandable sections that can be opened and closed independently, perfect for FAQs, documentation, and navigation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Click on section headers to expand or collapse content. Multiple sections can be open simultaneously.
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {accordionSections.map((section, sectionIndex) => (
                <div key={section.id} className={`border-b border-gray-200 dark:border-gray-700 ${sectionIndex === accordionSections.length - 1 ? 'border-b-0' : ''}`}>
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleAccordion(section.id)}
                    className={`flex items-center justify-between w-full px-6 py-4 text-left transition-all duration-200 ${
                      openAccordions.has(section.id)
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{section.icon}</span>
                      <div>
                        <h3 className="font-semibold text-base">{section.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {section.items.length} items
                        </p>
                      </div>
                    </div>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
                      openAccordions.has(section.id)
                        ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rotate-180'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openAccordions.has(section.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900">
                      <div className="space-y-3">
                        {section.items.map((item, itemIndex) => (
                          <div
                            key={item.id}
                            className="flex items-start space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer"
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                                {item.title}
                              </h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                {item.description}
                              </p>
                            </div>
                            <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Control Buttons */}
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => setOpenAccordions(new Set(accordionSections.map(s => s.id)))}
                className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              >
                Expand All
              </button>
              <button
                onClick={() => setOpenAccordions(new Set())}
                className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              💻 Code Example
            </h2>
            
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

            <div className="code-block">
              {activeTab === 'jsx' ? (
                <pre className="text-sm leading-relaxed">
{`import { useState } from 'react';

export default function AccordionMenu() {
  const [openSections, setOpenSections] = useState(new Set(['section-1']));

  const accordionData = [
    {
      id: 'section-1',
      title: 'Getting Started',
      icon: '🚀',
      items: [
        { id: 'install', title: 'Installation Guide', description: 'How to install' },
        { id: 'quickstart', title: 'Quick Start', description: 'Get started quickly' },
      ]
    },
    {
      id: 'section-2',
      title: 'Components',
      icon: '🧩',
      items: [
        { id: 'buttons', title: 'Buttons', description: 'Button components' },
        { id: 'forms', title: 'Forms', description: 'Form controls' },
      ]
    }
  ];

  const toggleSection = (sectionId) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(sectionId)) {
      newOpenSections.delete(sectionId);
    } else {
      newOpenSections.add(sectionId);
    }
    setOpenSections(newOpenSections);
  };

  return (
    <div className="accordion-menu">
      {accordionData.map((section) => (
        <div key={section.id} className="accordion-section">
          {/* Header */}
          <button
            onClick={() => toggleSection(section.id)}
            className={\`accordion-header \${openSections.has(section.id) ? 'active' : ''}\`}
          >
            <div className="header-content">
              <span className="section-icon">{section.icon}</span>
              <div className="section-info">
                <h3 className="section-title">{section.title}</h3>
                <p className="section-count">{section.items.length} items</p>
              </div>
            </div>
            <div className={\`chevron \${openSections.has(section.id) ? 'open' : ''}\`}>
              ▼
            </div>
          </button>

          {/* Content */}
          <div className={\`accordion-content \${openSections.has(section.id) ? 'open' : ''}\`}>
            <div className="content-inner">
              {section.items.map((item) => (
                <div key={item.id} className="accordion-item">
                  <div className="item-indicator"></div>
                  <div className="item-content">
                    <h4 className="item-title">{item.title}</h4>
                    <p className="item-description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <div className="accordion-controls">
        <button
          onClick={() => setOpenSections(new Set(accordionData.map(s => s.id)))}
          className="control-btn expand"
        >
          Expand All
        </button>
        <button
          onClick={() => setOpenSections(new Set())}
          className="control-btn collapse"
        >
          Collapse All
        </button>
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Accordion Menu */
.accordion-menu {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

/* Accordion Section */
.accordion-section {
  border-bottom: 1px solid #e5e7eb;
}

.accordion-section:last-child {
  border-bottom: none;
}

/* Accordion Header */
.accordion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 1.5rem;
  background: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.accordion-header:hover {
  background-color: #f9fafb;
}

.accordion-header.active {
  background-color: #eff6ff;
  color: #1d4ed8;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-icon {
  font-size: 1.25rem;
}

.section-info {
  text-align: left;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.section-count {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

/* Chevron */
.chevron {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: #f3f4f6;
  border-radius: 50%;
  transition: all 0.2s ease;
  transform: rotate(-90deg);
}

.chevron.open {
  transform: rotate(0deg);
  background-color: #dbeafe;
  color: #3b82f6;
}

/* Accordion Content */
.accordion-content {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.accordion-content.open {
  max-height: 30rem;
  opacity: 1;
}

.content-inner {
  padding: 1rem 1.5rem;
  background-color: #f9fafb;
}

/* Accordion Items */
.accordion-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.accordion-item:last-child {
  margin-bottom: 0;
}

.accordion-item:hover {
  border-color: #3b82f6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.item-indicator {
  width: 0.5rem;
  height: 0.5rem;
  background-color: #3b82f6;
  border-radius: 50%;
  margin-top: 0.5rem;
  flex-shrink: 0;
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
  margin: 0 0 0.25rem 0;
}

.item-description {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
}

/* Controls */
.accordion-controls {
  display: flex;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
}

.control-btn {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.control-btn.expand {
  background-color: #dbeafe;
  color: #1d4ed8;
}

.control-btn.expand:hover {
  background-color: #bfdbfe;
}

.control-btn.collapse {
  background-color: #f3f4f6;
  color: #374151;
}

.control-btn.collapse:hover {
  background-color: #e5e7eb;
}

/* Responsive Design */
@media (max-width: 640px) {
  .accordion-header {
    padding: 0.75rem 1rem;
  }
  
  .content-inner {
    padding: 0.75rem 1rem;
  }
  
  .accordion-item {
    padding: 0.5rem;
  }
  
  .section-title {
    font-size: 0.875rem;
  }
  
  .section-count {
    font-size: 0.75rem;
  }
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .accordion-menu {
    background: #1f2937;
    border-color: #374151;
  }
  
  .accordion-section {
    border-bottom-color: #374151;
  }
  
  .accordion-header {
    background: #1f2937;
    color: #f9fafb;
  }
  
  .accordion-header:hover {
    background-color: #374151;
  }
  
  .accordion-header.active {
    background-color: #1e3a8a;
    color: #93c5fd;
  }
  
  .section-count {
    color: #9ca3af;
  }
  
  .chevron {
    background-color: #374151;
    color: #9ca3af;
  }
  
  .chevron.open {
    background-color: #1e40af;
    color: #93c5fd;
  }
  
  .content-inner {
    background-color: #111827;
  }
  
  .accordion-item {
    background: #1f2937;
    border-color: #374151;
  }
  
  .accordion-item:hover {
    border-color: #3b82f6;
  }
  
  .item-title {
    color: #f9fafb;
  }
  
  .item-description {
    color: #9ca3af;
  }
  
  .accordion-controls {
    background-color: #111827;
    border-top-color: #374151;
  }
  
  .control-btn.expand {
    background-color: #1e3a8a;
    color: #93c5fd;
  }
  
  .control-btn.collapse {
    background-color: #374151;
    color: #f9fafb;
  }
}

/* Focus States */
.accordion-header:focus,
.accordion-item:focus,
.control-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

/* Animation Enhancements */
.accordion-item {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Loading State */
.accordion-section.loading .accordion-header {
  pointer-events: none;
  opacity: 0.6;
}

.accordion-section.loading .chevron::after {
  content: '';
  position: absolute;
  width: 1rem;
  height: 1rem;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Independent Sections</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Each section can be expanded/collapsed independently</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Smooth Animations</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Smooth expand/collapse transitions</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Control Options</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Expand all/collapse all functionality</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Rich Content</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Support for icons, descriptions, and nested items</p>
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
            <div className="text-2xl mb-2">❓</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">FAQ Sections</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Organize frequently asked questions</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📚</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Documentation</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Structure documentation content</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📝</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Form Sections</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Group related form fields</p>
          </div>
        </div>
      </div>
    </div>
  );
}