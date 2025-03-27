import React, { useEffect, useState } from "react";
import { CustomTable } from "@/common/components/ui/CustomTable";
import { computerColumns } from "@/common/components/ui/columns";
import { Search } from "@/common/components/ui/Search";
import { Pagination } from "@/common/components/ui/Pagination";
import { TextField } from "@/common/components/ui/TextField";

interface Device {
  id: number;
  type: string;
  name: string;
  status: string;
  ip: string;
  disks: number;
  storage: number;
  memory: string;
  user: string;
  connection: string;
}

export function ListComputers() {
  const generateRandomDevice = (id: number): Device => {
    const types = ["laptop", "desktop"];
    const statuses = ["Ativo", "Inativo", "Online", "Offline"];
    const connections = ["wifi", "ethernet"];
    const users = ["Alice", "Bob", "John Doe", "Jane Smith", "Carlos", "Maria"];

    return {
      id,
      type: types[Math.floor(Math.random() * types.length)],
      name: `Device ${id}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      ip: `192.168.1.${id}`,
      disks: Math.floor(Math.random() * 3) + 1,
      storage: Math.floor(Math.random() * 95) + Math.floor(Math.random() * 4),
      memory: `${[4, 8, 16, 32, 64][Math.floor(Math.random() * 5)]}GB`,
      user: users[Math.floor(Math.random() * users.length)],
      connection: connections[Math.floor(Math.random() * connections.length)],
    };
  };

  // Gerar uma lista de dispositivos com base em um número desejado
  const generateDevices = (count: number): Device[] => {
    return Array.from({ length: count }, (_, i) => generateRandomDevice(i + 1));
  };

  // Exemplo de uso dentro do useState
  const [devices, setDevices] = useState<Device[]>(generateDevices(40));

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    // Simulação de requisição
    setTimeout(() => {
      setDevices((prevDevices) => [...prevDevices]);
    }, 1000);
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term); // Atualiza o estado com o novo termo
    setCurrentPage(1);    // Reseta para a primeira página ao buscar
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1); // Reseta para a primeira página ao mudar a quantidade de linhas
  };

  // Filtra dispositivos com base no termo de busca
  const filteredDevices = devices.filter((device) => {
    return (
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.user.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Cálculo da paginação
  const totalItems = filteredDevices.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedDevices = filteredDevices.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col h-full">
      {/* Barra de pesquisa e filtros (fixo no topo) */}
      <div className="p-4 bg-white border-b border-gray-200">
        <h1 className="text-xl font-semibold mb-4">Computers List</h1>

        {/* Barra de pesquisa */}
        <TextField value={searchTerm} onChange={handleSearch} placeholder="Buscar" variant="search" size="md" />
      </div>

      {/* Tabela com scroll */}
      <div className="flex-1 overflow-auto">
        <CustomTable data={paginatedDevices} columns={computerColumns} />
      </div>

      {/* Paginação (fixo no final) */}
      <div className="p-4 bg-white border-t border-gray-200">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>
    </div>
  );
}
