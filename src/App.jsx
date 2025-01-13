import { Outlet } from "react-router-dom";
import Nav from "./Navber/Nav";
import Footer from "./Footer/Footer";

const App = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
