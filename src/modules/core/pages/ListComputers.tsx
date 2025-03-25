import React, { useEffect, useState } from "react";
import { CustomTable } from "@/common/components/ui/CustomTable";
import { computerColumns } from "@/common/components/ui/columns";

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
  const [devices, setDevices] = useState<Device[]>([
    {
      id: 1,
      type: "laptop",
      name: "Dell XPS 15",
      status: "Ativo",
      ip: "192.168.1.10",
      disks: 2,
      storage: 65,
      memory: "16GB",
      user: "Alice",
      connection: "wifi",
    },
    {
      id: 2,
      type: "desktop",
      name: "Lenovo ThinkCentre",
      status: "Inativo",
      ip: "192.168.1.20",
      disks: 1,
      storage: 85,
      memory: "32GB",
      user: "Bob",
      connection: "ethernet",
    },
    {
      id: 3,
      type: "desktop",
      name: "Desktop 1",
      status: "online",
      ip: "192.168.1.1",
      disks: 2,
      storage: 500,
      memory: "8GB",
      user: "John Doe",
      connection: "wifi",
    },
    {
      id: 4,
      type: "laptop",
      name: "Laptop 1",
      status: "offline",
      ip: "192.168.1.2",
      disks: 1,
      storage: 256,
      memory: "4GB",
      user: "Jane Smith",
      connection: "ethernet",
    },
    // Adicione mais dispositivos aqui
  ]);

  useEffect(() => {
    // Simulação de requisição
    setTimeout(() => {
      setDevices((prevDevices) => [...prevDevices]);
    }, 1000);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Computers List</h1>
      <CustomTable data={devices} columns={computerColumns} />
    </div>
  );
}
