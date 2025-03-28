import { Outlet } from "react-router-dom";
import { Header } from "../ui/HeaderExample";
import { Sidebar } from "../ui/SidebarExample";
import { TesteHeader } from "../ui/testeHeader";

export function MainLayout() {

  
  return (
    <div className="h-screen w-screen bg-white overflow-hidden">
      <div className=" w-full">
        <Header />
      </div>
      <div className="bg-orange-300 h-full w-full flex">
        <div className="h-full bg-red-300">
          <Sidebar />
        </div>
        <div className="w-full h-full bg-pink-300">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
