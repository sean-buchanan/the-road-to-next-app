import { TicketItem } from "@/features/ticket/components/ticket-item";
//import { getTicketList, TicketListItem } from "@/features/ticket/queries/get-ticketList";
import { getTickets } from "@/features/ticket/queries/get-tickets";

const TicketList = async () => {
    const tickets = await getTickets();
    //const ticketList: TicketListItem[] = await getTicketList();

    return (
        <>
            <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
                {tickets.map((ticket) => (
                    <TicketItem key={ticket.id} ticket={ticket} />
                ))}
            </div>
            {/* <div>
            {ticketList.map((listItem: TicketListItem) => (
                    <p key={"K2" + listItem.id}>Id: {listItem.id} Title: {listItem.title}</p>
                ))}
            </div> */}
        </>
    );
}

export { TicketList };