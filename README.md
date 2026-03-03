# 🌿 Grassy Market — Backend

Це бекенд-частина платформи **Grassy Market**, розроблена на базі **Nest.js**.
Проєкт інтегрований з Next.js фронтендом через REST API та використовує сучасні
підходи до архітектури та безпеки.

## Використані технології

Проєкт базується на сучасному стеку для забезпечення максимальної швидкості та
безпеки:

- **Nest.js ver. 11.1.14** — [https://www.nextjs.org/docs](https://docs.nestjs.com/)
- **TypeScript ver. 5.9.3** —
  [https://www.typescriptlang.org/docs](https://www.typescriptlang.org/docs/)
- **PostgreSQL ver. 18.3** — [https://www.postgresql.org/docs/current/index.html](https://www.postgresql.org/docs/current/index.html)
- **Docker ver. 29.2.1** - [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/)

## Структура бекенд-частини проєкту
```
├── node_modules/                       
│   ├─ prisma/
│      ├─ migrations/
│      ├─ schema.prisma
│      └─ seed.js
│   ├─ src/
│      ├─ auth/
│         ├─ dto/
│            ├─ register/
│               └─ register.dto.ts
│            ├─ create-auth.dto.ts
│            └─ update-auth.dto.ts
│         ├─ auth.contoller.spec.ts/
│         ├─ auth.contoller.ts/
│         ├─ auth.module.ts/
│         ├─ auth.service.spec.ts/
│         └─ auth.service.ts/
│      ├─ config/
│         └─ cors-options.config.ts
│      ├─ decorators/
│         └─ match-password.constrains.ts
│      ├─ prisma/
│         ├─ prisma.module.ts/
│         └─ prisma.service.ts/
│      ├─ user/
│          ├─ dto/
│             ├─ create-user.dto.ts
│             └─ update-user.dto.ts
│          ├─ entities/
│             └─ user.entity.ts
│          ├─ user.contoller.spec.ts
│          ├─ user.contoller.ts
│          ├─ user.module.ts
│          ├─ user.service.spec.ts
│          └─ user.service.ts
│      ├─ app.controller.spec.ts
│      ├─ app.controller.ts
│      ├─ app.module.ts
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
