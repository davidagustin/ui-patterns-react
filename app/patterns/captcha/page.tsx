"use client";

import { useState, useEffect } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function CaptchaPattern() {
  const [activeTab, setActiveTab] = useState<"jsx" | "css">("jsx");
  const [captchaType, setCaptchaType] = useState<"image" | "checkbox" | "math">(
    "image",
  );
  const [isVerified, setIsVerified] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [mathProblem, setMathProblem] = useState({
    num1: 7,
    num2: 3,
    operator: "+",
  });

  const [imageCaptcha, setImageCaptcha] = useState("ABCD123");
  const [captchaStyles, setCaptchaStyles] = useState<
    Array<{ transform: string; color: string }>
  >([]);

  const generateMathProblem = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ["+", "-", "×"];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    setMathProblem({ num1, num2, operator });
  };

  const generateImageCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setImageCaptcha(result);

    // Generate styles for each character
    const styles = result.split("").map(() => ({
      transform: `rotate(${Math.random() * 20 - 10}deg)`,
      color: `hsl(${Math.random() * 360}, 70%, 40%)`,
    }));
    setCaptchaStyles(styles);
  };

  const verifyCaptcha = () => {
    let correct = false;

    switch (captchaType) {
      case "math":
        const expected =
          mathProblem.operator === "+"
            ? mathProblem.num1 + mathProblem.num2
            : mathProblem.operator === "-"
              ? mathProblem.num1 - mathProblem.num2
              : mathProblem.num1 * mathProblem.num2;
        correct = parseInt(userAnswer) === expected;
        break;
      case "image":
        correct = userAnswer.toUpperCase() === imageCaptcha;
        break;
      case "checkbox":
        correct = true; // Checkbox is always correct when checked
        break;
    }

    if (correct) {
      setIsVerified(true);
      setUserAnswer("");
    } else {
      alert("Incorrect answer. Please try again.");
      setUserAnswer("");
      if (captchaType === "math") generateMathProblem();
      if (captchaType === "image") generateImageCaptcha();
    }
  };

  const resetCaptcha = () => {
    setIsVerified(false);
    setUserAnswer("");
    if (captchaType === "math") generateMathProblem();
    if (captchaType === "image") generateImageCaptcha();
  };

  // Initialize captcha styles on mount and when captcha type changes
  useEffect(() => {
    if (captchaType === "image") {
      generateImageCaptcha();
    }
  }, [captchaType]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🤖 CAPTCHA Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Verify that users are human with various types of CAPTCHA challenges
          that are both secure and user-friendly.
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
              Try different types of CAPTCHA challenges. Each type serves
              different security needs and user experience preferences.
            </p>

            <div className="space-y-6">
              {/* CAPTCHA Type Selector */}
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setCaptchaType("image");
                    resetCaptcha();
                  }}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    captchaType === "image"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Image CAPTCHA
                </button>
                <button
                  onClick={() => {
                    setCaptchaType("checkbox");
                    resetCaptcha();
                  }}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    captchaType === "checkbox"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Checkbox CAPTCHA
                </button>
                <button
                  onClick={() => {
                    setCaptchaType("math");
                    resetCaptcha();
                  }}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    captchaType === "math"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Math CAPTCHA
                </button>
              </div>

              {/* CAPTCHA Challenge */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                {isVerified ? (
                  <div className="text-center">
                    <div className="text-4xl mb-2">✅</div>
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
                      Verification Successful!
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      You have successfully completed the CAPTCHA challenge.
                    </p>
                    <button onClick={resetCaptcha} className="btn-primary">
                      Try Another CAPTCHA
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">
                      Complete the CAPTCHA Challenge
                    </h3>

                    {captchaType === "image" && (
                      <div className="space-y-3">
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-center">
                          <div className="text-2xl font-mono font-bold tracking-wider text-gray-800 dark:text-gray-200">
                            {imageCaptcha.split("").map((char, index) => (
                              <span
                                key={index}
                                className="inline-block mx-1"
                                style={captchaStyles[index] || {}}
                              >
                                {char}
                              </span>
                            ))}
                          </div>
                          <div className="text-xs text-gray-500 mt-2">
                            Enter the characters you see above
                          </div>
                        </div>
                        <input
                          type="text"
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          placeholder="Enter the code"
                          className="input-field"
                          maxLength={6}
                        />
                        <button
                          onClick={generateImageCaptcha}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Generate new code
                        </button>
                      </div>
                    )}

                    {captchaType === "checkbox" && (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <input
                            type="checkbox"
                            id="captcha-checkbox"
                            className="w-5 h-5 text-blue-600 rounded"
                          />
                          <label
                            htmlFor="captcha-checkbox"
                            className="text-sm text-gray-700 dark:text-gray-300"
                          >
                            I&apos;m not a robot
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">
                          Simply check the box to verify you're human
                        </p>
                      </div>
                    )}

                    {captchaType === "math" && (
                      <div className="space-y-3">
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-center">
                          <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            {mathProblem.num1} {mathProblem.operator}{" "}
                            {mathProblem.num2} = ?
                          </div>
                          <div className="text-xs text-gray-500 mt-2">
                            Solve the math problem
                          </div>
                        </div>
                        <input
                          type="number"
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          placeholder="Enter your answer"
                          className="input-field"
                        />
                        <button
                          onClick={generateMathProblem}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Generate new problem
                        </button>
                      </div>
                    )}

                    <button
                      onClick={verifyCaptcha}
                      className="btn-primary w-full"
                      disabled={
                        captchaType === "checkbox" ? false : !userAnswer.trim()
                      }
                    >
                      Verify CAPTCHA
                    </button>
                  </div>
                )}
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
              <DynamicCodeExample
                componentName="captcha"
                activeTab={activeTab}
              />
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
                Multiple Types
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Support for image, checkbox, and math CAPTCHAs
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Accessibility
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Alternative options for users with disabilities
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                User-Friendly
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Clear instructions and error handling
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Security
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Effective protection against automated bots
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
              Form Protection
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Prevent spam submissions on contact forms
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">👤</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              User Registration
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Verify human users during sign-up process
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">💬</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Comment Systems
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Protect against automated comment spam
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
