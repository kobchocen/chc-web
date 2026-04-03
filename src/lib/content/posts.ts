export const postImages = {
  camp: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxrBtGm6ixc7Fj03QtHrmb6WNu0xLlVms1vWV9UNGnP-0fQw5Ln12cLAco9GhXqmMM5Y8OIScdP-tVSLX5y59ZfVKcc5dGVDzmbJv1DieAnv2lu_AVMhZTMxen4fWRFGD-BiVw8ts-8hi-p5H8CmLH5tZcamjQA1Mi5Za4XuMutPx-jABvNon3iNZO0dfkCyIJPUzSR_7SH2eTl0mhiaHp3_YivB58oXn1RsUzcqxWutOwtMxwoRopE4BA8BYJm3P4VSk0IAHX-78",
  results:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDf1RAtazPKSCyaxsxAU8ERhuYRhBihhueOdpFkKxrkpd-VxGItIb8wl-JhZj-bA3JFDNhvSKDtqGk8T6CIDEA_u8VXNmLedlJsokpI12YbWMQc_ajh8mLff1mCAn7nYwxHmnJokk0abfwYX9E0xXV13cBKaNHFRJOUs4EKlvJ1fTz9P5cXAT8YfrUxg_LumJVITsJj2YNnDCsTGMjsudeoC8KXkeTgzrNqAcLRZ6mbolUHL79ZXaW6nYhG-I5SrbyeanTPG3cDOh4",
  club: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlI3gKf_8V5drzFx1Tkp9W36leP8kixklGbkcMYeyZ5EPNbJAnILzyLo4Qk9tSACX-_xx5TYOZyWnalyC-cS2muEDiBc16pVPve2yKAdOEHUYohxgvmjJlVpFw9fFEGbvAZt2XTkyt3zHdFkp5D2rUR2vFm7bcuLSteTh3Eopt5XyF2bUHjhHJGykohNwhlB2mdvRzxf4Utu7RjUK00NnvJmcTzr4T5GkRrHtzrowuLHy9Pqrk60XcHDMsRpiaMPri0fP35kroUAw",
  training:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC9V8ktX2X_UDzMNBkTSO8kNfWl8AZp7zEr2g1a-ZfCfhqcW5b5MDlpqmc1aW1HPTrTdddq1yl5ocGFXUD3Inm8VIW5hUs4CMextX6tvHpgX29dOxrgdC_O_lyiXzju538ArkD_pHCPNh4pDIhk4dtah056wktsxTJxm6doeE36fUqhG_eNyqeHwRppUjcRqxblN0iOLeZkNwBTMQDVMjlWH_0NLBtt2E61RI8mV2GNLL7CCGI6Tk1YaO-NTtBv1NTbc7N-fqi4xRs",
} as const;

export type PostKey = keyof typeof postImages;

export const orderedPostKeys = Object.keys(postImages) as PostKey[];

export const postSlugs: Record<PostKey, string> = {
  camp: "informace-zimni-soustredeni",
  results: "vysledky-oblastni-zebricek",
  club: "podzimni-brigada-klubovna",
  training: "treninovy-plan-rijen",
};

export const postAccentClassName: Record<PostKey, string> = {
  camp: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  results: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  club: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  training: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
};

export const postsPageConfig = {
  heroImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCuS_waQUVOJNNcBx0S5-ygReqs20xrMxyTFzhvpHxA0mWScz-fPJh8WkSnyu6x6p6eUoWBfEaslcJYV6a2fa0GVJlFx4WzjNLTW6R_rF5sRKpYyzfBv0xDPyiIFWSWpsH56hcb95YW1_hn0h91BQSxKHe8hOGmSCAzOIzlNTEVHKwSSAFJJz2HCv3GDFkoMaZl5ls_RO3njGwVrrYD2AcxW-QlqpB2hrJldv23nLyP9HgSGGUbaAJ-_oO3tMvZOHhyTY8HOa--zaA",
  detailHeroImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBI0v5gI8uHPzCl-l2QYqBJacwVyGL8LgEWMfTybWxAmfeK_ieJFrDAMLTocVuV4IWToodlbL3vt5RUqW0Hcfsh6ag_aT2lBltnyw7lQdTO3A4hgX-4zsz4yyUVnDNh-mOakR11yTWMjA2bxGNXJBl6bvOBBi1m6eDFKPzavwbZcMsy1gyGLMweR6Iplo5JP5bMTM-nrlBCaH8YWFTkBnOzP2ZgZUrTmpilUiyVmA0Z3PSTM_HhtG_Y9jfJ0rqYL6qhcchT09yomJk",
  detailMapImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAMavDqz9rt9PrYV3AfOInIvGioNI4Z7joq59-naqfL0QsSecqeOIjD7d_Zh7irh01Glz1oiftiIlb0V2gWpdyAcrhub_ew_Tl5paYyug_-v3Bq3pexlUVBRkk4pqpckFdKpHjVyV4liaPmoNBNAjp-0Gm-Xrk45Q2tgwqrcyNqsx1cqEJJBIn94pwfD3kduGc2fmNEmXVsAuuNvV1Z-EuNghzDrm0Yw7NY2pK12bo3sgn2UkcKy2DjydMtY6dgTjVhtCGeGaAR2w4",
  perPage: 4,
  mockPageMultiplier: 3,
} as const;

export function getMockPostEntries() {
  return Array.from(
    { length: orderedPostKeys.length * postsPageConfig.mockPageMultiplier },
    (_, index) => {
      const key = orderedPostKeys[index % orderedPostKeys.length];
      const cycle = Math.floor(index / orderedPostKeys.length);
      const baseSlug = postSlugs[key];

      return {
        key,
        cycle,
        slug: cycle === 0 ? baseSlug : `${baseSlug}-${cycle + 1}`,
      };
    },
  );
}
