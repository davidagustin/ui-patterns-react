"use client";
import { useState, useRef, useCallback } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";
import Tooltip from "../../../components/Tooltip";
interface FileWithProgress {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
}
export default function FileUploadPattern() {
  const [files, setFiles] = useState<FileWithProgress[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
    "text/plain",
  ];
  const maxFileSize = 5 * 1024 * 1024; // 5MB
  const maxFiles = 5;
  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return "File type not allowed. Please upload JPEG, PNG, GIF, PDF, or TXT files.";
    }
    if (file.size > maxFileSize) {
      return "File size too large. Maximum size is 5MB.";
    }
    return null;
  };
  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const fileArray = Array.from(newFiles);
      const validFiles: FileWithProgress[] = [];
      fileArray.forEach((file) => {
        const error = validateFile(file);
        if (error) {
          alert(error);
          return;
        }
        if (files.length >= maxFiles) {
          alert(`Maximum ${maxFiles} files allowed.`);
          return;
        }
        validFiles.push({
          id: Date.now().toString() + Math.random(),
          file,
          progress: 0,
          status: "uploading",
        });
      });
      setFiles((prev) => [...prev, ...validFiles]);
    },
    [files.length],
  );
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addFiles(event.target.files);
    }
  };
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    if (event.dataTransfer.files) {
      addFiles(event.dataTransfer.files);
    }
  };
  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };
  const simulateUpload = async (fileWithProgress: FileWithProgress) => {
    const totalSteps = 100;
    const stepDelay = 50;
    for (let i = 0; i <= totalSteps; i++) {
      await new Promise((resolve) => setTimeout(resolve, stepDelay));
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileWithProgress.id ? { ...f, progress: i } : f,
        ),
      );
    }
    // Simulate completion or error
    const success = Math.random() > 0.1; // 90% success rate
    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileWithProgress.id
          ? {
              ...f,
              status: success ? "completed" : "error",
              error: success ? undefined : "Upload failed. Please try again.",
            }
          : f,
      ),
    );
  };
  const startUpload = async () => {
    setUploading(true);
    const uploadingFiles = files.filter((f) => f.status === "uploading");
    // Simulate concurrent uploads
    await Promise.all(uploadingFiles.map(simulateUpload));
    setUploading(false);
  };
  const clearAll = () => {
    setFiles([]);
    setUploading(false);
  };
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  const getFileIcon = (type: string): string => {
    if (type.startsWith("image/")) return "🖼️";
    if (type === "application/pdf") return "📄";
    if (type === "text/plain") return "📝";
    return "📁";
  };
  const getStatusIcon = (status: string): string => {
    switch (status) {
      case "uploading":
        return "⏳";
      case "completed":
        return "✅";
      case "error":
        return "❌";
      default:
        return "📁";
    }
  };
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "uploading":
        return "text-blue-600 dark:text-blue-400";
      case "completed":
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
          📁 File Upload Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Advanced file upload system with drag-and-drop, progress tracking, and
          file validation.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Upload Area */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            <div className="space-y-4">
              {/* Upload Zone */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragOver
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Tooltip content="Upload files">
                  <div className="text-4xl mb-4">📁</div>
                </Tooltip>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Drop files here or click to browse
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Supports JPEG, PNG, GIF, PDF, and TXT files up to 5MB
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Choose Files
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.gif,.pdf,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
              {/* Upload Controls */}
              {files.length > 0 && (
                <div className="flex space-x-3">
                  <button
                    onClick={startUpload}
                    disabled={
                      uploading || files.every((f) => f.status !== "uploading")
                    }
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {uploading ? "Uploading..." : "Start Upload"}
                  </button>
                  <button
                    onClick={clearAll}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              )}
              {/* File Info */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Upload Info
                </h4>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <div>• Maximum files: {maxFiles}</div>
                  <div>• Maximum size: {formatFileSize(maxFileSize)}</div>
                  <div>• Allowed types: JPEG, PNG, GIF, PDF, TXT</div>
                  <div>• Files selected: {files.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* File List */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              📋 File List
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {files.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <div className="text-4xl mb-2" title="No files selected">
                    📁
                  </div>
                  <p>No files selected</p>
                  <p className="text-sm">Drag and drop files or click browse</p>
                </div>
              ) : (
                files.map((fileWithProgress) => (
                  <div
                    key={fileWithProgress.id}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start space-x-3">
                      <Tooltip
                        content={`${fileWithProgress.file.type || "File"} type`}
                      >
                        <div className="text-2xl">
                          {getFileIcon(fileWithProgress.file.type)}
                        </div>
                      </Tooltip>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                            {fileWithProgress.file.name}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <Tooltip
                              content={`File ${fileWithProgress.status}`}
                            >
                              <span
                                className={`text-sm ${getStatusColor(fileWithProgress.status)}`}
                              >
                                {getStatusIcon(fileWithProgress.status)}
                              </span>
                            </Tooltip>
                            <Tooltip content="Remove file">
                              <button
                                onClick={() => removeFile(fileWithProgress.id)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                aria-label="Remove file"
                              >
                                ✕
                              </button>
                            </Tooltip>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {formatFileSize(fileWithProgress.file.size)}
                        </div>
                        {/* Progress Bar */}
                        {fileWithProgress.status === "uploading" && (
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${fileWithProgress.progress}%` }}
                            />
                          </div>
                        )}
                        {/* Progress Text */}
                        {fileWithProgress.status === "uploading" && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {fileWithProgress.progress}% uploaded
                          </div>
                        )}
                        {/* Error Message */}
                        {fileWithProgress.status === "error" &&
                          fileWithProgress.error && (
                            <div className="text-xs text-red-600 dark:text-red-400">
                              {fileWithProgress.error}
                            </div>
                          )}
                        {/* Success Message */}
                        {fileWithProgress.status === "completed" && (
                          <div className="text-xs text-green-600 dark:text-green-400">
                            Upload completed successfully
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Code Example */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          💻 Code Example
        </h2>
        <div className="code-block">
          <DynamicCodeExample componentName="file-upload" />
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
                Intuitive drag-and-drop file upload
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Progress Tracking
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Real-time upload progress with visual feedback
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
                Type and size validation with error handling
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Multiple Files
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Support for multiple file selection and upload
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
            <div className="text-2xl mb-2">📷</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Image Upload
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Profile pictures, galleries, and media uploads
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📄</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Document Upload
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Resumes, contracts, and file sharing
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">☁️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Cloud Storage
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              File backup and cloud storage applications
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
