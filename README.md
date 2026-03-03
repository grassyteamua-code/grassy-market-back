# 🌿 Grassy Market — Backend

Це бекенд-частина платформи **Grassy Market**, розроблена на базі **Nest.js**.
Проєкт інтегрований з **Next.js** фронтенд-частиною через REST API та використовує сучасні
підходи до архітектури та безпеки.

# Використані технології

Проєкт базується на сучасному стеку для забезпечення максимальної швидкості та
безпеки:

## 📚 Бібліотеки/фреймворки:
  - **Nest.js** — [https://www.nextjs.org/docs](https://docs.nestjs.com/)
  - **Node.js** — [https://www.nextjs.org/docs](https://nodejs.org/en)
## 📜 Мови програмування:
  - **TypeScript** — [https://www.typescriptlang.org/docs](https://www.typescriptlang.org/docs/)
  - **JavaScript** —  [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 💾 Робота з базою даних:
- **PostgreSQL** — [https://www.postgresql.org/docs/current/index.html](https://www.postgresql.org/docs/current/index.html)
- **Neon Serverless Postgres** — [https://neon.com/](https://neon.com/)
- **Prisma ORM** — [https://www.prisma.io/](https://www.prisma.io/)

## ⚒️ Тестування:
  - **Jest** — [https://jestjs.io/uk/](https://jestjs.io/uk/)

## 🐋 Контейнеризація:
  - **Docker** — [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/)

## 🔗 OpenAPI документація для тестування API:
  - **Swagger** — [https://swagger.io/](https://swagger.io/)

## 🖧 Розвертання на реальному сервері:
  - **Render** — [https://render.com/](https://render.com/)
  - **AWS C2** — [https://aws.amazon.com/ru/ec2/](https://aws.amazon.com/ru/ec2/)

## Структура бекенд-частини проєкту
```
├── node_modules/                                # 🗃️ містить усі встановлені залежності (бібліотеки npm), які використовує проєкт            
│   ├─ prisma/                                   # 🗄️ тут зберігаються файли інструменту (бібліотеки) для об'єктно-реляційного відображення Prisma ORM 
│      ├─ migrations/                            # 📒 історія міграцій бази даних (історія змін структури) PostgreSQL
│      ├─ schema.prisma                          # 💾 головна схема бази даних (опис моделей, зв’язків)
│      └─ seed.js                                # 📜 скрипт для початкового наповнення бази даних тестовими даними
│   ├─ src/                                      # 🗂️ головна (корнева) папка з вихідним кодом
│      ├─ auth/                                  # 🌐 модуль автентифікації    
│         ├─ dto/                                # 📔 об'єкти без бізнес-логіки, які описують структуру даних для запитів/відповідей авторизації
│            ├─ register/                        # 📗 опис структуру даних для запитів/відповідей реєстрації користувачів
│               └─ register.dto.ts               # 📝 об'єкти для реєстрації користувача
│            ├─ create-auth.dto.ts               # 📑 об'єкти для створення запису автентифікації
│            └─ update-auth.dto.ts               # 📓 об'єкти для оновлення автентифікації
│         ├─ auth.contoller.spec.ts/             # 📕 тести для контролера автентифікації
│         ├─ auth.contoller.ts/                  # 📖 контролер автентифікації, який приймає HTTP-запити (реєстрація, логін, логаут)
│         ├─ auth.module.ts/                     # 🌐 модуль Nest.js, який збирає всі частини автентифікації
│         ├─ auth.service.spec.ts/               # 💻 тести для бізнес-логіки
│         └─ auth.service.ts/                    # 📖 тести для бізнес-логіка (реєстрація, логін, refresh токени)
│      ├─ config/                                # 🗃️ містить усі файли налаштувань (СORS (дозволені домени, методи, заголовки)) 
│         └─ cors-options.config.ts              # ⚙️ налаштування CORS
│      ├─ decorators/                            # 🪛 містить усі кастомні валідатори  
│         └─ match-password.constrains.ts        # 🔧 кастомний валідатор для перевірки збігу паролів
│      ├─ prisma/                                # 🌐 модуль доступу до бази даних через Prisma ORM 
│         ├─ prisma.module.ts/                   # 📃 Nest.js модуль для інтеграції Prisma    
│         └─ prisma.service.ts/                  # 📒 сервіс, який надає доступ до бази даних через Prisma
│      ├─ user/                                  # 👥 модуль користувачів
│          ├─ dto/                               # 🛡️ об'єкти без бізнес-логіки, які описують структуру даних для запитів/відповідей авторизації
│             ├─ create-user.dto.t               # 📔 об'єкти для створення користувача
│             └─ update-user.dto.ts              # 🗃️ об'єкти для оновлення користувача
│          ├─ entities/                          # 🆔 містить описи сутностей 
│             └─ user.entity.ts                  # 📖 опис сутності користувача 
│          ├─ user.contoller.spec.ts             # 📋 тести для контролера
│          ├─ user.contoller.ts                  # 📊 контролер для роботи з користувачами (CRUD)
│          ├─ user.module.ts                     # 📘 модуль Nest.js для користувачів
│          ├─ user.service.spec.ts               # 💽 тести для сервісу
│          └─ user.service.ts                    # 📊 бізнес-логіка для користувачів
│      ├─ app.controller.spec.ts                 # 📋 тести для головний контролер застосунку
│      ├─ app.controller.ts                      # 🧾 головний контролер застосунку
│      ├─ app.module.ts                          # 📖 головний модуль застосунку, який збирає всі інші модулі
│      ├─ app.service.ts                         # 🗃️ сервіс із базовою логікою застосунку
│      └─ main.ts                                # 📌 точка входу, де запускається Nest.js сервер 
│   ├─ test/                                     # 📑 містить усі тести, що покривають застосунок
│      ├─ app.e2e-spec.ts                        # 📋 end-to-end тести               
│      └─ jest-e2e.json                          # 🗳️ конфігурація Jest для end-to-end тести
│   ├─ .env                                      # 🛡️ змінні середовища (секрети, ключі, URL бази даних)
│   ├─ .gitingnore                               # 📇 файли, які не потрапляють у Git
│   ├─ .prettier                                 # ⚙️ налаштування форматування коду
│   ├─ .docker-compose.yml                       # ⚙️ конфігурація Docker для запуску сервісів
│   ├─ eslint.config.mjs                         # 📰 правила ESLint для перевірки коду
│   ├─ Makefile                                  # 🪪 автоматизація команд (запуск, збірка)
│   ├─ README.md                                 # 📋 опис застосунку/проєкту
│   ├─ nest-cli.json                             # 🛠️ конфігурація Nest.js CLI
│   ├─ package-lock.json                         # 🗂️ залежності та скрипти NPM
│   ├─ package.json                              # 🔏 блокування версій залежностей NPM
│   ├─ prisma.config.ts                          # 📑 додаткові налаштування Prisma ORM
│   ├─ swagger.yaml                              # 🔗 інструмент для перегляду, створення та редагування OpenAPI специфікацій у режимі реального часу
│   ├─ tsconfig.build.json                       # ⚙️ конфігурація для збірки
│   ├─ tsconfig.json                             # 🗂️ основна конфігурація TypeScript
│   └─ yarn.lock                                 # 🔏 блокування версій залежностей YARN
```

## 🔑 Пакетний менеджер (node_module) та змінні оточення (.env)

Для ефективної роботи з базою даних та сервером завантажуємо `.env`-файл звідси (https://drive.google.com/file/d/1Qc3O8grPrc1mRtbvJeA671xSmfAd-He_/view?usp=sharing) або створюємо `.env`-файл самостійно у коріні репозиторію (повинен знаходитися перед `.gitignore`-файлом в репозиторії) та копіюємо змінні нижче тв вставляємо у свій файл, а також завантажуємо пакетний менеджер `node_module` звідси (https://drive.google.com/drive/folders/1G1-nBOO3zVqVIqyNypTpPYAi1bt-_Wp4?usp=sharing) або встановлюємо `node_module` самостійно та додаємо усі необхідні залежності поступово.

 Призначення змінних оточення:
 
- Змінна `DATABASE_URL` слугує для зв'язку між Prisma ORM та Neon Serverless Postgres базою даних;
- Змінна `PORT` слугує для запуску сервера локально на даному порту;

```bash
DATABASE_URL=postgresql://neondb_owner:npg_sD4fXhvT9GyR@ep-little-surf-a18vye4s-pooler.ap-southeast-1.aws.neon.tech/prisma_migrate_shadow_db_43238705-f513-4530-88a1-38463ccbf0a0?sslmode=require&channel_binding=require
PORT=3001
```
