"use client";

import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";

export default function FAQPattern() {
  const [activeTab, setActiveTab] = useState<"jsx" | "css">("jsx");
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([1]));

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const faqData = [
    {
      id: 1,
      category: "general",
      question: "What is this service and how does it work?",
      answer:
        "Our service is a comprehensive platform that helps you manage your projects efficiently. It works by providing you with tools to organize tasks, collaborate with team members, and track progress in real-time. You can create projects, assign tasks, set deadlines, and monitor completion status all from one centralized dashboard.",
    },
    {
      id: 2,
      category: "billing",
      question: "How much does it cost and what payment methods do you accept?",
      answer:
        "We offer flexible pricing plans starting from $9.99/month for individuals and $29.99/month for teams. We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All plans come with a 14-day free trial with no credit card required.",
    },
    {
      id: 3,
      category: "technical",
      question: "Is my data secure and backed up?",
      answer:
        "Yes, we take security very seriously. All data is encrypted in transit and at rest using industry-standard AES-256 encryption. We perform automated daily backups with 99.9% uptime guarantee. Our servers are hosted on AWS with SOC 2 compliance and we undergo regular security audits.",
    },
    {
      id: 4,
      category: "general",
      question: "Can I cancel my subscription at any time?",
      answer:
        "Absolutely! You can cancel your subscription at any time with no cancellation fees. Your account will remain active until the end of your current billing period, and you'll continue to have access to all features during that time. You can easily cancel from your account settings or contact our support team.",
    },
    {
      id: 5,
      category: "technical",
      question: "Do you have a mobile app?",
      answer:
        "Yes, we have mobile apps available for both iOS and Android devices. The mobile apps include all the core features of the web platform, including task management, team collaboration, real-time notifications, and offline access. You can download them from the App Store or Google Play Store.",
    },
    {
      id: 6,
      category: "billing",
      question: "Can I upgrade or downgrade my plan?",
      answer:
        "Yes, you can change your plan at any time. When upgrading, you'll be charged the prorated difference immediately and gain access to new features right away. When downgrading, the change takes effect at your next billing cycle, and you'll keep access to premium features until then.",
    },
    {
      id: 7,
      category: "general",
      question: "How do I get support if I need help?",
      answer:
        "We offer multiple support channels: 24/7 live chat through our website, email support with responses within 2 hours during business days, comprehensive documentation and video tutorials, and phone support for premium plan subscribers. You can also access our community forum for peer-to-peer assistance.",
    },
    {
      id: 8,
      category: "technical",
      question: "What integrations do you support?",
      answer:
        "We integrate with over 50+ popular tools including Slack, Microsoft Teams, Google Workspace, GitHub, Jira, Trello, Zapier, and many more. We also provide a REST API and webhooks for custom integrations. New integrations are added regularly based on user feedback.",
    },
  ];

  const categories = [
    { id: "all", name: "All Questions", icon: "📚" },
    { id: "general", name: "General", icon: "❓" },
    { id: "billing", name: "Billing", icon: "💳" },
    { id: "technical", name: "Technical", icon: "⚙️" },
  ];

  const filteredFAQs = faqData.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const expandAll = () => {
    setOpenItems(new Set(filteredFAQs.map((item) => item.id)));
  };

  const collapseAll = () => {
    setOpenItems(new Set());
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ❓ FAQ Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Organize frequently asked questions with collapsible sections, search
          functionality, and category filtering for easy information discovery.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Example */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🎯 Interactive Example
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Search questions, filter by category, and click to expand/collapse
              answers. Try the expand/collapse all buttons.
            </p>

            {/* Search and Controls */}
            <div className="space-y-4 mb-6">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">
                  🔍
                </span>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    <span className="mr-1">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Expand/Collapse Controls */}
              <div className="flex gap-2">
                <button
                  onClick={expandAll}
                  className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="px-3 py-1 text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* FAQ Items */}
            <div className="space-y-3">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 pr-4">
                          {item.question}
                        </h3>
                        <span
                          className={`text-blue-500 transition-transform duration-200 ${
                            openItems.has(item.id) ? "rotate-180" : ""
                          }`}
                        >
                          ▼
                        </span>
                      </div>
                      <div className="mt-1">
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            item.category === "general"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : item.category === "billing"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                    </button>
                    {openItems.has(item.id) && (
                      <div className="px-4 pb-4">
                        <div className="pt-2 border-t border-gray-100 dark:border-gray-600">
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>No questions found matching your search.</p>
                </div>
              )}
            </div>

            {/* Results Info */}
            {filteredFAQs.length > 0 && (
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                Showing {filteredFAQs.length} of {faqData.length} questions
              </div>
            )}
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
              {<DynamicCodeExample componentName="faq" activeTab={activeTab} />}
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
                Collapsible Sections
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Expandable answers to keep interface clean
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Search Functionality
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Find answers quickly with keyword search
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Category Filtering
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Organize questions by topic or department
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Bulk Actions
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Expand or collapse all items at once
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
            <div className="text-2xl mb-2">🛠️</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Product Support
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Common user questions and troubleshooting
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📄</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Documentation
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Technical documentation and guides
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🏢</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Company Policies
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              HR policies and employee handbook
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
