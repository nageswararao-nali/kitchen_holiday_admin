import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth)
  const navigateToRoute = (routeName) => {
    console.log("welcome to navigation")

    navigate('/'+routeName)
  }
  return (
    <aside id="sidebar" className="sidebar">

    <ul className="sidebar-nav" id="sidebar-nav">
      {
        (user.user_type == "admin") ?
        <li className="nav-item" onClick={() => navigateToRoute('')}>
          <a className="nav-link ">
            <i className="bi bi-grid-1x2-fill"></i>
            <span>Dashboard</span>
          </a>
        </li>
        : null
      }
      {
        (user.user_type == "admin") ?
        <li className="nav-item" onClick={() => navigateToRoute('users')}>
          <a className="nav-link collapsed" >
          <i class="bi bi-people-fill"></i>
            <span>Users</span>
          </a>
        </li>
        : null
      }
      {
        (user.user_type == "admin") ?
        <li className="nav-item">
          <a className="nav-link collapsed" data-bs-target="#orders-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-bag-check-fill"></i><span>Orders</span><i className="bi bi-caret-right-fill ms-auto"></i>
          </a>
          <ul id="orders-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
            <li onClick={() => navigateToRoute('orders')}>
              <a >
                <i className="bi bi-circle"></i><span>Normal Orders</span>
              </a>
            </li>
            <li onClick={() => navigateToRoute('sub-orders')}>
              <a>
                <i className="bi bi-circle"></i><span>Subscription Orders</span>
              </a>
            </li>
            <li onClick={() => navigateToRoute('all-orders')}>
              <a>
                <i className="bi bi-circle"></i><span>All Orders</span>
              </a>
            </li>
          </ul>
        </li>
        : null
      }
      {
        (user.user_type == "admin") ?
        <li className="nav-item">
          <a className="nav-link collapsed" data-bs-target="#items-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-view-list"></i><span>Items</span><i className="bi bi-caret-right-fill ms-auto"></i>
          </a>
          <ul id="items-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
            <li onClick={() => navigateToRoute('categories')}>
              <a >
                <i className="bi bi-circle"></i><span>Categories</span>
              </a>
            </li>
            <li onClick={() => navigateToRoute('items')}>
              <a>
                <i className="bi bi-circle"></i><span>Items</span>
              </a>
            </li>
            <li onClick={() => navigateToRoute('sub-items')}>
              <a>
                <i className="bi bi-circle"></i><span>Sub Items</span>
              </a>
            </li>
            <li onClick={() => navigateToRoute('items/mapping')}>
              <a>
                <i className="bi bi-circle"></i><span>Items Mapping</span>
              </a>
            </li>
          </ul>
        </li>
        : null
      }
      {
        (user.user_type == "admin") ?
        <li className="nav-item" onClick={() => navigateToRoute('subscriptions')}>
          <a className="nav-link collapsed" >
          <i class="bi bi-check-circle-fill"></i>
            <span>Subscriptions</span>
          </a>
        </li>
        : null
      }
      {
        (user.user_type == "admin") ?
        <li className="nav-item" onClick={() => navigateToRoute('delivery-zone')}>
          <a className="nav-link collapsed" >
            <i className="bi bi-map-fill"></i>
            <span>Delivery Zone</span>
          </a>
        </li> : null
      }
      
      {
        (user.user_type == "admin" || user.user_type == "delivery boy") ?
          <li className="nav-item" onClick={() => navigateToRoute('delivery-orders')}>
          <a className="nav-link collapsed" >
          <i class="bi bi-truck"></i>
            <span>Delivery Orders</span>
          </a>
        </li>
        : null
      }
      
      {
        (user.user_type == "admin" || user.user_type == "kitchen") ?
        <li className="nav-item" onClick={() => navigateToRoute('kitchen-orders')}>
          <a className="nav-link collapsed" >
          <i class="bi bi-egg-fill"></i>
            <span>Kitchen Orders</span>
          </a>
        </li>
        : null
      }
      
    </ul>

  </aside>

  
  );
}