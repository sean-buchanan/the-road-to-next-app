import { Ticket } from "@prisma/client";
import clsx from "clsx";
import { LucideArrowUpRightFromSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TICKET_ICONS } from "@/features/ticket/constants";
import { ticketPath } from "@/paths";

type TicketItemProps = {
    ticket: Ticket;
    isDetail?: boolean;
};

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
    const detailButton = (
        <Button asChild variant="outline" size="icon">
            <Link href={ticketPath(ticket.id)}>
                <LucideArrowUpRightFromSquare className="h-4 w-4"/>
            </Link>
        </Button>
    );

    return (
        <div className={clsx("w-full max-w-[420px] flex gap-x-1", { "max-w-[580x]": isDetail, "max-w-[420px]": !isDetail, })}>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="flex gap-x-2">
                        <span>{TICKET_ICONS[ticket.status]}</span>
                        <span className="truncate">{ticket.title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <span className={clsx("whitespace-break-spaces", {"line-clamp-3": !isDetail,})}>{ticket.content}</span>
                </CardContent>
            </Card>

            {isDetail ? null : (
                <div className="flex flex-col gap-y-1">{detailButton}</div>
            )}
        </div>
    );
};

export { TicketItem };