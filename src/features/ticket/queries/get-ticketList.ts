import { prisma } from "@/lib/prisma";

export type TicketListItem = {
    id: string;
    title: string;
};

export const getTicketList = async (): Promise<TicketListItem[]> => {
    return await prisma.ticket.findMany({
        select: {
            id: true,
            title: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};