"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
  delay?: number;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export default function Tooltip({
  content,
  children,
  delay = 0,
  position = "top",
  className = "",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (delay === 0) {
      setIsVisible(true);
      updatePosition();
    } else {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
        updatePosition();
      }, delay);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (position) {
      case "top":
        top = triggerRect.top - tooltipRect.height - 8;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case "bottom":
        top = triggerRect.bottom + 8;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case "left":
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left - tooltipRect.width - 8;
        break;
      case "right":
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + 8;
        break;
    }

    // Keep tooltip within viewport
    const padding = 8;
    left = Math.max(
      padding,
      Math.min(left, window.innerWidth - tooltipRect.width - padding),
    );
    top = Math.max(
      padding,
      Math.min(top, window.innerHeight - tooltipRect.height - padding),
    );

    setTooltipPosition({ top, left });
  };

  useEffect(() => {
    if (isVisible) {
      updatePosition();
    }
  }, [isVisible]);

  useEffect(() => {
    const handleScroll = () => {
      if (isVisible) {
        updatePosition();
      }
    };

    const handleResize = () => {
      if (isVisible) {
        updatePosition();
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible]);

  const getArrowClasses = () => {
    const base =
      "absolute w-2 h-2 bg-gray-800 dark:bg-gray-200 transform rotate-45";
    switch (position) {
      case "top":
        return `${base} -bottom-1 left-1/2 -translate-x-1/2`;
      case "bottom":
        return `${base} -top-1 left-1/2 -translate-x-1/2`;
      case "left":
        return `${base} -right-1 top-1/2 -translate-y-1/2`;
      case "right":
        return `${base} -left-1 top-1/2 -translate-y-1/2`;
      default:
        return `${base} -bottom-1 left-1/2 -translate-x-1/2`;
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`inline-block ${className}`}
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-[9999] px-2 py-1 text-xs text-white bg-gray-800 dark:bg-gray-200 dark:text-gray-800 rounded shadow-lg pointer-events-none"
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
          }}
          role="tooltip"
          aria-hidden="true"
        >
          {content}
          <div className={getArrowClasses()} />
        </div>
      )}
    </>
  );
}
