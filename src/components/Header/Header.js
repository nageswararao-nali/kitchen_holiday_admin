import React from "react";
import { useNavigate, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout, showSidebar } from '../../store/authSlice';
// import "./Layout.css";

// Pass the child props
export default function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.auth)

  const toggleSidebar = async () => {
    await dispatch(showSidebar())
  }
  const logOut = async () => {
    await dispatch(logout())
    navigate('/login')
  }
  const isHome = useMatch({path: '/', end: true})
  const navigateToRoute = (routeName) => {
    console.log("welcome to navigation")

    navigate('/'+routeName)
  }
  const navigateToHomeRoute = (routeName) => {
    console.log("welcome to home navigation")
    if(isHome) {
      window.location.replace("/#"+routeName)
    } else {
      navigate('/')
    }
    
  }
  
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">

    <div className="d-flex align-items-center justify-content-between">
      <a className="logo d-flex align-items-center">
        <img src="/assets/img/logo_f.png" alt="" />
        <span>Kitchen Holiday</span>
      </a>
      <i className="bi bi-list toggle-sidebar-btn" onClick={() => toggleSidebar()}></i>
    </div>

    <div className="search-bar">
      <form className="search-form d-flex align-items-center" method="POST" action="#">
        <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
        <button type="submit" title="Search"><i className="bi bi-search"></i></button>
      </form>
    </div>

    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center">

        <li className="nav-item d-block d-lg-none">
          <a className="nav-link nav-icon search-bar-toggle " href="#">
            <i className="bi bi-search"></i>
          </a>
        </li>

        <li className="nav-item dropdown">

          <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
            <i className="bi bi-bell"></i>
            <span className="badge bg-primary badge-number">4</span>
          </a>

          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
            
          </ul>

        </li>

        <li className="nav-item dropdown">

          <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
            <i className="bi bi-chat-left-text"></i>
            <span className="badge bg-success badge-number">3</span>
          </a>

          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">

          </ul>

        </li>

        <li className="nav-item dropdown pe-3">

          <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
            <img src="/assets/img/profile-img.jpg" alt="Profile" className="rounded-circle" />
            <span className="d-none d-md-block dropdown-toggle ps-2">{username}</span>
          </a>

          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
            <li className="dropdown-header">
              <h6>Kevin Anderson</h6>
              <span>Web Designer</span>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>

            <li>
              <a className="dropdown-item d-flex align-items-center" >
                <i className="bi bi-person"></i>
                <span onClick={() => navigateToRoute('myprofile')}>My Profile</span>
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>

            <li>
              <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                <i className="bi bi-gear"></i>
                <span>Account Settings</span>
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>

            <li>
              <a className="dropdown-item d-flex align-items-center" href="pages-faq.html">
                <i className="bi bi-question-circle"></i>
                <span>Need Help?</span>
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>

            <li onClick={() => logOut()}>
              <a className="dropdown-item d-flex align-items-center">
                <i className="bi bi-box-arrow-right"></i>
                <span>Sign Out</span>
              </a>
            </li>

          </ul>
        </li>

      </ul>
    </nav>

  </header>

  
  );
}