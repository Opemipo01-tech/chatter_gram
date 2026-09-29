import { Outlet, useOutletContext } from "react-router";
import Sidebar from "./Sidebar.jsx";

function AuthenticatedLayout() {
  const outletContext = useOutletContext();

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="page-content">
        <Outlet context={outletContext} />
      </main>
    </div>
  );
}

export default AuthenticatedLayout;