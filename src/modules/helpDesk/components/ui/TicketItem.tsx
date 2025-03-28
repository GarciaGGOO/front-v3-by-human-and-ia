import { useState } from "react";
import { Combobox } from "@/common/components/ui/Combobox";

interface TicketProps {
  id: number;
  userName: string;
  userPhoto: string;
  company: string;
  status: string;
  priority: string;
}

const optionPriority = [
  { value: "BAIXA", label: "Baixa" },
  { value: "MEDIA", label: "Média" },
  { value: "ALTA", label: "Alta" },
  { value: "URGENTE", label: "Urgente" },
];

const optionStatus = [
  { value: "ABERTO", label: "Aberto" },
  { value: "EM_ANDAMENTO", label: "Em andamento teste" },
  { value: "FECHADO", label: "Fechado" },
  { value: "CANCELADO", label: "Cancelado" },
];

export const TicketItem: React.FC<TicketProps> = ({
  id,
  userName,
  userPhoto,
  company,
  status,
  priority,
}) => {
  const [checked, setChecked] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [selectedPriority, setSelectedPriority] = useState(priority);

  return (
    <div className="flex items-center gap-4 p-2 border rounded-lg shadow-md bg-white hover:bg-gray-50 transition-all duration-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        className="w-5 h-5 cursor-pointer"
      />

      <div className="flex items-center gap-3">
        <img
          src={userPhoto}
          alt={userName}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col">
          <p className="font-semibold text-lg text-gray-900 dark:text-white">
            {userName}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{company}</p>
        </div>
      </div>

      <div className="flex flex gap-1 ml-auto min-w-[150px]">
        <Combobox
          options={optionStatus}
          selectedValue={selectedStatus || ""}
          onSelect={(value) => setSelectedStatus(value as string)}
          placeholder="Status"
          className="text-sm min-w-[30px]"
          variant="ghost"
        />

        <Combobox
          options={optionPriority}
          selectedValue={selectedPriority || ""}
          onSelect={(value) => setSelectedPriority(value as string)}
          placeholder="Prioridade"
          className="text-sm"
          variant="ghost"
        />
      </div>
    </div>
  );
};

