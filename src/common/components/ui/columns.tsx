import { Monitor, Laptop, Tablet, Smartphone, HardDrive, Wifi, Cable } from "lucide-react";

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

// Ícones para diferentes tipos de dispositivos
const getDeviceIcon = (type: string) => {
  switch (type) {
    case "desktop":
      return <Monitor className="w-5 h-5 text-blue-500" />;
    case "laptop":
      return <Laptop className="w-5 h-5 text-purple-500" />;
    case "tablet":
      return <Tablet className="w-5 h-5 text-green-500" />;
    case "smartphone":
      return <Smartphone className="w-5 h-5 text-orange-500" />;
    default:
      return null;
  }
};

const getDeviceH1 = (type: string) => {
    switch (type) {
      case "desktop":
        return <h1 className="w-5 h-5 text-blue-500">Desktop</h1>;
      case "laptop":
        return <h1 className="w-5 h-5 text-purple-500">Laptop</h1>;
      case "tablet":
        return <h1 className="w-5 h-5 text-green-500" >Tablet</h1>;
      case "smartphone":
        return <h1 className="w-5 h-5 text-orange-500">Tablet</h1>;
      default:
        return null;
    }
  };

// Ícones de conexão
const getConnectionIcon = (connection: string) => {
  switch (connection) {
    case "wifi":
      return <Wifi className="w-4 h-4 text-blue-500" />;
    case "ethernet":
      return <Cable className="w-4 h-4 text-gray-500" />;
    default:
      return null;
  }
};

// Barra de uso de armazenamento
const renderStorageBar = (storage: number) => {
  const percentage = Math.min(100, Math.max(0, storage));
  let barColor = "bg-green-500";

  if (percentage > 90) barColor = "bg-red-500";
  else if (percentage > 70) barColor = "bg-yellow-500";

  return (
    <div className="flex items-center space-x-2">
      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full ${barColor}`} style={{ width: `${percentage}%` }} />
      </div>
      <span className="text-xs text-gray-500">{percentage}%</span>
    </div>
  );
};

// Definição das colunas
export const computerColumns = [
    { key: "type", label: "Type", render: (device: Device) => getDeviceIcon(device.type) },
    { key: "name", label: "Name" },
    { key: "status", label: "Status" },
    { key: "ip", label: "IP" },
    { key: "disks", label: "Disks", render: (device: Device) => Array.from({ length: device.disks }).map((_, i) => <HardDrive key={i} className="w-4 h-4 text-gray-500" />) },
    { key: "storage", label: "Storage", render: (device: Device) => renderStorageBar(device.storage) },
    { key: "memory", label: "Memory" },
    { key: "user", label: "User" },
    { key: "connection", label: "Connection", render: (device: Device) => getConnectionIcon(device.connection) },
];
