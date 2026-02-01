export type Locale = 'en-US' | 'ru-RU' | 'zh-CN';

export const messages: Record<Locale, Record<string, string>> = {
  'en-US': {
    cancel: 'Cancel',
    collapse: 'Collapse',
    confirm: 'Confirm',
    expand: 'Expand',
    prompt: 'Prompt',
    reset: 'Reset',
    submit: 'Submit',
  },
  'zh-CN': {
    cancel: '取消',
    collapse: '收起',
    confirm: '确认',
    expand: '展开',
    prompt: '提示',
    reset: '重置',
    submit: '提交',
  },
  'ru-RU': {
    cancel: 'Отмена',
    collapse: 'Свернуть',
    confirm: 'Подтвердить',
    expand: 'Развернуть',
    prompt: 'Предупреждение',
    reset: 'Сбросить',
    submit: 'Подтвердить',
  },
};

export const getMessages = (locale: Locale) => messages[locale];
