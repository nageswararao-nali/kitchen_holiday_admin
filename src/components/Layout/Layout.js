import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Layout.css";

// Importing all created components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";


// Pass the child props
export default function Layout({ children }) {
    const dispatch = useDispatch();
    const { isAuthenticated, isShowSidebar } = useSelector((state) => state.auth)
    useEffect(() => {
    }, [])
  return (
    <div className={isShowSidebar ? 'toggle-sidebar' : ''}>
      {isAuthenticated ? <Header /> : null }
      {isAuthenticated ? <Sidebar /> : null }
      <main id="main" className="main">
        <div className="App">
          {children}
        </div>
      </main>
      {isAuthenticated ? <Footer />  : null }
      <script src="%PUBLIC_URL%/assets/js/main.js"></script>
    </div>
  );
}