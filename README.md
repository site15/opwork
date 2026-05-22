# OpWork - Платформа для поиска работы с открытым исходным кодом

> Инновационная платформа для поиска работы и подбора персонала с использованием современных технологий и AI.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0-brightgreen)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org/)

## 📋 Содержание

- [Описание](#описание)
- [Технологический стек](#технологический-стек)
- [Архитектура проекта](#архитектура-проекта)
- [Требования к системе](#требования-к-системе)
- [Быстрый старт](#быстрый-старт)
- [Установка и настройка](#установка-и-настройка)
- [Запуск проекта](#запуск-проекта)
- [Структура проекта](#структура-проекта)
- [Backend разработка](#backend-разработка)
- [Frontend разработка](#frontend-разработка)
- [Работа с базой данных](#работа-с-базой-данных)
- [API документация](#api-документация)
- [Тестирование](#тестирование)
- [Форматирование кода](#форматирование-кода)
- [Развертывание](#развертывание)
- [Участие в разработке](#участие-в-разработке)
- [Лицензия](#лицензия)

## 🎯 Описание

OpWork - это платформа для поиска работы с открытым исходным кодом, которая предоставляет:

- **Для соискателей**: поиск вакансий, создание резюме, отклик на вакансии
- **Для работодателей**: публикация вакансий, поиск резюме, управление откликами
- **AI-функции**: умный поиск, рекомендации, анализ резюме и вакансий

## 🛠 Технологический стек

### Backend
- **NestJS** - прогрессивный Node.js фреймворк
- **Prisma** - современная ORM для работы с базой данных
- **PostgreSQL** - реляционная база данных с поддержкой pgvector
- **Fastify** - высокопроизводительный HTTP-сервер
- **JWT** - аутентификация и авторизация
- **LangChain** - интеграция с AI/LLM моделями
- **Swagger** - документация API

### Frontend
- **Vue 3** - реактивный UI фреймворк
- **TypeScript** - типизированный JavaScript
- **Vite** - быстрый сборщик
- **Ant Design Vue** - библиотека компонентов
- **pnpm** - менеджер пакетов

### Инфраструктура
- **Docker & Docker Compose** - контейнеризация
- **PM2** - менеджер процессов
- **Husky** - git hooks

## 🏗 Архитектура проекта

```
opwork/
├── backend/              # NestJS backend приложение
│   ├── src/             # Исходный код
│   ├── prisma/          # Prisma схема и миграции
│   ├── test/            # E2E тесты
│   └── client/          # Скомпилированный frontend
├── frontend/            # Vue Vben Admin frontend
│   ├── apps/web-antd/   # Основное веб-приложение
│   ├── packages/        # Переиспользуемые пакеты
│   └── internal/        # Внутренние конфигурации
├── prisma-generator-nestjs-dto/  # Генератор DTO из Prisma
├── docker-compose.yml   # Docker конфигурация
└── ecosystem.config.json # PM2 конфигурация
```

## 💻 Требования к системе

Перед началом работы убедитесь, что у вас установлены:

- **Node.js** >= 18.0 (рекомендуется использовать LTS версию)
- **npm** >= 9.0
- **pnpm** >= 8.0
- **Docker** >= 20.0
- **Docker Compose** >= 2.0
- **Git** >= 2.0

Рекомендуемые версии можно установить из файла `.nvmrc`:
```bash
nvm use
```

## 🚀 Быстрый старт

```bash
# 1. Клонируйте репозиторий
git clone git@github.com:site15/opwork.git
cd opwork

# 2. Установите зависимости
npm install

# 3. Запустите проект в режиме разработки
npm run start:dev
```

Проект будет доступен по адресу:
- Frontend: http://localhost:5666
- Backend API: http://localhost:3000
- Swagger документация: http://localhost:3000/api

## 📦 Установка и настройка

### 1. Установка зависимостей

```bash
# Установка всех зависимостей проекта
npm install
```

Эта команда автоматически:
- Установит зависимости backend
- Установит зависимости frontend
- Установит зависимости генератора DTO

### 2. Настройка окружения

Создайте файл `.env` в директории `backend/`:

```bash
cd backend
cp .env.example .env
```

Основные переменные окружения:
```env
# База данных
DATABASE_URL="postgresql://opwork_user:j4iKD5iZrJSDBIiBb9gYG9MOW46vjgdg@localhost:24432/opwork_db"

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"

# AI провайдеры (опционально)
OPENAI_API_KEY="your-openai-key"
```

## ▶️ Запуск проекта

### Режим разработки

```bash
# Запуск всех сервисов (PostgreSQL, Backend, Frontend)
npm run start:dev

# Остановка всех сервисов
npm run stop:dev
```

Скрипт `start-dev.sh` выполняет:
1. Запуск PostgreSQL контейнера
2. Ожидание готовности базы данных
3. Применение миграций Prisma
4. Запуск Backend и Frontend через PM2

### Production режим

```bash
# Запуск в production режиме
npm run start:prod

# Остановка production сервисов
npm run stop:prod
```

### Ручной запуск компонентов

```bash
# Только PostgreSQL
docker compose up -d

# Применение миграций
cd backend
./node_modules/.bin/prisma migrate deploy

# Backend
cd backend
npm run start:dev

# Frontend (в отдельном терминале)
cd frontend/apps/web-antd
pnpm dev
```

## 📁 Структура проекта

### Backend структура

```
backend/
├── src/
│   ├── controllers/     # REST контроллеры
│   ├── services/        # Бизнес-логика
│   ├── guards/          # Guards для авторизации
│   ├── decorators/      # Пользовательские декораторы
│   ├── filters/         # Exception filters
│   ├── utils/           # Утилиты
│   ├── types/           # TypeScript типы
│   ├── constants/       # Константы
│   ├── app.module.ts    # Главный модуль
│   └── main.ts          # Точка входа
├── prisma/
│   ├── schema.prisma    # Схема базы данных
│   └── migrations/      # Миграции
└── test/                # E2E тесты
```

### Frontend структура

```
frontend/
├── apps/web-antd/       # Основное приложение
│   ├── src/
│   │   ├── api/        # API вызовы
│   │   ├── views/      # Страницы
│   │   ├── components/ # Компоненты
│   │   ├── router/     # Маршруты
│   │   ├── store/      # State management
│   │   └── locales/    # Локализация
│   └── ...
└── packages/            # Общие пакеты
```

## 🔧 Backend разработка

### Основные команды

```bash
cd backend

# Генерация Prisma клиента и DTO
npm run generate

# Создание новой миграции
npm run prisma:create <название_миграции>

# Применение всех миграций
npm run prisma:migrate

# Сброс базы данных
npm run prisma:reset

# Запуск в режиме разработки
npm run start:dev

# Запуск с отладкой
npm run start:debug

# Сборка проекта
npm run build

# Запуск production сборки
npm run start:prod
```

### Генерация API клиента

После изменения схемы Prisma или контроллеров:

```bash
# Генерация DTO из Prisma схемы
npm run generate

# Генерация OpenAPI TypeScript клиента
npm run generate:openapi-ts
```

### Создание миграций

```bash
# Создание новой миграции
npm run prisma:create add_user_avatar_field

# Это создаст файл в prisma/migrations/
```

## 🎨 Frontend разработка

### Основные команды

```bash
cd frontend

# Установка зависимостей
pnpm install

# Запуск dev сервера
pnpm dev

# Сборка проекта
pnpm build

# Предпросмотр production сборки
pnpm preview
```

### Работа с web-antd приложением

```bash
cd frontend/apps/web-antd

# Запуск только веб-приложения
pnpm dev

# Сборка
pnpm build
```

## 🗄 Работа с базой данных

### Подключение к PostgreSQL

```bash
# Через psql
psql -h localhost -p 24432 -U opwork_user -d opwork_db

# Или через Docker
docker exec -it opwork_postgres psql -U opwork_user -d opwork_db
```

### Prisma Studio

```bash
cd backend
npx prisma studio
```

Откроется веб-интерфейс для просмотра и редактирования данных: http://localhost:5555

### Полезные команды Prisma

```bash
# Просмотр статуса миграций
npx prisma migrate status

# Откат последней миграции
npx prisma migrate reset

# Генерация Prisma клиента
npx prisma generate

# Валидация схемы
npx prisma validate
```

## 📚 API документация

### Swagger UI

После запуска backend, документация доступна по адресу:
```
http://localhost:3000/api
```

### Генерация OpenAPI спецификации

```bash
cd backend
# Спецификация автоматически генерируется при запуске
# Файл: backend/swagger.json
```

### Генерация TypeScript клиента

```bash
cd backend
npm run generate:openapi-ts

# Клиент генерируется в директории, указанной в openapi-ts.config.ts
```

## 🧪 Тестирование

### Backend тесты

```bash
cd backend

# Unit тесты
npm run test

# Watch режим
npm run test:watch

# E2E тесты
npm run test:e2e

# Покрытие кода
npm run test:cov

# Отладка тестов
npm run test:debug
```

### Запуск конкретных тестов

```bash
# Один тестовый файл
npm run test:e2e -- test/search-vacancy.e2e-spec.ts

# Тесты по паттерну
npm run test -- --testPathPattern=auth
```

## 🎭 Форматирование кода

### Все проекты

```bash
# Форматирование всего кода
npm run format

# Только backend
npm run format:backend

# Только frontend
npm run format:frontend

# Только генератор
npm run format:generator
```

### Отдельные проекты

```bash
# Backend
cd backend
npm run format

# Frontend
cd frontend
pnpm format
```

### Pre-commit хуки

Husky автоматически форматирует код перед коммитом. Убедитесь, что хуки установлены:

```bash
npm run prepare  # или npx husky install
```

## 🚀 Развертывание

### Production сборка

```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend/apps/web-antd
pnpm build

# Фронтенд копируется в backend/client/
```

### Docker развертывание

```bash
# Запуск production
npm run start:prod

# PM2 управляет процессами
pm2 status
pm2 logs
pm2 restart all
```

### Конфигурация PM2

Файлы конфигурации:
- `ecosystem.config.json` - development
- `ecosystem-prod.config.json` - production

## 🤝 Участие в разработке

### Git workflow

1. Создайте ветку для новой функциональности:
```bash
git checkout -b feat/name-of-feature
```

2. Внесите изменения и закоммитьте:
```bash
git add .
git commit -m "feat: описание новой функциональности"
```

3. Отправьте в репозиторий:
```bash
git push origin feat/name-of-feature
```

4. Создайте Pull Request

### Соглашение о коммитах

Используем [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - новая функциональность
- `fix:` - исправление ошибок
- `docs:` - документация
- `style:` - форматирование (не влияет на код)
- `refactor:` - рефакторинг
- `test:` - добавление/изменение тестов
- `chore:` - обновление зависимостей, конфигурации

Примеры:
```bash
git commit -m "feat: add resume search by skills"
git commit -m "fix: correct vacancy pagination"
git commit -m "docs: update API documentation"
```

### Создание Pull Request

1. Обновите вашу ветку из main:
```bash
git fetch origin
git rebase origin/main
```

2. Создайте PR на GitHub
3. Опишите изменения в PR
4. Дождитесь review

## 🔍 Решение常见问题

### Ошибка подключения к базе данных

```bash
# Проверьте, что контейнер запущен
docker ps | grep postgres

# Перезапустите контейнер
docker compose down
docker compose up -d

# Проверьте логи
docker logs opwork_postgres
```

### Проблемы с миграциями

```bash
# Сбросить и применить миграции заново
cd backend
npm run prisma:reset
npm run prisma:migrate
```

### Port уже используется

```bash
# Найти процесс на порту 3000
lsof -i :3000

# Остановить процесс
kill -9 <PID>
```

## 📝 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 👥 Контакты

- **Автор**: EndyKaufman
- **Email**: admin@site15.ru
- **GitHub**: https://github.com/site15/opwork
- **Issues**: https://github.com/site15/opwork/issues

## 🙏 Благодарности

- [NestJS](https://nestjs.com/) - Backend фреймворк
- [Vue Vben Admin](https://github.com/vbenjs/vue-vben-admin) - Frontend шаблон
- [Prisma](https://www.prisma.io/) - ORM
- [LangChain](https://www.langchain.com/) - AI интеграция

---

**Happy Coding! 🎉**
