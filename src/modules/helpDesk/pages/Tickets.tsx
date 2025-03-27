import React from "react";
import TicketItem from "../components/ui/TicketItem";
 

export const Tickets = () => {
const sampleTicket = {
  id: 1,
  userName: "John Doe",
  userPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  company: "Company A",
  status: "ABERTO",
  priority: "ALTO",
};
  return (
    <div className="grid grid-cols-5 gap-4 h-full bg-amber-300">
      {/* Coluna 1 (3/5) */}
      <div className="col-span-3 grid gap-2 overflow-auto bg-blue-500 p-4">
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

      {/* Coluna 2 (1/5) */}
      <div className="col-span-1 bg-green-500 p-4">

        
        <h2 className="text-white">Coluna 2 (1/5)</h2>
        <p className="text-white">Esta coluna ocupa 1/5 da largura da tela.</p>
      </div>

      {/* Coluna 3 (1/5) */}
      <div className="col-span-1 bg-red-500 p-4">
        <h2 className="text-white">Coluna 3 (1/5)</h2>
        <p className="text-white">Esta coluna ocupa 1/5 da largura da tela.</p>
      </div>
    </div>
  );
};
