"use client";
import { useState } from "react";
import { DynamicCodeExample } from "../../../components/shared/CodeGenerator";
export default function CompletenessMeterPattern() {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: "",
    avatar: "",
    skills: [] as string[],
    experience: "",
    education: "",
    location: "",
    portfolio: "",
    socialLinks: {
      linkedin: "",
      github: "",
      twitter: "",
    },
  });
  const calculateCompleteness = () => {
    const fields = [
      profileData.name,
      profileData.email,
      profileData.bio,
      profileData.avatar,
      profileData.experience,
      profileData.education,
      profileData.location,
      profileData.portfolio,
      profileData.socialLinks.linkedin,
      profileData.socialLinks.github,
      profileData.socialLinks.twitter,
    ];
    const skillsWeight = profileData.skills.length > 0 ? 1 : 0;
    const totalFields = fields.length + 1; // +1 for skills
    const filledFields =
      fields.filter((field) => field.trim() !== "").length + skillsWeight;
    return Math.round((filledFields / totalFields) * 100);
  };
  const completeness = calculateCompleteness();
  const getCompletenessColor = (percentage: number) => {
    if (percentage < 30) return "bg-red-500";
    if (percentage < 60) return "bg-yellow-500";
    if (percentage < 80) return "bg-blue-500";
    return "bg-green-500";
  };
  const getCompletenessMessage = (percentage: number) => {
    if (percentage < 30) return { text: "Getting started", icon: "🚀" };
    if (percentage < 60) return { text: "Making progress", icon: "📈" };
    if (percentage < 80) return { text: "Almost there", icon: "🎯" };
    if (percentage < 100) return { text: "Nearly complete", icon: "✨" };
    return { text: "Profile complete!", icon: "🎉" };
  };
  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("socialLinks.")) {
      const socialField = field.split(".")[1];
      setProfileData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialField]: value,
        },
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };
  const addSkill = (skill: string) => {
    if (skill.trim() && !profileData.skills.includes(skill.trim())) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill.trim()],
      }));
    }
  };
  const removeSkill = (skill: string) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };
  const message = getCompletenessMessage(completeness);
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📊 Completeness Meter Pattern
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Show users their progress towards completing a task or profile with
          visual feedback and encouragement.
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
              Fill out the profile form below and watch the completeness meter
              update in real-time.
            </p>
            {/* Completeness Meter */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Profile Completeness
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{message.icon}</span>
                  <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    {completeness}%
                  </span>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ease-out ${getCompletenessColor(completeness)}`}
                    style={{ width: `${completeness}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>0%</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {message.text}
                  </span>
                  <span>100%</span>
                </div>
              </div>
              {/* Encouragement Message */}
              <div className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {completeness < 100
                    ? `You're ${100 - completeness}% away from a complete profile. Keep going!`
                    : "Congratulations! Your profile is now complete and will be more visible to others."}
                </p>
              </div>
            </div>
            {/* Profile Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Edit Profile
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="input-field w-full"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="input-field w-full"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bio
                </label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="input-field w-full resize-none"
                  rows={3}
                  placeholder="Tell us about yourself..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Experience Level
                  </label>
                  <select
                    value={profileData.experience}
                    onChange={(e) =>
                      handleInputChange("experience", e.target.value)
                    }
                    className="input-field w-full"
                  >
                    <option value="">Select experience</option>
                    <option value="junior">Junior (0-2 years)</option>
                    <option value="mid">Mid-level (2-5 years)</option>
                    <option value="senior">Senior (5+ years)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Education
                  </label>
                  <input
                    type="text"
                    value={profileData.education}
                    onChange={(e) =>
                      handleInputChange("education", e.target.value)
                    }
                    className="input-field w-full"
                    placeholder="Your education background"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="input-field w-full"
                    placeholder="Your location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Portfolio URL
                  </label>
                  <input
                    type="url"
                    value={profileData.portfolio}
                    onChange={(e) =>
                      handleInputChange("portfolio", e.target.value)
                    }
                    className="input-field w-full"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Skills
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profileData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    className="input-field flex-1"
                    placeholder="Add a skill and press Enter"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        addSkill(e.currentTarget.value);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                </div>
              </div>
              {/* Social Links */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Social Links
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="url"
                    value={profileData.socialLinks.linkedin}
                    onChange={(e) =>
                      handleInputChange("socialLinks.linkedin", e.target.value)
                    }
                    className="input-field"
                    placeholder="LinkedIn URL"
                  />
                  <input
                    type="url"
                    value={profileData.socialLinks.github}
                    onChange={(e) =>
                      handleInputChange("socialLinks.github", e.target.value)
                    }
                    className="input-field"
                    placeholder="GitHub URL"
                  />
                  <input
                    type="url"
                    value={profileData.socialLinks.twitter}
                    onChange={(e) =>
                      handleInputChange("socialLinks.twitter", e.target.value)
                    }
                    className="input-field"
                    placeholder="Twitter URL"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Code Example */}
<DynamicCodeExample componentName="completeness-meter" />
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
                Real-time Updates
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Progress updates instantly as fields are filled
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Visual Feedback
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Color-coded progress bar with status messages
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Motivational Messages
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Encouraging text based on completion level
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg">
              ✓
            </span>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Flexible Calculation
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Customizable field weighting and scoring
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
              Profile Setup
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              User profile completion tracking
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">📋</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Form Progress
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Long form completion status
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl mb-2">🎯</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Goal Tracking
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Progress towards objectives
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
