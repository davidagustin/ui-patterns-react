"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";
export default function RangeSliderPattern() {
  const [singleValue, setSingleValue] = useState(50);
  const [rangeValue, setRangeValue] = useState<[number, number]>([20, 80]);
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 500]);
  const [volume, setVolume] = useState(75);
  const handleRangeChange = useCallback(
    (
      values: [number, number],
      setValue: (values: [number, number]) => void,
    ) => {
      setValue(values);
    },
    [],
  );
  const RangeSlider = ({
    min = 0,
    max = 100,
    step = 1,
    values,
    onChange,
    formatValue = (value: number) => value.toString(),
    className = "",
  }: {
    min?: number;
    max?: number;
    step?: number;
    values: [number, number];
    onChange: (values: [number, number]) => void;
    formatValue?: (value: number) => string;
    className?: string;
  }) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);
    const getPercentage = (value: number) =>
      ((value - min) / (max - min)) * 100;
    const handleMouseDown = (type: "min" | "max") => (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(type);
    };
    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        if (!isDragging || !sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const percentage = Math.max(
          0,
          Math.min(100, ((e.clientX - rect.left) / rect.width) * 100),
        );
        const newValue = Math.round((percentage / 100) * (max - min) + min);
        const [minVal, maxVal] = values;
        if (isDragging === "min") {
          onChange([Math.min(newValue, maxVal - step), maxVal]);
        } else {
          onChange([minVal, Math.max(newValue, minVal + step)]);
        }
      },
      [isDragging, values, min, max, step, onChange],
    );
    const handleMouseUp = useCallback(() => {
      setIsDragging(null);
    }, []);
    // Add global mouse event listeners when dragging
    React.useEffect(() => {
      if (isDragging) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };
      }
    }, [isDragging, handleMouseMove, handleMouseUp]);
    return (
      <div className={`relative ${className}`}>
        {/* Track */}
        <div
          ref={sliderRef}
          className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer"
        >
          {/* Active range */}
          <div
            className="absolute h-full bg-blue-500 rounded-full"
            style={{
              left: `${getPercentage(values[0])}%`,
              width: `${getPercentage(values[1]) - getPercentage(values[0])}%`,
            }}
          />
          {/* Min thumb */}
          <div
            className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-grab active:cursor-grabbing transform -translate-y-1 shadow-sm"
            style={{ left: `calc(${getPercentage(values[0])}% - 8px)` }}
            onMouseDown={handleMouseDown("min")}
          />
          {/* Max thumb */}
          <div
            className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-grab active:cursor-grabbing transform -translate-y-1 shadow-sm"
            style={{ left: `calc(${getPercentage(values[1])}% - 8px)` }}
            onMouseDown={handleMouseDown("max")}
          />
        </div>
        {/* Value labels */}
        <div className="flex justify-between items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
          <span>{formatValue(values[0])}</span>
          <span>{formatValue(values[1])}</span>
        </div>
      </div>
    );
  };
  const SingleSlider = ({
    min = 0,
    max = 100,
    step = 1,
    value,
    onChange,
    formatValue = (value: number) => value.toString(),
    className = "",
  }: {
    min?: number;
    max?: number;
    step?: number;
    value: number;
    onChange: (value: number) => void;
    formatValue?: (value: number) => string;
    className?: string;
  }) => {
    return (
      <div className={`relative ${className}`}>
        {/* Track */}
        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          {/* Active track */}
          <div
            className="absolute h-full bg-blue-500 rounded-full"
            style={{ width: `${((value - min) / (max - min)) * 100}%` }}
          />
          {/* Native input for accessibility */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {/* Custom thumb */}
          <div
            className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full transform -translate-y-1 shadow-sm pointer-events-none"
            style={{
              left: `calc(${((value - min) / (max - min)) * 100}% - 8px)`,
            }}
          />
        </div>
        {/* Value display */}
        <div className="flex justify-center mt-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {formatValue(value)}
          </span>
        </div>
      </div>
    );
  };
  const formatPrice = (value: number) => `$${value}`;
  const formatPercentage = (value: number) => `${value}%`;
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🎚️ Range Slider Patterns
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Interactive range sliders for selecting single values or ranges with
          custom styling and accessibility support.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Examples
            </h2>
            <div className="space-y-8">
              {/* Single Value Slider */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Single Value Slider
                </h3>
                <div className="px-4">
                  <SingleSlider
                    min={0}
                    max={100}
                    step={1}
                    value={singleValue}
                    onChange={setSingleValue}
                    formatValue={formatPercentage}
                  />
                </div>
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Current value: <strong>{singleValue}%</strong>
                  </p>
                </div>
              </div>
              {/* Range Slider */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Range Slider
                </h3>
                <div className="px-4">
                  <RangeSlider
                    min={0}
                    max={100}
                    step={1}
                    values={rangeValue}
                    onChange={(values) =>
                      handleRangeChange(values, setRangeValue)
                    }
                    formatValue={formatPercentage}
                  />
                </div>
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Selected range:{" "}
                    <strong>
                      {rangeValue[0]}% - {rangeValue[1]}%
                    </strong>
                  </p>
                </div>
              </div>
              {/* Price Range Slider */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Price Range Filter
                </h3>
                <div className="px-4">
                  <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    values={priceRange}
                    onChange={(values) =>
                      handleRangeChange(values, setPriceRange)
                    }
                    formatValue={formatPrice}
                  />
                </div>
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    Price range:{" "}
                    <strong>
                      ${priceRange[0]} - ${priceRange[1]}
                    </strong>
                  </p>
                </div>
              </div>
              {/* Volume Slider with Steps */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Volume Control (With Visual Steps)
                </h3>
                <div className="px-4 space-y-4">
                  <div className="relative">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <span>0</span>
                      <span>25</span>
                      <span>50</span>
                      <span>75</span>
                      <span>100</span>
                    </div>
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      {/* Step markers */}
                      {[0, 25, 50, 75, 100].map((step) => (
                        <div
                          key={step}
                          className="absolute w-1 h-4 bg-gray-300 dark:bg-gray-600 transform -translate-y-1"
                          style={{ left: `${step}%` }}
                        />
                      ))}
                      {/* Active track */}
                      <div
                        className="absolute h-full bg-green-500 rounded-full"
                        style={{ width: `${volume}%` }}
                      />
                      {/* Native input */}
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {/* Custom thumb */}
                      <div
                        className="absolute w-4 h-4 bg-white border-2 border-green-500 rounded-full transform -translate-y-1 shadow-sm pointer-events-none"
                        style={{ left: `calc(${volume}% - 8px)` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl">
                      {volume === 0 ? "🔇" : volume < 50 ? "🔉" : "🔊"}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                      {volume}%
                    </span>
                  </div>
                </div>
              </div>
              {/* Native Range Input for Comparison */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Native HTML Range Input (Comparison)
                </h3>
                <div className="px-4">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={singleValue}
                    onChange={(e) => setSingleValue(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="text-center mt-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Native slider value: {singleValue}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Code Example */}
<DynamicCodeExample componentName="range-slider" />
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
                Single & Range Selection
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Support for both single values and range selection
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Custom Styling
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Fully customizable appearance and colors
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Accessibility Support
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Keyboard navigation and screen reader support
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Value Formatting
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Custom value display formatting functions
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
            <div className="text-2xl mb-2">💰</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Price Filters
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Product filtering by price range
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🔊</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Media Controls
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Volume, brightness, and playback controls
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">⚙️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Settings & Config
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              User preferences and configuration values
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
