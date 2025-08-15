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
                  <div key={rule.id} className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <input
                      type="checkbox"
                      checked={rule.enabled}
                      onChange={() => toggleRule(rule.id)}
                      className="rounded"
                    />
                    <select
                      value={rule.field}
                      onChange={(e) => updateRule(rule.id, 'field', e.target.value)}
                      className="text-sm border rounded px-2 py-1 bg-white dark:bg-gray-700"
                    >
                      {fields.map(field => (
                        <option key={field.value} value={field.value}>{field.label}</option>
                      ))}
                    </select>
                    <select
                      value={rule.operator}
                      onChange={(e) => updateRule(rule.id, 'operator', e.target.value)}
                      className="text-sm border rounded px-2 py-1 bg-white dark:bg-gray-700"
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
                      className="text-sm border rounded px-2 py-1 flex-1 bg-white dark:bg-gray-700"
                    />
                    <button
                      onClick={() => removeRule(rule.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Rule */}
              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Add New Rule</h3>
                <div className="flex items-center space-x-3">
                  <select
                    value={newRule.field}
                    onChange={(e) => setNewRule({...newRule, field: e.target.value})}
                    className="text-sm border rounded px-2 py-1 bg-white dark:bg-gray-700"
                  >
                    {fields.map(field => (
                      <option key={field.value} value={field.value}>{field.label}</option>
                    ))}
                  </select>
                  <select
                    value={newRule.operator}
                    onChange={(e) => setNewRule({...newRule, operator: e.target.value})}
                    className="text-sm border rounded px-2 py-1 bg-white dark:bg-gray-700"
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
                    className="text-sm border rounded px-2 py-1 flex-1 bg-white dark:bg-gray-700"
                  />
                  <button
                    onClick={addRule}
                    className="btn-primary text-sm px-3 py-1"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Rule Summary */}
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Rule Summary</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {rules.filter(r => r.enabled).length} active rules • {rules.length} total rules
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
            <div className="code-block">
              <pre className="text-sm leading-relaxed">
{`import { useState } from 'react';

function RuleBuilderExample() {
  const [rules, setRules] = useState([
    { id: 1, field: 'age', operator: 'greater_than', value: '18', enabled: true }
  ]);

  const addRule = () => {
    const newRule = {
      id: Date.now(),
      field: 'name',
      operator: 'contains',
      value: '',
      enabled: true
    };
    setRules([...rules, newRule]);
  };

  const removeRule = (id) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const updateRule = (id, field, value) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, [field]: value } : rule
    ));
  };

  return (
    <div>
      {rules.map((rule) => (
        <div key={rule.id} className="flex items-center space-x-3">
          <select
            value={rule.field}
            onChange={(e) => updateRule(rule.id, 'field', e.target.value)}
          >
            <option value="name">Name</option>
            <option value="age">Age</option>
          </select>
          <select
            value={rule.operator}
            onChange={(e) => updateRule(rule.id, 'operator', e.target.value)}
          >
            <option value="equals">Equals</option>
            <option value="contains">Contains</option>
          </select>
          <input
            value={rule.value}
            onChange={(e) => updateRule(rule.id, 'value', e.target.value)}
          />
          <button onClick={() => removeRule(rule.id)}>Remove</button>
        </div>
      ))}
      <button onClick={addRule}>Add Rule</button>
    </div>
  );
}`}
              </pre>
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Clear indication of active rules and rule count</p>
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
            <p className="text-sm text-gray-600 dark:text-gray-400">Build complex search filters for databases</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Data Filtering</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Filter large datasets with multiple criteria</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚙️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Workflow Automation</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Create conditional logic for automated processes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
