import React, { useState } from "react";
import { ArrowUp, ArrowDown, ArrowLeftRight } from "lucide-react"; // Importando os ícones
import { cn } from "@/common/lib/utils/mergeClasses";

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
    <div className="relative rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key as string}
                  onClick={() => handleSort(column.key)}
                  className={cn(
                    "px-6 py-4 text-left text-sm font-medium",
                    "text-gray-500 dark:text-gray-400",
                    "cursor-pointer transition-colors",
                    "hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  <div className="flex items-center gap-1">
                    <span>{column.label}</span>
                    <span
                      className={cn(
                        "transition-opacity",
                        sortConfig.key === column.key
                          ? "opacity-100"
                          : "opacity-30"
                      )}
                    >
                      {sortConfig.key === column.key ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : sortConfig.direction === "desc" ? (
                          <ArrowDown className="h-3 w-3" />
                        ) : (
                          <ArrowLeftRight className="h-3 w-3" />
                        )
                      ) : (
                        <ArrowLeftRight className="h-3 w-3" />
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900">
            {sortedData.map((item, index) => (
              <tr
                key={index}
                className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                {columns.map((column) => (
                  <td
                    key={column.key as string}
                    className="px-6 py-4 text-sm text-gray-900 dark:text-white"
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
    </div>
  );
}
