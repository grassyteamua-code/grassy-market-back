const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();с

async function main() {
    console.log("Починаємо наповнення бази даних...");

    const user1 = await prisma.user.create({
        data: {
            email: "user1@example.com",
            firstname: "Іван",
            lastname: "Петренко",
            password: "hashed_password1",
            role: "USER",
            status: "ACTIVE",
        },
    });

    const user2 = await prisma.user.create({
        data: {
            email: "seller@example.com",
            firstname: "Оксана",
            lastname: "Коваленко",
            password: "hashed_password2",
            role: "SELLER",
            status: "ACTIVE",
        },
    });

    const category1 = await prisma.category.create({
        data: {
            name: "Зернові",
            description: "Категорія для зернових культур",
            status: "ACTIVE",
            slug: "grain",
        },
    });

    const category2 = await prisma.category.create({
        data: {
            name: "Овочі",
            description: "Категорія для овочів",
            status: "ACTIVE",
            slug: "vegetables",
        },
    });

    await prisma.product.create({
        data: {
            name: "Пшениця",
            description: "Якісна пшениця для продажу",
            price: 5000.0,
            stock: 100,
            sku: "WHEAT-001",
            isActive: true,
            categoryId: category1.id,
        },
    });

    await prisma.product.create({
        data: {
            name: "Картопля",
            description: "Свіжа картопля з ферми",
            price: 20.0,
            stock: 500,
            sku: "POTATO-001",
            isActive: true,
            categoryId: category2.id,
        },
    });

    console.log("База даних успішно наповнена!");
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    });
