"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";

const upsertTicketSchema = z.object({
  title: z.string().min(1, "Title is required").max(191, "Title must be less than 191 characters"),
  content: z.string().min(1, "Content is required").max(1024, "Content must be less than 1024 characters"),
});

export type UpsertTicketReturnType = {
  message: string;
  payload?: FormData;
};

export const upsertTicket = async (
  id: string | undefined,
  _actionState: UpsertTicketReturnType,
  formData: FormData
) => {
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
    });

    await prisma.ticket.upsert({
      where: { id: id || "" },
      update: data,
      create: data,
    });
  } catch (error) {
    const result: UpsertTicketReturnType = { 
      message: "Error creating ticket: " + (error instanceof z.ZodError ? error.errors.map(e => e.message).join(", ") : "Unknown error"),
      payload: formData
    };

    return result
  }

  revalidatePath(ticketsPath());

  if (id) {
    redirect(ticketPath(id));
  }

  const result: UpsertTicketReturnType = {
    message: "Ticket created"
  };
  return result;
};

