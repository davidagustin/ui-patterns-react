"use client";
import { useState, useRef, useEffect } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";
import Tooltip from "../../../components/Tooltip";
export default function ColorPickerPattern() {
  const [selectedColor, setSelectedColor] = useState("#3b82f6");
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });
  const [presetColors] = useState([
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#eab308",
    "#84cc16",
    "#22c55e",
    "#10b981",
    "#06b6d4",
    "#0ea5e9",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#a855f7",
    "#d946ef",
    "#ec4899",
    "#f43f5e",
    "#6b7280",
    "#374151",
    "#111827",
    "#000000",
  ]);
  const [customColors, setCustomColors] = useState<string[]>([]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  // Convert hex to HSL
  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };
  // Convert HSL to hex
  const hslToHex = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0,
      g = 0,
      b = 0;
    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };
  // Update color when hex changes
  useEffect(() => {
    setHsl(hexToHsl(selectedColor));
  }, [selectedColor]);
  // Handle click outside to close picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleHslChange = (newHsl: Partial<typeof hsl>) => {
    const updatedHsl = { ...hsl, ...newHsl };
    setHsl(updatedHsl);
    setSelectedColor(hslToHex(updatedHsl.h, updatedHsl.s, updatedHsl.l));
  };
  const addToCustomColors = () => {
    if (!customColors.includes(selectedColor)) {
      setCustomColors([selectedColor, ...customColors.slice(0, 9)]);
    }
  };
  const getContrastColor = (color: string) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#ffffff";
  };
  const ColorPreview = ({
    color,
    size = "md",
    onClick,
  }: {
    color: string;
    size?: "sm" | "md" | "lg";
    onClick?: () => void;
  }) => {
    const sizeClasses = {
      sm: "w-6 h-6",
      md: "w-8 h-8",
      lg: "w-12 h-12",
    };
    return (
      <button
        onClick={onClick}
        className={`${sizeClasses[size]} rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors shadow-sm`}
        style={{ backgroundColor: color }}
        title={`Select color: ${color}`}
        aria-label={`Select color ${color}`}
      />
    );
  };
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🎨 Color Picker Patterns
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Comprehensive color selection tools with HSL controls, presets, and
          custom color management.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Color Picker
            </h2>
            <div className="space-y-6">
              {/* Color Preview & Trigger */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Tooltip content="Click to open color picker">
                    <div
                      className="w-16 h-16 rounded-xl border-2 border-gray-300 dark:border-gray-600 shadow-md cursor-pointer hover:scale-105 transition-transform"
                      style={{ backgroundColor: selectedColor }}
                      onClick={() => setIsPickerOpen(!isPickerOpen)}
                    />
                  </Tooltip>
                  <div className="flex-1">
                    <div
                      className="text-lg font-semibold"
                      style={{ color: selectedColor }}
                    >
                      Current Color
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                      {selectedColor.toUpperCase()}
                    </div>
                  </div>
                </div>
                {/* Color Input Field */}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={selectedColor}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
                        setSelectedColor(value);
                      }
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 font-mono text-sm"
                    placeholder="#000000"
                  />
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
              {/* Advanced Color Picker */}
              {isPickerOpen && (
                <div
                  ref={pickerRef}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-xl space-y-4"
                >
                  {/* HSL Sliders */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Hue: {hsl.h}°
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={hsl.h}
                          onChange={(e) =>
                            handleHslChange({ h: parseInt(e.target.value) })
                          }
                          className="w-full h-4 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 via-purple-500 to-red-500 rounded-lg appearance-none cursor-pointer slider-hue"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Saturation: {hsl.s}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={hsl.s}
                        onChange={(e) =>
                          handleHslChange({ s: parseInt(e.target.value) })
                        }
                        className="w-full h-4 rounded-lg appearance-none cursor-pointer slider-saturation"
                        style={{
                          background: `linear-gradient(to right, hsl(${hsl.h}, 0%, ${hsl.l}%), hsl(${hsl.h}, 100%, ${hsl.l}%))`,
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Lightness: {hsl.l}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={hsl.l}
                        onChange={(e) =>
                          handleHslChange({ l: parseInt(e.target.value) })
                        }
                        className="w-full h-4 rounded-lg appearance-none cursor-pointer slider-lightness"
                        style={{
                          background: `linear-gradient(to right, hsl(${hsl.h}, ${hsl.s}%, 0%), hsl(${hsl.h}, ${hsl.s}%, 50%), hsl(${hsl.h}, ${hsl.s}%, 100%))`,
                        }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={addToCustomColors}
                    className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    Add to Custom Colors
                  </button>
                </div>
              )}
              {/* Preset Colors */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Preset Colors
                </h3>
                <div className="grid grid-cols-10 gap-2">
                  {presetColors.map((color) => (
                    <ColorPreview
                      key={color}
                      color={color}
                      size="md"
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>
              {/* Custom Colors */}
              {customColors.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Custom Colors
                    </h3>
                    <Tooltip content="Clear all custom colors">
                      <button
                        onClick={() => setCustomColors([])}
                        className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        Clear All
                      </button>
                    </Tooltip>
                  </div>
                  <div className="grid grid-cols-10 gap-2">
                    {customColors.map((color, index) => (
                      <ColorPreview
                        key={`${color}-${index}`}
                        color={color}
                        size="md"
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                </div>
              )}
              {/* Color Information */}
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-2">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Color Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="text-gray-500 dark:text-gray-400">HEX</div>
                    <div className="font-mono">
                      {selectedColor.toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400">RGB</div>
                    <div className="font-mono">
                      {parseInt(selectedColor.slice(1, 3), 16)},{" "}
                      {parseInt(selectedColor.slice(3, 5), 16)},{" "}
                      {parseInt(selectedColor.slice(5, 7), 16)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400">HSL</div>
                    <div className="font-mono">
                      {hsl.h}°, {hsl.s}%, {hsl.l}%
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400">
                      Contrast
                    </div>
                    <div
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: selectedColor,
                        color: getContrastColor(selectedColor),
                      }}
                    >
                      Sample Text
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Code Example */}
<DynamicCodeExample componentName="color-picker" />
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
                HSL Controls
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Intuitive hue, saturation, and lightness sliders
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Multiple Input Methods
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Hex input, native color picker, and custom sliders
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Preset & Custom Colors
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pre-defined color palette and custom color management
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Color Information
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Display HEX, RGB, HSL values and contrast preview
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
            <div className="text-2xl mb-2">🎨</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Design Tools
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Theme customization and design systems
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🏠</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Customization
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              User interface personalization
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Data Visualization
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Chart colors and data representation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
