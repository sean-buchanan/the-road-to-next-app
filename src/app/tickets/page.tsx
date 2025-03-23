import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { TicketList } from "@/features/ticket/components/ticket-list";

const TicketsPage = async () => {
    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading title="Tickets" description="All yhour tickets at one place." />

            <Suspense>
                <TicketList />
            </Suspense>
        </div>
    );
};

export default TicketsPage;

    