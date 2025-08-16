"use client";

import { useState, useRef } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function ImageUploadPattern() {
  const [activeTab, setActiveTab] = useState<"jsx" | "css">("jsx");
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const id = Math.random().toString(36).substr(2, 9);
        const preview = URL.createObjectURL(file);

        const newImage = {
          id,
          file,
          preview,
          progress: 0,
          status: "uploading" as const,
        };

        setUploadedImages((prev) => [...prev, newImage]);

        // Simulate upload progress
        simulateUpload(id);
      }
    });
  };

  const simulateUpload = (id: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        setUploadedImages((prev) =>
          prev.map((img) =>
            img.id === id
              ? { ...img, progress: 100, status: "success" as const }
              : img,
          ),
        );
      } else {
        setUploadedImages((prev) =>
          prev.map((img) => (img.id === id ? { ...img, progress } : img)),
        );
      }
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (id: string) => {
    setUploadedImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "uploading":
        return "⏳";
      case "success":
        return "✅";
      case "error":
        return "❌";
      default:
        return "📷";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "uploading":
        return "text-yellow-600 dark:text-yellow-400";
      case "success":
        return "text-green-600 dark:text-green-400";
      case "error":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📤 Image Upload Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Drag and drop image upload with preview, progress indicators, and file
          validation.
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
              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                  isDragOver
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="text-4xl mb-4">📷</div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                  {isDragOver ? "Drop images here" : "Drag & drop images here"}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  or click to browse files
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Choose Files
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>

              {/* Uploaded Images */}
              {uploadedImages.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    Uploaded Images ({uploadedImages.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {uploadedImages.map((image) => (
                      <div
                        key={image.id}
                        className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                      >
                        {/* Image Preview */}
                        <div className="aspect-square relative">
                          <img
                            src={image.preview}
                            alt={image.file.name}
                            className="w-full h-full object-cover"
                          />

                          {/* Status Overlay */}
                          <div className="absolute top-2 right-2">
                            <span
                              className={`text-lg ${getStatusColor(image.status)}`}
                            >
                              {getStatusIcon(image.status)}
                            </span>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeImage(image.id)}
                            className="absolute top-2 left-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-sm transition-colors"
                          >
                            ×
                          </button>
                        </div>

                        {/* File Info */}
                        <div className="p-3">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                            {image.file.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {(image.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>

                          {/* Progress Bar */}
                          {image.status === "uploading" && (
                            <div className="mt-2">
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${image.progress}%` }}
                                />
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {Math.round(image.progress)}% uploaded
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                <DynamicCodeExample
                  componentName="image-upload"
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
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Drag & Drop
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Intuitive drag and drop file upload
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Image Preview
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Instant preview of uploaded images
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Progress Indicators
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Visual progress bars for upload status
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                File Validation
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Only accept image file types
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
            <div className="text-2xl mb-2">👤</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Profile Pictures
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              User avatar and profile image uploads
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📝</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Content Management
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Blog posts and article image uploads
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🛍️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Product Images
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              E-commerce product photo uploads
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
