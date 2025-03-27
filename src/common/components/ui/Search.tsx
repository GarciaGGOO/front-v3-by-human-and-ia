import React from "react";
import { Search as SearchIcon } from "lucide-react"; // Ícone de lupa

interface SearchProps {
  value: string;
  onSearch: (searchTerm: string) => void;
}

export const Search: React.FC<SearchProps> = ({ value, onSearch }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="block w-full max-w-md">
        {/* <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Buscar
        </label> */}
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={handleChange}
            className="w-full px-4 py-2 text-left border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-500 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Search..."
          />
          <SearchIcon className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
    </div>
  );
};
