import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="min-h-screen container mx-auto p-5 md:p-0">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
