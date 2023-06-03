export const Category = {
  ROMANCE: '로맨스',
  FANTASY: '판타지',
  ACTION: '액션',
  DAILY: '일상',
  THRILLER: '스릴러',
  GAG: '개그',
  HISTORIC: '무협/사극',
  DRAMA: '드라마',
  EMOTION: '감성',
  SPORTS: '스포츠',
} as const;

export type Category = (typeof Category)[keyof typeof Category];
