# Запускає всі контейнери у фоновому режимі
# up:
#     docker-compose up -d

# Зупиняє всі контейнери
# down:
#     docker-compose down

# Виконує Prisma migrate dev (створює/оновлює схему)
# migrate:
#     npx prisma migrate dev --name init

# Генерує Prisma Client
# generate:
#     npx prisma generate

# Повний цикл: підняти контейнери, виконати міграції, згенерувати клієнт
# setup: up migrate generate

# Переглянути логи Postgres
# logs:
#     docker-compose logs -f postgres

# Очистити volume видалить всі дані)
# reset-db:
#     docker-compose down -v
#    docker-compose up -d
#    npx prisma migrate reset --force
