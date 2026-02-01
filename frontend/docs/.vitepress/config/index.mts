import { withPwa } from '@vite-pwa/vitepress';
import { defineConfigWithTheme } from 'vitepress';

import { en } from './en.mts';
import { ru } from './ru.mts';
import { shared } from './shared.mts';
import { zh } from './zh.mts';

export default withPwa(
  defineConfigWithTheme({
    ...shared,
    locales: {
      en: {
        label: '简体中文',
        lang: 'zh-CN',
        link: '/cn/',
        ...zh,
      },
      ru: {
        label: 'Русский',
        lang: 'ru-RU',
        link: '/ru/',
        ...ru,
      },
      root: {
        label: 'English',
        lang: 'en',
        link: '/en/',
        ...en,
      },
    },
  }),
);
