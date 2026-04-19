# Prompt для Lovable: сгенерировать полный макет OpWork

Сгенерируй **полный UI/UX-макет веб-сервиса OpWork** с нуля, строго на русском языке, в минималистичном стиле, адаптивный (mobile-first), с единым дизайн-системным подходом.

## 1) Что нужно спроектировать

Сделай макеты для всех зон продукта:

### Публичная зона
- Лендинг
- Вход (`/auth/login`)
- Регистрация (`/auth/register`)

### Приватная зона (общая)
- Хедер: глобальный поиск, нотификации, переключение активного профиля
- Боковая навигация (адаптивная)

### Кабинет компании
- Моя компания (`/profile/employer`)
- Мои вакансии (`/vacancy/list`)
- Создание вакансии (`/vacancy/create`)
- Редактирование вакансии (`/vacancy/:id/edit`)
- Просмотр вакансии (`/vacancy/:id`)
- Мои заявки (`/vacancy/applications`)
- Деталь заявки (`/vacancy/applications/:id`)
- Поиск резюме (`/vacancy/resume-search`)

### Кабинет соискателя
- Профиль соискателя (`/profile/specialist`)
- Мое резюме (`/resume/:id`)
- Поиск вакансий (`/resume/vacancy-search`)
- Мои отклики (`/resume/applications`)
- Деталь отклика (`/resume/applications/:id`)

### Дополнительные разделы (спроектировать как рабочие)
- Переписка (чат соискатель <-> компания)
- Приглашения от компании
- Дашборд для компании и соискателя

---

## 2) Роли и ограничения

Роли:
- Соискатель
- Компания

Ограничения:
- Роль ADMIN в UI не показывать.
- Активный профиль влияет на контент и нотификации.
- Вакансия видима соискателям только при `status = ACTIVE`.
- Резюме видимо компаниям только при `isOpenToWork = true`.
- Статус `WITHDRAWN` выставляет только соискатель.
- Нотификации разделены по активному профилю.

---

## 3) Обязательные сущности и поля (отразить в формах/карточках)

### Профиль
- email, phone, website, location, avatar, cover

### Соискатель
- firstName, lastName, middleName, birthDate, gender
- currentPosition, currentCompany, summary
- expectedSalary, salaryCurrency
- isOpenToWork, isOpenToRemote, isOpenToRelocation
- preferredLocations
- linkedinUrl, githubUrl, portfolioUrl

### Опыт
- company, position, description, startDate, endDate, isCurrent, location, employmentType

### Образование
- institution, degree, fieldOfStudy, startDate, endDate, isCurrent, description, grade

### Компания
- companyName, industry, description, mission, culture
- foundedYear, headquarters, logoUrl, coverImageUrl
- companyEmail, companyPhone, companyWebsite
- linkedinUrl, twitterUrl, facebookUrl

### Вакансия
- title, description, requirements, responsibilities
- employmentType, experienceLevel, department
- salaryMin, salaryMax, salaryCurrency
- location, isRemote
- status: `DRAFT | ACTIVE | PAUSED | CLOSED | ARCHIVED`
- publishedAt, expiresAt
- viewsCount, applicationsCount, savesCount

### Отклик / заявка
- coverLetter, resumeUrl, portfolioUrl
- status: `PENDING | REVIEWED | SHORTLISTED | INTERVIEW | OFFER | REJECTED | WITHDRAWN`
- statusNotes, appliedAt, statusUpdatedAt

### Навыки и теги
- Навык (name, type, category, icon)
- Навык соискателя (level, yearsOfExp, isPrimary, lastUsed)
- Навык вакансии (isRequired, importance, minLevel)
- Тег вакансии (name, color HEX)

### Нотификации
- type, title, message, isRead, isArchived, readAt
- dropdown + отдельная страница “Все уведомления”

---

## 4) UX требования

- Минимализм, чистая сетка, четкая визуальная иерархия.
- Пустые состояния с CTA и подсказками.
- Формы с явными обязательными полями, подсказками и inline-ошибками.
- Таблицы/списки легко сканируются (статусы, зарплата, дата, действия).
- Статусы и этапы — через color badges + текст.
- В длинных формах — закрепленная зона действий (Save/Publish).
- В mobile: фильтры в drawer, таблицы в карточки.

---

## 5) Лендинг (обязательный)

Сделай отдельный лендинг в том же стиле:
- Hero + 2 CTA (для соискателя / для компании)
- Как работает сервис (2 сценария)
- Преимущества
- Примеры карточек вакансий/резюме
- Блок доверия (метрики/логотипы/отзывы)
- FAQ
- Footer

---

## 6) Переименования интерфейсных текстов (обязательно)

- `Добавить` -> `Добавить вакансию`
- `Фильтр` -> `Фильтры вакансий`
- `Найти` (в вакансиях) -> `Найти вакансию`
- `Фильтры` (в откликах) -> `Фильтрация откликов`
- `Найти` (в откликах) -> `Найти отклики`
- `Фильтры` (в заявках) -> `Фильтры заявок`
- `Найти` (в заявках) -> `Найти заявку`

---

## 7) Что выдать в результате

Сформируй результат как:
1. Полный список экранов (desktop + mobile).
2. UI-kit (цвета, типографика, отступы, компоненты, состояния).
3. Ключевые user-flows (вход, создание вакансии, отклик, смена статуса заявки).
4. Примеры пустых/ошибочных/loading состояний.
5. Отдельный блок "что осталось дорисовать" для будущих экранов/деталей.

---

## 8) Критерии приемки

- Нет пропущенных ключевых экранов.
- Все сценарии имеют понятный следующий шаг.
- Mobile не теряет функциональность.
- Визуально минималистично и единообразно.
- Термины и статусы консистентны.

