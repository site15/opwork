#!/usr/bin/env node

/**
 * GitHub Issues Creator for site15/opwork
 * Creates all missing tasks from docs/todo.md
 * Automatically handles GitHub authentication
 * 
 * Usage: node create_issues.js
 */

const https = require('https');
const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const execAsync = promisify(exec);

// All tasks from docs/todo.md
const TASKS = [
  // Section 1.1 - Экран авторизации
  {
    title: "Обновить иконку/брендовый знак на экране авторизации",
    body: "[См. docs/todo.md#L7](https://github.com/site15/opwork/blob/main/docs/todo.md#L7) — обновить иконку/брендовый знак на странице входа.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L7)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
  {
    title: "Обновить блок копирайта на экране авторизации",
    body: "[См. docs/todo.md#L8](https://github.com/site15/opwork/blob/main/docs/todo.md#L8) — обновить блок копирайта на странице авторизации.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L8)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
  {
    title: "Отключить темную тему на экране авторизации",
    body: "[См. docs/todo.md#L10](https://github.com/site15/opwork/blob/main/docs/todo.md#L10) — отключить темную тему на экране входа.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L10)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
  {
    title: "Обновить заголовок и описание страницы авторизации",
    body: "[См. docs/todo.md#L12](https://github.com/site15/opwork/blob/main/docs/todo.md#L12) — обновить заголовок и описание страницы входа.\n\n[Исходное мес��о в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L12)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
  {
    title: "Убрать возможность темизации интерфейса на экране авторизации",
    body: "[См. docs/todo.md#L9](https://github.com/site15/opwork/blob/main/docs/todo.md#L9) — убрать возможность темизации интерфейса на экране входа.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L9)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
  {
    title: "Убрать китайскую локализацию на экране авторизации",
    body: "[См. docs/todo.md#L11](https://github.com/site15/opwork/blob/main/docs/todo.md#L11) — убрать китайскую локализацию на экране авторизации.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L11)",
    labels: ["enhancement"],
    issue_type: "Task"
  },

  // Section 1.2 - Экран регистрации
  {
    title: "Удалить или заменить блок с согласием на политику",
    body: "[См. docs/todo.md#L16](https://github.com/site15/opwork/blob/main/docs/todo.md#L16) — удалить блок с согласием на политику или заменить его на финальный юридический текст.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L16)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
  {
    title: "Перенести валидацию согласия на политику на бэкенд",
    body: "[См. docs/todo.md#L17](https://github.com/site15/opwork/blob/main/docs/todo.md#L17) — перенести валидацию согласия на политику на бэкенд.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L17)",
    labels: ["enhancement"],
    issue_type: "Task"
  },

  // Section 1.3 - Поведение после регистрации/входа
  {
    title: "Убрать/скрыть моковую панель управления после входа",
    body: "[См. docs/todo.md#L22](https://github.com/site15/opwork/blob/main/docs/todo.md#L22) — убрать/скрыть моковую панель управления после входа.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L22)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
  {
    title: "Настроить редирект после входа для работодателей",
    body: "[См. docs/todo.md#L23-L24](https://github.com/site15/opwork/blob/main/docs/todo.md#L23) — для компании: если профиль не заполнен, вести на 'Моя компания'; если профиль заполнен и вакансий нет, вести на создание вакансии.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L23)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
  {
    title: "Настроить редирект после входа для соискателей",
    body: "[См. docs/todo.md#L25-L26](https://github.com/site15/opwork/blob/main/docs/todo.md#L25) — для соискателя: если профиль не заполнен, вести на профиль; если резюме не заполнено, вести на 'Мое резюме'.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L25)",
    labels: ["enhancement"],
    issue_type: "Task"
  },

  // Section 2 - Настройки интерфейса
  {
    title: "Отключить боковую панель кастомизации",
    body: "[См. docs/todo.md#L31](https://github.com/site15/opwork/blob/main/docs/todo.md#L31) — отключить боковую панель кастомизации в настройках интерфейса.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L31)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
  {
    title: "Убрать настройку часового пояса",
    body: "[См. docs/todo.md#L32](https://github.com/site15/opwork/blob/main/docs/todo.md#L32) — убрать настройку часового пояса из панели настроек.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L32)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
  {
    title: "Убрать кнопку полноэкранного режима",
    body: "[См. docs/todo.md#L33](https://github.com/site15/opwork/blob/main/docs/todo.md#L33) — убрать кнопку полноэкранного режима из панели настроек.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L33)",
    labels: ["enhancement"],
    issue_type: "Task"
  },

  // Section 3.1 - Форма вакансии
  {
    title: "Запретить ручное редактирование поля статуса вакансии",
    body: "[См. docs/todo.md#L38](https://github.com/site15/opwork/blob/main/docs/todo.md#L38) — запретить ручное редактирование поля статуса вакансии в форме.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L38)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
  {
    title: "Добавить отдельные кнопки для смены статуса вакансии",
    body: "[См. docs/todo.md#L39](https://github.com/site15/opwork/blob/main/docs/todo.md#L39) — добавить отдельные кнопки для смены статуса вакансии.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L39)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
  {
    title: "Установить статус вакансии по умолчанию: DRAFT",
    body: "[См. docs/todo.md#L40](https://github.com/site15/opwork/blob/main/docs/todo.md#L40) — установить статус по умолчанию: DRAFT.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L40)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
  {
    title: "Автоматически выставлять дату публикации при переходе в ACTIVE",
    body: "[См. docs/todo.md#L41](https://github.com/site15/opwork/blob/main/docs/todo.md#L41) — автоматически выставлять дату публикации при переходе в ACTIVE.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L41)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
  {
    title: "Добавить третий вариант для удаленной работы: Любой",
    body: "[См. docs/todo.md#L42](https://github.com/site15/opwork/blob/main/docs/todo.md#L42) — добавить третий вариант для удаленной работы: 'Любой'.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L42)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
  {
    title: "Перевести поле валюты зарплаты в селект",
    body: "[См. docs/todo.md#L43](https://github.com/site15/opwork/blob/main/docs/todo.md#L43) — поле валюты зарплаты перевести в селект со списком валют.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L43)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
  {
    title: "Сделать опциональными поля опыта, требований и обязанностей",
    body: "[См. docs/todo.md#L44](https://github.com/site15/opwork/blob/main/docs/todo.md#L44) — сделать поля 'уровень опыта', 'требования', 'обязанности' опциональными в базе и интерфейсе.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L44)",
    labels: ["enhancement"],
    issue_type: "Task"
  },

  // Section 3.2 - Навигация после создания вакансии
  {
    title: "После создания вакансии вести на страницу редактирования",
    body: "[См. docs/todo.md#L49](https://github.com/site15/opwork/blob/main/docs/todo.md#L49) — после создания вакансии вести пользователя на страницу редактирования, а не просмотра.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L49)",
    labels: ["enhancement"],
    issue_type: "Task"
  },

  // Section 3.3 - Те��и вакансии
  {
    title: "Добавить тип контрола выбора цвета в генератор форм",
    body: "[См. docs/todo.md#L54](https://github.com/site15/opwork/blob/main/docs/todo.md#L54) — добавить тип контрола выбора цвета в генератор форм для тегов вакансии.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L54)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
  {
    title: "Адаптировать кастомные формы под новый контрол выбора цвета",
    body: "[См. docs/todo.md#L55](https://github.com/site15/opwork/blob/main/docs/todo.md#L55) — адаптировать кастомные формы под новый контрол выбора цвета.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L55)",
    labels: ["enhancement"],
    issue_type: "Task"
  },

  // Section 3.4 - Удаление вакансии
  {
    title: "После удаления вакансии выполнять редирект на список",
    body: "[См. docs/todo.md#L60](https://github.com/site15/opwork/blob/main/docs/todo.md#L60) — после успешного удаления вакансии выполнять редирект на список вакансий.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L60)",
    labels: ["enhancement"],
    issue_type: "Task"
  },

  // Section 3.5 - Список вакансий и фильтры
  {
    title: "Переименовать кнопку 'Добавить' в 'Добавить вакансию'",
    body: "[См. docs/todo.md#L65](https://github.com/site15/opwork/blob/main/docs/todo.md#L65) — переименовать кнопку 'Добавить' в 'Добавить вакансию'.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L65)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
  {
    title: "Переименовать заголовок 'Фильтр' в 'Фильтры вакансий'",
    body: "[См. docs/todo.md#L66](https://github.com/site15/opwork/blob/main/docs/todo.md#L66) — переименовать заголовок 'Фильтр' в 'Фильтры вакансий'.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L66)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
  {
    title: "Переименовать кнопку 'Найти' в 'Найти вакансию'",
    body: "[См. docs/todo.md#L67](https://github.com/site15/opwork/blob/main/docs/todo.md#L67) — переименовать кнопку 'Найти' в 'Найти вакансию'.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L67)",
    labels: ["enhancement"],
    issue_type: "Task"
  },

  // Section 4.1 - История статусов
  {
    title: "Добавить хранение истории статусов и примечаний заявок",
    body: "[См. docs/todo.md#L72](https://github.com/site15/opwork/blob/main/docs/todo.md#L72) — добавить хранение истории статусов и примечаний (кто, когда, что изменил).\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L72)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
  {
    title: "Добавить кнопку просмотра истории статусов заявки",
    body: "[См. docs/todo.md#L73](https://github.com/site15/opwork/blob/main/docs/todo.md#L73) — добавить кнопку просмотра истории рядом с текущим статусом/примечанием.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L73)",
    labels: ["enhancement"],
    issue_type: "Task"
  },

  // Section 4.2 - Фильтры заявок
  {
    title: "Переименовать заголовок фильтров заявок",
    body: "[См. docs/todo.md#L77](https://github.com/site15/opwork/blob/main/docs/todo.md#L77) — переименовать заголовок в 'Фильтры заявок'.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L77)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
  {
    title: "Переименовать кнопку фильтра в 'Найти заявку'",
    body: "[См. docs/todo.md#L78](https://github.com/site15/opwork/blob/main/docs/todo.md#L78) — переименовать кнопку в 'Найти заявку'.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L78)",
    labels: ["enhancement"],
    issue_type: "Task"
  },

  // Section 5.1 - Образование
  {
    title: "Упростить дату обучения в резюме: оставить только год",
    body: "[См. docs/todo.md#L83](https://github.com/site15/opwork/blob/main/docs/todo.md#L83) — упрост��ть дату обучения: оставить только год (без месяца и дня).\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L83)",
    labels: ["enhancement"],
    issue_type: "Task"
  },

  // Section 5.2 - Опыт работы
  {
    title: "Упростить дату работы в резюме: оставить только год",
    body: "[См. docs/todo.md#L88](https://github.com/site15/opwork/blob/main/docs/todo.md#L88) — упростить дату работы: оставить только год (без месяца и дня).\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L88)",
    labels: ["enhancement"],
    issue_type: "Task"
  },

  // Section 5.3 - Навыки
  {
    title: "Пересмотреть поле 'последний раз использов��лся' в навыках",
    body: "[См. docs/todo.md#L93](https://github.com/site15/opwork/blob/main/docs/todo.md#L93) — удалить или пересмотреть поле 'последний раз использовался'.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L93)",
    labels: ["enhancement"],
    issue_type: "Task"
  },

  // Section 6 - Мои отклики соискателя
  {
    title: "Переименовать 'Фильтры' в 'Фильтрация откликов'",
    body: "[См. docs/todo.md#L98](https://github.com/site15/opwork/blob/main/docs/todo.md#L98) — переименовать 'Фильтры' в 'Фильтрация откликов'.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L98)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
  {
    title: "Переименовать кнопку 'Найти' в 'Найти отклики'",
    body: "[См. docs/todo.md#L99](https://github.com/site15/opwork/blob/main/docs/todo.md#L99) — переименовать кнопку 'Найти' в 'Найти отклики'.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L99)",
    labels: ["enhancement"],
    issue_type: "Task"
  },

  // Section 7.1 - Визуальные элементы и действия
  {
    title: "Исправить или удалить неотображающиеся иконки в уведомлениях",
    body: "[См. docs/todo.md#L106](https://github.com/site15/opwork/blob/main/docs/todo.md#L106) — исправить или удалить неотображающиеся иконки в элементах уведомлений.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L106)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
  {
    title: "Исправить кнопку 'Посмотреть все сообщения' в уведомлениях",
    body: "[См. docs/todo.md#L107](https://github.com/site15/opwork/blob/main/docs/todo.md#L107) — исправить кнопку 'Посмотреть все сообщения' (должна открывать полный список уведомлений).\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L107)",
    labels: ["enhancement"],
    issue_type: "Task"
  },

  // Section 7.2 - События нотификаций
  {
    title: "Реализовать уведомление при изменении статуса заявки",
    body: "[См. docs/todo.md#L112](https://github.com/site15/opwork/blob/main/docs/todo.md#L112) — реализовать уведомление соискателю при изменении статуса заявки компанией.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L112)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
  {
    title: "Реализовать уведомление при добавлении примечания к заявке",
    body: "[См. docs/todo.md#L113](https://github.com/site15/opwork/blob/main/docs/todo.md#L113) — реализовать уведомление соискателю при добавлении примечания к заявке компанией.\n\n[Исходное место в файле](https://github.com/site15/opwork/blob/main/docs/todo.md#L113)",
    labels: ["enhancement"],
    issue_type: "Task"
  },
];

const REPO_OWNER = "site15";
const REPO_NAME = "opwork";

class GitHubIssueCreator {
  constructor() {
    this.token = null;
  }

  /**
   * Get GitHub token from gh CLI or environment
   */
  async getGitHubToken() {
    try {
      const { stdout } = await execAsync('gh auth token');
      this.token = stdout.trim();
      if (this.token) return this.token;
    } catch (error) {
      // Try environment variable
      if (process.env.GITHUB_TOKEN) {
        this.token = process.env.GITHUB_TOKEN;
        return this.token;
      }
    }

    throw new Error(
      'GitHub token not found!\n' +
      'Please authenticate using: gh auth login\n' +
      'or set GITHUB_TOKEN environment variable'
    );
  }

  /**
   * Make authenticated request to GitHub API
   */
  makeRequest(method, endpoint, data = null) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.github.com',
        path: endpoint,
        method: method,
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'User-Agent': 'GitHub-Issue-Creator'
        }
      };

      if (data) {
        const jsonData = JSON.stringify(data);
        options.headers['Content-Type'] = 'application/json';
        options.headers['Content-Length'] = Buffer.byteLength(jsonData);
      }

      const req = https.request(options, (res) => {
        let body = '';

        res.on('data', (chunk) => {
          body += chunk;
        });

        res.on('end', () => {
          try {
            if (res.statusCode >= 400) {
              const error = JSON.parse(body);
              reject(new Error(`GitHub API Error: ${error.message}`));
            } else {
              resolve(JSON.parse(body));
            }
          } catch (e) {
            reject(e);
          }
        });
      });

      req.on('error', reject);

      if (data) {
        req.write(JSON.stringify(data));
      }

      req.end();
    });
  }

  /**
   * Get list of existing issue titles
   */
  async getExistingIssues() {
    const existing = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      try {
        const response = await this.makeRequest(
          'GET',
          `/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=all&per_page=100&page=${page}`
        );

        if (!Array.isArray(response) || response.length === 0) {
          hasMore = false;
        } else {
          response.forEach(issue => {
            existing.push(issue.title);
          });
          page++;
        }
      } catch (error) {
        console.error(`Error fetching issues page ${page}:`, error.message);
        hasMore = false;
      }
    }

    return existing;
  }

  /**
   * Create a single issue
   */
  async createIssue(task) {
    const payload = {
      title: task.title,
      body: task.body,
      labels: task.labels || []
    };

    return this.makeRequest(
      'POST',
      `/repos/${REPO_OWNER}/${REPO_NAME}/issues`,
      payload
    );
  }

  /**
   * Format title for display
   */
  formatTitle(title, maxLength = 50) {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  }

  /**
   * Main execution method
   */
  async run() {
    console.log('🚀 GitHub Issues Creator for site15/opwork');
    console.log('='.repeat(60));

    try {
      // Authenticate
      console.log('\n🔐 Authenticating with GitHub...');
      await this.getGitHubToken();
      console.log('✅ Authentication successful!');

      // Get existing issues
      console.log(`\n📋 Fetching existing issues from ${REPO_OWNER}/${REPO_NAME}...`);
      const existingTitles = await this.getExistingIssues();
      console.log(`✅ Found ${existingTitles.length} existing issues`);

      // Find missing tasks
      const missingTasks = TASKS.filter(task => !existingTitles.includes(task.title));
      console.log(`\n📝 Found ${missingTasks.length} missing tasks to create`);

      if (missingTasks.length === 0) {
        console.log('✅ All tasks are already created!');
        return;
      }

      // Create missing issues
      console.log('\n🔄 Creating missing issues...');
      console.log('-'.repeat(60));

      let createdCount = 0;
      let failedCount = 0;
      const failedTasks = [];

      for (let i = 0; i < missingTasks.length; i++) {
        const task = missingTasks[i];
        const progress = `[${i + 1}/${missingTasks.length}]`;
        const title = this.formatTitle(task.title);

        try {
          process.stdout.write(`${progress} Creating: ${title}... `);
          const issue = await this.createIssue(task);
          console.log(`✅ #${issue.number}`);
          createdCount++;
        } catch (error) {
          console.log('❌ Error');
          console.log(`    ${error.message}`);
          failedCount++;
          failedTasks.push(task);
        }

        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Summary
      console.log('\n' + '='.repeat(60));
      console.log('📊 Summary:');
      console.log(`   ✅ Created: ${createdCount}/${missingTasks.length}`);

      if (failedCount > 0) {
        console.log(`   ❌ Failed: ${failedCount}/${missingTasks.length}`);
        console.log('\n   Failed tasks:');
        failedTasks.forEach(task => {
          console.log(`   - ${task.title}`);
        });
      } else {
        console.log('   ✨ All tasks created successfully!');
      }

      console.log('='.repeat(60));
    } catch (error) {
      console.error('\n❌ Error:', error.message);
      process.exit(1);
    }
  }
}

// Run the script
const creator = new GitHubIssueCreator();
creator.run().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});