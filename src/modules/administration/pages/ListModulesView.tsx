import React, { useState } from 'react';
import { Table, Input, Button, Space } from 'antd';
import { Ticket as TicketIcon } from 'lucide-react';

const { Search } = Input;

interface Ticket {
  key: string;
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

const ticketsData: Ticket[] = [
  { key: '1', id: 'T123', title: 'Problema no servidor', status: 'Aberto', createdAt: '2025-03-21' },
  { key: '2', id: 'T124', title: 'Erro no banco de dados', status: 'Em andamento', createdAt: '2025-03-20' },
  { key: '3', id: 'T125', title: 'Acesso negado ao sistema', status: 'Fechado', createdAt: '2025-03-18' },
];

export function ListModulesView() {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Ticket[]>(ticketsData);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filteredTickets = ticketsData.filter((ticket) =>
      ticket.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredTickets);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Criado em',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Visualização de Tickets</h1>
      <div className="rounded-lg border bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400">Página de visualização de tickets de help-desk</p>

        <Space direction="vertical" style={{ width: '100%' }} className="mb-4">
          <Search
            placeholder="Buscar por título"
            enterButton="Buscar"
            size="large"
            onSearch={handleSearch}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button
            type="primary"
            icon={<TicketIcon />}
            size="large"
            className="mt-4"
            onClick={() => console.log('Criar novo ticket')}
          >
            Criar Novo Ticket
          </Button>
        </Space>

        <Table columns={columns} dataSource={filteredData} />
      </div>
    </div>
  );
}
