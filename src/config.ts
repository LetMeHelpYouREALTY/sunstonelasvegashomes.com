export const SITE = {
  /** Canonical origin (www) — must match GSC property, sitemap, og:url, and JSON-LD @id base. */
  website: "https://www.sunstonelasvegashomes.com/",
  author: "Dr. Jan Duffy",
  profile: "https://www.sunstonelasvegashomes.com/about/",
  desc: "Sunstone and Trilogy Sunset homes in Las Vegas—buying, selling, and local market guidance with Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
  title: "Sunstone Las Vegas Homes",
  /** Empty string uses `/og.png` from Layout when no static file is present */
  ogImage: "",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Suggest Changes",
    url: "https://github.com/DrJanDuffy/sunstonelasvegashomes.com/edit/main/",
  },
  dynamicOgImage: true,
  lang: "en",
  timezone: "America/Los_Angeles",
} as const;
