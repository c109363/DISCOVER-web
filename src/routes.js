// ----------------------------------------------------------------------

const Routes = {
  hci: {
    landing: '/hci',
    posts: '/hci/blog',
    post: (slug) => `/hci/blog/${slug}`
  },
  sun: {
    landing: '/sun',
    posts: '/sun/blog',
    post: (slug) => `/sun/blog/${slug}`
  },
  mechanic: {
    landing: '/mechanic',
    posts: '/mechanic/blog',
    post: (slug) => `/mechanic/blog/${slug}`
  },
  // Marketing
  marketing: {
    landing: '/marketing',
    services: '/marketing/services',
    caseStudies: '/marketing/case-studies',
    caseStudy: (slug) => `/marketing/case-studies/${slug}`,
    posts: '/marketing/blog',
    post: (slug) => `/marketing/blog/${slug}`,
    about: '/marketing/about-us',
    contact: '/marketing/contact-us',
  },
  // Travel
  travel: {
    landing: '/travel',
    tours: '/travel/tours',
    tour: (id) => `/travel/tours/${id}`,
    checkout: '/travel/checkout',
    checkoutComplete: '/travel/checkout/complete',
    posts: '/travel/blog',
    post: (slug) => `/travel/blog/${slug}`,
    about: '/travel/about-us',
    contact: '/travel/contact-us',
  },
  // Career
  career: {
    landing: '/career',
    jobs: '/career/jobs',
    job: (id) => `/career/jobs/${id}`,
    posts: '/career/blog',
    post: (slug) => `/career/blog/${slug}`,
    about: '/career/about-us',
    contact: '/career/contact-us',
  },
  // E-Learning
  eLearning: {
    landing: '/e-learning',
    courses: '/e-learning/courses',
    course: (id) => `/e-learning/courses/${id}`,
    posts: '/e-learning/blog',
    post: (slug) => `/e-learning/blog/${slug}`,
    about: '/e-learning/about-us',
    contact: '/e-learning/contact-us',
  },
  // Common
  loginCover: '/auth/login-cover',
  registerCover: '/auth/register-cover',
  loginIllustration: '/auth/login-illustration',
  registerIllustration: '/auth/register-illustration',
  resetPassword: '/auth/reset-password',
  verifyCode: '/auth/verify-code',
  maintenance: '/maintenance',
  comingsoon: '/coming-soon',
  pricing01: '/pricing-01',
  pricing02: '/pricing-02',
  checkout: '/checkout',
  support: '/support',
  page404: '/404',
  page500: '/500',
  // Others
  pages: '/pages',
  componentsUI: '/components-ui',
  componentUI: (slug) => `/components-ui/${slug}`,
  muiComponents: 'https://mui.com/components',
  docs: 'https://zone-docs.vercel.app',
  license: 'https://material-ui.com/store/license/#i-standard-license',
  minimalDashboard: 'https://material-ui.com/store/items/minimal-dashboard',
  buyNow: 'https://material-ui.com/store/items/zone-landing-page',
  figmaPreview:
    'https://www.figma.com/file/iAnp6x4J6YNvbVzdBnGM8P/%5BPreview%5D-Zone-Web?node-id=0%3A1',
};

export default Routes;
