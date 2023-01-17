import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  const tom = await prisma.user.upsert({
    where: {email: 'max@email.com'},
    update: {},
    create: {
      email: 'max@email.com',
      firstname: 'max',
      lastname: 'mustermann',
    },
  });
  const daniel = await prisma.user.upsert({
    where: {email: 'tom@email.com'},
    update: {},
    create: {
      email: 'tom@email.com',
      firstname: 'tom',
      lastname: 'mustermann',
    },
  });
  const chatroom = await prisma.chatroom.upsert({
    where: {id: 1},
    update: {},
    create: {
      name: 'chatroom 1',
    }
  });

  const messages = await prisma.message.upsert({
    where: {id: 1},
    update: {},
    create: {
      text: 'hello world',
      from: 1,
      to: 2,
      roomId: 1,
    }
  });

  console.log({
    tom,
    daniel,
    chatroom,
    messages,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
