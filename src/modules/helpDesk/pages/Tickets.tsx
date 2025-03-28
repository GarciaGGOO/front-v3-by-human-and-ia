import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TicketItem } from "@/modules/helpDesk/components/ui/TicketItem";
import { IconButton } from "@/common/components/ui/IconButton";
import { cn } from "@/common/lib/utils/mergeClasses";

export const Tickets = () => {
  const [isOpenFilter, setIsOpenFilter] = useState(true);
  const [isOpenActions, setIsOpenActions] = useState(true);
  const [isUseFilter, setIsUseFilter] = useState(true);
  const [isUseActions, setIsUseActions] = useState(false);

  const sampleTicket = {
    id: 1,
    userName: "John Doe",
    userPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    company: "Company A",
    status: "ABERTO",
    priority: "ALTO",
  };

  return (
    <div className={cn("h-full w-full flex", "bg-amber-300")}>
      {/* espaço 1 lista de tickets */}
      <div className={cn("h-full w-full p-4 flex flex-col gap-y-2 overflow-auto", "bg-blue-500")}>
        <TicketItem {...sampleTicket} />
        <TicketItem {...sampleTicket} />
        <TicketItem {...sampleTicket} />
        <TicketItem {...sampleTicket} />
        <TicketItem {...sampleTicket} />
        <TicketItem {...sampleTicket} />
        <TicketItem {...sampleTicket} />
        <TicketItem {...sampleTicket} />
        <TicketItem {...sampleTicket} />
        <TicketItem {...sampleTicket} />
        <TicketItem {...sampleTicket} />
        <TicketItem {...sampleTicket} />
        <TicketItem {...sampleTicket} />
        <TicketItem {...sampleTicket} />
        <TicketItem {...sampleTicket} />
        <TicketItem {...sampleTicket} />
        <TicketItem {...sampleTicket} />
      </div>

      {/* espaço 2 aba de filtros */}
      {isUseFilter && (
        <div
          className={cn(
            "h-full flex transition-all duration-300",
            isOpenFilter ? "w-auto" : "w-[50px]",
            "bg-green-500"
          )}
        >
          {/* aba do botão */}
          <div className="h-full w-[50px] flex items-center justify-center bg-green-900">
            <IconButton
              icon={
                isOpenFilter ? (
                  <ChevronLeft className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )
              }
              tooltip={isOpenFilter ? "Recolher Filtros" : "Expandir Filtros"}
              onClick={() => setIsOpenFilter(!isOpenFilter)}
              tooltipPosition="left"
            />
          </div>

          {/* conteúdo (oculto quando recolhido) */}
          {isOpenFilter && (
            <div className="flex flex-col gap-2 p-4 w-100">
              <h1>Titulo genérico</h1>
              <h3>Espaço lateral, pode ser recolhido Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam sapiente repudiandae quidem fugit, ut veritatis non modi est quaerat atque dolorum harum veniam dolore, vitae numquam velit tempora tenetur aut!</h3>
            </div>
          )}
        </div>
      )}

      {/* espaço 3 aba de outras ações */}
      {isUseActions && (
        <div
          className={cn(
            "h-full flex transition-all duration-300",
            isOpenActions ? "w-[300px]" : "w-[50px]",
            "bg-red-500"
          )}
        >
          {/* aba do botão */}
          <div className="h-full w-[50px] flex items-center justify-center bg-red-900">
            <IconButton
              icon={
                isOpenActions ? (
                  <ChevronLeft className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )
              }
              onClick={() => setIsOpenActions(!isOpenActions)}
              tooltipPosition="bottom"
            />
          </div>

          {/* conteúdo (oculto quando recolhido) */}
          {isOpenActions && (
            <div className="flex flex-col gap-2 p-4">
              <h1>Titulo genérico</h1>
              <h3>Espaço lateral, pode ser recolhido</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
