# 🌿 Grassy Market — Backend

Це бекенд-частина платформи **Grassy Market**, розроблена на базі **Nest.js**.
Проєкт інтегрований з Next.js фронтендом через REST API та використовує сучасні
підходи до архітектури та безпеки.

## 🛠 Використані технології

Проєкт базується на сучасному стеку для забезпечення максимальної швидкості та
безпеки:

- **Nest.js ver. 11.1.14** — [https://www.nextjs.org/docs](https://docs.nestjs.com/)
- **TypeScript ver. 5.9.3** —
  [https://www.typescriptlang.org/docs](https://www.typescriptlang.org/docs/)
- **PostgreSQL ver. 18.3** — [https://www.postgresql.org/docs/current/index.html](https://www.postgresql.org/docs/current/index.html)
- **Docker ver. 29.2.1** - [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/)

## Структрура бекенд-частини проєкту
├── node_modules/                       
│   ├─ prisma/
│      ├─ migrations/
│      ├─ schema.prisma/
│      └── seed.js/
│   ├─ src/
│      ├─ auth/
│      ├─ config/
│      ├─ decorators/
│      ├─ prisma/
│      ├─ user/
│      ├─ app.controller.spec.ts/
│      ├─ app.controller.ts/
│      ├─ app.module.ts/
│      ├─ app.service.ts/
│      ├─ main.ts/    
│   ├─ test/
│   ├─ .env/
│   ├─ .gitingnore/
│   ├─ .prettier/
│   ├─ .docker-compose.yml/
│   ├─ eslint.config.mjs/
│   ├─ nest-cli.json/
│   ├─ .prettier/
