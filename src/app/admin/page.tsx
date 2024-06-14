import dynamic from "next/dynamic";

const App = dynamic(() => import("./app"), { ssr: false });

const AdminPage = () => {
  return <App></App>;
};
export default AdminPage;
