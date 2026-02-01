import type { DefaultTheme } from 'vitepress';

import { defineConfig } from 'vitepress';

import { version } from '../../../package.json';

export const ru = defineConfig({
  description: 'Vben Admin и корпоративная система управления',
  lang: 'ru-RU',
  themeConfig: {
    darkModeSwitchLabel: 'Тема',
    darkModeSwitchTitle: 'Переключить на темный режим',
    docFooter: {
      next: 'Следующая страница',
      prev: 'Предыдущая страница',
    },
    editLink: {
      pattern:
        'https://github.com/vbenjs/vue-vben-admin/edit/main/docs/src/:path',
      text: 'Редактировать эту страницу на GitHub',
    },
    footer: {
      copyright: `Copyright © 2020-${new Date().getFullYear()} Vben`,
      message: 'Released under the MIT License.',
    },
    langMenuLabel: 'Язык',
    lastUpdated: {
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
      text: 'Последнее обновление',
    },
    lightModeSwitchTitle: 'Переключить на светлый режим',
    nav: nav(),
    outline: {
      label: 'Навигация',
    },
    returnToTopLabel: 'Наверх',
    sidebar: {
      '/en/commercial/': {
        base: '/en/commercial/',
        items: sidebarCommercial(),
      },
      '/en/guide/': { base: '/en/guide/', items: sidebarGuide() },
    },
  },
});

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      collapsed: false,
      text: 'Введение',
      items: [
        {
          link: 'introduction/vben',
          text: 'О Vben Admin',
        },
        {
          link: 'introduction/why',
          text: 'Почему выбирают нас?',
        },
        { link: 'introduction/quick-start', text: 'Быстрый старт' },
        { link: 'introduction/thin', text: 'Легкая версия' },
      ],
    },
    {
      text: 'Основы',
      items: [
        { link: 'essentials/concept', text: 'Базовые понятия' },
        { link: 'essentials/development', text: 'Локальная разработка' },
        { link: 'essentials/route', text: 'Маршрутизация и меню' },
        { link: 'essentials/settings', text: 'Конфигурация' },
        { link: 'essentials/icons', text: 'Иконки' },
        { link: 'essentials/styles', text: 'Стили' },
        { link: 'essentials/external-module', text: 'Внешние модули' },
        { link: 'essentials/build', text: 'Сборка и деплой' },
        {
          link: 'essentials/server',
          text: 'Взаимодействие с сервером и мок данных',
        },
      ],
    },
    {
      text: 'Расширенные возможности',
      items: [
        { link: 'in-depth/login', text: 'Вход в систему' },
        { link: 'in-depth/theme', text: 'Тема' },
        { link: 'in-depth/access', text: 'Контроль доступа' },
        { link: 'in-depth/locale', text: 'Интернационализация' },
        { link: 'in-depth/features', text: 'Общие функции' },
        { link: 'in-depth/check-updates', text: 'Проверка обновлений' },
        { link: 'in-depth/loading', text: 'Глобальная загрузка' },
        { link: 'in-depth/ui-framework', text: 'Переключение UI фреймворка' },
      ],
    },
    {
      text: 'Инженерные практики',
      items: [
        { link: 'project/standard', text: 'Стандарты' },
        { link: 'project/cli', text: 'CLI' },
        { link: 'project/dir', text: 'Объяснение структуры каталогов' },
        { link: 'project/test', text: 'Модульное тестирование' },
        { link: 'project/tailwindcss', text: 'Tailwind CSS' },
        { link: 'project/changeset', text: 'Changeset' },
        { link: 'project/vite', text: 'Конфигурация Vite' },
      ],
    },
    {
      text: 'Прочее',
      items: [
        { link: 'other/project-update', text: 'Обновление проекта' },
        { link: 'other/remove-code', text: 'Удаление кода' },
        { link: 'other/faq', text: 'Частые вопросы' },
      ],
    },
  ];
}

function sidebarCommercial(): DefaultTheme.SidebarItem[] {
  return [
    {
      link: 'community',
      text: 'Сообщество',
    },
    {
      link: 'technical-support',
      text: 'Техническая поддержка',
    },
    {
      link: 'customized',
      text: 'На заказ',
    },
  ];
}

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      activeMatch: '^/en/(guide|components)/',
      text: 'Документация',
      items: [
        {
          activeMatch: '^/en/guide/',
          link: '/en/guide/introduction/vben',
          text: 'Руководство',
        },
        // {
        //   activeMatch: '^/en/components/',
        //   link: '/en/components/introduction',
        //   text: 'Компоненты',
        // },
        {
          text: 'Исторические версии',
          items: [
            {
              link: 'https://doc.vvbin.cn',
              text: 'Документация версии 2.x',
            },
          ],
        },
      ],
    },
    {
      text: 'Демонстрация',
      items: [
        {
          text: 'Vben Admin',
          items: [
            {
              link: 'https://www.vben.pro',
              text: 'Демо-версия',
            },
            {
              link: 'https://ant.vben.pro',
              text: 'Версия с Ant Design Vue',
            },
            {
              link: 'https://naive.vben.pro',
              text: 'Версия с Naive',
            },
            {
              link: 'https://ele.vben.pro',
              text: 'Версия с Element Plus',
            },
          ],
        },
        {
          text: 'Прочее',
          items: [
            {
              link: 'https://vben.vvbin.cn',
              text: 'Vben Admin 2.x',
            },
          ],
        },
      ],
    },
    {
      text: version,
      items: [
        {
          link: 'https://github.com/vbenjs/vue-vben-admin/releases',
          text: 'История изменений',
        },
        {
          link: 'https://github.com/orgs/vbenjs/projects/5',
          text: 'План развития',
        },
        {
          link: 'https://github.com/vbenjs/vue-vben-admin/blob/main/.github/contributing.md',
          text: 'Содействие',
        },
      ],
    },
    {
      link: '/commercial/technical-support',
      text: '🦄 Техническая поддержка',
    },
    {
      link: '/sponsor/personal',
      text: '✨ Спонсорство',
    },
    {
      link: '/commercial/community',
      text: '👨‍👦‍👦 Сообщество',
    },
    // {
    //   link: '/friend-links/',
    //   text: '🤝 Friend Links',
    // },
  ];
}
