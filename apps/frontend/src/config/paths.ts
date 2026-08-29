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
    dashboard: {
      path: '/',
      getHref: () => '/',
    },
    onboarding: {
      path: '/onboarding',
      getHref: () => '/onboarding',
    },
  },
} as const;
