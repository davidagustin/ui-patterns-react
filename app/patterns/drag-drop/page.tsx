'use client';

import { useState } from 'react';
import { DynamicCodeExample } from '../../../components/shared/CodeGenerator';

export default function DragDropPattern() {
  const [activeTab, setActiveTab] = useState<'jsx' | 'css'>('jsx');
  const [items, setItems] = useState([
    { id: 1, text: 'Task 1: Design Review', status: 'todo' },
    { id: 2, text: 'Task 2: Code Implementation', status: 'todo' },
    { id: 3, text: 'Task 3: Testing Phase', status: 'in-progress' },
    { id: 4, text: 'Task 4: Documentation', status: 'done' },
    { id: 5, text: 'Task 5: Deployment', status: 'done' }
  ]);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100 dark:bg-gray-800' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100 dark:bg-blue-900/20' },
    { id: 'done', title: 'Done', color: 'bg-green-100 dark:bg-green-900/20' }
  ];

  const handleDragStart = (e: React.DragEvent, itemId: number) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetStatus: string) => {
    e.preventDefault();
    if (draggedItem) {
      setItems(items.map(item =>
        item.id === draggedItem ? { ...item, status: targetStatus } : item
      ));
      setDraggedItem(null);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const getItemsForColumn = (status: string) => {
    return items.filter(item => item.status === status);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🎯 Drag & Drop Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Allow users to reorder items or move them between different categories through intuitive drag and drop interactions.
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
              Drag tasks between columns to change their status. This simulates a Kanban board for task management.
            </p>
            
            <div className="grid grid-cols-3 gap-4">
              {columns.map((column) => (
                <div
                  key={column.id}
                  className={`${column.color} rounded-lg p-4 min-h-[200px]`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, column.id)}
                >
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    {column.title}
                  </h3>
                  <div className="space-y-2">
                    {getItemsForColumn(column.id).map((item) => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item.id)}
                        onDragEnd={handleDragEnd}
                        className={`bg-white dark:bg-gray-700 p-3 rounded border cursor-move transition-all duration-200 ${
                          draggedItem === item.id 
                            ? 'opacity-50 scale-95 shadow-lg' 
                            : 'hover:shadow-md hover:scale-[1.02]'
                        }`}
                      >
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">How to Use</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>• Click and drag any task card to move it between columns</div>
                <div>• Drop the card in a different column to change its status</div>
                <div>• Visual feedback shows which item is being dragged</div>
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

            {/* Tab Content */}
            <div className="code-block">
              {
                <DynamicCodeExample 
                componentName="drag-drop" 
                activeTab={activeTab} 
              />
              }
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
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Visual Feedback</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Clear indication of drag state and drop zones</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Smooth Animations</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Fluid transitions during drag operations</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Touch Support</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Works on mobile devices with touch gestures</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Accessibility</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Keyboard navigation and screen reader support</p>
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
            <div className="text-2xl mb-2">📋</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Kanban Boards</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Task management with drag and drop columns</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🎵</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Playlist Management</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Reorder songs and tracks in music apps</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📁</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">File Organization</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Move files between folders and categories</p>
          </div>
        </div>
      </div>
    </div>
  );
}
