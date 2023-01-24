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
  const chatroom = await prisma.chatroom.upsert({
    where: {id: '00000000-0000-0000-0000-000000000001'},
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'chatroom 1',
    }
  });
  const messages = await prisma.message.upsert({
    where: {id: '00000000-0000-0000-0000-000000000001'},
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      content: 'hello world',
      from: '00000000-0000-0000-0000-000000000001',
      to: '00000000-0000-0000-0000-000000000002',
      roomId: '00000000-0000-0000-0000-000000000001',
    }
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

  console.log({
    tom,
    daniel,
    chatroom,
    messages,
    node
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());


// const node = await prisma.mindmap.upsert({
//   where: {id: '00000000-0000-0000-0000-000000000001'},
//   update: {},
//   create: {
//     id: '00000000-0000-0000-0000-000000000001',
//     title: 'root',
//     children: {
//       create: [
//         {
//           id: '00000000-0000-0000-0000-000000000002',
//           title: 'child2',
//           parent: {
//             connect: {
//               id: '00000000-0000-0000-0000-000000000001'
//             }
//           },
//           children: {
//             create: [
//               {
//                 title: 'child3',
//                 parent: {
//                   connect: {
//                     id: '00000000-0000-0000-0000-000000000002'
//                   }
//                 }
//               },
//               {
//                 title: 'child4',
//                 parent: {
//                   connect: {
//                     id: '00000000-0000-0000-0000-000000000002'
//                   }
//                 }
//               },
//             ]
//           }
//         },
//         {
//           id: '00000000-0000-0000-0000-000000000003',
//           title: 'child3',
//           parent: {
//             connect: {
//               id: '00000000-0000-0000-0000-000000000001'
//             }
//           }
//         },
//       ]
//     },
//   }
// });
