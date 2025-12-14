'use client';

import { usePathname, useRouter } from 'next/navigation';
import { FaFire, FaHeart, FaUser } from 'react-icons/fa';
import { theme } from '@/lib/theme';

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = [
    { path: '/app', icon: FaFire, label: 'Discover' },
    { path: '/app/matches', icon: FaHeart, label: 'Matches' },
    { path: '/app/profile', icon: FaUser, label: 'Profile' },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 border-t safe-bottom"
      style={{
        backgroundColor: theme.colors.bgWhite,
        borderColor: theme.colors.border,
      }}
    >
      <div className="max-w-2xl mx-auto flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.path;

          return (
            <button
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className="flex-1 py-4 flex flex-col items-center gap-1 transition-all"
            >
              <Icon
                className="text-2xl"
                style={{
                  color: isActive ? theme.colors.primary : theme.colors.textMuted,
                }}
              />
              <span
                className="text-xs font-medium"
                style={{
                  color: isActive ? theme.colors.primary : theme.colors.textMuted,
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
