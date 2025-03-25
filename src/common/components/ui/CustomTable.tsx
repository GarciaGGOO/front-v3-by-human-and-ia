import React, { useState } from "react";
import { ArrowUp, ArrowDown, ArrowLeftRight } from "lucide-react"; // Importando os ícones

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface CustomTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export function CustomTable<T>({ data, columns }: CustomTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc" | "default";
  }>({
    key: null,
    direction: "default",
  });

  const handleSort = (key: keyof T) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        // Alterna entre "asc", "desc" e "default"
        const nextDirection =
          prev.direction === "asc"
            ? "desc"
            : prev.direction === "desc"
            ? "default"
            : "asc";
        return { key, direction: nextDirection };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key || sortConfig.direction === "default") return 0;

    const valueA = a[sortConfig.key];
    const valueB = b[sortConfig.key];

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortConfig.direction === "asc" ? valueA - valueB : valueB - valueA;
    }
    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortConfig.direction === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    return 0;
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            {columns.map((column) => (
              <th
                key={column.key as string}
                className="border p-2 text-right cursor-pointer"
                onClick={() => handleSort(column.key)}
              >
                <div className="flex items-center justify-start">
                  {/* Ícone à esquerda */}
                  {sortConfig.key === column.key &&
                    (sortConfig.direction === "asc" ? (
                      <ArrowUp size={14} />
                    ) : sortConfig.direction === "desc" ? (
                      <ArrowDown size={14} />
                    ) : (
                      <ArrowLeftRight size={14} />
                    ))}
                  {/* Texto à direita */}
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {column.label}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="animate-in fade-in slide-in-from-top-2 duration-200">
          {sortedData.map((item, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0
                  ? "bg-white dark:bg-gray-900"
                  : "bg-gray-50 dark:bg-gray-800"
              }
            >
              {columns.map((column) => (
                <td
                  key={column.key as string}
                  className="border p-2 text-gray-900 dark:text-white"
                >
                  {column.render
                    ? column.render(item)
                    : (item[column.key] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
