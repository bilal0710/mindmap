import {PrismaClient} from '@prisma/client';
import {UserRole} from "../apps/api/src/shared/enums";

const prisma = new PrismaClient();


async function main() {

  const tom = await prisma.user.upsert({
    where: {email: 'max@email.com'},
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      email: 'max@email.com',
      firstname: 'max',
      lastname: 'mustermann',
      password: '$2b$10$.nTDGoYc/52u0t0pkW5yfOZI72RK/u67DDepiDyJCJWHHGy4NYmYK',
      role: UserRole.ADMIN,
    },
  });
  const daniel = await prisma.user.upsert({
    where: {email: 'tom@email.com'},
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000002',
      email: 'tom@email.com',
      firstname: 'tom',
      lastname: 'mustermann',
      password: '$2b$10$.nTDGoYc/52u0t0pkW5yfOZI72RK/u67DDepiDyJCJWHHGy4NYmYK',
    },
  });

  const node = await prisma.mindmap.upsert({
    where: {id: '00000000-0000-0000-0000-000000000001'},
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      title: 'root',
      children: {
        create:
          [{
            id: '00000000-0000-0000-0000-000000000002',
            title: 'child_2',
            children: {
              create:
                [{
                  id: '00000000-0000-0000-0000-000000000004',
                  title: 'child_4',
                  children: {
                    create: {
                      id: '00000000-0000-0000-0000-000000000006',
                      title: 'child_6',
                    }
                  }
                },
                  {
                    id: '00000000-0000-0000-0000-000000000005',
                    title: 'child_5',
                  },]
            },
          },
            {
              id: '00000000-0000-0000-0000-000000000003',
              title: 'child_3',
            },]
      },
    }
  });

  for (let i = 0; i < 10; i++) {
    await prisma.chatroom.upsert({
      where: {id: `00000000-0000-0000-0000-00000000000${i}`},
      update: {},
      create: {
        id: `00000000-0000-0000-0000-00000000000${i}`,
        name: `chatroom ${i}`,
      }
    });
    await prisma.message.upsert({
      where: {id: `00000000-0000-0000-0000-00000000000${i}`},
      update: {},
      create: {
        id: `00000000-0000-0000-0000-00000000000${i}`,
        content: `hello world ${i}`,
        from: '00000000-0000-0000-0000-000000000001',
        to: '00000000-0000-0000-0000-000000000002',
        roomId: '00000000-0000-0000-0000-000000000001',
      }
    });
  }
  console.log({
    tom,
    daniel,
    node
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
