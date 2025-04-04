import { notFound } from "next/navigation";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
//import { prisma } from "@/lib/prisma";

//Caches all of these pages as static pages. Cache revalidation is needed if the data changes.
// export const generateStaticParams = async () => {
//     const tickets = await prisma.ticket.findMany();
//     return tickets.map((ticket) => ({
//         ticketId: ticket.id,
//     }));
// };

type TicketPageProps = {
    params: Promise<{
      ticketId: string;
    }>;
  };
  
const TicketPage = async ({ params }: TicketPageProps) => {
    const { ticketId } = await params;
    const ticket = await getTicket(ticketId);

    if (!ticket) {
        notFound();
    }

    return (
        <div className="flex justify-center animate-fade-from-top">
            <TicketItem ticket={ticket} isDetail />
        </div>
    );
    
};
  
export default TicketPage;
  
