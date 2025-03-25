"use server";
import { prisma } from "@/lib/prisma";

export const deleteTicket = async (id: string) => {
    console.log("Deleting ticket: ", id);

    return await prisma.ticket.delete({
        where: { id },
    });
};