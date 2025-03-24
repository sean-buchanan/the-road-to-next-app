import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tickets = [
  {
    id: "1",
    title: "Ticket 1",
    content: "First ticket from DB.",
    status: "DONE" as const,
  },
  {
    id: "2",
    title: "Ticket 2",
    content: "Second ticket from DB.",
    status: "OPEN" as const,
  },
  {
    id: "3",
    title: "Ticket 3",
    content: "Third ticket from DB.",
    status: "IN_PROGRESS" as const,
  },
];

// const seed = async () => {
//   for (const ticket of tickets) {
//     await prisma.ticket.create({
//       data: ticket,
//     });
//   }
// };

// const seed = async () => {
//     const promises = tickets.map((ticket) => {
//         return prisma.ticket.create({
//             data: ticket,
//         });
//     });
//     await Promise.all(promises);
// };

const seed = async () => {
    const t0 = performance.now();
    console.log("Seeding database starting...");

    await prisma.ticket.deleteMany();  //Clear all tickets

    await prisma.ticket.createMany({
        data: tickets, 
    });

    const t1 = performance.now();
    console.log(`Seeding database completed in ${t1 - t0} milliseconds.`);
};

seed();

