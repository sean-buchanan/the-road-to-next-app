import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getTicket = cache(async (id: string) => {
    //console.log("getTicket", id);
    return await prisma.ticket.findUnique({where: {id}});
});