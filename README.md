# 🌿 Grassy Market — Backend

Це бекенд-частина платформи **Grassy Market**, розроблена на базі **Nest.js**.
Проєкт інтегрований з Next.js фронтендом через REST API та використовує сучасні
підходи до архітектури та безпеки.

## Використані технології

Проєкт базується на сучасному стеку для забезпечення максимальної швидкості та
безпеки:

- **Nest.js** — [https://www.nextjs.org/docs](https://docs.nestjs.com/)
- **TypeScript** — [https://www.typescriptlang.org/docs](https://www.typescriptlang.org/docs/)
- **PostgreSQL** — [https://www.postgresql.org/docs/current/index.html](https://www.postgresql.org/docs/current/index.html)
- **Docker Compose** - [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/)
- **Neon Serverless Postgres** - [https://neon.com/](https://neon.com/)

## Структура бекенд-частини проєкту
```
├── node_modules/                             # 📚 містить усі встановлені залежності (бібліотеки npm), які використовує проєкт            
│   ├─ prisma/                                # 🗄️ тут зберігаються файли інструменту (бібліотеки) для об'єктно-реляційного відображення Prisma ORM 
│      ├─ migrations/                         # 📒 історія міграцій бази даних PostgreSQL та serverless-платформа для PostgreSQL Neon Serverless Postgres
│      ├─ schema.prisma                       # 💾 головна схема бази даних (опис моделей, зв’язків)
│      └─ seed.js                             # 📜 скрипт для початкового наповнення бази даних тестовими даними
│   ├─ src/                                   # 🗂️ головна (корнева) папка з вихідним кодом
│      ├─ auth/                               # 🌐 модуль автентифікації    
│         ├─ dto/                             # 📔 об'єкти без бізнес-логіки, які описують структуру даних для запитів/відповідей авторизації
│            ├─ register/                     # 📗 опис структуру даних для запитів/відповідей реєстрації користувачів
│               └─ register.dto.ts            # 📝 об'єкти для реєстрації користувача
│            ├─ create-auth.dto.ts            # 📑 об'єкти для створення запису автентифікації
│            └─ update-auth.dto.ts            # 📓 об'єкти для оновлення автентифікації
│         ├─ auth.contoller.spec.ts/          # 📕 тести для контролера автентифікації
│         ├─ auth.contoller.ts/               # 📖 контролер автентифікації, який приймає HTTP-запити (реєстрація, логін, логаут)
│         ├─ auth.module.ts/                  # 📰 модуль Nest.js, який збирає всі частини автентифікації
│         ├─ auth.service.spec.ts/            # 💻 тести для бізнес-логіки
│         └─ auth.service.ts/                 # 📖 тести для бізнес-логіка (реєстрація, логін, refresh токени)
│      ├─ config/                             # 🗃️ містить усі файли налаштувань (СORS (дозволені домени, методи, заголовки)) 
│         └─ cors-options.config.ts           # ⚙️ налаштування CORS
│      ├─ decorators/                         #     містить усі кастомні валідатори  
│         └─ match-password.constrains.ts     #     кастомний валідатор для перевірки збігу паролів
│      ├─ prisma/                             # 🌐 модуль доступу до бази даних через Prisma ORM 
│         ├─ prisma.module.ts/                #     NestJS модуль для інтеграції Prisma    
│         └─ prisma.service.ts/               #     сервіс, який надає доступ до бази даних через Prisma
│      ├─ user/                               #     модуль користувачів
│          ├─ dto/                            #     об'єкти без бізнес-логіки, які описують структуру даних для запитів/відповідей авторизації
│             ├─ create-user.dto.t            #     об'єкти для створення користувача
│             └─ update-user.dto.ts           #     об'єкти для оновлення користувача
│          ├─ entities/                       #     містить описи сутностей 
│             └─ user.entity.ts               #     опис сутності користувача 
│          ├─ user.contoller.spec.ts          #     тести для контролера
│          ├─ user.contoller.ts               #     контролер для роботи з користувачами (CRUD)
│          ├─ user.module.ts                  #     модуль NestJS для користувачів
│          ├─ user.service.spec.ts            #     тести для сервісу
│          └─ user.service.ts                 #     бізнес-логіка для користувачів
│      ├─ app.controller.spec.ts              #     тести для головний контролер застосунку
│      ├─ app.controller.ts                   #     головний контролер застосунку
│      ├─ app.module.ts                       #     головний модуль застосунку, який збирає всі інші модулі
│      ├─ app.service.ts
│      └─ main.ts 
│   ├─ test/
│      ├─ app.e2e-spec.ts
│      └─ jest-e2e.json
│   ├─ .env
│   ├─ .gitingnore
│   ├─ .prettier
│   ├─ .docker-compose.yml
│   ├─ eslint.config.mjs
│   ├─ Makefile
│   ├─ README.md
│   ├─ nest-cli.json
│   ├─ .prettier
│   ├─ package-lock.json
│   ├─ package.json
│   ├─ prisma.config.ts
│   ├─ swagger.yaml
│   ├─ tsconfig.build.json
│   ├─ tsconfig.json
│   └─ yarn.lock
```
