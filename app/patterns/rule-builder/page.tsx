'use client';

import { useState } from 'react';

export default function RuleBuilderPattern() {
  const [rules, setRules] = useState([
    { id: 1, field: 'age', operator: 'greater_than', value: '18', enabled: true },
    { id: 2, field: 'location', operator: 'equals', value: 'US', enabled: true },
    { id: 3, field: 'subscription', operator: 'contains', value: 'premium', enabled: false }
  ]);

  const [newRule, setNewRule] = useState({
    field: 'name',
    operator: 'contains',
    value: '',
    enabled: true
  });

  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');

  const fields = [
    { value: 'name', label: 'Name' },
    { value: 'age', label: 'Age' },
    { value: 'location', label: 'Location' },
    { value: 'subscription', label: 'Subscription' },
    { value: 'email', label: 'Email' }
  ];

  const operators = [
    { value: 'equals', label: 'Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'greater_than', label: 'Greater than' },
    { value: 'less_than', label: 'Less than' },
    { value: 'starts_with', label: 'Starts with' },
    { value: 'ends_with', label: 'Ends with' }
  ];

  const addRule = () => {
    if (newRule.value.trim()) {
      setRules([...rules, { ...newRule, id: Date.now() }]);
      setNewRule({ field: 'name', operator: 'contains', value: '', enabled: true });
    }
  };

  const removeRule = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const toggleRule = (id: number) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const updateRule = (id: number, field: string, value: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, [field]: value } : rule
    ));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🔧 Rule Builder Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Create complex rules and conditions with an intuitive interface that allows users to build sophisticated filtering logic.
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
              Build custom rules to filter users. Toggle rules on/off and add new conditions to see how the rule builder works.
            </p>
            
            <div className="space-y-4">
              {/* Existing Rules */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Current Rules</h3>
                {rules.map((rule) => (
                  <div key={rule.id} className={`rule-item ${rule.enabled ? 'rule-enabled' : 'rule-disabled'}`}>
                    <input
                      type="checkbox"
                      checked={rule.enabled}
                      onChange={() => toggleRule(rule.id)}
                      className="rule-toggle"
                    />
                    <select
                      value={rule.field}
                      onChange={(e) => updateRule(rule.id, 'field', e.target.value)}
                      className="rule-field"
                    >
                      {fields.map(field => (
                        <option key={field.value} value={field.value}>{field.label}</option>
                      ))}
                    </select>
                    <select
                      value={rule.operator}
                      onChange={(e) => updateRule(rule.id, 'operator', e.target.value)}
                      className="rule-operator"
                    >
                      {operators.map(op => (
                        <option key={op.value} value={op.value}>{op.label}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={rule.value}
                      onChange={(e) => updateRule(rule.id, 'value', e.target.value)}
                      placeholder="Value"
                      className="rule-value"
                    />
                    <button
                      onClick={() => removeRule(rule.id)}
                      className="rule-remove"
                      aria-label="Remove rule"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Rule */}
              <div className="rule-builder">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Add New Rule</h3>
                <div className="rule-form">
                  <select
                    value={newRule.field}
                    onChange={(e) => setNewRule({...newRule, field: e.target.value})}
                    className="rule-field"
                  >
                    {fields.map(field => (
                      <option key={field.value} value={field.value}>{field.label}</option>
                    ))}
                  </select>
                  <select
                    value={newRule.operator}
                    onChange={(e) => setNewRule({...newRule, operator: e.target.value})}
                    className="rule-operator"
                  >
                    {operators.map(op => (
                      <option key={op.value} value={op.value}>{op.label}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={newRule.value}
                    onChange={(e) => setNewRule({...newRule, value: e.target.value})}
                    placeholder="Enter value"
                    className="rule-value"
                  />
                  <button
                    onClick={addRule}
                    disabled={!newRule.value.trim()}
                    className="rule-add"
                  >
                    Add Rule
                  </button>
                </div>
              </div>

              {/* Rule Summary */}
              <div className="rule-summary">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Active Rules Summary</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {rules.filter(r => r.enabled).length} of {rules.length} rules are active
                </p>
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
{`import { useState } from 'react';

export default function RuleBuilderPattern() {
  const [rules, setRules] = useState([
    { id: 1, field: 'age', operator: 'greater_than', value: '18', enabled: true },
    { id: 2, field: 'location', operator: 'equals', value: 'US', enabled: true }
  ]);

  const [newRule, setNewRule] = useState({
    field: 'name',
    operator: 'contains',
    value: '',
    enabled: true
  });

  const fields = [
    { value: 'name', label: 'Name' },
    { value: 'age', label: 'Age' },
    { value: 'location', label: 'Location' }
  ];

  const operators = [
    { value: 'equals', label: 'Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'greater_than', label: 'Greater than' },
    { value: 'less_than', label: 'Less than' }
  ];

  const addRule = () => {
    if (newRule.value.trim()) {
      setRules([...rules, { ...newRule, id: Date.now() }]);
      setNewRule({ field: 'name', operator: 'contains', value: '', enabled: true });
    }
  };

  const removeRule = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const toggleRule = (id: number) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const updateRule = (id: number, field: string, value: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, [field]: value } : rule
    ));
  };

  return (
    <div className="rule-builder-container">
      {/* Existing Rules */}
      <div className="rules-list">
        <h3 className="rules-title">Current Rules</h3>
        {rules.map((rule) => (
          <div key={rule.id} className={\`rule-item \${rule.enabled ? 'rule-enabled' : 'rule-disabled'}\`}>
            <input
              type="checkbox"
              checked={rule.enabled}
              onChange={() => toggleRule(rule.id)}
              className="rule-toggle"
            />
            <select
              value={rule.field}
              onChange={(e) => updateRule(rule.id, 'field', e.target.value)}
              className="rule-field"
            >
              {fields.map(field => (
                <option key={field.value} value={field.value}>{field.label}</option>
              ))}
            </select>
            <select
              value={rule.operator}
              onChange={(e) => updateRule(rule.id, 'operator', e.target.value)}
              className="rule-operator"
            >
              {operators.map(op => (
                <option key={op.value} value={op.value}>{op.label}</option>
              ))}
            </select>
            <input
              type="text"
              value={rule.value}
              onChange={(e) => updateRule(rule.id, 'value', e.target.value)}
              placeholder="Value"
              className="rule-value"
            />
            <button
              onClick={() => removeRule(rule.id)}
              className="rule-remove"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Add New Rule */}
      <div className="rule-form">
        <h3 className="form-title">Add New Rule</h3>
        <div className="form-row">
          <select
            value={newRule.field}
            onChange={(e) => setNewRule({...newRule, field: e.target.value})}
            className="rule-field"
          >
            {fields.map(field => (
              <option key={field.value} value={field.value}>{field.label}</option>
            ))}
          </select>
          <select
            value={newRule.operator}
            onChange={(e) => setNewRule({...newRule, operator: e.target.value})}
            className="rule-operator"
          >
            {operators.map(op => (
              <option key={op.value} value={op.value}>{op.label}</option>
            ))}
          </select>
          <input
            type="text"
            value={newRule.value}
            onChange={(e) => setNewRule({...newRule, value: e.target.value})}
            placeholder="Enter value"
            className="rule-value"
          />
          <button
            onClick={addRule}
            disabled={!newRule.value.trim()}
            className="rule-add"
          >
            Add Rule
          </button>
        </div>
      </div>
    </div>
  );
}`}
                </pre>
              ) : (
                <pre className="text-sm leading-relaxed">
{`/* Rule Builder Container */
.rule-builder-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Rules List */
.rules-list {
  margin-bottom: 2rem;
}

.rules-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
}

/* Rule Item */
.rule-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  background: white;
  transition: all 0.2s ease;
}

.rule-item:hover {
  border-color: #d1d5db;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.rule-item.rule-enabled {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.rule-item.rule-disabled {
  opacity: 0.6;
  background-color: #f9fafb;
}

/* Rule Toggle */
.rule-toggle {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.25rem;
  border: 2px solid #d1d5db;
  cursor: pointer;
  transition: all 0.2s ease;
}

.rule-toggle:checked {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

.rule-toggle:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Rule Fields */
.rule-field,
.rule-operator {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
  font-size: 0.875rem;
  min-width: 120px;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.rule-field:focus,
.rule-operator:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Rule Value */
.rule-value {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
  font-size: 0.875rem;
  min-width: 150px;
  transition: border-color 0.2s ease;
}

.rule-value:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.rule-value::placeholder {
  color: #9ca3af;
}

/* Rule Buttons */
.rule-remove {
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 50%;
  background: #ef4444;
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.rule-remove:hover {
  background: #dc2626;
  transform: scale(1.1);
}

.rule-remove:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Rule Form */
.rule-form {
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
}

.form-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

/* Add Rule Button */
.rule-add {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.rule-add:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
}

.rule-add:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.rule-add:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Rule Summary */
.rule-summary {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

/* Responsive Design */
@media (max-width: 768px) {
  .rule-builder-container {
    padding: 1rem;
  }
  
  .rule-item {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
  
  .form-row {
    flex-direction: column;
    align-items: stretch;
  }
  
  .rule-field,
  .rule-operator,
  .rule-value {
    min-width: auto;
    width: 100%;
  }
  
  .rule-remove {
    align-self: flex-end;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .rule-builder-container {
    background: #1f2937;
    color: #f9fafb;
  }
  
  .rule-item {
    background: #374151;
    border-color: #4b5563;
  }
  
  .rule-item:hover {
    border-color: #6b7280;
  }
  
  .rule-item.rule-enabled {
    border-color: #60a5fa;
    background-color: #1e3a8a;
  }
  
  .rule-item.rule-disabled {
    background-color: #374151;
  }
  
  .rule-field,
  .rule-operator,
  .rule-value {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
  
  .rule-field:focus,
  .rule-operator:focus,
  .rule-value:focus {
    border-color: #60a5fa;
  }
  
  .rule-value::placeholder {
    color: #6b7280;
  }
  
  .rules-title,
  .form-title {
    color: #f9fafb;
  }
  
  .rule-summary {
    background: #374151;
    border-color: #4b5563;
  }
}

/* Animation */
.rule-item {
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Focus Management */
.rule-toggle:focus-visible,
.rule-field:focus-visible,
.rule-operator:focus-visible,
.rule-value:focus-visible,
.rule-remove:focus-visible,
.rule-add:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .rule-item {
    border-width: 2px;
  }
  
  .rule-field,
  .rule-operator,
  .rule-value {
    border-width: 2px;
  }
  
  .rule-remove {
    border: 2px solid transparent;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .rule-item,
  .rule-toggle,
  .rule-field,
  .rule-operator,
  .rule-value,
  .rule-remove,
  .rule-add {
    transition: none;
  }
  
  .rule-item {
    animation: none;
  }
  
  .rule-remove:hover {
    transform: none;
  }
  
  .rule-add:hover:not(:disabled) {
    transform: none;
  }
}

/* Print Styles */
@media print {
  .rule-remove,
  .rule-add {
    display: none;
  }
  
  .rule-item {
    border: 1px solid #000;
    break-inside: avoid;
  }
}

/* Loading State */
.rule-item.loading {
  opacity: 0.7;
  pointer-events: none;
}

.rule-item.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1rem;
  height: 1rem;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Dynamic Rule Creation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Add, remove, and modify rules on the fly</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Rule Toggle</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enable/disable individual rules without deletion</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Multiple Operators</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Support for various comparison operators</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Feedback</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clear indication of active and inactive rules</p>
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
            <div className="text-2xl mb-2">🔍</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Advanced Search</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Build complex search filters and queries</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Data Filtering</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Filter large datasets with multiple criteria</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚙️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Automation Rules</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Create conditional workflows and triggers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
