import "dotenv/config";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/index.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Seeding database...");

  // Remove existing data
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.follow.deleteMany();

  const hashedPassword = await bcrypt.hash(
    "password123",
    10
  );

  const users = [];

  // Create 6 fake users
  for (let i = 0; i < 6; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const username = faker.string.alpha({
      length: {
        min: 5,
        max: 7,
      },
    }).toLowerCase();

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        email: `${username}@example.com`,
        password: hashedPassword,
        bio: faker.person.bio(),
      },
    });

    users.push(user);
  }

  console.log(`Created ${users.length} users.`);

  // Create 10 fake posts
  for (let i = 0; i < 10; i++) {
    const randomUser =
      users[Math.floor(Math.random() * users.length)];

    await prisma.post.create({
      data: {
        content: faker.lorem.paragraph({
          min: 1,
          max: 3,
        }),
        authorId: randomUser.id,
      },
    });
  }

  console.log("Created 10 posts.");
  console.log("Seeding complete.");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });