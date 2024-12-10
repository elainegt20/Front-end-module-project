import { PrismaClient } from '@prisma/client';
import { testData } from './testData.mjs';
import pkg from 'bcryptjs';
const { hash } = pkg;

const prisma = new PrismaClient();

async function seedMembers() {
  return testData.map(async (newUser) =>
    prisma.user.create({
      data: {
        email: newUser.email,
        name: newUser.name,
        passwordHash: await hash('password', 10),
      },
    }),
  );
}

async function seedAdmin() {
  return prisma.user.create({
    data: {
      email: 'admin@test.com',
      name: 'Admin',
      passwordHash: await hash('password', 10),
      role: 'ADMIN',
    },
  });
}

async function main() {
  await seedMembers();
  await seedAdmin();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
