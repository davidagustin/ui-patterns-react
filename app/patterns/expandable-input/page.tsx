"use client";

import { useState, useRef, useEffect } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function ExpandableInputPattern() {
  const [activeTab, setActiveTab] = useState<"jsx" | "css">("jsx");
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea
  const adjustHeight = (element: HTMLTextAreaElement | null) => {
    if (element) {
      element.style.height = "auto";
      element.style.height = `${element.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight(textareaRef.current);
  }, [text]);

  useEffect(() => {
    adjustHeight(descriptionRef.current);
  }, [description]);

  useEffect(() => {
    adjustHeight(notesRef.current);
  }, [notes]);

  const handleTagAdd = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()]);
      }
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewTag(value);

    // Auto-expand input based on content
    const input = e.target;
    input.style.width = "auto";
    input.style.width = `${Math.max(value.length * 8, 100)}px`;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📏 Expandable Input
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Inputs that dynamically resize and grow with content, providing a
          natural writing experience.
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
              {/* Auto-expanding Textarea */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Auto-expanding Textarea
                </label>
                <textarea
                  ref={textareaRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none overflow-hidden min-h-[40px]"
                  placeholder="Start typing... The textarea will grow with your content"
                  rows={1}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Character count: {text.length}
                </p>
              </div>

              {/* Expandable Description */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description (Grows with content)
                </label>
                <textarea
                  ref={descriptionRef}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none overflow-hidden min-h-[60px]"
                  placeholder="Write a description... This textarea will automatically expand as you type more content"
                  rows={2}
                />
                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>Characters: {description.length}</span>
                  <span>
                    Words:{" "}
                    {
                      description
                        .trim()
                        .split(/\s+/)
                        .filter((word) => word.length > 0).length
                    }
                  </span>
                </div>
              </div>

              {/* Dynamic Tag Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tags (Press Enter to add)
                </label>
                <div className="flex flex-wrap gap-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 min-h-[44px]">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-sm rounded-md"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={newTag}
                    onChange={handleTagInputChange}
                    onKeyDown={handleTagAdd}
                    className="flex-1 min-w-[100px] px-2 py-1 border-none outline-none bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder={tags.length === 0 ? "Add tags..." : ""}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {tags.length} tag{tags.length !== 1 ? "s" : ""} added
                </p>
              </div>

              {/* Expandable Notes */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Notes (Multi-line with auto-expand)
                </label>
                <textarea
                  ref={notesRef}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none overflow-hidden min-h-[80px]"
                  placeholder="Write your notes here... This textarea will grow vertically as you add more lines of text. You can write multiple paragraphs and the input will expand accordingly."
                  rows={3}
                />
                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>Lines: {notes.split("\n").length}</span>
                  <span>Characters: {notes.length}</span>
                </div>
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

            {/* Tab Content */}
            <div className="code-block">
              {
                <DynamicCodeExample componentName="expandable-input" />
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
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Auto-resize
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Inputs grow with content automatically
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Smooth Transitions
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Fluid height changes as you type
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Dynamic Width
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tag inputs expand horizontally
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Content Metrics
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Show character count and other stats
              </p>
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
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Text Editors
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Note-taking and content creation
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🏷️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Tag Management
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Dynamic tag input and removal
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">💬</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Comments
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Expandable comment sections
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
