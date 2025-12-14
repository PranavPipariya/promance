'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/lib/userStore';
import { theme } from '@/lib/theme';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { user } = useUserStore();

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      if (!user || !user.onboardingComplete) {
        router.push('/onboarding');
      } else {
        router.push('/app');
      }
    }
  }, [status, user, router]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: theme.colors.bgLight }}
    >
      <div className="text-center">
        <div
          className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent mx-auto mb-4"
          style={{ borderColor: theme.colors.primary }}
        />
        <p style={{ color: theme.colors.textSecondary }}>Loading...</p>
      </div>
    </div>
  );
}
