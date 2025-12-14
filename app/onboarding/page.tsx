'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/lib/userStore';
import { theme } from '@/lib/theme';
import { FaHeart, FaArrowRight } from 'react-icons/fa';

const LANGUAGES = [
  'JavaScript', 'TypeScript', 'Python', 'Rust', 'Go', 'Java',
  'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin'
];

const INTERESTS = [
  'Web Development', 'Mobile Apps', 'Machine Learning', 'DevOps',
  'Data Science', 'Game Development', 'Blockchain', 'Security',
  'Cloud Computing', 'UI/UX', 'Open Source', 'APIs'
];

const ISSUE_TYPES = [
  'Bug Fixes', 'New Features', 'Documentation', 'Testing',
  'Refactoring', 'Performance', 'Accessibility', 'Design'
];

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { setUser } = useUserStore();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    languages: [] as string[],
    experienceLevel: 'intermediate' as 'beginner' | 'intermediate' | 'advanced',
    interests: [] as string[],
    issueTypes: [] as string[],
    dailyGoal: 3,
  });

  const toggleSelection = (field: 'languages' | 'interests' | 'issueTypes', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleComplete = () => {
    if (!session?.user) return;

    const user = session.user as any;
    setUser({
      id: user.id || user.login,
      login: user.login,
      name: user.name,
      avatar_url: user.avatar_url,
      bio: null,
      ...formData,
      onboardingComplete: true,
      createdAt: new Date().toISOString(),
    });

    router.push('/app');
  };

  return (
    <div
      className="min-h-screen px-4 py-12"
      style={{ background: `linear-gradient(135deg, ${theme.colors.bgLight} 0%, ${theme.colors.secondary} 100%)` }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ backgroundColor: theme.colors.primary }}
          >
            <FaHeart className="text-3xl text-white" />
          </div>
          <h1 className="text-3xl font-bold" style={{ color: theme.colors.textPrimary }}>
            Create Your Profile
          </h1>
          <p className="mt-2" style={{ color: theme.colors.textSecondary }}>
            Help us find your perfect issue matches
          </p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex-1 h-2 rounded-full transition-all"
              style={{
                backgroundColor: i <= step ? theme.colors.primary : theme.colors.border,
              }}
            />
          ))}
        </div>

        {/* Content Card */}
        <div
          className="rounded-3xl p-8 shadow-xl"
          style={{ backgroundColor: theme.colors.bgWhite }}
        >
          {/* Step 1: Languages */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: theme.colors.textPrimary }}>
                What languages do you code in?
              </h2>
              <p className="mb-6" style={{ color: theme.colors.textSecondary }}>
                Select all that apply
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => toggleSelection('languages', lang)}
                    className="py-3 px-4 rounded-xl font-medium transition-all"
                    style={{
                      backgroundColor: formData.languages.includes(lang)
                        ? theme.colors.primary
                        : theme.colors.bgGray,
                      color: formData.languages.includes(lang)
                        ? theme.colors.bgWhite
                        : theme.colors.textPrimary,
                      border: `2px solid ${formData.languages.includes(lang) ? theme.colors.primary : theme.colors.border}`,
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Experience Level */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: theme.colors.textPrimary }}>
                What's your experience level?
              </h2>
              <p className="mb-6" style={{ color: theme.colors.textSecondary }}>
                Be honest - we'll match you accordingly
              </p>
              <div className="space-y-3">
                {[
                  { value: 'beginner', label: 'Beginner', desc: "I'm just starting out" },
                  { value: 'intermediate', label: 'Intermediate', desc: 'I have some experience' },
                  { value: 'advanced', label: 'Advanced', desc: "I'm experienced and confident" },
                ].map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setFormData({ ...formData, experienceLevel: level.value as any })}
                    className="w-full p-6 rounded-xl text-left transition-all"
                    style={{
                      backgroundColor: formData.experienceLevel === level.value
                        ? theme.colors.primary
                        : theme.colors.bgGray,
                      border: `2px solid ${formData.experienceLevel === level.value ? theme.colors.primary : theme.colors.border}`,
                    }}
                  >
                    <div
                      className="text-lg font-semibold"
                      style={{
                        color: formData.experienceLevel === level.value
                          ? theme.colors.bgWhite
                          : theme.colors.textPrimary,
                      }}
                    >
                      {level.label}
                    </div>
                    <div
                      className="text-sm mt-1"
                      style={{
                        color: formData.experienceLevel === level.value
                          ? theme.colors.bgWhite
                          : theme.colors.textSecondary,
                      }}
                    >
                      {level.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Interests */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: theme.colors.textPrimary }}>
                What are you interested in?
              </h2>
              <p className="mb-6" style={{ color: theme.colors.textSecondary }}>
                Pick your favorite topics
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {INTERESTS.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleSelection('interests', interest)}
                    className="py-3 px-4 rounded-xl font-medium transition-all text-sm"
                    style={{
                      backgroundColor: formData.interests.includes(interest)
                        ? theme.colors.primary
                        : theme.colors.bgGray,
                      color: formData.interests.includes(interest)
                        ? theme.colors.bgWhite
                        : theme.colors.textPrimary,
                      border: `2px solid ${formData.interests.includes(interest) ? theme.colors.primary : theme.colors.border}`,
                    }}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Issue Types & Goal */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: theme.colors.textPrimary }}>
                What kind of work do you prefer?
              </h2>
              <p className="mb-6" style={{ color: theme.colors.textSecondary }}>
                Select issue types you enjoy
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {ISSUE_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleSelection('issueTypes', type)}
                    className="py-3 px-4 rounded-xl font-medium transition-all text-sm"
                    style={{
                      backgroundColor: formData.issueTypes.includes(type)
                        ? theme.colors.primary
                        : theme.colors.bgGray,
                      color: formData.issueTypes.includes(type)
                        ? theme.colors.bgWhite
                        : theme.colors.textPrimary,
                      border: `2px solid ${formData.issueTypes.includes(type) ? theme.colors.primary : theme.colors.border}`,
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-lg font-semibold mb-3 block" style={{ color: theme.colors.textPrimary }}>
                  Daily Goal: {formData.dailyGoal} issues
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.dailyGoal}
                  onChange={(e) => setFormData({ ...formData, dailyGoal: parseInt(e.target.value) })}
                  className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, ${theme.colors.primary} 0%, ${theme.colors.primary} ${(formData.dailyGoal / 10) * 100}%, ${theme.colors.border} ${(formData.dailyGoal / 10) * 100}%, ${theme.colors.border} 100%)`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 py-4 px-6 rounded-full font-semibold transition-all"
                style={{
                  backgroundColor: theme.colors.bgGray,
                  color: theme.colors.textPrimary,
                }}
              >
                Back
              </button>
            )}
            <button
              onClick={() => step === 4 ? handleComplete() : setStep(step + 1)}
              className="flex-1 py-4 px-6 rounded-full font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.bgWhite,
              }}
              disabled={
                (step === 1 && formData.languages.length === 0) ||
                (step === 3 && formData.interests.length === 0) ||
                (step === 4 && formData.issueTypes.length === 0)
              }
            >
              {step === 4 ? 'Complete' : 'Continue'}
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
