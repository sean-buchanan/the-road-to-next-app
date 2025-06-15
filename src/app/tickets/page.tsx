//export const dynamic = "force-dynamic"; 
//export const revalidate = 30; 

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Heading } from "@/components/heading";
import { Placeholder } from "@/components/placeholder";
import { Spinner } from "@/components/spinner";
import { CardCompact } from "@/features/ticket/components/card-compact";
import { TicketCreateForm } from "@/features/ticket/components/ticket-create-form";
import { TicketList } from "@/features/ticket/components/ticket-list";

const TicketsPage = async () => {
    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading title="Tickets" description="All yhour tickets at one place." />

            <CardCompact
                title="Create Ticket"
                description="A new ticket will be created"
                className="w-full max-w-[420px] self-center"
                content={<TicketCreateForm />}
            />

            <ErrorBoundary fallback={<Placeholder label="Something went wrong" />}>
                <Suspense fallback={<Spinner />}>
                    <TicketList />
                </Suspense>
            </ErrorBoundary>
        </div>
    );
};

export default TicketsPage;

    