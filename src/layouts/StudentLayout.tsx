import { Outlet } from "react-router";
import Footer from "../components/common/Footer";

const StudentLayout = () => {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
};
export default StudentLayout;
