export const paths = {
  auth: {
    login: {
      path: '/login',
      getHref: (redirectTo?: string | null) => 
        `/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    signup: {
      path: '/signup',
      getHref: (redirectTo?: string | null) => 
        `/signup${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },
  app: {
    home: {
      path: '/',
      getHref: () => '/',
    },
    dashboard: {
      path: '/dashboard',
      getHref: () => '/dashboard',
    },
    onboarding: {
      path: '/onboarding',
      getHref: () => '/onboarding',
    },
    purchases: {
      path: '/profile/purchases',
      getHref: () => '/profile/purchases',
    },
  },
} as const;
