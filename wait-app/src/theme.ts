/**
 * Wait App theme — Splash/Onboarding from design; rest from Lunaris
 */
export const theme = {
  colors: {
    background: '#0f0f12',
    foreground: '#fafafa',
    primary: '#6366f1',
    secondary: '#71717a',
    input: '#27272a',
    border: '#3f3f46',
    popover: '#18181b',
    success: '#22c55e',
    warning: '#eab308',
    error: '#ef4444',
    // Splash & Onboarding (warm coral/orange from design)
    splashGradientStart: '#D3543C',
    splashGradientEnd: '#F2A07B',
    splashLogoCircle: '#E8A87C',
    onboardingAccent: '#E07A5F',
    onboardingIllustrationBg: '#E8B4A0',
    // Home List (light design)
    homeBackground: '#F5F5F5',
    homeCard: '#E8E8E8',
    homeText: '#1a1a1a',
    homeTextSecondary: '#6b7280',
    homeAccent: '#E07A5F',
    homeTabInactive: '#d4d4d4',
  },
  radius: {
    pill: 9999,
    md: 8,
    lg: 12,
  },
  fontSizes: {
    sm: 14,
    base: 16,
    lg: 18,
  },
} as const;
